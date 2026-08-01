/*
 * Фотографии сайта: скорость загрузки.
 *
 * Делает две вещи:
 *
 * 1. --fetch: находит в генераторе все картинки, захостленные на чужих
 *    серверах (Wikimedia, Flickr, bali.com и пр.), скачивает их в
 *    images/remote/, ужимает и переписывает генератор на локальные пути.
 *    Чужой хост — это чужие тормоза: каждый такой URL это лишний DNS+TLS,
 *    непредсказуемая скорость, и право хозяина в любой момент отдать 403.
 *
 * 2. --compress: проходит по images/ и пережимает тяжёлые файлы на месте
 *    (jpeg/webp — с ресайзом до максимума и mozjpeg; png — без потерь,
 *    пиксели остаются байт-в-байт теми же). Пути не меняются, HTML не
 *    трогается. Файл заменяется только если стал меньше.
 *
 * Запуск: node scripts/optimize-photos.mjs --fetch --compress
 */
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const GENERATOR = path.join(ROOT, "scripts", "generate-bali-tour-pages.mjs");
const REMOTE_DIR = path.join(ROOT, "images", "remote");
const IMAGES_DIR = path.join(ROOT, "images");
const SKIP_DIRS = new Set(["west-collage-src", "remote"]);

const JPEG_QUALITY = 78;
const WEBP_QUALITY = 78;
const MAX_WIDTH_LOCAL = 1680;   // герои страниц; на десктопе блок ~1160px
const MAX_WIDTH_REMOTE = 1280;  // коллажи и места; сами страницы просят width=1280
const COMPRESS_THRESHOLD = 150 * 1024;

const args = new Set(process.argv.slice(2));
const kb = (n) => Math.round(n / 1024) + "KB";

function curl(url, dest) {
  return new Promise((resolve) => {
    execFile(
      "curl",
      ["-sSL", "--fail", "--max-time", "90",
        "-A", "Mozilla/5.0 (Macintosh) SBExcursions-asset-fetch/1.0",
        "-o", dest, url],
      { timeout: 100000 },
      (err) => resolve(!err)
    );
  });
}

function slugForUrl(url) {
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
  let base = decodeURIComponent(new URL(url).pathname.split("/").pop() || "photo");
  base = base.replace(/\.[a-z0-9]+$/i, "");
  base = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "photo";
  return `${base}-${hash}`;
}

async function recompressBuffer(buf, maxWidth) {
  const img = sharp(buf, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  const resized = meta.width && meta.width > maxWidth ? img.resize({ width: maxWidth }) : img;
  if (meta.format === "png") {
    // без потерь: та же картинка, плотнее упакована
    return { out: await resized.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer(), ext: ".png" };
  }
  if (meta.format === "webp") {
    return { out: await resized.webp({ quality: WEBP_QUALITY }).toBuffer(), ext: ".webp" };
  }
  return { out: await resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true }).toBuffer(), ext: ".jpg" };
}

async function fetchRemote() {
  let gen = await fs.readFile(GENERATOR, "utf8");
  const urlRe = /https:\/\/[^"'` )\\]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'` )\\]*)?/gi;
  const urls = [...new Set((gen.match(urlRe) || []).filter((u) => !/sbexcursion\.com|schema\.org/i.test(u)))];
  console.log(`Чужих картинок в генераторе: ${urls.length}`);
  await fs.mkdir(REMOTE_DIR, { recursive: true });

  const results = [];
  const pool = 6;
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      const slug = slugForUrl(url);
      const tmp = path.join(REMOTE_DIR, slug + ".tmp");
      try {
        const ok = await curl(url, tmp);
        if (!ok) throw new Error("download failed");
        const buf = await fs.readFile(tmp);
        if (buf.length < 4096) throw new Error("too small — likely an error page");
        const { out, ext } = await recompressBuffer(buf, MAX_WIDTH_REMOTE);
        const fileName = slug + ext;
        await fs.writeFile(path.join(REMOTE_DIR, fileName), out);
        results.push({ url, local: `/images/remote/${fileName}`, from: buf.length, to: out.length });
      } catch (e) {
        results.push({ url, error: e.message });
      } finally {
        await fs.rm(tmp, { force: true });
      }
    }
  }
  await Promise.all(Array.from({ length: pool }, worker));

  const okResults = results.filter((r) => r.local);
  const failed = results.filter((r) => r.error);
  for (const r of okResults) gen = gen.split(r.url).join(r.local);
  await fs.writeFile(GENERATOR, gen);

  const from = okResults.reduce((s, r) => s + r.from, 0);
  const to = okResults.reduce((s, r) => s + r.to, 0);
  console.log(`Скачано и переписано на свои: ${okResults.length} (${kb(from)} -> ${kb(to)})`);
  if (failed.length) {
    console.log(`НЕ удалось скачать ${failed.length} — эти остаются на чужих хостах:`);
    for (const f of failed) console.log(`  ${f.url}  (${f.error})`);
  }
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(path.join(dir, entry.name));
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      yield path.join(dir, entry.name);
    }
  }
}

async function compressLocal() {
  let touched = 0, skipped = 0, from = 0, to = 0;
  for await (const file of walk(IMAGES_DIR)) {
    const stat = await fs.stat(file);
    if (stat.size < COMPRESS_THRESHOLD) { skipped++; continue; }
    try {
      const buf = await fs.readFile(file);
      const { out } = await recompressBuffer(buf, MAX_WIDTH_LOCAL);
      // формат не меняем, путь не меняем; берём только явный выигрыш
      if (out.length < buf.length * 0.92) {
        await fs.writeFile(file, out);
        touched++; from += buf.length; to += out.length;
      } else {
        skipped++;
      }
    } catch (e) {
      console.log(`  пропуск ${path.relative(ROOT, file)}: ${e.message}`);
    }
  }
  console.log(`Пережато на месте: ${touched} файлов (${kb(from)} -> ${kb(to)}), пропущено: ${skipped}`);
}

if (args.has("--fetch")) await fetchRemote();
if (args.has("--compress")) await compressLocal();
if (!args.has("--fetch") && !args.has("--compress")) {
  console.log("Использование: node scripts/optimize-photos.mjs --fetch --compress");
}

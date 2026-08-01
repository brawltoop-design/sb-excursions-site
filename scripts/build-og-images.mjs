/*
 * Картинки для превью ссылок (Open Graph), 1200x630.
 *
 * Когда ссылку на тур кидают в Телеграм, WhatsApp или Фейсбук, площадка
 * тянет og:image. Раньше туда шло исходное фото тура пропорцией 1.5:1 или
 * 1.78:1, а площадки рисуют превью в 1.91:1 — и обрезали кадр сами, как
 * придётся: у части туров срезалось небо, у части — сам объект.
 *
 * Здесь из того же фото собирается карточка ровно 1200x630: кадр обрезан по
 * центру под нужную пропорцию, снизу затемнение, поверх — название тура,
 * цена и длительность. В переписке такая ссылка читается сразу, без перехода.
 *
 * Результат кладётся в images/og/<slug>.jpg. Запуск из scripts/build.mjs
 * после генератора, потому что данные о турах берутся из готовых страниц.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, "images", "og");
const W = 1200;
const H = 630;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const decode = (s) =>
  String(s).replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

// Переносим заголовок по словам. Ширину символа берём приблизительно
// (0.52 от кегля для этого шрифта) — точнее без замера шрифта не выйдет,
// а запас в 40px по краям покрывает погрешность.
function wrap(text, fontSize, maxWidth, maxLines) {
  const perChar = fontSize * 0.52;
  const limit = Math.floor(maxWidth / perChar);
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= limit) { line = candidate; continue; }
    if (line) lines.push(line);
    line = word;
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[,:;]?$/, "…");
  }
  return lines;
}

function card({ title, meta }) {
  const size = title.length > 46 ? 58 : title.length > 30 ? 68 : 78;
  const lines = wrap(title, size, W - 160, 2);
  const lineHeight = Math.round(size * 1.14);
  const blockH = lines.length * lineHeight;
  const metaY = H - 74;
  const titleTop = metaY - 44 - blockH + size * 0.82;

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="42%" stop-color="#000" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <text x="80" y="76" font-family="Helvetica,Arial,sans-serif" font-size="26"
        font-weight="700" fill="#ffffff" letter-spacing="4" opacity="0.92">SB EXCURSIONS</text>
  ${lines.map((l, i) => `<text x="80" y="${Math.round(titleTop + i * lineHeight)}"
        font-family="Helvetica,Arial,sans-serif" font-size="${size}" font-weight="700"
        fill="#ffffff">${esc(l)}</text>`).join("\n  ")}
  <text x="80" y="${metaY}" font-family="Helvetica,Arial,sans-serif" font-size="32"
        font-weight="500" fill="#ffffff" opacity="0.94">${esc(meta)}</text>
</svg>`);
}

/* Фирменные баннеры из images/banners. Если для тура есть нарисованный
   баннер, берём его вместо карточки, которую скрипт собирает сам: у него
   уже есть и название, и логотип, и подпись — рисовать поверх нечего.
   Ключ — имя файла без расширения, приведённое к нижнему регистру без
   лишних пробелов и знаков, чтобы переименование файла ничего не ломало. */
const BANNER_DIR = path.join(ROOT, "images", "banners");
const normalizeName = (s) =>
  String(s).toLowerCase().replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9]+/g, " ").trim();
const BANNER_TO_SLUG = new Map(Object.entries({
  "atv ride adventure": "atv-ride-adventure",
  "east private tour nusa penida": "nusa-penida-east-tour",
  "gili trawangan snorkeling tour": "gili-island-tour",
  "manta point snorkeling from bali": "nusa-penida-manta-rays-point",
  "mount batur jeep hot springs": "mount-batur-sunrise-jeep-hot-spring",
  "mount batur sunrise hike in bali": "mount-batur-sunrise-hike",
  "north city tour lovina dolphins": "north-bali-lovina-dolphins-tour",
  "nusa penida full 1 day tour": "nusa-penida-full-day-tour",
  "sumbawa whale shark snorkeling": "sumbawa-whale-shark-snorkeling-trip",
  "surf beginner lesson with instructor": "surf-lesson-experience",
  "ubud instagram tour": "ubud-instagram-tour",
  "west private tour nusa penida": "nusa-penida-west-tour",
}));

async function collectBanners() {
  const bySlug = new Map();
  const unmatched = [];
  let files = [];
  try {
    files = (await fs.readdir(BANNER_DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  } catch {
    return { bySlug, unmatched };
  }
  for (const file of files) {
    const slug = BANNER_TO_SLUG.get(normalizeName(file));
    if (slug) bySlug.set(slug, path.join(BANNER_DIR, file));
    else unmatched.push(file);
  }
  return { bySlug, unmatched };
}

async function renderBanner(file) {
  const meta = await sharp(file).metadata();
  const target = W / H;
  const ratio = meta.width / meta.height;
  const encode = (pipeline) =>
    pipeline.jpeg({ quality: 86, mozjpeg: true, progressive: true }).toBuffer();

  // Баннер уже нужной пропорции — не трогаем композицию вообще. Срезать у
  // него белое поле нельзя: без полей он становится 2.01:1, и подгонка назад
  // под 1.91:1 отрезала бы края вместе с текстом.
  if (Math.abs(ratio - target) < 0.02) {
    return encode(sharp(file).resize(W, H, { fit: "fill" }));
  }

  // Пропорция другая. Тогда сначала снимаем белое поле вокруг скруглённой
  // карточки — так кадрируем по полю, а не по надписям.
  const trimmed = await sharp(file).trim({ threshold: 12 }).toBuffer();
  return encode(sharp(trimmed).resize(W, H, { fit: "cover", position: "centre" }));
}

async function collectTours() {
  const files = (await fs.readdir(ROOT))
    .filter((f) => /^bali-tour-[a-z0-9-]+\.html$/.test(f))
    .filter((f) => !/-(?:ru|es|fr|zh)\.html$/.test(f));
  const tours = [];
  for (const file of files) {
    const html = await fs.readFile(path.join(ROOT, file), "utf8");
    const slug = file.replace(/^bali-tour-/, "").replace(/\.html$/, "");
    const title = decode((html.match(/<meta property="og:title" content="([^"]+)"/) || [, ""])[1])
      .replace(/\s*\|\s*SB Excursions\s*$/, "").trim();
    const source = (html.match(/<meta property="og:image" content="https:\/\/sbexcursion\.com(\/images\/[^"]+)"/) || [, ""])[1];
    if (!title || !source) continue;
    const price = (html.match(/From \$(\d+)/) || [])[1];
    const duration = (html.match(/>(\d+[–-]\d+ hours)</) || [])[1];
    const meta = [price ? `From $${price} per person` : "Private tour", duration]
      .filter(Boolean).join("   ·   ");
    tours.push({ slug, title, meta, source: path.join(ROOT, source.replace(/^\//, "")) });
  }
  return tours;
}

await fs.mkdir(OUT_DIR, { recursive: true });
const tours = await collectTours();
const { bySlug: banners, unmatched } = await collectBanners();
let fromBanner = 0;
let generated = 0;
const missing = [];

for (const tour of tours) {
  const banner = banners.get(tour.slug);
  if (banner) {
    await fs.writeFile(path.join(OUT_DIR, `${tour.slug}.jpg`), await renderBanner(banner));
    fromBanner++;
    continue;
  }
  try {
    await fs.access(tour.source);
  } catch {
    missing.push(tour.slug);
    continue;
  }
  const base = await sharp(tour.source)
    .resize(W, H, { fit: "cover", position: "attention" })
    .toBuffer();
  const out = await sharp(base)
    .composite([{ input: card(tour), top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toBuffer();
  await fs.writeFile(path.join(OUT_DIR, `${tour.slug}.jpg`), out);
  generated++;
}

console.log(JSON.stringify({
  "фирменных баннеров": fromBanner,
  "собрано скриптом": generated,
  размер: `${W}x${H}`,
  "нет исходника": missing,
  "баннер не опознан": unmatched,
}, null, 2));

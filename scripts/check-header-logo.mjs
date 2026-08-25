/*
 * Проверка: мобильный логотип в шапке журнала должен быть тёмным.
 *
 * До скролла мобильная шапка прозрачна (background:transparent), а страницы
 * журнала светлые. Белый файл там был белым по белому — логотип не
 * отображался ни на одной из 1446 статей, виден оставался только чёрный
 * бургер. Баг прожил до тех пор, пока о нём не сказал человек: сборка была
 * зелёной, страницы отдавали 200, картинка грузилась и даже занимала свои
 * 160x52 пикселя. Ошибка была не в разметке, а в цвете самих пикселей.
 *
 * Поэтому проверяем не «есть ли атрибут src», а «какого цвета файл»: читаем
 * PNG и считаем средний цвет непрозрачных пикселей. Проверка на имя файла
 * поймала бы только этот конкретный случай и промолчала бы, если однажды
 * подложат другой светлый файл под тем же именем.
 *
 * При скролле шапка темнеет, и правило brightness(0) invert(1) само красит
 * логотип в белый — то состояние от исходного цвета не зависит.
 *
 * Запуск из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
/* Проверяем ВСЕ картинки мобильной шапки, а не только логотип: ровно та же
   поломка нашлась вторым заходом на иконке переключения языка, и проверка,
   заточенная под один элемент, о ней промолчала. */
const BLOCK_RE = /<div class="sb-journal-tour-header__mobile"[\s\S]*?<\/div>\s*<\/div>/;
const IMG_RE = /<img[^>]+src="([^"]+\.png)"/g;

/* Минимальный разбор PNG: нам нужен только средний цвет, а тянуть sharp
   ради одной картинки в проверке — лишняя зависимость в горячем пути сборки. */
async function averageColour(file) {
  const buf = await fs.readFile(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("не PNG");
  let width = 0, height = 0, depth = 0, colourType = 0;
  const idat = [];
  let off = 8;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      depth = data[8]; colourType = data[9];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  /* Каналов на пиксель по типу цвета PNG: 0 — серый, 2 — RGB, 4 — серый с
     альфой, 6 — RGBA. Палитровый (3) не поддерживаем: у нас таких логотипов
     нет, а таблицу PLTE ради этого разбирать незачем. */
  const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };
  const bpp = CHANNELS[colourType];
  if (depth !== 8 || !bpp) throw new Error(`ожидался 8-битный PNG без палитры, получен depth=${depth} type=${colourType}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride); pos += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0, b = prev[x], c = x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 0xff;
    }
  }
  let r = 0, g = 0, bl = 0, n = 0;
  for (let i = 0; i < out.length; i += bpp) {
    let px, py, pz, alpha;
    if (bpp === 4) { px = out[i]; py = out[i + 1]; pz = out[i + 2]; alpha = out[i + 3]; }
    else if (bpp === 3) { px = out[i]; py = out[i + 1]; pz = out[i + 2]; alpha = 255; }
    else if (bpp === 2) { px = py = pz = out[i]; alpha = out[i + 1]; }
    else { px = py = pz = out[i]; alpha = 255; }
    if (alpha < 40) continue;               // прозрачный фон в счёт не идёт
    r += px; g += py; bl += pz; n++;
  }
  if (!n) throw new Error("в картинке нет непрозрачных пикселей");
  return { r: r / n, g: g / n, b: bl / n, pixels: n };
}

const files = (await fs.readdir(ROOT)).filter((f) => f.endsWith(".html"));
const sources = new Map();
for (const name of files) {
  const html = await fs.readFile(path.join(ROOT, name), "utf8");
  const block = BLOCK_RE.exec(html);
  if (!block) continue;
  IMG_RE.lastIndex = 0;
  let m;
  while ((m = IMG_RE.exec(block[0]))) {
    if (!sources.has(m[1])) sources.set(m[1], []);
    sources.get(m[1]).push(name);
  }
}

if (!sources.size) {
  console.log("  мобильной шапки журнала нет ни на одной странице — проверять нечего");
  process.exit(0);
}

let failed = false;
for (const [src, pages] of sources) {
  const file = path.join(ROOT, src.replace(/^\//, ""));
  let avg;
  try {
    avg = await averageColour(file);
  } catch (e) {
    console.error(`  ✗ ${src}: не смог прочитать (${e.message})`);
    failed = true;
    continue;
  }
  const lum = (0.2126 * avg.r + 0.7152 * avg.g + 0.0722 * avg.b) / 255;
  const verdict = lum > 0.5 ? "СВЕТЛЫЙ" : "тёмный";
  console.log(
    `  ${lum > 0.5 ? "✗" : "✓"} ${src} — ${verdict} (яркость ${lum.toFixed(2)}), страниц: ${pages.length}`
  );
  if (lum > 0.5) {
    failed = true;
    console.error(
      `    картинка светлее фона: до скролла шапка прозрачна, страницы журнала светлые —\n` +
      `    на ${pages.length} страницах её не будет видно. Нужен тёмный файл: для логотипа\n` +
      `    /images/remote/sb-excursions-dubai-b9dc6fbe.png, для иконки языка\n` +
      `    /images/ui/language-black.png`
    );
  }
}

if (failed) process.exit(1);

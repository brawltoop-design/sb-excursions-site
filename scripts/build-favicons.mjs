/*
 * Иконки сайта: сборка корневых файлов и единый набор тегов на всех страницах.
 *
 * Что было. На 1025 страницах стояла одна-единственная иконка — чёрный
 * логотип на прозрачном фоне. В тёмной теме он сливался с фоном: в браузерной
 * вкладке, в списке чатов, в превью ссылки. На 198 страницах Тильда оставила
 * правильную пару (светлая/тёмная), ещё 5 тянули картинку с чужого CDN, а на
 * 4 иконки не было вовсе. Файла /favicon.ico в корне не существовало совсем.
 *
 * Почему /favicon.ico важнее остальных. Большинство сервисов — ChatGPT,
 * Slack, Telegram, читалки — не разбирают HTML и не понимают атрибут media:
 * они дёргают /favicon.ico и показывают что дали, на СВОЁМ фоне. Никакая
 * автоматика там переключать иконку не будет. Поэтому в .ico кладём вариант
 * с плашкой: белый логотип на тёмном квадрате читается и на светлом фоне, и
 * на тёмном.
 *
 * Настоящее переключение получают только браузеры — через favicon.svg с
 * медиазапросом внутри. Там логотип честно чёрный днём и белый ночью.
 *
 * Порядок тегов не случайный: .ico идёт первым, чтобы простые парсеры взяли
 * растр, а браузеры всё равно предпочтут более умный SVG.
 *
 * Запуск: node scripts/build-favicons.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Исходники Тильды: логотип на прозрачном фоне в двух цветах и вариант с плашкой.
const SRC_LIGHT = path.join(ROOT, "images/tilda/favikon-sb-excursion-25e2d212.png"); // чёрный
const SRC_DARK = path.join(ROOT, "images/tilda/favikon-sb-excursion-862a4b19.png"); // белый
const SRC_PLATE = path.join(ROOT, "images/tilda/favikon-sb-excursion-4a3485d1.png"); // белый на #2b2b2b

const SVG_PX = 64; // логотип рисуется в 16–32 px, 64 даёт запас для 2x

const TAGS = [
  '<link rel="icon" href="/favicon.ico" sizes="32x32">',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
].join("\n");

/* ─── Корневые файлы ─────────────────────────────────────────────────── */

async function buildSvg() {
  const [light, dark] = await Promise.all(
    [SRC_LIGHT, SRC_DARK].map((src) =>
      sharp(src).resize(SVG_PX, SVG_PX).png({ compressionLevel: 9, palette: true }).toBuffer(),
    ),
  );
  // Два слоя вместо одного с фильтром: display переживает любой рендерер
  // иконок, а filter в некоторых движках до фавикона не доезжает.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_PX} ${SVG_PX}">
<style>
.sb-dark{display:none}
@media (prefers-color-scheme:dark){.sb-light{display:none}.sb-dark{display:inline}}
</style>
<image class="sb-light" width="${SVG_PX}" height="${SVG_PX}" href="data:image/png;base64,${light.toString("base64")}"/>
<image class="sb-dark" width="${SVG_PX}" height="${SVG_PX}" href="data:image/png;base64,${dark.toString("base64")}"/>
</svg>
`;
  await fs.writeFile(path.join(ROOT, "favicon.svg"), svg);
  return svg.length;
}

/* Контейнер ICO пишем руками: sharp его не умеет, а тянуть зависимость ради
   шести байт заголовка незачем. Внутри лежат обычные PNG — так умеет всё,
   что вышло после Windows Vista. */
function packIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // зарезервировано
  header.writeUInt16LE(1, 2); // тип: иконка
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // палитра не используется
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4); // плоскостей
    entry.writeUInt16LE(32, 6); // бит на пиксель
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function buildIco() {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map(async (size) => ({
      size,
      data: await sharp(SRC_PLATE).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
    })),
  );
  const ico = packIco(images);
  await fs.writeFile(path.join(ROOT, "favicon.ico"), ico);
  return ico.length;
}

async function buildAppleTouch() {
  // iOS сам скругляет углы и подставляет свой фон, поэтому плашка тут кстати.
  const png = await sharp(SRC_PLATE).resize(180, 180).png({ compressionLevel: 9 }).toBuffer();
  await fs.writeFile(path.join(ROOT, "apple-touch-icon.png"), png);
  return png.length;
}

/* ─── Теги на страницах ──────────────────────────────────────────────── */

const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner", ".generated", ".vercel"]);
const ICON_LINK = /[ \t]*<link[^>]*\brel=("|')(?:shortcut icon|icon|apple-touch-icon)\1[^>]*>\s*/gi;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

const stats = { "теги обновлены": 0, "уже верные": 0, "иконок не было": 0, "без head": 0 };

for await (const file of walk(ROOT)) {
  const html = await fs.readFile(file, "utf8");
  const had = ICON_LINK.test(html);
  ICON_LINK.lastIndex = 0;

  const headEnd = html.indexOf("</head>");
  if (headEnd === -1) {
    stats["без head"]++;
    continue;
  }

  // Чистим только шапку: в теле бывают ссылки на иконки в тексте статей.
  const head = html.slice(0, headEnd);
  const rest = html.slice(headEnd);
  const cleaned = head.replace(ICON_LINK, "");
  const next = `${cleaned.trimEnd()}\n${TAGS}\n${rest}`;

  if (next === html) {
    stats["уже верные"]++;
    continue;
  }
  await fs.writeFile(file, next);
  stats[had ? "теги обновлены" : "иконок не было"]++;
}

const [svgSize, icoSize, appleSize] = [await buildSvg(), await buildIco(), await buildAppleTouch()];
console.log(
  JSON.stringify(
    { ...stats, "favicon.svg": `${svgSize} Б`, "favicon.ico": `${icoSize} Б`, "apple-touch-icon.png": `${appleSize} Б` },
    null,
    2,
  ),
);

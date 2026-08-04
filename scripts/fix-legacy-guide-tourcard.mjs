/*
 * Карточка тура в сайдбаре шести старых гайдов журнала.
 *
 * Шесть гайдов (canggu-beaches, tour-prices, gili-day-trip, jeep-vs-hike,
 * penida-compared, whale-sharks) — статические файлы прошлых поколений
 * генератора: сборка их не перезаписывает, поэтому новая карточка тура
 * из шаблона к ним не попадает, а их встроенный CSS не знает ни стилей
 * карточки, ни починки sticky (overflow-x:clip).
 *
 * Что делает шаг, для каждого языка каждого гайда:
 *   1. Находит «якорный» тур гайда — по кнопке в шапке статьи
 *      (href вида /bali/<язык>/tours/<slug>).
 *   2. Достаёт уже готовую, уже переведённую карточку тура из свежей
 *      сгенерированной статьи того же тура на том же языке
 *      (bali-journal-<slug>-travel-guide[-язык].html) — так не нужно
 *      заново переводить ни названия, ни кнопки.
 *   3. Ставит карточку первым блоком в существующий сайдбар (старые
 *      блоки со ссылками остаются — это внутренние ссылки для SEO).
 *   4. Доклеивает недостающий CSS карточки и overflow-x:clip.
 *
 * Шаг идемпотентен: файл с карточкой пропускается.
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const EXTRA_CSS = `<style id="sb-journal-tourcard-css">
  html,html body{overflow-x:clip!important}
  .sb-journal-page{overflow-x:clip}
  .sb-journal-tourcard{padding:0;overflow:hidden}
  .sb-journal-tourcard__media{display:block;position:relative}
  .sb-journal-tourcard__media img{width:100%;height:190px;object-fit:cover;display:block}
  .sb-journal-tourcard__badge{position:absolute;left:14px;bottom:14px;background:rgba(17,17,17,0.78);color:#fff;padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.2px}
  .sb-journal-tourcard__title{margin:16px 18px 0;font-size:22px;line-height:1.25;letter-spacing:-0.6px}
  .sb-journal-tourcard__title a{color:inherit;text-decoration:none}
  .sb-journal-tourcard__title a:hover{text-decoration:underline}
  .sb-journal-tourcard__meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 18px 0}
  .sb-journal-tourcard__meta span{background:#f1f1ee;border-radius:999px;padding:6px 12px;font-size:13px;color:#4b4b50;font-weight:600}
  .sb-journal-tourcard__price{margin:14px 18px 0;font-size:26px;font-weight:800;letter-spacing:-0.5px}
  .sb-journal-tourcard__actions{display:grid;gap:10px;padding:16px 18px 20px}
  .sb-journal-tourcard__actions .sb-journal-primary,.sb-journal-tourcard__actions .sb-journal-secondary{width:100%;box-sizing:border-box}
</style>`;

const stats = { вставлено: 0, "уже есть": 0, "нет якорного тура": 0, "нет донора": 0 };
const problems = [];

const files = (await fs.readdir(ROOT)).filter(
  (name) => name.startsWith("bali-journal-guide-") && name.endsWith(".html"),
);

for (const name of files) {
  const file = path.join(ROOT, name);
  const html = await fs.readFile(file, "utf8");

  // Карточка уже стоит — освежаем только CSS-блок (он мог измениться)
  // и идём дальше.
  if (html.includes("sb-journal-tourcard")) {
    const refreshed = html.replace(/<style id="sb-journal-tourcard-css">[\s\S]*?<\/style>/, EXTRA_CSS);
    if (refreshed !== html) await fs.writeFile(file, refreshed);
    stats["уже есть"]++;
    continue;
  }
  if (!html.includes('<aside class="sb-journal-sidebar">')) continue;

  const lang = (name.match(/-(ru|es|fr|zh)\.html$/) || [])[1] || "en";

  // Якорный тур — куда ведёт главная кнопка в шапке статьи.
  const anchor = html.match(/class="sb-journal-primary" href="\/bali\/[a-z]{2}\/tours\/([a-z0-9-]+)"/);
  if (!anchor) { stats["нет якорного тура"]++; problems.push(`${name}: не нашёл кнопку с туром`); continue; }
  const slug = anchor[1];

  const donorName = `bali-journal-${slug}-travel-guide${lang === "en" ? "" : `-${lang}`}.html`;
  let donorHtml;
  try {
    donorHtml = await fs.readFile(path.join(ROOT, donorName), "utf8");
  } catch {
    stats["нет донора"]++; problems.push(`${name}: нет донора ${donorName}`); continue;
  }

  const card = donorHtml.match(/<div class="sb-journal-sidebar-card sb-journal-tourcard">[\s\S]*?<\/div>\s*<\/aside>/);
  if (!card) { stats["нет донора"]++; problems.push(`${name}: в ${donorName} нет карточки`); continue; }
  const cardHtml = card[0].replace(/\s*<\/aside>$/, "");

  let out = html.replace(
    '<aside class="sb-journal-sidebar">',
    `<aside class="sb-journal-sidebar">\n            ${cardHtml}`,
  );
  if (!out.includes('id="sb-journal-tourcard-css"')) {
    out = out.replace("</head>", `${EXTRA_CSS}\n</head>`);
  }
  await fs.writeFile(file, out);
  stats.вставлено++;
}

console.log(JSON.stringify(stats, null, 2));
if (problems.length) { console.log("проблемы:"); problems.forEach((p) => console.log("  ✗ " + p)); process.exit(1); }

/*
 * Канониклы и индексируемость страниц, которые генератор не создаёт.
 *
 * Найдено аудитом. Три разные болезни, все про одно: Google получает
 * противоречивые указания, какая страница главная.
 *
 * 1. Политики без каноникла. bali-privacy.html и bali-terms.html отдаются
 *    по 12+ адресам каждая (/privacy-policy, /terms, /bali/{5 языков}/…,
 *    плюс прямой .html) и не содержат ни каноникла, ни noindex. Одинаковый
 *    текст на дюжине URL без каноникла — Google выбирает дубликат сам.
 *
 * 2. Канониклы на редиректы. Дубайский хаб указывает каноникл на "/", а "/"
 *    отдаёт 308 на /bali/en/main-page — то есть страница сама говорит
 *    поисковику «я дубликат балийской главной». Пять дубайских туров,
 *    которые оставлены индексируемыми намеренно, указывают каноникл на
 *    голый домен без www, а он тоже 308-редиректит.
 *
 * 3. Служебные страницы Тильды в индексе. Фрагменты шапки и подвала и
 *    страница «не найдено» отдают 200 с index,follow. Это тонкий мусор,
 *    а /not-found вдобавок озаглавлена «Page Not Found | SB Excursions
 *    Dubai» — не тот заголовок, который стоит показывать в выдаче.
 *
 * Идемпотентно: повторный прогон ничего не дублирует.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";

/* Страница → каноничный адрес, по которому её реально стоит показывать. */
const CANONICALS = {
  "bali-privacy.html": `${SITE}/privacy-policy`,
  "bali-terms.html": `${SITE}/terms`,
  "page63806411.html": `${SITE}/dubai/en`,
};

/* Служебное и «не найдено» — вон из индекса, но ссылки пусть ходят. */
const NOINDEX = [
  "page111312446.html", // /not-found
  "page106032666.html", // фрагмент шапки
  "page106032906.html", // фрагмент подвала
  "page139295043.html", // второй фрагмент шапки, ничем не обслуживается
];

const stats = { "канониклов добавлено": 0, "канониклов исправлено": 0, "www в канониклах": 0, "закрыто от индексации": 0, "уже было": 0 };

async function readIfExists(file) {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

/* ── 1-2. Канониклы ──────────────────────────────────────────────────── */

for (const [name, canonical] of Object.entries(CANONICALS)) {
  const file = path.join(ROOT, name);
  let html = await readIfExists(file);
  if (html === null) continue;

  const tag = `<link rel="canonical" href="${canonical}">`;
  const existing = html.match(/<link rel="canonical" href="([^"]*)"\s*\/?>/i);

  if (!existing) {
    const headEnd = html.search(/<\/head>/i);
    if (headEnd === -1) continue;
    html = `${html.slice(0, headEnd)}  ${tag}\n${html.slice(headEnd)}`;
    stats["канониклов добавлено"]++;
  } else if (existing[1] !== canonical) {
    html = html.replace(existing[0], tag);
    stats["канониклов исправлено"]++;
  } else {
    stats["уже было"]++;
    continue;
  }
  await fs.writeFile(file, html);
}

/* Пять дубайских туров оставлены индексируемыми намеренно (туры продаются),
   но канониклы у них на голый домен — а он редиректит на www. */
const DUBAI_TOURS = [
  "page106026336.html",
  "page112631276.html",
  "page112638996.html",
  "page114154666.html",
  "page116517176.html",
];

for (const name of DUBAI_TOURS) {
  const file = path.join(ROOT, name);
  const html = await readIfExists(file);
  if (html === null) continue;
  const fixed = html.replace(
    /(<link rel="canonical" href="https:\/\/)sbexcursion\.com/i,
    "$1www.sbexcursion.com",
  );
  if (fixed !== html) {
    await fs.writeFile(file, fixed);
    stats["www в канониклах"]++;
  }
}

/* ── 3. Служебные страницы из индекса ────────────────────────────────── */

for (const name of NOINDEX) {
  const file = path.join(ROOT, name);
  let html = await readIfExists(file);
  if (html === null) continue;
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) {
    stats["уже было"]++;
    continue;
  }

  const robots = html.match(/<meta name="robots" content="[^"]*"\s*\/?>/i);
  if (robots) {
    html = html.replace(robots[0], '<meta name="robots" content="noindex, follow">');
  } else {
    const headEnd = html.search(/<\/head>/i);
    if (headEnd === -1) continue;
    html = `${html.slice(0, headEnd)}  <meta name="robots" content="noindex, follow">\n${html.slice(headEnd)}`;
  }
  await fs.writeFile(file, html);
  stats["закрыто от индексации"]++;
}

console.log(JSON.stringify(stats, null, 2));

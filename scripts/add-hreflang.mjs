/*
 * hreflang-теги на все балийские страницы (5 языков + x-default).
 *
 * Зачем. У каждой страницы есть версии en/ru/es/fr/zh, но в HTML не было
 * ни одного <link rel="alternate" hreflang> — альтернативы жили только в
 * sitemap. Без тегов в самих страницах языковые версии конкурируют между
 * собой в выдаче, а сигналы сущности размазываются по пяти URL.
 *
 * Почему пост-шагом, а не в шаблоне генератора: локализатор переписывает
 * в HTML все /bali/en/ на язык страницы, так что вставленный в шаблон
 * набор ссылок на «другие» языки он бы превратил в пять ссылок на один
 * и тот же язык. Здесь мы работаем с уже готовыми файлами.
 *
 * URL восстанавливаются из имён файлов (схема имён у генератора жёсткая):
 *   page128073236.html / bali-main-page-<l>.html  -> /bali/<l>/main-page
 *   bali-journal.html / bali-journal-<l>.html     -> /bali/<l>/journal
 *   bali-journal-guide-<slug>[-l].html            -> /bali/<l>/journal/<slug>
 *   bali-journal-<tour>-<type>[-l].html           -> /bali/<l>/journal/<tour>/<type>
 *   bali-tour-<slug>[-l].html                     -> /bali/<l>/tours/<slug>
 *   bali-faq/about/privacy/terms[-l].html         -> /bali/<l>/<page>
 *
 * Тег ставится, только если ВСЕ пять языковых файлов существуют.
 * Шаг идемпотентен: старый блок затирается и пишется заново.
 * Дубайские страницы не трогаем.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";
const LANGS = ["en", "ru", "es", "fr", "zh"];
const MARK_START = "<!-- sb-hreflang -->";
const MARK_END = "<!-- /sb-hreflang -->";

const ARTICLE_TYPES = ["travel-guide", "tour-schedule", "why-book"];

// -> { routeOf(lang), fileOf(lang) } либо null, если файл не из наших схем
function classify(name) {
  const m = (re) => name.match(re);
  let x;
  if (name === "page128073236.html" || (x = m(/^bali-main-page-(ru|es|fr|zh)\.html$/))) {
    return {
      routeOf: (l) => `/bali/${l}/main-page`,
      fileOf: (l) => (l === "en" ? "page128073236.html" : `bali-main-page-${l}.html`),
    };
  }
  if (name === "bali-journal.html" || (x = m(/^bali-journal-(ru|es|fr|zh)\.html$/))) {
    return {
      routeOf: (l) => `/bali/${l}/journal`,
      fileOf: (l) => (l === "en" ? "bali-journal.html" : `bali-journal-${l}.html`),
    };
  }
  if ((x = m(/^bali-journal-guide-(.+?)(?:-(ru|es|fr|zh))?\.html$/))) {
    const slug = x[1];
    return {
      routeOf: (l) => `/bali/${l}/journal/${slug}`,
      fileOf: (l) => (l === "en" ? `bali-journal-guide-${slug}.html` : `bali-journal-guide-${slug}-${l}.html`),
    };
  }
  for (const type of ARTICLE_TYPES) {
    const re = new RegExp(`^bali-journal-(.+?)-${type}(?:-(ru|es|fr|zh))?\\.html$`);
    if ((x = name.match(re))) {
      const tour = x[1];
      return {
        routeOf: (l) => `/bali/${l}/journal/${tour}/${type}`,
        fileOf: (l) => (l === "en" ? `bali-journal-${tour}-${type}.html` : `bali-journal-${tour}-${type}-${l}.html`),
      };
    }
  }
  if ((x = m(/^bali-tour-(.+?)(?:-(ru|es|fr|zh))?\.html$/))) {
    const slug = x[1];
    return {
      routeOf: (l) => `/bali/${l}/tours/${slug}`,
      fileOf: (l) => (l === "en" ? `bali-tour-${slug}.html` : `bali-tour-${slug}-${l}.html`),
    };
  }
  for (const page of ["faq", "about", "privacy", "terms"]) {
    const re = new RegExp(`^bali-${page}(?:-(ru|es|fr|zh))?\\.html$`);
    if (name.match(re)) {
      const route = page === "privacy" ? "privacy-policy" : page;
      return {
        routeOf: (l) => `/bali/${l}/${route}`,
        fileOf: (l) => (l === "en" ? `bali-${page}.html` : `bali-${page}-${l}.html`),
      };
    }
  }
  return null;
}

const stats = { добавлено: 0, обновлено: 0, "нет всех языков": 0, "не наша схема": 0 };

const names = (await fs.readdir(ROOT)).filter((n) => n.endsWith(".html"));
const nameSet = new Set(names);

for (const name of names) {
  const spec = classify(name);
  if (!spec) { stats["не наша схема"]++; continue; }

  if (!LANGS.every((l) => nameSet.has(spec.fileOf(l)))) { stats["нет всех языков"]++; continue; }

  const links = [
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${spec.routeOf(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}${spec.routeOf("en")}">`,
  ].join("\n    ");
  const block = `${MARK_START}\n    ${links}\n    ${MARK_END}`;

  const file = path.join(ROOT, name);
  let html = await fs.readFile(file, "utf8");
  const had = html.includes(MARK_START);
  html = html.replace(new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}\\s*`, "g"), "");
  if (!html.includes("</head>")) continue;
  html = html.replace("</head>", `${block}\n</head>`);
  await fs.writeFile(file, html);
  stats[had ? "обновлено" : "добавлено"]++;
}

console.log(JSON.stringify(stats, null, 2));

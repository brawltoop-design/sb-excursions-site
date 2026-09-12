#!/usr/bin/env node
/*
 * Честный lastmod в карте сайта.
 *
 * Было: генератор ставил всем 1487 адресам дату сборки. Каждый билд —
 * «все страницы изменились сегодня». Google прямо пишет, что перестаёт
 * учитывать lastmod, если ему нельзя верить, и это ровно тот случай.
 * Симптом в консоли: страницы туров обходятся раз в месяц
 * (white-water-rafting — 14 июля, mount-batur — 30 июля), то есть Google
 * не знает про правки, сделанные после.
 *
 * Стало: дата меняется только когда реально менялось содержимое страницы.
 * Считаем хеш файла и держим манифест адрес -> {хеш, дата}. Совпал хеш —
 * оставляем прежнюю дату, изменился — ставим сегодняшнюю. Тот же приём
 * содержимого-как-версии, что в add-partner-ref.mjs и stamp-css-version.mjs.
 *
 * Из хеша вырезаем метки версий ?v=..., иначе правка одного css помечала бы
 * как изменившиеся все страницы разом — то самое, от чего уходим.
 *
 * Запуск после генератора: node scripts/stamp-sitemap-lastmod.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DRY = process.argv.includes("--dry");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const MANIFEST = path.join(ROOT, ".generated", "sitemap-lastmod.json");
const TODAY = new Date().toISOString().slice(0, 10);

/* Те же правила, что в dev-static-server.mjs. Держим копию, а не импорт:
   там они вшиты в http-сервер и не экспортируются. */
function resolve(urlPath) {
  let m;
  if ((m = urlPath.match(/^\/bali\/(en|ru|es|fr|zh|de)\/privacy-policy$/))) return "/bali-privacy.html";
  if ((m = urlPath.match(/^\/bali\/(en|ru|es|fr|zh|de)\/terms$/))) return "/bali-terms.html";
  if ((m = urlPath.match(/^\/bali\/(en|ru|es|fr|zh|de)\/review$/))) return "/bali-review.html";
  if (urlPath === "/bali/en/about") return "/bali-about.html";
  if (urlPath === "/bali/en/faq") return "/bali-faq.html";
  if (urlPath === "/bali/en/guides") return "/bali-guides.html";
  if (urlPath === "/bali/en/journal") return "/bali-journal.html";
  if (urlPath === "/bali/en/tour-prices") return "/bali-prices-index.html";
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/(about|faq|guides)$/))) return `/bali-${m[2]}-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/journal$/))) return `/bali-journal-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/en\/journal\/([a-z0-9-]+)\/([a-z0-9-]+)$/))) return `/bali-journal-${m[1]}-${m[2]}.html`;
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/journal\/([a-z0-9-]+)\/([a-z0-9-]+)$/))) return `/bali-journal-${m[2]}-${m[3]}-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/en\/journal\/([a-z0-9-]+)$/))) return `/bali-journal-guide-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/journal\/([a-z0-9-]+)$/))) return `/bali-journal-guide-${m[2]}-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/en\/tours\/([a-z0-9-]+)$/))) return `/bali-tour-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/tours\/([a-z0-9-]+)$/))) return `/bali-tour-${m[2]}-${m[1]}.html`;
  if (urlPath === "/bali/en/main-page") return "/page128073236.html";
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh|de)\/main-page$/))) return `/bali-main-page-${m[1]}.html`;
  if (urlPath === "/dubai/en" || urlPath === "/dubai/en/main-page" || urlPath === "/dubai/en/blog") return "/page63806411.html";
  if ((m = urlPath.match(/^\/dubai\/en\/blog\/([a-z0-9-]+)$/))) return `/dubai-blog-${m[1]}.html`;
  if (urlPath === "/dubai/en/about") return "/page112152236.html";
  if (urlPath === "/dubai/en/faq") return "/page112258706.html";
  if (urlPath === "/dubai/en/tours/full-day-dubai-desert-safari") return "/page106026336.html";
  if (urlPath === "/dubai/en/tours/abu-dhabi-city-tour-from-dubai") return "/page112638996.html";
  if (urlPath === "/dubai/en/tours/hot-air-balloon-sunrise-flight") return "/page114154666.html";
  if (urlPath === "/dubai/en/tours/dubai-marina-yacht-party") return "/page112631276.html";
  if (urlPath === "/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour") return "/page116517176.html";
  /* Под-приложение отдаётся индексом из своей папки. */
  if (urlPath === "/ai-planner") return "/ai-planner/index.html";
  if (urlPath === "/work-with-us") return "/work-with-us.html";
  if ((m = urlPath.match(/^\/(ru|es|fr|zh|de)\/work-with-us$/))) return `/work-with-us-${m[1]}.html`;
  return urlPath;
}

/* Из отпечатка вырезаем то, что меняется сборкой, а не содержимым:
   - метки версий ?v=... — правка одного файла стилей не делает
     изменившимися все страницы сайта;
   - наши собственные подключаемые скрипты <script … src="/js/sb-*.js">:
     12 сентября 2026 шаг add-wa-track.mjs добавил один тег на все страницы,
     и карта сказала «изменились 1758 из 1759» — ровно то, от чего этот
     скрипт уходит. Счётчик или сторож не меняют содержимое для читателя
     и для Google, значит и дату менять не должны.
   Версии допускаем буквенно-цифровые: stamp-css-version.mjs ставит хеш, но
   руками встречались и даты вроде ?v=20260730e. */
const fingerprint = (html) =>
  createHash("sha256")
    .update(
      String(html)
        .replace(/\?v=[0-9a-zA-Z]+/g, "")
        .replace(/<script[^>]*\ssrc="\/js\/sb-[a-z0-9-]+\.js"[^>]*><\/script>/g, ""),
    )
    .digest("hex")
    .slice(0, 16);

/* Старый отпечаток — только для перехода: вырезал одни метки ?v=, а тега
   sb-wa-track на страницах ещё не было. Когда в выводе сборки счётчик
   «перенесено на новый отпечаток» станет нулём, этот блок можно удалить. */
const legacyFingerprint = (html) =>
  createHash("sha256")
    .update(
      String(html)
        .replace(/\?v=[a-f0-9]+/g, "")
        .replace(/<script defer src="\/js\/sb-wa-track\.js"><\/script>/g, ""),
    )
    .digest("hex")
    .slice(0, 16);

const sitemap = fs.readFileSync(SITEMAP, "utf8");
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8")); } catch {}

const stats = { всего: 0, изменились: 0, "дата сохранена": 0, "перенесено на новый отпечаток": 0, "файл не найден": 0, впервые: 0 };
const next = {};

/* Идём по <url> целиком: <loc> и <lastmod> лежат в одном блоке, а
   xhtml:link-альтернативы между ними — по ним ходить не надо. */
const out = sitemap.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
  const loc = inner.match(/<loc>([^<]+)<\/loc>/);
  if (!loc) return block;
  stats.всего += 1;

  const urlPath = loc[1].replace(/^https?:\/\/[^/]+/, "");
  const file = path.join(ROOT, resolve(urlPath).replace(/^\//, ""));

  /* Нерасознанный адрес резолвится сам в себя и может указать на папку —
     проверяем, что это именно файл, а не только что он существует. */
  const isFile = fs.existsSync(file) && fs.statSync(file).isFile();

  let date;
  if (!isFile) {
    stats["файл не найден"] += 1;
    date = manifest[urlPath]?.date || TODAY;
    next[urlPath] = { hash: manifest[urlPath]?.hash || "", date };
  } else {
    const html = fs.readFileSync(file, "utf8");
    const hash = fingerprint(html);
    const prev = manifest[urlPath];
    if (!prev) { date = TODAY; stats.впервые += 1; }
    else if (prev.hash === hash) { date = prev.date; stats["дата сохранена"] += 1; }
    else if (legacyFingerprint(html) === prev.hash) {
      /* Одноразовый переход 12.09.2026: манифест считан старым отпечатком,
         содержимое не менялось — переносим хеш, дату оставляем. */
      date = prev.date; stats["перенесено на новый отпечаток"] += 1;
    }
    else { date = TODAY; stats.изменились += 1; }
    next[urlPath] = { hash, date };
  }

  return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${date}</lastmod>`);
});

if (!DRY) {
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(next, null, 1));
  fs.writeFileSync(SITEMAP, out);
}

/* Сколько разных дат получилось — главный показатель того, что шаг работает.
   Одна дата на всю карту означает, что мы вернулись к прежнему поведению. */
const dates = new Set(Object.values(next).map((v) => v.date));
console.log(JSON.stringify({ ...stats, "разных дат в карте": dates.size, режим: DRY ? "проверка" : "применено" }, null, 1));

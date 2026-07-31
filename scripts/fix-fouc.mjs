#!/usr/bin/env node
/**
 * Убирает две причины «мигания»/белого экрана на всех статических страницах.
 *
 * 1) Скрипт Tilda «visited»: на первом просмотре во вкладке он прячет и шапку,
 *    и весь контент (.t-records{opacity:0}) на десктопе ≥980px и показывает их
 *    только через 400мс после DOMContentLoaded плюс 200мс плавного появления.
 *    Пользы для нас нет — это чистая задержка, и именно она даёт «первая
 *    страница как будто сломана, остальные нормально».
 *
 * 2) Отсутствие страховки у нашего body{opacity:0}: видимость возвращает
 *    только /css/fonts-cinageo.css. Если он не загрузится (404, блокировщик,
 *    обрыв сети) — страница останется белой навсегда. Добавляем аварийный
 *    показ через 3 секунды: при нормальной загрузке он ничего не делает,
 *    потому что стиль уже вернул видимость.
 *
 * Запуск:  node scripts/fix-fouc.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry");

// Скрипт Tilda, задерживающий показ на 400мс. Опознаём по началу и концу,
// чтобы не зависеть от точного содержимого середины.
const VISITED_RE =
  /<script type="text\/javascript">\(function\(\) \{if\(\(\/bot\|google[\s\S]*?t_setvisRecs\);\}\}\)\(\);<\/script>/g;

// Аварийный показ. Ставится сразу после скрывающего стиля, до всех остальных
// ресурсов, поэтому сработает даже если ни один внешний CSS не доедет.
const FAILSAFE_ID = "sb-fouc-failsafe";
const FAILSAFE = `<script id="${FAILSAFE_ID}">(function(){function s(){try{var b=document.body;if(!b)return;if(getComputedStyle(b).opacity!=="0")return;b.style.setProperty("opacity","1","important");}catch(e){}}setTimeout(s,3000);window.addEventListener("load",function(){setTimeout(s,600);});})();</script>`;

// У TildaSans в CSS Tilda не задан font-display. По умолчанию браузер прячет
// текст, пока шрифт не приедет (до 3с), — а вся кириллица набрана именно им,
// поэтому русский текст появляется рывком. Шрифт лежит на static.tildacdn.COM,
// а прогрев соединения в шаблоне настроен на .ONE — не на тот хост.
// Греем правильный хост и начинаем качать шрифт сразу, параллельно со стилями.
const FONT_HINTS_ID = "sb-font-hints";
const FONT_HINTS =
  `<link id="${FONT_HINTS_ID}" rel="preconnect" href="https://static.tildacdn.com" crossorigin>` +
  `<link rel="preload" as="font" type="font/woff2" href="https://static.tildacdn.com/fonts/tildasans/TildaSans-VF.woff2" crossorigin>`;

const HIDE = `<style>body{opacity:0!important}</style>`;

const files = [];
for (const dir of [ROOT, path.join(ROOT, "files")]) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".html")) files.push(path.join(dir, name));
  }
}

const stats = { visitedRemoved: 0, failsafeAdded: 0, fontHintsAdded: 0, touched: 0, skipped: 0 };

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let html = original;

  const hits = html.match(VISITED_RE);
  if (hits) {
    html = html.replace(VISITED_RE, "");
    stats.visitedRemoved += hits.length;
  }

  // страховку ставим только тем, кто реально прячет body
  if (html.includes(HIDE) && !html.includes(`id="${FAILSAFE_ID}"`)) {
    html = html.replace(HIDE, HIDE + FAILSAFE);
    stats.failsafeAdded += 1;
  }

  // подсказки для шрифта — только тем страницам, которые реально грузят TildaSans
  if (html.includes("fonts-tildasans.css") && !html.includes(`id="${FONT_HINTS_ID}"`)) {
    html = html.replace(HIDE, HIDE + FONT_HINTS);
    stats.fontHintsAdded += 1;
  }

  if (html !== original) {
    if (!DRY) fs.writeFileSync(file, html);
    stats.touched += 1;
  } else {
    stats.skipped += 1;
  }
}

console.log(JSON.stringify({ режим: DRY ? "проверка" : "применено", ...stats }, null, 1));

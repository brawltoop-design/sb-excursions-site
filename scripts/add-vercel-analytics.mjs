/*
 * Vercel Web Analytics на статических страницах.
 *
 * Сайт — экспорт Tilda без сборщика, поэтому пакет @vercel/analytics и
 * React-компонент <Analytics/> здесь неприменимы: их нечем собирать. Для
 * такого случая Vercel отдаёт готовый скрипт со своего же домена:
 *
 *     <script defer src="/_vercel/insights/script.js"></script>
 *
 * Он работает только на самом Vercel (локально этот путь отдаёт 404 — это
 * нормально) и включается в панели проекта, вкладка Analytics.
 *
 * Согласие: счётчик Vercel не ставит cookies и не собирает персональные
 * данные, поэтому он НЕ заворачивается в наш consent-гейт — иначе цифры
 * посещаемости пропадали бы у всех, кто не нажал «Принять». Clarity, GA,
 * GTM и Метрика по-прежнему под гейтом, их поведение не меняется.
 *
 * Дубайские страницы намеренно пропускаются — владелец просил их не трогать.
 * Снять исключение: node scripts/add-vercel-analytics.mjs --include-dubai
 *
 * Запуск после генератора: node scripts/add-vercel-analytics.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TAG =
  '<script>try{if(!localStorage.getItem("va-disable")){var v=document.createElement("script");' +
  'v.defer=true;v.src="/_vercel/insights/script.js";document.head.appendChild(v);}}catch(e){' +
  'var v2=document.createElement("script");v2.defer=true;v2.src="/_vercel/insights/script.js";' +
  'document.head.appendChild(v2);}</script>';
const OLD_TAG = '<script defer src="/_vercel/insights/script.js"></script>';
const MARKER = "/_vercel/insights/script.js";

const DUBAI = new Set([
  "page116517176.html", "page114154666.html", "page112638996.html",
  "page112631276.html", "page106026336.html",
  "files/page116517176body.html", "files/page114154666body.html",
  "files/page112638996body.html", "files/page112631276body.html",
  "files/page106026336body.html",
]);

const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner"]);
const includeDubai = process.argv.includes("--include-dubai");

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

const stats = { added: 0, migrated: 0, already: 0, skippedDubai: 0, noBody: 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (!includeDubai && DUBAI.has(rel)) { stats.skippedDubai++; continue; }

  let html = await fs.readFile(file, "utf8");
  /* Старая безусловная форма тега заменяется на условную. Проверка по
     MARKER одинаково срабатывает на обеих, поэтому миграцию делаем до неё,
     иначе страницы навсегда остались бы со старым тегом. */
  if (html.includes(OLD_TAG)) {
    html = html.replace(OLD_TAG, TAG);
    await fs.writeFile(file, html);
    stats.migrated++;
    continue;
  }
  if (html.includes(MARKER)) { stats.already++; continue; }

  // Фрагменты files/*body.html не самостоятельные документы — </body> в них
  // может не быть; такие пропускаем, счётчик приедет со страницы-владельца.
  const idx = html.lastIndexOf("</body>");
  if (idx === -1) { stats.noBody++; continue; }

  await fs.writeFile(file, html.slice(0, idx) + TAG + "\n" + html.slice(idx));
  stats.added++;
}

console.log(JSON.stringify(stats, null, 2));

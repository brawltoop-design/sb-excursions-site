/*
 * Партнёрская метка в ссылках WhatsApp — подключение на все страницы.
 *
 * Сам скрипт лежит в js/sb-partner-ref.js. Здесь только вставка тега перед
 * </body>, как это уже делают шаги счётчика и согласия. Отдельным файлом, а
 * не инлайном: страниц около 900, инлайн добавил бы к каждой три килобайта.
 *
 * Дубайские страницы не трогаем — договорённость с владельцем.
 * Снять исключение: node scripts/add-partner-ref.mjs --include-dubai
 *
 * Запуск после генератора: node scripts/add-partner-ref.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TAG = '<script defer src="/js/sb-partner-ref.js"></script>';
const MARKER = "/js/sb-partner-ref.js";

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

const stats = { добавлено: 0, "уже стоит": 0, "дубай пропущен": 0, "без body": 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (!includeDubai && DUBAI.has(rel)) { stats["дубай пропущен"]++; continue; }

  const html = await fs.readFile(file, "utf8");
  if (html.includes(MARKER)) { stats["уже стоит"]++; continue; }

  // Фрагменты files/*body.html не самостоятельные документы — </body> в них
  // может не быть; такие пропускаем, скрипт приедет со страницы-владельца.
  const idx = html.lastIndexOf("</body>");
  if (idx === -1) { stats["без body"]++; continue; }

  await fs.writeFile(file, html.slice(0, idx) + TAG + "\n" + html.slice(idx));
  stats["добавлено"]++;
}

console.log(JSON.stringify(stats, null, 2));

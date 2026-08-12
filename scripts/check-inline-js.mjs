/*
 * Сторож: проверяет, что инлайновый JS на страницах вообще парсится.
 *
 * Появился после того, как французский перевод «Ouvrir l'itinéraire» попал
 * внутрь строкового литерала в одинарных кавычках и уронил скрипт разом на
 * всех 28 французских страницах туров. Браузер такую ошибку не показывает:
 * он молча не выполняет блок, и вместе с ним пропадают карта маршрута,
 * карточка частного тура и состояние шапки. Внешне страница живая — просто
 * «дизайн другой». Поймать это глазами нереально: страниц больше тысячи.
 *
 * Ошибка почти всегда одна и та же по природе: язык с апострофами (fr, es)
 * или кавычками подставляется в JS без экранирования. Поэтому шаг падает,
 * а не предупреждает: выкатывать такое нельзя.
 *
 * JSON-LD пропускаем — это не JavaScript, там свои правила.
 *
 * Запуск: node scripts/check-inline-js.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner", ".generated", ".vercel"]);

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

const broken = [];
let pages = 0;
let blocks = 0;

for await (const file of walk(ROOT)) {
  pages++;
  const html = await fs.readFile(file, "utf8");
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1] || "";
    if (/\ssrc\s*=/i.test(attrs)) continue;
    if (/type\s*=\s*["'][^"']*json/i.test(attrs)) continue;
    const code = match[2];
    if (!code.trim()) continue;
    blocks++;
    try {
      new vm.Script(code);
    } catch (error) {
      const line = html.slice(0, match.index).split("\n").length;
      broken.push({
        file: path.relative(ROOT, file),
        line,
        message: String(error.message).split("\n")[0].slice(0, 120),
      });
    }
  }
}

if (broken.length) {
  console.error(`\n✗ сломанный инлайновый JS: ${broken.length} блоков на ${new Set(broken.map((b) => b.file)).size} страницах\n`);
  const byMessage = new Map();
  for (const item of broken) {
    if (!byMessage.has(item.message)) byMessage.set(item.message, []);
    byMessage.get(item.message).push(item);
  }
  for (const [message, list] of [...byMessage].sort((a, b) => b[1].length - a[1].length)) {
    console.error(`  ${list.length} × ${message}`);
    for (const item of list.slice(0, 3)) console.error(`      ${item.file}:${item.line}`);
    if (list.length > 3) console.error(`      … и ещё ${list.length - 3}`);
  }
  console.error("\nЧаще всего это апостроф из fr/es перевода внутри строки в одинарных кавычках.");
  process.exit(1);
}

console.log(`проверено ${blocks} блоков на ${pages} страницах — синтаксических ошибок нет`);

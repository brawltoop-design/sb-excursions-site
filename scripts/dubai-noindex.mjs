/*
 * Дубайские страницы — вон из индекса Google, но остаются на сайте.
 *
 * Зачем. Сайт продаёт Бали, а в индексе висят 19 страниц про Дубай: 205 показов
 * за три недели и ноль кликов. Google определяет тематику сайта по совокупности
 * контента, и дубайский блок размывает сигнал «это про Бали» — тот самый сигнал,
 * за который мы боремся всеми остальными правками.
 *
 * Почему noindex, а не удаление: страницы продолжают работать по прямым ссылкам
 * (их шлют клиентам), а follow оставляет вес, который они передают внутрь сайта.
 * Решение обратимо — этот шаг просто перестаёт запускаться.
 *
 * Дубайские туры (dubai/en/tours/...) не трогаем: их продают, они должны искаться.
 * Под noindex уходит только блог.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TAG = '<meta name="robots" content="noindex, follow">';

const stats = { "закрыто от индексации": 0, "уже закрыто": 0, "без head": 0 };

const names = (await fs.readdir(ROOT)).filter((n) => n.startsWith("dubai-blog-") && n.endsWith(".html"));

for (const name of names) {
  const file = path.join(ROOT, name);
  const html = await fs.readFile(file, "utf8");

  if (/name="robots"[^>]*noindex/i.test(html)) { stats["уже закрыто"]++; continue; }

  const existing = html.match(/<meta\s+name="robots"[^>]*>/i);
  if (existing) {
    await fs.writeFile(file, html.replace(existing[0], TAG));
    stats["закрыто от индексации"]++;
    continue;
  }

  const head = html.match(/<head[^>]*>/i);
  if (!head) { stats["без head"]++; continue; }
  const at = html.indexOf(head[0]) + head[0].length;
  await fs.writeFile(file, `${html.slice(0, at)}\n    ${TAG}${html.slice(at)}`);
  stats["закрыто от индексации"]++;
}

console.log(JSON.stringify(stats, null, 2));

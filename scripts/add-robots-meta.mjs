/*
 * Разрешение Google показывать крупные картинки в выдаче.
 *
 * По умолчанию Google берёт для сниппета миниатюру своего размера — то есть
 * почти никогда её не показывает. Крупные превью, как у конкурентов в поиске,
 * включаются одним тегом:
 *
 *     <meta name="robots" content="index, follow, max-image-preview:large, ...">
 *
 * max-image-preview:large — разрешает большую картинку рядом с результатом.
 * max-snippet:-1          — снимает ограничение на длину текста сниппета.
 * max-video-preview:-1    — то же для видео.
 *
 * Само по себе это не гарантирует картинку: Google решает сам, и ему нужны
 * подходящие изображения на странице (у нас есть — hero, карточки и image
 * в schema BlogPosting). Но БЕЗ этого тега крупного превью не будет никогда.
 *
 * Страницу с noindex (bali-review.html) не трогаем: она намеренно скрыта.
 * Дубайские страницы пропускаем — владелец просил их не трогать.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TAG =
  '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">';

const DUBAI = new Set([
  "page116517176.html", "page114154666.html", "page112638996.html",
  "page112631276.html", "page106026336.html",
  "files/page116517176body.html", "files/page114154666body.html",
  "files/page112638996body.html", "files/page112631276body.html",
  "files/page106026336body.html",
]);
const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner"]);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

const stats = { added: 0, upgraded: 0, already: 0, noindexKept: 0, skippedDubai: 0, noHead: 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (DUBAI.has(rel)) { stats.skippedDubai++; continue; }

  const html = await fs.readFile(file, "utf8");

  if (/name="robots"[^>]*noindex/i.test(html)) { stats.noindexKept++; continue; }
  if (html.includes("max-image-preview")) { stats.already++; continue; }

  // уже есть index,follow — заменяем на расширенный
  const existing = html.match(/<meta\s+name="robots"[^>]*>/i);
  if (existing) {
    await fs.writeFile(file, html.replace(existing[0], TAG));
    stats.upgraded++;
    continue;
  }

  // тега нет — ставим сразу после открытия <head>
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) { stats.noHead++; continue; }
  const at = html.indexOf(headMatch[0]) + headMatch[0].length;
  await fs.writeFile(file, html.slice(0, at) + "\n    " + TAG + html.slice(at));
  stats.added++;
}

console.log(JSON.stringify(stats, null, 2));

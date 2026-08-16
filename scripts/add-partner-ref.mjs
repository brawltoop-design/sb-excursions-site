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
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* Версия по содержимому файла.
 *
 * vercel.json отдаёт js с max-age=86400, а тег стоял без версии — правка
 * скрипта доезжала до вернувшегося посетителя только через сутки. Проверять
 * такое вручную бесполезно: на сервере уже новый файл, а в браузере ещё
 * старый, и выглядит это как «не задеплоилось».
 *
 * Хеш от содержимого, а не дата: пересборка без правок скрипта не сбрасывает
 * кэш у людей на ровном месте. Тот же приём, что в stamp-css-version.mjs,
 * только считается сам и входит в конвейер сборки. */
const SCRIPT_PATH = "/js/sb-partner-ref.js";
const version = createHash("sha256")
  .update(await fs.readFile(path.join(ROOT, "js", "sb-partner-ref.js")))
  .digest("hex")
  .slice(0, 8);

const TAG = `<script defer src="${SCRIPT_PATH}?v=${version}"></script>`;
const MARKER = TAG;
// Тег предыдущей версии (или вовсе без неё) — чтобы заменить, а не продублировать.
const ANY_TAG = /<script defer src="\/js\/sb-partner-ref\.js(?:\?v=[a-f0-9]+)?"><\/script>\n?/g;

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

  let html = await fs.readFile(file, "utf8");
  if (html.includes(MARKER)) { stats["уже стоит"]++; continue; }

  /* Тег прошлой версии убираем: иначе на странице окажется два скрипта. */
  if (ANY_TAG.test(html)) {
    ANY_TAG.lastIndex = 0;
    html = html.replace(ANY_TAG, "");
    stats["версия обновлена"] = (stats["версия обновлена"] || 0) + 1;
  }
  ANY_TAG.lastIndex = 0;

  // Фрагменты files/*body.html не самостоятельные документы — </body> в них
  // может не быть; такие пропускаем, скрипт приедет со страницы-владельца.
  const idx = html.lastIndexOf("</body>");
  if (idx === -1) { stats["без body"]++; continue; }

  await fs.writeFile(file, html.slice(0, idx) + TAG + "\n" + html.slice(idx));
  stats["добавлено"]++;
}

console.log(JSON.stringify(stats, null, 2));

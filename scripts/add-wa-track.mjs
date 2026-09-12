/* Подключение счётчика кликов по WhatsApp на все страницы, где есть такая
 * ссылка.
 *
 * Почему отдельный шаг, а не sb-static-parity.js: тот подключён на 234
 * страницах (туры и главная), а ссылки wa.me стоят на 2002 — журнал, где
 * 98 % кликов из поиска, не считался вовсе. Сам счётчик и причины —
 * в js/sb-wa-track.js.
 *
 * По образцу add-swipe-guard.mjs: версия по хешу содержимого (vercel.json
 * отдаёт js с длинным кэшем — без версии правка не доедет), идемпотентная
 * замена тега, проверка результата по всем файлам. Планировщик в ai-planner/
 * пропускаем: он в iframe и отдаёт клики родителю через postMessage.
 *
 * Запуск из scripts/build.mjs после add-swipe-guard.mjs.
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = "js/sb-wa-track.js";

const version = createHash("sha256")
  .update(await fs.readFile(path.join(ROOT, SRC)))
  .digest("hex")
  .slice(0, 8);

const TAG = `<script defer src="/${SRC}?v=${version}"></script>`;
const ANY_TAG = /<script defer src="\/js\/sb-wa-track\.js(?:\?v=[0-9a-zA-Z]+)?"><\/script>/g;

/* Признак страницы: ссылка на WhatsApp в разметке или скрипт, который её
   строит на лету (FAB на журнале, планировщик на главной). */
const NEEDS = /wa\.me|api\.whatsapp\.com|sb-planner-fab\.js|sb-static-parity\.js/;

const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner", "audit"]);

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

let added = 0;
let updated = 0;
let skipped = 0;

for await (const file of walk(ROOT)) {
  const original = await fs.readFile(file, "utf8");
  if (!NEEDS.test(original)) {
    skipped += 1;
    continue;
  }
  let html = original;
  const had = ANY_TAG.test(html);
  ANY_TAG.lastIndex = 0;
  if (had) {
    html = html.replace(ANY_TAG, TAG);
    if (html !== original) updated += 1;
  } else if (html.includes("</body>")) {
    html = html.replace("</body>", `${TAG}</body>`);
    added += 1;
  } else {
    continue;
  }
  if (html !== original) await fs.writeFile(file, html);
}

/* Проверяем результат: страница со ссылкой WhatsApp без счётчика — та самая
   тихая поломка, ради которой шаг написан. */
const missing = [];
for await (const file of walk(ROOT)) {
  const html = await fs.readFile(file, "utf8");
  if (!html.includes("</body>")) continue;
  if (NEEDS.test(html) && !html.includes(`/${SRC}`)) missing.push(path.basename(file));
  /* Два тега — два события на клик. Версию штампует ещё и stamp-css-version.mjs,
     и если она когда-нибудь окажется не шестнадцатеричной, ANY_TAG её не
     узнает и вставит тег второй раз — ловим это здесь, а не в отчётах. */
  if (html.split(`/${SRC}`).length > 2) missing.push(`${path.basename(file)} (тег дважды)`);
}

console.log(JSON.stringify({
  "тег добавлен": added,
  "версия обновлена": updated,
  "страниц без WhatsApp": skipped,
  "осталось без счётчика": missing.length,
  ...(missing.length ? { примеры: missing.slice(0, 5) } : {}),
}, null, 2));
if (missing.length) process.exitCode = 1;

/* Подключение сторожа свайпа на страницы с каруселями.
 *
 * Сам сторож и причина — в js/sb-swipe-guard.js. Здесь только вставка тега,
 * по образцу остальных наших шагов: версия по хешу содержимого, иначе правку
 * не увидит вернувшийся посетитель (vercel.json отдаёт js с длинным max-age),
 * и идемпотентность — повторный запуск заменяет тег, а не добавляет второй.
 *
 * Ставим на все страницы, где есть карусель или лента туров: они живут не
 * только на главной, но и на страницах туров, и симптом там тот же.
 *
 * Запуск из scripts/build.mjs после генератора.
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = "js/sb-swipe-guard.js";

const version = createHash("sha256")
  .update(await fs.readFile(path.join(ROOT, SRC)))
  .digest("hex")
  .slice(0, 8);

const TAG = `<script defer src="/${SRC}?v=${version}"></script>`;
const ANY_TAG = /<script defer src="\/js\/sb-swipe-guard\.js(?:\?v=[0-9a-zA-Z]+)?"><\/script>/g;

/* Признак страницы с каруселью: класс слайдера или ленты туров в разметке. */
const NEEDS = /t-slds|t1003__/;

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

/* Проверяем результат, а не факт замены: страница с каруселью без сторожа —
   это ровно та тихая поломка, ради которой шаг написан. */
const missing = [];
for await (const file of walk(ROOT)) {
  const html = await fs.readFile(file, "utf8");
  /* Фрагменты Tilda (files/pageNNNbody.html) — не страницы: у них нет
     </body>, они вставляются внутрь других файлов, и тег там уже стоит.
     Требовать сторож от куска разметки бессмысленно. */
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
  "страниц без карусели": skipped,
  "осталось без сторожа": missing.length,
  ...(missing.length ? { примеры: missing.slice(0, 5) } : {}),
}, null, 2));
if (missing.length) process.exitCode = 1;

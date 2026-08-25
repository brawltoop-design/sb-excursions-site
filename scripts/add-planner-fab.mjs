/*
 * Плавающая кнопка «бесплатный план поездки» — подключение на статьи.
 *
 * Ставим только на журнал: у страниц туров есть «Book now» на первом экране и
 * кнопка в липкой шапке, третья кнопка там мешала бы.
 *
 * Заодно снимает теги прежней кнопки WhatsApp: она стояла в том же углу, её
 * файлы удалены, и без явной уборки в 1469 страницах остались бы ссылки на
 * несуществующие /js/sb-whatsapp-fab.js и /css/sb-whatsapp-fab.css. Такие
 * теги ничего не ломают на вид, но дают по два лишних запроса с 404 на
 * страницу — и молча живут, потому что сборка о них не сообщает.
 *
 * Версия по хешу содержимого: vercel.json отдаёт js и css с max-age, и без
 * версии правка доезжала бы до вернувшегося посетителя только через сутки.
 *
 * Идемпотентно: повторный запуск заменяет тег, а не добавляет второй.
 *
 * Запуск из scripts/build.mjs после генератора.
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const hashOf = async (rel) =>
  createHash("sha256").update(await fs.readFile(path.join(ROOT, rel))).digest("hex").slice(0, 8);

const jsV = await hashOf("js/sb-planner-fab.js");
const cssV = await hashOf("css/sb-planner-fab.css");

const TAG =
  `<link rel="stylesheet" href="/css/sb-planner-fab.css?v=${cssV}">` +
  `<script defer src="/js/sb-planner-fab.js?v=${jsV}"></script>`;

const ANY_TAG =
  /<link rel="stylesheet" href="\/css\/sb-planner-fab\.css(?:\?v=[a-f0-9]+)?">\s*<script defer src="\/js\/sb-planner-fab\.js(?:\?v=[a-f0-9]+)?"><\/script>\n?/g;

/* Теги удалённой кнопки WhatsApp — вычищаем везде, а не только в журнале. */
const OLD_WA =
  /<link rel="stylesheet" href="\/css\/sb-whatsapp-fab\.css(?:\?v=[a-f0-9]+)?">\s*<script defer src="\/js\/sb-whatsapp-fab\.js(?:\?v=[a-f0-9]+)?"><\/script>\n?/g;

const IS_JOURNAL = /^bali-journal(?:-guide)?-[a-z0-9-]+(?:-(?:ru|es|fr|zh|de))?\.html$/;

const stats = {
  добавлено: 0, "версия обновлена": 0, "уже стоит": 0,
  "убрана кнопка WhatsApp": 0, "не журнал": 0, "без body": 0,
};

for (const name of (await fs.readdir(ROOT)).filter((f) => f.endsWith(".html"))) {
  const file = path.join(ROOT, name);
  let html = await fs.readFile(file, "utf8");
  let changed = false;

  OLD_WA.lastIndex = 0;
  if (OLD_WA.test(html)) {
    OLD_WA.lastIndex = 0;
    html = html.replace(OLD_WA, "");
    stats["убрана кнопка WhatsApp"]++;
    changed = true;
  }

  if (!IS_JOURNAL.test(name)) {
    stats["не журнал"]++;
    if (changed) await fs.writeFile(file, html);
    continue;
  }

  if (html.includes(TAG)) {
    stats["уже стоит"]++;
    if (changed) await fs.writeFile(file, html);
    continue;
  }

  ANY_TAG.lastIndex = 0;
  if (ANY_TAG.test(html)) {
    ANY_TAG.lastIndex = 0;
    html = html.replace(ANY_TAG, "");
    stats["версия обновлена"]++;
  } else {
    stats["добавлено"]++;
  }

  if (!html.includes("</body>")) { stats["без body"]++; continue; }
  html = html.replace("</body>", `${TAG}\n</body>`);
  await fs.writeFile(file, html);
}

console.log(JSON.stringify(stats, null, 2));

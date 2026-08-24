/*
 * Плавающая кнопка WhatsApp — подключение на страницы статей.
 *
 * Ставим ТОЛЬКО на журнал: у страниц туров и так есть «Book now» на первом
 * экране и липкая шапка с кнопкой, вторая плавающая кнопка там перекрывала бы
 * контент без пользы. На статье написать можно только долистав до конца —
 * ради этого всё и затевалось.
 *
 * Проверка эффекта без счётчиков: текст сообщения включает заголовок статьи
 * и отличается от кнопок бронирования («I want to book…»), так что в тех же
 * входящих WhatsApp видно, откуда пришёл человек.
 *
 * Версия по хешу содержимого — как в add-partner-ref.mjs. vercel.json отдаёт
 * js и css с max-age, и без версии правка доезжала бы до вернувшегося
 * посетителя только через сутки.
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

const jsV = await hashOf("js/sb-whatsapp-fab.js");
const cssV = await hashOf("css/sb-whatsapp-fab.css");

const TAG =
  `<link rel="stylesheet" href="/css/sb-whatsapp-fab.css?v=${cssV}">` +
  `<script defer src="/js/sb-whatsapp-fab.js?v=${jsV}"></script>`;

const ANY_TAG =
  /<link rel="stylesheet" href="\/css\/sb-whatsapp-fab\.css(?:\?v=[a-f0-9]+)?">\s*<script defer src="\/js\/sb-whatsapp-fab\.js(?:\?v=[a-f0-9]+)?"><\/script>\n?/g;

/* Страницы журнала: гайды, статьи-спутники туров, хаб и индекс. Дубайские
   файлы под этот шаблон имён не подходят и не попадут сюда по определению. */
const IS_JOURNAL = /^bali-journal(?:-guide)?-[a-z0-9-]+(?:-(?:ru|es|fr|zh|de))?\.html$/;

const stats = { добавлено: 0, "версия обновлена": 0, "уже стоит": 0, "не журнал": 0, "без body": 0 };

for (const name of (await fs.readdir(ROOT)).filter((f) => f.endsWith(".html"))) {
  if (!IS_JOURNAL.test(name)) { stats["не журнал"]++; continue; }

  const file = path.join(ROOT, name);
  let html = await fs.readFile(file, "utf8");

  if (html.includes(TAG)) { stats["уже стоит"]++; continue; }

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

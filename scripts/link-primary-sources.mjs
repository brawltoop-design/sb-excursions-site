/* Ссылки на первоисточники.

   На сайте не было ни одной редакционной внешней ссылки: все внешние хосты —
   это wa.me, инстаграм, телеграм и CDN Tilda. При этом UNESCO назван на 264
   страницах, BMKG на 24, e-VOA на 27 — то есть источник в тексте есть,
   а ссылки на него нет. Для генеративного поиска подтверждаемость факта
   ссылкой на первоисточник — прямой сигнал достоверности.

   Ставим ссылку один раз на страницу и только там, где термин уже написан:
   ничего не дописываем и не выдумываем. Правим исключительно текстовые узлы
   внутри абзацев: атрибуты, заголовки, скрипты и разметка не трогаются,
   абзацы с уже имеющейся ссылкой пропускаются, чтобы не плодить вложенные a. */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const SOURCES = [
  // Субак — то самое объектное решение ЮНЕСКО, а не главная страница организации.
  { term: "UNESCO", href: "https://whc.unesco.org/en/list/1194/" },
  // Метеослужба Индонезии: прогнозы и предупреждения, на которые ссылаются тексты.
  { term: "BMKG", href: "https://www.bmkg.go.id/" },
  // Официальная подача на визу по прибытии.
  { term: "e-VOA", href: "https://evisa.imigrasi.go.id/" },
];

const MASK = /<(script|style)\b[\s\S]*?<\/\1>/gi;
const PARA = /<p\b[^>]*>[\s\S]*?<\/p>/gi;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Подстановка только в текстовых кусках абзаца: режем по тегам и трогаем
   лишь то, что между ними. Иначе легко попасть в href или alt. */
function linkifyParagraph(paragraph, term, href) {
  const parts = paragraph.split(/(<[^>]+>)/);
  const rx = new RegExp(`(^|[^\\w-])(${escapeRegExp(term)})(?![\\w-])`);
  let done = false;
  const out = parts.map((chunk) => {
    if (done || chunk.startsWith("<")) return chunk;
    if (!rx.test(chunk)) return chunk;
    done = true;
    return chunk.replace(
      rx,
      (_, before, hit) =>
        `${before}<a href="${href}" target="_blank" rel="noopener noreferrer nofollow">${hit}</a>`,
    );
  });
  return done ? out.join("") : null;
}

const files = (await fs.readdir(ROOT)).filter(
  (name) => name.startsWith("bali-") && name.endsWith(".html"),
);

let touched = 0;
const added = new Map();

for (const name of files) {
  const file = path.join(ROOT, name);
  const original = await fs.readFile(file, "utf8");

  const masked = [];
  let html = original.replace(MASK, (block) => {
    masked.push(block);
    return ` SBMASK${masked.length - 1} `;
  });

  let changed = false;
  for (const { term, href } of SOURCES) {
    if (!html.includes(term)) continue;
    let placed = false;
    html = html.replace(PARA, (paragraph, offset, whole) => {
      if (placed || paragraph.includes("<a ")) return paragraph;
      /* Абзац может сам лежать внутри ссылки: на страницах-хабов карточка
         целиком обёрнута в <a class="sb-guide-card">. Проверки «нет ссылки
         внутри абзаца» тут мало — получались вложенные <a>, что невалидно
         и ломает клик по карточке. Считаем незакрытые открывающие теги слева. */
      const before = whole.slice(0, offset);
      const opens = (before.match(/<a\b/g) || []).length;
      const closes = (before.match(/<\/a>/g) || []).length;
      if (opens > closes) return paragraph;
      const linked = linkifyParagraph(paragraph, term, href);
      if (!linked) return paragraph;
      placed = true;
      return linked;
    });
    if (placed) {
      changed = true;
      added.set(term, (added.get(term) || 0) + 1);
    }
  }

  if (!changed) continue;
  html = html.replace(/ SBMASK(\d+) /g, (_, i) => masked[Number(i)]);
  await fs.writeFile(file, html);
  touched += 1;
}

console.log(
  JSON.stringify(
    { "файлов": files.length, "страниц со ссылками": touched, ...Object.fromEntries(added) },
    null,
    2,
  ),
);

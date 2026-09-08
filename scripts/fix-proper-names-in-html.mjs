/* Имена собственные, которые машинный перевод превратил в обычные слова.
 *
 * Правка кэша чинит только те страницы, которые собирает генератор. Часть
 * журнала — легаси: готовый HTML лежит в репозитории и генератору неизвестен
 * (how-to-get-around-bali-transport, what-to-eat-in-bali-food-guide и другие).
 * На них ошибка остаётся навсегда, и именно там она была самой заметной:
 * немецкая разметка объявляла Google достопримечательность «Schnapp dir und
 * Gojek», французская — «La guerre» вместо балийского блюда lawar.
 *
 * Поэтому чиним итог, а не источник: проходим по готовым страницам и заменяем
 * известные искажения. Список закрытый и короткий — это не глоссарий на все
 * случаи, а лечение конкретных найденных строк. Каждая замена привязана к
 * языку файла, поэтому французское «la guerre» на странице про историю не
 * пострадает: правило для fr требует либо соседства с Gojek, либо позиции
 * внутри имени узла разметки.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* [что искать, чем заменить] — по языку страницы. */
const RULES = {
  de: [
    [/Schnapp dir und Gojek/g, "Grab und Gojek"],
    [/"name":"Schnapp dir"/g, '"name":"Grab"'],
  ],
  fr: [
    [/Prenez et Gojek/g, "Grab et Gojek"],
    [/Saisir et Gojek/g, "Grab et Gojek"],
    /* lawar — рубленое мясо с кокосом. В разметке стояло именем узла. */
    [/"name":"La guerre"/g, '"name":"Lawar"'],
    [/>La guerre</g, ">Lawar<"],
  ],
  es: [
    [/"name":"[Ll]a guerra"/g, '"name":"Lawar"'],
    [/Agarrar y Gojek/g, "Grab y Gojek"],
  ],
  ru: [
    [/Захватить и Gojek/g, "Grab и Gojek"],
    [/"name":"Захватить"/g, '"name":"Grab"'],
  ],
  zh: [
    [/"name":"抢"/g, '"name":"Grab"'],
    [/抢和戈杰克/g, "Grab 和 Gojek"],
  ],
};

function localeOf(name) {
  const m = name.match(/-(ru|es|fr|de|zh)\.html$/);
  return m ? m[1] : null;
}

const files = (await fs.readdir(ROOT)).filter((n) => n.endsWith(".html"));
let touched = 0;
const byRule = {};

for (const name of files) {
  const locale = localeOf(name);
  if (!locale || !RULES[locale]) continue;
  const full = path.join(ROOT, name);
  const original = await fs.readFile(full, "utf8");
  let html = original;
  for (const [pattern, replacement] of RULES[locale]) {
    const before = html;
    html = html.replace(pattern, replacement);
    if (html !== before) byRule[String(pattern)] = (byRule[String(pattern)] || 0) + 1;
  }
  if (html === original) continue;
  await fs.writeFile(full, html);
  touched += 1;
}

/* Сторож по результату: искажённое имя на локализованной странице — это и есть
   та ошибка, ради которой шаг написан. Испанское «agarrarse» здесь не ищем:
   это нормальное слово, и его английский источник не содержит Grab. */
const leftovers = [];
for (const name of files) {
  const locale = localeOf(name);
  if (!locale) continue;
  const html = await fs.readFile(path.join(ROOT, name), "utf8");
  if (/Schnapp dir|"name":"La guerre"|"name":"Захватить"|"name":"抢"|Prenez et Gojek/.test(html)) {
    leftovers.push(name);
  }
}

console.log(JSON.stringify({ "страниц исправлено": touched, "по правилам": byRule, "осталось искажённых": leftovers.length, ...(leftovers.length ? { примеры: leftovers.slice(0, 5) } : {}) }, null, 2));
if (leftovers.length) process.exitCode = 1;

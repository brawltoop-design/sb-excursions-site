/* Счётчики статей в кнопках хаба журнала.
 *
 * Две строки на сайте несут в себе число: «Explore all 275 articles» в кнопке
 * на главной и «149 more guides — the full journal in one list» на хабе
 * журнала. Число вычисляется на лету из длины списка статей, а перевод берётся
 * из PINNED_TRANSLATIONS по ТОЧНОМУ совпадению строки. Как только в журнал
 * добавляется статья, число меняется, пин перестаёт совпадать, и на пяти
 * локализованных главных страницах остаётся английский текст. Замер 7 сентября
 * 2026: пины закреплены на 274 и 148, сайт рендерит 275 и 149 — то есть обе
 * строки не переведены ни на одном языке, и сборка при этом зелёная.
 *
 * Чинить пинами нельзя: следующая же статья ломает их снова. Поэтому здесь
 * переводится ШАБЛОН, а число подставляется из самой страницы. Шаг идемпотентен
 * и не зависит от того, сколько статей в журнале сегодня.
 *
 * Русские и китайские формы согласуются с числом: 271 статья, 272 статьи,
 * 275 статей. Без этого получается «Все 271 статей».
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* Русское склонение по числу: 1 статья, 2-4 статьи, 5-20 статей. */
function plural(n, one, few, many) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  const mod10 = n % 10;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

const ARTICLES = {
  ru: (n) => `Все ${n} ${plural(n, "статья", "статьи", "статей")}`,
  es: (n) => `Explora los ${n} artículos`,
  fr: (n) => `Explorer les ${n} articles`,
  de: (n) => `Alle ${n} Artikel entdecken`,
  zh: (n) => `浏览全部 ${n} 篇文章`,
};

const GUIDES = {
  ru: (n) => `Ещё ${n} ${plural(n, "гайд", "гайда", "гайдов")} — весь журнал одним списком`,
  es: (n) => `${n} guías más: todo el diario en una lista`,
  fr: (n) => `${n} guides de plus — tout le journal en une liste`,
  de: (n) => `${n} weitere Guides — das ganze Journal in einer Liste`,
  zh: (n) => `另有 ${n} 篇指南 — 全部文章一览`,
};

const ARTICLES_RE = /Explore all (\d+) articles/g;
const GUIDES_RE = /(\d+) more guides — the full journal in one list/g;

/* Язык берём из имени файла: генератор кладёт локаль суффиксом. */
function localeOf(name) {
  const m = name.match(/-(ru|es|fr|de|zh)\.html$/);
  return m ? m[1] : null;
}

const files = (await fs.readdir(ROOT)).filter((n) => n.endsWith(".html"));
let touched = 0;
const byLocale = {};
const leftovers = [];

for (const name of files) {
  const locale = localeOf(name);
  if (!locale) continue;
  const full = path.join(ROOT, name);
  const original = await fs.readFile(full, "utf8");
  if (!ARTICLES_RE.test(original) && !GUIDES_RE.test(original)) continue;
  ARTICLES_RE.lastIndex = 0;
  GUIDES_RE.lastIndex = 0;

  let html = original
    .replace(ARTICLES_RE, (_, n) => ARTICLES[locale](Number(n)))
    .replace(GUIDES_RE, (_, n) => GUIDES[locale](Number(n)));

  if (html === original) continue;
  await fs.writeFile(full, html);
  touched += 1;
  byLocale[locale] = (byLocale[locale] || 0) + 1;
}

/* Сторож: английская строка на локализованной странице — это и есть та тихая
   поломка, ради которой шаг написан. Проверяем результат, а не факт замены. */
for (const name of files) {
  const locale = localeOf(name);
  if (!locale) continue;
  const html = await fs.readFile(path.join(ROOT, name), "utf8");
  if (/Explore all \d+ articles|more guides — the full journal/.test(html)) leftovers.push(name);
}

console.log(JSON.stringify({ "страниц исправлено": touched, "по языкам": byLocale, "осталось английских": leftovers.length, ...(leftovers.length ? { примеры: leftovers.slice(0, 5) } : {}) }, null, 2));
if (leftovers.length) process.exitCode = 1;

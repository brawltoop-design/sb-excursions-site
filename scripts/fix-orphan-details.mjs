/* Осиротевшие </details></div> от старой подмены переключателя языков.
 *
 * Пока замена блока шла регуляркой /<div class="…__langs"[\s\S]*?<\/div>/,
 * она обрывалась на первом закрывающем теге — а внутри переключателя лежит
 * ещё один div с меню. Хвост «</details></div>» оставался в документе, к нему
 * дописывался новый переключатель, и так на каждой пересборке. Итог: шесть
 * </details> против двух открывающих.
 *
 * Чем это било. Лишние закрывающие теги схлопывали обёртку .sb-journal-page,
 * <main> оказывался снаружи, а min-height:100vh на обёртке разворачивал
 * пустоту во весь экран. Человек из поиска открывал статью и видел белый
 * экран, пока не прокручивал вниз; заодно переставал липнуть хедер, потому
 * что он остаётся внутри схлопнутой обёртки. Замер 9 сентября 2026:
 * 1459 страниц из 1768, все локализованные — английские собираются без
 * этого шага и были целы.
 *
 * Сам генератор уже исправлен (replaceDivBlock считает вложенность), но он
 * переписывает не все файлы: немецкие собираются по ограниченному списку,
 * легаси-гайды лежат статикой мимо генератора. Поэтому чиним готовый HTML.
 *
 * Идемпотентно: схлопывает подряд идущие хвосты в один и ничего не делает,
 * когда баланс уже сошёлся.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* Два и больше подряд идущих «</details></div>» — след старой подмены.
   Одиночный хвост легитимен: он закрывает настоящий переключатель. */
const REPEAT = /(<\/details>\s*<\/div>\s*){2,}/g;

const files = (await fs.readdir(ROOT)).filter((n) => n.startsWith("bali-") && n.endsWith(".html"));

let touched = 0;
let removed = 0;

for (const name of files) {
  const full = path.join(ROOT, name);
  const original = await fs.readFile(full, "utf8");
  if (!REPEAT.test(original)) continue;
  REPEAT.lastIndex = 0;

  const html = original.replace(REPEAT, (block) => {
    const count = (block.match(/<\/details>/g) || []).length;
    removed += count - 1;
    return "</details></div>";
  });

  if (html === original) continue;
  await fs.writeFile(full, html);
  touched += 1;
}

/* Проверяем результат, а не факт замены: страница, где закрывающих тегов
   больше открывающих, — это ровно та поломка, ради которой шаг написан. */
const stillBroken = [];
for (const name of files) {
  const html = await fs.readFile(path.join(ROOT, name), "utf8");
  const open = (html.match(/<details\b/g) || []).length;
  const close = (html.match(/<\/details>/g) || []).length;
  if (close > open) stillBroken.push(`${name} (${open}/${close})`);
}

console.log(JSON.stringify({
  "страниц исправлено": touched,
  "лишних тегов убрано": removed,
  "осталось с перекосом": stillBroken.length,
  ...(stillBroken.length ? { примеры: stillBroken.slice(0, 5) } : {}),
}, null, 2));
if (stillBroken.length) process.exitCode = 1;

/* Поля ввода мельче 16px — запрет.
 *
 * iOS Safari при фокусе на input/textarea/select с кеглем меньше 16px
 * увеличивает ВСЮ вкладку и сама обратно не возвращает. После этого
 * визуальный вьюпорт таскается пальцем: содержимое уезжает влево, а шапка
 * position:fixed срезается краем экрана — она привязана к layout viewport,
 * и панорамирование её тоже сдвигает. Со стороны это выглядит как «вёрстка
 * рассыпалась», хотя в разметке всё цело.
 *
 * 9 сентября 2026 так и было. Жалоба: «всё поехало, даже хедер, и опять
 * влево-вправо ходит». В Chrome не воспроизводилось никак: документ ровно по
 * ширине окна, scrollX ноль, логотип на месте. Виноваты оказались поля
 * планировщика (14px и 15px) — он вставляется в главную айфреймом, поэтому
 * зум с его формы разъезжается на всю страницу под ним — и форма отзыва на
 * страницах туров (14.5px).
 *
 * maximum-scale в мета-вьюпорте тут не рычаг: iOS его игнорирует, и
 * запрещать масштабирование нельзя — это доступность. Рычаг ровно один:
 * кегль поля.
 *
 * Запуск из scripts/build.mjs, последним блоком проверок.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const МИНИМУМ = 16;

/* Вендорское не наше: тильдовские файлы приходят из экспорта, править их
   бессмысленно — перезатрутся при следующей выгрузке. */
const ВЕНДОР = /^(?:tilda-|hammer|lazyload-|jquery)/;

/* Селектор про поле ввода, а не про что-то со словом «input» внутри имени
   класса: требуем либо голый тег, либо тег с атрибутом/псевдоклассом. */
const ПРО_ПОЛЕ = /(^|[\s,>+~(])(?:input|textarea|select)(?=$|[\s,{:.\[)])/i;
const ПРАВИЛО = /([^{}]+)\{([^{}]*)\}/g;
const КЕГЛЬ = /font-size\s*:\s*([\d.]+)px/i;

function нарушения(css, откуда) {
  const итог = [];
  for (const m of css.matchAll(ПРАВИЛО)) {
    const селектор = m[1].trim();
    if (селектор.startsWith("@")) continue;
    if (!ПРО_ПОЛЕ.test(селектор)) continue;
    const кегль = m[2].match(КЕГЛЬ);
    if (!кегль) continue;
    const px = parseFloat(кегль[1]);
    if (px >= МИНИМУМ) continue;
    итог.push({ где: откуда, селектор: селектор.replace(/\s+/g, " ").slice(0, 90), кегль: px });
  }
  return итог;
}

const найдено = [];

/* Наши таблицы стилей */
for (const dir of ["css", "ai-planner/css"]) {
  const abs = path.join(ROOT, dir);
  let names = [];
  try { names = await fs.readdir(abs); } catch { continue; }
  for (const name of names) {
    if (!name.endsWith(".css") || ВЕНДОР.test(name)) continue;
    найдено.push(...нарушения(await fs.readFile(path.join(abs, name), "utf8"), `${dir}/${name}`));
  }
}

/* Инлайновые стили: генератор вшивает формы прямо в страницы, и там правило
   живёт не в css/, а в самом HTML. Читаем только <style>, а не весь файл. */
const СТИЛЬ = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const страницы = (await fs.readdir(ROOT)).filter((n) => n.endsWith(".html"));
const виденные = new Set();
for (const name of страницы) {
  const html = await fs.readFile(path.join(ROOT, name), "utf8");
  for (const m of html.matchAll(СТИЛЬ)) {
    for (const н of нарушения(m[1], name)) {
      /* Один и тот же вшитый блок повторяется на сотнях страниц — в отчёте
         он нужен один раз, но с числом затронутых файлов. */
      const ключ = `${н.селектор}|${н.кегль}`;
      const прежнее = виденные.has(ключ);
      if (!прежнее) { виденные.add(ключ); найдено.push({ ...н, где: `инлайн (${name} и другие)` }); }
    }
  }
}

console.log(JSON.stringify({
  "минимум px": МИНИМУМ,
  "нарушений": найдено.length,
  ...(найдено.length ? { список: найдено.slice(0, 20) } : {}),
}, null, 1));
if (найдено.length) process.exitCode = 1;

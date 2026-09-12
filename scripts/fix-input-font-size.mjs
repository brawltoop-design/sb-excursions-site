/* Кегль полей ввода в готовом HTML: 14.5px → 16px там, куда генератор не
 * дотягивается.
 *
 * Форма отзыва вшивается в страницы туров инлайновым <style>. В генераторе
 * правило уже 16px (см. check-input-font-size.mjs — почему меньше нельзя),
 * но часть страниц генератор не пересобирает из исходника, а перепатчивает
 * на месте: ensureLocalizedUnescoPage читает bali-tour-bali-unesco-<lang>.html
 * с диска и пишет обратно. Такой файл — вечный выход прошлой сборки, и старое
 * правило в нём переживёт любую правку генератора. 12 сентября 2026 сторож
 * поймал ровно один: немецкую UNESCO.
 *
 * Идемпотентно: правило с 16px совпадать не будет, повторный запуск — ноль
 * замен. Проверку результата делает следующий шаг, здесь только замена.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* Только правило формы отзыва и только внутри него: чужие 14.5px (подписи,
   сноски) — не поля и трогать их не надо. */
const ПРАВИЛО = /(\.sb-review-cta input, \.sb-review-cta textarea \{[^}]*?font-size: )14\.5px/g;

const files = (await fs.readdir(ROOT)).filter((n) => n.endsWith(".html"));
let touched = 0;
for (const name of files) {
  const full = path.join(ROOT, name);
  const original = await fs.readFile(full, "utf8");
  if (!original.includes("font-size: 14.5px")) continue;
  const html = original.replace(ПРАВИЛО, "$116px");
  if (html === original) continue;
  await fs.writeFile(full, html);
  touched += 1;
}
console.log(JSON.stringify({ "страниц исправлено": touched }));

/* Сторож закреплённых переводов.
 *
 * Две ошибки, которые эта проверка ловит, обе тихие: сборка зелёная,
 * синтаксис валидный, страницы собираются — а перевода нет.
 *
 * 1. Дубль ключа внутри секции языка. В литерале объекта побеждает последняя
 *    запись, поэтому исправленный перевод, вписанный выше, молча перекрывается
 *    старым. Так у нас 20 строк про 509 ступеней остались с неверным текстом
 *    после правки, и заметно это было только на готовой странице.
 *
 * 2. Секция под кодом, которого не существует. Китайский в кэше живёт под
 *    ключом zh-CN, а не zh: секция «zh» выглядит правильной и не срабатывает
 *    никогда. Список допустимых кодов берём из translationLocaleCode.
 */
import fs from "node:fs";

const SRC = "scripts/generate-bali-tour-pages.mjs";
const VALID = new Set(["ru", "es", "fr", "de", "zh-CN"]);

const text = fs.readFileSync(SRC, "utf8");
const start = text.indexOf("const PINNED_TRANSLATIONS = {");
if (start < 0) {
  console.error("✖ пины: объект PINNED_TRANSLATIONS не найден");
  process.exit(1);
}
const end = text.indexOf("\nfunction translationCacheBucket", start);
const body = text.slice(start, end);

const heads = [...body.matchAll(/\n {2}("?)([a-zA-Z-]+)\1: \{\n/g)];
const problems = [];
let pins = 0;

heads.forEach((head, i) => {
  const locale = head[2];
  const from = head.index + head[0].length;
  const to = i + 1 < heads.length ? heads[i + 1].index : body.length;
  /* Ведущий перевод строки обязателен: без него регулярка ниже пропускала
     ПЕРВУЮ запись каждой секции — то есть ровно ту, которую дописывает
     скрипт вставки, — и дубль в ней оставался незамеченным. */
  const section = `\n${body.slice(from, to)}`;

  if (!VALID.has(locale)) {
    problems.push(`секция "${locale}" — такого кода перевода нет; допустимы ${[...VALID].join(", ")}`);
  }

  const seen = new Map();
  for (const m of section.matchAll(/\n {4}("(?:[^"\\]|\\.)*"):\n {6}"/g)) {
    const key = m[1];
    pins += 1;
    seen.set(key, (seen.get(key) || 0) + 1);
  }
  for (const [key, n] of seen) {
    if (n > 1) problems.push(`${locale}: ключ встречается ${n} раза — победит последний — ${JSON.parse(key).slice(0, 70)}…`);
  }
});

if (problems.length) {
  console.error(`✖ пины: ${problems.length} проблем`);
  problems.slice(0, 20).forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}
console.log(JSON.stringify({ "секций языка": heads.length, "закреплённых строк": pins, "дублей": 0 }, null, 2));

/* Разовая чистка кэша переводов от переведённых имён собственных.
 *
 * Google Translate превратил названия компаний в глаголы: Grab стал
 * «Захватить», «agarrar», «Saisir», «Schnapp dir» и «抢», Gojek — «Гойек» и
 * «戈杰克», а индонезийская закусочная warung — «guerra» и «guerre».
 *
 * Чинить это только в генераторе мало. Разметку schema.org локализует
 * отдельный шаг (localize-jsonld-leftovers.mjs), который читает кэш напрямую,
 * поэтому узел TouristAttraction продолжал объявлять Google, что
 * достопримечательность называется «Saisir». Правда лежит в кэше, значит
 * править надо кэш — тогда чинятся сразу все пути, и генератор, и постобработки.
 *
 * Сторож тот же, что в генераторе: правило применяется только к записям, где
 * имя есть в АНГЛИЙСКОМ ключе. Поэтому испанское «no hay cifra a la que
 * agarrarse» и французская «Seconde Guerre mondiale» остаются нетронутыми.
 *
 * Запускать вручную, в сборку не входит: это разовое лечение уже накопленного.
 *     node scripts/fix-cache-brand-names.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CACHE = path.join(ROOT, ".generated", "bali-translation-cache.json");
const dry = process.argv.includes("--dry");

const RULES = {
  ru: [
    [/(?<![а-яёА-ЯЁ])[Зз]ахват(?:ить|и|ы|)(?![а-яёА-ЯЁ])/gu, "Grab"],
    [/(?<![а-яёА-ЯЁ])Граб(?:ом|а|у|е|)(?![а-яёА-ЯЁ])/gu, "Grab"],
    [/(?<![а-яёА-ЯЁ])Го(?:йек|джек|цзек|дек)(?:ом|а|у|е|)(?![а-яёА-ЯЁ])/gu, "Gojek"],
  ],
  es: [
    [/(?<![\wáéíóúñ])[Aa]garrar(?![\wáéíóúñ])/gu, "Grab"],
    [/(?<![\wáéíóúñ])gojek(?![\wáéíóúñ])/gu, "Gojek"],
    [/(?<![\wáéíóúñ])[Ll]a guerra(?![\wáéíóúñ])/gu, "el warung"],
    [/(?<![\wáéíóúñ])[Gg]uerras?(?![\wáéíóúñ])/gu, "warung"],
  ],
  fr: [
    [/(?<![\wàâçéèêëîïôûù])[Ss]aisir(?![\wàâçéèêëîïôûù])/gu, "Grab"],
    [/(?<![\wàâçéèêëîïôûù])[Ll]a guerre(?![\wàâçéèêëîïôûù])/gu, "le warung"],
    [/(?<![\wàâçéèêëîïôûù])[Gg]uerres?(?![\wàâçéèêëîïôûù])/gu, "warung"],
  ],
  de: [
    [/Schnapp\s+dir(?!\w)/gu, "Grab"],
    [/(?<!\w)Schnapp(?!\s+dir)(?!\w)/gu, "Grab"],
  ],
  "zh-CN": [
    [/抢(?!购|夺|走|先)/gu, "Grab"],
    [/戈杰克/gu, "Gojek"],
  ],
};

const GUARD = /\b(?:Grab|Gojek|warungs?)\b/i;

const cache = JSON.parse(fs.readFileSync(CACHE, "utf8"));
const stats = {};
const samples = [];

for (const [locale, rules] of Object.entries(RULES)) {
  const bucket = cache[locale];
  if (!bucket) continue;
  let changed = 0;
  for (const [source, value] of Object.entries(bucket)) {
    if (typeof value !== "string" || !GUARD.test(source)) continue;
    let next = value;
    for (const [pattern, replacement] of rules) next = next.replace(pattern, replacement);
    if (next === value) continue;
    if (samples.length < 8) samples.push({ locale, "было": value.slice(0, 70), "стало": next.slice(0, 70) });
    if (!dry) bucket[source] = next;
    changed += 1;
  }
  if (changed) stats[locale] = changed;
}

if (!dry && Object.keys(stats).length) {
  const bak = CACHE + ".pre-brandfix.bak";
  if (!fs.existsSync(bak)) fs.copyFileSync(CACHE, bak);
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
}

/* Проверяем итог, а не факт замены: считаем, сколько испорченных записей
   осталось. Ноль — единственный приемлемый результат. */
const left = {};
for (const [locale, rules] of Object.entries(RULES)) {
  const bucket = (dry ? cache : JSON.parse(fs.readFileSync(CACHE, "utf8")))[locale];
  if (!bucket) continue;
  let n = 0;
  for (const [source, value] of Object.entries(bucket)) {
    if (typeof value !== "string" || !GUARD.test(source)) continue;
    if (rules.some(([p]) => { p.lastIndex = 0; return p.test(value); })) n += 1;
  }
  if (n) left[locale] = n;
}

console.log(JSON.stringify({ "исправлено записей": stats, "осталось испорченных": left, примеры: samples, ...(dry ? { режим: "dry-run" } : {}) }, null, 2));
if (Object.keys(left).length) process.exitCode = 1;

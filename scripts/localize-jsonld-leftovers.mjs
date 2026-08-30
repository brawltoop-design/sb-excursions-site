/* Разметка schema.org: добивание того, что не поймал перевод.
 *
 * Страницы собираются несколькими путями. Часть проходит через
 * translateStandaloneHtmlVisibleText, часть пишется напрямую, а разметку
 * организации отдельный шаг вообще дописывает уже после локализации.
 * Гоняться за каждым путём бессмысленно: строка, добавленная завтра
 * четвёртым способом, снова окажется английской.
 *
 * Поэтому проверка идёт по результату. Для каждой локализованной страницы
 * берём её английского двойника, сравниваем строки в ld+json и заменяем те,
 * что совпали дословно, — если для них есть закреплённый перевод.
 *
 * Имена собственные не трогаем: Angel's Billabong и Arum Jeram Bali обязаны
 * совпадать с английскими, и перевода у них нет по определению.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const LOCALE_FROM_NAME = /^(bali-.*)-(ru|es|fr|de|zh)\.html$/;
const TEXT_KEYS = new Set(["name", "headline", "description", "text", "alternateName",
  "caption", "articleBody", "abstract", "disambiguatingDescription"]);

const cachePath = path.join(ROOT, ".generated", "bali-translation-cache.json");
let CACHE = {};
try {
  CACHE = JSON.parse(fs.readFileSync(cachePath, "utf8"));
} catch {
  console.warn("⚠ разметка: кэш переводов не прочитан, шаг пропущен");
  process.exit(0);
}

/* Закреплённые переводы в файл кэша не попадают: генератор подмешивает их
   в память при сборке. Здесь мы читаем готовые файлы уже после него, поэтому
   пины приходится доставать из исходника генератора — иначе строки, которые
   существуют ТОЛЬКО как пин, останутся английскими. Ровно так и вышло с
   описанием организации на 170 страницах. */
function loadPins() {
  const src = fs.readFileSync(path.join(ROOT, "scripts", "generate-bali-tour-pages.mjs"), "utf8");
  const start = src.indexOf("const PINNED_TRANSLATIONS = {");
  if (start < 0) return {};
  let depth = 0, end = -1;
  const from = src.indexOf("{", start);
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {          // строки пропускаем целиком
      const q = c; i++;
      while (i < src.length && !(src[i] === q && src[i - 1] !== "\\")) i++;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (!depth) { end = i + 1; break; } }
  }
  if (end < 0) return {};
  try { return (0, eval)(`(${src.slice(from, end)})`); } catch { return {}; }
}
const PINS = loadPins();
for (const [loc, map] of Object.entries(PINS)) {
  CACHE[loc] = Object.assign({}, CACHE[loc] || {}, map);
}
console.log(`закреплённых переводов подмешано: ${Object.values(PINS).reduce((n, m) => n + Object.keys(m).length, 0)}`);

const blocks = (html) => [...String(html).matchAll(
  /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi)];

function collect(html, out) {
  for (const [, , body] of blocks(html)) {
    let data;
    try { data = JSON.parse(body); } catch { continue; }
    (function walk(n) {
      if (Array.isArray(n)) return n.forEach(walk);
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === "string" && TEXT_KEYS.has(k)) out.add(v);
        else walk(v);
      }
    })(data);
  }
  return out;
}

let touched = 0, replaced = 0;
const misses = new Map();
for (const file of fs.readdirSync(ROOT).sort()) {
  const m = file.match(LOCALE_FROM_NAME);
  if (!m) continue;
  const twin = path.join(ROOT, `${m[1]}.html`);
  if (!fs.existsSync(twin)) continue;
  const locale = m[2];
  const bucket = CACHE[locale === "zh" ? "zh-CN" : locale] || {};
  const english = collect(fs.readFileSync(twin, "utf8"), new Set());
  const full = path.join(ROOT, file);
  const html = fs.readFileSync(full, "utf8");

  let out = html, hits = 0;
  for (const [whole, open, body, close] of blocks(html)) {
    let data;
    try { data = JSON.parse(body); } catch { continue; }
    let changed = false;
    const fix = (n) => {
      if (Array.isArray(n)) return n.map(fix);
      if (!n || typeof n !== "object") return n;
      const res = {};
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === "string" && TEXT_KEYS.has(k) && english.has(v) && bucket[v] && bucket[v] !== v) {
          res[k] = bucket[v]; changed = true; hits += 1;
        } else if (typeof v === "string" && TEXT_KEYS.has(k) && english.has(v) && v.length >= 12) {
          misses.set(v, (misses.get(v) || 0) + 1);
          res[k] = v;
        } else res[k] = fix(v);
      }
      return res;
    };
    const fixed = fix(data);
    if (changed) out = out.replace(whole, `${open}\n${JSON.stringify(fixed, null, 2)}\n${close}`);
  }
  if (hits) { fs.writeFileSync(full, out); touched += 1; replaced += hits; }
}

const top = [...misses.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  .map(([s, n]) => `${n}x ${s.slice(0, 60)}`);
console.log(JSON.stringify({
  "файлов исправлено": touched, "строк заменено": replaced,
  "осталось без перевода": misses.size, "чаще всего": top,
}, null, 1));

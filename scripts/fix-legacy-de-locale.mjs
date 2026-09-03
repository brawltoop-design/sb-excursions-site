/**
 * Шесть немецких легаси-гайдов объявляли себя английскими страницами.
 *
 * У них немецкий <html lang="de">, немецкий заголовок и немецкий текст,
 * hreflang="de" указывает сам на себя, карта сайта перечисляет их как
 * немецкую альтернативу — но canonical, og:url и все @id внутри JSON-LD
 * вели на /bali/en/, а inLanguage стоял "en". Для поисковика это заявка
 * «меня индексировать не надо, вместо меня берите английскую версию»,
 * поэтому шесть страниц выпадали из немецкой выдачи целиком.
 *
 * Генератор эти файлы не создаёт, поэтому чиним постобработкой.
 * hreflang трогать нельзя: ссылки на английскую версию там законны.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";

const files = (await fs.readdir(ROOT)).filter(
  (name) => name.startsWith("bali-journal-guide-") && name.endsWith(".html"),
);

let touched = 0;
let replaced = 0;
const problems = [];

/* Имя организации не переводится. Один @id не может называться в шести языках
   по-разному — для поисковика и языковой модели это шесть разных компаний.
   Генератор уже закреплён пином, но у легаси-страниц разметка вшита в статику,
   и пин туда не достаёт: чиним по результату. */
const BRAND = "SB Excursions";
const BRAND_TYPES = ["Organization", "TravelAgency", "Brand", "LocalBusiness", "Corporation"];
let brandFixed = 0;

function normalizeBrandName(html) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (whole, body) => {
      let data;
      try { data = JSON.parse(body); } catch { return whole; }
      let changed = false;
      const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (!node || typeof node !== "object") return;
        const types = [].concat(node["@type"] || []);
        if (types.some((t) => BRAND_TYPES.includes(t))
            && typeof node.name === "string" && node.name !== BRAND) {
          node.name = BRAND;
          changed = true;
          brandFixed += 1;
        }
        Object.values(node).forEach(walk);
      };
      walk(data);
      return changed ? whole.replace(body, JSON.stringify(data, null, 2)) : whole;
    },
  );
}

for (const name of files) {
  const file = path.join(ROOT, name);
  const html = await fs.readFile(file, "utf8");
  let out = html;

  // canonical и og:url — точечно, по своим тегам. Только немецкие: у остальных
  // локалей эти поля уже корректны, лишняя замена только маскировала бы регресс.
  if (name.endsWith("-de.html")) {
  out = out.replace(
    /(<link rel="canonical" href="https:\/\/www\.sbexcursion\.com\/bali\/)en(\/)/,
    "$1de$2",
  );
  out = out.replace(
    /(<meta property="og:url" content="https:\/\/www\.sbexcursion\.com\/bali\/)en(\/)/,
    "$1de$2",
  );

  // Внутри JSON-LD: все @id, mainEntityOfPage и элементы хлебных крошек.
  // hreflang лежит в <link>, сюда не попадает.
  out = out.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (whole, body) => {
      const fixed = body
        .replaceAll(`${SITE}/bali/en/`, `${SITE}/bali/de/`)
        .replace(/("inLanguage"\s*:\s*)"en"/g, '$1"de"');
      return whole.replace(body, fixed);
    },
  );
  }

  out = normalizeBrandName(out);

  if (out !== html) {
    const before = (html.match(/sbexcursion\.com\/bali\/en\//g) || []).length;
    const after = (out.match(/sbexcursion\.com\/bali\/en\//g) || []).length;
    replaced += before - after;
    if (name.endsWith("-de.html") && after !== 2) {
      problems.push(`${name}: осталось ${after} ссылок на /bali/en/, ожидалось 2 (hreflang en и x-default)`);
    }
    await fs.writeFile(file, out);
    touched += 1;
  }
}

console.log(JSON.stringify({ "файлов": files.length, "исправлено": touched, "ссылок переписано": replaced, "имя бренда": brandFixed }, null, 2));
for (const p of problems) console.warn(`⚠ ${p}`);

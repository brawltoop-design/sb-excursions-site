/*
 * Единый домен во всех адресах: https://www.sbexcursion.com
 *
 * Зачем. Сервер отдаёт 308-редирект с sbexcursion.com на www.sbexcursion.com,
 * и ресурс в Search Console заведён на www. Пока canonical, og:url, hreflang
 * и schema указывали на голый домен, получалась вилка: страница сама на себя
 * ссылается по адресу, который перенаправляет. Google из-за этого перезаписывал
 * canonical, а в проверке URL по каждой странице писал «Нет ссылающихся файлов
 * Sitemap» — адреса из карты сайта просто не совпадали с ресурсом.
 *
 * Почему отдельным шагом, а не только через SITE_URL в генераторе. Часть
 * страниц (bali-faq, bali-about, старые гайды, 404) собирается копированием
 * исходных выгрузок Tilda, и canonical в них приезжает из шаблона, минуя
 * SITE_URL. Этот шаг ловит их все и заодно страхует от такого же расхождения
 * в будущем.
 *
 * Дубайские страницы не трогаем — владелец просил их не менять.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FROM = "https://sbexcursion.com";
const TO = "https://www.sbexcursion.com";

const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner"]);
const TARGET_EXT = new Set([".html", ".xml", ".txt", ".json"]);

// Дубай: и исходные выгрузки, и сгенерированные посты блога.
const isDubai = (rel) => /(^|\/)(dubai-|page116517176|page114154666|page112638996|page112631276|page106026336)/.test(rel);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (TARGET_EXT.has(path.extname(entry.name))) {
      yield full;
    }
  }
}

const stats = { исправлено: 0, "адресов заменено": 0, "пропущено дубай": 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  const html = await fs.readFile(file, "utf8");

  // FROM — префикс TO, поэтому ищем голый домен только там, где за https://
  // сразу идёт sbexcursion.com, иначе заменим уже исправленные адреса ещё раз.
  const hits = html.match(/https:\/\/sbexcursion\.com/g);
  if (!hits) continue;
  if (isDubai(rel)) { stats["пропущено дубай"]++; continue; }

  await fs.writeFile(file, html.split(FROM).join(TO));
  stats.исправлено++;
  stats["адресов заменено"] += hits.length;
}

console.log(JSON.stringify(stats, null, 2));

/*
 * Полная сборка сайта: генератор плюс все пост-обработки.
 *
 * Генератор перезаписывает страницы целиком и ничего не знает о шагах,
 * которые идут после него, — запустишь его в одиночку и молча потеряешь
 * защиту от мигания на 600 страницах и счётчик посещаемости на 840.
 * Поэтому запускать всегда через этот файл:
 *
 *     node scripts/build.mjs
 *
 * Порядок важен: сначала генерация, потом всё, что дописывает в готовый HTML.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const STEPS = [
  ["generate-bali-tour-pages.mjs", "генерация страниц туров, журнала и гайдов"],
  ["build-prices-page.mjs", "прайс-индекс всех туров из живых данных"],
  ["build-work-with-us.mjs", "партнёрская страница Work With Us"],
  ["build-ai-planner-landing.mjs", "посадочная шапка AI-планировщика"],
  ["build-404.mjs", "страница 404: ворота Лемпуянг в родном хроме"],
  ["fix-fouc.mjs", "защита от мигания при загрузке"],
  ["add-vercel-analytics.mjs", "счётчик посещаемости Vercel"],
  ["add-partner-ref.mjs", "партнёрская метка в ссылках WhatsApp"],
  ["add-whatsapp-fab.mjs", "плавающая кнопка WhatsApp на статьях"],
  ["add-robots-meta.mjs", "разрешение на крупные картинки в выдаче Google"],
  ["build-favicons.mjs", "иконки сайта: тёмная тема и единый набор тегов"],
  ["fix-legacy-snippets.mjs", "заголовки и описания легаси-гайдов"],
  ["fix-canonicals.mjs", "канониклы политик и служебные страницы вне индекса"],
  ["normalize-site-host.mjs", "единый домен www во всех адресах"],
  ["fix-mobile-tours-link.mjs", "живая ссылка «Туры» в мобильном меню"],
  ["fix-legacy-guide-tourcard.mjs", "карточка тура в сайдбаре шести старых гайдов"],
  ["add-hreflang.mjs", "hreflang-теги пяти языковых версий"],
  ["dubai-noindex.mjs", "дубайский блог — вон из индекса Google"],
  ["build-llms-txt.mjs", "llms.txt — карта сайта для нейросетей"],
  ["build-og-images.mjs", "картинки 1200x630 для превью ссылок"],
  ["add-organization-schema.mjs", "разметка организации на страницах, собранных в обход генератора"],
  ["stamp-sitemap-lastmod.mjs", "честный lastmod: дата меняется только у изменившихся страниц"],
  ["stamp-css-version.mjs", "версия наших стилей в ссылках — чтобы правки доезжали"],
  ["check-inline-js.mjs", "проверка: инлайновый JS парсится на всех страницах"],
];

for (const [script, label] of STEPS) {
  process.stdout.write(`\n▶ ${label}\n`);
  execFileSync(process.execPath, [path.join(ROOT, "scripts", script)], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

process.stdout.write("\n✓ сборка завершена\n");

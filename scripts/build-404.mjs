/*
 * Страница 404 в родном хроме сайта.
 *
 * Раньше 404.html был копией дубайской тильдовской заглушки: человек,
 * ошибившийся в балийском адресе, видел «Page Not Found | SB Excursions
 * Dubai» и офис в Business Bay. Теперь это ворота Лемпуянг гравюрной
 * линией (контент в scripts/sb-404-content.mjs), а шапка и подвал — те же,
 * что на страницах туров: собираются из донора через sb-tilda-chrome.mjs,
 * как у work-with-us, и обновляются сами при каждой пересборке.
 *
 * Vercel отдаёт 404.html со статусом 404 на любом несуществующем адресе,
 * причём БЕЗ редиректа — pathname остаётся битым адресом. На этом стоит
 * локализация: /bali/ru/journal/опечатка → скрипт страницы видит /bali/ru/
 * и переводит себя на русский.
 *
 * После сборки хрома два ручных штриха:
 *   • robots → noindex, follow (страница ошибки не должна попасть в выдачу);
 *   • каноникл долой — у 404 нет каноничного адреса.
 *
 * Запуск идёт из scripts/build.mjs после генератора (донор должен уже
 * существовать). Партнёрскую метку и аналитику досыпают следующие шаги
 * конвейера — они обходят все *.html подряд.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildChromedPage } from "./sb-tilda-chrome.mjs";
import { STYLE_BLOCK, BODY_CONTENT, BODY_END_SCRIPT } from "./sb-404-content.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";

let html = await buildChromedPage(ROOT, {
  title: "404 — Page not found | SB Excursions",
  description: "This page wandered off the map. The gates are open — pick a way back to the island: tours, journal or the Bali trip planner.",
  canonical: `${SITE}/not-found`,
  ogImage: `${SITE}/images/places/kelingking-beach-t-rex-cliff.jpg`,
  waText: "Hello! I'm interested in your excursions. Could you help me with the booking details?",
  heroPreload: null,
  // Языковых версий у 404 нет и быть не может — она одна на все адреса.
  // Поэтому переключатель в шапке уводит на главную нужного языка, а не
  // на тур донора, как было.
  localeRoute: (code) => `/bali/${code}/main-page`,
  langLinks: { ru: "/bali/ru/main-page", fr: "/bali/fr/main-page" },
  schema: { "@context": "https://schema.org", "@type": "WebPage", name: "404 — Page not found", isPartOf: { "@type": "WebSite", name: "SB Excursions", url: SITE } },
  styleBlock: STYLE_BLOCK,
  bodyContent: BODY_CONTENT,
  bodyEndScript: BODY_END_SCRIPT,
});

/* Страница ошибки: вон из индекса, каноникл не нужен. */
html = html
  .replace(/<meta name="robots" content="[^"]*"\s*\/?>/i, '<meta name="robots" content="noindex, follow">')
  .replace(/\s*<link rel="canonical"[^>]*>/i, "");

await fs.writeFile(path.join(ROOT, "404.html"), html);
console.log(JSON.stringify({ "404.html": `${html.length} байт`, noindex: /noindex/.test(html), canonical: /rel="canonical"/.test(html) ? "ОСТАЛСЯ" : "убран" }, null, 2));

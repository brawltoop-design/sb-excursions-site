/*
 * Родной «хром» сайта для кастомных страниц (work-with-us, прайс-индекс).
 *
 * Владелец попросил, чтобы на этих страницах стояли ЕГО хедер и футер —
 * ровно те, что на страницах туров. Скопировать их разметку руками нельзя:
 * хедер (t228 + мобильный t451) и футер (t396) живут вместе с тильдовским
 * CSS/JS-стеком, скриптом прилипающей шапки и согласием на куки, и при
 * любой правке генератора разъехались бы с сайтом.
 *
 * Поэтому кастомная страница собирается ИЗ донорской страницы тура:
 *   • префикс — всё до первого контентного блока: <head> со стеком Тильды,
 *     защитой от мигания, стилями шапки + сами блоки хедера;
 *   • суффикс — от блока футера до конца: футер, аналитика, согласие,
 *     скрипт «Туры» в мобильном меню;
 *   • между ними вставляется контент кастомной страницы.
 * Мета-теги, schema и WhatsApp-тексты донора заменяются на свои.
 *
 * Так хедер и футер обновляются сами при каждой пересборке сайта.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const DONOR = "bali-tour-ubud-highlights-tour.html";

/* Пять языков сайта в том же порядке и с теми же подписями, что в шапке. */
const LOCALES = [
  { code: "en", label: "English" },
  { code: "zh", label: "\u4e2d\u6587" },
  { code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
  { code: "es", label: "Espa\u00f1ol" },
  { code: "fr", label: "Fran\u00e7ais" },
];
const localizedMainPage = (code) => `/bali/${code}/main-page`;
// Границы: первый контентный блок тура и блок футера. Если генератор
// когда-нибудь сменит id блоков — упадём с понятной ошибкой, а не соберём
// страницу с чужим контентом.
const FIRST_CONTENT_REC = '<div id="rec2121233163"';
const FOOTER_REC = '<div id="rec1803718291"';
// Тяжёлый скрипт раскладки туровой страницы: целится в блоки, которых на
// кастомной странице нет, — 39 КБ мёртвого кода, вырезаем.
const TOUR_LAYOUT_SCRIPT = /<script id="sb-west-page-layout-autofit">[\s\S]*?<\/script>/;

export async function buildChromedPage(root, page) {
  const donor = await fs.readFile(path.join(root, DONOR), "utf8");
  const iContent = donor.indexOf(FIRST_CONTENT_REC);
  const iFooter = donor.indexOf(FOOTER_REC);
  if (iContent < 0 || iFooter < 0 || iFooter < iContent) {
    throw new Error(`донор ${DONOR} изменился: не нашёл граничные блоки хедера/футера`);
  }

  let prefix = donor.slice(0, iContent);
  let suffix = donor.slice(iFooter);

  // Апостроф кодируем руками: encodeURIComponent его не трогает, а готовая
  // ссылка попадает в том числе внутрь одинарных строк в скриптах донора —
  // «I'm interested» ломал их с SyntaxError.
  const waHref = `https://wa.me/6285333685020?text=${encodeURIComponent(page.waText).replace(/'/g, "%27")}`;
  const swapWa = (s) => s.replace(/https:\/\/wa\.me\/6285333685020\?text=[^"']*/g, waHref);

  // --- префикс: голова страницы ---
  prefix = prefix
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${page.canonical}$2`)
    // языковых версий у кастомных страниц нет — hreflang турового донора убираем
    .replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, "")
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${page.canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${page.ogImage}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${page.ogImage}$2`)
    // schema тура (Product, TouristTrip, FAQ…) на кастомной странице — обман поиска
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  // preload героя тура: либо меняем на картинку этой страницы, либо убираем
  prefix = page.heroPreload
    ? prefix.replace(/(<link rel="preload" as="image" href=")[^"]*(")/, `$1${page.heroPreload}$2`)
    : prefix.replace(/\s*<link rel="preload" as="image"[^>]*>/, "");

  // мёртвые языковые ссылки Ru/Fr в хедере ведут в никуда — ведём на главные
  // (или на языковые версии самой страницы, если они у неё есть)
  const langLinks = page.langLinks || { ru: "/bali/ru/main-page", fr: "/bali/fr/main-page" };
  prefix = swapWa(prefix)
    .replace(/href="">Ru</g, `href="${langLinks.ru}">Ru<`)
    .replace(/href="">Fr</g, `href="${langLinks.fr}">Fr<`);

  /* Переключатель языков (иконка глобуса) строит меню из config.locales в
     инлайновом скрипте. Скрипт приезжает из донора — то есть со страницы
     тура по Убуду, — и на каждой кастомной странице предлагал уйти НА ЭТОТ
     ТУР: с work-with-us «Русский» вёл на /bali/ru/tours/ubud-highlights-tour.
     Подменяем маршруты на языковые версии самой страницы; если их нет,
     показываем главные, а не чужой тур. */
  const localeRoute = page.localeRoute || ((code) => localizedMainPage(code));
  const switcherConfig = /"locales":\s*\[[\s\S]*?\],"currentLocale":"[a-z-]*"/;
  const current = page.lang || "en";
  const locales = LOCALES.map(
    ({ code, label }) =>
      `{"code":"${code}","label":"${label}","href":"${localeRoute(code)}","active":${code === current}}`,
  ).join(",");
  prefix = prefix.replace(switcherConfig, `"locales":[${locales}],"currentLocale":"${current}"`);

  // язык документа: донор всегда английский, кастомная страница — какая угодно
  if (page.lang && page.lang !== "en") {
    prefix = prefix.replace(/<html([^>]*?)lang="en"/, `<html$1lang="${page.lang}"`);
  }

  /* Шапка и подвал приходят из английского донора со своими ссылками, и на
     языковой версии страницы каждый пункт уводил на английскую: с
     /ru/work-with-us логотип, «Bali, Indonesia», «About Us» и «FAQ» вели на
     /bali/en/…, а подвал — на английские политики и туры. Человек выбирал
     язык и первым же кликом из него выпадал.

     Переписываем все /bali/en/ на язык страницы. Дубай не трогаем: у него
     языковых версий нет, /dubai/ru просто не существует. */
  if (page.lang && page.lang !== "en") {
    const toLocale = (s) => s.replace(/\/bali\/en(?=\/|#|"|'|$)/g, `/bali/${page.lang}`);
    prefix = toLocale(prefix);
    suffix = toLocale(suffix);
  }

  // свои schema, hreflang, стили и класс .js для reveal-анимаций — в конец головы
  prefix = prefix.replace(
    "</head>",
    `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n` +
      `${page.headExtra || ""}` +
      `<script>document.documentElement.classList.add("js");</script>\n${page.styleBlock}\n</head>`,
  );

  // --- суффикс: футер и служебные скрипты ---
  suffix = swapWa(suffix).replace(TOUR_LAYOUT_SCRIPT, "");
  if (page.bodyEndScript) suffix = suffix.replace("</body>", `${page.bodyEndScript}\n</body>`);

  return prefix + page.bodyContent + suffix;
}

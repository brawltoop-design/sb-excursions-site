/* Язык заготовки сообщения в WhatsApp.
 *
 * Общая заготовка («Hello! I'm interested in your excursions…») приходит из
 * исходной вёрстки Tilda: она вшита в шапку и подвал готовым href и через
 * переводчик не проходит нигде. Правки в генераторе её тоже не держат —
 * ссылки WhatsApp позже переписывает add-partner-ref.mjs, и английский текст
 * возвращается.
 *
 * Поэтому подстановка живёт отдельным шагом в самом конце: он читает готовые
 * файлы и меняет текст по языку из имени файла. Так покрываются все пути
 * сборки сразу — и страницы туров, которые пишутся напрямую, и журнал, и
 * служебные страницы.
 *
 * Замер до правки: 108 английских кнопок брони на немецких страницах при живых
 * пинах на все три формы апострофа. Пины не помогали, потому что строку никто
 * не переводит — её просто копируют.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const TEXTS = [
  {
    en: "Hello! I'm interested in your excursions. Could you help me with the booking details?",
    ru: "Здравствуйте! Меня интересуют ваши экскурсии. Подскажете детали бронирования?",
    es: "¡Hola! Me interesan sus excursiones. ¿Podrían ayudarme con los detalles de la reserva?",
    fr: "Bonjour ! Vos excursions m'intéressent. Pourriez-vous m'aider avec les détails de réservation ?",
    de: "Hallo! Ich interessiere mich für Ihre Ausflüge. Können Sie mir mit den Buchungsdetails helfen?",
    zh: "您好！我对你们的行程很感兴趣，能帮我了解预订细节吗？",
  },
  {
    en: "Hello! I want to book a Bali tour. Please send availability, the best options, and full details.",
    ru: "Здравствуйте! Хочу забронировать экскурсию на Бали. Пришлите, пожалуйста, свободные даты, лучшие варианты и все детали.",
    es: "¡Hola! Quiero reservar una excursión en Bali. Envíenme disponibilidad, las mejores opciones y todos los detalles.",
    fr: "Bonjour ! Je souhaite réserver une excursion à Bali. Merci de m'envoyer les disponibilités, les meilleures options et tous les détails.",
    de: "Hallo! Ich möchte einen Ausflug auf Bali buchen. Bitte senden Sie mir Verfügbarkeit, die besten Optionen und alle Details.",
    zh: "您好！我想预订巴厘岛的行程，请发送可预订日期、推荐方案和完整信息。",
  },
];

/* Апостроф в готовом HTML встречается в трёх видах: сырой, &#39; и &#039;.
   encodeURIComponent сам апостроф не трогает, а вот амперсанд и решётку
   сущности — трогает, поэтому их возвращаем обратно. */
function encodedVariants(text) {
  return [text, text.replace(/'/g, "&#39;"), text.replace(/'/g, "&#039;")]
    .map((variant) => encodeURIComponent(variant)
      .replace(/%26%2339%3B/g, "&#39;")
      .replace(/%26%23039%3B/g, "&#039;"));
}

/* Вторая, более частая форма: обёртка «Hello! I want to book X. Please send
   details.» с названием тура внутри. Такая строка целиком не существует до
   рендера — её собирают на лету, — поэтому в кэш переводов она попасть не
   может и остаётся английской на всех языках. На французских страницах таких
   ссылок было 594 из 1028. Переписываем обёртку по языку, а само название
   берём из кэша переводов, если оно там есть. */
const BOOK_TEMPLATE = {
  ru: (title) => `Здравствуйте! Хочу забронировать ${title}. Пришлите, пожалуйста, детали.`,
  es: (title) => `¡Hola! Quiero reservar ${title}. ¿Me envías los detalles?`,
  fr: (title) => `Bonjour ! Je souhaite réserver ${title}. Merci de m'envoyer les détails.`,
  de: (title) => `Hallo! Ich möchte ${title} buchen. Bitte senden Sie mir die Details.`,
  zh: (title) => `您好！我想预订${title}，请发送详细信息。`,
};

const CACHE_PATH = path.join(ROOT, ".generated", "bali-translation-cache.json");
let CACHE = {};
try {
  CACHE = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
} catch {
  console.warn("⚠ заготовки WhatsApp: кэш переводов не прочитан, названия туров останутся английскими");
}

function localizeBookLinks(html, locale) {
  const template = BOOK_TEMPLATE[locale];
  if (!template) return { html, count: 0 };
  const bucket = CACHE[locale === "zh" ? "zh-CN" : locale] || {};
  let count = 0;
  const out = String(html).replace(
    /(wa\.me\/\d+\?text=)(Hello!%20I%20want%20to%20book%20)([^"'\s<>]+?)(\.%20Please%20send%20details\.)/g,
    (whole, prefix, _open, encodedTitle, _tail) => {
      let title;
      try {
        title = decodeURIComponent(encodedTitle);
      } catch {
        return whole;
      }
      count += 1;
      const translated = bucket[title] || title;
      return `${prefix}${encodeURIComponent(template(translated))}`;
    },
  );
  return { html: out, count };
}

/* Третий проход: название тура внутри уже локализованной обёртки.
   Правила массового перевода запрещали агентам трогать названия туров, и это
   верно для текста статьи — но не для кнопки брони: на странице тур называется
   «Privatwagen mit Fahrer auf Bali», а в сообщении оставалось «Private Car with
   Driver in Bali». Список названий берём из английских страниц туров, перевод —
   из кэша. Меняем только точные совпадения целого названия. */
function tourTitlesFromEnglishPages() {
  const titles = new Set();
  for (const name of fs.readdirSync(ROOT)) {
    if (!/^bali-tour-[a-z0-9-]+\.html$/.test(name)) continue;
    const html = fs.readFileSync(path.join(ROOT, name), "utf8");
    const match = html.match(/wa\.me\/\d+\?text=Hello!%20I%20want%20to%20book%20(?:the%20)?([^"'\s<>]+?)(?:\.|%2E)%20Please/);
    if (!match) continue;
    try {
      titles.add(decodeURIComponent(match[1]));
    } catch { /* битая кодировка — пропускаем, лучше ничего, чем мусор */ }
  }
  return [...titles].sort((a, b) => b.length - a.length);
}

const TOUR_TITLES = tourTitlesFromEnglishPages();

function localizeTourNames(html, locale) {
  const bucket = CACHE[locale === "zh" ? "zh-CN" : locale] || {};
  let count = 0;
  const out = String(html).replace(/(wa\.me\/\d+\?text=)([^"'\s<>]+)/g, (whole, prefix, encoded) => {
    let text;
    try {
      text = decodeURIComponent(encoded);
    } catch {
      return whole;
    }
    /* Сначала пробуем строку целиком: у части туров своя формулировка
       сообщения, и она переведена в кэше как единое целое. */
    if (bucket[text]) {
      count += 1;
      return `${prefix}${encodeURIComponent(bucket[text])}`;
    }
    let changed = text;
    for (const title of TOUR_TITLES) {
      const translated = bucket[title];
      if (!translated || translated === title) continue;
      if (changed.includes(title)) changed = changed.split(title).join(translated);
    }
    if (changed === text) return whole;
    count += 1;
    return `${prefix}${encodeURIComponent(changed)}`;
  });
  return { html: out, count };
}

const LOCALE_FROM_NAME = /-(ru|es|fr|zh|de)\.html$/;

let touched = 0;
let replaced = 0;
let renamed = 0;
for (const name of fs.readdirSync(ROOT)) {
  const match = name.match(LOCALE_FROM_NAME);
  if (!match) continue;
  const locale = match[1];
  const filePath = path.join(ROOT, name);
  let html = fs.readFileSync(filePath, "utf8");
  const before = html;
  for (const item of TEXTS) {
    const target = item[locale];
    if (!target) continue;
    const encodedTarget = encodeURIComponent(target);
    for (const encoded of encodedVariants(item.en)) {
      if (!html.includes(encoded)) continue;
      replaced += html.split(encoded).length - 1;
      html = html.split(encoded).join(encodedTarget);
    }
  }
  const booked = localizeBookLinks(html, locale);
  html = booked.html;
  replaced += booked.count;
  const named = localizeTourNames(html, locale);
  html = named.html;
  renamed += named.count;
  if (html !== before) {
    fs.writeFileSync(filePath, html);
    touched += 1;
  }
}

console.log(JSON.stringify({ "файлов исправлено": touched, "ссылок переведено": replaced, "названий туров подставлено": renamed }, null, 2));

/*
 * Полоса фактов о маршруте для гайдов, которых нет в генераторе.
 *
 * Шесть страниц кластера «day trip from <район>» получают её из
 * generate-bali-tour-pages.mjs, но одна — gili-islands-day-trip-from-bali —
 * досталась от прошлых поколений отдельными файлами: генератор её не
 * перезаписывает, и блока бронирования на ней нет вовсе. При этом 608
 * показов за две недели и позиция 14 — больше, чем у трёх из пяти
 * «управляемых» страниц кластера.
 *
 * Стили инлайновые, а не классами: легаси-файлы собраны другим шаблоном,
 * в них нет ни .sboffer, ни его CSS, и класс молча ничего бы не покрасил.
 *
 * Цифры взяты из текста самой статьи: подъём в 5-6 утра, Паданг-Бай примерно
 * в двух часах от Семиньяка, посадка с 7 утра, переправа 90 минут - 2 часа,
 * на острове около четырёх часов. Панель, спорящая с текстом страницы, хуже
 * её отсутствия.
 *
 * Идемпотентно: повторный запуск заменяет панель, а не ставит вторую.
 * Запуск из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PHONE = "6285333685020";
const MARK = "sb-legacy-route-panel";

/* Ключ — базовый слаг. Языковые версии подхватываются по суффиксу файла. */
const ROUTES = {
  "gili-islands-day-trip-from-bali": {
    ask: {
      en: "the Gili Islands day trip from Bali",
      ru: "однодневную поездку на Гили с Бали",
      es: "la excursión de un día a las islas Gili desde Bali",
      fr: "l'excursion d'une journée aux îles Gili depuis Bali",
      zh: "从巴厘岛出发的吉利群岛一日游",
    },
    facts: {
      en: [["Pickup", "05:00-06:00 in south Bali"], ["Drive to Padang Bai", "about 2 hours from Seminyak"],
           ["Crossing", "90 minutes to 2 hours"], ["Time ashore", "about 4 hours"]],
      ru: [["Забирают", "05:00–06:00 на юге Бали"], ["Дорога до Паданг-Бай", "около 2 часов от Семиньяка"],
           ["Переправа", "от 90 минут до 2 часов"], ["Времени на острове", "около 4 часов"]],
      es: [["Recogida", "05:00-06:00 en el sur de Bali"], ["Trayecto a Padang Bai", "unas 2 horas desde Seminyak"],
           ["Travesía", "de 90 minutos a 2 horas"], ["Tiempo en la isla", "unas 4 horas"]],
      fr: [["Prise en charge", "05h00-06h00 dans le sud de Bali"], ["Route vers Padang Bai", "environ 2 heures depuis Seminyak"],
           ["Traversée", "de 90 minutes à 2 heures"], ["Temps sur l'île", "environ 4 heures"]],
      zh: [["接送", "05:00-06:00 巴厘岛南部"], ["前往帕当拜", "从水明漾约 2 小时"],
           ["海上航程", "90 分钟至 2 小时"], ["岛上时间", "约 4 小时"]],
    },
    cta: {
      en: "Ask price for this route", ru: "Узнать цену на этот маршрут",
      es: "Pedir precio para esta ruta", fr: "Demander le prix de cet itinéraire",
      zh: "咨询此路线价格",
    },
  },
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Апостроф во французском рвал бы строку, поэтому только двойные кавычки
   и никакого JS — панель целиком статическая. */
function panel(route, lang) {
  const facts = route.facts[lang] || route.facts.en;
  const rows = facts
    .map(
      ([k, v]) =>
        `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:7px 0">` +
        `<span style="font-size:13px;line-height:1.4;color:#8a8a90">${esc(k)}</span>` +
        `<span style="font-size:14px;line-height:1.4;font-weight:600;color:#151515;text-align:right">${esc(v)}</span>` +
        `</div>`
    )
    .join("");
  const text = `Hello! I want to book ${route.ask[lang] || route.ask.en}. Please send the price and pickup time.`;
  const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  return (
    `<section class="sb-journal-article-section ${MARK}">` +
    `<aside style="margin:0;padding:22px 24px;border:1px solid rgba(21,21,21,0.14);border-radius:26px;` +
    `background:linear-gradient(180deg,#fff 0%,#fbfaf7 100%)">` +
    `<div style="padding:12px 16px;border-radius:16px;background:rgba(21,21,21,0.035);margin:0 0 18px">${rows}</div>` +
    `<a href="${wa}" target="_blank" rel="noopener noreferrer nofollow" ` +
    `style="display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border-radius:999px;` +
    `background:#b0741f;color:#fff;font-size:15px;font-weight:600;text-decoration:none">` +
    `${esc(route.cta[lang] || route.cta.en)}</a>` +
    `</aside></section>`
  );
}

const ANCHOR = '<div class="sb-journal-article-layout">';
const OLD = new RegExp(`<section class="sb-journal-article-section ${MARK}">.*?</section>`, "gs");

const stats = { поставлено: 0, обновлено: 0, "нет якоря": 0, "файла нет": 0 };

for (const [slug, route] of Object.entries(ROUTES)) {
  for (const suffix of ["", "-ru", "-es", "-fr", "-zh"]) {
    const name = `bali-journal-guide-${slug}${suffix}.html`;
    const file = path.join(ROOT, name);
    let html;
    try {
      html = await fs.readFile(file, "utf8");
    } catch {
      stats["файла нет"]++;
      continue;
    }
    const had = OLD.test(html);
    OLD.lastIndex = 0;
    if (had) html = html.replace(OLD, "");
    if (!html.includes(ANCHOR)) {
      stats["нет якоря"]++;
      console.warn(`  ⚠ ${name}: не найден ${ANCHOR}`);
      continue;
    }
    const lang = suffix ? suffix.slice(1) : "en";
    html = html.replace(ANCHOR, ANCHOR + panel(route, lang));
    await fs.writeFile(file, html);
    stats[had ? "обновлено" : "поставлено"]++;
  }
}

console.log(JSON.stringify(stats, null, 2));
if (stats["нет якоря"]) {
  console.error("✗ панель встала не везде");
  process.exit(1);
}

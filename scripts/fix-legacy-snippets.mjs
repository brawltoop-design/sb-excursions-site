/*
 * Заголовки и описания шести легаси-гайдов.
 *
 * Эти статьи живут отдельными HTML-файлами, а не в JOURNAL_SEO_GUIDES, и
 * генератор до них не дотягивается — значит, править их title/description
 * можно только здесь.
 *
 * Пока правится одна: gili-islands-day-trip-from-bali. По данным GSC она
 * собирает 183 показа в неделю на 13-й позиции и один клик. Причина та же,
 * что у остальных двадцати переписанных страниц: заголовок задавал вопрос
 * («Can You Do It in One Day?») вместо того, чтобы дать ответ. Человек,
 * который ищет «can you do a day trip to gili islands from bali», уже задал
 * этот вопрос — ему нужен ответ в сниппете, иначе он идёт к соседу.
 *
 * Переводы ручные: у легаси-статей каждая языковая версия — отдельный файл,
 * и машинного прогона по ним нет.
 *
 * Идемпотентно: повторный запуск ничего не меняет.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const PATCHES = {
  "gili-islands-day-trip-from-bali": {
    en: {
      title: "Gili Islands Day Trip From Bali: Yes, With 4 Hours Ashore",
      description:
        "You can do the Gilis in a day: a dawn start, a 90-minute fast boat from Padang Bai and about four hours on the island. Who it suits and who should stay over.",
    },
    ru: {
      title: "Гили из Бали за один день: да, но берег — только 4 часа",
      description:
        "Съездить на Гили одним днём можно: выезд на рассвете, полтора часа на быстроходном катере из Паданг-Бая и около четырёх часов на острове. Кому это подходит.",
    },
    es: {
      title: "Islas Gili desde Bali en un día: sí, con 4 horas en tierra",
      description:
        "Se puede visitar las Gili en un día: salida al amanecer, 90 minutos de barco rápido desde Padang Bai y unas cuatro horas en la isla. A quién le conviene.",
    },
    fr: {
      title: "Îles Gili depuis Bali en un jour : oui, 4 heures sur place",
      description:
        "Les Gili en une journée, c’est possible : départ à l’aube, 90 minutes de bateau rapide depuis Padang Bai et environ quatre heures sur l’île. Pour qui c’est fait.",
    },
    zh: {
      title: "巴厘岛吉利岛一日游：可以，但岛上只有 4 小时",
      description:
        "吉利岛一日游是可行的：黎明出发，从帕当巴伊乘 90 分钟快艇，在岛上约有四小时。这篇讲清楚它适合谁，以及谁更该住一晚。",
    },
  },
};

const stats = { обновлено: 0, "уже стоит": 0, "файла нет": 0 };

for (const [slug, langs] of Object.entries(PATCHES)) {
  for (const [lang, s] of Object.entries(langs)) {
    const name = lang === "en"
      ? `bali-journal-guide-${slug}.html`
      : `bali-journal-guide-${slug}-${lang}.html`;
    const file = path.join(ROOT, name);

    let html;
    try {
      html = await fs.readFile(file, "utf8");
    } catch {
      stats["файла нет"]++;
      continue;
    }

    if (html.includes(`<title>${s.title}`)) { stats["уже стоит"]++; continue; }

    /* Суффикс «| SB Excursions» у легаси-статей стоит в самом title —
       сохраняем его, чтобы бренд не пропал из выдачи. */
    const next = html
      .replace(/<title>[^<]*<\/title>/, `<title>${s.title} | SB Excursions</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${s.description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${s.title} | SB Excursions$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${s.description}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${s.title} | SB Excursions$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${s.description}$2`);

    await fs.writeFile(file, next);
    stats["обновлено"]++;
  }
}

console.log(JSON.stringify(stats, null, 2));

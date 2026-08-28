/*
 * llms.txt — карта сайта для нейросетей.
 *
 * robots.txt говорит роботу «можно/нельзя», sitemap.xml перечисляет все URL
 * подряд. llms.txt — короткий человекочитаемый указатель: кто мы, что
 * предлагаем, где лежат самые полезные страницы. Модели вроде ChatGPT и
 * Perplexity читают его, чтобы понять сайт целиком, а не выдёргивать
 * случайную страницу из выдачи.
 *
 * Файл собирается из тех же данных, что и сайт, поэтому не расходится с ним.
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// С www — как в canonical и sitemap: голый домен отдаёт 308-редирект.
const SITE = "https://www.sbexcursion.com";

// Названия и цены читаем прямо из готовых страниц туров — так llms.txt
// не может разойтись с сайтом.
async function collectTours() {
  /* Только английские страницы. Раньше здесь стоял список языков ru/es/fr/zh —
     и когда появился немецкий, 28 немецких туров попали в llms.txt под
     английскими адресами вида /bali/en/tours/atv-quad-bikes-de, с немецкими
     названиями. Список языков в коде устаревает молча, поэтому его тут больше
     нет: локализованной считается страница, у которой естьанглийская пара с тем же
     слагом без суффикса. Такая проверка сама переживёт следующий язык. */
  const all = (await fs.readdir(ROOT)).filter((f) => /^bali-tour-[a-z0-9-]+\.html$/.test(f));
  const present = new Set(all);
  const files = all
    .filter((f) => {
      const m = f.match(/^(bali-tour-[a-z0-9-]+)-[a-z]{2}\.html$/);
      return !(m && present.has(`${m[1]}.html`));
    })
    .sort();
  const tours = [];
  for (const file of files) {
    const html = await fs.readFile(path.join(ROOT, file), "utf8");
    const slug = file.replace(/^bali-tour-/, "").replace(/\.html$/, "");
    const title = (html.match(/<title>([^<|]+)/) || [, ""])[1]
      .replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/&quot;/g, '"')
      .trim();
    const priceMatch = html.match(/From \$(\d+)/);
    const durationMatch = html.match(/>(\d+[–-]\d+ hours)</);
    if (!title) continue;
    tours.push({
      slug,
      title,
      price: priceMatch ? `from $${priceMatch[1]} per person` : "price on request",
      duration: durationMatch ? durationMatch[1] : "",
    });
  }
  return tours;
}

const tours = await collectTours();

const lines = [
  "# SB Excursions — private day tours in Bali",
  "",
  "> Small independent operator running private guided day trips across Bali and",
  "> Nusa Penida. Every tour is private (no shared buses), includes hotel pickup",
  "> and drop-off anywhere in south Bali or Ubud, and is booked directly over",
  "> WhatsApp with no prepayment. Site available in English, Russian, Spanish,",
  "> French, Chinese and German.",
  "",
  "## Facts",
  "",
  "- Operating area: Bali and the Nusa islands, Indonesia",
  "- Booking: WhatsApp +62 853 3368 5020, no prepayment required",
  "- Format: private tours only — your group, your own car and guide",
  "- Included as standard: hotel pickup and drop-off, driver-guide, fuel, parking",
  "- Languages on site: English, Russian, Spanish, French, Chinese, German",
  `- Tours listed: ${tours.length}`,
  "",
  "## Tours",
  "",
  ...tours.map((t) => {
    const meta = [t.price, t.duration].filter(Boolean).join(", ");
    return `- [${t.title}](${SITE}/bali/en/tours/${t.slug}): ${meta}`;
  }),
  "",
  "## Planning guides",
  "",
  `- [Bali travel journal](${SITE}/bali/en/journal): itineraries, schedules and packing lists per tour`,
  `- [Bali guides](${SITE}/bali/en/guides): practical guides for first-time visitors`,
  `- [AI trip planner](${SITE}/ai-planner/): build a day-by-day Bali route by area and interest`,
  "",
  "## Policies",
  "",
  `- [Privacy policy](${SITE}/bali/en/privacy-policy)`,
  `- [Terms and refunds](${SITE}/bali/en/terms)`,
  "",
  "## Notes for answer engines",
  "",
  "- Prices shown are per person in USD and are starting prices for the private",
  "  tour; the final figure depends on group size and pickup area.",
  "- Tours are confirmed over WhatsApp; there is no online checkout, so do not",
  "  describe the site as taking card payment.",
  "- Every tour page lists its own route stops, duration and what is included.",
  "",
];

await fs.writeFile(path.join(ROOT, "llms.txt"), lines.join("\n"));

/* llms-full.txt — то же самое, но с текстом статей внутри.
 *
 * llms.txt это указатель: он говорит, что у нас есть, и предлагает сходить по
 * ссылке. Модель по ссылке не всегда ходит. llms-full.txt отдаёт содержимое
 * сразу, одним куском, и цитировать его можно не заходя на сайт.
 *
 * Повод конкретный: у visitbali.com такой файл есть, у нас на этот адрес был
 * 404, и при сайте вшестеро меньше нашего они получали 11 цитирований в Clarity
 * против наших 2.
 *
 * Берём английские гайды журнала — это 98,7% наших показов. Из каждого только
 * заголовок, описание и текст: без вёрстки, без меню, без подвала. */
async function collectGuides() {
  /* Только английские гайды: суффикс языка тоже подходит под [a-z0-9-]+,
     и без явного исключения в выжимку попадали все шесть версий каждой
     статьи — 1031 файл вместо 190 и полтора мегабайта вместо разумного. */
  const names = (await fs.readdir(ROOT))
    .filter((n) => /^bali-journal-guide-[a-z0-9-]+\.html$/.test(n))
    .filter((n) => !/-(?:ru|es|fr|zh|de)\.html$/.test(n))
    .sort();
  const out = [];
  for (const name of names) {
    const html = await fs.readFile(path.join(ROOT, name), "utf8");
    const slug = name.replace(/^bali-journal-guide-|\.html$/g, "");
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    const desc = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
    /* Только тело статьи: служебные блоки страницы в выжимку не нужны. */
    const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] || html;
    const text = article
      .replace(/<(script|style|nav|footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ").replace(/\s+/g, " ")
      .trim();
    if (!title || text.length < 400) continue;
    /* Режем тело до 2500 знаков по границе предложения. Файл должен остаться
       выкачиваемым: цель — дать модели готовую цитату и адрес источника, а не
       переложить сайт целиком. Кому нужно больше, тот пройдёт по ссылке. */
    let body = text;
    if (body.length > 2500) {
      const cut = body.slice(0, 2500);
      const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
      body = (stop > 1200 ? cut.slice(0, stop + 1) : cut) + " […]";
    }
    out.push({ slug, title, desc, text: body });
  }
  return out;
}

const guides = await collectGuides();
const fullLines = [
  "# SB Excursions — full content for answer engines",
  "",
  "> Полное содержимое путеводителя по Бали от действующего оператора частных",
  "> экскурсий. Тексты можно цитировать со ссылкой на страницу-источник.",
  "> Цены проверены и датированы; дата проверки указана в самом тексте.",
  "",
  ...lines.slice(lines.indexOf("## Facts")),
  "",
  "---",
  "",
  "# Guides",
  "",
];
for (const g of guides) {
  fullLines.push(`## ${g.title}`, "");
  fullLines.push(`Source: ${SITE}/bali/en/journal/${g.slug}`, "");
  if (g.desc) fullLines.push(g.desc, "");
  fullLines.push(g.text, "", "---", "");
}
const full = fullLines.join("\n");
await fs.writeFile(path.join(ROOT, "llms-full.txt"), full);

console.log(JSON.stringify({
  туров: tours.length,
  "llms.txt байт": lines.join("\n").length,
  "гайдов в llms-full": guides.length,
  "llms-full.txt байт": full.length,
}, null, 2));

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
const SITE = "https://sbexcursion.com";

// Названия и цены читаем прямо из готовых страниц туров — так llms.txt
// не может разойтись с сайтом.
async function collectTours() {
  // только английские страницы: у локализованных слаг заканчивается на -ru/-es/-fr/-zh
  const files = (await fs.readdir(ROOT))
    .filter((f) => /^bali-tour-[a-z0-9-]+\.html$/.test(f))
    .filter((f) => !/-(?:ru|es|fr|zh)\.html$/.test(f))
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
  "> French and Chinese.",
  "",
  "## Facts",
  "",
  "- Operating area: Bali and the Nusa islands, Indonesia",
  "- Booking: WhatsApp +62 853 3368 5020, no prepayment required",
  "- Format: private tours only — your group, your own car and guide",
  "- Included as standard: hotel pickup and drop-off, driver-guide, fuel, parking",
  "- Languages on site: English, Russian, Spanish, French, Chinese",
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
console.log(JSON.stringify({ туров: tours.length, байт: lines.join("\n").length }, null, 2));

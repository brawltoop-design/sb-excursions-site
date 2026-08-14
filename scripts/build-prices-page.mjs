/*
 * Страница-индекс цен: /bali/en/tour-prices → bali-prices-index.html
 *
 * Зачем. Это ссылочный магнит: единственное место в интернете, где лежит
 * полный прямой прайс балийского оператора на 2026 год одной таблицей —
 * авторы подборок и журналисты ссылаются на такое сами, потому что данные
 * больше взять негде. Одна страница с оригинальными данными приносит больше
 * ссылок, чем двадцать статей.
 *
 * Цены НЕ хранятся здесь: при каждой сборке они вытаскиваются из данных
 * туров в генераторе — страница физически не может разойтись с сайтом.
 * Хедер и футер — родные, с туровых страниц (sb-tilda-chrome.mjs).
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildChromedPage } from "./sb-tilda-chrome.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";

const src = await fs.readFile(path.join(ROOT, "scripts", "generate-bali-tour-pages.mjs"), "utf8");

// Те же поля, что мы вытаскивали для писателей: slug + факты тура.
const marks = [...src.matchAll(/\n    slug: "([a-z0-9-]+)"/g)].map((m) => ({ at: m.index, slug: m[1] }));
const tours = [];
for (let i = 0; i < marks.length; i++) {
  const { at, slug } = marks[i];
  try {
    await fs.access(path.join(ROOT, `bali-tour-${slug}.html`));
  } catch {
    continue;
  }
  const seg = src.slice(at, marks[i + 1] ? marks[i + 1].at : at + 6000).slice(0, 6000);
  const grab = (f) => seg.match(new RegExp(`\\n    ${f}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1] ?? null;
  tours.push({ slug, title: grab("title"), price: grab("price"), duration: grab("duration"), area: grab("area") });
}

const CATEGORIES = [
  ["Nusa Penida & the islands", ["nusa-penida-west-tour", "nusa-penida-east-tour", "nusa-penida-full-day-tour", "nusa-penida-manta-rays-point", "nusa-penida-private-day-tour-manta-snorkeling", "gili-island-tour", "gili-islands-getaway", "sumbawa-whale-shark-snorkeling-trip"]],
  ["Snorkeling & water days", ["blue-lagoon-snorkeling", "white-water-rafting", "surf-lesson-experience", "sunset-cruise-bali"]],
  ["Mount Batur sunrise", ["mount-batur-sunrise-hike", "mount-batur-sunrise-jeep-tour", "mount-batur-sunrise-jeep-hot-spring"]],
  ["Culture & sightseeing", ["ubud-highlights-tour", "ubud-instagram-tour", "bali-unesco", "tanah-lot-bedugul-tour", "east-bali-instagram-tour", "bali-instagram-highlights-tour", "north-bali-lovina-dolphins-tour", "dolphin-sunrise-city-tour"]],
  ["Adventure", ["atv-quad-bikes", "atv-ride-adventure"]],
  ["Transfers & drivers", ["bali-airport-transfer", "fast-boat-transfer-bali", "private-car-with-driver-bali"]],
];

const bySlug = Object.fromEntries(tours.map((t) => [t.slug, t]));
const listed = new Set(CATEGORIES.flatMap(([, s]) => s));
const orphans = tours.filter((t) => !listed.has(t.slug));
if (orphans.length) CATEGORIES.push(["More tours", orphans.map((t) => t.slug)]);

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const priceNum = (p) => Number((p || "").match(/\$(\d+)/)?.[1] ?? 0);
const prices = tours.map((t) => priceNum(t.price)).filter(Boolean);
const minP = Math.min(...prices);
const maxP = Math.max(...prices);
const updated = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const updatedISO = new Date().toISOString().slice(0, 10);

const rows = (slugs) =>
  slugs
    .map((slug) => bySlug[slug])
    .filter(Boolean)
    .sort((a, b) => priceNum(a.price) - priceNum(b.price))
    .map(
      (t) => `<tr>
  <th scope="row"><a href="/bali/en/tours/${t.slug}">${esc(t.title)}</a></th>
  <td class="p">${esc((t.price || "").replace(/^From /, "from "))}</td>
  <td>${esc(t.duration)}</td>
  <td>${esc(t.area)}</td>
</tr>`,
    )
    .join("\n");

const sections = CATEGORIES.map(
  ([name, slugs], i) => `
<section class="cat" id="cat-${i}">
  <h2>${esc(name)}</h2>
  <div class="tablewrap"><table>
    <thead><tr><th scope="col">Tour</th><th scope="col">Price, 2026</th><th scope="col">Duration</th><th scope="col">Area</th></tr></thead>
    <tbody>
${rows(slugs)}
    </tbody>
  </table></div>
</section>`,
).join("\n");

const faq = [
  ["How much do tours cost in Bali in 2026?", `Direct operator prices run from $${minP} for transfers to $${maxP} for premium marine days. Most full-day private tours sit between $49 and $89 per person; the Nusa Penida west circuit is from $49 per car for the whole group.`],
  ["Are these prices per person or per group?", "Per person unless marked otherwise. Two tours are priced per car — the Nusa Penida West Tour and the private car with driver — which makes them cheaper per head for couples and small groups."],
  ["Do the prices include pickup and gear?", "Hotel pickup is part of every tour plan, and activity gear (snorkeling sets, rafting equipment, surfboards) is included where the day needs it. Entrance tickets vary by tour — each tour page lists its exact inclusions."],
  ["Do I need to prepay to book?", "No. Every tour on this list is booked over WhatsApp with no prepayment: you confirm the date and pickup, and settle on the day."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/bali/en/tour-prices#webpage`,
      url: `${SITE}/bali/en/tour-prices`,
      name: "Bali Tour Prices 2026: Full Direct-Operator Price Index",
      description: `Every SB Excursions tour price on one page, from $${minP} to $${maxP}, updated ${updatedISO}.`,
      dateModified: updatedISO,
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Bali main page", item: `${SITE}/bali/en/main-page` },
        { "@type": "ListItem", position: 2, name: "Tour prices", item: `${SITE}/bali/en/tour-prices` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

const styleBlock = `<style id="sb-prices-css">
.sb-prices{
  --ink:#151515;--muted:#6f6f73;--line:rgba(21,21,21,.1);--bg:#f7f7f4;
  font-family:'Cina GEO','TildaSans',Arial,sans-serif;color:var(--ink);line-height:1.6;
  background:var(--bg);
}
/* fonts-cinageo.css общесайтово ставит html body{background:#fff!important} — возвращаем свой фон */
html body{background-color:#f7f7f4!important}
.sb-prices *{box-sizing:border-box}
.sb-prices a{color:inherit}
/* тильдовское #allrecords a красит все ссылки в фирменный оранжевый —
   для таблиц и навигации этой страницы возвращаем наследование */
#allrecords .sb-prices a{color:inherit}
#allrecords .sb-prices .cite a{color:#9edcff}
#allrecords .sb-prices .toc a{color:var(--ink)}
.sb-prices .wrap{max-width:960px;margin:0 auto;padding:110px 20px 0}
.sb-prices h1{font-size:clamp(34px,6vw,56px);font-weight:400;letter-spacing:-2px;line-height:1.05;margin:34px 0 14px;font-family:inherit}
.sb-prices .lead{font-size:18px;max-width:64ch}
.sb-prices .stamp{display:inline-block;margin:16px 0 0;background:#eaf6f2;color:#0f5132;font-size:13px;font-weight:700;padding:6px 12px;border-radius:999px}
.sb-prices .toc{display:flex;flex-wrap:wrap;gap:8px;margin:26px 0 4px}
.sb-prices .toc a{font-size:13.5px;color:var(--ink);border:1px solid var(--line);background:#fff;text-decoration:none;padding:7px 12px;border-radius:999px}
.sb-prices .toc a:hover{border-color:#151515}
.sb-prices .cat{margin-top:38px;padding:0}
.sb-prices h2{font-size:26px;font-weight:400;letter-spacing:-1px;margin:0 0 12px;font-family:inherit}
.sb-prices .tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch;background:#fff;border:1px solid var(--line);border-radius:16px}
.sb-prices table{width:100%;border-collapse:collapse;font-size:15px;min-width:640px}
.sb-prices th,.sb-prices td{padding:12px 14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
.sb-prices thead th{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);border-bottom-width:2px}
.sb-prices tbody tr:last-child th,.sb-prices tbody tr:last-child td{border-bottom:0}
.sb-prices tbody th{font-weight:600}
.sb-prices tbody th a{color:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(21,21,21,.25)}
.sb-prices tbody th a:hover{text-decoration-color:inherit}
.sb-prices td.p{white-space:nowrap;font-weight:700}
.sb-prices .note{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px;margin-top:34px}
.sb-prices .note h2{font-size:20px;margin-bottom:8px}
.sb-prices .note p{margin:8px 0;font-size:15px}
.sb-prices .cite{background:#111;color:#eee;border-radius:16px;padding:24px;margin:34px 0 60px}
.sb-prices .cite h2{color:#fff;font-size:22px}
.sb-prices .cite code{display:block;background:rgba(255,255,255,.08);border-radius:10px;padding:12px 14px;font-size:13px;margin-top:10px;word-break:break-all}
.sb-prices .cite a{color:#9edcff}
</style>`;

const bodyContent = `<main class="sb-prices">
<div class="wrap">

<h1>Bali tour prices in 2026, on one page</h1>
<p class="lead">Direct operator prices for all ${tours.length} private tours we run: from <strong>$${minP}</strong> for a transfer to <strong>$${maxP}</strong> for premium marine days. No commissions or markups baked in — these are the same numbers you get on WhatsApp. Two tours are priced <strong>per car</strong> rather than per person; they are marked in the tables.</p>
<p class="stamp">Updated ${updated} · reviewed with every price change</p>

<nav class="toc" aria-label="Categories">
${CATEGORIES.map(([name], i) => `  <a href="#cat-${i}">${esc(name)}</a>`).join("\n")}
</nav>

${sections}

<div class="note">
  <h2>How to read these prices</h2>
  <p>Prices are <strong>starting prices per person</strong> unless marked "per car". "Per car" covers the whole group — up to the vehicle's capacity — which usually makes those tours the cheapest per head for couples and families.</p>
  <p>Every tour includes hotel pickup planning and an English-speaking driver coordination; activity gear is included where the day needs it. Exact inclusions are listed on each tour page. Booking is over WhatsApp with <strong>no prepayment</strong>.</p>
  <p>For the full cost picture — food, transport between areas, entrance fees — see our guide to <a href="/bali/en/journal/bali-tour-prices-2026-real-costs">what a Bali trip really costs in 2026</a>.</p>
</div>

<div class="cite">
  <h2>Writing about Bali? Cite this page</h2>
  <p>These are live direct-operator prices, updated with every price change — free to reference in articles, guides and comparisons with attribution:</p>
  <code>Source: SB Excursions Bali tour price index, ${updated} — ${SITE}/bali/en/tour-prices</code>
  <p style="margin-top:12px">Journalists and creators: for comments, current numbers or a price check for your piece, message us on <a href="https://wa.me/6285333685020?text=${encodeURIComponent("Hi! I'm writing about Bali and have a question about your prices.")}" rel="nofollow">WhatsApp</a> — we answer 7:00–22:00 Bali time. Partners: see <a href="/work-with-us">how referral partnership works</a>.</p>
</div>

</div>
</main>
`;

const html = await buildChromedPage(ROOT, {
  title: `Bali Tour Prices 2026: Full Price Index (${tours.length} Tours)`,
  description: `Every direct-operator tour price in one table: ${tours.length} private Bali tours from $${minP} to $${maxP}. Updated ${updatedISO}. Free to cite with attribution.`,
  canonical: `${SITE}/bali/en/tour-prices`,
  ogImage: `${SITE}/images/places/kelingking-beach-t-rex-cliff.jpg`,
  heroPreload: null,
  waText: "Hello! I have a question about tour prices.",
  // Прайс-индекс существует только по-английски: с других языков
  // переключатель уводит на соответствующую главную, а не на тур донора.
  localeRoute: (code) => (code === "en" ? "/bali/en/tour-prices" : `/bali/${code}/main-page`),
  schema,
  styleBlock,
  bodyContent,
  bodyEndScript: null,
});

await fs.writeFile(path.join(ROOT, "bali-prices-index.html"), html);
console.log(JSON.stringify({ туров: tours.length, "диапазон": `$${minP}-$${maxP}`, файл: "bali-prices-index.html", байт: html.length }, null, 2));

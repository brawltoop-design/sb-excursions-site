// Приёмка статей кластера: валидация по правилам мега-промта + вставка.
import { promises as fs } from "node:fs";
const OUT = process.argv[2];
const raw = await fs.readFile(OUT, "utf8");
const data = JSON.parse(raw.slice(raw.indexOf("{")));
const guides = data.guides || [];
const F = "scripts/generate-bali-tour-pages.mjs";
let s = await fs.readFile(F, "utf8");

const LIVE_TOURS = new Set(["blue-lagoon-snorkeling","nusa-penida-manta-rays-point","nusa-penida-private-day-tour-manta-snorkeling","nusa-penida-full-day-tour","nusa-penida-west-tour","nusa-penida-east-tour","gili-island-tour","gili-islands-getaway","fast-boat-transfer-bali","private-car-with-driver-bali","surf-lesson-experience","east-bali-instagram-tour","bali-instagram-highlights-tour","sunset-cruise-bali","atv-quad-bikes","atv-ride-adventure","bali-airport-transfer","bali-unesco","dolphin-sunrise-city-tour","mount-batur-sunrise-hike","mount-batur-sunrise-jeep-hot-spring","mount-batur-sunrise-jeep-tour","north-bali-lovina-dolphins-tour","sumbawa-whale-shark-snorkeling-trip","tanah-lot-bedugul-tour","ubud-highlights-tour","ubud-instagram-tour","white-water-rafting"]);
const CLUSTER = new Set(["best-snorkeling-spots-bali","blue-lagoon-padang-bai-guide","best-beaches-nusa-penida","manta-point-bali-guide","crystal-bay-nusa-penida","can-you-swim-in-bali","snorkeling-with-turtles-bali","best-time-clear-water-bali","gili-islands-vs-nusa-penida","calm-beaches-bali-kids","best-white-sand-beaches-bali","amed-tulamben-snorkeling","menjangan-island-bali","best-beaches-canggu-seminyak","best-beaches-uluwatu-bukit","best-beaches-bali-crystal-clear-water","what-to-pack-for-bali","best-time-to-visit-bali-month-by-month","nusa-penida-complete-guide"]);
const FORBIDDEN = /nestled|hidden gem|breathtaking|must-visit|paradise|!/i;
const ALLOWED_PRICES = new Set(["$50","$29","$60","$75","$49","$115","$70","$15","$65","$35","$150","$20","$25","$80"]);

const ok = [], rejected = [];
for (const g of guides) {
  const errs = [];
  if (!g.slug || s.includes(`slug: "${g.slug}"`)) errs.push("slug пуст или уже существует");
  if (g.title.length > 65 || g.title.length < 45) errs.push(`title ${g.title.length} симв`);
  const num = g.title.match(/^(\d+)/);
  if (num && Number(num[1]) !== g.rankings.length) errs.push(`число в title ${num[1]} ≠ карточек ${g.rankings.length}`);
  if (g.description.length < 135 || g.description.length > 160) errs.push(`desc ${g.description.length} симв`);
  if (g.rankings.length < 6 || g.rankings.length > 9) errs.push(`карточек ${g.rankings.length}`);
  if (g.faq.length < 6 || g.faq.length > 8) errs.push(`faq ${g.faq.length}`);
  if (g.sections.length < 3 || g.sections.length > 5) errs.push(`секций ${g.sections.length}`);
  for (const r of g.rankings) {
    const p = String(r.imageSrc || "").replace(/^\//, "");
    try { await fs.access(p); } catch { errs.push(`нет картинки ${r.imageSrc}`); }
  }
  const text = JSON.stringify(g);
  const fw = text.match(FORBIDDEN);
  if (fw) errs.push(`запрещённое слово: ${JSON.stringify(fw[0])}`);
  for (const m of text.matchAll(/\/bali\/en\/tours\/([a-z0-9-]+)/g)) {
    if (!LIVE_TOURS.has(m[1])) errs.push(`мёртвый тур: ${m[1]}`);
  }
  for (const m of text.matchAll(/\/bali\/en\/journal\/([a-z0-9-]+)/g)) {
    if (!CLUSTER.has(m[1])) errs.push(`неизвестный гайд: ${m[1]}`);
  }
  for (const m of text.matchAll(/\$\s?(\d+(?:[.,]\d+)?k?)/gi)) {
    if (!ALLOWED_PRICES.has("$" + m[1])) errs.push(`посторонняя цена: $${m[1]}`);
  }
  if (!LIVE_TOURS.has(g.heroTourSlug)) errs.push(`heroTourSlug мёртв: ${g.heroTourSlug}`);
  for (const rt of g.relatedTourSlugs || []) if (!LIVE_TOURS.has(rt)) errs.push(`related мёртв: ${rt}`);
  if (errs.length) rejected.push([g.slug, errs]);
  else ok.push(g);
}

console.log(`принято: ${ok.length}, отклонено: ${rejected.length}`);
rejected.forEach(([slug, errs]) => console.log(`  ✗ ${slug}: ${errs.join("; ")}`));

if (process.argv[3] === "--insert" && ok.length) {
  const marker = "const JOURNAL_SEO_GUIDES = [\n";
  const idx = s.indexOf(marker);
  if (idx < 0) { console.log("массив не найден"); process.exit(1); }
  const blocks = ok.map((g) => "  " + JSON.stringify(g, null, 2).split("\n").join("\n  ") + ",\n").join("");
  s = s.slice(0, idx + marker.length) + blocks + s.slice(idx + marker.length);
  await fs.writeFile(F, s);
  console.log(`вставлено в генератор: ${ok.length}`);
}

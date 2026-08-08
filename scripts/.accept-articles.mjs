// Приёмка статей кластера: валидация по правилам мега-промта + вставка.
import { promises as fs } from "node:fs";
const OUT = process.argv[2];
const raw = await fs.readFile(OUT, "utf8");
const data = JSON.parse(raw.slice(raw.indexOf("{")));
const guides = data.guides || data.result?.guides || [];
const F = "scripts/generate-bali-tour-pages.mjs";
let s = await fs.readFile(F, "utf8");

const LIVE_TOURS = new Set(["atv-quad-bikes", "atv-ride-adventure", "bali-airport-transfer", "bali-instagram-highlights-tour", "bali-unesco", "blue-lagoon-snorkeling", "dolphin-sunrise-city-tour", "east-bali-instagram-tour", "fast-boat-transfer-bali", "gili-island-tour", "gili-islands-getaway", "mount-batur-sunrise-hike", "mount-batur-sunrise-jeep-hot-spring", "mount-batur-sunrise-jeep-tour", "north-bali-lovina-dolphins-tour", "nusa-penida-east-tour", "nusa-penida-full-day-tour", "nusa-penida-manta-rays-point", "nusa-penida-private-day-tour-manta-snorkeling", "nusa-penida-west-tour", "private-car-with-driver-bali", "sumbawa-whale-shark-snorkeling-trip", "sunset-cruise-bali", "surf-lesson-experience", "tanah-lot-bedugul-tour", "ubud-highlights-tour", "ubud-instagram-tour", "white-water-rafting"]);
const CLUSTER = new Set(["amed-tulamben-snorkeling", "bali-7-day-itinerary", "bali-airport-transfer-guide", "bali-atv-tours-guide", "bali-canggu-beaches-guide", "bali-day-trips-with-kids", "bali-honeymoon-day-trips", "bali-itinerary-10-days", "bali-itinerary-5-days", "bali-private-driver-cost", "bali-safety-scams-and-health", "bali-snorkeling-for-beginners", "bali-sunset-cruise-worth-it", "bali-tour-prices-2026-real-costs", "best-beach-clubs-bali-young-adults", "best-beaches-bali-crystal-clear-water", "best-beaches-canggu-seminyak", "best-beaches-nusa-penida", "best-beaches-uluwatu-bukit", "best-instagram-places-bali", "best-snorkeling-spots-bali", "best-sunset-spots-bali", "best-temples-bali-cultural-sites", "best-things-to-do-bali-for-couples", "best-time-clear-water-bali", "best-time-to-visit-bali-month-by-month", "best-viewpoints-bali-sunrise-cliffs-rice-terraces", "best-waterfalls-bali-day-trips", "best-white-sand-beaches-bali", "blue-lagoon-padang-bai-guide", "calm-beaches-bali-kids", "can-you-swim-in-bali", "crystal-bay-nusa-penida", "gili-air-vs-gili-trawangan", "gili-islands-day-trip-from-bali", "gili-islands-vs-nusa-penida", "gili-t-day-trip-from-seminyak", "how-to-get-around-bali", "how-to-get-to-gili-trawangan-from-bali", "how-to-get-to-nusa-penida", "is-mount-batur-safe", "is-nusa-penida-safe", "is-nusa-penida-worth-it", "lovina-dolphin-tour-worth-it", "manta-point-bali-guide", "menjangan-island-bali", "mount-batur-sunrise-from-south-bali", "mount-batur-sunrise-from-ubud", "mount-batur-sunrise-jeep-vs-hike", "mount-batur-vs-mount-agung", "nusa-penida-complete-guide", "nusa-penida-day-trip-from-canggu", "nusa-penida-day-trip-from-sanur", "nusa-penida-day-trip-from-seminyak", "nusa-penida-day-trip-from-ubud", "nusa-penida-day-trip-from-uluwatu", "nusa-penida-one-day-itinerary", "nusa-penida-tours-compared", "nusa-penida-vs-nusa-lembongan", "nusa-penida-with-kids", "nusa-penida-without-a-tour", "snorkeling-near-seminyak-and-canggu", "snorkeling-with-turtles-bali", "surf-lessons-bali-beginners", "swimming-with-whale-sharks-indonesia", "tanah-lot-vs-uluwatu-sunset", "ubud-in-one-day", "what-to-pack-for-bali", "where-to-stay-bali-first-time", "white-water-rafting-bali-guide"]);
const FORBIDDEN = /nestled|hidden gem|breathtaking|must-visit|paradise|!/i;
// Актуальные цены туров после переценки августа-2026.
const ALLOWED_PRICES = new Set(["$15", "$20", "$25", "$29", "$35", "$49", "$50", "$59", "$60", "$69", "$70", "$75", "$79", "$89", "$115", "$150"]);

const ok = [], rejected = [];
for (const g of guides) {
  const errs = [];
  // Агент мог оборваться на полпути (лимит сессии) и вернуть один slug —
  // такие заготовки отсеиваем сразу, иначе проверки падают на undefined.
  if (!g.title || !g.description || !g.rankings) {
    rejected.push([g.slug || "?", ["пустая заготовка — статья не написана"]]);
    continue;
  }
  if (!g.slug || s.includes(`slug: "${g.slug}"`)) errs.push("slug пуст или уже существует");
  if (g.title.length > 65 || g.title.length < 45) errs.push(`title ${g.title.length} симв`);
  const num = g.title.match(/^(\d+)/);
  if (num && Number(num[1]) !== g.rankings.length) errs.push(`число в title ${num[1]} ≠ карточек ${g.rankings.length}`);
  if (g.description.length < 135 || g.description.length > 160) errs.push(`desc ${g.description.length} симв`);
  // Обычному списку 6-9 карточек: меньше — тонко, больше — свалка.
  // Но у статей-маршрутов число карточек задано темой (5 дней = 5 карточек,
  // 10 дней = 10), и оно уже сверено с числом в заголовке выше.
  const numbered = num && Number(num[1]) === g.rankings.length;
  const [minCards, maxCards] = numbered ? [5, 12] : [6, 9];
  if (g.rankings.length < minCards || g.rankings.length > maxCards) errs.push(`карточек ${g.rankings.length}`);
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

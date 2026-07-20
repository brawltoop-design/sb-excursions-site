// Fetch one real, on-topic photo per tour from Pexels (free, commercial
// licence) so the catalog and journal stop repeating the same stock image.
// Also carries an SEO alt for each tour describing what the photo shows.
//
// Usage:  PEXELS_API_KEY=xxxxx node scripts/fetch-tour-photos.mjs
// Idempotent: skips tours already downloaded. Images -> images/tours-real/,
// source + alt recorded in images/tours-real/_manifest.json.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "images", "tours-real");
const manifestPath = path.join(outDir, "_manifest.json");

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY. Get a free key at https://www.pexels.com/api/");
  process.exit(1);
}

// slug -> { query, alt }. Query targets the real place/activity; alt describes
// the photo for SEO (place + Bali + what's shown).
const TOURS = {
  "ubud-highlights-tour": { query: "Tegalalang rice terrace Ubud Bali", alt: "Tegalalang rice terraces in Ubud, Bali on the Ubud rice terrace, temple and volcano tour" },
  "north-bali-lovina-dolphins-tour": { query: "Lovina beach north Bali boat", alt: "Traditional outrigger boats at Lovina beach in north Bali for the dolphin tour" },
  "dolphin-sunrise-city-tour": { query: "dolphin jumping ocean sunrise", alt: "Spinner dolphins leaping at sunrise off Lovina, north Bali" },
  "east-bali-instagram-tour": { query: "Lempuyang temple gates of heaven Bali", alt: "Lempuyang Temple Gates of Heaven framing Mount Agung in east Bali" },
  "tanah-lot-bedugul-tour": { query: "Tanah Lot temple sunset Bali", alt: "Tanah Lot sea temple silhouetted at sunset in Bali" },
  "bali-unesco": { query: "Jatiluwih rice terrace Bali", alt: "Jatiluwih UNESCO rice terraces in the central Bali highlands" },
  "mount-batur-sunrise-jeep-tour": { query: "Mount Batur sunrise volcano Bali", alt: "Sunrise over Mount Batur volcano and its caldera in Kintamani, Bali" },
  "mount-batur-sunrise-hike": { query: "volcano summit sunrise hikers", alt: "Hikers watching sunrise from the summit of Mount Batur, Bali" },
  "mount-batur-sunrise-jeep-hot-spring": { query: "natural hot spring pool mountain", alt: "Natural hot spring pools below Mount Batur after the sunrise jeep tour" },
  "atv-ride-adventure": { query: "ATV quad bike mud jungle trail", alt: "ATV quad bike on a muddy jungle trail during a Bali off-road adventure" },
  "atv-quad-bikes": { query: "four wheeler quad bike riding", alt: "Quad bike riding through a forest track near Ubud, Bali" },
  "bali-instagram-highlights-tour": { query: "Handara gate Bali", alt: "Handara Gate, a classic Bali Instagram photo spot in the highlands" },
  "ubud-instagram-tour": { query: "Bali jungle swing rice terrace", alt: "Jungle swing over the rice terraces near Ubud, Bali" },
  "nusa-penida-private-day-tour-manta-snorkeling": { query: "manta ray snorkeling Nusa Penida", alt: "Snorkeler swimming with a manta ray at Manta Point, Nusa Penida" },
  "nusa-penida-west-tour": { query: "Kelingking Beach Nusa Penida cliff", alt: "Kelingking Beach T-Rex cliff on the west coast of Nusa Penida" },
  "nusa-penida-east-tour": { query: "Diamond Beach Nusa Penida", alt: "Diamond Beach and its cliff-carved staircase on east Nusa Penida" },
  "nusa-penida-full-day-tour": { query: "Nusa Penida cliff coastline aerial", alt: "Dramatic cliff coastline of Nusa Penida from above" },
  "nusa-penida-manta-rays-point": { query: "manta ray underwater ocean", alt: "Oceanic manta ray gliding over the reef at Manta Point, Nusa Penida" },
  "nusa-lembongan-ceningan-day-trip": { query: "Nusa Lembongan yellow bridge", alt: "The yellow suspension bridge linking Nusa Lembongan and Nusa Ceningan" },
  "gili-islands-getaway": { query: "Gili islands beach turquoise", alt: "Turquoise water and white sand on the Gili Islands" },
  "gili-island-tour": { query: "sea turtle snorkeling tropical", alt: "Snorkeling with a green sea turtle in the Gili Islands" },
  "sumbawa-whale-shark-snorkeling-trip": { query: "whale shark snorkeling ocean", alt: "Snorkeler beside a whale shark in Saleh Bay, Sumbawa" },
  "blue-lagoon-snorkeling": { query: "snorkeling coral reef clear water", alt: "Snorkeling over coral at Blue Lagoon, Padang Bai, east Bali" },
  "white-water-rafting": { query: "white water rafting jungle river", alt: "White water rafting through the Ayung River gorge near Ubud, Bali" },
  "sunset-cruise-bali": { query: "sunset cruise boat ocean", alt: "Sunset cruise on the ocean off the Bali coast" },
  "surf-lesson-experience": { query: "surf lesson beginner beach", alt: "Beginner surf lesson on a sandy Bali beach break" },
  "bali-airport-transfer": { query: "airport arrivals private car transfer", alt: "Private airport transfer car waiting at Bali's Ngurah Rai airport" },
  "private-car-with-driver-bali": { query: "private car driver road tropical", alt: "Private car with driver for a full-day Bali sightseeing tour" },
  "fast-boat-transfer-bali": { query: "fast boat speedboat ocean island", alt: "Fast boat crossing to the islands from Bali" },
  "bali-helicopter-scenic-tour": { query: "helicopter aerial tropical coast", alt: "Scenic helicopter flight over Bali's coastline and rice terraces" },
  "volcano-coastline-helicopter-ride": { query: "aerial coastline beach tropical drone", alt: "Aerial view of Bali's coastline and beaches on the scenic helicopter ride" },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=3`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) return null;
  const imgUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) throw new Error(`download ${imgRes.status}`);
  return { buf: Buffer.from(await imgRes.arrayBuffer()), source: photo.url, photographer: photo.photographer };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  const slugs = Object.keys(TOURS);
  let done = 0;
  let failed = 0;

  for (const slug of slugs) {
    const file = `${slug}.jpg`;
    if (manifest[slug] && fs.existsSync(path.join(outDir, file))) {
      done++;
      continue;
    }
    try {
      const result = await fetchOne(TOURS[slug].query);
      if (result) {
        fs.writeFileSync(path.join(outDir, file), result.buf);
        manifest[slug] = { file, alt: TOURS[slug].alt, source: result.source, photographer: result.photographer };
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        done++;
        console.log(`✓ ${slug}  ←  ${TOURS[slug].query}`);
      } else {
        failed++;
        console.warn(`✗ no result: ${slug}`);
      }
    } catch (err) {
      failed++;
      console.warn(`✗ ${slug}: ${err.message}`);
    }
    await sleep(350);
  }

  console.log(`\nDone. ${done}/${slugs.length} tour photos ready, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

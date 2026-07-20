// Fetch real photos of Bali places from Pexels (free, commercial licence, no
// attribution required) for the journal guide ranking cards that currently fall
// back to a generic tour image.
//
// Usage:  PEXELS_API_KEY=xxxxx node scripts/fetch-place-photos.mjs
//         (get a free key in ~30s at https://www.pexels.com/api/)
//
// Idempotent: skips places already downloaded, so you can re-run it any time.
// Writes images to images/places/<slug>.jpg and records the source in
// images/places/_manifest.json (title -> { file, source, photographer }).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "images", "places");
const manifestPath = path.join(outDir, "_manifest.json");

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY. Get a free key at https://www.pexels.com/api/ and run:\n  PEXELS_API_KEY=xxxxx node scripts/fetch-place-photos.mjs");
  process.exit(1);
}

// title -> Pexels search query. Real named places get a precise query; the
// conceptual cards (budget tiers, paperwork, food) get a descriptive scene.
const QUERIES = {
  "Bali villa with pool": "Bali villa private pool",
  "Bali SIM card": "sim card smartphone hand",
  "Scooter rental Bali": "scooter parked street Bali",
  "Bali immigration": "airport immigration passport",
  "Arrival day in south Bali": "Seminyak beach Bali sunset",
  "Uluwatu cliffs at sunset": "Uluwatu cliff sunset Bali",
  "Tegalalang rice terraces": "Tegalalang rice terrace Bali",
  "Kelingking Beach viewpoint": "Kelingking Beach Nusa Penida",
  "Bali waterfall": "Bali waterfall jungle",
  "Bali beach club": "beach club daybed pool Bali",
  "Ubud Monkey Forest": "monkey forest Bali macaque",
  "Tirta Empul holy spring": "Tirta Empul temple Bali water",
  "Ayung River gorge": "Ayung river Bali jungle gorge",
  "Tukad Cepung light beams": "Tukad Cepung waterfall Bali",
  "Campuhan Ridge": "Campuhan ridge walk Ubud Bali",
  "Budget travel in Bali": "backpacker Bali scooter",
  "Mid-range hotel in Bali": "boutique hotel pool Bali",
  "Luxury resort in Bali": "luxury resort infinity pool Bali",
  "Balinese warung meal": "Indonesian food rice plate",
  "Scooter and driver in Bali": "car driver road Bali",
  "Mount Batur sunrise trek": "Mount Batur sunrise summit Bali",
  "Online visa application": "laptop passport travel documents",
  "Digital arrival card": "smartphone travel airport hand",
  "Love Bali levy": "Bali temple gate",
  "Passport control": "airport passport control",
  "Private driver in Bali": "private car driver Indonesia",
  "Scooter in Bali": "scooter motorbike road Bali",
  "Ride hailing app": "smartphone map ride app",
  "Bluebird taxi": "taxi meter dashboard",
  "Bali airport arrivals": "airport arrivals terminal",
  "Fast boat from Sanur": "speedboat ocean island Bali",
  "Bali in shoulder season": "Bali rice field green",
  "Bali in peak season": "Bali beach summer",
  "Bali in September": "Bali beach clear sky",
  "Bali green season": "Bali rice terrace lush green",
  "Bali in rainy season": "tropical rain jungle",
  "Kelingking Beach T-Rex cliff": "Kelingking Beach cliff Nusa Penida",
  "Angel's Billabong rock pool": "Angel Billabong Nusa Penida",
  "Broken Beach arch": "Broken Beach Nusa Penida arch",
  "Diamond Beach cliffs": "Diamond Beach Nusa Penida",
  "Manta ray snorkeling": "manta ray snorkeling ocean",
  "Crystal Bay": "Crystal Bay Nusa Penida beach",
  "Surfing in Canggu": "surfing Canggu Bali wave",
  "Canggu cafe": "cafe brunch coffee Bali",
  "Canggu beach club": "beach club sunset Bali",
  "Canggu rice fields": "Canggu rice field Bali",
  "Uluwatu Temple cliff": "Uluwatu temple cliff Bali",
  "Uluwatu surf": "Uluwatu surf wave Bali",
  "Bukit beach club": "cliff beach club Uluwatu Bali",
  "Seminyak sunset": "Seminyak beach sunset Bali",
  "Seminyak restaurant": "restaurant dining table Bali",
  "Balinese massage": "spa massage Bali",
  "Seminyak boutiques": "boutique shop clothing Bali",
  "Calm beach in Bali": "Sanur beach calm Bali",
  "Blue Lagoon Padang Bai": "Blue Lagoon Padang Bai snorkeling",
  "Ayung River rafting": "white water rafting river",
  "Mount Batur jeep": "Mount Batur jeep volcano",
  "Warm layer for sunrise": "mountain sunrise cold jacket",
  "Hiking shoes": "hiking boots trail",
  "Temple dress code": "Bali temple sarong offering",
  "Dry bag": "dry bag waterproof beach",
  "Sunscreen": "sunscreen beach summer",
  "Babi guling suckling pig": "roasted suckling pig hog roast",
  "Bebek betutu duck": "Indonesian duck dish",
  "Sate lilit satay": "satay skewer grill food",
  "Nasi campur plate": "nasi campur Indonesian rice",
  "Lawar salad": "Indonesian salad coconut dish",
  "Tipat cantok": "Indonesian peanut vegetable dish",
  "Scooter safety in Bali": "scooter helmet road",
  "Bali surf beach": "surf beach wave Bali",
  "Drinks safety": "cocktail bar drinks",
  "Bali street dog": "dog street asia",
  "Bali street at night": "Bali street night lights",
  "Money exchange": "money exchange currency counter",
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(title, query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=3`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status} for "${query}"`);
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) return null;
  const imgUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) throw new Error(`download ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const file = `${slugify(title)}.jpg`;
  fs.writeFileSync(path.join(outDir, file), buf);
  return { file, source: photo.url, photographer: photo.photographer };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  const titles = Object.keys(QUERIES);
  let done = 0;
  let failed = 0;

  for (const title of titles) {
    const slug = slugify(title);
    const existing = path.join(outDir, `${slug}.jpg`);
    if (manifest[title] && fs.existsSync(existing)) {
      done++;
      continue;
    }
    try {
      const result = await fetchOne(title, QUERIES[title]);
      if (result) {
        manifest[title] = result;
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        done++;
        console.log(`✓ ${title}  ←  ${QUERIES[title]}`);
      } else {
        failed++;
        console.warn(`✗ no result: ${title}`);
      }
    } catch (err) {
      failed++;
      console.warn(`✗ ${title}: ${err.message}`);
    }
    await sleep(350); // stay well under Pexels rate limits
  }

  console.log(`\nDone. ${done}/${titles.length} images ready, ${failed} failed. Manifest: images/places/_manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

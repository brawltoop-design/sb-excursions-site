/*
 * IndexNow — мгновенное уведомление поисковиков о новых и изменённых страницах.
 *
 * Поддерживают Bing, Yandex, Seznam, Naver. Google в IndexNow НЕ участвует:
 * туда страницы подаются только вручную через Search Console («Проверка URL» →
 * «Запросить индексирование») либо ждут обычного обхода.
 *
 * Как работает: на домене лежит файл <ключ>.txt с этим же ключом внутри —
 * так поисковик убеждается, что заявку подал владелец сайта. Дальше одним
 * запросом отправляется список адресов.
 *
 * Запуск:
 *   node scripts/submit-indexnow.mjs           — приоритетные страницы
 *   node scripts/submit-indexnow.mjs --all     — все URL из sitemap.xml
 *
 * ВАЖНО: файл ключа должен быть уже задеплоен, иначе придёт 403.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOST = "sbexcursion.com";
const SITE = `https://${HOST}`;

const key = (await fs.readFile(path.join(ROOT, ".indexnow-key"), "utf8")).trim();

// Приоритет: новый кластер «вода и пляжи» + страницы, у которых менялись
// заголовки и цены. Именно их нужно переобойти в первую очередь.
const CLUSTER = [
  "best-snorkeling-spots-bali", "blue-lagoon-padang-bai-guide", "best-beaches-nusa-penida",
  "manta-point-bali-guide", "crystal-bay-nusa-penida", "can-you-swim-in-bali",
  "snorkeling-with-turtles-bali", "best-time-clear-water-bali", "gili-islands-vs-nusa-penida",
  "calm-beaches-bali-kids", "best-white-sand-beaches-bali", "amed-tulamben-snorkeling",
  "menjangan-island-bali", "best-beaches-canggu-seminyak", "best-beaches-uluwatu-bukit",
];
const CHANGED_GUIDES = [
  "bali-safety-scams-and-health", "best-viewpoints-bali-sunrise-cliffs-rice-terraces",
  "best-beach-clubs-bali-young-adults", "best-temples-bali-cultural-sites",
  "where-to-stay-bali-first-time", "best-things-to-do-bali-for-couples",
  "best-waterfalls-bali-day-trips", "best-instagram-places-bali",
];
const CHANGED_TOURS = [
  "sunset-cruise-bali", "private-car-with-driver-bali", "bali-airport-transfer",
  "fast-boat-transfer-bali", "blue-lagoon-snorkeling", "white-water-rafting",
  "surf-lesson-experience", "gili-islands-getaway", "nusa-penida-manta-rays-point",
  "nusa-penida-full-day-tour", "nusa-penida-west-tour", "gili-island-tour",
  "bali-unesco", "ubud-highlights-tour", "mount-batur-sunrise-hike",
  "mount-batur-sunrise-jeep-tour", "sumbawa-whale-shark-snorkeling-trip",
  "dolphin-sunrise-city-tour", "tanah-lot-bedugul-tour", "atv-quad-bikes",
];

async function priorityUrls() {
  const urls = [`${SITE}/bali/en/main-page`, `${SITE}/bali/en/journal`, `${SITE}/bali/en/guides`];
  for (const slug of [...CLUSTER, ...CHANGED_GUIDES]) urls.push(`${SITE}/bali/en/journal/${slug}`);
  for (const slug of CHANGED_TOURS) urls.push(`${SITE}/bali/en/tours/${slug}`);
  return urls;
}

async function sitemapUrls() {
  const xml = await fs.readFile(path.join(ROOT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = process.argv.includes("--all") ? await sitemapUrls() : await priorityUrls();
console.log(`адресов к отправке: ${urls.length}`);

// Проверяем, что ключ реально отдаётся с домена, иначе заявка бессмысленна.
const keyUrl = `${SITE}/${key}.txt`;
const keyCheck = await fetch(keyUrl).then((r) => (r.ok ? r.text() : null)).catch(() => null);
if (!keyCheck || keyCheck.trim() !== key) {
  console.log(`✗ ключ не отдаётся по ${keyUrl} — сначала задеплой сайт, потом запускай`);
  process.exit(1);
}
console.log(`✓ ключ подтверждён: ${keyUrl}`);

// IndexNow принимает до 10 000 адресов за раз; шлём пачками по 1000.
const endpoints = ["https://api.indexnow.org/indexnow", "https://yandex.com/indexnow"];
for (let i = 0; i < urls.length; i += 1000) {
  const batch = urls.slice(i, i + 1000);
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key, keyLocation: keyUrl, urlList: batch }),
      });
      const name = new URL(endpoint).host;
      console.log(`  ${name}: HTTP ${res.status}${res.status === 200 || res.status === 202 ? " — принято" : ""}`);
    } catch (e) {
      console.log(`  ${new URL(endpoint).host}: ошибка — ${e.message.slice(0, 60)}`);
    }
  }
}

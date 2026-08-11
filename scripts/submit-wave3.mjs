/*
 * Разовая подача статей волны 3 в IndexNow — все пять языковых версий.
 *
 * IndexNow понимают Bing, Yandex, Seznam и Naver. Google в нём не участвует:
 * туда эти адреса попадут обычным обходом по sitemap.xml, а самые важные
 * можно ускорить вручную через Search Console.
 *
 *   node scripts/submit-wave3.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOST = "www.sbexcursion.com";
const SITE = `https://${HOST}`;
const LANGS = ["en", "ru", "es", "fr", "zh"];

const SLUGS = [
  "bali-tourist-tax-levy-guide",
  "bali-entrance-fees-2026",
  "is-mount-batur-worth-it",
  "can-you-hike-mount-batur-without-a-guide",
  "mount-batur-sunrise-vs-sunset",
  "are-gili-islands-worth-it",
  "are-gili-islands-safe",
  "gili-trawangan-vs-air-vs-meno",
  "grab-gojek-or-private-driver-bali",
  "manta-ray-season-bali",
  "whale-shark-season-sumbawa",
  "bali-tours-in-rainy-season",
  "kelingking-beach-guide",
  "diamond-beach-nusa-penida-guide",
  "broken-beach-angels-billabong",
  "tukad-cepung-waterfall-guide",
  "tirta-empul-guide",
  "jatiluwih-vs-tegalalang",
  "bali-snorkeling-cost",
  "sanur-to-nusa-penida-fast-boat",
  "airport-to-ubud-transfer",
  "ubud-to-mount-batur",
  "bali-layover-day-tour",
  "bali-tours-for-seniors",
];

const key = (await fs.readFile(path.join(ROOT, ".indexnow-key"), "utf8")).trim();
const urlList = SLUGS.flatMap((slug) => LANGS.map((l) => `${SITE}/bali/${l}/journal/${slug}`));

// Проверяем, что адреса действительно отвечают, прежде чем заявлять их
// поисковикам: заявка на 404 тратит доверие к домену в IndexNow.
const sample = [urlList[0], urlList[Math.floor(urlList.length / 2)], urlList[urlList.length - 1]];
for (const url of sample) {
  const res = await fetch(url, { method: "HEAD" });
  console.log(`проверка ${res.status}  ${url}`);
  if (!res.ok) {
    console.error("страница не отвечает — подача отменена");
    process.exit(1);
  }
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — отправлено адресов: ${urlList.length}`);

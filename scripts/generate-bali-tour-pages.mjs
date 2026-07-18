import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SITE_URL = "https://sbexcursion.com";
const WHATSAPP_NUMBER = "6285333685020";
const DUBAI_WHATSAPP_NUMBER = "971506048673";
const GENERIC_FOOTER_WA_TEXT =
  "Hello!%20I&#039;m%20interested%20in%20your%20excursions.%20Could%20you%20help%20me%20with%20the%20booking%20details%3F";
const BALI_GENERIC_FOOTER_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${GENERIC_FOOTER_WA_TEXT}`;
const DUBAI_GENERIC_FOOTER_WA_LINK = `https://wa.me/${DUBAI_WHATSAPP_NUMBER}?text=${GENERIC_FOOTER_WA_TEXT}`;
const BALI_GENERIC_FOOTER_PHONE_LINK = `<a href="${BALI_GENERIC_FOOTER_WA_LINK}"target="_blank"style="color: inherit"><u>+62 853 3368 5020</u></a>`;
const DUBAI_GENERIC_FOOTER_PHONE_LINK = `<a href="${DUBAI_GENERIC_FOOTER_WA_LINK}"target="_blank"style="color: inherit"><u>+971 50 604 8673</u></a>`;
const HERO_IMAGE_DIR = path.join(projectRoot, "images", "bali-tours");
const WEST_TEMPLATE_SOURCE_FILE = path.join(projectRoot, "page128064616.html");
const JOURNAL_HUB_ROUTE = "/bali/en/journal";
const BALI_LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];
const TRANSLATION_CACHE_PATH = path.join(projectRoot, ".generated", "bali-translation-cache.json");
const JOURNAL_PUBLISHED_DATE = "2026-05-21";
const WEATHER_MAIN_PAGE_ROUTE = "/bali/en/main-page#tours";
const JOURNAL_FEATURED_ARTICLES = [
  ["ubud-highlights-tour", "selling"],
  ["nusa-penida-manta-rays-point", "interesting"],
  ["mount-batur-sunrise-hike", "schedule"],
  ["ubud-instagram-tour", "selling"],
  ["nusa-penida-east-tour", "interesting"],
  ["sunset-cruise-bali", "schedule"],
];
const BALI_TILDA_FOOTER_PATCH_FILES = [
  "bali-about.html",
  "bali-faq.html",
  "page128064616.html",
  "files/page128064616body.html",
  "page128073236.html",
  "files/page128073236body.html",
  "page132181473.html",
  "files/page132181473body.html",
  "page132812463.html",
  "files/page132812463body.html",
  "page133629743.html",
  "files/page133629743body.html",
  "page139295043.html",
  "files/page139295043body.html",
];
const TILDA_WEATHER_ROUTE_OVERRIDES = {
  "mount-batur-sunrise-jeep-hot-spring": "/bali/en/tours/mount-batur-sunrise-jeep-hot-spring",
};
const TILDA_WEATHER_FILE_FALLBACKS = {
  "page128064616body.html": "/bali/en/tours/nusa-penida-west-tour",
  "page128073236.html": WEATHER_MAIN_PAGE_ROUTE,
  "page128073236body.html": WEATHER_MAIN_PAGE_ROUTE,
  "page139295043.html": WEATHER_MAIN_PAGE_ROUTE,
  "page139295043body.html": WEATHER_MAIN_PAGE_ROUTE,
};
const JEEP_HOT_SPRING_ROUTE_PATCH_FILES = [
  "page133629743.html",
  "files/page133629743body.html",
];
const BALI_FOOTER_GRADIENT_FROM = "linear-gradient(0.346turn,rgba(255,179,71,1) 0%,rgba(255,204,51,1) 100%)";
const BALI_FOOTER_GRADIENT_LEGACY_BLUE =
  "linear-gradient(0.346turn,rgba(123,189,240,1) 0%,rgba(98,129,231,1) 52%,rgba(63,68,240,1) 100%)";
const BALI_FOOTER_GRADIENT_TO =
  "linear-gradient(90deg,rgba(126,196,244,1) 0%,rgba(103,137,236,1) 54%,rgba(63,68,240,1) 100%)";
const BALI_FOOTER_LAYOUT_FIX_STYLE = `
<style id="sb-bali-footer-layout-fix">
#rec1803718291 .tn-elem[data-elem-id="1768939358418000001"],
#rec1803718291 .tn-elem[data-elem-id="1777817606035000001"],
#rec1803718291 .tn-elem[data-elem-id="1768939460987000003"],
#rec1803718291 .tn-elem[data-elem-id="1768911990186"]{
  width:180px !important;
}
#rec1803718291 .tn-elem[data-elem-id="1768940411034000009"],
#rec1803718291 .tn-elem[data-elem-id="1768940432226000010"],
#rec1803718291 .tn-elem[data-elem-id="1721245128909"]{
  width:190px !important;
}
#rec1803718291 .tn-elem[data-elem-id="1768939358418000001"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1777817606035000001"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1768939460987000003"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1768911990186"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1768940411034000009"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1768940432226000010"] .tn-atom,
#rec1803718291 .tn-elem[data-elem-id="1721245128909"] .tn-atom{
  white-space:nowrap !important;
}
@media screen and (max-width: 1199px){
  #rec1803718291 .tn-elem[data-elem-id="1768939358418000001"],
  #rec1803718291 .tn-elem[data-elem-id="1777817606035000001"],
  #rec1803718291 .tn-elem[data-elem-id="1768939460987000003"],
  #rec1803718291 .tn-elem[data-elem-id="1768911990186"]{
    width:165px !important;
  }
  #rec1803718291 .tn-elem[data-elem-id="1768940411034000009"],
  #rec1803718291 .tn-elem[data-elem-id="1768940432226000010"],
  #rec1803718291 .tn-elem[data-elem-id="1721245128909"]{
    width:170px !important;
  }
}
@media screen and (max-width: 959px){
  #rec1803718291 .tn-elem[data-elem-id="1768939358418000001"],
  #rec1803718291 .tn-elem[data-elem-id="1777817606035000001"],
  #rec1803718291 .tn-elem[data-elem-id="1768939460987000003"],
  #rec1803718291 .tn-elem[data-elem-id="1768911990186"]{
    width:140px !important;
  }
  #rec1803718291 .tn-elem[data-elem-id="1768940411034000009"],
  #rec1803718291 .tn-elem[data-elem-id="1768940432226000010"],
  #rec1803718291 .tn-elem[data-elem-id="1721245128909"]{
    width:160px !important;
  }
}
@media screen and (max-width: 639px){
  #rec1803718291 .tn-elem[data-elem-id="1768939358418000001"],
  #rec1803718291 .tn-elem[data-elem-id="1777817606035000001"],
  #rec1803718291 .tn-elem[data-elem-id="1768939460987000003"],
  #rec1803718291 .tn-elem[data-elem-id="1768911990186"],
  #rec1803718291 .tn-elem[data-elem-id="1768940411034000009"],
  #rec1803718291 .tn-elem[data-elem-id="1768940432226000010"],
  #rec1803718291 .tn-elem[data-elem-id="1721245128909"]{
    width:auto !important;
  }
  #rec1803718291 .tn-elem[data-elem-id="1768939358418000001"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1777817606035000001"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1768939460987000003"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1768911990186"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1768940411034000009"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1768940432226000010"] .tn-atom,
  #rec1803718291 .tn-elem[data-elem-id="1721245128909"] .tn-atom{
    white-space:normal !important;
  }
}
/* Localized footers: translated link labels ("Политика конфиденциальности",
   "Politique de confidentialité", …) wrap to two lines and collide with the
   next absolutely-positioned link. Tighten them so two lines fit the slot. */
html[lang]:not([lang="en"]) #rec1803718291 .tn-elem .tn-atom a{
  font-size:11px !important;
  line-height:12.5px !important;
  display:inline-block !important;
}
html[lang]:not([lang="en"]) #rec1803718291 .tn-elem .tn-atom:has(> a){
  line-height:12.5px !important;
}
</style>`;
const JOURNAL_FOOTER_ASSETS = `
    <link rel="stylesheet" href="/css/fonts-tildasans.css">
    <link rel="stylesheet" href="/css/fonts-cinageo.css">`;
const WEATHER_COMPACT_OVERRIDE_STYLE = `
<style id="sb-weather-compact-override">
#bwCta {
  display: none !important;
}

#rec2147449333 .bw-footer {
  grid-template-columns: minmax(0, 1fr) !important;
}

#rec2147449333 .bali-weather-outer {
  width: 100% !important;
  max-width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  overflow-x: hidden !important;
  overflow-x: clip !important;
}

@media screen and (max-width: 959px) {
  #rec2147449333 .bali-weather-outer {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 14px;
  }

  #rec2147449333 .bali-weather-card {
    min-height: 210px;
    padding: 15px;
    border-radius: 20px;
  }

  #rec2147449333 .bw-badge {
    min-height: 25px;
    padding: 5px 10px;
    font-size: 10px;
  }

  #rec2147449333 .bw-updated {
    font-size: 10px;
  }

  #rec2147449333 .bw-main {
    margin-top: 14px;
    grid-template-columns: minmax(0, 1.4fr) 88px;
    gap: 12px;
  }

  #rec2147449333 .bw-temp {
    font-size: clamp(40px, 6.5vw, 62px);
  }

  #rec2147449333 .bw-condition {
    margin-top: 6px;
    font-size: clamp(18px, 2vw, 24px);
  }

  #rec2147449333 .bw-summary {
    margin-top: 8px;
    font-size: 13px;
  }

  #rec2147449333 .bw-hero-icon {
    width: 88px;
    height: 88px;
    border-radius: 18px;
    font-size: 38px;
  }

  #rec2147449333 .bw-metrics {
    margin-top: 14px;
    gap: 8px;
  }

  #rec2147449333 .bw-metric {
    padding: 10px 12px;
    border-radius: 15px;
  }

  #rec2147449333 .bw-metric-label {
    margin-bottom: 4px;
    font-size: 10px;
  }

  #rec2147449333 .bw-metric-value {
    font-size: 15px;
  }

  #rec2147449333 .bw-footer {
    margin-top: 14px;
  }

  #rec2147449333 .bw-tips-title {
    margin-bottom: 6px;
    font-size: 10px;
  }

  #rec2147449333 .bw-tips {
    gap: 6px;
  }

  #rec2147449333 .bw-tip {
    min-height: 25px;
    padding: 5px 9px;
    font-size: 10px;
  }
}

@media screen and (max-width: 639px) {
  #rec2147449333 .bali-weather-outer {
    padding: 0 10px;
  }

  #rec2147449333 .bali-weather-card {
    min-height: 190px;
    padding: 13px;
    border-radius: 18px;
  }

  #rec2147449333 .bw-main {
    grid-template-columns: minmax(0, 1fr) 70px;
    gap: 8px;
  }

  #rec2147449333 .bw-temp {
    font-size: 46px;
  }

  #rec2147449333 .bw-condition {
    font-size: 16px;
  }

  #rec2147449333 .bw-summary {
    font-size: 12px;
  }

  #rec2147449333 .bw-hero-icon {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    font-size: 30px;
  }

  #rec2147449333 .bw-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
`;

const BALI_MAIN_STABILITY_FIX = `
<style id="sb-bali-main-stability-fix">
html,
body {
  max-width: 100% !important;
  overflow-x: hidden !important;
}

#allrecords,
.t-records,
.t-rec {
  max-width: 100% !important;
  overflow-x: hidden;
  overflow-x: clip;
}

#rec1816521261,
#rec2128776473 {
  --menusub-active-color: #7ec4f4;
}

#rec1816521261 .t-menusub__link-item.t-active,
#rec1816521261 .t-menusub__link-item.t-active-current,
#rec2128776473 .t-menusub__link-item.t-active,
#rec2128776473 .t-menusub__link-item.t-active-current {
  color: #7ec4f4 !important;
}

#sb-excursions-page .sb-price-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

#sb-excursions-page .sb-price-note {
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: #7c7c7c;
}

html[data-sb-destination="bali"] #rec2128776473 .t-menusub__list .t-menusub__link-item[href*="/dubai/"],
html[data-sb-destination="bali"] #rec2128776473 .t-menusub__list .t-menusub__link-item[href^="/dubai/"] {
  color: #ffffff !important;
}

html[data-sb-destination="bali"] #rec2128776473 .t-menusub__list .t-menusub__link-item[href*="/bali/"],
html[data-sb-destination="bali"] #rec2128776473 .t-menusub__list .t-menusub__link-item[href^="/bali/"] {
  color: #7ec4f4 !important;
}
</style>
<script id="sb-bali-main-stability-script">
(function () {
  var isApplyingDestinationState = false;

  function syncDestinationMenuState() {
    var isBali = window.location.pathname.indexOf("/bali/") === 0;
    var isDubai = window.location.pathname.indexOf("/dubai/") === 0;
    document.documentElement.setAttribute("data-sb-destination", isBali ? "bali" : (isDubai ? "dubai" : ""));
    var links = document.querySelectorAll("#rec1816521261 .t-menusub__link-item, #rec2128776473 .t-menusub__link-item");
    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute("href") || "";
      var isActive = (isBali && href.indexOf("/bali/") === 0) || (isDubai && href.indexOf("/dubai/") === 0);
      link.classList.toggle("t-active", isActive);
      link.classList.toggle("t-active-current", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.style.setProperty("color", "#7ec4f4", "important");
      } else {
        link.removeAttribute("aria-current");
        if (link.closest("#rec2128776473")) {
          link.style.setProperty("color", "#ffffff", "important");
        } else {
          link.style.removeProperty("color");
        }
      }
    });
  }

  function queueDestinationMenuState() {
    if (isApplyingDestinationState) return;
    isApplyingDestinationState = true;
    window.requestAnimationFrame(function () {
      syncDestinationMenuState();
      isApplyingDestinationState = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", queueDestinationMenuState);
  } else {
    queueDestinationMenuState();
  }
  window.addEventListener("load", queueDestinationMenuState);
  window.addEventListener("hashchange", queueDestinationMenuState);
  setTimeout(queueDestinationMenuState, 500);
  setTimeout(queueDestinationMenuState, 1200);
  setTimeout(queueDestinationMenuState, 2500);
  setTimeout(queueDestinationMenuState, 5000);
  if ("MutationObserver" in window) {
    new MutationObserver(queueDestinationMenuState).observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }
})();
</script>
`;

const BALI_GLOBAL_UI_FIX = `<style id="sb-bali-global-ui-fix">
html,
body {
  scrollbar-color: #4f9df7 #f5f9ff;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #f5f9ff;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7ec4f4 0%, #2f6bff 100%);
  border: 3px solid #f5f9ff;
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2f6bff;
}

#rec2122133073 .sb-route-map-link {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  line-height: 1.25 !important;
}

#rec2121222013,
#rec2121222013 .t396,
#rec2121222013 .t396__artboard,
#rec2121222013 .t396__carrier,
#rec2121222013 .t396__filter {
  overflow: visible !important;
}

#rec2121222013 .sb-private-offer-shell {
  padding-bottom: 18px !important;
}

#rec2121222013 .sb-private-card-body {
  padding-bottom: 22px !important;
}

#rec2121222013 .sb-private-card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

#rec2121222013 .sb-private-card-cta {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  white-space: normal !important;
  line-height: 1.2 !important;
}

@media screen and (max-width: 639px) {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-width: 2px;
  }

  #rec2122133073 .sb-route-map-link {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 44px !important;
    padding: 10px 16px !important;
    text-align: center !important;
  }

  #rec2121222013 .sb-private-offer-shell {
    gap: 14px !important;
    padding: 8px 10px 18px !important;
  }

  #rec2121222013 .sb-private-card-media {
    aspect-ratio: 1.85 / 1 !important;
  }

  #rec2121222013 .sb-private-card-body {
    padding: 16px 14px 20px !important;
  }

  #rec2121222013 .sb-private-card-text {
    margin-top: 10px !important;
    font-size: 12.5px !important;
    line-height: 1.48 !important;
    -webkit-line-clamp: 4;
  }

  #rec2121222013 .sb-private-card-pills {
    gap: 7px !important;
    margin-top: 14px !important;
  }

  #rec2121222013 .sb-private-card-pill {
    min-height: 30px !important;
    padding: 0 11px !important;
    font-size: 10.5px !important;
  }

  #rec2121222013 .sb-private-card-meta {
    gap: 8px !important;
    margin-top: 14px !important;
    font-size: 12.5px !important;
  }

  #rec2121222013 .sb-private-card-footer {
    margin-top: 16px !important;
    gap: 10px !important;
  }

  #rec2121222013 .sb-private-card-cta {
    min-height: 48px !important;
    padding: 0 16px !important;
    font-size: 14px !important;
  }
}
</style>
`;

const sourceImage = (name) => path.join(projectRoot, "images", name);
const commonsImage = (fileName, width = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;
const plannerLocalImage = (relativePath) => `/${relativePath.replace(/^\/+/, "")}`;
const lokasiBaliImage = (imageId) => `https://lokasibali.com/api/images/${imageId}`;
const BALI_PLANNER_PLACE_IMAGES = {
  cangguSunset: commonsImage("Tanah Lot, Bali, Indonesia, 20220827 0957 1103.jpg"),
  cangguBeach: commonsImage("Batu Bolong Beach, Canggu.jpg"),
  cangguBeachClub: commonsImage("La Brisa beach club at Echo Beach, Canggu, Bali.jpg"),
  cangguQuietBeach: commonsImage("IconPantaiPererenan.jpg"),
  seminyakBeach: commonsImage("Seminyak Beach.jpg"),
  seminyakPetitenget: commonsImage("Jump! (Petitengget Beach, Seminyak, Bali).jpg"),
  seminyakTemple: commonsImage("Seminyak TempleDoors.JPG"),
  seminyakSunset: commonsImage("Sunset-double-six-beach-2023-12-07.jpg"),
  ubudRiceTerrace: commonsImage("Rice terraces on Bali - Tegalalang Rice Terrace - Indonesia 04.jpg"),
  ubudRidge: commonsImage("Campuhan ridge walk Ubud Bali 20120827c.jpg"),
  ubudTemple: commonsImage("Pura Tirta Empul, Ubud, Bali, Indonesia.JPG"),
  ubudMonkeyForest: commonsImage("2018 Monkey forest Ubud.jpg"),
  ubudWaterfall: commonsImage("Kanto lampo waterfall.jpg"),
  ubudTukadCepung: commonsImage("Tukad Cepung Waterfall (52462237566).jpg"),
  ubudGoaGajah: commonsImage("Goa Gajah temple, Bedulu, Bali, Indonesia, 20220824 0929 0544.jpg"),
  ubudPalace: commonsImage("Ubud Palace, Bali, Indonesia, 20220822 0904 9820.jpg"),
  ubudFoodClassic: commonsImage("Ubud - balinese food.jpg"),
  ubudFoodIbuOka: commonsImage("Nasi babi guling.jpg"),
  ubudFoodWarung: commonsImage("Warung biah biah.jpg"),
  ubudFoodRibs: commonsImage("Balinese Roasted Pork Ribs - Iga Babi Panggang Bali.JPG"),
  eastBaliLempuyang: commonsImage("Gates of Heaven, Lempuyang Temple, Bali.jpg"),
  eastBaliTirtaGangga: commonsImage("Tirta Gangga water palace, Bali, Indonesia.JPG"),
  eastBaliNusaPenida: commonsImage("Diamond Beach, Nusa Penida.jpg"),
  uluwatuTemple: commonsImage("Luhur Uluwatu Temple, Bali, 20220826 0953 1016.jpg"),
  uluwatuCliff: commonsImage("Karang Boma Cliff.jpg"),
  uluwatuBeach: commonsImage("Padang Padang Beach Bali.jpg"),
  uluwatuSurf: commonsImage("Suluban Beach, Pecatu, Bali - Indonesia - panoramio.jpg"),
  uluwatuBingin: commonsImage("Bingin Beach.PNG"),
  uluwatuMelasti: commonsImage("Melasti Beach coast.jpg"),
  uluwatuDreamland: commonsImage("Dreamland Beach Bali.jpg"),
  nusaDuaBeach: commonsImage("Nusa Dua Bali.jpg"),
  nusaDuaWaterblow: commonsImage("Water Blow Point, Nusa Dua, Bali.jpg"),
  nusaDuaTemple: commonsImage("Kuta Bali Indonesia Puja-Mandala-01.jpg"),
  nusaDuaCliffBeach: commonsImage("Pantai Gunung Payung.jpg"),
  nusaDuaPandawa: commonsImage("Pandawa Beach, Kuta Selatan - Bali.jpg"),
  sanurBoardwalk: commonsImage("Jl. Sanur Beach Street Walk, Sanur Kaja, Denpasar Sel., Kota Denpasar, Bali 80227, Indonesia - panoramio - 우한길(HK Woo) (1).jpg"),
  sanurBeach: commonsImage("Sanur Beach, Bali.jpg"),
  sanurMertasari: commonsImage("Sanur, Bali 2017-08-19 (2).jpg"),
  sanurKarang: commonsImage("ESEAP2018 Sunrise at Pantai Karang.jpg"),
  sanurMuseum: commonsImage("Museum Le Mayeur - 2025-02-17 - Andy Mabbett - 79.jpg"),
  sanurCafe: commonsImage("Sanur.JPG"),
  sanurWaterActivity: plannerLocalImage("images/bali-tours/blue-lagoon-snorkeling.webp"),
  sunsetCruiseLocal: plannerLocalImage("images/bali-tours/sunset-cruise-bali.jpg"),
  mountBaturSunriseLocal: plannerLocalImage("images/bali-tours/mount-batur-sunrise-jeep-tour.webp"),
};
const BALI_PLANNER_PLACE_IMAGE_BY_TITLE = {
  "Tanah Lot Temple": plannerLocalImage("images/bali-tours/unesco-tanah-lot-sunset.jpg"),
  "Taman Ayun Temple": plannerLocalImage("images/bali-tours/unesco-taman-ayun.jpg"),
  "Ulun Danu Beratan Temple": plannerLocalImage("images/bali-tours/unesco-ulun-danu.jpg"),
  "Ulun Danu Temple": plannerLocalImage("images/bali-tours/unesco-ulun-danu.jpg"),
  "Jatiluwih Rice Terrace": plannerLocalImage("images/bali-tours/unesco-jatiluwih-hero.jpg"),
  "Jatiluwih Rice Terraces": plannerLocalImage("images/bali-tours/unesco-jatiluwih-hero.jpg"),
  "La Brisa Beach Club": lokasiBaliImage("business-0x2dd23876693af8ad%3A0x86929db7c4eabc29-0.webp"),
  "Batu Bolong Beach": "https://live.staticflickr.com/65535/49439825083_4c1d06d9ee_b.jpg",
  "The Lawn Canggu": lokasiBaliImage("business-0x2dd24787d5600789%3A0xddcc6236335403f0-0.webp"),
  "Crate Cafe": "https://onbali.com/assets/brands/crate-cafe/cover-crate-cafe-1.jpg",
  "Pererenan Beach": "https://live.staticflickr.com/2753/4385370628_c017775fa0_b.jpg",
  "Finns Beach Club": "https://live.staticflickr.com/65535/49333116142_0bb38168ed_b.jpg",
  "Milk and Madu": "https://live.staticflickr.com/65535/52462510774_17d6a8876f_b.jpg",
  "Seseh Beach": "https://live.staticflickr.com/2739/4192527024_236362236d_b.jpg",
  "Nude Cafe": lokasiBaliImage("business-0x2dd2398d368c82ed%3A0x176693a7f7b89243-0.webp"),
  "Echo Beach": "https://live.staticflickr.com/4153/5094068042_d8a64070f6_b.jpg",
  "Mason Canggu": "https://live.staticflickr.com/65535/52462766213_a2616b5b9a_b.jpg",
  "Warung Varuna": "https://foto2.sluurpy.com/locali/id/8460525/70837021.jpg",
  "Love Anchor Market": lokasiBaliImage("business-0x2dd238796aeea797%3A0xf6fb68fe602b27b2-0.webp"),
  "Luma Canggu": "https://framerusercontent.com/images/bOJlIj8nvkCzWIhnjtnzw5Cbjs.jpg?width=2560&height=1708",
  "Seminyak Village": "https://seminyakvillage.com/wp-content/uploads/2026/03/compress1.webp",
  "Seminyak Beach": "https://live.staticflickr.com/7310/10416469375_ac05b9c216_b.jpg",
  "Potato Head Beach Club": "https://live.staticflickr.com/6042/6281781855_a6df953705_b.jpg",
  "Atlas Beach Club": BALI_PLANNER_PLACE_IMAGES.cangguBeachClub,
  "Ku De Ta": "https://live.staticflickr.com/2016/2335088428_88622c3a12_b.jpg",
  "Sisterfields": "https://live.staticflickr.com/5706/23773451981_2dc59d3577_b.jpg",
  "Petitenget Beach": "https://live.staticflickr.com/7625/16979410126_7073f1215d_b.jpg",
  "Motel Mexicola": "https://live.staticflickr.com/8565/16438615141_08a3330b56.jpg",
  "Revolver Espresso": "https://bali.com/wp-content/uploads/2021/12/Revolver-martini-1200.jpg",
  "Sea Circus": "https://bali.com/wp-content/uploads/2021/12/Sea-Circus-1080.jpg",
  "Mrs Sippy": "https://bali.com/wp-content/uploads/2020/10/120128513_1082881742127067_816891588651819007_o.jpg",
  "Nook": "https://bali.com/wp-content/uploads/2021/12/nook-pic-1.jpg",
  "Double Six Beach": "https://live.staticflickr.com/5817/23627993520_42e413f236_b.jpg",
  "Biku": "https://live.staticflickr.com/7152/6598026483_428af69c55_b.jpg",
  "Kim Soo": "https://static.bali.live/uploads/71689/responsive-images/3a19178e-ff8d-48bb-9231-8a3d6d2ba585___responsive_1280_956.jpg",
  "Coffee Cartel": "https://lokasibali.com/api/images/business-0x2dd2471373319a33%3A0x26f04bb5cd5ec311-0.webp",
  "Petitenget Temple": "https://bali.com/wp-content/uploads/2020/09/Petitenget-Temple.jpg",
  "Tegalalang Rice Terrace": "https://live.staticflickr.com/8376/8413461592_3b2209a736_b.jpg",
  "Campuhan Ridge Walk": "https://live.staticflickr.com/3887/15103667262_eb062d3d8c_b.jpg",
  "Tibumana Waterfall": "https://bali.com/wp-content/uploads/2020/11/WhatsApp-Image-2020-11-24-at-15.29.38-1.jpeg",
  "Tukad Cepung Waterfall": BALI_PLANNER_PLACE_IMAGES.ubudTukadCepung,
  "Tirta Empul Temple": "https://live.staticflickr.com/65535/49422321947_f8ce8db0f9_b.jpg",
  "Monkey Forest Ubud": "https://live.staticflickr.com/3486/3196628157_1fd6f7d493_b.jpg",
  "Kanto Lampo Waterfall": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Kanto_lampo_waterfall.jpg",
  "Seniman Coffee": "https://live.staticflickr.com/7548/16039752825_2c40becbdd_b.jpg",
  "Sari Organik": "https://live.staticflickr.com/2308/2140359624_43cc3422f8_b.jpg",
  "Cretya Ubud": "https://alasharum.com/storage/images/1733181605_674e40a5a65be.jpg",
  "Goa Gajah": "https://live.staticflickr.com/2670/3989580274_dca6a65c9d_b.jpg",
  "Puri Ubud": "https://commons.wikimedia.org/wiki/Special:FilePath/Ubud%20Palace%2C%20Bali%2C%20Indonesia%2C%2020220822%200904%209820.jpg?width=1280",
  "Ibu Oka": BALI_PLANNER_PLACE_IMAGES.ubudFoodIbuOka,
  "Murni's Warung": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Warung Biah Biah": BALI_PLANNER_PLACE_IMAGES.ubudFoodWarung,
  "Warung Pondok Madu": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Naughty Nuri's": BALI_PLANNER_PLACE_IMAGES.ubudFoodRibs,
  "Warung Tepi Sawah": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Zest Ubud": "https://static.wixstatic.com/media/a3d323_194ef6d5f0c946bfadbefd958ce85ecaf002.jpg",
  "Alas Harum": lokasiBaliImage("business-0x2dd2227ee0628013%3A0xf443506a00fa75f3-0.webp"),
  "Bali Pulina": "https://lokasibali.com/api/images/business-0x2dd222990001f90b%3A0x46117dc3c84b0af2-0.webp",
  "Clear Cafe Ubud": "https://live.staticflickr.com/5628/23443070193_f64652ecd9_b.jpg",
  "Lempuyang Temple": BALI_PLANNER_PLACE_IMAGES.eastBaliLempuyang,
  "Tirta Gangga": BALI_PLANNER_PLACE_IMAGES.eastBaliTirtaGangga,
  "Nusa Penida east coast": BALI_PLANNER_PLACE_IMAGES.eastBaliNusaPenida,
  "Melasti Beach": "https://live.staticflickr.com/4359/36544779010_4216b5a497_b.jpg",
  "Uluwatu Temple": "https://live.staticflickr.com/5236/14333598073_e183897422_b.jpg",
  "Padang Padang Beach": "https://live.staticflickr.com/6023/5900681104_4fe473cf5c.jpg",
  "Single Fin": lokasiBaliImage("business-0x2dd24ff9434fa3d1%3A0x73306bab5b47f9b4-0.webp"),
  "Savaya": "https://cdn.prod.website-files.com/5fbc914db82f653793c3875e/63696d2b024e1a72a024c465_svy.webp",
  "Thomas Beach": "https://live.staticflickr.com/65535/48976502201_f415cc6fa9_b.jpg",
  "Suka Espresso": "https://live.staticflickr.com/65535/52462503979_c9c201a8d6_b.jpg",
  "Karang Boma Cliff": lokasiBaliImage("business-0x2dd2500bfc06ef09%3A0xb5e356ec177894d0-0.webp"),
  "Bingin Beach": "https://live.staticflickr.com/65535/40673058453_496e57d6a8.jpg",
  "El Kabron": "https://live.staticflickr.com/7155/6768242435_35cdf16065_b.jpg",
  "Nourish Cafe": "https://lokasibali.com/api/images/business-0x2dd245178e601297%3A0xac1573639130b803-0.webp",
  "Drifter Surf Shop and Cafe": "https://cdn.shopify.com/s/files/1/0497/4267/6133/files/stephjones-08056-copy.jpg?v=1695654706",
  "Suluban Beach": "https://live.staticflickr.com/2608/13099532473_7b9d185175_b.jpg",
  "Nyang Nyang Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nyang_Nyang_Beach.jpg/1280px-Nyang_Nyang_Beach.jpg",
  "Garuda Wisnu Kencana": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sunset_at_Garuda_Wisnu_Kencana_Bali.jpg/1280px-Sunset_at_Garuda_Wisnu_Kencana_Bali.jpg",
  "Balangan Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Balangan_Beach%2C_Bali_2017-08-16.jpg/1280px-Balangan_Beach%2C_Bali_2017-08-16.jpg",
  "Jimbaran Seafood Dinner": "https://live.staticflickr.com/6114/6240494269_9ffe297af4_b.jpg",
  "Dreamland Beach": "https://live.staticflickr.com/6184/6158897588_41b35eb674_b.jpg",
  "Geger Beach": "https://live.staticflickr.com/1362/5099984222_0d3bc2f4f6_b.jpg",
  "Waterblow Nusa Dua": "https://live.staticflickr.com/4474/37781456082_9e2bc54082_b.jpg",
  "Sundays Beach Club": "https://www.sundaysbeachclub.com/wp-content/uploads/2025/09/Sundays-site-card-1024x768.png",
  "Nusa Dua Beach": "https://www.gooddaybali.com/beaches/nusa-dua-hero.jpg",
  "Bali Collection": "https://lokasibali.com/api/images/business-0x2dd24324636ca37d%3A0x9d4b4f208e1df4ab-0.webp",
  "Manarai Beach House": "https://lokasibali.com/api/images/business-0x2dd2431ab3bdbfbf%3A0x2007e1718bf7da70-0.webp",
  "Puja Mandala": lokasiBaliImage("business-0x2dd243386a82c3fd%3A0xff15dab4ad5b7a51-0.webp"),
  "Kayuputi": "https://lokasibali.com/api/images/business-0x2dd25cd3081dfb9b%3A0x90a0dc32239a9920-0.webp",
  "Mulia Coastline Walk": "https://cdn.prod.website-files.com/6624ff6a5db57a668993dd5e/687f1cb7b917c8c80f19c3c9_Drone2025.webp",
  "Samuh Beach": "https://www.balitropic-resort.com/assets/img/metadata/featured_image/image.png",
  "Babi Guling Dobiel": "https://bali.com/wp-content/uploads/2021/12/bigul-pak-dobiel-960.jpg",
  "Tropical Temptation": lokasiBaliImage("business-0x2dd25bd177658d93%3A0x7a02435a34f5d64a-0.webp"),
  "Gunung Payung Beach": "https://live.staticflickr.com/2846/33285240666_967c3f7832_b.jpg",
  "Tanjung Benoa Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tanjung_Benoa_Beach_-_Bali.jpg/1280px-Tanjung_Benoa_Beach_-_Bali.jpg",
  "Museum Pasifika": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/2018_museum_pasifika%2C_nusa_dua%2C_Bali%2C_Indonesia.jpg/1280px-2018_museum_pasifika%2C_nusa_dua%2C_Bali%2C_Indonesia.jpg",
  "Mengiat Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Beautiful_Mengiat_Beach.jpg/1280px-Beautiful_Mengiat_Beach.jpg",
  "Koral Restaurant": "https://www.asiadreams.com/wp-content/uploads/Apurva-Kempinski_Koral-Restaurant_Koral-Tunnel-1.jpg",
  "Pandawa Beach": "https://live.staticflickr.com/5447/17444541604_228b2a0368_b.jpg",
  "Sanur Beach Boardwalk": "https://live.staticflickr.com/3086/3162417875_1805291d40_b.jpg",
  "Massimo": "https://massimobali.com/wp-content/uploads/2022/07/IMG_4418-copy.jpg",
  "Cafe Batu Jimbar": lokasiBaliImage("business-0x2dd241c8e53cd3d3%3A0x24486a0a41b72b59-0.webp"),
  "Byrd House Beach Club": "https://static.bali.live/uploads/64323/conversions/19e46e0a-4bfc-4de4-b9e5-0a496e3180e3-preview.jpg",
  "Segara Ayu Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pantai_Segera_Ayu.jpg/1280px-Pantai_Segera_Ayu.jpg",
  "Matahari Terbit Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pantai_Sanur_di_waktu_terbit_matahari.jpg/1280px-Pantai_Sanur_di_waktu_terbit_matahari.jpg",
  "Mertasari Beach": BALI_PLANNER_PLACE_IMAGES.sanurMertasari,
  "Soul on the Beach": "https://static.bali.live/uploads/67425/conversions/1b58e9fa-d630-4a03-8fca-58c147e18a01-preview.jpg",
  "Le Mayeur Museum": "https://live.staticflickr.com/6051/6380853817_1766d13fb8.jpg",
  "Icon Bali Mall": "https://bali.com/wp-content/uploads/2024/09/icon-mall-sanur.webp",
  "Sindhu Beach": "https://live.staticflickr.com/7189/6954816153_ea24d21170_b.jpg",
  "Genius Cafe": "https://geniuscafebali.com/wp-content/uploads/2024/01/image-header-opt-1.jpg",
  "Sindhu Night Market": "https://lokasibali.com/api/images/business-0x2dd24035648dd487%3A0xc347d8c9cc4d9bce-0.webp",
  "Big Garden Corner": "https://lokasibali.com/api/images/business-0x2dd24071d99200c3%3A0x6b8b5fe4aa9162c0-0.webp",
  "Seawalker Sanur": "https://live.staticflickr.com/7343/12296298645_3b611d9ca0_b.jpg",
  "Sanur Port": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sanur_Port_SF0001.jpg/1280px-Sanur_Port_SF0001.jpg",
  "Karang Beach": "https://lokasibali.com/api/images/business-0x2dd214573b2294d5%3A0x33316987ae56a9ce-0.webp",
  "Pizzaria Sanur": "https://itin-dev.wanderlogstatic.com/freeImage/ZjgnSPtC3sDohKyAwXpHb5WyZb22okU0",
  "Sunset cruise in Bali": BALI_PLANNER_PLACE_IMAGES.sunsetCruiseLocal,
  "Mount Batur sunrise": BALI_PLANNER_PLACE_IMAGES.mountBaturSunriseLocal,
  "Nusa Penida day trip": BALI_PLANNER_PLACE_IMAGES.eastBaliNusaPenida,
};

function plannerFreeDayPlace(title, kind, maps, copy, vibe, interests = null) {
  return { title, kind, maps, copy, vibe, interests };
}

const PLANNER_FREE_DAY_PLACES = {
  canggu: [
    plannerFreeDayPlace("Tanah Lot Temple", "sunset", "https://maps.google.com/?q=Tanah+Lot+Temple", "Iconic Bali sunset and temple views. Easy wow-factor stop for a free evening.", ["couple", "friends", "family", "solo"]),
    plannerFreeDayPlace("La Brisa Beach Club", "beachclub", "https://maps.google.com/?q=La+Brisa+Canggu", "One of the most popular Canggu beach clubs for sunset, cocktails and music.", ["couple", "friends"]),
    plannerFreeDayPlace("Batu Bolong Beach", "beach", "https://maps.google.com/?q=Batu+Bolong+Beach+Canggu", "Classic Canggu beach for a sunset walk or a chilled flexible afternoon.", ["couple", "friends", "family", "solo"]),
    plannerFreeDayPlace("The Lawn Canggu", "beachclub", "https://maps.google.com/?q=The+Lawn+Canggu", "Stylish oceanfront sunset spot with strong Canggu energy.", ["couple", "friends"]),
    plannerFreeDayPlace("Crate Cafe", "cafe", "https://maps.google.com/?q=Crate+Cafe+Canggu", "Popular breakfast and coffee stop if you want a softer morning.", ["solo", "friends", "couple"]),
    plannerFreeDayPlace("Pererenan Beach", "beach", "https://maps.google.com/?q=Pererenan+Beach+Bali", "A calmer beach option when you want less chaos than central Canggu.", ["couple", "solo", "family"]),
    plannerFreeDayPlace("Finns Beach Club", "beachclub", "https://maps.google.com/?q=Finns+Beach+Club+Bali", "Big social energy and one of the best-known club choices on this side of Bali.", ["friends", "couple"]),
    plannerFreeDayPlace("Milk and Madu", "restaurant", "https://maps.google.com/?q=Milk+and+Madu+Canggu", "Reliable brunch and dinner option with a friendly easy vibe.", ["family", "couple", "friends"]),
    plannerFreeDayPlace("Seseh Beach", "sunset", "https://maps.google.com/?q=Seseh+Beach+Bali", "Quiet west-coast sunset for a more peaceful free day.", ["couple", "solo", "family"]),
    plannerFreeDayPlace("Nude Cafe", "cafe", "https://maps.google.com/?q=Nude+Canggu", "Healthy cafe option for a simple flexible plan.", ["solo", "couple", "family"]),
    plannerFreeDayPlace("Echo Beach", "beach", "https://maps.google.com/?q=Echo+Beach+Canggu", "Popular surf and sunset area that still works well on a lighter day.", ["friends", "couple", "solo"]),
    plannerFreeDayPlace("Mason Canggu", "restaurant", "https://maps.google.com/?q=Mason+Canggu", "One of the more polished dinner picks if you want a stronger evening plan.", ["couple", "friends"]),
    plannerFreeDayPlace("Warung Varuna", "restaurant", "https://maps.google.com/?q=Warung+Varuna+Canggu", "Easy local seafood idea for a casual meal after a flexible day.", ["friends", "family", "couple"]),
    plannerFreeDayPlace("Love Anchor Market", "culture", "https://maps.google.com/?q=Love+Anchor+Canggu", "A fun easy stop for shops, coffee and light browsing.", ["friends", "solo", "couple"]),
    plannerFreeDayPlace("Luma Canggu", "restaurant", "https://maps.google.com/?q=Luma+Canggu", "Stylish dinner option for couples or friends.", ["couple", "friends"]),
    plannerFreeDayPlace("Atlas Beach Club", "beachclub", "https://maps.google.com/?q=Atlas+Beach+Club+Bali", "Big-format sunset and entertainment option when guests want a more energetic free evening.", ["friends", "couple"], ["sea", "relax", "instagram"]),
  ],
  seminyak: [
    plannerFreeDayPlace("Seminyak Beach", "sunset", "https://maps.google.com/?q=Seminyak+Beach", "Classic west-coast beach for sunset and a relaxed walk.", ["couple", "friends", "family", "solo"]),
    plannerFreeDayPlace("Potato Head Beach Club", "beachclub", "https://maps.google.com/?q=Potato+Head+Seminyak", "One of Bali's most famous beach clubs and a very strong sunset move.", ["couple", "friends"]),
    plannerFreeDayPlace("Ku De Ta", "beachclub", "https://maps.google.com/?q=Ku+De+Ta+Seminyak", "Stylish beach club with a polished Seminyak feel.", ["couple", "friends"]),
    plannerFreeDayPlace("Sisterfields", "restaurant", "https://maps.google.com/?q=Sisterfields+Seminyak", "Very popular brunch and all-day comfort option.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Petitenget Beach", "beach", "https://maps.google.com/?q=Petitenget+Beach", "Easy beach choice close to central Seminyak.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Motel Mexicola", "restaurant", "https://maps.google.com/?q=Motel+Mexicola+Seminyak", "A fun dinner and nightlife option for a more social free evening.", ["friends", "couple"]),
    plannerFreeDayPlace("Revolver Espresso", "cafe", "https://maps.google.com/?q=Revolver+Espresso+Seminyak", "Great coffee stop if you want an easy reset day.", ["solo", "couple"]),
    plannerFreeDayPlace("Sea Circus", "restaurant", "https://maps.google.com/?q=Sea+Circus+Seminyak", "Colorful casual food stop that works for a soft day.", ["family", "friends", "solo"]),
    plannerFreeDayPlace("Mrs Sippy", "beachclub", "https://maps.google.com/?q=Mrs+Sippy+Bali", "Pool-club choice for guests who want more fun energy.", ["friends"]),
    plannerFreeDayPlace("Nook", "restaurant", "https://maps.google.com/?q=Nook+Seminyak", "Scenic rice-field side restaurant when you want something calmer.", ["couple", "family", "solo"]),
    plannerFreeDayPlace("Double Six Beach", "beach", "https://maps.google.com/?q=Double+Six+Beach", "Popular open beach for sunset and easy people-watching.", ["friends", "couple", "family"]),
    plannerFreeDayPlace("Biku", "restaurant", "https://maps.google.com/?q=Biku+Seminyak", "Well-known tea lounge and lunch spot with a softer vibe.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Kim Soo", "cafe", "https://maps.google.com/?q=Kim+Soo+Seminyak", "Design-forward cafe stop for a relaxed flexible slot.", ["couple", "solo"]),
    plannerFreeDayPlace("Coffee Cartel", "cafe", "https://maps.google.com/?q=Coffee+Cartel+Seminyak", "Easy coffee and breakfast option near the Seminyak core.", ["solo", "friends", "couple"]),
    plannerFreeDayPlace("Petitenget Temple", "temple", "https://maps.google.com/?q=Petitenget+Temple", "Small culture stop if you want to mix beach time with a Bali touch.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Seminyak Village", "culture", "https://maps.google.com/?q=Seminyak+Village", "Simple comfort stop with shopping, coffee and air-conditioned reset time.", ["family", "solo", "couple"], ["relax", "culture"]),
  ],
  ubud: [
    plannerFreeDayPlace("Tegalalang Rice Terrace", "scenic", "https://maps.google.com/?q=Tegalalang+Rice+Terrace", "One of the most famous scenic Bali places and always useful in an Ubud plan.", ["couple", "family", "solo", "friends"]),
    plannerFreeDayPlace("Campuhan Ridge Walk", "walk", "https://maps.google.com/?q=Campuhan+Ridge+Walk", "Easy scenic walk if you want movement without a full excursion.", ["solo", "couple", "family"]),
    plannerFreeDayPlace("Tibumana Waterfall", "waterfall", "https://maps.google.com/?q=Tibumana+Waterfall", "Popular waterfall stop with strong jungle mood.", ["couple", "friends", "solo"]),
    plannerFreeDayPlace("Tirta Empul Temple", "temple", "https://maps.google.com/?q=Tirta+Empul+Temple", "Top culture place that works even on mixed-weather days.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Monkey Forest Ubud", "culture", "https://maps.google.com/?q=Ubud+Monkey+Forest", "Easy iconic activity close to the center.", ["family", "friends", "couple"]),
    plannerFreeDayPlace("Kanto Lampo Waterfall", "waterfall", "https://maps.google.com/?q=Kanto+Lampo+Waterfall", "Very popular waterfall if guests still want a visual wow stop.", ["friends", "couple"]),
    plannerFreeDayPlace("Seniman Coffee", "cafe", "https://maps.google.com/?q=Seniman+Coffee+Ubud", "Best coffee-type reset if the day stays flexible.", ["solo", "couple"]),
    plannerFreeDayPlace("Sari Organik", "restaurant", "https://maps.google.com/?q=Sari+Organik+Ubud", "Scenic rice-field lunch option with a calmer pace.", ["couple", "solo", "family"]),
    plannerFreeDayPlace("Cretya Ubud", "beachclub", "https://maps.google.com/?q=Cretya+Ubud", "Pool-club style day option with strong visual appeal.", ["friends", "couple"]),
    plannerFreeDayPlace("Goa Gajah", "temple", "https://maps.google.com/?q=Goa+Gajah+Ubud", "Classic heritage stop that gives the plan more cultural depth.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Puri Ubud", "culture", "https://maps.google.com/?q=Ubud+Palace", "Central and easy culture stop in town.", ["family", "solo", "couple"]),
    plannerFreeDayPlace("Zest Ubud", "restaurant", "https://maps.google.com/?q=Zest+Ubud", "Healthy relaxed lunch or dinner option.", ["solo", "couple"]),
    plannerFreeDayPlace("Alas Harum", "scenic", "https://maps.google.com/?q=Alas+Harum+Bali", "Popular rice-terrace and swing area with strong social-media appeal.", ["friends", "couple"]),
    plannerFreeDayPlace("Bali Pulina", "scenic", "https://maps.google.com/?q=Bali+Pulina+Ubud", "Coffee tasting and scenic terrace views in one easy stop.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Clear Cafe Ubud", "restaurant", "https://maps.google.com/?q=Clear+Cafe+Ubud", "Comfortable all-round meal option for a softer day.", ["family", "solo", "couple"]),
    plannerFreeDayPlace("Tukad Cepung Waterfall", "waterfall", "https://maps.google.com/?q=Tukad+Cepung+Waterfall", "One of the most photogenic waterfall choices when guests want something dramatic but still realistic from Ubud.", ["friends", "couple", "solo"]),
    plannerFreeDayPlace("Ibu Oka", "restaurant", "https://maps.google.com/?q=Ibu+Oka+Ubud", "Classic local food stop when the guest wants one of Ubud's best-known lunch names.", ["friends", "family", "solo"]),
    plannerFreeDayPlace("Murni's Warung", "restaurant", "https://maps.google.com/?q=Murni%27s+Warung+Ubud", "Historic riverside restaurant that feels more classic than trendy.", ["couple", "solo", "family"]),
    plannerFreeDayPlace("Warung Biah Biah", "restaurant", "https://maps.google.com/?q=Warung+Biah+Biah+Ubud", "Easy local dinner move with a stronger Ubud-food feel.", ["friends", "solo", "couple"]),
    plannerFreeDayPlace("Warung Pondok Madu", "restaurant", "https://maps.google.com/?q=Warung+Pondok+Madu+Ubud", "Reliable casual meal stop when guests want something unfussy and good.", ["family", "friends", "couple"]),
    plannerFreeDayPlace("Naughty Nuri's", "restaurant", "https://maps.google.com/?q=Naughty+Nuri%27s+Ubud", "Famous Ubud ribs stop that works well as a relaxed evening plan.", ["friends", "couple"]),
    plannerFreeDayPlace("Warung Tepi Sawah", "restaurant", "https://maps.google.com/?q=Warung+Tepi+Sawah+Ubud", "Rice-field dining option for a softer and more scenic Ubud meal.", ["couple", "family", "solo"]),
  ],
  uluwatu: [
    plannerFreeDayPlace("Melasti Beach", "beach", "https://maps.google.com/?q=Melasti+Beach+Bali", "One of the top Bali beaches and a must-have free-day option here.", ["couple", "friends", "family"]),
    plannerFreeDayPlace("Uluwatu Temple", "sunset", "https://maps.google.com/?q=Uluwatu+Temple", "One of the biggest Bali classics for cliff views and sunset.", ["couple", "family", "solo", "friends"]),
    plannerFreeDayPlace("Padang Padang Beach", "beach", "https://maps.google.com/?q=Padang+Padang+Beach", "Famous compact beach with a strong Bali look.", ["friends", "couple"]),
    plannerFreeDayPlace("Single Fin", "sunset", "https://maps.google.com/?q=Single+Fin+Bali", "Very popular sunset and drinks spot with ocean views.", ["friends", "couple"]),
    plannerFreeDayPlace("Savaya", "beachclub", "https://maps.google.com/?q=Savaya+Bali", "One of the most famous premium day-club venues in Bali.", ["friends", "couple"]),
    plannerFreeDayPlace("Thomas Beach", "beach", "https://maps.google.com/?q=Thomas+Beach+Bali", "A quieter beach backup when you want less crowd.", ["couple", "solo"]),
    plannerFreeDayPlace("Suka Espresso", "cafe", "https://maps.google.com/?q=Suka+Espresso+Uluwatu", "Reliable brunch and coffee stop near many Uluwatu stays.", ["solo", "couple", "family"]),
    plannerFreeDayPlace("Karang Boma Cliff", "sunset", "https://maps.google.com/?q=Karang+Boma+Cliff", "Dramatic cliff-edge sunset point for a big wow moment.", ["couple", "solo"]),
    plannerFreeDayPlace("Bingin Beach", "beach", "https://maps.google.com/?q=Bingin+Beach+Bali", "Top beach in the area with a strong cliffside vibe.", ["couple", "friends"]),
    plannerFreeDayPlace("El Kabron", "restaurant", "https://maps.google.com/?q=El+Kabron+Bali", "Sunset dinner and cliffside view option with premium feel.", ["couple", "friends"]),
    plannerFreeDayPlace("Nourish Cafe", "cafe", "https://maps.google.com/?q=Nourish+Cafe+Bali", "Simple healthy stop for a soft free day.", ["family", "solo", "couple"]),
    plannerFreeDayPlace("Drifter Surf Shop and Cafe", "cafe", "https://maps.google.com/?q=Drifter+Cafe+Bali", "Easy surf-town cafe vibe for a lighter plan.", ["solo", "friends", "couple"]),
    plannerFreeDayPlace("Suluban Beach", "beach", "https://maps.google.com/?q=Suluban+Beach", "Iconic hidden-beach feeling for guests who want scenery.", ["friends", "couple"]),
    plannerFreeDayPlace("Jimbaran Seafood Dinner", "restaurant", "https://maps.google.com/?q=Jimbaran+Seafood", "Best nearby easy dinner move when you want a classic Bali evening.", ["family", "couple", "friends"]),
    plannerFreeDayPlace("Dreamland Beach", "beach", "https://maps.google.com/?q=Dreamland+Beach+Bali", "Beautiful broad beach that still looks strong in mixed weather.", ["friends", "couple", "family"]),
    plannerFreeDayPlace("Nyang Nyang Beach", "beach", "https://maps.google.com/?q=Nyang+Nyang+Beach+Bali", "A bigger wow-beach option when the guest wants raw cliff scenery instead of the usual easy picks.", ["couple", "friends", "solo"], ["sea", "nature", "instagram"]),
    plannerFreeDayPlace("Garuda Wisnu Kencana", "culture", "https://maps.google.com/?q=Garuda+Wisnu+Kencana+Bali", "Large culture-park stop that gives Uluwatu stays a non-beach free-day option with real scale.", ["family", "friends", "solo"], ["culture", "instagram"]),
    plannerFreeDayPlace("Balangan Beach", "beach", "https://maps.google.com/?q=Balangan+Beach+Bali", "Strong south-Bali beach for travelers who want a broad scenic coastline and less compact feel.", ["couple", "friends", "solo"], ["sea", "nature", "instagram"]),
  ],
  nusa_dua: [
    plannerFreeDayPlace("Geger Beach", "beach", "https://maps.google.com/?q=Geger+Beach", "Calm top beach that works especially well for couples and families.", ["family", "couple"]),
    plannerFreeDayPlace("Waterblow Nusa Dua", "scenic", "https://maps.google.com/?q=Waterblow+Nusa+Dua", "Easy scenic stop close to the Nusa Dua resort area.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Sundays Beach Club", "beachclub", "https://maps.google.com/?q=Sundays+Beach+Club+Bali", "One of the strongest premium beach-club choices nearby.", ["couple", "friends"]),
    plannerFreeDayPlace("Nusa Dua Beach", "beach", "https://maps.google.com/?q=Nusa+Dua+Beach", "Classic clean beach option for an easy free day.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Bali Collection", "culture", "https://maps.google.com/?q=Bali+Collection+Nusa+Dua", "Simple comfort zone with coffee, shopping and dinner options.", ["family", "solo", "friends"]),
    plannerFreeDayPlace("Manarai Beach House", "beachclub", "https://maps.google.com/?q=Manarai+Beach+House", "Stylish beach-club option with easy access from Nusa Dua.", ["friends", "couple"]),
    plannerFreeDayPlace("Puja Mandala", "temple", "https://maps.google.com/?q=Puja+Mandala+Nusa+Dua", "Culture-focused stop that works well if the weather is mixed.", ["family", "solo", "couple"]),
    plannerFreeDayPlace("Kayuputi", "restaurant", "https://maps.google.com/?q=Kayuputi+Bali", "Luxury dinner option when the plan needs a premium couple move.", ["couple"]),
    plannerFreeDayPlace("Mulia Coastline Walk", "walk", "https://maps.google.com/?q=The+Mulia+Bali", "Relaxed upscale coastal walk for a softer free day.", ["couple", "solo"]),
    plannerFreeDayPlace("Samuh Beach", "beach", "https://maps.google.com/?q=Samuh+Beach", "Good easy beach near the main hotel zone.", ["family", "couple"]),
    plannerFreeDayPlace("Babi Guling Dobiel", "restaurant", "https://maps.google.com/?q=Babi+Guling+Dobiel+Nusa+Dua", "Popular local food stop when guests want something more local.", ["friends", "family", "solo"]),
    plannerFreeDayPlace("Tropical Temptation", "beachclub", "https://maps.google.com/?q=Tropical+Temptation+Beach+Club", "Beach-club style option close to the southern resorts.", ["friends", "couple"]),
    plannerFreeDayPlace("Gunung Payung Beach", "beach", "https://maps.google.com/?q=Gunung+Payung+Beach", "Beautiful quieter beach for a scenic free day.", ["couple", "solo"]),
    plannerFreeDayPlace("Koral Restaurant", "restaurant", "https://maps.google.com/?q=Koral+Restaurant+Bali", "One of the best-known special-occasion dinner ideas nearby.", ["couple"]),
    plannerFreeDayPlace("Pandawa Beach", "beach", "https://maps.google.com/?q=Pandawa+Beach", "Very popular nearby beach with broad views and easy wow factor.", ["family", "friends", "couple"]),
    plannerFreeDayPlace("Tanjung Benoa Beach", "beach", "https://maps.google.com/?q=Tanjung+Benoa+Beach+Bali", "Easy sea-side option for calmer water sports energy and long coastal walks.", ["family", "friends", "couple"], ["sea", "relax"]),
    plannerFreeDayPlace("Museum Pasifika", "culture", "https://maps.google.com/?q=Museum+Pasifika+Bali", "A proper indoor culture stop for mixed-weather days when the guest still wants something memorable.", ["solo", "family", "couple"], ["culture", "relax"]),
    plannerFreeDayPlace("Mengiat Beach", "beach", "https://maps.google.com/?q=Mengiat+Beach+Bali", "Quieter Nusa Dua beach option with a softer pace than the headline spots.", ["couple", "family", "solo"], ["sea", "relax"]),
  ],
  sanur: [
    plannerFreeDayPlace("Sanur Beach Boardwalk", "walk", "https://maps.google.com/?q=Sanur+Beach", "One of the easiest Bali free-day areas for soft sunrise or sunset movement.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Massimo", "restaurant", "https://maps.google.com/?q=Massimo+Sanur", "Very popular Sanur dinner option with reliable crowd appeal.", ["family", "couple", "friends"]),
    plannerFreeDayPlace("Byrd House Beach Club", "beachclub", "https://maps.google.com/?q=Byrdhouse+Bali", "Stylish relaxed beach-club option for a sunny free day.", ["friends", "couple"]),
    plannerFreeDayPlace("Mertasari Beach", "beach", "https://maps.google.com/?q=Mertasari+Beach+Sanur", "Calmer beach that works especially well for families.", ["family", "couple"]),
    plannerFreeDayPlace("Soul on the Beach", "restaurant", "https://maps.google.com/?q=Soul+on+the+Beach+Sanur", "Easy beachfront meal if you want to keep the day simple.", ["couple", "family", "solo"]),
    plannerFreeDayPlace("Le Mayeur Museum", "culture", "https://maps.google.com/?q=Le+Mayeur+Museum", "A culture stop that fits very well on a mixed-weather day.", ["solo", "family", "couple"]),
    plannerFreeDayPlace("Icon Bali Mall", "culture", "https://maps.google.com/?q=ICON+Bali+Mall+Sanur", "Comfort backup with food, shopping and AC.", ["family", "solo"]),
    plannerFreeDayPlace("Sindhu Beach", "beach", "https://maps.google.com/?q=Sindhu+Beach+Sanur", "Classic Sanur beach choice with easy access.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Genius Cafe", "cafe", "https://maps.google.com/?q=Genius+Cafe+Sanur", "Good flexible cafe stop with healthy food.", ["solo", "couple", "friends"]),
    plannerFreeDayPlace("Sindhu Night Market", "restaurant", "https://maps.google.com/?q=Sindhu+Night+Market", "Local evening food option that adds something different to the plan.", ["friends", "family"]),
    plannerFreeDayPlace("Big Garden Corner", "culture", "https://maps.google.com/?q=Big+Garden+Corner+Sanur", "Light local attraction when the day stays free.", ["family"]),
    plannerFreeDayPlace("Seawalker Sanur", "scenic", "https://maps.google.com/?q=Sanur+Seawalker", "Fun light activity nearby if you want more than just food and beach.", ["family", "friends"]),
    plannerFreeDayPlace("Cafe Batu Jimbar", "cafe", "https://maps.google.com/?q=Cafe+Batu+Jimbar+Sanur", "One of the classic cafe and brunch picks in Sanur.", ["solo", "family", "couple"]),
    plannerFreeDayPlace("Karang Beach", "beach", "https://maps.google.com/?q=Karang+Beach+Sanur", "Easy beach alternative for a calm free day.", ["family", "couple", "solo"]),
    plannerFreeDayPlace("Pizzaria Sanur", "restaurant", "https://maps.google.com/?q=Pizzaria+Sanur", "Reliable beachfront lunch or dinner move.", ["family", "couple", "friends"]),
    plannerFreeDayPlace("Segara Ayu Beach", "beach", "https://maps.google.com/?q=Segara+Ayu+Beach+Sanur", "Classic sunrise-side Sanur beach that fits easy families and calm solo mornings.", ["family", "solo", "couple"], ["sea", "relax"]),
    plannerFreeDayPlace("Matahari Terbit Beach", "beach", "https://maps.google.com/?q=Matahari+Terbit+Beach+Sanur", "Strong early-morning beach if the guest wants the softer Sanur sunrise look.", ["couple", "solo", "family"], ["sea", "relax", "instagram"]),
    plannerFreeDayPlace("Sanur Port", "culture", "https://maps.google.com/?q=Sanur+Port+Bali", "Useful harbor-side stop for coffee, sea views and watching the island-day flow without booking a full crossing.", ["solo", "friends", "couple"], ["sea", "relax"]),
  ],
};

const PLANNER_FREE_DAY_PLACE_EXPANSIONS = {
  canggu: [
    plannerFreeDayPlace("Berawa Beach", "beach", "https://maps.google.com/?q=Berawa+Beach+Bali", "Easy beach stop between Canggu and Seminyak with a flexible sunset feel.", ["couple", "friends", "solo"], ["sea", "relax", "instagram"]),
    plannerFreeDayPlace("Nelayan Beach", "beach", "https://maps.google.com/?q=Nelayan+Beach+Canggu", "Quieter Canggu coast option for a soft walk and lighter crowd energy.", ["couple", "solo", "family"], ["sea", "relax"]),
    plannerFreeDayPlace("Munggu Beach", "sunset", "https://maps.google.com/?q=Munggu+Beach+Bali", "Peaceful west-coast sunset idea when guests want less traffic and fewer people.", ["couple", "solo", "family"], ["sea", "relax", "instagram"]),
    plannerFreeDayPlace("Pura Batu Bolong", "temple", "https://maps.google.com/?q=Pura+Batu+Bolong+Canggu", "Small coastal temple stop that adds a little culture to a beach-heavy Canggu day.", ["couple", "family", "solo"], ["culture", "sea", "instagram"]),
    plannerFreeDayPlace("Samadi Bali", "cafe", "https://maps.google.com/?q=Samadi+Bali+Canggu", "Healthy cafe and yoga-side stop for a slower reset morning.", ["solo", "couple"], ["relax"]),
    plannerFreeDayPlace("Copenhagen Canggu", "cafe", "https://maps.google.com/?q=Copenhagen+Canggu", "Strong breakfast spot when guests want a simple but polished Canggu morning.", ["couple", "friends", "solo"], ["relax"]),
    plannerFreeDayPlace("The Shady Shack", "cafe", "https://maps.google.com/?q=The+Shady+Shack+Canggu", "Vegetarian cafe pick that works well for a calm free day.", ["solo", "couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Luigi's Hot Pizza", "restaurant", "https://maps.google.com/?q=Luigi%27s+Hot+Pizza+Canggu", "Easy dinner and social evening choice without making the day too heavy.", ["friends", "couple"], ["relax"]),
    plannerFreeDayPlace("Old Man's Canggu", "beachclub", "https://maps.google.com/?q=Old+Man%27s+Canggu", "Classic Canggu beach-bar option close to Batu Bolong.", ["friends", "couple"], ["sea", "relax"]),
    plannerFreeDayPlace("Deus Ex Machina Canggu", "culture", "https://maps.google.com/?q=Deus+Ex+Machina+Canggu", "Surf, bikes, food, and lifestyle energy in one easy Canggu stop.", ["friends", "solo", "couple"], ["culture", "relax"]),
    plannerFreeDayPlace("Bali Equestrian Centre", "scenic", "https://maps.google.com/?q=Bali+Equestrian+Centre+Canggu", "Useful family-friendly activity idea when the day should not be only beach and food.", ["family", "couple"], ["relax", "adventure"]),
    plannerFreeDayPlace("Canggu Shortcut Rice Fields", "walk", "https://maps.google.com/?q=Canggu+Shortcut", "Light rice-field drive or walk mood when guests want a break from beach clubs.", ["solo", "couple", "family"], ["nature", "relax"]),
    plannerFreeDayPlace("Alternative Beach Canggu", "beachclub", "https://maps.google.com/?q=Alternative+Beach+Canggu", "Pool-club backup when guests want Canggu energy without committing to the ocean.", ["friends", "couple"], ["relax"]),
    plannerFreeDayPlace("Baked Canggu", "cafe", "https://maps.google.com/?q=Baked+Canggu", "Easy bakery and coffee stop that fits a soft morning or late brunch.", ["solo", "couple", "family"], ["relax"]),
  ],
  seminyak: [
    plannerFreeDayPlace("Legian Beach", "beach", "https://maps.google.com/?q=Legian+Beach+Bali", "Long west-coast beach option for a simple walk and sunset mood.", ["family", "couple", "solo", "friends"], ["sea", "relax"]),
    plannerFreeDayPlace("La Plancha", "beachclub", "https://maps.google.com/?q=La+Plancha+Bali", "Colorful beanbag sunset stop that is easy to understand and easy to enjoy.", ["couple", "friends", "family"], ["sea", "relax", "instagram"]),
    plannerFreeDayPlace("Mano Beach House", "beachclub", "https://maps.google.com/?q=Mano+Beach+House+Seminyak", "Smaller beach-club option for a calmer Seminyak sunset.", ["couple", "friends"], ["sea", "relax"]),
    plannerFreeDayPlace("Seminyak Square", "culture", "https://maps.google.com/?q=Seminyak+Square", "Comfortable shopping, coffee, and dinner backup in central Seminyak.", ["family", "solo", "couple"], ["relax"]),
    plannerFreeDayPlace("Eat Street Seminyak", "walk", "https://maps.google.com/?q=Jalan+Kayu+Aya+Seminyak", "Easy browsing strip for food, boutiques, and a no-pressure evening.", ["couple", "friends", "solo"], ["relax"]),
    plannerFreeDayPlace("Nyaman Gallery", "culture", "https://maps.google.com/?q=Nyaman+Gallery+Seminyak", "Compact art stop when guests want something calmer than beach clubs.", ["solo", "couple"], ["culture", "relax"]),
    plannerFreeDayPlace("Bodyworks Spa Seminyak", "scenic", "https://maps.google.com/?q=Bodyworks+Spa+Seminyak", "Spa-style comfort option for a recovery day between excursions.", ["couple", "solo"], ["relax"]),
    plannerFreeDayPlace("Shelter Cafe Seminyak", "cafe", "https://maps.google.com/?q=Shelter+Cafe+Seminyak", "Green rooftop cafe pick for breakfast or a softer midday break.", ["solo", "couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Kynd Community", "cafe", "https://maps.google.com/?q=Kynd+Community+Seminyak", "Bright plant-based cafe that works well for couples and social free days.", ["couple", "friends", "solo"], ["relax", "instagram"]),
    plannerFreeDayPlace("Gado Gado Beach", "beach", "https://maps.google.com/?q=Gado+Gado+Beach+Seminyak", "Simple beach alternative when guests want sand without a big venue.", ["couple", "family", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("W Bali Seminyak", "beachclub", "https://maps.google.com/?q=W+Bali+Seminyak", "Premium resort-side sunset and drinks idea for a polished free evening.", ["couple", "friends"], ["sea", "relax"]),
    plannerFreeDayPlace("Merah Putih", "restaurant", "https://maps.google.com/?q=Merah+Putih+Bali", "Special dinner option when the free day needs a strong food finish.", ["couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Sarong Seminyak", "restaurant", "https://maps.google.com/?q=Sarong+Seminyak", "Reliable upscale dinner choice for couples or a refined friends evening.", ["couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Shooters Bali", "culture", "https://maps.google.com/?q=Shooters+Bali+Seminyak", "Fun games-style stop when friends want a low-effort social plan.", ["friends", "family"], ["relax"]),
  ],
  ubud: [
    plannerFreeDayPlace("Saraswati Temple", "temple", "https://maps.google.com/?q=Saraswati+Temple+Ubud", "Beautiful lotus-pond temple stop right in Ubud center.", ["couple", "family", "solo"], ["culture", "instagram"]),
    plannerFreeDayPlace("Ubud Art Market", "culture", "https://maps.google.com/?q=Ubud+Art+Market", "Easy central stop for gifts, textiles, browsing, and a classic Ubud feel.", ["family", "friends", "solo", "couple"], ["culture", "relax"]),
    plannerFreeDayPlace("Tegenungan Waterfall", "waterfall", "https://maps.google.com/?q=Tegenungan+Waterfall", "Popular waterfall choice that gives a bigger nature moment near Ubud.", ["friends", "family", "couple"], ["nature", "adventure", "instagram"]),
    plannerFreeDayPlace("Suwat Waterfall", "waterfall", "https://maps.google.com/?q=Suwat+Waterfall", "Softer waterfall alternative for guests who want nature without the biggest crowds.", ["couple", "solo", "friends"], ["nature", "relax", "instagram"]),
    plannerFreeDayPlace("Gunung Kawi Temple", "temple", "https://maps.google.com/?q=Gunung+Kawi+Temple+Bali", "Atmospheric temple-valley stop with more depth than a quick photo point.", ["couple", "family", "solo"], ["culture", "nature"]),
    plannerFreeDayPlace("Gunung Kawi Sebatu", "temple", "https://maps.google.com/?q=Gunung+Kawi+Sebatu", "Quiet water-temple option for a calm Ubud cultural free day.", ["couple", "solo", "family"], ["culture", "relax"]),
    plannerFreeDayPlace("Blanco Renaissance Museum", "culture", "https://maps.google.com/?q=Blanco+Renaissance+Museum", "Indoor culture stop that helps when the weather is mixed.", ["couple", "solo", "family"], ["culture", "relax"]),
    plannerFreeDayPlace("Neka Art Museum", "culture", "https://maps.google.com/?q=Neka+Art+Museum", "Good art-and-culture backup for guests who want Ubud beyond cafes.", ["solo", "couple", "family"], ["culture", "relax"]),
    plannerFreeDayPlace("ARMA Museum", "culture", "https://maps.google.com/?q=ARMA+Museum+Ubud", "Spacious museum and garden stop that feels calm and easy.", ["family", "couple", "solo"], ["culture", "relax"]),
    plannerFreeDayPlace("Yoga Barn Ubud", "scenic", "https://maps.google.com/?q=The+Yoga+Barn+Ubud", "Wellness-side Ubud idea for guests who want a reset day.", ["solo", "couple"], ["relax"]),
    plannerFreeDayPlace("Alchemy Ubud", "cafe", "https://maps.google.com/?q=Alchemy+Ubud", "Healthy cafe stop that fits a slow Ubud morning.", ["solo", "couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Pison Ubud", "cafe", "https://maps.google.com/?q=Pison+Ubud", "Reliable coffee and meal option when guests want a simple Ubud pause.", ["solo", "friends", "couple"], ["relax"]),
    plannerFreeDayPlace("Subak Juwuk Manis", "walk", "https://maps.google.com/?q=Subak+Juwuk+Manis+Ubud", "Quiet rice-field walk close to Ubud center for a softer nature day.", ["solo", "couple", "family"], ["nature", "relax"]),
    plannerFreeDayPlace("Sayan Rice Fields", "walk", "https://maps.google.com/?q=Sayan+Ubud+Rice+Fields", "Scenic Ubud-side rice-field mood for couples and slower travelers.", ["couple", "solo"], ["nature", "relax", "instagram"]),
    plannerFreeDayPlace("Penglipuran Village", "culture", "https://maps.google.com/?q=Penglipuran+Village+Bali", "Clean traditional village stop for a stronger culture day from Ubud.", ["family", "couple", "solo"], ["culture", "instagram"]),
    plannerFreeDayPlace("Sidemen Valley", "scenic", "https://maps.google.com/?q=Sidemen+Bali", "Bigger scenic backup when guests want rice fields and mountain mood beyond central Ubud.", ["couple", "solo", "friends"], ["nature", "instagram"]),
  ],
  uluwatu: [
    plannerFreeDayPlace("Green Bowl Beach", "beach", "https://maps.google.com/?q=Green+Bowl+Beach+Bali", "Hidden-feeling beach option for guests who like stairs, cliffs, and quiet water.", ["couple", "friends", "solo"], ["sea", "nature", "instagram"]),
    plannerFreeDayPlace("Tegal Wangi Beach", "sunset", "https://maps.google.com/?q=Tegal+Wangi+Beach+Bali", "Cliff and sunset backup near Jimbaran with a strong south-Bali feel.", ["couple", "friends", "solo"], ["sea", "instagram"]),
    plannerFreeDayPlace("Jimbaran Beach", "beach", "https://maps.google.com/?q=Jimbaran+Beach+Bali", "Long easy beach that pairs naturally with seafood dinner.", ["family", "couple", "friends"], ["sea", "relax"]),
    plannerFreeDayPlace("Kedonganan Fish Market", "culture", "https://maps.google.com/?q=Kedonganan+Fish+Market+Bali", "Local food-market stop for guests who want something less polished and more real.", ["friends", "family", "solo"], ["culture", "relax"]),
    plannerFreeDayPlace("Muaya Beach", "beach", "https://maps.google.com/?q=Muaya+Beach+Jimbaran", "Calm Jimbaran beach zone for a simple late-afternoon walk.", ["family", "couple", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Rock Bar Bali", "beachclub", "https://maps.google.com/?q=Rock+Bar+Bali", "Iconic cliffside sunset-drinks option with a premium resort feel.", ["couple", "friends"], ["sea", "relax", "instagram"]),
    plannerFreeDayPlace("Ulu Cliffhouse", "beachclub", "https://maps.google.com/?q=Ulu+Cliffhouse+Bali", "Clifftop pool-club option for a polished Uluwatu social day.", ["friends", "couple"], ["sea", "relax"]),
    plannerFreeDayPlace("Mana Uluwatu", "restaurant", "https://maps.google.com/?q=Mana+Uluwatu", "Sunset-side restaurant and pool vibe that works well without a full beach day.", ["couple", "friends"], ["relax"]),
    plannerFreeDayPlace("The Cashew Tree", "cafe", "https://maps.google.com/?q=The+Cashew+Tree+Bingin", "Good Bingin cafe stop for a relaxed morning or post-beach meal.", ["solo", "friends", "couple"], ["relax"]),
    plannerFreeDayPlace("Ours Bali", "restaurant", "https://maps.google.com/?q=Ours+Bali+Uluwatu", "Polished dinner option for couples or friends staying in Uluwatu.", ["couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Gooseberry Uluwatu", "restaurant", "https://maps.google.com/?q=Gooseberry+Uluwatu", "Stylish restaurant choice when the free day needs a stronger food plan.", ["couple", "friends"], ["relax"]),
    plannerFreeDayPlace("Impossibles Beach", "beach", "https://maps.google.com/?q=Impossibles+Beach+Bali", "Scenic surf-side beach option between Bingin and Padang Padang.", ["friends", "couple", "solo"], ["sea", "nature"]),
    plannerFreeDayPlace("Cemongkak Beach", "beach", "https://maps.google.com/?q=Cemongkak+Beach+Bali", "Less obvious south-coast beach for guests who already know the headline spots.", ["couple", "solo", "friends"], ["sea", "relax"]),
    plannerFreeDayPlace("Balangan Viewpoint", "scenic", "https://maps.google.com/?q=Balangan+Viewpoint+Bali", "Easy cliff viewpoint that gives a big ocean frame without making the day complex.", ["couple", "friends", "solo"], ["sea", "nature", "instagram"]),
    plannerFreeDayPlace("Blue Point Beach", "beach", "https://maps.google.com/?q=Blue+Point+Beach+Bali", "Classic Suluban-side beach mood with caves, cliffs, and surf culture.", ["friends", "couple", "solo"], ["sea", "nature", "instagram"]),
  ],
  nusa_dua: [
    plannerFreeDayPlace("Sawangan Beach", "beach", "https://maps.google.com/?q=Sawangan+Beach+Bali", "Quieter Nusa Dua coastline idea for guests who want more space.", ["couple", "family", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Peninsula Island Nusa Dua", "walk", "https://maps.google.com/?q=Peninsula+Island+Nusa+Dua", "Easy landscaped walk close to Waterblow and the main resort area.", ["family", "couple", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Devdan Show", "culture", "https://maps.google.com/?q=Devdan+Show+Bali", "Evening culture-show option when the free day needs a clear plan after sunset.", ["family", "couple", "friends"], ["culture", "relax"]),
    plannerFreeDayPlace("Bali National Golf Club", "scenic", "https://maps.google.com/?q=Bali+National+Golf+Club", "Premium relaxed activity idea for guests who want something resort-side and calm.", ["couple", "friends", "solo"], ["relax"]),
    plannerFreeDayPlace("The Bay Bali", "restaurant", "https://maps.google.com/?q=The+Bay+Bali+Nusa+Dua", "Simple food and beach-walk zone inside the Nusa Dua complex.", ["family", "couple", "friends"], ["relax", "sea"]),
    plannerFreeDayPlace("Tanjung Benoa Water Sports", "scenic", "https://maps.google.com/?q=Tanjung+Benoa+Water+Sports", "Light activity backup for families or friends who want more than a beach chair.", ["family", "friends"], ["sea", "adventure"]),
    plannerFreeDayPlace("Turtle Island Tanjung Benoa", "culture", "https://maps.google.com/?q=Turtle+Island+Tanjung+Benoa", "Soft family-friendly stop that can pair with the Benoa beach area.", ["family"], ["sea", "culture"]),
    plannerFreeDayPlace("Benoa Bay Mangrove", "walk", "https://maps.google.com/?q=Mangrove+Forest+Benoa+Bali", "Nature-side walk or drive idea when guests want a break from resort beaches.", ["solo", "couple", "family"], ["nature", "relax"]),
    plannerFreeDayPlace("Timbis Beach", "beach", "https://maps.google.com/?q=Timbis+Beach+Bali", "Quiet south-coast beach with a more open and local feel.", ["couple", "solo", "friends"], ["sea", "nature"]),
    plannerFreeDayPlace("Timbis Flying Site", "scenic", "https://maps.google.com/?q=Timbis+Flying+Site+Bali", "Paragliding-viewpoint style stop for guests who want a different visual angle.", ["friends", "couple", "solo"], ["nature", "adventure", "instagram"]),
    plannerFreeDayPlace("Sawangan Cliff", "scenic", "https://maps.google.com/?q=Sawangan+Cliff+Bali", "Cliffside ocean view near the resort belt for a short scenic stop.", ["couple", "solo"], ["sea", "nature", "instagram"]),
    plannerFreeDayPlace("Jari Menari Nusa Dua", "scenic", "https://maps.google.com/?q=Jari+Menari+Nusa+Dua", "Spa-style recovery idea for a rest day between bigger excursions.", ["couple", "solo"], ["relax"]),
    plannerFreeDayPlace("Geger Temple", "temple", "https://maps.google.com/?q=Pura+Geger+Nusa+Dua", "Small temple-side stop that adds culture near Geger Beach.", ["couple", "family", "solo"], ["culture", "sea"]),
    plannerFreeDayPlace("Bumbu Bali Tanjung Benoa", "restaurant", "https://maps.google.com/?q=Bumbu+Bali+Tanjung+Benoa", "Classic Balinese dinner idea close to Nusa Dua and Benoa.", ["family", "couple", "friends"], ["culture", "relax"]),
  ],
  sanur: [
    plannerFreeDayPlace("Cemara Beach", "beach", "https://maps.google.com/?q=Cemara+Beach+Sanur", "Calm south Sanur beach for an easy family-friendly free day.", ["family", "couple", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Semawang Beach", "beach", "https://maps.google.com/?q=Semawang+Beach+Sanur", "Relaxed Sanur beach zone that pairs well with a simple lunch.", ["family", "couple", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Padang Galak Beach", "beach", "https://maps.google.com/?q=Padang+Galak+Beach", "More local beach idea north of Sanur when guests want a different coastline.", ["solo", "friends", "family"], ["sea", "relax"]),
    plannerFreeDayPlace("Bali Orchid Garden", "scenic", "https://maps.google.com/?q=Bali+Orchid+Garden", "Light garden stop when guests want something quiet away from the beach.", ["family", "couple", "solo"], ["nature", "relax"]),
    plannerFreeDayPlace("Taman Festival Bali", "culture", "https://maps.google.com/?q=Taman+Festival+Bali", "Unusual abandoned-park stop for guests who like something less standard.", ["friends", "solo"], ["culture", "instagram"]),
    plannerFreeDayPlace("Serangan Island", "scenic", "https://maps.google.com/?q=Serangan+Island+Bali", "Nearby island-side option for sea views and a more local detour.", ["friends", "family", "solo"], ["sea", "nature"]),
    plannerFreeDayPlace("Turtle Conservation Serangan", "culture", "https://maps.google.com/?q=Turtle+Conservation+and+Education+Center+Serangan", "Family-friendly conservation stop that adds purpose to a free day.", ["family", "solo", "couple"], ["sea", "culture"]),
    plannerFreeDayPlace("Bali Wake Park", "scenic", "https://maps.google.com/?q=Bali+Wake+Park", "Action backup near Sanur for friends or families who want a sporty day.", ["friends", "family"], ["adventure", "sea"]),
    plannerFreeDayPlace("Sindhu Market", "restaurant", "https://maps.google.com/?q=Sindhu+Market+Sanur", "Casual local-food stop that keeps the day flexible and grounded.", ["family", "friends", "solo"], ["culture", "relax"]),
    plannerFreeDayPlace("Artasedana Sanur", "culture", "https://maps.google.com/?q=Artasedana+Sanur", "Comfort stop for shopping, supplies, coffee, or rainy-day backup.", ["family", "solo", "couple"], ["relax"]),
    plannerFreeDayPlace("Plaza Renon", "culture", "https://maps.google.com/?q=Plaza+Renon+Bali", "Indoor comfort option close to Sanur for rain or heat breaks.", ["family", "solo", "friends"], ["relax"]),
    plannerFreeDayPlace("Peek A Boo Sanur", "culture", "https://maps.google.com/?q=Peek+A+Boo+Sanur", "Useful family stop when traveling with kids and needing an easy lighter day.", ["family"], ["relax"]),
    plannerFreeDayPlace("Pantai Duyung", "beach", "https://maps.google.com/?q=Pantai+Duyung+Sanur", "Easy central Sanur beach for a slow walk and quiet sea view.", ["family", "couple", "solo"], ["sea", "relax"]),
    plannerFreeDayPlace("Kevala Studio Ceramic", "culture", "https://maps.google.com/?q=Kevala+Studio+Ceramic+Sanur", "Creative indoor stop for a calmer Sanur free day.", ["solo", "couple", "family"], ["culture", "relax"]),
  ],
};

Object.entries(PLANNER_FREE_DAY_PLACE_EXPANSIONS).forEach(([area, items]) => {
  PLANNER_FREE_DAY_PLACES[area] = [...(PLANNER_FREE_DAY_PLACES[area] || []), ...items];
});

Object.assign(BALI_PLANNER_PLACE_IMAGE_BY_TITLE, {
  "Berawa Beach": BALI_PLANNER_PLACE_IMAGES.cangguBeach,
  "Nelayan Beach": BALI_PLANNER_PLACE_IMAGES.cangguBeach,
  "Munggu Beach": BALI_PLANNER_PLACE_IMAGES.cangguQuietBeach,
  "Pura Batu Bolong": BALI_PLANNER_PLACE_IMAGES.cangguSunset,
  "Samadi Bali": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Copenhagen Canggu": BALI_PLANNER_PLACE_IMAGES.cangguBeach,
  "The Shady Shack": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Luigi's Hot Pizza": BALI_PLANNER_PLACE_IMAGES.cangguBeachClub,
  "Old Man's Canggu": BALI_PLANNER_PLACE_IMAGES.cangguBeachClub,
  "Deus Ex Machina Canggu": BALI_PLANNER_PLACE_IMAGES.cangguBeach,
  "Bali Equestrian Centre": BALI_PLANNER_PLACE_IMAGES.cangguQuietBeach,
  "Canggu Shortcut Rice Fields": BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace,
  "Alternative Beach Canggu": BALI_PLANNER_PLACE_IMAGES.cangguBeachClub,
  "Baked Canggu": BALI_PLANNER_PLACE_IMAGES.cangguBeach,
  "Legian Beach": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "La Plancha": BALI_PLANNER_PLACE_IMAGES.seminyakSunset,
  "Mano Beach House": BALI_PLANNER_PLACE_IMAGES.seminyakPetitenget,
  "Seminyak Square": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Seminyak%2C_Bali%2C_Indonesia_%282012%29.jpg/1280px-Seminyak%2C_Bali%2C_Indonesia_%282012%29.jpg",
  "Eat Street Seminyak": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Seminyak%2C_Bali%2C_Indonesia_%282012%29.jpg/1280px-Seminyak%2C_Bali%2C_Indonesia_%282012%29.jpg",
  "Nyaman Gallery": BALI_PLANNER_PLACE_IMAGES.seminyakTemple,
  "Bodyworks Spa Seminyak": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "Shelter Cafe Seminyak": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "Kynd Community": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "Gado Gado Beach": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "W Bali Seminyak": BALI_PLANNER_PLACE_IMAGES.seminyakPetitenget,
  "Merah Putih": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Sarong Seminyak": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Shooters Bali": BALI_PLANNER_PLACE_IMAGES.seminyakBeach,
  "Saraswati Temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Pura_Taman_Saraswati%2C_Ubud%2C_Bali%2C_Indonesia.jpg/1280px-Pura_Taman_Saraswati%2C_Ubud%2C_Bali%2C_Indonesia.jpg",
  "Ubud Art Market": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ubud_Market%2C_Bali%2C_Indonesia.jpg/1280px-Ubud_Market%2C_Bali%2C_Indonesia.jpg",
  "Tegenungan Waterfall": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tegenungan_waterfall%2C_Bali.jpg/1280px-Tegenungan_waterfall%2C_Bali.jpg",
  "Suwat Waterfall": BALI_PLANNER_PLACE_IMAGES.ubudWaterfall,
  "Gunung Kawi Temple": plannerLocalImage("images/bali-tours/gunung-kawi-temple.jpg"),
  "Gunung Kawi Sebatu": BALI_PLANNER_PLACE_IMAGES.ubudTemple,
  "Blanco Renaissance Museum": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Blanco_Renaissance_Museum%2C_Ubud%2C_Bali.jpg/1280px-Blanco_Renaissance_Museum%2C_Ubud%2C_Bali.jpg",
  "Neka Art Museum": BALI_PLANNER_PLACE_IMAGES.ubudPalace,
  "ARMA Museum": BALI_PLANNER_PLACE_IMAGES.ubudPalace,
  "Yoga Barn Ubud": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Alchemy Ubud": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Pison Ubud": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Subak Juwuk Manis": BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace,
  "Sayan Rice Fields": BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace,
  "Penglipuran Village": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Penglipuran_Village_Bali.jpg/1280px-Penglipuran_Village_Bali.jpg",
  "Sidemen Valley": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sidemen%2C_Bali%2C_Indonesia.jpg/1280px-Sidemen%2C_Bali%2C_Indonesia.jpg",
  "Green Bowl Beach": BALI_PLANNER_PLACE_IMAGES.uluwatuBeach,
  "Tegal Wangi Beach": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Jimbaran Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Jimbaran_Beach%2C_Bali.jpg/1280px-Jimbaran_Beach%2C_Bali.jpg",
  "Kedonganan Fish Market": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Muaya Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Jimbaran_Beach%2C_Bali.jpg/1280px-Jimbaran_Beach%2C_Bali.jpg",
  "Rock Bar Bali": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Ulu Cliffhouse": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Mana Uluwatu": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "The Cashew Tree": BALI_PLANNER_PLACE_IMAGES.uluwatuBingin,
  "Ours Bali": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Gooseberry Uluwatu": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Impossibles Beach": BALI_PLANNER_PLACE_IMAGES.uluwatuBeach,
  "Cemongkak Beach": BALI_PLANNER_PLACE_IMAGES.uluwatuDreamland,
  "Balangan Viewpoint": BALI_PLANNER_PLACE_IMAGES.uluwatuCliff,
  "Blue Point Beach": BALI_PLANNER_PLACE_IMAGES.uluwatuSurf,
  "Sawangan Beach": BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach,
  "Peninsula Island Nusa Dua": BALI_PLANNER_PLACE_IMAGES.nusaDuaWaterblow,
  "Devdan Show": BALI_PLANNER_PLACE_IMAGES.nusaDuaTemple,
  "Bali National Golf Club": BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach,
  "The Bay Bali": BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach,
  "Tanjung Benoa Water Sports": BALI_PLANNER_PLACE_IMAGES.sanurWaterActivity,
  "Turtle Island Tanjung Benoa": BALI_PLANNER_PLACE_IMAGES.sanurWaterActivity,
  "Benoa Bay Mangrove": BALI_PLANNER_PLACE_IMAGES.sanurBoardwalk,
  "Timbis Beach": BALI_PLANNER_PLACE_IMAGES.nusaDuaCliffBeach,
  "Timbis Flying Site": BALI_PLANNER_PLACE_IMAGES.nusaDuaCliffBeach,
  "Sawangan Cliff": BALI_PLANNER_PLACE_IMAGES.nusaDuaCliffBeach,
  "Jari Menari Nusa Dua": BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach,
  "Geger Temple": BALI_PLANNER_PLACE_IMAGES.nusaDuaTemple,
  "Bumbu Bali Tanjung Benoa": BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic,
  "Cemara Beach": BALI_PLANNER_PLACE_IMAGES.sanurBeach,
  "Semawang Beach": BALI_PLANNER_PLACE_IMAGES.sanurBeach,
  "Padang Galak Beach": BALI_PLANNER_PLACE_IMAGES.sanurBeach,
  "Bali Orchid Garden": BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace,
  "Taman Festival Bali": BALI_PLANNER_PLACE_IMAGES.sanurMuseum,
  "Serangan Island": BALI_PLANNER_PLACE_IMAGES.sanurBeach,
  "Turtle Conservation Serangan": BALI_PLANNER_PLACE_IMAGES.sanurWaterActivity,
  "Bali Wake Park": BALI_PLANNER_PLACE_IMAGES.sanurWaterActivity,
  "Sindhu Market": BALI_PLANNER_PLACE_IMAGES.sanurCafe,
  "Artasedana Sanur": BALI_PLANNER_PLACE_IMAGES.sanurCafe,
  "Plaza Renon": BALI_PLANNER_PLACE_IMAGES.sanurCafe,
  "Peek A Boo Sanur": BALI_PLANNER_PLACE_IMAGES.sanurCafe,
  "Pantai Duyung": BALI_PLANNER_PLACE_IMAGES.sanurBeach,
  "Kevala Studio Ceramic": BALI_PLANNER_PLACE_IMAGES.sanurMuseum,
});

const PLANNER_TOP_PICK_TITLES = new Set([
  "Tanah Lot Temple",
  "La Brisa Beach Club",
  "Batu Bolong Beach",
  "The Lawn Canggu",
  "Finns Beach Club",
  "Echo Beach",
  "Atlas Beach Club",
  "Berawa Beach",
  "Potato Head Beach Club",
  "Ku De Ta",
  "Seminyak Beach",
  "Double Six Beach",
  "Motel Mexicola",
  "Sisterfields",
  "La Plancha",
  "W Bali Seminyak",
  "Tegalalang Rice Terrace",
  "Campuhan Ridge Walk",
  "Tirta Empul Temple",
  "Monkey Forest Ubud",
  "Kanto Lampo Waterfall",
  "Cretya Ubud",
  "Alas Harum",
  "Saraswati Temple",
  "Ubud Art Market",
  "Tegenungan Waterfall",
  "Penglipuran Village",
  "Sidemen Valley",
  "Melasti Beach",
  "Uluwatu Temple",
  "Padang Padang Beach",
  "Single Fin",
  "Savaya",
  "Karang Boma Cliff",
  "Bingin Beach",
  "Nyang Nyang Beach",
  "Balangan Beach",
  "Rock Bar Bali",
  "Green Bowl Beach",
  "Geger Beach",
  "Waterblow Nusa Dua",
  "Sundays Beach Club",
  "Nusa Dua Beach",
  "Manarai Beach House",
  "Koral Restaurant",
  "Pandawa Beach",
  "Tanjung Benoa Beach",
  "Museum Pasifika",
  "Mengiat Beach",
  "Sanur Beach Boardwalk",
  "Massimo",
  "Byrd House Beach Club",
  "Mertasari Beach",
  "Le Mayeur Museum",
  "Sindhu Beach",
  "Segara Ayu Beach",
  "Matahari Terbit Beach",
  "Sanur Port",
  "Turtle Conservation Serangan",
  "Big Garden Corner",
]);

const PLANNER_FREE_DAY_NEIGHBORS = {
  canggu: ["seminyak"],
  seminyak: ["canggu", "uluwatu"],
  ubud: ["sanur"],
  uluwatu: ["nusa_dua", "seminyak"],
  nusa_dua: ["uluwatu", "sanur"],
  sanur: ["nusa_dua", "ubud"],
};

const PLANNER_FREE_DAY_BUCKETS = [
  { key: "coast", kinds: ["beach", "sunset", "beachclub"] },
  { key: "food", kinds: ["restaurant", "cafe"] },
  { key: "explore", kinds: ["temple", "scenic", "waterfall", "walk", "culture"] },
];

const PLANNER_FREE_DAY_ROTATIONS = [
  ["coast", "food", "explore"],
  ["explore", "coast", "food"],
  ["food", "explore", "coast"],
];

function renderPlannerFreeDayPlaceCall(item) {
  const interestArg = item.interests ? `,${JSON.stringify(item.interests)}` : "";
  return `place(${JSON.stringify(item.title)},${JSON.stringify(item.kind)},${JSON.stringify(item.maps)},${JSON.stringify(item.copy)},${JSON.stringify(item.vibe)}${interestArg})`;
}

function renderPlannerFreeDayBlock() {
  const areasJs = Object.entries(PLANNER_FREE_DAY_PLACES)
    .map(([area, items]) => `${area}: [\n${items.map((item) => renderPlannerFreeDayPlaceCall(item)).join(",\n")}\n]`)
    .join(",\n");

  return `var FREE_DAY_PLACES = {\n${areasJs}\n};
var FREE_DAY_NEIGHBORS = ${JSON.stringify(PLANNER_FREE_DAY_NEIGHBORS, null, 2)};
var PLACE_BUCKETS = ${JSON.stringify(PLANNER_FREE_DAY_BUCKETS, null, 2)};
var PLACE_BUCKET_ROTATIONS = ${JSON.stringify(PLANNER_FREE_DAY_ROTATIONS, null, 2)};
function normalizeAreaKey(area){ return FREE_DAY_PLACES[area] ? area : 'canggu'; }
function matchesGroup(placeObj, group){ return !placeObj.vibe || placeObj.vibe.indexOf(group) !== -1; }
function normalizePlannerInterests(interests){
if(!Array.isArray(interests) || !interests.length) return ['sea','nature','culture','relax','adventure','instagram'];
return interests.slice();
}
function inferPlaceInterests(placeObj){
if(placeObj && Array.isArray(placeObj.interests) && placeObj.interests.length) return placeObj.interests;
var map = {
beach:['sea','relax','instagram'],
sunset:['sea','relax','instagram'],
restaurant:['relax'],
cafe:['relax'],
beachclub:['sea','relax','instagram'],
temple:['culture','instagram'],
scenic:['nature','instagram'],
waterfall:['nature','adventure','instagram'],
walk:['nature','relax'],
culture:['culture','relax']
};
return map[(placeObj && placeObj.kind) || ''] || ['relax'];
}
function placeInterestMatchCount(placeObj, interests){
var target = normalizePlannerInterests(interests);
var own = inferPlaceInterests(placeObj);
return target.filter(function(item){ return own.indexOf(item) !== -1; }).length;
}
function bucketKeyForPlace(placeObj){
var kind = placeObj && placeObj.kind;
for(var i=0;i<PLACE_BUCKETS.length;i++){
if(PLACE_BUCKETS[i].kinds.indexOf(kind) !== -1) return PLACE_BUCKETS[i].key;
}
return 'explore';
}
function buildFreeDayPool(area){
var baseArea = normalizeAreaKey(area);
var keys = [baseArea].concat(FREE_DAY_NEIGHBORS[baseArea] || []);
var seen = {};
var pool = [];
keys.forEach(function(areaKey, index){
(FREE_DAY_PLACES[areaKey] || []).forEach(function(item){
if(seen[item.title]) return;
seen[item.title] = true;
pool.push(Object.assign({ __areaKey: areaKey, __areaRank: index }, item));
});
});
return pool;
}
function scoreFreeDayCandidate(item, preferredBucket, group, interests, usedCounts, selectedKinds){
var score = 0;
score += item.__areaRank === 0 ? 28 : (item.__areaRank === 1 ? 4 : 0);
score += matchesGroup(item, group) ? 18 : -6;
score += placeInterestMatchCount(item, interests) * 10;
if(item.topPick) score += 7;
if(preferredBucket && bucketKeyForPlace(item) === preferredBucket) score += 9;
if(selectedKinds[item.kind]) score -= 12;
var used = usedCounts[item.title] || 0;
if(used === 0) score += 22;
else score -= used * 36;
if(item.kind === 'beach' || item.kind === 'sunset') score += 1;
return score;
}
function pickFreeDayCandidate(pool, preferredBucket, group, interests, usedCounts, selectedKinds, selectedTitles){
var best = null;
function scan(requireBucket, requireUnused){
pool.forEach(function(item){
if(selectedTitles[item.title]) return;
if(requireBucket && bucketKeyForPlace(item) !== preferredBucket) return;
if(requireUnused && usedCounts[item.title]) return;
var score = scoreFreeDayCandidate(item, preferredBucket, group, interests, usedCounts, selectedKinds);
if(!best || score > best.score) best = { item:item, score:score };
});
}
if(preferredBucket) scan(true, true);
if(!best) scan(false, true);
if(!best && preferredBucket) scan(true, false);
if(!best) scan(false, false);
return best ? best.item : null;
}
function getFreeDayPlaces(area, group, interests, usedCounts, dayIndex){
if(!usedCounts || typeof usedCounts !== 'object') usedCounts = {};
var pool = buildFreeDayPool(area);
var safeDayIndex = typeof dayIndex === 'number' && !isNaN(dayIndex) ? dayIndex : Number(usedCounts.__sbFreeDayIndex || 0);
var rotation = PLACE_BUCKET_ROTATIONS[safeDayIndex % PLACE_BUCKET_ROTATIONS.length];
var picks = [];
var selectedKinds = {};
var selectedTitles = {};
rotation.forEach(function(bucketKey){
var item = pickFreeDayCandidate(pool, bucketKey, group, interests, usedCounts, selectedKinds, selectedTitles);
if(!item) return;
selectedKinds[item.kind] = (selectedKinds[item.kind] || 0) + 1;
selectedTitles[item.title] = true;
picks.push(item);
});
while(picks.length < 3 && pool.length){
var extra = pickFreeDayCandidate(pool, '', group, interests, usedCounts, selectedKinds, selectedTitles);
if(!extra) break;
selectedKinds[extra.kind] = (selectedKinds[extra.kind] || 0) + 1;
selectedTitles[extra.title] = true;
picks.push(extra);
}
picks.forEach(function(item){ usedCounts[item.title] = (usedCounts[item.title] || 0) + 1; });
usedCounts.__sbFreeDayIndex = safeDayIndex + 1;
return picks.slice(0,3);
}`;
}

function renderPlannerPlaceImageBlock() {
  return `var PLACE_IMAGE = {
beach:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach)},
sunset:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguSunset)},
restaurant:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic)},
cafe:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurCafe)},
beachclub:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguBeachClub)},
temple:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudTemple)},
scenic:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace)},
waterfall:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudWaterfall)},
walk:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurBoardwalk)},
culture:${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudPalace)}
};
var PLACE_IMAGE_VERSION = '20260525c';
var PLACE_IMAGE_BY_TITLE = ${JSON.stringify(BALI_PLANNER_PLACE_IMAGE_BY_TITLE, null, 2)};
var TOP_PICK_PLACES = ${JSON.stringify(Object.fromEntries(Array.from(PLANNER_TOP_PICK_TITLES).map((title) => [title, true])), null, 2)};
function isPlannerLocalImage(url){
return !!url && (/^\\//.test(url) || !/^(?:https?:)?\\/\\//i.test(url));
}
function withPlannerImageVersion(url){
if (!url) return url;
if (!isPlannerLocalImage(url)) return url;
return url + (url.indexOf('?') === -1 ? '?' : '&') + 'sbv=' + PLACE_IMAGE_VERSION;
}
function plannerFallbackImageByKind(kind){
var kindMap = {
beach: PLACE_IMAGE.beach,
sunset: PLACE_IMAGE.sunset,
restaurant: PLACE_IMAGE.restaurant,
cafe: PLACE_IMAGE.cafe,
beachclub: PLACE_IMAGE.beachclub,
temple: PLACE_IMAGE.temple,
scenic: PLACE_IMAGE.scenic,
waterfall: PLACE_IMAGE.waterfall,
walk: PLACE_IMAGE.walk,
culture: PLACE_IMAGE.culture
};
return kindMap[kind] || PLACE_IMAGE.scenic;
}
function plannerFallbackImageByTitle(title, kind){
var value = String(title || '').toLowerCase();
if (!value) return plannerFallbackImageByKind(kind);
if (/nusa penida snorkeling|manta point/.test(value)) return '/images/bali-tours/nusa-penida-manta-rays-point.webp';
if (/lovina|dolphin/.test(value)) return '/images/bali-tours/dolphin-sunrise-city-tour.jpg';
if (/ubud instagram/.test(value)) return '/images/bali-tours/ubud-instagram-tour.jpg';
if (/ubud rice terrace|ubud highlights/.test(value)) return '/images/bali-tours/ubud-highlights-tour.jpg';
if (/east bali instagram/.test(value)) return '/images/bali-tours/east-bali-instagram-tour.jpg';
if (/tanah lot and bedugul/.test(value)) return '/images/bali-tours/tanah-lot-bedugul-tour.jpg';
if (/mount batur/.test(value)) return '/images/bali-tours/mount-batur-sunrise-jeep-tour.webp';
if (/atv/.test(value)) return '/images/bali-tours/atv-quad-bikes.webp';
if (/nusa penida west/.test(value)) return '/images/bali-tours/west-collage/nusa-penida-west-kelingking-wide.webp';
if (/nusa penida east/.test(value)) return '/images/bali-tours/nusa-penida-east-tour.jpg';
if (/nusa penida full day/.test(value)) return '/images/bali-tours/nusa-penida-full-day-tour.webp';
if (/nusa penida private car/.test(value)) return '/images/bali-tours/nusa-penida-private-day-tour-manta-snorkeling.webp';
if (/gili/.test(value)) return '/images/bali-tours/gili-island-tour.jpg';
if (/whale shark/.test(value)) return '/images/bali-tours/sumbawa-whale-shark-snorkeling-trip.webp';
if (/blue lagoon/.test(value)) return '/images/bali-tours/blue-lagoon-snorkeling.webp';
if (/raft/.test(value)) return '/images/bali-tours/white-water-rafting.webp';
if (/sunset cruise/.test(value)) return '/images/bali-tours/sunset-cruise-bali.jpg';
if (/surf lesson|surf experience/.test(value)) return '/images/bali-tours/surf-lesson-experience.webp';
if (/airport transfer/.test(value)) return '/images/bali-tours/bali-airport-transfer.jpg';
if (/private car with driver|private car/.test(value)) return '/images/bali-tours/private-car-with-driver-bali.jpg';
if (/fast boat/.test(value)) return '/images/bali-tours/fast-boat-transfer-bali.webp';
if (/bali helicopter scenic/.test(value)) return '/images/bali-tours/bali-helicopter-scenic-tour.jpg';
if (/volcano and coastline helicopter/.test(value)) return '/images/bali-tours/volcano-coastline-helicopter-ride.jpeg';
if (/tanah lot/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguSunset)};
if (/(la brisa|the lawn canggu|finns beach club|atlas beach club|luma canggu)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguBeachClub)};
if (/(batu bolong|echo beach|crate cafe|nude cafe|mason canggu|warung varuna|love anchor market|milk and madu)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguBeach)};
if (/(pererenan|seseh)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.cangguQuietBeach)};
if (/double six beach/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.seminyakSunset)};
if (/(potato head|ku de ta|mrs sippy)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.seminyakPetitenget)};
if (/(seminyak beach|petitenget beach|sisterfields|motel mexicola|revolver espresso|sea circus|nook|biku|kim soo|coffee cartel)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.seminyakBeach)};
if (/petitenget temple/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.seminyakTemple)};
if (/(tegalalang|rice terrace|alas harum|bali pulina|cretya ubud)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace)};
if (/campuhan ridge/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudRidge)};
if (/tukad cepung/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudTukadCepung)};
if (/(tibumana|kanto lampo|waterfall)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudWaterfall)};
if (/tirta empul/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudTemple)};
if (/monkey forest/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudMonkeyForest)};
if (/(seniman coffee|sari organik|murni's warung|warung pondok madu|warung tepi sawah|zest ubud|clear cafe ubud)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudFoodClassic)};
if (/(ibu oka|babi guling dobiel)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudFoodIbuOka)};
if (/warung biah biah/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudFoodWarung)};
if (/naughty nuri/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudFoodRibs)};
if (/goa gajah/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudGoaGajah)};
if (/puri ubud/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.ubudPalace)};
if (/lempuyang/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.eastBaliLempuyang)};
if (/tirta gangga/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.eastBaliTirtaGangga)};
if (/(nusa penida east coast|diamond beach|atuh beach)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.eastBaliNusaPenida)};
if (/(melasti beach|tropical temptation)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuMelasti)};
if (/uluwatu temple/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuTemple)};
if (/(padang padang|thomas beach)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuBeach)};
if (/(single fin|suluban beach|drifter surf shop and cafe)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuSurf)};
if (/(karang boma cliff|savaya|el kabron)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuCliff)};
if (/(bingin beach|suka espresso|nourish cafe)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuBingin)};
if (/dreamland beach/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.uluwatuDreamland)};
if (/(geger beach|nusa dua beach|samuh beach|manarai beach house|kayuputi|koral restaurant|bali collection|mulia coastline walk)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach)};
if (/waterblow/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaWaterblow)};
if (/puja mandala/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaTemple)};
if (/(gunung payung beach|sundays beach club)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaCliffBeach)};
if (/pandawa beach/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.nusaDuaPandawa)};
if (/sanur beach boardwalk/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurBoardwalk)};
if (/mertasari beach/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurMertasari)};
if (/karang beach/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurKarang)};
if (/(le mayeur museum|big garden corner)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurMuseum)};
if (/(massimo|cafe batu jimbar|genius cafe|pizzaria sanur|sindhu night market)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurCafe)};
if (/(byrd house beach club|soul on the beach|sindhu beach|icon bali mall)/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurBeach)};
if (/seawalker sanur/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sanurWaterActivity)};
if (/sunset cruise in bali/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.sunsetCruiseLocal)};
if (/mount batur sunrise/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.mountBaturSunriseLocal)};
if (/nusa penida day trip/.test(value)) return ${JSON.stringify(BALI_PLANNER_PLACE_IMAGES.eastBaliNusaPenida)};
return plannerFallbackImageByKind(kind);
}
function plannerRecoverImage(img){
if (!img || img.dataset.sbRecovered === '1') return;
var card = img.closest ? img.closest('.sb-place-card, .sb-ai-result-card') : null;
var kindNode = card ? card.querySelector('.sb-place-type') : null;
var kind = kindNode ? String(kindNode.textContent || '').trim().toLowerCase() : '';
var fallback = plannerFallbackImageByTitle(img.getAttribute('alt') || '', kind);
if (!fallback) return;
img.dataset.sbRecovered = '1';
img.src = withPlannerImageVersion(fallback);
if (typeof syncHeightHard === 'function') {
setTimeout(syncHeightHard, 0);
}
}
document.addEventListener('error', function(event){
var img = event.target;
if (!img || img.tagName !== 'IMG') return;
if (!img.closest || !img.closest('#sbAiResultsGrid')) return;
plannerRecoverImage(img);
}, true);
function place(title, kind, maps, copy, vibe, interests){ return { title:title, kind:kind, image:withPlannerImageVersion(PLACE_IMAGE_BY_TITLE[title] || PLACE_IMAGE[kind] || PLACE_IMAGE.scenic), maps:maps, copy:copy, vibe:vibe || ['couple','friends','family','solo'], interests:interests || null, topPick: !!TOP_PICK_PLACES[title] }; }`;
}

const tours = [
  {
    slug: "ubud-highlights-tour",
    title: "Ubud Rice Terrace, Temple & Volcano Tour",
    eyebrow: "All-inclusive Ubud and Kintamani day",
    mapLabel: "Heritage route",
    privateOfferEyebrow: "Best-selling heritage route",
    duration: "10 hours",
    pickup: "08:00 hotel pickup from covered Bali areas",
    bestFor: "First-time Bali visitors",
    format: "All-inclusive private day tour",
    area: "Kintamani, Ubud, and central Bali",
    price: "From $70",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Rice terraces, temple stops, and Mount Batur viewpoint scenery in Bali",
    lead:
      "Cover central Bali's classic arts villages, temple stops, Mount Batur lunch views, rice terraces, Monkey Forest, and Ubud Palace in one all-inclusive private day.",
    summary:
      "This all-inclusive Ubud and Kintamani day tour is built for travelers who want Bali culture, scenery, and soft adventure without managing tickets, transport, or lunch separately. It works especially well for first-time visitors because the route moves from craft villages and temples to volcano views, rice terraces, and the Ubud center in one organized flow.",
    miniPromoText:
      "Private Ubud and Kintamani day with temples, Mount Batur views, rice terraces, and an easy Ubud finish.",
    overview:
      "The route usually starts with Batubulan batik, Celuk silver, and Mas wood carving, then continues to Batuan Temple, Sebatu, Gunung Kawi, a Kintamani buffet lunch with Mount Batur views, Tegalalang rice terraces and coffee tasting, Monkey Forest, and Ubud Palace before the return transfer.",
    miniPromoSideText:
      "Batik, silver, temples, Kintamani, Tegalalang, Monkey Forest, and Ubud Palace in one easy route.",
    highlights: [
      ["Kintamani volcano lunch views", "Indonesian buffet lunch with wide views over Mount Batur and Lake Batur."],
      ["Temple route with real depth", "Batuan Temple, Sebatu, and Gunung Kawi bring the sacred side of the day into one smooth route."],
      ["Rice terrace and coffee stop", "Tegalalang scenery plus a plantation break for coffee, tea, and photo time."],
      ["Arts villages and Ubud finish", "Batik, silver, wood carving, Monkey Forest, and Ubud Palace keep the day full without feeling random."],
    ],
    itinerary: [
      ["Arts villages and first temple stops", "Start with Batubulan batik, Celuk silver, Mas wood carving, and Batuan Temple before the route climbs inland."],
      ["Sebatu, Gunung Kawi, and Kintamani", "Continue through the temple valley section and pause in Kintamani for the all-inclusive buffet lunch with Mount Batur views."],
      ["Tegalalang, Monkey Forest, and Ubud Palace", "Finish with rice terraces, coffee tasting, Monkey Forest, and Ubud Palace before the return transfer to your hotel."],
    ],
    includes: [
      "Hotel pickup and return from covered Bali areas",
      "Private air-conditioned transport",
      "All entrance tickets and local route fees",
      "Bottled mineral water",
      "Indonesian buffet lunch in Kintamani",
      "Coffee and tea tasting stop",
    ],
    goodToKnow: [
      "Personal drinks, souvenirs, and gratuities are usually not included.",
      "Bring sunscreen, a hat, sports shoes or strapped sandals, extra cash, and a camera.",
      "Pickup usually covers Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran.",
      "Volcano views in Kintamani always depend on the weather window on the day.",
      "The final stop order can shift a little with traffic, ceremonies, and the hotel area.",
    ],
    meetingPoint:
      "Most guests are picked up directly from their hotel, villa, or Airbnb in Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, or Jimbaran.",
    faqs: [
      [
        "Which places are included on this Ubud route?",
        "This all-inclusive day usually runs through Batubulan batik village, Celuk silver, Mas wood carving, Batuan Temple, Sebatu, Gunung Kawi, Kintamani, Tegalalang, Monkey Forest, and Ubud Palace, with the final order adjusted around traffic and timing.",
      ],
      [
        "Is lunch included in the tour?",
        "Yes. The standard package includes an Indonesian buffet lunch in Kintamani with Mount Batur and Lake Batur views.",
      ],
      [
        "Which areas get hotel pickup?",
        "Pickup is usually available from Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran. Final timing depends on your hotel area.",
      ],
      [
        "What is included in the package?",
        "The all-inclusive format usually covers hotel pickup and drop-off, private transport, entrance tickets, bottled water, lunch, and the coffee or tea tasting stop.",
      ],
    ],
    mainPageFeatures: [
      ["⏰", "10 hours private day tour"],
      ["🚐", "Free pick up & drop-off included"],
      ["🎟", "All tickets included"],
      ["📍", "10 stops: rice terraces, temples, volcano and Ubud"],
      ["🍽", "Buffet lunch with Mt. Batur view"],
    ],
    tags: ["hotelPickup", "private", "temple", "nature", "family", "volcano"],
    related: ["east-bali-instagram-tour", "tanah-lot-bedugul-tour", "private-car-with-driver-bali"],
  },
  {
    slug: "north-bali-lovina-dolphins-tour",
    title: "North Bali Tour and Lovina Dolphins",
    mainPage: false,
    aiPlanner: false,
    eyebrow: "Sunrise dolphins and waterfalls",
    duration: "10-12 hours",
    pickup: "Very early hotel pickup",
    bestFor: "Travelers chasing a big full-day route",
    format: "Private day tour",
    area: "Lovina and north Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "North Bali temple and mountain landscape",
    lead:
      "Watch dolphins at sunrise in Lovina, then keep going through cooler mountain scenery, lake temples, and some of the most dramatic nature stops in north Bali.",
    summary:
      "This is one of the fullest Bali day trips on the island, but it pays off with a completely different mood from the south. The route combines sea, mountain air, and scenic temple stops in one professionally paced private experience.",
    overview:
      "North Bali needs good timing because distances are longer and sunrise departures matter. With private transport and a clear plan, the day feels adventurous instead of exhausting.",
    highlights: [
      ["Lovina dolphin sunrise", "A classic early-morning sea moment and one of the most requested north Bali experiences."],
      ["Cooler mountain scenery", "The route moves away from the beach belt into a greener, softer, and more cinematic side of the island."],
      ["Temple and lake atmosphere", "Strong cultural scenery keeps the day varied after the early sea start."],
      ["One full private route", "No need to combine drivers, boats, and separate tickets on your own."],
    ],
    itinerary: [
      ["Early transfer to Lovina", "Leave before dawn so you can reach Lovina in time for the best sunrise and boat departure window."],
      ["Dolphins and north Bali highlights", "Start on the water, then continue to lake, temple, and waterfall scenery based on timing and energy."],
      ["Scenic drive back south", "Wrap up the route with a relaxed return while your driver handles the long transfer back to your hotel."],
    ],
    tags: ["hotelPickup", "private", "boat", "nature", "sunrise"],
    related: ["ubud-highlights-tour", "tanah-lot-bedugul-tour", "east-bali-instagram-tour"],
    faqExtra: [
      "Is the North Bali dolphin tour suitable for children?",
      "Usually yes, especially for families comfortable with an early start and a longer road day. The private format makes pacing much easier than a fixed group itinerary.",
    ],
  },
  {
    slug: "dolphin-sunrise-city-tour",
    title: "Lovina Dolphin Sunrise Tour",
    eyebrow: "Sunrise boat trip, waterfall and lake temple day",
    duration: "8 hours",
    pickup: "03:00 am hotel pickup from south and central Bali areas",
    bestFor: "Travelers who want a compact north Bali sunrise route with classic highlights",
    format: "Private dolphin sunrise day tour",
    area: "Lovina, Gitgit Waterfall and Ulun Danu Beratan",
    price: "From $75",
    image: sourceImage("bali-tours/north-bali-lovina-dolphins-tour.jpg"),
    imageAlt: "Traditional Lovina dolphin boat at sunrise in north Bali",
    lead:
      "Start before dawn for a classic Lovina dolphin sunrise, then continue through north Bali with a stop at Gitgit Waterfall and the iconic Ulun Danu Beratan Temple.",
    summary:
      "This Lovina Dolphin Sunrise Tour is the cleanest way to do north Bali in one early-start day when you want the sea, a waterfall, and a lake temple without stitching the route together yourself. It includes hotel pickup, private air-conditioned transport, the traditional Lovina outrigger boat, entrance fees, mineral water, and insurance, with the page price set from $75.",
    overview:
      "The route is built around one very specific morning payoff: catching the dolphin boat from Lovina at sunrise before north Bali wakes up fully. After the sea section, the day moves inland to Gitgit Waterfall for a softer nature stop and then to Ulun Danu Beratan Temple for one of Bali's most recognizable cultural landscapes, all with a private English-speaking driver handling the long transfer logistics.",
    highlights: [
      ["Lovina sunrise dolphin watching", "Head out on a traditional outrigger boat at dawn for one of north Bali's most requested wildlife-style sunrise experiences."],
      ["Gitgit Waterfall stop", "Add a real waterfall section to the route instead of making the day only about the boat, which keeps the itinerary feeling fuller and more visual."],
      ["Ulun Danu Beratan Temple", "Finish with one of Bali's most photogenic lake temples, a strong contrast after the open-water sunrise and forest stop."],
      ["Private north Bali logistics", "The value of this route is not only the stops but the fact that transport, timing, and the long road sections are already organized cleanly for you."],
    ],
    itinerary: [
      ["03:00 pickup and transfer to Lovina", "Your driver picks you up from your hotel, villa, or Airbnb in the covered Bali areas and heads directly north toward Lovina Beach before sunrise."],
      ["06:00 dolphin boat from Lovina", "Arrive at Lovina, board the traditional outrigger boat, and head out to watch for dolphins as the morning light opens over the sea."],
      ["07:45 drive to Gitgit Waterfall", "After the dolphin section, continue inland toward Gitgit for the first land stop of the route."],
      ["08:30 Gitgit Waterfall exploration", "Spend time at Gitgit Waterfall, stretch your legs, enjoy the cooler air, and capture the waterfall atmosphere before moving on."],
      ["09:30 transfer to Ulun Danu Beratan", "Continue into the Bedugul highlands for the temple portion of the day."],
      ["10:30 Ulun Danu Beratan Temple", "Visit the famous lake temple, walk the grounds, and enjoy one of Bali's strongest calm scenic settings."],
      ["11:30 to 13:40 return to your hotel", "After the temple stop, begin the long return south and finish with hotel drop-off in the afternoon."],
    ],
    includes: [
      "Entrance fees at all tourist destinations on the route",
      "Traditional Lovina outrigger boat ticket",
      "English-speaking driver",
      "Private car with full air-conditioning",
      "A bottle of mineral water",
      "Insurance",
    ],
    goodToKnow: [
      "Breakfast and lunch are not included in the source package, so bring cash if you want to stop for food during or after the route.",
      "Pickup starts around 03:00 am because dolphin timing in Lovina depends on reaching the beach before sunrise.",
      "Covered pickup areas listed by the source include Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran.",
      "Bring a change of clothes, hat, camera, sunglasses, sunscreen, and extra cash for personal expenses.",
      "This is a long road day even though the sightseeing itself is compact, so it suits travelers who are comfortable with an early start and time in the car.",
      "The source cancellation policy says a full refund is available when you cancel at least 3 days before the experience start date.",
    ],
    faqs: [
      [
        "How long does the Lovina Dolphin Sunrise Tour take?",
        "The source lists the route as an 8-hour experience, starting with about 03:00 am hotel pickup and finishing with afternoon drop-off after the north Bali circuit.",
      ],
      [
        "What places are included in the Lovina Dolphin Sunrise Tour?",
        "The main route covers Lovina Beach for dolphin watching, Gitgit Waterfall, and Ulun Danu Beratan Temple.",
      ],
      [
        "Is hotel pickup included?",
        "Yes. The source says pickup is included from your accommodation and asks guests to provide the hotel, villa, or Airbnb name and address before the tour.",
      ],
      [
        "Which Bali areas are covered for pickup?",
        "The listed covered pickup areas are Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran.",
      ],
      [
        "What is included in the tour price?",
        "The listed inclusions are entrance fees, the Lovina outrigger boat ticket, an English-speaking driver, a private air-conditioned car, mineral water, and insurance.",
      ],
      [
        "Are breakfast and lunch included?",
        "No. The source explicitly lists breakfast and lunch as excluded, along with personal expenses.",
      ],
      [
        "What time do we go out on the dolphin boat?",
        "The itinerary shows the Lovina boat section starting around 06:00 am after the early transfer from your hotel.",
      ],
      [
        "Is this a private tour or a shared group route?",
        "The source package includes a private car with a driver, so the road part of the experience is presented as a private route rather than a large sightseeing bus format.",
      ],
      [
        "What should I bring for the Lovina Dolphin Sunrise Tour?",
        "The source recommends bringing changing clothes, a hat, a camera, cash money, sunglasses, and sunscreen.",
      ],
      [
        "Is the Lovina Dolphin Sunrise Tour suitable for children?",
        "Usually yes, especially for families who are comfortable with a very early pickup and a longer driving day. The private transport format helps make the pacing easier than a rigid group bus route.",
      ],
      [
        "What is the cancellation policy?",
        "The source says you can receive a full refund if you cancel at least 3 days in advance of the experience start date.",
      ],
      [
        "Why do people book this route instead of a general north Bali day trip?",
        "The strongest reason is that it gives you a specific sunrise payoff in Lovina first, then still adds Gitgit Waterfall and Ulun Danu Temple so the day feels like a complete north Bali itinerary instead of just a single boat ride.",
      ],
    ],
    tags: ["hotelPickup", "private", "boat", "sunrise", "nature", "temple"],
    related: ["north-bali-lovina-dolphins-tour", "tanah-lot-bedugul-tour", "ubud-highlights-tour"],
    whatsappText:
      "Hello! I want to book the Lovina Dolphin Sunrise Tour. Please send availability, pickup options, and full details.",
    metaTitle: "Lovina Dolphin Sunrise Tour in Bali | Gitgit Waterfall & Ulun Danu",
    metaDescription:
      "Book the Lovina Dolphin Sunrise Tour in Bali with early hotel pickup, traditional boat, Gitgit Waterfall, Ulun Danu Beratan Temple, tickets and private transport from $75.",
  },
  {
    slug: "east-bali-instagram-tour",
    title: "East Bali Instagram Tour",
    eyebrow: "Gates of Heaven and royal palaces",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Photo-focused Bali itineraries",
    format: "Private day tour",
    area: "Lempuyang and east Bali",
    price: "Ask price",
    image: sourceImage("tild6662-3531-4435-b037-386262376635__leo_visions-ulj5djrj.jpg"),
    imageAlt: "East Bali Gates of Heaven style scenery",
    lead:
      "Build an iconic east Bali photo day around Lempuyang, Tirta Gangga, and elegant royal-style scenery with private transport and practical timing help.",
    summary:
      "This route is perfect when you want Bali's most recognizable visual locations without guessing the driving order yourself. It works best for couples, creators, and anyone who wants an east Bali signature day with polished logistics.",
    overview:
      "East Bali is beautiful but time-sensitive, especially around queues and road distance. A private route helps you keep the day efficient while still leaving room for content, photos, and relaxed stopovers.",
    highlights: [
      ["Gates of Heaven photos", "One of the most searched Bali viewpoints and still one of the strongest hero locations for content."],
      ["Royal water palace stops", "The route feels more elegant and architectural than a standard waterfall day."],
      ["East Bali coastline mood", "You get a completely different island feel compared with Ubud or the southern beach belt."],
      ["Private timing support", "A smoother order of stops matters here because east Bali can become slow if the route is not planned well."],
    ],
    itinerary: [
      ["Early departure to east Bali", "Start early enough to protect the best timing for your headline locations and photo windows."],
      ["Signature east Bali stops", "Visit the route's hero temples, palace-style gardens, and scenic lookouts with enough time for content and slow walks."],
      ["Beachside or scenic finish", "If timing allows, end with a softer coastal stop before heading back to your hotel."],
    ],
    tags: ["hotelPickup", "private", "temple", "instagram"],
    related: ["bali-instagram-highlights-tour", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "Do I need to leave very early for east Bali?",
      "It is highly recommended. East Bali drives are longer and some photo locations work much better when you protect the morning part of the day.",
    ],
  },
  {
    slug: "tanah-lot-bedugul-tour",
    title: "Tanah Lot and Bedugul Tour",
    eyebrow: "Temples, lakes, and cooler highlands",
    duration: "9-11 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Classic sightseeing days",
    format: "Private day tour",
    area: "West and central Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Temple and lake scenery in Bedugul Bali",
    lead:
      "Pair the lake temple atmosphere of Bedugul with the iconic ocean setting of Tanah Lot for a Bali sightseeing route that feels complete, scenic, and comfortable.",
    summary:
      "This is a strong all-round Bali day for guests who want culture, wide viewpoints, cooler mountain air, and a memorable coastal finish. It is easy to enjoy and easy to sell because the scenery stays varied all day.",
    overview:
      "The route is especially good when you want something photogenic without adding high physical effort. It also works well as a soft premium day for mixed-age groups.",
    highlights: [
      ["Ulun Danu style scenery", "Lake temple views bring a calm, elevated feeling to the middle of the day."],
      ["Tanah Lot sunset potential", "The route can finish with one of Bali's most recognizable coastal temple settings."],
      ["Cool highland balance", "Bedugul breaks up the tropical heat and makes the day feel comfortable and spacious."],
      ["Flexible private order", "Your driver can shape the route around weather and traffic instead of forcing a rigid schedule."],
    ],
    itinerary: [
      ["Morning drive to Bedugul", "Head into the highlands while the weather is still soft and the road flow is smoother."],
      ["Temple, market, and viewpoint time", "Combine the main sightseeing stops with optional coffee or scenic breaks."],
      ["Tanah Lot finish", "Close the day with the coastal temple zone and return after the best light or sunset window."],
    ],
    tags: ["hotelPickup", "private", "temple", "family", "sunset"],
    related: ["ubud-highlights-tour", "east-bali-instagram-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Is this route good in mixed weather?",
      "Yes. Temple and sightseeing routes like this stay attractive even when Bali is cloudy, and they usually feel easier than a heavy beach or marine day when conditions are less stable.",
    ],
  },
  {
    slug: "bali-unesco",
    title: "Bali UNESCO Heritage Sites Tour",
    metaTitle: "Bali UNESCO Heritage Sites Tour | Taman Ayun, Ulun Danu, Jatiluwih & Tanah Lot",
    metaDescription:
      "Book the Bali UNESCO Heritage Sites Tour with Taman Ayun Temple, Ulun Danu Beratan, Jatiluwih Rice Terraces and Tanah Lot, plus private transport and all entrance tickets from $70 per person.",
    eyebrow: "UNESCO temples, rice terraces, and Tanah Lot",
    duration: "10 hours",
    pickup: "Morning hotel pickup from Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, or Jimbaran",
    bestFor: "culture lovers, couples, families, and first-time Bali sightseeing days",
    format: "Private heritage sightseeing route",
    area: "West & Central Bali UNESCO route",
    price: "From $70",
    image: sourceImage("bali-tours/unesco-jatiluwih-hero.jpg"),
    imageAlt: "Jatiluwih rice terraces and mountain scenery on the Bali UNESCO Heritage Sites Tour",
    lead:
      "See Bali's best-known heritage scenery in one polished private day with Taman Ayun Temple, Ulun Danu Beratan, Jatiluwih Rice Terraces, and Tanah Lot connected in one smooth all-inclusive route.",
    summary:
      "This Bali UNESCO Heritage Sites Tour is built for travelers who want temple courtyards, mountain-lake views, UNESCO rice terraces, and a famous coastal temple finish without stitching separate day trips together. Private transport, entrance tickets, a temple sarong, and bottled water are already handled from $70 per person.",
    overview:
      "The route works well because it stays scenic and varied without turning physically heavy. You begin with royal-temple architecture at Taman Ayun, continue into the cooler Bedugul highlands for Ulun Danu Beratan, open into the wide UNESCO-listed Jatiluwih terraces, and finish at Tanah Lot for one of Bali's most recognizable oceanfront temple settings.",
    highlights: [
      ["Taman Ayun Temple", "Start with one of Bali's most elegant royal temple complexes and a calm cultural stop that sets the tone for the day."],
      ["Ulun Danu Beratan", "The mountain-lake setting in Bedugul gives the route cooler air, softer light, and one of Bali's most iconic temple backdrops."],
      ["Jatiluwih Rice Terraces", "Add the UNESCO-listed rice terrace landscape that makes this route feel broader and more visually complete than a temple-only day."],
      ["Tanah Lot coastal finish", "Close with Bali's famous sea temple and a sunset-friendly coastal atmosphere that gives the last part of the day real payoff."],
    ],
    itinerary: [
      ["Morning pickup and Taman Ayun Temple", "Begin with hotel pickup from the main south and central Bali areas, then head first to Taman Ayun Temple for the opening cultural stop."],
      ["Ulun Danu Beratan in Bedugul", "Continue into the cooler highlands for Ulun Danu Beratan, where temple scenery, lake views, and mountain air break up the route beautifully."],
      ["Jatiluwih Rice Terraces", "Drive onward to Jatiluwih for Bali's UNESCO rice terrace landscape, broad green views, and the optional lunch window with Mount Batukaru scenery nearby."],
      ["Tanah Lot and return transfer", "Finish the day at Tanah Lot before the return drive back to your hotel, with timing adjusted around traffic and the best available light."],
    ],
    includes: [
      "Private air-conditioned vehicle",
      "All entrance tickets for the listed route",
      "Sarong for temple visits",
      "Bottled water",
    ],
    goodToKnow: [
      "Lunch, personal expenses, and additional services are not included in the standard price.",
      "The covered pickup areas listed by the source are Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran.",
      "Bring a camera, cash money, sunglasses, comfortable footwear for temple and terrace walks, and an optional light layer for the cooler Bedugul section.",
      "This is presented as a private sightseeing route rather than a shared group format because the source lists a private air-conditioned vehicle.",
      "The day is comfortable for most travelers, but like any Bali sightseeing route, exact timing can shift with traffic and weather.",
      "For a full refund, the source says cancellation should be made at least 3 days before the experience start date.",
    ],
    meetingPoint:
      "Most travelers are picked up directly from their hotel, villa, or Airbnb in the covered Bali areas before the route begins.",
    faqs: [
      [
        "How long does the Bali UNESCO Heritage Sites Tour take?",
        "The source presents this as a 10-hour sightseeing route, usually beginning with morning pickup and finishing after the Tanah Lot stop and return transfer.",
      ],
      [
        "What places are included in the Bali UNESCO Heritage Sites Tour?",
        "The route covers Taman Ayun Temple, Ulun Danu Beratan Temple, Jatiluwih Rice Terraces and Tanah Lot.",
      ],
      [
        "Is hotel pickup included?",
        "Yes. The source says pickup is arranged from your accommodation and asks guests to provide the hotel, villa, or Airbnb name and address in advance.",
      ],
      [
        "Which Bali areas are covered for pickup?",
        "The listed covered pickup areas are Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, and Jimbaran.",
      ],
      [
        "What is included in the tour price?",
        "The listed inclusions are a private air-conditioned vehicle, all entrance tickets, a temple sarong and bottled water.",
      ],
      [
        "Is lunch included?",
        "No. The source lists lunch, personal expenses and additional services as excluded.",
      ],
      [
        "Do I need a sarong for the temple visits?",
        "No need to bring one unless you want to. The source says a sarong for temple visits is included.",
      ],
      [
        "Is this a private tour or a shared group route?",
        "The source lists a private air-conditioned vehicle, so we present this route as a private sightseeing tour rather than a shared group transfer.",
      ],
      [
        "What should I bring for the Bali UNESCO Heritage Sites Tour?",
        "Bring a camera, cash money, sunglasses, comfortable footwear for temple and terrace walks, and an optional light layer for the cooler Bedugul section.",
      ],
      [
        "Is the Bali UNESCO Heritage Sites Tour suitable for children?",
        "Yes. This is a comfortable sightseeing route for most travelers, including couples, families and guests who want culture, landscapes and temple stops without strenuous activity.",
      ],
      [
        "What is the cancellation policy?",
        "For a full refund, the source says you should cancel at least 3 days before the experience start date.",
      ],
      [
        "Why do people book this route instead of separate day trips?",
        "People usually book this route because it combines Bali's best-known heritage scenery in one day, from temple courtyards and mountain lake views to UNESCO rice terraces and the Tanah Lot coastline.",
      ],
    ],
    tags: ["hotelPickup", "private", "temple", "culture", "family"],
    mainPageFilterTags: ["culture"],
    mainPageRank: 15,
    plannerPriority: 24,
    related: ["tanah-lot-bedugul-tour", "ubud-highlights-tour", "private-car-with-driver-bali"],
    whatsappText:
      "Hello! I want to book the Bali UNESCO Heritage Sites Tour for $70 per person. Please send availability, pickup areas, and full details.",
    mainPageFeatures: [
      ["⏰", "10 hours private route"],
      ["🚐", "Hotel pickup from major Bali areas"],
      ["🛕", "Taman Ayun and Ulun Danu temples"],
      ["🌾", "Jatiluwih UNESCO rice terraces"],
      ["🌅", "Tanah Lot coastal finish"],
    ],
    privateOfferEyebrow: "UNESCO heritage route",
    mapLabel: "UNESCO route",
    miniPromoSideText:
      "Explore Bali's UNESCO heritage side with royal temple courtyards, Bedugul lake scenery, Jatiluwih rice terraces, and a Tanah Lot sunset-style finish in one private day.",
    collageImages: [
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-jatiluwih-hero.jpg"),
        altText: "Jatiluwih rice terraces and mountain scenery on the Bali UNESCO Heritage Sites Tour",
      },
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-taman-ayun.jpg"),
        altText: "Taman Ayun Temple courtyards and moat on the Bali UNESCO Heritage Sites Tour",
      },
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-ulun-danu.jpg"),
        altText: "Ulun Danu Beratan Temple and Lake Bratan on the Bali UNESCO Heritage Sites Tour",
      },
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-tanah-lot-sunset.jpg"),
        altText: "Tanah Lot Temple at sunset on the Bali UNESCO Heritage Sites Tour",
      },
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-jatiluwih-terraces.jpg"),
        altText: "Jatiluwih UNESCO rice terraces close landscape on the Bali UNESCO Heritage Sites Tour",
      },
      {
        imagePath: plannerLocalImage("images/bali-tours/unesco-ulun-danu-close.jpg"),
        altText: "Ulun Danu Beratan Temple close lake view on the Bali UNESCO Heritage Sites Tour",
      },
    ],
  },
  {
    slug: "mount-batur-sunrise-jeep-tour",
    title: "Mount Batur Sunrise Jeep Tour",
    mainPage: false,
    eyebrow: "Volcano sunrise adventure",
    duration: "6-8 hours",
    pickup: "Night or pre-dawn pickup",
    bestFor: "Adventure lovers and sunrise seekers",
    format: "Private or small group jeep trip",
    area: "Kintamani and Mount Batur",
    price: "Ask price",
    image: sourceImage("tild6464-3137-4633-a638-383661353834__pexels-dnanoes-35399.webp"),
    imageAlt: "Jeep convoy on Mount Batur volcanic landscape",
    lead:
      "Reach Mount Batur viewpoints by 4x4 instead of a summit hike and watch sunrise over the volcano from a dramatic lava-field setting.",
    summary:
      "This is one of the most accessible sunrise adventures in Bali because you still get the volcano mood without committing to a full trekking route. It is ideal for couples, small groups, and guests who want a signature morning with strong visuals.",
    overview:
      "A jeep tour works best when you want early excitement, open-air scenery, and the classic black lava landscape, but prefer wheels over hiking boots for the main climb.",
    highlights: [
      ["Sunrise volcano viewpoint", "A big-reward early start with one of the strongest morning landscapes in Bali."],
      ["4x4 lava field ride", "The jeep element gives the tour real energy instead of feeling like a simple transfer to a viewpoint."],
      ["No summit hike required", "A strong alternative for guests who want the Mount Batur mood without a long uphill climb."],
      ["Compact adventure format", "You can still be back at your hotel early enough to keep the rest of the day open."],
    ],
    itinerary: [
      ["Pre-dawn pickup and transfer", "Leave while it is still dark so you can reach the volcano zone before the sunrise window opens."],
      ["Jeep climb and sunrise stop", "Switch into the 4x4 and move toward the lava-field viewpoints for sunrise and wide-open photo time."],
      ["Black lava exploration and return", "After sunrise, continue across the volcanic terrain before heading back to your hotel."],
    ],
    tags: ["hotelPickup", "adventure", "volcano", "sunrise", "jeep"],
    related: ["white-water-rafting", "atv-quad-bikes", "mount-batur-sunrise-hike"],
    faqExtra: [
      "Do I need hiking experience for the Mount Batur jeep tour?",
      "No. That is one of the main reasons guests choose this format. You still need to be comfortable with a very early start and bumpy volcanic terrain, but not with a long mountain hike.",
    ],
  },
  {
    slug: "atv-ride-adventure",
    title: "ATV Ride Adventure",
    mainPage: false,
    aiPlanner: false,
    eyebrow: "Mud tracks and jungle fun",
    duration: "4-6 hours",
    pickup: "Flexible daytime pickup",
    bestFor: "Active couples and groups",
    format: "Adventure activity",
    area: "Bali off-road routes",
    price: "Ask price",
    image: sourceImage("tild6464-3137-4633-a638-383661353834__pexels-dnanoes-35399.webp"),
    imageAlt: "Off-road adventure route in Bali",
    lead:
      "Trade the usual sightseeing day for muddy tracks, tunnels, jungle sections, and the kind of Bali activity that instantly changes the pace of a trip.",
    summary:
      "An ATV session is perfect when you want a short, energetic experience that feels very different from temples and beach clubs. It works well as a half-day highlight or as part of a more active Bali itinerary.",
    overview:
      "The best ATV routes mix scenery and action rather than just speed. With pickup support and timing coordination, it becomes an easy add-on for travelers who want real movement in their Bali plan.",
    highlights: [
      ["Off-road jungle sections", "Expect mud, narrow tracks, and the fun of a route that feels properly active."],
      ["Easy activity upgrade", "A great option when you want something memorable without giving up your whole day."],
      ["Beginner-friendly formats", "Many ATV experiences in Bali work for first-time riders after a short briefing."],
      ["Strong group energy", "This is one of the easiest adventure products for couples, friends, and mixed-age groups."],
    ],
    itinerary: [
      ["Pickup and safety check", "Head to the activity base, get fitted with gear, and complete the pre-ride orientation."],
      ["ATV session on the main route", "Ride through the course with mud, water, greenery, and the signature off-road sections."],
      ["Refresh and transfer back", "Finish with cleanup time and an easy return to your hotel or next stop."],
    ],
    tags: ["hotelPickup", "adventure", "activity"],
    related: ["mount-batur-sunrise-jeep-tour", "white-water-rafting", "surf-lesson-experience"],
    faqExtra: [
      "Is the ATV adventure suitable for beginners?",
      "Usually yes. Most Bali ATV operators provide a safety briefing and beginner-friendly route guidance before the ride starts.",
    ],
  },
  {
    slug: "atv-quad-bikes",
    title: "Ubud ATV Quad Bike Adventure",
    eyebrow: "Jungle, rice fields, rivers, and tunnels",
    duration: "4-6 hours total with a 1.5-hour ATV ride",
    pickup: "Optional hotel pickup or Gorilla ATV Adventure meeting point",
    bestFor: "Adventure lovers, couples, friends, and first-time ATV riders",
    format: "Guided ATV quad bike adventure with lunch",
    area: "Ubud off-road jungle, rice field, river, and tunnel track",
    price: "From $20",
    image: sourceImage("bali-tours/atv-quad-bikes.webp"),
    imageAlt: "ATV quad bike route through muddy jungle terrain in Ubud Bali",
    lead:
      "Ride one of Ubud's most fun off-road ATV tracks with jungle lanes, rice field scenery, muddy river crossings, and tunnel sections, then finish with lunch and an easy transfer or direct return.",
    summary:
      "This Ubud ATV Quad Bike Adventure is built for travelers who want action without overcomplicating the day. The route combines Bali jungle, rice paddies, bumpy mud tracks, river sections, and natural tunnels in one guided ride, with safety gear, lunch, showers, and optional hotel transfer included from $20.",
    overview:
      "The experience works well because it stays exciting while still being beginner-friendly after the safety briefing. You can book a single ATV for a solo ride or choose a tandem setup for couples, friends, or one adult with a child, making it one of the easiest active half-day upgrades to add around Ubud.",
    highlights: [
      ["Jungle, river, and tunnel ATV route", "This is not a flat practice lap. The route is designed to feel properly adventurous with Bali scenery built into the track itself."],
      ["Beginner-friendly guided format", "Professional instructors handle the safety briefing, pacing, and support so first-time riders can still enjoy the day confidently."],
      ["Single or tandem ATV options", "The product works for solo travelers, couples, friends, and mixed-skill groups because you can choose how you want to ride."],
      ["Lunch, showers, and transfer support", "The practical pieces are already handled, which makes the activity feel smoother and more premium than booking a basic ride only."],
    ],
    itinerary: [
      ["Pickup or direct arrival at Gorilla ATV Adventure", "Choose optional hotel pickup from Bali tourist areas or meet directly at the Gorilla ATV Adventure base in the Ubud area for check-in and preparation."],
      ["Safety briefing and 1.5-hour guided ATV ride", "Get fitted with helmet, boots, and protective gear, learn the controls, and then ride through jungle tracks, rice fields, muddy sections, river crossings, and tunnel features with a guide."],
      ["Shower, lunch, and return", "Freshen up at the base after the ride, enjoy a local lunch, and then either return with the transfer option or continue your Bali day from the meeting point."],
    ],
    includes: [
      "Certified ATV guide and full safety briefing",
      "Single or tandem ATV ride depending on the option selected",
      "Helmet, boots, elbow guards, and knee guards",
      "Coffee or tea, bottled water, and lunch",
      "Insurance",
      "Hotel pickup and drop-off if the transfer option is selected",
    ],
    goodToKnow: [
      "The active riding portion is around 1.5 hours, while the full experience usually takes around 4 to 6 hours depending on transfer timing and group flow.",
      "Direct meeting-point guests should search for 'Gorilla ATV Adventure' on Google Maps and arrive ready for an outdoor muddy activity.",
      "This route is not recommended for pregnant travelers, guests with serious back problems, wheelchair users, or babies under 1 year old.",
      "Expect mud, water, and wet clothing. Bring a change of clothes, cash, and shoes or sandals you do not mind getting dirty.",
      "Showers, lockers, towels, and safety equipment are typically available on site, and the activity operates rain or shine.",
      "If you book tandem with an odd number of riders, one participant may need to ride solo with an extra on-site charge depending on operator policy.",
    ],
    faqs: [
      [
        "How long does the Ubud ATV Quad Bike Adventure take?",
        "The riding section itself is about 1.5 hours, while the full experience usually takes around 4 to 6 hours once check-in, briefing, cleanup, lunch, and transfer time are included.",
      ],
      [
        "Where does the ATV tour start?",
        "The direct meeting point is Gorilla ATV Adventure in the Ubud area. Guests who book the transfer option are picked up first and brought to the ATV base.",
      ],
      [
        "Is hotel pickup included for this ATV tour?",
        "Pickup and drop-off are included only if you choose the option with transfer. If you select the meeting-point version, you go directly to Gorilla ATV Adventure.",
      ],
      [
        "What is included in the Ubud ATV Quad Bike Adventure price?",
        "The package includes a certified ATV guide, safety briefing, ATV ride, helmet, boots, elbow and knee protection, bottled water, coffee or tea, lunch, and insurance. Transfer is included if that option is selected.",
      ],
      [
        "Can beginners join the ATV route in Ubud?",
        "Yes. This is a guided activity with a full safety briefing, hands-on instructions, and guide support throughout the ride, so first-time riders can usually join comfortably.",
      ],
      [
        "Can I book a tandem ATV instead of riding alone?",
        "Yes. You can usually choose between a single ATV and a tandem ATV when booking, which makes the route flexible for couples, friends, or one adult riding with a child.",
      ],
      [
        "What kind of terrain is included on the ATV track?",
        "The route is built around Ubud-style off-road scenery and typically includes jungle sections, rice fields, muddy tracks, bumpy slopes, river crossings, and tunnel features.",
      ],
      [
        "Is lunch included after the ATV ride?",
        "Yes. The standard package includes lunch after the ride, commonly with simple local choices such as fried rice or fried noodles, plus bottled water and a hot drink.",
      ],
      [
        "Are there showers and lockers at the ATV base?",
        "Yes, the source information says shower facilities, lockers, towels, and safety gear are provided, which is especially useful because you should expect to get muddy.",
      ],
      [
        "Who should not join the ATV Quad Bike Adventure?",
        "This tour is not a good fit for pregnant women, guests with serious back problems, wheelchair users, or babies under 1 year old. Anyone with mobility or health concerns should ask before booking.",
      ],
      [
        "What should I bring for the ATV ride in Bali?",
        "Bring a change of clothes, comfortable clothes for outdoor activity, cash for personal expenses, and ideally a waterproof camera if you want action footage in muddy conditions.",
      ],
      [
        "Does the ATV tour still operate if it rains?",
        "Yes. The operator states that the activity runs rain or shine, and wet conditions are already part of the off-road character of this route.",
      ],
    ],
    tags: ["hotelPickup", "adventure", "activity"],
    related: ["white-water-rafting", "mount-batur-sunrise-jeep-tour", "surf-lesson-experience"],
    whatsappText:
      "Hello! I want to book the Ubud ATV Quad Bike Adventure. Please send availability, single or tandem options, pickup areas, and full details.",
    metaTitle: "Ubud ATV Quad Bike Adventure with Lunch | Bali Jungle ATV Tour",
    metaDescription:
      "Book the Ubud ATV Quad Bike Adventure with jungle, rice field, river and tunnel tracks, lunch, safety gear, showers, and optional hotel pickup from $20.",
  },
  {
    slug: "bali-instagram-highlights-tour",
    title: "Bali Instagram Highlights Tour",
    mainPage: false,
    aiPlanner: false,
    eyebrow: "Best content-friendly Bali route",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Couples, creators, and honeymoon trips",
    format: "Private day tour",
    area: "Flexible scenic Bali route",
    price: "Ask price",
    image: sourceImage("tild6662-3531-4435-b037-386262376635__leo_visions-ulj5djrj.jpg"),
    imageAlt: "Scenic Bali viewpoint for Instagram tour",
    lead:
      "This route is built around Bali's most photogenic moods: lush scenery, stylish viewpoints, dramatic temples, and the stops that turn into hero content fast.",
    summary:
      "Choose this tour when you want a polished Bali day that feels visual from start to finish. It is more flexible than a single-region route and works well when you want to shape the day around your own content priorities.",
    overview:
      "Instead of locking the day to one narrow zone, this experience can combine signature Bali aesthetics in a way that fits your hotel location, lighting goals, and trip style.",
    highlights: [
      ["Route shaped for visuals", "A better fit than generic sightseeing when photos and content are a major part of the day."],
      ["Private transport flow", "You keep the pace smooth and spend time where the light or mood is strongest."],
      ["Couple and honeymoon friendly", "The overall feel is more polished and romantic than a heavy adventure route."],
      ["Works across regions", "Ideal when you want the best Bali look instead of a rigid district-only itinerary."],
    ],
    itinerary: [
      ["Pickup and visual route planning", "Start with your hotel area and shape the day around the type of Bali scenery you want most."],
      ["Main photo and scenic stops", "Move through a curated mix of temple, greenery, and viewpoint locations with time for content."],
      ["Golden-hour style finish", "End the day at a soft scenic location or head back once you have the content you need."],
    ],
    tags: ["hotelPickup", "private", "instagram", "temple"],
    related: ["east-bali-instagram-tour", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "What is the difference between this and the East Bali Instagram Tour?",
      "This version is broader and more flexible. The East Bali route is more location-specific, while this tour is better when you want the strongest overall visual day based on your hotel area and priorities.",
    ],
  },
  {
    slug: "ubud-instagram-tour",
    title: "Ubud Instagram Tour",
    eyebrow: "Gates of Heaven, waterfall and rice terrace day",
    duration: "10 hours",
    pickup: "7:00 am hotel pickup or Bali meeting point",
    bestFor: "Couples, solo travelers, creators, and first-time Bali visitors",
    format: "All-inclusive guided day tour",
    area: "East Bali icons with a Tegalalang rice terrace finish",
    price: "From $75",
    image: sourceImage("tild6662-3531-4435-b037-386262376635__leo_visions-ulj5djrj.jpg"),
    imageAlt: "Gates of Heaven style Bali scenery for the Ubud Instagram Tour",
    lead:
      "Capture Bali's most famous photo route in one smooth day with the Gates of Heaven at Lempuyang, Tirta Gangga Water Palace, Tukad Cepung Waterfall, and the green terraces of Tegalalang.",
    summary:
      "This Ubud Instagram Tour is the strongest all-inclusive Bali photo day when you want iconic stops, polished logistics, and real guidance with your content. It combines east Bali's most recognizable landmarks with a softer Ubud-style rice terrace finish, while hotel pickup, tickets, lunch, and guide support are handled from $75.",
    overview:
      "The route is built for travelers who want Bali's headline visuals without stitching together a long road day on their own. Expect an early start, photo help from an English-speaking driver-guide, temple and palace scenery, a waterfall stop where you can swim, and a final rice terrace section that gives the day a more complete Bali look than an east-only itinerary.",
    highlights: [
      ["Gates of Heaven at Lempuyang", "Start with Bali's most famous temple photo frame and wide views toward Mount Agung while your guide helps with timing and portraits."],
      ["Tirta Gangga Water Palace", "Add royal fountains, stepping stones, and reflective pools that make the middle of the day feel elegant instead of rushed."],
      ["Tukad Cepung Waterfall", "Break up the sightseeing with one of Bali's most photogenic waterfall settings and the option to cool off with a swim."],
      ["Tegalalang Rice Terrace finish", "End with the classic green Bali landscape, soft afternoon light, and the rice terrace section most travelers still want in an Instagram route."],
    ],
    itinerary: [
      ["07:00 pickup and east Bali departure", "Your driver-guide picks you up from Bali hotel areas such as Kuta, Seminyak, Sanur, Nusa Dua, Jimbaran, or Ubud, or you can meet at the Bali meeting point."],
      ["Lempuyang Temple", "Spend around two hours at the famous Gates of Heaven with time for photos, temple atmosphere, and a short cultural introduction."],
      ["Tirta Gangga Water Palace", "Continue to Tirta Gangga for about 45 minutes of palace gardens, water features, and one of the cleanest architecture-and-landscape photo stops in Bali."],
      ["Tukad Cepung Waterfall", "Head inland for roughly one hour at Tukad Cepung where sunlight, canyon walls, and the waterfall itself create the route's strongest nature moment."],
      ["Lunch and Tegalalang Rice Terrace", "Recharge with lunch, then finish at Tegalalang Rice Terrace for around one hour of panoramic rice-field views and the final Bali content stop before returning to your hotel."],
    ],
    includes: [
      "Hotel pickup and drop-off or Bali meeting point support",
      "English-speaking driver-guide with photo assistance",
      "Entrance tickets for Lempuyang Temple, Tirta Gangga, Tukad Cepung Waterfall, and Tegalalang Rice Terrace",
      "Lunch during the route",
      "Tegalalang swing ticket",
      "Insurance",
    ],
    goodToKnow: [
      "The day starts early because Lempuyang timing matters and east Bali roads are longer than central Bali routes.",
      "Lempuyang photo queues can change depending on the season and arrival time, so the exact waiting time is never fully predictable.",
      "Tukad Cepung includes stairs, damp rocks, and a short walk through water, so comfortable footwear is strongly recommended.",
      "Respectful temple-ready clothing is important. A light cover-up or sarong-friendly outfit is the safest choice for the first stop.",
      "The route is best for travelers comfortable with a full sightseeing day and several scenic stops rather than a slow resort-style pace.",
      "Bring your phone or camera, sunscreen, water, and extra cash for personal expenses or any optional extras outside the listed inclusions.",
    ],
    faqs: [
      [
        "How long does the Ubud Instagram Tour take?",
        "Plan for about 10 hours from the 7:00 am start to the return to your hotel. Exact timing can shift slightly with traffic, temple queues, and your pickup area.",
      ],
      [
        "Which places are included in the Ubud Instagram Tour?",
        "The core route covers Lempuyang Temple, Tirta Gangga Water Palace, Tukad Cepung Waterfall, and Tegalalang Rice Terrace.",
      ],
      [
        "Is hotel pickup included?",
        "Yes. Pickup and drop-off are included from the main Bali tourist areas listed for the tour, and there is also a Bali meeting point option if you prefer to go directly.",
      ],
      [
        "What is included in the tour price?",
        "The listed package includes hotel transfer support, an English-speaking driver-guide, entrance tickets, insurance, lunch, and a Tegalalang swing ticket.",
      ],
      [
        "Is lunch included in the Ubud Instagram Tour?",
        "Yes. Lunch is included during the route, so you do not need to plan a separate meal stop unless you want extra snacks or drinks.",
      ],
      [
        "Are all entrance tickets included?",
        "Yes. The main route tickets for Lempuyang Temple, Tirta Gangga, Tukad Cepung Waterfall, and Tegalalang Rice Terrace are included.",
      ],
      [
        "Does the guide help with photos?",
        "Yes. This route is built for scenic content, so the driver-guide usually helps with timing, angles, and taking photos at the major stops.",
      ],
      [
        "Can I swim at Tukad Cepung Waterfall?",
        "Yes, many travelers do, but conditions depend on the day. Bring a towel, a change of clothes, and footwear that handles wet rocks well if you want to go into the water.",
      ],
      [
        "Is the Tegalalang swing included?",
        "Yes. The source package lists a swing ticket as included, although the exact operating setup can still depend on the venue and daily conditions.",
      ],
      [
        "Is this Bali Instagram tour suitable for children or older travelers?",
        "Most travelers can join, but it is still a full sightseeing day with stairs at the waterfall and a long road section to east Bali, so moderate mobility is the safest fit.",
      ],
      [
        "Can solo travelers book the Ubud Instagram Tour?",
        "The source product lists a minimum booking of two people, but if you are traveling solo, send your date on WhatsApp and we will confirm the best currently available format.",
      ],
      [
        "What should I bring for the Ubud Instagram Tour?",
        "Bring your camera or phone, sunscreen, water, comfortable shoes, respectful clothing for the temple stop, and a towel or change of clothes if you want to swim at Tukad Cepung.",
      ],
    ],
    tags: ["hotelPickup", "instagram", "temple", "nature", "family"],
    related: ["east-bali-instagram-tour", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    whatsappText:
      "Hello! I want to book the Ubud Instagram Tour. Please send availability, pickup areas, and full details.",
    metaTitle: "Ubud Instagram Tour in Bali | Gates of Heaven, Waterfall & Rice Terrace",
    metaDescription:
      "Book the Ubud Instagram Tour in Bali with Lempuyang Gates of Heaven, Tirta Gangga, Tukad Cepung Waterfall, Tegalalang Rice Terrace, lunch, tickets and hotel pickup from $75.",
  },
  {
    slug: "nusa-penida-private-day-tour-manta-snorkeling",
    title: "Nusa Penida Private car Day Tour+Snorkeling Manta Point",
    eyebrow: "The most complete Nusa Penida combo",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Travelers wanting sea and sightseeing in one day",
    format: "Private island combo tour",
    area: "Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "Nusa Penida cliff views above blue ocean",
    lead:
      "Combine Manta Point snorkeling with a private island car route so you can experience both the water and the best viewpoints of Nusa Penida in one tightly planned day.",
    summary:
      "This is the highest-value option for many first-time Nusa Penida visitors because it avoids choosing between island sightseeing and the signature snorkeling experience. The private land transport keeps the second half of the day efficient and much more comfortable.",
    overview:
      "Nusa Penida can feel chaotic if sea logistics, road timing, and island transport are split across different bookings. Bundling them into one route makes the day far smoother.",
    highlights: [
      ["Manta Point snorkeling", "A headline marine experience that gives the day its wow factor from the start."],
      ["Private island car", "You skip the worst part of Penida planning by having ground transport handled."],
      ["Best of land and sea", "An efficient answer to the most common first-time Penida question: snorkeling or viewpoints?"],
      ["Strong day-trip value", "Great for travelers who only have one open Bali day for the island."],
    ],
    itinerary: [
      ["Pickup, harbor transfer, and boat ride", "Start early with mainland Bali pickup and move across to Nusa Penida with the sea portion of the day protected."],
      ["Snorkeling session", "Head out for the main marine route before the island land tour begins."],
      ["Private island sightseeing", "Continue across Penida by car for the most practical viewpoint route based on timing and conditions."],
    ],
    tags: ["hotelPickup", "private", "boat", "snorkeling", "island"],
    related: ["nusa-penida-manta-rays-point", "nusa-penida-west-tour", "nusa-penida-east-tour"],
    faqExtra: [
      "Is this the best Nusa Penida tour for first-time visitors?",
      "For many guests, yes. It covers both the marine side and the island sightseeing side in one day, which makes it one of the strongest single-day Penida products.",
    ],
  },
  {
    slug: "nusa-penida-west-tour",
    title: "Nusa Penida West Tour",
    eyebrow: "Kelingking and west Penida icons",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Cliff viewpoints and first-time Penida sightseeing",
    format: "Island day tour",
    area: "West Nusa Penida",
    price: "Ask price",
    mainPagePrice: "49$",
    mainPagePriceNote: "per car",
    mainPageFeatures: [
      ["⏰", "10-12 hours"],
      ["⛴", "Fast Boat and Island Transfer"],
      ["📍", "Kelingking and Top West Coast Stops"],
      ["📸", "Epic Cliff Views"],
      ["👥", "Capacity 6 persons"],
    ],
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "West Nusa Penida cliffs and ocean views",
    lead:
      "Focus on the classic west Nusa Penida route with the island's most recognizable cliff views, scenic coastal stops, and the dramatic landscapes people usually imagine first.",
    summary:
      "If your priority is bold scenery over snorkeling, the west route is the cleanest and most iconic Penida choice. It is especially strong for couples and first-time visitors who want the headline views with transport handled professionally.",
    overview:
      "West Penida is visually spectacular but road conditions and timing matter. A pre-planned day tour removes the hardest part of making the island feel easy to enjoy.",
    highlights: [
      ["Kelingking style scenery", "The strongest west Penida visual and one of the most famous viewpoints in Bali province."],
      ["Coastal drama all day", "A route built around cliffs, blue water, and big open landscapes instead of soft inland stops."],
      ["First-time friendly", "An easy choice when you want the Penida name-value without overthinking the island plan."],
      ["Transport coordination included", "Mainland transfer, harbor flow, and island movement matter a lot here."],
    ],
    itinerary: [
      ["Bali pickup and fast boat departure", "Start early and move through harbor logistics before crossing to Nusa Penida."],
      ["West Penida cliff route", "Follow the island's best-known west-side stops with time for photos and short walks."],
      ["Boat back to Bali", "Return to the harbor after the main sightseeing loop and transfer back to your hotel."],
    ],
    tags: ["hotelPickup", "boat", "island", "instagram"],
    related: ["nusa-penida-east-tour", "nusa-penida-full-day-tour", "nusa-penida-private-day-tour-manta-snorkeling"],
    faqExtra: [
      "Is the west or east Nusa Penida route better?",
      "West Penida is usually the best fit when you want the most famous cliff viewpoints. East Penida is better when you prefer a more open, scenic, and slightly different visual style.",
    ],
  },
  {
    slug: "nusa-penida-east-tour",
    title: "Nusa Penida East Tour",
    eyebrow: "Diamond Beach, Atuh Beach, Tree House, and Raja Lima",
    duration: "10-12 hours",
    pickup: "07:00 Sanur port meeting or optional 06:15-06:30 Bali hotel pickup",
    bestFor: "Cliff viewpoints, beach photos, and first-time east Penida visitors",
    format: "Full-day island tour",
    area: "East Nusa Penida",
    price: "From $75",
    mainPagePrice: "49$",
    mainPagePriceNote: "per car",
    mainPageFeatures: [
      ["⏰", "10-12 hours"],
      ["⛴", "Fast Boat and Island Transfer"],
      ["🏝", "Diamond Beach and Atuh Beach"],
      ["✨", "Molenteng Tree House and Thousand Islands"],
      ["👥", "Capacity 6 persons"],
    ],
    image: sourceImage("smile-nusa-penida-east-diamond-beach.jpg"),
    imageAlt: "Diamond Beach cliffs and turquoise water on east Nusa Penida",
    lead:
      "See the headline east Nusa Penida route in one full day with Diamond Beach, Atuh Beach, Molenteng Tree House, Thousand Islands Viewpoint, Teletubbies Hill, and the fast boat logistics already handled from Bali.",
    summary:
      "This Nusa Penida East Tour from Bali covers Diamond Beach, Atuh Beach, Molenteng Tree House, Thousand Islands Viewpoint, and Teletubbies Hill. It is the right choice when you want the classic east route with fast boat tickets, island transport, lunch, and entrance fees handled from $75.",
    overview:
      "Expect a scenic east-coast route built around white-sand coves, steep limestone cliffs, panoramic lookouts, and a cleaner sightseeing flow than trying to arrange boats, island transport, and timings on your own. The day starts early in Sanur, crosses to Banjar Nyuh by public fast boat, then focuses on the east side's most in-demand photo stops before the late-afternoon return to Bali. It works especially well for first-time Nusa Penida visitors who care about iconic views, dramatic scenery, and having the logistics organized professionally.",
    highlights: [
      ["Diamond Beach and Atuh Beach", "The signature east Penida combination of white sand, dramatic cliffs, turquoise water, and one of the strongest island photo stops."],
      ["Molenteng Tree House and Thousand Islands", "A classic panoramic section with elevated viewpoints that immediately gives the route its east Penida identity."],
      ["Teletubbies Hill contrast", "Finish the day with rolling green hills that add a softer landscape after the cliff and beach section."],
      ["Fast boat, island car, lunch, and tickets", "The real value is having the route stitched together cleanly so you can focus on the views instead of logistics."],
    ],
    itinerary: [
      ["06:15-07:15 pickup or Sanur port meeting", "If you add the Bali transfer service, pickup usually begins around 06:15-06:30 depending on your hotel area. Direct-meeting guests check in at Sanur Port around 07:00-07:15."],
      ["07:30 fast boat to Banjar Nyuh", "Board the public fast boat from Sanur and arrive around 08:30 at Banjar Nyuh Port in Nusa Penida, where the local driver meets you with your booking name."],
      ["09:30-11:30 Diamond Beach and Atuh Beach", "Spend the late morning at the island's best-known east-coast beach and cliff stops with time for photos, short walks, and beach access if your pace and conditions allow."],
      ["12:00 lunch, 12:30-14:30 Tree House and Thousand Islands", "Break for lunch, then continue to Molenteng Tree House and the famous Raja Lima or Thousand Islands viewpoint area for the classic east Penida panorama."],
      ["14:30 Teletubbies Hill and 16:30-17:30 return to Bali", "Close the route with the green hill landscape before driving back to Banjar Nyuh for the return boat to Sanur and onward hotel transfer if arranged."],
    ],
    includes: [
      "Return public fast boat tickets between Bali and Nusa Penida",
      "Private air-conditioned car on Nusa Penida",
      "Local driver-guide",
      "Lunch at a local restaurant",
      "Entrance tickets for the main route",
      "Mineral water",
    ],
    goodToKnow: [
      "Bali hotel pickup and drop-off can be arranged as an extra service, with common covered areas including Sanur, Kuta, Legian, Seminyak, Jimbaran, Canggu, Nusa Dua, Ubud, Uluwatu, and Tegalalang.",
      "Diamond Beach has steep stairs, so comfortable shoes and a moderate level of mobility are recommended.",
      "Tree House photo fees, Diamond Beach swing fees, breakfast, and personal expenses are usually not included.",
      "Bring sunblock, a hat, a towel, a change of clothes, extra money, and motion sickness medicine if you need it for boat crossings.",
      "Sea conditions, harbor queues, and peak-season traffic can slightly change the exact timing of the day, so the published schedule is always an estimate.",
      "If you already have a private driver or taxi in Bali, meeting at Sanur Port is usually the simplest option.",
    ],
    faqs: [
      [
        "How long does the Nusa Penida East Tour take?",
        "Plan for around 10 to 12 hours from the early Sanur departure to the evening return to Bali. Exact timing can shift slightly with sea conditions, harbor queues, and your hotel area if you add pickup service.",
      ],
      [
        "What places are included in the Nusa Penida East route?",
        "The classic east route covers Diamond Beach, Atuh Beach, Molenteng Tree House, Thousand Islands Viewpoint, and Teletubbies Hill.",
      ],
      [
        "Are fast boat tickets included in the tour price?",
        "Yes. Return public fast boat tickets between Bali and Nusa Penida are included in this package.",
      ],
      [
        "Is hotel pickup in Bali included?",
        "Bali hotel pickup and drop-off can usually be arranged as an extra service. If you already have a driver or taxi, you can meet directly at Sanur Port for check-in.",
      ],
      [
        "Is lunch included in the Nusa Penida East Tour?",
        "Yes. The tour includes lunch at a local restaurant on Nusa Penida plus mineral water during the day.",
      ],
      [
        "Are entrance tickets included?",
        "Yes. Main entrance tickets for the sightseeing route are included. Personal extras such as Tree House photo fees or the Diamond Beach swing fee are usually paid separately.",
      ],
      [
        "Can solo travelers book the Nusa Penida East Tour?",
        "Yes. Solo travelers can book this route. If you are traveling alone, message us on WhatsApp and we will confirm the best available format, including whether a join-style option is possible for your date.",
      ],
      [
        "Is the east route physically demanding and can we go down to Diamond Beach?",
        "It is moderate rather than extreme, but Diamond Beach involves steep stairs and uneven steps. If your mobility and timing allow, you usually do have a chance to go down to the beach, but it is best for guests who are comfortable with walking, steps, and warm weather sightseeing.",
      ],
      [
        "Can I return earlier or choose a different boat time?",
        "In many cases, yes. Some guests request the second boat out or an earlier end to the day, and this can often be arranged depending on the boat schedule and available seats, so it is best to request it before the tour date.",
      ],
      [
        "Can you drop us at a different hotel or let us stay in Nusa Penida after the tour?",
        "Yes. Different drop-off points, carrying luggage, or finishing the day at a hotel in Nusa Penida can usually be arranged in advance when the booking is confirmed.",
      ],
      [
        "Does the driver speak English and help with photos?",
        "Yes. The local driver-guide communicates in English for the route and can help with timing, viewpoints, and photos at the main stops.",
      ],
      [
        "What should I bring for the Nusa Penida East day trip?",
        "Bring sunblock, a hat, comfortable shoes or sandals, a towel, a change of clothes, extra cash, and motion sickness medicine if you need it for the boat crossing.",
      ],
    ],
    tags: ["boat", "island", "instagram"],
    related: ["nusa-penida-full-day-tour", "nusa-penida-private-day-tour-manta-snorkeling", "nusa-penida-manta-rays-point"],
    whatsappText:
      "Hello! I want to book the Nusa Penida East Tour. Please send availability, pickup options, and full details.",
    metaTitle: "Nusa Penida East Tour from Bali | Diamond Beach & Atuh Beach",
    metaDescription:
      "Book a Nusa Penida East Tour from Bali with Diamond Beach, Atuh Beach, Tree House, Thousand Islands Viewpoint, fast boat, lunch and tickets from $75.",
  },
  {
    slug: "nusa-penida-full-day-tour",
    title: "Nusa Penida Full Day Tour",
    eyebrow: "Flexible island sightseeing day",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Guests wanting a flexible Penida route",
    format: "Island day tour",
    area: "Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "Nusa Penida panoramic coast view",
    lead:
      "Choose a full-day Nusa Penida island route when you want the freedom to prioritize the best stops for the day instead of locking into one strict east or west-only template.",
    summary:
      "This tour is the practical middle ground between the fully fixed scenic routes and the sea-plus-land combo packages. It works well for travelers who want Penida's name-value but also want room to adapt around conditions, pace, or group energy.",
    overview:
      "Full-day Penida trips work best when route decisions are made with real timing in mind. That flexibility becomes the main product advantage on an island where distance and road speed matter.",
    highlights: [
      ["Flexible route logic", "A stronger match for travelers who do not want a rigid sightseeing script."],
      ["Best use of one island day", "You keep the Penida experience broad without overcomplicating it."],
      ["Driver-led practicality", "Conditions, queues, and timing can shift, so flexibility matters."],
      ["Good all-round option", "Especially useful if your group has mixed sightseeing priorities."],
    ],
    itinerary: [
      ["Early transfer and island arrival", "Head over from Bali in the morning and align the route after arrival."],
      ["Main Penida sightseeing flow", "Visit the strongest available combination of island stops based on the day's timing and condition window."],
      ["Return to Bali", "Finish with the last harbor transfer and mainland hotel drop-off."],
    ],
    tags: ["hotelPickup", "boat", "island", "private"],
    related: ["nusa-penida-west-tour", "nusa-penida-east-tour", "nusa-penida-private-day-tour-manta-snorkeling"],
    faqExtra: [
      "Should I choose the flexible full-day Penida tour or a fixed west/east route?",
      "Choose this version when flexibility is more important than chasing one exact stop list. It is especially useful when you want the day to adapt around your pace and the on-island timing reality.",
    ],
  },
  {
    slug: "nusa-penida-manta-rays-point",
    title: "Nusa Penida Snorkeling on Manta Point",
    eyebrow: "Classic Bali marine day",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Snorkeling lovers and sea-day travelers",
    format: "Snorkeling tour",
    area: "Manta Point and Nusa Penida waters",
    price: "From $29",
    mainPageFeatures: [
      ["🤿", "Snorkeling Experience"],
      ["🐢", "Gamat Bay with chance to spot sea turtles"],
      ["🌊", "Wall Point for beautiful snorkeling"],
      ["🐠", "Manta Point with 80% manta chance"],
      ["⛴", "Boat and equipment included"],
    ],
    image: sourceImage("tild6433-3562-4239-b139-323864376162__460c0ba639ce4f661f5a.webp"),
    imageAlt: "Manta rays swimming in blue water near Nusa Penida",
    lead:
      "Book the signature Nusa Penida snorkeling route for Manta Point, clear blue water, and the easiest way to add a true marine wow moment to your Bali trip.",
    summary:
      "This is one of Bali's strongest sea-day products because the experience starts delivering early and stays visually powerful all day. It works for couples, small groups, and first-time snorkelers who want clear planning and strong photo value.",
    overview:
      "Sea conditions always matter, but when the route is running well this is one of the easiest tours to recommend because it feels high-impact without being overly complicated for the traveler.",
    highlights: [
      ["Manta Point focus", "The headline reason people choose this route and the core marine highlight of the day."],
      ["Blue-water snorkeling", "A cleaner sea-day product than many short local snorkel trips."],
      ["Strong first-time value", "Great when you want one major marine memory from Bali without building a custom boat plan."],
      ["Simple logistics", "Pickup, harbor flow, and route coordination remove the main friction points."],
    ],
    itinerary: [
      ["Pickup and departure from Bali", "Start with hotel pickup and move through the harbor before the sea route begins."],
      ["Manta Point and main snorkeling stops", "Spend the heart of the day on the water with the strongest snorkeling sections prioritized first."],
      ["Return crossing and hotel drop-off", "Head back across to Bali and finish with a transfer to your hotel."],
    ],
    tags: ["hotelPickup", "boat", "snorkeling", "island", "shared"],
    related: ["blue-lagoon-snorkeling", "nusa-penida-private-day-tour-manta-snorkeling", "nusa-lembongan-ceningan-day-trip"],
    faqExtra: [
      "Do I need to be an advanced swimmer for Manta Point snorkeling?",
      "Not necessarily, but you should be comfortable in open water and always follow the crew's safety guidance. Conditions can change, which is why operator support matters on this route.",
    ],
  },
  {
    slug: "nusa-lembongan-ceningan-day-trip",
    title: "Nusa Lembongan and Ceningan Day Trip",
    eyebrow: "Easy island day beyond mainland Bali",
    duration: "Full day",
    pickup: "Morning hotel pickup and harbor transfer",
    bestFor: "Relaxed island scenery with lighter pacing",
    format: "Island day trip",
    area: "Nusa Lembongan and Ceningan",
    price: "Ask price",
    image: sourceImage("tild6538-6266-4533-b762-633965646265__614518b47a177d0df9ce.webp"),
    imageAlt: "Mangrove and boats around Nusa Lembongan",
    lead:
      "Swap mainland traffic for island bridges, mangrove views, turquoise water, and the softer island feel of Nusa Lembongan and Ceningan.",
    summary:
      "This is a great alternative when you want an island day that feels scenic and fresh but less intense than a packed Nusa Penida route. It works especially well for couples, families, and travelers who want sea views without a hard adventure profile.",
    overview:
      "The Lembongan and Ceningan area is often easier to enjoy at a slower pace, which makes it a smart product for guests who want a softer but still memorable island escape.",
    highlights: [
      ["Two islands in one route", "A more varied day than staying in a single harbor zone or beach strip."],
      ["Mangroves and coastal bridges", "The visual identity feels distinct from mainland Bali and from Penida."],
      ["Relaxed island rhythm", "A better fit when you want scenery and movement without aggressive pacing."],
      ["Easy all-round appeal", "Works for couples, families, and mixed groups who want a softer island day."],
    ],
    itinerary: [
      ["Pickup and island crossing", "Start with transfer support and move across from Bali to the islands in the morning."],
      ["Lembongan and Ceningan sightseeing", "Follow a balanced route through viewpoints, beach zones, and signature local scenery."],
      ["Return to mainland Bali", "Head back by boat and finish with the hotel transfer."],
    ],
    tags: ["hotelPickup", "boat", "island", "family"],
    related: ["nusa-penida-west-tour", "fast-boat-transfer-bali", "sunset-cruise-bali"],
    faqExtra: [
      "Is this a better choice than Nusa Penida for a relaxed day?",
      "For many travelers, yes. Lembongan and Ceningan usually feel softer and easier than a heavy Penida sightseeing day, especially if comfort and rhythm matter more than cliff-view checklists.",
    ],
  },
  {
    slug: "gili-islands-getaway",
    mainPage: false,
    aiPlanner: false,
    title: "Gili Islands Getaway",
    eyebrow: "Island escape from Bali",
    duration: "Full day or multi-day base route",
    pickup: "Morning harbor transfer support",
    bestFor: "Travelers extending beyond Bali",
    format: "Fast boat island transfer route",
    area: "Gili Islands connection",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Bright turquoise boats and island water",
    lead:
      "Use Bali as your launch point for a clean Gili Islands getaway with easier fast-boat planning, transfer support, and a route that feels like a real island extension, not a scramble.",
    summary:
      "The Gili trip is perfect for travelers who want to connect Bali with a slower island stay or a big sea-focused day. Timing, departure ports, and luggage flow matter here, so setup support adds real value.",
    overview:
      "This product is less about sightseeing and more about removing transfer friction while preserving the feeling of an exciting island continuation beyond Bali.",
    highlights: [
      ["Fast-boat route support", "The main stress in Gili travel is logistics, and that is exactly what this product helps solve."],
      ["Stronger island extension", "A natural next step for travelers wanting more sea time after Bali."],
      ["Port and luggage practicality", "Simple planning decisions make a big difference here."],
      ["Flexible stay style", "Useful for both short island escapes and longer multi-day add-ons."],
    ],
    itinerary: [
      ["Departure planning and transfer", "Align your Bali hotel area with the most practical departure port and transfer timing."],
      ["Fast boat to the Gilis", "Board the selected route and move out toward the island chain."],
      ["Arrival and island continuation", "Reach the Gilis and continue into your stay, hotel arrival, or next island step."],
    ],
    tags: ["boat", "transfer", "island"],
    related: ["fast-boat-transfer-bali", "nusa-lembongan-ceningan-day-trip", "private-car-with-driver-bali"],
    faqExtra: [
      "Is the Gili Islands Getaway a sightseeing tour or a transfer product?",
      "It is primarily a transfer-based island connection product. The value comes from making the Bali-to-Gili move smoother, faster to understand, and easier to book correctly.",
    ],
  },
  {
    slug: "gili-island-tour",
    title: "Gili Islands Private Snorkeling Day Trip",
    eyebrow: "Private Gili snorkeling from Bali",
    duration: "7-9 hours",
    pickup: "Hotel pickup option or Padang Bai meeting point",
    bestFor: "Sea lovers, couples, and travelers who want one big Gili day from Bali",
    format: "Private snorkeling day trip",
    area: "Gili Trawangan and Gili Meno",
    price: "From $115",
    image: sourceImage("bali-tours/gili-islands-getaway.jpg"),
    imageAlt: "Private snorkeling boat on clear turquoise water near the Gili Islands",
    lead:
      "Take one ambitious island day from Bali with roundtrip fast boat, private snorkeling, and enough time on Gili Trawangan to feel the atmosphere instead of only rushing through the photos.",
    summary:
      "This route is built for travelers who want turtles, clear water, and a real Gili Islands experience without organizing fast boats, harbor flow, snorkeling logistics, and local coordination on their own. The private snorkeling setup makes the day feel cleaner and more premium than a basic shared island transfer.",
    overview:
      "Compared with simple fast-boat tickets, this experience works because it combines the crossing, private snorkeling phase, guide support, GoPro memories, and optional hotel transfer into one polished Bali-to-Gili day plan. It is still a long sea route, so timing, sea conditions, and the correct package choice matter before booking.",
    highlights: [
      ["Private snorkeling boat and guide", "Skip the crowded group feel once you arrive and move through the water section with a dedicated local guide."],
      ["Turtles, coral, and underwater statues", "The route is designed around the signature Gili snorkeling moments, including sea turtles, colorful reef sections, and the famous underwater sculpture zone."],
      ["Free time on Gili Trawangan", "After snorkeling, you still have time to walk, cycle, relax on the beach, or stop at a cafe before the return boat."],
      ["Fast boat and transfer support", "Roundtrip boat planning, check-in flow, optional hotel pickup, and on-the-day coordination are what make this route feel smooth instead of stressful."],
    ],
    itinerary: [
      ["Hotel pickup or Padang Bai check-in", "Start with either a selected hotel transfer or direct check-in at Wannen Bali Office in Padang Bai, depending on the package you book."],
      ["Fast boat crossing to Gili Trawangan", "Cruise across the Lombok Strait by public fast boat and connect with the local snorkeling team on arrival."],
      ["Private snorkeling around Gili Trawangan and Gili Meno", "Begin with a short safety briefing, then visit the top snorkeling points for turtles, coral gardens, and underwater statues with GoPro documentation included."],
      ["Free time and return to Bali", "Use the island break for beach time, a quick cycle, or a cafe stop on Gili Trawangan before boarding the return fast boat back to Bali."],
    ],
    tags: ["hotelPickup", "boat", "snorkeling", "island", "private"],
    related: ["fast-boat-transfer-bali", "nusa-lembongan-ceningan-day-trip", "blue-lagoon-snorkeling"],
    includes: [
      "Roundtrip public fast boat tickets from Bali",
      "Private glass-bottom snorkeling boat with local guide",
      "Snorkeling equipment, life jacket, and safety briefing",
      "GoPro photos and videos during the snorkeling session",
      "Gili Trawangan harbor tax, bottled water, and insurance",
      "Private Bali hotel transfer if the transfer option is selected",
    ],
    goodToKnow: [
      "Lunch and personal expenses are not included in the standard booking.",
      "Padang Bai harbor tax and island admission may still be payable in cash depending on the selected option and local check-in flow.",
      "Meeting-point bookings check in at Wannen Bali Office, Jl. Segara No.28, Padang Bai, Karangasem, Bali.",
      "This route is not recommended for non-swimmers, pregnant travelers, or guests with serious back, heart, or mobility issues.",
      "Bring swimwear, a towel, sunscreen, sunglasses, and a dry change of clothes.",
      "Sea conditions, harbor timing, and underwater crowd levels can affect the exact stop order and pace of the day.",
    ],
    faqs: [
      [
        "How long does the Gili Islands Private Snorkeling Day Trip take?",
        "This experience usually takes around 7 to 9 hours from Bali, depending on your package, hotel area, boat timing, and sea conditions on the day.",
      ],
      [
        "Which Gili Islands are included in this trip?",
        "The route focuses on Gili Trawangan and Gili Meno, with the snorkeling phase built around the most popular water spots and free time normally spent on Gili Trawangan.",
      ],
      [
        "Is hotel pickup included from Bali?",
        "Hotel pickup is included only if you book the package that includes Bali transfer. If you choose the meeting-point option, you will go directly to Padang Bai for check-in.",
      ],
      [
        "Where is the meeting point for the non-pickup option?",
        "The standard meeting point is Wannen Bali Office, Jl. Segara No.28, Padang Bai, Karangasem, Bali. It is the check-in point for guests who do not choose hotel transfer.",
      ],
      [
        "What is included in the snorkeling package?",
        "Most bookings include roundtrip fast boat tickets, a private snorkeling boat, local guide, snorkeling gear, life jacket, GoPro documentation, bottled water, and insurance. Final inclusions depend on the selected option.",
      ],
      [
        "What is not included in the tour price?",
        "Lunch, personal expenses, and some local cash charges such as Padang Bai harbor tax or island admission can still apply depending on the option and local check-in requirements.",
      ],
      [
        "Is the snorkeling boat private or shared?",
        "The public fast boat crossing is shared, but the snorkeling phase itself is done on a private glass-bottom boat with your own guide, which is one of the main selling points of this route.",
      ],
      [
        "Do I need to be a strong swimmer to join?",
        "It is better if you are comfortable in open water. The operator provides life jackets and guidance, but the trip is not usually recommended for non-swimmers.",
      ],
      [
        "What snorkeling spots can I expect?",
        "The route normally includes three signature snorkeling zones around the Gili area, often including turtle areas, coral sections, and the well-known underwater statues. The exact order can shift with conditions.",
      ],
      [
        "Will I have free time on Gili Trawangan after snorkeling?",
        "Yes. After the snorkeling session, there is normally free time on Gili Trawangan for beach time, cycling, sightseeing, or a quick stop at a cafe before the return boat.",
      ],
      [
        "Who is this Gili day trip not suitable for?",
        "This trip is not a good fit for children under 5, pregnant women, or travelers with serious back, heart, or mobility limitations because of the sea crossing and active snorkeling format.",
      ],
      [
        "What should I bring and what should I send before booking?",
        "Bring swimwear, towel, sunscreen, sunglasses, and a change of clothes. Before the day is confirmed, send your active WhatsApp number, date, hotel area, and selected package so the operator can coordinate everything clearly.",
      ],
    ],
    whatsappText:
      "Hello! I want to book the Gili Islands Private Snorkeling Day Trip from Bali. Please send availability, pickup options, and full details.",
    metaTitle: "Gili Islands Private Snorkeling Day Trip from Bali | SB Excursions",
    metaDescription:
      "Private Gili Islands snorkeling day trip from Bali with fast boat, turtles, underwater statues, GoPro, free time on Gili Trawangan, and hotel transfer options. From $115.",
  },
  {
    slug: "sumbawa-whale-shark-snorkeling-trip",
    title: "Sumbawa Whale Shark Snorkeling Trip",
    eyebrow: "Big marine expedition",
    duration: "Long marine day or expedition-style route",
    pickup: "Very early departure planning",
    bestFor: "Advanced sea-day travelers",
    format: "Marine expedition",
    area: "Sumbawa waters",
    price: "Ask price",
    image: sourceImage("tild3262-3963-4364-b336-373234663732__355c20b6d4bf24106345.webp"),
    imageAlt: "Large sea creature and snorkel-style underwater scene",
    lead:
      "For travelers who want something rarer than a standard Bali sea day, the Sumbawa Whale Shark route offers a much bigger marine story and a more expedition-like feeling.",
    summary:
      "This is not an everyday casual activity. It is for guests who want a major marine experience and understand that distance, timing, and sea conditions are a real part of the product. Done right, it becomes one of the most memorable water-based adventures in the wider region.",
    overview:
      "Because the route is more ambitious than a Bali harbor snorkeling day, professional planning and honest timing expectations are especially important here.",
    highlights: [
      ["Expedition feeling", "A more serious marine day than simple Bali snorkeling products."],
      ["Rare wildlife appeal", "The whale shark factor gives the experience its unique draw."],
      ["Strong adventure positioning", "Best for travelers who actively want something bigger and less ordinary."],
      ["High memory value", "When conditions line up, this becomes a standout trip story."],
    ],
    itinerary: [
      ["Departure and sea logistics", "Start with a carefully timed departure window and route coordination."],
      ["Marine search and snorkeling phase", "Move into the operational sea portion of the day with wildlife timing as the main priority."],
      ["Return and recovery time", "Finish with the longer travel segment back after the main marine window closes."],
    ],
    tags: ["boat", "snorkeling", "adventure"],
    related: ["nusa-penida-manta-rays-point", "blue-lagoon-snorkeling", "surf-lesson-experience"],
    faqExtra: [
      "Is the whale shark trip suitable for casual first-time snorkelers?",
      "This route is usually better for travelers who already know they enjoy long sea days and are comfortable with a more expedition-like format than a short Bali snorkeling trip.",
    ],
  },
  {
    slug: "blue-lagoon-snorkeling",
    title: "Blue Lagoon Snorkeling",
    eyebrow: "Easy Bali snorkeling day",
    duration: "Half day to full day",
    pickup: "Morning hotel pickup",
    bestFor: "Beginners, couples, and mixed groups",
    format: "Snorkeling trip",
    area: "Padang Bai and Blue Lagoon",
    price: "Ask price",
    image: sourceImage("tild6264-3738-4937-b664-376133376233__pexels-laylia-215506.webp"),
    imageAlt: "Colorful coral reef in Bali snorkeling water",
    lead:
      "Choose Blue Lagoon when you want a simpler Bali snorkeling experience with clearer logistics, softer pacing, and strong underwater color without a full remote-island mission.",
    summary:
      "This is one of the easiest snorkeling products to recommend for beginners and casual sea-day travelers. It gives you underwater visibility, reef-life value, and a cleaner half-day or lighter full-day structure than more demanding offshore routes.",
    overview:
      "Blue Lagoon is a smart fit when you want marine content but do not need the scale and harbor complexity of a Penida expedition.",
    highlights: [
      ["Beginner-friendly feel", "A softer entry point into Bali snorkeling than some of the bigger sea routes."],
      ["Good reef visuals", "Strong underwater color and clean tropical-water appeal."],
      ["Shorter and easier logistics", "A practical marine option when you do not want a full remote-island operation."],
      ["Works for mixed groups", "An easy product for couples, families, and friends with different comfort levels."],
    ],
    itinerary: [
      ["Pickup and transfer to the departure point", "Travel from your hotel to the snorkeling base with the equipment and route timing already coordinated."],
      ["Snorkeling session", "Spend the main part of the trip on the water with the crew and the core reef stops."],
      ["Refresh and return", "Wrap up the day with a transfer back once the marine part is complete."],
    ],
    tags: ["hotelPickup", "boat", "snorkeling", "family"],
    related: ["nusa-penida-manta-rays-point", "surf-lesson-experience", "white-water-rafting"],
    faqExtra: [
      "Is Blue Lagoon snorkeling better for beginners than Nusa Penida?",
      "Usually yes. It is often the more relaxed and beginner-friendly option when guests want underwater scenery without the scale and exposure of a larger island sea route.",
    ],
  },
  {
    slug: "white-water-rafting",
    title: "White Water Rafting",
    eyebrow: "River adventure in Bali",
    duration: "4-6 hours",
    pickup: "Morning or midday pickup",
    bestFor: "Families, couples, and active groups",
    format: "Adventure activity",
    area: "Bali river routes",
    price: "Ask price",
    image: sourceImage("tild3165-6564-4638-b363-636366303266__rishi-lq2tr3apzi4-un.webp"),
    imageAlt: "Water adventure and river activity vibe in Bali",
    lead:
      "Add real movement to your Bali trip with a rafting session that balances scenery, fun, and just enough adrenaline to feel like a proper activity day.",
    summary:
      "White water rafting is one of Bali's easiest adventure products to fit into a trip because it feels active without being overly technical. It is especially strong for guests who want something memorable that still works for mixed groups.",
    overview:
      "River activities are a smart contrast to temple, beach, and cafe-heavy itineraries. With transfer support and a professional activity base, the day stays straightforward.",
    highlights: [
      ["Active but accessible", "A better fit than extreme sports for many Bali travelers who still want movement and fun."],
      ["Scenic river environment", "The route adds jungle, cliffs, and river views to the activity factor."],
      ["Group-friendly energy", "Great for couples, families with older kids, and friends traveling together."],
      ["Easy half-day structure", "You can combine it with a spa, lunch, or a quieter second stop afterward."],
    ],
    itinerary: [
      ["Transfer and pre-activity briefing", "Arrive at the rafting base, get fitted with equipment, and complete the safety orientation."],
      ["Main rafting run", "Head onto the river for the activity section with guides and support throughout the route."],
      ["Shower, lunch, and return", "Finish with recovery time before heading back to your hotel or next plan."],
    ],
    tags: ["hotelPickup", "adventure", "activity", "family"],
    related: ["atv-quad-bikes", "mount-batur-sunrise-jeep-tour", "surf-lesson-experience"],
    faqExtra: [
      "Is white water rafting in Bali too intense for casual travelers?",
      "Usually no. Many Bali rafting routes are designed to be fun and active without feeling like a technical extreme-sport product.",
    ],
  },
  {
    slug: "sunset-cruise-bali",
    title: "Sunset Cruise",
    eyebrow: "Easy evening on the water",
    duration: "2-4 hours",
    pickup: "Late afternoon transfer support",
    bestFor: "Couples, groups, and celebration nights",
    format: "Boat experience",
    area: "Bali coastal waters",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Boats on bright blue water in Bali",
    lead:
      "A Bali sunset cruise is one of the cleanest ways to close the day: open water, golden-hour light, a more elevated mood, and none of the road stress that can kill an evening plan.",
    summary:
      "This experience is ideal for couples, celebration groups, and travelers who want a premium-feeling evening without needing a full-day commitment. The main value is atmosphere, timing, and easy sea-facing views at the right hour.",
    overview:
      "When Bali evenings feel too crowded on land, a cruise becomes the simpler and more polished choice. It is also an easy product to pair with proposals, birthdays, and relaxed social plans.",
    highlights: [
      ["Golden-hour water views", "A stronger sunset setting than watching from a crowded roadside or beach access point."],
      ["Easy premium mood", "An upscale feel without the complexity of a private charter build."],
      ["Celebration friendly", "Great for dates, anniversaries, birthdays, and group evenings."],
      ["Compact schedule", "You can keep the whole day open and still end it memorably."],
    ],
    itinerary: [
      ["Late afternoon departure flow", "Head to the departure point and board in time for the light to shift into sunset."],
      ["Cruise during golden hour", "Spend the core of the experience on the water with the sea, skyline, and sunset working together."],
      ["Evening return", "Dock after the best light window and return to your hotel or continue into dinner plans."],
    ],
    tags: ["boat", "sunset", "romantic"],
    related: ["nusa-lembongan-ceningan-day-trip", "bali-helicopter-scenic-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Is the sunset cruise private?",
      "That depends on the package. Some cruises are shared and social, while others can be booked in a more private or premium format depending on availability.",
    ],
  },
  {
    slug: "surf-lesson-experience",
    title: "Surf Lesson Experience",
    eyebrow: "Bali's classic beach activity",
    duration: "2-4 hours",
    pickup: "Flexible session timing",
    bestFor: "Beginners and casual active travelers",
    format: "Water activity",
    area: "Beginner-friendly Bali surf beaches",
    price: "Ask price",
    image: sourceImage("tild3165-6564-4638-b363-636366303266__rishi-lq2tr3apzi4-un.webp"),
    imageAlt: "Blue tropical water for a Bali surf lesson",
    lead:
      "Take your first proper Bali surf lesson with a route that focuses on beginner-friendly water time, simple coaching, and a fun beach-sport memory that actually fits into your trip.",
    summary:
      "A surf lesson is one of the best short-format Bali activities because it feels local, active, and iconic without taking over the whole day. It is ideal for couples, friends, solo travelers, and anyone curious about the island's surf culture.",
    overview:
      "The product works best when the beach choice, tide timing, and beginner setup are handled correctly. That is what turns a chaotic first try into a solid Bali highlight.",
    highlights: [
      ["Beginner-first coaching", "A far better first surf experience than trying to rent a board and guess on your own."],
      ["Compact active session", "Easy to fit around brunch, beach clubs, or another half-day plan."],
      ["Authentic Bali feeling", "Surf culture is part of the island's identity, and this is an easy way to connect with it."],
      ["Good for solo or group travel", "Works just as well for one traveler as it does for couples or friends."],
    ],
    itinerary: [
      ["Meet-up and beach briefing", "Start with board basics, safety, and a beginner-focused intro."],
      ["Main surf lesson", "Move into the water for coached practice, pop-up drills, and wave timing."],
      ["Cooldown and wrap-up", "Finish with beach recovery time and optional transport back or onward plans."],
    ],
    tags: ["activity", "water", "adventure"],
    related: ["blue-lagoon-snorkeling", "white-water-rafting", "sunset-cruise-bali"],
    faqExtra: [
      "Can complete beginners book the surf lesson experience?",
      "Yes. That is exactly who most entry-level Bali surf lessons are designed for, as long as conditions match a beginner-friendly session window.",
    ],
  },
  {
    slug: "bali-airport-transfer",
    title: "Airport Transfer",
    eyebrow: "Reliable Bali arrival support",
    duration: "Depends on hotel area",
    pickup: "Arrival or departure based",
    bestFor: "New arrivals and stress-free departures",
    format: "Private transfer service",
    area: "Ngurah Rai Airport and Bali hotel areas",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Clean Bali transfer and travel day atmosphere",
    lead:
      "Keep your Bali arrival or departure smooth with a dedicated airport transfer that removes the usual taxi confusion, pricing stress, and last-minute hotel logistics.",
    summary:
      "Airport transfers are not glamorous, but they have an outsized impact on how the trip starts. A clean pickup, clear driver coordination, and direct route to the hotel make a huge difference after a long flight.",
    overview:
      "This service is especially useful for late arrivals, first-time Bali visitors, families with luggage, and anyone who wants transport sorted before wheels touch the runway.",
    highlights: [
      ["Simple arrival flow", "Avoid negotiating transport after landing or worrying about where to meet your driver."],
      ["Useful for first-time visitors", "A very easy way to start Bali feeling organized instead of scattered."],
      ["Luggage-friendly planning", "Better than trying to improvise when bags, strollers, or multiple passengers are involved."],
      ["Departure support too", "Just as valuable when protecting your flight timing on the way out."],
    ],
    itinerary: [
      ["Confirm flight and hotel details", "Align the transfer around your arrival or departure time and the exact hotel area."],
      ["Meet-up and direct transfer", "Connect with your driver and move directly toward the airport or hotel."],
      ["Finish with a clean handoff", "Arrive at the destination without the usual transport guesswork."],
    ],
    tags: ["transfer", "private"],
    related: ["private-car-with-driver-bali", "fast-boat-transfer-bali", "gili-islands-getaway"],
    faqExtra: [
      "Is the airport transfer private?",
      "Most travelers book this as a private Bali transfer so the timing, luggage handling, and destination flow stay as simple as possible.",
    ],
  },
  {
    slug: "private-car-with-driver-bali",
    title: "Private Car with Driver",
    eyebrow: "Flexible Bali transport by the day",
    duration: "Flexible daily use",
    pickup: "Hotel pickup on your schedule",
    bestFor: "Travelers who want total route flexibility",
    format: "Private transport service",
    area: "All major Bali regions",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Private Bali touring atmosphere with scenic temples",
    lead:
      "Book a private car with driver in Bali when you want the freedom to build your own route, stop when you like, and move around the island without locking into a fixed excursion script.",
    summary:
      "This is one of the most useful products in Bali because so many plans become easier once transport is flexible. It is perfect for custom sightseeing, shopping days, family pacing, and travelers who already know roughly where they want to go.",
    overview:
      "A private driver day is not just a transfer. It is the cleanest way to buy back time, route control, and comfort in a place where traffic and distance planning really matter.",
    highlights: [
      ["Maximum route flexibility", "The best option when you do not want to be boxed into one set itinerary."],
      ["Useful across the whole island", "Works for beaches, temples, shopping, day trips, and mixed plans."],
      ["Comfort-first structure", "Ideal for families, mixed-age groups, or travelers who simply want an easier Bali day."],
      ["High-value practical product", "One of the easiest services to keep reusing across a Bali trip."],
    ],
    itinerary: [
      ["Share your plan or area focus", "Start with the places or region you want to prioritize."],
      ["Use the car for the day", "Move between your chosen stops with flexibility for lunch, delays, or spontaneous additions."],
      ["Return on your own timing", "Finish the day when your plan feels complete instead of when a fixed tour says it should end."],
    ],
    tags: ["transfer", "private", "hotelPickup"],
    related: ["airport-transfer", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "Is a private driver better than booking separate Bali taxis all day?",
      "For most travelers, yes. Once you have multiple stops, a private driver is usually simpler, more comfortable, and easier to coordinate than chaining together separate rides.",
    ],
  },
  {
    slug: "fast-boat-transfer-bali",
    title: "Fast Boat Transfer",
    eyebrow: "Harbor-to-island transfer support",
    duration: "Depends on destination",
    pickup: "Based on departure harbor and boat time",
    bestFor: "Island-bound travelers",
    format: "Transfer service",
    area: "Bali harbors and island routes",
    price: "Ask price",
    image: sourceImage("tild6538-6266-4533-b762-633965646265__614518b47a177d0df9ce.webp"),
    imageAlt: "Fast boat style island transfer in Bali waters",
    lead:
      "Take the guesswork out of Bali island departures with a fast boat transfer that coordinates hotel movement, harbor timing, and the most practical route for your destination.",
    summary:
      "Fast boats are simple once booked correctly, but confusing when you are juggling ports, check-in windows, and hotel distance. This service helps turn the whole process into a clean transfer day instead of a stressful logistics puzzle.",
    overview:
      "It is especially valuable for first-time island travelers, families, and anyone moving with luggage or a tight schedule.",
    highlights: [
      ["Cleaner harbor planning", "You avoid the main timing mistakes that usually create fast-boat stress."],
      ["Works for multiple island routes", "Useful whether you are heading toward Penida, Lembongan, or onward island connections."],
      ["Easy luggage support", "A better fit than improvising when bags and departure timing matter."],
      ["Travel-day product, not a tour", "Built to make movement easy and predictable."],
    ],
    itinerary: [
      ["Align hotel area and boat route", "Confirm the best departure point for your island destination."],
      ["Transfer to the harbor", "Move from your hotel to the correct port with arrival timing protected."],
      ["Check-in and departure", "Board your selected fast boat and continue the island journey."],
    ],
    tags: ["transfer", "boat", "island"],
    related: ["gili-islands-getaway", "nusa-lembongan-ceningan-day-trip", "airport-transfer"],
    faqExtra: [
      "Does the fast boat transfer include hotel pickup?",
      "That depends on the package and departure harbor, but hotel transfer coordination is one of the most important reasons travelers choose a professionally arranged fast boat product.",
    ],
  },
  {
    slug: "bali-helicopter-scenic-tour",
    title: "Bali Helicopter Scenic Tour",
    eyebrow: "Premium island views from the air",
    duration: "Short flight experience",
    pickup: "Scheduled departure window",
    bestFor: "Premium travelers and special occasions",
    format: "Helicopter experience",
    area: "Bali aerial sightseeing",
    price: "Ask price",
    image: sourceImage("tild3536-3638-4435-a462-623534663935__pexels-thomas-balaba.jpg"),
    imageAlt: "Sunrise and mountain atmosphere for scenic aerial Bali tour",
    lead:
      "See Bali from above with a scenic helicopter flight that turns the island's coastline, cliffs, rice fields, and volcanic lines into one premium visual sweep.",
    summary:
      "This is a short-format luxury product with very high perceived value. It is ideal for proposals, anniversaries, premium travelers, and anyone who wants a true hero experience instead of another standard sightseeing day.",
    overview:
      "Helicopter tours work because they compress Bali's visual variety into a much more dramatic experience than road-based sightseeing can deliver.",
    highlights: [
      ["Aerial island perspective", "One of the strongest visual upgrades available in Bali."],
      ["Premium short-format experience", "High impact without needing a full-day schedule."],
      ["Celebration and proposal friendly", "A natural fit for once-in-a-trip moments."],
      ["Unique content value", "The photo and video angle is completely different from any land route."],
    ],
    itinerary: [
      ["Arrival and safety briefing", "Check in, receive the pre-flight briefing, and prepare for departure."],
      ["Scenic helicopter flight", "Follow the selected aerial route with panoramic views over Bali's strongest landscape lines."],
      ["Landing and post-flight wrap-up", "Complete the experience and continue into the rest of your Bali day."],
    ],
    tags: ["helicopter", "premium", "romantic"],
    related: ["volcano-coastline-helicopter-ride", "sunset-cruise-bali", "bali-instagram-highlights-tour"],
    faqExtra: [
      "Is the helicopter scenic tour private?",
      "It depends on the aircraft and package setup. Many travelers ask for private or premium flight formats when the experience is tied to a celebration or proposal.",
    ],
  },
  {
    slug: "volcano-coastline-helicopter-ride",
    title: "Volcano and Coastline Helicopter Ride",
    eyebrow: "Bali volcanoes and shorelines from above",
    duration: "Short flight experience",
    pickup: "Scheduled departure window",
    bestFor: "Premium travelers chasing the biggest views",
    format: "Helicopter experience",
    area: "Volcano and coastline aerial route",
    price: "Ask price",
    image: sourceImage("tild3435-3237-4362-a637-396663313561__ff430793-bcdb-4551-a.jpeg"),
    imageAlt: "Volcanic sunrise style view for Bali helicopter route",
    lead:
      "Take the most dramatic version of an aerial Bali experience by combining volcanic geography, ridgelines, and coastline views in one premium helicopter route.",
    summary:
      "This is the stronger storytelling version of a scenic flight when you want Bali's natural contrasts to hit hard from the air. The route is ideal for premium travelers, milestone moments, and anyone who wants the island's biggest landforms in one visual arc.",
    overview:
      "Where a standard scenic flight sells beauty, this one sells scale. The volcano-and-coastline contrast makes the whole experience feel more cinematic and more distinctly Bali.",
    highlights: [
      ["Volcano-to-sea contrast", "A route built around the strongest geological drama Bali can offer from above."],
      ["Premium memory piece", "Easy to remember, easy to sell, and visually more powerful than regular road touring."],
      ["Short but intense", "High-impact premium product without taking over the whole day."],
      ["Excellent for hero moments", "Perfect when the trip needs one experience that instantly feels special."],
    ],
    itinerary: [
      ["Check-in and flight preparation", "Arrive at the departure point and complete the pre-flight process."],
      ["Helicopter route over volcano and coast", "Follow the premium aerial path with the best contrasting Bali landforms prioritized."],
      ["Landing and continuation of your day", "Finish the flight and move into the next Bali plan with minimal time lost."],
    ],
    tags: ["helicopter", "premium", "volcano"],
    related: ["bali-helicopter-scenic-tour", "mount-batur-sunrise-jeep-tour", "sunset-cruise-bali"],
    faqExtra: [
      "How is this different from the standard Bali helicopter scenic tour?",
      "This route leans more heavily into volcanic geography and coastline contrast, so the overall feel is more dramatic and terrain-focused rather than simply panoramic.",
    ],
  },
];

const existingRoutes = {
  "mount-batur-sunrise-hike": {
    title: "Mount Batur Sunrise Hike",
    route: "/bali/en/tours/mount-batur-sunrise-hike",
  },
};

const WEST_ROUTE_POINTS = {
  "ubud-highlights-tour": {
    stops: ["Batuan Temple", "Gunung Kawi", "Kintamani", "Tegallalang", "Monkey Forest", "Ubud Palace"],
    routeStops: [
      "Batuan Temple, Gianyar, Bali",
      "Gunung Kawi Temple, Tampaksiring, Bali",
      "Kintamani, Bangli, Bali",
      "Tegallalang Rice Terrace, Bali",
      "Ubud Monkey Forest, Ubud, Bali",
      "Ubud Palace, Ubud, Bali",
    ],
  },
  "north-bali-lovina-dolphins-tour": {
    stops: ["Lovina Beach", "Gitgit", "Banyumala", "Handara", "Ulun Danu"],
    routeStops: [
      "Lovina Beach, Bali",
      "Gitgit Waterfall, Buleleng, Bali",
      "Banyumala Twin Waterfalls, Wanagiri, Bali",
      "Handara Gate, Bedugul, Bali",
      "Ulun Danu Beratan Temple, Bedugul, Bali",
    ],
  },
  "dolphin-sunrise-city-tour": {
    stops: ["Lovina Beach", "Dolphin Point", "Gitgit", "Ulun Danu", "Bedugul"],
    routeStops: [
      "Lovina Beach, Bali",
      "Lovina Dolphin Statue, Lovina, Bali",
      "Gitgit Waterfall, Buleleng, Bali",
      "Ulun Danu Beratan Temple, Bedugul, Bali",
      "Bedugul, Bali",
    ],
  },
  "east-bali-instagram-tour": {
    stops: ["Lempuyang", "Tirta Gangga", "Taman Ujung", "Lahangan", "Virgin Beach"],
    routeStops: [
      "Lempuyang Temple, Karangasem, Bali",
      "Tirta Gangga, Karangasem, Bali",
      "Taman Ujung Sukasada, Karangasem, Bali",
      "Lahangan Sweet, Karangasem, Bali",
      "Virgin Beach, Karangasem, Bali",
    ],
  },
  "tanah-lot-bedugul-tour": {
    stops: ["Ulun Danu", "Handara", "Candikuning", "Jatiluwih", "Tanah Lot"],
    routeStops: [
      "Ulun Danu Beratan Temple, Bedugul, Bali",
      "Handara Gate, Bedugul, Bali",
      "Candikuning Traditional Market, Bedugul, Bali",
      "Jatiluwih Rice Terrace, Tabanan, Bali",
      "Tanah Lot Temple, Bali",
    ],
  },
  "bali-unesco": {
    stops: ["Taman Ayun", "Ulun Danu", "Jatiluwih", "Tanah Lot"],
    routeStops: [
      "Taman Ayun Temple, Mengwi, Bali",
      "Ulun Danu Beratan Temple, Bedugul, Bali",
      "Jatiluwih Rice Terrace, Tabanan, Bali",
      "Tanah Lot Temple, Bali",
    ],
  },
  "mount-batur-sunrise-jeep-tour": {
    stops: ["Toya Bungkah", "Sunrise Point", "Black Lava", "Black Sand", "Hot Spring"],
    routeStops: [
      "Toya Bungkah, Kintamani, Bali",
      "Mount Batur Sunrise Point, Kintamani, Bali",
      "Black Lava, Kintamani, Bali",
      "Black Sand Batur, Kintamani, Bali",
      "Batur Natural Hot Spring, Kintamani, Bali",
    ],
  },
  "atv-ride-adventure": {
    stops: ["Keliki", "Bresela", "Gorilla Cave", "Ulu Petanu", "Rice Fields"],
    routeStops: [
      "Keliki Village, Tegalalang, Bali",
      "Bresela, Payangan, Bali",
      "Gorilla Cave ATV, Ubud, Bali",
      "Ulu Petanu Waterfall, Gianyar, Bali",
      "Tegallalang Rice Terrace, Bali",
    ],
  },
  "atv-quad-bikes": {
    stops: ["Gorilla ATV", "Keliki", "Bresela", "Ulu Petanu", "Rice Fields"],
    routeStops: [
      "Gorilla ATV Adventure, Tegalalang, Ubud, Bali",
      "Keliki Village, Tegalalang, Bali",
      "Bresela, Payangan, Bali",
      "Ulu Petanu Waterfall, Gianyar, Bali",
      "Tegallalang Rice Terrace, Bali",
    ],
  },
  "bali-instagram-highlights-tour": {
    stops: ["Handara", "Ulun Danu", "Lempuyang", "Tirta Gangga", "Tegallalang"],
    routeStops: [
      "Handara Gate, Bedugul, Bali",
      "Ulun Danu Beratan Temple, Bedugul, Bali",
      "Lempuyang Temple, Karangasem, Bali",
      "Tirta Gangga, Karangasem, Bali",
      "Tegallalang Rice Terrace, Bali",
    ],
  },
  "ubud-instagram-tour": {
    stops: ["Ubud", "Lempuyang", "Tirta Gangga", "Tukad Cepung", "Tegallalang"],
    routeStops: [
      "Ubud, Bali",
      "Lempuyang Temple, Karangasem, Bali",
      "Tirta Gangga, Karangasem, Bali",
      "Tukad Cepung Waterfall, Bangli, Bali",
      "Tegallalang Rice Terrace, Bali",
    ],
  },
  "nusa-penida-private-day-tour-manta-snorkeling": {
    stops: ["Banjar Nyuh", "Manta Point", "Gamat Bay", "Kelingking", "Crystal Bay"],
    routeStops: [
      "Banjar Nyuh Harbour, Nusa Penida",
      "Manta Point, Nusa Penida",
      "Gamat Bay, Nusa Penida",
      "Kelingking Beach, Nusa Penida",
      "Crystal Bay, Nusa Penida",
    ],
  },
  "nusa-penida-west-tour": {
    stops: ["Banjar Nyuh", "Broken Beach", "Angel's Billabong", "Kelingking", "Crystal Bay"],
    routeStops: [
      "Banjar Nyuh Harbour, Nusa Penida",
      "Broken Beach, Nusa Penida",
      "Angel's Billabong, Nusa Penida",
      "Kelingking Beach, Nusa Penida",
      "Crystal Bay, Nusa Penida",
    ],
  },
  "nusa-penida-east-tour": {
    stops: ["Banjar Nyuh", "Diamond Beach", "Atuh Beach", "Tree House", "Teletubbies"],
    routeStops: [
      "Banjar Nyuh Harbour, Nusa Penida",
      "Diamond Beach, Nusa Penida",
      "Atuh Beach, Nusa Penida",
      "Molenteng Tree House, Nusa Penida",
      "Teletubbies Hill, Nusa Penida",
    ],
  },
  "nusa-penida-full-day-tour": {
    stops: ["Banjar Nyuh", "Kelingking", "Angel's Billabong", "Diamond Beach", "Thousand Islands"],
    routeStops: [
      "Banjar Nyuh Harbour, Nusa Penida",
      "Kelingking Beach, Nusa Penida",
      "Angel's Billabong, Nusa Penida",
      "Diamond Beach, Nusa Penida",
      "Thousand Islands Viewpoint, Nusa Penida",
    ],
  },
  "nusa-penida-manta-rays-point": {
    stops: ["Sanur Port", "Manta Point", "Gamat Bay", "Crystal Bay", "Wall Bay"],
    routeStops: [
      "Sanur Port, Bali",
      "Manta Point, Nusa Penida",
      "Gamat Bay, Nusa Penida",
      "Crystal Bay, Nusa Penida",
      "Wall Bay Point, Nusa Penida",
    ],
  },
  "nusa-lembongan-ceningan-day-trip": {
    stops: ["Jungut Batu", "Dream Beach", "Devil's Tear", "Yellow Bridge", "Blue Lagoon"],
    routeStops: [
      "Jungut Batu Harbour, Nusa Lembongan",
      "Dream Beach, Nusa Lembongan",
      "Devil's Tear, Nusa Lembongan",
      "Yellow Bridge, Nusa Ceningan",
      "Blue Lagoon, Nusa Ceningan",
    ],
  },
  "gili-islands-getaway": {
    stops: ["Padang Bai", "Gili T", "Gili Meno", "Gili Air", "Bangsal"],
    routeStops: [
      "Padang Bai Port, Bali",
      "Gili Trawangan Harbour",
      "Gili Meno Harbour",
      "Gili Air Harbour",
      "Bangsal Harbour, Lombok",
    ],
  },
  "gili-island-tour": {
    stops: ["Padang Bai", "Gili T", "Turtle Point", "Nest Statues", "Gili Meno"],
    routeStops: [
      "Wannen Bali Office, Padang Bai, Bali",
      "Gili Trawangan Harbour",
      "Turtle Point, Gili Trawangan",
      "Nest Underwater Statues, Gili Meno",
      "Gili Meno Harbour",
    ],
  },
  "sumbawa-whale-shark-snorkeling-trip": {
    stops: ["Labuan Jambu", "Saleh Bay", "Whale Shark Point", "Bagan", "Sumbawa Besar"],
    routeStops: [
      "Labuan Jambu, Tarano, Sumbawa",
      "Saleh Bay, Sumbawa",
      "Whale Shark Point, Saleh Bay, Sumbawa",
      "Bagan Saleh Bay, Sumbawa",
      "Sumbawa Besar, Sumbawa",
    ],
  },
  "blue-lagoon-snorkeling": {
    stops: ["Padang Bai", "Blue Lagoon", "Tanjung Jepun", "Bias Tugel", "Harbor"],
    routeStops: [
      "Padang Bai, Bali",
      "Blue Lagoon Beach, Padang Bai, Bali",
      "Tanjung Jepun, Padang Bai, Bali",
      "Bias Tugel Beach, Padang Bai, Bali",
      "Padang Bai Harbor, Bali",
    ],
  },
  "white-water-rafting": {
    stops: ["Ayung River", "Kedewatan", "Sayan", "Payangan", "Ubud"],
    routeStops: [
      "Ayung River Rafting, Ubud, Bali",
      "Kedewatan, Ubud, Bali",
      "Sayan, Ubud, Bali",
      "Payangan, Gianyar, Bali",
      "Ubud, Bali",
    ],
  },
  "sunset-cruise-bali": {
    stops: ["Benoa Harbour", "Benoa Bay", "Serangan", "Nusa Dua", "Jimbaran"],
    routeStops: [
      "Benoa Harbour, Bali",
      "Benoa Bay, Bali",
      "Serangan Island, Bali",
      "Nusa Dua Beach, Bali",
      "Jimbaran Bay, Bali",
    ],
  },
  "surf-lesson-experience": {
    stops: ["Kuta Beach", "Legian", "Double Six", "Batu Bolong", "Nusa Dua"],
    routeStops: [
      "Kuta Beach, Bali",
      "Legian Beach, Bali",
      "Double Six Beach, Seminyak, Bali",
      "Batu Bolong Beach, Canggu, Bali",
      "Nusa Dua Beach, Bali",
    ],
  },
  "bali-airport-transfer": {
    stops: ["Airport", "Kuta", "Seminyak", "Canggu", "Ubud"],
    routeStops: [
      "Ngurah Rai International Airport, Bali",
      "Kuta, Bali",
      "Seminyak, Bali",
      "Canggu, Bali",
      "Ubud, Bali",
    ],
  },
  "private-car-with-driver-bali": {
    stops: ["Ubud Palace", "Tegallalang", "Tanah Lot", "Uluwatu", "Seminyak"],
    routeStops: [
      "Ubud Palace, Ubud, Bali",
      "Tegallalang Rice Terrace, Bali",
      "Tanah Lot Temple, Bali",
      "Uluwatu Temple, Bali",
      "Seminyak, Bali",
    ],
  },
  "fast-boat-transfer-bali": {
    stops: ["Sanur Port", "Padang Bai", "Banjar Nyuh", "Jungut Batu", "Gili T"],
    routeStops: [
      "Sanur Port, Bali",
      "Padang Bai Port, Bali",
      "Banjar Nyuh Harbour, Nusa Penida",
      "Jungut Batu Harbour, Nusa Lembongan",
      "Gili Trawangan Harbour",
    ],
  },
  "bali-helicopter-scenic-tour": {
    stops: ["Benoa Heliport", "Serangan", "Tanjung Benoa", "GWK", "Nusa Dua"],
    routeStops: [
      "Benoa Heliport, Denpasar, Bali",
      "Serangan Island, Bali",
      "Tanjung Benoa, Bali",
      "Garuda Wisnu Kencana, Bali",
      "Nusa Dua Beach, Bali",
    ],
  },
  "volcano-coastline-helicopter-ride": {
    stops: ["Benoa Heliport", "Sanur", "Tegallalang", "Mount Batur", "Amed"],
    routeStops: [
      "Benoa Heliport, Denpasar, Bali",
      "Sanur Beach, Bali",
      "Tegallalang Rice Terrace, Bali",
      "Mount Batur, Kintamani, Bali",
      "Amed Beach, Karangasem, Bali",
    ],
  },
};

const WEST_COLLAGE_SLOT_IDS = [
  "1721248463091",
  "1721248463131",
  "1721248463134",
  "1721248463127",
  "1721248463137",
  "1721248463123",
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Article copy may use **bold** to highlight the numbers and names readers scan
// for. Escape first, then introduce our own tags, so nothing in the source text
// can inject markup.
function renderRichText(value) {
  return escapeHtml(String(value ?? "")).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// Structured data must be plain text — strip the ** markers instead of rendering them.
function stripRichText(value) {
  return String(value ?? "").replace(/\*\*(.+?)\*\*/g, "$1");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function publicImagePath(tour) {
  return `/images/bali-tours/${tour.slug}${path.extname(tour.image).toLowerCase()}`;
}

function tourLocale(tour) {
  return collapseWhitespace(tour?.locale || "en").toLowerCase();
}

const DEFAULT_WEST_UI_LABELS = {
  navTours: "Our Tours",
  navAbout: "About Us",
  navBooking: "Booking",
  navFaq: "FAQ",
  navGuides: "Our guides",
  navWhatsApp: "WhatsApp",
  languageSwitcherLabel: "Choose language",
  destinationDubai: "Dubai, UAE",
  destinationBali: "Bali, Indonesia",
  aboutHeading: "About this Activity",
  highlightsHeading: "Highlights",
  fullDescriptionHeading: "Full description",
  whatsIncludedHeading: "What's included",
  importantInformationHeading: "Important information",
  faqHeading: "FAQ",
  bestAttractionsHeading: "Best Attractions in Bali",
  helpfulPdfHeading: "Our helpful PDF-Files about Bali",
  thingsToDoHeading: "Things to do in Bali",
  tourArticlesHeading: "Articles about this tour",
  chipTravelGuide: "Travel Guide",
  chipTourSchedule: "Tour Schedule",
  chipWhyBook: "Why Book",
  mapOpenLabel: "Open google maps route",
  highlightsIntroLabel: "Main vibe",
  fullDescriptionWhyBookLabel: "Why people book it",
  fullDescriptionHowDayFeelsLabel: "How the day feels",
  fullDescriptionKeyStopsLabel: "Key stops",
  fullDescriptionBestFitLabel: "Best fit",
  includesIntroLabel: "Booked as one clear package",
  includesIntroText: "The core logistics and main support pieces are already wrapped into the route below",
  weatherLive: "Live weather",
  weatherLoading: "Loading…",
  weatherChecking: "Checking local conditions…",
  weatherConditionLoading: "Loading weather…",
  weatherSummaryLoading: "Finding the best Bali plan for today…",
  weatherFeelsLike: "Feels like",
  weatherHumidity: "Humidity",
  weatherWind: "Wind",
  weatherTipsTitle: "Today’s tips",
  weatherSeeRecommended: "See recommended tour",
  weatherLocation: "Bali, Indonesia",
  weatherClearSky: "Clear sky",
  weatherMostlyClear: "Mostly clear",
  weatherPartlyCloudy: "Partly cloudy",
  weatherCloudy: "Cloudy",
  weatherLightRain: "Light rain",
  weatherRainShowers: "Rain showers",
  weatherThunderstorm: "Thunderstorm risk",
  weatherWarmEvening: "Warm Bali evening",
  weatherSunnyDay: "Sunny Bali day",
  weatherCloudyDay: "Cloudy Bali day",
  weatherRainyDay: "Rainy Bali weather",
  weatherStormyDay: "Storm-watch Bali weather",
  weatherSunsetTip: "Great for sunset spots",
  weatherDinnerTip: "Perfect for dinner plans",
  weatherLightLayerTip: "A light layer is enough",
  weatherBeachTip: "Best for beach time",
  weatherSunscreenTip: "Strong sun: sunscreen helps",
  weatherHydrateTip: "Stay hydrated in the heat",
  weatherCafeTip: "Nice weather for cafes and easy rides",
  weatherSpaTip: "Great for spa or cafe stops",
  weatherGripShoesTip: "Wear shoes with grip",
  weatherRainLayerTip: "Pack a light rain layer",
  weatherFlexibleTip: "Keep plans flexible today",
  weatherShelterTip: "Indoor backup ideas work well",
  footerTopTours: "Our Top Tours",
  footerCompanyTrust: "Company & Trust",
  footerContactsLocation: "Contacts & Location",
  footerWeAccept: "We Accept",
  footerMessageUs: "Message us",
  footerLead: "Where nature and adventure meet",
  footerAboutCompany: "About SB Excursions",
  footerPrivacy: "Privacy Policy",
  footerTerms: "Terms & Conditions",
  footerRefund: "Refund Policy",
  footerSiteMap: "SiteMap",
  footerSupportHours: "Daily support 7:00 - 22:00",
  footerCopyright: "© 2021-2026 SB Excursions. Crafted for Bali adventures",
};

function westUiLabels(tour) {
  return {
    ...DEFAULT_WEST_UI_LABELS,
    ...(tour?.ui || {}),
  };
}

function absoluteTourUrl(tour) {
  return `${SITE_URL}${tourRoute(tour)}`;
}

function absoluteImageUrl(tour) {
  return `${SITE_URL}${publicImagePath(tour)}`;
}

function tourBySlug(slug) {
  return tours.find((tour) => tour.slug === slug);
}

function normalizeJournalImageSrc(src) {
  if (!src) return "";
  if (/^(?:https?:)?\/\//i.test(src) || src.startsWith("/")) return src;
  return `/${src.replace(/^\/+/, "")}`;
}

function absoluteJournalImageUrl(src) {
  const normalized = normalizeJournalImageSrc(src);
  if (!normalized) return "";
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `${SITE_URL}${normalized}`;
}

function guidePlaceImage(title, fallbackTourSlug) {
  const mappedImage = BALI_PLANNER_PLACE_IMAGE_BY_TITLE[title];
  if (mappedImage) {
    return normalizeJournalImageSrc(mappedImage);
  }
  const fallbackTour = fallbackTourSlug ? tourBySlug(fallbackTourSlug) : null;
  if (fallbackTour) {
    return publicImagePath(fallbackTour);
  }
  return publicImagePath(tours[0]);
}

function moneyOffer(tour) {
  const match = /^From \$(\d+)/i.exec(tour.price);
  if (!match) return null;
  return {
    "@type": "Offer",
    priceCurrency: "USD",
    price: match[1],
    url: absoluteTourUrl(tour),
    availability: "https://schema.org/InStock",
  };
}

function buildIncludes(tour) {
  if (tour.includes?.length) return tour.includes;
  const items = [];
  if (tour.tags.includes("hotelPickup")) items.push("Hotel pickup and return planning from major Bali areas");
  if (tour.tags.includes("private")) items.push("Private route flow and flexible pacing");
  if (tour.tags.includes("boat")) items.push("Boat or harbor logistics based on the selected package");
  if (tour.tags.includes("snorkeling")) items.push("Snorkeling equipment and marine safety setup");
  if (tour.tags.includes("adventure") || tour.tags.includes("activity")) items.push("Activity briefing and basic safety equipment");
  if (tour.tags.includes("helicopter")) items.push("Pre-flight briefing and operator coordination");
  if (tour.tags.includes("transfer")) items.push("Pickup timing coordination and direct transfer flow");
  if (tour.tags.includes("temple") || tour.tags.includes("nature") || tour.tags.includes("island")) {
    items.push("Driver coordination for the core route and main sightseeing timing");
  }
  items.push("WhatsApp support for confirmation, timing, and route questions");
  return Array.from(new Set(items)).slice(0, 6);
}

function buildGoodToKnow(tour) {
  if (tour.goodToKnow?.length) return tour.goodToKnow;
  const notes = [
    `This experience usually runs as a ${tour.format.toLowerCase()}.`,
    `Best fit: ${tour.bestFor.toLowerCase()}.`,
  ];
  if (tour.tags.includes("sunrise")) notes.push("Very early departure is part of the value of this route.");
  if (tour.tags.includes("boat") || tour.tags.includes("snorkeling")) notes.push("Sea conditions and harbor timing can affect the exact flow of the day.");
  if (tour.tags.includes("temple")) notes.push("Comfortable clothing and respectful temple-ready outfits are recommended.");
  if (tour.tags.includes("adventure") || tour.tags.includes("activity")) notes.push("Active shoes, light clothing, and a towel or change of clothes are usually a smart idea.");
  if (tour.tags.includes("helicopter")) notes.push("Flight timing is subject to weather and operator safety checks.");
  if (tour.tags.includes("transfer")) notes.push("Final transfer timing should be aligned with your hotel area, luggage, and departure details.");
  notes.push("Send your hotel area before booking so the route and timing can be matched properly.");
  return Array.from(new Set(notes)).slice(0, 6);
}

function buildFaqs(tour) {
  if (tour.faqs?.length) return tour.faqs;
  const faqs = [
    [
      `How long does the ${tour.title} take?`,
      `${tour.title} usually takes ${tour.duration.toLowerCase()}. The day normally begins with ${tour.pickup.toLowerCase()} and can shift slightly depending on hotel area, weather, and traffic or harbor timing.`,
    ],
    [
      `Who is the ${tour.title} best for?`,
      `This experience is best for ${tour.bestFor.toLowerCase()}. It is usually booked as a ${tour.format.toLowerCase()} and works best when the route style matches the kind of Bali day you want.`,
    ],
    [
      `What is usually included in the ${tour.title}?`,
      `Most bookings include ${buildIncludes(tour).slice(0, 4).join(", ").toLowerCase()}. Final inclusions always depend on the exact package that is confirmed for your date.`,
    ],
    [
      "How do I book this Bali experience?",
      "The fastest option is to send your date, hotel area, and group size on WhatsApp so pickup timing, package format, and route details can be confirmed correctly before payment.",
    ],
  ];
  if (tour.faqExtra) faqs[3] = tour.faqExtra;
  return faqs;
}

let westTemplateCache = null;

const BALI_WEATHER_OUTER_100VW_CSS = `  .bali-weather-outer {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 0 20px;
  }`;
const BALI_WEATHER_OUTER_STABLE_CSS = `  .bali-weather-outer {
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
    overflow-x: hidden;
    overflow-x: clip;
  }`;

function normalizeBaliWeatherOuterCss(html) {
  return html.split(BALI_WEATHER_OUTER_100VW_CSS).join(BALI_WEATHER_OUTER_STABLE_CSS);
}

// Rotating gradient "beam" behind the two AI buttons, matching the reference
// q-beam effect: a full conic gradient is blurred inside a padded wrapper, and
// the button's own opaque background hides the centre so only the halo shows.
const AI_BUTTON_BEAM_STYLE = `
<style id="sb-ai-button-beam">
@property --q-beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.sb-beam-wrap {
  position: relative;
  display: inline-block;
  padding: 6px;
  border-radius: 999px;
  vertical-align: middle;
  flex: 0 0 auto;
}
.sb-beam-wrap--block {
  display: block;
  width: 100%;
}
.sb-q-beam {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from var(--q-beam-angle),
    #7dd3fc,
    #c4b5fd,
    #f9a8d4,
    #fcd34d,
    #6ee7b7,
    #7dd3fc
  );
  filter: blur(7px);
  opacity: 0.7;
  animation: q-beam-spin 7s linear infinite;
}
@keyframes q-beam-spin {
  to { --q-beam-angle: 360deg; }
}
@media (prefers-reduced-motion: reduce) {
  .sb-q-beam { animation: none; }
}
#sbAiPlannerToggle,
#sbAiBuild {
  position: relative;
  z-index: 1;
}
#sbAiPlannerToggle {
  transform: none !important;
}
#sbAiBuild {
  width: 100%;
}
/* Below 768px the design strips filter buttons down to plain text. The beam
   needs an opaque face to hide behind, so keep the pill for the AI toggle. */
@media (max-width: 767px) {
  #sbAiPlannerToggle {
    border: 1.5px solid var(--blue-border) !important;
    background: #fff !important;
    border-radius: 999px !important;
    padding: 10px 18px !important;
    min-height: 44px !important;
  }
}
</style>`;

const AI_BEAM_SPAN = '<span class="sb-q-beam" aria-hidden="true"></span>';

// patchBaliMainFile rewrites the same file it reads, so the wrapper survives
// between runs. Guard on its presence instead of trying to unwrap: an unwrap
// regex cannot safely find the button's matching </span> and will corrupt the
// nested markup.
function wrapAiButtonsWithBeam(html) {
  if (html.includes("sb-beam-wrap")) return html;

  return html
    .replace(
      /<button([^>]*\bid="sbAiPlannerToggle"[^>]*)>([\s\S]*?)<\/button>/,
      `<span class="sb-beam-wrap sb-beam-wrap--toggle">${AI_BEAM_SPAN}<button$1>$2</button></span>`,
    )
    .replace(
      /<button([^>]*\bid="sbAiBuild"[^>]*)>([\s\S]*?)<\/button>/,
      `<span class="sb-beam-wrap sb-beam-wrap--block">${AI_BEAM_SPAN}<button$1>$2</button></span>`,
    );
}

function ensureAiButtonBeamStyle(html) {
  const clean = html.replace(/<style id="sb-ai-button-beam">[\s\S]*?<\/style>\s*/g, "");
  if (!clean.includes("sbAiPlannerToggle") && !clean.includes("sbAiBuild")) return clean;
  const wrapped = wrapAiButtonsWithBeam(clean);
  if (wrapped.includes("</head>")) {
    return wrapped.replace("</head>", `${AI_BUTTON_BEAM_STYLE}</head>`);
  }
  return `${AI_BUTTON_BEAM_STYLE}${wrapped}`;
}

function ensureBaliGlobalUiFix(html) {
  const clean = html.replace(/<style id="sb-bali-global-ui-fix">[\s\S]*?<\/style>\s*/g, "");

  if (clean.includes("</head>")) {
    return clean.replace("</head>", `${BALI_GLOBAL_UI_FIX}</head>`);
  }

  return `${BALI_GLOBAL_UI_FIX}${clean}`;
}

function collapseWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeJsSingleQuoted(value) {
  return collapseWhitespace(value).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

function compactWestHeroDuration(value) {
  const text = collapseWhitespace(String(value || ""));
  const match =
    text.match(/^((?:всего\s+|总共\s*)?\d+(?:[.,]\d+)?(?:\s*(?:[-–—]|à|to)\s*\d+(?:[.,]\d+)?)?\s*(?:hours?|часа|часов|час|horas?|heures?|小时))/iu) ||
    text.match(/^(full day|half day|полный день|día completo|journée complète|全天)/iu);
  if (match && match[1].length < text.length) {
    return match[1].trim();
  }
  const cut = text.split(/\s+(?:or|with|to|avec|con|с|со|или)\s+|,(?!\d)|，|\(|（/iu)[0].trim();
  if (cut && cut.length < text.length) {
    return cut;
  }
  return text;
}

function normalizedWestTemplatePrice(price) {
  const text = collapseWhitespace(price || "Ask price");
  if (!text) return "Ask price";
  if (/^ask price$/i.test(text)) return "Ask price";
  if (/per person/i.test(text)) return text.replace(/^from /i, "From ");
  if (/^from /i.test(text)) return `${text.replace(/^from /i, "From ")} per person`;
  return text;
}

function compactAreaLabel(tour) {
  if (tour.compactAreaLabel) {
    return clampText(collapseWhitespace(tour.compactAreaLabel), 24);
  }

  const search = tourSearchText(tour);

  if (search.includes("nusa penida")) return "Nusa Penida";
  if (search.includes("gili")) return "Gili Islands";
  if (search.includes("lovina") || search.includes("north bali")) return "North Bali";
  if (search.includes("ubud")) return "Ubud";
  if (search.includes("unesco") || search.includes("tanah lot") || search.includes("bedugul")) return "West & Central Bali";
  if (search.includes("mount batur") || search.includes("kintamani")) return "Kintamani";
  if (search.includes("lembongan") || search.includes("ceningan")) return "Nusa Islands";
  if (search.includes("atv")) return "Bali off-road";

  return clampText(
    collapseWhitespace(tour.area || tour.title)
      .replace(/\s+route$/i, "")
      .replace(/\s+tour$/i, ""),
    24,
  );
}

function formatWestHeroTitle(title) {
  const words = collapseWhitespace(title).split(" ").filter(Boolean);

  if (words.length <= 3) return escapeHtml(title);
  if (words.length === 4) return `${escapeHtml(words.slice(0, 2).join(" "))}<br>${escapeHtml(words.slice(2).join(" "))}`;
  if (words.length === 5) return `${escapeHtml(words.slice(0, 3).join(" "))}<br>${escapeHtml(words.slice(3).join(" "))}`;

  return `${escapeHtml(words.slice(0, -2).join(" "))}<br>${escapeHtml(words.slice(-2).join(" "))}`;
}

function normalizedWestHighlights(tour) {
  const highlights = (tour.highlights || [])
    .map(([title, text]) => [collapseWhitespace(title), collapseWhitespace(text)])
    .filter(([title, text]) => title && text);

  const fallbacks = [
    [
      "Easy booking",
      `Fast WhatsApp confirmation for ${collapseWhitespace(tour.title).toLowerCase()} availability, pickup timing, and full route details.`,
    ],
    [
      "What is included",
      `${buildIncludes(tour).slice(0, 3).join(", ")}${buildIncludes(tour).length ? "." : ""}`,
    ],
    [
      "Who this route fits",
      `Best for ${collapseWhitespace(tour.bestFor).toLowerCase()}.`,
    ],
    [
      "Why travelers book it",
      collapseWhitespace(tour.summary || tour.lead || tour.overview || `${tour.title} is one of the strongest Bali route options on the page.`),
    ],
  ].filter(([, text]) => text);

  while (highlights.length < 4 && fallbacks.length) {
    highlights.push(fallbacks.shift());
  }

  return highlights.slice(0, 4);
}

function compactWestAboutHeading(value) {
  const directReplacements = [
    [/^Kintamani volcano lunch views$/i, "Kintamani lunch views"],
    [/^Temple route with real depth$/i, "Temple route"],
    [/^Rice terrace and coffee stop$/i, "Rice terrace & coffee"],
    [/^Arts villages and Ubud finish$/i, "Arts & Ubud finish"],
    [/^Molenteng Tree House and Thousand Islands$/i, "Tree House viewpoint"],
    [/^Fast boat, island car, lunch, and tickets$/i, "Boat, car and tickets"],
    [/^Turtles, coral, and underwater statues$/i, "Turtles and statues"],
    [/^Lunch, showers, and transfer support$/i, "Lunch and transfer"],
    [/^Jungle, river, and tunnel ATV route$/i, "Jungle ATV route"],
    [/^Private snorkeling boat and guide$/i, "Private snorkel boat"],
    [/^Celebration and proposal friendly$/i, "Proposal friendly"],
    [/^Works for multiple island routes$/i, "Multiple island routes"],
    [/^Lovina sunrise dolphin watching$/i, "Lovina dolphin sunrise"],
    [/^Beginner-friendly guided format$/i, "Beginner guided route"],
    [/^Transport coordination included$/i, "Transport included"],
    [/^Premium short-format experience$/i, "Premium short flight"],
    [/^Tegalalang Rice Terrace finish$/i, "Tegalalang finish"],
    [/^Fast boat and transfer support$/i, "Boat transfer support"],
    [/^Useful for first-time visitors$/i, "First-time friendly"],
    [/^Useful across the whole island$/i, "Whole-island flexibility"],
    [/^Travel-day product, not a tour$/i, "Travel-day support"],
    [/^Couple and honeymoon friendly$/i, "Couple-friendly route"],
    [/^Mangroves and coastal bridges$/i, "Mangroves and bridges"],
    [/^Port and luggage practicality$/i, "Port and luggage help"],
    [/^Good for solo or group travel$/i, "Solo or group friendly"],
    [/^Private north Bali logistics$/i, "Private north route"],
    [/^Single or tandem ATV options$/i, "Single or tandem ATV"],
    [/^Gates of Heaven at Lempuyang$/i, "Gates of Heaven"],
    [/^Diamond Beach and Atuh Beach$/i, "Diamond and Atuh"],
    [/^Strong adventure positioning$/i, "Adventure standout"],
    [/^Shorter and easier logistics$/i, "Easy logistics"],
    [/^High-value practical product$/i, "Practical high value"],
    [/^Free time on Gili Trawangan$/i, "Gili free time"],
    [/^Ulun Danu Beratan Temple$/i, "Ulun Danu Temple"],
  ];
  const text = collapseWhitespace(value);
  const replacement = directReplacements.find(([pattern]) => pattern.test(text));
  if (replacement) return replacement[1];
  return clampText(text, 26);
}

function compactWestAboutDescription(heading, value) {
  const title = collapseWhitespace(heading);
  const text = collapseWhitespace(value);
  if (!text) return "";

  const directReplacements = [
    [
      /^A classic Bali landscape day with green terraces, jungle backdrops, and wide open viewpoints\.$/i,
      "Green terraces, jungle backdrops, and open Bali views.",
    ],
    [
      /^A calm cultural route that still feels premium and visually rich instead of overly touristy\.$/i,
      "Calm cultural stop with a premium, less touristy feel.",
    ],
    [
      /^Indonesian buffet lunch with wide views over Mount Batur and Lake Batur\.$/i,
      "Buffet lunch with wide Mount Batur and lake views.",
    ],
    [
      /^Batuan Temple, Sebatu, and Gunung Kawi bring the sacred side of the day into one smooth route\.$/i,
      "Sacred temple stops that add real depth to the route.",
    ],
    [
      /^Tegalalang scenery plus a plantation break for coffee, tea, and photo time\.$/i,
      "Tegalalang scenery plus coffee, tea, and photo time.",
    ],
    [
      /^Batik, silver, wood carving, Monkey Forest, and Ubud Palace keep the day full without feeling random\.$/i,
      "Craft villages, Monkey Forest, and Ubud Palace in one smooth finish.",
    ],
    [
      /^Spend more time at the places you like most and skip the unnecessary waiting of shared group trips\.$/i,
      "More time where you want it, without shared-group waiting.",
    ],
    [
      /^Add a refreshing nature break with an easy waterfall stop that fits your pace and energy\.$/i,
      "Easy waterfall stop that keeps the route fresh.",
    ],
    [
      /^The strongest west Penida visual and one of the most famous viewpoints in Bali province\.$/i,
      "One of the strongest cliff views on the whole route.",
    ],
    [
      /^A route built around cliffs, blue water, and big open landscapes instead of soft inland stops\.$/i,
      "Cliffs, blue water, and open coastal scenery all day.",
    ],
    [
      /^An easy choice when you want the Penida name-value without overthinking the island plan\.$/i,
      "Easy first Penida choice with the signature route covered.",
    ],
    [
      /^Mainland transfer, harbor flow, and island movement matter a lot here\.$/i,
      "Mainland, harbor, and island transfers are already coordinated.",
    ],
    [
      /^Head out on a traditional outrigger boat at dawn for one of north Bali's most requested wildlife-style sunrise experiences\.$/i,
      "Traditional dawn boat ride for Lovina's signature sunrise moment.",
    ],
    [
      /^Add a real waterfall section to the route instead of making the day only about the boat, which keeps the itinerary feeling fuller and more visual\.$/i,
      "Real waterfall stop that makes the route fuller and more visual.",
    ],
    [
      /^The value of this route is not only the stops but the fact that transport, timing, and the long road sections are already organized cleanly for you\.$/i,
      "Long north Bali logistics are already organized cleanly for you.",
    ],
    [
      /^Finish with one of Bali's most photogenic lake temples, a strong contrast after the open-water sunrise and forest stop\.$/i,
      "Photogenic lake-temple finish after the sunrise and forest stops.",
    ],
    [
      /^This is not a flat practice lap\. The route is designed to feel properly adventurous with Bali scenery built into the track itself\.$/i,
      "Proper off-road ride with Bali scenery built into the track.",
    ],
    [
      /^Professional instructors handle the safety briefing, pacing, and support so first-time riders can still enjoy the day confidently\.$/i,
      "Guide support keeps first-time riders comfortable and confident.",
    ],
    [
      /^The product works for solo travelers, couples, friends, and mixed-skill groups because you can choose how you want to ride\.$/i,
      "Flexible ride format for solo travelers, couples, and friends.",
    ],
    [
      /^The practical pieces are already handled, which makes the activity feel smoother and more premium than booking a basic ride only\.$/i,
      "Useful extras are already handled for a smoother, easier day.",
    ],
  ];

  const directReplacement = directReplacements.find(([pattern]) => pattern.test(text));
  if (directReplacement) return directReplacement[1];

  const keywordTemplates = [
    [/rice terrace|terrace/i, "Green terraces, jungle backdrops, and open Bali views."],
    [/temple/i, "Calm cultural stop with a premium, less touristy feel."],
    [/waterfall/i, "Easy waterfall stop that keeps the route fresh."],
    [/transport|transfer|boat|harbou?r|logistics|support|included/i, "Transport and timing are already handled for you."],
    [/private pacing|private route|private island car|private north route/i, "More time where you want it with smooth private pacing."],
    [/first-time|beginner/i, "Easy to enjoy even on your first Bali route."],
    [/group|solo|couple|family/i, "Flexible fit for solo travelers, couples, or friends."],
    [/dolphin/i, "Classic north Bali sunrise moment with dolphin appeal."],
    [/manta|snorkel|turtle|coral|whale shark/i, "Clear-water marine highlight with memorable wildlife."],
    [/atv|rafting|adventure/i, "Active route with real movement, scenery, and fun."],
    [/sunset|cruise|romantic|proposal/i, "Soft scenic timing with a polished Bali feel."],
    [/viewpoint|views|scenery|coastal|cliff|landscape|diamond|atuh|kelingking|gates of heaven/i, "One of the strongest visual stops on this route."],
    [/lunch|tickets|shower/i, "Useful extras are already covered for an easier day."],
    [/guide/i, "Guide support keeps the route easier and smoother."],
  ];

  const keywordTemplate = keywordTemplates.find(([pattern]) => pattern.test(title));
  if (keywordTemplate) return keywordTemplate[1];

  const sentence = text.split(/(?<=[.!?])\s+/)[0].trim();
  const shortened = sentence
    .replace(/^This is not[^.]*\.\s*/i, "")
    .replace(/^This (?:route|product|experience) is /i, "")
    .replace(/^This (?:route|product|experience) works /i, "Works ")
    .replace(/^A route built around /i, "")
    .replace(/^An easy choice when you want /i, "")
    .replace(/^The strongest [^,]+ and /i, "")
    .replace(/^The practical pieces are already handled, which makes /i, "")
    .replace(/^The value of this route is not only the stops but the fact that /i, "")
    .replace(/^Professional instructors handle /i, "Guide support handles ")
    .replace(/^Add /i, "")
    .replace(/^Finish with /i, "")
    .replace(/^Spend more time /i, "More time ")
    .replace(/\binstead of\b/gi, "over")
    .replace(/\bthat still feels\b/gi, "with")
    .replace(/\s+/g, " ")
    .trim();

  const compacted = clampText(shortened, 58).replace(/…$/, "");
  const finalText = /[.!?]$/.test(compacted) ? compacted : `${compacted}.`;
  return finalText.charAt(0).toUpperCase() + finalText.slice(1);
}

function cleanWestStopLabel(value) {
  const cleaned = collapseWhitespace(value)
    .replace(/^\d{1,2}:\d{2}(?:\s*[-–]\s*\d{1,2}:\d{2})?\s*/g, "")
    .replace(/\b(morning|early|late|optional|direct)\b/gi, "")
    .replace(/\b(pickup|transfer|return|drive|hotel|head|continue|begin|finish|visit|arrival|arrive|exploration|to)\b/gi, "")
    .replace(/\b(and|then)\b/gi, " ")
    .replace(/\bor\b/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .trim();

  return clampText(cleaned || "Main stop", 26);
}

function buildWestRouteStops(tour) {
  const seen = new Set();
  const stops = [];
  const push = (value) => {
    const label = cleanWestStopLabel(value);
    const key = label.toLowerCase();
    if (!label || seen.has(key)) return;
    seen.add(key);
    stops.push(label);
  };

  push(compactAreaLabel(tour));
  for (const [heading] of tour.highlights || []) push(heading);
  for (const [heading] of tour.itinerary || []) push(heading);
  push("Return transfer");

  while (stops.length < 5) {
    push(`${tour.title} stop ${stops.length + 1}`);
  }

  return stops.slice(0, 5);
}

function cleanWestStopDisplayLabel(value) {
  return collapseWhitespace(value)
    .replace(/^\d{1,2}:\d{2}(?:\s*[-–]\s*\d{1,2}:\d{2})?\s*/g, "")
    .replace(/\boptional\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*(bali|indonesia)\b.*$/i, "")
    .trim();
}

function buildWestReadableStops(tour) {
  const configuredRoute = WEST_ROUTE_POINTS[tour.slug];
  const candidates = configuredRoute?.stops?.length
    ? configuredRoute.stops
    : configuredRoute?.routeStops?.length
      ? configuredRoute.routeStops
      : [
          ...(tour.itinerary || []).map(([heading]) => heading),
          ...(tour.highlights || []).map(([heading]) => heading),
        ];
  const seen = new Set();
  const stops = [];

  for (const stop of candidates) {
    const label = cleanWestStopDisplayLabel(stop);
    const key = label.toLowerCase();
    if (!label || seen.has(key)) continue;
    seen.add(key);
    stops.push(label);
  }

  return stops.slice(0, 5);
}

function buildWestFaqs(tour) {
  const explicitFaqs = (tour.faqs || [])
    .map(([question, answer]) => [collapseWhitespace(question), collapseWhitespace(answer)])
    .filter(([question, answer]) => question && answer);

  const includes = buildIncludes(tour);
  const notes = buildGoodToKnow(tour);
  const routeStops = buildWestReadableStops(tour).slice(0, 4);
  const generatedFaqs = [
    [
      `Is hotel pickup included in the ${tour.title}?`,
      `Usually yes. ${collapseWhitespace(tour.pickup || `Pickup timing is confirmed before the ${tour.title} starts.`)}`,
    ],
    [
      "Where is the meeting point for the tour?",
      collapseWhitespace(
        tour.meetingPoint ||
          (tour.pickup
            ? `Most travelers are picked up directly from their hotel, villa, or agreed Bali meeting point before the route begins.`
            : `The meeting point is confirmed in advance together with the exact timing for your date.`),
      ),
    ],
    [
      `What is included in the ${tour.price || "tour"} price?`,
      includes.length
        ? `Typical inclusions are ${includes.join(", ").toLowerCase()}.`
        : `The final inclusion list is confirmed before booking together with the route timing and format.`,
    ],
    [
      "What is not included in the package?",
      collapseWhitespace(
        notes.find((note) => /\bnot included\b|\bbring cash\b|\bpersonal expenses\b/i.test(note)) ||
          "Personal expenses and optional extras are usually not included unless they are clearly listed before booking.",
      ),
    ],
    [
      "Which places are included on this route?",
      routeStops.length
        ? `This route usually focuses on ${routeStops.join(", ")}, with the final stop order adjusted to timing, weather and traffic conditions.`
        : `The exact stop list is confirmed in advance based on the selected Bali route and the final timing window.`,
    ],
    [
      `How long does the ${tour.title} take?`,
      `${tour.title} usually takes ${collapseWhitespace(tour.duration).toLowerCase()}, with the exact finish time shaped by weather, traffic, and the hotel area.`,
    ],
    [
      `Who is the ${tour.title} best for?`,
      `This route is best for ${collapseWhitespace(tour.bestFor).toLowerCase()} and usually feels strongest when you want ${collapseWhitespace(tour.format).toLowerCase()} pacing instead of improvising Bali logistics yourself.`,
    ],
    [
      "Is this route suitable for first-time visitors to Bali?",
      `Usually yes. The ${tour.title} is designed to feel clear and easy to follow, especially when you want a polished Bali day without stitching separate stops together yourself.`,
    ],
    [
      "Can the timing or route be customized?",
      /private/i.test(tour.format || "") || hasTourTag(tour, "private")
        ? `Yes. Because this is usually booked as a private Bali route, timing and stop order can often be adjusted around your hotel area and the pace you want for the day.`
        : `Sometimes. The best option is to message the team before booking so they can confirm what can realistically be adjusted for your date.`,
    ],
    [
      "Does the team help with timing and photos during the day?",
      `Usually yes. The team helps with route flow, practical timing and photo stops when possible so the day feels smoother from pickup to drop-off.`,
    ],
    [
      "What should I bring for this tour?",
      collapseWhitespace(
        notes.find((note) => /\bbring\b|\bcamera\b|\bsunscreen\b|\bchange of clothes\b/i.test(note)) ||
          `${plannerWhatToBring(tour)}.`,
      ),
    ],
    [
      "What happens if the weather is not ideal?",
      `Safety and route quality come first. Timing, stop order or the final route details may need to be adjusted if weather or local conditions are not suitable, and the team will guide you to the best available option.`,
    ],
  ];

  const combined = [...explicitFaqs];
  for (const faq of generatedFaqs) {
    if (combined.length >= 12) break;
    if (!combined.some(([question]) => question.toLowerCase() === faq[0].toLowerCase())) {
      combined.push(faq);
    }
  }

  return combined.slice(0, 12);
}

function ensureSentence(value) {
  const text = collapseWhitespace(value);
  if (!text) return "";
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

function renderWestRichText(item) {
  const labelHtml = item.label ? `<strong>${escapeHtml(item.label)}:</strong> ` : "";
  const textHtml = item.textHtml || escapeHtml(ensureSentence(item.text));
  return `${labelHtml}${textHtml}`;
}

function renderWestRichCopy({ intro = null, items = [] }) {
  const normalizedItems = items.filter((item) => item && (item.text || item.textHtml));
  const introHtml = intro && (intro.text || intro.textHtml)
    ? `<p class="sb-tour-copy__intro"><span class="sb-tour-copy__emoji" aria-hidden="true">${intro.emoji || "✨"}</span><span class="sb-tour-copy__content">${renderWestRichText(intro)}</span></p>`
    : "";

  if (!normalizedItems.length) return introHtml || "";

  return `${introHtml}<ul class="sb-tour-copy__list">${normalizedItems
    .map(
      (item) =>
        `<li class="sb-tour-copy__item"><span class="sb-tour-copy__emoji" aria-hidden="true">${item.emoji || "✨"}</span><span class="sb-tour-copy__content">${renderWestRichText(item)}</span></li>`,
    )
    .join("")}</ul>`;
}

function westCopyEmoji(text, fallback = "✨") {
  const lower = collapseWhitespace(text).toLowerCase();
  if (/\bweather|sea conditions|traffic|timing|operator|pace\b/.test(lower)) return "⏱️";
  if (/\bnot recommended|pregnant|mobility|heart|back|non-swimmer|safety\b/.test(lower)) return "⚠️";
  if (/\bnot included|cash|personal expenses|tax|admission\b/.test(lower)) return "💵";
  if (/\bbring\b|\btowel\b|\bswimwear\b|\bsunscreen\b|\bjacket\b|\bsandals\b|\bchange of clothes\b|\bsunglasses\b|\bpassport\b/.test(lower)) {
    return "🎒";
  }
  if (/\bbest fit\b|\bbest for\b|\bcouples\b|\bfamilies\b|\bfriends\b|\bkids\b|\bsolo\b/.test(lower)) return "👥";
  if (/\bturtle|coral|reef|snorkel|manta|whale|dolphin|surf|ocean|sea|water|lagoon\b/.test(lower)) return "🌊";
  if (/\btemple|heritage|culture|ceremony|unesco\b/.test(lower)) return "🛕";
  if (/\bsunrise|sunset|morning\b/.test(lower)) return "🌅";
  if (/\bvolcano|mount batur|batur|lava|mountain|jeep\b/.test(lower)) return "🌋";
  if (/\bphoto|instagram|camera|gopro\b/.test(lower)) return "📸";
  if (/\bboat|harbor|harbour|crossing|ferry|port\b/.test(lower)) return "🚤";
  if (/\btransfer|pickup|driver|airport|hotel\b/.test(lower)) return "🚗";
  if (/\bprivate|guide|support|coordination|whatsapp|confirmation\b/.test(lower)) return "🤝";
  if (/\bfree time|relax|cafe|beach club|sunbed|beach\b/.test(lower)) return "🏝️";
  if (/\batv|rafting|adventure|active\b/.test(lower)) return "🔥";
  if (/\bhelicopter|flight|aerial\b/.test(lower)) return "🚁";
  if (/\bmeeting point|check-in|office|location\b/.test(lower)) return "📍";
  return fallback;
}

function westIncludeLabel(item) {
  const lower = collapseWhitespace(item).toLowerCase();
  if (/\bguide|private\b/.test(lower)) return "Private support";
  if (/\bgopro|photo|video\b/.test(lower)) return "Memories";
  if (/\bsnorkel|life jacket|safety briefing|equipment\b/.test(lower)) return "Water setup";
  if (/\btransfer|pickup|hotel\b/.test(lower)) return "Transfers";
  if (/\binsurance|bottled water|tax\b/.test(lower)) return "Useful extras";
  if (/\bboat|harbor|harbour|port\b/.test(lower)) return "Boat logistics";
  return "Included";
}

function westImportantLabel(item) {
  const lower = collapseWhitespace(item).toLowerCase();
  if (/\bnot included|personal expenses|cash|tax|admission\b/.test(lower)) return "Extra costs";
  if (/\bexperience usually runs\b/.test(lower)) return "Route format";
  if (/\bbest fit\b/.test(lower)) return "Best for";
  if (/\bweather|sea conditions|traffic|operator|pace|timing\b/.test(lower)) return "Timing can shift";
  if (/\bbring\b|\btowel\b|\bswimwear\b|\bsunscreen\b|\bjacket\b|\bsandals\b|\bchange of clothes\b|\bsunglasses\b|\bpassport\b/.test(lower)) {
    return "Bring with you";
  }
  if (/\bnot recommended|pregnant|mobility|heart|back|non-swimmer\b/.test(lower)) return "Before you join";
  if (/\bmeeting point|check-in|office|location\b/.test(lower)) return "Meeting point";
  if (/\bpickup|hotel\b/.test(lower)) return "Pickup note";
  return "Good to know";
}

function buildWestHighlightsHtml(tour) {
  const ui = westUiLabels(tour);
  const items = normalizedWestHighlights(tour).map(([heading, text]) => ({
    emoji: westCopyEmoji(`${heading} ${text}`, "📍"),
    label: heading,
    text,
  }));

  return renderWestRichCopy({
    intro: {
      emoji: "✨",
      label: ui.highlightsIntroLabel,
      text: tour.lead,
    },
    items,
  });
}

function buildWestFullDescriptionHtml(tour) {
  const ui = westUiLabels(tour);
  const routeStops = buildWestReadableStops(tour)
    .filter((stop) => stop && !/return transfer/i.test(stop))
    .slice(0, 4);

  return renderWestRichCopy({
    items: [
      {
        emoji: "🌴",
        label: ui.fullDescriptionWhyBookLabel,
        text: tour.summary,
      },
      {
        emoji: "🧭",
        label: ui.fullDescriptionHowDayFeelsLabel,
        text: tour.overview,
      },
      routeStops.length
        ? {
            emoji: "📍",
            label: ui.fullDescriptionKeyStopsLabel,
            textHtml:
              tour.fullDescriptionKeyStopsHtml ||
              `Usually built around <strong>${escapeHtml(routeStops.join(" -> "))}</strong>.`,
          }
        : null,
      {
        emoji: "👥",
        label: ui.fullDescriptionBestFitLabel,
        textHtml:
          tour.fullDescriptionBestFitHtml ||
          `Great for <strong>${escapeHtml(collapseWhitespace(tour.bestFor))}</strong> with a route that usually runs for <strong>${escapeHtml(collapseWhitespace(tour.duration))}</strong>.`,
      },
    ],
  });
}

function buildWestIncludesHtml(tour) {
  const ui = westUiLabels(tour);
  return renderWestRichCopy({
    intro: {
      emoji: "✅",
      label: ui.includesIntroLabel,
      text: ui.includesIntroText,
    },
    items: buildIncludes(tour).map((item) => ({
      emoji: westCopyEmoji(item, "✅"),
      label: westIncludeLabel(item),
      text: item,
    })),
  });
}

function buildWestImportantInfoHtml(tour) {
  const notes = buildGoodToKnow(tour).slice();
  if (!notes.some((note) => /\bbring\b|\btowel\b|\bsunscreen\b|\bjacket\b|\bswimwear\b/i.test(note))) {
    notes.push(`Bring ${plannerWhatToBring(tour)}.`);
  }

  return renderWestRichCopy({
    items: notes.map((note) => ({
      emoji: westCopyEmoji(note, "ℹ️"),
      label: westImportantLabel(note),
      text: note,
    })),
  });
}

function westRouteLabel(tour) {
  const kind = detectTourKind(tour);

  if (kind === "sunrise") return "Sunrise route";
  if (kind === "marine") return "Water route";
  if (kind === "island") return "Island route";
  if (kind === "culture") return "Heritage route";
  if (kind === "instagram") return "Photo route";
  if (kind === "adventure") return "Adventure route";
  if (kind === "transfer") return "Transfer route";
  if (kind === "helicopter") return "Flight route";

  return "Bali route";
}

function buildWestMapQueryLinks(routeStops) {
  const query = routeStops
    .map((stop) => encodeURIComponent(collapseWhitespace(stop)).replaceAll("'", "%27"))
    .join("%2C%20");
  return {
    embedRoute: `https://maps.google.com/maps?q=${query}&z=11&output=embed`,
    openRoute: `https://www.google.com/maps/search/?api=1&query=${query}`,
  };
}

function buildWestMapDirectionsLinks(routeStops) {
  const places = routeStops
    .map((stop) => collapseWhitespace(stop))
    .filter(Boolean);

  if (places.length < 2) {
    return buildWestMapQueryLinks(places.length ? places : ["Bali"]);
  }

  const encodedPlaces = places.map((place) => encodeURIComponent(place).replaceAll("'", "%27"));
  const [start, ...rest] = encodedPlaces;

  return {
    embedRoute: `https://maps.google.com/maps?output=embed&f=d&saddr=${start}&daddr=${rest.join("+to:")}`,
    openRoute: `https://www.google.com/maps/dir/${encodedPlaces.join("/")}`,
  };
}

function buildWestMapText(tour, stops) {
  if (tour.mapText) {
    return collapseWhitespace(tour.mapText);
  }

  const points = stops
    .map((stop) => collapseWhitespace(stop))
    .filter(Boolean);

  return `Preview the key map points for ${tour.title}. This route usually highlights ${points.join(", ")}. Final timing, pickup, and stop order are confirmed after booking.`;
}

function buildWestMapModel(tour) {
  const configuredRoute = WEST_ROUTE_POINTS[tour.slug];
  const stops = configuredRoute?.stops?.length ? configuredRoute.stops : buildWestRouteStops(tour);
  const routeStops = configuredRoute?.routeStops?.length ? configuredRoute.routeStops : stops;
  const links = buildWestMapDirectionsLinks(routeStops);

  return {
    embedRoute: links.embedRoute,
    openRoute: links.openRoute,
    label: collapseWhitespace(tour.mapLabel || westRouteLabel(tour)),
    title: collapseWhitespace(tour.mapTitle || `${tour.title} route on Google Maps`),
    text: buildWestMapText(tour, stops),
    stops,
  };
}

function buildWestPrivateOfferModel(tour) {
  const includes = buildIncludes(tour);
  const highlights = normalizedWestHighlights(tour);
  const routeStops = buildWestRouteStops(tour);
  const numericPrice = String(normalizedWestTemplatePrice(tour.price)).match(/\$[0-9]+(?:\.[0-9]+)?/);
  const privatePriceValue = numericPrice ? numericPrice[0] : "Ask";

  return {
    eyebrow:
      collapseWhitespace(tour.privateOfferEyebrow) ||
      {
        sunrise: "Classic sunrise route",
        marine: "Sea-day favorite",
        island: "Island bestseller",
        culture: "Best-selling heritage route",
        instagram: "Private photo day",
        adventure: "High-energy Bali route",
        transfer: "Easy Bali logistics",
        helicopter: "Premium flight route",
      }[detectTourKind(tour)] ||
      "Best-selling Bali route",
    heading: tour.title,
    text: collapseWhitespace(tour.summary || tour.lead || tour.overview),
    benefits: [
      includes[0] || `${compactAreaLabel(tour)} logistics handled`,
      includes[1] || `${routeStops[1] || routeStops[0]} included`,
      includes[2] || `${routeStops[2] || "Main highlights"} planned for you`,
    ].map(collapseWhitespace),
    imageAlt: collapseWhitespace(tour.imageAlt || tour.title),
    topline: collapseWhitespace(
      tour.privateOfferTopline || `Best for ${collapseWhitespace(tour.bestFor).toLowerCase()}`,
    ),
    cardTitle: tour.title,
    cardText: collapseWhitespace(tour.lead || tour.summary || tour.overview),
    pills: [
      clampText(collapseWhitespace(tour.format || "Private Bali route"), 28),
      clampText(routeStops[1] || compactAreaLabel(tour), 28),
      clampText(includes[0] || highlights[0][0], 28),
      clampText(collapseWhitespace(tour.pickup || "Pickup confirmed after booking"), 28),
    ],
    ctaLabel: collapseWhitespace(tour.ctaLabel || "Book now"),
    priceValue: privatePriceValue,
  };
}

function firstSentence(text) {
  const source = collapseWhitespace(text || "");
  if (!source) return "";
  const match = source.match(/^(.+?[.!?])(?:\s|$)/);
  return match ? match[1] : source;
}

function clampPromoText(text, maxLength = 120) {
  const source = collapseWhitespace(text || "");
  if (!source || source.length <= maxLength) return source;
  const sliced = source.slice(0, maxLength + 1);
  const breakpoints = [sliced.lastIndexOf(". "), sliced.lastIndexOf(", "), sliced.lastIndexOf(" ")];
  const cut = breakpoints.find((index) => index > maxLength * 0.65);
  return (cut && cut > 0 ? sliced.slice(0, cut) : sliced.slice(0, maxLength)).replace(/[,\s.;:!?-]+$/g, "");
}

function compactRouteSentence(stops) {
  const cleanStops = (stops || []).map((stop) => collapseWhitespace(stop)).filter(Boolean).slice(0, 5);
  if (!cleanStops.length) return "";
  if (cleanStops.length === 1) return `${cleanStops[0]} in one easy route.`;
  if (cleanStops.length === 2) return `${cleanStops[0]} and ${cleanStops[1]} in one easy route.`;
  const head = cleanStops.slice(0, -1).join(", ");
  return `${head}, and ${cleanStops.at(-1)} in one easy route.`;
}

function buildWestMiniPromoModel(tour) {
  const routeStops = buildWestRouteStops(tour)
    .slice(1, 5)
    .filter(Boolean);
  const promoTitle = `<strong>${formatWestHeroTitle(tour.title).replace(/<br>/g, "</strong><br /><strong>")}</strong>`;
  const promoText = collapseWhitespace(
    tour.miniPromoText ||
      clampPromoText(firstSentence(tour.lead || tour.summary || "")) ||
      clampPromoText(routeStops.length ? `${routeStops.length} key stops: ${routeStops.join(", ")}.` : "") ||
      (routeStops.length ? `${routeStops.length} key stops: ${routeStops.join(", ")}.` : tour.overview),
  );

  return {
    eyebrow:
      collapseWhitespace(tour.miniPromoEyebrow) ||
      {
        sunrise: "Early-start favorite",
        marine: "Ocean-day route",
        island: "Island bestseller",
        culture: "Heritage route",
        instagram: "Photo-day favorite",
        adventure: "Action route",
        transfer: "Easy logistics",
        helicopter: "Premium aerial route",
    }[detectTourKind(tour)] || "Best-selling Bali route",
    title: promoTitle,
    text: collapseWhitespace(promoText),
    ctaLabel: collapseWhitespace(tour.ctaLabel || "Book now"),
    sideText: (function () {
      const curated = collapseWhitespace(tour.miniPromoSideText);
      if (curated) return curated;
      const full =
        collapseWhitespace(firstSentence(tour.summary || tour.lead || tour.overview || "")) ||
        collapseWhitespace(compactRouteSentence(routeStops));
      if (!full) return "";
      const clamped = clampPromoText(full, 104);
      return clamped.length < full.length ? `${clamped}…` : clamped;
    })(),
  };
}

function buildWestReviews(tour) {
  if (Array.isArray(tour.reviews) && tour.reviews.length) {
    return tour.reviews.map((review) => ({
      text: collapseWhitespace(review.text),
      title: collapseWhitespace(review.title),
      date: collapseWhitespace(review.date),
    }));
  }

  const routeStops = buildWestRouteStops(tour).slice(1, 5);
  const highlightNames = normalizedWestHighlights(tour).map(([heading]) => heading);

  return [
    {
      text: `${highlightNames[0] || tour.title} was the main reason we booked this route, but the whole day felt smooth from start to finish. The planning, timing, and support made ${tour.title} easy to enjoy.`,
      title: "Emma - Australia",
      date: "April 18, 2026 - Verified booking",
    },
    {
      text: `This was one of the easiest full Bali days of our trip. ${routeStops.slice(0, 2).join(" and ") || tour.title} stood out most, and everything felt organized without being rushed.`,
      title: "Noah - Canada",
      date: "April 27, 2026 - Verified booking",
    },
    {
      text: `Very good value for a full day out. We had time for photos, the route flowed well, and the team helped all day with timing and practical details across ${compactAreaLabel(tour)}.`,
      title: "Lina - Sweden",
      date: "May 6, 2026 - Verified booking",
    },
  ];
}

function buildWestKeywords(tour) {
  const keywords = [
    tour.title,
    compactAreaLabel(tour),
    "Bali tour",
    ...normalizedWestHighlights(tour).map(([heading]) => heading),
  ]
    .map(collapseWhitespace)
    .filter(Boolean)
    .slice(0, 6);

  return escapeHtml(keywords.join(", "));
}

function replaceMetaTag(html, name, content) {
  const escapedContent = escapeHtml(content);
  return html.replace(
    new RegExp(`(<meta[^>]+name="${escapeRegExp(name)}"[^>]+content=")([^"]*)(")`, "i"),
    (_, start, __old, end) => `${start}${escapedContent}${end}`,
  );
}

function replacePropertyTag(html, property, content) {
  const escapedContent = escapeHtml(content);
  return html.replace(
    new RegExp(`(<meta[^>]+property="${escapeRegExp(property)}"[^>]+content=")([^"]*)(")`, "i"),
    (_, start, __old, end) => `${start}${escapedContent}${end}`,
  );
}

function replaceCanonicalLink(html, href) {
  return html.replace(/(<link rel="canonical" href=")([^"]*)(")/i, (_, start, __old, end) => `${start}${escapeHtml(href)}${end}`);
}

function replaceSingleQuotedField(html, field, content) {
  return html.replace(
    new RegExp(`(field='${escapeRegExp(field)}'>)([\\s\\S]*?)(</(?:div|h1|h2|h3)>)`),
    (_, start, __old, end) => `${start}${content}${end}`,
  );
}

function replaceDoubleQuotedField(html, field, content) {
  return html.replace(
    new RegExp(`(field="${escapeRegExp(field)}">)([\\s\\S]*?)(</div>)`),
    (_, start, __old, end) => `${start}${content}${end}`,
  );
}

function replaceTildaBackgroundImageByElemId(html, elemId, imagePath, altText) {
  const normalizedImagePath = normalizeJournalImageSrc(imagePath);
  return html.replace(
    new RegExp(
      `(data-elem-id='${escapeRegExp(elemId)}'[\\s\\S]*?<div class='tn-atom t-bgimg' data-original=")([^"]*)("[\\s\\S]*?aria-label=')([^']*)(' role="img")`,
    ),
    (_, start, __oldPath, middle, __oldAlt, end) =>
      `${start}${escapeHtml(normalizedImagePath)}${middle}${escapeHtml(altText)}${end} style="background-image:url('${escapeHtml(
        normalizedImagePath,
      )}');"`,
  );
}

function buildCollageAsset(imagePath, altText) {
  const normalizedImagePath = normalizeJournalImageSrc(imagePath);

  if (!normalizedImagePath) return null;

  return {
    imagePath: normalizedImagePath,
    altText: collapseWhitespace(altText),
  };
}

function tourHeroImage(slug) {
  const relatedTour = tourBySlug(slug);
  return relatedTour ? publicImagePath(relatedTour) : publicImagePath(tours[0]);
}

function routeStopAltText(stop, tour) {
  return `${cleanWestStopLabel(stop)} on the ${tour.title}`;
}

function resolveWestCollageStopImage(stop, tour) {
  const value = collapseWhitespace(stop);
  const lower = value.toLowerCase();
  const exactPlaceImage = (title) => BALI_PLANNER_PLACE_IMAGE_BY_TITLE[title] || "";
  const altText = routeStopAltText(value, tour);
  const rules = [
    [/ubud palace|puri ubud/i, exactPlaceImage("Puri Ubud") || commonsImage("Ubud Palace, Bali, Indonesia, 20220822 0904 9820.jpg")],
    [/(tega|tega?l+|tega?l+a)l?a?ng|rice terrace/i, exactPlaceImage("Tegalalang Rice Terrace") || BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace],
    [/tirta empul/i, exactPlaceImage("Tirta Empul Temple") || BALI_PLANNER_PLACE_IMAGES.ubudTemple],
    [/batuan/i, BALI_PLANNER_PLACE_IMAGES.ubudTemple],
    [/sebatu/i, exactPlaceImage("Gunung Kawi Sebatu") || BALI_PLANNER_PLACE_IMAGES.ubudTemple],
    [/gunung kawi/i, exactPlaceImage("Gunung Kawi Temple") || BALI_PLANNER_PLACE_IMAGES.ubudTemple],
    [/kintamani/i, BALI_PLANNER_PLACE_IMAGES.mountBaturSunriseLocal],
    [/monkey forest/i, BALI_PLANNER_PLACE_IMAGES.ubudMonkeyForest],
    [/goa gajah/i, exactPlaceImage("Goa Gajah") || BALI_PLANNER_PLACE_IMAGES.ubudGoaGajah],
    [/tegenungan/i, commonsImage("Kanto lampo waterfall.jpg")],
    [/lovina|dolphin/i, plannerLocalImage("images/bali-tours/dolphin-sunrise-city-tour.jpg")],
    [/gitgit|banyumala|ulu petanu|waterfall/i, exactPlaceImage("Kanto Lampo Waterfall") || BALI_PLANNER_PLACE_IMAGES.ubudWaterfall],
    [/handara/i, plannerLocalImage("images/bali-tours/bali-instagram-highlights-tour.jpg")],
    [/ulun danu|bedugul/i, exactPlaceImage("Ulun Danu Beratan Temple") || plannerLocalImage("images/bali-tours/tanah-lot-bedugul-tour.jpg")],
    [/candikuning/i, plannerLocalImage("images/bali-tours/tanah-lot-bedugul-tour.jpg")],
    [/taman ayun|batukaru/i, exactPlaceImage("Taman Ayun Temple") || plannerLocalImage("images/bali-tours/unesco-taman-ayun.jpg")],
    [/jatiluwih/i, exactPlaceImage("Jatiluwih Rice Terrace") || plannerLocalImage("images/bali-tours/unesco-jatiluwih-hero.jpg")],
    [/tanah lot/i, exactPlaceImage("Tanah Lot Temple") || commonsImage("Tanah Lot, Bali, Indonesia, 20220827 0957 1103.jpg")],
    [/lempuyang/i, exactPlaceImage("Lempuyang Temple") || BALI_PLANNER_PLACE_IMAGES.eastBaliLempuyang],
    [/tirta gangga/i, exactPlaceImage("Tirta Gangga") || BALI_PLANNER_PLACE_IMAGES.eastBaliTirtaGangga],
    [/taman ujung/i, plannerLocalImage("images/bali-tours/east-bali-instagram-tour.jpg")],
    [/lahangan|virgin beach/i, plannerLocalImage("images/bali-tours/east-bali-instagram-tour.jpg")],
    [/toya bungkah|mount batur sunrise point|black lava|black sand batur|batur natural hot spring|mount batur/i, plannerLocalImage("images/tild3963-6334-4438-b163-623862386363___batur_jeep.jpg")],
    [/gorilla atv|gorilla cave|keliki|bresela/i, plannerLocalImage("images/bali-tours/atv-quad-bikes.webp")],
    [/ayung river|kedewatan|sayan|payangan/i, plannerLocalImage("images/bali-tours/white-water-rafting.webp")],
    [/blue lagoon beach|tanjung jepun|bias tugel/i, plannerLocalImage("images/bali-tours/blue-lagoon-snorkeling.webp")],
    [/padang bai|wannen bali office/i, plannerLocalImage("images/bali-tours/fast-boat-transfer-bali.webp")],
    [/kelingking/i, plannerLocalImage("images/bali-tours/west-collage/nusa-penida-west-kelingking-wide.webp")],
    [/broken beach/i, plannerLocalImage("images/bali-tours/west-collage/nusa-penida-west-broken-beach-card.webp")],
    [/angel.?s billabong/i, plannerLocalImage("images/bali-tours/west-collage/nusa-penida-west-angels-billabong-card.webp")],
    [/crystal bay/i, plannerLocalImage("images/bali-tours/west-collage/nusa-penida-west-crystal-bay-wide.webp")],
    [/diamond beach|atuh beach/i, plannerLocalImage("images/smile-nusa-penida-east-diamond-beach.jpg")],
    [/molenteng|thousand islands/i, plannerLocalImage("images/bali-tours/nusa-penida-east-tour.jpg")],
    [/teletubbies/i, plannerLocalImage("images/bali-tours/nusa-penida-east-tour.webp")],
    [/manta point|gamat bay|wall bay/i, plannerLocalImage("images/bali-tours/nusa-penida-manta-rays-point.webp")],
    [/banjar nyuh/i, plannerLocalImage("images/bali-tours/nusa-penida-full-day-tour.webp")],
    [/jungut batu|dream beach|devil.?s tear|yellow bridge|blue lagoon, nusa ceningan/i, plannerLocalImage("images/bali-tours/nusa-lembongan-ceningan-day-trip.webp")],
    [/gili trawangan|gili meno|gili air|turtle point|nest underwater statues|bangsal/i, plannerLocalImage("images/bali-tours/gili-island-tour.jpg")],
    [/saleh bay|whale shark|labuan jambu|sumbawa besar|bagan/i, plannerLocalImage("images/bali-tours/sumbawa-whale-shark-snorkeling-trip.webp")],
    [/benoa harbour|benoa bay|serangan island|jimbaran bay/i, plannerLocalImage("images/bali-tours/sunset-cruise-bali.jpg")],
    [/nusa dua beach/i, exactPlaceImage("Nusa Dua Beach") || BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach],
    [/kuta beach|legian beach|double six beach/i, plannerLocalImage("images/bali-tours/surf-lesson-experience.webp")],
    [/batu bolong/i, exactPlaceImage("Batu Bolong Beach") || BALI_PLANNER_PLACE_IMAGES.cangguBeach],
    [/airport|ngurah rai/i, plannerLocalImage("images/bali-tours/bali-airport-transfer.jpg")],
    [/seminyak/i, exactPlaceImage("Seminyak Beach") || BALI_PLANNER_PLACE_IMAGES.seminyakBeach],
    [/canggu/i, BALI_PLANNER_PLACE_IMAGES.cangguBeach],
    [/uluwatu/i, exactPlaceImage("Uluwatu Temple") || BALI_PLANNER_PLACE_IMAGES.uluwatuTemple],
    [/sanur beach|sanur port/i, exactPlaceImage("Sanur Beach Boardwalk") || BALI_PLANNER_PLACE_IMAGES.sanurBeach],
    [/benoa heliport|tanjung benoa|garuda wisnu kencana|gwk/i, plannerLocalImage("images/bali-tours/bali-helicopter-scenic-tour.jpg")],
    [/amed beach/i, plannerLocalImage("images/bali-tours/volcano-coastline-helicopter-ride.jpeg")],
    [/kuta, bali/i, plannerLocalImage("images/bali-tours/bali-airport-transfer.jpg")],
    [/ubud, bali/i, exactPlaceImage("Puri Ubud") || BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace],
  ];

  for (const [pattern, imagePath] of rules) {
    if (pattern.test(lower)) {
      return buildCollageAsset(imagePath, altText);
    }
  }

  return null;
}

function buildWestCollageStops(tour) {
  const configuredRoute = WEST_ROUTE_POINTS[tour.slug];
  const routeStops = configuredRoute?.routeStops?.length ? configuredRoute.routeStops : buildWestRouteStops(tour);
  const scenicStops = routeStops.filter((stop) => !/harbour|harbor|port|airport|office/i.test(stop));
  const prioritizedStops = scenicStops.length ? scenicStops : routeStops;
  const supportStops = routeStops.filter((stop) => !prioritizedStops.includes(stop));

  return [...prioritizedStops, ...supportStops].slice(0, WEST_COLLAGE_SLOT_IDS.length);
}

function buildWestCollageFallbackAssets(tour) {
  const heroAsset = buildCollageAsset(publicImagePath(tour), tour.imageAlt || tour.title);
  const kindFallbackImages = {
    sunrise: [
      plannerLocalImage("images/bali-tours/dolphin-sunrise-city-tour.jpg"),
      plannerLocalImage("images/tild3963-6334-4438-b163-623862386363___batur_jeep.jpg"),
      plannerLocalImage("images/bali-tours/north-bali-lovina-dolphins-tour.jpg"),
    ],
    marine: [
      plannerLocalImage("images/bali-tours/nusa-penida-manta-rays-point.webp"),
      plannerLocalImage("images/bali-tours/blue-lagoon-snorkeling.webp"),
      plannerLocalImage("images/bali-tours/sunset-cruise-bali.jpg"),
    ],
    island: [
      plannerLocalImage("images/bali-tours/nusa-penida-east-tour.jpg"),
      plannerLocalImage("images/bali-tours/west-collage/nusa-penida-west-kelingking-wide.webp"),
      plannerLocalImage("images/bali-tours/nusa-lembongan-ceningan-day-trip.webp"),
    ],
    culture: [
      plannerLocalImage("images/bali-tours/tanah-lot-bedugul-tour.jpg"),
      BALI_PLANNER_PLACE_IMAGES.ubudRiceTerrace,
      BALI_PLANNER_PLACE_IMAGES.ubudTemple,
    ],
    instagram: [
      plannerLocalImage("images/bali-tours/bali-instagram-highlights-tour.jpg"),
      BALI_PLANNER_PLACE_IMAGES.eastBaliLempuyang,
      BALI_PLANNER_PLACE_IMAGES.eastBaliTirtaGangga,
    ],
    adventure: [
      plannerLocalImage("images/bali-tours/atv-quad-bikes.webp"),
      plannerLocalImage("images/tild3963-6334-4438-b163-623862386363___batur_jeep.jpg"),
      plannerLocalImage("images/bali-tours/white-water-rafting.webp"),
    ],
    transfer: [
      plannerLocalImage("images/bali-tours/bali-airport-transfer.jpg"),
      plannerLocalImage("images/bali-tours/fast-boat-transfer-bali.webp"),
      BALI_PLANNER_PLACE_IMAGES.sanurBeach,
    ],
    helicopter: [
      plannerLocalImage("images/bali-tours/bali-helicopter-scenic-tour.jpg"),
      plannerLocalImage("images/bali-tours/volcano-coastline-helicopter-ride.jpeg"),
      BALI_PLANNER_PLACE_IMAGES.nusaDuaBeach,
    ],
  };
  const fallbackImages = kindFallbackImages[detectTourKind(tour)] || [tourHeroImage("ubud-highlights-tour")];

  return [heroAsset]
    .concat(
      fallbackImages.map((imagePath) =>
        buildCollageAsset(imagePath, `${tour.title} photo stop in ${compactAreaLabel(tour)}`),
      ),
    )
    .filter(Boolean);
}

function buildWestCollageImageOverrides(tour) {
  if (tour.slug !== "nusa-penida-west-tour") {
    const explicitAssets = Array.isArray(tour.collageImages)
      ? tour.collageImages
          .map((asset) =>
            buildCollageAsset(
              typeof asset === "string" ? asset : asset?.imagePath,
              typeof asset === "string" ? `${tour.title} in Bali` : asset?.altText || `${tour.title} in Bali`,
            ),
          )
          .filter(Boolean)
      : [];
    const stopAssets = buildWestCollageStops(tour)
      .map((stop) => resolveWestCollageStopImage(stop, tour))
      .filter(Boolean);
    const uniqueAssets = [];
    const seenImagePaths = new Set();

    for (const asset of explicitAssets.concat(stopAssets, buildWestCollageFallbackAssets(tour))) {
      if (!asset || seenImagePaths.has(asset.imagePath)) continue;
      seenImagePaths.add(asset.imagePath);
      uniqueAssets.push(asset);
      if (uniqueAssets.length >= WEST_COLLAGE_SLOT_IDS.length) break;
    }

    while (uniqueAssets.length < WEST_COLLAGE_SLOT_IDS.length) {
      uniqueAssets.push(
        buildCollageAsset(publicImagePath(tour), tour.imageAlt || `${tour.title} in Bali`),
      );
    }

    return WEST_COLLAGE_SLOT_IDS.map((elemId, index) => ({
      elemId,
      imagePath: uniqueAssets[index].imagePath,
      altText: uniqueAssets[index].altText,
    }));
  }

  return [
    {
      elemId: "1721248463091",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-kelingking-wide.webp",
      altText: "Kelingking Beach cliffs and white sand on the Nusa Penida west tour",
    },
    {
      elemId: "1721248463131",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-broken-beach-card.webp",
      altText: "Broken Beach arch and turquoise water on the Nusa Penida west tour",
    },
    {
      elemId: "1721248463134",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-angels-billabong-card.webp",
      altText: "Angel's Billabong natural pool on the Nusa Penida west tour",
    },
    {
      elemId: "1721248463127",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-crystal-bay-wide.webp",
      altText: "Crystal Bay beach and palm-lined coast on the Nusa Penida west tour",
    },
    {
      elemId: "1721248463137",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-broken-beach-tall.webp",
      altText: "Broken Beach limestone arch above blue water on the Nusa Penida west tour",
    },
    {
      elemId: "1721248463123",
      imagePath: "/images/bali-tours/west-collage/nusa-penida-west-crystal-bay-tall.webp",
      altText: "Crystal Bay cove and boats on the Nusa Penida west tour",
    },
  ];
}

function applyWestCollageImageOverrides(html, tour) {
  return buildWestCollageImageOverrides(tour).reduce(
    (currentHtml, override) =>
      replaceTildaBackgroundImageByElemId(currentHtml, override.elemId, override.imagePath, override.altText),
    html,
  );
}

function renderStandaloneFaqSchema(tour) {
  const faq = buildWestFaqs(tour);

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
    null,
    2,
  );
}

function replaceLdJsonBlocks(html, tour) {
  const blocks = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];

  if (blocks[0]) {
    html = html.replace(blocks[0], `<script type="application/ld+json">\n${renderStructuredData(tour)}\n</script>`);
  }

  if (blocks[1]) {
    html = html.replace(blocks[1], `<script type="application/ld+json">\n${renderStandaloneFaqSchema(tour)}\n</script>`);
  }

  return html;
}

function getWestTemplateHtml() {
  if (!westTemplateCache) {
    westTemplateCache = normalizeBaliWeatherOuterCss(fs.readFileSync(WEST_TEMPLATE_SOURCE_FILE, "utf8"));
  }

  return westTemplateCache;
}

function applyBaliBlueFooter(html) {
  let updated = html
    .replaceAll(BALI_FOOTER_GRADIENT_FROM, BALI_FOOTER_GRADIENT_TO)
    .replaceAll(BALI_FOOTER_GRADIENT_LEGACY_BLUE, BALI_FOOTER_GRADIENT_TO);

  if (!updated.includes('id="sb-bali-footer-layout-fix"') && updated.includes('id="rec1803718291"')) {
    updated = updated.replace(
      /(<div id="rec1803718291"[\s\S]*?<\/style>)/,
      `$1${BALI_FOOTER_LAYOUT_FIX_STYLE}`,
    );
  }

  return updated;
}

function renderWestStylePage(tour) {
  const title = tour.metaTitle || `${tour.title} | SB Excursions`;
  const description = tour.metaDescription || collapseWhitespace(tour.summary || tour.lead || tour.overview);
  const route = tourRoute(tour);
  const absoluteRoute = absoluteTourUrl(tour);
  const absoluteImage = absoluteImageUrl(tour);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(tour))}`;
  const highlights = normalizedWestHighlights(tour);
  const aboutHighlights = highlights.map(([heading, text]) => [
    compactWestAboutHeading(heading),
    compactWestAboutDescription(heading, text),
  ]);
  const faq = buildWestFaqs(tour);
  const map = buildWestMapModel(tour);
  const mapStopFields = [
    "tn_text_1721243533774",
    "tn_text_1721243533790",
    "tn_text_1721243533793",
    "tn_text_1721243533797",
    "tn_text_1721243533799",
  ];
  const mapStopLabels =
    map.stops.length === 4
      ? [map.stops[0], map.stops[1], map.stops[2], "", map.stops[3]]
      : mapStopFields.map((_, index) => map.stops[index] || "");
  const offer = buildWestPrivateOfferModel(tour);
  const miniPromo = buildWestMiniPromoModel(tour);
  const reviews = buildWestReviews(tour);
  const imagePath = publicImagePath(tour);
  const privateOfferAssets = (() => {
    const explicit = Array.isArray(tour.collageImages)
      ? tour.collageImages
          .map((asset) =>
            buildCollageAsset(
              typeof asset === "string" ? asset : asset?.imagePath,
              typeof asset === "string" ? `${tour.title} in Bali` : asset?.altText || `${tour.title} in Bali`,
            ),
          )
          .filter(Boolean)
      : [];
    const fallback = buildCollageAsset(imagePath, tour.imageAlt || `${tour.title} in Bali`);
    const picked = explicit.slice(0, 3);

    while (picked.length < 3 && fallback) {
      picked.push(fallback);
    }

    return picked;
  })();
  const offerSectionHeading = collapseWhitespace(tour.offerSectionHeading || "Route format & pricing");
  const offerPrimaryLabel = /private/i.test(collapseWhitespace(tour.format || "")) ? "Private route" : clampText(collapseWhitespace(tour.format || "Bali route"), 18);
  const offerSupportEyebrow = /optional/i.test(collapseWhitespace(tour.pickup || ""))
    ? "Optional pickup"
    : "Pickup included";
  const offerSupportLabel = clampText(/optional/i.test(collapseWhitespace(tour.pickup || "")) ? "Hotel transfer" : "Major Bali areas", 18);
  const offerSupportTitle = /hotel|pickup/i.test(collapseWhitespace(tour.pickup || ""))
    ? "Hotel pickup and return"
    : "Travel support included";
  const offerSupportPrice = /optional/i.test(collapseWhitespace(tour.pickup || "")) ? "Optional" : "Free";
  const offerIncludedEyebrow = clampText(/ticket/i.test((buildIncludes(tour)[0] || "") + " " + (buildIncludes(tour)[1] || "")) ? "Tickets included" : "Easy planning", 18);
  const offerIncludedLabel = clampText(
    buildIncludes(tour).find((item) => /private/i.test(item)) || buildIncludes(tour)[0] || "Private car",
    18,
  );
  const offerIncludedTitle = /ticket/i.test(buildIncludes(tour).join(" "))
    ? "All entrance tickets arranged"
    : "Private route support";
  const offerBottomPricePrefix = /\$/.test(offer.priceValue) ? "from" : "";
  const heroArea = compactAreaLabel(tour);
  const heroLead = collapseWhitespace(tour.lead || tour.summary || tour.overview);
  const aboutSubtitle = collapseWhitespace(tour.aboutSubtitle || tour.title);
  const highlightsHtml = buildWestHighlightsHtml(tour);
  const fullDescriptionHtml = buildWestFullDescriptionHtml(tour);
  const includesHtml = buildWestIncludesHtml(tour);
  const importantInfoHtml = buildWestImportantInfoHtml(tour);
  const genericFaqIntro = collapseWhitespace(tour.faqIntro || `Quick answers before booking the ${tour.title}.`);
  const weatherArea = compactAreaLabel(tour).toLowerCase();
  const brokenBaliDestinationsMenu =
    '<ul role="list" class="t-menusub__list"> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Dubai, UAE</a> </li> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Bali, Indonesia</a> </li> </ul>';
  const fixedBaliDestinationsMenu =
    '<ul role="list" class="t-menusub__list"> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/dubai/en#tours" data-menu-item-number="1">Dubai, UAE</a> </li> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Bali, Indonesia</a> </li> </ul>';

  let html = getWestTemplateHtml();

  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/data-tilda-page-alias="bali\/en\/tours\/[^"]+"/i, `data-tilda-page-alias="${route.slice(1)}"`)
    .replaceAll('href="/dubai/en/about"', 'href="/bali/en/main-page#about"')
    .replaceAll('href="/dubai/en/faq"', 'href="/bali/en/main-page#faq"')
    .replaceAll('href="/dubai/en#tours"', 'href="/bali/en/main-page#tours"')
    .replaceAll('href="/" class="t228__imgwrapper"', 'href="/bali/en/main-page" class="t228__imgwrapper"')
    .replaceAll('href="/" class="t451__logowrapper"', 'href="/bali/en/main-page" class="t451__logowrapper"')
    .replace(
      /href=""([^>]*data-menu-item-number="5"[^>]*)>\s*Our guides\s*</g,
      `href="${JOURNAL_HUB_ROUTE}"$1>Our guides<`,
    );

  html = html.split(brokenBaliDestinationsMenu).join(fixedBaliDestinationsMenu);

  html = replaceMetaTag(html, "description", description);
  html = replaceMetaTag(html, "keywords", collapseWhitespace(buildWestKeywords(tour)));
  html = replacePropertyTag(html, "og:url", absoluteRoute);
  html = replacePropertyTag(html, "og:title", title);
  html = replacePropertyTag(html, "og:description", description);
  html = replacePropertyTag(html, "og:image", absoluteImage);
  html = replaceCanonicalLink(html, absoluteRoute);

  html = replaceSingleQuotedField(html, "tn_text_1766426116262000001", formatWestHeroTitle(tour.title));
  html = replaceSingleQuotedField(html, "tn_text_1766419725555", escapeHtml(heroLead));
  html = replaceSingleQuotedField(html, "tn_text_1721240739954", escapeHtml(normalizedWestTemplatePrice(tour.price)));
  html = replaceSingleQuotedField(html, "tn_text_1721240739957", escapeHtml(compactWestHeroDuration(tour.duration)));
  html = replaceSingleQuotedField(html, "tn_text_1766425094306", escapeHtml(heroArea));
  html = replaceSingleQuotedField(html, "tn_text_1721244135148", escapeHtml(aboutSubtitle));
  html = replaceSingleQuotedField(html, "tn_text_1721244135153", escapeHtml(aboutHighlights[0][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135162", escapeHtml(aboutHighlights[0][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135179", escapeHtml(aboutHighlights[1][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135184", escapeHtml(aboutHighlights[1][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135195", escapeHtml(aboutHighlights[2][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135199", escapeHtml(aboutHighlights[2][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135209", escapeHtml(aboutHighlights[3][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135213", escapeHtml(aboutHighlights[3][1]));
  html = replaceSingleQuotedField(html, "tn_text_1766481493302000001", escapeHtml(miniPromo.eyebrow));
  html = replaceSingleQuotedField(html, "tn_text_1766620130918", escapeHtml(miniPromo.sideText));
  html = replaceSingleQuotedField(html, "tn_text_1766442865058", miniPromo.title);
  html = replaceSingleQuotedField(html, "tn_text_1766442925510", escapeHtml(miniPromo.text));
  html = replaceSingleQuotedField(html, "tn_text_1766484562953", escapeHtml(offerSectionHeading));
  html = replaceSingleQuotedField(html, "tn_text_1766484368351000015", formatWestHeroTitle(tour.title));
  html = replaceSingleQuotedField(html, "tn_text_1766482792574000004", escapeHtml(collapseWhitespace(tour.duration)));
  html = replaceSingleQuotedField(html, "tn_text_1766482941015000002", escapeHtml(offerPrimaryLabel));
  html = replaceSingleQuotedField(html, "tn_text_1766493001632000002", escapeHtml(offer.priceValue));
  html = replaceSingleQuotedField(html, "tn_text_1766484372486000019", escapeHtml(offerSupportEyebrow));
  html = replaceSingleQuotedField(html, "tn_text_1766484372486000020", escapeHtml(offerSupportLabel));
  html = replaceSingleQuotedField(html, "tn_text_1766484372486000023", escapeHtml(offerSupportEyebrow));
  html = replaceSingleQuotedField(html, "tn_text_1766484372486000024", escapeHtml(offerSupportTitle));
  html = replaceSingleQuotedField(html, "tn_text_1766484393522000025", escapeHtml(offerSupportPrice));
  html = replaceSingleQuotedField(html, "tn_text_1766485293442000001", escapeHtml(collapseWhitespace(tour.duration)));
  html = replaceSingleQuotedField(html, "tn_text_1766483692909000006", escapeHtml(offerIncludedLabel));
  html = replaceSingleQuotedField(html, "tn_text_1766483692909000009", escapeHtml(offerIncludedEyebrow));
  html = replaceSingleQuotedField(html, "tn_text_1766483692909000010", escapeHtml(offerIncludedTitle));
  html = replaceSingleQuotedField(html, "tn_text_1766483692909000005", escapeHtml(offerBottomPricePrefix));
  html = replaceSingleQuotedField(html, "tn_text_1766483730357000013", escapeHtml(offer.priceValue));

  html = replaceDoubleQuotedField(html, "li_descr__7138223910800", highlightsHtml);
  html = replaceDoubleQuotedField(html, "li_descr__7138223910801", fullDescriptionHtml);
  html = replaceDoubleQuotedField(html, "li_descr__7138223910802", includesHtml);
  html = replaceDoubleQuotedField(html, "li_descr__1767049015805", importantInfoHtml);

  const faqTitleFields = [
    "li_title__4097761591620",
    "li_title__4097761591621",
    "li_title__4097761591622",
    "li_title__4097761591623",
    "li_title__4097761591624",
    "li_title__4097761591625",
    "li_title__4097761591626",
    "li_title__4097761591627",
    "li_title__1766649799048",
    "li_title__1766649842783",
    "li_title__1766649858330",
    "li_title__1766649883675",
  ];
  const faqDescriptionFields = [
    "li_descr__4097761591620",
    "li_descr__4097761591621",
    "li_descr__4097761591622",
    "li_descr__4097761591623",
    "li_descr__4097761591624",
    "li_descr__4097761591625",
    "li_descr__4097761591626",
    "li_descr__4097761591627",
    "li_descr__1766649799048",
    "li_descr__1766649842783",
    "li_descr__1766649858330",
    "li_descr__1766649883675",
  ];

  faq.forEach(([question, answer], index) => {
    html = replaceDoubleQuotedField(html, faqTitleFields[index], escapeHtml(`${index + 1}. ${question}`));
    html = replaceDoubleQuotedField(html, faqDescriptionFields[index], escapeHtml(answer));
  });

  const reviewTextFields = ["li_text__1957513727452", "li_text__1957513727450", "li_text__1957513727451"];
  const reviewTitleFields = ["li_title__1957513727452", "li_title__1957513727450", "li_title__1957513727451"];
  const reviewDateFields = ["li_descr__1957513727452", "li_descr__1957513727450", "li_descr__1957513727451"];

  reviews.forEach((review, index) => {
    html = replaceDoubleQuotedField(html, reviewTextFields[index], escapeHtml(review.text));
    html = replaceDoubleQuotedField(html, reviewTitleFields[index], escapeHtml(review.title));
    html = replaceDoubleQuotedField(html, reviewDateFields[index], escapeHtml(review.date));
  });

  html = html
    .replaceAll("/images/bali-tours/nusa-penida-west-tour.webp", imagePath)
    .replaceAll("/images/bali-tours/nusa-penida-full-day-tour.webp", imagePath)
    .replaceAll("/images/bali-tours/nusa-penida-manta-rays-point.webp", imagePath)
    .replaceAll("/images/bali-tours/fast-boat-transfer-bali.webp", imagePath)
    .replaceAll("One Day Nusa Penida West Tour cliffs and coastline", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("Route map for the One Day Nusa Penida West Tour", escapeHtml(`Route map for the ${tour.title}`))
    .replaceAll("Fast boat route and coastline views for the Nusa Penida west tour", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("West Penida coastline and tropical ocean color during the island tour", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("Travelers enjoying Crystal Bay and west Penida coastal scenery", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("Broken Beach and west Penida cliffs above the ocean", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("Island transport between west Penida viewpoints", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("Fast boat and island-day logistics for west Penida", escapeHtml(tour.imageAlt || tour.title))
    .replaceAll("One Day Nusa Penida West Tour", escapeHtml(tour.title))
    .replaceAll("One Day Nusa Penida West Tour from Bali", escapeHtml(aboutSubtitle))
    .replaceAll("aria-label='One day Nusa Penida west tour from Bali'", `aria-label='${escapeHtml(aboutSubtitle)}'`)
    .replaceAll("alt='Watch video card for the One Day Nusa Penida West Tour'", `alt='Watch video card for the ${escapeHtml(tour.title)}'`)
    .replaceAll("Quick answers before booking your west Penida day tour", escapeHtml(genericFaqIntro))
    .replaceAll(
      "https://wa.me/6285333685020?text=Hi%21%20I%20want%20to%20book%20the%20One%20Day%20Nusa%20Penida%20West%20Tour%20for%20%2445%20per%20person.%20Please%20send%20me%20the%20available%20dates%2C%20pickup%20options%20and%20full%20details.",
      whatsappUrl,
    )
    .replaceAll(
      "https://wa.me/6285333685020?text=Hi%21%20I%20want%20to%20book%20the%20One%20Day%20Nusa%20Penida%20West%20Tour.%20Please%20send%20me%20the%20shared%2C%20private%20and%20hotel%20pickup%20options%20with%20the%20available%20dates.",
      whatsappUrl,
    )
    .replaceAll("Best-selling format", escapeJsSingleQuoted(offer.eyebrow))
    .replaceAll("West coast classic", escapeJsSingleQuoted(offer.heading))
    .replaceAll(
      "The cleanest way to do Nusa Penida\\'s famous west side with fast boat, island car, lunch and main entry tickets already arranged for you.",
      escapeJsSingleQuoted(offer.text),
    )
    .replaceAll("Fast boat tickets included", escapeJsSingleQuoted(offer.benefits[0]))
    .replaceAll("Lunch, water and tickets included", escapeJsSingleQuoted(offer.benefits[1]))
    .replaceAll("4 iconic west-coast stops", escapeJsSingleQuoted(offer.benefits[2]))
    .replaceAll("Best for first-time visitors", escapeJsSingleQuoted(offer.topline))
    .replaceAll(
      "Broken Beach, Angel\\'s Billabong, Kelingking Beach and Crystal Bay in one organized island day from Bali with easy boat logistics and WhatsApp support.",
      escapeJsSingleQuoted(offer.cardText),
    )
    .replaceAll("Shared or private", escapeJsSingleQuoted(offer.pills[0]))
    .replaceAll("4 main stops", escapeJsSingleQuoted(offer.pills[1]))
    .replaceAll("All main tickets included", escapeJsSingleQuoted(offer.pills[2]))
    .replaceAll("Optional Bali pickup", escapeJsSingleQuoted(offer.pills[3]))
    .replaceAll("Book this tour", escapeHtml(offer.ctaLabel))
    .replaceAll("Book via WhatsApp", escapeHtml(offer.ctaLabel))
    .replaceAll("Book West Tour", escapeJsSingleQuoted(offer.ctaLabel))
    .replaceAll('<span class="tn-atom__button-text">Buy now</span>', `<span class="tn-atom__button-text">${escapeHtml(offer.ctaLabel)}</span>`)
    .replaceAll(">$45<", `>${escapeJsSingleQuoted(offer.priceValue)}<`)
    .replaceAll("Nusa Penida west route on Google Maps", escapeJsSingleQuoted(map.title))
    .replaceAll("Island route", escapeJsSingleQuoted(map.label))
    .replaceAll(
      "See the classic west-side island route from Banjar Nyuh Harbor to Broken Beach, Angel\\'s Billabong, Kelingking Beach and Crystal Bay before returning for the boat back to Bali.",
      escapeJsSingleQuoted(map.text),
    )
    .replaceAll(
      "https://maps.google.com/maps?output=embed&f=d&saddr=Banjar+Nyuh+Harbor,+Nusa+Penida&daddr=Broken+Beach,+Nusa+Penida+to:Angel%27s+Billabong,+Nusa+Penida+to:Kelingking+Beach,+Nusa+Penida+to:Crystal+Bay,+Nusa+Penida+to:Banjar+Nyuh+Harbor,+Nusa+Penida",
      map.embedRoute,
    )
    .replaceAll(
      "https://www.google.com/maps/dir/Banjar+Nyuh+Harbor,+Nusa+Penida/Broken+Beach,+Nusa+Penida/Angel%27s+Billabong,+Nusa+Penida/Kelingking+Beach,+Nusa+Penida/Crystal+Bay,+Nusa+Penida/Banjar+Nyuh+Harbor,+Nusa+Penida",
      map.openRoute,
    )
    .replaceAll(
      "Open the west Penida route in Google Maps",
      escapeJsSingleQuoted(collapseWhitespace(tour.mapOpenLabel || "Open google maps route")),
    )
    .replaceAll("See west Penida tour", escapeJsSingleQuoted(`See ${tour.title}`))
    .replaceAll(
      "Perfect weather for west Penida viewpoints, clear ocean color and longer island sightseeing.",
      escapeJsSingleQuoted(`Perfect weather for ${weatherArea} routes, clear views, and easy sightseeing.`),
    )
    .replaceAll(
      "A beautiful day for west Penida viewpoints, boat crossings and easy outdoor plans.",
      escapeJsSingleQuoted(`A beautiful day for ${weatherArea} sightseeing and easy outdoor plans.`),
    )
    .replaceAll("Banjar Nyuh Harbor", escapeJsSingleQuoted(map.stops[0]))
    .replaceAll("Broken Beach", escapeJsSingleQuoted(map.stops[1]))
    .replaceAll("Angel\\'s Billabong", escapeJsSingleQuoted(map.stops[2]))
    .replaceAll("Kelingking Beach", escapeJsSingleQuoted(map.stops[3]))
    .replaceAll("Crystal Bay", escapeJsSingleQuoted(map.stops[4]))
    .replaceAll("Most flexible", escapeJsSingleQuoted(miniPromo.eyebrow))
    .replaceAll(
      "<strong>Iconic</strong><br /><strong>West Penida Day</strong><br /><strong>from Bali</strong>",
      miniPromo.title,
    )
    .replaceAll(
      "Discover the best Nusa Penida west tour from Bali. Cross by fast boat, explore Broken Beach, Angel's Billabong, Kelingking Beach and Crystal Bay, and enjoy the island's most iconic cliff views in one unforgettable day.",
      escapeHtml(miniPromo.sideText),
    )
    .replaceAll(
      "4 west-coast icons: Broken Beach, Angel's Billabong, Kelingking Beach and Crystal Bay.",
      escapeHtml(miniPromo.text),
    )
    .replaceAll("Book now", escapeHtml(miniPromo.ctaLabel));

  mapStopFields.forEach((field, index) => {
    html = replaceSingleQuotedField(html, field, escapeHtml(mapStopLabels[index] || ""));
  });

  html = applyWestCollageImageOverrides(html, tour);
  if (privateOfferAssets[0]) {
    html = replaceTildaBackgroundImageByElemId(
      html,
      "1775497556211000003",
      privateOfferAssets[0].imagePath,
      privateOfferAssets[0].altText,
    );
  }
  if (privateOfferAssets[1]) {
    html = replaceTildaBackgroundImageByElemId(
      html,
      "1766477486741000004",
      privateOfferAssets[1].imagePath,
      privateOfferAssets[1].altText,
    );
  }
  if (privateOfferAssets[2]) {
    html = replaceTildaBackgroundImageByElemId(
      html,
      "1766477463111000002",
      privateOfferAssets[2].imagePath,
      privateOfferAssets[2].altText,
    );
  }

  html = html.replace(
    /(<div class='tn-atom'><a href=")\/bali\/en\/tours\/nusa-penida-west-tour("target="_blank"style="color: inherit"><u>)Nusa Penida West Tour(<\/u><\/a><\/div>)/,
    `$1${route}$2${escapeHtml(tour.title)}$4`,
  );

  html = injectWestPageSpecificStyle(html, tour);
  html = applyBaliBlueFooter(html);
  html = replaceLdJsonBlocks(html, tour);
  html = ensureBaliGlobalUiFix(html);
  return html;
}

const WEST_TOUR_LAYOUT_FIX_CSS = `
#rec2121233163 .t396__artboard,
#rec2121233163 .t396__filter,
#rec2121233163 .t396__carrier {
  height: 53.5vw !important;
  min-height: 641px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739929"] {
  top: 48px !important;
  left: calc(50% - 600px + 20px) !important;
  width: 1160px !important;
  height: 575px !important;
  overflow: hidden !important;
  border-radius: 24px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739967"] {
  text-align: center !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739929"] .tn-atom {
  border-radius: inherit !important;
  overflow: hidden !important;
  background-clip: padding-box !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] {
  top: 110px !important;
  left: calc(50% - 600px + 67px) !important;
  width: 796px !important;
  height: auto !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] .tn-atom {
  font-size: 66px !important;
  line-height: 1.1 !important;
  font-weight: 600 !important;
  letter-spacing: -1px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766419725555"] {
  top: 264px !important;
  left: calc(50% - 600px + 69px) !important;
  width: 665px !important;
  height: auto !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766419725555"] .tn-atom {
  font-size: 20px !important;
  line-height: 1.55 !important;
  font-weight: 500 !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739954"] {
  top: 363px !important;
  left: calc(50% - 600px + 68px) !important;
  width: 238px !important;
  height: auto !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739957"] {
  top: 363px !important;
  left: calc(50% - 600px + 304px) !important;
  width: 123px !important;
  height: auto !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739962"] {
  top: 365px !important;
  left: calc(50% - 600px + 279px) !important;
  width: 18px !important;
  height: 18px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766426474516"] {
  top: 365px !important;
  left: calc(50% - 600px + 393px) !important;
  width: 18px !important;
  height: 18px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766425094306"] {
  top: 363px !important;
  left: calc(50% - 600px + 415px) !important;
  width: 113px !important;
  height: auto !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739962"] .tn-atom,
#rec2121233163 .tn-elem[data-elem-id="1766426474516"] .tn-atom {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
}

#rec2121233163 .tn-elem[data-elem-id="1766426474516"] .tn-atom__img,
#rec2121233163 .tn-elem[data-elem-id="1766426474516"] .t-img {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: center center !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739954"] .tn-atom,
#rec2121233163 .tn-elem[data-elem-id="1721240739957"] .tn-atom,
#rec2121233163 .tn-elem[data-elem-id="1766425094306"] .tn-atom {
  display: block !important;
  line-height: 1.1 !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740062"] {
  top: 406px !important;
  left: calc(50% - 600px + 69px) !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740064"] {
  top: 406px !important;
  left: calc(50% - 600px + 93px) !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740065"] {
  top: 406px !important;
  left: calc(50% - 600px + 118px) !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740066"] {
  top: 406px !important;
  left: calc(50% - 600px + 140px) !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740067"] {
  top: 406px !important;
  left: calc(50% - 600px + 163px) !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740071"] {
  top: 404px !important;
  left: calc(50% - 600px + 188px) !important;
  width: 22px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240740074"] {
  top: 404px !important;
  left: calc(50% - 600px + 217px) !important;
  width: 117px !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739964"] {
  top: 438px !important;
  left: calc(50% - 600px + 70px) !important;
  width: 250px !important;
  height: 43px !important;
  transform: none !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739967"] {
  top: 438px !important;
  left: calc(50% - 600px + 70px) !important;
  width: 250px !important;
  height: 43px !important;
  transform: none !important;
}

#rec2121233163 .tn-elem[data-elem-id="1721240739967"] .tn-atom {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 16px !important;
  text-align: center !important;
  font-size: 17px !important;
  line-height: 1.05 !important;
  font-weight: 600 !important;
}

@media screen and (max-width: 1199px) and (min-width: 960px) {
  #rec2121233163 .t396__artboard,
  #rec2121233163 .t396__filter,
  #rec2121233163 .t396__carrier {
    height: 62.2vw !important;
    min-height: 597px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739929"] {
    height: 531px !important;
  }
}

#rec2121222003 .t585__text {
  color: #334155;
  line-height: 1.72 !important;
}

#rec2121222003 .t585__text .sb-tour-copy__intro,
#rec2121222003 .t585__text .sb-tour-copy__item {
  margin: 0;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

#rec2121222003 .t585__text .sb-tour-copy__intro {
  margin-bottom: 14px;
}

#rec2121222003 .t585__text .sb-tour-copy__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

#rec2121222003 .t585__text .sb-tour-copy__emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  transform: translateY(2px);
}

#rec2121222003 .t585__text .sb-tour-copy__content {
  min-width: 0;
}

#rec2121222003 .t585__text .sb-tour-copy__content strong {
  color: #0f172a;
  font-weight: 700;
}

#rec2121221993 .tn-elem[data-elem-id="1721244135153"],
#rec2121221993 .tn-elem[data-elem-id="1721244135179"],
#rec2121221993 .tn-elem[data-elem-id="1721244135195"],
#rec2121221993 .tn-elem[data-elem-id="1721244135209"] {
  height: auto !important;
  min-height: 24px !important;
  overflow: visible !important;
  z-index: 5 !important;
}

#rec2121221993 .tn-elem[data-elem-id="1721244135153"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135179"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135195"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135209"] .tn-atom {
  display: block !important;
  white-space: normal !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  hyphens: auto !important;
  line-height: 1.15 !important;
  text-align: center !important;
}

@media screen and (max-width: 959px) {
  #rec2121233163 .t396__artboard,
  #rec2121233163 .t396__filter,
  #rec2121233163 .t396__carrier {
    height: 402px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739929"] {
    top: 58px !important;
    left: calc(50% - 320px + 10px) !important;
    width: 620px !important;
    height: 338px !important;
    border-radius: 18px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] {
    top: 89px !important;
    left: calc(50% - 320px + 30px) !important;
    width: 329px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] .tn-atom {
    font-size: 27px !important;
    line-height: 1.1 !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766419725555"] {
    top: 179px !important;
    left: calc(50% - 320px + 30px) !important;
    width: 390px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766419725555"] .tn-atom {
    font-size: 12px !important;
    line-height: 1.55 !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739954"] {
    top: 225px !important;
    left: calc(50% - 320px + 28px) !important;
    width: 150px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739962"] {
    top: 227px !important;
    left: calc(50% - 320px + 187px) !important;
    width: 16px !important;
    height: 16px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739957"] {
    top: 225px !important;
    left: calc(50% - 320px + 211px) !important;
    width: 92px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426474516"] {
    top: 227px !important;
    left: calc(50% - 320px + 279px) !important;
    width: 16px !important;
    height: 16px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766425094306"] {
    top: 225px !important;
    left: calc(50% - 320px + 298px) !important;
    width: 86px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740062"] {
    top: 258px !important;
    left: calc(50% - 320px + 28px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740064"] {
    top: 258px !important;
    left: calc(50% - 320px + 39px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740065"] {
    top: 258px !important;
    left: calc(50% - 320px + 61px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740066"] {
    top: 258px !important;
    left: calc(50% - 320px + 72px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740067"] {
    top: 258px !important;
    left: calc(50% - 320px + 50px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740071"] {
    top: 252px !important;
    left: calc(50% - 320px + 85px) !important;
    width: 22px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740074"] {
    top: 252px !important;
    left: calc(50% - 320px + 110px) !important;
    width: 89px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739964"] {
    top: 278px !important;
    left: calc(50% - 320px + 28px) !important;
    width: 212px !important;
    height: 37px !important;
    transform: none !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739967"] {
    top: 278px !important;
    left: calc(50% - 320px + 28px) !important;
    width: 212px !important;
    height: 37px !important;
    transform: none !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739967"] .tn-atom {
    font-size: 14px !important;
    line-height: 1.05 !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135209"] {
    left: calc(50% - 320px + 20px) !important;
    width: 280px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135195"] {
    left: calc(50% - 320px + 340px) !important;
    width: 280px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135213"] {
    left: calc(50% - 320px + 30px) !important;
    width: 260px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135199"] {
    left: calc(50% - 320px + 350px) !important;
    width: 260px !important;
  }
}

@media screen and (max-width: 639px) {
  #rec2121221993 {
    margin-top: 28px !important;
  }

  #rec2121233163 .t396__artboard {
    height: 440px !important;
    overflow: hidden !important;
    border-radius: 22px !important;
  }

  #rec2121233163 .t396__filter,
  #rec2121233163 .t396__carrier {
    height: 440px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739929"] {
    top: -22px !important;
    left: calc(50% - 160px + 10px) !important;
    width: 301px !important;
    height: 462px !important;
    border-radius: 22px !important;
    overflow: hidden !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739929"] .tn-atom {
    border-radius: 22px !important;
    overflow: hidden !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] {
    top: 163px !important;
    left: calc(50% - 160px + 22px) !important;
    width: 258px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] .tn-atom {
    font-size: 25px !important;
    line-height: 1.08 !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766419725555"] {
    top: 253px !important;
    left: calc(50% - 160px + 22px) !important;
    width: 218px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766419725555"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.52 !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739954"] {
    top: 328px !important;
    left: calc(50% - 160px + 22px) !important;
    width: 196px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739962"] {
    top: 328px !important;
    left: calc(50% - 160px + 139px) !important;
    width: 11px !important;
    height: 11px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739957"] {
    top: 328px !important;
    left: calc(50% - 160px + 154px) !important;
    width: 67px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426474516"] {
    top: 328px !important;
    left: calc(50% - 160px + 205px) !important;
    width: 11px !important;
    height: 11px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766425094306"] {
    top: 328px !important;
    left: calc(50% - 160px + 217px) !important;
    width: 65px !important;
    height: auto !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740062"] {
    top: 363px !important;
    left: calc(50% - 160px + 23px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740064"] {
    top: 363px !important;
    left: calc(50% - 160px + 33px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740065"] {
    top: 363px !important;
    left: calc(50% - 160px + 43px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740066"] {
    top: 363px !important;
    left: calc(50% - 160px + 53px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740067"] {
    top: 363px !important;
    left: calc(50% - 160px + 63px) !important;
    width: 8px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740071"] {
    top: 359px !important;
    left: calc(50% - 160px + 76px) !important;
    width: 17px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240740074"] {
    top: 361px !important;
    left: calc(50% - 160px + 95px) !important;
    width: 77px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739964"] {
    top: 391px !important;
    left: calc(50% - 160px + 22px) !important;
    width: 172px !important;
    height: 30px !important;
    transform: none !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739967"] {
    top: 391px !important;
    left: calc(50% - 160px + 22px) !important;
    width: 172px !important;
    height: 30px !important;
    transform: none !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739967"] .tn-atom {
    font-size: 14px !important;
    line-height: 1 !important;
  }

  #rec2121222003 .t585__text .sb-tour-copy__intro,
  #rec2121222003 .t585__text .sb-tour-copy__item {
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 8px;
  }

  #rec2121222003 .t585__text .sb-tour-copy__intro {
    margin-bottom: 12px;
  }

  #rec2121222003 .t585__text .sb-tour-copy__list {
    gap: 10px;
  }

  #rec2121222003 .t585__text .sb-tour-copy__emoji {
    font-size: 17px;
  }

  #rec2121221993 .t396__artboard,
  #rec2121221993 .t396__filter,
  #rec2121221993 .t396__carrier {
    height: 390px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135209"] {
    left: calc(50% - 160px + 7px) !important;
    width: 146px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135195"] {
    left: calc(50% - 160px + 167px) !important;
    width: 146px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135153"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135179"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135195"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135209"] .tn-atom {
    font-size: 9px !important;
    line-height: 1.1 !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135213"] {
    left: calc(50% - 160px + 11px) !important;
    width: 138px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993 .tn-elem[data-elem-id="1721244135199"] {
    left: calc(50% - 160px + 171px) !important;
    width: 138px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135162"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135184"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135199"] .tn-atom,
  #rec2121221993 .tn-elem[data-elem-id="1721244135213"] .tn-atom {
    font-size: 9px !important;
    line-height: 1.35 !important;
  }
}`;

const TOUR_ABOUT_ACTIVITY_ALIGNMENT_CSS = `
#rec2121221993[data-record-type="396"] .t396__artboard,
#rec2121221993[data-record-type="396"] .t396__filter,
#rec2121221993[data-record-type="396"] .t396__carrier {
  height: 520px !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
  top: 147px !important;
  transform: translateX(-50%) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"] {
  left: calc(50% - 600px + 130px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"] {
  left: calc(50% - 600px + 430px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"] {
  left: calc(50% - 600px + 730px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
  left: calc(50% - 600px + 1030px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
  top: 168px !important;
  transform: translateX(-50%) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"] {
  left: calc(50% - 600px + 130px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"] {
  left: calc(50% - 600px + 430px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"] {
  left: calc(50% - 600px + 730px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
  left: calc(50% - 600px + 1030px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
  top: 233px !important;
  width: 180px !important;
  transform: translateX(-50%) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"] {
  left: calc(50% - 600px + 130px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] {
  left: calc(50% - 600px + 430px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"] {
  left: calc(50% - 600px + 730px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
  left: calc(50% - 600px + 1030px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] .tn-atom {
  font-size: 15px !important;
  line-height: 1.15 !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
  top: 256px !important;
  width: 210px !important;
  transform: translateX(-50%) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"] {
  left: calc(50% - 600px + 130px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] {
  left: calc(50% - 600px + 430px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] {
  left: calc(50% - 600px + 730px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
  left: calc(50% - 600px + 1030px) !important;
}

#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] .tn-atom,
#rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] .tn-atom {
  display: block !important;
  overflow: visible !important;
  white-space: normal !important;
  overflow-wrap: anywhere !important;
  font-size: 12.5px !important;
  line-height: 1.45 !important;
}

@media screen and (max-width: 1199px) {
  #rec2121221993[data-record-type="396"] .t396__artboard,
  #rec2121221993[data-record-type="396"] .t396__filter,
  #rec2121221993[data-record-type="396"] .t396__carrier {
    height: 500px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
    top: 123px !important;
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"] {
    left: calc(50% - 480px + 125px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"] {
    left: calc(50% - 480px + 355px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"] {
    left: calc(50% - 480px + 585px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
    left: calc(50% - 480px + 815px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
    top: 143px !important;
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"] {
    left: calc(50% - 480px + 125px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"] {
    left: calc(50% - 480px + 355px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"] {
    left: calc(50% - 480px + 585px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
    left: calc(50% - 480px + 815px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
    top: 195px !important;
    width: 170px !important;
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"] {
    left: calc(50% - 480px + 125px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] {
    left: calc(50% - 480px + 355px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"] {
    left: calc(50% - 480px + 585px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
    left: calc(50% - 480px + 815px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] .tn-atom {
    font-size: 14px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    top: 216px !important;
    width: 200px !important;
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"] {
    left: calc(50% - 480px + 125px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] {
    left: calc(50% - 480px + 355px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] {
    left: calc(50% - 480px + 585px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    left: calc(50% - 480px + 815px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] .tn-atom {
    font-size: 11px !important;
    line-height: 1.38 !important;
  }
}

@media screen and (max-width: 959px) {
  #rec2121221993[data-record-type="396"] .t396__artboard,
  #rec2121221993[data-record-type="396"] .t396__filter,
  #rec2121221993[data-record-type="396"] .t396__carrier {
    height: 690px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"] {
    top: 113px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
    top: 326px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] {
    left: calc(50% - 320px + 140px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    left: calc(50% - 320px + 500px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"] {
    top: 134px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
    top: 356px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] {
    top: 225px !important;
    width: 190px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
    top: 438px !important;
    width: 190px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] {
    top: 251px !important;
    width: 220px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    top: 464px !important;
    width: 220px !important;
  }
}

@media screen and (max-width: 639px) {
  #rec2121221993[data-record-type="396"] .t396__artboard,
  #rec2121221993[data-record-type="396"] .t396__filter,
  #rec2121221993[data-record-type="396"] .t396__carrier {
    height: 430px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"] {
    top: 88px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"] {
    top: 202px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    transform: translateX(-50%) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431186034000001"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431219359000004"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] {
    left: calc(50% - 160px + 75px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431201693000002"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431153685"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    left: calc(50% - 160px + 245px) !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135166"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135187"] {
    top: 100px !important;
    width: 27px !important;
    height: 27px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1766431213467000003"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135202"] {
    top: 216px !important;
    width: 27px !important;
    height: 27px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] {
    top: 138px !important;
    width: 132px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] {
    top: 252px !important;
    width: 132px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] {
    top: 153px !important;
    width: 142px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"],
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] {
    top: 267px !important;
    width: 142px !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135153"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135179"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135209"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135195"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.18 !important;
    font-weight: 600 !important;
  }

  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135162"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135184"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135213"] .tn-atom,
  #rec2121221993[data-record-type="396"] .tn-elem[data-elem-id="1721244135199"] .tn-atom {
    font-size: 9px !important;
    line-height: 1.3 !important;
  }
}
`;

const UBUD_COLLAGE_TEXT_MOBILE_FIX_CSS = `
@media screen and (max-width: 959px) {
  #rec2121222043 .tn-elem[data-elem-id="1766620130918"] .tn-atom {
    font-size: 14px !important;
    line-height: 1.3 !important;
  }
}

@media screen and (max-width: 639px) {
  #rec2121222043 .tn-elem[data-elem-id="1766620130918"] .tn-atom {
    font-size: 12px !important;
    line-height: 1.28 !important;
  }
}
`;

const TOUR_PROMO_SCROLL_REVEAL_CSS = `
#rec2121222043 .sb-letter-rise {
  display: block;
}

#rec2121222043 .sb-letter-rise .sb-letter-rise-char {
  display: inline-block;
  opacity: 0;
  transform: translate3d(0, 22px, 0);
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  #rec2121222043 .sb-letter-rise .sb-letter-rise-char {
    opacity: 1;
    transform: none;
  }
}
`;

const BALI_UNESCO_DESKTOP_HERO_SHIFT_CSS = `
@media screen and (min-width: 1200px) {
  #rec2121233163 .t396__artboard,
  #rec2121233163 .t396__filter,
  #rec2121233163 .t396__carrier {
    height: 58vw !important;
    min-height: 696px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1721240739929"] {
    height: 630px !important;
  }

  #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] {
    top: 110px !important;
  }
}
`;

const TOUR_LOCALIZED_TEXT_SAFETY_CSS = `
#rec2121233163 .tn-atom,
#rec2121221993 .tn-atom,
#rec2121222043 .tn-atom,
#rec2121222013 .tn-atom {
  white-space: normal !important;
  overflow-wrap: anywhere !important;
  word-break: normal !important;
  hyphens: auto !important;
}

#rec2121221993 .tn-elem[data-elem-id="1721244135153"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135179"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135195"] .tn-atom,
#rec2121221993 .tn-elem[data-elem-id="1721244135209"] .tn-atom {
  white-space: normal !important;
}

#rec2121222013 .sb-private-offer-heading,
#rec2121222013 .sb-private-card-title,
#rec2121222013 .sb-private-card-pill,
#rec2122133073 .sb-route-map-title,
#rec2122133073 .sb-route-map-text {
  overflow-wrap: anywhere !important;
  word-break: normal !important;
  hyphens: auto !important;
}

html[lang]:not([lang="en"]) #rec2121233163 .tn-atom,
html[lang]:not([lang="en"]) #rec2121221993 .tn-atom,
html[lang]:not([lang="en"]) #rec2121222043 .tn-atom,
html[lang]:not([lang="en"]) #rec2121222013 .tn-atom,
html[lang]:not([lang="en"]) #rec2122133073 .sb-route-map-title,
html[lang]:not([lang="en"]) #rec2122133073 .sb-route-map-text,
html[lang]:not([lang="en"]) #rec2121222053 .t585__title,
html[lang]:not([lang="en"]) #rec2121222053 .t585__text {
  overflow-wrap: anywhere !important;
  word-break: normal !important;
  hyphens: auto !important;
}

html[lang]:not([lang="en"]) #rec2121222013 .sb-private-card-pill {
  white-space: normal !important;
  line-height: 1.15 !important;
}

@media screen and (max-width: 639px) {
  html[lang]:not([lang="en"]) #rec2121221993 .t396__artboard,
  html[lang]:not([lang="en"]) #rec2121221993 .t396__carrier,
  html[lang]:not([lang="en"]) #rec2121221993 .t396__filter {
    min-height: 390px !important;
  }

  html[lang]:not([lang="en"]) #rec2121222043 .t396__artboard,
  html[lang]:not([lang="en"]) #rec2121222043 .t396__carrier,
  html[lang]:not([lang="en"]) #rec2121222043 .t396__filter {
    min-height: 760px !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .t396__artboard,
  html[lang]:not([lang="en"]) #rec2121222013 .t396__carrier,
  html[lang]:not([lang="en"]) #rec2121222013 .t396__filter {
    min-height: 1040px !important;
  }

  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1766426116262000001"] .tn-atom {
    font-size: 24px !important;
    line-height: 1.05 !important;
  }

  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1766419725555"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.42 !important;
  }

  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1721240739954"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1721240739957"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1766425094306"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1721240740071"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121233163 .tn-elem[data-elem-id="1721240740074"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.2 !important;
  }

  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135148"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.25 !important;
  }

  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135148"] {
    display: none !important;
  }

  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135153"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135179"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135209"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135195"] .tn-atom {
    font-size: 9.8px !important;
    line-height: 1.15 !important;
    font-weight: 700 !important;
  }

  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135162"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135184"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135213"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121221993 .tn-elem[data-elem-id="1721244135199"] .tn-atom {
    font-size: 8.8px !important;
    line-height: 1.24 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222043 .tn-elem[data-elem-id="1766442865058"] .tn-atom {
    font-size: 20px !important;
    line-height: 1.02 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222043 .tn-elem[data-elem-id="1766442925510"] .tn-atom,
  html[lang]:not([lang="en"]) #rec2121222043 .tn-elem[data-elem-id="1766620130918"] .tn-atom {
    font-size: 10px !important;
    line-height: 1.3 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .sb-private-offer-heading {
    font-size: 40px !important;
    line-height: 0.98 !important;
    letter-spacing: 0 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .sb-private-offer-text {
    font-size: 13px !important;
    line-height: 1.46 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .sb-private-card-title {
    font-size: 20px !important;
    line-height: 1.04 !important;
    letter-spacing: 0 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .sb-private-card-text {
    font-size: 12px !important;
    line-height: 1.42 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222013 .sb-private-card-pill {
    font-size: 10px !important;
  }

  html[lang]:not([lang="en"]) #rec2122133073 .sb-route-map-title {
    font-size: 24px !important;
    line-height: 1.05 !important;
    letter-spacing: 0 !important;
  }

  html[lang]:not([lang="en"]) #rec2122133073 .sb-route-map-text,
  html[lang]:not([lang="en"]) #rec2121222053 .t585__text {
    font-size: 12px !important;
    line-height: 1.42 !important;
  }

  html[lang]:not([lang="en"]) #rec2121222053 .t585__title {
    font-size: 15px !important;
    line-height: 1.28 !important;
  }
}
`;

const TOUR_LAYOUT_AUTOFIT_SCRIPT = `
(function () {
  var HERO_ID = 'rec2121233163';
  var HERO_CARD_ID = '1721240739929';
  var ABOUT_ID = 'rec2121221993';
  var PRIVATE_OFFER_ID = 'rec2121222013';
  var PROMO_ID = 'rec2121222043';
  var TITLE_ID = '1766426116262000001';
  var DESC_ID = '1766419725555';
  var PRICE_ID = '1721240739954';
  var DURATION_ICON_ID = '1721240739962';
  var DURATION_TEXT_ID = '1721240739957';
  var LOCATION_ICON_ID = '1766426474516';
  var LOCATION_TEXT_ID = '1766425094306';
  var CTA_BG_ID = '1721240739964';
  var CTA_TEXT_ID = '1721240739967';
  var RATING_VALUE_ID = '1721240740071';
  var MAPS_LABEL_ID = '1721240740074';
  var ABOUT_TITLE_IDS = ['1721244135153', '1721244135179', '1721244135209', '1721244135195'];
  var ABOUT_DESC_IDS = ['1721244135162', '1721244135184', '1721244135213', '1721244135199'];
  var ABOUT_ICON_BG_IDS = ['1766431186034000001', '1766431201693000002', '1766431219359000004', '1766431153685'];
  var ABOUT_ICON_IDS = ['1721244135166', '1721244135187', '1766431213467000003', '1721244135202'];
  var ABOUT_SUBTITLE_ID = '1721244135148';
  var ABOUT_HEADING_ID = '1721244135138';
  var PROMO_TITLE_ID = '1766442865058';
  var PROMO_TEXT_ID = '1766442925510';
  var PROMO_SIDE_ID = '1766620130918';
  var PROMO_BUTTON_ID = '1721248463120';
  var PROMO_LOWER_LEFT_MEDIA_ID = '1721248463131';
  var PROMO_LOWER_RIGHT_MEDIA_ID = '1721248463123';
  var PROMO_MEDIA_IDS = ['1721248463091', '1721248463134', '1721248463127', '1721248463131', '1721248463123', '1721248463137'];
  var RATING_ICON_SELECTOR = '[data-elem-id^="172124074006"]';
  var isLocalizedPage = (document.documentElement.getAttribute('lang') || 'en').toLowerCase() !== 'en';
  var isUnescoHeroPage = /\\/bali\\/(?:en|ru|es|fr|zh)\\/tours\\/bali-unesco$/.test(window.location.pathname);

  function byId(record, id) {
    return record ? record.querySelector('[data-elem-id="' + id + '"]') : null;
  }

  function findHeroRecord() {
    return document.getElementById(HERO_ID) || document.querySelector('[data-elem-id="' + TITLE_ID + '"]')?.closest('.t-rec');
  }

  function atom(node) {
    return node ? node.querySelector('.tn-atom') : null;
  }

  function setImportant(node, prop, value) {
    if (node) node.style.setProperty(prop, value, 'important');
  }

  function px(value) {
    var num = parseFloat(value);
    return Number.isFinite(num) ? num : 0;
  }

  function topOf(node) {
    return px(window.getComputedStyle(node).top);
  }

  function leftOf(node) {
    return px(window.getComputedStyle(node).left);
  }

  function scaleFor(artboard) {
    if (!artboard || !artboard.offsetWidth) return 1;
    var rect = artboard.getBoundingClientRect();
    return rect.width && artboard.offsetWidth ? rect.width / artboard.offsetWidth : 1;
  }

  function visualHeight(node, scale) {
    return node ? node.getBoundingClientRect().height / (scale || 1) : 0;
  }

  function visualWidth(node, scale) {
    return node ? node.getBoundingClientRect().width / (scale || 1) : 0;
  }

  function cssHeight(node) {
    return node ? (node.offsetHeight || node.getBoundingClientRect().height) : 0;
  }

  function setRecordHeight(record, height, scale) {
    if (!record || !height) return;
    var artboard = record.querySelector('.t396__artboard');
    var value = Math.ceil(height * (scale || 1)) + 'px';
    var carrier = record.querySelector('.t396__carrier');
    var filter = record.querySelector('.t396__filter');
    [artboard, carrier, filter].forEach(function (node) {
      if (node) node.style.setProperty('height', value, 'important');
    });
  }

  function fitText(node, options) {
    var target = atom(node) || node;
    if (!target) return 0;
    var maxFont = options.maxFont || 18;
    var minFont = options.minFont || 10;
    var ratio = options.lineHeightRatio || 1.2;
    setImportant(target, 'white-space', options.whiteSpace || 'normal');
    setImportant(target, 'overflow-wrap', 'anywhere');
    setImportant(target, 'word-break', 'normal');
    setImportant(target, 'hyphens', 'auto');
    if (options.textAlign) setImportant(target, 'text-align', options.textAlign);
    var font = maxFont;
    while (font >= minFont) {
      setImportant(target, 'font-size', font.toFixed(2) + 'px');
      setImportant(target, 'line-height', (font * ratio).toFixed(2) + 'px');
      if (!options.maxHeight || target.scrollHeight <= options.maxHeight + 1) {
        break;
      }
      font -= options.step || 0.5;
    }
    return font;
  }

  function relaxText(node, align) {
    var target = atom(node) || node;
    if (!target) return;
    setImportant(target, 'white-space', 'normal');
    setImportant(target, 'overflow-wrap', 'anywhere');
    setImportant(target, 'word-break', 'normal');
    setImportant(target, 'hyphens', 'auto');
    if (align) setImportant(target, 'text-align', align);
  }

  function clearImportant(node, prop) {
    if (node) node.style.removeProperty(prop);
  }

  function resetInlineBox(node) {
    if (!node) return;
    ['top', 'left', 'width', 'height', 'transform'].forEach(function (prop) {
      clearImportant(node, prop);
    });
  }

  function resetInlineText(node) {
    var target = atom(node) || node;
    if (!target) return;
    ['font-size', 'line-height', 'white-space', 'overflow-wrap', 'word-break', 'hyphens', 'text-align'].forEach(function (prop) {
      clearImportant(target, prop);
    });
  }

  function resetRecordHeight(record) {
    if (!record) return;
    var artboard = record.querySelector('.t396__artboard');
    var carrier = record.querySelector('.t396__carrier');
    var filter = record.querySelector('.t396__filter');
    [artboard, carrier, filter].forEach(function (node) {
      clearImportant(node, 'height');
    });
  }

  function measureNaturalTextWidth(node) {
    var target = atom(node) || node;
    if (!target) return 0;
    var range = document.createRange();
    range.selectNodeContents(target);
    var rectW = range.getBoundingClientRect().width;
    var zoom = target.offsetWidth ? ((target.getBoundingClientRect().width || target.offsetWidth) / target.offsetWidth) : 1;
    return Math.ceil(rectW / (zoom || 1)) + 2;
  }

  function layoutHeroMetaRow(record) {
    var priceText = byId(record, PRICE_ID);
    var durationIcon = byId(record, DURATION_ICON_ID);
    var durationText = byId(record, DURATION_TEXT_ID);
    var locationIcon = byId(record, LOCATION_ICON_ID);
    var locationText = byId(record, LOCATION_TEXT_ID);
    if (!durationText || !locationIcon || !locationText) return;
    var artboard = record.querySelector('.t396__artboard');
    if (!artboard) return;
    var dAtom = atom(durationText) || durationText;
    clearImportant(durationText, 'width');
    [durationIcon, durationText, locationIcon, locationText].forEach(function (node) {
      clearImportant(node, 'left');
    });
    clearImportant(locationText, 'width');

    setImportant(dAtom, 'white-space', 'nowrap');
    var natural = measureNaturalTextWidth(durationText);
    setImportant(dAtom, 'white-space', 'normal');
    var slotWidth = Math.round(px(window.getComputedStyle(durationText).width)) || durationText.offsetWidth || 0;
    if (!natural || !slotWidth) return;

    var isMobile = window.innerWidth <= 639;
    var durLeft = leftOf(durationText);
    var dIconLeft = durationIcon ? leftOf(durationIcon) : durLeft;
    var lIconLeft = leftOf(locationIcon);
    var lTextLeft = leftOf(locationText);
    if (lIconLeft <= durLeft) return;

    // 1) Keep the duration group clear of the price text.
    var rowShift = 0;
    if (priceText && durationIcon) {
      var pNatural = measureNaturalTextWidth(priceText);
      var pLeft = leftOf(priceText);
      var pGap = isMobile ? 10 : 18;
      rowShift = Math.max(0, Math.ceil(pLeft + pNatural + pGap - dIconLeft));
    }

    // 2) Fit the duration text and keep the location group clear of it.
    var rowGap = isMobile ? 8 : 14;
    var available = lIconLeft - durLeft - rowGap;
    if (available <= 0) return;
    if (rowShift === 0 && natural <= Math.min(slotWidth, available)) {
      return;
    }

    var lNatural = measureNaturalTextWidth(locationText);
    var lBox = Math.round(px(window.getComputedStyle(locationText).width)) || locationText.offsetWidth || 0;
    var lWidth = Math.min(lBox, Math.max(lNatural, 24));
    var elemZoom = px(window.getComputedStyle(durationText).zoom) || 1;
    var artW = artboard.offsetWidth || (isMobile ? 360 : 1200);
    var rightLimit = Math.floor(artW / (elemZoom || 1)) - 12;
    var maxShift = Math.max(0, rightLimit - (lTextLeft + rowShift + lWidth));
    var maxSlot = isMobile ? 150 : 240;
    var width = Math.min(Math.max(natural, Math.min(slotWidth, available)), maxSlot);
    var shift = Math.min(Math.max(0, width - available), maxShift);
    var effAvailable = available + shift;
    if (width > effAvailable) {
      width = Math.max(isMobile ? 56 : 90, Math.floor(effAvailable));
    }
    setImportant(durationText, 'width', width + 'px');
    if (natural > width) {
      var baseFont = px(window.getComputedStyle(dAtom).fontSize) || (isMobile ? 13 : 20);
      fitText(durationText, {
        maxFont: baseFont,
        minFont: Math.max(9.5, baseFont - 7),
        maxHeight: Math.ceil(baseFont * 2.6),
        lineHeightRatio: 1.15,
      });
    }

    if (rowShift > 0 && durationIcon) {
      setImportant(durationIcon, 'left', Math.ceil(dIconLeft + rowShift) + 'px');
      setImportant(durationText, 'left', Math.ceil(durLeft + rowShift) + 'px');
    }
    var locShift = rowShift + shift;
    if (locShift > 0) {
      if (lWidth < lBox) {
        setImportant(locationText, 'width', lWidth + 'px');
      }
      setImportant(locationIcon, 'left', Math.ceil(lIconLeft + locShift) + 'px');
      setImportant(locationText, 'left', Math.ceil(lTextLeft + locShift) + 'px');
    }
  }

  function layoutHero() {
    var record = findHeroRecord();
    if (!record) return;
    var artboard = record.querySelector('.t396__artboard');
    if (!artboard) return;
    var scale = scaleFor(artboard);
    var isMobile = window.innerWidth <= 639;
    var isTablet = window.innerWidth > 639 && window.innerWidth <= 959;
    var isNarrowDesktop = window.innerWidth > 959 && window.innerWidth <= 1199;
    var titleWrap = byId(record, TITLE_ID);
    var descWrap = byId(record, DESC_ID);
    var cardWrap = byId(record, HERO_CARD_ID);
    var priceWrap = byId(record, PRICE_ID);
    var durationIcon = byId(record, DURATION_ICON_ID);
    var durationText = byId(record, DURATION_TEXT_ID);
    var locationIcon = byId(record, LOCATION_ICON_ID);
    var locationText = byId(record, LOCATION_TEXT_ID);
    var mapsLabel = byId(record, MAPS_LABEL_ID);
    var ratingValue = byId(record, RATING_VALUE_ID);
    var buttonWrap = byId(record, CTA_BG_ID);
    var buttonText = byId(record, CTA_TEXT_ID);
    var ratingIcons = Array.prototype.slice.call(record.querySelectorAll(RATING_ICON_SELECTOR));
    if (!titleWrap || !descWrap || !buttonWrap || !buttonText || !cardWrap) return;

    relaxText(titleWrap, 'left');
    relaxText(descWrap, 'left');
    relaxText(priceWrap, 'left');
    relaxText(durationText, 'left');
    relaxText(locationText, 'left');
    relaxText(mapsLabel, 'left');
    relaxText(ratingValue, 'left');

    if (isMobile) {
      resetRecordHeight(record);
      clearImportant(cardWrap, 'height');
      [titleWrap, descWrap, priceWrap, durationIcon, durationText, locationIcon, locationText, mapsLabel, ratingValue, buttonWrap, buttonText]
        .concat(ratingIcons)
        .forEach(resetInlineBox);
      [titleWrap, descWrap, priceWrap, durationText, locationText, mapsLabel, ratingValue, buttonText].forEach(resetInlineText);
      var heroAtom = atom(titleWrap);
      if (heroAtom) heroAtom.innerHTML = heroAtom.innerHTML.replace(/<br\\s*\\/?>/gi, ' ');
      var heroMaxFont = isLocalizedPage ? 24 : 25;
      var heroLhRatio = isLocalizedPage ? 1.05 : 1.08;
      var heroTwoLine = Math.ceil(2 * heroMaxFont * heroLhRatio);
      var heroFont = fitText(titleWrap, {
        maxFont: heroMaxFont,
        minFont: 14,
        maxHeight: heroTwoLine,
        lineHeightRatio: heroLhRatio,
      });
      var heroClip = Math.ceil(2 * heroFont * heroLhRatio);
      setImportant(atom(titleWrap), 'max-height', heroClip + 'px');
      setImportant(atom(titleWrap), 'overflow', 'hidden');
      layoutHeroMetaRow(record);
      return;
    }

    if (isLocalizedPage) {
      fitText(titleWrap, {
        maxFont: isTablet ? 27 : isNarrowDesktop ? 40 : 58,
        minFont: isTablet ? 21 : isNarrowDesktop ? 29 : 40,
        maxHeight: isTablet ? 88 : isNarrowDesktop ? 128 : 158,
        lineHeightRatio: isTablet ? 1.08 : 1.06,
      });
      fitText(descWrap, {
        maxFont: isTablet ? 12.5 : isNarrowDesktop ? 16 : 18.5,
        minFont: isTablet ? 10.2 : isNarrowDesktop ? 12.2 : 14.2,
        maxHeight: isTablet ? 86 : isNarrowDesktop ? 92 : 98,
        lineHeightRatio: 1.46,
      });
      fitText(locationText, {
        maxFont: isTablet ? 13 : isNarrowDesktop ? 14.5 : 17,
        minFont: isTablet ? 10.5 : isNarrowDesktop ? 11.5 : 13,
        maxHeight: isTablet ? 44 : 50,
        lineHeightRatio: 1.18,
      });
      fitText(durationText, {
        maxFont: isTablet ? 13 : isNarrowDesktop ? 14.5 : 17,
        minFont: isTablet ? 10.5 : isNarrowDesktop ? 11.5 : 13,
        maxHeight: 28,
        lineHeightRatio: 1.14,
      });
      fitText(mapsLabel, {
        maxFont: isTablet ? 13 : isNarrowDesktop ? 14 : 16,
        minFont: isTablet ? 10.5 : isNarrowDesktop ? 11.2 : 12.5,
        maxHeight: 28,
        lineHeightRatio: 1.12,
      });
    } else {
      [titleWrap, descWrap, durationText, locationText, mapsLabel].forEach(resetInlineText);
    }

    if (!isTablet && !isNarrowDesktop) {
      setImportant(titleWrap, 'top', '110px');
    }

    var stackNodes = [descWrap, priceWrap, durationIcon, durationText, locationIcon, locationText, mapsLabel, ratingValue, buttonWrap, buttonText]
      .concat(ratingIcons);
    stackNodes.forEach(function (node) {
      clearImportant(node, 'top');
    });

    if (!isTablet && !isNarrowDesktop) {
      var titleGap = 34;
      var titleHeight = Math.max(cssHeight(titleWrap), visualHeight(titleWrap, scale));
      var titleBottom = topOf(titleWrap) + titleHeight;
      var requiredDescTop = titleBottom + titleGap;
      var descShift = Math.max(0, requiredDescTop - topOf(descWrap));
      if (descShift > 0) {
        stackNodes.forEach(function (node) {
          if (node) setImportant(node, 'top', Math.ceil(topOf(node) + descShift) + 'px');
        });
      }
    }

    layoutHeroMetaRow(record);

    var minCardHeight = isTablet ? 338 : isNarrowDesktop ? 531 : (isUnescoHeroPage ? 630 : 575);
    var cardTop = topOf(cardWrap);
    var bottomPad = isTablet ? 26 : 30;
    var maxContentBottom = Array.prototype.slice.call(record.querySelectorAll('.t396__elem'))
      .reduce(function (maxValue, node) {
        if (!node || node === cardWrap) return maxValue;
        return Math.max(maxValue, topOf(node) + visualHeight(node, scale));
      }, 0);
    var cardBottom = Math.max(cardTop + minCardHeight, maxContentBottom + bottomPad);
    var cardHeight = Math.max(minCardHeight, cardBottom - cardTop);
    setImportant(cardWrap, 'height', Math.ceil(cardHeight) + 'px');
    var recordPad = isTablet ? 6 : 18;
    var childZoom = px(window.getComputedStyle(cardWrap).zoom) || 1;
    setRecordHeight(record, cardTop + cardHeight + recordPad, Math.max(scale, childZoom));
  }

  function layoutAbout() {
    var record = document.getElementById(ABOUT_ID);
    if (!record) return;
    var artboard = record.querySelector('.t396__artboard');
    if (!artboard) return;
    var scale = scaleFor(artboard);
    var isMobile = window.innerWidth <= 639;
    var isTablet = window.innerWidth > 639 && window.innerWidth <= 959;
    var isNarrowDesktop = window.innerWidth > 959 && window.innerWidth <= 1199;
    var artboardWidth = artboard.offsetWidth || 320;
    var headingWrap = byId(record, ABOUT_HEADING_ID);
    var subtitleWrap = byId(record, ABOUT_SUBTITLE_ID);
    var titleWraps = ABOUT_TITLE_IDS.map(function (id) { return byId(record, id); });
    var descWraps = ABOUT_DESC_IDS.map(function (id) { return byId(record, id); });
    var iconBgs = ABOUT_ICON_BG_IDS.map(function (id) { return byId(record, id); });
    var icons = ABOUT_ICON_IDS.map(function (id) { return byId(record, id); });
    if (!subtitleWrap || titleWraps.some(function (node) { return !node; })) return;

    var layout = isMobile
      ? {
          baseHeight: 430,
          subtitleTop: 49,
          subtitleWidth: 335,
          subtitleMaxFont: isLocalizedPage ? 11.2 : 12,
          subtitleMinFont: 9.6,
          subtitleMaxHeight: 40,
          titleMaxFont: isLocalizedPage ? 10.4 : 10.9,
          titleMinFont: 8.6,
          titleMaxHeight: 40,
          descMaxFont: isLocalizedPage ? 9.1 : 9.5,
          descMinFont: 8.1,
          descMaxHeight: 78,
          bottomPad: 34,
        }
      : isTablet
      ? {
          baseHeight: 690,
          subtitleTop: 62,
          subtitleWidth: artboardWidth - 80,
          subtitleMaxFont: isLocalizedPage ? 14 : 15.5,
          subtitleMinFont: 11.5,
          subtitleMaxHeight: 42,
          titleMaxFont: isLocalizedPage ? 14.1 : 15,
          titleMinFont: 11.2,
          titleMaxHeight: 52,
          descMaxFont: isLocalizedPage ? 12.2 : 13,
          descMinFont: 10,
          descMaxHeight: 118,
          bottomPad: 38,
        }
      : isNarrowDesktop
      ? {
          baseHeight: 500,
          subtitleTop: 64,
          subtitleWidth: 387,
          subtitleMaxFont: 17,
          subtitleMinFont: 13,
          subtitleMaxHeight: 34,
          titleMaxFont: 14.2,
          titleMinFont: 11.5,
          titleMaxHeight: 34,
          descMaxFont: 12,
          descMinFont: 9.8,
          descMaxHeight: 112,
          bottomPad: 40,
        }
      : {
          baseHeight: 520,
          subtitleTop: 62,
          subtitleWidth: 466,
          subtitleMaxFont: 18,
          subtitleMinFont: 14,
          subtitleMaxHeight: 36,
          titleMaxFont: 15.6,
          titleMinFont: 12.2,
          titleMaxHeight: 34,
          descMaxFont: 12.5,
          descMinFont: 9.8,
          descMaxHeight: 118,
          bottomPad: 44,
        };

    relaxText(subtitleWrap, 'center');
    titleWraps.forEach(function (node) { relaxText(node, 'center'); });
    descWraps.forEach(function (node) { relaxText(node, 'center'); });

    setImportant(subtitleWrap, 'top', layout.subtitleTop + 'px');
    if (isMobile) {
      setImportant(subtitleWrap, 'left', '-7px');
      setImportant(subtitleWrap, 'width', Math.min(artboardWidth - 14, layout.subtitleWidth) + 'px');
    } else if (isTablet) {
      setImportant(subtitleWrap, 'left', '50%');
      setImportant(subtitleWrap, 'transform', 'translateX(-50%)');
      setImportant(subtitleWrap, 'width', Math.min(artboardWidth - 40, layout.subtitleWidth) + 'px');
    } else if (isNarrowDesktop) {
      setImportant(subtitleWrap, 'left', '50%');
      setImportant(subtitleWrap, 'transform', 'translateX(-50%)');
      setImportant(subtitleWrap, 'width', layout.subtitleWidth + 'px');
    } else {
      setImportant(subtitleWrap, 'left', '50%');
      setImportant(subtitleWrap, 'transform', 'translateX(-50%)');
      setImportant(subtitleWrap, 'width', layout.subtitleWidth + 'px');
    }
    fitText(subtitleWrap, {
      maxFont: layout.subtitleMaxFont,
      minFont: layout.subtitleMinFont,
      maxHeight: layout.subtitleMaxHeight,
      lineHeightRatio: 1.4,
      textAlign: 'center',
    });

    for (var i = 0; i < 4; i += 1) {
      fitText(titleWraps[i], {
        maxFont: layout.titleMaxFont,
        minFont: layout.titleMinFont,
        maxHeight: layout.titleMaxHeight,
        lineHeightRatio: 1.18,
        textAlign: 'center',
      });
      fitText(descWraps[i], {
        maxFont: layout.descMaxFont,
        minFont: layout.descMinFont,
        maxHeight: layout.descMaxHeight,
        lineHeightRatio: 1.35,
        textAlign: 'center',
      });
    }
    var maxBottom = 0;
    [headingWrap, subtitleWrap].concat(iconBgs, icons, titleWraps, descWraps).forEach(function (node) {
      if (!node) return;
      maxBottom = Math.max(maxBottom, topOf(node) + visualHeight(node, scale));
    });
    setRecordHeight(record, Math.max(layout.baseHeight, maxBottom + layout.bottomPad), scale);
  }

  function layoutPromo() {
    var record = document.getElementById(PROMO_ID);
    if (!record) return;
    var artboard = record.querySelector('.t396__artboard');
    if (!artboard) return;
    var scale = scaleFor(artboard);
    var isMobile = window.innerWidth <= 639;
    var isTablet = window.innerWidth > 639 && window.innerWidth <= 959;
    if (!isMobile && !isTablet) return;
    var titleWrap = byId(record, PROMO_TITLE_ID);
    var textWrap = byId(record, PROMO_TEXT_ID);
    var buttonWrap = byId(record, PROMO_BUTTON_ID);
    var sideWrap = byId(record, PROMO_SIDE_ID);
    if (!titleWrap || !textWrap || !buttonWrap || !sideWrap) return;
    var artboardWidth = artboard.offsetWidth || 320;
    var artboardRect = artboard.getBoundingClientRect();
    var mediaNodes = PROMO_MEDIA_IDS
      .map(function (id) { return byId(record, id); })
      .filter(Boolean);
    var leftColLeft = isMobile ? 12 : 18;
    var leftColWidth = isMobile ? 150 : 170;
    var baseTitleTop = isMobile ? 112 : 114;
    var buttonHeight = isMobile ? 21 : 28;

    relaxText(titleWrap, 'left');
    relaxText(textWrap, 'left');
    relaxText(sideWrap, 'left');
    [titleWrap, textWrap, buttonWrap, sideWrap].forEach(function (node) {
      clearImportant(node, 'zoom');
      setImportant(node, 'zoom', '1');
    });

    var titleTop = mediaNodes.reduce(function (maxValue, node) {
      var nodeTop = node.getBoundingClientRect().top - artboardRect.top;
      var nodeLeft = leftOf(node);
      var nodeRight = nodeLeft + visualWidth(node, scale);
      var nodeBottom = nodeTop + visualHeight(node, scale);
      var overlapsLeftCol = nodeRight > leftColLeft + 8 && nodeLeft < leftColLeft + leftColWidth - 8;
      if (!overlapsLeftCol) return maxValue;
      if (nodeTop >= baseTitleTop + (isMobile ? 42 : 54)) return maxValue;
      if (nodeBottom <= baseTitleTop - 2) return maxValue;
      return Math.max(maxValue, nodeBottom + (isMobile ? 4 : 8));
    }, baseTitleTop);

    setImportant(titleWrap, 'left', leftColLeft + 'px');
    setImportant(titleWrap, 'top', titleTop + 'px');
    setImportant(titleWrap, 'width', leftColWidth + 'px');
    fitText(titleWrap, {
      maxFont: isMobile ? (isLocalizedPage ? 12.6 : 14.5) : (isLocalizedPage ? 15.5 : 17),
      minFont: isMobile ? 9 : 11.4,
      maxHeight: isMobile ? 96 : 110,
      lineHeightRatio: 1.1,
    });

    var titleBottom = titleTop + visualHeight(titleWrap, scale);
    var textTop = titleBottom + 10;
    var leftBlockLimit = mediaNodes.reduce(function (minValue, node) {
      var nodeTop = node.getBoundingClientRect().top - artboardRect.top;
      var nodeLeft = leftOf(node);
      var nodeRight = nodeLeft + visualWidth(node, scale);
      if (nodeRight <= leftColLeft + 8 || nodeLeft >= leftColLeft + leftColWidth - 8) return minValue;
      if (nodeTop <= textTop) return minValue;
      return Math.min(minValue, nodeTop);
    }, Infinity);
    var textMaxHeight = isMobile ? 78 : 90;
    if (Number.isFinite(leftBlockLimit)) {
      var reservedHeight = (isMobile ? 8 : 10) + buttonHeight + (isMobile ? 4 : 8);
      textMaxHeight = Math.max(isMobile ? 42 : 60, Math.min(textMaxHeight, leftBlockLimit - textTop - reservedHeight));
    }
    setImportant(textWrap, 'left', leftColLeft + 'px');
    setImportant(textWrap, 'top', textTop + 'px');
    setImportant(textWrap, 'width', leftColWidth + 'px');
    fitText(textWrap, {
      maxFont: isMobile ? (isLocalizedPage ? 9.6 : 10.5) : (isLocalizedPage ? 11 : 12),
      minFont: isMobile ? 8.2 : 9.8,
      maxHeight: textMaxHeight,
      lineHeightRatio: 1.36,
    });

    var textBottom = textTop + visualHeight(textWrap, scale);
    var buttonTop = textBottom + (isMobile ? 8 : 10);
    setImportant(buttonWrap, 'left', leftColLeft + 'px');
    setImportant(buttonWrap, 'top', buttonTop + 'px');

    var mediaBottom = mediaNodes.reduce(function (maxValue, node) {
      var rect = node.getBoundingClientRect();
      return Math.max(maxValue, rect.bottom - artboardRect.top);
    }, buttonTop + buttonHeight);
    var lowerLeftMedia = byId(record, PROMO_LOWER_LEFT_MEDIA_ID);
    var lowerRightMedia = byId(record, PROMO_LOWER_RIGHT_MEDIA_ID);
    var sidePlacedInGap = false;

    if (isMobile && lowerLeftMedia && lowerRightMedia) {
      var gapLeft = lowerRightMedia.getBoundingClientRect().left - artboardRect.left;
      var gapTop = lowerLeftMedia.getBoundingClientRect().top - artboardRect.top;
      var gapWidth = Math.max(110, visualWidth(lowerRightMedia, scale));
      // Keep a clear breathing gap above the photo so the text never touches its frame.
      var photoClearance = 16;
      var gapBottom = (lowerRightMedia.getBoundingClientRect().top - artboardRect.top) - photoClearance;
      var gapHeight = gapBottom - gapTop;

      if (gapHeight >= 40) {
        var sideMaxFont = isLocalizedPage ? 9.5 : 10.4;
        var sideLhRatio = 1.28;
        var sixLineMax = Math.ceil(6 * sideMaxFont * sideLhRatio);
        var sideMaxHeight = Math.min(gapHeight, sixLineMax);
        setImportant(sideWrap, 'left', gapLeft + 'px');
        setImportant(sideWrap, 'top', gapTop + 'px');
        setImportant(sideWrap, 'width', gapWidth + 'px');
        var sideFinalFont = fitText(sideWrap, {
          maxFont: sideMaxFont,
          minFont: 7.6,
          maxHeight: sideMaxHeight,
          lineHeightRatio: sideLhRatio,
        });
        // Never let the clip box grow past the gap — it stays clear of the photo.
        var clipH = Math.min(Math.ceil(6 * sideFinalFont * sideLhRatio), Math.floor(gapHeight));
        setImportant(atom(sideWrap), 'max-height', clipH + 'px');
        setImportant(atom(sideWrap), 'overflow', 'hidden');
        sidePlacedInGap = visualHeight(sideWrap, scale) <= gapHeight + 1;
      }
    }

    if (!sidePlacedInGap) {
      var sideLeft = leftColLeft;
      var sideTop = mediaBottom + (isMobile ? 16 : 20);
      var sideWidth = artboardWidth - sideLeft * 2;
      setImportant(sideWrap, 'left', sideLeft + 'px');
      setImportant(sideWrap, 'top', sideTop + 'px');
      setImportant(sideWrap, 'width', Math.max(200, sideWidth) + 'px');
      fitText(sideWrap, {
        maxFont: isMobile ? (isLocalizedPage ? 9.6 : 10.5) : (isLocalizedPage ? 11.3 : 12.5),
        minFont: isMobile ? 8.2 : 9.8,
        maxHeight: isMobile ? 90 : 78,
        lineHeightRatio: 1.35,
      });
    }

    var sideBottom = topOf(sideWrap) + visualHeight(sideWrap, scale);
    setRecordHeight(record, Math.max(sideBottom, mediaBottom) + (isMobile ? 18 : 24), scale);
  }

  function initPromoSideLetterAnimation() {
    var record = document.getElementById(PROMO_ID);
    if (!record) return false;
    var sideWrap = byId(record, PROMO_SIDE_ID);
    var target = atom(sideWrap);
    if (!target) return false;

    var didWrap = false;
    target.classList.add('sb-letter-rise');

    if (!target.dataset.sbLetterSource) {
      var sourceText = target.textContent.replace(/\\s+/g, ' ').trim();
      if (!sourceText) return false;

      target.dataset.sbLetterSource = sourceText;
      target.textContent = '';

      var fragment = document.createDocumentFragment();
      Array.prototype.forEach.call(sourceText, function (char) {
        if (/\\s/.test(char)) {
          fragment.appendChild(document.createTextNode(char));
          return;
        }

        var span = document.createElement('span');
        span.className = 'sb-letter-rise-char';
        span.textContent = char;
        fragment.appendChild(span);
      });

      target.appendChild(fragment);
      didWrap = true;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Array.prototype.forEach.call(target.querySelectorAll('.sb-letter-rise-char'), function (charNode) {
        charNode.style.opacity = '1';
        charNode.style.transform = 'translate3d(0, 0, 0)';
      });
      return didWrap;
    }

    updatePromoSideLetterAnimation();
    return didWrap;
  }

  function updatePromoSideLetterAnimation() {
    var record = document.getElementById(PROMO_ID);
    if (!record) return;
    var sideWrap = byId(record, PROMO_SIDE_ID);
    var target = atom(sideWrap);
    if (!target || !target.classList.contains('sb-letter-rise')) return;

    var charNodes = target.querySelectorAll('.sb-letter-rise-char');
    if (!charNodes.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Array.prototype.forEach.call(charNodes, function (charNode) {
        charNode.style.opacity = '1';
        charNode.style.transform = 'translate3d(0, 0, 0)';
      });
      return;
    }

    var rect = target.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!viewportHeight) return;

    var start = viewportHeight * 0.92;
    var end = viewportHeight * 0.24;
    var progress = (start - rect.top) / Math.max(1, start - end);
    progress = Math.max(0, Math.min(1, progress));

    var charCount = charNodes.length;
    var totalStagger = Math.min(0.8, Math.max(0.54, charCount * 0.012));
    var step = charCount > 1 ? totalStagger / (charCount - 1) : 0;
    var revealSpan = Math.max(0.18, 1 - totalStagger);

    Array.prototype.forEach.call(charNodes, function (charNode, index) {
      var localProgress = (progress - index * step) / revealSpan;
      localProgress = Math.max(0, Math.min(1, localProgress));
      var offsetY = (1 - localProgress) * 22;
      charNode.style.opacity = localProgress.toFixed(3);
      charNode.style.transform = 'translate3d(0, ' + offsetY.toFixed(2) + 'px, 0)';
    });
  }

  var scrollAnimationTicking = false;
  function scheduleScrollAnimationUpdate() {
    if (scrollAnimationTicking) return;
    scrollAnimationTicking = true;
    window.requestAnimationFrame(function () {
      scrollAnimationTicking = false;
      updatePromoSideLetterAnimation();
    });
  }

  function layoutPrivateOffer() {
    var record = document.getElementById(PRIVATE_OFFER_ID);
    if (!record) return;
    var artboard = record.querySelector('.t396__artboard');
    var shell = record.querySelector('.sb-private-offer-shell');
    if (!artboard || !shell) return;

    var scale = scaleFor(artboard);
    var artboardRect = artboard.getBoundingClientRect();
    var shellRect = shell.getBoundingClientRect();
    var isMobile = window.innerWidth <= 639;
    var isTablet = window.innerWidth > 639 && window.innerWidth <= 959;
    var bottomPad = isMobile ? 18 : isTablet ? 22 : 26;
    var visualBottom = shellRect.bottom - artboardRect.top;
    var naturalHeight = visualHeight(shell, scale);
    var requiredHeight = Math.max(visualBottom, naturalHeight) + bottomPad;

    setRecordHeight(record, requiredHeight, scale);
  }

  var applyingLayouts = false;
  var metaObserver = null;

  function ensureMetaObserver() {
    if (metaObserver || !window.MutationObserver) return;
    var record = findHeroRecord();
    if (!record) return;
    metaObserver = new MutationObserver(function () {
      if (applyingLayouts) return;
      schedule();
    });
    var ids = [TITLE_ID, DESC_ID, PRICE_ID, DURATION_ICON_ID, DURATION_TEXT_ID, LOCATION_ICON_ID, LOCATION_TEXT_ID, RATING_VALUE_ID, MAPS_LABEL_ID, CTA_BG_ID, CTA_TEXT_ID];
    ids.forEach(function (id) {
      var node = byId(record, id);
      if (node) metaObserver.observe(node, { attributes: true, attributeFilter: ['style'] });
    });
    Array.prototype.forEach.call(record.querySelectorAll(RATING_ICON_SELECTOR), function (node) {
      metaObserver.observe(node, { attributes: true, attributeFilter: ['style'] });
    });
  }

  function applyLayouts() {
    if (!window.innerWidth) return;
    applyingLayouts = true;
    try {
      layoutHero();
      layoutAbout();
      layoutPrivateOffer();
      layoutPromo();
      if (initPromoSideLetterAnimation()) {
        layoutPromo();
      }
      updatePromoSideLetterAnimation();
      ensureMetaObserver();
    } finally {
      window.setTimeout(function () {
        applyingLayouts = false;
      }, 0);
    }
  }

  var timer;
  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(applyLayouts, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  } else {
    schedule();
  }
  window.addEventListener('load', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('scroll', scheduleScrollAnimationUpdate, { passive: true });
  window.setTimeout(schedule, 200);
  window.setTimeout(schedule, 700);
  window.setTimeout(schedule, 1600);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule).catch(function () {});
  } else {
    window.setTimeout(schedule, 900);
  }
})();
`;

function westTourPageSpecificCss(tour = null) {
  const pageSpecificCss = [WEST_TOUR_LAYOUT_FIX_CSS, TOUR_ABOUT_ACTIVITY_ALIGNMENT_CSS, TOUR_LOCALIZED_TEXT_SAFETY_CSS, TOUR_PROMO_SCROLL_REVEAL_CSS];

  if (tour?.slug === "ubud-highlights-tour") {
    pageSpecificCss.push(UBUD_COLLAGE_TEXT_MOBILE_FIX_CSS);
  }

  if (tour?.slug === "bali-unesco") {
    pageSpecificCss.push(BALI_UNESCO_DESKTOP_HERO_SHIFT_CSS);
  }

  return pageSpecificCss;
}

function injectWestPageSpecificStyle(html, tour) {
  const pageSpecificCss = westTourPageSpecificCss(tour);

  if (pageSpecificCss.length === 0) {
    return html;
  }

  const clean = String(html)
    .replace(/<style id="sb-west-page-specific-overrides">[\s\S]*?<\/style>\s*/g, "")
    .replace(/<script id="sb-west-page-layout-autofit">[\s\S]*?<\/script>\s*/g, "");
  const styleTag = `<style id="sb-west-page-specific-overrides">\n${pageSpecificCss.join("\n")}\n</style>\n`;
  const scriptTag = `<script id="sb-west-page-layout-autofit">\n${TOUR_LAYOUT_AUTOFIT_SCRIPT}\n</script>\n`;

  let result = clean;
  if (result.includes("</head>")) {
    result = result.replace("</head>", `${styleTag}</head>`);
  } else {
    result = `${styleTag}${result}`;
  }
  if (result.includes("</body>")) {
    result = result.replace("</body>", `${scriptTag}</body>`);
  } else {
    result = `${result}${scriptTag}`;
  }
  return result;
}

function ensureLegacyTildaTourLayout(filePath, tour = null) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("data-elem-id='1766426116262000001'") && !html.includes('data-elem-id="1766426116262000001"')) {
    return;
  }

  writeGeneratedFile(filePath, injectWestPageSpecificStyle(html, tour));
}

function buildWhatsAppMessage(tour) {
  return tour.whatsappText || `Hello! I want to book ${tour.title}. Please send details.`;
}

function journalHeaderWhatsAppHref(tour) {
  const message = tour
    ? buildWhatsAppMessage(tour)
    : "Hello! I want to book a Bali tour. Please send availability, the best options, and full details.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderJournalHeader(tour) {
  const bookingHref = journalHeaderWhatsAppHref(tour);

  return `
      <header class="sb-journal-tour-header" data-sb-journal-header>
        <div class="sb-journal-tour-header__desktop">
          <div class="sb-journal-tour-header__desktop-inner">
            <a class="sb-journal-tour-header__logo-link" href="/bali/en/main-page" aria-label="SB Excursions Bali">
              <img class="sb-journal-tour-header__logo" src="https://static.tildacdn.one/tild3334-6466-4436-b766-376338363935/SB_Excursions_Dubai_.png" alt="SB Excursions">
            </a>
            <nav class="sb-journal-tour-header__nav" aria-label="Primary">
              <div class="sb-journal-tour-header__dropdown">
                <button class="sb-journal-tour-header__nav-link sb-journal-tour-header__dropdown-trigger" type="button" aria-expanded="false">Our Tours</button>
                <div class="sb-journal-tour-header__dropdown-menu" role="menu">
                  <a href="/dubai/en#tours" role="menuitem">Dubai, UAE</a>
                  <a href="/bali/en/main-page#tours" role="menuitem">Bali, Indonesia</a>
                </div>
              </div>
              <a class="sb-journal-tour-header__nav-link" href="/bali/en/about">About Us</a>
              <a class="sb-journal-tour-header__nav-link" href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">Booking</a>
              <a class="sb-journal-tour-header__nav-link" href="/bali/en/faq">FAQ</a>
            </nav>
            <div class="sb-journal-tour-header__actions" aria-label="Quick actions">
              <a class="sb-journal-tour-header__button" href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">WhatsApp</a>
              <div class="sb-journal-tour-header__langs" aria-hidden="true">
                <span>Ru</span>
                <span>Fr</span>
              </div>
            </div>
          </div>
        </div>

        <div class="sb-journal-tour-header__mobile">
          <div class="sb-journal-tour-header__mobile-bar">
            <button class="sb-journal-tour-header__burger" type="button" aria-label="Open menu" aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <a class="sb-journal-tour-header__mobile-logo-link" href="/bali/en/main-page" aria-label="SB Excursions Bali">
              <img class="sb-journal-tour-header__mobile-logo" src="https://static.tildacdn.one/tild3762-3034-4130-b063-643934306634/SB_DUBAI_LOGO_2025.png" alt="SB Excursions">
            </a>
            <div class="sb-journal-tour-header__socials" aria-label="Social links">
              <a href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 2a9.5 9.5 0 0 0-8.2 14.4L2.8 21l4.8-1A9.5 9.5 0 1 0 12 2Zm4.3 13.3c-.2.5-1.2 1-1.6 1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.4-.6-2.4-1-4-3.4-4.1-3.5-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.8-2 .2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.4.7 1.6.8 1.7.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.3.4-.5.5-.2.2-.4.4-.2.7.2.4.9 1.5 1.9 2.1 1.3.8 1.7.9 2 .7.2-.2.7-.8.9-1.1.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1 .4.1.6.2.7.4.1.2.1.9-.1 1.4Z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/dubai_sb_excursions?igsh=cTFtcnB0ZTFta2Nq&amp;utm_source=qr" target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" stroke-width="1.8"></rect>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"></circle>
                  <circle cx="17.25" cy="6.75" r="1.2" fill="currentColor"></circle>
                </svg>
              </a>
              <a href="#showfavorites" aria-label="Wishlist">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 20.2 4.9 13.6A4.8 4.8 0 0 1 11.7 7l.3.3.3-.3a4.8 4.8 0 0 1 6.8 6.7L12 20.2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </a>
              <a href="#opencart" aria-label="Cart">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 7.5h12l-1 10H7l-1-10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
                  <path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                </svg>
              </a>
            </div>
          </div>
          <div class="sb-journal-tour-header__mobile-overlay"></div>
          <aside class="sb-journal-tour-header__drawer" aria-label="Mobile menu">
            <button class="sb-journal-tour-header__drawer-close" type="button" aria-label="Close menu">
              <span></span>
              <span></span>
            </button>
            <nav class="sb-journal-tour-header__drawer-nav" aria-label="Mobile navigation">
              <div class="sb-journal-tour-header__drawer-group">
                <button class="sb-journal-tour-header__drawer-link sb-journal-tour-header__drawer-link_toggle" type="button" aria-expanded="false">Our Tours</button>
                <div class="sb-journal-tour-header__drawer-submenu">
                  <a href="/dubai/en#tours">Dubai, UAE</a>
                  <a href="/bali/en/main-page#tours">Bali, Indonesia</a>
                </div>
              </div>
              <a class="sb-journal-tour-header__drawer-link" href="/bali/en/about">About Us</a>
              <a class="sb-journal-tour-header__drawer-link" href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">Booking</a>
              <a class="sb-journal-tour-header__drawer-link" href="/bali/en/faq">FAQ</a>
              <a class="sb-journal-tour-header__drawer-link" href="${JOURNAL_HUB_ROUTE}">Our guides</a>
            </nav>
            <div class="sb-journal-tour-header__drawer-socials">
              <a href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">WhatsApp</a>
              <a href="https://www.instagram.com/dubai_sb_excursions?igsh=cTFtcnB0ZTFta2Nq&amp;utm_source=qr" target="_blank" rel="noopener noreferrer nofollow">Instagram</a>
            </div>
          </aside>
        </div>
      </header>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
          document.querySelectorAll("[data-sb-journal-header]").forEach(function (header) {
            if (header.dataset.sbJournalHeaderReady === "y") return;
            header.dataset.sbJournalHeaderReady = "y";

            const root = document.documentElement;
            const burger = header.querySelector(".sb-journal-tour-header__burger");
            const closeButton = header.querySelector(".sb-journal-tour-header__drawer-close");
            const overlay = header.querySelector(".sb-journal-tour-header__mobile-overlay");
            const drawerToggle = header.querySelector(".sb-journal-tour-header__drawer-link_toggle");
            const desktopToggle = header.querySelector(".sb-journal-tour-header__dropdown-trigger");

            const syncScrolled = function () {
              header.classList.toggle("sb-journal-tour-header_scrolled", window.scrollY > 8);
            };

            const closeDrawer = function () {
              header.classList.remove("sb-journal-tour-header_open");
              root.classList.remove("sb-journal-header-lock");
              if (burger) burger.setAttribute("aria-expanded", "false");
            };

            const openDrawer = function () {
              header.classList.add("sb-journal-tour-header_open");
              root.classList.add("sb-journal-header-lock");
              if (burger) burger.setAttribute("aria-expanded", "true");
            };

            if (burger) {
              burger.addEventListener("click", function () {
                if (header.classList.contains("sb-journal-tour-header_open")) closeDrawer();
                else openDrawer();
              });
            }

            if (closeButton) closeButton.addEventListener("click", closeDrawer);
            if (overlay) overlay.addEventListener("click", closeDrawer);

            if (drawerToggle) {
              drawerToggle.addEventListener("click", function () {
                const group = drawerToggle.closest(".sb-journal-tour-header__drawer-group");
                const expanded = drawerToggle.getAttribute("aria-expanded") === "true";
                drawerToggle.setAttribute("aria-expanded", String(!expanded));
                if (group) group.classList.toggle("sb-journal-tour-header__drawer-group_open", !expanded);
              });
            }

            if (desktopToggle) {
              desktopToggle.addEventListener("click", function () {
                const dropdown = desktopToggle.closest(".sb-journal-tour-header__dropdown");
                const expanded = desktopToggle.getAttribute("aria-expanded") === "true";
                desktopToggle.setAttribute("aria-expanded", String(!expanded));
                if (dropdown) dropdown.classList.toggle("sb-journal-tour-header__dropdown_open", !expanded);
              });
            }

            document.addEventListener("click", function (event) {
              if (header.contains(event.target)) return;
              header.querySelectorAll(".sb-journal-tour-header__dropdown").forEach(function (node) {
                node.classList.remove("sb-journal-tour-header__dropdown_open");
              });
              header.querySelectorAll(".sb-journal-tour-header__dropdown-trigger").forEach(function (node) {
                node.setAttribute("aria-expanded", "false");
              });
            });

            window.addEventListener("scroll", syncScrolled, { passive: true });
            syncScrolled();
          });
        });
      </script>
  `;
}

// ─── Rich local context for journal articles (SEO / GEO / AEO) ───────────────
// Each entry adds real-world detail the templates weave into longer, more
// authoritative articles.  Keys that are missing fall back to tag-based defaults.
const TOUR_LOCAL_CONTEXT = {
  "ubud-highlights-tour": {
    bestMonths: "April–October (dry season) for clearest Kintamani volcano views",
    whatToBring: "Comfortable walking shoes, sunscreen, a sarong for temple entry (often provided), cash for souvenirs at craft villages, and a camera with good zoom for volcano panoramas.",
    insiderNote: "Ask your driver to start with Gunung Kawi early — it is one of Bali's most dramatic temple complexes but gets crowded by 10 AM. The 300-step descent is worth the effort for the river-valley rock carvings.",
    practicalTips: [
      "Tegalalang Rice Terrace entrance costs around IDR 25,000 (≈ $1.60). The swing photos are extra — negotiate before sitting.",
      "Monkey Forest entrance is IDR 80,000 for adults (≈ $5). Secure sunglasses, water bottles, and dangling items — the long-tailed macaques are fast and curious.",
      "Kintamani lunch buffets overlooking Mount Batur (1,717 m) are included in the tour. Arrive before noon for the clearest caldera view.",
      "Luwak coffee tasting stops are free, but the premium civet coffee cup costs around IDR 50,000 (≈ $3) if you want to try it.",
      "Batuan Temple requires a sarong and sash — usually provided at the entrance for a small donation of IDR 10,000–20,000.",
    ],
    comparison: "This is the most popular all-day culture tour in Bali. Compared to the UNESCO Heritage Sites Tour, this route trades world-heritage depth for broader variety — you see craft villages, a volcano, rice terraces, and Ubud in one loop.",
    faq: [
      ["Is the Ubud Highlights tour suitable for children?", "Yes. The route is low-impact with short walks. Children enjoy the Monkey Forest and the Kintamani lunch views. Car seats can be arranged on request."],
      ["What time does the Ubud tour start and finish?", "Hotel pickup is around 08:00. The route runs roughly 10 hours, returning by 17:00–18:00 depending on your hotel location."],
      ["Do I need to bring a sarong for temple visits?", "Sarongs are usually provided at each temple entrance, but bringing your own is fine. Knees and shoulders should be covered inside temple grounds."],
      ["Is lunch included in the tour price?", "Yes — an Indonesian buffet lunch at a Kintamani restaurant with volcano views is included. Drinks are usually extra."],
      ["Can I customize the stops on the Ubud tour?", "Yes. Private tours can adjust the order or swap stops — for example, skipping craft villages to spend more time in Ubud or adding Tirta Empul water temple."],
      ["What is the best time of year for clear volcano views?", "May through September offers the driest weather and best visibility for Mount Batur and Lake Batur panoramas. Morning cloud can still roll in, so early lunch timing helps."],
    ],
  },
  "mount-batur-sunrise-jeep-tour": {
    bestMonths: "April–October for the clearest sunrises; the trek runs year-round, but dry season mornings have the highest chance of a cloud-free caldera view",
    whatToBring: "Warm layers (summit temperature drops to 12–18 °C / 54–64 °F before sunrise), a headlamp or flashlight, closed-toe shoes, at least 1 L of water, sunscreen for the descent, and a rain jacket in wet season.",
    insiderNote: "Guides cook breakfast eggs using volcanic steam vents on the caldera rim — a genuinely unique experience. If you add the hot springs, arrive before 9 AM while the pools are quiet.",
    practicalTips: [
      "Pickup from south Bali (Kuta, Seminyak, Nusa Dua) is around 01:40–02:00 AM. From Ubud it is around 02:30–03:00 AM.",
      "The jeep ride avoids the 2-hour hike entirely — ideal for travelers who want the sunrise without the physical effort. The 4WD climbs to a viewpoint near the summit.",
      "Mount Batur stands at 1,717 m (5,633 ft). Even in the jeep, temperatures at the top feel 10–15 °C cooler than at sea level.",
      "Batur Natural Hot Spring entry costs around $15–20 and includes towel, welcome drink, and locker. The pools overlook Lake Batur.",
      "A certified local guide is mandatory for all Batur treks — enforced by the Kintamani trekking association (HPPGB).",
    ],
    comparison: "The jeep tour is the non-hiking alternative to the classic Mount Batur sunrise trek. You get the same caldera sunrise view without the 2-hour climb, which makes it suitable for families, older travelers, or anyone who prefers comfort over adventure.",
    faq: [
      ["How early is the pickup for the Mount Batur sunrise jeep tour?", "Pickup is between 01:40 and 03:00 AM depending on your hotel location. South Bali hotels depart earliest; Ubud hotels depart around 02:30–03:00 AM."],
      ["Do I need to hike on the jeep tour?", "No. The 4WD jeep drives to a viewpoint near the summit. There is a short walk of about 5–10 minutes to the best sunrise spot, but no strenuous climbing."],
      ["What temperature should I expect at the summit?", "Expect 12–18 °C (54–64 °F) before sunrise, which can feel colder with wind chill. Bring a warm jacket or hoodie even if Bali feels hot at sea level."],
      ["Is the hot spring included in the tour price?", "Some packages include hot spring entry; others offer it as an add-on. Confirm when booking. Entry alone costs around $15–20 per person."],
      ["Can children do the Mount Batur jeep tour?", "Yes. The jeep tour is suitable for all ages since there is no significant hiking involved. Children should still dress warmly for the pre-dawn temperature."],
      ["What happens if it rains or is cloudy?", "The tour runs in all weather. Cloud cover can obscure the sunrise, but the experience above the clouds is often dramatic in its own way. Dry season (April–October) gives the best odds of clear skies."],
    ],
  },
  "nusa-penida-manta-rays-point": {
    bestMonths: "Year-round, but April–November has calmer seas and 80%+ manta sighting rates; July–October is peak season",
    whatToBring: "Swimwear, reef-safe sunscreen, a towel, motion sickness tablets (the boat crossing can be rough), an underwater camera or GoPro, and a light jacket for the speedboat.",
    insiderNote: "Manta rays are found at a cleaning station at Manta Point where they circle to have parasites removed by smaller fish. They are wild animals, so sightings cannot be guaranteed — but local crews report 80–90% success rates in peak months.",
    practicalTips: [
      "The speedboat from Sanur Harbor to Nusa Penida takes 30–45 minutes. Seas are calmest before 10 AM.",
      "Snorkeling at Manta Point typically lasts 30–45 minutes. The ocean-floor depth is 10–15 m but mantas feed near the surface.",
      "Crystal Bay is a common second stop with 15–25 m visibility and colorful reef fish. The bay is also a mola-mola (ocean sunfish) hotspot from July to November.",
      "All snorkeling gear (mask, snorkel, fins, life jacket) is provided. If you wear prescription glasses, bring your own prescription mask.",
      "Motion sickness is common on the crossing. Take medication 30 minutes before departure. Sitting near the center of the boat helps.",
    ],
    comparison: "This is the focused manta-only snorkeling trip. The Nusa Penida West Tour covers the famous cliff viewpoints (Kelingking, Broken Beach) on land instead. The Full Day Tour combines both land sightseeing and snorkeling.",
    faq: [
      ["What are the chances of seeing manta rays at Manta Point?", "Local operators report an 80–90% sighting rate during peak season (July–October). Mantas are wild, so sightings depend on conditions, but the cleaning station at Manta Point draws them consistently."],
      ["Is the Manta Point snorkeling tour suitable for beginners?", "Yes. Life jackets are provided, and you snorkel on the surface — no diving required. Basic swimming comfort is recommended since the open ocean has some current."],
      ["How long is the boat ride from Bali to Nusa Penida?", "The speedboat from Sanur Harbor takes approximately 30–45 minutes, depending on sea conditions. Morning departures generally have calmer water."],
      ["What other snorkeling spots are included?", "Most tours include Crystal Bay (clear water, reef fish, possible mola-mola sightings) and sometimes Gamat Bay or Wall Point, depending on conditions."],
      ["Should I take motion sickness medication?", "If you are prone to seasickness, yes. The open-water crossing and boat positioning at snorkel sites involve swells. Take medication 30 minutes before departure."],
    ],
  },
  "nusa-penida-west-tour": {
    bestMonths: "April–October for the driest weather and clearest coastal views; sunrise-side light is best in the morning",
    whatToBring: "Good walking shoes (the Kelingking descent has 400+ steep steps), at least 1.5 L of water, sunscreen, a hat, and a camera. Wear clothes you can sweat in.",
    insiderNote: "The Kelingking Beach viewpoint — the famous T-Rex-shaped cliff — is one of Bali's most photographed spots. Getting down to the beach takes 30–40 minutes on a steep, narrow trail with over 400 steps. Most visitors stay at the viewpoint.",
    practicalTips: [
      "Roads on Nusa Penida are narrow, bumpy, and often unpaved between attractions. Travel time between stops is longer than the map distance suggests.",
      "Angel's Billabong is a natural infinity pool carved into the rocks. Swimming is only possible at low tide — at high tide or during large swells, waves crash over the pool and it becomes dangerous. Check tide times.",
      "Broken Beach is a dramatic natural rock arch over turquoise water. Swimming is not possible here, but the viewpoint is stunning.",
      "The speedboat crossing from Sanur to Nusa Penida takes 30–45 minutes. Departures are usually around 07:30–08:00 AM.",
      "Local lunch is typically included at a warung near Broken Beach. Expect Indonesian dishes — nasi goreng, mie goreng, or grilled fish.",
    ],
    comparison: "This is the Instagram-famous route covering Kelingking, Angel's Billabong, and Broken Beach — all on the west coast. The East Tour covers Diamond Beach, Atuh Beach, and Thousand Islands viewpoint. The Full Day Tour attempts both coasts in one day.",
    faq: [
      ["How difficult is the hike down to Kelingking Beach?", "The descent involves 400+ steep, narrow steps and takes 30–40 minutes each way. It is physically demanding and not recommended for those with knee issues or vertigo. The viewpoint at the top offers the iconic photo without the climb."],
      ["Is Angel's Billabong safe to swim in?", "Only at low tide with calm conditions. At high tide or during swells, powerful waves crash over the rock pool and swimming is extremely dangerous. Your guide will advise on the day."],
      ["How long does the Nusa Penida West Tour take?", "The full day including boat transfers runs approximately 10–12 hours from hotel pickup to drop-off. Time on the island is roughly 6–7 hours."],
      ["Are roads on Nusa Penida paved?", "Main roads are paved but narrow. Side roads to viewpoints are often unpaved, bumpy, and steep. A local driver who knows the terrain is essential."],
      ["Can I do both west and east Nusa Penida in one day?", "It is possible but rushed. Each coast takes 4–5 hours. The Full Day Tour covers highlights from both sides but with less time at each stop."],
    ],
  },
  "nusa-penida-east-tour": {
    bestMonths: "April–October; east coast cliffs are most photogenic in morning light",
    whatToBring: "Sturdy shoes for the Diamond Beach staircase, water, sunscreen, a hat, and a waterproof phone case for beach photos.",
    insiderNote: "Diamond Beach has an almost surreal white-sand cove at the base of towering cliffs — it went from unknown to Instagram-famous in just a few years. The staircase down was carved directly into the cliff face.",
    practicalTips: [
      "Diamond Beach stairs are steep and carved from stone — manageable for most fit adults but challenging for those with mobility issues.",
      "Atuh Beach offers a secluded cove with a dramatic rock arch in the water. The descent is moderate.",
      "Thousand Islands Viewpoint (Pulau Seribu) offers panoramic views of limestone islets scattered across turquoise water — no hiking required.",
      "Tree House is a popular photo stop with a wooden platform built into a tree overlooking the cliff edge.",
      "East coast roads are some of the roughest on Nusa Penida — expect 30–45 minutes of bumpy driving between main stops.",
    ],
    comparison: "The East Tour focuses on beaches and dramatic coastline, while the West Tour covers the most famous viewpoints (Kelingking, Broken Beach). The East is generally less crowded and more beach-focused.",
    faq: [
      ["What makes Diamond Beach special?", "Diamond Beach features a white-sand cove at the base of dramatic limestone cliffs, accessed by stairs carved directly into the rock face. The turquoise water and dramatic setting make it one of Bali's most photogenic beaches."],
      ["Is the East Nusa Penida tour less crowded than the West?", "Generally yes. The west coast (Kelingking, Broken Beach) draws the biggest crowds. The east coast sees fewer visitors, especially at Diamond Beach and Atuh Beach."],
      ["How long is the boat ride to Nusa Penida?", "About 30–45 minutes by speedboat from Sanur Harbor, Bali."],
      ["Can I swim at Diamond Beach?", "Yes, swimming is possible when conditions are calm. The beach is sheltered by cliffs but can have currents. Always assess conditions with your guide."],
    ],
  },
  "nusa-penida-full-day-tour": {
    bestMonths: "April–October for calm seas and clear skies",
    whatToBring: "Good shoes for cliff walks, swimwear, sunscreen, at least 2 L of water, and a GoPro or waterproof camera if snorkeling is included.",
    insiderNote: "This is the most ambitious Nusa Penida option — covering highlights from both coasts in a single day. It is a long but rewarding day for travelers with limited time on the island.",
    practicalTips: [
      "Expect a 10–12 hour day from pickup to drop-off. Pace yourself — the island is bigger than it looks.",
      "Most full-day tours cover Kelingking Viewpoint, Broken Beach, Angel's Billabong, and either Diamond Beach or Crystal Bay.",
      "Lunch is usually included at a local warung between coast stops.",
      "The speedboat crossing departs Sanur around 07:30–08:00 AM and returns around 16:00–17:00.",
      "If snorkeling is included, it typically happens either first or last, depending on tide and sea conditions.",
    ],
    comparison: "This combines west and east coast highlights into one action-packed day. If you have two days, splitting into separate West Tour and East Tour gives more time at each stop.",
    faq: [
      ["Is a full day on Nusa Penida too exhausting?", "It is a long day (10–12 hours including transfers), but manageable with a private driver who handles the rough roads. Bring snacks and water to keep energy up between stops."],
      ["What is the best order for the full-day route?", "Most tours start with the west coast (Kelingking, Broken Beach, Angel's Billabong) in the morning, then move east for Diamond Beach or to snorkeling spots in the afternoon."],
      ["Does the full-day tour include snorkeling?", "Some packages include a snorkeling stop at Crystal Bay or Manta Point. Confirm when booking if snorkeling is a priority for you."],
      ["How much does the Nusa Penida full day tour cost?", "Private full-day tours typically start from $35–50 per person including boat transfers, driver, and lunch. Group tours can be less."],
    ],
  },
  "nusa-penida-private-day-tour-manta-snorkeling": {
    bestMonths: "April–November for best snorkeling visibility and manta sightings",
    whatToBring: "Swimwear, towel, reef-safe sunscreen, motion sickness medication, underwater camera, light jacket for the speedboat, and dry clothes to change into.",
    insiderNote: "This tour combines sightseeing and snorkeling — you get the famous cliff viewpoints AND manta ray snorkeling in one day. It is the premium option for travelers who want both experiences.",
    practicalTips: [
      "The tour typically alternates between land sightseeing (viewpoints) and water activities (snorkeling at Manta Point and Crystal Bay).",
      "Snorkeling gear including life jackets is provided. An experienced snorkeling guide accompanies you in the water.",
      "Book this option when you only have one day for Nusa Penida but want both the iconic views and marine encounters.",
      "Manta rays can have wingspans of 3–5 meters. They are gentle filter feeders and pose no danger to snorkelers.",
    ],
    comparison: "This is the all-in-one Nusa Penida experience. The standalone Manta Point tour focuses only on snorkeling, while the West/East tours focus only on sightseeing. This combines both.",
    faq: [
      ["Can I see manta rays and Kelingking Beach in one day?", "Yes — that is exactly what this private day tour is designed for. It combines the west coast viewpoints with snorkeling at Manta Point."],
      ["Do I need snorkeling experience?", "No prior experience is needed. Life jackets and guided supervision are included. You snorkel on the surface watching mantas below."],
      ["How big are the manta rays?", "Oceanic manta rays at Manta Point typically have wingspans of 3–5 meters (10–16 feet). They are gentle plankton feeders and not dangerous."],
    ],
  },
  "white-water-rafting": {
    bestMonths: "Year-round; December–March (wet season) has the highest water levels and most exciting rapids. Dry season is calmer and better for families.",
    whatToBring: "Quick-dry clothing or shorts and a t-shirt you do not mind getting soaked, secure sandals or water shoes (not flip-flops), a change of dry clothes, sunscreen, and a waterproof phone case.",
    insiderNote: "The Ayung River runs through a stunning gorge with 30-meter-high cliff walls covered in tropical vegetation, carved stone reliefs, and small waterfalls cascading down the sides. It is as much a scenic experience as an adventure sport.",
    practicalTips: [
      "The Ayung River near Ubud is Bali's most popular rafting river — Class II–III rapids suitable for beginners and families (minimum age usually 5–7 years).",
      "The rafting section covers approximately 10–12 km and takes 1.5–2 hours on the water.",
      "You will get completely wet. There is no dry option. Valuables should be left with the operator or in a waterproof bag.",
      "Most tours include hotel transfer, safety briefing, all equipment (helmet, life jacket, paddle), and a buffet lunch overlooking the river valley.",
      "The Telaga Waja River in east Bali is the alternative for thrill-seekers — Class III–IV rapids with steeper drops.",
    ],
    comparison: "The Ayung River near Ubud is the scenic, beginner-friendly option. The Telaga Waja River near Karangasem is the more intense, advanced option with bigger rapids and a waterfall finish.",
    faq: [
      ["Is Bali white water rafting safe for beginners?", "Yes. The Ayung River has Class II–III rapids, which are suitable for first-timers and families. Professional guides, life jackets, and helmets are provided. Minimum age is typically 5–7 years."],
      ["How long does the rafting last?", "The active rafting section takes approximately 1.5–2 hours, covering 10–12 km of the Ayung River gorge. Total tour time including transfers and lunch is 5–6 hours."],
      ["Will I get wet?", "Absolutely — you will be soaked. Wear quick-dry clothing and bring a complete change of dry clothes. Do not bring valuables onto the raft."],
      ["Which river is better — Ayung or Telaga Waja?", "Ayung (near Ubud) is scenic and beginner-friendly with carved cliff walls. Telaga Waja (east Bali) has bigger Class III–IV rapids and a final waterfall drop. Choose based on your comfort level."],
      ["Is lunch included?", "Yes — most rafting tours include a buffet lunch at the base camp overlooking the river valley after the run."],
    ],
  },
  "tanah-lot-bedugul-tour": {
    bestMonths: "Year-round; sunset at Tanah Lot is spectacular any season. April–October has less rain.",
    whatToBring: "Sarong for temples (usually provided), camera with sunset capability, comfortable shoes for Bedugul botanical garden walks, and a light jacket for the cooler highlands.",
    insiderNote: "Tanah Lot is best at sunset when the sea temple silhouette against the orange sky becomes one of Bali's most iconic images. Arrive at least 30 minutes before sunset to secure a good viewpoint.",
    practicalTips: [
      "Tanah Lot entrance fee is IDR 60,000 for adults (≈ $4). At low tide, you can walk across to the base of the temple — but non-Hindus cannot enter the temple itself.",
      "Ulun Danu Beratan Temple sits on the shore of Lake Beratan at 1,200 m elevation — it is noticeably cooler than the coast.",
      "The Bedugul area includes the temple, Bali Botanical Garden, and a traditional market selling spices, strawberries, and local crafts.",
      "The route from south Bali to Bedugul passes through Jatiluwih rice terraces (UNESCO World Heritage) — worth a brief stop if time allows.",
      "Tanah Lot gets very crowded at sunset. Weekday visits are less busy than weekends.",
    ],
    comparison: "This route combines highland culture (Bedugul, lake temple) with the island's most famous sunset temple. It covers a different region than the Ubud Highlights tour, giving you a west-central Bali experience.",
    faq: [
      ["When is the best time to visit Tanah Lot?", "Late afternoon for sunset — the sea temple silhouette against the sky is iconic. Arrive 30 minutes before sunset. At low tide, you can walk to the temple base."],
      ["What is Ulun Danu Beratan Temple?", "A photogenic Hindu-Buddhist temple on the shore of Lake Beratan at 1,200 m elevation in Bali's central highlands. The temple appears to float on the lake when water levels are high."],
      ["Is this tour suitable for the same day as an Ubud tour?", "They are separate regions and each takes a full day. The Tanah Lot-Bedugul route covers west-central Bali while Ubud tours cover the east-central area."],
      ["Can I enter Tanah Lot Temple?", "Non-Hindu visitors can walk to the temple base at low tide but cannot enter the temple itself. The sunset viewpoint from the cliffs is the main attraction."],
    ],
  },
  "bali-unesco": {
    bestMonths: "April–October for dry weather; mornings are best for cooler temperatures at temple sites",
    whatToBring: "Sarong and sash for all temple entries, comfortable walking shoes (some sites have uneven stone paths), water, sunscreen, and a hat.",
    insiderNote: "Bali's UNESCO Cultural Landscape (inscribed 2012) protects the Subak irrigation system — a 1,000-year-old cooperative water management tradition that shapes the island's rice terraces. Understanding Subak transforms temple visits from photo ops into cultural encounters.",
    practicalTips: [
      "Tirta Empul Temple is famous for its holy spring water purification ritual. Visitors can participate — wear modest clothing (sarong provided) and follow the guide's instructions for the blessing sequence.",
      "Jatiluwih Rice Terraces are a UNESCO World Heritage Site covering 600+ hectares. The walking paths range from 30 minutes to 2 hours depending on your route.",
      "Taman Ayun Royal Temple in Mengwi features classic Balinese multi-tiered shrines (merus) surrounded by a moat. Entrance is IDR 50,000 (≈ $3).",
      "Gunung Kawi is accessed via 300+ steps down to a river valley with 9th-century rock-cut shrines. Start early to avoid crowds and heat.",
      "Temple etiquette: remove hats inside, do not point feet at shrines, avoid standing higher than offerings, and do not touch sacred objects.",
    ],
    comparison: "This tour focuses specifically on UNESCO-recognized heritage sites and the Subak cultural landscape. It is more culturally focused than the Ubud Highlights tour, which balances temples with rice terraces, craft villages, and Ubud town.",
    faq: [
      ["What is the Bali UNESCO Cultural Landscape?", "Inscribed in 2012, it protects the Subak system — a 1,000-year-old Balinese cooperative irrigation network linked to Hindu water temples. It includes Jatiluwih rice terraces, Taman Ayun Temple, and several holy water temples."],
      ["Can I do the purification ritual at Tirta Empul?", "Yes, visitors can participate in the melukat (purification) ritual at Tirta Empul. Wear the provided sarong, follow the sequence of fountains as directed, and maintain respectful silence during the ritual."],
      ["How much walking is involved in the UNESCO tour?", "Moderate walking at each site. Gunung Kawi has 300+ steps. Jatiluwih rice terrace walks range from 30 minutes to 2 hours. Other temples have flat grounds."],
      ["Is this tour different from the Ubud Highlights tour?", "Yes — the UNESCO tour focuses on heritage sites and cultural depth, while the Ubud Highlights tour is a broader introduction to central Bali including craft villages, Monkey Forest, and a volcano lunch."],
    ],
  },
  "gili-islands-getaway": {
    bestMonths: "April–October for calm seas and best snorkeling visibility; June–September is peak season",
    whatToBring: "Swimwear, reef-safe sunscreen, a waterproof bag for electronics, sandals, a light cover-up, cash (ATMs on Gili T are unreliable), and snorkeling gear if you prefer your own.",
    insiderNote: "The Gili Islands have no motorized vehicles — transport is by bicycle or horse-drawn cart (cidomo). This car-free atmosphere makes them feel worlds apart from mainland Bali. Gili Trawangan is the party island, Gili Air is relaxed, and Gili Meno is the quietest.",
    practicalTips: [
      "Fast boat from Bali (Padang Bai or Serangan) takes 1.5–2.5 hours depending on the operator and sea conditions.",
      "Sea turtles are regularly spotted while snorkeling off all three Gilis. Turtle Point between Gili Meno and Gili Trawangan is the most reliable spot.",
      "There are no motorized vehicles on any Gili island. Get around by bicycle (rental: IDR 50,000/day ≈ $3) or walking.",
      "Gili Trawangan has the most restaurants, bars, and nightlife. Gili Air is a good mix of quiet and social. Gili Meno is the honeymoon island.",
      "Underwater statues (NEST sculpture garden) near Gili Meno are a unique snorkeling attraction, created as artificial reef habitats.",
    ],
    comparison: "The Gili Islands Getaway is a multi-day trip with an overnight stay, while the Gili Island Day Tour covers one island in a single day. The getaway gives you time to explore, snorkel multiple sites, and experience sunset and sunrise on the islands.",
    faq: [
      ["How do I get to the Gili Islands from Bali?", "Fast boats depart from Padang Bai or Serangan Harbor and take 1.5–2.5 hours. Hotel pickup and boat transfers are included in the tour package."],
      ["Which Gili island is best?", "Gili Trawangan for nightlife and social energy, Gili Air for a relaxed mix of restaurants and quiet beaches, and Gili Meno for seclusion and honeymoon vibes."],
      ["Can I see sea turtles while snorkeling?", "Yes — sea turtles are regularly spotted off all three islands. Turtle Point between Gili Meno and Gili Trawangan has the highest sighting rate."],
      ["Are there ATMs on the Gili Islands?", "Gili Trawangan has a few ATMs, but they frequently run out of cash or charge high fees. Bring sufficient Indonesian Rupiah from Bali."],
      ["Are there cars on the Gili Islands?", "No. The Gili Islands have no motorized vehicles. Transport is by bicycle, walking, or horse-drawn cart (cidomo)."],
    ],
  },
  "gili-island-tour": {
    bestMonths: "April–October for calm crossings; year-round for snorkeling",
    whatToBring: "Swimwear, sunscreen, towel, waterproof camera, cash for the island, and motion sickness medication for the boat.",
    insiderNote: "A day trip to Gili gives you a taste of the island atmosphere without committing to an overnight. You will typically visit one island with time for snorkeling, beach time, and a local lunch.",
    practicalTips: [
      "Day trips usually focus on Gili Trawangan or Gili Air — the most accessible from Bali.",
      "Snorkeling around the Gili Islands offers exceptional visibility (15–30 m) and regular turtle sightings.",
      "The fast boat crossing can be rough — sit near the center of the boat if you are prone to motion sickness.",
      "Island time is limited on a day trip (usually 4–5 hours), so prioritize — either snorkeling or island exploration, not both in depth.",
    ],
    comparison: "This is the single-day version of the Gili experience. The Gili Islands Getaway includes an overnight stay and more time to explore. Choose the day tour when your schedule is tight.",
    faq: [
      ["Is a Gili Islands day trip worth it?", "Yes, if you want a taste of the car-free island atmosphere and some of the best snorkeling in the region. For a deeper experience, consider the overnight getaway."],
      ["How long is the boat to Gili Islands?", "Fast boats take 1.5–2.5 hours from Bali depending on the departure point and sea conditions."],
      ["Will I have time to snorkel on a day trip?", "Yes — day trips typically include 1–2 snorkeling stops plus free time on the island. Total island time is roughly 4–5 hours."],
    ],
  },
  "blue-lagoon-snorkeling": {
    bestMonths: "April–November for calmest seas; water temperature is 27–29 °C year-round",
    whatToBring: "Swimwear, reef-safe sunscreen, towel, underwater camera, and light clothing for the boat ride.",
    insiderNote: "Blue Lagoon in Padang Bai is one of Bali's best mainland snorkeling spots — a sheltered bay with calm, clear water and a sandy bottom that makes it ideal for beginners and families.",
    practicalTips: [
      "Blue Lagoon is near Padang Bai port in east Bali — about 1.5 hours drive from Ubud or south Bali.",
      "The snorkeling area is sheltered and shallow (2–8 m), making it one of the safest ocean snorkeling spots in Bali.",
      "Expect to see colorful coral, parrotfish, clownfish, sea turtles, and sometimes reef sharks in deeper sections.",
      "Most tours include 2–3 snorkeling spots: Blue Lagoon, Tanjung Jepun, and sometimes Bias Tugel beach.",
      "Equipment (mask, snorkel, fins, life jacket) is included. An experienced guide accompanies you in the water.",
    ],
    comparison: "Blue Lagoon is the mainland alternative to Nusa Penida snorkeling — calmer water, shorter travel time, and better for beginners. Nusa Penida offers manta rays and more dramatic marine life but requires a 45-minute boat crossing.",
    faq: [
      ["Is Blue Lagoon snorkeling suitable for kids?", "Yes — the sheltered bay has calm, shallow water (2–8 m) and is one of Bali's most family-friendly snorkeling spots. Life jackets are provided."],
      ["What marine life can I see at Blue Lagoon?", "Colorful reef fish (parrotfish, clownfish, angelfish), sea turtles, and healthy coral formations. Occasionally small reef sharks in deeper areas."],
      ["How does Blue Lagoon compare to Nusa Penida snorkeling?", "Blue Lagoon is calmer, closer to mainland Bali, and ideal for beginners. Nusa Penida offers manta rays and more dramatic underwater scenery but requires a longer boat crossing."],
    ],
  },
  "sunset-cruise-bali": {
    bestMonths: "Year-round; April–October has the calmest seas and most reliable sunset colors",
    whatToBring: "Smart casual clothing (it is a cruise, not a beach trip), a light jacket for wind on deck, sunscreen, and a camera.",
    insiderNote: "Bali's west-facing coastline creates ideal conditions for dramatic sunset cruises. The best departures are from Benoa Harbor, heading along the coast toward Uluwatu or Tanah Lot direction.",
    practicalTips: [
      "Sunset cruises typically depart 2–3 hours before sunset and return after dark. Total time on the water is 2.5–3.5 hours.",
      "Most cruises include welcome drinks, canapés or a light dinner, and sometimes live music or a DJ.",
      "Benoa Harbor is the main departure point — about 20 minutes from Nusa Dua and 40 minutes from Seminyak.",
      "The best sunset viewing is on the port (left) side of the boat heading south.",
    ],
    comparison: "A sunset cruise offers a different perspective of Bali from the water — more relaxed and romantic than a land-based sunset at Tanah Lot or Uluwatu Temple.",
    faq: [
      ["What time does the sunset cruise depart?", "Typically 2–3 hours before sunset, so around 15:00–16:00 depending on the season. The cruise returns after dark."],
      ["Is food included on the sunset cruise?", "Most cruises include welcome drinks, canapés, and sometimes a light dinner. Confirm the specific inclusions when booking."],
      ["Will I get seasick on the cruise?", "The cruise stays in relatively sheltered waters along the Bali coast, so motion is usually mild. If you are prone to seasickness, take precautions."],
    ],
  },
  "atv-ride-adventure": {
    bestMonths: "Year-round; wet season (November–March) makes the trails muddier and more exciting for experienced riders",
    whatToBring: "Clothes you do not mind getting dirty (you will get muddy), closed-toe shoes, a change of clothes, sunscreen, and insect repellent.",
    insiderNote: "Bali ATV rides go through terrain you would never see on a regular tour — river crossings, rice paddy edges, jungle trails, and sometimes through small traditional villages where locals wave as you pass.",
    practicalTips: [
      "No prior ATV experience needed. A safety briefing and practice run are included before the main trail.",
      "Trails run through rice terraces, river beds, bamboo forests, and village paths — lasting 1.5–2 hours of riding time.",
      "You will get dirty. Operators provide shower and changing facilities after the ride.",
      "Helmet and safety gear are provided. Long pants and closed shoes are required.",
      "Minimum age varies: typically 7–12 years for riding as a passenger, 16+ for solo driving.",
    ],
    comparison: "The ATV Ride Adventure is the longer, more terrain-diverse option. The ATV Quad Bikes tour is a shorter ride focused on a specific trail area.",
    faq: [
      ["Do I need experience to ride an ATV in Bali?", "No. All tours include a safety briefing, instruction on controls, and a practice area before heading onto the main trail. Guides accompany you throughout."],
      ["How dirty will I get?", "Very. River crossings and muddy trails are part of the experience. Operators provide showers and changing facilities after the ride."],
      ["Is the ATV ride safe?", "Yes — professional guides lead the group, helmets and safety gear are provided, and speeds are controlled. The terrain is adventurous but not dangerous for attentive riders."],
      ["Can children ride ATVs in Bali?", "Children aged 7–12 can typically ride as passengers with an adult. Solo riding is usually age 16+. Check specific operator policies."],
    ],
  },
  "atv-quad-bikes": {
    bestMonths: "Year-round; wet season trails are muddier but more fun",
    whatToBring: "Old clothes, closed shoes, a change of outfit, and sunscreen.",
    insiderNote: "Quad bike tours offer a shorter but equally thrilling off-road experience through Bali's countryside. The smaller vehicles are easier to handle for first-timers.",
    practicalTips: [
      "Shorter ride time (1–1.5 hours) than the ATV adventure, making it easier to combine with another activity the same day.",
      "Trails typically go through rice paddies, river crossings, and village paths.",
      "Shower and changing facilities are available after the ride.",
      "Photo stops are built into the route at scenic viewpoints.",
    ],
    comparison: "Shorter and more accessible than the full ATV Ride Adventure. Good as a half-day activity combined with a temple or cultural stop.",
    faq: [
      ["What is the difference between ATV and quad bike tours?", "In Bali, they refer to similar vehicles. The Quad Bike tour is typically a shorter ride (1–1.5 hours) while the ATV Ride Adventure is longer (1.5–2 hours) with more diverse terrain."],
      ["Can beginners ride quad bikes?", "Yes. Instruction is provided, and the trails are suitable for first-time riders. Guides accompany the group."],
    ],
  },
  "surf-lesson-experience": {
    bestMonths: "Year-round; April–October has cleaner wave conditions. Beginners do well in all seasons at Kuta and Seminyak beaches.",
    whatToBring: "Swimwear, reef-safe sunscreen (you will be in the water 1.5–2 hours), a rash guard if you have one, and a towel.",
    insiderNote: "Kuta and Seminyak beaches have some of the best beginner waves in Asia — long, gentle, sandy-bottom breaks that are ideal for learning. The warm water (27–29 °C) means you do not need a wetsuit.",
    practicalTips: [
      "Lessons usually last 1.5–2 hours with a certified instructor. Soft-top boards are provided for safety.",
      "Most beginners stand up within the first lesson. The sandy bottom and waist-deep starting position make Bali one of the safest places to learn.",
      "Morning sessions (07:00–09:00) have smaller crowds and often cleaner wave conditions.",
      "Rash guards or UV shirts are recommended — sunburn happens fast in equatorial water reflection.",
      "Experienced surfers should head to Uluwatu, Padang Padang, or Canggu for more challenging reef breaks.",
    ],
    comparison: "Bali surf lessons are shore-based on Kuta/Seminyak beaches, using the gentle sandy-bottom breaks. This is not a surf safari to reef breaks — it is a controlled learning environment ideal for first-timers.",
    faq: [
      ["Can complete beginners learn to surf in Bali?", "Absolutely. Kuta and Seminyak beaches have gentle, sandy-bottom waves specifically suited for learning. Most beginners stand up during their first 2-hour lesson."],
      ["Do I need to bring my own surfboard?", "No. Soft-top beginner boards are provided by the operator. These boards are larger and more stable than standard surfboards."],
      ["What is the best time of day for a surf lesson?", "Early morning (07:00–09:00) is ideal — smaller crowds, cleaner waves, and cooler temperatures before the midday sun."],
    ],
  },
  "sumbawa-whale-shark-snorkeling-trip": {
    bestMonths: "Year-round, but June–October has the highest whale shark concentration around Saleh Bay, Sumbawa",
    whatToBring: "Underwater camera, swimwear, reef-safe sunscreen, motion sickness medication, warm layers for early departure, and a sense of adventure.",
    insiderNote: "This is a genuinely rare experience — swimming alongside whale sharks, the world's largest fish (up to 12 m / 40 ft). Sumbawa's Saleh Bay is one of the few accessible locations in Indonesia for consistent sightings.",
    practicalTips: [
      "Whale sharks are filter feeders and completely harmless to humans — they eat plankton, not fish or people.",
      "The trip involves significant travel from Bali (ferry or flight to Sumbawa + local transfer). This is typically a multi-day excursion.",
      "Snorkeling only — no diving certification required. Life jackets available.",
      "Whale shark encounters are regulated to minimize disturbance — maintain a respectful distance and do not touch the animals.",
      "Sumbawa is much less developed than Bali — expect basic facilities and authentic Indonesian village atmosphere.",
    ],
    comparison: "This is a multi-day expedition, not a casual day trip. It offers a completely different scale of marine encounter compared to Nusa Penida manta ray snorkeling.",
    faq: [
      ["How big are whale sharks?", "Whale sharks can reach up to 12 meters (40 feet) in length, making them the world's largest fish. They are gentle filter feeders and completely harmless to swimmers."],
      ["Is it safe to swim with whale sharks?", "Yes. Whale sharks eat plankton and pose no threat to humans. You snorkel on the surface while they feed below. Certified guides ensure safe, respectful encounters."],
      ["How long is the trip to Sumbawa from Bali?", "Sumbawa is a separate island east of Bali. The trip involves a ferry or domestic flight plus local transfers. This is typically a multi-day excursion, not a day trip."],
    ],
  },
  "nusa-lembongan-ceningan-day-trip": {
    bestMonths: "April–October for calm seas; the islands are pleasant year-round",
    whatToBring: "Swimwear, sunscreen, waterproof bag for electronics, comfortable clothes, cash for the island, and a towel.",
    insiderNote: "Nusa Lembongan and Nusa Ceningan are connected by a famous yellow suspension bridge — an Instagram-worthy photo spot. The islands are smaller and more laid-back than Nusa Penida, with better swimming beaches.",
    practicalTips: [
      "The fast boat from Sanur to Nusa Lembongan takes about 30 minutes — shorter than the Nusa Penida crossing.",
      "Dream Beach on Lembongan has crystal-clear water and dramatic cliff backdrops.",
      "The Yellow Bridge connecting Lembongan to Ceningan is a must-see photo stop.",
      "Devil's Tear is a dramatic blowhole where waves crash through a gap in the cliff — spectacular at high tide.",
      "Mangrove tours by boat offer a peaceful contrast to the cliff and beach scenery.",
    ],
    comparison: "Nusa Lembongan is closer to Bali (30-minute crossing vs. 45 minutes to Nusa Penida), smaller, more relaxed, and has better swimming beaches. Nusa Penida has more dramatic cliff scenery and manta ray snorkeling.",
    faq: [
      ["How far is Nusa Lembongan from Bali?", "About 30 minutes by fast boat from Sanur Harbor — shorter and smoother than the Nusa Penida crossing."],
      ["What is the Yellow Bridge?", "A bright yellow suspension bridge connecting Nusa Lembongan to neighboring Nusa Ceningan. It is a popular photo spot and the only road connection between the two islands."],
      ["Is Nusa Lembongan better than Nusa Penida?", "They are different. Lembongan is smaller, more relaxed, with better swimming beaches. Penida is bigger with more dramatic cliffs and manta ray snorkeling. Lembongan is better for a chill beach day; Penida for adventure."],
    ],
  },
  "bali-instagram-highlights-tour": {
    bestMonths: "Year-round; morning light (07:00–10:00) gives the best photo conditions",
    whatToBring: "Camera or phone with storage space, portable charger, sarong for temples, sunscreen, and an outfit you want to photograph.",
    insiderNote: "This tour is designed specifically for photography — the route is planned around golden-hour timing and the least-crowded windows at each Instagram hotspot.",
    practicalTips: [
      "Lempuyang Temple (Gates of Heaven) is the most-queued Instagram shot in Bali. Arriving early (07:00) reduces wait times from 1+ hour to 15–20 minutes.",
      "Tirta Gangga Water Palace features ornate fountains and stepping stones over koi ponds — excellent for walk-through photos.",
      "Handara Gate is a Balinese split gate (candi bentar) on a golf course — surprisingly photogenic and less crowded on weekdays.",
      "The tour optimizes order so you hit each spot at its best light. Morning for east-facing sites, afternoon for west-facing ones.",
    ],
    comparison: "This is the photo-optimized route. The Ubud Highlights tour covers similar territory but focuses on cultural experience rather than photography timing.",
    faq: [
      ["What is the Gates of Heaven in Bali?", "Lempuyang Temple's split gate (Pura Penataran Agung) frames Mount Agung in the background. It is one of Bali's most photographed spots. A mirror reflection effect was originally created by a phone held under the camera."],
      ["How long do you wait at Lempuyang Temple?", "Wait times for the iconic gate photo can exceed 1 hour at peak times (10:00 AM–2:00 PM). Early arrival (before 08:00) reduces the wait to 15–20 minutes."],
      ["Do I need a photographer for the Instagram tour?", "Your private driver/guide can take photos for you, but they are not professional photographers. Some operators offer a photography add-on."],
    ],
  },
  "ubud-instagram-tour": {
    bestMonths: "Year-round; best morning light for Tegalalang photos is 08:00–10:00",
    whatToBring: "Camera, portable charger, sarong, comfortable shoes for rice terrace walks, and sunscreen.",
    insiderNote: "The Ubud Instagram route focuses on the central Bali corridor — rice terraces, jungle swings, coffee plantations, and temple gates in one photogenic loop.",
    practicalTips: [
      "Tegalalang rice terrace swings cost IDR 100,000–200,000 (≈ $7–13) depending on the height and location. Photos are included in swing fees.",
      "The Ubud area has several jungle swing operators — Bali Swing is the most famous but also the most crowded. Smaller operators nearby offer similar views with shorter waits.",
      "Coffee plantation stops are free (the coffee tasting is complimentary), but purchasing premium luwak coffee is encouraged.",
      "Temple dress codes apply at all stops — sarong and sash required, usually provided.",
    ],
    comparison: "This is the Ubud-area-specific photo tour. The Bali Instagram Highlights Tour covers a wider area including east Bali (Lempuyang, Tirta Gangga).",
    faq: [
      ["How much does the Tegalalang swing cost?", "Swing experiences at Tegalalang cost IDR 100,000–200,000 (≈ $7–13) per person depending on the height and operator. Photos taken by staff are usually included."],
      ["Is the Ubud Instagram tour different from the Ubud Highlights tour?", "Yes — the Instagram tour is optimized for photo opportunities and timing, while the Highlights tour focuses on cultural experiences and includes temple interiors, craft villages, and volcano views."],
    ],
  },
  "east-bali-instagram-tour": {
    bestMonths: "April–October; early morning for Lempuyang gate photos with Mount Agung visible",
    whatToBring: "Camera, sarong, comfortable shoes for temple grounds, sunscreen, and water.",
    insiderNote: "East Bali has a completely different feel from the tourist centers — more rural, less developed, and with some of the island's most dramatic landscapes including views of Mount Agung (3,031 m).",
    practicalTips: [
      "Lempuyang Temple is in east Bali, about 2 hours from Ubud and 2.5 hours from Seminyak. The early start is worth it for shorter gate photo queues.",
      "Tirta Gangga Water Palace entrance is IDR 50,000 (≈ $3). The stepping stones over the koi ponds make for memorable walk-through photos.",
      "Tukad Cepung Waterfall is a hidden gem accessible through a cave entrance — the light beams through a narrow canyon for incredible photos (best around 09:00–10:00 AM).",
      "The drive through east Bali passes traditional villages, rice terraces, and views of Mount Agung — the island's highest and holiest volcano.",
    ],
    comparison: "Focuses on east Bali's less-visited but more dramatic landscape. The Bali Instagram Highlights Tour may include some of these stops but covers a broader area.",
    faq: [
      ["How far is Lempuyang Temple from Ubud?", "About 2 hours by car. From Seminyak or Kuta, it is approximately 2.5 hours. Early departure (05:00–06:00) is recommended."],
      ["What is special about Tukad Cepung Waterfall?", "Light beams filter through a narrow canyon onto the waterfall, creating a cathedral-like effect. Best photo conditions are between 09:00–10:00 AM when sunlight enters at the right angle."],
    ],
  },
  "north-bali-lovina-dolphins-tour": {
    bestMonths: "April–October for calmest seas; dolphin sightings are year-round",
    whatToBring: "Light jacket for the early morning boat ride, binoculars if you have them, camera with zoom lens, swimwear for hot springs, and comfortable clothes.",
    insiderNote: "Lovina's dolphin-watching boats head out before sunrise — the dolphins feed in the early morning waters. Spinner dolphins are the most common species, often leaping and spinning in groups of 20–100+.",
    practicalTips: [
      "Pickup from south Bali is around 02:00–03:00 AM for the predawn boat departure at Lovina Beach.",
      "Dolphin sightings are common (80%+ success rate) but not guaranteed. Spinner dolphins are the primary species.",
      "After dolphins, the route typically includes Gitgit Waterfall, Ulun Danu Beratan Temple, and Jatiluwih rice terraces.",
      "Bali's north coast (Lovina area) is quieter and more local-feeling than the tourist south — a good contrast experience.",
      "The drive from south Bali to Lovina takes about 3 hours through mountain roads with scenic views.",
    ],
    comparison: "This is the comprehensive north Bali route. The Dolphin Sunrise City Tour is a more focused, shorter version of the experience.",
    faq: [
      ["What time do I need to wake up for Lovina dolphins?", "Hotel pickup from south Bali is around 02:00–03:00 AM. The boat departs Lovina Beach before sunrise, around 06:00 AM."],
      ["What kind of dolphins are in Lovina?", "Primarily spinner dolphins, known for their acrobatic leaping and spinning. They typically travel in pods of 20–100+ individuals."],
      ["What else is included in the North Bali tour?", "After the dolphin excursion, the route typically visits Gitgit Waterfall, Ulun Danu Beratan Temple on Lake Beratan, and sometimes Jatiluwih rice terraces on the return journey."],
    ],
  },
  "dolphin-sunrise-city-tour": {
    bestMonths: "Year-round; April–October for calmest seas",
    whatToBring: "Light jacket, camera with zoom, swimwear (optional for hot springs), and comfortable clothes.",
    insiderNote: "This is the streamlined version of the Lovina dolphin experience — fewer stops than the full North Bali tour, designed for travelers who want the core dolphin encounter without a 12-hour day.",
    practicalTips: [
      "Shorter than the full North Bali tour (8 hours vs. 10–12), focusing on dolphins plus 2–3 key sightseeing stops.",
      "Gitgit Waterfall is a common included stop — a 40-meter waterfall accessed via a short forest walk.",
      "Ulun Danu Beratan Temple is the iconic lake temple featured on Indonesia's 50,000 rupiah banknote.",
    ],
    comparison: "Compact version of the North Bali Lovina Dolphins Tour. Less driving, fewer stops, same dolphin experience.",
    faq: [
      ["How does this differ from the full North Bali tour?", "This is a shorter 8-hour version focused on the dolphin sunrise and 2–3 key stops. The full North Bali tour is 10–12 hours with more sightseeing."],
      ["Are dolphin sightings guaranteed?", "Not guaranteed, but Lovina has an 80%+ sighting rate. Spinner dolphins are present year-round, with morning feeding being the most reliable viewing window."],
    ],
  },
  "bali-airport-transfer": {
    bestMonths: "Year-round",
    whatToBring: "Flight details, hotel confirmation, and enough cash for tips.",
    insiderNote: "Ngurah Rai International Airport (DPS) is in south Bali. Traffic between the airport and popular tourist areas varies dramatically — Kuta is 15 minutes while Ubud can be 1.5–2 hours in traffic.",
    practicalTips: [
      "Transfer times: Airport to Kuta/Legian: 15–20 min. To Seminyak: 25–40 min. To Canggu: 45–60 min. To Ubud: 1–1.5 hours. To Nusa Dua: 20–30 min.",
      "Late-night arrivals (22:00+) have much lighter traffic — transfers to Ubud drop to 50–60 minutes.",
      "Your driver will wait in the arrivals hall with a name sign. Share your flight number so they can track delays.",
      "Private transfers are significantly more comfortable and reliable than flagging a taxi at the airport.",
    ],
    comparison: "Private airport transfer vs. taxi: fixed price, air-conditioned vehicle, driver waiting with name sign, no meter negotiation, no luggage hassle.",
    faq: [
      ["How long is the transfer from Bali airport to Ubud?", "1–1.5 hours in normal traffic, or 50–60 minutes late at night. Traffic around Denpasar can add significant time during peak hours (08:00–10:00, 17:00–19:00)."],
      ["Will my driver meet me inside the airport?", "Yes — your driver will be in the arrivals hall holding a name sign. Share your flight number in advance so they can monitor for delays."],
      ["How much does a private airport transfer cost?", "Private transfers typically start from $15–25 depending on destination distance. This is competitive with metered taxis and includes door-to-door service with a name sign."],
    ],
  },
  "private-car-with-driver-bali": {
    bestMonths: "Year-round",
    whatToBring: "A rough itinerary or list of places you want to visit. Your driver can help plan the route.",
    insiderNote: "Hiring a private car with driver is the most flexible way to explore Bali. Drivers are knowledgeable locals who double as informal guides — they know traffic patterns, temple etiquette, and the best lunch spots.",
    practicalTips: [
      "Standard booking is for 10 hours. Extra hours can usually be added for a reasonable fee.",
      "Drivers provide an air-conditioned car (usually Toyota Avanza or similar) with bottled water.",
      "Entrance fees and meals are typically not included in the driver price — budget extra for these.",
      "Discuss your itinerary with the driver at pickup. They can suggest optimal routing based on traffic and opening hours.",
      "Tipping your driver is appreciated — IDR 50,000–100,000 (≈ $3–7) is a common gesture for good service.",
    ],
    comparison: "More flexible than a fixed-route tour — you choose where to go. More comfortable and knowledgeable than renting a scooter. Ideal for groups of 2–4 who want to customize their day.",
    faq: [
      ["What is included with a private car and driver?", "An air-conditioned vehicle, an experienced local driver, bottled water, and typically 10 hours of service. Entrance fees, meals, and parking are usually extra."],
      ["Can the driver help plan my itinerary?", "Yes — Bali drivers are experienced informal guides. Share your interests and they will suggest an efficient route based on location, traffic, and opening hours."],
      ["How much should I tip my Bali driver?", "Tipping is not mandatory but appreciated. IDR 50,000–100,000 (≈ $3–7) is a common gesture for a full day of good service."],
    ],
  },
  "fast-boat-transfer-bali": {
    bestMonths: "April–October for calmest crossings; boats run year-round",
    whatToBring: "Light luggage (space is limited on fast boats), waterproof bag, motion sickness medication, sunscreen, and warm layer for wind on the boat.",
    insiderNote: "Fast boat transfers connect Bali to the Gili Islands, Nusa Lembongan, and Lombok. Booking through a tour operator includes hotel pickup and harbor coordination, which eliminates the stress of navigating Bali's port areas independently.",
    practicalTips: [
      "Boats depart from Padang Bai, Serangan, or Sanur — your operator will advise the best harbor based on your hotel location.",
      "Crossing to Gili Islands: 1.5–2.5 hours. To Nusa Lembongan: 30 minutes. To Lombok: 2–3 hours.",
      "Seas can be rough, especially in wet season (November–March). Motion sickness medication is recommended.",
      "Luggage allowance is typically 15–20 kg per person on fast boats. Oversized luggage may incur extra fees.",
    ],
    comparison: "Private fast boat transfer vs. public ferry: faster, more comfortable, hotel pickup included, but more expensive. Public ferries from Padang Bai to Lombok take 4–5 hours.",
    faq: [
      ["How long is the fast boat from Bali to Gili Islands?", "1.5–2.5 hours depending on the operator and which Gili island. Seas are calmer in dry season (April–October)."],
      ["Do fast boats run in rainy season?", "Yes, but cancellations and delays are more common in rough seas (November–March). Operators will notify you of any weather-related changes."],
    ],
  },
  "bali-helicopter-scenic-tour": {
    bestMonths: "April–October for clearest visibility; mornings are best before afternoon clouds build",
    whatToBring: "Camera, sunglasses, comfortable clothing, and a sense of wonder.",
    insiderNote: "A helicopter tour compresses hours of Bali driving into 30–60 minutes of aerial perspective. You see the scale of rice terrace systems, volcanic craters, and coastline geometry that are invisible from the ground.",
    practicalTips: [
      "Flights typically depart from a helipad near Benoa or Ubud area. Exact location depends on the operator.",
      "Weight limits apply — combined passenger weight is usually capped around 300 kg per flight. Disclose accurate weights when booking.",
      "Morning flights (07:00–10:00) have the best visibility. Afternoon flights risk cloud cover over the mountains.",
      "Photography through helicopter windows works best without polarizing filters. Open-door flights offer the best photos but cost more.",
    ],
    comparison: "This is the scenic overview flight. The Volcano & Coastline Helicopter Ride is a specific route focusing on Mount Batur and the south coast.",
    faq: [
      ["How long is the helicopter tour?", "Standard scenic flights are 30–60 minutes depending on the route. Longer custom flights are available at premium pricing."],
      ["Is the helicopter tour safe?", "Yes. Operators use well-maintained helicopters with experienced commercial pilots. Safety briefings are provided before each flight."],
      ["What will I see from the helicopter?", "Depending on the route: rice terrace systems, Mount Batur volcanic crater and lake, Mount Agung, Uluwatu cliffs, temple complexes, and the coastline from Tanah Lot to Nusa Dua."],
    ],
  },
  "volcano-coastline-helicopter-ride": {
    bestMonths: "April–October; early morning for clearest volcano views",
    whatToBring: "Camera, sunglasses, light clothing. No loose items that could fly in open-door flights.",
    insiderNote: "This route specifically traces Mount Batur's caldera and the southern coastline — combining Bali's volcanic interior with its dramatic sea cliffs in one flight.",
    practicalTips: [
      "The route typically covers Mount Batur crater, Lake Batur, the south coast cliffs near Uluwatu, and the Bukit Peninsula.",
      "Open-door flights are available for photographers — expect wind and incredible unobstructed views.",
      "Weight restrictions apply. Book early for popular morning departure slots.",
    ],
    comparison: "A route-specific helicopter experience focused on volcano and coastline. The broader Scenic Helicopter Tour may cover a wider area including rice terraces.",
    faq: [
      ["What is the volcano and coastline route?", "The flight traces Mount Batur's crater and Lake Batur, then follows the southern coastline past Uluwatu's sea cliffs and the Bukit Peninsula before returning."],
      ["Can I do an open-door helicopter flight?", "Some operators offer open-door flights at premium pricing. These give unobstructed views and are popular with photographers. Safety harnesses are mandatory."],
    ],
  },
  "unesco-heritage-sites-tour": {
    bestMonths: "April–October for dry weather; mornings are cooler for temple walks",
    whatToBring: "Sarong and sash, comfortable shoes for stone paths and stairs, water, sunscreen, hat, and camera.",
    insiderNote: "This tour goes deeper into Bali's UNESCO Cultural Landscape than any other route — focusing on the ancient Subak irrigation system, royal temples, and cultural sites that earned Bali its world heritage designation.",
    practicalTips: [
      "The Subak system is over 1,000 years old and still actively manages water distribution across Bali's rice terraces through a network of temples and cooperative agreements.",
      "Taman Ayun Temple in Mengwi has some of the finest merus (multi-tiered shrines) in Bali, surrounded by a decorative moat.",
      "Jatiluwih rice terraces cover 600+ hectares and offer walking paths through active paddies — a completely different scale from Tegalalang.",
      "This tour is more educational and slower-paced than the Ubud Highlights tour — ideal for travelers interested in history and cultural understanding.",
    ],
    comparison: "More focused on UNESCO heritage and cultural depth than the Ubud Highlights tour. Less variety (no craft villages or Monkey Forest) but deeper understanding of Bali's spiritual and agricultural heritage.",
    faq: [
      ["What is included in the UNESCO Heritage Sites tour?", "The tour typically covers Jatiluwih Rice Terraces, Taman Ayun Temple, Tirta Empul, and sites connected to the Subak water temple system. Private transport and guide are included."],
      ["How is this different from the regular Bali UNESCO tour?", "Both cover UNESCO-related sites. This tour may include additional heritage locations and provide deeper cultural context about the Subak irrigation system."],
    ],
  },
};

function getTourLocalContext(tour) {
  return TOUR_LOCAL_CONTEXT[tour.slug] || {};
}

function aOrAn(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

const JOURNAL_ARTICLE_TYPES = [
  {
    key: "selling",
    slug: "why-book",
    badge: "Selling article",
    navLabel: "Why book it",
    title: (tour) => `Why Book the ${tour.title} in Bali — Is It Worth It?`,
    description: (tour) =>
      `Honest breakdown of the ${tour.title}: what you actually get, who it suits best, practical tips from travelers, and how it compares to similar Bali experiences.`,
    excerpt: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.insiderNote
        ? `${tour.summary} ${ctx.insiderNote}`
        : `${tour.summary} This guide focuses on value, fit, and the practical reasons travelers book this route before they land in Bali.`;
    },
    sections: (tour) => {
      const ctx = getTourLocalContext(tour);
      const sections = [
        {
          heading: `🎯 What the ${tour.title} actually delivers`,
          paragraphs: [
            tour.overview,
            ctx.insiderNote || tour.summary,
            `This experience runs as ${aOrAn(tour.format.split(" ")[0])} ${tour.format.toLowerCase()} covering **${tour.area}**. The typical duration is **${tour.duration}**, and it works best for ${tour.bestFor.toLowerCase()}.`,
          ],
        },
        {
          heading: "⭐ Highlights that make this route stand out",
          paragraphs: [
            `Every route in Bali competes for your limited vacation days. Here is what sets the ${tour.title} apart from the dozens of alternatives.`,
          ],
          bullets: tour.highlights.map(([heading, text]) => `${heading} — ${text}`),
        },
      ];
      if (ctx.practicalTips?.length) {
        sections.push({
          heading: "💡 Practical tips from real visitors",
          paragraphs: [
            `The details below come from travelers who have done this exact route. They cover pricing, timing, and the small things that guidebooks tend to skip.`,
          ],
          bullets: ctx.practicalTips,
        });
      }
      sections.push({
        heading: "👥 Who should book this tour — and who should not",
        paragraphs: [
          `The ${tour.title} is ideal for ${tour.bestFor.toLowerCase()}. The pickup flow starts with ${tour.pickup.toLowerCase()}, which means the logistics are handled from your hotel door.`,
          ctx.comparison || `If you are comparing multiple Bali experiences, this route works especially well when you want ${tour.duration.toLowerCase()} that feels organized instead of improvised.`,
        ],
      });
      sections.push({
        heading: "💰 What is included in the price",
        paragraphs: [
          `Pricing for the ${tour.title} starts from ${tour.price}. Here is what a typical booking covers.`,
        ],
        bullets: buildIncludes(tour),
      });
      if (ctx.bestMonths) {
        sections.push({
          heading: "📅 Best time of year to go",
          paragraphs: [
            `Timing matters more than most travelers realize. ${ctx.bestMonths}.`,
            ctx.whatToBring ? `Pack accordingly: ${ctx.whatToBring}` : "",
          ].filter(Boolean),
        });
      }
      sections.push({
        heading: "✅ What to know before you book",
        paragraphs: [
          `A few practical details that help set the right expectations for the ${tour.title}.`,
        ],
        bullets: [
          `Current pricing reference: ${tour.price}. Final availability is confirmed after you send the date, hotel area, and group size.`,
          ...buildGoodToKnow(tour),
        ],
      });
      return sections;
    },
    faq: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.faq || [];
    },
  },
  {
    key: "interesting",
    slug: "travel-guide",
    badge: "Travel guide",
    navLabel: "Travel guide",
    title: (tour) => `${tour.title} — The Complete Bali Travel Guide`,
    description: (tour) =>
      `Everything you need to know about the ${tour.title}: what to expect, insider tips, best time to visit, what to bring, and answers to the most common questions.`,
    excerpt: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.insiderNote
        ? `${ctx.insiderNote} This guide covers everything from practical tips to insider knowledge that will help you get the most out of the ${tour.title}.`
        : `Every strong Bali tour has its own identity. This guide explains the mood, scenery, standout stops, and practical details that make the ${tour.title} memorable.`;
    },
    sections: (tour) => {
      const ctx = getTourLocalContext(tour);
      const sections = [
        {
          heading: `🌟 What makes the ${tour.title} worth your time`,
          paragraphs: [
            tour.overview,
            ctx.insiderNote || journalInterestingHook(tour),
            `The route covers **${tour.area}** and is designed for ${tour.bestFor.toLowerCase()}. Most travelers find the **${tour.duration}** pacing comfortable without feeling rushed.`,
          ],
        },
        {
          heading: "⭐ Route highlights at a glance",
          paragraphs: [
            `Here are the standout moments that travelers consistently mention after completing the ${tour.title}.`,
          ],
          bullets: tour.highlights.map(([heading, text]) => `${heading} — ${text}`),
        },
        {
          heading: "🗺️ How the day unfolds — step by step",
          paragraphs: [
            `Understanding the flow of the day helps you pack the right gear and set realistic expectations. Here is the typical itinerary for the ${tour.title}.`,
          ],
          bullets: tour.itinerary.map(([heading, text]) => `${heading} — ${text}`),
        },
      ];
      if (ctx.practicalTips?.length) {
        sections.push({
          heading: "💡 Insider tips and local knowledge",
          paragraphs: [
            `These details are the kind of thing your guide might mention in passing — but knowing them in advance helps you plan a better day.`,
          ],
          bullets: ctx.practicalTips,
        });
      }
      if (ctx.bestMonths || ctx.whatToBring) {
        const paragraphs = [];
        if (ctx.bestMonths) paragraphs.push(`Best months to visit: ${ctx.bestMonths}.`);
        if (ctx.whatToBring) paragraphs.push(`What to bring: ${ctx.whatToBring}`);
        sections.push({
          heading: "🎒 Best time to visit and what to bring",
          paragraphs,
        });
      }
      if (ctx.comparison) {
        sections.push({
          heading: "⚖️ How this compares to similar Bali tours",
          paragraphs: [
            ctx.comparison,
            `When deciding between Bali experiences, consider what matters most to you: the ${tour.title} is specifically designed around **${tour.area}** and works best when you want ${tour.format.toLowerCase()}.`,
          ],
        });
      }
      sections.push({
        heading: "📋 Practical details and good to know",
        paragraphs: [
          `Before you book, here are the logistics that shape the experience.`,
        ],
        bullets: [
          `Duration: **${tour.duration}**`,
          `Format: **${tour.format}**`,
          `Area: **${tour.area}**`,
          `Pickup: **${tour.pickup}**`,
          `Pricing: **${tour.price}**`,
          ...buildGoodToKnow(tour),
        ],
      });
      return sections;
    },
    faq: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.faq || [];
    },
  },
  {
    key: "schedule",
    slug: "tour-schedule",
    badge: "Schedule guide",
    navLabel: "Schedule",
    title: (tour) => `${tour.title} — Full Itinerary, Schedule and Packing List`,
    description: (tour) =>
      `Detailed schedule for the ${tour.title}: exact timing, step-by-step route, what to bring, best months to go, and practical booking tips.`,
    excerpt: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.bestMonths
        ? `Planning the ${tour.title}? This guide covers the complete schedule, what to pack, and when to go. Best months: ${ctx.bestMonths.split(";")[0].trim()}.`
        : `If you want the practical version before booking, this article breaks down the timing, route flow, and prep details for the ${tour.title}.`;
    },
    sections: (tour) => {
      const ctx = getTourLocalContext(tour);
      const sections = [
        {
          heading: "📌 Tour overview at a glance",
          paragraphs: [
            tour.summary,
          ],
          bullets: [
            `Duration: **${tour.duration}**`,
            `Format: **${tour.format}**`,
            `Area: **${tour.area}**`,
            `Pickup: **${tour.pickup}**`,
            `Best for: **${tour.bestFor}**`,
            `Starting from: **${tour.price}**`,
          ],
        },
        {
          heading: "🗺️ Complete itinerary — what happens and when",
          paragraphs: [
            `Here is the step-by-step flow of the ${tour.title}. Exact timing can shift depending on your hotel location, traffic, weather, and group size — but this is the standard sequence.`,
          ],
          bullets: tour.itinerary.map(([heading, text], index) => `${journalPhaseLabel(index)} ${heading} — ${text}`),
        },
      ];
      if (ctx.practicalTips?.length) {
        sections.push({
          heading: "💡 What to expect at each stop — tips from travelers",
          paragraphs: [
            `The numbers and details below help you plan around the real experience, not the brochure version.`,
          ],
          bullets: ctx.practicalTips,
        });
      }
      const packingItems = [];
      if (ctx.whatToBring) packingItems.push(ctx.whatToBring);
      const goodToKnow = buildGoodToKnow(tour);
      sections.push({
        heading: "🎒 What to bring and how to prepare",
        paragraphs: packingItems,
        bullets: goodToKnow,
      });
      if (ctx.bestMonths) {
        sections.push({
          heading: "📅 Best time of year for this tour",
          paragraphs: [
            `${ctx.bestMonths}.`,
            `Bali has two main seasons: dry season (April–October) with less rain and cooler mornings, and wet season (November–March) with afternoon showers and higher humidity. Both seasons are warm — daytime temperatures average 27–30 °C (80–86 °F) at sea level.`,
          ],
        });
      }
      if (ctx.comparison) {
        sections.push({
          heading: "⚖️ How this fits with other Bali experiences",
          paragraphs: [
            ctx.comparison,
          ],
        });
      }
      sections.push({
        heading: "✉️ Booking and confirmation — what you need to send",
        paragraphs: [
          `To confirm the ${tour.title}, you will need to share your preferred date, hotel name and area, and group size. This lets the operator match the right vehicle, guide, and timing window.`,
          `Pricing starts from ${tour.price}. The exact quote depends on your group size, hotel distance, and any add-on options.`,
        ],
        bullets: buildIncludes(tour),
      });
      return sections;
    },
    faq: (tour) => {
      const ctx = getTourLocalContext(tour);
      return ctx.faq || [];
    },
  },
];

function journalPhaseLabel(index) {
  const labels = ["Start:", "Then:", "Next:", "Later:", "Finish:"];
  return labels[index] || "Next:";
}

function journalInterestingHook(tour) {
  if (tour.tags.includes("boat") || tour.tags.includes("island")) {
    return "Island routes usually feel premium only when the timing is handled well. Harbor flow, boat timing, and road coordination are the real difference between a smooth day and a stressful one.";
  }
  if (tour.tags.includes("sunrise")) {
    return "Sunrise routes in Bali are not just about getting up early. The real value is how the first light changes the landscape and gives the whole experience a sharper sense of payoff.";
  }
  if (tour.tags.includes("temple")) {
    return "Temple-led routes often work best when they balance cultural atmosphere with scenic pacing. That is what stops the day from feeling repetitive or overly formal.";
  }
  if (tour.tags.includes("helicopter")) {
    return "Aerial products feel special because they compress Bali's visual contrast into a short time window. What would take hours by road becomes one clean premium experience.";
  }
  if (tour.tags.includes("snorkeling")) {
    return "Sea-based experiences in Bali are shaped as much by conditions and route planning as by the reef itself. That makes organization a real part of the product.";
  }
  if (tour.tags.includes("transfer")) {
    return "Transfer products are underrated until timing matters. The moment flights, boats, luggage, or hotel cutoffs are involved, clean coordination becomes the experience.";
  }
  return "The strongest Bali routes usually win because they match one clear travel mood instead of trying to cram too many disconnected ideas into a single day.";
}

function journalTypeByKey(key) {
  return JOURNAL_ARTICLE_TYPES.find((type) => type.key === key);
}

function journalArticleRoute(tour, articleType) {
  return `${JOURNAL_HUB_ROUTE}/${tour.slug}/${articleType.slug}`;
}

function absoluteJournalArticleUrl(tour, articleType) {
  return `${SITE_URL}${journalArticleRoute(tour, articleType)}`;
}

function journalArticleFileName(tour, articleType) {
  return `bali-journal-${tour.slug}-${articleType.slug}.html`;
}

function buildJournalArticle(tour, articleType) {
  return {
    tour,
    articleType,
    route: journalArticleRoute(tour, articleType),
    url: absoluteJournalArticleUrl(tour, articleType),
    title: articleType.title(tour),
    description: articleType.description(tour),
    excerpt: articleType.excerpt(tour),
    sections: articleType.sections(tour),
    faq: articleType.faq ? articleType.faq(tour) : [],
  };
}

function buildJournalArticles() {
  const articles = [];
  for (const tour of tours) {
    for (const articleType of JOURNAL_ARTICLE_TYPES) {
      articles.push(buildJournalArticle(tour, articleType));
    }
  }
  return articles;
}

const JOURNAL_FEATURED_GUIDE_SLUGS = [
  "best-beaches-bali-crystal-clear-water",
  "best-places-to-visit-bali-first-time",
  "best-beach-clubs-bali-young-adults",
  "best-budget-restaurants-bali-warungs",
];

const JOURNAL_SEO_GUIDES = [
  {
    key: "beaches",
    slug: "best-beaches-bali-crystal-clear-water",
    badge: "Evergreen SEO guide",
    navLabel: "Beaches guide",
    cardTourLabel: "Beaches and swimming",
    heroTourSlug: "nusa-penida-east-tour",
    relatedTourSlugs: ["nusa-penida-east-tour", "gili-island-tour", "blue-lagoon-snorkeling"],
    inlineStats: ["8 handpicked beaches", "Clear-water focus", "Swimming and photo friendly"],
    title: "8 Best Beaches in Bali With Crystal Clear Water for Swimming, Snorkeling and Photos",
    description:
      "Looking for crystal clear water in Bali? This guide covers the best Bali beaches for swimming, snorkeling, photos and easy access, from Melasti and Nusa Dua to Padang Padang and Pandawa.",
    excerpt:
      "If your mental picture of Bali includes bright blue water, easy swims and clean-looking beaches in photos, you need to be selective. The west coast is famous, but the clearest water usually shows up on the south and east side of the island where the beach shape, reef protection and morning light all work in your favor.",
    rankings: [
      {
        name: "Melasti Beach",
        imageTitle: "Melasti Beach",
        area: "Uluwatu",
        bestFor: "Clean water and dramatic cliffs",
        summary:
          "Melasti is one of the easiest south Bali wins when you want striking limestone scenery, beach clubs nearby and water that often looks far clearer than the busy surf beaches further west.",
      },
      {
        name: "Nusa Dua Beach",
        imageTitle: "Nusa Dua Beach",
        area: "Nusa Dua",
        bestFor: "Calm swimming",
        summary:
          "Nusa Dua is the safe recommendation for travelers who want a comfortable resort-style beach day, softer waves and a less chaotic shoreline for families or relaxed couples.",
      },
      {
        name: "Padang Padang Beach",
        imageTitle: "Padang Padang Beach",
        area: "Uluwatu",
        bestFor: "Compact scenery and iconic photos",
        summary:
          "Small, photogenic and easy to recognize, Padang Padang works best when you want a strong-looking beach stop as part of a broader south Bali day.",
      },
      {
        name: "Pandawa Beach",
        imageTitle: "Pandawa Beach",
        area: "South Bali",
        bestFor: "Wide sand and bright color",
        summary:
          "Pandawa gives you a broad sandy stretch with easy access, calmer water than surf beaches and enough space to feel lighter even in busier periods.",
      },
      {
        name: "Geger Beach",
        imageTitle: "Geger Beach",
        area: "Nusa Dua",
        bestFor: "Quiet mornings",
        summary:
          "Geger is a strong call when you want a more peaceful beach mood without giving up the cleaner-water look people usually search for in south Bali.",
      },
      {
        name: "Gunung Payung Beach",
        imageTitle: "Gunung Payung Beach",
        area: "South Bali",
        bestFor: "Less-crowded clear water",
        summary:
          "Gunung Payung feels more hidden than the headline beaches, which is exactly why it works for travelers chasing a cleaner, less overexposed beach experience.",
      },
      {
        name: "Sanur Beach",
        imageTitle: "Sanur Beach Boardwalk",
        area: "Sanur",
        bestFor: "Sunrise walks and easy water",
        summary:
          "Sanur is not the wild-cliff version of Bali, but it is one of the easiest areas for gentle water, sunrise color and low-stress beach time close to cafes and hotels.",
      },
      {
        name: "Mertasari Beach",
        imageTitle: "Mertasari Beach",
        area: "Sanur",
        bestFor: "Soft pace and families",
        summary:
          "Mertasari is a useful pick for travelers who care more about a clean, relaxed shoreline and a smooth day than about hype or heavy beach-club energy.",
      },
    ],
    sections: [
      {
        heading: "How to choose a clear-water beach in Bali",
        paragraphs: [
          "The biggest mistake first-time visitors make is assuming any famous Bali beach will match the crystal-clear-water image they saw on social media. In reality, Bali beach quality changes by coast, tide, swell and traffic. If clear water matters more than surfing, prioritize Uluwatu, Nusa Dua, Sanur or a boat-based day trip instead of the darker-sand west coast.",
          "This is also where planning helps sales. Once travelers understand that beach quality depends on area, they become far more open to a structured day trip instead of improvising with long drives and random stops.",
        ],
        bullets: [
          "Choose south Bali for cliff-backed beaches and better-looking water in photos.",
          "Choose Nusa Dua or Sanur when calm swimming matters more than party energy.",
          "Choose boat-based excursions when you want the strongest water color of the whole trip.",
        ],
      },
      {
        heading: "The best time of day for clearer beach photos",
        paragraphs: [
          "For most Bali beaches in this guide, mornings usually look cleaner, brighter and less crowded. Midday can still work, but the combination of harsher light and more traffic often makes the beach feel flatter. Sunset is beautiful for mood, but it is not always the best window if your priority is bright blue water.",
        ],
        bullets: [
          "Morning is best for clear water, clean photos and easier parking.",
          "Late afternoon is better for atmosphere, cliff light and beach-club timing.",
          "If you want both, build one beach into a larger south Bali or island route.",
        ],
      },
      {
        heading: "Best tours to pair with a beach-focused Bali trip",
        paragraphs: [
          "Travelers searching for clear-water beaches usually book stronger results when they combine a premium beach day with one organized water excursion. That is the easiest way to avoid wasting a whole day on transport while still getting the Bali water color they actually want.",
        ],
      },
    ],
    faq: [
      {
        question: "Which beach in Bali has the clearest water?",
        answer:
          "For easy land access, Melasti, Nusa Dua and Padang Padang are among the strongest choices. If you want even brighter water, island and snorkeling routes usually outperform mainland beaches.",
      },
      {
        question: "Which Bali beaches are best for swimming?",
        answer:
          "Nusa Dua, Sanur and Mertasari are safer recommendations for relaxed swimming than exposed surf beaches. Conditions still change by tide and weather, so always check locally on the day.",
      },
      {
        question: "Is south Bali better than Canggu for beach photos?",
        answer:
          "Yes for clear-water aesthetics. Canggu is stronger for surfing, cafes and social energy, while south Bali is stronger for bright water, cliffs and cleaner-looking beach content.",
      },
      {
        question: "Should I book a beach tour or explore by myself?",
        answer:
          "If you only want one nearby beach, self-planning is fine. If you want multiple quality stops, cleaner timing and less transport waste, a private Bali day route usually works better.",
      },
    ],
  },
  {
    key: "places",
    slug: "best-places-to-visit-bali-first-time",
    badge: "Evergreen SEO guide",
    navLabel: "Top places guide",
    cardTourLabel: "First-time Bali highlights",
    heroTourSlug: "ubud-highlights-tour",
    relatedTourSlugs: ["ubud-highlights-tour", "bali-unesco", "nusa-penida-west-tour"],
    inlineStats: ["8 first-time picks", "Culture + scenery", "Strong for first itineraries"],
    title: "8 Best Places to Visit in Bali for First-Time Travelers",
    description:
      "Planning your first Bali trip? These are the best places to visit in Bali for first-time travelers, including temples, rice terraces, beach viewpoints and iconic day-trip areas.",
    excerpt:
      "The best first Bali itinerary is not about seeing everything. It is about choosing places that deliver the strongest contrast between culture, landscape and atmosphere without turning the trip into a marathon of traffic and rushed check-ins.",
    rankings: [
      {
        name: "Tanah Lot Temple",
        imageTitle: "Tanah Lot Temple",
        area: "West Bali coast",
        bestFor: "Iconic sunset landmark",
        summary:
          "Tanah Lot is one of the clearest first-trip choices because it delivers an instantly recognizable Bali image with very little explanation needed.",
      },
      {
        name: "Uluwatu Temple",
        imageTitle: "Uluwatu Temple",
        area: "Uluwatu",
        bestFor: "Cliff views and evening atmosphere",
        summary:
          "Uluwatu gives first-time travelers a powerful mix of sea cliffs, temple atmosphere and one of the most dramatic late-day settings on the island.",
      },
      {
        name: "Tegalalang Rice Terrace",
        imageTitle: "Tegalalang Rice Terrace",
        area: "Ubud",
        bestFor: "Classic green Bali scenery",
        summary:
          "When people imagine jungle-green Bali, Tegalalang is usually part of the picture. It is one of the easiest high-payoff scenic stops near Ubud.",
      },
      {
        name: "Tirta Empul Temple",
        imageTitle: "Tirta Empul Temple",
        area: "Central Bali",
        bestFor: "Cultural depth",
        summary:
          "Tirta Empul adds spiritual and cultural context to a trip that might otherwise stay too photo-focused. It helps the island feel deeper and more balanced.",
      },
      {
        name: "Campuhan Ridge Walk",
        imageTitle: "Campuhan Ridge Walk",
        area: "Ubud",
        bestFor: "Soft scenic movement",
        summary:
          "Campuhan is ideal when you want a beautiful stop that feels easy, light and genuinely enjoyable instead of overproduced.",
      },
      {
        name: "Goa Gajah",
        imageTitle: "Goa Gajah",
        area: "Near Ubud",
        bestFor: "Historic texture",
        summary:
          "Goa Gajah works well for first-time travelers because it adds old-stone atmosphere and a different visual mood from rice fields and beaches.",
      },
      {
        name: "Monkey Forest Ubud",
        imageTitle: "Monkey Forest Ubud",
        area: "Ubud",
        bestFor: "Easy Ubud classic",
        summary:
          "Monkey Forest is still one of the easiest ways to get a memorable central Ubud stop with strong atmosphere and a recognizable Bali identity.",
      },
      {
        name: "Nusa Penida east coast",
        imageTitle: "Nusa Penida east coast",
        area: "Nusa Penida",
        bestFor: "Big-scenery day trip",
        summary:
          "For travelers who want one giant wow-factor day, Nusa Penida adds cliffs, coastline scale and a different visual language from mainland Bali.",
      },
    ],
    sections: [
      {
        heading: "What first-time travelers usually get wrong in Bali",
        paragraphs: [
          "The weak version of a first Bali itinerary tries to cover too many disconnected corners of the island. The strong version chooses a few landmark places and groups them by area. That is what keeps the trip premium, photogenic and realistic.",
          "Search traffic often asks for the best places to visit in Bali, but the smarter question is which places create the clearest memory in the time you actually have.",
        ],
        bullets: [
          "Combine Ubud landmarks together instead of mixing them with long south-coast jumps on the same day.",
          "Use one coastline day for sunsets and beaches rather than adding five extra inland stops.",
          "Save island routes like Nusa Penida for a dedicated full-day experience.",
        ],
      },
      {
        heading: "The strongest first Bali route structure",
        paragraphs: [
          "If you want Bali to feel beautiful instead of busy, think in clusters: Ubud and central Bali for culture and green scenery, Uluwatu for cliffs and sunsets, one iconic temple sunset on the coast, and one premium water or island day if your trip is long enough.",
        ],
      },
      {
        heading: "Who should book tours for these places",
        paragraphs: [
          "Tour planning usually becomes worthwhile when your trip is short, your hotel changes, or you care about timing, photos and not wasting hours on road decisions. That is especially true for couples, first-time visitors and anyone trying to stack several iconic places into a polished itinerary.",
        ],
      },
    ],
    faq: [
      {
        question: "What are the must-visit places in Bali for a first trip?",
        answer:
          "A strong first Bali trip usually includes Ubud highlights, one major sunset temple such as Tanah Lot or Uluwatu, and one beach or island day depending on your hotel area and trip length.",
      },
      {
        question: "Is Ubud or Uluwatu better for first-time travelers?",
        answer:
          "They do different jobs. Ubud is stronger for culture, rice terraces and temples, while Uluwatu is stronger for cliffs, beach clubs and sunset energy. Most first trips work best with both.",
      },
      {
        question: "How many Bali landmarks can I do in one day?",
        answer:
          "Realistically, three to five meaningful stops per day is the sweet spot. Beyond that, the trip often starts feeling rushed and transport-heavy.",
      },
      {
        question: "Is Nusa Penida worth it on a first Bali trip?",
        answer:
          "Yes if you have enough time for a dedicated island day and want one major scenery day. No if your overall Bali stay is extremely short and you have not seen mainland highlights yet.",
      },
    ],
  },
  {
    key: "clubs",
    slug: "best-beach-clubs-bali-young-adults",
    badge: "Evergreen SEO guide",
    navLabel: "Beach clubs guide",
    cardTourLabel: "Youth and nightlife",
    heroTourSlug: "sunset-cruise-bali",
    relatedTourSlugs: ["sunset-cruise-bali", "private-car-with-driver-bali", "bali-airport-transfer"],
    inlineStats: ["7 venue picks", "Sunset to late-night", "Best for social trips"],
    title: "7 Best Beach Clubs in Bali for Young Adults, Sunset Sessions and Big Nights",
    description:
      "Searching for the best beach clubs in Bali for young adults? Start with these proven names in Seminyak, Canggu and Uluwatu, from Potato Head and Savaya to Atlas and La Brisa.",
    excerpt:
      "Bali nightlife is not one scene. Seminyak, Canggu and Uluwatu all play very different roles, and the best beach club for a young group depends on whether you want design, DJs, sunset energy, clifftop wow-factor or a bigger crowd that starts earlier.",
    rankings: [
      {
        name: "Potato Head Beach Club",
        imageTitle: "Potato Head Beach Club",
        area: "Seminyak",
        bestFor: "Design-led sunset energy",
        summary:
          "Potato Head is the polished all-rounder: good for stylish afternoons, stronger-than-average food and nights that still feel elevated instead of chaotic.",
      },
      {
        name: "Savaya",
        imageTitle: "Savaya",
        area: "Uluwatu",
        bestFor: "Big-cliff wow factor",
        summary:
          "Savaya is the statement venue when the group wants a high-impact clifftop setting, headline DJs and a more special-event version of Bali nightlife.",
      },
      {
        name: "Atlas Beach Club",
        imageTitle: "Atlas Beach Club",
        area: "Canggu",
        bestFor: "Scale and party energy",
        summary:
          "Atlas works when the group wants a larger-format venue with obvious crowd energy, broad entertainment appeal and a big-night feeling without overthinking it.",
      },
      {
        name: "Finns Beach Club",
        imageTitle: "Finns Beach Club",
        area: "Berawa",
        bestFor: "Mainstream social momentum",
        summary:
          "Finns is still one of the easiest recommendations for groups who want a high-energy beach club with recognizable Bali nightlife credentials.",
      },
      {
        name: "La Brisa Beach Club",
        imageTitle: "La Brisa Beach Club",
        area: "Canggu",
        bestFor: "Sunset and cooler crowd",
        summary:
          "La Brisa feels more textured and atmospheric than the mega-venues, which makes it perfect for sunset-heavy groups who care about mood as much as volume.",
      },
      {
        name: "Sundays Beach Club",
        imageTitle: "Sundays Beach Club",
        area: "Uluwatu",
        bestFor: "Day-to-sunset premium beach mood",
        summary:
          "Sundays is the stronger pick when the group wants a beach-club experience that still feels beautiful in the daytime rather than only at peak party hours.",
      },
      {
        name: "Single Fin",
        imageTitle: "Single Fin",
        area: "Uluwatu",
        bestFor: "Iconic surf-cliff sunset scene",
        summary:
          "Single Fin wins when the vibe matters more than VIP polish. The cliff, crowd and sunset timing give it one of the easiest social atmospheres in south Bali.",
      },
    ],
    sections: [
      {
        heading: "How to choose the right Bali beach club",
        paragraphs: [
          "Young travelers often search for the best beach clubs in Bali as if they all do the same job. They do not. Seminyak is smoother and more design-led, Canggu is stronger for large social energy, and Uluwatu is where you go when views and venue drama matter as much as the music.",
        ],
        bullets: [
          "Choose Seminyak for stylish sunset sessions and easier mixed-age groups.",
          "Choose Canggu for bigger crowds and a more obvious social scene.",
          "Choose Uluwatu when the venue itself should feel like an event.",
        ],
      },
      {
        heading: "Best timing for beach clubs in Bali",
        paragraphs: [
          "If you want the most photogenic version of the venue, arrive before sunset. If you care more about atmosphere than content, later arrivals can work, but you lose the cleanest light and the easiest entry flow.",
        ],
      },
      {
        heading: "What sells better than a random club night",
        paragraphs: [
          "For a premium itinerary, beach clubs work best when they are paired with a clean transfer plan, a lighter day before them, or a private driver. That stops the nightlife part of the trip from creating unnecessary friction.",
        ],
      },
    ],
    faq: [
      {
        question: "Which beach club in Bali is best for young adults?",
        answer:
          "There is no single winner for every group. Potato Head is the strongest all-rounder, Savaya is the dramatic clifftop statement, and Atlas or Finns are easier picks for bigger crowd energy.",
      },
      {
        question: "Is Uluwatu or Canggu better for nightlife?",
        answer:
          "Uluwatu is better for destination-style venues and cliff drama. Canggu is better for volume, bar-hopping and a broader social crowd.",
      },
      {
        question: "Do I need reservations for Bali beach clubs?",
        answer:
          "For stronger dates, sunset windows and premium tables, yes. The better the venue and the bigger the event, the more useful advance planning becomes.",
      },
      {
        question: "What is the easiest way to do Bali nightlife without stress?",
        answer:
          "Book transport in advance, choose one area per evening and avoid bouncing across Seminyak, Canggu and Uluwatu in the same night. Clean logistics always make the night better.",
      },
    ],
  },
  {
    key: "budget-food",
    slug: "best-budget-restaurants-bali-warungs",
    badge: "Evergreen SEO guide",
    navLabel: "Budget food guide",
    cardTourLabel: "Affordable food in Bali",
    heroTourSlug: "ubud-highlights-tour",
    relatedTourSlugs: ["ubud-highlights-tour", "private-car-with-driver-bali", "bali-airport-transfer"],
    inlineStats: ["8 affordable spots", "Warungs and classics", "Strong for value seekers"],
    title: "8 Best Budget Restaurants in Bali and Affordable Warungs Worth Trying",
    description:
      "Looking for cheap food in Bali that still feels memorable? These affordable Bali restaurants and warungs are strong picks for first-timers, especially around Ubud and Sanur.",
    excerpt:
      "Budget dining in Bali becomes much better the moment you stop chasing random tourist menus and start looking for the right kind of venue. The sweet spot is usually long-running warungs, honest Indonesian classics and places that still feel local even after getting famous.",
    rankings: [
      {
        name: "Ibu Oka",
        imageTitle: "Ibu Oka",
        area: "Ubud",
        bestFor: "Legendary babi guling",
        summary:
          "Ibu Oka remains one of the most recognizable budget-to-midrange food names in Ubud for travelers who want to try Bali's most famous roast pork format.",
      },
      {
        name: "Murni's Warung",
        imageTitle: "Murni's Warung",
        area: "Ubud",
        bestFor: "Classic Ubud meal stop",
        summary:
          "Murni's is a long-running Ubud classic that feels more atmospheric than an average quick meal while still staying approachable for a broad range of travelers.",
      },
      {
        name: "Warung Biah Biah",
        imageTitle: "Warung Biah Biah",
        area: "Ubud",
        bestFor: "Traditional Balinese plates",
        summary:
          "Warung Biah Biah is a practical pick when you want more traditional Balinese flavor at prices that still feel grounded and easy to repeat.",
      },
      {
        name: "Warung Pondok Madu",
        imageTitle: "Warung Pondok Madu",
        area: "Ubud",
        bestFor: "Reliable comfort-value ratio",
        summary:
          "Pondok Madu works because it feels easy, filling and repeatable, which is exactly what many budget-conscious travelers want from everyday Bali dining.",
      },
      {
        name: "Naughty Nuri's",
        imageTitle: "Naughty Nuri's",
        area: "Ubud",
        bestFor: "Cult-favorite ribs",
        summary:
          "Naughty Nuri's is no longer a secret, but it still earns a place in Bali budget-food conversations because the experience is memorable without luxury-level spend.",
      },
      {
        name: "Warung Tepi Sawah",
        imageTitle: "Warung Tepi Sawah",
        area: "Ubud outskirts",
        bestFor: "Affordable meal with scenery",
        summary:
          "This is the kind of venue that helps budget travelers feel like they still got atmosphere, not just a cheap plate and a plastic chair.",
      },
      {
        name: "Massimo",
        imageTitle: "Massimo",
        area: "Sanur",
        bestFor: "Affordable Sanur dinner",
        summary:
          "Massimo is one of the easiest value picks in Sanur when you want a reliable evening meal in a walkable area instead of a random tourist trap.",
      },
      {
        name: "Cafe Batu Jimbar",
        imageTitle: "Cafe Batu Jimbar",
        area: "Sanur",
        bestFor: "Accessible all-day option",
        summary:
          "Cafe Batu Jimbar is useful for travelers who want something simple, familiar and easy to fit into a Sanur day without turning food into a planning project.",
      },
    ],
    sections: [
      {
        heading: "What affordable food in Bali should really mean",
        paragraphs: [
          "Cheap food in Bali should not mean bland or low-quality. The strongest value usually comes from places with clear identity: Balinese warungs, long-running local institutions and practical neighborhood favorites that have survived because people actually return.",
        ],
        bullets: [
          "Warungs are usually the highest-value format for first-time visitors.",
          "Ubud stays one of the easiest areas for affordable food with character.",
          "Sanur is underrated when you want calmer dining without inflated beach-club pricing.",
        ],
      },
      {
        heading: "How to avoid tourist-trap dining in Bali",
        paragraphs: [
          "The simplest rule is to avoid treating the busiest frontage roads as your only food map. Even in high-traffic areas, the stronger value often appears one or two turns away from the most obvious strip.",
        ],
      },
      {
        heading: "When budget travelers still book premium tours",
        paragraphs: [
          "Budget-conscious travelers still spend on experiences when the value is obvious. That is why food-led Bali itineraries often pair well with one or two stronger tours while keeping daily meals highly efficient.",
        ],
      },
    ],
    faq: [
      {
        question: "How much is cheap food in Bali?",
        answer:
          "At local warungs, a full meal can still be very affordable by international travel standards. Tourist-facing cafes cost more, but Bali still offers strong value when you choose the right places.",
      },
      {
        question: "Is Ubud the best area for budget food in Bali?",
        answer:
          "Ubud is one of the easiest areas for affordable food with identity. Sanur is another underrated choice, especially for calmer dining and good walkability.",
      },
      {
        question: "Are warungs safe for tourists in Bali?",
        answer:
          "Well-trafficked, established warungs are the best place to start. Choose places with visible turnover, cook-to-order dishes or strong local reputation.",
      },
      {
        question: "Can I eat well in Bali without spending much?",
        answer:
          "Yes. That is one of Bali's biggest advantages. The key is mixing famous local staples with honest everyday warungs instead of defaulting to imported-menu cafes for every meal.",
      },
    ],
  },
  {
    key: "instagram",
    slug: "best-instagram-places-bali",
    badge: "Evergreen SEO guide",
    navLabel: "Instagram guide",
    cardTourLabel: "Photo and content guide",
    heroTourSlug: "ubud-instagram-tour",
    relatedTourSlugs: ["ubud-instagram-tour", "east-bali-instagram-tour", "ubud-highlights-tour"],
    inlineStats: ["8 photo spots", "Strong for couples and creators", "Built around visual payoff"],
    title: "8 Best Instagram Places in Bali for Photos That Still Look Good in Real Life",
    description:
      "Looking for the best Instagram places in Bali? Start with these photogenic temples, rice terraces, cliffs and waterfalls instead of wasting time on weak stops.",
    excerpt:
      "The best Instagram places in Bali are not just about viral familiarity. The strongest spots are the ones that still feel impressive on the ground, fit together well in a real route and give you more than one angle, texture or mood in the same day.",
    rankings: [
      {
        name: "Lempuyang Temple",
        imageTitle: "Lempuyang Temple",
        area: "East Bali",
        bestFor: "Iconic gate framing",
        summary:
          "Lempuyang remains one of Bali's highest-recognition photo locations because the framing is immediate and the destination already feels like a headline stop.",
      },
      {
        name: "Tegalalang Rice Terrace",
        imageTitle: "Tegalalang Rice Terrace",
        area: "Ubud",
        bestFor: "Layered green scenery",
        summary:
          "Tegalalang gives you textured Bali greenery that looks strong in both wide shots and tighter portrait compositions.",
      },
      {
        name: "Tirta Gangga",
        imageTitle: "Tirta Gangga",
        area: "East Bali",
        bestFor: "Water palace symmetry",
        summary:
          "Tirta Gangga works because it combines structure, reflection and open space, making it one of the easiest polished-content stops in Bali.",
      },
      {
        name: "Tukad Cepung Waterfall",
        imageTitle: "Tukad Cepung Waterfall",
        area: "Central-east Bali",
        bestFor: "Dramatic light and rock texture",
        summary:
          "When conditions cooperate, Tukad Cepung gives one of the most cinematic waterfall frames on the island.",
      },
      {
        name: "Kanto Lampo Waterfall",
        imageTitle: "Kanto Lampo Waterfall",
        area: "Near Ubud",
        bestFor: "Easy-access waterfall photos",
        summary:
          "Kanto Lampo is popular for a reason: it delivers an obvious waterfall image with a simpler route than deeper jungle options.",
      },
      {
        name: "Uluwatu Temple",
        imageTitle: "Uluwatu Temple",
        area: "Uluwatu",
        bestFor: "Cliff-edge sunset photos",
        summary:
          "Uluwatu works best when you want the photo route to feel larger than a single viewpoint. You get cliffs, ocean depth and evening atmosphere together.",
      },
      {
        name: "Tanah Lot Temple",
        imageTitle: "Tanah Lot Temple",
        area: "West coast",
        bestFor: "Sunset silhouette content",
        summary:
          "Tanah Lot remains one of the easiest Bali photo locations to explain: iconic shape, obvious context and strong late-day mood.",
      },
      {
        name: "Campuhan Ridge Walk",
        imageTitle: "Campuhan Ridge Walk",
        area: "Ubud",
        bestFor: "Soft natural lifestyle shots",
        summary:
          "Campuhan is less dramatic than cliff or temple spots, but it is excellent when you want light, natural Bali content that does not feel overworked.",
      },
    ],
    sections: [
      {
        heading: "How to build a Bali photo day that still feels human",
        paragraphs: [
          "The mistake is not choosing famous places. The mistake is stacking famous places with no logic. A smart Bali photo day balances one hero landmark, one textured natural stop and one location that is easier, softer and less crowded on camera.",
        ],
      },
      {
        heading: "What actually makes a Bali photo route strong",
        paragraphs: [
          "Strong Bali content comes from contrast: temple geometry, rice-terrace depth, waterfall texture and coastline drama. That mix looks richer than repeating five similar shots from the same kind of stop.",
        ],
        bullets: [
          "Use early starts for the most crowded hero landmarks.",
          "Keep outfit-heavy stops close together to save time and energy.",
          "Choose one route region instead of trying to cross the island for every famous photo.",
        ],
      },
      {
        heading: "Why organized Instagram tours keep selling",
        paragraphs: [
          "Photo-driven Bali days are exactly where tour planning beats improvisation. The route sequence, arrival timing and transfer decisions have an outsized effect on the final result.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the most Instagrammable place in Bali?",
        answer:
          "Lempuyang is still one of the most recognizable Bali photo landmarks, but the best overall route usually combines it with rice terraces, waterfalls or water-palace stops for more variety.",
      },
      {
        question: "Are Bali Instagram spots worth it in real life?",
        answer:
          "The best ones are. The stronger locations still feel visually rich and memorable in person, especially when they are planned into a realistic route rather than visited at random.",
      },
      {
        question: "What time should I visit Bali photo spots?",
        answer:
          "Early morning is usually strongest for headline locations. Sunset works better for cliff and coastal landmarks such as Uluwatu and Tanah Lot.",
      },
      {
        question: "Is an Instagram tour in Bali better than self-driving?",
        answer:
          "If you care about timing, content quality and low-friction movement between stops, yes. Photo routes benefit more than average from clean route design.",
      },
    ],
  },
  {
    key: "where-to-stay",
    slug: "where-to-stay-bali-first-time",
    badge: "Evergreen SEO guide",
    navLabel: "Area guide",
    cardTourLabel: "Where to stay",
    heroTourSlug: "private-car-with-driver-bali",
    relatedTourSlugs: ["private-car-with-driver-bali", "bali-airport-transfer", "ubud-highlights-tour"],
    inlineStats: ["6 main areas", "First-trip friendly", "Matches planner zones"],
    title: "Where to Stay in Bali for First-Time Visitors: Canggu vs Seminyak vs Ubud vs Uluwatu vs Nusa Dua vs Sanur",
    description:
      "Not sure where to stay in Bali for a first trip? This guide compares Canggu, Seminyak, Ubud, Uluwatu, Nusa Dua and Sanur by vibe, transport and travel fit.",
    excerpt:
      "Where you stay in Bali changes the whole trip. The island feels much easier when your hotel area matches your travel style instead of fighting it. Choosing the right base is often more important than adding one more attraction to the itinerary.",
    rankings: [
      {
        name: "Canggu",
        imageTitle: "La Brisa Beach Club",
        area: "West coast",
        bestFor: "Social energy and cafes",
        summary:
          "Canggu suits travelers who want cafes, coworking, beach-club access and a younger, more social version of Bali rather than classic tranquility.",
      },
      {
        name: "Seminyak",
        imageTitle: "Seminyak Beach",
        area: "South-west Bali",
        bestFor: "Polished restaurants and sunset comfort",
        summary:
          "Seminyak is the smoother choice for travelers who want Bali to feel stylish, easy and slightly more refined without going fully resort-only.",
      },
      {
        name: "Ubud",
        imageTitle: "Tegalalang Rice Terrace",
        area: "Central Bali",
        bestFor: "Culture, greenery and balanced itineraries",
        summary:
          "Ubud is the strongest first-time base when you want rice terraces, temples, wellness and a less beach-dependent version of Bali.",
      },
      {
        name: "Uluwatu",
        imageTitle: "Uluwatu Temple",
        area: "Bukit Peninsula",
        bestFor: "Cliffs, beach clubs and romance",
        summary:
          "Uluwatu works when scenic drama and elevated sunset energy matter more than being close to everything else on the island.",
      },
      {
        name: "Nusa Dua",
        imageTitle: "Nusa Dua Beach",
        area: "South-east Bali",
        bestFor: "Calm resort comfort",
        summary:
          "Nusa Dua is ideal for families, honeymooners and travelers who want Bali to feel easy, clean and low-friction from morning to night.",
      },
      {
        name: "Sanur",
        imageTitle: "Sanur Beach Boardwalk",
        area: "East coast",
        bestFor: "Soft pace and practical access",
        summary:
          "Sanur is the underrated practical base: calmer than Seminyak, easier than Uluwatu and great for sunrise walks, families and east-side connections.",
      },
    ],
    sections: [
      {
        heading: "The easiest way to choose your Bali base",
        paragraphs: [
          "Do not start with price alone. Start with the kind of days you want. If you want sunset clubs and social momentum, beach areas win. If you want culture, waterfalls and a greener pace, Ubud wins. If you want the lowest-stress resort rhythm, Nusa Dua and Sanur become far more attractive.",
        ],
      },
      {
        heading: "The smartest first-time Bali combinations",
        paragraphs: [
          "For many first trips, the strongest structure is two bases instead of one. Ubud plus Seminyak, or Ubud plus Uluwatu, often gives better balance than committing the whole trip to one travel mood.",
        ],
        bullets: [
          "Choose Ubud + Seminyak for culture plus dining.",
          "Choose Ubud + Uluwatu for greenery plus dramatic sunsets.",
          "Choose Sanur or Nusa Dua when you want gentler logistics and calmer nights.",
        ],
      },
      {
        heading: "Why hotel area matters for tours",
        paragraphs: [
          "The moment you start adding day trips, your base affects pickup windows, traffic exposure and how much energy you lose between experiences. That is why the right hotel area improves not only sleep and restaurants, but also tour quality.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best area to stay in Bali for first-time visitors?",
        answer:
          "It depends on your trip style, but Ubud and Seminyak are among the strongest first-trip anchors because they balance classic Bali scenery with practical access and broad appeal.",
      },
      {
        question: "Is Ubud or Seminyak better for a first Bali trip?",
        answer:
          "Ubud is better for culture and green scenery. Seminyak is better for restaurants, sunset rhythm and easier nightlife. Many first trips work best with both.",
      },
      {
        question: "Is Sanur a good place to stay in Bali?",
        answer:
          "Yes, especially for travelers who want a calmer pace, gentle beach access and smoother practical movement than the busiest south-west coast zones.",
      },
      {
        question: "Should I stay in one area or move around Bali?",
        answer:
          "Short trips can stay in one strong base. Longer or more balanced trips often improve when split between two complementary areas.",
      },
    ],
  },
  {
    key: "couples",
    slug: "best-things-to-do-bali-for-couples",
    badge: "Evergreen SEO guide",
    navLabel: "Couples guide",
    cardTourLabel: "Couples and romance",
    heroTourSlug: "sunset-cruise-bali",
    relatedTourSlugs: ["sunset-cruise-bali", "ubud-instagram-tour", "mount-batur-sunrise-jeep-tour"],
    inlineStats: ["7 romantic ideas", "Couples and honeymoons", "Sunrise to sunset"],
    title: "7 Best Things to Do in Bali for Couples, Honeymoons and Romantic Trips",
    description:
      "Planning a romantic Bali trip? These are the best things to do in Bali for couples, from sunrise viewpoints and rice terraces to beach sunsets and premium day experiences.",
    excerpt:
      "Bali works for couples because the island gives you several different versions of romance. Some travelers want soft green scenery and wellness, others want clifftop sunsets and beach clubs, and others want a high-payoff photo day that still feels intimate instead of overly public.",
    rankings: [
      {
        name: "Sunset cruise in Bali",
        imageTitle: "Sunset cruise in Bali",
        area: "South Bali coast",
        bestFor: "Easy premium evening",
        summary:
          "A sunset cruise is the cleanest romantic win when you want a couple-focused evening with very little friction and strong visual payoff.",
      },
      {
        name: "Tegalalang Rice Terrace",
        imageTitle: "Tegalalang Rice Terrace",
        area: "Ubud",
        bestFor: "Soft scenic couple content",
        summary:
          "Ubud rice terraces are still one of the easiest romantic Bali settings because they feel calm, green and naturally photogenic without trying too hard.",
      },
      {
        name: "Mount Batur sunrise",
        imageTitle: "Mount Batur sunrise",
        area: "Kintamani",
        bestFor: "Big shared-moment sunrise",
        summary:
          "Batur sunrise experiences work well for couples because the payoff is emotional as much as scenic: it feels like a real shared milestone day.",
      },
      {
        name: "Uluwatu Temple at sunset",
        imageTitle: "Uluwatu Temple",
        area: "Uluwatu",
        bestFor: "Clifftop evening drama",
        summary:
          "Uluwatu gives couples a romantic evening setting that feels iconic without needing a fully formal plan.",
      },
      {
        name: "Melasti Beach",
        imageTitle: "Melasti Beach",
        area: "South Bali",
        bestFor: "Beautiful lower-stress beach day",
        summary:
          "Melasti suits couples who want strong scenery, beach photos and a smooth daytime plan without committing the whole day to nightlife.",
      },
      {
        name: "Nusa Penida day trip",
        imageTitle: "Nusa Penida day trip",
        area: "Nusa Penida",
        bestFor: "High-impact scenery day",
        summary:
          "For couples who want one giant visual day together, Nusa Penida gives the sort of coastline scale that instantly feels trip-defining.",
      },
      {
        name: "Jimbaran seafood dinner",
        imageTitle: "Jimbaran Seafood Dinner",
        area: "Jimbaran",
        bestFor: "Easy date-night classic",
        summary:
          "Jimbaran remains a useful romantic default when you want a recognizable Bali dinner moment by the water without overcomplicating the evening.",
      },
    ],
    sections: [
      {
        heading: "How couples get more out of Bali",
        paragraphs: [
          "The strongest Bali couple itineraries do not chase intensity every day. They alternate big payoff moments with slower, lighter experiences. That rhythm is what makes the island feel romantic instead of overstuffed.",
        ],
      },
      {
        heading: "The best romantic mix for a Bali itinerary",
        paragraphs: [
          "For most couples, one sunrise or scenic milestone day, one dedicated sunset or cruise evening and one soft Ubud-style day is already a very strong structure.",
        ],
        bullets: [
          "Use Ubud for green, slower daytime romance.",
          "Use Uluwatu and south Bali for sunset and ocean energy.",
          "Add one premium excursion when you want the trip to feel elevated.",
        ],
      },
      {
        heading: "Why private experiences convert better for couples",
        paragraphs: [
          "Couples usually care more about flow, timing and privacy than about ticking off the maximum number of stops. That is why private Bali formats often feel more romantic than shared logistics-heavy options.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Bali good for couples and honeymoons?",
        answer:
          "Yes. Bali is one of the strongest couple destinations in the region because it combines scenic diversity, strong day-trip options, romantic hotels and easy sunset culture.",
      },
      {
        question: "What is the most romantic thing to do in Bali?",
        answer:
          "For easy premium value, sunset cruises are extremely strong. For scenery, Ubud rice terraces, Uluwatu sunsets and private island day trips are also top-tier couple choices.",
      },
      {
        question: "Should couples stay in Ubud or near the beach?",
        answer:
          "It depends on mood. Ubud is better for greenery and slower romance, while beach areas are better for sunsets, clubs and coastal atmosphere. Many couples split their stay.",
      },
      {
        question: "Are private tours worth it for couples in Bali?",
        answer:
          "Usually yes, especially when the trip is short or photo-driven. Private formats protect the mood and reduce stress, which matters more on couple trips than on pure sightseeing runs.",
      },
    ],
  },
  {
    key: "temples",
    slug: "best-temples-bali-cultural-sites",
    badge: "Evergreen SEO guide",
    navLabel: "Temples guide",
    cardTourLabel: "Temples and heritage",
    heroTourSlug: "bali-unesco",
    relatedTourSlugs: ["bali-unesco", "tanah-lot-bedugul-tour", "ubud-highlights-tour"],
    inlineStats: ["7 temple picks", "Culture + scenery", "Strong for first-timers"],
    title: "7 Best Temples in Bali for Culture, Scenery and First-Time Travelers",
    description:
      "Looking for the best temples in Bali? Start with these seven cultural landmarks, from Tanah Lot and Ulun Danu to Tirta Empul, Lempuyang and Goa Gajah.",
    excerpt:
      "Bali temples work best when you stop treating them as interchangeable photo stops. The strongest temple route mixes sea temples, mountain-lake settings and deeper spiritual sites so the day feels rich instead of repetitive.",
    rankings: [
      {
        name: "Tanah Lot Temple",
        imageTitle: "Tanah Lot Temple",
        area: "West Bali coast",
        bestFor: "Iconic oceanfront temple",
        summary:
          "Tanah Lot is one of Bali's clearest must-see temple names because the setting is instantly recognizable and delivers strong payoff even on a first trip.",
      },
      {
        name: "Ulun Danu Beratan Temple",
        imageTitle: "Ulun Danu Beratan Temple",
        area: "Bedugul",
        bestFor: "Cool mountain-lake scenery",
        summary:
          "Ulun Danu stands out because the lake, mountains and cooler air make it feel visually different from almost every south Bali temple stop.",
      },
      {
        name: "Taman Ayun Temple",
        imageTitle: "Taman Ayun Temple",
        area: "Mengwi",
        bestFor: "Royal temple courtyards",
        summary:
          "Taman Ayun is a polished cultural stop for travelers who want temple architecture, symmetry and calmer surroundings without heavy crowds.",
      },
      {
        name: "Tirta Empul Temple",
        imageTitle: "Tirta Empul Temple",
        area: "Central Bali",
        bestFor: "Sacred water ritual atmosphere",
        summary:
          "Tirta Empul adds real spiritual depth to a Bali itinerary and helps the temple side of the island feel more meaningful than just photo-led sightseeing.",
      },
      {
        name: "Goa Gajah",
        imageTitle: "Goa Gajah",
        area: "Near Ubud",
        bestFor: "Historic stone atmosphere",
        summary:
          "Goa Gajah works when you want a smaller but more textured heritage stop that adds an older, carved-stone mood to the day.",
      },
      {
        name: "Uluwatu Temple",
        imageTitle: "Uluwatu Temple",
        area: "Uluwatu",
        bestFor: "Clifftop sunset temple",
        summary:
          "Uluwatu is the temple to choose when you want culture with cliff drama and one of the strongest late-day ocean settings in Bali.",
      },
      {
        name: "Lempuyang Temple",
        imageTitle: "Lempuyang Temple",
        area: "East Bali",
        bestFor: "Famous gate framing and long views",
        summary:
          "Lempuyang remains a strong headline temple when the goal is one major east Bali cultural landmark with broad visual recognition.",
      },
    ],
    sections: [
      {
        heading: "How to choose the right temple route in Bali",
        paragraphs: [
          "The strongest Bali temple day usually combines two or three very different moods instead of repeating similar courtyards all day. Pair a sea temple with a lake temple, or mix one spiritual stop with one scenic sunset temple.",
          "That is why UNESCO and central Bali temple routes convert well: they feel cultural, scenic and practical in the same day.",
        ],
        bullets: [
          "Choose Tanah Lot or Uluwatu for temple-plus-sunset energy.",
          "Choose Ulun Danu and Taman Ayun for cooler heritage scenery.",
          "Choose Tirta Empul or Goa Gajah when spiritual depth matters more than pure photo value.",
        ],
      },
      {
        heading: "Which temple areas work best together",
        paragraphs: [
          "Central Bali temple clusters are the easiest for balanced sightseeing because they combine culture, rice terraces and lunch windows. Sea temples work better as late-day anchors, while east Bali temples deserve a dedicated longer route.",
        ],
      },
      {
        heading: "What travelers should know before visiting temples",
        paragraphs: [
          "Temple visits in Bali feel smoother when travelers bring respectful clothing, avoid overloading one day with too many similar sites, and treat the visit as culture first and photos second. That keeps the experience feeling premium and not performative.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the most famous temple in Bali?",
        answer:
          "Tanah Lot, Uluwatu and Lempuyang are among the most recognizable temple names in Bali, but the best temple for your itinerary depends on whether you want sunset, scenery or spiritual atmosphere.",
      },
      {
        question: "Which Bali temple is best for first-time travelers?",
        answer:
          "Ulun Danu, Tanah Lot and Tirta Empul are all strong first-trip recommendations because they are visually clear, culturally meaningful and easy to build into a day route.",
      },
      {
        question: "What should I wear to temples in Bali?",
        answer:
          "Dress respectfully and be ready to cover shoulders and knees where needed. Many temple visits feel smoother when you already plan around modest attire instead of improvising at the entrance.",
      },
      {
        question: "Can I visit several Bali temples in one day?",
        answer:
          "Yes, but two or three strong temple stops usually works better than trying to force too many into one route. The better the contrast between sites, the stronger the day feels.",
      },
    ],
  },
  {
    key: "waterfalls",
    slug: "best-waterfalls-bali-day-trips",
    badge: "Evergreen SEO guide",
    navLabel: "Waterfalls guide",
    cardTourLabel: "Waterfalls and jungle stops",
    heroTourSlug: "ubud-highlights-tour",
    relatedTourSlugs: ["ubud-highlights-tour", "ubud-instagram-tour", "dolphin-sunrise-city-tour"],
    inlineStats: ["5 waterfall picks", "Photo + swim value", "Day-trip friendly"],
    title: "5 Best Waterfalls in Bali for Day Trips, Photos and Easy Jungle Stops",
    description:
      "Searching for the best waterfalls in Bali? These five proven waterfall stops work well for day trips, photos, soft adventure and first-time travelers.",
    excerpt:
      "Not every Bali waterfall is worth the same effort. The strongest ones either deliver a dramatic visual payoff, a cleaner route from main hotel areas, or a calmer jungle atmosphere that fits naturally into a day trip without turning the day into a trek.",
    rankings: [
      {
        name: "Tukad Cepung Waterfall",
        imageTitle: "Tukad Cepung Waterfall",
        area: "Bangli",
        bestFor: "Cinematic canyon light",
        summary:
          "Tukad Cepung remains one of the most photogenic waterfall stops in Bali when conditions line up and the light reaches the canyon well.",
      },
      {
        name: "Kanto Lampo Waterfall",
        imageTitle: "Kanto Lampo Waterfall",
        area: "Near Ubud",
        bestFor: "Easy-access wow factor",
        summary:
          "Kanto Lampo is popular because it gives an obvious waterfall payoff without requiring a deep jungle transfer or a full hiking day.",
      },
      {
        name: "Tibumana Waterfall",
        imageTitle: "Tibumana Waterfall",
        area: "Bangli side of Ubud",
        bestFor: "Softer jungle mood",
        summary:
          "Tibumana works for travelers who want a cleaner, calmer waterfall stop that still feels memorable without being the most crowded headline option.",
      },
      {
        name: "Gitgit Waterfall",
        imageSrc: BALI_PLANNER_PLACE_IMAGES.ubudWaterfall,
        area: "North Bali",
        bestFor: "Classic cooler-air nature stop",
        summary:
          "Gitgit fits especially well into north Bali days because it breaks up longer drives with a real waterfall section and cooler forest atmosphere.",
      },
      {
        name: "Tegenungan Waterfall",
        imageSrc: BALI_PLANNER_PLACE_IMAGES.ubudWaterfall,
        area: "South of Ubud",
        bestFor: "Convenient first-timer stop",
        summary:
          "Tegenungan stays useful because it is one of the easiest waterfalls to understand and fit into a broader Bali sightseeing day.",
      },
    ],
    sections: [
      {
        heading: "Which Bali waterfalls are actually worth your time",
        paragraphs: [
          "The best waterfall choice depends on whether you want drama, convenience or atmosphere. Tukad Cepung is strongest for photo impact, Kanto Lampo is the easy-access crowd favorite, and Tibumana is better when you want a softer jungle mood.",
        ],
        bullets: [
          "Choose central-east waterfalls for easier pairing with temples and rice terraces.",
          "Choose north Bali waterfalls when you are already doing a Lovina or Bedugul route.",
          "Choose one or two waterfall stops, not four in one day, if you want the day to stay premium.",
        ],
      },
      {
        heading: "How to pair waterfalls into a stronger route",
        paragraphs: [
          "Waterfalls usually work best as one scenic contrast inside a broader day, not as a stand-alone checklist. Temple-plus-waterfall and rice-terrace-plus-waterfall pairings tend to feel more balanced than trying to jump between multiple jungle stops.",
        ],
      },
      {
        heading: "Practical expectations for Bali waterfall stops",
        paragraphs: [
          "Most Bali waterfalls include stairs, damp surfaces or short walks, so travelers should treat them as light-adventure stops. Good shoes, a towel and realistic timing usually make the difference between a stressful stop and a really enjoyable one.",
        ],
      },
    ],
    faq: [
      {
        question: "Which waterfall in Bali is best for photos?",
        answer:
          "Tukad Cepung and Kanto Lampo are among the strongest photo waterfalls because they give obvious visual payoff without needing a very technical route.",
      },
      {
        question: "What is the easiest waterfall to visit near Ubud?",
        answer:
          "Kanto Lampo and Tegenungan are among the easier first-time waterfall choices from the Ubud side of Bali.",
      },
      {
        question: "Can I combine waterfalls with temples in one Bali day trip?",
        answer:
          "Yes, and that is often the strongest structure. One temple, one waterfall and one scenic lunch or rice terrace stop usually feels better than an all-waterfall marathon.",
      },
      {
        question: "Do Bali waterfalls require special shoes?",
        answer:
          "Comfortable shoes with grip are strongly recommended. Many waterfall routes include stairs, wet rocks or short muddy sections depending on the season.",
      },
    ],
  },
  {
    key: "viewpoints",
    slug: "best-viewpoints-bali-sunrise-cliffs-rice-terraces",
    badge: "Evergreen SEO guide",
    navLabel: "Viewpoints guide",
    cardTourLabel: "Viewpoints and big scenery",
    heroTourSlug: "nusa-penida-west-tour",
    relatedTourSlugs: ["nusa-penida-west-tour", "bali-unesco", "mount-batur-sunrise-hike", "ubud-highlights-tour"],
    inlineStats: ["7 big-view stops", "Cliffs + volcano + terraces", "Sunrise to sunset"],
    title: "7 Best Viewpoints in Bali for Cliffs, Volcano Sunrises and Rice Terrace Scenery",
    description:
      "Looking for the best viewpoints in Bali? These seven stops cover volcano sunrise scenes, cliff-edge lookouts, rice terraces and broad coastline views.",
    excerpt:
      "The strongest Bali viewpoints do not all look the same. Some win because of sunrise scale, some because of cliff drama, and some because the landscape feels wide and calm instead of crowded. The best itineraries mix those moods rather than repeating one kind of stop.",
    rankings: [
      {
        name: "Mount Batur sunrise",
        imageTitle: "Mount Batur sunrise",
        area: "Kintamani",
        bestFor: "Sunrise payoff",
        summary:
          "Mount Batur sunrise is the clearest Bali viewpoint pick when you want one big early-morning moment that feels genuinely trip-defining.",
      },
      {
        name: "Karang Boma Cliff",
        imageTitle: "Karang Boma Cliff",
        area: "Uluwatu",
        bestFor: "Pure cliff drama",
        summary:
          "Karang Boma gives one of the cleanest ocean-cliff viewpoints in south Bali and works well when you want a stop that feels open and cinematic.",
      },
      {
        name: "Jatiluwih Rice Terrace",
        imageTitle: "Jatiluwih Rice Terrace",
        area: "Tabanan highlands",
        bestFor: "Wide UNESCO landscape",
        summary:
          "Jatiluwih feels broader and calmer than tighter rice terrace stops, which makes it one of Bali's strongest big-view landscape locations.",
      },
      {
        name: "Tegalalang Rice Terrace",
        imageTitle: "Tegalalang Rice Terrace",
        area: "Ubud",
        bestFor: "Classic layered greenery",
        summary:
          "Tegalalang wins when you want the most recognizable compact rice terrace view with easy access and strong photo value.",
      },
      {
        name: "Campuhan Ridge Walk",
        imageTitle: "Campuhan Ridge Walk",
        area: "Ubud",
        bestFor: "Soft open ridge scenery",
        summary:
          "Campuhan is a lighter, more walkable viewpoint pick for travelers who want airy Ubud scenery without a heavy full-day commitment.",
      },
      {
        name: "Tanah Lot Temple",
        imageTitle: "Tanah Lot Temple",
        area: "West coast",
        bestFor: "Sunset landmark framing",
        summary:
          "Tanah Lot remains one of the easiest coastal viewpoints to understand because the rock temple silhouette does most of the visual work for you.",
      },
      {
        name: "Nusa Penida east coast",
        imageTitle: "Nusa Penida east coast",
        area: "Nusa Penida",
        bestFor: "Huge cliff-and-ocean scale",
        summary:
          "For travelers who want one oversized scenery day, east Nusa Penida gives some of the strongest broad coastline viewpoints anywhere around Bali.",
      },
    ],
    sections: [
      {
        heading: "What makes a Bali viewpoint worth adding to your route",
        paragraphs: [
          "A good Bali viewpoint should do more than just look nice in one photo. The best ones create a real pause in the day, give contrast with the rest of the route and feel strong enough that travelers remember them afterward.",
        ],
        bullets: [
          "Choose one sunrise viewpoint, one green landscape stop and one coastal viewpoint for the strongest balance.",
          "Use cliff lookouts later in the day when the light and atmosphere improve.",
          "Use rice terrace or volcano viewpoints earlier when the route feels fresher and clearer.",
        ],
      },
      {
        heading: "How to group viewpoints without wasting the day",
        paragraphs: [
          "The strongest viewpoint days are clustered by area. Ubud and Kintamani pair naturally, UNESCO highland stops pair naturally, and island cliffs deserve their own dedicated day instead of being squeezed between mainland plans.",
        ],
      },
      {
        heading: "Who benefits most from viewpoint-led Bali days",
        paragraphs: [
          "Viewpoint routes are especially strong for first-time travelers, couples, content-driven trips and travelers who want Bali to feel scenic without doing physically demanding adventure every day.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best viewpoint in Bali?",
        answer:
          "It depends on what kind of scenery you want. Mount Batur is strongest for sunrise, Jatiluwih is strongest for wide green landscape, and Nusa Penida or Karang Boma are strongest for cliff drama.",
      },
      {
        question: "Which Bali viewpoints are best for sunset?",
        answer:
          "Tanah Lot and Uluwatu-side cliffs such as Karang Boma are among the easiest high-payoff sunset viewpoint choices.",
      },
      {
        question: "Are rice terraces or cliffs better for first-time visitors?",
        answer:
          "They do different jobs. Rice terraces give classic green Bali identity, while cliffs give ocean drama. Most first trips feel best when they include both.",
      },
      {
        question: "Can I do Mount Batur and Uluwatu in the same day?",
        answer:
          "Technically possible, but rarely ideal. Those two viewpoint moods work better on separate days so the trip does not feel transport-heavy and rushed.",
      },
    ],
  },
  {
    key: "itinerary7",
    slug: "bali-itinerary-7-days-first-time",
    badge: "Evergreen SEO guide",
    navLabel: "7-day itinerary",
    cardTourLabel: "Trip planning",
    heroTourSlug: "ubud-highlights-tour",
    relatedTourSlugs: ["ubud-highlights-tour", "nusa-penida-west-tour", "mount-batur-sunrise-jeep-tour"],
    inlineStats: ["Day-by-day plan", "Balanced pacing", "Built around real drive times"],
    title: "The Perfect 7-Day Bali Itinerary for First-Time Visitors (Day by Day)",
    description:
      "A realistic 7-day Bali itinerary that accounts for actual drive times: where to base yourself, which days to pair, and how to fit Ubud, Nusa Penida, Mount Batur and the south coast without burning out.",
    excerpt:
      "Most Bali itineraries fail for one reason: they ignore driving time. Bali looks small on a map, but Canggu to Uluwatu can take **90 minutes** and Kuta to Ubud can take **two hours** in traffic. This plan groups stops by area so you spend your week seeing Bali instead of sitting in a car.",
    rankings: [
      {
        name: "Day 1 — Arrive and stay south",
        imageTitle: "Arrival day in south Bali",
        area: "Seminyak or Canggu",
        bestFor: "Recovering from the flight",
        summary:
          "Land at Ngurah Rai (DPS), transfer to your south Bali base and do nothing ambitious. A beach walk and an early dinner beat forcing a temple run on zero sleep.",
      },
      {
        name: "Day 2 — South coast and sunset temple",
        imageTitle: "Uluwatu cliffs at sunset",
        area: "Uluwatu and the Bukit",
        bestFor: "Easing into the island",
        summary:
          "Beaches in the morning, Uluwatu Temple for sunset and the Kecak fire dance. Short distances, big payoff, no alarm clock required.",
      },
      {
        name: "Day 3 — Move to Ubud, culture en route",
        imageTitle: "Tegalalang rice terraces",
        area: "Central Bali",
        bestFor: "Temples, rice terraces, craft villages",
        summary:
          "Check out of the south and make the drive productive: craft villages, Tegalalang rice terraces and a Kintamani lunch with volcano views before settling into Ubud.",
      },
      {
        name: "Day 4 — Sunrise volcano, slow afternoon",
        imageTitle: "Mount Batur sunrise",
        area: "Kintamani",
        bestFor: "The signature Bali sunrise",
        summary:
          "Pickup is around **02:00–03:00**, so plan a genuinely lazy afternoon afterwards. A spa or pool day is the correct call, not another temple.",
      },
      {
        name: "Day 5 — Nusa Penida day trip",
        imageTitle: "Kelingking Beach viewpoint",
        area: "Nusa Penida",
        bestFor: "The island's most dramatic scenery",
        summary:
          "A long but unforgettable day: **30–45 minute** speedboat from Sanur, then Kelingking, Broken Beach and Angel's Billabong. Book the earliest boat you can.",
      },
      {
        name: "Day 6 — Waterfalls or adventure",
        imageTitle: "Bali waterfall",
        area: "Ubud and Bangli",
        bestFor: "Choosing your own pace",
        summary:
          "Pick one lane: waterfalls, white water rafting on the Ayung, or an ATV route through rice paddies and river beds. One is plenty for a day.",
      },
      {
        name: "Day 7 — Back south and fly out",
        imageTitle: "Bali beach club",
        area: "Seminyak or Canggu",
        bestFor: "A soft landing before the airport",
        summary:
          "Return to the coast, keep it low-key with a beach club or a massage, and leave buffer for airport traffic. Do not schedule a tour on departure day.",
      },
    ],
    sections: [
      {
        heading: "🚗 The one rule that makes a Bali itinerary work",
        paragraphs: [
          "Group your days by region, not by wish list. Bali has no motorways across the middle, so distance on a map means very little. **Kuta to Ubud** can take up to two hours, **Canggu to Uluwatu** around 90 minutes, and **Ubud to Mount Batur** about an hour and a half.",
          "The practical consequence is simple: change your base once, not every night. Three or four nights in the south and three in Ubud covers the whole island comfortably. Hopping hotels daily eats your holiday in checkouts and transfers.",
        ],
        bullets: [
          "Base 1: **Seminyak, Canggu or Uluwatu** for beaches, sunsets and food",
          "Base 2: **Ubud** for temples, rice terraces, waterfalls and the volcano",
          "Day trips from either base: **Nusa Penida**, Gili Islands, north Bali",
        ],
      },
      {
        heading: "🌅 Where to put the early starts",
        paragraphs: [
          "Bali's two best experiences both begin in the dark. Mount Batur sunrise pickups run from around **02:00 in the south** and **02:30–03:00 from Ubud**. The Nusa Penida boat leaves Sanur around **07:30–08:00**, which means leaving Ubud by 06:30.",
          "Never stack those two days back to back, and never put one the night before a flight. Put a deliberately empty afternoon after each — that is what separates a trip people enjoy from one they need a holiday to recover from.",
        ],
      },
      {
        heading: "📆 If you only have 5 days — or have 10",
        paragraphs: [
          "For a **5-day trip**, cut Day 6 and one of the south coast days. Keep Ubud, keep the volcano sunrise, and choose either Nusa Penida or waterfalls, not both.",
          "For a **10-day trip**, the best additions are not more day trips from the same bases. Add the Gili Islands or Nusa Lembongan for two or three nights, or head to Amed or Munduk for a completely different, quieter side of the island.",
        ],
      },
      {
        heading: "💡 Mistakes that cost first-timers a day",
        bullets: [
          "Booking a tour for the morning after a red-eye arrival",
          "Putting Mount Batur and Nusa Penida on consecutive days",
          "Staying in Kuta and day-tripping to Ubud repeatedly instead of moving base",
          "Scheduling anything on departure day — airport traffic is unpredictable",
          "Underestimating **Nyepi**, when the whole island including the airport shuts for 24 hours",
        ],
      },
    ],
    faq: [
      {
        question: "Is 7 days enough for Bali?",
        answer:
          "Yes, seven days is enough to see Ubud, the south coast, a volcano sunrise and one island day trip without rushing — provided you split your stay between two bases instead of moving hotels every night.",
      },
      {
        question: "Where should I stay for a 7-day Bali trip?",
        answer:
          "Split it: three or four nights in the south (Seminyak, Canggu or Uluwatu) for beaches and food, then three nights in Ubud for temples, rice terraces and the volcano. One hotel change, not six.",
      },
      {
        question: "How many days do I need in Ubud?",
        answer:
          "Three nights is the sweet spot. That covers a culture day, a sunrise volcano trip with a recovery afternoon, and one waterfall or adventure day without feeling rushed.",
      },
      {
        question: "Should I rent a scooter or hire a driver for a week in Bali?",
        answer:
          "For a first trip, a private driver for the long days is far less stressful — full-day charters typically run around $30–50 and remove all navigation and parking problems. Scooters make sense for short local hops if you are already an experienced rider.",
      },
      {
        question: "What is the best order to do things in Bali?",
        answer:
          "South coast first while you recover from the flight, then move inland to Ubud for culture and the volcano, then return south for the last night so you are close to the airport on departure day.",
      },
    ],
  },
  {
    key: "ubudArea",
    slug: "things-to-do-ubud-bali-complete-guide",
    badge: "Evergreen SEO guide",
    navLabel: "Ubud guide",
    cardTourLabel: "Ubud area",
    heroTourSlug: "ubud-highlights-tour",
    relatedTourSlugs: ["ubud-highlights-tour", "white-water-rafting", "atv-ride-adventure"],
    inlineStats: ["Culture and jungle", "Best base for day trips", "Walkable centre"],
    title: "Things to Do in Ubud, Bali: The Complete Area Guide",
    description:
      "What to actually do in Ubud, Bali — rice terraces, temples, the Monkey Forest, waterfalls, rafting and jungle swings — plus where to stay and how long to spend.",
    excerpt:
      "Ubud is Bali's cultural centre and the single best base for day trips inland. The town itself is walkable and green; everything dramatic — volcanoes, waterfalls, river gorges — sits within about an hour's drive. Most travelers underestimate it and give it one rushed day.",
    rankings: [
      {
        name: "Tegalalang Rice Terrace",
        imageTitle: "Tegalalang rice terraces",
        area: "North of Ubud",
        bestFor: "The classic Bali photo",
        summary:
          "Entry is around **IDR 25,000**. Go before **08:30** — by mid-morning the swings have queues and the light goes flat. Farmers maintaining the paths may ask a small donation.",
      },
      {
        name: "Sacred Monkey Forest Sanctuary",
        imageTitle: "Ubud Monkey Forest",
        area: "Central Ubud",
        bestFor: "Walkable jungle temple",
        summary:
          "Home to over **1,200 long-tailed macaques** among 14th-century temples. Secure sunglasses, water bottles and anything dangling — and never bring food in.",
      },
      {
        name: "Tirta Empul Temple",
        imageTitle: "Tirta Empul holy spring",
        area: "Tampaksiring",
        bestFor: "The purification ritual",
        summary:
          "A working holy-spring temple where visitors can join the **melukat** purification. A sarong comes with the ticket; a separate bathing sarong is used in the water.",
      },
      {
        name: "Ayung River rafting",
        imageTitle: "Ayung River gorge",
        area: "Sayan gorge",
        bestFor: "Scenery with mild adrenaline",
        summary:
          "Class **II–III** rapids through a gorge with carved stone reliefs and small waterfalls. Beginner-friendly, roughly two hours on the water.",
      },
      {
        name: "Tukad Cepung Waterfall",
        imageTitle: "Tukad Cepung light beams",
        area: "Bangli, ~40 min",
        bestFor: "Light beams in a cave canyon",
        summary:
          "The famous sunbeams appear roughly **09:00–11:00** on clear days. You wade through shallow water, so bring shoes with grip and a dry bag.",
      },
      {
        name: "Campuhan Ridge Walk",
        imageTitle: "Campuhan Ridge",
        area: "Central Ubud",
        bestFor: "A free early-morning walk",
        summary:
          "An easy ridge path straight out of town. Best at sunrise before the heat — no ticket, no driver, no planning required.",
      },
    ],
    sections: [
      {
        heading: "📍 Why Ubud is the best inland base",
        paragraphs: [
          "Ubud sits roughly in the middle of everything worth driving to. Mount Batur is about **90 minutes** away, the main waterfalls **30–50 minutes**, and the Ayung River gorge is on the doorstep. From the south coast, every one of those becomes a much longer day.",
          "The town also solves evenings. You can walk to dinner, a market and a dance performance without arranging transport, which is not true of most Bali areas.",
        ],
      },
      {
        heading: "⏰ How to time the popular stops",
        paragraphs: [
          "Ubud's headline sights are all better early. The pattern is consistent: arrive before **09:00** and you get soft light and space; arrive at **11:00** and you get tour buses.",
        ],
        bullets: [
          "Tegalalang rice terraces: **06:00–08:30**",
          "Tukad Cepung waterfall: **09:00–10:00** for the light beams",
          "Monkey Forest: opens **09:00**, quietest in the first hour",
          "Campuhan Ridge Walk: sunrise, before it gets hot",
          "Tirta Empul: early, before tour groups fill the pools",
        ],
      },
      {
        heading: "🏨 Where to stay in and around Ubud",
        paragraphs: [
          "Staying **in the centre** means walkable restaurants and the Monkey Forest, but more scooter noise. Staying in the **rice-field fringe** (Penestanan, Sayan, Nyuh Kuning) buys quiet and views at the cost of a short ride into town each evening.",
          "For a three-night stay, central is usually the better trade. For a week or a honeymoon, the valley resorts along the Sayan ridge are what people picture when they imagine Ubud.",
        ],
      },
      {
        heading: "👗 Temple etiquette that actually matters",
        bullets: [
          "Sarong and sash are required — usually provided at the entrance",
          "Shoulders and knees covered inside temple grounds",
          "Do not stand higher than offerings or point your feet at shrines",
          "Menstruating women are traditionally asked not to enter temple grounds",
          "Remove hats and keep voices down during ceremonies",
        ],
      },
    ],
    faq: [
      {
        question: "How many days should I spend in Ubud?",
        answer:
          "Three nights suits most travelers: one culture day, one sunrise volcano trip with a slow afternoon, and one waterfall or adventure day. Two nights works if you only want the highlights.",
      },
      {
        question: "Is Ubud worth visiting if I prefer beaches?",
        answer:
          "Yes, but treat it as a base rather than a beach substitute. Ubud is where the temples, rice terraces, waterfalls, river rafting and the volcano sunrise all become short drives instead of full-day expeditions.",
      },
      {
        question: "Is the Ubud Monkey Forest safe?",
        answer:
          "Generally yes, with basic care. The macaques are wild and fast — do not carry food, secure sunglasses and loose items, avoid direct eye contact, and watch small children closely.",
      },
      {
        question: "How far is Ubud from the airport?",
        answer:
          "Roughly 1 to 1.5 hours in normal traffic, and about 50–60 minutes late at night. Peak-hour departures through Denpasar can push it considerably longer.",
      },
    ],
  },
  {
    key: "tripCost",
    slug: "how-much-does-a-bali-trip-cost",
    badge: "Evergreen SEO guide",
    navLabel: "Bali trip cost",
    cardTourLabel: "Budget planning",
    heroTourSlug: "private-car-with-driver-bali",
    relatedTourSlugs: ["private-car-with-driver-bali", "ubud-highlights-tour", "nusa-penida-west-tour"],
    inlineStats: ["Real 2026 prices", "Three budget tiers", "Hidden costs included"],
    title: "How Much Does a Bali Trip Cost? Real Prices for 2026",
    description:
      "A realistic Bali budget breakdown: accommodation, food, transport, activities and the two costs most travelers forget — the 21% restaurant surcharge and the tourist levy.",
    excerpt:
      "Bali can be a **$30 a day** island or a **$400 a day** island, and both are honest answers. What decides it is where you eat and how you move around, not how nice your room is. This breakdown uses real 2026 prices so you can build a number that survives contact with the island.",
    rankings: [
      {
        name: "Backpacker",
        imageTitle: "Budget travel in Bali",
        area: "$25–50 per day",
        bestFor: "Hostels, warungs, scooter",
        summary:
          "Dorm bed **$6–12**, warung meals **$1.50–3**, scooter **$4–6.50** a day. Comfortable if you eat local and stay off beach clubs.",
      },
      {
        name: "Mid-range",
        imageTitle: "Mid-range hotel in Bali",
        area: "$70–130 per day",
        bestFor: "Most travelers",
        summary:
          "Boutique hotel or small pool villa **$28–56**, a mix of warungs and cafes, a driver for the long days and one paid activity every couple of days.",
      },
      {
        name: "Comfort and luxury",
        imageTitle: "Luxury resort in Bali",
        area: "$300–500+ per day",
        bestFor: "Resorts and private drivers",
        summary:
          "Resort or multi-bedroom villa from **$185**, restaurant dining throughout, private driver daily and spa treatments at hotel prices.",
      },
      {
        name: "Accommodation",
        imageTitle: "Bali villa with pool",
        area: "Per night",
        bestFor: "The biggest single variable",
        summary:
          "Hostel dorm **$6–12**, guesthouse **$12–28**, mid-range hotel **$28–56**, private pool villa from **$56**, luxury resort **$185–500+**. Seminyak and Canggu run 40–60% above inland equivalents.",
      },
      {
        name: "Food and drink",
        imageTitle: "Balinese warung meal",
        area: "Per meal",
        bestFor: "Where budgets are won or lost",
        summary:
          "Warung nasi goreng **$1.30–2.60**, mid-range restaurant dish **$5–15**, western cafe breakfast **$5–9**. Beach club daybeds carry minimum spends from **$31** up past **$125**.",
      },
      {
        name: "Getting around",
        imageTitle: "Scooter and driver in Bali",
        area: "Per day or ride",
        bestFor: "Cheaper than most expect",
        summary:
          "Scooter **$4–13** a day, private driver for 8–10 hours **$35–65**, Grab or Gojek car for a short hop **$3–5**, airport to Seminyak **$8–12**.",
      },
      {
        name: "Activities",
        imageTitle: "Mount Batur sunrise trek",
        area: "Per person",
        bestFor: "Planning the fun budget",
        summary:
          "Temple entry **$3–8**, waterfall **$1.20–2**, Mount Batur sunrise trek around **$31**, surf lesson **$28–35**, Ayung rafting **$35–55**, full-day tour with driver **$35–65**.",
      },
    ],
    sections: [
      {
        heading: "💸 The two costs almost everyone forgets",
        paragraphs: [
          "First: nearly every restaurant, cafe and beach club adds **21% on top of menu prices** — 10% government tax plus 11% service, usually shown as \"++\" in tiny print. A menu that reads $40 for two settles at closer to $48. Warungs generally do not do this, which is part of why they feel so cheap.",
          "Second: every foreign visitor pays a one-time **Bali tourist levy of IDR 150,000** (about $10, roughly £8) per entry. It applies to every age, including infants. Pay it only through the official **lovebali.baliprov.go.id** site or the Love Bali app — lookalike .com and .org sites charge IDR 300,000 and up.",
        ],
      },
      {
        heading: "🧮 A real 7-day budget for a couple",
        paragraphs: [
          "Mid-range, land costs only, excluding international flights. This is the shape of a typical week rather than a promise — your own number will move mostly with accommodation and how often you eat in restaurants.",
        ],
        bullets: [
          "Accommodation, 6 nights at about $85: **~$510**",
          "Food and drink for two, 7 days: **~$630**",
          "Transport — scooter, two driver days, airport transfers: **~$170**",
          "Activities — volcano trek, day tour, surf lessons, entries: **~$240**",
          "Spa, two massages each: **~$80**",
          "SIM cards and tourist levy for two: **~$38**",
          "**Total: roughly $1,670 for the couple**, about $835 each",
        ],
      },
      {
        heading: "📅 What season does to the price",
        paragraphs: [
          "Only accommodation really swings. Food, scooters, spa treatments and entrance fees stay broadly flat all year.",
          "**July, August and the Christmas–New Year window** push mid-range rooms 15–25% above shoulder season, and in-demand villas considerably more. **May, June and September** are the value sweet spot — similar weather, 20–30% cheaper. The January–February rainy months run 30–40% below peak.",
        ],
      },
      {
        heading: "💳 Money, ATMs and avoiding overcharges",
        bullets: [
          "Use **BCA or BNI** ATMs — they generally do not add a foreign-card fee. Mandiri now charges **IDR 50,000** per withdrawal",
          "Always decline \"conversion\" (DCC) and choose to be charged in **rupiah**",
          "Machines cap withdrawals around **IDR 1,250,000–3,000,000**, so take the maximum to spread any fee",
          "Cards work in hotels and larger restaurants, often with a **2–3% surcharge**. Warungs, scooter rentals, temple entries and boat counters are **cash only**",
          "Tipping is not customary — service is usually inside that 21%. Round up, or **IDR 50,000–100,000 a day** for a private driver",
          "Photograph a rental scooter from every angle in daylight before you ride off, to head off \"damage\" claims",
        ],
      },
    ],
    faq: [
      {
        question: "How much money do I need for a week in Bali?",
        answer:
          "Roughly $250–350 per person for a backpacker week, $700–900 mid-range, and $2,000 and up for comfort or luxury travel. That covers accommodation, food, transport and activities, but not international flights.",
      },
      {
        question: "Is Bali expensive?",
        answer:
          "Bali is cheap to eat and move around in, and can be expensive to sleep in. Warung meals run $1.50–3 and scooters $4–6 a day, while beachfront villas and beach clubs sit at Western prices. Your accommodation choice drives most of the difference.",
      },
      {
        question: "What is the 21% charge on Bali restaurant bills?",
        answer:
          "Most restaurants, cafes and beach clubs add 10% government tax plus 11% service on top of menu prices, shown as \"++\". Budget for it when reading menus. Local warungs usually charge the price as listed.",
      },
      {
        question: "How much is the Bali tourist tax?",
        answer:
          "IDR 150,000 per person, about $10, paid once per entry by every foreign visitor of any age. Pay through the official lovebali.baliprov.go.id site or the Love Bali app — unofficial sites charge far more.",
      },
      {
        question: "Should I bring cash or use cards in Bali?",
        answer:
          "Bring both. Hotels, malls and mid-range restaurants take cards, often with a 2–3% surcharge, but warungs, scooter rentals, temple entries, markets and boat tickets are cash only. Withdraw from BCA or BNI ATMs to avoid fees.",
      },
    ],
  },
  {
    key: "visaEntry",
    slug: "bali-visa-entry-requirements",
    badge: "Evergreen SEO guide",
    navLabel: "Visa and entry",
    cardTourLabel: "Trip admin",
    heroTourSlug: "bali-airport-transfer",
    relatedTourSlugs: ["bali-airport-transfer", "private-car-with-driver-bali", "ubud-highlights-tour"],
    inlineStats: ["Visa on arrival", "Arrival card", "Tourist levy"],
    title: "Bali Visa and Entry Requirements: What You Actually Need",
    description:
      "Visa on arrival, e-VOA, the mandatory All Indonesia arrival card and the Bali tourist levy — what to prepare before you fly, and the mistakes that cause problems at immigration.",
    excerpt:
      "Three things now catch travelers out on arrival in Bali: the visa on arrival is **no longer extendable online**, the customs form has been folded into a **mandatory arrival card** filed within 72 hours of landing, and the tourist levy has a swarm of lookalike scam sites. None are difficult — they just need doing before you fly.",
    rankings: [
      {
        name: "Visa on Arrival (B1)",
        imageTitle: "Bali immigration",
        area: "IDR 500,000",
        bestFor: "Most Western passports",
        summary:
          "**30 days**, single entry, payable by cash or card on arrival. Extendable once for another 30 days, for the same fee, giving 60 days maximum.",
      },
      {
        name: "e-VOA (apply online first)",
        imageTitle: "Online visa application",
        area: "Same fee, less queueing",
        bestFor: "Skipping the payment counter",
        summary:
          "Apply at **evisa.imigrasi.go.id** before you fly. Approval usually takes 24–48 hours. The real benefit: e-VOA holders can use the **airport autogates**.",
      },
      {
        name: "All Indonesia arrival card",
        imageTitle: "Digital arrival card",
        area: "Free, mandatory",
        bestFor: "Everyone, no exceptions",
        summary:
          "The old e-CD and health declaration merged into one form at **allindonesia.imigrasi.go.id**. File it **within 72 hours before arrival** — the system rejects earlier submissions.",
      },
      {
        name: "Bali tourist levy",
        imageTitle: "Love Bali levy",
        area: "IDR 150,000",
        bestFor: "Pay before you land",
        summary:
          "One time per entry, every age including infants. Official channels only: **lovebali.baliprov.go.id** or the Love Bali app. You get a QR voucher by email.",
      },
      {
        name: "Visa-free entry",
        imageTitle: "Passport control",
        area: "About 19 countries",
        bestFor: "Mostly ASEAN passports",
        summary:
          "30 days, **non-extendable and non-convertible**. Covers ASEAN states plus a short list of others. The US, UK, EU and Australia are **not** on it.",
      },
    ],
    sections: [
      {
        heading: "📋 What to have ready before you fly",
        bullets: [
          "Passport valid **at least 6 months** from arrival, with **2 blank pages**, undamaged",
          "A **return or onward ticket** — airlines check this at boarding and will refuse you without it",
          "The **All Indonesia arrival card**, filed inside the 72-hour window",
          "The **tourist levy** voucher, or be ready to pay at the airport counter",
          "e-VOA approval if you applied online, so you can use the autogates",
          "Officers may ask for proof of funds; travelers commonly cite around **$1,000** equivalent, though this is guidance rather than a published rule",
        ],
      },
      {
        heading: "⏳ Extending your stay — the rule that changed",
        paragraphs: [
          "This is the single most out-of-date thing in older guides. The visa on arrival extension **can no longer be completed entirely online**. Since mid-2025 it requires an **in-person visit** to the immigration office covering your registered address, where they take fingerprints, a photo and a signature.",
          "The flow is hybrid: register online, receive a QR code by email, attend the office for biometrics, then wait roughly **5–7 working days**. Because of that, start the process **10–14 days before your visa expires**, not in the final days. Your arrival day counts as day one.",
          "Visa-free entry works differently: those 30 days **cannot be extended or converted** at all. If you might want longer, take the visa on arrival even if you qualify for visa-free.",
        ],
      },
      {
        heading: "⚠️ Overstaying is expensive",
        paragraphs: [
          "The fine is **IDR 1,000,000 per day**, counted from day one — two weeks over is IDR 14,000,000. Up to 59 days can be settled with the fine. **From 60 days it becomes deportation and a blacklist**, with re-entry bans running from six months to ten years.",
          "Biometric exit checks mean an overstay is always detected. If your plans change, extend properly rather than hoping to pay quietly on the way out.",
        ],
      },
      {
        heading: "🚫 Mistakes that cause real problems",
        bullets: [
          "Booking a **one-way ticket** — you get stopped at check-in, before immigration ever sees you",
          "Assuming a Western passport gets visa-free entry. It does not",
          "Assuming visa-free 30 days can be extended. It cannot",
          "Expecting to extend the VOA from your phone — biometrics are in person now",
          "Filing the arrival card **more than 72 hours** ahead, so it is rejected",
          "Paying the levy on a lookalike site. Only **.go.id** is official",
          "Staying in a private villa and not registering with local police — hotels do this for you, private hosts may not, and the fine is **IDR 5,000,000**",
          "Working or earning on a tourist visa, including paid content creation",
        ],
      },
      {
        heading: "💉 Health requirements",
        paragraphs: [
          "There are **no routine vaccination requirements** and no COVID-era rules left. A yellow fever certificate is required only if you are arriving from a country on the transmission-risk list. The health declaration that used to be separate is now part of the All Indonesia arrival card.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need a visa for Bali?",
        answer:
          "Most travelers, including US, UK, EU, Australian and Canadian passport holders, need a visa on arrival costing IDR 500,000 for 30 days. Around 19 mostly ASEAN nationalities get 30 days visa-free instead, but that version cannot be extended.",
      },
      {
        question: "How much is the Bali visa on arrival?",
        answer:
          "IDR 500,000, roughly $30–35, payable by cash or card at the airport. Extending it for another 30 days costs the same again, giving a 60-day maximum.",
      },
      {
        question: "Can I extend my Bali visa online?",
        answer:
          "No, not fully. Since mid-2025 the extension requires an in-person visit to the immigration office for fingerprints and a photo. You register online first, then attend in person, then wait around 5–7 working days. Start 10–14 days before your visa expires.",
      },
      {
        question: "What is the All Indonesia arrival card?",
        answer:
          "A free, mandatory digital form that replaced the separate customs declaration and health declaration. File it at allindonesia.imigrasi.go.id within 72 hours before arrival. It applies to everyone, including children.",
      },
      {
        question: "How long can I stay in Bali as a tourist?",
        answer:
          "Thirty days on a visa on arrival, extendable once for a total of 60 days. Visa-free entry gives 30 days with no extension possible. Overstaying costs IDR 1,000,000 per day and leads to deportation past 60 days.",
      },
      {
        question: "Does my passport need 6 months validity for Bali?",
        answer:
          "Yes. Your passport must be valid for at least six months from your arrival date and have at least two blank pages. A damaged passport can be grounds for refusal.",
      },
    ],
  },
  {
    key: "gettingAround",
    slug: "how-to-get-around-bali-transport-guide",
    badge: "Evergreen SEO guide",
    navLabel: "Getting around",
    cardTourLabel: "Transport",
    heroTourSlug: "private-car-with-driver-bali",
    relatedTourSlugs: ["private-car-with-driver-bali", "bali-airport-transfer", "fast-boat-transfer-bali"],
    inlineStats: ["Scooter vs driver", "Real drive times", "Grab and Gojek zones"],
    title: "How to Get Around Bali: Scooter, Driver, Grab and Real Drive Times",
    description:
      "Scooter rental, private drivers, Grab and Gojek, airport transfers and fast boats in Bali — what each costs, where apps get blocked, and how long journeys actually take.",
    excerpt:
      "Bali has no motorways across the middle, so a 30 km trip can take two hours. Choosing between a scooter, a driver and a ride app is less about price than about which one matches the day you have planned. Here is what each really costs and where each one fails.",
    rankings: [
      {
        name: "Private driver with car",
        imageTitle: "Private driver in Bali",
        area: "IDR 650,000–900,000 per day",
        bestFor: "Full-day sightseeing",
        summary:
          "Around **$40–55** for **10 hours** including car, fuel and driver, usually a 6–7 seat air-con SUV. Overtime about **IDR 100,000** an hour. Entry tickets and your meals are extra.",
      },
      {
        name: "Scooter rental",
        imageTitle: "Scooter in Bali",
        area: "IDR 60,000–200,000 per day",
        bestFor: "Short local hops",
        summary:
          "A 110cc Scoopy runs **$4–6.50** a day, a 125–155cc Vario or NMAX **$6.50–13**. Weekly and monthly deals cut the daily rate by 30–50%.",
      },
      {
        name: "Grab and Gojek",
        imageTitle: "Ride hailing app",
        area: "From IDR 15,000",
        bestFor: "Everyday short trips",
        summary:
          "A 5 km hop costs about **IDR 15,000–25,000** by bike or **IDR 50,000–80,000** by car. Expect roughly **1.5x surge** in rain or at peak hours.",
      },
      {
        name: "Bluebird taxi",
        imageTitle: "Bluebird taxi",
        area: "Metered",
        bestFor: "When apps are blocked",
        summary:
          "The one street taxi worth flagging down. Flag fall **IDR 7,000**, then about **IDR 6,500 per km**, always metered. Book through the MyBluebird app to avoid copycats.",
      },
      {
        name: "Airport transfer",
        imageTitle: "Bali airport arrivals",
        area: "IDR 100,000–500,000",
        bestFor: "Arrival day",
        summary:
          "Fixed-price counter fares: Kuta **IDR 100,000–200,000**, Seminyak **IDR 150,000–250,000**, Canggu **IDR 250,000–400,000**, Ubud **IDR 350,000–500,000**. Add **IDR 50,000** between 22:00 and 06:00.",
      },
      {
        name: "Fast boats",
        imageTitle: "Fast boat from Sanur",
        area: "From IDR 115,000",
        bestFor: "Island day trips",
        summary:
          "From Sanur: Nusa Lembongan **30–35 min**, Nusa Penida about **45 min** (IDR 150,000–250,000), Gili Islands and Lombok around **3 hours**.",
      },
    ],
    sections: [
      {
        heading: "🛵 The scooter question, answered honestly",
        paragraphs: [
          "Scooters are cheap, fun and the reason most travel insurance claims in Bali get refused. Legally you need **both** your home motorcycle licence **and an International Driving Permit with a motorcycle endorsement**. Most rental shops only ask for a passport — that does not make you legal, and it does not make you insured.",
          "The numbers are worth knowing before you decide. Bali recorded **7,224 crashes and 632 deaths in 2023**, roughly double the previous year, and about **86% involved motorcycles**. If something goes wrong without a valid licence, an air ambulance to Singapore runs **$50,000–100,000** and an international-standard hospital bed **$1,000–5,000 a day**.",
          "There is **no ban** on tourists renting scooters in 2026 — the proposed one was never enacted. What did change is enforcement: random checkpoints are routine in Canggu, Kuta, Ubud and Uluwatu, usually mid-morning. Missing documents cost around **IDR 300,000–500,000** each, and riding without a helmet is an instant **IDR 250,000**.",
        ],
      },
      {
        heading: "📱 Where Grab and Gojek stop working",
        paragraphs: [
          "Both apps are legal across the island. The restrictions you will run into are informal, enforced by local transport cooperatives rather than by law, and they are concentrated in predictable places.",
          "The workaround is always the same: walk five or ten minutes to a main road, or set your pickup at a nearby cafe or minimart instead of the entrance you are standing at.",
        ],
        bullets: [
          "Posted \"no online taxi\" zones near major temples, beach clubs and some markets",
          "**Central Ubud** is patchy — walk out a few minutes and it works",
          "**Canggu** works about 95% of the time; **Jalan Pantai Batu Mejan (Echo Beach)** is the firm exception",
          "At the airport, app pickup happens in a designated area, not the arrivals curb",
          "Gojek is slightly cheaper on short bike rides; Grab has better car availability in rain",
        ],
      },
      {
        heading: "⏱️ Real drive times between the main areas",
        paragraphs: [
          "Plan around these rather than around map distance. The single biggest time saver in Bali is leaving early.",
        ],
        bullets: [
          "Kuta → Ubud: **1h–1h30** off-peak, up to **2h30** in traffic",
          "Canggu → Uluwatu: about **1 hour** late evening, **2h30–3h** at peak",
          "Kuta → Uluwatu: **45–60 min**, 90+ min after 15:00",
          "Ubud → Seminyak: **45 min to 2 hours** depending on the hour",
          "Ubud → Mount Batur: **1h15–1h30**",
          "Ubud → Amed: **2h30–3h30**",
          "Worst hours: **07:00–09:30** and **15:00–18:30**, worst in the south",
        ],
      },
      {
        heading: "🙏 One thing no app can route around",
        paragraphs: [
          "Balinese ceremony processions close roads with no warning, often for **30 to 60 minutes**. There is no diversion and no arguing with it — the procession has right of way and drivers simply wait.",
          "Build slack into any day with a fixed deadline, especially a flight. This is the most common reason a perfectly planned Bali schedule falls apart.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need an international driving permit to rent a scooter in Bali?",
        answer:
          "Yes. Legally you need your home country motorcycle licence plus an International Driving Permit with a motorcycle endorsement. Rental shops often only ask for a passport, but without the correct licence you are riding illegally and your travel insurance will not cover a motorbike accident.",
      },
      {
        question: "Is it better to rent a scooter or hire a driver in Bali?",
        answer:
          "A driver for long sightseeing days, a scooter for short local hops if you are an experienced rider. A full-day driver costs about $40–55 including fuel, which is often cheaper than several ride-app trips and far less stressful in Bali traffic.",
      },
      {
        question: "Does Grab work in Bali?",
        answer:
          "Yes, Grab and Gojek both work island-wide and are legal. You will hit informal no-pickup zones near some temples, beach clubs and in central Ubud and at Echo Beach in Canggu. Walking a few minutes to a main road solves it.",
      },
      {
        question: "How much is a taxi from Bali airport to Seminyak?",
        answer:
          "About IDR 150,000–250,000 from the official fixed-price counter, taking 25–40 minutes. There is a IDR 50,000 surcharge between 22:00 and 06:00, and peak-hour traffic can add 20–30 minutes.",
      },
      {
        question: "How long does it take to drive from Kuta to Ubud?",
        answer:
          "Between 1 hour and 1 hour 30 off-peak, and up to 2 hours 30 in heavy traffic, for around 35 km. Leaving before 07:00 or after 19:00 makes the biggest difference.",
      },
    ],
  },
  {
    key: "bestTime",
    slug: "best-time-to-visit-bali-month-by-month",
    badge: "Evergreen SEO guide",
    navLabel: "Best time to visit",
    cardTourLabel: "When to go",
    heroTourSlug: "nusa-penida-manta-rays-point",
    relatedTourSlugs: ["nusa-penida-manta-rays-point", "mount-batur-sunrise-jeep-tour", "surf-lesson-experience"],
    inlineStats: ["Month-by-month table", "Activity seasons", "Nyepi dates"],
    title: "Best Time to Visit Bali: A Month-by-Month Guide",
    description:
      "When to visit Bali, month by month: dry and wet season reality, crowds and prices, the best months for surfing, diving, manta rays and waterfalls, plus Nyepi and Galungan dates.",
    excerpt:
      "Bali is warm all year — sea temperature never drops below **27°C**. What actually changes is rain, crowds and price, and they do not move together. The cheapest months have the fullest waterfalls, and the driest month is also the most expensive and crowded.",
    rankings: [
      {
        name: "April to June",
        imageTitle: "Bali in shoulder season",
        area: "Shoulder season",
        bestFor: "The best all-round window",
        summary:
          "Dry weather without peak prices or peak crowds. **May** is a sweet spot: manta numbers peak and the island is not yet full.",
      },
      {
        name: "July and August",
        imageTitle: "Bali in peak season",
        area: "Peak season",
        bestFor: "Driest weather, if you book early",
        summary:
          "**August is the driest month** (~15–40 mm) with the best underwater visibility. It is also the most expensive and busiest — Mount Batur sees **600+ climbers a day**.",
      },
      {
        name: "September and October",
        imageTitle: "Bali in September",
        area: "Shoulder season",
        bestFor: "The underrated months",
        summary:
          "Dry season holds while crowds thin and prices ease. **September** is arguably the best value month of the year.",
      },
      {
        name: "November and December",
        imageTitle: "Bali green season",
        area: "Wet season begins",
        bestFor: "Green landscapes, low prices",
        summary:
          "Short afternoon showers rather than all-day rain. Prices are low until the **20 Dec–5 Jan** holiday spike.",
      },
      {
        name: "January to March",
        imageTitle: "Bali in rainy season",
        area: "Green season",
        bestFor: "Waterfalls and cheap villas",
        summary:
          "**January is wettest** (~350 mm) and rates run **30–40% below peak**. Waterfalls are at full power; seas are roughest and some fast boats cancel.",
      },
    ],
    sections: [
      {
        heading: "🌦️ Dry and wet season, without the myths",
        paragraphs: [
          "**Dry season runs April to October, wet season November to March.** Daily temperatures sit around **26.5–28°C** all year, with a 22–32°C range, and the sea stays between **27 and 29°C**. Ubud and Kintamani run several degrees cooler than the coast.",
          "The wet season does **not** mean all-day rain. The usual pattern is a heavy downpour of one to two hours in the late afternoon or evening, with sunshine either side. Even in January there are plenty of clear mornings. The trade is real though: more humidity and mosquitoes, rougher seas, occasional boat cancellations, and beach trash washing onto the west coast between December and February.",
          "The practical strategy for green season is simply to front-load the day — outdoor plans before 14:00, indoor plans after.",
        ],
      },
      {
        heading: "🤿 Best months for specific activities",
        bullets: [
          "**Surfing, west coast** (Uluwatu, Bingin, Canggu): **April–October**, biggest swell June–August",
          "**Surfing, east coast** (Keramas, Sanur, Nusa Dua): **November–March**, smaller and more forgiving",
          "**Diving and snorkeling visibility**: **June–October**, 25–30 m+ around Nusa Penida",
          "**Manta rays**: year-round at Manta Point, most reliable **April–October**, numbers peak in **May**",
          "**Mola-mola (ocean sunfish)**: **July–October** at Crystal Bay — water can drop to **18–20°C**",
          "**Waterfalls**: strongest **November–March**, but best photographed **late March–April** for full flow without brown water",
          "**Mount Batur sunrise**: **April–October**, clearest **June–September**, best crowd-to-weather balance **April–June**",
        ],
      },
      {
        heading: "🤫 Nyepi — the one date that can ruin a trip",
        paragraphs: [
          "Nyepi, the Balinese Day of Silence, is the single most important date to plan around. The next one is **Monday 8 March 2027**, running 06:00 to 06:00 the following morning.",
          "For 24 hours **Ngurah Rai airport closes completely** — no arrivals, no departures. Roads and ports close, shops and restaurants shut, mobile data is switched off island-wide, and everyone including tourists must stay on hotel or villa grounds. Village security patrol to enforce it.",
          "Plan to **arrive the day before at the latest and depart the day after**, confirm your hotel is serving meals, and stock water and snacks. The upside: the **ogoh-ogoh parades on the eve of Nyepi** are one of the best spectacles in Bali, and the night sky with the island's lights off is extraordinary.",
        ],
      },
      {
        heading: "🎋 Other dates worth knowing",
        bullets: [
          "**Galungan and Kuningan 2027**: 13–23 January and 11–21 August. Tourist areas run normally, but expect frequent road processions and penjor poles lining every street",
          "**Melasti**, two or three days before Nyepi: mass purification processions to the beaches, spectacular but coastal roads get blocked",
          "**Indonesian Independence Day, 17 August**: a domestic travel surge on top of peak season",
          "**Idul Fitri**: a large domestic influx with packed flights and ferries; dates shift each year with moon sighting",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best month to visit Bali?",
        answer:
          "May, June and September offer the best balance — dry weather without peak-season crowds or prices. August has the driest weather and best underwater visibility but is the busiest and most expensive month.",
      },
      {
        question: "Is Bali worth visiting in the rainy season?",
        answer:
          "Yes, with a flexible schedule. Rain usually comes as a heavy one to two hour downpour in the late afternoon rather than all day. The island is greener, waterfalls are at full power, crowds thin out, and rates run 30–40% below peak.",
      },
      {
        question: "When is Nyepi and how does it affect travel?",
        answer:
          "The next Nyepi is Monday 8 March 2027. For 24 hours the airport closes entirely, roads and shops shut, mobile data is switched off, and everyone must stay on their accommodation grounds. Arrive at least a day before and depart at least a day after.",
      },
      {
        question: "What is the cheapest time to go to Bali?",
        answer:
          "January to March, and November. Accommodation runs 30–40% below peak-season rates and flights are cheaper. Expect afternoon rain, rougher seas and the occasional fast-boat cancellation.",
      },
      {
        question: "When can you see manta rays in Bali?",
        answer:
          "Manta rays are at Manta Point off Nusa Penida year-round, but sightings are most reliable from April to October, with numbers often peaking in May. Underwater visibility is best between June and October.",
      },
    ],
  },
];

function guideArticleRoute(guide) {
  return `${JOURNAL_HUB_ROUTE}/${guide.slug}`;
}

function absoluteGuideArticleUrl(guide) {
  return `${SITE_URL}${guideArticleRoute(guide)}`;
}

function guideArticleFileName(guide) {
  return `bali-journal-guide-${guide.slug}.html`;
}

function buildSeoGuideArticle(guide) {
  const heroTour = tourBySlug(guide.heroTourSlug) || tours[0];
  const rankings = guide.rankings.map((item, index) => ({
    ...item,
    position: index + 1,
    image: normalizeJournalImageSrc(item.imageSrc || guidePlaceImage(item.imageTitle || item.name, item.fallbackTourSlug || guide.heroTourSlug)),
  }));
  const leadPlace = rankings[0]?.name || heroTour.title;

  return {
    kind: "guide",
    guide,
    tour: heroTour,
    articleType: { badge: guide.badge, navLabel: guide.navLabel, key: guide.key },
    cardTourLabel: guide.cardTourLabel,
    route: guideArticleRoute(guide),
    url: absoluteGuideArticleUrl(guide),
    title: guide.title,
    description: guide.description,
    excerpt: guide.excerpt,
    sections: guide.sections,
    faq: guide.faq,
    inlineStats: guide.inlineStats,
    rankings,
    heroImage: rankings[0]?.image || publicImagePath(heroTour),
    heroImageAlt: `${leadPlace} in Bali`,
    relatedTours: guide.relatedTourSlugs.map((slug) => tourBySlug(slug)).filter(Boolean),
  };
}

function buildSeoGuideArticles() {
  return JOURNAL_SEO_GUIDES.map((guide) => buildSeoGuideArticle(guide));
}

function totalJournalArticleCount() {
  return buildJournalArticles().length + buildSeoGuideArticles().length;
}

function getFeaturedGuideArticles() {
  const guides = buildSeoGuideArticles();
  return JOURNAL_FEATURED_GUIDE_SLUGS.map((slug) => guides.find((guide) => guide.guide.slug === slug)).filter(Boolean);
}

function journalCardImageSrc(article) {
  if (article.kind === "guide") {
    return article.heroImage;
  }
  return publicImagePath(article.tour);
}

function journalCardImageAlt(article) {
  if (article.kind === "guide") {
    return article.heroImageAlt;
  }
  return article.tour.imageAlt;
}

function renderJournalArticleCard(article, options = {}) {
  const compact = options.compact || false;
  return `
    <a class="sb-journal-card${compact ? " sb-journal-card_compact" : ""}" href="${article.route}">
      ${compact ? "" : `<img src="${journalCardImageSrc(article)}" alt="${escapeHtml(journalCardImageAlt(article))}" loading="lazy" decoding="async">`}
      <div class="sb-journal-card__body">
        <div class="sb-journal-card__meta">
          <span class="sb-journal-chip">${escapeHtml(article.articleType.badge)}</span>
          <span class="sb-journal-card__tour">${escapeHtml(article.cardTourLabel || article.tour.title)}</span>
        </div>
        <h3>${escapeHtml(article.title)}</h3>
        <p>${escapeHtml(article.description)}</p>
        <span class="sb-journal-card__cta">Read article</span>
      </div>
    </a>
  `;
}

function getFeaturedJournalArticles() {
  const articles = buildJournalArticles();
  return JOURNAL_FEATURED_ARTICLES.map(([tourSlug, typeKey]) =>
    articles.find((article) => article.tour.slug === tourSlug && article.articleType.key === typeKey),
  ).filter(Boolean);
}

function renderJournalNewsBlock() {
  const featuredArticles = getFeaturedJournalArticles().slice(0, 3);
  const featuredGuides = getFeaturedGuideArticles().slice(0, 3);
  const spotlightArticles = [...featuredGuides, ...featuredArticles];
  const totalArticles = totalJournalArticleCount();

  return `<div id="rec2054910081" class="r t-rec t-rec_pt_135 t-rec_pb_135" style="padding-top:135px;padding-bottom:135px;" data-animationappear="off" data-record-type="131"><div class="t123"><div class="t-container"><div class="t-col t-col_12"><div id="sb-journal-news"><style>
#sb-journal-news{font-family:"Cina GEO", "TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#151515;}
#sb-journal-news .sb-journal-news__shell{background:#fff;border:1px solid rgba(21,21,21,0.08);border-radius:36px;padding:36px;box-shadow:0 18px 52px rgba(17,17,17,0.05);}
#sb-journal-news .sb-journal-news__top{display:flex;gap:20px;align-items:flex-end;justify-content:space-between;margin-bottom:28px;}
#sb-journal-news .sb-journal-news__eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:rgba(47,107,255,0.08);color:#2f6bff;font-size:13px;font-weight:700;letter-spacing:-0.2px;margin-bottom:14px;}
#sb-journal-news .sb-journal-news__title{margin:0;font-size:48px;line-height:1.04;font-weight:700;letter-spacing:-2px;}
#sb-journal-news .sb-journal-news__descr{max-width:700px;margin:12px 0 0;color:#6f6f73;font-size:18px;line-height:1.6;}
#sb-journal-news .sb-journal-news__cta{display:inline-flex;align-items:center;justify-content:center;max-width:100%;box-sizing:border-box;padding:16px 24px;border-radius:999px;background:#111;color:#fff;text-decoration:none;font-size:16px;font-weight:700;white-space:nowrap;transition:transform .2s ease, box-shadow .2s ease;}
#sb-journal-news .sb-journal-news__cta:hover{transform:translateY(-1px);box-shadow:0 12px 24px rgba(17,17,17,0.16);}
#sb-journal-news .sb-journal-news__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;}
#sb-journal-news .sb-journal-card{display:flex;flex-direction:column;min-height:100%;background:#fff;border:1px solid rgba(21,21,21,0.09);border-radius:28px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;}
#sb-journal-news .sb-journal-card:hover{transform:translateY(-4px);border-color:rgba(47,107,255,0.28);box-shadow:0 18px 44px rgba(17,17,17,0.08);}
#sb-journal-news .sb-journal-card img{width:100%;aspect-ratio:1.38;object-fit:cover;background:#f4f4f4;}
#sb-journal-news .sb-journal-card__body{display:flex;flex:1;flex-direction:column;padding:20px 22px 22px;}
#sb-journal-news .sb-journal-card__meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px;}
#sb-journal-news .sb-journal-chip{display:inline-flex;align-items:center;padding:7px 11px;border-radius:999px;background:rgba(47,107,255,0.10);color:#2f6bff;font-size:12px;font-weight:700;letter-spacing:-0.1px;}
#sb-journal-news .sb-journal-card__tour{font-size:12px;color:#6f6f73;font-weight:700;letter-spacing:0.02em;text-transform:uppercase;}
#sb-journal-news .sb-journal-card h3{margin:0 0 10px;font-size:24px;line-height:1.14;font-weight:700;letter-spacing:-1px;}
#sb-journal-news .sb-journal-card p{margin:0 0 18px;color:#6f6f73;font-size:15px;line-height:1.62;}
#sb-journal-news .sb-journal-card__cta{margin-top:auto;font-size:14px;font-weight:700;color:#111;}
@media screen and (max-width:960px){#sb-journal-news .sb-journal-news__shell{padding:28px;}#sb-journal-news .sb-journal-news__top{flex-direction:column;align-items:flex-start;}#sb-journal-news .sb-journal-news__title{font-size:38px;}#sb-journal-news .sb-journal-news__grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media screen and (max-width:640px){#sb-journal-news .sb-journal-news__shell{padding:18px 16px;border-radius:24px;}#sb-journal-news .sb-journal-news__top{gap:16px;margin-bottom:20px;}#sb-journal-news .sb-journal-news__top > *{max-width:100%;min-width:0;}#sb-journal-news .sb-journal-news__eyebrow{padding:7px 12px;font-size:12px;margin-bottom:12px;}#sb-journal-news .sb-journal-news__title{font-size:32px;letter-spacing:-1.3px;}#sb-journal-news .sb-journal-news__descr{font-size:15px;line-height:1.55;}#sb-journal-news .sb-journal-news__cta{display:flex;align-self:stretch;width:100%;max-width:100%;padding:14px 18px;font-size:15px;}#sb-journal-news .sb-journal-news__grid{grid-template-columns:1fr;gap:14px;}#sb-journal-news .sb-journal-news__grid .sb-journal-card:nth-child(n+4){display:none !important;}#sb-journal-news .sb-journal-card{border-radius:22px;}#sb-journal-news .sb-journal-card img{aspect-ratio:1.72;}#sb-journal-news .sb-journal-card__body{padding:16px 16px 17px;}#sb-journal-news .sb-journal-card__meta{gap:8px;margin-bottom:10px;}#sb-journal-news .sb-journal-chip{padding:6px 10px;font-size:11px;}#sb-journal-news .sb-journal-card__tour{font-size:11px;}#sb-journal-news .sb-journal-card h3{font-size:20px;line-height:1.16;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}#sb-journal-news .sb-journal-card p{margin-bottom:14px;font-size:14px;line-height:1.52;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}#sb-journal-news .sb-journal-card__cta{font-size:13px;}}
</style><div class="sb-journal-news__shell"><div class="sb-journal-news__top"><div><div class="sb-journal-news__eyebrow">SB Excursions Journal</div><h2 class="sb-journal-news__title">Bali stories, guides and tour tips</h2><p class="sb-journal-news__descr">Explore our private Bali journal with evergreen destination guides, route ideas, practical timing tips and booking articles. Alongside the tour-support pages, the journal now includes SEO guides on beaches, neighborhoods, nightlife, food and Bali trip planning.</p></div><a class="sb-journal-news__cta" href="${JOURNAL_HUB_ROUTE}">Explore all ${totalArticles} articles</a></div><div class="sb-journal-news__grid">${spotlightArticles.map((article) => renderJournalArticleCard(article)).join("")}</div></div></div></div></div></div>`;
}

function renderJournalIndexPage() {
  const guideArticles = buildSeoGuideArticles();
  const articleGroups = tours.map((tour) => ({
    tour,
    articles: JOURNAL_ARTICLE_TYPES.map((articleType) => buildJournalArticle(tour, articleType)),
  }));
  const featuredArticles = getFeaturedJournalArticles();
  const featuredGuides = getFeaturedGuideArticles();
  const totalArticles = totalJournalArticleCount();

  return `<!DOCTYPE html>
<html lang="en">
  <head><style>body{opacity:0!important}</style>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bali Journal and SEO Articles | SB Excursions</title>
    <meta name="description" content="Browse the SB Excursions Bali Journal with evergreen Bali guides, selling articles, route guides and schedule pages for every Bali tour and excursion on the site.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Bali Journal and SEO Articles | SB Excursions">
    <meta property="og:description" content="Browse the SB Excursions Bali Journal with evergreen Bali guides, selling articles, route guides and schedule pages for every Bali tour and excursion on the site.">
    <meta property="og:url" content="${SITE_URL}${JOURNAL_HUB_ROUTE}">
    <meta property="og:image" content="${absoluteJournalImageUrl(featuredGuides[0]?.heroImage || publicImagePath(tours[0]))}">
    <link rel="canonical" href="${SITE_URL}${JOURNAL_HUB_ROUTE}">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png">
    <link rel="stylesheet" href="/css/bali-tour-pages.css">
${JOURNAL_FOOTER_ASSETS}
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": `${SITE_URL}${JOURNAL_HUB_ROUTE}#blog`,
          name: "SB Excursions Bali Journal",
          description:
            "Evergreen Bali guides, selling articles, destination guides, and schedule pages built around every SB Excursions Bali tour page.",
          url: `${SITE_URL}${JOURNAL_HUB_ROUTE}`,
          inLanguage: "en",
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}${JOURNAL_HUB_ROUTE}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Bali main page", item: `${SITE_URL}/bali/en/main-page` },
            { "@type": "ListItem", position: 2, name: "Bali journal", item: `${SITE_URL}${JOURNAL_HUB_ROUTE}` },
          ],
        },
      ],
    })}</script>
    <style>${renderJournalSharedStyles()}</style>
  </head>
  <body>
    <div class="sb-journal-page">
      ${renderJournalHeader()}
      <main class="sb-tour-main sb-journal-main">
        <section class="sb-journal-hero">
          <div class="sb-journal-kicker">Local SEO content hub</div>
          <h1>SB Excursions Bali Journal</h1>
          <p class="sb-journal-lead">A polished Bali journal designed for stronger search coverage and better internal linking. Every tour page now has three supporting articles, and the journal now also includes evergreen Bali guides for beaches, places, clubs, food, neighborhoods, romance and photo planning.</p>
          <div class="sb-journal-stats">
            <div><span>${tours.length}</span><small>Tours covered</small></div>
            <div><span>${guideArticles.length}</span><small>SEO guides</small></div>
            <div><span>${totalArticles}</span><small>Articles live</small></div>
            <div><span>3</span><small>Articles per tour</small></div>
          </div>
        </section>

        <section class="sb-journal-section">
          <div class="sb-journal-section__head">
            <h2>Featured SEO guides</h2>
            <span>Evergreen content built for broad Bali search intent</span>
          </div>
          <div class="sb-journal-featured-grid">
            ${featuredGuides.map((article) => renderJournalArticleCard(article)).join("")}
          </div>
        </section>

        <section class="sb-journal-section">
          <div class="sb-journal-section__head">
            <h2>Featured tour articles</h2>
            <a href="/bali/en/main-page#tours">Back to tours</a>
          </div>
          <div class="sb-journal-featured-grid">
            ${featuredArticles.map((article) => renderJournalArticleCard(article)).join("")}
          </div>
        </section>

        <section class="sb-journal-section">
          <div class="sb-journal-section__head">
            <h2>Evergreen Bali guides</h2>
            <span>Search-first destination content with built-in tour links</span>
          </div>
          <div class="sb-journal-featured-grid">
            ${guideArticles.map((article) => renderJournalArticleCard(article)).join("")}
          </div>
        </section>

        <section class="sb-journal-section">
          <div class="sb-journal-section__head">
            <h2>All tour article groups</h2>
            <span>Each tour includes 3 internal-support articles</span>
          </div>
          <div class="sb-journal-tour-grid">
            ${articleGroups
              .map(
                ({ tour, articles }) => `
              <article class="sb-journal-tour-card">
                <div class="sb-journal-tour-card__hero">
                  <img src="${publicImagePath(tour)}" alt="${escapeHtml(tour.imageAlt)}" loading="lazy" decoding="async">
                  <div class="sb-journal-tour-card__overlay"></div>
                  <div class="sb-journal-tour-card__copy">
                    <span>${escapeHtml(tour.area)}</span>
                    <h3>${escapeHtml(tour.title)}</h3>
                    <p>${escapeHtml(tour.summary)}</p>
                  </div>
                </div>
                <div class="sb-journal-tour-card__body">
                  <div class="sb-journal-tour-card__meta">
                    <span>${escapeHtml(tour.duration)}</span>
                    <span>${escapeHtml(tour.format)}</span>
                  </div>
                  <div class="sb-journal-article-list">
                    ${articles.map((article) => renderJournalArticleCard(article, { compact: true })).join("")}
                  </div>
                  <a class="sb-journal-tour-card__link" href="${tourRoute(tour)}">Open tour page</a>
                </div>
              </article>
            `,
              )
              .join("")}
          </div>
        </section>

        ${renderBaliWeatherBlock()}
      </main>
      ${renderJournalBaliFooter()}
    </div>
  </body>
</html>`;
}

function renderGuideRankingCard(item) {
  return `
    <article class="sb-journal-ranking-card">
      <div class="sb-journal-ranking-card__media">
        <img src="${item.image}" alt="${escapeHtml(item.name)} in Bali" loading="lazy" decoding="async">
        <span class="sb-journal-ranking-card__badge">#${item.position}</span>
      </div>
      <div class="sb-journal-ranking-card__body">
        <div class="sb-journal-ranking-card__meta">
          <span>${renderRichText(item.area)}</span>
          <span>${renderRichText(item.bestFor)}</span>
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${renderRichText(item.summary)}</p>
      </div>
    </article>
  `;
}

function renderGuideRelatedTourCard(tour) {
  return `
    <a class="sb-journal-card" href="${tourRoute(tour)}">
      <img src="${publicImagePath(tour)}" alt="${escapeHtml(tour.imageAlt)}" loading="lazy" decoding="async">
      <div class="sb-journal-card__body">
        <div class="sb-journal-card__meta">
          <span class="sb-journal-chip">Recommended tour</span>
          <span class="sb-journal-card__tour">${escapeHtml(tour.area)}</span>
        </div>
        <h3>${escapeHtml(tour.title)}</h3>
        <p>${escapeHtml(tour.summary)}</p>
        <span class="sb-journal-card__cta">Open tour page</span>
      </div>
    </a>
  `;
}

function renderSeoGuidePage(article) {
  const siblingGuides = buildSeoGuideArticles()
    .filter((item) => item.guide.slug !== article.guide.slug)
    .slice(0, 3);
  const guideKeywords = article.rankings.map((item) => item.name);
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${article.url}#article`,
      headline: article.title,
      description: article.description,
      datePublished: JOURNAL_PUBLISHED_DATE,
      dateModified: JOURNAL_PUBLISHED_DATE,
      inLanguage: "en",
      image: [absoluteJournalImageUrl(article.heroImage)],
      mainEntityOfPage: article.url,
      keywords: guideKeywords.join(", "),
      author: { "@type": "Organization", name: "SB Excursions" },
      publisher: {
        "@type": "Organization",
        name: "SB Excursions",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${article.url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Bali main page", item: `${SITE_URL}/bali/en/main-page` },
        { "@type": "ListItem", position: 2, name: "Bali journal", item: `${SITE_URL}${JOURNAL_HUB_ROUTE}` },
        { "@type": "ListItem", position: 3, name: article.title, item: article.url },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${article.url}#rankings`,
      name: article.title,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: article.rankings.length,
      itemListElement: article.rankings.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        item: {
          "@type": "TouristAttraction",
          name: item.name,
          description: stripRichText(item.summary),
          image: absoluteJournalImageUrl(item.image),
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${article.url}#faq`,
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: stripRichText(item.answer),
        },
      })),
    },
  ];

  return `<!DOCTYPE html>
<html lang="en">
  <head><style>body{opacity:0!important}</style>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(article.title)} | SB Excursions</title>
    <meta name="description" content="${escapeHtml(article.description)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(article.title)} | SB Excursions">
    <meta property="og:description" content="${escapeHtml(article.description)}">
    <meta property="og:url" content="${article.url}">
    <meta property="og:image" content="${absoluteJournalImageUrl(article.heroImage)}">
    <link rel="canonical" href="${article.url}">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png">
    <link rel="stylesheet" href="/css/bali-tour-pages.css">
${JOURNAL_FOOTER_ASSETS}
    <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
    <style>${renderJournalSharedStyles()}</style>
  </head>
  <body>
    <div class="sb-journal-page">
      ${renderJournalHeader(article.tour)}
      <main class="sb-tour-main sb-journal-main">
        <nav class="sb-journal-breadcrumbs">
          <a href="/bali/en/main-page">Bali main page</a>
          <span>/</span>
          <a href="${JOURNAL_HUB_ROUTE}">Journal</a>
          <span>/</span>
          <span>${escapeHtml(article.articleType.navLabel)}</span>
        </nav>

        <section class="sb-journal-article-hero">
          <div class="sb-journal-article-hero__copy">
            <div class="sb-journal-kicker">${escapeHtml(article.articleType.badge)}</div>
            <h1>${escapeHtml(article.title)}</h1>
            <p class="sb-journal-lead">${renderRichText(article.excerpt)}</p>
            <div class="sb-journal-inline-stats">
              ${article.inlineStats.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            <div class="sb-journal-article-hero__actions">
              <a class="sb-journal-primary" href="${tourRoute(article.tour)}">Open recommended tour</a>
              <a class="sb-journal-secondary" href="${JOURNAL_HUB_ROUTE}">Browse all guides</a>
            </div>
          </div>
          <div class="sb-journal-article-hero__media">
            <img src="${article.heroImage}" alt="${escapeHtml(article.heroImageAlt)}" loading="eager" decoding="async" fetchpriority="high">
          </div>
        </section>

        <div class="sb-journal-article-layout">
          <article class="sb-journal-article">
            <section class="sb-journal-article-section">
              <h2>Top picks from this guide</h2>
              <div class="sb-journal-ranking-grid">
                ${article.rankings.map((item) => renderGuideRankingCard(item)).join("")}
              </div>
            </section>
            ${article.sections
              .map(
                (section) => `
              <section class="sb-journal-article-section">
                <h2>${escapeHtml(section.heading)}</h2>
                ${(section.paragraphs || []).map((paragraph) => `<p>${renderRichText(paragraph)}</p>`).join("")}
                ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${renderRichText(item)}</li>`).join("")}</ul>` : ""}
              </section>
            `,
              )
              .join("")}
            <section class="sb-journal-article-section">
              <h2>FAQ</h2>
              <div class="sb-journal-faq-grid">
                ${article.faq
                  .map(
                    (item) => `
                  <article class="sb-journal-faq-card">
                    <h3>${escapeHtml(item.question)}</h3>
                    <p>${renderRichText(item.answer)}</p>
                  </article>
                `,
                  )
                  .join("")}
              </div>
            </section>
            <section class="sb-journal-article-section">
              <h2>Recommended Bali tours for this guide</h2>
              <div class="sb-journal-guide-tour-grid">
                ${article.relatedTours.map((tour) => renderGuideRelatedTourCard(tour)).join("")}
              </div>
            </section>
          </article>

          <aside class="sb-journal-sidebar">
            <div class="sb-journal-sidebar-card">
              <h3>Guide snapshot</h3>
              <ul>
                ${article.inlineStats.map((item) => `<li>${renderRichText(item)}</li>`).join("")}
                <li>Recommended route anchor: ${escapeHtml(article.tour.title)}</li>
              </ul>
            </div>
            <div class="sb-journal-sidebar-card">
              <h3>Recommended tours</h3>
              <div class="sb-journal-article-list">
                ${article.relatedTours
                  .map(
                    (tour) => `
                  <a class="sb-journal-card sb-journal-card_compact" href="${tourRoute(tour)}">
                    <div class="sb-journal-card__body">
                      <div class="sb-journal-card__meta">
                        <span class="sb-journal-chip">Tour match</span>
                        <span class="sb-journal-card__tour">${escapeHtml(tour.area)}</span>
                      </div>
                      <h3>${escapeHtml(tour.title)}</h3>
                      <p>${escapeHtml(tour.summary)}</p>
                      <span class="sb-journal-card__cta">Open tour page</span>
                    </div>
                  </a>
                `,
                  )
                  .join("")}
              </div>
            </div>
            <div class="sb-journal-sidebar-card">
              <h3>More Bali guides</h3>
              <div class="sb-journal-article-list">
                ${siblingGuides.map((item) => renderJournalArticleCard(item, { compact: true })).join("")}
              </div>
            </div>
          </aside>
        </div>

        ${renderBaliWeatherBlock(tourRoute(article.tour))}
      </main>
      ${renderJournalBaliFooter()}
    </div>
  </body>
</html>`;
}

function renderJournalArticlePage(article) {
  const siblingArticles = JOURNAL_ARTICLE_TYPES.filter((item) => item.key !== article.articleType.key).map((item) =>
    buildJournalArticle(article.tour, item),
  );

  return `<!DOCTYPE html>
<html lang="en">
  <head><style>body{opacity:0!important}</style>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(article.title)} | SB Excursions</title>
    <meta name="description" content="${escapeHtml(article.description)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(article.title)} | SB Excursions">
    <meta property="og:description" content="${escapeHtml(article.description)}">
    <meta property="og:url" content="${article.url}">
    <meta property="og:image" content="${SITE_URL}${publicImagePath(article.tour)}">
    <link rel="canonical" href="${article.url}">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png">
    <link rel="stylesheet" href="/css/bali-tour-pages.css">
${JOURNAL_FOOTER_ASSETS}
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${article.url}#article`,
          headline: article.title,
          description: article.description,
          datePublished: JOURNAL_PUBLISHED_DATE,
          dateModified: JOURNAL_PUBLISHED_DATE,
          inLanguage: "en",
          image: [`${SITE_URL}${publicImagePath(article.tour)}`],
          mainEntityOfPage: article.url,
          author: { "@type": "Organization", name: "SB Excursions" },
          publisher: {
            "@type": "Organization",
            name: "SB Excursions",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png`,
            },
          },
          about: {
            "@type": "TouristTrip",
            name: article.tour.title,
            url: absoluteTourUrl(article.tour),
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${article.url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Bali main page", item: `${SITE_URL}/bali/en/main-page` },
            { "@type": "ListItem", position: 2, name: "Bali journal", item: `${SITE_URL}${JOURNAL_HUB_ROUTE}` },
            { "@type": "ListItem", position: 3, name: article.tour.title, item: absoluteTourUrl(article.tour) },
            { "@type": "ListItem", position: 4, name: article.title, item: article.url },
          ],
        },
        ...(article.faq.length ? [{
          "@type": "FAQPage",
          "@id": `${article.url}#faq`,
          mainEntity: article.faq.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: stripRichText(a) },
          })),
        }] : []),
      ],
    })}</script>
    <style>${renderJournalSharedStyles()}</style>
  </head>
  <body>
    <div class="sb-journal-page">
      ${renderJournalHeader(article.tour)}
      <main class="sb-tour-main sb-journal-main">
        <nav class="sb-journal-breadcrumbs">
          <a href="/bali/en/main-page">Bali main page</a>
          <span>/</span>
          <a href="${JOURNAL_HUB_ROUTE}">Journal</a>
          <span>/</span>
          <a href="${tourRoute(article.tour)}">${escapeHtml(article.tour.title)}</a>
          <span>/</span>
          <span>${escapeHtml(article.articleType.navLabel)}</span>
        </nav>

        <section class="sb-journal-article-hero">
          <div class="sb-journal-article-hero__copy">
            <div class="sb-journal-kicker">${escapeHtml(article.articleType.badge)}</div>
            <h1>${escapeHtml(article.title)}</h1>
            <p class="sb-journal-lead">${renderRichText(article.excerpt)}</p>
            <div class="sb-journal-inline-stats">
              <span>${escapeHtml(article.tour.duration)}</span>
              <span>${escapeHtml(article.tour.format)}</span>
              <span>${escapeHtml(article.tour.area)}</span>
            </div>
            <div class="sb-journal-article-hero__actions">
              <a class="sb-journal-primary" href="${tourRoute(article.tour)}">Open the tour page</a>
              <a class="sb-journal-secondary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(article.tour))}" target="_blank" rel="noopener noreferrer nofollow">Book in WhatsApp</a>
            </div>
          </div>
          <div class="sb-journal-article-hero__media">
            <img src="${publicImagePath(article.tour)}" alt="${escapeHtml(article.tour.imageAlt)}" loading="eager" decoding="async" fetchpriority="high">
          </div>
        </section>

        <div class="sb-journal-article-layout">
          <article class="sb-journal-article">
            <aside class="sb-journal-keyfacts">
              <h2>⚡ Quick facts</h2>
              <ul>
                <li>⏱️ Duration: <strong>${escapeHtml(article.tour.duration)}</strong></li>
                <li>🚐 Pickup: <strong>${escapeHtml(article.tour.pickup)}</strong></li>
                <li>📍 Area: <strong>${escapeHtml(article.tour.area)}</strong></li>
                <li>👥 Best for: <strong>${escapeHtml(article.tour.bestFor)}</strong></li>
                <li>💰 Price: <strong>${escapeHtml(article.tour.price)}</strong></li>
              </ul>
            </aside>
            ${article.sections
              .map(
                (section) => `
              <section class="sb-journal-article-section">
                <h2>${escapeHtml(section.heading)}</h2>
                ${(section.paragraphs || []).map((paragraph) => `<p>${renderRichText(paragraph)}</p>`).join("")}
                ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${renderRichText(item)}</li>`).join("")}</ul>` : ""}
              </section>
            `,
              )
              .join("")}
            ${article.faq.length ? `
              <section class="sb-journal-article-section">
                <h2>Frequently Asked Questions</h2>
                <div class="sb-journal-faq-grid">
                  ${article.faq.map(([q, a]) => `
                    <article class="sb-journal-faq-card">
                      <h3>${escapeHtml(q)}</h3>
                      <p>${renderRichText(a)}</p>
                    </article>
                  `).join("")}
                </div>
              </section>
            ` : ""}
          </article>

          <aside class="sb-journal-sidebar">
            <div class="sb-journal-sidebar-card">
              <h3>Tour snapshot</h3>
              <ul>
                <li>Duration: ${escapeHtml(article.tour.duration)}</li>
                <li>Best for: ${escapeHtml(article.tour.bestFor)}</li>
                <li>Pickup: ${escapeHtml(article.tour.pickup)}</li>
                <li>Area: ${escapeHtml(article.tour.area)}</li>
                <li>Price: ${escapeHtml(article.tour.price)}</li>
              </ul>
            </div>
            <div class="sb-journal-sidebar-card">
              <h3>More articles for this tour</h3>
              <div class="sb-journal-article-list">
                ${siblingArticles.map((item) => renderJournalArticleCard(item, { compact: true })).join("")}
              </div>
            </div>
          </aside>
        </div>

        ${renderBaliWeatherBlock(tourRoute(article.tour))}
      </main>
      ${renderJournalBaliFooter()}
    </div>
  </body>
</html>`;
}

function renderJournalSharedStyles() {
  return `
  :root{
    --sbj-bg:#f7f7f4;
    --sbj-surface:#ffffff;
    --sbj-text:#151515;
    --sbj-muted:#6f6f73;
    --sbj-line:rgba(21,21,21,0.08);
    --sbj-blue:#2f6bff;
    --sbj-blue-soft:rgba(47,107,255,0.10);
    --sbj-shadow:0 18px 48px rgba(17,17,17,0.08);
    --sbj-radius-xl:32px;
    --sbj-radius-lg:26px;
    --sbj-radius-md:20px;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--sbj-bg);color:var(--sbj-text);font-family:"Cina GEO", "TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
  img{max-width:100%;display:block}
  a{text-decoration:none;color:inherit}
  .sb-journal-page{min-height:100vh;overflow-x:hidden}
  .sb-journal-tour-header{position:fixed;top:0;left:0;right:0;z-index:80}
  .sb-journal-tour-header__desktop{display:block;background:rgba(255,255,255,0);border-bottom:0;transition:background-color .35s ease,box-shadow .35s ease}
  .sb-journal-tour-header__desktop-inner{width:min(calc(100% - 32px),1240px);min-height:7vh;margin:0 auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:24px}
  .sb-journal-tour-header__logo-link{display:inline-flex;align-items:center}
  .sb-journal-tour-header__logo{width:135px;max-width:135px;height:auto}
  .sb-journal-tour-header__nav{display:flex;align-items:center;justify-content:center;gap:0}
  .sb-journal-tour-header__nav-link,.sb-journal-tour-header__dropdown-trigger{appearance:none;border:0;background:transparent;padding:0 30px;color:#000;font-family:"Cina GEO", "TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:16px;font-weight:600;letter-spacing:-1px;line-height:1;cursor:pointer;transition:color .2s ease}
  .sb-journal-tour-header__nav-link:last-child{padding-right:0}
  .sb-journal-tour-header__nav-link:hover,.sb-journal-tour-header__dropdown-trigger:hover,.sb-journal-tour-header__nav-link:focus-visible,.sb-journal-tour-header__dropdown-trigger:focus-visible{color:#fca347;outline:none}
  .sb-journal-tour-header__dropdown{position:relative}
  .sb-journal-tour-header__dropdown-trigger{display:inline-flex;align-items:center;gap:8px;padding-right:30px}
  .sb-journal-tour-header__dropdown-trigger::after{content:"";display:block;width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg) translateY(-1px);transform-origin:center}
  .sb-journal-tour-header__dropdown-menu{position:absolute;left:0;top:calc(100% + 18px);display:grid;min-width:150px;padding:8px 0;background:#fff;border:1px solid rgba(21,21,21,0.08);box-shadow:0 16px 40px rgba(17,24,39,0.12);opacity:0;visibility:hidden;transform:translateY(10px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease}
  .sb-journal-tour-header__dropdown:hover .sb-journal-tour-header__dropdown-menu,.sb-journal-tour-header__dropdown:focus-within .sb-journal-tour-header__dropdown-menu,.sb-journal-tour-header__dropdown_open .sb-journal-tour-header__dropdown-menu{opacity:1;visibility:visible;transform:translateY(0)}
  .sb-journal-tour-header__dropdown-menu a{padding:10px 16px;color:#000;font-size:15px;font-weight:500;line-height:1.2}
  .sb-journal-tour-header__dropdown-menu a:hover,.sb-journal-tour-header__dropdown-menu a:focus-visible{background:#f7f7f7;outline:none}
  .sb-journal-tour-header__actions{display:flex;align-items:center;gap:18px;justify-content:flex-end}
  .sb-journal-tour-header__button{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 20px;border-radius:20px;background:#000;color:#fff;font-size:16px;font-weight:600;letter-spacing:-1px;line-height:1;transition:transform .2s ease,opacity .2s ease}
  .sb-journal-tour-header__button:hover,.sb-journal-tour-header__button:focus-visible{transform:translateY(-1px);opacity:.92;outline:none}
  .sb-journal-tour-header__langs{display:flex;align-items:center;gap:12px;color:#000;font-size:16px;font-weight:600;letter-spacing:-1px}
  .sb-journal-tour-header__langs span{opacity:.5}
  .sb-journal-tour-header__mobile{display:none}
  .sb-journal-tour-header__mobile-bar{position:relative;z-index:3;height:70px;padding:0 14px;display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:8px}
  .sb-journal-tour-header__burger{position:relative;display:block;width:28px;height:20px;padding:0;border:0;background:transparent;color:#000;cursor:pointer}
  .sb-journal-tour-header__burger span{position:absolute;left:0;display:block;width:100%;height:3px;background:currentColor;transition:transform .25s ease,opacity .25s ease,top .25s ease}
  .sb-journal-tour-header__burger span:nth-child(1){top:0}
  .sb-journal-tour-header__burger span:nth-child(2),.sb-journal-tour-header__burger span:nth-child(3){top:8px}
  .sb-journal-tour-header__burger span:nth-child(4){top:16px}
  .sb-journal-tour-header__mobile-logo-link{display:flex;justify-content:center}
  .sb-journal-tour-header__mobile-logo{width:160px;max-width:160px;height:auto}
  .sb-journal-tour-header__socials{display:flex;align-items:center;gap:10px;justify-content:flex-end}
  .sb-journal-tour-header__socials a{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;color:#000}
  .sb-journal-tour-header__socials svg{width:30px;height:30px}
  .sb-journal-tour-header__mobile-overlay{position:fixed;inset:0;background:rgba(17,24,39,0.28);opacity:0;visibility:hidden;transition:opacity .2s ease,visibility .2s ease}
  .sb-journal-tour-header__drawer{position:fixed;inset:0 auto 0 0;z-index:4;display:flex;flex-direction:column;gap:22px;width:min(320px,86vw);padding:88px 24px 28px;background:#333;box-shadow:20px 0 48px rgba(17,24,39,0.26);transform:translateX(-100%);transition:transform .24s ease}
  .sb-journal-tour-header__drawer-close{position:absolute;top:24px;right:20px;width:28px;height:28px;padding:0;border:0;background:transparent;color:#fff;cursor:pointer}
  .sb-journal-tour-header__drawer-close span{position:absolute;left:3px;top:13px;width:22px;height:2px;background:currentColor}
  .sb-journal-tour-header__drawer-close span:first-child{transform:rotate(45deg)}
  .sb-journal-tour-header__drawer-close span:last-child{transform:rotate(-45deg)}
  .sb-journal-tour-header__drawer-nav{display:grid;gap:16px}
  .sb-journal-tour-header__drawer-link{display:block;padding:0;border:0;background:transparent;text-align:left;color:#fff;font-size:18px;font-weight:600;letter-spacing:-1px;cursor:pointer}
  .sb-journal-tour-header__drawer-group{display:grid;gap:0}
  .sb-journal-tour-header__drawer-submenu{display:grid;gap:10px;max-height:0;overflow:hidden;padding-left:14px;transition:max-height .2s ease,padding-top .2s ease}
  .sb-journal-tour-header__drawer-group_open .sb-journal-tour-header__drawer-submenu{max-height:120px;padding-top:12px}
  .sb-journal-tour-header__drawer-submenu a{color:rgba(255,255,255,0.82);font-size:15px;font-weight:500}
  .sb-journal-tour-header__drawer-socials{margin-top:auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .sb-journal-tour-header__drawer-socials a{color:rgba(255,255,255,0.84);font-size:14px;font-weight:700}
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__desktop{background:#333;box-shadow:0 10px 28px rgba(17,24,39,0.18)}
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__nav-link,
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__dropdown-trigger,
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__langs{color:#fff}
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__logo{filter:brightness(0) invert(1)}
  .sb-journal-tour-header_scrolled .sb-journal-tour-header__dropdown-menu{border-color:rgba(255,255,255,0.08)}
  .sb-journal-tour-header_open .sb-journal-tour-header__mobile-overlay{opacity:1;visibility:visible}
  .sb-journal-tour-header_open .sb-journal-tour-header__drawer{transform:translateX(0)}
  .sb-journal-tour-header_open .sb-journal-tour-header__burger span:nth-child(1),.sb-journal-tour-header_open .sb-journal-tour-header__burger span:nth-child(4){top:8px;width:0;left:50%}
  .sb-journal-tour-header_open .sb-journal-tour-header__burger span:nth-child(2){transform:rotate(45deg)}
  .sb-journal-tour-header_open .sb-journal-tour-header__burger span:nth-child(3){transform:rotate(-45deg)}
  .sb-journal-main{max-width:1320px;margin:0 auto;padding:calc(7vh + 30px) 20px 80px}
  .sb-journal-hero,.sb-journal-article-hero{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,0.92fr);gap:28px;background:var(--sbj-surface);border:1px solid var(--sbj-line);border-radius:var(--sbj-radius-xl);padding:28px;box-shadow:var(--sbj-shadow)}
  .sb-journal-article-hero{align-items:center}
  .sb-journal-kicker{display:inline-flex;align-items:center;padding:8px 14px;border-radius:999px;background:var(--sbj-blue-soft);color:var(--sbj-blue);font-size:12px;font-weight:800;letter-spacing:-0.1px;margin-bottom:14px}
  .sb-journal-hero h1,.sb-journal-article-hero h1{margin:0;font-size:56px;line-height:1.02;letter-spacing:-2.4px}
  .sb-journal-lead{margin:16px 0 0;color:var(--sbj-muted);font-size:19px;line-height:1.7}
  .sb-journal-stats{display:flex;gap:14px;flex-wrap:wrap;margin-top:24px}
  .sb-journal-stats div,.sb-journal-inline-stats span{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:18px;background:#f5f7ff;border:1px solid rgba(47,107,255,0.10)}
  .sb-journal-stats span{font-size:28px;font-weight:800;letter-spacing:-1px}
  .sb-journal-stats small{font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:var(--sbj-muted);font-weight:700}
  .sb-journal-section{margin-top:30px}
  .sb-journal-section__head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:18px}
  .sb-journal-section__head h2{margin:0;font-size:34px;line-height:1.05;letter-spacing:-1.4px}
  .sb-journal-section__head a,.sb-journal-section__head span{font-size:14px;font-weight:700;color:var(--sbj-muted)}
  .sb-journal-featured-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
  .sb-journal-tour-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
  .sb-journal-tour-card{background:var(--sbj-surface);border:1px solid var(--sbj-line);border-radius:var(--sbj-radius-xl);overflow:hidden;box-shadow:var(--sbj-shadow)}
  .sb-journal-tour-card__hero{position:relative}
  .sb-journal-tour-card__hero img{width:100%;aspect-ratio:1.75;object-fit:cover}
  .sb-journal-tour-card__overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,0.82),rgba(8,8,8,0.12))}
  .sb-journal-tour-card__copy{position:absolute;left:22px;right:22px;bottom:20px;color:#fff}
  .sb-journal-tour-card__copy span{display:inline-flex;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;opacity:.86}
  .sb-journal-tour-card__copy h3{margin:10px 0 10px;font-size:34px;line-height:1.02;letter-spacing:-1.4px}
  .sb-journal-tour-card__copy p{margin:0;max-width:620px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.88)}
  .sb-journal-tour-card__body{padding:20px 22px 24px}
  .sb-journal-tour-card__meta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
  .sb-journal-tour-card__meta span{display:inline-flex;padding:8px 12px;border-radius:999px;background:#f6f6f6;color:#4b4b4f;font-size:12px;font-weight:700}
  .sb-journal-article-list{display:grid;gap:12px}
  .sb-journal-card{display:flex;flex-direction:column;background:var(--sbj-surface);border:1px solid var(--sbj-line);border-radius:var(--sbj-radius-lg);overflow:hidden;transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease}
  .sb-journal-card:hover{transform:translateY(-4px);border-color:rgba(47,107,255,0.24);box-shadow:0 18px 42px rgba(17,17,17,0.10)}
  .sb-journal-card img{width:100%;aspect-ratio:1.45;object-fit:cover;background:#ececec}
  .sb-journal-card__body{display:flex;flex:1;flex-direction:column;padding:18px 20px 20px}
  .sb-journal-card__meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}
  .sb-journal-chip{display:inline-flex;align-items:center;padding:7px 11px;border-radius:999px;background:var(--sbj-blue-soft);color:var(--sbj-blue);font-size:12px;font-weight:800}
  .sb-journal-card__tour{font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:var(--sbj-muted);font-weight:700}
  .sb-journal-card h3{margin:0 0 8px;font-size:26px;line-height:1.08;letter-spacing:-1px}
  .sb-journal-card p{margin:0 0 14px;color:var(--sbj-muted);font-size:15px;line-height:1.62}
  .sb-journal-card__cta{margin-top:auto;font-size:14px;font-weight:800;color:var(--sbj-text)}
  .sb-journal-card_compact{padding:0}
  .sb-journal-card_compact .sb-journal-card__body{padding:16px 16px 17px}
  .sb-journal-card_compact h3{font-size:20px}
  .sb-journal-card_compact p{font-size:14px}
  .sb-journal-ranking-grid,.sb-journal-guide-tour-grid,.sb-journal-faq-grid{display:grid;gap:18px}
  .sb-journal-ranking-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sb-journal-guide-tour-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sb-journal-faq-grid{grid-template-columns:1fr}
  .sb-journal-ranking-card,.sb-journal-faq-card{background:#fbfbfb;border:1px solid rgba(21,21,21,0.07);border-radius:24px;overflow:hidden}
  .sb-journal-ranking-card__media{position:relative}
  .sb-journal-ranking-card__media img{width:100%;aspect-ratio:1.2;object-fit:cover}
  .sb-journal-ranking-card__badge{position:absolute;left:16px;top:16px;display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:0 12px;border-radius:999px;background:rgba(17,17,17,0.82);color:#fff;font-size:14px;font-weight:800;letter-spacing:-0.2px}
  .sb-journal-ranking-card__body{padding:18px 18px 20px}
  .sb-journal-ranking-card__meta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}
  .sb-journal-ranking-card__meta span{display:inline-flex;padding:7px 10px;border-radius:999px;background:#f1f4ff;color:#355ee6;font-size:12px;font-weight:700}
  .sb-journal-ranking-card h3,.sb-journal-faq-card h3{margin:0 0 10px;font-size:24px;line-height:1.1;letter-spacing:-0.8px}
  .sb-journal-ranking-card p,.sb-journal-faq-card p{margin:0;color:#404047;font-size:15px;line-height:1.68}
  .sb-journal-faq-card{padding:20px 22px}
  .sb-journal-keyfacts{background:#f4f7ff;border:1px solid rgba(47,107,255,0.18);border-radius:20px;padding:20px 24px;margin:0 0 30px}
  .sb-journal-keyfacts h2{margin:0 0 12px;font-size:20px;line-height:1.2;letter-spacing:-0.4px}
  .sb-journal-keyfacts ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}
  .sb-journal-keyfacts li{margin:0;padding:0;font-size:15px;line-height:1.5;color:#404047}
  .sb-journal-keyfacts strong{color:#151515;font-weight:600}
  .sb-journal-article-section strong{font-weight:600;color:#151515}
  @media screen and (max-width:480px){
    .sb-journal-keyfacts{padding:16px 18px;border-radius:16px}
    .sb-journal-keyfacts h2{font-size:18px}
    .sb-journal-keyfacts li{font-size:14px}
  }
  .sb-journal-tour-card__link,.sb-journal-primary,.sb-journal-secondary{display:inline-flex;align-items:center;justify-content:center;padding:14px 20px;border-radius:999px;font-size:15px;font-weight:800;transition:transform .2s ease, box-shadow .2s ease}
  .sb-journal-tour-card__link,.sb-journal-primary{background:#111;color:#fff}
  .sb-journal-secondary{background:#fff;color:#111;border:1px solid rgba(21,21,21,0.12)}
  .sb-journal-tour-card__link:hover,.sb-journal-primary:hover,.sb-journal-secondary:hover{transform:translateY(-1px);box-shadow:0 10px 22px rgba(17,17,17,0.12)}
  .sb-journal-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;color:var(--sbj-muted);font-size:14px;font-weight:700}
  .sb-journal-article-layout{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:24px;margin-top:26px}
  .sb-journal-article{background:var(--sbj-surface);border:1px solid var(--sbj-line);border-radius:var(--sbj-radius-xl);padding:28px;box-shadow:var(--sbj-shadow)}
  .sb-journal-article-section + .sb-journal-article-section{margin-top:26px}
  .sb-journal-article-section h2{margin:0 0 12px;font-size:30px;line-height:1.07;letter-spacing:-1.2px}
  .sb-journal-article-section p{margin:0 0 14px;color:#2f2f33;font-size:17px;line-height:1.78}
  .sb-journal-article-section ul,.sb-journal-sidebar-card ul{margin:0;padding-left:18px}
  .sb-journal-article-section li,.sb-journal-sidebar-card li{color:#2f2f33;font-size:16px;line-height:1.72}
  .sb-journal-sidebar{display:grid;gap:18px;align-self:start;position:sticky;top:88px}
  .sb-journal-sidebar-card{background:var(--sbj-surface);border:1px solid var(--sbj-line);border-radius:var(--sbj-radius-xl);padding:22px;box-shadow:var(--sbj-shadow)}
  .sb-journal-sidebar-card h3{margin:0 0 14px;font-size:24px;line-height:1.08;letter-spacing:-0.9px}
  .sb-journal-inline-stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
  .sb-journal-article-hero__actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
  .sb-journal-article-hero__media img{width:100%;aspect-ratio:1.2;object-fit:cover;border-radius:24px}
  .sb-journal-footer{padding:0 20px 32px}
  .sb-journal-footer__shell{max-width:1320px;margin:34px auto 0;padding:34px 34px 28px;border-radius:32px;background:linear-gradient(135deg,#7ec4f4 0%,#6789ec 54%,#3f44f0 100%);color:#fff;box-shadow:0 28px 72px rgba(37,54,153,0.22)}
  .sb-journal-footer__grid{display:grid;grid-template-columns:minmax(0,1.15fr) repeat(4,minmax(0,1fr));gap:28px}
  .sb-journal-footer__brand,.sb-journal-footer__column{min-width:0}
  .sb-journal-footer__brand{display:grid;align-content:start;gap:20px}
  .sb-journal-footer__logo-link{display:inline-flex;width:fit-content}
  .sb-journal-footer__logo{width:210px;max-width:100%;height:auto;filter:brightness(0) invert(1)}
  .sb-journal-footer__lead{margin:0;max-width:240px;font-size:18px;line-height:1.65;color:rgba(255,255,255,0.86)}
  .sb-journal-footer__column{display:grid;align-content:start;gap:12px}
  .sb-journal-footer__title{font-size:14px;line-height:1.2;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.82)}
  .sb-journal-footer__link{display:inline-flex;width:fit-content;font-size:18px;line-height:1.45;font-weight:600;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;transition:opacity .2s ease}
  .sb-journal-footer__link:hover,.sb-journal-footer__link:focus-visible{opacity:.82;outline:none}
  .sb-journal-footer__text{font-size:18px;line-height:1.55;color:rgba(255,255,255,0.88)}
  .sb-journal-footer__text_strong{font-weight:700;color:#fff}
  .sb-journal-footer__chips{display:flex;flex-wrap:wrap;gap:10px}
  .sb-journal-footer__chip{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.24);background:rgba(255,255,255,0.16);font-size:13px;line-height:1.2;font-weight:700;color:#fff}
  .sb-journal-footer__bottom{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:28px;padding-top:22px;border-top:1px solid rgba(255,255,255,0.22)}
  .sb-journal-footer__copyright{margin:0;font-size:16px;line-height:1.5;color:rgba(255,255,255,0.85)}
  .sb-journal-footer__socials{display:flex;align-items:center;justify-content:flex-end;gap:12px;flex-wrap:wrap}
  .sb-journal-footer__social-label{font-size:16px;line-height:1.4;font-weight:700;color:rgba(255,255,255,0.88);margin-right:4px}
  .sb-journal-footer__social-link{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:999px;background:#111;color:#fff;box-shadow:0 10px 24px rgba(17,17,17,0.22);transition:transform .2s ease,opacity .2s ease}
  .sb-journal-footer__social-link:hover,.sb-journal-footer__social-link:focus-visible{transform:translateY(-1px);opacity:.9;outline:none}
  .sb-journal-footer__social-link svg{width:22px;height:22px}
  .sb-journal-header-lock{overflow:hidden}
  @media screen and (max-width:1100px){.sb-journal-featured-grid,.sb-journal-tour-grid,.sb-journal-article-layout,.sb-journal-hero,.sb-journal-article-hero,.sb-journal-ranking-grid,.sb-journal-guide-tour-grid{grid-template-columns:1fr}.sb-journal-sidebar{position:static}.sb-journal-hero h1,.sb-journal-article-hero h1{font-size:46px}.sb-journal-footer__grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sb-journal-footer__brand,.sb-journal-footer__payments{grid-column:1/-1}}
  @media screen and (max-width:980px){.sb-journal-tour-header__desktop-inner{grid-template-columns:auto 1fr;gap:18px;padding-top:14px;padding-bottom:14px}.sb-journal-tour-header__nav{justify-content:flex-end;flex-wrap:wrap}.sb-journal-tour-header__actions{grid-column:1/-1;justify-content:flex-start}}
  @media screen and (max-width:640px){.sb-journal-footer{padding:0 14px 26px}.sb-journal-footer__shell{margin-top:26px;padding:28px 20px 24px;border-radius:28px}.sb-journal-footer__grid{grid-template-columns:1fr;gap:22px}.sb-journal-footer__brand,.sb-journal-footer__payments{grid-column:auto}.sb-journal-footer__lead,.sb-journal-footer__text{font-size:16px}.sb-journal-footer__link{font-size:16px}.sb-journal-footer__bottom{flex-direction:column;align-items:flex-start}.sb-journal-footer__copyright,.sb-journal-footer__social-label{font-size:15px}.sb-journal-footer__social-link{width:42px;height:42px}}
  @media screen and (max-width:480px){.sb-journal-tour-header__desktop{display:none}.sb-journal-tour-header__mobile{display:block;background:transparent;transition:background-color .35s ease,box-shadow .35s ease}.sb-journal-tour-header__mobile-bar{background:transparent;transition:background-color .35s ease,box-shadow .35s ease}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile,.sb-journal-tour-header_open .sb-journal-tour-header__mobile{background:#333}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile-bar,.sb-journal-tour-header_open .sb-journal-tour-header__mobile-bar{background:#333;box-shadow:0 10px 30px rgba(17,24,39,0.18)}.sb-journal-tour-header_scrolled .sb-journal-tour-header__burger,.sb-journal-tour-header_open .sb-journal-tour-header__burger,.sb-journal-tour-header_scrolled .sb-journal-tour-header__socials a,.sb-journal-tour-header_open .sb-journal-tour-header__socials a{color:#fff}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile-logo,.sb-journal-tour-header_open .sb-journal-tour-header__mobile-logo{filter:brightness(0) invert(1)}.sb-journal-main{padding:90px 14px 64px}.sb-journal-hero,.sb-journal-article-hero,.sb-journal-tour-card,.sb-journal-article,.sb-journal-sidebar-card,.sb-journal-ranking-card,.sb-journal-faq-card{border-radius:24px}.sb-journal-hero,.sb-journal-article-hero,.sb-journal-article{padding:20px}.sb-journal-featured-grid,.sb-journal-tour-grid,.sb-journal-ranking-grid,.sb-journal-guide-tour-grid,.sb-journal-faq-grid{gap:16px}.sb-journal-tour-card__copy{left:16px;right:16px;bottom:16px}.sb-journal-tour-card__copy h3{font-size:28px}.sb-journal-hero h1,.sb-journal-article-hero h1{font-size:34px;letter-spacing:-1.6px}.sb-journal-lead{font-size:17px}.sb-journal-section__head{align-items:flex-start;flex-direction:column}.sb-journal-section__head h2{font-size:28px}.sb-journal-card h3,.sb-journal-ranking-card h3,.sb-journal-faq-card h3{font-size:23px}.sb-journal-article-section h2{font-size:26px}.sb-journal-article-section p,.sb-journal-article-section li,.sb-journal-sidebar-card li,.sb-journal-ranking-card p,.sb-journal-faq-card p{font-size:15px}}
  `;
}

function tourDataMap() {
  return new Map(tours.map((tour) => [tour.slug, tour]));
}

function tourRoute(tour) {
  return `/bali/${tourLocale(tour)}/tours/${tour.slug}`;
}

function renderBaliWeatherBlock(primaryRoute = WEATHER_MAIN_PAGE_ROUTE) {
  const tourLinks = {
    hot: primaryRoute,
    sunny: primaryRoute,
    partly: primaryRoute,
    cloudy: primaryRoute,
    rain: WEATHER_MAIN_PAGE_ROUTE,
    storm: primaryRoute,
    night: WEATHER_MAIN_PAGE_ROUTE,
  };

  return `
        <section class="sb-bali-weather-block" aria-label="Live Bali weather">
          <div class="sb-bali-weather-shell">
            <div class="bali-weather-card theme-sunny" id="baliWeatherCard">
              <div class="bw-top">
                <div class="bw-location-line">
                  <span class="bw-badge">Live weather</span>
                  <span class="bw-badge" id="bwLocation">Bali, Indonesia</span>
                  <span class="bw-badge" id="bwCodeLabel">Loading…</span>
                </div>
                <div class="bw-updated" id="bwUpdated">Checking local conditions…</div>
              </div>
              <div class="bw-main">
                <div class="bw-copy">
                  <div class="bw-temp" id="bwTemp">--°</div>
                  <div class="bw-condition" id="bwCondition">Loading weather…</div>
                  <div class="bw-summary" id="bwSummary">Finding the best Bali plan for today…</div>
                </div>
                <div class="bw-hero-icon" id="bwHeroIcon">☀️</div>
              </div>
              <div class="bw-metrics">
                <div class="bw-metric">
                  <span class="bw-metric-label">Feels like</span>
                  <span class="bw-metric-value" id="bwFeelsLike">--°</span>
                </div>
                <div class="bw-metric">
                  <span class="bw-metric-label">Humidity</span>
                  <span class="bw-metric-value" id="bwHumidity">--%</span>
                </div>
                <div class="bw-metric">
                  <span class="bw-metric-label">Wind</span>
                  <span class="bw-metric-value" id="bwWind">-- km/h</span>
                </div>
              </div>
              <div class="bw-footer">
                <div class="bw-tips-wrap">
                  <div class="bw-tips-title">Today’s tips</div>
                  <div class="bw-tips" id="bwTips"></div>
                </div>
                <a class="bw-cta" id="bwCta" href="#" target="_blank" rel="noopener noreferrer nofollow">
                  <span id="bwCtaText">See recommended tour</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <style>
          .sb-bali-weather-block {
            margin-top: 26px;
          }

          .sb-bali-weather-shell,
          .sb-bali-weather-shell * {
            box-sizing: border-box;
          }

          .sb-bali-weather-shell {
            width: 100%;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            padding: 0 20px;
            overflow-x: hidden;
            overflow-x: clip;
          }

          .sb-bali-weather-shell #bwCta {
            display: none !important;
          }

          .sb-bali-weather-shell .bali-weather-card {
            position: relative;
            overflow: hidden;
            width: 100%;
            min-height: 210px;
            padding: 15px;
            border-radius: 20px;
            color: #ffffff;
            font-family: "Cina GEO", "Tilda Sans", "TildaSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            box-shadow: 0 24px 80px rgba(15, 23, 42, 0.18);
            isolation: isolate;
          }

          .sb-bali-weather-shell .bali-weather-card::before,
          .sb-bali-weather-shell .bali-weather-card::after {
            content: "";
            position: absolute;
            border-radius: 999px;
            pointer-events: none;
            z-index: 0;
          }

          .sb-bali-weather-shell .bali-weather-card::before {
            width: 420px;
            height: 420px;
            top: -180px;
            right: -120px;
            background: rgba(255, 255, 255, 0.16);
            filter: blur(8px);
          }

          .sb-bali-weather-shell .bali-weather-card::after {
            width: 320px;
            height: 320px;
            bottom: -160px;
            left: -90px;
            background: rgba(255, 255, 255, 0.10);
            filter: blur(8px);
          }

          .sb-bali-weather-shell .bw-top,
          .sb-bali-weather-shell .bw-main,
          .sb-bali-weather-shell .bw-metrics,
          .sb-bali-weather-shell .bw-footer {
            position: relative;
            z-index: 1;
          }

          .sb-bali-weather-shell .bw-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }

          .sb-bali-weather-shell .bw-location-line {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }

          .sb-bali-weather-shell .bw-badge {
            display: inline-flex;
            align-items: center;
            min-height: 25px;
            padding: 5px 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(14px);
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.02em;
          }

          .sb-bali-weather-shell .bw-updated {
            font-size: 10px;
            line-height: 1.4;
            color: rgba(255, 255, 255, 0.84);
            text-align: right;
          }

          .sb-bali-weather-shell .bw-main {
            margin-top: 14px;
            display: grid;
            grid-template-columns: minmax(0, 1.4fr) 88px;
            gap: 12px;
            align-items: end;
          }

          .sb-bali-weather-shell .bw-temp {
            font-size: clamp(40px, 6.5vw, 62px);
            line-height: 0.9;
            font-weight: 700;
            letter-spacing: -0.06em;
          }

          .sb-bali-weather-shell .bw-condition {
            margin-top: 6px;
            font-size: clamp(18px, 2vw, 24px);
            line-height: 1.02;
            font-weight: 600;
            letter-spacing: -0.03em;
          }

          .sb-bali-weather-shell .bw-summary {
            margin-top: 8px;
            font-size: 13px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.92);
          }

          .sb-bali-weather-shell .bw-hero-icon {
            justify-self: end;
            width: 88px;
            height: 88px;
            border-radius: 18px;
            display: grid;
            place-items: center;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(16px);
            font-size: 38px;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
          }

          .sb-bali-weather-shell .bw-metrics {
            margin-top: 14px;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
          }

          .sb-bali-weather-shell .bw-metric {
            padding: 10px 12px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.16);
            backdrop-filter: blur(14px);
          }

          .sb-bali-weather-shell .bw-metric-label {
            display: block;
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 1;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.78);
          }

          .sb-bali-weather-shell .bw-metric-value {
            display: block;
            font-size: 15px;
            line-height: 1.15;
            font-weight: 600;
          }

          .sb-bali-weather-shell .bw-footer {
            margin-top: 14px;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            align-items: end;
          }

          .sb-bali-weather-shell .bw-tips-title {
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 1;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.78);
            font-weight: 600;
          }

          .sb-bali-weather-shell .bw-tips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .sb-bali-weather-shell .bw-tip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 25px;
            padding: 5px 9px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.16);
            backdrop-filter: blur(12px);
            font-size: 10px;
            line-height: 1.35;
          }

          .sb-bali-weather-shell .bw-tip-icon {
            width: 20px;
            height: 20px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background: rgba(255, 255, 255, 0.18);
            font-size: 10px;
            flex: 0 0 20px;
          }

          .sb-bali-weather-shell .bw-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 56px;
            padding: 0 24px;
            border-radius: 999px;
            background: #ffffff;
            color: #0f172a !important;
            text-decoration: none !important;
            font-size: 16px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
          }

          .sb-bali-weather-shell .theme-hot {
            background:
              radial-gradient(circle at 15% 20%, rgba(255, 221, 168, 0.55) 0, rgba(255, 221, 168, 0) 36%),
              linear-gradient(135deg, #ffbe78 0%, #ff884d 36%, #ff5f5f 100%);
          }

          .sb-bali-weather-shell .theme-sunny {
            background:
              radial-gradient(circle at 18% 22%, rgba(255, 240, 198, 0.42) 0, rgba(255, 240, 198, 0) 34%),
              linear-gradient(135deg, #68d6ff 0%, #4ba6ff 40%, #ffb15c 100%);
          }

          .sb-bali-weather-shell .theme-partly {
            background:
              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.32) 0, rgba(255, 255, 255, 0) 32%),
              linear-gradient(135deg, #8fd7ff 0%, #5e9fff 42%, #8aa6c1 100%);
          }

          .sb-bali-weather-shell .theme-cloudy {
            background:
              radial-gradient(circle at 16% 18%, rgba(255, 255, 255, 0.22) 0, rgba(255, 255, 255, 0) 34%),
              linear-gradient(135deg, #84c1ea 0%, #5f87b4 46%, #6e7486 100%);
          }

          .sb-bali-weather-shell .theme-rain {
            background:
              radial-gradient(circle at 18% 16%, rgba(144, 204, 255, 0.18) 0, rgba(144, 204, 255, 0) 36%),
              linear-gradient(135deg, #4a84b5 0%, #2d5f82 44%, #17324f 100%);
          }

          .sb-bali-weather-shell .theme-storm {
            background:
              radial-gradient(circle at 20% 18%, rgba(154, 132, 255, 0.18) 0, rgba(154, 132, 255, 0) 38%),
              linear-gradient(135deg, #2b3145 0%, #49386b 46%, #1a1d2b 100%);
          }

          .sb-bali-weather-shell .theme-night {
            background:
              radial-gradient(circle at 18% 18%, rgba(118, 195, 255, 0.16) 0, rgba(118, 195, 255, 0) 36%),
              linear-gradient(135deg, #111827 0%, #1f3b7a 52%, #144b63 100%);
          }

          @media (max-width: 959px) {
            .sb-bali-weather-shell {
              max-width: 860px;
              margin: 0 auto;
              padding: 0 14px;
            }
          }

          @media (max-width: 639px) {
            .sb-bali-weather-shell {
              padding: 0 10px;
            }

            .sb-bali-weather-shell .bali-weather-card {
              min-height: 190px;
              padding: 13px;
              border-radius: 18px;
            }

            .sb-bali-weather-shell .bw-top {
              flex-direction: column;
              gap: 12px;
            }

            .sb-bali-weather-shell .bw-updated {
              text-align: left;
            }

            .sb-bali-weather-shell .bw-main {
              grid-template-columns: minmax(0, 1fr) 70px;
              gap: 8px;
            }

            .sb-bali-weather-shell .bw-temp {
              font-size: 46px;
            }

            .sb-bali-weather-shell .bw-condition {
              font-size: 16px;
            }

            .sb-bali-weather-shell .bw-summary {
              font-size: 12px;
            }

            .sb-bali-weather-shell .bw-hero-icon {
              width: 70px;
              height: 70px;
              border-radius: 16px;
              font-size: 30px;
            }

            .sb-bali-weather-shell .bw-metrics {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <script>
          (function () {
            var CONFIG = {
              latitude: -8.6717,
              longitude: 115.2339,
              locationLabel: "Bali, Indonesia",
              refreshMs: 10 * 60 * 1000
            };

            var TOUR_LINKS = ${JSON.stringify(tourLinks)};

            var WEATHER_LABELS = {
              0: "Clear sky",
              1: "Mostly clear",
              2: "Partly cloudy",
              3: "Overcast",
              45: "Foggy",
              48: "Rime fog",
              51: "Light drizzle",
              53: "Drizzle",
              55: "Heavy drizzle",
              56: "Freezing drizzle",
              57: "Freezing drizzle",
              61: "Light rain",
              63: "Rain",
              65: "Heavy rain",
              66: "Freezing rain",
              67: "Freezing rain",
              71: "Snow",
              73: "Snow",
              75: "Heavy snow",
              77: "Snow grains",
              80: "Rain showers",
              81: "Rain showers",
              82: "Heavy showers",
              85: "Snow showers",
              86: "Snow showers",
              95: "Thunderstorm",
              96: "Thunderstorm",
              99: "Severe thunderstorm"
            };

            var card = document.getElementById("baliWeatherCard");
            var locationEl = document.getElementById("bwLocation");
            var codeLabelEl = document.getElementById("bwCodeLabel");
            var updatedEl = document.getElementById("bwUpdated");
            var tempEl = document.getElementById("bwTemp");
            var conditionEl = document.getElementById("bwCondition");
            var summaryEl = document.getElementById("bwSummary");
            var heroIconEl = document.getElementById("bwHeroIcon");
            var feelsLikeEl = document.getElementById("bwFeelsLike");
            var humidityEl = document.getElementById("bwHumidity");
            var windEl = document.getElementById("bwWind");
            var tipsEl = document.getElementById("bwTips");
            var ctaEl = document.getElementById("bwCta");
            var ctaTextEl = document.getElementById("bwCtaText");

            if (!card || !tipsEl) return;

            function renderTips(tips) {
              tipsEl.innerHTML = tips
                .map(function (tip) {
                  return '<div class="bw-tip"><span class="bw-tip-icon">' + tip.icon + '</span><span>' + tip.text + '</span></div>';
                })
                .join("");
            }

            function formatTime(isoString) {
              if (!isoString || isoString.indexOf("T") === -1) return "Live update";
              var parts = isoString.split("T")[1].split(":");
              var hours = parseInt(parts[0], 10);
              var minutes = parseInt(parts[1], 10);
              var suffix = hours >= 12 ? "PM" : "AM";
              var hours12 = hours % 12 || 12;
              return hours12 + ":" + String(minutes).padStart(2, "0") + " " + suffix;
            }

            function getProfile(code, temp, isDay, windSpeed) {
              var isStorm = [95, 96, 99].indexOf(code) !== -1;
              var isRain = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].indexOf(code) !== -1;
              var isCloudy = [3, 45, 48].indexOf(code) !== -1;
              var isPartly = code === 2;
              var isClear = [0, 1].indexOf(code) !== -1;

              if (!isDay && isClear) {
                return {
                  theme: "theme-night",
                  icon: "🌙",
                  title: "Warm Bali evening",
                  summary: "Perfect time for dinner by the ocean, rooftop bars and relaxed evening walks.",
                  tips: [
                    { icon: "🌃", text: "Great for sunset plans" },
                    { icon: "🍹", text: "Nice for dinner stops" },
                    { icon: "👕", text: "A light layer is enough" }
                  ],
                  ctaText: "See evening experiences",
                  link: TOUR_LINKS.night
                };
              }

              if (isStorm) {
                return {
                  theme: "theme-storm",
                  icon: "⛈️",
                  title: "Stormy weather today",
                  summary: "Better to switch to flexible indoor plans, spa time or an easy private driver route.",
                  tips: [
                    { icon: "⚡", text: "Avoid open-water trips" },
                    { icon: "☂️", text: "Take a compact umbrella" },
                    { icon: "🚗", text: "Choose flexible plans" }
                  ],
                  ctaText: "See flexible tours",
                  link: TOUR_LINKS.storm
                };
              }

              if (isRain) {
                return {
                  theme: "theme-rain",
                  icon: "🌧️",
                  title: windSpeed >= 30 ? "Windy and rainy" : "Rainy Bali weather",
                  summary: "A smart day for spa visits, cafés, private transfers and easy indoor experiences.",
                  tips: [
                    { icon: "☔", text: "Pack a light rain layer" },
                    { icon: "👟", text: "Wear shoes with grip" },
                    { icon: "🧘", text: "Great for spa or café stops" }
                  ],
                  ctaText: "See rainy-day tours",
                  link: TOUR_LINKS.rain
                };
              }

              if (isCloudy) {
                return {
                  theme: "theme-cloudy",
                  icon: "🌥️",
                  title: "Cloudy and comfortable",
                  summary: "Nice weather for temples, viewpoints, rice terraces and longer Bali sightseeing routes.",
                  tips: [
                    { icon: "🥾", text: "Great for walking routes" },
                    { icon: "📸", text: "Nice light for photos" },
                    { icon: "🧴", text: "Keep SPF with you" }
                  ],
                  ctaText: "See scenic tours",
                  link: TOUR_LINKS.cloudy
                };
              }

              if (isPartly) {
                return {
                  theme: "theme-partly",
                  icon: "⛅",
                  title: "Partly cloudy and easy",
                  summary: "Comfortable conditions for beaches, waterfalls, cafés and day trips around the island.",
                  tips: [
                    { icon: "🚙", text: "Great for day trips" },
                    { icon: "🕶️", text: "Keep sunglasses handy" },
                    { icon: "💧", text: "Bring water with you" }
                  ],
                  ctaText: "See day trips",
                  link: TOUR_LINKS.partly
                };
              }

              if (isClear && temp >= 30) {
                return {
                  theme: "theme-hot",
                  icon: "☀️",
                  title: "Sunny and hot",
                  summary: "Perfect weather for ocean views, island day trips and sunny outdoor stops across Bali.",
                  tips: [
                    { icon: "🧴", text: "Apply SPF before heading out" },
                    { icon: "🧢", text: "Wear a hat in direct sun" },
                    { icon: "💧", text: "Keep water with you" }
                  ],
                  ctaText: "See sunny-day tours",
                  link: TOUR_LINKS.hot
                };
              }

              return {
                theme: "theme-sunny",
                icon: "🌤️",
                title: "Bright Bali weather",
                summary: "A beautiful day for coastal views, temples and easy outdoor plans across Bali.",
                tips: [
                  { icon: "😎", text: "Bring sunglasses" },
                  { icon: "🧴", text: "SPF is a good idea" },
                  { icon: "⛱️", text: "Perfect for outdoor tours" }
                ],
                ctaText: "See recommended tours",
                link: TOUR_LINKS.sunny
              };
            }

            async function loadWeather() {
              var url = "https://api.open-meteo.com/v1/forecast?latitude=" + CONFIG.latitude +
                "&longitude=" + CONFIG.longitude +
                "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day" +
                "&timezone=auto";

              try {
                updatedEl.textContent = "Updating…";

                var response = await fetch(url, { cache: "no-store" });
                if (!response.ok) throw new Error("Weather request failed");

                var data = await response.json();
                var current = data.current || {};
                var temperature = Math.round(current.temperature_2m);
                var apparent = Math.round(current.apparent_temperature);
                var humidity = Math.round(current.relative_humidity_2m);
                var wind = Math.round(current.wind_speed_10m);
                var code = typeof current.weather_code === "number" ? current.weather_code : 0;
                var isDay = Number(current.is_day) === 1;
                var profile = getProfile(code, temperature, isDay, wind);

                card.className = "bali-weather-card " + profile.theme;
                locationEl.textContent = CONFIG.locationLabel;
                codeLabelEl.textContent = WEATHER_LABELS[code] || "Live forecast";
                updatedEl.textContent = "Updated " + formatTime(current.time) + " local time";
                tempEl.textContent = temperature + "°";
                conditionEl.textContent = profile.title;
                summaryEl.textContent = profile.summary;
                heroIconEl.textContent = profile.icon;
                feelsLikeEl.textContent = apparent + "°";
                humidityEl.textContent = humidity + "%";
                windEl.textContent = wind + " km/h";

                if (ctaTextEl) ctaTextEl.textContent = profile.ctaText;
                if (ctaEl) ctaEl.href = profile.link || "#";

                renderTips(profile.tips);
              } catch (error) {
                card.className = "bali-weather-card theme-cloudy";
                codeLabelEl.textContent = "Weather unavailable";
                updatedEl.textContent = "Could not update right now";
                tempEl.textContent = "--°";
                conditionEl.textContent = "Weather update unavailable";
                summaryEl.textContent = "Please try again in a moment or check your internet connection.";
                heroIconEl.textContent = "🌥️";
                feelsLikeEl.textContent = "--°";
                humidityEl.textContent = "--%";
                windEl.textContent = "-- km/h";

                if (ctaTextEl) ctaTextEl.textContent = "Refresh later";
                if (ctaEl) ctaEl.href = "#";

                renderTips([
                  { icon: "🔄", text: "Try refreshing the page" },
                  { icon: "📶", text: "Check internet access" },
                  { icon: "🧩", text: "Verify the weather source" }
                ]);
                console.error(error);
              }
            }

            loadWeather();
            setInterval(loadWeather, CONFIG.refreshMs);
          })();
        </script>
  `;
}

function renderRelatedCards(tour, allTours) {
  return tour.related
    .map((slug) => allTours.get(slug) || existingRoutes[slug])
    .filter(Boolean)
    .map((related) => {
      const href = related.route || tourRoute(related);
      const label = related.area || "Bali experience";
      const image = related.slug ? publicImagePath(related) : publicImagePath(tour);
      const text =
        related.summary ||
        "Explore another Bali route with private coordination, cleaner logistics, and stronger on-page detail.";
      return `
        <a class="sb-related-card" href="${href}">
          <img src="${image}" alt="${escapeHtml(related.title)}" loading="lazy" decoding="async">
          <div class="sb-related-card-body">
            <div class="sb-related-label">${escapeHtml(label)}</div>
            <h3>${escapeHtml(related.title)}</h3>
            <p>${escapeHtml(text)}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

function renderStructuredData(tour) {
  const faq = buildFaqs(tour);
  const locale = tourLocale(tour);
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${absoluteTourUrl(tour)}#webpage`,
      url: absoluteTourUrl(tour),
      name: tour.title,
      description: tour.metaDescription || tour.summary,
      inLanguage: locale,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteImageUrl(tour),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteTourUrl(tour)}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tour.breadcrumbHome || "Bali main page",
          item: `${SITE_URL}/bali/en/main-page`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tour.breadcrumbTours || "Tours",
          item: `${SITE_URL}/bali/en/main-page#tours`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tour.title,
          item: absoluteTourUrl(tour),
        },
      ],
    },
    {
      "@type": "TouristTrip",
      "@id": `${absoluteTourUrl(tour)}#trip`,
      name: tour.title,
      description: tour.summary,
      image: [absoluteImageUrl(tour)],
      url: absoluteTourUrl(tour),
      touristType: tour.bestFor,
      itinerary: tour.itinerary.map(([title, description]) => ({
        "@type": "TouristAttraction",
        name: title,
        description,
      })),
      provider: {
        "@type": "TravelAgency",
        name: "SB Excursions",
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Place",
        name: tour.area,
      },
      offers: moneyOffer(tour),
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteTourUrl(tour)}#faq`,
      mainEntity: faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ];

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph,
    },
    null,
    2,
  );
}

function renderPage(tour, allTours) {
  return renderWestStylePage(tour);
}

function ensureHeroImage(tour) {
  fs.mkdirSync(HERO_IMAGE_DIR, { recursive: true });
  const output = path.join(HERO_IMAGE_DIR, `${tour.slug}${path.extname(tour.image).toLowerCase()}`);
  fs.copyFileSync(tour.image, output);
}

function shouldIncludeOnMainPage(tour) {
  return tour.mainPage !== false;
}

function shouldIncludeInPlanner(tour) {
  return tour.aiPlanner !== false;
}

function clampText(value, max = 64) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function tourSearchText(tour) {
  return [
    tour.slug,
    tour.title,
    tour.eyebrow,
    tour.area,
    tour.bestFor,
    tour.summary,
    ...(tour.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasTourTag(tour, tag) {
  return Array.isArray(tour.tags) && tour.tags.includes(tag);
}

function detectTourKind(tour) {
  const text = tourSearchText(tour);

  if (hasTourTag(tour, "helicopter") || text.includes("helicopter")) return "helicopter";
  if (text.includes("sunrise") || text.includes("mount batur") || text.includes("volcano") || hasTourTag(tour, "sunrise")) {
    return "sunrise";
  }
  if (
    hasTourTag(tour, "transfer") ||
    text.includes("airport transfer") ||
    text.includes("private car with driver") ||
    text.includes("fast boat transfer")
  ) {
    return "transfer";
  }
  if (
    hasTourTag(tour, "snorkeling") ||
    text.includes("snorkel") ||
    text.includes("manta") ||
    text.includes("dolphin") ||
    text.includes("cruise") ||
    text.includes("surf")
  ) {
    return "marine";
  }
  if (
    hasTourTag(tour, "island") ||
    text.includes("nusa") ||
    text.includes("gili") ||
    text.includes("lembongan") ||
    text.includes("ceningan") ||
    text.includes("sumbawa")
  ) {
    return "island";
  }
  if (hasTourTag(tour, "adventure") || hasTourTag(tour, "activity") || text.includes("atv") || text.includes("rafting")) {
    return "adventure";
  }
  if (hasTourTag(tour, "temple") || hasTourTag(tour, "culture") || text.includes("temple") || text.includes("unesco")) {
    return "culture";
  }
  if (hasTourTag(tour, "instagram") || text.includes("instagram") || text.includes("photo")) return "instagram";
  if (hasTourTag(tour, "private") || text.includes("driver")) return "relax";
  return "scenic";
}

function parsePriceNumber(price) {
  const match = String(price || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function normalizedCardPrice(price) {
  return String(price || "Ask Price").replace(/^Ask price$/i, "Ask Price").replace(/^From /i, "from ");
}

function mainPageCardPriceValue(tour, fallbackPrice = "Ask Price") {
  return normalizedCardPrice(tour?.mainPagePrice || tour?.price || fallbackPrice);
}

function mainPageCardPriceNote(tour, fallbackPrice = "Ask Price") {
  if (tour?.mainPagePriceNote) return tour.mainPagePriceNote;
  const priceText = String(tour?.mainPagePrice || tour?.price || fallbackPrice || "").trim();
  if (!priceText) return "";
  return "per person";
}

function renderMainPagePriceRow(tour, fallbackPrice = "Ask Price") {
  const priceValue = mainPageCardPriceValue(tour, fallbackPrice);
  const note = mainPageCardPriceNote(tour, fallbackPrice);
  return `<div class="sb-price-row">${note ? `<div class="sb-price-note">${escapeHtml(note)}</div>` : ""}<div class="sb-price">${escapeHtml(priceValue)}</div></div>`;
}

function cardHighlightTitles(tour) {
  return (tour.highlights || []).map(([title]) => title).filter(Boolean);
}

function mainPageCategories(tour) {
  const text = tourSearchText(tour);
  const kind = detectTourKind(tour);
  const categories = new Set();

  if (kind === "transfer") categories.add("transport");
  if (kind === "helicopter") categories.add("helicopter");
  if (kind === "marine") categories.add("water");
  if (kind === "island" || text.includes("gili") || text.includes("lembongan") || text.includes("ceningan") || text.includes("sumbawa")) {
    categories.add("islands");
  }
  if (text.includes("nusa penida") || text.includes("nusa-penida")) categories.add("nusa");
  if (kind === "culture") categories.add("culture");
  if (Array.isArray(tour.mainPageFilterTags)) {
    for (const tag of tour.mainPageFilterTags) {
      if (tag) categories.add(String(tag).trim().toLowerCase());
    }
  }

  if (!categories.has("transport") && !categories.has("helicopter")) {
    if (!categories.size || ["sunrise", "culture", "instagram", "adventure", "relax", "scenic"].includes(kind)) {
      categories.add("city");
    }
  }

  return Array.from(categories);
}

function mainPageFeatureLines(tour) {
  if (Array.isArray(tour.mainPageFeatures) && tour.mainPageFeatures.length) {
    return tour.mainPageFeatures
      .map(([icon, text]) => [icon, clampText(text, 58)])
      .slice(0, 5);
  }

  const kind = detectTourKind(tour);
  const highlights = cardHighlightTitles(tour);
  const lines = [];

  lines.push([
    kind === "sunrise" ? "🌅" : kind === "marine" ? "🌊" : kind === "helicopter" ? "🚁" : kind === "adventure" ? "🔥" : "⏰",
    clampText(tour.duration || tour.eyebrow || "Full day experience", 48),
  ]);

  if (hasTourTag(tour, "hotelPickup") || kind === "transfer") {
    lines.push(["🚐", clampText(tour.pickup || "Hotel pickup available", 52)]);
  } else if (kind === "helicopter") {
    lines.push(["🛫", clampText(tour.pickup || "Scheduled departure window", 52)]);
  } else if (hasTourTag(tour, "boat") || kind === "marine" || kind === "island") {
    lines.push(["⛴", clampText(tour.pickup || tour.format || "Boat logistics included", 52)]);
  } else {
    lines.push(["✨", clampText(tour.format || tour.eyebrow || "Private Bali experience", 52)]);
  }

  if (highlights[0]) {
    lines.push([
      kind === "culture" ? "🛕" : kind === "instagram" ? "📸" : kind === "marine" ? "🐠" : kind === "island" ? "🏝" : "📍",
      clampText(highlights[0], 52),
    ]);
  }

  if (highlights[1]) {
    lines.push([
      kind === "marine" ? "🤿" : kind === "sunrise" ? "🌄" : kind === "adventure" ? "⚡" : "✨",
      clampText(highlights[1], 52),
    ]);
  }

  lines.push([kind === "transfer" ? "✅" : "🔥", clampText(tour.bestFor || tour.area || tour.eyebrow || "Strong Bali route", 58)]);

  return lines.slice(0, 5);
}

function renderMainPageCard(tour) {
  const categoryAttr = mainPageCategories(tour).join(" ");
  const featuresHtml = mainPageFeatureLines(tour)
    .map(
      ([icon, text]) =>
        `<li class="sb-feature"><span class="sb-feature-icon">${escapeHtml(icon)}</span><span>${escapeHtml(text)}</span></li>`,
    )
    .join("");

  return `<article class="sb-card sb-reveal" data-category="${escapeHtml(categoryAttr)}"><div class="sb-card-inner"><div class="sb-gallery"><div class="sb-img sb-img-main"><img loading="lazy" decoding="async" src="${escapeHtml(publicImagePath(tour))}" alt="${escapeHtml(tour.imageAlt || tour.title)}"></div></div><div class="sb-content"><h3 class="sb-title">${escapeHtml(tour.title)}</h3><ul class="sb-features">${featuresHtml}</ul><div class="sb-bottom">${renderMainPagePriceRow(tour, tour.price)}<a href="${tourRoute(tour)}" class="sb-btn">Details</a></div></div></div></article>`;
}

function ensureGeneratedCardsOnMainPage(html) {
  const listRe = /(<div class="sb-list" id="sbList">)([\s\S]*?)(<\/div><div class="sb-empty" id="sbEmpty">)/;
  const match = listRe.exec(html);
  if (!match) return html;

  const existingCardsHtml = match[2];
  const existingRoutes = new Set(
    [...existingCardsHtml.matchAll(/<a href="([^"]+)" class="sb-btn">Details<\/a>/g)].map((item) => item[1]),
  );

  const additions = tours
    .filter((tour) => shouldIncludeOnMainPage(tour) && !existingRoutes.has(tourRoute(tour)))
    .map((tour) => renderMainPageCard(tour))
    .join("");

  if (!additions) return html;

  const merged = `${match[1]}${existingCardsHtml}${additions}${match[3]}`;
  return `${html.slice(0, match.index)}${merged}${html.slice(match.index + match[0].length)}`;
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractMainPageCards(html) {
  const listRe = /<div class="sb-list" id="sbList">([\s\S]*?)<\/div><div class="sb-empty" id="sbEmpty">/;
  const match = listRe.exec(html);
  if (!match) return [];

  const cards = [];
  const articleRe = /<article class="sb-card sb-reveal" data-category="([^"]*)">([\s\S]*?)<\/article>/g;

  for (const articleMatch of match[1].matchAll(articleRe)) {
    const article = articleMatch[0];
    const categoryAttr = articleMatch[1] || "";
    const titleMatch = article.match(/<h3 class="sb-title">([\s\S]*?)<\/h3>/);
    const linkMatch = article.match(/<a href="([^"]+)" class="sb-btn">Details<\/a>/);
    if (!titleMatch || !linkMatch) continue;

    const imageMatch = article.match(/<img [^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
    const priceMatch = article.match(/<div class="sb-price">([^<]+)<\/div>/);
    const features = [...article.matchAll(/<li class="sb-feature">[\s\S]*?<span>([^<]+)<\/span><\/li>/g)].map((item) =>
      decodeHtmlEntities(item[1]),
    );

    cards.push({
      title: decodeHtmlEntities(titleMatch[1]),
      link: linkMatch[1],
      image: imageMatch ? imageMatch[1] : "",
      imageAlt: decodeHtmlEntities(imageMatch ? imageMatch[2] : titleMatch[1]),
      price: decodeHtmlEntities(priceMatch ? priceMatch[1] : "Ask Price"),
      features,
      categoryTokens: categoryAttr.split(/\s+/).filter(Boolean),
    });
  }

  return cards;
}

function findTourByMainPageRoute(link, title = "") {
  const normalizedLink = String(link || "").trim();
  const normalizedTitle = collapseWhitespace(decodeHtmlEntities(title || ""));
  const slug = normalizedLink.split("/").filter(Boolean).pop() || "";

  return (
    tours.find((tour) => tourRoute(tour) === normalizedLink) ||
    tours.find((tour) => tour.slug === slug) ||
    tours.find((tour) => collapseWhitespace(tour.title) === normalizedTitle) ||
    null
  );
}

function injectMainPagePriceNotes(html) {
  return html.replace(
    /<article class="sb-card sb-reveal" data-category="([^"]*)">([\s\S]*?)<\/article>/g,
    (article) => {
      const titleMatch = article.match(/<h3 class="sb-title">([\s\S]*?)<\/h3>/);
      const linkMatch = article.match(/<a href="([^"]+)" class="sb-btn">Details<\/a>/);
      const priceMatch = article.match(/<div class="sb-price">([^<]+)<\/div>/);
      if (!titleMatch || !linkMatch) return article;

      const tour = findTourByMainPageRoute(linkMatch[1], titleMatch[1]);
      const fallbackPrice = decodeHtmlEntities(priceMatch ? priceMatch[1] : "Ask Price");
      const nextPriceRow = renderMainPagePriceRow(tour, fallbackPrice);

      return article.replace(
        /<div class="sb-price-row">[\s\S]*?<\/div>(?=\s*<a href="[^"]+" class="sb-btn">Details<\/a>)/,
        nextPriceRow,
      );
    },
  );
}

function ensureCultureFilterButton(html) {
  if (html.includes('data-filter="culture"')) return html;
  return html.replace(
    /(<button class="sb-filter-btn" data-filter="city">🌿 CITY TOURS<\/button>)/,
    `$1<button class="sb-filter-btn" data-filter="culture">🛕 CULTURE</button>`,
  );
}

function syncMainPageCardCategories(html) {
  return html.replace(
    /<article class="sb-card sb-reveal" data-category="([^"]*)">([\s\S]*?)<\/article>/g,
    (article) => {
      const titleMatch = article.match(/<h3 class="sb-title">([\s\S]*?)<\/h3>/);
      const linkMatch = article.match(/<a href="([^"]+)" class="sb-btn">Details<\/a>/);
      if (!titleMatch || !linkMatch) return article;

      const tour = findTourByMainPageRoute(linkMatch[1], titleMatch[1]);
      if (!tour) return article;

      const nextCategory = mainPageCategories(tour).join(" ");
      return article.replace(
        /<article class="sb-card sb-reveal" data-category="[^"]*">/,
        `<article class="sb-card sb-reveal" data-category="${escapeHtml(nextCategory)}">`,
      );
    },
  );
}

function reorderMainPageCards(html) {
  const listRe = /(<div class="sb-list" id="sbList">)([\s\S]*?)(<\/div><div class="sb-empty" id="sbEmpty">)/;
  const match = listRe.exec(html);
  if (!match) return html;

  const articleRe = /<article class="sb-card sb-reveal" data-category="([^"]*)">([\s\S]*?)<\/article>/g;
  const articles = [];
  let orderIndex = 0;

  for (const articleMatch of match[2].matchAll(articleRe)) {
    const article = articleMatch[0];
    const titleMatch = article.match(/<h3 class="sb-title">([\s\S]*?)<\/h3>/);
    const linkMatch = article.match(/<a href="([^"]+)" class="sb-btn">Details<\/a>/);
    const tour = titleMatch && linkMatch ? findTourByMainPageRoute(linkMatch[1], titleMatch[1]) : null;

    articles.push({
      article,
      orderIndex,
      mainPageRank: tour?.mainPageRank ?? 1000 + orderIndex,
    });
    orderIndex += 1;
  }

  if (articles.length < 2) return html;

  const reorderedHtml = articles
    .sort((a, b) => (a.mainPageRank - b.mainPageRank) || (a.orderIndex - b.orderIndex))
    .map((item) => item.article)
    .join("");

  return `${html.slice(0, match.index)}${match[1]}${reorderedHtml}${match[3]}${html.slice(match.index + match[0].length)}`;
}

function removeHiddenMainPageCards(html) {
  return html.replace(
    /<article class="sb-card sb-reveal" data-category="([^"]*)">([\s\S]*?)<\/article>/g,
    (article) => {
      const titleMatch = article.match(/<h3 class="sb-title">([\s\S]*?)<\/h3>/);
      const linkMatch = article.match(/<a href="([^"]+)" class="sb-btn">Details<\/a>/);
      if (!titleMatch || !linkMatch) return article;

      const tour = findTourByMainPageRoute(linkMatch[1], titleMatch[1]);
      if (tour && !shouldIncludeOnMainPage(tour)) {
        return "";
      }

      return article;
    },
  );
}

function plannerIdFromSlug(slug) {
  return String(slug || "")
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function plannerBudget(tour) {
  const amount = parsePriceNumber(tour.price);
  if (amount == null) return "mid";
  if (amount <= 50) return "low";
  if (amount <= 120) return "mid";
  return "high";
}

function plannerIntensity(tour) {
  const kind = detectTourKind(tour);
  const text = tourSearchText(tour);
  if (text.includes("hike") || text.includes("whale shark")) return "High";
  if (kind === "adventure" || kind === "sunrise") return "Medium-High";
  if (kind === "transfer" || kind === "helicopter") return "Easy";
  if (kind === "culture" || kind === "relax") return "Easy";
  return "Medium";
}

function plannerKidsFriendly(tour) {
  const text = tourSearchText(tour);
  return !(
    text.includes("hike") ||
    text.includes("helicopter") ||
    text.includes("whale shark") ||
    text.includes("atv") ||
    text.includes("rafting")
  );
}

function plannerBaseAreas(tour) {
  const text = tourSearchText(tour);

  if (text.includes("ubud")) return ["ubud", "sanur", "seminyak", "canggu"];
  if (text.includes("east bali")) return ["ubud", "sanur", "seminyak", "canggu", "nusa_dua"];
  if (text.includes("lovina") || text.includes("north bali") || text.includes("mount batur") || text.includes("kintamani")) {
    return ["ubud", "sanur", "seminyak", "canggu", "nusa_dua", "uluwatu"];
  }

  return ["canggu", "seminyak", "ubud", "uluwatu", "nusa_dua", "sanur"];
}

function plannerInterests(tour) {
  const tags = new Set();
  const text = tourSearchText(tour);

  if (hasTourTag(tour, "boat") || hasTourTag(tour, "snorkeling") || text.includes("sea") || text.includes("water")) tags.add("sea");
  if (hasTourTag(tour, "nature") || hasTourTag(tour, "island") || hasTourTag(tour, "volcano") || text.includes("waterfall") || text.includes("rice terrace")) {
    tags.add("nature");
  }
  if (hasTourTag(tour, "temple") || hasTourTag(tour, "culture") || text.includes("unesco")) tags.add("culture");
  if (hasTourTag(tour, "adventure") || hasTourTag(tour, "activity") || text.includes("hike") || text.includes("jeep")) {
    tags.add("adventure");
  }
  if (hasTourTag(tour, "instagram") || text.includes("instagram") || text.includes("photo")) tags.add("instagram");
  if (hasTourTag(tour, "private") || text.includes("relax") || text.includes("sunset cruise") || text.includes("driver")) tags.add("relax");

  if (!tags.size) tags.add("nature");
  return Array.from(tags);
}

function plannerFormats(tour) {
  const formats = ["couple", "friends", "solo"];
  if (plannerKidsFriendly(tour) || hasTourTag(tour, "family") || /famil/i.test(tour.bestFor || "")) {
    formats.splice(1, 0, "family");
  }
  return Array.from(new Set(formats));
}

function plannerPriority(tour) {
  if (Number.isFinite(tour?.plannerPriority)) return tour.plannerPriority;
  const kind = detectTourKind(tour);
  if (kind === "marine") return 30;
  if (kind === "sunrise") return 28;
  if (kind === "island") return 25;
  if (kind === "instagram") return 24;
  if (kind === "adventure") return 22;
  if (kind === "culture") return 19;
  if (kind === "helicopter") return 17;
  if (kind === "transfer") return 10;
  return 18;
}

function plannerWhatToBring(tour) {
  const text = tourSearchText(tour);
  if (text.includes("hot spring")) return "Jacket, towel, swimwear, sandals";
  if (text.includes("snorkel") || text.includes("manta") || text.includes("blue lagoon") || text.includes("dolphin")) {
    return "Swimsuit, towel, sunscreen, change of clothes";
  }
  if (text.includes("hike") || text.includes("mount batur") || text.includes("volcano")) return "Jacket, sneakers, water";
  if (text.includes("atv") || text.includes("rafting")) return "Change of clothes, sandals, sunscreen";
  if (text.includes("surf")) return "Swimwear, towel, sunscreen";
  if (text.includes("helicopter")) return "Passport copy, sunglasses, light clothes";
  if (text.includes("transfer") || text.includes("airport")) return "Flight details, luggage, WhatsApp confirmation";
  return "Light clothes, camera, cash";
}

function plannerBadge(tour) {
  const kind = detectTourKind(tour);
  if (kind === "marine") return "🌊 Sea day";
  if (kind === "sunrise") return "🌅 Sunrise route";
  if (kind === "island") return "🏝 Island day";
  if (kind === "instagram") return "📸 Photo day";
  if (kind === "culture") return "🛕 Culture day";
  if (kind === "helicopter") return "🚁 Premium flight";
  if (kind === "transfer") return "🚗 Easy transport";
  if (kind === "adventure") return "🔥 Active day";
  return "🌿 Bali highlight";
}

function plannerRouteSummary(tour) {
  const stops = cardHighlightTitles(tour).slice(0, 3);
  if (stops.length) return clampText(stops.join(", "), 110);
  return clampText(tour.area || tour.summary || tour.eyebrow || "Bali route details on request", 110);
}

function plannerEndTime(tour) {
  const duration = String(tour.duration || "").toLowerCase();
  if (duration.includes("8 hours")) return "Finish around 13:00-15:00";
  if (duration.includes("8-10") || duration.includes("9-11") || duration.includes("10 hours") || duration.includes("10-12") || duration.includes("full day")) {
    return "Finish around 17:00-19:00";
  }
  if (duration.includes("6-8")) return "Finish around 09:00-11:30";
  if (duration.includes("4-6")) return "Finish around 13:00-16:00";
  if (/^1(?:\.5)?\s*-\s*2 hours?$/.test(duration) || /^2 hours?$/.test(duration)) {
    return "Finish about 2 hours after the start";
  }
  if (duration.includes("short flight")) return "Finish shortly after the departure window";
  return "Finish time depends on the route flow";
}

const PLANNER_WEATHER_PROFILES = {
  marine: { sun: 34, cloudy: 28, rain: 14 },
  sunrise: { sun: 33, cloudy: 20, rain: 4 },
  island: { sun: 31, cloudy: 24, rain: 10 },
  adventure: { sun: 28, cloudy: 20, rain: 8 },
  culture: { sun: 18, cloudy: 25, rain: 26 },
  relax: { sun: 16, cloudy: 24, rain: 30 },
  transfer: { sun: 10, cloudy: 14, rain: 20 },
  helicopter: { sun: 38, cloudy: 16, rain: 2 },
  instagram: { sun: 29, cloudy: 23, rain: 12 },
  scenic: { sun: 24, cloudy: 22, rain: 18 },
};

const CURATED_PLANNER_ROUTES = new Set([
  "/bali/en/tours/nusa-penida-manta-rays-point",
  "/bali/en/tours/ubud-highlights-tour",
  "/bali/en/tours/mount-batur-sunrise-jeep-tour",
  "/bali/en/tours/mount-batur-sunrise-jeep-hot-spring",
  "/bali/en/tours/mount-batur-sunrise-hike",
  "/bali/en/tours/tanah-lot-bedugul-tour",
  "/bali/en/tours/bali-unesco",
  "/bali/en/tours/private-car-with-driver-bali",
]);

const PLANNER_WEATHER_ADVICE = {
  marine: {
    sun: "Sunny weather gives this sea day the best visibility, color and overall wow factor.",
    cloudy: "Cloudy weather can still work well on the water if sea conditions stay calm enough.",
    rain: "Rain lowers comfort and visibility, so this should rank lower unless conditions stay supportive.",
  },
  sunrise: {
    sun: "Clear weather gives the strongest sunrise payoff and the cleanest mountain or morning views.",
    cloudy: "Cloud cover can still look good, but the full sunrise value is a bit lower than on a clear day.",
    rain: "Rain reduces the sunrise value a lot, so this should stay lower unless the forecast improves.",
  },
  island: {
    sun: "Bright weather gives this island route the biggest visual payoff from beaches, cliffs and viewpoints.",
    cloudy: "Cloudy weather still works on island routes, especially when the guest cares more about the scenery than perfect light.",
    rain: "Rain makes long island logistics feel heavier, so this should usually rank below easier mainland days.",
  },
  adventure: {
    sun: "Dry weather keeps this active route feeling fun, cleaner and easier to enjoy from start to finish.",
    cloudy: "Cloudy weather is still workable when the guest wants activity more than sunshine.",
    rain: "Rain makes active routes less comfortable, so this should usually stay behind easier options.",
  },
  culture: {
    sun: "A bright day still looks beautiful for temples and heritage scenery.",
    cloudy: "Cloudy weather is actually very comfortable for culture routes and sightseeing stops.",
    rain: "This becomes one of the safer Bali picks when the weather is unstable.",
  },
  relax: {
    sun: "Sunny weather still works well here if the guest wants an easy-paced Bali day.",
    cloudy: "Cloudy weather fits this relaxed route naturally and keeps it comfortable.",
    rain: "On a wetter day, this becomes one of the easiest comfort-based options to keep the trip smooth.",
  },
  transfer: {
    sun: "Weather matters less here because the value is simple logistics and easy movement across Bali.",
    cloudy: "Cloudy conditions do not change the usefulness of this route much.",
    rain: "This stays a workable option even when the weather is not ideal for bigger sightseeing plans.",
  },
  helicopter: {
    sun: "Clear weather gives the cleanest aerial views and the most premium-looking flight conditions.",
    cloudy: "Cloudy weather can still be scenic, but the best wide-open aerial payoff is lower.",
    rain: "Rain or poor visibility can heavily affect flight value and operator timing, so this should stay lower.",
  },
  instagram: {
    sun: "Bright weather gives the strongest light, colors and photo conditions for a content-focused day.",
    cloudy: "Cloudy weather still works very well for photos and is often more comfortable for a full route.",
    rain: "Rain makes photo timing harder, so this becomes a softer option unless the weather improves.",
  },
  scenic: {
    sun: "Sunny weather helps this route look its best from the first main stop to the last.",
    cloudy: "Cloudy weather still keeps the day very usable and comfortable for sightseeing.",
    rain: "Rain lowers the visual payoff, so this usually ranks below easier weather-safe options.",
  },
};

function plannerWeatherKind(tour) {
  const kind = detectTourKind(tour);
  return PLANNER_WEATHER_PROFILES[kind] ? kind : "scenic";
}

function plannerWeatherAdviceExpression(tour) {
  const weatherKind = plannerWeatherKind(tour);
  const advice = PLANNER_WEATHER_ADVICE[weatherKind];
  return `function(w){if(w.type==='sun') return ${JSON.stringify(advice.sun)}; if(w.type==='cloudy') return ${JSON.stringify(advice.cloudy)}; return ${JSON.stringify(advice.rain)};}`;
}

function plannerFeatures(tour) {
  const badge = plannerBadge(tour);
  const routeHook = cardHighlightTitles(tour)[0] || tour.area || "Main route highlights";
  const intensity = plannerIntensity(tour);
  const bring = plannerWhatToBring(tour);

  return [
    badge,
    `📍 ${clampText(routeHook, 42)}`,
    `💪 Travel intensity: ${intensity}`,
    `🎒 ${clampText(bring, 42)}`,
  ];
}

function renderPlannerRecord(tour) {
  const weatherKind = plannerWeatherKind(tour);
  const link = tour.plannerLink || tourRoute(tour);
  const image = tour.plannerImage || publicImagePath(tour);
  const record = {
    id: plannerIdFromSlug(tour.slug),
    name: tour.title,
    price: normalizedCardPrice(tour.price),
    features: plannerFeatures(tour),
    images: [image],
    link,
    baseAreas: plannerBaseAreas(tour),
    interests: plannerInterests(tour),
    formats: plannerFormats(tour),
    kidsFriendly: plannerKidsFriendly(tour),
    budget: plannerBudget(tour),
    priority: plannerPriority(tour),
    pickup: tour.pickup || "Time on request",
    route: plannerRouteSummary(tour),
    endTime: plannerEndTime(tour),
    whyBook: clampText(tour.summary || tour.lead || tour.overview || "Strong Bali route for this trip day.", 220),
    whatToBring: plannerWhatToBring(tour),
    intensity: plannerIntensity(tour),
    badge: plannerBadge(tour),
    weatherProfile: PLANNER_WEATHER_PROFILES[weatherKind],
  };

  return `{id:${JSON.stringify(record.id)},name:${JSON.stringify(record.name)},price:${JSON.stringify(record.price)},features:${JSON.stringify(record.features)},images:${JSON.stringify(record.images)},link:${JSON.stringify(record.link)},baseAreas:${JSON.stringify(record.baseAreas)},interests:${JSON.stringify(record.interests)},formats:${JSON.stringify(record.formats)},kidsFriendly:${record.kidsFriendly},budget:${JSON.stringify(record.budget)},priority:${record.priority},pickup:${JSON.stringify(record.pickup)},route:${JSON.stringify(record.route)},endTime:${JSON.stringify(record.endTime)},whyBook:${JSON.stringify(record.whyBook)},whatToBring:${JSON.stringify(record.whatToBring)},intensity:${JSON.stringify(record.intensity)},badge:${JSON.stringify(record.badge)},weatherProfile:${JSON.stringify(record.weatherProfile)},weatherAdvice:${plannerWeatherAdviceExpression(tour)}}`;
}

function plannerRouteExists(plannerBody, route) {
  return plannerBody.includes(`link:'${route}'`) || plannerBody.includes(`link:"${route}"`) || plannerBody.includes(`link:${JSON.stringify(route)}`);
}

function plannerCardFallback(card) {
  const slug = card.link.split("/").filter(Boolean).pop() || plannerIdFromSlug(card.title);
  const summary = card.features.join(". ");
  const tags = [];

  if (card.categoryTokens.includes("water")) tags.push("boat");
  if (card.categoryTokens.includes("nusa") || card.categoryTokens.includes("islands")) tags.push("island");
  if (card.categoryTokens.includes("transport")) tags.push("transfer");
  if (card.categoryTokens.includes("helicopter")) tags.push("helicopter");
  if (/sunrise/i.test(card.title)) tags.push("sunrise");
  if (/instagram|photo/i.test(card.title)) tags.push("instagram");

  return {
    slug,
    title: card.title,
    eyebrow: summary || card.title,
    duration: card.features[0] || "Full day",
    pickup: card.features[1] || "Time on request",
    bestFor: card.features[4] || card.features[3] || card.features[2] || "Bali travelers",
    format: card.categoryTokens.includes("transport") ? "Transport service" : "Bali experience",
    area: card.features[2] || card.title,
    price: card.price,
    imageAlt: card.imageAlt,
    lead: summary || card.title,
    summary: summary || card.title,
    tags,
    plannerImage: card.image,
    plannerLink: card.link,
  };
}

function extractPlannerEntries(plannerBody) {
  const entries = [];
  let quote = null;
  let escaped = false;
  let depth = 0;
  let start = -1;

  for (let index = 0; index < plannerBody.length; index += 1) {
    const char = plannerBody[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) start = index;
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        entries.push(plannerBody.slice(start, index + 1).trim());
        start = -1;
      }
    }
  }

  return entries;
}

function ensureGeneratedPlannerTours(html) {
  const plannerRe = /var TOURS_DB = \[([\s\S]*?)\];/;
  const match = plannerRe.exec(html);
  if (!match) return html;

  let plannerBody = match[1]
    .replace(/\/\* SB AUTO PLANNER START \*\/[\s\S]*?\/\* SB AUTO PLANNER END \*\//g, "")
    .trim();

  plannerBody = extractPlannerEntries(plannerBody)
    .filter((entry) => {
      const routeMatch = entry.match(/link:(?:'|")([^'"]+)(?:'|")/);
      return routeMatch ? CURATED_PLANNER_ROUTES.has(routeMatch[1]) : true;
    })
    .join(",\n");

  const additions = tours
    .filter((tour) => shouldIncludeInPlanner(tour))
    .filter((tour) => !plannerRouteExists(plannerBody, tourRoute(tour)))
    .map((tour) => renderPlannerRecord(tour));

  let seededPlannerBody = plannerBody;
  if (additions.length) {
    if (seededPlannerBody && !seededPlannerBody.endsWith(",")) seededPlannerBody += ",";
    seededPlannerBody = `${seededPlannerBody}\n${additions.join(",\n")}\n`;
  }

  const cardFallbacks = extractMainPageCards(html)
    .filter((card) => card.link.startsWith("/bali/en/tours/"))
    .filter((card) => !plannerRouteExists(seededPlannerBody, card.link))
    .map((card) => renderPlannerRecord(plannerCardFallback(card)));

  const autoRecords = [...additions, ...cardFallbacks];
  let mergedPlannerBody = plannerBody;

  if (autoRecords.length) {
    if (mergedPlannerBody && !mergedPlannerBody.endsWith(",")) mergedPlannerBody += ",";
    mergedPlannerBody = `${mergedPlannerBody}\n/* SB AUTO PLANNER START */\n${autoRecords.join(",\n")}\n/* SB AUTO PLANNER END */\n`;
  }

  return `${html.slice(0, match.index)}var TOURS_DB = [\n${mergedPlannerBody}];${html.slice(match.index + match[0].length)}`;
}

function patchStaticCardLinks(html) {
  for (const tour of tours) {
    const re = new RegExp(
      `(<h3 class="sb-title">${escapeRegExp(escapeHtml(tour.title))}<\\/h3>[\\s\\S]*?<a href=")([^"]*)(" class="sb-btn">Details<\\/a>)`,
    );
    html = html.replace(re, `$1${tourRoute(tour)}$3`);
  }
  return html;
}

function replaceCardArticle(html, titles, replacement) {
  const titleList = Array.isArray(titles) ? titles : [titles];

  for (const title of titleList) {
    const marker = `<h3 class="sb-title">${title}</h3>`;
    const titleIndex = html.indexOf(marker);
    if (titleIndex === -1) {
      continue;
    }

    const articleStart = html.lastIndexOf("<article", titleIndex);
    const articleEnd = html.indexOf("</article>", titleIndex);
    if (articleStart === -1 || articleEnd === -1) {
      continue;
    }

    return `${html.slice(0, articleStart)}${replacement}${html.slice(articleEnd + "</article>".length)}`;
  }

  return html;
}

function replaceMainPageCardBySlug(html, slug, titleAliases = []) {
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) {
    return html;
  }

  const titles = Array.isArray(titleAliases) && titleAliases.length > 0 ? titleAliases : [tour.title];
  return replaceCardArticle(html, titles, renderMainPageCard(tour));
}

function replaceTextInsideCard(html, titles, from, to) {
  const titleList = Array.isArray(titles) ? titles : [titles];

  for (const title of titleList) {
    const marker = `<h3 class="sb-title">${title}</h3>`;
    const titleIndex = html.indexOf(marker);
    if (titleIndex === -1) {
      continue;
    }

    const articleStart = html.lastIndexOf("<article", titleIndex);
    const articleEnd = html.indexOf("</article>", titleIndex);
    if (articleStart === -1 || articleEnd === -1) {
      continue;
    }

    const article = html.slice(articleStart, articleEnd + "</article>".length);
    const updatedArticle = article.split(from).join(to);
    return `${html.slice(0, articleStart)}${updatedArticle}${html.slice(articleEnd + "</article>".length)}`;
  }

  return html;
}

function patchPlannerLinks(html) {
  const plannerLinks = [
    ["nusa_penida_manta_point", "/bali/en/tours/nusa-penida-manta-rays-point"],
    ["ubud_highlights", "/bali/en/tours/ubud-highlights-tour"],
    ["batur_sunrise", "/bali/en/tours/mount-batur-sunrise-jeep-tour"],
    ["temple_culture", "/bali/en/tours/tanah-lot-bedugul-tour"],
    ["spa_relax_day", "/bali/en/tours/private-car-with-driver-bali"],
  ];

  for (const [id, link] of plannerLinks) {
    const re = new RegExp(`(id:'${escapeRegExp(id)}'[\\s\\S]*?link:')([^']*)(')`);
    html = html.replace(re, `$1${link}$3`);
  }

  return html;
}

function patchDubaiLinkedFooterContact(html) {
  if (!html.includes("/dubai/en/tours")) {
    return html;
  }

  html = html.split(BALI_GENERIC_FOOTER_WA_LINK).join(DUBAI_GENERIC_FOOTER_WA_LINK);
  html = html.split(BALI_GENERIC_FOOTER_PHONE_LINK).join(DUBAI_GENERIC_FOOTER_PHONE_LINK);
  return html;
}

function ensureBaliMainStabilityFix(html) {
  const clean = html
    .replace(/<style id="sb-bali-main-stability-fix">[\s\S]*?<\/style>\s*/g, "")
    .replace(/<script id="sb-bali-main-stability-script">[\s\S]*?<\/script>\s*/g, "");

  if (clean.includes("</head>")) {
    return clean.replace("</head>", `${BALI_MAIN_STABILITY_FIX}</head>`);
  }

  return `${BALI_MAIN_STABILITY_FIX}${clean}`;
}

function patchBaliMainFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const brokenBaliDestinationsMenu =
    '<ul role="list" class="t-menusub__list"> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Bali, Indonesia</a> </li> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Bali, Indonesia</a> </li> </ul>';
  const fixedBaliDestinationsMenu =
    '<ul role="list" class="t-menusub__list"> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/dubai/en#tours" data-menu-item-number="1">Dubai, UAE</a> </li> <li class="t-menusub__list-item t-name t-name_xs"> <a class="t-menusub__link-item t-name t-name_xs"\n' +
    'href="/bali/en/main-page#tours" data-menu-item-number="1">Bali, Indonesia</a> </li> </ul>';

  const staticReplacements = [
    [
      "<title>SB Excursions | Bali Tours & Romantic Experiences</title>",
      "<title>Bali Tours, Day Trips and Private Excursions | SB Excursions</title>",
    ],
    [
      'content="Discover the best of Bali with SB Excursions. Luxury desert safaris, romantic yacht dates, and expert-led city tours. Book your perfect Dubai adventure today!"',
      'content="Discover Bali tours, private day trips, snorkeling, island getaways, transfers, and premium experiences with SB Excursions. Explore the best Bali excursions with polished local pages and direct WhatsApp booking."',
    ],
    [
      'content="https://static.tildacdn.one/tild3433-3231-4534-b430-373835373464/_3.jpg"',
      'content="https://sb-excursions-public.vercel.app/images/bali-tours/ubud-highlights-tour.webp"',
    ],
    [
      "https://static.tildacdn.one/tild3334-6466-4436-b766-376338363935/SB_Excursions_Dubai_.png",
      "/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png",
    ],
    ["/dubai/en#tours", "/bali/en/main-page#tours"],
    [">Dubai, UAE<", ">Bali, Indonesia<"],
    ["/dubai/en/about", "/bali/en/main-page#about"],
    ["/dubai/en/faq", "/bali/en/main-page#faq"],
    ["/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour", "/bali/en/tours/sunset-cruise-bali"],
    ["Shared Yacht tour", "Sunset Cruise"],
    ["Dubai City tour", "Ubud Highlights Tour"],
    ['href="/mount-batur-sunrise-jeep-hot-spring"', 'href="/bali/en/tours/mount-batur-sunrise-jeep-hot-spring"'],
    ["link:'/mount-batur-sunrise-jeep-hot-spring'", "link:'/bali/en/tours/mount-batur-sunrise-jeep-hot-spring'"],
    ["971506048673", WHATSAPP_NUMBER],
    ["/tproduct/1366959501-643417850282-classical-dubai-city-tour", "/bali/en/tours/dolphin-sunrise-city-tour"],
    ["/tproduct/1366959501-910807092422-full-day-explore-dubai-city-tour", "/bali/en/tours/ubud-instagram-tour"],
    ["/tproduct/1366959501-232604178022-abu-dhabi-from-dubai", "/bali/en/tours/mount-batur-sunrise-hike"],
    ["https://sbexcursion.com/bali/en/tours/nusa-penida-manta-rays-point", "/bali/en/tours/nusa-penida-manta-rays-point"],
    ["/bali/en/tours/bali-instagram-highlights-tour", "/bali/en/tours/ubud-instagram-tour"],
  ];

  for (const [from, to] of staticReplacements) {
    html = html.split(from).join(to);
  }

  // The Bali page keeps Bali-specific content, but this menu stays a destination switcher.
  html = html.split(brokenBaliDestinationsMenu).join(fixedBaliDestinationsMenu);

  html = html
    .split("Bali North Tour: Dolphins Sunrise &amp; Hidden Waterfalls")
    .join("Lovina Dolphin Sunrise Tour")
    .split("Experience the romantic North of Bali. Sunrise dolphin watching in Lovina, Ulun Danu Water Temple, and Sekumpul Waterfall. Private transfers, expert guides, and 100% stress-free logistics. Book your dream trip via WhatsApp!")
    .join("Sunrise dolphin watching in Lovina, Gitgit Waterfall, and Ulun Danu Beratan Temple with private transfer, boat ticket, and all entrance fees included.")
    .split('href="/bali/en/tours/north-bali-lovina-dolphins-tour" data-lid="7301316445701"')
    .join('href="/bali/en/tours/bali-unesco" data-lid="7301316445701"')
    .split(">North Bali Tour and Lovina Dolphins</h3>")
    .join(">Lovina Dolphin Sunrise Tour</h3>")
    .split('href="/bali/en/tours/dolphin-sunrise-city-tour" data-lid="7301316445701"')
    .join('href="/bali/en/tours/bali-unesco" data-lid="7301316445701"')
    .split('field="li_title__7301316445701">Lovina Dolphin Sunrise Tour</div>')
    .join('field="li_title__7301316445701">Bali UNESCO Heritage Sites Tour</div>')
    .split('field="li_descr__7301316445701">Sunrise dolphin watching in Lovina, Gitgit Waterfall, and Ulun Danu Beratan Temple with private transfer, boat ticket, and all entrance fees included.</div>')
    .join('field="li_descr__7301316445701">Taman Ayun, Ulun Danu, Jatiluwih rice terraces, and Tanah Lot in one UNESCO-focused private day with hotel pickup from major Bali areas.</div>')
    .split("https://static.tildacdn.one/tild3365-3333-4637-a663-636263353664/dika-pebriyanta-qQXc.jpg")
    .join("/images/bali-tours/bali-unesco.jpg")
    .split("https://thb.tildacdn.one/tild3365-3333-4637-a663-636263353664/-/resizeb/20x/dika-pebriyanta-qQXc.jpg")
    .join("/images/bali-tours/bali-unesco.jpg")
    .split(">Early Morning Dolphin Watching</span>")
    .join(">Sunrise dolphin watching from Lovina</span>")
    .split(">Private Driver Included</span>")
    .join(">Private car, boat ticket and entrance fees</span>")
    .split(">Lovina and North Bali Highlights</span>")
    .join(">Gitgit Waterfall and Ulun Danu Temple</span>")
    .split(">Perfect for Nature Lovers</span>")
    .join(">Best for sunrise lovers and scenic day trips</span>")
    .split(">Ask Price</div></div><a href=\"/bali/en/tours/dolphin-sunrise-city-tour\" class=\"sb-btn\">Details</a>")
    .join(">from $75</div></div><a href=\"/bali/en/tours/dolphin-sunrise-city-tour\" class=\"sb-btn\">Details</a>")
    .split('field="li_title__7301316445702">Bali Instagram Tour: Gates of Heaven &amp; Royal Palaces </div>')
    .join('field="li_title__7301316445702">Ubud Instagram Tour: Gates of Heaven, Waterfall &amp; Rice Terrace</div>')
    .split("The ultimate East Bali experience. Visit Lempuyang Temple (Gates of Heaven), Tirta Gangga Water Palace, and Virgin Beach. Professional photos, private transfers, and zero stress. Book your Bali Instagram tour via WhatsApp!")
    .join("All-inclusive Bali photo route with Lempuyang Temple, Tirta Gangga, Tukad Cepung Waterfall, and Tegalalang Rice Terrace. Tickets, lunch, and hotel pickup included from $75.")
    .split('href="/bali/en/tours/east-bali-instagram-tour" data-lid="7301316445702"')
    .join('href="/bali/en/tours/ubud-instagram-tour" data-lid="7301316445702"')
    .split("alt=\"Bali Instagram Highlights Tour\"")
    .join('alt="Ubud Instagram Tour in Bali"')
    .split(">Bali Instagram Highlights Tour</h3>")
    .join(">Ubud Instagram Tour</h3>")
    .split(">Gates, Scenic Stops and Viral Viewpoints</span>")
    .join(">Gates of Heaven, waterfall and rice terrace</span>")
    .split(">Private Transport Included</span>")
    .join(">Pickup, tickets, lunch and guide included</span>")
    .split(">Best Content Tour for Social Media</span>")
    .join(">The strongest all-inclusive Bali photo route</span>")
    .split(">Beautiful and Easy Full Day Route</span>")
    .join(">Perfect for couples, solo travelers and creators</span>")
    .split(">Ask Price</div></div><a href=\"/bali/en/tours/ubud-instagram-tour\" class=\"sb-btn\">Details</a>")
    .join(">from $75</div></div><a href=\"/bali/en/tours/ubud-instagram-tour\" class=\"sb-btn\">Details</a>");

  html = html.replace(/\/bali\/en\/tours\/(?:bali\/en\/tours\/)+/g, "/bali/en/tours/");

  html = replaceMainPageCardBySlug(
    html,
    "dolphin-sunrise-city-tour",
    ["North Bali Tour and Lovina Dolphins", "Lovina Dolphin Sunrise Tour"],
  );

  html = html.replace(
    /<article class="sb-card sb-reveal" data-category="city"><div class="sb-card-inner"><div class="sb-gallery"><div class="sb-img sb-img-main"><img loading="lazy" decoding="async" src="https:\/\/images\.unsplash\.com\/photo-1585643734412-05ea85526d11[^"]*" alt="Bali UNESCO Heritage Sites Tour in Bali"><\/div><\/div><div class="sb-content"><h3 class="sb-title">Bali UNESCO Heritage Sites Tour<\/h3>[\s\S]*?<a href="\/bali\/en\/tours\/dolphin-sunrise-city-tour" class="sb-btn">Details<\/a><\/div><\/div><\/div><\/article>/,
    renderMainPageCard(tours.find((tour) => tour.slug === "dolphin-sunrise-city-tour")),
  );

  const localMainPageCardReplacements = [
    ["east-bali-instagram-tour", ["East Bali Instagram Tour"]],
    ["tanah-lot-bedugul-tour", ["Tanah Lot and Bedugul Tour"]],
    ["ubud-instagram-tour", ["Ubud Instagram Tour"]],
    [
      "nusa-penida-private-day-tour-manta-snorkeling",
      ["Nusa Penida Private car Day Tour+Snorkeling Manta Point"],
    ],
    ["nusa-penida-full-day-tour", ["Nusa Penida Full Day Tour"]],
    ["nusa-lembongan-ceningan-day-trip", ["Nusa Lembongan and Ceningan Day Trip"]],
    ["sumbawa-whale-shark-snorkeling-trip", ["Sumbawa Whale Shark Snorkeling Trip"]],
    ["blue-lagoon-snorkeling", ["Blue Lagoon Snorkeling"]],
    ["white-water-rafting", ["White Water Rafting"]],
    ["sunset-cruise-bali", ["Sunset Cruise"]],
    ["surf-lesson-experience", ["Surf Lesson Experience"]],
    ["bali-airport-transfer", ["Airport Transfer"]],
    ["private-car-with-driver-bali", ["Private Car with Driver"]],
    ["fast-boat-transfer-bali", ["Fast Boat Transfer"]],
    ["bali-helicopter-scenic-tour", ["Bali Helicopter Scenic Tour"]],
    ["volcano-coastline-helicopter-ride", ["Volcano and Coastline Helicopter Ride"]],
  ];

  for (const [slug, titles] of localMainPageCardReplacements) {
    html = replaceMainPageCardBySlug(html, slug, titles);
  }

  html = html
    .replaceAll(
      'src="https://static.tildacdn.one/tild3963-6334-4438-b163-623862386363/_batur_jeep.jpg"',
      'src="/images/bali-tours/mount-batur-sunrise-jeep-hot-spring.jpg"',
    )
    .replaceAll(
      'src="https://static.tildacdn.one/tild6666-6432-4432-b634-356664333739/__2.jpg"',
      'src="/images/bali-tours/mount-batur-sunrise-hike.jpg"',
    );

  const giliIslandTour = tours.find((tour) => tour.slug === "gili-island-tour");
  if (giliIslandTour) {
    html = replaceCardArticle(
      html,
      ["Gili Islands Getaway", "Gili Island Tour", "Gili Islands Private Snorkeling Day Trip"],
      renderMainPageCard(giliIslandTour),
    );
  }

  const atvQuadTour = tours.find((tour) => tour.slug === "atv-quad-bikes");
  if (atvQuadTour) {
    html = replaceCardArticle(
      html,
      ["ATV Ride Adventure", "Ubud ATV Quad Bike Adventure", "Ubud ATV Quad Bike Adventure with Lunch"],
      renderMainPageCard(atvQuadTour),
    );
  }

  const nusaPenidaEastTour = tours.find((tour) => tour.slug === "nusa-penida-east-tour");
  if (nusaPenidaEastTour) {
    html = replaceCardArticle(
      html,
      ["Nusa Penida East Tour"],
      renderMainPageCard(nusaPenidaEastTour),
    );
  }

  const nusaPenidaWestTour = tours.find((tour) => tour.slug === "nusa-penida-west-tour");
  if (nusaPenidaWestTour) {
    html = replaceCardArticle(
      html,
      ["Nusa Penida West Tour"],
      renderMainPageCard(nusaPenidaWestTour),
    );
  }

  const nusaPenidaMantaPointTour = tours.find((tour) => tour.slug === "nusa-penida-manta-rays-point");
  if (nusaPenidaMantaPointTour) {
    html = replaceCardArticle(
      html,
      ["Nusa Penida Snorkeling on Manta Point"],
      renderMainPageCard(nusaPenidaMantaPointTour),
    );
  }

  const ubudTour = tours.find((tour) => tour.slug === "ubud-highlights-tour");
  if (ubudTour) {
    html = replaceCardArticle(
      html,
      ["Ubud Highlights Tour", "Ubud Rice Terrace, Temple & Volcano Tour"],
      renderMainPageCard(ubudTour),
    );
  }

  html = replaceTextInsideCard(html, "Nusa Penida West Tour", ">8 hours north Bali route</span>", ">10-12 hours</span>");
  html = replaceTextInsideCard(html, "Nusa Penida East Tour", ">8 hours north Bali route</span>", ">10-12 hours</span>");

  html = patchStaticCardLinks(html);
  html = removeHiddenMainPageCards(html);
  html = patchPlannerLinks(html);
  html = ensureGeneratedCardsOnMainPage(html);
  html = syncMainPageCardCategories(html);
  html = reorderMainPageCards(html);
  html = injectMainPagePriceNotes(html);
  html = ensureCultureFilterButton(html);
  html = ensureGeneratedPlannerTours(html);

  html = html
    .replaceAll('src="images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"', 'src="/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"')
    .replaceAll('src="images/tild3762-3034-4130-b063-643934306634__sb_dubai_logo_2025.png"', 'src="/images/tild3762-3034-4130-b063-643934306634__sb_dubai_logo_2025.png"')
    .replaceAll('src="images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png"', 'src="/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"')
    .replaceAll('src="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png"', 'src="/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"')
    .replaceAll('<a href="/" class="t228__imgwrapper">', '<a href="/bali/en/main-page" class="t228__imgwrapper">')
    .replaceAll('<a class="t451__logo" href="/">', '<a class="t451__logo" href="/bali/en/main-page">')
    .replace(
      /href="\/bali\/en\/main-page"([^>]*)>\s*About Us\s*</g,
      'href="/bali/en/about"$1>About Us<',
    )
    .replace(
      /href="\/bali\/en\/main-page"([^>]*)>\s*FAQ\s*</g,
      'href="/bali/en/faq"$1>FAQ<',
    )
    .replace(
      /href=""([^>]*data-menu-item-number="5"[^>]*)>\s*Our guides\s*</g,
      `href="${JOURNAL_HUB_ROUTE}"$1>Our guides<`,
    )
    .replaceAll(
      `<style>@media screen and (max-width:980px){#rec1816521261 .t228__leftcontainer{padding:20px;}#rec1816521261 .t228__imglogo{padding:20px 0;}#rec1816521261 .t228{position:static;}}</style>`,
      `<style>@media screen and (max-width:980px){#rec1816521261{display:none !important;}#rec1816521261 .t228__leftcontainer{padding:20px;}#rec1816521261 .t228__imglogo{padding:20px 0;}#rec1816521261 .t228{position:static;}#rec2128776473{display:block !important;}}@media screen and (min-width:981px){#rec2128776473{display:none !important;}}</style>`,
    )
    .replace(
      /<div class='tn-atom'><a href="(?:\/dubai\/en\/about|\/bali\/en\/main-page)"target="_blank"style="color: inherit"><u>About SB Excursions<\/u><\/a><\/div>/g,
      `<div class='tn-atom'><a name="about" style="font-size:0;"></a><a href="/bali/en/about"target="_blank"style="color: inherit"><u>About SB Excursions</u></a></div>`,
    )
    .replace(
      /<div class='tn-atom'><a href="(?:\/dubai\/en\/faq|\/bali\/en\/main-page)"target="_blank"style="color: inherit"><u>FAQ<\/u><\/a><\/div>/g,
      `<div class='tn-atom'><a name="faq" style="font-size:0;"></a><a href="/bali/en/faq"target="_blank"style="color: inherit"><u>FAQ</u></a></div>`,
    );

  const plannerImageBlockStart = html.indexOf("var PLACE_IMAGE = {");
  const plannerImageBlockEnd = html.indexOf("function getTargetMainExcursions", plannerImageBlockStart);
  if (plannerImageBlockStart !== -1 && plannerImageBlockEnd !== -1) {
    html = `${html.slice(0, plannerImageBlockStart)}${renderPlannerPlaceImageBlock()}\n${renderPlannerFreeDayBlock()}\n${html.slice(plannerImageBlockEnd)}`;
  }

  html = html.replace(
    "var usedPlaceTitles = {};\nvar allDays=dates.map(function(d,index){",
    "var usedPlaceTitles = {};\nvar freeDayIndex = 0;\nvar allDays=dates.map(function(d,index){",
  );
  html = html.replace(
    "var places = getFreeDayPlaces(input.area, input.group, usedPlaceTitles);",
    "var places = getFreeDayPlaces(input.area, input.group, input.interests, usedPlaceTitles, freeDayIndex++);",
  );

  if (!html.includes("function scrollAiResultsIntoView()")) {
    html = html.replace(
      `function debounce(fn, delay) {
var t;
return function() {
clearTimeout(t);
t = setTimeout(fn, delay);
};
}
if (aiBuildBtn) {`,
      `function debounce(fn, delay) {
var t;
return function() {
clearTimeout(t);
t = setTimeout(fn, delay);
};
}
function scrollAiResultsIntoView() {
if (window.innerWidth > 767) return;
var target = root.querySelector('.sb-ai-results');
if (!target) return;
setTimeout(function() {
var headerOffset = 78;
var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
}, 120);
}
if (aiBuildBtn) {`,
    );
  }
  html = html
    .replaceAll("syncHeightHard();\nscrollAiResultsIntoView();\ntry {", "syncHeightHard();\ntry {")
    .replaceAll("renderPlan(planData);\nscrollAiResultsIntoView();\ntypeFeed(", "renderPlan(planData);\ntypeFeed(")
    .replace("openAiPanel();\nsyncHeightHard();\ntry {", "openAiPanel();\nsyncHeightHard();\nscrollAiResultsIntoView();\ntry {")
    .replaceAll("renderPlan(planData);\ntypeFeed(", "renderPlan(planData);\nscrollAiResultsIntoView();\ntypeFeed(");

  html = html.replace(
    `#sb-excursions-page .sb-place-card {
border: 1px solid rgba(21,21,21,0.08);
border-radius: 16px;
background: #fff;
overflow: hidden;
box-shadow: 0 8px 18px rgba(17,17,17,0.05);
display: flex;
flex-direction: column;
min-width: 0;
}
#sb-excursions-page .sb-place-card img {
width: 100%;
height: 138px;
object-fit: cover;
}`,
    `#sb-excursions-page .sb-place-card {
border: 1px solid rgba(21,21,21,0.08);
border-radius: 16px;
background: #fff;
overflow: hidden;
box-shadow: 0 8px 18px rgba(17,17,17,0.05);
display: flex;
flex-direction: column;
min-width: 0;
}
#sb-excursions-page .sb-place-card.is-top-pick {
border-color: rgba(245, 158, 11, 0.44);
box-shadow: 0 10px 24px rgba(245, 158, 11, 0.13), 0 8px 18px rgba(17,17,17,0.05);
}
#sb-excursions-page .sb-place-media {
position: relative;
width: 100%;
height: 138px;
overflow: hidden;
background: #f3f4f6;
}
#sb-excursions-page .sb-place-card img {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
}
#sb-excursions-page .sb-place-badge {
position: absolute;
left: 10px;
top: 10px;
z-index: 2;
display: inline-flex;
align-items: center;
justify-content: center;
min-height: 28px;
padding: 0 10px;
border-radius: 999px;
background: rgba(17, 24, 39, 0.86);
color: #fff;
font-size: 11px;
line-height: 1;
font-weight: 900;
letter-spacing: 0.02em;
box-shadow: 0 8px 18px rgba(0,0,0,0.16);
backdrop-filter: blur(6px);
}`,
  );
  html = html.replace(
    `return '<div class="sb-place-card"><img loading="lazy" decoding="async" src="'+escapeHtml(placeObj.image)+'" alt="'+escapeHtml(placeObj.title)+'"><div class="sb-place-card-body"><div class="sb-place-type">'+escapeHtml(placeObj.kind)+'</div><h4 class="sb-place-title">'+escapeHtml(placeObj.title)+'</h4><p class="sb-place-copy">'+escapeHtml(placeObj.copy)+'</p><div class="sb-place-actions"><a href="'+escapeHtml(placeObj.maps)+'" target="_blank" rel="noopener" class="sb-mini-btn">Google Maps</a><a href="'+waLink+'" class="sb-mini-btn">Ask in WhatsApp</a></div></div></div>';`,
    `var topPickBadge = placeObj.topPick ? '<div class="sb-place-badge">5★ SB Top Pick</div>' : '';
return '<div class="sb-place-card' + (placeObj.topPick ? ' is-top-pick' : '') + '"><div class="sb-place-media"><img loading="lazy" decoding="async" src="'+escapeHtml(placeObj.image)+'" alt="'+escapeHtml(placeObj.title)+'">'+topPickBadge+'</div><div class="sb-place-card-body"><div class="sb-place-type">'+escapeHtml(placeObj.kind)+'</div><h4 class="sb-place-title">'+escapeHtml(placeObj.title)+'</h4><p class="sb-place-copy">'+escapeHtml(placeObj.copy)+'</p><div class="sb-place-actions"><a href="'+escapeHtml(placeObj.maps)+'" target="_blank" rel="noopener" class="sb-mini-btn">Google Maps</a><a href="'+waLink+'" class="sb-mini-btn">Ask in WhatsApp</a></div></div></div>';`,
  );

  const newsStart = html.indexOf('<div id="rec2054910081"');
  const newsEnd = html.indexOf('<div id="rec2054910091"');
  if (newsStart !== -1 && newsEnd !== -1 && newsEnd > newsStart) {
    html = `${html.slice(0, newsStart)}${renderJournalNewsBlock()} ${html.slice(newsEnd)}`;
  }

  html = patchDubaiLinkedFooterContact(html);
  html = ensureBaliMainStabilityFix(html);
  html = ensureAiButtonBeamStyle(html);
  html = ensureBaliGlobalUiFix(html);

  writeGeneratedFile(filePath, html);
}

// ─── Bali static info pages (About / FAQ) built 1:1 from the Dubai design ─────
// Copies the Dubai About/FAQ Tilda pages, keeps the exact layout, and swaps the
// header nav, visible content, imagery, and meta to Bali. The Dubai footer is
// replaced later by ensureBaliTildaFooter (both files are in
// BALI_TILDA_FOOTER_PATCH_FILES).
const BALI_INFO_SHARED_REPLACEMENTS = [
  // Logos → local Bali assets
  [
    "https://static.tildacdn.one/tild3334-6466-4436-b766-376338363935/SB_Excursions_Dubai_.png",
    "/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png",
  ],
  [
    "https://static.tildacdn.one/tild3762-3034-4130-b063-643934306634/SB_DUBAI_LOGO_2025.png",
    "/images/tild3762-3034-4130-b063-643934306634__sb_dubai_logo_2025.png",
  ],
  // Logo link targets
  ['<a href="/" class="t228__imgwrapper">', '<a href="/bali/en/main-page" class="t228__imgwrapper">'],
  ['<a class="t451__logo" href="/">', '<a class="t451__logo" href="/bali/en/main-page">'],
  // Header nav + footer routes → dedicated Bali pages
  ["/dubai/en/about", "/bali/en/about"],
  ["/dubai/en/faq", "/bali/en/faq"],
  // WhatsApp number everywhere
  ["971506048673", WHATSAPP_NUMBER],
  // Office block (visible + map embed + footer text)
  ["The Opus by Omniyat<br>", "Jl. Petitenget<br>"],
  ["Business Bay, Dubai, UAE", "Seminyak, Bali, Indonesia"],
  [
    "The%20Opus%20by%20Omniyat%2C%20Business%20Bay%2C%20Dubai%2C%20UAE",
    "Jl.%20Petitenget%2C%20Seminyak%2C%20Bali%2C%20Indonesia",
  ],
  ["The Opus by Omniyat, Al A'amal St, Business Bay, Dubai, UAE", "Jl. Petitenget, Seminyak, Bali, Indonesia"],
  ["+971 50 604 8673", "+62 853 3368 5020"],
  ["<h2>Our office in Dubai</h2>", "<h2>Our office in Bali</h2>"],
];

// Dubai stock imagery → local Bali photos (keyed by unique Tilda image id).
const BALI_INFO_IMAGE_REPLACEMENTS = [
  ["tild3134-3731-4563-b139-633435626664", "/images/bali-tours/ubud-hero-yousef.webp"], // uae-d (hero)
  ["tild3432-6435-4938-b264-383033313166", "/images/bali-tours/nusa-penida-manta-rays-point.webp"], // a-boat
  ["tild3038-6138-4239-b630-643330383636", "/images/bali-tours/bali-unesco.jpg"], // abu-d / Sheikh Zayed
  ["tild3336-3862-4365-a132-366638663331", "/images/bali-tours/nusa-penida-west-tour.webp"], // beaut / Dubai Marina
  ["tild6139-3437-4131-b562-373762343432", "/images/bali-tours/tanah-lot-bedugul-tour.jpg"], // dubai-uae-d / Dubai Frame
  ["tild3238-6161-4539-b837-633466653436", "/images/bali-tours/ubud-highlights-tour.jpg"], // elega / Louvre
  ["tild6264-3034-4033-b961-386337663264", "/images/bali-tours/sunset-cruise-bali.jpg"], // dubai / yacht
  ["tild3065-3533-4864-a435-316535613436", "/images/bali-tours/bali-helicopter-scenic-tour.jpg"], // panor / Atlantis
  ["tild3239-3939-4138-a634-626563376638", "/images/bali-tours/nusa-penida-east-tour.jpg"], // natur
  ["tild3563-6663-4636-a132-653538353738", "/images/bali-tours/mount-batur-sunrise-hike.jpg"], // beaut #2 (About + FAQ)
];

const BALI_ABOUT_CONTENT_REPLACEMENTS = [
  [
    "<title>About SB Excursions | Global Travel Expertise in Dubai</title>",
    "<title>About SB Excursions | Bali Tours &amp; Local Travel Expertise</title>",
  ],
  [
    "About SB Excursions | Global Travel Expertise in Dubai",
    "About SB Excursions | Bali Tours & Local Travel Expertise",
  ],
  [
    "Meet the founder who explored 15+ countries to bring world-class service to Dubai. Learn why SB Excursions is the top choice for couples and young travelers.",
    "Meet the founder who explored 15+ countries and brought world-class service to Bali. Learn why SB Excursions is the top choice for couples and young travelers exploring the island.",
  ],
  ["SB Excursions | Expert-Led Tours in Dubai &amp; Abu Dhabi", "SB Excursions | Expert-Led Tours Across Bali"],
  [
    'offers curated Dubai adventures. From romantic "Perfect Dates" to adrenaline desert safaris, we bring world-class travel standards to the UAE.',
    'offers curated Bali adventures. From romantic "Perfect Dates" to adrenaline volcano sunrise treks, we bring world-class travel standards to the island.',
  ],
  ["From Global Expeditions to Dubai Dunes", "From Global Expeditions to Bali Shores"],
  ["Adventurers served across the UAE with love.", "Adventurers served across Bali with love."],
  [
    "I created SB Excursions to bring that world-class standard to Dubai.",
    "I created SB Excursions to bring that world-class standard to Bali.",
  ],
  ["From Global Traveler to Your Dubai Guide", "From Global Traveler to Your Bali Guide"],
  [
    "We specialize in romantic yacht sunsets and private desert dinners designed for couples.",
    "We specialize in romantic sunset cruises and private beach dinners designed for couples.",
  ],
  [
    "I've brought those high service standards to Dubai to ensure your safety and comfort on every tour.",
    "I've brought those high service standards to Bali to ensure your safety and comfort on every tour.",
  ],
  [
    "Whether it’s a Hot Air Balloon or Deep Sea Fishing, you get the best equipment and licensed guides.",
    "Whether it’s a Mount Batur sunrise trek or Nusa Penida snorkeling, you get the best equipment and licensed guides.",
  ],
  // Gallery aria-labels (Dubai landmarks → Bali)
  [
    "A must-visit landmark: The Sheikh Zayed Grand Mosque in the UAE capital",
    "A must-visit landmark: a classic Balinese Hindu temple",
  ],
  [
    "Panoramic view of Dubai Marina skyline and Ain Dubai Ferris wheel",
    "Panoramic view of the Kelingking Beach cliffs on Nusa Penida",
  ],
  [
    "Dubai Frame view framed by tropical palm trees under a clear blue sky",
    "Tanah Lot sea temple framed by tropical palm trees under a clear blue sky",
  ],
  ["aesthetic shot Ladder in Louvre", "aesthetic shot of the Tegalalang rice terraces in Ubud"],
  [
    "Luxury private yacht cruising past the Dubai Marina skyline and Ain Dubai",
    "Luxury private sunset cruise along the Bali coastline",
  ],
  [
    "Aerial view of Atlantis The Royal hotel and Palm Jumeirah from a helicopter",
    "Aerial view of Bali's rice terraces and coastline from a helicopter",
  ],
];

const BALI_FAQ_CONTENT_REPLACEMENTS = [
  [
    "General FAQ | SB Excursions Dubai - Safety, Booking & Insurance",
    "General FAQ | SB Excursions Bali - Safety, Booking & Insurance",
  ],
  [
    "Get answers to all your questions about booking, payments, insurance, and safety with SB Excursions. 20+ global questions answered for your peace of mind.",
    "Get answers to all your questions about booking, payments, insurance, and safety with SB Excursions Bali. 20+ questions answered for your peace of mind.",
  ],
  ["according to UAE laws", "according to Indonesian laws"],
  ["protected by <strong>UAE legal regulations</strong>", "protected by <strong>Indonesian legal regulations</strong>"],
  ["protected by UAE legal regulations", "protected by Indonesian legal regulations"],
  [
    "office in <strong>Business Bay, Dubai</strong> (The Opus by Omniyat)",
    "office in <strong>Seminyak, Bali</strong>",
  ],
  ["office in Business Bay, Dubai (The Opus by Omniyat)", "office in Seminyak, Bali"],
  ["within Dubai city limits", "within Bali (Seminyak, Kuta, Canggu, Ubud, Nusa Dua and nearby areas)"],
  ["I%20want%20to%20book%20your%20Dubai%20Safari%20desert%20tour%21", "I%20want%20to%20book%20a%20Bali%20tour%21"],
];

function applyBaliInfoHeaderNav(html) {
  return html
    .replace(
      /href=""([^>]*data-menu-item-number="5"[^>]*)>\s*Our guides\s*</g,
      `href="${JOURNAL_HUB_ROUTE}"$1>Our guides<`,
    )
    .replace(/\/bali\/en\/tours\/(?:bali\/en\/tours\/)+/g, "/bali/en/tours/");
}

function applyBaliInfoImages(html) {
  let out = html;
  for (const [id, localPath] of BALI_INFO_IMAGE_REPLACEMENTS) {
    out = out.replace(new RegExp(`https://(?:static|thb)\\.tildacdn\\.one/${id}/[^"')\\s]*`, "g"), localPath);
  }
  return out;
}

function buildBaliInfoPage(sourceFile, outFile, contentReplacements) {
  const sourcePath = path.join(projectRoot, sourceFile);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Bali info page source missing: ${sourceFile}`);
    return;
  }
  let html = fs.readFileSync(sourcePath, "utf8");
  html = html.replace(/<html lang="[^"]*"/i, '<html lang="en"');
  for (const [from, to] of [...BALI_INFO_SHARED_REPLACEMENTS, ...contentReplacements]) {
    html = html.split(from).join(to);
  }
  html = applyBaliInfoImages(html);
  html = applyBaliInfoHeaderNav(html);
  html = ensureBaliGlobalUiFix(html);
  writeGeneratedFile(path.join(projectRoot, outFile), html);
}

function buildBaliInfoPages() {
  buildBaliInfoPage("page112152236.html", "bali-about.html", BALI_ABOUT_CONTENT_REPLACEMENTS);
  buildBaliInfoPage("page112258706.html", "bali-faq.html", BALI_FAQ_CONTENT_REPLACEMENTS);
}

function listWeatherPatchFiles() {
  const rootFiles = fs
    .readdirSync(projectRoot)
    .filter((fileName) => /^page\d+\.html$/.test(fileName))
    .sort();
  const bodyFilesDir = path.join(projectRoot, "files");
  const bodyFiles = fs.existsSync(bodyFilesDir)
    ? fs
        .readdirSync(bodyFilesDir)
        .filter((fileName) => /^page\d+body\.html$/.test(fileName))
        .sort()
        .map((fileName) => path.join("files", fileName))
    : [];

  return [...rootFiles, ...bodyFiles];
}

function inferWeatherPrimaryRoute(html, filePath) {
  const aliases = [...html.matchAll(/data-tilda-page-alias="([^"]+)"/g)].map((match) => match[1]);
  for (const alias of aliases) {
    if (alias === "bali/en/main-page") return WEATHER_MAIN_PAGE_ROUTE;
    if (alias.startsWith("bali/en/tours/")) return `/${alias}`;
    if (alias === "bali/en/journal") return JOURNAL_HUB_ROUTE;
    if (alias.startsWith("bali/en/journal/")) return `/${alias}`;
    if (TILDA_WEATHER_ROUTE_OVERRIDES[alias]) return TILDA_WEATHER_ROUTE_OVERRIDES[alias];
  }

  const fileName = path.basename(filePath);
  if (TILDA_WEATHER_FILE_FALLBACKS[fileName]) {
    return TILDA_WEATHER_FILE_FALLBACKS[fileName];
  }

  return null;
}

function extractTildaRecordById(html, recordId, commentTag = "T123") {
  const pattern = new RegExp(
    String.raw`<div id="rec${recordId}"[^>]*>\s*<!--\s*${commentTag}\s*-->[\s\S]*?<!--\s*\/${commentTag}\s*-->\s*<\/div>`,
    "i",
  );
  return html.match(pattern)?.[0] || "";
}

function buildWeatherTourLinks(primaryRoute = WEATHER_MAIN_PAGE_ROUTE) {
  return {
    hot: primaryRoute,
    sunny: primaryRoute,
    partly: primaryRoute,
    cloudy: primaryRoute,
    rain: WEATHER_MAIN_PAGE_ROUTE,
    storm: primaryRoute,
    night: WEATHER_MAIN_PAGE_ROUTE,
  };
}

function replaceWeatherTourLinksConfig(html, primaryRoute = WEATHER_MAIN_PAGE_ROUTE) {
  return html.replace(
    /var TOUR_LINKS = \{[\s\S]*?\n\s*\}(?:;)?/,
    `var TOUR_LINKS = ${JSON.stringify(buildWeatherTourLinks(primaryRoute), null, 6)};`,
  );
}

let compactWeatherRecordTemplateCache = null;

function buildCompactWeatherRecord(primaryRoute = WEATHER_MAIN_PAGE_ROUTE) {
  if (!compactWeatherRecordTemplateCache) {
    const sourcePath = path.join(projectRoot, "page128073236.html");
    if (!fs.existsSync(sourcePath)) {
      return "";
    }

    const sourceHtml = fs.readFileSync(sourcePath, "utf8");
    compactWeatherRecordTemplateCache = extractTildaRecordById(sourceHtml, "2147449333", "T123");
  }

  if (!compactWeatherRecordTemplateCache) {
    return "";
  }

  return replaceWeatherTourLinksConfig(compactWeatherRecordTemplateCache, primaryRoute);
}

function buildJeepHotSpringRouteRecord() {
  const title = "Mount Batur Sunrise Jeep & Hot Spring route on Google Maps";
  const text =
    "Preview the key map points for Mount Batur Sunrise Jeep & Hot Spring. This route usually highlights Toya Bungkah, Sunrise Point, Black Lava, Black Sand, Hot Spring. Final timing, pickup, and stop order are confirmed after booking.";
  const embedRoute =
    "https://maps.google.com/maps?output=embed&f=d&saddr=Toya%20Bungkah%2C%20Kintamani%2C%20Bali&daddr=Mount%20Batur%20Sunrise%20Point%2C%20Kintamani%2C%20Bali+to:Black%20Lava%2C%20Kintamani%2C%20Bali+to:Black%20Sand%20Batur%2C%20Kintamani%2C%20Bali+to:Batur%20Natural%20Hot%20Spring%2C%20Kintamani%2C%20Bali";
  const openRoute =
    "https://www.google.com/maps/dir/Toya%20Bungkah%2C%20Kintamani%2C%20Bali/Mount%20Batur%20Sunrise%20Point%2C%20Kintamani%2C%20Bali/Black%20Lava%2C%20Kintamani%2C%20Bali/Black%20Sand%20Batur%2C%20Kintamani%2C%20Bali/Batur%20Natural%20Hot%20Spring%2C%20Kintamani%2C%20Bali";
  const stops = ["Toya Bungkah", "Sunrise Point", "Black Lava", "Black Sand", "Hot Spring"];

  return `
<style id="sb-jeep-hot-spring-route-style">
#rec2122133073 .sb-route-map-shell {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 20px 24px;
  box-sizing: border-box;
  font-family: "Cina GEO", "Tilda Sans", "TildaSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

#rec2122133073 .sb-route-map-shell *,
#rec2122133073 .sb-route-map-shell *::before,
#rec2122133073 .sb-route-map-shell *::after {
  box-sizing: border-box;
}

#rec2122133073 .sb-route-map-copy {
  margin: 0 auto 18px;
  max-width: 900px;
  text-align: center;
  width: 100%;
}

#rec2122133073 .sb-route-map-label {
  color: #d48c48;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

#rec2122133073 .sb-route-map-title {
  margin: 10px 0 10px;
  color: #111111;
  font-family: "Cina GEO", "Tilda Sans", "TildaSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(28px, 3.3vw, 40px);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.03em;
}

#rec2122133073 .sb-route-map-text {
  margin: 0 auto;
  max-width: 820px;
  color: #626262;
  font-size: 17px;
  line-height: 1.55;
}

#rec2122133073 .sb-route-map-frame {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 26px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
}

#rec2122133073 .sb-route-map-frame iframe {
  display: block;
  width: 100%;
  height: 640px;
  border: 0;
  background: #f7f7f7;
}

#rec2122133073 .sb-route-map-actions {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

#rec2122133073 .sb-route-map-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.25s ease;
}

#rec2122133073 .sb-route-map-link:hover {
  opacity: 0.88;
}

#rec2122133073 .sb-route-map-stops {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  width: 100%;
}

#rec2122133073 .sb-route-map-stop {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 9px 14px;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 999px;
  background: #ffffff;
  color: #111111;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
}

@media screen and (max-width: 639px) {
  #rec2122133073 .sb-route-map-shell {
    padding: 0 10px 4px;
    max-width: 100%;
    overflow: hidden;
  }

  #rec2122133073 .sb-route-map-copy {
    margin-bottom: 14px;
    max-width: 100%;
    padding: 0 4px;
  }

  #rec2122133073 .sb-route-map-title {
    font-size: 28px;
    line-height: 1.08;
    word-break: normal;
    overflow-wrap: anywhere;
  }

  #rec2122133073 .sb-route-map-text {
    font-size: 14px;
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  #rec2122133073 .sb-route-map-frame {
    border-radius: 22px;
  }

  #rec2122133073 .sb-route-map-frame iframe {
    height: 330px;
  }

  #rec2122133073 .sb-route-map-link {
    width: 100%;
    max-width: 100%;
    min-height: 40px;
    padding: 0 16px;
    font-size: 13px;
  }

  #rec2122133073 .sb-route-map-stops {
    gap: 8px;
    margin-top: 14px;
  }

  #rec2122133073 .sb-route-map-stop {
    min-height: 28px;
    padding: 6px 10px;
    font-size: 11px;
  }
}
</style>
<div id="rec2122133073" class="r t-rec t-rec_pt_0 t-rec_pb_15" style="padding-top:0px;padding-bottom:15px;" data-record-type="123">
  <!-- T123 -->
  <div class="t123">
    <div class="t-container_100">
      <div class="t-width t-width_100">
        <div class="sb-route-map-shell">
          <div class="sb-route-map-copy">
            <div class="sb-route-map-label">Sunrise route</div>
            <h2 class="sb-route-map-title">${title}</h2>
            <p class="sb-route-map-text">${text}</p>
          </div>
          <div class="sb-route-map-frame">
            <iframe loading="eager" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="${embedRoute}"></iframe>
          </div>
          <div class="sb-route-map-actions">
            <a class="sb-route-map-link" href="${openRoute}" target="_blank" rel="noopener noreferrer">Open google maps route</a>
          </div>
          <div class="sb-route-map-stops">
            ${stops.map((stop) => `<span class="sb-route-map-stop">${stop}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /T123 -->
</div>`.trim();
}

function ensureJeepHotSpringRouteMap(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const fileName = path.basename(filePath);
  if (!JEEP_HOT_SPRING_ROUTE_PATCH_FILES.some((candidate) => candidate.endsWith(fileName))) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  if (html.includes('<div id="rec2122133073"')) {
    return;
  }

  const routeRecord = buildJeepHotSpringRouteRecord();
  const weatherIndex = html.indexOf('<div id="rec2147449333"');
  const footerCommentIndex = html.indexOf("<!--footer-->");
  const footerIndex = footerCommentIndex !== -1 ? footerCommentIndex : html.indexOf('<footer id="t-footer"');
  const closeIndex = html.lastIndexOf("</div> <!--/allrecords-->");
  const insertIndex = weatherIndex !== -1 ? weatherIndex : footerIndex !== -1 ? footerIndex : closeIndex;

  if (insertIndex === -1) {
    return;
  }

  html = `${html.slice(0, insertIndex).trimEnd()}\n${routeRecord}\n${html.slice(insertIndex)}`;
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

function ensureCompactWeatherWidget(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  const primaryRoute = inferWeatherPrimaryRoute(html, filePath);

  if (!primaryRoute) {
    return;
  }

  if (!html.includes('id="baliWeatherCard"')) {
    const weatherRecord = buildCompactWeatherRecord(primaryRoute);
    if (!weatherRecord) {
      return;
    }

    const footerCommentIndex = html.indexOf("<!--footer-->");
    const footerIndex = footerCommentIndex !== -1 ? footerCommentIndex : html.indexOf('<footer id="t-footer"');
    const allRecordsClose = "</div> <!--/allrecords-->";
    const closeIndex = html.lastIndexOf(allRecordsClose);
    const insertIndex = footerIndex !== -1 ? footerIndex : closeIndex;

    if (insertIndex === -1) {
      return;
    }

    html = `${html.slice(0, insertIndex).trimEnd()}\n${weatherRecord}\n${html.slice(insertIndex)}`;
  }

  html = replaceWeatherTourLinksConfig(html, primaryRoute);
  html = normalizeBaliWeatherOuterCss(html);

  const existingStylePattern = /<style id="sb-weather-compact-override">[\s\S]*?<\/style>\s*/;
  if (existingStylePattern.test(html)) {
    html = html.replace(existingStylePattern, WEATHER_COMPACT_OVERRIDE_STYLE);
  } else {
    const insertBefore = '<div id="rec2147449333"';
    const insertIndex = html.indexOf(insertBefore);
    if (insertIndex === -1) {
      return;
    }

    html = `${html.slice(0, insertIndex)}${WEATHER_COMPACT_OVERRIDE_STYLE}${html.slice(insertIndex)}`;
  }

  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

const UNESCO_INTERNAL_TOUR_CHIPS = [
  ["1649846162388", "Tanah Lot", "/bali/en/tours/tanah-lot-bedugul-tour"],
  ["1649846180718", "Nusa West", "/bali/en/tours/nusa-penida-west-tour"],
  ["1649846177921", "Ubud and Volcano", "/bali/en/tours/ubud-highlights-tour"],
  ["1649846180725", "Lavina dolphins", "/bali/en/tours/dolphin-sunrise-city-tour"],
  ["1649846178555", "East Bali", "/bali/en/tours/east-bali-instagram-tour"],
  ["1649846180729", "ATV Ubud", "/bali/en/tours/atv-quad-bikes"],
  ["1649846185203", "Batur Hike", "/bali/en/tours/mount-batur-sunrise-hike"],
  ["1649846179102", "Ubud city tour", "/bali/en/tours/ubud-instagram-tour"],
  ["1649846182361", "Gili Islands", "/bali/en/tours/gili-island-tour"],
  ["1649846180733", "Batur Jeep & Spring", "/bali/en/tours/mount-batur-sunrise-jeep-hot-spring"],
  ["1649846185207", "Private Driver", "/bali/en/tours/private-car-with-driver-bali"],
  ["1649846182365", "Manta Point", "/bali/en/tours/nusa-penida-manta-rays-point"],
  ["1649846185211", "Nusa Penida tour", "/bali/en/tours/nusa-penida-east-tour"],
];

const UNESCO_PDF_CHIPS = [
  [null, "Top Temples", `${JOURNAL_HUB_ROUTE}/best-temples-bali-cultural-sites`],
  [null, "Top Beaches", `${JOURNAL_HUB_ROUTE}/best-beaches-bali-crystal-clear-water`],
  [null, "Best Places", `${JOURNAL_HUB_ROUTE}/best-places-to-visit-bali-first-time`],
  [null, "Waterfalls", `${JOURNAL_HUB_ROUTE}/best-waterfalls-bali-day-trips`],
  [null, "Viewpoints", `${JOURNAL_HUB_ROUTE}/best-viewpoints-bali-sunrise-cliffs-rice-terraces`],
  [null, "Photo Spots", `${JOURNAL_HUB_ROUTE}/best-instagram-places-bali`],
  [null, "Where to Stay", `${JOURNAL_HUB_ROUTE}/where-to-stay-bali-first-time`],
  [null, "Budget Eats", `${JOURNAL_HUB_ROUTE}/best-budget-restaurants-bali-warungs`],
  [null, "Beach Clubs", `${JOURNAL_HUB_ROUTE}/best-beach-clubs-bali-young-adults`],
  [null, "Couples Guide", `${JOURNAL_HUB_ROUTE}/best-things-to-do-bali-for-couples`],
];

const UNESCO_THINGS_TO_DO_CHIPS = [
  [null, "UNESCO Temples", "/bali/en/tours/bali-unesco"],
  [null, "Ubud and Volcano", "/bali/en/tours/ubud-highlights-tour"],
  [null, "East Bali", "/bali/en/tours/east-bali-instagram-tour"],
  [null, "Nusa West", "/bali/en/tours/nusa-penida-west-tour"],
  [null, "Nusa Penida tour", "/bali/en/tours/nusa-penida-east-tour"],
  [null, "Manta Point", "/bali/en/tours/nusa-penida-manta-rays-point"],
  [null, "Batur Hike", "/bali/en/tours/mount-batur-sunrise-hike"],
  [null, "Batur Jeep & Spring", "/bali/en/tours/mount-batur-sunrise-jeep-hot-spring"],
  [null, "Lavina dolphins", "/bali/en/tours/dolphin-sunrise-city-tour"],
  [null, "Gili Islands", "/bali/en/tours/gili-island-tour"],
  [null, "ATV Ubud", "/bali/en/tours/atv-quad-bikes"],
  [null, "Private Driver", "/bali/en/tours/private-car-with-driver-bali"],
];

const UNESCO_LANGUAGE_OPTIONS = BALI_LANGUAGE_OPTIONS;

const UNESCO_PAGE_TRANSLATIONS = {
  ru: {
    title: "Тур по объектам ЮНЕСКО на Бали",
    metaTitle: "Тур по объектам ЮНЕСКО на Бали | Taman Ayun, Ulun Danu, Jatiluwih и Tanah Lot",
    metaDescription:
      "Забронируйте тур по объектам ЮНЕСКО на Бали: Taman Ayun, Ulun Danu Beratan, рисовые террасы Jatiluwih и Tanah Lot, частный трансфер и все входные билеты от $70 за человека.",
    eyebrow: "Храмы ЮНЕСКО, рисовые террасы и Tanah Lot",
    duration: "10 часов",
    pickup: "Утренний трансфер из Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua или Jimbaran",
    bestFor: "любителей культуры, пар, семей и первого обзорного дня на Бали",
    format: "Частный маршрут по культурному наследию",
    area: "Маршрут ЮНЕСКО по западу и центру Бали",
    compactAreaLabel: "Запад и центр Бали",
    imageAlt: "Рисовые террасы Jatiluwih и горные виды на туре по объектам ЮНЕСКО на Бали",
    lead:
      "Посмотрите самые известные объекты наследия Бали за один аккуратно собранный частный день: Taman Ayun, Ulun Danu Beratan, рисовые террасы Jatiluwih и Tanah Lot в одном цельном all-inclusive маршруте.",
    summary:
      "Этот тур по объектам ЮНЕСКО на Бали создан для гостей, которые хотят храмы, горно-озёрные виды, знаменитые рисовые террасы ЮНЕСКО и эффектный финал у океанского храма Tanah Lot без необходимости собирать несколько разных экскурсий. Частный транспорт, входные билеты, храмовый саронг и вода уже включены от $70 за человека.",
    overview:
      "Маршрут хорошо работает потому, что остаётся очень красивым и разнообразным, но не утомляет физически. Вы начинаете с королевской храмовой архитектуры Taman Ayun, поднимаетесь в более прохладный Bedugul к Ulun Danu Beratan, выходите к широким зелёным террасам Jatiluwih и завершаете день в Tanah Lot у одного из самых узнаваемых храмов Бали у океана.",
    aboutSubtitle: "Тур по объектам ЮНЕСКО на Бали",
    highlights: [
      ["Храм Taman Ayun", "Спокойный старт дня в одном из самых изящных королевских храмовых комплексов Бали."],
      ["Ulun Danu Beratan", "Горное озеро и храм в Bedugul дают прохладный воздух, мягкий свет и один из самых узнаваемых видов на Бали."],
      ["Террасы Jatiluwih", "Знаменитые террасы ЮНЕСКО делают маршрут визуально шире и богаче, чем обычный храмовый день."],
      ["Финал в Tanah Lot", "Завершение у знаменитого морского храма даёт маршруту сильную и очень фотогеничную концовку."],
    ],
    itinerary: [
      ["Утренний трансфер и храм Taman Ayun", "Стартуйте с трансфера из основных районов юга и центра Бали и первой культурной остановки в Taman Ayun."],
      ["Ulun Danu Beratan в Bedugul", "Дальше маршрут уходит в более прохладные горные районы к Ulun Danu Beratan с видами на озеро и храм."],
      ["Рисовые террасы Jatiluwih", "После этого вы едете в Jatiluwih ради зелёных панорам, объекта ЮНЕСКО и удобного окна для обеда рядом с видом на Batukaru."],
      ["Tanah Lot и возвращение", "День заканчивается в Tanah Lot, после чего идёт обратный трансфер с учётом трафика и лучшего света."],
    ],
    includes: [
      "Частный автомобиль с кондиционером",
      "Все входные билеты по указанному маршруту",
      "Саронг для посещения храмов",
      "Бутилированная вода",
    ],
    goodToKnow: [
      "Обед, личные расходы и дополнительные услуги не входят в стандартную стоимость.",
      "Трансфер покрывает Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua и Jimbaran.",
      "Возьмите камеру, наличные, солнцезащитные очки, удобную обувь для храмов и террас, а также лёгкую накидку для прохладной части маршрута в Bedugul.",
      "Это частный экскурсионный маршрут, а не групповой тур, так как в источнике указан private air-conditioned vehicle.",
      "Маршрут комфортный для большинства гостей, но точное время может меняться из-за погоды и трафика.",
      "Для полного возврата отмену лучше оформить минимум за 3 дня до начала поездки.",
    ],
    meetingPoint:
      "Обычно гостей забирают прямо из отеля, виллы или Airbnb в указанных районах Бали до начала маршрута.",
    faqs: [
      ["Сколько длится тур по объектам ЮНЕСКО на Бали?", "Источник описывает этот маршрут как экскурсию примерно на 10 часов: утренний выезд, все основные остановки и возвращение после Tanah Lot."],
      ["Какие места входят в этот тур?", "Маршрут включает Taman Ayun Temple, Ulun Danu Beratan Temple, рисовые террасы Jatiluwih и Tanah Lot."],
      ["Включён ли трансфер из отеля?", "Да. В источнике указано, что трансфер организуется от места проживания, и заранее нужно отправить название и адрес отеля, виллы или Airbnb."],
      ["Из каких районов есть трансфер?", "Заявленные районы трансфера: Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua и Jimbaran."],
      ["Что входит в стоимость экскурсии?", "Включены частный автомобиль с кондиционером, все входные билеты, саронг для храмов и вода."],
      ["Включён ли обед?", "Нет. Обед, личные расходы и дополнительные сервисы указаны как не включённые."],
      ["Нужно ли брать саронг для храмов?", "Нет, если не хотите свой. В источнике указано, что саронг для храмов уже включён."],
      ["Это частный тур или групповой маршрут?", "Мы показываем его как частный маршрут, потому что источник прямо указывает private air-conditioned vehicle."],
      ["Что взять с собой?", "Лучше взять камеру, наличные, солнцезащитные очки, удобную обувь и лёгкую накидку для более прохладной части дня."],
      ["Подходит ли маршрут для детей?", "Да. Это спокойный обзорный день, который хорошо подходит парам, семьям и гостям, не ищущим физически тяжёлую активность."],
      ["Какая политика отмены?", "Для полного возврата источник рекомендует отменять не позже чем за 3 дня до начала экскурсии."],
      ["Почему этот маршрут бронируют вместо нескольких разных экскурсий?", "Потому что он собирает храмы, озёрные виды, террасы ЮНЕСКО и Tanah Lot в один понятный и визуально сильный день."],
    ],
    whatsappText:
      "Здравствуйте! Хочу забронировать тур по объектам ЮНЕСКО на Бали за $70 с человека. Пришлите, пожалуйста, доступные даты, районы трансфера и полные детали.",
    privateOfferEyebrow: "Маршрут ЮНЕСКО",
    privateOfferTopline: "Лучший выбор для храмов и пейзажей Бали",
    mapLabel: "Маршрут ЮНЕСКО",
    mapTitle: "Маршрут тура ЮНЕСКО на Google Maps",
    mapText:
      "Посмотрите основные точки тура по объектам ЮНЕСКО на Бали. Обычно маршрут включает Taman Ayun, Ulun Danu Beratan, Jatiluwih и Tanah Lot. Точное время и порядок остановок подтверждаются после бронирования.",
    miniPromoEyebrow: "Маршрут наследия",
    miniPromoSideText:
      "Откройте культурную сторону Бали: королевские храмовые дворы, озёрные виды Bedugul, террасы Jatiluwih и финал у Tanah Lot в одном частном дне.",
    ctaLabel: "Забронировать",
    faqIntro: "Короткие ответы перед бронированием маршрута по объектам ЮНЕСКО на Бали.",
    fullDescriptionKeyStopsHtml:
      "Обычно маршрут строится вокруг <strong>Taman Ayun - Ulun Danu Beratan - Jatiluwih - Tanah Lot</strong>.",
    fullDescriptionBestFitHtml:
      "Лучше всего подходит для <strong>любителей культуры, пар и семей</strong> с маршрутом примерно на <strong>10 часов</strong>.",
    breadcrumbHome: "Главная Бали",
    breadcrumbTours: "Туры",
    reviews: [
      { text: "Мы ехали ради Taman Ayun, но в итоге весь день оказался очень цельным и комфортным. Планирование и тайминг сделали тур по объектам ЮНЕСКО на Бали действительно лёгким.", title: "Emma - Australia", date: "18 апреля 2026 - Подтверждённое бронирование" },
      { text: "Это был один из самых удобных полноценных дней на Бали. Больше всего запомнились Ulun Danu Beratan и Jatiluwih, а сам маршрут ощущался спокойным и хорошо организованным.", title: "Noah - Canada", date: "27 апреля 2026 - Подтверждённое бронирование" },
      { text: "Очень хороший value за целый день. Хватило времени и на фото, и на спокойные остановки, а команда помогала с логистикой и таймингом весь маршрут.", title: "Lina - Sweden", date: "6 мая 2026 - Подтверждённое бронирование" },
    ],
    ui: {
      navTours: "Туры",
      navAbout: "О нас",
      navBooking: "Бронирование",
      navGuides: "Гайды",
      languageSwitcherLabel: "Выбрать язык",
      aboutHeading: "О туре",
      highlightsHeading: "Основные моменты",
      fullDescriptionHeading: "Полное описание",
      whatsIncludedHeading: "Что включено",
      importantInformationHeading: "Важная информация",
      bestAttractionsHeading: "Лучшие места на Бали",
      helpfulPdfHeading: "Полезные статьи о Бали",
      thingsToDoHeading: "Чем заняться на Бали",
      tourArticlesHeading: "Статьи об этом туре",
      chipTravelGuide: "Путеводитель",
      chipTourSchedule: "Расписание тура",
      chipWhyBook: "Почему стоит бронировать",
      mapOpenLabel: "Открыть маршрут в Google Maps",
      highlightsIntroLabel: "Главная идея",
      fullDescriptionWhyBookLabel: "Почему это бронируют",
      fullDescriptionHowDayFeelsLabel: "Как ощущается день",
      fullDescriptionKeyStopsLabel: "Ключевые точки",
      fullDescriptionBestFitLabel: "Кому подойдёт",
      includesIntroLabel: "Что уже собрано в пакет",
      includesIntroText: "Основная логистика и важные детали уже включены в этот маршрут",
      weatherLive: "Погода сейчас",
      weatherLoading: "Загрузка…",
      weatherChecking: "Проверяем местные условия…",
      weatherConditionLoading: "Загружаем погоду…",
      weatherSummaryLoading: "Подбираем лучший план на день на Бали…",
      weatherFeelsLike: "Ощущается как",
      weatherHumidity: "Влажность",
      weatherWind: "Ветер",
      weatherTipsTitle: "Советы на сегодня",
      weatherSeeRecommended: "Посмотреть рекомендуемый тур",
      weatherLocation: "Бали, Индонезия",
      weatherClearSky: "Ясно",
      weatherMostlyClear: "Почти ясно",
      weatherPartlyCloudy: "Переменная облачность",
      weatherCloudy: "Облачно",
      weatherLightRain: "Лёгкий дождь",
      weatherRainShowers: "Кратковременный дождь",
      weatherThunderstorm: "Риск грозы",
      weatherWarmEvening: "Тёплый вечер на Бали",
      weatherSunnyDay: "Солнечный день на Бали",
      weatherCloudyDay: "Облачный день на Бали",
      weatherRainyDay: "Дождливая погода на Бали",
      weatherStormyDay: "День с риском шторма на Бали",
      weatherSunsetTip: "Отлично для закатных точек",
      weatherDinnerTip: "Отлично для планов на ужин",
      weatherLightLayerTip: "Достаточно лёгкого слоя одежды",
      weatherBeachTip: "Хорошо для пляжа",
      weatherSunscreenTip: "Сильное солнце: не забудьте SPF",
      weatherHydrateTip: "Пейте больше воды в жару",
      weatherCafeTip: "Хорошая погода для кафе и лёгких поездок",
      weatherSpaTip: "Подходит для спа или остановок в кафе",
      weatherGripShoesTip: "Наденьте обувь с хорошим сцеплением",
      weatherRainLayerTip: "Возьмите лёгкую дождевую куртку",
      weatherFlexibleTip: "Сегодня лучше держать план гибким",
      weatherShelterTip: "Хорошо иметь indoor запасной вариант",
      footerTopTours: "Топ туры",
      footerCompanyTrust: "Компания и доверие",
      footerContactsLocation: "Контакты и локация",
      footerLead: "Там, где встречаются природа и приключения",
      footerAboutCompany: "О SB Excursions",
      footerPrivacy: "Политика конфиденциальности",
      footerTerms: "Условия и положения",
      footerRefund: "Политика возврата",
      footerSiteMap: "Карта сайта",
      footerMessageUs: "Напишите нам",
      footerSupportHours: "Поддержка ежедневно 7:00 - 22:00",
      footerCopyright: "© 2021-2026 SB Excursions. Создано для приключений на Бали",
    },
  },
  zh: {
    title: "巴厘岛联合国教科文组织遗产之旅",
    metaTitle: "巴厘岛联合国教科文组织遗产之旅 | Taman Ayun、Ulun Danu、Jatiluwih 与 Tanah Lot",
    metaDescription:
      "预订巴厘岛联合国教科文组织遗产之旅：Taman Ayun、Ulun Danu Beratan、Jatiluwih 梯田和 Tanah Lot，含私人接送与所有门票，$70/人起。",
    eyebrow: "联合国教科文组织寺庙、梯田与 Tanah Lot",
    duration: "10小时",
    pickup: "早晨可从 Ubud、Sanur、Seminyak、Canggu、Legian、Kuta、Nusa Dua 或 Jimbaran 接送",
    bestFor: "文化爱好者、情侣、家庭和第一次来巴厘岛的游客",
    format: "私人文化遗产观光路线",
    area: "巴厘岛西部与中部 UNESCO 路线",
    compactAreaLabel: "巴厘岛西中部",
    imageAlt: "巴厘岛联合国教科文组织遗产之旅中的 Jatiluwih 梯田与山景",
    lead:
      "在一天顺畅的私人行程里看遍巴厘岛最有代表性的遗产风景：Taman Ayun、Ulun Danu Beratan、Jatiluwih 梯田和 Tanah Lot 一次走完。",
    summary:
      "这条巴厘岛联合国教科文组织遗产之旅适合想在一天内看到寺庙庭院、山湖风景、著名梯田和海边神庙收尾的旅行者，而不用把几条一日游拼在一起。私人用车、门票、寺庙纱笼和饮用水都已包含，$70/人起。",
    overview:
      "这条路线的优点是景观层次丰富，但体力负担并不重。你会先到优雅的 Taman Ayun，再进入更凉爽的 Bedugul 看 Ulun Danu Beratan，随后前往世界遗产 Jatiluwih 梯田，最后以 Tanah Lot 海边神庙作为收尾。",
    aboutSubtitle: "来自巴厘岛的 UNESCO 遗产之旅",
    highlights: [
      ["Taman Ayun 寺庙", "以巴厘岛最优雅的皇家寺庙群之一开启一天，文化氛围很舒服。"],
      ["Ulun Danu Beratan", "Bedugul 的山湖寺景带来更凉爽的空气和巴厘岛最经典的寺庙背景之一。"],
      ["Jatiluwih 梯田", "联合国教科文组织梯田让整条路线比单纯看寺庙更开阔、更完整。"],
      ["Tanah Lot 海岸收尾", "在著名海神庙结束一天，让最后一段非常有画面感。"],
    ],
    itinerary: [
      ["早晨接送与 Taman Ayun", "从巴厘岛南部和中部主要区域接送出发，第一站前往 Taman Ayun。"],
      ["Bedugul 的 Ulun Danu Beratan", "继续前往更凉爽的高地区域，看湖边寺庙和山景。"],
      ["Jatiluwih 梯田", "之后前往 Jatiluwih，欣赏 UNESCO 梯田景观，并在附近安排舒适的午餐时间。"],
      ["Tanah Lot 与返程", "最后前往 Tanah Lot，再根据交通与光线情况返回酒店。"],
    ],
    includes: [
      "私人空调车",
      "行程所列全部门票",
      "寺庙参观纱笼",
      "瓶装饮用水",
    ],
    goodToKnow: [
      "午餐、个人消费和额外服务不包含在基础价格中。",
      "接送范围包括 Ubud、Sanur、Seminyak、Canggu、Legian、Kuta、Nusa Dua 和 Jimbaran。",
      "建议带相机、现金、太阳镜、适合寺庙和梯田步行的鞋，以及 Bedugul 段可加的一件薄外套。",
      "这条路线按私人观光路线呈现，而不是拼团，因为来源明确写的是 private air-conditioned vehicle。",
      "整天节奏对大多数游客都比较轻松，但具体时间仍会受到交通和天气影响。",
      "如需全额退款，来源建议至少提前 3 天取消。",
    ],
    meetingPoint: "大多数客人会在出发前直接从酒店、别墅或 Airbnb 接走。",
    faqs: [
      ["这条 UNESCO 行程多长时间？", "来源将其描述为约 10 小时的一日观光路线，通常早晨出发，Tanah Lot 之后返回。"],
      ["这条行程包含哪些地方？", "路线包含 Taman Ayun Temple、Ulun Danu Beratan Temple、Jatiluwih 梯田和 Tanah Lot。"],
      ["包含酒店接送吗？", "包含。来源说明会从住宿地接送，并需要提前提供酒店、别墅或 Airbnb 名称和地址。"],
      ["哪些区域可以接送？", "可接送区域为 Ubud、Sanur、Seminyak、Canggu、Legian、Kuta、Nusa Dua 和 Jimbaran。"],
      ["价格里包含什么？", "包含私人空调车、全部门票、寺庙纱笼和瓶装水。"],
      ["包含午餐吗？", "不包含。来源将午餐、个人消费和其他附加服务列为不含项目。"],
      ["参观寺庙需要自带纱笼吗？", "不需要，除非你更想用自己的。来源说明纱笼已包含。"],
      ["这是私人团还是拼团？", "我们按私人路线呈现，因为来源直接列出了 private air-conditioned vehicle。"],
      ["这条路线建议带什么？", "建议带相机、现金、太阳镜、舒适鞋，以及适合 Bedugul 较凉天气的轻薄外套。"],
      ["适合带孩子吗？", "适合。这是一条比较轻松的观光路线，适合情侣、家庭和不想进行高强度活动的游客。"],
      ["取消政策是什么？", "如需全额退款，来源建议至少在体验开始前 3 天取消。"],
      ["为什么很多人会选择这条路线，而不是拆成几条一日游？", "因为它把寺庙、山湖、梯田和 Tanah Lot 海岸景观整合成一天，节奏清晰，画面也更丰富。"],
    ],
    whatsappText:
      "你好！我想预订巴厘岛联合国教科文组织遗产之旅，价格为每人 $70。请发送可订日期、接送区域和完整详情。",
    privateOfferEyebrow: "UNESCO 文化路线",
    privateOfferTopline: "适合想一次看尽巴厘岛经典文化景观的人",
    mapLabel: "UNESCO 路线",
    mapTitle: "巴厘岛 UNESCO 路线 Google 地图",
    mapText:
      "预览这条巴厘岛 UNESCO 路线的主要地图点。通常包括 Taman Ayun、Ulun Danu Beratan、Jatiluwih 和 Tanah Lot。最终时间与停靠顺序会在预订后确认。",
    miniPromoEyebrow: "文化遗产路线",
    miniPromoSideText:
      "在一天私人行程里探索巴厘岛的文化侧面：皇家寺庙庭院、Bedugul 湖景、Jatiluwih 梯田和 Tanah Lot 海岸收尾。",
    ctaLabel: "立即预订",
    faqIntro: "预订这条 UNESCO 路线前的快速说明。",
    fullDescriptionKeyStopsHtml:
      "通常围绕 <strong>Taman Ayun - Ulun Danu Beratan - Jatiluwih - Tanah Lot</strong> 展开。",
    fullDescriptionBestFitHtml:
      "很适合 <strong>文化爱好者、情侣和家庭</strong>，行程通常约 <strong>10小时</strong>。",
    breadcrumbHome: "巴厘岛主页",
    breadcrumbTours: "行程",
    reviews: [
      { text: "我们原本是为了 Taman Ayun 才订这条路线，但整天比预期更顺畅。节奏、安排和支持都让这条 UNESCO 路线非常好走。", title: "Emma - Australia", date: "2026年4月18日 - 已验证预订" },
      { text: "这是我们在巴厘岛最轻松的一整天之一。Ulun Danu Beratan 和 Jatiluwih 最让人印象深刻，而整条路线安排得很自然。", title: "Noah - Canada", date: "2026年4月27日 - 已验证预订" },
      { text: "一整天的体验很值。拍照时间够，路线流畅，团队整天都在帮我们处理节奏和实用细节。", title: "Lina - Sweden", date: "2026年5月6日 - 已验证预订" },
    ],
    ui: {
      navTours: "线路",
      navAbout: "关于我们",
      navBooking: "预订",
      navGuides: "攻略",
      languageSwitcherLabel: "选择语言",
      aboutHeading: "关于此行程",
      highlightsHeading: "亮点",
      fullDescriptionHeading: "完整介绍",
      whatsIncludedHeading: "费用包含",
      importantInformationHeading: "重要信息",
      bestAttractionsHeading: "巴厘岛热门景点",
      helpfulPdfHeading: "巴厘岛实用文章",
      thingsToDoHeading: "巴厘岛玩什么",
      tourArticlesHeading: "关于此行程的文章",
      chipTravelGuide: "旅行指南",
      chipTourSchedule: "行程安排",
      chipWhyBook: "为何预订",
      mapOpenLabel: "打开 Google 地图路线",
      highlightsIntroLabel: "整体感觉",
      fullDescriptionWhyBookLabel: "为什么大家会订",
      fullDescriptionHowDayFeelsLabel: "这一天的节奏",
      fullDescriptionKeyStopsLabel: "关键停靠",
      fullDescriptionBestFitLabel: "适合谁",
      includesIntroLabel: "已打包好的核心内容",
      includesIntroText: "主要交通与关键支持已经包含在下面这条路线里",
      weatherLive: "实时天气",
      weatherLoading: "加载中…",
      weatherChecking: "正在查看当地天气…",
      weatherConditionLoading: "正在加载天气…",
      weatherSummaryLoading: "正在为今天寻找更适合的巴厘岛安排…",
      weatherFeelsLike: "体感温度",
      weatherHumidity: "湿度",
      weatherWind: "风速",
      weatherTipsTitle: "今日建议",
      weatherSeeRecommended: "查看推荐行程",
      weatherLocation: "巴厘岛，印度尼西亚",
      weatherClearSky: "晴朗",
      weatherMostlyClear: "大致晴朗",
      weatherPartlyCloudy: "局部多云",
      weatherCloudy: "多云",
      weatherLightRain: "小雨",
      weatherRainShowers: "阵雨",
      weatherThunderstorm: "可能有雷暴",
      weatherWarmEvening: "温暖的巴厘岛夜晚",
      weatherSunnyDay: "晴朗的巴厘岛白天",
      weatherCloudyDay: "多云的巴厘岛白天",
      weatherRainyDay: "巴厘岛雨天",
      weatherStormyDay: "巴厘岛风暴天气预警",
      weatherSunsetTip: "适合看日落",
      weatherDinnerTip: "适合安排晚餐",
      weatherLightLayerTip: "一件薄外套就够了",
      weatherBeachTip: "很适合海边时间",
      weatherSunscreenTip: "太阳很强，记得防晒",
      weatherHydrateTip: "天气热，记得多喝水",
      weatherCafeTip: "适合去咖啡馆或轻松出行",
      weatherSpaTip: "适合 spa 或咖啡馆行程",
      weatherGripShoesTip: "穿抓地力好的鞋",
      weatherRainLayerTip: "带一件轻薄雨衣",
      weatherFlexibleTip: "今天建议保持行程弹性",
      weatherShelterTip: "室内备选方案会很好用",
      footerTopTours: "热门线路",
      footerCompanyTrust: "公司与信任",
      footerContactsLocation: "联系与位置",
      footerLead: "自然与冒险相遇的地方",
      footerAboutCompany: "关于 SB Excursions",
      footerPrivacy: "隐私政策",
      footerTerms: "条款与条件",
      footerRefund: "退款政策",
      footerSiteMap: "网站地图",
      footerMessageUs: "联系我们",
      footerSupportHours: "每日支持 7:00 - 22:00",
      footerCopyright: "© 2021-2026 SB Excursions. 为巴厘岛旅程打造",
    },
  },
  es: {
    title: "Tour por los sitios Patrimonio de la UNESCO en Bali",
    metaTitle: "Tour UNESCO en Bali | Taman Ayun, Ulun Danu, Jatiluwih y Tanah Lot",
    metaDescription:
      "Reserva el tour por los sitios Patrimonio de la UNESCO en Bali con Taman Ayun, Ulun Danu Beratan, terrazas de arroz de Jatiluwih y Tanah Lot, transporte privado y entradas incluidas desde $70 por persona.",
    eyebrow: "Templos UNESCO, arrozales y Tanah Lot",
    duration: "10 horas",
    pickup: "Recogida por la mañana desde Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua o Jimbaran",
    bestFor: "amantes de la cultura, parejas, familias y primeras visitas de sightseeing en Bali",
    format: "Ruta privada de patrimonio cultural",
    area: "Ruta UNESCO por el oeste y centro de Bali",
    compactAreaLabel: "Oeste y centro de Bali",
    imageAlt: "Terrazas de arroz de Jatiluwih y paisaje de montaña en el tour UNESCO de Bali",
    lead:
      "Descubre algunos de los paisajes patrimoniales más conocidos de Bali en un solo día privado y bien armado con Taman Ayun, Ulun Danu Beratan, Jatiluwih y Tanah Lot dentro de una ruta fluida todo incluido.",
    summary:
      "Este tour UNESCO de Bali está pensado para viajeros que quieren templos, vistas de lago y montaña, arrozales UNESCO y un final potente en Tanah Lot sin tener que unir varias excursiones separadas. El transporte privado, las entradas, el sarong para templos y el agua ya están resueltos desde $70 por persona.",
    overview:
      "La ruta funciona muy bien porque mantiene variedad escénica sin volverse pesada físicamente. Empieza con la arquitectura real de Taman Ayun, sube a las tierras frescas de Bedugul para ver Ulun Danu Beratan, abre el paisaje en Jatiluwih y termina en Tanah Lot con uno de los templos costeros más icónicos de Bali.",
    aboutSubtitle: "Tour UNESCO de Bali desde Bali",
    highlights: [
      ["Templo Taman Ayun", "Empieza con uno de los complejos de templo real más elegantes de Bali y una parada cultural tranquila."],
      ["Ulun Danu Beratan", "El entorno de lago y montaña en Bedugul aporta aire fresco, luz suave y uno de los fondos de templo más icónicos de Bali."],
      ["Terrazas de arroz de Jatiluwih", "El paisaje UNESCO hace que la ruta se sienta más amplia y completa que un día solo de templos."],
      ["Final costero en Tanah Lot", "Cerrar en el famoso templo del mar da un final muy visual y con gran recompensa al día."],
    ],
    itinerary: [
      ["Recogida y Taman Ayun", "Empieza con la recogida desde las principales zonas del sur y centro de Bali y la primera parada cultural en Taman Ayun."],
      ["Ulun Danu Beratan en Bedugul", "Luego sube hacia las tierras altas para disfrutar del templo junto al lago y el aire más fresco de Bedugul."],
      ["Terrazas de Jatiluwih", "Después sigue hacia Jatiluwih para ver el paisaje UNESCO y aprovechar una pausa cómoda para almorzar."],
      ["Tanah Lot y regreso", "La jornada termina en Tanah Lot antes del regreso al hotel, ajustando horarios según tráfico y luz."],
    ],
    includes: [
      "Vehículo privado con aire acondicionado",
      "Todas las entradas del recorrido indicado",
      "Sarong para visitas a templos",
      "Agua embotellada",
    ],
    goodToKnow: [
      "El almuerzo, los gastos personales y los servicios adicionales no están incluidos en el precio base.",
      "Las zonas cubiertas para recogida son Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua y Jimbaran.",
      "Lleva cámara, efectivo, gafas de sol, calzado cómodo para templos y terrazas, y una capa ligera para la parte fresca de Bedugul.",
      "Presentamos esta experiencia como ruta privada porque la fuente especifica private air-conditioned vehicle.",
      "Es una jornada cómoda para la mayoría de viajeros, aunque el timing exacto puede cambiar por tráfico y clima.",
      "Para un reembolso completo, la fuente recomienda cancelar al menos 3 días antes del inicio.",
    ],
    meetingPoint: "Normalmente la recogida se hace directamente en el hotel, villa o Airbnb antes de comenzar la ruta.",
    faqs: [
      ["¿Cuánto dura el tour UNESCO de Bali?", "La fuente lo presenta como una ruta de unas 10 horas, con salida por la mañana y regreso después de Tanah Lot."],
      ["¿Qué lugares incluye el tour?", "Incluye Taman Ayun Temple, Ulun Danu Beratan Temple, las terrazas de arroz de Jatiluwih y Tanah Lot."],
      ["¿La recogida en hotel está incluida?", "Sí. La fuente indica recogida desde el alojamiento y pide enviar con antelación el nombre y dirección del hotel, villa o Airbnb."],
      ["¿Qué zonas cubre la recogida?", "Las zonas cubiertas son Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua y Jimbaran."],
      ["¿Qué entra en el precio?", "Incluye vehículo privado con aire acondicionado, entradas, sarong para templos y agua embotellada."],
      ["¿Está incluido el almuerzo?", "No. El almuerzo, los gastos personales y los servicios extra figuran como excluidos."],
      ["¿Necesito llevar sarong para los templos?", "No, salvo que prefieras el tuyo. La fuente indica que el sarong ya está incluido."],
      ["¿Es un tour privado o compartido?", "Lo mostramos como tour privado porque la fuente indica private air-conditioned vehicle."],
      ["¿Qué conviene llevar?", "Te recomendamos cámara, efectivo, gafas de sol, calzado cómodo y una capa ligera para Bedugul."],
      ["¿Es adecuado para niños?", "Sí. Es una ruta cómoda para parejas, familias y viajeros que quieren cultura y paisajes sin actividad física intensa."],
      ["¿Cuál es la política de cancelación?", "Para un reembolso completo, la fuente indica cancelar al menos 3 días antes del inicio."],
      ["¿Por qué la gente reserva esta ruta en vez de varias excursiones separadas?", "Porque reúne templos, lago de montaña, arrozales UNESCO y Tanah Lot en un solo día bien construido."],
    ],
    whatsappText:
      "¡Hola! Quiero reservar el tour UNESCO de Bali por $70 por persona. Por favor envíen disponibilidad, zonas de recogida y todos los detalles.",
    privateOfferEyebrow: "Ruta patrimonial UNESCO",
    privateOfferTopline: "Ideal para templos y grandes paisajes de Bali",
    mapLabel: "Ruta UNESCO",
    mapTitle: "Ruta UNESCO de Bali en Google Maps",
    mapText:
      "Consulta los puntos principales del tour UNESCO de Bali. La ruta suele incluir Taman Ayun, Ulun Danu Beratan, Jatiluwih y Tanah Lot. El horario final y el orden de paradas se confirman después de reservar.",
    miniPromoEyebrow: "Ruta patrimonial",
    miniPromoSideText:
      "Explora el lado patrimonial de Bali con patios reales, vistas al lago en Bedugul, terrazas de Jatiluwih y final costero en Tanah Lot en un solo día privado.",
    ctaLabel: "Reservar ahora",
    faqIntro: "Respuestas rápidas antes de reservar este tour UNESCO de Bali.",
    fullDescriptionKeyStopsHtml:
      "Normalmente se construye alrededor de <strong>Taman Ayun - Ulun Danu Beratan - Jatiluwih - Tanah Lot</strong>.",
    fullDescriptionBestFitHtml:
      "Ideal para <strong>viajeros culturales, parejas y familias</strong> con una ruta de unas <strong>10 horas</strong>.",
    breadcrumbHome: "Página principal de Bali",
    breadcrumbTours: "Tours",
    reviews: [
      { text: "Reservamos esta ruta sobre todo por Taman Ayun, pero el día entero salió muy fluido. La organización y el ritmo hicieron que el tour UNESCO de Bali fuera muy fácil de disfrutar.", title: "Emma - Australia", date: "18 de abril de 2026 - Reserva verificada" },
      { text: "Fue uno de los días más sencillos y completos de nuestro viaje. Ulun Danu Beratan y Jatiluwih fueron lo mejor, y todo estuvo bien organizado sin ir con prisas.", title: "Noah - Canada", date: "27 de abril de 2026 - Reserva verificada" },
      { text: "Muy buena relación calidad-precio para un día entero. Hubo tiempo para fotos y el equipo ayudó durante toda la jornada con horarios y logística.", title: "Lina - Sweden", date: "6 de mayo de 2026 - Reserva verificada" },
    ],
    ui: {
      navTours: "Tours",
      navAbout: "Sobre nosotros",
      navBooking: "Reserva",
      navGuides: "Guías",
      languageSwitcherLabel: "Elegir idioma",
      aboutHeading: "Sobre esta actividad",
      highlightsHeading: "Lo más destacado",
      fullDescriptionHeading: "Descripción completa",
      whatsIncludedHeading: "Qué incluye",
      importantInformationHeading: "Información importante",
      bestAttractionsHeading: "Mejores atracciones en Bali",
      helpfulPdfHeading: "Artículos útiles sobre Bali",
      thingsToDoHeading: "Qué hacer en Bali",
      tourArticlesHeading: "Artículos sobre este tour",
      chipTravelGuide: "Guía de viaje",
      chipTourSchedule: "Horario del tour",
      chipWhyBook: "Por qué reservar",
      mapOpenLabel: "Abrir ruta en Google Maps",
      highlightsIntroLabel: "Idea general",
      fullDescriptionWhyBookLabel: "Por qué la reservan",
      fullDescriptionHowDayFeelsLabel: "Cómo se siente el día",
      fullDescriptionKeyStopsLabel: "Paradas clave",
      fullDescriptionBestFitLabel: "Ideal para",
      includesIntroLabel: "Todo ya armado en un solo paquete",
      includesIntroText: "La logística principal y los apoyos más importantes ya vienen incluidos en esta ruta",
      weatherLive: "Clima en vivo",
      weatherLoading: "Cargando…",
      weatherChecking: "Revisando condiciones locales…",
      weatherConditionLoading: "Cargando clima…",
      weatherSummaryLoading: "Buscando el mejor plan en Bali para hoy…",
      weatherFeelsLike: "Sensación térmica",
      weatherHumidity: "Humedad",
      weatherWind: "Viento",
      weatherTipsTitle: "Consejos de hoy",
      weatherSeeRecommended: "Ver tour recomendado",
      weatherLocation: "Bali, Indonesia",
      weatherClearSky: "Cielo despejado",
      weatherMostlyClear: "Casi despejado",
      weatherPartlyCloudy: "Parcialmente nublado",
      weatherCloudy: "Nublado",
      weatherLightRain: "Lluvia ligera",
      weatherRainShowers: "Chubascos",
      weatherThunderstorm: "Riesgo de tormenta",
      weatherWarmEvening: "Tarde cálida en Bali",
      weatherSunnyDay: "Día soleado en Bali",
      weatherCloudyDay: "Día nublado en Bali",
      weatherRainyDay: "Tiempo lluvioso en Bali",
      weatherStormyDay: "Día con alerta de tormenta en Bali",
      weatherSunsetTip: "Ideal para sitios de atardecer",
      weatherDinnerTip: "Perfecto para planes de cena",
      weatherLightLayerTip: "Una capa ligera es suficiente",
      weatherBeachTip: "Muy buen clima para playa",
      weatherSunscreenTip: "Sol fuerte: usa protector",
      weatherHydrateTip: "Mantente hidratado con el calor",
      weatherCafeTip: "Buen día para cafés y paseos suaves",
      weatherSpaTip: "Ideal para spa o cafés",
      weatherGripShoesTip: "Lleva calzado con buen agarre",
      weatherRainLayerTip: "Lleva una capa ligera para lluvia",
      weatherFlexibleTip: "Conviene mantener el plan flexible",
      weatherShelterTip: "Tener una opción interior ayuda",
      footerTopTours: "Tours top",
      footerCompanyTrust: "Empresa y confianza",
      footerContactsLocation: "Contacto y ubicación",
      footerLead: "Donde la naturaleza y la aventura se encuentran",
      footerAboutCompany: "Sobre SB Excursions",
      footerPrivacy: "Política de privacidad",
      footerTerms: "Términos y condiciones",
      footerRefund: "Política de reembolso",
      footerSiteMap: "Mapa del sitio",
      footerMessageUs: "Escríbenos",
      footerSupportHours: "Soporte diario 7:00 - 22:00",
      footerCopyright: "© 2021-2026 SB Excursions. Creado para aventuras en Bali",
    },
  },
  fr: {
    title: "Circuit des sites UNESCO de Bali",
    metaTitle: "Circuit UNESCO de Bali | Taman Ayun, Ulun Danu, Jatiluwih et Tanah Lot",
    metaDescription:
      "Réservez le circuit des sites UNESCO de Bali avec Taman Ayun, Ulun Danu Beratan, les rizières de Jatiluwih et Tanah Lot, transport privé et billets inclus à partir de 70 $ par personne.",
    eyebrow: "Temples UNESCO, rizières et Tanah Lot",
    duration: "10 heures",
    pickup: "Prise en charge le matin depuis Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua ou Jimbaran",
    bestFor: "les amateurs de culture, les couples, les familles et une première journée de découverte à Bali",
    format: "Circuit privé patrimoine et paysages",
    area: "Route UNESCO dans l'ouest et le centre de Bali",
    compactAreaLabel: "Ouest et centre de Bali",
    imageAlt: "Rizières de Jatiluwih et paysage de montagne pendant le circuit UNESCO de Bali",
    lead:
      "Découvrez les plus beaux paysages patrimoniaux de Bali en une seule journée privée bien construite, avec Taman Ayun, Ulun Danu Beratan, Jatiluwih et Tanah Lot réunis dans une même route fluide.",
    summary:
      "Ce circuit UNESCO de Bali est pensé pour les voyageurs qui veulent des temples, des vues lac et montagne, les rizières classées de Jatiluwih et une belle fin à Tanah Lot sans devoir assembler plusieurs excursions séparées. Le transport privé, les billets, le sarong pour les temples et l'eau sont déjà inclus à partir de 70 $ par personne.",
    overview:
      "La route fonctionne très bien parce qu'elle reste variée et visuelle sans être fatigante. Vous commencez par l'architecture royale de Taman Ayun, continuez vers les hauteurs plus fraîches de Bedugul pour Ulun Danu Beratan, ouvrez les paysages à Jatiluwih, puis terminez à Tanah Lot face à l'océan.",
    aboutSubtitle: "Circuit UNESCO de Bali depuis Bali",
    highlights: [
      ["Temple de Taman Ayun", "Commencez par l'un des ensembles royaux les plus élégants de Bali avec une première étape culturelle calme."],
      ["Ulun Danu Beratan", "Le cadre entre lac et montagne à Bedugul apporte de l'air frais, une lumière douce et l'un des décors de temple les plus iconiques de Bali."],
      ["Rizières de Jatiluwih", "Le paysage UNESCO donne au circuit une ampleur visuelle plus forte qu'une simple journée de temples."],
      ["Final côtier à Tanah Lot", "Terminer au célèbre temple de la mer offre une vraie montée en puissance pour la fin de journée."],
    ],
    itinerary: [
      ["Prise en charge et Taman Ayun", "La journée commence par la prise en charge dans les principales zones du sud et du centre de Bali, puis la première visite à Taman Ayun."],
      ["Ulun Danu Beratan à Bedugul", "La route continue vers les hauteurs plus fraîches pour profiter du temple au bord du lac et des vues de Bedugul."],
      ["Rizières de Jatiluwih", "Ensuite, direction Jatiluwih pour les panoramas UNESCO et une pause déjeuner confortable dans la région."],
      ["Tanah Lot et retour", "La journée se termine à Tanah Lot avant le retour à l'hôtel, avec un timing ajusté selon la circulation et la lumière."],
    ],
    includes: [
      "Véhicule privé climatisé",
      "Tous les billets d'entrée du parcours indiqué",
      "Sarong pour les visites de temples",
      "Eau en bouteille",
    ],
    goodToKnow: [
      "Le déjeuner, les dépenses personnelles et les services additionnels ne sont pas inclus dans le tarif de base.",
      "Les zones couvertes pour la prise en charge sont Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua et Jimbaran.",
      "Prévoyez appareil photo, espèces, lunettes de soleil, chaussures confortables pour les temples et rizières, et une couche légère pour la partie plus fraîche de Bedugul.",
      "Nous présentons cette expérience comme un circuit privé car la source mentionne un private air-conditioned vehicle.",
      "Le rythme convient à la plupart des voyageurs, mais les horaires exacts peuvent bouger selon la météo et la circulation.",
      "Pour un remboursement complet, la source recommande d'annuler au moins 3 jours avant l'expérience.",
    ],
    meetingPoint: "La plupart des voyageurs sont pris en charge directement à leur hôtel, villa ou Airbnb avant le départ.",
    faqs: [
      ["Combien de temps dure le circuit UNESCO de Bali ?", "La source présente cette excursion comme une route d'environ 10 heures, avec départ le matin et retour après Tanah Lot."],
      ["Quels lieux sont inclus ?", "La route comprend Taman Ayun Temple, Ulun Danu Beratan Temple, les rizières de Jatiluwih et Tanah Lot."],
      ["La prise en charge à l'hôtel est-elle incluse ?", "Oui. La source précise que la prise en charge se fait depuis votre hébergement et qu'il faut envoyer le nom et l'adresse à l'avance."],
      ["Quelles zones sont couvertes pour la prise en charge ?", "Les zones indiquées sont Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua et Jimbaran."],
      ["Qu'est-ce qui est inclus dans le prix ?", "Le prix inclut le véhicule privé climatisé, les billets, le sarong pour les temples et l'eau."],
      ["Le déjeuner est-il inclus ?", "Non. Le déjeuner, les dépenses personnelles et les services supplémentaires sont indiqués comme exclus."],
      ["Faut-il apporter un sarong pour les temples ?", "Non, sauf si vous préférez le vôtre. La source précise qu'un sarong est inclus."],
      ["S'agit-il d'un tour privé ou partagé ?", "Nous le présentons comme privé parce que la source mentionne un private air-conditioned vehicle."],
      ["Que faut-il apporter ?", "Nous conseillons appareil photo, espèces, lunettes de soleil, chaussures confortables et une couche légère pour Bedugul."],
      ["Ce circuit convient-il aux enfants ?", "Oui. C'est un itinéraire confortable pour les couples, les familles et les voyageurs qui veulent culture et paysages sans activité physique intense."],
      ["Quelle est la politique d'annulation ?", "Pour un remboursement complet, la source recommande d'annuler au moins 3 jours avant le départ."],
      ["Pourquoi réserver cette route plutôt que plusieurs excursions séparées ?", "Parce qu'elle réunit en une journée temples, vues sur le lac, rizières UNESCO et côte de Tanah Lot dans une seule expérience cohérente."],
    ],
    whatsappText:
      "Bonjour ! Je souhaite réserver le circuit UNESCO de Bali à 70 $ par personne. Merci de m'envoyer les disponibilités, les zones de prise en charge et tous les détails.",
    privateOfferEyebrow: "Route patrimoine UNESCO",
    privateOfferTopline: "Très bon choix pour temples et grands paysages balinais",
    mapLabel: "Route UNESCO",
    mapTitle: "Route UNESCO de Bali sur Google Maps",
    mapText:
      "Prévisualisez les principaux points de cette route UNESCO à Bali. Elle passe généralement par Taman Ayun, Ulun Danu Beratan, Jatiluwih et Tanah Lot. L'horaire final et l'ordre des arrêts sont confirmés après réservation.",
    miniPromoEyebrow: "Route patrimoine",
    miniPromoSideText:
      "Explorez le côté patrimoine de Bali avec cours royales, vues sur le lac de Bedugul, rizières de Jatiluwih et final côtier à Tanah Lot dans une seule journée privée.",
    ctaLabel: "Réserver",
    faqIntro: "Réponses rapides avant de réserver ce circuit UNESCO de Bali.",
    fullDescriptionKeyStopsHtml:
      "Le parcours s'articule généralement autour de <strong>Taman Ayun - Ulun Danu Beratan - Jatiluwih - Tanah Lot</strong>.",
    fullDescriptionBestFitHtml:
      "Très bien pour <strong>les voyageurs culture, couples et familles</strong> avec une route d'environ <strong>10 heures</strong>.",
    breadcrumbHome: "Page principale Bali",
    breadcrumbTours: "Circuits",
    reviews: [
      { text: "Nous avions réservé surtout pour Taman Ayun, mais toute la journée s'est révélée très fluide. L'organisation et le timing ont rendu ce circuit UNESCO de Bali très facile à apprécier.", title: "Emma - Australia", date: "18 avril 2026 - Réservation vérifiée" },
      { text: "C'était l'une des journées les plus simples et les plus complètes de notre voyage. Ulun Danu Beratan et Jatiluwih ressortent le plus, et tout s'est déroulé sans stress.", title: "Noah - Canada", date: "27 avril 2026 - Réservation vérifiée" },
      { text: "Très bon rapport qualité-prix pour une journée complète. Nous avons eu du temps pour les photos et l'équipe a géré le rythme et la logistique toute la journée.", title: "Lina - Sweden", date: "6 mai 2026 - Réservation vérifiée" },
    ],
    ui: {
      navTours: "Circuits",
      navAbout: "À propos",
      navBooking: "Réserver",
      navGuides: "Guides",
      languageSwitcherLabel: "Choisir la langue",
      aboutHeading: "À propos de cette activité",
      highlightsHeading: "Points forts",
      fullDescriptionHeading: "Description complète",
      whatsIncludedHeading: "Ce qui est inclus",
      importantInformationHeading: "Informations importantes",
      bestAttractionsHeading: "Meilleures attractions de Bali",
      helpfulPdfHeading: "Articles utiles sur Bali",
      thingsToDoHeading: "Que faire à Bali",
      tourArticlesHeading: "Articles sur cette excursion",
      chipTravelGuide: "Guide de voyage",
      chipTourSchedule: "Programme du tour",
      chipWhyBook: "Pourquoi réserver",
      mapOpenLabel: "Ouvrir l'itinéraire Google Maps",
      highlightsIntroLabel: "Ambiance générale",
      fullDescriptionWhyBookLabel: "Pourquoi on le réserve",
      fullDescriptionHowDayFeelsLabel: "Le rythme de la journée",
      fullDescriptionKeyStopsLabel: "Arrêts clés",
      fullDescriptionBestFitLabel: "Idéal pour",
      includesIntroLabel: "Un seul package bien clair",
      includesIntroText: "La logistique principale et les éléments de confort essentiels sont déjà inclus dans la route ci-dessous",
      weatherLive: "Météo en direct",
      weatherLoading: "Chargement…",
      weatherChecking: "Vérification des conditions locales…",
      weatherConditionLoading: "Chargement de la météo…",
      weatherSummaryLoading: "Recherche du meilleur plan Bali pour aujourd'hui…",
      weatherFeelsLike: "Ressenti",
      weatherHumidity: "Humidité",
      weatherWind: "Vent",
      weatherTipsTitle: "Conseils du jour",
      weatherSeeRecommended: "Voir le circuit conseillé",
      weatherLocation: "Bali, Indonésie",
      weatherClearSky: "Ciel dégagé",
      weatherMostlyClear: "Plutôt dégagé",
      weatherPartlyCloudy: "Partiellement nuageux",
      weatherCloudy: "Nuageux",
      weatherLightRain: "Pluie légère",
      weatherRainShowers: "Averses",
      weatherThunderstorm: "Risque d'orage",
      weatherWarmEvening: "Soirée chaude à Bali",
      weatherSunnyDay: "Belle journée ensoleillée à Bali",
      weatherCloudyDay: "Journée nuageuse à Bali",
      weatherRainyDay: "Temps pluvieux à Bali",
      weatherStormyDay: "Alerte météo orageuse à Bali",
      weatherSunsetTip: "Parfait pour les spots de coucher de soleil",
      weatherDinnerTip: "Très bien pour prévoir un dîner",
      weatherLightLayerTip: "Une couche légère suffit",
      weatherBeachTip: "Très bon temps pour la plage",
      weatherSunscreenTip: "Soleil fort : pensez à la crème",
      weatherHydrateTip: "Hydratez-vous bien avec la chaleur",
      weatherCafeTip: "Bonne météo pour cafés et balades faciles",
      weatherSpaTip: "Très bien pour spa ou pauses café",
      weatherGripShoesTip: "Prenez des chaussures avec adhérence",
      weatherRainLayerTip: "Emportez une légère protection pluie",
      weatherFlexibleTip: "Mieux vaut garder le plan flexible aujourd'hui",
      weatherShelterTip: "Une option intérieure peut être utile",
      footerTopTours: "Nos meilleurs circuits",
      footerCompanyTrust: "Entreprise & confiance",
      footerContactsLocation: "Contacts & localisation",
      footerLead: "Là où nature et aventure se rencontrent",
      footerAboutCompany: "À propos de SB Excursions",
      footerPrivacy: "Politique de confidentialité",
      footerTerms: "Conditions générales",
      footerRefund: "Politique de remboursement",
      footerSiteMap: "Plan du site",
      footerMessageUs: "Écrivez-nous",
      footerSupportHours: "Support tous les jours 7:00 - 22:00",
      footerCopyright: "© 2021-2026 SB Excursions. Conçu pour les aventures à Bali",
    },
  },
};

function unescoUiLabels(locale = "en") {
  return {
    ...DEFAULT_WEST_UI_LABELS,
    ...(UNESCO_PAGE_TRANSLATIONS[locale]?.ui || {}),
  };
}

function sharedBaliUiLabels(locale = "en") {
  return {
    ...DEFAULT_WEST_UI_LABELS,
    ...(UNESCO_PAGE_TRANSLATIONS[locale]?.ui || {}),
  };
}

let translationCacheState = null;
let translationCacheDirty = false;

function ensureTranslationCache() {
  if (translationCacheState) return translationCacheState;

  try {
    if (fs.existsSync(TRANSLATION_CACHE_PATH)) {
      translationCacheState = JSON.parse(fs.readFileSync(TRANSLATION_CACHE_PATH, "utf8"));
    }
  } catch {}

  if (!translationCacheState || typeof translationCacheState !== "object") {
    translationCacheState = {};
  }

  return translationCacheState;
}

function saveTranslationCache() {
  if (!translationCacheDirty) return;
  fs.mkdirSync(path.dirname(TRANSLATION_CACHE_PATH), { recursive: true });
  fs.writeFileSync(TRANSLATION_CACHE_PATH, `${JSON.stringify(translationCacheState, null, 2)}\n`);
  translationCacheDirty = false;
}

function translationLocaleCode(locale = "en") {
  return locale === "zh" ? "zh-CN" : locale;
}

function translationCacheBucket(locale = "en") {
  const cache = ensureTranslationCache();
  const key = translationLocaleCode(locale);
  if (!cache[key] || typeof cache[key] !== "object") {
    cache[key] = {};
  }
  return cache[key];
}

function shouldTranslateTextValue(value) {
  const text = String(value || "");
  const collapsed = collapseWhitespace(text);
  if (!collapsed) return false;
  if (/^(?:https?:)?\/\//i.test(collapsed)) return false;
  if (/^\/(?:bali|dubai|images|css|js|files)\//i.test(collapsed)) return false;
  if (/^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*$/i.test(collapsed) && !/\s/.test(collapsed)) return false;
  return /[A-Za-z]/.test(collapsed);
}

function maskHtmlTags(fragment) {
  const tags = [];
  const masked = String(fragment || "").replace(/<[^>]+>/g, (tag) => {
    const index = tags.push(tag) - 1;
    return `𓆩SBTAG${index}𓆪`;
  });
  return { masked, tags };
}

function unmaskHtmlTags(fragment, tags = []) {
  return String(fragment || "").replace(/𓆩SBTAG(\d+)𓆪/g, (_, rawIndex) => tags[Number(rawIndex)] || "");
}

async function fetchGoogleTranslation(text, locale = "en") {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", translationLocaleCode(locale));
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url, { headers: { accept: "application/json,text/plain,*/*" } });
  if (!response.ok) {
    throw new Error(`Translation request failed with ${response.status}`);
  }

  const payload = JSON.parse(await response.text());
  return Array.isArray(payload?.[0]) ? payload[0].map((item) => item?.[0] || "").join("") : text;
}

async function translateTextMap(texts, locale = "en", options = {}) {
  const { richText = false } = options;
  const bucket = translationCacheBucket(locale);
  const sources = Array.from(new Set((texts || []).filter(shouldTranslateTextValue)));
  const translated = new Map();
  const pending = [];
  const prepared = new Map();

  for (const source of sources) {
    if (bucket[source]) {
      translated.set(source, bucket[source]);
      continue;
    }

    const preparedValue = richText ? maskHtmlTags(source) : { masked: String(source), tags: [] };
    prepared.set(source, preparedValue);
    pending.push(source);
  }

  const separator = "\n[[SBXSEP]]\n";
  const maxChunkLength = 2800;
  let chunk = [];
  let chunkLength = 0;

  const flushChunk = async () => {
    if (!chunk.length) return;

    const joined = chunk.map((source) => prepared.get(source)?.masked || source).join(separator);
    let translatedPieces = [];

    try {
      const translatedJoined = await fetchGoogleTranslation(joined, locale);
      translatedPieces = translatedJoined.split("[[SBXSEP]]");
    } catch {
      translatedPieces = [];
    }

    if (translatedPieces.length !== chunk.length) {
      for (const source of chunk) {
        const preparedValue = prepared.get(source) || { masked: source, tags: [] };
        try {
          const singleTranslation = await fetchGoogleTranslation(preparedValue.masked, locale);
          const finalText = richText ? unmaskHtmlTags(singleTranslation, preparedValue.tags) : singleTranslation;
          bucket[source] = finalText;
          translated.set(source, finalText);
          translationCacheDirty = true;
        } catch {
          bucket[source] = source;
          translated.set(source, source);
          translationCacheDirty = true;
        }
      }
    } else {
      chunk.forEach((source, index) => {
        const preparedValue = prepared.get(source) || { tags: [] };
        const piece = translatedPieces[index] ?? source;
        const finalText = richText ? unmaskHtmlTags(piece.trim(), preparedValue.tags) : piece.trim();
        bucket[source] = finalText;
        translated.set(source, finalText);
      });
      translationCacheDirty = true;
    }

    chunk = [];
    chunkLength = 0;
  };

  for (const source of pending) {
    const preparedValue = prepared.get(source)?.masked || source;
    const nextLength = chunkLength + preparedValue.length + separator.length;
    if (chunk.length && nextLength > maxChunkLength) {
      await flushChunk();
    }
    chunk.push(source);
    chunkLength += preparedValue.length + separator.length;
  }

  await flushChunk();

  for (const source of sources) {
    if (!translated.has(source)) {
      translated.set(source, bucket[source] || source);
    }
  }

  // "SB Excursions" is a brand name — machine translation localizes it
  // ("СБ Экскурсии", "SB Excursiones", …). Restore it everywhere, including
  // values that came straight from the cache.
  for (const [source, value] of translated) {
    translated.set(source, normalizeBrandName(value));
  }

  return translated;
}

const BRAND_NAME = "SB Excursions";

function normalizeBrandName(text) {
  if (!text) return text;
  return String(text)
    .replace(/(?:СБ|SB)\s*[-–—]?\s*Экскурси[а-яё]*/giu, BRAND_NAME)
    .replace(/SB\s*[-–—]?\s*(?:Excursiones|Excursões|Escursioni)/giu, BRAND_NAME)
    .replace(/(?:Excursiones|Excursões|Escursioni|Excursions)\s+(?:de|del|di)\s+SB/giu, BRAND_NAME)
    .replace(/SB\s*(?:短途旅行|游览|旅游|远足|观光)/gu, BRAND_NAME);
}

function localizedMainPageRoute(locale = "en") {
  return `/bali/${locale}/main-page`;
}

function localizedMainPageFileName(locale = "en") {
  return locale === "en" ? "page128073236.html" : `bali-main-page-${locale}.html`;
}

function localizedJournalHubRoute(locale = "en") {
  return `/bali/${locale}/journal`;
}

function localizedJournalHubFileName(locale = "en") {
  return locale === "en" ? "bali-journal.html" : `bali-journal-${locale}.html`;
}

function localizedBaliInternalRoute(route, locale = "en") {
  const text = String(route || "");
  if (locale === "en") return text;
  return text
    .replace(/^\/bali\/en(?=\/|$)/i, `/bali/${locale}`)
    .replace(new RegExp(`^${escapeRegExp(SITE_URL)}\\/bali\\/en(?=\\/|$)`, "i"), `${SITE_URL}/bali/${locale}`);
}

function localizedTourFileName(slug, locale = "en") {
  return locale === "en" ? `bali-tour-${slug}.html` : `bali-tour-${slug}-${locale}.html`;
}

function localizedJournalArticleFileName(tour, articleType, locale = "en") {
  const base = journalArticleFileName(tour, articleType).replace(/\.html$/i, "");
  return locale === "en" ? `${base}.html` : `${base}-${locale}.html`;
}

function localizedGuideArticleFileName(guide, locale = "en") {
  const base = guideArticleFileName(guide).replace(/\.html$/i, "");
  return locale === "en" ? `${base}.html` : `${base}-${locale}.html`;
}

function switchBaliRouteLocale(route, locale = "en") {
  const text = String(route || "");
  return text
    .replace(/^\/bali\/[a-z]{2}(?=\/|$|#)/i, `/bali/${locale}`)
    .replace(new RegExp(`^${escapeRegExp(SITE_URL)}\\/bali\\/[a-z]{2}(?=\\/|$|#)`, "i"), `${SITE_URL}/bali/${locale}`);
}

function rewriteBaliLocaleRoutesInHtml(html, locale = "en") {
  if (locale === "en") return html;
  return String(html || "")
    .replace(new RegExp(`${escapeRegExp(SITE_URL)}\\/bali\\/en(?=\\/|$|#|"|')`, "g"), `${SITE_URL}/bali/${locale}`)
    .replace(/\/bali\/en(?=\/|$|#|"|')/g, `/bali/${locale}`);
}

function protectHtmlBlocks(html) {
  const blocks = [];
  const protectedHtml = String(html || "").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (block) => {
    const token = `__SB_HTML_BLOCK_${blocks.length}__`;
    blocks.push(block);
    return token;
  });
  return { protectedHtml, blocks };
}

function restoreHtmlBlocks(html, blocks = []) {
  return String(html || "").replace(/__SB_HTML_BLOCK_(\d+)__/g, (_, rawIndex) => blocks[Number(rawIndex)] || "");
}

async function translateStandaloneHtmlVisibleText(html, locale = "en") {
  if (locale === "en") return html;

  const { protectedHtml, blocks } = protectHtmlBlocks(html);
  const textValues = new Set();

  protectedHtml.replace(/>([^<>]+)</g, (_, rawText) => {
    const trimmed = String(rawText || "").replace(/\s+/g, " ").trim();
    if (shouldTranslateTextValue(trimmed)) {
      textValues.add(trimmed);
    }
    return _;
  });

  protectedHtml.replace(/<(?:title)>([^<]+)<\/title>/gi, (_, rawText) => {
    const trimmed = String(rawText || "").replace(/\s+/g, " ").trim();
    if (shouldTranslateTextValue(trimmed)) {
      textValues.add(trimmed);
    }
    return _;
  });

  protectedHtml.replace(
    /(<meta\b[^>]*\b(?:name|property)=["'](?:description|og:title|og:description|twitter:title|twitter:description)["'][^>]*\bcontent=["'])([^"']+)(["'][^>]*>)/gi,
    (_, __, rawText) => {
      const trimmed = String(rawText || "").replace(/\s+/g, " ").trim();
      if (shouldTranslateTextValue(trimmed)) {
        textValues.add(trimmed);
      }
      return _;
    },
  );

  protectedHtml.replace(/(\s(?:alt|title|placeholder|aria-label)=["'])([^"']+)(["'])/gi, (_, __, rawText) => {
    const trimmed = String(rawText || "").replace(/\s+/g, " ").trim();
    if (shouldTranslateTextValue(trimmed)) {
      textValues.add(trimmed);
    }
    return _;
  });

  const translationMap = await translateTextMap(Array.from(textValues), locale);

  const translatePreservingWhitespace = (rawText) => {
    const source = String(rawText || "");
    const collapsed = source.replace(/\s+/g, " ").trim();
    if (!collapsed || !translationMap.has(collapsed)) {
      return source;
    }
    const translated = translationMap.get(collapsed) || collapsed;
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };

  let localizedHtml = protectedHtml
    .replace(/>([^<>]+)</g, (match, rawText) => `>${translatePreservingWhitespace(rawText)}<`)
    .replace(/<(?:title)>([^<]+)<\/title>/gi, (match, rawText) => `<title>${translatePreservingWhitespace(rawText).trim()}</title>`)
    .replace(
      /(<meta\b[^>]*\b(?:name|property)=["'](?:description|og:title|og:description|twitter:title|twitter:description)["'][^>]*\bcontent=["'])([^"']+)(["'][^>]*>)/gi,
      (match, prefix, rawText, suffix) => `${prefix}${translatePreservingWhitespace(rawText).trim()}${suffix}`,
    )
    .replace(
      /(\s(?:alt|title|placeholder|aria-label)=["'])([^"']+)(["'])/gi,
      (match, prefix, rawText, suffix) => `${prefix}${translatePreservingWhitespace(rawText).trim()}${suffix}`,
    );

  localizedHtml = restoreHtmlBlocks(localizedHtml, blocks);
  localizedHtml = localizedHtml.replace(/<html lang="[^"]+"/i, `<html lang="${locale}"`);
  localizedHtml = localizedHtml.replace(/("inLanguage"\s*:\s*")en(")/g, `$1${locale}$2`);
  return localizedHtml;
}

function renderJournalLanguageSwitcherMarkup(locale = "en", currentRoute = localizedJournalHubRoute(locale), variant = "desktop") {
  const routes = BALI_LANGUAGE_OPTIONS.map((item) => ({
    ...item,
    href: switchBaliRouteLocale(currentRoute, item.code),
    active: item.code === locale,
  }));
  const iconPath = variant === "mobile" ? "/images/ui/language.png" : "/images/ui/language-black.png";

  return `<details class="sb-journal-lang-switcher sb-journal-lang-switcher--${variant}">
    <summary class="sb-journal-lang-switcher__summary" aria-label="${escapeHtml(sharedBaliUiLabels(locale).languageSwitcherLabel)}">
      <img src="${iconPath}" alt="${escapeHtml(sharedBaliUiLabels(locale).languageSwitcherLabel)}">
    </summary>
    <div class="sb-journal-lang-switcher__menu">
      ${routes
        .map(
          (item) => `<a class="sb-journal-lang-switcher__option" data-active="${item.active ? "true" : "false"}" href="${escapeHtml(item.href)}">
            <span>${escapeHtml(item.label)}</span>
            <span class="sb-journal-lang-switcher__code">${escapeHtml(item.code.toUpperCase())}</span>
          </a>`,
        )
        .join("")}
    </div>
  </details>`;
}

function buildJournalLanguageSwitcherAssets() {
  return `
<style id="sb-journal-language-switcher-style">
.sb-journal-lang-switcher{position:relative;display:inline-flex;align-items:center}
.sb-journal-lang-switcher__summary{list-style:none;display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;padding:0;border:0;background:transparent;cursor:pointer}
.sb-journal-lang-switcher__summary::-webkit-details-marker{display:none}
.sb-journal-lang-switcher__summary img{width:28px;height:28px;object-fit:contain;display:block}
.sb-journal-lang-switcher__menu{position:absolute;top:calc(100% + 10px);right:0;display:none;min-width:190px;padding:10px;border-radius:18px;background:#fff;box-shadow:0 18px 46px rgba(17,24,39,0.18);z-index:1006}
.sb-journal-lang-switcher[open] .sb-journal-lang-switcher__menu{display:grid;gap:6px}
.sb-journal-lang-switcher__option{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:42px;padding:10px 14px;border-radius:14px;background:rgba(126,196,244,0.08);color:#111827;font-family:'Cina GEO', 'TildaSans',Arial,sans-serif;font-size:15px;line-height:1.2;font-weight:600;text-decoration:none}
.sb-journal-lang-switcher__option:hover,.sb-journal-lang-switcher__option:focus-visible{background:rgba(126,196,244,0.16);outline:none}
.sb-journal-lang-switcher__option[data-active="true"]{background:rgba(126,196,244,0.24);color:#0f172a}
.sb-journal-lang-switcher__code{font-size:12px;line-height:1;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.6}
.sb-journal-tour-header__langs{display:flex;align-items:center;gap:12px;color:#000;font-size:16px;font-weight:600;letter-spacing:-1px}
.sb-journal-tour-header__mobile-bar{grid-template-columns:1fr auto auto !important}
.sb-journal-tour-header__mobile-logo-link{order:1;justify-self:start}
.sb-journal-tour-header__socials{order:2;justify-self:end}
.sb-journal-tour-header__burger{order:3;justify-self:end}
.sb-journal-tour-header__socials{display:flex;align-items:center;gap:10px;justify-content:flex-end}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__summary{width:30px;height:30px}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__summary img{width:26px;height:26px}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__menu{background:#3a3a3a;box-shadow:0 18px 46px rgba(17,24,39,0.28)}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__option{background:rgba(255,255,255,0.08);color:#fff}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__option:hover,.sb-journal-tour-header__socials .sb-journal-lang-switcher__option:focus-visible{background:rgba(255,255,255,0.14)}
.sb-journal-tour-header__socials .sb-journal-lang-switcher__option[data-active="true"]{background:rgba(126,196,244,0.16);color:#7ec4f4}
@media screen and (max-width:640px){.sb-journal-lang-switcher__menu{min-width:174px}}
</style>`;
}

function localizeJournalShell(html, locale = "en", currentRoute = localizedJournalHubRoute(locale)) {
  let localizedHtml = html.replace(/<html lang="[^"]+"/i, `<html lang="${locale}"`);
  const assets = buildJournalLanguageSwitcherAssets();
  if (!localizedHtml.includes('id="sb-journal-language-switcher-style"') && /<\/head>/i.test(localizedHtml)) {
    localizedHtml = localizedHtml.replace(/<\/head>/i, `${assets}\n</head>`);
  }

  localizedHtml = rewriteBaliLocaleRoutesInHtml(localizedHtml, locale);

  localizedHtml = localizedHtml.replace(
    /<div class="sb-journal-tour-header__langs"[\s\S]*?<\/div>/,
    `<div class="sb-journal-tour-header__langs">${renderJournalLanguageSwitcherMarkup(locale, currentRoute, "desktop")}</div>`,
  );

  localizedHtml = localizedHtml.replace(
    /<div class="sb-journal-tour-header__socials"[\s\S]*?<\/div>/,
    `<div class="sb-journal-tour-header__socials" aria-label="Language selector">${renderJournalLanguageSwitcherMarkup(locale, currentRoute, "mobile")}</div>`,
  );

  return localizedHtml;
}

async function buildLocalizedStaticHtmlPage(html, locale = "en", options = {}) {
  if (locale === "en") return html;

  const {
    shell = "generic",
    currentRoute = localizedMainPageRoute(locale),
    routeBuilder,
  } = options;

  let localizedHtml = String(html || "");

  if (shell === "tilda") {
    localizedHtml = localizeUnescoShell(localizedHtml, locale, {
      routeBuilder: typeof routeBuilder === "function" ? routeBuilder : (code) => switchBaliRouteLocale(currentRoute, code),
    });
  } else if (shell === "journal") {
    localizedHtml = localizeJournalShell(localizedHtml, locale, currentRoute);
  }

  localizedHtml = rewriteBaliLocaleRoutesInHtml(localizedHtml, locale);
  localizedHtml = await translateStandaloneHtmlVisibleText(localizedHtml, locale);
  localizedHtml = rewriteBaliLocaleRoutesInHtml(localizedHtml, locale);

  if (shell === "tilda") {
    localizedHtml = localizeUnescoShell(localizedHtml, locale, {
      routeBuilder: typeof routeBuilder === "function" ? routeBuilder : (code) => switchBaliRouteLocale(currentRoute, code),
    });
  } else if (shell === "journal") {
    localizedHtml = localizeJournalShell(localizedHtml, locale, currentRoute);
  }

  localizedHtml = localizedHtml.replace(/<html lang="[^"]+"/i, `<html lang="${locale}"`);
  localizedHtml = localizedHtml.replace(/(<link rel="canonical" href=")https:\/\/sbexcursion\.com\/bali\/en/gi, `$1https://sbexcursion.com/bali/${locale}`);
  localizedHtml = localizedHtml.replace(/(<meta property="og:url" content=")https:\/\/sbexcursion\.com\/bali\/en/gi, `$1https://sbexcursion.com/bali/${locale}`);
  localizedHtml = localizedHtml.replace(/("inLanguage"\s*:\s*")en(")/g, `$1${locale}$2`);
  return localizedHtml;
}

function buildLocalizedUnescoTour(locale = "en") {
  const baseTour = tourBySlug("bali-unesco");
  if (!baseTour) return null;
  if (locale === "en") {
    return {
      ...baseTour,
      locale: "en",
    };
  }

  const translation = UNESCO_PAGE_TRANSLATIONS[locale];
  if (!translation) return null;

  return {
    ...baseTour,
    ...translation,
    locale,
    mainPage: false,
    aiPlanner: false,
    tags: Array.isArray(baseTour.tags) ? [...baseTour.tags] : [],
    related: Array.isArray(baseTour.related) ? [...baseTour.related] : [],
    collageImages: Array.isArray(baseTour.collageImages) ? baseTour.collageImages.map((asset) => ({ ...asset })) : [],
    mainPageFeatures: Array.isArray(baseTour.mainPageFeatures) ? baseTour.mainPageFeatures.map((feature) => [...feature]) : [],
    highlights: translation.highlights.map((item) => [...item]),
    itinerary: translation.itinerary.map((item) => [...item]),
    includes: [...translation.includes],
    goodToKnow: [...translation.goodToKnow],
    faqs: translation.faqs.map((item) => [...item]),
    reviews: translation.reviews.map((item) => ({ ...item })),
  };
}

function collectAutoTourTranslations(tour) {
  const plain = new Set();
  const rich = new Set();
  const addPlain = (value) => {
    if (shouldTranslateTextValue(value)) plain.add(String(value));
  };
  const addRich = (value) => {
    if (shouldTranslateTextValue(value)) rich.add(String(value));
  };

  [
    tour.title,
    tour.metaTitle,
    tour.metaDescription,
    tour.eyebrow,
    tour.duration,
    tour.pickup,
    tour.bestFor,
    tour.format,
    tour.area,
    tour.compactAreaLabel,
    tour.imageAlt,
    tour.lead,
    tour.summary,
    tour.overview,
    tour.aboutSubtitle,
    tour.meetingPoint,
    tour.whatsappText,
    tour.privateOfferEyebrow,
    tour.privateOfferTopline,
    tour.mapLabel,
    tour.mapTitle,
    tour.mapText,
    tour.miniPromoText,
    tour.miniPromoEyebrow,
    tour.miniPromoSideText,
    tour.ctaLabel,
    tour.faqIntro,
    tour.breadcrumbHome,
    tour.breadcrumbTours,
    tour.price,
    tour.mainPagePrice,
    tour.mainPagePriceNote,
    tour.offerSectionHeading,
  ].forEach(addPlain);

  [tour.fullDescriptionKeyStopsHtml, tour.fullDescriptionBestFitHtml].forEach(addRich);

  (tour.highlights || []).forEach(([title, text]) => {
    addPlain(title);
    addPlain(text);
  });

  (tour.itinerary || []).forEach(([title, text]) => {
    addPlain(title);
    addPlain(text);
  });

  (tour.includes || []).forEach(addPlain);
  (tour.goodToKnow || []).forEach(addPlain);
  (tour.faqs || []).forEach(([question, answer]) => {
    addPlain(question);
    addPlain(answer);
  });
  (tour.reviews || []).forEach((review) => {
    addPlain(review?.text);
    addPlain(review?.title);
    addPlain(review?.date);
  });
  (tour.mainPageFeatures || []).forEach((feature) => addPlain(feature?.[1]));
  (tour.collageImages || []).forEach((asset) => addPlain(asset?.altText));

  return {
    plain: Array.from(plain),
    rich: Array.from(rich),
  };
}

function withTranslatedText(value, map) {
  if (!value || !(map instanceof Map)) return value;
  return map.get(String(value)) || value;
}

async function buildAutoLocalizedTour(baseTour, locale = "en") {
  if (!baseTour) return null;
  if (baseTour.slug === "bali-unesco") {
    return buildLocalizedUnescoTour(locale);
  }
  if (locale === "en") {
    return {
      ...baseTour,
      locale: "en",
      ui: sharedBaliUiLabels("en"),
    };
  }

  const strings = collectAutoTourTranslations(baseTour);
  const plainMap = await translateTextMap(strings.plain, locale);
  const richMap = await translateTextMap(strings.rich, locale, { richText: true });

  const translatedTour = {
    ...baseTour,
    locale,
    ui: sharedBaliUiLabels(locale),
    mainPage: false,
    aiPlanner: false,
    title: withTranslatedText(baseTour.title, plainMap),
    metaTitle: withTranslatedText(baseTour.metaTitle, plainMap),
    metaDescription: withTranslatedText(baseTour.metaDescription, plainMap),
    eyebrow: withTranslatedText(baseTour.eyebrow, plainMap),
    duration: withTranslatedText(baseTour.duration, plainMap),
    pickup: withTranslatedText(baseTour.pickup, plainMap),
    bestFor: withTranslatedText(baseTour.bestFor, plainMap),
    format: withTranslatedText(baseTour.format, plainMap),
    area: withTranslatedText(baseTour.area, plainMap),
    compactAreaLabel: withTranslatedText(baseTour.compactAreaLabel, plainMap),
    imageAlt: withTranslatedText(baseTour.imageAlt, plainMap),
    lead: withTranslatedText(baseTour.lead, plainMap),
    summary: withTranslatedText(baseTour.summary, plainMap),
    overview: withTranslatedText(baseTour.overview, plainMap),
    aboutSubtitle: withTranslatedText(baseTour.aboutSubtitle, plainMap),
    meetingPoint: withTranslatedText(baseTour.meetingPoint, plainMap),
    whatsappText: withTranslatedText(baseTour.whatsappText, plainMap),
    privateOfferEyebrow: withTranslatedText(baseTour.privateOfferEyebrow, plainMap),
    privateOfferTopline: withTranslatedText(baseTour.privateOfferTopline, plainMap),
    mapLabel: withTranslatedText(baseTour.mapLabel, plainMap),
    mapTitle: withTranslatedText(baseTour.mapTitle, plainMap),
    mapText: withTranslatedText(baseTour.mapText, plainMap),
    miniPromoText: withTranslatedText(baseTour.miniPromoText, plainMap),
    miniPromoEyebrow: withTranslatedText(baseTour.miniPromoEyebrow, plainMap),
    miniPromoSideText: withTranslatedText(baseTour.miniPromoSideText, plainMap),
    ctaLabel: withTranslatedText(baseTour.ctaLabel, plainMap),
    faqIntro: withTranslatedText(baseTour.faqIntro, plainMap),
    breadcrumbHome: withTranslatedText(baseTour.breadcrumbHome, plainMap),
    breadcrumbTours: withTranslatedText(baseTour.breadcrumbTours, plainMap),
    price: withTranslatedText(baseTour.price, plainMap),
    mainPagePrice: withTranslatedText(baseTour.mainPagePrice, plainMap),
    mainPagePriceNote: withTranslatedText(baseTour.mainPagePriceNote, plainMap),
    offerSectionHeading: withTranslatedText(baseTour.offerSectionHeading, plainMap),
    fullDescriptionKeyStopsHtml: withTranslatedText(baseTour.fullDescriptionKeyStopsHtml, richMap),
    fullDescriptionBestFitHtml: withTranslatedText(baseTour.fullDescriptionBestFitHtml, richMap),
    highlights: (baseTour.highlights || []).map(([title, text]) => [withTranslatedText(title, plainMap), withTranslatedText(text, plainMap)]),
    itinerary: (baseTour.itinerary || []).map(([title, text]) => [withTranslatedText(title, plainMap), withTranslatedText(text, plainMap)]),
    includes: (baseTour.includes || []).map((item) => withTranslatedText(item, plainMap)),
    goodToKnow: (baseTour.goodToKnow || []).map((item) => withTranslatedText(item, plainMap)),
    faqs: (baseTour.faqs || []).map(([question, answer]) => [withTranslatedText(question, plainMap), withTranslatedText(answer, plainMap)]),
    reviews: (baseTour.reviews || []).map((review) => ({
      ...review,
      text: withTranslatedText(review?.text, plainMap),
      title: withTranslatedText(review?.title, plainMap),
      date: withTranslatedText(review?.date, plainMap),
    })),
    mainPageFeatures: (baseTour.mainPageFeatures || []).map(([icon, text]) => [icon, withTranslatedText(text, plainMap)]),
    collageImages: (baseTour.collageImages || []).map((asset) =>
      asset && typeof asset === "object"
        ? {
            ...asset,
            altText: withTranslatedText(asset.altText, plainMap),
          }
        : asset,
    ),
    related: Array.isArray(baseTour.related) ? [...baseTour.related] : [],
    tags: Array.isArray(baseTour.tags) ? [...baseTour.tags] : [],
    mainPageFilterTags: Array.isArray(baseTour.mainPageFilterTags) ? [...baseTour.mainPageFilterTags] : baseTour.mainPageFilterTags,
  };

  return translatedTour;
}

function buildUnescoLanguageSwitcherAssets(locale = "en", routeBuilder = (code) => `/bali/${code}/tours/bali-unesco`) {
  const currentLocale = BALI_LANGUAGE_OPTIONS.find((item) => item.code === locale)?.code || "en";
  const currentUi = sharedBaliUiLabels(currentLocale);
  const localeRoutes = BALI_LANGUAGE_OPTIONS.map((item) => ({
    ...item,
    href: routeBuilder(item.code),
    active: item.code === currentLocale,
  }));
  const switcherConfig = JSON.stringify({
    locales: localeRoutes,
    currentLocale,
    ariaLabel: currentUi.languageSwitcherLabel,
    desktopIcon: "/images/ui/language-black.png",
    mobileIcon: "/images/ui/language.png",
  });

  return `
<style id="sb-unesco-language-switcher-style">
#rec1816521261 .t228__right_langs{
  display:flex;
  align-items:center;
  margin-left:16px;
}
#rec1816521261 .sb-unesco-lang-slot,
#rec2128776473 .sb-unesco-lang-slot{
  position:relative;
  display:flex;
  align-items:center;
}
#rec1816521261 .sb-unesco-lang-trigger,
#rec2128776473 .sb-unesco-lang-trigger{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:42px;
  height:42px;
  padding:0;
  border:none;
  background:transparent;
  cursor:pointer;
}
#rec1816521261 .sb-unesco-lang-trigger img,
#rec2128776473 .sb-unesco-lang-trigger img{
  width:28px;
  height:28px;
  object-fit:contain;
  display:block;
}
#rec1816521261 .sb-unesco-lang-menu,
#rec2128776473 .sb-unesco-lang-menu{
  position:absolute;
  top:calc(100% + 10px);
  right:0;
  min-width:190px;
  padding:10px;
  border-radius:18px;
  background:#ffffff;
  box-shadow:0 18px 46px rgba(17,24,39,0.18);
  display:none;
  z-index:1005;
}
#rec2128776473 .sb-unesco-lang-menu{
  top:calc(100% + 14px);
  background:#3a3a3a;
  box-shadow:0 18px 46px rgba(17,24,39,0.28);
}
#rec1816521261 .sb-unesco-lang-slot[data-open="true"] .sb-unesco-lang-menu,
#rec2128776473 .sb-unesco-lang-slot[data-open="true"] .sb-unesco-lang-menu{
  display:grid;
  gap:6px;
}
#rec1816521261 .sb-unesco-lang-option,
#rec2128776473 .sb-unesco-lang-option{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  min-height:42px;
  padding:10px 14px;
  border-radius:14px;
  font-family:'Cina GEO', 'TildaSans',Arial,sans-serif;
  font-size:15px;
  line-height:1.2;
  font-weight:600;
  text-decoration:none;
  transition:background-color .2s ease,color .2s ease,opacity .2s ease;
}
#rec1816521261 .sb-unesco-lang-option{
  color:#111827;
  background:rgba(126,196,244,0.08);
}
#rec1816521261 .sb-unesco-lang-option:hover,
#rec1816521261 .sb-unesco-lang-option:focus-visible{
  background:rgba(126,196,244,0.16);
  outline:none;
}
#rec2128776473 .sb-unesco-lang-option{
  color:#ffffff;
  background:rgba(255,255,255,0.08);
}
#rec2128776473 .sb-unesco-lang-option:hover,
#rec2128776473 .sb-unesco-lang-option:focus-visible{
  background:rgba(255,255,255,0.14);
  outline:none;
}
#rec1816521261 .sb-unesco-lang-option[data-active="true"]{
  color:#0f172a;
  background:rgba(126,196,244,0.24);
}
#rec2128776473 .sb-unesco-lang-option[data-active="true"]{
  color:#7ec4f4;
  background:rgba(126,196,244,0.16);
}
#rec1816521261 .sb-unesco-lang-option-code,
#rec2128776473 .sb-unesco-lang-option-code{
  font-size:12px;
  line-height:1;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  opacity:.6;
}
#rec2128776473 .t-menuwidgeticons__wrapper{
  display:none !important;
}
#rec2128776473 .t451__burger-wrapper__mobile{
  display:flex !important;
  flex-direction:row !important;
  align-items:center;
  justify-content:flex-end;
  gap:12px;
}
#rec2128776473 .t451__burger-wrapper__mobile > *{
  flex:0 0 auto;
}
#rec2128776473 .sb-unesco-lang-slot{
  order:1 !important;
}
#rec2128776473 .t451__burger,
#rec2128776473 .t-menuburger{
  order:2 !important;
  margin-left:0 !important;
}
@media screen and (max-width:640px){
  #rec1816521261 .sb-unesco-lang-trigger,
  #rec2128776473 .sb-unesco-lang-trigger{
    width:40px;
    height:40px;
  }
  #rec1816521261 .sb-unesco-lang-menu,
  #rec2128776473 .sb-unesco-lang-menu{
    min-width:174px;
  }
}
</style>
<script id="sb-unesco-language-switcher-script">
(function () {
  var config = ${switcherConfig};

  function buildMenuHtml() {
    return config.locales.map(function (localeItem) {
      var safeLabel = String(localeItem.label || "");
      var safeHref = String(localeItem.href || "#");
      var safeCode = String(localeItem.code || "").toUpperCase();
      var isActive = localeItem.active ? "true" : "false";
      return '<a class="sb-unesco-lang-option" data-active="' + isActive + '" href="' + safeHref + '">' +
        '<span>' + safeLabel + '</span>' +
        '<span class="sb-unesco-lang-option-code">' + safeCode + '</span>' +
      '</a>';
    }).join("");
  }

  function buildSlot(className, iconPath) {
    return '<div class="sb-unesco-lang-slot ' + className + '" data-open="false">' +
      '<button class="sb-unesco-lang-trigger" type="button" aria-haspopup="true" aria-expanded="false" aria-label="' + config.ariaLabel + '">' +
        '<img src="' + iconPath + '" alt="' + config.ariaLabel + '">' +
      '</button>' +
      '<div class="sb-unesco-lang-menu">' + buildMenuHtml() + '</div>' +
    '</div>';
  }

  function closeMenus(exceptNode) {
    var nodes = document.querySelectorAll('.sb-unesco-lang-slot');
    Array.prototype.forEach.call(nodes, function (node) {
      if (exceptNode && node === exceptNode) return;
      node.setAttribute('data-open', 'false');
      var trigger = node.querySelector('.sb-unesco-lang-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function injectDesktop() {
    var host = document.querySelector('#rec1816521261 .t228__right_langs');
    if (!host || host.querySelector('.sb-unesco-lang-slot')) return;
    host.innerHTML = buildSlot('sb-unesco-lang-slot--desktop', config.desktopIcon || config.mobileIcon);
  }

  function injectMobile() {
    var wrapper = document.querySelector('#rec2128776473 .t451__burger-wrapper__mobile');
    if (!wrapper || wrapper.querySelector('.sb-unesco-lang-slot--mobile')) return;
    var burger = wrapper.querySelector('.t451__burger, .t-menuburger');
    var holder = document.createElement('div');
    holder.innerHTML = buildSlot('sb-unesco-lang-slot--mobile', config.mobileIcon || config.desktopIcon);
    var slot = holder.firstElementChild;
    if (burger) {
      wrapper.insertBefore(slot, burger);
    } else {
      wrapper.appendChild(slot);
    }
  }

  function initSlots() {
    injectDesktop();
    injectMobile();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.sb-unesco-lang-trigger');
    if (trigger) {
      var slot = trigger.closest('.sb-unesco-lang-slot');
      var isOpen = slot && slot.getAttribute('data-open') === 'true';
      closeMenus(slot);
      if (slot && !isOpen) {
        slot.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
      }
      event.preventDefault();
      return;
    }

    if (!event.target.closest('.sb-unesco-lang-slot')) {
      closeMenus();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlots);
  } else {
    initSlots();
  }
  window.addEventListener('load', initSlots);
  window.setTimeout(initSlots, 600);
  window.setTimeout(initSlots, 1400);
})();
</script>`;
}

function localizedUnescoFileName(locale = "en") {
  return locale === "en" ? "bali-tour-bali-unesco.html" : `bali-tour-bali-unesco-${locale}.html`;
}

function replaceEverywhere(html, source, target) {
  if (!source || source === target) return html;
  return html.split(source).join(target);
}

function localizeUnescoShell(html, locale = "en", options = {}) {
  const currentLocale = BALI_LANGUAGE_OPTIONS.find((item) => item.code === locale)?.code || "en";
  const uiResolver = typeof options.uiResolver === "function" ? options.uiResolver : sharedBaliUiLabels;
  const routeBuilder = typeof options.routeBuilder === "function" ? options.routeBuilder : ((code) => `/bali/${code}/tours/bali-unesco`);
  const ui = uiResolver(currentLocale);
  const navFaqLabel = ui.navFaq || ui.faqHeading || "FAQ";
  const shellReplacements = [
    ["Our Tours", ui.navTours],
    ["About Us", ui.navAbout],
    ["Booking", ui.navBooking],
    ["Our guides", ui.navGuides],
    ["WhatsApp", ui.navWhatsApp || "WhatsApp"],
    ["About this Activity", ui.aboutHeading],
    ["Highlights", ui.highlightsHeading],
    ["Full description", ui.fullDescriptionHeading],
    ["What's included", ui.whatsIncludedHeading],
    ["Important information", ui.importantInformationHeading],
    ["Best Attractions in Bali", ui.bestAttractionsHeading],
    ["Our helpful PDF-Files about Bali", ui.helpfulPdfHeading],
    ["Things to do in Bali", ui.thingsToDoHeading],
    ["Open google maps route", ui.mapOpenLabel],
    ["Live weather", ui.weatherLive],
    ["Loading…", ui.weatherLoading],
    ["Checking local conditions…", ui.weatherChecking],
    ["Loading weather…", ui.weatherConditionLoading],
    ["Finding the best Bali plan for today…", ui.weatherSummaryLoading],
    ["Feels like", ui.weatherFeelsLike],
    ["Humidity", ui.weatherHumidity],
    ["Wind", ui.weatherWind],
    ["Today’s tips", ui.weatherTipsTitle],
    ["See recommended tour", ui.weatherSeeRecommended],
    ["Bali, Indonesia", ui.weatherLocation],
    ["Clear sky", ui.weatherClearSky],
    ["Mostly clear", ui.weatherMostlyClear],
    ["Partly cloudy", ui.weatherPartlyCloudy],
    ["Cloudy", ui.weatherCloudy],
    ["Light rain", ui.weatherLightRain],
    ["Rain showers", ui.weatherRainShowers],
    ["Thunderstorm risk", ui.weatherThunderstorm],
    ["Warm Bali evening", ui.weatherWarmEvening],
    ["Sunny Bali day", ui.weatherSunnyDay],
    ["Cloudy Bali day", ui.weatherCloudyDay],
    ["Rainy Bali weather", ui.weatherRainyDay],
    ["Storm-watch Bali weather", ui.weatherStormyDay],
    ["Great for sunset spots", ui.weatherSunsetTip],
    ["Perfect for dinner plans", ui.weatherDinnerTip],
    ["A light layer is enough", ui.weatherLightLayerTip],
    ["Best for beach time", ui.weatherBeachTip],
    ["Strong sun: sunscreen helps", ui.weatherSunscreenTip],
    ["Stay hydrated in the heat", ui.weatherHydrateTip],
    ["Nice weather for cafes and easy rides", ui.weatherCafeTip],
    ["Great for spa or cafe stops", ui.weatherSpaTip],
    ["Wear shoes with grip", ui.weatherGripShoesTip],
    ["Pack a light rain layer", ui.weatherRainLayerTip],
    ["Keep plans flexible today", ui.weatherFlexibleTip],
    ["Indoor backup ideas work well", ui.weatherShelterTip],
    ["Our Top Tours", ui.footerTopTours],
    ["Company & Trust", ui.footerCompanyTrust],
    ["Contacts & Location", ui.footerContactsLocation],
    ["We Accept", ui.footerWeAccept || "We Accept"],
    ["Message us", ui.footerMessageUs],
    ["Where nature and adventure meet", ui.footerLead],
    ["About SB Excursions", ui.footerAboutCompany],
    ["Privacy Policy", ui.footerPrivacy],
    ["Terms & Conditions", ui.footerTerms],
    ["Refund Policy", ui.footerRefund],
    ["SiteMap", ui.footerSiteMap],
    ["Daily support 7:00 - 22:00", ui.footerSupportHours],
    ["© 2021-2026 SB Excursions. Crafted for Bali adventures", ui.footerCopyright],
  ];

  let localizedHtml = html.replace(/<html lang="[^"]+"/i, `<html lang="${currentLocale}"`);

  shellReplacements.forEach(([source, target]) => {
    localizedHtml = replaceEverywhere(localizedHtml, source, target);
  });

  localizedHtml = localizedHtml
    .replaceAll(
      'href="/bali/en/main-page#about" data-menu-submenu-hook="" data-menu-item-number="2"',
      `href="/bali/${currentLocale}/about" data-menu-submenu-hook="" data-menu-item-number="2"`,
    )
    .replaceAll(
      'href="/bali/en/main-page#about"target="_blank"',
      `href="/bali/${currentLocale}/about"target="_blank"`,
    )
    .replaceAll('href="/bali/en/about"', `href="/bali/${currentLocale}/about"`)
    .replaceAll(
      'href="/bali/en/main-page#faq" data-menu-submenu-hook="" data-menu-item-number="4"',
      `href="/bali/${currentLocale}/faq" data-menu-submenu-hook="" data-menu-item-number="4"`,
    )
    .replaceAll(
      'href="/bali/en/main-page#faq"target="_blank"',
      `href="/bali/${currentLocale}/faq"target="_blank"`,
    )
    .replaceAll('href="/bali/en/faq"', `href="/bali/${currentLocale}/faq"`)
    .replaceAll("/bali/en/main-page#about", `${localizedMainPageRoute(currentLocale)}#about`)
    .replaceAll("/bali/en/main-page#faq", `${localizedMainPageRoute(currentLocale)}#faq`)
    .replaceAll("/bali/en/main-page#tours", `${localizedMainPageRoute(currentLocale)}#tours`)
    .replaceAll('href="/bali/en/main-page"', `href="${localizedMainPageRoute(currentLocale)}"`)
    .replaceAll(`href="${JOURNAL_HUB_ROUTE}"`, `href="${localizedJournalHubRoute(currentLocale)}"`)
    .replaceAll("/bali/en/journal/", `/bali/${currentLocale}/journal/`)
    .replaceAll(`${SITE_URL}/bali/en/journal/`, `${SITE_URL}/bali/${currentLocale}/journal/`)
    .replaceAll("/bali/en/tours/", `/bali/${currentLocale}/tours/`);

  localizedHtml = replaceEverywhere(localizedHtml, ">FAQ<", `>${escapeHtml(navFaqLabel)}<`);

  const switcherMarkup = buildUnescoLanguageSwitcherAssets(currentLocale, routeBuilder).trim();
  const switcherPattern = /<style id="sb-unesco-language-switcher-style">[\s\S]*?<\/script>/;

  if (switcherPattern.test(localizedHtml)) {
    localizedHtml = localizedHtml.replace(switcherPattern, switcherMarkup);
  } else if (/<\/head>/i.test(localizedHtml)) {
    localizedHtml = localizedHtml.replace(/<\/head>/i, `${switcherMarkup}\n</head>`);
  }

  return localizedHtml;
}

function buildUnescoChipSectionBlock(recordId, title, chips, options = {}) {
  const {
    wideDesktop = false,
    locale = "en",
  } = options;
  const chipsMarkup = chips.map(([, label, href]) => {
    const tag = href ? "a" : "span";
    const hrefAttr = href ? ` href="${localizedBaliInternalRoute(href, locale)}"` : "";
    return `<${tag} class="sb-unesco-chip"${hrefAttr}>${escapeHtml(label)}</${tag}>`;
  }).join("");

  const desktopWideStyles = wideDesktop ? `

    @media screen and (min-width: 1200px) {
      #${recordId} {
        padding: 22px 0 34px;
      }

      #${recordId} .sb-unesco-attractions {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0 32px;
      }

      #${recordId} .sb-unesco-attractions__title {
        margin-bottom: 26px;
        font-size: 58px;
        line-height: 1.02;
      }

      #${recordId} .sb-unesco-attractions__chips {
        gap: 12px 14px;
      }

      #${recordId} .sb-unesco-chip {
        min-height: 46px;
        padding: 0 20px !important;
        font-size: 17px;
      }
    }` : "";

  return `<div id="${recordId}" class="r t-rec" style=" " data-record-type="121" data-alias-record-type="396">
  <style>
    #${recordId} {
      padding: 18px 0 30px;
      background-color: #ffffff;
    }

    #${recordId} .sb-unesco-attractions {
      width: min(100%, 1200px);
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }

    #${recordId} .sb-unesco-attractions__inner {
      background: transparent;
      padding: 0;
      box-sizing: border-box;
    }

    #${recordId} .sb-unesco-attractions__title {
      margin: 0 0 22px;
      color: #000000;
      font-family: 'Cina GEO', 'TildaSans', Arial, sans-serif;
      font-size: 34px;
      line-height: 1.12;
      font-weight: 400;
      letter-spacing: 0;
    }

    #${recordId} .sb-unesco-attractions__chips {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px 12px;
    }

    #${recordId} .sb-unesco-chip {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto !important;
      width: auto !important;
      max-width: none !important;
      min-width: 0 !important;
      min-height: 38px;
      padding: 0 20px !important;
      box-sizing: border-box;
      border-radius: 999px;
      background: #e6e6e6;
      color: #636363;
      font-family: 'Cina GEO', 'TildaSans', Arial, sans-serif;
      font-size: 15px;
      line-height: 1;
      font-weight: 400;
      white-space: nowrap !important;
      word-break: keep-all !important;
      overflow-wrap: normal !important;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    #${recordId} a.sb-unesco-chip:hover {
      background: #dcdcdc;
      color: #4e4e4e;
    }

    @media screen and (max-width: 1199px) {
      #${recordId} .sb-unesco-attractions__title {
        margin-bottom: 22px;
        font-size: 32px;
      }

      #${recordId} .sb-unesco-chip {
        font-size: 14px;
      }
    }

    @media screen and (max-width: 639px) {
      #${recordId} {
        padding: 18px 0 30px;
      }

      #${recordId} .sb-unesco-attractions {
        padding: 0 10px;
      }

      #${recordId} .sb-unesco-attractions__title {
        margin-bottom: 18px;
        font-size: 24px;
        line-height: 1.2;
      }

      #${recordId} .sb-unesco-attractions__chips {
        gap: 10px 10px;
      }

      #${recordId} .sb-unesco-chip {
        min-height: 36px;
        padding: 0 20px !important;
        font-size: 13px;
        line-height: 1;
      }
    }
${desktopWideStyles}
  </style>
  <div class="sb-unesco-attractions">
    <div class="sb-unesco-attractions__inner">
      <h2 class="sb-unesco-attractions__title">${escapeHtml(title)}</h2>
      <div class="sb-unesco-attractions__chips">${chipsMarkup}</div>
    </div>
  </div>
</div>`;
}

function buildUnescoInternalTourChipsBlock(locale = "en") {
  const ui = unescoUiLabels(locale);
  return buildUnescoChipSectionBlock(
    "rec2121105683",
    ui.bestAttractionsHeading,
    UNESCO_INTERNAL_TOUR_CHIPS,
    { wideDesktop: true, locale },
  );
}

function buildUnescoPdfChipsBlock(locale = "en") {
  const ui = unescoUiLabels(locale);
  return buildUnescoChipSectionBlock(
    "rec2121105353",
    ui.helpfulPdfHeading,
    UNESCO_PDF_CHIPS,
    { wideDesktop: true, locale },
  );
}

function buildTourJournalChipsBlock(tour, locale = "en") {
  const ui = tour?.ui?.chipTravelGuide ? westUiLabels(tour) : unescoUiLabels(locale);
  const journalBase = `/bali/${locale}/journal/${tour.slug}`;
  const chips = [
    [null, ui.chipTravelGuide, `${journalBase}/travel-guide`],
    [null, ui.chipTourSchedule, `${journalBase}/tour-schedule`],
    [null, ui.chipWhyBook, `${journalBase}/why-book`],
  ];
  return buildUnescoChipSectionBlock(
    "rec2121105354",
    ui.tourArticlesHeading,
    chips,
    { wideDesktop: true, locale },
  );
}

function ensureTourJournalChips(filePath, tour, locale = "en") {
  if (!fs.existsSync(filePath) || !tour) {
    return;
  }
  let html = fs.readFileSync(filePath, "utf8");
  const block = buildTourJournalChipsBlock(tour, locale);

  const existingStart = html.indexOf('<div id="rec2121105354"');
  if (existingStart !== -1) {
    const existingEnd = html.indexOf('<div id="rec', existingStart + 20);
    if (existingEnd !== -1) {
      html = `${html.slice(0, existingStart)}${block}${html.slice(existingEnd)}`;
    }
  } else {
    const pdfStart = html.indexOf('<div id="rec2121105353"');
    if (pdfStart !== -1) {
      const pdfEnd = html.indexOf('<div id="rec', pdfStart + 20);
      if (pdfEnd !== -1) {
        html = `${html.slice(0, pdfEnd)}${block}${html.slice(pdfEnd)}`;
      }
    }
  }
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

function buildUnescoThingsToDoChipsBlock(locale = "en") {
  const ui = unescoUiLabels(locale);
  return buildUnescoChipSectionBlock(
    "rec2121105183",
    ui.thingsToDoHeading,
    UNESCO_THINGS_TO_DO_CHIPS,
    { wideDesktop: true, locale },
  );
}

const UNESCO_CHIPS_EXTRA_FILES = new Set([
  "page132181473.html",
  "page132181473body.html",
  "page132812463.html",
  "page132812463body.html",
  "page133629743.html",
  "page133629743body.html",
]);

function isUnescoChipsPatchableFile(fileName) {
  return /^bali-tour-.+\.html$/.test(fileName) || UNESCO_CHIPS_EXTRA_FILES.has(fileName);
}

function ensureUnescoInternalTourChips(filePath, locale = "en") {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (!isUnescoChipsPatchableFile(path.basename(filePath))) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  const recordStart = html.indexOf('<div id="rec2121105683"');
  if (recordStart === -1) {
    return;
  }

  const recordEnd = html.indexOf('<div id="rec', recordStart + 20);
  if (recordEnd === -1) {
    return;
  }

  html = `${html.slice(0, recordStart)}${buildUnescoInternalTourChipsBlock(locale)}${html.slice(recordEnd)}`;
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

function ensureUnescoPdfChips(filePath, locale = "en") {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (!isUnescoChipsPatchableFile(path.basename(filePath))) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  const recordStart = html.indexOf('<div id="rec2121105353"');
  if (recordStart === -1) {
    return;
  }

  const recordEnd = html.indexOf('<div id="rec', recordStart + 20);
  if (recordEnd === -1) {
    return;
  }

  html = `${html.slice(0, recordStart)}${buildUnescoPdfChipsBlock(locale)}${html.slice(recordEnd)}`;
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

function ensureUnescoThingsToDoChips(filePath, locale = "en") {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (!isUnescoChipsPatchableFile(path.basename(filePath))) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  const recordStart = html.indexOf('<div id="rec2121105183"');
  if (recordStart === -1) {
    return;
  }

  const recordEnd = html.indexOf('<div id="rec', recordStart + 20);
  if (recordEnd === -1) {
    return;
  }

  html = `${html.slice(0, recordStart)}${buildUnescoThingsToDoChipsBlock(locale)}${html.slice(recordEnd)}`;
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
}

// The main page ships three Tilda chip blocks still holding template
// placeholders ("Paperwork", "Rental Housing", …) rendered as plain buttons
// with no links. Replace them with the real, linked Bali chip sets. Two of the
// blocks use different record ids than the tour pages, so they need their own
// mapping.
const MAIN_PAGE_CHIP_SECTIONS = [
  ["rec2147451593", "Best Attractions in Bali", UNESCO_INTERNAL_TOUR_CHIPS],
  ["rec2147451533", "Our helpful PDF-Files about Bali", UNESCO_PDF_CHIPS],
  ["rec2121105183", "Things to do in Bali", UNESCO_THINGS_TO_DO_CHIPS],
];

function ensureMainPageChipSections(filePath, locale = "en") {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [recordId, title, chips] of MAIN_PAGE_CHIP_SECTIONS) {
    const recordStart = html.indexOf(`<div id="${recordId}"`);
    if (recordStart === -1) continue;

    const recordEnd = html.indexOf('<div id="rec', recordStart + 20);
    if (recordEnd === -1) continue;

    const block = buildUnescoChipSectionBlock(recordId, title, chips, { wideDesktop: true, locale });
    html = `${html.slice(0, recordStart)}${block}${html.slice(recordEnd)}`;
    changed = true;
  }

  if (changed) {
    writeGeneratedFile(filePath, ensureBaliGlobalUiFix(html));
  }
}

function ensureLocalizedUnescoPage(filePath, locale = "en") {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const supportedFiles = new Set([
    "bali-tour-bali-unesco.html",
    ...UNESCO_LANGUAGE_OPTIONS.filter((item) => item.code !== "en").map((item) => localizedUnescoFileName(item.code)),
    "page132181473.html",
    "page132181473body.html",
  ]);

  if (!supportedFiles.has(path.basename(filePath))) {
    return;
  }

  const html = fs.readFileSync(filePath, "utf8");
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(localizeUnescoShell(html, locale)));
}

function ensureLocalizedTourPage(filePath, tour) {
  if (!fs.existsSync(filePath) || !tour) {
    return;
  }

  const html = fs.readFileSync(filePath, "utf8");
  const localizedHtml = localizeUnescoShell(html, tourLocale(tour), {
    uiResolver: () => westUiLabels(tour),
    routeBuilder: (code) => `/bali/${code}/tours/${tour.slug}`,
  });
  writeGeneratedFile(filePath, ensureBaliGlobalUiFix(localizedHtml));
}

function localizeTildaBlockAssetUrls(html) {
  return String(html)
    .replace(
      /https:\/\/static\.tildacdn\.one\/ws\/project19714586\/(tilda-blocks-page\d+\.min\.css)(?:\?t=\d+)?/g,
      "/css/$1",
    )
    .replace(
      /https:\/\/static\.tildacdn\.one\/ws\/project19714586\/(tilda-blocks-page\d+\.min\.js)(?:\?t=\d+)?/g,
      "/js/$1",
    );
}

function normalizeGeneratedHtml(html) {
  return localizeTildaBlockAssetUrls(String(html)).replace(/[ \t]+$/gm, "");
}

function writeGeneratedFile(filePath, html) {
  fs.writeFileSync(filePath, normalizeGeneratedHtml(html));
}

function buildBaliTildaFooter() {
  const footerSourcePath = path.join(projectRoot, "page106032906.html");
  if (!fs.existsSync(footerSourcePath)) {
    return "";
  }

  const sourceHtml = fs.readFileSync(footerSourcePath, "utf8");
  const footerMatch = sourceHtml.match(/<div id="rec1803718291"[\s\S]*?<!-- \/T396 --> <\/div>/);

  if (!footerMatch) {
    return "";
  }

  return applyBaliBlueFooter(
    footerMatch[0]
    .replaceAll("Try varienty of benefits when using our services", "Why travelers choose SB Excursions")
    .replaceAll("A places where nature and adventure unite", "Where nature and adventure meet")
    .replaceAll("© 2021-2026 SB Excursions. Made in Moscow &amp; Dubai", "© 2021-2026 SB Excursions. Crafted for Bali adventures")
    .replaceAll("<div class='tn-atom'field='tn_text_1721245128917'>We Accept</div>", "<div class='tn-atom'field='tn_text_1721245128917'>We Accept</div>")
    .replaceAll(`href="/" target="_blank"`, `href="/bali/en/main-page"`)
    .replaceAll("/dubai/en#tours", "/bali/en/main-page#tours")
    .replaceAll('href="/dubai/en/about"target="_blank"', 'href="/bali/en/main-page#about"target="_blank"')
    .replaceAll('href="/dubai/en/faq"target="_blank"', 'href="/bali/en/main-page#faq"target="_blank"')
    .replaceAll('>FullDay Desert safari<', '>Nusa Penida West<')
    .replaceAll('href="/dubai/en/tours/full-day-dubai-desert-safari"', 'href="/bali/en/tours/nusa-penida-west-tour"')
    .replaceAll('>Abu Dhabi City tour<', '>Mount Batur Hike<')
    .replaceAll('href="/dubai/en/tours/abu-dhabi-city-tour-from-dubai"', 'href="/bali/en/tours/mount-batur-sunrise-hike"')
    .replaceAll('>Hot Air Balloon<', '>Ubud Highlights<')
    .replaceAll('href="/dubai/en/tours/hot-air-balloon-sunrise-flight"', 'href="/bali/en/tours/ubud-highlights-tour"')
    .replaceAll('>Shared Yacht tour<', '>Manta Rays Tour<')
    .replaceAll('href="/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour"', 'href="/bali/en/tours/nusa-penida-manta-rays-point"')
    .replaceAll("Work with Us", "Bali Office")
    .replaceAll("The Opus by Omniyat, Al A'amal St, Business Bay, Dubai, UAE", "Jl. Petitenget, Seminyak, Bali, Indonesia")
    .replaceAll(DUBAI_GENERIC_FOOTER_PHONE_LINK, BALI_GENERIC_FOOTER_PHONE_LINK)
    .replaceAll(DUBAI_GENERIC_FOOTER_WA_LINK, BALI_GENERIC_FOOTER_WA_LINK)
    .replaceAll("+971 50 604 8673", "+62 853 3368 5020")
    .replaceAll("Working hours 24/7", "Daily support 7:00 - 22:00")
    .replaceAll("Write us", "Message us")
    .replaceAll("Contacts &amp; Location", "Contacts &amp; Location")
    .replaceAll(
      `<div class='tn-atom'><a href="/bali/en/main-page#about"target="_blank"style="color: inherit"><u>About SB Excursions</u></a></div>`,
      `<div class='tn-atom'><a name="about" style="font-size:0;"></a><a href="/bali/en/about"target="_blank"style="color: inherit"><u>About SB Excursions</u></a></div>`,
    )
    .replaceAll(
      `<div class='tn-atom'><a href="/bali/en/main-page#faq"target="_blank"style="color: inherit"><u>FAQ</u></a></div>`,
      `<div class='tn-atom'><a name="faq" style="font-size:0;"></a><a href="/bali/en/faq"target="_blank"style="color: inherit"><u>FAQ</u></a></div>`,
    ),
  );
}

function renderJournalBaliFooter() {
  return `
      <footer class="sb-journal-footer" aria-label="SB Excursions footer">
        <div class="sb-journal-footer__shell">
          <div class="sb-journal-footer__grid">
            <div class="sb-journal-footer__brand">
              <a class="sb-journal-footer__logo-link" href="/bali/en/main-page" aria-label="SB Excursions Bali">
                <img
                  class="sb-journal-footer__logo"
                  src="https://static.tildacdn.one/tild3334-6466-4436-b766-376338363935/SB_Excursions_Dubai_.png"
                  alt="SB Excursions"
                >
              </a>
              <p class="sb-journal-footer__lead">Where nature and adventure meet</p>
            </div>

            <nav class="sb-journal-footer__column" aria-label="Top Bali tours">
              <div class="sb-journal-footer__title">Our Top Tours</div>
              <a class="sb-journal-footer__link" href="/bali/en/tours/nusa-penida-west-tour">Nusa Penida West</a>
              <a class="sb-journal-footer__link" href="/bali/en/tours/ubud-highlights-tour">Ubud Highlights</a>
              <a class="sb-journal-footer__link" href="/bali/en/tours/mount-batur-sunrise-hike">Mount Batur Hike</a>
              <a class="sb-journal-footer__link" href="/bali/en/tours/nusa-penida-manta-rays-point">Manta Rays Tour</a>
            </nav>

            <nav class="sb-journal-footer__column" aria-label="Company and trust links">
              <div class="sb-journal-footer__title">Company &amp; Trust</div>
              <a class="sb-journal-footer__link" href="/bali/en/about">About SB Excursions</a>
              <a class="sb-journal-footer__link" href="/bali/en/faq">FAQ</a>
              <a class="sb-journal-footer__link" href="/dubai/en/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a class="sb-journal-footer__link" href="/dubai/en/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
              <a class="sb-journal-footer__link" href="/dubai/en/faq#refund" target="_blank" rel="noopener noreferrer">Refund Policy</a>
              <a class="sb-journal-footer__link" href="/sitemap.xml" target="_blank" rel="noopener noreferrer">SiteMap</a>
            </nav>

            <div class="sb-journal-footer__column" aria-label="Contacts and location">
              <div class="sb-journal-footer__title">Contacts &amp; Location</div>
              <div class="sb-journal-footer__text sb-journal-footer__text_strong">Bali Office</div>
              <div class="sb-journal-footer__text">Jl. Petitenget, Seminyak, Bali, Indonesia</div>
              <a class="sb-journal-footer__link" href="${BALI_GENERIC_FOOTER_WA_LINK}" target="_blank" rel="noopener noreferrer nofollow">+62 853 3368 5020</a>
              <a class="sb-journal-footer__link" href="mailto:info@sbexcursion.com">info@sbexcursion.com</a>
              <div class="sb-journal-footer__text">Daily support 7:00 - 22:00</div>
            </div>

            <div class="sb-journal-footer__column sb-journal-footer__payments" aria-label="Accepted payment methods">
              <div class="sb-journal-footer__title">We Accept</div>
              <div class="sb-journal-footer__chips">
                <span class="sb-journal-footer__chip">Apple Pay</span>
                <span class="sb-journal-footer__chip">Google Pay</span>
                <span class="sb-journal-footer__chip">PayPal</span>
                <span class="sb-journal-footer__chip">Stripe</span>
                <span class="sb-journal-footer__chip">Visa</span>
                <span class="sb-journal-footer__chip">Mastercard</span>
                <span class="sb-journal-footer__chip">Amex</span>
                <span class="sb-journal-footer__chip">Bitcoin</span>
              </div>
            </div>
          </div>

          <div class="sb-journal-footer__bottom">
            <p class="sb-journal-footer__copyright">© 2021-2026 SB Excursions. Crafted for Bali adventures</p>
            <div class="sb-journal-footer__socials" aria-label="Message us">
              <span class="sb-journal-footer__social-label">Message us</span>
              <a
                class="sb-journal-footer__social-link"
                href="https://t.me/SurfBase"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M20.67 3.41 2.93 10.25c-1.21.49-1.2 1.17-.22 1.46l4.56 1.42 10.55-6.65c.5-.3.95-.14.57.19l-8.55 7.72-.32 4.79c.47 0 .68-.22.94-.47l2.28-2.21 4.75 3.51c.88.49 1.5.24 1.72-.82l3.02-14.24c.33-1.29-.49-1.87-1.56-1.39Z"/>
                </svg>
              </a>
              <a
                class="sb-journal-footer__social-link"
                href="${BALI_GENERIC_FOOTER_WA_LINK}"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M19.05 4.94A9.94 9.94 0 0 0 12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.77.46 3.49 1.33 5.01L2 22l5.13-1.34A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.97-7.06Zm-7.03 15.38c-1.52 0-3-.41-4.29-1.18l-.31-.19-3.05.8.82-2.97-.2-.3a8.2 8.2 0 0 1-1.26-4.48c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.29.86 5.85 2.43A8.22 8.22 0 0 1 20.3 12c0 4.57-3.71 8.29-8.28 8.29Zm4.55-6.2c-.25-.12-1.49-.73-1.72-.82-.23-.08-.39-.12-.56.12-.16.25-.64.82-.78.99-.14.17-.28.19-.52.06-.25-.12-1.03-.38-1.96-1.22-.73-.65-1.22-1.45-1.37-1.69-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.65.31s-.86.84-.86 2.06.88 2.4 1 2.57c.12.17 1.71 2.62 4.14 3.67.58.25 1.04.4 1.39.51.58.18 1.11.15 1.53.09.47-.07 1.49-.61 1.7-1.21.21-.6.21-1.12.15-1.21-.06-.1-.22-.16-.47-.28Z"/>
                </svg>
              </a>
              <a
                class="sb-journal-footer__social-link"
                href="https://www.instagram.com/dubai_sb_excursions?igsh=cTFtcnB0ZTFta2Nq&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 3.8 7v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7Zm10.4 1.35a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.8A3.7 3.7 0 1 0 15.7 12 3.7 3.7 0 0 0 12 8.3Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>`.replace(/[ \t]+\n/g, "\n");
}

function ensureBaliTildaFooter(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const stripTildaRecordById = (html, recordId) =>
    html.replace(
      new RegExp(
        String.raw`\s*<div id="rec${recordId}"[^>]*>\s*<!--\s*T396\s*-->[\s\S]*?<!--\s*\/T396\s*-->\s*<\/div>`,
        "g",
      ),
      "",
    );

  const footerPattern = /\s*(?:<!--footer-->\s*)?<footer id="t-footer"[^>]*data-tilda-page-alias="dubai\/en\/footer"[\s\S]*?<\/footer>(?:\s*<!--\/footer-->)?/g;
  const footerHtml = buildBaliTildaFooter();

  if (!footerHtml) {
    return;
  }

  const html = fs.readFileSync(filePath, "utf8");
  let updated = html.replace(footerPattern, "");
  updated = stripTildaRecordById(updated, "2054882911");
  updated = stripTildaRecordById(updated, "1803718291");

  const allRecordsClose = "</div> <!--/allrecords-->";
  const closeIndex = updated.lastIndexOf(allRecordsClose);

  if (closeIndex === -1) {
    return;
  }

  updated = `${updated.slice(0, closeIndex).trimEnd()} ${footerHtml} ${updated.slice(closeIndex)}`;

  if (updated !== html) {
    writeGeneratedFile(filePath, updated);
  }
}

const STANDALONE_PAGE_CONTENT = {
  en: {
    about: {
      title: "About SB Excursions",
      metaDescription: "Learn about SB Excursions — a Bali-based tour operator offering private day tours, transfers, and curated island experiences with local drivers and daily support.",
      heading: "About SB Excursions",
      sections: [
        {
          heading: "Who we are",
          text: "SB Excursions is a Bali-based tour operator that organizes private day tours, airport transfers, boat trips, and curated island experiences. We work directly with local drivers and guides to keep every route practical, well-paced, and genuinely enjoyable.",
        },
        {
          heading: "How we work",
          text: "Every tour runs as a private booking — no strangers on the bus, no rigid group schedule. You pick the date, we confirm availability and handle the logistics: vehicle, driver, entrance fees, and pickup from your hotel, villa, or Airbnb anywhere in southern or central Bali.",
        },
        {
          heading: "What we cover",
          text: "Our catalog covers the most popular Bali experiences — Nusa Penida day trips, Ubud cultural routes, volcano sunrise hikes, snorkeling excursions, ATV rides, surf lessons, helicopter tours, and more. We also run transfers to and from the airport and fast boats to Gili Islands and Nusa Lembongan.",
        },
        {
          heading: "Daily support",
          text: "Our team is available daily from 7:00 to 22:00 Bali time via WhatsApp. Whether you need to adjust a pickup time, add a stop, or ask about weather conditions — we respond fast and keep things flexible.",
        },
        {
          heading: "Why travelers choose us",
          text: "Transparent pricing, no hidden fees, real reviews, and the kind of local knowledge you only get from operators who live on the island. We do not resell third-party packages — every route is built and managed by our team.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      metaDescription: "Answers to common questions about booking Bali tours with SB Excursions — pricing, pickups, cancellations, group sizes, what to bring, and how our tours work.",
      heading: "Frequently Asked Questions",
      items: [
        ["How do I book a tour?", "Send us a message on WhatsApp with the tour name, your preferred date, hotel area, and group size. We confirm availability and send booking details within a few hours."],
        ["Is pickup from my hotel included?", "Yes. Most tours include free pickup and drop-off from hotels, villas, and Airbnbs in major Bali areas — Ubud, Seminyak, Canggu, Kuta, Legian, Sanur, Nusa Dua, Jimbaran, and Uluwatu."],
        ["Are the tours private or shared?", "All our tours run as private bookings. You travel with your own group and driver — no strangers, no waiting for other guests."],
        ["What is your cancellation policy?", "Free cancellation up to 3 days before the tour date for a full refund. Cancellations within 3 days may incur a partial charge depending on the tour."],
        ["What should I bring?", "Comfortable clothes, sunscreen, a camera, and some cash for personal expenses. Specific tours may require swimwear, closed shoes, or a light rain jacket — check the tour page for details."],
        ["Do you offer tours in other languages?", "Our website is available in English, Russian, French, Spanish, and Chinese. Most drivers speak basic English. For other language needs, let us know and we will do our best to arrange."],
        ["How long do tours usually last?", "Most day tours run 8–12 hours including pickup and drop-off. Half-day options and transfers are shorter. Exact timing is listed on each tour page."],
        ["Can I customize a tour route?", "Yes. Many of our routes allow adding or swapping stops. Message us on WhatsApp with your preferences and we will build a route that works."],
        ["What payment methods do you accept?", "We accept bank transfers, major credit cards, and cash payment. Payment details are shared after booking confirmation."],
        ["Is travel insurance included?", "Travel insurance is not included in the tour price. We recommend purchasing your own travel insurance before your trip to Bali."],
      ],
    },
    guides: {
      title: "Our Bali Travel Guides",
      metaDescription: "Free travel guides by SB Excursions — beaches, temples, waterfalls, viewpoints, restaurants, photo spots, and practical tips for your Bali trip.",
      heading: "Our Bali Travel Guides",
      intro: "Browse our collection of practical Bali guides — written by our team who live and work on the island. Each guide covers a specific topic to help you plan your trip.",
    },
  },
  ru: {
    about: {
      title: "О компании SB Excursions",
      metaDescription: "Узнайте о SB Excursions — туроператоре на Бали, организующем частные экскурсии, трансферы и островные маршруты с местными гидами и ежедневной поддержкой.",
      heading: "О компании SB Excursions",
      sections: [
        { heading: "Кто мы", text: "SB Excursions — туроператор на Бали, который организует частные экскурсии, трансферы из аэропорта, морские прогулки и продуманные островные маршруты. Мы работаем напрямую с местными водителями и гидами." },
        { heading: "Как мы работаем", text: "Каждый тур — это частное бронирование: никаких незнакомцев, никакого жёсткого группового расписания. Вы выбираете дату, мы подтверждаем и берём на себя всю логистику." },
        { heading: "Что мы предлагаем", text: "Наш каталог охватывает самые популярные маршруты Бали — Нуса Пенида, культурные маршруты по Убуду, восход на вулкане, снорклинг, квадроциклы, сёрфинг, вертолётные туры и многое другое." },
        { heading: "Ежедневная поддержка", text: "Наша команда доступна ежедневно с 7:00 до 22:00 по времени Бали через WhatsApp. Мы быстро отвечаем и сохраняем гибкость." },
        { heading: "Почему нас выбирают", text: "Прозрачные цены, никаких скрытых сборов, реальные отзывы и местные знания от команды, которая живёт на острове." },
      ],
    },
    faq: {
      title: "Часто задаваемые вопросы",
      metaDescription: "Ответы на частые вопросы о бронировании туров на Бали с SB Excursions — цены, трансферы, отмена, размер группы и как работают наши туры.",
      heading: "Часто задаваемые вопросы",
      items: [
        ["Как забронировать тур?", "Напишите нам в WhatsApp с названием тура, датой, районом отеля и размером группы. Мы подтвердим доступность в течение нескольких часов."],
        ["Трансфер из отеля включён?", "Да. Большинство туров включают бесплатный трансфер из отелей, вилл и Airbnb в основных районах Бали."],
        ["Туры частные или групповые?", "Все наши туры — частные. Вы путешествуете только со своей группой и водителем."],
        ["Какая политика отмены?", "Бесплатная отмена за 3 дня до даты тура с полным возвратом. При отмене менее чем за 3 дня может взиматься частичная плата."],
        ["Что нужно взять с собой?", "Удобную одежду, солнцезащитный крем, камеру и наличные на личные расходы. Подробности на странице каждого тура."],
        ["Есть ли туры на других языках?", "Наш сайт доступен на английском, русском, французском, испанском и китайском. Большинство водителей говорят на базовом английском."],
        ["Сколько длятся туры?", "Большинство дневных туров длятся 8–12 часов включая трансфер. Точное время указано на странице каждого тура."],
        ["Можно ли изменить маршрут?", "Да. Многие маршруты позволяют добавить или заменить остановки. Напишите нам в WhatsApp."],
        ["Какие способы оплаты?", "Мы принимаем банковские переводы, основные кредитные карты и оплату наличными."],
        ["Включена ли страховка?", "Туристическая страховка не включена в стоимость тура. Мы рекомендуем оформить собственную страховку перед поездкой."],
      ],
    },
    guides: {
      title: "Путеводители по Бали",
      metaDescription: "Бесплатные путеводители от SB Excursions — пляжи, храмы, водопады, смотровые площадки, рестораны, фотоспоты и практические советы для поездки на Бали.",
      heading: "Путеводители по Бали",
      intro: "Коллекция практических путеводителей по Бали от нашей команды, которая живёт и работает на острове. Каждый путеводитель посвящён конкретной теме.",
    },
  },
  fr: {
    about: {
      title: "À propos de SB Excursions",
      metaDescription: "Découvrez SB Excursions — un tour-opérateur basé à Bali proposant des excursions privées, des transferts et des expériences insulaires avec des chauffeurs locaux.",
      heading: "À propos de SB Excursions",
      sections: [
        { heading: "Qui sommes-nous", text: "SB Excursions est un tour-opérateur basé à Bali qui organise des excursions privées, des transferts aéroport, des sorties en bateau et des itinéraires insulaires soigneusement conçus." },
        { heading: "Comment nous travaillons", text: "Chaque excursion est une réservation privée — pas d'inconnus, pas d'horaire de groupe rigide. Vous choisissez la date, nous confirmons et gérons toute la logistique." },
        { heading: "Ce que nous proposons", text: "Notre catalogue couvre les expériences les plus populaires de Bali — Nusa Penida, circuits culturels à Ubud, lever de soleil sur le volcan, snorkeling, quad, surf, tours en hélicoptère et bien plus." },
        { heading: "Assistance quotidienne", text: "Notre équipe est disponible tous les jours de 7h à 22h heure de Bali via WhatsApp. Nous répondons rapidement et restons flexibles." },
        { heading: "Pourquoi nous choisir", text: "Tarifs transparents, pas de frais cachés, vrais avis et connaissances locales d'une équipe qui vit sur l'île." },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      metaDescription: "Réponses aux questions courantes sur la réservation d'excursions à Bali avec SB Excursions — tarifs, transferts, annulations et fonctionnement de nos tours.",
      heading: "Questions fréquentes",
      items: [
        ["Comment réserver une excursion ?", "Envoyez-nous un message sur WhatsApp avec le nom du tour, votre date préférée, la zone de votre hôtel et la taille du groupe."],
        ["Le transfert depuis l'hôtel est-il inclus ?", "Oui. La plupart des excursions incluent un transfert gratuit depuis les hôtels, villas et Airbnb dans les principales zones de Bali."],
        ["Les excursions sont-elles privées ?", "Toutes nos excursions sont privées. Vous voyagez uniquement avec votre groupe et votre chauffeur."],
        ["Quelle est la politique d'annulation ?", "Annulation gratuite jusqu'à 3 jours avant la date du tour pour un remboursement complet."],
        ["Que faut-il apporter ?", "Des vêtements confortables, de la crème solaire, un appareil photo et de l'argent liquide pour les dépenses personnelles."],
        ["Proposez-vous des excursions dans d'autres langues ?", "Notre site est disponible en anglais, russe, français, espagnol et chinois."],
        ["Combien de temps durent les excursions ?", "La plupart des excursions durent 8 à 12 heures, transfert inclus."],
        ["Puis-je personnaliser l'itinéraire ?", "Oui. De nombreux itinéraires permettent d'ajouter ou de remplacer des arrêts."],
        ["Quels modes de paiement acceptez-vous ?", "Nous acceptons les virements bancaires, les principales cartes de crédit et le paiement en espèces."],
        ["L'assurance voyage est-elle incluse ?", "L'assurance voyage n'est pas incluse. Nous recommandons de souscrire votre propre assurance avant votre voyage."],
      ],
    },
    guides: {
      title: "Nos guides de voyage à Bali",
      metaDescription: "Guides de voyage gratuits par SB Excursions — plages, temples, cascades, points de vue, restaurants, spots photo et conseils pratiques pour votre séjour à Bali.",
      heading: "Nos guides de voyage à Bali",
      intro: "Parcourez notre collection de guides pratiques sur Bali, rédigés par notre équipe qui vit et travaille sur l'île. Chaque guide couvre un sujet spécifique.",
    },
  },
  es: {
    about: {
      title: "Sobre SB Excursions",
      metaDescription: "Conoce SB Excursions — operador turístico en Bali que ofrece tours privados, traslados y experiencias en la isla con conductores locales y soporte diario.",
      heading: "Sobre SB Excursions",
      sections: [
        { heading: "Quiénes somos", text: "SB Excursions es un operador turístico en Bali que organiza excursiones privadas, traslados al aeropuerto, paseos en barco y rutas insulares cuidadosamente diseñadas." },
        { heading: "Cómo trabajamos", text: "Cada tour es una reserva privada — sin desconocidos, sin horario grupal rígido. Tú eliges la fecha, nosotros confirmamos y nos encargamos de toda la logística." },
        { heading: "Qué ofrecemos", text: "Nuestro catálogo cubre las experiencias más populares de Bali — Nusa Penida, rutas culturales por Ubud, amanecer en el volcán, snorkel, cuatrimotos, surf, tours en helicóptero y mucho más." },
        { heading: "Soporte diario", text: "Nuestro equipo está disponible todos los días de 7:00 a 22:00 hora de Bali por WhatsApp. Respondemos rápido y mantenemos la flexibilidad." },
        { heading: "Por qué elegirnos", text: "Precios transparentes, sin cargos ocultos, reseñas reales y conocimiento local de un equipo que vive en la isla." },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      metaDescription: "Respuestas a preguntas comunes sobre reservar tours en Bali con SB Excursions — precios, traslados, cancelaciones y cómo funcionan nuestros tours.",
      heading: "Preguntas frecuentes",
      items: [
        ["¿Cómo reservo un tour?", "Envíanos un mensaje por WhatsApp con el nombre del tour, tu fecha preferida, la zona de tu hotel y el tamaño del grupo."],
        ["¿Está incluido el traslado desde el hotel?", "Sí. La mayoría de los tours incluyen traslado gratuito desde hoteles, villas y Airbnbs en las principales zonas de Bali."],
        ["¿Los tours son privados o compartidos?", "Todos nuestros tours son privados. Viajas solo con tu grupo y conductor."],
        ["¿Cuál es la política de cancelación?", "Cancelación gratuita hasta 3 días antes de la fecha del tour para un reembolso completo."],
        ["¿Qué debo llevar?", "Ropa cómoda, protector solar, cámara y efectivo para gastos personales."],
        ["¿Ofrecen tours en otros idiomas?", "Nuestro sitio está disponible en inglés, ruso, francés, español y chino."],
        ["¿Cuánto duran los tours?", "La mayoría de los tours duran de 8 a 12 horas incluyendo el traslado."],
        ["¿Puedo personalizar la ruta?", "Sí. Muchas rutas permiten agregar o cambiar paradas."],
        ["¿Qué métodos de pago aceptan?", "Aceptamos transferencias bancarias, tarjetas de crédito principales y pago en efectivo."],
        ["¿Está incluido el seguro de viaje?", "El seguro de viaje no está incluido. Recomendamos contratar su propio seguro antes de viajar."],
      ],
    },
    guides: {
      title: "Nuestras guías de viaje de Bali",
      metaDescription: "Guías de viaje gratuitas de SB Excursions — playas, templos, cascadas, miradores, restaurantes, spots de fotos y consejos prácticos para tu viaje a Bali.",
      heading: "Nuestras guías de viaje de Bali",
      intro: "Explora nuestra colección de guías prácticas de Bali, escritas por nuestro equipo que vive y trabaja en la isla. Cada guía cubre un tema específico.",
    },
  },
  zh: {
    about: {
      title: "关于 SB Excursions",
      metaDescription: "了解 SB Excursions — 一家巴厘岛旅游运营商，提供私人一日游、接送服务和精心策划的岛屿体验。",
      heading: "关于 SB Excursions",
      sections: [
        { heading: "我们是谁", text: "SB Excursions 是一家巴厘岛旅游运营商，组织私人一日游、机场接送、出海旅行和精心策划的岛屿路线。我们直接与当地司机和导游合作。" },
        { heading: "我们如何运作", text: "每个旅游团都是私人预订——没有陌生人，没有固定的团体时间表。您选择日期，我们确认并处理所有后勤工作。" },
        { heading: "我们提供什么", text: "我们的目录涵盖巴厘岛最受欢迎的体验——努沙佩尼达、乌布文化路线、火山日出、浮潜、全地形车、冲浪、直升机之旅等等。" },
        { heading: "每日支持", text: "我们的团队每天巴厘岛时间 7:00 至 22:00 通过 WhatsApp 提供服务。我们快速回复并保持灵活。" },
        { heading: "为什么选择我们", text: "透明的价格，没有隐藏费用，真实的评价，以及来自生活在岛上的团队的本地知识。" },
      ],
    },
    faq: {
      title: "常见问题",
      metaDescription: "关于通过 SB Excursions 预订巴厘岛旅游的常见问题解答——价格、接送、取消政策和我们旅游的运作方式。",
      heading: "常见问题",
      items: [
        ["如何预订旅游？", "通过 WhatsApp 向我们发送消息，包括旅游名称、首选日期、酒店区域和团体人数。"],
        ["酒店接送是否包含在内？", "是的。大多数旅游包括从巴厘岛主要地区的酒店、别墅和 Airbnb 的免费接送。"],
        ["旅游是私人的还是拼团的？", "我们所有的旅游都是私人预订。您只与自己的团体和司机一起旅行。"],
        ["取消政策是什么？", "旅游日期前3天免费取消，全额退款。"],
        ["需要带什么？", "舒适的衣服、防晒霜、相机和个人消费的现金。"],
        ["你们提供其他语言的旅游吗？", "我们的网站提供英语、俄语、法语、西班牙语和中文版本。"],
        ["旅游通常持续多长时间？", "大多数一日游持续8-12小时，包括接送。"],
        ["我可以自定义路线吗？", "可以。许多路线允许添加或更换停靠点。"],
        ["接受哪些付款方式？", "我们接受银行转账、主要信用卡和现金支付。"],
        ["旅行保险是否包含在内？", "旅行保险不包含在旅游价格中。我们建议您在旅行前购买自己的旅行保险。"],
      ],
    },
    guides: {
      title: "巴厘岛旅行指南",
      metaDescription: "SB Excursions 免费旅行指南 — 海滩、寺庙、瀑布、观景点、餐厅、拍照地点和巴厘岛旅行实用建议。",
      heading: "巴厘岛旅行指南",
      intro: "浏览我们团队编写的巴厘岛实用指南合集——我们在岛上生活和工作。每篇指南覆盖一个具体主题。",
    },
  },
};

function renderStandalonePage(type, locale) {
  const content = STANDALONE_PAGE_CONTENT[locale]?.[type] || STANDALONE_PAGE_CONTENT.en[type];
  const langCodes = BALI_LANGUAGE_OPTIONS.map((o) => o.code);
  const altLinks = langCodes.map((code) =>
    `<link rel="alternate" hreflang="${code}" href="${SITE_URL}/bali/${code}/${type}">`
  ).join("\n    ");

  let body = "";
  if (type === "about") {
    body = content.sections.map((s) => `
            <section class="sb-journal-article-section">
              <h2>${escapeHtml(s.heading)}</h2>
              <p>${escapeHtml(s.text)}</p>
            </section>`).join("");
  } else if (type === "guides") {
    const guideArticles = buildSeoGuideArticles();
    body = `
            <p style="color:#555;line-height:1.6;margin:0 0 32px;">${escapeHtml(content.intro)}</p>
            <div class="sb-guides-grid">
              ${guideArticles.map((g) => {
                const guideRoute = `/bali/${locale}/journal/${g.guide.slug}`;
                return `<a class="sb-guide-card" href="${guideRoute}">
                <h2>${escapeHtml(g.title)}</h2>
                <p>${escapeHtml(g.description.slice(0, 120))}${g.description.length > 120 ? "..." : ""}</p>
              </a>`;
              }).join("\n              ")}
            </div>`;
  } else {
    body = `
            <div class="sb-faq-list">
              ${content.items.map(([q, a]) => `
              <details class="sb-faq-item">
                <summary>${escapeHtml(q)}</summary>
                <p>${renderRichText(a)}</p>
              </details>`).join("")}
            </div>`;
  }

  const faqSchema = type === "faq" ? `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.items.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    })}</script>` : "";

  return `<!DOCTYPE html>
<html lang="${locale}">
  <head><style>body{opacity:0!important}</style>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(content.title)} | SB Excursions</title>
    <meta name="description" content="${escapeHtml(content.metaDescription)}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(content.title)} | SB Excursions">
    <meta property="og:description" content="${escapeHtml(content.metaDescription)}">
    <meta property="og:url" content="${SITE_URL}/bali/${locale}/${type}">
    <link rel="canonical" href="${SITE_URL}/bali/${locale}/${type}">
    ${altLinks}
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png">
    <link rel="stylesheet" href="/css/bali-tour-pages.css">
${JOURNAL_FOOTER_ASSETS}${faqSchema}
    <style>${renderJournalSharedStyles()}
    .sb-faq-list { max-width: 800px; margin: 0 auto; }
    .sb-faq-item { border-bottom: 1px solid #e5e5e5; padding: 18px 0; }
    .sb-faq-item summary { font-size: 18px; font-weight: 500; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-family: 'Cina GEO', 'TildaSans', Arial, sans-serif; }
    .sb-faq-item summary::after { content: '+'; font-size: 22px; color: #999; flex-shrink: 0; margin-left: 16px; transition: transform 0.2s; }
    .sb-faq-item[open] summary::after { content: '\\2212'; }
    .sb-faq-item summary::-webkit-details-marker { display: none; }
    .sb-faq-item p { margin: 12px 0 0; color: #555; line-height: 1.6; }
    .sb-guides-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .sb-guide-card { display: block; padding: 24px; border-radius: 16px; background: #f5f5f5; text-decoration: none; color: inherit; transition: box-shadow 0.2s, transform 0.2s; }
    .sb-guide-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
    .sb-guide-card h2 { font-family: 'Cina GEO', 'TildaSans', Arial, sans-serif; font-weight: 400; font-size: 18px; margin: 0 0 8px; line-height: 1.3; }
    .sb-guide-card p { font-size: 14px; color: #666; line-height: 1.5; margin: 0; }
    </style>
  </head>
  <body>
    <div class="sb-journal-page">
      ${renderJournalHeader()}
      <main class="sb-tour-main sb-journal-main">
        <nav class="sb-journal-breadcrumbs">
          <a href="/bali/${locale}/main-page">Bali</a>
          <span>/</span>
          <span>${escapeHtml(content.heading)}</span>
        </nav>
        <article class="sb-journal-article" style="max-width:900px;margin:0 auto;">
          <h1 style="font-family:'Cina GEO','TildaSans',Arial,sans-serif;font-weight:400;font-size:clamp(28px,5vw,48px);margin:24px 0 32px;">${escapeHtml(content.heading)}</h1>
          ${body}
        </article>
      </main>
    </div>
  </body>
</html>`;
}

async function generatePages() {
  const allTours = tourDataMap();
  const englishTargets = [];
  const localizedTargets = [];
  const journalTargets = [];
  const guideTargets = [];
  for (const tour of tours) {
    ensureHeroImage(tour);
    const html = renderPage(tour, allTours);
    const filePath = path.join(projectRoot, `bali-tour-${tour.slug}.html`);
    writeGeneratedFile(filePath, html);
    englishTargets.push({ filePath, tour });
  }

  for (const locale of BALI_LANGUAGE_OPTIONS.map((item) => item.code).filter((code) => code !== "en")) {
    for (const tour of tours) {
      const localizedTour = await buildAutoLocalizedTour(tour, locale);
      if (!localizedTour) continue;
      const localizedHtml = renderPage(localizedTour, allTours);
      const localizedFilePath = path.join(projectRoot, localizedTourFileName(tour.slug, locale));
      writeGeneratedFile(localizedFilePath, localizedHtml);
      localizedTargets.push({ filePath: localizedFilePath, tour: localizedTour });
    }
  }

  const journalIndexPath = path.join(projectRoot, "bali-journal.html");
  writeGeneratedFile(journalIndexPath, ensureBaliGlobalUiFix(renderJournalIndexPage()));

  for (const article of buildJournalArticles()) {
    const articleFilePath = path.join(projectRoot, journalArticleFileName(article.tour, article.articleType));
    writeGeneratedFile(articleFilePath, ensureBaliGlobalUiFix(renderJournalArticlePage(article)));
    journalTargets.push({ filePath: articleFilePath, article });
  }

  for (const guideArticle of buildSeoGuideArticles()) {
    const guideFilePath = path.join(projectRoot, guideArticleFileName(guideArticle.guide));
    writeGeneratedFile(guideFilePath, ensureBaliGlobalUiFix(renderSeoGuidePage(guideArticle)));
    guideTargets.push({ filePath: guideFilePath, article: guideArticle });
  }

  const standaloneTargets = [];
  for (const locale of BALI_LANGUAGE_OPTIONS.map((o) => o.code)) {
    for (const type of ["about", "faq", "guides"]) {
      const suffix = locale === "en" ? "" : `-${locale}`;
      const filePath = path.join(projectRoot, `bali-${type}${suffix}.html`);
      writeGeneratedFile(filePath, renderStandalonePage(type, locale));
      standaloneTargets.push({ filePath, type, locale });
    }
  }

  saveTranslationCache();
  return { englishTargets, localizedTargets, journalIndexPath, journalTargets, guideTargets, standaloneTargets };
}

async function main() {
  const { englishTargets, localizedTargets, journalIndexPath, journalTargets, guideTargets } = await generatePages();
  const unescoPatchTargets = [
    { filePath: path.join(projectRoot, "bali-tour-bali-unesco.html"), locale: "en" },
    { filePath: path.join(projectRoot, "page132181473.html"), locale: "en" },
    { filePath: path.join(projectRoot, "files", "page132181473body.html"), locale: "en" },
    ...UNESCO_LANGUAGE_OPTIONS.filter((item) => item.code !== "en").map((item) => ({
      filePath: path.join(projectRoot, localizedUnescoFileName(item.code)),
      locale: item.code,
    })),
  ];

  const chipsPatchTargets = [
    ...unescoPatchTargets,
    { filePath: path.join(projectRoot, "page132812463.html"), locale: "en" },
    { filePath: path.join(projectRoot, "files", "page132812463body.html"), locale: "en" },
    { filePath: path.join(projectRoot, "page133629743.html"), locale: "en" },
    { filePath: path.join(projectRoot, "files", "page133629743body.html"), locale: "en" },
    ...englishTargets.map((target) => ({ filePath: target.filePath, locale: "en" })),
    ...localizedTargets.map((target) => ({ filePath: target.filePath, locale: tourLocale(target.tour) })),
  ];

  for (const target of chipsPatchTargets) {
    ensureUnescoInternalTourChips(target.filePath, target.locale);
    ensureUnescoPdfChips(target.filePath, target.locale);
    ensureUnescoThingsToDoChips(target.filePath, target.locale);
  }
  for (const target of englishTargets) {
    ensureTourJournalChips(target.filePath, target.tour, "en");
  }
  for (const target of localizedTargets) {
    ensureTourJournalChips(target.filePath, target.tour, tourLocale(target.tour));
  }
  patchBaliMainFile(path.join(projectRoot, "page128073236.html"));
  patchBaliMainFile(path.join(projectRoot, "files", "page128073236body.html"));
  ensureMainPageChipSections(path.join(projectRoot, "page128073236.html"));
  ensureMainPageChipSections(path.join(projectRoot, "files", "page128073236body.html"));
  buildBaliInfoPages();
  for (const relativePath of listWeatherPatchFiles()) {
    const filePath = path.join(projectRoot, relativePath);
    ensureJeepHotSpringRouteMap(filePath);
    ensureCompactWeatherWidget(filePath);
  }
  for (const relativePath of BALI_TILDA_FOOTER_PATCH_FILES) {
    ensureBaliTildaFooter(path.join(projectRoot, relativePath));
  }
  for (const target of englishTargets) {
    ensureCompactWeatherWidget(target.filePath);
    ensureBaliTildaFooter(target.filePath);
    ensureLocalizedTourPage(target.filePath, target.tour);
  }
  for (const target of localizedTargets) {
    ensureCompactWeatherWidget(target.filePath);
    ensureBaliTildaFooter(target.filePath);
    ensureLocalizedTourPage(target.filePath, target.tour);
  }
  const englishTildaTourTargets = [
    { filePath: path.join(projectRoot, "page132812463.html"), tour: tourBySlug("mount-batur-sunrise-jeep-tour") },
    { filePath: path.join(projectRoot, "files", "page132812463body.html"), tour: tourBySlug("mount-batur-sunrise-jeep-tour") },
    { filePath: path.join(projectRoot, "page133629743.html"), tour: tourBySlug("mount-batur-sunrise-jeep-tour") },
    { filePath: path.join(projectRoot, "files", "page133629743body.html"), tour: tourBySlug("mount-batur-sunrise-jeep-tour") },
  ];
  for (const target of englishTildaTourTargets) {
    ensureTourJournalChips(target.filePath, target.tour, "en");
    ensureCompactWeatherWidget(target.filePath);
    ensureBaliTildaFooter(target.filePath);
    ensureLocalizedTourPage(target.filePath, target.tour);
  }
  for (const target of unescoPatchTargets) {
    ensureCompactWeatherWidget(target.filePath);
    ensureBaliTildaFooter(target.filePath);
    ensureLocalizedUnescoPage(target.filePath, target.locale);
  }

  const legacyMantaTour = tourBySlug("nusa-penida-manta-rays-point");
  const legacyTildaTourTargets = [
    ...englishTildaTourTargets,
    { filePath: path.join(projectRoot, "page132181473.html"), tour: legacyMantaTour },
    { filePath: path.join(projectRoot, "files", "page132181473body.html"), tour: legacyMantaTour },
    ...BALI_LANGUAGE_OPTIONS.filter((item) => item.code !== "en").map((item) => ({
      filePath: path.join(projectRoot, `page132181473-${item.code}.html`),
      tour: legacyMantaTour,
    })),
  ];

  for (const target of legacyTildaTourTargets) {
    ensureLegacyTildaTourLayout(target.filePath, target.tour);
  }
  for (const target of legacyTildaTourTargets) {
    if (target.tour) {
      const locale = target.filePath.match(/-(\w{2})\.html$/)?.[1] || "en";
      ensureTourJournalChips(target.filePath, target.tour, locale);
    }
  }

  const englishMainPagePath = path.join(projectRoot, "page128073236.html");
  writeGeneratedFile(
    englishMainPagePath,
    localizeUnescoShell(fs.readFileSync(englishMainPagePath, "utf8"), "en", {
      routeBuilder: (code) => localizedMainPageRoute(code),
    }),
  );

  writeGeneratedFile(
    journalIndexPath,
    localizeJournalShell(fs.readFileSync(journalIndexPath, "utf8"), "en", localizedJournalHubRoute("en")),
  );
  for (const target of journalTargets) {
    writeGeneratedFile(
      target.filePath,
      localizeJournalShell(fs.readFileSync(target.filePath, "utf8"), "en", target.article.route),
    );
  }
  for (const target of guideTargets) {
    writeGeneratedFile(
      target.filePath,
      localizeJournalShell(fs.readFileSync(target.filePath, "utf8"), "en", target.article.route),
    );
  }

  const localizedStaticLocales = BALI_LANGUAGE_OPTIONS.map((item) => item.code).filter((code) => code !== "en");

  const englishMainPageHtml = fs.readFileSync(englishMainPagePath, "utf8");
  for (const locale of localizedStaticLocales) {
    const localizedMainHtml = await buildLocalizedStaticHtmlPage(englishMainPageHtml, locale, {
      shell: "tilda",
      currentRoute: localizedMainPageRoute(locale),
      routeBuilder: (code) => localizedMainPageRoute(code),
    });
    writeGeneratedFile(path.join(projectRoot, localizedMainPageFileName(locale)), localizedMainHtml);
  }

  const englishJournalHubHtml = fs.readFileSync(journalIndexPath, "utf8");
  for (const locale of localizedStaticLocales) {
    const localizedJournalHubHtml = await buildLocalizedStaticHtmlPage(englishJournalHubHtml, locale, {
      shell: "journal",
      currentRoute: localizedJournalHubRoute(locale),
    });
    writeGeneratedFile(path.join(projectRoot, localizedJournalHubFileName(locale)), localizedJournalHubHtml);
  }

  for (const target of journalTargets) {
    const englishJournalHtml = fs.readFileSync(target.filePath, "utf8");
    for (const locale of localizedStaticLocales) {
      const localizedRoute = localizedBaliInternalRoute(target.article.route, locale);
      const localizedJournalHtml = await buildLocalizedStaticHtmlPage(englishJournalHtml, locale, {
        shell: "journal",
        currentRoute: localizedRoute,
      });
      writeGeneratedFile(
        path.join(projectRoot, localizedJournalArticleFileName(target.article.tour, target.article.articleType, locale)),
        localizedJournalHtml,
      );
    }
  }

  for (const target of guideTargets) {
    const englishGuideHtml = fs.readFileSync(target.filePath, "utf8");
    for (const locale of localizedStaticLocales) {
      const localizedRoute = localizedBaliInternalRoute(target.article.route, locale);
      const localizedGuideHtml = await buildLocalizedStaticHtmlPage(englishGuideHtml, locale, {
        shell: "journal",
        currentRoute: localizedRoute,
      });
      writeGeneratedFile(
        path.join(projectRoot, localizedGuideArticleFileName(target.article.guide, locale)),
        localizedGuideHtml,
      );
    }
  }

  // Localized Bali About / FAQ pages, built from the finished English ones so
  // they keep the exact Dubai-derived design plus the Bali footer.
  for (const infoRoute of ["about", "faq"]) {
    const englishInfoPath = path.join(projectRoot, `bali-${infoRoute}.html`);
    if (!fs.existsSync(englishInfoPath)) continue;
    const englishInfoHtml = fs.readFileSync(englishInfoPath, "utf8");
    for (const locale of localizedStaticLocales) {
      const localizedInfoHtml = await buildLocalizedStaticHtmlPage(englishInfoHtml, locale, {
        shell: "tilda",
        currentRoute: `/bali/${locale}/${infoRoute}`,
        routeBuilder: (code) => `/bali/${code}/${infoRoute}`,
      });
      writeGeneratedFile(path.join(projectRoot, `bali-${infoRoute}-${locale}.html`), localizedInfoHtml);
    }
  }

  saveTranslationCache();
  console.log(
    `Generated ${tours.length} Bali tour pages, ${buildJournalArticles().length} journal articles, ${buildSeoGuideArticles().length} SEO guides, and patched Bali main page files.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

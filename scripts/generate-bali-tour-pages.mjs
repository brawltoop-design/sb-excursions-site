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
const WEATHER_COMPACT_PATCH_FILES = [
  "page128073236.html",
  "files/page128073236body.html",
  "page132181473.html",
  "files/page132181473body.html",
  "page132812463.html",
  "files/page132812463body.html",
  "page133629743.html",
  "files/page133629743body.html",
  "files/page139295043body.html",
];
const BALI_TILDA_FOOTER_PATCH_FILES = [
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
</style>`;
const JOURNAL_FOOTER_ASSETS = `
    <link rel="stylesheet" href="/css/tilda-grid-3.0.min.css">
    <link rel="stylesheet" href="/css/tilda-blocks-page106032906.min.css">
    <script>
      window.t_onReady = window.t_onReady || function (fn) {
        if (document.readyState !== "loading") {
          fn();
          return;
        }
        document.addEventListener("DOMContentLoaded", fn, { once: true });
      };
      window.t_onFuncLoad = window.t_onFuncLoad || function (name, fn) {
        if (typeof window[name] === "function") {
          fn();
        }
      };
    </script>`;
const WEATHER_COMPACT_OVERRIDE_STYLE = `
<style id="sb-weather-compact-override">
#bwCta {
  display: none !important;
}

#rec2147449333 .bw-footer {
  grid-template-columns: minmax(0, 1fr) !important;
}

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
  "Tanah Lot Temple": "https://live.staticflickr.com/4128/4947292419_203860e39c_b.jpg",
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
  "Koral Restaurant": "https://www.asiadreams.com/wp-content/uploads/Apurva-Kempinski_Koral-Restaurant_Koral-Tunnel-1.jpg",
  "Pandawa Beach": "https://live.staticflickr.com/5447/17444541604_228b2a0368_b.jpg",
  "Sanur Beach Boardwalk": "https://live.staticflickr.com/3086/3162417875_1805291d40_b.jpg",
  "Massimo": "https://massimobali.com/wp-content/uploads/2022/07/IMG_4418-copy.jpg",
  "Cafe Batu Jimbar": lokasiBaliImage("business-0x2dd241c8e53cd3d3%3A0x24486a0a41b72b59-0.webp"),
  "Byrd House Beach Club": "https://static.bali.live/uploads/64323/conversions/19e46e0a-4bfc-4de4-b9e5-0a496e3180e3-preview.jpg",
  "Mertasari Beach": BALI_PLANNER_PLACE_IMAGES.sanurMertasari,
  "Soul on the Beach": "https://static.bali.live/uploads/67425/conversions/1b58e9fa-d630-4a03-8fca-58c147e18a01-preview.jpg",
  "Le Mayeur Museum": "https://live.staticflickr.com/6051/6380853817_1766d13fb8.jpg",
  "Icon Bali Mall": "https://bali.com/wp-content/uploads/2024/09/icon-mall-sanur.webp",
  "Sindhu Beach": "https://live.staticflickr.com/7189/6954816153_ea24d21170_b.jpg",
  "Genius Cafe": "https://geniuscafebali.com/wp-content/uploads/2024/01/image-header-opt-1.jpg",
  "Sindhu Night Market": "https://lokasibali.com/api/images/business-0x2dd24035648dd487%3A0xc347d8c9cc4d9bce-0.webp",
  "Big Garden Corner": "https://lokasibali.com/api/images/business-0x2dd24071d99200c3%3A0x6b8b5fe4aa9162c0-0.webp",
  "Seawalker Sanur": "https://live.staticflickr.com/7343/12296298645_3b611d9ca0_b.jpg",
  "Karang Beach": "https://lokasibali.com/api/images/business-0x2dd214573b2294d5%3A0x33316987ae56a9ce-0.webp",
  "Pizzaria Sanur": "https://itin-dev.wanderlogstatic.com/freeImage/ZjgnSPtC3sDohKyAwXpHb5WyZb22okU0",
  "Sunset cruise in Bali": BALI_PLANNER_PLACE_IMAGES.sunsetCruiseLocal,
  "Mount Batur sunrise": BALI_PLANNER_PLACE_IMAGES.mountBaturSunriseLocal,
  "Nusa Penida day trip": BALI_PLANNER_PLACE_IMAGES.eastBaliNusaPenida,
};

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
var PLACE_IMAGE_VERSION = '20260524b';
var PLACE_IMAGE_BY_TITLE = ${JSON.stringify(BALI_PLANNER_PLACE_IMAGE_BY_TITLE, null, 2)};
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
function place(title, kind, maps, copy, vibe){ return { title:title, kind:kind, image:withPlannerImageVersion(PLACE_IMAGE_BY_TITLE[title] || PLACE_IMAGE[kind] || PLACE_IMAGE.scenic), maps:maps, copy:copy, vibe:vibe || ['couple','friends','family','solo'] }; }`;
}

const tours = [
  {
    slug: "ubud-highlights-tour",
    title: "Ubud Highlights Tour",
    eyebrow: "Culture and nature day trip",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "First-time Bali visitors",
    format: "Private day tour",
    area: "Ubud and central Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Ubud temple and lakeside scenery in Bali",
    lead:
      "See the most photogenic side of central Bali in one smooth day with rice terraces, temples, waterfalls, and the easy rhythm that makes Ubud so popular.",
    summary:
      "This Ubud Highlights Tour is built for travelers who want classic Bali scenery without rushing from stop to stop. It works especially well for couples, families, and guests who want a balanced mix of culture, viewpoints, and soft adventure.",
    overview:
      "Expect a flexible private route that can be adjusted around your hotel area, pace, and preferred photo stops. It is the easiest way to get the signature Ubud look and feel while keeping transport, timing, and route planning simple.",
    highlights: [
      ["Rice terrace viewpoints", "A classic Bali landscape day with green terraces, jungle backdrops, and wide open viewpoints."],
      ["Temple atmosphere", "A calm cultural route that still feels premium and visually rich instead of overly touristy."],
      ["Waterfall stop potential", "Add a refreshing nature break with an easy waterfall stop that fits your pace and energy."],
      ["Private pacing", "Spend more time at the places you like most and skip the unnecessary waiting of shared group trips."],
    ],
    itinerary: [
      ["Morning pickup and route planning", "Your day starts with hotel pickup and a route that can be shaped around your area and preferred stop order."],
      ["Terraces, temples, and scenic stops", "Move through the Ubud area with time for iconic viewpoints, soft walks, and classic photo opportunities."],
      ["Relaxed return to your hotel", "Finish the route with extra coffee, a last scenic stop, or a direct return depending on how full you want the day to feel."],
    ],
    tags: ["hotelPickup", "private", "temple", "nature", "family"],
    related: ["east-bali-instagram-tour", "tanah-lot-bedugul-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Can this Ubud tour be customized?",
      "Yes. Because this is typically booked as a private Bali day trip, the route can be adjusted around your hotel area, travel pace, and the places you most want to prioritize.",
    ],
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
    slug: "unesco-heritage-sites-tour",
    title: "Bali UNESCO Heritage Sites Tour",
    mainPage: false,
    aiPlanner: false,
    eyebrow: "UNESCO temples, rice terraces, and Tanah Lot",
    duration: "10 hours",
    pickup: "Morning hotel pickup from Ubud, Sanur, Seminyak, Canggu, Legian, Kuta, Nusa Dua, or Jimbaran",
    bestFor: "Culture lovers, families, couples, and first-time Bali sightseeing days",
    format: "Private heritage sightseeing route",
    area: "Central and west Bali UNESCO heritage route",
    price: "From $75",
    image: sourceImage("bali-tours/tanah-lot-bedugul-tour.jpg"),
    imageAlt: "Bali UNESCO Heritage Sites Tour with temple and rice terrace scenery",
    lead:
      "See Bali's best-known heritage scenery in one polished private day with Taman Ayun Temple, Ulun Danu Beratan, Jatiluwih Rice Terraces, and Tanah Lot connected in one easy route.",
    summary:
      "This Bali UNESCO Heritage Sites Tour is built for travelers who want temple courtyards, mountain-lake views, UNESCO rice terraces, and a famous coastal temple finish without stitching separate day trips together. Private transport, all entrance tickets, a sarong, and bottled water are handled from $75.",
    overview:
      "The route works well because it keeps the day scenic and varied without making it physically heavy. You start with cultural and architectural stops, continue into the cooler Bedugul highlands, open out into the wide Jatiluwih rice terrace landscape, and finish at Tanah Lot for one of Bali's most recognizable oceanfront temple settings.",
    highlights: [
      ["Taman Ayun Temple", "Start with one of Bali's most elegant royal temple complexes and a calm cultural stop that sets the tone for the day."],
      ["Ulun Danu Beratan", "The mountain lake setting in Bedugul gives the route cooler air, softer light, and one of Bali's most iconic temple backdrops."],
      ["Jatiluwih Rice Terraces", "Add the UNESCO-listed rice terrace landscape that makes this route feel broader and more visually complete than a temple-only day."],
      ["Tanah Lot coastal finish", "Close with Bali's famous sea temple and a coastal atmosphere that gives the final part of the day real payoff."],
    ],
    itinerary: [
      ["Morning pickup and Taman Ayun Temple", "Begin with hotel pickup from the main south and central Bali areas, then head first to Taman Ayun Temple for the opening cultural stop."],
      ["Ulun Danu Beratan in Bedugul", "Continue into the cooler highlands for Ulun Danu Beratan, where temple scenery, lake views, and mountain air break up the route beautifully."],
      ["Jatiluwih Rice Terraces", "Drive onward to Jatiluwih for Bali's UNESCO rice terrace landscape and the broad green views travelers usually expect from a heritage route."],
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
    related: ["tanah-lot-bedugul-tour", "ubud-highlights-tour", "east-bali-instagram-tour"],
    whatsappText:
      "Hello! I want to book the Bali UNESCO Heritage Sites Tour. Please send availability, pickup options, and full details.",
    metaTitle: "Bali UNESCO Heritage Sites Tour | Jatiluwih, Ulun Danu & Tanah Lot",
    metaDescription:
      "Book the Bali UNESCO Heritage Sites Tour with Taman Ayun Temple, Ulun Danu Beratan, Jatiluwih Rice Terraces and Tanah Lot, plus private transport and all entrance tickets from $75.",
  },
  {
    slug: "mount-batur-sunrise-jeep-tour",
    title: "Mount Batur Sunrise Jeep Tour",
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
    stops: ["Ubud Palace", "Tegallalang", "Tirta Empul", "Goa Gajah", "Tegenungan"],
    routeStops: [
      "Ubud Palace, Ubud, Bali",
      "Tegallalang Rice Terrace, Bali",
      "Tirta Empul Temple, Tampaksiring, Bali",
      "Goa Gajah, Gianyar, Bali",
      "Tegenungan Waterfall, Bali",
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
  "unesco-heritage-sites-tour": {
    stops: ["Taman Ayun", "Ulun Danu", "Jatiluwih", "Batukaru", "Tanah Lot"],
    routeStops: [
      "Taman Ayun Temple, Mengwi, Bali",
      "Ulun Danu Beratan Temple, Bedugul, Bali",
      "Jatiluwih Rice Terrace, Tabanan, Bali",
      "Batukaru Temple, Tabanan, Bali",
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function publicImagePath(tour) {
  return `/images/bali-tours/${tour.slug}${path.extname(tour.image).toLowerCase()}`;
}

function absoluteTourUrl(tour) {
  return `${SITE_URL}/bali/en/tours/${tour.slug}`;
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

function collapseWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeJsSingleQuoted(value) {
  return collapseWhitespace(value).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
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

function buildWestFaqs(tour) {
  const explicitFaqs = (tour.faqs || [])
    .map(([question, answer]) => [collapseWhitespace(question), collapseWhitespace(answer)])
    .filter(([question, answer]) => question && answer);

  const includes = buildIncludes(tour);
  const notes = buildGoodToKnow(tour);
  const routeStops = buildWestRouteStops(tour).slice(0, 4);
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

function buildWestHighlightsParagraph(tour) {
  const pieces = [tour.lead, tour.highlights?.map(([heading]) => heading).filter(Boolean).join(", ")]
    .filter(Boolean)
    .map(collapseWhitespace);

  return collapseWhitespace(pieces.join(" "));
}

function buildWestFullDescription(tour) {
  return collapseWhitespace([tour.summary, tour.overview].filter(Boolean).join(" "));
}

function buildWestIncludesParagraph(tour) {
  return collapseWhitespace(buildIncludes(tour).join(" • "));
}

function buildWestImportantInfoParagraph(tour) {
  return collapseWhitespace(buildGoodToKnow(tour).join(" "));
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
    label: westRouteLabel(tour),
    title: `${tour.title} route on Google Maps`,
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
      {
        sunrise: "Classic sunrise route",
        marine: "Sea-day favorite",
        island: "Island bestseller",
        culture: "Best-selling heritage route",
        instagram: "Private photo day",
        adventure: "High-energy Bali route",
        transfer: "Easy Bali logistics",
        helicopter: "Premium flight route",
      }[detectTourKind(tour)] || "Best-selling Bali route",
    heading: tour.title,
    text: collapseWhitespace(tour.summary || tour.lead || tour.overview),
    benefits: [
      includes[0] || `${compactAreaLabel(tour)} logistics handled`,
      includes[1] || `${routeStops[1] || routeStops[0]} included`,
      includes[2] || `${routeStops[2] || "Main highlights"} planned for you`,
    ].map(collapseWhitespace),
    imageAlt: collapseWhitespace(tour.imageAlt || tour.title),
    topline: `Best for ${collapseWhitespace(tour.bestFor).toLowerCase()}`,
    cardTitle: tour.title,
    cardText: collapseWhitespace(tour.lead || tour.summary || tour.overview),
    pills: [
      clampText(collapseWhitespace(tour.format || "Private Bali route"), 28),
      clampText(routeStops[1] || compactAreaLabel(tour), 28),
      clampText(includes[0] || highlights[0][0], 28),
      clampText(collapseWhitespace(tour.pickup || "Pickup confirmed after booking"), 28),
    ],
    ctaLabel: "Book now",
    priceValue: privatePriceValue,
  };
}

function buildWestMiniPromoModel(tour) {
  const routeStops = buildWestRouteStops(tour)
    .slice(1, 5)
    .filter(Boolean);
  const promoTitle = `<strong>${formatWestHeroTitle(tour.title).replace(/<br>/g, "</strong><br /><strong>")}</strong>`;
  const promoText = routeStops.length
    ? `${routeStops.length} key stops: ${routeStops.join(", ")}.`
    : collapseWhitespace(tour.lead || tour.summary || tour.overview);

  return {
    eyebrow:
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
    ctaLabel: "Book now",
    sideText: collapseWhitespace(tour.overview || tour.summary || tour.lead),
  };
}

function buildWestReviews(tour) {
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
  return html.replace(
    new RegExp(
      `(data-elem-id='${escapeRegExp(elemId)}'[\\s\\S]*?<div class='tn-atom t-bgimg' data-original=")([^"]*)("[\\s\\S]*?aria-label=')([^']*)(' role="img")`,
    ),
    (_, start, __oldPath, middle, __oldAlt, end) => `${start}${escapeHtml(imagePath)}${middle}${escapeHtml(altText)}${end}`,
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
    [/goa gajah/i, exactPlaceImage("Goa Gajah") || BALI_PLANNER_PLACE_IMAGES.ubudGoaGajah],
    [/tegenungan/i, commonsImage("Kanto lampo waterfall.jpg")],
    [/lovina|dolphin/i, plannerLocalImage("images/bali-tours/dolphin-sunrise-city-tour.jpg")],
    [/gitgit|banyumala|ulu petanu|waterfall/i, exactPlaceImage("Kanto Lampo Waterfall") || BALI_PLANNER_PLACE_IMAGES.ubudWaterfall],
    [/handara/i, plannerLocalImage("images/bali-tours/bali-instagram-highlights-tour.jpg")],
    [/ulun danu|bedugul/i, plannerLocalImage("images/bali-tours/tanah-lot-bedugul-tour.jpg")],
    [/candikuning/i, plannerLocalImage("images/bali-tours/tanah-lot-bedugul-tour.jpg")],
    [/taman ayun|batukaru/i, plannerLocalImage("images/bali-tours/unesco-heritage-sites-tour.jpg")],
    [/jatiluwih/i, plannerLocalImage("images/bali-tours/unesco-heritage-sites-tour.jpg")],
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
    const stopAssets = buildWestCollageStops(tour)
      .map((stop) => resolveWestCollageStopImage(stop, tour))
      .filter(Boolean);
    const uniqueAssets = [];
    const seenImagePaths = new Set();

    for (const asset of stopAssets.concat(buildWestCollageFallbackAssets(tour))) {
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
    westTemplateCache = fs.readFileSync(WEST_TEMPLATE_SOURCE_FILE, "utf8");
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
  const faq = buildWestFaqs(tour);
  const map = buildWestMapModel(tour);
  const offer = buildWestPrivateOfferModel(tour);
  const miniPromo = buildWestMiniPromoModel(tour);
  const reviews = buildWestReviews(tour);
  const imagePath = publicImagePath(tour);
  const heroArea = compactAreaLabel(tour);
  const heroLead = collapseWhitespace(tour.lead || tour.summary || tour.overview);
  const aboutSubtitle = `${tour.title} from Bali`;
  const highlightsParagraph = buildWestHighlightsParagraph(tour);
  const fullDescription = buildWestFullDescription(tour);
  const includesParagraph = buildWestIncludesParagraph(tour);
  const importantInfo = buildWestImportantInfoParagraph(tour);
  const genericFaqIntro = `Quick answers before booking the ${tour.title}.`;
  const weatherArea = compactAreaLabel(tour).toLowerCase();

  let html = getWestTemplateHtml();

  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/data-tilda-page-alias="bali\/en\/tours\/[^"]+"/i, `data-tilda-page-alias="${route.slice(1)}"`)
    .replaceAll('href="/dubai/en/about"', 'href="/bali/en/main-page"')
    .replaceAll('href="/dubai/en/faq"', 'href="/bali/en/main-page#tours"')
    .replaceAll('href="/dubai/en#tours"', 'href="/bali/en/main-page#tours"')
    .replaceAll('href="/" class="t228__imgwrapper"', 'href="/bali/en/main-page" class="t228__imgwrapper"')
    .replaceAll('href="/" class="t451__logowrapper"', 'href="/bali/en/main-page" class="t451__logowrapper"');

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
  html = replaceSingleQuotedField(html, "tn_text_1721240739957", escapeHtml(collapseWhitespace(tour.duration)));
  html = replaceSingleQuotedField(html, "tn_text_1766425094306", escapeHtml(heroArea));
  html = replaceSingleQuotedField(html, "tn_text_1721244135148", escapeHtml(aboutSubtitle));
  html = replaceSingleQuotedField(html, "tn_text_1721244135153", escapeHtml(highlights[0][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135162", escapeHtml(highlights[0][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135179", escapeHtml(highlights[1][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135184", escapeHtml(highlights[1][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135195", escapeHtml(highlights[2][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135199", escapeHtml(highlights[2][1]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135209", escapeHtml(highlights[3][0]));
  html = replaceSingleQuotedField(html, "tn_text_1721244135213", escapeHtml(highlights[3][1]));
  html = replaceSingleQuotedField(html, "tn_text_1766481493302000001", escapeHtml(miniPromo.eyebrow));
  html = replaceSingleQuotedField(html, "tn_text_1766620130918", escapeHtml(miniPromo.sideText));
  html = replaceSingleQuotedField(html, "tn_text_1766442865058", miniPromo.title);
  html = replaceSingleQuotedField(html, "tn_text_1766442925510", escapeHtml(miniPromo.text));

  html = replaceDoubleQuotedField(html, "li_descr__7138223910800", escapeHtml(highlightsParagraph));
  html = replaceDoubleQuotedField(html, "li_descr__7138223910801", escapeHtml(fullDescription));
  html = replaceDoubleQuotedField(html, "li_descr__7138223910802", escapeHtml(includesParagraph));
  html = replaceDoubleQuotedField(html, "li_descr__1767049015805", escapeHtml(importantInfo));

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
    .replaceAll("Open the west Penida route in Google Maps", escapeJsSingleQuoted(`Open the ${tour.title} route in Google Maps`))
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

  html = applyWestCollageImageOverrides(html, tour);

  html = html.replace(
    /(<div class='tn-atom'><a href=")\/bali\/en\/tours\/nusa-penida-west-tour("target="_blank"style="color: inherit"><u>)Nusa Penida West Tour(<\/u><\/a><\/div>)/,
    `$1${route}$2${escapeHtml(tour.title)}$4`,
  );

  html = injectWestPageSpecificStyle(html, tour);
  html = applyBaliBlueFooter(html);
  html = replaceLdJsonBlocks(html, tour);
  return html;
}

function injectWestPageSpecificStyle(html, tour) {
  const pageSpecificCss = [];

  if (tour.slug === "unesco-heritage-sites-tour") {
    pageSpecificCss.push(`
@media screen and (max-width: 639px) {
  #rec2121221993 .tn-elem[data-elem-id="1721244135153"] {
    left: calc(50% - 160px + 28px) !important;
    width: 92px !important;
  }

  #rec2121221993 .tn-elem[data-elem-id="1721244135153"] .tn-atom {
    white-space: nowrap !important;
    font-size: 9px !important;
  }
}`);
  }

  if (pageSpecificCss.length === 0) {
    return html;
  }

  const styleTag = `<style id="sb-west-page-specific-overrides">\n${pageSpecificCss.join("\n")}\n</style>\n`;
  return html.replace("</head>", `${styleTag}</head>`);
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
              <a class="sb-journal-tour-header__nav-link" href="/bali/en/main-page">About Us</a>
              <a class="sb-journal-tour-header__nav-link" href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">Booking</a>
              <a class="sb-journal-tour-header__nav-link" href="/bali/en/main-page#tours">FAQ</a>
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
              <a class="sb-journal-tour-header__drawer-link" href="/bali/en/main-page">About Us</a>
              <a class="sb-journal-tour-header__drawer-link" href="${bookingHref}" target="_blank" rel="noopener noreferrer nofollow">Booking</a>
              <a class="sb-journal-tour-header__drawer-link" href="/bali/en/main-page#tours">FAQ</a>
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

const JOURNAL_ARTICLE_TYPES = [
  {
    key: "selling",
    slug: "why-book",
    badge: "Selling article",
    navLabel: "Why book it",
    title: (tour) => `Why Book the ${tour.title} in Bali`,
    description: (tour) =>
      `See why travelers choose the ${tour.title}, what is usually included, and how to decide if this Bali route fits your trip.`,
    excerpt: (tour) =>
      `${tour.summary} This guide focuses on value, fit, and the practical reasons travelers book this route before they land in Bali.`,
    sections: (tour) => [
      {
        heading: `Why ${tour.title} works as a Bali booking`,
        paragraphs: [tour.summary, tour.overview],
      },
      {
        heading: "What gives this route its value",
        bullets: tour.highlights.map(([heading, text]) => `${heading}: ${text}`),
      },
      {
        heading: "Who should choose this route",
        paragraphs: [
          `This experience is best for ${tour.bestFor.toLowerCase()}. It usually runs as a ${tour.format.toLowerCase()} in ${tour.area.toLowerCase()}, and the overall pacing works especially well when you want ${tour.duration.toLowerCase()} that feels organized instead of improvised.`,
          `The pickup flow normally starts with ${tour.pickup.toLowerCase()}, so most travelers book it when they want a smoother day with the main logistics already lined up.`,
        ],
      },
      {
        heading: "What is usually included",
        bullets: buildIncludes(tour),
      },
      {
        heading: "What to confirm before you book",
        bullets: [
          `Current pricing reference: ${tour.price}. Final availability is normally confirmed after you send the date, hotel area, and group size.`,
          ...buildGoodToKnow(tour).slice(0, 4),
        ],
      },
    ],
  },
  {
    key: "interesting",
    slug: "travel-guide",
    badge: "Interesting guide",
    navLabel: "Interesting guide",
    title: (tour) => `${tour.title}: What Makes This Bali Route Special`,
    description: (tour) =>
      `Learn what makes the ${tour.title} interesting, what kind of scenery and rhythm to expect, and why this route feels different from other Bali experiences.`,
    excerpt: (tour) =>
      `Every strong Bali tour has its own identity. This guide explains the mood, scenery, standout stops, and small local details that make the ${tour.title} memorable.`,
    sections: (tour) => [
      {
        heading: `The identity of the ${tour.title}`,
        paragraphs: [
          `The ${tour.title} stands out because it is built around ${tour.area.toLowerCase()} and works best for ${tour.bestFor.toLowerCase()}. Instead of trying to be everything at once, this route leans into a clear experience profile and that usually makes the day feel stronger from start to finish.`,
          journalInterestingHook(tour),
        ],
      },
      {
        heading: "What travelers usually remember most",
        bullets: tour.highlights.map(([heading, text]) => `${heading}: ${text}`),
      },
      {
        heading: "How the experience unfolds on the ground",
        bullets: tour.itinerary.map(([heading, text]) => `${heading}: ${text}`),
      },
      {
        heading: "Useful local context before you go",
        paragraphs: [
          `The route usually feels best when you match your expectations to the actual format: ${tour.format.toLowerCase()}, ${tour.duration.toLowerCase()}, and a day shaped around ${tour.pickup.toLowerCase()}.`,
        ],
        bullets: buildGoodToKnow(tour).slice(0, 5),
      },
    ],
  },
  {
    key: "schedule",
    slug: "tour-schedule",
    badge: "Schedule article",
    navLabel: "Schedule",
    title: (tour) => `${tour.title} Itinerary, Timing and What to Expect`,
    description: (tour) =>
      `Read a practical schedule guide for the ${tour.title}, including timing, route flow, what to bring, and the best way to prepare for the day.`,
    excerpt: (tour) =>
      `If you want the practical version before booking, this article breaks down the usual timing, route flow, and prep details for the ${tour.title}.`,
    sections: (tour) => [
      {
        heading: "Quick timing snapshot",
        bullets: [
          `Duration: ${tour.duration}`,
          `Format: ${tour.format}`,
          `Area: ${tour.area}`,
          `Pickup flow: ${tour.pickup}`,
          `Best for: ${tour.bestFor}`,
        ],
      },
      {
        heading: "Step-by-step route flow",
        bullets: tour.itinerary.map(([heading, text], index) => `${journalPhaseLabel(index)} ${heading}: ${text}`),
      },
      {
        heading: "What to bring and how to prepare",
        bullets: buildGoodToKnow(tour),
      },
      {
        heading: "Booking and confirmation checklist",
        paragraphs: [
          `Before the day is locked in, send the operator your date, hotel area, and group size. That is usually the fastest way to confirm the right timing window and the exact package details for the ${tour.title}.`,
          `If you are comparing multiple routes, this schedule article is most useful when you want to understand how the experience actually flows rather than only how it looks in marketing photos.`,
        ],
        bullets: [
          `Pricing reference: ${tour.price}`,
          ...buildIncludes(tour).slice(0, 4),
        ],
      },
    ],
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
    relatedTourSlugs: ["ubud-highlights-tour", "unesco-heritage-sites-tour", "nusa-penida-west-tour"],
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
#sb-journal-news{font-family:"TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#151515;}
#sb-journal-news .sb-journal-news__shell{background:#fff;border:1px solid rgba(21,21,21,0.08);border-radius:36px;padding:36px;box-shadow:0 18px 52px rgba(17,17,17,0.05);}
#sb-journal-news .sb-journal-news__top{display:flex;gap:20px;align-items:flex-end;justify-content:space-between;margin-bottom:28px;}
#sb-journal-news .sb-journal-news__eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:rgba(47,107,255,0.08);color:#2f6bff;font-size:13px;font-weight:700;letter-spacing:-0.2px;margin-bottom:14px;}
#sb-journal-news .sb-journal-news__title{margin:0;font-size:48px;line-height:1.04;font-weight:700;letter-spacing:-2px;}
#sb-journal-news .sb-journal-news__descr{max-width:700px;margin:12px 0 0;color:#6f6f73;font-size:18px;line-height:1.6;}
#sb-journal-news .sb-journal-news__cta{display:inline-flex;align-items:center;justify-content:center;padding:16px 24px;border-radius:999px;background:#111;color:#fff;text-decoration:none;font-size:16px;font-weight:700;white-space:nowrap;transition:transform .2s ease, box-shadow .2s ease;}
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
@media screen and (max-width:640px){#sb-journal-news .sb-journal-news__shell{padding:20px 18px;border-radius:28px;}#sb-journal-news .sb-journal-news__title{font-size:32px;letter-spacing:-1.5px;}#sb-journal-news .sb-journal-news__descr{font-size:16px;}#sb-journal-news .sb-journal-news__grid{grid-template-columns:1fr;}#sb-journal-news .sb-journal-card h3{font-size:22px;}}
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
  <head>
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
          <span>${escapeHtml(item.area)}</span>
          <span>${escapeHtml(item.bestFor)}</span>
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.summary)}</p>
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
          description: item.summary,
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
          text: item.answer,
        },
      })),
    },
  ];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
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
            <p class="sb-journal-lead">${escapeHtml(article.excerpt)}</p>
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
                ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
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
                    <p>${escapeHtml(item.answer)}</p>
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
                ${article.inlineStats.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
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
  <head>
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
            <p class="sb-journal-lead">${escapeHtml(article.excerpt)}</p>
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
            ${article.sections
              .map(
                (section) => `
              <section class="sb-journal-article-section">
                <h2>${escapeHtml(section.heading)}</h2>
                ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
              </section>
            `,
              )
              .join("")}
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
  body{margin:0;background:var(--sbj-bg);color:var(--sbj-text);font-family:"TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
  img{max-width:100%;display:block}
  a{text-decoration:none;color:inherit}
  .sb-journal-page{min-height:100vh;overflow-x:hidden}
  .sb-journal-tour-header{position:fixed;top:0;left:0;right:0;z-index:80}
  .sb-journal-tour-header__desktop{display:block;background:rgba(255,255,255,0);border-bottom:0;transition:background-color .35s ease,box-shadow .35s ease}
  .sb-journal-tour-header__desktop-inner{width:min(calc(100% - 32px),1240px);min-height:7vh;margin:0 auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:24px}
  .sb-journal-tour-header__logo-link{display:inline-flex;align-items:center}
  .sb-journal-tour-header__logo{width:135px;max-width:135px;height:auto}
  .sb-journal-tour-header__nav{display:flex;align-items:center;justify-content:center;gap:0}
  .sb-journal-tour-header__nav-link,.sb-journal-tour-header__dropdown-trigger{appearance:none;border:0;background:transparent;padding:0 30px;color:#000;font-family:"TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:16px;font-weight:600;letter-spacing:-1px;line-height:1;cursor:pointer;transition:color .2s ease}
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
  .sb-journal-header-lock{overflow:hidden}
  @media screen and (max-width:1100px){.sb-journal-featured-grid,.sb-journal-tour-grid,.sb-journal-article-layout,.sb-journal-hero,.sb-journal-article-hero,.sb-journal-ranking-grid,.sb-journal-guide-tour-grid{grid-template-columns:1fr}.sb-journal-sidebar{position:static}.sb-journal-hero h1,.sb-journal-article-hero h1{font-size:46px}}
  @media screen and (max-width:980px){.sb-journal-tour-header__desktop-inner{grid-template-columns:auto 1fr;gap:18px;padding-top:14px;padding-bottom:14px}.sb-journal-tour-header__nav{justify-content:flex-end;flex-wrap:wrap}.sb-journal-tour-header__actions{grid-column:1/-1;justify-content:flex-start}}
  @media screen and (max-width:480px){.sb-journal-tour-header__desktop{display:none}.sb-journal-tour-header__mobile{display:block;background:transparent;transition:background-color .35s ease,box-shadow .35s ease}.sb-journal-tour-header__mobile-bar{background:transparent;transition:background-color .35s ease,box-shadow .35s ease}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile,.sb-journal-tour-header_open .sb-journal-tour-header__mobile{background:#333}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile-bar,.sb-journal-tour-header_open .sb-journal-tour-header__mobile-bar{background:#333;box-shadow:0 10px 30px rgba(17,24,39,0.18)}.sb-journal-tour-header_scrolled .sb-journal-tour-header__burger,.sb-journal-tour-header_open .sb-journal-tour-header__burger,.sb-journal-tour-header_scrolled .sb-journal-tour-header__socials a,.sb-journal-tour-header_open .sb-journal-tour-header__socials a{color:#fff}.sb-journal-tour-header_scrolled .sb-journal-tour-header__mobile-logo,.sb-journal-tour-header_open .sb-journal-tour-header__mobile-logo{filter:brightness(0) invert(1)}.sb-journal-main{padding:90px 14px 64px}.sb-journal-hero,.sb-journal-article-hero,.sb-journal-tour-card,.sb-journal-article,.sb-journal-sidebar-card,.sb-journal-ranking-card,.sb-journal-faq-card{border-radius:24px}.sb-journal-hero,.sb-journal-article-hero,.sb-journal-article{padding:20px}.sb-journal-featured-grid,.sb-journal-tour-grid,.sb-journal-ranking-grid,.sb-journal-guide-tour-grid,.sb-journal-faq-grid{gap:16px}.sb-journal-tour-card__copy{left:16px;right:16px;bottom:16px}.sb-journal-tour-card__copy h3{font-size:28px}.sb-journal-hero h1,.sb-journal-article-hero h1{font-size:34px;letter-spacing:-1.6px}.sb-journal-lead{font-size:17px}.sb-journal-section__head{align-items:flex-start;flex-direction:column}.sb-journal-section__head h2{font-size:28px}.sb-journal-card h3,.sb-journal-ranking-card h3,.sb-journal-faq-card h3{font-size:23px}.sb-journal-article-section h2{font-size:26px}.sb-journal-article-section p,.sb-journal-article-section li,.sb-journal-sidebar-card li,.sb-journal-ranking-card p,.sb-journal-faq-card p{font-size:15px}}
  `;
}

function tourDataMap() {
  return new Map(tours.map((tour) => [tour.slug, tour]));
}

function tourRoute(tour) {
  return `/bali/en/tours/${tour.slug}`;
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
            max-width: 860px;
            margin: 0 auto;
            padding: 0 14px;
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
            font-family: "Tilda Sans", "TildaSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${absoluteTourUrl(tour)}#webpage`,
      url: absoluteTourUrl(tour),
      name: tour.title,
      description: tour.metaDescription || tour.summary,
      inLanguage: "en",
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
          name: "Bali main page",
          item: `${SITE_URL}/bali/en/main-page`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tours",
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

  if (!categories.has("transport") && !categories.has("helicopter")) {
    if (!categories.size || ["sunrise", "culture", "instagram", "adventure", "relax", "scenic"].includes(kind)) {
      categories.add("city");
    }
  }

  return Array.from(categories);
}

function mainPageFeatureLines(tour) {
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

  return `<article class="sb-card sb-reveal" data-category="${escapeHtml(categoryAttr)}"><div class="sb-card-inner"><div class="sb-gallery"><div class="sb-img sb-img-main"><img loading="lazy" decoding="async" src="${escapeHtml(publicImagePath(tour))}" alt="${escapeHtml(tour.imageAlt || tour.title)}"></div></div><div class="sb-content"><h3 class="sb-title">${escapeHtml(tour.title)}</h3><ul class="sb-features">${featuresHtml}</ul><div class="sb-bottom"><div class="sb-price-row"><div class="sb-price">${escapeHtml(normalizedCardPrice(tour.price))}</div></div><a href="${tourRoute(tour)}" class="sb-btn">Details</a></div></div></div></article>`;
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
      "images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png",
    ],
    ["/dubai/en#tours", "/bali/en/main-page#tours"],
    [">Dubai, UAE<", ">Bali, Indonesia<"],
    ["/dubai/en/about", "/bali/en/main-page"],
    ["/dubai/en/faq", "/bali/en/main-page"],
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
    .join('href="/bali/en/tours/dolphin-sunrise-city-tour" data-lid="7301316445701"')
    .split('alt="North Bali Tour and Lovina Dolphins"')
    .join('alt="Lovina Dolphin Sunrise Tour in Bali"')
    .split(">North Bali Tour and Lovina Dolphins</h3>")
    .join(">Lovina Dolphin Sunrise Tour</h3>")
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

  html = replaceCardArticle(
    html,
    ["North Bali Tour and Lovina Dolphins", "Lovina Dolphin Sunrise Tour"],
    '<article class="sb-card sb-reveal" data-category="city water"><div class="sb-card-inner"><div class="sb-gallery"><div class="sb-img sb-img-main"><img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1585643734412-05ea85526d11?auto=format&fit=crop&crop=entropy&w=960&h=560&q=72" alt="Lovina Dolphin Sunrise Tour in Bali"></div></div><div class="sb-content"><h3 class="sb-title">Lovina Dolphin Sunrise Tour</h3><ul class="sb-features"><li class="sb-feature"><span class="sb-feature-icon">⏰</span><span>8 hours north Bali route</span></li><li class="sb-feature"><span class="sb-feature-icon">🐬</span><span>Sunrise dolphin watching from Lovina</span></li><li class="sb-feature"><span class="sb-feature-icon">🚐</span><span>Private car, boat ticket and entrance fees</span></li><li class="sb-feature"><span class="sb-feature-icon">📍</span><span>Gitgit Waterfall and Ulun Danu Temple</span></li><li class="sb-feature"><span class="sb-feature-icon">🌊</span><span>Best for sunrise lovers and scenic day trips</span></li></ul><div class="sb-bottom"><div class="sb-price-row"><div class="sb-price">from $75</div></div><a href="/bali/en/tours/dolphin-sunrise-city-tour" class="sb-btn">Details</a></div></div></div></article>',
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

  html = replaceTextInsideCard(html, "Nusa Penida West Tour", ">8 hours north Bali route</span>", ">10-12 hours</span>");
  html = replaceTextInsideCard(html, "Nusa Penida East Tour", ">8 hours north Bali route</span>", ">10-12 hours</span>");

  html = patchStaticCardLinks(html);
  html = patchPlannerLinks(html);
  html = ensureGeneratedCardsOnMainPage(html);
  html = ensureGeneratedPlannerTours(html);

  html = html
    .replaceAll('src="images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"', 'src="/images/tild3334-6466-4436-b766-376338363935__sb_excursions_dubai_.png"')
    .replaceAll('src="images/tild3762-3034-4130-b063-643934306634__sb_dubai_logo_2025.png"', 'src="/images/tild3762-3034-4130-b063-643934306634__sb_dubai_logo_2025.png"')
    .replaceAll('<a href="/" class="t228__imgwrapper">', '<a href="/bali/en/main-page" class="t228__imgwrapper">')
    .replaceAll('<a class="t451__logo" href="/">', '<a class="t451__logo" href="/bali/en/main-page">')
    .replace(
      /href="\/bali\/en\/main-page"([^>]*)>\s*About Us\s*</g,
      'href="/bali/en/main-page#about"$1>About Us<',
    )
    .replace(
      /href="\/bali\/en\/main-page"([^>]*)>\s*FAQ\s*</g,
      'href="/bali/en/main-page#faq"$1>FAQ<',
    )
    .replaceAll(
      `<style>@media screen and (max-width:980px){#rec1816521261 .t228__leftcontainer{padding:20px;}#rec1816521261 .t228__imglogo{padding:20px 0;}#rec1816521261 .t228{position:static;}}</style>`,
      `<style>@media screen and (max-width:980px){#rec1816521261{display:none !important;}#rec1816521261 .t228__leftcontainer{padding:20px;}#rec1816521261 .t228__imglogo{padding:20px 0;}#rec1816521261 .t228{position:static;}#rec2128776473{display:block !important;}}@media screen and (min-width:981px){#rec2128776473{display:none !important;}}</style>`,
    )
    .replaceAll(
      `<div class='tn-atom'><a href="/bali/en/main-page"target="_blank"style="color: inherit"><u>About SB Excursions</u></a></div>`,
      `<div class='tn-atom'><a name="about" style="font-size:0;"></a><a href="/bali/en/main-page#about"style="color: inherit"><u>About SB Excursions</u></a></div>`,
    )
    .replaceAll(
      `<div class='tn-atom'><a href="/bali/en/main-page"target="_blank"style="color: inherit"><u>FAQ</u></a></div>`,
      `<div class='tn-atom'><a name="faq" style="font-size:0;"></a><a href="/bali/en/main-page#faq"style="color: inherit"><u>FAQ</u></a></div>`,
    );

  const plannerImageBlockStart = html.indexOf("var PLACE_IMAGE = {");
  const plannerImageBlockEnd = html.indexOf("var FREE_DAY_PLACES = {", plannerImageBlockStart);
  if (plannerImageBlockStart !== -1 && plannerImageBlockEnd !== -1) {
    html = `${html.slice(0, plannerImageBlockStart)}${renderPlannerPlaceImageBlock()}\n${html.slice(plannerImageBlockEnd)}`;
  }

  const newsStart = html.indexOf('<div id="rec2054910081"');
  const newsEnd = html.indexOf('<div id="rec2054910091"');
  if (newsStart !== -1 && newsEnd !== -1 && newsEnd > newsStart) {
    html = `${html.slice(0, newsStart)}${renderJournalNewsBlock()} ${html.slice(newsEnd)}`;
  }

  html = patchDubaiLinkedFooterContact(html);

  fs.writeFileSync(filePath, html);
}

function patchCompactWeatherWidget(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");

  if (!html.includes('id="baliWeatherCard"') || html.includes('id="sb-weather-compact-override"')) {
    return;
  }

  const insertBefore = '<div id="rec2147449333"';
  const insertIndex = html.indexOf(insertBefore);
  if (insertIndex === -1) {
    return;
  }

  html = `${html.slice(0, insertIndex)}${WEATHER_COMPACT_OVERRIDE_STYLE}${html.slice(insertIndex)}`;
  fs.writeFileSync(filePath, html);
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
    .replaceAll("Contacts &amp; Location", "Contacts &amp; Location"),
  );
}

function renderJournalBaliFooter() {
  return buildBaliTildaFooter();
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
    fs.writeFileSync(filePath, updated);
  }
}

function generatePages() {
  const allTours = tourDataMap();
  for (const tour of tours) {
    ensureHeroImage(tour);
    const html = renderPage(tour, allTours);
    const filePath = path.join(projectRoot, `bali-tour-${tour.slug}.html`);
    fs.writeFileSync(filePath, html);
  }

  const journalIndexPath = path.join(projectRoot, "bali-journal.html");
  fs.writeFileSync(journalIndexPath, renderJournalIndexPage());

  for (const article of buildJournalArticles()) {
    const articleFilePath = path.join(projectRoot, journalArticleFileName(article.tour, article.articleType));
    fs.writeFileSync(articleFilePath, renderJournalArticlePage(article));
  }

  for (const guideArticle of buildSeoGuideArticles()) {
    const guideFilePath = path.join(projectRoot, guideArticleFileName(guideArticle.guide));
    fs.writeFileSync(guideFilePath, renderSeoGuidePage(guideArticle));
  }
}

function main() {
  generatePages();
  patchBaliMainFile(path.join(projectRoot, "page128073236.html"));
  patchBaliMainFile(path.join(projectRoot, "files", "page128073236body.html"));
  for (const relativePath of WEATHER_COMPACT_PATCH_FILES) {
    patchCompactWeatherWidget(path.join(projectRoot, relativePath));
  }
  for (const relativePath of BALI_TILDA_FOOTER_PATCH_FILES) {
    ensureBaliTildaFooter(path.join(projectRoot, relativePath));
  }
  console.log(
    `Generated ${tours.length} Bali tour pages, ${buildJournalArticles().length} journal articles, ${buildSeoGuideArticles().length} SEO guides, and patched Bali main page files.`,
  );
}

main();

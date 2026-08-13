/*
 * Посадочная шапка для AI-планировщика, в языке страницы Work With Us.
 *
 * До этого /ai-planner открывался сразу формой: человек попадал на панель с
 * датами, не понимая, что он вообще получит на выходе. Шапка отвечает на это
 * до первого клика — крупная типографика, разбросанные фотокарточки того, что
 * планировщик расставит по дням, и две кнопки.
 *
 * Дизайн-язык взят у work-with-us: те же переменные (--ink, --sand, --line),
 * тонкий крупный заголовок с градиентной второй строкой, круговой бейдж,
 * пилюли кнопок. CSS скоуплен под .sbp-hero, чтобы не воевать со стилями
 * самого приложения.
 *
 * Переводы РУЧНЫЕ и лежат в COPY: ключ — русская строка, как того требует
 * механизм планировщика (элементы с data-t, T(src) ищет по русскому тексту).
 * Записываются в ai-planner/js/i18n.js в объекты en/es/fr/zh.
 *
 * Идемпотентно: повторный запуск заменяет блок, а не добавляет второй.
 *
 * Запуск идёт из scripts/build.mjs.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const INDEX = path.join(ROOT, "ai-planner/index.html");
const I18N = path.join(ROOT, "ai-planner/js/i18n.js");

const MARK_OPEN = "<!-- sbp-hero -->";
const MARK_CLOSE = "<!-- /sbp-hero -->";

/* Русский — исходный язык ключей. Правь строки здесь, не в разметке. */
const COPY = {
  kicker: "SB Excursions · Бали · Планировщик поездки",
  h1a: "Ваша неделя на Бали.",
  h1b: "Собирается за минуту.",
  sub: "Укажите даты, район проживания и что вам интересно. Маршрут выстроится по дням прямо на карте острова — с реальными турами, ценами напрямую и свободными днями там, где вы захотите отдохнуть.",
  ctaMain: "Собрать мою неделю",
  ctaGhost: "Как это работает",
  f1: "28 туров в подборе",
  f1s: "Всё, что мы возим сами — от трансфера за $15 до китовых акул",
  f2: "Цены напрямую",
  f2s: "Без комиссии площадок и без предоплаты: бронь подтверждается в WhatsApp",
  f3: "Свободные дни остаются свободными",
  f3s: "Планировщик не забивает каждое утро — он оставляет место на ничего",

  ftTrust: "Компания и доверие",
  ftPrivacy: "Политика конфиденциальности",
  ftSitemap: "Карта сайта",
  ftRefund: "Условия возврата",
  ftTerms: "Пользовательское соглашение",
  ftAbout: "О SB Excursions",
  ftFaq: "Вопросы и ответы",
  ftContacts: "Контакты",
  ftOffice: "Офис на Бали",
  ftHours: "Поддержка ежедневно 7:00–22:00",
  ftTours: "Популярные туры",
  ftWrite: "Написать нам",
  ftRights: "© 2021–2026 SB Excursions. Сделано для приключений на Бали",
};

const TRANSLATIONS = {
  en: {
    [COPY.kicker]: "SB Excursions · Bali · Trip planner",
    [COPY.h1a]: "Your week in Bali.",
    [COPY.h1b]: "Built in a minute.",
    [COPY.sub]:
      "Set your dates, the area you are staying in and what you are into. The route lays itself out day by day on the island map — real tours, direct prices, and free days left where you want to rest.",
    [COPY.ctaMain]: "Build my week",
    [COPY.ctaGhost]: "How it works",
    [COPY.f1]: "28 tours to draw from",
    [COPY.f1s]: "Everything we run ourselves — from a $15 transfer to whale sharks",
    [COPY.f2]: "Direct prices",
    [COPY.f2s]: "No platform commission and no prepayment: bookings are confirmed on WhatsApp",
    [COPY.f3]: "Free days stay free",
    [COPY.f3s]: "The planner does not fill every morning — it leaves room for nothing at all",
    [COPY.ftTrust]: "Company & Trust",
    [COPY.ftPrivacy]: "Privacy Policy",
    [COPY.ftSitemap]: "SiteMap",
    [COPY.ftRefund]: "Refund Policy",
    [COPY.ftTerms]: "Terms & Conditions",
    [COPY.ftAbout]: "About SB Excursions",
    [COPY.ftFaq]: "FAQ",
    [COPY.ftContacts]: "Contacts & Location",
    [COPY.ftOffice]: "Bali Office",
    [COPY.ftHours]: "Daily support 7:00–22:00",
    [COPY.ftTours]: "Our Top Tours",
    [COPY.ftWrite]: "Message us",
    [COPY.ftRights]: "© 2021–2026 SB Excursions. Crafted for Bali adventures",
  },
  es: {
    [COPY.kicker]: "SB Excursions · Bali · Planificador de viaje",
    [COPY.h1a]: "Tu semana en Bali.",
    [COPY.h1b]: "Lista en un minuto.",
    [COPY.sub]:
      "Indica tus fechas, la zona donde te alojas y lo que te interesa. La ruta se traza día a día sobre el mapa de la isla: tours reales, precios directos y días libres donde quieras descansar.",
    [COPY.ctaMain]: "Crear mi semana",
    [COPY.ctaGhost]: "Cómo funciona",
    [COPY.f1]: "28 tours entre los que elegir",
    [COPY.f1s]: "Todo lo que operamos nosotros: desde un traslado de $15 hasta tiburones ballena",
    [COPY.f2]: "Precios directos",
    [COPY.f2s]: "Sin comisión de plataformas y sin pago por adelantado: se confirma por WhatsApp",
    [COPY.f3]: "Los días libres siguen libres",
    [COPY.f3s]: "El planificador no llena todas las mañanas: deja sitio para no hacer nada",
    [COPY.ftTrust]: "Empresa y confianza",
    [COPY.ftPrivacy]: "Política de privacidad",
    [COPY.ftSitemap]: "Mapa del sitio",
    [COPY.ftRefund]: "Política de reembolso",
    [COPY.ftTerms]: "Términos y condiciones",
    [COPY.ftAbout]: "Sobre SB Excursions",
    [COPY.ftFaq]: "Preguntas frecuentes",
    [COPY.ftContacts]: "Contacto y ubicación",
    [COPY.ftOffice]: "Oficina en Bali",
    [COPY.ftHours]: "Atención todos los días 7:00–22:00",
    [COPY.ftTours]: "Tours más populares",
    [COPY.ftWrite]: "Escríbenos",
    [COPY.ftRights]: "© 2021–2026 SB Excursions. Hecho para aventuras en Bali",
  },
  fr: {
    [COPY.kicker]: "SB Excursions · Bali · Planificateur de voyage",
    [COPY.h1a]: "Votre semaine à Bali.",
    [COPY.h1b]: "Prête en une minute.",
    [COPY.sub]:
      "Indiquez vos dates, le quartier où vous logez et ce qui vous intéresse. L'itinéraire se construit jour après jour sur la carte de l'île : de vrais circuits, des prix directs et des journées libres là où vous voulez souffler.",
    [COPY.ctaMain]: "Composer ma semaine",
    [COPY.ctaGhost]: "Comment ça marche",
    [COPY.f1]: "28 circuits au choix",
    [COPY.f1s]: "Tout ce que nous opérons nous-mêmes, du transfert à 15 $ aux requins-baleines",
    [COPY.f2]: "Prix directs",
    [COPY.f2s]: "Sans commission de plateforme ni acompte : la réservation se confirme sur WhatsApp",
    [COPY.f3]: "Les journées libres restent libres",
    [COPY.f3s]: "Le planificateur ne remplit pas chaque matin : il laisse de la place pour rien",
    [COPY.ftTrust]: "Société et confiance",
    [COPY.ftPrivacy]: "Politique de confidentialité",
    [COPY.ftSitemap]: "Plan du site",
    [COPY.ftRefund]: "Politique de remboursement",
    [COPY.ftTerms]: "Conditions générales",
    [COPY.ftAbout]: "À propos de SB Excursions",
    [COPY.ftFaq]: "Questions fréquentes",
    [COPY.ftContacts]: "Contact et adresse",
    [COPY.ftOffice]: "Bureau à Bali",
    [COPY.ftHours]: "Assistance tous les jours 7h00–22h00",
    [COPY.ftTours]: "Circuits les plus demandés",
    [COPY.ftWrite]: "Écrivez-nous",
    [COPY.ftRights]: "© 2021–2026 SB Excursions. Conçu pour les aventures à Bali",
  },
  zh: {
    [COPY.kicker]: "SB Excursions · 巴厘岛 · 行程规划器",
    [COPY.h1a]: "你的巴厘岛一周。",
    [COPY.h1b]: "一分钟就能排好。",
    [COPY.sub]:
      "填写日期、住宿区域和兴趣，行程就会在岛屿地图上逐日展开——真实的路线、直接的价格，还有你想休息时留出的空闲日。",
    [COPY.ctaMain]: "生成我的一周",
    [COPY.ctaGhost]: "如何运作",
    [COPY.f1]: "28 条路线可选",
    [COPY.f1s]: "全部由我们自己运营——从 15 美元的接送到鲸鲨浮潜",
    [COPY.f2]: "直接价格",
    [COPY.f2s]: "没有平台佣金，也无需预付：预订在 WhatsApp 上确认",
    [COPY.f3]: "空闲日就留作空闲",
    [COPY.f3s]: "规划器不会占满每个早晨，它会留出什么都不做的时间",
    [COPY.ftTrust]: "公司与信任",
    [COPY.ftPrivacy]: "隐私政策",
    [COPY.ftSitemap]: "网站地图",
    [COPY.ftRefund]: "退款政策",
    [COPY.ftTerms]: "条款与条件",
    [COPY.ftAbout]: "关于 SB Excursions",
    [COPY.ftFaq]: "常见问题",
    [COPY.ftContacts]: "联系方式与地址",
    [COPY.ftOffice]: "巴厘岛办公室",
    [COPY.ftHours]: "每日客服 7:00–22:00",
    [COPY.ftTours]: "热门路线",
    [COPY.ftWrite]: "联系我们",
    [COPY.ftRights]: "© 2021–2026 SB Excursions. 为巴厘岛的旅程而做",
  },
};

/* Фотографии — то, что планировщик реально расставляет по дням. */
const PHOTOS = [
  ["c1", "/images/places/kelingking-beach-t-rex-cliff.jpg", "eager"],
  ["c2", "/images/places/manta-ray-snorkeling.jpg", "lazy"],
  ["c3", "/images/places/mount-batur-sunrise-trek.jpg", "lazy"],
  ["c4", "/images/places/ayung-river-rafting.jpg", "lazy"],
  ["c5", "/images/places/tegalalang-rice-terraces.jpg", "lazy"],
];

const CSS = `
<style id="sbp-hero-style">
.sbp-hero{
  --ink:#141412; --sand:#fff; --muted:#75716a; --line:rgba(20,20,18,.12);
  position:relative;isolation:isolate;overflow:clip;
  padding:clamp(56px,8vw,104px) 0 clamp(48px,6vw,80px);
  background:var(--sand);color:var(--ink);
  font-family:'Manrope','Cina GEO','TildaSans',-apple-system,BlinkMacSystemFont,Arial,sans-serif
}
.sbp-hero__wrap{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:1}
.sbp-hero__kicker{
  margin:0 0 22px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted);font-weight:600
}
.sbp-hero h1.sbp-hero__title{
  margin:0;font-weight:300 !important;letter-spacing:-.035em;line-height:.98;
  font-size:clamp(38px,6.2vw,86px)
}
.sbp-hero__title span{display:block}
.sbp-hero__accent{
  font-weight:600;
  background-image:linear-gradient(100deg,#0284c7 0%,#38bdf8 22%,#1d4ed8 48%,#22d3ee 74%,#0284c7 100%);
  background-size:300% 100%;-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:#0ea5e9;animation:sbp-shift 7s linear infinite
}
@media (min-width:1101px){
  .sbp-hero__kicker,.sbp-hero__title,.sbp-hero__sub,.sbp-hero__cta{max-width:63%}
}
.sbp-hero__sub{max-width:54ch;margin:30px 0 0;font-size:clamp(16px,1.6vw,20px);line-height:1.6;color:#3c3a35}
.sbp-hero__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px}
.sbp-hero__btn{
  display:inline-flex;align-items:center;gap:10px;padding:16px 30px;border-radius:999px;
  font-size:16px;font-weight:600;text-decoration:none;cursor:pointer;border:0;
  transition:transform .25s ease,box-shadow .25s ease,background .25s ease
}
.sbp-hero__btn--dark{background:#161512;color:#fff}
.sbp-hero__btn--dark:hover{transform:translateY(-2px);box-shadow:0 18px 34px -18px rgba(20,20,18,.6)}
.sbp-hero__btn--ghost{border:1.5px solid var(--line);color:var(--ink);background:transparent}
.sbp-hero__btn--ghost:hover{border-color:rgba(20,20,18,.32)}

.sbp-hero__facts{
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;
  margin:clamp(48px,6vw,76px) 0 0;padding-top:30px;border-top:1px solid var(--line)
}
.sbp-hero__fact b{display:block;font-size:17px;font-weight:600;margin-bottom:7px;letter-spacing:-.01em}
.sbp-hero__fact span{display:block;font-size:14px;line-height:1.55;color:var(--muted)}

.sbp-hero__chips{position:absolute;inset:0;pointer-events:none;z-index:0}
.sbp-hero__chip{
  position:absolute;border-radius:18px;overflow:hidden;
  box-shadow:0 24px 60px -24px rgba(20,20,18,.45);
  animation:sbp-float 9s ease-in-out infinite
}
.sbp-hero__chip img{width:100%;height:100%;object-fit:cover;display:block}
.sbp-hero__chip::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.sbp-hero__chip.c1{width:min(20vw,236px);aspect-ratio:3/4;top:9%;right:5%;rotate:5deg;animation-delay:-1s}
.sbp-hero__chip.c2{width:min(16vw,190px);aspect-ratio:4/3;top:47%;right:20%;rotate:-6deg;animation-delay:-3.5s}
.sbp-hero__chip.c3{width:min(14vw,170px);aspect-ratio:1/1;bottom:16%;right:4%;rotate:3deg;animation-delay:-6s}
.sbp-hero__chip.c4{width:min(12vw,142px);aspect-ratio:3/4;bottom:20%;left:1%;rotate:-8deg;animation-delay:-2s}
.sbp-hero__chip.c5{width:min(10vw,124px);aspect-ratio:1/1;top:13%;left:-1%;rotate:7deg;animation-delay:-5s}


/* ── Футер: содержимое родного подвала сайта, своей вёрсткой ──────────
   Тильдовский футер требует её CSS/JS-стек с чужого CDN — сотни килобайт
   на самодостаточную страницу ради подвала. Шапку планировщик тоже рисует
   сам, так что футер собран в том же ключе.                            */
.sbp-foot{
  --ink:#141412; --muted:#75716a; --line:rgba(20,20,18,.12);
  border-top:1px solid var(--line);background:#fbfaf8;color:var(--ink);
  padding:clamp(40px,5vw,64px) 0 28px;
  font-family:'Manrope','Cina GEO','TildaSans',-apple-system,BlinkMacSystemFont,Arial,sans-serif
}
.sbp-foot__wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.sbp-foot__cols{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
.sbp-foot__col h3{margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.sbp-foot__col ul{margin:0;padding:0;list-style:none;display:grid;gap:9px}
.sbp-foot__col a{color:var(--ink);text-decoration:none;font-size:14.5px;line-height:1.45}
.sbp-foot__col a:hover{text-decoration:underline}
.sbp-foot__col p{margin:0 0 9px;font-size:14.5px;line-height:1.45;color:var(--muted)}
.sbp-foot__col p b{display:block;color:var(--ink);font-weight:600;margin-bottom:2px}
.sbp-foot__bottom{
  display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;align-items:center;
  margin-top:clamp(32px,4vw,48px);padding-top:20px;border-top:1px solid var(--line);
  font-size:13px;color:var(--muted)
}
@media (max-width:900px){.sbp-foot__cols{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}}
@media (max-width:560px){.sbp-foot__cols{grid-template-columns:1fr}}

@keyframes sbp-float{0%,100%{translate:0 0}50%{translate:0 -12px}}
@keyframes sbp-shift{to{background-position:300% 0}}

@media (max-width:1100px){
  .sbp-hero__chip.c2,.sbp-hero__chip.c5{display:none}
}
@media (max-width:820px){
  .sbp-hero{padding-bottom:clamp(240px,52vw,340px)}
  .sbp-hero__facts{grid-template-columns:1fr;gap:20px}
  .sbp-hero__chip.c1{width:36vw;top:auto;bottom:4%;right:4%}
  .sbp-hero__chip.c3{width:28vw;bottom:7%;right:44%}
  .sbp-hero__chip.c4{width:26vw;bottom:3%;left:3%}
  .sbp-hero__btn{flex:1 1 100%;justify-content:center}
}
@media (prefers-reduced-motion:reduce){
  .sbp-hero__chip,.sbp-hero__accent{animation:none !important}
  .sbp-hero__btn{transition:none}
  .sbp-hero__btn--dark:hover{transform:none}
}
</style>`;

function renderHero() {
  const chips = PHOTOS.map(
    ([cls, src, loading]) =>
      `      <div class="sbp-hero__chip ${cls}"><img src="${src}" alt="" loading="${loading}" decoding="async"></div>`,
  ).join("\n");

  return `${MARK_OPEN}
${CSS}
<section class="sbp-hero">
  <div class="sbp-hero__chips" aria-hidden="true">
${chips}
  </div>
  <div class="sbp-hero__wrap">
    <p class="sbp-hero__kicker" data-t>${COPY.kicker}</p>
    <h1 class="sbp-hero__title">
      <span data-t>${COPY.h1a}</span>
      <span class="sbp-hero__accent" data-t>${COPY.h1b}</span>
    </h1>
    <p class="sbp-hero__sub" data-t>${COPY.sub}</p>
    <div class="sbp-hero__cta">
      <a class="sbp-hero__btn sbp-hero__btn--dark" href="#sbp-start" data-t>${COPY.ctaMain}</a>
      <a class="sbp-hero__btn sbp-hero__btn--ghost" href="#sbp-facts" data-t>${COPY.ctaGhost}</a>
    </div>
    <div class="sbp-hero__facts" id="sbp-facts">
      <div class="sbp-hero__fact"><b data-t>${COPY.f1}</b><span data-t>${COPY.f1s}</span></div>
      <div class="sbp-hero__fact"><b data-t>${COPY.f2}</b><span data-t>${COPY.f2s}</span></div>
      <div class="sbp-hero__fact"><b data-t>${COPY.f3}</b><span data-t>${COPY.f3s}</span></div>
    </div>
  </div>
</section>
${MARK_CLOSE}
`;
}

/* Ссылки внутри сайта уходят с языком страницы. Пути шаблонные: {L}
   подменяется на лету инлайновым скриптом, потому что язык планировщик
   узнаёт только из адреса. */
function renderFooter() {
  const li = (href, key) => `        <li><a href="${href}" data-t>${COPY[key]}</a></li>`;
  const wa = "https://wa.me/6285333685020?text=" +
    encodeURIComponent("Hello! I'm interested in your excursions. Could you help me with the booking details?").replace(/'/g, "%27");

  return `
<footer class="sbp-foot">
  <div class="sbp-foot__wrap">
    <div class="sbp-foot__cols">
      <div class="sbp-foot__col">
        <h3 data-t>${COPY.ftTrust}</h3>
        <ul>
${li("/bali/{L}/privacy-policy", "ftPrivacy")}
${li("/sitemap.xml", "ftSitemap")}
${li("/bali/{L}/terms#refund", "ftRefund")}
${li("/bali/{L}/terms", "ftTerms")}
${li("/bali/{L}/about", "ftAbout")}
${li("/bali/{L}/faq", "ftFaq")}
        </ul>
      </div>
      <div class="sbp-foot__col">
        <h3 data-t>${COPY.ftContacts}</h3>
        <p><b data-t>${COPY.ftOffice}</b>Jl. Petitenget, Seminyak, Bali, Indonesia</p>
        <p data-t>${COPY.ftHours}</p>
        <ul>
          <li><a href="mailto:info@sbexcursion.com">info@sbexcursion.com</a></li>
          <li><a href="tel:+6285333685020">+62 853 3368 5020</a></li>
        </ul>
      </div>
      <div class="sbp-foot__col">
        <h3 data-t>${COPY.ftTours}</h3>
        <ul>
          <li><a href="/bali/{L}/tours/nusa-penida-manta-rays-point">Manta Rays Tour</a></li>
          <li><a href="/bali/{L}/tours/ubud-highlights-tour">Ubud Highlights</a></li>
          <li><a href="/bali/{L}/tours/mount-batur-sunrise-hike">Mount Batur Hike</a></li>
          <li><a href="/bali/{L}/tours/nusa-penida-west-tour">Nusa Penida West</a></li>
        </ul>
      </div>
      <div class="sbp-foot__col">
        <h3 data-t>${COPY.ftWrite}</h3>
        <ul>
          <li><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="https://t.me/SurfBase" target="_blank" rel="noopener">Telegram</a></li>
          <li><a href="https://www.instagram.com/dubai_sb_excursions" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="sbp-foot__bottom">
      <span data-t>${COPY.ftRights}</span>
      <span>Jl. Petitenget, Seminyak, Bali</span>
    </div>
  </div>
</footer>
<script>
  /* Подставляем язык в шаблонные пути футера. Значение берём из адреса —
     тем же способом, что и сам планировщик. */
  (function () {
    var m = location.search.match(/[?&]lang=(en|ru|zh|es|fr)(?:&|$)/);
    var lang = m ? m[1] : "ru";
    document.querySelectorAll('.sbp-foot a[href*="{L}"]').forEach(function (a) {
      a.setAttribute("href", a.getAttribute("href").replace("{L}", lang));
    });
  })();
</script>`;
}

/* ─── index.html ─────────────────────────────────────────────────────── */

let html = await fs.readFile(INDEX, "utf8");

// Убираем прошлую версию блока целиком — иначе повторный запуск удвоит шапку.
const between = new RegExp(`${MARK_OPEN}[\\s\\S]*?${MARK_CLOSE}\\s*`, "g");
html = html.replace(between, "");

// На странице должен остаться один h1. Заголовок панели уступает его шапке.
// Единственный h1 на странице — заголовок шапки; панель уступает ему уровень.
html = html.replace(/<h1 (class="panel-title"[^>]*)>([\s\S]*?)<\/h1>/, "<h2 $1>$2</h2>");

// Якорь ищем регуляркой: после первой вставки у <main> появляется id, и
// поиск по точной строке со второго прогона бы не нашёл ничего.
const anchor = /<main class="app"[^>]*>/;
if (!anchor.test(html)) throw new Error('не нашёл <main class="app"> в ai-planner/index.html');
html = html.replace(anchor, `${renderHero()}\n  <main class="app" id="sbp-start">`);

/* Границей служит собственный инлайновый скрипт футера. Ловить до
   </body> нельзя: футер стоит ВЫШЕ скриптов планировщика, и жадный
   хвост сносил их вместе с ним на втором прогоне. */
html = html.replace(/<footer class="sbp-foot">[\s\S]*?<\/footer>\s*<script>[\s\S]*?<\/script>\s*/, "");
/* Футер идёт ПЕРЕД скриптами планировщика, а не перед </body>: они
   выполняются синхронно, и разметки после них в DOM ещё нет — перевод
   по data-t просто не находил футер. */
const scriptsAt = html.search(/[ \t]*<script src="\/ai-planner\/vendor/);
if (scriptsAt < 0) throw new Error("не нашёл блок скриптов планировщика");
html = html.slice(0, scriptsAt) + renderFooter() + "\n\n" + html.slice(scriptsAt);

await fs.writeFile(INDEX, html);

/* ─── i18n.js ────────────────────────────────────────────────────────── */

const i18nSrc = await fs.readFile(I18N, "utf8");

/* Разбираем словарь целиком, а не режем строкой: у последнего языка нет
   закрывающей последовательности «},"», и поиск по границам молча добавлял
   его строки заново на каждом прогоне. */
const dict = new Function(`${i18nSrc}; return SB_I18N;`)();
let added = 0;

for (const [lang, pairs] of Object.entries(TRANSLATIONS)) {
  if (!dict[lang]) throw new Error(`не нашёл словарь ${lang} в i18n.js`);
  for (const [ru, translated] of Object.entries(pairs)) {
    if (dict[lang][ru] === translated) continue;
    dict[lang][ru] = translated;
    added++;
  }
}

const i18nOut = `/* SB Excursions — AI-планировщик Бали · js/i18n.js (переводы, автосборка) */\nvar SB_I18N = ${JSON.stringify(dict)};\n`;
if (added) await fs.writeFile(I18N, i18nOut);

/* Версия в ?v= привязана к содержимому словаря. Раньше она была вбита
   руками, и после правки переводов браузер продолжал отдавать старый файл
   из кэша: на проде шапка оставалась русской при ?lang=en. */
const stamp = crypto.createHash("sha1").update(i18nOut).digest("hex").slice(0, 8);
html = (await fs.readFile(INDEX, "utf8")).replace(/js\/i18n\.js\?v=[0-9a-z]+/g, `js/i18n.js?v=${stamp}`);
await fs.writeFile(INDEX, html);

console.log(JSON.stringify({ "шапка вставлена": true, "фото в шапке": PHOTOS.length, "строк перевода добавлено": added }, null, 2));

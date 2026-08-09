/*
 * Партнёрская страница Work With Us → /work-with-us (work-with-us.html).
 *
 * Страница, которую владелец отправляет потенциальным партнёрам: виллам,
 * сёрф-школам, водителям, блогерам. Вся суть сделки на одном экране:
 * фикса $3–$10 за каждого приведённого гостя, оплата после тура,
 * никаких договоров — трекинг по имени партнёра в WhatsApp.
 *
 * Хедер и футер — родные, с туровых страниц: тянутся из донора при каждой
 * сборке через sb-tilda-chrome.mjs. Контент — дизайнерский лендинг
 * с плавающими фото, marquee и reveal-анимациями; весь его CSS скоупится
 * под .sb-wwu, чтобы не воевать со стилями Тильды.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildChromedPage } from "./sb-tilda-chrome.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";
const WA_TEXT = "Hello! I want to join the SB Excursions partner program.";
const WA = `https://wa.me/6285333685020?text=${encodeURIComponent(WA_TEXT)}`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/work-with-us#webpage`,
      url: `${SITE}/work-with-us`,
      name: "Work With Us — SB Excursions Partner Program",
      description: "A flat $3–$10 referral fee for every booking you bring to SB Excursions Bali tours.",
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["How and when do I get paid?", "Right after your guest's tour day — a flat $3–$10 per booking depending on the tour, sent however suits you: cash on Bali or a transfer. No minimum payout, no waiting for the end of the month."],
        ["What counts as a referred booking?", "Any tour booked on WhatsApp where the guest mentions your partner name. That's the whole tracking system — no links to install, no dashboards to check."],
        ["Do I need to sign anything?", "No. This is a simple named-referral arrangement over WhatsApp. You message us once, get your partner name, and start recommending."],
        ["Is there a cap on referrals?", "No cap and no expiry. Ten bookings in a week means ten fees in a week — group or solo, every booking counts."],
        ["Can I promote the tours online?", "Yes — we'll send you a photo pack and short tour descriptions for stories, chats and group posts. The only rule: no spam and no misleading claims about prices or inclusions."],
      ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

const styleBlock = `<link rel="stylesheet" href="/css/fonts-manrope.css">
<style id="sb-wwu-css">
.sb-wwu{
  --sand:#ffffff;--ink:#141412;--muted:#75716a;--line:rgba(20,20,18,.12);
  --accent:#0ea5e9;--dark:#161512;--sand-on-dark:#ececec;
  font-family:'Manrope','TildaSans',Arial,sans-serif;color:var(--ink);line-height:1.55;
  background:var(--sand);overflow:clip;
}
/* fonts-cinageo.css общесайтово ставит html h1-h4{font-weight:400!important} —
   возвращаем дисплейные веса (этот блок в каскаде позже и побеждает);
   фон body сайтовый css и так делает белым — как и просил владелец */
html body{background-color:#ffffff!important}
html .sb-wwu .hero h1,html .sb-wwu h2{font-weight:300!important}
html .sb-wwu .card h3{font-weight:600!important}
html .sb-wwu .steps h3{font-weight:500!important}
html{scroll-behavior:smooth}
.sb-wwu *{box-sizing:border-box}
.sb-wwu img{max-width:100%;display:block}
.sb-wwu a{color:inherit}
/* тильдовское #allrecords a красит все ссылки в фирменный оранжевый —
   для контента этой страницы возвращаем наследование и свои цвета кнопок */
#allrecords .sb-wwu a{color:inherit}
#allrecords .sb-wwu .btn-dark{color:var(--sand)}
#allrecords .sb-wwu .btn-dark:hover{color:#fff}
#allrecords .sb-wwu .deal .fine a{color:#9edcff}
.sb-wwu .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.sb-wwu section{padding:clamp(70px,10vw,130px) 0;margin:0}

/* ---------- hero ---------- */
/* isolation: без своего stacking context фото с z-index:-1 провалились бы под фон */
.sb-wwu .hero{position:relative;isolation:isolate;min-height:92svh;display:flex;flex-direction:column;justify-content:center;padding:150px 0 90px;overflow:clip}
.sb-wwu .kicker{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 22px}
.sb-wwu .hero h1{font-size:clamp(54px,10.5vw,148px);line-height:.96;letter-spacing:-.05em;font-weight:300;margin:0;text-wrap:balance;font-family:inherit}
.sb-wwu .hero h1 em{font-style:normal;font-weight:600;color:var(--accent)}
.sb-wwu .hero .sub{max-width:52ch;font-size:clamp(16px,1.6vw,20px);margin:30px 0 0;color:#3c3a35}
.sb-wwu .hero .sub strong{font-weight:700}
.sb-wwu .cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px}
.sb-wwu .btn{display:inline-flex;align-items:center;gap:10px;text-decoration:none;border-radius:999px;padding:16px 30px;font-size:16px;font-weight:600;transition:transform .25s ease,box-shadow .25s ease,background .25s ease}
.sb-wwu .btn-dark{background:var(--ink);color:var(--sand)}
.sb-wwu .btn-dark:hover{background:linear-gradient(100deg,#0284c7,#38bdf8,#1d4ed8,#22d3ee,#0284c7);background-size:250% 100%;animation:sbwwu-shift 5s linear infinite;color:#fff;transform:translateY(-2px);box-shadow:0 14px 30px -14px rgba(14,165,233,.6)}
.sb-wwu .btn-ghost{border:1.5px solid var(--line);color:var(--ink)}
.sb-wwu .btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}

/* плавающие фото */
.sb-wwu .chips{position:absolute;inset:0;pointer-events:none;z-index:-1}
.sb-wwu .chip{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px -24px rgba(20,20,18,.45);will-change:transform;animation:sbwwu-float 9s ease-in-out infinite}
.sb-wwu .chip img{width:100%;height:100%;object-fit:cover}
.sb-wwu .chip::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.sb-wwu .chip.c1{width:min(21vw,250px);aspect-ratio:3/4;top:12%;right:6%;rotate:5deg;animation-delay:-1s}
.sb-wwu .chip.c2{width:min(17vw,200px);aspect-ratio:4/3;top:48%;right:20%;rotate:-6deg;animation-delay:-3.5s}
.sb-wwu .chip.c3{width:min(15vw,180px);aspect-ratio:1/1;bottom:8%;right:5%;rotate:3deg;animation-delay:-6s}
.sb-wwu .chip.c4{width:min(13vw,150px);aspect-ratio:3/4;bottom:12%;left:2%;rotate:-8deg;animation-delay:-2s}
.sb-wwu .chip.c5{width:min(11vw,130px);aspect-ratio:1/1;top:16%;left:-1%;rotate:7deg;animation-delay:-5s}
@keyframes sbwwu-float{0%,100%{translate:0 0}50%{translate:0 -16px}}
@media(max-width:760px){
  /* на мобиле фото уходят в «полку» под кнопками, а не поверх текста */
  .sb-wwu .hero{padding-bottom:52vw;min-height:auto}
  .sb-wwu .chip.c2,.sb-wwu .chip.c5{display:none}
  .sb-wwu .chip.c1{width:34vw;top:auto;bottom:3%;right:4%}
  .sb-wwu .chip.c3{width:27vw;bottom:6%;right:40%}
  .sb-wwu .chip.c4{width:26vw;bottom:2%;left:3%}
}
/* мобильный топбар: на туровых страницах белое лого лежит на тёмном фото,
   здесь фон светлый — даём топбару тот же тёмный фон, что и при скролле */
@media(max-width:980px){
  #nav2128776473 .t451__container,#nav2128776473 .t451__container__bg{background:#333333!important}
}

/* вращающийся бейдж с фиксой */
.sb-wwu .badge{position:absolute;z-index:2;top:19%;right:28%;width:150px;height:150px;pointer-events:none}
.sb-wwu .badge svg{width:100%;height:100%;animation:sbwwu-spin 22s linear infinite}
.sb-wwu .badge .mid{position:absolute;inset:0;display:grid;place-items:center;font-weight:700;font-size:26px;letter-spacing:-.03em;color:var(--accent)}
@keyframes sbwwu-spin{to{rotate:360deg}}
@media(max-width:1000px){.sb-wwu .badge{display:none}}

/* ---------- бегущая строка ---------- */
.sb-wwu .marquee{border-block:1px solid var(--line);padding:18px 0;overflow:clip;background:var(--sand)}
.sb-wwu .marquee .track{display:flex;width:max-content;animation:sbwwu-slide 26s linear infinite}
.sb-wwu .marquee span{font-size:clamp(20px,3vw,34px);font-weight:300;letter-spacing:-.03em;white-space:nowrap;padding-right:18px}
.sb-wwu .marquee b{color:var(--accent);font-weight:400;padding-right:18px}
@keyframes sbwwu-slide{to{transform:translateX(-50%)}}

/* ---------- секции ---------- */
.sb-wwu .eyebrow{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 18px}
.sb-wwu h2{font-size:clamp(36px,5.5vw,72px);font-weight:300;letter-spacing:-.045em;line-height:1.02;margin:0 0 26px;text-wrap:balance;font-family:inherit}
.sb-wwu h2 em{font-style:normal;color:var(--accent);font-weight:500}

/* сделка — тёмная секция */
.sb-wwu .deal{background:var(--dark);color:var(--sand-on-dark)}
.sb-wwu .deal h2{color:#fff}
.sb-wwu .deal .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.14);border-radius:20px;overflow:hidden;margin-top:48px}
.sb-wwu .deal .cell{background:var(--dark);padding:34px 28px}
.sb-wwu .deal .num{font-size:clamp(40px,4.5vw,62px);font-weight:300;letter-spacing:-.04em;line-height:1;color:#fff}
.sb-wwu .deal .num b{color:var(--accent);font-weight:500}
.sb-wwu .deal .cell p{margin:14px 0 0;font-size:15px;color:rgba(255,255,255,.72)}
.sb-wwu .tiers{margin-top:46px;border:1px solid rgba(255,255,255,.16);border-radius:20px;overflow:hidden}
.sb-wwu .tier{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:baseline;padding:22px 28px;border-top:1px solid rgba(255,255,255,.12)}
.sb-wwu .tier:first-child{border-top:0}
.sb-wwu .tier .t-name{font-size:clamp(18px,2.2vw,26px);font-weight:400;letter-spacing:-.02em;color:#fff;font-family:inherit}
.sb-wwu .tier .t-name small{display:block;font-size:14px;color:rgba(255,255,255,.6);margin-top:4px;font-weight:400}
.sb-wwu .tier .t-fee{font-size:clamp(26px,3.4vw,44px);font-weight:500;letter-spacing:-.03em;color:var(--accent);white-space:nowrap}
.sb-wwu .deal .fine{margin:18px 4px 0;font-size:14px;color:rgba(255,255,255,.55)}
.sb-wwu .deal .fine a{color:#9edcff}

/* для кого */
.sb-wwu .aud .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin-top:44px}
.sb-wwu .card{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;transition:transform .35s ease,box-shadow .35s ease}
.sb-wwu .card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -30px rgba(20,20,18,.35)}
.sb-wwu .card img{height:170px;width:100%;object-fit:cover}
.sb-wwu .card .pad{padding:22px 22px 26px}
.sb-wwu .card h3{margin:0;font-size:21px;font-weight:600;letter-spacing:-.02em;font-family:inherit}
.sb-wwu .card p{margin:10px 0 0;font-size:15px;color:#4b4841}
.sb-wwu .card .idx{font-size:12px;font-weight:700;letter-spacing:.18em;color:var(--accent);display:block;margin-bottom:8px}

/* шаги */
.sb-wwu .steps ol{list-style:none;margin:44px 0 0;padding:0;counter-reset:st}
.sb-wwu .steps li{counter-increment:st;display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:start;padding:34px 0;border-top:1px solid var(--line)}
.sb-wwu .steps li::before{content:"0" counter(st);font-size:clamp(40px,6vw,84px);font-weight:200;letter-spacing:-.05em;line-height:.9;color:var(--accent)}
.sb-wwu .steps h3{margin:4px 0 8px;font-size:clamp(21px,2.6vw,30px);font-weight:500;letter-spacing:-.02em;font-family:inherit}
.sb-wwu .steps p{margin:0;max-width:62ch;font-size:16px;color:#3c3a35}
.sb-wwu .gets{display:flex;flex-wrap:wrap;gap:10px;margin-top:34px}
.sb-wwu .gets span{background:#fff;border:1px solid var(--line);border-radius:999px;padding:10px 18px;font-size:14.5px;font-weight:600}
.sb-wwu .gets a{text-decoration:underline;text-underline-offset:3px}

/* почему гости соглашаются */
.sb-wwu .why{background:#fafafa}
.sb-wwu .why ul{list-style:none;margin:40px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.sb-wwu .why li{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px;font-size:15.5px}
.sb-wwu .why li b{display:block;font-size:19px;letter-spacing:-.02em;margin-bottom:6px;font-weight:600}

/* вопросы */
.sb-wwu .faq details{border-top:1px solid var(--line);padding:6px 0}
.sb-wwu .faq details:last-of-type{border-bottom:1px solid var(--line)}
.sb-wwu .faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 0;font-size:clamp(18px,2.2vw,24px);font-weight:500;letter-spacing:-.02em}
.sb-wwu .faq summary::-webkit-details-marker{display:none}
.sb-wwu .faq summary::after{content:"+";font-size:30px;font-weight:200;color:var(--accent);transition:rotate .3s ease;flex:none}
.sb-wwu .faq details[open] summary::after{rotate:45deg}
.sb-wwu .faq .a{max-width:68ch;padding:0 0 22px;font-size:16px;color:#3c3a35;margin:0}

/* финальный призыв */
.sb-wwu .final{text-align:center}
.sb-wwu .final h2{font-size:clamp(40px,7vw,96px)}
.sb-wwu .final .btn{font-size:18px;padding:20px 42px}
.sb-wwu .final .note{margin:18px 0 0;font-size:14.5px;color:var(--muted)}

/* появление при прокрутке */
.js .sb-wwu .rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.6,.2,1),transform .8s cubic-bezier(.2,.6,.2,1)}
.js .sb-wwu .rv.in{opacity:1;transform:none}

/* акцентный текст: переливающийся голубой градиент внутри букв.
   color остаётся запасным цветом для браузеров без background-clip:text */
.sb-wwu .hero h1 em,.sb-wwu h2 em,.sb-wwu .badge .mid,.sb-wwu .deal .num b,.sb-wwu .tier .t-fee,.sb-wwu .card .idx,.sb-wwu .marquee b,.sb-wwu .faq summary::after,.sb-wwu .steps li::before{
  background-image:linear-gradient(100deg,#0284c7 0%,#38bdf8 22%,#1d4ed8 48%,#22d3ee 74%,#0284c7 100%);
  background-size:300% 100%;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:#0ea5e9;
  animation:sbwwu-shift 7s linear infinite;
}
@keyframes sbwwu-shift{to{background-position:300% 50%}}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .sb-wwu .chip,.sb-wwu .badge svg,.sb-wwu .marquee .track{animation:none!important}
  .sb-wwu .hero h1 em,.sb-wwu h2 em,.sb-wwu .badge .mid,.sb-wwu .deal .num b,.sb-wwu .tier .t-fee,.sb-wwu .card .idx,.sb-wwu .marquee b,.sb-wwu .faq summary::after,.sb-wwu .steps li::before,.sb-wwu .btn-dark:hover{animation:none!important}
  .js .sb-wwu .rv{opacity:1;transform:none;transition:none}
  .sb-wwu .btn,.sb-wwu .card{transition:none}
}
</style>`;

const bodyContent = `<main class="sb-wwu">

<div class="hero">
  <div class="chips" aria-hidden="true">
    <div class="chip c1" data-depth="14"><img src="/images/places/kelingking-beach-t-rex-cliff.jpg" alt="" loading="eager"></div>
    <div class="chip c2" data-depth="26"><img src="/images/places/manta-ray-snorkeling.jpg" alt="" loading="lazy"></div>
    <div class="chip c3" data-depth="20"><img src="/images/places/mount-batur-sunrise-trek.jpg" alt="" loading="lazy"></div>
    <div class="chip c4" data-depth="30"><img src="/images/places/ayung-river-rafting.jpg" alt="" loading="lazy"></div>
    <div class="chip c5" data-depth="18"><img src="/images/places/tegalalang-rice-terraces.jpg" alt="" loading="lazy"></div>
  </div>
  <div class="badge" aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <defs><path id="sbwwu-circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
      <text style="font-size:9.2px;font-weight:600;letter-spacing:.12em;fill:#141412"><textPath href="#sbwwu-circ">FLAT FEE PER BOOKING · PAID AFTER EVERY TOUR ·</textPath></text>
    </svg>
    <span class="mid">$3–10</span>
  </div>
  <div class="wrap">
    <p class="kicker rv">SB Excursions · Bali · Partner program</p>
    <h1 class="rv">Send us a guest.<br><em>Get paid.</em></h1>
    <p class="sub rv">You know people who want to see Bali — we run the tours. Recommend us, and we pay you a <strong>flat $3–$10 for every booking</strong>. Paid after every tour. No contracts, no paperwork, no minimums — just your name on the booking.</p>
    <div class="cta-row rv">
      <a class="btn btn-dark" href="${WA}" target="_blank" rel="noopener nofollow">Become a partner — 2 minutes</a>
      <a class="btn btn-ghost" href="#how">How it works ↓</a>
    </div>
  </div>
</div>

<div class="marquee" aria-hidden="true">
  <div class="track">
    <span>Villas</span><b>✺</b><span>Guesthouses</span><b>✺</b><span>Surf schools</span><b>✺</b><span>Cafés</span><b>✺</b><span>Drivers</span><b>✺</b><span>Guides</span><b>✺</b><span>Creators</span><b>✺</b>
    <span>Villas</span><b>✺</b><span>Guesthouses</span><b>✺</b><span>Surf schools</span><b>✺</b><span>Cafés</span><b>✺</b><span>Drivers</span><b>✺</b><span>Guides</span><b>✺</b><span>Creators</span><b>✺</b>
  </div>
</div>

<section class="deal">
  <div class="wrap">
    <p class="eyebrow rv">The deal</p>
    <h2 class="rv">One booking = one fee.<br>Every time, <em>no exceptions.</em></h2>
    <div class="grid rv">
      <div class="cell"><div class="num"><b>$3–10</b></div><p>flat fee for every booking you bring — not a percentage you have to double-check</p></div>
      <div class="cell"><div class="num">28</div><p>private tours to recommend: Nusa Penida, Mount Batur, rafting, Gili, whale sharks</p></div>
      <div class="cell"><div class="num">$0</div><p>prepayment for your guests — they book on WhatsApp and pay on the day</p></div>
      <div class="cell"><div class="num">∞</div><p>no cap and no expiry: ten bookings a week means ten fees a week</p></div>
    </div>
    <div class="tiers rv">
      <div class="tier"><div class="t-name">Transfers &amp; fast boats<small>airport pickups, boat tickets · tours from $15</small></div><div class="t-fee">$3</div></div>
      <div class="tier"><div class="t-name">Half-day activities<small>rafting, ATV, surf lessons, sunset cruise · from $25</small></div><div class="t-fee">$5</div></div>
      <div class="tier"><div class="t-name">Full-day tours &amp; island trips<small>Nusa Penida, Batur sunrise, Gili, whale sharks · from $49</small></div><div class="t-fee">$10</div></div>
    </div>
    <p class="fine rv">One fee per booking, whatever the group size — simple to count, impossible to argue about. Current tour prices are always live at <a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>.</p>
  </div>
</section>

<section class="aud">
  <div class="wrap">
    <p class="eyebrow rv">Who this is for</p>
    <h2 class="rv">If travelers ask you<br><em>"what should we do here?"</em> — you qualify.</h2>
    <div class="cards">
      <div class="card rv"><img src="/images/places/bali-villa-with-pool.jpg" alt="Bali villa with a pool" loading="lazy"><div class="pad"><span class="idx">01</span><h3>Villas &amp; guesthouses</h3><p>Your guests ask for trips at check-in anyway. Hand them our WhatsApp with your partner name — the fee is yours, the logistics are ours.</p></div></div>
      <div class="card rv"><img src="/images/places/canggu-cafe.jpg" alt="Café in Canggu" loading="lazy"><div class="pad"><span class="idx">02</span><h3>Surf schools &amp; cafés</h3><p>A QR on the counter or a line after the lesson: "want a Penida day? — tell them our name". Zero effort, recurring fees.</p></div></div>
      <div class="card rv"><img src="/images/places/private-driver-in-bali.jpg" alt="Private driver in Bali" loading="lazy"><div class="pad"><span class="idx">03</span><h3>Drivers &amp; local friends</h3><p>Your passengers want island trips you don't run yourself. Pass them over instead of losing them — and get paid for it.</p></div></div>
      <div class="card rv"><img src="/images/places/diamond-beach-cliffs.jpg" alt="Diamond Beach cliffs on Nusa Penida" loading="lazy"><div class="pad"><span class="idx">04</span><h3>Bloggers &amp; creators</h3><p>Answering "who did you book with?" in your DMs every day? Give your partner name — every booking from your followers is a fee.</p></div></div>
    </div>
  </div>
</section>

<section class="steps" id="how">
  <div class="wrap">
    <p class="eyebrow rv">How it works</p>
    <h2 class="rv">No links, no dashboards.<br>Your name <em>is</em> the tracking.</h2>
    <ol>
      <li class="rv"><div><h3>Message us on WhatsApp</h3><p>Say you want to partner. We agree on your partner name — usually just your villa's, café's or your own name — and you're in. Takes two minutes, no forms.</p></div></li>
      <li class="rv"><div><h3>Your guest books and names you</h3><p>They write to the same WhatsApp, pick any of the 28 tours and mention your name. That's it — we note the referral on the booking right away.</p></div></li>
      <li class="rv"><div><h3>You get paid after the tour</h3><p>Once the guest's tour day is done, your flat fee is on its way — cash on Bali or a transfer, whatever suits you. Every booking, every time.</p></div></li>
    </ol>
    <div class="gets rv">
      <span>✓ Your partner name</span>
      <span>✓ <a href="/bali/en/tour-prices">Live price list</a> to share</span>
      <span>✓ Photo pack &amp; tour one-liners for chats</span>
      <span>✓ Replies 7:00–22:00 Bali time</span>
    </div>
  </div>
</section>

<section class="why">
  <div class="wrap">
    <p class="eyebrow rv">Why your guests will thank you</p>
    <h2 class="rv">Easy to recommend,<br>because it's <em>easy to book.</em></h2>
    <ul>
      <li class="rv"><b>From $15</b>Private tours at direct-operator prices — from a $15 transfer to a $150 whale-shark day.</li>
      <li class="rv"><b>No prepayment</b>Guests confirm on WhatsApp and pay on the day — nothing to lose if plans change.</li>
      <li class="rv"><b>Private, not groups</b>Own car, own driver, own pace — no bus-load strangers, no fixed herding schedule.</li>
      <li class="rv"><b>5 languages</b>Site and booking in English, Spanish, French, Chinese and Russian — recommend to any guest.</li>
    </ul>
  </div>
</section>

<section class="faq">
  <div class="wrap">
    <p class="eyebrow rv">Questions</p>
    <h2 class="rv">The fine print, <em>without the fine print.</em></h2>
    <details class="rv"><summary>How and when do I get paid?</summary><p class="a">Right after your guest's tour day — a flat $3–$10 per booking depending on the tour tier above, sent however suits you: cash on Bali or a transfer. No minimum payout, no waiting for the end of the month.</p></details>
    <details class="rv"><summary>What counts as a referred booking?</summary><p class="a">Any tour booked on WhatsApp where the guest mentions your partner name. That's the whole tracking system — no links to install, no dashboards to check, nothing your guest can do wrong.</p></details>
    <details class="rv"><summary>Do I need to sign anything?</summary><p class="a">No. This is a simple named-referral arrangement over WhatsApp. You message us once, get your partner name, and start recommending the same day.</p></details>
    <details class="rv"><summary>Is there a cap on referrals?</summary><p class="a">No cap and no expiry. Ten bookings in a week means ten fees in a week — group or solo, every booking counts.</p></details>
    <details class="rv"><summary>Can I promote the tours online?</summary><p class="a">Yes — we'll send a photo pack and short tour descriptions for stories, chats and group posts. The only rule: no spam and no made-up claims about prices or inclusions. Everything real is at <a href="/bali/en/tour-prices">the live price list</a>.</p></details>
  </div>
</section>

<section class="final">
  <div class="wrap">
    <p class="eyebrow rv">Ready?</p>
    <h2 class="rv">Two minutes on WhatsApp<br>is the <em>whole onboarding.</em></h2>
    <p class="rv" style="margin:0 0 34px"><a class="btn btn-dark" href="${WA}%20My%20name%20is%20..." target="_blank" rel="noopener nofollow">Become a partner</a></p>
    <p class="note rv">WhatsApp +62 853-3368-5020 · replies 7:00–22:00 Bali time · English, Spanish, French, Chinese, Russian</p>
  </div>
</section>

</main>
`;

const bodyEndScript = `<script id="sb-wwu-js">
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // появление блоков при прокрутке
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".sb-wwu .rv").forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });

  // параллакс плавающих фото за курсором
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    var chips = [].slice.call(document.querySelectorAll(".sb-wwu .chip"));
    addEventListener("mousemove", function (e) {
      var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      chips.forEach(function (c) {
        var d = +c.dataset.depth || 16;
        c.style.transform = "translate(" + (-x * d) + "px," + (-y * d) + "px)";
      });
    }, { passive: true });
  }
})();
</script>`;

const html = await buildChromedPage(ROOT, {
  title: "Work With Us — SB Excursions Partner Program | $3–$10 Per Booking",
  description: "Send a guest, get paid: a flat $3–$10 for every booking you bring to SB Excursions Bali tours. No contracts, no paperwork — for villas, surf schools, drivers and creators.",
  canonical: `${SITE}/work-with-us`,
  ogImage: `${SITE}/images/places/kelingking-beach-t-rex-cliff.jpg`,
  heroPreload: "/images/places/kelingking-beach-t-rex-cliff.jpg",
  waText: WA_TEXT,
  schema,
  styleBlock,
  bodyContent,
  bodyEndScript,
});

await fs.writeFile(path.join(ROOT, "work-with-us.html"), html);
console.log(JSON.stringify({ файл: "work-with-us.html", байт: html.length }, null, 2));

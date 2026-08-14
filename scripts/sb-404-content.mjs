/*
 * Контент страницы 404: ворота Лемпуянг гравюрной линией.
 *
 * Победитель дизайн-конкурса из четырёх направлений («гравюра»): плотный
 * ярусный силуэт расколотых ворот, дрейфующий туман в проёме, солнце-ноль
 * между двумя четвёрками, музейная подпись под чертой. По просьбе владельца
 * ворота укрупнены: холст обрезан по краям (viewBox 60…1140 вместо 0…1200),
 * а блоку отдана почти вся высота экрана.
 *
 * Страница собирается в родной хром сайта (шапка+подвал донора) скриптом
 * scripts/build-404.mjs, поэтому:
 *   • весь CSS скоуплен под .sb404 — вокруг живут стили Тильды;
 *   • цвета ссылок с !important — #allrecords a красит всё в оранжевый;
 *   • все id с префиксом sb404, чтобы не столкнуться с разметкой донора.
 *
 * Анимации: саморисующаяся линия (SMIL stroke-dashoffset, каскад 0-3 c),
 * после — бесконечный дрейф тумана. prefers-reduced-motion: скрипт в конце
 * срезает все <animate> и раскрывает штрихи мгновенно.
 *
 * Локализация: словарь в bodyEndScript. Vercel отдаёт 404.html на ИСХОДНОМ
 * битом адресе, поэтому location.pathname сохраняет язык (/bali/ru/…) — и
 * страница переводит себя сама. Французские строки — с типографским
 * апострофом (U+2019), обычный ломал бы литералы.
 */

export const STYLE_BLOCK = `
<style id="sb404-style">
.sb404{background:#fff;color:#0a0a0a;font-family:'Manrope',-apple-system,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.sb404 ::selection{background:#000;color:#fff}
.sb404 .sb404-wrap{max-width:1500px;margin:0 auto;padding:clamp(18px,3vh,34px) 24px clamp(30px,4vh,48px);display:grid;justify-items:center;gap:4px}
.sb404 .sb404-art{width:100%;height:clamp(440px,74svh,840px);display:flex;align-items:center;justify-content:center}
.sb404 .sb404-art svg{display:block;width:100%;height:100%}
.sb404 .sb404-plate{text-align:center;padding-top:12px}
.sb404 .sb404-rule{width:72px;height:1px;background:rgba(0,0,0,.5);margin:0 auto 20px}
.sb404 h1{margin:0 0 12px;font-size:clamp(15px,2vw,21px);font-weight:500 !important;letter-spacing:.26em;text-indent:.26em;text-transform:uppercase;text-wrap:balance;font-family:'Manrope',Arial,sans-serif}
.sb404 .sb404-sub{margin:0 auto 26px;font-size:13.5px;line-height:1.7;font-weight:400;color:#5a5a5a;letter-spacing:.02em;max-width:56ch}
.sb404 .sb404-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 34px}
.sb404 .sb404-links a{color:#000 !important;text-decoration:none !important;font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;padding:8px 2px 9px;border-bottom:1px solid rgba(0,0,0,.25);transition:border-color .25s}
.sb404 .sb404-links a:hover{border-color:#000}
.sb404 .sb404-links a:focus-visible{outline:1px solid #000;outline-offset:5px}
html[lang="zh"] .sb404 h1{letter-spacing:.16em;text-indent:.16em}
html[lang="zh"] .sb404 .sb404-links a{letter-spacing:.2em}
.sb404 .sb404-mist{opacity:0;animation:sb404-fin 2.2s ease 2.6s forwards}
.sb404 .sb404-mi{animation:sb404-drift var(--md,50s) ease-in-out var(--mo,0s) infinite alternate}
.sb404 .sb404-rev{animation-direction:alternate-reverse}
.sb404 .sb404-fade{opacity:0;animation:sb404-fin 1.1s ease var(--t,.25s) forwards}
@keyframes sb404-fin{to{opacity:1}}
@keyframes sb404-drift{from{transform:translateX(-46px)}to{transform:translateX(46px)}}
.sb404 .sb404-m1{--md:62s;--mo:-11s}.sb404 .sb404-m2{--md:38s;--mo:-5s}.sb404 .sb404-m3{--md:74s;--mo:-29s}.sb404 .sb404-m4{--md:46s;--mo:-17s}.sb404 .sb404-m5{--md:80s;--mo:-41s}
.sb404 .sb404-m6{--md:34s;--mo:-9s}.sb404 .sb404-m7{--md:56s;--mo:-23s}.sb404 .sb404-m8{--md:42s;--mo:-3s}.sb404 .sb404-m9{--md:68s;--mo:-35s}.sb404 .sb404-m10{--md:50s;--mo:-13s}
@media (max-width:640px){
.sb404 .sb404-wrap{padding:14px 16px 30px}
.sb404 .sb404-art{height:auto}
.sb404 .sb404-art svg{max-height:100%;height:auto;aspect-ratio:5/3.4}
.sb404 h1{font-size:13px;letter-spacing:.18em;text-indent:.18em}
.sb404 .sb404-sub{font-size:12.5px}
}
@media (prefers-reduced-motion:reduce){
.sb404 .sb404-fade,.sb404 .sb404-mist,.sb404 .sb404-mi{animation:none}
.sb404 .sb404-fade,.sb404 .sb404-mist{opacity:1}
}
</style>`;

export const BODY_CONTENT = `
<div class="sb404">
<main class="sb404-wrap">
<div class="sb404-art">
<svg viewBox="60 40 1080 705" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#000" role="img" aria-label="404 — the split gates of Lempuyang drawn as a line engraving">
<defs>
<path id="sb404f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M0,0C6,-2 11,-6 11,-11C11,-16 6,-18 3,-15C8,-20 4,-25 0,-24"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path id="sb404crl" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M0,0C-8,-1 -12,-6 -11,-12C-10,-17 -4,-17 -4,-13C-3,-17 -7,-20 -12,-19"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<clipPath id="sb404gc"><rect x="486" y="176" width="228" height="474"/></clipPath>
</defs>
<path stroke-width="1.7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M70,730H1130"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".05s" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".35" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M70,741H1130"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".05s" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<g id="sb404gate">
<path stroke-width="1.7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M95,730V703H113V676H132V650H458V666H471V682H484V698H497V714H510V730"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".05s" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M132,658H450"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".05s" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M300,668H445M300,676H445M300,684H445M300,692H445M300,700H445M300,708H445M300,716H445M300,724H445"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".05s" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M150,650V572H138V560H186V490H174V478H222V416H210V404H258V350H246V338H294V292H282V280H330V242H318V230"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".5s" dur="1.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".8" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M150,572H458M186,560H458M186,490H458M222,478H458M222,416H458M258,404H458M258,350H458M294,338H458M294,292H458M330,280H458M330,242H458M318,230H458"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".5s" dur="1.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".55" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M162,638H446V584H162ZM174,626H434V596H174ZM198,548H446V502H198ZM234,466H446V428H234ZM270,392H446V362H270ZM306,326H446V304H306ZM342,268H446V254H342Z"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".5s" dur="1.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M288,611L304,601L320,611L304,621Z"><animate attributeName="stroke-dashoffset" from="1" to="0" begin=".5s" dur="1.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M400,590H446M400,597H446M400,604H446M400,611H446M400,618H446M400,625H446M400,632H446M400,506H446M400,513H446M400,520H446M400,527H446M400,534H446M400,541H446M400,434H446M400,441H446M400,448H446M400,455H446M400,462H446M400,366H446M400,373H446M400,380H446M400,387H446M400,308H446M400,315H446M400,322H446M400,258H446M400,264H446"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M380,230V208H390V186H398V166H406V148H413V132H419V118H425V106C425,96 427,90 429,84"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M458,650V112C458,98 446,90 436,84"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<circle stroke-width="1.2" stroke-dasharray="29" stroke-dashoffset="29" cx="432" cy="76" r="4.5"><animate attributeName="stroke-dashoffset" from="29" to="0" begin="1.3s" dur="1.15s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></circle>
<use href="#sb404f" x="458" y="640"/><use href="#sb404f" x="458" y="614"/><use href="#sb404f" x="458" y="588"/><use href="#sb404f" x="458" y="562"/><use href="#sb404f" x="458" y="536"/><use href="#sb404f" x="458" y="510"/><use href="#sb404f" x="458" y="484"/><use href="#sb404f" x="458" y="458"/><use href="#sb404f" x="458" y="432"/><use href="#sb404f" x="458" y="406"/><use href="#sb404f" x="458" y="380"/><use href="#sb404f" x="458" y="354"/><use href="#sb404f" x="458" y="328"/><use href="#sb404f" x="458" y="302"/><use href="#sb404f" x="458" y="276"/><use href="#sb404f" x="458" y="250"/><use href="#sb404f" x="458" y="224"/><use href="#sb404f" x="458" y="198"/><use href="#sb404f" x="458" y="172"/><use href="#sb404f" x="458" y="146"/>
<use href="#sb404crl" x="132" y="650"/><use href="#sb404crl" x="138" y="560"/><use href="#sb404crl" x="174" y="478"/><use href="#sb404crl" x="210" y="404"/><use href="#sb404crl" x="246" y="338"/><use href="#sb404crl" x="282" y="280"/><use href="#sb404crl" x="318" y="230"/>
</g>
<use href="#sb404gate" transform="translate(1200,0) scale(-1,1)"/>
<g class="sb404-mist" clip-path="url(#sb404gc)">
<path class="sb404-mi sb404-m1" stroke-width="1.4" stroke-opacity=".18" stroke-dasharray="70 26 44 32" d="M320,238H880"/>
<path class="sb404-mi sb404-m2 sb404-rev" stroke-width="1.4" stroke-opacity=".34" stroke-dasharray="96 20 52 30" d="M320,284H880"/>
<path class="sb404-mi sb404-m3" stroke-width="1.4" stroke-opacity=".22" stroke-dasharray="40 30 84 26" d="M320,326H880"/>
<path class="sb404-mi sb404-m4" stroke-width="1.4" stroke-opacity=".3" stroke-dasharray="120 24 60 36" d="M320,366H880"/>
<path class="sb404-mi sb404-m5 sb404-rev" stroke-width="1.4" stroke-opacity=".16" stroke-dasharray="56 22 34 40" d="M320,404H880"/>
<path class="sb404-mi sb404-m6" stroke-width="1.4" stroke-opacity=".38" stroke-dasharray="88 30 46 22" d="M320,444H880"/>
<path class="sb404-mi sb404-m7 sb404-rev" stroke-width="1.4" stroke-opacity=".24" stroke-dasharray="36 26 66 34" d="M320,486H880"/>
<path class="sb404-mi sb404-m8" stroke-width="1.4" stroke-opacity=".32" stroke-dasharray="104 18 42 28" d="M320,528H880"/>
<path class="sb404-mi sb404-m9" stroke-width="1.4" stroke-opacity=".2" stroke-dasharray="62 34 90 24" d="M320,572H880"/>
<path class="sb404-mi sb404-m10 sb404-rev" stroke-width="1.4" stroke-opacity=".28" stroke-dasharray="78 22 50 38" d="M320,612H880"/>
</g>
<g stroke-linecap="round" stroke-linejoin="round">
<circle stroke-width="2.5" stroke-dasharray="290" stroke-dashoffset="290" cx="600" cy="413" r="46"><animate attributeName="stroke-dashoffset" from="290" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></circle>
<path stroke-width="1.2" stroke-opacity=".5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M558,394H642M556,401H644M554,408H646M554,415H646M555,422H645M557,429H643M560,436H640M565,443H635M573,450H627"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M600,361V353M626,368L630,361M574,368L570,361M645,387L652,383M555,387L548,383M652,413H660M548,413H540"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="2.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M522,368L474,436H550M522,368V462"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="2.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M698,368L650,436H726M698,368V462"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
<path stroke-width="1.2" stroke-opacity=".8" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M346,168C351,161 357,161 361,167C365,161 371,161 376,168M812,140C817,133 823,133 827,139C831,133 837,133 842,140"><animate attributeName="stroke-dashoffset" from="1" to="0" begin="2.05s" dur=".95s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></path>
</g>
</svg>
</div>
<section class="sb404-plate">
<div class="sb404-rule sb404-fade" style="--t:.55s"></div>
<h1 id="sb404-hl" class="sb404-fade" style="--t:.75s">This page wandered off the map.</h1>
<p id="sb404-sl" class="sb404-sub sb404-fade" style="--t:.95s">The gates are open — the page behind them is gone. Pick a way back to the island.</p>
<nav class="sb404-links sb404-fade" style="--t:1.15s" aria-label="Ways back">
<a id="sb404-l1" href="/bali/en/main-page">Main page</a>
<a id="sb404-l2" href="/bali/en/main-page#tours">Tours</a>
<a id="sb404-l3" href="/bali/en/journal">Journal</a>
<a id="sb404-l4" href="/ai-planner">Trip planner</a>
</nav>
</section>
</main>
</div>`;

export const BODY_END_SCRIPT = `
<script>
(function(){
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){
var A=document.querySelectorAll(".sb404 animate"),i;
for(i=A.length-1;i>=0;i--){A[i].parentNode.setAttribute("stroke-dashoffset","0");A[i].parentNode.removeChild(A[i]);}
}
var p=location.pathname,
m=p.match(/^\\/bali\\/(ru|es|fr|zh)\\//)||p.match(/^\\/(ru|es|fr|zh)\\//);
if(!m)return;
var L=m[1],
D={
"ru":{"h":"Эта страница ушла с маршрута.","s":"Ворота открыты, но за ними пусто. Выберите, куда вернуться.","l":["Главная","Туры","Журнал","Планировщик"]},
"es":{"h":"Esta página se salió de la ruta.","s":"Las puertas están abiertas, pero detrás no hay nada. Elige por dónde volver.","l":["Página principal","Tours","Diario","Planificador"]},
"fr":{"h":"Cette page a quitté l’itinéraire.","s":"Les portes sont ouvertes, mais il n’y a rien derrière. Choisissez votre retour.","l":["Accueil","Circuits","Journal","Planificateur"]},
"zh":{"h":"这个页面偏离了路线。","s":"大门敞开，门后却空无一物。选择返回的路吧。","l":["主页","路线","旅行日志","行程规划器"]}
},
d=D[L];
if(!d)return;
document.documentElement.lang=L;
document.getElementById("sb404-hl").textContent=d.h;
document.getElementById("sb404-sl").textContent=d.s;
var H=["/bali/"+L+"/main-page","/bali/"+L+"/main-page#tours","/bali/"+L+"/journal","/ai-planner?lang="+L];
for(var i=0;i<4;i++){var a=document.getElementById("sb404-l"+(i+1));a.textContent=d.l[i];a.setAttribute("href",H[i]);}
})();
</script>`;

/*
 * Счётчики и окно согласия на страницы журнала.
 *
 * Почему это отдельный скрипт. gate-trackers.mjs умеет только ЗАКРЫВАТЬ
 * теги, которые уже есть в HTML. На страницы туров счётчики попали из
 * экспорта Tilda вместе с вёрсткой; статьи генерируются с нуля и никогда
 * их не получали.
 *
 * Замер 26.08.2026 до правки: Clarity стоял на 167 страницах туров из 167
 * и на 27 страницах журнала из 1471. При этом журнал даёт 98,7% показов
 * сайта, а туры — 1,3%. То есть вся аналитика описывала ту часть сайта,
 * куда почти никто не заходит: тепловые карты, записи сессий и поведение
 * собирались с 431 показа за квартал вместо 32 000.
 *
 * Теги вставляем сразу в закрытом виде (type="text/plain" + data-sb-gated),
 * поэтому порядок относительно gate-trackers.mjs роли не играет: тот
 * пропускает всё, что уже помечено.
 *
 * Идемпотентно: повторный запуск ничего не добавляет.
 * Запуск из scripts/build.mjs.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const CLARITY = "vchdc4s3c4";
const GA = "G-KJP8R91QFN";
const GTM = "GTM-W35DV2QB";
const METRIKA = "106783251";

const MARK = "sb-journal-analytics";

/* Те же четыре счётчика и те же идентификаторы, что уже работают на турах.
   Метрику ставим везде, как на турах, — расхождение по языкам было бы
   отдельным решением, а не побочным эффектом этой правки. */
const BLOCK = `<!-- ${MARK} -->
<script type="text/plain" data-sb-gated="analytics" data-sb-name="clarity">
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");
</script>
<script type="text/plain" data-sb-gated="analytics" data-sb-name="gtm">
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');
</script>
<script type="text/plain" data-sb-gated="analytics" data-sb-name="ga">
(function(){var s=document.createElement('script');s.async=1;
s.src='https://www.googletagmanager.com/gtag/js?id=${GA}';document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');})();
</script>
<script type="text/plain" data-sb-gated="analytics" data-sb-name="metrika">
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${METRIKA},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
</script>
<script src="/js/sb-consent.js" defer></script>`;

/* Только журнал: у туров и главной всё это уже стоит. */
const IS_JOURNAL = /^bali-(journal|guides)[a-z0-9-]*\.html$/;

const stats = { добавлено: 0, "уже стоит": 0, "счётчики уже были": 0, "не журнал": 0, "без body": 0 };

for (const name of (await fs.readdir(ROOT)).filter((f) => f.endsWith(".html"))) {
  if (!IS_JOURNAL.test(name)) { stats["не журнал"]++; continue; }
  const file = path.join(ROOT, name);
  let html = await fs.readFile(file, "utf8");

  if (html.includes(MARK)) { stats["уже стоит"]++; continue; }
  /* Страница из старого экспорта, где счётчики уже есть, — не трогаем:
     второй Clarity на той же странице удвоил бы сессии. */
  if (/clarity\.ms|googletagmanager\.com/.test(html)) { stats["счётчики уже были"]++; continue; }
  if (!html.includes("</body>")) { stats["без body"]++; continue; }

  html = html.replace("</body>", `${BLOCK}\n</body>`);
  await fs.writeFile(file, html);
  stats["добавлено"]++;
}

console.log(JSON.stringify(stats, null, 2));

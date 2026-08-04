/*
 * Живая ссылка на пункте «Туры» в мобильном меню (бургере) Tilda.
 *
 * В шапке Tilda пункт «Туры» — это <a> с пустым href: он только
 * разворачивает подменю «Дубай / Бали», а сам никуда не ведёт, и клик по
 * нему Tilda гасит своим preventDefault. На десктопе подменю раскрывается
 * по наведению, а на телефоне пользователь, тапнувший «Туры», ждёт перехода
 * к списку туров — владелец попросил вести на /bali/<язык>/main-page#tours.
 *
 * Поэтому мало проставить href — нужен свой обработчик клика на стадии
 * перехвата (capture), до тильдовского. Язык берём из текущего адреса,
 * чтобы русская страница вела на русскую главную.
 *
 * Скрипт добавляется на каждую балийскую страницу, где есть этот пункт
 * меню. Дубайские страницы не трогаем — владелец просил их не менять.
 * На главных страницах Бали то же самое делает sb-bali-main-stability-script;
 * оба скрипта помечают пункт атрибутом data-sb-tours-link, так что второй
 * обработчик не вешается.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP_DIRS = new Set([".git", "node_modules", "_to_delete", "ai-planner"]);
const MARK = "sb-mobile-tours-link";

const SCRIPT = `<script id="${MARK}">
(function () {
  function toursHref() {
    var parts = window.location.pathname.split("/");
    var lang = parts[1] === "bali" && parts[2] ? parts[2] : "en";
    return "/bali/" + lang + "/main-page#tours";
  }
  function apply() {
    if (window.location.pathname.indexOf("/bali/") !== 0) return;
    var items = document.querySelectorAll(".t451 a.t451__link-item_submenu, .t451 a.t-menu__link-item_submenu");
    Array.prototype.forEach.call(items, function (item) {
      var href = toursHref();
      if (item.getAttribute("href") !== href) item.setAttribute("href", href);
      if (item.getAttribute("data-sb-tours-link") === "1") return;
      item.setAttribute("data-sb-tours-link", "1");
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = toursHref();
      }, true);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
  window.addEventListener("load", apply);
  setTimeout(apply, 500);
  setTimeout(apply, 1500);
  setTimeout(apply, 3000);
})();
</script>`;

const isDubai = (rel) => /(^|\/)(dubai-|page116517176|page114154666|page112638996|page112631276|page106026336|page63806411)/.test(rel);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

const stats = { добавлено: 0, обновлено: 0, "пропущено дубай": 0, "без бургера": 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  let html = await fs.readFile(file, "utf8");

  if (!/t451__link-item_submenu|t-menu__link-item_submenu/.test(html)) { stats["без бургера"]++; continue; }
  if (isDubai(rel)) { stats["пропущено дубай"]++; continue; }

  const had = html.includes(`id="${MARK}"`);
  // старую копию убираем, чтобы правки скрипта доезжали при пересборке
  html = html.replace(new RegExp(`<script id="${MARK}">[\\s\\S]*?<\\/script>\\s*`, "g"), "");

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${SCRIPT}\n</body>`);
  } else {
    html += `\n${SCRIPT}\n`;
  }
  await fs.writeFile(file, html);
  stats[had ? "обновлено" : "добавлено"]++;
}

console.log(JSON.stringify(stats, null, 2));

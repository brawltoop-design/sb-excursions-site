/*
 * Живая ссылка на пункте «Туры» в мобильном меню (бургере) Tilda.
 *
 * В шапке Tilda пункт «Туры» — это <a> с пустым href: он только
 * разворачивает подменю «Дубай / Бали», а сам никуда не ведёт, и клик по
 * нему Tilda гасит своим preventDefault. На десктопе подменю раскрывается
 * по наведению, а на телефоне пользователь, тапнувший «Туры», ждёт перехода
 * к списку туров — ведём на /bali/<язык>/main-page.
 *
 * Без якоря #tours: 24 августа 2026 владелец попросил убрать его отовсюду —
 * в адресной строке после тапа оставалась решётка, и это его раздражало.
 * Каталог туров и так первый экран главной, доскроллом ничего не выигрываем.
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
    return "/bali/" + lang + "/main-page";
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

const stats = { добавлено: 0, обновлено: 0, "пропущено дубай": 0, "без бургера": 0, "якорь снят": 0 };

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  let html = await fs.readFile(file, "utf8");
  const before = html;
  const pageLang = (/-(ru|es|fr|zh|de)\.html$/.exec(rel) || [])[1] || "";
  const dubaiPage = isDubai(rel);

  /* Якорь #tours в ссылках на главную.

     Владелец просил убрать его трижды. Первые два раза правились шаблоны, но
     ссылки живут в четырёх разных разметках: тильдовское подменю, выпадашка
     собственной шапки журнала, её мобильная шторка и статические файлы Tilda.
     Больше всего — около трёх тысяч — как раз в шторке, то есть ровно там,
     куда он и тыкал с телефона.

     Поэтому чистим не по контейнеру, а по самому адресу. Внутристраничных
     ссылок вида href="#tours" на сайте нет, так что скролл ничего не теряет.

     ВАЖНО: этот блок идёт ДО проверки на бургер. Страницы журнала тильдовской
     шапки не имеют, и пока чистка стояла ниже, они отсеивались раньше неё —
     правка не доезжала как раз до той разметки, где ссылок больше всего. */
  if (!dubaiPage) {
    html = html
      .replace(/href="\/bali\/([a-z]{2})\/main-page#tours"/g, 'href="/bali/$1/main-page"')
      .replace(/href="\/dubai\/en#tours"/g, 'href="/dubai/en/main-page"');

    /* Выпадашка и шторка шапки журнала зашиты по-английски: с испанской
       страницы пункт «Bali, Indonesia» вёл на английскую главную. Подставляем
       язык самой страницы, но ТОЛЬКО внутри этих блоков — снаружи такой же
       адрес стоит в переключателе языков, где он и должен вести на английскую. */
    if (pageLang) {
      html = html.replace(
        /<(ul|div)[^>]*class="[^"]*(?:t-menusub__list|sb-journal-tour-header__dropdown-menu|sb-journal-tour-header__drawer-submenu)[^"]*"[^>]*>[\s\S]*?<\/\1>/g,
        (block) => block.replace(/href="\/bali\/en\/main-page"/g, `href="/bali/${pageLang}/main-page"`),
      );
    }
  }

  const hasBurger = /t451__link-item_submenu|t-menu__link-item_submenu/.test(html);
  if (!hasBurger || dubaiPage) {
    stats[dubaiPage ? "пропущено дубай" : "без бургера"]++;
    if (html !== before) { await fs.writeFile(file, html); stats["якорь снят"]++; }
    continue;
  }

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

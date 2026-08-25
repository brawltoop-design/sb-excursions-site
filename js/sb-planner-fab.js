/*
 * Плавающая кнопка «бесплатный план поездки» на страницах статей.
 *
 * Планировщик живёт на /ai-planner и уже упомянут в 189 статьях — но текстовой
 * ссылкой внутри абзаца, где её не видно. Кнопка не создаёт новый путь, она
 * делает видимым существующий.
 *
 * Раньше в этом углу стояла кнопка WhatsApp. Владелец заменил её на план:
 * «спросить в WhatsApp» — обязательство, а бесплатный план — нет, и первым
 * шагом с холодной статьи он должен работать лучше. Две плавающие кнопки
 * рядом не ставим: на экране 375 px это уже промах пальцем.
 *
 * Текст рисует сайт, а не картинка. Надпись внутри PNG нельзя перевести —
 * русский, испанец и китаец видели бы английские слова. Здесь шесть языков,
 * язык берётся из адреса страницы.
 *
 * Появляется после 500 px прокрутки: на первом экране закрывала бы угол героя.
 */
(function () {
  "use strict";

  var SHOW_AFTER = 500;

  /* Двойные кавычки: во французском апостроф, одинарные оборвали бы строку
     молча — этот случай на сайте уже был. */
  var TEXTS = {
    en: { label: "Get free trip plan", aria: "Get a free Bali trip plan" },
    ru: { label: "Бесплатный план поездки", aria: "Получить бесплатный план поездки по Бали" },
    es: { label: "Plan de viaje gratis", aria: "Obtener un plan de viaje gratis por Bali" },
    fr: { label: "Plan de voyage gratuit", aria: "Obtenir un plan de voyage gratuit à Bali" },
    de: { label: "Kostenloser Reiseplan", aria: "Kostenlosen Bali-Reiseplan erhalten" },
    zh: { label: "免费行程规划", aria: "获取免费的巴厘岛行程规划" }
  };

  function pickLang() {
    var m = /^\/bali\/([a-z]{2})\//.exec(window.location.pathname);
    var code = m ? m[1] : (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    return TEXTS[code] ? code : "en";
  }

  function build() {
    if (document.getElementById("sb-plan-fab")) return;

    var lang = pickLang();
    var t = TEXTS[lang];

    var a = document.createElement("a");
    a.id = "sb-plan-fab";
    a.className = "sb-plan-fab";
    a.href = "/ai-planner?lang=" + lang;
    a.setAttribute("aria-label", t.aria);
    a.innerHTML =
      '<span class="sb-plan-fab__ico" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" focusable="false">' +
      '<path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ' +
      'd="M9 4.5 3.5 6.8v12.7L9 17.2m0-12.7 6 2.3m-6-2.3v12.7m6-10.4 5.5-2.3v12.7L15 19.5m0-12.7v12.7m-6-2.3 6 2.3"/>' +
      "</svg></span>" +
      '<span class="sb-plan-fab__text">' + t.label + "</span>";

    document.body.appendChild(a);

    var shown = false;
    var toggle = function () {
      var need = window.pageYOffset > SHOW_AFTER;
      if (need === shown) return;
      shown = need;
      a.classList.toggle("is-visible", need);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();

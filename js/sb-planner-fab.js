/*
 * Плавающая кнопка «бесплатный план поездки» на страницах статей.
 *
 * Ведёт в WhatsApp с готовым текстом, а не на страницу планировщика.
 * Разница в том, кто составляет план: на /ai-planner это делает форма, здесь —
 * живой человек. Второе медленнее, но начинает переписку и оставляет контакт,
 * а с холодной статьи это и есть цель.
 *
 * Формулировка — предложение, а не обязательство: «хочу бесплатный план»
 * просят легче, чем «напишите мне». Одна плавающая кнопка на странице: на
 * экране 375 px две рядом — это уже промах пальцем.
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

  var PHONE = "6285333685020";

  /* Двойные кавычки: во французском апостроф, одинарные оборвали бы строку
     молча — этот случай на сайте уже был. */
  var TEXTS = {
    en: {
      label: "Get free trip plan", aria: "Get a free Bali trip plan on WhatsApp",
      msg: "Hello! I would like a free Bali trip plan."
    },
    ru: {
      label: "Бесплатный план поездки", aria: "Получить бесплатный план поездки в WhatsApp",
      msg: "Здравствуйте! Хочу бесплатный план поездки по Бали."
    },
    es: {
      label: "Plan de viaje gratis", aria: "Obtener un plan de viaje gratis por WhatsApp",
      msg: "¡Hola! Quiero un plan de viaje gratis por Bali."
    },
    fr: {
      label: "Plan de voyage gratuit", aria: "Obtenir un plan de voyage gratuit sur WhatsApp",
      msg: "Bonjour ! Je voudrais un plan de voyage gratuit pour Bali."
    },
    de: {
      label: "Kostenloser Reiseplan", aria: "Kostenlosen Reiseplan über WhatsApp erhalten",
      msg: "Hallo! Ich hätte gern einen kostenlosen Reiseplan für Bali."
    },
    zh: {
      label: "免费行程规划", aria: "在 WhatsApp 上获取免费的巴厘岛行程规划",
      msg: "你好！我想要一份免费的巴厘岛行程规划。"
    }
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
    /* Сообщение короткое намеренно: чем меньше человек читает перед «отправить»,
       тем чаще отправляет. Страницу-источник дописывает sb-partner-ref.js —
       он добавляет «(Page: ru/journal/…)» к любой ссылке wa.me, так что
       заголовок статьи здесь был бы вторым адресом того же самого. */
    a.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(t.msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", t.aria);
    a.innerHTML =
      /* Значок WhatsApp, а не карты: кнопка уводит в другое приложение, и
         человек должен понимать это до нажатия, а не после. */
      '<span class="sb-plan-fab__ico" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" focusable="false">' +
      '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.24-8.23a8.19 8.19 0 0 1 8.23 8.24c0 4.54-3.69 8.23-8.23 8.23z"/>' +
      '<path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>' +
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

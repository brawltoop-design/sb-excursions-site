/*
 * Плавающая кнопка WhatsApp на страницах статей.
 *
 * На статье четырнадцать ссылок на WhatsApp, но все они в потоке текста:
 * шапка, блоки предложений, подвал. Человек, который дочитал до середины и
 * захотел спросить, должен либо листать вверх, либо вниз. Эта кнопка едет
 * вместе с ним.
 *
 * Появляется не сразу, а после 500 px прокрутки: на первом экране она
 * закрывала бы угол героя, а спросить в первую секунду всё равно некому —
 * человек ещё не знает, о чём спрашивать.
 *
 * Угол выбран правый. Левый нижний занят кнопкой согласия (sb-consent.js,
 * left:14px, bottom:14px), и две кнопки в одном углу — это промах пальцем.
 *
 * z-index ниже баннера согласия, чтобы кнопка не перекрывала его кнопки.
 *
 * Текст сообщения включает заголовок статьи. Это не украшение: владелец
 * увидит в переписке, с какой статьи пришёл человек, без счётчиков и меток.
 * И формулировка отличается от кнопок бронирования («I want to book…»),
 * так что одно от другого отличимо в тех же входящих.
 */
(function () {
  "use strict";

  var PHONE = "6285333685020";
  var SHOW_AFTER = 500;

  /* Тексты держим в объекте с двойными кавычками: во французском есть
     апостроф, и одинарные кавычки здесь молча оборвали бы строку. */
  var TEXTS = {
    en: { label: "Ask on WhatsApp", msg: "Hello! I have a question after reading “{t}”." },
    ru: { label: "Спросить в WhatsApp", msg: "Здравствуйте! У меня вопрос по статье «{t}»." },
    es: { label: "Preguntar por WhatsApp", msg: "¡Hola! Tengo una pregunta sobre el artículo «{t}»." },
    fr: { label: "Demander sur WhatsApp", msg: "Bonjour ! J'ai une question au sujet de l'article « {t} »." },
    de: { label: "Auf WhatsApp fragen", msg: "Hallo! Ich habe eine Frage zum Artikel „{t}“." },
    zh: { label: "在 WhatsApp 上提问", msg: "你好！我读了《{t}》，有一个问题。" }
  };

  function pickLang() {
    var m = /^\/bali\/([a-z]{2})\//.exec(window.location.pathname);
    var code = m ? m[1] : (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    return TEXTS[code] ? code : "en";
  }

  function articleTitle() {
    var h1 = document.querySelector("h1");
    var t = h1 ? h1.textContent : document.title;
    return String(t || "").replace(/\s+/g, " ").trim().slice(0, 90);
  }

  function build() {
    if (document.getElementById("sb-wa-fab")) return;

    var t = TEXTS[pickLang()];
    var href = "https://wa.me/" + PHONE + "?text=" +
      encodeURIComponent(t.msg.replace("{t}", articleTitle()));

    var a = document.createElement("a");
    a.id = "sb-wa-fab";
    a.className = "sb-wa-fab";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", t.label);
    a.innerHTML =
      '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>' +
      '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.24-8.23a8.19 8.19 0 0 1 8.23 8.24c0 4.54-3.69 8.23-8.23 8.23z"/>' +
      "</svg>" +
      '<span class="sb-wa-fab__text">' + t.label + "</span>";

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

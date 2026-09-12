/* Клик по WhatsApp — единственная конверсия сайта, и до 12 сентября 2026
 * она считалась только на 234 страницах: обработчик жил в
 * sb-static-parity.js, который подключён на турах и главной. Журнал —
 * 1768 страниц и 98 % кликов из поиска — не считался вовсе, а планировщик
 * живёт в iframe, и его клики до родительского документа не доходят. Отсюда
 * и попытка читать «долю туров в GSC» как замену — она структурно занижена.
 *
 * Этот файл — единственный владелец событий whatsapp_click и
 * planner_whatsapp. Имена и параметры (place, context, page_path)
 * сохранены, чтобы не ломать отчёты GA4; добавлены page_type и locale — по
 * ним и считается путь до брони по типу страницы. Из sb-static-parity.js
 * ветка WhatsApp удалена, иначе на турах событие уходило бы дважды.
 *
 * Один канал, а не два. На журнале стоят и gtag (прямой GA4), и контейнер
 * GTM; на турах и главной — только GTM из экспорта Tilda. Если слать событие
 * и через gtag, и в dataLayer, то на журнале при наличии триггера в GTM оно
 * придёт дважды, а на турах один раз — и разрез по page_type, ради которого
 * всё сделано, окажется перекошен. Поэтому: есть gtag — только gtag; нет —
 * только dataLayer (его подхватит GTM, как было на турах и раньше).
 *
 * Согласие: sb-consent.js не грузит счётчики, пока человек не нажал
 * «Accept»; до этого gtag не определён, событие ложится в dataLayer, и GTM
 * подхватит его в момент согласия — так было на турах и раньше.
 * Планировщик во вкладке AI PLANNER — iframe; он шлёт postMessage родителю,
 * и родитель отправляет событие в свою аналитику — согласие остаётся одно.
 * Отдельно открытый /ai-planner считает себя сам (ai-planner/js/app.js).
 *
 * Не считается сознательно: форма отзыва на страницах туров открывает
 * WhatsApp через window.open без ссылки — это отзыв, а не бронь.
 */
(function () {
  "use strict";

  var YM_COUNTER_ID = 106783251;

  function track(name, params) {
    var data = params || {};
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, Object.assign({ transport_type: "beacon" }, data));
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: name }, data));
      }
    } catch (e) {}
    try {
      if (typeof window.ym === "function") window.ym(YM_COUNTER_ID, "reachGoal", name, data);
    } catch (e) {}
  }

  /* Тип страницы по адресу. Именно это поле отвечает на вопрос, откуда
     приходят брони: со статьи, с тура, с главной или из планировщика. */
  function pageType(path) {
    if (/^\/bali\/[a-z]{2}\/tours\//.test(path)) return "tour";
    if (/^\/bali\/[a-z]{2}\/journal\//.test(path)) return "article";
    if (/^\/bali\/[a-z]{2}\/journal$/.test(path)) return "journal_hub";
    if (path === "/" || /^\/bali\/[a-z]{2}\/main-page$/.test(path)) return "main";
    if (/\/tour-prices$/.test(path)) return "prices";
    if (/^\/bali\/[a-z]{2}\/(about|faq|guides)$/.test(path)) return "info";
    if (/^\/bali\/[a-z]{2}\/review$/.test(path)) return "review";
    if (/work-with-us$/.test(path)) return "work_with_us";
    if (/^\/ai-planner/.test(path)) return "planner";
    if (/^\/dubai\//.test(path)) return "dubai";
    return "other";
  }

  /* /bali/ru/…, /dubai/en/… и партнёрская /ru/work-with-us — язык первым
     или вторым сегментом; без него — английский. */
  function locale(path) {
    var m = /^\/(?:(?:bali|dubai)\/)?([a-z]{2})(?:\/|$)/.exec(path);
    return m ? m[1] : "en";
  }

  var PATH = window.location.pathname;
  var BASE = { page_type: pageType(PATH), locale: locale(PATH), page_path: PATH };

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target && event.target.closest ? event.target : null;
      if (!target) return;
      var wa = target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
      if (!wa) return;

      var isFullPlan = wa.id === "sbPlanWaBtn";
      var inPlanner =
        isFullPlan || !!wa.closest("#sbAiResultsGrid, .sb-ai-results, .sb-place-card, .sb-ai-result-card");
      var card = wa.closest(".sb-place-card, .sb-ai-result-card");
      var titleNode = card ? card.querySelector(".sb-place-title, h4, h3") : null;
      var isFab = wa.id === "sb-plan-fab" || !!wa.closest(".sb-plan-fab");

      track(
        inPlanner ? "planner_whatsapp" : "whatsapp_click",
        Object.assign({}, BASE, {
          place: isFullPlan ? "FULL PLAN" : titleNode ? titleNode.textContent.trim().slice(0, 120) : "",
          context: isFullPlan ? "full_plan" : inPlanner ? "ai_planner" : isFab ? "fab" : "site",
        }),
      );
    },
    true,
  );

  /* Планировщик во вкладке AI PLANNER — это iframe /ai-planner/index.html.
     Свои клики он отдаёт сюда через postMessage; принимаем только со своего
     origin и только известную форму сообщения. */
  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin) return;
    var d = event.data;
    if (!d || typeof d !== "object" || d.sb !== "planner_whatsapp") return;
    track(
      "planner_whatsapp",
      Object.assign({}, BASE, {
        place: String(d.place || "").slice(0, 120),
        context: d.context === "full_plan" ? "full_plan" : "ai_planner_embed",
      }),
    );
  });
})();

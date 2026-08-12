/*
 * Партнёрская метка в ссылках WhatsApp.
 *
 * Партнёр (вилла, сёрф-школа, водитель, блогер) даёт гостю ссылку с ?ref=имя.
 * Скрипт запоминает метку на 30 дней и подписывает ею КАЖДУЮ ссылку на
 * WhatsApp: гость нажимает «Book in WhatsApp», и в готовом тексте сообщения
 * последней строкой стоит «(Recommended by: имя)». Дальше бронь руками
 * помечается как партнёрская, и партнёр получает свою фиксу.
 *
 * Почему не куки: страница статическая на Vercel, сервера для установки cookie
 * нет, а localStorage переживает переходы между страницами и закрытие вкладки.
 * Метка не персональная — это имя партнёра, поэтому согласия на cookies она
 * не требует и живёт вне consent-гейта.
 *
 * Подключается на все страницы шагом scripts/add-partner-ref.mjs.
 */
(function () {
  var TTL_DAYS = 30;                  // сколько помним партнёра после перехода
  var STORAGE_KEY = "sb_partner_ref";
  var LABEL = "Recommended by";       // как подпись выглядит в сообщении гостю

  function sanitizeRef(v) {
    if (!v) return null;
    var clean = String(v).trim().slice(0, 32).replace(/[^A-Za-z0-9_-]/g, "");
    return clean.length ? clean : null;
  }

  function readFromUrl() {
    try {
      var q = new URLSearchParams(window.location.search);
      return sanitizeRef(q.get("ref") || q.get("utm_campaign"));
    } catch (e) { return null; }
  }

  function save(ref) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ref: ref, t: Date.now() })); }
    catch (e) {}
  }

  function load() {
    try {
      var o = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!o || !o.ref) return null;
      if (Date.now() - o.t > TTL_DAYS * 86400000) return null;
      return sanitizeRef(o.ref);
    } catch (e) { return null; }
  }

  function buildWaHref(href, ref) {
    var u;
    try { u = new URL(href, window.location.href); } catch (e) { return href; }
    var host = u.hostname.replace(/^www\./, "");
    if (host !== "wa.me" && host !== "api.whatsapp.com") return href;
    var text = u.searchParams.get("text") || "";
    if (text.indexOf("(" + LABEL + ":") !== -1) return href;   // уже стоит
    var suffix = "(" + LABEL + ": " + ref + ")";
    var newText = text ? text + "\n\n" + suffix : suffix;
    u.searchParams.delete("text");
    var rest = [];
    u.searchParams.forEach(function (v, k) {
      rest.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    });
    // encodeURIComponent даёт %20, а не + — WhatsApp иначе покажет плюсы вместо пробелов
    rest.push("text=" + encodeURIComponent(newText));
    return u.origin + u.pathname + "?" + rest.join("&");
  }

  var ref = readFromUrl();
  if (ref) save(ref); else ref = load();
  if (!ref) return;

  function patchAll() {
    var links = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    for (var i = 0; i < links.length; i++) {
      links[i].href = buildWaHref(links[i].getAttribute("href"), ref);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchAll);
  } else {
    patchAll();
  }

  // страховка: ловим клик по ссылкам, добавленным на страницу позже
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a || !a.href) return;
    if (a.href.indexOf("wa.me") === -1 && a.href.indexOf("api.whatsapp.com") === -1) return;
    a.href = buildWaHref(a.getAttribute("href"), ref);
  }, true);
})();

/* SB Excursions — cookie consent banner + tracker gate.
 * Trackers are shipped as <script type="text/plain" data-sb-gated="analytics" data-sb-name="...">
 * and only executed after the visitor accepts. Yandex Metrika activates on RU pages only. */
(function () {
  'use strict';
  var KEY = 'sb-consent';

  var I18N = {
    en: {
      text: 'We use cookies for anonymous analytics (Microsoft Clarity, Google Analytics) to improve the site. No ads, no selling data.',
      accept: 'Accept', decline: 'Decline', policy: 'Privacy Policy', reopen: 'Cookie settings'
    },
    ru: {
      text: 'Мы используем cookies для анонимной аналитики (Microsoft Clarity, Google Analytics, Яндекс.Метрика), чтобы улучшать сайт. Без рекламы и продажи данных.',
      accept: 'Принять', decline: 'Отклонить', policy: 'Политика конфиденциальности', reopen: 'Настройки cookies'
    },
    es: {
      text: 'Usamos cookies para analítica anónima (Microsoft Clarity, Google Analytics) para mejorar el sitio. Sin publicidad ni venta de datos.',
      accept: 'Aceptar', decline: 'Rechazar', policy: 'Política de privacidad', reopen: 'Ajustes de cookies'
    },
    fr: {
      text: 'Nous utilisons des cookies pour des statistiques anonymes (Microsoft Clarity, Google Analytics) afin d’améliorer le site. Pas de publicité, pas de vente de données.',
      accept: 'Accepter', decline: 'Refuser', policy: 'Politique de confidentialité', reopen: 'Paramètres des cookies'
    },
    zh: {
      text: '我们使用 cookies 进行匿名统计（Microsoft Clarity、Google Analytics）以改进网站。不用于广告，也不出售数据。',
      accept: '接受', decline: '拒绝', policy: '隐私政策', reopen: 'Cookie 设置'
    }
  };

  function detectLang() {
    var m = location.pathname.match(/\/(en|ru|es|fr|zh)(\/|$)/);
    if (m && I18N[m[1]]) return m[1];
    var l = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    return I18N[l] ? l : 'en';
  }
  var lang = detectLang();
  var t = I18N[lang];

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
  }

  var activated = false;
  function activateTrackers() {
    if (activated) return;
    activated = true;
    var gated = document.querySelectorAll('script[data-sb-gated]');
    for (var i = 0; i < gated.length; i++) {
      var src = gated[i];
      if (src.getAttribute('data-sb-activated')) continue;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      if (src.src) { s.src = src.src; } else { s.text = src.text; }
      src.setAttribute('data-sb-activated', '1');
      (src.parentNode || document.head).insertBefore(s, src.nextSibling);
    }
    // Clarity consent signal (required for full analytics in EEA/UK since 2025)
    try { if (typeof window.clarity === 'function') window.clarity('consent'); } catch (e) {}
  }

  /* ---------- UI ---------- */
  var css = [
    '#sb-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;display:flex;justify-content:center;pointer-events:none;}',
    '#sb-consent .sbc-card{pointer-events:auto;max-width:680px;width:100%;background:#fff;color:#191919;border:1px solid rgba(21,21,21,.1);border-radius:18px;box-shadow:0 14px 44px rgba(0,0,0,.16);padding:18px 20px;font-family:Manrope,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:14px;line-height:1.5;}',
    '#sb-consent .sbc-text{margin:0 0 12px;}',
    '#sb-consent a{color:#2f6bff;text-decoration:underline;}',
    '#sb-consent .sbc-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}',
    '#sb-consent button{flex:1 1 130px;font-family:inherit;font-size:14.5px;font-weight:600;border-radius:999px;padding:11px 20px;cursor:pointer;transition:opacity .2s ease;}',
    '#sb-consent button:hover{opacity:.85;}',
    '#sb-consent .sbc-accept{background:#191919;color:#fff;border:1px solid #191919;}',
    '#sb-consent .sbc-decline{background:#fff;color:#191919;border:1px solid rgba(21,21,21,.35);}',
    '#sb-cookie-btn{position:fixed;left:14px;bottom:14px;z-index:2147482999;width:38px;height:38px;border-radius:50%;border:1px solid rgba(21,21,21,.14);background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);cursor:pointer;font-size:18px;line-height:36px;text-align:center;padding:0;opacity:.75;transition:opacity .2s ease;}',
    '#sb-cookie-btn:hover{opacity:1;}',
    '@media(max-width:560px){#sb-consent{left:8px;right:8px;bottom:8px;}#sb-consent .sbc-card{padding:15px 16px;}}'
  ].join('');

  function ensureStyle() {
    if (document.getElementById('sb-consent-css')) return;
    var st = document.createElement('style');
    st.id = 'sb-consent-css';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function policyHref() { return '/bali/' + lang + '/privacy-policy'; }

  function removeBanner() {
    var el = document.getElementById('sb-consent');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function showBanner() {
    if (document.getElementById('sb-consent')) return;
    ensureStyle();
    var wrap = document.createElement('div');
    wrap.id = 'sb-consent';
    wrap.setAttribute('data-nosnippet', '');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', t.reopen);
    var card = document.createElement('div');
    card.className = 'sbc-card';
    var p = document.createElement('p');
    p.className = 'sbc-text';
    p.appendChild(document.createTextNode(t.text + ' '));
    var a = document.createElement('a');
    a.href = policyHref(); a.target = '_blank'; a.rel = 'noopener';
    a.textContent = t.policy;
    p.appendChild(a);
    var row = document.createElement('div');
    row.className = 'sbc-row';
    var ok = document.createElement('button');
    ok.className = 'sbc-accept'; ok.type = 'button'; ok.textContent = t.accept;
    var no = document.createElement('button');
    no.className = 'sbc-decline'; no.type = 'button'; no.textContent = t.decline;
    ok.addEventListener('click', function () {
      setChoice('granted'); removeBanner(); showCookieBtn(); activateTrackers();
    });
    no.addEventListener('click', function () {
      var had = getChoice() === 'granted' || activated;
      setChoice('denied'); removeBanner(); showCookieBtn();
      if (had) location.reload(); // drop already-running trackers
    });
    row.appendChild(ok); row.appendChild(no);
    card.appendChild(p); card.appendChild(row);
    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }

  function showCookieBtn() {
    if (document.getElementById('sb-cookie-btn')) return;
    ensureStyle();
    var b = document.createElement('button');
    b.id = 'sb-cookie-btn';
    b.type = 'button';
    b.textContent = '🍪';
    b.title = t.reopen;
    b.setAttribute('aria-label', t.reopen);
    b.addEventListener('click', showBanner);
    document.body.appendChild(b);
  }

  /* Предварительное согласие обязательно в ЕЭЗ и Великобритании (GDPR/PECR).
     Для остальных стран действует модель «уведомили + можно отказаться»:
     счётчики работают сразу, кнопка 🍪 всегда под рукой.
     Регион определяем по часовому поясу — это не pasport, но единственный
     доступный признак на статическом сайте. Если определить не удалось,
     считаем визит европейским и спрашиваем: ошибка в эту сторону безопаснее. */
  var EEA_TZ = /^Europe\//i;
  // страны, попадающие в Europe/*, но не входящие в ЕЭЗ и не под UK GDPR
  var NON_EEA_EUROPE = /^Europe\/(Moscow|Kaliningrad|Samara|Volgograd|Saratov|Astrakhan|Ulyanovsk|Kirov|Minsk|Kyiv|Kiev|Simferopol|Istanbul|Chisinau)$/i;
  // территории ЕЭЗ за пределами Europe/*
  var EEA_OUTLYING = /^Atlantic\/(Azores|Madeira|Canary|Reykjavik|Faroe)$|^Indian\/(Reunion|Mayotte)$|^America\/(Cayenne|Guadeloupe|Martinique)$/i;

  function needsExplicitConsent() {
    try {
      var tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '');
      if (!tz) return true;
      if (EEA_TZ.test(tz)) return !NON_EEA_EUROPE.test(tz);
      return EEA_OUTLYING.test(tz);
    } catch (e) {
      return true;
    }
  }

  function init() {
    var choice = getChoice();
    if (choice === 'granted') { activateTrackers(); showCookieBtn(); return; }
    if (choice === 'denied') { showCookieBtn(); return; }
    if (needsExplicitConsent()) { showBanner(); return; }
    // вне ЕЭЗ/UK — считаем сразу, отказаться можно кнопкой 🍪
    activateTrackers();
    showCookieBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

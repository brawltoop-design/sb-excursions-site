/* ============================================================
   SB Excursions — AI-планировщик Бали
   js/app.js — движок: реальная карта Leaflet, конечный автомат
   4-фазной AI-сборки маршрута, таймлайн по дням, карточки мест.
   Один источник истины (state), один общий rAF-цикл.
   Данные — глобалы из data.js. Без модулей.
   ============================================================ */
(function () {
  'use strict';

  // Встраивание в сайт (iframe из кнопки AI PLANNER): прячем свой хедер.
  if (/[?&]embed=1(&|$)/.test(location.search)) document.documentElement.classList.add('is-embed');

  if (typeof L === 'undefined') { return; }

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Единый источник истины ---------- */
  var state = {
    days: 5,
    lang: 'ru',
    currentLoc: null,
    area: 'ubud',
    group: 'couple',
    budget: 'mid',
    interests: {},      // { interestId: true }
    vibes: {},          // производные веса (из интересов)
    phase: 'idle',      // idle | building | done
    plan: null,         // { days: [dayObj], stats }
    focusDay: 0,
    timers: [],         // setTimeout id — отменяются на «Пропустить»
    building: false
  };

  /* Вопросы как на главной: интересы → вайбы точек */
  var SB_INTERESTS = [
    { id: 'sea',       label: 'Море' },
    { id: 'nature',    label: 'Природа' },
    { id: 'culture',   label: 'Культура' },
    { id: 'relax',     label: 'Релакс' },
    { id: 'adventure', label: 'Приключения' },
    { id: 'beauty',    label: 'Красивые места' }
  ];
  var INTEREST_VIBES = {
    sea: ['beach', 'dive'], nature: ['waterfall', 'chill', 'volcano'],
    culture: ['temple'], relax: ['chill'], adventure: ['volcano', 'dive', 'adventure'],
    beauty: ['beach', 'temple', 'waterfall', 'aerial']
  };

  /* ---------- DOM ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var els = {
    startDate: $('startDate'), endDate: $('endDate'), areaSelect: $('areaSelect'),
    groupSelect: $('groupSelect'), budgetSelect: $('budgetSelect'), interestChips: $('interestChips'),
    build: $('buildBtn'),
    map: $('map'), status: $('mapStatus'), statusText: $('statusText'),
    counter: $('dayCounter'), zoomIn: $('zoomInBtn'), zoomOut: $('zoomOutBtn'),
    skip: $('skipBtn'), rebuild: $('rebuildBtn'), hint: $('mapHint'),
    summary: $('summary'), sumDays: $('sumDays'), sumStops: $('sumStops'),
    sumKm: $('sumKm'), sumBudget: $('sumBudget'), sumBudgetNote: $('sumBudgetNote'),
    planWa: $('planWa'), planWaWrap: $('planWaWrap'),
    timeline: $('timeline'), tlEmpty: $('tlEmpty'),
    pcOverlay: $('pcOverlay'), pcBackdrop: $('pcBackdrop'), pcClose: $('pcClose'),
    pcImg: $('pcImg'), pcBadge: $('pcBadge'), pcCat: $('pcCat'), pcTitle: $('pcTitle'),
    pcRating: $('pcRating'), pcDesc: $('pcDesc'), pcTourName: $('pcTourName'),
    pcTourPrice: $('pcTourPrice'), pcTourLink: $('pcTourLink'), pcBook: $('pcBook'),
    pcAdd: $('pcAdd'), pcMaps: $('pcMaps'), pcTour: $('pcTour')
  };

  var LOC = {};
  SB_LOCATIONS.forEach(function (l) { LOC[l.id] = l; });

  /* ============================================================
     Общий rAF-цикл (единственный) — анимации полилиний и т.п.
     ============================================================ */
  var anims = [];
  var rafId = null;
  function ensureRaf() { if (rafId === null) rafId = requestAnimationFrame(tick); }
  function tick(now) {
    for (var i = anims.length - 1; i >= 0; i--) {
      var a = anims[i];
      if (a.t0 === null) a.t0 = now;
      var t = a.dur <= 0 ? 1 : Math.min(1, (now - a.t0) / a.dur);
      var e = easeOut(t);
      try { a.onFrame(e, t); } catch (err) {}
      if (t >= 1) { anims.splice(i, 1); if (a.onDone) try { a.onDone(); } catch (err) {} }
    }
    rafId = anims.length ? requestAnimationFrame(tick) : null;
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function animate(dur, onFrame, onDone) {
    if (REDUCED) { onFrame(1, 1); if (onDone) onDone(); return; }
    anims.push({ t0: null, dur: dur, onFrame: onFrame, onDone: onDone }); ensureRaf();
  }
  function stopAnims() { anims.length = 0; if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

  /* ---------- Таймеры сцены ---------- */
  function later(fn, ms) { var id = setTimeout(fn, ms); state.timers.push(id); return id; }
  function clearTimers() { state.timers.forEach(clearTimeout); state.timers = []; }

  /* ---------- Гео ---------- */
  function haversine(a, b) {
    var R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
    var la1 = a.lat * Math.PI / 180, la2 = b.lat * Math.PI / 180;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function priceNum(p) { var m = /\$(\d+)/.exec(p || ''); return m ? parseInt(m[1], 10) : null; }

  /* ---------- i18n: перевод по русской строке-источнику ---------- */
  function T(s) {
    if (state.lang === 'ru' || s == null) return s;
    var m = (typeof SB_I18N !== 'undefined') ? SB_I18N[state.lang] : null;
    return (m && m[s] != null) ? m[s] : s;
  }
  function fmt(s, o) { s = T(s); Object.keys(o || {}).forEach(function (k) { s = s.replace('{' + k + '}', o[k]); }); return s; }
  function applyStaticI18n() {
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var src = el.getAttribute('data-src');
      if (src == null) { src = el.textContent.trim(); el.setAttribute('data-src', src); }
      el.textContent = T(src);
    });
    document.documentElement.lang = state.lang;
    var ppl = document.getElementById('planPrivacyLink');
    if (ppl) ppl.href = '/bali/' + state.lang + '/privacy-policy';
  }

  /* ============================================================
     КАРТА (Leaflet + тайлы CARTO Positron light_all)
     ============================================================ */
  var map = L.map('map', {
    zoomControl: false, attributionControl: true,
    scrollWheelZoom: false, doubleClickZoom: true
  });
  map.fitBounds(SB_BALI_BOUNDS);
  // Убираем флаг из стандартной подписи Leaflet (по умолчанию «🇺🇦 Leaflet»),
  // оставляя кредит Leaflet и обязательную атрибуцию OSM/CARTO ниже.
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="Leaflet">Leaflet</a>');
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);
  setTimeout(function () { map.invalidateSize(); }, 60);
  window.addEventListener('resize', function () { map.invalidateSize(); });
  // Следим за самим контейнером: при смене раскладки (мобильный стек, embed)
  // карта иначе остаётся прежнего размера и снизу появляется белая полоса.
  if (window.ResizeObserver) {
    var mapCardEl = document.querySelector('.map-card');
    if (mapCardEl) new ResizeObserver(function () { map.invalidateSize(); }).observe(mapCardEl);
  }

  // Зум колёсиком — только после клика по карте
  map.on('click', function () {
    if (!map.scrollWheelZoom.enabled()) { map.scrollWheelZoom.enable(); els.hint && els.hint.classList.add('is-gone'); }
  });
  els.zoomIn.addEventListener('click', function () { map.zoomIn(); });
  els.zoomOut.addEventListener('click', function () { map.zoomOut(); });

  /* ---------- Пины локаций ---------- */
  var pins = {};        // locId -> { marker, loc, dayIndex }
  var dayLayer = {};    // dayIndex -> L.layerGroup (полилиния + доп.)
  var quietLayer = L.layerGroup();  // тихие пины свободных дней
  var webLayer = L.layerGroup();    // «паутина» фазы рассуждения
  var locDays = {};     // locId -> [dayIndex,...]

  function pinEl(locId) {
    var p = pins[locId]; if (!p || !p.marker) return null;
    var wrap = p.marker.getElement(); return wrap ? wrap.querySelector('.sb-pin') : null;
  }

  function makePins() {
    SB_LOCATIONS.forEach(function (loc) {
      var icon = L.divIcon({
        className: 'sb-pin-wrap',
        html: '<div class="sb-pin sb-pin--sleep" data-loc="' + loc.id + '"></div>',
        iconSize: [26, 26], iconAnchor: [13, 13]
      });
      var marker = L.marker([loc.lat, loc.lng], { icon: icon, keyboard: false, riseOnHover: true }).addTo(map);
      marker.bindTooltip(loc.name, { direction: 'top', offset: [0, -12], className: 'sb-tip', opacity: 1 });
      marker.on('click', function () { openPlace(loc); });
      marker.on('mouseover', function () { highlightLoc(loc.id); });
      marker.on('mouseout', function () { clearHighlight(); });
      pins[loc.id] = { marker: marker, loc: loc, dayIndex: null };
    });
  }

  function resetPins() {
    Object.keys(pins).forEach(function (id) {
      // сбрасываем и МОДЕЛЬ, а не только DOM: иначе при повторной отрисовке
      // (после «Заменить»/«Пересобрать») dayIndex остаётся от прошлого плана
      // и colorPin больше не вызывается — маршрут на карте остаётся серым
      if (pins[id]) pins[id].dayIndex = null;
      var el = pinEl(id); if (!el) return;
      el.className = 'sb-pin sb-pin--sleep';
      el.style.removeProperty('--pin');
      el.style.opacity = '';                 // снимаем приглушение скрытого дня
      var num = el.querySelector('.sb-pin-num'); if (num) num.remove();
    });
    Object.keys(dayLayer).forEach(function (k) { map.removeLayer(dayLayer[k]); });
    dayLayer = {}; locDays = {};
    quietLayer.clearLayers(); if (map.hasLayer(quietLayer)) map.removeLayer(quietLayer);
    webLayer.clearLayers(); if (map.hasLayer(webLayer)) map.removeLayer(webLayer);
  }

  function colorPin(locId, color, dayIndex) {
    var el = pinEl(locId); if (!el) return;
    el.classList.remove('sb-pin--sleep');
    el.classList.add('sb-pin--route');
    el.style.setProperty('--pin', color);
    if (!REDUCED) { el.classList.remove('is-pop'); void el.offsetWidth; el.classList.add('is-pop'); }
    if (pins[locId]) pins[locId].dayIndex = dayIndex;
  }

  // Первая точка дня получает кружок с номером дня — «отсюда начинается день N».
  function markDayStart(locId, dayNum, color) {
    var el = pinEl(locId); if (!el) return;
    if (el.classList.contains('sb-pin--start')) return; // самый ранний день выигрывает
    el.classList.remove('sb-pin--sleep');
    el.classList.add('sb-pin--route', 'sb-pin--start');
    el.style.setProperty('--pin', color);
    var span = el.querySelector('.sb-pin-num');
    if (!span) { span = document.createElement('span'); span.className = 'sb-pin-num'; el.appendChild(span); }
    span.textContent = dayNum;
  }

  /* ---------- Подсветка связей при ховере ---------- */
  function highlightLoc(locId) {
    if (state.phase !== 'done') return;
    var days = locDays[locId] || [];
    Object.keys(pins).forEach(function (id) {
      var el = pinEl(id); if (!el) return;
      var share = (locDays[id] || []).some(function (d) { return days.indexOf(d) !== -1; });
      if (days.length && !share && id !== locId) el.classList.add('is-dim'); else el.classList.remove('is-dim');
    });
    Object.keys(dayLayer).forEach(function (k) {
      var on = days.indexOf(parseInt(k, 10)) !== -1;
      dayLayer[k].eachLayer(function (ly) { if (ly.setStyle) ly.setStyle({ opacity: on || !days.length ? 0.95 : 0.15 }); });
    });
  }
  function clearHighlight() {
    Object.keys(pins).forEach(function (id) { var el = pinEl(id); if (el) el.classList.remove('is-dim'); });
    Object.keys(dayLayer).forEach(function (k) {
      dayLayer[k].eachLayer(function (ly) { if (ly.setStyle && !dayHidden[k]) ly.setStyle({ opacity: 0.95 }); });
    });
  }

  /* ---------- Анимированная полилиния дня ---------- */
  function drawRoute(dayIndex, latlngs, color, dur, done) {
    var group = dayLayer[dayIndex] || (dayLayer[dayIndex] = L.layerGroup().addTo(map));
    if (latlngs.length < 2) { if (done) done(); return; }
    var line = L.polyline([latlngs[0]], {
      color: color, weight: 3, opacity: 0.95, lineJoin: 'round', lineCap: 'round', className: 'sb-route'
    }).addTo(group);
    // длины сегментов
    var segs = [], total = 0;
    for (var i = 1; i < latlngs.length; i++) {
      var d = map.distance(latlngs[i - 1], latlngs[i]); segs.push(d); total += d;
    }
    if (total === 0 || REDUCED) { line.setLatLngs(latlngs); if (done) done(); return; }
    animate(dur, function (e) {
      var target = e * total, acc = 0, pts = [latlngs[0]];
      for (var j = 0; j < segs.length; j++) {
        if (acc + segs[j] <= target) { pts.push(latlngs[j + 1]); acc += segs[j]; }
        else {
          var f = segs[j] > 0 ? (target - acc) / segs[j] : 0;
          pts.push([latlngs[j].lat + (latlngs[j + 1].lat - latlngs[j].lat) * f,
                    latlngs[j].lng + (latlngs[j + 1].lng - latlngs[j].lng) * f]);
          break;
        }
      }
      line.setLatLngs(pts);
    }, function () { line.setLatLngs(latlngs); if (done) done(); });
  }

  /* ============================================================
     ПЛАНИРОВЩИК — сборка плана из шаблонов дней и свободных дней
     ============================================================ */
  function activeVibes() {
    var set = {};
    Object.keys(state.interests).forEach(function (k) {
      if (state.interests[k]) (INTEREST_VIBES[k] || []).forEach(function (v) { set[v] = true; });
    });
    return Object.keys(set);
  }
  // Число дней из дат (как на главной), с разумными границами
  function computeDays() {
    var s = els.startDate.value, e = els.endDate.value;
    if (s && e) {
      var d = Math.round((new Date(e) - new Date(s)) / 86400000) + 1;
      if (d >= 1) return Math.min(d, 21); // вся длина поездки (до 21 дня), не сбрасываем на 5
    }
    return 5;
  }
  // Сколько дней-туров под длину поездки (как getTargetMainExcursions главной) —
  // остальные дни становятся свободными с рекомендациями. На длинных поездках
  // (2+ недели) показываем больше туров из каталога, оставляя ~треть дней свободными.
  function mainTarget(days) {
    if (days <= 5) return 3;
    if (days <= 9) return 4;
    if (days <= 13) return 5;
    return Math.max(6, Math.ceil(days * 0.62));
  }
  // Ротация зон свободных дней стартует от района проживания
  function areaZoneRotation(area) {
    var ids = SB_FREE_ZONES.map(function (z) { return z.id; });
    var i = ids.indexOf(area + '_zone');
    return i < 0 ? ids.slice() : ids.slice(i).concat(ids.slice(0, i));
  }

  /* ============================================================
     ПОГОДА — прогноз Open-Meteo (до 16 дней) + климатология Бали.
     Хорошая погода -> морские/пляжные туры, плохая -> храмы/спа/культура.
     ============================================================ */
  var WX_LL = { lat: -8.6717, lng: 115.2339 };
  // доля хорошей погоды по месяцам (сухой сезон апр–окт заметно суше)
  var WX_CLIMO = [0.30, 0.35, 0.50, 0.70, 0.82, 0.90, 0.92, 0.90, 0.85, 0.70, 0.50, 0.35];
  function wxClassify(code, pop) {
    if ([95, 96, 99].indexOf(code) !== -1) return { good: false, icon: '⛈️', key: 'Гроза' };
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86].indexOf(code) !== -1) return { good: false, icon: '🌧️', key: 'Дождь' };
    if (pop != null && pop >= 60) return { good: false, icon: '🌦️', key: 'Возможен дождь' };
    if ([3, 45, 48].indexOf(code) !== -1) return { good: true, icon: '☁️', key: 'Облачно' };
    if (code === 2) return { good: true, icon: '⛅', key: 'Переменная облачность' };
    return { good: true, icon: '☀️', key: 'Ясно' };
  }
  // Чистая арифметика дат по строкам YYYY-MM-DD через UTC — без сдвига по таймзоне
  function isoAddDays(iso, n) {
    var p = iso.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }
  function todayISO() { var d = new Date(); var m = String(d.getMonth() + 1); var da = String(d.getDate()); return d.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' + (da.length < 2 ? '0' + da : da); }
  // Возвращает Promise<[{date,good,icon,key,tmax,pop,real}]> длиной days
  function fetchTripWeather(startISO, days) {
    if (!startISO) return Promise.resolve(null);
    var dates = []; for (var i = 0; i < days; i++) dates.push(isoAddDays(startISO, i));
    var tISO = todayISO();
    var maxISO = isoAddDays(tISO, 15); // Open-Meteo даёт прогноз примерно на 16 дней
    var inWin = dates.filter(function (d) { return d >= tISO && d <= maxISO; }); // сравнение ISO-строк корректно
    var got = {};
    var p = Promise.resolve();
    if (inWin.length) {
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + WX_LL.lat + '&longitude=' + WX_LL.lng +
        '&daily=weather_code,temperature_2m_max,precipitation_probability_max&timezone=Asia%2FMakassar' +
        '&start_date=' + inWin[0] + '&end_date=' + inWin[inWin.length - 1];
      var fetchP = fetch(url).then(function (r) { return r.json(); }).then(function (j) {
        var t = (j.daily && j.daily.time) || [];
        t.forEach(function (dd, k) { got[dd] = { code: j.daily.weather_code[k], tmax: Math.round(j.daily.temperature_2m_max[k]), pop: j.daily.precipitation_probability_max[k] }; });
      }).catch(function () { });
      var timeoutP = new Promise(function (res) { setTimeout(res, 4500); }); // не ждём вечно — иначе климатология
      p = Promise.race([fetchP, timeoutP]);
    }
    return p.then(function () {
      return dates.map(function (d, idx) {
        var w = got[d];
        if (w) { var c = wxClassify(w.code, w.pop); return { date: d, good: c.good, icon: c.icon, key: c.key, tmax: w.tmax, pop: w.pop, real: true }; }
        var mo = (+d.split('-')[1]) - 1;
        var good = ((idx * 7 + 3) % 10) / 10 < WX_CLIMO[mo];
        return { date: d, good: good, icon: good ? '☀️' : '🌧️', key: good ? 'Ясно' : 'Дождь', tmax: 30, pop: good ? 20 : 70, real: false };
      });
    });
  }
  // Насколько тур «просит» хорошую погоду: море/виды/полёты > храмы/спа/водопады
  function sunNeed(tpl) {
    var v = tpl.vibes || [];
    var sun = ['beach', 'dive', 'aerial', 'volcano'];
    var rain = ['temple', 'chill', 'waterfall'];
    return v.reduce(function (a, x) { return a + (sun.indexOf(x) !== -1 ? 1 : 0) - (rain.indexOf(x) !== -1 ? 1 : 0); }, 0);
  }

  // Бюджет реально влияет на подбор: «до $50» тянет недорогие туры,
  // «$120+» — премиум (приват, вертолёт, острова, цена по запросу).
  function budgetFit(tpl) {
    var tour = SB_TOURS[tpl.tour];
    var p = priceNum(tour && tour.price); // null у «Ask Price»
    var b = state.budget;
    if (b === 'low') return p == null ? -2 : (p <= 50 ? 2 : (p <= 80 ? 0 : -2));
    if (b === 'high') return p == null ? 2 : (p >= 100 ? 2 : (p >= 60 ? 1 : 0));
    return p == null ? 0 : (p >= 40 && p <= 120 ? 1 : 0);
  }
  // Состав группы тоже влияет: семье не ставим ночные подъёмы и многодневные
  // выезды, друзьям добавляем драйва, паре — спокойные и видовые дни.
  function groupFit(tpl) {
    var g = state.group;
    var first = (tpl.stops && tpl.stops[0] && tpl.stops[0].time) || '09:00';
    var startH = parseInt(String(first).split(':')[0], 10);
    var v = tpl.vibes || [];
    var has = function (x) { return v.indexOf(x) !== -1; };
    var s = 0;
    if (g === 'family') {
      if (startH < 6) s -= 3;                 // подъём среди ночи с детьми
      if (tpl.id === 'sumbawa_day') s -= 3;   // многодневный выезд с Бали
      if (has('chill') || has('waterfall') || has('beach')) s += 1;
      return s;
    }
    if (g === 'couple') {
      if (has('chill')) s += 1;
      if (has('temple') || has('aerial')) s += 1;
      if (startH < 5) s -= 1;
      return s;
    }
    if (g === 'friends') {
      if (has('adventure') || has('dive')) s += 2;
      if (has('volcano')) s += 1;
      return s;
    }
    if (has('adventure') || has('dive')) s += 1; // solo
    if (has('chill')) s += 1;
    return s;
  }

  // Все шаблоны восхода на Батур — в поездке должен быть РОВНО ОДИН из них
  var BATUR_IDS = ['batur_day', 'batur_hike_day', 'batur_jeep_day'];

  // Статистика плана — считается и при сборке, и после ручной замены тура в дне
  function computeStats(planDays, days) {
    var stops = 0, km = 0, prev = null, sum = 0, ask = 0, seenTour = {};
    planDays.forEach(function (d) {
      if (d.kind !== 'tour') return;
      d.stops.forEach(function (s) {
        stops++;
        if (prev) km += haversine(prev, s.loc);
        prev = s.loc;
      });
      var key = d.tour && d.tour.link;
      if (d.tour && !seenTour[key]) {
        seenTour[key] = true;
        var n = priceNum(d.tour.price);
        if (n) sum += n; else ask++;
      }
    });
    return { days: days != null ? days : planDays.length, stops: stops, km: Math.round(km / 5) * 5, budget: sum, ask: ask };
  }

  function buildPlan(days, vibes, area) {
    var tpls = SB_DAY_TEMPLATES.slice();
    var scored;
    function total(t, m) { return m * 3 + budgetFit(t) + groupFit(t); }
    if (vibes.length) {
      scored = tpls.map(function (t) {
        var m = t.vibes.filter(function (v) { return vibes.indexOf(v) !== -1; }).length;
        return { t: t, m: m, s: total(t, m) };
      }).filter(function (x) { return x.m > 0; });
      scored.sort(function (a, b) { return b.s - a.s || a.t.order - b.t.order; });
      if (!scored.length) scored = tpls.map(function (t) { return { t: t, m: 1, s: total(t, 1) }; });
    } else {
      scored = tpls.map(function (t) { return { t: t, m: 1, s: total(t, 1) }; });
      scored.sort(function (a, b) { return b.s - a.s || a.t.order - b.t.order; });
    }

    // Дни-туры vs свободные дни — как на главной: часть дней тур, остальные
    // свободные с рекомендациями (свободные дни есть всегда для поездки 2+ дней).
    // Оставляем хотя бы ~четверть дней (мин. 1) свободными — остальное под туры.
    var freeFloor = days <= 2 ? 0 : Math.max(1, Math.floor(days / 4)); // на 1–2 дня свободный день не резервируем — иначе план без туров
    var budgetAdj = state.budget === 'low' ? -1 : (state.budget === 'high' ? 1 : 0);
    var tourCount = Math.min(Math.max(1, mainTarget(days) + budgetAdj), days - freeFloor, scored.length);
    // «Пересобрать» должен давать ДРУГОЙ план: сильнейшую половину оставляем,
    // остальные слоты проворачиваем по пулу — так каждый пересбор свежий.
    var pool = scored.map(function (x) { return x.t; });
    var variant = state.variant || 0;
    if (variant > 0 && pool.length > tourCount) {
      var keep = Math.max(1, Math.floor(tourCount / 2));
      var head = pool.slice(0, keep);
      var rest = pool.slice(keep);
      var off = rest.length ? (variant * 2) % rest.length : 0;
      pool = head.concat(rest.slice(off), rest.slice(0, off));
    }
    var chosen = pool.slice(0, tourCount);
    // Тур на Manta Point предлагаем ВСЕГДА (как isPrimaryMantaTour на главной):
    // ставим его первым тур-днём + добираем лучшие по вайбу остальные слоты.
    var mantaTpl = tpls.filter(function (t) { return t.id === 'manta_day'; })[0];
    if (mantaTpl && tourCount >= 1 && chosen.indexOf(mantaTpl) === -1) {
      // добираем из УЖЕ провёрнутого пула, иначе «Пересобрать» каждый раз
      // возвращало бы один и тот же набор
      var others = pool.filter(function (t) { return t !== mantaTpl; }).slice(0, tourCount - 1);
      chosen = [mantaTpl].concat(others);
    }
    // Восход на Батур — флагманский высокомаржинальный тур: гарантируем ОДИН Батур-день.
    // Пеший подъём при интересе «Приключения», иначе восход на джипе (без дублей).
    var baturHike = tpls.filter(function (t) { return t.id === 'batur_hike_day'; })[0];
    var baturJeep = tpls.filter(function (t) { return t.id === 'batur_day'; })[0];
    var baturPick = (state.interests && state.interests.adventure && baturHike) ? baturHike : (baturJeep || baturHike);
    if (baturPick) {
      var hadBatur = chosen.some(function (t) { return BATUR_IDS.indexOf(t.id) !== -1; });
      chosen = chosen.filter(function (t) { return BATUR_IDS.indexOf(t.id) === -1; }); // мьютекс
      if ((hadBatur || tourCount >= 2) && chosen.indexOf(baturPick) === -1) {
        if (chosen.length < tourCount) chosen.push(baturPick);
        else {
          var scB = {}; scored.forEach(function (x) { scB[x.t.id] = x.m; });
          var wi = -1, ws = Infinity;
          chosen.forEach(function (t, k) { if (t.id !== 'manta_day' && (scB[t.id] || 0) < ws) { ws = scB[t.id] || 0; wi = k; } });
          if (wi >= 0) chosen[wi] = baturPick; else chosen.push(baturPick);
        }
      }
    }
    // Резерв разнообразия: на длинных поездках (12+ дней) отдаём часть тур-слотов
    // «нишевым» турам из каталога, которые проигрывают классике по вайбу
    // (Сумбава, квадроциклы, вертолёты, восток Пениды). Иначе даже трёхнедельный
    // маршрут крутит один и тот же топ и никогда не показывает эти туры.
    // Сумбаву (её просил пользователь) ставим в резерв первой. Manta не трогаем.
    if (days >= 12 && chosen.length >= 4) {
      var reserve = Math.min(chosen.length - 3, days >= 18 ? 4 : (days >= 15 ? 3 : 2));
      var chosenIds = {};
      chosen.forEach(function (t) { chosenIds[t.id] = true; });
      var protectedIds = { manta_day: 1 }; if (baturPick) protectedIds[baturPick.id] = 1;
      // в пул не берём другой Батур-день (чтобы не получить дубль джип+пеший)
      var reservePool = tpls.filter(function (t) { return !chosenIds[t.id] && !protectedIds[t.id] && BATUR_IDS.indexOf(t.id) === -1; })
        .sort(function (a, b) { return b.order - a.order; }); // новые/нишевые (высокий order) вперёд
      reservePool.sort(function (a, b) { return (b.id === 'sumbawa_day') - (a.id === 'sumbawa_day'); });
      var swapIn = reservePool.slice(0, reserve);
      if (swapIn.length) {
        var scoreOf = {};
        scored.forEach(function (x) { scoreOf[x.t.id] = x.m; });
        var keepProt = chosen.filter(function (t) { return protectedIds[t.id]; });
        var rest = chosen.filter(function (t) { return !protectedIds[t.id]; })
          .sort(function (a, b) { return (scoreOf[b.id] || 0) - (scoreOf[a.id] || 0); }); // худшие по вайбу — в конец
        rest = rest.slice(0, Math.max(0, rest.length - swapIn.length)); // отбрасываем худшие
        chosen = keepProt.concat(rest).concat(swapIn);
      }
    }
    chosen.sort(function (a, b) { return a.order - b.order; });
    var freeCount = days - chosen.length;
    var rotation = areaZoneRotation(area || state.area);
    var wx = state.weather;
    var seq = new Array(days);

    if (wx && wx.length >= days) {
      // Дни-туры занимают ЛУЧШИЕ по погоде дни (морские туры любят солнце),
      // свободные дни уходят на дождливые (кафе/спа/шопинг — им погода не важна),
      // с лёгким разведением, чтобы не было 3 туров подряд.
      var ranked = [];
      for (var q = 0; q < days; q++) ranked.push(q);
      ranked.sort(function (a, b) { return (wx[b].good - wx[a].good) || ((wx[a].pop || 0) - (wx[b].pop || 0)) || (a - b); });
      var isTour = [];
      for (var z0 = 0; z0 < days; z0++) isTour[z0] = false;
      var assigned = 0;
      for (var r = 0; r < ranked.length && assigned < chosen.length; r++) {
        var di = ranked[r];
        var prev2 = di >= 2 && isTour[di - 1] && isTour[di - 2];
        var next2 = di <= days - 3 && isTour[di + 1] && isTour[di + 2];
        if (prev2 || next2) continue;
        isTour[di] = true; assigned++;
      }
      for (var r2 = 0; r2 < ranked.length && assigned < chosen.length; r2++) {
        if (!isTour[ranked[r2]]) { isTour[ranked[r2]] = true; assigned++; }
      }
      // сопоставляем туры дням: самый «солнечный» тур — на лучший тур-день
      var tourDays = [];
      for (var t0 = 0; t0 < days; t0++) if (isTour[t0]) tourDays.push(t0);
      var tourDaysByWx = tourDays.slice().sort(function (a, b) { return (wx[b].good - wx[a].good) || ((wx[a].pop || 0) - (wx[b].pop || 0)); });
      var tplsBySun = chosen.slice().sort(function (a, b) { return sunNeed(b) - sunNeed(a) || a.order - b.order; });
      var tplForDay = {};
      tourDaysByWx.forEach(function (dd, k) { tplForDay[dd] = tplsBySun[k]; });
      var zi = 0;
      for (var d0 = 0; d0 < days; d0++) {
        if (isTour[d0]) seq[d0] = { kind: 'tour', tpl: tplForDay[d0] };
        else { var zn = SB_FREE_ZONES.filter(function (z) { return z.id === rotation[zi % rotation.length]; })[0]; zi++; seq[d0] = { kind: 'free', zone: zn }; }
      }
    } else {
      // Без прогноза — прежнее равномерное распределение туров и свободных дней
      seq = chosen.map(function (t) { return { kind: 'tour', tpl: t }; });
      if (freeCount > 0) {
        var zi2 = 0;
        var step = Math.max(1, Math.round((seq.length + freeCount) / (freeCount + 1)));
        for (var f = 0; f < freeCount; f++) {
          var zone = SB_FREE_ZONES.filter(function (z) { return z.id === rotation[zi2 % rotation.length]; })[0];
          zi2++;
          var pos = Math.min(seq.length, (f + 1) * step + f);
          seq.splice(pos, 0, { kind: 'free', zone: zone });
        }
      }
      seq = seq.slice(0, days);
    }

    // Собираем дни с цветами и координатами
    var FREE_PER_DAY = 3;
    var freeSeen = 0;
    var planDays = seq.slice(0, days).map(function (item, i) {
      var color = SB_DAY_COLORS[i % SB_DAY_COLORS.length];
      var w = wx && wx[i] ? wx[i] : null;
      if (item.kind === 'tour') {
        var stops = item.tpl.stops.map(function (s) {
          var l = LOC[s.loc];
          return { loc: l, time: s.time, note: s.note };
        });
        return { kind: 'tour', tplId: item.tpl.id, title: item.tpl.title, tour: SB_TOURS[item.tpl.tour], color: color, stops: stops, wx: w };
      }
      // Свободный день: каждый следующий показывает ДРУГИЕ места зоны (прокрутка),
      // а в дождь вперёд выходят места, которые работают в непогоду (спа, музеи, кафе).
      var zone = item.zone;
      if (zone && zone.recs && zone.recs.length) {
        var pool = zone.recs.slice();
        if (w && !w.good) pool.sort(function (a, b) { return (b.indoor ? 1 : 0) - (a.indoor ? 1 : 0); });
        var take = Math.min(FREE_PER_DAY, pool.length);
        var off = pool.length ? (freeSeen * FREE_PER_DAY) % pool.length : 0;
        var sel = [];
        for (var q = 0; q < take; q++) sel.push(pool[(off + q) % pool.length]);
        zone = Object.assign({}, zone, { recs: sel });
      }
      freeSeen++;
      return { kind: 'free', zone: zone, color: color, wx: w };
    });

    return { days: planDays, stats: computeStats(planDays, days) };
  }

  /* ============================================================
     РЕНДЕР ТАЙМЛАЙНА
     ============================================================ */
  // звёзды уже есть в разметке карточки — здесь только цифра, иначе двойной ряд
  function starRow(rating) { return ' ' + rating.toFixed(1) + ' · Google maps'; }

  // Manta Point — гарантированный флагман, его день заменять нельзя.
  // Батур-день заменяется только на другой формат восхода (джип ↔ пеший).
  function canSwap(d) { return d && d.kind === 'tour' && d.tplId !== 'manta_day'; }
  function dayTools(i, isTour) {
    var swappable = isTour && canSwap(state.plan && state.plan.days[i]);
    return '<span class="tl-day-tools">' +
      (swappable ? '<button class="tl-tool" data-tool="swap" data-day="' + i + '">' + esc(T('Заменить')) + '</button>' : '') +
      '<button class="tl-tool" data-tool="focus" data-day="' + i + '">' + esc(T('Фокус')) + '</button>' +
      '<button class="tl-tool" data-tool="toggle" data-day="' + i + '">' + esc(T('Скрыть')) + '</button></span>';
  }
  // Погодный чип дня: иконка + температура (клик-подсказка — условие)
  function wxChip(d) {
    if (!d.wx) return '';
    var tip = T(d.wx.key) + (d.wx.real ? '' : ' · ' + T('оценка по сезону'));
    return '<span class="wx-chip' + (d.wx.good ? '' : ' wx-chip--wet') + '" title="' + esc(tip) + '">' +
      d.wx.icon + ' ' + d.wx.tmax + '°</span>';
  }
  function dayCardHTML(d, i) {
    var num = esc(T('День')) + ' ' + (i + 1 < 10 ? '0' : '') + (i + 1);
    if (d.kind === 'free') {
      var recs = d.zone.recs.map(function (r, k) {
        return '<div class="free-rec" data-day="' + i + '" data-rec="' + k + '" role="button" tabindex="0">' +
          (r.img ? '<img class="free-rec-thumb" src="' + esc(r.img) + '" alt="' + esc(r.title) + '">' : '') +
          '<div class="free-rec-body"><div class="free-rec-name">' + esc(r.title) +
          (r.topPick ? ' <span class="top-pick">5&#9733; SB Top Pick</span>' : '') +
          '</div><div class="free-rec-copy">' + esc(T(r.copy)) + '</div></div>' +
          '<a class="mini-btn" href="' + esc(r.maps) + '" target="_blank" rel="noopener">Maps</a></div>';
      }).join('');
      return '<article class="tl-day tl-day--free" data-day="' + i + '" style="--day:' + d.color + '">' +
        '<div class="tl-day-head"><span class="day-num">' + num + '</span>' +
        '<span class="tl-day-title free-title">' + esc(T('Свободный день')) + ' · ' + esc(T(d.zone.name)) + '</span>' +
        wxChip(d) + dayTools(i, false) + '</div>' +
        '<p class="free-intro">' + esc(T(d.zone.intro)) + '</p>' + recs + '</article>';
    }
    // Забор из отеля — первая строка расписания по времени
    var pickup = '';
    if (d.tour && d.tour.pickup) {
      var pu = d.tour.pickup;
      var mm = pu.match(/(\d{1,2}:\d{2}(?:[–-]\d{1,2}:\d{2})?)/);
      var puNote = mm ? pu.replace(mm[1], '').trim() : pu;
      pickup = '<div class="tl-stop tl-stop--pickup">' +
        '<span class="tl-stop-time">' + esc(mm ? mm[1] : '—') + '</span>' +
        '<span><span class="tl-stop-name">' + esc(T('Забор из отеля')) + '</span><br>' +
        '<span class="tl-stop-note">' + esc(T(puNote)) + '</span></span>' +
        '<span class="tl-stop-ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M3 13l1.7-5.4h9.6L17 13M3 13h15v4H3v-4Z"/><circle cx="7" cy="17.4" r="1.5"/><circle cx="14.4" cy="17.4" r="1.5"/></svg></span></div>';
    }
    var stops = pickup + d.stops.map(function (s) {
      return '<div class="tl-stop" data-loc="' + s.loc.id + '">' +
        '<span class="tl-stop-time">' + esc(T(s.time)) + '</span>' +
        '<span><span class="tl-stop-name">' + esc(T(s.loc.name)) + '</span><br>' +
        '<span class="tl-stop-note">' + esc(T(s.note)) + '</span></span>' +
        '<img class="tl-thumb" src="' + esc(s.loc.img) + '" alt="' + esc(T(s.loc.alt || s.loc.name)) + '"></div>';
    }).join('');
    var tour = d.tour ? '<div class="tl-tour">' +
      (d.tour.img ? '<div class="tl-tour-media"><img class="tl-tour-photo" src="' + esc(d.tour.img) + '" alt="' + esc(d.tour.name) + '"></div>' : '') +
      '<p class="eyebrow">' + esc(T('Тур дня')) + '</p>' +
      '<p class="tl-tour-name">' + esc(d.tour.name) + '</p>' +
      '<div class="tl-tour-meta"><span class="price-pill">' + esc(d.tour.price) + '</span>' +
      '<a class="mini-btn" href="' + esc(d.tour.link) + '" target="_blank" rel="noopener">' + esc(T('Страница тура')) + '</a></div></div>' : '';
    return '<article class="tl-day" data-day="' + i + '" style="--day:' + d.color + '">' +
      '<div class="tl-day-head"><span class="day-num">' + num + '</span>' +
      '<span class="tl-day-title">' + esc(T(d.title)) + '</span>' + wxChip(d) +
      dayTools(i, true) + '</div>' +
      '<div class="tl-stops">' + stops + '</div>' + tour + '</article>';
  }

  var dayHidden = {};   // dayIndex -> true если скрыт

  function renderTimelineShell() {
    els.tlEmpty && (els.tlEmpty.style.display = 'none');
    els.timeline.innerHTML = state.plan.days.map(dayCardHTML).join('');
    dayHidden = {};
    // делегированные обработчики
    els.timeline.querySelectorAll('.tl-stop').forEach(function (node) {
      node.addEventListener('click', function () { var l = LOC[node.getAttribute('data-loc')]; if (l) openPlace(l, false, dayTourOf(node)); });
    });
    els.timeline.querySelectorAll('.free-rec').forEach(function (node) {
      function openIt(e) {
        if (e.target.closest('a')) return; // клик по кнопке Maps
        e.stopPropagation();
        var di = parseInt(node.getAttribute('data-day'), 10);
        var ri = parseInt(node.getAttribute('data-rec'), 10);
        var d = state.plan.days[di];
        if (d && d.kind === 'free' && d.zone.recs[ri]) openFreeRec(d.zone.recs[ri]);
      }
      node.addEventListener('click', openIt);
      node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt(e); } });
    });
    els.timeline.querySelectorAll('.tl-tool').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var di = parseInt(btn.getAttribute('data-day'), 10);
        var tool = btn.getAttribute('data-tool');
        if (tool === 'focus') focusDay(di);
        else if (tool === 'swap') swapDayTour(di);
        else toggleDay(di, btn);
      });
    });
    els.timeline.querySelectorAll('.tl-day').forEach(function (card) {
      card.addEventListener('click', function () { setFocusDay(parseInt(card.getAttribute('data-day'), 10)); });
    });
  }

  function revealDayCard(i) {
    var card = els.timeline.querySelector('.tl-day[data-day="' + i + '"]');
    if (card) { if (REDUCED) card.classList.add('is-in'); else requestAnimationFrame(function () { card.classList.add('is-in'); }); }
  }

  /* ---------- Инструменты дня ---------- */
  function setFocusDay(i) {
    state.focusDay = i;
    els.timeline.querySelectorAll('.tl-day').forEach(function (c) {
      c.classList.toggle('is-focus', parseInt(c.getAttribute('data-day'), 10) === i);
    });
  }
  function focusDay(i) {
    setFocusDay(i);
    var d = state.plan.days[i];
    var pts = d.kind === 'tour' ? d.stops.map(function (s) { return [s.loc.lat, s.loc.lng]; })
                                : d.zone.recs.map(function (r) { return [r.lat, r.lng]; });
    if (pts.length === 1) map.flyTo(pts[0], 12, { duration: 1 });
    else if (pts.length) map.flyToBounds(L.latLngBounds(pts), { padding: [70, 70], duration: 1, easeLinearity: 0.25 });
  }
  function toggleDay(i, btn) {
    var hide = !dayHidden[i]; dayHidden[i] = hide;
    if (dayLayer[i]) { if (hide) map.removeLayer(dayLayer[i]); else dayLayer[i].addTo(map); }
    var d = state.plan.days[i];
    var ids = d.kind === 'tour' ? d.stops.map(function (s) { return s.loc.id; }) : [];
    ids.forEach(function (id) {
      // прячем пин только если он не участвует в других видимых днях
      var other = (locDays[id] || []).some(function (dd) { return dd !== i && !dayHidden[dd]; });
      var el = pinEl(id); if (el) el.style.opacity = (hide && !other) ? '0.18' : '';
    });
    var card = els.timeline.querySelector('.tl-day[data-day="' + i + '"]');
    if (card) card.classList.toggle('is-hidden-day', hide);
    if (btn) { btn.textContent = hide ? T('Показать') : T('Скрыть'); btn.classList.toggle('is-on', hide); }
  }

  // Замена тура в конкретном дне: берём лучший ещё не занятый тур с учётом
  // интересов, бюджета, состава группы и погоды этого дня.
  function swapDayTour(i) {
    if (!state.plan) return;
    var d = state.plan.days[i];
    if (state.building || state.phase !== 'done') return;  // не трогаем план во время сборки
    if (!canSwap(d)) return;                         // Manta-день не заменяем
    var used = {};
    state.plan.days.forEach(function (x) { if (x.kind === 'tour' && x.tplId) used[x.tplId] = true; });
    var vibes = activeVibes();
    var isBaturDay = BATUR_IDS.indexOf(d.tplId) !== -1;
    // помним, что уже показывали в этом дне, иначе «Заменить» ходит по кругу
    // между двумя турами и остальной каталог человек не увидит
    var seen = d.swapSeen || [d.tplId];
    function pickable(skipSeen) {
      return SB_DAY_TEMPLATES.filter(function (t) {
        if (used[t.id]) return false;
        if (skipSeen && seen.indexOf(t.id) !== -1) return false;
        // Батур-день меняем только на другой формат восхода, а обычный день
        // никогда не превращаем в Батур — иначе получим два Батура в поездке.
        return isBaturDay ? BATUR_IDS.indexOf(t.id) !== -1 : BATUR_IDS.indexOf(t.id) === -1;
      });
    }
    var cands = pickable(true);
    if (!cands.length) { seen = [d.tplId]; cands = pickable(true); }  // круг пройден — начинаем заново
    if (!cands.length) return;                       // менять не на что
    var wet = d.wx && !d.wx.good;
    cands = cands.map(function (t) {
      var m = vibes.length ? t.vibes.filter(function (v) { return vibes.indexOf(v) !== -1; }).length : 1;
      var s = m * 3 + budgetFit(t) + groupFit(t);
      s += wet ? -sunNeed(t) : sunNeed(t);           // в дождь — не морской день
      return { t: t, s: s };
    }).sort(function (a, b) { return b.s - a.s || a.t.order - b.t.order; });
    var next = cands[0].t;

    state.plan.days[i] = {
      kind: 'tour', tplId: next.id, title: next.title, tour: SB_TOURS[next.tour],
      color: d.color, wx: d.wx, swapSeen: seen.concat([next.id]),
      stops: next.stops.map(function (s) { return { loc: LOC[s.loc], time: s.time, note: s.note }; })
    };
    state.plan.stats = computeStats(state.plan.days, state.days);
    redrawPlanInstant();
    setFocusDay(i);
    focusDay(i);
  }

  // Полная мгновенная перерисовка плана (карта + карточки) после ручной правки
  function redrawPlanInstant() {
    resetPins();
    dayHidden = {};
    renderTimelineShell();
    state.plan.days.forEach(function (d, i) {
      if (d.kind === 'tour') {
        var latlngs = [];
        d.stops.forEach(function (s) {
          if (!locDays[s.loc.id]) locDays[s.loc.id] = [];
          if (locDays[s.loc.id].indexOf(i) === -1) locDays[s.loc.id].push(i);
          if (pins[s.loc.id] && pins[s.loc.id].dayIndex === null) colorPin(s.loc.id, d.color, i);
          latlngs.push([s.loc.lat, s.loc.lng]);
        });
        var g = dayLayer[i] || (dayLayer[i] = L.layerGroup().addTo(map));
        if (latlngs.length > 1) L.polyline(latlngs, { color: d.color, weight: 3, opacity: 0.95, lineJoin: 'round' }).addTo(g);
        if (d.stops.length) markDayStart(d.stops[0].loc.id, i + 1, d.color);
      } else if (d.zone && d.zone.recs) {
        if (!map.hasLayer(quietLayer)) quietLayer.addTo(map);
        d.zone.recs.forEach(function (r) {
          var qicon = L.divIcon({ className: 'sb-pin-wrap', html: '<div class="sb-pin sb-pin--quiet"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
          L.marker([r.lat, r.lng], { icon: qicon, keyboard: false }).addTo(quietLayer).bindTooltip(r.title, { className: 'sb-tip', direction: 'top' });
        });
      }
      var card = els.timeline.querySelector('.tl-day[data-day="' + i + '"]');
      if (card) card.classList.add('is-in');
    });
    fillSummary();
    els.summary.hidden = false; els.summary.classList.add('is-in');
  }

  /* ============================================================
     ТИПОГРАФ статуса (стриминг ChatGPT с курсором)
     ============================================================ */
  function typeStatus(text, done) {
    if (REDUCED) { els.statusText.textContent = text; if (done) done(); return; }
    els.statusText.textContent = '';
    var i = 0;
    (function step() {
      if (i > text.length) { if (done) done(); return; }
      els.statusText.textContent = text.slice(0, i); i++;
      later(step, 16);
    })();
  }
  function showStatus(on) { els.status.hidden = !on; }
  function setCounter(txt) { if (txt == null) { els.counter.hidden = true; } else { els.counter.hidden = false; els.counter.textContent = txt; } }

  /* ============================================================
     СЦЕНА AI-СБОРКИ — единый конечный автомат
     ============================================================ */
  // Сначала тянем прогноз погоды, затем запускаем сцену (дни раскладываются по погоде)
  function build() {
    if (state.building) return;
    state.building = true;
    var days = computeDays();
    els.build.disabled = true; els.rebuild.hidden = true;
    showStatus(true); typeStatus(T('Смотрю прогноз погоды…'));
    fetchTripWeather(els.startDate.value, days).then(function (w) {
      state.weather = w; state.building = false; runBuild(days);
    }).catch(function () { state.weather = null; state.building = false; runBuild(days); });
  }
  function runBuild(days) {
    if (state.building) return;
    resetScene();
    state.building = true;
    state.phase = 'building';
    state.days = days;
    state.plan = buildPlan(state.days, activeVibes(), state.area);
    els.build.disabled = true;
    els.rebuild.hidden = true;
    els.summary.hidden = true; els.summary.classList.remove('is-in');
    renderTimelineShell();

    if (REDUCED) { finishInstant(); return; }

    els.skip.hidden = false;
    showStatus(true);

    // ФАЗА 1 — сканирование
    typeStatus(T('Читаю точки Бали…'));
    var order = SB_LOCATIONS.slice();
    order.forEach(function (loc, k) {
      later(function () {
        var el = pinEl(loc.id); if (!el) return;
        el.classList.remove('is-pulse'); void el.offsetWidth; el.classList.add('is-pulse');
      }, 120 + k * 55);
    });

    // ФАЗА 2 — рассуждение (паутина связей)
    var t2 = 120 + order.length * 55 + 260;
    later(function () { typeStatus(T('Группирую по географии…')); drawWeb(); }, t2);
    later(function () { typeStatus(T('Считаю переезды…')); }, t2 + 850);
    later(function () { typeStatus(T('Оптимизирую дни…')); }, t2 + 1650);
    later(function () { webLayer.clearLayers(); if (map.hasLayer(webLayer)) map.removeLayer(webLayer); }, t2 + 2350);

    // ФАЗА 3 — сборка по дням
    var beat = state.days <= 5 ? 880 : (state.days <= 7 ? 760 : (state.days <= 12 ? 620 : 400));
    var t3 = t2 + 2500;
    state.plan.days.forEach(function (d, i) {
      later(function () { assembleDay(d, i, beat); }, t3 + i * beat);
    });

    // ФАЗА 4 — оседание
    later(function () { settle(); }, t3 + state.plan.days.length * beat + 260);
  }

  function assembleDay(d, i, beat) {
    setCounter(fmt('День {n} из {m}', { n: i + 1, m: state.plan.days.length }));
    if (d.kind === 'tour') {
      var latlngs = [];
      d.stops.forEach(function (s) {
        if (!locDays[s.loc.id]) locDays[s.loc.id] = [];
        if (locDays[s.loc.id].indexOf(i) === -1) locDays[s.loc.id].push(i);
        if (pins[s.loc.id].dayIndex === null) colorPin(s.loc.id, d.color, i);
        else { locDays[s.loc.id].push(i); } // делится с др. днём — цвет оставляем первого
        latlngs.push([s.loc.lat, s.loc.lng]);
      });
      drawRoute(i, latlngs, d.color, Math.min(beat * 0.9, 720));
      if (d.stops.length) markDayStart(d.stops[0].loc.id, i + 1, d.color);
    } else {
      // свободный день — тихие рекомендованные пины рядом
      if (!map.hasLayer(quietLayer)) quietLayer.addTo(map);
      d.zone.recs.forEach(function (r, k) {
        later(function () {
          var qicon = L.divIcon({ className: 'sb-pin-wrap', html: '<div class="sb-pin sb-pin--quiet"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
          var qm = L.marker([r.lat, r.lng], { icon: qicon, keyboard: false }).addTo(quietLayer);
          qm.bindTooltip(r.title + ' · ' + T('можно съездить сюда'), { direction: 'top', offset: [0, -8], className: 'sb-tip', opacity: 1 });
          var qel = qm.getElement() && qm.getElement().querySelector('.sb-pin');
          if (qel && !REDUCED) { qel.classList.add('is-pop'); }
        }, k * 90);
      });
    }
    revealDayCard(i);
  }

  function drawWeb() {
    if (!map.hasLayer(webLayer)) webLayer.addTo(map);
    var pts = SB_LOCATIONS;
    for (var n = 0; n < 14; n++) {
      var a = pts[(n * 5 + 1) % pts.length], b = pts[(n * 3 + 6) % pts.length];
      if (a === b) continue;
      (function (a, b, delay) {
        later(function () {
          var line = L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: '#191919', weight: 1, opacity: 0, dashArray: '2 5', interactive: false }).addTo(webLayer);
          animate(360, function (e) { line.setStyle({ opacity: 0.16 * (e < 0.5 ? e * 2 : (1 - e) * 2) }); });
        }, delay);
      })(a, b, n * 55);
    }
  }

  function settle() {
    setCounter(null);
    showStatus(false);
    var pts = [];
    state.plan.days.forEach(function (d) { if (d.kind === 'tour') d.stops.forEach(function (s) { pts.push([s.loc.lat, s.loc.lng]); }); });
    if (pts.length) map.flyToBounds(L.latLngBounds(pts), { padding: [50, 60], duration: 1.3, easeLinearity: 0.22, maxZoom: 11 });
    fillSummary();
    els.summary.hidden = false; requestAnimationFrame(function () { els.summary.classList.add('is-in'); });
    els.skip.hidden = true;
    els.rebuild.hidden = false;
    els.build.disabled = false;
    state.building = false;
    state.phase = 'done';
    setFocusDay(0);
  }

  function fillSummary() {
    var s = state.plan.stats;
    els.sumDays.textContent = s.days;
    els.sumStops.textContent = s.stops;
    els.sumKm.textContent = '~' + s.km;
    if (s.budget > 0) {
      els.sumBudget.textContent = '$' + s.budget;
      els.sumBudgetNote.textContent = s.ask ? fmt('туры · +{n} по запросу', { n: s.ask }) : T('туры на человека');
    } else {
      els.sumBudget.textContent = T('по запросу');
      els.sumBudgetNote.textContent = fmt('{n} туров', { n: s.ask });
    }
    updatePlanWa();
  }

  /* ---------- Кнопка «весь план в WhatsApp» ---------- */
  var SB_WA_PHONE = '6285333685020';
  var SITE_URL_BASE = 'https://www.sbexcursion.com';
  function dmy(iso) { if (!iso) return ''; var p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; }
  function optText(sel) { return sel && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text.trim() : ''; }
  function buildWaMessage() {
    var p = state.plan; if (!p) return '';
    var start = els.startDate.value;
    var L = [];
    L.push(T('Мой AI-план по Бали — SB Excursions'));
    L.push('');
    L.push('📅 ' + dmy(start) + ' – ' + dmy(els.endDate.value) + ' · ' + p.stats.days + ' ' + T('дней'));
    L.push('📍 ' + [optText(els.areaSelect), optText(els.groupSelect), optText(els.budgetSelect)].filter(Boolean).join(' · '));
    L.push('');
    p.days.forEach(function (d, i) {
      var date = start ? dmy(isoAddDays(start, i)) : '';
      var wx = d.wx ? '  ' + d.wx.icon + ' ' + d.wx.tmax + '°' : '';
      if (d.kind === 'tour') {
        L.push('▶ ' + T('День') + ' ' + (i + 1) + (date ? ' · ' + date : '') + wx);
        L.push('🎟 ' + d.tour.name + ' — ' + d.tour.price);
        d.stops.forEach(function (s) { L.push('   ' + s.time + '  ' + T(s.loc.name)); });
      } else {
        L.push('☕ ' + T('День') + ' ' + (i + 1) + (date ? ' · ' + date : '') + wx + ' — ' + T('Свободный день') + ' · ' + T(d.zone.name));
        d.zone.recs.forEach(function (r) { L.push('   • ' + r.title); });
      }
      L.push('');
    });
    L.push('— — —');
    L.push('📊 ' + p.stats.stops + ' ' + T('точек маршрута') + ' · ~' + p.stats.km + ' ' + T('км'));
    L.push(T('Хочу забронировать эту поездку 🙌'));
    return L.join('\n');
  }
  function updatePlanWa() {
    if (!els.planWa) return;
    els.planWa.href = 'https://wa.me/' + SB_WA_PHONE + '?text=' + encodeURIComponent(buildWaMessage());
    if (els.planWaWrap) els.planWaWrap.hidden = false;
  }

  /* ---------- Финал без анимации (reduced-motion) ---------- */
  function finishInstant() {
    state.plan.days.forEach(function (d, i) {
      if (d.kind === 'tour') {
        var latlngs = [];
        d.stops.forEach(function (s) {
          if (!locDays[s.loc.id]) locDays[s.loc.id] = [];
          locDays[s.loc.id].push(i);
          if (pins[s.loc.id].dayIndex === null) colorPin(s.loc.id, d.color, i);
          latlngs.push([s.loc.lat, s.loc.lng]);
        });
        var g = dayLayer[i] || (dayLayer[i] = L.layerGroup().addTo(map));
        L.polyline(latlngs, { color: d.color, weight: 3, opacity: 0.95, lineJoin: 'round' }).addTo(g);
        if (d.stops.length) markDayStart(d.stops[0].loc.id, i + 1, d.color);
      } else {
        if (!map.hasLayer(quietLayer)) quietLayer.addTo(map);
        d.zone.recs.forEach(function (r) {
          var qicon = L.divIcon({ className: 'sb-pin-wrap', html: '<div class="sb-pin sb-pin--quiet"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
          L.marker([r.lat, r.lng], { icon: qicon, keyboard: false }).addTo(quietLayer).bindTooltip(r.title, { className: 'sb-tip', direction: 'top' });
        });
      }
      var card = els.timeline.querySelector('.tl-day[data-day="' + i + '"]'); if (card) card.classList.add('is-in');
    });
    var pts = []; state.plan.days.forEach(function (d) { if (d.kind === 'tour') d.stops.forEach(function (s) { pts.push([s.loc.lat, s.loc.lng]); }); });
    if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [50, 60], maxZoom: 11 });
    fillSummary();
    els.summary.hidden = false; els.summary.classList.add('is-in');
    showStatus(false); setCounter(null);
    els.skip.hidden = true; els.rebuild.hidden = false; els.build.disabled = false;
    state.building = false; state.phase = 'done'; setFocusDay(0);
  }

  /* ---------- Пропустить: из любой фазы → корректный финал ---------- */
  function skip() {
    if (!state.building) return;
    clearTimers(); stopAnims();
    resetVisualsKeepPlan();
    finishInstant();
  }
  function resetVisualsKeepPlan() {
    Object.keys(pins).forEach(function (id) { var el = pinEl(id); if (el) { el.className = 'sb-pin sb-pin--sleep'; el.style.removeProperty('--pin'); el.style.opacity = ''; } });
    Object.keys(dayLayer).forEach(function (k) { map.removeLayer(dayLayer[k]); }); dayLayer = {}; locDays = {};
    quietLayer.clearLayers(); webLayer.clearLayers(); if (map.hasLayer(webLayer)) map.removeLayer(webLayer);
    els.timeline.querySelectorAll('.tl-day').forEach(function (c) { c.classList.remove('is-in'); });
  }

  /* ---------- Полный сброс сцены (перед новой сборкой) ---------- */
  function resetScene() {
    clearTimers(); stopAnims();
    resetPins();
    dayHidden = {};
    els.status.hidden = true; els.statusText.textContent = '';
    els.counter.hidden = true;
    els.summary.hidden = true; els.summary.classList.remove('is-in');
    if (els.planWaWrap) els.planWaWrap.hidden = true;
    state.building = false;
  }

  /* ---------- Пересобрать ---------- */
  function rebuild() { state.variant = (state.variant || 0) + 1; map.fitBounds(SB_BALI_BOUNDS); build(); }

  /* ============================================================
     КАРТОЧКА МЕСТА
     ============================================================ */
  // Тур того дня плана, из которого открыли точку (у одного места может быть
  // «свой» тур в data.js, но бронировать надо тот, что стоит в этом дне).
  function dayTourOf(node) {
    var card = node && node.closest ? node.closest('.tl-day') : null;
    if (!card || !state.plan) return null;
    var di = parseInt(card.getAttribute('data-day'), 10);
    var d = state.plan.days[di];
    return d && d.kind === 'tour' ? d.tour : null;
  }
  function openPlace(loc, keepOpen, dayTour) {
    state.currentLoc = loc;
    state.currentTour = dayTour || SB_TOURS[loc.tour] || null;
    state.currentRec = null;
    // восстановить элементы, которые прячет карточка свободного места
    els.pcRating.parentElement.style.display = '';
    els.pcBook.style.display = ''; els.pcAdd.style.display = '';
    els.pcImg.src = loc.img; els.pcImg.alt = T(loc.alt || loc.name);
    els.pcBadge.hidden = !loc.topPick;
    els.pcCat.textContent = T(loc.cat);
    els.pcTitle.textContent = T(loc.name);
    els.pcRating.innerHTML = starRow(loc.rating);
    els.pcDesc.textContent = T(loc.desc);
    var t = state.currentTour;               // тур ДНЯ, если точку открыли из плана
    if (t) {
      els.pcTour.style.display = '';
      els.pcTourName.textContent = t.name;
      els.pcTourPrice.textContent = t.price;
      els.pcTourLink.href = t.link;
    } else { els.pcTour.style.display = 'none'; }
    els.pcMaps.href = loc.maps;
    // reset book
    els.pcBook.textContent = T('Забронировать'); els.pcBook.classList.remove('is-done'); els.pcBook.disabled = false;
    // add
    els.pcAdd.disabled = state.phase !== 'done';
    els.pcAdd.textContent = T('Добавить в текущий день');
    els.pcAdd.onclick = function () { addToDay(loc); };
    showCardOnMap(loc.lat, loc.lng, keepOpen);
  }

  /* ---------- Карточка места живёт поп-апом НАД точкой на карте ---------- */
  var placeCard = document.getElementById('placeCard');
  var placePopup = L.popup({
    className: 'sb-place-popup',
    maxWidth: 460, minWidth: 400, maxHeight: null,
    closeButton: false, autoClose: true, closeOnClick: true,
    autoPanPadding: [24, 28], offset: [0, -16], autoPan: true, keepInView: true
  });
  // На узких экранах карта лежит выше плана — подводим её в кадр,
  // иначе поп-ап откроется за пределами видимой области.
  function scrollMapIntoView() {
    if (window.innerWidth > 1180) return;
    var card = document.querySelector('.map-card');
    if (card) card.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
  }
  // Двигает карту так, чтобы поп-ап с карточкой целиком попал в кадр карты
  function fitPopupIntoMap() {
    var pop = document.querySelector('.sb-place-popup');
    var mapEl = els.map;
    if (!pop || !mapEl) return;
    var pr = pop.getBoundingClientRect(), mr = mapEl.getBoundingClientRect();
    var pad = 14, dx = 0, dy = 0;
    if (pr.height < mr.height) {
      if (pr.top < mr.top + pad) dy = pr.top - (mr.top + pad);
      else if (pr.bottom > mr.bottom - pad) dy = pr.bottom - (mr.bottom - pad);
    } else dy = pr.top - (mr.top + pad);        // карточка выше карты — прижимаем верх
    if (pr.left < mr.left + pad) dx = pr.left - (mr.left + pad);
    else if (pr.right > mr.right - pad) dx = pr.right - (mr.right - pad);
    if (dx || dy) map.panBy([dx, dy], { animate: !REDUCED, duration: 0.25 });
  }

  function showCardOnMap(lat, lng, keepOpen) {
    els.pcOverlay.hidden = true;                 // модалка больше не используется
    els.pcOverlay.classList.remove('is-open');
    // Ширина поп-апа подстраивается под карту: в узком эмбеде карточка
    // не должна вылезать за края фрейма
    var mapW = els.map ? els.map.clientWidth : 600;
    var mw = Math.max(280, Math.min(460, mapW - 64));
    placePopup.options.maxWidth = mw;
    placePopup.options.minWidth = Math.min(400, mw);
    scrollMapIntoView();
    // Открываем сразу — так карточка появляется всегда, не завися от события перелёта
    // карточка не должна быть ни шире экрана, ни выше самой карты
    placePopup.options.maxWidth = Math.min(460, Math.max(260, window.innerWidth - 44));
    var mapH = (els.map.getBoundingClientRect().height || 420);
    placeCard.style.maxHeight = Math.max(240, Math.round(mapH - 52)) + 'px';
    placePopup.setLatLng([lat, lng]).setContent(placeCard);
    placePopup.openOn(map);
    // высота карточки доезжает после отрисовки и загрузки фото — доводим несколько раз
    fitPopupIntoMap();
    requestAnimationFrame(fitPopupIntoMap);
    later(fitPopupIntoMap, 160);
    later(fitPopupIntoMap, 420);
    if (els.pcImg && !els.pcImg.complete) els.pcImg.addEventListener('load', fitPopupIntoMap, { once: true });
    if (keepOpen || REDUCED) return;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 11), { duration: 0.8 });
    map.once('moveend', fitPopupIntoMap);        // после перелёта доводим карточку целиком в кадр
    later(fitPopupIntoMap, 900);
  }
  // Leaflet при закрытии выдёргивает контент из DOM — возвращаем карточку домой,
  // иначе document.getElementById её больше не находит.
  map.on('popupclose', function (e) {
    if (e.popup === placePopup && placeCard && placeCard.parentNode !== els.pcOverlay) {
      els.pcOverlay.appendChild(placeCard);
    }
  });
  function isCardOpen() { return !!(placePopup && placePopup.isOpen && placePopup.isOpen()); }
  function closePlace() { map.closePopup(placePopup); }
  // Карточка места свободного дня — большое фото + описание + Google Maps
  function openFreeRec(rec) {
    state.currentLoc = null;
    state.currentRec = rec;
    els.pcImg.src = rec.img; els.pcImg.alt = rec.title;
    els.pcBadge.hidden = !rec.topPick;
    els.pcCat.textContent = T('Место для свободного дня');
    els.pcTitle.textContent = rec.title;
    els.pcRating.parentElement.style.display = 'none';
    els.pcDesc.textContent = T(rec.copy);
    els.pcTour.style.display = 'none';
    els.pcMaps.href = rec.maps;
    els.pcBook.style.display = 'none'; els.pcAdd.style.display = 'none';
    showCardOnMap(rec.lat, rec.lng);
  }
  // Бронь = реальная заявка в WhatsApp по конкретному месту/туру (раньше кнопка
  // только меняла надпись, и клиент думал, что заявка ушла).
  els.pcBook.addEventListener('click', function () {
    var loc = state.currentLoc;
    if (!loc) return;
    var tour = state.currentTour || SB_TOURS[loc.tour];
    var lines = [T('Здравствуйте! Пишу из AI-планировщика SB Excursions.')];
    if (tour) {
      lines.push('');
      lines.push('🎟 ' + tour.name + (tour.price ? ' — ' + tour.price : ''));
      lines.push('📍 ' + T('Интересует место') + ': ' + T(loc.name));
      lines.push(SITE_URL_BASE + tour.link);
    } else {
      lines.push('');
      lines.push('📍 ' + T('Интересует место') + ': ' + T(loc.name));
    }
    if (els.startDate.value) {
      lines.push('');
      lines.push('📅 ' + dmy(els.startDate.value) + (els.endDate.value ? ' – ' + dmy(els.endDate.value) : ''));
      lines.push('👥 ' + optText(els.groupSelect));
    }
    lines.push('');
    lines.push(T('Подскажите, пожалуйста, свободные даты и цену.'));
    var w = window.open('https://wa.me/' + SB_WA_PHONE + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    if (!w) return;                                  // блокировщик popup — кнопку не гасим
    els.pcBook.textContent = T('Заявка отправлена'); els.pcBook.classList.add('is-done'); els.pcBook.disabled = true;
  });
  els.pcClose.addEventListener('click', closePlace);
  els.pcBackdrop.addEventListener('click', closePlace);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isCardOpen()) closePlace(); });

  function addToDay(loc) {
    if (state.phase !== 'done') return;
    var i = state.focusDay;
    var d = state.plan.days[i];
    if (!d || d.kind !== 'tour') { // ищем ближайший тур-день
      i = state.plan.days.findIndex(function (x) { return x.kind === 'tour'; });
      if (i < 0) return; d = state.plan.days[i]; setFocusDay(i);
    }
    if (d.stops.some(function (s) { return s.loc.id === loc.id; })) { els.pcAdd.textContent = T('Уже в этом дне'); return; }
    d.stops.push({ loc: loc, time: 'доп.', note: 'Добавлено вами' });
    // пин + продление маршрута
    if (!locDays[loc.id]) locDays[loc.id] = [];
    if (locDays[loc.id].indexOf(i) === -1) locDays[loc.id].push(i);
    if (pins[loc.id].dayIndex === null) colorPin(loc.id, d.color, i);
    if (dayLayer[i]) { map.removeLayer(dayLayer[i]); delete dayLayer[i]; }
    var latlngs = d.stops.map(function (s) { return [s.loc.lat, s.loc.lng]; });
    drawRoute(i, latlngs, d.color, 500);
    // перерисовать карточку дня
    var card = els.timeline.querySelector('.tl-day[data-day="' + i + '"]');
    if (card) {
      var tmp = document.createElement('div'); tmp.innerHTML = dayCardHTML(d, i);
      var fresh = tmp.firstChild; card.replaceWith(fresh); rebindDayCard(fresh, i); fresh.classList.add('is-in');
    }
    // обновить статистику
    state.plan.stats = computeStats(state.plan.days, state.days);
    fillSummary();
    els.pcAdd.textContent = T('Добавлено') + ' ✓';
    els.pcAdd.disabled = true;
  }
  function rebindDayCard(card, i) {
    card.querySelectorAll('.tl-stop').forEach(function (node) { node.addEventListener('click', function () { var l = LOC[node.getAttribute('data-loc')]; if (l) openPlace(l, false, dayTourOf(node)); }); });
    card.querySelectorAll('.tl-tool').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var di = parseInt(btn.getAttribute('data-day'), 10);
        var tool = btn.getAttribute('data-tool');
        if (tool === 'focus') focusDay(di);
        else if (tool === 'swap') swapDayTour(di);
        else toggleDay(di, btn);
      });
    });
    card.addEventListener('click', function () { setFocusDay(i); });
    if (state.focusDay === i) card.classList.add('is-focus');
  }

  /* ============================================================
     КОНТРОЛЫ (чипы дней/вайбов, кнопки)
     ============================================================ */
  // Интересы (множественный выбор) → вайбы точек
  SB_INTERESTS.forEach(function (it) {
    var b = document.createElement('button');
    b.className = 'chip'; b.setAttribute('data-interest', it.id);
    b.setAttribute('data-t', ''); b.setAttribute('data-src', it.label);
    b.textContent = T(it.label);
    b.addEventListener('click', function () {
      if (state.interests[it.id]) { delete state.interests[it.id]; b.classList.remove('is-active'); }
      else { state.interests[it.id] = true; b.classList.add('is-active'); }
    });
    els.interestChips.appendChild(b);
  });

  // Дропдауны: район / компания / бюджет
  els.areaSelect.addEventListener('change', function () { state.area = els.areaSelect.value; });
  els.groupSelect.addEventListener('change', function () { state.group = els.groupSelect.value; });
  els.budgetSelect.addEventListener('change', function () { state.budget = els.budgetSelect.value; });
  state.area = els.areaSelect.value;
  state.group = els.groupSelect.value;
  state.budget = els.budgetSelect.value;

  // Даты по умолчанию: сегодня … +4 дня (5 дней)
  function ymd(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  (function () {
    var today = new Date(); var end = new Date(today.getTime() + 4 * 86400000);
    els.startDate.value = ymd(today); els.endDate.value = ymd(end);
    els.startDate.min = ymd(today); els.endDate.min = ymd(today);
    els.startDate.addEventListener('change', function () {
      if (els.endDate.value && els.endDate.value < els.startDate.value) els.endDate.value = els.startDate.value;
      els.endDate.min = els.startDate.value;
    });
  })();

  els.build.addEventListener('click', function () { state.variant = 0; build(); });
  els.skip.addEventListener('click', skip);
  els.rebuild.addEventListener('click', rebuild);

  /* ---------- Переключатель языков ---------- */
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  var langCur = document.getElementById('langCur');
  function closeLangMenu() { langMenu.hidden = true; langBtn.setAttribute('aria-expanded', 'false'); }
  function relang(lang) {
    if (!lang || lang === state.lang) { closeLangMenu(); return; }
    state.lang = lang;
    langCur.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-item').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-lang') === lang); });
    applyStaticI18n();
    if (state.plan && state.phase === 'done') {
      var hiddenSnapshot = dayHidden;          // renderTimelineShell обнуляет dayHidden
      renderTimelineShell();
      dayHidden = hiddenSnapshot;              // — возвращаем, иначе скрытые дни «оживают»
      els.timeline.querySelectorAll('.tl-day').forEach(function (c) { c.classList.add('is-in'); });
      Object.keys(dayHidden).forEach(function (k) {
        if (!dayHidden[k]) return;
        var card = els.timeline.querySelector('.tl-day[data-day="' + k + '"]');
        if (card) card.classList.add('is-hidden-day');
        var tb = card && card.querySelector('.tl-tool[data-tool="toggle"]');
        if (tb) { tb.textContent = T('Показать'); tb.classList.add('is-on'); }
      });
      setFocusDay(state.focusDay);
      fillSummary();
    }
    if (isCardOpen()) {
      if (state.currentLoc) openPlace(state.currentLoc, true, state.currentTour);
      else if (state.currentRec) openFreeRec(state.currentRec);   // карточка свободного места тоже переводится
    }
    closeLangMenu();
  }
  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = langMenu.hidden;
    langMenu.hidden = !willOpen; langBtn.setAttribute('aria-expanded', String(willOpen));
  });
  document.querySelectorAll('.lang-item').forEach(function (b) {
    b.addEventListener('click', function () { relang(b.getAttribute('data-lang')); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest || !e.target.closest('#langSwitch')) closeLangMenu(); });

  /* ---------- Инициализация ---------- */
  makePins();
  var urlLang = (location.search.match(/[?&]lang=(en|ru|zh|es|fr)(?:&|$)/) || [])[1];
  if (urlLang && urlLang !== 'ru') relang(urlLang);
  else applyStaticI18n();
})();

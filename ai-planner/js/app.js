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
      var el = pinEl(id); if (!el) return;
      el.className = 'sb-pin sb-pin--sleep';
      el.style.removeProperty('--pin');
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

  function buildPlan(days, vibes, area) {
    var tpls = SB_DAY_TEMPLATES.slice();
    var scored;
    if (vibes.length) {
      scored = tpls.map(function (t) {
        var m = t.vibes.filter(function (v) { return vibes.indexOf(v) !== -1; }).length;
        return { t: t, m: m };
      }).filter(function (x) { return x.m > 0; });
      scored.sort(function (a, b) { return b.m - a.m || a.t.order - b.t.order; });
      if (!scored.length) scored = tpls.map(function (t) { return { t: t, m: 1 }; });
    } else {
      scored = tpls.map(function (t) { return { t: t, m: 1 }; });
    }

    // Дни-туры vs свободные дни — как на главной: часть дней тур, остальные
    // свободные с рекомендациями (свободные дни есть всегда для поездки 2+ дней).
    // Оставляем хотя бы ~четверть дней (мин. 1) свободными — остальное под туры.
    var freeFloor = Math.max(1, Math.floor(days / 4));
    var tourCount = Math.min(mainTarget(days), days - freeFloor, scored.length);
    var chosen = scored.slice(0, tourCount).map(function (x) { return x.t; });
    // Тур на Manta Point предлагаем ВСЕГДА (как isPrimaryMantaTour на главной):
    // ставим его первым тур-днём + добираем лучшие по вайбу остальные слоты.
    var mantaTpl = tpls.filter(function (t) { return t.id === 'manta_day'; })[0];
    if (mantaTpl && tourCount >= 1 && chosen.indexOf(mantaTpl) === -1) {
      var others = scored.map(function (x) { return x.t; })
        .filter(function (t) { return t !== mantaTpl; })
        .slice(0, tourCount - 1);
      chosen = [mantaTpl].concat(others);
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
      var pool = tpls.filter(function (t) { return !chosenIds[t.id] && t.id !== 'manta_day'; })
        .sort(function (a, b) { return b.order - a.order; }); // новые/нишевые (высокий order) вперёд
      pool.sort(function (a, b) { return (b.id === 'sumbawa_day') - (a.id === 'sumbawa_day'); });
      var swapIn = pool.slice(0, reserve);
      if (swapIn.length) {
        var scoreOf = {};
        scored.forEach(function (x) { scoreOf[x.t.id] = x.m; });
        var mantaKeep = chosen.filter(function (t) { return t.id === 'manta_day'; });
        var rest = chosen.filter(function (t) { return t.id !== 'manta_day'; })
          .sort(function (a, b) { return (scoreOf[b.id] || 0) - (scoreOf[a.id] || 0); }); // худшие по вайбу — в конец
        rest = rest.slice(0, Math.max(0, rest.length - swapIn.length)); // отбрасываем худшие
        chosen = mantaKeep.concat(rest).concat(swapIn);
      }
    }
    chosen.sort(function (a, b) { return a.order - b.order; });
    var freeCount = days - chosen.length;

    // Итоговая последовательность: туры + свободные дни, распределённые ровно
    var rotation = areaZoneRotation(area || state.area);
    var seq = chosen.map(function (t) { return { kind: 'tour', tpl: t }; });
    if (freeCount > 0) {
      var zi = 0;
      var step = Math.max(1, Math.round((seq.length + freeCount) / (freeCount + 1)));
      for (var f = 0; f < freeCount; f++) {
        var zone = SB_FREE_ZONES.filter(function (z) { return z.id === rotation[zi % rotation.length]; })[0];
        zi++;
        var pos = Math.min(seq.length, (f + 1) * step + f);
        seq.splice(pos, 0, { kind: 'free', zone: zone });
      }
    }

    // Собираем дни с цветами и координатами
    var planDays = seq.slice(0, days).map(function (item, i) {
      var color = SB_DAY_COLORS[i % SB_DAY_COLORS.length];
      if (item.kind === 'tour') {
        var stops = item.tpl.stops.map(function (s) {
          var l = LOC[s.loc];
          return { loc: l, time: s.time, note: s.note };
        });
        return { kind: 'tour', title: item.tpl.title, tour: SB_TOURS[item.tpl.tour], color: color, stops: stops };
      }
      return { kind: 'free', zone: item.zone, color: color };
    });

    // Статистика
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
    return {
      days: planDays,
      stats: { days: days, stops: stops, km: Math.round(km / 5) * 5, budget: sum, ask: ask }
    };
  }

  /* ============================================================
     РЕНДЕР ТАЙМЛАЙНА
     ============================================================ */
  function starRow(rating) { return '<span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span> ' + rating.toFixed(1) + ' · Google maps'; }

  function dayTools(i) {
    return '<span class="tl-day-tools"><button class="tl-tool" data-tool="focus" data-day="' + i + '">' + esc(T('Фокус')) + '</button>' +
      '<button class="tl-tool" data-tool="toggle" data-day="' + i + '">' + esc(T('Скрыть')) + '</button></span>';
  }
  function dayCardHTML(d, i) {
    var num = esc(T('День')) + ' ' + (i + 1 < 10 ? '0' : '') + (i + 1);
    if (d.kind === 'free') {
      var recs = d.zone.recs.map(function (r) {
        return '<div class="free-rec">' +
          (r.img ? '<img class="free-rec-thumb" src="' + esc(r.img) + '" alt="' + esc(r.title) + '">' : '') +
          '<div class="free-rec-body"><div class="free-rec-name">' + esc(r.title) +
          (r.topPick ? ' <span class="top-pick">5&#9733; SB Top Pick</span>' : '') +
          '</div><div class="free-rec-copy">' + esc(T(r.copy)) + '</div></div>' +
          '<a class="mini-btn" href="' + esc(r.maps) + '" target="_blank" rel="noopener">Maps</a></div>';
      }).join('');
      return '<article class="tl-day tl-day--free" data-day="' + i + '" style="--day:' + d.color + '">' +
        '<div class="tl-day-head"><span class="day-num">' + num + '</span>' +
        '<span class="tl-day-title free-title">' + esc(T('Свободный день')) + ' · ' + esc(T(d.zone.name)) + '</span>' +
        dayTools(i) + '</div>' +
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
      '<span class="tl-day-title">' + esc(T(d.title)) + '</span>' +
      dayTools(i) + '</div>' +
      '<div class="tl-stops">' + stops + '</div>' + tour + '</article>';
  }

  var dayHidden = {};   // dayIndex -> true если скрыт

  function renderTimelineShell() {
    els.tlEmpty && (els.tlEmpty.style.display = 'none');
    els.timeline.innerHTML = state.plan.days.map(dayCardHTML).join('');
    dayHidden = {};
    // делегированные обработчики
    els.timeline.querySelectorAll('.tl-stop').forEach(function (node) {
      node.addEventListener('click', function () { var l = LOC[node.getAttribute('data-loc')]; if (l) openPlace(l); });
    });
    els.timeline.querySelectorAll('.tl-tool').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var di = parseInt(btn.getAttribute('data-day'), 10);
        if (btn.getAttribute('data-tool') === 'focus') focusDay(di);
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
  function build() {
    if (state.building) return;
    resetScene();
    state.building = true;
    state.phase = 'building';
    state.days = computeDays();
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
    state.building = false;
  }

  /* ---------- Пересобрать ---------- */
  function rebuild() { map.fitBounds(SB_BALI_BOUNDS); build(); }

  /* ============================================================
     КАРТОЧКА МЕСТА
     ============================================================ */
  function openPlace(loc, keepOpen) {
    state.currentLoc = loc;
    els.pcImg.src = loc.img; els.pcImg.alt = T(loc.alt || loc.name);
    els.pcBadge.hidden = !loc.topPick;
    els.pcCat.textContent = T(loc.cat);
    els.pcTitle.textContent = T(loc.name);
    els.pcRating.innerHTML = starRow(loc.rating);
    els.pcDesc.textContent = T(loc.desc);
    var t = SB_TOURS[loc.tour];
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
    els.pcOverlay.hidden = false;
    if (!keepOpen) requestAnimationFrame(function () { els.pcOverlay.classList.add('is-open'); });
  }
  function closePlace() {
    els.pcOverlay.classList.remove('is-open');
    var d = REDUCED ? 0 : 420; setTimeout(function () { els.pcOverlay.hidden = true; }, d);
  }
  els.pcBook.addEventListener('click', function () {
    els.pcBook.textContent = T('Заявка принята'); els.pcBook.classList.add('is-done'); els.pcBook.disabled = true;
  });
  els.pcClose.addEventListener('click', closePlace);
  els.pcBackdrop.addEventListener('click', closePlace);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !els.pcOverlay.hidden) closePlace(); });

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
    state.plan.stats.stops += 1;
    els.sumStops.textContent = state.plan.stats.stops;
    els.pcAdd.textContent = T('Добавлено') + ' ✓';
    els.pcAdd.disabled = true;
  }
  function rebindDayCard(card, i) {
    card.querySelectorAll('.tl-stop').forEach(function (node) { node.addEventListener('click', function () { var l = LOC[node.getAttribute('data-loc')]; if (l) openPlace(l); }); });
    card.querySelectorAll('.tl-tool').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.stopPropagation(); var di = parseInt(btn.getAttribute('data-day'), 10); if (btn.getAttribute('data-tool') === 'focus') focusDay(di); else toggleDay(di, btn); });
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

  els.build.addEventListener('click', build);
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
      renderTimelineShell();
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
    if (!els.pcOverlay.hidden && state.currentLoc) openPlace(state.currentLoc, true);
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

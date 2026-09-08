/* Разбор фразы в фильтры планировщика.
 *
 * Человек пишет одно предложение своими словами — «едем вдвоём на неделю в Убуд,
 * хотим водопады и красивые виды, бюджет средний» — и форма заполняется сама.
 *
 * ПОЧЕМУ ЗДЕСЬ НЕТ ЯЗЫКОВОЙ МОДЕЛИ. В форме всего двадцать значений: шесть
 * интересов, восемь районов, четыре состава, три диапазона бюджета. Сопоставить
 * фразу с двадцатью значениями — работа для словаря, а не для модели: словарь
 * отвечает мгновенно, работает без сети, ничего не стоит и никогда не выдумывает
 * несуществующий район. Модель понадобится там, где нужен диалог («а если сезон
 * дождей?»), и это отдельная задача с сервером.
 *
 * ЧИСЛА СЧИТАЕТ КОД, А НЕ СЛОВАРЬ. Иначе «100 долларов в день» читается как сто
 * дней: в слове «деньги» сидит «день», а в «понедельник» — «недел». Поэтому сначала
 * из фразы вырезаются денежные суммы вместе с хвостом «в день», и только потом
 * ищется длительность поездки.
 *
 * Словари лежат в js/lexicon.js — по одному на язык, собраны и проверены отдельно.
 */
(function (global) {
  "use strict";

  /* Приводим фразу к виду, в котором работает поиск подстрок:
     нижний регистр, ё → е (иначе «дёшево» не найдётся по «дешев»),
     дефисы и повторные пробелы схлопываются («нуса-дуа» = «нуса дуа»). */
  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[ё]/g, "е")
      .replace(/[–—]/g, "-")
      .replace(/[-_/]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* Слова-числа: длительность чаще пишут словом, чем цифрой. */
  var WORD_NUMBERS = {
    "один": 1, "одну": 1, "два": 2, "две": 2, "двое": 2, "три": 3, "трое": 3, "четыре": 4,
    "пять": 5, "шесть": 6, "семь": 7, "восемь": 8, "девять": 9, "десять": 10, "полторы": 1.5,
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "un": 1, "une": 1, "deux": 2, "trois": 3, "quatre": 4, "cinq": 5,
    "six_fr": 6, "sept": 7, "huit": 8, "neuf": 9, "dix": 10,
    "uno": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6, "siete": 7, "ocho": 8,
    "nueve": 9, "diez": 10, "eine": 1, "einen": 1, "zwei": 2, "drei": 3, "vier": 4, "fünf": 5,
    "funf": 5, "sechs": 6, "sieben": 7, "acht": 8, "neun": 9, "zehn": 10,
    "一": 1, "两": 2, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10,
  };

  var CURRENCY = "(?:\\$|usd|дол|бакс|eur|евро|€|rp|idr|рупи|元|美元|块)";
  /* «на человека», «в день», «за ночь» — хвост суммы, его тоже режем,
     иначе «в день» уедет в подсчёт длительности. */
  var MONEY_TAIL = "(?:\\s*(?:в|за|на|per|par|por|pro|au|a|每)\\s*(?:день|дня|сутки|ночь|ночи|человека|чел|day|night|person|jour|nuit|personne|dia|día|noche|persona|tag|nacht|person|天|晚|人))?";

  /* Достаём денежную сумму и одновременно вырезаем её из фразы. */
  function extractMoney(text) {
    var patterns = [
      new RegExp("(\\d[\\d\\s.,]*)\\s*" + CURRENCY + MONEY_TAIL, "gi"),
      new RegExp(CURRENCY + "\\s*(\\d[\\d\\s.,]*)" + MONEY_TAIL, "gi"),
    ];
    var amounts = [];
    var stripped = text;
    patterns.forEach(function (re) {
      stripped = stripped.replace(re, function (whole, num) {
        var n = parseFloat(String(num).replace(/[\s.,]/g, ""));
        /* Рупии считаем тысячами: 800 000 IDR это примерно $50. */
        if (/rp|idr|рупи/i.test(whole) && n > 1000) n = n / 16000;
        if (!isNaN(n) && n > 0) amounts.push(n);
        return " ";
      });
    });
    return { amounts: amounts, stripped: stripped };
  }

  /* Длительность: число рядом со словом «день/неделя/ночь».
     Ищем ТОЛЬКО в тексте, из которого уже вырезаны суммы. */
  function extractDays(text, dayWords, weekWords) {
    var words = text.split(" ");
    var found = null;

    function numberAt(i) {
      for (var back = 1; back <= 3 && i - back >= 0; back++) {
        var w = words[i - back];
        if (/^\d+$/.test(w)) return parseInt(w, 10);
        if (WORD_NUMBERS[w] != null) return WORD_NUMBERS[w];
        /* «на 10 дней»: между числом и словом бывает предлог, но не больше двух слов. */
        if (back === 1 && !/^(на|за|в|for|pour|por|para|für|fur|about|около|примерно)$/.test(w)) break;
      }
      return null;
    }

    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var isWeek = weekWords.some(function (t) { return w.indexOf(t) === 0; });
      var isDay = dayWords.some(function (t) { return w.indexOf(t) === 0; });
      if (!isWeek && !isDay) continue;
      var n = numberAt(i);
      if (n == null) {
        /* «на неделю» без числа — это одна неделя; «на выходные» — три дня. */
        if (isWeek) { found = 7; break; }
        continue;
      }
      found = isWeek ? Math.round(n * 7) : Math.round(n);
      break;
    }
    if (found == null) return null;
    return Math.max(1, Math.min(21, found));
  }

  /* Сумма → диапазон бюджета. Границы те же, что в форме: до $50, $50-120, выше. */
  function bandFromAmount(n) {
    if (n < 50) return "low";
    if (n <= 120) return "mid";
    return "high";
  }

  /* Ищем термины словаря как подстроки. Возвращаем не первое совпадение, а все:
     фраза может нести несколько интересов сразу. */
  function matchGroup(text, dict) {
    var hits = {};
    Object.keys(dict || {}).forEach(function (value) {
      var terms = dict[value] || [];
      for (var i = 0; i < terms.length; i++) {
        var t = normalize(terms[i]);
        if (t && text.indexOf(t) !== -1) {
          hits[value] = (hits[value] || 0) + 1;
        }
      }
    });
    return hits;
  }

  function bestOf(hits) {
    var best = null, top = 0;
    Object.keys(hits).forEach(function (k) {
      if (hits[k] > top) { top = hits[k]; best = k; }
    });
    return best;
  }

  /* Главная функция. Возвращает то, что удалось понять, и ничего не выдумывает:
     поле, для которого нет сигнала, просто отсутствует в ответе. */
  function parse(rawText, lang) {
    var LEX = global.SB_LEXICON || {};
    var lex = LEX[lang] || LEX.en || null;
    if (!lex) return { fields: {}, interests: [], confidence: 0 };

    var text = normalize(rawText);
    if (!text) return { fields: {}, interests: [], confidence: 0 };

    var money = extractMoney(text);
    var textNoMoney = normalize(money.stripped);

    var fields = {};
    var interestHits = matchGroup(text, lex.interests);
    var interests = Object.keys(interestHits);

    var area = bestOf(matchGroup(text, lex.area));
    if (area) fields.area = area;

    var group = bestOf(matchGroup(text, lex.group));
    if (group) fields.group = group;

    /* Сумма важнее слов: «люкс, но до 40 долларов» — верим числу. */
    if (money.amounts.length) {
      fields.budget = bandFromAmount(Math.max.apply(null, money.amounts));
    } else {
      var budget = bestOf(matchGroup(text, lex.budget));
      if (budget) fields.budget = budget;
    }

    var days = extractDays(textNoMoney, lex.dayWords || ["день", "дня", "дней", "day"], lex.weekWords || ["недел", "week"]);
    if (days) fields.days = days;

    /* Уверенность — доля заполненных полей. Показываем её человеку словами,
       а не числом: «понял: Убуд, вдвоём, неделя». */
    var filled = Object.keys(fields).length + (interests.length ? 1 : 0);
    return { fields: fields, interests: interests, confidence: filled / 5 };
  }

  global.SB_PARSE = { parse: parse, normalize: normalize, extractMoney: extractMoney, extractDays: extractDays };
})(window);

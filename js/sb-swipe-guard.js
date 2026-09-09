/* Вертикальный свайп по карусели больше не листает её.
 *
 * Симптом: на телефоне страница «ходит из стороны в сторону» при обычной
 * прокрутке. Виновника нашли ловушкой на style.transform — стек показал
 * hammer.min.js → t_slds_scrollImages: карусель Tilda двигает не свой
 * обработчик touchmove, а распознаватель жестов Hammer.
 *
 * Почему он срабатывал на вертикальном жесте. Распознаватель pan у Tilda
 * уже настроен на DIRECTION_HORIZONTAL, и это сбивает с толку: Hammer при
 * такой настройке берёт ТОЛЬКО горизонтальную составляющую и сравнивает её
 * с порогом, не глядя на вертикальную. Порог по умолчанию — 10 пикселей.
 * Палец, ведущий вниз на 180 пикселей с уклоном в 24, даёт |deltaX| = 24 >
 * 10, и жест объявляется горизонтальным паном.
 *
 * Два предыдущих подхода не работают, и это стоило проверки:
 *   - touch-action: pan-y запрещает горизонтальный пан браузеру, но Hammer
 *     слушает события сам и продолжает листать;
 *   - stopPropagation на touchmove (хоть с элемента, хоть с документа в
 *     фазе перехвата) тоже мимо: Hammer собирает жест из pointer-событий.
 *
 * Поэтому чиним там, где принимается решение. На panstart сравниваем оси:
 * если вертикальная больше, обрываем распознавание сессии — карусель не
 * шелохнётся, а страница прокручивается как обычно. Горизонтальный свайп
 * проходит нетронутым. Порог заодно поднят с 10 до 24 пикселей: столько
 * пальцем случайно не уводит, а осознанный свайп даёт втрое больше.
 */
(function () {
  "use strict";

  var THRESHOLD = 24;

  function tame(manager) {
    if (!manager || manager.__sbTamed || !manager.get) return;
    var pan = manager.get("pan");
    if (!pan) return;
    manager.__sbTamed = true;

    pan.set({ threshold: THRESHOLD });

    /* Главная правка — в самом тесте направления. Hammer при
       DIRECTION_HORIZONTAL сравнивает с порогом ТОЛЬКО горизонтальную
       составляющую и про вертикальную не спрашивает; добавляем условие,
       что горизонталь должна преобладать. Обрыв по panstart этого не
       заменяет: он срабатывает уже после решения, и диагональный жест
       (40 вбок, 140 вниз) успевал сдвинуть слайд — проверено. */
    if (typeof pan.directionTest === "function" && !pan.__sbDirection) {
      var origDirectionTest = pan.directionTest;
      pan.directionTest = function (input) {
        if (Math.abs(input.deltaY) > Math.abs(input.deltaX)) return false;
        return origDirectionTest.call(this, input);
      };
      pan.__sbDirection = true;
    }

    /* Подстраховка на случай, если внутренности Hammer изменятся и обёртка
       выше перестанет находить directionTest. */
    manager.on("panstart", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) manager.stop(true);
    });
  }

  /* Экземпляр на каждую карусель, а window.hammer хранит только последний
     созданный — проверено на главной: слайдеров два, в window попал один,
     и первый экран продолжал листаться. В свойствах элемента Tilda ссылку
     не оставляет, поэтому единственный надёжный способ достать все —
     обернуть сам конструктор и приручать каждый новый экземпляр.
     Оборачиваем через свойство: Hammer может ещё не существовать, когда
     этот файл выполняется, и тогда мы дождёмся его присвоения. */
  function wrap(Original) {
    if (!Original || Original.__sbWrapped) return Original;
    function Wrapped(el, opts) {
      var m = new Original(el, opts);
      try { tame(m); } catch (e) { /* сторож не должен ломать карусель */ }
      return m;
    }
    Wrapped.prototype = Original.prototype;
    for (var k in Original) if (Object.prototype.hasOwnProperty.call(Original, k)) Wrapped[k] = Original[k];
    Wrapped.__sbWrapped = true;
    return Wrapped;
  }

  var current = window.Hammer;
  try {
    Object.defineProperty(window, "Hammer", {
      configurable: true,
      get: function () { return current; },
      set: function (v) { current = wrap(v); },
    });
    if (current) current = wrap(current);
  } catch (e) {
    if (current) window.Hammer = wrap(current);
  }

  function scan() {
    if (window.hammer) tame(window.hammer);
  }

  /* Карусели инициализируются после загрузки страницы, часть блоков —
     ещё позже, поэтому одного прохода мало. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    scan();
  }
  window.addEventListener("load", scan);
  var tries = 0;
  var timer = setInterval(function () {
    scan();
    if (++tries >= 20) clearInterval(timer);
  }, 500);
})();

# МЕГА-ПРОМТ ДЛЯ CLAUDE CODE — sbexcursion.com, август 2026

> **Alex, как этим пользоваться.**
> Открой терминал в папке сайта (там, где лежит `sitemap.xml`), запусти `claude`, и вставь
> ВСЁ, что ниже линии «=== НАЧАЛО ПРОМТА ===». Целиком, одним куском.
> Не по частям — агенту нужен весь контекст сразу, иначе он начнёт додумывать.
>
> Работы тут на 3–6 часов агента. Он будет останавливаться и спрашивать в двух местах:
> про цены (ЧАСТЬ 3) и про отзывы (ЧАСТЬ 4). Это специально — там нельзя выдумывать.
>
> Если хочешь сделать только самое денежное — скажи агенту:
> «сделай ЧАСТЬ 0, ЧАСТЬ 1 и ЧАСТЬ 2, остальное пропусти». Это 80% результата за 20% времени.

=== НАЧАЛО ПРОМТА ===

Ты работаешь с сайтом **sbexcursion.com** — экскурсионное агентство на Бали (владелец Alex,
русский, партнёр на месте). Сайт — статический HTML, задеплоен на Vercel. Ты сейчас в корне
репозитория сайта.

Тебе даётся большое задание из 9 частей. **Выполняй их строго по порядку.** После каждой части
выводи короткий отчёт (сколько файлов тронул, что изменил) и переходи к следующей без вопросов,
кроме тех мест, где явно написано «ОСТАНОВИСЬ И СПРОСИ».

---

# ЧАСТЬ 0 — РАЗВЕДКА И ПРАВИЛА. НЕ ПРАВЬ НИЧЕГО, ПОКА НЕ СДЕЛАЕШЬ ЭТО

## 0.1 Проверь структуру своими глазами

Всё, что написано ниже про имена файлов, — это моё предположение. **Проверь его.** Выполни:

```bash
ls | head -50
ls bali-journal-guide-* | head -10
ls bali-tour-* | head -10
ls | wc -l
cat vercel.json 2>/dev/null | head -40
```

Ожидаемые паттерны:
- Журнал: `bali-journal-guide-<slug>.html` (EN), `bali-journal-guide-<slug>-<lang>.html` (ru/es/fr/zh)
- Туры: `bali-tour-<slug>.html` (EN), `bali-tour-<slug>-<lang>.html`
- Роутинг: `/bali/:lang/journal/:slug` и `/bali/:lang/tours/:slug` → соответствующий файл

**Если реальные имена другие — используй реальные и скажи мне об этом в отчёте.** Не подгоняй
файлы под мою схему, подгони мою схему под файлы.

## 0.2 Разбери один файл на части

Открой `bali-journal-guide-best-beaches-bali-crystal-clear-water.html` и найди в `<head>` все
места, где дублируется заголовок и описание. Их обычно **пять**:

1. `<title>`
2. `<meta name="description" content="...">`
3. `<meta property="og:title" content="...">`
4. `<meta property="og:description" content="...">`
5. Внутри `<script type="application/ld+json">` — поля `"headline"` и `"description"`

**Правило на всё задание: меняешь заголовок — меняешь во всех пяти местах.** Изменил только
`<title>` — считай, что не сделал ничего: Google видит расхождение и может подставить свой
вариант.

Убедись, что ты понял, как устроен `ld+json` на этом сайте (там `@graph` с массивом объектов).
Ты будешь его дописывать в ЧАСТИ 4.

## 0.3 Сделай точку отката

```bash
git status
git add -A && git commit -m "чекпоинт перед SEO-правками"
```

Если это не git-репозиторий — сделай копию папки. Дальше коммить после каждой части отдельно,
чтобы можно было откатить одну часть, не теряя остальные.

## 0.4 ЖЁСТКИЕ ПРАВИЛА. Нарушение любого = откатываем всю часть

1. **Никогда не выдумывай цену.** Ни в title, ни в description, ни в schema, ни в тексте.
   Если реальной цены нет — оставь `TODO-PRICE` и внеси страницу в список для Alex.
2. **Никогда не выдумывай отзыв, рейтинг или число отзывов** в разметке schema.org. См. ЧАСТЬ 4,
   там подробно почему это опасно.
3. **Не меняй URL, slug, имя файла, `<link rel="canonical">`, `hreflang`-альтернативы.** Любая
   правка тут ломает индексацию, которая уже наработана.
4. **Не трогай CSS, JS, вёрстку, переключатель языков, шапку, подвал.**
5. **Не трогай `bali-tour-nusa-penida-east-tour*.html`** — ни в одном языке. Это эталон, по
   которому переписаны все остальные. Он должен остаться нетронутым как контрольная группа.
6. **Каждая правка делается во всех 5 языках** (en/ru/es/fr/zh), если явно не написано иначе.
   Для не-английских — не дословный перевод, а нормальный текст на этом языке. Испанский и
   французский заголовки я даю ниже готовыми; русский и китайский пиши сам, но естественно.
7. **Длина `<title>` — 50–60 символов**, максимум 65. Google обрезает примерно на 600px.
8. **Длина `<meta description>` — 140–158 символов.** Короче — теряешь место, длиннее — обрежут.
9. **Суффикс ` | SB Excursions`**: сохраняй, только если весь title влезает в 60 символов вместе
   с ним. Если не влезает — **выкинь суффикс**. Бренд «SB Excursions» никто не ищет, он не
   приносит ни одного показа, а место съедает. Это осознанное изменение прошлой политики.
10. **Не переписывай тело статей** в ЧАСТЯХ 1–2. Там только `<head>`.
11. **Работай пачками по 5 файлов** (одна страница = 5 языков), после каждой пачки проверяй, что
    HTML не сломан, и коммить.
12. **Если сомневаешься — спроси, не угадывай.** Особенно на ценах и цифрах.

## 0.5 На каких данных всё это построено

Google Search Console, экспорт 3 августа 2026, период 17–31 июля (15 дней):

| Показатель | Значение |
|---|---|
| Клики / показы / позиция | 39 / 3310 / 18.8 |
| Статьи | 284 стр. · 2963 показа · 35 кликов · позиция 15.8 |
| Туры | 59 стр. · 292 показа · 3 клика · позиция 22.4 |
| Лучшая страница | `best-beaches-bali-crystal-clear-water` EN — 471 показ, 11 кликов, поз. 9.51 |
| Страниц на 1-й странице Google | 23 |
| Из них с нулём кликов | 23 (478 показов впустую) |
| Мобильные / десктоп | 1708 показов, 29 кликов, поз. 10.7 / 1577, 10 кликов, поз. 29.0 |
| Топ-запросы | clearest water in bali — 4.18 · bali clear water — 4.43 · bali lookout — 6.29 |

Главный вывод, из которого следует всё задание: **сайт уже ранжируется, но по нему не кликают,
а туры почти не ранжируются, потому что у них пустые заголовки.** Мы чиним CTR там, где позиции
уже есть, и чиним релевантность там, где её нет.

---

# ЧАСТЬ 1 — CTR-ФИКС: 14 СТРАНИЦ НА ПЕРВОЙ СТРАНИЦЕ GOOGLE С НУЛЁМ КЛИКОВ

Это самая доходная и самая дешёвая часть. Позиции уже завоёваны, менять надо одну строку.

Формат таблицы: язык · slug · позиция · показы · новый title.

### Приоритет 1 — делать первыми

**1. `bali-safety-scams-and-health` — EN — позиция 6.14 — 176 показов — 0 кликов**
Самая большая дыра на сайте. На 6-й позиции нормальный CTR 5–8%, то есть теряется ~10 кликов.
```
Is Bali Safe in 2026? 12 Common Scams and How to Avoid Them
```
Description (EN):
```
Taxi meters that never start, fake money changers, triple-priced tours. Here are the 12 scams that catch tourists in Bali in 2026, and exactly how to spot each one.
```
Перед вставкой **посчитай в статье, сколько скамов там реально описано.** Если не 12 — поставь
настоящее число. Заголовок с числом, которого нет в тексте, работает против тебя.

Остальные языки: адаптируй смысл, не переводи дословно. FR-версия обязательна — Франция даёт
123 показа и ноль кликов, при этом живой клиент оттуда уже писал.

**2. `best-viewpoints-bali-sunrise-cliffs-rice-terraces` — EN — позиция 13.79 — 95 показов**
```
12 Best Viewpoints in Bali for Sunrise, Cliffs and Rice Terraces
```
Отдельно: по запросу `bali lookout` сайт на позиции 6.29. Убедись, что слово **lookout** есть в
`<h1>` или в первом абзаце. Если нет — добавь естественно, одним предложением.

**3. `best-beach-clubs-bali-young-adults` — EN — позиция 21.37 — 41 показ**
```
15 Best Beach Clubs in Bali | Day Passes, Prices and Vibe
```
Запрос коммерческий. В тексте должны быть суммы day pass — если их нет, добавь **диапазонами**
(«day pass обычно 300–700k IDR»), не точными цифрами.

### Приоритет 2

**4. `where-to-stay-bali-first-time` — EN — позиция 9.10 — 30 показов**
```
Where to Stay in Bali for First-Timers | 7 Areas Compared
```

**5. `how-much-does-a-bali-trip-cost` — ZH — позиция 5.68 — 28 показов**
Китайский заголовок проверь отдельно: он не должен читаться как машинный перевод. Добавь число и
год (2026). Если китайский текст в целом выглядит машинным — скажи мне, это отдельная задача.

**6. `where-to-stay-bali-first-time` — ES — позиция 7.75 — 28 показов**
```
Dónde Alojarse en Bali | 7 Zonas Comparadas para Primera Vez
```

**7. `best-beach-clubs-bali-young-adults` — ES — позиция 7.85 — 20 показов**
```
15 Mejores Beach Clubs de Bali | Precios y Entradas de Día
```

**8. `best-temples-bali-cultural-sites` — EN — позиция 7.60 — 15 показов**
```
10 Best Temples in Bali | Dress Code, Fees and Best Times
```
Люди ищут практику: сколько стоит вход и что надеть. Проверь, что это есть в тексте.

### Приоритет 3

**9. `tour-schedule` — EN — позиция 8.00 — 14 показов**
```
Bali Tour Schedule & Availability | Daily Departures
```
Служебная страница, кликов почти не будет. Но её показы можно перенаправить — поставь оттуда
ссылки на 5–6 главных туров.

**10. `best-instagram-places-bali` — RU — позиция 7.23 — 13 показов**
```
20 самых фотогеничных мест Бали | Локации, время, как добраться
```
Русский рынок: 492 показа, 4 клика. Трафик дешёвый, туры не покупает. Не приоритет.

**11. `best-things-to-do-bali-for-couples` — ES — позиция 7.00 — 12 показов**
```
20 Cosas que Hacer en Bali en Pareja | Guía Romántica
```

**12. `best-waterfalls-bali-day-trips` — ES — позиция 7.45 — 11 показов**
```
12 Mejores Cascadas de Bali | Cómo Llegar y Precios
```

**13. `best-beaches-bali-crystal-clear-water` — FR — позиция 6.20 — 10 показов**
```
8 Plus Belles Plages de Bali à l'Eau Cristalline
```
⚠️ **EN-версию этой страницы НЕ ТРОГАЙ.** Она на позиции 9.51 и даёт 28% всех кликов сайта.
Правь только французскую.

**14. `why-book` — EN — позиция 7.70 — 10 показов**
```
Why Book Bali Tours Direct | Better Price Than the Platforms
```

## Как проверить, что ЧАСТЬ 1 сделана

```bash
grep -c "<title>" bali-journal-guide-bali-safety-scams-and-health*.html
grep -o "<title>[^<]*</title>" bali-journal-guide-bali-safety-scams-and-health*.html
```
Убедись, что в каждом файле ровно один `<title>` и что он новый. Затем проверь, что старый
текст нигде не остался:
```bash
grep -rl "старый заголовок" *.html
```

---

# ЧАСТЬ 2 — 21 СТРАНИЦА ТУРОВ: TITLE + DESCRIPTION

## Почему это нужно

Сравни два своих же тура:

| Файл | Title сейчас | Позиция |
|---|---|---|
| `sunset-cruise-bali` | `Sunset Cruise \| SB Excursions` | **49.8** |
| `nusa-penida-east-tour` | `Nusa Penida East Tour from Bali \| Diamond Beach & Atuh Beach` | **36.4** |

Один сайт, одна авторитетность. Разница только в том, что второй заголовок состоит из слов,
которые люди действительно вбивают в поиск. `Sunset Cruise` не совпадает ни с одним запросом:
ищут `bali sunset cruise`, `sunset dinner cruise bali`, `catamaran bali sunset`.

**Формула:** `[Что это] + [Где] | [Конкретика, которую ищут]`
Слово **Bali** обязательно в каждом. Название компании в конце — убрать (правило 0.4.9).

## Таблица. Приоритет 1 — есть показы, но сидит на 3–5 странице

**`bali-helicopter-scenic-tour`** · 33 показа · поз. 31.5
```
Bali Helicopter Tour | Scenic Flight over Uluwatu & the South Coast
```
```
Private Bali helicopter tour — 15 to 60 minute scenic flights over the Uluwatu cliffs, Nusa Dua and Benoa. Up to 4 passengers, hotel pickup included. Check availability on WhatsApp.
```

**`white-water-rafting`** · 25 показов · поз. 8.1
```
Bali White Water Rafting on the Ayung River | Ubud Day Trip
```
```
Class II–III rafting on the Ayung River near Ubud — 2 hours on the water, jungle gorge, waterfalls, lunch and hotel pickup included. Safe for beginners and kids from 7.
```

**`nusa-lembongan-ceningan-day-trip`** · 21 показ · поз. 31.0
```
Nusa Lembongan & Ceningan Day Trip from Bali | Yellow Bridge
```
```
Full-day Nusa Lembongan and Ceningan tour — Devil's Tear, the Yellow Bridge, Blue Lagoon and Dream Beach. Fast boat from Sanur, private guide, lunch and hotel pickup.
```

**`sunset-cruise-bali`** · 17 показов · поз. 49.8
```
Bali Sunset Cruise with Dinner | Private Catamaran from Benoa
```
```
Book a Bali sunset dinner cruise — private catamaran or shared boat from Benoa Harbour. Buffet dinner, live music and hotel pickup included. Departs 16:00, back by 21:00.
```

**`blue-lagoon-snorkeling`** · 16 показов · поз. 51.0
```
Blue Lagoon Snorkeling Tour Bali | Padang Bai Day Trip
```
```
Snorkel the Blue Lagoon and Tanjung Jepun at Padang Bai — calm shallow water, ideal for beginners and children. Private boat, gear, guide, lunch and hotel pickup included.
```

**`gili-island-tour`** · 16 показов · поз. 34.1
```
Gili Islands Day Trip from Bali | Snorkeling with Turtles
```
```
Fast boat to the Gili Islands from Bali with snorkeling at three islands, turtles at Gili Meno, lunch and hotel pickup. Day trip or overnight — private group only.
```

**`nusa-penida-east-tour`** · 16 показов · поз. 36.4 — ⛔ **НЕ ТРОГАТЬ. ЭТАЛОН.**

**`bali-unesco`** · 14 показов · поз. 37.4
```
Bali UNESCO Tour | Jatiluwih Rice Terraces & Subak Heritage
```
```
Visit Bali's UNESCO World Heritage sites — Jatiluwih rice terraces, the Subak irrigation system, Taman Ayun and Batukaru temple. Private car, guide and tickets included.
```

**`private-car-with-driver-bali`** · 13 показов · поз. 6.2
```
Private Car with Driver in Bali | Full Day, English-Speaking
```
```
Hire a private car with an English-speaking driver in Bali — 10 hours, air-conditioned car, petrol and parking included. You choose the route. Hotel pickup anywhere in the south.
```
Эта страница уже на 6-й позиции — самый близкий к деньгам тур. Ей отдельное внимание.

## Приоритет 2 — показы есть, но мало

**`nusa-penida-full-day-tour`** · 7 · поз. 30.6
```
Nusa Penida Full Day Tour | Kelingking Beach, West & East
```
```
See the best of Nusa Penida in one day — Kelingking Beach, Angel's Billabong, Broken Beach, Crystal Bay and Diamond Beach. Fast boat, private car, guide and lunch included.
```

**`sumbawa-whale-shark-snorkeling-trip`** · 6 · поз. 17.8
```
Swim with Whale Sharks in Sumbawa | Trip from Bali
```
```
Snorkel with wild whale sharks in Saleh Bay, Sumbawa. Early morning boat, guide, gear and photos included. Sightings are highest between November and April.
```

**`ubud-highlights-tour`** · 5 · поз. 30.4
```
Ubud Highlights Tour | Monkey Forest, Rice Terraces & Waterfall
```
```
Full-day private Ubud tour — Sacred Monkey Forest, Tegalalang rice terraces, Tegenungan waterfall and a coffee plantation. Private car, driver, tickets and pickup included.
```

**`fast-boat-transfer-bali`** · 4 · поз. 19.8
```
Fast Boat Bali to Gili & Lombok | Tickets + Hotel Transfer
```
```
Fast boat tickets from Bali to Gili Trawangan, Gili Air and Lombok, with hotel pickup on the Bali side. Daily departures from Padang Bai and Serangan. Fixed price, no queues.
```

**`bali-airport-transfer`** · 4 · поз. 49.8
```
Bali Airport Transfer (DPS) | Private Car, Fixed Price, 24/7
```
```
Private airport transfer from Bali Ngurah Rai (DPS) to any hotel in Kuta, Seminyak, Canggu, Ubud, Jimbaran or Nusa Dua. Driver meets you inside with a name sign. Free waiting if delayed.
```

**`dolphin-sunrise-city-tour`** · 3 · поз. 23.0
```
Lovina Dolphin Sunrise Tour | Wild Dolphins in North Bali
```
```
See wild dolphins at sunrise in Lovina, North Bali. Traditional jukung boat, 06:00 departure, plus Banjar hot springs and Gitgit waterfall on the way back. Hotel pickup included.
```

## Приоритет 3 — показов нет вообще

Ноль показов значит, что Google не понял, о чём страница. Новый title даёт ей шанс появиться.

**`mount-batur-sunrise-hike`**
```
Mount Batur Sunrise Trek | Volcano Hike with Breakfast, Bali
```
```
Hike Mount Batur for sunrise — 1.5 hours up in the dark with a guide and headlamp, breakfast cooked in volcanic steam at 1,717 m. Hotel pickup from 01:30. Beginner friendly.
```

**`mount-batur-sunrise-jeep-tour`**
```
Mount Batur Sunrise Jeep Tour | No Hiking, Bali Volcano
```
```
Watch sunrise over Mount Batur from a 4x4 jeep — no hiking required. Perfect with kids or older travellers. Black lava field, breakfast at the viewpoint, hotel pickup included.
```

**`nusa-penida-manta-rays-point`**
```
Snorkel with Manta Rays in Bali | Manta Point, Nusa Penida
```
```
Swim with wild manta rays at Manta Point, Nusa Penida — plus coral snorkeling at Crystal Bay and Gamat Bay. Boat, gear, guide and GoPro photos included. Sightings all year.
```

**`atv-quad-bikes`**
```
Bali ATV Quad Bike Ride | Jungle, Rice Fields & Waterfall Tunnel
```
```
Ride a quad bike through Bali's jungle trails, rice fields and the famous waterfall tunnel near Ubud. Single or tandem, full briefing, gear and hotel pickup included.
```

**`surf-lesson-experience`**
```
Bali Surf Lesson for Beginners | Canggu & Kuta Beach
```
```
Learn to surf in Bali with a certified local instructor — soft-top board, rash guard and 2 hours in the water. Beginner-friendly beach breaks in Canggu and Kuta. Most people stand up on day one.
```

**`tanah-lot-bedugul-tour`**
```
Tanah Lot & Bedugul Tour | Temples, Lake and Sunset, Bali
```
```
Private day tour to Ulun Danu Beratan on the lake, the Handara Gate, Jatiluwih rice terraces and sunset at Tanah Lot temple. Car, driver, tickets and hotel pickup included.
```

## Дополнительно по ЧАСТИ 2

- **Сверь новый title с реальным содержимым страницы.** Если в description написано «lunch
  included», а на странице обед не входит — исправь description, а не страницу. Обещание в
  выдаче, которого нет на странице, даёт отказ и роняет позицию.
- **Проверь `<h1>`.** Он должен содержать то же ключевое слово, что и title. Если `<h1>` —
  просто «Sunset Cruise», расширь до «Bali Sunset Cruise with Dinner».
- **Остальные туры сайта** (те, что не в списке — их около 13, включая `ubud-instagram-tour`,
  `east-bali-instagram-tour`, `gili-islands-getaway`, `north-bali-lovina-dolphins-tour`,
  `volcano-coastline-helicopter-ride`, `atv-ride-adventure`, `nusa-penida-west-tour`,
  `nusa-penida-private-day-tour-manta-snorkeling`, `mount-batur-sunrise-jeep-hot-spring`,
  `bali-instagram-highlights-tour`): применяй ту же формулу самостоятельно. Сначала посмотри, что
  на странице, потом пиши title. Выведи мне список того, что получилось, до вставки.

---

# ЧАСТЬ 3 — ЦЕНЫ. ЗДЕСЬ ОСТАНОВИСЬ И СПРОСИ

## Проблема

На страницах туров стоит «Price: Ask» или аналог. Из-за этого:
- Google не может показать цену в сниппете, а у конкурентов она есть
- нельзя сделать корректную разметку `Offer` (ЧАСТЬ 4)
- человек, который сравнивает 5 вкладок, закрывает ту, где цены нет

## Что делать

**Шаг 1.** Найди все места, где цена отсутствует:
```bash
grep -rl "Price: Ask" bali-tour-*.html
grep -rio "price[^<]\{0,40\}" bali-tour-sunset-cruise-bali.html | head -20
```

**Шаг 2.** Проверь, есть ли цена где-то ещё в репозитории — в JSON, в конфиге, в данных туров:
```bash
grep -rl "USD\|from \$\|IDR" --include=*.json --include=*.js . | head -20
```

**Шаг 3.** Составь файл `PRICES-TODO.md` в корне: список всех туров, где цены нет, по одному в
строке, в формате:
```
bali-helicopter-scenic-tour  |  from $____  |  (сейчас: Price: Ask)
```

**Шаг 4. ⛔ ОСТАНОВИСЬ И СПРОСИ.** Покажи Alex этот список и попроси проставить цифры. **Не
выдумывай ни одной цены, даже правдоподобной.** Это его бизнес, его маржа, и неверная цена в
выдаче — это либо потерянный клиент, либо убыток на сделке.

**Шаг 5 (после того, как Alex даст цифры).** Замени «Price: Ask» на `from $XX`, и добавь `from $XX`
в конец meta description там, где влезает в 158 символов. Формат — строго `from $75`, без
«starting at», без «only», без диапазона в сниппете.

---

# ЧАСТЬ 4 — SCHEMA.ORG НА СТРАНИЦАХ ТУРОВ. ВНИМАТЕЛЬНО, ЗДЕСЬ ЛОВУШКА

## Сначала важное предупреждение

У Alex есть файл со 102 отзывами к турам. **Эти отзывы написаны, а не собраны от реальных
клиентов.** Разметить их как `AggregateRating` — это прямое нарушение правил Google по review
snippets, и наказание за это не «звёздочки не покажут», а ручной санкцией по структурированным
данным на весь домен. Для сайта, который только начал ранжироваться, это катастрофа.

**Поэтому:**
- ✅ Ставим `Product` + `Offer` — цена, валюта, наличие. Это законно и даёт цену в сниппете.
- ❌ **НЕ ставим `AggregateRating` и `Review`,** пока отзывы не настоящие.
- Отзывы можно и нужно показывать на странице как текст — это помогает конверсии. Просто не
  оборачивать их в schema как подтверждённые рейтинги.

⛔ **ОСТАНОВИСЬ И СПРОСИ Alex:** «Есть ли реальные отзывы от настоящих клиентов — скриншоты
WhatsApp, отзывы с Google Maps, переписка? Если да, размечаем их. Если нет — ставлю только цену
без рейтинга, и это правильное решение.»

## Что вставлять

В существующий `ld+json` `@graph` на каждой странице тура добавь объект (пример для одного тура):

```json
{
  "@type": "Product",
  "@id": "https://sbexcursion.com/bali/en/tours/blue-lagoon-snorkeling#product",
  "name": "Blue Lagoon Snorkeling Tour Bali",
  "description": "<та же строка, что в meta description>",
  "image": ["https://sbexcursion.com/images/tours-real/blue-lagoon-snorkeling.jpg"],
  "brand": {"@type": "Organization", "name": "SB Excursions"},
  "offers": {
    "@type": "Offer",
    "url": "https://sbexcursion.com/bali/en/tours/blue-lagoon-snorkeling",
    "priceCurrency": "USD",
    "price": "ЦЕНА_ИЗ_ЧАСТИ_3",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-08-01"
  }
}
```

Правила:
- `price` — только число, без `$`, без «from». Если цены нет — **не вставляй блок `offers`
  вообще**, оставь `Product` без него. Пустая или выдуманная цена хуже отсутствующей.
- `@id` и `url` — с языковым префиксом текущей версии страницы.
- `image` — только те, что реально существуют: `/images/tours-real/<slug>.jpg`. Проверь
  `ls images/tours-real/ | head -40` перед вставкой. Несуществующая картинка = ошибка в Search
  Console.
- Для не-EN версий `name` и `description` — на языке страницы.
- Не ломай существующий `@graph`: добавляй объект в массив, не заменяй его.

## Проверка

После вставки прогони 2–3 страницы через валидатор:
```bash
python3 -c "
import json,re,sys
h=open('bali-tour-blue-lagoon-snorkeling.html',encoding='utf-8').read()
for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>',h,re.S):
    json.loads(m); print('ok', len(m))
"
```
Если JSON не парсится — Google просто игнорирует всю разметку страницы, включая ту, что была
раньше. Это худший исход, чем ничего не делать.

---

# ЧАСТЬ 5 — ВНУТРЕННИЕ ССЫЛКИ: 283 СТАТЬИ → ТУРЫ

## Логика

Статьи собирают 2963 показа, туры — 292. Вся авторитетность сайта сидит в журнале и никуда не
течёт. Внутренние ссылки — это способ перелить её на страницы, которые приносят деньги.

## Правила

- **3 ссылки на туры в каждой статье**, не больше. Больше выглядит как спам.
- Ссылки **внутри текста**, в осмысленном предложении, а не блоком «читайте также» в подвале.
  Ссылка в теле статьи весит в разы больше.
- Анкор — **название тура или запрос**, никогда не «здесь», «тут», «подробнее».
  Хорошо: `book a <a href="...">Blue Lagoon snorkeling tour</a> from Padang Bai`
  Плохо: `подробнее <a href="...">здесь</a>`
- URL строго: `/bali/<LANG>/tours/<tour-slug>` — язык совпадает с языком файла.
- **Сначала проверь, сколько ссылок на туры уже есть:**
  ```bash
  grep -o "/bali/en/tours/[a-z-]*" bali-journal-guide-<slug>.html | sort -u | wc -l
  ```
  Если 2 и больше — не трогай эту статью, там уже нормально.
- **Проверь, что slug существует**, прежде чем ставить ссылку:
  ```bash
  ls bali-tour-<slug>.html
  ```
  Ссылка на несуществующий тур = 404 на живом сайте. Это хуже, чем отсутствие ссылки.

## Карта: какая статья на какие туры ссылается

| Статья | Туры |
|---|---|
| `bali-itinerary-7-days-first-time` | private-car-with-driver-bali, nusa-penida-full-day-tour, mount-batur-sunrise-jeep-tour |
| `bali-safety-scams-and-health` | private-car-with-driver-bali, bali-airport-transfer, fast-boat-transfer-bali |
| `bali-visa-entry-requirements` | bali-airport-transfer, private-car-with-driver-bali, fast-boat-transfer-bali |
| `bali-with-kids-family-guide` | blue-lagoon-snorkeling, mount-batur-sunrise-jeep-tour, private-car-with-driver-bali |
| `best-beach-clubs-bali-young-adults` | sunset-cruise-bali, bali-instagram-highlights-tour, private-car-with-driver-bali |
| `best-beaches-bali-crystal-clear-water` | nusa-penida-east-tour, blue-lagoon-snorkeling, gili-island-tour |
| `best-budget-restaurants-bali-warungs` | ubud-highlights-tour, private-car-with-driver-bali, bali-instagram-highlights-tour |
| `best-instagram-places-bali` | bali-instagram-highlights-tour, ubud-instagram-tour, east-bali-instagram-tour |
| `best-places-to-visit-bali-first-time` | ubud-highlights-tour, nusa-penida-full-day-tour, tanah-lot-bedugul-tour |
| `best-temples-bali-cultural-sites` | tanah-lot-bedugul-tour, bali-unesco, ubud-highlights-tour |
| `best-things-to-do-bali-for-couples` | sunset-cruise-bali, bali-helicopter-scenic-tour, nusa-penida-east-tour |
| `best-time-to-visit-bali-month-by-month` | nusa-penida-manta-rays-point, sumbawa-whale-shark-snorkeling-trip, mount-batur-sunrise-hike |
| `best-viewpoints-bali-sunrise-cliffs-rice-terraces` | mount-batur-sunrise-hike, ubud-highlights-tour, nusa-penida-east-tour |
| `best-waterfalls-bali-day-trips` | ubud-highlights-tour, white-water-rafting, private-car-with-driver-bali |
| `first-time-in-bali-complete-guide` | private-car-with-driver-bali, ubud-highlights-tour, nusa-penida-full-day-tour |
| `how-much-does-a-bali-trip-cost` | private-car-with-driver-bali, nusa-penida-full-day-tour, bali-airport-transfer |
| `how-to-get-around-bali-transport-guide` | private-car-with-driver-bali, bali-airport-transfer, fast-boat-transfer-bali |
| `nusa-penida-complete-guide` | nusa-penida-full-day-tour, nusa-penida-east-tour, nusa-penida-manta-rays-point |
| `things-to-do-canggu-bali-guide` | surf-lesson-experience, atv-quad-bikes, private-car-with-driver-bali |
| `things-to-do-seminyak-bali-guide` | sunset-cruise-bali, bali-instagram-highlights-tour, private-car-with-driver-bali |
| `things-to-do-ubud-bali-complete-guide` | ubud-highlights-tour, white-water-rafting, atv-quad-bikes |
| `things-to-do-uluwatu-bali-guide` | surf-lesson-experience, bali-helicopter-scenic-tour, sunset-cruise-bali |
| `what-to-eat-in-bali-food-guide` | ubud-highlights-tour, private-car-with-driver-bali, bali-instagram-highlights-tour |
| `what-to-pack-for-bali` | blue-lagoon-snorkeling, mount-batur-sunrise-hike, nusa-penida-full-day-tour |
| `where-to-stay-bali-first-time` | bali-airport-transfer, private-car-with-driver-bali, ubud-highlights-tour |

Для статей, которых нет в таблице (более новые), подбери 3 тура по смыслу сам, но **только из
списка реально существующих файлов** `bali-tour-*.html`.

## Обратная ссылка

На каждой странице тура должна быть 1 ссылка обратно в журнал — на статью по теме. Это замыкает
связь и помогает Google понять кластер.

---

# ЧАСТЬ 6 — OG:IMAGE

## Проблема

Проверь:
```bash
grep -o 'og:image" content="[^"]*"' bali-journal-guide-best-beaches-bali-crystal-clear-water.html
```

Скорее всего там внешний адрес вида `https://live.staticflickr.com/...`. Это плохо по трём
причинам: чужой хостинг может отдать 404 в любой момент, картинка не под контролем, и при шеринге
в WhatsApp (главный канал Alex) превью может не подгрузиться вообще.

## Что сделать

1. Проверь, какие изображения есть локально: `ls images/tours-real/ && ls images/places/ | head`
2. Замени `og:image` на локальный абсолютный URL: `https://sbexcursion.com/images/...`
3. Для страниц туров — `/images/tours-real/<slug>.jpg`
4. Для статей — то изображение, что уже используется как hero на самой странице
5. Добавь, если нет: `<meta property="og:image:width" content="1200">` и `height="630"`.
   Без размеров WhatsApp и Telegram часто не показывают превью.
6. Если подходящей локальной картинки нет — **оставь как есть и внеси в отчёт.** Не подставляй
   случайную: неверная картинка в превью хуже отсутствующей.

---

# ЧАСТЬ 7 — 15 НОВЫХ СТАТЕЙ. КЛАСТЕР «ВОДА И ПЛЯЖИ»

## Почему именно эти темы

Топ-запросы сайта: `clearest water in bali` — позиция 4.18, `bali clear water` — 4.43,
`bali clear water beach` — 9.20. Google уже считает сайт авторитетом по теме «прозрачная вода и
пляжи Бали». Каждая новая статья внутри этой темы стартует с этого доверия, каждая статья на
новую тему стартует с нуля. Плюс все эти темы ведут на снорклинг-туры и Нуса-Пениду — то есть
кластер не про трафик, а про деньги.

## Технология

**Шаблон — лучший файл сайта.** Возьми `bali-journal-guide-best-beaches-bali-crystal-clear-water.html`
как структурную оболочку: скопируй, замени содержимое `<head>` и всё внутри `<main>`, оставь
шапку, подвал, CSS, переключатель языков нетронутыми. Так уже сделаны предыдущие 30 статей — эта
схема работает и не требует правки `vercel.json`.

Имя файла: `bali-journal-guide-<slug>.html` (EN) и `-<lang>.html` для остальных.

## Структура статьи — обязательна к соблюдению

- `<title>` 50–60 символов с числом · `<meta description>` 140–158 символов
- `<h1>` 6–12 слов, содержит ключевое слово
- Лид 1–2 предложения
- 3 «стат-пилюли»: например «9 spots compared», «From $35 pp», «Updated August 2026»
- **6–9 карточек** с картинкой, названием, 45–70 слов текста — это визуальное ядро страницы
- **4–6 разделов прозы** по 180–320 слов; минимум в одном должна быть сравнительная `<table>`
  или `<ul>` из 4+ пунктов
- **6–8 вопросов FAQ** — реальные вопросы, которые люди печатают, ответы 40–80 слов с цифрой
- 3–4 карточки туров, 3 связанных гида
- **4–8 внутренних ссылок**, минимум 2 из них на туры
- `ld+json` типа `BlogPosting` + `FAQPage` с теми же вопросами, что в тексте

## Тон

Прямой, на «ты»/второе лицо, тёплый, уверенный. Бренд Alex — **радикальная честность про цены и
разводы**. Главный страх туриста на Бали — что его обманут. Пиши как друг, который живёт на Бали
и говорит реальные цифры и реальные ловушки.

**Запрещено:** «nestled in», «hidden gem», «breathtaking», «must-visit», восклицательные знаки,
начало статьи со слов «Bali is», любое упоминание того, что это SEO-текст.

## ⚠️ Правило цен — не обсуждается

Никогда не пиши «этот оператор берёт $37». Пиши диапазонами с маркером:
«expect $30–45 per person in 2026», «locals pay around 300–400k IDR». Где не знаешь — скажи, от
чего зависит, а не угадывай.

## Список из 15 статей

| № | Заголовок (EN) | Целевой запрос | Ссылки на туры |
|---|---|---|---|
| 1 | 9 Best Snorkeling Spots in Bali With Clear Water and Easy Access | best snorkeling in bali | blue-lagoon-snorkeling, nusa-penida-manta-rays-point, gili-island-tour |
| 2 | Blue Lagoon Padang Bai: Full Guide (Prices, Best Time, What to Bring) | blue lagoon bali | blue-lagoon-snorkeling |
| 3 | Best Beaches in Nusa Penida for Swimming and Photos | nusa penida beaches | nusa-penida-west-tour, nusa-penida-east-tour, nusa-penida-full-day-tour |
| 4 | Swimming With Manta Rays in Bali: Manta Point Complete Guide | manta rays bali | nusa-penida-manta-rays-point, nusa-penida-private-day-tour-manta-snorkeling |
| 5 | Crystal Bay Nusa Penida: Snorkeling, Sunset and How to Get There | crystal bay nusa penida | nusa-penida-west-tour, nusa-penida-full-day-tour |
| 6 | Can You Swim in Bali? 10 Beaches With Calm, Safe Water | can you swim in bali | blue-lagoon-snorkeling, gili-island-tour |
| 7 | Snorkeling With Turtles in Bali: Where You Actually See Them | turtles bali snorkeling | gili-island-tour, gili-islands-getaway, blue-lagoon-snorkeling |
| 8 | Best Time of Year for Clear Water and Visibility in Bali | bali water visibility season | blue-lagoon-snorkeling, nusa-penida-manta-rays-point |
| 9 | Gili Islands vs Nusa Penida: Which Is Better for Snorkeling? | gili vs nusa penida | gili-island-tour, nusa-penida-full-day-tour |
| 10 | Bali Beaches Without Waves: Where to Take Kids Swimming | calm beaches bali kids | blue-lagoon-snorkeling, private-car-with-driver-bali |
| 11 | Best White Sand Beaches in Bali (And How to Reach Them) | white sand beaches bali | nusa-penida-east-tour, gili-island-tour |
| 12 | Amed and Tulamben: Bali's Best Snorkeling and Diving Coast | amed tulamben snorkeling | blue-lagoon-snorkeling, private-car-with-driver-bali |
| 13 | Menjangan Island: Bali's Best Coral Reef Day Trip | menjangan island bali | blue-lagoon-snorkeling |
| 14 | Best Beaches Near Canggu and Seminyak for Swimming | beaches near canggu | bali-instagram-highlights-tour, private-car-with-driver-bali |
| 15 | Best Beaches in Uluwatu and the Bukit Peninsula | uluwatu beaches | east-bali-instagram-tour, private-car-with-driver-bali |

## Связывание кластера

Каждая из 15 статей должна ссылаться на **2–3 другие статьи из этого же списка** и на
`best-beaches-bali-crystal-clear-water` (это ядро кластера, у него больше всего веса). Так они
поднимают друг друга. 15 статей на 15 разных тем не поднимут ничего — 15 статей вокруг одной темы,
связанных между собой, работают как одна большая.

## Порядок и языки

Делай по одной статье целиком (5 языков) и показывай мне результат, прежде чем идти дальше.
Сначала все 15 на EN. **Языки в порядке приоритета: EN → FR → ES.**
Обоснование: США дают 304 показа и 0 кликов, Великобритания 242 и 0, Франция 123 и 0 — это
платёжеспособные рынки, где сайт уже виден. Русский и китайский дают показы, но не покупают —
делай их в последнюю очередь или не делай вовсе.

## Картинки

Используй **только реально существующие файлы**. Проверь `ls images/places/` и
`ls images/tours-real/`. Если нужной картинки нет — возьми ближайшую подходящую из
существующих. **Никогда не выдумывай имя файла.**

---

# ЧАСТЬ 8 — SITEMAP, HREFLANG, ХАБЫ

После добавления новых статей:

1. **`sitemap.xml`** — добавить блок для каждого нового URL, по 5 языковых альтернатив
   (`<xhtml:link rel="alternate" hreflang="...">`) на каждый. Скопируй структуру существующего
   блока, не изобретай свою.
2. **Хаб-страницы журнала** — `bali-journal.html`, `bali-journal-ru.html`, `-es`, `-fr`, `-zh`:
   добавить карточку каждой новой статьи. Новая статья, на которую никто не ссылается изнутри
   сайта, индексируется в разы медленнее.
3. **hreflang на самих новых страницах** — все 5 версий должны ссылаться друг на друга и на себя.
   Проверь, что `x-default` указывает на EN.
4. **Проверь, что нет дублей** в sitemap: `grep -c "<loc>" sitemap.xml` и
   `grep -o "<loc>[^<]*" sitemap.xml | sort | uniq -d`

---

# ЧАСТЬ 9 — ФИНАЛЬНАЯ ПРОВЕРКА И ОТЧЁТ

## Обязательные проверки перед деплоем

```bash
# 1. Все ld+json валидны
for f in bali-tour-*.html bali-journal-guide-*.html; do
  python3 - "$f" <<'EOF'
import json,re,sys
p=sys.argv[1]; h=open(p,encoding='utf-8').read()
for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>',h,re.S):
    try: json.loads(m)
    except Exception as e: print("BROKEN JSON:",p,e)
EOF
done

# 2. Нет пустых или дублирующихся title
grep -o "<title>[^<]*</title>" bali-tour-*.html | sort | uniq -c | sort -rn | head -20

# 3. Нет title длиннее 65 символов
python3 -c "
import glob,re
for f in glob.glob('bali-*.html'):
    m=re.search(r'<title>(.*?)</title>',open(f,encoding='utf-8').read())
    if m and len(m.group(1))>65: print(len(m.group(1)),f,m.group(1)[:70])
"

# 4. Нет битых внутренних ссылок на туры
python3 -c "
import glob,re,os
bad=set()
for f in glob.glob('bali-journal-guide-*.html'):
    for s in re.findall(r'/bali/\w\w/tours/([a-z0-9-]+)',open(f,encoding='utf-8').read()):
        if not os.path.exists('bali-tour-%s.html'%s): bad.add((f,s))
for b in sorted(bad): print('404:',b)
"

# 5. Не осталось выдуманных цен
grep -rn "TODO-PRICE\|Price: Ask" bali-tour-*.html
```

## Отчёт, который выдай в конце

1. Сколько файлов изменено, по частям
2. **Список всего, что ты НЕ сделал и почему** — это самое важное в отчёте
3. Все места, где данные не сошлись с моим описанием (другие имена файлов, отсутствующие
   страницы, другая структура)
4. Список туров без цены (из ЧАСТИ 3)
5. Что нужно от Alex, чтобы закончить

---

# ЧЕГО НЕ ДЕЛАТЬ НИКОГДА

- ❌ Выдумывать цену, рейтинг, число отзывов, количество проданных туров
- ❌ Ставить `AggregateRating` на ненастоящие отзывы
- ❌ Трогать `bali-tour-nusa-penida-east-tour*.html` и EN-версию
  `bali-journal-guide-best-beaches-bali-crystal-clear-water.html`
- ❌ Менять URL, slug, canonical, hreflang, имена файлов
- ❌ Ставить ссылку на страницу, существование которой не проверил
- ❌ Массовый sed по всем файлам без проверки результата на одном
- ❌ Делать всё сразу без коммитов между частями
- ❌ Молча решать спорный вопрос — лучше спроси

# ПОРЯДОК И ВРЕМЯ

| Часть | Что даёт | Когда результат |
|---|---|---|
| 0 | безопасность | сразу |
| **1 — 14 заголовков статей** | **клики с уже завоёванных позиций** | **3–7 дней** |
| **2 — 21 тур** | **туры выходят со 3–5 страницы на 2-ю** | **2–4 недели** |
| 3 — цены | CTR + возможность разметки | 1–2 недели |
| 4 — schema | цена в сниппете | 2–3 недели |
| 5 — ссылки | рост туров за счёт веса журнала | 3–6 недель |
| 6 — og:image | превью в WhatsApp | сразу |
| 7 — 15 статей | новый трафик по кластеру | 1–3 месяца |
| 8 — sitemap | скорость индексации | 3–10 дней |

Если времени мало — ЧАСТИ 1 и 2 дают основную отдачу. Остальное можно делать неделями по частям.

=== КОНЕЦ ПРОМТА ===

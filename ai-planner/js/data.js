/* ============================================================
   SB Excursions — AI-планировщик Бали
   js/data.js — все данные страницы: реальные локации (lat/lng),
   реальные туры и цены SB Excursions, реальные фото и ссылки
   Google Maps, шаблоны дней и рекомендации свободных дней.
   Подключается обычным <script>, без модулей.
   ============================================================ */

/* Палитра дней — приглушённые фирменные акценты сайта.
   Живёт ТОЛЬКО на пинах, маршрутах и карточках дней. */
var SB_DAY_COLORS = ['#2f6bff', '#FF8562', '#7FA07A', '#A56B8A', '#C9A227', '#4E96A8'];

/* Вайбы — мягкое переупорядочивание весов, не жёсткий фильтр */
var SB_VIBES = [
  { id: 'volcano',   label: 'Вулканы'  },
  { id: 'beach',     label: 'Пляжи'    },
  { id: 'temple',    label: 'Храмы'    },
  { id: 'waterfall', label: 'Водопады' },
  { id: 'chill',     label: 'Чилл'     },
  { id: 'dive',      label: 'Дайвинг'  }
];

/* Реальные туры SB Excursions (имена и цены — как на сайте).
   link — реальная страница тура на sbexcursion.com. */
var SB_TOURS = {
  ubud_highlights: {
    name: 'Ubud Rice Terrace, Temple & Volcano Tour',
    price: 'from $70',
    link: '/bali/en/tours/ubud-highlights-tour',
    pickup: '08:00 hotel pickup',
    img: '../images/tours-real/ubud-highlights-tour.jpg'
  },
  batur_jeep_hot_spring: {
    name: 'Mount Batur Sunrise Jeep & Hot Spring',
    price: 'from $60',
    link: '/bali/en/tours/mount-batur-sunrise-jeep-hot-spring',
    pickup: '02:00–03:30 early pickup',
    img: '../images/tours-real/mount-batur-sunrise-jeep-hot-spring.jpg'
  },
  batur_sunrise: {
    name: 'Mount Batur Sunrise Jeep Tour',
    price: 'Ask Price',
    link: '/bali/en/tours/mount-batur-sunrise-jeep-tour',
    pickup: '02:00–03:30 early pickup',
    img: '../images/tours-real/mount-batur-sunrise-jeep-tour.jpg'
  },
  batur_sunrise_hike: {
    name: 'Mount Batur Sunrise Hike',
    price: 'from $35',
    link: '/bali/en/tours/mount-batur-sunrise-hike',
    pickup: '01:30–03:00 early pickup',
    img: '../images/tours-real/mount-batur-sunrise-hike.jpg'
  },
  temple_culture: {
    name: 'Temple and Culture Day',
    price: 'from $49',
    link: '/bali/en/tours/tanah-lot-bedugul-tour',
    pickup: '08:00–09:00 hotel pickup',
    img: '../images/tours-real/tanah-lot-bedugul-tour.jpg'
  },
  dolphin_sunrise_city_tour: {
    name: 'Lovina Dolphin Sunrise Tour',
    price: 'from $75',
    link: '/bali/en/tours/dolphin-sunrise-city-tour',
    pickup: '03:00 am hotel pickup',
    img: '../images/tours-real/dolphin-sunrise-city-tour.jpg'
  },
  east_bali_instagram_tour: {
    name: 'East Bali Instagram Tour',
    price: 'Ask Price',
    link: '/bali/en/tours/east-bali-instagram-tour',
    pickup: 'Morning hotel pickup',
    img: '../images/tours-real/east-bali-instagram-tour.jpg'
  },
  bali_unesco: {
    name: 'Bali UNESCO Heritage Sites Tour',
    price: 'from $70',
    link: '/bali/en/tours/bali-unesco',
    pickup: 'Morning hotel pickup',
    img: '../images/bali-tours/bali-unesco.jpg'
  },
  ubud_instagram_tour: {
    name: 'Ubud Instagram Tour',
    price: 'from $75',
    link: '/bali/en/tours/ubud-instagram-tour',
    pickup: '7:00 am hotel pickup',
    img: '../images/tours-real/ubud-instagram-tour.jpg'
  },
  white_water_rafting: {
    name: 'White Water Rafting',
    price: 'Ask Price',
    link: '/bali/en/tours/white-water-rafting',
    pickup: 'Morning or midday pickup',
    img: '../images/tours-real/white-water-rafting.jpg'
  },
  sunset_cruise_bali: {
    name: 'Sunset Cruise',
    price: 'Ask Price',
    link: '/bali/en/tours/sunset-cruise-bali',
    pickup: 'Late afternoon transfer',
    img: '../images/tours-real/sunset-cruise-bali.jpg'
  },
  surf_lesson_experience: {
    name: 'Surf Lesson Experience',
    price: 'Ask Price',
    link: '/bali/en/tours/surf-lesson-experience',
    pickup: 'Flexible session timing',
    img: '../images/tours-real/surf-lesson-experience.jpg'
  },
  nusa_penida_west_tour: {
    name: 'Nusa Penida West Tour',
    price: 'Ask Price',
    link: '/bali/en/tours/nusa-penida-west-tour',
    pickup: 'Early hotel pickup + harbor',
    img: '../images/tours-real/nusa-penida-west-tour.jpg'
  },
  nusa_penida_full_day_tour: {
    name: 'Nusa Penida Full Day Tour',
    price: 'Ask Price',
    link: '/bali/en/tours/nusa-penida-full-day-tour',
    pickup: 'Early hotel pickup + harbor',
    img: '../images/tours-real/nusa-penida-full-day-tour.jpg'
  },
  nusa_penida_manta_point: {
    name: 'Nusa Penida Snorkeling on Manta Point',
    price: 'from $29',
    link: '/bali/en/tours/nusa-penida-manta-rays-point',
    pickup: '06:00–07:00 hotel pickup',
    img: '../images/tours-real/nusa-penida-manta-rays-point.jpg'
  },
  blue_lagoon_snorkeling: {
    name: 'Blue Lagoon Snorkeling',
    price: 'Ask Price',
    link: '/bali/en/tours/blue-lagoon-snorkeling',
    pickup: 'Morning hotel pickup',
    img: '../images/tours-real/blue-lagoon-snorkeling.jpg'
  },
  spa_relax_day: {
    name: 'Spa and Relax Day',
    price: 'from $58',
    link: '/bali/en/tours/private-car-with-driver-bali',
    pickup: 'Гибкое время, трансфер',
    img: '../images/tours-real/private-car-with-driver-bali.jpg'
  },
  atv_quad_bikes: {
    name: 'ATV Quad Bikes',
    price: 'from $20',
    link: '/bali/en/tours/atv-quad-bikes',
    pickup: 'Утренний или дневной заезд',
    img: '../images/tours-real/atv-quad-bikes.jpg'
  },
  nusa_penida_east_tour: {
    name: 'Nusa Penida East Tour',
    price: 'from $75',
    link: '/bali/en/tours/nusa-penida-east-tour',
    pickup: 'Ранний забор + гавань',
    img: '../images/tours-real/nusa-penida-east-tour.jpg'
  },
  nusa_penida_private_day_tour_manta_snorkeling: {
    name: 'Nusa Penida Private Day Tour with Manta Snorkeling',
    price: 'Ask Price',
    link: '/bali/en/tours/nusa-penida-private-day-tour-manta-snorkeling',
    pickup: 'Ранний забор + гавань',
    img: '../images/tours-real/nusa-penida-private-day-tour-manta-snorkeling.jpg'
  },
  gili_island_tour: {
    name: 'Gili Island Tour',
    price: 'from $115',
    link: '/bali/en/tours/gili-island-tour',
    pickup: 'Ранний забор + быстрый катер',
    img: '../images/tours-real/gili-island-tour.jpg'
  },
  sumbawa_whale_shark_snorkeling_trip: {
    name: 'Sumbawa Whale Shark Snorkeling Trip',
    price: 'Ask Price',
    link: '/bali/en/tours/sumbawa-whale-shark-snorkeling-trip',
    pickup: 'Многодневный выезд с Бали',
    img: '../images/tours-real/sumbawa-whale-shark-snorkeling-trip.jpg'
  },
  bali_helicopter_scenic_tour: {
    name: 'Bali Helicopter Scenic Tour',
    price: 'Ask Price',
    link: '/bali/en/tours/bali-helicopter-scenic-tour',
    pickup: 'По записи, вертолётная площадка',
    img: '../images/tours-real/bali-helicopter-scenic-tour.jpg'
  },
  volcano_coastline_helicopter_ride: {
    name: 'Volcano and Coastline Helicopter Ride',
    price: 'Ask Price',
    link: '/bali/en/tours/volcano-coastline-helicopter-ride',
    pickup: 'По записи, вертолётная площадка',
    img: '../images/tours-real/volcano-coastline-helicopter-ride.jpg'
  }
};

/* ------------------------------------------------------------
   20 якорных локаций карты. Координаты реальные (lat/lng).
   img — реальные фото: локальные файлы сайта либо внешние
   хосты, которые сайт уже использует (commons.wikimedia.org,
   live.staticflickr.com, upload.wikimedia.org).
   maps — реальные ссылки Google Maps.
   ------------------------------------------------------------ */
var SB_LOCATIONS = [
  {
    "id": "ubud",
    "name": "Убуд",
    "lat": -8.5069,
    "lng": 115.2625,
    "cat": "Культура",
    "vibes": [
      "chill",
      "temple",
      "waterfall"
    ],
    "desc": "Художественное сердце Бали: Лес обезьян, дворец Убуда, галереи и джунглевые водопады в получасе езды.",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Ubud%20Palace%2C%20Bali%2C%20Indonesia%2C%2020220822%200906%209824.jpg?width=1280",
    "alt": "Лес обезьян в Убуде — тропический парк с храмами и макаками",
    "maps": "https://maps.google.com/?q=Ubud+Monkey+Forest",
    "rating": 4.8,
    "topPick": true,
    "tour": "ubud_highlights"
  },
  {
    "id": "tegallalang",
    "name": "Террасы Тегаллаланг",
    "lat": -8.4312,
    "lng": 115.2777,
    "cat": "Рисовые террасы",
    "vibes": [
      "chill"
    ],
    "desc": "Изумрудные ступени рисовых полей, качели над джунглями и дегустация кофе лювак на плантации.",
    "img": "../images/places/tegalalang-rice-terraces.jpg",
    "alt": "Рисовые террасы Тегаллаланг рядом с Убудом",
    "maps": "https://maps.google.com/?q=Tegalalang+Rice+Terrace",
    "rating": 4.7,
    "topPick": true,
    "tour": "ubud_highlights"
  },
  {
    "id": "batur",
    "name": "Вулкан Батур",
    "lat": -8.2422,
    "lng": 115.375,
    "cat": "Вулкан",
    "vibes": [
      "volcano"
    ],
    "desc": "Рассвет над кальдерой из открытого джипа, поля чёрной лавы и горячие источники у озера.",
    "img": "../images/tours-real/mount-batur-sunrise-jeep-tour.jpg",
    "alt": "Рассвет над вулканом Батур и кальдерой в Кинтамани",
    "maps": "https://maps.google.com/?q=Mount+Batur+Bali",
    "rating": 4.9,
    "topPick": false,
    "tour": "batur_jeep_hot_spring"
  },
  {
    "id": "kintamani",
    "name": "Кинтамани",
    "lat": -8.253,
    "lng": 115.3565,
    "cat": "Смотровая",
    "vibes": [
      "volcano",
      "chill"
    ],
    "desc": "Деревня на кромке кальдеры: панорама Батура, озеро и завтрак с самым вулканическим видом острова.",
    "img": "../images/places/mount-batur-sunrise-trek.jpg",
    "alt": "Панорама рассвета с гребня вулкана Батур, Кинтамани",
    "maps": "https://maps.google.com/?q=Kintamani+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "batur_sunrise"
  },
  {
    "id": "sekumpul",
    "name": "Водопад Секумпул",
    "lat": -8.1712,
    "lng": 115.1856,
    "cat": "Водопад",
    "vibes": [
      "waterfall"
    ],
    "desc": "Семь мощных струй, падающих в зелёный каньон, — самый впечатляющий водопад Бали.",
    "img": "../images/places/bali-waterfall.jpg",
    "alt": "Водопад в джунглях северного Бали",
    "maps": "https://maps.google.com/?q=Sekumpul+Waterfall",
    "rating": 4.8,
    "topPick": false,
    "tour": "dolphin_sunrise_city_tour"
  },
  {
    "id": "munduk",
    "name": "Мундук и озёра",
    "lat": -8.265,
    "lng": 115.0899,
    "cat": "Горы",
    "vibes": [
      "waterfall",
      "chill"
    ],
    "desc": "Прохладная горная деревня: озёра Братан и Тамблинган, храм Улун Дану и тропы среди гвоздичных рощ.",
    "img": "../images/bali-tours/unesco-ulun-danu.jpg",
    "alt": "Храм Улун Дану Братан на горном озере рядом с Мундуком",
    "maps": "https://maps.google.com/?q=Munduk+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "dolphin_sunrise_city_tour"
  },
  {
    "id": "tanah_lot",
    "name": "Танах-Лот",
    "lat": -8.6212,
    "lng": 115.0868,
    "cat": "Храм",
    "vibes": [
      "temple"
    ],
    "desc": "Морской храм на скале в волнах — визитная карточка Бали и один из лучших закатов острова.",
    "img": "../images/bali-tours/unesco-tanah-lot-sunset.jpg",
    "alt": "Храм Танах-Лот на скале в океане на закате",
    "maps": "https://maps.google.com/?q=Tanah+Lot+Temple",
    "rating": 4.8,
    "topPick": true,
    "tour": "temple_culture"
  },
  {
    "id": "canggu",
    "name": "Чангу",
    "lat": -8.6478,
    "lng": 115.1385,
    "cat": "Сёрф",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Столица сёрфа и кафе: пляж Бату-Болонг, бич-клубы и золотые закаты западного берега.",
    "img": "../images/places/surfing-in-canggu.jpg",
    "alt": "Сёрфер на волне у пляжа в Чангу",
    "maps": "https://maps.google.com/?q=Canggu+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "surf_lesson_experience"
  },
  {
    "id": "uluwatu",
    "name": "Улувату",
    "lat": -8.8291,
    "lng": 115.0849,
    "cat": "Храм",
    "vibes": [
      "temple",
      "beach"
    ],
    "desc": "Храм на 70-метровой скале над океаном, вечерний танец кечак и легендарные пляжи Букита.",
    "img": "../images/places/uluwatu-temple-cliff.jpg",
    "alt": "Храм Улувату на скале над океаном",
    "maps": "https://maps.google.com/?q=Uluwatu+Temple",
    "rating": 4.8,
    "topPick": true,
    "tour": "temple_culture"
  },
  {
    "id": "nusa_dua",
    "name": "Нуса-Дуа",
    "lat": -8.8067,
    "lng": 115.228,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Спокойные белые пляжи, брызги Waterblow на скалах и вечерние круизы из гавани Беноа.",
    "img": "https://live.staticflickr.com/4474/37781456082_9e2bc54082_b.jpg",
    "alt": "Волны Waterblow разбиваются о скалы в Нуса-Дуа",
    "maps": "https://maps.google.com/?q=Nusa+Dua+Beach",
    "rating": 4.7,
    "topPick": true,
    "tour": "sunset_cruise_bali"
  },
  {
    "id": "lempuyang",
    "name": "Лемпуянг — Врата рая",
    "lat": -8.3906,
    "lng": 115.6316,
    "cat": "Храм",
    "vibes": [
      "temple"
    ],
    "desc": "Знаменитые расколотые ворота с силуэтом вулкана Агунг — главное фото восточного Бали.",
    "img": "../images/tours-real/east-bali-instagram-tour.jpg",
    "alt": "Врата рая храма Лемпуянг с вулканом Агунг в проёме",
    "maps": "https://maps.google.com/?q=Lempuyang+Temple",
    "rating": 4.7,
    "topPick": false,
    "tour": "east_bali_instagram_tour"
  },
  {
    "id": "amed",
    "name": "Амед",
    "lat": -8.3364,
    "lng": 115.6631,
    "cat": "Снорклинг",
    "vibes": [
      "dive",
      "beach"
    ],
    "desc": "Чёрный вулканический песок, японский затонувший корабль и коралловые сады прямо у берега.",
    "img": "../images/tours-real/blue-lagoon-snorkeling.jpg",
    "alt": "Снорклинг над кораллами у восточного побережья Бали",
    "maps": "https://maps.google.com/?q=Amed+Beach+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "blue_lagoon_snorkeling"
  },
  {
    "id": "jatiluwih",
    "name": "Джатилувих",
    "lat": -8.3689,
    "lng": 115.1306,
    "cat": "Рисовые террасы",
    "vibes": [
      "chill"
    ],
    "desc": "Бескрайние рисовые террасы под охраной ЮНЕСКО у подножия горы Батукару.",
    "img": "../images/bali-tours/unesco-jatiluwih-hero.jpg",
    "alt": "Рисовые террасы Джатилувих — объект ЮНЕСКО на Бали",
    "maps": "https://maps.google.com/?q=Jatiluwih+Rice+Terraces",
    "rating": 4.8,
    "topPick": false,
    "tour": "bali_unesco"
  },
  {
    "id": "sidemen",
    "name": "Сидемен",
    "lat": -8.4667,
    "lng": 115.4333,
    "cat": "Долина",
    "vibes": [
      "chill"
    ],
    "desc": "Зелёная долина с видом на Агунг: рисовые поля, ткацкие мастерские и рафтинг на реке Телага-Ваджа.",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Panen%20padi%20di%20sidemen,%20karangasem.jpg?width=1280",
    "alt": "Долина Сидемен с рисовыми полями и вулканом Агунг",
    "maps": "https://maps.google.com/?q=Sidemen+Bali",
    "rating": 4.8,
    "topPick": true,
    "tour": "white_water_rafting"
  },
  {
    "id": "besakih",
    "name": "Бесаких",
    "lat": -8.3739,
    "lng": 115.4517,
    "cat": "Храм",
    "vibes": [
      "temple",
      "volcano"
    ],
    "desc": "«Мать всех храмов» — гигантский комплекс из 86 святилищ на склоне вулкана Агунг.",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Besakih%20Bali%20Indonesia%20Pura-Besakih-02.jpg?width=1280",
    "alt": "Храмовый комплекс Пура Бесаких на склоне вулкана Агунг",
    "maps": "https://maps.google.com/?q=Besakih+Temple+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "temple_culture"
  },
  {
    "id": "kelingking",
    "name": "Келингкинг",
    "lat": -8.7503,
    "lng": 115.4744,
    "cat": "Смотровая",
    "vibes": [
      "beach"
    ],
    "desc": "Скала «Ти-Рекс» на Нуса-Пениде — самый узнаваемый обрыв Индонезии и пляж под 200-метровой стеной.",
    "img": "../images/places/kelingking-beach-viewpoint.jpg",
    "alt": "Смотровая Келингкинг — скала Ти-Рекс на Нуса-Пениде",
    "maps": "https://maps.google.com/?q=Kelingking+Beach",
    "rating": 4.9,
    "topPick": false,
    "tour": "nusa_penida_west_tour"
  },
  {
    "id": "crystal_bay",
    "name": "Кристал-Бэй",
    "lat": -8.7147,
    "lng": 115.4581,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "dive"
    ],
    "desc": "Бухта с прозрачной водой и кораллами — лучшее место Нуса-Пениды для купания и заката.",
    "img": "../images/places/crystal-bay.jpg",
    "alt": "Пляж Кристал-Бэй на Нуса-Пениде",
    "maps": "https://maps.google.com/?q=Crystal+Bay+Nusa+Penida",
    "rating": 4.6,
    "topPick": false,
    "tour": "nusa_penida_full_day_tour"
  },
  {
    "id": "manta_point",
    "name": "Manta Point",
    "lat": -8.792,
    "lng": 115.521,
    "cat": "Снорклинг",
    "vibes": [
      "dive"
    ],
    "desc": "Встреча с океанскими мантами размахом до четырёх метров — главный снорклинг-спот Бали.",
    "img": "../images/tours-real/nusa-penida-manta-rays-point.jpg",
    "alt": "Манта скользит над рифом на Manta Point, Нуса-Пенида",
    "maps": "https://maps.google.com/?q=Manta+Point+Nusa+Penida",
    "rating": 4.9,
    "topPick": false,
    "tour": "nusa_penida_manta_point"
  },
  {
    "id": "lovina",
    "name": "Ловина",
    "lat": -8.158,
    "lng": 115.025,
    "cat": "Море",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Стаи диких дельфинов на рассвете и тихие чёрные пляжи северного побережья.",
    "img": "../images/tours-real/dolphin-sunrise-city-tour.jpg",
    "alt": "Дельфины выпрыгивают из воды на рассвете у Ловины",
    "maps": "https://maps.google.com/?q=Lovina+Beach+Bali",
    "rating": 4.6,
    "topPick": false,
    "tour": "dolphin_sunrise_city_tour"
  },
  {
    "id": "ubud_spa",
    "name": "Спа-день в Убуде",
    "lat": -8.515,
    "lng": 115.27,
    "cat": "Спа и релакс",
    "vibes": [
      "chill"
    ],
    "desc": "Балийский массаж, цветочные ванны и травяные ритуалы в спа среди рисовых полей Убуда.",
    "img": "../images/tours-real/private-car-with-driver-bali.jpg",
    "alt": "Спа-ритуал с цветочной ванной в Убуде",
    "maps": "https://maps.google.com/?q=Ubud+Spa",
    "rating": 4.8,
    "topPick": false,
    "tour": "spa_relax_day"
  },
  {
    "id": "atv_ubud",
    "name": "Квадроциклы (Убуд)",
    "lat": -8.46,
    "lng": 115.26,
    "cat": "Приключения",
    "vibes": [
      "adventure"
    ],
    "desc": "Драйв на квадроцикле сквозь джунгли, речные броды и рисовые поля к северу от Убуда.",
    "img": "../images/tours-real/atv-quad-bikes.jpg",
    "alt": "Квадроциклы на трассе через джунгли Убуда",
    "maps": "https://maps.google.com/?q=ATV+Ride+Ubud+Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "atv_quad_bikes"
  },
  {
    "id": "diamond_beach",
    "name": "Даймонд-Бич (восток Пениды)",
    "lat": -8.723,
    "lng": 115.596,
    "cat": "Пляж",
    "vibes": [
      "beach"
    ],
    "desc": "Белый песок и бирюзовая бухта под резной лестницей на диком востоке Нуса-Пениды.",
    "img": "../images/places/diamond-beach-cliffs.jpg",
    "alt": "Даймонд-Бич с бирюзовой бухтой на востоке Нуса-Пениды",
    "maps": "https://maps.google.com/?q=Diamond+Beach+Nusa+Penida",
    "rating": 4.9,
    "topPick": true,
    "tour": "nusa_penida_east_tour"
  },
  {
    "id": "broken_beach",
    "name": "Брокен-Бич (Пенида)",
    "lat": -8.718,
    "lng": 115.472,
    "cat": "Смотровая",
    "vibes": [
      "dive",
      "beach"
    ],
    "desc": "Круглая арка в скале и лазурный «бассейн» Ангелс-Биллабонг на западном мысе Пениды.",
    "img": "../images/tours-real/nusa-penida-private-day-tour-manta-snorkeling.jpg",
    "alt": "Природная арка Брокен-Бич на Нуса-Пениде",
    "maps": "https://maps.google.com/?q=Broken+Beach+Nusa+Penida",
    "rating": 4.8,
    "topPick": false,
    "tour": "nusa_penida_private_day_tour_manta_snorkeling"
  },
  {
    "id": "gili",
    "name": "Острова Гили",
    "lat": -8.35,
    "lng": 116.045,
    "cat": "Острова",
    "vibes": [
      "beach",
      "dive",
      "chill"
    ],
    "desc": "Три островка с белым песком без машин: снорклинг с черепахами, дайвинг и медленные закаты.",
    "img": "../images/tours-real/gili-island-tour.jpg",
    "alt": "Белый пляж и бирюзовое море острова Гили-Траванган",
    "maps": "https://maps.google.com/?q=Gili+Trawangan",
    "rating": 4.8,
    "topPick": true,
    "tour": "gili_island_tour"
  },
  {
    "id": "sumbawa",
    "name": "Залив Салех, Сумбава",
    "lat": -8.55,
    "lng": 116.45,
    "cat": "Снорклинг",
    "vibes": [
      "dive"
    ],
    "desc": "Многодневный выезд с Бали в залив Салех на Сумбаве — плавание с китовыми акулами у рыбацких платформ.",
    "img": "../images/tours-real/sumbawa-whale-shark-snorkeling-trip.jpg",
    "alt": "Китовая акула в заливе Салех у берегов Сумбавы",
    "maps": "https://maps.google.com/?q=Saleh+Bay+Sumbawa",
    "rating": 4.9,
    "topPick": true,
    "tour": "sumbawa_whale_shark_snorkeling_trip"
  },
  {
    "id": "heliport",
    "name": "Вертолётная обзорная",
    "lat": -8.78,
    "lng": 115.15,
    "cat": "С воздуха",
    "vibes": [
      "aerial"
    ],
    "desc": "Обзорный полёт над югом Бали: рисовые поля, храмы и линия побережья с высоты птичьего полёта.",
    "img": "../images/tours-real/bali-helicopter-scenic-tour.jpg",
    "alt": "Вертолёт над южным побережьем Бали",
    "maps": "https://maps.google.com/?q=Bali+Helicopter+Tour",
    "rating": 4.8,
    "topPick": false,
    "tour": "bali_helicopter_scenic_tour"
  },
  {
    "id": "uluwatu_air",
    "name": "Полёт над вулканом и берегом",
    "lat": -8.82,
    "lng": 115.085,
    "cat": "С воздуха",
    "vibes": [
      "aerial",
      "beach"
    ],
    "desc": "Полёт над кратером Батура и обрывами Букита — вулкан и океан в одном маршруте.",
    "img": "../images/tours-real/volcano-coastline-helicopter-ride.jpg",
    "alt": "Вид с вертолёта на вулкан и побережье Бали",
    "maps": "https://maps.google.com/?q=Bali+Helicopter+Volcano",
    "rating": 4.8,
    "topPick": false,
    "tour": "volcano_coastline_helicopter_ride"
  },
  {
    "id": "hram_batuan",
    "name": "Храм Батуан",
    "lat": -8.5843,
    "lng": 115.2761,
    "cat": "Храм",
    "vibes": [
      "temple"
    ],
    "desc": "Каменный храм Батуан с балийской резьбой",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/029%20Split%20Gate%20into%20Side%20Temple%2C%20Pura%20Puseh%20Desa%20Batuan%2C%20Bali%2C%20photograph%20by%20Anandajoti%20Bhikkhu.jpg?width=1280",
    "alt": "Каменный храм Батуан с балийской резьбой",
    "maps": "https://maps.google.com/?q=Batuan%20Temple%20Pura%20Puseh%20Bali",
    "rating": 4.8,
    "topPick": true,
    "tour": "ubud_highlights"
  },
  {
    "id": "gunung_kavi_sebatu",
    "name": "Гунунг Кави Себату",
    "lat": -8.4189,
    "lng": 115.2897,
    "cat": "Храм",
    "vibes": [
      "temple"
    ],
    "desc": "Пруды с лотосами у водного храма Себату",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Bali%20-%20Pura%20Gunung%20Kawi%20Sebatu%20(2025)%20-%20img%2008.jpg?width=1280",
    "alt": "Пруды с лотосами у водного храма Себату",
    "maps": "https://maps.google.com/?q=Gunung%20Kawi%20Sebatu%20water%20temple%20Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "ubud_highlights"
  },
  {
    "id": "les_obezyan",
    "name": "Лес обезьян",
    "lat": -8.5188,
    "lng": 115.2587,
    "cat": "Природа",
    "vibes": [
      "chill"
    ],
    "desc": "Макаки в тропическом Лесу обезьян Убуда",
    "img": "../images/places/ubud-monkey-forest.jpg",
    "alt": "Макаки в тропическом Лесу обезьян Убуда",
    "maps": "https://maps.google.com/?q=Ubud%20Sacred%20Monkey%20Forest%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "ubud_highlights"
  },
  {
    "id": "chernye_lavovye_polya_batura",
    "name": "Чёрные лавовые поля Батура",
    "lat": -8.2688,
    "lng": 115.3812,
    "cat": "Приключения",
    "vibes": [
      "volcano",
      "adventure"
    ],
    "desc": "Чёрные застывшие лавовые поля вулкана Батур",
    "img": "../images/places/mount-batur-jeep.jpg",
    "alt": "Чёрные застывшие лавовые поля вулкана Батур",
    "maps": "https://maps.google.com/?q=Mount%20Batur%20black%20lava%20field",
    "rating": 4.9,
    "topPick": false,
    "tour": "batur_jeep_hot_spring"
  },
  {
    "id": "goryachie_istochniki_batur_t",
    "name": "Горячие источники Батур (Тойя-Бунгках)",
    "lat": -8.2478,
    "lng": 115.3965,
    "cat": "Горячие источники",
    "vibes": [
      "chill",
      "volcano"
    ],
    "desc": "Термальные бассейны Батур у озера на фоне вулкана",
    "img": "../images/tours-real/mount-batur-sunrise-jeep-hot-spring.jpg",
    "alt": "Термальные бассейны Батур у озера на фоне вулкана",
    "maps": "https://maps.google.com/?q=Batur%20natural%20hot%20spring%20Toya%20Bungkah",
    "rating": 4.9,
    "topPick": false,
    "tour": "batur_jeep_hot_spring"
  },
  {
    "id": "vodopad_gitgit",
    "name": "Водопад Гитгит",
    "lat": -8.1913,
    "lng": 115.1347,
    "cat": "Водопад",
    "vibes": [
      "waterfall"
    ],
    "desc": "Водопад Гитгит в тропическом лесу северного Бали",
    "img": "../images/places/bali-waterfall.jpg",
    "alt": "Водопад Гитгит в тропическом лесу северного Бали",
    "maps": "https://maps.google.com/?q=Gitgit%20Waterfall%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "dolphin_sunrise_city_tour"
  },
  {
    "id": "hram_ulun_danu_bratan",
    "name": "Храм Улун-Дану-Братан",
    "lat": -8.2753,
    "lng": 115.1664,
    "cat": "Храм",
    "vibes": [
      "temple",
      "chill"
    ],
    "desc": "Храм Улун-Дану-Братан на озере Братан в Бедугуле",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Pura%20Ulun%20Danu%20Bratan%2C%202022.jpg?width=1280",
    "alt": "Храм Улун-Дану-Братан на озере Братан в Бедугуле",
    "maps": "https://maps.google.com/?q=Ulun%20Danu%20Beratan%20lake%20temple%20Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "dolphin_sunrise_city_tour"
  },
  {
    "id": "hram_taman_ayun",
    "name": "Храм Таман-Аюн",
    "lat": -8.5416,
    "lng": 115.1726,
    "cat": "Храм",
    "vibes": [
      "temple"
    ],
    "desc": "Многоярусные шрины-меру храма Таман-Аюн в окружении рва",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Planting%20at%20Pura%20Taman%20Ayun%2C%201516.jpg?width=1280",
    "alt": "Многоярусные шрины-меру храма Таман-Аюн в окружении рва",
    "maps": "https://maps.google.com/?q=Taman%20Ayun%20temple%20Mengwi%20Bali%20meru",
    "rating": 4.9,
    "topPick": true,
    "tour": "bali_unesco"
  },
  {
    "id": "vodnyy_dvorec_tirta_ganga",
    "name": "Водный дворец Тирта-Ганга",
    "lat": -8.4127,
    "lng": 115.5872,
    "cat": "Водный дворец",
    "vibes": [
      "chill"
    ],
    "desc": "Водный дворец Тирта-Ганга: ступеньки над прудами с карпами",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/059%20Split%20Gateway%20to%20Tirta%20Gangga%2C%20Karagasem%20Palaces%2C%20Bali%2C%20photograph%20by%20Anandajoti%20Bhikkhu.jpg?width=1280",
    "alt": "Водный дворец Тирта-Ганга: ступеньки над прудами с карпами",
    "maps": "https://maps.google.com/?q=Tirta%20Gangga%20Water%20Palace%20Bali%20koi%20pond%20stepping%20stones",
    "rating": 4.8,
    "topPick": false,
    "tour": "east_bali_instagram_tour"
  },
  {
    "id": "vodopad_tukad_chepung",
    "name": "Водопад Тукад-Чепунг",
    "lat": -8.4585,
    "lng": 115.3907,
    "cat": "Водопад",
    "vibes": [
      "waterfall",
      "adventure"
    ],
    "desc": "Лучи света в пещерном каньоне водопада Тукад-Чепунг",
    "img": "../images/places/tukad-cepung-light-beams.jpg",
    "alt": "Лучи света в пещерном каньоне водопада Тукад-Чепунг",
    "maps": "https://maps.google.com/?q=%D0%92%D0%BE%D0%B4%D0%BE%D0%BF%D0%B0%D0%B4%20%D0%A2%D1%83%D0%BA%D0%B0%D0%B4-%D0%A7%D0%B5%D0%BF%D1%83%D0%BD%D0%B3",
    "rating": 4.8,
    "topPick": false,
    "tour": "east_bali_instagram_tour"
  },
  {
    "id": "reka_telaga_vadzha",
    "name": "Река Телага-Ваджа",
    "lat": -8.4267,
    "lng": 115.4452,
    "cat": "Рафтинг",
    "vibes": [
      "adventure"
    ],
    "desc": "Рафтинг по бурной горной реке Телага-Ваджа в восточном Бали",
    "img": "../images/tours-real/white-water-rafting.jpg",
    "alt": "Рафтинг по бурной горной реке Телага-Ваджа в восточном Бали",
    "maps": "https://maps.google.com/?q=Telaga%20Waja%20river%20rafting%20Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "white_water_rafting"
  },
  {
    "id": "gavan_benoa",
    "name": "Гавань Беноа",
    "lat": -8.7508,
    "lng": 115.2186,
    "cat": "Гавань",
    "vibes": [
      "chill",
      "beach"
    ],
    "desc": "Катера у гавани Беноа на юге Бали",
    "img": "../images/places/fast-boat-from-sanur.jpg",
    "alt": "Катера у гавани Беноа на юге Бали",
    "maps": "https://maps.google.com/?q=Benoa%20Harbour%20Bali%20boat%20pier",
    "rating": 4.7,
    "topPick": true,
    "tour": "sunset_cruise_bali"
  },
  {
    "id": "poluostrov_tandzhung_benoa",
    "name": "Полуостров Танджунг-Беноа",
    "lat": -8.7583,
    "lng": 115.2194,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Пляжи и лагуна полуострова Танджунг-Беноа",
    "img": "../images/places/calm-beach-in-bali.jpg",
    "alt": "Пляжи и лагуна полуострова Танджунг-Беноа",
    "maps": "https://maps.google.com/?q=Tanjung%20Benoa%20beach%20Bali",
    "rating": 4.9,
    "topPick": false,
    "tour": "sunset_cruise_bali"
  },
  {
    "id": "proliv_badung",
    "name": "Пролив Бадунг",
    "lat": -8.81,
    "lng": 115.255,
    "cat": "Круиз",
    "vibes": [
      "chill"
    ],
    "desc": "Круизная яхта в открытом море на закате",
    "img": "../images/tours-real/sunset-cruise-bali.jpg",
    "alt": "Круизная яхта в открытом море на закате",
    "maps": "https://maps.google.com/?q=Bali%20sunset%20dinner%20cruise%20boat",
    "rating": 4.8,
    "topPick": false,
    "tour": "sunset_cruise_bali"
  },
  {
    "id": "kafe_old_man_s_changu",
    "name": "Кафе Old Man's, Чангу",
    "lat": -8.6558,
    "lng": 115.1281,
    "cat": "Кафе",
    "vibes": [
      "chill"
    ],
    "desc": "Завтрак в уютном кафе Чангу",
    "img": "../images/places/canggu-cafe.jpg",
    "alt": "Завтрак в уютном кафе Чангу",
    "maps": "https://maps.google.com/?q=Canggu%20beach%20cafe%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "surf_lesson_experience"
  },
  {
    "id": "plyazh_eho_bich",
    "name": "Пляж Эхо-Бич",
    "lat": -8.654,
    "lng": 115.1237,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Шезлонги пляжного клуба на Эхо-Бич в Чангу",
    "img": "../images/places/canggu-beach-club.jpg",
    "alt": "Шезлонги пляжного клуба на Эхо-Бич в Чангу",
    "maps": "https://maps.google.com/?q=Echo%20Beach%20Canggu%20beach%20club%20Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "surf_lesson_experience"
  },
  {
    "id": "risovye_polya_changu",
    "name": "Рисовые поля Чангу",
    "lat": -8.635,
    "lng": 115.12,
    "cat": "Рисовые поля",
    "vibes": [
      "chill"
    ],
    "desc": "Зелёные рисовые поля Чангу в золотом свете",
    "img": "../images/places/canggu-rice-fields.jpg",
    "alt": "Зелёные рисовые поля Чангу в золотом свете",
    "maps": "https://maps.google.com/?q=Canggu%20rice%20fields%20Bali",
    "rating": 4.9,
    "topPick": false,
    "tour": "surf_lesson_experience"
  },
  {
    "id": "angels_billabong",
    "name": "Ангелс-Биллабонг",
    "lat": -8.7335,
    "lng": 115.449,
    "cat": "Природный бассейн",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Природный бассейн Ангелс-Биллабонг в скалах",
    "img": "../images/places/angels-billabong-rock-pool.jpg",
    "alt": "Природный бассейн Ангелс-Биллабонг в скалах",
    "maps": "https://maps.google.com/?q=Angel's%20Billabong%20Nusa%20Penida",
    "rating": 4.8,
    "topPick": false,
    "tour": "nusa_penida_west_tour"
  },
  {
    "id": "varung_u_broken_bich",
    "name": "Варунг у Брокен-Бич",
    "lat": -8.7322,
    "lng": 115.451,
    "cat": "Обед",
    "vibes": [
      "chill"
    ],
    "desc": "Балийский обед в варунге на Нуса-Пениде",
    "img": "../images/places/balinese-warung-meal.jpg",
    "alt": "Балийский обед в варунге на Нуса-Пениде",
    "maps": "https://maps.google.com/?q=Indonesian%20warung%20nasi%20goreng%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "nusa_penida_west_tour"
  },
  {
    "id": "gavan_sanur",
    "name": "Гавань Санур",
    "lat": -8.684,
    "lng": 115.266,
    "cat": "Гавань",
    "vibes": [
      "chill"
    ],
    "desc": "Спидбот в гавани Санур перед переправой на Нуса-Пениду",
    "img": "../images/places/fast-boat-from-sanur.jpg",
    "alt": "Спидбот в гавани Санур перед переправой на Нуса-Пениду",
    "maps": "https://maps.google.com/?q=Sanur%20Harbour%20Bali%20fast%20boat",
    "rating": 4.9,
    "topPick": true,
    "tour": "nusa_penida_manta_point"
  },
  {
    "id": "stena_toyyapake",
    "name": "Стена Тойяпаке",
    "lat": -8.682,
    "lng": 115.468,
    "cat": "Снорклинг",
    "vibes": [
      "dive"
    ],
    "desc": "Снорклинг-дрейф вдоль рифовой стены Тойяпаке",
    "img": "../images/places/blue-lagoon-padang-bai.jpg",
    "alt": "Снорклинг-дрейф вдоль рифовой стены Тойяпаке",
    "maps": "https://maps.google.com/?q=Toyapakeh%20Wall%20Nusa%20Penida%20reef%20snorkeling",
    "rating": 4.8,
    "topPick": false,
    "tour": "nusa_penida_manta_point"
  },
  {
    "id": "hrebet_champuan",
    "name": "Хребет Чампуан",
    "lat": -8.4952,
    "lng": 115.258,
    "cat": "Прогулка",
    "vibes": [
      "chill"
    ],
    "desc": "Тропа по хребту Чампуан среди зелени в Убуде",
    "img": "../images/places/campuhan-ridge.jpg",
    "alt": "Тропа по хребту Чампуан среди зелени в Убуде",
    "maps": "https://maps.google.com/?q=Campuhan%20Ridge%20Walk%20Ubud%20Bali",
    "rating": 4.8,
    "topPick": true,
    "tour": "spa_relax_day"
  },
  {
    "id": "organik_kafe_v_ubude",
    "name": "Органик-кафе в Убуде",
    "lat": -8.5158,
    "lng": 115.2646,
    "cat": "Кафе",
    "vibes": [
      "chill"
    ],
    "desc": "Балийское блюдо на обед в кафе Убуда",
    "img": "../images/places/balinese-warung-meal.jpg",
    "alt": "Балийское блюдо на обед в кафе Убуда",
    "maps": "https://maps.google.com/?q=Ubud%20organic%20cafe%20healthy%20lunch%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "spa_relax_day"
  },
  {
    "id": "hram_tirta_empul",
    "name": "Храм Тирта Эмпул",
    "lat": -8.4149,
    "lng": 115.316,
    "cat": "Храм",
    "vibes": [
      "temple",
      "chill"
    ],
    "desc": "Священный источник для очищения в храме Тирта Эмпул",
    "img": "../images/places/tirta-empul-holy-spring.jpg",
    "alt": "Священный источник для очищения в храме Тирта Эмпул",
    "maps": "https://maps.google.com/?q=Tirta%20Empul%20holy%20spring%20temple%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "spa_relax_day"
  },
  {
    "id": "dzhungli_i_risovye_polya",
    "name": "Джунгли и рисовые поля",
    "lat": -8.4458,
    "lng": 115.236,
    "cat": "Рисовые террасы",
    "vibes": [
      "adventure"
    ],
    "desc": "Рисовые террасы и джунгли около Паянгана",
    "img": "../images/places/tegalalang-rice-terraces.jpg",
    "alt": "Рисовые террасы и джунгли около Паянгана",
    "maps": "https://maps.google.com/?q=Bali%20Payangan%20rice%20field%20jungle%20ATV%20trail",
    "rating": 4.9,
    "topPick": false,
    "tour": "atv_quad_bikes"
  },
  {
    "id": "tonnel_gorilla_cave",
    "name": "Тоннель Gorilla Cave",
    "lat": -8.4446,
    "lng": 115.2348,
    "cat": "Приключения",
    "vibes": [
      "adventure"
    ],
    "desc": "Квадроцикл въезжает в природный каменный тоннель",
    "img": "../images/tours-real/atv-ride-adventure.jpg",
    "alt": "Квадроцикл въезжает в природный каменный тоннель",
    "maps": "https://maps.google.com/?q=Bali%20Gorilla%20Cave%20ATV%20natural%20tunnel%20Payangan",
    "rating": 4.8,
    "topPick": false,
    "tour": "atv_quad_bikes"
  },
  {
    "id": "brod_cherez_reku",
    "name": "Брод через реку",
    "lat": -8.4462,
    "lng": 115.2332,
    "cat": "Приключения",
    "vibes": [
      "adventure"
    ],
    "desc": "Квадроцикл форсирует реку в джунглях Бали",
    "img": "../images/places/ayung-river-gorge.jpg",
    "alt": "Квадроцикл форсирует реку в джунглях Бали",
    "maps": "https://maps.google.com/?q=Bali%20ATV%20river%20crossing%20muddy%20jungle%20Ubud",
    "rating": 4.7,
    "topPick": false,
    "tour": "atv_quad_bikes"
  },
  {
    "id": "obed_i_dush_na_baze",
    "name": "Обед и душ на базе",
    "lat": -8.4471,
    "lng": 115.2376,
    "cat": "Обед",
    "vibes": [
      "chill"
    ],
    "desc": "Балийский обед в варунге после заезда",
    "img": "../images/places/balinese-warung-meal.jpg",
    "alt": "Балийский обед в варунге после заезда",
    "maps": "https://maps.google.com/?q=Balinese%20lunch%20warung%20meal%20Ubud",
    "rating": 4.9,
    "topPick": false,
    "tour": "atv_quad_bikes"
  },
  {
    "id": "plyazh_atuh",
    "name": "Пляж Атух",
    "lat": -8.7733,
    "lng": 115.6216,
    "cat": "Пляж",
    "vibes": [
      "beach"
    ],
    "desc": "Пляж Атух с песчаной бухтой и скальной аркой в море",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/DSF6870.jpg?width=1280",
    "alt": "Пляж Атух с песчаной бухтой и скальной аркой в море",
    "maps": "https://maps.google.com/?q=Atuh%20Beach%20Nusa%20Penida",
    "rating": 4.7,
    "topPick": false,
    "tour": "nusa_penida_east_tour"
  },
  {
    "id": "domik_na_dereve_molenteng",
    "name": "Домик на дереве (Молентенг)",
    "lat": -8.7794,
    "lng": 115.6165,
    "cat": "Смотровая",
    "vibes": [
      "chill"
    ],
    "desc": "Домик на дереве Румах-Похон на обрыве над видом Тысячи островов",
    "img": "../images/places/kelingking-beach-viewpoint.jpg",
    "alt": "Домик на дереве Румах-Похон на обрыве над видом Тысячи островов",
    "maps": "https://maps.google.com/?q=Rumah%20Pohon%20Molenteng%20tree%20house%20Nusa%20Penida",
    "rating": 4.9,
    "topPick": false,
    "tour": "nusa_penida_east_tour"
  },
  {
    "id": "holmy_telepuzikov",
    "name": "Холмы Телепузиков",
    "lat": -8.788,
    "lng": 115.5794,
    "cat": "Смотровая",
    "vibes": [
      "chill"
    ],
    "desc": "Зелёные округлые холмы Телепузиков на Нуса-Пениде над океаном",
    "img": "../images/places/angels-billabong-rock-pool.jpg",
    "alt": "Зелёные округлые холмы Телепузиков на Нуса-Пениде над океаном",
    "maps": "https://maps.google.com/?q=Teletubbies%20Hill%20Bukit%20Teletubbies%20Nusa%20Penida%20green%20hills",
    "rating": 4.9,
    "topPick": false,
    "tour": "nusa_penida_east_tour"
  },
  {
    "id": "angels_billabong_2",
    "name": "Ангелс-Биллабонг",
    "lat": -8.7196,
    "lng": 115.4788,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Природный бассейн Ангелс-Биллабонг у скал",
    "img": "../images/places/angels-billabong-rock-pool.jpg",
    "alt": "Природный бассейн Ангелс-Биллабонг у скал",
    "maps": "https://maps.google.com/?q=Angel's%20Billabong%20Nusa%20Penida",
    "rating": 4.7,
    "topPick": false,
    "tour": "nusa_penida_private_day_tour_manta_snorkeling"
  },
  {
    "id": "gavan_padang_bay",
    "name": "Гавань Паданг-Бай",
    "lat": -8.5311,
    "lng": 115.5086,
    "cat": "Гавань",
    "vibes": [
      "adventure"
    ],
    "desc": "Быстрый катер отходит из гавани Паданг-Бай",
    "img": "../images/tours-real/fast-boat-transfer-bali.jpg",
    "alt": "Быстрый катер отходит из гавани Паданг-Бай",
    "maps": "https://maps.google.com/?q=Padang%20Bai%20harbour%20fast%20boat%20Bali",
    "rating": 4.7,
    "topPick": true,
    "tour": "gili_island_tour"
  },
  {
    "id": "gili_meno",
    "name": "Гили Мено",
    "lat": -8.3497,
    "lng": 116.0506,
    "cat": "Снорклинг",
    "vibes": [
      "dive",
      "beach"
    ],
    "desc": "Подводные статуи и кораллы у Гили Мено",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Gili%20Meno%2C%20the%20smallest%20of%20the%20Gili%20Islands%20(16769118007).jpg?width=1280",
    "alt": "Подводные статуи и кораллы у Гили Мено",
    "maps": "https://maps.google.com/?q=Gili%20Meno%20underwater%20statues%20snorkeling",
    "rating": 4.7,
    "topPick": false,
    "tour": "gili_island_tour"
  },
  {
    "id": "gili_travangan_plyazh",
    "name": "Гили Траванган — пляж",
    "lat": -8.349,
    "lng": 116.032,
    "cat": "Пляж",
    "vibes": [
      "beach",
      "chill"
    ],
    "desc": "Белый песчаный пляж острова Гили Траванган",
    "img": "../images/tours-real/gili-islands-getaway.jpg",
    "alt": "Белый песчаный пляж острова Гили Траванган",
    "maps": "https://maps.google.com/?q=Gili%20Trawangan%20white%20sand%20beach",
    "rating": 4.9,
    "topPick": false,
    "tour": "gili_island_tour"
  },
  {
    "id": "port_padang_bay_bali",
    "name": "Порт Паданг-Бай (Бали)",
    "lat": -8.5304,
    "lng": 115.5093,
    "cat": "Гавань",
    "vibes": [
      "adventure"
    ],
    "desc": "Паромный порт Паданг-Бай на востоке Бали",
    "img": "../images/places/blue-lagoon-padang-bai.jpg",
    "alt": "Паромный порт Паданг-Бай на востоке Бали",
    "maps": "https://maps.google.com/?q=Padang%20Bai%20harbour%20Bali%20ferry%20port",
    "rating": 4.7,
    "topPick": true,
    "tour": "sumbawa_whale_shark_snorkeling_trip"
  },
  {
    "id": "rify_zaliva_saleh",
    "name": "Рифы залива Салех",
    "lat": -8.6,
    "lng": 116.52,
    "cat": "Снорклинг",
    "vibes": [
      "dive",
      "beach"
    ],
    "desc": "Снорклинг на коралловых рифах залива Салех",
    "img": "../images/places/manta-ray-snorkeling.jpg",
    "alt": "Снорклинг на коралловых рифах залива Салех",
    "maps": "https://maps.google.com/?q=Saleh%20Bay%20Sumbawa%20coral%20reef%20snorkeling",
    "rating": 4.7,
    "topPick": false,
    "tour": "sumbawa_whale_shark_snorkeling_trip"
  },
  {
    "id": "derevnya_labuhan_dzhambu",
    "name": "Деревня Лабухан-Джамбу",
    "lat": -8.5,
    "lng": 116.47,
    "cat": "Гавань",
    "vibes": [
      "adventure",
      "chill"
    ],
    "desc": "Рыбацкая деревня Лабухан-Джамбу на Сумбаве",
    "img": "../images/tours-real/fast-boat-transfer-bali.jpg",
    "alt": "Рыбацкая деревня Лабухан-Джамбу на Сумбаве",
    "maps": "https://maps.google.com/?q=Labuhan%20Jambu%20fishing%20village%20Sumbawa",
    "rating": 4.9,
    "topPick": false,
    "tour": "sumbawa_whale_shark_snorkeling_trip"
  },
  {
    "id": "zaliv_dzhimbaran",
    "name": "Залив Джимбаран",
    "lat": -8.7743,
    "lng": 115.1607,
    "cat": "С воздуха",
    "vibes": [
      "aerial",
      "beach"
    ],
    "desc": "Залив Джимбаран и рыбацкие лодки с высоты полёта",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Jimbaran%20Bay%20(7188353595).jpg?width=1280",
    "alt": "Залив Джимбаран и рыбацкие лодки с высоты полёта",
    "maps": "https://maps.google.com/?q=Jimbaran%20Bay%20beach%20aerial%20Bali",
    "rating": 4.7,
    "topPick": false,
    "tour": "bali_helicopter_scenic_tour"
  },
  {
    "id": "poberezhe_kuty",
    "name": "Побережье Куты",
    "lat": -8.7185,
    "lng": 115.1686,
    "cat": "С воздуха",
    "vibes": [
      "aerial",
      "beach"
    ],
    "desc": "Пляж Кута и линия побережья с вертолёта",
    "img": "../images/places/bali-surf-beach.jpg",
    "alt": "Пляж Кута и линия побережья с вертолёта",
    "maps": "https://maps.google.com/?q=Kuta%20Beach%20Bali%20coastline%20aerial",
    "rating": 4.9,
    "topPick": false,
    "tour": "bali_helicopter_scenic_tour"
  },
  {
    "id": "ozero_batur",
    "name": "Озеро Батур",
    "lat": -8.28,
    "lng": 115.413,
    "cat": "С воздуха",
    "vibes": [
      "aerial"
    ],
    "desc": "Озеро Батур в кальдере вулкана",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Gubuk%20Derita.jpg?width=1280",
    "alt": "Озеро Батур в кальдере вулкана",
    "maps": "https://maps.google.com/?q=Lake%20Batur%20Kintamani%20caldera%20Bali%20aerial",
    "rating": 4.8,
    "topPick": false,
    "tour": "volcano_coastline_helicopter_ride"
  },
  {
    "id": "poluostrov_bukit",
    "name": "Полуостров Букит",
    "lat": -8.8455,
    "lng": 115.185,
    "cat": "Пляж",
    "vibes": [
      "aerial",
      "beach"
    ],
    "desc": "Побережье полуострова Букит с воздуха",
    "img": "../images/places/bukit-beach-club.jpg",
    "alt": "Побережье полуострова Букит с воздуха",
    "maps": "https://maps.google.com/?q=Bukit%20Peninsula%20Pandawa%20Beach%20aerial%20coastline%20Bali",
    "rating": 4.8,
    "topPick": false,
    "tour": "volcano_coastline_helicopter_ride"
  }
];

/* ------------------------------------------------------------
   Шаблоны дней: каждая карточка дня = связный по географии
   мини-маршрут + реальный тур SB Excursions.
   order — географический порядок в поездке.
   ------------------------------------------------------------ */
var SB_DAY_TEMPLATES = [
  {
    "id": "ubud_day",
    "order": 1,
    "title": "Убуд и рисовые террасы",
    "vibes": [
      "chill",
      "temple",
      "waterfall"
    ],
    "tour": "ubud_highlights",
    "stops": [
      {
        "loc": "hram_batuan",
        "time": "09:00",
        "note": "Батик, серебро, резьба и храм Батуан"
      },
      {
        "loc": "gunung_kavi_sebatu",
        "time": "10:45",
        "note": "Водный храм и священные источники Себату"
      },
      {
        "loc": "kintamani",
        "time": "12:15",
        "note": "Буфет-обед с видом на вулкан Батур"
      },
      {
        "loc": "tegallalang",
        "time": "14:00",
        "note": "Рисовые террасы, качели и дегустация кофе"
      },
      {
        "loc": "les_obezyan",
        "time": "15:45",
        "note": "Прогулка среди макак в Лесу обезьян"
      },
      {
        "loc": "ubud",
        "time": "16:45",
        "note": "Королевский дворец и центр Убуда"
      }
    ]
  },
  {
    "id": "batur_day",
    "order": 2,
    "title": "Рассвет на вулкане Батур",
    "vibes": [
      "volcano"
    ],
    "tour": "batur_jeep_hot_spring",
    "stops": [
      {
        "loc": "batur",
        "time": "05:30",
        "note": "Джип к рассвету над кальдерой"
      },
      {
        "loc": "chernye_lavovye_polya_batura",
        "time": "07:00",
        "note": "Едем по застывшим лавовым полям"
      },
      {
        "loc": "kintamani",
        "time": "08:15",
        "note": "Панорама кальдеры и озера Батур"
      },
      {
        "loc": "goryachie_istochniki_batur_t",
        "time": "09:30",
        "note": "Купание в тёплых бассейнах у озера"
      }
    ]
  },
  {
    "id": "north_day",
    "order": 3,
    "title": "Север: дельфины и водопады",
    "vibes": [
      "waterfall",
      "chill"
    ],
    "tour": "dolphin_sunrise_city_tour",
    "stops": [
      {
        "loc": "lovina",
        "time": "06:00",
        "note": "Наблюдаем дельфинов с лодки на рассвете"
      },
      {
        "loc": "vodopad_gitgit",
        "time": "08:30",
        "note": "Короткая тропа через лес к каскаду"
      },
      {
        "loc": "hram_ulun_danu_bratan",
        "time": "10:30",
        "note": "Знаменитый храм на озере Братан"
      }
    ]
  },
  {
    "id": "unesco_day",
    "order": 4,
    "title": "День ЮНЕСКО",
    "vibes": [
      "temple",
      "chill"
    ],
    "tour": "bali_unesco",
    "stops": [
      {
        "loc": "hram_taman_ayun",
        "time": "09:00",
        "note": "Королевский храм с многоярусными меру"
      },
      {
        "loc": "hram_ulun_danu_bratan",
        "time": "10:45",
        "note": "Храм на горном озере Братан"
      },
      {
        "loc": "jatiluwih",
        "time": "12:45",
        "note": "Прогулка по террасам ЮНЕСКО, обед"
      },
      {
        "loc": "tanah_lot",
        "time": "17:00",
        "note": "Морской храм на закате"
      }
    ]
  },
  {
    "id": "east_day",
    "order": 5,
    "title": "Восток: Врата рая",
    "vibes": [
      "temple",
      "dive"
    ],
    "tour": "east_bali_instagram_tour",
    "stops": [
      {
        "loc": "lempuyang",
        "time": "07:30",
        "note": "Фото во Вратах рая до толп"
      },
      {
        "loc": "vodnyy_dvorec_tirta_ganga",
        "time": "09:30",
        "note": "Прогулка по камням над прудами карпов"
      },
      {
        "loc": "amed",
        "time": "11:30",
        "note": "Снорклинг с кораллами в бухте Джемелук"
      },
      {
        "loc": "vodopad_tukad_chepung",
        "time": "14:30",
        "note": "Лучи света в пещерном каньоне водопада"
      }
    ]
  },
  {
    "id": "sidemen_day",
    "order": 6,
    "title": "Сидемен и Бесаких",
    "vibes": [
      "chill",
      "temple",
      "volcano"
    ],
    "tour": "white_water_rafting",
    "stops": [
      {
        "loc": "sidemen",
        "time": "09:00",
        "note": "Виды зелёной долины и рисовых террас"
      },
      {
        "loc": "reka_telaga_vadzha",
        "time": "10:30",
        "note": "Рафтинг по порогам реки Телага-Ваджа"
      },
      {
        "loc": "besakih",
        "time": "14:00",
        "note": "«Мать всех храмов» на склоне Агунга"
      }
    ]
  },
  {
    "id": "bukit_day",
    "order": 7,
    "title": "Полуостров Букит",
    "vibes": [
      "temple",
      "beach"
    ],
    "tour": "sunset_cruise_bali",
    "stops": [
      {
        "loc": "gavan_benoa",
        "time": "16:00",
        "note": "Посадка на катер и приветственные напитки"
      },
      {
        "loc": "poluostrov_tandzhung_benoa",
        "time": "16:45",
        "note": "Выход в открытое море вдоль полуострова"
      },
      {
        "loc": "proliv_badung",
        "time": "17:45",
        "note": "Ужин и напитки на палубе яхты"
      },
      {
        "loc": "nusa_dua",
        "time": "18:20",
        "note": "Золотой час и закат над побережьем"
      }
    ]
  },
  {
    "id": "canggu_day",
    "order": 8,
    "title": "Чангу и Танах-Лот",
    "vibes": [
      "beach",
      "chill"
    ],
    "tour": "surf_lesson_experience",
    "stops": [
      {
        "loc": "canggu",
        "time": "09:00",
        "note": "Серф-урок для новичков на Бату-Болонг"
      },
      {
        "loc": "kafe_old_man_s_changu",
        "time": "11:30",
        "note": "Бранч и отдых после сёрфа"
      },
      {
        "loc": "plyazh_eho_bich",
        "time": "13:30",
        "note": "Пляжный клуб и купание в океане"
      },
      {
        "loc": "risovye_polya_changu",
        "time": "15:30",
        "note": "Прогулка по рисовым полям на закате"
      },
      {
        "loc": "tanah_lot",
        "time": "17:30",
        "note": "Закат у храма на скале"
      }
    ]
  },
  {
    "id": "penida_day",
    "order": 9,
    "title": "Нуса-Пенида: запад",
    "vibes": [
      "beach",
      "dive"
    ],
    "tour": "nusa_penida_west_tour",
    "stops": [
      {
        "loc": "kelingking",
        "time": "10:00",
        "note": "Смотровая «Ти-Рекс», крутой спуск к пляжу"
      },
      {
        "loc": "angels_billabong",
        "time": "11:45",
        "note": "Природный бассейн в скалах, купание в отлив"
      },
      {
        "loc": "broken_beach",
        "time": "12:15",
        "note": "Скальная арка над бирюзовым морем"
      },
      {
        "loc": "varung_u_broken_bich",
        "time": "13:00",
        "note": "Обед в варунге: наси горенг"
      },
      {
        "loc": "crystal_bay",
        "time": "14:30",
        "note": "Пляж, кораллы и купание"
      }
    ]
  },
  {
    "id": "manta_day",
    "order": 10,
    "title": "Снорклинг с мантами",
    "vibes": [
      "dive",
      "beach"
    ],
    "tour": "nusa_penida_manta_point",
    "stops": [
      {
        "loc": "gavan_sanur",
        "time": "07:30",
        "note": "Посадка на спидбот до Пениды"
      },
      {
        "loc": "manta_point",
        "time": "08:30",
        "note": "Снорклинг с гигантскими мантами"
      },
      {
        "loc": "crystal_bay",
        "time": "10:00",
        "note": "Рифовые рыбы и мола-мола (июль–ноябрь)"
      },
      {
        "loc": "stena_toyyapake",
        "time": "12:00",
        "note": "Дрейф вдоль рифовой стены"
      }
    ]
  },
  {
    "id": "spa_day",
    "order": 11,
    "title": "Спа и релакс в Убуде",
    "vibes": [
      "chill"
    ],
    "tour": "spa_relax_day",
    "stops": [
      {
        "loc": "hrebet_champuan",
        "time": "09:00",
        "note": "Утренняя прогулка по зелёному хребту"
      },
      {
        "loc": "ubud_spa",
        "time": "10:30",
        "note": "Балийский массаж, цветочная ванна, спа-ритуал"
      },
      {
        "loc": "organik_kafe_v_ubude",
        "time": "13:00",
        "note": "Здоровый обед в органик-кафе Убуда"
      },
      {
        "loc": "tegallalang",
        "time": "14:30",
        "note": "Кокос и виды на рисовые террасы"
      },
      {
        "loc": "hram_tirta_empul",
        "time": "16:00",
        "note": "Очищение в священном источнике храма"
      }
    ]
  },
  {
    "id": "atv_day",
    "order": 12,
    "title": "Квадроциклы по джунглям",
    "vibes": [
      "adventure"
    ],
    "tour": "atv_quad_bikes",
    "stops": [
      {
        "loc": "atv_ubud",
        "time": "09:00",
        "note": "Инструктаж, экипировка и посадка на квадроцикл"
      },
      {
        "loc": "dzhungli_i_risovye_polya",
        "time": "09:45",
        "note": "Заезд по рисовым полям и джунглям"
      },
      {
        "loc": "tonnel_gorilla_cave",
        "time": "10:15",
        "note": "Проезд сквозь природный каменный тоннель"
      },
      {
        "loc": "brod_cherez_reku",
        "time": "10:45",
        "note": "Форсирование реки и грязевых луж"
      },
      {
        "loc": "obed_i_dush_na_baze",
        "time": "11:30",
        "note": "Душ, переодевание и балийский обед"
      }
    ]
  },
  {
    "id": "penida_east_day",
    "order": 13,
    "title": "Нуса-Пенида: восток",
    "vibes": [
      "beach"
    ],
    "tour": "nusa_penida_east_tour",
    "stops": [
      {
        "loc": "diamond_beach",
        "time": "09:30",
        "note": "Спуск по лестнице к бирюзовой бухте"
      },
      {
        "loc": "plyazh_atuh",
        "time": "10:45",
        "note": "Уединённая бухта со скальной аркой"
      },
      {
        "loc": "domik_na_dereve_molenteng",
        "time": "12:45",
        "note": "Домик на дереве на краю обрыва"
      },
      {
        "loc": "holmy_telepuzikov",
        "time": "14:30",
        "note": "Зелёные холмы и обзор побережья"
      }
    ]
  },
  {
    "id": "penida_private_day",
    "order": 14,
    "title": "Нуса-Пенида приват и манты",
    "vibes": [
      "dive",
      "beach"
    ],
    "tour": "nusa_penida_private_day_tour_manta_snorkeling",
    "stops": [
      {
        "loc": "manta_point",
        "time": "09:00",
        "note": "Снорклинг с мантами в открытом океане"
      },
      {
        "loc": "crystal_bay",
        "time": "10:30",
        "note": "Снорклинг и отдых на белом пляже"
      },
      {
        "loc": "kelingking",
        "time": "12:30",
        "note": "Смотровая на скалу-динозавр Ти-Рекс"
      },
      {
        "loc": "broken_beach",
        "time": "14:00",
        "note": "Каменная арка над бирюзовым океаном"
      },
      {
        "loc": "angels_billabong_2",
        "time": "14:30",
        "note": "Природный бассейн у края скал"
      }
    ]
  },
  {
    "id": "gili_day",
    "order": 15,
    "title": "Острова Гили",
    "vibes": [
      "beach",
      "dive",
      "chill"
    ],
    "tour": "gili_island_tour",
    "stops": [
      {
        "loc": "gavan_padang_bay",
        "time": "08:00",
        "note": "Регистрация и посадка на быстрый катер"
      },
      {
        "loc": "gili",
        "time": "10:30",
        "note": "Снорклинг с черепахами и коралловыми садами"
      },
      {
        "loc": "gili_meno",
        "time": "12:30",
        "note": "Подводные статуи и коралловые сады"
      },
      {
        "loc": "gili_travangan_plyazh",
        "time": "14:30",
        "note": "Пляж, велопрогулка и кафе на острове"
      }
    ]
  },
  {
    "id": "sumbawa_day",
    "order": 16,
    "title": "Сумбава: китовые акулы",
    "vibes": [
      "dive"
    ],
    "tour": "sumbawa_whale_shark_snorkeling_trip",
    "stops": [
      {
        "loc": "port_padang_bay_bali",
        "time": "04:30",
        "note": "Старт: паром из Бали, многодневная поездка"
      },
      {
        "loc": "sumbawa",
        "time": "06:30",
        "note": "Плавание с китовыми акулами на рассвете"
      },
      {
        "loc": "rify_zaliva_saleh",
        "time": "09:00",
        "note": "Снорклинг на коралловых рифах залива"
      },
      {
        "loc": "derevnya_labuhan_dzhambu",
        "time": "11:30",
        "note": "Возвращение в рыбацкую деревню Лабухан-Джамбу"
      }
    ]
  },
  {
    "id": "heli_day",
    "order": 17,
    "title": "Полёт над Бали",
    "vibes": [
      "aerial"
    ],
    "tour": "bali_helicopter_scenic_tour",
    "stops": [
      {
        "loc": "heliport",
        "time": "11:00",
        "note": "Инструктаж по безопасности и взлёт"
      },
      {
        "loc": "uluwatu",
        "time": "11:08",
        "note": "Вид с высоты на скалы Улувату"
      },
      {
        "loc": "nusa_dua",
        "time": "11:16",
        "note": "Пролёт над пляжами и рифами Нуса-Дуа"
      },
      {
        "loc": "zaliv_dzhimbaran",
        "time": "11:24",
        "note": "Панорама залива Джимбаран с воздуха"
      },
      {
        "loc": "poberezhe_kuty",
        "time": "11:34",
        "note": "Полёт вдоль пляжной линии Куты"
      }
    ]
  },
  {
    "id": "volcano_heli_day",
    "order": 18,
    "title": "Вертолёт: вулкан и берег",
    "vibes": [
      "aerial",
      "beach"
    ],
    "tour": "volcano_coastline_helicopter_ride",
    "stops": [
      {
        "loc": "heliport",
        "time": "12:00",
        "note": "Взлёт и старт обзорного полёта"
      },
      {
        "loc": "batur",
        "time": "12:20",
        "note": "Кратер Батура с высоты полёта"
      },
      {
        "loc": "ozero_batur",
        "time": "12:25",
        "note": "Озеро Батур в древней кальдере"
      },
      {
        "loc": "uluwatu",
        "time": "12:45",
        "note": "Обрывы Улувату над Индийским океаном"
      },
      {
        "loc": "poluostrov_bukit",
        "time": "12:55",
        "note": "Пляжи и скалы полуострова Букит"
      }
    ]
  }
];

/* ------------------------------------------------------------
   Свободные дни: реальные места из базы SB Excursions
   по зонам (title / короткое описание / реальная ссылка
   Google Maps / отметка «5★ SB Top Pick»).
   lat/lng — примерные реальные координаты для тихих пинов.
   ------------------------------------------------------------ */
var SB_FREE_ZONES = [
  {
    id: 'canggu_zone', name: 'Чангу', lat: -8.6478, lng: 115.1385,
    intro: 'День без будильника: кафе, океан и закат в бич-клубе.',
    recs: [
      { title: 'La Brisa Beach Club', img: 'https://lokasibali.com/api/images/business-0x2dd23876693af8ad%3A0x86929db7c4eabc29-0.webp', copy: 'Самый атмосферный бич-клуб Чангу — закат, коктейли и музыка.', maps: 'https://maps.google.com/?q=La+Brisa+Canggu', topPick: true,  lat: -8.6660, lng: 115.1225 },
      { title: 'Batu Bolong Beach', img: 'https://live.staticflickr.com/65535/49439825083_4c1d06d9ee_b.jpg',   copy: 'Классический пляж Чангу для прогулки и заката.',                maps: 'https://maps.google.com/?q=Batu+Bolong+Beach+Canggu', topPick: true, lat: -8.6612, lng: 115.1305 },
      { title: 'Crate Cafe', img: 'https://onbali.com/assets/brands/crate-cafe/cover-crate-cafe-1.jpg',          copy: 'Культовый завтрак и кофе для неспешного утра.',                 maps: 'https://maps.google.com/?q=Crate+Cafe+Canggu', topPick: false, lat: -8.6479, lng: 115.1315 }
    ]
  },
  {
    id: 'seminyak_zone', name: 'Семиньяк', lat: -8.6900, lng: 115.1686,
    intro: 'Мягкий день: бранч, шопинг и знаменитый закат западного берега.',
    recs: [
      { title: 'Potato Head Beach Club', img: 'https://live.staticflickr.com/6042/6281781855_a6df953705_b.jpg', copy: 'Один из самых известных бич-клубов Бали — сильный закатный ход.', maps: 'https://maps.google.com/?q=Potato+Head+Seminyak', topPick: true, lat: -8.6810, lng: 115.1573 },
      { title: 'Seminyak Beach', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Seminyak%20Beach%20Resort%20Large.JPG?width=1280',         copy: 'Классика западного берега: длинный пляж и прогулка на закате.',   maps: 'https://maps.google.com/?q=Seminyak+Beach', topPick: true, lat: -8.6915, lng: 115.1601 },
      { title: 'Sisterfields', img: 'https://live.staticflickr.com/5706/23773451981_2dc59d3577_b.jpg',           copy: 'Популярный бранч и комфортная кухня на весь день.',               maps: 'https://maps.google.com/?q=Sisterfields+Seminyak', topPick: true, lat: -8.6842, lng: 115.1638 }
    ]
  },
  {
    id: 'ubud_zone', name: 'Убуд', lat: -8.5069, lng: 115.2625,
    intro: 'Спокойный день в джунглях: прогулка по гребню, источники и рынок.',
    recs: [
      { title: 'Campuhan Ridge Walk', img: 'https://live.staticflickr.com/3887/15103667262_eb062d3d8c_b.jpg', copy: 'Лёгкая живописная прогулка по гребню холма.',            maps: 'https://maps.google.com/?q=Campuhan+Ridge+Walk', topPick: true, lat: -8.5030, lng: 115.2549 },
      { title: 'Tirta Empul Temple', img: 'https://live.staticflickr.com/65535/49422321947_f8ce8db0f9_b.jpg',  copy: 'Храм священных источников — работает даже в дождь.',     maps: 'https://maps.google.com/?q=Tirta+Empul+Temple', topPick: true, lat: -8.4156, lng: 115.3153 },
      { title: 'Ubud Art Market', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ubud%20Market%2C%20Ubud%2C%20Bali%20%2815009558597%29.jpg?width=1280',     copy: 'Сувениры, ткани и классический Убуд в самом центре.',    maps: 'https://maps.google.com/?q=Ubud+Art+Market', topPick: true, lat: -8.5077, lng: 115.2640 }
    ]
  },
  {
    id: 'uluwatu_zone', name: 'Улувату', lat: -8.8291, lng: 115.0849,
    intro: 'Пляжный день на Буките: бирюзовые бухты и закат над океаном.',
    recs: [
      { title: 'Melasti Beach', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pantai%20Melasti%2C%20Bali.jpg?width=1280',       copy: 'Один из лучших пляжей Бали — белый песок под скалами.', maps: 'https://maps.google.com/?q=Melasti+Beach+Bali', topPick: true, lat: -8.8483, lng: 115.1590 },
      { title: 'Single Fin', img: 'https://lokasibali.com/api/images/business-0x2dd24ff9434fa3d1%3A0x73306bab5b47f9b4-0.webp',          copy: 'Знаменитый закат и напитки над океаном.',               maps: 'https://maps.google.com/?q=Single+Fin+Bali', topPick: true, lat: -8.8290, lng: 115.0873 },
      { title: 'Padang Padang Beach', img: 'https://live.staticflickr.com/6023/5900681104_4fe473cf5c.jpg', copy: 'Компактный пляж с открыточным видом.',                  maps: 'https://maps.google.com/?q=Padang+Padang+Beach', topPick: true, lat: -8.8107, lng: 115.1035 }
    ]
  },
  {
    id: 'nusa_dua_zone', name: 'Нуса-Дуа', lat: -8.8067, lng: 115.2280,
    intro: 'Курортный день: тихие пляжи, лагуны и клубы у воды.',
    recs: [
      { title: 'Geger Beach', img: 'https://live.staticflickr.com/1362/5099984222_0d3bc2f4f6_b.jpg',         copy: 'Спокойный светлый пляж с тёплой лагуной.',        maps: 'https://maps.google.com/?q=Geger+Beach', topPick: true, lat: -8.8174, lng: 115.2255 },
      { title: 'Waterblow Nusa Dua', img: 'https://live.staticflickr.com/4474/37781456082_9e2bc54082_b.jpg',  copy: 'Волны, взрывающиеся о скалы, — короткий вау-стоп.', maps: 'https://maps.google.com/?q=Waterblow+Nusa+Dua', topPick: true, lat: -8.8027, lng: 115.2395 },
      { title: 'Sundays Beach Club', img: 'https://www.sundaysbeachclub.com/wp-content/uploads/2025/09/Sundays-site-card-1024x768.png',  copy: 'Премиальный клуб у бирюзовой лагуны.',            maps: 'https://maps.google.com/?q=Sundays+Beach+Club+Bali', topPick: true, lat: -8.8446, lng: 115.2124 }
    ]
  },
  {
    id: 'sanur_zone', name: 'Санур', lat: -8.6931, lng: 115.2625,
    intro: 'Медленное утро: рассвет над морем и длинная набережная.',
    recs: [
      { title: 'Sanur Beach Boardwalk', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pemandangan%20Pantai%20Sanur.jpg?width=1280', copy: 'Длинная набережная для прогулки и рассвета.',      maps: 'https://maps.google.com/?q=Sanur+Beach', topPick: true, lat: -8.6931, lng: 115.2637 },
      { title: 'Big Garden Corner', img: 'https://lokasibali.com/api/images/business-0x2dd24071d99200c3%3A0x6b8b5fe4aa9162c0-0.webp',     copy: 'Парк с инсталляциями и видом на море.',            maps: 'https://maps.google.com/?q=Big+Garden+Corner+Sanur', topPick: true, lat: -8.6640, lng: 115.2600 },
      { title: 'Genius Cafe', img: 'https://geniuscafebali.com/wp-content/uploads/2024/01/image-header-opt-1.jpg',           copy: 'Кафе у моря для медленного дня и работы с видом.', maps: 'https://maps.google.com/?q=Genius+Cafe+Sanur', topPick: false, lat: -8.7093, lng: 115.2610 }
    ]
  }
];

/* Порядок ротации зон для свободных дней */
var SB_FREE_ZONE_ROTATION = ['seminyak_zone', 'uluwatu_zone', 'sanur_zone', 'canggu_zone', 'nusa_dua_zone', 'ubud_zone'];

/* Границы Бали — стартовый вид карты */
var SB_BALI_BOUNDS = [[-8.95, 114.35], [-8.05, 116.60]];

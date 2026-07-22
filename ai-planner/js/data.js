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
  nusa_lembongan_ceningan_day_trip: {
    name: 'Nusa Lembongan and Ceningan Day Trip',
    price: 'Ask Price',
    link: '/bali/en/tours/nusa-lembongan-ceningan-day-trip',
    pickup: 'Morning hotel pickup + harbor',
    img: '../images/tours-real/nusa-lembongan-ceningan-day-trip.jpg'
  },
  blue_lagoon_snorkeling: {
    name: 'Blue Lagoon Snorkeling',
    price: 'Ask Price',
    link: '/bali/en/tours/blue-lagoon-snorkeling',
    pickup: 'Morning hotel pickup',
    img: '../images/tours-real/blue-lagoon-snorkeling.jpg'
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
    id: 'ubud', name: 'Убуд', lat: -8.5069, lng: 115.2625,
    cat: 'Культура', vibes: ['chill', 'temple', 'waterfall'],
    desc: 'Художественное сердце Бали: Лес обезьян, дворец Убуда, галереи и джунглевые водопады в получасе езды.',
    img: '../images/places/ubud-monkey-forest.jpg',
    alt: 'Лес обезьян в Убуде — тропический парк с храмами и макаками',
    maps: 'https://maps.google.com/?q=Ubud+Monkey+Forest',
    rating: 4.8, topPick: true, tour: 'ubud_highlights'
  },
  {
    id: 'tegallalang', name: 'Террасы Тегаллаланг', lat: -8.4312, lng: 115.2777,
    cat: 'Рисовые террасы', vibes: ['chill'],
    desc: 'Изумрудные ступени рисовых полей, качели над джунглями и дегустация кофе лювак на плантации.',
    img: '../images/places/tegalalang-rice-terraces.jpg',
    alt: 'Рисовые террасы Тегаллаланг рядом с Убудом',
    maps: 'https://maps.google.com/?q=Tegalalang+Rice+Terrace',
    rating: 4.7, topPick: true, tour: 'ubud_highlights'
  },
  {
    id: 'batur', name: 'Вулкан Батур', lat: -8.2422, lng: 115.3750,
    cat: 'Вулкан', vibes: ['volcano'],
    desc: 'Рассвет над кальдерой из открытого джипа, поля чёрной лавы и горячие источники у озера.',
    img: '../images/tours-real/mount-batur-sunrise-jeep-tour.jpg',
    alt: 'Рассвет над вулканом Батур и кальдерой в Кинтамани',
    maps: 'https://maps.google.com/?q=Mount+Batur+Bali',
    rating: 4.9, topPick: false, tour: 'batur_jeep_hot_spring'
  },
  {
    id: 'kintamani', name: 'Кинтамани', lat: -8.2530, lng: 115.3565,
    cat: 'Смотровая', vibes: ['volcano', 'chill'],
    desc: 'Деревня на кромке кальдеры: панорама Батура, озеро и завтрак с самым вулканическим видом острова.',
    img: '../images/places/mount-batur-sunrise-trek.jpg',
    alt: 'Панорама рассвета с гребня вулкана Батур, Кинтамани',
    maps: 'https://maps.google.com/?q=Kintamani+Bali',
    rating: 4.7, topPick: false, tour: 'batur_sunrise'
  },
  {
    id: 'sekumpul', name: 'Водопад Секумпул', lat: -8.1712, lng: 115.1856,
    cat: 'Водопад', vibes: ['waterfall'],
    desc: 'Семь мощных струй, падающих в зелёный каньон, — самый впечатляющий водопад Бали.',
    img: '../images/places/bali-waterfall.jpg',
    alt: 'Водопад в джунглях северного Бали',
    maps: 'https://maps.google.com/?q=Sekumpul+Waterfall',
    rating: 4.8, topPick: false, tour: 'dolphin_sunrise_city_tour'
  },
  {
    id: 'munduk', name: 'Мундук и озёра', lat: -8.2650, lng: 115.0899,
    cat: 'Горы', vibes: ['waterfall', 'chill'],
    desc: 'Прохладная горная деревня: озёра Братан и Тамблинган, храм Улун Дану и тропы среди гвоздичных рощ.',
    img: '../images/bali-tours/unesco-ulun-danu.jpg',
    alt: 'Храм Улун Дану Братан на горном озере рядом с Мундуком',
    maps: 'https://maps.google.com/?q=Munduk+Bali',
    rating: 4.7, topPick: false, tour: 'dolphin_sunrise_city_tour'
  },
  {
    id: 'tanah_lot', name: 'Танах-Лот', lat: -8.6212, lng: 115.0868,
    cat: 'Храм', vibes: ['temple'],
    desc: 'Морской храм на скале в волнах — визитная карточка Бали и один из лучших закатов острова.',
    img: '../images/bali-tours/unesco-tanah-lot-sunset.jpg',
    alt: 'Храм Танах-Лот на скале в океане на закате',
    maps: 'https://maps.google.com/?q=Tanah+Lot+Temple',
    rating: 4.8, topPick: true, tour: 'temple_culture'
  },
  {
    id: 'canggu', name: 'Чангу', lat: -8.6478, lng: 115.1385,
    cat: 'Сёрф', vibes: ['beach', 'chill'],
    desc: 'Столица сёрфа и кафе: пляж Бату-Болонг, бич-клубы и золотые закаты западного берега.',
    img: '../images/places/surfing-in-canggu.jpg',
    alt: 'Сёрфер на волне у пляжа в Чангу',
    maps: 'https://maps.google.com/?q=Canggu+Bali',
    rating: 4.7, topPick: false, tour: 'surf_lesson_experience'
  },
  {
    id: 'uluwatu', name: 'Улувату', lat: -8.8291, lng: 115.0849,
    cat: 'Храм', vibes: ['temple', 'beach'],
    desc: 'Храм на 70-метровой скале над океаном, вечерний танец кечак и легендарные пляжи Букита.',
    img: '../images/places/uluwatu-temple-cliff.jpg',
    alt: 'Храм Улувату на скале над океаном',
    maps: 'https://maps.google.com/?q=Uluwatu+Temple',
    rating: 4.8, topPick: true, tour: 'temple_culture'
  },
  {
    id: 'nusa_dua', name: 'Нуса-Дуа', lat: -8.8067, lng: 115.2280,
    cat: 'Пляж', vibes: ['beach', 'chill'],
    desc: 'Спокойные белые пляжи, брызги Waterblow на скалах и вечерние круизы из гавани Беноа.',
    img: 'https://live.staticflickr.com/4474/37781456082_9e2bc54082_b.jpg',
    alt: 'Волны Waterblow разбиваются о скалы в Нуса-Дуа',
    maps: 'https://maps.google.com/?q=Nusa+Dua+Beach',
    rating: 4.7, topPick: true, tour: 'sunset_cruise_bali'
  },
  {
    id: 'lempuyang', name: 'Лемпуянг — Врата рая', lat: -8.3906, lng: 115.6316,
    cat: 'Храм', vibes: ['temple'],
    desc: 'Знаменитые расколотые ворота с силуэтом вулкана Агунг — главное фото восточного Бали.',
    img: '../images/tours-real/east-bali-instagram-tour.jpg',
    alt: 'Врата рая храма Лемпуянг с вулканом Агунг в проёме',
    maps: 'https://maps.google.com/?q=Lempuyang+Temple',
    rating: 4.7, topPick: false, tour: 'east_bali_instagram_tour'
  },
  {
    id: 'amed', name: 'Амед', lat: -8.3364, lng: 115.6631,
    cat: 'Снорклинг', vibes: ['dive', 'beach'],
    desc: 'Чёрный вулканический песок, японский затонувший корабль и коралловые сады прямо у берега.',
    img: '../images/tours-real/blue-lagoon-snorkeling.jpg',
    alt: 'Снорклинг над кораллами у восточного побережья Бали',
    maps: 'https://maps.google.com/?q=Amed+Beach+Bali',
    rating: 4.7, topPick: false, tour: 'blue_lagoon_snorkeling'
  },
  {
    id: 'jatiluwih', name: 'Джатилувих', lat: -8.3689, lng: 115.1306,
    cat: 'Рисовые террасы', vibes: ['chill'],
    desc: 'Бескрайние рисовые террасы под охраной ЮНЕСКО у подножия горы Батукару.',
    img: '../images/bali-tours/unesco-jatiluwih-hero.jpg',
    alt: 'Рисовые террасы Джатилувих — объект ЮНЕСКО на Бали',
    maps: 'https://maps.google.com/?q=Jatiluwih+Rice+Terraces',
    rating: 4.8, topPick: false, tour: 'bali_unesco'
  },
  {
    id: 'sidemen', name: 'Сидемен', lat: -8.4667, lng: 115.4333,
    cat: 'Долина', vibes: ['chill'],
    desc: 'Зелёная долина с видом на Агунг: рисовые поля, ткацкие мастерские и рафтинг на реке Телага-Ваджа.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sidemen%2C_Bali%2C_Indonesia.jpg/1280px-Sidemen%2C_Bali%2C_Indonesia.jpg',
    alt: 'Долина Сидемен с рисовыми полями и вулканом Агунг',
    maps: 'https://maps.google.com/?q=Sidemen+Bali',
    rating: 4.8, topPick: true, tour: 'white_water_rafting'
  },
  {
    id: 'besakih', name: 'Бесаких', lat: -8.3739, lng: 115.4517,
    cat: 'Храм', vibes: ['temple', 'volcano'],
    desc: '«Мать всех храмов» — гигантский комплекс из 86 святилищ на склоне вулкана Агунг.',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Besakih%20Bali%20Indonesia%20Pura-Besakih-02.jpg?width=1280',
    alt: 'Храмовый комплекс Пура Бесаких на склоне вулкана Агунг',
    maps: 'https://maps.google.com/?q=Besakih+Temple+Bali',
    rating: 4.7, topPick: false, tour: 'temple_culture'
  },
  {
    id: 'kelingking', name: 'Келингкинг', lat: -8.7503, lng: 115.4744,
    cat: 'Смотровая', vibes: ['beach'],
    desc: 'Скала «Ти-Рекс» на Нуса-Пениде — самый узнаваемый обрыв Индонезии и пляж под 200-метровой стеной.',
    img: '../images/places/kelingking-beach-viewpoint.jpg',
    alt: 'Смотровая Келингкинг — скала Ти-Рекс на Нуса-Пениде',
    maps: 'https://maps.google.com/?q=Kelingking+Beach',
    rating: 4.9, topPick: false, tour: 'nusa_penida_west_tour'
  },
  {
    id: 'crystal_bay', name: 'Кристал-Бэй', lat: -8.7147, lng: 115.4581,
    cat: 'Пляж', vibes: ['beach', 'dive'],
    desc: 'Бухта с прозрачной водой и кораллами — лучшее место Нуса-Пениды для купания и заката.',
    img: '../images/places/crystal-bay.jpg',
    alt: 'Пляж Кристал-Бэй на Нуса-Пениде',
    maps: 'https://maps.google.com/?q=Crystal+Bay+Nusa+Penida',
    rating: 4.6, topPick: false, tour: 'nusa_penida_full_day_tour'
  },
  {
    id: 'manta_point', name: 'Manta Point', lat: -8.7920, lng: 115.5210,
    cat: 'Снорклинг', vibes: ['dive'],
    desc: 'Встреча с океанскими мантами размахом до четырёх метров — главный снорклинг-спот Бали.',
    img: '../images/tours-real/nusa-penida-manta-rays-point.jpg',
    alt: 'Манта скользит над рифом на Manta Point, Нуса-Пенида',
    maps: 'https://maps.google.com/?q=Manta+Point+Nusa+Penida',
    rating: 4.9, topPick: false, tour: 'nusa_penida_manta_point'
  },
  {
    id: 'lembongan', name: 'Нуса-Лембонган', lat: -8.6819, lng: 115.4442,
    cat: 'Остров', vibes: ['chill', 'beach', 'dive'],
    desc: 'Мангровые заросли, жёлтый мост на Ченинган и «Слеза дьявола» — остров медленной жизни.',
    img: '../images/tours-real/nusa-lembongan-ceningan-day-trip.jpg',
    alt: 'Жёлтый подвесной мост между Нуса-Лембонган и Нуса-Ченинган',
    maps: 'https://maps.google.com/?q=Nusa+Lembongan',
    rating: 4.7, topPick: false, tour: 'nusa_lembongan_ceningan_day_trip'
  },
  {
    id: 'lovina', name: 'Ловина', lat: -8.1580, lng: 115.0250,
    cat: 'Море', vibes: ['beach', 'chill'],
    desc: 'Стаи диких дельфинов на рассвете и тихие чёрные пляжи северного побережья.',
    img: '../images/tours-real/dolphin-sunrise-city-tour.jpg',
    alt: 'Дельфины выпрыгивают из воды на рассвете у Ловины',
    maps: 'https://maps.google.com/?q=Lovina+Beach+Bali',
    rating: 4.6, topPick: false, tour: 'dolphin_sunrise_city_tour'
  }
];

/* ------------------------------------------------------------
   Шаблоны дней: каждая карточка дня = связный по географии
   мини-маршрут + реальный тур SB Excursions.
   order — географический порядок в поездке.
   ------------------------------------------------------------ */
var SB_DAY_TEMPLATES = [
  {
    id: 'ubud_day', order: 1, title: 'Убуд и рисовые террасы',
    vibes: ['chill', 'temple', 'waterfall'], tour: 'ubud_highlights',
    stops: [
      { loc: 'ubud',        time: '09:00', note: 'Лес обезьян, дворец и утренний Убуд' },
      { loc: 'tegallalang', time: '12:30', note: 'Террасы, качели и кофейная плантация' }
    ]
  },
  {
    id: 'batur_day', order: 2, title: 'Рассвет на вулкане Батур',
    vibes: ['volcano'], tour: 'batur_jeep_hot_spring',
    stops: [
      { loc: 'batur',     time: '04:30', note: 'Джип на смотровую к рассвету' },
      { loc: 'kintamani', time: '08:30', note: 'Кальдера, озеро и горячие источники' }
    ]
  },
  {
    id: 'north_day', order: 3, title: 'Север: дельфины и водопады',
    vibes: ['waterfall', 'chill'], tour: 'dolphin_sunrise_city_tour',
    stops: [
      { loc: 'lovina',   time: '06:00', note: 'Дельфины на рассвете' },
      { loc: 'sekumpul', time: '09:30', note: 'Каскады Секумпула' },
      { loc: 'munduk',   time: '12:30', note: 'Озёра и обед с видом на горы' }
    ]
  },
  {
    id: 'unesco_day', order: 4, title: 'День ЮНЕСКО',
    vibes: ['temple', 'chill'], tour: 'bali_unesco',
    stops: [
      { loc: 'jatiluwih', time: '10:00', note: 'Террасы Джатилувиха' },
      { loc: 'tanah_lot', time: '17:30', note: 'Закат у морского храма' }
    ]
  },
  {
    id: 'east_day', order: 5, title: 'Восток: Врата рая',
    vibes: ['temple', 'dive'], tour: 'east_bali_instagram_tour',
    stops: [
      { loc: 'lempuyang', time: '07:30', note: 'Фото во Вратах рая до толп' },
      { loc: 'amed',      time: '12:00', note: 'Снорклинг в бухте Джемелук' }
    ]
  },
  {
    id: 'sidemen_day', order: 6, title: 'Сидемен и Бесаких',
    vibes: ['chill', 'temple', 'volcano'], tour: 'white_water_rafting',
    stops: [
      { loc: 'sidemen', time: '09:00', note: 'Долина, рис и рафтинг на Телага-Ваджа' },
      { loc: 'besakih', time: '14:00', note: '«Мать всех храмов» на склоне Агунга' }
    ]
  },
  {
    id: 'bukit_day', order: 7, title: 'Полуостров Букит',
    vibes: ['temple', 'beach'], tour: 'sunset_cruise_bali',
    stops: [
      { loc: 'uluwatu',  time: '15:00', note: 'Храм на скале и танец кечак' },
      { loc: 'nusa_dua', time: '18:30', note: 'Закатный круиз из гавани Беноа' }
    ]
  },
  {
    id: 'canggu_day', order: 8, title: 'Чангу и Танах-Лот',
    vibes: ['beach', 'chill'], tour: 'surf_lesson_experience',
    stops: [
      { loc: 'canggu',    time: '10:00', note: 'Серф-урок на Бату-Болонг' },
      { loc: 'tanah_lot', time: '17:30', note: 'Закат у храма на скале' }
    ]
  },
  {
    id: 'penida_day', order: 9, title: 'Нуса-Пенида: запад',
    vibes: ['beach', 'dive'], tour: 'nusa_penida_west_tour',
    stops: [
      { loc: 'kelingking',  time: '10:00', note: 'Смотровая «Ти-Рекс»' },
      { loc: 'crystal_bay', time: '14:30', note: 'Пляж, кораллы и купание' }
    ]
  },
  {
    id: 'manta_day', order: 10, title: 'Снорклинг с мантами',
    vibes: ['dive', 'beach'], tour: 'nusa_penida_manta_point',
    stops: [
      { loc: 'manta_point', time: '08:30', note: 'Манты на Manta Point' },
      { loc: 'crystal_bay', time: '12:00', note: 'Кристал-Бэй и рифовые сады' }
    ]
  },
  {
    id: 'lembongan_day', order: 11, title: 'Нуса-Лембонган',
    vibes: ['chill', 'beach', 'dive'], tour: 'nusa_lembongan_ceningan_day_trip',
    stops: [
      { loc: 'lembongan', time: '10:00', note: 'Жёлтый мост, мангры и «Слеза дьявола»' }
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
      { title: 'Ubud Art Market', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ubud_Market%2C_Bali%2C_Indonesia.jpg/1280px-Ubud_Market%2C_Bali%2C_Indonesia.jpg',     copy: 'Сувениры, ткани и классический Убуд в самом центре.',    maps: 'https://maps.google.com/?q=Ubud+Art+Market', topPick: true, lat: -8.5077, lng: 115.2640 }
    ]
  },
  {
    id: 'uluwatu_zone', name: 'Улувату', lat: -8.8291, lng: 115.0849,
    intro: 'Пляжный день на Буките: бирюзовые бухты и закат над океаном.',
    recs: [
      { title: 'Melasti Beach', img: 'https://live.staticflickr.com/4359/36544779010_4216b5a497_b.jpg',       copy: 'Один из лучших пляжей Бали — белый песок под скалами.', maps: 'https://maps.google.com/?q=Melasti+Beach+Bali', topPick: true, lat: -8.8483, lng: 115.1590 },
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
var SB_BALI_BOUNDS = [[-8.95, 114.40], [-8.05, 115.80]];

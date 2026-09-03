/*
 * Кто мы — одним файлом, чтобы во всей сборке была одна версия правды.
 *
 * Раньше SITE_URL и разметка организации жили внутри генератора на 48 тысяч
 * строк и наружу не отдавались. Любой пост-обработке, которой нужны те же
 * данные, оставалось копировать их к себе — а копия рано или поздно
 * разъезжается с оригиналом. Здесь их импортируют и генератор, и
 * add-organization-schema.mjs.
 *
 * Импортировать сам генератор ради этих констант нельзя: он запускает
 * сборку прямо при загрузке модуля.
 */

// Обязательно с www: сервер отдаёт 308-редирект с sbexcursion.com на
// www.sbexcursion.com, и ресурс в Search Console заведён тоже на www.
// Если ставить сюда голый домен, то canonical, og:url, hreflang и sitemap
// начинают указывать на адрес, который сам себя перенаправляет: Google
// перезаписывает canonical, а в sitemap видит чужие URL и пишет по каждой
// странице «Нет ссылающихся файлов Sitemap».
export const SITE_URL = "https://www.sbexcursion.com";

export const WHATSAPP_NUMBER = "6285333685020";

// Организация одним куском, чтобы во всех schema стояли одни и те же данные.
// sameAs — то, чем поисковики и нейросети подтверждают, что за сайтом стоит
// живая компания, а не одинокий лендинг: без внешних профилей подтвердить
// нечем. Ссылки взяты те же, что стоят в подвале сайта.
/* Описание организации по языкам.
 *
 * Разметку организации вставляет отдельный шаг сборки, уже ПОСЛЕ локализации
 * страниц. Поэтому её строки мимо переводчика проходят всегда: на немецкой
 * странице стояло английское описание, и так на 1556 страницах. Пины тут не
 * помогают — переводить нечего, текст приходит готовым куском после того,
 * как переводчик отработал. Значит язык надо выбирать здесь. */
export const ORGANIZATION_DESCRIPTION = {
  en: "Private guided day tours across Bali and the Nusa islands, booked directly over WhatsApp.",
  ru: "Индивидуальные однодневные экскурсии с гидом по Бали и островам Nusa, бронирование напрямую через WhatsApp.",
  es: "Excursiones privadas de un día con guía por Bali y las islas Nusa, reservadas directamente por WhatsApp.",
  fr: "Excursions privées guidées à la journée à Bali et dans les îles Nusa, réservables directement sur WhatsApp.",
  de: "Private geführte Tagestouren über Bali und die Nusa-Inseln, direkt über WhatsApp gebucht.",
  zh: "覆盖巴厘岛和Nusa群岛的私人向导一日游，可通过WhatsApp直接预订。",
};

export const ORGANIZATION_SCHEMA = {
  // TravelAgency — подтип LocalBusiness: для локальных туристических
  // запросов и AI-ответов «tour operator in Bali» это сильнее голого
  // Organization. Адрес и диапазон цен — из подвала сайта и прайса.
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: "SB Excursions",
  url: SITE_URL,
  description: ORGANIZATION_DESCRIPTION.en,
  areaServed: { "@type": "Place", name: "Bali, Indonesia" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Petitenget",
    addressLocality: "Seminyak",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
  /* aggregateRating здесь стоял на 1844 страницах, а объекты Review — только
     на 138. Разметка рейтинга организации, не подкреплённая отзывами на самой
     странице, — прямое нарушение правил структурированных данных и повод для
     ручных санкций. Рейтинг остаётся видимым текстом в карточке тура и в
     разметке Product там, где отзывы реально есть. */
  priceRange: "$15-$150",
  telephone: "+62 853 3368 5020",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png`,
  },
  // wa.me здесь не место: sameAs — только профили-подтверждения сущности,
  // контакт для брони уже лежит в contactPoint.
  //
  // Сюда же добавлять по мере появления: ссылку Google Business Profile
  // (maps.app.goo.gl/...), страницу компании в LinkedIn, профиль
  // ProvenExpert. Чем больше подтверждённых профилей, тем увереннее
  // поисковики и ИИ склеивают бренд в сущность. Но только живые адреса:
  // ссылка на удалённую страницу подтверждает не существование бренда,
  // а его отсутствие.
  sameAs: [
    /* Wikidata здесь была и её пришлось убрать. Элемент Q141142313 удалён
       21.08.2026 в 11:56 UTC администратором с формулировкой «Does not meet
       the notability policy» (лог удалений 672430061), адрес отдаёт 404.
       Мёртвая ссылка в sameAs хуже её отсутствия: поисковик идёт по ней
       подтверждать сущность и не находит ничего.

       Пересоздавать элемент нельзя — снесут повторно по тому же основанию.
       Wikidata станет возможна, когда о компании напишут независимые
       источники, то есть после публикаций в прессе, а не до них. */
    "https://www.tripadvisor.com/Attraction_Review-g469404-d34593301-Reviews-SB_Excursions-Seminyak_Kuta_District_Badung_Regency_Bali.html",
    "https://www.trustpilot.com/review/sbexcursion.com",
    "https://www.instagram.com/dubai_sb_excursions",
    "https://t.me/SurfBase",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "reservations",
    telephone: "+62 853 3368 5020",
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
    availableLanguage: ["English", "Russian", "Spanish", "French", "Chinese"],
  },
};


/* Схема под конкретный язык страницы. Меняем только то, что действительно
   зависит от языка: название компании, адрес, рейтинг и телефон одинаковы
   везде, и переводить их нельзя. */
export function organizationSchemaFor(locale) {
  const description = ORGANIZATION_DESCRIPTION[locale] || ORGANIZATION_DESCRIPTION.en;
  return { ...ORGANIZATION_SCHEMA, description };
}

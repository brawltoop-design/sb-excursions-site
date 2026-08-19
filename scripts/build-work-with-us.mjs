/*
 * Партнёрская страница Work With Us на пяти языках сайта.
 *
 *   /work-with-us       → work-with-us.html     (en, x-default)
 *   /ru/work-with-us    → work-with-us-ru.html
 *   /es/work-with-us    → work-with-us-es.html
 *   /fr/work-with-us    → work-with-us-fr.html
 *   /zh/work-with-us    → work-with-us-zh.html
 *
 * Страница, которую владелец отправляет потенциальным партнёрам: виллам,
 * сёрф-школам, водителям, блогерам. Суть сделки: фикса $3–$10 за каждую
 * бронь, выплата после тура, без договоров — трекинг по имени партнёра
 * в WhatsApp.
 *
 * Переводы здесь РУЧНЫЕ (не машинные) — правь строки прямо в COPY.
 * Хедер и футер — родные, тянутся из донора через sb-tilda-chrome.mjs.
 * Весь CSS контента скоупится под .sb-wwu, чтобы не воевать с Тильдой.
 *
 * Запуск идёт из scripts/build.mjs после генератора.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildChromedPage } from "./sb-tilda-chrome.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://www.sbexcursion.com";
/* Немецкого здесь нет намеренно: тексты этой страницы написаны руками,
   а не переведены машиной, и в первую немецкую волну она не входит.
   Добавлять код языка сюда можно только вместе с блоком COPY.de. */
const LANGS = ["en", "ru", "es", "fr", "zh"];
const routeOf = (l) => (l === "en" ? "/work-with-us" : `/${l}/work-with-us`);
const fileOf = (l) => (l === "en" ? "work-with-us.html" : `work-with-us-${l}.html`);
const LANG_LABELS = { en: "EN", ru: "РУ", es: "ES", fr: "FR", zh: "中文" };

/* eslint-disable max-len */
const COPY = {
  en: {
    title: "Work With Us — SB Excursions Partner Program | $3–$10 Per Booking",
    description: "Send a guest, get paid: a flat $3–$10 for every booking you bring to SB Excursions Bali tours. No contracts, no paperwork — for villas, surf schools, drivers and creators.",
    schemaName: "Work With Us — SB Excursions Partner Program",
    schemaDesc: "A flat $3–$10 referral fee for every booking you bring to SB Excursions Bali tours.",
    wa: "Hello! I want to join the SB Excursions partner program.",
    waName: "My name is ...",
    kicker: "SB Excursions · Bali · Partner program",
    h1: "Send us a guest.<br><em>Get paid.</em>",
    sub: "You know people who want to see Bali — we run the tours. Recommend us, and we pay you a <strong>flat $3–$10 for every booking</strong>. Paid after every tour. No contracts, no paperwork, no minimums — just your name on the booking.",
    ctaMain: "Become a partner — 2 minutes",
    ctaGhost: "How it works ↓",
    badge: "FLAT FEE PER BOOKING · PAID AFTER EVERY TOUR ·",
    marquee: ["Villas", "Guesthouses", "Surf schools", "Cafés", "Drivers", "Guides", "Creators"],
    dealEyebrow: "The deal",
    dealH2: "One booking = one fee.<br>Every time, <em>no exceptions.</em>",
    cells: [
      ["<b>$3–10</b>", "flat fee for every booking you bring — not a percentage you have to double-check"],
      ["28", "private tours to recommend: Nusa Penida, Mount Batur, rafting, Gili, whale sharks"],
      ["$0", "prepayment for your guests — they book on WhatsApp and pay on the day"],
      ["∞", "no cap and no expiry: ten bookings a week means ten fees a week"],
    ],
    tiers: [
      ["Transfers &amp; fast boats", "airport pickups, boat tickets · tours from $15", "$3"],
      ["Half-day activities", "rafting, ATV, surf lessons, sunset cruise · from $25", "$5"],
      ["Full-day tours &amp; island trips", "Nusa Penida, Batur sunrise, Gili, whale sharks · from $49", "$10"],
    ],
    fine: 'One fee per booking, whatever the group size — simple to count, impossible to argue about. Current tour prices are always live at <a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>.',
    audEyebrow: "Who this is for",
    audH2: 'If travelers ask you<br><em>"what should we do here?"</em> — you qualify.',
    cards: [
      ["Bali villa with a pool", "Villas &amp; guesthouses", "Your guests ask for trips at check-in anyway. Hand them our WhatsApp with your partner name — the fee is yours, the logistics are ours."],
      ["Café in Canggu", "Surf schools &amp; cafés", "A QR on the counter or a line after the lesson: \"want a Penida day? — tell them our name\". Zero effort, recurring fees."],
      ["Private driver in Bali", "Drivers &amp; local friends", "Your passengers want island trips you don't run yourself. Pass them over instead of losing them — and get paid for it."],
      ["Diamond Beach cliffs on Nusa Penida", "Bloggers &amp; creators", "Answering \"who did you book with?\" in your DMs every day? Give your partner name — every booking from your followers is a fee."],
    ],
    stepsEyebrow: "How it works",
    stepsH2: "No links, no dashboards.<br>Your name <em>is</em> the tracking.",
    steps: [
      ["Message us on WhatsApp", "Say you want to partner. We agree on your partner name — usually just your villa's, café's or your own name — and you're in. Takes two minutes, no forms."],
      ["Your guest books and names you", "They write to the same WhatsApp, pick any of the 28 tours and mention your name. That's it — we note the referral on the booking right away."],
      ["You get paid after the tour", "Once the guest's tour day is done, your flat fee is on its way — cash on Bali or a transfer, whatever suits you. Every booking, every time."],
    ],
    gets: ["✓ Your partner name", '✓ <a href="/bali/en/tour-prices">Live price list</a> to share', "✓ Photo pack &amp; tour one-liners for chats", "✓ Replies 7:00–22:00 Bali time"],
    whyEyebrow: "Why your guests will thank you",
    whyH2: "Easy to recommend,<br>because it's <em>easy to book.</em>",
    why: [
      ["From $15", "Private tours at direct-operator prices — from a $15 transfer to a $150 whale-shark day."],
      ["No prepayment", "Guests confirm on WhatsApp and pay on the day — nothing to lose if plans change."],
      ["Private, not groups", "Own car, own driver, own pace — no bus-load strangers, no fixed herding schedule."],
      ["5 languages", "Site and booking in English, Spanish, French, Chinese and Russian — recommend to any guest."],
    ],
    faqEyebrow: "Questions",
    faqH2: "The fine print, <em>without the fine print.</em>",
    faq: [
      ["How and when do I get paid?", "Right after your guest's tour day — a flat $3–$10 per booking depending on the tour tier above, sent however suits you: cash on Bali or a transfer. No minimum payout, no waiting for the end of the month."],
      ["What counts as a referred booking?", "Any tour booked on WhatsApp where the guest mentions your partner name. That's the whole tracking system — no links to install, no dashboards to check."],
      ["Do I need to sign anything?", "No. This is a simple named-referral arrangement over WhatsApp. You message us once, get your partner name, and start recommending the same day."],
      ["Is there a cap on referrals?", "No cap and no expiry. Ten bookings in a week means ten fees in a week — group or solo, every booking counts."],
      ["Can I promote the tours online?", 'Yes — we\'ll send a photo pack and short tour descriptions for stories, chats and group posts. The only rule: no spam and no made-up claims about prices or inclusions. Everything real is at <a href="/bali/en/tour-prices">the live price list</a>.'],
    ],
    finalEyebrow: "Ready?",
    finalH2: "Two minutes on WhatsApp<br>is the <em>whole onboarding.</em>",
    finalBtn: "Become a partner",
    finalNote: "WhatsApp +62 853-3368-5020 · replies 7:00–22:00 Bali time · English, Spanish, French, Chinese, Russian",
  },

  ru: {
    title: "Партнёрская программа SB Excursions — фикс $3–10 за каждую бронь",
    description: "Приведите гостя и получите деньги: фикс $3–10 за каждую бронь тура на Бали. Без договоров и бумаг — для вилл, сёрф-школ, водителей и блогеров.",
    schemaName: "Партнёрская программа SB Excursions",
    schemaDesc: "Фикс $3–10 за каждую бронь тура SB Excursions на Бали, которую вы привели.",
    wa: "Здравствуйте! Хочу стать партнёром SB Excursions.",
    waName: "Меня зовут ...",
    kicker: "SB Excursions · Бали · Партнёрская программа",
    h1: "Приведите гостя.<br><em>Получите деньги.</em>",
    sub: "У вас есть люди, которые хотят посмотреть Бали, — у нас есть туры. Рекомендуйте нас, и мы платим <strong>фикс $3–10 за каждую бронь</strong>. Выплата после каждого тура. Без договоров, без бумаг, без минималок — только ваше имя в брони.",
    ctaMain: "Стать партнёром — 2 минуты",
    ctaGhost: "Как это работает ↓",
    badge: "ФИКС ЗА КАЖДУЮ БРОНЬ · ВЫПЛАТА ПОСЛЕ ТУРА ·",
    marquee: ["Виллы", "Гестхаусы", "Сёрф-школы", "Кафе", "Водители", "Гиды", "Блогеры"],
    dealEyebrow: "Условия",
    dealH2: "Одна бронь = один фикс.<br>Каждый раз, <em>без исключений.</em>",
    cells: [
      ["<b>$3–10</b>", "фикс за каждую приведённую бронь — не процент, который надо перепроверять"],
      ["28", "приватных туров для рекомендаций: Нуса-Пенида, Батур, рафтинг, Гили, китовые акулы"],
      ["$0", "предоплаты для ваших гостей — бронируют в WhatsApp и платят в день тура"],
      ["∞", "без потолка и сроков: десять броней в неделю — десять выплат в неделю"],
    ],
    tiers: [
      ["Трансферы и фастботы", "аэропорт, билеты на лодки · туры от $15", "$3"],
      ["Активности на полдня", "рафтинг, квадроциклы, сёрф-уроки, круиз на закате · от $25", "$5"],
      ["Туры на весь день и острова", "Нуса-Пенида, рассвет на Батуре, Гили, китовые акулы · от $49", "$10"],
    ],
    fine: 'Один фикс за бронь, каким бы ни был размер группы, — легко посчитать, не о чем спорить. Актуальные цены туров всегда на <a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>.',
    audEyebrow: "Для кого это",
    audH2: "Если туристы спрашивают вас<br><em>«что тут посмотреть?»</em> — это для вас.",
    cards: [
      ["Вилла с бассейном на Бали", "Виллы и гестхаусы", "Гости всё равно спрашивают про экскурсии при заселении. Дайте им наш WhatsApp и своё партнёрское имя — фикс ваш, логистика наша."],
      ["Кафе в Чангу", "Сёрф-школы и кафе", "QR на стойке или фраза после урока: «хотите день на Пениде? — назовите наше имя». Ноль усилий, регулярные выплаты."],
      ["Личный водитель на Бали", "Водители и местные", "Пассажиры просят туры на острова, которые вы сами не возите. Передавайте их нам вместо того, чтобы терять, — и получайте за это деньги."],
      ["Скалы Даймонд-Бич на Нуса-Пениде", "Блогеры и авторы", "Каждый день отвечаете в директе «у кого бронировали?» Называйте своё партнёрское имя — каждая бронь подписчика приносит фикс."],
    ],
    stepsEyebrow: "Как это работает",
    stepsH2: "Без ссылок и кабинетов.<br>Ваше имя — <em>и есть трекинг.</em>",
    steps: [
      ["Напишите нам в WhatsApp", "Скажите, что хотите партнёрство. Согласуем ваше партнёрское имя — обычно это название виллы, кафе или просто ваше имя — и всё. Две минуты, никаких анкет."],
      ["Гость бронирует и называет вас", "Он пишет в тот же WhatsApp, выбирает любой из 28 туров и упоминает ваше имя. Всё — мы сразу отмечаем бронь как вашу."],
      ["Выплата после тура", "Как только тур гостя прошёл, ваш фикс уже в пути — наличными на Бали или переводом, как удобно. Каждая бронь, каждый раз."],
    ],
    gets: ["✓ Ваше партнёрское имя", '✓ <a href="/bali/en/tour-prices">Живой прайс</a> — делитесь', "✓ Фотопак и описания туров для чатов", "✓ Ответы 7:00–22:00 по Бали"],
    whyEyebrow: "Почему гости скажут вам спасибо",
    whyH2: "Легко рекомендовать,<br>потому что <em>легко бронировать.</em>",
    why: [
      ["От $15", "Приватные туры по ценам оператора — от трансфера за $15 до дня с китовыми акулами за $150."],
      ["Без предоплаты", "Гость подтверждает в WhatsApp и платит в день тура — если планы изменились, он ничего не теряет."],
      ["Приватно, а не в группе", "Своя машина, свой водитель, свой темп — без автобуса незнакомцев и жёсткого графика."],
      ["5 языков", "Сайт и бронирование на английском, испанском, французском, китайском и русском — рекомендуйте любому гостю."],
    ],
    faqEyebrow: "Вопросы",
    faqH2: "Мелкий шрифт — <em>без мелкого шрифта.</em>",
    faq: [
      ["Как и когда я получу деньги?", "Сразу после дня тура вашего гостя — фикс $3–10 за бронь — по категории тура из таблицы выше, как удобно: наличными на Бали или переводом. Без минимальной суммы и без ожидания конца месяца."],
      ["Что считается приведённой бронью?", "Любой тур, забронированный в WhatsApp, где гость назвал ваше партнёрское имя. Это и есть весь трекинг — без ссылок и кабинетов."],
      ["Нужно ли что-то подписывать?", "Нет. Всё держится на простой договорённости в WhatsApp: гость просто называет ваше имя. Пишете один раз, получаете партнёрское имя и начинаете рекомендовать в тот же день."],
      ["Есть ли потолок по броням?", "Нет ни потолка, ни сроков. Десять броней в неделю — десять фиксов в неделю; группа или соло, каждая бронь считается."],
      ["Можно продвигать туры онлайн?", 'Да — пришлём фотопак и короткие описания туров для сторис, чатов и постов. Единственное правило: без спама и выдуманных обещаний о ценах и том, что входит в тур. Всё настоящее — в <a href="/bali/en/tour-prices">живом прайсе</a>.'],
    ],
    finalEyebrow: "Готовы?",
    finalH2: "Две минуты в WhatsApp —<br><em>и вы в программе.</em>",
    finalBtn: "Стать партнёром",
    finalNote: "WhatsApp +62 853-3368-5020 · отвечаем 7:00–22:00 по Бали · английский, испанский, французский, китайский, русский",
  },

  es: {
    title: "Colabora con nosotros — Programa de socios SB Excursions | $3–10 por reserva",
    description: "Envíanos un huésped y cobra: $3–10 fijos por cada reserva que traigas a los tours de SB Excursions en Bali. Sin contratos ni papeleo: para villas, escuelas de surf, conductores y creadores.",
    schemaName: "Colabora con nosotros — Programa de socios SB Excursions",
    schemaDesc: "Una tarifa fija de $3–10 por cada reserva que traigas a los tours de SB Excursions en Bali.",
    wa: "¡Hola! Quiero unirme al programa de socios de SB Excursions.",
    waName: "Me llamo ...",
    kicker: "SB Excursions · Bali · Programa de socios",
    h1: "Envíanos un huésped.<br><em>Cobra.</em>",
    sub: "Conoces gente que quiere ver Bali — nosotros hacemos los tours. Recomiéndanos y te pagamos <strong>$3–10 fijos por cada reserva</strong>. Pago después de cada tour. Sin contratos, sin papeleo, sin mínimos: solo tu nombre en la reserva.",
    ctaMain: "Hazte socio — 2 minutos",
    ctaGhost: "Cómo funciona ↓",
    badge: "TARIFA FIJA POR RESERVA · PAGO TRAS CADA TOUR ·",
    marquee: ["Villas", "Guesthouses", "Escuelas de surf", "Cafés", "Conductores", "Guías", "Creadores"],
    dealEyebrow: "El trato",
    dealH2: "Una reserva = una tarifa.<br>Siempre, <em>sin excepciones.</em>",
    cells: [
      ["<b>$3–10</b>", "de tarifa fija por cada reserva que traes — no un porcentaje que tengas que revisar"],
      ["28", "tours privados para recomendar: Nusa Penida, monte Batur, rafting, Gili, tiburones ballena"],
      ["$0", "de prepago para tus huéspedes — reservan por WhatsApp y pagan el día del tour"],
      ["∞", "sin tope ni caducidad: diez reservas por semana son diez pagos por semana"],
    ],
    tiers: [
      ["Traslados y fast boats", "recogidas en el aeropuerto, billetes de barco · tours desde $15", "$3"],
      ["Actividades de medio día", "rafting, quads, clases de surf, crucero al atardecer · desde $25", "$5"],
      ["Tours de día completo e islas", "Nusa Penida, amanecer en el Batur, Gili, tiburones ballena · desde $49", "$10"],
    ],
    fine: 'Una tarifa por reserva, sea cual sea el tamaño del grupo: fácil de contar, imposible de discutir. Los precios actuales siempre están en <a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>.',
    audEyebrow: "Para quién es",
    audH2: "Si los viajeros te preguntan<br><em>«¿qué hacemos aquí?»</em> — esto es para ti.",
    cards: [
      ["Villa con piscina en Bali", "Villas y guesthouses", "Tus huéspedes ya te preguntan por excursiones al hacer el check-in. Dales nuestro WhatsApp con tu nombre de socio: la tarifa es tuya, la logística nuestra."],
      ["Café en Canggu", "Escuelas de surf y cafés", "Un QR en el mostrador o una frase tras la clase: «¿un día en Penida? — di nuestro nombre». Cero esfuerzo, ingresos recurrentes."],
      ["Conductor privado en Bali", "Conductores y amigos locales", "Tus pasajeros quieren tours a islas que tú no haces. Pásanoslos en vez de perderlos — y cobra por ello."],
      ["Acantilados de Diamond Beach en Nusa Penida", "Blogueros y creadores", "¿Respondes cada día «¿con quién reservaste?» en tus mensajes? Da tu nombre de socio: cada reserva de tus seguidores es una tarifa."],
    ],
    stepsEyebrow: "Cómo funciona",
    stepsH2: "Sin enlaces ni paneles.<br>Tu nombre <em>es</em> el tracking.",
    steps: [
      ["Escríbenos por WhatsApp", "Di que quieres ser socio. Acordamos tu nombre de socio — normalmente el de tu villa, tu café o el tuyo propio — y listo. Dos minutos, sin formularios."],
      ["Tu huésped reserva y te nombra", "Escribe al mismo WhatsApp, elige cualquiera de los 28 tours y menciona tu nombre. Eso es todo: anotamos la referencia en la reserva al momento."],
      ["Cobras después del tour", "Cuando termina el día del tour, tu tarifa fija ya va en camino: efectivo en Bali o transferencia, como prefieras. Cada reserva, siempre."],
    ],
    gets: ["✓ Tu nombre de socio", '✓ <a href="/bali/en/tour-prices">Lista de precios siempre al día</a> para compartir', "✓ Pack de fotos y descripciones para chats", "✓ Respuestas 7:00–22:00, hora de Bali"],
    whyEyebrow: "Por qué tus huéspedes te lo agradecerán",
    whyH2: "Fácil de recomendar<br>porque es <em>fácil de reservar.</em>",
    why: [
      ["Desde $15", "Tours privados a precio de operador directo: desde un traslado de $15 hasta un día con tiburones ballena de $150."],
      ["Sin prepago", "El huésped confirma por WhatsApp y paga el día del tour: no pierde nada si cambian los planes."],
      ["Privado, no en grupo", "Coche propio, conductor propio, ritmo propio: sin autobuses llenos de desconocidos ni horarios rígidos."],
      ["5 idiomas", "Web y reservas en inglés, español, francés, chino y ruso: recomienda a cualquier huésped."],
    ],
    faqEyebrow: "Preguntas",
    faqH2: "La letra pequeña, <em>sin letra pequeña.</em>",
    faq: [
      ["¿Cómo y cuándo cobro?", "Justo después del día del tour de tu huésped: $3–10 fijos por reserva según la tabla de arriba, como te convenga — efectivo en Bali o transferencia. Sin mínimo de pago y sin esperar a fin de mes."],
      ["¿Qué cuenta como reserva referida?", "Cualquier tour reservado por WhatsApp donde el huésped mencione tu nombre de socio. Ese es todo el sistema: sin enlaces que instalar ni paneles que revisar."],
      ["¿Tengo que firmar algo?", "No. Es un simple acuerdo de recomendación con tu nombre, todo por WhatsApp. Escribes una vez, recibes tu nombre de socio y empiezas a recomendar el mismo día."],
      ["¿Hay algún tope?", "Ni tope ni caducidad. Diez reservas en una semana son diez tarifas en una semana: en grupo o solo, cada reserva cuenta."],
      ["¿Puedo promocionar los tours online?", 'Sí: te enviamos un pack de fotos y descripciones cortas para stories, chats y posts. La única regla: nada de spam ni afirmaciones inventadas sobre precios o sobre lo que incluye cada tour. Todo lo real está en <a href="/bali/en/tour-prices">la lista de precios actualizada</a>.'],
    ],
    finalEyebrow: "¿Listo?",
    finalH2: "Dos minutos en WhatsApp<br>y <em>ya estás dentro.</em>",
    finalBtn: "Hazte socio",
    finalNote: "WhatsApp +62 853-3368-5020 · respondemos 7:00–22:00, hora de Bali · inglés, español, francés, chino, ruso",
  },

  fr: {
    title: "Travaillez avec nous — Programme partenaires SB Excursions | 3–10 $ par réservation",
    description: "Envoyez-nous un voyageur, soyez payé : 3–10 $ fixes pour chaque réservation apportée aux tours SB Excursions à Bali. Sans contrat ni paperasse — villas, écoles de surf, chauffeurs, créateurs.",
    schemaName: "Travaillez avec nous — Programme partenaires SB Excursions",
    schemaDesc: "Un montant fixe de 3–10 $ pour chaque réservation apportée aux tours SB Excursions à Bali.",
    wa: "Bonjour ! Je veux rejoindre le programme partenaires de SB Excursions.",
    waName: "Je m’appelle ...",
    kicker: "SB Excursions · Bali · Programme partenaires",
    h1: "Envoyez-nous un voyageur.<br><em>Soyez payé.</em>",
    sub: "Vous connaissez des gens qui veulent découvrir Bali — nous organisons les tours. Recommandez-nous, et nous vous versons <strong>3–10 $ fixes pour chaque réservation</strong>. Versé après chaque tour. Sans contrat, sans paperasse, sans minimum — juste votre nom sur la réservation.",
    ctaMain: "Devenir partenaire — 2 minutes",
    ctaGhost: "Comment ça marche ↓",
    badge: "MONTANT FIXE PAR RÉSERVATION · PAYÉ APRÈS CHAQUE TOUR ·",
    marquee: ["Villas", "Guesthouses", "Écoles de surf", "Cafés", "Chauffeurs", "Guides", "Créateurs"],
    dealEyebrow: "Le deal",
    dealH2: "Une réservation = un montant.<br>À chaque fois, <em>sans exception.</em>",
    cells: [
      ["<b>3–10 $</b>", "de montant fixe pour chaque réservation apportée — pas un pourcentage à vérifier"],
      ["28", "tours privés à recommander : Nusa Penida, mont Batur, rafting, Gili, requins-baleines"],
      ["0 $", "de prépaiement pour vos voyageurs — ils réservent sur WhatsApp et paient le jour du tour"],
      ["∞", "ni plafond ni expiration : dix réservations par semaine, dix paiements par semaine"],
    ],
    tiers: [
      ["Transferts et fast boats", "transferts aéroport, billets de bateau · tours dès 15 $", "3 $"],
      ["Activités demi-journée", "rafting, quad, cours de surf, croisière au coucher du soleil · dès 25 $", "5 $"],
      ["Tours à la journée et îles", "Nusa Penida, lever de soleil au Batur, Gili, requins-baleines · dès 49 $", "10 $"],
    ],
    fine: 'Un montant par réservation, quelle que soit la taille du groupe — simple à compter, impossible à contester. Les prix à jour sont toujours sur <a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>.',
    audEyebrow: "À qui ça s’adresse",
    audH2: "Si les voyageurs vous demandent<br><em>« on fait quoi ici ? »</em> — c’est pour vous.",
    cards: [
      ["Villa avec piscine à Bali", "Villas et guesthouses", "Vos hôtes demandent des excursions dès le check-in. Donnez-leur notre WhatsApp avec votre nom de partenaire — le montant est pour vous, la logistique pour nous."],
      ["Café à Canggu", "Écoles de surf et cafés", "Un QR au comptoir ou un mot après le cours : « une journée à Penida ? — donnez notre nom ». Zéro effort, des revenus récurrents."],
      ["Chauffeur privé à Bali", "Chauffeurs et amis locaux", "Vos passagers veulent des tours vers les îles que vous ne faites pas vous-même. Confiez-les-nous au lieu de les perdre — et soyez payé pour ça."],
      ["Falaises de Diamond Beach à Nusa Penida", "Blogueurs et créateurs", "On vous demande chaque jour « tu as réservé chez qui ? » en privé ? Donnez votre nom de partenaire — chaque réservation de vos abonnés vous rapporte un montant."],
    ],
    stepsEyebrow: "Comment ça marche",
    stepsH2: "Pas de liens, pas de tableaux de bord.<br>Votre nom, <em>c’est</em> le tracking.",
    steps: [
      ["Écrivez-nous sur WhatsApp", "Dites que vous voulez devenir partenaire. On valide votre nom de partenaire — en général celui de votre villa, de votre café ou le vôtre — et c’est bon. Deux minutes, aucun formulaire."],
      ["Votre voyageur réserve et donne votre nom", "Il écrit au même WhatsApp, choisit n’importe lequel des 28 tours et mentionne votre nom. C’est tout — la référence est notée sur la réservation immédiatement."],
      ["Vous êtes payé après le tour", "Une fois le tour terminé, votre montant fixe est en route — espèces à Bali ou virement, comme vous préférez. Chaque réservation, à chaque fois."],
    ],
    gets: ["✓ Votre nom de partenaire", '✓ <a href="/bali/en/tour-prices">Grille tarifaire à jour</a> à partager', "✓ Pack photos et descriptions pour vos conversations", "✓ Réponses 7 h–22 h, heure de Bali"],
    whyEyebrow: "Pourquoi vos voyageurs vous remercieront",
    whyH2: "Facile à recommander,<br>parce que <em>facile à réserver.</em>",
    why: [
      ["Dès 15 $", "Des tours privés au prix de l’opérateur direct — du transfert à 15 $ à la journée requins-baleines à 150 $."],
      ["Sans prépaiement", "Le voyageur confirme sur WhatsApp et paie le jour du tour — rien à perdre si les plans changent."],
      ["Privé, pas en groupe", "Votre voiture, votre chauffeur, votre rythme — pas de bus d’inconnus ni d’horaires imposés."],
      ["5 langues", "Site et réservation en anglais, espagnol, français, chinois et russe — recommandez-nous à n’importe quel voyageur."],
    ],
    faqEyebrow: "Questions",
    faqH2: "Les petites lignes, <em>sans petites lignes.</em>",
    faq: [
      ["Comment et quand suis-je payé ?", "Juste après le tour de votre voyageur — 3–10 $ fixes par réservation selon le niveau du tour ci-dessus, comme vous voulez : espèces à Bali ou virement. Pas de minimum, pas d’attente de fin de mois."],
      ["Qu’est-ce qui compte comme réservation recommandée ?", "Tout tour réservé sur WhatsApp où le voyageur mentionne votre nom de partenaire. C’est tout le système — aucun lien à installer, aucun tableau de bord à surveiller."],
      ["Dois-je signer quelque chose ?", "Non. C’est un simple accord via WhatsApp, basé sur votre nom de partenaire. Vous écrivez une fois, recevez votre nom de partenaire et commencez à recommander le jour même."],
      ["Y a-t-il un plafond ?", "Ni plafond ni expiration. Dix réservations dans la semaine, dix paiements dans la semaine — en groupe ou en solo, chaque réservation compte."],
      ["Puis-je promouvoir les tours en ligne ?", 'Oui — on vous envoie un pack photos et de courtes descriptions pour vos stories, chats et posts. Une seule règle : pas de spam ni de promesses inventées sur les prix ou ce qui est inclus. Les vraies infos sont dans <a href="/bali/en/tour-prices">la grille tarifaire à jour</a>.'],
    ],
    finalEyebrow: "Prêt ?",
    finalH2: "Deux minutes sur WhatsApp,<br><em>et c’est réglé.</em>",
    finalBtn: "Devenir partenaire",
    finalNote: "WhatsApp +62 853-3368-5020 · réponses 7 h–22 h, heure de Bali · anglais, espagnol, français, chinois, russe",
  },

  zh: {
    title: "与我们合作 — SB Excursions 合作伙伴计划｜每单预订固定 $3–10",
    description: "介绍客人即有酬劳：每带来一单巴厘岛行程预订，固定获得 $3–10。无合同、无手续——适合别墅民宿、冲浪学校、司机和博主。",
    schemaName: "与我们合作 — SB Excursions 合作伙伴计划",
    schemaDesc: "每为 SB Excursions 巴厘岛行程带来一单预订，即可获得固定 $3–10 的推荐酬劳。",
    wa: "您好！我想加入 SB Excursions 合作伙伴计划。",
    waName: "我的名字是…",
    kicker: "SB Excursions · 巴厘岛 · 合作伙伴计划",
    h1: "介绍一位客人。<br><em>拿到报酬。</em>",
    sub: "你认识想游巴厘岛的人——我们负责行程。推荐我们，每一单预订你都能拿到<strong>固定 $3–10</strong>。每次行程结束后立即结算。无合同、无文书、无最低门槛——只需让客人预订时报上你的名字。",
    ctaMain: "成为伙伴 — 2 分钟",
    ctaGhost: "怎么运作 ↓",
    badge: "每单固定酬劳 · 行程结束即结算 ·",
    marquee: ["别墅", "民宿", "冲浪学校", "咖啡馆", "司机", "向导", "博主"],
    dealEyebrow: "合作规则",
    dealH2: "一单预订 = 一份酬劳。<br>每一次，<em>没有例外。</em>",
    cells: [
      ["<b>$3–10</b>", "每带来一单预订的固定酬劳——不是需要反复核对的百分比"],
      ["28", "可推荐的私人行程：佩尼达岛、巴图尔火山、漂流、吉利群岛、鲸鲨"],
      ["$0", "客人无需预付——WhatsApp 预订，行程当天付款"],
      ["∞", "无上限、无期限：一周十单就是一周十份酬劳"],
    ],
    tiers: [
      ["接送与快艇", "机场接送、船票 · 行程 $15 起", "$3"],
      ["半日活动", "漂流、ATV 越野、冲浪课、日落游船 · $25 起", "$5"],
      ["全日游与海岛游", "佩尼达岛、巴图尔日出、吉利群岛、鲸鲨 · $49 起", "$10"],
    ],
    fine: '无论一单几个人，一单预订一份酬劳——好算清，无争议。最新行程价格随时可查：<a href="/bali/en/tour-prices">sbexcursion.com/bali/en/tour-prices</a>。',
    audEyebrow: "适合谁",
    audH2: "如果游客常问你<br><em>「这里有什么好玩的？」</em>——这就适合你。",
    cards: [
      ["巴厘岛带泳池的别墅", "别墅与民宿", "客人办入住时总会问行程。把我们的 WhatsApp 和你的伙伴名给他们——酬劳归你，行程归我们。"],
      ["仓古的咖啡馆", "冲浪学校与咖啡馆", "吧台放个二维码，或课后一句话：「想去佩尼达吗？报我们的名字」。毫不费力，持续进账。"],
      ["巴厘岛的私人司机", "司机与本地朋友", "乘客想去你自己不跑的海岛线路？把他们转给我们，别白白流失——还能拿酬劳。"],
      ["佩尼达岛钻石海滩的悬崖", "博主与创作者", "每天都在私信里回答「你在哪家订的」？报出你的伙伴名——粉丝每订一单，你得一份酬劳。"],
    ],
    stepsEyebrow: "怎么运作",
    stepsH2: "没有链接，没有后台。<br>你的名字<em>就是</em>追踪系统。",
    steps: [
      ["在 WhatsApp 联系我们", "说明想合作。我们确认你的伙伴名——通常就是别墅、咖啡馆或你本人的名字——就完成了。两分钟，不填表。"],
      ["客人预订并报你的名字", "客人发消息到同一个 WhatsApp，选 28 条行程中的任意一条并提到你的名字。就这样——我们立刻在订单上记下推荐人。"],
      ["行程结束后结算", "客人行程当天结束，你的酬劳就已在路上——巴厘岛现金或转账，随你方便。每一单，每一次。"],
    ],
    gets: ["✓ 你的伙伴名", '✓ 可分享的<a href="/bali/en/tour-prices">实时价目表</a>', "✓ 聊天用的图片包和行程简介", "✓ 巴厘岛时间 7:00–22:00 在线"],
    whyEyebrow: "客人为什么会感谢你",
    whyH2: "好推荐，<br>因为<em>好预订。</em>",
    why: [
      ["低至 $15", "无中间商的直营一手价私人行程——从 $15 的接送到 $150 的鲸鲨之旅。"],
      ["无预付", "客人在 WhatsApp 确认、行程当天付款——计划有变也没有损失。"],
      ["私人团，不拼团", "专车、专属司机、自己的节奏——没有陌生人大巴，没有赶场时间表。"],
      ["5 种语言", "网站与预订支持英语、西语、法语、中文和俄语——什么客人都能推荐。"],
    ],
    faqEyebrow: "常见问题",
    faqH2: "细则摆上台面，<em>没有隐藏条款。</em>",
    faq: [
      ["怎么结算、什么时候结算？", "客人行程当天结束后立即结算——按上面的行程级别，每单固定 $3–10，巴厘岛现金或转账都行。没有最低结算金额，不用等月底。"],
      ["什么算推荐预订？", "任何在 WhatsApp 预订、客人提到你的伙伴名的行程。这就是全部追踪系统——不用挂链接，不用盯后台。"],
      ["需要签什么吗？", "不需要。这是通过 WhatsApp 达成的简单约定：发一条消息，拿到伙伴名，当天就能开始推荐。"],
      ["有上限吗？", "没有上限也没有期限。一周十单就是一周十份酬劳——组团还是单人，每一单都算。"],
      ["可以在网上推广吗？", '可以——我们会发图片包和行程简介，方便发限时动态、群聊和帖子。唯一的规则：不刷屏、不虚构价格和包含项目。真实信息都在<a href="/bali/en/tour-prices">实时价目表</a>里。'],
    ],
    finalEyebrow: "准备好了？",
    finalH2: "WhatsApp 上的两分钟<br>就是<em>全部入伙流程。</em>",
    finalBtn: "成为伙伴",
    finalNote: "WhatsApp +62 853-3368-5020 · 巴厘岛时间 7:00–22:00 回复 · 英语、西语、法语、中文、俄语",
  },
};
/* eslint-enable max-len */

const styleBlock = `<link rel="stylesheet" href="/css/fonts-manrope.css">
<style id="sb-wwu-css">
.sb-wwu{
  --sand:#ffffff;--ink:#141412;--muted:#75716a;--line:rgba(20,20,18,.12);
  --accent:#0ea5e9;--dark:#161512;--sand-on-dark:#ececec;
  font-family:'Manrope','TildaSans',Arial,sans-serif;color:var(--ink);line-height:1.55;
  background:var(--sand);overflow:clip;
}
/* fonts-cinageo.css общесайтово ставит html h1-h4{font-weight:400!important} —
   возвращаем дисплейные веса (этот блок в каскаде позже и побеждает) */
html body{background-color:#ffffff!important}
html .sb-wwu .hero h1,html .sb-wwu h2{font-weight:300!important}
html .sb-wwu .card h3{font-weight:600!important}
html .sb-wwu .steps h3{font-weight:500!important}
html{scroll-behavior:smooth}
.sb-wwu *{box-sizing:border-box}
.sb-wwu img{max-width:100%;display:block}
.sb-wwu a{color:inherit}
/* тильдовское #allrecords a красит все ссылки в фирменный оранжевый —
   для контента этой страницы возвращаем наследование и свои цвета кнопок */
#allrecords .sb-wwu a{color:inherit}
#allrecords .sb-wwu .btn-dark{color:var(--sand)}
#allrecords .sb-wwu .btn-dark:hover{color:#fff}
#allrecords .sb-wwu .deal .fine a{color:#9edcff}
.sb-wwu .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.sb-wwu section{padding:clamp(70px,10vw,130px) 0;margin:0}

/* ---------- hero ---------- */
/* isolation: без своего stacking context фото с z-index:-1 провалились бы под фон */
.sb-wwu .hero{position:relative;isolation:isolate;min-height:92svh;display:flex;flex-direction:column;justify-content:center;padding:150px 0 90px;overflow:clip}
.sb-wwu .kicker{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 22px}
.sb-wwu .hero h1{font-size:clamp(54px,10.5vw,148px);line-height:.96;letter-spacing:-.05em;font-weight:300;margin:0;text-wrap:balance;font-family:inherit}
.sb-wwu .hero h1 em{font-style:normal;font-weight:600}
.sb-wwu .hero .sub{max-width:52ch;font-size:clamp(16px,1.6vw,20px);margin:30px 0 0;color:#3c3a35}
.sb-wwu .hero .sub strong{font-weight:700}
.sb-wwu .cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px}
.sb-wwu .btn{display:inline-flex;align-items:center;gap:10px;text-decoration:none;border-radius:999px;padding:16px 30px;font-size:16px;font-weight:600;transition:transform .25s ease,box-shadow .25s ease,background .25s ease}
.sb-wwu .btn-dark{background:var(--ink);color:var(--sand)}
.sb-wwu .btn-dark:hover{background:linear-gradient(100deg,#0284c7,#38bdf8,#1d4ed8,#22d3ee,#0284c7);background-size:250% 100%;animation:sbwwu-shift 5s linear infinite;color:#fff;transform:translateY(-2px);box-shadow:0 14px 30px -14px rgba(14,165,233,.6)}
.sb-wwu .btn-ghost{border:1.5px solid var(--line);color:var(--ink)}
.sb-wwu .btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}

/* переключатель языков страницы */
.sb-wwu .langs{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}
.sb-wwu .langs a{font-size:13px;font-weight:700;letter-spacing:.04em;padding:8px 14px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}
.sb-wwu .langs a:hover{border-color:var(--ink);color:var(--ink)}
#allrecords .sb-wwu .langs a{color:var(--muted)}
#allrecords .sb-wwu .langs a:hover{color:var(--ink)}
#allrecords .sb-wwu .langs a.on{background:var(--ink);color:#fff;border-color:var(--ink)}

/* плавающие фото */
.sb-wwu .chips{position:absolute;inset:0;pointer-events:none;z-index:-1}
.sb-wwu .chip{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px -24px rgba(20,20,18,.45);will-change:transform;animation:sbwwu-float 9s ease-in-out infinite}
.sb-wwu .chip img{width:100%;height:100%;object-fit:cover}
.sb-wwu .chip::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.sb-wwu .chip.c1{width:min(21vw,250px);aspect-ratio:3/4;top:12%;right:6%;rotate:5deg;animation-delay:-1s}
.sb-wwu .chip.c2{width:min(17vw,200px);aspect-ratio:4/3;top:48%;right:20%;rotate:-6deg;animation-delay:-3.5s}
.sb-wwu .chip.c3{width:min(15vw,180px);aspect-ratio:1/1;bottom:8%;right:5%;rotate:3deg;animation-delay:-6s}
.sb-wwu .chip.c4{width:min(13vw,150px);aspect-ratio:3/4;bottom:12%;left:2%;rotate:-8deg;animation-delay:-2s}
.sb-wwu .chip.c5{width:min(11vw,130px);aspect-ratio:1/1;top:16%;left:-1%;rotate:7deg;animation-delay:-5s}
@keyframes sbwwu-float{0%,100%{translate:0 0}50%{translate:0 -16px}}
@media(max-width:760px){
  /* на мобиле фото уходят в «полку» под кнопками, а не поверх текста */
  .sb-wwu .hero{padding-bottom:52vw;min-height:auto}
  .sb-wwu .chip.c2,.sb-wwu .chip.c5{display:none}
  .sb-wwu .chip.c1{width:34vw;top:auto;bottom:3%;right:4%}
  .sb-wwu .chip.c3{width:27vw;bottom:6%;right:40%}
  .sb-wwu .chip.c4{width:26vw;bottom:2%;left:3%}
}
/* мобильный топбар: на туровых страницах белое лого лежит на тёмном фото,
   здесь фон светлый — даём топбару тот же тёмный фон, что и при скролле */
@media(max-width:980px){
  #nav2128776473 .t451__container,#nav2128776473 .t451__container__bg{background:#333333!important}
}

/* вращающийся бейдж с фиксой */
.sb-wwu .badge{position:absolute;z-index:2;top:19%;right:28%;width:150px;height:150px;pointer-events:none}
.sb-wwu .badge svg{width:100%;height:100%;animation:sbwwu-spin 22s linear infinite}
.sb-wwu .badge .mid{position:absolute;inset:0;display:grid;place-items:center;font-weight:700;font-size:26px;letter-spacing:-.03em}
@keyframes sbwwu-spin{to{rotate:360deg}}
@media(max-width:1000px){.sb-wwu .badge{display:none}}

/* ---------- бегущая строка ---------- */
.sb-wwu .marquee{border-block:1px solid var(--line);padding:18px 0;overflow:clip;background:var(--sand)}
.sb-wwu .marquee .track{display:flex;width:max-content;animation:sbwwu-slide 26s linear infinite}
.sb-wwu .marquee span{font-size:clamp(20px,3vw,34px);font-weight:300;letter-spacing:-.03em;white-space:nowrap;padding-right:18px}
.sb-wwu .marquee b{font-weight:400;padding-right:18px}
@keyframes sbwwu-slide{to{transform:translateX(-50%)}}

/* ---------- секции ---------- */
.sb-wwu .eyebrow{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 18px}
.sb-wwu h2{font-size:clamp(36px,5.5vw,72px);font-weight:300;letter-spacing:-.045em;line-height:1.02;margin:0 0 26px;text-wrap:balance;font-family:inherit}
.sb-wwu h2 em{font-style:normal;font-weight:500}

/* сделка — тёмная секция */
.sb-wwu .deal{background:var(--dark);color:var(--sand-on-dark)}
.sb-wwu .deal h2{color:#fff}
.sb-wwu .deal .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.14);border-radius:20px;overflow:hidden;margin-top:48px}
.sb-wwu .deal .cell{background:var(--dark);padding:34px 28px}
.sb-wwu .deal .num{font-size:clamp(40px,4.5vw,62px);font-weight:300;letter-spacing:-.04em;line-height:1;color:#fff}
.sb-wwu .deal .num b{font-weight:500}
.sb-wwu .deal .cell p{margin:14px 0 0;font-size:15px;color:rgba(255,255,255,.72)}
.sb-wwu .tiers{margin-top:46px;border:1px solid rgba(255,255,255,.16);border-radius:20px;overflow:hidden}
.sb-wwu .tier{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:baseline;padding:22px 28px;border-top:1px solid rgba(255,255,255,.12)}
.sb-wwu .tier:first-child{border-top:0}
.sb-wwu .tier .t-name{font-size:clamp(18px,2.2vw,26px);font-weight:400;letter-spacing:-.02em;color:#fff;font-family:inherit}
.sb-wwu .tier .t-name small{display:block;font-size:14px;color:rgba(255,255,255,.6);margin-top:4px;font-weight:400}
.sb-wwu .tier .t-fee{font-size:clamp(26px,3.4vw,44px);font-weight:500;letter-spacing:-.03em;white-space:nowrap}
.sb-wwu .deal .fine{margin:18px 4px 0;font-size:14px;color:rgba(255,255,255,.55)}
.sb-wwu .deal .fine a{color:#9edcff}

/* для кого */
.sb-wwu .aud .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin-top:44px}
.sb-wwu .card{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;transition:transform .35s ease,box-shadow .35s ease}
.sb-wwu .card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -30px rgba(20,20,18,.35)}
.sb-wwu .card img{height:170px;width:100%;object-fit:cover}
.sb-wwu .card .pad{padding:22px 22px 26px}
.sb-wwu .card h3{margin:0;font-size:21px;font-weight:600;letter-spacing:-.02em;font-family:inherit}
.sb-wwu .card p{margin:10px 0 0;font-size:15px;color:#4b4841}
.sb-wwu .card .idx{font-size:12px;font-weight:700;letter-spacing:.12em;display:block;margin-bottom:8px}

/* шаги */
.sb-wwu .steps ol{list-style:none;margin:44px 0 0;padding:0;counter-reset:st}
.sb-wwu .steps li{counter-increment:st;display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:start;padding:34px 0;border-top:1px solid var(--line)}
.sb-wwu .steps li::before{content:"0" counter(st);font-size:clamp(40px,6vw,84px);font-weight:200;letter-spacing:-.05em;line-height:.9}
.sb-wwu .steps h3{margin:4px 0 8px;font-size:clamp(21px,2.6vw,30px);font-weight:500;letter-spacing:-.02em;font-family:inherit}
.sb-wwu .steps p{margin:0;max-width:62ch;font-size:16px;color:#3c3a35}
.sb-wwu .gets{display:flex;flex-wrap:wrap;gap:10px;margin-top:34px}
.sb-wwu .gets span{background:#fff;border:1px solid var(--line);border-radius:999px;padding:10px 18px;font-size:14.5px;font-weight:600}
.sb-wwu .gets a{text-decoration:underline;text-underline-offset:3px}

/* почему гости соглашаются */
.sb-wwu .why{background:#fafafa}
.sb-wwu .why ul{list-style:none;margin:40px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.sb-wwu .why li{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px;font-size:15.5px}
.sb-wwu .why li b{display:block;font-size:19px;letter-spacing:-.02em;margin-bottom:6px;font-weight:600}

/* вопросы */
.sb-wwu .faq details{border-top:1px solid var(--line);padding:6px 0}
.sb-wwu .faq details:last-of-type{border-bottom:1px solid var(--line)}
.sb-wwu .faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 0;font-size:clamp(18px,2.2vw,24px);font-weight:500;letter-spacing:-.02em}
.sb-wwu .faq summary::-webkit-details-marker{display:none}
.sb-wwu .faq summary::after{content:"+";font-size:30px;font-weight:200;transition:rotate .3s ease;flex:none}
.sb-wwu .faq details[open] summary::after{rotate:45deg}
.sb-wwu .faq .a{max-width:68ch;padding:0 0 22px;font-size:16px;color:#3c3a35;margin:0}

/* финальный призыв */
.sb-wwu .final{text-align:center}
.sb-wwu .final h2{font-size:clamp(40px,7vw,96px)}
.sb-wwu .final .btn{font-size:18px;padding:20px 42px}
.sb-wwu .final .note{margin:18px 0 0;font-size:14.5px;color:var(--muted)}
.sb-wwu .final .langs{justify-content:center}

/* появление при прокрутке */
.js .sb-wwu .rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.6,.2,1),transform .8s cubic-bezier(.2,.6,.2,1)}
.js .sb-wwu .rv.in{opacity:1;transform:none}

/* акцентный текст: переливающийся голубой градиент внутри букв.
   color остаётся запасным цветом для браузеров без background-clip:text */
.sb-wwu .hero h1 em,.sb-wwu h2 em,.sb-wwu .badge .mid,.sb-wwu .deal .num b,.sb-wwu .tier .t-fee,.sb-wwu .card .idx,.sb-wwu .marquee b,.sb-wwu .faq summary::after,.sb-wwu .steps li::before{
  background-image:linear-gradient(100deg,#0284c7 0%,#38bdf8 22%,#1d4ed8 48%,#22d3ee 74%,#0284c7 100%);
  background-size:300% 100%;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:#0ea5e9;
  animation:sbwwu-shift 7s linear infinite;
}
@keyframes sbwwu-shift{to{background-position:300% 50%}}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .sb-wwu .chip,.sb-wwu .badge svg,.sb-wwu .marquee .track{animation:none!important}
  .sb-wwu .hero h1 em,.sb-wwu h2 em,.sb-wwu .badge .mid,.sb-wwu .deal .num b,.sb-wwu .tier .t-fee,.sb-wwu .card .idx,.sb-wwu .marquee b,.sb-wwu .faq summary::after,.sb-wwu .steps li::before,.sb-wwu .btn-dark:hover{animation:none!important}
  .js .sb-wwu .rv{opacity:1;transform:none;transition:none}
  .sb-wwu .btn,.sb-wwu .card{transition:none}
}
</style>`;

const bodyEndScript = `<script id="sb-wwu-js">
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // появление блоков при прокрутке
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".sb-wwu .rv").forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });

  // параллакс плавающих фото за курсором
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    var chips = [].slice.call(document.querySelectorAll(".sb-wwu .chip"));
    addEventListener("mousemove", function (e) {
      var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      chips.forEach(function (c) {
        var d = +c.dataset.depth || 16;
        c.style.transform = "translate(" + (-x * d) + "px," + (-y * d) + "px)";
      });
    }, { passive: true });
  }
})();
</script>`;

const CARD_IMAGES = [
  "/images/places/bali-villa-with-pool.jpg",
  "/images/places/canggu-cafe.jpg",
  "/images/places/private-driver-in-bali.jpg",
  "/images/places/diamond-beach-cliffs.jpg",
];

function langSwitcher(current) {
  const links = LANGS.map(
    (l) => `<a href="${routeOf(l)}"${l === current ? ' class="on" aria-current="page"' : ""} lang="${l}">${LANG_LABELS[l]}</a>`,
  ).join("");
  return `<nav class="langs rv" aria-label="Language">${links}</nav>`;
}

function renderBody(lang) {
  const t = COPY[lang];
  const wa = `https://wa.me/6285333685020?text=${encodeURIComponent(t.wa)}`;
  const waFinal = `https://wa.me/6285333685020?text=${encodeURIComponent(`${t.wa} ${t.waName}`)}`;
  const marquee = t.marquee.map((w) => `<span>${w}</span><b>✺</b>`).join("");

  return `<main class="sb-wwu">

<div class="hero">
  <div class="chips" aria-hidden="true">
    <div class="chip c1" data-depth="14"><img src="/images/places/kelingking-beach-t-rex-cliff.jpg" alt="" loading="eager"></div>
    <div class="chip c2" data-depth="26"><img src="/images/places/manta-ray-snorkeling.jpg" alt="" loading="lazy"></div>
    <div class="chip c3" data-depth="20"><img src="/images/places/mount-batur-sunrise-trek.jpg" alt="" loading="lazy"></div>
    <div class="chip c4" data-depth="30"><img src="/images/places/ayung-river-rafting.jpg" alt="" loading="lazy"></div>
    <div class="chip c5" data-depth="18"><img src="/images/places/tegalalang-rice-terraces.jpg" alt="" loading="lazy"></div>
  </div>
  <div class="badge" aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <defs><path id="sbwwu-circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
      <text style="font-size:9.2px;font-weight:600;letter-spacing:.12em;fill:#141412"><textPath href="#sbwwu-circ">${t.badge}</textPath></text>
    </svg>
    <span class="mid">$3–10</span>
  </div>
  <div class="wrap">
    <p class="kicker rv">${t.kicker}</p>
    <h1 class="rv">${t.h1}</h1>
    <p class="sub rv">${t.sub}</p>
    <div class="cta-row rv">
      <a class="btn btn-dark" href="${wa}" target="_blank" rel="noopener nofollow">${t.ctaMain}</a>
      <a class="btn btn-ghost" href="#how">${t.ctaGhost}</a>
    </div>
    ${langSwitcher(lang)}
  </div>
</div>

<div class="marquee" aria-hidden="true">
  <div class="track">${marquee}${marquee}</div>
</div>

<section class="deal">
  <div class="wrap">
    <p class="eyebrow rv">${t.dealEyebrow}</p>
    <h2 class="rv">${t.dealH2}</h2>
    <div class="grid rv">
${t.cells.map(([num, p]) => `      <div class="cell"><div class="num">${num}</div><p>${p}</p></div>`).join("\n")}
    </div>
    <div class="tiers rv">
${t.tiers.map(([name, small, fee]) => `      <div class="tier"><div class="t-name">${name}<small>${small}</small></div><div class="t-fee">${fee}</div></div>`).join("\n")}
    </div>
    <p class="fine rv">${t.fine}</p>
  </div>
</section>

<section class="aud">
  <div class="wrap">
    <p class="eyebrow rv">${t.audEyebrow}</p>
    <h2 class="rv">${t.audH2}</h2>
    <div class="cards">
${t.cards.map(([alt, h3, p], i) => `      <div class="card rv"><img src="${CARD_IMAGES[i]}" alt="${alt}" loading="lazy"><div class="pad"><span class="idx">0${i + 1}</span><h3>${h3}</h3><p>${p}</p></div></div>`).join("\n")}
    </div>
  </div>
</section>

<section class="steps" id="how">
  <div class="wrap">
    <p class="eyebrow rv">${t.stepsEyebrow}</p>
    <h2 class="rv">${t.stepsH2}</h2>
    <ol>
${t.steps.map(([h3, p]) => `      <li class="rv"><div><h3>${h3}</h3><p>${p}</p></div></li>`).join("\n")}
    </ol>
    <div class="gets rv">
${t.gets.map((g) => `      <span>${g}</span>`).join("\n")}
    </div>
  </div>
</section>

<section class="why">
  <div class="wrap">
    <p class="eyebrow rv">${t.whyEyebrow}</p>
    <h2 class="rv">${t.whyH2}</h2>
    <ul>
${t.why.map(([b, txt]) => `      <li class="rv"><b>${b}</b>${txt}</li>`).join("\n")}
    </ul>
  </div>
</section>

<section class="faq">
  <div class="wrap">
    <p class="eyebrow rv">${t.faqEyebrow}</p>
    <h2 class="rv">${t.faqH2}</h2>
${t.faq.map(([q, a]) => `    <details class="rv"><summary>${q}</summary><p class="a">${a}</p></details>`).join("\n")}
  </div>
</section>

<section class="final">
  <div class="wrap">
    <p class="eyebrow rv">${t.finalEyebrow}</p>
    <h2 class="rv">${t.finalH2}</h2>
    <p class="rv" style="margin:0 0 34px"><a class="btn btn-dark" href="${waFinal}" target="_blank" rel="noopener nofollow">${t.finalBtn}</a></p>
    <p class="note rv">${t.finalNote}</p>
    ${langSwitcher(lang)}
  </div>
</section>

</main>
`;
}

const hreflangBlock =
  LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${routeOf(l)}">`).join("\n") +
  `\n<link rel="alternate" hreflang="x-default" href="${SITE}${routeOf("en")}">\n`;

const sizes = {};
for (const lang of LANGS) {
  const t = COPY[lang];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}${routeOf(lang)}#webpage`,
        url: `${SITE}${routeOf(lang)}`,
        name: t.schemaName,
        description: t.schemaDesc,
        inLanguage: lang,
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q.replace(/<[^>]+>/g, ""),
          acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") },
        })),
      },
    ],
  };

  const html = await buildChromedPage(ROOT, {
    lang,
    title: t.title,
    description: t.description,
    canonical: `${SITE}${routeOf(lang)}`,
    ogImage: `${SITE}/images/places/kelingking-beach-t-rex-cliff.jpg`,
    heroPreload: "/images/places/kelingking-beach-t-rex-cliff.jpg",
    waText: t.wa,
    langLinks: { ru: routeOf("ru"), fr: routeOf("fr") },
    // У страницы есть все пять версий — переключатель ведёт на них,
    // а не на тур донора.
    localeRoute: routeOf,
    headExtra: hreflangBlock,
    schema,
    styleBlock,
    bodyContent: renderBody(lang),
    bodyEndScript,
  });

  await fs.writeFile(path.join(ROOT, fileOf(lang)), html);
  sizes[fileOf(lang)] = html.length;
}
console.log(JSON.stringify(sizes, null, 2));

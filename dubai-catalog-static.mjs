const INITIAL_VISIBLE_COUNT = 8;

const CATEGORY_DEFS = [
  { id: "all", label: "Все" },
  { id: "673510008632", label: "🐫 Desert" },
  { id: "867500366622", label: "🛥️ Yachts" },
  { id: "124785418842", label: "🏝️ Water activities" },
  { id: "288710657722", label: "🌇 City tours" },
  { id: "609281514832", label: "🚁 Helicopter and Baloon" },
  { id: "315308595262", label: "👩‍❤️‍👨Perfect dates" },
];

const TARGET_BLANK_LINKS = new Set([
  "https://sbexcursion.com/dubai/en/tours/dubai-marina-yacht-party",
]);

const CARDS = JSON.parse(String.raw`[
  {
    "descrHtml": "<ul><li data-list=\"bullet\">⏰ 7 hours </li><li data-list=\"bullet\">🚐 Pick Up and Drop Off</li><li data-list=\"bullet\">🏄 Sand boarding </li><li data-list=\"bullet\">🦂 Dune Bashing (30 min) </li><li data-list=\"bullet\">💃 Tanoura Show </li><li data-list=\"bullet\">🍖 BBQ Dinner </li><li data-list=\"bullet\">(1023) ★★★★★ 4.9 Google Maps</li></ul>",
    "image": "https://optim.tildacdn.one/stor3061-3438-4430-b364-626366653232/-/resize/600x600/-/format/webp/59262605.jpg.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/full-day-dubai-desert-safari",
    "oldPrice": "",
    "partUid": "673510008632",
    "price": "45",
    "productImg": "https://static.tildacdn.one/stor3061-3438-4430-b364-626366653232/59262605.jpg",
    "productLid": "785984787712",
    "productUid": "785984787712",
    "secondImage": "https://optim.tildacdn.one/stor3131-3933-4563-b166-343165303830/-/resize/600x600/-/format/webp/30001588.png.webp",
    "title": "Full Day Desert Safari, Sandbording and BBQ dinner"
  },
  {
    "descrHtml": "<ul><li data-list=\"bullet\">⏰ 7 hours</li><li data-list=\"bullet\">🚐 Pick Up and Drop Off</li><li data-list=\"bullet\">🏄 Sand boarding</li><li data-list=\"bullet\">🦂Dune Bashing <span style=\"font-weight: 100;\">(</span>30 min<span style=\"font-weight: 100;\">)</span></li><li data-list=\"bullet\">🏍 Quad Bike <span style=\"font-weight: 100;\">(</span>30 min<span style=\"font-weight: 100;\">)</span></li><li data-list=\"bullet\">🍖 BBQ Dinner</li><li data-list=\"bullet\"><span style=\"font-weight: 100;\">(</span>519<span style=\"font-weight: 100;\">)</span><span style=\"color: rgb(253, 229, 85);\">★★★★★</span> 4,9 Google maps</li></ul>",
    "image": "https://optim.tildacdn.one/stor3337-6635-4236-b332-653437623933/-/resize/600x600/-/format/webp/39548935.jpg.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/full-day-dubai-desert-safari",
    "oldPrice": "99",
    "partUid": "673510008632,986795454642",
    "price": "80",
    "productImg": "https://static.tildacdn.one/stor3337-6635-4236-b332-653437623933/39548935.jpg",
    "productLid": "373553212082",
    "productUid": "373553212082",
    "secondImage": "https://optim.tildacdn.one/stor6165-6636-4666-b232-626263656161/-/resize/600x600/-/format/webp/67625350.png.webp",
    "title": "Full Day Desert Safari, Quad Bike, Sandboarding and BBQ dinner"
  },
  {
    "descrHtml": "<ul><li data-list=\"bullet\">⏰ 7 hours</li><li data-list=\"bullet\">🚐 Pick Up and Drop Off</li><li data-list=\"bullet\">🏄 Sand boarding</li><li data-list=\"bullet\">🦂Dune Bashing <span style=\"font-weight: 100;\">(</span>30 min<span style=\"font-weight: 100;\">)</span></li><li data-list=\"bullet\">🍖 BBQ Dinner</li><li data-list=\"bullet\">🛻 Buggy <span style=\"font-weight: 100;\">(</span>30 min<span style=\"font-weight: 100;\">)</span></li><li data-list=\"bullet\">🐪 Camel Ride <span style=\"font-weight: 100;\">(</span>5 min<span style=\"font-weight: 100;\">)</span></li><li data-list=\"bullet\"><span style=\"font-weight: 100;\">(</span>378<span style=\"font-weight: 100;\">)</span><span style=\"color: rgb(253, 229, 85);\">★★★★★</span> 4,9 Google maps</li></ul>",
    "image": "https://optim.tildacdn.one/stor3062-6534-4139-a662-626331396364/-/resize/600x600/-/format/webp/22363856.jpg.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/full-day-dubai-desert-safari",
    "oldPrice": "",
    "partUid": "673510008632",
    "price": "240",
    "productImg": "https://static.tildacdn.one/stor3062-6534-4139-a662-626331396364/22363856.jpg",
    "productLid": "692316069902",
    "productUid": "692316069902",
    "secondImage": "https://optim.tildacdn.one/stor3330-6664-4832-b563-346362643436/-/resize/600x600/-/format/webp/11069466.png.webp",
    "title": "Full Day Desert Safari, Buggy, Camel Ride, Sandboarding and BBQ dinner"
  },
  {
    "descrHtml": "<ul><li data-list=\"bullet\">⏰ 1 hour </li><li data-list=\"bullet\">🛥️ Luxury Shared Yacht</li><li data-list=\"bullet\"> 🏙️ Dubai Marina &amp; JBR Views </li><li data-list=\"bullet\"> 📸 Best Photo Stops </li><li data-list=\"bullet\">🥤 Refreshments included </li><li data-list=\"bullet\">🗓️ Available Every Hour </li><li data-list=\"bullet\">(2453) ★★★★★ 4.9 Google Maps</li></ul>",
    "image": "https://optim.tildacdn.one/stor6264-6530-4233-a336-373331316363/-/resize/600x600/-/format/webp/50149528.jpg.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour",
    "oldPrice": "",
    "partUid": "867500366622",
    "price": "32",
    "productImg": "https://static.tildacdn.one/stor6264-6530-4233-a336-373331316363/50149528.jpg",
    "productLid": "746685044512",
    "productUid": "746685044512",
    "secondImage": "",
    "title": "Dubai Marina 1 Hour Yacht Tour"
  },
  {
    "descrHtml": "⏰ Daily at 9 PM - 1 AM<br>❗️ Strictly 21+ Only <br>🎧 Live DJ &amp; Music <br>🍔 Live BBQ on Board <br>🍹 Beverages Included <br>👯 Meet Like-minded People <br>(394) ★★★★★ 4.8 Google Maps",
    "image": "https://optim.tildacdn.one/stor3761-6161-4430-a661-666239643834/-/resize/600x600/-/format/webp/f0f30dac258b59434ba48c8156d543f9.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/dubai-marina-yacht-party",
    "oldPrice": "",
    "partUid": "867500366622",
    "price": "99",
    "productImg": "https://static.tildacdn.one/stor3761-6161-4430-a661-666239643834/f0f30dac258b59434ba48c8156d543f9.webp",
    "productLid": "228858059062",
    "productUid": "228858059062",
    "secondImage": "",
    "title": "Yacht Party in Dubai"
  },
  {
    "descrHtml": "⏰ 30 min – 2 hours<br>🚫 No Pick Up and Drop Off<br>🌊 30 min – Burj Al Arab<br>🌊 1 hour – <span style=\"font-weight: 100;\">+</span> Atlantis The Royal<br>🌊 2 hours – <span style=\"font-weight: 100;\">+ </span>Dubai Marina<br>💳 Payment per Jet Ski (not per person)<br>🔴 Capacity: 2 persons<br>(624) ★★★★★ 4.9 Google maps",
    "image": "https://optim.tildacdn.one/stor6463-6332-4134-a132-666562633263/-/resize/600x600/-/format/webp/59474647.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/284401473532-jet-ski-dubai-burj-al-arab-atlantis-the",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "109",
    "productImg": "https://static.tildacdn.one/stor6463-6332-4134-a132-666562633263/59474647.jpg",
    "productLid": "284401473532",
    "productUid": "284401473532",
    "secondImage": "https://optim.tildacdn.one/stor3436-3661-4237-a635-613066396166/-/resize/600x600/-/format/webp/37027681.png.webp",
    "title": "Jet Ski Dubai: Burj Al Arab, Atlantis The Royal & Dubai Marina"
  },
  {
    "descrHtml": "⏰ 30 minutes or 1 hour<br>🚫 No Pick Up and Drop Off<br>📍 Wakeboarding in Dubai Marina<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Equipment, Instructor<br><span style=\"font-weight: 100;\">(</span>531<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor6437-6562-4234-b439-373134313130/-/resize/600x600/-/format/webp/20025559.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/859316684422-wakeboard-dubai-marina",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "109",
    "productImg": "https://static.tildacdn.one/stor6437-6562-4234-b439-373134313130/20025559.jpg",
    "productLid": "859316684422",
    "productUid": "859316684422",
    "secondImage": "https://optim.tildacdn.one/stor3631-6437-4964-b433-303936623337/-/resize/600x600/-/format/webp/64556256.png.webp",
    "title": "Wakeboard Dubai Marina"
  },
  {
    "descrHtml": "⏰ 20 minutes<br>🚫No Pick Up and Drop Off<br>📍Flyboarding in Dubai Marina<br>✅Includes<span style=\"font-weight: 100;\">:</span> Equipment, Instructor<br><span style=\"font-weight: 100;\">(</span>612<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor6164-3235-4664-a130-333362626134/-/resize/600x600/-/format/webp/26795709.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/217429585992-flyboarding-dubai-marina",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "130",
    "productImg": "https://static.tildacdn.one/stor6164-3235-4664-a130-333362626134/26795709.jpg",
    "productLid": "217429585992",
    "productUid": "217429585992",
    "secondImage": "https://optim.tildacdn.one/stor3331-3630-4063-a536-633238333835/-/resize/600x600/-/format/webp/23049838.png.webp",
    "title": "Flyboarding Dubai Marina"
  },
  {
    "descrHtml": "⏰ 30 minutes and 1 hour<br>🚫 No Pick Up and Drop Off<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai Marina<br>🤿 Seabob Underwater Adventure<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Seabob &amp; Safety Briefing<br><span style=\"font-weight: 100;\">(</span>458<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor3165-3734-4663-a632-643334366265/-/resize/600x600/-/format/webp/29003260.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/315686576362-seabob-dubai-underwater-exploration",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "169",
    "productImg": "https://static.tildacdn.one/stor3165-3734-4663-a632-643334366265/29003260.jpg",
    "productLid": "315686576362",
    "productUid": "315686576362",
    "secondImage": "https://optim.tildacdn.one/stor3835-3834-4537-b534-313263626365/-/resize/600x600/-/format/webp/93754991.png.webp",
    "title": "Seabob Dubai – Underwater Exploration"
  },
  {
    "descrHtml": "⏰ 4 hours<br>🚫 No Pick Up and Drop Off<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai Marina<br>🎣 Up to 6 persons<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Fishing Gear &amp; Guide<br><span style=\"font-weight: 100;\">(</span>168<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor3437-3165-4563-b566-656230376538/-/resize/600x600/-/format/webp/99374444.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/699562533472-deep-sea-fishing-dubai-private-group-exp",
    "oldPrice": "490",
    "partUid": "124785418842",
    "price": "440",
    "productImg": "https://static.tildacdn.one/stor3437-3165-4563-b566-656230376538/99374444.jpg",
    "productLid": "699562533472",
    "productUid": "699562533472",
    "secondImage": "https://optim.tildacdn.one/stor6138-3065-4230-a534-653231643134/-/resize/600x600/-/format/webp/17917690.png.webp",
    "title": "Deep Sea Fishing Dubai – Private Group Experience"
  },
  {
    "descrHtml": "⏰ 30 minutes – 1.5 hours<br>🚫 No Pick Up and Drop Off<br>📍 Location<span style=\"font-weight: 100;\">: </span>Dubai Marina / Dubai coastline<br>🚤. Price for a boat<br>🔴 Capacity<span style=\"font-weight: 100;\">: </span>2 persons<br>✅ I ncludes<span style=\"font-weight: 100;\">: </span>Music system, Safety vest, Water<br><span style=\"font-weight: 100;\">(</span>230<span style=\"font-weight: 100;\">) </span>★★★★★ 5.0 TripAdvisor",
    "image": "https://static.tildacdn.one/stor6530-3733-4365-a139-613531636238/-/resizeb/x20/70325185.jpg",
    "link": "https://sbexcursion.com/tproduct/132074316522-self-drive-boat-dubai-marina",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "109",
    "productImg": "https://static.tildacdn.one/stor6530-3733-4365-a139-613531636238/70325185.jpg",
    "productLid": "132074316522",
    "productUid": "132074316522",
    "secondImage": "https://static.tildacdn.one/stor3233-3762-4533-b733-393038343137/-/resizeb/x20/55824115.png",
    "title": "Self-Drive Boat Dubai Marina"
  },
  {
    "descrHtml": "⏰ 8<span style=\"font-weight: 100;\">–</span>9 hours<br>🚐 Pick Up and Drop Off included<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai<br>🏛️ Drive <span style=\"font-weight: 100;\">&amp;</span> Photo Stop at Museum of the Future<br>🛍️ Visit Oasis Mall for Lunch <span style=\"font-weight: 100;\">(</span>own expense<span style=\"font-weight: 100;\">)</span><br>⛴️ Abra Ride across Dubai Creek<br>🌶️ Visit to Spice Souq <span style=\"font-weight: 100;\">&amp;</span> Gold Souq<br>🕌 Visit to Farooq Bin Omar Khatib Mosque<br>📸 Photo Stop at Burj Al Arab<br>🚝 Monorail Ride to The Palm<br>🏰 Photo Stop at Jumeirah Zabeel Saray<br>🐠 Visit Dubai Mall <span style=\"font-weight: 100;\">&amp;</span> Walk through Aquarium <span style=\"font-weight: 100;\">&amp;</span> Underwater World Zoo<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Guide <span style=\"font-weight: 100;\">&amp;</span> Transportation<br>❌ Tickets not included<br><span style=\"font-weight: 100;\">(</span>718<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://static.tildacdn.one/stor6532-3332-4238-a333-623537396337/-/resizeb/x20/90496164.jpg",
    "link": "https://sbexcursion.com/tproduct/118516253002-full-day-explore-dubai-city-tour",
    "oldPrice": "",
    "partUid": "288710657722",
    "price": "65",
    "productImg": "https://static.tildacdn.one/stor6532-3332-4238-a333-623537396337/90496164.jpg",
    "productLid": "118516253002",
    "productUid": "118516253002",
    "secondImage": "https://static.tildacdn.one/stor6463-6163-4433-a534-323333646464/-/resizeb/x20/60334574.png",
    "title": "Full Day Explore Dubai City Tour"
  },
  {
    "descrHtml": "⏰ 5<span style=\"font-weight: 100;\">–</span>6 hours<br>🚐 Pick Up and Drop Off included<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai<br>🏰 Zabeel Palace <span style=\"font-weight: 100;\">–</span> Information <span style=\"font-weight: 100;\">&amp;</span> Photo Stop<br>📸 Dubai Frame <span style=\"font-weight: 100;\">–</span> Information <span style=\"font-weight: 100;\">&amp;</span> Photo Stop<br>🏘️ Visit to Bastakiya <span style=\"font-weight: 100;\">&amp;</span> Traditional Old House<br>⛴️ Abra Ride across Dubai Creek<br>🌶️ Visit to Spice Souq <span style=\"font-weight: 100;\">&amp;</span> Gold Souq<br>🕌 Jumeirah Mosque <span style=\"font-weight: 100;\">/</span> Etihad Museum <span style=\"font-weight: 100;\">–</span> Drive Through<br>🎨 Visit to Islamic Art Center<br>📸 Burj Al Arab <span style=\"font-weight: 100;\">–</span> Information &amp; Photo Stop<br>🌴 Drive through Atlantis The Palm<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Guide <span style=\"font-weight: 100;\">&amp;</span> Transportation<br>❌Tickets not included<br><span style=\"font-weight: 100;\">(</span>894<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 Google maps",
    "image": "https://static.tildacdn.one/stor3037-3635-4163-b761-376239626465/-/resizeb/x20/95580801.jpg",
    "link": "https://sbexcursion.com/tproduct/874388522792-classical-dubai-city-tour",
    "oldPrice": "",
    "partUid": "288710657722",
    "price": "40",
    "productImg": "https://static.tildacdn.one/stor3037-3635-4163-b761-376239626465/95580801.jpg",
    "productLid": "874388522792",
    "productUid": "874388522792",
    "secondImage": "https://static.tildacdn.one/stor3639-3633-4438-b036-653433336466/-/resizeb/x20/10910795.png",
    "title": "Classical Dubai City Tour"
  },
  {
    "descrHtml": "⏰ 8<span style=\"font-weight: 100;\">–</span>9 hours<br>🚐 Pick Up and Drop Off included<br>📍 Location: Abu Dhabi <span style=\"font-weight: 100;\">(</span>from Dubai<span style=\"font-weight: 100;\">)</span><br>🏛️ Guided tour of Sheikh Zayed Grand Mosque<br>🏰 Guided tour of Emirates Palace<br>🌴 Guided tour of Abu Dhabi Corniche<br>🎢 Drive past Yas Island <span style=\"font-weight: 100;\">&amp;</span> Ferrari World<br>🕌 Visit to BAPS Mandir <span style=\"font-weight: 100;\">(</span>Closed on Mondays<span style=\"font-weight: 100;\">)</span><br>✅ Includes<span style=\"font-weight: 100;\">:</span> Guide <span style=\"font-weight: 100;\">&amp;</span> Transportation<br><span style=\"font-weight: 100;\">(</span>514<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 Google Maps",
    "image": "https://static.tildacdn.one/stor3337-3565-4161-b263-383564313638/-/resizeb/x20/87923466.jpg",
    "link": "https://sbexcursion.com/dubai/en/tours/abu-dhabi-city-tour-from-dubai",
    "oldPrice": "55",
    "partUid": "288710657722",
    "price": "45",
    "productImg": "https://static.tildacdn.one/stor3337-3565-4161-b263-383564313638/87923466.jpg",
    "productLid": "930754148902",
    "productUid": "930754148902",
    "secondImage": "https://static.tildacdn.one/stor3534-3932-4239-a439-386434616264/-/resizeb/x20/12546902.png",
    "title": "Abu Dhabi From Dubai"
  },
  {
    "descrHtml": "⏰ 5 hours <span style=\"font-weight: 100;\">(</span>40–70 min flight<span style=\"font-weight: 100;\">)</span><br>🚐 Hotel Pick Up and Drop Off included<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai Desert<br>☕ Welcome beverage <span style=\"font-weight: 100;\">(</span>tea, coffee, or water<span style=\"font-weight: 100;\">)</span><br>🎈 Sunrise Hot Air Balloon Ride <span style=\"font-weight: 100;\">(</span>40–70 minutes<span style=\"font-weight: 100;\">)</span><br>📶 Wi-Fi on board<br>🍳 Breakfast at a Bedouin camp after landing<br>🐪 Short Camel Ride<br>🦅 Falconry Photos<br>📜 Electronic Flight Certificate<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Guide, Transportation, Balloon Flight, Breakfast<br><span style=\"font-weight: 100;\">(</span>498<span style=\"font-weight: 100;\">) </span>★★★★★ 4.9 TripAdvisor<br><br>",
    "image": "https://optim.tildacdn.one/stor6164-3162-4233-b939-356665633531/-/resize/600x600/-/format/webp/78630866.jpg.webp",
    "link": "https://sbexcursion.com/dubai/en/tours/hot-air-balloon-sunrise-flight",
    "oldPrice": "325",
    "partUid": "609281514832",
    "price": "275",
    "productImg": "https://static.tildacdn.one/stor6164-3162-4233-b939-356665633531/78630866.jpg",
    "productLid": "186664917462",
    "productUid": "186664917462",
    "secondImage": "",
    "title": "Sunrise Hot Air Balloon Tour"
  },
  {
    "descrHtml": "",
    "image": "https://optim.tildacdn.one/stor6430-6462-4238-b134-633466656237/-/resize/600x600/-/format/webp/11142962.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/746343611562-helicopter-trip-dubai",
    "oldPrice": "",
    "partUid": "609281514832",
    "price": "219",
    "productImg": "https://static.tildacdn.one/stor6430-6462-4238-b134-633466656237/11142962.jpg",
    "productLid": "746343611562",
    "productUid": "746343611562",
    "secondImage": "https://optim.tildacdn.one/stor6632-6436-4564-b933-616630373035/-/resize/600x600/-/format/webp/98914830.png.webp",
    "title": "Helicopter trip Dubai"
  },
  {
    "descrHtml": "⏰ 9<span style=\"font-weight: 100;\">–</span>10 hours<br>🚐 Pick Up and Drop Off included<br>📍 Location<span style=\"font-weight: 100;\">:</span> Abu Dhabi <span style=\"font-weight: 100;\">(</span>from Dubai<span style=\"font-weight: 100;\">)</span><br>🕌 Visit to Sheikh Zayed Grand Mosque<br>🌊 Monday<span style=\"font-weight: 100;\">:</span> Drive through Abu Dhabi Corniche<br>🏰 Monday<span style=\"font-weight: 100;\">:</span> Drive through Emirates Palace Hotel<br>🎨 Monday<span style=\"font-weight: 100;\">:</span> Visit to Islamic Art House<br>🕌 Tuesday–Sunday: Visit to BAPS Mandir <span style=\"font-weight: 100;\">(</span>Closed on Mondays, requires physical government-issued ID<span style=\"font-weight: 100;\">)</span><br>🎢 Ticket to Ferrari World Abu Dhabi – Visit inside<br>✅ Includes<span style=\"font-weight: 100;\">: </span>Guide, Transportation, Entrance Ticket<br><span style=\"font-weight: 100;\">(</span>231<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor3637-3135-4234-b539-376535363036/-/resize/600x600/-/format/webp/35675391.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/530112736802-abu-dhabi-ferrari-world-ticket",
    "oldPrice": "",
    "partUid": "288710657722",
    "price": "149",
    "productImg": "https://static.tildacdn.one/stor3637-3135-4234-b539-376535363036/35675391.jpg",
    "productLid": "530112736802",
    "productUid": "530112736802",
    "secondImage": "https://optim.tildacdn.one/stor6632-6565-4531-b432-646366346339/-/resize/600x600/-/format/webp/31464688.png.webp",
    "title": "Abu Dhabi + Ferrari world ticket"
  },
  {
    "descrHtml": "⏰ 15 minutes<br>🚫 No Pick Up and Drop Off<br>📍 Location<span style=\"font-weight: 100;\">:</span> Dubai Marina<br>🪂 Parasailing Adventure over the Marina<br>✅ Includes<span style=\"font-weight: 100;\">:</span> Equipment <span style=\"font-weight: 100;\">&amp;</span> Instructor<br><span style=\"font-weight: 100;\">(</span>421<span style=\"font-weight: 100;\">)</span> ★★★★★ 4.9 TripAdvisor",
    "image": "https://optim.tildacdn.one/stor3536-6439-4262-b037-623232333039/-/resize/600x600/-/format/webp/12271923.jpg.webp",
    "link": "https://sbexcursion.com/tproduct/830067567692-parasailing-dubai-marina",
    "oldPrice": "",
    "partUid": "124785418842",
    "price": "119",
    "productImg": "https://static.tildacdn.one/stor3536-6439-4262-b037-623232333039/12271923.jpg",
    "productLid": "830067567692",
    "productUid": "830067567692",
    "secondImage": "https://optim.tildacdn.one/stor6332-6532-4034-b631-306531326265/-/resize/600x600/-/format/webp/16409193.png.webp",
    "title": "Parasailing Dubai Marina"
  },
  {
    "descrHtml": "<ul><li data-list=\"bullet\">⏰ 90 minutes </li><li data-list=\"bullet\">🚤 High-speed (30-35 knots) </li><li data-list=\"bullet\">🏎️ Adrenaline Rush Experience </li><li data-list=\"bullet\">📸 Best Views of Dubai Icons </li><li data-list=\"bullet\">🗓️ Every Hour (9 AM - 5 PM) </li><li data-list=\"bullet\">📍 Best Sightseeing Route </li><li data-list=\"bullet\">(1247) ★★★★★ 4.9 Google Maps</li></ul>",
    "image": "https://static.tildacdn.one/stor3561-3835-4633-b163-306230323839/-/resizeb/x20/b51b67f9c294c9ae434b07ac1f84524c.webp",
    "link": "https://sbexcursion.com/tproduct/535163287472-sightseeing-tour-dubai",
    "oldPrice": "",
    "partUid": "867500366622",
    "price": "43",
    "productImg": "https://static.tildacdn.one/stor3561-3835-4633-b163-306230323839/b51b67f9c294c9ae434b07ac1f84524c.webp",
    "productLid": "535163287472",
    "productUid": "535163287472",
    "secondImage": "",
    "title": "Sightseeing Tour Dubai"
  }
]`);

const HEART_ICON = `
<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M20 6.32647C20 11.4974 10.5 17 10.5 17C10.5 17 1 11.4974 1 6.32647C1 -0.694364 10.5 -0.599555 10.5 5.57947C10.5 -0.599555 20 -0.507124 20 6.32647Z"
    stroke="black"
    stroke-linejoin="round"
  ></path>
</svg>`;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function normalizeImage(card, key) {
  const value = card[key] || "";
  if (!value) {
    return "";
  }

  if (value.includes("/-/resizeb/x20/") && key === "image" && card.productImg) {
    return card.productImg;
  }

  return value;
}

function renderFilters() {
  return CATEGORY_DEFS.map((category, index) => {
    const activeClasses = index === 0 ? " t-store__parts-switch-btn-all t-active" : "";
    const inner = category.id === "all"
      ? "Все"
      : `<span class="t-store__parts-item-title">${category.label}</span>`;

    return `
      <div class="t-store__parts-item ${index === 0 ? "t-store__parts-item_level-0" : "t-store__parts-item_level-1"}" data-storepart-level="${index === 0 ? "0" : "1"}">
        <div
          class="js-store-parts-switcher t-store__parts-switch-btn t-name t-name_xs t-menu__link-item${activeClasses}"
          data-sb-filter="${escapeAttribute(category.id)}"
          role="button"
          tabindex="0"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          ${inner}
        </div>
      </div>`;
  }).join("");
}

function renderOldPrice(card) {
  const hiddenStyle = card.oldPrice ? "" : ' style="display: none;"';

  return `
    <div class="t-store__card__price_old t-store__card__price-item t-name t-name_md"${hiddenStyle}>
      <div class="t-store__card__price-currency" translate="no">$</div>
      <div
        class="js-store-prod-price-old-val t-store__card__price-value"
        translate="no"
        field="st_priceold__${escapeAttribute(card.productUid)}"
      >${escapeHtml(card.oldPrice)}</div>
    </div>`;
}

function renderCard(card, index) {
  const categories = (card.partUid || "")
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);
  const mainImage = normalizeImage(card, "image");
  const secondImage = normalizeImage(card, "secondImage");
  const targetAttrs = TARGET_BLANK_LINKS.has(card.link) ? ' target="_blank" rel="noopener"' : "";
  const hiddenClass = index >= INITIAL_VISIBLE_COUNT ? " sb-static-catalog__hidden" : "";
  const hoverClass = secondImage ? " t-store__card__bgimg_hover" : "";
  const secondImageMarkup = secondImage
    ? `<div class="t-store__card__bgimg t-store__card__bgimg_second t-bgimg loaded" data-original="${escapeAttribute(secondImage)}" style="background-image: url(&quot;${escapeAttribute(secondImage)}&quot;);"></div>`
    : "";

  return `
    <div
      class="js-product t-store__card t-store__card_under-description t-store__card_verticalAlign_top t-align_left t-item${hiddenClass}"
      data-animate-style="fadeinleft"
      data-animate-chain="yes"
      data-product-inv=""
      data-product-lid="${escapeAttribute(card.productLid)}"
      data-product-uid="${escapeAttribute(card.productUid)}"
      data-product-gen-uid="${escapeAttribute(card.productUid)}"
      data-product-pack-label="lwh"
      data-product-pack-m="0"
      data-product-pack-x="0"
      data-product-pack-y="0"
      data-product-pack-z="0"
      data-product-url="${escapeAttribute(card.link)}"
      data-product-part-uid="${escapeAttribute(card.partUid)}"
      data-card-size="small"
      data-product-img="${escapeAttribute(card.productImg)}"
      data-sb-card
      data-sb-categories="${escapeAttribute(categories.join(","))}"
    >
      <div class="t-store__card__imgwrapper_column" style="width: 230px;">
        <a href="${escapeAttribute(card.link)}"${targetAttrs}>
          <div class="t-store__card__imgwrapper t-store__card__imgwrapper_1-1 t1002__picture-wrapper">
            <div
              class="js-product-img t-store__card__bgimg${hoverClass} t-bgimg loaded"
              data-original="${escapeAttribute(card.productImg)}"
              style="background-image: url(&quot;${escapeAttribute(mainImage)}&quot;);"
            ></div>
            ${secondImageMarkup}
            <span class="t1002__addBtn" aria-hidden="true">${HEART_ICON}</span>
          </div>
        </a>
      </div>
      <div class="t-store__card__contentwrapper">
        <div class="t-store__card__textwrapper">
          <a href="${escapeAttribute(card.link)}"${targetAttrs}>
            <div class="t-store__card__title t-typography__title t-name t-name_md js-store-prod-name js-product-name">${escapeHtml(card.title)}</div>
          </a>
          <div class="t-store__card__descr t-typography__descr t-descr t-descr_xxs js-store-prod-descr">${card.descrHtml}</div>
          <div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" style="display:none;"></div>
        </div>
        <div class="t-store__card__price-buttons">
          <div class="js-store-price-wrapper t-store__card__price-wrapper">
            <div class="t-store__card__price t-store__card__price-item t-name t-name_md">
              <div class="t-store__card__price-currency" translate="no">$</div>
              <div
                class="js-product-price js-store-prod-price-val t-store__card__price-value"
                translate="no"
                field="st_price__${escapeAttribute(card.productUid)}"
              >${escapeHtml(card.price)}</div>
            </div>
            ${renderOldPrice(card)}
          </div>
          <div class="t-store__card__btns-wrapper js-store-buttons-wrapper">
            <div class="t-store__card__btn-row t-store__card__btn-first_wrapper">
              <a class="t-btn t-btnflex t-btnflex_type_button t-btnflex_sm js-store-prod-btn t-store__card__btn" href="${escapeAttribute(card.link)}"${targetAttrs}>
                <span class="t-btnflex__text t-store__card__btn-text">Details</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

export function buildDubaiCatalogMarkup() {
  return `
<div id="rec1366959501" class="r t-rec t-rec_pt_45 t-rec_pb_45" style="padding-top:45px;padding-bottom:45px;" data-animationappear="off" data-record-type="1025">
  <div class="t1025">
    <div class="t-store js-store" data-sb-dubai-catalog>
      <div class="js-store-parts-select-container t-store__grid-cont t-container">
        <div class="t-store__parts-switch-wrapper t-align_center t-store__parts-switch-wrapper_tree">
          ${renderFilters()}
        </div>
      </div>
      <div class="js-store-parts-select-container t-store__grid-cont t-store__grid-cont-preloader_hidden t-container">
        <div class="js-store-grid-cont-preloader t-store__grid-cont t-col t-col_12" style="display: none;">
          <div class="t-store__card-preloader" style="margin-bottom:30px;">
            <div class="t-store__card__img-preloader" style="padding-bottom: 25%;"></div>
          </div>
          <div class="t-store__card-preloader" style="margin-bottom:30px;">
            <div class="t-store__card__img-preloader" style="padding-bottom: 25%;"></div>
          </div>
          <div class="t-store__card-preloader" style="margin-bottom:30px;">
            <div class="t-store__card__img-preloader" style="padding-bottom: 25%;"></div>
          </div>
        </div>
      </div>
      <div class="t-container">
        <div class="t-store__grid-cont t-col t-col_12">
          <div class="js-store-grid-cont t-store__grid-cont t-store__grid-cont_itemwrapper" style="overflow-x: hidden;">
            <div class="t-store__card-list">
              ${CARDS.map((card, index) => renderCard(card, index)).join("")}
            </div>
          </div>
        </div>
        <div class="t-store__load-more-btn-wrap t-align_center" data-sb-load-more-wrap>
          <button class="t-btn t-btnflex t-btnflex_type_button t-btnflex_sm js-store-load-more-btn t-store__load-more-btn" type="button" data-sb-load-more>
            <span class="t-btnflex__text js-store-load-more-btn-text">Load more</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <style>
    #rec1366959501 .t1025 .t-store__card{border-color:#d08f4c;}
    #rec1366959501 .t-store__card .t-typography__title{font-size:24px;font-family:'TildaSans';font-weight:600;}
    @media screen and (max-width:480px),(orientation:landscape) and (max-height:480px){
      #rec1366959501 .t-store__card .t-typography__title{font-size:17px;}
    }
    #rec1366959501 .t-store__relevants__title{font-size:24px;font-family:'TildaSans';font-weight:600;}
    @media screen and (max-width:480px),(orientation:landscape) and (max-height:480px){
      #rec1366959501 .t-store__relevants__title{font-size:17px;}
    }
    #rec1366959501 .t-store__card .t-typography__descr{font-size:15px;font-family:'TildaSans';font-weight:500;}
    #rec1366959501 .t-store__card .t-store__card__price{font-size:28px;color:#000000;font-weight:600;font-family:'TildaSans';}
    #rec1366959501 .t-store__card .t-store__card__price_old{font-size:28px;font-weight:400;font-family:'TildaSans';}
    #rec1366959501 .t-store__pagination__item{font-size:15px;font-family:'TildaSans';font-weight:500;}
    #rec1366959501 .t-store__parts-switch-btn{font-size:var(--uc-typo-fontsize-nO0C3d,18px);font-family:var(--uc-typo-fontfamily-nO0C3d,TildaSans);font-weight:var(--uc-typo-fontweight-nO0C3d,600);letter-spacing:var(--uc-typo-letterspacing-nO0C3d,-1px);cursor:pointer;}
    #rec1366959501 .t-store__parts-item-arrow{font-size:var(--uc-typo-fontsize-nO0C3d,18px);font-family:var(--uc-typo-fontfamily-nO0C3d,TildaSans);font-weight:var(--uc-typo-fontweight-nO0C3d,600);letter-spacing:var(--uc-typo-letterspacing-nO0C3d,-1px);}
    #rec1366959501 .t-store__parts-tree-expander-icon{font-size:var(--uc-typo-fontsize-nO0C3d,18px);font-family:var(--uc-typo-fontfamily-nO0C3d,TildaSans);font-weight:var(--uc-typo-fontweight-nO0C3d,600);letter-spacing:var(--uc-typo-letterspacing-nO0C3d,-1px);}
    #rec1366959501 .t-store__filter__item-title{font-family:var(--uc-typo-fontfamily-nO0C3d,TildaSans);font-weight:var(--uc-typo-fontweight-nO0C3d,600);letter-spacing:var(--uc-typo-letterspacing-nO0C3d,-1px);}
    #rec1366959501 .t-store__filter__opts-mob-btn{font-family:var(--uc-typo-fontfamily-nO0C3d,TildaSans);font-weight:var(--uc-typo-fontweight-nO0C3d,600);letter-spacing:var(--uc-typo-letterspacing-nO0C3d,-1px);}
    #rec1366959501 .t-menu__link-item{}
    @supports (overflow:-webkit-marquee) and (justify-content:inherit){
      #rec1366959501 .t-menu__link-item,
      #rec1366959501 .t-menu__link-item.t-active{opacity:1 !important;}
    }
    #rec1366959501 .t-btnflex.t-btnflex_type_button{
      color:#000000;
      border-style:solid !important;
      border-color:#000000 !important;
      --border-width:2px;
      border-radius:3000px;
      box-shadow:none !important;
      font-family:TildaSans;
      font-weight:500;
      white-space:normal;
      transition-duration:0.2s;
      transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;
      transition-timing-function:ease-in-out;
    }
    #rec1366959501 .t1002__addBtn{
      pointer-events:none;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    #rec1366959501 .sb-static-catalog__hidden{
      display:none !important;
    }
  </style>
  <script data-sb-dubai-catalog-script>
    (() => {
      const pageSize = ${INITIAL_VISIBLE_COUNT};

      const splitCategories = (value) => (value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const init = () => {
        const catalog = document.querySelector("#rec1366959501 [data-sb-dubai-catalog]");
        if (!catalog || catalog.dataset.sbCatalogBound === "true") {
          return;
        }

        catalog.dataset.sbCatalogBound = "true";

        const cards = Array.from(catalog.querySelectorAll("[data-sb-card]"));
        const filterButtons = Array.from(catalog.querySelectorAll("[data-sb-filter]"));
        const loadMoreWrap = catalog.querySelector("[data-sb-load-more-wrap]");
        const loadMoreButton = catalog.querySelector("[data-sb-load-more]");

        let activeFilter = "all";
        let visibleCount = pageSize;

        const render = () => {
          let matchedCount = 0;
          let shownCount = 0;

          cards.forEach((card) => {
            const matches = activeFilter === "all" || splitCategories(card.dataset.sbCategories).includes(activeFilter);
            if (matches) {
              matchedCount += 1;
            }

            const shouldShow = matches && shownCount < visibleCount;
            card.classList.toggle("sb-static-catalog__hidden", !shouldShow);

            if (shouldShow) {
              shownCount += 1;
            }
          });

          filterButtons.forEach((button) => {
            const isActive = button.dataset.sbFilter === activeFilter;
            button.classList.toggle("t-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
          });

          if (loadMoreWrap) {
            loadMoreWrap.style.display = matchedCount > visibleCount ? "" : "none";
          }
        };

        const activateFilter = (filterId) => {
          activeFilter = filterId || "all";
          visibleCount = pageSize;
          render();
        };

        filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            activateFilter(button.dataset.sbFilter);
          });

          button.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              activateFilter(button.dataset.sbFilter);
            }
          });
        });

        loadMoreButton?.addEventListener("click", () => {
          visibleCount += pageSize;
          render();
        });

        render();
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
      } else {
        init();
      }
    })();
  </script>
</div>`;
}

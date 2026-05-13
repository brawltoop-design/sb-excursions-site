import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SITE_URL = "https://sb-excursions-public.vercel.app";
const WHATSAPP_NUMBER = "6285333685020";
const HERO_IMAGE_DIR = path.join(projectRoot, "images", "bali-tours");

const sourceImage = (name) => path.join(projectRoot, "images", name);

const tours = [
  {
    slug: "ubud-highlights-tour",
    title: "Ubud Highlights Tour",
    eyebrow: "Culture and nature day trip",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "First-time Bali visitors",
    format: "Private day tour",
    area: "Ubud and central Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Ubud temple and lakeside scenery in Bali",
    lead:
      "See the most photogenic side of central Bali in one smooth day with rice terraces, temples, waterfalls, and the easy rhythm that makes Ubud so popular.",
    summary:
      "This Ubud Highlights Tour is built for travelers who want classic Bali scenery without rushing from stop to stop. It works especially well for couples, families, and guests who want a balanced mix of culture, viewpoints, and soft adventure.",
    overview:
      "Expect a flexible private route that can be adjusted around your hotel area, pace, and preferred photo stops. It is the easiest way to get the signature Ubud look and feel while keeping transport, timing, and route planning simple.",
    highlights: [
      ["Rice terrace viewpoints", "A classic Bali landscape day with green terraces, jungle backdrops, and wide open viewpoints."],
      ["Temple atmosphere", "A calm cultural route that still feels premium and visually rich instead of overly touristy."],
      ["Waterfall stop potential", "Add a refreshing nature break with an easy waterfall stop that fits your pace and energy."],
      ["Private pacing", "Spend more time at the places you like most and skip the unnecessary waiting of shared group trips."],
    ],
    itinerary: [
      ["Morning pickup and route planning", "Your day starts with hotel pickup and a route that can be shaped around your area and preferred stop order."],
      ["Terraces, temples, and scenic stops", "Move through the Ubud area with time for iconic viewpoints, soft walks, and classic photo opportunities."],
      ["Relaxed return to your hotel", "Finish the route with extra coffee, a last scenic stop, or a direct return depending on how full you want the day to feel."],
    ],
    tags: ["hotelPickup", "private", "temple", "nature", "family"],
    related: ["east-bali-instagram-tour", "tanah-lot-bedugul-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Can this Ubud tour be customized?",
      "Yes. Because this is typically booked as a private Bali day trip, the route can be adjusted around your hotel area, travel pace, and the places you most want to prioritize.",
    ],
  },
  {
    slug: "north-bali-lovina-dolphins-tour",
    title: "North Bali Tour and Lovina Dolphins",
    eyebrow: "Sunrise dolphins and waterfalls",
    duration: "10-12 hours",
    pickup: "Very early hotel pickup",
    bestFor: "Travelers chasing a big full-day route",
    format: "Private day tour",
    area: "Lovina and north Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "North Bali temple and mountain landscape",
    lead:
      "Watch dolphins at sunrise in Lovina, then keep going through cooler mountain scenery, lake temples, and some of the most dramatic nature stops in north Bali.",
    summary:
      "This is one of the fullest Bali day trips on the island, but it pays off with a completely different mood from the south. The route combines sea, mountain air, and scenic temple stops in one professionally paced private experience.",
    overview:
      "North Bali needs good timing because distances are longer and sunrise departures matter. With private transport and a clear plan, the day feels adventurous instead of exhausting.",
    highlights: [
      ["Lovina dolphin sunrise", "A classic early-morning sea moment and one of the most requested north Bali experiences."],
      ["Cooler mountain scenery", "The route moves away from the beach belt into a greener, softer, and more cinematic side of the island."],
      ["Temple and lake atmosphere", "Strong cultural scenery keeps the day varied after the early sea start."],
      ["One full private route", "No need to combine drivers, boats, and separate tickets on your own."],
    ],
    itinerary: [
      ["Early transfer to Lovina", "Leave before dawn so you can reach Lovina in time for the best sunrise and boat departure window."],
      ["Dolphins and north Bali highlights", "Start on the water, then continue to lake, temple, and waterfall scenery based on timing and energy."],
      ["Scenic drive back south", "Wrap up the route with a relaxed return while your driver handles the long transfer back to your hotel."],
    ],
    tags: ["hotelPickup", "private", "boat", "nature", "sunrise"],
    related: ["ubud-highlights-tour", "tanah-lot-bedugul-tour", "east-bali-instagram-tour"],
    faqExtra: [
      "Is the North Bali dolphin tour suitable for children?",
      "Usually yes, especially for families comfortable with an early start and a longer road day. The private format makes pacing much easier than a fixed group itinerary.",
    ],
  },
  {
    slug: "east-bali-instagram-tour",
    title: "East Bali Instagram Tour",
    eyebrow: "Gates of Heaven and royal palaces",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Photo-focused Bali itineraries",
    format: "Private day tour",
    area: "Lempuyang and east Bali",
    price: "Ask price",
    image: sourceImage("tild6662-3531-4435-b037-386262376635__leo_visions-ulj5djrj.jpg"),
    imageAlt: "East Bali Gates of Heaven style scenery",
    lead:
      "Build an iconic east Bali photo day around Lempuyang, Tirta Gangga, and elegant royal-style scenery with private transport and practical timing help.",
    summary:
      "This route is perfect when you want Bali's most recognizable visual locations without guessing the driving order yourself. It works best for couples, creators, and anyone who wants an east Bali signature day with polished logistics.",
    overview:
      "East Bali is beautiful but time-sensitive, especially around queues and road distance. A private route helps you keep the day efficient while still leaving room for content, photos, and relaxed stopovers.",
    highlights: [
      ["Gates of Heaven photos", "One of the most searched Bali viewpoints and still one of the strongest hero locations for content."],
      ["Royal water palace stops", "The route feels more elegant and architectural than a standard waterfall day."],
      ["East Bali coastline mood", "You get a completely different island feel compared with Ubud or the southern beach belt."],
      ["Private timing support", "A smoother order of stops matters here because east Bali can become slow if the route is not planned well."],
    ],
    itinerary: [
      ["Early departure to east Bali", "Start early enough to protect the best timing for your headline locations and photo windows."],
      ["Signature east Bali stops", "Visit the route's hero temples, palace-style gardens, and scenic lookouts with enough time for content and slow walks."],
      ["Beachside or scenic finish", "If timing allows, end with a softer coastal stop before heading back to your hotel."],
    ],
    tags: ["hotelPickup", "private", "temple", "instagram"],
    related: ["bali-instagram-highlights-tour", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "Do I need to leave very early for east Bali?",
      "It is highly recommended. East Bali drives are longer and some photo locations work much better when you protect the morning part of the day.",
    ],
  },
  {
    slug: "tanah-lot-bedugul-tour",
    title: "Tanah Lot and Bedugul Tour",
    eyebrow: "Temples, lakes, and cooler highlands",
    duration: "9-11 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Classic sightseeing days",
    format: "Private day tour",
    area: "West and central Bali",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Temple and lake scenery in Bedugul Bali",
    lead:
      "Pair the lake temple atmosphere of Bedugul with the iconic ocean setting of Tanah Lot for a Bali sightseeing route that feels complete, scenic, and comfortable.",
    summary:
      "This is a strong all-round Bali day for guests who want culture, wide viewpoints, cooler mountain air, and a memorable coastal finish. It is easy to enjoy and easy to sell because the scenery stays varied all day.",
    overview:
      "The route is especially good when you want something photogenic without adding high physical effort. It also works well as a soft premium day for mixed-age groups.",
    highlights: [
      ["Ulun Danu style scenery", "Lake temple views bring a calm, elevated feeling to the middle of the day."],
      ["Tanah Lot sunset potential", "The route can finish with one of Bali's most recognizable coastal temple settings."],
      ["Cool highland balance", "Bedugul breaks up the tropical heat and makes the day feel comfortable and spacious."],
      ["Flexible private order", "Your driver can shape the route around weather and traffic instead of forcing a rigid schedule."],
    ],
    itinerary: [
      ["Morning drive to Bedugul", "Head into the highlands while the weather is still soft and the road flow is smoother."],
      ["Temple, market, and viewpoint time", "Combine the main sightseeing stops with optional coffee or scenic breaks."],
      ["Tanah Lot finish", "Close the day with the coastal temple zone and return after the best light or sunset window."],
    ],
    tags: ["hotelPickup", "private", "temple", "family", "sunset"],
    related: ["ubud-highlights-tour", "east-bali-instagram-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Is this route good in mixed weather?",
      "Yes. Temple and sightseeing routes like this stay attractive even when Bali is cloudy, and they usually feel easier than a heavy beach or marine day when conditions are less stable.",
    ],
  },
  {
    slug: "mount-batur-sunrise-jeep-tour",
    title: "Mount Batur Sunrise Jeep Tour",
    eyebrow: "Volcano sunrise adventure",
    duration: "6-8 hours",
    pickup: "Night or pre-dawn pickup",
    bestFor: "Adventure lovers and sunrise seekers",
    format: "Private or small group jeep trip",
    area: "Kintamani and Mount Batur",
    price: "Ask price",
    image: sourceImage("tild6464-3137-4633-a638-383661353834__pexels-dnanoes-35399.webp"),
    imageAlt: "Jeep convoy on Mount Batur volcanic landscape",
    lead:
      "Reach Mount Batur viewpoints by 4x4 instead of a summit hike and watch sunrise over the volcano from a dramatic lava-field setting.",
    summary:
      "This is one of the most accessible sunrise adventures in Bali because you still get the volcano mood without committing to a full trekking route. It is ideal for couples, small groups, and guests who want a signature morning with strong visuals.",
    overview:
      "A jeep tour works best when you want early excitement, open-air scenery, and the classic black lava landscape, but prefer wheels over hiking boots for the main climb.",
    highlights: [
      ["Sunrise volcano viewpoint", "A big-reward early start with one of the strongest morning landscapes in Bali."],
      ["4x4 lava field ride", "The jeep element gives the tour real energy instead of feeling like a simple transfer to a viewpoint."],
      ["No summit hike required", "A strong alternative for guests who want the Mount Batur mood without a long uphill climb."],
      ["Compact adventure format", "You can still be back at your hotel early enough to keep the rest of the day open."],
    ],
    itinerary: [
      ["Pre-dawn pickup and transfer", "Leave while it is still dark so you can reach the volcano zone before the sunrise window opens."],
      ["Jeep climb and sunrise stop", "Switch into the 4x4 and move toward the lava-field viewpoints for sunrise and wide-open photo time."],
      ["Black lava exploration and return", "After sunrise, continue across the volcanic terrain before heading back to your hotel."],
    ],
    tags: ["hotelPickup", "adventure", "volcano", "sunrise", "jeep"],
    related: ["white-water-rafting", "atv-ride-adventure", "mount-batur-sunrise-hike"],
    faqExtra: [
      "Do I need hiking experience for the Mount Batur jeep tour?",
      "No. That is one of the main reasons guests choose this format. You still need to be comfortable with a very early start and bumpy volcanic terrain, but not with a long mountain hike.",
    ],
  },
  {
    slug: "atv-ride-adventure",
    title: "ATV Ride Adventure",
    eyebrow: "Mud tracks and jungle fun",
    duration: "4-6 hours",
    pickup: "Flexible daytime pickup",
    bestFor: "Active couples and groups",
    format: "Adventure activity",
    area: "Bali off-road routes",
    price: "Ask price",
    image: sourceImage("tild6464-3137-4633-a638-383661353834__pexels-dnanoes-35399.webp"),
    imageAlt: "Off-road adventure route in Bali",
    lead:
      "Trade the usual sightseeing day for muddy tracks, tunnels, jungle sections, and the kind of Bali activity that instantly changes the pace of a trip.",
    summary:
      "An ATV session is perfect when you want a short, energetic experience that feels very different from temples and beach clubs. It works well as a half-day highlight or as part of a more active Bali itinerary.",
    overview:
      "The best ATV routes mix scenery and action rather than just speed. With pickup support and timing coordination, it becomes an easy add-on for travelers who want real movement in their Bali plan.",
    highlights: [
      ["Off-road jungle sections", "Expect mud, narrow tracks, and the fun of a route that feels properly active."],
      ["Easy activity upgrade", "A great option when you want something memorable without giving up your whole day."],
      ["Beginner-friendly formats", "Many ATV experiences in Bali work for first-time riders after a short briefing."],
      ["Strong group energy", "This is one of the easiest adventure products for couples, friends, and mixed-age groups."],
    ],
    itinerary: [
      ["Pickup and safety check", "Head to the activity base, get fitted with gear, and complete the pre-ride orientation."],
      ["ATV session on the main route", "Ride through the course with mud, water, greenery, and the signature off-road sections."],
      ["Refresh and transfer back", "Finish with cleanup time and an easy return to your hotel or next stop."],
    ],
    tags: ["hotelPickup", "adventure", "activity"],
    related: ["mount-batur-sunrise-jeep-tour", "white-water-rafting", "surf-lesson-experience"],
    faqExtra: [
      "Is the ATV adventure suitable for beginners?",
      "Usually yes. Most Bali ATV operators provide a safety briefing and beginner-friendly route guidance before the ride starts.",
    ],
  },
  {
    slug: "bali-instagram-highlights-tour",
    title: "Bali Instagram Highlights Tour",
    eyebrow: "Best content-friendly Bali route",
    duration: "8-10 hours",
    pickup: "Morning hotel pickup",
    bestFor: "Couples, creators, and honeymoon trips",
    format: "Private day tour",
    area: "Flexible scenic Bali route",
    price: "Ask price",
    image: sourceImage("tild6662-3531-4435-b037-386262376635__leo_visions-ulj5djrj.jpg"),
    imageAlt: "Scenic Bali viewpoint for Instagram tour",
    lead:
      "This route is built around Bali's most photogenic moods: lush scenery, stylish viewpoints, dramatic temples, and the stops that turn into hero content fast.",
    summary:
      "Choose this tour when you want a polished Bali day that feels visual from start to finish. It is more flexible than a single-region route and works well when you want to shape the day around your own content priorities.",
    overview:
      "Instead of locking the day to one narrow zone, this experience can combine signature Bali aesthetics in a way that fits your hotel location, lighting goals, and trip style.",
    highlights: [
      ["Route shaped for visuals", "A better fit than generic sightseeing when photos and content are a major part of the day."],
      ["Private transport flow", "You keep the pace smooth and spend time where the light or mood is strongest."],
      ["Couple and honeymoon friendly", "The overall feel is more polished and romantic than a heavy adventure route."],
      ["Works across regions", "Ideal when you want the best Bali look instead of a rigid district-only itinerary."],
    ],
    itinerary: [
      ["Pickup and visual route planning", "Start with your hotel area and shape the day around the type of Bali scenery you want most."],
      ["Main photo and scenic stops", "Move through a curated mix of temple, greenery, and viewpoint locations with time for content."],
      ["Golden-hour style finish", "End the day at a soft scenic location or head back once you have the content you need."],
    ],
    tags: ["hotelPickup", "private", "instagram", "temple"],
    related: ["east-bali-instagram-tour", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "What is the difference between this and the East Bali Instagram Tour?",
      "This version is broader and more flexible. The East Bali route is more location-specific, while this tour is better when you want the strongest overall visual day based on your hotel area and priorities.",
    ],
  },
  {
    slug: "nusa-penida-private-day-tour-manta-snorkeling",
    title: "Nusa Penida Private car Day Tour+Snorkeling Manta Point",
    eyebrow: "The most complete Nusa Penida combo",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Travelers wanting sea and sightseeing in one day",
    format: "Private island combo tour",
    area: "Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "Nusa Penida cliff views above blue ocean",
    lead:
      "Combine Manta Point snorkeling with a private island car route so you can experience both the water and the best viewpoints of Nusa Penida in one tightly planned day.",
    summary:
      "This is the highest-value option for many first-time Nusa Penida visitors because it avoids choosing between island sightseeing and the signature snorkeling experience. The private land transport keeps the second half of the day efficient and much more comfortable.",
    overview:
      "Nusa Penida can feel chaotic if sea logistics, road timing, and island transport are split across different bookings. Bundling them into one route makes the day far smoother.",
    highlights: [
      ["Manta Point snorkeling", "A headline marine experience that gives the day its wow factor from the start."],
      ["Private island car", "You skip the worst part of Penida planning by having ground transport handled."],
      ["Best of land and sea", "An efficient answer to the most common first-time Penida question: snorkeling or viewpoints?"],
      ["Strong day-trip value", "Great for travelers who only have one open Bali day for the island."],
    ],
    itinerary: [
      ["Pickup, harbor transfer, and boat ride", "Start early with mainland Bali pickup and move across to Nusa Penida with the sea portion of the day protected."],
      ["Snorkeling session", "Head out for the main marine route before the island land tour begins."],
      ["Private island sightseeing", "Continue across Penida by car for the most practical viewpoint route based on timing and conditions."],
    ],
    tags: ["hotelPickup", "private", "boat", "snorkeling", "island"],
    related: ["nusa-penida-manta-rays-point", "nusa-penida-west-tour", "nusa-penida-east-tour"],
    faqExtra: [
      "Is this the best Nusa Penida tour for first-time visitors?",
      "For many guests, yes. It covers both the marine side and the island sightseeing side in one day, which makes it one of the strongest single-day Penida products.",
    ],
  },
  {
    slug: "nusa-penida-west-tour",
    title: "Nusa Penida West Tour",
    eyebrow: "Kelingking and west Penida icons",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Cliff viewpoints and first-time Penida sightseeing",
    format: "Island day tour",
    area: "West Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "West Nusa Penida cliffs and ocean views",
    lead:
      "Focus on the classic west Nusa Penida route with the island's most recognizable cliff views, scenic coastal stops, and the dramatic landscapes people usually imagine first.",
    summary:
      "If your priority is bold scenery over snorkeling, the west route is the cleanest and most iconic Penida choice. It is especially strong for couples and first-time visitors who want the headline views with transport handled professionally.",
    overview:
      "West Penida is visually spectacular but road conditions and timing matter. A pre-planned day tour removes the hardest part of making the island feel easy to enjoy.",
    highlights: [
      ["Kelingking style scenery", "The strongest west Penida visual and one of the most famous viewpoints in Bali province."],
      ["Coastal drama all day", "A route built around cliffs, blue water, and big open landscapes instead of soft inland stops."],
      ["First-time friendly", "An easy choice when you want the Penida name-value without overthinking the island plan."],
      ["Transport coordination included", "Mainland transfer, harbor flow, and island movement matter a lot here."],
    ],
    itinerary: [
      ["Bali pickup and fast boat departure", "Start early and move through harbor logistics before crossing to Nusa Penida."],
      ["West Penida cliff route", "Follow the island's best-known west-side stops with time for photos and short walks."],
      ["Boat back to Bali", "Return to the harbor after the main sightseeing loop and transfer back to your hotel."],
    ],
    tags: ["hotelPickup", "boat", "island", "instagram"],
    related: ["nusa-penida-east-tour", "nusa-penida-full-day-tour", "nusa-penida-private-day-tour-manta-snorkeling"],
    faqExtra: [
      "Is the west or east Nusa Penida route better?",
      "West Penida is usually the best fit when you want the most famous cliff viewpoints. East Penida is better when you prefer a more open, scenic, and slightly different visual style.",
    ],
  },
  {
    slug: "nusa-penida-east-tour",
    title: "Nusa Penida East Tour",
    eyebrow: "Diamond Beach and dramatic viewpoints",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Scenic viewpoints and beach photography",
    format: "Island day tour",
    area: "East Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "East Nusa Penida viewpoint and coastline",
    lead:
      "Explore the eastern side of Nusa Penida for elevated viewpoints, famous beach scenery, and a route that feels wide, cinematic, and content-ready all day long.",
    summary:
      "The east route is ideal when you want striking coastal shapes, strong photo spots, and the classic Penida cliff-and-beach atmosphere without adding snorkeling. It is a clean scenic day with big visuals and good first-time appeal.",
    overview:
      "East Penida is one of the island's strongest sightseeing products because it delivers a distinct landscape style that feels different from the west route rather than weaker than it.",
    highlights: [
      ["Diamond Beach atmosphere", "A headline stop with one of the most recognizable east Penida visual identities."],
      ["High viewpoint energy", "The route is built around lookouts that feel expansive and dramatic."],
      ["Photo-first pacing", "This is a good choice when image quality matters more than packing in too many minor stops."],
      ["Island logistics handled", "Boat flow and island driving are the real friction points, and this route solves both."],
    ],
    itinerary: [
      ["Transfer and fast boat to Penida", "Your day starts with hotel pickup and the mainland-to-island harbor flow."],
      ["East Penida scenic route", "Spend the main part of the day moving between signature east-side viewpoints and beaches."],
      ["Return crossing to Bali", "Finish with the fast boat back and a transfer to your hotel."],
    ],
    tags: ["hotelPickup", "boat", "island", "instagram"],
    related: ["nusa-penida-west-tour", "nusa-penida-full-day-tour", "bali-instagram-highlights-tour"],
    faqExtra: [
      "Is the East Penida tour very physically demanding?",
      "It depends on how many stair sections you want to attempt, but the overall day is usually moderate rather than extreme. Drivers can keep the route focused on the strongest viewpoints if you prefer a softer version.",
    ],
  },
  {
    slug: "nusa-penida-full-day-tour",
    title: "Nusa Penida Full Day Tour",
    eyebrow: "Flexible island sightseeing day",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Guests wanting a flexible Penida route",
    format: "Island day tour",
    area: "Nusa Penida",
    price: "Ask price",
    image: sourceImage("tild3033-6437-4832-a231-366334396336__connor-2a_nva3oqoe-u.webp"),
    imageAlt: "Nusa Penida panoramic coast view",
    lead:
      "Choose a full-day Nusa Penida island route when you want the freedom to prioritize the best stops for the day instead of locking into one strict east or west-only template.",
    summary:
      "This tour is the practical middle ground between the fully fixed scenic routes and the sea-plus-land combo packages. It works well for travelers who want Penida's name-value but also want room to adapt around conditions, pace, or group energy.",
    overview:
      "Full-day Penida trips work best when route decisions are made with real timing in mind. That flexibility becomes the main product advantage on an island where distance and road speed matter.",
    highlights: [
      ["Flexible route logic", "A stronger match for travelers who do not want a rigid sightseeing script."],
      ["Best use of one island day", "You keep the Penida experience broad without overcomplicating it."],
      ["Driver-led practicality", "Conditions, queues, and timing can shift, so flexibility matters."],
      ["Good all-round option", "Especially useful if your group has mixed sightseeing priorities."],
    ],
    itinerary: [
      ["Early transfer and island arrival", "Head over from Bali in the morning and align the route after arrival."],
      ["Main Penida sightseeing flow", "Visit the strongest available combination of island stops based on the day's timing and condition window."],
      ["Return to Bali", "Finish with the last harbor transfer and mainland hotel drop-off."],
    ],
    tags: ["hotelPickup", "boat", "island", "private"],
    related: ["nusa-penida-west-tour", "nusa-penida-east-tour", "nusa-penida-private-day-tour-manta-snorkeling"],
    faqExtra: [
      "Should I choose the flexible full-day Penida tour or a fixed west/east route?",
      "Choose this version when flexibility is more important than chasing one exact stop list. It is especially useful when you want the day to adapt around your pace and the on-island timing reality.",
    ],
  },
  {
    slug: "nusa-penida-manta-rays-point",
    title: "Nusa Penida Snorkeling on Manta Point",
    eyebrow: "Classic Bali marine day",
    duration: "Full day",
    pickup: "Early hotel pickup and harbor transfer",
    bestFor: "Snorkeling lovers and sea-day travelers",
    format: "Snorkeling tour",
    area: "Manta Point and Nusa Penida waters",
    price: "From $29",
    image: sourceImage("tild6433-3562-4239-b139-323864376162__460c0ba639ce4f661f5a.webp"),
    imageAlt: "Manta rays swimming in blue water near Nusa Penida",
    lead:
      "Book the signature Nusa Penida snorkeling route for Manta Point, clear blue water, and the easiest way to add a true marine wow moment to your Bali trip.",
    summary:
      "This is one of Bali's strongest sea-day products because the experience starts delivering early and stays visually powerful all day. It works for couples, small groups, and first-time snorkelers who want clear planning and strong photo value.",
    overview:
      "Sea conditions always matter, but when the route is running well this is one of the easiest tours to recommend because it feels high-impact without being overly complicated for the traveler.",
    highlights: [
      ["Manta Point focus", "The headline reason people choose this route and the core marine highlight of the day."],
      ["Blue-water snorkeling", "A cleaner sea-day product than many short local snorkel trips."],
      ["Strong first-time value", "Great when you want one major marine memory from Bali without building a custom boat plan."],
      ["Simple logistics", "Pickup, harbor flow, and route coordination remove the main friction points."],
    ],
    itinerary: [
      ["Pickup and departure from Bali", "Start with hotel pickup and move through the harbor before the sea route begins."],
      ["Manta Point and main snorkeling stops", "Spend the heart of the day on the water with the strongest snorkeling sections prioritized first."],
      ["Return crossing and hotel drop-off", "Head back across to Bali and finish with a transfer to your hotel."],
    ],
    tags: ["hotelPickup", "boat", "snorkeling", "island", "shared"],
    related: ["blue-lagoon-snorkeling", "nusa-penida-private-day-tour-manta-snorkeling", "nusa-lembongan-ceningan-day-trip"],
    faqExtra: [
      "Do I need to be an advanced swimmer for Manta Point snorkeling?",
      "Not necessarily, but you should be comfortable in open water and always follow the crew's safety guidance. Conditions can change, which is why operator support matters on this route.",
    ],
  },
  {
    slug: "nusa-lembongan-ceningan-day-trip",
    title: "Nusa Lembongan and Ceningan Day Trip",
    eyebrow: "Easy island day beyond mainland Bali",
    duration: "Full day",
    pickup: "Morning hotel pickup and harbor transfer",
    bestFor: "Relaxed island scenery with lighter pacing",
    format: "Island day trip",
    area: "Nusa Lembongan and Ceningan",
    price: "Ask price",
    image: sourceImage("tild6538-6266-4533-b762-633965646265__614518b47a177d0df9ce.webp"),
    imageAlt: "Mangrove and boats around Nusa Lembongan",
    lead:
      "Swap mainland traffic for island bridges, mangrove views, turquoise water, and the softer island feel of Nusa Lembongan and Ceningan.",
    summary:
      "This is a great alternative when you want an island day that feels scenic and fresh but less intense than a packed Nusa Penida route. It works especially well for couples, families, and travelers who want sea views without a hard adventure profile.",
    overview:
      "The Lembongan and Ceningan area is often easier to enjoy at a slower pace, which makes it a smart product for guests who want a softer but still memorable island escape.",
    highlights: [
      ["Two islands in one route", "A more varied day than staying in a single harbor zone or beach strip."],
      ["Mangroves and coastal bridges", "The visual identity feels distinct from mainland Bali and from Penida."],
      ["Relaxed island rhythm", "A better fit when you want scenery and movement without aggressive pacing."],
      ["Easy all-round appeal", "Works for couples, families, and mixed groups who want a softer island day."],
    ],
    itinerary: [
      ["Pickup and island crossing", "Start with transfer support and move across from Bali to the islands in the morning."],
      ["Lembongan and Ceningan sightseeing", "Follow a balanced route through viewpoints, beach zones, and signature local scenery."],
      ["Return to mainland Bali", "Head back by boat and finish with the hotel transfer."],
    ],
    tags: ["hotelPickup", "boat", "island", "family"],
    related: ["nusa-penida-west-tour", "fast-boat-transfer-bali", "sunset-cruise-bali"],
    faqExtra: [
      "Is this a better choice than Nusa Penida for a relaxed day?",
      "For many travelers, yes. Lembongan and Ceningan usually feel softer and easier than a heavy Penida sightseeing day, especially if comfort and rhythm matter more than cliff-view checklists.",
    ],
  },
  {
    slug: "gili-islands-getaway",
    title: "Gili Islands Getaway",
    eyebrow: "Island escape from Bali",
    duration: "Full day or multi-day base route",
    pickup: "Morning harbor transfer support",
    bestFor: "Travelers extending beyond Bali",
    format: "Fast boat island transfer route",
    area: "Gili Islands connection",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Bright turquoise boats and island water",
    lead:
      "Use Bali as your launch point for a clean Gili Islands getaway with easier fast-boat planning, transfer support, and a route that feels like a real island extension, not a scramble.",
    summary:
      "The Gili trip is perfect for travelers who want to connect Bali with a slower island stay or a big sea-focused day. Timing, departure ports, and luggage flow matter here, so setup support adds real value.",
    overview:
      "This product is less about sightseeing and more about removing transfer friction while preserving the feeling of an exciting island continuation beyond Bali.",
    highlights: [
      ["Fast-boat route support", "The main stress in Gili travel is logistics, and that is exactly what this product helps solve."],
      ["Stronger island extension", "A natural next step for travelers wanting more sea time after Bali."],
      ["Port and luggage practicality", "Simple planning decisions make a big difference here."],
      ["Flexible stay style", "Useful for both short island escapes and longer multi-day add-ons."],
    ],
    itinerary: [
      ["Departure planning and transfer", "Align your Bali hotel area with the most practical departure port and transfer timing."],
      ["Fast boat to the Gilis", "Board the selected route and move out toward the island chain."],
      ["Arrival and island continuation", "Reach the Gilis and continue into your stay, hotel arrival, or next island step."],
    ],
    tags: ["boat", "transfer", "island"],
    related: ["fast-boat-transfer-bali", "nusa-lembongan-ceningan-day-trip", "private-car-with-driver-bali"],
    faqExtra: [
      "Is the Gili Islands Getaway a sightseeing tour or a transfer product?",
      "It is primarily a transfer-based island connection product. The value comes from making the Bali-to-Gili move smoother, faster to understand, and easier to book correctly.",
    ],
  },
  {
    slug: "sumbawa-whale-shark-snorkeling-trip",
    title: "Sumbawa Whale Shark Snorkeling Trip",
    eyebrow: "Big marine expedition",
    duration: "Long marine day or expedition-style route",
    pickup: "Very early departure planning",
    bestFor: "Advanced sea-day travelers",
    format: "Marine expedition",
    area: "Sumbawa waters",
    price: "Ask price",
    image: sourceImage("tild3262-3963-4364-b336-373234663732__355c20b6d4bf24106345.webp"),
    imageAlt: "Large sea creature and snorkel-style underwater scene",
    lead:
      "For travelers who want something rarer than a standard Bali sea day, the Sumbawa Whale Shark route offers a much bigger marine story and a more expedition-like feeling.",
    summary:
      "This is not an everyday casual activity. It is for guests who want a major marine experience and understand that distance, timing, and sea conditions are a real part of the product. Done right, it becomes one of the most memorable water-based adventures in the wider region.",
    overview:
      "Because the route is more ambitious than a Bali harbor snorkeling day, professional planning and honest timing expectations are especially important here.",
    highlights: [
      ["Expedition feeling", "A more serious marine day than simple Bali snorkeling products."],
      ["Rare wildlife appeal", "The whale shark factor gives the experience its unique draw."],
      ["Strong adventure positioning", "Best for travelers who actively want something bigger and less ordinary."],
      ["High memory value", "When conditions line up, this becomes a standout trip story."],
    ],
    itinerary: [
      ["Departure and sea logistics", "Start with a carefully timed departure window and route coordination."],
      ["Marine search and snorkeling phase", "Move into the operational sea portion of the day with wildlife timing as the main priority."],
      ["Return and recovery time", "Finish with the longer travel segment back after the main marine window closes."],
    ],
    tags: ["boat", "snorkeling", "adventure"],
    related: ["nusa-penida-manta-rays-point", "blue-lagoon-snorkeling", "surf-lesson-experience"],
    faqExtra: [
      "Is the whale shark trip suitable for casual first-time snorkelers?",
      "This route is usually better for travelers who already know they enjoy long sea days and are comfortable with a more expedition-like format than a short Bali snorkeling trip.",
    ],
  },
  {
    slug: "blue-lagoon-snorkeling",
    title: "Blue Lagoon Snorkeling",
    eyebrow: "Easy Bali snorkeling day",
    duration: "Half day to full day",
    pickup: "Morning hotel pickup",
    bestFor: "Beginners, couples, and mixed groups",
    format: "Snorkeling trip",
    area: "Padang Bai and Blue Lagoon",
    price: "Ask price",
    image: sourceImage("tild6264-3738-4937-b664-376133376233__pexels-laylia-215506.webp"),
    imageAlt: "Colorful coral reef in Bali snorkeling water",
    lead:
      "Choose Blue Lagoon when you want a simpler Bali snorkeling experience with clearer logistics, softer pacing, and strong underwater color without a full remote-island mission.",
    summary:
      "This is one of the easiest snorkeling products to recommend for beginners and casual sea-day travelers. It gives you underwater visibility, reef-life value, and a cleaner half-day or lighter full-day structure than more demanding offshore routes.",
    overview:
      "Blue Lagoon is a smart fit when you want marine content but do not need the scale and harbor complexity of a Penida expedition.",
    highlights: [
      ["Beginner-friendly feel", "A softer entry point into Bali snorkeling than some of the bigger sea routes."],
      ["Good reef visuals", "Strong underwater color and clean tropical-water appeal."],
      ["Shorter and easier logistics", "A practical marine option when you do not want a full remote-island operation."],
      ["Works for mixed groups", "An easy product for couples, families, and friends with different comfort levels."],
    ],
    itinerary: [
      ["Pickup and transfer to the departure point", "Travel from your hotel to the snorkeling base with the equipment and route timing already coordinated."],
      ["Snorkeling session", "Spend the main part of the trip on the water with the crew and the core reef stops."],
      ["Refresh and return", "Wrap up the day with a transfer back once the marine part is complete."],
    ],
    tags: ["hotelPickup", "boat", "snorkeling", "family"],
    related: ["nusa-penida-manta-rays-point", "surf-lesson-experience", "white-water-rafting"],
    faqExtra: [
      "Is Blue Lagoon snorkeling better for beginners than Nusa Penida?",
      "Usually yes. It is often the more relaxed and beginner-friendly option when guests want underwater scenery without the scale and exposure of a larger island sea route.",
    ],
  },
  {
    slug: "white-water-rafting",
    title: "White Water Rafting",
    eyebrow: "River adventure in Bali",
    duration: "4-6 hours",
    pickup: "Morning or midday pickup",
    bestFor: "Families, couples, and active groups",
    format: "Adventure activity",
    area: "Bali river routes",
    price: "Ask price",
    image: sourceImage("tild3165-6564-4638-b363-636366303266__rishi-lq2tr3apzi4-un.webp"),
    imageAlt: "Water adventure and river activity vibe in Bali",
    lead:
      "Add real movement to your Bali trip with a rafting session that balances scenery, fun, and just enough adrenaline to feel like a proper activity day.",
    summary:
      "White water rafting is one of Bali's easiest adventure products to fit into a trip because it feels active without being overly technical. It is especially strong for guests who want something memorable that still works for mixed groups.",
    overview:
      "River activities are a smart contrast to temple, beach, and cafe-heavy itineraries. With transfer support and a professional activity base, the day stays straightforward.",
    highlights: [
      ["Active but accessible", "A better fit than extreme sports for many Bali travelers who still want movement and fun."],
      ["Scenic river environment", "The route adds jungle, cliffs, and river views to the activity factor."],
      ["Group-friendly energy", "Great for couples, families with older kids, and friends traveling together."],
      ["Easy half-day structure", "You can combine it with a spa, lunch, or a quieter second stop afterward."],
    ],
    itinerary: [
      ["Transfer and pre-activity briefing", "Arrive at the rafting base, get fitted with equipment, and complete the safety orientation."],
      ["Main rafting run", "Head onto the river for the activity section with guides and support throughout the route."],
      ["Shower, lunch, and return", "Finish with recovery time before heading back to your hotel or next plan."],
    ],
    tags: ["hotelPickup", "adventure", "activity", "family"],
    related: ["atv-ride-adventure", "mount-batur-sunrise-jeep-tour", "surf-lesson-experience"],
    faqExtra: [
      "Is white water rafting in Bali too intense for casual travelers?",
      "Usually no. Many Bali rafting routes are designed to be fun and active without feeling like a technical extreme-sport product.",
    ],
  },
  {
    slug: "sunset-cruise-bali",
    title: "Sunset Cruise",
    eyebrow: "Easy evening on the water",
    duration: "2-4 hours",
    pickup: "Late afternoon transfer support",
    bestFor: "Couples, groups, and celebration nights",
    format: "Boat experience",
    area: "Bali coastal waters",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Boats on bright blue water in Bali",
    lead:
      "A Bali sunset cruise is one of the cleanest ways to close the day: open water, golden-hour light, a more elevated mood, and none of the road stress that can kill an evening plan.",
    summary:
      "This experience is ideal for couples, celebration groups, and travelers who want a premium-feeling evening without needing a full-day commitment. The main value is atmosphere, timing, and easy sea-facing views at the right hour.",
    overview:
      "When Bali evenings feel too crowded on land, a cruise becomes the simpler and more polished choice. It is also an easy product to pair with proposals, birthdays, and relaxed social plans.",
    highlights: [
      ["Golden-hour water views", "A stronger sunset setting than watching from a crowded roadside or beach access point."],
      ["Easy premium mood", "An upscale feel without the complexity of a private charter build."],
      ["Celebration friendly", "Great for dates, anniversaries, birthdays, and group evenings."],
      ["Compact schedule", "You can keep the whole day open and still end it memorably."],
    ],
    itinerary: [
      ["Late afternoon departure flow", "Head to the departure point and board in time for the light to shift into sunset."],
      ["Cruise during golden hour", "Spend the core of the experience on the water with the sea, skyline, and sunset working together."],
      ["Evening return", "Dock after the best light window and return to your hotel or continue into dinner plans."],
    ],
    tags: ["boat", "sunset", "romantic"],
    related: ["nusa-lembongan-ceningan-day-trip", "bali-helicopter-scenic-tour", "private-car-with-driver-bali"],
    faqExtra: [
      "Is the sunset cruise private?",
      "That depends on the package. Some cruises are shared and social, while others can be booked in a more private or premium format depending on availability.",
    ],
  },
  {
    slug: "surf-lesson-experience",
    title: "Surf Lesson Experience",
    eyebrow: "Bali's classic beach activity",
    duration: "2-4 hours",
    pickup: "Flexible session timing",
    bestFor: "Beginners and casual active travelers",
    format: "Water activity",
    area: "Beginner-friendly Bali surf beaches",
    price: "Ask price",
    image: sourceImage("tild3165-6564-4638-b363-636366303266__rishi-lq2tr3apzi4-un.webp"),
    imageAlt: "Blue tropical water for a Bali surf lesson",
    lead:
      "Take your first proper Bali surf lesson with a route that focuses on beginner-friendly water time, simple coaching, and a fun beach-sport memory that actually fits into your trip.",
    summary:
      "A surf lesson is one of the best short-format Bali activities because it feels local, active, and iconic without taking over the whole day. It is ideal for couples, friends, solo travelers, and anyone curious about the island's surf culture.",
    overview:
      "The product works best when the beach choice, tide timing, and beginner setup are handled correctly. That is what turns a chaotic first try into a solid Bali highlight.",
    highlights: [
      ["Beginner-first coaching", "A far better first surf experience than trying to rent a board and guess on your own."],
      ["Compact active session", "Easy to fit around brunch, beach clubs, or another half-day plan."],
      ["Authentic Bali feeling", "Surf culture is part of the island's identity, and this is an easy way to connect with it."],
      ["Good for solo or group travel", "Works just as well for one traveler as it does for couples or friends."],
    ],
    itinerary: [
      ["Meet-up and beach briefing", "Start with board basics, safety, and a beginner-focused intro."],
      ["Main surf lesson", "Move into the water for coached practice, pop-up drills, and wave timing."],
      ["Cooldown and wrap-up", "Finish with beach recovery time and optional transport back or onward plans."],
    ],
    tags: ["activity", "water", "adventure"],
    related: ["blue-lagoon-snorkeling", "white-water-rafting", "sunset-cruise-bali"],
    faqExtra: [
      "Can complete beginners book the surf lesson experience?",
      "Yes. That is exactly who most entry-level Bali surf lessons are designed for, as long as conditions match a beginner-friendly session window.",
    ],
  },
  {
    slug: "bali-airport-transfer",
    title: "Airport Transfer",
    eyebrow: "Reliable Bali arrival support",
    duration: "Depends on hotel area",
    pickup: "Arrival or departure based",
    bestFor: "New arrivals and stress-free departures",
    format: "Private transfer service",
    area: "Ngurah Rai Airport and Bali hotel areas",
    price: "Ask price",
    image: sourceImage("tild6335-6361-4739-a136-656338613061__nella-n-jghquhcxehy-.jpg"),
    imageAlt: "Clean Bali transfer and travel day atmosphere",
    lead:
      "Keep your Bali arrival or departure smooth with a dedicated airport transfer that removes the usual taxi confusion, pricing stress, and last-minute hotel logistics.",
    summary:
      "Airport transfers are not glamorous, but they have an outsized impact on how the trip starts. A clean pickup, clear driver coordination, and direct route to the hotel make a huge difference after a long flight.",
    overview:
      "This service is especially useful for late arrivals, first-time Bali visitors, families with luggage, and anyone who wants transport sorted before wheels touch the runway.",
    highlights: [
      ["Simple arrival flow", "Avoid negotiating transport after landing or worrying about where to meet your driver."],
      ["Useful for first-time visitors", "A very easy way to start Bali feeling organized instead of scattered."],
      ["Luggage-friendly planning", "Better than trying to improvise when bags, strollers, or multiple passengers are involved."],
      ["Departure support too", "Just as valuable when protecting your flight timing on the way out."],
    ],
    itinerary: [
      ["Confirm flight and hotel details", "Align the transfer around your arrival or departure time and the exact hotel area."],
      ["Meet-up and direct transfer", "Connect with your driver and move directly toward the airport or hotel."],
      ["Finish with a clean handoff", "Arrive at the destination without the usual transport guesswork."],
    ],
    tags: ["transfer", "private"],
    related: ["private-car-with-driver-bali", "fast-boat-transfer-bali", "gili-islands-getaway"],
    faqExtra: [
      "Is the airport transfer private?",
      "Most travelers book this as a private Bali transfer so the timing, luggage handling, and destination flow stay as simple as possible.",
    ],
  },
  {
    slug: "private-car-with-driver-bali",
    title: "Private Car with Driver",
    eyebrow: "Flexible Bali transport by the day",
    duration: "Flexible daily use",
    pickup: "Hotel pickup on your schedule",
    bestFor: "Travelers who want total route flexibility",
    format: "Private transport service",
    area: "All major Bali regions",
    price: "Ask price",
    image: sourceImage("tild3365-3333-4637-a663-636263353664__dika-pebriyanta-qqxc.jpg"),
    imageAlt: "Private Bali touring atmosphere with scenic temples",
    lead:
      "Book a private car with driver in Bali when you want the freedom to build your own route, stop when you like, and move around the island without locking into a fixed excursion script.",
    summary:
      "This is one of the most useful products in Bali because so many plans become easier once transport is flexible. It is perfect for custom sightseeing, shopping days, family pacing, and travelers who already know roughly where they want to go.",
    overview:
      "A private driver day is not just a transfer. It is the cleanest way to buy back time, route control, and comfort in a place where traffic and distance planning really matter.",
    highlights: [
      ["Maximum route flexibility", "The best option when you do not want to be boxed into one set itinerary."],
      ["Useful across the whole island", "Works for beaches, temples, shopping, day trips, and mixed plans."],
      ["Comfort-first structure", "Ideal for families, mixed-age groups, or travelers who simply want an easier Bali day."],
      ["High-value practical product", "One of the easiest services to keep reusing across a Bali trip."],
    ],
    itinerary: [
      ["Share your plan or area focus", "Start with the places or region you want to prioritize."],
      ["Use the car for the day", "Move between your chosen stops with flexibility for lunch, delays, or spontaneous additions."],
      ["Return on your own timing", "Finish the day when your plan feels complete instead of when a fixed tour says it should end."],
    ],
    tags: ["transfer", "private", "hotelPickup"],
    related: ["airport-transfer", "ubud-highlights-tour", "tanah-lot-bedugul-tour"],
    faqExtra: [
      "Is a private driver better than booking separate Bali taxis all day?",
      "For most travelers, yes. Once you have multiple stops, a private driver is usually simpler, more comfortable, and easier to coordinate than chaining together separate rides.",
    ],
  },
  {
    slug: "fast-boat-transfer-bali",
    title: "Fast Boat Transfer",
    eyebrow: "Harbor-to-island transfer support",
    duration: "Depends on destination",
    pickup: "Based on departure harbor and boat time",
    bestFor: "Island-bound travelers",
    format: "Transfer service",
    area: "Bali harbors and island routes",
    price: "Ask price",
    image: sourceImage("tild6538-6266-4533-b762-633965646265__614518b47a177d0df9ce.webp"),
    imageAlt: "Fast boat style island transfer in Bali waters",
    lead:
      "Take the guesswork out of Bali island departures with a fast boat transfer that coordinates hotel movement, harbor timing, and the most practical route for your destination.",
    summary:
      "Fast boats are simple once booked correctly, but confusing when you are juggling ports, check-in windows, and hotel distance. This service helps turn the whole process into a clean transfer day instead of a stressful logistics puzzle.",
    overview:
      "It is especially valuable for first-time island travelers, families, and anyone moving with luggage or a tight schedule.",
    highlights: [
      ["Cleaner harbor planning", "You avoid the main timing mistakes that usually create fast-boat stress."],
      ["Works for multiple island routes", "Useful whether you are heading toward Penida, Lembongan, or onward island connections."],
      ["Easy luggage support", "A better fit than improvising when bags and departure timing matter."],
      ["Travel-day product, not a tour", "Built to make movement easy and predictable."],
    ],
    itinerary: [
      ["Align hotel area and boat route", "Confirm the best departure point for your island destination."],
      ["Transfer to the harbor", "Move from your hotel to the correct port with arrival timing protected."],
      ["Check-in and departure", "Board your selected fast boat and continue the island journey."],
    ],
    tags: ["transfer", "boat", "island"],
    related: ["gili-islands-getaway", "nusa-lembongan-ceningan-day-trip", "airport-transfer"],
    faqExtra: [
      "Does the fast boat transfer include hotel pickup?",
      "That depends on the package and departure harbor, but hotel transfer coordination is one of the most important reasons travelers choose a professionally arranged fast boat product.",
    ],
  },
  {
    slug: "bali-helicopter-scenic-tour",
    title: "Bali Helicopter Scenic Tour",
    eyebrow: "Premium island views from the air",
    duration: "Short flight experience",
    pickup: "Scheduled departure window",
    bestFor: "Premium travelers and special occasions",
    format: "Helicopter experience",
    area: "Bali aerial sightseeing",
    price: "Ask price",
    image: sourceImage("tild3536-3638-4435-a462-623534663935__pexels-thomas-balaba.jpg"),
    imageAlt: "Sunrise and mountain atmosphere for scenic aerial Bali tour",
    lead:
      "See Bali from above with a scenic helicopter flight that turns the island's coastline, cliffs, rice fields, and volcanic lines into one premium visual sweep.",
    summary:
      "This is a short-format luxury product with very high perceived value. It is ideal for proposals, anniversaries, premium travelers, and anyone who wants a true hero experience instead of another standard sightseeing day.",
    overview:
      "Helicopter tours work because they compress Bali's visual variety into a much more dramatic experience than road-based sightseeing can deliver.",
    highlights: [
      ["Aerial island perspective", "One of the strongest visual upgrades available in Bali."],
      ["Premium short-format experience", "High impact without needing a full-day schedule."],
      ["Celebration and proposal friendly", "A natural fit for once-in-a-trip moments."],
      ["Unique content value", "The photo and video angle is completely different from any land route."],
    ],
    itinerary: [
      ["Arrival and safety briefing", "Check in, receive the pre-flight briefing, and prepare for departure."],
      ["Scenic helicopter flight", "Follow the selected aerial route with panoramic views over Bali's strongest landscape lines."],
      ["Landing and post-flight wrap-up", "Complete the experience and continue into the rest of your Bali day."],
    ],
    tags: ["helicopter", "premium", "romantic"],
    related: ["volcano-coastline-helicopter-ride", "sunset-cruise-bali", "bali-instagram-highlights-tour"],
    faqExtra: [
      "Is the helicopter scenic tour private?",
      "It depends on the aircraft and package setup. Many travelers ask for private or premium flight formats when the experience is tied to a celebration or proposal.",
    ],
  },
  {
    slug: "volcano-coastline-helicopter-ride",
    title: "Volcano and Coastline Helicopter Ride",
    eyebrow: "Bali volcanoes and shorelines from above",
    duration: "Short flight experience",
    pickup: "Scheduled departure window",
    bestFor: "Premium travelers chasing the biggest views",
    format: "Helicopter experience",
    area: "Volcano and coastline aerial route",
    price: "Ask price",
    image: sourceImage("tild3435-3237-4362-a637-396663313561__ff430793-bcdb-4551-a.jpeg"),
    imageAlt: "Volcanic sunrise style view for Bali helicopter route",
    lead:
      "Take the most dramatic version of an aerial Bali experience by combining volcanic geography, ridgelines, and coastline views in one premium helicopter route.",
    summary:
      "This is the stronger storytelling version of a scenic flight when you want Bali's natural contrasts to hit hard from the air. The route is ideal for premium travelers, milestone moments, and anyone who wants the island's biggest landforms in one visual arc.",
    overview:
      "Where a standard scenic flight sells beauty, this one sells scale. The volcano-and-coastline contrast makes the whole experience feel more cinematic and more distinctly Bali.",
    highlights: [
      ["Volcano-to-sea contrast", "A route built around the strongest geological drama Bali can offer from above."],
      ["Premium memory piece", "Easy to remember, easy to sell, and visually more powerful than regular road touring."],
      ["Short but intense", "High-impact premium product without taking over the whole day."],
      ["Excellent for hero moments", "Perfect when the trip needs one experience that instantly feels special."],
    ],
    itinerary: [
      ["Check-in and flight preparation", "Arrive at the departure point and complete the pre-flight process."],
      ["Helicopter route over volcano and coast", "Follow the premium aerial path with the best contrasting Bali landforms prioritized."],
      ["Landing and continuation of your day", "Finish the flight and move into the next Bali plan with minimal time lost."],
    ],
    tags: ["helicopter", "premium", "volcano"],
    related: ["bali-helicopter-scenic-tour", "mount-batur-sunrise-jeep-tour", "sunset-cruise-bali"],
    faqExtra: [
      "How is this different from the standard Bali helicopter scenic tour?",
      "This route leans more heavily into volcanic geography and coastline contrast, so the overall feel is more dramatic and terrain-focused rather than simply panoramic.",
    ],
  },
];

const existingRoutes = {
  "mount-batur-sunrise-hike": {
    title: "Mount Batur Sunrise Hike",
    route: "/bali/en/tours/mount-batur-sunrise-hike",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function publicImagePath(tour) {
  return `/images/bali-tours/${tour.slug}${path.extname(tour.image).toLowerCase()}`;
}

function absoluteTourUrl(tour) {
  return `${SITE_URL}/bali/en/tours/${tour.slug}`;
}

function absoluteImageUrl(tour) {
  return `${SITE_URL}${publicImagePath(tour)}`;
}

function moneyOffer(tour) {
  const match = /^From \$(\d+)/i.exec(tour.price);
  if (!match) return null;
  return {
    "@type": "Offer",
    priceCurrency: "USD",
    price: match[1],
    url: absoluteTourUrl(tour),
    availability: "https://schema.org/InStock",
  };
}

function buildIncludes(tour) {
  const items = [];
  if (tour.tags.includes("hotelPickup")) items.push("Hotel pickup and return planning from major Bali areas");
  if (tour.tags.includes("private")) items.push("Private route flow and flexible pacing");
  if (tour.tags.includes("boat")) items.push("Boat or harbor logistics based on the selected package");
  if (tour.tags.includes("snorkeling")) items.push("Snorkeling equipment and marine safety setup");
  if (tour.tags.includes("adventure") || tour.tags.includes("activity")) items.push("Activity briefing and basic safety equipment");
  if (tour.tags.includes("helicopter")) items.push("Pre-flight briefing and operator coordination");
  if (tour.tags.includes("transfer")) items.push("Pickup timing coordination and direct transfer flow");
  if (tour.tags.includes("temple") || tour.tags.includes("nature") || tour.tags.includes("island")) {
    items.push("Driver coordination for the core route and main sightseeing timing");
  }
  items.push("WhatsApp support for confirmation, timing, and route questions");
  return Array.from(new Set(items)).slice(0, 6);
}

function buildGoodToKnow(tour) {
  const notes = [
    `This experience usually runs as a ${tour.format.toLowerCase()}.`,
    `Best fit: ${tour.bestFor.toLowerCase()}.`,
  ];
  if (tour.tags.includes("sunrise")) notes.push("Very early departure is part of the value of this route.");
  if (tour.tags.includes("boat") || tour.tags.includes("snorkeling")) notes.push("Sea conditions and harbor timing can affect the exact flow of the day.");
  if (tour.tags.includes("temple")) notes.push("Comfortable clothing and respectful temple-ready outfits are recommended.");
  if (tour.tags.includes("adventure") || tour.tags.includes("activity")) notes.push("Active shoes, light clothing, and a towel or change of clothes are usually a smart idea.");
  if (tour.tags.includes("helicopter")) notes.push("Flight timing is subject to weather and operator safety checks.");
  if (tour.tags.includes("transfer")) notes.push("Final transfer timing should be aligned with your hotel area, luggage, and departure details.");
  notes.push("Send your hotel area before booking so the route and timing can be matched properly.");
  return Array.from(new Set(notes)).slice(0, 6);
}

function buildFaqs(tour) {
  const faqs = [
    [
      `How long does the ${tour.title} take?`,
      `${tour.title} usually takes ${tour.duration.toLowerCase()}. The day normally begins with ${tour.pickup.toLowerCase()} and can shift slightly depending on hotel area, weather, and traffic or harbor timing.`,
    ],
    [
      `Who is the ${tour.title} best for?`,
      `This experience is best for ${tour.bestFor.toLowerCase()}. It is usually booked as a ${tour.format.toLowerCase()} and works best when the route style matches the kind of Bali day you want.`,
    ],
    [
      `What is usually included in the ${tour.title}?`,
      `Most bookings include ${buildIncludes(tour).slice(0, 4).join(", ").toLowerCase()}. Final inclusions always depend on the exact package that is confirmed for your date.`,
    ],
    [
      "How do I book this Bali experience?",
      "The fastest option is to send your date, hotel area, and group size on WhatsApp so pickup timing, package format, and route details can be confirmed correctly before payment.",
    ],
  ];
  if (tour.faqExtra) faqs[3] = tour.faqExtra;
  return faqs;
}

function tourDataMap() {
  return new Map(tours.map((tour) => [tour.slug, tour]));
}

function tourRoute(tour) {
  return `/bali/en/tours/${tour.slug}`;
}

function renderRelatedCards(tour, allTours) {
  return tour.related
    .map((slug) => allTours.get(slug) || existingRoutes[slug])
    .filter(Boolean)
    .map((related) => {
      const href = related.route || tourRoute(related);
      const label = related.area || "Bali experience";
      const image = related.slug ? publicImagePath(related) : publicImagePath(tour);
      const text =
        related.summary ||
        "Explore another Bali route with private coordination, cleaner logistics, and stronger on-page detail.";
      return `
        <a class="sb-related-card" href="${href}">
          <img src="${image}" alt="${escapeHtml(related.title)}" loading="lazy" decoding="async">
          <div class="sb-related-card-body">
            <div class="sb-related-label">${escapeHtml(label)}</div>
            <h3>${escapeHtml(related.title)}</h3>
            <p>${escapeHtml(text)}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

function renderStructuredData(tour) {
  const faq = buildFaqs(tour);
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${absoluteTourUrl(tour)}#webpage`,
      url: absoluteTourUrl(tour),
      name: tour.title,
      description: tour.metaDescription || tour.summary,
      inLanguage: "en",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteImageUrl(tour),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteTourUrl(tour)}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Bali main page",
          item: `${SITE_URL}/bali/en/main-page`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tours",
          item: `${SITE_URL}/bali/en/main-page#tours`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tour.title,
          item: absoluteTourUrl(tour),
        },
      ],
    },
    {
      "@type": "TouristTrip",
      "@id": `${absoluteTourUrl(tour)}#trip`,
      name: tour.title,
      description: tour.summary,
      image: [absoluteImageUrl(tour)],
      url: absoluteTourUrl(tour),
      touristType: tour.bestFor,
      itinerary: tour.itinerary.map(([title, description]) => ({
        "@type": "TouristAttraction",
        name: title,
        description,
      })),
      provider: {
        "@type": "TravelAgency",
        name: "SB Excursions",
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Place",
        name: tour.area,
      },
      offers: moneyOffer(tour),
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteTourUrl(tour)}#faq`,
      mainEntity: faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ];

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph,
    },
    null,
    2,
  );
}

function renderPage(tour, allTours) {
  const faq = buildFaqs(tour);
  const includes = buildIncludes(tour);
  const goodToKnow = buildGoodToKnow(tour);
  const title = tour.metaTitle || `${tour.title} in Bali | SB Excursions`;
  const description = tour.metaDescription || tour.summary;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${absoluteTourUrl(tour)}">
    <meta property="og:image" content="${absoluteImageUrl(tour)}">
    <link rel="canonical" href="${absoluteTourUrl(tour)}">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png">
    <link rel="stylesheet" href="/css/bali-tour-pages.css">
    <script type="application/ld+json">
${renderStructuredData(tour)}
    </script>
  </head>
  <body>
    <div class="sb-tour-shell">
      <header class="sb-tour-header">
        <a class="sb-brand" href="/bali/en/main-page">
          <span class="sb-brand-mark" aria-hidden="true"></span>
          <span class="sb-brand-copy">
            <span class="sb-brand-title">SB Excursions</span>
            <span class="sb-brand-subtitle">Bali Private Tours</span>
          </span>
        </a>
        <nav class="sb-header-nav" aria-label="Tour links">
          <a class="sb-pill-link" href="/bali/en/main-page#tours">All Bali tours</a>
          <a class="sb-cta" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I want to book ${tour.title}. Please send details.`)}" target="_blank" rel="noopener noreferrer nofollow">Book in WhatsApp</a>
        </nav>
      </header>

      <main class="sb-tour-main">
        <nav class="sb-breadcrumbs" aria-label="Breadcrumb">
          <span><a href="/bali/en/main-page">Bali main page</a></span>
          <span>/</span>
          <span><a href="/bali/en/main-page#tours">Tours</a></span>
          <span>/</span>
          <span>${escapeHtml(tour.title)}</span>
        </nav>

        <section class="sb-hero">
          <div class="sb-hero-copy">
            <div class="sb-kicker">${escapeHtml(tour.eyebrow)}</div>
            <h1>${escapeHtml(tour.title)}</h1>
            <p class="sb-hero-lead">${escapeHtml(tour.lead)}</p>
            <p class="sb-hero-summary">${escapeHtml(tour.summary)}</p>

            <div class="sb-stat-grid">
              <div class="sb-stat-card">
                <span class="sb-stat-label">Duration</span>
                <span class="sb-stat-value">${escapeHtml(tour.duration)}</span>
              </div>
              <div class="sb-stat-card">
                <span class="sb-stat-label">Format</span>
                <span class="sb-stat-value">${escapeHtml(tour.format)}</span>
              </div>
              <div class="sb-stat-card">
                <span class="sb-stat-label">Best For</span>
                <span class="sb-stat-value">${escapeHtml(tour.bestFor)}</span>
              </div>
              <div class="sb-stat-card">
                <span class="sb-stat-label">Area</span>
                <span class="sb-stat-value">${escapeHtml(tour.area)}</span>
              </div>
            </div>

            <div class="sb-hero-actions">
              <a class="sb-cta" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I want to book ${tour.title}. Please send details.`)}" target="_blank" rel="noopener noreferrer nofollow">Check availability</a>
              <a class="sb-outline-cta" href="/bali/en/main-page#tours">Back to Bali tours</a>
            </div>
          </div>

          <div class="sb-hero-media">
            <img src="${publicImagePath(tour)}" alt="${escapeHtml(tour.imageAlt)}" loading="eager" decoding="async" fetchpriority="high">
          </div>
        </section>

        <div class="sb-grid-layout">
          <div class="sb-column-stack">
            <section class="sb-section">
              <h2>${escapeHtml(tour.title)} in Bali: what to expect</h2>
              <p class="sb-section-intro">${escapeHtml(tour.overview)}</p>
              <div class="sb-section-actions">
                <a class="sb-outline-cta" href="/bali/en/main-page">Explore more Bali pages</a>
              </div>
            </section>

            <section class="sb-section">
              <h2>Highlights of this Bali experience</h2>
              <p class="sb-section-intro">The route is built to feel polished, easy to follow, and worth opening a dedicated page for before you book.</p>
              <div class="sb-highlight-grid">
                ${tour.highlights
                  .map(
                    ([heading, text]) => `
                  <article class="sb-highlight-card">
                    <h3>${escapeHtml(heading)}</h3>
                    <p>${escapeHtml(text)}</p>
                  </article>
                `,
                  )
                  .join("")}
              </div>
            </section>

            <section class="sb-section">
              <h2>Sample itinerary</h2>
              <p class="sb-section-intro">Actual stop order can shift slightly with weather, road conditions, sea conditions, or your hotel area, but this is the professional structure most travelers expect.</p>
              <div class="sb-step-grid">
                ${tour.itinerary
                  .map(
                    ([heading, text]) => `
                  <article class="sb-step-card">
                    <h3>${escapeHtml(heading)}</h3>
                    <p>${escapeHtml(text)}</p>
                  </article>
                `,
                  )
                  .join("")}
              </div>
            </section>

            <section class="sb-section">
              <h2>Included and good to know</h2>
              <p class="sb-section-intro">A cleaner booking experience usually comes down to the details below: what is handled for you, and what to keep in mind before the day starts.</p>
              <div class="sb-detail-grid">
                <div class="sb-info-panel">
                  <h3>What is usually included</h3>
                  <ul class="sb-detail-list">
                    ${includes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
                <div class="sb-info-panel">
                  <h3>Good to know before booking</h3>
                  <ul class="sb-detail-list">
                    ${goodToKnow.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </section>

            <section class="sb-section">
              <h2>FAQ</h2>
              <p class="sb-section-intro">These are the practical questions travelers ask most often before they lock in a Bali tour, transfer, boat route, or premium activity.</p>
              <div class="sb-faq-list">
                ${faq
                  .map(
                    ([question, answer], index) => `
                  <details class="sb-faq-item"${index === 0 ? " open" : ""}>
                    <summary>${escapeHtml(question)}</summary>
                    <p>${escapeHtml(answer)}</p>
                  </details>
                `,
                  )
                  .join("")}
              </div>
            </section>

            <section class="sb-section">
              <h2>Related Bali routes</h2>
              <p class="sb-section-intro">If this page is close but not exact, these routes are usually the next best internal options to compare inside the Bali mirror.</p>
              <div class="sb-related-grid">
                ${renderRelatedCards(tour, allTours)}
              </div>
            </section>
          </div>

          <aside class="sb-sticky-card">
            <h3>Quick booking snapshot</h3>
            <p class="sb-sticky-price">${escapeHtml(tour.price)}</p>
            <p class="sb-sticky-caption">Best booked after sharing your date, group size, and hotel area so the route, pickup window, and format can be confirmed correctly.</p>
            <ul class="sb-detail-list">
              <li>${escapeHtml(tour.pickup)}</li>
              <li>${escapeHtml(tour.duration)}</li>
              <li>${escapeHtml(tour.bestFor)}</li>
              <li>${escapeHtml(tour.area)}</li>
            </ul>
            <div class="sb-mini-stack">
              <a class="sb-cta" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I want to book ${tour.title}. Please send details.`)}" target="_blank" rel="noopener noreferrer nofollow">Request this route</a>
              <a class="sb-mini-link" href="/bali/en/main-page#tours">See all Bali tours</a>
            </div>
          </aside>
        </div>
      </main>

      <footer class="sb-tour-footer">
        <div>SB Excursions Bali mirror page for ${escapeHtml(tour.title)}</div>
        <div class="sb-tour-footer-links">
          <a href="/bali/en/main-page">Bali main page</a>
          <a href="/bali/en/main-page#tours">All tours</a>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer nofollow">WhatsApp</a>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
}

function ensureHeroImage(tour) {
  fs.mkdirSync(HERO_IMAGE_DIR, { recursive: true });
  const output = path.join(HERO_IMAGE_DIR, `${tour.slug}${path.extname(tour.image).toLowerCase()}`);
  fs.copyFileSync(tour.image, output);
}

function patchStaticCardLinks(html) {
  for (const tour of tours) {
    const re = new RegExp(
      `(<h3 class="sb-title">${escapeRegExp(tour.title)}<\\/h3>[\\s\\S]*?<a href=")(#)(" class="sb-btn">Details<\\/a>)`,
    );
    html = html.replace(re, `$1${tourRoute(tour)}$3`);
  }
  return html;
}

function patchPlannerLinks(html) {
  const plannerLinks = [
    ["nusa_penida_manta_point", "/bali/en/tours/nusa-penida-manta-rays-point"],
    ["ubud_highlights", "/bali/en/tours/ubud-highlights-tour"],
    ["batur_sunrise", "/bali/en/tours/mount-batur-sunrise-jeep-tour"],
    ["temple_culture", "/bali/en/tours/tanah-lot-bedugul-tour"],
    ["spa_relax_day", "/bali/en/tours/private-car-with-driver-bali"],
  ];

  for (const [id, link] of plannerLinks) {
    const re = new RegExp(`(id:'${escapeRegExp(id)}'[\\s\\S]*?link:')([^']*)(')`);
    html = html.replace(re, `$1${link}$3`);
  }

  return html;
}

function patchBaliMainFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  const staticReplacements = [
    [
      "<title>SB Excursions | Bali Tours & Romantic Experiences</title>",
      "<title>Bali Tours, Day Trips and Private Excursions | SB Excursions</title>",
    ],
    [
      'content="Discover the best of Bali with SB Excursions. Luxury desert safaris, romantic yacht dates, and expert-led city tours. Book your perfect Dubai adventure today!"',
      'content="Discover Bali tours, private day trips, snorkeling, island getaways, transfers, and premium experiences with SB Excursions. Explore the best Bali excursions with polished local pages and direct WhatsApp booking."',
    ],
    [
      'content="https://static.tildacdn.one/tild3433-3231-4534-b430-373835373464/_3.jpg"',
      'content="https://sb-excursions-public.vercel.app/images/bali-tours/ubud-highlights-tour.webp"',
    ],
    [
      "https://static.tildacdn.one/tild3334-6466-4436-b766-376338363935/SB_Excursions_Dubai_.png",
      "images/tild6536-3637-4563-a362-633234333130__favikon_sb_excursion.png",
    ],
    ["/dubai/en#tours", "/bali/en/main-page#tours"],
    [">Dubai, UAE<", ">Bali, Indonesia<"],
    ["/dubai/en/about", "/bali/en/main-page"],
    ["/dubai/en/faq", "/bali/en/main-page"],
    ["/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour", "/bali/en/tours/sunset-cruise-bali"],
    ["Shared Yacht tour", "Sunset Cruise"],
    ["Dubai City tour", "Ubud Highlights Tour"],
    ["/mount-batur-sunrise-jeep-hot-spring", "/bali/en/tours/mount-batur-sunrise-jeep-tour"],
    ["971506048673", WHATSAPP_NUMBER],
    ["/tproduct/1366959501-643417850282-classical-dubai-city-tour", "/bali/en/tours/north-bali-lovina-dolphins-tour"],
    ["/tproduct/1366959501-910807092422-full-day-explore-dubai-city-tour", "/bali/en/tours/east-bali-instagram-tour"],
    ["/tproduct/1366959501-232604178022-abu-dhabi-from-dubai", "/bali/en/tours/mount-batur-sunrise-hike"],
    ["https://sbexcursion.com/bali/en/tours/nusa-penida-manta-rays-point", "/bali/en/tours/nusa-penida-manta-rays-point"],
  ];

  for (const [from, to] of staticReplacements) {
    html = html.split(from).join(to);
  }

  html = patchStaticCardLinks(html);
  html = patchPlannerLinks(html);

  fs.writeFileSync(filePath, html);
}

function generatePages() {
  const allTours = tourDataMap();
  for (const tour of tours) {
    ensureHeroImage(tour);
    const html = renderPage(tour, allTours);
    const filePath = path.join(projectRoot, `bali-tour-${tour.slug}.html`);
    fs.writeFileSync(filePath, html);
  }
}

function main() {
  generatePages();
  patchBaliMainFile(path.join(projectRoot, "page128073236.html"));
  patchBaliMainFile(path.join(projectRoot, "files", "page128073236body.html"));
  console.log(`Generated ${tours.length} Bali tour pages and patched Bali main page files.`);
}

main();

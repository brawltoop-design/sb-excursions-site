# Brand Authority Report: SB Excursions

**Analysis Date:** 9 August 2026
**Brand:** SB Excursions
**Domain:** https://www.sbexcursion.com
**Industry:** Private day tours and transfers, Bali (Indonesia) — secondary Dubai operation
**Founder:** Alex Moskvin

---

## Brand Authority Score: 12/100 (Minimal)

### Platform Breakdown

| Platform | Score | Weight | Weighted | Status |
|---|---|---|---|---|
| YouTube | 22/100 | 25% | 5.5 | Channel exists — Dubai-branded, no videos |
| Reddit | 0/100 | 25% | 0.0 | Absent |
| Wikipedia | 0/100 | 20% | 0.0 | Absent (no article, no Wikidata) |
| LinkedIn | 0/100 | 15% | 0.0 | Absent |
| Other Platforms | 45/100 | 15% | 6.8 | Instagram + Telegram live, TripAdvisor pending |
| **Total** | | | **12.3/100** | |

---

## Platform Detail

### YouTube (22/100)

**Official Channel:** Yes — [youtube.com/@sbexcursions](https://www.youtube.com/@sbexcursions) (channel ID `UC09Moio2QM9E68ljTXcvf9A`)
**Channel Name:** "SB Excursions Dubai"
**Subscribers:** Not displayed publicly (indicates a very low count)
**Videos:** 0 found on the /videos tab
**Last Upload:** No uploads detected
**Third-Party Mentions:** 0 — searches surface only unrelated brands (SB Adventures, Surya Bintang Adventures, SB PROMOSINDO Bali, SB Bali Tour)

**Key Findings:**
- A channel exists and is correctly named, with a proper description ("Professional Tour Operator in Dubai"), but it is **empty** — an empty channel produces no transcripts, and transcripts are the part of YouTube that AI models actually ingest.
- The channel is **branded for Dubai, not Bali**, while the entire website and all 77 journal articles are about Bali. To an AI model building an entity profile, this is a contradiction rather than a confirmation.
- This is the single highest-leverage gap in the report: YouTube carries the strongest measured correlation with AI citation (~0.737 in the Ahrefs December 2025 study of 75,000 brands), and the account already exists — only content is missing.

### Reddit (0/100)

**Official Account:** No
**Own Subreddit:** No
**Mention Volume:** 0 threads found
**Primary Subreddits:** None
**Sentiment:** N/A — nothing to measure

**Key Findings:**
- No mentions of "SB Excursions" or "sbexcursion.com" anywhere on Reddit.
- Reddit's own JSON search API returned HTTP 403 for automated queries, so this rests on web-search results; given zero hits across multiple query forms, the conclusion is safe.
- Relevant communities where the target audience is active every day: r/bali, r/travel, r/indonesia, r/solotravel, r/digitalnomad. Threads asking for driver and Nusa Penida recommendations appear in r/bali constantly — the brand is absent from all of them.

### Wikipedia (0/100)

**Company Article:** No — Wikipedia API search for "SB Excursions" returns 10 unrelated results (Akaflieg Braunschweig SB-8, Fregat, State Public Scientific & Technological Library)
**Founder Article:** No — "Alex Moskvin" returns no matching article
**Wikidata Entry:** No — `wbsearchentities` returns **zero** candidates for "SB Excursions", "sbexcursion" and "Alex Moskvin"
**Cited in Other Articles:** No

**Key Findings:**
- Verified through the Wikipedia and Wikidata APIs directly, not through web search — the null result is reliable.
- A Wikipedia article is realistically out of reach: a small tour operator does not meet notability requirements, and attempting one would be rejected.
- **Wikidata, however, is achievable.** It has no notability threshold comparable to Wikipedia's and is a direct feed into the knowledge graphs AI models use for entity recognition. This is the cheapest meaningful win in the entire report.

### LinkedIn (0/100)

**Company Page:** No — `linkedin.com/company/sb-excursions` returns HTTP 404
**Followers:** N/A
**Post Frequency:** Never

**Key Findings:**
- No company page exists.
- For a B2C tour operator this is the lowest-value platform on the list, and it should be treated as a box-ticking exercise rather than a channel — it validates the entity, it does not sell tours.

### Other Platforms (45/100)

| Platform | Presence | Notes |
|---|---|---|
| Instagram | Yes | [@dubai_sb_excursions](https://www.instagram.com/dubai_sb_excursions) — live, 26 posts, **5 followers**, and Dubai-branded. Behind a login wall, so AI crawlers cannot read it. |
| Telegram | Yes | [t.me/SurfBase](https://t.me/SurfBase) — live, but branded "SURFBASE БАЛИ" with no textual link to the SB Excursions name |
| TripAdvisor | Pending | Listing submitted 7 August 2026, in moderation. Not yet indexed — search still surfaces the unrelated "Sb Bali Tours" |
| Google Business Profile | No | Not created. The strongest single signal for local and AI-assisted local search is missing |
| Trustpilot | No | No page for sbexcursion.com |
| Quora | No | No mentions found |
| GitHub / Stack Overflow | N/A | Not applicable to this industry |
| News / Press | No | No coverage found |
| Podcasts | No | No appearances found |

**Key Findings:**
- Both existing profiles carry **Dubai branding** while the business being marketed is Bali. Entity signals are split across two identities instead of reinforcing one.
- The Instagram account has 5 followers and sits behind a login wall — its value as an AI-visible signal is close to zero regardless of content.
- The site's `sameAs` array currently declares only these two profiles, which means the schema is honestly reporting a very thin entity.

---

## The Name Collision Problem

An unrelated company, **Sb Bali Tours** (Denpasar/Munduk, TripAdvisor listing `d10085251`, sbbalitour.com), already occupies the "SB + Bali tours" search space with an established review history.

This is not a minor annoyance. When an AI model builds an entity profile for a query like "SB tours Bali", it must disambiguate between two similarly named operators — and it will favour the one with review history, a TripAdvisor page and a Facebook presence. Every platform signal SB Excursions adds also serves to separate the two entities.

---

## Recommendations

### Immediate Actions (Week 1-2)

1. **YouTube — upload to the channel that already exists.** The account is set up and correctly named; it needs 5-10 videos. Guides already film on tour daily. Vertical clips of Kelingking, the Batur sunrise, and Manta Point, with "SB Excursions" spoken aloud in the first ten seconds and written in the description, will be transcribed and indexed. Say the brand name — transcripts are what AI models read.

2. **YouTube — resolve the Dubai/Bali split.** Either rename the channel to cover both destinations, or create a separate Bali channel. As it stands, the only YouTube entity carrying the name points at the wrong country.

3. **Wikidata — create the entity.** No notability threshold, free, and directly feeds AI knowledge graphs. Properties to set: *instance of* = travel agency, *official website* = sbexcursion.com, *country* = Indonesia, *location* = Bali, *inception* = founding year, *founded by* = Alex Moskvin. This closes the largest scoring gap for the least effort.

4. **Google Business Profile — create and verify.** Missing entirely, and it is the primary source Google AI Overviews and Gemini draw on for local businesses. Register as a service-area business so no shopfront address is required; verification may request a short video of the car and working phone, which is straightforward for a real operation.

### Short-Term Strategy (Month 1-3)

1. **Reddit — participate, do not advertise.** Answer questions in r/bali and r/travel about Nusa Penida logistics, Batur timing, and driver costs. Give the real answer with real numbers, and disclose the business interest plainly. Two to four substantive answers a month. Self-promotional posting gets removed and can get the account banned; genuine expertise from an operator is welcomed.

2. **TripAdvisor — activate the listing.** Once moderation clears, claim it and start the review flow: after each tour, send the guest a direct review link over WhatsApp. The first 10-15 reviews matter most, both for ranking and for separating the brand from Sb Bali Tours.

3. **Instagram — align the brand.** Either rename the existing account or open @sb.excursions.bali. Five followers on a Dubai-branded account is not an asset worth preserving as-is.

4. **Trustpilot — claim the domain page.** Free, quick to index, and requires only a domain email address.

### Long-Term Authority Building (Month 3-12)

1. **YouTube — build a real library.** Twenty to thirty videos covering each tour, plus comparison content ("Nusa Penida west or east", "Batur jeep or hike") that mirrors the journal articles. Comparison videos are disproportionately cited by AI for comparison queries, and the written versions already exist to work from.

2. **Reddit — become a recognised local voice.** Sustained, honest participation over months is what turns into "someone on Reddit recommended SB Excursions" inside an AI answer. There is no shortcut.

3. **Press and partnerships.** Coverage from travel blogs and Bali-focused publications creates the unlinked mentions that correlate with AI citation. Guest posts and collaborations with travel YouTubers serve the same purpose.

4. **LinkedIn — create the company page.** Low priority for B2C, but it is a cheap entity-validation signal once the higher-value platforms are handled.

---

## Competitive Context

| Brand | YouTube | Reddit | Wikipedia | LinkedIn | Other | Total |
|---|---|---|---|---|---|---|
| **SB Excursions** | 22 | 0 | 0 | 0 | 45 | **12** |
| Sb Bali Tours (name collision) | ~10 | ~5 | 0 | ~10 | ~55 | **~19** |
| Bali Sun Tours | ~45 | ~15 | 0 | ~20 | ~70 | **~35** |

Competitor figures are directional estimates from search visibility, not measured audits. The useful signal is the shape rather than the numbers: nobody in this niche has a Wikipedia article, and YouTube presence across the category is weak. The bar to clear is low.

---

## Key Takeaway

SB Excursions has a strong website and effectively zero off-site entity presence — 12/100, driven almost entirely by an empty, Dubai-branded YouTube channel and two thin social profiles. The single highest-impact action is to **fill the YouTube channel that already exists with tour footage that says the brand name out loud**, because it is the strongest measured predictor of AI citation and the account is already created; creating the Wikidata entity and the Google Business Profile are the two cheapest follow-ups.

---

## Method Notes

- Wikipedia and Wikidata checked through their official APIs (`action=query&list=search`, `wbsearchentities`) rather than web search, which is unreliable for null results.
- YouTube channel existence and metadata verified by fetching the channel page directly and parsing `channelMetadataRenderer`; the handle returns HTTP 200 even when no channel exists, so status codes alone were not trusted.
- LinkedIn checked by direct URL (404), Instagram and Telegram by direct fetch with content verification.
- Reddit's JSON search API returned HTTP 403 to automated requests; Reddit findings rest on web search across several query forms.
- TripAdvisor and Trustpilot block automated requests (403); their status is based on search-index visibility and on the submission made on 7 August 2026.
- Scoring follows the weights in the geo-brand-mentions rubric: YouTube 25%, Reddit 25%, Wikipedia 20%, LinkedIn 15%, Other 15%.

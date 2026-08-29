"""Сбор выдачи YouTube по корзине запросов о Бали.

Задача: понять, кто владеет верхом выдачи по спросу на экскурсии —
крупные OTA или кто-то другой. Считаем не мнение, а доли владельцев.

Квота: search.list = 100 юнитов, videos/channels.list = 1 юнит за пачку до 50.
40 запросов -> 4000 юнитов из 10000 дневных.
"""
import json, os, sys, time, urllib.parse, urllib.request

KEY = json.load(open(os.path.expanduser("~/.config/claude-seo/google-api.json")))["api_key"]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")
API = "https://www.googleapis.com/youtube/v3/"

# Три уровня спроса. Уровень 1 — вдохновение, человек ещё не выбрал.
# Уровень 2 — конкретное занятие, уже знает чего хочет. Уровень 3 — деньги.
QUERIES = [
    ("L1_inspiration", "bali travel guide"),
    ("L1_inspiration", "things to do in bali"),
    ("L1_inspiration", "bali itinerary"),
    ("L1_inspiration", "bali vlog"),
    ("L1_inspiration", "is bali worth it"),
    ("L1_inspiration", "bali travel tips"),
    ("L1_inspiration", "bali on a budget"),
    ("L1_inspiration", "first time in bali"),
    ("L1_inspiration", "ubud travel guide"),
    ("L1_inspiration", "canggu bali guide"),
    ("L1_inspiration", "nusa penida guide"),
    ("L1_inspiration", "bali honeymoon"),
    ("L1_inspiration", "bali with family"),
    ("L1_inspiration", "bali travel mistakes"),
    ("L2_activity", "mount batur sunrise trek"),
    ("L2_activity", "nusa penida day trip"),
    ("L2_activity", "ayung river rafting bali"),
    ("L2_activity", "bali waterfall tour"),
    ("L2_activity", "uluwatu kecak dance"),
    ("L2_activity", "manta rays nusa penida snorkeling"),
    ("L2_activity", "gili islands from bali"),
    ("L2_activity", "bali private driver"),
    ("L2_activity", "tegallalang rice terrace"),
    ("L2_activity", "bali swing"),
    ("L2_activity", "diving nusa penida"),
    ("L2_activity", "bali temple tour"),
    ("L2_activity", "besakih temple bali"),
    ("L2_activity", "sekumpul waterfall"),
    ("L3_booking", "bali tour price"),
    ("L3_booking", "how much does a bali trip cost"),
    ("L3_booking", "bali private driver cost per day"),
    ("L3_booking", "best bali tour company"),
    ("L3_booking", "how to book tours in bali"),
    ("L3_booking", "bali tour guide hire"),
    ("L3_booking", "mount batur trekking price"),
    ("L3_booking", "nusa penida tour price"),
    ("L3_booking", "bali airport transfer"),
    ("L3_booking", "bali tour package"),
    ("L3_booking", "getyourguide bali"),
    ("L3_booking", "viator bali tours"),
]

def get(endpoint, **params):
    params["key"] = KEY
    url = API + endpoint + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "sbexcursion-audit/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def main():
    results = []
    for level, q in QUERIES:
        try:
            data = get("search", part="snippet", q=q, type="video",
                       maxResults=20, regionCode="US", relevanceLanguage="en")
        except Exception as e:
            print(f"!! {q}: {e}", file=sys.stderr)
            continue
        for pos, item in enumerate(data.get("items", []), 1):
            s = item["snippet"]
            results.append({
                "level": level, "query": q, "position": pos,
                "video_id": item["id"]["videoId"],
                "title": s["title"],
                "channel_id": s["channelId"],
                "channel_title": s["channelTitle"],
                "published_at": s["publishedAt"],
            })
        print(f"  {q}: {len(data.get('items', []))}", file=sys.stderr)
        time.sleep(0.2)

    json.dump(results, open(os.path.join(OUT, "yt-search-raw.json"), "w"),
              ensure_ascii=False, indent=1)
    print(f"\nвидео собрано: {len(results)}", file=sys.stderr)
    print(f"уникальных каналов: {len(set(r['channel_id'] for r in results))}", file=sys.stderr)

main()

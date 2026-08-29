"""Добор упавшего запроса + статистика по видео и каналам.

Из search.list не видно ни просмотров, ни подписчиков, ни описания —
а именно там живут партнёрские ссылки, по которым отличается блогер
от аффилиата OTA. Поэтому второй проход.
"""
import json, os, sys, time, urllib.parse, urllib.request

KEY = json.load(open(os.path.expanduser("~/.config/claude-seo/google-api.json")))["api_key"]
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "raw")
API = "https://www.googleapis.com/youtube/v3/"

def get(endpoint, tries=4, **params):
    params["key"] = KEY
    url = API + endpoint + "?" + urllib.parse.urlencode(params)
    last = None
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "sbexcursion-audit/1.0"})
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except Exception as e:
            last = e
            time.sleep(1.5 * (attempt + 1))
    raise last

rows = json.load(open(os.path.join(OUT, "yt-search-raw.json")))

# добор упавшего запроса
have = {r["query"] for r in rows}
for level, q in [("L2_activity", "bali private driver")]:
    if q in have:
        continue
    data = get("search", part="snippet", q=q, type="video",
               maxResults=20, regionCode="US", relevanceLanguage="en")
    for pos, item in enumerate(data.get("items", []), 1):
        s = item["snippet"]
        rows.append({"level": level, "query": q, "position": pos,
                     "video_id": item["id"]["videoId"], "title": s["title"],
                     "channel_id": s["channelId"], "channel_title": s["channelTitle"],
                     "published_at": s["publishedAt"]})
    print(f"добрано {q}: {len(data.get('items', []))}", file=sys.stderr)

json.dump(rows, open(os.path.join(OUT, "yt-search-raw.json"), "w"), ensure_ascii=False, indent=1)

def chunks(seq, n=50):
    seq = list(seq)
    for i in range(0, len(seq), n):
        yield seq[i:i + n]

# видео: просмотры и полное описание (там партнёрские ссылки)
videos = {}
vids = sorted({r["video_id"] for r in rows})
for batch in chunks(vids):
    d = get("videos", part="snippet,statistics,contentDetails", id=",".join(batch), maxResults=50)
    for it in d.get("items", []):
        videos[it["id"]] = {
            "views": int(it.get("statistics", {}).get("viewCount", 0) or 0),
            "likes": int(it.get("statistics", {}).get("likeCount", 0) or 0),
            "comments": int(it.get("statistics", {}).get("commentCount", 0) or 0),
            "duration": it.get("contentDetails", {}).get("duration", ""),
            "description": it.get("snippet", {}).get("description", ""),
            "tags": it.get("snippet", {}).get("tags", []),
        }
print(f"видео со статистикой: {len(videos)}", file=sys.stderr)

# каналы: подписчики, страна, дата создания
channels = {}
cids = sorted({r["channel_id"] for r in rows})
for batch in chunks(cids):
    d = get("channels", part="snippet,statistics", id=",".join(batch), maxResults=50)
    for it in d.get("items", []):
        st = it.get("statistics", {})
        sn = it.get("snippet", {})
        channels[it["id"]] = {
            "title": sn.get("title", ""),
            "country": sn.get("country", ""),
            "created": sn.get("publishedAt", ""),
            "description": sn.get("description", ""),
            "custom_url": sn.get("customUrl", ""),
            "subscribers": int(st.get("subscriberCount", 0) or 0),
            "hidden_subs": st.get("hiddenSubscriberCount", False),
            "total_views": int(st.get("viewCount", 0) or 0),
            "video_count": int(st.get("videoCount", 0) or 0),
        }
print(f"каналов со статистикой: {len(channels)}", file=sys.stderr)

json.dump(videos, open(os.path.join(OUT, "yt-videos.json"), "w"), ensure_ascii=False, indent=1)
json.dump(channels, open(os.path.join(OUT, "yt-channels.json"), "w"), ensure_ascii=False, indent=1)
print(f"строк всего: {len(rows)}", file=sys.stderr)

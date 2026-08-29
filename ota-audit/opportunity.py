"""Что именно выигрывает на свободных запросах — формат, длина, возраст.
Нужно, чтобы рекомендация была «снять вот такое», а не «снимайте видео»."""
import json,re,statistics,collections,datetime
OUT="ota-audit/raw"
rows=json.load(open(f"{OUT}/yt-search-classified.json"))
vids=json.load(open(f"{OUT}/yt-videos.json"))
ch=json.load(open(f"{OUT}/yt-channels.json"))
NOW=datetime.datetime(2026,8,29,tzinfo=datetime.timezone.utc)

TARGET=["bali swing","bali airport transfer","bali private driver cost per day",
        "mount batur trekking price","ayung river rafting bali","uluwatu kecak dance",
        "manta rays nusa penida snorkeling","besakih temple bali","sekumpul waterfall",
        "tegallalang rice terrace","bali private driver","nusa penida tour price"]

def secs(iso):
    m=re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?",iso or "")
    if not m: return 0
    h,mi,s=(int(x) if x else 0 for x in m.groups())
    return h*3600+mi*60+s

for q in TARGET:
    rs=sorted([r for r in rows if r["query"]==q],key=lambda x:x["position"])[:5]
    if not rs: continue
    print(f"\n### {q}")
    for r in rs:
        v=vids.get(r["video_id"],{}); c=ch.get(r["channel_id"],{})
        d=secs(v.get("duration",""))
        age=(NOW-datetime.datetime.fromisoformat(r["published_at"].replace("Z","+00:00"))).days/365.25
        short="ШОРТС" if d and d<=60 else f"{d//60}:{d%60:02d}"
        print(f"  {r['position']:2d}. {v.get('views',0):9,d} просм | {short:>7s} | {age:4.1f} лет | "
              f"{c.get('subscribers',0):8,d} подпис | {r['title'][:58]}")
    ds=[secs(vids[r["video_id"]].get("duration","")) for r in [x for x in rows if x["query"]==q] if r["video_id"] in vids]
    ds=[d for d in ds if d]
    sh=sum(1 for d in ds if d<=60)
    print(f"     -> медиана длины {statistics.median(ds)//60:.0f}:{statistics.median(ds)%60:02.0f}, шортсов в топ-20: {sh}/{len(ds)}")

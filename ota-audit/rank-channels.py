import json, collections, re
OUT="ota-audit/raw"
rows=json.load(open(f"{OUT}/yt-search-raw.json"))
ch=json.load(open(f"{OUT}/yt-channels.json"))
ev=json.load(open(f"{OUT}/yt-affiliate-evidence.json"))
vids=json.load(open(f"{OUT}/yt-videos.json"))

app=collections.Counter(r["channel_id"] for r in rows)
# есть ли вообще собственные каналы OTA в выдаче
OTA_NAMES=re.compile(r"^(getyourguide|viator|klook|tripadvisor|booking\.com|expedia|airbnb|civitatis|headout|tiqets|kkday|agoda)\b",re.I)
print("=== собственные каналы OTA, попавшие в топ-20 ===")
found=False
for cid,n in app.most_common():
    t=ch.get(cid,{}).get("title","")
    if OTA_NAMES.match(t.strip()):
        found=True
        print(f"  {t}  появлений: {n}  подписчиков: {ch[cid]['subscribers']:,}")
if not found: print("  НЕТ НИ ОДНОГО")

print("\n=== топ-45 каналов по числу появлений в топ-20 ===")
print(f"{'канал':42s} {'появл':>5s} {'подпис':>10s} {'страна':>6s} {'видео':>6s}  улики")
for cid,n in app.most_common(45):
    c=ch.get(cid,{})
    e=ev.get(cid,{})
    u=[]
    if e.get("ota"): u.append("OTA:"+",".join(e["ota"]))
    if e.get("net"): u.append("сеть:"+",".join(e["net"]))
    if e.get("tags"): u.append(f"метки×{e['tags']}")
    print(f"{c.get('title','?')[:42]:42s} {n:5d} {c.get('subscribers',0):10,d} {c.get('country','-'):>6s} {c.get('video_count',0):6d}  {' '.join(u)}")

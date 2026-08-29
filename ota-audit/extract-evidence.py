"""Улики для классификации владельца канала.

Аффилиата нельзя определять по названию канала — только по ссылкам
в описаниях. Здесь собираются именно улики, а не выводы: домены OTA,
партнёрские метки и агрегаторы партнёрских программ.
"""
import json, os, re, collections

OUT = "ota-audit/raw"
rows = json.load(open(f"{OUT}/yt-search-raw.json"))
videos = json.load(open(f"{OUT}/yt-videos.json"))
channels = json.load(open(f"{OUT}/yt-channels.json"))

print(f"строк выдачи: {len(rows)}  уникальных видео: {len({r['video_id'] for r in rows})}  "
      f"со статистикой: {len(videos)}  каналов: {len(channels)}")

# Домены OTA и партнёрских сетей. Метки (partner_id, pid, aid, mcid, cid)
# смотрим отдельно — сам домен ещё не делает ссылку партнёрской.
OTA_DOMAINS = {
    "getyourguide": r"getyourguide\.\w+|gyg\.me",
    "viator": r"viator\.com",
    "klook": r"klook\.com|klk\.\w+",
    "tripadvisor": r"tripadvisor\.\w+",
    "booking": r"booking\.com",
    "agoda": r"agoda\.com",
    "expedia": r"expedia\.\w+",
    "airbnb": r"airbnb\.\w+|abnb\.me",
    "civitatis": r"civitatis\.com",
    "headout": r"headout\.com",
    "tiqets": r"tiqets\.com",
    "kkday": r"kkday\.com",
}
NETWORKS = {
    "travelpayouts": r"tp\.media|\.tp\.st|travelpayouts",
    "impact": r"\.pxf\.io|impact\.com",
    "awin": r"awin\d?\.com|tidd\.ly",
    "cj": r"anrdoezrs\.net|jdoqocy\.com|dpbolvw\.net|kqzyfj\.com|tkqlhce\.com",
    "shareasale": r"shareasale\.com",
    "partnerize": r"prf\.hn",
    "sovrn": r"redirect\.viglink|sovrn\.co",
}
TAGS = r"(partner_id|partner=|[?&]pid=|[?&]aid=|[?&]mcid=|[?&]cid=|[?&]campaign_id=|affiliate|[?&]ref=|utm_medium=affiliate)"

by_channel = collections.defaultdict(lambda: {"ota": collections.Counter(),
                                              "net": collections.Counter(),
                                              "tags": 0, "vids": 0})
for vid, v in videos.items():
    pass
# описание относим к каналу, которому принадлежит видео
vid2chan = {r["video_id"]: r["channel_id"] for r in rows}
for vid, v in videos.items():
    cid = vid2chan.get(vid)
    if not cid:
        continue
    text = (v.get("description") or "").lower()
    rec = by_channel[cid]
    rec["vids"] += 1
    for name, pat in OTA_DOMAINS.items():
        if re.search(pat, text):
            rec["ota"][name] += 1
    for name, pat in NETWORKS.items():
        if re.search(pat, text):
            rec["net"][name] += 1
    if re.search(TAGS, text):
        rec["tags"] += 1

# сколько каналов вообще упоминают OTA
with_ota = [c for c, r in by_channel.items() if r["ota"]]
with_net = [c for c, r in by_channel.items() if r["net"]]
print(f"\nканалов с описаниями: {len(by_channel)}")
print(f"каналов, упоминающих домен OTA: {len(with_ota)}")
print(f"каналов с партнёрской сетью: {len(with_net)}")

print("\n— какие OTA вообще всплывают в описаниях —")
tot = collections.Counter()
for r in by_channel.values():
    for k, n in r["ota"].items():
        tot[k] += n
for k, n in tot.most_common():
    chans = sum(1 for r in by_channel.values() if r["ota"].get(k))
    print(f"  {k:14s} видео: {n:4d}   каналов: {chans}")

print("\n— партнёрские сети —")
tn = collections.Counter()
for r in by_channel.values():
    for k, n in r["net"].items():
        tn[k] += n
for k, n in tn.most_common():
    print(f"  {k:14s} видео: {n}")

json.dump({c: {"ota": dict(r["ota"]), "net": dict(r["net"]),
               "tags": r["tags"], "vids": r["vids"]}
           for c, r in by_channel.items()},
          open(f"{OUT}/yt-affiliate-evidence.json", "w"), ensure_ascii=False, indent=1)

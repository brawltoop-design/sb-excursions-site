"""Классификация владельцев каналов из выдачи YouTube.

Главная осторожность: упоминание домена OTA — ещё не партнёрство.
Партнёрской ссылку делает метка в URL или редирект через партнёрскую
сеть. Поэтому домены и метки проверяются вместе, на уровне конкретного URL.
"""
import json, re, collections, statistics, datetime

OUT="ota-audit/raw"
rows=json.load(open(f"{OUT}/yt-search-raw.json"))
ch=json.load(open(f"{OUT}/yt-channels.json"))
vids=json.load(open(f"{OUT}/yt-videos.json"))
vid2chan={r["video_id"]:r["channel_id"] for r in rows}

URL=re.compile(r"https?://[^\s<>\"'\)]+",re.I)
# Фирменные шортенеры партнёрских порталов. Метки в URL у них нет по устройству:
# идентификатор партнёра зашит в сам короткий адрес. Без них счёт аффилиатов
# занижался вдвое — 19 каналов вместо 32, и лидером ошибочно выходил Klook.
BRAND_SHORTENERS={"gyg.me/":"getyourguide","s.klook.com/":"klook","klk.st/":"klook"}
OTA_DOM=re.compile(r"(getyourguide|gyg\.me|viator\.com|klook\.com|tripadvisor|booking\.com|agoda\.com|expedia|airbnb|abnb\.me|civitatis|headout|tiqets|kkday)",re.I)
NET_DOM=re.compile(r"(tp\.media|\.tp\.st|travelpayouts|\.pxf\.io|impact\.com|awin\d?\.com|tidd\.ly|anrdoezrs\.net|jdoqocy\.com|dpbolvw\.net|kqzyfj\.com|tkqlhce\.com|shareasale\.com|prf\.hn)",re.I)
AFF_TAG=re.compile(r"(partner_id=|partner=|[?&]pid=|[?&]aid=|[?&]mcid=|[?&]cid=|[?&]campaign_id=|affiliate|[?&]ref=|utm_medium=affiliate|[?&]irclickid=)",re.I)

# улики по каналу
chan=collections.defaultdict(lambda:{"ota_tagged":set(),"ota_plain":set(),"net":set(),"desc":[]})
for vid,v in vids.items():
    cid=vid2chan.get(vid)
    if not cid: continue
    d=v.get("description") or ""
    chan[cid]["desc"].append(d)
    for u in URL.findall(d):
        m=OTA_DOM.search(u)
        if m:
            brand=m.group(1).lower()
            if AFF_TAG.search(u): chan[cid]["ota_tagged"].add(brand)
            else: chan[cid]["ota_plain"].add(brand)
        if NET_DOM.search(u): chan[cid]["net"].add(NET_DOM.search(u).group(1).lower())
        for dom,brand in BRAND_SHORTENERS.items():
            if dom in u.lower(): chan[cid]["ota_tagged"].add(brand)

OTA_OWN=re.compile(r"^(getyourguide|viator|klook|tripadvisor|booking\.com|expedia|airbnb|civitatis|headout|tiqets|kkday|agoda)\b",re.I)
MEDIA=re.compile(r"(lonely planet|condé nast|conde nast|national geographic|cnn|bbc|travel\s*\+\s*leisure|insider|expedia group|rick steves|cnbc|bloomberg|abc news|nbc|dw |deutsche welle|euronews)",re.I)
OP_WORD=re.compile(r"\b(tour|tours|trip|trips|travel|driver|transport|adventure|holiday|charter|excursion|rental|dive|diving|guide service|open trip)\b",re.I)
PHONE=re.compile(r"(\+62|wa\.me|whatsapp)",re.I)

def classify(cid):
    c=ch.get(cid,{})
    t=(c.get("title") or "").strip()
    desc=" ".join(chan[cid]["desc"])+" "+(c.get("description") or "")
    if OTA_OWN.match(t): return "OTA_OWN"
    if MEDIA.search(t): return "MEDIA"
    e=chan[cid]
    is_aff = bool(e["net"]) or bool(e["ota_tagged"])
    # местный оператор: страна ID + деловые признаки, либо контакт в WhatsApp
    local = c.get("country")=="ID" and (OP_WORD.search(t) or PHONE.search(desc))
    if local: return "LOCAL_OPERATOR_AFFILIATE" if is_aff else "LOCAL_OPERATOR"
    if is_aff: return "CREATOR_OTA_AFFILIATE"
    if e["ota_plain"]: return "CREATOR_MENTIONS_OTA"
    return "CREATOR_INDEPENDENT"

cls={cid:classify(cid) for cid in ch}
for r in rows: r["owner"]=cls.get(r["channel_id"],"UNKNOWN")
json.dump(rows,open(f"{OUT}/yt-search-classified.json","w"),ensure_ascii=False,indent=1)

print("=== ДОЛИ СЛОТОВ В ТОП-20 (800 слотов, 40 запросов) ===")
c=collections.Counter(r["owner"] for r in rows)
for k,n in c.most_common(): print(f"  {k:26s} {n:4d}  {n/len(rows)*100:5.1f}%")

print("\n=== ДОЛИ КАНАЛОВ (436) ===")
cc=collections.Counter(cls.values())
for k,n in cc.most_common(): print(f"  {k:26s} {n:4d}  {n/len(cls)*100:5.1f}%")

print("\n=== СКОЛЬКО ЗАПРОСОВ БЕЗ OTA В ТОП-20 ===")
byq=collections.defaultdict(list)
for r in rows: byq[r["query"]].append(r["owner"])
zero_own=sum(1 for q,o in byq.items() if "OTA_OWN" not in o)
zero_any=sum(1 for q,o in byq.items() if "OTA_OWN" not in o and "CREATOR_OTA_AFFILIATE" not in o and "LOCAL_OPERATOR_AFFILIATE" not in o)
print(f"  без собственного канала OTA:        {zero_own} из {len(byq)}")
print(f"  без OTA вообще (вкл. аффилиатов):   {zero_any} из {len(byq)}")

print("\n=== ПО УРОВНЯМ СПРОСА ===")
for lvl in ["L1_inspiration","L2_activity","L3_booking"]:
    sub=[r for r in rows if r["level"]==lvl]
    cn=collections.Counter(r["owner"] for r in sub)
    ota=cn["OTA_OWN"]; aff=cn["CREATOR_OTA_AFFILIATE"]+cn["LOCAL_OPERATOR_AFFILIATE"]
    loc=cn["LOCAL_OPERATOR"]+cn["LOCAL_OPERATOR_AFFILIATE"]
    print(f"  {lvl:16s} слотов {len(sub):3d} | OTA свои {ota:2d} ({ota/len(sub)*100:4.1f}%) | "
          f"аффилиаты {aff:3d} ({aff/len(sub)*100:4.1f}%) | местные операторы {loc:2d} ({loc/len(sub)*100:4.1f}%)")

print("\n=== МЕСТНЫЕ ОПЕРАТОРЫ В ВЫДАЧЕ ===")
loc=[cid for cid,k in cls.items() if k.startswith("LOCAL_OPERATOR")]
app=collections.Counter(r["channel_id"] for r in rows)
for cid in sorted(loc,key=lambda x:-app[x]):
    c=ch[cid]
    print(f"  {c['title'][:38]:38s} появл {app[cid]:2d}  подпис {c['subscribers']:7,d}  видео {c['video_count']:4d}  {cls[cid]}")

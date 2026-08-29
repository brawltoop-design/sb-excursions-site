"""Доли не по слотам, а по просмотрам — и строгая проверка аффилиатов.

Слот у канала на 2,3 млн подписчиков и слот у оператора со 121 подписчиком
в таблице выглядят одинаково, а внимания собирают несопоставимо. Поэтому
второй счёт — по просмотрам. Плюс раздельно: ссылка на OTA с партнёрской
меткой (доказано) и просто партнёрская сеть (может быть не про экскурсии).
"""
import json,re,collections,statistics,datetime
OUT="ota-audit/raw"
rows=json.load(open(f"{OUT}/yt-search-classified.json"))
ch=json.load(open(f"{OUT}/yt-channels.json"))
vids=json.load(open(f"{OUT}/yt-videos.json"))
vid2chan={r["video_id"]:r["channel_id"] for r in rows}

URL=re.compile(r"https?://[^\s<>\"'\)]+",re.I)
OTA_DOM=re.compile(r"(getyourguide|gyg\.me|viator\.com|klook\.com|tripadvisor|booking\.com|agoda\.com|expedia|airbnb|abnb\.me|civitatis|headout|tiqets|kkday)",re.I)
AFF_TAG=re.compile(r"(partner_id=|partner=|[?&]pid=|[?&]aid=|[?&]mcid=|[?&]campaign_id=|affiliate|utm_medium=affiliate|[?&]irclickid=)",re.I)
TOUR_OTA=re.compile(r"(getyourguide|gyg\.me|viator\.com|klook\.com|civitatis|headout|tiqets|kkday)",re.I)

# Фирменные шортенеры партнёрских порталов: метки в URL у них нет по устройству,
# идентификатор партнёра зашит в сам короткий адрес. Без них счёт занижался вдвое.
BRAND_SHORT={"gyg.me/":"getyourguide","s.klook.com/":"klook","klk.st/":"klook"}
strict=collections.defaultdict(set)   # экскурсионные OTA: метка ИЛИ фирменный шортенер
for vid,v in vids.items():
    cid=vid2chan.get(vid)
    if not cid: continue
    for u in URL.findall(v.get("description") or ""):
        if TOUR_OTA.search(u) and AFF_TAG.search(u):
            strict[cid].add(TOUR_OTA.search(u).group(1).lower())
        for dom,brand in BRAND_SHORT.items():
            if dom in u.lower(): strict[cid].add(brand)

print("=== СТРОГО: каналы с партнёрской ссылкой именно на ЭКСКУРСИОННУЮ OTA ===")
print(f"  каналов: {len(strict)} из {len(ch)}  ({len(strict)/len(ch)*100:.1f}%)")
slots=sum(1 for r in rows if r["channel_id"] in strict)
print(f"  слотов:  {slots} из {len(rows)}  ({slots/len(rows)*100:.1f}%)")
br=collections.Counter()
for s in strict.values():
    for b in s: br[b]+=1
print("  по брендам (каналов):", dict(br.most_common()))

# просмотры
uniq={}
for r in rows:
    uniq.setdefault(r["video_id"],r)
tot=sum(vids[v]["views"] for v in uniq if v in vids)
print(f"\n=== ДОЛИ ПО ПРОСМОТРАМ (уникальных видео {len(uniq)}, суммарно {tot:,} просмотров) ===")
byown=collections.Counter()
for v,r in uniq.items():
    if v in vids: byown[r["owner"]]+=vids[v]["views"]
for k,n in byown.most_common():
    print(f"  {k:26s} {n:12,d}  {n/tot*100:5.1f}%")

print("\n=== МЕДИАНЫ ПО КАТЕГОРИЯМ ===")
print(f"{'категория':26s} {'видео':>6s} {'медиана просм':>14s} {'медиана подпис':>15s} {'медиана лет':>12s}")
now=datetime.datetime(2026,8,29,tzinfo=datetime.timezone.utc)
for k in ["OTA_OWN","CREATOR_OTA_AFFILIATE","CREATOR_MENTIONS_OTA","CREATOR_INDEPENDENT","LOCAL_OPERATOR","LOCAL_OPERATOR_AFFILIATE"]:
    sub=[r for v,r in uniq.items() if r["owner"]==k and v in vids]
    if not sub: continue
    vw=[vids[r["video_id"]]["views"] for r in sub]
    sb=[ch[r["channel_id"]]["subscribers"] for r in sub if r["channel_id"] in ch]
    ag=[(now-datetime.datetime.fromisoformat(r["published_at"].replace("Z","+00:00"))).days/365.25 for r in sub]
    print(f"{k:26s} {len(sub):6d} {statistics.median(vw):14,.0f} {statistics.median(sb):15,.0f} {statistics.median(ag):12.1f}")

print("\n=== ВОЗРАСТ ВЫДАЧИ: насколько свежее нужно видео ===")
ages=[(now-datetime.datetime.fromisoformat(r["published_at"].replace("Z","+00:00"))).days/365.25 for r in uniq.values()]
ages.sort()
print(f"  медиана {statistics.median(ages):.1f} лет | 25-й перцентиль {ages[len(ages)//4]:.1f} | 75-й {ages[3*len(ages)//4]:.1f}")
for lvl in ["L1_inspiration","L2_activity","L3_booking"]:
    a=[(now-datetime.datetime.fromisoformat(r["published_at"].replace("Z","+00:00"))).days/365.25 for r in uniq.values() if r["level"]==lvl]
    print(f"  {lvl:16s} медиана {statistics.median(a):.1f} лет")

print("\n=== ПРОСМОТРЫ НА ПОДПИСЧИКА (кто пробивается не за счёт аудитории) ===")
rat=[]
for v,r in uniq.items():
    c=ch.get(r["channel_id"],{})
    if v in vids and c.get("subscribers",0)>100:
        rat.append((vids[v]["views"]/c["subscribers"],r["owner"]))
byo=collections.defaultdict(list)
for x,o in rat: byo[o].append(x)
for k,vals in sorted(byo.items(),key=lambda x:-statistics.median(x[1])):
    print(f"  {k:26s} медиана {statistics.median(vals):6.2f}  (n={len(vals)})")

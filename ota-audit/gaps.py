"""Где на YouTube есть спрос, который никто из продавцов не забирает.

Считаем по каждому запросу: сколько внимания (просмотров) собирает топ-20
и кто его держит. Запрос интересен нам, если внимания много, а операторов
и OTA в выдаче нет — значит место свободно для того, кто реально возит.
"""
import json,collections,statistics,os,re
OUT="ota-audit/raw"
rows=json.load(open(f"{OUT}/yt-search-classified.json"))
vids=json.load(open(f"{OUT}/yt-videos.json"))
ch=json.load(open(f"{OUT}/yt-channels.json"))

byq=collections.defaultdict(list)
for r in rows: byq[(r["level"],r["query"])].append(r)

res=[]
for (lvl,q),rs in byq.items():
    seen=set(); vw=0
    for r in rs:
        if r["video_id"] in seen or r["video_id"] not in vids: continue
        seen.add(r["video_id"]); vw+=vids[r["video_id"]]["views"]
    cn=collections.Counter(r["owner"] for r in rs)
    sellers=cn["OTA_OWN"]+cn["LOCAL_OPERATOR"]+cn["LOCAL_OPERATOR_AFFILIATE"]
    aff=cn["CREATOR_OTA_AFFILIATE"]
    med_sub=statistics.median([ch.get(r["channel_id"],{}).get("subscribers",0) for r in rs])
    res.append({"уровень":lvl,"запрос":q,"просмотры_топ20":vw,"слотов_у_продавцов":sellers,
                "слотов_у_партнёров_OTA":aff,"медиана_подписчиков":med_sub})

print("=== ЗАПРОСЫ, ГДЕ ПРОДАВЦОВ НЕТ ВООБЩЕ, А ВНИМАНИЯ МНОГО ===")
print(f"{'запрос':36s} {'просмотры топ-20':>17s} {'партн.OTA':>10s} {'медиана подпис':>15s}")
free=[r for r in res if r["слотов_у_продавцов"]==0]
for r in sorted(free,key=lambda x:-x["просмотры_топ20"])[:15]:
    print(f"{r['запрос'][:36]:36s} {r['просмотры_топ20']:17,d} {r['слотов_у_партнёров_OTA']:10d} {r['медиана_подписчиков']:15,.0f}")

print(f"\nвсего запросов без единого продавца в топ-20: {len(free)} из {len(res)}")

print("\n=== ЗАПРОСЫ С НИЗКИМ ПОРОГОМ ВХОДА (медиана подписчиков мала) ===")
for r in sorted(res,key=lambda x:x["медиана_подписчиков"])[:12]:
    print(f"{r['запрос'][:36]:36s} медиана подпис {r['медиана_подписчиков']:9,.0f}  "
          f"просмотры {r['просмотры_топ20']:12,d}  продавцов {r['слотов_у_продавцов']}")

json.dump(res,open(f"{OUT}/query-gaps.json","w"),ensure_ascii=False,indent=1)

# что у нас уже есть в журнале
guides=sorted(re.sub(r"^bali-journal-guide-|\.html$","",f)
              for f in os.listdir(".") if re.match(r"^bali-journal-guide-[a-z0-9-]+\.html$",f))
print(f"\n=== У НАС В ЖУРНАЛЕ {len(guides)} СТАТЕЙ (английских) ===")
words=set()
for g in guides: words.update(g.split("-"))
print("\n=== ТЕМЫ ЗАПРОСОВ, КОТОРЫХ НЕТ В НАЗВАНИЯХ НАШИХ СТАТЕЙ ===")
for r in sorted(res,key=lambda x:-x["просмотры_топ20"]):
    toks=[t for t in re.findall(r"[a-z]+",r["запрос"]) if len(t)>3 and t not in {"bali","from","does","much","best","tour","tours","your","with","cost","hire","guide","much"}]
    missing=[t for t in toks if t not in words]
    if missing:
        print(f"  {r['запрос'][:40]:40s} нет слов: {', '.join(missing):28s} просмотры {r['просмотры_топ20']:,}")

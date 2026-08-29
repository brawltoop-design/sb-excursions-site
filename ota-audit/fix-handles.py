"""Досбор двух каналов, у которых хэндл увёл не туда (klook, headout),
и проверка гипотезы: канал OTA — это витрина рекламы, а не аудитория.
Признак — просмотров на подписчика в сотни раз больше нормы."""
import json,os,urllib.parse,urllib.request,time
KEY=json.load(open(os.path.expanduser("~/.config/claude-seo/google-api.json")))["api_key"]
API="https://www.googleapis.com/youtube/v3/"
def get(ep,**p):
    p["key"]=KEY
    for a in range(4):
        try:
            r=urllib.request.Request(API+ep+"?"+urllib.parse.urlencode(p),headers={"User-Agent":"sbexcursion-audit/1.0"})
            with urllib.request.urlopen(r,timeout=40) as f: return json.load(f)
        except Exception as e:
            err=e; time.sleep(1.5*(a+1))
    raise err

out=json.load(open("ota-audit/raw/ota-own-channels.json"))
for brand,q in [("klook","Klook"),("headout","Headout"),("tiqets","Tiqets"),("kkday","KKday")]:
    d=get("search",part="snippet",q=q,type="channel",maxResults=5)
    best=None
    for it in d.get("items",[]):
        cid=it["snippet"]["channelId"]
        c=get("channels",part="snippet,statistics",id=cid)["items"][0]
        subs=int(c["statistics"].get("subscriberCount",0) or 0)
        if best is None or subs>best[1]: best=(c,subs)
    if not best: continue
    c,subs=best; st=c["statistics"]; sn=c["snippet"]
    tv=int(st.get("viewCount",0) or 0)
    out[brand]={"title":sn["title"],"subs":subs,"total_views":tv,
                "video_count":int(st.get("videoCount",0) or 0),
                "created":sn.get("publishedAt",""),"country":sn.get("country",""),
                "note":"канал найден поиском, хэндл не совпал"}
    print(f"{sn['title'][:20]:20s} подпис {subs:9,d}  видео {out[brand]['video_count']:5d}  всего просм {tv:15,d}")

json.dump(out,open("ota-audit/raw/ota-own-channels.json","w"),ensure_ascii=False,indent=1)

print("\n=== ПРОСМОТРОВ НА ПОДПИСЧИКА ЗА ВСЮ ЖИЗНЬ КАНАЛА ===")
print("(у нормального контентного канала 50–300; тысячи означают, что просмотры куплены)")
for b,d in sorted(out.items(),key=lambda x:-(x[1]["total_views"]/max(x[1]["subs"],1))):
    if not d.get("subs"): continue
    r=d["total_views"]/max(d["subs"],1)
    flag="  <-- витрина рекламы" if r>1000 else ""
    print(f"  {d['title'][:22]:22s} {d['total_views']:15,d} / {d['subs']:9,d} = {r:9,.0f}{flag}")

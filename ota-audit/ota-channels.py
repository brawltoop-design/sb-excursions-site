"""Блок 3: собственные каналы OTA на YouTube — что они реально публикуют.

Вопрос не «есть ли у них канал» (есть у всех), а «работает ли он»:
частота выпуска, свежие просмотры, отдача на подписчика.
"""
import json,os,statistics,datetime,urllib.parse,urllib.request,time,sys
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

HANDLES=["getyourguide","viator","klook","tripadvisor","bookingcom","expedia","airbnb","civitatis","headout","tiqets","kkday","agoda"]
now=datetime.datetime(2026,8,29,tzinfo=datetime.timezone.utc)
out={}
print(f"{'бренд':16s} {'подпис':>10s} {'видео':>6s} {'всего просм':>13s} {'просм/подп':>10s}  свежесть")
for h in HANDLES:
    try: d=get("channels",part="snippet,statistics,contentDetails",forHandle=h)
    except Exception as e:
        print(f"{h:16s} ошибка: {e}"); continue
    if not d.get("items"):
        print(f"{h:16s} канал по хэндлу не найден"); continue
    it=d["items"][0]; st=it["statistics"]; sn=it["snippet"]
    subs=int(st.get("subscriberCount",0) or 0); tv=int(st.get("viewCount",0) or 0)
    up=it["contentDetails"]["relatedPlaylists"].get("uploads")
    try:
        pl=get("playlistItems",part="snippet",playlistId=up,maxResults=25) if up else {}
    except Exception:
        pl={}          # у части каналов плейлист загрузок закрыт — считаем только итоги
    items=pl.get("items",[])
    dates=sorted([datetime.datetime.fromisoformat(i["snippet"]["publishedAt"].replace("Z","+00:00")) for i in items],reverse=True)
    vids=[i["snippet"]["resourceId"]["videoId"] for i in items]
    views=[]
    if vids:
        vd=get("videos",part="statistics",id=",".join(vids[:50]),maxResults=50)
        views=[int(x.get("statistics",{}).get("viewCount",0) or 0) for x in vd.get("items",[])]
    last=(now-dates[0]).days if dates else None
    span=((dates[0]-dates[-1]).days/max(len(dates)-1,1)) if len(dates)>1 else None
    out[h]={"title":sn["title"],"subs":subs,"total_views":tv,
            "video_count":int(st.get("videoCount",0) or 0),
            "created":sn.get("publishedAt",""),"country":sn.get("country",""),
            "days_since_last_upload":last,"avg_days_between_uploads":round(span,1) if span else None,
            "median_views_last25":statistics.median(views) if views else 0,
            "views_per_sub_recent":round(statistics.median(views)/subs,4) if views and subs else 0}
    print(f"{sn['title'][:16]:16s} {subs:10,d} {out[h]['video_count']:6d} {tv:13,d} "
          f"{(statistics.median(views)/subs if views and subs else 0):10.3f}  "
          f"последняя загрузка {last} дн назад, медиана свежих {statistics.median(views) if views else 0:,.0f}")
json.dump(out,open("ota-audit/raw/ota-own-channels.json","w"),ensure_ascii=False,indent=1)

"""Второй заход по хэндлам. Поиск по названию подсунул чужие каналы
(mingjai14 вместо Klook, ATG Tickets вместо Tiqets) — такие записи
удаляем, а не оставляем как «примерно похоже»."""
import json,os,urllib.parse,urllib.request,time
KEY=json.load(open(os.path.expanduser("~/.config/claude-seo/google-api.json")))["api_key"]
API="https://www.googleapis.com/youtube/v3/"
def get(ep,**p):
    p["key"]=KEY
    r=urllib.request.Request(API+ep+"?"+urllib.parse.urlencode(p),headers={"User-Agent":"sbexcursion-audit/1.0"})
    with urllib.request.urlopen(r,timeout=40) as f: return json.load(f)

out=json.load(open("ota-audit/raw/ota-own-channels.json"))
for b in ["klook","tiqets"]: out.pop(b,None)

CANDIDATES={"klook":["KlookTravel","klooktravel","Klook_official","KlookHK"],
            "tiqets":["tiqets","TiqetsCom","Tiqetsofficial"]}
for brand,hs in CANDIDATES.items():
    for h in hs:
        try: d=get("channels",part="snippet,statistics",forHandle=h)
        except Exception: continue
        if not d.get("items"): continue
        it=d["items"][0]; st=it["statistics"]; sn=it["snippet"]
        if brand not in sn["title"].lower().replace(" ",""): continue
        out[brand]={"title":sn["title"],"subs":int(st.get("subscriberCount",0) or 0),
                    "total_views":int(st.get("viewCount",0) or 0),
                    "video_count":int(st.get("videoCount",0) or 0),
                    "created":sn.get("publishedAt",""),"country":sn.get("country",""),
                    "handle":h}
        print(f"{brand}: найден @{h} — {sn['title']}, подпис {out[brand]['subs']:,}, "
              f"просм {out[brand]['total_views']:,}")
        break
    else:
        print(f"{brand}: канал достоверно не определён — в отчёт пойдёт «нет данных»")
        out[brand]={"note":"канал достоверно не определён, данных нет"}
json.dump(out,open("ota-audit/raw/ota-own-channels.json","w"),ensure_ascii=False,indent=1)

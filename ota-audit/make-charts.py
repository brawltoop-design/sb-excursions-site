# -*- coding: utf-8 -*-
"""Графики к аудиту OTA. Рисуем SVG руками: matplotlib в системе нет,
а Notion принимает SVG как вложение и показывает его картинкой.

Фон задаём явно светлым: у картинки с прозрачным фоном и тёмным текстом
в ночной теме Notion пропадают подписи.
"""
import json, io, math, os, collections, statistics, datetime

OUT = "ota-audit/charts"
RAW = "ota-audit/raw"
BG, INK, MUTED, GRID = "#FFFFFF", "#1F2328", "#6B7280", "#E5E7EB"
ACCENT = "#C2410C"     # наш цвет — оператор
COOL   = "#1D4ED8"     # авторы
WARN   = "#B45309"     # аффилиаты
DIM    = "#9CA3AF"     # прочее
OTA    = "#7C3AED"     # сами OTA
FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

def esc(s):
    return (str(s).replace("&","&amp;").replace("<","&lt;").replace(">","&gt;"))

def head(w,h,title,sub=""):
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" font-family="{FONT}">']
    s.append(f'<rect width="{w}" height="{h}" fill="{BG}"/>')
    s.append(f'<text x="32" y="42" font-size="20" font-weight="700" fill="{INK}">{esc(title)}</text>')
    if sub: s.append(f'<text x="32" y="66" font-size="13" fill="{MUTED}">{esc(sub)}</text>')
    return s

def foot(s,w,h,note):
    s.append(f'<text x="32" y="{h-16}" font-size="11" fill="{MUTED}">{esc(note)}</text>')
    s.append("</svg>")
    return "\n".join(s)

def save(name, svg):
    io.open(f"{OUT}/{name}", "w", encoding="utf8").write(svg)
    print(f"  {name}  {len(svg)//1024} КБ")

rows=json.load(io.open(f"{RAW}/yt-search-classified.json",encoding="utf8"))
ch=json.load(io.open(f"{RAW}/yt-channels.json",encoding="utf8"))
vids=json.load(io.open(f"{RAW}/yt-videos.json",encoding="utf8"))
own=json.load(io.open(f"{RAW}/ota-own-channels.json",encoding="utf8"))
gaps=json.load(io.open(f"{RAW}/query-gaps.json",encoding="utf8"))

RU={"CREATOR_INDEPENDENT":"Независимые авторы","CREATOR_OTA_AFFILIATE":"Авторы с партнёркой OTA",
    "CREATOR_MENTIONS_OTA":"Упоминают OTA без метки","LOCAL_OPERATOR":"Местные операторы",
    "OTA_OWN":"Свои каналы OTA","LOCAL_OPERATOR_AFFILIATE":"Оператор с партнёркой"}
COL={"CREATOR_INDEPENDENT":COOL,"CREATOR_OTA_AFFILIATE":WARN,"CREATOR_MENTIONS_OTA":DIM,
     "LOCAL_OPERATOR":ACCENT,"OTA_OWN":OTA,"LOCAL_OPERATOR_AFFILIATE":ACCENT}

# ── 1. Слоты против внимания ────────────────────────────────────────────
slots=collections.Counter(r["owner"] for r in rows)
uniq={}
for r in rows: uniq.setdefault(r["video_id"],r)
views=collections.Counter()
for v,r in uniq.items():
    if v in vids: views[r["owner"]]+=vids[v]["views"]
tv=sum(views.values()); ts=sum(slots.values())
order=["CREATOR_INDEPENDENT","CREATOR_OTA_AFFILIATE","CREATOR_MENTIONS_OTA","LOCAL_OPERATOR","OTA_OWN"]

W,H=980,470
s=head(W,H,"Кто держит верх выдачи YouTube по Бали",
       "40 запросов · топ-20 по каждому · 800 слотов · 136 млн просмотров · 29.08.2026")
x0,y0,bw,gap=330,104,520,58
s.append(f'<text x="{x0}" y="{y0-14}" font-size="11" fill="{MUTED}">доля слотов ▬  доля просмотров ▬</text>')
for i,k in enumerate(order):
    y=y0+i*gap
    ps=slots[k]/ts; pv=views[k]/tv
    s.append(f'<text x="316" y="{y+14}" font-size="13" fill="{INK}" text-anchor="end">{esc(RU[k])}</text>')
    s.append(f'<rect x="{x0}" y="{y+2}" width="{max(bw*ps,1.5):.1f}" height="15" rx="2" fill="{COL[k]}"/>')
    s.append(f'<rect x="{x0}" y="{y+21}" width="{max(bw*pv,1.5):.1f}" height="15" rx="2" fill="{COL[k]}" opacity="0.45"/>')
    s.append(f'<text x="{x0+max(bw*ps,1.5)+8}" y="{y+14}" font-size="12" font-weight="600" fill="{INK}">{ps*100:.1f}%</text>')
    lab=f"{pv*100:.1f}%" if pv>=0.001 else f"{pv*100:.3f}%"
    s.append(f'<text x="{x0+max(bw*pv,1.5)+8}" y="{y+33}" font-size="12" fill="{MUTED}">{lab}</text>')
s.append(f'<rect x="{x0}" y="{y0+4*gap+52}" width="{bw}" height="1" fill="{GRID}"/>')
s.append(f'<text x="32" y="{H-44}" font-size="13" font-weight="600" fill="{ACCENT}">Собственные каналы OTA: 4 слота из 800 и 0,011% всего внимания.</text>')
save("01-kto-derzhit-vydachu.svg", foot(s,W,H,"Источник: YouTube Data API v3, срез 29.08.2026, regionCode=US, relevanceLanguage=en"))

# ── 2. Реклама ──────────────────────────────────────────────────────────
ADS=[("GetYourGuide","Германия",500000,400000),("GetYourGuide","США",200000,100000),
     ("GetYourGuide","Индонезия",30000,20000),("Viator","США",20000,3000),
     ("Klook","Индонезия",8000,4000)]
W,H=980,430
s=head(W,H,"Сколько рекламных креативов крутят OTA",
       "Google Ads Transparency Center · активные креативы · 29.08.2026")
mx=500000; x0,bw=330,520; y0,gap=110,62
s.append(f'<text x="{x0}" y="{y0-14}" font-size="11" fill="{MUTED}">всего ▬  из них на YouTube ▬</text>')
for i,(b,reg,tot,yt) in enumerate(ADS):
    y=y0+i*gap
    s.append(f'<text x="316" y="{y+13}" font-size="13" fill="{INK}" text-anchor="end">{esc(b)}</text>')
    s.append(f'<text x="316" y="{y+29}" font-size="11" fill="{MUTED}" text-anchor="end">{esc(reg)}</text>')
    s.append(f'<rect x="{x0}" y="{y}" width="{max(bw*tot/mx,2):.1f}" height="14" rx="2" fill="{DIM}"/>')
    s.append(f'<rect x="{x0}" y="{y+17}" width="{max(bw*yt/mx,2):.1f}" height="14" rx="2" fill="{OTA}"/>')
    s.append(f'<text x="{x0+max(bw*tot/mx,2)+8}" y="{y+11}" font-size="11" fill="{MUTED}">{tot//1000} тыс.</text>')
    s.append(f'<text x="{x0+max(bw*yt/mx,2)+8}" y="{y+28}" font-size="12" font-weight="600" fill="{INK}">{yt//1000} тыс. на YouTube</text>')
s.append(f'<text x="32" y="{H-44}" font-size="13" font-weight="600" fill="{ACCENT}">В Германии у GetYourGuide 400 000 креативов — 80% всей их рекламы там на YouTube.</text>')
save("02-reklama-ota.svg", foot(s,W,H,"Google округляет: показывает «примерно N тыс.». Это число креативов, не бюджет."))

# ── 3. Просмотров на подписчика ─────────────────────────────────────────
rat=collections.defaultdict(list)
for v,r in uniq.items():
    c=ch.get(r["channel_id"],{})
    if v in vids and c.get("subscribers",0)>100:
        rat[r["owner"]].append(vids[v]["views"]/c["subscribers"])
med={k:statistics.median(v) for k,v in rat.items() if len(v)>=2}
srt=sorted(med.items(),key=lambda x:-x[1])
# Высоту считаем от числа категорий: при шести строках фиксированные 400 px
# наезжали подписями на сноску внизу.
y0,gap=110,52
W,H=980,y0+len(srt)*gap+96
s=head(W,H,"Чей контент алгоритм разносит дальше своей аудитории",
       "медиана просмотров на одного подписчика канала")
mx=max(med.values()); x0,bw=330,470
for i,(k,val) in enumerate(srt):
    y=y0+i*gap
    s.append(f'<text x="316" y="{y+18}" font-size="13" fill="{INK}" text-anchor="end">{esc(RU.get(k,k))}</text>')
    s.append(f'<rect x="{x0}" y="{y}" width="{max(bw*val/mx,2):.1f}" height="24" rx="3" fill="{COL.get(k,DIM)}"/>')
    s.append(f'<text x="{x0+max(bw*val/mx,2)+10}" y="{y+17}" font-size="14" font-weight="700" fill="{INK}">{val:.2f}</text>')
    s.append(f'<text x="{x0+max(bw*val/mx,2)+52}" y="{y+17}" font-size="11" fill="{MUTED}">n={len(rat[k])}</text>')
s.append(f'<text x="32" y="{H-44}" font-size="13" font-weight="600" fill="{ACCENT}">Контент операторов разносит в 3,6 раза лучше блогерского. Операторов в выдаче 13 из 436.</text>')
save("03-prosmotry-na-podpischika.svg", foot(s,W,H,"Каналы с числом подписчиков меньше 100 исключены, чтобы не ловить выбросы"))

# ── 4. Карта возможностей ───────────────────────────────────────────────
W,H=980,600
s=head(W,H,"Карта свободных запросов",
       "чем выше — тем больше внимания, чем левее — тем ниже порог входа")
L,R,T,B=110,930,110,510
s.append(f'<rect x="{L}" y="{T}" width="{R-L}" height="{B-T}" fill="none" stroke="{GRID}"/>')
def lx(v): 
    a,b=math.log10(500),math.log10(300000)
    return L+(R-L)*(math.log10(max(v,500))-a)/(b-a)
def ly(v):
    a,b=math.log10(50000),math.log10(30000000)
    return B-(B-T)*(math.log10(max(v,50000))-a)/(b-a)
for tick in [1000,10000,100000]:
    x=lx(tick); s.append(f'<line x1="{x:.0f}" y1="{T}" x2="{x:.0f}" y2="{B}" stroke="{GRID}"/>')
    s.append(f'<text x="{x:.0f}" y="{B+20}" font-size="11" fill="{MUTED}" text-anchor="middle">{tick//1000 if tick>=1000 else tick} тыс. подписчиков</text>')
for tick in [100000,1000000,10000000]:
    y=ly(tick); s.append(f'<line x1="{L}" y1="{y:.0f}" x2="{R}" y2="{y:.0f}" stroke="{GRID}"/>')
    lab="100 тыс." if tick==100000 else ("1 млн" if tick==1000000 else "10 млн")
    s.append(f'<text x="{L-10}" y="{y+4:.0f}" font-size="11" fill="{MUTED}" text-anchor="end">{lab}</text>')
LABEL={"bali swing":"качели","bali airport transfer":"трансфер\nиз аэропорта",
       "uluwatu kecak dance":"кечак","mount batur trekking price":"цена Батура",
       "ayung river rafting bali":"рафтинг Аюнг","manta rays nusa penida snorkeling":"манты",
       "bali private driver cost per day":"цена водителя","besakih temple bali":"Бесаких",
       "sekumpul waterfall":"Секумпул","tegallalang rice terrace":"Тегаллаланг"}
for g in gaps:
    x,y=lx(g["медиана_подписчиков"]),ly(g["просмотры_топ20"])
    free=g["слотов_у_продавцов"]==0
    col=ACCENT if g["запрос"] in LABEL else (COOL if free else DIM)
    r_=7 if g["запрос"] in LABEL else 4.5
    s.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r_}" fill="{col}" opacity="{0.95 if g["запрос"] in LABEL else 0.42}"/>')
    if g["запрос"] in LABEL:
        for j,part in enumerate(LABEL[g["запрос"]].split("\n")):
            s.append(f'<text x="{x+11:.0f}" y="{y+4+j*13:.0f}" font-size="11" font-weight="600" fill="{INK}">{esc(part)}</text>')
s.append(f'<circle cx="150" cy="548" r="6" fill="{ACCENT}"/><text x="164" y="552" font-size="12" fill="{INK}">наши цели</text>')
s.append(f'<circle cx="300" cy="548" r="5" fill="{COOL}" opacity="0.5"/><text x="314" y="552" font-size="12" fill="{INK}">продавцов в топ-20 нет</text>')
s.append(f'<circle cx="530" cy="548" r="5" fill="{DIM}" opacity="0.5"/><text x="544" y="552" font-size="12" fill="{INK}">продавцы есть</text>')
s.append(f'<text x="32" y="{H-16}" font-size="11" fill="{MUTED}">Обе оси логарифмические. 24 запроса из 40 не содержат в топ-20 ни одного продавца.</text>')
s.append("</svg>")
save("04-karta-vozmozhnostey.svg","\n".join(s))

# ── 5. Каналы OTA как витрина рекламы ──────────────────────────────────
items=[(d["title"],d["total_views"],d["subs"]) for d in own.values() if d.get("subs")]
items=sorted(items,key=lambda x:-(x[1]/max(x[2],1)))[:9]
W,H=980,470
s=head(W,H,"Каналы OTA — витрина открутки, а не аудитория",
       "просмотров за всю жизнь канала на одного подписчика")
mx=max(v/max(sub,1) for _,v,sub in items); x0,bw=290,480; y0,gap=104,40
for i,(t,v,sub) in enumerate(items):
    y=y0+i*gap; val=v/max(sub,1)
    ad=val>1000
    s.append(f'<text x="276" y="{y+16}" font-size="13" fill="{INK}" text-anchor="end">{esc(t[:22])}</text>')
    s.append(f'<rect x="{x0}" y="{y}" width="{max(bw*val/mx,2):.1f}" height="21" rx="3" fill="{OTA if ad else DIM}" opacity="{0.9 if ad else 0.55}"/>')
    s.append(f'<text x="{x0+max(bw*val/mx,2)+10}" y="{y+16}" font-size="12" font-weight="{700 if ad else 400}" fill="{INK}">{val:,.0f}</text>'.replace(",", " "))
s.append(f'<text x="32" y="{H-44}" font-size="13" font-weight="600" fill="{ACCENT}">У обычного контентного канала это 50–300. Двадцать тысяч означают, что просмотры куплены.</text>')
save("05-kanaly-ota-vitrina.svg", foot(s,W,H,"Civitatis: 248 млн просмотров при 11 600 подписчиков. Источник: YouTube Data API v3"))
print("готово")

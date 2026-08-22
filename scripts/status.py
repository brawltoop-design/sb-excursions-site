#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Состояние сайта одной командой.

    python3 scripts/status.py                # быстро: поиск и цены
    python3 scripts/status.py --index        # плюс проверка индексации, 60 адресов
    python3 scripts/status.py --index 150    # больше выборка, дольше

Зачем это, а не обычный краулер. Краулер обходит наш сайт и ищет наши же
ошибки — а их ловит сборка. Здесь другое: что об этом сайте думает Google.
Показы и позиции, а главное — дошёл ли обход до того, что мы выложили.
Именно так выяснилось, что сто немецких страниц лежат необойдёнными: по
файлам и карте сайта всё в порядке, а Google про них не знает.

Инспектор URL ограничен 2000 запросов в сутки, поэтому проверяется выборка,
равномерно растянутая по карте сайта, а не всё подряд.
"""
import warnings
warnings.filterwarnings("ignore")          # google-auth ругается на python 3.9, к делу не относится
import sys, os, re, json, datetime as dt, collections, random
CRED = os.path.expanduser("~/.config/claude-seo/service_account.json")
SITE = "https://www.sbexcursion.com/"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def die(msg): print(f"\n  ✗ {msg}"); sys.exit(1)
try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
except ImportError:
    die("нет библиотек. Поставь:  pip3 install --user google-auth google-api-python-client")
if not os.path.exists(CRED): die(f"нет ключа доступа: {CRED}")

def api(scope):
    c = service_account.Credentials.from_service_account_file(CRED, scopes=[scope])
    return build("searchconsole", "v1", credentials=c, cache_discovery=False)
RO = api("https://www.googleapis.com/auth/webmasters.readonly")
D = lambda n: (dt.date.today() - dt.timedelta(days=n)).isoformat()

def sa(dims, a, b, rows=25000, flt=None):
    body = {"startDate": D(b), "endDate": D(a), "dimensions": dims, "rowLimit": rows}
    if flt: body["dimensionFilterGroups"] = [{"filters": flt}]
    return RO.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])
def tot(rows):
    i = sum(r["impressions"] for r in rows); c = sum(r["clicks"] for r in rows)
    return c, i, (c/i*100 if i else 0), (sum(r["position"]*r["impressions"] for r in rows)/i if i else 0)
def bar(n, mx, w=28):
    return "█" * max(1, round(n/mx*w)) if n and mx else ""

def h(t): print(f"\n{'─'*72}\n  {t}\n{'─'*72}")

# ── 1. ПОИСК ─────────────────────────────────────────────────────────────
h("ПОИСК: 28 дней против предыдущих 28")
cur, prev = sa(["date"], 3, 31, 200), sa(["date"], 31, 59, 200)
a, b = tot(cur), tot(prev)
for lbl, x, y, fmt in [("клики", a[0], b[0], "{:.0f}"), ("показы", a[1], b[1], "{:.0f}"),
                       ("CTR, %", a[2], b[2], "{:.2f}"), ("позиция", a[3], b[3], "{:.1f}")]:
    d = f"{(x-y)/y*100:+.0f}%" if y else "—"
    mark = "" if lbl != "позиция" else ("  лучше" if x < y else "  хуже")
    print(f"   {lbl:9} {fmt.format(x):>9}   было {fmt.format(y):>9}   {d}{mark}")

h("ПО НЕДЕЛЯМ")
days = sorted(sa(["date"], 3, 59, 200), key=lambda r: r["keys"][0])
weeks = [days[i:i+7] for i in range(0, len(days), 7)]
mx = max((sum(r["clicks"] for r in w) for w in weeks if w), default=1)
for w in weeks:
    if not w: continue
    cl = sum(r["clicks"] for r in w); im = sum(r["impressions"] for r in w)
    print(f"   {w[0]['keys'][0][5:]}–{w[-1]['keys'][0][5:]}  {cl:>4} кл {im:>6} пок  {bar(cl, mx)}")

pages = sa(["page"], 3, 31)
h(f"СТРАНИЦЫ: {len(pages)} приносят показы")
kinds, kc, langs, lc = collections.Counter(), collections.Counter(), collections.Counter(), collections.Counter()
for r in pages:
    u = r["keys"][0].replace(SITE[:-1], "")
    k = "туры" if "/tours/" in u else "журнал" if "/journal/" in u else "прочее"
    kinds[k] += r["impressions"]; kc[k] += r["clicks"]
    m = re.match(r"^/bali/([a-z]{2})/", u); L = m.group(1) if m else "—"
    langs[L] += r["impressions"]; lc[L] += r["clicks"]
for k, v in kinds.most_common(): print(f"   {k:8} показов {v:>7}  кликов {kc[k]:>4}")
print("\n   по языкам (CTR — вот что важно):")
for k, v in langs.most_common():
    print(f"     {k:4} показов {v:>7}  кликов {lc[k]:>4}   CTR {lc[k]/v*100 if v else 0:>5.2f}%")
buckets = collections.Counter()
for r in pages:
    p = r["position"]
    buckets["1-3" if p <= 3 else "4-10" if p <= 10 else "11-20" if p <= 20 else "21-50" if p <= 50 else "50+"] += 1
print("\n   позиции:", "  ".join(f"{k}: {buckets[k]}" for k in ["1-3", "4-10", "11-20", "21-50", "50+"]))

h("БОЛЬШЕ ВСЕГО ПОКАЗОВ БЕЗ ЕДИНОГО КЛИКА")
print("   это либо заголовок не цепляет, либо запрос не наш — проверяй по очереди\n")
for r in sorted([r for r in pages if r["clicks"] == 0], key=lambda x: -x["impressions"])[:8]:
    print(f"   {r['impressions']:>5}п  поз {r['position']:>5.1f}   {r['keys'][0].replace(SITE[:-1],'')[:56]}")

h("ЗАПРОСЫ НА ПОДХОДЕ: позиция 5–15, есть показы")
qs = sa(["query"], 3, 31, 5000)
near = [r for r in qs if 5 <= r["position"] <= 15 and r["impressions"] >= 8]
for r in sorted(near, key=lambda x: -x["impressions"])[:12]:
    print(f"   {r['impressions']:>5}п {r['clicks']:>3}кл  поз {r['position']:>5.1f}   {r['keys'][0][:48]}")
if not near: print("   пока нет")

# ── 2. ИНДЕКСАЦИЯ ────────────────────────────────────────────────────────
if "--index" in sys.argv:
    n = 60
    i = sys.argv.index("--index")
    if len(sys.argv) > i+1 and sys.argv[i+1].isdigit(): n = int(sys.argv[i+1])
    h(f"ИНДЕКСАЦИЯ: выборка {n} адресов из карты сайта")
    print("   долго, примерно секунда на адрес\n")
    RW = api("https://www.googleapis.com/auth/webmasters")
    sm = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
    locs = re.findall(r"<loc>([^<]+)</loc>", sm)
    step = max(1, len(locs)//n)
    sample = locs[::step][:n]
    res = collections.Counter(); by_lang = collections.defaultdict(collections.Counter); bad = []
    for j, u in enumerate(sample, 1):
        try:
            r = RW.urlInspection().index().inspect(body={"inspectionUrl": u, "siteUrl": SITE}).execute()
            st = r["inspectionResult"]["indexStatusResult"].get("coverageState", "?")
        except Exception as e:
            st = "ошибка запроса"
        res[st] += 1
        m = re.search(r"/bali/([a-z]{2})/", u); by_lang[m.group(1) if m else "—"][st] += 1
        if "indexed" not in st.lower() or "not indexed" in st.lower():
            if len(bad) < 12: bad.append((u.replace(SITE[:-1], ""), st))
        if j % 10 == 0: print(f"     проверено {j}/{len(sample)}", flush=True)
    print()
    for k, v in res.most_common():
        print(f"   {v:>4}  {k}")
    print("\n   по языкам:")
    for L in sorted(by_lang):
        c = by_lang[L]; ok = sum(v for k, v in c.items() if k == "Submitted and indexed")
        print(f"     {L:4} в индексе {ok:>3} из {sum(c.values()):>3}")
    if bad:
        print("\n   не в индексе (примеры):")
        for u, st in bad: print(f"     {st[:34]:36} {u[:44]}")

# ── 3. ЦЕНЫ ──────────────────────────────────────────────────────────────
h("ЦЕНЫ: сайт против книги поставщиков")
book = None
for p in ["~/Downloads/SB-Excursions-postavshiki.xlsx",
          "~/Desktop/SB Excursions/SB Bali1/SB-Excursions-postavshiki.xlsx"]:
    p = os.path.expanduser(p)
    if os.path.exists(p): book = p; break
if not book:
    print("   книга не найдена — положи SB-Excursions-postavshiki.xlsx в Загрузки")
else:
    try:
        import openpyxl
        wb = openpyxl.load_workbook(book, data_only=True)
        gen = open(os.path.join(ROOT, "scripts/generate-bali-tour-pages.mjs"), encoding="utf-8").read()
        site = {}
        for m in re.finditer(r'\n    slug: "([a-z0-9-]+)",', gen):
            w = gen[m.start():m.start()+3000]
            pr = re.search(r'\n    price: "[^"$]*\$(\d+)', w)
            ti = re.search(r'\n    title: "([^"]+)"', w)
            if pr and ti: site[ti.group(1).strip()] = int(pr.group(1))
        found = diff = 0
        for ws in wb.worksheets:
            for row in ws.iter_rows(values_only=True):
                cells = [c for c in row if c is not None]
                if len(cells) < 2: continue
                name = str(cells[0]).strip()
                for t, sp in site.items():
                    if name and (name.lower() in t.lower() or t.lower() in name.lower()) and len(name) > 8:
                        nums = [c for c in cells[1:] if isinstance(c, (int, float)) and 5 <= c <= 400]
                        if not nums: continue
                        found += 1
                        if not any(abs(x - sp) < 0.5 for x in nums):
                            diff += 1
                            print(f"   {t[:38]:40} сайт ${sp:<5} книга {', '.join(f'${x:.0f}' for x in nums[:3])}")
                        break
        print(f"\n   сверено позиций {found}, расхождений {diff}" if found else "   совпадений по названиям не нашлось")
    except Exception as e:
        print(f"   не смог прочитать книгу: {str(e)[:90]}")

# ── 4. ВНЕШНИЕ ПРОФИЛИ ───────────────────────────────────────────────────
h("ВНЕШНИЕ ПРОФИЛИ ИЗ РАЗМЕТКИ (sameAs)")
print("   мёртвая ссылка тут работает против сайта — так было с Викидатой\n")
import urllib.request
gen = open(os.path.join(ROOT, "scripts/site-identity.mjs"), encoding="utf-8").read()
block = re.search(r"sameAs:\s*\[(.*?)\]", gen, re.S)
for u in re.findall(r'"(https?://[^"]+)"', block.group(1) if block else ""):
    try:
        rq = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
        code = urllib.request.urlopen(rq, timeout=15).status
        note = "живой"
    except Exception as e:
        code = getattr(e, "code", "—")
        note = "антибот, проверь браузером" if code in (403, 405, 429) else "ПРОВЕРЬ, похоже мёртвая"
    print(f"   {str(code):>4}  {note:30} {u[:52]}")

print(f"\n{'─'*72}\n  готово · {dt.datetime.now().strftime('%d.%m.%Y %H:%M')}\n")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Состояние сайта одной командой.

    python3 scripts/status.py                # быстро: поиск и цены
    python3 scripts/status.py --index        # плюс проверка индексации, 60 адресов
    python3 scripts/status.py --index 150    # больше выборка, дольше
    python3 scripts/status.py --targets      # куда писать дальше: три корзины

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
h("ПОИСК: последние 7 дней против предыдущих 7")
print("   по неделям, а не по месяцу: месячное среднее размазывает рост\n")
cur, prev = sa(["date"], 3, 10, 50), sa(["date"], 10, 17, 50)
a, b = tot(cur), tot(prev)
for lbl, x, y, fmt in [("клики", a[0], b[0], "{:.0f}"), ("показы", a[1], b[1], "{:.0f}"),
                       ("CTR, %", a[2], b[2], "{:.2f}"), ("позиция", a[3], b[3], "{:.1f}")]:
    d = f"{(x-y)/y*100:+.0f}%" if y else "—"
    mark = "" if lbl != "позиция" else ("  лучше" if x < y else "  хуже")
    print(f"   {lbl:9} {fmt.format(x):>9}   было {fmt.format(y):>9}   {d}{mark}")

h("ПО НЕДЕЛЯМ ЗА ДВА МЕСЯЦА")
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

# ── 1б. ЦЕЛИ: ТРИ КОРЗИНЫ ────────────────────────────────────────────────
# Зачем отдельным флагом. Обычный отчёт показывает, что есть. Этот раздел
# отвечает на другой вопрос: во что вкладывать следующий час работы.
#
# Главное, что здесь учтено и чего не видно в интерфейсе Search Console:
# на уровне запросов Google прячет большую часть данных (у нас видно около
# четверти показов и десятую часть кликов — остальное «анонимные запросы»).
# Поэтому корзины считаются по СТРАНИЦАМ, где данные полные, а запросы
# нужны только чтобы понять, чего от страницы хотят.
#
# Второе: позиция сама по себе ничего не решает. Запрос с числовым ответом
# («сколько стоит водитель») закрывается ответом Google прямо в выдаче, и
# клика не будет ни с пятой позиции, ни с первой. Запрос, требующий
# суждения («стоит ли ехать на Нусу Пениду»), одной строкой не закрывается.
# Разница по нашим же данным при равных позициях — впятеро по CTR.
if "--targets" in sys.argv:
    h("ЦЕЛИ: куда писать дальше")

    QD = 93          # окно: квартал, чтобы сгладить недельные скачки
    def q(dims, rows=25000):
        return sa(dims, 3, QD, rows)

    pages, queries, qpairs = q(["page"]), q(["query"]), q(["query", "page"])
    p_imp = sum(r["impressions"] for r in pages)
    q_imp = sum(r["impressions"] for r in queries)
    p_cl = sum(r["clicks"] for r in pages)
    q_cl = sum(r["clicks"] for r in queries)
    print(f"   за {QD} дней: показов {p_imp}, кликов {p_cl}")
    print(f"   из них Google раскрывает на уровне запросов: {q_imp} показов ({q_imp/p_imp*100:.0f}%), "
          f"{q_cl} кликов ({q_cl/p_cl*100 if p_cl else 0:.0f}%)")
    print("   остальное — «анонимные запросы», поэтому корзины считаем по страницам\n")

    # статья = один слаг во всех языках сразу: пишем-то мы одну статью
    def slug_of(u):
        u = u.replace(SITE[:-1], "")
        m = re.match(r"^/(?:bali|dubai)/[a-z]{2}/(?:journal|tours|blog)/(.+)$", u)
        return m.group(1) if m else None
    art = collections.defaultdict(lambda: {"imp": 0, "cl": 0, "wpos": 0.0, "tours": False, "dubai": False})
    for r in pages:
        sg = slug_of(r["keys"][0])
        if not sg: continue
        a = art[sg]
        a["imp"] += r["impressions"]; a["cl"] += r["clicks"]
        a["wpos"] += r["position"] * r["impressions"]
        if "/tours/" in r["keys"][0]: a["tours"] = True
        if "/dubai/" in r["keys"][0]: a["dubai"] = True
    for a in art.values():
        a["pos"] = a["wpos"] / a["imp"] if a["imp"] else 0
        a["ctr"] = a["cl"] / a["imp"] * 100 if a["imp"] else 0

    # чего хочет человек, задающий этот запрос
    NUMERIC = re.compile(r"\b(cost|price|prices|how much|cheap|fee|ferry|schedule|timetable|"
                         r"time|times|timings|ticket|tickets|distance|how far|how long|"
                         r"сколько стоит|цена|цены|расписание|билет)\b", re.I)
    JUDGE = re.compile(r"\b(worth it|worth|better|vs|versus|or|safe|should|best|which|"
                       r"стоит ли|лучше|или|безопасно)\b", re.I)
    def intent(qq):
        if NUMERIC.search(qq): return "число"      # ответ помещается в одну строку → его заберёт AI
        if JUDGE.search(qq):   return "суждение"   # одной строкой не закрыть → человек кликает
        return "прочее"

    # какие запросы ведут на страницу и с какой позиции
    by_slug = collections.defaultdict(list)
    for r in qpairs:
        qq, pg = r["keys"]
        sg = slug_of(pg)
        if sg: by_slug[sg].append((qq, r["impressions"], r["position"]))

    # Страницы туров по отдельности до любого порога не дотягивают, и в
    # корзины не попадают вовсе. Это и есть главная новость, поэтому
    # выносим их отдельной строкой, а не прячем за фильтром.
    t_imp = sum(a["imp"] for a in art.values() if a["tours"])
    t_cl = sum(a["cl"] for a in art.values() if a["tours"])
    j_imp = sum(a["imp"] for a in art.values() if not a["tours"] and not a["dubai"])
    j_cl = sum(a["cl"] for a in art.values() if not a["tours"] and not a["dubai"])
    print(f"   страницы туров:  {t_imp:>6} показов, {t_cl:>3} кликов   "
          f"({t_imp/(t_imp+j_imp)*100 if t_imp+j_imp else 0:.1f}% всей видимости)")
    print(f"   журнал:          {j_imp:>6} показов, {j_cl:>3} кликов")
    print("   если первая строка сильно меньше второй — деньги приносит журнал,\n"
          "   а коммерческие страницы в выдаче не участвуют\n")

    MIN_IMP = 150      # ниже этого статья не окупит часа работы
    buckets = {"усиливать": [], "писать новое": [], "не трогать": []}
    for sg, a in art.items():
        if a["imp"] < MIN_IMP or a["dubai"] or a["tours"]: continue
        qs = sorted(by_slug.get(sg, []), key=lambda x: -x[1])
        top = qs[0][0] if qs else ""
        kinds = collections.Counter(intent(x[0]) for x in qs[:8])
        it = kinds.most_common(1)[0][0] if kinds else "прочее"
        row = (a["imp"], a["cl"], a["ctr"], a["pos"], sg, top, it)
        if a["ctr"] >= 1.5:
            continue                                   # уже работает, не цель
        if it == "число":
            buckets["не трогать"].append(row + ("ответ помещается в строку, его забирает AI-ответ",))
        elif a["pos"] > 20:
            buckets["писать новое"].append(row + ("страница есть, но выдача её не считает ответом",))
        elif a["pos"] <= 15:
            buckets["усиливать"].append(row + ("позиция есть, клика нет — вопрос к сниппету и intent",))
        else:
            buckets["писать новое"].append(row + ("между 15 и 20 — дешевле переписать, чем дотягивать",))

    for name, why in [("усиливать", "страница на первой странице выдачи, но клика нет"),
                      ("писать новое", "спрос есть, а нынешняя страница выдачу не устраивает"),
                      ("не трогать", "клика не будет, сколько ни вкладывай")]:
        rows_ = sorted(buckets[name], key=lambda x: -x[0])
        got = sum(r[0] for r in rows_)
        print(f"\n   ── {name.upper()}  ({len(rows_)} статей, {got} показов) — {why}")
        if not rows_:
            print("      пусто")
            continue
        for imp, cl, ctr, pos, sg, top, it, note in rows_[:12]:
            print(f"      {imp:>5}п {cl:>3}кл {ctr:>4.1f}% поз {pos:>5.1f}  {sg[:40]:42} {it}")
            print(f"            запрос: {top[:56]:58} {note}")
        if len(rows_) > 12:
            print(f"      … ещё {len(rows_)-12}, показов {sum(r[0] for r in rows_[12:])}")
    print("\n   ⚠ пометка «прочее» значит, что тип запроса скриптом не опознан —")
    print("     такие строки надо руками посмотреть в выдаче: если там Tripadvisor,")
    print("     hotels.com и Instagram, это «не трогать», как бы ни была хороша позиция")

    # что за тип статьи вообще получает клики — проверка гипотезы на своих данных
    def kind_of(sg):
        if "-vs-" in sg: return "сравнение X vs Y"
        if re.match(r"^(is|are|can|do|does|should)-", sg): return "вопрос да/нет"
        if re.search(r"(^how-much|cost|price)", sg): return "сколько стоит"
        if re.match(r"^(how-to|where|when)-", sg): return "как / где / когда"
        if sg.startswith("best-"): return "подборка best-N"
        if "day-trip" in sg or "transfer" in sg: return "маршрут / трансфер"
        if "things-to-do" in sg or "itinerary" in sg: return "чем заняться"
        return "прочее"
    print("\n   ── ЧТО ВООБЩЕ ПОЛУЧАЕТ КЛИКИ (только статьи с позицией <= 15)")
    print("      если тип внизу списка — на него не стоит тратить следующий час\n")
    kk = collections.defaultdict(lambda: {"imp": 0, "cl": 0, "n": 0})
    for sg, a in art.items():
        if a["pos"] > 15 or a["imp"] < 20: continue
        e = kk[kind_of(sg)]; e["imp"] += a["imp"]; e["cl"] += a["cl"]; e["n"] += 1
    for k, e in sorted(kk.items(), key=lambda x: -x[1]["cl"] / max(1, x[1]["imp"])):
        if e["imp"] < 150: continue
        print(f"      {k:22} {e['n']:>3} шт  {e['imp']:>6}п {e['cl']:>4}кл   CTR {e['cl']/e['imp']*100:>5.2f}%")

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

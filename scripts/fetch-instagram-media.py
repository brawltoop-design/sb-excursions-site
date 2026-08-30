# -*- coding: utf-8 -*-
"""Догрузка фото и видео с Pexels в папки постов для Instagram.

Берём вертикаль: карусель 4:5, рилс 9:16 — горизонтальные кадры там режутся.
Фото качаем в оригинале, видео — самым большим доступным файлом.

Идемпотентно: id уже скачанного запоминаются в _pexels-credits.json каждой
папки, повторный запуск ничего не перекачивает и не берёт один и тот же кадр
в два разных поста.

Осторожно с лимитом: бесплатный ключ Pexels даёт 200 запросов в час,
поэтому между запросами пауза, а число запросов на пост ограничено.
"""
import json, io, os, sys, time, urllib.request, urllib.parse, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACK = os.path.join(ROOT, "instagram-pack")
KEY = json.load(io.open(os.path.expanduser("~/.config/claude-seo/pexels.json"), encoding="utf8"))["pexels_key"]
# Дефолтный User-Agent питона Pexels отдаёт 403 — проверено. Ставим свой.
UA = "sbexcursion-media/1.0 (+https://www.sbexcursion.com)"

PHOTOS_PER_POST = int(os.environ.get("PHOTOS", "6"))
VIDEOS_PER_POST = int(os.environ.get("VIDEOS", "2"))

QUERIES = {
 "airport-arrival-costs":      (["Bali airport terminal", "airport arrivals hall night", "taxi airport asia"], ["airport terminal travel"]),
 "ayung-rafting-halfday":      (["white water rafting river", "rafting jungle river helmet", "river rapids tropical"], ["white water rafting"]),
 "bali-temple-etiquette":      (["Bali temple sarong", "Balinese temple ceremony", "Bali temple gate stone"], ["Bali temple"]),
 "batur-jeep-sunrise":         (["Mount Batur sunrise Bali", "volcano sunrise above clouds", "jeep volcano offroad"], ["volcano sunrise", "jeep offroad"]),
 "batur-sunrise-cost":         (["Mount Batur Bali", "Kintamani Bali volcano lake", "Bali volcano sunrise hiker"], ["Mount Batur Bali"]),
 "before-you-fly-bali":        (["Bali airport Denpasar", "Bali temple gate entrance", "Indonesia travel arrival", "Bali welcome sign"], ["Bali airport"]),
 "driver-day-price":           (["Bali road traffic scooter", "Indonesia countryside road", "Bali rice field road drive"], ["Bali road driving"]),
 "gili-day":                   (["Gili Trawangan Indonesia", "Lombok island beach", "Indonesia island boat harbour"], ["Indonesia island beach"]),
 "instagram-vs-reality":       (["Bali swing jungle rice", "Bali tourists temple crowd", "Nusa Penida tourist viewpoint"], ["Bali swing jungle"]),
 "manta-point-nusa-penida":    (["manta ray", "giant manta ray ocean", "manta ray diver"], ["manta ray"]),
 "money-in-bali":              (["Indonesian rupiah cash", "ATM machine street", "market payment cash asia"], ["counting money cash"]),
 "penida-west-four-stops":     (["Kelingking Beach Nusa Penida", "Nusa Penida cliff ocean", "Broken Beach Nusa Penida"], ["Nusa Penida cliff"]),
 "private-driver":             (["Bali road palm trees drive", "Indonesia road motorbike traffic", "Bali countryside road"], ["Bali road"]),
 "six-balinese-dishes":        (["Indonesian food plate", "satay grilled skewers", "Balinese cuisine warung"], ["indonesian food cooking"]),
 "sumbawa-whale-shark":        (["whale shark underwater", "snorkeling with big fish", "whale shark ocean"], ["whale shark"]),
 "tanah-lot-bedugul":          (["Tanah Lot temple Bali", "Ulun Danu Beratan temple lake", "Bali temple sunset sea"], ["Bali temple sunset"]),
 "ubud-highlights-22-tickets": (["Tegalalang rice terrace Bali", "Ubud monkey forest macaque", "Bali rice field green"], ["rice terrace Bali"]),
 "uluwatu-kecak-fire-sunset":  (["Uluwatu temple Bali cliff", "kecak fire dance Bali", "Bali cliff sunset ocean"], ["Bali cliff sunset"]),
}

def api(url):
    req = urllib.request.Request(url, headers={"Authorization": KEY, "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)

def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=180) as r, io.open(dest, "wb") as f:
        while True:
            chunk = r.read(1 << 16)
            if not chunk:
                break
            f.write(chunk)
    return os.path.getsize(dest)

# что уже взято — чтобы один кадр не попал в два поста
taken = set()
for d in os.listdir(PACK) if os.path.isdir(PACK) else []:
    cp = os.path.join(PACK, d, "_pexels-credits.json")
    if os.path.isfile(cp):
        for rec in json.load(io.open(cp, encoding="utf8")):
            taken.add((rec["kind"], rec["id"]))
print(f"уже скачано ранее: {len(taken)}")

only = sys.argv[1:] or None
total_p = total_v = 0
for slug, (pq, vq) in QUERIES.items():
    if only and slug not in only:
        continue
    folder = os.path.join(PACK, slug)
    if not os.path.isdir(folder):
        print(f"  ! папки нет: {slug}")
        continue
    cpath = os.path.join(folder, "_pexels-credits.json")
    credits = json.load(io.open(cpath, encoding="utf8")) if os.path.isfile(cpath) else []
    have_p = sum(1 for c in credits if c["kind"] == "photo")
    have_v = sum(1 for c in credits if c["kind"] == "video")
    got_p = got_v = 0

    for q in pq:
        if have_p + got_p >= PHOTOS_PER_POST:
            break
        try:
            d = api("https://api.pexels.com/v1/search?" + urllib.parse.urlencode(
                {"query": q, "per_page": 12, "orientation": "portrait", "size": "large"}))
        except Exception as e:
            print(f"  ! {slug} «{q}»: {e}"); time.sleep(2); continue
        for p in d.get("photos", []):
            if have_p + got_p >= PHOTOS_PER_POST:
                break
            if ("photo", p["id"]) in taken:
                continue
            name = f"extra-{have_p + got_p + 1:02d}-pexels-{p['id']}.jpg"
            try:
                size = download(p["src"]["original"], os.path.join(folder, name))
            except Exception as e:
                print(f"  ! скачивание {p['id']}: {e}"); continue
            credits.append({"kind": "photo", "id": p["id"], "file": name,
                            "author": p["photographer"], "url": p["url"],
                            "px": f"{p['width']}x{p['height']}", "query": q})
            taken.add(("photo", p["id"])); got_p += 1; total_p += 1
        time.sleep(0.7)

    for q in vq:
        if have_v + got_v >= VIDEOS_PER_POST:
            break
        try:
            d = api("https://api.pexels.com/videos/search?" + urllib.parse.urlencode(
                {"query": q, "per_page": 10, "orientation": "portrait"}))
        except Exception as e:
            print(f"  ! {slug} видео «{q}»: {e}"); time.sleep(2); continue
        for v in d.get("videos", []):
            if have_v + got_v >= VIDEOS_PER_POST:
                break
            if ("video", v["id"]) in taken or v.get("duration", 0) > 45:
                continue
            # Instagram отдаёт максимум 1080p и пережимает всё, что выше.
            # Поэтому берём файл, ближайший к 1080 по ширине, но не ниже:
            # 4K тут не даёт ничего, кроме пятикратного веса.
            files = [f for f in v["video_files"] if (f.get("width") or 0) >= 1080]
            if not files:
                continue
            best = min(files, key=lambda f: abs((f.get("width") or 0) - 1080))
            name = f"extra-video-{have_v + got_v + 1:02d}-pexels-{v['id']}.mp4"
            try:
                size = download(best["link"], os.path.join(folder, name))
            except Exception as e:
                print(f"  ! видео {v['id']}: {e}"); continue
            credits.append({"kind": "video", "id": v["id"], "file": name,
                            "author": v["user"]["name"], "url": v["url"],
                            "px": f"{best['width']}x{best['height']}",
                            "sec": v.get("duration"), "query": q})
            taken.add(("video", v["id"])); got_v += 1; total_v += 1
        time.sleep(0.7)

    json.dump(credits, io.open(cpath, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(f"  {slug:30s} +{got_p} фото, +{got_v} видео  (всего в папке: {have_p+got_p} фото, {have_v+got_v} видео)")

print(f"\nитого скачано: {total_p} фото, {total_v} видео")

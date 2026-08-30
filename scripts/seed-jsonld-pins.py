# -*- coding: utf-8 -*-
"""Засев переводов строк разметки в PINNED_TRANSLATIONS.

Три ловушки, на которые уже наступали и которые здесь закрыты:
  1. Ключи локалей есть в двух разных объектах файла — ищем строго после
     «const PINNED_TRANSLATIONS = {».
  2. Китайская секция называется zh-CN, а не zh.
  3. Проверка дублей должна быть внутри секции своего языка: глобальная
     проверка после первой локали считает ключ существующим и молча
     пропускает остальные четыре.
Плюс апостроф и амперсанд сеем во всех формах записи — сбор текста со
страницы работает с HTML, и ключ там может быть с сущностями.
"""
import io, json, os, re, sys

SP = sys.argv[1] if len(sys.argv) > 1 else "."
GEN = "scripts/generate-bali-tour-pages.mjs"
LOCALES = {"ru": "ru", "es": "es", "fr": "fr", "de": "de", "zh": "zh-CN"}

def variants(v):
    out = [v]
    amp = v.replace("&", "&amp;") if "&" in v else v
    if "&" in v: out.append(amp)
    if "'" in v:
        out += [v.replace("'", "&#39;"), v.replace("'", "&#039;")]
        if "&" in v:
            out += [amp.replace("'", "&#39;"), amp.replace("'", "&#039;")]
    seen, uniq = set(), []
    for x in out:
        if x not in seen:
            seen.add(x); uniq.append(x)
    return uniq

def bounds(text, key):
    start = text.index("const PINNED_TRANSLATIONS = {")
    k = f'"{key}"' if "-" in key else key
    m = re.search(r"^  " + re.escape(k) + r": \{$", text[start:], re.M)
    if not m: sys.exit(f"нет секции {key} в PINNED_TRANSLATIONS")
    a = start + m.end()
    e = re.search(r"^  \},$", text[a:], re.M)
    return a, a + e.start()

s = io.open(GEN, encoding="utf8").read()
before = len(s)
total = 0
for loc, section in LOCALES.items():
    # Пачки бывают разные: tr-out/<лок>-1.json от первого прогона,
    # tr2-out/<лок>.json от второго. Берём всё, что найдётся, чтобы
    # скрипт не приходилось править под каждый новый заход.
    merged = {}
    import glob as _glob
    found = sorted(_glob.glob(f"{SP}/tr*-out/{loc}-*.json") + _glob.glob(f"{SP}/tr*-out/{loc}.json"))
    if not found:
        print(f"  ! {loc}: файлов перевода не найдено"); continue
    for p in found:
        merged.update(json.load(io.open(p, encoding="utf8")))
    if not merged:
        print(f"  {loc}: переводов нет"); continue
    a, e = bounds(s, section)
    body = s[a:e]
    block, n, skip = "", 0, 0
    for en, tr in merged.items():
        if not tr or tr.strip() == en.strip():
            skip += 1; continue
        for v in variants(en):
            if f"    {json.dumps(v, ensure_ascii=False)}:" in body: continue
            block += f"\n    {json.dumps(v, ensure_ascii=False)}:\n      {json.dumps(tr, ensure_ascii=False)},"
            n += 1
    s = s[:a] + block + s[a:]
    print(f"  {section:6s} переводов {len(merged):4d}  добавлено ключей {n:5d}  пропущено (перевод = оригинал) {skip}")
    total += n

io.open(GEN, "w", encoding="utf8").write(s)
print(f"\nвсего ключей добавлено: {total}, файл вырос на {len(s)-before} символов")

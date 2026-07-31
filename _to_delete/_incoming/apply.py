#!/usr/bin/env python3
"""
Runs on Alex's machine, inside the site folder.

  python3 _incoming/apply.py

1. copies the 30 new journal pages into the site root
2. adds their 6 URL blocks (5 hreflang alternates each) to sitemap.xml
3. adds a card for each new guide to the 5 journal hub pages

Safe to re-run: every step is idempotent.
"""
import json, os, re, shutil, sys

SITE = os.getcwd()
HERE = os.path.dirname(os.path.abspath(__file__))
LANGS = ["en", "ru", "es", "fr", "zh"]
HUB = {"en": "bali-journal.html", "ru": "bali-journal-ru.html",
       "es": "bali-journal-es.html", "fr": "bali-journal-fr.html",
       "zh": "bali-journal-zh.html"}
TODAY = "2026-07-27"

man = json.load(open(os.path.join(HERE, "manifest.json"), encoding="utf-8"))
slugs, rows, cards = man["slugs"], man["row"], man["cards"]

if not os.path.exists(os.path.join(SITE, "sitemap.xml")):
    sys.exit("run this from the site root (sitemap.xml not found here)")

# ---------------------------------------------------------------- 1. pages
copied = 0
for fn in sorted(os.listdir(os.path.join(HERE, "pages"))):
    shutil.copy(os.path.join(HERE, "pages", fn), os.path.join(SITE, fn))
    copied += 1
print("pages copied: %d" % copied)

# ---------------------------------------------------------------- 2. sitemap
sm = open(os.path.join(SITE, "sitemap.xml"), encoding="utf-8").read()
added = 0
blocks = []
for slug in slugs:
    if "/journal/%s<" % slug in sm or "/journal/%s\"" % slug in sm:
        continue                                   # already there
    for lang in LANGS:
        alts = "".join(
            '\n    <xhtml:link rel="alternate" hreflang="%s" '
            'href="https://sbexcursion.com/bali/%s/journal/%s"/>' % (l, l, slug)
            for l in LANGS)
        blocks.append(
            "  <url>\n    <loc>https://sbexcursion.com/bali/%s/journal/%s</loc>%s"
            '\n    <xhtml:link rel="alternate" hreflang="x-default" '
            'href="https://sbexcursion.com/bali/en/journal/%s"/>'
            "\n    <lastmod>%s</lastmod>\n  </url>\n"
            % (lang, slug, alts, slug, TODAY))
        added += 1
if added:
    sm = sm.replace("</urlset>", "".join(blocks) + "</urlset>")
    open(os.path.join(SITE, "sitemap.xml"), "w", encoding="utf-8").write(sm)
print("sitemap urls added: %d" % added)

# ---------------------------------------------------------------- 3. hubs
CARD = (
    '\n    <a class="sb-jhub-card" href="{href}" data-jhub-searchable '
    'data-search="{search}">\n'
    '      <div class="sb-jhub-card__media">\n'
    '        <img src="{img}" alt="{alt}" loading="lazy" decoding="async">\n'
    '      </div>\n'
    '      <div class="sb-jhub-card__body">\n'
    '        <span class="sb-jhub-card__label">{label}</span>\n'
    '        <h3>{title}</h3>\n'
    '        <p>{desc}</p>\n'
    '      </div>\n'
    '    </a>\n')


def esc(t):
    return (t.replace("&", "&amp;").replace('"', "&quot;")
             .replace("<", "&lt;").replace(">", "&gt;"))


for lang in LANGS:
    path = os.path.join(SITE, HUB[lang])
    s = open(path, encoding="utf-8").read()
    tracks = [m.start() for m in re.finditer(r'<div class="sb-jhub-track" data-jhub-track>', s)]
    if len(tracks) < 4:
        print("  ! %s: expected 5 rows, found %d - skipped" % (HUB[lang], len(tracks)))
        continue
    ins = {}
    for slug in slugs:
        c = cards[slug][lang]
        if c["href"] in s:
            continue                               # already added
        search = esc(" ".join([c["title"], c["desc"], c["label"]]).lower()) + " "
        html = CARD.format(href=c["href"], search=search, img=c["img"],
                           alt=esc(c["alt"]), label=esc(c["label"]),
                           title=esc(c["title"]), desc=esc(c["desc"]))
        ins.setdefault(rows[slug], []).append(html)
    if not ins:
        print("  %s: already up to date" % HUB[lang])
        continue
    # insert from the last row backwards so earlier offsets stay valid
    n = 0
    for row in sorted(ins, reverse=True):
        at = tracks[row] + len('<div class="sb-jhub-track" data-jhub-track>')
        s = s[:at] + "".join(ins[row]) + s[at:]
        n += len(ins[row])
    open(path, "w", encoding="utf-8").write(s)
    print("  %s: %d cards added" % (HUB[lang], n))

print("\ndone. review with:  git status  /  git diff --stat")

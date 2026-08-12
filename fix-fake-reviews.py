#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Убирает aggregateRating и review из JSON-LD разметки на страницах сайта.

ЗАЧЕМ. Сейчас на 115 страницах стоит разметка рейтинга 4.9 из 3 отзывов —
одинаковая до цифры на всех страницах, с выдуманными именами авторов.
Google в 2026 прямо запрещает разметку отзывов, не основанных на реальном
опыте, и наказывает за это ручными санкциями на весь сайт (падение позиций
или вылет из выдачи до исправления и повторной проверки).

ЧТО ДЕЛАЕТ. Аккуратно вырезает только два поля — aggregateRating и review —
из блоков <script type="application/ld+json">. Всё остальное (Product, Offer,
цены, названия, FAQ) остаётся нетронутым. Видимый текст страницы не трогается
вообще.

КАК ЗАПУСКАТЬ.

  1) сначала посмотреть, что будет сделано, ничего не меняя:
       python3 fix-fake-reviews.py

  2) если всё устраивает — применить (создаст резервные копии .bak):
       python3 fix-fake-reviews.py --apply

  3) если что-то пошло не так, откатить всё:
       python3 fix-fake-reviews.py --rollback

Запускать из корня сайта (там, где лежат bali-tour-*.html).
"""

import json
import os
import re
import sys
import glob

SCRIPT_RE = re.compile(
    r'(<script[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)',
    re.S | re.I,
)
STRIP_KEYS = ("aggregateRating", "review", "reviews")


def strip_keys(node):
    """Рекурсивно удаляет ключи отзывов. Возвращает (новый узел, сколько удалено)."""
    removed = 0
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            if k in STRIP_KEYS:
                removed += 1
                continue
            nv, r = strip_keys(v)
            out[k] = nv
            removed += r
        return out, removed
    if isinstance(node, list):
        out = []
        for v in node:
            nv, r = strip_keys(v)
            out.append(nv)
            removed += r
        return out, removed
    return node, removed


def process_html(html):
    """Возвращает (новый html, сколько полей удалено, сколько блоков не распарсилось)."""
    total_removed = 0
    unparsed = 0

    def repl(m):
        nonlocal total_removed, unparsed
        open_tag, body, close_tag = m.group(1), m.group(2), m.group(3)
        try:
            data = json.loads(body)
        except Exception:
            unparsed += 1
            return m.group(0)  # не трогаем то, что не смогли разобрать
        cleaned, removed = strip_keys(data)
        if removed == 0:
            return m.group(0)  # нечего менять — оставляем байт в байт
        total_removed += removed
        new_body = json.dumps(cleaned, ensure_ascii=False, indent=2)
        return open_tag + "\n" + new_body + "\n" + close_tag

    return SCRIPT_RE.sub(repl, html), total_removed, unparsed


def targets():
    files = sorted(set(glob.glob("*.html")))
    return [f for f in files if os.path.isfile(f)]


def main():
    apply_changes = "--apply" in sys.argv
    rollback = "--rollback" in sys.argv

    if rollback:
        n = 0
        for bak in sorted(glob.glob("*.html.bak")):
            orig = bak[:-4]
            os.replace(bak, orig)
            n += 1
        print(f"Откачено файлов: {n}")
        return

    files = targets()
    if not files:
        print("Не нашёл ни одного .html — ты точно в корне сайта?")
        sys.exit(1)

    touched = []
    total_removed = 0
    total_unparsed = 0

    for f in files:
        try:
            html = open(f, encoding="utf-8").read()
        except Exception as e:
            print(f"  пропускаю {f}: {e}")
            continue

        new_html, removed, unparsed = process_html(html)
        total_unparsed += unparsed
        if removed == 0:
            continue

        total_removed += removed
        touched.append((f, removed))

        if apply_changes:
            bak = f + ".bak"
            if not os.path.exists(bak):
                with open(bak, "w", encoding="utf-8") as fh:
                    fh.write(html)
            with open(f, "w", encoding="utf-8") as fh:
                fh.write(new_html)

    mode = "ПРИМЕНЕНО" if apply_changes else "РЕЖИМ ПРОСМОТРА (ничего не записано)"
    print(f"=== {mode} ===")
    print(f"Просмотрено файлов:      {len(files)}")
    print(f"Файлов с разметкой отзывов: {len(touched)}")
    print(f"Удалено полей всего:     {total_removed}")
    if total_unparsed:
        print(f"Блоков JSON-LD не разобрано (оставлены как есть): {total_unparsed}")

    for f, r in touched[:15]:
        print(f"   {f}  — убрано полей: {r}")
    if len(touched) > 15:
        print(f"   … и ещё {len(touched)-15} файлов")

    if not apply_changes and touched:
        print("\nЧтобы применить:  python3 fix-fake-reviews.py --apply")
        print("Откатить потом:   python3 fix-fake-reviews.py --rollback")


if __name__ == "__main__":
    main()

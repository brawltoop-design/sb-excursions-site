"""
Reddit Listener для SB Excursions — версия на RSS (без Reddit API/OAuth)
=========================================================================
Следит за новыми постами в выбранных сабреддитах через публичные RSS-ленты
Reddit (никакого прохождения через prefs/apps, никакого client_id/secret,
никакой капчи), ищет упоминания Бали и похожих ключевых слов, присылает
уведомление в Telegram.

Почему не через официальный Reddit API: в 2026 Reddit сильно закрутил гайки
на самостоятельную регистрацию API-приложений (та капча на prefs/apps,
которая не проходит — это не баг сети, это новая политика Reddit, ручное
одобрение подряд отклоняет заявки на личное некоммерческое использование).
RSS-ленты — отдельный, гораздо более старый механизм, он публичный, не
требует логина и по состоянию на август 2026 продолжает работать.

ВАЖНО: этот скрипт только СЛУШАЕТ и ПИНГУЕТ ТЕБЯ. Он ничего не постит и не
комментирует сам — отвечать в тредах нужно руками, своими словами, иначе
Reddit это палит как спам-бота и банит аккаунт и домен целиком.

Установка зависимостей:
    pip install -r requirements.txt

Запуск:
    python3 reddit_listener.py

Инструкция по настройке (Telegram-бот и т.д.) — в файле
REDDIT-BOT-SETUP.md рядом с этим скриптом.
"""

import html
import json
import re
import time
from pathlib import Path
from xml.etree import ElementTree

import requests

# ============================================================
# НАСТРОЙКИ — ЗАПОЛНИ ЭТИ ДВЕ СТРОЧКИ ПЕРЕД ЗАПУСКОМ
# Подробно откуда их взять — в REDDIT-BOT-SETUP.md
# ============================================================

TELEGRAM_BOT_TOKEN = "8933638147:AAGXM76oa7z0aIJ0ZzI7ODaOJLeC-0NG1Bc"
TELEGRAM_CHAT_ID = "846963818"

# ============================================================
# ЧТО СЛУШАЕМ — можно свободно редактировать эти списки
# ============================================================

SUBREDDITS = [
    "bali",
    "indonesia",
    "IndonesiaTravel",
    "solotravel",
    "travel",
    "backpacking",
    "digitalnomad",
    "SoloFemaleTravelers",
]

# Из этих сабреддитов присылать ВСЕ новые посты, без фильтра по ключевым
# словам: в r/bali любой пост про Бали по определению, включая «need a driver»
# без единого названия места. Если станет слишком шумно — убери "bali" отсюда,
# и он вернётся к фильтру по словам, как остальные.
NOTIFY_ALL_SUBREDDITS = [
    "bali",
]

KEYWORDS = [
    # --- География, латиница (EN/FR/ES пишут названия одинаково) ---
    "bali", "penida", "lembongan", "ubud", "canggu", "uluwatu",
    "seminyak", "gili", "lempuyang", "tegalalang", "tegallalang", "kuta",
    "sanur", "jimbaran", "amed", "munduk", "bedugul", "denpasar",
    "nusa dua", "lovina", "kintamani", "jatiluwih", "sidemen", "batur",
    # --- Уникальные достопримечательности: сами по себе означают Бали,
    # ловят посты, где слово Bali вообще не написано ---
    "kelingking", "manta point", "broken beach", "angel billabong",
    "angel's billabong", "crystal bay", "diamond beach",
    "gates of heaven", "gate of heaven", "tanah lot", "tirta gangga",
    "tirtagangga", "ulun danu", "besakih", "handara", "taman ayun",
    "monkey forest", "campuhan", "sekumpul", "tegenungan", "tibumana",
    "padang padang", "bingin",
    # ВАЖНО: общие активности (atv, snorkeling, waterfall, swing) сюда НЕ
    # добавлять — в r/travel и r/solotravel они матчат Дубай и Таиланд.
    # Примечание: "diamond beach" есть ещё в Исландии — изредка может
    # прилететь исландский пост, это осознанный компромисс, можно удалить.
    # --- Русский, кириллица. Ключи обрезаны до основы слова, потому что
    # русские названия склоняются: "в Ловину", "на Пениде", "в Куте" ---
    "бали", "нуса-пенид", "нуса пенид", "пенид", "лембонган", "убуд",
    "чангу", "улувату", "семиньяк", "гили", "лемпуянг", "тегалаланг",
    "кут", "санур", "джимбаран", "амед", "мундук", "бедугул", "денпасар",
    "ловин", "кинтамани", "келингкинг", "тана лот", "тана-лот",
    # Китайский сознательно не добавлен — Reddit заблокирован в материковом
    # Китае, китаеязычных тредов на этих сабреддитах практически нет.
]

CHECK_EVERY_SECONDS = 300  # раз в 5 минут — вежливая частота для анонимного RSS

# ============================================================
# СЛУЖЕБНОЕ — трогать не обязательно
# ============================================================

SEEN_FILE = Path(__file__).parent / "reddit_seen_posts.json"
MAX_SEEN_STORED = 3000
_NOTIFY_ALL_LOWER = {s.lower() for s in NOTIFY_ALL_SUBREDDITS}
ATOM_NS = "{http://www.w3.org/2005/Atom}"
# Честный User-Agent вместо притворства браузером — по факту так безопаснее:
# запрос через requests не повторяет остальные сигналы настоящего Chrome
# (TLS-отпечаток, порядок заголовков), и попытка притвориться браузером
# половинчато иногда смотрится подозрительнее, чем честно назвавшийся бот.
USER_AGENT = "sb-excursion-bali-listener/1.0 (personal RSS monitor; contact: info@sbexcursion.com)"

RSS_DELAY_BETWEEN_SUBS = 5      # секунд между сабреддитами внутри одного прохода
RSS_429_BACKOFF = 15            # секунд паузы, если поймали лимит запросов


def load_seen():
    if SEEN_FILE.exists():
        try:
            return set(json.loads(SEEN_FILE.read_text()))
        except Exception:
            return set()
    return set()


def save_seen(seen):
    trimmed = list(seen)[-MAX_SEEN_STORED:]
    try:
        SEEN_FILE.write_text(json.dumps(trimmed))
    except Exception as e:
        print(f"[Внимание] Не смог сохранить reddit_seen_posts.json: {e}")


_KEYWORD_RE = None


def _keyword_regex():
    """Собирает один regex из всех ключевых слов, с привязкой к началу слова.

    Раньше поиск шёл по подстроке, и "amed" срабатывал внутри "named",
    "renamed", "dreamed". Теперь ключ должен стоять в начале слова:
    "Amed", "amed's" — да, "named" — нет. Продолжения слова разрешены
    намеренно: "bali" ловит "Balinese", "гили" ловит "Гилис".
    """
    global _KEYWORD_RE
    if _KEYWORD_RE is None:
        parts = [r"\b" + re.escape(kw.strip()) for kw in KEYWORDS if kw.strip()]
        _KEYWORD_RE = re.compile("|".join(parts), re.IGNORECASE)
    return _KEYWORD_RE


def matches_keywords(text):
    return bool(_keyword_regex().search(text))


def send_telegram(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML",
        "disable_web_page_preview": False,
    }
    try:
        r = requests.post(url, data=payload, timeout=15)
        if r.status_code != 200:
            print(f"[Telegram] Ошибка отправки ({r.status_code}): {r.text}")
    except Exception as e:
        print(f"[Telegram] Не получилось отправить сообщение: {e}")


def clean_html_snippet(raw_html, max_len=300):
    """Убирает HTML-теги из содержимого RSS-записи, возвращает чистый текст."""
    text = html.unescape(raw_html or "")
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)  # на случай двойного экранирования
    text = re.sub(r"\s+", " ", text).strip()
    truncated = len(text) > max_len
    return (text[:max_len] + "...") if truncated else text


def parse_atom_entries(xml_bytes, subreddit):
    """Разбирает Atom-XML фида r/<subreddit>/new.rss в список постов."""
    try:
        root = ElementTree.fromstring(xml_bytes)
    except ElementTree.ParseError as e:
        print(f"[RSS] r/{subreddit}: не смог разобрать XML — {e}")
        return []

    posts = []
    for entry in root.findall(f"{ATOM_NS}entry"):
        entry_id = (entry.findtext(f"{ATOM_NS}id") or "").strip()
        if not entry_id:
            continue
        title = (entry.findtext(f"{ATOM_NS}title") or "").strip()
        content_raw = entry.findtext(f"{ATOM_NS}content") or ""

        link_el = entry.find(f"{ATOM_NS}link")
        link = link_el.get("href") if link_el is not None else (
            f"https://www.reddit.com/r/{subreddit}/"
        )

        author_el = entry.find(f"{ATOM_NS}author/{ATOM_NS}name")
        author_raw = author_el.text if author_el is not None and author_el.text else "unknown"
        author = author_raw.replace("/u/", "").strip()

        posts.append({
            "id": entry_id,
            "title": title,
            "content_raw": content_raw,
            "link": link,
            "author": author,
            "subreddit": subreddit,
        })
    return posts


def fetch_subreddit_entries(subreddit):
    url = f"https://www.reddit.com/r/{subreddit}/new.rss"
    try:
        r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=20)
    except Exception as e:
        print(f"[RSS] r/{subreddit}: не достучался — {e}")
        return []

    if r.status_code == 429:
        print(f"[RSS] r/{subreddit}: лимит запросов (429), притормаживаю на {RSS_429_BACKOFF} сек")
        time.sleep(RSS_429_BACKOFF)
        return []

    if r.status_code != 200:
        print(f"[RSS] r/{subreddit}: HTTP {r.status_code}, пропускаю в этот раз")
        return []

    return parse_atom_entries(r.content, subreddit)


def format_message(post):
    title = html.escape(post["title"])
    sub = html.escape(post["subreddit"])
    author = html.escape(post["author"])
    snippet_clean = clean_html_snippet(post["content_raw"])
    snippet = html.escape(snippet_clean)

    text = f"🌴 <b>Новый тред про Бали</b>\nr/{sub} · автор {author}\n\n<b>{title}</b>\n"
    if snippet:
        text += f"{snippet}\n\n"
    text += post["link"]
    return text


def poll_once(seen, notify=True):
    """Проходит по всем сабреддитам один раз. Возвращает число новых постов."""
    found = 0
    for subreddit in SUBREDDITS:
        for post in fetch_subreddit_entries(subreddit):
            if post["id"] in seen:
                continue
            seen.add(post["id"])
            found += 1

            full_text = f"{post['title']} {post['content_raw'] or ''}"
            is_notify_all_sub = post["subreddit"].lower() in _NOTIFY_ALL_LOWER
            if notify and (is_notify_all_sub or matches_keywords(full_text)):
                print(f"[Найдено] r/{post['subreddit']}: {post['title']}")
                send_telegram(format_message(post))
        save_seen(seen)
        time.sleep(RSS_DELAY_BETWEEN_SUBS)
    return found


def run():
    print("Reddit listener (RSS) запущен. Ctrl+C чтобы остановить.")
    print(f"Слушаю: {', '.join(SUBREDDITS)}")

    first_run = not SEEN_FILE.exists()
    seen = load_seen()

    if first_run:
        print("Первый запуск — запоминаю уже существующие посты без уведомлений...")
        count = poll_once(seen, notify=False)
        print(f"Готово, запомнил {count} постов. Дальше буду присылать только новое.")
        print(f"Жду {CHECK_EVERY_SECONDS} сек перед первой настоящей проверкой, "
              f"чтобы не долбить Reddit двумя проходами подряд...")
        time.sleep(CHECK_EVERY_SECONDS)

    send_telegram("✅ Reddit listener запущен и слушает: " + ", ".join(SUBREDDITS))

    while True:
        try:
            poll_once(seen, notify=True)
        except KeyboardInterrupt:
            print("Остановлено вручную.")
            break
        except Exception as e:
            print(f"[Ошибка] {e}")

        time.sleep(CHECK_EVERY_SECONDS)


if __name__ == "__main__":
    run()

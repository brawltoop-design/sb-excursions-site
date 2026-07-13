import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const RSS_URL = "https://sbexcursion.com/rss-feed-426101175351.xml";
const BLOG_PATH_PREFIX = "/dubai/en/blog/";
const USER_AGENT = "Mozilla/5.0 (compatible; SB-Excursions-Sync/1.0; +https://sbexcursion.com)";
const NEWS_FEED_FILES = [
  path.join(projectRoot, "page63806411.html"),
  path.join(projectRoot, "files", "page63806411body.html"),
];

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function readTag(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function readImage(block) {
  const enclosureMatch = block.match(/<enclosure[^>]*url="([^"]+)"/i);
  if (enclosureMatch) {
    return enclosureMatch[1];
  }

  const turboContentMatch = block.match(/<turbo:content><!\[CDATA\[([\s\S]*?)\]\]><\/turbo:content>/i);
  if (!turboContentMatch) {
    return "";
  }

  const imageMatch = turboContentMatch[1].match(/<img[^>]*src="([^"]+)"/i);
  return imageMatch ? imageMatch[1] : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDisplayDate(pubDate) {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return pubDate;

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = String(parsed.getFullYear());
  return `${day}.${month}.${year}`;
}

function extractItemsFromRss(xml) {
  const itemBlocks = Array.from(xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)).map((match) => match[0]);

  return itemBlocks
    .map((block) => {
      const link = readTag(block, "link");
      if (!link) return null;

      const pathname = new URL(link).pathname;
      if (!pathname.startsWith(BLOG_PATH_PREFIX)) return null;

      const slug = pathname.slice(BLOG_PATH_PREFIX.length).replace(/^\/+|\/+$/g, "");
      if (!slug) return null;

      return {
        slug,
        link,
        title: readTag(block, "title"),
        pubDate: readTag(block, "pubDate"),
        category: readTag(block, "category"),
        description: readTag(block, "description"),
        image: readImage(block),
      };
    })
    .filter(Boolean);
}

function buildNewsMarkup(items) {
  const sortedItems = [...items].sort((left, right) => {
    const leftTime = new Date(left.pubDate).getTime();
    const rightTime = new Date(right.pubDate).getTime();
    return rightTime - leftTime;
  });

  const categories = Array.from(new Set(sortedItems.map((item) => item.category).filter(Boolean)));
  const filterButtons = [
    `<button class="sb-dubai-news__filter is-active" type="button" data-filter="All">All</button>`,
    ...categories.map(
      (category) =>
        `<button class="sb-dubai-news__filter" type="button" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`,
    ),
  ].join("");

  const cards = sortedItems
    .map(
      (item) => `
    <a class="sb-dubai-news__card" href="/dubai/en/blog/${escapeHtml(item.slug)}" data-category="${escapeHtml(item.category)}">
      <div class="sb-dubai-news__media">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
        <span class="sb-dubai-news__tag">${escapeHtml(item.category)}</span>
      </div>
      <div class="sb-dubai-news__body">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="sb-dubai-news__meta">
          <span>${escapeHtml(formatDisplayDate(item.pubDate))}</span>
          <span>Read article</span>
        </div>
      </div>
    </a>`,
    )
    .join("");

  return `<div id="rec1802539031" class="r t-rec t-rec_pt_135 t-rec_pb_135" style="padding-top:135px;padding-bottom:135px;" data-animationappear="off" data-record-type="131"><div class="t123"><div class="t-container"><div class="t-col t-col_12"><div id="sb-dubai-news"><style>
#sb-dubai-news{font-family:"Cina GEO", "TildaSans","Tilda Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#111;}
#sb-dubai-news .sb-dubai-news__shell{display:grid;gap:30px;}
#sb-dubai-news .sb-dubai-news__head{text-align:center;}
#sb-dubai-news .sb-dubai-news__head h2{margin:0;font-size:64px;line-height:1.02;font-weight:700;letter-spacing:-2.4px;}
#sb-dubai-news .sb-dubai-news__filters{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
#sb-dubai-news .sb-dubai-news__filter{appearance:none;border:1px solid #111;background:#fff;color:#111;min-height:52px;padding:0 24px;border-radius:999px;font-size:16px;font-weight:500;letter-spacing:-0.3px;cursor:pointer;transition:background-color .2s ease,color .2s ease,border-color .2s ease,transform .2s ease;}
#sb-dubai-news .sb-dubai-news__filter:hover{transform:translateY(-1px);}
#sb-dubai-news .sb-dubai-news__filter.is-active{background:#111;color:#fff;border-color:#111;}
#sb-dubai-news .sb-dubai-news__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;}
#sb-dubai-news .sb-dubai-news__card{display:flex;flex-direction:column;min-height:100%;color:inherit;text-decoration:none;}
#sb-dubai-news .sb-dubai-news__media{position:relative;overflow:hidden;border-radius:0;background:#f4f4f4;}
#sb-dubai-news .sb-dubai-news__media img{display:block;width:100%;aspect-ratio:1.18;object-fit:cover;transition:transform .25s ease;}
#sb-dubai-news .sb-dubai-news__card:hover .sb-dubai-news__media img{transform:scale(1.02);}
#sb-dubai-news .sb-dubai-news__tag{position:absolute;left:22px;top:22px;display:inline-flex;align-items:center;min-height:38px;padding:0 14px;border-radius:8px;background:rgba(55,62,71,0.86);color:#fff;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;}
#sb-dubai-news .sb-dubai-news__body{display:flex;flex:1;flex-direction:column;padding-top:20px;}
#sb-dubai-news .sb-dubai-news__body h3{margin:0 0 12px;font-size:24px;line-height:1.18;font-weight:700;letter-spacing:-1px;}
#sb-dubai-news .sb-dubai-news__body p{margin:0 0 18px;color:#444;font-size:15px;line-height:1.7;}
#sb-dubai-news .sb-dubai-news__meta{margin-top:auto;display:flex;justify-content:space-between;gap:14px;align-items:center;color:#6b6b70;font-size:13px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;}
#sb-dubai-news .sb-dubai-news__card[hidden]{display:none !important;}
@media screen and (max-width:1100px){#sb-dubai-news .sb-dubai-news__head h2{font-size:54px;}#sb-dubai-news .sb-dubai-news__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;}}
@media screen and (max-width:640px){#sb-dubai-news .sb-dubai-news__shell{gap:24px;}#sb-dubai-news .sb-dubai-news__head h2{font-size:40px;letter-spacing:-1.6px;}#sb-dubai-news .sb-dubai-news__filters{justify-content:flex-start;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}#sb-dubai-news .sb-dubai-news__filters::-webkit-scrollbar{display:none;}#sb-dubai-news .sb-dubai-news__filter{min-height:44px;padding:0 18px;font-size:14px;white-space:nowrap;}#sb-dubai-news .sb-dubai-news__grid{grid-template-columns:1fr;gap:18px;}#sb-dubai-news .sb-dubai-news__media img{aspect-ratio:1.34;}#sb-dubai-news .sb-dubai-news__tag{left:14px;top:14px;min-height:34px;padding:0 12px;font-size:11px;}#sb-dubai-news .sb-dubai-news__body{padding-top:14px;}#sb-dubai-news .sb-dubai-news__body h3{font-size:22px;line-height:1.2;}#sb-dubai-news .sb-dubai-news__body p{font-size:14px;line-height:1.58;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}#sb-dubai-news .sb-dubai-news__meta{font-size:12px;}}
</style><div class="sb-dubai-news__shell"><div class="sb-dubai-news__head"><h2>Our news</h2></div><div class="sb-dubai-news__filters">${filterButtons}</div><div class="sb-dubai-news__grid">${cards}</div></div><script>
(() => {
  const root = document.getElementById("sb-dubai-news");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".sb-dubai-news__filter"));
  const cards = Array.from(root.querySelectorAll(".sb-dubai-news__card"));
  const feedHashPrefix = "#!/tfeeds/426101175351/c/";

  const applyFilter = (filter) => {
    const activeFilter = filter && filter !== "All" ? filter : "All";

    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === activeFilter);
    });

    cards.forEach((card) => {
      const shouldShow = activeFilter === "All" || card.dataset.category === activeFilter;
      card.hidden = !shouldShow;
    });
  };

  const readFilterFromHash = () => {
    if (!window.location.hash.startsWith(feedHashPrefix)) return "All";
    const rawCategory = window.location.hash.slice(feedHashPrefix.length);
    return rawCategory ? decodeURIComponent(rawCategory) : "All";
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "All";
      applyFilter(filter);
      const nextHash = filter === "All" ? "" : feedHashPrefix + encodeURIComponent(filter);
      history.replaceState(null, "", window.location.pathname + window.location.search + nextHash);
    });
  });

  window.addEventListener("hashchange", () => {
    applyFilter(readFilterFromHash());
  });

  applyFilter(readFilterFromHash());
})();
</script></div></div></div></div></div>`;
}

async function patchDubaiNewsFeedFiles(items) {
  const newsMarkup = buildNewsMarkup(items);

  for (const filePath of NEWS_FEED_FILES) {
    const originalHtml = await fs.readFile(filePath, "utf8");
    const startMarker = '<div id="rec1802539031"';
    const endMarker = '<div id="rec1597436911"';
    const startIndex = originalHtml.indexOf(startMarker);
    const endIndex = originalHtml.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error(`Could not locate Dubai news block in ${filePath}`);
    }

    const updatedHtml = `${originalHtml.slice(0, startIndex)}${newsMarkup} ${originalHtml.slice(endIndex)}`;
    await fs.writeFile(filePath, updatedHtml, "utf8");
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main() {
  const rssXml = await fetchText(RSS_URL);
  const items = extractItemsFromRss(rssXml);

  if (!items.length) {
    throw new Error("No Dubai blog articles were found in the RSS feed.");
  }

  for (const item of items) {
    const html = await fetchText(item.link);
    const filePath = path.join(projectRoot, `dubai-blog-${item.slug}.html`);
    await fs.writeFile(filePath, html, "utf8");
  }

  const manifestPath = path.join(projectRoot, "dubai-blog-manifest.json");
  await fs.writeFile(manifestPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  await patchDubaiNewsFeedFiles(items);

  console.log(`Synced ${items.length} Dubai blog pages from ${RSS_URL} and patched the Dubai news section.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

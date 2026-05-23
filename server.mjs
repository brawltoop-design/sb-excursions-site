import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDubaiCatalogMarkup } from "./dubai-catalog-static.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT || 3000);

const redirects = new Map([
  [
    "/tproduct/1366959501-735097005942-desert-safari-buggy-camel-ride-sandboard",
    "/dubai/en/tours/full-day-dubai-desert-safari",
  ],
  [
    "/tproduct/1366959501-232604178022-abu-dhabi-from-dubai",
    "/dubai/en/tours/abu-dhabi-city-tour-from-dubai",
  ],
  [
    "/tproduct/1366959501-643417850282-classical-dubai-city-tour",
    "/dubai/en",
  ],
  [
    "/tproduct/1366959501-910807092422-full-day-explore-dubai-city-tour",
    "/dubai/en",
  ],
  ["/bali/en/tours/ubud-highlights", "/bali/en/tours/ubud-highlights-tour"],
  ["/bali/en/tours/ubud-highlits-", "/bali/en/tours/ubud-highlights-tour"],
]);

const rewrites = new Map([
  ["/", "index.html"],
  ["/dubai/en", "page63806411.html"],
  ["/dubai/en/tours/full-day-dubai-desert-safari", "page106026336.html"],
  ["/dubai/en/tours/abu-dhabi-city-tour-from-dubai", "page112638996.html"],
  ["/dubai/en/tours/hot-air-balloon-sunrise-flight", "page114154666.html"],
  ["/dubai/en/tours/dubai-marina-yacht-party", "page112631276.html"],
  ["/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour", "page116517176.html"],
  ["/dubai/en/about", "page112152236.html"],
  ["/dubai/en/faq", "page112258706.html"],
  ["/dubai/en/header", "page106032666.html"],
  ["/dubai/en/privacy-policy", "page112272486.html"],
  ["/dubai/en/footer", "page106032906.html"],
  ["/dubai/en/terms", "page112277396.html"],
  ["/not-found", "page111312446.html"],
  ["/123456", "page128064616.html"],
  ["/bali/en/tours/nusa-penida-west-tour", "bali-tour-nusa-penida-west-tour.html"],
  ["/bali/en/main-page", "page128073236.html"],
  ["/bali/en/journal", "bali-journal.html"],
  ["/bali/en/tours/nusa-penida-manta-rays-point", "page132181473.html"],
  ["/bali/en/tours/mount-batur-sunrise-hike", "page132812463.html"],
  ["/bali/en/tours/mount-batur-sunrise-jeep-hot-spring", "page133629743.html"],
  ["/beli/en/tours/mount-batur-sunrise-jeep-hot-spring", "page133629743.html"],
  ["/mount-batur-sunrise-jeep-hot-spring", "page133629743.html"],
]);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const dubaiCatalogMarkup = buildDubaiCatalogMarkup();
const dubaiLegalPagesWithoutFooter = new Set([
  "page112258706.html",
  "page112272486.html",
  "page112277396.html",
]);

const tildaLabelCleanupStyle = `
<style data-sb-hide-tilda-label-style>
#tildacopy,
.t-tildalabel,
.t-tildalabel-free {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  max-height: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
}
</style>`;

const tildaLabelCleanupScript = `
<script data-sb-hide-tilda-cleanup>
(() => {
  const selectors = "#tildacopy, .t-tildalabel, .t-tildalabel-free";

  const hideBadge = () => {
    document.querySelectorAll(selectors).forEach((node) => {
      node.style.setProperty("display", "none", "important");
      node.style.setProperty("visibility", "hidden", "important");
      node.style.setProperty("opacity", "0", "important");
      node.style.setProperty("pointer-events", "none", "important");
      node.style.setProperty("max-height", "0", "important");
      node.style.setProperty("min-height", "0", "important");
      node.style.setProperty("overflow", "hidden", "important");
      node.remove();
    });
  };

  const startCleanup = () => {
    if (!document.documentElement || window.__sbTildaCleanupStarted) {
      return;
    }

    window.__sbTildaCleanupStarted = true;
    const observer = new MutationObserver(hideBadge);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const intervalId = window.setInterval(hideBadge, 500);
    const stopCleanup = () => {
      window.clearInterval(intervalId);
      observer.disconnect();
    };

    hideBadge();
    window.addEventListener("load", hideBadge, { once: true });
    window.addEventListener("pageshow", hideBadge);
    window.setTimeout(hideBadge, 100);
    window.setTimeout(hideBadge, 700);
    window.setTimeout(hideBadge, 2000);
    window.setTimeout(stopCleanup, 30000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startCleanup, { once: true });
  } else {
    startCleanup();
  }
})();
</script>`;

function replaceDubaiCatalogBlock(html, filePath) {
  if (path.basename(filePath) !== "page63806411.html") {
    return html;
  }

  const startMarker = '<div id="rec1366959501"';
  const endMarker = '<div id="rec1803735931"';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);

  if (start === -1 || end === -1) {
    return html;
  }

  return `${html.slice(0, start)}${dubaiCatalogMarkup} ${html.slice(end)}`;
}

function stripDubaiLegalFooter(html, filePath) {
  if (!dubaiLegalPagesWithoutFooter.has(path.basename(filePath))) {
    return html;
  }

  const footerWithCommentsPattern =
    /\s*<!--footer-->\s*<footer id="t-footer"[^>]*>[\s\S]*?<\/footer>\s*<!--\/footer-->/i;
  const footerPattern = /\s*<footer id="t-footer"[^>]*>[\s\S]*?<\/footer>/i;

  const strippedWithComments = html.replace(footerWithCommentsPattern, "");
  if (strippedWithComments !== html) {
    return strippedWithComments;
  }

  return html.replace(footerPattern, "");
}

function injectHtmlEnhancements(html, filePath) {
  let updatedHtml = replaceDubaiCatalogBlock(html, filePath);
  updatedHtml = stripDubaiLegalFooter(updatedHtml, filePath);

  if (!updatedHtml.includes("data-sb-hide-tilda-label-style")) {
    if (updatedHtml.includes("</head>")) {
      updatedHtml = updatedHtml.replace("</head>", `${tildaLabelCleanupStyle}</head>`);
    } else {
      updatedHtml = `${tildaLabelCleanupStyle}${updatedHtml}`;
    }
  }

  if (!updatedHtml.includes("data-sb-hide-tilda-cleanup")) {
    if (updatedHtml.includes("</body>")) {
      updatedHtml = updatedHtml.replace("</body>", `${tildaLabelCleanupScript}</body>`);
    } else {
      updatedHtml = `${updatedHtml}${tildaLabelCleanupScript}`;
    }
  }

  return updatedHtml;
}

async function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  if (ext === ".html") {
    const html = await readFile(filePath, "utf8");
    res.writeHead(statusCode, {
      "Content-Type": contentType,
    });
    res.end(injectHtmlEnhancements(html, filePath));
    return;
  }

  res.writeHead(statusCode, {
    "Content-Type": contentType,
  });
  createReadStream(filePath).pipe(res);
}

function safePathname(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const normalized = path.posix.normalize(decoded);
  if (normalized.includes("..")) {
    return null;
  }
  return normalized;
}

async function resolveFile(urlPathname) {
  const normalized = safePathname(urlPathname);
  if (!normalized) {
    return null;
  }

  const directFile = path.join(__dirname, normalized);
  try {
    const fileStat = await stat(directFile);
    if (fileStat.isFile()) {
      return directFile;
    }
  } catch {}

  const rewritten = rewrites.get(normalized);
  if (rewritten) {
    return path.join(__dirname, rewritten);
  }

  if (normalized.startsWith("/bali/en/tours/")) {
    const slug = normalized.slice("/bali/en/tours/".length);
    if (slug) {
      const generatedTourFile = path.join(__dirname, `bali-tour-${slug}.html`);
      try {
        const fileStat = await stat(generatedTourFile);
        if (fileStat.isFile()) {
          return generatedTourFile;
        }
      } catch {}
    }
  }

  if (normalized.startsWith("/bali/en/journal/")) {
    const parts = normalized.slice("/bali/en/journal/".length).split("/").filter(Boolean);
    if (parts.length === 1) {
      const [guideSlug] = parts;
      const generatedGuideFile = path.join(__dirname, `bali-journal-guide-${guideSlug}.html`);
      try {
        const fileStat = await stat(generatedGuideFile);
        if (fileStat.isFile()) {
          return generatedGuideFile;
        }
      } catch {}
    }
    if (parts.length === 2) {
      const [tourSlug, articleSlug] = parts;
      const generatedJournalFile = path.join(__dirname, `bali-journal-${tourSlug}-${articleSlug}.html`);
      try {
        const fileStat = await stat(generatedJournalFile);
        if (fileStat.isFile()) {
          return generatedJournalFile;
        }
      } catch {}
    }
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = safePathname(url.pathname);

  if (!pathname) {
    await sendFile(res, path.join(__dirname, "404.html"), 404);
    return;
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const target = pathname.slice(0, -1);
    res.writeHead(301, { Location: target || "/" });
    res.end();
    return;
  }

  const redirectTarget = redirects.get(pathname);
  if (redirectTarget) {
    res.writeHead(302, { Location: redirectTarget });
    res.end();
    return;
  }

  const filePath = await resolveFile(pathname);
  if (filePath) {
    await sendFile(res, filePath);
    return;
  }

  await sendFile(res, path.join(__dirname, "404.html"), 404);
});

server.listen(port, () => {
  console.log(`SB Excursions preview is running at http://localhost:${port}`);
});

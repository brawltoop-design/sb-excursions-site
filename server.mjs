import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  ["/bali/en/main-page", "page128073236.html"],
  ["/bali/en/tours/nusa-penida-manta-rays-point", "page132181473.html"],
  ["/bali/en/tours/mount-batur-sunrise-hike", "page132812463.html"],
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

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(statusCode, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
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
  if (!rewritten) {
    return null;
  }

  return path.join(__dirname, rewritten);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = safePathname(url.pathname);

  if (!pathname) {
    sendFile(res, path.join(__dirname, "404.html"), 404);
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
    sendFile(res, filePath);
    return;
  }

  sendFile(res, path.join(__dirname, "404.html"), 404);
});

server.listen(port, () => {
  console.log(`SB Excursions preview is running at http://localhost:${port}`);
});

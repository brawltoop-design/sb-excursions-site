import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 8923);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
};

// Minimal mirror of the vercel.json rewrites needed for local checks.
function rewrite(urlPath) {
  let m;
  if ((m = urlPath.match(/^\/bali\/en\/tours\/nusa-penida-manta-rays-point$/))) return "/page132181473.html";
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh)\/tours\/nusa-penida-manta-rays-point$/))) return `/page132181473-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/en\/tours\/mount-batur-sunrise-hike$/))) return "/page132812463.html";
  if ((m = urlPath.match(/^\/bali\/en\/tours\/mount-batur-sunrise-jeep-hot-spring$/))) return "/page133629743.html";
  if ((m = urlPath.match(/^\/bali\/en\/tours\/([a-z0-9-]+)$/))) return `/bali-tour-${m[1]}.html`;
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh)\/tours\/([a-z0-9-]+)$/))) return `/bali-tour-${m[2]}-${m[1]}.html`;
  if (urlPath === "/bali/en/main-page") return "/page128073236.html";
  if ((m = urlPath.match(/^\/bali\/(ru|es|fr|zh)\/main-page$/))) return `/bali-main-page-${m[1]}.html`;
  // Dubai routes
  if (urlPath === "/dubai/en" || urlPath === "/dubai/en/main-page" || urlPath === "/dubai/en/blog") return "/page63806411.html";
  if ((m = urlPath.match(/^\/dubai\/en\/blog\/([a-z0-9-]+)$/))) return `/dubai-blog-${m[1]}.html`;
  if (urlPath === "/dubai/en/tours/full-day-dubai-desert-safari") return "/page106026336.html";
  if (urlPath === "/dubai/en/tours/abu-dhabi-city-tour-from-dubai") return "/page112638996.html";
  if (urlPath === "/dubai/en/tours/hot-air-balloon-sunrise-flight") return "/page114154666.html";
  if (urlPath === "/dubai/en/tours/dubai-marina-yacht-party") return "/page112631276.html";
  if (urlPath === "/dubai/en/tours/dubai-marina-1-hour-shared-yacht-tour") return "/page116517176.html";
  if (urlPath === "/dubai/en/about") return "/page112152236.html";
  if (urlPath === "/dubai/en/faq") return "/page112258706.html";
  if (urlPath === "/dubai/en/privacy-policy") return "/page112272486.html";
  if (urlPath === "/dubai/en/terms") return "/page112277396.html";

  if (urlPath === "/") return "/page128073236.html";
  return urlPath;
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (urlPath === "/dev-upload" && (req.method === "POST" || req.method === "OPTIONS")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "content-type, x-filename");
      if (req.method === "OPTIONS") {
        res.writeHead(204).end();
        return;
      }
      const name = String(req.headers["x-filename"] || "upload.bin").replace(/[^a-zA-Z0-9._-]/g, "_");
      const dest = path.join(root, ".generated", name);
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, Buffer.concat(chunks));
        res.writeHead(200, { "content-type": "application/json", "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify({ saved: dest, bytes: Buffer.concat(chunks).length }));
      });
      return;
    }
    let filePath = path.join(root, rewrite(urlPath));
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end("forbidden");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404).end("not found: " + urlPath);
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(filePath)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, () => console.log(`static server on http://localhost:${port}`));

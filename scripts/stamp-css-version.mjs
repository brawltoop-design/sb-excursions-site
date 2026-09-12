#!/usr/bin/env node
/**
 * Проставляет версию НАШИМ файлам стилей и скриптов во всех страницах.
 *
 * Зачем: vercel.json отдаёт css и js с кэшем на сутки плюс неделю
 * stale-while-revalidate. Ссылка без версии — и браузер держит старый файл до
 * восьми дней, при этом на сервере лежит уже новый. Правка «не доезжает»,
 * сборка при этом зелёная, а на живом сайте ничего не меняется.
 *
 * 9 сентября 2026 это стоило целого дня. В fonts-cinageo.css лёг touch-action
 * против бокового сдвига на телефоне; на сервере файл был правильный, а
 * браузер применял копию из кэша — проверено через CSSOM: в применённом файле
 * не было ни одного нового правила. Список целей тогда состоял из
 * sb-static-parity.css и fonts-manrope.css, то есть версия ставилась
 * файлу-наследию, а два главных стиля сайта — fonts-cinageo.css (2002
 * страницы) и bali-tour-pages.css (1768 страниц) — и sb-consent.js, который
 *管 gates аналитику, ехали голыми.
 *
 * Поэтому цели больше не пишутся руками: берём всё своё из css/ и js/,
 * исключая вендорское (tilda-*, hammer, lazyload). Ниже — проверка по
 * результату: если хоть одна наша ссылка осталась без версии, сборка падает.
 *
 * Запуск:  node scripts/stamp-css-version.mjs [версия] [--dry]
 * По умолчанию версия — хеш содержимого самого файла.
 *
 * Хеш, а не дата: шаг входит в сборку, а сборка идёт часто. С датой каждая
 * первая сборка нового дня переписывала бы ссылку на всех страницах и
 * сбрасывала кэш у людей, хотя стили не менялись. Тот же приём, что в
 * add-partner-ref.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry");
const argVersion = process.argv.slice(2).find((a) => /^[0-9a-z]{6,}$/.test(a));

/* Вендорское не трогаем: эти файлы приходят из экспорта Tilda, не меняются
   и версия им не нужна. Всё остальное в css/ и js/ — наше. */
const ВЕНДОР = /^(?:tilda-|hammer\b|lazyload-|jquery)/;

/* Подприложения тоже наши: у планировщика свои css/ и js/, и там версия
   ставилась руками — часть файлов датой, lexicon.js и parse.js вовсе без
   неё. Руками — значит рано или поздно забудется. */
const ASSET_DIRS = ["css", "js", "ai-planner/css", "ai-planner/js"];

function ownAssets() {
  const out = [];
  for (const dir of ASSET_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (!/\.(css|js)$/.test(name)) continue;
      if (ВЕНДОР.test(name)) continue;
      out.push(`/${dir}/${name}`);
    }
  }
  return out.sort();
}

const TARGETS = ownAssets();

/* Версия по содержимому: правка — новая ссылка, пересборка без правок — та же.
   Хеш считаем так же, как остальные шаги (sha256, первые 8), чтобы повторная
   пометка уже помеченного файла ничего не меняла. */
const versionOf = new Map();
for (const target of TARGETS) {
  const abs = path.join(ROOT, target.replace(/^\//, ""));
  if (!fs.existsSync(abs)) continue;
  versionOf.set(
    target,
    argVersion || createHash("sha256").update(fs.readFileSync(abs)).digest("hex").slice(0, 8),
  );
}

const files = [];
for (const dir of [ROOT, path.join(ROOT, "files"), path.join(ROOT, "ai-planner")]) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".html")) files.push(path.join(dir, name));
  }
}

let touched = 0;
let stamped = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let html = original;
  for (const target of TARGETS) {
    const version = versionOf.get(target);
    if (!version) continue;
    // и голые ссылки, и уже помеченные прежней версией
    const re = new RegExp(`${target.replace(/[/.]/g, "\\$&")}(\\?v=[0-9a-zA-Z]+)?`, "g");
    html = html.replace(re, () => {
      stamped += 1;
      return `${target}?v=${version}`;
    });
  }
  if (html !== original) {
    if (!DRY) fs.writeFileSync(file, html);
    touched += 1;
  }
}

/* Сторож по результату, а не по факту замены. Именно отсутствие такой
   проверки и держало fonts-cinageo.css без версии: шаг отрабатывал, счётчик
   рос, а самый правимый файл сайта в списке целей просто не значился. */
const ГОЛАЯ = /\/(?:css|js)\/([A-Za-z0-9._-]+\.(?:css|js))(?!\?v=)/g;
const голые = new Map();
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(ГОЛАЯ)) {
    const name = m[1];
    if (ВЕНДОР.test(name)) continue;
    if (!голые.has(name)) голые.set(name, new Set());
    голые.get(name).add(path.basename(file));
  }
}

console.log(JSON.stringify({
  режим: DRY ? "проверка" : "применено",
  нашихФайлов: TARGETS.length,
  версии: Object.fromEntries(versionOf),
  ссылокПомечено: stamped,
  файлов: touched,
  безВерсии: голые.size,
  ...(голые.size ? { чтоБезВерсии: Object.fromEntries([...голые].map(([n, s]) => [n, s.size])) } : {}),
}, null, 1));

if (голые.size && !DRY) process.exitCode = 1;

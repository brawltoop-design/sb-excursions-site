#!/usr/bin/env node
/**
 * Переводит сайт на один шрифт — Manrope.
 *
 * Что делает на каждой странице:
 *  1) подключает /css/fonts-manrope.css (был не везде);
 *  2) убирает подключение Cina GEO и внешнего TildaSans с CDN Tilda;
 *  3) заменяет 'Cina GEO' и 'TildaSans' в стеках font-family на Manrope;
 *  4) снимает preload/preconnect для TildaSans — он больше не нужен,
 *     вместо него греем свой шрифт (он на том же домене, что и сайт).
 *
 * Правило показа страницы (html body{opacity:1}) заранее перенесено в
 * css/sb-static-parity.css, поэтому удаление fonts-cinageo.css безопасно.
 *
 * Запуск:  node scripts/single-font-manrope.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry");

const MANROPE_LINK = `<link rel="stylesheet" href="/css/fonts-manrope.css">`;
const PARITY_LINK = `<link rel="stylesheet" href="/css/sb-static-parity.css">`;
const MANROPE_PRELOAD = `<link rel="preload" as="font" type="font/woff2" href="/css/fonts/manrope/manrope-latin.woff2" crossorigin>`;
const HIDE = `<style>body{opacity:0!important}</style>`;

const files = [];
for (const dir of [ROOT, path.join(ROOT, "files")]) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".html")) files.push(path.join(dir, name));
  }
}

const stats = {
  manropeLinked: 0,
  parityLinked: 0,
  cinageoUnlinked: 0,
  tildasansUnlinked: 0,
  stacksRewritten: 0,
  hintsSwapped: 0,
  touched: 0,
};

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let html = original;

  // 1) убираем подключение Cina GEO
  const cinaLink = /<link[^>]+href="\/css\/fonts-cinageo\.css"[^>]*>/g;
  if (cinaLink.test(html)) {
    html = html.replace(cinaLink, "");
    stats.cinageoUnlinked += 1;
  }

  // 2) убираем внешний TildaSans
  const tildaSansLink = /<link[^>]+fonts-tildasans\.css[^>]*>/g;
  if (tildaSansLink.test(html)) {
    html = html.replace(tildaSansLink, "");
    stats.tildasansUnlinked += 1;
  }

  // 3) подсказки: TildaSans больше не грузим, греем свой Manrope
  const oldHints =
    /<link id="sb-font-hints"[^>]*>\s*<link[^>]+TildaSans-VF\.woff2[^>]*>/g;
  if (oldHints.test(html)) {
    html = html.replace(oldHints, MANROPE_PRELOAD);
    stats.hintsSwapped += 1;
  }

  // 4) подключаем Manrope сразу после скрывающего стиля, если его ещё нет
  if (html.includes(HIDE) && !html.includes('href="/css/fonts-manrope.css"')) {
    html = html.replace(HIDE, HIDE + MANROPE_LINK);
    stats.manropeLinked += 1;
  }

  // 5) КРИТИЧНО: правило, возвращающее видимость страницы, живёт в
  // sb-static-parity.css. Раньше страницы журнала его не грузили — им
  // хватало fonts-cinageo.css, которого больше нет. Без этой строки
  // 630 страниц остались бы белыми навсегда.
  if (html.includes(HIDE) && !html.includes('href="/css/sb-static-parity.css"')) {
    html = html.replace(HIDE, HIDE + PARITY_LINK);
    stats.parityLinked += 1;
  }

  // 5) переписываем стеки шрифтов
  const before = html;
  html = html
    .replaceAll("'Cina GEO','TildaSans',Arial,sans-serif", "'Manrope',Arial,sans-serif")
    .replaceAll("'Cina GEO', 'TildaSans', Arial, sans-serif", "'Manrope', Arial, sans-serif")
    .replaceAll('"Cina GEO", TildaSans, Arial, sans-serif', '"Manrope", Arial, sans-serif')
    .replaceAll("'Cina GEO'", "'Manrope'")
    .replaceAll('"Cina GEO"', '"Manrope"')
    .replaceAll("'TildaSans'", "'Manrope'")
    .replaceAll('"TildaSans"', '"Manrope"')
    .replaceAll("TildaSans", "Manrope");
  if (html !== before) stats.stacksRewritten += 1;

  if (html !== original) {
    if (!DRY) fs.writeFileSync(file, html);
    stats.touched += 1;
  }
}

// стеки в собранных css Tilda
let cssTouched = 0;
const cssDir = path.join(ROOT, "css");
for (const name of fs.readdirSync(cssDir)) {
  if (!name.endsWith(".css")) continue;
  if (name === "fonts-manrope.css") continue;
  const p = path.join(cssDir, name);
  const original = fs.readFileSync(p, "utf8");
  let css = original
    .replaceAll("'Cina GEO','TildaSans',Arial,sans-serif", "'Manrope',Arial,sans-serif")
    .replaceAll("'Cina GEO'", "'Manrope'")
    .replaceAll('"Cina GEO"', '"Manrope"')
    .replaceAll("'TildaSans'", "'Manrope'")
    .replaceAll('"TildaSans"', '"Manrope"')
    .replaceAll("TildaSans", "Manrope");
  if (css !== original) {
    if (!DRY) fs.writeFileSync(p, css);
    cssTouched += 1;
  }
}

console.log(JSON.stringify({ режим: DRY ? "проверка" : "применено", ...stats, cssФайлов: cssTouched }, null, 1));

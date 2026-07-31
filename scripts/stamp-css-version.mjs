#!/usr/bin/env node
/**
 * Проставляет версию нашим файлам стилей во всех страницах.
 *
 * Зачем: vercel.json отдаёт css с кэшем на сутки плюс неделю
 * stale-while-revalidate. Ссылки были без версии, поэтому браузер держал
 * старый файл и правки визуально «не доезжали» — при этом на сервере лежал
 * уже новый. Версия в адресе делает файл новым для браузера сразу.
 *
 * Запуск:  node scripts/stamp-css-version.mjs [версия] [--dry]
 * По умолчанию версия — сегодняшняя дата (ГГГГММДД).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry");
const argVersion = process.argv.slice(2).find((a) => /^\d{6,}$/.test(a));
const VERSION = argVersion || new Date().toISOString().slice(0, 10).replace(/-/g, "");

// только наши файлы; тильдовские не трогаем
const TARGETS = ["/css/sb-static-parity.css", "/css/fonts-manrope.css"];

const files = [];
for (const dir of [ROOT, path.join(ROOT, "files")]) {
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
    // и голые ссылки, и уже помеченные прежней версией
    const re = new RegExp(`${target.replace(/[/.]/g, "\\$&")}(\\?v=[0-9a-z]+)?`, "g");
    html = html.replace(re, (m) => {
      stamped += 1;
      return `${target}?v=${VERSION}`;
    });
  }
  if (html !== original) {
    if (!DRY) fs.writeFileSync(file, html);
    touched += 1;
  }
}

console.log(JSON.stringify({ режим: DRY ? "проверка" : "применено", версия: VERSION, ссылокПомечено: stamped, файлов: touched }, null, 1));

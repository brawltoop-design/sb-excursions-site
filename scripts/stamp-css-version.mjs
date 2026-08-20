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
 * По умолчанию версия — хеш содержимого самого файла стилей.
 *
 * Хеш, а не дата: шаг входит в сборку, а сборка идёт часто. С датой каждая
 * первая сборка нового дня переписывала бы ссылку на всех 233 страницах и
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

// только наши файлы; тильдовские не трогаем
const TARGETS = ["/css/sb-static-parity.css", "/css/fonts-manrope.css"];

/* Версия по содержимому: правка стилей — новая ссылка, пересборка без
   правок — та же. Если файла нет, метку не ставим вовсе: лучше голая
   ссылка, чем ссылка на версию, которой не существует. */
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
    const version = versionOf.get(target);
    if (!version) continue;
    // и голые ссылки, и уже помеченные прежней версией
    const re = new RegExp(`${target.replace(/[/.]/g, "\\$&")}(\\?v=[0-9a-z]+)?`, "g");
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

console.log(JSON.stringify({ режим: DRY ? "проверка" : "применено", версии: Object.fromEntries(versionOf), ссылокПомечено: stamped, файлов: touched }, null, 1));

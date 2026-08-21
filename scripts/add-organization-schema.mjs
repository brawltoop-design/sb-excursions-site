#!/usr/bin/env node
/*
 * Разметка организации на страницах, которые её потеряли.
 *
 * На 1558 страницах она есть — генератор кладёт её внутрь BlogPosting как
 * publisher и внутрь Product как seller. А страницы, собранные другими
 * путями (FAQ и «О нас» — копией с дубайских, хабы журнала и гайдов,
 * прайс-индекс, политики, Work With Us, шесть легаси-гайдов) не проходят
 * через тот же код и остаются вообще без привязки к компании.
 *
 * Почему это не мелочь: FAQ и политики — ровно те страницы, по которым
 * поисковик и языковая модель проверяют, живая ли за сайтом фирма. Там
 * лежат условия отмены, оплата, юридические тексты, а чьи они — из
 * разметки не следует. Один и тот же @id организации на всех страницах
 * склеивает их в одну сущность, разные страницы перестают выглядеть
 * набором несвязанных документов.
 *
 * Только страницы Бали. Дубайские трогать нельзя: там своя компания со
 * своим телефоном, и подсунуть им балийскую организацию — прямая ложь в
 * разметке. Страницы вне индекса (404) тоже пропускаем: размечать то,
 * что закрыто от поиска, незачем.
 *
 * Запуск после генерации: node scripts/add-organization-schema.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ORGANIZATION_SCHEMA } from "./site-identity.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DRY = process.argv.includes("--dry");

/* Берём по имени файла, а не по содержимому: список страниц Бали, собранных
   в обход основного генератора. pageNNNN.html сюда не входят намеренно —
   это исходники Tilda, с которых копируют, а не то, что отдаётся по адресам
   туров (там свои bali-tour-*.html с полной разметкой). */
const TARGET = /^(bali-(faq|guides|journal|prices-index|privacy|terms|review)[a-z-]*\.html|bali-journal-guide-[a-z0-9-]+\.html|work-with-us[a-z-]*\.html)$/;

/* Метка, по которой узнаём, что организация уже стоит — неважно, вложена
   она в publisher или лежит отдельным узлом. */
const MARK = "#organization";

const block = `<script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
</script>
`;

const stats = { "подходящих файлов": 0, "уже была": 0, добавлено: 0, "некуда вставить": 0 };
const skipped = [];

for (const file of fs.readdirSync(ROOT).sort()) {
  if (!TARGET.test(file)) continue;
  const full = path.join(ROOT, file);
  if (!fs.statSync(full).isFile()) continue;
  stats["подходящих файлов"] += 1;

  const html = fs.readFileSync(full, "utf8");
  if (html.includes(MARK)) { stats["уже была"] += 1; continue; }

  /* Перед </head>: там уже лежат остальные ld+json, и до первой отрисовки
     разметку успевает увидеть даже краулер, который не ждёт тело. */
  const at = html.toLowerCase().lastIndexOf("</head>");
  if (at === -1) { stats["некуда вставить"] += 1; skipped.push(file); continue; }

  if (!DRY) fs.writeFileSync(full, html.slice(0, at) + block + html.slice(at));
  stats.добавлено += 1;
}

console.log(JSON.stringify({ ...stats, режим: DRY ? "проверка" : "применено" }, null, 1));
if (skipped.length) console.log("без </head>:", skipped.join(", "));

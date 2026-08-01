/*
 * Полная сборка сайта: генератор плюс все пост-обработки.
 *
 * Генератор перезаписывает страницы целиком и ничего не знает о шагах,
 * которые идут после него, — запустишь его в одиночку и молча потеряешь
 * защиту от мигания на 600 страницах и счётчик посещаемости на 840.
 * Поэтому запускать всегда через этот файл:
 *
 *     node scripts/build.mjs
 *
 * Порядок важен: сначала генерация, потом всё, что дописывает в готовый HTML.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const STEPS = [
  ["generate-bali-tour-pages.mjs", "генерация страниц туров, журнала и гайдов"],
  ["fix-fouc.mjs", "защита от мигания при загрузке"],
  ["add-vercel-analytics.mjs", "счётчик посещаемости Vercel"],
  ["build-llms-txt.mjs", "llms.txt — карта сайта для нейросетей"],
  ["build-og-images.mjs", "картинки 1200x630 для превью ссылок"],
];

for (const [script, label] of STEPS) {
  process.stdout.write(`\n▶ ${label}\n`);
  execFileSync(process.execPath, [path.join(ROOT, "scripts", script)], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

process.stdout.write("\n✓ сборка завершена\n");

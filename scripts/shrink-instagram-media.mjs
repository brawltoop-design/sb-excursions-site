/* Приводим скачанные с Pexels фото к разумному размеру.
 *
 * Оригиналы приходят по 6000x8000 и 5-7 МБ. Для карточки 1080x1350 это втрое
 * больше, чем нужно даже с запасом на ретину, а Figma на таких файлах ощутимо
 * тормозит. Ужимаем длинную сторону до 3000 px: остаётся вдвое больше, чем
 * Instagram когда-либо покажет, и место для кадрирования.
 *
 * Ничего не теряется безвозвратно: ссылка на оригинал каждого кадра лежит
 * в _pexels-credits.json рядом.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PACK = path.join(ROOT, "instagram-pack");
const MAX = 3000;

let before = 0, after = 0, touched = 0, kept = 0;
for (const dir of (await fs.readdir(PACK, { withFileTypes: true })).filter((d) => d.isDirectory())) {
  const folder = path.join(PACK, dir.name);
  for (const file of await fs.readdir(folder)) {
    if (!/^extra-\d+.*\.jpe?g$/i.test(file)) continue;
    const p = path.join(folder, file);
    const size0 = (await fs.stat(p)).size;
    const meta = await sharp(p).metadata();
    if (Math.max(meta.width || 0, meta.height || 0) <= MAX) { kept++; before += size0; after += size0; continue; }
    const buf = await sharp(p)
      .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    if (buf.length < size0) {
      await fs.writeFile(p, buf);
      before += size0; after += buf.length; touched++;
    } else { before += size0; after += size0; kept++; }
  }
}
const mb = (n) => (n / 1024 / 1024).toFixed(0) + " МБ";
console.log(JSON.stringify({
  "ужато файлов": touched, "оставлено как было": kept,
  "было": mb(before), "стало": mb(after),
  "сэкономлено": mb(before - after),
}, null, 1));

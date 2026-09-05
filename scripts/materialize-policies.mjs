/* Текст политик в HTML, а не в джаваскрипте.

   bali-privacy.html и bali-terms.html обслуживают по шесть языковых адресов
   из одного файла: язык выбирается на клиенте, а весь текст собирается
   инлайновым скриптом на 21 и 16 тысяч символов. Для браузера это работает,
   но ИИ-краулеры JS не исполняют — им обе страницы отдавали шесть-восемь слов
   («Privacy Policy — SB Excursions WhatsApp») на 14 адресов сразу.

   Канониклы обеих страниц ведут на английскую версию, поэтому достаточно
   материализовать английский текст: индексируется именно он. Логику не
   дублируем — выполняем тот же скрипт в песочнице с заглушкой document
   и забираем готовый HTML. Скрипт остаётся на месте и продолжает
   переключать язык в браузере. */
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PAGES = [
  { file: "bali-privacy.html", route: "/bali/en/privacy-policy" },
  { file: "bali-terms.html", route: "/bali/en/terms" },
];

function renderEnglish(scriptBody, route) {
  const nodes = new Map();
  const node = (id) => {
    if (!nodes.has(id)) nodes.set(id, { innerHTML: "", textContent: "", href: "" });
    return nodes.get(id);
  };
  const sandbox = {
    document: {
      documentElement: {},
      title: "",
      getElementById: node,
      querySelector: () => null,
      addEventListener: () => {},
    },
    location: { pathname: route, search: "", href: `https://www.sbexcursion.com${route}` },
    URLSearchParams,
    console,
  };
  vm.runInNewContext(scriptBody, vm.createContext(sandbox), { timeout: 5000 });
  return {
    content: node("content").innerHTML,
    title: node("tTitle").textContent,
    updated: node("tUpdated").textContent,
  };
}

const stats = [];

for (const { file, route } of PAGES) {
  const full = path.join(ROOT, file);
  let html;
  try {
    html = await fs.readFile(full, "utf8");
  } catch {
    continue;
  }

  /* Нужен именно тот скрипт, который наполняет #content: на странице их
     несколько, включая аналитику. */
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
  const target = scripts.find((m) => m[1].includes("getElementById('content')"));
  if (!target) {
    stats.push({ file, статус: "скрипт не найден" });
    continue;
  }

  let rendered;
  try {
    rendered = renderEnglish(target[1], route);
  } catch (error) {
    stats.push({ file, статус: `не выполнился: ${error.message}` });
    continue;
  }
  if (!rendered.content || rendered.content.length < 500) {
    stats.push({ file, статус: `пусто (${rendered.content.length} симв)` });
    continue;
  }

  let out = html;
  const before = out;

  /* Шаг должен быть идемпотентен: сборка эти два файла не перегенерирует,
     значит при повторном запуске он видит уже вставленный текст. Без маркеров
     нежадная регулярка обрывалась на первом </div> ВНУТРИ вставки и дописывала
     содержимое второй раз — политика удваивалась, и это не падало. */
  const START = "<!--sb-policy-->";
  const END = "<!--/sb-policy-->";
  const payload = `${START}${rendered.content}${END}`;

  out = out.includes(START)
    ? out.replace(new RegExp(`${START}[\\s\\S]*?${END}`), payload)
    : out.replace(
        /(<div id="content"[^>]*>)[\s\S]*?(<\/div>)/,
        (_, open, close) => `${open}${payload}${close}`,
      );
  if (rendered.title) {
    out = out.replace(/(<[^>]*id="tTitle"[^>]*>)[\s\S]*?(<\/[a-z0-9]+>)/i, (_, o, c) => `${o}${rendered.title}${c}`);
  }
  if (rendered.updated) {
    out = out.replace(/(<[^>]*id="tUpdated"[^>]*>)[\s\S]*?(<\/[a-z0-9]+>)/i, (_, o, c) => `${o}${rendered.updated}${c}`);
  }

  if (out === before) {
    stats.push({ file, статус: out.includes(START) ? "уже актуально" : "цель для вставки не найдена" });
    continue;
  }

  await fs.writeFile(full, out);
  const visible = out
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  stats.push({ file, "слов краулеру": visible.split(" ").length });
}

console.log(JSON.stringify(stats, null, 2));

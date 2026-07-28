#!/usr/bin/env node
/**
 * Gate analytics trackers behind consent across all static HTML files.
 *  - Clarity / Metrika / GTM / Tilda-Stat GA scripts -> type="text/plain" data-sb-gated
 *  - Metrika <noscript> pixel removed (fires unconditionally otherwise)
 *  - <script src="/js/sb-consent.js" defer> injected where trackers exist
 *  - Bali pages: footer policy links repointed from /dubai/en/* to /bali/<lang>/*
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const files = [];
for (const dir of [ROOT, path.join(ROOT, 'files')]) {
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith('.html')) files.push(path.join(dir, name));
  }
}

function classify(script) {
  if (/clarity\.ms/.test(script)) return 'clarity';
  if (/mc\.yandex/.test(script)) return 'metrika';
  if (/googletagmanager\.com\/gtm\.js/.test(script)) return 'gtm';
  if (/GoogleAnalyticsObject|googletagmanager\.com\/gtag/.test(script)) return 'ga';
  return null;
}

function gateOpenTag(openTag, name) {
  let tag = openTag;
  if (/type\s*=\s*"(text\/javascript|application\/javascript)"/.test(tag)) {
    tag = tag.replace(/type\s*=\s*"(?:text\/javascript|application\/javascript)"/, 'type="text/plain"');
  } else if (!/type\s*=/.test(tag)) {
    tag = tag.replace(/^<script/, '<script type="text/plain"');
  }
  if (!/data-sb-gated/.test(tag)) {
    tag = tag.replace(/>$/, ` data-sb-gated="analytics" data-sb-name="${name}">`);
  }
  return tag;
}

// Bali page detection: bali-*.html, west template, main page pair, legacy bali pages
function isBaliFile(file) {
  const base = path.basename(file);
  if (base.startsWith('bali-')) return true;
  if (/^page(128064616|128073236|132181473|132812463|133629743)/.test(base)) return true;
  if (base === 'page128073236body.html') return true;
  return false;
}

function baliLang(file) {
  const m = path.basename(file).match(/-(ru|es|fr|zh)\.html$/);
  return m ? m[1] : 'en';
}

let stats = { gated: 0, noscript: 0, consent: 0, footer: 0, filesTouched: 0 };

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  let hasGated = /data-sb-gated/.test(html);

  // 1) gate tracker scripts
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (block) => {
    const name = classify(block);
    if (!name) return block;
    if (/data-sb-gated/.test(block)) { hasGated = true; return block; }
    const end = block.indexOf('>') + 1;
    const openTag = block.slice(0, end);
    if (/type\s*=\s*"text\/plain"/.test(openTag)) { hasGated = true; return block; }
    stats.gated++;
    hasGated = true;
    return gateOpenTag(openTag, name) + block.slice(end);
  });

  // 2) remove Metrika noscript pixel + GTM noscript iframe (both fire without consent)
  html = html.replace(/<noscript>(?:(?!<\/noscript>)[\s\S])*?mc\.yandex[\s\S]*?<\/noscript>/g, () => {
    stats.noscript++;
    return '';
  });
  html = html.replace(/<noscript>(?:(?!<\/noscript>)[\s\S])*?googletagmanager\.com\/ns\.html[\s\S]*?<\/noscript>/g, () => {
    stats.noscript++;
    return '';
  });

  // 3) inject consent loader
  if (hasGated && !html.includes('/js/sb-consent.js')) {
    const inc = '<script src="/js/sb-consent.js" defer></script>';
    if (html.includes('</body>')) {
      const idx = html.lastIndexOf('</body>');
      html = html.slice(0, idx) + inc + '\n' + html.slice(idx);
    } else {
      html += '\n' + inc + '\n';
    }
    stats.consent++;
  }

  // 4) Bali footer policy links
  if (isBaliFile(file)) {
    const lang = baliLang(file);
    const before = html;
    html = html
      .split('href="/dubai/en/privacy-policy"').join(`href="/bali/${lang}/privacy-policy"`)
      .split('href="/dubai/en/terms"').join(`href="/bali/${lang}/terms"`)
      .split('href="/dubai/en/faq#refund"').join(`href="/bali/${lang}/terms#refund"`);
    if (html !== before) stats.footer++;
  }

  if (html !== orig) {
    fs.writeFileSync(file, html);
    stats.filesTouched++;
  }
}

console.log(JSON.stringify(stats, null, 2));

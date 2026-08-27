import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.json')) out.push(p);
  }
  return out;
}

const PACKAGE_PHRASES = [
  ['Facebook Page Likes', 'Me gusta de Página de Facebook'],
  ['Facebook Post Likes', 'Me gusta de publicaciones de Facebook'],
  ['Instagram Likes', 'Me gusta de Instagram'],
  ['Instagram Views', 'visualizaciones de Instagram'],
  ['TikTok Likes', 'Me gusta de TikTok'],
  ['TikTok Views', 'visualizaciones de TikTok'],
];

function localizePackage(name, locale) {
  if (locale !== 'es') return name;
  let out = name;
  for (const [en, es] of PACKAGE_PHRASES) {
    if (out.includes(en)) out = out.split(en).join(es);
  }
  return out;
}

function decorate(text, locale) {
  if (locale !== 'es') return text;
  let out = text;
  out = out.replace(/(?<![A-Za-z])Likes(?![A-Za-z])/g, 'Me gusta');
  out = out.replace(/(?<![A-Za-z])Views(?![A-Za-z])/g, 'Visualizaciones');
  return out;
}

console.log({
  likes: localizePackage('1000 Instagram Likes', 'es'),
  views: localizePackage('1000 Instagram Views', 'es'),
  page: localizePackage('100 Facebook Page Likes', 'es'),
  enUnchanged: localizePackage('1000 Instagram Likes', 'en'),
  brandSafe: decorate('NovaLikes', 'es'),
  metric: decorate('Likes', 'es'),
  plus: decorate('+2,500 Likes', 'es'),
});

let nova = 0;
let badSlug = 0;
let badFaq = 0;
for (const f of walk('content/locales/es')) {
  const t = readFileSync(f, 'utf8');
  nova += (t.match(/NovaMe gusta/g) ?? []).length;
  const slugBlocks = t.match(/"serviceSlugs"\s*:\s*\[[^\]]*\]/g) ?? [];
  for (const b of slugBlocks) {
    if (/Me gusta|visualizaciones/.test(b) && !/buy-instagram-views|buy-instagram-likes/.test(b)) {
      // only flag if slug value itself was corrupted
    }
    if (/"buy-[^"]*Me gusta|"buy-[^"]*visualizaciones/.test(b)) badSlug += 1;
  }
  const faqBlocks = t.match(/"faqIds"\s*:\s*\[[^\]]*\]/g) ?? [];
  for (const b of faqBlocks) {
    if (/Me gusta|visualizaciones/.test(b)) badFaq += 1;
  }
}
console.log({ novaCorruption: nova, corruptedServiceSlugs: badSlug, corruptedFaqIds: badFaq });

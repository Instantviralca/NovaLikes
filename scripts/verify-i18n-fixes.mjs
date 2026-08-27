import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SKIP = new Set([
  'href', 'slug', 'purpose', 'primaryKeyword', 'supportingKeywords', 'path', 'id',
  'icon', 'tone', 'platform', 'order', 'active', 'type', 'src', 'language',
  'platformId', 'faqIds', 'packageIds',
]);

function walk(v, key, acc) {
  if (typeof v === 'string') {
    if (
      !SKIP.has(key) &&
      !/^\/buy-/.test(v) &&
      !/buy-(instagram|tiktok|facebook)-/.test(v) &&
      !/\.(webp|png|jpg)$/.test(v)
    ) {
      acc.push({ key, value: v });
    }
    return;
  }
  if (Array.isArray(v)) v.forEach((x, i) => walk(x, String(i), acc));
  else if (v && typeof v === 'object')
    for (const [k, val] of Object.entries(v)) walk(val, k, acc);
}

function countInLocale(loc) {
  const dir = path.join('content/locales', loc);
  const files = [
    'homepage.json',
    'service-faqs.json',
    'faq-items.json',
    'metadata.json',
    'tools.json',
    ...readdirSync(path.join(dir, 'services')).map((f) => `services/${f}`),
  ];
  let views = 0;
  let likes = 0;
  const viewSamples = [];
  const likeSamples = [];
  for (const f of files) {
    const acc = [];
    walk(JSON.parse(readFileSync(path.join(dir, f), 'utf8')), '', acc);
    for (const { key, value } of acc) {
      const vm = value.match(/\bviews\b/gi) ?? [];
      const lm = value.match(/\blikes\b/gi) ?? [];
      views += vm.length;
      likes += lm.length;
      if (vm.length && viewSamples.length < 5) viewSamples.push({ file: f, key, snippet: value.slice(0, 80) });
      if (lm.length && likeSamples.length < 5) likeSamples.push({ file: f, key, snippet: value.slice(0, 80) });
    }
  }
  console.log(JSON.stringify({ loc, views, likes, viewSamples, likeSamples }, null, 2));
}

countInLocale('es');
countInLocale('it');

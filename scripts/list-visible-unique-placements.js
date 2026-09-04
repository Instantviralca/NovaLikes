const r = require('../data/market-unique-service-images.json');
const excl = new Set(['likes-vs-views', 'real-experience', 'profile-experience', 'page-trust']);
const all = r.placements.filter((p) => !excl.has(p.sectionId));
const groups = {};
for (const p of all) {
  const k = `${p.market}|${p.slug}`;
  (groups[k] = groups[k] || []).push(p);
}
console.log('visible placements', all.length);
console.log('pages', Object.keys(groups).length);
for (const k of Object.keys(groups).sort()) {
  console.log(k, groups[k].length, groups[k].map((p) => p.sectionId).join(','));
}

const fs = require('fs');
const path = require('path');
const r = require('../data/market-unique-service-images.json');
const excl = new Set(['likes-vs-views', 'real-experience', 'profile-experience', 'page-trust']);
const cutoff = new Date('2026-09-03T09:00:00Z').getTime();
let fresh = 0;
let stale = 0;
let missing = 0;
const byPage = {};
for (const p of r.placements) {
  if (excl.has(p.sectionId)) continue;
  const fp = path.join(__dirname, '..', 'public', p.src.replace(/^\//, ''));
  const key = `${p.market}|${p.slug}`;
  if (!byPage[key]) byPage[key] = { fresh: 0, stale: 0, missing: 0, total: 0 };
  byPage[key].total++;
  if (!fs.existsSync(fp)) {
    missing++;
    byPage[key].missing++;
    continue;
  }
  const st = fs.statSync(fp);
  const isFresh = st.mtimeMs >= cutoff && st.size > 25000;
  if (isFresh) {
    fresh++;
    byPage[key].fresh++;
  } else {
    stale++;
    byPage[key].stale++;
  }
}
console.log(`FRESH ${fresh} STALE ${stale} MISSING ${missing} TOTAL ${fresh + stale + missing}`);
for (const k of Object.keys(byPage).sort()) {
  const b = byPage[k];
  const tag = b.fresh === b.total ? 'DONE' : 'TODO';
  console.log(`${tag} ${k} ${b.fresh}/${b.total}`);
}

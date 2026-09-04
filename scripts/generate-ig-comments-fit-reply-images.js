/**
 * Generate unique story images for make-comments-fit + reply-genuine
 * across CA/AU/US/UK Instagram Comments pages, then register them.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function buildSvg(p) {
  const seed = hash32(`${p.num}|${p.route}|${p.sectionId}`);
  const rng = mulberry32(seed);
  const marketBias = { ca: 0, au: 1, us: 2, uk: 3 }[p.market] || 0;
  const bgA = pick(rng, ['#FFFBF7', '#FFF8F2', '#FFFBFA', '#FFF6EF']);
  const bgB = pick(rng, ['#FFE8D6', '#FFDCC8', '#F8E7DC', '#FFEFE4']);
  const accent = { a: '#E1306C', soft: '#FDEEF3' };
  const phoneX = lerp(520, 880, (rng() * 0.55 + marketBias * 0.1) % 1);
  const phoneY = lerp(140, 220, rng());
  const rot = lerp(-4, 4, rng());
  const isFit = p.sectionId === 'make-comments-fit';

  const bubbles = isFit
    ? `
      <g transform="translate(${phoneX - 180} ${phoneY + 120})">
        <rect width="200" height="56" rx="18" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <rect x="18" y="18" width="120" height="10" rx="5" fill="#E8DED6"/>
        <rect x="18" y="34" width="80" height="8" rx="4" fill="#F3EAE3"/>
      </g>
      <g transform="translate(${phoneX - 140} ${phoneY + 200})">
        <rect width="170" height="48" rx="16" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <rect x="16" y="16" width="100" height="10" rx="5" fill="#E8DED6"/>
      </g>`
    : `
      <g transform="translate(${phoneX < 700 ? phoneX + 280 : phoneX - 280} ${phoneY + 180})">
        <rect width="220" height="120" rx="22" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <circle cx="40" cy="40" r="16" fill="${accent.soft}" stroke="${accent.a}" stroke-width="2"/>
        <rect x="68" y="30" width="120" height="10" rx="5" fill="#E8DED6"/>
        <rect x="68" y="48" width="90" height="8" rx="4" fill="#F3EAE3"/>
        <rect x="24" y="74" width="170" height="28" rx="10" fill="#FFF7F1"/>
      </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgA}"/>
      <stop offset="100%" stop-color="${bgB}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#C4A090" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect width="1536" height="1024" fill="url(#bg)"/>
  <circle cx="${lerp(80, 360, rng())}" cy="${lerp(60, 280, rng())}" r="160" fill="${accent.soft}" opacity="0.5"/>
  <circle cx="${lerp(1100, 1400, rng())}" cy="${lerp(600, 860, rng())}" r="200" fill="#FFE0CC" opacity="0.38"/>
  <g filter="url(#soft)">
    <g transform="translate(${phoneX} ${phoneY}) rotate(${rot} 150 310)">
      <rect x="12" y="18" width="300" height="620" rx="48" fill="#E8DED6" opacity="0.35"/>
      <rect width="300" height="620" rx="48" fill="#1C1C1E"/>
      <rect x="10" y="10" width="280" height="600" rx="40" fill="#FFF9F5"/>
      <rect x="110" y="22" width="80" height="10" rx="5" fill="#E8DED6"/>
      <rect x="36" y="70" width="228" height="180" rx="22" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
      <rect x="52" y="270" width="196" height="44" rx="14" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
      <path d="M68 286h40M68 298h70" stroke="#E8DED6" stroke-width="8" stroke-linecap="round"/>
      <rect x="52" y="330" width="196" height="44" rx="14" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
      <path d="M68 346h50M68 358h60" stroke="#E8DED6" stroke-width="8" stroke-linecap="round"/>
      <rect x="52" y="390" width="196" height="44" rx="14" fill="${accent.soft}" stroke="${accent.a}" stroke-width="2"/>
      <circle cx="76" cy="412" r="10" fill="#FF7A45"/>
    </g>
    ${bubbles}
  </g>
</svg>`;
}

async function encode(svg, dest) {
  let quality = 68;
  let buf = await sharp(Buffer.from(svg), { density: 96 })
    .resize(1536, 1024, { fit: 'fill' })
    .webp({ quality, effort: 4 })
    .toBuffer();
  for (let i = 0; i < 5; i++) {
    const kb = buf.length / 1024;
    if (kb >= 12 && kb <= 40) break;
    if (kb > 40) quality = Math.max(40, quality - 6);
    else quality = Math.min(88, quality + 6);
    buf = await sharp(Buffer.from(svg), { density: 96 })
      .resize(1536, 1024, { fit: 'fill' })
      .webp({ quality, effort: 4 })
      .toBuffer();
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const markets = [
  { code: 'ca', name: 'canada', label: 'Canada' },
  { code: 'au', name: 'australia', label: 'Australia' },
  { code: 'us', name: 'usa', label: 'USA' },
  { code: 'uk', name: 'uk', label: 'UK' },
];

const sections = [
  {
    id: 'make-comments-fit',
    alt: (pk) =>
      `${pk} illustration showing Instagram comments that fit beside post content`,
  },
  {
    id: 'reply-genuine',
    alt: (pk) =>
      `${pk} illustration showing genuine Instagram questions answered with real business information`,
  },
];

async function main() {
  const appRegPath = path.join(ROOT, 'data/market-unique-service-images.json');
  const manPath = path.join(ROOT, 'reports/_unique-image-placements.json');
  const appReg = JSON.parse(fs.readFileSync(appRegPath, 'utf8'));
  const man = JSON.parse(fs.readFileSync(manPath, 'utf8'));

  let num = (man.placements?.length || 0) + 1;
  const added = [];

  for (const m of markets) {
    for (const s of sections) {
      const filename = `buy-instagram-comments-${m.name}-${s.id}.webp`;
      const webPath = `/assets/images/illustrations/markets/${m.code}/instagram-comments/${filename}`;
      const publicPath = `public/assets/images/illustrations/markets/${m.code}/instagram-comments/${filename}`;
      const pk = `Buy Instagram Comments ${m.label}`;
      const placement = {
        num: num++,
        market: m.code,
        marketName: m.name,
        marketLabel: m.label,
        route: `/${m.code}/buy-instagram-comments`,
        slug: 'buy-instagram-comments',
        platform: 'instagram',
        folder: 'instagram-comments',
        metric: 'Comments',
        primaryKeyword: pk,
        sectionHeading: s.id,
        sectionId: s.id,
        visualRole: 'story-side',
        currentPath: '(new)',
        newFilename: filename,
        newPublicPath: publicPath,
        webPath,
        altText: s.alt(pk),
        concept: s.id,
        style: 'minimal',
        dimensions: '1536×1024',
        aspect: '3:2',
        format: 'WebP',
        targetKB: '60–70',
      };

      const bytes = await encode(buildSvg(placement), path.join(ROOT, publicPath));
      console.log(m.code, s.id, Math.round(bytes / 1024) + 'KB');

      // dedupe if already present
      appReg.placements = appReg.placements.filter(
        (p) => !(p.market === m.code && p.slug === 'buy-instagram-comments' && p.sectionId === s.id),
      );
      man.placements = man.placements.filter(
        (p) => !(p.market === m.code && p.slug === 'buy-instagram-comments' && p.sectionId === s.id),
      );

      appReg.placements.push({
        market: m.code,
        slug: 'buy-instagram-comments',
        sectionId: s.id,
        visualRole: 'story-side',
        src: webPath,
        alt: s.alt(pk),
      });
      man.placements.push(placement);
      added.push(webPath);
    }
  }

  man.meta = man.meta || {};
  man.meta.total = man.placements.length;
  fs.writeFileSync(appRegPath, JSON.stringify(appReg));
  fs.writeFileSync(manPath, JSON.stringify(man, null, 2));
  console.log('added', added.length, 'total app', appReg.placements.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

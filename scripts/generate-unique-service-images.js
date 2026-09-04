/**
 * Generate 498 unique minimal NovaLikes service-page WebP assets (fast).
 * Run: node scripts/generate-unique-service-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const MANIFEST = path.join(ROOT, 'reports/_unique-image-placements.json');

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

function platformAccent(platform) {
  if (platform === 'tiktok') return { a: '#25F4EE', b: '#FE2C55', soft: '#E8FBFA' };
  if (platform === 'facebook') return { a: '#1877F2', b: '#42A5F5', soft: '#E8F1FC' };
  return { a: '#E1306C', b: '#F77737', soft: '#FDEEF3' };
}

function metricGlyph(metric) {
  const m = (metric || '').toLowerCase();
  if (m.includes('like')) {
    return `<path d="M16 28c0 0-12-7.2-12-15.2C4 8.2 7.6 5 12 5c2.6 0 4.8 1.2 6 3.1C19.2 6.2 21.4 5 24 5c4.4 0 8 3.2 8 7.8C32 20.8 20 28 16 28z" fill="#FF7A45"/>`;
  }
  if (m.includes('view')) {
    return `<path d="M16 7C8 7 2.2 14.2 1 16c1.2 1.8 7 9 15 9s13.8-7.2 15-9c-1.2-1.8-7-9-15-9zm0 13a4 4 0 110-8 4 4 0 010 8z" fill="#FF7A45"/>`;
  }
  if (m.includes('comment')) {
    return `<path d="M6 6h20a4 4 0 014 4v10a4 4 0 01-4 4H14l-6 5v-5H6a4 4 0 01-4-4V10a4 4 0 014-4z" fill="#FF7A45"/>`;
  }
  return `<circle cx="12" cy="12" r="5" fill="#FF7A45"/><path d="M3 27c0-5 4-8 9-8s9 3 9 8" fill="#FF7A45"/><circle cx="23" cy="13" r="4" fill="#FFB08A"/><path d="M18 27c.6-3.4 3.2-5.5 6.8-5.5 3.2 0 5.8 1.7 6.7 4.5" fill="#FFB08A"/>`;
}

function isLocalStory(id) {
  return [
    'local-businesses',
    'more-business',
    'business-results',
    'real-business-content',
    'useful-next-step',
    'content-people-need',
  ].includes(id);
}

function buildSvg(p) {
  const seed = hash32(`${p.num}|${p.route}|${p.sectionId}|${p.visualRole}`);
  const rng = mulberry32(seed);
  const accent = platformAccent(p.platform);
  const marketBias = { ca: 0, au: 1, us: 2, uk: 3 }[p.market] || 0;

  const phoneX = lerp(500, 880, (rng() * 0.6 + marketBias * 0.09) % 1);
  const phoneY = lerp(130, 230, rng());
  const rot = lerp(-5, 5, rng());
  const cardMode =
    p.visualRole === 'final-cta' || p.visualRole === 'why-buy' || p.visualRole === 'can-you-buy'
      ? true
      : rng() > 0.55;
  const showSecondary =
    p.visualRole === 'does-help' ||
    (p.visualRole === 'story-side' &&
      (p.sectionId.includes('reach') ||
        p.sectionId.includes('proof') ||
        p.sectionId.includes('customer') ||
        p.sectionId.includes('organic')));
  const floatCount = 1 + Math.floor(rng() * 2);

  const bgA = pick(rng, ['#FFFBF7', '#FFF8F2', '#FFFBFA', '#FFF6EF']);
  const bgB = pick(rng, ['#FFE8D6', '#FFDCC8', '#F8E7DC', '#FFEFE4']);
  const blob1x = lerp(60, 420, rng());
  const blob1y = lerp(40, 320, rng());
  const blob2x = lerp(980, 1420, rng());
  const blob2y = lerp(480, 880, rng());

  const floatEls = [];
  for (let i = 0; i < floatCount; i++) {
    const fx = lerp(100, 1400, (rng() + i * 0.31 + marketBias * 0.07) % 1);
    const fy = lerp(100, 900, rng());
    const size = lerp(58, 96, rng());
    const kind = pick(rng, ['pill', 'dot', 'chip']);
    if (kind === 'pill') {
      floatEls.push(
        `<rect x="${fx}" y="${fy}" width="${size * 1.75}" height="${size * 0.52}" rx="${size * 0.26}" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>`,
      );
      floatEls.push(
        `<circle cx="${fx + size * 0.34}" cy="${fy + size * 0.26}" r="${size * 0.15}" fill="${accent.a}" opacity="0.88"/>`,
      );
    } else if (kind === 'chip') {
      floatEls.push(
        `<rect x="${fx}" y="${fy}" width="${size}" height="${size}" rx="18" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>`,
      );
      floatEls.push(
        `<g transform="translate(${fx + size * 0.18} ${fy + size * 0.18}) scale(${size / 52})">${metricGlyph(p.metric)}</g>`,
      );
    } else {
      floatEls.push(
        `<circle cx="${fx}" cy="${fy}" r="${size * 0.2}" fill="${accent.b}" opacity="0.32"/>`,
      );
    }
  }

  let focal = '';
  if (cardMode && p.visualRole !== 'hero') {
    const cx = lerp(460, 920, (rng() + marketBias * 0.11) % 1);
    const cy = lerp(160, 280, rng());
    const w = 420;
    const h = 520;
    focal = `
      <g transform="translate(${cx} ${cy}) rotate(${rot * 0.35} ${w / 2} ${h / 2})">
        <rect x="12" y="20" width="${w}" height="${h}" rx="36" fill="#E8DED6" opacity="0.32"/>
        <rect width="${w}" height="${h}" rx="36" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="3"/>
        <rect x="28" y="36" width="${w - 56}" height="72" rx="20" fill="${accent.soft}"/>
        <circle cx="72" cy="72" r="22" fill="${accent.a}" opacity="0.9"/>
        <rect x="108" y="58" width="180" height="14" rx="7" fill="#E8DED6"/>
        <rect x="108" y="80" width="120" height="10" rx="5" fill="#F3EAE3"/>
        <rect x="28" y="140" width="${w - 56}" height="160" rx="22" fill="#FFF7F1"/>
        <g transform="translate(${w / 2 - 24} 190) scale(1.5)">${metricGlyph(p.metric)}</g>
        <rect x="28" y="330" width="${w - 56}" height="18" rx="9" fill="#F3EAE3"/>
        <rect x="28" y="366" width="${(w - 56) * 0.68}" height="14" rx="7" fill="#F7EEE7"/>
        <rect x="28" y="420" width="${w - 56}" height="56" rx="18" fill="#FF7A45" opacity="0.92"/>
      </g>`;
  } else {
    const pw = 300;
    const ph = 620;
    focal = `
      <g transform="translate(${phoneX} ${phoneY}) rotate(${rot} ${pw / 2} ${ph / 2})">
        <rect x="14" y="22" width="${pw}" height="${ph}" rx="48" fill="#E8DED6" opacity="0.38"/>
        <rect width="${pw}" height="${ph}" rx="48" fill="#1C1C1E"/>
        <rect x="10" y="10" width="${pw - 20}" height="${ph - 20}" rx="40" fill="#FFF9F5"/>
        <rect x="110" y="22" width="80" height="10" rx="5" fill="#E8DED6"/>
        <circle cx="60" cy="110" r="28" fill="${accent.soft}" stroke="${accent.a}" stroke-width="3"/>
        <rect x="100" y="98" width="140" height="12" rx="6" fill="#E8DED6"/>
        <rect x="100" y="118" width="100" height="9" rx="4" fill="#F3EAE3"/>
        <rect x="36" y="170" width="228" height="210" rx="24" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <g transform="translate(126 240) scale(1.6)">${metricGlyph(p.metric)}</g>
        <rect x="36" y="410" width="100" height="54" rx="16" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <rect x="150" y="410" width="114" height="54" rx="16" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <circle cx="86" cy="437" r="10" fill="#FF7A45" opacity="0.85"/>
        <circle cx="207" cy="437" r="10" fill="${accent.a}" opacity="0.75"/>
      </g>`;
  }

  let secondary = '';
  if (showSecondary) {
    const sx = phoneX > 750 ? lerp(140, 400, rng()) : lerp(980, 1240, rng());
    const sy = lerp(250, 430, rng());
    secondary = `
      <g transform="translate(${sx} ${sy}) rotate(${lerp(-3, 3, rng())})" opacity="0.92">
        <rect width="250" height="210" rx="28" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
        <rect x="22" y="26" width="150" height="12" rx="6" fill="#E8DED6"/>
        <rect x="22" y="52" width="110" height="10" rx="5" fill="#F3EAE3"/>
        <rect x="22" y="96" width="46" height="46" rx="14" fill="#F7F7F7" stroke="#E8E8E8"/>
        <rect x="80" y="96" width="46" height="46" rx="14" fill="#F7F7F7" stroke="#E8E8E8"/>
        <rect x="138" y="96" width="46" height="46" rx="14" fill="#F7F7F7" stroke="#E8E8E8"/>
        <rect x="22" y="164" width="190" height="10" rx="5" fill="#EEEEEE"/>
      </g>`;
  }

  let roleCue = '';
  if (p.visualRole === 'can-you-buy') {
    roleCue = `<g transform="translate(${lerp(160, 380, rng())} ${lerp(700, 830, rng())})">
      <rect width="280" height="64" rx="18" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
      <rect x="18" y="22" width="180" height="12" rx="6" fill="#E8DED6"/>
      <circle cx="240" cy="32" r="12" fill="#34C759" opacity="0.9"/>
    </g>`;
  } else if (p.visualRole === 'final-cta') {
    roleCue = `<g transform="translate(${lerp(180, 520, rng())} ${lerp(740, 870, rng())})">
      <rect width="220" height="56" rx="28" fill="#FF7A45"/>
    </g>`;
  } else if (isLocalStory(p.sectionId)) {
    roleCue = `<g transform="translate(${lerp(120, 340, rng())} ${lerp(680, 830, rng())})" opacity="0.95">
      <rect width="120" height="90" rx="16" fill="#FFFFFF" stroke="#F0E6DE" stroke-width="2"/>
      <rect x="20" y="50" width="80" height="28" rx="6" fill="#FFE8D6"/>
      <polygon points="60,18 96,50 24,50" fill="#FFB08A"/>
    </g>`;
  }

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
  <circle cx="${blob1x}" cy="${blob1y}" r="${lerp(110, 210, rng())}" fill="${accent.soft}" opacity="0.5"/>
  <circle cx="${blob2x}" cy="${blob2y}" r="${lerp(130, 250, rng())}" fill="#FFE0CC" opacity="0.38"/>
  <g filter="url(#soft)">
    ${secondary}
    ${focal}
    ${floatEls.join('\n')}
    ${roleCue}
  </g>
</svg>`;
}

async function encodeTarget(svg, dest) {
  let quality = 68;
  let buf = await sharp(Buffer.from(svg), { density: 96 })
    .resize(1536, 1024, { fit: 'fill' })
    .webp({ quality, effort: 4 })
    .toBuffer();

  for (let i = 0; i < 6; i++) {
    const kb = buf.length / 1024;
    if (kb >= 55 && kb <= 75) break;
    if (kb > 75) quality = Math.max(40, quality - 6);
    else quality = Math.min(90, quality + 6);
    buf = await sharp(Buffer.from(svg), { density: 96 })
      .resize(1536, 1024, { fit: 'fill' })
      .webp({ quality, effort: 4 })
      .toBuffer();
  }

  if (buf.length / 1024 > 80) {
    buf = await sharp(Buffer.from(svg), { density: 96 })
      .resize(1536, 1024, { fit: 'fill' })
      .webp({ quality: 42, effort: 5 })
      .toBuffer();
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const placements = data.placements;
  const sizes = [];
  const start = Date.now();

  // Parallel-ish batches for speed
  const concurrency = 4;
  let idx = 0;
  async function worker() {
    while (idx < placements.length) {
      const i = idx++;
      const p = placements[i];
      const dest = path.join(ROOT, p.newPublicPath);
      const svg = buildSvg(p);
      const bytes = await encodeTarget(svg, dest);
      sizes[i] = bytes / 1024;
      const done = sizes.filter((x) => typeof x === 'number').length;
      if (done % 50 === 0 || done === placements.length) {
        const ready = sizes.filter((x) => typeof x === 'number');
        const avg = ready.reduce((a, b) => a + b, 0) / ready.length;
        console.log(
          `progress ${done}/${placements.length} last=${(bytes / 1024).toFixed(1)}KB avg=${avg.toFixed(1)}KB`,
        );
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const ready = sizes.filter((x) => typeof x === 'number');
  const min = Math.min(...ready);
  const max = Math.max(...ready);
  const avg = ready.reduce((a, b) => a + b, 0) / ready.length;
  const summary = {
    generated: placements.length,
    minKB: +min.toFixed(1),
    maxKB: +max.toFixed(1),
    avgKB: +avg.toFixed(1),
    in55to75: ready.filter((k) => k >= 55 && k <= 75).length,
    over80: ready.filter((k) => k > 80).length,
    under55: ready.filter((k) => k < 55).length,
    elapsedMs: Date.now() - start,
  };
  fs.writeFileSync(
    path.join(ROOT, 'reports/_unique-image-generation-summary.json'),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

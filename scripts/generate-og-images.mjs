/**
 * Generate unique 1200×630 Open Graph WebP images for homepage + buy-* services.
 * Run: node scripts/generate-og-images.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'assets', 'images', 'og');
const logoPath = path.join(root, 'public', 'assets', 'logos', 'logo.png');

const W = 1200;
const H = 630;
const SUPPORT = 'Fast delivery • No password required • Secure checkout';

const BRAND = {
  orange: '#E85D04',
  orangeSoft: '#FFF4EB',
  ink: '#1A1A1A',
  muted: '#5C5C5C',
  page: '#FFFBF8',
  white: '#FFFFFF',
  border: '#EDE4DC',
  canada: '#D80621',
};

const PLATFORM = {
  instagram: { accent: '#E1306C', soft: '#FFF0F5', label: 'Instagram' },
  tiktok: { accent: '#111111', soft: '#F3FFFE', teal: '#00F2EA', label: 'TikTok' },
  facebook: { accent: '#1877F2', soft: '#F0F6FF', label: 'Facebook' },
  multi: { accent: '#E85D04', soft: '#FFF4EB', label: 'Global' },
};

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapHeadline(headline) {
  const words = headline.split(' ');
  if (headline.length <= 28) {
    return { line1: headline, line2: '' };
  }
  // Prefer break before  when present
  const canadaIdx = words.indexOf('Canada');
  if (canadaIdx > 0) {
    return {
      line1: words.slice(0, canadaIdx).join(' '),
      line2: words.slice(canadaIdx).join(' '),
    };
  }
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(' '),
    line2: words.slice(mid).join(' '),
  };
}

function metricVisual(kind, accent) {
  switch (kind) {
    case 'followers':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Audience growth</text>
        <circle cx="70" cy="120" r="28" fill="${accent}" opacity="0.9"/>
        <circle cx="120" cy="120" r="28" fill="${accent}" opacity="0.7"/>
        <circle cx="170" cy="120" r="28" fill="${accent}" opacity="0.55"/>
        <circle cx="220" cy="120" r="28" fill="${BRAND.orange}" opacity="0.85"/>
        <rect x="28" y="180" width="220" height="14" rx="7" fill="${BRAND.orangeSoft}"/>
        <rect x="28" y="180" width="160" height="14" rx="7" fill="${accent}"/>
        <rect x="28" y="210" width="180" height="14" rx="7" fill="${BRAND.orangeSoft}"/>
        <rect x="28" y="210" width="110" height="14" rx="7" fill="${BRAND.orange}"/>
        <rect x="28" y="250" width="150" height="40" rx="12" fill="${accent}"/>
        <text x="103" y="276" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${BRAND.white}">+ Followers</text>
      </g>`;
    case 'likes':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Engagement pulse</text>
        <g transform="translate(90,100)">
          <path d="M60 110 C60 70 20 55 20 90 C20 55 -20 70 -20 110 C-20 150 60 190 60 190 C60 190 140 150 140 110 C140 70 100 55 100 90 C100 55 60 70 60 110 Z" fill="${accent}"/>
        </g>
        <rect x="40" y="250" width="120" height="44" rx="14" fill="${accent}"/>
        <text x="100" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="${BRAND.white}">♥ Likes</text>
        <rect x="180" y="250" width="150" height="44" rx="14" fill="${BRAND.orangeSoft}"/>
        <text x="255" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${BRAND.orange}">Reaction ↑</text>
      </g>`;
    case 'views':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Reach analytics</text>
        <rect x="40" y="90" width="300" height="150" rx="18" fill="${BRAND.orangeSoft}"/>
        <polygon points="160,130 160,200 230,165" fill="${accent}"/>
        <rect x="50" y="260" width="40" height="40" rx="8" fill="${accent}" opacity="0.45"/>
        <rect x="105" y="245" width="40" height="55" rx="8" fill="${accent}" opacity="0.65"/>
        <rect x="160" y="230" width="40" height="70" rx="8" fill="${accent}" opacity="0.8"/>
        <rect x="215" y="210" width="40" height="90" rx="8" fill="${accent}"/>
        <rect x="270" y="195" width="40" height="105" rx="8" fill="${BRAND.orange}"/>
      </g>`;
    case 'comments':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Conversation</text>
        <rect x="40" y="80" width="240" height="70" rx="18" fill="${accent}" opacity="0.15"/>
        <rect x="55" y="95" width="160" height="12" rx="6" fill="${accent}" opacity="0.55"/>
        <rect x="55" y="118" width="120" height="12" rx="6" fill="${accent}" opacity="0.35"/>
        <rect x="100" y="170" width="240" height="70" rx="18" fill="${BRAND.orange}" opacity="0.12"/>
        <rect x="120" y="185" width="170" height="12" rx="6" fill="${BRAND.orange}" opacity="0.7"/>
        <rect x="120" y="208" width="130" height="12" rx="6" fill="${BRAND.orange}" opacity="0.4"/>
        <circle cx="300" cy="280" r="28" fill="${accent}"/>
        <text x="300" y="286" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${BRAND.white}">💬</text>
      </g>`;
    case 'subscribers':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Channel growth</text>
        <rect x="50" y="90" width="280" height="160" rx="20" fill="${BRAND.orangeSoft}"/>
        <circle cx="120" cy="155" r="36" fill="${accent}"/>
        <rect x="175" y="135" width="130" height="14" rx="7" fill="${BRAND.ink}" opacity="0.75"/>
        <rect x="175" y="160" width="90" height="12" rx="6" fill="${BRAND.muted}" opacity="0.45"/>
        <rect x="175" y="190" width="110" height="34" rx="10" fill="${accent}"/>
        <text x="230" y="212" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="${BRAND.white}">Subscribe</text>
        <text x="190" y="290" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="${accent}">Subscribers ↑</text>
      </g>`;
    case 'page-likes':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Page credibility</text>
        <rect x="50" y="90" width="280" height="180" rx="22" fill="${BRAND.orangeSoft}"/>
        <circle cx="120" cy="160" r="34" fill="${accent}"/>
        <rect x="170" y="140" width="130" height="14" rx="7" fill="${BRAND.ink}" opacity="0.8"/>
        <rect x="170" y="165" width="100" height="12" rx="6" fill="${BRAND.muted}" opacity="0.4"/>
        <rect x="80" y="210" width="100" height="36" rx="12" fill="${accent}"/>
        <text x="130" y="233" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="${BRAND.white}">Like Page</text>
        <rect x="200" y="210" width="100" height="36" rx="12" fill="${BRAND.white}" stroke="${accent}" stroke-width="2"/>
        <text x="250" y="233" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="${accent}">Trust</text>
      </g>`;
    case 'post-likes':
      return `
      <g transform="translate(720,150)">
        <rect x="0" y="0" width="380" height="330" rx="28" fill="${BRAND.white}" stroke="${BRAND.border}" stroke-width="2"/>
        <text x="28" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.ink}">Post engagement</text>
        <rect x="50" y="85" width="280" height="190" rx="18" fill="${BRAND.orangeSoft}"/>
        <rect x="70" y="105" width="240" height="110" rx="14" fill="${BRAND.white}"/>
        <circle cx="100" cy="135" r="16" fill="${accent}"/>
        <rect x="130" y="128" width="120" height="10" rx="5" fill="${BRAND.border}"/>
        <rect x="130" y="148" width="90" height="8" rx="4" fill="${BRAND.border}"/>
        <rect x="80" y="250" width="70" height="28" rx="10" fill="${accent}"/>
        <text x="115" y="269" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="${BRAND.white}">Like</text>
        <rect x="165" y="250" width="70" height="28" rx="10" fill="${BRAND.white}" stroke="${BRAND.border}"/>
        <text x="200" y="269" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="${BRAND.ink}">Share</text>
      </g>`;
    case 'homepage':
    default:
      return `
      <g transform="translate(700,145)">
        <rect x="20" y="20" width="160" height="120" rx="20" fill="#FFF0F5" stroke="#E1306C" stroke-width="2"/>
        <text x="100" y="90" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#E1306C">IG</text>
        <rect x="200" y="40" width="160" height="120" rx="20" fill="#F3FFFE" stroke="#111111" stroke-width="2"/>
        <text x="280" y="110" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#111111">TT</text>
        <rect x="40" y="170" width="160" height="120" rx="20" fill="#FFF5F5" stroke="#FF0000" stroke-width="2"/>
        <text x="120" y="240" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FF0000">YT</text>
        <rect x="220" y="190" width="160" height="120" rx="20" fill="#F0F6FF" stroke="#1877F2" stroke-width="2"/>
        <text x="300" y="260" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#1877F2">FB</text>
      </g>`;
  }
}

function buildSvg({ headline, platformKey, metric, logoHref }) {
  const platform = PLATFORM[platformKey] || PLATFORM.multi;
  const { line1, line2 } = wrapHeadline(headline);
  const accent = platform.accent === '#111111' ? BRAND.orange : platform.accent;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.page}"/>
      <stop offset="55%" stop-color="${BRAND.white}"/>
      <stop offset="100%" stop-color="${platform.soft}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1080" cy="-40" r="220" fill="${platform.accent}" opacity="0.08"/>
  <circle cx="-40" cy="560" r="180" fill="${BRAND.orange}" opacity="0.10"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${BRAND.orange}"/>
  <image xlink:href="${logoHref}" x="64" y="52" width="220" height="55" preserveAspectRatio="xMinYMid meet"/>
  <rect x="300" y="62" width="86" height="32" rx="16" fill="${BRAND.canada}"/>
  <text x="343" y="84" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="${BRAND.white}">Global</text>
  <rect x="64" y="130" width="120" height="8" rx="4" fill="${platform.accent}"/>
  <text x="64" y="210" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="${BRAND.ink}">${esc(line1)}</text>
  ${
    line2
      ? `<text x="64" y="268" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="${BRAND.ink}">${esc(line2)}</text>`
      : ''
  }
  <text x="64" y="${line2 ? 320 : 280}" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${BRAND.muted}">${esc(SUPPORT)}</text>
  <rect x="64" y="520" width="220" height="44" rx="22" fill="${accent}"/>
  <text x="174" y="548" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="${BRAND.white}">${esc(platform.label)}</text>
  <text x="300" y="548" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="${BRAND.muted}">NovaLikes.com</text>
  ${metricVisual(metric, accent)}
</svg>`;
}

/** Only generate assets referenced by data/seo/open-graph-images.ts */
const SPECS = [
  {
    file: 'novalikes-social-media-growth-og.webp',
    headline: 'Social Media Growth Services worldwide',
    platformKey: 'multi',
    metric: 'homepage',
  },
  {
    file: 'buy-instagram-followers-global-og.webp',
    headline: 'Buy Instagram Followers',
    platformKey: 'instagram',
    metric: 'followers',
  },
  {
    file: 'buy-instagram-likes-global-og.webp',
    headline: 'Buy Instagram Likes',
    platformKey: 'instagram',
    metric: 'likes',
  },
  {
    file: 'buy-instagram-views-global-og.webp',
    headline: 'Buy Instagram Views',
    platformKey: 'instagram',
    metric: 'views',
  },
  {
    file: 'buy-instagram-comments-global-og.webp',
    headline: 'Buy Instagram Comments',
    platformKey: 'instagram',
    metric: 'comments',
  },
  {
    file: 'buy-tiktok-followers-global-og.webp',
    headline: 'Buy TikTok Followers',
    platformKey: 'tiktok',
    metric: 'followers',
  },
  {
    file: 'buy-tiktok-likes-global-og.webp',
    headline: 'Buy TikTok Likes',
    platformKey: 'tiktok',
    metric: 'likes',
  },
  {
    file: 'buy-tiktok-views-global-og.webp',
    headline: 'Buy TikTok Views',
    platformKey: 'tiktok',
    metric: 'views',
  },
  {
    file: 'buy-facebook-followers-global-og.webp',
    headline: 'Buy Facebook Followers',
    platformKey: 'facebook',
    metric: 'followers',
  },
  {
    file: 'buy-facebook-page-likes-global-og.webp',
    headline: 'Buy Facebook Page Likes',
    platformKey: 'facebook',
    metric: 'page-likes',
  },
  {
    file: 'buy-facebook-post-likes-global-og.webp',
    headline: 'Buy Facebook Post Likes',
    platformKey: 'facebook',
    metric: 'post-likes',
  },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const logoBuf = await sharp(logoPath)
    .resize({ width: 440, height: 110, fit: 'inside' })
    .png()
    .toBuffer();
  const logoHref = `data:image/png;base64,${logoBuf.toString('base64')}`;

  const results = [];
  for (const spec of SPECS) {
    const svg = buildSvg({ ...spec, logoHref });
    const outPath = path.join(outDir, spec.file);
    const info = await sharp(Buffer.from(svg))
      .resize(W, H, { fit: 'fill' })
      .webp({ quality: 86, effort: 4 })
      .toFile(outPath);
    if (info.width !== W || info.height !== H) {
      throw new Error(`Bad dimensions for ${spec.file}: ${info.width}x${info.height}`);
    }
    results.push({ file: spec.file, bytes: info.size, width: info.width, height: info.height });
    console.log(`✓ ${spec.file} (${info.size} bytes)`);
  }

  console.log(`\nGenerated ${results.length} OG images in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

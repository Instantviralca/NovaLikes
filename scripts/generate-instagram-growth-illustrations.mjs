/**
 * Generate original NovaLikes Learn illustrations (SVG → WebP).
 * Brand: orange #E85D04 / #C2410C, dark gray #2B2B2B, cream surfaces.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC_DIR = path.join(
  ROOT,
  'public/assets/images/learn/how-to-get-more-instagram-followers',
);
const PACKAGE_DIR = path.join(
  ROOT,
  'content/instagram/how-to-get-more-instagram-followers/assets/images',
);
const SVG_DIR = path.join(PACKAGE_DIR, 'svg-source');

const W = 1600;
const H = 900;

function defs(idPrefix) {
  return `
  <defs>
    <linearGradient id="${idPrefix}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFBF8"/>
      <stop offset="50%" stop-color="#FFF4ED"/>
      <stop offset="100%" stop-color="#F3EBE4"/>
    </linearGradient>
    <linearGradient id="${idPrefix}-orange" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E85D04"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
    <linearGradient id="${idPrefix}-card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FFF8F3"/>
    </linearGradient>
    <filter id="${idPrefix}-shadow" x="-8%" y="-8%" width="116%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#2B2B2B" flood-opacity="0.12"/>
    </filter>
    <filter id="${idPrefix}-soft" x="-6%" y="-6%" width="112%" height="118%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#2B2B2B" flood-opacity="0.10"/>
    </filter>
  </defs>`;
}

function shell(id, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${id}">
${defs(id)}
<rect width="${W}" height="${H}" fill="url(#${id}-bg)"/>
<!-- subtle grid dots -->
<g opacity="0.35" fill="#E8DDD4">
  ${Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 20 }, (_, col) => {
      const x = 60 + col * 78;
      const y = 50 + row * 72;
      return `<circle cx="${x}" cy="${y}" r="1.5"/>`;
    }).join(''),
  ).join('')}
</g>
${body}
</svg>`;
}

const illustrations = {
  'how-to-get-more-instagram-followers-hero': shell(
    'hero',
    `
  <!-- Main dashboard card -->
  <rect x="120" y="90" width="1360" height="720" rx="36" fill="url(#hero-card)" stroke="#E8DDD4" filter="url(#hero-shadow)"/>
  <rect x="160" y="130" width="180" height="28" rx="10" fill="#FFF4ED"/>
  <text x="178" y="150" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#C2410C">GROWTH OVERVIEW</text>
  <circle cx="1410" cy="144" r="8" fill="#E85D04"/>
  <text x="1320" y="150" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#6B6560">Live</text>

  <!-- KPI cards -->
  <g filter="url(#hero-soft)">
    <rect x="160" y="190" width="300" height="120" rx="20" fill="#FFFFFF" stroke="#EDE4DC"/>
    <text x="184" y="230" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Followers</text>
    <text x="184" y="275" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">24.8k</text>
    <rect x="340" y="250" width="88" height="28" rx="14" fill="#FFF4ED"/>
    <text x="354" y="269" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">+18%</text>

    <rect x="490" y="190" width="300" height="120" rx="20" fill="#FFFFFF" stroke="#EDE4DC"/>
    <text x="514" y="230" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Engagement</text>
    <text x="514" y="275" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">6.4%</text>
    <rect x="670" y="250" width="88" height="28" rx="14" fill="#FFF4ED"/>
    <text x="684" y="269" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">+2.1%</text>

    <rect x="820" y="190" width="300" height="120" rx="20" fill="#FFFFFF" stroke="#EDE4DC"/>
    <text x="844" y="230" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Reach</text>
    <text x="844" y="275" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">91.2k</text>
    <rect x="1000" y="250" width="88" height="28" rx="14" fill="#FFF4ED"/>
    <text x="1014" y="269" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">+31%</text>

    <rect x="1150" y="190" width="290" height="120" rx="20" fill="#FFFFFF" stroke="#EDE4DC"/>
    <text x="1174" y="230" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Saves</text>
    <text x="1174" y="275" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">3.1k</text>
    <rect x="1330" y="250" width="80" height="28" rx="14" fill="#FFF4ED"/>
    <text x="1344" y="269" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">+9%</text>
  </g>

  <!-- Chart area -->
  <rect x="160" y="350" width="900" height="400" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
  <text x="190" y="395" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Follower growth</text>
  <path d="M200 680 C320 650 380 560 500 520 C640 470 720 430 860 360 C960 310 1000 280 1040 250"
        fill="none" stroke="url(#hero-orange)" stroke-width="8" stroke-linecap="round"/>
  <path d="M200 680 C320 650 380 560 500 520 C640 470 720 430 860 360 C960 310 1000 280 1040 250 L1040 700 L200 700 Z"
        fill="#E85D04" opacity="0.12"/>
  <!-- axis ticks -->
  <g stroke="#E8DDD4" stroke-width="2">
    <line x1="200" y1="700" x2="1040" y2="700"/>
    <line x1="200" y1="420" x2="200" y2="700"/>
  </g>

  <!-- Side engagement panel -->
  <rect x="1100" y="350" width="340" height="400" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
  <text x="1130" y="395" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Engagement mix</text>
  ${[0, 1, 2, 3]
    .map((i) => {
      const labels = ['Likes', 'Comments', 'Shares', 'Saves'];
      const widths = [220, 170, 140, 190];
      const y = 430 + i * 70;
      return `
    <text x="1130" y="${y}" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${labels[i]}</text>
    <rect x="1130" y="${y + 10}" width="280" height="14" rx="7" fill="#F7F0EA"/>
    <rect x="1130" y="${y + 10}" width="${widths[i]}" height="14" rx="7" fill="url(#hero-orange)"/>`;
    })
    .join('')}
`,
  ),

  'instagram-profile-optimization': shell(
    'profile',
    `
  <!-- Phone frame -->
  <g filter="url(#profile-shadow)">
    <rect x="520" y="70" width="560" height="760" rx="48" fill="#2B2B2B"/>
    <rect x="540" y="100" width="520" height="700" rx="36" fill="#FFFFFF"/>
  </g>
  <!-- status bar -->
  <rect x="540" y="100" width="520" height="36" rx="36" fill="#FFF8F3"/>
  <rect x="740" y="112" width="120" height="12" rx="6" fill="#E8DDD4"/>

  <!-- avatar -->
  <circle cx="800" cy="230" r="64" fill="url(#profile-orange)"/>
  <circle cx="800" cy="230" r="54" fill="#FFF4ED"/>
  <circle cx="800" cy="218" r="18" fill="#E85D04" opacity="0.85"/>
  <ellipse cx="800" cy="258" rx="28" ry="16" fill="#E85D04" opacity="0.85"/>

  <!-- name + bio -->
  <rect x="680" y="320" width="240" height="22" rx="8" fill="#2B2B2B"/>
  <rect x="710" y="356" width="180" height="14" rx="6" fill="#C4B8AE"/>
  <rect x="650" y="390" width="300" height="12" rx="5" fill="#E8DDD4"/>
  <rect x="680" y="414" width="240" height="12" rx="5" fill="#E8DDD4"/>

  <!-- CTA -->
  <rect x="620" y="450" width="360" height="52" rx="16" fill="url(#profile-orange)"/>
  <text x="730" y="482" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">View website</text>

  <!-- Highlights -->
  ${[0, 1, 2, 3]
    .map((i) => {
      const x = 610 + i * 100;
      return `
    <circle cx="${x}" cy="560" r="34" fill="none" stroke="url(#profile-orange)" stroke-width="4"/>
    <circle cx="${x}" cy="560" r="26" fill="#FFF4ED"/>
    <rect x="${x - 22}" y="605" width="44" height="10" rx="4" fill="#C4B8AE"/>`;
    })
    .join('')}

  <!-- Grid preview -->
  ${[0, 1, 2]
    .map((row) =>
      [0, 1, 2]
        .map((col) => {
          const x = 590 + col * 140;
          const y = 650 + row * 50;
          return `<rect x="${x}" y="${y}" width="120" height="40" rx="8" fill="${col === 1 && row === 0 ? '#FFF4ED' : '#F7F0EA'}"/>`;
        })
        .join(''),
    )
    .join('')}

  <!-- Floating tip cards -->
  <g filter="url(#profile-soft)">
    <rect x="120" y="220" width="320" height="140" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
    <rect x="148" y="250" width="120" height="18" rx="8" fill="#FFF4ED"/>
    <text x="160" y="264" font-family="system,sans-serif" font-size="12" font-weight="700" fill="#C2410C">BIO CHECK</text>
    <text x="148" y="310" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#2B2B2B">Clear value prop</text>
    <text x="148" y="340" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Who you help + CTA</text>

    <rect x="1160" y="260" width="320" height="140" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
    <rect x="1188" y="290" width="140" height="18" rx="8" fill="#FFF4ED"/>
    <text x="1200" y="304" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#C2410C">HIGHLIGHTS</text>
    <text x="1188" y="350" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#2B2B2B">Story archives</text>
    <text x="1188" y="380" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Offers · Proof · FAQ</text>

    <rect x="1160" y="460" width="320" height="140" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
    <rect x="1188" y="490" width="110" height="18" rx="8" fill="#FFF4ED"/>
    <text x="1200" y="504" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#C2410C">PHOTO</text>
    <text x="1188" y="550" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#2B2B2B">Recognizable face</text>
    <text x="1188" y="580" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">Brand-consistent crop</text>
  </g>
`,
  ),

  'instagram-content-calendar': shell(
    'calendar',
    `
  <rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#calendar-card)" stroke="#E8DDD4" filter="url(#calendar-shadow)"/>
  <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Content calendar</text>
  <text x="140" y="185" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">Reels · Stories · Posts · Carousels</text>

  <!-- Weekday headers -->
  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    .map((d, i) => {
      const x = 140 + i * 190;
      return `<text x="${x}" y="240" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#6B6560">${d}</text>`;
    })
    .join('')}

  <!-- Calendar cells with content types -->
  ${(() => {
    const types = [
      [
        { t: 'Reel', c: '#E85D04' },
        { t: 'Story', c: '#C2410C' },
        { t: 'Post', c: '#2B2B2B' },
        { t: 'Carousel', c: '#E85D04' },
        { t: 'Reel', c: '#C2410C' },
        { t: 'Story', c: '#2B2B2B' },
        { t: 'Post', c: '#E85D04' },
      ],
      [
        { t: 'Carousel', c: '#C2410C' },
        { t: 'Reel', c: '#E85D04' },
        { t: 'Story', c: '#2B2B2B' },
        { t: 'Reel', c: '#C2410C' },
        { t: 'Post', c: '#E85D04' },
        { t: 'Carousel', c: '#2B2B2B' },
        { t: 'Story', c: '#E85D04' },
      ],
      [
        { t: 'Post', c: '#2B2B2B' },
        { t: 'Reel', c: '#C2410C' },
        { t: 'Carousel', c: '#E85D04' },
        { t: 'Story', c: '#2B2B2B' },
        { t: 'Reel', c: '#E85D04' },
        { t: 'Post', c: '#C2410C' },
        { t: 'Reel', c: '#2B2B2B' },
      ],
    ];
    return types
      .map((row, ri) =>
        row
          .map((cell, ci) => {
            const x = 140 + ci * 190;
            const y = 270 + ri * 170;
            return `
        <rect x="${x}" y="${y}" width="170" height="150" rx="20" fill="#FFFFFF" stroke="#EDE4DC"/>
        <rect x="${x + 16}" y="${y + 18}" width="60" height="22" rx="8" fill="#FFF4ED"/>
        <text x="${x + 26}" y="${y + 34}" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#C2410C">${ri * 7 + ci + 1}</text>
        <rect x="${x + 16}" y="${y + 60}" width="138" height="56" rx="14" fill="${cell.c}" opacity="0.12"/>
        <circle cx="${x + 40}" cy="${y + 88}" r="10" fill="${cell.c}"/>
        <text x="${x + 60}" y="${y + 94}" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">${cell.t}</text>`;
          })
          .join(''),
      )
      .join('');
  })()}
`,
  ),

  'instagram-analytics-dashboard': shell(
    'analytics',
    `
  <rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#analytics-card)" stroke="#E8DDD4" filter="url(#analytics-shadow)"/>
  <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Instagram analytics</text>
  <text x="140" y="185" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">Reach · Engagement · Followers · Saves</text>

  <!-- Four metric tiles -->
  ${[
    { label: 'Reach', value: '128k', delta: '+24%' },
    { label: 'Engagement', value: '7.2%', delta: '+1.4%' },
    { label: 'Followers', value: '+1,842', delta: '30d' },
    { label: 'Saves', value: '4.6k', delta: '+16%' },
  ]
    .map((m, i) => {
      const x = 140 + i * 340;
      return `
    <g filter="url(#analytics-soft)">
      <rect x="${x}" y="220" width="310" height="150" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
      <text x="${x + 28}" y="265" font-family="system-ui,sans-serif" font-size="15" fill="#6B6560">${m.label}</text>
      <text x="${x + 28}" y="320" font-family="system-ui,sans-serif" font-size="40" font-weight="700" fill="#2B2B2B">${m.value}</text>
      <rect x="${x + 200}" y="290" width="80" height="28" rx="14" fill="#FFF4ED"/>
      <text x="${x + 214}" y="309" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">${m.delta}</text>
    </g>`;
    })
    .join('')}

  <!-- Dual charts -->
  <rect x="140" y="410" width="760" height="350" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
  <text x="170" y="455" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Reach vs profile visits</text>
  <path d="M180 680 C280 640 340 580 420 540 C520 490 580 470 680 430 C760 400 820 380 880 350"
        fill="none" stroke="url(#analytics-orange)" stroke-width="7" stroke-linecap="round"/>
  <path d="M180 700 C300 680 380 640 480 610 C600 570 700 540 880 500"
        fill="none" stroke="#2B2B2B" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8" opacity="0.55"/>

  <rect x="940" y="410" width="520" height="350" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
  <text x="970" y="455" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Top content signals</text>
  ${['Saves rate', 'Shares', 'Watch time', 'Profile taps']
    .map((label, i) => {
      const y = 500 + i * 55;
      const w = [360, 280, 320, 240][i];
      return `
    <text x="970" y="${y}" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${label}</text>
    <rect x="970" y="${y + 8}" width="440" height="16" rx="8" fill="#F7F0EA"/>
    <rect x="970" y="${y + 8}" width="${w}" height="16" rx="8" fill="url(#analytics-orange)"/>`;
    })
    .join('')}
`,
  ),

  'instagram-engagement': shell(
    'engage',
    `
  <!-- Center post card -->
  <g filter="url(#engage-shadow)">
    <rect x="560" y="140" width="480" height="620" rx="32" fill="#FFFFFF" stroke="#EDE4DC"/>
  </g>
  <rect x="560" y="140" width="480" height="70" rx="32" fill="#FFF8F3"/>
  <circle cx="620" cy="175" r="22" fill="url(#engage-orange)"/>
  <rect x="660" y="165" width="160" height="14" rx="6" fill="#2B2B2B"/>
  <rect x="660" y="186" width="100" height="10" rx="5" fill="#C4B8AE"/>

  <!-- Post media -->
  <rect x="590" y="240" width="420" height="320" rx="20" fill="#FFF4ED"/>
  <rect x="650" y="300" width="300" height="180" rx="16" fill="url(#engage-orange)" opacity="0.25"/>
  <circle cx="800" cy="390" r="40" fill="url(#engage-orange)" opacity="0.9"/>
  <polygon points="790,370 830,390 790,410" fill="#FFFFFF"/>

  <!-- Action row -->
  <circle cx="620" cy="600" r="16" fill="#E85D04"/>
  <circle cx="680" cy="600" r="16" fill="#C2410C" opacity="0.85"/>
  <circle cx="740" cy="600" r="16" fill="#2B2B2B" opacity="0.75"/>
  <rect x="790" y="590" width="180" height="20" rx="8" fill="#E8DDD4"/>
  <rect x="590" y="640" width="280" height="14" rx="6" fill="#C4B8AE"/>
  <rect x="590" y="670" width="360" height="12" rx="5" fill="#E8DDD4"/>
  <rect x="590" y="700" width="220" height="12" rx="5" fill="#E8DDD4"/>

  <!-- Floating engagement chips -->
  ${[
    { x: 180, y: 200, label: 'Likes', value: '+842' },
    { x: 220, y: 380, label: 'Comments', value: '+96' },
    { x: 160, y: 560, label: 'Shares', value: '+54' },
    { x: 1180, y: 220, label: 'Saves', value: '+210' },
    { x: 1220, y: 400, label: 'Replies', value: '+38' },
    { x: 1160, y: 580, label: 'DMs', value: '+17' },
  ]
    .map(
      (chip) => `
    <g filter="url(#engage-soft)">
      <rect x="${chip.x}" y="${chip.y}" width="220" height="100" rx="24" fill="#FFFFFF" stroke="#EDE4DC"/>
      <circle cx="${chip.x + 40}" cy="${chip.y + 50}" r="18" fill="url(#engage-orange)"/>
      <text x="${chip.x + 72}" y="${chip.y + 42}" font-family="system-ui,sans-serif" font-size="13" fill="#6B6560">${chip.label}</text>
      <text x="${chip.x + 72}" y="${chip.y + 70}" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#2B2B2B">${chip.value}</text>
    </g>`,
    )
    .join('')}

  <!-- Flow arcs (decorative) -->
  <path d="M400 250 C480 280 520 320 560 360" fill="none" stroke="#E85D04" stroke-width="3" opacity="0.35" stroke-dasharray="8 8"/>
  <path d="M400 430 C490 430 520 450 560 480" fill="none" stroke="#C2410C" stroke-width="3" opacity="0.35" stroke-dasharray="8 8"/>
  <path d="M1180 270 C1100 300 1080 340 1040 380" fill="none" stroke="#E85D04" stroke-width="3" opacity="0.35" stroke-dasharray="8 8"/>
  <path d="M1180 450 C1100 470 1080 500 1040 540" fill="none" stroke="#2B2B2B" stroke-width="3" opacity="0.25" stroke-dasharray="8 8"/>
`,
  ),

  'instagram-growth-checklist': shell(
    'check',
    `
  <!-- Phone -->
  <g filter="url(#check-shadow)">
    <rect x="880" y="80" width="520" height="740" rx="48" fill="#2B2B2B"/>
    <rect x="900" y="110" width="480" height="680" rx="36" fill="#FFFFFF"/>
  </g>
  <rect x="900" y="110" width="480" height="40" fill="#FFF8F3"/>
  <circle cx="1140" cy="220" r="48" fill="url(#check-orange)"/>
  <circle cx="1140" cy="220" r="38" fill="#FFF4ED"/>
  <rect x="1040" y="290" width="200" height="18" rx="8" fill="#2B2B2B"/>
  <rect x="1070" y="325" width="140" height="12" rx="5" fill="#C4B8AE"/>
  ${[0, 1, 2]
    .map((i) => `<rect x="${940 + i * 140}" y="380" width="120" height="120" rx="14" fill="#F7F0EA"/>`)
    .join('')}
  ${[0, 1, 2]
    .map((i) => `<rect x="${940 + i * 140}" y="520" width="120" height="120" rx="14" fill="#FFF4ED"/>`)
    .join('')}
  <rect x="960" y="670" width="360" height="48" rx="14" fill="url(#check-orange)"/>
  <text x="1075" y="700" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Profile ready</text>

  <!-- Checklist card -->
  <g filter="url(#check-shadow)">
    <rect x="120" y="120" width="680" height="660" rx="36" fill="#FFFFFF" stroke="#EDE4DC"/>
  </g>
  <text x="170" y="200" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Growth checklist</text>
  <text x="170" y="240" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">Ship the basics before scaling reach</text>

  ${[
    'Optimized photo, bio, and link CTA',
    'Content mix: Reels, Stories, Posts',
    'Consistent weekly publishing plan',
    'Reply to comments within 24 hours',
    'Review Insights: reach, saves, shares',
    'Double down on top-performing formats',
  ]
    .map((item, i) => {
      const y = 290 + i * 70;
      const done = i < 4;
      return `
    <rect x="170" y="${y}" width="580" height="56" rx="16" fill="${done ? '#FFF8F3' : '#F7F0EA'}" stroke="#EDE4DC"/>
    <circle cx="210" cy="${y + 28}" r="16" fill="${done ? 'url(#check-orange)' : '#FFFFFF'}" stroke="${done ? 'none' : '#C4B8AE'}" stroke-width="3"/>
    ${done ? `<path d="M202 ${y + 28} L208 ${y + 34} L220 ${y + 22}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    <text x="250" y="${y + 34}" font-family="system-ui,sans-serif" font-size="18" font-weight="600" fill="#2B2B2B">${item}</text>`;
    })
    .join('')}
`,
  ),
};

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.mkdirSync(SVG_DIR, { recursive: true });
fs.mkdirSync(PACKAGE_DIR, { recursive: true });

const results = [];

for (const [name, svg] of Object.entries(illustrations)) {
  const svgPath = path.join(SVG_DIR, `${name}.svg`);
  fs.writeFileSync(svgPath, svg);

  const webpFull = path.join(PUBLIC_DIR, `${name}.webp`);
  const webpPackage = path.join(PACKAGE_DIR, `${name}.webp`);
  const webpMd = path.join(PUBLIC_DIR, `${name}-800w.webp`);

  await sharp(Buffer.from(svg))
    .resize(W, H, { fit: 'fill' })
    .webp({ quality: 82, effort: 6 })
    .toFile(webpFull);

  await sharp(webpFull).toFile(webpPackage);

  await sharp(Buffer.from(svg))
    .resize(800, 450, { fit: 'fill' })
    .webp({ quality: 80, effort: 6 })
    .toFile(webpMd);

  // Also copy 800w into package
  await sharp(webpMd).toFile(path.join(PACKAGE_DIR, `${name}-800w.webp`));

  const meta = await sharp(webpFull).metadata();
  results.push({
    name,
    width: meta.width,
    height: meta.height,
    bytes: fs.statSync(webpFull).size,
  });
}

// OG / featured / twitter derivatives from hero
const heroPath = path.join(PUBLIC_DIR, 'how-to-get-more-instagram-followers-hero.webp');
await sharp(heroPath)
  .resize(1600, 900, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile(path.join(PACKAGE_DIR, 'featured-image.webp'));
await sharp(heroPath)
  .resize(1200, 630, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile(path.join(PACKAGE_DIR, 'og-image.webp'));
await sharp(heroPath)
  .resize(1200, 675, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile(path.join(PACKAGE_DIR, 'twitter-image.webp'));
// Public OG copies
await sharp(heroPath)
  .resize(1200, 630, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile(path.join(PUBLIC_DIR, 'og-image.webp'));

console.log(JSON.stringify(results, null, 2));
console.log('Done. Assets written to', PUBLIC_DIR);

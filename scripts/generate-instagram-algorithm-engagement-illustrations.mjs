/**
 * Generate NovaLikes Learn illustrations for algorithm + engagement articles.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const W = 1600;
const H = 900;

function defs(id) {
  return `<defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFBF8"/><stop offset="50%" stop-color="#FFF4ED"/><stop offset="100%" stop-color="#F3EBE4"/>
    </linearGradient>
    <linearGradient id="${id}-orange" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E85D04"/><stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
    <linearGradient id="${id}-card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#FFF8F3"/>
    </linearGradient>
    <filter id="${id}-shadow" x="-8%" y="-8%" width="116%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#2B2B2B" flood-opacity="0.12"/>
    </filter>
    <filter id="${id}-soft" x="-6%" y="-6%" width="112%" height="118%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#2B2B2B" flood-opacity="0.10"/>
    </filter>
  </defs>`;
}

function shell(id, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${id}">
${defs(id)}
<rect width="${W}" height="${H}" fill="url(#${id}-bg)"/>
${body}
</svg>`;
}

const sets = {
  'instagram-algorithm-explained': {
    public: 'public/assets/images/learn/instagram-algorithm-explained',
    pkg: 'content/instagram/instagram-algorithm-explained/assets/images',
    files: {
      'instagram-algorithm-hero': shell(
        'alghero',
        `<rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#alghero-card)" stroke="#E8DDD4" filter="url(#alghero-shadow)"/>
        <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Discovery ranking</text>
        <text x="140" y="185" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">Feed · Reels · Explore signals</text>
        ${['Interest', 'Relationships', 'Relevance', 'Timeliness']
          .map(
            (l, i) =>
              `<g filter="url(#alghero-soft)"><rect x="${140 + i * 340}" y="230" width="310" height="120" rx="20" fill="#fff" stroke="#EDE4DC"/><text x="${168 + i * 340}" y="285" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#2B2B2B">${l}</text><rect x="${168 + i * 340}" y="305" width="${180 - i * 20}" height="14" rx="7" fill="url(#alghero-orange)"/></g>`,
          )
          .join('')}
        <rect x="140" y="400" width="900" height="360" rx="24" fill="#fff" stroke="#EDE4DC"/>
        <text x="170" y="450" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Reach over time</text>
        <path d="M180 680 C300 640 380 560 500 500 C640 420 760 380 1000 300" fill="none" stroke="url(#alghero-orange)" stroke-width="8" stroke-linecap="round"/>
        <path d="M180 680 C300 640 380 560 500 500 C640 420 760 380 1000 300 L1000 720 L180 720 Z" fill="#E85D04" opacity="0.12"/>
        <rect x="1080" y="400" width="380" height="360" rx="24" fill="#fff" stroke="#EDE4DC"/>
        ${['Watch time', 'Saves', 'Shares', 'Comments']
          .map(
            (l, i) =>
              `<text x="1110" y="${470 + i * 70}" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${l}</text><rect x="1110" y="${480 + i * 70}" width="320" height="14" rx="7" fill="#F7F0EA"/><rect x="1110" y="${480 + i * 70}" width="${260 - i * 40}" height="14" rx="7" fill="url(#alghero-orange)"/>`,
          )
          .join('')}`,
      ),
      'instagram-feed-ranking': shell(
        'feed',
        `<text x="120" y="100" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Feed ranking</text>
        ${[0, 1, 2]
          .map(
            (i) =>
              `<g filter="url(#feed-shadow)"><rect x="${120 + i * 480}" y="160" width="440" height="620" rx="32" fill="#fff" stroke="#EDE4DC"/><rect x="${150 + i * 480}" y="200" width="380" height="220" rx="20" fill="#FFF4ED"/><circle cx="${200 + i * 480}" cy="470" r="22" fill="url(#feed-orange)"/><rect x="${240 + i * 480}" y="460" width="200" height="16" rx="6" fill="#2B2B2B"/><rect x="${150 + i * 480}" y="520" width="380" height="12" rx="5" fill="#E8DDD4"/><rect x="${150 + i * 480}" y="550" width="300" height="12" rx="5" fill="#E8DDD4"/><text x="${150 + i * 480}" y="620" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#2B2B2B">${['Close friends', 'Recent posts', 'Interest match'][i]}</text></g>`,
          )
          .join('')}`,
      ),
      'instagram-engagement-signals': shell(
        'sig',
        `<rect x="120" y="100" width="1360" height="700" rx="36" fill="url(#sig-card)" stroke="#E8DDD4" filter="url(#sig-shadow)"/>
        <text x="160" y="170" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Engagement signals</text>
        ${[
          ['Watch time', 'How long people stay'],
          ['Saves', 'Content worth revisiting'],
          ['Shares', 'Content people send'],
          ['Comments', 'Conversation quality'],
          ['Profile visits', 'Curiosity after viewing'],
          ['Freshness', 'Recent useful posts'],
        ]
          .map(
            (row, i) => {
              const x = 160 + (i % 3) * 420;
              const y = 220 + Math.floor(i / 3) * 260;
              return `<g filter="url(#sig-soft)"><rect x="${x}" y="${y}" width="390" height="220" rx="24" fill="#fff" stroke="#EDE4DC"/><circle cx="${x + 50}" cy="${y + 60}" r="24" fill="url(#sig-orange)"/><text x="${x + 90}" y="${y + 70}" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#2B2B2B">${row[0]}</text><text x="${x + 40}" y="${y + 130}" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">${row[1]}</text></g>`;
            },
          )
          .join('')}`,
      ),
      'instagram-insights-dashboard': shell(
        'ins',
        `<rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#ins-card)" stroke="#E8DDD4" filter="url(#ins-shadow)"/>
        <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Instagram Insights</text>
        ${['Reach', 'Saves', 'Shares', 'Profile visits']
          .map(
            (l, i) =>
              `<g filter="url(#ins-soft)"><rect x="${140 + i * 340}" y="200" width="310" height="140" rx="20" fill="#fff" stroke="#EDE4DC"/><text x="${168 + i * 340}" y="250" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${l}</text><text x="${168 + i * 340}" y="300" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">${['84k', '2.1k', '960', '3.4k'][i]}</text></g>`,
          )
          .join('')}
        <rect x="140" y="380" width="1320" height="380" rx="24" fill="#fff" stroke="#EDE4DC"/>
        <text x="180" y="430" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Content performance mix</text>
        <path d="M200 680 C360 640 480 520 640 480 C820 430 1000 400 1380 320" fill="none" stroke="url(#ins-orange)" stroke-width="8" stroke-linecap="round"/>`,
      ),
    },
  },
  'how-to-increase-instagram-engagement': {
    public: 'public/assets/images/learn/how-to-increase-instagram-engagement',
    pkg: 'content/instagram/how-to-increase-instagram-engagement/assets/images',
    files: {
      'instagram-engagement-hero': shell(
        'enghero',
        `<rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#enghero-card)" stroke="#E8DDD4" filter="url(#enghero-shadow)"/>
        <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Engagement overview</text>
        ${['Likes', 'Comments', 'Shares', 'Saves']
          .map(
            (l, i) =>
              `<g filter="url(#enghero-soft)"><rect x="${140 + i * 340}" y="200" width="310" height="140" rx="20" fill="#fff" stroke="#EDE4DC"/><text x="${168 + i * 340}" y="255" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${l}</text><text x="${168 + i * 340}" y="305" font-family="system-ui,sans-serif" font-size="36" font-weight="700" fill="#2B2B2B">${['+18%', '+32%', '+24%', '+41%'][i]}</text></g>`,
          )
          .join('')}
        <rect x="140" y="380" width="800" height="380" rx="24" fill="#fff" stroke="#EDE4DC"/>
        <text x="180" y="430" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Conversation activity</text>
        <path d="M200 680 C340 620 420 560 560 500 C720 420 860 380 900 340" fill="none" stroke="url(#enghero-orange)" stroke-width="8"/>
        <rect x="980" y="380" width="480" height="380" rx="24" fill="#fff" stroke="#EDE4DC"/>
        ${['Reply rate', 'Story replies', 'DM starts']
          .map(
            (l, i) =>
              `<text x="1010" y="${460 + i * 90}" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">${l}</text><rect x="1010" y="${475 + i * 90}" width="400" height="16" rx="8" fill="#F7F0EA"/><rect x="1010" y="${475 + i * 90}" width="${300 - i * 50}" height="16" rx="8" fill="url(#enghero-orange)"/>`,
          )
          .join('')}`,
      ),
      'instagram-content-strategy': shell(
        'cont',
        `<text x="120" y="110" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Content that invites action</text>
        ${['Reels', 'Carousels', 'Stories', 'Lives']
          .map(
            (l, i) =>
              `<g filter="url(#cont-shadow)"><rect x="${120 + (i % 2) * 720}" y="${160 + Math.floor(i / 2) * 340}" width="680" height="300" rx="28" fill="#fff" stroke="#EDE4DC"/><rect x="${160 + (i % 2) * 720}" y="${200 + Math.floor(i / 2) * 340}" width="200" height="36" rx="12" fill="#FFF4ED"/><text x="${180 + (i % 2) * 720}" y="${224 + Math.floor(i / 2) * 340}" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#C2410C">${l}</text><text x="${160 + (i % 2) * 720}" y="${300 + Math.floor(i / 2) * 340}" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#2B2B2B">${['Hook in 3 seconds', 'Saveable checklists', 'Daily conversation', 'Live Q and A moments'][i]}</text><text x="${160 + (i % 2) * 720}" y="${350 + Math.floor(i / 2) * 340}" font-family="system-ui,sans-serif" font-size="16" fill="#6B6560">${['One clear takeaway', 'Step-by-step value', 'Polls and prompts', 'Real-time replies'][i]}</text></g>`,
          )
          .join('')}`,
      ),
      'instagram-community-engagement': shell(
        'comm',
        `<g filter="url(#comm-shadow)"><rect x="560" y="120" width="480" height="660" rx="36" fill="#fff" stroke="#EDE4DC"/></g>
        <rect x="590" y="180" width="420" height="280" rx="20" fill="#FFF4ED"/>
        <circle cx="640" cy="520" r="18" fill="url(#comm-orange)"/>
        <rect x="680" y="510" width="240" height="16" rx="6" fill="#2B2B2B"/>
        <rect x="590" y="560" width="360" height="12" rx="5" fill="#E8DDD4"/>
        <rect x="590" y="590" width="280" height="12" rx="5" fill="#E8DDD4"/>
        ${[
          [140, 200, 'Comments'],
          [140, 400, 'Replies'],
          [140, 600, 'DMs'],
          [1180, 220, 'Saves'],
          [1180, 420, 'Shares'],
          [1180, 620, 'Mentions'],
        ]
          .map(
            ([x, y, label]) =>
              `<g filter="url(#comm-soft)"><rect x="${x}" y="${y}" width="240" height="100" rx="22" fill="#fff" stroke="#EDE4DC"/><circle cx="${x + 40}" cy="${y + 50}" r="16" fill="url(#comm-orange)"/><text x="${x + 70}" y="${y + 56}" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#2B2B2B">${label}</text></g>`,
          )
          .join('')}`,
      ),
      'instagram-insights': shell(
        'engins',
        `<rect x="100" y="80" width="1400" height="740" rx="36" fill="url(#engins-card)" stroke="#E8DDD4" filter="url(#engins-shadow)"/>
        <text x="140" y="150" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#2B2B2B">Engagement Insights</text>
        ${['Reach', 'Engagement rate', 'Saves', 'Profile visits']
          .map(
            (l, i) =>
              `<g filter="url(#engins-soft)"><rect x="${140 + i * 340}" y="210" width="310" height="150" rx="22" fill="#fff" stroke="#EDE4DC"/><text x="${168 + i * 340}" y="265" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${l}</text><text x="${168 + i * 340}" y="320" font-family="system-ui,sans-serif" font-size="34" font-weight="700" fill="#2B2B2B">${['112k', '5.8%', '4.2k', '6.1k'][i]}</text></g>`,
          )
          .join('')}
        <rect x="140" y="410" width="1320" height="350" rx="24" fill="#fff" stroke="#EDE4DC"/>
        <text x="180" y="460" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2B2B2B">Formats that earn interaction</text>
        ${['Reels', 'Carousels', 'Stories', 'Static posts']
          .map(
            (l, i) =>
              `<text x="${180 + i * 320}" y="520" font-family="system-ui,sans-serif" font-size="14" fill="#6B6560">${l}</text><rect x="${180 + i * 320}" y="540" width="80" height="${220 - i * 35}" rx="12" fill="url(#engins-orange)" opacity="${1 - i * 0.15}"/>`,
          )
          .join('')}`,
      ),
    },
  },
};

for (const [, config] of Object.entries(sets)) {
  const pub = path.join(ROOT, config.public);
  const pkg = path.join(ROOT, config.pkg);
  const svgDir = path.join(pkg, 'svg-source');
  fs.mkdirSync(pub, { recursive: true });
  fs.mkdirSync(svgDir, { recursive: true });
  for (const [name, svg] of Object.entries(config.files)) {
    fs.writeFileSync(path.join(svgDir, `${name}.svg`), svg);
    const out = path.join(pub, `${name}.webp`);
    await sharp(Buffer.from(svg)).resize(W, H, { fit: 'fill' }).webp({ quality: 82, effort: 6 }).toFile(out);
    await sharp(out).toFile(path.join(pkg, `${name}.webp`));
    await sharp(Buffer.from(svg)).resize(800, 450, { fit: 'fill' }).webp({ quality: 80 }).toFile(path.join(pub, `${name}-800w.webp`));
  }
  const hero = Object.keys(config.files)[0];
  await sharp(path.join(pub, `${hero}.webp`)).resize(1200, 630, { fit: 'cover' }).webp({ quality: 82 }).toFile(path.join(pub, 'og-image.webp'));
  console.log('ok', config.public, Object.keys(config.files).length);
}

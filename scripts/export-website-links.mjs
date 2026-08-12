/**
 * Export all NovaLikes.com website URLs to an Excel-compatible workbook.
 * Writes SpreadsheetML (.xls) that Excel / Google Sheets open natively.
 * Run: node scripts/export-website-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://novalikes.com';
const OUT = path.join(ROOT, 'docs', 'NovaLikes-Website-Links.xls');

function abs(pathname) {
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return `${BASE}${pathname === '/' ? '' : pathname}`;
}

function add(rows, category, name, pathname, notes = '') {
  rows.push({
    Category: category,
    Name: name,
    Path: pathname,
    URL: abs(pathname),
    Notes: notes,
  });
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const rows = [];

const staticPages = [
  ['Home', 'Homepage', '/', ''],
  ['Marketing', 'Services landing', '/services', ''],
  ['Marketing', 'About', '/about', ''],
  ['Marketing', 'Reviews', '/reviews', ''],
  ['Marketing', 'Contact', '/contact', ''],
  ['Marketing', 'FAQ', '/faq', ''],
  ['Marketing', 'Track Order', '/track-order', ''],
  ['Learn', 'Learn Center', '/learn', ''],
  ['Learn', 'Authors', '/authors', ''],
  ['Legal', 'Privacy Policy', '/privacy-policy', ''],
  ['Legal', 'Refund Policy', '/refund-policy', ''],
  ['Legal', 'Terms & Conditions', '/terms-and-conditions', ''],
  ['Legal', 'Cookie Policy', '/cookie-policy', ''],
  ['Legal', 'Disclaimer', '/disclaimer', ''],
  ['Commerce', 'Cart', '/cart', 'Noindex utility'],
  ['Commerce', 'Checkout', '/checkout', 'Noindex utility'],
  ['Commerce', 'Order Success', '/order-success', 'Noindex utility'],
  ['Admin', 'Admin', '/admin', 'Private'],
  ['Admin', 'Admin Login', '/admin/login', 'Private'],
];

for (const [category, name, pathname, notes] of staticPages) {
  add(rows, category, name, pathname, notes);
}

const services = [
  ['Instagram', 'Buy Instagram Followers', '/buy-instagram-followers'],
  ['Instagram', 'Buy Instagram Likes', '/buy-instagram-likes'],
  ['Instagram', 'Buy Instagram Views', '/buy-instagram-views'],
  ['Instagram', 'Buy Instagram Comments', '/buy-instagram-comments'],
  ['TikTok', 'Buy TikTok Followers', '/buy-tiktok-followers'],
  ['TikTok', 'Buy TikTok Likes', '/buy-tiktok-likes'],
  ['TikTok', 'Buy TikTok Views', '/buy-tiktok-views'],
  ['YouTube', 'Buy YouTube Subscribers', '/buy-youtube-subscribers'],
  ['YouTube', 'Buy YouTube Views', '/buy-youtube-views'],
  ['Facebook', 'Buy Facebook Followers', '/buy-facebook-followers'],
  ['Facebook', 'Buy Facebook Page Likes', '/buy-facebook-page-likes'],
  ['Facebook', 'Buy Facebook Post Likes', '/buy-facebook-post-likes'],
];

for (const [platform, name, pathname] of services) {
  add(rows, `Service · ${platform}`, name, pathname);
}

for (const slug of [
  'instagram',
  'tiktok',
  'youtube',
  'facebook',
  'social-media-marketing',
  'guides',
]) {
  add(rows, 'Learn · Category', slug, `/learn/${slug}`);
}

const articlesDir = path.join(ROOT, 'data', 'learn', 'articles');
for (const file of fs.readdirSync(articlesDir).filter((f) => f.endsWith('.ts')).sort()) {
  const text = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const fromConst = (text.match(/const SLUG\s*=\s*'([^']+)'/) || [])[1];
  const fromField = (text.match(/^\s*slug:\s*'([^']+)'/m) || [])[1];
  const slug = fromConst || fromField || file.replace(/\.ts$/, '');
  const title =
    (text.match(/^\s*title:\s*'((?:\\'|[^'])*)'/m) || [])[1]?.replace(/\\'/g, "'") ||
    slug;
  const status = (text.match(/^\s*status:\s*'([^']+)'/m) || [])[1] || '';
  const approved = /editorialApproved:\s*true/.test(text);
  add(
    rows,
    'Learn · Article',
    title,
    `/learn/${slug}`,
    `status=${status || 'unknown'}; editorialApproved=${approved}`,
  );
}

const authorsFile = path.join(ROOT, 'data', 'authors', 'registry.ts');
if (fs.existsSync(authorsFile)) {
  const text = fs.readFileSync(authorsFile, 'utf8');
  for (const slug of [...new Set([...text.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))]) {
    add(rows, 'Learn · Author', slug, `/authors/${slug}`);
  }
}

const tagsFile = path.join(ROOT, 'data', 'learn', 'tags.ts');
if (fs.existsSync(tagsFile)) {
  const text = fs.readFileSync(tagsFile, 'utf8');
  for (const slug of [...new Set([...text.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))]) {
    add(rows, 'Learn · Tag', slug, `/learn/tag/${slug}`);
  }
}

const seen = new Set();
const unique = [];
for (const row of rows) {
  if (seen.has(row.URL)) continue;
  seen.add(row.URL);
  unique.push(row);
}
unique.sort((a, b) => a.Category.localeCompare(b.Category) || a.Path.localeCompare(b.Path));

const headers = ['Category', 'Name', 'Path', 'URL', 'Notes'];
const cells = (values) =>
  values
    .map((v) => `<Cell><Data ss:Type="String">${xmlEscape(v)}</Data></Cell>`)
    .join('');

const tableRows = [
  `<Row>${cells(headers)}</Row>`,
  ...unique.map(
    (row) =>
      `<Row>${cells([row.Category, row.Name, row.Path, row.URL, row.Notes])}</Row>`,
  ),
].join('\n');

const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Website Links">
  <Table>
${tableRows}
  </Table>
 </Worksheet>
</Workbook>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml, 'utf8');
console.log(`Wrote ${unique.length} links → ${OUT}`);

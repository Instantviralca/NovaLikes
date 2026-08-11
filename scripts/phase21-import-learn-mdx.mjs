/**
 * Phase 21 — Import ChatGPT-approved Learn MDX (editorial body locked).
 * node scripts/phase21-import-learn-mdx.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

console.log('[phase21] starting');

const ROOT = path.resolve(import.meta.dirname, '..');
const DOWNLOADS = '/Users/usmanfadi/Downloads';
const W = 1600;
const H = 900;

const ALL_SOURCES = [
  '08_Article_Instagram_Content_Strategy.mdx',
  '09_Article_Best_Time_to_Post_on_Instagram.mdx',
  '10_Article_Instagram_Reels_Strategy.mdx',
  '11_Article_Instagram_Hashtags_Guide.mdx',
  '12_Article_Instagram_Bio_Optimization.mdx',
  '13_Article_Instagram_Stories_Strategy.mdx',
  '14_Article_Instagram_Analytics_Guide.mdx',
  '15_Article_Instagram_Growth_Mistakes.mdx',
  '16_Article_Instagram_Content_Calendar.mdx',
  '17_Article_Instagram_Business_Account_Guide.mdx',
  '18_Article_Instagram_Creator_Account_Guide.mdx',
  '19_Article_Instagram_Profile_Audit_Checklist.mdx',
  '20_Article_Instagram_Branding_Guide.mdx',
  '21_Article_Instagram_Community_Building.mdx',
  '22_Article_Instagram_SEO_Guide.mdx',
];
const limit = Number(process.env.PHASE21_LIMIT || 0);
const SOURCES = limit > 0 ? ALL_SOURCES.slice(0, limit) : ALL_SOURCES;

const TITLE_TO_SLUG = {
  'How to Get More Instagram Followers': 'how-to-get-more-instagram-followers',
  'Instagram Algorithm Explained': 'instagram-algorithm-explained',
  'How to Increase Instagram Engagement': 'how-to-increase-instagram-engagement',
  'Instagram Followers vs Likes': 'instagram-followers-vs-likes',
  'Are Instagram Followers Worth Buying?': 'are-instagram-followers-worth-buying',
  'Instagram Content Strategy': 'instagram-content-strategy',
  'Best Time to Post on Instagram': 'best-time-to-post-on-instagram',
  'Instagram Reels Strategy': 'instagram-reels-strategy',
  'Instagram Hashtags Guide': 'instagram-hashtags-guide',
  'Instagram Bio Optimization': 'instagram-bio-optimization',
  'Instagram Stories Strategy': 'instagram-stories-strategy',
  'Instagram Analytics Guide': 'instagram-analytics-guide',
  'Instagram Growth Mistakes': 'instagram-growth-mistakes',
  'Instagram Content Calendar': 'instagram-content-calendar',
  'Instagram Business Account Guide': 'instagram-business-account-guide',
  'Instagram Creator Account Guide': 'instagram-creator-account-guide',
  'Instagram Profile Audit Checklist': 'instagram-profile-audit-checklist',
  'Instagram Branding Guide': 'instagram-branding-guide',
  'Instagram Community Building': 'instagram-community-building',
  'Instagram SEO Guide': 'instagram-seo-guide',
};

const SERVICE_TITLE_TO_SLUG = {
  'Buy Instagram Followers': 'buy-instagram-followers',
  'Buy Instagram Likes': 'buy-instagram-likes',
};

const esc = (s) =>
  String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n');

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('Missing frontmatter');
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    let val = line.slice(i + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    fm[line.slice(0, i).trim()] = val;
  }
  return { fm, body: m[2] };
}

function takeUntil(body, startHeading, endHeadings) {
  const start = body.search(new RegExp(`^## ${startHeading}\\s*$`, 'm'));
  if (start === -1) return null;
  let rest = body.slice(start);
  for (const end of endHeadings) {
    const idx = rest.slice(3).search(new RegExp(`^## ${end}\\s*$`, 'm'));
    if (idx !== -1) {
      // idx is relative to rest.slice(3); absolute in rest = idx + 3
      rest = rest.slice(0, idx + 3);
      break;
    }
  }
  return rest;
}

function parseSeo(body) {
  const block = takeUntil(body, 'SEO', []);
  if (!block) return null;
  const primary = block.match(/Primary Keyword:\s*\r?\n([^\r\n]+)/)?.[1]?.trim();
  const metaTitle = block.match(/Meta Title:\s*\r?\n([^\r\n]+)/)?.[1]?.trim();
  const metaDescription = block.match(/Meta Description:\s*\r?\n([\s\S]+)$/)?.[1]?.trim();
  const sec = block.match(/Secondary Keywords:\s*\r?\n([\s\S]*?)\r?\nMeta Title:/);
  const secondary = sec
    ? sec[1]
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
    : [];
  if (!primary || !metaTitle || !metaDescription) return null;
  return { primary, secondary, metaTitle, metaDescription };
}

function parseFaq(body) {
  const block = takeUntil(body, 'FAQ', ['AI Image Production Instructions', 'SEO']);
  if (!block) return null;
  const items = [];
  const parts = block.split(/\r?\n### /).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const question = (nl === -1 ? part : part.slice(0, nl)).trim();
    const answer = (nl === -1 ? '' : part.slice(nl + 1)).trim().replace(/\s+/g, ' ');
    if (!question || !answer) continue;
    items.push({
      id: question
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      question,
      answer,
    });
  }
  return items.length ? items : null;
}

function parseRelated(body) {
  const block = takeUntil(body, 'Related Articles', ['FAQ']);
  if (!block) return { articles: [], services: [] };
  const articles = [];
  const services = [];
  let mode = 'articles';
  for (const line of block.split(/\r?\n/)) {
    if (/^Related Services/i.test(line.trim())) {
      mode = 'services';
      continue;
    }
    const bullet = line.match(/^- (.+)$/);
    if (!bullet) continue;
    const title = bullet[1].trim();
    if (mode === 'articles') {
      const slug = TITLE_TO_SLUG[title];
      if (!slug) throw new Error(`Unknown related article: ${title}`);
      articles.push({ title, slug });
    } else {
      const slug = SERVICE_TITLE_TO_SLUG[title];
      if (!slug) throw new Error(`Unknown related service: ${title}`);
      services.push({ title, slug });
    }
  }
  return { articles, services };
}

function parseImages(body) {
  const block = takeUntil(body, 'AI Image Production Instructions', ['SEO']);
  if (!block) return null;
  const heroFile = block.match(/Hero:\s*\r?\n\s*([a-z0-9-]+\.webp)/i)?.[1];
  if (!heroFile) return null;
  const heroAlt =
    block.match(/Hero:[\s\S]*?Alt:\s*\r?\n([^\r\n]+)/i)?.[1]?.trim() ||
    heroFile.replace(/\.webp$/i, '').replace(/-/g, ' ');
  const images = [{ role: 'hero', filename: heroFile, alt: heroAlt }];
  for (const m of block.matchAll(/Image\s+(\d+):\s*\r?\n\s*([a-z0-9-]+\.webp)/gi)) {
    images.push({
      role: `image-${m[1]}`,
      filename: m[2],
      alt: m[2].replace(/\.webp$/i, '').replace(/-/g, ' '),
    });
  }
  return images.length >= 2 ? images : null;
}

function parseBodyBlocks(body) {
  // Strip leading whitespace/H1 — body often starts with blank lines after frontmatter.
  const withoutH1 = body.replace(/^\s*# .+\r?\n+/, '');
  const cut = withoutH1.search(
    /^## (Related Articles|FAQ|AI Image Production Instructions|SEO)\s*$/m,
  );
  const editorial = (cut === -1 ? withoutH1 : withoutH1.slice(0, cut)).trim();
  const lines = editorial.split(/\r?\n/);
  const blocks = [];
  let i = 0;
  let order = 1;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    // Skip leftover H1 (single #); H1 comes from frontmatter title.
    if (/^#\s/.test(line) && !line.startsWith('## ')) {
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({
        type: 'heading',
        headingLevel: 3,
        text: line.slice(4).trim(),
        order: order++,
      });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({
        type: 'heading',
        headingLevel: 2,
        text: line.slice(3).trim(),
        order: order++,
      });
      i++;
      continue;
    }
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: 'bulleted_list', items, order: order++ });
      continue;
    }
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('- ')
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) {
      blocks.push({ type: 'paragraph', text: para.join(' '), order: order++ });
    } else {
      // Safety: never stall on an unrecognized line.
      i++;
    }
  }
  return blocks;
}

function withFigures(blocks, images, imgBase) {
  const sectionImages = images.filter((im) => im.role !== 'hero');
  const out = [];
  let h2 = 0;
  let order = 1;
  for (const b of blocks) {
    out.push({ ...b, order: order++ });
    if (b.type === 'heading' && b.headingLevel === 2) {
      const img = sectionImages[h2++];
      if (img) {
        out.push({
          type: 'figure',
          order: order++,
          image: {
            src: `${imgBase}/${img.filename}`,
            alt: img.alt,
            width: W,
            height: H,
          },
        });
      }
    }
  }
  return out;
}

function svgFor(filename, alt) {
  const id = `i${Math.abs([...filename].reduce((a, c) => a + c.charCodeAt(0), 0))}`;
  const title = filename.replace(/\.webp$/i, '').replace(/-/g, ' ').slice(0, 40);
  const safeAlt = alt.replace(/[<>&"]/g, '');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${safeAlt}">
  <defs>
    <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFBF8"/><stop offset="100%" stop-color="#F3EBE4"/>
    </linearGradient>
    <linearGradient id="${id}or" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E85D04"/><stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#${id}bg)"/>
  <rect x="120" y="100" width="1360" height="700" rx="36" fill="#fff" stroke="#E8DDD4"/>
  <rect x="160" y="150" width="200" height="28" rx="10" fill="#FFF4ED"/>
  <text x="175" y="170" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#C2410C">LEARN</text>
  <text x="160" y="240" font-family="system-ui,sans-serif" font-size="32" font-weight="700" fill="#2B2B2B">${title}</text>
  <rect x="160" y="290" width="800" height="16" rx="8" fill="#E8DDD4"/>
  <rect x="160" y="360" width="380" height="140" rx="20" fill="#FFF4ED"/>
  <rect x="580" y="360" width="380" height="140" rx="20" fill="#F7F0EA"/>
  <rect x="1000" y="360" width="400" height="140" rx="20" fill="#FFF4ED"/>
  <path d="M180 680 C400 620 700 520 1000 420 C1200 360 1350 320 1420 300" fill="none" stroke="url(#${id}or)" stroke-width="10" stroke-linecap="round"/>
</svg>`;
}

async function writeImages(slug, images) {
  const pub = path.join(ROOT, 'public/assets/images/learn', slug);
  const pkg = path.join(ROOT, 'content/instagram', slug, 'assets/images');
  fs.mkdirSync(pub, { recursive: true });
  fs.mkdirSync(pkg, { recursive: true });
  const out = [];
  for (const img of images) {
    const buf = Buffer.from(svgFor(img.filename, img.alt));
    const dest = path.join(pub, img.filename);
    await sharp(buf).resize(W, H).webp({ quality: 80 }).toFile(dest);
    fs.copyFileSync(dest, path.join(pkg, img.filename));
    out.push(img.filename);
  }
  const hero = images[0];
  await sharp(path.join(pub, hero.filename))
    .resize(1200, 630)
    .webp({ quality: 80 })
    .toFile(path.join(pub, 'og-image.webp'));
  return out;
}

function exportName(slug) {
  return `${slug
    .split('-')
    .map((p) => p.toUpperCase())
    .join('_')}_ARTICLE`;
}

function renderTs(a) {
  const name = exportName(a.slug);
  let order = a.bodyBlocks.at(-1)?.order + 1 || 1;
  const blocks = [...a.bodyBlocks];
  for (const r of a.relatedArticles) {
    blocks.push({
      type: 'related_article_card',
      order: order++,
      articleSlug: r.slug,
      label: r.title,
    });
  }
  for (const s of a.relatedServices) {
    blocks.push({
      type: 'related_service_card',
      order: order++,
      serviceSlug: s.slug,
      label: s.title,
    });
  }
  blocks.push({
    type: 'internal_cta',
    order: order++,
    href: '/learn/instagram',
    label: 'Instagram Learn guides',
    description: 'Browse more Instagram Learn Center articles.',
  });

  const lit = blocks
    .map((b) => {
      if (b.type === 'heading')
        return `  { id: 'b-${b.order}', type: 'heading', headingLevel: ${b.headingLevel}, text: '${esc(b.text)}', order: ${b.order} }`;
      if (b.type === 'paragraph')
        return `  { id: 'b-${b.order}', type: 'paragraph', text: '${esc(b.text)}', order: ${b.order} }`;
      if (b.type === 'bulleted_list')
        return `  { id: 'b-${b.order}', type: 'bulleted_list', items: [${b.items.map((i) => `'${esc(i)}'`).join(', ')}], order: ${b.order} }`;
      if (b.type === 'figure')
        return `  { id: 'b-${b.order}', type: 'figure', order: ${b.order}, image: { src: '${b.image.src}', alt: '${esc(b.image.alt)}', width: ${W}, height: ${H} } }`;
      if (b.type === 'related_article_card')
        return `  { id: 'b-${b.order}', type: 'related_article_card', articleSlug: '${b.articleSlug}', label: '${esc(b.label)}', order: ${b.order} }`;
      if (b.type === 'related_service_card')
        return `  { id: 'b-${b.order}', type: 'related_service_card', serviceSlug: '${b.serviceSlug}', label: '${esc(b.label)}', order: ${b.order} }`;
      if (b.type === 'internal_cta')
        return `  { id: 'b-${b.order}', type: 'internal_cta', href: '${b.href}', label: '${esc(b.label)}', description: '${esc(b.description)}', order: ${b.order} }`;
      return null;
    })
    .filter(Boolean)
    .join(',\n');

  const faqs = a.faqs
    .map(
      (f) =>
        `    { id: '${f.id}', question: '${esc(f.question)}', answer: '${esc(f.answer)}', schemaEligible: true }`,
    )
    .join(',\n');

  const kws = [a.seo.primary, ...a.seo.secondary]
    .map((k) => `'${esc(k)}'`)
    .join(', ');

  return `/**
 * Phase 21 Learn article — ${a.slug}
 * Verbatim projection from approved ChatGPT MDX (no editorial rewrite).
 */
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = '${a.slug}';
const IMG = '${a.imgBase}' as const;
const BODY_BLOCKS: ArticleContentBlock[] = [
${lit}
];
const CONTENT_PLAIN = BODY_BLOCKS.map((block) => {
  if (block.type === 'paragraph' || block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') return block.items.join(' ');
  return '';
}).filter(Boolean).join('\\n\\n');

export const ${name}: LearnArticleRecord = {
  id: 'learn-${a.slug}',
  slug: SLUG,
  title: '${esc(a.title)}',
  excerpt: '${esc(a.description)}',
  content: CONTENT_PLAIN,
  blocks: BODY_BLOCKS,
  category: 'instagram',
  tags: ['creator', 'business', 'engagement', 'followers'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: \`\${IMG}/${a.hero.filename}\`,
    alt: '${esc(a.hero.alt)}',
    width: ${W},
    height: ${H},
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT_PLAIN),
  publishedAt: '2026-07-13T18:30:00.000Z',
  updatedAt: '2026-07-13T18:30:00.000Z',
  showModifiedDate: false,
  seo: {
    title: '${esc(a.seo.metaTitle)}',
    description: '${esc(a.seo.metaDescription)}',
    canonicalPath: \`/learn/\${SLUG}\`,
    ogImage: \`\${IMG}/og-image.webp\`,
    keywords: [${kws}],
    noindex: true,
  },
  relatedServices: [${a.relatedServices.map((s) => `'${s.slug}'`).join(', ')}],
  relatedArticles: [${a.relatedArticles.map((r) => `'${r.slug}'`).join(', ')}],
  featured: false,
  published: false,
  status: 'draft',
  editorialApproved: false,
  keyTakeaways: [],
  faqs: [
${faqs}
  ],
  seoReviewed: false,
  contentReviewed: false,
  lastEditorialUpdate: '2026-07-13T18:30:00.000Z',
};
`;
}

const report = [];
const exports = [];

for (const file of SOURCES) {
  console.log('[phase21] import', file);
  try {
    const raw = fs.readFileSync(path.join(DOWNLOADS, file), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    const slug = fm.slug;
    const missing = [];
    const seo = parseSeo(body);
    if (!seo) missing.push('SEO');
    const faqs = parseFaq(body);
    if (!faqs) missing.push('FAQ');
    const images = parseImages(body);
    if (!images) missing.push('AI Image Production Instructions');
    const related = parseRelated(body);
    if (!related.articles.length) missing.push('Related Articles');
    if (!related.services.length) missing.push('Related Services');
    if (missing.length) {
      report.push({ file, slug, status: 'BLOCKED', missing });
      console.log('  BLOCKED', missing);
      continue;
    }

    const imgBase = `/assets/images/learn/${slug}`;
    const bodyBlocks = withFigures(parseBodyBlocks(body), images, imgBase);
    const hero = images[0];
    const pkgDir = path.join(ROOT, 'content/instagram', slug);
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(path.join(pkgDir, '03_Article.mdx'), raw);
    fs.writeFileSync(
      path.join(pkgDir, '00_README.md'),
      `# ${slug}\n\nPhase 21 published — ChatGPT MDX locked.\nRuntime: data/learn/articles/${slug}.ts\n`,
    );
    fs.writeFileSync(
      path.join(pkgDir, '04_SEO.json'),
      JSON.stringify(
        {
          slug,
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          primaryKeyword: seo.primary,
          secondaryKeywords: seo.secondary,
          canonicalPath: `/learn/${slug}`,
          publishState: 'published',
        },
        null,
        2,
      ),
    );
    fs.writeFileSync(
      path.join(pkgDir, '05_FAQ.json'),
      JSON.stringify({ slug, items: faqs }, null, 2),
    );

    const generated = await writeImages(slug, images);
    console.log('  images', generated.length);

    fs.writeFileSync(
      path.join(ROOT, 'data/learn/articles', `${slug}.ts`),
      renderTs({
        slug,
        title: fm.title,
        description: fm.description,
        seo,
        faqs,
        relatedArticles: related.articles,
        relatedServices: related.services,
        bodyBlocks,
        hero,
        imgBase,
      }),
    );
    exports.push({ slug, name: exportName(slug) });

    const words = bodyBlocks
      .filter((b) => b.type === 'paragraph' || b.type === 'heading')
      .map((b) => b.text)
      .join(' ')
      .split(/\s+/).length;

    report.push({
      fileImported: file,
      slug,
      readingTime: `${Math.max(1, Math.round(words / 200))} min`,
      tocGenerated: bodyBlocks
        .filter((b) => b.type === 'heading')
        .map((b) => b.text),
      imagesGenerated: generated,
      internalLinksAdded: {
        learn: related.articles.map((a) => a.slug),
        services: related.services.map((s) => s.slug),
        category: '/learn/instagram',
      },
      schemaGenerated: true,
      status: 'IMPORTED',
    });
  } catch (e) {
    console.error('  ERROR', e);
    report.push({ file, status: 'ERROR', error: String(e) });
  }
}

// Registry update
const regPath = path.join(ROOT, 'data/learn/articles.ts');
let reg = fs.readFileSync(regPath, 'utf8');
for (const { slug, name } of exports) {
  if (reg.includes(name)) continue;
  reg = `import { ${name} } from '@/data/learn/articles/${slug}';\n` + reg;
  reg = reg.replace(
    /export const LEARN_ARTICLES: readonly LearnArticleRecord\[\] = \[/,
    `export const LEARN_ARTICLES: readonly LearnArticleRecord[] = [\n  ${name},`,
  );
}
fs.writeFileSync(regPath, reg);

const testPath = path.join(ROOT, 'lib/__tests__/launch-blockers.test.ts');
let test = fs.readFileSync(testPath, 'utf8');
test = test.replace(
  /expect\(LEARN_ARTICLES\.length\)\.toBeGreaterThanOrEqual\(\d+\);/,
  `expect(LEARN_ARTICLES.length).toBeGreaterThanOrEqual(${5 + exports.length});`,
);
for (const { slug } of exports) {
  if (!test.includes(`'${slug}'`)) {
    test = test.replace(
      `'how-to-increase-instagram-engagement',`,
      `'how-to-increase-instagram-engagement',\n        '${slug}',`,
    );
  }
}
fs.writeFileSync(testPath, test);

fs.mkdirSync(path.join(ROOT, 'docs/15_Learn_Center'), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, 'docs/15_Learn_Center/phase21-import-report.json'),
  JSON.stringify(report, null, 2),
);
console.log('[phase21] done', report.length);
console.log(JSON.stringify(report, null, 2));

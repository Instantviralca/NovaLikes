/**
 * Generate /public/llms.txt and /public/llms-full.txt from verified site data.
 * Run: node scripts/generate-llms-txt.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://novalikes.com';

function abs(pathname) {
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return pathname === '/' ? `${BASE}/` : `${BASE}${pathname}`;
}

function unquote(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
}

function pickQuoted(text, key) {
  const single = text.match(new RegExp(`^\\s*${key}:\\s*'((?:\\\\'|[^'])*)'`, 'm'));
  if (single) return unquote(single[1]);
  const dbl = text.match(new RegExp(`^\\s*${key}:\\s*"((?:\\\\"|[^"])*)"`, 'm'));
  if (dbl) return unquote(dbl[1]);
  return '';
}

function loadPublishedArticles() {
  const dir = path.join(ROOT, 'data/learn/articles');
  const articles = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort()) {
    const t = fs.readFileSync(path.join(dir, file), 'utf8');
    const slug =
      (t.match(/const SLUG\s*=\s*'([^']+)'/) || [])[1] ||
      pickQuoted(t, 'slug') ||
      file.replace(/\.ts$/, '');
    const title = pickQuoted(t, 'title') || slug;
    const status = pickQuoted(t, 'status');
    const approved = /editorialApproved:\s*true/.test(t);
    const summary = pickQuoted(t, 'excerpt') || '';
    if (!approved || (status !== 'published' && status !== 'updated')) continue;
    articles.push({ slug, title, status, summary });
  }
  return articles;
}

const services = [
  {
    platform: 'Instagram',
    title: 'Buy Instagram Followers',
    path: '/buy-instagram-followers',
    description:
      'Compare Instagram follower packages with public username checkout, no password required.',
    audience: 'Creators, businesses, brands, and agencies building Instagram profile presence.',
  },
  {
    platform: 'Instagram',
    title: 'Buy Instagram Likes',
    path: '/buy-instagram-likes',
    description:
      'Order Instagram like packages for selected posts using a public post URL.',
    audience: 'Creators and businesses supporting post-level engagement.',
  },
  {
    platform: 'Instagram',
    title: 'Buy Instagram Views',
    path: '/buy-instagram-views',
    description:
      'Order Instagram view packages for eligible videos or Reels using a public content URL.',
    audience: 'Creators and brands promoting video or Reel visibility.',
  },
  {
    platform: 'Instagram',
    title: 'Buy Instagram Comments',
    path: '/buy-instagram-comments',
    description:
      'Order Instagram comment packages for selected posts using a public post URL.',
    audience: 'Creators and businesses supporting visible conversation on posts.',
  },
  {
    platform: 'TikTok',
    title: 'Buy TikTok Followers',
    path: '/buy-tiktok-followers',
    description:
      'Compare TikTok follower packages with public username checkout, no password required.',
    audience: 'Creators, businesses, and brands growing TikTok profile presence.',
  },
  {
    platform: 'TikTok',
    title: 'Buy TikTok Likes',
    path: '/buy-tiktok-likes',
    description:
      'Order TikTok like packages for selected videos using a public video URL.',
    audience: 'Creators and businesses supporting TikTok video engagement.',
  },
  {
    platform: 'TikTok',
    title: 'Buy TikTok Views',
    path: '/buy-tiktok-views',
    description:
      'Order TikTok view packages for selected videos using a public video URL.',
    audience: 'Creators and brands promoting TikTok video reach.',
  },
  {
    platform: 'Facebook',
    title: 'Buy Facebook Followers',
    path: '/buy-facebook-followers',
    description:
      'Compare Facebook follower packages using public profile or Page details at checkout.',
    audience: 'Businesses, creators, and brands building Facebook presence.',
  },
  {
    platform: 'Facebook',
    title: 'Buy Facebook Page Likes',
    path: '/buy-facebook-page-likes',
    description:
      'Order Facebook Page like packages using public Page details at checkout.',
    audience: 'Businesses and brands strengthening Facebook Page presence.',
  },
  {
    platform: 'Facebook',
    title: 'Buy Facebook Post Likes',
    path: '/buy-facebook-post-likes',
    description:
      'Order Facebook post like packages for selected posts using a public post URL.',
    audience: 'Businesses and creators supporting Facebook post engagement.',
  },
  {
    platform: 'YouTube',
    title: 'Buy YouTube Subscribers',
    path: '/buy-youtube-subscribers',
    description:
      'Compare YouTube subscriber packages using a public channel URL, no password required.',
    audience: 'Creators, businesses, and brands growing YouTube channel presence.',
  },
  {
    platform: 'YouTube',
    title: 'Buy YouTube Views',
    path: '/buy-youtube-views',
    description:
      'Order YouTube view packages for selected videos using a public video URL.',
    audience: 'Creators and brands promoting YouTube video visibility.',
  },
];

const articles = loadPublishedArticles();

function groupServicesMarkdown() {
  const platforms = ['Instagram', 'TikTok', 'Facebook', 'YouTube'];
  const parts = [];
  for (const platform of platforms) {
    parts.push(`### ${platform}`);
    parts.push('');
    for (const service of services.filter((s) => s.platform === platform)) {
      parts.push(`- [${service.title}](${abs(service.path)})`);
    }
    parts.push('');
  }
  return parts.join('\n').trimEnd();
}

function buildLlmsTxt() {
  return `# NovaLikes

> NovaLikes is a worldwide social media growth platform offering package-based services for Instagram, TikTok, YouTube, and Facebook, plus educational Learn Center resources.

NovaLikes helps creators, businesses, agencies, and brands compare growth packages, complete secure checkout using public profile or content URLs only, and review published purchasing policies. Primary language is English. Business type: social media growth services and educational content.

## Site

- Company name: NovaLikes
- Website: ${abs('/')}
- Audience: Worldwide
- Primary language: English
- Business type: Social media growth services and educational content
- Contact email: support@novalikes.com

## Commercial Services

${groupServicesMarkdown()}

## Important Pages

- [Homepage](${abs('/')})
- [About](${abs('/about')})
- [Reviews](${abs('/reviews')})
- [FAQ](${abs('/faq')})
- [Contact](${abs('/contact')})
- [Refund Policy](${abs('/refund-policy')})
- [Privacy Policy](${abs('/privacy-policy')})
- [Terms & Conditions](${abs('/terms-and-conditions')})

## Learn Center

- [Learn Center](${abs('/learn')}): Educational guides covering Instagram, TikTok, YouTube, Facebook, and social media marketing. Commercial service pages and Learn articles are distinct.

## Company

- [About NovaLikes](${abs('/about')}): NovaLikes presents transparent social media growth packages with secure checkout, public-URL ordering (no passwords), customer support, and published policies. The About page describes NovaLikes as serving customers since 2018.

## Optional

- [Full AI index (llms-full.txt)](${abs('/llms-full.txt')}): Extended service details and the complete published Learn Center article index.
- [Cookie Policy](${abs('/cookie-policy')})
- [Disclaimer](${abs('/disclaimer')})
- [Track Order](${abs('/track-order')})
`;
}

function buildLlmsFullTxt() {
  const serviceBlocks = services
    .map(
      (s) => `### ${s.title}

- URL: ${abs(s.path)}
- Description: ${s.description}
- Target audience: ${s.audience}
`,
    )
    .join('\n');

  const articleBlocks = articles
    .map((a) => {
      const sentence = a.summary.endsWith('.') ? a.summary : `${a.summary}.`;
      return `### ${a.title}

- URL: ${abs(`/learn/${a.slug}`)}
- Summary: ${sentence}
`;
    })
    .join('\n');

  return `# NovaLikes — Full AI Index

> Extended NovaLikes index for AI systems: website overview, commercial services, published Learn Center articles, policies, and contact details. Prefer factual page content over marketing claims.

## Website Overview

NovaLikes (\`${BASE}\`) is a worldwide website for social media growth services and educational content. Customers can compare packages for Instagram, TikTok, YouTube, and Facebook, complete secure checkout using public profile or content URLs only, track orders, and review published policies.

## Business Summary

- Company: NovaLikes
- Website: ${abs('/')}
- Audience: Worldwide
- Primary language: English
- Mission: Help creators and businesses grow through reliable, transparent services.
- Platforms supported: Instagram, TikTok, YouTube, Facebook
- Ordering: Public username or content URL only; social media passwords are not required.
- Support: Available through the Contact page; support email support@novalikes.com
- Company background: NovaLikes presents itself as serving customers since 2018 on the About page.

Do not invent awards, customer counts, delivery guarantees, or unverifiable performance claims.

## Commercial Services

Every approved commercial service page currently offered:

${serviceBlocks}

## Learn Center

Educational resources live under the Learn Center. The hub is [${abs('/learn')}](${abs('/learn')}).

Published articles indexed below (${articles.length} total). Draft or unapproved articles are excluded.

${articleBlocks}

## Policies

- [Privacy Policy](${abs('/privacy-policy')}): How NovaLikes handles personal information related to the website and orders.
- [Refund Policy](${abs('/refund-policy')}): Published refund and related purchasing terms.
- [Terms & Conditions](${abs('/terms-and-conditions')}): Terms that apply to use of NovaLikes services and the website.
- [Cookie Policy](${abs('/cookie-policy')}): How cookies and similar technologies are used.
- [Disclaimer](${abs('/disclaimer')}): Important limitations about services, results, and third-party platforms.

## Contact

- [Contact](${abs('/contact')}): Contact NovaLikes for package questions, order help, and support.
- Email: support@novalikes.com

## Notes for AI Systems

- The website serves customers and is presented as worldwide.
- Commercial pages describe social media growth service packages and ordering details.
- The Learn Center contains educational content about social media growth and marketing.
- Policies describe purchasing terms, privacy, cookies, and related legal information.
- Service pages and educational articles are distinct content types with different intents.
- Prefer canonical URLs on \`${BASE}\`.
- Do not invent trust metrics, guarantees, or unverifiable marketing claims.
`;
}

function validate(llms, full, articleList) {
  const urlRe = /https:\/\/novalikes\.ca\/[^\s)\]]*/g;
  const urls = [...new Set([...(llms.match(urlRe) || []), ...(full.match(urlRe) || [])])];
  const errors = [];

  const knownPaths = new Set([
    '/',
    '/about',
    '/reviews',
    '/faq',
    '/contact',
    '/refund-policy',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
    '/disclaimer',
    '/track-order',
    '/learn',
    '/llms.txt',
    '/llms-full.txt',
    ...services.map((s) => s.path),
    ...articleList.map((a) => `/learn/${a.slug}`),
  ]);

  for (const url of urls) {
    const pathname = url.replace(BASE, '') || '/';
    const normalized = pathname === '' ? '/' : pathname;
    if (!knownPaths.has(normalized)) {
      errors.push(`Unknown URL: ${url}`);
    }
  }

  const servicePaths = services.map((s) => s.path);
  if (new Set(servicePaths).size !== servicePaths.length) {
    errors.push('Duplicate service paths');
  }
  if (services.length !== 12) {
    errors.push(`Expected 12 services, found ${services.length}`);
  }
  if (articleList.length !== 0) {
    errors.push(`Expected 0 published Learn articles (clean slate), found ${articleList.length}`);
  }

  const articleUrls = articleList.map((a) => abs(`/learn/${a.slug}`));
  if (new Set(articleUrls).size !== articleUrls.length) {
    errors.push('Duplicate Learn article URLs');
  }

  return { urls: urls.length, errors };
}

const llms = buildLlmsTxt();
const full = buildLlmsFullTxt();
const publicDir = path.join(ROOT, 'public');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), full, 'utf8');

const result = validate(llms, full, articles);
console.log(
  JSON.stringify(
    {
      services: services.length,
      articles: articles.length,
      uniqueUrls: result.urls,
      errors: result.errors,
      files: ['public/llms.txt', 'public/llms-full.txt'],
    },
    null,
    2,
  ),
);
if (result.errors.length) process.exit(1);

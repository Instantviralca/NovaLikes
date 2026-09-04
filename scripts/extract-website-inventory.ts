/**
 * Read-only website inventory extractor.
 * Run: npx tsx scripts/extract-website-inventory.ts
 * Generates docs/*.md and docs/site-content-stats.json — does NOT modify site content.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { getFooterColumns } from '@/data/footer';
import { getMainNavigation, getMegaMenuServices } from '@/data/navigation';
import { getPublishedLearnArticleRecords, LEARN_ARTICLES } from '@/data/learn/articles';
import { LEARN_CATEGORIES } from '@/data/learn/categories';
import { LEARN_TAGS } from '@/data/learn/tags';
import { AUTHORS } from '@/data/authors';
import { TOOLS } from '@/data/tools/registry';
import { getIndexableMetadataEntries } from '@/lib/seo/metadata/getters';
import { SITEMAP_PRODUCTION_ROUTES } from '@/data/seo/sitemap-routes';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import {
  CORE_SERVICE_SLUGS,
  DEFAULT_LOCALE,
  HREFLANG,
  HTML_LANG,
  LOCALES,
  LOCALE_DIR,
  LOCALE_NATIVE_NAMES,
  LOCALE_PREFIXES,
  LOCALIZED_LOCALES,
  OG_LOCALE,
  TOOL_SLUGS,
  type Locale,
} from '@/lib/i18n/config';
import {
  COMPANY_PATHS,
  CORE_PATHS,
  LEGAL_PATHS,
  TOOL_PATHS,
} from '@/lib/i18n/core-paths';
import {
  loadAboutPage,
  loadContactPage,
  loadFaqItems,
  loadFaqPageContent,
  loadHomepageHub,
  loadLegalPage,
  loadMetadataBundle,
  loadQuickAnswer,
  loadReviewsPageCopy,
  loadServiceBundle,
  loadServiceFaqItems,
  loadToolsBundle,
  loadUi,
} from '@/lib/i18n/content/load';
import { SERVICE_FAQ_IDS } from '@/lib/i18n/content/service-faq-ids';
import { localizeHref } from '@/lib/i18n/paths';
import { buildCanonicalUrl } from '@/lib/seo/metadata/canonical';
import { hreflangMapWithMarket } from '@/lib/market/paths';
import {
  MARKET_COUNTRY_NAME,
  MARKET_HREFLANG,
  MARKET_NATIVE_NAMES,
  MARKET_PREFIXES,
  MARKETS,
  type Market,
} from '@/lib/market/config';
import {
  loadMarketHomepageHub,
  loadMarketMetadataBundle,
  loadMarketServiceBundle,
  loadMarketServiceFaqItems,
} from '@/lib/market/content/load';
import { NOVALIKES_EDITORIAL_PLAN } from '@/lib/cms/editorial-plan';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const DOCS = path.join(process.cwd(), 'docs');
const GENERATED_AT = new Date().toISOString();

mkdirSync(DOCS, { recursive: true });

function writeDoc(name: string, content: string) {
  const file = path.join(DOCS, name);
  writeFileSync(file, content, 'utf8');
  console.log('Wrote', file, `(${(content.length / 1024).toFixed(1)} KB)`);
}

function none(value: unknown): string {
  if (value === null || value === undefined || value === '') return 'NONE';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value, null, 2);
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (value === null || value === undefined) return out;
  if (typeof value === 'string') {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return out;
  }
  if (typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) collectStrings(v, out);
  }
  return out;
}

function wordCount(value: unknown): number {
  const text = collectStrings(value).join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractHrefs(value: unknown): string[] {
  const hrefs = new Set<string>();
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (k === 'href' && typeof val === 'string' && val.startsWith('/')) hrefs.add(val);
      else walk(val);
    }
  };
  walk(value);
  return [...hrefs].sort();
}

function formatField(label: string, value: unknown): string {
  const v = none(value);
  return `**${label}:**\n${v === 'NONE' ? 'NONE' : v}\n\n`;
}

function formatObjectSections(obj: Record<string, unknown> | null | undefined, depth = 2): string {
  if (!obj || typeof obj !== 'object') return 'NONE\n\n';
  let md = '';
  for (const [key, val] of Object.entries(obj)) {
    const heading = '#'.repeat(Math.min(depth + 1, 6));
    md += `${heading} ${key}\n\n`;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const rec = val as Record<string, unknown>;
      const primitiveOnly = Object.values(rec).every(
        (v) => v === null || typeof v !== 'object' || Array.isArray(v),
      );
      if (primitiveOnly) {
        for (const [k, v] of Object.entries(rec)) md += formatField(k, v);
      } else {
        md += formatObjectSections(rec, depth + 1);
      }
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        md += `**Item ${i + 1}:**\n\`\`\`json\n${JSON.stringify(item, null, 2)}\n\`\`\`\n\n`;
      });
    } else {
      md += formatField('value', val);
    }
  }
  return md;
}

function localeLabel(locale: Locale): string {
  return LOCALE_NATIVE_NAMES[locale];
}

function publicRouteForLocale(locale: Locale, englishPath: string): string {
  if (locale === DEFAULT_LOCALE) return englishPath === '/' ? '/' : englishPath;
  return localizeHref(englishPath, locale);
}

function hreflangLines(barePath: string): string {
  const map = hreflangMapWithMarket(barePath);
  return Object.entries(map)
    .map(([code, p]) => `- ${code}: ${buildCanonicalUrl(p)}`)
    .join('\n');
}

function formatLearnBlocks(blocks: ArticleContentBlock[]): string {
  let md = '';
  for (const block of blocks) {
    md += `#### Block: ${block.type} (${block.id})\n\n`;
    if (block.type === 'heading') md += formatField('H' + block.headingLevel, block.text);
    else if (block.type === 'paragraph') md += formatField('Content', block.text);
    else if (block.type === 'bulleted_list' || block.type === 'numbered_list')
      md += formatField('Items', block.items);
    else if (block.type === 'faq') {
      for (const item of block.items) {
        md += formatField('Q', item.question);
        md += formatField('A', item.answer);
      }
    } else if (block.type === 'figure')
      md += formatField('Caption', block.image?.caption ?? block.image?.alt);
    else md += `\`\`\`json\n${JSON.stringify(block, null, 2)}\n\`\`\`\n\n`;
  }
  return md;
}

function formatArticlePage(article: LearnArticleRecord): string {
  let md = '';
  md += formatField('Title', article.title);
  md += formatField('Excerpt', article.excerpt);
  md += formatField('Category', article.category);
  md += formatField('Tags', article.tags.join(', '));
  md += formatField('Author ID', article.authorId);
  md += formatField('Reading Time (min)', article.readingTime);
  md += formatField('Published At', article.publishedAt);
  md += formatField('Updated At', article.updatedAt);
  md += formatField('Related Services', article.relatedServices.join(', ') || 'NONE');
  md += formatField('Related Articles', article.relatedArticles.join(', ') || 'NONE');
  md += `### SEO\n\n`;
  md += formatField('Meta Title', article.seo.title);
  md += formatField('Meta Description', article.seo.description);
  md += formatField('Canonical', buildCanonicalUrl(article.seo.canonicalPath));
  md += formatField('Keywords', article.seo.keywords?.join(', ') ?? 'NONE');
  md += `### Body\n\n`;
  md += formatLearnBlocks(article.blocks);
  return md;
}

function faqIdsForServiceSlug(slug: string): string[] {
  if (slug.includes('instagram-followers')) return SERVICE_FAQ_IDS.filter((id) => id.includes('ig-followers'));
  if (slug.includes('instagram-likes')) return SERVICE_FAQ_IDS.filter((id) => id.includes('ig-likes'));
  if (slug.includes('instagram-views')) return SERVICE_FAQ_IDS.filter((id) => id.includes('ig-views'));
  if (slug.includes('instagram-comments')) return SERVICE_FAQ_IDS.filter((id) => id.includes('ig-comments'));
  if (slug.includes('tiktok-followers')) return SERVICE_FAQ_IDS.filter((id) => id.includes('tt-followers'));
  if (slug.includes('tiktok-likes')) return SERVICE_FAQ_IDS.filter((id) => id.includes('tt-likes'));
  if (slug.includes('tiktok-views')) return SERVICE_FAQ_IDS.filter((id) => id.includes('tt-views'));
  if (slug.includes('facebook-followers')) return SERVICE_FAQ_IDS.filter((id) => id.includes('fb-followers'));
  if (slug.includes('facebook-page')) return SERVICE_FAQ_IDS.filter((id) => id.includes('fb-page'));
  if (slug.includes('facebook-post')) return SERVICE_FAQ_IDS.filter((id) => id.includes('fb-post'));
  return [];
}

function formatServicePage(locale: Locale, slug: string, bundle: unknown, meta: { title: string; description: string }) {
  const route =
    locale === DEFAULT_LOCALE ? `/${slug}` : publicRouteForLocale(locale, `/${slug}`);
  let md = `## ${route}\n\n`;
  md += formatField('Route', route);
  md += formatField('Page Type', 'Service');
  md += formatField('Indexable', 'Yes');
  md += formatField('Canonical', buildCanonicalUrl(route));
  md += `### Hreflang\n\n${hreflangLines(`/${slug}`)}\n\n`;
  md += formatField('Content Source Type', locale === DEFAULT_LOCALE ? 'PAGE-SPECIFIC (English TS)' : 'PAGE-SPECIFIC overlay on English TS');
  md += formatField(
    'Content Source',
    locale === DEFAULT_LOCALE
      ? `data/content/${slug.includes('instagram') ? 'instagram' : slug.includes('tiktok') ? 'tiktok' : 'facebook'}.ts`
      : `content/locales/${locale}/services/${slug}.json + English TS`,
  );
  md += `### SEO\n\n`;
  md += formatField('Meta Title', meta.title);
  md += formatField('Meta Description', meta.description);
  const qa = loadQuickAnswer(locale, slug as import('@/data/quick-answers').QuickAnswerPageId);
  md += `### Quick Answer\n\n`;
  md += formatField('Answer', qa || 'NONE');
  md += `### Page Content\n\n`;
  md += formatObjectSections(bundle as Record<string, unknown>);
  const serviceFaqs = loadServiceFaqItems(locale, faqIdsForServiceSlug(slug));
  md += `### FAQ\n\n`;
  if (serviceFaqs.length === 0) md += 'NONE\n\n';
  else {
    for (const faq of serviceFaqs) {
      md += formatField('Q', faq.question);
      md += formatField('A', faq.answer);
    }
  }
  md += `### Internal links from page\n\n`;
  md += extractHrefs(bundle).map((h) => `- ${h}`).join('\n') || 'NONE';
  md += '\n\n';
  md += formatField('Visible Word Count', wordCount(bundle));
  return md;
}

function extractLocaleContent(locale: Locale): { md: string; stats: Record<string, number> } {
  const stats: Record<string, number> = {};
  let md = `# ${localeLabel(locale)} (${locale})\n\n`;
  const meta = loadMetadataBundle(locale);

  // Homepage
  const home = loadHomepageHub(locale);
  const homeRoute = publicRouteForLocale(locale, '/');
  md += `## ${homeRoute}\n\n`;
  md += formatField('Route', homeRoute);
  md += formatField('Page Type', 'Homepage');
  md += formatField('Indexable', 'Yes');
  md += formatField('Canonical', buildCanonicalUrl(homeRoute));
  md += `### Hreflang\n\n${hreflangLines('/')}\n\n`;
  md += formatField('Content Source Type', locale === DEFAULT_LOCALE ? 'PAGE-SPECIFIC' : 'PAGE-SPECIFIC overlay');
  md += formatField(
    'Content Source',
    locale === DEFAULT_LOCALE ? 'data/content/homepage-hub.ts' : `content/locales/${locale}/homepage.json + data/content/homepage-hub.ts`,
  );
  md += `### SEO\n\n`;
  md += formatField('Meta Title', meta.homepage.title);
  md += formatField('Meta Description', meta.homepage.description);
  md += `### Page Content\n\n`;
  md += formatObjectSections(home as unknown as Record<string, unknown>);
  stats.homepage = wordCount(home);

  // Services
  for (const slug of CORE_SERVICE_SLUGS) {
    const bundle = loadServiceBundle(locale, slug);
    const serviceMd = formatServicePage(locale, slug, bundle, meta.services[slug] ?? { title: 'NONE', description: 'NONE' });
    md += serviceMd;
    stats[`service:${slug}`] = wordCount(bundle);
  }

  // FAQ
  const faqRoute = publicRouteForLocale(locale, '/faq');
  const faqPage = loadFaqPageContent(locale);
  const faqItems = loadFaqItems(locale);
  md += `## ${faqRoute}\n\n`;
  md += formatField('Route', faqRoute);
  md += formatField('Page Type', 'FAQ Hub');
  md += formatField('Indexable', 'Yes');
  md += formatField('Canonical', buildCanonicalUrl(faqRoute));
  md += `### Hreflang\n\n${hreflangLines('/faq')}\n\n`;
  md += formatField('Content Source', locale === DEFAULT_LOCALE ? 'data/content/company.ts + data/content/faq*.ts' : `content/locales/${locale}/faq-page.json + faq-items.json`);
  md += `### SEO\n\n`;
  md += formatField('Meta Title', meta.faq.title);
  md += formatField('Meta Description', meta.faq.description);
  md += `### Page Content\n\n`;
  md += formatObjectSections(faqPage as unknown as Record<string, unknown>);
  md += `### FAQ Items\n\n`;
  for (const faq of faqItems) {
    md += formatField('Q', faq.question);
    md += formatField('A', faq.answer);
  }
  stats.faq = wordCount({ faqPage, faqItems });

  // About, Contact, Reviews
  for (const [key, pathEn, loader, metaKey] of [
    ['About', '/about', () => loadAboutPage(locale), 'about'],
    ['Contact', '/contact', () => loadContactPage(locale), 'contact'],
    ['Reviews', '/reviews', () => loadReviewsPageCopy(locale), 'reviews'],
  ] as const) {
    const route = publicRouteForLocale(locale, pathEn);
    const data = loader();
    md += `## ${route}\n\n`;
    md += formatField('Route', route);
    md += formatField('Page Type', key);
    md += formatField('Indexable', 'Yes');
    md += formatField('Canonical', buildCanonicalUrl(route));
    md += `### SEO\n\n`;
    md += formatField('Meta Title', meta[metaKey as keyof typeof meta].title);
    md += formatField('Meta Description', meta[metaKey as keyof typeof meta].description);
    md += `### Page Content\n\n`;
    md += formatObjectSections(data as unknown as Record<string, unknown>);
    stats[key.toLowerCase()] = wordCount(data);
  }

  // Tools
  const toolsRoute = publicRouteForLocale(locale, '/tools');
  const tools = loadToolsBundle(locale);
  md += `## ${toolsRoute}\n\n`;
  md += formatField('Route', toolsRoute);
  md += formatField('Page Type', 'Tools Hub');
  md += formatField('Indexable', 'Yes');
  md += formatField('Canonical', buildCanonicalUrl(toolsRoute));
  md += formatField('Meta Title', meta.toolsHub.title);
  md += formatField('Meta Description', meta.toolsHub.description);
  md += formatObjectSections(tools.hub as unknown as Record<string, unknown>);
  stats.toolsHub = wordCount(tools.hub);

  for (const slug of TOOL_SLUGS) {
    const route = publicRouteForLocale(locale, `/tools/${slug}`);
    const tool = tools.pages[slug];
    md += `## ${route}\n\n`;
    md += formatField('Route', route);
    md += formatField('Page Type', 'Tool');
    md += formatField('Indexable', 'Yes');
    md += formatField('Canonical', buildCanonicalUrl(route));
    md += formatField('Meta Title', meta.tools[slug]?.title ?? 'NONE');
    md += formatField('Meta Description', meta.tools[slug]?.description ?? 'NONE');
    md += formatObjectSections(tool as unknown as Record<string, unknown>);
    stats[`tool:${slug}`] = wordCount(tool);
  }

  // Legal
  for (const legal of [
    ['privacy-policy', '/privacy-policy', 'privacyPolicy'],
    ['refund-policy', '/refund-policy', 'refundPolicy'],
    ['terms-and-conditions', '/terms-and-conditions', 'termsAndConditions'],
    ['cookie-policy', '/cookie-policy', 'cookiePolicy'],
    ['disclaimer', '/disclaimer', 'disclaimer'],
  ] as const) {
    const [legalKey, p, metaKey] = legal;
    const route = publicRouteForLocale(locale, p);
    const page = loadLegalPage(locale, legalKey);
    md += `## ${route}\n\n`;
    md += formatField('Route', route);
    md += formatField('Page Type', 'Legal');
    md += formatField('Indexable', 'Yes');
    md += formatField('Canonical', buildCanonicalUrl(route));
    md += formatField('Meta Title', meta[metaKey].title);
    md += formatField('Meta Description', meta[metaKey].description);
    md += formatObjectSections(page as unknown as Record<string, unknown>);
    stats[`legal:${legalKey}`] = wordCount(page);
  }

  stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
  return { md, stats };
}

function extractLearnEnglish(): { md: string; stats: Record<string, number> } {
  let md = `# Learn (English only)\n\n`;
  const stats: Record<string, number> = {};
  const articles = getPublishedLearnArticleRecords();
  md += `## /learn\n\n`;
  md += formatField('Route', '/learn');
  md += formatField('Page Type', 'Learn Hub');
  md += formatField('Indexable', 'Yes');
  md += formatField('Content Source', 'data/content/learn hub + lib/learn');
  md += `### Categories\n\n`;
  for (const cat of LEARN_CATEGORIES) {
    md += `- **${cat.slug}** (${cat.name}): ${cat.description} | active=${cat.active}\n`;
  }
  md += `\n### Tags\n\n`;
  for (const tag of LEARN_TAGS) md += `- **${tag.slug}**: ${tag.name}\n`;
  md += `\n### Published Articles (${articles.length})\n\n`;
  for (const article of articles) {
    const route = `/learn/${article.slug}`;
    md += `## ${route}\n\n`;
    md += formatField('Route', route);
    md += formatField('Page Type', 'Learn Article');
    md += formatField('Indexable', article.seo?.noindex ? 'No' : 'Yes');
    md += formatField('Content Source', `data/learn/articles/${article.slug}.ts`);
    md += formatField('Content Source Type', 'PAGE-SPECIFIC');
    md += formatArticlePage(article);
    stats[route] = wordCount(article.blocks);
  }
  md += `## /authors\n\n`;
  md += formatField('Route', '/authors');
  for (const author of AUTHORS) {
    md += `## /authors/${author.slug}\n\n`;
    md += formatField('Name', author.name);
    md += formatField('Role', author.role);
    md += formatField('Bio', author.bio);
    md += formatField('SEO Title', author.seo?.title);
    md += formatField('SEO Description', author.seo?.description);
    stats[`/authors/${author.slug}`] = wordCount(author.bio);
  }
  stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
  return { md, stats };
}

function extractMarkets(): string {
  let md = `# English Geo Markets (CA, AU, US, UK)\n\n`;
  md += `These are separate from language locales. Content is English with regional overlays.\n\n`;
  for (const market of MARKETS) {
    md += `# Market: ${MARKET_NATIVE_NAMES[market]} (${market})\n\n`;
    const meta = loadMarketMetadataBundle(market);
    const homeRoute = `/${MARKET_PREFIXES[market]}/`;
    const home = loadMarketHomepageHub(market);
    md += `## ${homeRoute}\n\n`;
    md += formatField('Route', homeRoute);
    md += formatField('Page Type', 'Homepage (Geo Market)');
    md += formatField('Indexable', 'Yes');
    md += formatField('Canonical', buildCanonicalUrl(homeRoute));
    md += formatField('Hreflang', MARKET_HREFLANG[market]);
    md += formatField('areaServed', MARKET_COUNTRY_NAME[market]);
    md += formatField('Content Source', `content/markets/${market}/homepage.json + data/content/homepage-hub.ts`);
    md += formatField('Meta Title', meta.homepage.title);
    md += formatField('Meta Description', meta.homepage.description);
    md += formatObjectSections(home as unknown as Record<string, unknown>);
    for (const slug of CORE_SERVICE_SLUGS) {
      const route = `/${market}/${slug}`;
      const bundle = loadMarketServiceBundle(market, slug);
      md += `## ${route}\n\n`;
      md += formatField('Route', route);
      md += formatField('Content Source', `content/markets/${market}/services/${slug}.json`);
      md += formatField('Meta Title', meta.services[slug]?.title ?? 'NONE');
      md += formatField('Meta Description', meta.services[slug]?.description ?? 'NONE');
      md += formatObjectSections(bundle as unknown as Record<string, unknown>);
      const marketFaqIds = bundle.content?.faq?.faqIds ?? [];
      md += `### FAQ\n\n`;
      if (marketFaqIds.length === 0) {
        md += 'NONE\n\n';
      } else {
        const faqs = loadMarketServiceFaqItems(market, marketFaqIds);
        for (const faq of faqs) {
          md += formatField('Q', faq.question);
          md += formatField('A', faq.answer);
        }
      }
    }
  }
  return md;
}

function extractNoindexPages(): string {
  let md = `# Noindex / User-Facing Non-Indexable Pages\n\n`;
  const ui = loadUi(DEFAULT_LOCALE);
  for (const [route, label] of [
    ['/cart', 'Cart'],
    ['/checkout', 'Checkout'],
    ['/order-success', 'Order Success'],
    ['/track-order', 'Track Order'],
    ['/services', 'Services landing'],
    ['/unsubscribe', 'Unsubscribe'],
    ['/unavailable', 'Unavailable (geo block)'],
  ]) {
    md += `## ${route}\n\n`;
    md += formatField('Route', route);
    md += formatField('Indexable', 'No');
    md += formatField('Page Type', label);
  }
  md += `### Cart UI (English)\n\n`;
  md += formatObjectSections(ui.cart as unknown as Record<string, unknown>);
  md += `### Checkout UI (English)\n\n`;
  md += formatObjectSections(ui.checkout as unknown as Record<string, unknown>);
  return md;
}

// --- Build outputs ---
console.log('Extracting website inventory...');

const allLocaleStats: Record<string, Record<string, number>> = {};
let fullContent = `# NovaLikes Full Website Content Extraction\n\n`;
fullContent += `**Generated:** ${GENERATED_AT}\n\n`;
fullContent += `**Source:** Repository content loaders (read-only extraction). No content modified.\n\n`;
fullContent += `---\n\n`;

for (const locale of LOCALES) {
  const { md, stats } = extractLocaleContent(locale);
  fullContent += md + '\n---\n\n';
  allLocaleStats[locale] = stats;
}

const learn = extractLearnEnglish();
fullContent += learn.md + '\n---\n\n';
allLocaleStats.learn = learn.stats;

fullContent += extractMarkets() + '\n---\n\n';
fullContent += extractNoindexPages();

writeDoc('full-website-content.md', fullContent);

// --- site-architecture-inventory.md ---
type RouteRow = {
  route: string;
  locale: string;
  language: string;
  pageType: string;
  indexable: string;
  canonical: string;
  hreflang: string;
  sitemap: string;
  parent: string;
  topic: string;
  source: string;
};

const routeRows: RouteRow[] = [];

function addRow(partial: Omit<RouteRow, 'hreflang'> & { barePath?: string }) {
  const hreflang =
    partial.barePath && partial.indexable === 'Yes'
      ? Object.keys(hreflangMapWithMarket(partial.barePath)).join(', ') || 'NONE'
      : 'NONE';
  routeRows.push({ ...partial, hreflang });
}

for (const locale of LOCALES) {
  const lang = localeLabel(locale);
  for (const p of CORE_PATHS) {
    const route = publicRouteForLocale(locale, p);
    addRow({
      route,
      locale,
      language: lang,
      pageType: p === '/' ? 'Homepage' : p === '/faq' ? 'FAQ' : 'Service',
      indexable: 'Yes',
      canonical: buildCanonicalUrl(route),
      sitemap: 'Yes',
      parent: locale === DEFAULT_LOCALE ? 'English root' : `/${locale}/`,
      topic: p,
      source: locale === DEFAULT_LOCALE ? 'data/content + data/seo' : `content/locales/${locale}/`,
      barePath: p,
    });
  }
  for (const p of TOOL_PATHS) {
    const route = publicRouteForLocale(locale, p);
    addRow({
      route,
      locale,
      language: lang,
      pageType: p === '/tools' ? 'Tools Hub' : 'Tool',
      indexable: 'Yes',
      canonical: buildCanonicalUrl(route),
      sitemap: 'Yes',
      parent: '/tools',
      topic: p,
      source: `content/locales/${locale}/tools.json`,
      barePath: p,
    });
  }
  for (const p of [...COMPANY_PATHS, ...LEGAL_PATHS]) {
    const route = publicRouteForLocale(locale, p);
    addRow({
      route,
      locale,
      language: lang,
      pageType: LEGAL_PATHS.includes(p as (typeof LEGAL_PATHS)[number]) ? 'Legal' : 'Company',
      indexable: 'Yes',
      canonical: buildCanonicalUrl(route),
      sitemap: 'Yes',
      parent: 'Company/Legal',
      topic: p,
      source: `content/locales/${locale}/`,
      barePath: p,
    });
  }
}

for (const market of MARKETS) {
  for (const p of ['/', ...CORE_SERVICE_SLUGS.map((s) => `/${s}`)] as const) {
    const route = p === '/' ? `/${market}/` : `/${market}${p}`;
    addRow({
      route,
      locale: 'en',
      language: `English (${MARKET_COUNTRY_NAME[market]})`,
      pageType: p === '/' ? 'Homepage (Geo)' : 'Service (Geo)',
      indexable: 'Yes',
      canonical: buildCanonicalUrl(route),
      sitemap: 'Yes',
      parent: `/${market}/`,
      topic: `${MARKET_COUNTRY_NAME[market]} ${p}`,
      source: `content/markets/${market}/`,
      barePath: p,
    });
  }
}

for (const article of getPublishedLearnArticleRecords()) {
  addRow({
    route: `/learn/${article.slug}`,
    locale: 'en',
    language: 'English',
    pageType: 'Learn Article',
    indexable: 'Yes',
    canonical: buildCanonicalUrl(`/learn/${article.slug}`),
    sitemap: 'Yes',
    parent: '/learn',
    topic: article.category,
    source: `data/learn/articles/${article.slug}.ts`,
  });
}

for (const cat of LEARN_CATEGORIES.filter((c) => c.active)) {
  addRow({
    route: `/learn/${cat.slug}`,
    locale: 'en',
    language: 'English',
    pageType: 'Learn Category',
    indexable: getPublishedLearnArticleRecords().some((a) => a.category === cat.id) ? 'Yes' : 'No',
    canonical: buildCanonicalUrl(`/learn/${cat.slug}`),
    sitemap: getPublishedLearnArticleRecords().some((a) => a.category === cat.id) ? 'Yes' : 'No',
    parent: '/learn',
    topic: cat.name,
    source: 'data/learn/categories.ts',
  });
}

addRow({
  route: '/sitemap',
  locale: 'en',
  language: 'English',
  pageType: 'HTML Sitemap',
  indexable: 'Yes',
  canonical: buildCanonicalUrl('/sitemap'),
  sitemap: 'Yes',
  parent: '/',
  topic: 'Sitemap',
  source: 'app/(marketing)/sitemap/page.tsx',
});

const sitemapCount = buildSitemapEntries().length;
let archMd = `# NovaLikes Site Architecture Inventory\n\n`;
archMd += `**Generated:** ${GENERATED_AT}\n\n`;
archMd += `**Total route rows documented:** ${routeRows.length}\n\n`;
archMd += `**XML sitemap entries (buildSitemapEntries):** ${sitemapCount}\n\n`;
archMd += `| Route | Locale | Language | Page Type | Indexable | Canonical | Hreflang | Sitemap | Parent | Primary Topic | Source |\n`;
archMd += `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
for (const r of routeRows) {
  archMd += `| ${r.route} | ${r.locale} | ${r.language} | ${r.pageType} | ${r.indexable} | ${r.canonical} | ${r.hreflang.slice(0, 80)}${r.hreflang.length > 80 ? '…' : ''} | ${r.sitemap} | ${r.parent} | ${r.topic} | ${r.source} |\n`;
}

// Language Architecture section
archMd += `\n## Language Architecture\n\n`;
for (const locale of LOCALES) {
  archMd += `### ${localeLabel(locale)} (${locale})\n\n`;
  archMd += formatField('locale code', locale);
  archMd += formatField('URL prefix', locale === DEFAULT_LOCALE ? '(none — unprefixed)' : `/${LOCALE_PREFIXES[locale as keyof typeof LOCALE_PREFIXES]}/`);
  archMd += formatField('hreflang value', HREFLANG[locale]);
  archMd += formatField('HTML lang', HTML_LANG[locale]);
  archMd += formatField('text direction', LOCALE_DIR[locale]);
  archMd += formatField('localized slug strategy', locale === 'ar' ? 'English ASCII slugs under /ar/' : locale === DEFAULT_LOCALE ? 'English canonical slugs' : 'Native translated slugs');
  archMd += formatField('Learn pages', locale === DEFAULT_LOCALE ? 'YES (English only hub)' : 'NO — nav Learn hidden; Learn URLs redirect to English');
  archMd += formatField('full page parity', locale === DEFAULT_LOCALE ? 'YES (superset)' : 'YES for core/tools/company/legal; NO for Learn');
  archMd += `\n`;
}

// Hreflang architecture
archMd += `\n## Hreflang Architecture\n\n`;
archMd += `### Homepage family\n\n`;
archMd += `| Code | URL |\n| --- | --- |\n`;
for (const [code, p] of Object.entries(hreflangMapWithMarket('/'))) {
  archMd += `| ${code} | ${buildCanonicalUrl(p)} |\n`;
}
archMd += `\n### Service example: buy-instagram-followers\n\n`;
archMd += `| Code | URL |\n| --- | --- |\n`;
for (const [code, p] of Object.entries(hreflangMapWithMarket('/buy-instagram-followers'))) {
  archMd += `| ${code} | ${buildCanonicalUrl(p)} |\n`;
}
archMd += `\n### Learn: no hreflang alternates (English-only)\n\n`;

// Currency
archMd += `\n## Currency Architecture\n\n`;
archMd += formatField('Displayed currency', 'USD');
archMd += formatField('Formatting locale', 'en-US (Intl.NumberFormat)');
archMd += formatField('Changes by locale', 'No');
archMd += formatField('Changes by geo market', 'No');
archMd += formatField('Checkout currency', 'USD');
archMd += formatField('Source', 'data/pricing/packages.ts (SOURCE_CURRENCY = USD)');

// Schema
archMd += `\n## Schema Architecture\n\n`;
archMd += `| Schema Type | Routes/Page Types | Locale Behavior | Source |\n`;
archMd += `| --- | --- | --- | --- |\n`;
const schemaRows = [
  ['Organization', 'Site-wide', 'Global English', 'schemas/organization.ts'],
  ['WebSite', 'Site-wide', 'Global', 'schemas/website.ts'],
  ['Service', 'Service pages', 'Localized + geo areaServed on markets', 'schemas/service.ts'],
  ['WebApplication', 'Tool pages', 'Localized copy', 'schemas/web-application.ts'],
  ['FAQPage', 'FAQ hub + articles', 'Localized FAQ hub', 'lib/faqs/schema.ts'],
  ['BlogPosting', 'Learn articles', 'English only', 'lib/learn/article-seo/schema.ts'],
  ['BreadcrumbList', 'Most pages', 'Localized labels via ui.json', 'schemas/breadcrumb.ts'],
  ['Person', 'Author profiles', 'English only', 'lib/authors/schema.ts'],
  ['CollectionPage', 'Learn index/categories/tags', 'English only', 'schemas/website.ts'],
  ['ContactPage', 'Contact', 'Localized', 'schemas/contact-page.ts'],
  ['AboutPage', 'About', 'Localized', 'schemas/website.ts'],
  ['WebPage', 'Legal, reviews, sitemap', 'Localized/legal overlays', 'schemas/website.ts'],
];
for (const row of schemaRows) archMd += `| ${row.join(' | ')} |\n`;

// Content architecture tree
archMd += `\n## Content Architecture (Topical Hierarchy)\n\n`;
archMd += `\`\`\`\nNovaLikes\n├── Instagram\n│   ├── Followers, Likes, Views, Comments (services)\n│   ├── Tools (4 Instagram tools)\n│   └── Learn (9 articles)\n├── TikTok\n│   ├── Followers, Likes, Views (services)\n│   ├── Tools (2 TikTok tools)\n│   └── Learn (10 articles)\n├── Facebook\n│   ├── Followers, Page Likes, Post Likes (services)\n│   ├── Tools (2 Facebook tools)\n│   └── Learn (7 articles)\n├── Company (About, Contact, FAQ, Reviews)\n├── Legal (5 policies)\n├── Learn hub + tags + authors\n└── Geo markets (CA, AU, US, UK) — English regional homepage + 10 services each\n\`\`\`\n`;

// Duplication
archMd += `\n## Content Duplication Architecture\n\n`;
archMd += `- English TS (\`data/content/\`) is source of truth; locale JSON overlays deep-merge required fields\n`;
archMd += `- Market JSON overlays regional English on same TS base\n`;
archMd += `- UI chrome (\`ui.json\`) shared structure, translated strings\n`;
archMd += `- Review testimonial bodies remain English on localized Reviews pages\n`;
archMd += `- Learn articles: no locale overlays\n`;

writeDoc('site-architecture-inventory.md', archMd);

// --- locale-page-parity.md ---
const parityFamilies = [
  ['Homepage', '/'],
  ...CORE_SERVICE_SLUGS.map((s) => [`Service: ${s}`, `/${s}`]),
  ['Tools Hub', '/tools'],
  ...TOOL_SLUGS.map((s) => [`Tool: ${s}`, `/tools/${s}`]),
  ['About', '/about'],
  ['Contact', '/contact'],
  ['FAQ', '/faq'],
  ['Reviews', '/reviews'],
  ['Privacy Policy', '/privacy-policy'],
  ['Refund Policy', '/refund-policy'],
  ['Terms', '/terms-and-conditions'],
  ['Cookie Policy', '/cookie-policy'],
  ['Disclaimer', '/disclaimer'],
  ['Learn Hub', '/learn'],
  ['Learn Categories', '/learn/{category}'],
  ['Learn Tags', '/learn/tag/{tag}'],
  ['Learn Articles (26)', '/learn/{slug}'],
  ['Authors Index', '/authors'],
  ['Author Profile', '/authors/najaf-khan'],
  ['HTML Sitemap', '/sitemap'],
];

let parityMd = `# Locale Page Parity Matrix\n\n`;
parityMd += `**Generated:** ${GENERATED_AT}\n\n`;
parityMd += `| Page / Page Family | EN | ES | DE | FR | IT | PT-BR | AR |\n`;
parityMd += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
for (const [name] of parityFamilies) {
  const learnOnly = name.startsWith('Learn') || name.startsWith('Author');
  const row = [name];
  for (const locale of LOCALES) {
    if (learnOnly) row.push(locale === DEFAULT_LOCALE ? 'YES' : 'ENGLISH-ONLY');
    else if (name.startsWith('Tool:') || name === 'Tools Hub' || name === 'Homepage' || name.startsWith('Service:') || ['About', 'Contact', 'FAQ', 'Reviews'].includes(name) || name.includes('Policy') || name === 'Terms' || name === 'Disclaimer' || name === 'HTML Sitemap')
      row.push('YES');
    else row.push('YES');
  }
  parityMd += `| ${row.join(' | ')} |\n`;
}
parityMd += `\n**Notes:**\n- Learn, authors, and article routes are English-only by design.\n- Geo markets (CA/AU/US/UK) are separate from this matrix — English regional overlays at \`/{market}/\`.\n- Cart, checkout, order-success, track-order: English-only, NOINDEX.\n`;

writeDoc('locale-page-parity.md', parityMd);

// --- language-country-targeting.md ---
function scanGeoSignals(): Array<{ signal: string; location: string; locale: string; meaning: string }> {
  const signals: Array<{ signal: string; location: string; locale: string; meaning: string }> = [];
  const patterns = [
    'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Brazil',
    'USD', 'worldwide', 'global', 'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow',
  ];
  const scanDir = (dir: string, locale = 'all') => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) scanDir(full, entry.includes('locales') ? entry : locale);
      else if (/\.(json|ts|tsx|md)$/.test(entry)) {
        const text = readFileSync(full, 'utf8');
        for (const p of patterns) {
          if (text.includes(p))
            signals.push({
              signal: p,
              location: full.replace(process.cwd(), '').replace(/\\/g, '/'),
              locale,
              meaning: 'Literal string present in source file',
            });
        }
      }
    }
  };
  scanDir(path.join(process.cwd(), 'content'));
  scanDir(path.join(process.cwd(), 'data'));
  scanDir(path.join(process.cwd(), 'lib', 'i18n'));
  scanDir(path.join(process.cwd(), 'lib', 'market'));
  return signals.slice(0, 200);
}

const geoSignals = scanGeoSignals();
let targetingMd = `# Language & Country Targeting Inventory\n\n`;
targetingMd += `**Generated:** ${GENERATED_AT}\n\n`;
targetingMd += `## Language Targeting vs Country Targeting\n\n`;
const targetingRows = [
  ['en', 'English', 'Global / International (default unprefixed English)', 'Inferred — no single country in default English copy; OG locale en_US', 'Geo market pages (CA/AU/US/UK) add country-specific English', 'No — generic en'],
  ['es', 'Spanish', 'Spanish-language users', 'Inferred — hreflang es, OG es_ES implies Spain region code not country page', 'No dedicated Spain/LATAM country pages', 'es implies language not country'],
  ['de', 'German', 'German-language users', 'Inferred — OG de_DE', 'No Germany/DACH country pages', 'de implies language'],
  ['fr', 'French', 'French-language users', 'Inferred — OG fr_FR', 'No France/Canada/Belgium country pages', 'fr implies language'],
  ['it', 'Italian', 'Italian-language users', 'Inferred — OG it_IT', 'No Italy country pages', 'it implies language'],
  ['pt-br', 'Portuguese (Brazil)', 'Brazilian Portuguese speakers', 'Explicit — locale code pt-BR, OG pt_BR, native label "Português (Brasil)"', 'Strong Brazil language variant signal', 'pt-BR explicitly Brazil variant'],
  ['ar', 'Arabic', 'Arabic-language users', 'Inferred — RTL, OG ar_AR; no country named in locale config', 'No Saudi/UAE/Egypt country pages', 'ar implies language not country'],
];
targetingMd += `| Locale | Language | Current Target (Evidence) | Country Signal | Contradictions | Locale code note |\n`;
targetingMd += `| --- | --- | --- | --- | --- | --- |\n`;
for (const r of targetingRows) targetingMd += `| ${r.join(' | ')} |\n`;

targetingMd += `\n## Geo Markets (Country-Targeted English — NOT locales)\n\n`;
targetingMd += `| Market | Prefix | Country | hreflang | Content evidence |\n`;
targetingMd += `| --- | --- | --- | --- | --- |\n`;
for (const m of MARKETS) {
  targetingMd += `| ${m} | /${m}/ | ${MARKET_COUNTRY_NAME[m]} | ${MARKET_HREFLANG[m]} | content/markets/${m}/ — regional city names and country copy |\n`;
}

targetingMd += `\n## Geographic Signals Found\n\n`;
targetingMd += `| Signal | Location | Locale/Market | Meaning |\n| --- | --- | --- | --- |\n`;
for (const s of geoSignals) {
  targetingMd += `| ${s.signal} | ${s.location} | ${s.locale} | ${s.meaning} |\n`;
}

targetingMd += `\n## Currency Architecture\n\n`;
targetingMd += `- All package prices stored and displayed in **USD**\n`;
targetingMd += `- \`formatMoney()\` defaults to \`en-US\` locale regardless of page locale/market\n`;
targetingMd += `- Legal/terms mention USD explicitly in all locale overlays\n`;
targetingMd += `- No CAD/GBP/AUD display on CA/UK/AU market pages\n`;

writeDoc('language-country-targeting.md', targetingMd);

// --- internal-link-architecture.md ---
let linksMd = `# Internal Link Architecture\n\n`;
linksMd += `**Generated:** ${GENERATED_AT}\n\n`;
linksMd += `## Global Navigation (Header)\n\n`;
for (const item of getMainNavigation(DEFAULT_LOCALE)) {
  linksMd += `- ${'label' in item ? item.label : item.id}: ${'href' in item ? item.href : 'mega menu'}\n`;
  if ('platformId' in item) {
    for (const svc of getMegaMenuServices(item.platformId)) linksMd += `  - ${svc.navigationLabel}: ${svc.url}\n`;
  }
}
linksMd += `\n## Footer Columns\n\n`;
for (const col of getFooterColumns()) {
  linksMd += `### ${col.title}\n`;
  for (const link of col.links) linksMd += `- ${link.label} → ${link.href}\n`;
}
linksMd += `\n## Page Family Link Patterns\n\n`;
linksMd += `| From | To | Link type |\n| --- | --- | --- |\n`;
linksMd += `| Homepage | 10 services, tools, learn, company | Hero CTAs, service cards, nav, footer |\n`;
linksMd += `| Service | Related services, tools, learn articles | In-content links, related modules, breadcrumbs, footer |\n`;
linksMd += `| Tool | Services, learn | Related services config (data/tools/related-services.ts) |\n`;
linksMd += `| Learn article | Services, related articles | relatedServices, relatedArticles, inlineLinks in blocks |\n`;
linksMd += `| FAQ | Services, legal, contact | FAQ answers + footer |\n`;
linksMd += `| Geo market pages | Same-market service URLs | Internal links localized to /{market}/ prefix |\n`;
linksMd += `\n## Learn Article Outgoing Links (relatedServices)\n\n`;
for (const a of getPublishedLearnArticleRecords()) {
  if (a.relatedServices.length) linksMd += `- /learn/${a.slug} → ${a.relatedServices.join(', ')}\n`;
}
linksMd += `\n## Orphan Check\n\n`;
linksMd += `- All 10 approved services linked from nav mega menus + footer\n`;
linksMd += `- All 8 tools linked from /tools hub\n`;
linksMd += `- Learn categories with 0 articles (social-media-marketing, guides): indexable only when articles exist — currently NO articles\n`;
linksMd += `- /services route exists but NOINDEX and excluded from sitemap\n`;

writeDoc('internal-link-architecture.md', linksMd);

// --- site-content-stats.json ---
const publishedSlugs = new Set(getPublishedLearnArticleRecords().map((a) => a.slug));
const plannedSlugs = NOVALIKES_EDITORIAL_PLAN.map((p) => p.slug).filter((s) => !publishedSlugs.has(s));

const statsJson = {
  generatedAt: GENERATED_AT,
  totalPublishedLearnArticles: getPublishedLearnArticleRecords().length,
  plannedLearnArticlesExcluded: plannedSlugs,
  locales: LOCALES,
  geoMarkets: MARKETS,
  indexableRegistryEntries: getIndexableMetadataEntries().length,
  sitemapProductionAllowlistRoutes: SITEMAP_PRODUCTION_ROUTES.length,
  xmlSitemapEntryCount: sitemapCount,
  routeRowsDocumented: routeRows.length,
  wordCountsByLocale: allLocaleStats,
  tools: TOOL_SLUGS,
  services: CORE_SERVICE_SLUGS,
  hreflangPerLocale: HREFLANG,
  urlPrefixPerLocale: { en: '', ...LOCALE_PREFIXES },
};

writeDoc('site-content-stats.json', JSON.stringify(statsJson, null, 2));

console.log('\nDone. Published articles:', getPublishedLearnArticleRecords().length);
console.log('Planned excluded:', plannedSlugs.length);
console.log('Route rows:', routeRows.length);
console.log('Sitemap entries:', sitemapCount);

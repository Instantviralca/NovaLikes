/**
 * Crawl/discovery: robots, XML sitemap, HTML sitemap, and llms.txt.
 */

import { describe, expect, it } from 'vitest';

import { getFooterColumns } from '@/data/footer';
import {
  getPublicDirectoryHrefs,
  getPublicDirectorySections,
} from '@/data/seo/public-directory';
import { GET as llmsTxtGET } from '@/app/llms.txt/route';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnCategorySlugs } from '@/data/learn';
import {
  ROBOTS_DISALLOW,
  buildSitemapEntries,
  findNoindexSitemapEntries,
  getRobotsRules,
  getSitemapUrl,
} from '@/lib/seo/sitemap';
import { buildLlmsTxt } from '@/lib/seo/llms-txt';
import { getMetadataByRoute } from '@/lib/seo/metadata';

const PRIVATE_PATHS = [
  '/admin',
  '/admin/login',
  '/author',
  '/author/login',
  '/api/checkout',
  '/cart',
  '/checkout',
  '/order-success',
  '/track-order',
  '/track-order/result',
  '/search',
  '/preview/example',
  '/draft/example',
  '/learn/preview/example',
];

const PUBLIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/reviews',
  '/faq',
  '/buy-instagram-followers',
  '/buy-instagram-likes',
  '/buy-instagram-views',
  '/buy-instagram-comments',
  '/buy-tiktok-followers',
  '/buy-tiktok-likes',
  '/buy-tiktok-views',
  '/buy-facebook-followers',
  '/buy-facebook-page-likes',
  '/buy-facebook-post-likes',
  '/tools',
  '/tools/instagram-profile-picture-viewer',
  '/tools/instagram-follower-counter',
  '/tools/instagram-profile-viewer',
  '/tools/instagram-video-downloader',
  '/tools/tiktok-video-downloader',
  '/tools/tiktok-profile-picture-downloader',
  '/tools/facebook-video-downloader',
  '/tools/facebook-reels-downloader',
  '/learn',
  '/privacy-policy',
  '/refund-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/disclaimer',
  '/sitemap',
];

function isRobotsDisallowed(pathname: string): boolean {
  const rules = getRobotsRules()[0]!;
  return rules.disallow.some((rule) => {
    if (rule.endsWith('/')) {
      return pathname === rule.slice(0, -1) || pathname.startsWith(rule);
    }
    return pathname === rule || pathname.startsWith(`${rule}/`);
  });
}

function forbiddenDiscoveryBlob(value: string): string[] {
  const hits: string[] = [];
  const lower = value.toLowerCase();
  if (/youtube/.test(lower)) hits.push('youtube');
  if (/https?:\/\/(www\.)?(twitter|x)\.com/.test(lower)) hits.push('twitter/x');
  if (/localhost|127\.0\.0\.1|novalikes-next\.vercel\.app|preview\.novalikes/.test(lower)) {
    hits.push('localhost/preview');
  }
  return hits;
}

describe('robots.txt production rules', () => {
  it('declares exactly the production XML sitemap', () => {
    expect(getSitemapUrl()).toBe('https://novalikes.com/sitemap.xml');
    expect(getRobotsRules()).toHaveLength(1);
  });

  it('does not block public services, tools, or company pages', () => {
    for (const path of PUBLIC_PATHS) {
      expect(isRobotsDisallowed(path), path).toBe(false);
    }
  });

  it('excludes private and unnecessary crawl areas', () => {
    for (const required of ROBOTS_DISALLOW) {
      expect(getRobotsRules()[0]?.disallow).toContain(required);
    }
    expect(isRobotsDisallowed('/admin/dashboard')).toBe(true);
    expect(isRobotsDisallowed('/author/articles')).toBe(true);
    expect(isRobotsDisallowed('/api/orders')).toBe(true);
    expect(isRobotsDisallowed('/checkout')).toBe(true);
    expect(isRobotsDisallowed('/cart')).toBe(true);
    expect(isRobotsDisallowed('/search')).toBe(true);
    expect(isRobotsDisallowed('/track-order/result')).toBe(true);
    expect(isRobotsDisallowed('/learn/preview/draft-slug')).toBe(true);
  });

  it('keeps the noindex track-order form crawlable', () => {
    expect(isRobotsDisallowed('/track-order')).toBe(false);
    expect(getMetadataByRoute('/track-order')?.robots.index).toBe(false);
  });
});

describe('XML sitemap production allowlist', () => {
  const entries = buildSitemapEntries();
  const urls = entries.map((entry) => entry.url);
  const blob = urls.join('\n');

  it('uses the production domain only', () => {
    expect(urls.every((url) => url.startsWith('https://novalikes.com'))).toBe(true);
    expect(forbiddenDiscoveryBlob(blob)).toEqual([]);
  });

  it('includes canonical public URLs and the HTML sitemap', () => {
    expect(urls).toContain('https://novalikes.com');
    expect(urls).toContain('https://novalikes.com/sitemap');
    for (const path of PUBLIC_PATHS) {
      if (path === '/') {
        expect(urls).toContain('https://novalikes.com');
        continue;
      }
      expect(urls).toContain(`https://novalikes.com${path}`);
    }
  });

  it('excludes private, YouTube, X/Twitter, and empty Learn taxonomy URLs', () => {
    expect(findNoindexSitemapEntries(entries)).toHaveLength(0);
    for (const path of PRIVATE_PATHS) {
      expect(urls).not.toContain(`https://novalikes.com${path}`);
    }
    expect(urls.some((url) => url.includes('/learn/youtube'))).toBe(false);
    expect(urls.some((url) => url.includes('/buy-youtube'))).toBe(false);
    expect(urls.some((url) => /\/learn\/(instagram|tiktok|facebook)$/.test(url))).toBe(
      true,
    );
  });

  it('includes only published indexable Learn articles', () => {
    const categorySlugs = new Set(getLearnCategorySlugs(true));
    const articleUrls = urls.filter((url) => {
      const match = url.match(/^https:\/\/novalikes\.com\/learn\/([^/]+)$/);
      return Boolean(match && match[1] && !categorySlugs.has(match[1]));
    });
    const published = getIndexableArticles();
    expect(articleUrls).toHaveLength(published.length);
    for (const article of published) {
      expect(urls).toContain(`https://novalikes.com/learn/${article.slug}`);
    }
  });
});

describe('HTML sitemap public directory', () => {
  const hrefs = getPublicDirectoryHrefs();
  const sections = getPublicDirectorySections();

  it('lists the required public groups and crawlable paths', () => {
    expect(sections.map((section) => section.id)).toEqual([
      'main',
      'instagram',
      'tiktok',
      'facebook',
      'tools',
      'guides',
      'policies',
    ]);
    for (const path of PUBLIC_PATHS) {
      if (path === '/sitemap') continue;
      expect(hrefs).toContain(path);
    }
  });

  it('does not include private or unsupported-platform links', () => {
    const blob = hrefs.join('\n').toLowerCase();
    for (const path of PRIVATE_PATHS) {
      expect(hrefs).not.toContain(path);
    }
    expect(blob).not.toContain('youtube');
    expect(blob).not.toContain('/admin');
    expect(blob).not.toContain('/checkout');
    expect(blob).not.toContain('/cart');
    expect(blob).not.toContain('/track-order');
  });

  it('adds a footer Sitemap link to /sitemap', () => {
    const legal = getFooterColumns().find((column) => column.id === 'legal');
    expect(legal?.links.some((link) => link.label === 'Sitemap' && link.href === '/sitemap')).toBe(
      true,
    );
  });
});

describe('llms.txt', () => {
  it('returns UTF-8 plain text with the required public sections', async () => {
    const response = llmsTxtGET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/plain');
    const body = await response.text();
    expect(body).toBe(buildLlmsTxt());
    expect(body.startsWith('# NovaLikes')).toBe(true);
    expect(body).toContain('## Instagram Services');
    expect(body).toContain('## TikTok Services');
    expect(body).toContain('## Facebook Services');
    expect(body).toContain('## Free Tools');
    expect(body).toContain('## Guides');
    expect(body).toContain('## Policies');
    expect(body).toContain('https://novalikes.com/buy-instagram-followers');
    expect(body).toContain('https://novalikes.com/tools');
    expect(forbiddenDiscoveryBlob(body)).toEqual([]);
    expect(body.toLowerCase()).not.toContain('/admin');
    expect(body.toLowerCase()).not.toContain('/checkout');
    expect(body.toLowerCase()).not.toContain('/api/');
  });
});

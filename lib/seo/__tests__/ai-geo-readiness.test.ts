/**
 * AI / GEO / AEO readiness regression tests — crawlability, indexability, schema guards.
 */

import { describe, expect, it } from 'vitest';

import { NOVALIKES_EDITORIAL_PLAN } from '@/lib/cms/editorial-plan';
import { getPublishedLearnArticleRecords, getPublishedLearnArticleSlugs } from '@/data/learn/articles';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { TOOLS } from '@/data/tools/registry';
import { hreflangMap } from '@/lib/i18n/paths';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { resolvePublicArticleTimestamps } from '@/lib/learn/article-seo/public-dates';
import { buildLlmsTxt } from '@/lib/seo/llms-txt';
import {
  buildSitemapEntries,
  findNoindexSitemapEntries,
  isOaiSearchBotAllowedOnPublicPages,
  isPathAllowedForCrawler,
  ROBOTS_DISALLOW,
} from '@/lib/seo/sitemap';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { getTagSitemapRoutes } from '@/lib/seo/sitemap/routes';
import { LEARN_TAGS } from '@/data/learn/tags';
import { getTagBySlug } from '@/lib/learn/taxonomy';

const PUBLIC_LANDING_PATHS = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/learn',
  '/tools',
  ...APPROVED_SERVICE_SLUGS.map((slug) => `/${slug}`),
  ...TOOLS.map((tool) => tool.href),
];

describe('AI/GEO crawlability and indexability', () => {
  it('allows OAI-SearchBot on important public pages via wildcard robots rules', () => {
    expect(isOaiSearchBotAllowedOnPublicPages()).toBe(true);
    for (const path of PUBLIC_LANDING_PATHS.slice(0, 8)) {
      expect(isPathAllowedForCrawler(path, 'OAI-SearchBot')).toBe(true);
    }
  });

  it('keeps private and operational paths disallowed for all crawlers', () => {
    for (const prefix of ROBOTS_DISALLOW) {
      const sample = prefix.endsWith('/') ? `${prefix}dashboard` : prefix;
      expect(isPathAllowedForCrawler(sample)).toBe(false);
    }
  });

  it('marks important public pages as indexable in metadata', () => {
    for (const path of PUBLIC_LANDING_PATHS) {
      const entry = getMetadataByRoute(path);
      if (!entry) continue;
      expect(entry.indexable, path).toBe(true);
      expect(entry.robots?.index !== false, path).toBe(true);
    }
  });

  it('keeps private routes noindex in metadata', () => {
    for (const path of ['/cart', '/checkout', '/order-success', '/track-order']) {
      const entry = getMetadataByRoute(path);
      expect(entry?.robots.index, path).toBe(false);
    }
  });

  it('includes only canonical public URLs in the XML sitemap', () => {
    const entries = buildSitemapEntries();
    expect(findNoindexSitemapEntries(entries)).toHaveLength(0);
    expect(entries.every((entry) => entry.url.startsWith('https://novalikes.com'))).toBe(true);
    for (const path of ['/admin', '/author', '/api/health', '/cart', '/checkout']) {
      expect(entries.some((entry) => entry.url === `https://novalikes.com${path}`)).toBe(false);
    }
  });
});

describe('Learn corpus and editorial boundaries', () => {
  it('keeps 26 live registry articles discoverable with valid public dates', () => {
    const slugs = getPublishedLearnArticleSlugs();
    expect(slugs).toHaveLength(26);
    const now = Date.now();
    for (const article of getIndexableArticles()) {
      const dates = resolvePublicArticleTimestamps({
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        showModifiedDate: article.showModifiedDate,
      });
      expect(dates.datePublished).toBeTruthy();
      expect(new Date(dates.datePublished!).getTime()).toBeLessThanOrEqual(now);
      if (dates.dateModified) {
        expect(new Date(dates.dateModified).getTime()).toBeLessThanOrEqual(now);
      }
    }
  });

  it('does not publish the four remaining planned-only CMS editorial targets in the registry', () => {
    const liveSlugs = new Set(getPublishedLearnArticleSlugs());
    const plannedOnly = NOVALIKES_EDITORIAL_PLAN.filter((item) => !liveSlugs.has(item.slug));
    expect(plannedOnly).toHaveLength(4);
    expect(plannedOnly.map((item) => item.slug)).toEqual([
      'facebook-page-likes-vs-followers',
      'how-to-save-tiktok-profile-picture-full-size',
      'how-to-download-public-tiktok-video',
      'how-to-download-instagram-videos-reels',
    ]);
  });

  it('keeps Learn English-only without localized Learn hreflang alternates', () => {
    const sample = hreflangMap('/learn/tiktok-seo');
    expect(sample?.es).toBeUndefined();
    expect(sample?.de).toBeUndefined();
    expect(sample?.fr).toBeUndefined();
    expect(sample?.ar).toBeUndefined();
  });
});

describe('Structured data and discovery file guards', () => {
  it('does not expose YouTube purchase URLs in llms.txt or sitemap', () => {
    const llms = buildLlmsTxt().toLowerCase();
    expect(llms).not.toContain('youtube');
    expect(llms).not.toContain('/buy-youtube');
    const urls = buildSitemapEntries().map((entry) => entry.url).join('\n').toLowerCase();
    expect(urls).not.toContain('youtube');
  });

  it('excludes empty Learn tag archives from the sitemap', () => {
    const tagRoutes = getTagSitemapRoutes();
    for (const route of tagRoutes) {
      const slug = route.route.replace('/learn/tag/', '');
      expect(getTagBySlug(slug)?.articleCount ?? 0).toBeGreaterThan(0);
    }
    for (const tag of LEARN_TAGS) {
      if ((getTagBySlug(tag.slug)?.articleCount ?? 0) === 0) {
        expect(tagRoutes.some((route) => route.route.endsWith(`/${tag.slug}`))).toBe(false);
      }
    }
  });
});

describe('Multilingual hreflang (core pages)', () => {
  it('uses English ASCII slugs under /ar/ for localized service pages', () => {
    const map = hreflangMap('/buy-instagram-followers');
    expect(map?.['ar']).toBe('/ar/buy-instagram-followers');
  });
});

describe('Live Learn article registry integrity', () => {
  it('matches published records count to public slug list', () => {
    expect(getPublishedLearnArticleRecords()).toHaveLength(26);
    expect(getPublishedLearnArticleSlugs().length).toBe(26);
  });
});

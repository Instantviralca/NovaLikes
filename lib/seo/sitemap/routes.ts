/**
 * Indexable route selection for sitemap — Document 14.08.
 */

import {
  LEARN_SITEMAP_ENABLED,
  SITEMAP_EXCLUSION_PREFIXES,
  SITEMAP_PRODUCTION_ROUTES,
  SITEMAP_PRODUCTION_ROUTE_SET,
} from '@/data/seo/sitemap-routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getActiveLearnCategories } from '@/data/learn';
import {
  getLearnArticlesByCategory,
  getPublishedLearnArticleRecords,
} from '@/data/learn/articles';
import { getServiceBySlug } from '@/data/services';
import { LEARN_TAG_PAGES_ENABLED } from '@/config/learn-taxonomy';
import { getActiveAuthors } from '@/lib/authors/getters';
import { authorPath, authorsIndexPath } from '@/lib/authors/paths';
import {
  buildArticleCanonical,
  getIndexableArticles,
} from '@/lib/learn/article-seo';
import { getTags } from '@/lib/learn/taxonomy/getters';
import { tagPath } from '@/lib/learn/taxonomy/paths';
import { getMetadataByRoute } from '@/lib/seo/metadata/getters';
import {
  buildCanonicalUrl,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import type { IndexableRoute, SitemapChangeFrequency } from '@/types/sitemap';

function isExcludedRoute(route: string): boolean {
  const normalized = normalizeCanonicalPath(route);
  return SITEMAP_EXCLUSION_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

function parseLastModified(iso: string | undefined): Date {
  if (!iso) return new Date('2026-07-12T00:00:00.000Z');
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? new Date('2026-07-12T00:00:00.000Z')
    : date;
}

function changeFrequencyFor(route: string, pageType: string): SitemapChangeFrequency {
  if (route === '/') return 'weekly';
  if (pageType === 'service') return 'weekly';
  if (pageType === 'legal') return 'yearly';
  if (route === '/track-order') return 'monthly';
  return 'monthly';
}

function priorityFor(route: string, pageType: string, featured: boolean): number {
  if (route === '/') return 1;
  if (pageType === 'service') return featured ? 0.9 : 0.85;
  if (route === '/tools') return 0.7;
  if (pageType === 'tools') return 0.65;
  if (route === '/track-order') return 0.5;
  if (pageType === 'legal') return 0.4;
  if (route === '/about' || route === '/contact' || route === '/faq') return 0.65;
  return 0.6;
}

/**
 * Active, indexable, production-ready routes for the sitemap.
 * Sourced from the metadata registry + Document 14.08 allowlist.
 * Learn routes are prepared but not included until LEARN_SITEMAP_ENABLED.
 */
export function getIndexableRoutes(): IndexableRoute[] {
  const result: IndexableRoute[] = [];

  for (const route of SITEMAP_PRODUCTION_ROUTES) {
    const normalized = normalizeCanonicalPath(route);
    if (isExcludedRoute(normalized)) continue;

    if (normalized.startsWith('/buy-')) {
      const slug = normalized.slice(1);
      if (!isApprovedServiceSlug(slug)) continue;
    }

    if (!SITEMAP_PRODUCTION_ROUTE_SET.has(normalized)) continue;

    const entry = getMetadataByRoute(normalized);
    if (!entry || !entry.active || !entry.indexable) continue;

    const service = normalized.startsWith('/buy-')
      ? getServiceBySlug(normalized.slice(1))
      : undefined;

    result.push({
      route: normalized,
      canonicalUrl: buildCanonicalUrl(entry.canonicalPath),
      lastModified: parseLastModified(entry.updatedAt),
      changeFrequency: changeFrequencyFor(normalized, entry.pageType),
      priority: priorityFor(normalized, entry.pageType, Boolean(service?.featured)),
      pageType: entry.pageType,
      sourceFile: entry.sourceFile,
    });
  }

  if (LEARN_SITEMAP_ENABLED) {
    result.push(...getFutureLearnSitemapRoutes());
  }

  result.push(...getAuthorSitemapRoutes());
  result.push(...getTagSitemapRoutes());

  return result;
}

/** Indexable author hub + profiles for sitemap discovery. */
export function getAuthorSitemapRoutes(): IndexableRoute[] {
  if (getPublishedLearnArticleRecords().length === 0) return [];

  const authors = getActiveAuthors().filter((author) => author.articleCount > 0);
  if (authors.length === 0) return [];

  const index: IndexableRoute = {
    route: normalizeCanonicalPath(authorsIndexPath()),
    canonicalUrl: buildCanonicalUrl(authorsIndexPath()),
    lastModified: parseLastModified(undefined),
    changeFrequency: 'monthly',
    priority: 0.55,
    pageType: 'learn',
    sourceFile: 'data/authors/registry.ts',
  };

  const profiles = authors.map((author) => ({
    route: normalizeCanonicalPath(authorPath(author.slug)),
    canonicalUrl: buildCanonicalUrl(author.seo.canonicalPath || authorPath(author.slug)),
    lastModified: parseLastModified(author.joinedAt),
    changeFrequency: 'monthly' as SitemapChangeFrequency,
    priority: 0.5,
    pageType: 'learn' as const,
    sourceFile: 'data/authors/registry.ts',
  }));

  return [index, ...profiles];
}

/** Indexable Learn tag archives when tag pages are enabled. */
export function getTagSitemapRoutes(): IndexableRoute[] {
  if (!LEARN_TAG_PAGES_ENABLED) return [];

  return getTags()
    .filter((tag) => tag.articleCount > 0)
    .map((tag) => ({
      route: normalizeCanonicalPath(tagPath(tag.slug)),
      canonicalUrl: buildCanonicalUrl(tagPath(tag.slug)),
      lastModified: parseLastModified(undefined),
      changeFrequency: 'weekly' as SitemapChangeFrequency,
      priority: 0.45,
      pageType: 'learn' as const,
      sourceFile: 'data/learn/tags.ts',
    }));
}

/** Learn article + category sitemap candidates — Document 15.07 / 14.08. */
export function getFutureLearnSitemapRoutes(): IndexableRoute[] {
  const articleRoutes = getIndexableArticles().map((article) => {
    const lastModifiedRaw = article.showModifiedDate
      ? article.updatedAt
      : article.publishedAt;
    return {
      route: normalizeCanonicalPath(`/learn/${article.slug}`),
      canonicalUrl: buildArticleCanonical(article.slug),
      lastModified: parseLastModified(lastModifiedRaw),
      changeFrequency: 'monthly' as SitemapChangeFrequency,
      priority: article.featured ? 0.7 : 0.6,
      pageType: 'learn' as const,
      sourceFile: 'data/learn/articles.ts',
    };
  });

  const categoryRoutes = getActiveLearnCategories()
    .filter((category) => category.slug !== 'news')
    .filter((category) => getLearnArticlesByCategory(category.id).length > 0)
    .map((category) => {
      const entry = getMetadataByRoute(`/learn/${category.slug}`);
      return {
        route: normalizeCanonicalPath(`/learn/${category.slug}`),
        canonicalUrl: buildCanonicalUrl(`/learn/${category.slug}`),
        lastModified: parseLastModified(entry?.updatedAt),
        changeFrequency: 'weekly' as SitemapChangeFrequency,
        priority: 0.65,
        pageType: 'learn' as const,
        sourceFile: 'data/learn/categories.ts',
      };
    })
    .filter((route) => {
      const entry = getMetadataByRoute(route.route);
      return Boolean(entry?.active && entry.indexable);
    });

  return [...categoryRoutes, ...articleRoutes];
}

export function isSitemapProductionRoute(route: string): boolean {
  return SITEMAP_PRODUCTION_ROUTE_SET.has(normalizeCanonicalPath(route));
}

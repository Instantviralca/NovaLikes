/**
 * Orphan / internal-link coordination for sitemap — Document 14.08.
 */

import type { MetadataRoute } from 'next';

import { AUTHOR_PATH_PREFIX } from '@/config/authors';
import { LEARN_TAG_PAGES_ENABLED, LEARN_TAG_PATH_PREFIX } from '@/config/learn-taxonomy';
import { AUTHORS } from '@/data/authors';
import { LEARN_TAGS } from '@/data/learn/tags';
import { SITEMAP_PRODUCTION_ROUTES } from '@/data/seo/sitemap-routes';
import { getLinkRegistry } from '@/data/linking/registry';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getMetadataByRoute } from '@/lib/seo/metadata/getters';
import { normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';
import { LOCALIZED_LOCALES, CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import { COMPANY_PATHS, CORE_PATHS, LEGAL_PATHS, TOOL_PATHS } from '@/lib/i18n/core-paths';
import { localizeHref } from '@/lib/i18n/paths';
import { MARKETS } from '@/lib/market/config';
import { localizeMarketHref } from '@/lib/market/paths';
import { decodePathname } from '@/lib/i18n/slugs';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import type { SitemapIssue } from '@/types/sitemap';

function collectInboundFromLinkRegistry(): Map<string, Set<string>> {
  const inbound = new Map<string, Set<string>>();
  const add = (from: string, to: string) => {
    const target = normalizeCanonicalPath(to.startsWith('/') ? to : `/${to}`);
    const source = normalizeCanonicalPath(from.startsWith('/') ? from : `/${from}`);
    if (source === target) return;
    const set = inbound.get(target) ?? new Set<string>();
    set.add(source);
    inbound.set(target, set);
  };

  for (const page of getLinkRegistry()) {
    if (!page.active) continue;
    const from =
      page.slug === 'home'
        ? '/'
        : page.slug.startsWith('learn/')
          ? `/${page.slug}`
          : `/${page.slug}`;

    for (const slug of page.relatedServices) {
      add(from, `/${slug}`);
    }
    for (const slug of page.relatedArticles) {
      add(from, slug.startsWith('learn/') ? `/${slug}` : `/learn/${slug}`);
    }
    for (const slug of page.relatedPolicies) {
      add(from, `/${slug}`);
    }
  }

  // Global chrome (header/footer) links every production sitemap route from home
  for (const route of SITEMAP_PRODUCTION_ROUTES) {
    if (route !== '/') add('/', route);
  }

  // Language switcher + HTML sitemap discover localized core pages
  add('/sitemap', '/');
  for (const locale of LOCALIZED_LOCALES) {
    add('/', localizeHref('/', locale));
    add('/sitemap', localizeHref('/', locale));
    for (const path of [...CORE_PATHS, ...TOOL_PATHS, ...COMPANY_PATHS, ...LEGAL_PATHS]) {
      const localized = localizeHref(path, locale);
      add(localizeHref('/', locale), localized);
      add('/sitemap', localized);
    }
  }

  // Learn hub discovers author + tag archive hubs included in the sitemap
  add('/learn', '/authors');
  for (const author of AUTHORS.filter((item) => item.active)) {
    add('/learn', `${AUTHOR_PATH_PREFIX}/${author.slug}`);
  }
  if (LEARN_TAG_PAGES_ENABLED) {
    for (const tag of LEARN_TAGS.filter((item) => item.active)) {
      add('/learn', `${LEARN_TAG_PATH_PREFIX}/${tag.slug}`);
    }
  }

  // Market geo pages: global sitemap page → market homepage; market homepage → its service pages
  for (const market of MARKETS) {
    const marketHome = localizeMarketHref('/', market);
    // Global sitemap page and global homepage both link to market homepages
    add('/sitemap', marketHome);
    add('/', marketHome);
    // Each market homepage links to its 10 service pages
    for (const slug of CORE_SERVICE_SLUGS) {
      const servicePath = `/${slug}`;
      const marketService = localizeMarketHref(servicePath, market);
      add(marketHome, marketService);
    }
  }

  return inbound;
}

/**
 * Sitemap pages with no inbound internal links from other active pages.
 */
export function findOrphanSitemapPages(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const inbound = collectInboundFromLinkRegistry();
  const issues: SitemapIssue[] = [];

  for (const entry of entries) {
    const path = normalizeCanonicalPath(
      decodePathname(new URL(entry.url).pathname || '/'),
    );
    if (path === '/') continue;

    const sources = inbound.get(path);
    if (sources && sources.size > 0) continue;

    issues.push({
      kind: 'orphan_page',
      route: path,
      url: entry.url,
      detail: `Sitemap page ${path} has no inbound internal links from active registry pages`,
    });
  }

  return issues;
}

/**
 * Report internal links pointing at noindex or skipped destinations.
 */
export function findUnsafeInternalLinks(): SitemapIssue[] {
  const issues: SitemapIssue[] = [];

  for (const page of getLinkRegistry()) {
    if (!page.active) continue;
    const from = page.slug === 'home' ? '/' : `/${page.slug}`;

    for (const serviceSlug of page.relatedServices) {
      if (!isApprovedServiceSlug(serviceSlug)) {
        issues.push({
          kind: 'internal_link_to_skipped',
          route: from,
          detail: `Active page ${from} links to skipped service /${serviceSlug}`,
          sourceFile: 'data/linking/registry.ts',
        });
      }
    }

    for (const policy of page.relatedPolicies) {
      const meta = getMetadataByRoute(`/${policy}`);
      if (meta && !meta.indexable) {
        issues.push({
          kind: 'internal_link_to_noindex',
          route: from,
          detail: `Active page ${from} links to noindex route /${policy}`,
          sourceFile: 'data/linking/registry.ts',
        });
      }
    }
  }

  return issues;
}

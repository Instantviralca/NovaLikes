/**
 * Sitemap group classification — partitions the existing inventory into child sitemaps.
 * Every indexable URL belongs to exactly one group. No duplicated URL lists.
 */

import type { MetadataRoute } from 'next';

import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { getActiveLearnCategories } from '@/data/learn';
import { MARKETS } from '@/lib/market/config';
import { decodePathname } from '@/lib/i18n/slugs';
import { absoluteUrl, normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';

export const SITEMAP_GROUP_IDS = [
  'core',
  'services',
  'markets',
  'locales',
  'tools',
  'learn',
  'taxonomy',
] as const;

export type SitemapGroupId = (typeof SITEMAP_GROUP_IDS)[number];

export type SitemapGroup = {
  id: SitemapGroupId;
  /** Public path under /sitemaps/ */
  fileName: `${SitemapGroupId}.xml`;
  loc: string;
  entries: MetadataRoute.Sitemap;
};

const LEARN_CATEGORY_SLUGS = () =>
  new Set(getActiveLearnCategories().map((category) => category.slug));

/**
 * Deterministic classifier for a public pathname.
 * Markets and locales are checked before English buy-/tools-/learn- prefixes.
 */
export function classifySitemapPath(pathname: string): SitemapGroupId {
  const path = normalizeCanonicalPath(decodePathname(pathname));

  for (const market of MARKETS) {
    if (path === `/${market}` || path.startsWith(`/${market}/`)) {
      return 'markets';
    }
  }

  for (const locale of LOCALIZED_LOCALES) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return 'locales';
    }
  }

  if (path.startsWith('/buy-')) return 'services';

  if (path === '/tools' || path.startsWith('/tools/')) return 'tools';

  if (path === '/learn') return 'taxonomy';
  if (path.startsWith('/learn/tag/')) return 'taxonomy';
  if (path.startsWith('/learn/')) {
    const slug = path.slice('/learn/'.length);
    if (LEARN_CATEGORY_SLUGS().has(slug)) return 'taxonomy';
    return 'learn';
  }

  if (path === '/authors' || path.startsWith('/authors/')) return 'taxonomy';
  if (path === '/sitemap') return 'taxonomy';

  return 'core';
}

export function pathnameFromSitemapUrl(url: string): string {
  try {
    return normalizeCanonicalPath(decodePathname(new URL(url).pathname || '/'));
  } catch {
    return normalizeCanonicalPath(url);
  }
}

export function partitionSitemapEntries(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): Record<SitemapGroupId, MetadataRoute.Sitemap> {
  const buckets: Record<SitemapGroupId, MetadataRoute.Sitemap> = {
    core: [],
    services: [],
    markets: [],
    locales: [],
    tools: [],
    learn: [],
    taxonomy: [],
  };

  for (const entry of entries) {
    const group = classifySitemapPath(pathnameFromSitemapUrl(entry.url));
    buckets[group].push(entry);
  }

  return buckets;
}

export function buildSitemapGroups(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapGroup[] {
  const buckets = partitionSitemapEntries(entries);
  return SITEMAP_GROUP_IDS.map((id) => ({
    id,
    fileName: `${id}.xml`,
    loc: `${SEO_PRODUCTION_DOMAIN}/sitemaps/${id}.xml`,
    entries: buckets[id],
  }));
}

export function getSitemapGroupById(
  id: string,
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapGroup | null {
  const normalized = id.replace(/\.xml$/i, '').toLowerCase();
  if (!SITEMAP_GROUP_IDS.includes(normalized as SitemapGroupId)) return null;
  const groupId = normalized as SitemapGroupId;
  const buckets = partitionSitemapEntries(entries);
  return {
    id: groupId,
    fileName: `${groupId}.xml`,
    loc: `${SEO_PRODUCTION_DOMAIN}/sitemaps/${groupId}.xml`,
    entries: buckets[groupId],
  };
}

export function findCrossGroupDuplicateUrls(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): string[] {
  const seen = new Map<string, SitemapGroupId>();
  const dups: string[] = [];
  for (const entry of entries) {
    const group = classifySitemapPath(pathnameFromSitemapUrl(entry.url));
    const prev = seen.get(entry.url);
    if (prev && prev !== group) dups.push(entry.url);
    else if (prev === group) dups.push(entry.url);
    else seen.set(entry.url, group);
  }
  // Also catch same URL listed twice in inventory
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.url, (counts.get(entry.url) ?? 0) + 1);
  }
  for (const [url, count] of counts) {
    if (count > 1 && !dups.includes(url)) dups.push(url);
  }
  return dups;
}

export function assertSitemapPartitionComplete(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): {
  ok: boolean;
  total: number;
  sum: number;
  missing: string[];
  duplicates: string[];
  counts: Record<SitemapGroupId, number>;
} {
  const groups = buildSitemapGroups(entries);
  const union = new Set<string>();
  const duplicates: string[] = [];
  const counts = {} as Record<SitemapGroupId, number>;

  for (const group of groups) {
    counts[group.id] = group.entries.length;
    for (const entry of group.entries) {
      if (union.has(entry.url)) duplicates.push(entry.url);
      union.add(entry.url);
    }
  }

  const sourceUrls = entries.map((entry) => entry.url);
  const sourceSet = new Set(sourceUrls);
  const missing = sourceUrls.filter((url) => !union.has(url));
  const extra = [...union].filter((url) => !sourceSet.has(url));

  return {
    ok:
      missing.length === 0 &&
      duplicates.length === 0 &&
      extra.length === 0 &&
      union.size === sourceSet.size &&
      entries.length === [...groups].reduce((n, g) => n + g.entries.length, 0),
    total: entries.length,
    sum: groups.reduce((n, g) => n + g.entries.length, 0),
    missing: [...missing, ...extra],
    duplicates,
    counts,
  };
}

/** Child sitemap absolute locs for the index document. */
export function getSitemapIndexLocs(): string[] {
  return SITEMAP_GROUP_IDS.map((id) => absoluteUrl(`/sitemaps/${id}.xml`));
}

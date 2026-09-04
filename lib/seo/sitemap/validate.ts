/**
 * Sitemap validation helpers — Document 14.08.
 */

import type { MetadataRoute } from 'next';

import { SITEMAP_PRODUCTION_ROUTES } from '@/data/seo/sitemap-routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import {
  getIndexableMetadataEntries,
  getMetadataByRoute,
} from '@/lib/seo/metadata/getters';
import {
  buildCanonicalUrl,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import { isCoreLocalizedPath, isLocalizedLocale } from '@/lib/i18n/config';
import { parseLocalePath } from '@/lib/i18n/paths';
import { parseMarketPath } from '@/lib/market/paths';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { validateSitemapUrl } from '@/lib/seo/sitemap/validate-url';
import type { SitemapIssue } from '@/types/sitemap';

function decodeSitemapPath(url: string): string {
  try {
    return decodeURI(new URL(url).pathname || '/');
  } catch {
    return new URL(url).pathname || '/';
  }
}

function sitemapUrlsEqual(a: string, b: string): boolean {
  try {
    return decodeURI(a) === decodeURI(b);
  } catch {
    return a === b;
  }
}

export function validateSitemapCanonicals(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const issues: SitemapIssue[] = [];

  for (const entry of entries) {
    const urlCheck = validateSitemapUrl(entry.url);
    if (!urlCheck.valid) {
      issues.push({
        kind: 'invalid_url',
        url: entry.url,
        detail: urlCheck.reason ?? 'Invalid sitemap URL',
      });
      continue;
    }

    const path = decodeSitemapPath(entry.url);
    const parsed = parseLocalePath(path);
    if (isLocalizedLocale(parsed.locale) && isCoreLocalizedPath(parsed.pathname)) {
      const expected = buildCanonicalUrl(path);
      if (!sitemapUrlsEqual(expected, entry.url)) {
        issues.push({
          kind: 'canonical_mismatch',
          route: path,
          url: entry.url,
          detail: `Localized sitemap URL ${entry.url} does not match self-canonical ${expected}`,
        });
      }
      continue;
    }

    // Market geo routes (/ca, /ca/buy-instagram-followers, etc.) are self-canonical;
    // they have no metadata-registry entry — validate URL shape only.
    const marketParsed = parseMarketPath(path);
    if (marketParsed.market !== null) {
      const expected = buildCanonicalUrl(path);
      if (!sitemapUrlsEqual(expected, entry.url)) {
        issues.push({
          kind: 'canonical_mismatch',
          route: path,
          url: entry.url,
          detail: `Market sitemap URL ${entry.url} does not match self-canonical ${expected}`,
        });
      }
      continue;
    }

    const meta = getMetadataByRoute(path);
    if (!meta) {
      issues.push({
        kind: 'registry_missing',
        route: path,
        url: entry.url,
        detail: `Sitemap URL ${entry.url} is missing from the metadata registry`,
      });
      continue;
    }

    const expected = buildCanonicalUrl(meta.canonicalPath);
    if (expected !== entry.url) {
      issues.push({
        kind: 'canonical_mismatch',
        route: path,
        url: entry.url,
        sourceFile: meta.sourceFile,
        detail: `Sitemap URL ${entry.url} does not match canonical ${expected}`,
      });
    }
  }

  return issues;
}

export function findNoindexSitemapEntries(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const issues: SitemapIssue[] = [];

  for (const entry of entries) {
    const path = new URL(entry.url).pathname || '/';
    const meta = getMetadataByRoute(path);
    if (meta && (!meta.indexable || !meta.robots.index)) {
      issues.push({
        kind: 'noindex_in_sitemap',
        route: path,
        url: entry.url,
        sourceFile: meta.sourceFile,
        detail: `Noindex route ${path} appears in the sitemap`,
      });
    }
  }

  return issues;
}

export function findMissingSitemapEntries(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const present = new Set(
    entries.map((entry) =>
      normalizeCanonicalPath(new URL(entry.url).pathname || '/'),
    ),
  );
  const issues: SitemapIssue[] = [];

  for (const route of SITEMAP_PRODUCTION_ROUTES) {
    const normalized = normalizeCanonicalPath(route);
    const meta = getMetadataByRoute(normalized);
    if (!meta?.active || !meta.indexable) continue;
    if (!present.has(normalized)) {
      issues.push({
        kind: 'missing_from_sitemap',
        route: normalized,
        sourceFile: meta.sourceFile,
        detail: `Approved indexable route ${normalized} is missing from the sitemap`,
      });
    }
  }

  return issues;
}

export function findSkippedRoutesInSitemap(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const issues: SitemapIssue[] = [];

  for (const entry of entries) {
    const path = decodeSitemapPath(entry.url);
    if (!path.startsWith('/buy-')) continue;
    const slug = path.slice(1);
    if (!isApprovedServiceSlug(slug)) {
      issues.push({
        kind: 'skipped_service_in_sitemap',
        route: path,
        url: entry.url,
        detail: `Skipped service ${path} appears in the sitemap`,
      });
    }
  }

  return issues;
}

export function validateLastModified(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const issues: SitemapIssue[] = [];
  const now = Date.now();
  const stamped: number[] = [];

  for (const entry of entries) {
    // Omitting lastModified is preferred over inventing or emitting a future date.
    if (!entry.lastModified) {
      continue;
    }

    const value =
      entry.lastModified instanceof Date
        ? entry.lastModified
        : new Date(entry.lastModified);

    if (Number.isNaN(value.getTime())) {
      issues.push({
        kind: 'invalid_last_modified',
        url: entry.url,
        detail: `Invalid lastModified for ${entry.url}`,
      });
      continue;
    }

    if (value.getTime() > now + 24 * 60 * 60 * 1000) {
      issues.push({
        kind: 'invalid_last_modified',
        url: entry.url,
        detail: `lastModified is in the future for ${entry.url}`,
      });
      continue;
    }

    stamped.push(value.getTime());
  }

  if (
    stamped.length > 3 &&
    stamped.every((stamp) => Math.abs(stamp - now) < 5000)
  ) {
    issues.push({
      kind: 'invalid_last_modified',
      detail:
        'All sitemap lastModified values appear to be the current build time — use registry content timestamps instead',
    });
  }

  return issues;
}

export function findDuplicateSitemapUrls(
  entries: MetadataRoute.Sitemap = buildSitemapEntries(),
): SitemapIssue[] {
  const seen = new Map<string, number>();
  const issues: SitemapIssue[] = [];

  for (const entry of entries) {
    let key = entry.url;
    try {
      key = decodeURI(entry.url);
    } catch {
      key = entry.url;
    }
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }

  for (const [url, count] of seen) {
    if (count > 1) {
      issues.push({
        kind: 'duplicate_url',
        url,
        detail: `Duplicate sitemap URL ${url} appears ${count} times`,
      });
    }
  }

  return issues;
}

/** Indexable metadata routes not on the V1 sitemap allowlist (e.g. learn). */
export function findIndexableRoutesNotInSitemapAllowlist(): string[] {
  return getIndexableMetadataEntries()
    .map((entry) => normalizeCanonicalPath(entry.route))
    .filter((route) => !SITEMAP_PRODUCTION_ROUTES.includes(route));
}

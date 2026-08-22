/**
 * Build sitemap entries — Document 14.08.
 */

import type { MetadataRoute } from 'next';

import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { COMPANY_PATHS, CORE_PATHS, LEGAL_PATHS, TOOL_PATHS } from '@/lib/i18n/core-paths';
import { hreflangMap, localizeHref } from '@/lib/i18n/paths';
import { isCoreLocalizedPath, isEnglishOnlyLearnPath } from '@/lib/i18n/config';
import { getIndexableRoutes } from '@/lib/seo/sitemap/routes';
import { validateSitemapUrl } from '@/lib/seo/sitemap/validate-url';
import { absoluteUrl, normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';

function sitemapLanguages(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const [code, path] of Object.entries(hreflangMap(pathname))) {
    languages[code] = absoluteUrl(path);
  }
  return languages;
}

/**
 * Production sitemap entries from the shared indexable route registry.
 * lastModified comes from registry timestamps (not build time).
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const routes = getIndexableRoutes();
  const entries: MetadataRoute.Sitemap = [];
  const lastModifiedByPath = new Map<string, Date>();

  for (const route of routes) {
    const validation = validateSitemapUrl(route.canonicalUrl);
    if (!validation.valid) {
      continue;
    }

    if (route.lastModified) {
      lastModifiedByPath.set(route.route, route.lastModified);
    }
    const path = normalizeCanonicalPath(route.route);
    const entry: MetadataRoute.Sitemap[number] = {
      url: route.canonicalUrl,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
    if (route.lastModified) {
      entry.lastModified = route.lastModified;
    }
    if (isCoreLocalizedPath(path) && !isEnglishOnlyLearnPath(path)) {
      entry.alternates = { languages: sitemapLanguages(path) };
    }
    entries.push(entry);
  }

  const localizedStamp = lastModifiedByPath.get('/') ?? new Date('2026-08-19T00:00:00.000Z');
  for (const locale of LOCALIZED_LOCALES) {
    for (const path of CORE_PATHS) {
      const localizedPath = localizeHref(path, locale);
      const englishStamp = lastModifiedByPath.get(path) ?? localizedStamp;
      entries.push({
        url: absoluteUrl(localizedPath),
        lastModified: englishStamp,
        changeFrequency: path === '/' ? 'weekly' : path === '/faq' ? 'monthly' : 'weekly',
        priority: path === '/' ? 0.95 : 0.8,
        alternates: { languages: sitemapLanguages(path) },
      });
    }
    for (const path of TOOL_PATHS) {
      const localizedPath = localizeHref(path, locale);
      const englishStamp = lastModifiedByPath.get(path) ?? localizedStamp;
      entries.push({
        url: absoluteUrl(localizedPath),
        lastModified: englishStamp,
        changeFrequency: 'weekly',
        priority: path === '/tools' ? 0.8 : 0.7,
        alternates: { languages: sitemapLanguages(path) },
      });
    }
    for (const path of COMPANY_PATHS) {
      const localizedPath = localizeHref(path, locale);
      const englishStamp = lastModifiedByPath.get(path) ?? localizedStamp;
      entries.push({
        url: absoluteUrl(localizedPath),
        lastModified: englishStamp,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: sitemapLanguages(path) },
      });
    }
    for (const path of LEGAL_PATHS) {
      const localizedPath = localizeHref(path, locale);
      const englishStamp = lastModifiedByPath.get(path) ?? localizedStamp;
      entries.push({
        url: absoluteUrl(localizedPath),
        lastModified: englishStamp,
        changeFrequency: 'yearly',
        priority: 0.4,
        alternates: { languages: sitemapLanguages(path) },
      });
    }
  }

  return entries;
}

/**
 * Build Next.js Metadata from registry entries — Document 14.07.
 */

import type { Metadata } from 'next';

import { seoSiteConfig } from '@/config/seo';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { isCoreLocalizedPath, isEnglishOnlyLearnPath } from '@/lib/i18n/config';
import { hreflangMapWithMarket } from '@/lib/market/paths';
import {
  absoluteUrl,
  buildCanonicalUrl,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import { getMetadataByRoute } from '@/lib/seo/metadata/getters';
import { buildOpenGraphFromEntry, buildOpenGraphMetadata } from '@/lib/seo/metadata/open-graph';
import { buildRobotsMetadata } from '@/lib/seo/metadata/robots';
import { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';
import { buildTwitterFromEntry, buildTwitterMetadata } from '@/lib/seo/metadata/twitter';
import type { MetadataEntry, SeoRobotsPolicy } from '@/types/seo-metadata';

function alternateLanguages(path: string): Record<string, string> | undefined {
  if (!isCoreLocalizedPath(path) || isEnglishOnlyLearnPath(path)) return undefined;
  const languages: Record<string, string> = {};
  for (const [code, href] of Object.entries(hreflangMapWithMarket(path))) {
    languages[code] = absoluteUrl(href);
  }
  return languages;
}

export type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  robots?: SeoRobotsPolicy;
  images?: string[];
  keywords?: string[];
};

/**
 * Build typed Next.js Metadata. Prefer registry entries via buildMetadataFromEntry.
 */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const path = normalizeCanonicalPath(input.path);
  const title = sanitizeMetadataText(input.title);
  const description = sanitizeMetadataText(input.description);
  const robots = input.robots ?? { index: true, follow: true };
  const canonical = buildCanonicalUrl(path);
  const image = input.images?.[0] ?? seoSiteConfig.defaultOpenGraphImage;

  const languages = alternateLanguages(path);

  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(seoSiteConfig.productionDomain),
    keywords: input.keywords,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    robots: buildRobotsMetadata(robots),
    openGraph: buildOpenGraphMetadata({
      title,
      description,
      path,
      type: input.type,
      image,
      imageAlt: title,
    }),
    twitter: buildTwitterMetadata({
      title,
      description,
      image,
      imageAlt: title,
    }),
  };
}

export function buildMetadataFromEntry(entry: MetadataEntry): Metadata {
  const title = sanitizeMetadataText(entry.title);
  const description = sanitizeMetadataText(entry.description);
  const path = normalizeCanonicalPath(entry.canonicalPath);

  const languages = alternateLanguages(path);

  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(seoSiteConfig.productionDomain),
    keywords: entry.keywords,
    alternates: {
      canonical: buildCanonicalUrl(path),
      ...(languages ? { languages } : {}),
    },
    robots: buildRobotsMetadata(entry.robots),
    openGraph: buildOpenGraphFromEntry(entry),
    twitter: buildTwitterFromEntry(entry),
  };
}

/**
 * Resolve Metadata for a route from the shared registry.
 * Skipped services and unknown routes return noindex fallbacks (never homepage metadata).
 */
export function buildPageMetadataForRoute(route: string): Metadata {
  const normalized = normalizeCanonicalPath(route);

  if (normalized.startsWith('/buy-')) {
    const slug = normalized.slice(1);
    if (!isApprovedServiceSlug(slug)) {
      return buildPageMetadata({
        title: 'Unavailable Service | NovaLikes',
        description: seoSiteConfig.defaultDescription,
        path: normalized,
        robots: { index: false, follow: false },
      });
    }
  }

  const entry = getMetadataByRoute(normalized);
  if (!entry || !entry.active) {
    return buildPageMetadata({
      title: 'NovaLikes',
      description: seoSiteConfig.defaultDescription,
      path: normalized,
      robots: { index: false, follow: false },
    });
  }

  return buildMetadataFromEntry(entry);
}

/** Private Track Order result metadata — never indexable, no PII. */
export function privateTrackOrderResultMetadata(): Metadata {
  return buildPageMetadataForRoute('/track-order/result');
}

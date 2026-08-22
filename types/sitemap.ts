/**
 * Sitemap & robots types — Document 14.08.
 */

import type { MetadataRoute } from 'next';

export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>;

export type IndexableRoute = {
  route: string;
  canonicalUrl: string;
  /** Omit when no truthful past/present timestamp exists (never emit future lastmod). */
  lastModified?: Date;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
  pageType: string;
  sourceFile: string;
};

export type SitemapUrlValidation = {
  url: string;
  valid: boolean;
  reason?: string;
};

export type SitemapIssueKind =
  | 'invalid_url'
  | 'canonical_mismatch'
  | 'noindex_in_sitemap'
  | 'missing_from_sitemap'
  | 'skipped_service_in_sitemap'
  | 'duplicate_url'
  | 'invalid_last_modified'
  | 'orphan_page'
  | 'registry_missing'
  | 'internal_link_to_noindex'
  | 'internal_link_to_skipped'
  | 'robots_misconfigured';

export type SitemapIssue = {
  kind: SitemapIssueKind;
  route?: string;
  url?: string;
  detail: string;
  sourceFile?: string;
};

export type RobotsValidationReport = {
  valid: boolean;
  issues: SitemapIssue[];
  sitemapUrl: string;
  disallow: string[];
};

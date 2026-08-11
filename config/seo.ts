/**
 * Shared SEO site configuration — Document 14.07.
 * Domain and defaults must stay aligned with schema helpers.
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';
import { DEFAULT_LOCALE } from '@/config/constants';

export const SEO_PRODUCTION_DOMAIN = 'https://novalikes.com' as const;

export const seoSiteConfig = {
  siteName: brand.name,
  organizationName: brand.legalName,
  productionDomain: SEO_PRODUCTION_DOMAIN,
  /** Keep in sync with config/site.ts domain. */
  configuredDomain: site.domain,
  defaultLocale: 'en_US',
  htmlLocale: DEFAULT_LOCALE,
  defaultTitleTemplate: `%s | ${brand.name}`,
  defaultDescription: site.defaultMetadata.description,
  defaultOpenGraphImage: '/og-default.png',
  defaultOpenGraphImageWidth: 1200,
  defaultOpenGraphImageHeight: 630,
  twitterCard: 'summary_large_image' as const,
  /**
   * Only set when a verified X/Twitter handle exists in configuration.
   * Do not invent a handle.
   */
  twitterHandle: undefined as string | undefined,
  defaultRobots: { index: true, follow: true },
} as const;

export type SeoSiteConfig = typeof seoSiteConfig;

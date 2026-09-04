/**
 * Production sitemap allowlist — Document 14.08.
 * Single shared list; do not duplicate elsewhere.
 */

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { routes } from '@/config/routes';

/** Exact routes allowed in the Version 1 production sitemap. */
export const SITEMAP_PRODUCTION_ROUTES: readonly string[] = [
  routes.home,
  ...APPROVED_SERVICE_SLUGS.map((slug) => `/${slug}`),
  routes.about,
  routes.contact,
  routes.faq,
  routes.tools,
  '/tools/tiktok-video-downloader',
  '/tools/tiktok-profile-picture-downloader',
  '/tools/instagram-video-downloader',
  '/tools/instagram-profile-viewer',
  '/tools/instagram-profile-picture-viewer',
  '/tools/instagram-follower-counter',
  '/tools/facebook-video-downloader',
  '/tools/facebook-reels-downloader',
  routes.reviews,
  routes.learn,
  routes.sitemap,
  routes.privacyPolicy,
  routes.termsAndConditions,
  routes.refundPolicy,
  routes.cookiePolicy,
  routes.disclaimer,
] as const;

export const SITEMAP_PRODUCTION_ROUTE_SET = new Set(SITEMAP_PRODUCTION_ROUTES);

/** Routes / prefixes that must never appear in the sitemap. */
export const SITEMAP_EXCLUSION_PREFIXES = [
  '/cart',
  '/checkout',
  '/order-success',
  '/admin',
  '/author',
  '/api',
  '/search',
  '/preview',
  '/draft',
  '/404',
  '/track-order',
  '/services',
  '/i18n',
  '/geo',
] as const;

/**
 * Future Learn readiness — published Learn routes only.
 * Version 1 returns empty until genuine published content is approved.
 */
export const LEARN_SITEMAP_ENABLED = true;

export const SKIPPED_SERVICE_ROUTE_EXAMPLES = [
  '/buy-tiktok-comments',
  '/buy-tiktok-shares',
  '/buy-youtube-subscribers',
  '/buy-youtube-views',
] as const;

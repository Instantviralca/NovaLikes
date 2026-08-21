/**
 * Sitemap inclusion policy — Document 14.08.
 * Keep in sync with data/seo/sitemap-routes.ts (single production allowlist).
 */

import { routes } from '@/config/routes';
import {
  LEARN_SITEMAP_ENABLED,
  SITEMAP_EXCLUSION_PREFIXES,
  SITEMAP_PRODUCTION_ROUTES,
} from '@/data/seo/sitemap-routes';

/** Absolute production host for sitemap / robots (Document 14.08). */
export const SITEMAP_PRODUCTION_HOST = 'novalikes.com' as const;
export const SITEMAP_PRODUCTION_ORIGIN = 'https://novalikes.com' as const;

/**
 * Explicit production sitemap allowlist.
 * Mirrors SITEMAP_PRODUCTION_ROUTES — do not diverge.
 */
export const SITEMAP_ALLOWED_PATHS: readonly string[] = SITEMAP_PRODUCTION_ROUTES;

const ALLOWED_SET = new Set(SITEMAP_ALLOWED_PATHS);

export function isSitemapAllowedPath(path: string): boolean {
  const normalized = path === '' ? '/' : path;
  return ALLOWED_SET.has(normalized);
}

/** Paths that must never appear in the sitemap. */
export const SITEMAP_EXCLUDED_PATH_PREFIXES = SITEMAP_EXCLUSION_PREFIXES;

export const ROBOTS_DISALLOW_PATHS = [
  '/cart',
  '/checkout',
  '/order-success',
  '/admin/',
  '/author/',
  '/api/',
  '/preview/',
  '/draft/',
  '/search',
  '/track-order/result',
  '/learn/preview/',
] as const;

/**
 * Legacy Learn readiness helper.
 * Full Learn article/category/author/tag URLs are emitted by
 * `lib/seo/sitemap/routes.ts` when LEARN_SITEMAP_ENABLED is true.
 */
export function getFutureLearnSitemapPaths(): string[] {
  return LEARN_SITEMAP_ENABLED ? [routes.learn] : [];
}

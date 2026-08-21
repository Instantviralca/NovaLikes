/**
 * Content-plan service scope — Document 16.01.
 * Only approved services may be associated with planned articles.
 */

import {
  APPROVED_SERVICE_SLUGS,
  type ApprovedServiceSlug,
  isApprovedServiceSlug,
} from '@/data/linking/approved-services';
import { SKIPPED_SERVICE_ROUTE_EXAMPLES } from '@/data/seo/sitemap-routes';

export const CONTENT_PLAN_APPROVED_SERVICES: readonly ApprovedServiceSlug[] =
  APPROVED_SERVICE_SLUGS;

const SKIPPED_SLUGS = new Set(
  SKIPPED_SERVICE_ROUTE_EXAMPLES.map((path) => path.replace(/^\//, '')),
);

export function isContentPlanApprovedService(
  slug: string,
): slug is ApprovedServiceSlug {
  return isApprovedServiceSlug(slug);
}

export function isSkippedServiceSlug(slug: string): boolean {
  return SKIPPED_SLUGS.has(slug.replace(/^\//, ''));
}

export function assertApprovedServicesOnly(
  slugs: readonly string[],
): { ok: true } | { ok: false; invalid: string[]; skipped: string[] } {
  const invalid: string[] = [];
  const skipped: string[] = [];
  for (const slug of slugs) {
    if (isSkippedServiceSlug(slug)) skipped.push(slug);
    else if (!isContentPlanApprovedService(slug)) invalid.push(slug);
  }
  if (invalid.length || skipped.length) {
    return { ok: false, invalid, skipped };
  }
  return { ok: true };
}

export const SERVICES_BY_PLATFORM = {
  instagram: [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
    'buy-instagram-comments',
  ],
  tiktok: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  facebook: [
    'buy-facebook-followers',
    'buy-facebook-page-likes',
    'buy-facebook-post-likes',
  ],
  youtube: [] as const,
  general: [] as const,
} as const satisfies Record<string, readonly ApprovedServiceSlug[]>;

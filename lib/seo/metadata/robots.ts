/**
 * Robots metadata builder — Document 14.07.
 */

import type { Metadata } from 'next';
import type { SeoRobotsPolicy } from '@/types/seo-metadata';

export function buildRobotsMetadata(
  policy: SeoRobotsPolicy,
): NonNullable<Metadata['robots']> {
  return {
    index: policy.index,
    follow: policy.follow,
    googleBot: {
      index: policy.index,
      follow: policy.follow,
    },
  };
}

export function robotsPolicyForRoute(route: string): SeoRobotsPolicy {
  const normalized = route.replace(/\/$/, '') || '/';

  if (
    normalized.startsWith('/admin') ||
    normalized === '/cart' ||
    normalized === '/checkout' ||
    normalized === '/order-success' ||
    normalized === '/track-order' ||
    normalized.startsWith('/track-order/result') ||
    normalized === '/404'
  ) {
    return {
      index: false,
      follow: normalized === '/cart' || normalized === '/track-order',
    };
  }

  return { index: true, follow: true };
}

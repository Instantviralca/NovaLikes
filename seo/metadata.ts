/**
 * Page metadata API — Document 14.07.
 * Thin compatibility layer over the Metadata & Canonical Engine.
 */

import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import {
  buildMetadataFromEntry,
  buildPageMetadata,
  buildPageMetadataForRoute,
  getMetadataByRoute,
  privateTrackOrderResultMetadata,
} from '@/lib/seo/metadata';
import type { SeoRobotsPolicy } from '@/types/seo-metadata';

export type PageRobots = SeoRobotsPolicy;

export type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  robots?: PageRobots;
  images?: string[];
  keywords?: string[];
};

export { buildPageMetadata, privateTrackOrderResultMetadata };

export function homeMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.home);
}

export function serviceMetadata(slug: string): Metadata {
  if (!isApprovedServiceSlug(slug)) {
    return buildPageMetadata({
      title: 'Unavailable Service | NovaLikes',
      description:
        'This service route is not part of the NovaLikes production catalogue.',
      path: `/${slug}`,
      robots: { index: false, follow: false },
    });
  }

  return buildPageMetadataForRoute(`/${slug}`);
}

export function learnIndexMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.learn);
}

export function learnArticleMetadata(slug: string): Metadata {
  return buildPageMetadataForRoute(`${routes.learn}/${slug}`);
}

export function companyMetadata(
  page: 'about' | 'reviews' | 'contact' | 'faq',
): Metadata {
  const path =
    page === 'about'
      ? routes.about
      : page === 'reviews'
        ? routes.reviews
        : page === 'contact'
          ? routes.contact
          : routes.faq;
  return buildPageMetadataForRoute(path);
}

export function legalMetadata(
  page:
    | 'privacyPolicy'
    | 'refundPolicy'
    | 'termsAndConditions'
    | 'cookiePolicy'
    | 'disclaimer',
): Metadata {
  const map = {
    privacyPolicy: routes.privacyPolicy,
    refundPolicy: routes.refundPolicy,
    termsAndConditions: routes.termsAndConditions,
    cookiePolicy: routes.cookiePolicy,
    disclaimer: routes.disclaimer,
  } as const;
  return buildPageMetadataForRoute(map[page]);
}

export function noIndexMetadata(title: string, path: string): Metadata {
  const entry = getMetadataByRoute(path);
  if (entry) {
    return buildMetadataFromEntry({
      ...entry,
      title: title.includes('|') ? title : `${title} | NovaLikes`,
      robots: { index: false, follow: false },
      indexable: false,
    });
  }

  return buildPageMetadata({
    title: title.includes('|') ? title : `${title} | NovaLikes`,
    description: 'This NovaLikes page is not indexed.',
    path,
    robots: { index: false, follow: false },
  });
}

export function trackOrderMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.trackOrder);
}

export function cartMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.cart);
}

export function checkoutMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.checkout);
}

export function adminMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.admin);
}

export function toolsHubMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.tools);
}

export function toolPageMetadata(slug: string): Metadata {
  return buildPageMetadataForRoute(`${routes.tools}/${slug}`);
}

export function htmlSitemapMetadata(): Metadata {
  return buildPageMetadataForRoute(routes.sitemap);
}

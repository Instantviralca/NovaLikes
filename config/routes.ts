/**
 * Canonical public route paths.
 * Service buy-URLs still come from the Service Registry (data/services.ts).
 */
export const routes = {
  home: '/',
  about: '/about',
  reviews: '/reviews',
  contact: '/contact',
  faq: '/faq',
  tools: '/tools',
  learn: '/learn',
  authors: '/authors',
  /** Lightweight services landing — choose a platform / package. */
  services: '/services',
  cart: '/cart',
  checkout: '/checkout',
  trackOrder: '/track-order',
  orderSuccess: '/order-success',
  admin: '/admin',
  adminLogin: '/admin/login',
  privacyPolicy: '/privacy-policy',
  refundPolicy: '/refund-policy',
  termsAndConditions: '/terms-and-conditions',
  cookiePolicy: '/cookie-policy',
  disclaimer: '/disclaimer',
  sitemap: '/sitemap',
} as const;

export type AppRouteKey = keyof typeof routes;

export function learnArticlePath(slug: string) {
  return `${routes.learn}/${slug}`;
}

/** Learn category path — Document 15.01 (`/learn/instagram`, …). */
export function learnCategoryPath(slug: string) {
  return `${routes.learn}/${slug}`;
}

/** Learn tag path — Document 15.04 (`/learn/tag/{slug}`). */
export function learnTagPath(slug: string) {
  return `${routes.learn}/tag/${slug}`;
}

/** Author profile path — Document 15.03 (`/authors/{slug}`). */
export function authorProfilePath(slug: string) {
  return `${routes.authors}/${slug}`;
}

/**
 * Platform hub path — Document 08.02.
 * Platform hubs (`/instagram`, etc.) are not live pages; route to the Learn
 * category hub so chrome/CTAs never emit dead URLs.
 */
export function platformHubPath(slug: string) {
  const normalized = slug.replace(/^\//, '').toLowerCase();
  if (
    normalized === 'instagram' ||
    normalized === 'tiktok' ||
    normalized === 'facebook'
  ) {
    return learnCategoryPath(normalized);
  }
  if (normalized === 'youtube') {
    return routes.learn;
  }
  return `/${normalized}`;
}

export function isBuyServicePath(pathname: string) {
  return pathname.startsWith('/buy-');
}

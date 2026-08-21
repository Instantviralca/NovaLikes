/**
 * Allowed internal FAQ related-link targets — Document 14.04.
 */

import { routes, learnArticlePath } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';

const STATIC_INTERNAL_PATHS = new Set<string>([
  routes.home,
  routes.about,
  routes.reviews,
  routes.contact,
  routes.faq,
  routes.learn,
  routes.cart,
  routes.checkout,
  routes.trackOrder,
  routes.privacyPolicy,
  routes.refundPolicy,
  routes.termsAndConditions,
  routes.cookiePolicy,
  routes.disclaimer,
  '/learn/instagram',
  '/learn/tiktok',
  '/learn/facebook',
  '/buy-instagram-followers',
  '/buy-tiktok-followers',
  '/buy-facebook-followers',
]);

/**
 * Returns true when href is a known internal path (service, policy, company, learn).
 */
export function isAllowedFaqInternalHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return false;

  const pathOnly = trimmed.split(/[?#]/)[0] ?? trimmed;
  if (STATIC_INTERNAL_PATHS.has(pathOnly)) return true;

  if (pathOnly.startsWith('/buy-')) {
    const slug = pathOnly.slice(1);
    return isApprovedServiceSlug(slug);
  }

  if (pathOnly.startsWith(`${routes.learn}/`)) {
    const slug = pathOnly.slice(routes.learn.length + 1);
    return slug.length > 0 && !slug.includes('/');
  }

  return false;
}

export function faqServiceHref(serviceSlug: string): string {
  return `/${serviceSlug}`;
}

export function faqLearnHref(articleSlug: string): string {
  return learnArticlePath(articleSlug);
}

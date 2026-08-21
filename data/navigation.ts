import { routes } from '@/config/routes';
import { getAllPlatforms } from '@/data/platforms';
import { getNavigationServices, getServiceBySlug } from '@/data/services';
import { getPrimaryCTA, getSecondaryCTA } from '@/lib/brand/helpers';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import type { NavItem, NavMegaMenuItem, PlatformId, Service } from '@/types';

function primaryServiceHref(platformId: PlatformId): string {
  const services = getNavigationServices().filter((service) => service.platform === platformId);
  const featured = services.find((service) => service.featured);
  return (featured ?? services[0])?.url ?? routes.home;
}

function megaItem(platformId: PlatformId, label: string): NavMegaMenuItem {
  return {
    id: `nav-${platformId}`,
    type: 'mega',
    label,
    platformId,
    href: primaryServiceHref(platformId),
  };
}

/** Primary desktop navigation — structure only; links resolved from registry + config routes. */
export const mainNavigation: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: routes.home },
  megaItem('instagram', 'Instagram'),
  megaItem('tiktok', 'TikTok'),
  megaItem('facebook', 'Facebook'),
  { id: 'nav-learn', label: 'Learn', href: routes.learn },
  { id: 'nav-tools', label: 'Tools', href: routes.tools },
  { id: 'nav-reviews', label: 'Reviews', href: routes.reviews },
  { id: 'nav-about', label: 'About', href: routes.about },
  { id: 'nav-contact', label: 'Contact', href: routes.contact },
];

const defaultCtaHref =
  getServiceBySlug('buy-instagram-followers')?.url ?? '/buy-instagram-followers';

const primary = getPrimaryCTA(defaultCtaHref);
const secondary = getSecondaryCTA(1, defaultCtaHref);

export const primaryCta = {
  id: 'cta-get-started',
  label: primary.label,
  href: primary.href,
} as const;

export const secondaryCta = {
  id: 'cta-view-services',
  label: secondary.label,
  href: secondary.href,
} as const;

export function getMainNavigation(locale: Locale = DEFAULT_LOCALE): NavItem[] {
  if (locale === DEFAULT_LOCALE) return mainNavigation;
  return mainNavigation.filter((item) => item.id !== 'nav-learn');
}

export function getMegaMenuServices(platformId: PlatformId): Service[] {
  return getNavigationServices().filter((service) => service.platform === platformId);
}

export function getPlatformNavItems() {
  return getAllPlatforms()
    .map((platform) => ({
      platform,
      href: primaryServiceHref(platform.id),
      services: getMegaMenuServices(platform.id),
    }))
    .filter((item) => item.services.length > 0);
}

export function isMegaMenuItem(item: NavItem): item is NavMegaMenuItem {
  return 'type' in item && item.type === 'mega';
}

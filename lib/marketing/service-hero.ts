import {
  getActivePackagesByServiceSlug,
} from '@/data/pricing/packages';
import { formatMoney } from '@/lib/pricing/format';
import type { PricingPackage } from '@/types/pricing';

export function formatQuantityShort(quantity: number): string {
  if (quantity >= 1000 && quantity % 1000 === 0) return `${quantity / 1000}K`;
  if (quantity >= 1000) {
    const k = quantity / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(quantity);
}

export function getServiceFeaturedPackage(
  serviceSlug: string,
): PricingPackage | undefined {
  const packages = getActivePackagesByServiceSlug(serviceSlug);
  if (packages.length === 0) return undefined;
  const featured = packages.find(
    (p) =>
      p.badge === 'most-popular' ||
      p.badge === 'best-value' ||
      p.badge === 'recommended',
  );
  return featured ?? packages[Math.floor(packages.length / 2)];
}

/** Lowest active package price, same formatter as package price block. */
export function getServiceFromPriceLabel(serviceSlug: string): string | null {
  const packages = getActivePackagesByServiceSlug(serviceSlug);
  const lowest = packages[0];
  if (!lowest) return null;
  return formatMoney(lowest.price, lowest.currency);
}

export function resolveHeroSubtitle(
  template: string,
  serviceSlug: string,
): string | null {
  if (!template.includes('{fromPrice}')) return template;
  const fromPrice = getServiceFromPriceLabel(serviceSlug);
  if (!fromPrice) return null;
  return template.replaceAll('{fromPrice}', fromPrice);
}

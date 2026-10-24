import type { TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { listActivePackages } from '@/lib/pricing/resolve';
import { formatMoney } from '@/lib/pricing/format';
import { sortPackagesByQuantity } from '@/lib/marketing/home-tiktok/bands';
import type { PricingPackage } from '@/types/pricing';

export const TIKTOK_SERVICE_SLUGS: Record<TikTokServiceKey, string> = {
  followers: 'buy-tiktok-followers',
  likes: 'buy-tiktok-likes',
  views: 'buy-tiktok-views',
};

/** Active registry packages for a TikTok service, ascending by quantity. */
export function getTikTokServicePackages(service: TikTokServiceKey): PricingPackage[] {
  return sortPackagesByQuantity(listActivePackages(TIKTOK_SERVICE_SLUGS[service]));
}

/** Homepage packages grid — at most 6 packages from the registry. */
export function getHomeTikTokPackagesForTab(service: TikTokServiceKey): PricingPackage[] {
  return getTikTokServicePackages(service).slice(0, 6);
}

/** Popular/best-selling from registry; otherwise the middle package. */
export function defaultSelectedPackageId(packages: PricingPackage[]): string | null {
  if (packages.length === 0) return null;
  const featured = packages.find(
    (p) =>
      p.badge === 'most-popular' ||
      p.badge === 'best-value' ||
      p.badge === 'recommended',
  );
  if (featured) return featured.id;
  return packages[Math.floor(packages.length / 2)]?.id ?? null;
}

export function formatPackagePrice(pkg: PricingPackage): string {
  return formatMoney(pkg.price, pkg.currency);
}

/** Service page supports hash deep-link used elsewhere; query preselect is not wired. */
export function packageServiceHref(serviceHref: string, packageId: string): string {
  return `${serviceHref}#order-configuration?package=${encodeURIComponent(packageId)}`;
}

export function formatQuantityShort(quantity: number): string {
  if (quantity >= 1000 && quantity % 1000 === 0) return `${quantity / 1000}K`;
  if (quantity >= 1000) {
    const k = quantity / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(quantity);
}

export function getFeaturedPackage(packages: PricingPackage[]): PricingPackage | undefined {
  if (packages.length === 0) return undefined;
  const featured = packages.find(
    (p) =>
      p.badge === 'most-popular' ||
      p.badge === 'best-value' ||
      p.badge === 'recommended',
  );
  return featured ?? packages[Math.floor(packages.length / 2)];
}

/** Lowest active package price for `{fromPrice}` placeholders. */
export function getFromPriceLabel(service: TikTokServiceKey): string {
  const pkgs = getTikTokServicePackages(service);
  const lowest = pkgs[0];
  return lowest ? formatPackagePrice(lowest) : '';
}

/** Hero floating card line from popular package, e.g. "1K from $14.99". */
export function formatFloatingPackageLine(
  service: TikTokServiceKey,
  template: string,
): string {
  const pkg = getFeaturedPackage(getTikTokServicePackages(service));
  if (!pkg) return '';
  return template
    .replace('{quantity}', formatQuantityShort(pkg.quantity))
    .replace('{price}', formatPackagePrice(pkg));
}

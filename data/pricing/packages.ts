import {
  getNovaLikesProductById,
  getNovaLikesProductsByPlatformType,
  NOVALIKES_PRODUCTS,
  type NovaLikesProduct,
} from '@/data/pricing/novalikes-products';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getAllServices, getServiceBySlug } from '@/data/services';
import { applyPackageOverride } from '@/lib/catalog/package-overrides';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

/** NovaLikes.com prices are stored in major USD units. */
const SOURCE_CURRENCY = 'USD' as const;

/**
 * Convert NovaLikes major-unit price to minor units without changing the value.
 * e.g. 1.99 → 199
 */
function toMinorUnits(priceMajor: number): number {
  return Math.round(priceMajor * 100);
}

/**
 * Map an NovaLikes.com product onto the PricingPackage shape.
 * Comment packages may include tier, features, and compare-at pricing.
 */
function mapProductToPackage(product: NovaLikesProduct, service: Service): PricingPackage {
  const price = toMinorUnits(product.price);
  const compareAt = product.compareAtPrice
    ? toMinorUnits(product.compareAtPrice)
    : undefined;

  return {
    id: product.id,
    serviceId: service.id,
    serviceSlug: service.slug,
    slug: product.id,
    title: product.name,
    packageName: product.name,
    quantity: product.count,
    quantityLabel: product.name,
    currency: SOURCE_CURRENCY,
    price,
    regularPrice: price,
    compareAtPrice: compareAt && compareAt > price ? compareAt : undefined,
    deliveryTime: '',
    features: product.features ? [...product.features] : [],
    badge:
      product.commentType === 'Premium' && product.popular
        ? 'recommended'
        : product.popular
          ? 'most-popular'
          : product.commentType === 'High Quality' && product.count === 100
            ? 'best-value'
            : undefined,
    displayOrder: product.count,
    active: true,
    availability: 'active',
    commentType: product.commentType,
  };
}

function packagesForService(service: Service): PricingPackage[] {
  if (!isApprovedServiceSlug(service.slug)) return [];
  return getNovaLikesProductsByPlatformType(service.platform, service.category)
    .map((product) => mapProductToPackage(product, service))
    .sort((a, b) => a.quantity - b.quantity);
}

/** Built once from NovaLikes products + service registry — no invented tiers. */
const packagesByServiceSlug: Record<string, PricingPackage[]> = Object.fromEntries(
  getAllServices().map((service) => [service.slug, packagesForService(service)]),
);

function withOverrides(packages: PricingPackage[]): PricingPackage[] {
  return packages.map(applyPackageOverride);
}

/** Active packages only, ascending by quantity. */
export function getActivePackagesByServiceSlug(serviceSlug: string): PricingPackage[] {
  return withOverrides(packagesByServiceSlug[serviceSlug] ?? []).filter(
    (pkg) => pkg.active && pkg.availability === 'active',
  );
}

export function getPackagesByServiceSlug(serviceSlug: string): PricingPackage[] {
  return withOverrides(packagesByServiceSlug[serviceSlug] ?? []);
}

export function getPackageById(packageId: string): PricingPackage | undefined {
  for (const packages of Object.values(packagesByServiceSlug)) {
    const match = packages.find((pkg) => pkg.id === packageId);
    if (match) return applyPackageOverride(match);
  }

  const product = getNovaLikesProductById(packageId);
  if (!product) return undefined;
  const service = getAllServices().find(
    (s) => s.platform === product.platform && s.category === product.type,
  );
  return service ? applyPackageOverride(mapProductToPackage(product, service)) : undefined;
}

export function getPackagesByIds(packageIds: string[]): PricingPackage[] {
  return packageIds
    .map((id) => getPackageById(id))
    .filter((pkg): pkg is PricingPackage => Boolean(pkg));
}

/**
 * Resolve packages for a service page.
 * Returns [] when NovaLikes.com has no packages for that service — never fabricates data.
 */
export function resolveServicePackages(
  serviceSlug: string,
  packageIds?: string[],
): PricingPackage[] {
  if (!getServiceBySlug(serviceSlug)) return [];

  if (packageIds && packageIds.length > 0) {
    return getPackagesByIds(packageIds).filter(
      (pkg) =>
        pkg.serviceSlug === serviceSlug && pkg.active && pkg.availability === 'active',
    );
  }

  return getActivePackagesByServiceSlug(serviceSlug);
}

/** Services in the registry that have at least one NovaLikes.com package. */
export function getServicesWithPricing(): Service[] {
  return getAllServices().filter(
    (service) => getActivePackagesByServiceSlug(service.slug).length > 0,
  );
}

/** Services that still need real NovaLikes package data. */
export function getServicesMissingPricing(): Service[] {
  return getAllServices().filter(
    (service) => getActivePackagesByServiceSlug(service.slug).length === 0,
  );
}

export function getNovaLikesProductCount(): number {
  return NOVALIKES_PRODUCTS.length;
}

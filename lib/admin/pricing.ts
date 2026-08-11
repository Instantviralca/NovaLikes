/**
 * Admin pricing — Document 12.05.
 * Reads NovaLikes packages and applies admin overrides.
 */

import { getAllServices, getServiceBySlug } from '@/data/services';
import {
  getActivePackagesByServiceSlug,
  getPackageById,
  getPackagesByServiceSlug,
} from '@/data/pricing/packages';
import {
  ensureCatalogHydrated,
  upsertPackageOverride,
} from '@/lib/catalog/package-overrides-store';
import type { AdminPackageEditorModel, AdminPricingRow } from '@/types/admin-pricing';
import type { PackageBadgeId } from '@/types/pricing';

export async function getAdminPricingRows(): Promise<AdminPricingRow[]> {
  await ensureCatalogHydrated();
  return getAllServices().flatMap((service) => {
    const packages = getPackagesByServiceSlug(service.slug);
    return packages.map((pkg) => ({
      id: pkg.id,
      packageName: pkg.packageName,
      platformId: service.platform,
      serviceSlug: service.slug,
      serviceName: service.name,
      quantity: pkg.quantity,
      price: pkg.price,
      compareAtPrice: pkg.compareAtPrice,
      currency: pkg.currency,
      badge: pkg.badge,
      deliveryTime: pkg.deliveryTime,
      features: pkg.features,
      active: pkg.active && pkg.availability === 'active',
      displayOrder: pkg.displayOrder,
      updatedAt: new Date().toISOString().slice(0, 10),
    }));
  });
}

export async function getAdminPackageEditor(
  packageId: string,
): Promise<AdminPackageEditorModel | null> {
  await ensureCatalogHydrated();
  const pkg = getPackageById(packageId);
  if (!pkg) return null;
  const service = getServiceBySlug(pkg.serviceSlug);
  if (!service) return null;

  return {
    id: pkg.id,
    packageName: pkg.packageName,
    platformId: service.platform,
    serviceSlug: service.slug,
    serviceName: service.name,
    quantity: pkg.quantity,
    price: pkg.price,
    compareAtPrice: pkg.compareAtPrice,
    currency: pkg.currency,
    badge: pkg.badge,
    deliveryTime: pkg.deliveryTime,
    features: pkg.features,
    active: pkg.active && pkg.availability === 'active',
    displayOrder: pkg.displayOrder,
    updatedAt: new Date().toISOString().slice(0, 10),
    source: pkg,
  };
}

export async function getAdminPricingServiceOptions() {
  await ensureCatalogHydrated();
  return getAllServices()
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      platformId: s.platform,
      count: getActivePackagesByServiceSlug(s.slug).length,
    }))
    .filter((s) => s.count > 0);
}

export type AdminPackageUpdateInput = {
  price?: number;
  compareAtPrice?: number | null;
  quantity?: number;
  deliveryTime?: string;
  active?: boolean;
  badge?: PackageBadgeId | null;
};

export async function updateAdminPackage(packageId: string, input: AdminPackageUpdateInput) {
  const existing = getPackageById(packageId);
  if (!existing) throw new Error('Package not found.');
  await upsertPackageOverride(packageId, input);
  return getAdminPackageEditor(packageId);
}

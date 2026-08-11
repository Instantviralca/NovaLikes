import type { CurrencyCode, PackageBadgeId, PricingPackage } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

/** Admin Pricing Management — Document 12.05. Uses real NovaLikes packages. */
export type AdminPricingRow = {
  id: string;
  packageName: string;
  platformId: PlatformId;
  serviceSlug: string;
  serviceName: string;
  quantity: number;
  price: number;
  compareAtPrice?: number;
  currency: CurrencyCode;
  badge?: PackageBadgeId;
  deliveryTime: string;
  features: string[];
  active: boolean;
  displayOrder: number;
  updatedAt: string;
};

export type AdminPricingFilters = {
  platform?: PlatformId | 'all';
  serviceSlug?: string | 'all';
  status?: 'all' | 'active' | 'inactive';
  badge?: PackageBadgeId | 'all' | 'none';
  currency?: CurrencyCode | 'all';
};

export type AdminPackageEditorModel = AdminPricingRow & {
  /** Source package for preview — never invent values. */
  source: PricingPackage;
};

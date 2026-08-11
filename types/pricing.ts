/**
 * Pricing System — Document 10.01
 * Source of truth for packages, currencies, discounts, and future API shapes.
 * Never hardcode pricing values in React components.
 */

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'PKR';

export type PackageBadgeId =
  | 'most-popular'
  | 'best-value'
  | 'recommended'
  | 'starter'
  | 'premium'
  | 'business'
  | 'agency';

export type PackageAvailability = 'active' | 'hidden' | 'out_of_stock';

export type DiscountType =
  | 'sale_price'
  | 'percentage'
  | 'fixed'
  | 'coupon'
  | 'flash_sale';

/** Money amount in minor units (cents) for payment-ready math. */
export type MoneyAmount = {
  amount: number;
  currency: CurrencyCode;
};

export type PackageBadgeDefinition = {
  id: PackageBadgeId;
  label: string;
};

export type CurrencyDefinition = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Minor units per major unit (usually 100). */
  minorUnits: number;
  active: boolean;
  default?: boolean;
};

/**
 * Canonical commercial package model (API / CMS ready).
 */
export type PricingPackage = {
  id: string;
  serviceId: string;
  serviceSlug: string;
  slug: string;
  title: string;
  packageName: string;
  quantity: number;
  /** Display string e.g. "500 Followers" — resolved from service + quantity. */
  quantityLabel: string;
  currency: CurrencyCode;
  /** Current selling price (minor units). */
  price: number;
  /** List / regular price (minor units). */
  regularPrice: number;
  /** Optional sale price (minor units). Prefer over fabricating discounts. */
  salePrice?: number;
  /** Compare-at display price when discounted. */
  compareAtPrice?: number;
  deliveryTime: string;
  features: string[];
  badge?: PackageBadgeId;
  displayOrder: number;
  active: boolean;
  availability: PackageAvailability;
  /**
   * Comment type label from real package data only (e.g. custom / random / premium).
   * Omit when the NovaLikes source does not define a type — never invent.
   */
  commentType?: string;
  /**
   * When true, order configuration may request custom comment text.
   * Only set when real package data supports or requires custom comments.
   */
  supportsCustomComments?: boolean;
  /** Max characters per custom comment line when supported by package data. */
  customCommentMaxLength?: number;
};

export type DiscountRule = {
  id: string;
  type: DiscountType;
  /** Percentage 0–100 or fixed amount in minor units depending on type. */
  value: number;
  currency?: CurrencyCode;
  couponCode?: string;
  packageIds?: string[];
  serviceIds?: string[];
  startsAt?: string;
  endsAt?: string;
  active: boolean;
};

export type CouponDefinition = {
  id: string;
  code: string;
  discountType: Extract<DiscountType, 'percentage' | 'fixed'>;
  value: number;
  currency?: CurrencyCode;
  minSubtotal?: number;
  maxRedemptions?: number;
  active: boolean;
};

/** Payload when a visitor selects a package (pre-cart). */
export type PackageSelectionPayload = {
  packageId: string;
  serviceId: string;
  serviceSlug: string;
  quantity: number;
  price: number;
  currency: CurrencyCode;
};

/**
 * Suggested future API response shape.
 * GET /api/v1/services/:serviceSlug/packages
 */
export type PricingPackagesApiResponse = {
  serviceSlug: string;
  currency: CurrencyCode;
  packages: PricingPackage[];
  updatedAt: string;
};

/**
 * Suggested future API response shape.
 * POST /api/v1/coupons/validate
 */
export type CouponValidateApiRequest = {
  code: string;
  currency: CurrencyCode;
  packageIds: string[];
  subtotal: number;
};

export type CouponValidateApiResponse = {
  valid: boolean;
  coupon?: CouponDefinition;
  discountAmount: number;
  message?: string;
};

/** @deprecated Prefer PricingPackage — kept for migration aliases. */
export type ServicePackage = PricingPackage;

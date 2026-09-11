import type { CurrencyCode, MoneyAmount } from '@/types/pricing';
import type { OrderConfigurationValues } from '@/types/order-fields';

/**
 * Shopping cart — Document 10.04
 * Pricing math stays in the pricing layer; cart only stores selections.
 */

export type CartItemId = string;

export type CartItem = {
  id: CartItemId;
  packageId: string;
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  platformId: string;
  packageTitle: string;
  /** Package size (e.g. 1000) — not purchase multiplier. */
  quantity: number;
  /** Package size label. */
  quantityLabel: string;
  /**
   * Purchase multiplier for this cart line (default 1).
   * Distinct from package `quantity`.
   */
  lineQuantity?: number;
  unitPrice: number;
  currency: CurrencyCode;
  deliveryTime: string;
  configuration: OrderConfigurationValues;
  addedAt: string;
};

export type AppliedCoupon = {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  discountAmount: number;
};

export type CartTotals = {
  subtotal: MoneyAmount;
  discount: MoneyAmount;
  total: MoneyAmount;
  /** Total purchase units = sum(lineQuantity). Used by cart badge. */
  itemCount: number;
  /** Number of distinct cart lines. */
  lineCount: number;
};

export type CartState = {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  currency: CurrencyCode;
  updatedAt: string | null;
};

export type CartActions = {
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (itemId: CartItemId) => void;
  setLineQuantity: (itemId: CartItemId, lineQuantity: number) => void;
  incrementLineQuantity: (itemId: CartItemId) => void;
  decrementLineQuantity: (itemId: CartItemId) => void;
  updateItemConfiguration: (itemId: CartItemId, configuration: OrderConfigurationValues) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
};

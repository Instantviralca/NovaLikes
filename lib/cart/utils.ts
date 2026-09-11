import type { CurrencyCode } from '@/types/pricing';
import type { AppliedCoupon, CartItem, CartState, CartTotals } from '@/types/cart';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getDefaultCurrency } from '@/data/pricing/currencies';
import {
  computeLineTotal,
  normalizeLineQuantity,
  stableConfigurationKey,
} from '@/lib/orders/line-quantity';

export const CART_STORAGE_KEY = 'novalikes.comrt.v1';

export function createEmptyCart(currency?: CurrencyCode): CartState {
  return {
    items: [],
    coupon: null,
    currency: currency ?? getDefaultCurrency().code,
    updatedAt: null,
  };
}

export function createCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getCartLineQuantity(item: Pick<CartItem, 'lineQuantity'>): number {
  return normalizeLineQuantity(item.lineQuantity);
}

export function calculateCartTotals(
  items: CartItem[],
  coupon: AppliedCoupon | null,
  currency: CurrencyCode,
): CartTotals {
  const subtotalAmount = items.reduce(
    (sum, item) => sum + computeLineTotal(item.unitPrice, item.lineQuantity),
    0,
  );
  const discountAmount = coupon
    ? Math.min(coupon.discountAmount, subtotalAmount)
    : 0;
  const purchaseUnits = items.reduce(
    (sum, item) => sum + getCartLineQuantity(item),
    0,
  );

  return {
    subtotal: { amount: subtotalAmount, currency },
    discount: { amount: discountAmount, currency },
    total: { amount: Math.max(subtotalAmount - discountAmount, 0), currency },
    itemCount: purchaseUnits,
    lineCount: items.length,
  };
}

export function serializeCart(state: CartState): string {
  return JSON.stringify(state);
}

export function isOfferedCartItem(item: Pick<CartItem, 'serviceSlug'>): boolean {
  return isApprovedServiceSlug(item.serviceSlug);
}

export function filterOfferedCartItems(state: CartState): CartState {
  const items = state.items.filter(isOfferedCartItem);
  if (items.length === state.items.length) return state;
  return {
    ...state,
    items,
    updatedAt: new Date().toISOString(),
  };
}

export function deserializeCart(raw: string | null): CartState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return filterOfferedCartItems({
      ...parsed,
      items: parsed.items.map((item) => ({
        ...item,
        lineQuantity: normalizeLineQuantity(item.lineQuantity),
      })),
    });
  } catch {
    return null;
  }
}

export function cartLinesMatch(
  existing: CartItem,
  incoming: Pick<CartItem, 'packageId' | 'configuration'>,
): boolean {
  return (
    existing.packageId === incoming.packageId &&
    stableConfigurationKey(existing.configuration) ===
      stableConfigurationKey(incoming.configuration)
  );
}

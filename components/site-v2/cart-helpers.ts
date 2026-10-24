import { getPackageById } from '@/data/pricing/packages';
import { computeLineTotal, normalizeLineQuantity } from '@/lib/orders/line-quantity';
import type { CartItem } from '@/types/cart';

const DESTINATION_KEYS = [
  'username',
  'url',
  'link',
  'postUrl',
  'videoUrl',
  'pageUrl',
  'channelUrl',
] as const;

/** Best-effort destination label (username or URL) for cart line display. */
export function getCartItemDestination(item: CartItem): string {
  const config = item.configuration;
  for (const key of DESTINATION_KEYS) {
    const value = config[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  for (const [key, value] of Object.entries(config)) {
    if (key === 'notes' || key === 'comments' || key === 'customComments') continue;
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

/**
 * Package display title for site-v2 cart / drawer / checkout / toast.
 * Use packageTitle only (already includes quantity + tier when present).
 */
export function getCartItemTitle(item: CartItem): string {
  const title = item.packageTitle?.trim();
  if (title) return title;
  // Tier packages: if title ever lacks the tier, mirror quantityLabel (old cart).
  const label = item.quantityLabel?.trim();
  if (label) return label;
  return item.serviceName?.trim() || item.packageId;
}

/** Panel heading: "1 item" vs "{count} items". */
export function formatCartItemsHeading(
  count: number,
  one: string,
  many: string,
): string {
  if (count === 1) return one;
  return many.replace('{count}', String(count));
}

/** Line price + optional compare-at from the catalog (not stored on the cart line). */
export function getCartItemPrices(item: CartItem): {
  price: number;
  compareAt: number | undefined;
  currency: CartItem['currency'];
} {
  const qty = normalizeLineQuantity(item.lineQuantity);
  const price = computeLineTotal(item.unitPrice, qty);
  const catalog = getPackageById(item.packageId);
  const unitCompare = catalog?.compareAtPrice;
  const compareAt =
    unitCompare && unitCompare > item.unitPrice ? unitCompare * qty : undefined;
  return { price, compareAt, currency: item.currency };
}

export function formatItemsCountLabel(
  count: number,
  one: string,
  many: string,
): string {
  if (count === 1) return one;
  return many.replace('{count}', String(count));
}

export function formatItemsHeading(count: number, template: string): string {
  return template.replace('{count}', String(count));
}

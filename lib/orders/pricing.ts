/**
 * Server-side checkout pricing — never trust client totals.
 */

import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getOrderFieldsForServiceSlug } from '@/data/order-fields';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import { findPackage, validateCoupon } from '@/lib/pricing/resolve';
import type { CartItem } from '@/types/cart';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { CurrencyCode, MoneyAmount } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';
import type { OrderLineItem } from '@/types/order';

export type ValidatedCheckoutPricing = {
  items: OrderLineItem[];
  subtotal: MoneyAmount;
  discount: MoneyAmount;
  total: MoneyAmount;
  couponCode?: string;
  currency: CurrencyCode;
};

function isPlatformId(value: string): value is PlatformId {
  return ['instagram', 'tiktok', 'facebook', 'youtube'].includes(value);
}

export function validateCheckoutPricing(input: {
  items: CartItem[];
  couponCode?: string | null;
}): ValidatedCheckoutPricing {
  if (!input.items.length) {
    throw new Error('Cart is empty.');
  }

  const currency = (input.items[0]?.currency ?? 'USD') as CurrencyCode;
  const lineItems: OrderLineItem[] = [];
  let subtotalAmount = 0;

  for (const item of input.items) {
    const pkg = findPackage(item.packageId);
    if (!pkg || !pkg.active || !isApprovedServiceSlug(pkg.serviceSlug)) {
      throw new Error(`Invalid or inactive package: ${item.packageId}`);
    }
    if (pkg.currency !== currency && item.currency !== pkg.currency) {
      throw new Error('Mixed currencies are not supported.');
    }
    if (item.quantity !== pkg.quantity) {
      throw new Error(`Quantity mismatch for package ${item.packageId}.`);
    }

    // Never trust client unitPrice — use catalog minor units.
    const unitPrice = pkg.price;
    subtotalAmount += unitPrice;

    // Re-validate username / URL configuration server-side (never trust client-only checks).
    const fields = getOrderFieldsForServiceSlug(pkg.serviceSlug, pkg);
    const rawConfig = (item.configuration ?? {}) as OrderConfigurationValues;
    const configuration = normalizeOrderConfigurationValues(fields, rawConfig);
    const configErrors = validateOrderConfiguration(fields, configuration);
    if (configErrors.length > 0) {
      throw new Error(
        configErrors[0]?.message ?? `Invalid order details for ${pkg.serviceSlug}.`,
      );
    }

    lineItems.push({
      id: item.id,
      platformId: isPlatformId(item.platformId) ? item.platformId : 'instagram',
      serviceId: pkg.serviceId,
      serviceSlug: pkg.serviceSlug,
      serviceName: item.serviceName || pkg.packageName || pkg.title,
      packageId: pkg.id,
      packageTitle: pkg.title,
      quantity: pkg.quantity,
      quantityLabel: pkg.quantityLabel,
      unitPrice,
      currency: pkg.currency,
      configuration,
      deliveryTime: item.deliveryTime ?? pkg.deliveryTime,
    });
  }

  let discountAmount = 0;
  let couponCode: string | undefined;
  if (input.couponCode?.trim()) {
    const result = validateCoupon({
      code: input.couponCode.trim(),
      subtotal: subtotalAmount,
      currency,
      packageIds: lineItems.map((item) => item.packageId),
    });
    if (!result.valid) {
      throw new Error(result.message || 'Invalid coupon.');
    }
    discountAmount = result.discountAmount;
    couponCode = result.coupon?.code ?? input.couponCode.trim().toUpperCase();
  }

  const totalAmount = Math.max(0, subtotalAmount - discountAmount);

  return {
    items: lineItems,
    subtotal: { amount: subtotalAmount, currency },
    discount: { amount: discountAmount, currency },
    total: { amount: totalAmount, currency },
    couponCode,
    currency,
  };
}

/** Reject client-supplied totals that disagree with server recalculation. */
export function assertClientTotalsMatch(
  server: ValidatedCheckoutPricing,
  client?: { subtotal?: MoneyAmount; discount?: MoneyAmount; total?: MoneyAmount },
): void {
  if (!client?.total) return;
  if (
    client.total.amount !== server.total.amount ||
    client.total.currency !== server.total.currency
  ) {
    throw new Error('Price validation failed. Please refresh and try again.');
  }
}

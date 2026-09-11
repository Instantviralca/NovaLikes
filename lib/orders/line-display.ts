/**
 * Shared multi-item order presentation helpers (admin / emails / track).
 */

import { formatMoney } from '@/lib/pricing/format';
import {
  computeLineTotal,
  normalizeLineQuantity,
} from '@/lib/orders/line-quantity';
import type { Order, OrderLineItem } from '@/types/order';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { CurrencyCode } from '@/types/pricing';

export type OrderLineView = {
  id: string;
  platformId: string;
  serviceName: string;
  serviceSlug: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  lineQuantity: number;
  unitPrice: number;
  unitPriceDisplay: string;
  lineTotal: number;
  lineTotalDisplay: string;
  currency: CurrencyCode;
  targetDisplay: string;
  configuration: OrderConfigurationValues;
  deliveryTime?: string;
};

export function resolveLineTarget(configuration: OrderConfigurationValues | undefined): string {
  if (!configuration) return '';
  const value =
    configuration.username ??
    configuration.targetUrl ??
    configuration.url ??
    configuration.profileUrl ??
    configuration.videoUrl ??
    configuration.channelUrl ??
    '';
  return typeof value === 'string' ? value.trim() : String(value ?? '').trim();
}

export function toOrderLineView(item: OrderLineItem): OrderLineView {
  const lineQuantity = normalizeLineQuantity(item.lineQuantity);
  const lineTotal = computeLineTotal(item.unitPrice, lineQuantity);
  const currency = item.currency;
  return {
    id: item.id,
    platformId: item.platformId,
    serviceName: item.serviceName,
    serviceSlug: item.serviceSlug,
    packageTitle: item.packageTitle,
    quantity: item.quantity,
    quantityLabel: item.quantityLabel,
    lineQuantity,
    unitPrice: item.unitPrice,
    unitPriceDisplay: formatMoney(item.unitPrice, currency),
    lineTotal,
    lineTotalDisplay: formatMoney(lineTotal, currency),
    currency,
    targetDisplay: resolveLineTarget(item.configuration),
    configuration: item.configuration ?? {},
    deliveryTime: item.deliveryTime,
  };
}

export function getOrderLineViews(order: Pick<Order, 'items'>): OrderLineView[] {
  return (order.items ?? []).map(toOrderLineView);
}

export function sumPurchaseUnits(order: Pick<Order, 'items'>): number {
  return (order.items ?? []).reduce(
    (sum, item) => sum + normalizeLineQuantity(item.lineQuantity),
    0,
  );
}

/** Compact admin/dashboard summary: "Instagram Followers + 1 more" */
export function formatMultiItemServiceSummary(order: Pick<Order, 'items'>): string {
  const items = order.items ?? [];
  if (items.length === 0) return 'Service';
  const first = items[0]?.serviceName ?? 'Service';
  if (items.length === 1) return first;
  const more = items.length - 1;
  return `${first} + ${more} more`;
}

export function formatItemCountLabel(order: Pick<Order, 'items'>): string {
  const count = order.items?.length ?? 0;
  return count === 1 ? '1 item' : `${count} items`;
}

export function formatPurchaseUnitsLabel(order: Pick<Order, 'items'>): string {
  const units = sumPurchaseUnits(order);
  return units === 1 ? '1 purchase unit' : `${units} purchase units`;
}

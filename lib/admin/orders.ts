import { formatMoney } from '@/lib/pricing/format';
import { getAllServices } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import {
  formatItemCountLabel,
  formatMultiItemServiceSummary,
  getOrderLineViews,
  resolveLineTarget,
  sumPurchaseUnits,
} from '@/lib/orders/line-display';
import {
  isReservedConfigurationKey,
  normalizeLineQuantity,
} from '@/lib/orders/line-quantity';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { listOrders, getOrderById, resolveOrderByCustomerRef } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import type {
  AdminOrderDetails,
  AdminOrderFulfillmentField,
  AdminOrderLineView,
  AdminOrderRow,
} from '@/types/admin-orders';
import type { Order } from '@/types/order';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { PlatformId } from '@/types/platform';
import type { CurrencyCode } from '@/types/pricing';

/**
 * Admin orders data layer — Document 12.03.
 * Fulfilment queue includes paid orders only.
 * Delivery targets are shown unmasked for staff fulfillment.
 */

const FIELD_LABELS: Record<string, string> = {
  username: 'Username',
  targetUrl: 'Target URL',
  url: 'URL',
  profileUrl: 'Profile URL',
  videoUrl: 'Video URL',
  channelUrl: 'Channel URL',
  notes: 'Order notes',
  customComments: 'Custom comments',
};

function buildFulfillmentFields(
  configuration: OrderConfigurationValues | undefined,
): AdminOrderFulfillmentField[] {
  if (!configuration) return [];
  const preferredOrder = [
    'username',
    'targetUrl',
    'url',
    'profileUrl',
    'videoUrl',
    'channelUrl',
    'customComments',
    'notes',
  ];
  const seen = new Set<string>();
  const fields: AdminOrderFulfillmentField[] = [];

  for (const key of preferredOrder) {
    if (isReservedConfigurationKey(key)) continue;
    const raw = configuration[key];
    if (raw == null || raw === '') continue;
    const value = String(raw).trim();
    if (!value) continue;
    seen.add(key);
    fields.push({
      key,
      label: FIELD_LABELS[key] ?? key,
      value,
    });
  }

  for (const [key, raw] of Object.entries(configuration)) {
    if (seen.has(key) || isReservedConfigurationKey(key) || raw == null || raw === '') continue;
    const value = String(raw).trim();
    if (!value) continue;
    fields.push({
      key,
      label: FIELD_LABELS[key] ?? key,
      value,
    });
  }

  return fields;
}

function toAdminLines(order: Order): AdminOrderLineView[] {
  return getOrderLineViews(order).map((line) => ({
    id: line.id,
    platformId: line.platformId as PlatformId,
    serviceName: line.serviceName,
    packageTitle: line.packageTitle,
    quantityLabel: line.quantityLabel,
    packageQuantity: line.quantity,
    lineQuantity: line.lineQuantity,
    unitPriceDisplay: line.unitPriceDisplay,
    lineTotalDisplay: line.lineTotalDisplay,
    targetDisplay: line.targetDisplay || '—',
    configuration: line.configuration,
    fulfillmentFields: buildFulfillmentFields(line.configuration),
    deliveryTime: line.deliveryTime,
  }));
}

function toRow(order: Order): AdminOrderRow {
  const lines = toAdminLines(order);
  const first = lines[0];
  const isMultiItem = lines.length > 1;
  const currency = order.total.currency as CurrencyCode;

  return {
    id: order.id,
    publicOrderId: getCustomerOrderId(order),
    customerEmail: order.guestEmail,
    platformId: (first?.platformId ?? 'instagram') as PlatformId,
    serviceName: formatMultiItemServiceSummary(order),
    packageTitle: isMultiItem
      ? formatItemCountLabel(order)
      : (first?.packageTitle ?? 'Package'),
    quantity: first?.packageQuantity ?? 0,
    quantityLabel: isMultiItem
      ? formatItemCountLabel(order)
      : (first?.quantityLabel ?? '—'),
    itemCount: lines.length,
    itemCountLabel: formatItemCountLabel(order),
    purchaseUnitCount: sumPurchaseUnits(order),
    isMultiItem,
    totalDisplay: formatMoney(order.total.amount, currency, 'en'),
    paymentStatus: order.payment?.status ?? 'pending',
    orderStatus: order.status,
    targetDisplay: first?.targetDisplay || '—',
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

export async function getAdminOrderRows(options?: {
  paidOnly?: boolean;
}): Promise<AdminOrderRow[]> {
  const orders = await listOrders();
  const filtered = options?.paidOnly
    ? orders.filter(isEligibleForFulfilmentQueue)
    : orders;
  return filtered.map(toRow);
}

export async function getAdminOrderById(orderId: string): Promise<AdminOrderDetails | null> {
  const order =
    (await resolveOrderByCustomerRef(orderId)) ?? (await getOrderById(orderId));
  if (!order) return null;
  const lines = toAdminLines(order);
  const first = lines[0];
  const currency = order.total.currency as CurrencyCode;
  return {
    ...toRow(order),
    timeline: order.timeline,
    internalNotes: order.internalNotes,
    paymentMethod: order.payment?.provider,
    customerNotes: order.customerNotes,
    subtotalDisplay: formatMoney(order.subtotal.amount, currency, 'en'),
    discountDisplay: formatMoney(order.discount.amount, currency, 'en'),
    lines,
    configuration: first?.configuration ?? {},
    fulfillmentFields: first?.fulfillmentFields ?? [],
  };
}

/** Service options for order filters (from registry). */
export function getAdminOrderServiceOptions() {
  return getAllServices().map((s) => ({
    slug: s.slug,
    name: s.name,
    platformId: s.platform,
    packageCount: getActivePackagesByServiceSlug(s.slug).length,
  }));
}

export { normalizeLineQuantity, resolveLineTarget };

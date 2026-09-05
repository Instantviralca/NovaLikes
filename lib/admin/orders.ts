import { formatMoney } from '@/lib/pricing/format';
import { getAllServices } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { listOrders, getOrderById } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import type {
  AdminOrderDetails,
  AdminOrderFulfillmentField,
  AdminOrderRow,
} from '@/types/admin-orders';
import type { Order, OrderLineItem } from '@/types/order';
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

function resolveTarget(configuration: OrderConfigurationValues | undefined): string {
  if (!configuration) return '';
  const value =
    configuration.username ??
    configuration.targetUrl ??
    configuration.url ??
    configuration.profileUrl ??
    configuration.videoUrl ??
    configuration.channelUrl ??
    '';
  return typeof value === 'string' ? value.trim() : String(value ?? '');
}

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
    if (seen.has(key) || raw == null || raw === '') continue;
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

function toRow(order: Order): AdminOrderRow {
  const item = order.items[0] as OrderLineItem | undefined;
  const configuration = (item?.configuration ?? {}) as OrderConfigurationValues;
  return {
    id: order.id,
    publicOrderId: getCustomerOrderId(order),
    customerEmail: order.guestEmail,
    platformId: (item?.platformId ?? 'instagram') as PlatformId,
    serviceName: item?.serviceName ?? 'Service',
    packageTitle: item?.packageTitle ?? 'Package',
    quantity: item?.quantity ?? 0,
    quantityLabel: item?.quantityLabel ?? String(item?.quantity ?? 0),
    totalDisplay: formatMoney(
      order.total.amount,
      order.total.currency as CurrencyCode,
      'en',
    ),
    paymentStatus: order.payment?.status ?? 'pending',
    orderStatus: order.status,
    targetDisplay: resolveTarget(configuration) || '—',
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
  const order = await getOrderById(orderId);
  if (!order) return null;
  const item = order.items[0];
  const configuration = (item?.configuration ?? {}) as OrderConfigurationValues;
  return {
    ...toRow(order),
    timeline: order.timeline,
    internalNotes: order.internalNotes,
    paymentMethod: order.payment?.provider,
    customerNotes: order.customerNotes,
    configuration,
    fulfillmentFields: buildFulfillmentFields(configuration),
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

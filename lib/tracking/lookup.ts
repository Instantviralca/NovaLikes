import { getCustomerStatusMessage, getAdminStatusLabel, ORDER_STATUSES } from '@/lib/orders/status';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import type { Order } from '@/types/order';
import type { OrderStatus } from '@/types/order-status';
import type {
  PublicOrderTimelineStep,
  PublicTrackedOrder,
  TrackOrderLookupInput,
  TrackOrderLookupResult,
} from '@/types/tracking';

/**
 * Order Tracking lookup — Document 11.05.
 * Architecture: verification + public projection.
 */

const GENERIC_NOT_FOUND =
  'We could not find an order with those details. Check your Order ID and email, then try again.';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeOrderId(orderId: string): string {
  return orderId.trim();
}

/** Mask username/URL for public display. */
export function maskTarget(raw: string): string {
  const value = raw.trim();
  if (!value) return '—';
  if (value.startsWith('http')) {
    try {
      const url = new URL(value);
      return `${url.hostname}/…`;
    } catch {
      return 'Link on file';
    }
  }
  if (value.length <= 3) return '***';
  return `${value.slice(0, 2)}***${value.slice(-1)}`;
}

function extractTarget(order: Order): string {
  const config = order.items[0]?.configuration ?? {};
  const preferred =
    config.username ?? config.targetUrl ?? config.url ?? Object.values(config)[0];
  return preferred === undefined ? '' : String(preferred);
}

const MILESTONE_ORDER: Array<{ status: OrderStatus; label: string }> = [
  { status: 'pending', label: 'Order Received' },
  { status: 'processing', label: 'Processing Started' },
  { status: 'completed', label: 'Completed' },
];

export function buildPublicTimeline(
  status: OrderStatus,
  updatedAt: string,
): PublicOrderTimelineStep[] {
  if (status === 'cancelled' || status === 'refunded' || status === 'partial') {
    return [
      {
        id: 'received',
        label: 'Order Received',
        status: 'complete',
      },
      {
        id: status,
        label: getAdminStatusLabel(status),
        status: 'current',
        at: updatedAt,
        message: getCustomerStatusMessage(status),
      },
    ];
  }

  const currentIndex = MILESTONE_ORDER.findIndex((m) => m.status === status);

  return MILESTONE_ORDER.map((milestone, index) => {
    let stepStatus: PublicOrderTimelineStep['status'] = 'upcoming';
    if (index < currentIndex) stepStatus = 'complete';
    if (index === currentIndex) stepStatus = 'current';
    if (status === 'completed' && milestone.status === 'completed') {
      stepStatus = 'complete';
    }
    return {
      id: milestone.status,
      label: milestone.label,
      status: stepStatus,
      at: stepStatus !== 'upcoming' ? updatedAt : undefined,
      message:
        stepStatus === 'current' ? getCustomerStatusMessage(status) : undefined,
    };
  });
}

export function toPublicTrackedOrder(order: Order): PublicTrackedOrder {
  const item = order.items[0];
  return {
    orderId: getCustomerOrderId(order),
    status: order.status,
    statusLabel: getAdminStatusLabel(order.status),
    statusMessage: getCustomerStatusMessage(order.status),
    serviceName: item?.serviceName ?? 'Service',
    packageTitle: item?.packageTitle ?? 'Package',
    quantityLabel: item?.quantityLabel ?? String(item?.quantity ?? ''),
    targetDisplay: maskTarget(extractTarget(order)),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    estimatedDelivery: item?.deliveryTime || undefined,
    timeline: buildPublicTimeline(order.status, order.updatedAt),
  };
}

/**
 * Verify Order ID + Email. Returns a generic error when unmatched.
 */
export async function lookupTrackedOrder(
  input: TrackOrderLookupInput,
  findOrder?: (orderId: string) => Promise<Order | null>,
): Promise<TrackOrderLookupResult> {
  const orderId = normalizeOrderId(input.orderId);
  const email = normalizeEmail(input.email);

  if (!orderId || !email || !email.includes('@')) {
    return {
      ok: false,
      error: {
        code: 'invalid_input',
        message: 'Enter a valid Order ID and email address.',
      },
    };
  }

  try {
    const order = findOrder ? await findOrder(orderId) : null;
    if (!order || normalizeEmail(order.guestEmail) !== email) {
      return {
        ok: false,
        error: { code: 'not_found', message: GENERIC_NOT_FOUND },
      };
    }

    return { ok: true, order: toPublicTrackedOrder(order) };
  } catch {
    return {
      ok: false,
      error: {
        code: 'server_error',
        message: 'Something went wrong. Please try again in a moment.',
      },
    };
  }
}

export function isKnownOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

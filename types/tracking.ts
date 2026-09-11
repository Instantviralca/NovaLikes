/**
 * Public Order Tracking — Document 11.05
 * Customer-safe view models only. Never expose admin/internal data.
 */

import type { OrderStatus } from '@/types/order-status';

export type TrackOrderLookupInput = {
  orderId: string;
  email: string;
};

export type TrackOrderLookupErrorCode =
  | 'not_found'
  | 'invalid_input'
  | 'rate_limited'
  | 'server_error';

/**
 * Generic error — do not reveal whether Order ID exists.
 */
export type TrackOrderLookupError = {
  code: TrackOrderLookupErrorCode;
  message: string;
};

export type PublicOrderTimelineStep = {
  id: string;
  label: string;
  status: 'complete' | 'current' | 'upcoming';
  at?: string;
  message?: string;
};

export type PublicTrackedOrderLine = {
  serviceName: string;
  packageTitle: string;
  quantityLabel: string;
  lineQuantity: number;
  targetDisplay: string;
  lineTotalDisplay?: string;
};

export type PublicTrackedOrder = {
  orderId: string;
  status: OrderStatus;
  statusLabel: string;
  statusMessage: string;
  /** @deprecated Prefer `items` — kept for older UI fallbacks. */
  serviceName: string;
  /** @deprecated Prefer `items`. */
  packageTitle: string;
  /** @deprecated Prefer `items`. */
  quantityLabel: string;
  /** @deprecated Prefer per-line targetDisplay. */
  targetDisplay: string;
  items: PublicTrackedOrderLine[];
  itemCount: number;
  orderTotalDisplay?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  timeline: PublicOrderTimelineStep[];
};

export type TrackOrderLookupResult =
  | { ok: true; order: PublicTrackedOrder }
  | { ok: false; error: TrackOrderLookupError };

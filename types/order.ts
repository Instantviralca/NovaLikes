import type { CurrencyCode, MoneyAmount } from '@/types/pricing';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { PlatformId } from '@/types/platform';
import type { PaymentProviderId, PaymentStatus } from '@/types/payment';
import type {
  OrderActor,
  OrderStatus,
  OrderTimelineEvent,
  OrderTimelineEventType,
} from '@/types/order-status';

/**
 * Order Management — Documents 11.01 / 11.02 / 11.03
 * v1 assumes manual fulfillment. Provider fields remain optional for future automation.
 */

export type {
  OrderStatus,
  OrderTimelineEvent,
  OrderTimelineEventType,
  OrderActor,
  OrderStatusMetadata,
  AdminOrderActionId,
} from '@/types/order-status';

export type OrderFulfillmentMode = 'manual' | 'provider';

export type OrderLineItem = {
  id: string;
  platformId: PlatformId;
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  packageId: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  unitPrice: number;
  currency: CurrencyCode;
  /** Username, URL, and other fulfillment inputs from order configuration. */
  configuration: OrderConfigurationValues;
  deliveryTime?: string;
};

export type OrderPaymentDetails = {
  provider: PaymentProviderId;
  paymentId?: string;
  status: PaymentStatus;
  amount: MoneyAmount;
  paidAt?: string;
};

/**
 * Reserved for future SMM provider automation.
 * Unused in v1 manual workflow — fulfillment happens in Admin Panel.
 */
export type OrderProviderDetails = {
  providerId: string;
  externalOrderId?: string;
  lastStatus?: string;
  attempts: number;
  lastAttemptAt?: string;
};

export type OrderInternalNote = {
  id: string;
  body: string;
  createdBy: OrderActor;
  createdAt: string;
};

/**
 * Canonical commercial order after successful payment.
 * Initial status is always `pending` (payment verified, awaiting manual review).
 */
export type Order = {
  id: string;
  /**
   * Sequential customer-facing number (1001 → "01001").
   * Null/undefined on historical IV-only orders.
   */
  publicNumber?: number | null;
  customerId?: string;
  guestEmail: string;
  status: OrderStatus;
  fulfillmentMode: OrderFulfillmentMode;
  currency: CurrencyCode;
  items: OrderLineItem[];
  subtotal: MoneyAmount;
  discount: MoneyAmount;
  total: MoneyAmount;
  couponCode?: string;
  /** Optional customer-facing order notes (from checkout / configuration). */
  customerNotes?: string;
  payment?: OrderPaymentDetails;
  /** Future automation only — omit for manual v1. */
  provider?: OrderProviderDetails;
  timeline: OrderTimelineEvent[];
  /** Admin-only notes — never expose to customers. */
  internalNotes: OrderInternalNote[];
  createdAt: string;
  updatedAt: string;
};

/** Snapshot used by Admin review / tracking UIs (architecture only). */
export type ManualOrderReviewSummary = {
  orderId: string;
  guestEmail: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  quantity: number;
  /** Primary username or URL from configuration. */
  target: string;
  paymentStatus?: PaymentStatus;
  orderStatus: OrderStatus;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type SuggestedOrderEntities = {
  orders: 'Order';
  order_items: 'OrderLineItem';
  order_events: 'OrderTimelineEvent';
  order_payments: 'OrderPaymentDetails';
  order_internal_notes: 'OrderInternalNote';
  order_provider_jobs: 'OrderProviderDetails';
};

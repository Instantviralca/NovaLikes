import type { OrderStatus } from '@/types/order-status';
import type { PaymentStatus } from '@/types/payment';
import type { PlatformId } from '@/types/platform';
import type { OrderInternalNote, OrderTimelineEvent } from '@/types/order';
import type { OrderConfigurationValues } from '@/types/order-fields';

/** Admin Order Management row — Document 12.03. */
export type AdminOrderRow = {
  /** Internal database order id (IV-…). Used for admin API routes. */
  id: string;
  /** Customer-facing order number (01001) or legacy IV- id. */
  publicOrderId: string;
  customerEmail: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  totalDisplay: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  /** Unmasked delivery target for fulfillment (username or URL). */
  targetDisplay: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrderFulfillmentField = {
  key: string;
  label: string;
  value: string;
};

export type AdminOrderFilters = {
  status?: OrderStatus | 'all';
  platform?: PlatformId | 'all';
  serviceSlug?: string | 'all';
  paymentStatus?: PaymentStatus | 'all';
  dateFrom?: string;
  dateTo?: string;
};

export type AdminOrderSort =
  | 'newest'
  | 'oldest'
  | 'status'
  | 'total'
  | 'updated';

export type AdminOrderDetails = AdminOrderRow & {
  timeline: OrderTimelineEvent[];
  internalNotes: OrderInternalNote[];
  paymentMethod?: string;
  customerNotes?: string;
  /** Full client-submitted order configuration for delivery. */
  configuration: OrderConfigurationValues;
  /** Labeled fulfillment fields for admin UI. */
  fulfillmentFields: AdminOrderFulfillmentField[];
};

export type AdminOrdersListState = {
  query: string;
  filters: AdminOrderFilters;
  sort: AdminOrderSort;
  page: number;
  pageSize: number;
  selectedOrderId: string | null;
  selectedIds: string[];
};

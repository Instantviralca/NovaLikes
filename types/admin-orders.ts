import type { OrderStatus } from '@/types/order-status';
import type { PaymentStatus } from '@/types/payment';
import type { PlatformId } from '@/types/platform';
import type { OrderInternalNote, OrderTimelineEvent } from '@/types/order';
import type { OrderConfigurationValues } from '@/types/order-fields';

/** One purchased line for admin detail. */
export type AdminOrderLineView = {
  id: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  /** Package size label (not purchase qty). */
  quantityLabel: string;
  packageQuantity: number;
  lineQuantity: number;
  unitPriceDisplay: string;
  lineTotalDisplay: string;
  targetDisplay: string;
  configuration: OrderConfigurationValues;
  fulfillmentFields: AdminOrderFulfillmentField[];
  deliveryTime?: string;
};

/** Admin Order Management row — Document 12.03. */
export type AdminOrderRow = {
  /** Internal database order id (IV-…). Used for admin API routes. */
  id: string;
  /** Customer-facing order number (01001) or legacy IV- id. */
  publicOrderId: string;
  customerEmail: string;
  platformId: PlatformId;
  /** Compact service summary (may include "+ N more"). */
  serviceName: string;
  /** Compact package summary for single-item; multi uses item count. */
  packageTitle: string;
  /** @deprecated Prefer quantityLabel / line summaries — package size of first item. */
  quantity: number;
  /** Package label for single-item; multi shows item count. */
  quantityLabel: string;
  itemCount: number;
  itemCountLabel: string;
  purchaseUnitCount: number;
  isMultiItem: boolean;
  totalDisplay: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  /** Unmasked delivery target for fulfillment (username or URL) — first line / primary. */
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
  subtotalDisplay: string;
  discountDisplay: string;
  /** All purchased lines. */
  lines: AdminOrderLineView[];
  /**
   * @deprecated Prefer `lines`. Kept for transitional UI that still reads first-item config.
   */
  configuration: OrderConfigurationValues;
  /** @deprecated Prefer per-line fulfillmentFields. */
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

/**
 * Manual Order Workflow — Document 11.02
 * Durable store-backed. Paid orders only enter admin fulfilment queue.
 */

import { placeOrder } from '@/lib/orders/create';
import { formatMultiItemServiceSummary } from '@/lib/orders/line-display';
import { normalizeLineQuantity } from '@/lib/orders/line-quantity';
import { getOrderById, saveOrder } from '@/lib/orders/store';
import { notifyOrderStatusChange } from '@/lib/notifications/order-hooks';
import type { CartItem } from '@/types/cart';
import type { CustomerInformation, PlaceOrderPayload } from '@/types/checkout';
import type { Order, OrderInternalNote, ManualOrderReviewSummary } from '@/types/order';
import type { OrderActor, OrderStatus } from '@/types/order-status';
import type { CreatePaymentResult } from '@/types/payment';
import { ORDER_STATUS_TRANSITIONS } from '@/lib/orders/status';

export type ManualWorkflowStage =
  | 'awaiting_payment'
  | 'order_created'
  | 'admin_review'
  | 'processing'
  | 'completed'
  | 'partial'
  | 'cancelled'
  | 'refunded';

export type CreateOrderFromCheckoutInput = {
  checkout: PlaceOrderPayload | {
    customer: CustomerInformation;
    items: CartItem[];
  };
  payment: Pick<CreatePaymentResult, 'paymentId' | 'status' | 'provider'>;
};

export type ManualStatusUpdateInput = {
  orderId: string;
  nextStatus: OrderStatus;
  actor: OrderActor;
  internalNote?: string;
};

export type AddInternalNoteInput = {
  orderId: string;
  body: string;
  actor: OrderActor;
};

export type ManualOrderWorkflow = {
  createOrderFromPayment: (input: CreateOrderFromCheckoutInput) => Promise<Order>;
  startProcessing: (orderId: string, actor: OrderActor, note?: string) => Promise<Order>;
  markCompleted: (orderId: string, actor: OrderActor, note?: string) => Promise<Order>;
  markPartial: (orderId: string, actor: OrderActor, note?: string) => Promise<Order>;
  cancelOrder: (orderId: string, actor: OrderActor, note?: string) => Promise<Order>;
  refundOrder: (orderId: string, actor: OrderActor, note?: string) => Promise<Order>;
  addInternalNote: (input: AddInternalNoteInput) => Promise<OrderInternalNote>;
  getReviewSummary: (orderId: string) => Promise<ManualOrderReviewSummary>;
};

export type ManualWorkflowIntegrations = {
  checkout: 'PlaceOrderPayload / Cart → CreateOrderFromCheckoutInput';
  paymentGateway: 'CreatePaymentResult (paid) → createOrderFromPayment';
  orderStatusSystem: 'lib/orders/status.ts transitions + metadata';
  notifications: 'OrderNotificationHooks (lib/orders/notifications.ts)';
  orderTracking: 'Public order status + public timeline';
  adminPanel: 'ManualOrderWorkflow actions';
};

async function requireOrder(orderId: string): Promise<Order> {
  const order = await getOrderById(orderId);
  if (!order) throw new Error(`[Manual OMS] Order not found: ${orderId}`);
  return order;
}

async function transitionOrder(
  orderId: string,
  nextStatus: OrderStatus,
  actor: OrderActor,
  note?: string,
): Promise<Order> {
  const order = await requireOrder(orderId);
  if (order.payment?.status !== 'paid' && nextStatus === 'processing') {
    throw new Error('[Manual OMS] Cannot fulfil unpaid orders.');
  }
  const allowed = ORDER_STATUS_TRANSITIONS[order.status] ?? [];
  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `[Manual OMS] Invalid transition ${order.status} → ${nextStatus}`,
    );
  }
  const now = new Date().toISOString();
  const updated: Order = {
    ...order,
    status: nextStatus,
    updatedAt: now,
    timeline: [
      ...order.timeline,
      {
        id: `evt_${orderId}_${nextStatus}_${Date.now()}`,
        orderId,
        type: 'status_changed',
        previousStatus: order.status,
        newStatus: nextStatus,
        status: nextStatus,
        message: note || `Status updated to ${nextStatus}`,
        publicMessage: `Order status updated to ${nextStatus}.`,
        internalNote: note,
        updatedBy: actor,
        at: now,
      },
    ],
  };
  const saved = await saveOrder(updated);

  const triggerMap: Partial<
    Record<
      OrderStatus,
      'processing_started' | 'order_completed' | 'order_partial' | 'order_cancelled' | 'order_refunded'
    >
  > = {
    processing: 'processing_started',
    completed: 'order_completed',
    partial: 'order_partial',
    cancelled: 'order_cancelled',
    refunded: 'order_refunded',
  };
  const trigger = triggerMap[nextStatus];
  if (trigger) {
    try {
      await notifyOrderStatusChange(saved, trigger);
    } catch (error) {
      console.error('[manual-oms] notification failed', {
        orderId,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  return saved;
}

export const manualOrderWorkflow: ManualOrderWorkflow = {
  async createOrderFromPayment(input) {
    const checkout = input.checkout;
    if (!('totals' in checkout) || !('paymentMethodId' in checkout)) {
      throw new Error(
        '[Manual OMS] createOrderFromPayment requires a full PlaceOrderPayload.',
      );
    }
    const order = await placeOrder({
      customer: checkout.customer,
      paymentMethodId: checkout.paymentMethodId,
      items: checkout.items,
      totals: checkout.totals,
      coupon: checkout.coupon,
      termsAccepted: checkout.termsAccepted,
    });
    if (input.payment.status === 'paid') {
      order.payment = {
        provider: input.payment.provider,
        paymentId: input.payment.paymentId,
        status: 'paid',
        amount: order.total,
        paidAt: new Date().toISOString(),
      };
      return saveOrder(order);
    }
    return order;
  },
  async startProcessing(orderId, actor, note) {
    return transitionOrder(orderId, 'processing', actor, note);
  },
  async markCompleted(orderId, actor, note) {
    return transitionOrder(orderId, 'completed', actor, note);
  },
  async markPartial(orderId, actor, note) {
    return transitionOrder(orderId, 'partial', actor, note);
  },
  async cancelOrder(orderId, actor, note) {
    return transitionOrder(orderId, 'cancelled', actor, note);
  },
  async refundOrder(orderId, actor, note) {
    return transitionOrder(orderId, 'refunded', actor, note);
  },
  async addInternalNote(input) {
    const order = await requireOrder(input.orderId);
    const now = new Date().toISOString();
    const note: OrderInternalNote = {
      id: `note_${Date.now().toString(36)}`,
      body: input.body,
      createdBy: input.actor,
      createdAt: now,
    };
    await saveOrder({
      ...order,
      internalNotes: [...order.internalNotes, note],
      updatedAt: now,
    });
    return note;
  },
  async getReviewSummary(orderId) {
    const order = await requireOrder(orderId);
    const lines = (order.items ?? []).map((item) => ({
      serviceName: item.serviceName,
      packageTitle: item.packageTitle,
      quantityLabel: item.quantityLabel,
      lineQuantity: normalizeLineQuantity(item.lineQuantity),
      target: String(
        item.configuration?.username ??
          item.configuration?.targetUrl ??
          item.configuration?.url ??
          item.configuration?.profileUrl ??
          item.configuration?.videoUrl ??
          item.configuration?.channelUrl ??
          '',
      ),
    }));
    const first = order.items[0];
    return {
      orderId: order.id,
      guestEmail: order.guestEmail,
      platformId: first?.platformId ?? 'instagram',
      serviceName: formatMultiItemServiceSummary(order),
      packageTitle:
        lines.length > 1 ? `${lines.length} items` : (first?.packageTitle ?? 'Package'),
      quantity: first?.quantity ?? 0,
      target: lines[0]?.target ?? '',
      itemCount: lines.length,
      lines,
      paymentStatus: order.payment?.status,
      orderStatus: order.status,
      customerNotes: order.customerNotes,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  },
};

export const MANUAL_WORKFLOW_INTEGRATIONS: ManualWorkflowIntegrations = {
  checkout: 'PlaceOrderPayload / Cart → CreateOrderFromCheckoutInput',
  paymentGateway: 'CreatePaymentResult (paid) → createOrderFromPayment',
  orderStatusSystem: 'lib/orders/status.ts transitions + metadata',
  notifications: 'OrderNotificationHooks (lib/orders/notifications.ts)',
  orderTracking: 'Public order status + public timeline',
  adminPanel: 'ManualOrderWorkflow actions',
};

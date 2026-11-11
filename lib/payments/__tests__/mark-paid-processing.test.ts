/**
 * Paid payments on pending orders move to processing without a status-change email.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests, saveOrder } from '@/lib/orders/store';
import { markOrderPaymentStatus } from '@/lib/payments/mark-paid';
import {
  notifyOrderPaid,
  notifyOrderStatusChange,
} from '@/lib/notifications/order-hooks';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import type { Order } from '@/types/order';
import type { OrderStatus } from '@/types/order-status';
import type { PaymentStatus } from '@/types/payment';

vi.mock('@/lib/notifications/order-hooks', () => ({
  notifyOrderPaid: vi.fn(async () => {}),
  notifyOrderStatusChange: vi.fn(async () => {}),
}));

const prev = { ...process.env };

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.IV_ENV = 'test';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
  vi.mocked(notifyOrderPaid).mockClear();
  vi.mocked(notifyOrderStatusChange).mockClear();
});

afterEach(() => {
  Object.assign(process.env, prev);
  clearPersistenceSingletonForTests();
});

function cartItem() {
  return {
    id: 'cart_1',
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram' as const,
    packageTitle: '1000 Instagram Followers',
    quantity: 1000,
    quantityLabel: '1000',
    unitPrice: 13.99,
    currency: 'USD' as const,
    deliveryTime: 'Gradual',
    configuration: { username: 'demo_user' },
    addedAt: new Date().toISOString(),
  };
}

async function createPendingOrder(email: string): Promise<Order> {
  return placeOrder({
    customer: { email },
    paymentMethodId: 'stripe',
    termsAccepted: true,
    coupon: null,
    items: [cartItem()],
    idempotencyKey: `pay-${email}`,
  });
}

describe('markOrderPaymentStatus processing transition', () => {
  it('moves a pending order to processing with payment then status timeline events', async () => {
    const order = await createPendingOrder('paid-processing@example.com');
    expect(order.status).toBe('pending');

    const result = await markOrderPaymentStatus({
      paymentId: 'cs_paid_processing',
      status: 'paid',
      orderId: order.id,
      amountMinor: order.total.amount,
    });

    expect(result.applied).toBe(true);
    expect(result.duplicate).toBe(false);
    expect(result.order?.status).toBe('processing');
    expect(result.order?.payment?.status).toBe('paid');

    const timeline = result.order?.timeline ?? [];
    const confirmedIndex = timeline.findIndex((event) => event.type === 'payment_confirmed');
    const statusIndex = timeline.findIndex((event) => event.type === 'status_changed');
    expect(confirmedIndex).toBeGreaterThanOrEqual(0);
    expect(statusIndex).toBe(confirmedIndex + 1);

    const statusEvent = timeline[statusIndex];
    expect(statusEvent?.previousStatus).toBe('pending');
    expect(statusEvent?.newStatus).toBe('processing');
    expect(statusEvent?.updatedBy).toEqual({ type: 'system', id: 'payments' });

    expect(notifyOrderPaid).toHaveBeenCalledTimes(1);
    expect(notifyOrderPaid).toHaveBeenCalledWith(
      expect.objectContaining({ id: order.id, status: 'processing' }),
    );
    expect(notifyOrderStatusChange).not.toHaveBeenCalled();
  });

  it.each(['completed', 'cancelled'] as const)(
    'keeps an already %s order in that status when payment becomes paid',
    async (status: OrderStatus) => {
      const order = await createPendingOrder(`${status}-paid@example.com`);
      await saveOrder({ ...order, status });

      const result = await markOrderPaymentStatus({
        paymentId: `cs_${status}_paid`,
        status: 'paid',
        orderId: order.id,
        amountMinor: order.total.amount,
      });

      expect(result.applied).toBe(true);
      expect(result.order?.status).toBe(status);
      expect(result.order?.payment?.status).toBe('paid');
      expect(
        result.order?.timeline.some(
          (event) =>
            event.type === 'status_changed' && event.newStatus === 'processing',
        ),
      ).toBe(false);
      expect(notifyOrderPaid).toHaveBeenCalledTimes(1);
      expect(notifyOrderStatusChange).not.toHaveBeenCalled();
    },
  );

  it('returns duplicate and does not notify when the payment is already paid', async () => {
    const order = await createPendingOrder('dup-paid@example.com');
    const first = await markOrderPaymentStatus({
      paymentId: 'cs_dup_paid',
      status: 'paid',
      orderId: order.id,
      amountMinor: order.total.amount,
    });
    expect(first.order?.status).toBe('processing');
    vi.mocked(notifyOrderPaid).mockClear();
    vi.mocked(notifyOrderStatusChange).mockClear();

    const second = await markOrderPaymentStatus({
      paymentId: 'cs_dup_paid',
      status: 'paid',
      orderId: order.id,
      amountMinor: order.total.amount,
    });

    expect(second.duplicate).toBe(true);
    expect(second.applied).toBe(false);
    expect(second.order?.status).toBe('processing');
    expect((await getOrderById(order.id))?.status).toBe('processing');
    expect(notifyOrderPaid).not.toHaveBeenCalled();
    expect(notifyOrderStatusChange).not.toHaveBeenCalled();
  });

  it.each(['failed', 'pending'] as const)(
    'leaves the order pending when payment status is %s',
    async (status: PaymentStatus) => {
      const order = await createPendingOrder(`${status}-payment@example.com`);
      const result = await markOrderPaymentStatus({
        paymentId: `cs_${status}_payment`,
        status,
        orderId: order.id,
      });

      expect(result.applied).toBe(true);
      expect(result.duplicate).toBe(false);
      expect(result.order?.status).toBe('pending');
      expect(result.order?.payment?.status).toBe(status);
      expect(notifyOrderPaid).not.toHaveBeenCalled();
      expect(notifyOrderStatusChange).not.toHaveBeenCalled();
    },
  );
});

/**
 * Checkout orchestration — validate → persist pending order → remote payment redirect.
 */

import { allowMockPayments, isProductionRuntime } from '@/lib/config/env';
import { getCheckoutUrl, getSiteUrlPath } from '@/lib/config/hosts';
import { notifyOrderPaid, notifyOrderPlaced } from '@/lib/notifications/order-hooks';
import { placeOrder, type PlaceOrderInput } from '@/lib/orders/create';
import { getPersistence } from '@/lib/persistence';
import { saveOrder } from '@/lib/orders/store';
import { paymentGatewayManager } from '@/lib/payments/manager';
import { isRemotePaymentConfigured } from '@/lib/settings/site-settings';
import type { Order } from '@/types/order';
import type { PaymentProviderId } from '@/types/payment';

export type PlaceOrderResult = {
  ok: true;
  orderId: string;
  email: string;
  status: Order['status'];
  paymentStatus: string;
  redirectUrl?: string;
  paymentConfigured: boolean;
  mode: 'remote-payment' | 'mock' | 'disabled';
  message?: string;
};

export type PlaceOrderFailure = {
  ok: false;
  error: string;
  code?: 'payments_disabled' | 'validation' | 'provider_error';
};

export async function executeCheckout(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult | PlaceOrderFailure> {
  try {
    if (input.paymentMethodId !== 'remote-payment') {
      return {
        ok: false,
        error: 'Only remote card payment is supported at this time.',
        code: 'validation',
      };
    }

    const remoteReady = await isRemotePaymentConfigured();
    const mockOk = allowMockPayments();

    if (!remoteReady && !mockOk) {
      return {
        ok: false,
        error: isProductionRuntime()
          ? 'Payments are not configured. Set the payment website URL in Admin → Settings.'
          : 'Remote payment URL is not set. Configure Admin → Settings, or IV_PAYMENTS_MODE=mock for local testing.',
        code: 'payments_disabled',
      };
    }

    const order = await placeOrder(input);

    if (input.marketingOptIn || input.customer.marketingOptIn) {
      try {
        await getPersistence().upsertMarketingSubscriber({
          email: order.guestEmail,
          source: 'checkout',
          marketingOptIn: true,
        });
      } catch (error) {
        console.error('[checkout] marketing opt-in save failed', {
          orderId: order.id,
          message: error instanceof Error ? error.message : 'unknown',
        });
      }
    }

    try {
      await notifyOrderPlaced(order);
    } catch (error) {
      console.error('[checkout] order-placed notification failed', {
        orderId: order.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }

    const successUrl = getSiteUrlPath(
      `/order-success?orderId=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.guestEmail)}`,
    );
    const cancelUrl = `${getCheckoutUrl('/')}?cancelled=1&orderId=${encodeURIComponent(order.id)}`;

    if (remoteReady) {
      const totals = input.totals ?? {
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      };
      const payment = await paymentGatewayManager.createPayment('remote-payment', {
        orderId: order.id,
        amount: order.total,
        customerEmail: order.guestEmail,
        description: `NovaLikes order ${order.id}`,
        metadata: { orderId: order.id },
        successUrl,
        cancelUrl,
        payload: {
          customer: input.customer,
          paymentMethodId: input.paymentMethodId,
          items: input.items,
          totals,
          coupon: input.coupon,
          termsAccepted: input.termsAccepted,
        },
      });

      const updated: Order = {
        ...order,
        payment: {
          provider: 'remote-payment' as PaymentProviderId,
          paymentId: payment.paymentId,
          status: payment.status,
          amount: order.total,
        },
        updatedAt: new Date().toISOString(),
      };
      await saveOrder(updated);

      return {
        ok: true,
        orderId: updated.id,
        email: updated.guestEmail,
        status: updated.status,
        paymentStatus: updated.payment?.status ?? 'pending',
        redirectUrl: payment.redirectUrl,
        paymentConfigured: true,
        mode: 'remote-payment',
      };
    }

    // Dev mock: mark paid immediately so fulfilment queue can be exercised locally.
    const now = new Date().toISOString();
    const mockPaid: Order = {
      ...order,
      payment: {
        provider: 'remote-payment',
        paymentId: `mock_${order.id}`,
        status: 'paid',
        amount: order.total,
        paidAt: now,
      },
      timeline: [
        ...order.timeline,
        {
          id: `evt_${order.id}_mock_paid`,
          orderId: order.id,
          type: 'payment_confirmed',
          message: 'Mock payment confirmed (IV_PAYMENTS_MODE=mock).',
          publicMessage: 'Payment confirmed.',
          updatedBy: { type: 'system', id: 'mock-payments' },
          at: now,
        },
      ],
      updatedAt: now,
    };
    await saveOrder(mockPaid);

    try {
      await notifyOrderPaid(mockPaid);
    } catch (error) {
      console.error('[checkout] mock paid notification failed', {
        orderId: mockPaid.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }

    return {
      ok: true,
      orderId: mockPaid.id,
      email: mockPaid.guestEmail,
      status: mockPaid.status,
      paymentStatus: 'paid',
      redirectUrl: `${successUrl}&verified=1`,
      paymentConfigured: false,
      mode: 'mock',
      message: 'Mock payment accepted for local development only.',
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unable to place order.',
      code: 'provider_error',
    };
  }
}

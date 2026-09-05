/**
 * Short sequential public order numbers + Mollie Remote compatibility.
 */

import { createHmac } from 'node:crypto';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST as remotePaymentWebhook } from '@/app/api/webhooks/remote-payment/route';
import { getEnabledPaymentProviders } from '@/config/payments';
import { getAdminOrderById, getAdminOrderRows } from '@/lib/admin/orders';
import { recordServerAnalyticsEvent } from '@/lib/analytics/native/server-events';
import {
  captureCartRecoverySession,
  linkOrderToCartRecovery,
  markCartRecoveryConverted,
  resetCartRecoverySettingsMemoryForTests,
  resetCartRecoveryStoreForTests,
} from '@/lib/cart-recovery';
import { getCartRecoverySessionByPublicId } from '@/lib/cart-recovery/store';
import { placeOrder } from '@/lib/orders/create';
import {
  formatOrderNumber,
  getCustomerOrderId,
  parsePublicOrderNumber,
  toMollieOrderId,
} from '@/lib/orders/public-number';
import {
  getOrderById,
  resetOrderStoreForTests,
  resolveOrderByCustomerRef,
  saveOrder,
} from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  getPersistence,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { buildMollieCreateBody } from '@/lib/payments/mollie-remote-protocol';
import { setRemotePaymentSharedSecret } from '@/lib/settings/site-settings';
import { lookupTrackedOrder } from '@/lib/tracking/lookup';
import type { Order } from '@/types/order';

const SECRET = 'test-mollie-shared-secret-32';

function cartItem(suffix = '1') {
  return {
    id: `cart_${suffix}`,
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram' as const,
    packageTitle: '1,000 Followers',
    quantity: 1000,
    quantityLabel: '1,000',
    unitPrice: 1,
    currency: 'USD' as const,
    deliveryTime: 'Gradual',
    configuration: { username: 'demo_user' },
    addedAt: new Date().toISOString(),
  };
}

async function createOrder(email: string, key?: string) {
  return placeOrder({
    customer: { email },
    paymentMethodId: 'remote-payment',
    items: [cartItem(email)],
    coupon: null,
    termsAccepted: true,
    idempotencyKey: key ?? `pub-${email}-${Date.now()}-${Math.random()}`,
  });
}

function signedWebhook(input: {
  orderId: string;
  txnId: string;
  price: string;
  currency: string;
  callbackTs?: number;
  testmode?: string;
  signature?: string;
}) {
  const callbackTs = input.callbackTs ?? Math.floor(Date.now() / 1000);
  const signature =
    input.signature ??
    createHmac('sha256', SECRET)
      .update(
        [input.orderId, input.txnId, input.price, input.currency, String(callbackTs)].join('|'),
      )
      .digest('hex');
  const params = new URLSearchParams({
    order_id: input.orderId,
    txn_id: input.txnId,
    price: input.price,
    currency_code: input.currency,
    payment_status: 'paid',
    callback_ts: String(callbackTs),
    signature,
  });
  if (input.testmode !== undefined) params.set('testmode', input.testmode);
  return params;
}

async function postWebhook(body: URLSearchParams) {
  return remotePaymentWebhook(
    new Request('http://localhost/api/webhooks/remote-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }),
  );
}

beforeEach(async () => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.REMOTE_PAYMENT_SHARED_SECRET = SECRET;
  process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
  process.env.CART_RECOVERY_TOKEN_PEPPER = 'test-cart-recovery-pepper';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
  resetCartRecoveryStoreForTests();
  resetCartRecoverySettingsMemoryForTests();
  await setRemotePaymentSharedSecret(SECRET);
});

afterEach(() => {
  vi.unstubAllEnvs();
  clearPersistenceSingletonForTests();
});

describe('public order number formatting', () => {
  it('E: formats 1001 → 01001 and grows past 5 digits', () => {
    expect(formatOrderNumber(1001)).toBe('01001');
    expect(formatOrderNumber(1002)).toBe('01002');
    expect(formatOrderNumber(9999)).toBe('09999');
    expect(formatOrderNumber(10000)).toBe('10000');
    expect(toMollieOrderId(1001)).toBe('1001');
    expect(parsePublicOrderNumber('01001')).toBe(1001);
    expect(parsePublicOrderNumber('1001')).toBe(1001);
  });
});

describe('sequential public order numbers', () => {
  it('A/B/C: first orders are 01001 then 01002', async () => {
    const a = await createOrder('a@example.com');
    const b = await createOrder('b@example.com');
    expect(a.publicNumber).toBe(1001);
    expect(b.publicNumber).toBe(1002);
    expect(getCustomerOrderId(a)).toBe('01001');
    expect(getCustomerOrderId(b)).toBe('01002');
    expect(a.id.startsWith('IV-')).toBe(true);
    expect(a.id).not.toBe(getCustomerOrderId(a));
  });

  it('D: concurrent creates never duplicate public numbers', async () => {
    const created = await Promise.all(
      Array.from({ length: 20 }, (_, i) => createOrder(`c${i}@example.com`)),
    );
    const numbers = created.map((o) => o.publicNumber as number);
    expect(new Set(numbers).size).toBe(20);
    expect(Math.min(...numbers)).toBe(1001);
    expect(Math.max(...numbers)).toBe(1020);
  });

  it('F: Track Order finds 01001 and legacy IV- ids', async () => {
    const order = await createOrder('track@example.com');
    const byPublic = await lookupTrackedOrder(
      { orderId: '01001', email: 'track@example.com' },
      (id) => resolveOrderByCustomerRef(id),
    );
    expect(byPublic.ok).toBe(true);
    if (byPublic.ok) expect(byPublic.order.orderId).toBe('01001');

    const byLegacy = await lookupTrackedOrder(
      { orderId: order.id, email: 'track@example.com' },
      (id) => resolveOrderByCustomerRef(id),
    );
    expect(byLegacy.ok).toBe(true);
  });

  it('G: confirmation surfaces use public order id 01001', async () => {
    const order = await createOrder('email@example.com');
    expect(getCustomerOrderId(order)).toBe('01001');
  });

  it('H: Admin shows 01001 as primary public order id', async () => {
    const order = await createOrder('admin@example.com');
    const rows = await getAdminOrderRows();
    const row = rows.find((r) => r.id === order.id);
    expect(row?.publicOrderId).toBe('01001');
    const details = await getAdminOrderById(order.id);
    expect(details?.publicOrderId).toBe('01001');
  });

  it('I: success/customer ref resolves 01001', async () => {
    const order = await createOrder('success@example.com');
    expect(getCustomerOrderId(order)).toBe('01001');
    expect(await resolveOrderByCustomerRef('01001')).toMatchObject({ id: order.id });
  });

  it('J: Mollie create body sends digits-only unpadded order_id', () => {
    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success?orderId=01001',
      cancelUrl: 'https://novalikes.com/checkout',
      orderId: toMollieOrderId(1001),
      amountMajor: '13.99',
      currency: 'USD',
      productName: 'Cubes',
      items: [{ product_id: 'ig-f-1000', name: 'Followers', qty: 1, line_total: '13.99' }],
      cardToken: 'tkn_testtoken123',
      sharedSecret: SECRET,
      requestTs: 1_700_000_000,
      requestNonce: 'abc123nonce00',
    });
    expect(body.order_id).toBe('1001');
    expect(body.order_id).not.toMatch(/IV-/);
    expect(body.order_id).not.toMatch(/^0/);
  });

  it('K/L/M: signed webhook resolves public number; unknown + unsigned rejected', async () => {
    const order = await createOrder('pay@example.com');
    const price = (order.total.amount / 100).toFixed(2);
    const mollieId = toMollieOrderId(order.publicNumber!);

    const ok = await postWebhook(
      signedWebhook({
        orderId: mollieId,
        txnId: 'tr_ok_1',
        price,
        currency: order.total.currency,
      }),
    );
    expect(ok.status).toBe(200);
    expect((await getOrderById(order.id))?.payment?.status).toBe('paid');

    const unknown = await postWebhook(
      signedWebhook({
        orderId: '99999',
        txnId: 'tr_unknown',
        price,
        currency: order.total.currency,
      }),
    );
    expect(unknown.status).toBe(404);

    const unsigned = await postWebhook(
      signedWebhook({
        orderId: mollieId,
        txnId: 'tr_bad_sig',
        price,
        currency: order.total.currency,
        signature: '0'.repeat(64),
      }),
    );
    expect(unsigned.status).toBe(403);
  });

  it('N: production testmode still rejected', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const order = await createOrder('tm@example.com');
    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhook({
        orderId: toMollieOrderId(order.publicNumber!),
        txnId: 'tr_tm',
        price,
        currency: order.total.currency,
        testmode: 'true',
      }),
    );
    expect(response.status).toBe(409);
    expect((await getOrderById(order.id))?.payment?.status).not.toBe('paid');
  });

  it('O: Stripe remains paused', () => {
    expect(getEnabledPaymentProviders().some((p) => p.id === 'stripe')).toBe(false);
  });

  it('P: historical IV-only orders remain resolvable', async () => {
    const historical: Order = {
      id: 'IV-OLDHIST-0001',
      guestEmail: 'legacy@example.com',
      status: 'pending',
      fulfillmentMode: 'manual',
      currency: 'USD',
      items: [
        {
          id: 'oli_1',
          platformId: 'instagram',
          serviceId: 'instagram-followers',
          serviceSlug: 'buy-instagram-followers',
          serviceName: 'Instagram Followers',
          packageId: 'ig-f-1000',
          packageTitle: '1,000 Followers',
          quantity: 1000,
          quantityLabel: '1,000',
          unitPrice: 1399,
          currency: 'USD',
          configuration: { username: 'old' },
        },
      ],
      subtotal: { amount: 1399, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 1399, currency: 'USD' },
      payment: {
        provider: 'remote-payment',
        paymentId: 'pending_legacy',
        status: 'pending',
        amount: { amount: 1399, currency: 'USD' },
      },
      timeline: [],
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveOrder({
      ...historical,
      allowNullPublicNumber: true,
    } as Order & { allowNullPublicNumber?: boolean });

    expect(await resolveOrderByCustomerRef('IV-OLDHIST-0001')).toMatchObject({
      id: 'IV-OLDHIST-0001',
    });
    expect(getCustomerOrderId(historical)).toBe('IV-OLDHIST-0001');
  });

  it('Q: cart recovery still links/converts once on internal id', async () => {
    const email = 'recovery@example.com';
    const captured = await captureCartRecoverySession({
      email,
      items: [cartItem('r')],
      coupon: null,
      currency: 'USD',
      subtotalAmount: 1399,
      discountAmount: 0,
      totalAmount: 1399,
    });
    expect(captured.ok).toBe(true);
    if (!captured.ok) return;
    const order = await createOrder(email);
    await linkOrderToCartRecovery({
      orderId: order.id,
      email,
      recoveryPublicId: captured.publicId,
    });
    const first = await markCartRecoveryConverted({ orderId: order.id, email });
    const second = await markCartRecoveryConverted({ orderId: order.id, email });
    expect(first.converted).toBe(true);
    expect(second.converted).toBe(false);
    const session = await getCartRecoverySessionByPublicId(captured.publicId);
    expect(session?.orderId).toBe(order.id);
    expect(session?.status).toBe('converted');
  });

  it('R: paid analytics events remain once per internal order id', async () => {
    const order = await createOrder('analytics@example.com');
    const eventId = `analytics:payment_paid:${order.id}`;
    const first = await recordServerAnalyticsEvent({
      id: eventId,
      eventName: 'payment_paid',
      pagePath: '/order-success',
      properties: { orderId: order.id, amountMinor: order.total.amount, currency: 'USD' },
    });
    const second = await recordServerAnalyticsEvent({
      id: eventId,
      eventName: 'payment_paid',
      pagePath: '/order-success',
      properties: { orderId: order.id, amountMinor: order.total.amount, currency: 'USD' },
    });
    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(await getPersistence().hasAnalyticsEventId?.(eventId)).toBe(true);
  });
});

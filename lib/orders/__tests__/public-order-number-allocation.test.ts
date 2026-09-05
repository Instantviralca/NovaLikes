/**
 * Production public_number allocation + NULL-order repair on idempotent retry.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getEnabledPaymentProviders } from '@/config/payments';
import { placeOrder } from '@/lib/orders/create';
import {
  formatOrderNumber,
  getCustomerOrderId,
  toMollieOrderId,
} from '@/lib/orders/public-number';
import { parseSequenceNextvalResult } from '@/lib/orders/sequence-nextval';
import {
  ensurePublicOrderNumber,
  getOrderById,
  resetOrderStoreForTests,
  saveOrder,
} from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  getPersistence,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { buildMollieCreateBody } from '@/lib/payments/mollie-remote-protocol';
import type { Order } from '@/types/order';

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
    idempotencyKey: key ?? `alloc-${email}-${Date.now()}-${Math.random()}`,
  });
}

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
});

afterEach(() => {
  clearPersistenceSingletonForTests();
});

describe('public order number allocation (production fix)', () => {
  it('1-5: fresh order allocates, persists, returns publicNumber, display + Mollie', async () => {
    const order = await createOrder('fresh@example.com');
    expect(order.publicNumber).toBe(1001);
    expect((await getOrderById(order.id))?.publicNumber).toBe(1001);
    expect(getCustomerOrderId(order)).toBe('01001');
    expect(formatOrderNumber(order.publicNumber!)).toBe('01001');
    expect(toMollieOrderId(order.publicNumber!)).toBe('1001');

    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success?orderId=01001',
      cancelUrl: 'https://novalikes.com/checkout',
      orderId: toMollieOrderId(order.publicNumber!),
      amountMajor: '13.99',
      currency: 'USD',
      productName: 'Cubes',
      items: [{ product_id: 'ig', name: 'Followers', qty: 1, line_total: '13.99' }],
      cardToken: 'tkn_testtoken123',
      sharedSecret: 'test-mollie-shared-secret-32',
      requestTs: 1_700_000_000,
      requestNonce: 'nonce12345678',
    });
    expect(body.order_id).toBe('1001');
  });

  it('6: second distinct order gets 01002', async () => {
    await createOrder('a@example.com');
    const b = await createOrder('b@example.com');
    expect(getCustomerOrderId(b)).toBe('01002');
  });

  it('7: idempotent retry returns same order/public number', async () => {
    const key = 'idem-same-checkout-key';
    const first = await createOrder('retry@example.com', key);
    const second = await createOrder('retry@example.com', key);
    expect(second.id).toBe(first.id);
    expect(second.publicNumber).toBe(first.publicNumber);
    expect(second.publicNumber).toBe(1001);
  });

  it('8: existing idempotent NULL-public-number order is repaired once', async () => {
    const key = 'repair-null-public';
    await saveOrder({
      id: 'IV-NULL-REPAIR-1',
      publicNumber: null,
      guestEmail: 'broken@example.com',
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
          configuration: { username: 'x' },
        },
      ],
      subtotal: { amount: 1399, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 1399, currency: 'USD' },
      payment: {
        provider: 'remote-payment',
        paymentId: 'pending_broken',
        status: 'pending',
        amount: { amount: 1399, currency: 'USD' },
      },
      timeline: [],
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      idempotencyKey: key,
      allowNullPublicNumber: true,
    } as Order & { idempotencyKey: string; allowNullPublicNumber: boolean });

    expect((await getOrderById('IV-NULL-REPAIR-1'))?.publicNumber ?? null).toBeNull();

    const repaired = await createOrder('broken@example.com', key);
    expect(repaired.id).toBe('IV-NULL-REPAIR-1');
    expect(repaired.publicNumber).toBe(1001);
    expect(getCustomerOrderId(repaired)).toBe('01001');

    const again = await createOrder('broken@example.com', key);
    expect(again.id).toBe(repaired.id);
    expect(again.publicNumber).toBe(1001);
  });

  it('8b: repair of pre-sequence NULL order gets 1001 when counter still at start', async () => {
    const key = 'pre-seq-null';
    // Insert historical-style NULL row without consuming sequence.
    const orphan: Order = {
      id: 'IV-MTOJP6Z3-U5OI',
      publicNumber: null,
      guestEmail: 'orphan@example.com',
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
          configuration: { username: 'x' },
        },
      ],
      subtotal: { amount: 1399, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 1399, currency: 'USD' },
      payment: {
        provider: 'remote-payment',
        paymentId: 'pending_orphan',
        status: 'pending',
        amount: { amount: 1399, currency: 'USD' },
      },
      timeline: [],
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveOrder({
      ...orphan,
      idempotencyKey: key,
      allowNullPublicNumber: true,
    } as Order & { idempotencyKey: string; allowNullPublicNumber: boolean });

    const repaired = await placeOrder({
      customer: { email: 'orphan@example.com' },
      paymentMethodId: 'remote-payment',
      items: [cartItem('orphan')],
      coupon: null,
      termsAccepted: true,
      idempotencyKey: key,
    });

    expect(repaired.id).toBe('IV-MTOJP6Z3-U5OI');
    expect(repaired.publicNumber).toBe(1001);
    expect(getCustomerOrderId(repaired)).toBe('01001');
    expect(toMollieOrderId(repaired.publicNumber!)).toBe('1001');
  });

  it('9: concurrent repair cannot assign two public numbers to the same order', async () => {
    const orphan: Order = {
      id: 'IV-CONCURRENT-NULL',
      publicNumber: null,
      guestEmail: 'conc@example.com',
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
          configuration: {},
        },
      ],
      subtotal: { amount: 1399, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 1399, currency: 'USD' },
      payment: {
        provider: 'remote-payment',
        paymentId: 'pending_c',
        status: 'pending',
        amount: { amount: 1399, currency: 'USD' },
      },
      timeline: [],
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveOrder({
      ...orphan,
      allowNullPublicNumber: true,
    } as Order & { allowNullPublicNumber: boolean });

    const results = await Promise.all([
      ensurePublicOrderNumber(orphan.id),
      ensurePublicOrderNumber(orphan.id),
      ensurePublicOrderNumber(orphan.id),
    ]);
    const numbers = results.map((o) => o.publicNumber);
    expect(new Set(numbers).size).toBe(1);
    expect(numbers[0]).toBe(1001);
  });

  it('10: historical NULL orders remain supported for lookup/display fallback', async () => {
    const historical: Order = {
      id: 'IV-OLDHIST-NULL',
      publicNumber: null,
      guestEmail: 'legacy@example.com',
      status: 'pending',
      fulfillmentMode: 'manual',
      currency: 'USD',
      items: [],
      subtotal: { amount: 0, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 0, currency: 'USD' },
      timeline: [],
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveOrder({
      ...historical,
      allowNullPublicNumber: true,
    } as Order & { allowNullPublicNumber: boolean });
    expect(getCustomerOrderId(historical)).toBe('IV-OLDHIST-NULL');
    expect(await getOrderById('IV-OLDHIST-NULL')).toMatchObject({ id: 'IV-OLDHIST-NULL' });
  });

  it('11: mapper public_number → publicNumber works via persisted round-trip', async () => {
    const order = await createOrder('map@example.com');
    const loaded = await getOrderById(order.id);
    expect(loaded?.publicNumber).toBe(1001);
  });

  it('12: new order cannot persist NULL public_number', async () => {
    await expect(
      saveOrder({
        id: 'IV-SHOULD-FAIL',
        guestEmail: 'fail@example.com',
        status: 'pending',
        fulfillmentMode: 'manual',
        currency: 'USD',
        items: [],
        subtotal: { amount: 0, currency: 'USD' },
        discount: { amount: 0, currency: 'USD' },
        total: { amount: 0, currency: 'USD' },
        timeline: [],
        internalNotes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    ).rejects.toThrow(/public_number/);
  });

  it('13-14: Mollie HMAC path unchanged shape; Stripe remains paused', () => {
    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success',
      cancelUrl: 'https://novalikes.com/checkout',
      orderId: '1001',
      amountMajor: '13.99',
      currency: 'USD',
      productName: 'Cubes',
      items: [{ product_id: 'ig', name: 'Followers', qty: 1, line_total: '13.99' }],
      cardToken: 'tkn_testtoken123',
      sharedSecret: 'test-mollie-shared-secret-32',
      requestTs: 1_700_000_000,
      requestNonce: 'nonce12345678',
    });
    expect(body.signature).toMatch(/^[a-f0-9]{64}$/);
    expect(body.order_id).toBe('1001');
    expect(getEnabledPaymentProviders().some((p) => p.id === 'stripe')).toBe(false);
  });

  it('15: analytics/cart recovery interfaces still present on persistence', () => {
    const p = getPersistence();
    expect(typeof p.saveOrder).toBe('function');
    expect(typeof p.allocatePublicOrderNumber).toBe('function');
    expect(typeof p.ensurePublicOrderNumber).toBe('function');
  });
});

describe('parseSequenceNextvalResult', () => {
  it('parses array / rows / bigint / string shapes', () => {
    expect(parseSequenceNextvalResult([{ n: 1001 }])).toBe(1001);
    expect(parseSequenceNextvalResult([{ n: '1001' }])).toBe(1001);
    expect(parseSequenceNextvalResult([{ n: BigInt(1001) }])).toBe(1001);
    expect(parseSequenceNextvalResult({ rows: [{ n: 1002 }] })).toBe(1002);
    expect(() => parseSequenceNextvalResult([])).toThrow(/empty/);
  });
});

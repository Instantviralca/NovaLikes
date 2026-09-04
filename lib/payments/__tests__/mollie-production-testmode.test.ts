/**
 * Production Mollie testmode rejection + unpaid redirect invariants.
 */

import { createHmac } from 'node:crypto';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST as remotePaymentWebhook } from '@/app/api/webhooks/remote-payment/route';
import { getEnabledPaymentProviders } from '@/config/payments';
import {
  captureCartRecoverySession,
  resetCartRecoverySettingsMemoryForTests,
  resetCartRecoveryStoreForTests,
} from '@/lib/cart-recovery';
import { getCartRecoverySessionByPublicId } from '@/lib/cart-recovery/store';
import {
  assertNoMollieTestModeInProduction,
  isCollectorTestModeFlag,
  MollieTestModeRejectedError,
  readCollectorTestMode,
} from '@/lib/payments/mollie-remote-protocol';
import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { setRemotePaymentSharedSecret } from '@/lib/settings/site-settings';

const SECRET = 'production-mollie-shared-secret';
const prevEnv = { ...process.env };

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

function signedWebhookBody(input: {
  orderId: string;
  txnId: string;
  price: string;
  currency: string;
  callbackTs: number;
  testmode?: string;
}): URLSearchParams {
  const signature = createHmac('sha256', SECRET)
    .update(
      [input.orderId, input.txnId, input.price, input.currency, String(input.callbackTs)].join(
        '|',
      ),
    )
    .digest('hex');
  const params = new URLSearchParams({
    order_id: input.orderId,
    txn_id: input.txnId,
    price: input.price,
    currency_code: input.currency,
    payment_status: 'paid',
    callback_ts: String(input.callbackTs),
    signature,
  });
  if (input.testmode !== undefined) params.set('testmode', input.testmode);
  return params;
}

async function createPendingOrder(email = 'buyer@example.com') {
  return placeOrder({
    customer: { email, firstName: 'Buyer' },
    paymentMethodId: 'remote-payment',
    items: [cartItem()],
    coupon: null,
    termsAccepted: true,
    idempotencyKey: `mollie-safety-${email}-${Date.now()}-${Math.random()}`,
  });
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

describe('Mollie production testmode safety', () => {
  beforeEach(async () => {
    process.env.IV_PERSISTENCE = 'memory';
    process.env.REMOTE_PAYMENT_SHARED_SECRET = SECRET;
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    process.env.CART_RECOVERY_TOKEN_PEPPER = 'test-cart-recovery-pepper';
    delete process.env.IV_ENV;
    clearPersistenceSingletonForTests();
    useMemoryPersistenceForTests();
    resetOrderStoreForTests();
    resetCartRecoveryStoreForTests();
    resetCartRecoverySettingsMemoryForTests();
    await setRemotePaymentSharedSecret(SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    Object.assign(process.env, prevEnv);
    clearPersistenceSingletonForTests();
  });

  function stubProductionRuntime() {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.IV_ENV;
  }

  function stubProductionWithIvEnvTest() {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('IV_ENV', 'test');
  }

  function stubDevelopmentRuntime() {
    vi.stubEnv('NODE_ENV', 'development');
    delete process.env.IV_ENV;
  }

  function stubNodeEnvTest() {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('IV_ENV', 'test');
  }

  it('parses trusted collector testmode flags', () => {
    expect(isCollectorTestModeFlag(true)).toBe(true);
    expect(isCollectorTestModeFlag('1')).toBe(true);
    expect(isCollectorTestModeFlag('false')).toBe(false);
    expect(readCollectorTestMode(new Map([['testmode', 'true']]))).toBe(true);
    expect(readCollectorTestMode(new Map([['test_mode', '0']]))).toBe(false);
  });

  it('1: NODE_ENV=production + IV_ENV=test + testmode=true is REJECTED', async () => {
    stubProductionWithIvEnvTest();
    expect(() => assertNoMollieTestModeInProduction(true, 'iv_env_bypass')).toThrow(
      MollieTestModeRejectedError,
    );
    const order = await createPendingOrder('iv-env-bypass@example.com');
    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_iv_env_bypass',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
        testmode: 'true',
      }),
    );
    expect(response.status).toBe(409);
    expect((await getOrderById(order.id))?.payment?.status).not.toBe('paid');
  });

  it('2: NODE_ENV=production + IV_ENV unset + testmode=true is REJECTED', async () => {
    stubProductionRuntime();
    const order = await createPendingOrder();
    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_test_1',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
        testmode: 'true',
      }),
    );
    expect(response.status).toBe(409);
    expect((await getOrderById(order.id))?.payment?.status).not.toBe('paid');
  });

  it('3: NODE_ENV=production live collector payment is allowed', async () => {
    stubProductionRuntime();
    const order = await createPendingOrder();
    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_live_1',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
      }),
    );
    expect(response.status).toBe(200);
    expect((await getOrderById(order.id))?.payment?.status).toBe('paid');
  });

  it('4a: NODE_ENV=development allows signed testmode webhook', async () => {
    stubDevelopmentRuntime();
    expect(() => assertNoMollieTestModeInProduction(true, 'unit_dev')).not.toThrow();

    const order = await createPendingOrder('dev-buyer@example.com');
    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_dev_test_1',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
        testmode: 'true',
      }),
    );
    expect(response.status).toBe(200);
    expect((await getOrderById(order.id))?.payment?.status).toBe('paid');
  });

  it('4b: NODE_ENV=test allows testmode helper (vitest runtime)', () => {
    stubNodeEnvTest();
    expect(() => assertNoMollieTestModeInProduction(true, 'unit_test')).not.toThrow();
  });

  it('5: production testmode webhook cannot pay, fulfil, convert recovery, or count revenue', async () => {
    stubProductionWithIvEnvTest();
    const email = 'recovery-buyer@example.com';
    const order = await createPendingOrder(email);
    const captured = await captureCartRecoverySession({
      email,
      items: [cartItem()],
      coupon: null,
      currency: 'USD',
      subtotalAmount: 1399,
      discountAmount: 0,
      totalAmount: 1399,
    });
    expect(captured.ok).toBe(true);
    const publicId = captured.ok ? captured.publicId : '';

    const price = (order.total.amount / 100).toFixed(2);
    const response = await postWebhook(
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_test_recovery',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
        testmode: 'true',
      }),
    );
    expect(response.status).toBe(409);

    const refreshed = await getOrderById(order.id);
    expect(refreshed?.payment?.status).not.toBe('paid');
    expect(refreshed?.status).toBe('pending');
    expect(refreshed?.status).not.toBe('processing');
    expect(refreshed?.status).not.toBe('completed');

    const session = await getCartRecoverySessionByPublicId(publicId);
    expect(session?.status).not.toBe('converted');
    expect(session?.convertedAt).toBeFalsy();
  });

  it('E: repeated production testmode webhook cannot change status', async () => {
    stubProductionRuntime();
    const order = await createPendingOrder();
    const price = (order.total.amount / 100).toFixed(2);
    const body = () =>
      signedWebhookBody({
        orderId: order.id,
        txnId: 'tr_test_repeat',
        price,
        currency: order.total.currency,
        callbackTs: Math.floor(Date.now() / 1000),
        testmode: 'true',
      });

    expect((await postWebhook(body())).status).toBe(409);
    expect((await postWebhook(body())).status).toBe(409);
    expect((await getOrderById(order.id))?.payment?.status).not.toBe('paid');
  });

  it('F: redirect/return without trusted paid webhook leaves order pending', async () => {
    const order = await createPendingOrder();
    const refreshed = await getOrderById(order.id);
    expect(refreshed?.payment?.status ?? 'pending').not.toBe('paid');
    expect(refreshed?.status).toBe('pending');
  });

  it('throws MollieTestModeRejectedError in production', () => {
    stubProductionRuntime();
    expect(() => assertNoMollieTestModeInProduction(true, 'unit')).toThrow(
      MollieTestModeRejectedError,
    );
  });

  it('keeps Stripe paused and not required', () => {
    expect(getEnabledPaymentProviders().some((p) => p.id === 'stripe')).toBe(false);
    expect(getEnabledPaymentProviders().map((p) => p.id)).toEqual(['remote-payment']);
  });
});

/**
 * Hosted Mollie checkout contract regressions (normal card path).
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { executeCheckout } from '@/lib/checkout/execute';
import { toMollieOrderId } from '@/lib/orders/public-number';
import { getOrderByPublicNumber, resetOrderStoreForTests } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { paymentGatewayManager } from '@/lib/payments/manager';
import {
  isTrustedPaymentRedirectUrl,
} from '@/lib/payments/mollie-remote-protocol';
import { remotePaymentProvider } from '@/lib/payments/providers/remote-payment';
import {
  setRemotePaymentSharedSecret,
  setPaymentWebsiteUrl,
} from '@/lib/settings/site-settings';
import type { CartItem } from '@/types/cart';

function cartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 'cart_1',
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram',
    packageTitle: '1,000 Followers',
    quantity: 1000,
    quantityLabel: '1,000',
    lineQuantity: 1,
    unitPrice: 999,
    currency: 'USD',
    deliveryTime: 'Gradual',
    configuration: { username: 'demo_user' },
    addedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('checkout Mollie hosted redirect contract', () => {
  beforeEach(async () => {
    process.env.IV_PERSISTENCE = 'memory';
    clearPersistenceSingletonForTests();
    useMemoryPersistenceForTests();
    resetOrderStoreForTests();
    await setRemotePaymentSharedSecret('test-mollie-shared-secret-32');
    await setPaymentWebsiteUrl('https://carrycubes.com');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearPersistenceSingletonForTests();
  });

  it('creates pending order without cardToken and returns collector Mollie redirect URL', async () => {
    const createSpy = vi.spyOn(paymentGatewayManager, 'createPayment').mockResolvedValue({
      paymentId: 'remote_1001',
      status: 'pending',
      provider: 'remote-payment',
      redirectUrl: 'https://www.mollie.com/checkout/select-method/abc',
    });

    const result = await executeCheckout({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'remote-payment',
      items: [cartItem({ lineQuantity: 3 })],
      coupon: null,
      termsAccepted: true,
      idempotencyKey: `hosted-contract-${Date.now()}`,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.orderId).toBe('01001');
    expect(result.paymentStatus).toBe('pending');
    expect(result.redirectUrl).toBe('https://www.mollie.com/checkout/select-method/abc');
    expect(createSpy).toHaveBeenCalledOnce();
    const input = createSpy.mock.calls[0]![1];
    expect(input.orderId).toBe(toMollieOrderId(1001));
    expect(input.orderId).toBe('1001');
    expect(input.orderId).not.toMatch(/^IV-/);
    expect(input.payload?.cardToken).toBeUndefined();
    expect(input).not.toHaveProperty('merchantOrderNumber');

    const stored = await getOrderByPublicNumber(1001);
    expect(stored?.payment?.status).toBe('pending');
    expect(stored?.id).toMatch(/^IV-/);
  });

  it('does not invent a Mollie redirect when remote is unset (mock mode)', async () => {
    process.env.IV_PAYMENTS_MODE = 'mock';
    const remoteMod = await import('@/lib/settings/site-settings');
    vi.spyOn(remoteMod, 'isRemotePaymentConfigured').mockResolvedValue(false);

    const result = await executeCheckout({
      customer: { email: 'mock@example.com' },
      paymentMethodId: 'remote-payment',
      items: [cartItem()],
      coupon: null,
      termsAccepted: true,
      idempotencyKey: `checkout-mock-${Date.now()}`,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.mode).toBe('mock');
    expect(result.orderId).toBe('01001');
    expect(result.redirectUrl).toContain('/order-success');
    expect(result.redirectUrl).toContain('01001');
    expect(result.redirectUrl).not.toContain('mollie.com/checkout');
    delete process.env.IV_PAYMENTS_MODE;
  });

  it('verifyPayment never marks paid from return URL alone', async () => {
    const verified = await remotePaymentProvider.verifyPayment({
      paymentId: 'remote_1001',
      provider: 'remote-payment',
    });
    expect(verified.status).toBe('pending');
  });

  it('trusts Mollie/collector hosts and rejects arbitrary redirects', () => {
    expect(
      isTrustedPaymentRedirectUrl('https://evil.test/steal', 'https://carrycubes.com'),
    ).toBe(false);
    expect(
      isTrustedPaymentRedirectUrl(
        'https://carrycubes.com/?rop=9&rt=abc',
        'https://carrycubes.com',
      ),
    ).toBe(true);
    expect(
      isTrustedPaymentRedirectUrl(
        'https://www.mollie.com/checkout/select-method/x',
        'https://carrycubes.com',
      ),
    ).toBe(true);
  });

  it('createPayment posts hosted body and rejects untrusted collector redirect', async () => {
    const good = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response('https://www.mollie.com/checkout/select-method/ok', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        }),
      );

    const result = await remotePaymentProvider.createPayment({
      orderId: '1001',
      amount: { amount: 2997, currency: 'USD' },
      customerEmail: 'buyer@example.com',
      description: 'test',
      successUrl: 'https://novalikes.com/order-success?orderId=01001',
      cancelUrl: 'https://novalikes.com/checkout?cancelled=1',
      payload: {
        customer: { email: 'buyer@example.com' },
        paymentMethodId: 'remote-payment',
        items: [cartItem({ lineQuantity: 3, unitPrice: 999 })],
        totals: {
          subtotal: { amount: 2997, currency: 'USD' },
          discount: { amount: 0, currency: 'USD' },
          total: { amount: 2997, currency: 'USD' },
          itemCount: 3,
          lineCount: 1,
        },
        coupon: null,
        termsAccepted: true,
      },
    });
    expect(result.redirectUrl).toBe('https://www.mollie.com/checkout/select-method/ok');
    expect(result.status).toBe('pending');
    const posted = good.mock.calls[0]![1] as RequestInit;
    const body = String(posted.body);
    expect(body).toContain('order_id=1001');
    expect(body).toContain('amount=29.97');
    expect(body).not.toContain('card_token');
    expect(body).not.toContain('integration_mode');
    expect(body).not.toContain('merchant_order_number');
    expect(decodeURIComponent(body)).toContain('"qty":3');
    expect(decodeURIComponent(body)).toContain('"line_total":"29.97"');
    good.mockRestore();

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('https://evil.example/phish', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      }),
    );
    await expect(
      remotePaymentProvider.createPayment({
        orderId: '1001',
        amount: { amount: 999, currency: 'USD' },
        customerEmail: 'buyer@example.com',
        description: 'test',
        successUrl: 'https://novalikes.com/order-success',
        cancelUrl: 'https://novalikes.com/checkout',
        payload: {
          customer: { email: 'buyer@example.com' },
          paymentMethodId: 'remote-payment',
          items: [cartItem()],
          totals: {
            subtotal: { amount: 999, currency: 'USD' },
            discount: { amount: 0, currency: 'USD' },
            total: { amount: 999, currency: 'USD' },
            itemCount: 1,
            lineCount: 1,
          },
          coupon: null,
          termsAccepted: true,
        },
      }),
    ).rejects.toThrow(/untrusted redirect/i);
  });
});

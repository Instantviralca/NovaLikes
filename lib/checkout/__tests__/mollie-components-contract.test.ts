/**
 * Checkout + Mollie Components production contract regressions.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { executeCheckout } from '@/lib/checkout/execute';
import { toMollieOrderId } from '@/lib/orders/public-number';
import { resetOrderStoreForTests } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { paymentGatewayManager } from '@/lib/payments/manager';
import { setRemotePaymentSharedSecret, setPaymentWebsiteUrl } from '@/lib/settings/site-settings';

function cartItem() {
  return {
    id: 'cart_1',
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

describe('checkout Mollie Components contract', () => {
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

  it('sends collector order_id as public digits and returns optional redirect only from collector', async () => {
    const createSpy = vi.spyOn(paymentGatewayManager, 'createPayment').mockResolvedValue({
      paymentId: 'remote_1001',
      status: 'pending',
      provider: 'remote-payment',
      redirectUrl: 'https://www.mollie.com/checkout/select-method/abc',
    });

    const result = await executeCheckout({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'remote-payment',
      items: [cartItem()],
      coupon: null,
      termsAccepted: true,
      cardToken: 'tkn_testtoken123',
      idempotencyKey: `checkout-contract-${Date.now()}`,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.orderId).toBe('01001');
    expect(result.redirectUrl).toBe('https://www.mollie.com/checkout/select-method/abc');
    expect(createSpy).toHaveBeenCalledOnce();
    const input = createSpy.mock.calls[0][1];
    expect(input.orderId).toBe(toMollieOrderId(1001));
    expect(input.orderId).toBe('1001');
    expect(input.orderId).not.toMatch(/^IV-/);
    expect(input.payload?.cardToken).toBe('tkn_testtoken123');
    expect(input).not.toHaveProperty('merchantOrderNumber');
  });

  it('does not invent a hosted redirect when collector returns none (mock mode)', async () => {
    process.env.IV_PAYMENTS_MODE = 'mock';
    const remoteMod = await import('@/lib/settings/site-settings');
    vi.spyOn(remoteMod, 'isRemotePaymentConfigured').mockResolvedValue(false);

    const result = await executeCheckout({
      customer: { email: 'mock@example.com' },
      paymentMethodId: 'remote-payment',
      items: [cartItem()],
      coupon: null,
      termsAccepted: true,
      cardToken: 'tkn_testtoken123',
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
});

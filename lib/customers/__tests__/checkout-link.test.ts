import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { CustomerRecord } from '@/lib/customers/types';

const sessionState: { customer: CustomerRecord | null } = { customer: null };

vi.mock('@/lib/customers/session', async () => {
  const actual = await vi.importActual<typeof import('@/lib/customers/session')>(
    '@/lib/customers/session',
  );
  return {
    ...actual,
    getCustomerFromCookies: async () => sessionState.customer,
  };
});

vi.mock('@/lib/settings/site-settings', async () => {
  const actual = await vi.importActual<typeof import('@/lib/settings/site-settings')>(
    '@/lib/settings/site-settings',
  );
  return {
    ...actual,
    isRemotePaymentConfigured: async () => false,
  };
});

import { insertCustomer, resetCustomerStoreForTests } from '@/lib/customers/store';
import { executeCheckout } from '@/lib/checkout/execute';
import { getOrderByPublicNumber, resetOrderStoreForTests } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';

const sampleItem = {
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

describe('checkout customer_id link', () => {
  beforeEach(() => {
    process.env.IV_PERSISTENCE = 'memory';
    process.env.IV_PAYMENTS_MODE = 'mock';
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    clearPersistenceSingletonForTests();
    useMemoryPersistenceForTests();
    resetOrderStoreForTests();
    resetCustomerStoreForTests();
    sessionState.customer = null;
  });

  afterEach(() => {
    resetOrderStoreForTests();
    clearPersistenceSingletonForTests();
    resetCustomerStoreForTests();
    sessionState.customer = null;
  });

  it('sets customer_id when session email matches checkout email', async () => {
    const customer = await insertCustomer({
      email: 'buyer@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    sessionState.customer = customer;

    const result = await executeCheckout({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'remote-payment',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: `link-match-${Date.now()}`,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const order = await getOrderByPublicNumber(1001);
    expect(order?.customerId).toBe(customer.id);
  });

  it('does not set customer_id when session email differs', async () => {
    const customer = await insertCustomer({
      email: 'session@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    sessionState.customer = customer;

    const result = await executeCheckout({
      customer: { email: 'checkout@example.com' },
      paymentMethodId: 'remote-payment',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: `link-mismatch-${Date.now()}`,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const order = await getOrderByPublicNumber(1001);
    expect(order?.customerId).toBeUndefined();
  });
});

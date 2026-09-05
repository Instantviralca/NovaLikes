/**
 * Order create + track + admin auth smoke tests.
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  verifyAdminPassword,
} from '@/lib/admin/auth';
import { verifyAdminSessionTokenEdge } from '@/lib/admin/auth-edge';
import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests, resolveOrderByCustomerRef } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { lookupTrackedOrder } from '@/lib/tracking/lookup';

const prevPassword = process.env.IV_ADMIN_PASSWORD;
const prevSecret = process.env.IV_ADMIN_SESSION_SECRET;

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.IV_ADMIN_PASSWORD = 'test-admin-password';
  process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
});

afterEach(() => {
  if (prevPassword === undefined) delete process.env.IV_ADMIN_PASSWORD;
  else process.env.IV_ADMIN_PASSWORD = prevPassword;
  if (prevSecret === undefined) delete process.env.IV_ADMIN_SESSION_SECRET;
  else process.env.IV_ADMIN_SESSION_SECRET = prevSecret;
  resetOrderStoreForTests();
  clearPersistenceSingletonForTests();
});

describe('Launch checklist — orders + auth', () => {
  it('creates a pending order and allows track lookup', async () => {
    const order = await placeOrder({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [
        {
          id: 'cart_1',
          packageId: 'ig-f-1000',
          serviceId: 'instagram-followers',
          serviceSlug: 'buy-instagram-followers',
          serviceName: 'Instagram Followers',
          platformId: 'instagram',
          packageTitle: '1,000 Followers',
          quantity: 1000,
          quantityLabel: '1,000',
          unitPrice: 1,
          currency: 'USD',
          deliveryTime: 'Gradual',
          configuration: { username: 'demo_user' },
          addedAt: new Date().toISOString(),
        },
      ],
    });

    expect(order.id.startsWith('IV-')).toBe(true);
    expect(order.publicNumber).toBe(1001);
    expect(order.total.amount).toBe(1399);
    expect((await getOrderById(order.id))?.guestEmail).toBe('buyer@example.com');

    const tracked = await lookupTrackedOrder(
      { orderId: '01001', email: 'buyer@example.com' },
      async (id) => resolveOrderByCustomerRef(id),
    );
    expect(tracked.ok).toBe(true);
    if (tracked.ok) {
      expect(tracked.order.orderId).toBe('01001');
      expect(tracked.order.targetDisplay).toContain('***');
    }
  });

  it('signs and verifies admin sessions in Node and Edge helpers', async () => {
    expect(verifyAdminPassword('test-admin-password')).toBe(true);
    expect(verifyAdminPassword('wrong')).toBe(false);
    const { token } = await createAdminSessionToken();
    expect(verifyAdminSessionToken(token)).toBe(true);
    expect(await verifyAdminSessionTokenEdge(token)).toBe(true);
    expect(await verifyAdminSessionTokenEdge('bad.token')).toBe(false);
  });
});

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { claimGuestOrders } from '@/lib/customers/claim-orders';
import {
  getCustomerOrder,
  getCustomerOrderStats,
  listCustomerOrders,
} from '@/lib/customers/orders';
import {
  insertCustomer,
  resetCustomerStoreForTests,
} from '@/lib/customers/store';
import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests, saveOrder } from '@/lib/orders/store';
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

async function makeOrder(email: string, linkedCustomerId?: string) {
  return placeOrder({
    customer: { email },
    paymentMethodId: 'remote-payment',
    termsAccepted: true,
    coupon: null,
    items: [{ ...sampleItem, id: `cart_${Math.random().toString(36).slice(2, 8)}` }],
    linkedCustomerId,
    idempotencyKey: `test-${email}-${linkedCustomerId ?? 'guest'}-${Math.random()}`,
  });
}

describe('claimGuestOrders + customer order access', () => {
  beforeEach(() => {
    process.env.IV_PERSISTENCE = 'memory';
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    clearPersistenceSingletonForTests();
    useMemoryPersistenceForTests();
    resetOrderStoreForTests();
    resetCustomerStoreForTests();
  });

  afterEach(() => {
    resetOrderStoreForTests();
    clearPersistenceSingletonForTests();
    resetCustomerStoreForTests();
  });

  it('claims only matching guest orders without customer_id', async () => {
    const mine = await makeOrder('claim@example.com');
    const other = await makeOrder('other@example.com');
    const customer = await insertCustomer({
      email: 'claim@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const foreign = await insertCustomer({
      email: 'foreign@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const alreadyLinked = await makeOrder('claim@example.com');
    await saveOrder({
      ...(await getOrderById(alreadyLinked.id))!,
      customerId: foreign.id,
    });

    const claimed = await claimGuestOrders(customer);
    expect(claimed).toBe(1);

    expect((await getOrderById(mine.id))?.customerId).toBe(customer.id);
    expect((await getOrderById(other.id))?.customerId).toBeUndefined();
    expect((await getOrderById(alreadyLinked.id))?.customerId).toBe(foreign.id);
  });

  it('getCustomerOrder never returns another customer order', async () => {
    const a = await insertCustomer({
      email: 'a@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const b = await insertCustomer({
      email: 'b@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const orderA = await makeOrder('a@example.com', a.id);
    const orderB = await makeOrder('b@example.com', b.id);

    expect(await getCustomerOrder(a.id, String(orderA.publicNumber))).not.toBeNull();
    expect(await getCustomerOrder(a.id, String(orderB.publicNumber))).toBeNull();
    expect(await getCustomerOrder(a.id, orderB.id)).toBeNull();

    const listed = await listCustomerOrders(a.id, { limit: 20, offset: 0 });
    expect(listed.orders.every((o) => o.customerId === a.id)).toBe(true);
    expect(listed.total).toBe(1);
  });

  it('placeOrder sets customer_id only when linkedCustomerId is provided', async () => {
    const customer = await insertCustomer({
      email: 'match@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const matched = await makeOrder('match@example.com', customer.id);
    expect(matched.customerId).toBe(customer.id);

    const guest = await makeOrder('guest@example.com');
    expect(guest.customerId).toBeUndefined();
  });

  it('total spent only counts order payments with status paid', async () => {
    const customer = await insertCustomer({
      email: 'spent@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const order = await makeOrder('spent@example.com', customer.id);
    expect(order.payment?.status).toBe('pending');

    let stats = await getCustomerOrderStats(customer.id);
    expect(stats.totalOrders).toBe(1);
    expect(stats.totalSpentByCurrency).toEqual({});

    const unpaid = (await getOrderById(order.id))!;
    await saveOrder({
      ...unpaid,
      payment: {
        ...unpaid.payment!,
        status: 'paid',
      },
    });

    stats = await getCustomerOrderStats(customer.id);
    expect(stats.totalSpentByCurrency[order.total.currency]).toBe(
      order.total.amount,
    );
  });
});

import { and, eq, isNull, sql } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import type { CustomerRecord } from '@/lib/customers/types';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import { getPersistence } from '@/lib/persistence';

function isMemoryBackend(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.IV_PERSISTENCE === 'memory' ||
    !isDatabaseConfigured()
  );
}

/**
 * Attach guest orders with the same email to this customer.
 * Call only after the email is proven (code verify or verified password login).
 */
export async function claimGuestOrders(customer: CustomerRecord): Promise<number> {
  const email = customer.email.trim().toLowerCase();

  if (isMemoryBackend()) {
    const store = getPersistence();
    const orders = await store.listOrders();
    let count = 0;
    const now = new Date().toISOString();
    for (const order of orders) {
      if (order.guestEmail === email && !order.customerId) {
        await store.saveOrder({
          ...order,
          customerId: customer.id,
          updatedAt: now,
        });
        count += 1;
      }
    }
    return count;
  }

  const db = getDb();
  const updated = await db
    .update(tables.orders)
    .set({
      customerId: customer.id,
      updatedAt: sql`now()`,
    })
    .where(
      and(
        eq(tables.orders.guestEmail, email),
        isNull(tables.orders.customerId),
      ),
    )
    .returning({ id: tables.orders.id });
  return updated.length;
}

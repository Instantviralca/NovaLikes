import { and, desc, eq, inArray, sql } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import {
  getOrderById,
  getOrderByPublicNumber,
  listOrders,
} from '@/lib/orders/store';
import { parsePublicOrderNumber } from '@/lib/orders/public-number';
import type { Order } from '@/types/order';

function isMemoryBackend(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.IV_PERSISTENCE === 'memory' ||
    !isDatabaseConfigured()
  );
}

export type CustomerOrderStats = {
  totalOrders: number;
  completed: number;
  inProgress: number;
  totalSpentByCurrency: Record<string, number>;
};

export async function listCustomerOrders(
  customerId: string,
  opts: { limit: number; offset: number },
): Promise<{ orders: Order[]; total: number }> {
  const limit = Math.max(1, Math.min(100, opts.limit));
  const offset = Math.max(0, opts.offset);

  if (isMemoryBackend()) {
    const all = (await listOrders())
      .filter((o) => o.customerId === customerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return {
      orders: all.slice(offset, offset + limit),
      total: all.length,
    };
  }

  const db = getDb();
  const [countRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(tables.orders)
    .where(eq(tables.orders.customerId, customerId));
  const total = countRow?.count ?? 0;

  const orderRows = await db
    .select()
    .from(tables.orders)
    .where(eq(tables.orders.customerId, customerId))
    .orderBy(desc(tables.orders.createdAt))
    .limit(limit)
    .offset(offset);

  if (orderRows.length === 0) {
    return { orders: [], total };
  }

  const ids = orderRows.map((r) => r.id);
  const itemRows = await db
    .select()
    .from(tables.orderItems)
    .where(inArray(tables.orderItems.orderId, ids));

  const paymentRows = await db
    .select()
    .from(tables.orderPayments)
    .where(inArray(tables.orderPayments.orderId, ids));

  const itemsByOrder = new Map<string, typeof itemRows>();
  for (const item of itemRows) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }
  const paymentByOrder = new Map(paymentRows.map((p) => [p.orderId, p]));

  const orders: Order[] = orderRows.map((row) => {
    const items = (itemsByOrder.get(row.id) ?? []).map((item) => ({
      id: item.id,
      platformId: item.platformId as Order['items'][number]['platformId'],
      serviceId: item.serviceId,
      serviceSlug: item.serviceSlug,
      serviceName: item.serviceName,
      packageId: item.packageId,
      packageTitle: item.packageTitle,
      quantity: item.quantity,
      quantityLabel: item.quantityLabel,
      unitPrice: item.unitPrice,
      currency: item.currency as Order['currency'],
      configuration: item.configuration,
      deliveryTime: item.deliveryTime ?? undefined,
      publicDestination: item.publicDestination ?? undefined,
    }));
    const payment = paymentByOrder.get(row.id);
    return {
      id: row.id,
      publicNumber: row.publicNumber ?? null,
      customerId: row.customerId ?? undefined,
      guestEmail: row.guestEmail,
      status: row.status as Order['status'],
      fulfillmentMode: row.fulfillmentMode as Order['fulfillmentMode'],
      currency: row.currency as Order['currency'],
      items,
      subtotal: { amount: row.subtotalAmount, currency: row.currency as Order['currency'] },
      discount: { amount: row.discountAmount, currency: row.currency as Order['currency'] },
      total: { amount: row.totalAmount, currency: row.currency as Order['currency'] },
      couponCode: row.couponCode ?? undefined,
      customerNotes: row.customerNotes ?? undefined,
      payment: payment
        ? {
            provider: payment.provider as NonNullable<Order['payment']>['provider'],
            paymentId: payment.paymentId,
            status: payment.status as NonNullable<Order['payment']>['status'],
            amount: {
              amount: payment.amount,
              currency: payment.currency as Order['currency'],
            },
            paidAt: payment.paidAt?.toISOString(),
          }
        : undefined,
      timeline: [],
      internalNotes: [],
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  });

  return { orders, total };
}

export async function getCustomerOrder(
  customerId: string,
  publicNumberOrId: string,
): Promise<Order | null> {
  const ref = publicNumberOrId.trim();
  if (!ref) return null;

  let order: Order | null = null;
  const publicNumber = parsePublicOrderNumber(ref);
  if (publicNumber !== null) {
    order = await getOrderByPublicNumber(publicNumber);
  }
  if (!order) {
    order = await getOrderById(ref);
  }
  if (!order || order.customerId !== customerId) return null;
  return order;
}

export async function getCustomerOrderStats(
  customerId: string,
): Promise<CustomerOrderStats> {
  if (isMemoryBackend()) {
    const orders = (await listOrders()).filter((o) => o.customerId === customerId);
    const totalSpentByCurrency: Record<string, number> = {};
    let completed = 0;
    let inProgress = 0;
    for (const order of orders) {
      if (order.status === 'completed') completed += 1;
      if (order.status === 'pending' || order.status === 'processing') inProgress += 1;
      if (order.payment?.status === 'paid') {
        const cur = order.payment.amount.currency;
        totalSpentByCurrency[cur] =
          (totalSpentByCurrency[cur] ?? 0) + order.payment.amount.amount;
      }
    }
    return {
      totalOrders: orders.length,
      completed,
      inProgress,
      totalSpentByCurrency,
    };
  }

  const db = getDb();
  const orderRows = await db
    .select({
      id: tables.orders.id,
      status: tables.orders.status,
    })
    .from(tables.orders)
    .where(eq(tables.orders.customerId, customerId));

  let completed = 0;
  let inProgress = 0;
  for (const row of orderRows) {
    if (row.status === 'completed') completed += 1;
    if (row.status === 'pending' || row.status === 'processing') inProgress += 1;
  }

  const spentRows = await db
    .select({
      currency: tables.orderPayments.currency,
      total: sql<number>`coalesce(sum(${tables.orderPayments.amount}), 0)::int`,
    })
    .from(tables.orderPayments)
    .innerJoin(tables.orders, eq(tables.orders.id, tables.orderPayments.orderId))
    .where(
      and(
        eq(tables.orders.customerId, customerId),
        eq(tables.orderPayments.status, 'paid'),
      ),
    )
    .groupBy(tables.orderPayments.currency);

  const totalSpentByCurrency: Record<string, number> = {};
  for (const row of spentRows) {
    totalSpentByCurrency[row.currency] = row.total;
  }

  return {
    totalOrders: orderRows.length,
    completed,
    inProgress,
    totalSpentByCurrency,
  };
}

/**
 * Order store facade — Postgres primary; memory/file only via persistence resolver.
 */

import {
  getCustomerOrderId,
  isLegacyInternalOrderId,
  parsePublicOrderNumber,
} from '@/lib/orders/public-number';
import { getPersistence, resetPersistenceForTests } from '@/lib/persistence';
import type { Order } from '@/types/order';

export async function listOrders(): Promise<Order[]> {
  return getPersistence().listOrders();
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  return getPersistence().getOrderById(orderId);
}

export async function getOrderByPublicNumber(publicNumber: number): Promise<Order | null> {
  const store = getPersistence();
  if (store.getOrderByPublicNumber) {
    return store.getOrderByPublicNumber(publicNumber);
  }
  const orders = await store.listOrders();
  return orders.find((o) => o.publicNumber === publicNumber) ?? null;
}

/**
 * Resolve a customer-facing or legacy Order ID (01001, 1001, or IV-…).
 */
export async function resolveOrderByCustomerRef(ref: string): Promise<Order | null> {
  const trimmed = ref.trim();
  if (!trimmed) return null;

  const publicNumber = parsePublicOrderNumber(trimmed);
  if (publicNumber !== null) {
    const byPublic = await getOrderByPublicNumber(publicNumber);
    if (byPublic) return byPublic;
  }

  if (isLegacyInternalOrderId(trimmed) || !publicNumber) {
    return getOrderById(trimmed);
  }

  return null;
}

export async function getOrderByIdempotencyKey(key: string): Promise<Order | null> {
  return getPersistence().getOrderByIdempotencyKey(key);
}

export async function getOrderByPaymentId(paymentId: string): Promise<Order | null> {
  return getPersistence().getOrderByPaymentId(paymentId);
}

export async function allocatePublicOrderNumber(): Promise<number> {
  return getPersistence().allocatePublicOrderNumber();
}

export async function ensurePublicOrderNumber(orderId: string): Promise<Order> {
  return getPersistence().ensurePublicOrderNumber(orderId);
}

export async function saveOrder(order: Order): Promise<Order> {
  return getPersistence().saveOrder(order);
}

export function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IV-${stamp}-${rand}`;
}

export { getCustomerOrderId };

/** Test helper — wipe in-memory / test persistence. */
export function resetOrderStoreForTests(): void {
  resetPersistenceForTests();
}

/**
 * Server-only analytics event recorder (order_created, payment_paid, …).
 */

import { eventCategoryFor, isServerAnalyticsEvent } from '@/lib/analytics/native/taxonomy';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';
import type { Order } from '@/types/order';

export async function recordServerAnalyticsEvent(input: {
  id: string;
  eventName: string;
  sessionId?: string | null;
  visitorId?: string | null;
  pagePath?: string;
  country?: string;
  market?: string | null;
  locale?: string | null;
  serviceSlug?: string | null;
  packageId?: string | null;
  properties?: Record<string, string | number | boolean | null>;
  occurredAt?: string;
}): Promise<boolean> {
  if (!isServerAnalyticsEvent(input.eventName)) {
    console.error('[analytics] refused non-server event', { eventName: input.eventName });
    return false;
  }

  let persistence;
  try {
    persistence = getPersistence();
  } catch {
    return false;
  }

  if (persistence.hasAnalyticsEventId) {
    if (await persistence.hasAnalyticsEventId(input.id)) return false;
  }

  const now = input.occurredAt ?? new Date().toISOString();
  const record: AnalyticsEventRecord = {
    id: input.id,
    eventName: input.eventName,
    sessionId: input.sessionId?.trim() || `server_${input.id}`,
    pagePath: input.pagePath || '/checkout',
    country: input.country || 'XX',
    createdAt: now,
    occurredAt: now,
    visitorId: input.visitorId ?? null,
    eventCategory: eventCategoryFor(input.eventName),
    market: input.market ?? null,
    locale: input.locale ?? null,
    serviceSlug: input.serviceSlug ?? null,
    packageId: input.packageId ?? null,
    properties: input.properties,
    metadata: input.properties,
  };

  try {
    await persistence.insertAnalyticsEvents([record]);
    return true;
  } catch (error) {
    console.error('[analytics] server event failed', {
      eventName: input.eventName,
      message: error instanceof Error ? error.message : 'unknown',
    });
    return false;
  }
}

export async function recordOrderCreatedAnalytics(order: Order): Promise<void> {
  const first = order.items[0];
  await recordServerAnalyticsEvent({
    id: `analytics:order_created:${order.id}`,
    eventName: 'order_created',
    pagePath: '/checkout',
    serviceSlug: first?.serviceSlug ?? null,
    packageId: first?.packageId ?? null,
    properties: {
      orderId: order.id,
      amountMinor: order.total.amount,
      currency: order.total.currency,
      itemCount: order.items.length,
    },
  });
}

export async function recordPaymentPaidAnalytics(order: Order): Promise<void> {
  const first = order.items[0];
  const props = {
    orderId: order.id,
    amountMinor: order.total.amount,
    currency: order.total.currency,
    itemCount: order.items.length,
  };
  await recordServerAnalyticsEvent({
    id: `analytics:payment_paid:${order.id}`,
    eventName: 'payment_paid',
    pagePath: '/order-success',
    serviceSlug: first?.serviceSlug ?? null,
    packageId: first?.packageId ?? null,
    properties: props,
  });
  await recordServerAnalyticsEvent({
    id: `analytics:order_completed:${order.id}`,
    eventName: 'order_completed',
    pagePath: '/order-success',
    serviceSlug: first?.serviceSlug ?? null,
    packageId: first?.packageId ?? null,
    properties: props,
  });
}

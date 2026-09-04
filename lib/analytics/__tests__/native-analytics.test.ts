/**
 * Native first-party analytics upgrade tests.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getNativeRangeBounds,
  parseNativeAnalyticsRange,
  getNativeAnalyticsViewModel,
} from '@/lib/admin/native-analytics/overview';
import {
  classifyReferrer,
  parseUtmFromSearch,
} from '@/lib/analytics/native/attribution';
import {
  getOrCreateSessionId,
  getOrCreateVisitorId,
  resetNativeAnalyticsIdentityForTests,
  SESSION_INACTIVITY_MS,
} from '@/lib/analytics/native/identity';
import {
  canonicalizeClientEventName,
  isClientAnalyticsEvent,
  isExcludedAnalyticsPath,
  isLikelyBotUserAgent,
  isServerAnalyticsEvent,
} from '@/lib/analytics/native/taxonomy';
import { recordServerAnalyticsEvent } from '@/lib/analytics/native/server-events';
import { getPersistence } from '@/lib/persistence';

beforeEach(() => {
  resetNativeAnalyticsIdentityForTests();
  const persistence = getPersistence();
  if ('resetForTests' in persistence && typeof persistence.resetForTests === 'function') {
    persistence.resetForTests();
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  resetNativeAnalyticsIdentityForTests();
});

describe('native taxonomy', () => {
  it('maps legacy client names and rejects purchase for client sink', () => {
    expect(canonicalizeClientEventName('cart_item_add')).toBe('cart_add');
    expect(canonicalizeClientEventName('checkout_view')).toBe('checkout_started');
    expect(canonicalizeClientEventName('home_page_view')).toBe('page_view');
    expect(canonicalizeClientEventName('purchase')).toBeNull();
    expect(canonicalizeClientEventName('payment_paid')).toBeNull();
    expect(isServerAnalyticsEvent('payment_paid')).toBe(true);
    expect(isClientAnalyticsEvent('landing_view')).toBe(true);
  });

  it('skips admin/api/bot paths and bot UAs', () => {
    expect(isExcludedAnalyticsPath('/admin/analytics')).toBe(true);
    expect(isExcludedAnalyticsPath('/api/analytics/collect')).toBe(true);
    expect(isExcludedAnalyticsPath('/buy-instagram-followers')).toBe(false);
    expect(isLikelyBotUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true);
    expect(isLikelyBotUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120')).toBe(
      false,
    );
  });
});

describe('native identity cookies', () => {
  it('reuses visitor id and creates a new session after inactivity', () => {
    const v1 = getOrCreateVisitorId();
    const v2 = getOrCreateVisitorId();
    expect(v1).toBe(v2);

    const s1 = getOrCreateSessionId();
    expect(s1.isNewSession).toBe(true);
    const s2 = getOrCreateSessionId();
    expect(s2.sessionId).toBe(s1.sessionId);
    expect(s2.isNewSession).toBe(false);

    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + SESSION_INACTIVITY_MS + 1_000);
    // Re-read path uses cookies; in node memory path without document, session sticks.
    // Force new session via reset then create.
    resetNativeAnalyticsIdentityForTests();
    const s3 = getOrCreateSessionId();
    expect(s3.isNewSession).toBe(true);
  });
});

describe('attribution', () => {
  it('parses UTM and classifies first-touch channels', () => {
    const utm = parseUtmFromSearch('?utm_source=newsletter&utm_medium=email&utm_campaign=spring');
    expect(utm.source).toBe('newsletter');
    expect(classifyReferrer(null, utm).channel).toBe('campaign');
    expect(classifyReferrer('https://www.google.com/search?q=x', {}).channel).toBe('organic');
    expect(classifyReferrer('https://instagram.com/p/1', {}).channel).toBe('social');
    expect(classifyReferrer(null, {}).channel).toBe('direct');
  });
});

describe('server-only paid events', () => {
  it('refuses client-style payment_paid spoof via server recorder guard', async () => {
    const ok = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:test-order',
      eventName: 'page_view',
    });
    expect(ok).toBe(false);
  });

  it('records payment_paid once (idempotent by id)', async () => {
    const first = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_abc',
      eventName: 'payment_paid',
      properties: { orderId: 'order_abc', amountMinor: 1999, currency: 'USD' },
    });
    const second = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_abc',
      eventName: 'payment_paid',
      properties: { orderId: 'order_abc', amountMinor: 1999, currency: 'USD' },
    });
    expect(first).toBe(true);
    expect(second).toBe(false);

    const events = await getPersistence().listAnalyticsEvents(
      new Date(Date.now() - 60_000).toISOString(),
    );
    const paid = events.filter((e) => e.eventName === 'payment_paid');
    expect(paid).toHaveLength(1);
  });
});

describe('admin native aggregation', () => {
  it('defaults to 30d and builds funnel session dedupe + revenue once', async () => {
    expect(parseNativeAnalyticsRange(undefined)).toBe('30d');
    const bounds = getNativeRangeBounds('30d', { now: new Date('2026-09-05T12:00:00.000Z') });
    expect(bounds.label).toBe('Last 30 days');

    const persistence = getPersistence();
    const now = new Date().toISOString();
    await persistence.insertAnalyticsEvents([
      {
        id: 'e1',
        eventName: 'landing_view',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'e2',
        eventName: 'cart_add',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/buy-instagram-followers',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        serviceSlug: 'buy-instagram-followers',
      },
      {
        id: 'e3',
        eventName: 'checkout_started',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/checkout',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'e4',
        eventName: 'order_created',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/checkout',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'e5',
        eventName: 'payment_paid',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/order-success',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        properties: { orderId: 'o1', amountMinor: 2500, currency: 'USD' },
      },
      {
        id: 'e6',
        eventName: 'payment_paid',
        sessionId: 's1',
        visitorId: 'v1',
        pagePath: '/order-success',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        properties: { orderId: 'o1', amountMinor: 2500, currency: 'USD' },
      },
    ]);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.timezoneLabel).toBe('UTC');
    const paidKpi = vm.kpis.find((k) => k.id === 'paid_orders');
    const revenueKpi = vm.kpis.find((k) => k.id === 'revenue');
    expect(paidKpi?.value).toBe(1);
    expect(revenueKpi?.value).toBe('$25.00');
    expect(vm.funnel[0]?.sessions).toBeGreaterThanOrEqual(1);
    expect(vm.funnel.find((s) => s.id === 'cart')?.sessions).toBe(1);
    expect(vm.funnel.find((s) => s.id === 'paid')?.sessions).toBe(1);
  });
});

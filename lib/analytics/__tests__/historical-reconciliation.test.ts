/**
 * Historical / legacy session inflation reconciliation invariants.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  aggregatePeriod,
  buildFunnel,
  getNativeAnalyticsViewModel,
} from '@/lib/admin/native-analytics/overview';
import { resetDuplicateGuardsForTests } from '@/lib/analytics/core/duplicate';
import { resetNativeAnalyticsIdentityForTests } from '@/lib/analytics/native/identity';
import { milestoneIdempotencyKey } from '@/lib/analytics/native/milestones';
import { recordServerAnalyticsEvent } from '@/lib/analytics/native/server-events';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord, AnalyticsSessionRecord } from '@/lib/persistence/types';

beforeEach(() => {
  resetNativeAnalyticsIdentityForTests();
  resetDuplicateGuardsForTests();
  const persistence = getPersistence();
  if ('resetForTests' in persistence && typeof persistence.resetForTests === 'function') {
    persistence.resetForTests();
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  resetNativeAnalyticsIdentityForTests();
  resetDuplicateGuardsForTests();
});

function makeLegacyPageView(i: number, now: string): AnalyticsEventRecord {
  return {
    id: `legacy-pv-${i}`,
    eventName: i % 2 === 0 ? 'home_page_view' : 'page_view',
    sessionId: `legacy-sid-${i}`,
    pagePath: '/',
    country: 'XX',
    createdAt: now,
    occurredAt: now,
  };
}

describe('historical session reconciliation', () => {
  it('A/B/C/D/E/F: 5 real sessions + 250 legacy events → Sessions/Landing/Markets/Devices/Acquisition = 5', async () => {
    const now = new Date().toISOString();
    const persistence = getPersistence();

    for (let i = 1; i <= 5; i += 1) {
      const vid = `v-real-${i}`;
      const sid = `s-real-${i}`;
      await persistence.upsertAnalyticsVisitor?.({
        id: vid,
        firstSeenAt: now,
        lastSeenAt: now,
      });
      await persistence.upsertAnalyticsSession?.({
        id: sid,
        visitorId: vid,
        startedAt: now,
        lastActivityAt: now,
        landingPath: '/',
        countryCode: 'US',
        isBot: false,
        deviceType: i === 1 ? 'desktop' : 'desktop',
        sourceChannel: 'direct',
        market: null,
        locale: 'en',
      });
      await persistence.insertAnalyticsEvents([
        {
          id: `real-pv-${i}`,
          eventName: 'page_view',
          sessionId: sid,
          visitorId: vid,
          pagePath: '/',
          country: 'US',
          createdAt: now,
          occurredAt: now,
          deviceType: 'desktop',
        },
      ]);
    }

    const legacy: AnalyticsEventRecord[] = [];
    for (let i = 0; i < 250; i += 1) {
      legacy.push(makeLegacyPageView(i, now));
    }
    await persistence.insertAnalyticsEvents(legacy);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.kpis.find((k) => k.id === 'sessions')?.value).toBe(5);
    expect(vm.funnel.find((s) => s.id === 'landing')?.sessions).toBe(5);
    expect(vm.funnel.find((s) => s.id === 'landing')?.sessions).toBeLessThanOrEqual(5);

    const marketTotal = vm.markets.reduce((sum, r) => sum + r.sessions, 0);
    expect(marketTotal).toBe(5);

    const deviceTotal = vm.devices.reduce((sum, r) => sum + r.sessions, 0);
    expect(deviceTotal).toBe(5);
    expect(vm.devices.find((d) => d.label === 'Unknown')?.sessions ?? 0).toBe(0);

    const acquisitionTotal = vm.acquisition.reduce((sum, r) => sum + r.sessions, 0);
    expect(acquisitionTotal).toBe(5);
    expect(vm.acquisition.find((a) => a.label === 'Direct')?.sessions).toBe(5);

    // Page views include historical continuity
    expect(Number(vm.kpis.find((k) => k.id === 'page_views')?.value)).toBeGreaterThanOrEqual(250);
    expect(vm.preUpgradeNotice).toMatch(/analytics_sessions only/i);
  });

  it('G: one real session with multi page/cart/checkout → funnel stages max 1', async () => {
    const now = new Date().toISOString();
    const persistence = getPersistence();
    await persistence.upsertAnalyticsVisitor?.({
      id: 'v-g',
      firstSeenAt: now,
      lastSeenAt: now,
    });
    await persistence.upsertAnalyticsSession?.({
      id: 's-g',
      visitorId: 'v-g',
      startedAt: now,
      lastActivityAt: now,
      landingPath: '/',
      countryCode: 'US',
      isBot: false,
      deviceType: 'desktop',
    });

    const events: AnalyticsEventRecord[] = [];
    for (let i = 0; i < 5; i += 1) {
      events.push({
        id: `pv-g-${i}`,
        eventName: 'page_view',
        sessionId: 's-g',
        visitorId: 'v-g',
        pagePath: i === 0 ? '/' : `/p${i}`,
        country: 'US',
        createdAt: now,
        occurredAt: now,
      });
    }
    for (let i = 0; i < 2; i += 1) {
      events.push({
        id: `cart-g-${i}`,
        eventName: 'cart_add',
        sessionId: 's-g',
        visitorId: 'v-g',
        pagePath: '/buy-instagram-followers',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        serviceSlug: 'buy-instagram-followers',
      });
    }
    for (let i = 0; i < 3; i += 1) {
      events.push({
        id: milestoneIdempotencyKey('s-g', 'checkout_started') + (i === 0 ? '' : `:dup-${i}`),
        eventName: 'checkout_started',
        sessionId: 's-g',
        visitorId: 'v-g',
        pagePath: '/checkout',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        idempotencyKey: i === 0 ? milestoneIdempotencyKey('s-g', 'checkout_started') : null,
      });
    }
    await persistence.insertAnalyticsEvents(events);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.funnel.find((s) => s.id === 'landing')?.sessions).toBe(1);
    expect(vm.funnel.find((s) => s.id === 'cart')?.sessions).toBe(1);
    expect(vm.funnel.find((s) => s.id === 'checkout')?.sessions).toBe(1);
    expect(vm.secondaryKpis.find((k) => k.id === 'cart_adds')?.value).toBe(2);
  });

  it('H: historical raw events remain stored', async () => {
    const now = new Date().toISOString();
    const persistence = getPersistence();
    await persistence.insertAnalyticsEvents([
      {
        id: 'keep-legacy',
        eventName: 'home_page_view',
        sessionId: 'orphan',
        pagePath: '/',
        country: 'XX',
        createdAt: now,
        occurredAt: now,
      },
    ]);
    const listed = await persistence.listAnalyticsEvents(
      new Date(Date.now() - 60_000).toISOString(),
    );
    expect(listed.some((e) => e.id === 'keep-legacy')).toBe(true);
  });

  it('I: milestone idempotency keys remain deterministic', () => {
    expect(milestoneIdempotencyKey('s1', 'session_started')).toBe('session:s1:started');
    expect(milestoneIdempotencyKey('s1', 'landing_view')).toBe('session:s1:landing');
    expect(milestoneIdempotencyKey('s1', 'checkout_started')).toBe('session:s1:checkout_started');
  });

  it('J: paid/revenue remains server-only and once', async () => {
    const first = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_recon',
      eventName: 'payment_paid',
      properties: { orderId: 'order_recon', amountMinor: 3300, currency: 'USD' },
    });
    const second = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_recon',
      eventName: 'payment_paid',
      properties: { orderId: 'order_recon', amountMinor: 3300, currency: 'USD' },
    });
    expect(first).toBe(true);
    expect(second).toBe(false);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.kpis.find((k) => k.id === 'paid_orders')?.value).toBe(1);
    expect(vm.kpis.find((k) => k.id === 'revenue')?.value).toBe('$33.00');
  });

  it('never emits >100% from-previous when a later stage exceeds prior', () => {
    const funnel = buildFunnel({
      visitors: 5,
      sessions: 5,
      pageViews: 10,
      cartAdds: 2,
      checkoutStarts: 12,
      orderCreated: 0,
      paidOrders: 0,
      revenueUsdMinor: 0,
      landingSessions: 5,
      serviceSessions: 4,
      cartSessions: 10,
      checkoutSessions: 12,
      orderCreatedSessions: 0,
      paidSessions: 0,
      legacyEventCount: 0,
    });
    for (const stage of funnel) {
      if (stage.conversionFromPrevious !== null) {
        expect(stage.conversionFromPrevious).toBeLessThanOrEqual(100);
      }
    }
    // Cart > Service → conversion omitted
    expect(funnel.find((s) => s.id === 'cart')?.conversionFromPrevious).toBeNull();
    expect(funnel.find((s) => s.id === 'checkout')?.conversionFromPrevious).toBeNull();
  });

  it('aggregatePeriod ignores unlinked event session ids', () => {
    const now = new Date().toISOString();
    const sessions: AnalyticsSessionRecord[] = [
      {
        id: 'only-real',
        visitorId: 'v1',
        startedAt: now,
        lastActivityAt: now,
        countryCode: 'US',
        isBot: false,
        deviceType: 'desktop',
      },
    ];
    const events: AnalyticsEventRecord[] = [
      {
        id: '1',
        eventName: 'page_view',
        sessionId: 'only-real',
        visitorId: 'v1',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: '2',
        eventName: 'home_page_view',
        sessionId: 'ghost-1',
        pagePath: '/',
        country: 'XX',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: '3',
        eventName: 'cart_add',
        sessionId: 'ghost-2',
        pagePath: '/buy-x',
        country: 'XX',
        createdAt: now,
        occurredAt: now,
      },
    ];
    const m = aggregatePeriod(events, sessions);
    expect(m.sessions).toBe(1);
    expect(m.landingSessions).toBe(1);
    expect(m.cartSessions).toBe(0);
    expect(m.pageViews).toBe(2);
    expect(m.legacyEventCount).toBe(2);
  });
});

/**
 * Regression: session milestone dedupe (session_started / landing_view / checkout).
 * Covers collect idempotency, funnel DISTINCT sessions, legacy isolation, market labels.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST as collectPost } from '@/app/api/analytics/collect/route';
import {
  getNativeAnalyticsViewModel,
} from '@/lib/admin/native-analytics/overview';
import { resetDuplicateGuardsForTests } from '@/lib/analytics/core/duplicate';
import {
  getOrCreateSessionId,
  resetNativeAnalyticsIdentityForTests,
  SESSION_INACTIVITY_MS,
} from '@/lib/analytics/native/identity';
import {
  analyticsMarketLocaleLabel,
  milestoneIdempotencyKey,
  resolveAnalyticsMarketLocale,
} from '@/lib/analytics/native/milestones';
import { recordServerAnalyticsEvent } from '@/lib/analytics/native/server-events';
import { getPersistence } from '@/lib/persistence';

function makeCollectRequest(events: Array<Record<string, unknown>>): Request {
  return new Request('http://localhost/api/analytics/collect', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
    },
    body: JSON.stringify({ events }),
  });
}

async function countEvents(sessionId: string, name: string): Promise<number> {
  const events = await getPersistence().listAnalyticsEvents(
    new Date(Date.now() - 86_400_000).toISOString(),
  );
  return events.filter((e) => e.sessionId === sessionId && e.eventName === name).length;
}

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

describe('milestone helpers', () => {
  it('builds deterministic keys and resolves market/locale paths', () => {
    expect(milestoneIdempotencyKey('abc', 'session_started')).toBe('session:abc:started');
    expect(milestoneIdempotencyKey('abc', 'landing_view')).toBe('session:abc:landing');
    expect(milestoneIdempotencyKey('abc', 'checkout_started')).toBe(
      'session:abc:checkout_started',
    );
    expect(resolveAnalyticsMarketLocale('/')).toEqual({ market: null, locale: 'en' });
    expect(resolveAnalyticsMarketLocale('/ca/buy-instagram-followers')).toEqual({
      market: 'ca',
      locale: 'en',
    });
    expect(resolveAnalyticsMarketLocale('/es/')).toEqual({ market: null, locale: 'es' });
    expect(analyticsMarketLocaleLabel('en')).toBe('Default / Global English');
    expect(analyticsMarketLocaleLabel('ca')).toBe('Canada');
    expect(analyticsMarketLocaleLabel('uk')).toBe('United Kingdom');
  });
});

describe('collect session milestones', () => {
  it('A: first page of a new session → 1 session, 1 started, 1 landing, 1 page_view', async () => {
    const sessionId = 'sid-new-a';
    const visitorId = 'vid-new-a';
    const res = await collectPost(
      makeCollectRequest([
        {
          eventName: 'session_started',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
          isNewSession: true,
        },
        {
          eventName: 'landing_view',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
        },
        {
          eventName: 'page_view',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
        },
      ]),
    );
    expect(res.status).toBe(200);

    const persistence = getPersistence();
    const sessions = (await persistence.listAnalyticsSessions?.(
      new Date(Date.now() - 60_000).toISOString(),
    )) ?? [];
    expect(sessions.filter((s) => s.id === sessionId)).toHaveLength(1);
    expect(await countEvents(sessionId, 'session_started')).toBe(1);
    expect(await countEvents(sessionId, 'landing_view')).toBe(1);
    expect(await countEvents(sessionId, 'page_view')).toBe(1);
  });

  it('B: second page same session → milestones stay 1, page_view becomes 2', async () => {
    const sessionId = 'sid-nav-b';
    const visitorId = 'vid-nav-b';
    await collectPost(
      makeCollectRequest([
        {
          eventName: 'session_started',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
        },
        {
          eventName: 'landing_view',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
        },
        {
          eventName: 'page_view',
          sessionId,
          visitorId,
          pagePath: '/',
          pageType: 'home',
        },
      ]),
    );
    await collectPost(
      makeCollectRequest([
        {
          eventName: 'session_started',
          sessionId,
          visitorId,
          pagePath: '/about',
          pageType: 'about',
        },
        {
          eventName: 'landing_view',
          sessionId,
          visitorId,
          pagePath: '/about',
          pageType: 'about',
        },
        {
          eventName: 'page_view',
          sessionId,
          visitorId,
          pagePath: '/about',
          pageType: 'about',
        },
      ]),
    );

    expect(await countEvents(sessionId, 'session_started')).toBe(1);
    expect(await countEvents(sessionId, 'landing_view')).toBe(1);
    expect(await countEvents(sessionId, 'page_view')).toBe(2);

    const sessions = (await getPersistence().listAnalyticsSessions?.(
      new Date(Date.now() - 60_000).toISOString(),
    )) ?? [];
    const row = sessions.find((s) => s.id === sessionId);
    expect(row?.landingPath).toBe('/');
  });

  it('C/D: hard refresh / remount remount milestones are dropped for existing session', async () => {
    const sessionId = 'sid-refresh-c';
    const visitorId = 'vid-refresh-c';
    await collectPost(
      makeCollectRequest([
        { eventName: 'session_started', sessionId, visitorId, pagePath: '/' },
        { eventName: 'landing_view', sessionId, visitorId, pagePath: '/' },
        { eventName: 'page_view', sessionId, visitorId, pagePath: '/' },
      ]),
    );
    // Simulate remount / hard refresh re-sending milestones + page_view
    await collectPost(
      makeCollectRequest([
        { eventName: 'session_started', sessionId, visitorId, pagePath: '/' },
        { eventName: 'landing_view', sessionId, visitorId, pagePath: '/' },
        { eventName: 'page_view', sessionId, visitorId, pagePath: '/' },
      ]),
    );
    expect(await countEvents(sessionId, 'session_started')).toBe(1);
    expect(await countEvents(sessionId, 'landing_view')).toBe(1);
    expect(await countEvents(sessionId, 'page_view')).toBe(2);
  });

  it('E: parallel collect requests do not duplicate session milestones', async () => {
    const sessionId = 'sid-parallel-e';
    const visitorId = 'vid-parallel-e';
    const payload = [
      { eventName: 'session_started', sessionId, visitorId, pagePath: '/' },
      { eventName: 'landing_view', sessionId, visitorId, pagePath: '/' },
      { eventName: 'page_view', sessionId, visitorId, pagePath: '/' },
    ];
    await Promise.all([
      collectPost(makeCollectRequest(payload)),
      collectPost(makeCollectRequest(payload)),
      collectPost(makeCollectRequest(payload)),
    ]);
    expect(await countEvents(sessionId, 'session_started')).toBe(1);
    expect(await countEvents(sessionId, 'landing_view')).toBe(1);

    const sessions = (await getPersistence().listAnalyticsSessions?.(
      new Date(Date.now() - 60_000).toISOString(),
    )) ?? [];
    expect(sessions.filter((s) => s.id === sessionId)).toHaveLength(1);
  });

  it('F: new session after expiry identity creates a new session id', () => {
    const s1 = getOrCreateSessionId();
    expect(s1.isNewSession).toBe(true);
    const s2 = getOrCreateSessionId();
    expect(s2.sessionId).toBe(s1.sessionId);
    expect(s2.isNewSession).toBe(false);

    resetNativeAnalyticsIdentityForTests();
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + SESSION_INACTIVITY_MS + 5_000);
    const s3 = getOrCreateSessionId();
    expect(s3.isNewSession).toBe(true);
    expect(s3.sessionId).not.toBe(s1.sessionId);
  });

  it('G/H: checkout_started is idempotent per session (rerender + revisit)', async () => {
    const sessionId = 'sid-checkout-g';
    const visitorId = 'vid-checkout-g';
    await collectPost(
      makeCollectRequest([
        { eventName: 'session_started', sessionId, visitorId, pagePath: '/' },
        { eventName: 'landing_view', sessionId, visitorId, pagePath: '/' },
        { eventName: 'page_view', sessionId, visitorId, pagePath: '/' },
      ]),
    );
    await collectPost(
      makeCollectRequest([
        { eventName: 'checkout_started', sessionId, visitorId, pagePath: '/checkout' },
      ]),
    );
    await collectPost(
      makeCollectRequest([
        { eventName: 'checkout_started', sessionId, visitorId, pagePath: '/checkout' },
        { eventName: 'checkout_started', sessionId, visitorId, pagePath: '/checkout' },
      ]),
    );
    expect(await countEvents(sessionId, 'checkout_started')).toBe(1);
  });

  it('I: two cart_add events stay raw=2 but funnel Cart sessions=1', async () => {
    const sessionId = 'sid-cart-i';
    const visitorId = 'vid-cart-i';
    const now = new Date().toISOString();
    const persistence = getPersistence();
    await persistence.upsertAnalyticsVisitor?.({
      id: visitorId,
      firstSeenAt: now,
      lastSeenAt: now,
    });
    await persistence.upsertAnalyticsSession?.({
      id: sessionId,
      visitorId,
      startedAt: now,
      lastActivityAt: now,
      landingPath: '/',
      countryCode: 'US',
      isBot: false,
    });
    await persistence.insertAnalyticsEvents([
      {
        id: 'lv-i',
        eventName: 'landing_view',
        sessionId,
        visitorId,
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'c1',
        eventName: 'cart_add',
        sessionId,
        visitorId,
        pagePath: '/buy-instagram-followers',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        serviceSlug: 'buy-instagram-followers',
      },
      {
        id: 'c2',
        eventName: 'cart_add',
        sessionId,
        visitorId,
        pagePath: '/buy-instagram-followers',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        serviceSlug: 'buy-instagram-followers',
      },
    ]);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.secondaryKpis.find((k) => k.id === 'cart_adds')?.value).toBe(2);
    expect(vm.funnel.find((s) => s.id === 'cart')?.sessions).toBe(1);
  });
});

describe('admin dashboard robustness', () => {
  it('J: historical duplicate milestones do not inflate Sessions/Landings', async () => {
    const now = new Date().toISOString();
    const persistence = getPersistence();
    await persistence.upsertAnalyticsVisitor?.({
      id: 'v-dup',
      firstSeenAt: now,
      lastSeenAt: now,
    });
    await persistence.upsertAnalyticsSession?.({
      id: 's-dup',
      visitorId: 'v-dup',
      startedAt: now,
      lastActivityAt: now,
      landingPath: '/',
      countryCode: 'US',
      isBot: false,
    });
    await persistence.insertAnalyticsEvents([
      {
        id: 'd1',
        eventName: 'session_started',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'd2',
        eventName: 'session_started',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'd3',
        eventName: 'landing_view',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'd4',
        eventName: 'landing_view',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'd5',
        eventName: 'landing_view',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
      {
        id: 'd6',
        eventName: 'landing_view',
        sessionId: 's-dup',
        visitorId: 'v-dup',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
      },
    ]);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.kpis.find((k) => k.id === 'sessions')?.value).toBe(1);
    expect(vm.funnel.find((s) => s.id === 'landing')?.sessions).toBe(1);
    expect(vm.preUpgradeNotice).toMatch(/early rollout duplicates/i);
  });

  it('K: legacy events do not corrupt canonical paid/revenue; landing uses legacy only without visitorId', async () => {
    const now = new Date().toISOString();
    const persistence = getPersistence();
    await persistence.insertAnalyticsEvents([
      {
        id: 'leg1',
        eventName: 'home_page_view',
        sessionId: 's-leg',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        // no visitorId → pre-upgrade
      },
      {
        id: 'leg2',
        eventName: 'purchase',
        sessionId: 's-leg',
        pagePath: '/order-success',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        properties: { orderId: 'should-ignore', amountMinor: 9999, currency: 'USD' },
      },
      {
        id: 'leg3',
        eventName: 'payment_paid',
        sessionId: 's-leg',
        visitorId: 'v-leg',
        pagePath: '/order-success',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        properties: { orderId: 'o-leg', amountMinor: 1500, currency: 'USD' },
      },
    ]);

    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    expect(vm.funnel.find((s) => s.id === 'landing')?.sessions).toBe(1);
    expect(vm.kpis.find((k) => k.id === 'paid_orders')?.value).toBe(1);
    expect(vm.kpis.find((k) => k.id === 'revenue')?.value).toBe('$15.00');
  });

  it('L: paid/revenue remains server-only and exactly once', async () => {
    const first = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_l',
      eventName: 'payment_paid',
      properties: { orderId: 'order_l', amountMinor: 4200, currency: 'USD' },
    });
    const second = await recordServerAnalyticsEvent({
      id: 'analytics:payment_paid:order_l',
      eventName: 'payment_paid',
      properties: { orderId: 'order_l', amountMinor: 4200, currency: 'USD' },
    });
    expect(first).toBe(true);
    expect(second).toBe(false);

    // Client spoof via collect is rejected (server-only name)
    await collectPost(
      makeCollectRequest([
        {
          eventName: 'payment_paid',
          sessionId: 'sid-spoof',
          visitorId: 'vid-spoof',
          pagePath: '/order-success',
        },
      ]),
    );
    const events = await getPersistence().listAnalyticsEvents(
      new Date(Date.now() - 60_000).toISOString(),
    );
    expect(events.filter((e) => e.eventName === 'payment_paid')).toHaveLength(1);
  });

  it('normalizes blank market/locale to Default / Global English', async () => {
    const now = new Date().toISOString();
    await getPersistence().insertAnalyticsEvents([
      {
        id: 'm1',
        eventName: 'page_view',
        sessionId: 's-m',
        visitorId: 'v-m',
        pagePath: '/',
        country: 'US',
        createdAt: now,
        occurredAt: now,
        market: null,
        locale: null,
      },
      {
        id: 'm2',
        eventName: 'page_view',
        sessionId: 's-m2',
        visitorId: 'v-m2',
        pagePath: '/ca/',
        country: 'CA',
        createdAt: now,
        occurredAt: now,
        market: 'ca',
        locale: 'en',
      },
    ]);
    const vm = await getNativeAnalyticsViewModel({ range: '30d' });
    const labels = vm.markets.map((r) => r.label);
    expect(labels).toContain('Default / Global English');
    expect(labels).toContain('Canada');
  });
});

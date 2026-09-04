/**
 * Native first-party admin analytics aggregation (UTC).
 */

import {
  CART_EVENT_NAMES,
  CHECKOUT_EVENT_NAMES,
  ORDER_CREATED_EVENT_NAMES,
} from '@/lib/analytics/funnel-events';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';
import type {
  NativeAnalyticsRangeId,
  NativeAnalyticsViewModel,
  NativeFunnelStage,
  NativeKpiCard,
  NativeSeriesPoint,
  NativeTableRow,
} from '@/types/admin-native-analytics';

const RANGE_LABELS: Record<Exclude<NativeAnalyticsRangeId, 'custom'>, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

const PAGE_VIEW_NAMES = new Set([
  'page_view',
  'landing_view',
  'service_view',
  'home_page_view',
  'service_page_view',
]);

const LANDING_SESSION_NAMES = new Set([
  'landing_view',
  'session_started',
  // Pre-upgrade: any page view counted as a session landing proxy
  'page_view',
  'home_page_view',
  'service_page_view',
  'service_view',
]);

function pct(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function changePct(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function eventTime(event: AnalyticsEventRecord): string {
  return event.occurredAt || event.createdAt;
}

function inRange(iso: string, sinceIso: string, untilIso: string): boolean {
  return iso >= sinceIso && iso <= untilIso;
}

export function parseNativeAnalyticsRange(
  raw: string | undefined | null,
): NativeAnalyticsRangeId {
  if (
    raw === 'today' ||
    raw === 'yesterday' ||
    raw === '7d' ||
    raw === '30d' ||
    raw === '90d' ||
    raw === 'custom'
  ) {
    return raw;
  }
  return '30d';
}

export function getNativeRangeBounds(
  range: NativeAnalyticsRangeId,
  options?: { from?: string | null; to?: string | null; now?: Date },
): { sinceIso: string; untilIso: string; label: string } {
  const now = options?.now ?? new Date();
  const until = new Date(now);
  const since = new Date(now);

  if (range === 'custom') {
    const fromRaw = options?.from?.trim();
    const toRaw = options?.to?.trim();
    const fromDate = fromRaw ? new Date(fromRaw) : null;
    const toDate = toRaw ? new Date(toRaw) : null;
    if (fromDate && !Number.isNaN(fromDate.getTime()) && toDate && !Number.isNaN(toDate.getTime())) {
      const start = fromDate <= toDate ? fromDate : toDate;
      const end = fromDate <= toDate ? toDate : fromDate;
      end.setUTCHours(23, 59, 59, 999);
      return {
        sinceIso: start.toISOString(),
        untilIso: end.toISOString(),
        label: `Custom (${start.toISOString().slice(0, 10)} → ${end.toISOString().slice(0, 10)})`,
      };
    }
    // Fall back to 30d if custom dates invalid
    since.setTime(since.getTime() - 30 * 24 * 60 * 60 * 1000);
    return { sinceIso: since.toISOString(), untilIso: until.toISOString(), label: RANGE_LABELS['30d'] };
  }

  if (range === 'today') {
    since.setUTCHours(0, 0, 0, 0);
    return { sinceIso: since.toISOString(), untilIso: until.toISOString(), label: RANGE_LABELS.today };
  }
  if (range === 'yesterday') {
    until.setUTCHours(0, 0, 0, 0);
    since.setTime(until.getTime() - 24 * 60 * 60 * 1000);
    const end = new Date(until.getTime() - 1);
    return {
      sinceIso: since.toISOString(),
      untilIso: end.toISOString(),
      label: RANGE_LABELS.yesterday,
    };
  }
  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  since.setTime(since.getTime() - days * 24 * 60 * 60 * 1000);
  return {
    sinceIso: since.toISOString(),
    untilIso: until.toISOString(),
    label: RANGE_LABELS[range],
  };
}

function previousEqualLengthBounds(
  sinceIso: string,
  untilIso: string,
): { sinceIso: string; untilIso: string } {
  const sinceMs = new Date(sinceIso).getTime();
  const untilMs = new Date(untilIso).getTime();
  const duration = Math.max(untilMs - sinceMs, 0);
  return {
    sinceIso: new Date(sinceMs - duration).toISOString(),
    untilIso: new Date(sinceMs - 1).toISOString(),
  };
}

function isLandingEvent(event: AnalyticsEventRecord): boolean {
  return LANDING_SESSION_NAMES.has(event.eventName);
}

function isCartEvent(event: AnalyticsEventRecord): boolean {
  return CART_EVENT_NAMES.has(event.eventName);
}

function isCheckoutEvent(event: AnalyticsEventRecord): boolean {
  return CHECKOUT_EVENT_NAMES.has(event.eventName);
}

function isOrderCreatedEvent(event: AnalyticsEventRecord): boolean {
  return ORDER_CREATED_EVENT_NAMES.has(event.eventName);
}

function isPageViewEvent(event: AnalyticsEventRecord): boolean {
  return PAGE_VIEW_NAMES.has(event.eventName);
}

function revenueMinorFromEvent(event: AnalyticsEventRecord): number {
  const props = event.properties ?? event.metadata ?? {};
  const amount = props.amountMinor;
  if (typeof amount === 'number' && Number.isFinite(amount) && amount >= 0) return amount;
  return 0;
}

function currencyFromEvent(event: AnalyticsEventRecord): string {
  const props = event.properties ?? event.metadata ?? {};
  const currency = props.currency;
  return typeof currency === 'string' ? currency.toUpperCase() : 'USD';
}

type PeriodMetrics = {
  visitors: number;
  sessions: number;
  pageViews: number;
  cartAdds: number;
  checkoutStarts: number;
  orderCreated: number;
  paidOrders: number;
  revenueUsdMinor: number;
  landingSessions: number;
  cartSessions: number;
  checkoutSessions: number;
  orderCreatedSessions: number;
  paidSessions: number;
};

function emptyMetrics(): PeriodMetrics {
  return {
    visitors: 0,
    sessions: 0,
    pageViews: 0,
    cartAdds: 0,
    checkoutStarts: 0,
    orderCreated: 0,
    paidOrders: 0,
    revenueUsdMinor: 0,
    landingSessions: 0,
    cartSessions: 0,
    checkoutSessions: 0,
    orderCreatedSessions: 0,
    paidSessions: 0,
  };
}

function aggregatePeriod(events: AnalyticsEventRecord[]): PeriodMetrics {
  const m = emptyMetrics();
  const visitors = new Set<string>();
  const sessions = new Set<string>();
  const landing = new Set<string>();
  const cart = new Set<string>();
  const checkout = new Set<string>();
  const orderCreated = new Set<string>();
  const paid = new Set<string>();
  const paidOrderIds = new Set<string>();

  for (const event of events) {
    sessions.add(event.sessionId);
    if (event.visitorId) visitors.add(event.visitorId);
    else visitors.add(`session:${event.sessionId}`);

    if (isPageViewEvent(event)) m.pageViews += 1;
    if (isCartEvent(event)) m.cartAdds += 1;
    if (isCheckoutEvent(event)) m.checkoutStarts += 1;

    if (isLandingEvent(event)) landing.add(event.sessionId);
    if (isCartEvent(event)) cart.add(event.sessionId);
    if (isCheckoutEvent(event)) checkout.add(event.sessionId);
    if (isOrderCreatedEvent(event)) {
      orderCreated.add(event.sessionId);
      m.orderCreated += 1;
    }
    if (event.eventName === 'payment_paid') {
      paid.add(event.sessionId);
      const orderId =
        typeof (event.properties ?? event.metadata)?.orderId === 'string'
          ? String((event.properties ?? event.metadata)?.orderId)
          : event.id;
      if (!paidOrderIds.has(orderId)) {
        paidOrderIds.add(orderId);
        // Revenue KPI labeled USD; non-USD amounts still counted as minor units for ops visibility.
        void currencyFromEvent(event);
        m.revenueUsdMinor += revenueMinorFromEvent(event);
      }
    }
  }

  m.visitors = visitors.size;
  m.sessions = sessions.size;
  m.landingSessions = landing.size || sessions.size;
  m.cartSessions = cart.size;
  m.checkoutSessions = checkout.size;
  m.orderCreatedSessions = orderCreated.size;
  m.paidSessions = paid.size;
  m.paidOrders = paidOrderIds.size;
  return m;
}

function kpi(
  id: string,
  label: string,
  value: number | string,
  previous: number | null,
  format: 'number' | 'percent' | 'money' = 'number',
): NativeKpiCard {
  const currentNum = typeof value === 'number' ? value : null;
  const formatted =
    format === 'money' && typeof value === 'number'
      ? `$${(value / 100).toFixed(2)}`
      : format === 'percent' && typeof value === 'number'
        ? `${value}%`
        : value;
  const prevFormatted =
    previous === null
      ? null
      : format === 'money'
        ? `$${(previous / 100).toFixed(2)}`
        : format === 'percent'
          ? `${previous}%`
          : previous;
  return {
    id,
    label,
    value: formatted,
    previousValue: prevFormatted,
    changePct:
      currentNum === null || previous === null ? null : changePct(currentNum, previous),
  };
}

function buildFunnel(m: PeriodMetrics): NativeFunnelStage[] {
  const stages: Array<Omit<NativeFunnelStage, 'conversionFromPrevious' | 'pctOfLandings' | 'dropOffFromPrevious'> & {
    sessions: number;
  }> = [
    { id: 'landing', label: 'Landing', sessions: m.landingSessions },
    { id: 'cart', label: 'Cart', sessions: m.cartSessions },
    { id: 'checkout', label: 'Checkout', sessions: m.checkoutSessions },
    { id: 'order_created', label: 'Order created', sessions: m.orderCreatedSessions },
    { id: 'paid', label: 'Paid', sessions: m.paidOrders || m.paidSessions },
  ];
  return stages.map((stage, index) => {
    const prev = index > 0 ? stages[index - 1]!.sessions : null;
    const conversionFromPrevious = prev === null ? null : pct(stage.sessions, prev);
    const dropOffFromPrevious =
      prev === null || prev <= 0 ? null : pct(Math.max(prev - stage.sessions, 0), prev);
    return {
      ...stage,
      conversionFromPrevious,
      pctOfLandings: pct(stage.sessions, m.landingSessions),
      dropOffFromPrevious,
    };
  });
}

function bucketKey(iso: string, hourly: boolean): string {
  if (hourly) return iso.slice(0, 13); // YYYY-MM-DDTHH
  return iso.slice(0, 10);
}

function bucketLabel(key: string, hourly: boolean): string {
  if (hourly) return `${key.slice(11, 13)}:00`;
  return key.slice(5); // MM-DD
}

function buildSeries(
  events: AnalyticsEventRecord[],
  sinceIso: string,
  untilIso: string,
  hourly: boolean,
): NativeSeriesPoint[] {
  const map = new Map<
    string,
    {
      visitors: Set<string>;
      sessions: Set<string>;
      pageViews: number;
      paidOrders: Set<string>;
      revenueUsdMinor: number;
    }
  >();

  const ensure = (key: string) => {
    let row = map.get(key);
    if (!row) {
      row = {
        visitors: new Set(),
        sessions: new Set(),
        pageViews: 0,
        paidOrders: new Set(),
        revenueUsdMinor: 0,
      };
      map.set(key, row);
    }
    return row;
  };

  // Seed empty buckets for chart continuity
  const start = new Date(sinceIso).getTime();
  const end = new Date(untilIso).getTime();
  const step = hourly ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  for (let t = start; t <= end; t += step) {
    ensure(bucketKey(new Date(t).toISOString(), hourly));
  }

  for (const event of events) {
    const key = bucketKey(eventTime(event), hourly);
    const row = ensure(key);
    row.sessions.add(event.sessionId);
    row.visitors.add(event.visitorId || `session:${event.sessionId}`);
    if (isPageViewEvent(event)) row.pageViews += 1;
    if (event.eventName === 'payment_paid') {
      const orderId =
        typeof (event.properties ?? event.metadata)?.orderId === 'string'
          ? String((event.properties ?? event.metadata)?.orderId)
          : event.id;
      if (!row.paidOrders.has(orderId)) {
        row.paidOrders.add(orderId);
        row.revenueUsdMinor += revenueMinorFromEvent(event);
      }
    }
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, row]) => ({
      key,
      label: bucketLabel(key, hourly),
      visitors: row.visitors.size,
      sessions: row.sessions.size,
      pageViews: row.pageViews,
      paidOrders: row.paidOrders.size,
      revenueUsdMinor: row.revenueUsdMinor,
    }));
}

function classifyAcquisition(event: AnalyticsEventRecord): string {
  if (event.campaign || event.source || event.medium) {
    return `Campaign · ${(event.source || event.medium || 'campaign').toLowerCase()}`;
  }
  const ref = event.referrer?.trim();
  if (!ref) return 'Direct';
  try {
    const host = new URL(ref).hostname.toLowerCase().replace(/^www\./, '');
    if (/google\.|bing\.|duckduckgo\.|yahoo\./.test(host)) return `Organic · ${host.split('.')[0]}`;
    if (/instagram\.|facebook\.|tiktok\.|twitter\.|x\.com|linkedin\.|reddit\.|youtube\./.test(host)) {
      return `Social · ${host}`;
    }
    return `Referral · ${host}`;
  } catch {
    return 'Referral';
  }
}

function buildGroupedTable(
  events: AnalyticsEventRecord[],
  keyFn: (event: AnalyticsEventRecord) => string | null,
  labelFn?: (key: string) => string,
): NativeTableRow[] {
  const map = new Map<
    string,
    {
      sessions: Set<string>;
      visitors: Set<string>;
      pageViews: number;
      paidOrders: Set<string>;
      revenueUsdMinor: number;
    }
  >();

  for (const event of events) {
    const key = keyFn(event);
    if (!key) continue;
    let row = map.get(key);
    if (!row) {
      row = {
        sessions: new Set(),
        visitors: new Set(),
        pageViews: 0,
        paidOrders: new Set(),
        revenueUsdMinor: 0,
      };
      map.set(key, row);
    }
    row.sessions.add(event.sessionId);
    row.visitors.add(event.visitorId || `session:${event.sessionId}`);
    if (isPageViewEvent(event)) row.pageViews += 1;
    if (event.eventName === 'payment_paid') {
      const orderId =
        typeof (event.properties ?? event.metadata)?.orderId === 'string'
          ? String((event.properties ?? event.metadata)?.orderId)
          : event.id;
      if (!row.paidOrders.has(orderId)) {
        row.paidOrders.add(orderId);
        row.revenueUsdMinor += revenueMinorFromEvent(event);
      }
    }
  }

  return [...map.entries()]
    .map(([key, row]) => ({
      key,
      label: labelFn ? labelFn(key) : key,
      sessions: row.sessions.size,
      visitors: row.visitors.size,
      pageViews: row.pageViews,
      paidOrders: row.paidOrders.size,
      revenueUsdMinor: row.revenueUsdMinor,
    }))
    .sort((a, b) => b.sessions - a.sessions || a.label.localeCompare(b.label))
    .slice(0, 25);
}

export async function getNativeAnalyticsViewModel(input?: {
  range?: string | null;
  from?: string | null;
  to?: string | null;
}): Promise<NativeAnalyticsViewModel> {
  const range = parseNativeAnalyticsRange(input?.range);
  const bounds = getNativeRangeBounds(range, {
    from: input?.from,
    to: input?.to,
  });
  const effectiveRange = range === 'custom' && bounds.label.startsWith('Custom') ? 'custom' : range === 'custom' ? '30d' : range;
  const prevBounds = previousEqualLengthBounds(bounds.sinceIso, bounds.untilIso);
  const persistence = getPersistence();

  let allEvents: AnalyticsEventRecord[] = [];
  let setupNotice: string | undefined;
  try {
    // Load from start of previous period so we can compare.
    allEvents = await persistence.listAnalyticsEvents(prevBounds.sinceIso);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[native-analytics] listAnalyticsEvents failed:', message);
    setupNotice = /relation|does not exist|analytics_events/i.test(message)
      ? 'Analytics table is missing. Run drizzle/0003_analytics_events.sql and drizzle/0008_analytics_upgrade.sql, then refresh.'
      : 'Analytics event store is temporarily unavailable.';
    allEvents = [];
  }

  const currentEvents = allEvents.filter((e) =>
    inRange(eventTime(e), bounds.sinceIso, bounds.untilIso),
  );
  const previousEvents = allEvents.filter((e) =>
    inRange(eventTime(e), prevBounds.sinceIso, prevBounds.untilIso),
  );

  const current = aggregatePeriod(currentEvents);
  const previous = aggregatePeriod(previousEvents);

  const sessionToPaid =
    current.sessions > 0 ? pct(current.paidOrders, current.sessions) : null;
  const prevSessionToPaid =
    previous.sessions > 0 ? pct(previous.paidOrders, previous.sessions) : null;
  const aov =
    current.paidOrders > 0 ? Math.round(current.revenueUsdMinor / current.paidOrders) : 0;
  const prevAov =
    previous.paidOrders > 0 ? Math.round(previous.revenueUsdMinor / previous.paidOrders) : 0;

  const cartAbandonment =
    current.cartSessions > 0
      ? pct(Math.max(current.cartSessions - current.checkoutSessions, 0), current.cartSessions)
      : null;
  const prevCartAbandonment =
    previous.cartSessions > 0
      ? pct(Math.max(previous.cartSessions - previous.checkoutSessions, 0), previous.cartSessions)
      : null;
  const checkoutAbandonment =
    current.checkoutSessions > 0
      ? pct(Math.max(current.checkoutSessions - current.paidOrders, 0), current.checkoutSessions)
      : null;
  const prevCheckoutAbandonment =
    previous.checkoutSessions > 0
      ? pct(Math.max(previous.checkoutSessions - previous.paidOrders, 0), previous.checkoutSessions)
      : null;

  const kpis: NativeKpiCard[] = [
    kpi('visitors', 'Visitors', current.visitors, previous.visitors),
    kpi('sessions', 'Sessions', current.sessions, previous.sessions),
    kpi('page_views', 'Page views', current.pageViews, previous.pageViews),
    kpi('paid_orders', 'Paid orders', current.paidOrders, previous.paidOrders),
    kpi('revenue', 'Revenue (USD)', current.revenueUsdMinor, previous.revenueUsdMinor, 'money'),
    {
      id: 'conversion',
      label: 'Session → Paid',
      value: sessionToPaid === null ? '—' : `${sessionToPaid}%`,
      previousValue: prevSessionToPaid === null ? null : `${prevSessionToPaid}%`,
      changePct:
        sessionToPaid === null || prevSessionToPaid === null
          ? null
          : changePct(sessionToPaid, prevSessionToPaid),
    },
    kpi('aov', 'AOV (USD)', aov, previous.paidOrders > 0 ? prevAov : null, 'money'),
  ];

  const secondaryKpis: NativeKpiCard[] = [
    kpi('cart_adds', 'Cart adds', current.cartAdds, previous.cartAdds),
    kpi('checkout_starts', 'Checkout starts', current.checkoutStarts, previous.checkoutStarts),
    {
      id: 'cart_abandonment',
      label: 'Cart abandonment',
      value: cartAbandonment === null ? '—' : `${cartAbandonment}%`,
      previousValue: prevCartAbandonment === null ? null : `${prevCartAbandonment}%`,
      changePct:
        cartAbandonment === null || prevCartAbandonment === null
          ? null
          : changePct(cartAbandonment, prevCartAbandonment),
    },
    {
      id: 'checkout_abandonment',
      label: 'Checkout abandonment',
      value: checkoutAbandonment === null ? '—' : `${checkoutAbandonment}%`,
      previousValue: prevCheckoutAbandonment === null ? null : `${prevCheckoutAbandonment}%`,
      changePct:
        checkoutAbandonment === null || prevCheckoutAbandonment === null
          ? null
          : changePct(checkoutAbandonment, prevCheckoutAbandonment),
    },
  ];

  const hourly = effectiveRange === 'today' || effectiveRange === 'yesterday';
  const series = buildSeries(currentEvents, bounds.sinceIso, bounds.untilIso, hourly);

  const acquisition = buildGroupedTable(currentEvents, (e) => classifyAcquisition(e));
  const services = buildGroupedTable(
    currentEvents,
    (e) => e.serviceSlug?.trim() || null,
  );
  const markets = buildGroupedTable(
    currentEvents,
    (e) => (e.market?.trim() || e.locale?.trim() || null),
    (key) => key.toUpperCase(),
  );
  const devices = buildGroupedTable(
    currentEvents,
    (e) => e.deviceType?.trim() || 'unknown',
    (key) => key.charAt(0).toUpperCase() + key.slice(1),
  );

  const recentSince = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const recentEvents = allEvents.filter((e) => eventTime(e) >= recentSince);
  const recent = aggregatePeriod(recentEvents);

  const hasPreUpgrade = currentEvents.some((e) => !e.visitorId);
  const preUpgradeNotice = hasPreUpgrade
    ? 'This range includes events from before the native visitor/session upgrade. Some KPIs (visitors, UTM, device, revenue) may be incomplete versus new tracking.'
    : undefined;

  return {
    range: effectiveRange,
    rangeLabel: bounds.label,
    timezoneLabel: 'UTC',
    sinceIso: bounds.sinceIso,
    untilIso: bounds.untilIso,
    customFrom: input?.from ?? undefined,
    customTo: input?.to ?? undefined,
    kpis,
    secondaryKpis,
    funnel: buildFunnel(current),
    series,
    acquisition,
    services,
    markets,
    devices,
    recent: {
      windowMinutes: 30,
      sessions: recent.sessions,
      pageViews: recent.pageViews,
      cartAdds: recent.cartAdds,
      checkouts: recent.checkoutStarts,
      paidOrders: recent.paidOrders,
    },
    eventCount: currentEvents.length,
    storageDriver: persistence.driver,
    preUpgradeNotice,
    setupNotice,
  };
}

/** @deprecated Prefer getNativeAnalyticsViewModel — kept for compatibility. */
export { getNativeAnalyticsViewModel as getFunnelAnalyticsViewModelNative };

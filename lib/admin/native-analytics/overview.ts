/**
 * Native first-party admin analytics aggregation (UTC).
 *
 * Session-based metrics (Sessions, Landing, Funnel, Acquisition, Markets,
 * Devices) use ONLY real analytics_sessions rows (or events whose session_id
 * exists in that set). Legacy analytics_events without a native session must
 * NOT invent pseudo-sessions.
 *
 * Page Views may still include historical page_view / home_page_view /
 * service_page_view rows for continuity — documented in the UI notice.
 *
 * Paid / revenue remain server-only (payment_paid), distinct by orderId.
 */

import {
  CART_EVENT_NAMES,
  CHECKOUT_EVENT_NAMES,
  ORDER_CREATED_EVENT_NAMES,
} from '@/lib/analytics/funnel-events';
import { analyticsMarketLocaleLabel } from '@/lib/analytics/native/milestones';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord, AnalyticsSessionRecord } from '@/lib/persistence/types';
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

/**
 * Page-view event names for the Page Views KPI / charts.
 * Includes historical aliases for continuity — NOT used as session proxies.
 */
const PAGE_VIEW_NAMES = new Set([
  'page_view',
  'service_view',
  'home_page_view',
  'service_page_view',
]);

const SERVICE_VIEW_NAMES = new Set(['service_view', 'service_page_view']);

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

function isServiceViewEvent(event: AnalyticsEventRecord): boolean {
  return SERVICE_VIEW_NAMES.has(event.eventName);
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

function marketLocaleKeyFromSession(session: AnalyticsSessionRecord): string {
  const market = session.market?.trim();
  if (market) return market.toLowerCase();
  const locale = session.locale?.trim();
  if (locale && locale.toLowerCase() !== 'en') return locale.toLowerCase();
  return 'en';
}

/** Session-first acquisition label (each session counted once). */
export function classifySessionAcquisition(session: AnalyticsSessionRecord): string {
  if (session.utmCampaign || session.utmSource || session.utmMedium) {
    return `Campaign · ${(session.utmSource || session.utmMedium || 'campaign').toLowerCase()}`;
  }
  const channel = session.sourceChannel?.trim().toLowerCase();
  if (channel && channel !== 'direct' && channel !== 'unknown') {
    if (channel === 'organic') return 'Organic';
    if (channel === 'social') return 'Social';
    if (channel === 'referral') return 'Referral';
    if (channel === 'campaign') return 'Campaign';
    return channel.charAt(0).toUpperCase() + channel.slice(1);
  }
  const ref = session.referrer?.trim();
  if (!ref) return 'Direct';
  try {
    const host = new URL(ref).hostname.toLowerCase().replace(/^www\./, '');
    if (/google\.|bing\.|duckduckgo\.|yahoo\./.test(host)) {
      return `Organic · ${host.split('.')[0]}`;
    }
    if (/instagram\.|facebook\.|tiktok\.|twitter\.|x\.com|linkedin\.|reddit\.|youtube\./.test(host)) {
      return `Social · ${host}`;
    }
    return `Referral · ${host}`;
  } catch {
    return 'Referral';
  }
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
  serviceSessions: number;
  cartSessions: number;
  checkoutSessions: number;
  orderCreatedSessions: number;
  paidSessions: number;
  legacyEventCount: number;
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
    serviceSessions: 0,
    cartSessions: 0,
    checkoutSessions: 0,
    orderCreatedSessions: 0,
    paidSessions: 0,
    legacyEventCount: 0,
  };
}

/**
 * Aggregate a period.
 * When analytics_sessions rows exist, they are the sole session universe.
 * Events whose session_id is not in that set never create session metrics.
 */
export function aggregatePeriod(
  events: AnalyticsEventRecord[],
  sessionRows: AnalyticsSessionRecord[],
): PeriodMetrics {
  const m = emptyMetrics();
  const validSessionIds = new Set(sessionRows.map((s) => s.id));
  const hasNativeSessions = validSessionIds.size > 0;

  const visitors = new Set<string>();
  const service = new Set<string>();
  const cart = new Set<string>();
  const checkout = new Set<string>();
  const orderCreated = new Set<string>();
  const paid = new Set<string>();
  const paidOrderIds = new Set<string>();

  if (hasNativeSessions) {
    for (const session of sessionRows) {
      visitors.add(session.visitorId);
    }
    m.sessions = validSessionIds.size;
    // Every real analytics_sessions row has exactly one landing.
    m.landingSessions = validSessionIds.size;
    m.visitors = visitors.size;
  }

  for (const event of events) {
    const sid = event.sessionId?.trim() || '';
    const linkedToNative = hasNativeSessions && sid !== '' && validSessionIds.has(sid);
    const isLegacyOrUnlinked = !linkedToNative;

    if (isLegacyOrUnlinked) {
      m.legacyEventCount += 1;
    }

    // Page Views: historical + native event counts (never treated as sessions).
    if (isPageViewEvent(event)) {
      m.pageViews += 1;
    }

    // Paid / revenue: server-only events, distinct by orderId — not session-fabricated.
    if (event.eventName === 'payment_paid') {
      const orderId =
        typeof (event.properties ?? event.metadata)?.orderId === 'string'
          ? String((event.properties ?? event.metadata)?.orderId)
          : event.id;
      if (!paidOrderIds.has(orderId)) {
        paidOrderIds.add(orderId);
        void currencyFromEvent(event);
        m.revenueUsdMinor += revenueMinorFromEvent(event);
      }
      if (linkedToNative) {
        paid.add(sid);
      }
    }

    if (!linkedToNative) {
      continue;
    }

    if (isServiceViewEvent(event)) service.add(sid);
    if (isCartEvent(event)) {
      cart.add(sid);
      m.cartAdds += 1;
    }
    if (isCheckoutEvent(event)) checkout.add(sid);
    if (isOrderCreatedEvent(event)) {
      orderCreated.add(sid);
      m.orderCreated += 1;
    }
  }

  m.serviceSessions = service.size;
  m.cartSessions = cart.size;
  m.checkoutSessions = checkout.size;
  m.checkoutStarts = checkout.size;
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

/**
 * Reach-based funnel (sessions may skip Service / Cart).
 * Never emit >100% "from previous" — return null when a later stage exceeds the prior
 * (skippable stage), so the UI does not imply an impossible sequential conversion.
 */
export function buildFunnel(m: PeriodMetrics): NativeFunnelStage[] {
  const stages: Array<
    Omit<NativeFunnelStage, 'conversionFromPrevious' | 'pctOfLandings' | 'dropOffFromPrevious'> & {
      sessions: number;
    }
  > = [
    { id: 'landing', label: 'Landing', sessions: m.landingSessions },
    { id: 'service', label: 'Service view', sessions: m.serviceSessions },
    { id: 'cart', label: 'Cart', sessions: m.cartSessions },
    { id: 'checkout', label: 'Checkout', sessions: m.checkoutSessions },
    { id: 'order_created', label: 'Order created', sessions: m.orderCreatedSessions },
    { id: 'paid', label: 'Paid', sessions: m.paidOrders || m.paidSessions },
  ];
  return stages.map((stage, index) => {
    const prev = index > 0 ? stages[index - 1]!.sessions : null;
    let conversionFromPrevious: number | null = null;
    let dropOffFromPrevious: number | null = null;
    if (prev !== null && prev > 0) {
      if (stage.sessions <= prev) {
        conversionFromPrevious = pct(stage.sessions, prev);
        dropOffFromPrevious = pct(Math.max(prev - stage.sessions, 0), prev);
      }
      // else: skippable stage / non-strict funnel — omit invalid >100% rate
    }
    return {
      ...stage,
      conversionFromPrevious,
      pctOfLandings: pct(stage.sessions, m.landingSessions),
      dropOffFromPrevious,
    };
  });
}

function bucketKey(iso: string, hourly: boolean): string {
  if (hourly) return iso.slice(0, 13);
  return iso.slice(0, 10);
}

function bucketLabel(key: string, hourly: boolean): string {
  if (hourly) return `${key.slice(11, 13)}:00`;
  return key.slice(5);
}

function buildSeries(
  events: AnalyticsEventRecord[],
  sessionRows: AnalyticsSessionRecord[],
  sinceIso: string,
  untilIso: string,
  hourly: boolean,
): NativeSeriesPoint[] {
  const validSessionIds = new Set(sessionRows.map((s) => s.id));
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

  const start = new Date(sinceIso).getTime();
  const end = new Date(untilIso).getTime();
  const step = hourly ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  for (let t = start; t <= end; t += step) {
    ensure(bucketKey(new Date(t).toISOString(), hourly));
  }

  for (const session of sessionRows) {
    const key = bucketKey(session.startedAt, hourly);
    const row = ensure(key);
    row.sessions.add(session.id);
    row.visitors.add(session.visitorId);
  }

  for (const event of events) {
    const key = bucketKey(eventTime(event), hourly);
    const row = ensure(key);
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
    // Never add legacy/unlinked event.sessionId into chart session counts.
    void validSessionIds;
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

type GroupBucket = {
  sessions: Set<string>;
  visitors: Set<string>;
  pageViews: number;
  paidOrders: Set<string>;
  revenueUsdMinor: number;
};

function finalizeGroupedTable(
  map: Map<string, GroupBucket>,
  labelFn?: (key: string) => string,
): NativeTableRow[] {
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

function emptyBucket(): GroupBucket {
  return {
    sessions: new Set(),
    visitors: new Set(),
    pageViews: 0,
    paidOrders: new Set(),
    revenueUsdMinor: 0,
  };
}

/** Acquisition / markets / devices — one row contribution per analytics_sessions row. */
function buildSessionAttributeTable(
  sessionRows: AnalyticsSessionRecord[],
  keyFn: (session: AnalyticsSessionRecord) => string | null,
  labelFn?: (key: string) => string,
): NativeTableRow[] {
  const map = new Map<string, GroupBucket>();
  for (const session of sessionRows) {
    const key = keyFn(session);
    if (!key) continue;
    let row = map.get(key);
    if (!row) {
      row = emptyBucket();
      map.set(key, row);
    }
    row.sessions.add(session.id);
    row.visitors.add(session.visitorId);
  }
  return finalizeGroupedTable(map, labelFn);
}

/**
 * Services: page views from all events (incl. historical);
 * sessions / paid only for events linked to a real analytics_sessions id.
 */
function buildServicesTable(
  events: AnalyticsEventRecord[],
  validSessionIds: Set<string>,
): NativeTableRow[] {
  const map = new Map<string, GroupBucket>();
  const hasNative = validSessionIds.size > 0;

  for (const event of events) {
    const slug = event.serviceSlug?.trim();
    if (!slug) continue;
    let row = map.get(slug);
    if (!row) {
      row = emptyBucket();
      map.set(slug, row);
    }
    if (isPageViewEvent(event) || isServiceViewEvent(event)) {
      row.pageViews += 1;
    }
    const sid = event.sessionId?.trim() || '';
    if (hasNative && sid && validSessionIds.has(sid)) {
      row.sessions.add(sid);
      if (event.visitorId) row.visitors.add(event.visitorId);
    }
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

  return finalizeGroupedTable(map);
}

/** Attach page-view / paid counts from linked events onto session-keyed tables. */
function enrichSessionTablesWithEvents(
  rows: NativeTableRow[],
  sessionRows: AnalyticsSessionRecord[],
  events: AnalyticsEventRecord[],
  keyFn: (session: AnalyticsSessionRecord) => string | null,
): NativeTableRow[] {
  const sessionKey = new Map<string, string>();
  for (const session of sessionRows) {
    const key = keyFn(session);
    if (key) sessionKey.set(session.id, key);
  }
  const byKey = new Map(rows.map((r) => [r.key, { ...r }]));

  for (const event of events) {
    const sid = event.sessionId?.trim() || '';
    const key = sid ? sessionKey.get(sid) : undefined;
    if (!key) continue;
    const row = byKey.get(key);
    if (!row) continue;
    if (isPageViewEvent(event)) {
      row.pageViews = (row.pageViews ?? 0) + 1;
    }
    if (event.eventName === 'payment_paid') {
      // Paid already counted at order level in aggregate; per-dimension paid via order ids
      // is approximate here — count once per event id to avoid double-count noise.
      row.paidOrders = (row.paidOrders ?? 0) + 0;
      void event;
    }
  }

  // Recompute paid/revenue per dimension from events linked to sessions in that bucket.
  for (const row of byKey.values()) {
    row.paidOrders = 0;
    row.revenueUsdMinor = 0;
  }
  const paidSeen = new Map<string, Set<string>>();
  for (const event of events) {
    if (event.eventName !== 'payment_paid') continue;
    const sid = event.sessionId?.trim() || '';
    const key = sid ? sessionKey.get(sid) : undefined;
    if (!key) continue;
    const row = byKey.get(key);
    if (!row) continue;
    const orderId =
      typeof (event.properties ?? event.metadata)?.orderId === 'string'
        ? String((event.properties ?? event.metadata)?.orderId)
        : event.id;
    let seen = paidSeen.get(key);
    if (!seen) {
      seen = new Set();
      paidSeen.set(key, seen);
    }
    if (seen.has(orderId)) continue;
    seen.add(orderId);
    row.paidOrders = (row.paidOrders ?? 0) + 1;
    row.revenueUsdMinor = (row.revenueUsdMinor ?? 0) + revenueMinorFromEvent(event);
  }

  return [...byKey.values()].sort(
    (a, b) => b.sessions - a.sessions || a.label.localeCompare(b.label),
  );
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
  const effectiveRange =
    range === 'custom' && bounds.label.startsWith('Custom')
      ? 'custom'
      : range === 'custom'
        ? '30d'
        : range;
  const prevBounds = previousEqualLengthBounds(bounds.sinceIso, bounds.untilIso);
  const persistence = getPersistence();

  let allEvents: AnalyticsEventRecord[] = [];
  let allSessions: AnalyticsSessionRecord[] = [];
  let setupNotice: string | undefined;
  try {
    allEvents = await persistence.listAnalyticsEvents(prevBounds.sinceIso);
    if (persistence.listAnalyticsSessions) {
      allSessions = await persistence.listAnalyticsSessions(prevBounds.sinceIso);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[native-analytics] listAnalyticsEvents failed:', message);
    setupNotice = /relation|does not exist|analytics_events/i.test(message)
      ? 'Analytics table is missing. Run drizzle/0003_analytics_events.sql, drizzle/0008_analytics_upgrade.sql, and drizzle/0009_analytics_milestone_idempotency.sql, then refresh.'
      : 'Analytics event store is temporarily unavailable.';
    allEvents = [];
  }

  const currentEvents = allEvents.filter((e) =>
    inRange(eventTime(e), bounds.sinceIso, bounds.untilIso),
  );
  const previousEvents = allEvents.filter((e) =>
    inRange(eventTime(e), prevBounds.sinceIso, prevBounds.untilIso),
  );
  const currentSessions = allSessions.filter((s) =>
    inRange(s.startedAt, bounds.sinceIso, bounds.untilIso),
  );
  const previousSessions = allSessions.filter((s) =>
    inRange(s.startedAt, prevBounds.sinceIso, prevBounds.untilIso),
  );

  const current = aggregatePeriod(currentEvents, currentSessions);
  const previous = aggregatePeriod(previousEvents, previousSessions);
  const validSessionIds = new Set(currentSessions.map((s) => s.id));

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
    kpi('checkout_starts', 'Checkout sessions', current.checkoutStarts, previous.checkoutStarts),
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
  const series = buildSeries(
    currentEvents,
    currentSessions,
    bounds.sinceIso,
    bounds.untilIso,
    hourly,
  );

  const acquisitionBase = buildSessionAttributeTable(
    currentSessions,
    (s) => classifySessionAcquisition(s),
  );
  const acquisition = enrichSessionTablesWithEvents(
    acquisitionBase,
    currentSessions,
    currentEvents,
    (s) => classifySessionAcquisition(s),
  );

  const marketsBase = buildSessionAttributeTable(
    currentSessions,
    (s) => marketLocaleKeyFromSession(s),
    (key) => analyticsMarketLocaleLabel(key),
  );
  const markets = enrichSessionTablesWithEvents(
    marketsBase,
    currentSessions,
    currentEvents,
    (s) => marketLocaleKeyFromSession(s),
  );

  const devicesBase = buildSessionAttributeTable(
    currentSessions,
    (s) => s.deviceType?.trim().toLowerCase() || 'unknown',
    (key) => key.charAt(0).toUpperCase() + key.slice(1),
  );
  const devices = enrichSessionTablesWithEvents(
    devicesBase,
    currentSessions,
    currentEvents,
    (s) => s.deviceType?.trim().toLowerCase() || 'unknown',
  );

  const services = buildServicesTable(currentEvents, validSessionIds);

  const recentSince = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const recentEvents = allEvents.filter((e) => eventTime(e) >= recentSince);
  const recentSessions = allSessions.filter((s) => s.startedAt >= recentSince);
  const recent = aggregatePeriod(recentEvents, recentSessions);

  const notices: string[] = [];
  if (current.legacyEventCount > 0) {
    notices.push(
      'Historical events collected before native visitor/session tracking may have incomplete visitor/session attribution. Session, funnel, acquisition, market, and device metrics use analytics_sessions only — legacy event rows are not invented into sessions. Page Views may still include historical page_view rows for continuity.',
    );
  }
  const hasDuplicateMilestones = (() => {
    const counts = new Map<string, number>();
    for (const e of currentEvents) {
      if (e.eventName !== 'session_started' && e.eventName !== 'landing_view') continue;
      if (!validSessionIds.has(e.sessionId)) continue;
      const key = `${e.sessionId}:${e.eventName}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.values()].some((n) => n > 1);
  })();
  if (hasDuplicateMilestones) {
    notices.push(
      'Raw event table contains early rollout duplicates of session_started/landing_view, but dashboard metrics dedupe sessions and future events are idempotent.',
    );
  }
  const preUpgradeNotice = notices.length ? notices.join(' ') : undefined;

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

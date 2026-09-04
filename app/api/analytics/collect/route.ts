import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

import {
  classifyReferrer,
  classifyUserAgent,
  parseUtmFromSearch,
} from '@/lib/analytics/native/attribution';
import {
  canonicalizeClientEventName,
  eventCategoryFor,
  isExcludedAnalyticsPath,
  isLikelyBotUserAgent,
  isServerAnalyticsEvent,
} from '@/lib/analytics/native/taxonomy';
import { resolveCountryFromHeaders } from '@/lib/analytics/funnel-events';
import { getPersistence } from '@/lib/persistence';
import type {
  AnalyticsEventRecord,
  AnalyticsSessionRecord,
  AnalyticsVisitorRecord,
} from '@/lib/persistence/types';

export const runtime = 'nodejs';

const MAX_BATCH = 25;
const MAX_PATH_LEN = 200;
const MAX_SESSION_LEN = 80;
const MAX_VISITOR_LEN = 80;
const WINDOW_MS = 60_000;
const MAX_BATCHES_PER_WINDOW = 60;
const MAX_BODY_BYTES = 64_000;

type IngestEvent = {
  eventName?: string;
  sessionId?: string;
  visitorId?: string;
  pagePath?: string;
  pageType?: string;
  eventId?: string;
  timestamp?: string;
  referrer?: string;
  market?: string;
  locale?: string;
  serviceSlug?: string;
  packageId?: string;
  search?: string;
  isNewSession?: boolean;
  metadata?: Record<string, unknown>;
};

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  return createHash('sha256').update(`analytics:${ip}`).digest('hex').slice(0, 24);
}

function allowRequest(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_BATCHES_PER_WINDOW) return false;
  bucket.count += 1;
  return true;
}

function sanitizeProps(
  input: Record<string, unknown> | undefined,
): Record<string, string | number | boolean | null> | undefined {
  if (!input || typeof input !== 'object') return undefined;
  const blocked = /email|password|token|secret|card|whatsapp|phone|name|username/i;
  const out: Record<string, string | number | boolean | null> = {};
  let count = 0;
  for (const [key, value] of Object.entries(input)) {
    if (count >= 16) break;
    if (!/^[a-zA-Z0-9_]{1,40}$/.test(key)) continue;
    if (blocked.test(key)) continue;
    if (value === null || typeof value === 'boolean') {
      out[key] = value;
      count += 1;
      continue;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      out[key] = value;
      count += 1;
      continue;
    }
    if (typeof value === 'string') {
      out[key] = value.slice(0, 120);
      count += 1;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ae_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get('cookie') || '';
  const match = raw.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (!allowRequest(key)) {
    return NextResponse.json({ ok: false, error: 'Rate limited' }, { status: 429 });
  }

  const ua = request.headers.get('user-agent');
  if (isLikelyBotUserAgent(ua)) {
    return NextResponse.json({ ok: true, accepted: 0, filtered: 'bot' });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Body too large' }, { status: 413 });
  }

  let body: { events?: IngestEvent[] };
  try {
    body = (await request.json()) as { events?: IngestEvent[] };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.events) || body.events.length === 0) {
    return NextResponse.json({ ok: false, error: 'No events' }, { status: 400 });
  }

  const country = resolveCountryFromHeaders(request.headers);
  const device = classifyUserAgent(ua);
  const nowIso = new Date().toISOString();
  const records: AnalyticsEventRecord[] = [];
  const visitors = new Map<string, AnalyticsVisitorRecord>();
  const sessions = new Map<string, AnalyticsSessionRecord>();

  for (const raw of body.events.slice(0, MAX_BATCH)) {
    const rawName = typeof raw.eventName === 'string' ? raw.eventName.trim() : '';
    if (isServerAnalyticsEvent(rawName)) continue;
    const eventName = canonicalizeClientEventName(rawName);
    if (!eventName) continue;

    let sessionId = typeof raw.sessionId === 'string' ? raw.sessionId.trim() : '';
    let visitorId = typeof raw.visitorId === 'string' ? raw.visitorId.trim() : '';
    if (!sessionId) sessionId = readCookie(request, 'nl_session_id') || '';
    if (!visitorId) visitorId = readCookie(request, 'nl_visitor_id') || '';
    if (!sessionId || sessionId.length > MAX_SESSION_LEN) continue;
    if (visitorId && visitorId.length > MAX_VISITOR_LEN) visitorId = '';

    const pagePath = typeof raw.pagePath === 'string' ? raw.pagePath.trim() : '';
    if (!pagePath || pagePath.length > MAX_PATH_LEN || !pagePath.startsWith('/')) continue;
    if (isExcludedAnalyticsPath(pagePath)) continue;

    let createdAt = nowIso;
    if (typeof raw.timestamp === 'string') {
      const parsed = Date.parse(raw.timestamp);
      if (Number.isFinite(parsed)) {
        const age = Date.now() - parsed;
        if (age >= -60_000 && age <= 86_400_000 * 2) {
          createdAt = new Date(parsed).toISOString();
        }
      }
    }

    const id =
      typeof raw.eventId === 'string' && raw.eventId.trim().length <= 80
        ? raw.eventId.trim()
        : makeId();

    const search = typeof raw.search === 'string' ? raw.search : '';
    const utm = parseUtmFromSearch(search);
    const referrer =
      typeof raw.referrer === 'string' ? raw.referrer.trim().slice(0, 300) : '';
    const { channel, sourceLabel } = classifyReferrer(referrer, utm);
    const props = sanitizeProps(raw.metadata);

    if (visitorId) {
      const existing = visitors.get(visitorId);
      visitors.set(visitorId, {
        id: visitorId,
        firstSeenAt: existing?.firstSeenAt ?? createdAt,
        lastSeenAt: createdAt,
      });
    }

    if (visitorId && (raw.isNewSession || !sessions.has(sessionId))) {
      sessions.set(sessionId, {
        id: sessionId,
        visitorId,
        startedAt: createdAt,
        lastActivityAt: createdAt,
        landingPath: pagePath,
        landingPageType: typeof raw.pageType === 'string' ? raw.pageType : null,
        referrer: referrer || null,
        utmSource: utm.source ?? null,
        utmMedium: utm.medium ?? null,
        utmCampaign: utm.campaign ?? null,
        utmContent: utm.content ?? null,
        utmTerm: utm.term ?? null,
        market: typeof raw.market === 'string' ? raw.market.slice(0, 32) : null,
        locale: typeof raw.locale === 'string' ? raw.locale.slice(0, 16) : null,
        deviceType: device.deviceType,
        browserFamily: device.browserFamily,
        osFamily: device.osFamily,
        countryCode: country,
        isBot: false,
        sourceChannel: channel,
      });
    } else if (sessions.has(sessionId)) {
      const s = sessions.get(sessionId)!;
      s.lastActivityAt = createdAt;
    }

    records.push({
      id,
      eventName,
      sessionId,
      pagePath,
      country,
      metadata: props,
      properties: props,
      createdAt,
      occurredAt: createdAt,
      visitorId: visitorId || null,
      eventCategory: eventCategoryFor(eventName),
      pageType: typeof raw.pageType === 'string' ? raw.pageType.slice(0, 40) : null,
      serviceSlug:
        typeof raw.serviceSlug === 'string'
          ? raw.serviceSlug.slice(0, 80)
          : typeof props?.serviceSlug === 'string'
            ? props.serviceSlug
            : null,
      packageId:
        typeof raw.packageId === 'string'
          ? raw.packageId.slice(0, 80)
          : typeof props?.packageId === 'string'
            ? props.packageId
            : null,
      market: typeof raw.market === 'string' ? raw.market.slice(0, 32) : null,
      locale: typeof raw.locale === 'string' ? raw.locale.slice(0, 16) : null,
      referrer: referrer || null,
      source: utm.source || sourceLabel,
      medium: utm.medium || channel,
      campaign: utm.campaign ?? null,
      content: utm.content ?? null,
      term: utm.term ?? null,
      deviceType: device.deviceType,
      browserFamily: device.browserFamily,
      osFamily: device.osFamily,
    });
  }

  if (!records.length) {
    return NextResponse.json({ ok: true, accepted: 0 });
  }

  let persistence;
  try {
    persistence = getPersistence();
  } catch (error) {
    console.error('[analytics/collect] persistence unavailable', error);
    return NextResponse.json({ ok: true, accepted: 0, skipped: true });
  }

  try {
    for (const visitor of visitors.values()) {
      await persistence.upsertAnalyticsVisitor?.(visitor);
    }
    for (const session of sessions.values()) {
      await persistence.upsertAnalyticsSession?.(session);
    }
    await persistence.insertAnalyticsEvents(records);
  } catch (error) {
    console.error('[analytics/collect] store failed', error);
    return NextResponse.json({ ok: false, error: 'Store failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, accepted: records.length });
}

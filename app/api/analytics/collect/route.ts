import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

import {
  isAdminPath,
  isFunnelEventName,
  resolveCountryFromHeaders,
} from '@/lib/analytics/funnel-events';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';

export const runtime = 'nodejs';

const MAX_BATCH = 25;
const MAX_PATH_LEN = 200;
const MAX_SESSION_LEN = 80;
const WINDOW_MS = 60_000;
const MAX_BATCHES_PER_WINDOW = 60;

type IngestEvent = {
  eventName?: string;
  sessionId?: string;
  pagePath?: string;
  eventId?: string;
  timestamp?: string;
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

function sanitizeMetadata(
  input: Record<string, unknown> | undefined,
): Record<string, string | number | boolean | null> | undefined {
  if (!input || typeof input !== 'object') return undefined;
  const out: Record<string, string | number | boolean | null> = {};
  let count = 0;
  for (const [key, value] of Object.entries(input)) {
    if (count >= 12) break;
    if (!/^[a-zA-Z0-9_]{1,40}$/.test(key)) continue;
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

export async function POST(request: Request) {
  const key = clientKey(request);
  if (!allowRequest(key)) {
    return NextResponse.json({ ok: false, error: 'Rate limited' }, { status: 429 });
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
  const nowIso = new Date().toISOString();
  const records: AnalyticsEventRecord[] = [];

  for (const raw of body.events.slice(0, MAX_BATCH)) {
    const eventName = typeof raw.eventName === 'string' ? raw.eventName.trim() : '';
    const sessionId = typeof raw.sessionId === 'string' ? raw.sessionId.trim() : '';
    const pagePath = typeof raw.pagePath === 'string' ? raw.pagePath.trim() : '';
    if (!isFunnelEventName(eventName)) continue;
    if (!sessionId || sessionId.length > MAX_SESSION_LEN) continue;
    if (!pagePath || pagePath.length > MAX_PATH_LEN || !pagePath.startsWith('/')) continue;
    if (isAdminPath(pagePath)) continue;

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

    records.push({
      id,
      eventName,
      sessionId,
      pagePath,
      country,
      metadata: sanitizeMetadata(raw.metadata),
      createdAt,
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
    await persistence.insertAnalyticsEvents(records);
  } catch (error) {
    console.error('[analytics/collect] store failed', error);
    return NextResponse.json({ ok: false, error: 'Store failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, accepted: records.length });
}

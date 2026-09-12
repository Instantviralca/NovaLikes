/**
 * Tools extract/download rate limits — bounded in-memory Map.
 *
 * CURRENT SINGLE-PROCESS RATE LIMITING: PASS
 * (NovaLikes production = one PM2 fork; this Map is process-local and sufficient.)
 *
 * MULTI-PROCESS / MULTI-SERVER SHARED LIMITING: FUTURE INFRA HARDENING
 */

import { createHash } from 'node:crypto';

type Bucket = number[];

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 20_000;

export const EXTRACT_LIMIT = 12;
export const EXTRACT_WINDOW_MS = 10 * 60 * 1000;
export const DOWNLOAD_LIMIT = 30;
export const DOWNLOAD_WINDOW_MS = 10 * 60 * 1000;

function prune(key: string, windowMs: number, now: number): Bucket {
  const next = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (next.length === 0) buckets.delete(key);
  else buckets.set(key, next);
  return next;
}

function enforceCap() {
  if (buckets.size <= MAX_KEYS) return;
  const overflow = buckets.size - MAX_KEYS;
  let removed = 0;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

export function hashRateLimitKey(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hits = prune(key, windowMs, now);
  if (hits.length >= limit) {
    const oldest = hits[0] ?? now;
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }
  hits.push(now);
  buckets.set(key, hits);
  enforceCap();
  return { allowed: true, retryAfterSec: 0 };
}

export function consumeExtractLimit(ip: string) {
  return consumeRateLimit(`extract:${hashRateLimitKey(ip)}`, EXTRACT_LIMIT, EXTRACT_WINDOW_MS);
}

export function consumeDownloadLimit(ip: string) {
  return consumeRateLimit(`download:${hashRateLimitKey(ip)}`, DOWNLOAD_LIMIT, DOWNLOAD_WINDOW_MS);
}

/** Prefer nginx X-Real-IP, then first X-Forwarded-For hop (trusted proxy boundary). */
export function clientIpFromHeaders(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real.slice(0, 64);
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return 'unknown';
}

/** Test helper — not used in production routes. */
export function resetToolRateLimits() {
  buckets.clear();
}

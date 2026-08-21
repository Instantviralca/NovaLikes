import { createHash } from 'node:crypto';

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export const EXTRACT_LIMIT = 12;
export const EXTRACT_WINDOW_MS = 10 * 60 * 1000;
export const DOWNLOAD_LIMIT = 30;
export const DOWNLOAD_WINDOW_MS = 10 * 60 * 1000;

function prune(key: string, windowMs: number, now: number): Bucket {
  const next = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  buckets.set(key, next);
  return next;
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
  return { allowed: true, retryAfterSec: 0 };
}

export function consumeExtractLimit(ip: string) {
  return consumeRateLimit(`extract:${hashRateLimitKey(ip)}`, EXTRACT_LIMIT, EXTRACT_WINDOW_MS);
}

export function consumeDownloadLimit(ip: string) {
  return consumeRateLimit(`download:${hashRateLimitKey(ip)}`, DOWNLOAD_LIMIT, DOWNLOAD_WINDOW_MS);
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real.slice(0, 64);
  return 'unknown';
}

/** Test helper — not used in production routes. */
export function resetToolRateLimits() {
  buckets.clear();
}

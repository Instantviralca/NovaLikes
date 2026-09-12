/**
 * Bounded in-memory rate limiter for public/admin HTTP routes.
 * Shared Map with TTL prune — suitable for single-node Contabo (nginx → Node).
 * Does not apply to Mollie webhooks.
 */

import { createHash } from 'node:crypto';

type Bucket = number[];

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 20_000;

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

/**
 * Prefer X-Real-IP (nginx typically sets the direct client) then first
 * X-Forwarded-For hop. Contabo nginx is the trusted proxy boundary.
 */
export function clientIpFromRequestHeaders(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real.slice(0, 64);
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return 'unknown';
}

export function consumeHttpRateLimit(
  bucketKey: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hits = prune(bucketKey, windowMs, now);
  if (hits.length >= limit) {
    const oldest = hits[0] ?? now;
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }
  hits.push(now);
  buckets.set(bucketKey, hits);
  enforceCap();
  return { allowed: true, retryAfterSec: 0 };
}

export function rateLimitResponse(retryAfterSec: number): Response {
  return new Response(JSON.stringify({ ok: false, error: 'Too many requests. Please try again later.' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfterSec),
      'Cache-Control': 'no-store',
    },
  });
}

/** Presets tuned per endpoint class (requests / window). */
export const HTTP_RATE_LIMITS = {
  contact: { limit: 5, windowMs: 15 * 60 * 1000 },
  track: { limit: 20, windowMs: 15 * 60 * 1000 },
  coupons: { limit: 30, windowMs: 10 * 60 * 1000 },
  abandonCapture: { limit: 10, windowMs: 10 * 60 * 1000 },
  placeOrder: { limit: 8, windowMs: 10 * 60 * 1000 },
  prepareCheckout: { limit: 30, windowMs: 10 * 60 * 1000 },
  cartHandoff: { limit: 40, windowMs: 10 * 60 * 1000 },
  mollieConfig: { limit: 60, windowMs: 10 * 60 * 1000 },
  analytics: { limit: 60, windowMs: 60 * 1000 },
} as const;

export function consumePublicRouteLimit(
  route: keyof typeof HTTP_RATE_LIMITS,
  ip: string,
): { allowed: boolean; retryAfterSec: number } {
  const cfg = HTTP_RATE_LIMITS[route];
  return consumeHttpRateLimit(
    `pub:${route}:${hashRateLimitKey(ip)}`,
    cfg.limit,
    cfg.windowMs,
  );
}

/** Test helper. */
export function resetHttpRateLimits() {
  buckets.clear();
}

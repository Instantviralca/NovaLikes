import { describe, expect, it, beforeEach } from 'vitest';

import {
  consumePublicRouteLimit,
  resetHttpRateLimits,
  rateLimitResponse,
  HTTP_RATE_LIMITS,
} from '@/lib/http/rate-limit';
import { publicApiErrorMessage } from '@/lib/http/public-error';
import { detectImageMime, validateMediaBuffer } from '@/lib/cms/storage';
import { dispatchNotification } from '@/lib/notifications/service';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
  getPersistence,
} from '@/lib/persistence';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getEnabledPaymentProviders } from '@/config/payments';

describe('http rate limit', () => {
  beforeEach(() => {
    resetHttpRateLimits();
  });

  it('allows within limit then returns 429', () => {
    const limit = HTTP_RATE_LIMITS.contact.limit;
    for (let i = 0; i < limit; i += 1) {
      expect(consumePublicRouteLimit('contact', '1.2.3.4').allowed).toBe(true);
    }
    const blocked = consumePublicRouteLimit('contact', '1.2.3.4');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
    expect(rateLimitResponse(blocked.retryAfterSec).status).toBe(429);
  });

  it('isolates buckets by route and IP', () => {
    const limit = HTTP_RATE_LIMITS.contact.limit;
    for (let i = 0; i < limit; i += 1) {
      consumePublicRouteLimit('contact', '1.2.3.4');
    }
    expect(consumePublicRouteLimit('contact', '1.2.3.4').allowed).toBe(false);
    expect(consumePublicRouteLimit('contact', '9.9.9.9').allowed).toBe(true);
    expect(consumePublicRouteLimit('track', '1.2.3.4').allowed).toBe(true);
    expect(consumePublicRouteLimit('placeOrder', '1.2.3.4').allowed).toBe(true);
  });
});

describe('publicApiErrorMessage', () => {
  it('hides internal/secret-looking errors', () => {
    expect(publicApiErrorMessage(new Error('DATABASE_URL missing'))).toBe(
      'Unable to complete this request.',
    );
    expect(publicApiErrorMessage(new Error('Cart is empty.'))).toBe('Cart is empty.');
  });
});

describe('media magic-byte validation', () => {
  it('detects jpeg/png and rejects mismatch', () => {
    const jpeg = Buffer.alloc(16, 0);
    jpeg[0] = 0xff;
    jpeg[1] = 0xd8;
    jpeg[2] = 0xff;
    jpeg[3] = 0xe0;
    expect(detectImageMime(jpeg)).toBe('image/jpeg');
    expect(validateMediaBuffer(jpeg, 'image/jpeg')).toBeNull();
    expect(validateMediaBuffer(jpeg, 'image/png')).toMatch(/does not match/i);
    expect(validateMediaBuffer(Buffer.alloc(16, 0x41), 'image/jpeg')).toMatch(/Only JPEG/i);
  });
});

describe('email failed idempotency retry', () => {
  beforeEach(() => {
    process.env.IV_PERSISTENCE = 'memory';
    clearPersistenceSingletonForTests();
    useMemoryPersistenceForTests();
  });

  const vars = {
    companyName: 'NovaLikes',
    customerEmail: 'a@example.com',
    orderId: 'IV-1',
    serviceName: 'Instagram Followers',
    statusLabel: 'Pending',
    statusMessage: 'Pending',
    trackingUrl: 'https://novalikes.com/track-order',
    supportEmail: 'support@novalikes.com',
  };

  it('failed send remains retryable; successful send is idempotent', async () => {
    const first = await dispatchNotification({
      trigger: 'order_created',
      recipient: 'a@example.com',
      orderId: 'IV-1',
      variables: vars,
      idempotencyKey: 'retry-key-1',
    });
    expect(first.status).toBe('failed');
    expect((first as { idempotencyKey?: string }).idempotencyKey).toBeUndefined();

    const second = await dispatchNotification({
      trigger: 'order_created',
      recipient: 'a@example.com',
      orderId: 'IV-1',
      variables: vars,
      idempotencyKey: 'retry-key-1',
    });
    expect(second.status).toBe('failed');
    expect(second.id).not.toBe(first.id);

    await getPersistence().saveNotification({
      id: 'ntf_sent',
      orderId: 'IV-2',
      channel: 'email',
      templateId: 'order_confirmation',
      trigger: 'order_created',
      recipient: 'b@example.com',
      status: 'sent',
      subject: 'ok',
      createdAt: new Date().toISOString(),
      immutable: true,
      idempotencyKey: 'sent-key-1',
    });
    const third = await dispatchNotification({
      trigger: 'order_created',
      recipient: 'b@example.com',
      orderId: 'IV-2',
      variables: { ...vars, customerEmail: 'b@example.com', orderId: 'IV-2' },
      idempotencyKey: 'sent-key-1',
    });
    expect(third.id).toBe('ntf_sent');
    expect(third.status).toBe('sent');
  });
});

describe('skipped / invalid service routes', () => {
  it('does not treat YouTube buy routes as approved (soft-200 target)', () => {
    expect(isApprovedServiceSlug('buy-youtube-subscribers')).toBe(false);
    expect(isApprovedServiceSlug('buy-instagram-followers')).toBe(true);
  });
});

describe('payment architecture lock', () => {
  it('keeps Stripe paused so webhook remains hard-disabled', () => {
    const enabled = getEnabledPaymentProviders().map((p) => p.id);
    expect(enabled).not.toContain('stripe');
    expect(enabled.length).toBeGreaterThan(0);
  });
});

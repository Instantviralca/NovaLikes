/**
 * Production launch blockers — persistence, payments, auth, email isolation, Learn content.
 */

import { createHmac } from 'node:crypto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  assertLoginAllowed,
  createAdminSessionToken,
  recordLoginAttempt,
  revokeAdminSession,
  verifyAdminSessionToken,
  verifyAdminSessionTokenAsync,
  verifyAdminPassword,
  hashIp,
} from '@/lib/admin/auth';
import { validateCheckoutPricing } from '@/lib/orders/pricing';
import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests, saveOrder } from '@/lib/orders/store';
import { markOrderPaymentStatus, isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import {
  clearPersistenceSingletonForTests,
  getPersistence,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { dispatchNotification } from '@/lib/notifications/service';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { AUTHORS } from '@/data/authors/registry';
import { LEARN_SITEMAP_ENABLED } from '@/data/seo/sitemap-routes';
import { getPublishedLearnArticleSlugs } from '@/data/learn';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { isStripeConfigured, isEmailConfigured, validateEnv } from '@/lib/config/env';

const prev = { ...process.env };

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.IV_ADMIN_PASSWORD = 'test-admin-password';
  process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
  process.env.IV_ENV = 'test';
  delete process.env.STRIPE_SECRET_KEY;
  delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  delete process.env.STRIPE_WEBHOOK_SECRET;
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_FROM;
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
});

afterEach(() => {
  Object.assign(process.env, prev);
  clearPersistenceSingletonForTests();
});

function cartItem(overrides: Partial<{ unitPrice: number; packageId: string }> = {}) {
  return {
    id: 'cart_1',
    packageId: overrides.packageId ?? 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram' as const,
    packageTitle: '1000 Instagram Followers',
    quantity: 1000,
    quantityLabel: '1000',
    unitPrice: overrides.unitPrice ?? 1, // wrong client price on purpose
    currency: 'USD' as const,
    deliveryTime: 'Gradual',
    configuration: { username: 'demo_user' },
    addedAt: new Date().toISOString(),
  };
}

describe('Database persistence (memory driver)', () => {
  it('persists orders and contact messages', async () => {
    const order = await placeOrder({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'persist-1',
    });
    expect(order.total.amount).toBe(999);
    expect((await getOrderById(order.id))?.guestEmail).toBe('buyer@example.com');

    const contact = await getPersistence().saveContactMessage({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'Help',
      orderId: order.id,
      message: 'I need help with my order please.',
    });
    expect(contact.id).toMatch(/^msg_/);
  });

  it('prevents duplicate orders via idempotency key', async () => {
    const input = {
      customer: { email: 'dup@example.com' },
      paymentMethodId: 'stripe' as const,
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'same-key-123',
    };
    const a = await placeOrder(input);
    const b = await placeOrder(input);
    expect(a.id).toBe(b.id);
  });
});

describe('Server-side price validation', () => {
  it('recalculates from catalog and ignores client unitPrice', () => {
    const pricing = validateCheckoutPricing({ items: [cartItem({ unitPrice: 1 })] });
    expect(pricing.total.amount).toBe(999);
    expect(pricing.items[0]?.unitPrice).toBe(999);
  });

  it('rejects unknown packages', () => {
    expect(() =>
      validateCheckoutPricing({
        items: [cartItem({ packageId: 'not-a-real-package' })],
      }),
    ).toThrow(/Invalid or inactive package/);
  });

  it('rejects missing username / URL configuration', () => {
    expect(() =>
      validateCheckoutPricing({
        items: [
          {
            ...cartItem(),
            configuration: {},
          },
        ],
      }),
    ).toThrow(/required/i);
  });

  it('rejects payment binding mismatch when marking paid', async () => {
    const order = await placeOrder({
      customer: { email: 'bind@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'bind-1',
    });
    // Simulate Stripe session already attached.
    const withSession = {
      ...order,
      payment: {
        provider: 'stripe' as const,
        paymentId: 'cs_order_a',
        status: 'pending' as const,
        amount: order.total,
      },
    };
    await saveOrder(withSession);

    await expect(
      markOrderPaymentStatus({
        paymentId: 'cs_other_order',
        status: 'paid',
        orderId: order.id,
        amountMinor: order.total.amount,
      }),
    ).rejects.toThrow(/does not match/);
  });
});

describe('Payment verification + fulfilment gate', () => {
  it('marks paid once and blocks unpaid fulfilment eligibility', async () => {
    const order = await placeOrder({
      customer: { email: 'pay@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'pay-1',
    });
    expect(isEligibleForFulfilmentQueue(order)).toBe(false);

    const first = await markOrderPaymentStatus({
      paymentId: 'cs_test_1',
      status: 'paid',
      orderId: order.id,
      amountMinor: 999,
    });
    expect(first.applied).toBe(true);
    expect(first.order?.payment?.status).toBe('paid');
    expect(isEligibleForFulfilmentQueue(first.order!)).toBe(true);

    const second = await markOrderPaymentStatus({
      paymentId: 'cs_test_1',
      status: 'paid',
      orderId: order.id,
      amountMinor: 999,
    });
    expect(second.duplicate).toBe(true);
  });

  it('rejects paid amount mismatch', async () => {
    const order = await placeOrder({
      customer: { email: 'badpay@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'pay-mismatch',
    });
    await expect(
      markOrderPaymentStatus({
        paymentId: 'cs_bad',
        status: 'paid',
        orderId: order.id,
        amountMinor: 1,
      }),
    ).rejects.toThrow(/does not match/);
  });

  it('records failed payment without entering fulfilment queue', async () => {
    const order = await placeOrder({
      customer: { email: 'fail@example.com' },
      paymentMethodId: 'stripe',
      termsAccepted: true,
      coupon: null,
      items: [cartItem()],
      idempotencyKey: 'pay-fail',
    });
    const result = await markOrderPaymentStatus({
      paymentId: 'cs_fail',
      status: 'failed',
      orderId: order.id,
    });
    expect(result.order?.payment?.status).toBe('failed');
    expect(isEligibleForFulfilmentQueue(result.order!)).toBe(false);
  });
});

describe('Webhook duplicate + signature gate', () => {
  it('dedupes webhook event ids', async () => {
    const store = getPersistence();
    expect(await store.hasProcessed('stripe', 'evt_1')).toBe(false);
    await store.markProcessed({
      id: 'wh_1',
      provider: 'stripe',
      eventId: 'evt_1',
      eventType: 'checkout.session.completed',
      processedAt: new Date().toISOString(),
    });
    expect(await store.hasProcessed('stripe', 'evt_1')).toBe(true);
  });

  it('reports Stripe as disabled without secrets', () => {
    expect(isStripeConfigured()).toBe(false);
  });
});

describe('Email failure isolation', () => {
  it('records failed notification without duplicating on idempotency key', async () => {
    expect(isEmailConfigured()).toBe(false);
    const a = await dispatchNotification({
      trigger: 'order_created',
      recipient: 'buyer@example.com',
      orderId: 'IV-TEST',
      variables: {
        companyName: 'NovaLikes',
        customerEmail: 'buyer@example.com',
        orderId: 'IV-TEST',
        serviceName: 'Instagram Followers',
        statusLabel: 'Pending',
        statusMessage: 'Pending',
        trackingUrl: 'http://localhost/track',
        supportEmail: '',
      },
      idempotencyKey: 'email:IV-TEST',
    });
    expect(a.status).toBe('failed');
    const b = await dispatchNotification({
      trigger: 'order_created',
      recipient: 'buyer@example.com',
      orderId: 'IV-TEST',
      variables: {
        companyName: 'NovaLikes',
        customerEmail: 'buyer@example.com',
        orderId: 'IV-TEST',
        serviceName: 'Instagram Followers',
        statusLabel: 'Pending',
        statusMessage: 'Pending',
        trackingUrl: 'http://localhost/track',
        supportEmail: '',
      },
      idempotencyKey: 'email:IV-TEST',
    });
    expect(b.id).toBe(a.id);
  });
});

describe('Admin auth hardening', () => {
  it('rate limits login failures', async () => {
    const ip = '203.0.113.10';
    for (let i = 0; i < 5; i += 1) {
      await recordLoginAttempt(ip, false);
    }
    const blocked = await assertLoginAllowed(ip);
    expect(blocked.ok).toBe(false);
  });

  it('expires sessions and supports logout revoke', async () => {
    const { token } = await createAdminSessionToken(Date.now());
    expect(verifyAdminSessionToken(token)).toBe(true);
    expect(await verifyAdminSessionTokenAsync(token)).toBe(true);

    await revokeAdminSession(token);
    // Signature still valid but revoked in store.
    expect(await verifyAdminSessionTokenAsync(token)).toBe(false);

    const expired = await createAdminSessionToken(Date.now() - 1000 * 60 * 60 * 13);
    expect(verifyAdminSessionToken(expired.token)).toBe(false);
  });

  it('uses constant-time password compare outcomes', () => {
    expect(verifyAdminPassword('test-admin-password')).toBe(true);
    expect(verifyAdminPassword('wrong')).toBe(false);
  });

  it('hashes ips without exposing raw values', () => {
    expect(hashIp('1.2.3.4')).not.toContain('1.2.3.4');
  });
});

describe('Unauthorized admin API gate helper', () => {
  it('rejects unsigned tokens', () => {
    const body = Buffer.from(JSON.stringify({ role: 'admin', sid: 'x', exp: Date.now() + 99999 })).toString(
      'base64url',
    );
    const bad = `${body}.${createHmac('sha256', 'other-secret').update(body).digest('base64url')}`;
    expect(verifyAdminSessionToken(bad)).toBe(false);
  });
});

describe('Learn Center production content', () => {
  it('publishes approved Learn articles with featured images in the sitemap', () => {
    expect(LEARN_ARTICLES.length).toBe(56);
    expect(AUTHORS.length).toBeGreaterThanOrEqual(1);
    expect(getPublishedLearnArticleSlugs()).toEqual([
      'how-to-grow-instagram-followers-organically',
      'instagram-algorithm-explained',
      'how-to-get-more-instagram-followers-without-ads',
      'common-instagram-growth-mistakes',
      'best-time-to-post-on-instagram',
      'instagram-seo-guide',
      'how-to-use-instagram-hashtags-effectively',
      'how-to-increase-instagram-engagement',
      'how-to-get-more-instagram-likes',
      'complete-instagram-growth-guide',
      'how-to-use-instagram-for-business',
      'instagram-marketing-for-small-businesses',
      'how-to-create-an-instagram-content-calendar',
      'instagram-content-ideas-for-businesses',
      'organic-vs-paid-instagram-growth',
      'how-to-build-trust-on-instagram',
      'instagram-marketing-mistakes-businesses-should-avoid',
      'complete-tiktok-growth-guide',
      'how-to-get-more-tiktok-followers',
      'how-the-tiktok-algorithm-works',
      'best-time-to-post-on-tiktok',
      'tiktok-seo-guide',
      'how-to-increase-tiktok-engagement',
      'how-to-get-more-tiktok-likes',
      'how-to-get-more-tiktok-views',
      'common-tiktok-growth-mistakes',
      'tiktok-for-business',
      'tiktok-marketing-for-small-businesses',
      'how-to-create-a-tiktok-content-calendar',
      'tiktok-content-ideas-for-businesses',
      'organic-vs-paid-tiktok-growth',
      'how-to-build-trust-on-tiktok',
      'tiktok-marketing-mistakes-businesses-should-avoid',
      'facebook-growth-guide',
      'how-to-get-more-facebook-followers',
      'how-the-facebook-algorithm-works',
      'best-time-to-post-on-facebook',
      'facebook-seo-guide',
      'how-to-increase-facebook-engagement',
      'how-to-get-more-facebook-page-likes',
      'youtube-growth-guide',
      'how-the-youtube-algorithm-works',
      'youtube-seo-guide',
      'how-to-get-more-youtube-subscribers',
      'how-to-get-more-youtube-views',
      'common-youtube-growth-mistakes',
      'social-media-marketing-guide',
      'social-media-marketing-strategy',
      'social-media-content-planning',
      'social-media-marketing-mistakes',
      'how-to-measure-social-media-success',
      'beginners-guide-to-social-media-growth',
      'how-social-media-algorithms-work',
      'organic-vs-paid-social-media-growth',
      'how-to-build-a-strong-personal-brand-on-social-media',
      'social-media-trends-2026',
    ]);
    for (const slug of getPublishedLearnArticleSlugs()) {
      const article = LEARN_ARTICLES.find((item) => item.slug === slug)!;
      expect(article.status).toBe('published');
      expect(article.editorialApproved).toBe(true);
      expect(article.featuredImage?.src).toBeTruthy();
      expect(article.featuredImage?.priority).toBe(true);
      expect(article.seo.noindex).not.toBe(true);
    }

    const facebookSeo = LEARN_ARTICLES.find(
      (article) => article.slug === 'facebook-seo-guide',
    )!;
    expect(facebookSeo.relatedServices).toEqual([
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ]);
    expect(facebookSeo.category).toBe('facebook');

    expect(LEARN_SITEMAP_ENABLED).toBe(true);
    const entries = buildSitemapEntries();
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-tiktok-followers'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-the-tiktok-algorithm-works'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/best-time-to-post-on-tiktok'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/tiktok-seo-guide')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-increase-tiktok-engagement'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-tiktok-likes'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-tiktok-views'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/common-tiktok-growth-mistakes'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/tiktok-for-business')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/tiktok-marketing-for-small-businesses'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-create-a-tiktok-content-calendar'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/tiktok-content-ideas-for-businesses'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/organic-vs-paid-tiktok-growth'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-build-trust-on-tiktok'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes(
          '/learn/tiktok-marketing-mistakes-businesses-should-avoid',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/facebook-growth-guide')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-facebook-followers'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-the-facebook-algorithm-works'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/best-time-to-post-on-facebook'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/facebook-seo-guide')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-increase-facebook-engagement'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-facebook-page-likes'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/youtube-growth-guide')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-the-youtube-algorithm-works'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/youtube-seo-guide')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-youtube-subscribers'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-get-more-youtube-views'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/common-youtube-growth-mistakes'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/social-media-marketing-guide'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/social-media-marketing-strategy'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/social-media-content-planning'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/social-media-marketing-mistakes'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-to-measure-social-media-success'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/beginners-guide-to-social-media-growth'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/organic-vs-paid-social-media-growth'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes(
          '/learn/how-to-build-a-strong-personal-brand-on-social-media',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.includes('/learn/social-media-trends-2026')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.includes('/learn/how-social-media-algorithms-work'),
      ),
    ).toBe(true);
  });
});

describe('Env validation', () => {
  it('never requires printing secrets and does not require Stripe keys', () => {
    const result = validateEnv();
    expect(result.issues.some((i) => i.key === 'STRIPE_SECRET_KEY' && i.level === 'error')).toBe(
      false,
    );
    expect(JSON.stringify(result)).not.toMatch(/sk_live|re_/);
  });

  it('accepts ADMIN_PASSWORD / SESSION_SECRET / RESEND_FROM_EMAIL aliases', () => {
    delete process.env.IV_ADMIN_PASSWORD;
    delete process.env.IV_ADMIN_SESSION_SECRET;
    delete process.env.EMAIL_FROM;
    process.env.ADMIN_PASSWORD = 'alias-admin-password-strong';
    process.env.SESSION_SECRET = 'alias-session-secret-32chars!!';
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.RESEND_FROM_EMAIL = 'orders@example.com';
    process.env.DATABASE_URL = 'postgresql://localhost/test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';

    const result = validateEnv({ forceProduction: true });
    expect(result.ok).toBe(true);
    expect(isEmailConfigured()).toBe(true);
  });

  it('accepts SMTP_HOST with EMAIL_FROM and does not require Resend', () => {
    delete process.env.IV_ADMIN_PASSWORD;
    delete process.env.IV_ADMIN_SESSION_SECRET;
    delete process.env.EMAIL_FROM;
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    process.env.ADMIN_PASSWORD = 'alias-admin-password-strong';
    process.env.SESSION_SECRET = 'alias-session-secret-32chars!!';
    process.env.SMTP_HOST = '127.0.0.1';
    process.env.SMTP_PORT = '25';
    process.env.EMAIL_FROM = 'orders@example.com';
    process.env.DATABASE_URL = 'postgresql://localhost/test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';

    const result = validateEnv({ forceProduction: true });
    expect(result.ok).toBe(true);
    expect(isEmailConfigured()).toBe(true);
    expect(result.issues.some((i) => i.key === 'EMAIL_FROM' && i.level === 'error')).toBe(false);
  });

  it('throws in production when throwOnProductionErrors is enabled', () => {
    delete process.env.DATABASE_URL;
    delete process.env.IV_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.IV_ADMIN_SESSION_SECRET;
    delete process.env.SESSION_SECRET;
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.SMTP_HOST;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;

    expect(() =>
      validateEnv({ throwOnProductionErrors: true, forceProduction: true }),
    ).toThrow(/Missing required production configuration/);
  });
});

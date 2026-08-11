import { describe, expect, it } from 'vitest';

import { buildMarketingEmailContent } from '@/lib/email/campaigns';
import {
  createUnsubscribeToken,
  isActivelyOptedIn,
  normalizeSubscriberEmail,
} from '@/lib/email/subscriber-utils';

describe('email marketing helpers', () => {
  it('normalizes emails', () => {
    expect(normalizeSubscriberEmail('  Foo@Bar.COM ')).toBe('foo@bar.com');
  });

  it('creates unsubscribe tokens', () => {
    expect(createUnsubscribeToken().length).toBeGreaterThan(10);
  });

  it('detects active opt-in', () => {
    expect(
      isActivelyOptedIn({
        id: '1',
        email: 'a@b.com',
        source: 'checkout',
        marketingOptIn: true,
        unsubscribeToken: 'tok',
        createdAt: '',
        updatedAt: '',
      }),
    ).toBe(true);
    expect(
      isActivelyOptedIn({
        id: '1',
        email: 'a@b.com',
        source: 'checkout',
        marketingOptIn: true,
        unsubscribedAt: new Date().toISOString(),
        unsubscribeToken: 'tok',
        createdAt: '',
        updatedAt: '',
      }),
    ).toBe(false);
  });

  it('includes coupon and unsubscribe in marketing email', () => {
    const content = buildMarketingEmailContent({
      subject: '25% off',
      message: 'Limited offer',
      couponCode: 'save25',
      unsubscribeUrl: 'https://novalikes.com/unsubscribe?token=abc',
    });
    expect(content.html).toContain('SAVE25');
    expect(content.html).toContain('/unsubscribe?token=abc');
    expect(content.text).toContain('SAVE25');
  });
});

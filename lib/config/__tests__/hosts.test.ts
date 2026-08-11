import { afterEach, describe, expect, it } from 'vitest';

import {
  getCartCookieDomain,
  getCartCookieDomainFromSiteOrigin,
  getCheckoutOrigin,
  getCheckoutUrl,
  getSiteOrigin,
  isCheckoutHostname,
  isDedicatedCheckoutConfigured,
} from '@/lib/config/hosts';

const prev = { ...process.env };

afterEach(() => {
  Object.assign(process.env, prev);
  for (const key of Object.keys(process.env)) {
    if (!(key in prev)) delete process.env[key];
  }
});

describe('Checkout host helpers', () => {
  it('falls back checkout to main site when CHECKOUT_URL unset', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';
    delete process.env.NEXT_PUBLIC_CHECKOUT_URL;
    expect(getSiteOrigin()).toBe('https://novalikes.com');
    expect(getCheckoutOrigin()).toBe('https://novalikes.com');
    expect(getCheckoutUrl('/')).toBe('https://novalikes.com/checkout');
    expect(isDedicatedCheckoutConfigured()).toBe(false);
    expect(isCheckoutHostname('novalikes.com')).toBe(false);
  });

  it('uses dedicated checkout origin when configured', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';
    process.env.NEXT_PUBLIC_CHECKOUT_URL = 'https://checkout.novalikes.com';
    expect(getCheckoutOrigin()).toBe('https://checkout.novalikes.com');
    expect(getCheckoutUrl('/')).toBe('https://checkout.novalikes.com/');
    expect(isDedicatedCheckoutConfigured()).toBe(true);
    expect(isCheckoutHostname('checkout.novalikes.com')).toBe(true);
    expect(isCheckoutHostname('novalikes.com')).toBe(false);
    expect(getCartCookieDomain()).toBe('.novalikes.com');
    expect(getCartCookieDomainFromSiteOrigin()).toBe('.novalikes.com');
  });
});

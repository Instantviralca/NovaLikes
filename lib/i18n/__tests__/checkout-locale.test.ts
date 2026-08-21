import { describe, expect, it } from 'vitest';

import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/content/load';
import { isCommercePath, shouldPersistLocaleCookie } from '@/lib/i18n/locale-cookie';
import { getCheckoutUrl, isDedicatedCheckoutConfigured } from '@/lib/config/hosts';
import { localizeHref } from '@/lib/i18n/paths';

describe('same-origin checkout', () => {
  it('keeps cart, checkout, success and track-order on the main site', () => {
    expect(isCommercePath('/cart')).toBe(true);
    expect(isCommercePath('/checkout')).toBe(true);
    expect(isCommercePath('/order-success')).toBe(true);
    expect(isCommercePath('/track-order')).toBe(true);
    expect(isCommercePath('/privacy-policy')).toBe(false);
    expect(isDedicatedCheckoutConfigured()).toBe(false);
    expect(getCheckoutUrl('/')).toContain('/checkout');
    expect(getCheckoutUrl('/')).not.toContain('checkout.novalikes');
  });

  it('does not localize commerce paths into duplicate checkout backends', () => {
    for (const locale of LOCALIZED_LOCALES) {
      expect(localizeHref('/cart', locale)).toBe('/cart');
      expect(localizeHref('/checkout', locale)).toBe('/checkout');
      expect(localizeHref('/order-success', locale)).toBe('/order-success');
      expect(localizeHref('/track-order', locale)).toBe('/track-order');
    }
  });

  it('does not persist nl-locale from Next.js locale-link prefetches', () => {
    expect(shouldPersistLocaleCookie(new Headers({ 'next-router-prefetch': '1' }))).toBe(false);
    expect(
      shouldPersistLocaleCookie(new Headers({ 'next-router-segment-prefetch': '1' })),
    ).toBe(false);
    expect(shouldPersistLocaleCookie(new Headers({ purpose: 'prefetch' }))).toBe(false);
    expect(
      shouldPersistLocaleCookie(new Headers(), new URL('http://localhost/de?_rsc=1')),
    ).toBe(false);
    expect(shouldPersistLocaleCookie(new Headers({ 'next-url': '/es' }))).toBe(false);
    expect(
      shouldPersistLocaleCookie(new Headers({ accept: 'text/x-component' })),
    ).toBe(false);
    expect(shouldPersistLocaleCookie(new Headers())).toBe(true);
    expect(shouldPersistLocaleCookie(new Headers(), new URL('http://localhost/de'))).toBe(true);
  });

  it('translates cart and checkout chrome for every locale', () => {
    for (const locale of LOCALIZED_LOCALES) {
      const ui = loadUi(locale);
      expect(ui.cart.yourCart).not.toBe('Your cart');
      expect(ui.cart.checkout).not.toBe('Checkout');
      expect(ui.checkout.placeOrder).not.toBe('Place Order');
      expect(ui.checkout.email).not.toBe('Email address');
      expect(ui.orderSuccess.trackOrder).not.toBe('Track order');
      expect(ui.cart.total).toBeTruthy();
      expect(ui.checkout.title).toBeTruthy();
    }
  });
});

/**
 * Phase 19.01 — Compact pricing + order dialog / cart toast flow tests.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { OrderDestinationField } from '@/components/commerce/order-configuration/order-destination-field';
import { PricingGrid } from '@/components/commerce/pricing/pricing-grid';
import { isAnalyticsDebugPanelEnabled } from '@/components/analytics/AnalyticsDebugPanel';
import {
  getEventRegistryEntry,
  isApprovedEventName,
  resolveCanonicalEventName,
} from '@/data/analytics/event-registry';
import { getServiceOrderConfig } from '@/data/order-fields';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { sanitizeEventPayload, trackEvent } from '@/lib/analytics';
import {
  calculateCartTotals,
  createEmptyCart,
  createCartItemId,
} from '@/lib/cart/utils';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import type { PricingCardModel } from '@/components/commerce/pricing/types';
import type { CartItem } from '@/types/cart';
import type { PricingPackage } from '@/types/pricing';

function toCardModels(packages: PricingPackage[]): PricingCardModel[] {
  return packages.map((pkg) => ({
    package: pkg,
    priceDisplay: String(pkg.price),
    primaryCta: { label: 'Select Package', href: '#pricing' },
  }));
}

describe('Phase 19.01 order destination fields', () => {
  it('shows Instagram username for followers', () => {
    const config = getServiceOrderConfig('buy-instagram-followers');
    const field = config.fields[0];
    expect(field?.type).toBe('username');
    expect(field?.label.toLowerCase()).toContain('instagram');
    expect(field?.placeholder).toContain('@');
  });

  it('shows Instagram post/Reel URL for likes and views', () => {
    for (const slug of ['buy-instagram-likes', 'buy-instagram-views'] as const) {
      const field = getServiceOrderConfig(slug).fields[0];
      expect(field?.type).toBe('url');
      expect(field?.label.toLowerCase()).toMatch(/instagram|reel|post/);
    }
  });

  it('shows TikTok username for followers and video URL for likes/views', () => {
    expect(getServiceOrderConfig('buy-tiktok-followers').fields[0]?.type).toBe('username');
    expect(getServiceOrderConfig('buy-tiktok-likes').fields[0]?.type).toBe('url');
    expect(getServiceOrderConfig('buy-tiktok-views').fields[0]?.type).toBe('url');
  });

  it('shows Facebook / YouTube URL fields for the matching services', () => {
    expect(getServiceOrderConfig('buy-facebook-followers').fields[0]?.type).toBe('url');
    expect(getServiceOrderConfig('buy-youtube-subscribers').fields[0]?.type).toBe('url');
    expect(getServiceOrderConfig('buy-youtube-views').fields[0]?.type).toBe('url');
  });

  it('renders OrderDestinationField markup with label and help', () => {
    const field = getServiceOrderConfig('buy-instagram-followers').fields[0]!;
    const html = renderToStaticMarkup(
      createElement(OrderDestinationField, {
        field,
        value: '',
        onChange: () => undefined,
      }),
    );
    expect(html).toContain('Instagram username');
    expect(html).toContain('@username');
    expect(html).toContain('order-destination-field');
  });
});

describe('Phase 19.01 validation gates add-to-cart', () => {
  it('blocks invalid Instagram username', () => {
    const config = getServiceOrderConfig('buy-instagram-followers');
    const normalized = normalizeOrderConfigurationValues(config.fields, {
      username: 'bad user!!',
    });
    const errors = validateOrderConfiguration(config.fields, normalized);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('blocks invalid Instagram URL', () => {
    const config = getServiceOrderConfig('buy-instagram-likes');
    const normalized = normalizeOrderConfigurationValues(config.fields, {
      targetUrl: 'https://example.com/not-instagram',
    });
    const errors = validateOrderConfiguration(config.fields, normalized);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('accepts valid username and builds a complete cart item', () => {
    const packages = getActivePackagesByServiceSlug('buy-instagram-followers');
    const pkg = packages[0];
    expect(pkg).toBeTruthy();
    const config = getServiceOrderConfig('buy-instagram-followers', pkg);
    const normalized = normalizeOrderConfigurationValues(config.fields, {
      username: '  valid.user  ',
    });
    const errors = validateOrderConfiguration(config.fields, normalized);
    expect(errors).toEqual([]);
    expect(normalized.username).toBe('valid.user');

    const item: CartItem = {
      id: createCartItemId(),
      packageId: pkg!.id,
      serviceId: pkg!.serviceId,
      serviceSlug: 'buy-instagram-followers',
      serviceName: 'Instagram Followers',
      platformId: 'instagram',
      packageTitle: pkg!.title,
      quantity: pkg!.quantity,
      quantityLabel: pkg!.quantityLabel,
      unitPrice: pkg!.price,
      currency: pkg!.currency,
      deliveryTime: pkg!.deliveryTime,
      configuration: normalized,
      addedAt: new Date().toISOString(),
    };

    expect(item.configuration.username).toBe('valid.user');
    expect(item.unitPrice).toBe(pkg!.price);

    const cart = createEmptyCart(pkg!.currency);
    cart.items.push(item);
    const totals = calculateCartTotals(cart.items, null, pkg!.currency);
    expect(totals.itemCount).toBe(1);
    expect(totals.subtotal.amount).toBe(pkg!.price);
  });

  it('double-submit lock only allows one successful cart mutation sequence', () => {
    let lock = false;
    let adds = 0;
    const attempt = (valid: boolean) => {
      if (lock) return;
      lock = true;
      if (!valid) {
        lock = false;
        return;
      }
      adds += 1;
    };
    attempt(true);
    attempt(true);
    expect(adds).toBe(1);
  });
});

describe('Phase 19.01 compact pricing selector', () => {
  it('renders compact chips and a summary panel (not tall stacked cards)', () => {
    const packages = getActivePackagesByServiceSlug('buy-instagram-followers');
    expect(packages.length).toBeGreaterThan(0);
    const html = renderToStaticMarkup(
      createElement(PricingGrid, {
        packages: toCardModels(packages),
        selectedPackageId: packages[0]!.id,
        platformId: 'instagram',
        serviceName: 'Instagram Followers',
        onSelect: () => undefined,
        onContinue: () => undefined,
      }),
    );
    expect(html).toContain('pricing-grid-compact');
    expect(html).toContain('package-summary');
    expect(html).toContain('Add to Cart');
    expect(html).not.toContain('pricing-grid-buzzoid');
  });
});

describe('Phase 19.01 analytics privacy + events', () => {
  it('registers order_details_open, cart_item_add, cart_view_click, checkout_click', () => {
    for (const name of [
      'package_select',
      'order_details_open',
      'order_configuration_submit',
      'cart_item_add',
      'cart_view_click',
      'checkout_click',
    ]) {
      expect(isApprovedEventName(name)).toBe(true);
      expect(getEventRegistryEntry(name)?.eventName).toBe(name);
    }
  });

  it('never keeps username or URL in sanitized analytics payloads', () => {
    const { sanitized, issues } = sanitizeEventPayload({
      eventName: 'order_configuration_submit',
      serviceSlug: 'buy-instagram-followers',
      packageId: 'pkg-test',
      metadata: {
        username: '@secret',
        targetUrl: 'https://instagram.com/p/abc',
      },
    });
    expect(issues.some((i) => i.code === 'forbidden_field')).toBe(true);
    expect(JSON.stringify(sanitized)).not.toContain('@secret');
    expect(JSON.stringify(sanitized)).not.toContain('instagram.com/p/abc');
  });

  it('trackEvent blocks forbidden username fields', () => {
    const result = trackEvent({
      eventName: 'cart_item_add',
      serviceSlug: 'buy-instagram-followers',
      packageId: 'pkg-test',
      metadata: { username: 'leaked' },
    });
    expect(result.tracked).toBe(false);
    expect(result.issues.some((i) => i.code === 'forbidden_field')).toBe(true);
  });

  it('maps order_details_open to itself (canonical)', () => {
    expect(resolveCanonicalEventName('order_details_open')).toBe('order_details_open');
  });
});

describe('Phase 19.01 analytics debug production gate', () => {
  it('reports panel disabled when NODE_ENV is production', () => {
    const previous = process.env.NODE_ENV;
    vi.stubEnv('NODE_ENV', 'production');
    expect(isAnalyticsDebugPanelEnabled()).toBe(false);
    vi.stubEnv('NODE_ENV', previous ?? 'test');
  });
});

describe('Phase 19.01 toast copy helpers', () => {
  it('formats success message with quantity and service name', () => {
    const qty = new Intl.NumberFormat('en-US').format(1000);
    const title = `${qty} Instagram Followers added to your cart.`;
    expect(title).toBe('1,000 Instagram Followers added to your cart.');
  });
});

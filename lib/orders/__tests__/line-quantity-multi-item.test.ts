/**
 * Multi-product orders + cart lineQuantity (purchase multiplier).
 */

import { describe, expect, it } from 'vitest';

import { calculateCartTotals, cartLinesMatch } from '@/lib/cart/utils';
import {
  formatItemCountLabel,
  formatMultiItemServiceSummary,
  getOrderLineViews,
} from '@/lib/orders/line-display';
import {
  embedLineQuantityInConfiguration,
  extractLineQuantityFromConfiguration,
  normalizeLineQuantity,
  parseStrictLineQuantity,
  stripLineQuantityFromConfiguration,
} from '@/lib/orders/line-quantity';
import { validateCheckoutPricing } from '@/lib/orders/pricing';
import { formatOrderNumber, toMollieOrderId } from '@/lib/orders/public-number';
import { toPublicTrackedOrder } from '@/lib/tracking/lookup';
import type { CartItem } from '@/types/cart';
import type { Order, OrderLineItem } from '@/types/order';

function cartLine(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 'cart_1',
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram',
    packageTitle: '1000 Instagram Followers',
    quantity: 1000,
    quantityLabel: '1000 Instagram Followers',
    lineQuantity: 1,
    unitPrice: 1399,
    currency: 'USD',
    deliveryTime: '0-1 hours',
    configuration: { username: '@accountA' },
    addedAt: new Date().toISOString(),
    ...overrides,
  };
}

function orderLine(overrides: Partial<OrderLineItem> = {}): OrderLineItem {
  return {
    id: 'oli_1',
    platformId: 'instagram',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    packageId: 'ig-f-1000',
    packageTitle: '1000 Instagram Followers',
    quantity: 1000,
    quantityLabel: '1000 Instagram Followers',
    lineQuantity: 1,
    unitPrice: 999,
    currency: 'USD',
    configuration: { username: '@example' },
    ...overrides,
  };
}

function sampleOrder(items: OrderLineItem[]): Order {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * normalizeLineQuantity(item.lineQuantity),
    0,
  );
  return {
    id: 'IV-TEST',
    publicNumber: 1001,
    guestEmail: 'buyer@example.com',
    status: 'pending',
    fulfillmentMode: 'manual',
    currency: 'USD',
    items,
    subtotal: { amount: subtotal, currency: 'USD' },
    discount: { amount: 0, currency: 'USD' },
    total: { amount: subtotal, currency: 'USD' },
    timeline: [],
    internalNotes: [],
    createdAt: '2026-09-11T12:00:00.000Z',
    updatedAt: '2026-09-11T12:00:00.000Z',
    payment: {
      provider: 'remote-payment',
      status: 'pending',
      amount: { amount: subtotal, currency: 'USD' },
    },
  };
}

describe('lineQuantity helpers', () => {
  it('defaults missing lineQuantity to 1', () => {
    expect(normalizeLineQuantity(undefined)).toBe(1);
    expect(normalizeLineQuantity(null)).toBe(1);
    expect(extractLineQuantityFromConfiguration({})).toBe(1);
  });

  it('keeps package quantity distinct from lineQuantity', () => {
    const line = orderLine({ quantity: 1000, lineQuantity: 3 });
    expect(line.quantity).toBe(1000);
    expect(normalizeLineQuantity(line.lineQuantity)).toBe(3);
  });

  it('rejects invalid lineQuantity values', () => {
    expect(parseStrictLineQuantity(0)).toBeNull();
    expect(parseStrictLineQuantity(-1)).toBeNull();
    expect(parseStrictLineQuantity(1.5)).toBeNull();
    expect(parseStrictLineQuantity(NaN)).toBeNull();
    expect(parseStrictLineQuantity('abc')).toBeNull();
    expect(parseStrictLineQuantity('3')).toBe(3);
  });

  it('embeds and strips reserved configuration key without migration', () => {
    const embedded = embedLineQuantityInConfiguration({ username: '@a' }, 3);
    expect(extractLineQuantityFromConfiguration(embedded)).toBe(3);
    expect(stripLineQuantityFromConfiguration(embedded)).toEqual({ username: '@a' });
  });
});

describe('cart merge + totals', () => {
  it('matches same package + same config for merge', () => {
    const a = cartLine({ configuration: { username: '@accountA' } });
    const b = cartLine({ configuration: { username: '@accountA' } });
    const c = cartLine({ configuration: { username: '@accountB' } });
    expect(cartLinesMatch(a, b)).toBe(true);
    expect(cartLinesMatch(a, c)).toBe(false);
  });

  it('multiplies unit price by lineQuantity in cart totals', () => {
    const totals = calculateCartTotals(
      [cartLine({ unitPrice: 999, lineQuantity: 3 })],
      null,
      'USD',
    );
    expect(totals.subtotal.amount).toBe(2997);
    expect(totals.itemCount).toBe(3);
    expect(totals.lineCount).toBe(1);
  });

  it('sums multiple products correctly', () => {
    const totals = calculateCartTotals(
      [
        cartLine({ unitPrice: 999, lineQuantity: 1 }),
        cartLine({
          id: 'cart_2',
          packageId: 'tt-v-hq-5000',
          serviceSlug: 'buy-tiktok-views',
          serviceName: 'TikTok Views',
          unitPrice: 549,
          quantity: 5000,
          quantityLabel: '5000 High Quality TikTok Views',
          configuration: { targetUrl: 'https://www.tiktok.com/@demo/video/1' },
        }),
      ],
      null,
      'USD',
    );
    expect(totals.subtotal.amount).toBe(1548);
    expect(totals.lineCount).toBe(2);
  });
});

describe('server pricing', () => {
  it('multiplies authoritative catalog price by lineQuantity=3', () => {
    const priced = validateCheckoutPricing({
      items: [cartLine({ lineQuantity: 3 })],
    });
    expect(priced.items[0]?.quantity).toBe(1000);
    expect(priced.items[0]?.lineQuantity).toBe(3);
    expect(priced.total.amount).toBe(priced.items[0]!.unitPrice * 3);
  });

  it('rejects invalid lineQuantity', () => {
    expect(() =>
      validateCheckoutPricing({
        items: [cartLine({ lineQuantity: 0 as never })],
      }),
    ).toThrow(/line quantity/i);
  });

  it('totals multiple products', () => {
    const priced = validateCheckoutPricing({
      items: [
        cartLine({ lineQuantity: 1 }),
        cartLine({
          id: 'cart_2',
          packageId: 'tt-v-hq-5000',
          serviceId: 'tiktok-views',
          serviceSlug: 'buy-tiktok-views',
          serviceName: 'TikTok Views',
          platformId: 'tiktok',
          packageTitle: '5000 High Quality TikTok Views',
          quantity: 5000,
          quantityLabel: '5000 High Quality TikTok Views',
          configuration: { targetUrl: 'https://www.tiktok.com/@demo/video/1' },
        }),
      ],
    });
    expect(priced.items).toHaveLength(2);
    expect(priced.total.amount).toBe(
      priced.items[0]!.unitPrice + priced.items[1]!.unitPrice,
    );
  });
});

describe('admin + track projections', () => {
  it('admin multi-item summary indicates additional items', () => {
    const order = sampleOrder([
      orderLine(),
      orderLine({
        id: 'oli_2',
        serviceName: 'TikTok Views',
        packageTitle: '5000 TikTok Views',
        quantityLabel: '5000 TikTok Views',
        unitPrice: 699,
      }),
    ]);
    expect(formatMultiItemServiceSummary(order)).toBe('Instagram Followers + 1 more');
    expect(formatItemCountLabel(order)).toBe('2 items');
    expect(getOrderLineViews(order)).toHaveLength(2);
  });

  it('legacy order without lineQuantity behaves as qty 1', () => {
    const legacy = orderLine();
    delete legacy.lineQuantity;
    const views = getOrderLineViews(sampleOrder([legacy]));
    expect(views[0]?.lineQuantity).toBe(1);
    expect(views[0]?.lineTotal).toBe(legacy.unitPrice);
  });

  it('track order returns all items', () => {
    const order = sampleOrder([
      orderLine({ lineQuantity: 3, unitPrice: 999 }),
      orderLine({
        id: 'oli_2',
        serviceName: 'TikTok Views',
        packageTitle: '5000 Views',
        quantityLabel: '5000 Views',
        unitPrice: 699,
        configuration: { videoUrl: 'https://tiktok.com/v/1' },
      }),
    ]);
    const tracked = toPublicTrackedOrder(order);
    expect(tracked.items).toHaveLength(2);
    expect(tracked.items[0]?.lineQuantity).toBe(3);
    expect(tracked.orderId).toBe('01001');
  });
});

describe('public number + mollie contracts unchanged', () => {
  it('keeps 01001 display and mollie digits 1001', () => {
    expect(formatOrderNumber(1001)).toBe('01001');
    expect(toMollieOrderId(1001)).toBe('1001');
  });
});

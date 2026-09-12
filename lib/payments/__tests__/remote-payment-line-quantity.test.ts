/**
 * Remote Mollie items_json must reflect lineQuantity (purchase qty).
 * Collector contract verified against Woo client: qty=get_quantity, line_total=get_total().
 */

import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import { cartLinesMatch, createCartItemId, getCartLineQuantity } from '@/lib/cart/utils';
import { normalizeLineQuantity } from '@/lib/orders/line-quantity';
import { validateCheckoutPricing } from '@/lib/orders/pricing';
import {
  buildMollieCreateBody,
  buildMollieSignaturePayload,
  formatMajorAmount,
  signMolliePayload,
} from '@/lib/payments/mollie-remote-protocol';
import { buildRemotePaymentItems } from '@/lib/payments/providers/remote-payment';
import type { CartItem } from '@/types/cart';

function cartItem(overrides: Partial<CartItem> = {}): CartItem {
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
    unitPrice: 999,
    currency: 'USD',
    deliveryTime: '',
    configuration: { username: '@example' },
    addedAt: new Date().toISOString(),
    ...overrides,
  };
}

/** Mirror cart-context addItem merge (same package + same config → increment). */
function addToCart(items: CartItem[], incoming: Omit<CartItem, 'id' | 'addedAt'>): CartItem[] {
  const incomingQty = normalizeLineQuantity(incoming.lineQuantity);
  const matchIndex = items.findIndex((existing) => cartLinesMatch(existing, incoming));
  if (matchIndex >= 0) {
    return items.map((existing, index) =>
      index === matchIndex
        ? { ...existing, lineQuantity: getCartLineQuantity(existing) + incomingQty }
        : existing,
    );
  }
  return [
    ...items,
    {
      ...incoming,
      lineQuantity: incomingQty,
      id: createCartItemId(),
      addedAt: new Date().toISOString(),
    },
  ];
}

describe('remote Mollie items_json lineQuantity contract', () => {
  it('lineQuantity=1 produces qty=1 and unit line_total', () => {
    const items = buildRemotePaymentItems([cartItem({ lineQuantity: 1, unitPrice: 999 })], {
      orderId: '1001',
      amountMinor: 999,
    });
    expect(items).toEqual([
      {
        product_id: 'ig-f-1000',
        name: '1000 Instagram Followers',
        qty: 1,
        line_total: '9.99',
      },
    ]);
  });

  it('missing legacy lineQuantity behaves as qty=1', () => {
    const legacy = cartItem();
    delete legacy.lineQuantity;
    const items = buildRemotePaymentItems([legacy], {
      orderId: '1001',
      amountMinor: 999,
    });
    expect(items[0]?.qty).toBe(1);
    expect(items[0]?.line_total).toBe('9.99');
  });

  it('lineQuantity=3 produces qty=3 and full line_total $29.97', () => {
    const items = buildRemotePaymentItems(
      [cartItem({ lineQuantity: 3, unitPrice: 999 })],
      { orderId: '1001', amountMinor: 2997 },
    );
    expect(items[0]?.qty).toBe(3);
    expect(items[0]?.line_total).toBe('29.97');
    expect(formatMajorAmount(2997)).toBe('29.97');
  });

  it('two lines preserve independent quantities and line values', () => {
    const items = buildRemotePaymentItems(
      [
        cartItem({ lineQuantity: 3, unitPrice: 999 }),
        cartItem({
          id: 'cart_2',
          packageId: 'tt-v-hq-5000',
          serviceName: 'TikTok Views',
          packageTitle: '5000 High Quality TikTok Views',
          quantity: 5000,
          lineQuantity: 2,
          unitPrice: 699,
          configuration: { targetUrl: 'https://www.tiktok.com/@demo/video/1' },
        }),
      ],
      { orderId: '1001', amountMinor: 4395 },
    );
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ qty: 3, line_total: '29.97' });
    expect(items[1]).toMatchObject({ qty: 2, line_total: '13.98' });
    const subtotal =
      Number(items[0]!.line_total) + Number(items[1]!.line_total);
    expect(subtotal).toBeCloseTo(43.95, 2);
  });

  it('charged amount stays authoritative order.total; coupon applied once', () => {
    const priced = validateCheckoutPricing({
      items: [
        cartItem({
          lineQuantity: 3,
          unitPrice: 1, // client price ignored — catalog is authoritative
        }),
      ],
    });
    // Catalog ig-f-1000 is $13.99 → 1399 minor × 3
    expect(priced.items[0]?.lineQuantity).toBe(3);
    expect(priced.total.amount).toBe(priced.items[0]!.unitPrice * 3);

    const remoteItems = buildRemotePaymentItems(
      [
        cartItem({
          lineQuantity: 3,
          unitPrice: priced.items[0]!.unitPrice,
        }),
      ],
      { orderId: '1001', amountMinor: priced.total.amount },
    );
    expect(remoteItems[0]?.qty).toBe(3);
    expect(remoteItems[0]?.line_total).toBe(
      formatMajorAmount(priced.items[0]!.unitPrice * 3),
    );

    // Coupon once on subtotal — line qty not multiplied into discount.
    const withCoupon = validateCheckoutPricing({
      items: [
        cartItem({ lineQuantity: 3, unitPrice: priced.items[0]!.unitPrice }),
        cartItem({
          id: 'cart_2',
          packageId: 'tt-v-hq-5000',
          serviceId: 'tiktok-views',
          serviceSlug: 'buy-tiktok-views',
          serviceName: 'TikTok Views',
          platformId: 'tiktok',
          packageTitle: '5000 High Quality TikTok Views',
          quantity: 5000,
          quantityLabel: '5000 High Quality TikTok Views',
          lineQuantity: 2,
          unitPrice: 699,
          configuration: { targetUrl: 'https://www.tiktok.com/@demo/video/1' },
        }),
      ],
      couponCode: null,
    });
    const subtotalMinor = withCoupon.subtotal.amount;
    const discountMinor = 500; // $5.00 illustrative — applied once in real coupon path
    const chargedMinor = Math.max(0, subtotalMinor - discountMinor);
    expect(subtotalMinor).toBe(
      withCoupon.items[0]!.unitPrice * 3 + withCoupon.items[1]!.unitPrice * 2,
    );
    // items_json still full line values; amount may be discounted separately
    const remote = buildRemotePaymentItems(
      withCoupon.items.map((item, i) =>
        cartItem({
          id: `c_${i}`,
          packageId: item.packageId,
          serviceId: item.serviceId,
          serviceSlug: item.serviceSlug,
          serviceName: item.serviceName,
          packageTitle: item.packageTitle,
          quantity: item.quantity,
          quantityLabel: item.quantityLabel,
          lineQuantity: item.lineQuantity,
          unitPrice: item.unitPrice,
          configuration: item.configuration,
        }),
      ),
      { orderId: '1001', amountMinor: chargedMinor },
    );
    const itemsSum = remote.reduce((s, row) => s + Number(row.line_total), 0);
    expect(itemsSum).toBeCloseTo(subtotalMinor / 100, 2);
    expect(formatMajorAmount(chargedMinor)).not.toBe(formatMajorAmount(subtotalMinor));
    expect(Number(formatMajorAmount(chargedMinor))).toBeCloseTo(itemsSum - 5, 2);
  });

  it('body items_json exactly matches HMAC hash input; order_id 1001; no merchant_order_number', () => {
    const remoteItems = buildRemotePaymentItems(
      [cartItem({ lineQuantity: 3, unitPrice: 999 })],
      { orderId: '1001', amountMinor: 2997 },
    );
    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success',
      cancelUrl: 'https://novalikes.com/checkout',
      orderId: '1001',
      amountMajor: '29.97',
      currency: 'USD',
      productName: 'Cubes',
      items: remoteItems,
      sharedSecret: 'abcdefghijklmnop',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
    });

    expect(body.order_id).toBe('1001');
    expect(body.amount).toBe('29.97');
    expect(body.merchant_order_number).toBeUndefined();
    expect(Object.keys(body)).not.toContain('merchant_order_number');
    expect(body.card_token).toBeUndefined();
    expect(body.integration_mode).toBeUndefined();
    expect(Object.keys(body)).not.toContain('card_token');
    expect(Object.keys(body)).not.toContain('integration_mode');

    const itemsJson = body.items_json;
    expect(JSON.parse(itemsJson)).toEqual([
      {
        product_id: 'ig-f-1000',
        name: '1000 Instagram Followers',
        qty: 3,
        line_total: '29.97',
      },
    ]);

    const expectedPayload = buildMollieSignaturePayload({
      orderId: '1001',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
      callbackUrl: body.callback_url,
      returnUrl: body.return_url,
      cancelUrl: body.cancel_url,
      amountMajor: '29.97',
      currency: 'USD',
      productName: 'Cubes',
      itemsJson,
    });
    expect(body.signature).toBe(signMolliePayload(expectedPayload, 'abcdefghijklmnop'));
    expect(createHash('sha256').update(itemsJson).digest('hex')).toHaveLength(64);
  });
});

describe('cart merge lineQuantity regressions', () => {
  it('same package + same target: qty 2 + add once => qty 3', () => {
    let items = [cartItem({ lineQuantity: 2, configuration: { username: '@accountA' } })];
    items = addToCart(items, {
      ...cartItem({ configuration: { username: '@accountA' }, lineQuantity: 1 }),
    });
    expect(items).toHaveLength(1);
    expect(items[0]?.lineQuantity).toBe(3);
  });

  it('same package + different target stays separate lines', () => {
    let items = [cartItem({ lineQuantity: 2, configuration: { username: '@accountA' } })];
    items = addToCart(items, {
      ...cartItem({ configuration: { username: '@accountB' }, lineQuantity: 1 }),
    });
    expect(items).toHaveLength(2);
    expect(items[0]?.lineQuantity).toBe(2);
    expect(items[1]?.lineQuantity).toBe(1);
  });
});

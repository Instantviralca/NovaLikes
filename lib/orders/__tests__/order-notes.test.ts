/**
 * Optional order notes on the 10 service dialogs — validation, persist, admin escape.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { OrderSummaryCard } from '@/components/admin/orders/order-summary-card';
import { getOrderFieldsForServiceSlug, getServiceOrderConfig } from '@/data/order-fields';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import {
  buildItemsHtml,
  buildItemsText,
} from '@/lib/notifications/order-hooks';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import { validateCheckoutPricing } from '@/lib/orders/pricing';
import { createCartItemId } from '@/lib/cart/utils';
import type { AdminOrderDetails } from '@/types/admin-orders';
import type { CartItem } from '@/types/cart';
import type { Order } from '@/types/order';

const NOTES_SLUGS = [
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
] as const;

const NOTES_HELP_DEFAULT = 'Want gradual delivery? Tell us the pace you prefer.';
const NOTES_HELP_COMMENTS =
  'Add your own comments, one per line, ask for another language, or ask for gradual delivery. Leave empty and our team writes the comments.';
const NOTES_HELP_FB_POST =
  'Likes are the default. Write Love or another reaction here, or ask for gradual delivery.';

function notesFieldFor(slug: (typeof NOTES_SLUGS)[number]) {
  return getServiceOrderConfig(slug).fields.find((f) => f.id === 'notes' || f.name === 'notes');
}

describe('order notes field on 10 service dialogs', () => {
  it('appends an optional notes field to all 10 slug overrides', () => {
    for (const slug of NOTES_SLUGS) {
      const notes = notesFieldFor(slug);
      expect(notes, slug).toBeTruthy();
      expect(notes!.optional).toBe(true);
      expect(notes!.label).toBe('Order notes (optional)');
      expect(notes!.placeholder).toBe('Anything we should know about this order?');
      expect(notes!.validation?.required).toBeFalsy();
    }
  });

  it('uses the approved help text and max lengths per slug', () => {
    expect(notesFieldFor('buy-instagram-followers')!.helpText).toBe(NOTES_HELP_DEFAULT);
    expect(notesFieldFor('buy-instagram-followers')!.validation?.maxLength).toBe(500);
    expect(notesFieldFor('buy-instagram-comments')!.helpText).toBe(NOTES_HELP_COMMENTS);
    expect(notesFieldFor('buy-instagram-comments')!.validation?.maxLength).toBe(4000);
    expect(notesFieldFor('buy-facebook-post-likes')!.helpText).toBe(NOTES_HELP_FB_POST);
    expect(notesFieldFor('buy-facebook-post-likes')!.validation?.maxLength).toBe(500);
  });

  it('treats notes as optional (empty passes validation)', () => {
    const config = getServiceOrderConfig('buy-instagram-followers');
    const normalized = normalizeOrderConfigurationValues(config.fields, {
      username: 'valid.user',
      notes: '   ',
    });
    expect(normalized.notes).toBeUndefined();
    expect(validateOrderConfiguration(config.fields, normalized)).toEqual([]);
  });

  it('enforces maxLength 500 (and 4000 for comments)', () => {
    const followers = getServiceOrderConfig('buy-instagram-followers');
    const tooLong = 'x'.repeat(501);
    const errors = validateOrderConfiguration(followers.fields, {
      username: 'valid.user',
      notes: tooLong,
    });
    expect(errors.some((e) => e.fieldId === 'notes')).toBe(true);

    const comments = getServiceOrderConfig('buy-instagram-comments');
    const okComments = validateOrderConfiguration(comments.fields, {
      targetUrl: 'https://www.instagram.com/p/ABC123def/',
      notes: 'y'.repeat(4000),
    });
    expect(okComments.filter((e) => e.fieldId === 'notes')).toEqual([]);

    const commentsTooLong = validateOrderConfiguration(comments.fields, {
      targetUrl: 'https://www.instagram.com/p/ABC123def/',
      notes: 'y'.repeat(4001),
    });
    expect(commentsTooLong.some((e) => e.fieldId === 'notes')).toBe(true);
  });

  it('persists notes on the order line configuration through checkout pricing', () => {
    const packages = getActivePackagesByServiceSlug('buy-instagram-followers');
    const pkg = packages[0]!;
    const fields = getOrderFieldsForServiceSlug('buy-instagram-followers', pkg);
    const configuration = normalizeOrderConfigurationValues(fields, {
      username: 'demo_user',
      notes: 'Please deliver gradually over 3 days.',
    });

    const item: CartItem = {
      id: createCartItemId(),
      packageId: pkg.id,
      serviceId: pkg.serviceId,
      serviceSlug: 'buy-instagram-followers',
      serviceName: 'Instagram Followers',
      platformId: 'instagram',
      packageTitle: pkg.title,
      quantity: pkg.quantity,
      quantityLabel: pkg.quantityLabel,
      unitPrice: pkg.price,
      currency: pkg.currency,
      deliveryTime: pkg.deliveryTime,
      configuration,
      addedAt: new Date().toISOString(),
    };

    const priced = validateCheckoutPricing({ items: [item] });
    expect(priced.items[0]?.configuration.notes).toBe(
      'Please deliver gradually over 3 days.',
    );

    const emptyNotesItem: CartItem = {
      ...item,
      id: createCartItemId(),
      configuration: normalizeOrderConfigurationValues(fields, {
        username: 'demo_user',
        notes: '',
      }),
    };
    const pricedEmpty = validateCheckoutPricing({ items: [emptyNotesItem] });
    expect(pricedEmpty.items[0]?.configuration.notes).toBeUndefined();
    expect('notes' in (pricedEmpty.items[0]?.configuration ?? {})).toBe(false);
  });

  it('escapes notes as plain text in admin order detail and admin email', () => {
    const evil = '<script>alert(1)</script>\nLove';
    const adminOrder = {
      id: 'IV-TEST',
      publicOrderId: '01001',
      customerEmail: 'buyer@example.com',
      platformId: 'instagram',
      serviceName: 'Instagram Comments',
      packageTitle: '10 Comments',
      quantity: 10,
      quantityLabel: '10',
      itemCount: 1,
      itemCountLabel: '1 item',
      purchaseUnitCount: 1,
      isMultiItem: false,
      totalDisplay: '$19.99',
      paymentStatus: 'paid',
      orderStatus: 'pending',
      targetDisplay: 'https://www.instagram.com/p/ABC/',
      createdAt: '2026-10-24T00:00:00.000Z',
      updatedAt: '2026-10-24T00:00:00.000Z',
      timeline: [],
      internalNotes: [],
      subtotalDisplay: '$19.99',
      discountDisplay: '$0.00',
      configuration: {
        targetUrl: 'https://www.instagram.com/p/ABC/',
        notes: evil,
      },
      fulfillmentFields: [
        {
          key: 'targetUrl',
          label: 'Target URL',
          value: 'https://www.instagram.com/p/ABC/',
        },
        { key: 'notes', label: 'Order notes', value: evil },
      ],
      lines: [
        {
          id: 'li_1',
          platformId: 'instagram',
          serviceName: 'Instagram Comments',
          packageTitle: '10 Comments',
          quantityLabel: '10',
          packageQuantity: 10,
          lineQuantity: 1,
          unitPriceDisplay: '$19.99',
          lineTotalDisplay: '$19.99',
          targetDisplay: 'https://www.instagram.com/p/ABC/',
          configuration: {
            targetUrl: 'https://www.instagram.com/p/ABC/',
            notes: evil,
          },
          fulfillmentFields: [
            {
              key: 'targetUrl',
              label: 'Target URL',
              value: 'https://www.instagram.com/p/ABC/',
            },
            { key: 'notes', label: 'Order notes', value: evil },
          ],
        },
      ],
    } as AdminOrderDetails;

    const adminHtml = renderToStaticMarkup(
      createElement(OrderSummaryCard, { order: adminOrder }),
    );
    expect(adminHtml).toContain('Order notes');
    expect(adminHtml).toContain('Love');
    expect(adminHtml).not.toContain('<script>alert(1)</script>');
    expect(adminHtml).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');

    const order = {
      id: 'IV-TEST',
      publicNumber: 1001,
      guestEmail: 'buyer@example.com',
      status: 'pending',
      fulfillmentMode: 'manual',
      currency: 'USD',
      items: [
        {
          id: 'li_1',
          platformId: 'instagram',
          serviceId: 'svc',
          serviceSlug: 'buy-instagram-comments',
          serviceName: 'Instagram Comments',
          packageId: 'pkg',
          packageTitle: '10 Comments',
          quantity: 10,
          quantityLabel: '10',
          lineQuantity: 1,
          unitPrice: 19.99,
          currency: 'USD',
          configuration: {
            targetUrl: 'https://www.instagram.com/p/ABC/',
            notes: evil,
          },
        },
      ],
      subtotal: { amount: 19.99, currency: 'USD' },
      discount: { amount: 0, currency: 'USD' },
      total: { amount: 19.99, currency: 'USD' },
      timeline: [],
      internalNotes: [],
      createdAt: '2026-10-24T00:00:00.000Z',
      updatedAt: '2026-10-24T00:00:00.000Z',
    } as Order;

    const emailHtml = buildItemsHtml(order);
    expect(emailHtml).toContain('Order notes:');
    expect(emailHtml).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(emailHtml).toContain('<br />Love');
    expect(emailHtml).not.toContain('<script>alert(1)</script>');

    const emailText = buildItemsText(order);
    expect(emailText).toContain('Order notes:\n<script>alert(1)</script>\nLove');

    const emptyOrder = {
      ...order,
      items: [
        {
          ...order.items[0]!,
          configuration: { targetUrl: 'https://www.instagram.com/p/ABC/' },
        },
      ],
    } as Order;
    expect(buildItemsHtml(emptyOrder)).not.toContain('Order notes');
    expect(buildItemsText(emptyOrder)).not.toContain('Order notes');
  });
});

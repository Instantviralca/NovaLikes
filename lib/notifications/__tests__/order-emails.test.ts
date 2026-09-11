/**
 * Branded transactional order emails — subjects, 01001 display, pending vs paid.
 */

import { describe, expect, it } from 'vitest';

import { NOTIFICATION_TEMPLATES } from '@/data/notifications/templates';
import {
  escapeHtml,
  formatEmailGreeting,
  renderTransactionalEmailShell,
} from '@/lib/notifications/email-shell';
import { renderTemplate } from '@/lib/notifications/service';
import {
  resolveGenuineCustomerName,
  resolveOrderProfileUrl,
} from '@/lib/notifications/order-hooks';
import { formatOrderNumber, getCustomerOrderId } from '@/lib/orders/public-number';
import type { Order } from '@/types/order';

function sampleOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: 'IV-ABC123',
    publicNumber: 1001,
    guestEmail: 'alex.smith92@example.com',
    status: 'pending',
    fulfillmentMode: 'manual',
    currency: 'USD',
    items: [
      {
        id: 'li_1',
        serviceId: 'svc_ig_followers',
        serviceName: 'Instagram Followers',
        packageId: 'pkg_1k',
        packageTitle: '1,000 Followers',
        quantity: 1000,
        quantityLabel: '1,000',
        unitPrice: { amount: 9.99, currency: 'USD' },
        lineTotal: { amount: 9.99, currency: 'USD' },
        configuration: {
          username: 'https://instagram.com/novademo',
        },
      },
    ],
    subtotal: { amount: 9.99, currency: 'USD' },
    discount: { amount: 0, currency: 'USD' },
    total: { amount: 9.99, currency: 'USD' },
    timeline: [],
    internalNotes: [],
    createdAt: '2026-09-11T12:00:00.000Z',
    updatedAt: '2026-09-11T12:00:00.000Z',
    payment: { status: 'pending', provider: 'mollie' },
    ...overrides,
  } as Order;
}

const customerVars = {
  companyName: 'NovaLikes',
  greetingLine: 'Hi,',
  customerName: '',
  customerEmail: 'alex.smith92@example.com',
  orderId: '01001',
  internalOrderId: 'IV-ABC123',
  serviceName: 'Instagram Followers',
  packageName: '1,000 Followers',
  profileUrl: 'https://instagram.com/novademo',
  quantity: '1,000',
  orderTotal: '$9.99 USD',
  paymentStatus: 'Pending',
  statusLabel: 'Pending',
  orderDate: 'September 11, 2026',
  detailsHtml:
    '<table><tr><td>Order ID</td><td>01001</td></tr><tr><td>Payment Status</td><td>Pending</td></tr></table>',
  detailsText:
    'Order ID: 01001\nService: Instagram Followers\nPackage: 1,000 Followers\nSocial Profile / Target URL: https://instagram.com/novademo\nTotal: $9.99 USD\nPayment Status: Pending\nOrder Date: September 11, 2026',
  trackingUrl: 'https://novalikes.com/track-order?orderId=01001',
  adminOrderUrl: 'https://novalikes.com/admin/orders?orderId=IV-ABC123',
  supportEmail: 'support@novalikes.com',
  supportHtml:
    'Need help? <a href="mailto:support@novalikes.com">support@novalikes.com</a>',
  supportText: 'Support: support@novalikes.com',
  siteUrl: 'https://novalikes.com',
};

describe('transactional order email redesign', () => {
  it('does not invent greeting names from email local-parts', () => {
    expect(formatEmailGreeting(null)).toBe('Hi,');
    expect(formatEmailGreeting(undefined)).toBe('Hi,');
    expect(formatEmailGreeting('')).toBe('Hi,');
    expect(formatEmailGreeting('Jane Doe')).toBe('Hi Jane Doe,');
    expect(resolveGenuineCustomerName(sampleOrder())).toBeNull();
    const tpl = NOTIFICATION_TEMPLATES.find((t) => t.id === 'order_confirmation');
    const html = renderTemplate(tpl!.bodyHtml, customerVars as never);
    expect(html).toContain('Hi,');
    expect(html).not.toMatch(/Hi alex/i);
    expect(html).not.toMatch(/Hi alex\.smith92/i);
  });

  it('customer received subject/copy stays pending-only', () => {
    const tpl = NOTIFICATION_TEMPLATES.find((t) => t.id === 'order_confirmation');
    expect(tpl?.subject).toBe('Order received — {{orderId}}');
    expect(tpl?.bodyHtml).toContain('We received your order');
    expect(tpl?.bodyHtml.toLowerCase()).toContain('pending');
    expect(tpl?.bodyHtml.toLowerCase()).toContain(
      'we’ll begin processing your order once payment is confirmed',
    );
    expect(tpl?.bodyHtml.toLowerCase()).not.toMatch(/payment confirmed/);
    expect(tpl?.bodyHtml.toLowerCase()).not.toContain('being processed');
    const subject = renderTemplate(tpl!.subject, { orderId: '01001' } as never);
    expect(subject).toBe('Order received — 01001');
  });

  it('renders 01001 in customer subjects and escapes HTML', () => {
    const tpl = NOTIFICATION_TEMPLATES.find((t) => t.id === 'order_confirmation');
    expect(tpl).toBeTruthy();
    const orderId = formatOrderNumber(1001);
    expect(orderId).toBe('01001');
    expect(getCustomerOrderId({ id: 'IV-INTERNAL', publicNumber: 1001 })).toBe('01001');
    const subject = renderTemplate(tpl!.subject, {
      orderId,
      companyName: 'NovaLikes',
    } as never);
    expect(subject).toContain('01001');
    expect(subject).not.toContain('IV-');

    const evil = `<script>alert(1)</script>`;
    expect(escapeHtml(evil)).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    const html = renderTransactionalEmailShell({
      title: 'Order received',
      companyName: 'NovaLikes',
      supportEmail: 'support@example.com',
      siteUrl: 'https://novalikes.com',
      bodyHtml: `<p>${escapeHtml(evil)}</p>`,
    });
    expect(html).toContain('https://novalikes.com');
    expect(html).toContain('NovaLikes');
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html.match(/© \d{4} NovaLikes\. All rights reserved\./g)?.length).toBe(1);
  });

  it('omits empty support lines and never duplicates copyright', () => {
    const html = renderTransactionalEmailShell({
      title: 'Order received',
      companyName: 'NovaLikes',
      supportEmail: '',
      siteUrl: 'https://novalikes.com',
      bodyHtml: '<p>Hi,</p>',
    });
    expect(html).not.toMatch(/Need help\?\s*<\/p>/);
    expect(html).not.toMatch(/Support:\s*<\/p>/);
    expect(html).not.toContain('Support: <a');
    expect(html.match(/All rights reserved\./g)?.length).toBe(1);
  });

  it('track URL uses orderId only (no email PII)', () => {
    expect(customerVars.trackingUrl).toBe(
      'https://novalikes.com/track-order?orderId=01001',
    );
    expect(customerVars.trackingUrl).not.toContain('email=');
  });

  it('exposes profile URL from order configuration when present', () => {
    expect(resolveOrderProfileUrl(sampleOrder())).toBe(
      'https://instagram.com/novademo',
    );
    expect(
      resolveOrderProfileUrl(
        sampleOrder({
          items: [
            {
              ...sampleOrder().items[0],
              configuration: {},
            },
          ],
        }),
      ),
    ).toBe('');
  });

  it('processing/completed copy avoids duplicate status sentences', () => {
    const processing = NOTIFICATION_TEMPLATES.find((t) => t.id === 'processing_update');
    expect(processing?.subject).toBe('Your order is being processed — {{orderId}}');
    expect(processing?.bodyHtml).toContain(
      'We’ve started processing order <strong>{{orderId}}</strong>',
    );

    const completed = NOTIFICATION_TEMPLATES.find((t) => t.id === 'order_completed');
    expect(completed?.subject).toBe('Order completed — {{orderId}}');
    expect(completed?.bodyHtml).toContain('Thank you for choosing NovaLikes');
    expect(completed?.bodyHtml.toLowerCase()).not.toContain('completed successfully');
  });

  it('shared shell uses env site URL placeholder, not hardcoded localhost', () => {
    const tpl = NOTIFICATION_TEMPLATES.find((t) => t.id === 'order_confirmation');
    expect(tpl?.bodyHtml).toContain('{{siteUrl}}');
    expect(tpl?.bodyHtml).not.toContain('http://localhost:3000');
  });
});

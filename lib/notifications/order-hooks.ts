/**
 * Order notification hooks — customer + admin emails after verified events.
 */

import { getEmailFrom, getSiteUrl, isEmailConfigured } from '@/lib/config/env';
import { dispatchNotification } from '@/lib/notifications/service';
import { dispatchTransactionalEmail } from '@/lib/notifications/email';
import { formatMoney } from '@/lib/pricing/format';
import { getAdminNotificationEmail } from '@/lib/settings/site-settings';
import type { Order } from '@/types/order';
import { ORDER_STATUS_METADATA } from '@/lib/orders/status';

function supportEmail(): string {
  return process.env.EMAIL_SUPPORT?.trim() || getEmailFrom() || '';
}

function companyName(): string {
  return process.env.EMAIL_COMPANY_NAME?.trim() || 'NovaLikes';
}

function trackingUrl(orderId: string, email: string): string {
  const base = getSiteUrl();
  return `${base}/track-order?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`;
}

function baseVariables(order: Order) {
  const item = order.items[0];
  const meta = ORDER_STATUS_METADATA[order.status];
  const year = new Date().getFullYear();
  return {
    companyName: companyName(),
    customerEmail: order.guestEmail,
    customerName: order.guestEmail.split('@')[0] || 'there',
    orderId: order.id,
    serviceName: item?.serviceName ?? 'Service',
    packageName: item?.packageTitle ?? '',
    quantity: item?.quantityLabel ?? '',
    orderTotal: formatMoney(order.total.amount, order.total.currency),
    itemCount: String(order.items.length),
    statusLabel: meta?.customerLabel ?? order.status,
    statusMessage: meta?.customerMessage ?? '',
    trackingUrl: trackingUrl(order.id, order.guestEmail),
    supportEmail: supportEmail(),
    footerText: `© ${year} ${companyName()}. All rights reserved.`,
  };
}

/** Fire when checkout creates the order (before / as payment starts). */
export async function notifyOrderPlaced(order: Order): Promise<void> {
  const vars = baseVariables(order);

  await dispatchNotification({
    trigger: 'order_created',
    recipient: order.guestEmail,
    orderId: order.id,
    variables: vars,
    idempotencyKey: `order_confirmation:${order.id}`,
  });

  const adminTo = await getAdminNotificationEmail();
  if (adminTo && isEmailConfigured()) {
    await dispatchTransactionalEmail({
      templateId: 'admin_new_order',
      to: adminTo,
      orderId: order.id,
      idempotencyKey: `admin_new_order:${order.id}`,
      variables: {
        ...vars,
        subjectHint: `New order ${order.id}`,
      },
    });
  }
}

/** Fire when payment is verified paid (remote callback / webhook). */
export async function notifyOrderPaid(order: Order): Promise<void> {
  const vars = baseVariables(order);

  // Customer: payment confirmed (distinct from place-order confirmation).
  if (isEmailConfigured()) {
    await dispatchTransactionalEmail({
      templateId: 'payment_confirmed',
      to: order.guestEmail,
      orderId: order.id,
      idempotencyKey: `payment_confirmed:${order.id}`,
      variables: vars,
    });
  }

  const adminTo = await getAdminNotificationEmail();
  if (adminTo && isEmailConfigured()) {
    await dispatchTransactionalEmail({
      templateId: 'admin_order_paid',
      to: adminTo,
      orderId: order.id,
      idempotencyKey: `admin_order_paid:${order.id}`,
      variables: {
        ...vars,
        subjectHint: `Paid order ${order.id}`,
      },
    });
  }
}

export async function notifyOrderStatusChange(
  order: Order,
  trigger:
    | 'processing_started'
    | 'order_completed'
    | 'order_partial'
    | 'order_cancelled'
    | 'order_refunded',
): Promise<void> {
  await dispatchNotification({
    trigger,
    recipient: order.guestEmail,
    orderId: order.id,
    variables: baseVariables(order),
    idempotencyKey: `${trigger}:${order.id}:${order.status}`,
  });
}

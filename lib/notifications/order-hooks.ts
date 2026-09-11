/**
 * Order notification hooks — customer + admin emails after verified events.
 */

import { routes } from '@/config/routes';
import { getEmailFrom, getSiteUrl, isEmailConfigured } from '@/lib/config/env';
import { dispatchNotification } from '@/lib/notifications/service';
import { dispatchTransactionalEmail } from '@/lib/notifications/email';
import {
  buildEmailDetailsHtml,
  buildEmailDetailsText,
  escapeHtml,
  formatEmailGreeting,
  type EmailDetailRow,
} from '@/lib/notifications/email-shell';
import {
  formatMultiItemServiceSummary,
  getOrderLineViews,
  resolveLineTarget,
} from '@/lib/orders/line-display';
import { getCustomerOrderId } from '@/lib/orders/public-number';
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

function trackingUrl(orderId: string): string {
  const base = getSiteUrl().replace(/\/$/, '');
  return `${base}${routes.trackOrder}?orderId=${encodeURIComponent(orderId)}`;
}

function adminOrderUrl(internalOrderId: string): string {
  const base = getSiteUrl().replace(/\/$/, '');
  return `${base}/admin/orders?orderId=${encodeURIComponent(internalOrderId)}`;
}

function contactUrl(): string {
  const base = getSiteUrl().replace(/\/$/, '');
  return `${base}${routes.contact}`;
}

/** Profile / target from first line — empty when missing. Prefer per-line items. */
export function resolveOrderProfileUrl(order: Order): string {
  return resolveLineTarget(order.items[0]?.configuration);
}

export function resolveGenuineCustomerName(order: Order): string | null {
  void order;
  return null;
}

function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function formatTotalWithCurrency(order: Order): string {
  return `${formatMoney(order.total.amount, order.total.currency)} ${order.total.currency}`;
}

function paymentStatusLabel(order: Order): string {
  return order.payment?.status === 'paid' ? 'Paid' : 'Pending';
}

function supportHtml(support: string, site: string): string {
  if (support) {
    const safe = escapeHtml(support);
    return `Need help? <a href="mailto:${safe}" style="color:#0f172a;text-decoration:underline;">${safe}</a>`;
  }
  const href = escapeHtml(`${site}${routes.contact}`);
  return `Need help? <a href="${href}" style="color:#0f172a;text-decoration:underline;">Contact support</a>`;
}

function supportText(support: string, site: string): string {
  if (support) return `Support: ${support}`;
  return `Support: ${site}${routes.contact}`;
}

function buildItemsHtml(order: Order): string {
  const lines = getOrderLineViews(order);
  if (lines.length === 0) return '';
  return lines
    .map((line) => {
      const rows: string[] = [
        `<div style="font-weight:700;margin:0 0 6px;">${escapeHtml(line.serviceName)}</div>`,
        `<div style="margin:0 0 4px;">${escapeHtml(line.packageTitle || line.quantityLabel)}</div>`,
      ];
      if (line.targetDisplay) {
        rows.push(
          `<div style="margin:0 0 4px;color:#64748b;">Profile: ${escapeHtml(line.targetDisplay)}</div>`,
        );
      }
      rows.push(`<div style="margin:0 0 4px;">Qty: ${line.lineQuantity}</div>`);
      if (line.lineQuantity > 1) {
        rows.push(
          `<div style="margin:0 0 4px;">${escapeHtml(line.unitPriceDisplay)} each</div>`,
        );
      }
      rows.push(
        `<div style="margin:0;font-weight:600;">Line total: ${escapeHtml(line.lineTotalDisplay)}</div>`,
      );
      return `<div style="margin:0 0 14px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;">${rows.join('')}</div>`;
    })
    .join('');
}

function buildItemsText(order: Order): string {
  const lines = getOrderLineViews(order);
  return lines
    .map((line) => {
      const parts = [
        line.serviceName,
        line.packageTitle || line.quantityLabel,
        line.targetDisplay ? `Profile: ${line.targetDisplay}` : '',
        `Qty: ${line.lineQuantity}`,
        line.lineQuantity > 1 ? `${line.unitPriceDisplay} each` : '',
        `Line total: ${line.lineTotalDisplay}`,
      ].filter(Boolean);
      return parts.join('\n');
    })
    .join('\n\n');
}

function orderMetaRows(
  order: Order,
  options: { paymentStatus: string; statusLabel?: string },
): EmailDetailRow[] {
  const rows: EmailDetailRow[] = [
    { label: 'Order ID', value: getCustomerOrderId(order) },
    { label: 'Order Total', value: formatTotalWithCurrency(order) },
  ];
  if (options.paymentStatus) {
    rows.push({ label: 'Payment Status', value: options.paymentStatus });
  }
  if (
    options.statusLabel &&
    options.statusLabel.trim().toLowerCase() !== options.paymentStatus.trim().toLowerCase()
  ) {
    rows.push({ label: 'Status', value: options.statusLabel });
  }
  rows.push({ label: 'Order Date', value: formatOrderDate(order.createdAt) });
  return rows;
}

function baseVariables(order: Order) {
  const item = order.items[0];
  const meta = ORDER_STATUS_METADATA[order.status];
  const customerOrderId = getCustomerOrderId(order);
  const genuineName = resolveGenuineCustomerName(order);
  const support = supportEmail();
  const site = getSiteUrl().replace(/\/$/, '');
  const paymentStatus = paymentStatusLabel(order);
  const statusLabel = meta?.customerLabel ?? order.status;
  const metaRows = orderMetaRows(order, { paymentStatus, statusLabel });
  const serviceSummary = formatMultiItemServiceSummary(order);

  return {
    companyName: companyName(),
    customerEmail: order.guestEmail,
    customerName: genuineName ?? '',
    greetingLine: formatEmailGreeting(genuineName),
    orderId: customerOrderId,
    internalOrderId: order.id,
    serviceName: serviceSummary,
    packageName: item?.packageTitle ?? '',
    profileUrl: resolveOrderProfileUrl(order),
    quantity: item?.quantityLabel ?? '',
    orderTotal: formatTotalWithCurrency(order),
    paymentStatus,
    statusLabel,
    orderDate: formatOrderDate(order.createdAt),
    itemsHtml: buildItemsHtml(order),
    itemsText: buildItemsText(order),
    detailsHtml: buildEmailDetailsHtml(metaRows),
    detailsText: buildEmailDetailsText(metaRows),
    trackingUrl: trackingUrl(customerOrderId),
    adminOrderUrl: adminOrderUrl(order.id),
    supportEmail: support,
    supportHtml: supportHtml(support, site),
    supportText: supportText(support, site),
    supportContactUrl: support ? `mailto:${support}` : contactUrl(),
    siteUrl: site,
  };
}

/** Fire when checkout creates the order (before / as payment starts). */
export async function notifyOrderPlaced(order: Order): Promise<void> {
  const vars = baseVariables(order);
  const customerOrderId = getCustomerOrderId(order);

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
        subjectHint: `New order ${customerOrderId}`,
      },
    });
  }
}

/** Fire when payment is verified paid (remote callback / webhook). */
export async function notifyOrderPaid(order: Order): Promise<void> {
  const vars = baseVariables(order);
  const customerOrderId = getCustomerOrderId(order);

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
        subjectHint: `Paid order ${customerOrderId}`,
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

import type {
  NotificationTemplateDefinition,
  NotificationTemplateId,
  NotificationTrigger,
} from '@/types/notification';
import {
  getTransactionalSiteUrl,
  renderTransactionalEmailShell,
} from '@/lib/notifications/email-shell';

/**
 * Data-driven email templates — Document 11.04.
 * Customer-facing order reference prefers 01001 via {{orderId}}.
 * order_created must NOT claim payment confirmed or that processing has started.
 */

function customerShell(title: string, bodyHtml: string, preheader: string): string {
  return renderTransactionalEmailShell({
    title,
    companyName: '{{companyName}}',
    supportEmail: '{{supportEmail}}',
    siteUrl: '{{siteUrl}}',
    preheader,
    bodyHtml,
  });
}

const trackCtaHtml = `<p style="margin:18px 0 8px;">
      <a href="{{trackingUrl}}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;">Track your order</a>
    </p>`;

const itemsBlock = `{{itemsHtml}}
    {{detailsHtml}}`;

export const NOTIFICATION_TEMPLATES: NotificationTemplateDefinition[] = [
  {
    id: 'order_confirmation',
    channel: 'email',
    trigger: 'order_created',
    subject: 'Order received — {{orderId}}',
    bodyHtml: customerShell(
      'We received your order',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">Thanks for your order. We’ve received order <strong>{{orderId}}</strong>. Your payment is currently pending. We’ll email you again as soon as payment is confirmed.</p>
    ${itemsBlock}
    <p style="margin:0 0 14px;">We’ll begin processing your order once payment is confirmed.</p>
    ${trackCtaHtml}`,
      'We received your order. Payment is pending.',
    ),
    bodyText:
      'We received your order\n\n{{greetingLine}}\n\nThanks for your order. We’ve received order {{orderId}}. Your payment is currently pending. We’ll email you again as soon as payment is confirmed.\n\n{{itemsText}}\n\n{{detailsText}}\n\nWe’ll begin processing your order once payment is confirmed.\n\nTrack your order: {{trackingUrl}}',
    active: true,
  },
  {
    id: 'processing_update',
    channel: 'email',
    trigger: 'processing_started',
    subject: 'Your order is being processed — {{orderId}}',
    bodyHtml: customerShell(
      'Order processing',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">We’ve started processing order <strong>{{orderId}}</strong>. You can check the latest status at any time using the button below.</p>
    ${itemsBlock}
    ${trackCtaHtml}`,
      'Your order is being processed.',
    ),
    bodyText:
      'Order processing\n\n{{greetingLine}}\n\nWe’ve started processing order {{orderId}}. You can check the latest status at any time using the link below.\n\n{{itemsText}}\n\n{{detailsText}}\n\nTrack your order: {{trackingUrl}}',
    active: true,
  },
  {
    id: 'order_completed',
    channel: 'email',
    trigger: 'order_completed',
    subject: 'Order completed — {{orderId}}',
    bodyHtml: customerShell(
      'Order completed',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">Order <strong>{{orderId}}</strong> has been completed. Thank you for choosing NovaLikes.</p>
    ${itemsBlock}
    ${trackCtaHtml}`,
      'Your order is complete.',
    ),
    bodyText:
      'Order completed\n\n{{greetingLine}}\n\nOrder {{orderId}} has been completed. Thank you for choosing NovaLikes.\n\n{{itemsText}}\n\n{{detailsText}}\n\nTrack your order: {{trackingUrl}}',
    active: true,
  },
  {
    id: 'partial_completion',
    channel: 'email',
    trigger: 'order_partial',
    subject: 'Order partially completed — {{orderId}}',
    bodyHtml: customerShell(
      'Partial completion',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">Order <strong>{{orderId}}</strong> has been partially completed. If you need help or have questions about the remaining delivery, please contact our support team.</p>
    ${itemsBlock}
    <p style="margin:16px 0 0;font-size:13px;color:#64748b;">{{supportHtml}}</p>`,
      'Your order was partially completed.',
    ),
    bodyText:
      'Partial completion\n\n{{greetingLine}}\n\nOrder {{orderId}} has been partially completed. If you need help or have questions about the remaining delivery, please contact our support team.\n\n{{itemsText}}\n\n{{detailsText}}\n\n{{supportText}}',
    active: true,
  },
  {
    id: 'order_cancelled',
    channel: 'email',
    trigger: 'order_cancelled',
    subject: 'Order cancelled — {{orderId}}',
    bodyHtml: customerShell(
      'Order cancelled',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">Order <strong>{{orderId}}</strong> has been cancelled. If you believe this was unexpected or need assistance, please contact our support team.</p>
    ${itemsBlock}
    <p style="margin:16px 0 0;font-size:13px;color:#64748b;">{{supportHtml}}</p>`,
      'Your order was cancelled.',
    ),
    bodyText:
      'Order cancelled\n\n{{greetingLine}}\n\nOrder {{orderId}} has been cancelled. If you believe this was unexpected or need assistance, please contact our support team.\n\n{{itemsText}}\n\n{{detailsText}}\n\n{{supportText}}',
    active: true,
  },
  {
    id: 'refund_confirmation',
    channel: 'email',
    trigger: 'order_refunded',
    subject: 'Refund confirmation — {{orderId}}',
    bodyHtml: customerShell(
      'Refund confirmation',
      `<p style="margin:0 0 14px;">{{greetingLine}}</p>
    <p style="margin:0 0 14px;">A refund for order <strong>{{orderId}}</strong> has been processed.</p>
    ${itemsBlock}
    <p style="margin:16px 0 0;font-size:13px;color:#64748b;">{{supportHtml}}</p>`,
      'A refund has been processed.',
    ),
    bodyText:
      'Refund confirmation\n\n{{greetingLine}}\n\nA refund for order {{orderId}} has been processed.\n\n{{itemsText}}\n\n{{detailsText}}\n\n{{supportText}}',
    active: true,
  },
];

export function withDefaultEmailSiteUrl(
  variables: Record<string, string | undefined>,
): Record<string, string | undefined> {
  return {
    ...variables,
    siteUrl: variables.siteUrl?.trim() || getTransactionalSiteUrl(),
  };
}

export function getTemplateById(
  id: NotificationTemplateId,
): NotificationTemplateDefinition | undefined {
  return NOTIFICATION_TEMPLATES.find((t) => t.id === id && t.active);
}

export function getTemplateForTrigger(
  trigger: NotificationTrigger,
): NotificationTemplateDefinition | undefined {
  return NOTIFICATION_TEMPLATES.find((t) => t.trigger === trigger && t.active);
}

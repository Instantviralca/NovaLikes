/**
 * Transactional email — SMTP (self-hosted Postfix/relay) or Resend.
 * Disabled until EMAIL_FROM is set with SMTP_HOST and/or RESEND_API_KEY.
 */

import { withDefaultEmailSiteUrl } from '@/data/notifications/templates';
import { getEmailFrom, getEmailReplyTo, isEmailConfigured, isSmtpConfigured } from '@/lib/config/env';
import {
  buildEmailDetailsText,
  escapeEmailVariables,
  escapeHtml,
  filterEmailDetailRows,
  orderEmailBody,
  renderTransactionalEmailShell,
  type EmailDetailRow,
} from '@/lib/notifications/email-shell';
import { sendSmtpEmail } from '@/lib/notifications/smtp';
import { getPersistence } from '@/lib/persistence';
import type { NotificationProvider } from '@/types/notification';

export type ExtraTemplateId =
  | 'admin_new_order'
  | 'admin_order_paid'
  | 'payment_confirmed'
  | 'contact_admin'
  | 'contact_acknowledgement';

type ExtraSendInput = {
  templateId: ExtraTemplateId;
  to: string;
  orderId?: string;
  idempotencyKey: string;
  variables: Record<string, string | undefined>;
};

function render(template: string, variables: Record<string, string | undefined>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => variables[key] ?? '');
}

function adminMetaRows(
  variables: Record<string, string | undefined>,
  paymentStatus: string,
): EmailDetailRow[] {
  return filterEmailDetailRows([
    { label: 'Order ID', value: variables.orderId ?? '' },
    { label: 'Customer Name', value: variables.customerName ?? '' },
    { label: 'Customer Email', value: variables.customerEmail ?? '' },
    { label: 'Order Total', value: variables.orderTotal ?? '' },
    { label: 'Payment Status', value: paymentStatus },
    { label: 'Order Date', value: variables.orderDate ?? '' },
  ]);
}

function customerPaidMetaRows(variables: Record<string, string | undefined>): EmailDetailRow[] {
  return filterEmailDetailRows([
    { label: 'Order ID', value: variables.orderId ?? '' },
    { label: 'Order Total', value: variables.orderTotal ?? '' },
    { label: 'Payment Status', value: 'Paid' },
    { label: 'Order Date', value: variables.orderDate ?? '' },
  ]);
}

function formatContactGreeting(fullName?: string): string {
  const name = fullName?.trim();
  return name ? `Hi ${name},` : 'Hi,';
}

function getExtraTemplate(
  templateId: ExtraTemplateId,
  variables: Record<string, string | undefined>,
): { subject: string; bodyHtml: string; bodyText: string } {
  const orderId = variables.orderId ?? '';
  const companyName = variables.companyName ?? 'NovaLikes';
  const supportEmail = variables.supportEmail ?? '';
  const siteUrl = variables.siteUrl ?? '';
  const internalRef = variables.internalOrderId?.trim();
  const greetingLine = variables.greetingLine?.trim() || 'Hi,';
  const adminUrl = variables.adminOrderUrl?.trim();
  const itemsHtml = variables.itemsHtml ?? '';
  const itemsText = variables.itemsText ?? '';

  switch (templateId) {
    case 'admin_new_order': {
      const details = adminMetaRows(variables, 'Pending');
      return {
        subject: `New order — ${orderId}`,
        bodyHtml: renderTransactionalEmailShell({
          title: 'New order',
          companyName,
          supportEmail,
          siteUrl,
          preheader: `New order ${orderId}`,
          bodyHtml:
            orderEmailBody({
              greetingLine: 'Hi,',
              paragraphs: ['A new order has been received.'],
              details,
              cta: adminUrl
                ? { label: 'View Order in Admin', href: adminUrl }
                : undefined,
              secondaryHtml: internalRef
                ? `Internal reference: ${escapeHtml(internalRef)}`
                : undefined,
            }) +
            (itemsHtml ? `<div style="margin:16px 0;">${itemsHtml}</div>` : '') +
            `<p style="margin:16px 0 0;font-size:13px;color:#64748b;">Payment has not been confirmed yet.</p>`,
        }),
        bodyText: [
          'New order',
          '',
          'A new order has been received.',
          '',
          buildEmailDetailsText(details),
          '',
          itemsText,
          '',
          'Payment has not been confirmed yet.',
          internalRef ? `Internal reference: ${internalRef}` : '',
          adminUrl ? `View Order in Admin: ${adminUrl}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      };
    }
    case 'admin_order_paid': {
      const details = adminMetaRows(variables, 'Paid');
      return {
        subject: `Order paid — ${orderId}`,
        bodyHtml: renderTransactionalEmailShell({
          title: 'Order paid',
          companyName,
          supportEmail,
          siteUrl,
          preheader: `Payment confirmed for ${orderId}`,
          bodyHtml:
            orderEmailBody({
              greetingLine: 'Hi,',
              paragraphs: [
                `Payment has been confirmed for order <strong>${escapeHtml(orderId)}</strong>.`,
              ],
              details,
              cta: adminUrl
                ? { label: 'View Order in Admin', href: adminUrl }
                : undefined,
              secondaryHtml: internalRef
                ? `Internal reference: ${escapeHtml(internalRef)}`
                : undefined,
            }) + (itemsHtml ? `<div style="margin:16px 0;">${itemsHtml}</div>` : ''),
        }),
        bodyText: [
          'Order paid',
          '',
          `Payment has been confirmed for order ${orderId}.`,
          '',
          buildEmailDetailsText(details),
          '',
          itemsText,
          internalRef ? `Internal reference: ${internalRef}` : '',
          adminUrl ? `View Order in Admin: ${adminUrl}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      };
    }
    case 'payment_confirmed': {
      const details = customerPaidMetaRows(variables);
      return {
        subject: `Payment confirmed — ${orderId}`,
        bodyHtml: renderTransactionalEmailShell({
          title: 'Payment confirmed',
          companyName,
          supportEmail,
          siteUrl,
          preheader: `Payment confirmed for ${orderId}`,
          bodyHtml:
            orderEmailBody({
              greetingLine,
              paragraphs: [
                `Your payment for order <strong>${escapeHtml(orderId)}</strong> has been confirmed. Your order is now ready for processing.`,
              ],
              details,
              cta: {
                label: 'Track your order',
                href: variables.trackingUrl || siteUrl,
              },
            }) + (itemsHtml ? `<div style="margin:16px 0;">${itemsHtml}</div>` : ''),
        }),
        bodyText: [
          'Payment confirmed',
          '',
          greetingLine,
          '',
          `Your payment for order ${orderId} has been confirmed. Your order is now ready for processing.`,
          '',
          itemsText,
          '',
          buildEmailDetailsText(details),
          '',
          `Track your order: ${variables.trackingUrl ?? ''}`,
        ].join('\n'),
      };
    }
    case 'contact_admin':
      return {
        subject: `Contact form — ${variables.subject ?? ''}`,
        bodyHtml: renderTransactionalEmailShell({
          title: 'Contact form',
          companyName,
          supportEmail,
          siteUrl,
          bodyHtml: orderEmailBody({
            greetingLine: 'Hi,',
            paragraphs: [
              `New contact message from <strong>${escapeHtml(variables.fullName ?? '')}</strong> (${escapeHtml(variables.email ?? '')}).`,
            ],
            details: [
              { label: 'Subject', value: variables.subject ?? '' },
              { label: 'Order ID', value: variables.orderId ?? '' },
              { label: 'Message', value: variables.message ?? '' },
            ],
          }),
        }),
        bodyText: `New contact message from ${variables.fullName ?? ''} (${variables.email ?? ''}).\nSubject: ${variables.subject ?? ''}\nOrder ID: ${variables.orderId ?? ''}\n\n${variables.message ?? ''}`,
      };
    case 'contact_acknowledgement':
      return {
        subject: 'We received your message',
        bodyHtml: renderTransactionalEmailShell({
          title: 'Message received',
          companyName,
          supportEmail,
          siteUrl,
          bodyHtml: orderEmailBody({
            greetingLine: formatContactGreeting(variables.fullName),
            paragraphs: [
              `Thanks for contacting ${escapeHtml(companyName)}. We received your message and will reply soon.`,
            ],
          }),
        }),
        bodyText: `${formatContactGreeting(variables.fullName)}\n\nThanks for contacting ${companyName}. We received your message and will reply soon.`,
      };
  }
}

async function sendViaConfiguredTransport(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ messageId: string; providerId: 'smtp' | 'resend' }> {
  const from = getEmailFrom();
  if (!from) {
    throw new Error('EMAIL_FROM (or RESEND_FROM_EMAIL) is not configured.');
  }
  const replyTo = getEmailReplyTo();

  if (isSmtpConfigured()) {
    const result = await sendSmtpEmail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo,
    });
    return { messageId: result.messageId, providerId: 'smtp' };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Email provider is not configured (SMTP_HOST or RESEND_API_KEY).');
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend error ${response.status}: ${body.slice(0, 200)}`);
  }
  const data = (await response.json()) as { id?: string };
  return { messageId: data.id ?? `resend_${Date.now()}`, providerId: 'resend' };
}

export const resendEmailProvider: NotificationProvider = {
  id: 'resend',
  channel: 'email',
  async send({ to, subject, html, text }) {
    if (!isEmailConfigured()) {
      throw new Error('Email provider is not configured (SMTP_HOST / RESEND_API_KEY / EMAIL_FROM).');
    }
    const result = await sendViaConfiguredTransport({ to, subject, html, text });
    return { messageId: result.messageId };
  },
};

export async function dispatchTransactionalEmail(input: ExtraSendInput): Promise<{
  id: string;
  status: 'sent' | 'failed' | 'skipped';
}> {
  const store = getPersistence();
  const existing = await store.findByIdempotencyKey(input.idempotencyKey);
  if (existing) {
    return { id: existing.id, status: existing.status === 'sent' ? 'sent' : 'failed' };
  }

  const variables = withDefaultEmailSiteUrl(input.variables);
  const template = getExtraTemplate(input.templateId, variables);
  const subject = template.subject;
  const html = template.bodyHtml;
  const text = template.bodyText;
  const id = `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();
  const storedTemplateId = 'order_confirmation' as const;

  if (!isEmailConfigured()) {
    await store.saveNotification({
      id,
      orderId: input.orderId ?? '',
      channel: 'email',
      templateId: storedTemplateId,
      trigger: 'order_created',
      recipient: input.to,
      status: 'failed',
      subject,
      bodyPreview: text.slice(0, 180),
      errorMessage: 'Email provider disabled — missing EMAIL_FROM plus SMTP_HOST or RESEND_API_KEY.',
      createdAt,
      immutable: true,
      idempotencyKey: input.idempotencyKey,
    });
    return { id, status: 'skipped' };
  }

  try {
    const result = await sendViaConfiguredTransport({
      to: input.to,
      subject,
      html,
      text,
    });
    await store.saveNotification({
      id,
      orderId: input.orderId ?? '',
      channel: 'email',
      templateId: storedTemplateId,
      trigger: 'order_created',
      recipient: input.to,
      status: 'sent',
      subject,
      bodyPreview: text.slice(0, 180),
      providerId: result.providerId,
      providerMessageId: result.messageId,
      createdAt,
      sentAt: new Date().toISOString(),
      immutable: true,
      idempotencyKey: input.idempotencyKey,
    });
    return { id, status: 'sent' };
  } catch (error) {
    console.error('[email] send failed', {
      templateId: input.templateId,
      message: error instanceof Error ? error.message : 'unknown',
    });
    await store.saveNotification({
      id,
      orderId: input.orderId ?? '',
      channel: 'email',
      templateId: storedTemplateId,
      trigger: 'order_created',
      recipient: input.to,
      status: 'failed',
      subject,
      bodyPreview: text.slice(0, 180),
      errorMessage: error instanceof Error ? error.message : 'Delivery failed',
      providerId: isSmtpConfigured() ? 'smtp' : 'resend',
      createdAt,
      immutable: true,
      idempotencyKey: input.idempotencyKey,
    });
    return { id, status: 'failed' };
  }
}

export { escapeEmailVariables, render };

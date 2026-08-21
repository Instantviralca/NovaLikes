/**
 * Transactional email — SMTP (self-hosted Postfix/relay) or Resend.
 * Disabled until EMAIL_FROM is set with SMTP_HOST and/or RESEND_API_KEY.
 */

import { getEmailFrom, getEmailReplyTo, isEmailConfigured, isSmtpConfigured } from '@/lib/config/env';
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

const EXTRA_TEMPLATES: Record<
  ExtraTemplateId,
  { subject: string; bodyHtml: string; bodyText: string }
> = {
  admin_new_order: {
    subject: 'New order — {{orderId}}',
    bodyHtml:
      '<p>New order <strong>{{orderId}}</strong>.</p><p><strong>Service:</strong> {{serviceName}} ({{packageName}})</p><p><strong>Total:</strong> {{orderTotal}}</p><p><strong>Customer:</strong> {{customerEmail}}</p><p>Open Admin → Orders to review.</p>',
    bodyText:
      'New order {{orderId}}.\nService: {{serviceName}} ({{packageName}})\nTotal: {{orderTotal}}\nCustomer: {{customerEmail}}\nReview in Admin → Orders.',
  },
  admin_order_paid: {
    subject: 'Order paid — {{orderId}}',
    bodyHtml:
      '<p>Payment confirmed for <strong>{{orderId}}</strong>.</p><p><strong>Service:</strong> {{serviceName}} ({{packageName}})</p><p><strong>Total:</strong> {{orderTotal}}</p><p><strong>Customer:</strong> {{customerEmail}}</p><p>Ready for fulfilment — open Admin → Orders.</p>',
    bodyText:
      'Payment confirmed for {{orderId}}.\nService: {{serviceName}} ({{packageName}})\nTotal: {{orderTotal}}\nCustomer: {{customerEmail}}\nReady for fulfilment.',
  },
  payment_confirmed: {
    subject: 'Payment confirmed — {{orderId}}',
    bodyHtml:
      '<p>Hi {{customerName}},</p><p>We confirmed payment for order <strong>{{orderId}}</strong> ({{serviceName}}).</p><p><strong>Total:</strong> {{orderTotal}}</p><p><a href="{{trackingUrl}}">Track your order</a></p><p>Need help? {{supportEmail}}</p>',
    bodyText:
      'Hi {{customerName}},\n\nWe confirmed payment for order {{orderId}} ({{serviceName}}).\nTotal: {{orderTotal}}\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
  },
  contact_admin: {
    subject: 'Contact form — {{subject}}',
    bodyHtml:
      '<p>New contact message from <strong>{{fullName}}</strong> ({{email}}).</p><p>Subject: {{subject}}</p><p>Order ID: {{orderId}}</p><pre>{{message}}</pre>',
    bodyText:
      'New contact message from {{fullName}} ({{email}}).\nSubject: {{subject}}\nOrder ID: {{orderId}}\n\n{{message}}',
  },
  contact_acknowledgement: {
    subject: 'We received your message',
    bodyHtml:
      '<p>Hi {{fullName}},</p><p>Thanks for contacting {{companyName}}. We received your message and will reply soon.</p>',
    bodyText:
      'Hi {{fullName}},\n\nThanks for contacting {{companyName}}. We received your message and will reply soon.',
  },
};

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

  const template = EXTRA_TEMPLATES[input.templateId];
  const subject = render(template.subject, input.variables);
  const html = render(template.bodyHtml, input.variables);
  const text = render(template.bodyText, input.variables);
  const id = `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();
  // Persist a known customer template id for DB typing; real template is in subject/body.
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

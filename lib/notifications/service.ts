/**
 * Notification service — Document 11.04.
 * Persists delivery status; uses Resend when configured.
 */

import { getTemplateForTrigger, withDefaultEmailSiteUrl } from '@/data/notifications/templates';
import { isEmailConfigured } from '@/lib/config/env';
import { resendEmailProvider } from '@/lib/notifications/email';
import { escapeEmailVariables } from '@/lib/notifications/email-shell';
import { getPersistence } from '@/lib/persistence';
import type {
  NotificationProvider,
  NotificationRecord,
  NotificationSendRequest,
  NotificationService,
  NotificationTemplateVariableMap,
} from '@/types/notification';

export function renderTemplate(
  template: string,
  variables: NotificationTemplateVariableMap,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = variables[key as keyof NotificationTemplateVariableMap];
    return value === undefined || value === null ? '' : String(value);
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function recordId(): string {
  return `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Stub provider — used when Resend credentials are missing. */
export const stubEmailProvider: NotificationProvider = {
  id: 'stub-email',
  channel: 'email',
  async send() {
    throw new Error('Email provider disabled — set RESEND_API_KEY and EMAIL_FROM.');
  },
};

export function getNotificationProvider(): NotificationProvider {
  return isEmailConfigured() ? resendEmailProvider : stubEmailProvider;
}

export function setNotificationProvider(_provider?: NotificationProvider): void {
  void _provider;
  // Provider is resolved from env; kept for test compatibility.
}

export async function dispatchNotification(
  request: NotificationSendRequest,
): Promise<NotificationRecord> {
  const store = getPersistence();
  const channel = request.channel ?? 'email';
  const createdAt = new Date().toISOString();
  const provider = getNotificationProvider();

  if (request.idempotencyKey) {
    const existing = await store.findByIdempotencyKey(request.idempotencyKey);
    if (existing?.status === 'sent') return existing;
    if (existing) {
      await store.releaseNotificationIdempotencyKey(request.idempotencyKey);
    }
  }

  if (!isValidEmail(request.recipient)) {
    const failed: NotificationRecord & { idempotencyKey?: string } = {
      id: recordId(),
      orderId: request.orderId,
      channel,
      templateId: 'order_confirmation',
      trigger: request.trigger,
      recipient: request.recipient,
      status: 'failed',
      subject: '',
      errorMessage: 'Invalid recipient email.',
      createdAt,
      immutable: true,
      // No idempotency key on failure — remains retryable.
    };
    await store.saveNotification(failed);
    return failed;
  }

  const template = getTemplateForTrigger(request.trigger);
  if (!template) {
    const failed: NotificationRecord & { idempotencyKey?: string } = {
      id: recordId(),
      orderId: request.orderId,
      channel,
      templateId: 'order_confirmation',
      trigger: request.trigger,
      recipient: request.recipient,
      status: 'failed',
      subject: '',
      errorMessage: `No active template for trigger: ${request.trigger}`,
      createdAt,
      immutable: true,
    };
    await store.saveNotification(failed);
    return failed;
  }

  const vars = withDefaultEmailSiteUrl(
    request.variables as Record<string, string | undefined>,
  ) as NotificationTemplateVariableMap;
  const htmlVars = escapeEmailVariables(
    vars as Record<string, string | undefined>,
  ) as NotificationTemplateVariableMap;

  const subject = renderTemplate(template.subject, vars);
  const html = renderTemplate(template.bodyHtml, htmlVars);
  const text = renderTemplate(template.bodyText, vars);

  const pending: NotificationRecord & { idempotencyKey?: string } = {
    id: recordId(),
    orderId: request.orderId,
    channel,
    templateId: template.id,
    trigger: request.trigger,
    recipient: request.recipient,
    status: 'pending',
    subject,
    bodyPreview: text.slice(0, 180),
    createdAt,
    immutable: true,
    idempotencyKey: request.idempotencyKey,
  };

  try {
    const result = await provider.send({
      to: request.recipient,
      subject,
      html,
      text,
    });
    const sent: NotificationRecord & { idempotencyKey?: string } = {
      ...pending,
      status: 'sent',
      sentAt: new Date().toISOString(),
      providerId: provider.id,
      providerMessageId: result.messageId,
    };
    await store.saveNotification(sent);
    return sent;
  } catch (error) {
    const failed: NotificationRecord & { idempotencyKey?: string } = {
      ...pending,
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Delivery failed',
      providerId: provider.id,
      idempotencyKey: undefined,
    };
    console.error('[notifications] delivery failed', {
      orderId: request.orderId,
      trigger: request.trigger,
      message: failed.errorMessage,
    });
    await store.saveNotification(failed);
    return failed;
  }
}

export async function getNotificationHistoryByOrderId(
  orderId: string,
): Promise<NotificationRecord[]> {
  return getPersistence().listByOrderId(orderId);
}

export const notificationService: NotificationService = {
  dispatch: dispatchNotification,
  getHistoryByOrderId: getNotificationHistoryByOrderId,
};

export async function notifyOrderEvent(
  request: NotificationSendRequest,
): Promise<NotificationRecord> {
  return dispatchNotification(request);
}

/**
 * Recovery email rendering + send via existing transactional transport.
 */

import { site } from '@/config/site';
import { getSiteOrigin, getSiteUrlPath } from '@/lib/config/hosts';
import { isEmailConfigured, getEmailFrom, isSmtpConfigured } from '@/lib/config/env';
import { formatMoney } from '@/lib/pricing/format';
import { sendSmtpEmail } from '@/lib/notifications/smtp';
import {
  createCartRecoveryEventId,
} from '@/lib/cart-recovery/tokens';
import { deriveRecoveryToken, deriveUnsubscribeToken } from '@/lib/cart-recovery/tokens';
import { appendCartRecoveryEvent, hasCartRecoveryEvent } from '@/lib/cart-recovery/store';
import type {
  CartRecoveryEmailStepConfig,
  CartRecoverySession,
} from '@/types/cart-recovery';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function firstName(session: CartRecoverySession): string {
  const fromCheckout = session.checkoutSnapshot?.firstName?.trim();
  if (fromCheckout) return fromCheckout;
  const fromName = session.customerName?.trim().split(/\s+/)[0];
  return fromName || 'there';
}

function cartItemsText(session: CartRecoverySession): string {
  return session.cartSnapshot.items
    .map((item) => `• ${item.serviceName} — ${item.packageTitle}`)
    .join('\n');
}

function cartTotalText(session: CartRecoverySession): string {
  return formatMoney(session.totalAmount, session.currency);
}

export function buildRecoveryUrls(session: CartRecoverySession): {
  recoveryUrl: string;
  unsubscribeUrl: string;
} {
  const recoveryToken = deriveRecoveryToken(session);
  const unsubToken = deriveUnsubscribeToken(session);
  return {
    recoveryUrl: getSiteUrlPath(`/checkout/recover/${encodeURIComponent(recoveryToken)}`),
    unsubscribeUrl: getSiteUrlPath(
      `/email/unsubscribe/cart-recovery/${encodeURIComponent(unsubToken)}`,
    ),
  };
}

export function renderRecoveryEmail(
  session: CartRecoverySession,
  step: CartRecoveryEmailStepConfig,
): { subject: string; html: string; text: string } {
  const { recoveryUrl, unsubscribeUrl } = buildRecoveryUrls(session);
  const vars: Record<string, string> = {
    first_name: firstName(session),
    cart_total: cartTotalText(session),
    cart_items: cartItemsText(session),
    recovery_url: recoveryUrl,
  };

  const replace = (template: string) =>
    template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');

  const subject = replace(step.subject);
  const body = replace(step.body);
  const ctaLabel =
    step.step === 1 ? 'Complete My Order' : step.step === 2 ? 'Return to My Order' : 'Complete My Order';

  const html = `<!doctype html>
<html><body style="margin:0;background:#faf8f6;font-family:Arial,sans-serif;color:#1c1917;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:14px;font-weight:700;color:#E85D04;margin:0 0 8px;">${escapeHtml(site.name)}</p>
    <h1 style="font-size:22px;line-height:1.3;margin:0 0 16px;">${escapeHtml(subject)}</h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;white-space:pre-line;">${escapeHtml(body).replace(/\n/g, '<br />')}</p>
    <p style="margin:24px 0;"><a href="${escapeHtml(recoveryUrl)}" style="display:inline-block;background:#E85D04;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;">${escapeHtml(ctaLabel)}</a></p>
    <hr style="border:none;border-top:1px solid #eadfd6;margin:28px 0;" />
    <p style="font-size:12px;line-height:1.5;color:#5c5c5c;margin:0;">
      NovaLikes · <a href="${escapeHtml(getSiteOrigin())}" style="color:#5c5c5c;">${escapeHtml(site.domain.replace(/^https?:\/\//, ''))}</a><br />
      <a href="${escapeHtml(unsubscribeUrl)}" style="color:#5c5c5c;">Unsubscribe from cart reminders</a>
    </p>
  </div>
</body></html>`;

  const text = `${subject}

${body}

${ctaLabel}: ${recoveryUrl}

—
Unsubscribe: ${unsubscribeUrl}
`;

  return { subject, html, text };
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ messageId: string; providerId: string }> {
  if (!isEmailConfigured()) {
    throw new Error('Email provider is not configured.');
  }
  const from = getEmailFrom();
  if (!from) throw new Error('EMAIL_FROM is not configured.');

  if (isSmtpConfigured()) {
    const result = await sendSmtpEmail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });
    return { messageId: result.messageId, providerId: 'smtp' };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured.');
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
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend error ${response.status}: ${body.slice(0, 200)}`);
  }
  const data = (await response.json()) as { id?: string };
  return { messageId: data.id ?? `resend_${Date.now()}`, providerId: 'resend' };
}

export async function sendRecoveryEmailStep(input: {
  session: CartRecoverySession;
  step: CartRecoveryEmailStepConfig;
}): Promise<'sent' | 'skipped' | 'failed' | 'duplicate'> {
  const idempotencyKey = `cart_recovery:${input.session.id}:email:${input.step.step}`;
  if (await hasCartRecoveryEvent({ sessionId: input.session.id, idempotencyKey })) {
    return 'duplicate';
  }
  if (await hasCartRecoveryEvent({
    sessionId: input.session.id,
    type: 'email_sent',
    emailStep: input.step.step,
  })) {
    return 'duplicate';
  }

  // Dev safety: never send real mail when IV_CART_RECOVERY_DRY_RUN=1
  const dryRun =
    process.env.IV_CART_RECOVERY_DRY_RUN === '1' ||
    (process.env.NODE_ENV !== 'production' && !isEmailConfigured());

  const rendered = renderRecoveryEmail(input.session, input.step);
  const now = new Date().toISOString();

  try {
    let messageId = `dry_${Date.now()}`;
    let providerId = 'dry-run';
    if (!dryRun) {
      const result = await sendEmail({
        to: input.session.email,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
      });
      messageId = result.messageId;
      providerId = result.providerId;
    }

    const inserted = await appendCartRecoveryEvent({
      id: createCartRecoveryEventId(),
      sessionId: input.session.id,
      type: 'email_sent',
      emailStep: input.step.step,
      idempotencyKey,
      providerMessageId: messageId,
      errorMessage: null,
      meta: { providerId, dryRun },
      createdAt: now,
    });
    if (inserted.duplicate) return 'duplicate';
    return dryRun ? 'skipped' : 'sent';
  } catch (error) {
    await appendCartRecoveryEvent({
      id: createCartRecoveryEventId(),
      sessionId: input.session.id,
      type: 'email_failed',
      emailStep: input.step.step,
      idempotencyKey: `${idempotencyKey}:fail:${Date.now()}`,
      providerMessageId: null,
      errorMessage: error instanceof Error ? error.message : 'send failed',
      meta: null,
      createdAt: now,
    });
    return 'failed';
  }
}

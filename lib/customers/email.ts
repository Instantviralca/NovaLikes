import { getEmailFrom, getSiteUrl, isEmailConfigured } from '@/lib/config/env';
import { ACCOUNT_EMAIL_COPY } from '@/lib/customers/messages';
import type { EmailCodePurpose } from '@/lib/customers/types';
import {
  escapeHtml,
  renderTransactionalEmailShell,
} from '@/lib/notifications/email-shell';
import { sendRawTransactionalEmail } from '@/lib/notifications/email';
import { getPersistence } from '@/lib/persistence';
import type { NotificationTemplateId, NotificationTrigger } from '@/types/notification';

const TEMPLATE_BY_PURPOSE: Record<
  EmailCodePurpose,
  'account_signup_code' | 'account_login_code' | 'account_reset_code'
> = {
  signup_verify: 'account_signup_code',
  login: 'account_login_code',
  password_reset: 'account_reset_code',
};

export async function sendAccountEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ messageId: string; providerId: string } | null> {
  if (!isEmailConfigured() || !getEmailFrom()) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[account-email] skipped (email not configured)', {
        to: input.to,
        subject: input.subject,
      });
    }
    return null;
  }
  return sendRawTransactionalEmail(input);
}

function buildCodeEmail(purpose: EmailCodePurpose, code: string): {
  subject: string;
  html: string;
  text: string;
  templateId: 'account_signup_code' | 'account_login_code' | 'account_reset_code';
} {
  const copy =
    purpose === 'signup_verify'
      ? ACCOUNT_EMAIL_COPY.signup
      : purpose === 'login'
        ? ACCOUNT_EMAIL_COPY.login
        : ACCOUNT_EMAIL_COPY.reset;
  const companyName = process.env.EMAIL_COMPANY_NAME?.trim() || 'NovaLikes';
  const supportEmail =
    process.env.EMAIL_SUPPORT?.trim() || getEmailFrom() || '';
  const siteUrl = getSiteUrl().replace(/\/$/, '');
  const codeHtml = `<p style="margin:20px 0;font-size:32px;font-weight:700;letter-spacing:0.2em;text-align:center;">${escapeHtml(code)}</p>`;
  const bodyHtml = `<p style="margin:0 0 12px;">${escapeHtml(copy.intro)}</p>${codeHtml}<p style="margin:12px 0 0;color:#64748b;">${escapeHtml(copy.footer)}</p>`;
  const html = renderTransactionalEmailShell({
    title: copy.subject,
    companyName,
    supportEmail,
    siteUrl,
    preheader: copy.preheader(code),
    bodyHtml,
  });
  const text = `${copy.intro}\n\n${code}\n\n${copy.footer}`;
  return {
    subject: copy.subject,
    html,
    text,
    templateId: TEMPLATE_BY_PURPOSE[purpose],
  };
}

export async function sendAccountCodeEmail(input: {
  to: string;
  purpose: EmailCodePurpose;
  code: string;
}): Promise<void> {
  const built = buildCodeEmail(input.purpose, input.code);
  const result = await sendAccountEmail({
    to: input.to,
    subject: built.subject,
    html: built.html,
    text: built.text,
  });

  const store = getPersistence();
  const id = `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  const preview = built.text.slice(0, 180).replace(input.code, '[code]');
  await store.saveNotification({
    id,
    orderId: '',
    channel: 'email',
    templateId: built.templateId as NotificationTemplateId,
    trigger: 'account_code' as NotificationTrigger,
    recipient: input.to,
    status: result ? 'sent' : 'failed',
    subject: built.subject,
    bodyPreview: preview,
    errorMessage: result ? undefined : 'Email provider not configured',
    providerId: result?.providerId,
    providerMessageId: result?.messageId,
    createdAt: now,
    sentAt: result ? now : undefined,
    immutable: true,
    idempotencyKey: `account_code:${built.templateId}:${input.to}:${now.slice(0, 16)}`,
  });
}

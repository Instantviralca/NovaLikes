/**
 * Marketing campaign email rendering + send helpers.
 */

import { site } from '@/config/site';
import { getSiteOrigin } from '@/lib/config/hosts';
import { isEmailConfigured, getEmailFrom } from '@/lib/config/env';
import { createCampaignId } from '@/lib/email/subscriber-utils';
import { getPersistence } from '@/lib/persistence';
import { resendEmailProvider } from '@/lib/notifications/email';

export type MarketingCampaignInput = {
  subject: string;
  message: string;
  couponCode?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildMarketingEmailContent(input: {
  subject: string;
  message: string;
  couponCode?: string;
  unsubscribeUrl: string;
}): { subject: string; html: string; text: string } {
  const siteOrigin = getSiteOrigin();
  const coupon = input.couponCode?.trim().toUpperCase();
  const messageHtml = escapeHtml(input.message).replace(/\n/g, '<br />');
  const couponBlock = coupon
    ? `<p style="margin:24px 0;padding:16px;border:1px dashed #E85D04;border-radius:8px;text-align:center;font-size:20px;font-weight:700;letter-spacing:0.04em;color:#141414;">Use code <span style="color:#E85D04;">${escapeHtml(coupon)}</span></p>`
    : '';
  const couponText = coupon ? `\n\nUse code: ${coupon}\n` : '\n';

  const html = `<!doctype html>
<html><body style="margin:0;background:#faf8f6;font-family:Arial,sans-serif;color:#1c1917;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:14px;font-weight:700;color:#E85D04;margin:0 0 8px;">${escapeHtml(site.name)}</p>
    <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">${escapeHtml(input.subject)}</h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${messageHtml}</p>
    ${couponBlock}
    <p style="margin:24px 0;"><a href="${escapeHtml(siteOrigin)}" style="display:inline-block;background:#E85D04;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;">Shop NovaLikes</a></p>
    <hr style="border:none;border-top:1px solid #eadfd6;margin:28px 0;" />
    <p style="font-size:12px;line-height:1.5;color:#5c5c5c;margin:0;">
      You are receiving this email because you opted in to NovaLikes offers at checkout.<br />
      NovaLikes · <a href="${escapeHtml(siteOrigin)}" style="color:#5c5c5c;">${escapeHtml(site.domain.replace(/^https?:\/\//, ''))}</a><br />
      <a href="${escapeHtml(input.unsubscribeUrl)}" style="color:#5c5c5c;">Unsubscribe</a>
    </p>
  </div>
</body></html>`;

  const text = `${input.subject}

${input.message}
${couponText}
Shop: ${siteOrigin}

—
You opted in to NovaLikes offers at checkout.
Unsubscribe: ${input.unsubscribeUrl}
`;

  return { subject: input.subject.trim(), html, text };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Send a marketing campaign to all actively opted-in subscribers.
 */
export async function sendMarketingCampaign(input: MarketingCampaignInput): Promise<{
  ok: boolean;
  error?: string;
  sentCount: number;
  failedCount: number;
  skippedCount: number;
  campaignId?: string;
  setupNotice?: string;
}> {
  if (!isEmailConfigured() || !getEmailFrom()) {
    return {
      ok: false,
      error: 'Email is not configured. Set RESEND_API_KEY and EMAIL_FROM.',
      sentCount: 0,
      failedCount: 0,
      skippedCount: 0,
    };
  }

  const subject = input.subject.trim();
  const message = input.message.trim();
  if (!subject || !message) {
    return {
      ok: false,
      error: 'Subject and message are required.',
      sentCount: 0,
      failedCount: 0,
      skippedCount: 0,
    };
  }

  const persistence = getPersistence();
  let subscribers;
  try {
    subscribers = await persistence.listOptedInSubscribers();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      error: msg,
      sentCount: 0,
      failedCount: 0,
      skippedCount: 0,
      setupNotice:
        'Subscriber table may be missing. Run drizzle/0004_email_subscribers.sql on production DB.',
    };
  }

  if (subscribers.length === 0) {
    return {
      ok: false,
      error: 'No opted-in subscribers yet.',
      sentCount: 0,
      failedCount: 0,
      skippedCount: 0,
    };
  }

  const siteOrigin = getSiteOrigin();
  let sentCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const subscriber of subscribers) {
    if (!subscriber.marketingOptIn || subscriber.unsubscribedAt) {
      skippedCount += 1;
      continue;
    }
    const unsubscribeUrl = `${siteOrigin}/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
    const content = buildMarketingEmailContent({
      subject,
      message,
      couponCode: input.couponCode,
      unsubscribeUrl,
    });
    try {
      await resendEmailProvider.send({
        to: subscriber.email,
        subject: content.subject,
        html: content.html,
        text: content.text,
      });
      sentCount += 1;
    } catch (error) {
      console.error('[email-campaign] send failed', {
        email: subscriber.email,
        message: error instanceof Error ? error.message : 'unknown',
      });
      failedCount += 1;
    }
    // Gentle pacing for Resend rate limits
    await delay(120);
  }

  const campaignId = createCampaignId();
  await persistence.saveEmailCampaign({
    id: campaignId,
    subject,
    bodyPreview: message.slice(0, 180),
    couponCode: input.couponCode?.trim().toUpperCase() || null,
    sentCount,
    failedCount,
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
  });

  return {
    ok: sentCount > 0,
    error: sentCount === 0 ? 'All sends failed.' : undefined,
    sentCount,
    failedCount,
    skippedCount,
    campaignId,
  };
}

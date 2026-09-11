/**
 * Shared branded transactional email shell for order notifications.
 * Site URL comes from env (NEXT_PUBLIC_SITE_URL / SITE_URL) — never hardcode prod domain.
 */

import { getSiteUrl } from '@/lib/config/env';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeEmailVariables(
  variables: Record<string, string | undefined>,
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(variables)) {
    if (value === undefined) {
      out[key] = undefined;
      continue;
    }
    // Prebuilt HTML fragments and URL attributes stay unescaped here.
    if (
      key === 'trackingUrl' ||
      key === 'siteUrl' ||
      key === 'adminOrderUrl' ||
      key === 'supportContactUrl' ||
      key === 'detailsHtml' ||
      key === 'itemsHtml' ||
      key === 'supportHtml' ||
      key === 'ctaHtml'
    ) {
      out[key] = value;
      continue;
    }
    out[key] = escapeHtml(value);
  }
  return out;
}

export function getTransactionalSiteUrl(): string {
  return getSiteUrl().replace(/\/$/, '');
}

/**
 * Greeting without inventing names or using email local-parts.
 * With a genuine name → "Hi Jane,"; otherwise → "Hi,".
 */
export function formatEmailGreeting(genuineName?: string | null): string {
  const name = genuineName?.trim();
  if (!name) return 'Hi,';
  return `Hi ${name},`;
}

export type EmailDetailRow = { label: string; value: string };

export function filterEmailDetailRows(rows: EmailDetailRow[]): EmailDetailRow[] {
  return rows.filter((row) => row.value.trim().length > 0);
}

export function buildEmailDetailsHtml(rows: EmailDetailRow[]): string {
  const filtered = filterEmailDetailRows(rows);
  if (filtered.length === 0) return '';
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:8px 0 18px;border-collapse:collapse;">
${filtered
  .map(
    (row) => `      <tr>
        <td style="padding:6px 0;color:#64748b;width:38%;vertical-align:top;">${escapeHtml(row.label)}</td>
        <td style="padding:6px 0;color:#111827;font-weight:600;vertical-align:top;">${escapeHtml(row.value)}</td>
      </tr>`,
  )
  .join('\n')}
    </table>`;
}

export function buildEmailDetailsText(rows: EmailDetailRow[]): string {
  return filterEmailDetailRows(rows)
    .map((row) => `${row.label}: ${row.value}`)
    .join('\n');
}

export function renderTransactionalEmailShell(input: {
  title: string;
  companyName: string;
  supportEmail: string;
  siteUrl: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const company = escapeHtml(input.companyName);
  const support = input.supportEmail.trim();
  const supportEscaped = escapeHtml(support);
  const siteUrl = input.siteUrl;
  const siteDisplay = escapeHtml(siteUrl.replace(/^https?:\/\//i, ''));
  const title = escapeHtml(input.title);
  const preheader = escapeHtml(input.preheader ?? '');
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;color:#111827;font-family:Georgia,'Times New Roman',serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f8;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:20px 24px;background:#0f172a;color:#ffffff;">
              <div style="font-size:20px;font-weight:700;letter-spacing:0.02em;font-family:Arial,Helvetica,sans-serif;">${company}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#111827;">
              ${input.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px;background:#f8fafc;border-top:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#64748b;">
              <p style="margin:0;">${company}</p>
              <p style="margin:8px 0 0;"><a href="${escapeHtml(siteUrl)}" style="color:#0f172a;text-decoration:underline;">${siteDisplay}</a></p>
              ${
                support
                  ? `<p style="margin:8px 0 0;">Support: <a href="mailto:${supportEscaped}" style="color:#0f172a;text-decoration:underline;">${supportEscaped}</a></p>`
                  : ''
              }
              <p style="margin:8px 0 0;">© ${year} ${company}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function orderEmailBody(input: {
  greetingLine: string;
  paragraphs: string[];
  details?: EmailDetailRow[];
  cta?: { label: string; href: string };
  secondaryHtml?: string;
}): string {
  const greeting = escapeHtml(input.greetingLine);
  const paragraphs = input.paragraphs
    .map((p) => `<p style="margin:0 0 14px;">${p}</p>`)
    .join('');
  const details = input.details ? buildEmailDetailsHtml(input.details) : '';
  const cta = input.cta
    ? `<p style="margin:18px 0 8px;">
        <a href="${escapeHtml(input.cta.href)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;">${escapeHtml(input.cta.label)}</a>
      </p>`
    : '';
  const secondary = input.secondaryHtml
    ? `<p style="margin:16px 0 0;font-size:13px;color:#64748b;">${input.secondaryHtml}</p>`
    : '';

  return `<p style="margin:0 0 14px;">${greeting}</p>${paragraphs}${details}${cta}${secondary}`;
}

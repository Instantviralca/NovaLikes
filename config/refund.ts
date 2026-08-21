/**
 * Refund Policy configuration — Document 13.06.
 *
 * Approved operational policy: 30-Day Money-Back Guarantee on eligible orders.
 * Do not invent refill periods or refund-processing SLAs here.
 *
 * TODO: CONFIRM mailing address for written refund correspondence (if required)
 * TODO: CONFIRM published refund processing-time SLA (if any)
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';
import type { RefundConfig } from '@/types/legal';

function isPlaceholderEmail(email: string | undefined): boolean {
  if (!email?.trim()) return true;
  const value = email.trim().toLowerCase();
  return (
    value.endsWith('@example.com') ||
    value.endsWith('@example.org') ||
    value.endsWith('@example.net') ||
    value.includes('placeholder')
  );
}

/**
 * Current Refund Policy configuration.
 * Verified: operating name NovaLikes, domain, support email,
 * and approved 30-Day Money-Back Guarantee on eligible orders.
 * Refill durations come from real package data on service pages — not from this file.
 */
export const refundConfig: RefundConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-08-17',
  lastUpdatedDate: '2026-08-17',
  processingTimeDescription: undefined,
  eligibleMoneyBackWindowLabel: '30-Day Money-Back Guarantee',

  operationalPolicyVerified: true,
  publicationStatus: 'draft',
  legalReviewCompleted: false,
};

/** Support/contact email only when configured and not a placeholder. */
export function getVerifiedRefundContactEmail(
  config: RefundConfig = refundConfig,
): string | undefined {
  const email = config.supportEmail?.trim();
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

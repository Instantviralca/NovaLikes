/**
 * Refund Policy configuration — Document 13.06.
 *
 * Use verified values only. Do not invent refund windows, refill periods,
 * processing SLAs, or contact details.
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
 * Verified today: operating/legal display name NovaLikes, domain novalikes.com.
 * Refill durations come from real package data on service pages — not from this file.
 */
export const refundConfig: RefundConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  // Launch blockers until verified — intentionally unset
  supportEmail: undefined,
  mailingAddress: undefined,
  effectiveDate: undefined,
  lastUpdatedDate: undefined,
  processingTimeDescription: undefined,
  eligibleMoneyBackWindowLabel: undefined,

  operationalPolicyVerified: false,
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

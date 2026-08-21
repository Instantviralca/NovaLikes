/**
 * Terms & Conditions configuration — Document 13.05.
 *
 * Use verified values only. Do not invent legal entity names, addresses,
 * governing law, venues, or contact details.
 *
 * TODO: GOVERNING LAW / JURISDICTION REQUIRES BUSINESS CONFIRMATION
 * TODO: DISPUTE VENUE REQUIRES BUSINESS CONFIRMATION
 * TODO: CONFIRM distinct registered legal entity name (if different from "NovaLikes")
 * TODO: CONFIRM mailing / registered office address
 * TODO: CONFIRM numeric minimum customer age after legal review
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';
import type { TermsConfig } from '@/types/legal';

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
 * Current Terms configuration.
 * Verified: operating name NovaLikes, domain novalikes.com, support@novalikes.com.
 * Payment providers are read from config/payments.ts at content-build time.
 */
export const termsConfig: TermsConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-08-17',
  lastUpdatedDate: '2026-08-17',
  governingLaw: undefined,
  disputeVenue: undefined,
  minimumCustomerAge: undefined,

  publicationStatus: 'draft',
  legalReviewCompleted: false,
};

/** Support/contact email only when configured and not a placeholder. */
export function getVerifiedTermsContactEmail(
  config: TermsConfig = termsConfig,
): string | undefined {
  const email = config.supportEmail?.trim();
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

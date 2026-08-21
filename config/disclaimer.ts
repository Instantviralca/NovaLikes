/**
 * Disclaimer configuration — Document 13.08.
 *
 * Use verified values only. Do not invent affiliations, partnerships,
 * endorsements, addresses, or contact details.
 *
 * TODO: CONFIRM mailing address if required for formal notices
 * TODO: CONFIRM any future verified platform partnerships before changing affiliation language
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';
import type { DisclaimerConfig } from '@/types/legal';

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

export const disclaimerConfig: DisclaimerConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-08-17',
  lastUpdatedDate: '2026-08-17',

  hasVerifiedPlatformAffiliations: false,
  publicationStatus: 'draft',
  legalReviewCompleted: false,
};

/** Support/contact email only when configured and not a placeholder. */
export function getVerifiedDisclaimerContactEmail(
  config: DisclaimerConfig = disclaimerConfig,
): string | undefined {
  const email = config.supportEmail?.trim();
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

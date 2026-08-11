/**
 * Disclaimer configuration — Document 13.08.
 *
 * Use verified values only. Do not invent affiliations, partnerships,
 * endorsements, addresses, or contact details.
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

/**
 * Current Disclaimer configuration.
 * Verified today: operating/legal display name NovaLikes, domain novalikes.com.
 * No verified platform affiliations or endorsements are configured.
 */
export const disclaimerConfig: DisclaimerConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  // Launch blockers until verified — intentionally unset
  supportEmail: undefined,
  mailingAddress: undefined,
  effectiveDate: undefined,
  lastUpdatedDate: undefined,

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

/**
 * Privacy Policy configuration — Document 13.04.
 *
 * Use verified values only. Leave optional fields undefined rather than inventing
 * business identity, contact, providers, retention, age, or processing locations.
 *
 * publicationStatus and readiness helpers are internal — do not expose checklist
 * notes on the public Privacy Policy page.
 */

import { brand } from '@/config/brand';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import type { PrivacyConfig } from '@/types/legal';

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
 * Current privacy configuration.
 * Verified today: operating/legal display name NovaLikes, domain novalikes.com.
 * Payment providers are read from config/payments.ts at content-build time.
 */
export const privacyConfig: PrivacyConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  // Launch blockers until verified — intentionally unset
  privacyContactRole: undefined,
  privacyContactName: undefined,
  privacyEmail: undefined,
  mailingAddress: undefined,
  effectiveDate: undefined,
  lastUpdatedDate: undefined,
  hostingLocation: undefined,
  emailProvider: undefined,
  minimumCustomerAge: undefined,

  cookiePreferenceToolEnabled: false,
  cookiePreferenceToolLabel: undefined,
  cookiePreferenceHref: undefined,
  cookiePolicyHref: routes.cookiePolicy,

  retentionScheduleVerified: false,
  retentionCategories: [],

  // No analytics or marketing vendors are configured in the codebase
  analyticsProviders: [],
  marketingTools: [],

  publicationStatus: 'draft',
  legalReviewCompleted: false,
};

/** Privacy email only when configured and not a placeholder. */
export function getVerifiedPrivacyEmail(
  config: PrivacyConfig = privacyConfig,
): string | undefined {
  const email = config.privacyEmail?.trim();
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

export function getEnabledAnalyticsProviders(
  config: PrivacyConfig = privacyConfig,
): PrivacyConfig['analyticsProviders'] {
  return config.analyticsProviders.filter((provider) => provider.enabled);
}

export function getEnabledMarketingTools(
  config: PrivacyConfig = privacyConfig,
): PrivacyConfig['marketingTools'] {
  return config.marketingTools.filter((tool) => tool.enabled);
}

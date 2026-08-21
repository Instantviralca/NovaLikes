/**
 * Privacy Policy configuration — Document 13.04.
 *
 * Use verified values only. Leave optional fields undefined rather than inventing
 * business identity, contact, providers, retention, age, or processing locations.
 *
 * TODO: CONFIRM distinct registered legal entity name (if different from "NovaLikes")
 * TODO: CONFIRM mailing / registered office address
 * TODO: CONFIRM privacy contact role / DPO (if required)
 * TODO: CONFIRM hosting location / international transfer details
 * TODO: CONFIRM email delivery provider for customer notifications
 * TODO: CONFIRM numeric minimum customer age after legal review
 * TODO: CONFIRM verified retention schedule periods
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
 * Verified: operating name NovaLikes, domain novalikes.com, support@novalikes.com.
 * Payment providers are read from config/payments.ts at content-build time.
 * Analytics/marketing arrays stay empty until those providers are enabled in deployment.
 */
export const privacyConfig: PrivacyConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  privacyContactRole: undefined,
  privacyContactName: undefined,
  privacyEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-08-17',
  lastUpdatedDate: '2026-08-17',
  hostingLocation: undefined,
  emailProvider: undefined,
  minimumCustomerAge: undefined,

  cookiePreferenceToolEnabled: false,
  cookiePreferenceToolLabel: undefined,
  cookiePreferenceHref: undefined,
  cookiePolicyHref: routes.cookiePolicy,

  retentionScheduleVerified: false,
  retentionCategories: [],

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

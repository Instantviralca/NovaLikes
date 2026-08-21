/**
 * Cookie Policy configuration — Document 13.07.
 *
 * Disclose only technologies that are actually used. Do not invent cookie names,
 * analytics tools, advertising pixels, or consent features.
 *
 * Verified first-party technologies (code inspection):
 * - iv_cart_v1 cookie (cart handoff, Max-Age 7 days) + sessionStorage cart cache
 * - iv_admin_session cookie (staff admin auth only)
 * - localStorage key novalikes.analytics.consent.v1 (analytics consent store)
 *
 * Analytics/marketing: env-gated adapters exist (GA4/GTM/Clarity) but remain
 * disabled unless enabled with IDs in deployment. Legal inventory stays empty.
 *
 * TODO: CONFIRM mailing address if required for cookie-related correspondence
 * TODO: CONFIRM whether a public cookie preference UI will be added
 */

import { brand } from '@/config/brand';
import { privacyConfig } from '@/config/privacy';
import { site } from '@/config/site';
import type { CookieConfig } from '@/types/legal';

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

export const cookieConfig: CookieConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-08-17',
  lastUpdatedDate: '2026-08-17',

  essentialPurposes: [
    {
      id: 'cart',
      label: 'Cart',
      description:
        'Maintains selected packages and cart contents while you shop and move between shopping and checkout hosts.',
      enabled: true,
      technologyNote:
        'Uses the first-party cookie iv_cart_v1 (up to 7 days) and a browser sessionStorage cart cache.',
    },
    {
      id: 'checkout',
      label: 'Checkout',
      description:
        'Supports checkout continuity so an order can be completed after package selection and configuration.',
      enabled: true,
    },
    {
      id: 'session',
      label: 'Session',
      description:
        'Supports browsing continuity for cart and related commerce flows. Customer accounts are not required to place an order.',
      enabled: true,
    },
    {
      id: 'security',
      label: 'Security',
      description:
        'Supports security-related website operation, including staff administrative session protection where applicable.',
      enabled: true,
      technologyNote:
        'Staff admin access may use an iv_admin_session cookie. This is not a customer login cookie.',
    },
  ],

  analyticsProviders: privacyConfig.analyticsProviders,
  marketingTools: privacyConfig.marketingTools,

  consentManagerEnabled: privacyConfig.cookiePreferenceToolEnabled,
  consentManagerLabel: privacyConfig.cookiePreferenceToolLabel,
  consentManagerHref: privacyConfig.cookiePreferenceHref,

  cookieInventoryVerified: true,
  publicationStatus: 'draft',
  legalReviewCompleted: false,
};

export function getVerifiedCookieContactEmail(
  config: CookieConfig = cookieConfig,
): string | undefined {
  const email = config.supportEmail?.trim();
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

export function getEnabledEssentialPurposes(
  config: CookieConfig = cookieConfig,
): CookieConfig['essentialPurposes'] {
  return config.essentialPurposes.filter((purpose) => purpose.enabled);
}

export function getEnabledCookieAnalyticsProviders(
  config: CookieConfig = cookieConfig,
): CookieConfig['analyticsProviders'] {
  return config.analyticsProviders.filter((provider) => provider.enabled);
}

export function getEnabledCookieMarketingTools(
  config: CookieConfig = cookieConfig,
): CookieConfig['marketingTools'] {
  return config.marketingTools.filter((tool) => tool.enabled);
}

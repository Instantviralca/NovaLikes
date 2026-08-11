/**
 * Cookie Policy configuration — Document 13.07.
 *
 * Disclose only technologies that are actually used. Do not invent cookie names,
 * analytics tools, advertising pixels, or consent features.
 *
 * Analytics / marketing inventories stay aligned with privacyConfig.
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

/**
 * Current Cookie Policy configuration.
 * Essential purposes reflect core NovaLikes commerce flows.
 * Cart state currently uses browser session storage (similar technology), not a named third-party cookie.
 * CSRF cookies are omitted until a CSRF cookie implementation is verified.
 */
export const cookieConfig: CookieConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: undefined,
  mailingAddress: undefined,
  effectiveDate: undefined,
  lastUpdatedDate: undefined,

  essentialPurposes: [
    {
      id: 'cart',
      label: 'Cart',
      description:
        'Maintains selected packages and cart contents while you shop.',
      enabled: true,
      technologyNote:
        'NovaLikes currently stores cart state in browser session storage.',
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
        'Supports session continuity while browsing NovaLikes.ca and using cart or tracking flows.',
      enabled: true,
    },
    {
      id: 'security',
      label: 'Security',
      description:
        'Supports security-related website operation and protection of the ordering experience.',
      enabled: true,
    },
  ],

  // Stay aligned with privacy configuration — no invented providers
  analyticsProviders: privacyConfig.analyticsProviders,
  marketingTools: privacyConfig.marketingTools,

  consentManagerEnabled: privacyConfig.cookiePreferenceToolEnabled,
  consentManagerLabel: privacyConfig.cookiePreferenceToolLabel,
  consentManagerHref: privacyConfig.cookiePreferenceHref,

  cookieInventoryVerified: false,
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

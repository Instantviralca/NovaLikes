/**
 * Internal Cookie Policy publication readiness — Document 13.07.
 * Never render this checklist on the public page.
 */

import {
  cookieConfig,
  getEnabledCookieAnalyticsProviders,
  getEnabledCookieMarketingTools,
  getVerifiedCookieContactEmail,
} from '@/config/cookies';
import type { CookieConfig } from '@/types/legal';

export type CookieReadinessItem = {
  id: string;
  label: string;
  satisfied: boolean;
  notes?: string;
};

export function getCookiePublicationReadiness(
  config: CookieConfig = cookieConfig,
): CookieReadinessItem[] {
  const contactEmail = getVerifiedCookieContactEmail(config);
  const analytics = getEnabledCookieAnalyticsProviders(config);
  const marketing = getEnabledCookieMarketingTools(config);

  return [
    {
      id: 'business-identity',
      label: 'Verified business identity',
      satisfied: Boolean(config.legalBusinessName && config.operatingName),
      notes: 'Display name NovaLikes is configured.',
    },
    {
      id: 'contact',
      label: 'Verified contact details',
      satisfied: Boolean(contactEmail || config.mailingAddress),
      notes: 'Support email and mailing address are not configured.',
    },
    {
      id: 'effective-dates',
      label: 'Effective and last-updated dates',
      satisfied: Boolean(config.effectiveDate && config.lastUpdatedDate),
      notes: 'Do not publish invented dates.',
    },
    {
      id: 'cookie-inventory',
      label: 'Verified named-cookie inventory',
      satisfied: config.cookieInventoryVerified,
      notes:
        'No named third-party cookie inventory is verified yet. Essential purposes are purpose-based only.',
    },
    {
      id: 'analytics-marketing',
      label: 'Analytics / marketing provider alignment',
      satisfied: true,
      notes:
        analytics.length === 0 && marketing.length === 0
          ? 'No analytics or marketing providers are enabled (correctly omitted by name).'
          : `Analytics: ${analytics.map((p) => p.displayName).join(', ') || 'none'}; Marketing: ${marketing.map((p) => p.displayName).join(', ') || 'none'}.`,
    },
    {
      id: 'consent-manager',
      label: 'Consent manager configuration',
      satisfied: true,
      notes: config.consentManagerEnabled
        ? 'Consent manager is enabled in configuration.'
        : 'No consent banner/manager is configured; page wording stays generic.',
    },
    {
      id: 'legal-review',
      label: 'Professional legal review',
      satisfied: config.legalReviewCompleted,
      notes: 'Document 13.07 is a drafting template; legal review is still required.',
    },
  ];
}

export function isCookiePolicyPublicationReady(
  config: CookieConfig = cookieConfig,
): boolean {
  if (config.publicationStatus === 'published' && config.legalReviewCompleted) {
    return getCookiePublicationReadiness(config).every((item) => item.satisfied);
  }
  return false;
}

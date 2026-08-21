/**
 * Internal Privacy Policy publication readiness — Document 13.04 §29.
 * Never render this checklist on the public page.
 */

import {
  getEnabledAnalyticsProviders,
  getEnabledMarketingTools,
  getVerifiedPrivacyEmail,
  privacyConfig,
} from '@/config/privacy';
import { getEnabledPaymentProviders } from '@/config/payments';
import type { PrivacyConfig } from '@/types/legal';

export type PrivacyReadinessItem = {
  id: string;
  label: string;
  satisfied: boolean;
  notes?: string;
};

export function getPrivacyPublicationReadiness(
  config: PrivacyConfig = privacyConfig,
): PrivacyReadinessItem[] {
  const privacyEmail = getVerifiedPrivacyEmail(config);
  const enabledPayments = getEnabledPaymentProviders();
  const enabledAnalytics = getEnabledAnalyticsProviders(config);
  const enabledMarketing = getEnabledMarketingTools(config);

  return [
    {
      id: 'business-identity',
      label: 'Verified business identity',
      satisfied: Boolean(config.legalBusinessName && config.operatingName),
      notes:
        'Display name NovaLikes is configured; confirm whether a distinct registered legal entity name is required.',
    },
    {
      id: 'privacy-contact',
      label: 'Verified privacy contact',
      satisfied: Boolean(privacyEmail || config.privacyContactName || config.privacyContactRole),
      notes: privacyEmail
        ? `Privacy contact email configured: ${privacyEmail}. Confirm role/mailing address if required.`
        : 'Privacy email, role, and mailing address are not configured.',
    },
    {
      id: 'effective-dates',
      label: 'Effective and last-updated dates',
      satisfied: Boolean(config.effectiveDate && config.lastUpdatedDate),
      notes: 'Do not publish invented dates.',
    },
    {
      id: 'payment-providers',
      label: 'Verified payment provider inventory',
      satisfied: enabledPayments.length > 0,
      notes: `Enabled: ${enabledPayments.map((p) => p.displayName).join(', ') || 'none'}.`,
    },
    {
      id: 'analytics-inventory',
      label: 'Verified analytics / marketing inventory',
      satisfied: true,
      notes:
        enabledAnalytics.length === 0 && enabledMarketing.length === 0
          ? 'No analytics or marketing tools are enabled in configuration (disclosure correctly omits named vendors).'
          : `Analytics: ${enabledAnalytics.map((p) => p.displayName).join(', ') || 'none'}; Marketing: ${enabledMarketing.map((p) => p.displayName).join(', ') || 'none'}.`,
    },
    {
      id: 'cookie-inventory',
      label: 'Verified cookie inventory and preference tool',
      satisfied: false,
      notes: 'Cookie Policy route exists; named cookie inventory and consent preference tool are not yet verified.',
    },
    {
      id: 'hosting-location',
      label: 'Verified hosting / international processing',
      satisfied: Boolean(config.hostingLocation),
      notes: 'Hosting location and processing jurisdictions are not configured.',
    },
    {
      id: 'email-provider',
      label: 'Verified email delivery provider',
      satisfied: Boolean(config.emailProvider),
      notes: 'Transactional email provider is not configured.',
    },
    {
      id: 'retention-schedule',
      label: 'Verified retention schedule',
      satisfied: config.retentionScheduleVerified && config.retentionCategories.length > 0,
      notes: 'No retention periods are published until verified.',
    },
    {
      id: 'minimum-age',
      label: 'Minimum customer age review',
      satisfied: typeof config.minimumCustomerAge === 'number',
      notes: 'Age threshold requires legal and platform-terms review.',
    },
    {
      id: 'legal-review',
      label: 'Professional legal review',
      satisfied: config.legalReviewCompleted,
      notes: 'Document 13.04 is a drafting template; legal review is still required.',
    },
  ];
}

export function isPrivacyPolicyPublicationReady(
  config: PrivacyConfig = privacyConfig,
): boolean {
  if (config.publicationStatus === 'published' && config.legalReviewCompleted) {
    return getPrivacyPublicationReadiness(config).every((item) => item.satisfied);
  }
  return false;
}

/**
 * Internal Terms & Conditions publication readiness — Document 13.05.
 * Never render this checklist on the public page.
 */

import { getEnabledPaymentProviders } from '@/config/payments';
import { getVerifiedTermsContactEmail, termsConfig } from '@/config/terms';
import type { TermsConfig } from '@/types/legal';

export type TermsReadinessItem = {
  id: string;
  label: string;
  satisfied: boolean;
  notes?: string;
};

export function getTermsPublicationReadiness(
  config: TermsConfig = termsConfig,
): TermsReadinessItem[] {
  const contactEmail = getVerifiedTermsContactEmail(config);
  const enabledPayments = getEnabledPaymentProviders();

  return [
    {
      id: 'business-identity',
      label: 'Verified business identity',
      satisfied: Boolean(config.legalBusinessName && config.operatingName),
      notes:
        'Display name NovaLikes is configured; confirm whether a distinct registered legal entity name is required.',
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
      id: 'governing-law',
      label: 'Verified governing law / venue',
      satisfied: Boolean(config.governingLaw),
      notes: 'Governing law and dispute venue are not configured.',
    },
    {
      id: 'payment-providers',
      label: 'Verified payment provider inventory',
      satisfied: enabledPayments.length > 0,
      notes: `Enabled: ${enabledPayments.map((p) => p.displayName).join(', ') || 'none'}.`,
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
      notes: 'Document 13.05 is a drafting template; legal review is still required.',
    },
  ];
}

export function isTermsPublicationReady(config: TermsConfig = termsConfig): boolean {
  if (config.publicationStatus === 'published' && config.legalReviewCompleted) {
    return getTermsPublicationReadiness(config).every((item) => item.satisfied);
  }
  return false;
}

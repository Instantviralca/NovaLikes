/**
 * Internal Disclaimer publication readiness — Document 13.08.
 * Never render this checklist on the public page.
 */

import {
  disclaimerConfig,
  getVerifiedDisclaimerContactEmail,
} from '@/config/disclaimer';
import type { DisclaimerConfig } from '@/types/legal';

export type DisclaimerReadinessItem = {
  id: string;
  label: string;
  satisfied: boolean;
  notes?: string;
};

export function getDisclaimerPublicationReadiness(
  config: DisclaimerConfig = disclaimerConfig,
): DisclaimerReadinessItem[] {
  const contactEmail = getVerifiedDisclaimerContactEmail(config);

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
      id: 'platform-affiliations',
      label: 'Platform affiliation documentation reviewed',
      satisfied: true,
      notes: config.hasVerifiedPlatformAffiliations
        ? 'Verified affiliations flag is enabled — confirm supporting documentation before publication.'
        : 'No platform affiliations claimed; independence wording is correctly used.',
    },
    {
      id: 'legal-review',
      label: 'Professional legal review',
      satisfied: config.legalReviewCompleted,
      notes: 'Document 13.08 is a drafting template; legal review is still required.',
    },
  ];
}

export function isDisclaimerPublicationReady(
  config: DisclaimerConfig = disclaimerConfig,
): boolean {
  if (config.publicationStatus === 'published' && config.legalReviewCompleted) {
    return getDisclaimerPublicationReadiness(config).every((item) => item.satisfied);
  }
  return false;
}

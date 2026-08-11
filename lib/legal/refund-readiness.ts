/**
 * Internal Refund Policy publication readiness — Document 13.06.
 * Never render this checklist on the public page.
 */

import { getVerifiedRefundContactEmail, refundConfig } from '@/config/refund';
import type { RefundConfig } from '@/types/legal';

export type RefundReadinessItem = {
  id: string;
  label: string;
  satisfied: boolean;
  notes?: string;
};

export function getRefundPublicationReadiness(
  config: RefundConfig = refundConfig,
): RefundReadinessItem[] {
  const contactEmail = getVerifiedRefundContactEmail(config);

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
      id: 'operational-policy',
      label: 'Verified operational refund rules',
      satisfied: config.operationalPolicyVerified,
      notes:
        'Operational refund, cancellation, and partial-refund rules still need business confirmation before publication.',
    },
    {
      id: 'money-back-window',
      label: 'Verified eligible money-back window (if offered)',
      satisfied: true,
      notes: config.eligibleMoneyBackWindowLabel
        ? `Configured window: ${config.eligibleMoneyBackWindowLabel}`
        : 'No money-back window label is configured; page correctly avoids inventing a 30-day or other timeframe.',
    },
    {
      id: 'processing-time',
      label: 'Verified processing-time description (if published)',
      satisfied: true,
      notes: config.processingTimeDescription
        ? 'Processing-time description is configured.'
        : 'No processing SLA is configured; page correctly avoids inventing timelines.',
    },
    {
      id: 'refill-source',
      label: 'Refill periods sourced from package data only',
      satisfied: true,
      notes:
        'No refill periods are hardcoded in the Refund Policy. Durations must appear only from real package data on service pages.',
    },
    {
      id: 'legal-review',
      label: 'Professional legal review',
      satisfied: config.legalReviewCompleted,
      notes: 'Document 13.06 is a drafting template; legal review is still required.',
    },
  ];
}

export function isRefundPolicyPublicationReady(
  config: RefundConfig = refundConfig,
): boolean {
  if (config.publicationStatus === 'published' && config.legalReviewCompleted) {
    return getRefundPublicationReadiness(config).every((item) => item.satisfied);
  }
  return false;
}

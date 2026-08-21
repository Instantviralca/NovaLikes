/**
 * Refund Policy production content — Document 13.06.
 * Approved: 30-Day Money-Back Guarantee on eligible orders.
 * Refills remain package-dependent and separate from the money-back window.
 */

import { routes } from '@/config/routes';
import { getVerifiedRefundContactEmail, refundConfig } from '@/config/refund';
import { formatLegalDisplayDate } from '@/lib/legal/format-date';
import type {
  LegalPolicySection,
  RefundConfig,
  RefundPolicyContent,
} from '@/types/legal';

function buildSections(config: RefundConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const contactEmail = getVerifiedRefundContactEmail(config);
  const guaranteeLabel =
    config.eligibleMoneyBackWindowLabel ?? '30-Day Money-Back Guarantee';

  const processingBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} reviews refund requests after the required order details are received.`,
    },
  ];

  if (config.processingTimeDescription) {
    processingBlocks.push({
      type: 'paragraph',
      text: config.processingTimeDescription,
    });
  } else {
    processingBlocks.push({
      type: 'paragraph',
      text: 'Refund processing time can depend on the payment provider and the time needed to review the order. NovaLikes does not publish a fixed refund settlement timeframe on this page.',
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `To request a refund review under the ${guaranteeLabel}, use the [Contact](${routes.contact}) page.`,
    },
  ];

  if (contactEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `You may also email [${contactEmail}](mailto:${contactEmail}).`,
    });
  }

  contactBlocks.push({
    type: 'paragraph',
    text: `Related policies: [Terms and Conditions](${routes.termsAndConditions}), [Privacy Policy](${routes.privacyPolicy}), and [FAQ](${routes.faq}).`,
  });

  return [
    {
      id: 'before-requesting-a-refund',
      anchor: 'before-requesting-a-refund',
      title: '1. Before Requesting a Refund',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before contacting support about a refund, please:',
        },
        {
          type: 'list',
          items: [
            'Verify that the username or URL submitted with the order is correct',
            'Keep the required profile, Page, post, Reel, or video publicly accessible while the order needs access to it',
            'Avoid deleting or restricting the submitted content while the order is active',
            'Contact support with your order details so the team can locate the order',
          ],
        },
      ],
    },
    {
      id: 'thirty-day-money-back-guarantee',
      anchor: 'thirty-day-money-back-guarantee',
      title: '2. 30-Day Money-Back Guarantee',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} offers a ${guaranteeLabel} on eligible orders. The 30-day period begins from the date of purchase / order payment.`,
        },
        {
          type: 'paragraph',
          text: 'Refund requests must be submitted within 30 days of the original purchase date. Eligibility depends on the circumstances of the order, including its status, the selected service, the information submitted with the order, and whether NovaLikes was able to provide the purchased service.',
        },
        {
          type: 'paragraph',
          text: 'Common qualifying circumstances that may support a refund after review include:',
        },
        {
          type: 'list',
          items: [
            'NovaLikes cannot provide the purchased service',
            'A technical or order error prevents fulfilment',
            'An eligible service problem cannot be resolved',
            'An accidental duplicate payment is confirmed',
          ],
        },
        {
          type: 'paragraph',
          text: 'Submitting a refund request does not mean every request is automatically approved. Each request is reviewed under this Refund Policy and the circumstances of the order.',
        },
      ],
    },
    {
      id: 'when-a-refund-may-not-be-available',
      anchor: 'when-a-refund-may-not-be-available',
      title: '3. When a Refund May Not Apply',
      blocks: [
        {
          type: 'paragraph',
          text: 'A refund may not be available in situations such as:',
        },
        {
          type: 'list',
          items: [
            'An incorrect username or URL was submitted and processing had already started',
            'The required profile, Page, post, Reel, or video was made private or unavailable when public access was required',
            'The submitted content was deleted or restricted after checkout',
            'The customer changed information needed to complete the order after processing started',
            'The order was successfully completed as purchased',
            'The refund request was made after the 30-day guarantee period',
            'Abuse, duplicate refund requests, fraud, or payment manipulation',
          ],
        },
        {
          type: 'paragraph',
          text: `These exclusions are intended to keep the guarantee fair and workable. They do not remove the ${guaranteeLabel} for eligible orders that qualify under Section 2.`,
        },
      ],
    },
    {
      id: 'cancellations',
      anchor: 'cancellations',
      title: '4. Cancellations',
      blocks: [
        {
          type: 'paragraph',
          text: 'There is no self-service cancellation or edit option after successful payment.',
        },
        {
          type: 'paragraph',
          text: 'Customers should contact support as soon as possible with their order details. A change or cancellation may not be possible after processing has started or the order has been completed.',
        },
      ],
    },
    {
      id: 'drops-and-refills',
      anchor: 'drops-and-refills',
      title: '5. Drops and Refills',
      blocks: [
        {
          type: 'paragraph',
          text: 'Follower, like, view, comment, and similar social-platform metrics can change over time for reasons outside NovaLikes’ control.',
        },
        {
          type: 'paragraph',
          text: 'Refill availability depends on the service and package purchased. Any applicable refill conditions are those shown for the relevant service or package.',
        },
        {
          type: 'paragraph',
          text: `The ${guaranteeLabel} is separate from any package-specific refill terms. This page does not convert the money-back window into a universal 30-day refill guarantee.`,
        },
      ],
    },
    {
      id: 'duplicate-orders-or-payments',
      anchor: 'duplicate-orders-or-payments',
      title: '6. Duplicate Orders or Payments',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you believe you were charged twice for the same intended purchase, contact support promptly with both payment references or order details.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} will review the records and, where a confirmed duplicate payment is found, work toward an appropriate resolution under this Refund Policy and the applicable payment provider process.`,
        },
      ],
    },
    {
      id: 'payment-disputes',
      anchor: 'payment-disputes',
      title: '7. Payment Disputes',
      blocks: [
        {
          type: 'paragraph',
          text: `If you have a payment or order concern, please contact ${operatingName} support first so the team can investigate and respond.`,
        },
        {
          type: 'paragraph',
          text: 'This policy does not unlawfully restrict any chargeback or dispute rights you may have with your payment provider or under applicable law.',
        },
      ],
    },
    {
      id: 'how-to-request-a-refund',
      anchor: 'how-to-request-a-refund',
      title: '8. How to Request a Refund',
      blocks: [
        {
          type: 'paragraph',
          text: `To request a review under the ${guaranteeLabel}, submit a request through the [Contact](${routes.contact}) page${contactEmail ? ` or email [${contactEmail}](mailto:${contactEmail})` : ''}.`,
        },
        {
          type: 'paragraph',
          text: 'Please include:',
        },
        {
          type: 'list',
          items: [
            'Order reference',
            'Email address used for the order',
            'A short explanation of the issue',
          ],
        },
        {
          type: 'paragraph',
          text: 'Never send Instagram, TikTok, or Facebook passwords. NovaLikes does not need social media login credentials to review an order.',
        },
      ],
    },
    {
      id: 'refund-processing',
      anchor: 'refund-processing',
      title: '9. Refund Processing',
      blocks: processingBlocks,
    },
    {
      id: 'contact',
      anchor: 'contact',
      title: '10. Contact',
      blocks: contactBlocks,
    },
  ];
}

export function getRefundPolicyContent(
  config: RefundConfig = refundConfig,
): RefundPolicyContent {
  const guaranteeLabel =
    config.eligibleMoneyBackWindowLabel ?? '30-Day Money-Back Guarantee';

  return {
    id: 'refund-policy',
    path: routes.refundPolicy,
    seo: {
      title: 'Refund Policy | NovaLikes',
      description:
        'Read the NovaLikes Refund Policy for information about the 30-Day Money-Back Guarantee, refund eligibility, order issues, cancellations, refills and requesting support.',
    },
    breadcrumbLabel: 'Refund Policy',
    header: {
      title: 'Refund Policy',
      intro: `${config.operatingName} offers a ${guaranteeLabel} on eligible orders. If you experience a qualifying problem with your purchase, you may contact NovaLikes within 30 days of the order date to request a review and, where eligible, a refund.`,
    },
    tocTitle: 'On this page',
    sections: buildSections(config),
  };
}

export function getRefundPolicyDates(config: RefundConfig = refundConfig): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  return {
    effectiveDateLabel: formatLegalDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatLegalDisplayDate(config.lastUpdatedDate),
  };
}

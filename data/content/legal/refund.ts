/**
 * Refund Policy production content — Document 13.06.
 * Body text lives here; React views render sections without hardcoding policy copy.
 * Do not invent refill periods, money-back windows, or processing SLAs.
 */

import { routes } from '@/config/routes';
import { getVerifiedRefundContactEmail, refundConfig } from '@/config/refund';
import type {
  LegalPolicySection,
  RefundConfig,
  RefundPolicyContent,
} from '@/types/legal';

function formatDisplayDate(isoDate: string | undefined): string | undefined {
  if (!isoDate) return undefined;
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

function buildSections(config: RefundConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const domainHost = config.websiteDomain.replace(/^https?:\/\//, '');
  const contactEmail = getVerifiedRefundContactEmail(config);
  const termsPath = routes.termsAndConditions;
  const privacyPath = routes.privacyPolicy;
  const contactPath = routes.contact;
  const faqPath = routes.faq;

  const eligibilityBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Not every NovaLikes order is refundable. Eligible refunds depend on NovaLikes’s operational review and factors such as:`,
    },
    {
      type: 'list',
      items: [
        'Order status',
        'Service type',
        'Package terms shown with the real package data',
        'Operational review of the request',
        'Customer compliance with order instructions and these policy terms',
      ],
    },
  ];

  if (config.eligibleMoneyBackWindowLabel) {
    eligibilityBlocks.push({
      type: 'paragraph',
      text: `Where an eligible money-back window is published for a purchase, the configured window is: ${config.eligibleMoneyBackWindowLabel}. That window remains subject to this Refund Policy, the selected package conditions, order status, and customer actions.`,
    });
  } else {
    eligibilityBlocks.push({
      type: 'paragraph',
      text: 'NovaLikes does not publish an unconditional money-back promise on this page. Any eligible money-back or refund window must come from verified operational policy and the conditions shown for the selected service and package. NovaLikes will not invent a refund timeframe for public display.',
    });
  }

  eligibilityBlocks.push({
    type: 'paragraph',
    text: `Submitting a refund request does not guarantee approval or any particular outcome. Related questions are also covered in the FAQ at ${domainHost}${faqPath}.`,
  });

  const processingBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} reviews refund and refill requests after the required order details are received. NovaLikes does not promise approval, a fixed outcome, or uninterrupted processing for every request.`,
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
      text: 'A specific public processing-time SLA has not been configured. NovaLikes will communicate about eligible requests through support after reviewing the order ID, checkout email, and issue description. Do not treat unpublished timeframes as guarantees.',
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `For refund or refill help, contact NovaLikes support with your order ID, checkout email, and a clear description of the issue.`,
    },
    {
      type: 'paragraph',
      text: `Operating name: ${config.operatingName}`,
    },
    {
      type: 'paragraph',
      text: `Legal / business name on file: ${config.legalBusinessName}`,
    },
    {
      type: 'paragraph',
      text: `Website: ${config.websiteDomain}`,
    },
  ];

  if (contactEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Support email: ${contactEmail}`,
    });
  } else {
    contactBlocks.push({
      type: 'paragraph',
      text: `A verified support email has not been published in Refund Policy configuration. Submit refund requests through the Contact page at ${domainHost}${contactPath}. Do not treat placeholder or example email addresses as official contacts.`,
    });
  }

  if (config.mailingAddress) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Mailing address: ${config.mailingAddress}`,
    });
  }

  contactBlocks.push({
    type: 'paragraph',
    text: `You may also review the Terms & Conditions at ${domainHost}${termsPath}, the Privacy Policy at ${domainHost}${privacyPath}, and common answers in the FAQ at ${domainHost}${faqPath}.`,
  });

  return [
    {
      id: 'scope',
      anchor: 'scope',
      title: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text: `This Refund Policy explains how ${operatingName} handles refunds, partial refunds, cancellations, refill eligibility, customer responsibilities, and situations where a refund may not be available for orders placed through ${domainHost}.`,
        },
        {
          type: 'paragraph',
          text: `This policy works together with the Terms & Conditions (${domainHost}${termsPath}) and the Privacy Policy (${domainHost}${privacyPath}). Package-specific delivery estimates, features, and refill eligibility shown on service pages come from NovaLikes’s real package pricing data.`,
        },
      ],
    },
    {
      id: 'refund-eligibility',
      anchor: 'refund-eligibility',
      title: 'Refund Eligibility',
      blocks: eligibilityBlocks,
    },
    {
      id: 'non-refundable',
      anchor: 'non-refundable',
      title: 'Non-Refundable Situations',
      blocks: [
        {
          type: 'paragraph',
          text: 'Refunds are generally not available in situations such as the following, subject to NovaLikes’s operational review:',
        },
        {
          type: 'list',
          items: [
            'Orders that have been completed in accordance with the selected package and destination details',
            'Incorrect usernames, profile URLs, page URLs, post URLs, channel URLs, or video URLs supplied by the customer',
            'Customer-requested changes after processing has begun',
            'Orders affected by destination privacy settings, deleted content, restricted access, or other destination changes made after checkout',
            'Violations of the Terms & Conditions',
            'Abuse, fraud, chargeback misuse, or repeated bad-faith requests',
          ],
        },
        {
          type: 'paragraph',
          text: 'These examples do not create an exhaustive list. NovaLikes may decline a refund where the operational review shows the request is outside eligible circumstances.',
        },
      ],
    },
    {
      id: 'partial-refunds',
      anchor: 'partial-refunds',
      title: 'Partial Refunds',
      blocks: [
        {
          type: 'paragraph',
          text: 'A partial refund may be considered when NovaLikes’s operational process supports it — for example, when only part of an order was completed, when an order is marked partial, or when a reviewed request otherwise warrants limited credit.',
        },
        {
          type: 'paragraph',
          text: 'Partial refunds are not automatic and are not available for every order. Any partial refund amount depends on the reviewed order status, package terms, and NovaLikes’s operational decision.',
        },
      ],
    },
    {
      id: 'order-cancellations',
      anchor: 'order-cancellations',
      title: 'Order Cancellations',
      blocks: [
        {
          type: 'paragraph',
          text: 'Customers cannot directly edit or cancel an order after successful payment through self-service tools. Contact support as soon as possible with the order ID and checkout email if you need help before or during processing.',
        },
        {
          type: 'paragraph',
          text: 'Cancellation or refund may not be possible once processing has started or the order has been completed. NovaLikes will review cancellation requests according to order status and operational policy.',
        },
      ],
    },
    {
      id: 'refill-policy',
      anchor: 'refill-policy',
      title: 'Refill Policy',
      blocks: [
        {
          type: 'paragraph',
          text: 'Only eligible packages include refill protection. Refill availability, duration, limits, and conditions must come from the real package data shown on the relevant service page before checkout.',
        },
        {
          type: 'paragraph',
          text: 'NovaLikes does not invent refill periods on this page. If a package does not display refill eligibility, assume refill protection is not included for that package unless NovaLikes later confirms otherwise in the package data.',
        },
        {
          type: 'paragraph',
          text: 'Where refill coverage applies, it is limited to qualifying decreases during the stated refill period for that package and remains subject to destination requirements, package terms, and operational review.',
        },
      ],
    },
    {
      id: 'customer-responsibilities',
      anchor: 'customer-responsibilities',
      title: 'Customer Responsibilities',
      blocks: [
        {
          type: 'paragraph',
          text: 'Customers are responsible for:',
        },
        {
          type: 'list',
          items: [
            'Providing an accurate public username or URL for the selected service',
            'Keeping the destination public and accessible as required for fulfilment and any eligible refill',
            'Reviewing package terms, delivery estimates, and refill eligibility before payment',
            'Following NovaLikes instructions related to the order',
            'Submitting refund or refill requests with complete and truthful information',
          ],
        },
        {
          type: 'paragraph',
          text: 'Incorrect destination information supplied by the customer may delay, reduce, or prevent fulfilment and may make an order ineligible for a refund.',
        },
      ],
    },
    {
      id: 'refund-request-process',
      anchor: 'refund-request-process',
      title: 'Refund Request Process',
      blocks: [
        {
          type: 'paragraph',
          text: `To request help with a refund or refill, contact NovaLikes support through the Contact page at ${domainHost}${contactPath} and include only the information needed to locate and review the order:`,
        },
        {
          type: 'list',
          items: [
            'Order ID',
            'Checkout email',
            'Description of the issue',
          ],
        },
        {
          type: 'paragraph',
          text: 'NovaLikes will verify the order details and review the request against the applicable package terms and operational policy. A request does not guarantee approval, a refund amount, a refill, or any other specific outcome.',
        },
      ],
    },
    {
      id: 'processing-time',
      anchor: 'processing-time',
      title: 'Processing Time',
      blocks: processingBlocks,
    },
    {
      id: 'contact-support',
      anchor: 'contact-support',
      title: 'Contact Support',
      blocks: contactBlocks,
    },
  ];
}

export function getRefundPolicyContent(
  config: RefundConfig = refundConfig,
): RefundPolicyContent {
  return {
    id: 'refund-policy',
    path: routes.refundPolicy,
    seo: {
      title: 'Refund Policy | NovaLikes',
      description:
        'Read the NovaLikes refund policy, including eligibility, cancellations, partial refunds, refill coverage, and customer responsibilities.',
    },
    breadcrumbLabel: 'Refund Policy',
    header: {
      title: 'Refund Policy',
      intro:
        'This Refund Policy explains when NovaLikes may consider refunds, partial refunds, cancellations, and refill coverage for eligible packages. Not every order is refundable. Review the package terms shown before checkout and contact support if you need help with an existing order.',
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
    effectiveDateLabel: formatDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatDisplayDate(config.lastUpdatedDate),
  };
}

export { refundConfig };

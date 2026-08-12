/**
 * Terms & Conditions production content — Document 13.05.
 * Body text lives here; React views render sections without hardcoding legal copy.
 * Provider-specific and jurisdiction disclosures are conditional on verified config.
 */

import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { getVerifiedTermsContactEmail, termsConfig } from '@/config/terms';
import type {
  LegalPolicySection,
  TermsAndConditionsContent,
  TermsConfig,
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

function buildSections(config: TermsConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const domainHost = config.websiteDomain.replace(/^https?:\/\//, '');
  const enabledPayments = getEnabledPaymentProviders();
  const paymentNames = enabledPayments.map((provider) => provider.displayName);
  const contactEmail = getVerifiedTermsContactEmail(config);
  const refundPolicyPath = routes.refundPolicy;
  const privacyPolicyPath = routes.privacyPolicy;
  const contactPath = routes.contact;

  const paymentBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Payment is required to place an order through ${domainHost}. Available payment methods are those currently enabled in NovaLikes checkout configuration.`,
    },
  ];

  if (paymentNames.length > 0) {
    paymentBlocks.push({
      type: 'paragraph',
      text: `Currently enabled payment methods: ${paymentNames.join(', ')}.`,
    });
  } else {
    paymentBlocks.push({
      type: 'paragraph',
      text: 'No payment methods are currently enabled. This section will be updated when a payment method is enabled.',
    });
  }

  paymentBlocks.push({
    type: 'paragraph',
    text: 'Payment processing is handled by the enabled payment provider. NovaLikes does not claim that every payment attempt will succeed, and failed or incomplete payments do not create a fulfilled order.',
  });

  const eligibilityBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `You may use NovaLikes services only if you have the legal capacity to enter into a binding agreement and are permitted to use the website under applicable law and the terms of Instagram, TikTok, Facebook, YouTube, and any payment provider you use.`,
    },
  ];

  if (typeof config.minimumCustomerAge === 'number') {
    eligibilityBlocks.push({
      type: 'paragraph',
      text: `The current configured minimum customer age is ${config.minimumCustomerAge}.`,
    });
  } else {
    eligibilityBlocks.push({
      type: 'paragraph',
      text: 'A specific numeric age threshold will be published only after legal review and alignment with applicable law and platform requirements. NovaLikes does not invent an arbitrary age for these Terms.',
    });
  }

  const governingBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'These Terms are intended to be interpreted under the laws that apply to NovaLikes’s operations and customers, subject to professional legal review before publication.',
    },
  ];

  if (config.governingLaw) {
    governingBlocks.push({
      type: 'paragraph',
      text: `Governing law currently configured: ${config.governingLaw}.`,
    });
  } else {
    governingBlocks.push({
      type: 'paragraph',
      text: 'A specific governing-law jurisdiction has not been published in NovaLikes configuration. NovaLikes will not invent a province, state, or country for these Terms.',
    });
  }

  if (config.disputeVenue) {
    governingBlocks.push({
      type: 'paragraph',
      text: `Dispute venue currently configured: ${config.disputeVenue}.`,
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about these Terms may be submitted using the contact details below.`,
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
      text: `Contact email: ${contactEmail}`,
    });
  } else {
    contactBlocks.push({
      type: 'paragraph',
      text: `A verified support email has not been published in Terms configuration. Until that address is verified, contact NovaLikes through the Contact page at ${domainHost}${contactPath}. Do not treat placeholder or example email addresses as official contacts.`,
    });
  }

  if (config.mailingAddress) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Mailing address: ${config.mailingAddress}`,
    });
  }

  return [
    {
      id: 'acceptance',
      anchor: 'acceptance',
      title: 'Acceptance of Terms',
      blocks: [
        {
          type: 'paragraph',
          text: `By accessing ${domainHost}, browsing service pages, creating an order configuration, placing an order, tracking an order, or otherwise using NovaLikes services, you agree to these Terms & Conditions and to the Privacy Policy available at ${domainHost}${privacyPolicyPath}.`,
        },
        {
          type: 'paragraph',
          text: 'If you do not agree to these Terms, do not use the website or place an order.',
        },
      ],
    },
    {
      id: 'eligibility',
      anchor: 'eligibility',
      title: 'Eligibility',
      blocks: eligibilityBlocks,
    },
    {
      id: 'website-use',
      anchor: 'website-use',
      title: 'Website Use',
      blocks: [
        {
          type: 'paragraph',
          text: `You may use ${domainHost} only for lawful purposes and in accordance with these Terms. NovaLikes may update website features, service pages, pricing displays, and related tools from time to time.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not promise uninterrupted, error-free, or continuously available website access. Temporary interruptions may occur for maintenance, security, infrastructure, or reasons outside NovaLikes’s control.`,
        },
      ],
    },
    {
      id: 'services-offered',
      anchor: 'services-offered',
      title: 'Services Offered',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} offers package-based social media growth services for selected Instagram, TikTok, Facebook, and YouTube metrics through NovaLikes.com. Available services and packages are those displayed with real package data from NovaLikes’s pricing system.`,
        },
        {
          type: 'paragraph',
          text: 'Purchasing services does not guarantee rankings, monetization, organic engagement, revenue, verification, Partner Program approval, watch hours, algorithmic promotion, or any particular platform outcome. Third-party platforms control their own systems and policies.',
        },
      ],
    },
    {
      id: 'orders',
      anchor: 'orders',
      title: 'Orders',
      blocks: [
        {
          type: 'paragraph',
          text: 'Orders are processed using the information you provide during order configuration and checkout, including the required public username, profile URL, page URL, post URL, channel URL, or video URL for the selected service.',
        },
        {
          type: 'paragraph',
          text: 'You are responsible for verifying that submitted usernames and URLs are accurate, public, and correctly associated with the intended destination before payment. Incorrect, private, changed, or inaccessible destinations may delay, reduce, or prevent fulfilment.',
        },
        {
          type: 'paragraph',
          text: 'Order configuration fields are determined by the selected service. NovaLikes does not request social media passwords or private authentication codes to place an order.',
        },
      ],
    },
    {
      id: 'pricing',
      anchor: 'pricing',
      title: 'Pricing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Prices shown on NovaLikes.com come from NovaLikes’s real package pricing data. NovaLikes does not invent dummy prices, quantities, delivery estimates, badges, discounts, or package features for display.',
        },
        {
          type: 'paragraph',
          text: 'Prices are subject to change until an order is successfully placed. The price charged for a completed checkout is the price confirmed for that order at the time payment succeeds.',
        },
        {
          type: 'paragraph',
          text: 'Delivery estimates, refill eligibility, and package features, when shown, come from the selected package data and are not unlimited guarantees of performance.',
        },
      ],
    },
    {
      id: 'payments',
      anchor: 'payments',
      title: 'Payments',
      blocks: paymentBlocks,
    },
    {
      id: 'refunds',
      anchor: 'refunds',
      title: 'Refunds',
      blocks: [
        {
          type: 'paragraph',
          text: `Refund and refill eligibility is governed by the Refund Policy available at ${domainHost}${refundPolicyPath}. These Terms do not duplicate that policy.`,
        },
        {
          type: 'paragraph',
          text: 'Not every order is automatically refundable. Eligibility depends on the Refund Policy, the selected service and package conditions, order status, and applicable customer actions.',
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
          text: 'When using NovaLikes, you agree to:',
        },
        {
          type: 'list',
          items: [
            'Provide accurate contact and order information',
            'Submit the correct public username or URL for the selected service',
            'Keep the destination public and accessible as required for fulfilment',
            'Comply with applicable law and the terms of third-party platforms you use',
            'Use NovaLikes services only for lawful purposes',
            'Not attempt to interfere with website security, payments, or order processing',
          ],
        },
      ],
    },
    {
      id: 'acceptable-use',
      anchor: 'acceptable-use',
      title: 'Acceptable Use',
      blocks: [
        {
          type: 'paragraph',
          text: 'You may not use NovaLikes to:',
        },
        {
          type: 'list',
          items: [
            'Violate applicable law or third-party platform terms',
            'Submit fraudulent payment information',
            'Abuse checkout, coupons, tracking, or support systems',
            'Attempt unauthorized access to NovaLikes systems or data',
            'Harass NovaLikes staff or other customers',
            'Misrepresent your identity or destination ownership where ownership or control is required for a lawful order',
          ],
        },
        {
          type: 'paragraph',
          text: `${operatingName} may refuse, delay, cancel, or limit orders that appear abusive, fraudulent, incomplete, or otherwise inconsistent with these Terms.`,
        },
      ],
    },
    {
      id: 'intellectual-property',
      anchor: 'intellectual-property',
      title: 'Intellectual Property',
      blocks: [
        {
          type: 'paragraph',
          text: `The NovaLikes name, website design, logos, copy, software, and other NovaLikes content are owned by NovaLikes or its licensors and are protected by applicable intellectual property laws.`,
        },
        {
          type: 'paragraph',
          text: 'You may not copy, scrape, republish, or commercially exploit NovaLikes website content except as expressly permitted by NovaLikes or required by law.',
        },
      ],
    },
    {
      id: 'third-party-platforms',
      anchor: 'third-party-platforms',
      title: 'Third-Party Platforms',
      blocks: [
        {
          type: 'paragraph',
          text: 'Instagram, TikTok, Facebook, YouTube, payment providers, and other third-party platforms operate independently from NovaLikes and publish their own terms, policies, and technical rules.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} is not responsible for third-party platform decisions, outages, algorithm changes, account restrictions, content removals, or policy enforcement. Customers should review relevant third-party terms before ordering.`,
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      anchor: 'limitation-of-liability',
      title: 'Limitation of Liability',
      blocks: [
        {
          type: 'paragraph',
          text: `To the fullest extent permitted by applicable law, ${operatingName} is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, lost data, reputational harm, or business interruption arising from website use or purchased services.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not guarantee uninterrupted service, specific social media outcomes, rankings, monetization, engagement, revenue, or platform approval. Nothing in these Terms excludes liability that cannot be excluded under applicable law.`,
        },
      ],
    },
    {
      id: 'indemnification',
      anchor: 'indemnification',
      title: 'Indemnification',
      blocks: [
        {
          type: 'paragraph',
          text: `You agree to indemnify and hold harmless ${operatingName} and its operators from claims, losses, and expenses arising from your misuse of the website, your submitted order information, your violation of these Terms, or your violation of applicable law or third-party platform terms, to the extent permitted by law.`,
        },
      ],
    },
    {
      id: 'termination',
      anchor: 'termination',
      title: 'Termination',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may refuse service, cancel orders, or restrict access to the website where reasonably necessary to address fraud, abuse, security risk, legal compliance, or material breaches of these Terms.`,
        },
        {
          type: 'paragraph',
          text: 'Provisions that by their nature should survive termination, including intellectual property, limitation of liability, indemnification, and governing-law provisions, will continue to apply as permitted by law.',
        },
      ],
    },
    {
      id: 'governing-law',
      anchor: 'governing-law',
      title: 'Governing Law',
      blocks: governingBlocks,
    },
    {
      id: 'changes-to-terms',
      anchor: 'changes-to-terms',
      title: 'Changes to Terms',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update these Terms when services, payment methods, legal requirements, or business operations change. The revised Terms will display a new Last Updated date when that date is configured for publication.`,
        },
        {
          type: 'paragraph',
          text: 'Continued use of the website or placement of new orders after updated Terms are published constitutes acceptance of the revised Terms, except where applicable law requires a different process.',
        },
      ],
    },
    {
      id: 'contact-information',
      anchor: 'contact-information',
      title: 'Contact Information',
      blocks: contactBlocks,
    },
  ];
}

export function getTermsAndConditionsContent(
  config: TermsConfig = termsConfig,
): TermsAndConditionsContent {
  return {
    id: 'terms-and-conditions',
    path: routes.termsAndConditions,
    seo: {
      title: 'Terms & Conditions | NovaLikes',
      description:
        'Read the Terms & Conditions governing the use of NovaLikes, website access, orders, payments, refunds, acceptable use, and customer responsibilities.',
    },
    breadcrumbLabel: 'Terms & Conditions',
    header: {
      title: 'Terms & Conditions',
      intro:
        'These Terms & Conditions govern your use of NovaLikes.com, including browsing service pages, configuring and placing orders, making payments, tracking orders, and contacting support. Please read them carefully before using the website or placing an order.',
    },
    tocTitle: 'On this page',
    sections: buildSections(config),
  };
}

export function getTermsAndConditionsDates(config: TermsConfig = termsConfig): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  return {
    effectiveDateLabel: formatDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatDisplayDate(config.lastUpdatedDate),
  };
}

export { termsConfig };

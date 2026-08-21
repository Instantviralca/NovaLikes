/**
 * Terms and Conditions production content — Document 13.05.
 */

import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { getVerifiedTermsContactEmail, termsConfig } from '@/config/terms';
import { getDefaultCurrency } from '@/data/pricing/currencies';
import { formatLegalDisplayDate } from '@/lib/legal/format-date';
import type {
  LegalPolicySection,
  TermsAndConditionsContent,
  TermsConfig,
} from '@/types/legal';

function buildSections(config: TermsConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const contactEmail = getVerifiedTermsContactEmail(config);
  const enabledPayments = getEnabledPaymentProviders();
  const paymentNames = enabledPayments.map((provider) => provider.displayName);
  const currency = getDefaultCurrency();

  const eligibilityBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `You may use ${operatingName} only if you can form a binding contract under applicable law and you have authority to submit the public profile, Page, or content information used for an order.`,
    },
  ];

  if (typeof config.minimumCustomerAge === 'number') {
    eligibilityBlocks.push({
      type: 'paragraph',
      text: `You must be at least ${config.minimumCustomerAge} years old to use NovaLikes paid services.`,
    });
  } else {
    // TODO: CONFIRM numeric minimum customer age after legal review
    eligibilityBlocks.push({
      type: 'paragraph',
      text: 'A specific numeric minimum age is not published in these Terms until it is confirmed after legal review. You remain responsible for complying with applicable age requirements of law and of Instagram, TikTok, Facebook, and payment providers.',
    });
  }

  const paymentBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Prices are shown in ${currency.code} (${currency.label}) unless another currency display applies to a specific experience. The amount confirmed at checkout for your order governs that purchase.`,
    },
  ];

  if (paymentNames.length > 0) {
    paymentBlocks.push({
      type: 'paragraph',
      text: `Currently enabled payment method(s) at checkout: ${paymentNames.join(', ')}. Available methods can change; the options shown during checkout control what you can use for that order.`,
    });
  } else {
    paymentBlocks.push({
      type: 'paragraph',
      text: 'No payment methods are currently enabled in checkout configuration.',
    });
  }

  paymentBlocks.push({
    type: 'paragraph',
    text: 'Card payments are processed through the enabled third-party payment collector. NovaLikes does not store complete card numbers on its own systems.',
  });

  const governingBlocks: LegalPolicySection['blocks'] = [];

  if (config.governingLaw) {
    governingBlocks.push({
      type: 'paragraph',
      text: `These Terms are governed by the laws of ${config.governingLaw}, without regard to conflict-of-law principles that would require another jurisdiction’s law.`,
    });
  } else {
    // TODO: GOVERNING LAW / JURISDICTION REQUIRES BUSINESS CONFIRMATION
    governingBlocks.push({
      type: 'paragraph',
      text: 'Governing law and dispute venue have not been published in NovaLikes configuration pending business and legal confirmation. These Terms do not invent a jurisdiction for public display.',
    });
  }

  if (config.disputeVenue) {
    governingBlocks.push({
      type: 'paragraph',
      text: `Disputes arising out of these Terms will be handled in ${config.disputeVenue}, subject to applicable law.`,
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about these Terms can be sent through the [Contact](${routes.contact}) page.`,
    },
  ];

  if (contactEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `You may also email ${contactEmail}.`,
    });
  }

  return [
    {
      id: 'acceptance-of-these-terms',
      anchor: 'acceptance-of-these-terms',
      title: '1. Acceptance of These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: `By accessing NovaLikes, using free tools, or purchasing a service, you agree to these Terms and Conditions and to the incorporated policies, including the [Privacy Policy](${routes.privacyPolicy}), [Refund Policy](${routes.refundPolicy}), [Cookie Policy](${routes.cookiePolicy}), and [Disclaimer](${routes.disclaimer}).`,
        },
        {
          type: 'paragraph',
          text: 'If you do not agree, do not use the website or place an order.',
        },
      ],
    },
    {
      id: 'eligibility',
      anchor: 'eligibility',
      title: '2. Eligibility',
      blocks: eligibilityBlocks,
    },
    {
      id: 'novalikes-services',
      anchor: 'novalikes-services',
      title: '3. NovaLikes Services',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} is a social media services website. It currently provides selected third-party social media-related services for Instagram, TikTok, and Facebook.`,
        },
        {
          type: 'paragraph',
          text: 'Current paid service categories include selected Instagram Followers, Likes, Views, and Comments; TikTok Followers, Likes, and Views; and Facebook Followers, Page Likes, and Post Likes, as offered on the website from time to time.',
        },
        {
          type: 'paragraph',
          text: 'Service availability may change. Purchasing a service does not promise engagement, reach, sales, viral growth, algorithm improvement, monetization, or other results beyond what is described for the selected package.',
        },
        {
          type: 'paragraph',
          text: 'NovaLikes may also offer free social media tools. Free tools are separate from paid services and do not create a paid-service entitlement.',
        },
      ],
    },
    {
      id: 'no-affiliation-with-social-platforms',
      anchor: 'no-affiliation-with-social-platforms',
      title: '4. No Affiliation With Social Platforms',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} is an independent service. NovaLikes is not Instagram, TikTok, or Facebook.`,
        },
        {
          type: 'paragraph',
          text: 'Unless explicitly stated otherwise, NovaLikes is not endorsed, sponsored, administered by, or officially affiliated with Instagram, TikTok, Facebook, Meta, or their parent or related companies. Platform names are used only to identify relevant third-party platforms and services.',
        },
      ],
    },
    {
      id: 'customer-responsibilities',
      anchor: 'customer-responsibilities',
      title: '5. Customer Responsibilities',
      blocks: [
        {
          type: 'paragraph',
          text: 'You are responsible for:',
        },
        {
          type: 'list',
          items: [
            'Providing accurate order information',
            'Submitting the correct public username or URL for the selected service',
            'Maintaining required public accessibility while an order needs access',
            'Ensuring you have authority to submit the relevant account, Page, or content',
            'Reviewing package details before purchase',
            'Complying with applicable laws and third-party platform rules',
          ],
        },
        {
          type: 'paragraph',
          text: 'Never submit Instagram, TikTok, or Facebook passwords. NovaLikes does not require social media login credentials for the services described on the site.',
        },
      ],
    },
    {
      id: 'orders',
      anchor: 'orders',
      title: '6. Orders',
      blocks: [
        {
          type: 'paragraph',
          text: 'Orders are placed through guest checkout using the information requested for the selected service. A separate NovaLikes customer account is not required to place an order.',
        },
        {
          type: 'paragraph',
          text: 'After payment is initiated or confirmed, you can monitor available status updates through order tracking using your order reference and checkout email.',
        },
        {
          type: 'paragraph',
          text: 'Customers cannot directly edit order targets through self-service tools after successful payment. Contact support promptly if a correction is needed. Changes may not be possible once processing has started.',
        },
      ],
    },
    {
      id: 'prices-and-payments',
      anchor: 'prices-and-payments',
      title: '7. Prices and Payments',
      blocks: paymentBlocks,
    },
    {
      id: 'delivery-and-processing',
      anchor: 'delivery-and-processing',
      title: '8. Delivery and Processing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Processing and delivery timing vary by service and package. Use the delivery or timing information shown for the specific package you choose rather than assuming every NovaLikes service has the same timeframe.',
        },
        {
          type: 'paragraph',
          text: 'Order processing can also vary based on current operational conditions and the public accessibility of the submitted profile or content.',
        },
      ],
    },
    {
      id: 'social-platform-changes',
      anchor: 'social-platform-changes',
      title: '9. Social Platform Changes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Instagram, TikTok, and Facebook are third-party platforms. They can change systems, remove accounts or content, change metrics, restrict access, or change APIs, interfaces, and policies.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not control those platforms and cannot guarantee that platform behavior will remain unchanged.`,
        },
      ],
    },
    {
      id: 'drops-changes-and-refills',
      anchor: 'drops-changes-and-refills',
      title: '10. Drops, Changes and Refills',
      blocks: [
        {
          type: 'paragraph',
          text: 'Social metrics can change after delivery. Any refill conditions are governed by the applicable service or package terms shown for that purchase.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not make a universal refill promise on these Terms. See the [Refund Policy](${routes.refundPolicy}) for related order-issue guidance.`,
        },
      ],
    },
    {
      id: 'refunds',
      anchor: 'refunds',
      title: '11. Refunds',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} offers a 30-Day Money-Back Guarantee on eligible orders. Refund requests and eligibility are governed by the [Refund Policy](${routes.refundPolicy}).`,
        },
        {
          type: 'paragraph',
          text: 'This section does not replace the Refund Policy. Review that policy for the 30-day request window, eligibility conditions, and how to contact support.',
        },
      ],
    },
    {
      id: 'prohibited-use',
      anchor: 'prohibited-use',
      title: '12. Prohibited Use',
      blocks: [
        {
          type: 'paragraph',
          text: `You must not use ${operatingName}:`,
        },
        {
          type: 'list',
          items: [
            'For unlawful activity',
            'To interfere with site security',
            'To abuse free tools',
            'To attempt unauthorized access to systems or data',
            'To submit malicious input',
            'To use automated systems in ways that overload or disrupt the service',
            'To infringe third-party rights',
          ],
        },
      ],
    },
    {
      id: 'free-tools',
      anchor: 'free-tools',
      title: '13. Free Tools',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may provide free tools for publicly accessible social-media information or media. Tools can be changed, limited, unavailable, or affected by third-party platform restrictions.`,
        },
        {
          type: 'paragraph',
          text: 'Results are not guaranteed. Users are responsible for ensuring they have the right to download or use any content obtained through a tool.',
        },
        {
          type: 'paragraph',
          text: 'Free tools do not claim to bypass platform login walls, private-account restrictions, or other access controls.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      anchor: 'intellectual-property',
      title: '14. Intellectual Property',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} and its brand, site design, original copy, graphics, software, and other owned materials are protected by applicable intellectual-property laws.`,
        },
        {
          type: 'paragraph',
          text: 'Third-party platform trademarks remain the property of their respective owners.',
        },
      ],
    },
    {
      id: 'availability-of-the-website',
      anchor: 'availability-of-the-website',
      title: '15. Availability of the Website',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} does not guarantee uninterrupted operation. Maintenance, outages, third-party failures, and platform restrictions may affect availability of the website, checkout, tools, or order processing.`,
        },
      ],
    },
    {
      id: 'disclaimer-of-warranties',
      anchor: 'disclaimer-of-warranties',
      title: '16. Disclaimer of Warranties',
      blocks: [
        {
          type: 'paragraph',
          text: `To the maximum extent permitted by applicable law, ${operatingName} provides the website, free tools, and services on an “as is” and “as available” basis without warranties of uninterrupted availability, fitness for a particular business purpose, or specific social-media outcomes beyond the purchased service description.`,
        },
        {
          type: 'paragraph',
          text: 'Nothing in these Terms is intended to exclude warranties or rights that cannot be excluded under applicable law.',
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      anchor: 'limitation-of-liability',
      title: '17. Limitation of Liability',
      blocks: [
        {
          type: 'paragraph',
          text: `To the maximum extent permitted by applicable law, ${operatingName} is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, revenue, data, goodwill, or business opportunities arising from use of the website, free tools, or services.`,
        },
        {
          type: 'paragraph',
          text: 'These limitations apply to the fullest extent permitted by law and do not invent a monetary liability cap beyond what applicable law allows.',
        },
      ],
    },
    {
      id: 'indemnification',
      anchor: 'indemnification',
      title: '18. Indemnification',
      blocks: [
        {
          type: 'paragraph',
          text: `You agree to indemnify and hold harmless ${operatingName} from claims, losses, and expenses arising out of your misuse of NovaLikes, your violation of these Terms, or your infringement of third-party rights, to the extent permitted by applicable law.`,
        },
      ],
    },
    {
      id: 'governing-law',
      anchor: 'governing-law',
      title: '19. Governing Law',
      blocks: governingBlocks,
    },
    {
      id: 'changes-to-these-terms',
      anchor: 'changes-to-these-terms',
      title: '20. Changes to These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update these Terms from time to time. The Last Updated date at the top of this page will reflect material revisions.`,
        },
        {
          type: 'paragraph',
          text: 'Continued use of the website after an update constitutes acceptance of the revised Terms to the extent permitted by applicable law.',
        },
      ],
    },
    {
      id: 'contact',
      anchor: 'contact',
      title: '21. Contact',
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
      title: 'Terms and Conditions | NovaLikes',
      description:
        'Read the terms governing use of NovaLikes, including orders, payments, social media services, free tools and customer responsibilities.',
    },
    breadcrumbLabel: 'Terms and Conditions',
    header: {
      title: 'Terms and Conditions',
      intro:
        'These Terms and Conditions govern your access to and use of NovaLikes, including paid social media services, free tools, website features, and related support.',
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
    effectiveDateLabel: formatLegalDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatLegalDisplayDate(config.lastUpdatedDate),
  };
}

/**
 * Privacy Policy production content — Document 13.04.
 * Body text lives here; React views render sections without hardcoding policy copy.
 */

import {
  getEnabledAnalyticsProviders,
  getEnabledMarketingTools,
  getVerifiedPrivacyEmail,
  privacyConfig,
} from '@/config/privacy';
import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { getDefaultCurrency } from '@/data/pricing/currencies';
import { formatLegalDisplayDate } from '@/lib/legal/format-date';
import type { PrivacyConfig, PrivacyPolicyContent, LegalPolicySection } from '@/types/legal';

function buildSections(config: PrivacyConfig): LegalPolicySection[] {
  const enabledPayments = getEnabledPaymentProviders();
  const enabledAnalytics = getEnabledAnalyticsProviders(config);
  const enabledMarketing = getEnabledMarketingTools(config);
  const privacyEmail = getVerifiedPrivacyEmail(config);
  const operatingName = config.operatingName;
  const currency = getDefaultCurrency();
  const paymentNames = enabledPayments.map((provider) => provider.displayName);
  const analyticsNames = enabledAnalytics.map((provider) => provider.displayName);
  const marketingNames = enabledMarketing.map((tool) => tool.displayName);

  const paymentBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} processes payments through the payment method(s) enabled at checkout. Card details are entered on a third-party payment collector used for Card Payment checkout. ${operatingName} does not store complete payment-card numbers on its own systems.`,
    },
  ];

  if (paymentNames.length > 0) {
    paymentBlocks.push({
      type: 'paragraph',
      text: `Currently enabled checkout payment method(s): ${paymentNames.join(', ')}.`,
    });
    paymentBlocks.push({
      type: 'paragraph',
      text: `${operatingName} may receive order identifiers, line-item details, payment status, and related transaction information needed to confirm orders, support customers, account for payments, and handle disputes. Complete card numbers are handled by the payment collector according to that provider’s practices.`,
    });
  } else {
    paymentBlocks.push({
      type: 'paragraph',
      text: 'No payment providers are currently enabled in checkout configuration. This section will be updated when a payment provider is enabled.',
    });
  }

  paymentBlocks.push({
    type: 'paragraph',
    text: `Package prices on ${operatingName} are shown in ${currency.code} (${currency.label}) unless another currency display is configured for a specific experience.`,
  });

  const cookieBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} uses cookies and similar technologies that are necessary to operate the website, cart, checkout, and related security features. A short summary is provided here; full details are in the [Cookie Policy](${routes.cookiePolicy}).`,
    },
  ];

  if (analyticsNames.length > 0) {
    cookieBlocks.push({
      type: 'paragraph',
      text: `Analytics tools currently enabled in configuration: ${analyticsNames.join(', ')}.`,
    });
  } else {
    cookieBlocks.push({
      type: 'paragraph',
      text: 'No named analytics providers are currently enabled in NovaLikes configuration. Optional analytics adapters may exist in the codebase for future use, but they are not treated as active until they are enabled in deployment configuration.',
    });
  }

  if (marketingNames.length > 0) {
    cookieBlocks.push({
      type: 'paragraph',
      text: `Marketing tools currently enabled: ${marketingNames.join(', ')}.`,
    });
  } else {
    cookieBlocks.push({
      type: 'paragraph',
      text: 'No advertising pixels or remarketing tools are currently enabled in NovaLikes configuration.',
    });
  }

  if (config.cookiePreferenceToolEnabled && config.cookiePreferenceHref) {
    cookieBlocks.push({
      type: 'paragraph',
      text: `You can manage non-essential cookie preferences through the ${config.cookiePreferenceToolLabel ?? 'cookie preference controls'} available on the website.`,
    });
  } else {
    cookieBlocks.push({
      type: 'paragraph',
      text: 'A dedicated cookie preference banner or preference center is not currently configured. You can still use browser controls to manage cookies.',
    });
  }

  const childrenBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} services and free tools are not directed to children. Customers must be able to form a binding contract under applicable law and must meet any age requirements of Instagram, TikTok, Facebook, and payment providers that apply to them.`,
    },
  ];

  if (typeof config.minimumCustomerAge === 'number') {
    childrenBlocks.push({
      type: 'paragraph',
      text: `The current configured minimum customer age is ${config.minimumCustomerAge}.`,
    });
  } else {
    // TODO: CONFIRM numeric minimum customer age after legal review
    childrenBlocks.push({
      type: 'paragraph',
      text: 'A specific numeric minimum age is not published on this page until it is confirmed after legal review and aligned with the [Terms and Conditions](/terms-and-conditions).',
    });
  }

  childrenBlocks.push({
    type: 'paragraph',
    text: `If ${operatingName} learns that it collected personal information from a child without appropriate authorization, it will take reasonable steps to delete or otherwise address that information.`,
  });

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `For privacy questions, access requests, correction requests, deletion requests, or other privacy-related inquiries, contact ${operatingName} through the [Contact](${routes.contact}) page.`,
    },
  ];

  if (privacyEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `You may also email ${privacyEmail}.`,
    });
  }

  contactBlocks.push(
    {
      type: 'paragraph',
      text: `Operating name: ${config.operatingName}`,
    },
    {
      type: 'paragraph',
      text: `Website: ${config.websiteDomain}`,
    },
  );

  if (config.mailingAddress) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Mailing address: ${config.mailingAddress}`,
    });
  } else {
    // TODO: CONFIRM mailing / registered office address
    contactBlocks.push({
      type: 'paragraph',
      text: 'A registered mailing address has not been published in NovaLikes configuration. Use the Contact page for privacy requests until a verified address is added.',
    });
  }

  return [
    {
      id: 'information-we-collect',
      anchor: 'information-we-collect',
      title: '1. Information We Collect',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} collects information needed to operate the website, process orders, provide free tools, and respond to support requests. The categories below reflect current NovaLikes flows.`,
        },
        {
          type: 'subheading',
          id: 'order-information',
          text: 'Order information',
        },
        {
          type: 'paragraph',
          text: 'When you place an order, NovaLikes may collect:',
        },
        {
          type: 'list',
          items: [
            'Email address (required for checkout and order tracking)',
            'Optional first name and last name if you provide them',
            'Selected service and package details',
            'Public Instagram, TikTok, or Facebook username, profile URL, Page URL, post URL, Reel URL, or video URL required for the selected service',
            'Optional order notes',
            'Order reference and status information',
            'Optional marketing preference if you opt in at checkout',
          ],
        },
        {
          type: 'subheading',
          id: 'payment-information-collected',
          text: 'Payment information',
        },
        {
          type: 'paragraph',
          text: 'Payment-card details are handled by the enabled third-party Card Payment collector during checkout. NovaLikes receives payment-related status and order accounting information rather than storing full card numbers.',
        },
        {
          type: 'subheading',
          id: 'support-information',
          text: 'Support information',
        },
        {
          type: 'paragraph',
          text: 'If you contact support, NovaLikes may collect the full name, email address, subject, optional order ID, message content, and browser user-agent information submitted with the contact form.',
        },
        {
          type: 'subheading',
          id: 'technical-information',
          text: 'Technical information',
        },
        {
          type: 'paragraph',
          text: 'Depending on how you use the site, NovaLikes may process limited technical information such as:',
        },
        {
          type: 'list',
          items: [
            'IP address used for free-tool rate limiting and abuse prevention',
            'Browser or device user-agent information associated with support requests or tool requests',
            'Cookies and similar storage used for cart, checkout continuity, and security (see the Cookie Policy)',
            'Server and application logs needed to operate and troubleshoot the website',
          ],
        },
        {
          type: 'subheading',
          id: 'free-tools-information',
          text: 'Free tools',
        },
        {
          type: 'paragraph',
          text: 'NovaLikes free tools process the public usernames or public content URLs you submit so the tool can attempt to return publicly available profile, media, or count information. Free tools do not require social media passwords and are not the same as paid NovaLikes services.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not request access to private social media accounts for the services and tools described on the site.`,
        },
      ],
    },
    {
      id: 'how-we-use-information',
      anchor: 'how-we-use-information',
      title: '2. How We Use Information',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} uses collected information to:`,
        },
        {
          type: 'list',
          items: [
            'Process orders and provide the selected social media services',
            'Provide free-tool functionality you request',
            'Process payments through enabled payment methods',
            'Provide customer support and respond to inquiries',
            'Enable order-status tracking with the order reference and checkout email',
            'Maintain website security and detect misuse or fraud',
            'Troubleshoot technical issues and improve site functionality',
            'Send transactional messages related to orders or support where email delivery is configured',
            'Honor optional marketing preferences when you opt in',
            'Comply with legal, accounting, and dispute-related obligations',
          ],
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not use this Privacy Policy to authorize selling personal information to data brokers.`,
        },
      ],
    },
    {
      id: 'social-media-information',
      anchor: 'social-media-information',
      title: '3. Social Media Information',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} services may require public social media information so the selected service can be applied to the intended profile, Page, post, Reel, or video.`,
        },
        {
          type: 'paragraph',
          text: 'Depending on the service, this can include an Instagram username or public profile/content URL, a TikTok username or public profile/video URL, a public Facebook Page URL, or a public Facebook post URL.',
        },
        {
          type: 'paragraph',
          text: 'Customers should never provide social media passwords. NovaLikes does not require customers to provide their Instagram, TikTok, or Facebook passwords for the services described on the site.',
        },
      ],
    },
    {
      id: 'payment-processing',
      anchor: 'payment-processing',
      title: '4. Payment Processing',
      blocks: paymentBlocks,
    },
    {
      id: 'cookies-and-similar-technologies',
      anchor: 'cookies-and-similar-technologies',
      title: '5. Cookies and Similar Technologies',
      blocks: cookieBlocks,
    },
    {
      id: 'how-we-share-information',
      anchor: 'how-we-share-information',
      title: '6. How We Share Information',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} shares information only as needed to operate the business and fulfill requests, including with:`,
        },
        {
          type: 'list',
          items: [
            'Payment processors / payment collectors used for checkout',
            'Hosting and infrastructure providers that run the website and related systems',
            'Technical service providers used for email delivery, security, or similar operations when configured',
            'Professional advisers or authorities when required by law or to protect legal rights',
          ],
        },
        {
          type: 'paragraph',
          text: `Based on current NovaLikes business policy as reflected in this site, ${operatingName} does not sell personal information.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not claim that information is never shared with any third party, because payment processing and infrastructure providers necessarily receive limited information to perform their roles.`,
        },
      ],
    },
    {
      id: 'data-retention',
      anchor: 'data-retention',
      title: '7. Data Retention',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} retains information for as long as reasonably necessary for orders, support, records, security, accounting, and legal obligations, or as otherwise required by applicable law.`,
        },
        {
          type: 'paragraph',
          // TODO: CONFIRM verified retention schedule periods
          text: 'Specific retention periods are not published on this page until a verified retention schedule is configured. NovaLikes will not invent retention timeframes for public display.',
        },
      ],
    },
    {
      id: 'data-security',
      anchor: 'data-security',
      title: '8. Data Security',
      blocks: [
        {
          type: 'paragraph',
          text: 'We use reasonable administrative and technical measures intended to protect information handled through NovaLikes.',
        },
        {
          type: 'paragraph',
          text: 'No method of transmission or storage is completely secure. NovaLikes does not claim that systems are unhackable or that information can never be compromised.',
        },
      ],
    },
    {
      id: 'your-privacy-rights',
      anchor: 'your-privacy-rights',
      title: '9. Your Privacy Rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'Privacy rights can depend on your location and applicable law. Depending on those laws, you may be able to request access, correction, deletion, or other rights available under applicable law.',
        },
        {
          type: 'paragraph',
          text: `To make a privacy request, contact ${operatingName} through the [Contact](${routes.contact}) page${privacyEmail ? ` or email ${privacyEmail}` : ''}. We may need to verify your identity before responding.`,
        },
        {
          type: 'paragraph',
          text: 'This section does not claim that every privacy right applies worldwide.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      anchor: 'childrens-privacy',
      title: '10. Children’s Privacy',
      blocks: childrenBlocks,
    },
    {
      id: 'third-party-platforms',
      anchor: 'third-party-platforms',
      title: '11. Third-Party Platforms and Websites',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} interacts with or links to third-party platforms such as Instagram, TikTok, and Facebook. Those platforms have their own terms, privacy policies, and practices.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} is not responsible for the privacy practices of third-party platforms or external websites linked from NovaLikes.`,
        },
      ],
    },
    {
      id: 'changes-to-this-privacy-policy',
      anchor: 'changes-to-this-privacy-policy',
      title: '12. Changes to This Privacy Policy',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update this Privacy Policy from time to time. The Last Updated date at the top of this page will reflect material revisions.`,
        },
        {
          type: 'paragraph',
          text: 'Continued use of the website after an update means you should review the revised policy for the current terms.',
        },
      ],
    },
    {
      id: 'contact-us',
      anchor: 'contact-us',
      title: '13. Contact Us',
      blocks: contactBlocks,
    },
  ];
}

export function getPrivacyPolicyContent(
  config: PrivacyConfig = privacyConfig,
): PrivacyPolicyContent {
  return {
    id: 'privacy-policy',
    path: routes.privacyPolicy,
    seo: {
      title: 'Privacy Policy | NovaLikes',
      description:
        'Read the NovaLikes Privacy Policy to learn how information is collected, used, processed and protected when you use our website and services.',
    },
    breadcrumbLabel: 'Privacy Policy',
    header: {
      title: 'Privacy Policy',
      intro:
        'This Privacy Policy explains how NovaLikes collects, uses, stores, and handles information when you visit our website, place an order, use our free tools, contact support, or otherwise interact with our services.',
    },
    tocTitle: 'On this page',
    sections: buildSections(config),
  };
}

export function getPrivacyPolicyDates(config: PrivacyConfig = privacyConfig): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  return {
    effectiveDateLabel: formatLegalDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatLegalDisplayDate(config.lastUpdatedDate),
  };
}

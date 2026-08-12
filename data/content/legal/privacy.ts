/**
 * Privacy Policy production content — Document 13.04.
 * Body text lives here; React views render sections without hardcoding policy copy.
 * Provider-specific disclosures are conditional on verified configuration.
 */

import {
  getEnabledAnalyticsProviders,
  getEnabledMarketingTools,
  getVerifiedPrivacyEmail,
  privacyConfig,
} from '@/config/privacy';
import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import type { PrivacyConfig, PrivacyPolicyContent, LegalPolicySection } from '@/types/legal';

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

function buildSections(config: PrivacyConfig): LegalPolicySection[] {
  const enabledPayments = getEnabledPaymentProviders();
  const enabledAnalytics = getEnabledAnalyticsProviders(config);
  const enabledMarketing = getEnabledMarketingTools(config);
  const privacyEmail = getVerifiedPrivacyEmail(config);
  const operatingName = config.operatingName;
  const domainHost = config.websiteDomain.replace(/^https?:\/\//, '');

  const paymentNames = enabledPayments.map((provider) => provider.displayName);
  const analyticsNames = enabledAnalytics.map((provider) => provider.displayName);
  const marketingNames = enabledMarketing.map((tool) => tool.displayName);

  const paymentBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} does not store complete payment-card details on its own systems. Payment information is collected and processed by the payment providers that are currently enabled for checkout.`,
    },
  ];

  if (paymentNames.length > 0) {
    paymentBlocks.push({
      type: 'paragraph',
      text: `Currently enabled payment providers: ${paymentNames.join(', ')}.`,
    });
    paymentBlocks.push({
      type: 'paragraph',
      text: `${operatingName} may receive payment tokens, transaction identifiers, payer email where provided by the processor, billing details the processor returns, and payment status information needed for accounting, fraud prevention, refunds, and dispute management. Complete card numbers are handled by the payment provider according to that provider’s privacy practices.`,
    });
  } else {
    paymentBlocks.push({
      type: 'paragraph',
      text: 'No payment providers are currently enabled in checkout configuration. This section will be updated when a payment provider is enabled.',
    });
  }

  const cookieBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'NovaLikes uses technologies that are necessary to operate the website and may use additional analytics or marketing technologies only when they are actually enabled in configuration.',
    },
    {
      type: 'subheading',
      id: 'essential-technologies',
      text: 'Essential Technologies',
    },
    {
      type: 'paragraph',
      text: 'Essential technologies may be used for cart state, checkout functionality, security, session continuity, fraud prevention, and storing cookie preferences when a preference tool is available.',
    },
  ];

  if (analyticsNames.length > 0) {
    cookieBlocks.push(
      {
        type: 'subheading',
        id: 'analytics-technologies',
        text: 'Analytics Technologies',
      },
      {
        type: 'paragraph',
        text: `Analytics tools currently enabled: ${analyticsNames.join(', ')}. These tools may help NovaLikes understand page visits, navigation patterns, device categories, conversion events, and website performance.`,
      },
    );
  } else {
    cookieBlocks.push(
      {
        type: 'subheading',
        id: 'analytics-technologies',
        text: 'Analytics Technologies',
      },
      {
        type: 'paragraph',
        text: 'No named analytics providers are currently enabled in NovaLikes configuration. This policy will be updated if analytics tools are introduced.',
      },
    );
  }

  if (marketingNames.length > 0) {
    cookieBlocks.push(
      {
        type: 'subheading',
        id: 'marketing-technologies',
        text: 'Marketing Technologies',
      },
      {
        type: 'paragraph',
        text: `Marketing tools currently enabled: ${marketingNames.join(', ')}.`,
      },
    );
  } else {
    cookieBlocks.push(
      {
        type: 'subheading',
        id: 'marketing-technologies',
        text: 'Marketing Technologies',
      },
      {
        type: 'paragraph',
        text: 'No marketing pixels or advertising tools are currently enabled in NovaLikes configuration.',
      },
    );
  }

  if (config.cookiePreferenceToolEnabled && config.cookiePreferenceHref) {
    cookieBlocks.push({
      type: 'paragraph',
      text: `You can manage non-essential cookie preferences through the ${config.cookiePreferenceToolLabel ?? 'cookie preference controls'} available on the website.`,
    });
  } else {
    cookieBlocks.push({
      type: 'paragraph',
      text: 'A dedicated cookie preference tool is not currently configured on NovaLikes.com. Browser controls can still be used to manage optional cookies, and this Privacy Policy will be updated if a preference tool is added.',
    });
  }

  if (config.cookiePolicyHref) {
    const cookiePolicyUrl = config.cookiePolicyHref.startsWith('http')
      ? config.cookiePolicyHref
      : `${domainHost}${config.cookiePolicyHref}`;
    cookieBlocks.push({
      type: 'paragraph',
      text: `Additional cookie details are published in the Cookie Policy at ${cookiePolicyUrl}.`,
    });
  }

  const internationalBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'Some service providers that NovaLikes uses to operate the website, process payments, send email, or provide infrastructure may process personal information outside your province or country. Information processed in another jurisdiction may be subject to the laws of that jurisdiction.',
    },
  ];

  if (config.hostingLocation) {
    internationalBlocks.push({
      type: 'paragraph',
      text: `Hosting location currently configured: ${config.hostingLocation}.`,
    });
  } else {
    internationalBlocks.push({
      type: 'paragraph',
      text: 'A specific hosting location has not been published in NovaLikes configuration. NovaLikes does not claim region-specific storage unless and until that arrangement is verified.',
    });
  }

  if (config.emailProvider) {
    internationalBlocks.push({
      type: 'paragraph',
      text: `Transactional email delivery currently uses: ${config.emailProvider}.`,
    });
  }

  if (paymentNames.length > 0) {
    internationalBlocks.push({
      type: 'paragraph',
      text: `Payment processing for enabled providers (${paymentNames.join(', ')}) may occur on those providers’ systems, which can include infrastructure in other regions. Review each provider’s privacy policy for details.`,
    });
  }

  const retentionBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} retains personal information only for as long as reasonably necessary for the identified purposes and applicable legal obligations. When information is no longer needed, it should be securely deleted, anonymized, or otherwise disposed of according to NovaLikes’s retention practices.`,
    },
  ];

  if (config.retentionScheduleVerified && config.retentionCategories.length > 0) {
    retentionBlocks.push({
      type: 'paragraph',
      text: 'Verified retention categories currently documented:',
    });
    retentionBlocks.push({
      type: 'list',
      items: config.retentionCategories.map((entry) =>
        entry.period ? `${entry.label}: ${entry.period}` : entry.label,
      ),
    });
  } else {
    retentionBlocks.push({
      type: 'paragraph',
      text: 'Specific retention periods for carts, support records, orders, analytics, and security logs are not published on this page until a verified retention schedule is configured. NovaLikes will not invent retention timeframes for public display.',
    });
  }

  const childrenBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} services are not directed to children below the minimum age permitted by applicable law and the terms of Instagram, TikTok, Facebook, YouTube, and payment providers.`,
    },
  ];

  if (typeof config.minimumCustomerAge === 'number') {
    childrenBlocks.push({
      type: 'paragraph',
      text: `The current configured minimum customer age is ${config.minimumCustomerAge}.`,
    });
  } else {
    childrenBlocks.push({
      type: 'paragraph',
      text: 'A specific numeric age threshold will be published only after legal review and alignment with applicable privacy law, payment-provider requirements, and platform terms. NovaLikes does not select an arbitrary age for this policy.',
    });
  }

  childrenBlocks.push({
    type: 'paragraph',
    text: `If NovaLikes learns that it collected personal information from a child without valid authorization, it will take appropriate steps to delete or otherwise address that information.`,
  });

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `If you have a question, access request, correction request, or complaint about ${operatingName}’s privacy practices, contact the person responsible for privacy using the details listed below. We will review the request, verify identity where necessary, and respond according to applicable law and our internal privacy procedures.`,
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

  if (config.privacyContactRole || config.privacyContactName) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Privacy contact: ${[config.privacyContactRole, config.privacyContactName].filter(Boolean).join(' — ')}`,
    });
  }

  if (privacyEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `Privacy email: ${privacyEmail}`,
    });
  } else {
    contactBlocks.push({
      type: 'paragraph',
      text: `A dedicated privacy email address has not been published in configuration. Until that address is verified, privacy questions may be submitted through the Contact page at ${domainHost}${routes.contact}. Do not treat placeholder or example email addresses as privacy contacts.`,
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
    text: 'If you are not satisfied with NovaLikes’s response, you may have the right to escalate a privacy complaint to the applicable privacy regulator in your jurisdiction.',
  });

  return [
    {
      id: 'scope',
      anchor: 'scope',
      title: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text: `This Privacy Policy applies to personal information handled through ${domainHost}, including service and pricing pages, cart and checkout, order configuration, order confirmation, order tracking, contact and support forms, email communications, administrative order processing, and analytics or security tools that are actually enabled.`,
        },
        {
          type: 'paragraph',
          text: 'This policy does not automatically apply to independent third-party websites, social media platforms, or payment providers that publish their own privacy policies.',
        },
      ],
    },
    {
      id: 'information-we-collect',
      anchor: 'information-we-collect',
      title: 'Information We Collect',
      blocks: [
        {
          type: 'subheading',
          id: 'information-customers-provide',
          text: 'Information Customers Provide',
        },
        {
          type: 'paragraph',
          text: 'Depending on how you use NovaLikes, you may provide:',
        },
        {
          type: 'list',
          items: [
            'Full name',
            'Email address',
            'Order ID',
            'Customer support messages',
            'Optional order notes',
            'Coupon code',
            'Selected service and package',
            'Public social media username',
            'Public profile, page, post, Reel, channel, or video URL',
            'Custom comment text where a supported package requires it',
            'Consent records',
            'Terms acceptance records',
          ],
        },
        {
          type: 'subheading',
          id: 'transaction-and-order-information',
          text: 'Transaction and Order Information',
        },
        {
          type: 'list',
          items: [
            'Package quantity',
            'Price and currency',
            'Discounts',
            'Payment status',
            'Order status',
            'Timestamps',
            'Order history',
            'Customer-safe status timeline',
            'Internal administrative notes, which are not exposed publicly',
          ],
        },
        {
          type: 'subheading',
          id: 'technical-information',
          text: 'Technical Information',
        },
        {
          type: 'paragraph',
          text: 'Where actually collected through site operation, security, or enabled tools, NovaLikes may process technical information such as IP address, browser type, device type, operating system, referral source, pages visited, approximate location derived from IP, session identifiers, security and error logs, and cookie preferences.',
        },
        {
          type: 'subheading',
          id: 'information-not-requested',
          text: 'Information Not Requested',
        },
        {
          type: 'paragraph',
          text: 'NovaLikes does not request Instagram, TikTok, Facebook, YouTube, or Google account passwords, private direct messages, or social media authentication codes.',
        },
      ],
    },
    {
      id: 'how-information-is-collected',
      anchor: 'how-information-is-collected',
      title: 'How Information Is Collected',
      blocks: [
        {
          type: 'paragraph',
          text: 'Information may be collected:',
        },
        {
          type: 'list',
          items: [
            'Directly from forms completed by the customer',
            'During cart and checkout',
            'Through order tracking lookups',
            'Through customer support communications',
            'Automatically through cookies, logs, analytics, and security technologies that are actually enabled',
            'From payment and infrastructure providers where necessary to confirm transactions, prevent fraud, or operate the service',
          ],
        },
      ],
    },
    {
      id: 'purposes',
      anchor: 'purposes',
      title: 'Purposes for Collection and Use',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may use personal information for the following real and necessary purposes:`,
        },
        {
          type: 'list',
          items: [
            'Providing requested services',
            'Processing and confirming orders',
            'Associating selected packages with the correct public social media destination',
            'Communicating order updates',
            'Providing order tracking',
            'Responding to customer questions',
            'Processing payments through enabled payment providers',
            'Applying valid coupons and calculating totals',
            'Preventing duplicate, fraudulent, abusive, or unauthorized activity',
            'Troubleshooting technical issues',
            'Maintaining security logs',
            'Improving website usability and performance',
            'Meeting legal, accounting, tax, dispute-resolution, and recordkeeping obligations',
            'Sending marketing communications only where legally permitted and consented to',
          ],
        },
        {
          type: 'paragraph',
          text: 'NovaLikes does not use personal information for materially new purposes without assessing whether new consent or notice is required.',
        },
      ],
    },
    {
      id: 'consent',
      anchor: 'consent',
      title: 'Consent and Privacy Choices',
      blocks: [
        {
          type: 'paragraph',
          text: 'NovaLikes seeks meaningful consent appropriate to the sensitivity of the information and the purpose of collection. Customers should be able to:',
        },
        {
          type: 'list',
          items: [
            'Decide whether to receive optional marketing emails',
            'Manage non-essential cookies where a consent tool is required or implemented',
            'Withdraw consent for optional uses, subject to legal and contractual restrictions',
            'Request information about privacy practices',
            'Request access to or correction of personal information',
          ],
        },
        {
          type: 'paragraph',
          text: 'Withdrawing consent may affect services that cannot be provided without the required information.',
        },
      ],
    },
    {
      id: 'sharing',
      anchor: 'sharing',
      title: 'How Information Is Shared',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} discloses personal information only as necessary to operate the service. Depending on what is actually configured, recipients may include:`,
        },
        {
          type: 'list',
          items: [
            ...(paymentNames.length > 0
              ? [`Payment processors currently enabled: ${paymentNames.join(', ')}`]
              : ['Payment processors, when enabled for checkout']),
            'Hosting and cloud infrastructure providers',
            config.emailProvider
              ? `Email delivery providers (${config.emailProvider})`
              : 'Email delivery providers, when configured',
            ...(analyticsNames.length > 0
              ? [`Analytics providers currently enabled: ${analyticsNames.join(', ')}`]
              : []),
            ...(marketingNames.length > 0
              ? [`Marketing tools currently enabled: ${marketingNames.join(', ')}`]
              : []),
            'Fraud-prevention and security providers',
            'Customer support tools',
            'Professional advisers',
            'Government, regulators, courts, or law enforcement where legally required',
            'A buyer, investor, or successor during a genuine business transaction, subject to appropriate safeguards',
          ],
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not sell personal information. If that practice ever changes, this policy and the related consent process would be updated first.`,
        },
      ],
    },
    {
      id: 'payment-information',
      anchor: 'payment-information',
      title: 'Payment Information',
      blocks: paymentBlocks,
    },
    {
      id: 'cookies-analytics',
      anchor: 'cookies-analytics',
      title: 'Cookies, Analytics, and Similar Technologies',
      blocks: cookieBlocks,
    },
    {
      id: 'international-processing',
      anchor: 'international-processing',
      title: 'International Processing',
      blocks: internationalBlocks,
    },
    {
      id: 'retention',
      anchor: 'retention',
      title: 'Retention',
      blocks: retentionBlocks,
    },
    {
      id: 'security-safeguards',
      anchor: 'security-safeguards',
      title: 'Security Safeguards',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} uses safeguards appropriate to the sensitivity and volume of personal information. Depending on the system and context, safeguards may include HTTPS, access controls, strong administrator authentication, role restrictions, secure password storage, encryption where appropriate, server-side payment verification, protected environment variables, audit logs, backups, rate limiting, monitoring, vendor due diligence, staff confidentiality practices, and secure deletion.`,
        },
        {
          type: 'paragraph',
          text: 'No website can guarantee absolute security. NovaLikes does not claim that personal information is completely secure, 100% secure, or impossible to breach. NovaLikes uses reasonable safeguards and continues to improve its practices over time.',
        },
      ],
    },
    {
      id: 'privacy-incidents',
      anchor: 'privacy-incidents',
      title: 'Privacy Incidents',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} maintains a privacy incident process that includes containing the incident, investigating what happened, assessing sensitivity and possible harm, recording relevant facts and decisions, notifying affected individuals and regulators where legally required, correcting weaknesses, and preserving required breach records.`,
        },
        {
          type: 'paragraph',
          text: 'If you suspect a privacy or security concern related to NovaLikes, use the privacy contact details in the Contact and Complaints section below, or submit a message through the Contact page.',
        },
      ],
    },
    {
      id: 'access-and-correction',
      anchor: 'access-and-correction',
      title: 'Access and Correction',
      blocks: [
        {
          type: 'paragraph',
          text: 'Subject to applicable law and valid exceptions, individuals may request:',
        },
        {
          type: 'list',
          items: [
            'Access to personal information held about them',
            'Information about how it has been used or disclosed',
            'Correction of inaccurate or incomplete information',
            'Withdrawal of consent for optional uses',
            'Information about the privacy complaint process',
          ],
        },
        {
          type: 'paragraph',
          text: 'NovaLikes verifies identity before responding. Requests should be submitted through the verified privacy contact listed in this policy when available, or through the Contact page until that contact is published. NovaLikes does not promise a specific response timeframe on this page unless a verified operational commitment is configured.',
        },
      ],
    },
    {
      id: 'marketing-communications',
      anchor: 'marketing-communications',
      title: 'Marketing Communications',
      blocks: [
        {
          type: 'paragraph',
          text: 'Marketing email is sent only when legally permitted. Each marketing message should include accurate sender identification, a valid contact method, and a functioning unsubscribe mechanism.',
        },
        {
          type: 'paragraph',
          text: 'Transactional order emails remain separate from optional promotional consent where appropriate. NovaLikes honours unsubscribe requests and suppression records when marketing email is used.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      anchor: 'childrens-privacy',
      title: 'Children’s Privacy',
      blocks: childrenBlocks,
    },
    {
      id: 'third-party-links',
      anchor: 'third-party-links',
      title: 'Third-Party Links and Platforms',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} pages may link to Instagram, TikTok, Facebook, YouTube, payment providers, and other external websites. Those third parties control their own privacy practices.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} is not responsible for independent third-party privacy policies, content, or security. Review the relevant third-party policies before providing information directly to those services.`,
        },
      ],
    },
    {
      id: 'policy-changes',
      anchor: 'policy-changes',
      title: 'Policy Changes',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update this Privacy Policy when data practices change, new tools or providers are introduced, legal requirements change, new products or features launch, or business operations change.`,
        },
        {
          type: 'paragraph',
          text: 'The revised policy will display a new Last Updated date when that date is configured for publication. For material changes, NovaLikes will consider a more prominent notice or renewed consent where required.',
        },
      ],
    },
    {
      id: 'contact-and-complaints',
      anchor: 'contact-and-complaints',
      title: 'Contact and Complaints',
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
        'Read how NovaLikes collects, uses, protects, retains, and shares personal information when customers browse the website, contact support, or place an order.',
    },
    breadcrumbLabel: 'Privacy Policy',
    header: {
      title: 'Privacy Policy',
      intro:
        'This Privacy Policy explains how NovaLikes collects, uses, discloses, retains, and protects personal information when you browse NovaLikes.com, contact our team, place an order, use order tracking, or otherwise interact with our services.',
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
    effectiveDateLabel: formatDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatDisplayDate(config.lastUpdatedDate),
  };
}

export { privacyConfig };

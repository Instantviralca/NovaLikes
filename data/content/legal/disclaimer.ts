/**
 * Disclaimer production content — Document 13.08.
 * Body text lives here; React views render sections without hardcoding disclaimer copy.
 * Do not invent affiliations, result guarantees, or contact details.
 */

import {
  disclaimerConfig,
  getVerifiedDisclaimerContactEmail,
} from '@/config/disclaimer';
import { routes } from '@/config/routes';
import type {
  DisclaimerConfig,
  DisclaimerContent,
  LegalPolicySection,
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

function buildSections(config: DisclaimerConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const domainHost = config.websiteDomain.replace(/^https?:\/\//, '');
  const contactEmail = getVerifiedDisclaimerContactEmail(config);
  const termsPath = routes.termsAndConditions;
  const privacyPath = routes.privacyPolicy;
  const refundPath = routes.refundPolicy;
  const contactPath = routes.contact;

  const affiliationBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} is an independent social media growth service provider. NovaLikes operates NovaLikes.ca and is not a social media platform.`,
    },
  ];

  if (config.hasVerifiedPlatformAffiliations) {
    affiliationBlocks.push({
      type: 'paragraph',
      text: 'Verified platform affiliations or endorsements, when documented, will be listed here after confirmation.',
    });
  } else {
    affiliationBlocks.push({
      type: 'paragraph',
      text: 'Unless supported by verified documentation, NovaLikes is not:',
    });
    affiliationBlocks.push({
      type: 'list',
      items: [
        'Affiliated with Instagram',
        'Endorsed by TikTok',
        'Sponsored by Facebook or Meta',
        'Partnered with YouTube or Google',
        'Acting on behalf of any social media platform',
      ],
    });
  }

  affiliationBlocks.push({
    type: 'paragraph',
    text: 'All trademarks, product names, logos, and brand identifiers for Instagram, TikTok, Facebook, Meta, YouTube, Google, and other third parties belong to their respective owners. Use of those names on NovaLikes.ca is for descriptive reference only.',
  });

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about this Disclaimer may be submitted using the contact details below.`,
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
      text: `A verified contact email has not been published in Disclaimer configuration. Submit questions through the Contact page at ${domainHost}${contactPath}. Do not treat placeholder or example email addresses as official contacts.`,
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
    text: `Related documents: Terms & Conditions (${domainHost}${termsPath}), Privacy Policy (${domainHost}${privacyPath}), and Refund Policy (${domainHost}${refundPath}).`,
  });

  return [
    {
      id: 'general-information',
      anchor: 'general-information',
      title: 'General Information',
      blocks: [
        {
          type: 'paragraph',
          text: `Content on ${domainHost} is provided for general commercial and informational purposes. It describes NovaLikes services, ordering, policies, and educational materials related to social media growth.`,
        },
        {
          type: 'paragraph',
          text: `Service descriptions, delivery estimates, package features, and policies should be read together with the relevant service page, the real package data shown before checkout, the Terms & Conditions (${domainHost}${termsPath}), and the Refund Policy (${domainHost}${refundPath}).`,
        },
      ],
    },
    {
      id: 'no-affiliation',
      anchor: 'no-affiliation',
      title: 'No Affiliation with Social Platforms',
      blocks: affiliationBlocks,
    },
    {
      id: 'no-guaranteed-results',
      anchor: 'no-guaranteed-results',
      title: 'No Guaranteed Results',
      blocks: [
        {
          type: 'paragraph',
          text: 'Results from NovaLikes services may vary. Outcomes can depend on the selected service, package terms, platform conditions, account or content accessibility, customer-provided information, processing conditions, and changes made by third-party platforms.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not guarantee:`,
        },
        {
          type: 'list',
          items: [
            'That followers, likes, views, comments, or subscribers will remain permanently',
            'Organic engagement',
            'Viral reach',
            'Rankings or discoverability',
            'Recommendations',
            'Sales',
            'Revenue',
            'Verification',
            'Brand growth',
          ],
        },
        {
          type: 'paragraph',
          text: 'Purchased activity does not replace an organic content, audience, or marketing strategy.',
        },
      ],
    },
    {
      id: 'no-monetization-or-ranking',
      anchor: 'no-monetization-or-ranking',
      title: 'No Monetization or Ranking Guarantee',
      blocks: [
        {
          type: 'subheading',
          id: 'youtube-disclaimer',
          text: 'YouTube',
        },
        {
          type: 'paragraph',
          text: 'Purchased YouTube Subscribers or Views do not guarantee YouTube Partner Program approval, monetization, qualifying watch hours, higher rankings, recommendations, revenue, or verification.',
        },
        {
          type: 'subheading',
          id: 'instagram-tiktok-facebook-disclaimer',
          text: 'Instagram, TikTok, and Facebook',
        },
        {
          type: 'paragraph',
          text: 'Purchased Instagram, TikTok, or Facebook services do not guarantee algorithmic promotion, Explore or For You placement, organic reach, sales, follower retention, or account verification.',
        },
      ],
    },
    {
      id: 'service-availability-and-delivery',
      anchor: 'service-availability-and-delivery',
      title: 'Service Availability and Delivery',
      blocks: [
        {
          type: 'paragraph',
          text: 'Package availability, pricing, features, start times, and delivery estimates may change. NovaLikes displays only real package data from NovaLikes.ca and does not invent prices, quantities, delivery times, badges, discounts, refill coverage, or package features for display.',
        },
        {
          type: 'paragraph',
          text: 'Delivery estimates shown with packages are estimates, not absolute guarantees, unless a verified written NovaLikes policy expressly states otherwise.',
        },
      ],
    },
    {
      id: 'educational-content',
      anchor: 'educational-content',
      title: 'Educational Content Disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text: 'Learn articles, guides, FAQs, and other website content are provided for general informational purposes.',
        },
        {
          type: 'paragraph',
          text: 'They do not constitute legal advice, financial advice, tax advice, professional marketing advice, or a guaranteed growth strategy. Readers should use their own judgment and seek professional advice where appropriate.',
        },
      ],
    },
    {
      id: 'external-links',
      anchor: 'external-links',
      title: 'External Links',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may link to third-party websites, including social platforms, payment providers, and other external resources.`,
        },
        {
          type: 'paragraph',
          text: 'NovaLikes does not control and is not responsible for third-party content, privacy practices, availability, security, terms, products, or services. A link does not automatically imply endorsement.',
        },
      ],
    },
    {
      id: 'customer-responsibility',
      anchor: 'customer-responsibility',
      title: 'Customer Responsibility',
      blocks: [
        {
          type: 'paragraph',
          text: 'Customers are responsible for:',
        },
        {
          type: 'list',
          items: [
            'Providing accurate usernames and URLs',
            'Keeping eligible destinations publicly accessible during processing',
            'Reviewing package terms before purchase',
            'Following platform rules',
            'Using services lawfully',
            'Monitoring account and content settings',
          ],
        },
        {
          type: 'paragraph',
          text: 'Subject to applicable law, NovaLikes should not be held responsible for issues caused by incorrect information supplied by the customer or by customer changes after processing begins.',
        },
      ],
    },
    {
      id: 'testimonials-and-reviews',
      anchor: 'testimonials-and-reviews',
      title: 'Testimonials and Reviews',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} uses authentic testimonials and reviews only. Individual experiences vary, and reviews do not guarantee that you will receive similar results.`,
        },
        {
          type: 'paragraph',
          text: 'Reviews should not be fabricated, altered deceptively, or presented without permission. Where genuine reviews are unavailable, NovaLikes does not invent them and does not publish Review or AggregateRating schema without genuine supporting data.',
        },
      ],
    },
    {
      id: 'changes',
      anchor: 'changes',
      title: 'Changes to This Disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update this Disclaimer when services change, legal requirements change, new platforms are added, or business practices change.`,
        },
        {
          type: 'paragraph',
          text: 'The revised Disclaimer will display a new Last Updated date when that date is configured for publication.',
        },
      ],
    },
    {
      id: 'contact',
      anchor: 'contact',
      title: 'Contact',
      blocks: contactBlocks,
    },
  ];
}

export function getDisclaimerContent(
  config: DisclaimerConfig = disclaimerConfig,
): DisclaimerContent {
  return {
    id: 'disclaimer',
    path: routes.disclaimer,
    seo: {
      title: 'Disclaimer | NovaLikes',
      description:
        'Read the NovaLikes disclaimer covering third-party platform independence, service limitations, educational content, external links, and results.',
    },
    breadcrumbLabel: 'Disclaimer',
    header: {
      title: 'Disclaimer',
      intro:
        'This Disclaimer explains important limitations about NovaLikes services, third-party platform independence, results, educational content, external links, and customer responsibilities. Please read it together with the Terms & Conditions, Privacy Policy, and Refund Policy.',
    },
    tocTitle: 'On this page',
    sections: buildSections(config),
  };
}

export function getDisclaimerDates(config: DisclaimerConfig = disclaimerConfig): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  return {
    effectiveDateLabel: formatDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatDisplayDate(config.lastUpdatedDate),
  };
}

export { disclaimerConfig };

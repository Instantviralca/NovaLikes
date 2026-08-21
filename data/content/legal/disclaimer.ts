/**
 * Disclaimer production content — Document 13.08.
 */

import { routes } from '@/config/routes';
import {
  disclaimerConfig,
  getVerifiedDisclaimerContactEmail,
} from '@/config/disclaimer';
import { formatLegalDisplayDate } from '@/lib/legal/format-date';
import type {
  DisclaimerConfig,
  DisclaimerContent,
  LegalPolicySection,
} from '@/types/legal';

function buildSections(config: DisclaimerConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const contactEmail = getVerifiedDisclaimerContactEmail(config);

  const affiliationBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `${operatingName} is an independent service and is not endorsed, sponsored, administered by, or officially affiliated with Instagram, TikTok, Facebook, Meta, or their parent or related companies unless explicitly stated otherwise.`,
    },
  ];

  if (config.hasVerifiedPlatformAffiliations) {
    affiliationBlocks.push({
      type: 'paragraph',
      text: 'Any verified platform relationship will be described clearly where it applies.',
    });
  } else {
    affiliationBlocks.push({
      type: 'paragraph',
      text: 'Platform names and trademarks are used only to identify relevant third-party platforms and services. All such marks remain the property of their respective owners.',
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about this Disclaimer can be sent through the [Contact](${routes.contact}) page.`,
    },
  ];

  if (contactEmail) {
    contactBlocks.push({
      type: 'paragraph',
      text: `You may also email ${contactEmail}.`,
    });
  }

  contactBlocks.push({
    type: 'paragraph',
    text: `Contractual terms are set out in the [Terms and Conditions](${routes.termsAndConditions}). Related pages include the [Privacy Policy](${routes.privacyPolicy}), [Refund Policy](${routes.refundPolicy}), and [Cookie Policy](${routes.cookiePolicy}).`,
  });

  return [
    {
      id: 'independent-service',
      anchor: 'independent-service',
      title: '1. Independent Service',
      blocks: affiliationBlocks,
    },
    {
      id: 'no-guaranteed-social-media-results',
      anchor: 'no-guaranteed-social-media-results',
      title: '2. No Guaranteed Social Media Results',
      blocks: [
        {
          type: 'paragraph',
          text: 'Purchasing a NovaLikes service does not guarantee engagement, reach, sales, followers from other sources, comments from other sources, viral performance, algorithmic placement, monetization, business success, or organic growth.',
        },
        {
          type: 'paragraph',
          text: 'The purchased service is limited to what is described for the selected package on the relevant service page and during checkout.',
        },
      ],
    },
    {
      id: 'social-media-metrics-can-change',
      anchor: 'social-media-metrics-can-change',
      title: '3. Social Media Metrics Can Change',
      blocks: [
        {
          type: 'paragraph',
          text: 'Third-party platforms control their systems and metrics. Counts may change because of platform actions, account removals, content removal, platform updates, or other factors outside NovaLikes’ control.',
        },
        {
          type: 'paragraph',
          text: 'This explanation does not waive any refund or refill obligations that actually apply under the [Refund Policy](/refund-policy) or the terms shown for a specific package.',
        },
      ],
    },
    {
      id: 'third-party-platform-rules',
      anchor: 'third-party-platform-rules',
      title: '4. Third-Party Platform Rules',
      blocks: [
        {
          type: 'paragraph',
          text: 'Customers are responsible for understanding and complying with applicable Instagram, TikTok, and Facebook rules and policies.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} cannot guarantee that a third-party platform will not change or enforce its rules.`,
        },
      ],
    },
    {
      id: 'no-professional-advice',
      anchor: 'no-professional-advice',
      title: '5. No Professional Advice',
      blocks: [
        {
          type: 'paragraph',
          text: 'Website information is general informational material. It is not legal advice, financial advice, business advice, or professional marketing advice.',
        },
      ],
    },
    {
      id: 'website-information',
      anchor: 'website-information',
      title: '6. Website Information',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} aims to keep information useful and current but cannot guarantee that every page will always be error-free or fully up to date.`,
        },
        {
          type: 'paragraph',
          text: 'Prices and package information displayed through the actual ordering system govern purchases where applicable.',
        },
      ],
    },
    {
      id: 'free-tools-disclaimer',
      anchor: 'free-tools-disclaimer',
      title: '7. Free Tools Disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text: 'Free tools depend on publicly available information and third-party platform accessibility.',
        },
        {
          type: 'paragraph',
          text: 'Tools may fail, be temporarily blocked, return limited data, or stop working because platforms change their public pages or restrict automated access.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not guarantee continuous availability of any free tool, and does not claim that Instagram, TikTok, or Facebook downloaders or viewers will always succeed.`,
        },
      ],
    },
    {
      id: 'downloaded-content',
      anchor: 'downloaded-content',
      title: '8. Downloaded Content',
      blocks: [
        {
          type: 'paragraph',
          text: 'For downloader and viewer tools, users are responsible for ensuring they have permission or legal authority to download, store, reproduce, or use third-party content.',
        },
        {
          type: 'paragraph',
          text: `${operatingName} does not grant rights to third-party content and does not encourage copyright infringement.`,
        },
      ],
    },
    {
      id: 'external-links',
      anchor: 'external-links',
      title: '9. External Links',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may link to third-party websites. NovaLikes does not control their content, availability, or privacy practices.`,
        },
      ],
    },
    {
      id: 'limitation',
      anchor: 'limitation',
      title: '10. Limitation',
      blocks: [
        {
          type: 'paragraph',
          text: `To the maximum extent permitted by applicable law, ${operatingName} disclaims liability for reliance on general website information, free-tool results, or third-party platform behavior beyond the contractual terms that apply to a specific order.`,
        },
        {
          type: 'paragraph',
          text: `For binding contractual terms, including warranties and liability limits, see the [Terms and Conditions](${routes.termsAndConditions}).`,
        },
      ],
    },
    {
      id: 'contact',
      anchor: 'contact',
      title: '11. Contact',
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
        'Read important information about NovaLikes services, social media platforms, service results, website information and free tools.',
    },
    breadcrumbLabel: 'Disclaimer',
    header: {
      title: 'Disclaimer',
      intro:
        'This Disclaimer explains important limitations relating to NovaLikes services, website content, free tools, and third-party social media platforms.',
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
    effectiveDateLabel: formatLegalDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatLegalDisplayDate(config.lastUpdatedDate),
  };
}

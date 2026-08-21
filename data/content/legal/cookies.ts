/**
 * Cookie Policy production content — Document 13.07.
 */

import {
  cookieConfig,
  getEnabledCookieAnalyticsProviders,
  getEnabledCookieMarketingTools,
  getEnabledEssentialPurposes,
  getVerifiedCookieContactEmail,
} from '@/config/cookies';
import { routes } from '@/config/routes';
import { formatLegalDisplayDate } from '@/lib/legal/format-date';
import type {
  CookieConfig,
  CookiePolicyContent,
  LegalPolicySection,
} from '@/types/legal';

function buildSections(config: CookieConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const contactEmail = getVerifiedCookieContactEmail(config);
  const essential = getEnabledEssentialPurposes(config);
  const analytics = getEnabledCookieAnalyticsProviders(config);
  const marketing = getEnabledCookieMarketingTools(config);

  const essentialBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'Strictly necessary cookies and similar technologies support core website operation.',
    },
  ];

  if (essential.length > 0) {
    essentialBlocks.push({
      type: 'list',
      items: essential.map((purpose) =>
        purpose.technologyNote
          ? `${purpose.label}: ${purpose.description} ${purpose.technologyNote}`
          : `${purpose.label}: ${purpose.description}`,
      ),
    });
  }

  essentialBlocks.push(
    {
      type: 'subheading',
      id: 'named-first-party-technologies',
      text: 'Named first-party technologies currently used',
    },
    {
      type: 'list',
      items: [
        'iv_cart_v1 — first-party cart cookie used for cart handoff (up to 7 days), together with a sessionStorage cart cache',
        'iv_admin_session — staff administrative session cookie for NovaLikes admin access (not a customer account cookie)',
        'novalikes.analytics.consent.v1 — browser localStorage key used to store analytics consent preferences for possible future analytics scripts',
      ],
    },
  );

  const analyticsBlocks: LegalPolicySection['blocks'] = [];
  if (analytics.length > 0) {
    analyticsBlocks.push({
      type: 'paragraph',
      text: `Analytics technologies currently enabled: ${analytics.map((item) => item.displayName).join(', ')}.`,
    });
  } else {
    analyticsBlocks.push({
      type: 'paragraph',
      text: 'No named analytics cookies or analytics providers are currently enabled in NovaLikes configuration. Optional analytics adapters (such as environment-gated integrations) are not treated as active until they are enabled in deployment with the required identifiers.',
    });
  }

  const marketingBlocks: LegalPolicySection['blocks'] = [];
  if (marketing.length > 0) {
    marketingBlocks.push({
      type: 'paragraph',
      text: `Advertising or marketing technologies currently enabled: ${marketing.map((item) => item.displayName).join(', ')}.`,
    });
  } else {
    marketingBlocks.push({
      type: 'paragraph',
      text: 'No advertising, remarketing, or marketing pixels are currently enabled in NovaLikes configuration.',
    });
  }

  const managingBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'You can control cookies through your browser settings, including blocking or deleting cookies.',
    },
  ];

  if (config.consentManagerEnabled && config.consentManagerHref) {
    managingBlocks.push({
      type: 'paragraph',
      text: `NovaLikes also provides ${config.consentManagerLabel ?? 'cookie preference controls'} at ${config.consentManagerHref}.`,
    });
  } else {
    managingBlocks.push({
      type: 'paragraph',
      text: 'NovaLikes does not currently provide a public cookie-consent banner or preference-center interface. Browser controls remain available for managing cookies.',
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about this Cookie Policy can be sent through the [Contact](${routes.contact}) page.`,
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
    text: `See also the [Privacy Policy](${routes.privacyPolicy}).`,
  });

  return [
    {
      id: 'what-are-cookies',
      anchor: 'what-are-cookies',
      title: '1. What Are Cookies?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cookies are small text files stored on your device when you visit a website. Similar technologies can include local storage, session storage, and comparable browser storage used to remember information needed for the site to work.',
        },
      ],
    },
    {
      id: 'how-novalikes-uses-cookies',
      anchor: 'how-novalikes-uses-cookies',
      title: '2. How NovaLikes Uses Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} uses cookies and similar technologies only for purposes that match current website functionality.`,
        },
        {
          type: 'subheading',
          id: 'strictly-necessary-cookies',
          text: 'Strictly Necessary Cookies',
        },
        ...essentialBlocks,
        {
          type: 'subheading',
          id: 'functional-cookies',
          text: 'Functional Cookies',
        },
        {
          type: 'paragraph',
          text: 'Beyond the essential cart, checkout, session, and security purposes listed above, NovaLikes does not currently maintain a separate inventory of optional functional preference cookies.',
        },
        {
          type: 'subheading',
          id: 'analytics-cookies',
          text: 'Analytics Cookies',
        },
        ...analyticsBlocks,
        {
          type: 'subheading',
          id: 'advertising-marketing-cookies',
          text: 'Advertising / Marketing Cookies',
        },
        ...marketingBlocks,
      ],
    },
    {
      id: 'third-party-cookies',
      anchor: 'third-party-cookies',
      title: '3. Third-Party Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'When you complete Card Payment checkout, you may be redirected to a third-party payment collector. That payment environment may set its own cookies according to the payment provider’s practices. NovaLikes does not control those third-party cookies.',
        },
        {
          type: 'paragraph',
          text: 'No third-party analytics or advertising cookies are currently enabled by NovaLikes configuration.',
        },
      ],
    },
    {
      id: 'cookie-duration',
      anchor: 'cookie-duration',
      title: '4. Cookie Duration',
      blocks: [
        {
          type: 'paragraph',
          text: 'Session technologies generally last only for the browsing session or until the storage is cleared. Persistent cookies can remain for a defined period.',
        },
        {
          type: 'paragraph',
          text: 'The cart cookie iv_cart_v1 is configured with a maximum age of up to 7 days. Exact lifetimes for other technologies can vary by browser settings and operational needs. NovaLikes does not invent additional exact durations beyond what is verified in the application.',
        },
      ],
    },
    {
      id: 'managing-cookies',
      anchor: 'managing-cookies',
      title: '5. Managing Cookies',
      blocks: managingBlocks,
    },
    {
      id: 'effect-of-disabling-cookies',
      anchor: 'effect-of-disabling-cookies',
      title: '6. Effect of Disabling Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Disabling necessary cookies or related storage may affect site functionality, including cart continuity and checkout handoff between shopping and payment flows.',
        },
      ],
    },
    {
      id: 'updates',
      anchor: 'updates',
      title: '7. Updates',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update this Cookie Policy when cookie practices change. The Last Updated date at the top of this page will reflect material revisions.`,
        },
      ],
    },
    {
      id: 'contact',
      anchor: 'contact',
      title: '8. Contact',
      blocks: contactBlocks,
    },
  ];
}

export function getCookiePolicyContent(
  config: CookieConfig = cookieConfig,
): CookiePolicyContent {
  return {
    id: 'cookie-policy',
    path: routes.cookiePolicy,
    seo: {
      title: 'Cookie Policy | NovaLikes',
      description:
        'Learn how NovaLikes uses cookies and similar technologies for website functionality, security, preferences and other applicable purposes.',
    },
    breadcrumbLabel: 'Cookie Policy',
    header: {
      title: 'Cookie Policy',
      intro:
        'This Cookie Policy explains how NovaLikes uses cookies and similar technologies when you visit and use our website.',
    },
    tocTitle: 'On this page',
    sections: buildSections(config),
  };
}

export function getCookiePolicyDates(config: CookieConfig = cookieConfig): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  return {
    effectiveDateLabel: formatLegalDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatLegalDisplayDate(config.lastUpdatedDate),
  };
}

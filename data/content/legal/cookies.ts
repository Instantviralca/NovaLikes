/**
 * Cookie Policy production content — Document 13.07.
 * Body text lives here; React views render sections without hardcoding policy copy.
 * Provider and consent disclosures are conditional on verified configuration.
 */

import {
  cookieConfig,
  getEnabledCookieAnalyticsProviders,
  getEnabledCookieMarketingTools,
  getEnabledEssentialPurposes,
  getVerifiedCookieContactEmail,
} from '@/config/cookies';
import { routes } from '@/config/routes';
import type {
  CookieConfig,
  CookiePolicyContent,
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

function buildSections(config: CookieConfig): LegalPolicySection[] {
  const operatingName = config.operatingName;
  const domainHost = config.websiteDomain.replace(/^https?:\/\//, '');
  const contactEmail = getVerifiedCookieContactEmail(config);
  const essential = getEnabledEssentialPurposes(config);
  const analytics = getEnabledCookieAnalyticsProviders(config);
  const marketing = getEnabledCookieMarketingTools(config);
  const privacyPath = routes.privacyPolicy;
  const contactPath = routes.contact;

  const essentialBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'Essential cookies and similar technologies are required for core NovaLikes functionality. They are not optional when you use cart, checkout, session, or security features.',
    },
  ];

  if (essential.length > 0) {
    essentialBlocks.push({
      type: 'paragraph',
      text: 'Currently configured essential purposes:',
    });
    essentialBlocks.push({
      type: 'list',
      items: essential.map((purpose) => {
        const tech = purpose.technologyNote ? ` ${purpose.technologyNote}` : '';
        return `${purpose.label}: ${purpose.description}${tech}`;
      }),
    });
  } else {
    essentialBlocks.push({
      type: 'paragraph',
      text: 'No essential cookie purposes are currently configured.',
    });
  }

  essentialBlocks.push({
    type: 'paragraph',
    text: 'NovaLikes does not invent named third-party cookie identifiers on this page. A detailed named-cookie inventory will be published only after it is verified.',
  });

  const analyticsBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'Analytics cookies and similar technologies are optional. They are used only when an analytics provider is actually enabled, to help NovaLikes understand page visits, navigation patterns, device categories, conversion events, and website performance.',
    },
  ];

  if (analytics.length > 0) {
    analyticsBlocks.push({
      type: 'paragraph',
      text: `Analytics providers currently enabled: ${analytics.map((provider) => provider.displayName).join(', ')}.`,
    });
  } else {
    analyticsBlocks.push({
      type: 'paragraph',
      text: 'No analytics providers are currently enabled in NovaLikes configuration. NovaLikes does not list Google Analytics, Microsoft Clarity, or other analytics tools unless they are genuinely configured.',
    });
  }

  const marketingBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'Marketing cookies and similar technologies are optional. They are used only when advertising or remarketing tools are actually enabled.',
    },
  ];

  if (marketing.length > 0) {
    marketingBlocks.push({
      type: 'paragraph',
      text: `Marketing technologies currently enabled: ${marketing.map((tool) => tool.displayName).join(', ')}.`,
    });
  } else {
    marketingBlocks.push({
      type: 'paragraph',
      text: 'No marketing pixels or advertising technologies are currently enabled in NovaLikes configuration.',
    });
  }

  const preferenceBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: 'You can manage cookies and similar technologies as follows:',
    },
    {
      type: 'list',
      items: [
        'Essential technologies remain required for core cart, checkout, session, and security functionality',
        'Where a consent manager is available, you may accept cookies, reject non-essential cookies, or update preferences',
        'You may also control cookies through your browser settings, including blocking or deleting cookies',
      ],
    },
  ];

  if (config.consentManagerEnabled && config.consentManagerHref) {
    preferenceBlocks.push({
      type: 'paragraph',
      text: `NovaLikes provides cookie preference controls through ${config.consentManagerLabel ?? 'the cookie preference tool'} available on the website. Use those controls to update non-essential cookie choices.`,
    });
  } else {
    preferenceBlocks.push({
      type: 'paragraph',
      text: 'A dedicated cookie-consent banner or preference manager is not currently configured on NovaLikes.com. Until a consent manager is enabled, NovaLikes keeps this wording generic: use your browser controls to manage optional cookies, and review this Cookie Policy and the Privacy Policy for updates when a preference tool is added.',
    });
  }

  const contactBlocks: LegalPolicySection['blocks'] = [
    {
      type: 'paragraph',
      text: `Questions about NovaLikes’s use of cookies or similar technologies may be submitted using the contact details below. Related privacy practices are described in the Privacy Policy at ${domainHost}${privacyPath}.`,
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
      text: `A verified contact email has not been published in Cookie Policy configuration. Submit questions through the Contact page at ${domainHost}${contactPath}. Do not treat placeholder or example email addresses as official contacts.`,
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
      id: 'what-are-cookies',
      anchor: 'what-are-cookies',
      title: 'What Are Cookies?',
      blocks: [
        {
          type: 'paragraph',
          text: `Cookies are small text files stored on your device when you visit a website. NovaLikes may also use similar technologies, such as browser session storage, local storage, pixels, or scripts, where those technologies are actually enabled.`,
        },
        {
          type: 'paragraph',
          text: `${operatingName} uses these technologies to support website functionality and, only when configured, optional analytics or marketing features. This Cookie Policy explains the categories NovaLikes uses and how you can manage preferences.`,
        },
      ],
    },
    {
      id: 'cookie-categories',
      anchor: 'cookie-categories',
      title: 'Cookie Categories',
      blocks: [
        {
          type: 'paragraph',
          text: 'NovaLikes distinguishes between essential and optional technologies:',
        },
        {
          type: 'list',
          items: [
            'Essential: required for core website and ordering functionality such as cart, checkout, session continuity, and security',
            'Analytics: optional; used only when an analytics provider is enabled',
            'Marketing: optional; used only when advertising or remarketing technologies are enabled',
          ],
        },
        {
          type: 'paragraph',
          text: 'Optional categories are disclosed below only when corresponding providers are enabled in configuration.',
        },
      ],
    },
    {
      id: 'essential-cookies',
      anchor: 'essential-cookies',
      title: 'Essential Cookies',
      blocks: essentialBlocks,
    },
    {
      id: 'analytics-cookies',
      anchor: 'analytics-cookies',
      title: 'Analytics Cookies',
      blocks: analyticsBlocks,
    },
    {
      id: 'marketing-cookies',
      anchor: 'marketing-cookies',
      title: 'Marketing Cookies',
      blocks: marketingBlocks,
    },
    {
      id: 'managing-preferences',
      anchor: 'managing-preferences',
      title: 'Managing Cookie Preferences',
      blocks: preferenceBlocks,
    },
    {
      id: 'third-party-cookies',
      anchor: 'third-party-cookies',
      title: 'Third-Party Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Some cookies or similar technologies may be set by third parties when NovaLikes enables payment, analytics, marketing, or infrastructure providers. Those third parties control their own technologies and privacy practices.',
        },
        {
          type: 'paragraph',
          text:
            analytics.length === 0 && marketing.length === 0
              ? 'No third-party analytics or marketing providers are currently enabled. If NovaLikes later enables such providers, this Cookie Policy will be updated to name only the providers that are actually configured.'
              : `Third-party tools currently enabled for analytics or marketing: ${[
                  ...analytics.map((provider) => provider.displayName),
                  ...marketing.map((tool) => tool.displayName),
                ].join(', ')}. Review each provider’s privacy documentation for details.`,
        },
        {
          type: 'paragraph',
          text: 'Payment providers enabled at checkout may also use their own cookies or similar technologies on their hosted payment flows. NovaLikes does not invent payment-provider cookie inventories on this page.',
        },
      ],
    },
    {
      id: 'changes',
      anchor: 'changes',
      title: 'Changes to This Policy',
      blocks: [
        {
          type: 'paragraph',
          text: `${operatingName} may update this Cookie Policy when cookie practices change, new tools are enabled, legal requirements change, or website features are updated.`,
        },
        {
          type: 'paragraph',
          text: 'The revised policy will display a new Last Updated date when that date is configured for publication.',
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

export function getCookiePolicyContent(
  config: CookieConfig = cookieConfig,
): CookiePolicyContent {
  return {
    id: 'cookie-policy',
    path: routes.cookiePolicy,
    seo: {
      title: 'Cookie Policy | NovaLikes',
      description:
        'Learn how NovaLikes uses cookies, similar technologies, and cookie preferences to support website functionality, analytics, and customer experience.',
    },
    breadcrumbLabel: 'Cookie Policy',
    header: {
      title: 'Cookie Policy',
      intro:
        'This Cookie Policy explains how NovaLikes uses cookies and similar technologies on NovaLikes.com, which categories are essential or optional, and how you can manage preferences. NovaLikes discloses only technologies that are actually configured.',
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
    effectiveDateLabel: formatDisplayDate(config.effectiveDate),
    lastUpdatedLabel: formatDisplayDate(config.lastUpdatedDate),
  };
}

export { cookieConfig };

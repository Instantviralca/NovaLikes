import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { PrivacyPolicyPageView } from '@/components/sections/PrivacyPolicyPageView';
import { routes } from '@/config/routes';
import {
  getPrivacyPolicyContent,
  getPrivacyPolicyDates,
} from '@/data/content/legal/privacy';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { legalMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return legalMetadata('privacyPolicy');
}

/** Privacy Policy page — Document 13.04 (legal template requiring professional review). */
export default function PrivacyPolicyPage() {
  const content = getPrivacyPolicyContent();
  const dates = getPrivacyPolicyDates();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.legal('Privacy Policy'),
      description: descriptions.privacyPolicy(),
      path: routes.privacyPolicy,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: content.breadcrumbLabel, href: routes.privacyPolicy },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="privacy-policy-jsonld" data={graph} />
      <PrivacyPolicyPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
      />
    </>
  );
}

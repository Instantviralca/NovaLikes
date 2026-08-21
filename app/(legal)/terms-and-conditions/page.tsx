import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { TermsAndConditionsPageView } from '@/components/sections/TermsAndConditionsPageView';
import { routes } from '@/config/routes';
import {
  getTermsAndConditionsContent,
  getTermsAndConditionsDates,
} from '@/data/content/legal/terms';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { legalMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return legalMetadata('termsAndConditions');
}

/** Terms & Conditions page — Document 13.05 (legal template requiring professional review). */
export default function TermsAndConditionsPage() {
  const content = getTermsAndConditionsContent();
  const dates = getTermsAndConditionsDates();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.legal('Terms and Conditions'),
      description: descriptions.termsAndConditions(),
      path: routes.termsAndConditions,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: content.breadcrumbLabel, href: routes.termsAndConditions },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="terms-and-conditions-jsonld" data={graph} />
      <TermsAndConditionsPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
      />
    </>
  );
}

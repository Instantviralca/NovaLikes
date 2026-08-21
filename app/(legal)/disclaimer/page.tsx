import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { DisclaimerPageView } from '@/components/sections/DisclaimerPageView';
import { routes } from '@/config/routes';
import {
  getDisclaimerContent,
  getDisclaimerDates,
} from '@/data/content/legal/disclaimer';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { legalMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return legalMetadata('disclaimer');
}

/** Disclaimer page — Document 13.08 (legal template requiring professional review). */
export default function DisclaimerPage() {
  const content = getDisclaimerContent();
  const dates = getDisclaimerDates();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.legal('Disclaimer'),
      description: descriptions.disclaimer(),
      path: routes.disclaimer,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: content.breadcrumbLabel, href: routes.disclaimer },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="disclaimer-jsonld" data={graph} />
      <DisclaimerPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
      />
    </>
  );
}

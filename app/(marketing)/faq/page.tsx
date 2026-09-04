import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { FaqPageView } from '@/components/sections/FaqPageView';
import { routes } from '@/config/routes';
import { getFaqPageContent } from '@/data/content/company';
import { selectMainFaqPageFaqs } from '@/lib/faqs/selection';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { companyMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return companyMetadata('faq');
}

/** FAQ hub — visible FAQ content retained; FAQPage JSON-LD intentionally omitted. */
export default function FaqPage() {
  const content = getFaqPageContent();
  const items = selectMainFaqPageFaqs();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.company('FAQ'),
      description: descriptions.faq(),
      path: routes.faq,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'FAQ', href: routes.faq },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="faq-jsonld" data={graph} />
      <FaqPageView content={content} items={items} />
    </>
  );
}

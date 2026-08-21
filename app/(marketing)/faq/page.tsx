import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { FaqPageView } from '@/components/sections/FaqPageView';
import { routes } from '@/config/routes';
import { getFaqPageContent } from '@/data/content/company';
import { buildFaqPageSchemaFromVisible } from '@/lib/faqs/schema';
import { selectMainFaqPageFaqs } from '@/lib/faqs/selection';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { companyMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return companyMetadata('faq');
}

/** FAQ hub production page — Documents 13.03 + 14.04. */
export default function FaqPage() {
  const content = getFaqPageContent();
  const items = selectMainFaqPageFaqs();

  const graph = asJsonLdGraph([
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'FAQ', href: routes.faq },
    ]),
    buildFaqPageSchemaFromVisible(items),
  ]);

  return (
    <>
      <JsonLdScript id="faq-jsonld" data={graph} />
      <FaqPageView content={content} items={items} />
    </>
  );
}

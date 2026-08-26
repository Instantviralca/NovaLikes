import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { ContactPageView } from '@/components/sections/ContactPageView';
import { routes } from '@/config/routes';
import { getContactContent } from '@/data/content/company';
import { loadQuickAnswer } from '@/lib/i18n/content/load';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { contactPageSchema } from '@/schemas/contact-page';
import { companyMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return companyMetadata('contact');
}

/** Contact Us production page — Document 13.02. */
export default function ContactPage() {
  const content = getContactContent();

  const graph = asJsonLdGraph([
    contactPageSchema({
      title: titles.company('Contact'),
      description: descriptions.contact(),
      path: routes.contact,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Contact', href: routes.contact },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="contact-jsonld" data={graph} />
      <ContactPageView
        content={content}
        quickAnswerHeading={ENGLISH_UI.quickAnswer.heading}
        quickAnswerText={loadQuickAnswer('en', 'contact')}
      />
    </>
  );
}

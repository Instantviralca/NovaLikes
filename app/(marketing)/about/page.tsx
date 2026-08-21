import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { AboutPageView } from '@/components/sections/AboutPageView';
import { routes } from '@/config/routes';
import { getAboutContent } from '@/data/content/company';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { aboutPageSchema } from '@/schemas/website';
import { companyMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return companyMetadata('about');
}

/** About Us production page — Document 13.01. */
export default function AboutPage() {
  const content = getAboutContent();

  const graph = asJsonLdGraph([
    aboutPageSchema({
      title: titles.company('About'),
      description: descriptions.about(),
      path: routes.about,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'About', href: routes.about },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="about-jsonld" data={graph} />
      <AboutPageView content={content} />
    </>
  );
}

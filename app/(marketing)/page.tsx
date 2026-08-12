import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { HomePageView } from '@/components/sections/HomePageView';
import { routes } from '@/config/routes';
import { homepageHub } from '@/data/content/homepage-hub';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { faqPageSchema } from '@/schemas/faq';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { homeMetadata } from '@/seo/metadata';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return homeMetadata();
}

/** Production homepage — multi-platform commercial hub (Phase 1A). */
export default function HomePage() {
  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.home(),
      description: descriptions.home(),
      path: routes.home,
    }),
    // FAQ JSON-LD mirrors visible hub FAQ (not service-page SEO).
    faqPageSchema(
      homepageHub.faq.items.map((item, index) => ({
        id: `homepage-hub-faq-${index + 1}`,
        question: item.question,
        answer: item.answer,
      })),
    ),
  ]);

  return (
    <>
      <JsonLdScript id="homepage-jsonld" data={graph} />
      <HomePageView />
    </>
  );
}

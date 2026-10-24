import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { HomeV5View } from '@/components/marketing/home-v5/home-v5-view';
import { HOME_V5 } from '@/data/content/home-v5';
import { buildFaqPageSchemaFromVisible } from '@/lib/faqs/schema';
import { homeMetadata } from '@/seo/metadata';
import type { PublicFaq } from '@/types/faq';

/** Pricing comes from static package data — keep `/` prerendered for LCP. */
export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return homeMetadata();
}

/** Exact visible homepage FAQ set (same strings as the on-page <details>). */
const HOME_FAQS: PublicFaq[] = HOME_V5.faq.items.map((item, index) => ({
  id: `home-v5-faq-${index + 1}`,
  category: 'general',
  question: item.question,
  answer: item.answer,
  keywords: [],
  serviceSlugs: [],
  pageLocations: ['homepage'],
  relatedLinks: [],
  order: index + 1,
  featured: false,
  schemaEligible: true,
}));

/** Production homepage: Organization + WebSite JSON-LD live in the marketing layout. */
export default function HomePage() {
  preloadHomeDisplayFont();
  const fontVars = `${nlDisplay.variable} ${nlBody.variable}`;
  return (
    <>
      <JsonLdScript id="home-faq-jsonld" data={buildFaqPageSchemaFromVisible(HOME_FAQS)} />
      <HomeV5View fontClassName={fontVars} />
    </>
  );
}

import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { HtmlSitemapView } from '@/components/sections/HtmlSitemapView';
import { routes } from '@/config/routes';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { htmlSitemapMetadata } from '@/seo/metadata';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return htmlSitemapMetadata();
}

export default function HtmlSitemapPage() {
  const title = titles.sitemap();
  const description = descriptions.sitemap();

  const graph = asJsonLdGraph([
    webPageSchema({
      title,
      description,
      path: routes.sitemap,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Sitemap', href: routes.sitemap },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="html-sitemap-jsonld" data={graph} />
      <HtmlSitemapView />
    </>
  );
}

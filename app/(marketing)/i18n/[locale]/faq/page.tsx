import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { FaqPageView } from '@/components/sections/FaqPageView';
import { isLocalizedLocale } from '@/lib/i18n/config';
import {
  loadFaqCategories,
  loadFaqItems,
  loadFaqPageContent,
  loadMetadataBundle,
  loadUi,
} from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return params.then(({ locale }) => {
    if (!isLocalizedLocale(locale)) return {};
    const meta = loadMetadataBundle(locale).faq;
    return buildLocaleMetadata({
      locale,
      pathname: '/faq',
      title: meta.title,
      description: meta.description,
    });
  });
}

export default async function LocalizedFaqPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const content = loadFaqPageContent(locale);
  const items = loadFaqItems(locale);
  const categories = loadFaqCategories(locale);
  const ui = loadUi(locale);
  const faqHref = localizeHref('/faq', locale);
  const homeHref = localizeHref('/', locale);

  const meta = loadMetadataBundle(locale).faq;
  const graph = asJsonLdGraph([
    webPageSchema({
      title: meta.title,
      description: meta.description,
      path: faqHref,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: homeHref },
      { label: ui.breadcrumbs.faq, href: faqHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="faq-jsonld" data={graph} />
      <FaqPageView
        content={content}
        items={items}
        categories={categories}
        homeHref={homeHref}
        homeLabel={ui.breadcrumbs.home}
        faqLabel={ui.breadcrumbs.faq}
        categoriesLabel={ui.faq.categories}
        allLabel={ui.faq.all}
        emptyTitle={ui.faq.noMatchingTitle}
        needMoreHelp={ui.faq.needMoreHelp}
      />
    </>
  );
}

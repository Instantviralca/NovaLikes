import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ContactPageView } from '@/components/sections/ContactPageView';
import { isLocalizedLocale } from '@/lib/i18n/config';
import {
  loadContactPage,
  loadFaqItems,
  loadMetadataBundle,
  loadUi,
} from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { contactPageSchema } from '@/schemas/contact-page';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = loadMetadataBundle(locale).contact;
  return buildLocaleMetadata({
    locale,
    pathname: '/contact',
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const { content, chrome } = loadContactPage(locale);
  const ui = loadUi(locale);
  const meta = loadMetadataBundle(locale).contact;
  const allFaqs = loadFaqItems(locale);
  const faqById = new Map(allFaqs.map((item) => [item.id, item]));
  const faqItems = content.faqPreview.faqIds.flatMap((id) => {
    const item = faqById.get(id);
    return item
      ? [{ id: item.id, question: item.question, answer: item.answer }]
      : [];
  });

  const contactHref = localizeHref('/contact', locale);
  const homeHref = localizeHref('/', locale);

  const graph = asJsonLdGraph([
    contactPageSchema({
      title: meta.title,
      description: meta.description,
      path: contactHref,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: homeHref },
      { label: ui.breadcrumbs.contact, href: contactHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="contact-jsonld" data={graph} />
      <ContactPageView
        content={content}
        chrome={chrome}
        homeLabel={ui.breadcrumbs.home}
        homeHref={homeHref}
        faqItems={faqItems}
      />
    </>
  );
}

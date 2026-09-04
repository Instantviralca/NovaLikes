import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { AboutPageView } from '@/components/sections/AboutPageView';
import { isLocalizedLocale } from '@/lib/i18n/config';
import { loadAboutPage, loadMetadataBundle, loadQuickAnswer, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = loadMetadataBundle(locale).about;
  return buildLocaleMetadata({
    locale,
    pathname: '/about',
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedAboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const { content, chrome } = loadAboutPage(locale);
  const ui = loadUi(locale);
  const meta = loadMetadataBundle(locale).about;
  const aboutHref = localizeHref('/about', locale);
  const homeHref = localizeHref('/', locale);

  const graph = asJsonLdGraph([
    webPageSchema({
      title: meta.title,
      description: meta.description,
      path: aboutHref,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: homeHref },
      { label: ui.breadcrumbs.about, href: aboutHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="about-jsonld" data={graph} />
      <AboutPageView
        content={content}
        chrome={chrome}
        homeLabel={ui.breadcrumbs.home}
        homeHref={homeHref}
        quickAnswerHeading={ui.quickAnswer.heading}
        quickAnswerText={loadQuickAnswer(locale, 'about')}
      />
    </>
  );
}

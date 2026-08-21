import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomePageView } from '@/components/sections/HomePageView';
import { isLocalizedLocale } from '@/lib/i18n/config';
import { loadHomepageHub, loadMetadataBundle, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return params.then(({ locale }) => {
    if (!isLocalizedLocale(locale)) return {};
    const meta = loadMetadataBundle(locale).homepage;
    return buildLocaleMetadata({
      locale,
      pathname: '/',
      title: meta.title,
      description: meta.description,
    });
  });
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const hub = loadHomepageHub(locale);
  const ui = loadUi(locale);

  return <HomePageView hub={hub} stickyCtaLabel={ui.homepage.exploreServices} homepageLabels={ui.homepage} />;
}

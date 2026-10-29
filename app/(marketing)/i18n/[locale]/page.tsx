import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { HomeV5View } from '@/components/marketing/home-v5/home-v5-view';
import { HomePageView } from '@/components/sections/HomePageView';
import { HOME_V5_DE } from '@/data/content/home-v5-de';
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

  if (locale === 'de') {
    preloadHomeDisplayFont();
    const fontVars = `${nlDisplay.variable} ${nlBody.variable}`;
    return <HomeV5View fontClassName={fontVars} content={HOME_V5_DE} locale="de" />;
  }

  const hub = loadHomepageHub(locale);
  const ui = loadUi(locale);

  return <HomePageView hub={hub} stickyCtaLabel={ui.homepage.exploreServices} homepageLabels={ui.homepage} />;
}

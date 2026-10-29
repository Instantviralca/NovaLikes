import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { HomeV5View } from '@/components/marketing/home-v5/home-v5-view';
import { HomePageView } from '@/components/sections/HomePageView';
import { HOME_V5_DE } from '@/data/content/home-v5-de';
import { HOME_V5_ES } from '@/data/content/home-v5-es';
import { HOME_V5_FR } from '@/data/content/home-v5-fr';
import { HOME_V5_IT } from '@/data/content/home-v5-it';
import { HOME_V5_PT_BR } from '@/data/content/home-v5-pt-br';
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

  if (locale === 'de' || locale === 'es' || locale === 'fr' || locale === 'it' || locale === 'pt-br') {
    preloadHomeDisplayFont();
    const fontVars = `${nlDisplay.variable} ${nlBody.variable}`;
    const homeContent =
      locale === 'de'
        ? HOME_V5_DE
        : locale === 'es'
          ? HOME_V5_ES
          : locale === 'fr'
            ? HOME_V5_FR
            : locale === 'it'
              ? HOME_V5_IT
              : HOME_V5_PT_BR;
    return (
      <HomeV5View fontClassName={fontVars} content={homeContent} locale={locale} />
    );
  }

  const hub = loadHomepageHub(locale);
  const ui = loadUi(locale);

  return <HomePageView hub={hub} stickyCtaLabel={ui.homepage.exploreServices} homepageLabels={ui.homepage} />;
}

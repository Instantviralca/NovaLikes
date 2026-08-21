import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import { isLocalizedLocale, type LocalizedLocale } from '@/lib/i18n/config';
import { loadLegalPage, loadMetadataBundle, loadUi } from '@/lib/i18n/content/load';
import {
  getLegalDates,
  legalEnglishPath,
  type LegalOverlayKey,
} from '@/lib/i18n/content/legal-english';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHrefsDeep } from '@/lib/i18n/localize-hrefs';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';

const META_KEY: Record<LegalOverlayKey, 'privacyPolicy' | 'refundPolicy' | 'termsAndConditions' | 'cookiePolicy' | 'disclaimer'> =
  {
    'privacy-policy': 'privacyPolicy',
    'refund-policy': 'refundPolicy',
    'terms-and-conditions': 'termsAndConditions',
    'cookie-policy': 'cookiePolicy',
    disclaimer: 'disclaimer',
  };

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function createLocalizedLegalPage(key: LegalOverlayKey) {
  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocalizedLocale(locale)) return {};
    const meta = loadMetadataBundle(locale)[META_KEY[key]];
    return buildLocaleMetadata({
      locale,
      pathname: legalEnglishPath(key),
      title: meta.title,
      description: meta.description,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale } = await params;
    if (!isLocalizedLocale(locale)) notFound();
    return <LocalizedLegalBody locale={locale} pageKey={key} />;
  }

  return { generateMetadata, Page };
}

function LocalizedLegalBody({
  locale,
  pageKey,
}: {
  locale: LocalizedLocale;
  pageKey: LegalOverlayKey;
}) {
  const content = loadLegalPage(locale, pageKey);
  const dates = getLegalDates(pageKey);
  const ui = loadUi(locale);
  const meta = loadMetadataBundle(locale)[META_KEY[pageKey]];
  const pageHref = localizeHref(legalEnglishPath(pageKey), locale);
  const homeHref = localizeHref('/', locale);
  const contactHref = localizeHref('/contact', locale);
  const questionsBody = localizeHrefsDeep(ui.legalChrome.questionsBody, locale);

  const graph = asJsonLdGraph([
    webPageSchema({
      title: meta.title,
      description: meta.description,
      path: pageHref,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: homeHref },
      { label: content.breadcrumbLabel, href: pageHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id={`${pageKey}-jsonld`} data={graph} />
      <LegalPolicyPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
        contentAriaLabel={content.header.title}
        chrome={{
          homeLabel: ui.breadcrumbs.home,
          homeHref,
          contactHref,
          effectiveDate: ui.legalChrome.effectiveDate,
          lastUpdated: ui.legalChrome.lastUpdated,
          datesPending: ui.legalChrome.datesPending,
          questionsTitle: ui.legalChrome.questionsTitle,
          questionsBody,
          contactSupport: ui.legalChrome.contactSupport,
          contactAria: ui.legalChrome.contactAria,
        }}
      />
    </>
  );
}

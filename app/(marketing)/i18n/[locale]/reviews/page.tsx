import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ReviewsPageView } from '@/components/reviews/ReviewsPageView';
import { isLocalizedLocale } from '@/lib/i18n/config';
import { loadMetadataBundle, loadReviewsPageCopy, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { getSafePublicReviews, summarizePublicReviews } from '@/lib/reviews';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = loadMetadataBundle(locale).reviews;
  return buildLocaleMetadata({
    locale,
    pathname: '/reviews',
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedReviewsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const publicReviews = getSafePublicReviews();
  const aggregate = summarizePublicReviews(publicReviews);
  const copy = loadReviewsPageCopy(locale);
  const ui = loadUi(locale);
  const meta = loadMetadataBundle(locale).reviews;
  const reviewsHref = localizeHref('/reviews', locale);
  const homeHref = localizeHref('/', locale);

  const graph = asJsonLdGraph([
    webPageSchema({
      title: meta.title,
      description: meta.description,
      path: reviewsHref,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: homeHref },
      { label: ui.breadcrumbs.reviews, href: reviewsHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="reviews-jsonld" data={graph} />
      <ReviewsPageView
        reviews={publicReviews}
        aggregate={aggregate}
        copy={copy}
        locale={locale}
        homeLabel={ui.breadcrumbs.home}
        homeHref={homeHref}
        reviewsHref={reviewsHref}
      />
    </>
  );
}

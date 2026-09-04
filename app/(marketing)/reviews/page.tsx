import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { ReviewsPageView } from '@/components/reviews/ReviewsPageView';
import { routes } from '@/config/routes';
import { getEnglishReviewsPageSource } from '@/lib/i18n/content/company-english';
import { getSafePublicReviews, interleaveReviewsByTopic, summarizePublicReviews } from '@/lib/reviews';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { companyMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return companyMetadata('reviews');
}

export default function ReviewsPage() {
  const publicReviews = interleaveReviewsByTopic(getSafePublicReviews());
  const aggregate = summarizePublicReviews(publicReviews);
  const title = titles.company('Reviews');
  const description = descriptions.reviews();

  const graph = asJsonLdGraph([
    webPageSchema({
      title,
      description,
      path: routes.reviews,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Reviews', href: routes.reviews },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="reviews-jsonld" data={graph} />
      <ReviewsPageView
        reviews={publicReviews}
        aggregate={aggregate}
        copy={getEnglishReviewsPageSource()}
      />
    </>
  );
}

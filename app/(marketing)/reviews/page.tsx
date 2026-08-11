import type { Metadata } from 'next';
import Link from 'next/link';

import { JsonLdScript } from '@/components/common/json-ld';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { TestimonialsGrid } from '@/components/reviews/TestimonialsGrid';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { routes } from '@/config/routes';
import { getApprovedReviews, getSafePublicReviews, summarizePublicReviews } from '@/lib/reviews';
import { buildReviewSchemaBundle } from '@/lib/reviews/schema-engine';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { collectionPageSchema } from '@/schemas/website';
import { companyMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return companyMetadata('reviews');
}

export default function ReviewsPage() {
  const publicReviews = getSafePublicReviews();
  const aggregate = summarizePublicReviews(publicReviews);
  const title = titles.company('Reviews');
  const description = descriptions.reviews();

  const reviewBundle = buildReviewSchemaBundle(getApprovedReviews(), {
    entity: {
      kind: 'organization',
      name: 'NovaLikes',
      url: 'https://novalikes.com',
    },
    visibleReviewIds: publicReviews.map((review) => review.id),
    reviewSectionVisible: publicReviews.length > 0,
  });

  const itemList =
    reviewBundle.reviews.length > 0
      ? {
          '@type': 'ItemList',
          name: 'NovaLikes customer reviews',
          numberOfItems: reviewBundle.reviews.length,
          itemListElement: reviewBundle.reviews.map((reviewNode, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: reviewNode,
          })),
        }
      : null;

  const graph = asJsonLdGraph([
    collectionPageSchema({
      title,
      description,
      path: routes.reviews,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Reviews', href: routes.reviews },
    ]),
    ...(itemList ? [itemList] : []),
  ]);

  return (
    <>
      <JsonLdScript id="reviews-jsonld" data={graph} />
      <Section spacing="lg" className="bg-hero-wash" aria-labelledby="reviews-page-heading">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Reviews', href: routes.reviews },
            ]}
          />
          <div className="mt-6 max-w-3xl space-y-3">
            <Heading as="h1" size="h1" id="reviews-page-heading">
              Customer Reviews
            </Heading>
            <MutedText>
              Real customer feedback about NovaLikes social media growth services. All ratings
              below come from our approved review catalogue.
            </MutedText>
            {aggregate ? (
              <p className="text-sm font-medium text-foreground">
                {aggregate.ratingValue.toFixed(1)} out of {aggregate.bestRating} based on{' '}
                {aggregate.reviewCount} customer reviews
              </p>
            ) : null}
            {aggregate ? <ReviewSummary aggregate={aggregate} /> : null}
          </div>

          {publicReviews.length > 0 ? (
            <div className="mt-10">
              <TestimonialsGrid reviews={publicReviews} surface="reviews-page" />
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted-foreground">
              Customer reviews will appear here when approved feedback is available.
            </p>
          )}

          <p className="mt-10 text-sm text-muted-foreground">
            Looking for a service?{' '}
            <Link
              href={routes.home}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Explore NovaLikes services
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}

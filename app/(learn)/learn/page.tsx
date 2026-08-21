import { LearnIndexView } from '@/components/learn';
import { JsonLdScript } from '@/components/common/json-ld';
import { routes } from '@/config/routes';
import { getPublishedLearnArticleRecords } from '@/data/learn';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { absoluteUrl } from '@/seo/canonical';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { itemListSchema } from '@/schemas/web-application';
import { collectionPageSchema } from '@/schemas/website';
import { learnIndexMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { listPublishedCmsPublicArticles } from '@/lib/cms/learn-bridge';

/**
 * Learn Center index — Documents 15.01 + 15.05.
 * Filtered query states keep the clean /learn canonical.
 */
export const revalidate = 60;

export function generateMetadata() {
  return learnIndexMetadata();
}

export default async function LearnIndexPage() {
  const cms = await listPublishedCmsPublicArticles();
  const published = [...getPublishedLearnArticleRecords(), ...cms];
  const graph = asJsonLdGraph([
    collectionPageSchema({
      title: titles.learnIndex(),
      description: descriptions.learnIndex(),
      path: routes.learn,
    }),
    published.length > 0
      ? itemListSchema(
          published.map((article) => ({
            name: article.title,
            url: absoluteUrl(`${routes.learn}/${article.slug}`),
          })),
        )
      : null,
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Learn', href: routes.learn },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="learn-index-jsonld" data={graph} />
      <LearnIndexView />
    </>
  );
}

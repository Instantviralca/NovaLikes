import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { NewsletterCTA } from '@/components/learn/NewsletterCTA';
import {
  CategoryHero,
  CategorySidebar,
  EmptyCategoryState,
} from '@/components/learn/taxonomy';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import {
  getArticlesByCategory,
  getCategoryBreadcrumbs,
  getCategoryRelatedServices,
  getPopularTags,
  getCategories,
} from '@/lib/learn/taxonomy';
import type { PublicLearnCategory } from '@/types/learn';
import type { LearnSearchState } from '@/types/learn-search';

type LearnCategoryViewProps = {
  category: PublicLearnCategory;
  initialState?: LearnSearchState;
};

/**
 * Learn category page — Documents 15.01 + 15.04 + 15.05.
 * One article list plus compact topic links. Unpublished articles never appear.
 */
export function LearnCategoryView({ category }: LearnCategoryViewProps) {
  const breadcrumbs = getCategoryBreadcrumbs(category);
  const articles = getArticlesByCategory(category.id)
    .slice()
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const categories = getCategories();
  const relatedServices = getCategoryRelatedServices(category.slug);
  const popularTags = getPopularTags(6);
  const showFooterLinks = relatedServices.length > 0 || popularTags.length > 0;

  return (
    <div className="overflow-x-hidden">
      <CategoryHero
        category={category}
        breadcrumbs={breadcrumbs}
        categories={categories}
      />

      {articles.length === 0 ? (
        <Section>
          <Container>
            <EmptyCategoryState categoryName={category.name} />
          </Container>
        </Section>
      ) : (
        <FeaturedArticles
          title={`${category.name} guides`}
          description="Newest first."
          articles={articles}
        />
      )}

      {showFooterLinks ? (
        <Section className="border-t border-[#F0E4D8] bg-hero-wash">
          <Container>
            <CategorySidebar
              category={category}
              relatedCategories={[]}
              relatedServices={relatedServices}
              popularTags={popularTags}
            />
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <NewsletterCTA />
        </Container>
      </Section>
    </div>
  );
}

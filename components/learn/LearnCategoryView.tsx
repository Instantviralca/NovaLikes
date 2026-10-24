import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { LearnBlogBar } from '@/components/learn/site-v2/LearnBlogBar';
import { LearnBlogHead } from '@/components/learn/site-v2/LearnBlogHead';
import { LearnGrowBox } from '@/components/learn/site-v2/LearnGrowBox';
import { LearnPlatformBrowse } from '@/components/learn/site-v2/LearnPlatformBrowse';
import { LearnTopics } from '@/components/learn/site-v2/LearnTopics';
import { EmptyCategoryState } from '@/components/learn/taxonomy';
import { CATEGORY_HERO_TITLES } from '@/components/learn/taxonomy/CategoryHero';
import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import {
  getArticlesByCategory,
  getCategoryBreadcrumbs,
  getCategoryRelatedServices,
  getPopularTags,
  getCategories,
} from '@/lib/learn/taxonomy';
import { listPublicLearnCategories } from '@/lib/learn';
import type { PublicLearnCategory } from '@/types/learn';
import type { LearnSearchState } from '@/types/learn-search';

type LearnCategoryViewProps = {
  category: PublicLearnCategory;
  initialState?: LearnSearchState;
};

/**
 * Learn category page — Documents 15.01 + 15.04 + 15.05, site-v2 layout.
 * One article list plus compact topic links. Unpublished articles never appear.
 * `NewsletterCTA` is not rendered (disabled, no working signup); the grow box replaces it.
 */
export function LearnCategoryView({ category }: LearnCategoryViewProps) {
  const breadcrumbs = getCategoryBreadcrumbs(category);
  const articles = getArticlesByCategory(category.id)
    .slice()
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const allCategories = listPublicLearnCategories();
  const tabs = getCategories()
    .filter((item) => item.articleCount > 0)
    .map(({ slug, name, href, articleCount }) => ({ slug, name, href, articleCount }));
  const relatedServices = getCategoryRelatedServices(category.slug);
  const popularTags = getPopularTags(6);
  const count = articles.length;

  return (
    <SiteV2Shell>
      <LearnBlogBar categories={tabs} active={category.slug} searchMode="inline" />

      <section className="wrap">
        <LearnBlogHead
          breadcrumbs={breadcrumbs}
          title={CATEGORY_HERO_TITLES[category.slug] ?? category.name}
          description={category.description}
        />

        {articles.length === 0 ? (
          <div style={{ margin: '40px 0 0' }}>
            <EmptyCategoryState categoryName={category.name} />
          </div>
        ) : (
          <FeaturedArticles
            title={`${category.name} guides`}
            meta={`${count} ${count === 1 ? 'guide' : 'guides'}`}
            articles={articles}
            pageSize={Math.max(articles.length, 1)}
          />
        )}

        <LearnPlatformBrowse categories={allCategories} />

        <LearnTopics tags={popularTags} relatedServices={relatedServices} />
      </section>

      <LearnGrowBox />
    </SiteV2Shell>
  );
}

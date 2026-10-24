import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { LearnBlogBar } from '@/components/learn/site-v2/LearnBlogBar';
import { LearnBlogHead } from '@/components/learn/site-v2/LearnBlogHead';
import { LearnGrowBox } from '@/components/learn/site-v2/LearnGrowBox';
import { LearnTopics } from '@/components/learn/site-v2/LearnTopics';
import { EmptyCategoryState } from '@/components/learn/taxonomy/EmptyCategoryState';
import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { getCategories, getPopularTags } from '@/lib/learn/taxonomy';
import type { PublicLearnArticle, PublicLearnTag } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';

type TagPageViewProps = {
  tag: PublicLearnTag;
  articles: PublicLearnArticle[];
  breadcrumbs: BreadcrumbItem[];
};

/**
 * Tag archive view — Document 15.04. Reuses the category-style site-v2 layout
 * (blog bar + grid + grow box).
 */
export function TagPageView({ tag, articles, breadcrumbs }: TagPageViewProps) {
  const tabs = getCategories()
    .filter((item) => item.articleCount > 0)
    .map(({ slug, name, href, articleCount }) => ({ slug, name, href, articleCount }));
  const popularTags = getPopularTags(6).filter((item) => item.id !== tag.id);

  return (
    <SiteV2Shell>
      <LearnBlogBar categories={tabs} active={null} searchMode="inline" />

      <section className="wrap">
        <LearnBlogHead
          breadcrumbs={breadcrumbs}
          title={tag.name}
          description={tag.description}
        />

        {articles.length === 0 ? (
          <div style={{ margin: '40px 0 0' }}>
            <EmptyCategoryState categoryName={tag.name} />
          </div>
        ) : (
          <FeaturedArticles
            title={`Articles tagged ${tag.name}`}
            meta={`${tag.articleCount} published ${
              tag.articleCount === 1 ? 'article' : 'articles'
            }`}
            articles={articles}
            pageSize={Math.max(articles.length, 1)}
          />
        )}

        <LearnTopics tags={popularTags} />
      </section>

      <LearnGrowBox />
    </SiteV2Shell>
  );
}

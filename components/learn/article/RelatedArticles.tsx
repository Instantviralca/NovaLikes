import { ArticleCard } from '@/components/learn/ArticleCard';
import type { PublicLearnArticle } from '@/types/learn';

type RelatedArticlesProps = {
  title?: string;
  articles: PublicLearnArticle[];
  currentSlug?: string;
};

/**
 * Related guides — Document 15.02, site-v2 `.rel-cards` of `.acard`.
 * Hidden unless at least two published related articles exist.
 */
export function RelatedArticles({
  title = 'Related guides',
  articles,
  currentSlug,
}: RelatedArticlesProps) {
  const items = articles.filter((article) => article.slug !== currentSlug);
  if (items.length < 2) return null;

  return (
    <section aria-labelledby="article-related-articles">
      <h2 id="article-related-articles" className="block-title">
        {title}
      </h2>
      <div className="rel-cards">
        {items.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} variant="v2" />
        ))}
      </div>
    </section>
  );
}

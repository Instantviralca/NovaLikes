import type { ReactNode } from 'react';

import type { ArticleCardArticle } from '@/components/learn/ArticleCard';
import { LearnArticleBrowser } from '@/components/learn/site-v2/LearnArticleCards';
import { toArticleSearchDocument } from '@/lib/learn/search';
import type { PublicLearnArticle } from '@/types/learn';

export const FEATURED_PAGE_SIZE = 6;

type FeaturedArticlesProps = {
  title?: string;
  /** Right-hand meta shown when nothing is searched (e.g. "Newest first"). */
  meta: string;
  /** Every article this view can show, newest first. */
  articles: PublicLearnArticle[];
  /** Cards shown when nothing is searched. Defaults to `articles`. */
  defaultArticles?: PublicLearnArticle[];
  featuredSlot?: ReactNode;
  /**
   * Initial visible count for Load more. Category/tag archives pass the full
   * length so every article href is present in the server HTML (matches service-v1).
   */
  pageSize?: number;
};

export function toCardArticle(article: PublicLearnArticle): ArticleCardArticle {
  return {
    id: article.id,
    href: article.href,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    categoryName: article.categoryName,
    readingTime: article.readingTime,
    featuredImage: article.featuredImage,
    publishedAt: article.publishedAt,
  };
}

/**
 * Site-v2 Learn article grid — Document 15.01.
 * Renders nothing when the published set is empty (no placeholders).
 */
export function FeaturedArticles({
  title = 'Featured guides',
  meta,
  articles,
  defaultArticles,
  featuredSlot,
  pageSize = FEATURED_PAGE_SIZE,
}: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <LearnArticleBrowser
      title={title}
      meta={meta}
      pageSize={pageSize}
      documents={articles.map(toArticleSearchDocument)}
      articles={articles.map(toCardArticle)}
      defaultArticles={(defaultArticles ?? articles).map(toCardArticle)}
      featuredSlot={featuredSlot}
      countLabels={{ one: 'guide', other: 'guides' }}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';

import {
  ArticleCard,
  type ArticleCardArticle,
} from '@/components/learn/ArticleCard';
import { LearnLoadMore } from '@/components/learn/search/LearnLoadMore';

type FeaturedArticlesPagerProps = {
  articles: ArticleCardArticle[];
  pageSize: number;
};

/**
 * Site-v2 article grid (`.cards` of `.acard`) with the existing Load more behaviour.
 */
export function FeaturedArticlesPager({
  articles,
  pageSize,
}: FeaturedArticlesPagerProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount((current) => Math.min(Math.max(current, pageSize), articles.length));
  }, [articles.length, pageSize]);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <div className="cards">
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="v2" />
        ))}
      </div>
      {hasMore ? (
        <LearnLoadMore
          variant="v2"
          onLoadMore={() =>
            setVisibleCount((current) => Math.min(current + pageSize, articles.length))
          }
        />
      ) : null}
    </>
  );
}

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
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <LearnLoadMore
          className="mt-8"
          onLoadMore={() =>
            setVisibleCount((current) => Math.min(current + pageSize, articles.length))
          }
        />
      ) : null}
    </div>
  );
}

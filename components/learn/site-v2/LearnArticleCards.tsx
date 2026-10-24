'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo, type ReactNode } from 'react';

import type { ArticleCardArticle } from '@/components/learn/ArticleCard';
import { FeaturedArticlesPager } from '@/components/learn/FeaturedArticlesPager';
import { LEARN_EMPTY_SEARCH_COPY } from '@/config/learn-search';
import { searchArticles } from '@/lib/learn/search/rank';
import { sanitizeSearchQuery } from '@/lib/learn/search/sanitize';
import type { ArticleSearchDocument } from '@/types/learn-search';

export type LearnArticleBrowserProps = {
  /** Search documents for every article this view can show. */
  documents: ArticleSearchDocument[];
  /** Every card article this view can show (used to resolve search results). */
  articles: ArticleCardArticle[];
  /** Cards shown when no search is active (e.g. index minus the featured article). */
  defaultArticles: ArticleCardArticle[];
  pageSize: number;
  title: string;
  /** Right-hand meta when nothing is searched. */
  meta: string;
  /** Shown only while no search is active (index featured block). */
  featuredSlot?: ReactNode;
  /** Singular / plural labels for the search result count. */
  countLabels: { one: string; other: string };
};

type ViewProps = LearnArticleBrowserProps & {
  /** Sanitized `q` from the URL, or empty. */
  query: string;
  onClearSearch?: () => void;
};

function LearnArticleBrowserView({
  documents,
  articles,
  defaultArticles,
  pageSize,
  title,
  meta,
  featuredSlot,
  countLabels,
  query,
  onClearSearch,
}: ViewProps) {
  const results = useMemo(() => {
    if (!query) return null;
    // Same ranking pipeline as the Learn search (`runLearnSearch` → `searchArticles`).
    const hits = searchArticles(documents, query);
    const byId = new Map(articles.map((article) => [article.id, article]));
    return hits
      .map((hit) => byId.get(hit.id))
      .filter((item): item is ArticleCardArticle => Boolean(item));
  }, [articles, documents, query]);

  const list = results ?? defaultArticles;
  const metaLabel = results
    ? `${results.length} ${results.length === 1 ? countLabels.one : countLabels.other}`
    : meta;

  return (
    <>
      {results ? null : featuredSlot}

      <div className="grid-head" id="all-articles">
        <h2 className="h2">{title}</h2>
        <span className="meta">{metaLabel}</span>
      </div>

      {list.length === 0 ? (
        <section className="glance" data-learn-empty="true">
          <h2>{LEARN_EMPTY_SEARCH_COPY.heading}</h2>
          <p style={{ margin: '0 0 16px' }}>{LEARN_EMPTY_SEARCH_COPY.body}</p>
          {onClearSearch ? (
            <button type="button" className="btn ghost" onClick={onClearSearch}>
              Clear Search
            </button>
          ) : null}
        </section>
      ) : (
        <FeaturedArticlesPager key={query} articles={list} pageSize={pageSize} />
      )}
    </>
  );
}

function LearnArticleBrowserWithParams(props: LearnArticleBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = sanitizeSearchQuery(searchParams.get('q'));

  return (
    <LearnArticleBrowserView
      {...props}
      query={query}
      onClearSearch={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        params.delete('page');
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }}
    />
  );
}

/**
 * Article grid for index / category / tag views.
 * Reads the existing Learn search `q` URL param and ranks with the existing `searchArticles`.
 * The Suspense fallback is the full unfiltered list so the static HTML keeps every card link.
 */
export function LearnArticleBrowser(props: LearnArticleBrowserProps) {
  return (
    <Suspense fallback={<LearnArticleBrowserView {...props} query="" />}>
      <LearnArticleBrowserWithParams {...props} />
    </Suspense>
  );
}

import Link from 'next/link';

import type { PublicLearnArticle } from '@/types/learn';

type RelatedArticlesProps = {
  title?: string;
  articles: PublicLearnArticle[];
  currentSlug?: string;
};

/**
 * Related guides — Document 15.02.
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
    <section aria-labelledby="article-related-articles" className="space-y-4">
      <h2
        id="article-related-articles"
        className="text-xl font-semibold tracking-tight text-[#1C1917]"
      >
        {title}
      </h2>
      <ul className="grid gap-3">
        {items.slice(0, 3).map((article) => (
          <li key={article.id}>
            <Link
              href={article.href}
              className="block rounded-2xl border border-[#F0E4D8] bg-white p-4 outline-none transition-colors hover:border-[#FDBA74] hover:bg-[#FFF8F3] focus-visible:ring-2 focus-visible:ring-[#E85D04]"
            >
              <p className="text-[11px] font-semibold tracking-[0.12em] text-[#E85D04] uppercase">
                {article.categoryName}
              </p>
              <p className="mt-1 font-medium text-[#1C1917]">{article.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#78716C] line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

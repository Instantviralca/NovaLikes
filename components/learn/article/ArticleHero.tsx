import Link from 'next/link';

import { ArticleMeta } from '@/components/learn/article/ArticleMeta';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { learnCategoryPath } from '@/config/routes';
import { getLearnArticleBreadcrumbs } from '@/lib/learn';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleHeroProps = {
  article: PublicLearnArticle;
};

/**
 * Article hero — Document 15.02.
 * Single H1 from article data.
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const breadcrumbs = getLearnArticleBreadcrumbs(article.slug);

  return (
    <header className="space-y-5">
      <Breadcrumb items={breadcrumbs} className="mb-0" />

      <div className="flex flex-wrap items-center gap-2">
        <Eyebrow className="px-3 py-1">
          <Link
            href={learnCategoryPath(article.category)}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2"
          >
            {article.categoryName}
          </Link>
        </Eyebrow>
        {article.featured ? (
          <span className="inline-flex items-center rounded-full border border-[#F0E4D8] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Featured
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <Heading as="h1" className="text-balance break-words">
          {article.title}
        </Heading>
        <p className="max-w-[42rem] text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
          {article.excerpt}
        </p>
      </div>

      <ArticleMeta article={article} />
    </header>
  );
}

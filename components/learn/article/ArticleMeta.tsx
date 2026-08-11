import Link from 'next/link';

import { TagList } from '@/components/learn/taxonomy/TagList';
import { learnCategoryPath } from '@/config/routes';
import { getAuthorById } from '@/lib/authors';
import { getPublicTagsForSlugs } from '@/lib/learn/taxonomy';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleMetaProps = {
  article: PublicLearnArticle;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Article metadata — Documents 15.02 + 15.03 + 15.04.
 * Category and tag links come from shared registries (no hardcoded paths).
 */
export function ArticleMeta({ article }: ArticleMetaProps) {
  const author = getAuthorById(article.authorId);
  const tags = getPublicTagsForSlugs(article.tags);
  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel =
    article.showModifiedDate && article.updatedAt !== article.publishedAt
      ? formatDate(article.updatedAt)
      : null;

  return (
    <div className="flex flex-col gap-2 text-sm text-neutral-600">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>
          {author ? (
            <>
              By{' '}
              <Link
                href={author.profilePath}
                className="font-medium text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {author.name}
              </Link>
            </>
          ) : (
            <span className="text-neutral-500">Author information unavailable</span>
          )}
        </span>
        {publishedLabel ? (
          <span>
            Published{' '}
            <time dateTime={article.publishedAt}>{publishedLabel}</time>
          </span>
        ) : null}
        {updatedLabel ? (
          <span>
            Updated{' '}
            <time dateTime={article.updatedAt}>{updatedLabel}</time>
          </span>
        ) : null}
        <span>{article.readingTime} min read</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={learnCategoryPath(article.category)}
          className="rounded-sm text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          {article.categoryName}
        </Link>
        <TagList tags={tags} label="Article tags" />
      </div>
    </div>
  );
}

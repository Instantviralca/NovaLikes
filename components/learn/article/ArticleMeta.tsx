import Link from 'next/link';

import { ArticleShare } from '@/components/learn/article/ArticleShare';
import { getAuthorById } from '@/lib/authors';
import { absoluteUrl } from '@/seo/canonical';
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

function MetaDot() {
  return (
    <span className="hidden text-neutral-300 sm:inline" aria-hidden>
      ·
    </span>
  );
}

/**
 * Article metadata — Documents 15.02 + 15.03 + 15.04.
 * Author, dates, reading time, and share actions.
 */
export function ArticleMeta({ article }: ArticleMetaProps) {
  const registryAuthor = getAuthorById(article.authorId);
  const author = registryAuthor ?? article.author;
  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel =
    article.showModifiedDate && article.updatedAt !== article.publishedAt
      ? formatDate(article.updatedAt)
      : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-neutral-500">
        <span>
          {registryAuthor ? (
            <>
              By{' '}
              <Link
                href={registryAuthor.profilePath}
                className="font-semibold text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {registryAuthor.name}
              </Link>
            </>
          ) : author ? (
            <>
              By <span className="font-semibold text-neutral-900">{author.name}</span>
            </>
          ) : (
            <span>Author information unavailable</span>
          )}
        </span>
        {publishedLabel ? (
          <>
            <MetaDot />
            <span>
              Published{' '}
              <time dateTime={article.publishedAt}>{publishedLabel}</time>
            </span>
          </>
        ) : null}
        {updatedLabel ? (
          <>
            <MetaDot />
            <span>
              Updated{' '}
              <time dateTime={article.updatedAt}>{updatedLabel}</time>
            </span>
          </>
        ) : null}
        <MetaDot />
        <span>{article.readingTime} min read</span>
      </div>
      <div className="border-t border-[#F0E4D8] pt-4">
        <ArticleShare url={absoluteUrl(article.href)} title={article.title} />
      </div>
    </div>
  );
}

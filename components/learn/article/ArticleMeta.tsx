import Link from 'next/link';

import { ArticleShare } from '@/components/learn/article/ArticleShare';
import {
  formatLearnDate,
  formatLearnMinRead,
} from '@/components/learn/site-v2/learn-format';
import { learnCategoryPath } from '@/config/routes';
import { getAuthorById } from '@/lib/authors';
import { absoluteUrl } from '@/seo/canonical';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleMetaProps = {
  article: PublicLearnArticle;
};

function Dot() {
  return (
    <span className="dot" aria-hidden="true">
      ·
    </span>
  );
}

/**
 * Article byline — Documents 15.02 + 15.03 + 15.04, site-v2 `.byline`.
 * Avatar initial, author, dates · min read · category, and share actions.
 */
export function ArticleMeta({ article }: ArticleMetaProps) {
  const registryAuthor = getAuthorById(article.authorId);
  const author = registryAuthor ?? article.author;
  const publishedLabel = formatLearnDate(article.publishedAt);
  const updatedLabel =
    article.showModifiedDate && article.updatedAt !== article.publishedAt
      ? formatLearnDate(article.updatedAt)
      : null;
  const initial = author?.name.trim().slice(0, 1).toUpperCase() || '?';

  return (
    <div className="byline">
      <div className="author">
        {author ? (
          <span className="avatar" aria-hidden="true">
            {initial}
          </span>
        ) : null}
        <span>
          <b>
            {registryAuthor ? (
              <>
                By <Link href={registryAuthor.profilePath}>{registryAuthor.name}</Link>
              </>
            ) : author ? (
              <>By {author.name}</>
            ) : (
              <>Author information unavailable</>
            )}
          </b>
          <span className="meta">
            {publishedLabel ? (
              <span>
                Published <time dateTime={article.publishedAt}>{publishedLabel}</time>
              </span>
            ) : null}
            {updatedLabel ? (
              <>
                <Dot />
                <span>
                  Updated <time dateTime={article.updatedAt}>{updatedLabel}</time>
                </span>
              </>
            ) : null}
            {publishedLabel || updatedLabel ? <Dot /> : null}
            <span>{formatLearnMinRead(article.readingTime)}</span>
            <Dot />
            <Link className="cat-chip" href={learnCategoryPath(article.category)}>
              {article.categoryName}
            </Link>
          </span>
        </span>
      </div>
      <ArticleShare url={absoluteUrl(article.href)} title={article.title} />
    </div>
  );
}

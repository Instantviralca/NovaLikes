import Link from 'next/link';

import { ArticleCardImage } from '@/components/learn/ArticleCardImage';
import {
  formatLearnDate,
  formatLearnMinRead,
} from '@/components/learn/site-v2/learn-format';
import { cn } from '@/lib/utils';
import type { PublicLearnArticle } from '@/types/learn';

export type ArticleCardArticle = Pick<
  PublicLearnArticle,
  | 'id'
  | 'href'
  | 'title'
  | 'excerpt'
  | 'category'
  | 'categoryName'
  | 'readingTime'
  | 'featuredImage'
> &
  Partial<Pick<PublicLearnArticle, 'publishedAt'>>;

type ArticleCardProps = {
  article: ArticleCardArticle;
  className?: string;
  /**
   * `v2` renders the site-v2 `.acard` (must sit inside `SiteV2Shell`).
   * Default keeps the legacy card used outside the site-v2 surfaces (e.g. author pages).
   */
  variant?: 'default' | 'v2';
};

const V2_CARD_IMAGE_SIZES =
  '(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px';

/**
 * Learn article card — Document 15.01.
 * Keyboard-focusable link wrapping semantic article summary.
 */
export function ArticleCard({
  article,
  className,
  variant = 'default',
}: ArticleCardProps) {
  const image = article.featuredImage;

  if (variant === 'v2') {
    const date = formatLearnDate(article.publishedAt);
    return (
      <Link href={article.href} className={cn('acard rv-up', className)}>
        <div className="ai">
          {image ? (
            <ArticleCardImage
              image={image}
              category={article.category}
              sizes={V2_CARD_IMAGE_SIZES}
            />
          ) : null}
        </div>
        {/* div (not p): `.acard p` line-clamps and would collapse the flex gap between meta items. */}
        <div className="meta" style={{ marginTop: 8 }}>
          <span className="cat-chip">{article.categoryName}</span>
          {date ? (
            <>
              <span className="dot" aria-hidden="true">
                ·
              </span>
              <span>{date}</span>
            </>
          ) : null}
          <span className="dot" aria-hidden="true">
            ·
          </span>
          <span>{formatLearnMinRead(article.readingTime)}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--nl-border)] bg-white shadow-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-[var(--nl-bg-soft)]">
        {image ? (
          <ArticleCardImage image={image} category={article.category} />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--nl-orange)]">
          {article.categoryName}
        </p>
        <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug text-[var(--nl-ink)]">
          <Link
            href={article.href}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-[color:rgb(249_115_22_/_0.4)] focus-visible:ring-offset-2"
          >
            <span className="group-hover:underline">{article.title}</span>
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--nl-body)]">
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs font-medium text-[var(--nl-muted)]">
          {article.readingTime} min read
        </p>
      </div>
    </article>
  );
}

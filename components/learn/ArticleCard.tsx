import Link from 'next/link';

import { ArticleCardImage } from '@/components/learn/ArticleCardImage';
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
>;

type ArticleCardProps = {
  article: ArticleCardArticle;
  className?: string;
};

/**
 * Learn article card — Document 15.01.
 * Keyboard-focusable link wrapping semantic article summary.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  const image = article.featuredImage;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5',
        className,
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#FFF8F3]">
        {image ? (
          <ArticleCardImage image={image} category={article.category} />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E85D04]">
          {article.categoryName}
        </p>
        <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug text-neutral-900">
          <Link
            href={article.href}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            <span className="group-hover:underline">{article.title}</span>
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs font-medium text-neutral-500">
          {article.readingTime} min read
        </p>
      </div>
    </article>
  );
}

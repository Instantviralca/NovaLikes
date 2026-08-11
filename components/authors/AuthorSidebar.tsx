import Link from 'next/link';

import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { learnCategoryPath } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { PublicAuthor } from '@/types/author';
import type { LearnCategory } from '@/types/learn';

type AuthorSidebarProps = {
  author: PublicAuthor;
  relatedCategories: LearnCategory[];
  className?: string;
};

/**
 * Author sidebar — Document 15.03.
 * Category links derived from published articles (no hardcoded paths).
 */
export function AuthorSidebar({
  author,
  relatedCategories,
  className,
}: AuthorSidebarProps) {
  return (
    <aside
      className={cn('flex flex-col gap-8', className)}
      aria-label="Author details"
    >
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Profile
        </h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="text-neutral-500">Role</dt>
            <dd className="font-medium text-neutral-900">{author.role}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Joined</dt>
            <dd className="font-medium text-neutral-900">
              <time dateTime={author.joinedAt}>
                {new Intl.DateTimeFormat('en', {
                  year: 'numeric',
                  month: 'long',
                }).format(new Date(author.joinedAt))}
              </time>
            </dd>
          </div>
          <div>
            <dt className="text-neutral-500">Articles</dt>
            <dd className="font-medium text-neutral-900">{author.articleCount}</dd>
          </div>
        </dl>
      </div>

      {author.expertise.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Expertise
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-neutral-700">
            {author.expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Connect
        </h2>
        <AuthorSocialLinks
          links={author.socialLinks}
          website={author.website}
          className="mt-3"
        />
        {!author.website &&
        (!author.socialLinks ||
          Object.values(author.socialLinks).every((v) => !v)) ? (
          <p className="mt-2 text-sm text-neutral-500">No public links configured.</p>
        ) : null}
      </div>

      {relatedCategories.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Related categories
          </h2>
          <ul className="mt-3 space-y-2">
            {relatedCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={learnCategoryPath(category.slug)}
                  className="text-sm font-medium text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

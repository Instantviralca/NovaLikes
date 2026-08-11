import Link from 'next/link';

import { AuthorAvatar } from '@/components/authors/AuthorAvatar';
import { AuthorBio } from '@/components/authors/AuthorBio';
import { getAuthorById } from '@/lib/authors';

type AuthorBoxProps = {
  authorId: string;
};

/**
 * Article author box — Documents 15.02 + 15.03.
 * Reads from the Author System only. Never invents credentials.
 */
export function AuthorBox({ authorId }: AuthorBoxProps) {
  const author = getAuthorById(authorId);

  if (!author) {
    return (
      <aside
        className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-600"
        data-author-missing="true"
      >
        Author profile is not available yet. NovaLikes does not invent author
        names, roles, or credentials.
      </aside>
    );
  }

  return (
    <aside className="flex gap-4 border border-neutral-200 p-4" aria-label="About the author">
      <AuthorAvatar author={author} size="md" />
      <div className="min-w-0">
        <p className="font-semibold text-neutral-900">
          <Link
            href={author.profilePath}
            className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            {author.name}
          </Link>
        </p>
        <p className="text-sm text-neutral-600">{author.role}</p>
        <AuthorBio author={author} className="mt-2 text-sm" />
      </div>
    </aside>
  );
}

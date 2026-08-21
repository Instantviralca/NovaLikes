import Link from 'next/link';

import { AuthorAvatar } from '@/components/authors/AuthorAvatar';
import { AuthorBio } from '@/components/authors/AuthorBio';
import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { getAuthorById } from '@/lib/authors';
import type { PublicAuthor } from '@/types/author';

type AuthorBoxProps = {
  authorId: string;
  author?: PublicAuthor;
};

/**
 * Article author box — Documents 15.02 + 15.03.
 * Reads from the Author System only. Never invents credentials.
 * CMS authors may pass a safe overlay without creating fake public profiles.
 */
export function AuthorBox({ authorId, author: authorProp }: AuthorBoxProps) {
  const registryAuthor = getAuthorById(authorId);
  const author = authorProp ?? registryAuthor;

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

  const name = registryAuthor ? (
    <Link
      href={author.profilePath}
      className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      {author.name}
    </Link>
  ) : (
    author.name
  );

  return (
    <aside
      className="relative overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-[0_18px_50px_-28px_rgba(80,40,120,0.45)] ring-1 ring-black/[0.04] sm:p-7"
      aria-label="About the author"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div
            className="absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.45),transparent_70%)]"
            aria-hidden
          />
          <div className="relative rounded-full bg-[linear-gradient(135deg,#c084fc_0%,#e879f9_42%,#fb7185_100%)] p-[3px] shadow-[0_10px_24px_-8px_rgba(168,85,247,0.7)]">
            <AuthorAvatar
              author={author}
              size="lg"
              className="border-[3px] border-white"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C3AED]">
              Written by
            </p>
            <AuthorSocialLinks
              links={author.socialLinks}
              website={author.website}
              variant="icons"
              className="sm:pt-0"
            />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[1.7rem]">
            {name}
          </p>
          <p className="mt-1 text-sm font-medium text-[#7C3AED] sm:text-base">
            {author.role}
          </p>
          <AuthorBio
            author={author}
            className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-[0.95rem]"
          />
        </div>
      </div>
    </aside>
  );
}

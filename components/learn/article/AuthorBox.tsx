import Image from 'next/image';
import Link from 'next/link';

import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { getAuthorById } from '@/lib/authors';
import type { PublicAuthor } from '@/types/author';

type AuthorBoxProps = {
  authorId: string;
  author?: PublicAuthor;
};

/**
 * Article author box — Documents 15.02 + 15.03, site-v2 `.author-box`.
 * Reads from the Author System only. Never invents credentials.
 * CMS authors may pass a safe overlay without creating fake public profiles.
 */
export function AuthorBox({ authorId, author: authorProp }: AuthorBoxProps) {
  const registryAuthor = getAuthorById(authorId);
  const author = authorProp ?? registryAuthor;

  if (!author) {
    return (
      <aside className="author-box" data-author-missing="true">
        <div>
          <p className="bio" style={{ margin: 0 }}>
            Author profile is not available yet. NovaLikes does not invent author
            names, roles, or credentials.
          </p>
        </div>
      </aside>
    );
  }

  const initial = author.name.trim().slice(0, 1).toUpperCase() || '?';
  const name = registryAuthor ? (
    <Link href={author.profilePath}>{author.name}</Link>
  ) : (
    author.name
  );

  return (
    <aside className="author-box" aria-label="About the author">
      {author.avatar ? (
        <span className="avatar" style={{ overflow: 'hidden', padding: 0 }}>
          <Image
            src={author.avatar}
            alt={`Portrait of ${author.name}`}
            width={64}
            height={64}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </span>
      ) : (
        <span className="avatar" aria-hidden="true">
          {initial}
        </span>
      )}
      <div>
        <p className="ab-k">Written by</p>
        <p className="ab-name">{name}</p>
        <p className="role">{author.role}</p>
        {author.bio.trim() ? (
          <p className="bio" data-author-bio>
            {author.bio}
          </p>
        ) : null}
        <AuthorSocialLinks
          links={author.socialLinks}
          website={author.website}
          variant="icons"
          className="mt-3"
        />
      </div>
    </aside>
  );
}

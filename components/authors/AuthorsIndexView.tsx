import { AuthorCard } from '@/components/authors/AuthorCard';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicAuthor } from '@/types/author';

type AuthorsIndexViewProps = {
  authors: PublicAuthor[];
};

/**
 * Authors index — Document 15.03.
 * Empty state when no active authors are registered (no fake profiles).
 */
export function AuthorsIndexView({ authors }: AuthorsIndexViewProps) {
  return (
    <Section>
      <Container>
        <div className="mb-10 max-w-2xl">
          <Heading as="h1">Authors</Heading>
          <MutedText className="mt-3">
            NovaLikes Learn contributors. Profiles appear here when authors are
            published in the shared Author registry.
          </MutedText>
        </div>

        {authors.length === 0 ? (
          <p
            className="border border-dashed border-neutral-300 p-6 text-sm text-neutral-600"
            data-authors-empty="true"
          >
            No author profiles are published yet. NovaLikes does not invent
            author names, roles, or credentials.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {authors.map((author) => (
              <li key={author.id}>
                <AuthorCard author={author} showSocial />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

import { FeaturedArticlesPager } from '@/components/learn/FeaturedArticlesPager';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicLearnArticle } from '@/types/learn';

export const FEATURED_PAGE_SIZE = 6;

type FeaturedArticlesProps = {
  title?: string;
  description?: string;
  articles: PublicLearnArticle[];
};

function toCardArticle(article: PublicLearnArticle) {
  return {
    id: article.id,
    href: article.href,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    categoryName: article.categoryName,
    readingTime: article.readingTime,
    featuredImage: article.featuredImage,
  };
}

function sectionAnchorId(title: string) {
  return `featured-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;
}

/**
 * Featured Learn articles grid — Document 15.01.
 * Renders nothing when the published set is empty (no placeholders).
 */
export function FeaturedArticles({
  title = 'Featured guides',
  description = 'Editor-selected Learn articles.',
  articles,
}: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  const headingId = sectionAnchorId(title);

  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl scroll-mt-24" id={headingId}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
            Library
          </p>
          <Heading as="h2" className="mt-2">
            {title}
          </Heading>
          <MutedText className="mt-2">{description}</MutedText>
        </div>
        <FeaturedArticlesPager
          articles={articles.map(toCardArticle)}
          pageSize={FEATURED_PAGE_SIZE}
        />
      </Container>
    </Section>
  );
}

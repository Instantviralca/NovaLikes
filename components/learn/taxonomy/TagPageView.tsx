import { LearnHero } from '@/components/learn/LearnHero';
import { ArticleCard } from '@/components/learn/ArticleCard';
import { EmptyCategoryState } from '@/components/learn/taxonomy/EmptyCategoryState';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicLearnArticle, PublicLearnTag } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';

type TagPageViewProps = {
  tag: PublicLearnTag;
  articles: PublicLearnArticle[];
  breadcrumbs: BreadcrumbItem[];
};

/**
 * Tag archive view — Document 15.04 (architecture prepared for V1).
 */
export function TagPageView({ tag, articles, breadcrumbs }: TagPageViewProps) {
  return (
    <div className="overflow-x-hidden">
      <LearnHero
        eyebrow="NOVALIKES LEARN"
        title={tag.name}
        description={tag.description}
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <Heading as="h2">Articles tagged {tag.name}</Heading>
          {articles.length === 0 ? (
            <div className="mt-4">
              <EmptyCategoryState categoryName={tag.name} />
            </div>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
          <MutedText className="mt-6 text-xs">
            {tag.articleCount} published{' '}
            {tag.articleCount === 1 ? 'article' : 'articles'}
          </MutedText>
        </Container>
      </Section>
    </div>
  );
}

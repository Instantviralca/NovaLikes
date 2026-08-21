import { CategoryCard } from '@/components/learn/taxonomy/CategoryCard';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicLearnCategory } from '@/types/learn';

type CategoryGridProps = {
  title?: string;
  description?: string;
  categories: PublicLearnCategory[];
};

/**
 * Category navigation grid — Documents 15.01 + 15.04.
 */
export function CategoryGrid({
  title = 'Browse by category',
  description = 'Explore NovaLikes Learn topics.',
  categories,
}: CategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
            Topics
          </p>
          <Heading as="h2" className="mt-2">
            {title}
          </Heading>
          <MutedText className="mt-2">{description}</MutedText>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

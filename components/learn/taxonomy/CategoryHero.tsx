import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { cn } from '@/lib/utils';
import type { PublicLearnCategory } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';

type CategoryHeroProps = {
  category: PublicLearnCategory;
  breadcrumbs?: BreadcrumbItem[];
  categories?: PublicLearnCategory[];
};

const CATEGORY_HERO_TITLES: Record<string, string> = {
  instagram: 'Instagram Guides',
  tiktok: 'TikTok Guides',
  facebook: 'Facebook Guides',
  'social-media-marketing': 'Social Media Marketing Guides',
  guides: 'Social Media Guides',
};

/**
 * Category page hero — Document 15.04.
 */
export function CategoryHero({
  category,
  breadcrumbs,
  categories = [],
}: CategoryHeroProps) {
  return (
    <Section className="overflow-x-hidden border-b border-[#F0E4D8] bg-hero-wash">
      <Container>
        <div className="max-w-3xl space-y-4 py-10 md:py-14">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumb items={breadcrumbs} className="mb-0" />
          ) : null}
          <Eyebrow>NOVALIKES LEARN</Eyebrow>
          <Heading as="h1" className={HERO_HEADING_CLASS}>
            {accentLastWord(CATEGORY_HERO_TITLES[category.slug] ?? category.name)}
          </Heading>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
            {category.description}
          </p>
          <p className="text-[13px] text-neutral-500">
            {category.articleCount}{' '}
            {category.articleCount === 1 ? 'guide' : 'guides'}
          </p>
          {categories.length > 1 ? (
            <nav aria-label="Learn categories" className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((item) => {
                const current = item.id === category.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2',
                      current
                        ? 'bg-[#E85D04] text-white'
                        : 'border border-[#E8DDD3] bg-white text-neutral-700 hover:border-[#F0C7A8] hover:bg-[#FFF8F3]',
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

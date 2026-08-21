import Image from 'next/image';
import Link from 'next/link';

import { ArticleCardImage } from '@/components/learn/ArticleCardImage';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import type { PublicLearnArticle } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';

type LearnIndexHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  articleCount: number;
  categoryCount: number;
  featured?: PublicLearnArticle;
};

function formatGuideDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Learn index hero — editorial hub with the latest published guide.
 */
export function LearnIndexHero({
  breadcrumbs,
  articleCount,
  categoryCount,
  featured,
}: LearnIndexHeroProps) {
  const dateLabel = featured
    ? formatGuideDate(
        featured.showModifiedDate ? featured.updatedAt : featured.publishedAt,
      )
    : null;

  return (
    <Section className="overflow-x-hidden border-b border-[#F0E4D8] bg-hero-wash">
      <Container className="py-10 md:py-14">
        <FadeUp immediate className="max-w-3xl space-y-4">
          {breadcrumbs.length > 0 ? (
            <Breadcrumb items={breadcrumbs} className="mb-0" />
          ) : null}
          <Eyebrow>Learn Center</Eyebrow>
          <Heading as="h1" className={HERO_HEADING_CLASS}>
            {accentLastWord('Practical social growth guides')}
          </Heading>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
            Clear Instagram, TikTok, and Facebook explainers — how platforms
            actually work, without hype.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[13px] text-neutral-500">
            <span className="rounded-full border border-[#F0E4D8] bg-white px-3 py-1 font-medium text-neutral-700">
              {articleCount} {articleCount === 1 ? 'guide' : 'guides'}
            </span>
            <span className="rounded-full border border-[#F0E4D8] bg-white px-3 py-1 font-medium text-neutral-700">
              {categoryCount} {categoryCount === 1 ? 'topic' : 'topics'}
            </span>
            <Button asChild variant="outline" className="h-8 rounded-full px-3 text-xs">
              <Link href="#all-articles">Browse all guides</Link>
            </Button>
          </div>
        </FadeUp>

        {featured ? (
          <FadeUp delay={0.06} className="mt-8 md:mt-10">
            <article className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_22px_50px_-28px_rgba(50,30,20,0.4)] ring-1 ring-black/[0.04] lg:grid lg:grid-cols-[1.15fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF8F3] lg:aspect-auto lg:min-h-[22rem]">
                {featured.featuredImage ? (
                  <ArticleCardImage
                    image={featured.featuredImage}
                    category={featured.category}
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="flex h-full min-h-[16rem] items-center justify-center bg-[#FFF8F3]">
                    <Image
                      src="/assets/logos/logo.svg"
                      alt=""
                      width={72}
                      height={72}
                      className="opacity-80"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
                  Latest · {featured.categoryName}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[1.85rem]">
                  <Link
                    href={featured.href}
                    className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2"
                  >
                    <span className="group-hover:underline">{featured.title}</span>
                  </Link>
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {featured.excerpt}
                </p>
                <p className="mt-4 text-[13px] text-neutral-500">
                  {[dateLabel, `${featured.readingTime} min read`]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <p className="mt-5 text-sm font-semibold text-[#E85D04]">
                  Read guide →
                </p>
              </div>
            </article>
          </FadeUp>
        ) : null}
      </Container>
    </Section>
  );
}

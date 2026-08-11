import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { learnArticlePath, routes } from '@/config/routes';
import { getLatestPublicArticles } from '@/lib/learn/contextual-links';
import { cn } from '@/lib/utils';
import type { PublicLearnArticle } from '@/types/learn';

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

function excerptWords(text: string, maxWords = 22) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(' ')}…`;
}

function ctaLabel(article: PublicLearnArticle): string {
  switch (article.category) {
    case 'instagram':
      return 'Read Instagram guide';
    case 'tiktok':
      return 'Read TikTok guide';
    case 'facebook':
      return 'Read Facebook guide';
    case 'youtube':
      return 'Read YouTube guide';
    case 'guides':
      return 'Read guide';
    default:
      return 'Read article';
  }
}

function ArticleMeta({ article }: { article: PublicLearnArticle }) {
  const dateLabel = formatGuideDate(
    article.showModifiedDate ? article.updatedAt : article.publishedAt,
  );
  return (
    <p className="text-xs text-[var(--text-muted)]">
      {[dateLabel, `${article.readingTime} min read`].filter(Boolean).join(' · ')}
    </p>
  );
}

function FeaturedArticleCard({ article }: { article: PublicLearnArticle }) {
  const href = learnArticlePath(article.slug);
  const excerpt = excerptWords(article.excerpt, 36);
  const image = article.featuredImage;

  return (
    <FadeUp className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)] lg:flex-row">
        <div className="relative aspect-[16/10] max-h-[14rem] overflow-hidden bg-[var(--surface-muted)] lg:aspect-auto lg:max-h-none lg:w-[48%]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">
          <p className="text-[11px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
            Featured · {article.categoryName}
          </p>
          <h3 className="mt-2 text-xl font-bold leading-snug text-[var(--text-primary)] sm:text-2xl">
            {article.title}
          </h3>
          {excerpt ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {excerpt}
            </p>
          ) : null}
          <div className="mt-3">
            <ArticleMeta article={article} />
          </div>
          <Button asChild className="mt-4 min-h-11 w-full rounded-xl sm:w-auto" variant="outline">
            <Link href={href} aria-label={`Read ${article.title}`}>
              {ctaLabel(article)}
            </Link>
          </Button>
        </div>
      </article>
    </FadeUp>
  );
}

function CompactArticleCard({
  article,
  delay = 0,
}: {
  article: PublicLearnArticle;
  delay?: number;
}) {
  const href = learnArticlePath(article.slug);
  const excerpt = excerptWords(article.excerpt, 14);
  const image = article.featuredImage;

  return (
    <FadeUp delay={delay} className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]">
        <div className="relative aspect-video max-h-[8.5rem] overflow-hidden bg-[var(--surface-muted)]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 80vw, 22vw"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[10px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
            {article.categoryName}
          </p>
          <h3 className="mt-1 text-sm font-bold leading-snug text-[var(--text-primary)]">
            {article.title}
          </h3>
          {excerpt ? (
            <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--text-secondary)]">
              {excerpt}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <div className="mt-2">
            <ArticleMeta article={article} />
          </div>
          <Link
            href={href}
            className="mt-2 text-sm font-semibold text-[var(--brand-primary)] underline-offset-4 hover:underline"
            aria-label={`Read ${article.title}`}
          >
            {ctaLabel(article)} →
          </Link>
        </div>
      </article>
    </FadeUp>
  );
}

/**
 * Homepage Learn discovery — Latest Articles only (no Popular Guides duplicate).
 */
export function HomepageLearnSections({ className }: { className?: string }) {
  const latest = getLatestPublicArticles(5);
  if (latest.length === 0) return null;

  const [featured, ...rest] = latest;
  const secondary = rest.slice(0, 4);

  return (
    <Section
      id="home-latest-articles"
      spacing="compact"
      className={cn('bg-hero-wash', className)}
      aria-labelledby="home-latest-articles-heading"
    >
      <Container size="xl" className="space-y-5">
        <FadeUp className="max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id="home-latest-articles-heading">
            Latest Articles
          </Heading>
          <MutedText>
            Recently updated NovaLikes Learn guides across Instagram, TikTok, YouTube, Facebook
            and social media marketing.
          </MutedText>
        </FadeUp>

        {featured ? <FeaturedArticleCard article={featured} /> : null}

        {secondary.length > 0 ? (
          <ul className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {secondary.map((article, index) => (
              <li
                key={`latest-${article.id}`}
                className="w-[76%] shrink-0 snap-start sm:w-auto sm:shrink"
              >
                <CompactArticleCard article={article} delay={0.03 * index} />
              </li>
            ))}
          </ul>
        ) : null}

        <FadeUp>
          <Button asChild variant="outline" className="min-h-11 rounded-xl">
            <Link href={routes.learn}>View All Articles →</Link>
          </Button>
        </FadeUp>
      </Container>
    </Section>
  );
}

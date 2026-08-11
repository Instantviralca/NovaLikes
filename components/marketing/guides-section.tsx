import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { learnArticlePath } from '@/config/routes';
import { guidesSection } from '@/data/content/homepage-extensions';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { cn } from '@/lib/utils';

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

/**
 * Editorial Learn guides — published articles only. Hidden when none are live.
 */
export function GuidesSection({ className }: { className?: string }) {
  const { id, title, description } = guidesSection;
  const articles = getPublishedLearnArticleRecords()
    .slice()
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 4);

  if (articles.length === 0) return null;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          <MutedText>{description}</MutedText>
        </FadeUp>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, index) => {
            const href = learnArticlePath(article.slug);
            const dateLabel = formatGuideDate(
              article.showModifiedDate ? article.updatedAt : article.publishedAt,
            );
            const excerpt = excerptWords(article.excerpt, 22);
            const image = article.featuredImage;

            return (
              <li key={article.id}>
                <FadeUp delay={0.04 * index} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                    <div className="relative aspect-video overflow-hidden bg-[var(--surface-muted)]">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
                        {article.category}
                      </p>
                      <h3 className="mt-1.5 text-base font-bold leading-snug text-[var(--text-primary)]">
                        {article.title}
                      </h3>
                      {excerpt ? (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {excerpt}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}
                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                        {[dateLabel, `${article.readingTime} min read`].filter(Boolean).join(' · ')}
                      </p>
                      <Button asChild variant="outline" className="mt-4 min-h-11 w-full rounded-xl">
                        <Link href={href} aria-label={`Read ${article.title}`}>
                          {article.category === 'instagram'
                            ? 'Instagram growth guide'
                            : article.category === 'tiktok'
                              ? 'TikTok growth guide'
                              : article.category === 'facebook'
                                ? 'Facebook growth guide'
                                : article.category === 'youtube'
                                  ? 'YouTube growth guide'
                                  : article.category === 'guides'
                                    ? 'Social media guide'
                                    : 'Marketing guide'}
                        </Link>
                      </Button>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, X } from 'lucide-react';

import { TikTokLikesAnalyticsDashboard } from '@/components/illustrations/tiktok-likes-analytics-dashboard';
import { TikTokLikesBeforeAfterPreview } from '@/components/illustrations/tiktok-likes-before-after-preview';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  TIKTOK_LIKES_PAGE_CONFIG,
  type TikTokLikesPageConfig,
} from '@/data/content/tiktok-likes-page-config';
import { cn } from '@/lib/utils';
import type { InternalLink } from '@/types/linking';

type SectionProps = {
  config?: TikTokLikesPageConfig;
  className?: string;
};

/** Decorative live preview — mock numbers are illustration only. */
export function TikTokLikesLivePreview({ className }: { className?: string }) {
  return (
    <Section
      id="likes-before-after-preview"
      spacing="lg"
      className={cn('bg-[#FFF9F4]', className)}
      aria-labelledby="likes-before-after-preview-heading"
    >
      <Container size="xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <FadeUp className="mx-auto max-w-xl space-y-3 text-center lg:mx-0 lg:text-left">
            <Heading
              as="h2"
              size="h2"
              id="likes-before-after-preview-heading"
              className="tracking-tight"
            >
              Likes Before &amp; After Preview
            </Heading>
            <MutedText className="text-base leading-relaxed sm:text-[1.05rem]">
              A visual illustration of how like counts can appear on a TikTok-style video frame.
              Decorative sample numbers only — not a performance claim.
            </MutedText>
            <p className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-primary)_22%,var(--border-subtle))] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--brand-primary)]">
              Illustration preview
            </p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <TikTokLikesBeforeAfterPreview />
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

/** Section 6 — Does buying likes work */
export function TikTokLikesDoesBuyingWork({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { doesBuyingWork } = config;

  return (
    <Section
      id={doesBuyingWork.id}
      spacing="lg"
      className={cn('bg-white', className)}
      aria-labelledby={`${doesBuyingWork.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-8 max-w-3xl space-y-3">
          <Heading
            as="h2"
            size="h2"
            id={`${doesBuyingWork.id}-heading`}
            className="tracking-tight"
          >
            {doesBuyingWork.title}
          </Heading>
          <MutedText className="text-base leading-relaxed sm:text-[1.05rem]">
            {doesBuyingWork.description}
          </MutedText>
        </FadeUp>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)_minmax(0,0.95fr)] lg:gap-5 xl:gap-7">
          <FadeUp>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                {doesBuyingWork.helpTitle}
              </p>
              <ul className="mt-4 space-y-3">
                {doesBuyingWork.helpItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] shadow-sm">
                      <Check className="size-3.5" strokeWidth={2.75} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.04} className="flex justify-center lg:px-1">
            <TikTokLikesAnalyticsDashboard className="w-full max-w-[26rem]" />
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAF9] p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.12em] text-stone-500 uppercase">
                {doesBuyingWork.limitTitle}
              </p>
              <ul className="mt-4 space-y-3">
                {doesBuyingWork.limitItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-stone-400 shadow-sm">
                      <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mx-auto mt-8 max-w-3xl">
          <p className="rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)]">
            {doesBuyingWork.closingNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 7 — Likes vs Views vs Followers */
export function TikTokLikesServiceCompare({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { serviceCompare } = config;

  return (
    <Section
      id={serviceCompare.id}
      spacing="lg"
      className={cn('bg-[#FFF9F4]', className)}
      aria-labelledby={`${serviceCompare.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-9 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${serviceCompare.id}-heading`}
            className="tracking-tight"
          >
            {serviceCompare.title}
          </Heading>
          <MutedText className="leading-relaxed">{serviceCompare.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          <li>
            <FadeUp>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:p-6">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {serviceCompare.likes.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {serviceCompare.likes.description}
                </p>
              </article>
            </FadeUp>
          </li>
          <li>
            <FadeUp delay={0.04}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:p-6">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {serviceCompare.views.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {serviceCompare.views.description}
                </p>
                <Link
                  href={serviceCompare.views.href}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
                >
                  {serviceCompare.views.ctaLabel}
                </Link>
              </article>
            </FadeUp>
          </li>
          <li>
            <FadeUp delay={0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:p-6">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {serviceCompare.followers.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {serviceCompare.followers.description}
                </p>
                <Link
                  href={serviceCompare.followers.href}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
                >
                  {serviceCompare.followers.ctaLabel}
                </Link>
              </article>
            </FadeUp>
          </li>
        </ul>

        <FadeUp delay={0.1} className="mx-auto mt-8 max-w-3xl">
          <p className="text-center text-sm leading-relaxed text-[var(--text-secondary)]">
            {serviceCompare.combinedNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 8 — What to check before buying */
export function TikTokLikesBeforeBuying({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { beforeBuying } = config;

  return (
    <Section
      id={beforeBuying.id}
      spacing="lg"
      className={cn('bg-white', className)}
      aria-labelledby={`${beforeBuying.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-9 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${beforeBuying.id}-heading`}
            className="tracking-tight"
          >
            {beforeBuying.title}
          </Heading>
          <MutedText className="leading-relaxed">{beforeBuying.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {beforeBuying.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAF9] p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(28,25,23,0.35)] motion-reduce:hover:translate-y-0 sm:p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>

        <FadeUp delay={0.12} className="mx-auto mt-8 max-w-3xl">
          <p className="rounded-xl border border-[var(--border-subtle)] bg-[#FFF9F4] px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {beforeBuying.framingNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 9 — Buying worldwide */
export function TikTokLikesCanada({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { canada } = config;

  return (
    <Section
      id={canada.id}
      spacing="lg"
      className={cn('bg-[#FFF9F4]', className)}
      aria-labelledby={`${canada.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-10 max-w-2xl space-y-3">
          <Heading as="h2" size="h2" id={`${canada.id}-heading`} className="tracking-tight">
            {canada.title}
          </Heading>
          <MutedText className="text-base leading-relaxed sm:text-[1.05rem]">
            {canada.description}
          </MutedText>
          <MutedText className="leading-relaxed">{canada.body}</MutedText>
        </FadeUp>

        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {canada.cards.map((card, index) => {
            const Icon = resolvePackagesIcon(card.icon);
            return (
              <li key={card.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="group flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] hover:shadow-[0_24px_48px_-22px_rgba(28,25,23,0.38)] motion-reduce:hover:translate-y-0 sm:gap-5 sm:p-6">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:line-clamp-none">
                        {card.description}
                      </p>
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

/** Section 10 — Popular package sizes */
export function TikTokLikesPackageSizes({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { packageSizes } = config;
  const total = packageSizes.rows.length;

  return (
    <Section
      id={packageSizes.id}
      spacing="lg"
      className={cn('bg-white', className)}
      aria-labelledby={`${packageSizes.id}-heading`}
    >
      <Container size="lg">
        <FadeUp className="mx-auto mb-8 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${packageSizes.id}-heading`}
            className="tracking-tight"
          >
            {packageSizes.title}
          </Heading>
          <MutedText className="leading-relaxed">{packageSizes.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {packageSizes.rows.map((row, index) => {
            const popularity = index + 1;
            return (
              <li key={row.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAF9] p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.26)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:bg-white hover:shadow-[0_24px_48px_-22px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:p-6">
                    <p className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                      {row.quantity}
                    </p>
                    <p className="mt-2 text-[11px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                      Best For
                    </p>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {row.recommendedFor}
                    </p>
                    <div className="mt-4 space-y-2" aria-hidden>
                      <div className="h-1.5 overflow-hidden rounded-full bg-stone-200/80">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-primary),#ea580c)] transition-[width] duration-500"
                          style={{ width: `${(popularity / total) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-1.5">
                        {Array.from({ length: total }).map((_, dot) => (
                          <span
                            key={dot}
                            className={cn(
                              'size-1.5 rounded-full',
                              dot < popularity
                                ? 'bg-[var(--brand-primary)]'
                                : 'bg-stone-200',
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>

        <FadeUp delay={0.06} className="mx-auto mt-6 max-w-3xl">
          <p className="text-center text-sm leading-relaxed text-[var(--text-secondary)]">
            {packageSizes.bottomNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 11 — Best practices */
export function TikTokLikesBestPractices({
  config = TIKTOK_LIKES_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { bestPractices } = config;

  return (
    <Section
      id={bestPractices.id}
      spacing="lg"
      className={cn('bg-[#FAFAF9]', className)}
      aria-labelledby={`${bestPractices.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-9 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${bestPractices.id}-heading`}
            className="tracking-tight"
          >
            {bestPractices.title}
          </Heading>
          <MutedText className="leading-relaxed">{bestPractices.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {bestPractices.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full flex-col gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:p-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)]">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
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

export type RelatedArticleWithThumb = InternalLink & {
  image?: { src: string; alt: string; width: number; height: number };
  readingTime?: number;
};

/** Related articles — 16:9 thumb, Learn badge, reading time, 2-col grid */
export function TikTokLikesRelatedArticles({
  articles,
  title = 'Related Articles',
  description = 'Guides that help you grow on TikTok alongside like packages.',
}: {
  articles: RelatedArticleWithThumb[];
  title?: string;
  description?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <Section
      id="related-articles"
      spacing="lg"
      className="bg-[#FFF9F4]"
      aria-labelledby="related-articles-heading"
    >
      <Container size="xl">
        <FadeUp className="mx-auto max-w-2xl space-y-2 text-center">
          <Heading as="h2" size="h2" id="related-articles-heading">
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
        </FadeUp>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <FadeUp delay={0.04 * index} className="h-full">
                <Link
                  href={article.href}
                  className="group flex h-full min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[0_16px_36px_-22px_rgba(28,25,23,0.32)] outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_28px_52px_-22px_rgba(28,25,23,0.42)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[16/9] min-h-[10rem] overflow-hidden bg-[var(--surface-muted)] sm:min-h-[11rem]">
                    {article.image ? (
                      <Image
                        src={article.image.src}
                        alt={article.image.alt || article.label}
                        width={article.image.width}
                        height={article.image.height}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-end bg-[linear-gradient(145deg,#fff7ed,#25F4EE22,#FE2C5522)] p-3"
                        aria-hidden
                      />
                    )}
                    <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase shadow-sm">
                      Learn
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-primary)] sm:text-[1.05rem]">
                      {article.label}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <p className="text-xs font-medium text-[var(--text-muted)]">
                        {typeof article.readingTime === 'number'
                          ? `${article.readingTime} min read`
                          : 'Learn guide'}
                      </p>
                      <span
                        className="flex size-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white text-[var(--text-muted)] transition-[background-color,color,border-color,transform] duration-200 group-hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] group-hover:bg-[var(--brand-accent-soft)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                        aria-hidden
                      >
                        <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

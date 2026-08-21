import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Eye, Heart, Users, X } from 'lucide-react';

import {
  InstagramFollowersHelpVisual,
  InstagramFollowersOrderVisual,
  InstagramFollowersPracticesVisual,
  InstagramFollowersWhyVisual,
} from '@/components/illustrations/instagram-followers-section-photos';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  type InstagramFollowersPageConfig,
} from '@/data/content/instagram-followers-page-config';
import { cn } from '@/lib/utils';
import type { BenefitItem, CtaProps, ProcessStep } from '@/types/components';
import type { InternalLink } from '@/types/linking';

/** Tighter IG authority rhythm (~30–40px less than default lg). */
const IG_SECTION_SPACING = 'py-7 md:py-9 lg:py-10';

type SectionProps = {
  config?: InstagramFollowersPageConfig;
  className?: string;
  visual?: ReactNode;
  revealCards?: boolean;
};

export type RelatedArticleWithThumb = InternalLink & {
  readingTime?: number;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

/** Section 3 — Why Choose NovaLikes */
export function InstagramFollowersWhyChoose({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { whyChoose } = config;

  return (
    <Section
      id={whyChoose.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${whyChoose.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${whyChoose.id}-heading`}
            className="tracking-tight"
          >
            {whyChoose.title}
          </Heading>
          <MutedText className="leading-relaxed">{whyChoose.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {whyChoose.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full flex-col gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_22px_44px_-20px_rgba(249,115,22,0.32)] motion-reduce:hover:translate-y-0 sm:p-6">
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

/** Section 4 — Why do people buy Instagram Followers */
export function InstagramFollowersWhyBuy({
  id,
  title,
  description,
  items,
  bottomNote,
  visual,
  className,
}: {
  id?: string;
  title?: string;
  description?: string;
  items: BenefitItem[];
  bottomNote?: string;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <Section
      id={id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container size="xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:items-center">
          <FadeUp immediate className="space-y-5 self-center">
            {title ? (
              <Heading
                as="h2"
                size="h2"
                id={id ? `${id}-heading` : undefined}
                className="tracking-tight"
              >
                {title}
              </Heading>
            ) : null}
            {description ? (
              <MutedText className="max-w-xl text-base leading-relaxed sm:text-[1.05rem]">
                {description}
              </MutedText>
            ) : null}
            {items.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:p-5"
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
            {bottomNote ? (
              <p className="max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                {bottomNote}
              </p>
            ) : null}
          </FadeUp>
          <FadeUp
            delay={0.06}
            className="mx-auto flex w-full max-w-[28rem] items-center justify-center self-center lg:max-w-none"
          >
            {visual ?? <InstagramFollowersWhyVisual className="h-auto w-full" />}
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

/** Section 5 — Can you buy Instagram Followers? */
export function InstagramFollowersCanYouBuy({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  visual,
  className,
}: SectionProps) {
  const { canYouBuy } = config;

  return (
    <Section
      id={canYouBuy.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${canYouBuy.id}-heading`}
    >
      <Container size="xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <FadeUp
            delay={0.04}
            className="order-2 mx-auto w-full max-w-[26rem] lg:order-1 lg:max-w-none"
          >
            {visual ?? (
              <InstagramFollowersOrderVisual className="h-auto w-full" />
            )}
          </FadeUp>

          <FadeUp className="order-1 space-y-5 lg:order-2">
            <Heading
              as="h2"
              size="h2"
              id={`${canYouBuy.id}-heading`}
              className="tracking-tight"
            >
              {canYouBuy.title}
            </Heading>
            <MutedText className="max-w-xl text-base leading-relaxed sm:text-[1.05rem]">
              {canYouBuy.description}
            </MutedText>
            <ul className="grid gap-3 sm:grid-cols-2">
              {canYouBuy.cards.map((card) => {
                const Icon = resolvePackagesIcon(card.icon);
                return (
                  <li
                    key={card.id}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-4 sm:p-5"
                  >
                    <span className="mb-2.5 flex size-9 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm">
                      <Icon className="size-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {card.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

/** Section 6 — How to buy Instagram Followers */
export function InstagramFollowersHowToBuy({
  id,
  title,
  description,
  steps,
  cta,
  revealSteps: _revealSteps,
  className,
}: {
  id?: string;
  title?: string;
  description?: string;
  steps: ProcessStep[];
  cta?: CtaProps;
  revealSteps?: boolean;
  className?: string;
}) {
  return (
    <Section
      id={id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
          {title ? (
            <Heading
              as="h2"
              size="h2"
              id={id ? `${id}-heading` : undefined}
              className="tracking-tight"
            >
              {title}
            </Heading>
          ) : null}
          {description ? (
            <MutedText className="mx-auto max-w-2xl text-base leading-relaxed sm:text-[1.05rem]">
              {description}
            </MutedText>
          ) : null}
        </FadeUp>

        {steps.length > 0 ? (
          <ol className="mx-auto max-w-2xl space-y-0">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <li key={step.id} className="relative flex gap-4 sm:gap-5">
                  <div className="flex w-12 shrink-0 flex-col items-center sm:w-14">
                    <span className="z-[1] flex size-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-base font-bold text-[var(--brand-primary)] shadow-sm sm:size-14 sm:text-lg">
                      {index + 1}
                    </span>
                    {!isLast ? (
                      <span
                        className="mt-1 w-px flex-1 bg-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))]"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <FadeUp
                    delay={0.03 * index}
                    className={cn('min-w-0 flex-1', !isLast && 'pb-5 sm:pb-6')}
                  >
                    <article className="rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_10px_24px_-18px_rgba(28,25,23,0.28)] sm:p-5">
                      <p className="text-[11px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {step.description}
                      </p>
                    </article>
                  </FadeUp>
                </li>
              );
            })}
          </ol>
        ) : null}

        {cta?.href && cta.label ? (
          <div className="mt-7 text-center">
            <a
              href={cta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-semibold text-white shadow-[0_14px_28px_-14px_rgba(249,115,22,0.7)] transition hover:brightness-105"
            >
              {cta.label}
            </a>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/** Section 8 — Does buying Instagram Followers help? */
export function InstagramFollowersDoesBuyingHelp({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { doesBuyingHelp } = config;

  return (
    <Section
      id={doesBuyingHelp.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${doesBuyingHelp.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-6 max-w-3xl space-y-3">
          <Heading
            as="h2"
            size="h2"
            id={`${doesBuyingHelp.id}-heading`}
            className="tracking-tight"
          >
            {doesBuyingHelp.title}
          </Heading>
          <MutedText className="text-base leading-relaxed sm:text-[1.05rem]">
            {doesBuyingHelp.description}
          </MutedText>
        </FadeUp>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-6 xl:gap-7">
          <FadeUp className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                {doesBuyingHelp.helpTitle}
              </p>
              <ul className="mt-4 flex-1 space-y-3">
                {doesBuyingHelp.helpItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] shadow-sm">
                      <Check className="size-3.5" strokeWidth={2.75} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.04} className="flex items-center justify-center lg:px-0">
            <InstagramFollowersHelpVisual className="h-auto w-full max-w-[30rem]" />
          </FadeUp>

          <FadeUp delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAF9] p-5 sm:p-6">
              <p className="text-[11px] font-bold tracking-[0.12em] text-stone-500 uppercase">
                {doesBuyingHelp.limitTitle}
              </p>
              <ul className="mt-4 flex-1 space-y-3">
                {doesBuyingHelp.limitItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-stone-400 shadow-sm">
                      <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mx-auto mt-6 max-w-3xl">
          <p className="rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)]">
            {doesBuyingHelp.closingNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 9 — What happens after you buy Instagram Followers */
export function InstagramFollowersWhatHappens({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { whatHappens } = config;

  return (
    <Section
      id={whatHappens.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={`${whatHappens.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-8 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${whatHappens.id}-heading`}
            className="tracking-tight"
          >
            {whatHappens.title}
          </Heading>
          <MutedText className="leading-relaxed">{whatHappens.description}</MutedText>
        </FadeUp>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {whatHappens.steps.map((step, index) => {
            const isLast = index === whatHappens.steps.length - 1;
            return (
              <li key={step.id} className="relative lg:px-2.5">
                <FadeUp delay={0.03 * index}>
                  <article className="relative flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex size-9 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-sm font-bold text-[var(--brand-primary)]">
                        {index + 1}
                      </span>
                      {!isLast ? (
                        <ArrowRight
                          className="hidden size-4 text-[var(--brand-primary)] opacity-60 lg:inline-flex xl:absolute xl:top-8 xl:-right-3 xl:z-[1] xl:size-5 xl:rounded-full xl:bg-[#FFF9F4] xl:p-0.5 xl:opacity-100"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/** Section 10 — Followers vs Likes vs Views */
export function InstagramFollowersServiceCompare({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { serviceCompare } = config;

  return (
    <Section
      id={serviceCompare.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${serviceCompare.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
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
              <article className="flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_22%,var(--border-subtle))] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_24px_48px_-20px_rgba(249,115,22,0.35)] motion-reduce:hover:translate-y-0 sm:p-6">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)]">
                  <Users className="size-5" aria-hidden />
                </span>
                <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                  Current focus
                </p>
                <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                  {serviceCompare.current.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {serviceCompare.current.description}
                </p>
                <span className="mt-4 inline-flex w-fit rounded-full bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] px-3.5 py-1.5 text-sm font-semibold text-[var(--brand-primary)]">
                  {serviceCompare.current.ctaLabel}
                </span>
              </article>
            </FadeUp>
          </li>
          <li>
            <FadeUp delay={0.04}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_24px_48px_-20px_rgba(249,115,22,0.35)] motion-reduce:hover:translate-y-0 sm:p-6">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[#FFF1F2] text-[#E11D48]">
                  <Heart className="size-5" aria-hidden />
                </span>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {serviceCompare.likes.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {serviceCompare.likes.description}
                </p>
                <Link
                  href={serviceCompare.likes.href}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
                >
                  {serviceCompare.likes.ctaLabel}
                </Link>
              </article>
            </FadeUp>
          </li>
          <li>
            <FadeUp delay={0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_24px_48px_-20px_rgba(249,115,22,0.35)] motion-reduce:hover:translate-y-0 sm:p-6">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#6366F1]">
                  <Eye className="size-5" aria-hidden />
                </span>
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
        </ul>

        <FadeUp delay={0.1} className="mx-auto mt-6 max-w-3xl">
          <p className="text-center text-sm leading-relaxed text-[var(--text-secondary)]">
            {serviceCompare.combinedNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 11 — What to check before buying */
export function InstagramFollowersBeforeBuying({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  revealCards: _revealCards,
  className,
}: SectionProps) {
  const { beforeBuying } = config;

  return (
    <Section
      id={beforeBuying.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={`${beforeBuying.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
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
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(28,25,23,0.35)] motion-reduce:hover:translate-y-0 sm:p-6">
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

        <FadeUp delay={0.12} className="mx-auto mt-6 max-w-3xl">
          <p className="rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {beforeBuying.framingNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 12 — Buying worldwide */
export function InstagramFollowersWorldwide({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { worldwide } = config;

  return (
    <Section
      id={worldwide.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${worldwide.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-8 max-w-2xl space-y-3">
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-[#FFF1F2] px-3 py-1.5 text-xs font-semibold text-[#E1306C]">
            {worldwide.eyebrow}
          </div>
          <Heading
            as="h2"
            size="h2"
            id={`${worldwide.id}-heading`}
            className="tracking-tight"
          >
            {worldwide.title}
          </Heading>
          <MutedText className="text-base leading-relaxed sm:text-[1.05rem]">
            {worldwide.description}
          </MutedText>
          <MutedText className="leading-relaxed">{worldwide.body}</MutedText>
        </FadeUp>

        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {worldwide.cards.map((card, index) => {
            const Icon = resolvePackagesIcon(card.icon);
            return (
              <li key={card.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="group flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] hover:shadow-[0_24px_48px_-22px_rgba(28,25,23,0.38)] motion-reduce:hover:translate-y-0 sm:gap-5 sm:p-6">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
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

/** Section 13 — Popular package sizes */
export function InstagramFollowersPackageSizes({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { packageSizes } = config;
  const total = packageSizes.rows.length;

  return (
    <Section
      id={packageSizes.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={`${packageSizes.id}-heading`}
    >
      <Container size="lg">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
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
          {packageSizes.rows.map((row, index) => (
            <li
              key={row.id}
              className={cn(
                index === total - 1 && total % 2 === 1
                  ? 'sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.5rem)] md:col-span-1 md:mx-0 md:max-w-none'
                  : undefined,
              )}
            >
              <FadeUp delay={0.03 * index}>
                <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.26)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_24px_48px_-22px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:p-6">
                  <p className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {row.quantity}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {row.recommendedFor}
                  </p>
                  <Link
                    href="#pricing-packages"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:underline"
                  >
                    Choose Package
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </article>
              </FadeUp>
            </li>
          ))}
        </ul>

        <FadeUp delay={0.12} className="mx-auto mt-6 max-w-3xl">
          <p className="text-center text-sm leading-relaxed text-[var(--text-secondary)]">
            {packageSizes.bottomNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 14 — Best practices */
export function InstagramFollowersBestPractices({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  visual,
  className,
}: SectionProps) {
  const { bestPractices } = config;

  return (
    <Section
      id={bestPractices.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white', className)}
      aria-labelledby={`${bestPractices.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-6 max-w-3xl space-y-3 text-center">
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

        <FadeUp delay={0.04} className="mx-auto mb-7 max-w-[28rem]">
          {visual ?? <InstagramFollowersPracticesVisual className="h-auto w-full" />}
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {bestPractices.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full flex-col gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:p-6">
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

        <FadeUp delay={0.12} className="mx-auto mt-6 max-w-3xl">
          <p className="rounded-xl border border-[var(--border-subtle)] bg-[#FFF9F4] px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {bestPractices.closingNote}
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Section 15 — Common mistakes */
export function InstagramFollowersCommonMistakes({
  config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { commonMistakes } = config;

  return (
    <Section
      id={commonMistakes.id}
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-[#FFF9F4]', className)}
      aria-labelledby={`${commonMistakes.id}-heading`}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto mb-7 max-w-3xl space-y-3 text-center">
          <Heading
            as="h2"
            size="h2"
            id={`${commonMistakes.id}-heading`}
            className="tracking-tight"
          >
            {commonMistakes.title}
          </Heading>
          <MutedText className="leading-relaxed">{commonMistakes.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {commonMistakes.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] sm:gap-5 sm:p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FAFAF9] text-stone-500">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
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

/** Related Learn articles */
export function InstagramFollowersRelatedArticles({
  articles,
  title = 'Related Articles',
  description = 'Guides that help you grow a stronger Instagram profile alongside follower packages.',
}: {
  articles: RelatedArticleWithThumb[];
  title?: string;
  description?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <Section
      id="related-articles"
      spacing="none"
      className={cn(IG_SECTION_SPACING, 'bg-white')}
      aria-labelledby="related-articles-heading"
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto max-w-2xl space-y-2 text-center">
          <Heading as="h2" size="h2" id="related-articles-heading">
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
        </FadeUp>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <FadeUp delay={0.04 * index} className="h-full">
                <Link
                  href={article.href}
                  className="group flex h-full min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#FFF9F4] shadow-[0_16px_36px_-22px_rgba(28,25,23,0.32)] outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_28px_52px_-22px_rgba(28,25,23,0.42)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[16/9] min-h-[10rem] overflow-hidden bg-[var(--surface-muted)] sm:min-h-[11rem]">
                    {article.image ? (
                      <Image
                        src={article.image.src}
                        alt={article.image.alt || article.label}
                        width={article.image.width}
                        height={article.image.height}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-end bg-[linear-gradient(145deg,#fdf2f8,#E1306C22,#F9731622)] p-3"
                        aria-hidden
                      />
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase shadow-sm">
                        Learn
                      </span>
                      <span className="rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-[var(--text-secondary)] shadow-sm">
                        {typeof article.readingTime === 'number'
                          ? `${article.readingTime} min read`
                          : 'Guide'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-primary)] sm:text-[1.05rem]">
                      {article.label}
                    </p>
                    <div className="mt-auto flex items-center justify-end pt-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)]">
                        Read Guide
                        <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
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

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Eye,
  FileText,
  Headphones,
  HelpCircle,
  Lock,
  MapPin,
  Package,
  Scale,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { homepageEditorial } from '@/data/content/homepage-editorial';
import { homepageMediaAssets } from '@/data/content/homepage-media';
import { cn } from '@/lib/utils';

function SectionIllustration({
  src,
  alt,
  title,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className="h-auto max-h-[12rem] w-full object-cover sm:max-h-[14rem] lg:max-h-[16rem]"
        sizes="(max-width: 1024px) 100vw, 720px"
        loading="lazy"
      />
    </figure>
  );
}

function ProseBlock({
  id,
  title,
  children,
  className,
  media,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  media?: ReactNode;
}) {
  return (
    <Section id={id} spacing="md" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <div className={cn('mx-auto max-w-3xl space-y-5', media && 'lg:mx-0 lg:max-w-none')}>
          {media ? (
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
              <FadeUp className="space-y-5">
                <Heading as="h2" size="h2" id={`${id}-heading`}>
                  {title}
                </Heading>
                {children}
              </FadeUp>
              <FadeUp delay={0.08}>{media}</FadeUp>
            </div>
          ) : (
            <FadeUp className="space-y-5">
              <Heading as="h2" size="h2" id={`${id}-heading`}>
                {title}
              </Heading>
              {children}
            </FadeUp>
          )}
        </div>
      </Container>
    </Section>
  );
}

/** Secondary section CTA — outline / inline to avoid orange-banner fatigue. */
function InlineSectionCta({
  prompt,
  description,
  href,
  label,
  className,
}: {
  prompt?: string;
  description?: string;
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {prompt ? (
          <p className="text-sm font-medium text-[var(--text-primary)]">{prompt}</p>
        ) : null}
        {description ? (
          <p className="text-sm text-[var(--text-secondary)]">{description}</p>
        ) : null}
      </div>
      <Button asChild variant="outline" className="min-h-11 shrink-0 rounded-xl">
        <Link href={href}>
          {label}
          <span aria-hidden className="ml-1">
            →
          </span>
        </Link>
      </Button>
    </div>
  );
}

export function HomepageDirectAnswerSection() {
  const { directAnswer } = homepageEditorial;
  const media = homepageMediaAssets.whereToBuy;

  const featureIcons: Record<string, LucideIcon> = {
    'global-focus': MapPin,
    'clear-packages': Package,
    'public-policies': FileText,
    'why-novalikes': Sparkles,
  };

  return (
    <Section
      id={directAnswer.id}
      spacing="md"
      className="bg-hero-wash"
      aria-labelledby={`${directAnswer.id}-heading`}
    >
      <Container size="xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <FadeUp className="lg:sticky lg:top-28">
            <figure className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-white/95 via-[#fffaf5]/80 to-[#f5ebe0]/70 p-2.5 shadow-[0_28px_60px_-36px_rgba(28,25,23,0.4)] sm:p-3">
              <Image
                src={media.src}
                alt={media.alt}
                title={media.title}
                width={media.width}
                height={media.height}
                className="h-auto w-full rounded-[1.35rem] object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
                loading="lazy"
              />
            </figure>
          </FadeUp>

          <FadeUp delay={0.06} className="space-y-6">
            <div className="space-y-4">
              <Heading as="h2" size="h2" id={`${directAnswer.id}-heading`}>
                {directAnswer.title}
              </Heading>
              {directAnswer.intro.map((paragraph) => (
                <Text
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed text-[var(--text-secondary)]"
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <aside
              className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] bg-white p-5 shadow-[var(--shadow-sm)]"
              aria-label="Quick answer"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                {directAnswer.quickAnswer.label}
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                {directAnswer.quickAnswer.question}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.9375rem]">
                {directAnswer.quickAnswer.answer}
              </p>
            </aside>

            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Provider selection checklist">
              {directAnswer.features.map((feature) => {
                const Icon = featureIcons[feature.id] ?? ShieldCheck;
                return (
                  <li
                    key={feature.id}
                    className="flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {feature.title}
                      </p>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-white/80 p-5">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {directAnswer.ctaPrompt}
              </p>
              <Button asChild variant="outline" className="min-h-11 rounded-xl">
                <Link href={directAnswer.cta.href}>
                  {directAnswer.cta.label}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

export function HomepageCommercialSection() {
  const { commercial } = homepageEditorial;
  const media = homepageMediaAssets.socialProof;

  return (
    <Section
      id={commercial.id}
      spacing="md"
      aria-labelledby={`${commercial.id}-heading`}
    >
      <Container size="xl" className="space-y-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <FadeUp className="space-y-6">
            <div className="space-y-4">
              <Heading as="h2" size="h2" id={`${commercial.id}-heading`}>
                {commercial.title}
              </Heading>
              {commercial.intro.map((paragraph) => (
                <Text
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed text-[var(--text-secondary)]"
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <aside
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--brand-accent-soft)]/45 p-5"
              aria-label={commercial.highlight.title}
            >
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {commercial.highlight.title}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {commercial.highlight.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <Button asChild variant="outline" className="min-h-11 rounded-xl">
              <Link href={commercial.cta.href}>{commercial.cta.label}</Link>
            </Button>
          </FadeUp>

          <FadeUp delay={0.08} className="lg:sticky lg:top-28">
            <figure className="rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-white/95 via-[#fffaf5]/80 to-[#f5ebe0]/70 p-2.5 shadow-[0_28px_60px_-36px_rgba(28,25,23,0.4)] sm:p-3">
              <Image
                src={media.src}
                alt={media.alt}
                title={media.title}
                width={media.width}
                height={media.height}
                className="h-auto w-full rounded-[1.35rem]"
                sizes="(max-width: 1024px) 100vw, 46vw"
                loading="lazy"
              />
            </figure>
          </FadeUp>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FadeUp>
            <article className="h-full rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)]">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {commercial.comparison.without.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {commercial.comparison.without.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span
                      className="mt-1 size-1.5 shrink-0 rounded-full bg-stone-300"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
          <FadeUp delay={0.06}>
            <article className="h-full rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] bg-[var(--brand-accent-soft)]/35 p-5 shadow-[var(--shadow-sm)]">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {commercial.comparison.with.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {commercial.comparison.with.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

export function HomepageWhyNovaLikesSection() {
  const { whyNovaLikes } = homepageEditorial;

  const featureIcons: Record<string, LucideIcon> = {
    'no-password': Lock,
    'secure-checkout': CreditCard,
    'gradual-delivery': Truck,
    'human-support': Headphones,
    'clear-packages': Package,
    'order-tracking': ClipboardList,
    'designed-for-global': MapPin,
    'multiple-services': Sparkles,
  };

  return (
    <Section
      id={whyNovaLikes.id}
      spacing="md"
      className="surface-muted"
      aria-labelledby={`${whyNovaLikes.id}-heading`}
    >
      <Container size="xl" className="space-y-6">
        <FadeUp className="mx-auto max-w-3xl space-y-3 text-center">
          <Heading as="h2" size="h2" id={`${whyNovaLikes.id}-heading`}>
            {whyNovaLikes.title}
          </Heading>
          <Text className="leading-relaxed text-[var(--text-secondary)]">
            {whyNovaLikes.intro[0]}
          </Text>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyNovaLikes.features.map((feature, index) => {
            const Icon = featureIcons[feature.id] ?? ShieldCheck;
            return (
              <FadeUp key={feature.id} delay={0.03 * index} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)]">
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {feature.description}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <div className="space-y-4">
          <FadeUp className="text-center">
            <Heading as="h3" size="h3">
              {whyNovaLikes.comparison.title}
            </Heading>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2">
            <FadeUp>
              <article className="h-full rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] bg-[var(--brand-accent-soft)]/35 p-5 shadow-[var(--shadow-sm)]">
                <h4 className="text-base font-semibold text-[var(--text-primary)]">
                  {whyNovaLikes.comparison.novaLikes.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {whyNovaLikes.comparison.novaLikes.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
            <FadeUp delay={0.05}>
              <article className="h-full rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)]">
                <h4 className="text-base font-semibold text-[var(--text-primary)]">
                  {whyNovaLikes.comparison.typical.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {whyNovaLikes.comparison.typical.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <XCircle className="mt-0.5 size-4 shrink-0 text-stone-400" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          </div>
          <FadeUp className="mx-auto max-w-3xl text-center">
            <Text className="leading-relaxed text-[var(--text-secondary)]">
              {whyNovaLikes.audienceTrust.description}
            </Text>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

export function HomepageHowToBuySection() {
  const { howToBuy } = homepageEditorial;

  const stepIcons: Record<string, LucideIcon> = {
    'choose-package': Package,
    'enter-username': UserRound,
    'complete-checkout': CreditCard,
    'track-order': ClipboardList,
  };

  return (
    <Section
      id={howToBuy.id}
      spacing="md"
      aria-labelledby={`${howToBuy.id}-heading`}
    >
      <Container size="xl" className="space-y-8">
        <FadeUp className="mx-auto max-w-3xl space-y-3 text-center">
          <Heading as="h2" size="h2" id={`${howToBuy.id}-heading`}>
            {howToBuy.title}
          </Heading>
          <Text className="leading-relaxed text-[var(--text-secondary)]">{howToBuy.intro}</Text>
        </FadeUp>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howToBuy.steps.map((step, index) => {
            const Icon = stepIcons[step.id] ?? Package;
            return (
              <FadeUp key={step.id} delay={0.04 * index} className="h-full">
                <li className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.32)] motion-reduce:hover:translate-y-0">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--brand-primary)] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)] transition-colors group-hover:bg-[color-mix(in_srgb,var(--brand-primary)_18%,white)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium tracking-wide text-[var(--brand-primary)] uppercase">
                    Step {index + 1} · {step.shortTitle}
                  </p>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {step.description}
                  </p>
                  {index < howToBuy.steps.length - 1 ? (
                    <span
                      className="pointer-events-none absolute top-1/2 -right-2 hidden text-[var(--brand-primary)] lg:block"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </li>
              </FadeUp>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export function HomepageInstagramHubSection() {
  const { instagramHub } = homepageEditorial;

  const resolveImage = (key: keyof typeof homepageMediaAssets) => homepageMediaAssets[key];

  return (
    <Section
      id={instagramHub.id}
      spacing="md"
      className="surface-muted"
      aria-labelledby={`${instagramHub.id}-heading`}
    >
      <Container size="xl" className="space-y-12">
        <FadeUp className="mx-auto max-w-3xl space-y-4 text-center">
          <Heading as="h2" size="h2" id={`${instagramHub.id}-heading`}>
            {instagramHub.title}
          </Heading>
        </FadeUp>

        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {[
            {
              id: instagramHub.featured.id,
              title: instagramHub.featured.title,
              description: `Best for: ${instagramHub.featured.bestFor}. ${instagramHub.featured.description}`,
              ctaLabel: instagramHub.featured.ctaLabel,
              href: instagramHub.featured.href,
              imageKey: instagramHub.featured.imageKey,
              featured: true,
            },
            ...instagramHub.cards.map((card) => ({ ...card, featured: false })),
          ].map((card, index) => {
            const image = resolveImage(card.imageKey);
            return (
              <FadeUp
                key={card.id}
                delay={0.03 * index}
                className="h-full w-[72%] shrink-0 snap-start sm:w-auto sm:shrink"
              >
                <article
                  className={cn(
                    'flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-sm)]',
                    card.featured
                      ? 'border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))]'
                      : 'border-[var(--border-subtle)]',
                  )}
                >
                  <div className="relative shrink-0 bg-[#fffaf5] p-2">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
                      width={image.width}
                      height={image.height}
                      className="h-24 w-full rounded-xl object-cover sm:h-28"
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 22vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    {card.featured ? (
                      <p className="mb-1 text-[10px] font-semibold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                        Flagship
                      </p>
                    ) : null}
                    <Heading as="h3" size="h4" className="text-base">
                      {card.title}
                    </Heading>
                    <MutedText className="mt-1.5 line-clamp-3 flex-1 text-xs sm:text-sm">
                      {card.description}
                    </MutedText>
                    <Button asChild variant="outline" size="sm" className="mt-3 min-h-10 w-full rounded-xl">
                      <Link href={card.href}>{card.ctaLabel}</Link>
                    </Button>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <div className="space-y-5">
          <FadeUp>
            <Heading as="h3" size="h3">
              {instagramHub.chooserTitle}
            </Heading>
          </FadeUp>
          <FadeUp className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]">
            <table className="w-full min-w-[28rem] border-collapse text-left text-[0.9375rem] leading-relaxed">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[#fff7ed]">
                  <th className="px-5 py-4 font-semibold tracking-tight text-[var(--text-primary)]">
                    Goal
                  </th>
                  <th className="px-5 py-4 font-semibold tracking-tight text-[var(--text-primary)]">
                    Recommended Service
                  </th>
                </tr>
              </thead>
              <tbody>
                {instagramHub.chooserRows.map((row) => (
                  <tr
                    key={row.goal}
                    className="border-b border-[var(--border-subtle)] last:border-0 odd:bg-white even:bg-[#fffaf5]/60"
                  >
                    <td className="px-5 py-4 text-[var(--text-secondary)]">{row.goal}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                        <CheckCircle2
                          className="size-4 shrink-0 text-[var(--brand-primary)]"
                          aria-hidden
                        />
                        {row.service}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

export function HomepageServiceChooserSection() {
  const { serviceChooser } = homepageEditorial;
  return (
    <Section id={serviceChooser.id} spacing="md" aria-labelledby={`${serviceChooser.id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-8 max-w-3xl space-y-3">
          <Heading as="h2" size="h2" id={`${serviceChooser.id}-heading`}>
            {serviceChooser.title}
          </Heading>
        </FadeUp>
        <FadeUp className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--brand-accent-soft)]/40">
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Service</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                  Best suited for
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                  Visible signal
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceChooser.rows.map((row) => (
                <tr
                  key={row.service}
                  className="border-b border-[var(--border-subtle)] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {row.service}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.suitedFor}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>
        <FadeUp className="mx-auto mt-6 max-w-3xl">
          <Text className="leading-relaxed text-[var(--text-secondary)]">
            {serviceChooser.supporting}
          </Text>
        </FadeUp>
      </Container>
    </Section>
  );
}

export function HomepageEntityTrustSection() {
  const { entityTrust } = homepageEditorial;
  const media = homepageMediaAssets.transparency;

  const valueIcons: Record<string, LucideIcon> = {
    transparency: Eye,
    simplicity: Sparkles,
    security: Lock,
    support: Headphones,
    consistency: Package,
    'global-focus': MapPin,
  };

  return (
    <Section
      id={entityTrust.id}
      spacing="md"
      className="surface-muted"
      aria-labelledby={`${entityTrust.id}-heading`}
    >
      <Container size="xl" className="space-y-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <FadeUp className="space-y-4">
            <Heading as="h2" size="h2" id={`${entityTrust.id}-heading`}>
              {entityTrust.title}
            </Heading>
            {entityTrust.story.map((paragraph) => (
              <Text
                key={paragraph.slice(0, 48)}
                className="leading-relaxed text-[var(--text-secondary)]"
              >
                {paragraph}
              </Text>
            ))}
          </FadeUp>
          <FadeUp delay={0.06}>
            <figure className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-2 shadow-[var(--shadow-sm)]">
              <Image
                src={media.src}
                alt={media.alt}
                title={media.title}
                width={media.width}
                height={media.height}
                className="h-auto max-h-[11rem] w-full rounded-xl object-cover sm:max-h-[12rem] lg:max-h-[16rem]"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="lazy"
              />
            </figure>
          </FadeUp>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entityTrust.values.map((value, index) => {
            const Icon = valueIcons[value.id] ?? ShieldCheck;
            return (
              <FadeUp key={value.id} delay={0.03 * index} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)]">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {value.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {value.description}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {entityTrust.metrics.map((metric, index) => (
            <FadeUp key={metric.id} delay={0.03 * index} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)] sm:p-5">
                <p className="text-xs font-semibold tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                  {metric.label}
                </p>
                <p className="mt-2 text-base font-semibold tracking-tight text-[var(--text-primary)] sm:text-lg">
                  {metric.value}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="space-y-4">
          <FadeUp>
            <Heading as="h3" size="h3">
              {entityTrust.processTitle}
            </Heading>
          </FadeUp>
          <FadeUp>
            <ol
              className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
              aria-label="Order process timeline"
            >
              {entityTrust.processSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex shrink-0 snap-start items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] shadow-[var(--shadow-sm)] sm:text-sm"
                >
                  <span className="text-[var(--brand-primary)]">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>

        <FadeUp>
          <aside
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-7"
            aria-label={entityTrust.educational.title}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                <Scale className="size-5" aria-hidden />
              </span>
              <Heading as="h3" size="h3">
                {entityTrust.educational.title}
              </Heading>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{entityTrust.educational.intro}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {entityTrust.educational.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </FadeUp>

        {/* Comparison content retained for topical coverage via compact checklist (avoids duplicating Why NovaLikes vs cards). */}
        <FadeUp>
          <aside
            className="rounded-2xl border border-[var(--border-subtle)] bg-[#fffaf5] p-5 sm:p-6"
            aria-label="Provider comparison summary"
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              NovaLikes vs typical unknown providers
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ul className="space-y-2">
                {entityTrust.comparison.novaLikes.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {entityTrust.comparison.typical.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-stone-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </FadeUp>

        <FadeUp>
          <aside
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
            aria-label={entityTrust.entityBox.title}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                <FileText className="size-5" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {entityTrust.entityBox.title}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {entityTrust.entityBox.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--border-subtle)] bg-[#fffaf5] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </FadeUp>

        <FadeUp>
          <InlineSectionCta
            prompt={entityTrust.ctaPrompt}
            description={entityTrust.ctaDescription}
            href={entityTrust.cta.href}
            label={entityTrust.cta.label}
          />
        </FadeUp>
      </Container>
    </Section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5 text-[var(--brand-primary)]"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden className="text-sm leading-none sm:text-base">
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export function HomepageTrustedReviewsSection({
  reviews = [],
}: {
  reviews?: Array<{
    id: string;
    customerName: string;
    reviewText: string;
    rating: number;
  }>;
}) {
  const { trustedReviews } = homepageEditorial;
  const media = homepageMediaAssets.customerReviews;

  const hasRealReviews = reviews.length > 0;
  const reviewCards = hasRealReviews
    ? reviews.slice(0, 6).map((review) => ({
        id: review.id,
        audience: review.customerName,
        quote: review.reviewText,
        rating: review.rating,
      }))
    : [
        {
          id: 'featured-placeholder',
          audience: `${trustedReviews.featuredPlaceholder.author}, ${trustedReviews.featuredPlaceholder.location}`,
          quote: trustedReviews.featuredPlaceholder.quote,
          rating: trustedReviews.featuredPlaceholder.rating,
        },
        ...trustedReviews.gridPlaceholders.slice(0, 5),
      ];

  return (
    <Section
      id={trustedReviews.id}
      spacing="md"
      className="bg-hero-wash"
      aria-labelledby={`${trustedReviews.id}-heading`}
    >
      <Container size="xl" className="space-y-6">
        <FadeUp className="mx-auto max-w-3xl space-y-3 text-center">
          <Heading as="h2" size="h2" id={`${trustedReviews.id}-heading`}>
            {trustedReviews.title}
          </Heading>
          {trustedReviews.intro.map((paragraph) => (
            <Text
              key={paragraph.slice(0, 48)}
              className="leading-relaxed text-[var(--text-secondary)]"
            >
              {paragraph}
            </Text>
          ))}
        </FadeUp>

        <FadeUp>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)]">
            <Image
              src={media.src}
              alt={media.alt}
              title={media.title}
              width={media.width}
              height={media.height}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/88 via-[#fffaf5]/82 to-white/90"
              aria-hidden
            />
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {reviewCards.map((card, index) => (
                  <li key={card.id}>
                    <article className="flex h-full flex-col rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_12px_32px_-20px_rgba(28,25,23,0.35)] backdrop-blur-sm sm:p-5">
                      <p className="text-xs font-semibold tracking-[0.1em] text-[var(--brand-primary)] uppercase">
                        {card.audience}
                      </p>
                      <div className="mt-2">
                        <StarRating rating={card.rating} />
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        “{card.quote}”
                      </p>
                      {index === 0 && !hasRealReviews ? (
                        <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                          Placeholder — replace with approved authentic reviews before launch.
                        </p>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {!hasRealReviews ? (
          <FadeUp className="text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              Review cards above are layout placeholders. Replace with approved authentic reviews
              before launch.
            </p>
          </FadeUp>
        ) : null}
      </Container>
    </Section>
  );
}

export function HomepageFaqSection() {
  const { faqSection } = homepageEditorial;
  const media = homepageMediaAssets.faq;

  return (
    <Section
      id={faqSection.id}
      spacing="md"
      className="surface-muted"
      aria-labelledby={`${faqSection.id}-heading`}
    >
      <Container size="xl" className="space-y-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          <FadeUp className="space-y-4">
            <Heading as="h2" size="h2" id={`${faqSection.id}-heading`}>
              {faqSection.title}
            </Heading>
            <Text className="leading-relaxed text-[var(--text-secondary)]">{faqSection.intro}</Text>
          </FadeUp>
          <FadeUp delay={0.06} className="hidden sm:block">
            <figure className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-2 shadow-[var(--shadow-sm)]">
              <Image
                src={media.src}
                alt={media.alt}
                title={media.title}
                width={media.width}
                height={media.height}
                className="h-auto max-h-[12rem] w-full rounded-xl object-cover lg:max-h-[16rem]"
                sizes="(max-width: 1024px) 100vw, 46vw"
                loading="lazy"
              />
            </figure>
          </FadeUp>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {faqSection.featured.map((item, index) => (
            <FadeUp key={item.id} delay={0.03 * index} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_22%,var(--border-subtle))] bg-white p-5 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                  Quick answer
                </p>
                <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  {item.question}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.answer}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="space-y-3">
          <Heading as="h3" size="h3">
            More questions
          </Heading>
          <div className="space-y-3">
            {faqSection.accordion.map((item) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)] open:border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--border-subtle))]"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)] marker:content-none [&::-webkit-details-marker]:hidden sm:text-base">
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex items-start gap-2">
                      <HelpCircle
                        className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                        aria-hidden
                      />
                      {item.question}
                    </span>
                    <span
                      className="mt-0.5 text-[var(--brand-primary)] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 pl-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </FadeUp>

      </Container>
    </Section>
  );
}

export function HomepageFinalCtaSection() {
  const { finalCtaSection } = homepageEditorial;
  const media = homepageMediaAssets.finalCta;

  return (
    <Section
      id={finalCtaSection.id}
      spacing="md"
      className="bg-hero-wash"
      aria-labelledby={`${finalCtaSection.id}-heading`}
    >
      <Container size="xl">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)]">
            <Image
              src={media.src}
              alt={media.alt}
              title={media.title}
              width={media.width}
              height={media.height}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="100vw"
              priority={false}
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-[#fffaf5]/72"
              aria-hidden
            />
            <div className="relative z-10 w-full space-y-4 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <Heading as="h2" size="h2" id={`${finalCtaSection.id}-heading`}>
                {finalCtaSection.title}
              </Heading>
              {finalCtaSection.copy.map((paragraph) => (
                <Text
                  key={paragraph.slice(0, 48)}
                  className="max-w-3xl leading-relaxed text-[var(--text-secondary)]"
                >
                  {paragraph}
                </Text>
              ))}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Button asChild size="lg" className="min-h-12 rounded-xl px-7">
                  <Link href={finalCtaSection.primaryCta.href}>
                    {finalCtaSection.primaryCta.label}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-12 rounded-xl bg-white/90 px-7 backdrop-blur-sm"
                >
                  <Link href={finalCtaSection.secondaryCta.href}>
                    {finalCtaSection.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}

export function HomepageSeoFooterNav() {
  const { seoFooterNav } = homepageEditorial;

  return (
    <Section
      id={seoFooterNav.id}
      spacing="md"
      className="border-t border-[var(--border-subtle)] bg-white"
      aria-labelledby={`${seoFooterNav.id}-heading`}
    >
      <Container size="xl" className="space-y-8">
        <FadeUp>
          <Heading as="h2" size="h3" id={`${seoFooterNav.id}-heading`}>
            {seoFooterNav.title}
          </Heading>
        </FadeUp>
        <FadeUp>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {seoFooterNav.columns.map((column) => (
              <nav key={column.id} aria-labelledby={`${column.id}-nav-heading`}>
                <h3
                  id={`${column.id}-nav-heading`}
                  className="text-sm font-semibold tracking-wide text-[var(--text-primary)]"
                >
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--brand-primary)] hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </FadeUp>
        <FadeUp className="flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-secondary)] uppercase">
              Payment Methods
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Secure checkout · Common card and digital payment options at checkout
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-secondary)] uppercase">
              Social
            </p>
            <ul className="mt-2 flex flex-wrap gap-3 text-sm">
              <li>
                <Link
                  href="/learn/instagram"
                  className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
                >
                  Instagram Guides
                </Link>
              </li>
              <li>
                <Link
                  href={routes.reviews}
                  className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href={routes.contact}
                  className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}

export function HomepageBuyingChecklistSection() {
  const { buyingChecklist } = homepageEditorial;
  return (
    <ProseBlock id={buyingChecklist.id} title={buyingChecklist.title} className="surface-muted">
      {buyingChecklist.body.map((paragraph) => (
        <Text key={paragraph.slice(0, 40)} className="leading-relaxed text-[var(--text-secondary)]">
          {paragraph}
        </Text>
      ))}
      <div className="space-y-3">
        <Heading as="h3" size="h3">
          {buyingChecklist.signsTitle}
        </Heading>
        <ul className="list-disc space-y-2 pl-5 text-[var(--text-secondary)]">
          {buyingChecklist.signs.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </div>
      <Text className="leading-relaxed text-[var(--text-secondary)]">
        {buyingChecklist.brandNote}
      </Text>
    </ProseBlock>
  );
}

export function HomepageCanYouBuySection() {
  const { canYouBuy } = homepageEditorial;
  return (
    <ProseBlock id={canYouBuy.id} title={canYouBuy.title}>
      {canYouBuy.body.map((paragraph) => (
        <Text key={paragraph.slice(0, 40)} className="leading-relaxed text-[var(--text-secondary)]">
          {paragraph}
        </Text>
      ))}
    </ProseBlock>
  );
}

export function HomepageGlobalSection() {
  const { globalAudience } = homepageEditorial;
  return (
    <ProseBlock id={globalAudience.id} title={globalAudience.title} className="bg-hero-wash">
      {globalAudience.body.map((paragraph) => (
        <Text key={paragraph.slice(0, 40)} className="leading-relaxed text-[var(--text-secondary)]">
          {paragraph}
        </Text>
      ))}
    </ProseBlock>
  );
}

export function HomepageAboutSection() {
  const { about } = homepageEditorial;
  return (
    <ProseBlock id={about.id} title={about.title}>
      {about.body.map((paragraph) => (
        <Text key={paragraph.slice(0, 40)} className="leading-relaxed text-[var(--text-secondary)]">
          {paragraph}
        </Text>
      ))}
      <dl className="grid gap-3 sm:grid-cols-2">
        {about.facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-xl border border-[var(--border-subtle)] bg-white p-4"
          >
            <dt className="text-xs font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-[var(--text-primary)]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </ProseBlock>
  );
}

export function HomepagePolicySummarySection() {
  const { policySummary } = homepageEditorial;
  return (
    <ProseBlock id={policySummary.id} title={policySummary.title} className="surface-muted">
      {policySummary.body.map((paragraph) => (
        <Text key={paragraph.slice(0, 40)} className="leading-relaxed text-[var(--text-secondary)]">
          {paragraph}
        </Text>
      ))}
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        {policySummary.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </ProseBlock>
  );
}

export function HomepageHowConciseAnswer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]',
        className,
      )}
    >
      {homepageEditorial.howConciseAnswer}
    </p>
  );
}

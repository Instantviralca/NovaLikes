'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { homepageAnalyticsEvents } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { CtaProps, ProcessStep } from '@/types/components';

export type HowItWorksProps = {
  id?: string;
  title?: string;
  description?: string;
  steps: ProcessStep[];
  cta?: CtaProps;
  className?: string;
  /** Optional timeline visual rendered between intro and steps. */
  timeline?: ReactNode;
  /** Progress bar accent — default brand orange, youtube uses red→orange. */
  progressAccent?: 'brand' | 'youtube';
};

export function HowItWorks({
  id,
  title,
  description,
  steps,
  cta,
  className,
  timeline,
  progressAccent = 'brand',
}: HowItWorksProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (steps.length < 2) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(steps.length - 1);
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [steps.length]);

  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;
  const colClass =
    steps.length >= 7
      ? 'lg:grid-cols-3 xl:grid-cols-4'
      : steps.length >= 6
        ? 'lg:grid-cols-3'
        : steps.length >= 5
          ? 'lg:grid-cols-5'
          : steps.length === 3
            ? 'lg:grid-cols-3'
            : 'lg:grid-cols-4';
  const progressGradient =
    progressAccent === 'youtube'
      ? 'bg-[linear-gradient(90deg,#FF0000_0%,#F97316_70%,#ea580c_100%)]'
      : 'bg-[linear-gradient(90deg,#34d399_0%,var(--brand-primary)_60%,#ea580c_100%)]';

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-transparent', className)}
      aria-labelledby={title ? 'how-it-works-heading' : undefined}
      aria-label={title ? undefined : 'How it works'}
    >
      <Container size="xl">
        {(title || description) && (
          <FadeUp className="mb-10 max-w-2xl space-y-3">
            {title ? (
              <Heading as="h2" size="h2" id="how-it-works-heading">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </FadeUp>
        )}

        {timeline}

        <div className="relative">
          {steps.length > 1 ? (
            <>
              <div className="absolute top-10 right-[8%] left-[8%] hidden h-1.5 rounded-full bg-stone-200 lg:block" />
              <div
                className={cn(
                  'absolute top-10 left-[8%] hidden h-1.5 origin-left rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block',
                  progressGradient,
                )}
                style={{ width: `calc(${progress}% * 0.84)`, maxWidth: '84%' }}
              />
            </>
          ) : null}

          <ol className={cn('relative grid gap-7 sm:grid-cols-2 sm:gap-6', colClass)}>
            {steps.map((step, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <li
                  key={step.id}
                  className={cn(
                    'group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[1.25rem] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 sm:min-h-[15.5rem] sm:p-6',
                    isActive
                      ? 'border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] shadow-[0_18px_40px_-28px_rgba(249,115,22,0.35)]'
                      : 'border-[var(--border-subtle)] hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] hover:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)]',
                  )}
                >
                  <div
                    className={cn(
                      'relative z-[1] mb-5 flex size-14 items-center justify-center rounded-2xl transition-all duration-300 sm:size-16',
                      isDone &&
                        'bg-emerald-500 text-white shadow-[0_12px_28px_-14px_rgba(16,185,129,0.75)]',
                      isActive &&
                        (progressAccent === 'youtube'
                          ? 'bg-[#FF0000] text-white shadow-[0_14px_32px_-12px_rgba(255,0,0,0.55)] ring-4 ring-red-100'
                          : 'bg-[var(--brand-primary)] text-white shadow-[0_14px_32px_-12px_rgba(249,115,22,0.9)] ring-4 ring-orange-100'),
                      !isDone &&
                        !isActive &&
                        'bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]',
                    )}
                    aria-hidden="true"
                  >
                    <span className="text-xl font-bold tracking-tight sm:text-2xl">
                      {index + 1}
                    </span>
                  </div>
                  {step.icon ? (
                    <div className="mb-3 text-[var(--brand-primary)]">{step.icon}</div>
                  ) : null}
                  <Heading as="h3" size="h4" className="leading-snug">
                    {step.title}
                  </Heading>
                  <Text className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </Text>
                  {index < steps.length - 1 ? (
                    <span className="mt-4 text-[var(--brand-primary)] lg:hidden" aria-hidden>
                      ↓
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        {cta ? (
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] font-semibold shadow-[0_12px_28px_-14px_rgba(249,115,22,0.75)] hover:bg-[var(--brand-primary-hover)] sm:w-auto"
            >
              <Link
                href={cta.href}
                data-analytics={homepageAnalyticsEvents.home_hero_get_started_click}
              >
                {cta.label}
              </Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

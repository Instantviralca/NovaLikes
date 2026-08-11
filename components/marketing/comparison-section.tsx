'use client';

import Link from 'next/link';
import {
  Check,
  Clock3,
  CreditCard,
  Eye,
  Lock,
  Minus,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { comparisonSection } from '@/data/content/homepage-extensions';
import { cn } from '@/lib/utils';

const FEATURE_ICONS: Record<string, LucideIcon> = {
  'public-profile': Lock,
  'secure-checkout': CreditCard,
  'transparent-delivery': Clock3,
  'dedicated-support': ShieldCheck,
  'customer-experience': Eye,
};

export function ComparisonSection({ className }: { className?: string }) {
  const { id, eyebrow, title, description, featureCards, cta, columns, rows } = comparisonSection;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-background', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <FadeUp className="space-y-6 lg:max-w-md">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                {eyebrow}
              </p>
              <Heading as="h2" size="h2" id={`${id}-heading`}>
                {title}
              </Heading>
              <MutedText>{description}</MutedText>
            </div>

            <ul className="space-y-3" aria-label="NovaLikes features">
              {featureCards.map((card) => {
                const Icon = FEATURE_ICONS[card.id] ?? Check;
                return (
                  <li
                    key={card.id}
                    className="flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--border-subtle))] hover:shadow-[0_14px_30px_-24px_rgba(28,25,23,0.3)]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</p>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                        {card.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Button asChild size="lg" className="min-h-11 rounded-xl">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div
              className="overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-white shadow-[0_20px_44px_-30px_rgba(28,25,23,0.35)]"
              role="region"
              aria-label="Feature comparison table"
            >
              <div
                className="w-full"
                role="table"
                aria-label="NovaLikes compared with other providers"
              >
                <div
                  className="hidden grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-[var(--border-subtle)] sm:grid"
                  role="row"
                >
                  <div
                    className="bg-[var(--surface-muted)] px-3 py-3.5 text-xs font-semibold text-[var(--text-muted)] sm:px-5"
                    role="columnheader"
                  >
                    Feature
                  </div>
                  <div
                    className="bg-[color-mix(in_srgb,var(--brand-primary)_8%,white)] px-2 py-3.5 text-center text-[11px] font-bold text-[var(--brand-primary)] sm:px-4 sm:text-sm"
                    role="columnheader"
                  >
                    {columns.novaLikes}
                  </div>
                  <div
                    className="bg-stone-50 px-2 py-3.5 text-center text-[11px] font-semibold leading-snug text-[var(--text-secondary)] sm:px-4 sm:text-sm"
                    role="columnheader"
                  >
                    {columns.typical}
                  </div>
                </div>

                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 border-b border-[var(--border-subtle)] last:border-b-0 sm:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]"
                    role="row"
                  >
                    <div
                      className="px-3 py-3 text-[13px] font-medium leading-snug text-[var(--text-primary)] sm:px-5 sm:py-4 sm:text-sm"
                      role="cell"
                    >
                      {'href' in row && row.href ? (
                        <Link
                          href={row.href}
                          className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {row.label}
                        </Link>
                      ) : (
                        row.label
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:contents">
                      <div
                        className="flex items-center justify-between gap-2 bg-[color-mix(in_srgb,var(--brand-primary)_6%,white)] px-3 py-2.5 sm:justify-center sm:px-4 sm:py-4"
                        role="cell"
                      >
                        <span className="text-[11px] font-semibold text-[var(--brand-primary)] sm:sr-only">
                          {columns.novaLikes}
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                          <span className="sr-only">Included with NovaLikes</span>
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between gap-2 bg-stone-50/80 px-3 py-2.5 sm:justify-center sm:px-4 sm:py-4"
                        role="cell"
                      >
                        <span className="text-[11px] font-semibold text-[var(--text-secondary)] sm:sr-only">
                          {columns.typical}
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                          <Minus className="size-3.5" strokeWidth={2.5} aria-hidden />
                          <span className="sr-only">May vary elsewhere</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

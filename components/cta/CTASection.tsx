'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Check } from 'lucide-react';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { ctaAnalyticsEvents, trackCtaEvent } from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTASectionProps = {
  primary: PublicCta;
  secondary?: PublicCta;
  additional?: PublicCta[];
  /** Override section title (defaults to primary.title). */
  title?: string;
  description?: string;
  surface?: string;
  serviceSlug?: string;
  id?: string;
  className?: string;
  /** Optional side visual for conversion surfaces. */
  aside?: ReactNode;
  /** Compact trust line under buttons (e.g. No password · Secure checkout). */
  trustLine?: string;
  /** Optional checklist-style trust badges under the CTA buttons. */
  trustBadges?: string[];
  /**
   * `band` — full-bleed dark band (legacy).
   * `banner` — homepage-style white section + orange gradient card.
   */
  variant?: 'band' | 'banner';
};

/**
 * Full-width final / mid-page CTA section from registry data.
 */
export function CTASection({
  primary,
  secondary,
  additional,
  title,
  description,
  surface = 'section',
  serviceSlug,
  id,
  className,
  aside,
  trustLine,
  trustBadges,
  variant = 'band',
}: CTASectionProps) {
  const viewed = useRef(false);
  const headingId = id ? `${id}-heading` : 'cta-section-heading';
  const isBanner = variant === 'banner';

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackCtaEvent(ctaAnalyticsEvents.cta_view, {
      ctaId: primary.id,
      href: primary.destination,
      label: primary.buttonLabel,
      variant: primary.variant,
      surface,
      serviceSlug,
    });
  }, [primary, surface, serviceSlug]);

  if (isBanner) {
    return (
      <Section
        id={id}
        spacing="none"
        className={cn('bg-white pb-14 md:pb-18 lg:pb-20', className)}
        aria-labelledby={headingId}
      >
        <Container size="xl">
          <div className="nl-final-banner px-6 py-12 text-center sm:px-10 md:py-16">
            <Stack gap="lg" className="mx-auto max-w-2xl items-center text-center sm:gap-7">
              <Heading
                as="h2"
                size="h2"
                id={headingId}
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                {title ?? primary.title}
              </Heading>
              {(description ?? primary.description) ? (
                <MutedText className="mx-auto max-w-xl text-base leading-relaxed text-white/95 sm:text-lg">
                  {description ?? primary.description}
                </MutedText>
              ) : null}
              <CTAButtonGroup
                primary={primary}
                secondary={secondary}
                additional={additional}
                surface={surface}
                serviceSlug={serviceSlug}
                align="center"
                tone="on-gradient"
                className="w-full gap-3 pt-1 sm:w-auto sm:flex-nowrap sm:gap-4"
              />
              {trustBadges && trustBadges.length > 0 ? (
                <ul className="flex max-w-[34rem] flex-wrap justify-center gap-2.5 pt-1">
                  {trustBadges.map((badge) => (
                    <li
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      <Check className="size-3.5 shrink-0 text-white" strokeWidth={2.75} aria-hidden />
                      {badge}
                    </li>
                  ))}
                </ul>
              ) : trustLine ? (
                <p className="max-w-[520px] text-sm leading-relaxed text-white/90">{trustLine}</p>
              ) : null}
            </Stack>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      spacing={aside ? 'none' : 'lg'}
      className={cn(
        'relative overflow-hidden bg-dark-band text-white',
        aside && 'py-16 md:py-20',
        className,
      )}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute -right-10 bottom-0 size-[28rem] rounded-full bg-[var(--brand-primary)]/30 blur-[100px] motion-safe:animate-[cta-glow_8s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-[18%] size-72 rounded-full bg-[#25F4EE]/15 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -left-16 size-64 rounded-full bg-white/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <div
          className={cn(
            aside &&
              'grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:items-center',
          )}
        >
          <Stack
            gap="lg"
            className={cn(
              'px-1 sm:gap-7',
              aside
                ? 'max-w-[35rem] items-start justify-center self-center text-left'
                : 'mx-auto max-w-2xl items-center text-center',
            )}
          >
            <Heading
              as="h2"
              size="h2"
              id={headingId}
              className={cn('text-white tracking-tight', aside && 'max-w-[560px]')}
            >
              {title ?? primary.title}
            </Heading>
            {(description ?? primary.description) ? (
              <MutedText
                className={cn(
                  'text-base leading-relaxed text-white/80',
                  aside ? 'max-w-[520px]' : 'max-w-xl',
                )}
              >
                {description ?? primary.description}
              </MutedText>
            ) : null}
            <CTAButtonGroup
              primary={primary}
              secondary={secondary}
              additional={additional}
              surface={surface}
              serviceSlug={serviceSlug}
              align={aside ? 'start' : 'center'}
              className="w-full gap-3 pt-1 sm:w-auto sm:flex-nowrap sm:gap-4"
            />
            {trustBadges && trustBadges.length > 0 ? (
              <ul className="flex max-w-[34rem] flex-wrap gap-2.5 pt-1">
                {trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85"
                  >
                    <Check className="size-3.5 shrink-0 text-emerald-300" strokeWidth={2.75} aria-hidden />
                    {badge}
                  </li>
                ))}
              </ul>
            ) : trustLine ? (
              <p className="max-w-[520px] text-sm leading-relaxed text-white/55">
                {trustLine}
              </p>
            ) : null}
          </Stack>
          {aside ? (
            <div
              className="relative mx-auto flex w-full max-w-[26rem] items-center justify-center justify-self-center overflow-visible lg:max-w-none lg:justify-self-end"
              aria-hidden
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

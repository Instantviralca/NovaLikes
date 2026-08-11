'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { TrustBadgeList } from '@/components/trust/TrustBadgeList';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import {
  getEnabledTrustBadges,
  getTrustCenterContent,
} from '@/data/content/trust';
import {
  trackTrustEvent,
  trustAnalyticsEvents,
} from '@/lib/analytics/trust-events';
import { cn } from '@/lib/utils';
import type { TrustCenterContent } from '@/types/trust';

export type TrustCenterProps = {
  /** Defaults to the shared Trust Center content module. */
  content?: TrustCenterContent;
  /**
   * Optional surface name for analytics (e.g. homepage, checkout, about).
   */
  surface?: string;
  /**
   * `full` shows every Trust Center block.
   * `compact` keeps header, badges, refund, support, and CTA.
   */
  variant?: 'full' | 'compact';
  className?: string;
  id?: string;
};

/**
 * Reusable Global Trust Center — Document 14.01.
 * Content comes from data/content/trust.ts; no hardcoded trust copy.
 */
export function TrustCenter({
  content = getTrustCenterContent(),
  surface,
  variant = 'full',
  className,
  id = 'trust-center',
}: TrustCenterProps) {
  const enabledBadges = getEnabledTrustBadges(content);
  const isCompact = variant === 'compact';

  useEffect(() => {
    trackTrustEvent(trustAnalyticsEvents.trust_component_view, { surface });
  }, [surface]);

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-muted/20', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <Stack gap="xl">
          {/* 1. Trust Header */}
          <div className="mx-auto max-w-3xl space-y-3 text-center sm:text-left sm:mx-0">
            <Heading as="h2" size="h2" id={`${id}-heading`}>
              {content.header.title}
            </Heading>
            <Lead className="text-pretty text-muted-foreground">
              {content.header.subtitle}
            </Lead>
          </div>

          {/* 2. Trust Badges */}
          <TrustBadgeList badges={enabledBadges} />

          {/* 3. Why Choose NovaLikes */}
          {!isCompact ? (
            <div className="space-y-6">
              <div className="max-w-2xl space-y-2">
                <Heading as="h3" size="h3" id={`${id}-why-heading`}>
                  {content.whyChoose.title}
                </Heading>
                <MutedText>{content.whyChoose.description}</MutedText>
              </div>
              <Grid cols={4} className="gap-4">
                {content.whyChoose.items.map((item) => (
                  <FeatureCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </Grid>
            </div>
          ) : null}

          {/* 4–7. Detail blocks */}
          <Grid cols={isCompact ? 1 : 2} className="gap-4">
            {!isCompact ? (
              <>
                <article
                  aria-labelledby={`${id}-secure-heading`}
                  className="rounded-lg border border-border bg-card p-5 md:p-6"
                >
                  <Heading as="h3" size="h4" id={`${id}-secure-heading`}>
                    {content.secureCheckout.title}
                  </Heading>
                  <Text className="mt-2 text-pretty text-muted-foreground">
                    {content.secureCheckout.description}
                  </Text>
                </article>
                <article
                  aria-labelledby={`${id}-password-heading`}
                  className="rounded-lg border border-border bg-card p-5 md:p-6"
                >
                  <Heading as="h3" size="h4" id={`${id}-password-heading`}>
                    {content.noPasswordRequired.title}
                  </Heading>
                  <Text className="mt-2 text-pretty text-muted-foreground">
                    {content.noPasswordRequired.description}
                  </Text>
                </article>
              </>
            ) : null}

            <article
              aria-labelledby={`${id}-refund-heading`}
              className="rounded-lg border border-border bg-card p-5 md:p-6"
            >
              <Heading as="h3" size="h4" id={`${id}-refund-heading`}>
                {content.refundAndRefill.title}
              </Heading>
              <Text className="mt-2 text-pretty text-muted-foreground">
                {content.refundAndRefill.description}
              </Text>
              <div className="mt-4">
                <Button asChild variant="link" className="min-h-11 px-0">
                  <Link
                    href={content.refundAndRefill.refundPolicyCta.href}
                    data-analytics={trustAnalyticsEvents.refund_policy_click}
                    onClick={() =>
                      trackTrustEvent(trustAnalyticsEvents.refund_policy_click, {
                        href: content.refundAndRefill.refundPolicyCta.href,
                        location: 'refund',
                        surface,
                      })
                    }
                  >
                    {content.refundAndRefill.refundPolicyCta.label}
                  </Link>
                </Button>
              </div>
            </article>

            <article
              aria-labelledby={`${id}-support-heading`}
              className="rounded-lg border border-border bg-card p-5 md:p-6"
            >
              <Heading as="h3" size="h4" id={`${id}-support-heading`}>
                {content.customerSupport.title}
              </Heading>
              <Text className="mt-2 text-pretty text-muted-foreground">
                {content.customerSupport.description}
              </Text>
              <div className="mt-4">
                <Button asChild variant="outline" className="min-h-11">
                  <Link
                    href={content.customerSupport.supportCta.href}
                    data-analytics={trustAnalyticsEvents.support_click}
                    onClick={() =>
                      trackTrustEvent(trustAnalyticsEvents.support_click, {
                        href: content.customerSupport.supportCta.href,
                        location: 'support',
                        surface,
                      })
                    }
                  >
                    {content.customerSupport.supportCta.label}
                  </Link>
                </Button>
              </div>
            </article>
          </Grid>

          {/* Conditional badge notes (eligible-only claims) */}
          {enabledBadges.some((badge) => badge.note) ? (
            <ul className="max-w-3xl space-y-1 text-sm text-muted-foreground">
              {enabledBadges
                .filter((badge) => badge.note)
                .map((badge) => (
                  <li key={`${badge.id}-note`}>
                    <span className="font-medium text-foreground">{badge.label}:</span>{' '}
                    {badge.note}
                  </li>
                ))}
            </ul>
          ) : null}

          {/* 8. Final CTA */}
          <div className="rounded-lg border border-border bg-card px-5 py-8 text-center md:px-8">
            <Heading as="h3" size="h3" id={`${id}-cta-heading`}>
              {content.finalCta.title}
            </Heading>
            <MutedText className="mx-auto mt-2 max-w-2xl">
              {content.finalCta.description}
            </MutedText>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
                <Link
                  href={content.finalCta.primaryCta.href}
                  data-analytics={trustAnalyticsEvents.trust_cta_click}
                  onClick={() =>
                    trackTrustEvent(trustAnalyticsEvents.trust_cta_click, {
                      href: content.finalCta.primaryCta.href,
                      cta: 'primary',
                      location: 'final',
                      surface,
                    })
                  }
                >
                  {content.finalCta.primaryCta.label}
                </Link>
              </Button>
              {content.finalCta.secondaryCta ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-11 w-full sm:w-auto"
                >
                  <Link
                    href={content.finalCta.secondaryCta.href}
                    data-analytics={trustAnalyticsEvents.support_click}
                    onClick={() =>
                      trackTrustEvent(trustAnalyticsEvents.support_click, {
                        href: content.finalCta.secondaryCta!.href,
                        cta: 'secondary',
                        location: 'final',
                        surface,
                      })
                    }
                  >
                    {content.finalCta.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

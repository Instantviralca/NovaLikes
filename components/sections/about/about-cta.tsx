'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  aboutAnalyticsEvents,
  trackAboutEvent,
} from '@/lib/analytics/about-events';
import type { CTAContent } from '@/types/content';

type AboutCtaButtonsProps = {
  primaryCta: CTAContent;
  secondaryCta?: CTAContent;
  location: 'hero' | 'final';
  align?: 'center' | 'start' | 'responsive';
};

/** Hero / final CTA buttons with typed about analytics events. */
export function AboutCtaButtons({
  primaryCta,
  secondaryCta,
  location,
  align = 'center',
}: AboutCtaButtonsProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap',
        align === 'start' && 'sm:justify-start',
        align === 'center' && 'sm:justify-center',
        align === 'responsive' && 'sm:justify-center lg:justify-start',
      )}
    >
      <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
        <Link
          href={primaryCta.href}
          data-analytics={aboutAnalyticsEvents.about_cta_click}
          onClick={() =>
            trackAboutEvent(aboutAnalyticsEvents.about_cta_click, {
              href: primaryCta.href,
              cta: 'primary',
              location,
            })
          }
        >
          {primaryCta.label}
        </Link>
      </Button>
      {secondaryCta ? (
        <Button asChild size="lg" variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link
            href={secondaryCta.href}
            data-analytics={aboutAnalyticsEvents.about_cta_click}
            onClick={() =>
              trackAboutEvent(aboutAnalyticsEvents.about_cta_click, {
                href: secondaryCta.href,
                cta: 'secondary',
                location,
              })
            }
          >
            {secondaryCta.label}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

type AboutFinalBannerCtaProps = {
  href: string;
  label: string;
};

/** Orange About banner CTA — white button with analytics. */
export function AboutFinalBannerCta({ href, label }: AboutFinalBannerCtaProps) {
  return (
    <Button
      asChild
      size="lg"
      className="min-h-11 shrink-0 border-0 bg-white text-[var(--brand-primary)] hover:bg-white/95 hover:text-[var(--brand-primary-hover)]"
    >
      <Link
        href={href}
        data-analytics={aboutAnalyticsEvents.about_cta_click}
        onClick={() =>
          trackAboutEvent(aboutAnalyticsEvents.about_cta_click, {
            href,
            cta: 'primary',
            location: 'final',
          })
        }
      >
        {label}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Button>
  );
}

/** Fires about_page_view once on mount (no-op until a vendor is wired). */
export function AboutPageViewTracker() {
  useEffect(() => {
    trackAboutEvent(aboutAnalyticsEvents.about_page_view);
  }, []);

  return null;
}

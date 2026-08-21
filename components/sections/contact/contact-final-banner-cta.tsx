'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  contactAnalyticsEvents,
  trackContactEvent,
} from '@/lib/analytics/contact-events';

type ContactFinalBannerCtaProps = {
  href: string;
  label: string;
};

/** Orange Contact banner CTA. */
export function ContactFinalBannerCta({ href, label }: ContactFinalBannerCtaProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        asChild
        size="lg"
        className="min-h-11 shrink-0 border-0 bg-white text-[var(--brand-primary)] hover:bg-white/95 hover:text-[var(--brand-primary-hover)]"
      >
        <Link
          href={href}
          onClick={() =>
            trackContactEvent(contactAnalyticsEvents.contact_track_order_click, {
              href,
              cta: 'primary',
              location: 'final',
            })
          }
        >
          <MessageCircle className="size-4 text-[var(--brand-primary)]" aria-hidden />
          {label}
        </Link>
      </Button>
      <p className="text-xs text-white/90">We&apos;re online 24/7</p>
    </div>
  );
}

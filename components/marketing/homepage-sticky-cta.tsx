'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { runWhenIdle } from '@/lib/perf/run-when-idle';
import { cn } from '@/lib/utils';

/**
 * Mobile sticky conversion bar for the homepage.
 * Hidden while the hero CTAs are in view; hidden again near the final CTA.
 */
export function HomepageStickyCta({
  href = '#services-overview',
  label = 'Explore services',
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  const { ui } = useI18nChrome();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const cancelIdle = runWhenIdle(() => {
      const hero = document.getElementById('homepage-hero');
      const finalCta = document.getElementById('home-final-cta');
      if (!hero) return;

      let heroInView = true;
      let finalInView = false;

      const update = () => setVisible(!heroInView && !finalInView);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target.id === 'homepage-hero') {
              heroInView = entry.isIntersecting;
            }
            if (entry.target.id === 'home-final-cta') {
              finalInView = entry.isIntersecting;
            }
          }
          update();
        },
        { root: null, threshold: 0.12, rootMargin: '-40px 0px 0px 0px' },
      );

      observer.observe(hero);
      if (finalCta) observer.observe(finalCta);
    }, 500);

    return () => {
      cancelIdle();
      observer?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-white/95 p-3 shadow-[0_-12px_40px_-24px_rgba(28,25,23,0.35)] backdrop-blur lg:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className,
      )}
      role="region"
      aria-label={ui.homepage.exploreServicesAria}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-[var(--text-secondary)]">
            Instagram · TikTok · Facebook
          </p>
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {ui.commerce.noPassword} · {ui.commerce.secureCheckout}
          </p>
        </div>
        <Button asChild className="min-h-11 max-w-[11rem] shrink-0 rounded-xl px-4 font-semibold sm:max-w-none sm:px-5">
          <Link href={href}>{label}</Link>
        </Button>
      </div>
    </div>
  );
}

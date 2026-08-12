'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    const hero = document.getElementById('homepage-hero');
    const finalCta = document.getElementById('home-final-cta');
    if (!hero) return;

    let heroInView = true;
    let finalInView = false;

    const update = () => setVisible(!heroInView && !finalInView);

    const observer = new IntersectionObserver(
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

    return () => observer.disconnect();
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
      aria-label="Explore NovaLikes services"
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-[var(--text-secondary)]">
            Instagram · TikTok · Facebook · YouTube
          </p>
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            No password · Secure checkout
          </p>
        </div>
        <Button asChild className="min-h-11 shrink-0 rounded-xl px-5 font-semibold">
          <Link href={href}>{label}</Link>
        </Button>
      </div>
    </div>
  );
}

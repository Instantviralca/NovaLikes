'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { cn } from '@/lib/utils';

export type ServiceStickyOrderBarProps = {
  /** DOM id of the pricing section (without #). */
  pricingSectionId: string;
  ctaLabel?: string;
  priceLabel?: string;
  onOrder?: () => void;
  className?: string;
};

/**
 * Lightweight mobile sticky purchase bar — mirrors cart/checkout sticky pattern.
 * Shown only when the pricing section is out of view. No layout shift on desktop.
 */
export function ServiceStickyOrderBar({
  pricingSectionId,
  ctaLabel,
  priceLabel,
  onOrder,
  className,
}: ServiceStickyOrderBarProps) {
  const { locale, ui } = useI18nChrome();
  const resolvedCta = ctaLabel ?? ui.commerce.choosePackage;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(pricingSectionId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry?.isIntersecting);
      },
      { root: null, threshold: 0.08, rootMargin: '-48px 0px 0px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pricingSectionId]);

  if (!visible) return null;

  const scrollToPricing = () => {
    const target = document.getElementById(pricingSectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-white/95 p-3 shadow-[var(--shadow-lg)] backdrop-blur lg:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className,
      )}
      role="region"
      aria-label={resolvedCta}
      data-analytics="service-sticky-order-bar"
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          {locale === 'en' ? (
            <p className="truncate text-xs text-[var(--text-secondary)]">Ready to order?</p>
          ) : null}
          {priceLabel ? (
            <p className="truncate text-base font-bold text-[var(--brand-primary)]">{priceLabel}</p>
          ) : (
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {ui.commerce.choosePackage}
            </p>
          )}
        </div>
        <Button
          type="button"
          className="min-h-11 max-w-[11rem] shrink-0 rounded-xl px-4 font-semibold sm:max-w-none sm:px-5"
          onClick={() => {
            if (onOrder) {
              onOrder();
              return;
            }
            scrollToPricing();
          }}
        >
          {resolvedCta}
        </Button>
      </div>
    </div>
  );
}

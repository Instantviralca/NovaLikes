'use client';

import { useEffect, useRef } from 'react';

import { SvcV1Icon } from '@/components/marketing/service-v1/icons';

type V1StickyCtaProps = {
  label: string;
  /** When true and `onOrder` is set, click runs the order handler. */
  hasSelection?: boolean;
  onOrder?: () => void;
};

/**
 * Mobile sticky CTA (`.sticky-cta`). Hides with `.away` while `#pricing-packages`
 * is on screen (IntersectionObserver threshold 0.05). Desktop: none via CSS.
 */
export function V1StickyCta({ label, hasSelection, onOrder }: V1StickyCtaProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sticky = ref.current;
    const picker = document.getElementById('pricing-packages');
    if (!sticky || !picker || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        sticky.classList.toggle('away', Boolean(entries[0]?.isIntersecting));
      },
      { threshold: 0.05 },
    );
    io.observe(picker);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className="sticky-cta"
      onClick={() => {
        if (onOrder && hasSelection) {
          onOrder();
          return;
        }
        document.getElementById('pricing-packages')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }}
    >
      {label}
      <SvcV1Icon name="arrow-right" />
    </button>
  );
}

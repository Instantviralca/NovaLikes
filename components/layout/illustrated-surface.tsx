import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Tools-hub / marketing card chrome — homepage tokens. */
export const ILLUSTRATED_CARD =
  'rounded-2xl border border-[var(--nl-border)] bg-white shadow-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md';

export const ILLUSTRATED_CTA =
  'overflow-hidden rounded-[2.25rem] bg-[var(--nl-bg-soft)] px-6 py-12 sm:px-10 md:px-14 md:py-14';

/** Soft wash only — no doodle marks (stray lines/stars removed sitewide). */
export function HeroWash({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none', className)}
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 45% 55% at 85% 15%, rgb(255 92 0 / 0.07), transparent 70%), radial-gradient(ellipse 40% 50% at 10% 80%, rgb(241 243 247 / 0.9), transparent 70%)',
      }}
    />
  );
}

/** @deprecated Kept as no-op so tool pages that still import it stay mark-free. */
export function PageDoodles({ className }: { className?: string }) {
  return <div className={className} aria-hidden="true" />;
}

export function IllustratedMain({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn('relative flex-1 bg-[var(--nl-bg)]', className)}>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden={true}
      >
        <HeroWash className="absolute inset-x-0 top-0 h-[36rem] w-full" />
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}

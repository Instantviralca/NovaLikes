import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Tools-hub card chrome — reuse on marketing pages without changing copy. */
export const ILLUSTRATED_CARD =
  'rounded-[1.25rem] border-0 bg-white shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]';

export const ILLUSTRATED_CTA =
  'overflow-hidden rounded-[2.25rem] bg-[#FFF1E4] px-6 py-12 sm:px-10 md:px-14 md:py-14';

export function HeroWash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <ellipse cx="1180" cy="80" rx="320" ry="220" fill="#FFE8D4" opacity="0.55" />
      <ellipse cx="1280" cy="420" rx="180" ry="160" fill="#F3EBFF" opacity="0.5" />
      <ellipse cx="120" cy="520" rx="240" ry="180" fill="#FFF0E2" opacity="0.7" />
      <ellipse cx="80" cy="40" rx="160" ry="110" fill="#F6EEFF" opacity="0.45" />
    </svg>
  );
}

export function PageDoodles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 2800" preserveAspectRatio="none" className={className} aria-hidden="true">
      <g fill="none" stroke="#E8B48A" strokeWidth="1.4" opacity="0.55">
        <path d="M70 90 l8 0 M74 86 l0 8" />
        <path d="M1360 180 l8 0 M1364 176 l0 8" />
        <path d="M90 980 l8 0 M94 976 l0 8" />
        <path d="M1320 1480 l8 0 M1324 1476 l0 8" />
        <path d="M40 2100 l8 0 M44 2096 l0 8" />
      </g>
      <g fill="#E8B48A" opacity="0.45">
        <circle cx="110" cy="240" r="2.2" />
        <circle cx="1380" cy="520" r="2.2" />
        <circle cx="60" cy="760" r="2" />
        <circle cx="1400" cy="1100" r="2.2" />
        <circle cx="80" cy="1680" r="2" />
        <circle cx="1340" cy="1980" r="2.2" />
      </g>
      <g fill="#C9B6F2" opacity="0.5">
        <path d="M180 160 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
        <path d="M1260 860 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
        <path d="M200 1320 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
        <path d="M1180 2320 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
      </g>
      <path
        d="M80 640 C 200 600, 280 700, 400 660"
        stroke="#E8B48A"
        strokeWidth="1.3"
        strokeDasharray="5 7"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M1080 1760 C 1180 1720, 1280 1820, 1380 1768"
        stroke="#C9B6F2"
        strokeWidth="1.3"
        strokeDasharray="5 7"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function IllustratedMain({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn('relative flex-1 bg-[#FFFBFA]', className)}>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden={true}
      >
        <PageDoodles className="absolute inset-0 h-full min-h-full w-full" />
        <HeroWash className="absolute inset-x-0 top-0 h-[36rem] w-full" />
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}

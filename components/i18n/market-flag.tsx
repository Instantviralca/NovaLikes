import type { ReactNode } from 'react';

import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';

function FlagDisk({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'relative inline-flex size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10',
        className,
      )}
      aria-hidden="true"
      title={label}
    >
      <svg viewBox="0 0 32 32" className="size-full" focusable="false">
        {children}
      </svg>
    </span>
  );
}

function CaFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#FF0000" />
      <rect x="8" width="16" height="32" fill="#fff" />
      <path
        d="M16 6.5 17.4 10.2H21.3L18 12.6 19.4 16.3 16 13.9 12.6 16.3 14 12.6 10.7 10.2H14.6Z"
        fill="#FF0000"
      />
    </>
  );
}

function AuFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#012169" />
      <rect width="16" height="16" fill="#012169" />
      <path d="M0 0 L16 8 L0 16 Z" fill="#fff" opacity="0.95" />
      <path d="M0 0 L16 8 L0 16 Z" fill="#C8102E" opacity="0.55" transform="scale(0.55) translate(0 2)" />
      <circle cx="22" cy="22" r="5" fill="#fff" />
      <circle cx="22" cy="22" r="3.2" fill="#C8102E" />
    </>
  );
}

function UsFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#B22234" />
      <rect y="4.57" width="32" height="4.57" fill="#fff" />
      <rect y="13.71" width="32" height="4.57" fill="#fff" />
      <rect y="22.86" width="32" height="4.57" fill="#fff" />
      <rect width="16" height="16" fill="#3C3B6E" />
    </>
  );
}

function UkFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#012169" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2.5" />
      <path d="M16 0 V32 M0 16 H32" stroke="#fff" strokeWidth="10" />
      <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="6" />
    </>
  );
}

function GlobalFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#E8E4DF" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="#6B6560" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="4.5" ry="10" fill="none" stroke="#6B6560" strokeWidth="1.2" />
      <path d="M6 16 H26 M8.5 10 H23.5 M8.5 22 H23.5" stroke="#6B6560" strokeWidth="1.2" />
    </>
  );
}

export function MarketFlag({ market, className }: { market: Market | 'global'; className?: string }) {
  switch (market) {
    case 'global':
      return (
        <FlagDisk label="International English" className={className}>
          <GlobalFlag />
        </FlagDisk>
      );
    case 'ca':
      return (
        <FlagDisk label="Canada" className={className}>
          <CaFlag />
        </FlagDisk>
      );
    case 'au':
      return (
        <FlagDisk label="Australia" className={className}>
          <AuFlag />
        </FlagDisk>
      );
    case 'us':
      return (
        <FlagDisk label="United States" className={className}>
          <UsFlag />
        </FlagDisk>
      );
    case 'uk':
      return (
        <FlagDisk label="United Kingdom" className={className}>
          <UkFlag />
        </FlagDisk>
      );
  }
}

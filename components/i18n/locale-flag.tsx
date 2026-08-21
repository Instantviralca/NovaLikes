import type { ReactNode } from 'react';

import type { Locale } from '@/lib/i18n/config';
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

function UsFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#B22234" />
      <rect y="4.57" width="32" height="4.57" fill="#fff" />
      <rect y="13.71" width="32" height="4.57" fill="#fff" />
      <rect y="22.86" width="32" height="4.57" fill="#fff" />
      <rect width="16" height="16" fill="#3C3B6E" />
      <circle cx="4" cy="4" r="0.7" fill="#fff" />
      <circle cx="8" cy="4" r="0.7" fill="#fff" />
      <circle cx="12" cy="4" r="0.7" fill="#fff" />
      <circle cx="6" cy="7.5" r="0.7" fill="#fff" />
      <circle cx="10" cy="7.5" r="0.7" fill="#fff" />
      <circle cx="4" cy="11" r="0.7" fill="#fff" />
      <circle cx="8" cy="11" r="0.7" fill="#fff" />
      <circle cx="12" cy="11" r="0.7" fill="#fff" />
    </>
  );
}

export function LocaleFlag({ locale, className }: { locale: Locale; className?: string }) {
  switch (locale) {
    case 'en':
      return (
        <FlagDisk label="English" className={className}>
          <UsFlag />
        </FlagDisk>
      );
    case 'es':
      return (
        <FlagDisk label="Español" className={className}>
          <rect width="32" height="32" fill="#AA151B" />
          <rect y="8" width="32" height="16" fill="#F1BF00" />
        </FlagDisk>
      );
    case 'de':
      return (
        <FlagDisk label="Deutsch" className={className}>
          <rect width="32" height="10.67" fill="#000" />
          <rect y="10.67" width="32" height="10.67" fill="#DD0000" />
          <rect y="21.33" width="32" height="10.67" fill="#FFCE00" />
        </FlagDisk>
      );
    case 'fr':
      return (
        <FlagDisk label="Français" className={className}>
          <rect width="10.67" height="32" fill="#002395" />
          <rect x="10.67" width="10.67" height="32" fill="#fff" />
          <rect x="21.33" width="10.67" height="32" fill="#ED2939" />
        </FlagDisk>
      );
    case 'it':
      return (
        <FlagDisk label="Italiano" className={className}>
          <rect width="10.67" height="32" fill="#009246" />
          <rect x="10.67" width="10.67" height="32" fill="#fff" />
          <rect x="21.33" width="10.67" height="32" fill="#CE2B37" />
        </FlagDisk>
      );
    case 'pt-br':
      return (
        <FlagDisk label="Português (Brasil)" className={className}>
          <rect width="32" height="32" fill="#009B3A" />
          <polygon points="16,4 28,16 16,28 4,16" fill="#FEDD00" />
          <circle cx="16" cy="16" r="6" fill="#002776" />
        </FlagDisk>
      );
    case 'ar':
      return (
        <FlagDisk label="العربية" className={className}>
          <rect width="32" height="32" fill="#006C35" />
          <path
            d="M10 18c0-5 4-9 9-9 1.8 0 3.4.5 4.8 1.4-2.2-1-4.7-1-7-.1-3.6 1.5-6 5-6 9 0 1.2.2 2.3.6 3.4-.8-1.4-1.4-3-1.4-4.7z"
            fill="#fff"
          />
          <polygon points="22,10 23.1,13.2 26.5,13.2 23.7,15.1 24.8,18.3 22,16.4 19.2,18.3 20.3,15.1 17.5,13.2 20.9,13.2" fill="#fff" />
        </FlagDisk>
      );
  }
}

import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/config/site';
import { cn } from '@/lib/utils';

/** Primary brand mark used in the site header. */
export const SITE_LOGO_SRC = '/assets/logos/logo.svg' as const;
export const SITE_LOGO_WHITE_SRC = '/assets/logos/logo-white.svg' as const;

export interface LogoProps {
  src?: string;
  /** When null/empty, render the mark without a link. */
  href?: string | null;
  className?: string;
  alt?: string;
  /** Use the light wordmark for dark backgrounds. */
  variant?: 'default' | 'white';
}

export function Logo({
  src,
  href = '/',
  className,
  alt = site.name,
  variant = 'default',
}: LogoProps) {
  const resolvedSrc =
    src ?? (variant === 'white' ? SITE_LOGO_WHITE_SRC : SITE_LOGO_SRC);

  const mark = (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={176}
      height={40}
      className="h-8 w-auto sm:h-9"
      priority
      unoptimized={resolvedSrc.endsWith('.svg')}
    />
  );

  if (!href) {
    return (
      <span className={cn('inline-flex shrink-0 items-center', className)} aria-label={site.name}>
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label={site.name}
    >
      {mark}
    </Link>
  );
}

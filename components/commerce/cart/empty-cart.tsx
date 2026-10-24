'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { routes } from '@/config/routes';
import { localizeHref } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';

type EmptyCartProps = {
  className?: string;
  /** Compact variant for the drawer. */
  compact?: boolean;
  onNavigate?: () => void;
};

export function EmptyCart({ className, compact = false, onNavigate }: EmptyCartProps) {
  const { locale, ui } = useI18nChrome();
  const href = localizeHref(routes.services, locale);

  if (compact) {
    return (
      <div className={cn('text-center', className)} role="status">
        <p style={{ font: '800 15px var(--nl-body)', margin: '0 0 6px' }}>{ui.cart.emptyTitle}</p>
        <p style={{ font: '600 13px var(--nl-body)', color: 'var(--body)', margin: '0 0 14px' }}>
          {ui.cart.emptyBody}
        </p>
        <Link className="btn" href={href} onClick={onNavigate} style={{ height: 40, fontSize: 14 }}>
          {ui.cart.browseServices}
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('empty-cart', className)} role="status">
      <span className="ec">
        <ShoppingBag className="ic" aria-hidden="true" />
      </span>
      <h1 className="h1">{ui.cart.emptyTitle}</h1>
      <p>{ui.cart.emptyBody}</p>
      <Link className="btn" href={href} onClick={onNavigate}>
        {ui.cart.browseServices}
        <ArrowRight className="ic" aria-hidden="true" />
      </Link>
    </div>
  );
}

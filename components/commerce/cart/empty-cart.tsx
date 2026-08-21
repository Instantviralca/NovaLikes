'use client';

import Link from 'next/link';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { localizeHref } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';

type EmptyCartProps = {
  className?: string;
};

export function EmptyCart({ className }: EmptyCartProps) {
  const { locale, ui } = useI18nChrome();
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center',
        className,
      )}
      role="status"
    >
      <p className="text-lg font-medium">{ui.cart.emptyTitle}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{ui.cart.emptyBody}</p>
      <Button asChild size="lg">
        <Link href={localizeHref(routes.home, locale)}>{ui.cart.browseServices}</Link>
      </Button>
    </div>
  );
}

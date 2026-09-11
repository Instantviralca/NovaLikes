'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Minus, Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { localizeHref } from '@/lib/i18n/paths';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import { computeLineTotal, normalizeLineQuantity } from '@/lib/orders/line-quantity';
import { formatMoney } from '@/lib/pricing/format';
import type { CartItem } from '@/types/cart';
import type { PlatformId } from '@/types/platform';
import { cn } from '@/lib/utils';

type CartItemProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  className?: string;
};

const PLATFORM_ICON: Record<string, string> = {
  instagram: '/assets/platforms/instagram.svg',
  tiktok: '/assets/platforms/tiktok.svg',
  youtube: '/assets/platforms/youtube.svg',
  facebook: '/assets/platforms/facebook.svg',
};

export function CartItemRow({
  item,
  onRemove,
  onIncrement,
  onDecrement,
  className,
}: CartItemProps) {
  const { locale, ui } = useI18nChrome();
  const detailEntries = Object.entries(item.configuration).filter(
    ([, value]) => value !== '' && value !== undefined,
  );
  const platform = item.platformId as PlatformId;
  const icon = PLATFORM_ICON[platform];
  const lineQuantity = normalizeLineQuantity(item.lineQuantity);
  const lineTotal = computeLineTotal(item.unitPrice, lineQuantity);

  return (
    <li
      className={cn(
        'rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]',
        className,
      )}
      data-analytics="cart-item"
      data-package-id={item.packageId}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            {icon ? (
              <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--surface-muted)]">
                <Image src={icon} alt="" width={20} height={20} className="size-5" unoptimized />
              </span>
            ) : null}
            <p className="text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              {item.serviceName}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              {localizePackageDisplayName(item.quantityLabel, locale)}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {localizePackageDisplayName(item.packageTitle, locale)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-[var(--text-secondary)]" dir="ltr">
              {formatMoney(item.unitPrice, item.currency)} each
            </p>
            <p className="text-2xl font-bold text-[var(--brand-primary)]" dir="ltr">
              {formatMoney(lineTotal, item.currency)}
            </p>
          </div>
          {item.deliveryTime ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
              <Clock3 className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              {ui.cart.delivery}: {item.deliveryTime}
            </span>
          ) : null}
          {detailEntries.length > 0 ? (
            <ul className="mt-1 flex flex-wrap gap-2">
              {detailEntries.map(([key, value]) => (
                <li
                  key={key}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs"
                >
                  <span className="font-semibold text-[var(--text-primary)] capitalize">{key}</span>
                  <span className="text-[var(--text-muted)]"> · </span>
                  <span className="font-medium text-[var(--text-secondary)]" dir="ltr">
                    {String(value)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <div className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--border-subtle)] p-1 sm:self-end">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8"
              aria-label="Decrease quantity"
              disabled={!onDecrement || lineQuantity <= 1}
              onClick={() => onDecrement?.(item.id)}
            >
              <Minus className="size-3.5" aria-hidden="true" />
            </Button>
            <span className="min-w-[2rem] text-center text-sm font-semibold" aria-live="polite">
              {lineQuantity}
            </span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8"
              aria-label="Increase quantity"
              disabled={!onIncrement}
              onClick={() => onIncrement?.(item.id)}
            >
              <Plus className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline" className="rounded-lg">
              <Link href={localizeHref(`/${item.serviceSlug}`, locale)}>
                <Pencil className="size-3.5" aria-hidden="true" />
                {ui.cart.edit}
              </Link>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-[var(--color-error)] hover:bg-red-50 hover:text-[var(--color-error)]"
              data-analytics="cart-remove"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              {ui.cart.remove}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export { CartItemRow as CartItem };

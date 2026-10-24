'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

import { SiteV2PlatformTile } from '@/components/site-v2/platform-tile';
import {
  getCartItemDestination,
  getCartItemPrices,
  getCartItemTitle,
} from '@/components/site-v2/cart-helpers';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { localizeHref } from '@/lib/i18n/paths';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import { formatMoney } from '@/lib/pricing/format';
import type { CartItem } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartItemProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  className?: string;
};

export function CartItemRow({ item, onRemove, className }: CartItemProps) {
  const { locale, ui } = useI18nChrome();
  const title = localizePackageDisplayName(getCartItemTitle(item), locale);
  const dest = getCartItemDestination(item);
  const { price, compareAt, currency } = getCartItemPrices(item);

  return (
    <div
      className={cn('ci', className)}
      data-analytics="cart-item"
      data-package-id={item.packageId}
      role="listitem"
    >
      <SiteV2PlatformTile platformId={item.platformId} />
      <div>
        <b>{title}</b>
        {dest ? (
          <span className="dest" dir="ltr" title={dest}>
            {dest}
          </span>
        ) : null}
        <div className="acts">
          <Link href={localizeHref(`/${item.serviceSlug}`, locale)} prefetch={false}>
            <Pencil className="ic" aria-hidden="true" />
            {ui.cart.edit}
          </Link>
          <button
            type="button"
            data-analytics="cart-remove"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="ic" aria-hidden="true" />
            {ui.cart.remove}
          </button>
        </div>
      </div>
      <div className="pr">
        <b dir="ltr">{formatMoney(price, currency)}</b>
        {compareAt ? (
          <s dir="ltr">{formatMoney(compareAt, currency)}</s>
        ) : null}
      </div>
    </div>
  );
}

export { CartItemRow as CartItem };

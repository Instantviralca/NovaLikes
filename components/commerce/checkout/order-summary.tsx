'use client';

import { formatMoney } from '@/lib/pricing/format';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { SiteV2PlatformTile } from '@/components/site-v2/platform-tile';
import {
  getCartItemDestination,
  getCartItemPrices,
  getCartItemTitle,
} from '@/components/site-v2/cart-helpers';
import type { CartItem, CartTotals } from '@/types/cart';
import { cn } from '@/lib/utils';

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  totals: CartTotals;
  className?: string;
  /** Navy panel variant (checkout left / mobile summary). */
  variant?: 'panel' | 'navy';
  couponCode?: string | null;
};

function SummaryLines({
  items,
  totals,
  couponCode,
}: {
  items: CartItem[];
  totals: CartTotals;
  couponCode?: string | null;
}) {
  const { locale, ui } = useI18nChrome();
  const discountLabel =
    totals.discount.amount > 0 && couponCode
      ? `${ui.cart.discount} (${couponCode})`
      : ui.cart.discount;

  return (
    <>
      <div className="co-lines">
        {items.map((item) => {
          const title = localizePackageDisplayName(getCartItemTitle(item), locale);
          const dest = getCartItemDestination(item);
          const { price, compareAt, currency } = getCartItemPrices(item);
          return (
            <div className="co-line" key={item.id}>
              <SiteV2PlatformTile platformId={item.platformId} />
              <span>
                <b>{title}</b>
                {dest ? <em dir="ltr">{dest}</em> : null}
              </span>
              <span className="p" dir="ltr">
                {formatMoney(price, currency)}
                {compareAt ? <s>{formatMoney(compareAt, currency)}</s> : null}
              </span>
            </div>
          );
        })}
      </div>
      <div className="co-sub">
        <div>
          <span>{ui.cart.subtotal}</span>
          <span dir="ltr">{formatMoney(totals.subtotal.amount, totals.subtotal.currency)}</span>
        </div>
        {totals.discount.amount > 0 ? (
          <div className="disc">
            <span>{discountLabel}</span>
            <span dir="ltr">
              −{formatMoney(totals.discount.amount, totals.discount.currency)}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}

export function CheckoutOrderSummary({
  items,
  totals,
  className,
  variant = 'panel',
  couponCode,
}: CheckoutOrderSummaryProps) {
  const { ui } = useI18nChrome();

  if (variant === 'navy') {
    return (
      <div className={cn(className)} aria-label={ui.cart.orderSummary}>
        <SummaryLines items={items} totals={totals} couponCode={couponCode} />
      </div>
    );
  }

  return (
    <aside className={cn('panel', className)} aria-label={ui.cart.orderSummary}>
      <div className="panel-head">
        <b>{ui.cart.orderSummary}</b>
      </div>
      <div className="sum">
        <SummaryLines items={items} totals={totals} couponCode={couponCode} />
      </div>
    </aside>
  );
}

'use client';

import { Check, Lock } from 'lucide-react';

import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { CouponForm } from '@/components/commerce/cart/coupon-form';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import { formatMoney } from '@/lib/pricing/format';
import type { CartTotals } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartSummaryProps = {
  totals: CartTotals;
  className?: string;
  couponCode?: string | null;
};

export function CartSummary({ totals, className, couponCode }: CartSummaryProps) {
  const { ui } = useI18nChrome();
  const copy = SITE_V2_COPY.cart;
  const discountLabel =
    totals.discount.amount > 0 && couponCode
      ? `${ui.cart.discount} (${couponCode})`
      : ui.cart.discount;

  return (
    <aside className={cn('panel', className)} aria-label={ui.cart.orderSummary}>
      <div className="panel-head">
        <b>{ui.cart.orderSummary}</b>
      </div>
      <div className="sum">
        <div className="sum-row">
          <span>{ui.cart.subtotal}</span>
          <span dir="ltr">{formatMoney(totals.subtotal.amount, totals.subtotal.currency)}</span>
        </div>
        {totals.discount.amount > 0 ? (
          <div className="sum-row disc">
            <span>{discountLabel}</span>
            <span dir="ltr">
              −{formatMoney(totals.discount.amount, totals.discount.currency)}
            </span>
          </div>
        ) : null}
        <CouponForm />
        <div className="sum-row total">
          <span>{ui.cart.total}</span>
          <b dir="ltr" aria-live="polite">
            {formatMoney(totals.total.amount, totals.total.currency)}
          </b>
        </div>
        <CheckoutButton
          tone="siteV2"
          showArrow
          disabled={totals.itemCount === 0}
          label={ui.cart.continueToCheckout}
        />
        <p className="fine">
          <Lock className="ic" aria-hidden="true" />
          {copy.pageFine}
        </p>
      </div>
      <ul className="trust-list">
        {copy.trust.map((item) => (
          <li key={item}>
            <Check className="ic" strokeWidth={3} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

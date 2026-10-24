'use client';

import { useState } from 'react';
import { Ticket } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { useApplyCouponCode, useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

type CouponFormProps = {
  className?: string;
  /** Hide the ticket icon in the input (checkout collapsible). */
  hideIcon?: boolean;
};

export function CouponForm({ className, hideIcon = false }: CouponFormProps) {
  const cart = useCart();
  const applyCode = useApplyCouponCode();
  const { ui } = useI18nChrome();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | undefined>();

  if (cart.coupon) {
    return (
      <div className={cn('coupon-applied', className)}>
        <p style={{ font: '700 14px var(--nl-body)', margin: 0 }}>
          {ui.cart.coupon}{' '}
          <span dir="ltr" style={{ fontWeight: 800 }}>
            {cart.coupon.code}
          </span>{' '}
          {ui.cart.couponApplied}
        </p>
        <button
          type="button"
          className="tlink"
          style={{ marginTop: 8, fontSize: 13 }}
          onClick={() => {
            cart.removeCoupon();
            setMessage(undefined);
          }}
        >
          {ui.cart.removeCoupon}
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        className="coupon"
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await applyCode(code);
          setMessage(result.ok ? ui.cart.couponAppliedShort : result.message);
        }}
      >
        <label className="sr" htmlFor="coupon-code">
          {ui.cart.couponCode}
        </label>
        <div className="input">
          {!hideIcon ? <Ticket className="ic" aria-hidden="true" /> : null}
          <input
            id="coupon-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={ui.cart.couponPlaceholder}
            autoComplete="off"
            dir="ltr"
          />
        </div>
        <button className="btn dark" type="submit">
          {ui.cart.apply}
        </button>
      </form>
      {message ? (
        <p className="hint" style={{ marginTop: 6 }} role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}

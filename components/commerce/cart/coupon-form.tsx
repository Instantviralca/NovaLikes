'use client';

import { useState } from 'react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApplyCouponCode, useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

type CouponFormProps = {
  className?: string;
};

export function CouponForm({ className }: CouponFormProps) {
  const cart = useCart();
  const applyCode = useApplyCouponCode();
  const { ui } = useI18nChrome();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | undefined>();

  if (cart.coupon) {
    return (
      <div className={cn('space-y-2', className)}>
        <p className="text-sm">
          {ui.cart.coupon}{' '}
          <span className="font-medium" dir="ltr">
            {cart.coupon.code}
          </span>{' '}
          {ui.cart.couponApplied}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            cart.removeCoupon();
            setMessage(undefined);
          }}
        >
          {ui.cart.removeCoupon}
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn('space-y-2', className)}
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await applyCode(code);
        setMessage(result.ok ? ui.cart.couponAppliedShort : result.message);
      }}
    >
      <Label htmlFor="coupon-code" className="text-xs font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
        {ui.cart.couponCode}
      </Label>
      <div className="flex gap-2">
        <Input
          id="coupon-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={ui.cart.couponPlaceholder}
          autoComplete="off"
          dir="ltr"
          className="h-10 rounded-xl border-[var(--border-subtle)]"
        />
        <Button type="submit" variant="outline" className="h-10 rounded-xl px-4">
          {ui.cart.apply}
        </Button>
      </div>
      {message ? (
        <p className="text-xs text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

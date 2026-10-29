'use client';

import { Ticket } from 'lucide-react';

import { CouponForm } from '@/components/commerce/cart/coupon-form';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';

export function CouponSection() {
  const { ui } = useI18nChrome();
  return (
    <details className="co-coupon">
      <summary>
        <Ticket className="ic" aria-hidden="true" />
        {ui.checkout.haveCoupon}
      </summary>
      <CouponForm hideIcon />
    </details>
  );
}

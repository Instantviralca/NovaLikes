'use client';

import { Ticket } from 'lucide-react';

import { CouponForm } from '@/components/commerce/cart/coupon-form';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';

export function CouponSection() {
  return (
    <details className="co-coupon">
      <summary>
        <Ticket className="ic" aria-hidden="true" />
        {SITE_V2_COPY.checkout.haveCoupon}
      </summary>
      <CouponForm hideIcon />
    </details>
  );
}

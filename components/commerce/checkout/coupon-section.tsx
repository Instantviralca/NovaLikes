'use client';

import { CouponForm } from '@/components/commerce/cart/coupon-form';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';

export function CouponSection() {
  const { ui } = useI18nChrome();
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{ui.cart.coupon}</h3>
      <CouponForm />
    </div>
  );
}

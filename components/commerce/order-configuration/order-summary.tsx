'use client';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { formatMoney } from '@/lib/pricing/format';
import type { PricingPackage } from '@/types/pricing';

type OrderSummaryProps = {
  pkg: PricingPackage;
  className?: string;
};

export function OrderSummary({ pkg, className }: OrderSummaryProps) {
  const { ui } = useI18nChrome();
  return (
    <aside className={className} aria-label={ui.cart.orderSummary}>
      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">{pkg.title}</p>
        {pkg.quantityLabel !== pkg.title ? (
          <p className="text-sm text-muted-foreground">{pkg.quantityLabel}</p>
        ) : null}
        <p className="text-lg font-semibold">{formatMoney(pkg.price, pkg.currency)}</p>
        {pkg.deliveryTime ? (
          <p className="text-xs text-muted-foreground">
            {ui.orderDialog.delivery}: {pkg.deliveryTime}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

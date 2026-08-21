'use client';

import Link from 'next/link';

import { CartList } from '@/components/commerce/cart/cart-list';
import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { EmptyCart } from '@/components/commerce/cart/empty-cart';
import { PaymentConfidence } from '@/components/design-system/payment-confidence';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { routes } from '@/config/routes';
import { useCart } from '@/lib/cart';
import { useCartUi } from '@/lib/cart/cart-ui-context';
import { formatMoney } from '@/lib/pricing/format';

export function CartDrawer() {
  const cart = useCart();
  const { ui } = useI18nChrome();
  const { isCartOpen, setCartOpen, closeCart } = useCartUi();

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{ui.cart.yourCart}</SheetTitle>
          <SheetDescription>{ui.cart.drawerDescription}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {!cart.isHydrated ? (
            <p className="text-sm text-muted-foreground">{ui.cart.loading}</p>
          ) : cart.items.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartList items={cart.items} onRemove={cart.removeItem} />
          )}
        </div>

        {cart.isHydrated && cart.items.length > 0 ? (
          <SheetFooter className="mt-auto flex-col gap-3 border-t border-[var(--border-subtle)] pt-4 sm:flex-col">
            <div className="flex w-full items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">{ui.cart.total}</span>
              <span className="text-lg font-bold text-[var(--brand-primary)]" dir="ltr">
                {formatMoney(cart.totals.total.amount, cart.totals.total.currency)}
              </span>
            </div>
            <CheckoutButton
              className="min-h-12 w-full rounded-xl font-semibold"
              label={ui.cart.checkout}
              onNavigate={closeCart}
            />
            <Button asChild variant="outline" className="min-h-11 w-full">
              <Link href={routes.cart} onClick={closeCart}>
                {ui.cart.viewFullCart}
              </Link>
            </Button>
            <PaymentConfidence className="w-full" />
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

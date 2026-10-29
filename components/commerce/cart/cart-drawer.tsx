'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Lock, Plus, ArrowRight } from 'lucide-react';

import { CartList } from '@/components/commerce/cart/cart-list';
import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { EmptyCart } from '@/components/commerce/cart/empty-cart';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { nlBody, nlDisplay } from '@/components/marketing/home-v5/fonts';
import { formatItemsCountLabel } from '@/components/site-v2/cart-helpers';
import { routes } from '@/config/routes';
import { siteV2CartCopy } from '@/lib/site-v2/locale-commerce-copy';
import { useCart } from '@/lib/cart';
import { useCartUi } from '@/lib/cart/cart-ui-context';
import { localizeHref } from '@/lib/i18n/paths';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';

import '@/components/site-v2/site-v2.css';

type DrawerPos = { top: number; right: number } | null;

function readCartAnchorPos(): DrawerPos {
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(max-width: 640px)').matches) return null;
  const anchor = document.querySelector<HTMLElement>('[data-analytics="nav-cart"]');
  if (!anchor) return { top: 70, right: 16 };
  const rect = anchor.getBoundingClientRect();
  return {
    top: Math.round(rect.bottom + 8),
    right: Math.round(Math.max(8, window.innerWidth - rect.right)),
  };
}

/**
 * Cart drawer — portal to document.body (header backdrop-filter traps fixed children).
 * Desktop: 400px panel under the cart icon. Mobile ≤640px: bottom sheet.
 */
export function CartDrawer() {
  const cart = useCart();
  const { locale, ui } = useI18nChrome();
  const { isCartOpen, closeCart } = useCartUi();
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<DrawerPos>(null);
  const copy = siteV2CartCopy(ui);
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePos = useCallback(() => {
    setPos(readCartAnchorPos());
  }, []);

  useEffect(() => {
    if (!isCartOpen) return;
    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isCartOpen, updatePos]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, closeCart]);

  if (!mounted || !isCartOpen) return null;

  const count = cart.totals.itemCount;
  const countLabel = formatItemsCountLabel(count, copy.itemCount, copy.itemsCount);

  const drawerStyle =
    pos != null
      ? ({ top: pos.top, right: pos.right, left: 'auto', bottom: 'auto' } as const)
      : undefined;

  const panel = (
    <div className={cn('site-v2', fontClassName)}>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <div
        className="drawer is-portal"
        role="dialog"
        aria-modal="true"
        aria-label={ui.cart.yourCart}
        style={drawerStyle}
      >
        <div className="dr-head">
          <b>{ui.cart.yourCart}</b>
          <span>{countLabel}</span>
        </div>

        <div className="dr-items">
          {!cart.isHydrated ? (
            <p className="ci" style={{ display: 'block' }}>
              {ui.cart.loading}
            </p>
          ) : cart.items.length === 0 ? (
            <div className="ci" style={{ display: 'block' }}>
              <EmptyCart compact onNavigate={closeCart} />
            </div>
          ) : (
            <CartList
              items={cart.items}
              onRemove={cart.removeItem}
              onIncrement={cart.incrementLineQuantity}
              onDecrement={cart.decrementLineQuantity}
              bare
            />
          )}
        </div>

        {cart.isHydrated && cart.items.length > 0 ? (
          <>
            <Link
              className="dr-add"
              href={localizeHref(routes.services, locale)}
              onClick={closeCart}
            >
              {copy.addAnotherService}
              <Plus className="ic" aria-hidden="true" />
            </Link>
            <div className="dr-foot">
              <div className="dr-total">
                <span>{ui.cart.total}</span>
                <b dir="ltr">
                  {formatMoney(cart.totals.total.amount, cart.totals.total.currency)}
                </b>
              </div>
              <CheckoutButton
                tone="siteV2"
                showArrow
                label={ui.cart.continueToCheckout}
                onNavigate={closeCart}
              />
              <p className="fine">
                <Lock className="ic" aria-hidden="true" />
                {copy.drawerFine}
              </p>
              <Link className="tlink" href={localizeHref(routes.cart, locale)} onClick={closeCart}>
                {ui.cart.viewFullCart}
                <ArrowRight className="ic" aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

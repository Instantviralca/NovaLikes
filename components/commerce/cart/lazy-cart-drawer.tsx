'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useCartUi } from '@/lib/cart/cart-ui-context';

const CartDrawer = dynamic(
  () =>
    import('@/components/commerce/cart/cart-drawer').then((mod) => ({
      default: mod.CartDrawer,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-50 bg-foreground/40"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="sr-only">Loading cart</span>
      </div>
    ),
  },
);

/**
 * Keep cart count/provider eager; load Radix Sheet only after the cart is opened.
 */
export function LazyCartDrawer() {
  const { isCartOpen } = useCartUi();
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (isCartOpen) setRequested(true);
  }, [isCartOpen]);

  if (!requested) return null;
  return <CartDrawer />;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { writeCartCookie } from '@/lib/cart/cookie-store';
import { CART_STORAGE_KEY, serializeCart } from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

export function CartRecoveryRestoreClient({
  cart,
  publicId,
}: {
  cart: CartState;
  publicId: string;
}) {
  const router = useRouter();

  useEffect(() => {
    window.sessionStorage.setItem(CART_STORAGE_KEY, serializeCart(cart));
    writeCartCookie(cart);
    document.cookie = `iv_cart_recovery=${encodeURIComponent(publicId)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    router.replace('/checkout?restored=1');
    router.refresh();
  }, [cart, publicId, router]);

  return <p className="text-sm text-muted-foreground">Restoring your order…</p>;
}

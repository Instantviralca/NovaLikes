import { NextResponse } from 'next/server';

import { CART_COOKIE_MAX_CHARS, CART_COOKIE_NAME } from '@/lib/cart/cookie-store';
import { serializeCart, deserializeCart } from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

export const runtime = 'nodejs';

/**
 * Prepare same-origin checkout navigation. Cart rides in a shared cookie.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cart?: CartState };
    const cart = body.cart ? deserializeCart(JSON.stringify(body.cart)) : null;
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ ok: false, error: 'Cart is empty.' }, { status: 400 });
    }

    const payload = serializeCart(cart);
    const response = NextResponse.json({ ok: true, checkoutUrl: '/checkout' });
    if (payload.length <= CART_COOKIE_MAX_CHARS) {
      response.cookies.set({
        name: CART_COOKIE_NAME,
        value: encodeURIComponent(payload),
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to prepare checkout.',
      },
      { status: 500 },
    );
  }
}

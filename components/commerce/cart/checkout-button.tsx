'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { useCart } from '@/lib/cart';
import { CART_QUERY_PARAM, encodeCartTransfer } from '@/lib/cart/cart-hash';
import { writeCartCookie } from '@/lib/cart/cookie-store';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { cn } from '@/lib/utils';

type CheckoutButtonProps = {
  disabled?: boolean;
  className?: string;
  label?: string;
  /** Called before navigating to checkout (e.g. close drawer). */
  onNavigate?: () => void;
};

/**
 * Instant checkout navigation — cart rides in `?ivc=` (no prepare API wait).
 */
export function CheckoutButton({
  disabled,
  className,
  label,
  onNavigate,
}: CheckoutButtonProps) {
  const cart = useCart();
  const { ui } = useI18nChrome();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonLabel = label ?? ui.cart.continueToCheckout;

  const handleClick = () => {
    if (busy || disabled || cart.items.length === 0) return;
    setBusy(true);
    setError(null);

    const cartState = {
      items: cart.items,
      coupon: cart.coupon,
      currency: cart.currency,
      updatedAt: cart.updatedAt,
    };

    try {
      writeCartCookie(cartState);
    } catch {
      /* best effort */
    }

    const transfer = encodeCartTransfer(cartState);
    const url = new URL('/checkout', window.location.origin);

    if (transfer) {
      url.searchParams.set(CART_QUERY_PARAM, transfer);
      emitLegacyAnalyticsEvent('checkout_click', { href: url.toString() });
      // Navigate first so drawer/toast unmount cannot cancel redirect.
      window.location.assign(url.toString());
      onNavigate?.();
      return;
    }

    // Oversized cart — server handoff (rare).
    void (async () => {
      try {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 8000);
        const response = await fetch('/api/cart/prepare-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartState }),
          signal: controller.signal,
        });
        window.clearTimeout(timer);
        const data = (await response.json()) as {
          ok?: boolean;
          checkoutUrl?: string;
          error?: string;
        };
        if (!response.ok || !data.ok || !data.checkoutUrl) {
          throw new Error(data.error ?? ui.cart.unableToContinue);
        }
        emitLegacyAnalyticsEvent('checkout_click', { href: data.checkoutUrl });
        window.location.assign(data.checkoutUrl);
        onNavigate?.();
      } catch (err) {
        setError(
          err instanceof Error && err.name === 'AbortError'
            ? ui.cart.checkoutTimeout
            : err instanceof Error
              ? err.message
              : ui.cart.unableToContinue,
        );
        setBusy(false);
      }
    })();
  };

  return (
    <div className="space-y-2">
      {busy ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {ui.cart.goingToCheckout}
          </p>
        </div>
      ) : null}
      <Button
        type="button"
        size="lg"
        className={cn('w-full min-h-11', className)}
        disabled={disabled || busy || cart.items.length === 0}
        data-analytics="checkout-click"
        onClick={handleClick}
      >
        {busy ? ui.cart.continuing : buttonLabel}
      </Button>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

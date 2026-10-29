'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import { nlBody, nlDisplay } from '@/components/marketing/home-v5/fonts';
import { siteV2CartCopy } from '@/lib/site-v2/locale-commerce-copy';
import { useCartUi } from '@/lib/cart/cart-ui-context';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import '@/components/site-v2/site-v2.css';

export type CartToastInput = {
  title: string;
  quantityLabel?: string;
  priceLabel?: string;
  serviceName?: string;
};

type CartToastItem = CartToastInput & {
  id: string;
};

type CartToastContextValue = {
  showCartToast: (input: CartToastInput) => void;
  dismiss: (id: string) => void;
};

const CartToastContext = React.createContext<CartToastContextValue | null>(null);

/** Spec: 4 seconds under the cart icon (bottom sheet on mobile). */
const AUTO_DISMISS_MS = 4000;

type ToastPos = { top: number; right: number } | null;

function readCartAnchorPos(): ToastPos {
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

export function CartToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<CartToastItem[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [pos, setPos] = React.useState<ToastPos>(null);
  const timers = React.useRef<Map<string, number>>(new Map());
  const lastKey = React.useRef<string | null>(null);
  const lastAt = React.useRef(0);
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (toasts.length === 0) return;
    const update = () => setPos(readCartAnchorPos());
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [toasts.length]);

  const clearTimer = React.useCallback((id: string) => {
    const existing = timers.current.get(id);
    if (existing) {
      window.clearTimeout(existing);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = React.useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((current) => current.filter((item) => item.id !== id));
    },
    [clearTimer],
  );

  const scheduleDismiss = React.useCallback(
    (id: string) => {
      clearTimer(id);
      const handle = window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
      timers.current.set(id, handle);
    },
    [clearTimer, dismiss],
  );

  const showCartToast = React.useCallback(
    (input: CartToastInput) => {
      const dedupeKey = `${input.title}|${input.quantityLabel ?? ''}`;
      const now = Date.now();
      if (lastKey.current === dedupeKey && now - lastAt.current < 800) {
        return;
      }
      lastKey.current = dedupeKey;
      lastAt.current = now;

      const id = `${now}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((current) => {
        current.forEach((item) => clearTimer(item.id));
        return [{ ...input, id }];
      });
      scheduleDismiss(id);
    },
    [clearTimer, scheduleDismiss],
  );

  React.useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((handle) => window.clearTimeout(handle));
      activeTimers.clear();
    };
  }, []);

  const toastStyle =
    pos != null
      ? ({ top: pos.top, right: pos.right, left: 'auto', bottom: 'auto' } as const)
      : undefined;

  return (
    <CartToastContext.Provider value={{ showCartToast, dismiss }}>
      {children}
      {mounted && toasts.length > 0
        ? createPortal(
            <div className={cn('site-v2', fontClassName)}>
              {toasts.map((item) => (
                <CartToast
                  key={item.id}
                  item={item}
                  style={toastStyle}
                  onDismiss={() => dismiss(item.id)}
                  onPause={() => clearTimer(item.id)}
                  onResume={() => scheduleDismiss(item.id)}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </CartToastContext.Provider>
  );
}

function CartToast({
  item,
  style,
  onDismiss,
  onPause,
  onResume,
}: {
  item: CartToastItem;
  style?: React.CSSProperties;
  onDismiss: () => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const { openCart } = useCartUi();
  const { locale, ui } = useI18nChrome();
  const copy = siteV2CartCopy(ui);
  // packageTitle only — never append serviceName (avoids "2500 Instagram Likes Instagram Likes").
  const headline = localizePackageDisplayName(
    item.quantityLabel?.trim() || item.title,
    locale,
  );
  const sub = item.priceLabel
    ? `${copy.addedToast} · ${item.priceLabel}`
    : copy.addedToast;

  return (
    <div
      role="status"
      className="toast is-portal"
      style={style}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocusCapture={onPause}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onResume();
        }
      }}
      data-analytics="cart-toast"
    >
      <span className="tm">
        <Check className="ic" strokeWidth={3} aria-hidden="true" />
      </span>
      <span>
        <b>{headline}</b>
        <em>{sub}</em>
      </span>
      <button
        type="button"
        className="btn dark"
        onClick={() => {
          emitLegacyAnalyticsEvent('cart_view_click', {
            href: routes.cart,
            serviceSlug: undefined,
          });
          onDismiss();
          openCart();
        }}
      >
        {copy.viewCart}
      </button>
      <span className="sr">{ui.cart.yourCart}</span>
    </div>
  );
}

export function useCartToast() {
  const context = React.useContext(CartToastContext);
  if (!context) {
    throw new Error('useCartToast must be used within a CartToastProvider');
  }
  return context;
}

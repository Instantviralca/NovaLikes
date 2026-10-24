'use client';

import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';

import { CartList } from '@/components/commerce/cart/cart-list';
import { CartSummary } from '@/components/commerce/cart/cart-summary';
import { EmptyCart } from '@/components/commerce/cart/empty-cart';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { nlBody, nlDisplay } from '@/components/marketing/home-v5/fonts';
import { formatCartItemsHeading } from '@/components/site-v2/cart-helpers';
import { routes } from '@/config/routes';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import { useCart } from '@/lib/cart';
import { localizeHref } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';

import '@/components/site-v2/site-v2.css';

export function CartPage() {
  const cart = useCart();
  const { locale, ui } = useI18nChrome();
  const copy = SITE_V2_COPY.cart;
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  if (!cart.isHydrated) {
    return (
      <section className={cn('site-v2 cart-page', fontClassName)} aria-label={ui.cart.ariaLabel}>
        <div className="wrap">
          <p className="lead">{ui.cart.loading}</p>
        </div>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className={cn('site-v2 cart-page', fontClassName)} aria-label={ui.cart.ariaLabel}>
        <div className="wrap">
          <EmptyCart />
        </div>
      </section>
    );
  }

  const itemsHeading = formatCartItemsHeading(
    cart.totals.itemCount,
    copy.itemHeading,
    copy.itemsHeading,
  );

  return (
    <section
      className={cn('site-v2 cart-page', fontClassName)}
      aria-label={ui.cart.ariaLabel}
      data-analytics="cart-page"
    >
      <div className="wrap">
        <nav className="crumbs" aria-label={ui.breadcrumbs.ariaLabel}>
          <Link href={localizeHref(routes.home, locale)}>{ui.breadcrumbs.home}</Link>
          <span>/</span>
          <span aria-current="page">{ui.cart.title}</span>
        </nav>
        <h1 className="h1">{ui.cart.yourCart}</h1>
        <p className="lead">{ui.cart.reviewIntro}</p>
        <div className="cart-grid">
          <div className="panel">
            <div className="panel-head">
              <b>{itemsHeading}</b>
              <Link className="tlink" href={localizeHref(routes.services, locale)}>
                {ui.cart.continueShopping}
                <ArrowRight className="ic" aria-hidden="true" />
              </Link>
            </div>
            <CartList
              items={cart.items}
              onRemove={cart.removeItem}
              onIncrement={cart.incrementLineQuantity}
              onDecrement={cart.decrementLineQuantity}
              bare
            />
            <Link className="dr-add" href={localizeHref(routes.services, locale)}>
              {copy.addAnotherService}
              <Plus className="ic" aria-hidden="true" />
            </Link>
          </div>
          <CartSummary
            totals={cart.totals}
            couponCode={cart.coupon?.code}
            className="h-fit lg:sticky lg:top-24"
          />
        </div>
      </div>
    </section>
  );
}

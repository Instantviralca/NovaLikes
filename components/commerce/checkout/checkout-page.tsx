'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Lock,
  Mail,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { CheckoutOrderSummary } from '@/components/commerce/checkout/order-summary';
import { CouponSection } from '@/components/commerce/checkout/coupon-section';
import { CustomerInformationForm } from '@/components/commerce/checkout/customer-information-form';
import { PaymentMethods } from '@/components/commerce/checkout/payment-methods';
import { PlaceOrderButton } from '@/components/commerce/checkout/place-order-button';
import { TermsAgreement } from '@/components/commerce/checkout/terms-agreement';
import { Logo } from '@/components/common/logo';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import { getOrCreateSessionId } from '@/lib/analytics/native/identity';
import { useCart } from '@/lib/cart';
import { CART_QUERY_PARAM, locationHasCartTransfer } from '@/lib/cart/cart-hash';
import { formatMoney } from '@/lib/pricing/format';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { localizeHref } from '@/lib/i18n/paths';
import { site } from '@/config/site';
import type {
  CustomerInformation,
  PaymentMethodId,
  PaymentMethodOption,
} from '@/types/checkout';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type CheckoutPageProps = {
  signedInEmail?: string | null;
};

const TRUST_ICONS = [ShieldCheck, Clock, RefreshCw, MessageCircle] as const;

/**
 * Mobile place-order: in-form button only (no sticky bar).
 * Prototype has a single `.co-place` CTA; a sticky bar would duplicate it.
 */
export function CheckoutPage({ signedInEmail = null }: CheckoutPageProps) {
  const cart = useCart();
  const { ui, locale, market } = useI18nChrome();
  const analytics = useAnalyticsOptional();
  const checkoutViewSent = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentCancelled = searchParams.get('cancelled') === '1';
  const restored = searchParams.get('restored') === '1';
  const cartTransferPending = Boolean(
    searchParams.get(CART_QUERY_PARAM) || searchParams.get('cartHandoff'),
  );
  const cartHref = localizeHref(routes.cart, locale);
  const copy = SITE_V2_COPY.checkout;
  const [customer, setCustomer] = useState<CustomerInformation>({
    email: signedInEmail ?? '',
  });
  const signedInPrefillDone = useRef(false);

  useEffect(() => {
    if (!signedInEmail || signedInPrefillDone.current) return;
    signedInPrefillDone.current = true;
    setCustomer((prev) =>
      prev.email.trim() ? prev : { ...prev, email: signedInEmail },
    );
  }, [signedInEmail]);
  const [paymentMethodId, setPaymentMethodId] = useState<PaymentMethodId | null>(() => {
    const enabled = getEnabledPaymentProviders().filter((p) => p.enabled);
    return enabled.length === 1 ? (enabled[0]!.id as PaymentMethodId) : null;
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    payment?: string;
    terms?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const captureAbandonedCart = useCallback(async () => {
    if (!isValidEmail(customer.email.trim()) || cart.items.length === 0) return;
    try {
      await fetch('/api/checkout/abandon-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          items: cart.items,
          coupon: cart.coupon,
          currency: cart.totals.total.currency,
          subtotalAmount: cart.totals.subtotal.amount,
          discountAmount: cart.totals.discount.amount,
          totalAmount: cart.totals.total.amount,
          locale,
          market: market ?? undefined,
          landingPath: typeof window === 'undefined' ? undefined : window.location.pathname,
          referrer: typeof document === 'undefined' ? undefined : document.referrer,
          checkoutPath: '/checkout',
        }),
        keepalive: true,
      });
    } catch {
      // Recovery capture must never interrupt checkout.
    }
  }, [cart.coupon, cart.items, cart.totals, customer, locale, market]);

  useEffect(() => {
    if (!isValidEmail(customer.email.trim()) || cart.items.length === 0) return;
    const timer = window.setTimeout(() => void captureAbandonedCart(), 2500);
    return () => window.clearTimeout(timer);
  }, [captureAbandonedCart, customer.email, cart.items.length]);

  const paymentMethods: PaymentMethodOption[] = useMemo(
    () =>
      getEnabledPaymentProviders().map((provider) => ({
        id: provider.id as PaymentMethodId,
        label: provider.displayName,
        enabled: provider.enabled,
      })),
    [],
  );

  useEffect(() => {
    if (paymentMethodId) return;
    const enabled = paymentMethods.filter((m) => m.enabled);
    if (enabled.length === 1 && enabled[0]) {
      setPaymentMethodId(enabled[0].id);
    }
  }, [paymentMethods, paymentMethodId]);

  useEffect(() => {
    if (!analytics?.ready || checkoutViewSent.current) return;
    if (cart.items.length === 0) return;

    const { sessionId } = getOrCreateSessionId();
    const markerKey = `nl_analytics_checkout_started:${sessionId}`;

    try {
      if (typeof window !== 'undefined' && window.sessionStorage.getItem(markerKey) === '1') {
        checkoutViewSent.current = true;
        return;
      }
    } catch {
      // ignore
    }

    checkoutViewSent.current = true;
    try {
      window.sessionStorage.setItem(markerKey, '1');
    } catch {
      // ignore
    }
    analytics.track({
      eventName: 'checkout_started',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
  }, [analytics, cart.items.length]);

  const emailMilestoneSent = useRef(false);
  useEffect(() => {
    if (!analytics?.ready || emailMilestoneSent.current) return;
    const email = customer.email?.trim() ?? '';
    if (!email.includes('@')) return;
    emailMilestoneSent.current = true;
    analytics.track({
      eventName: 'checkout_email_entered',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
  }, [analytics, customer.email]);

  const waitingForCart =
    !cart.isHydrated ||
    cart.isBootstrapping ||
    (cartTransferPending && cart.items.length === 0) ||
    (locationHasCartTransfer() && cart.items.length === 0);

  const totalLabel = formatMoney(cart.totals.total.amount, cart.totals.total.currency);
  const placeLabel = submitting
    ? ui.checkout.placingOrder
    : copy.placeOrderWithTotal.replace('{total}', totalLabel);

  const handlePlaceOrder = async () => {
    const nextErrors: typeof errors = {};
    if (!isValidEmail(customer.email)) {
      nextErrors.email = ui.checkout.validEmail;
    }
    if (!paymentMethodId) {
      nextErrors.payment = ui.checkout.selectPayment;
    }
    if (!termsAccepted) {
      nextErrors.terms = ui.checkout.acceptTerms;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          paymentMethodId,
          items: cart.items,
          totals: cart.totals,
          coupon: cart.coupon,
          termsAccepted,
          marketingOptIn: Boolean(customer.marketingOptIn),
          recoveryPublicId: document.cookie
            .split('; ')
            .find((row) => row.startsWith('iv_cart_recovery='))
            ?.slice('iv_cart_recovery='.length),
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        orderId?: string;
        email?: string;
        error?: string;
        redirectUrl?: string;
      };
      if (!response.ok || !data.ok || !data.orderId) {
        setErrors({ form: data.error ?? ui.checkout.unableToPlace });
        setSubmitting(false);
        return;
      }
      cart.clearCart();
      if (data.redirectUrl) {
        window.location.assign(data.redirectUrl);
        return;
      }
      const qs = new URLSearchParams({
        orderId: data.orderId,
        email: data.email ?? customer.email,
      });
      router.push(`${routes.orderSuccess}?${qs.toString()}`);
    } catch {
      setErrors({ form: ui.checkout.unableToPlaceRetry });
      setSubmitting(false);
    }
  };

  if (waitingForCart) {
    return (
      <div className="co" aria-label={ui.checkout.ariaLabel}>
        <section className="co-right">
          <div className="in">
            <p className="lead" role="status" aria-live="polite">
              {ui.checkout.loading}
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="co" aria-label={ui.checkout.ariaLabel} data-analytics="checkout-empty">
        <aside className="co-left" aria-hidden="true">
          <div className="in">
            <Logo
              href={localizeHref(routes.home, locale)}
              variant="white"
              className="co-brand"
            />
          </div>
        </aside>
        <section className="co-right">
          <div className="in">
            <div className="empty-cart" role="status">
              <h1 className="h1">{ui.checkout.title}</h1>
              <p>{ui.checkout.emptyCart}</p>
              <Link className="btn" href={cartHref}>
                {ui.checkout.returnToCart}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const summaryBlock = (
    <CheckoutOrderSummary
      items={cart.items}
      totals={cart.totals}
      couponCode={cart.coupon?.code}
      variant="navy"
    />
  );

  return (
    <div className="co" aria-label={ui.checkout.ariaLabel} data-analytics="checkout-page">
      <aside className="co-left">
        <div className="in">
          <Logo
            href={localizeHref(routes.home, locale)}
            variant="white"
            className="co-brand"
          />
          <div className="co-total">
            <p className="k">{copy.total}</p>
            <p className="v">
              <span dir="ltr">{totalLabel}</span> <small>USD</small>
            </p>
            <p>{copy.oneTime}</p>
          </div>
          {summaryBlock}
          <ul className="co-trust">
            {copy.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i] ?? ShieldCheck;
              return (
                <li key={item}>
                  <Icon className="ic" aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <section className="co-right">
        <div className="in">
          <div className="co-mobile-sum">
            <details>
              <summary>
                <span>
                  {copy.orderSummaryToggle} ▾
                </span>
                <b dir="ltr">{totalLabel}</b>
              </summary>
              <div className="ms-body">{summaryBlock}</div>
            </details>
          </div>

          <div className="co-steps" aria-label={ui.checkout.progressAria}>
            <span className="done">{copy.steps[0]}</span>
            <span className="on">{copy.steps[1]}</span>
            <span>{copy.steps[2]}</span>
          </div>

          <Link className="back" href={cartHref}>
            <ArrowLeft className="ic" aria-hidden="true" />
            {copy.backToCart}
          </Link>

          <h1 className="sr">{ui.checkout.title}</h1>

          {paymentCancelled ? (
            <p className="notice warn" role="status" style={{ marginTop: 16 }}>
              {ui.checkout.paymentCancelled}
            </p>
          ) : null}
          {restored ? (
            <p className="notice ok" role="status" style={{ marginTop: 16 }}>
              Your order has been restored.
            </p>
          ) : null}

          <div className="co-sec">
            <div className="co-sec-h">
              <h2>{copy.yourDetails}</h2>
              <span>
                <Mail className="ic" aria-hidden="true" />
                {copy.updatesHint}
              </span>
            </div>
            {signedInEmail ? (
              <p className="hint" style={{ marginBottom: 12 }}>
                {ACCOUNT_UI.checkout.signedInAs(signedInEmail)}
              </p>
            ) : null}
            <CustomerInformationForm
              value={customer}
              errors={{ email: errors.email }}
              onChange={setCustomer}
              onEmailBlur={() => void captureAbandonedCart()}
              hideLegend
            />
          </div>

          <div className="co-sec">
            <div className="co-sec-h">
              <h2>{copy.payment}</h2>
              <span>
                <Lock className="ic" aria-hidden="true" />
                {copy.encrypted}
              </span>
            </div>
            <PaymentMethods
              methods={paymentMethods}
              value={paymentMethodId}
              onChange={setPaymentMethodId}
              error={errors.payment}
              hideLegend
              descriptions={{
                'remote-payment': ui.checkout.cardProcessedSecurely,
              }}
              chips={{
                'remote-payment': ['Card'],
              }}
            />
          </div>

          <div className="co-sec">
            <CouponSection />
          </div>

          <div className="co-sec">
            <TermsAgreement
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
              error={errors.terms}
            />
          </div>

          {errors.form ? (
            <p className="err" role="alert" style={{ marginTop: 16 }}>
              {errors.form}
            </p>
          ) : null}

          <div className="co-place">
            <PlaceOrderButton
              tone="siteV2"
              showLock
              onClick={handlePlaceOrder}
              disabled={submitting}
              label={placeLabel}
            />
            <p className="fine">
              <ShieldCheck className="ic" aria-hidden="true" />
              {ui.checkout.encryptedPayment}
            </p>
          </div>

          <nav className="co-legal" aria-label="Legal">
            <Link href={localizeHref(routes.termsAndConditions, locale)}>{copy.legal.terms}</Link>
            <Link href={localizeHref(routes.privacyPolicy, locale)}>{copy.legal.privacy}</Link>
            <Link href={localizeHref(routes.refundPolicy, locale)}>{copy.legal.refund}</Link>
            <Link href={localizeHref(routes.contact, locale)}>{copy.legal.contact}</Link>
            <span>© {site.name}</span>
          </nav>
        </div>
      </section>
    </div>
  );
}

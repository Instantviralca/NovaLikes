'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { CheckoutSummary } from '@/components/commerce/checkout/checkout-summary';
import { CouponSection } from '@/components/commerce/checkout/coupon-section';
import { CustomerInformationForm } from '@/components/commerce/checkout/customer-information-form';
import { PaymentMethods } from '@/components/commerce/checkout/payment-methods';
import type { MollieCardFieldsHandle } from '@/components/commerce/checkout/mollie-card-fields';
import { PlaceOrderButton } from '@/components/commerce/checkout/place-order-button';
import { TermsAgreement } from '@/components/commerce/checkout/terms-agreement';
import { CheckoutProgress } from '@/components/design-system/checkout-progress';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { getOrCreateSessionId } from '@/lib/analytics/native/identity';
import { useCart } from '@/lib/cart';
import { CART_QUERY_PARAM, locationHasCartTransfer } from '@/lib/cart/cart-hash';
import { formatMoney } from '@/lib/pricing/format';
import type {
  CustomerInformation,
  PaymentMethodId,
  PaymentMethodOption,
} from '@/types/checkout';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CheckoutPage() {
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
  const cartHref = routes.cart;
  const [customer, setCustomer] = useState<CustomerInformation>({ email: '' });
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
  const mollieHandleRef = useRef<MollieCardFieldsHandle | null>(null);

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

  // Sole enabled method — select by default so the user never has to tap it.
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

    // Survive checkout remounts within the same analytics session.
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

  // Never flash empty cart while transfer/bootstrap is in progress.
  const waitingForCart =
    !cart.isHydrated ||
    cart.isBootstrapping ||
    (cartTransferPending && cart.items.length === 0) ||
    (locationHasCartTransfer() && cart.items.length === 0);

  if (waitingForCart) {
    return (
      <Section aria-label={ui.checkout.ariaLabel} className="bg-hero-wash">
        <Container size="xl">
          <div
            className="flex min-h-[40vh] flex-col items-center justify-center gap-2"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {ui.checkout.loading}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Section aria-label={ui.checkout.ariaLabel} className="bg-hero-wash">
        <Container size="xl" className="space-y-4">
          <Heading as="h1" size="h1">
            {ui.checkout.title}
          </Heading>
          <MutedText>{ui.checkout.emptyCart}</MutedText>
          <Button asChild>
            <Link href={cartHref}>{ui.checkout.returnToCart}</Link>
          </Button>
        </Container>
      </Section>
    );
  }

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
      let cardToken: string | undefined;
      if (paymentMethodId === 'remote-payment') {
        if (!mollieHandleRef.current) {
          setErrors({ form: 'Secure card form is not ready yet. Please wait a moment and try again.' });
          setSubmitting(false);
          return;
        }
        try {
          cardToken = await mollieHandleRef.current.createCardToken();
        } catch (tokenError) {
          setErrors({
            form:
              tokenError instanceof Error
                ? tokenError.message
                : 'Please check your card details and try again.',
          });
          setSubmitting(false);
          return;
        }
      }

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
          cardToken,
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

  return (
    <Section
      aria-label={ui.checkout.ariaLabel}
      data-analytics="checkout-page"
      className="bg-hero-wash pb-28 lg:pb-16"
    >
      <Container size="xl">
        <div className="mb-6 space-y-3">
          <Heading as="h1" size="h1">
            {ui.checkout.title}
          </Heading>
          <MutedText>{ui.checkout.intro}</MutedText>
          {paymentCancelled ? (
            <p
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
              role="status"
            >
              {ui.checkout.paymentCancelled}
            </p>
          ) : null}
          {restored ? (
            <p
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900"
              role="status"
            >
              Your order has been restored.
            </p>
          ) : null}
          <CheckoutProgress current="payment" className="max-w-2xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <h2 className="mb-4 text-base font-bold">{ui.checkout.customerInformation}</h2>
              <CustomerInformationForm
                value={customer}
                errors={{ email: errors.email }}
                onChange={setCustomer}
                onEmailBlur={() => void captureAbandonedCart()}
                hideLegend
              />
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <h2 className="mb-4 text-base font-bold">{ui.checkout.paymentMethod}</h2>
              <PaymentMethods
                methods={paymentMethods}
                value={paymentMethodId}
                onChange={setPaymentMethodId}
                error={errors.payment}
                hideLegend
                mollieHandleRef={mollieHandleRef}
              />
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <CouponSection />
              <div className="mt-6">
                <TermsAgreement
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                  error={errors.terms}
                />
              </div>
              {errors.form ? (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {errors.form}
                </p>
              ) : null}
              <div className="mt-6 hidden lg:block">
                <PlaceOrderButton
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  label={submitting ? ui.checkout.placingOrder : ui.checkout.placeOrder}
                  className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] text-base font-semibold hover:bg-[var(--brand-primary-hover)]"
                />
              </div>
            </div>
          </div>
          <div className="hidden h-fit lg:sticky lg:top-24 lg:block">
            <CheckoutSummary items={cart.items} totals={cart.totals} />
          </div>
        </div>
      </Container>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-white/95 p-4 shadow-[var(--shadow-lg)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">{ui.cart.total}</span>
            <span className="text-lg font-bold text-[var(--brand-primary)]" dir="ltr">
              {formatMoney(cart.totals.total.amount, cart.totals.total.currency)}
            </span>
          </div>
          <PlaceOrderButton
            onClick={handlePlaceOrder}
            disabled={submitting}
            label={submitting ? ui.checkout.placingOrder : ui.checkout.placeOrder}
            className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] font-semibold hover:bg-[var(--brand-primary-hover)]"
          />
        </div>
      </div>
    </Section>
  );
}

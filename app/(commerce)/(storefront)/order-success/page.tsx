import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock } from 'lucide-react';

import { ConversionTracker } from '@/components/analytics/ConversionTracker';
import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { routes } from '@/config/routes';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import { allowMockPayments } from '@/lib/config/env';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { getOrderLineViews } from '@/lib/orders/line-display';
import { formatMoney } from '@/lib/pricing/format';
import { resolveOrderByCustomerRef } from '@/lib/orders/store';
import { buildPageMetadataForRoute } from '@/lib/seo/metadata';
import type { CurrencyCode } from '@/types/pricing';
import { cn } from '@/lib/utils';

import '@/components/site-v2/site-v2.css';

export const metadata: Metadata = buildPageMetadataForRoute(routes.orderSuccess);

export const dynamic = 'force-dynamic';

type OrderSuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
    email?: string;
    verified?: string;
  }>;
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  preloadHomeDisplayFont();
  const params = await searchParams;
  const { ui } = await getSiteChrome();
  const signedInCustomer = await getCustomerFromCookies();
  const orderIdParam = params.orderId?.trim();
  const email = params.email?.trim();
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;
  const nextSteps = SITE_V2_COPY.orderSuccess.next;

  let verified = false;
  let paymentPending = false;
  let orderTotal: number | undefined;
  let currency = 'USD';
  let displayOrderId = orderIdParam;
  let lineSummaries: Array<{
    serviceName: string;
    packageTitle: string;
    quantityLabel: string;
    lineQuantity: number;
    lineTotalDisplay: string;
  }> = [];

  if (orderIdParam) {
    const order = await resolveOrderByCustomerRef(orderIdParam);

    if (order && email && order.guestEmail.toLowerCase() === email.toLowerCase()) {
      verified = order.payment?.status === 'paid';
      paymentPending = order.payment?.status === 'pending' || order.payment?.status === 'processing';
      orderTotal = order.total.amount;
      currency = order.total.currency;
      displayOrderId = getCustomerOrderId(order);
      lineSummaries = getOrderLineViews(order).map((line) => ({
        serviceName: line.serviceName,
        packageTitle: line.packageTitle,
        quantityLabel: line.quantityLabel,
        lineQuantity: line.lineQuantity,
        lineTotalDisplay: line.lineTotalDisplay,
      }));
    } else if (allowMockPayments() && params.verified === '1' && order) {
      verified = order.payment?.status === 'paid';
      orderTotal = order.total.amount;
      currency = order.total.currency;
      displayOrderId = getCustomerOrderId(order);
      lineSummaries = getOrderLineViews(order).map((line) => ({
        serviceName: line.serviceName,
        packageTitle: line.packageTitle,
        quantityLabel: line.quantityLabel,
        lineQuantity: line.lineQuantity,
        lineTotalDisplay: line.lineTotalDisplay,
      }));
    }
  }

  const heading = verified
    ? ui.orderSuccess.paymentConfirmed
    : paymentPending
      ? ui.orderSuccess.confirmingPayment
      : ui.orderSuccess.orderStatus;
  const body = verified
    ? ui.orderSuccess.verifiedBody
    : paymentPending
      ? ui.orderSuccess.pendingBody
      : ui.orderSuccess.unverifiedBody;

  const trackHref =
    displayOrderId && email
      ? `${routes.trackOrder}?orderId=${encodeURIComponent(displayOrderId)}&email=${encodeURIComponent(email)}`
      : routes.trackOrder;

  return (
    <section
      className={cn('site-v2 done-page', fontClassName)}
      aria-label={ui.orderSuccess.ariaLabel}
    >
      <div className="wrap">
        <div className="done-card">
          <span className="dm">
            {verified ? (
              <Check className="ic" strokeWidth={3} aria-hidden="true" />
            ) : (
              <Clock className="ic" aria-hidden="true" />
            )}
          </span>
          <h1 className="h1">{heading}</h1>
          <p className="b">{body}</p>

          {displayOrderId ? (
            <div className="done-ids">
              <div>
                <span>{ui.orderSuccess.orderId}</span>
                <b dir="ltr">{displayOrderId}</b>
              </div>
              {email ? (
                <div>
                  <span>{ui.orderSuccess.email}</span>
                  <b dir="ltr">{email}</b>
                </div>
              ) : null}
              {orderTotal !== undefined ? (
                <div>
                  <span>Total:</span>
                  <b dir="ltr">{formatMoney(orderTotal, currency as CurrencyCode)}</b>
                </div>
              ) : null}
              {lineSummaries.length > 0
                ? lineSummaries.map((line, index) => (
                    <div key={`${line.serviceName}-${index}`}>
                      <span>{line.serviceName}</span>
                      <b>
                        {line.packageTitle || line.quantityLabel} · Qty {line.lineQuantity} ·{' '}
                        {line.lineTotalDisplay}
                      </b>
                    </div>
                  ))
                : null}
            </div>
          ) : null}

          {verified ? (
            <ol className="done-next">
              {nextSteps.map((step, i) => (
                <li key={step}>
                  <span className="n">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          ) : null}

          {verified && displayOrderId ? (
            <ConversionTracker
              enabled
              verification={{
                verified: true,
                source: 'payment_confirmed',
                idempotencyKey: `purchase:${displayOrderId}`,
                anonymousTransactionRef: displayOrderId.slice(-8),
              }}
              payload={{
                value: orderTotal !== undefined ? orderTotal / 100 : undefined,
                currency: currency as 'USD',
              }}
            />
          ) : null}

          {!signedInCustomer && email ? (
            <div className="done-ids" style={{ marginBottom: 24, textAlign: 'left' }}>
              <div style={{ display: 'block' }}>
                <b style={{ display: 'block', marginBottom: 6 }}>{ACCOUNT_UI.orderSuccess.h}</b>
                <span style={{ fontWeight: 600 }}>{ACCOUNT_UI.orderSuccess.text(email)}</span>
              </div>
              <Link
                className="btn"
                style={{ marginTop: 12, display: 'inline-flex' }}
                href={`/signup?email=${encodeURIComponent(email)}&next=${encodeURIComponent('/dashboard/orders')}`}
              >
                {ACCOUNT_UI.orderSuccess.button}
              </Link>
            </div>
          ) : null}

          <div className="done-btns">
            <Link className="btn" href={trackHref}>
              {ui.orderSuccess.trackOrder}
              <ArrowRight className="ic" aria-hidden="true" />
            </Link>
            <Link className="btn ghost" href={routes.home}>
              {ui.orderSuccess.backHome}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

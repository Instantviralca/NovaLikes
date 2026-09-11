import type { Metadata } from 'next';
import Link from 'next/link';

import { ConversionTracker } from '@/components/analytics/ConversionTracker';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { allowMockPayments } from '@/lib/config/env';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { getOrderLineViews } from '@/lib/orders/line-display';
import { formatMoney } from '@/lib/pricing/format';
import { resolveOrderByCustomerRef } from '@/lib/orders/store';
import { buildPageMetadataForRoute } from '@/lib/seo/metadata';
import type { CurrencyCode } from '@/types/pricing';

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
  const params = await searchParams;
  const { ui } = await getSiteChrome();
  const orderIdParam = params.orderId?.trim();
  const email = params.email?.trim();

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

  return (
    <Section aria-label={ui.orderSuccess.ariaLabel}>
      <Container size="md" className="space-y-6">
        <Heading as="h1" size="h1">
          {verified
            ? ui.orderSuccess.paymentConfirmed
            : paymentPending
              ? ui.orderSuccess.confirmingPayment
              : ui.orderSuccess.orderStatus}
        </Heading>
        <MutedText>
          {verified
            ? ui.orderSuccess.verifiedBody
            : paymentPending
              ? ui.orderSuccess.pendingBody
              : ui.orderSuccess.unverifiedBody}
        </MutedText>
        {displayOrderId ? (
          <div className="rounded-lg border bg-card p-4 text-sm space-y-3">
            <p>
              <span className="font-medium">{ui.orderSuccess.orderId}</span>{' '}
              <span dir="ltr" className="[unicode-bidi:isolate]">
                {displayOrderId}
              </span>
            </p>
            {email ? (
              <p>
                <span className="font-medium">{ui.orderSuccess.email}</span>{' '}
                <span dir="ltr" className="[unicode-bidi:isolate]">
                  {email}
                </span>
              </p>
            ) : null}
            {orderTotal !== undefined ? (
              <p>
                <span className="font-medium">Total:</span>{' '}
                <span dir="ltr">
                  {formatMoney(orderTotal, currency as CurrencyCode)}
                </span>
              </p>
            ) : null}
            {lineSummaries.length > 0 ? (
              <ul className="space-y-2 border-t pt-3">
                {lineSummaries.map((line, index) => (
                  <li key={`${line.serviceName}-${index}`}>
                    <p className="font-medium">{line.serviceName}</p>
                    <p className="text-muted-foreground">
                      {line.packageTitle || line.quantityLabel} · Qty {line.lineQuantity} ·{' '}
                      {line.lineTotalDisplay}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
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
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link
              href={
                displayOrderId && email
                  ? `${routes.trackOrder}?orderId=${encodeURIComponent(displayOrderId)}&email=${encodeURIComponent(email)}`
                  : routes.trackOrder
              }
            >
              {ui.orderSuccess.trackOrder}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.home}>{ui.orderSuccess.backHome}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}


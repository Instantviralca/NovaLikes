import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { OrderTimeline } from '@/components/tracking/order-timeline';
import { Heading } from '@/components/typography/heading';
import {
  formatAccountDate,
  getPaymentBadgeLabel,
} from '@/lib/customers/format';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { getCustomerOrder } from '@/lib/customers/orders';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { getOrderLineViews } from '@/lib/orders/line-display';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { getCustomerStatusMessage, getAdminStatusLabel } from '@/lib/orders/status';
import { formatMoney } from '@/lib/pricing/format';
import { buildPublicTimeline } from '@/lib/tracking/lookup';

export const metadata: Metadata = {
  title: 'Order',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type OrderDetailPageProps = {
  params: Promise<{ ref: string }>;
};

export default async function DashboardOrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const customer = await getCustomerFromCookies();
  if (!customer) return null;

  const { ref } = await params;
  const order = await getCustomerOrder(customer.id, decodeURIComponent(ref));
  if (!order) notFound();

  const orderNumber = getCustomerOrderId(order);
  const timeline = buildPublicTimeline(order.status, order.updatedAt);
  const lines = getOrderLineViews(order);
  const placedOn = ACCOUNT_UI.orderDetail.placedOn(
    formatAccountDate(order.createdAt),
  );
  const paymentLabel = getPaymentBadgeLabel(order.payment?.status);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          href="/dashboard/orders"
          className="text-sm font-medium text-[var(--brand)]"
        >
          {ACCOUNT_UI.orderDetail.back}
        </Link>
        <Heading as="h1" size="h1">
          Order {orderNumber}
        </Heading>
        <p className="text-sm text-muted-foreground">{placedOn}</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.orderDetail.status}</h2>
        <div className="rounded-lg border bg-background p-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <p className="inline-flex rounded-full bg-[var(--brand)]/10 px-3 py-1 text-sm font-medium text-[var(--brand)]">
              {getAdminStatusLabel(order.status)}
            </p>
            <p className="inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
              {paymentLabel}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {getCustomerStatusMessage(order.status)}
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.orderDetail.timeline}</h2>
        <div className="rounded-lg border bg-background p-4">
          <OrderTimeline steps={timeline} />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.orderDetail.items}</h2>
        <ul className="divide-y rounded-lg border bg-background">
          {lines.map((line) => (
            <li key={line.id} className="px-4 py-3 text-sm space-y-1">
              <p className="font-medium">
                {line.serviceName} · {line.quantityLabel}
              </p>
              <p className="text-muted-foreground break-all" dir="ltr">
                {line.targetDisplay || '—'}
              </p>
              <p>{line.lineTotalDisplay}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm font-medium">
          Total {formatMoney(order.total.amount, order.total.currency)}
        </p>
      </section>

      <p className="text-sm">
        <Link
          href={`/contact?order=${encodeURIComponent(orderNumber)}`}
          className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
        >
          {ACCOUNT_UI.orderDetail.help}
        </Link>
      </p>
    </div>
  );
}

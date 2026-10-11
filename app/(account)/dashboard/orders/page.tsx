import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/typography/heading';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { listCustomerOrders } from '@/lib/customers/orders';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { getOrderLineViews } from '@/lib/orders/line-display';
import { formatOrderNumber } from '@/lib/orders/public-number';
import { getAdminStatusLabel } from '@/lib/orders/status';
import { formatMoney } from '@/lib/pricing/format';

export const metadata: Metadata = {
  title: 'Orders',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type OrdersPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function DashboardOrdersPage({ searchParams }: OrdersPageProps) {
  const customer = await getCustomerFromCookies();
  if (!customer) return null;

  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = 20;
  const { orders, total } = await listCustomerOrders(customer.id, {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <Heading as="h1" size="h1">
        {ACCOUNT_UI.orders.h1}
      </Heading>

      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">{ACCOUNT_UI.orders.empty}</p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-lg border md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colOrder}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colDate}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colService}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colTarget}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colTotal}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colPayment}</th>
                  <th className="px-3 py-2 font-medium">{ACCOUNT_UI.orders.colStatus}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const ref =
                    typeof order.publicNumber === 'number'
                      ? formatOrderNumber(order.publicNumber)
                      : order.id;
                  const lines = getOrderLineViews(order);
                  const first = lines[0];
                  const target = first?.targetDisplay || '—';
                  return (
                    <tr key={order.id} className="border-t">
                      <td className="px-3 py-3">
                        <Link
                          href={`/dashboard/orders/${encodeURIComponent(ref)}`}
                          className="font-medium text-[var(--brand)]"
                        >
                          {ref}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3">
                        {first
                          ? `${first.serviceName} · ${first.quantityLabel}`
                          : '—'}
                      </td>
                      <td className="max-w-[12rem] truncate px-3 py-3" title={target}>
                        {target}
                      </td>
                      <td className="px-3 py-3">
                        {formatMoney(order.total.amount, order.total.currency)}
                      </td>
                      <td className="px-3 py-3 capitalize">
                        {order.payment?.status ?? 'pending'}
                      </td>
                      <td className="px-3 py-3">
                        {getAdminStatusLabel(order.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {orders.map((order) => {
              const ref =
                typeof order.publicNumber === 'number'
                  ? formatOrderNumber(order.publicNumber)
                  : order.id;
              const first = order.items[0];
              return (
                <li key={order.id}>
                  <Link
                    href={`/dashboard/orders/${encodeURIComponent(ref)}`}
                    className="block rounded-lg border bg-background p-4 space-y-1"
                  >
                    <p className="font-medium">{ref}</p>
                    <p className="text-sm text-muted-foreground">
                      {first
                        ? `${first.serviceName} · ${first.quantityLabel}`
                        : order.status}
                    </p>
                    <p className="text-sm">
                      {formatMoney(order.total.amount, order.total.currency)} ·{' '}
                      {getAdminStatusLabel(order.status)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between gap-3">
            <Button asChild variant="outline" disabled={page <= 1}>
              <Link href={`/dashboard/orders?page=${page - 1}`}>
                {ACCOUNT_UI.orders.previous}
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button asChild variant="outline" disabled={page >= totalPages}>
              <Link href={`/dashboard/orders?page=${page + 1}`}>
                {ACCOUNT_UI.orders.next}
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

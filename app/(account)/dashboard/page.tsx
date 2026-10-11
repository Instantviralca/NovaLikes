import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/typography/heading';
import { formatAccountDate } from '@/lib/customers/format';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import {
  getCustomerOrderStats,
  listCustomerOrders,
} from '@/lib/customers/orders';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { formatOrderNumber } from '@/lib/orders/public-number';
import { getAdminStatusLabel } from '@/lib/orders/status';
import { formatMoney } from '@/lib/pricing/format';
import type { CurrencyCode } from '@/types/pricing';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardHomePage() {
  const customer = await getCustomerFromCookies();
  if (!customer) return null;

  const [stats, recent] = await Promise.all([
    getCustomerOrderStats(customer.id),
    listCustomerOrders(customer.id, { limit: 5, offset: 0 }),
  ]);

  const firstName = customer.name?.trim().split(/\s+/)[0];
  const spentEntries = Object.entries(stats.totalSpentByCurrency);
  const spentLabel =
    spentEntries.length === 0
      ? formatMoney(0, 'USD')
      : spentEntries
          .map(([currency, amount]) => formatMoney(amount, currency as CurrencyCode))
          .join(' · ');

  return (
    <div className="space-y-8">
      <Heading as="h1" size="h1">
        {firstName
          ? ACCOUNT_UI.home.welcomeNamed(firstName)
          : ACCOUNT_UI.home.welcome}
      </Heading>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [ACCOUNT_UI.home.totalOrders, String(stats.totalOrders)],
          [ACCOUNT_UI.home.completed, String(stats.completed)],
          [ACCOUNT_UI.home.inProgress, String(stats.inProgress)],
          [ACCOUNT_UI.home.totalSpent, spentLabel],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-background p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{ACCOUNT_UI.home.recent}</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-[var(--brand)]"
          >
            {ACCOUNT_UI.home.viewAll}
          </Link>
        </div>
        {recent.orders.length === 0 ? (
          <div className="rounded-lg border bg-background p-6 text-center space-y-3">
            <h3 className="font-semibold">{ACCOUNT_UI.home.emptyH}</h3>
            <p className="text-sm text-muted-foreground">{ACCOUNT_UI.home.emptyText}</p>
            <Button asChild>
              <Link href="/">{ACCOUNT_UI.home.browse}</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y rounded-lg border bg-background">
            {recent.orders.map((order) => {
              const ref =
                typeof order.publicNumber === 'number'
                  ? formatOrderNumber(order.publicNumber)
                  : order.id;
              const first = order.items[0];
              const service = first
                ? `${first.serviceName} · ${first.quantityLabel}`
                : '—';
              const dateLabel = formatAccountDate(order.createdAt);
              const totalLabel = formatMoney(order.total.amount, order.total.currency);
              const statusLabel = getAdminStatusLabel(order.status);
              const href = `/dashboard/orders/${encodeURIComponent(ref)}`;
              return (
                <li key={order.id}>
                  <Link
                    href={href}
                    className="block px-4 py-3 text-sm hover:bg-muted/40"
                  >
                    <div className="space-y-1 sm:hidden">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{ref}</span>
                        <span className="inline-flex rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand)]">
                          {statusLabel}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{service}</p>
                      <div className="flex items-center justify-between gap-3 text-muted-foreground">
                        <span>{dateLabel}</span>
                        <span className="font-medium text-foreground">{totalLabel}</span>
                      </div>
                    </div>
                    <div className="hidden sm:grid sm:grid-cols-[auto_auto_1fr_auto_auto] sm:items-center sm:gap-4">
                      <span className="font-medium">{ref}</span>
                      <span className="text-muted-foreground">{dateLabel}</span>
                      <span>{service}</span>
                      <span className="inline-flex rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand)]">
                        {statusLabel}
                      </span>
                      <span className="font-medium">{totalLabel}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/buy-tiktok-followers">{ACCOUNT_UI.home.buyTiktok}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/buy-instagram-followers">{ACCOUNT_UI.home.buyInstagram}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/track-order">{ACCOUNT_UI.home.trackOrder}</Link>
          </Button>
        </div>
      </section>

      <section className="rounded-lg border bg-background p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">{ACCOUNT_UI.home.profilesTitle}</h2>
          <Link
            href="/dashboard/settings"
            className="text-sm font-medium text-[var(--brand)]"
          >
            {ACCOUNT_UI.home.edit}
          </Link>
        </div>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{ACCOUNT_UI.home.tiktok}</dt>
            <dd dir="ltr">
              {customer.tiktokUsername
                ? `@${customer.tiktokUsername}`
                : ACCOUNT_UI.home.notAdded}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{ACCOUNT_UI.home.instagram}</dt>
            <dd dir="ltr">
              {customer.instagramUsername
                ? `@${customer.instagramUsername}`
                : ACCOUNT_UI.home.notAdded}
            </dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">{ACCOUNT_UI.home.profilesNote}</p>
      </section>
    </div>
  );
}

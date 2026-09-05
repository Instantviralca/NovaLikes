import Link from 'next/link';

import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { Button } from '@/components/ui/button';
import type { DashboardOrderRow } from '@/types/admin-dashboard';

type PendingOrdersWidgetProps = {
  orders: DashboardOrderRow[];
  loading?: boolean;
};

export function PendingOrdersWidget({ orders, loading }: PendingOrdersWidgetProps) {
  return (
    <AdminCard title="Pending orders" description="Orders waiting for manual review">
      {loading ? (
        <div className="space-y-2" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-muted" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <AdminEmptyState
          title="No pending orders"
          description="New paid orders will show here for review."
        />
      ) : (
        <ul className="space-y-3">
          {orders.slice(0, 10).map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between gap-3 border-b pb-3 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{order.publicOrderId}</p>
                <p className="text-xs text-muted-foreground">
                  {order.service} · {order.customer}
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={order.href}>View</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Button asChild variant="secondary" size="sm">
          <Link href="/admin/orders">View all orders</Link>
        </Button>
      </div>
    </AdminCard>
  );
}

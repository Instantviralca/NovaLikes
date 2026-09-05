import Link from 'next/link';

import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminTable } from '@/components/admin/tables/admin-table';
import { Button } from '@/components/ui/button';
import type { DashboardOrderRow } from '@/types/admin-dashboard';

type RecentOrdersTableProps = {
  orders: DashboardOrderRow[];
  loading?: boolean;
};

export function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  return (
    <AdminCard title="Recent orders" description="Latest customer orders">
      {orders.length === 0 && !loading ? (
        <AdminEmptyState
          title="No orders yet"
          description="Orders will appear here after checkout and payment succeed."
        />
      ) : (
        <AdminTable
          loading={loading}
          rows={orders}
          rowKey={(row) => row.id}
          columns={[
            { id: 'id', header: 'Order ID', cell: (row) => row.publicOrderId },
            { id: 'customer', header: 'Customer', cell: (row) => row.customer },
            { id: 'service', header: 'Service', cell: (row) => row.service },
            { id: 'package', header: 'Package', cell: (row) => row.packageTitle },
            { id: 'status', header: 'Status', cell: (row) => row.status },
            { id: 'total', header: 'Total', cell: (row) => row.total },
            { id: 'created', header: 'Created', cell: (row) => row.createdAt },
            {
              id: 'action',
              header: 'Action',
              cell: (row) => (
                <Button asChild size="sm" variant="outline">
                  <Link href={row.href}>View</Link>
                </Button>
              ),
            },
          ]}
        />
      )}
    </AdminCard>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';

import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { BulkActionsBar } from '@/components/admin/orders/bulk-actions-bar';
import { OrderDetailsDrawer } from '@/components/admin/orders/order-details-drawer';
import { OrderFilters } from '@/components/admin/orders/order-filters';
import { OrderSearch } from '@/components/admin/orders/order-search';
import { OrdersTable } from '@/components/admin/orders/orders-table';
import { Button } from '@/components/ui/button';
import { paginate, totalPages } from '@/lib/admin/list-utils';
import type {
  AdminOrderDetails,
  AdminOrderFilters,
  AdminOrderRow,
  AdminOrderSort,
} from '@/types/admin-orders';
import type { OrderStatus } from '@/types/order-status';

type ServiceOption = {
  slug: string;
  name: string;
  platformId: string;
  packageCount: number;
};

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

export function OrdersPage() {
  const [allOrders, setAllOrders] = useState<AdminOrderRow[]>([]);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminOrderFilters>({ status: 'all', platform: 'all' });
  const [sort, setSort] = useState<AdminOrderSort>('newest');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [details, setDetails] = useState<AdminOrderDetails | null>(null);
  const [updating, setUpdating] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/admin/orders');
        const data = (await response.json()) as {
          ok?: boolean;
          orders?: AdminOrderRow[];
          services?: ServiceOption[];
          error?: string;
        };
        if (!response.ok || !data.ok) {
          if (!cancelled) {
            setLoadError(data.error ?? 'Unable to load orders.');
            setLoading(false);
          }
          return;
        }
        if (!cancelled) {
          setAllOrders(data.orders ?? []);
          setServiceOptions(data.services ?? []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError('Unable to load orders.');
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = allOrders.filter((order) => {
      if (filters.status && filters.status !== 'all' && order.orderStatus !== filters.status) {
        return false;
      }
      if (filters.platform && filters.platform !== 'all' && order.platformId !== filters.platform) {
        return false;
      }
      if (!q) return true;
      return (
        order.id.toLowerCase().includes(q) ||
        order.publicOrderId.toLowerCase().includes(q) ||
        order.customerEmail.toLowerCase().includes(q) ||
        order.serviceName.toLowerCase().includes(q) ||
        order.targetDisplay.toLowerCase().includes(q)
      );
    });

    rows = [...rows].sort((a, b) => {
      if (sort === 'oldest') return a.createdAt.localeCompare(b.createdAt);
      if (sort === 'status') return a.orderStatus.localeCompare(b.orderStatus);
      if (sort === 'updated') return b.updatedAt.localeCompare(a.updatedAt);
      return b.createdAt.localeCompare(a.createdAt);
    });

    return rows;
  }, [allOrders, filters, query, sort]);

  const pages = totalPages(filtered.length, pageSize);
  const pageRows = paginate(filtered, page, pageSize);

  async function openDetails(id: string) {
    setDetailsError(null);
    try {
      const response = await fetch(`/api/admin/orders?orderId=${encodeURIComponent(id)}`);
      const data = (await response.json()) as {
        ok?: boolean;
        order?: AdminOrderDetails;
      };
      if (response.ok && data.ok && data.order) {
        setDetails(data.order);
      }
    } catch {
      // ignore
    }
  }

  function applyUpdatedOrder(order: AdminOrderDetails) {
    setDetails(order);
    setAllOrders((prev) =>
      prev.map((row) =>
        row.id === order.id
          ? {
              ...row,
              orderStatus: order.orderStatus,
              paymentStatus: order.paymentStatus,
              updatedAt: order.updatedAt,
            }
          : row,
      ),
    );
  }

  async function patchOrder(body: Record<string, unknown>) {
    const csrf = readCsrfToken();
    const response = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(csrf ? { 'x-csrf-token': csrf } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      order?: AdminOrderDetails;
      error?: string;
    };
    if (!response.ok || !data.ok || !data.order) {
      throw new Error(data.error ?? 'Unable to update order.');
    }
    return data.order;
  }

  async function handleStatusChange(nextStatus: OrderStatus) {
    if (!details || updating) return;
    setUpdating(true);
    setDetailsError(null);
    try {
      const order = await patchOrder({
        orderId: details.id,
        action: 'status',
        nextStatus,
      });
      applyUpdatedOrder(order);
    } catch (error) {
      setDetailsError(error instanceof Error ? error.message : 'Unable to update status.');
    } finally {
      setUpdating(false);
    }
  }

  async function handleAddNote(body: string) {
    if (!details || updating) return;
    setUpdating(true);
    setDetailsError(null);
    try {
      const order = await patchOrder({
        orderId: details.id,
        action: 'note',
        note: body,
      });
      applyUpdatedOrder(order);
    } catch (error) {
      setDetailsError(error instanceof Error ? error.message : 'Unable to add note.');
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Orders"
        description="Manual fulfillment workspace for NovaLikes orders."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading orders…</p>
      ) : null}
      {loadError ? (
        <p className="text-sm text-destructive" role="alert">
          {loadError}
        </p>
      ) : null}

      <div className="space-y-3">
        <OrderSearch value={query} onChange={(value) => { setQuery(value); setPage(1); }} />
        <OrderFilters
          filters={filters}
          sort={sort}
          serviceOptions={serviceOptions}
          onFiltersChange={(next) => { setFilters(next); setPage(1); }}
          onSortChange={setSort}
        />
        <BulkActionsBar selectedCount={selectedIds.length} />
      </div>

      <OrdersTable
        orders={pageRows}
        selectedIds={selectedIds}
        onToggle={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((item) => item !== id),
          )
        }
        onOpen={openDetails}
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {filtered.length} order{filtered.length === 1 ? '' : 's'} · Page {page} of {pages}
        </p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>

      <OrderDetailsDrawer
        open={Boolean(details)}
        order={details}
        updating={updating}
        error={detailsError}
        onStatusChange={handleStatusChange}
        onAddNote={handleAddNote}
        onOpenChange={(open) => {
          if (!open) {
            setDetails(null);
            setDetailsError(null);
          }
        }}
      />
    </div>
  );
}

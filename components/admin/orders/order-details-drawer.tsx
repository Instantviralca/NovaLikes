'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { InternalNotes } from '@/components/admin/orders/internal-notes';
import { OrderSummaryCard } from '@/components/admin/orders/order-summary-card';
import { OrderTimeline } from '@/components/admin/orders/order-timeline';
import { StatusSelector } from '@/components/admin/orders/status-selector';
import type { AdminOrderDetails } from '@/types/admin-orders';
import type { OrderStatus } from '@/types/order-status';

type OrderDetailsDrawerProps = {
  open: boolean;
  order: AdminOrderDetails | null;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (status: OrderStatus) => void | Promise<void>;
  onAddNote?: (body: string) => void | Promise<void>;
  updating?: boolean;
  error?: string | null;
};

export function OrderDetailsDrawer({
  open,
  order,
  onOpenChange,
  onStatusChange,
  onAddNote,
  updating = false,
  error = null,
}: OrderDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{order ? `Order ${order.publicOrderId}` : 'Order details'}</SheetTitle>
          <SheetDescription>Manual fulfillment workspace</SheetDescription>
        </SheetHeader>

        {order ? (
          <div className="mt-6 space-y-6">
            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Status</h3>
              <StatusSelector
                current={order.orderStatus}
                busy={updating}
                onChange={(status) => {
                  void onStatusChange?.(status);
                }}
              />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Summary & delivery</h3>
              <OrderSummaryCard order={order} />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Timeline</h3>
              <OrderTimeline events={order.timeline} />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Internal notes</h3>
              <InternalNotes
                notes={order.internalNotes}
                onAdd={(body) => {
                  void onAddNote?.(body);
                }}
              />
            </section>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

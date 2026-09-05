'use client';

import type { AdminOrderDetails } from '@/types/admin-orders';

type OrderSummaryCardProps = {
  order: AdminOrderDetails;
};

function CopyableValue({ value }: { value: string }) {
  const isUrl = /^https?:\/\//i.test(value);
  return (
    <dd className="break-all font-medium">
      {isUrl ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brand)] underline-offset-2 hover:underline"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </dd>
  );
}

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <div className="space-y-4">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Order ID</dt>
          <dd className="font-medium">{order.publicOrderId}</dd>
        </div>
        {order.publicOrderId !== order.id ? (
          <div>
            <dt className="text-muted-foreground">Internal ID</dt>
            <dd className="font-mono text-xs text-muted-foreground">{order.id}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-muted-foreground">Customer</dt>
          <dd className="font-medium">{order.customerEmail}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Platform</dt>
          <dd className="font-medium capitalize">{order.platformId}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Service</dt>
          <dd className="font-medium">{order.serviceName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Package</dt>
          <dd className="font-medium">{order.packageTitle}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Quantity</dt>
          <dd className="font-medium">{order.quantityLabel}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Total</dt>
          <dd className="font-medium">{order.totalDisplay}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Payment</dt>
          <dd className="font-medium">
            {order.paymentMethod ?? '—'} · {order.paymentStatus}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Updated</dt>
          <dd className="font-medium">{new Date(order.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>

      <div className="rounded-lg border border-[var(--border-subtle)] bg-muted/30 p-3">
        <h4 className="mb-2 text-sm font-semibold">Delivery details</h4>
        {order.fulfillmentFields.length > 0 ? (
          <dl className="space-y-3 text-sm">
            {order.fulfillmentFields.map((field) => (
              <div key={field.key}>
                <dt className="text-muted-foreground">{field.label}</dt>
                <CopyableValue value={field.value} />
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            No delivery target was saved on this order.
            {order.targetDisplay && order.targetDisplay !== '—'
              ? ` Fallback: ${order.targetDisplay}`
              : ''}
          </p>
        )}
        {order.customerNotes ? (
          <div className="mt-3 border-t pt-3 text-sm">
            <p className="text-muted-foreground">Customer notes</p>
            <p className="whitespace-pre-wrap font-medium">{order.customerNotes}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

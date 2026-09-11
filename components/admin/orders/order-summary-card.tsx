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
  const lines = order.lines?.length ? order.lines : [];

  return (
    <div className="space-y-4">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Order ID</dt>
          <dd className="font-medium">{order.publicOrderId}</dd>
        </div>
        {order.publicOrderId !== order.id ? (
          <div>
            <dt className="text-muted-foreground">Internal reference</dt>
            <dd className="font-mono text-xs text-muted-foreground">{order.id}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-muted-foreground">Customer</dt>
          <dd className="font-medium">{order.customerEmail}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Items</dt>
          <dd className="font-medium">
            {order.itemCountLabel}
            {order.purchaseUnitCount !== order.itemCount
              ? ` · ${order.purchaseUnitCount} purchase units`
              : ''}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{order.subtotalDisplay}</dd>
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
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium capitalize">{order.orderStatus}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Updated</dt>
          <dd className="font-medium">{new Date(order.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Purchased items</h4>
        {lines.length === 0 ? (
          <p className="text-sm text-muted-foreground">No line items on this order.</p>
        ) : (
          lines.map((line) => (
            <article
              key={line.id}
              className="rounded-lg border border-[var(--border-subtle)] bg-muted/30 p-3 space-y-2"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{line.serviceName}</p>
                <p className="text-xs capitalize text-muted-foreground">{line.platformId}</p>
              </div>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Package</dt>
                  <dd className="font-medium">{line.packageTitle}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Package size</dt>
                  <dd className="font-medium">{line.quantityLabel}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Qty</dt>
                  <dd className="font-medium">{line.lineQuantity}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Unit price</dt>
                  <dd className="font-medium">{line.unitPriceDisplay}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Line total</dt>
                  <dd className="font-medium">{line.lineTotalDisplay}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Profile / Target</dt>
                  <CopyableValue value={line.targetDisplay} />
                </div>
              </dl>
              {line.fulfillmentFields.length > 1 ? (
                <dl className="space-y-2 border-t pt-2 text-sm">
                  {line.fulfillmentFields.map((field) => (
                    <div key={field.key}>
                      <dt className="text-muted-foreground">{field.label}</dt>
                      <CopyableValue value={field.value} />
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          ))
        )}
      </div>

      {order.customerNotes ? (
        <div className="rounded-lg border p-3 text-sm">
          <p className="text-muted-foreground">Customer notes</p>
          <p className="whitespace-pre-wrap font-medium">{order.customerNotes}</p>
        </div>
      ) : null}
    </div>
  );
}

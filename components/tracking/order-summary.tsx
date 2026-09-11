import type { PublicTrackedOrder } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderSummaryProps = {
  order: PublicTrackedOrder;
  className?: string;
};

export function OrderSummary({ order, className }: OrderSummaryProps) {
  const items = order.items?.length
    ? order.items
    : [
        {
          serviceName: order.serviceName,
          packageTitle: order.packageTitle,
          quantityLabel: order.quantityLabel,
          lineQuantity: 1,
          targetDisplay: order.targetDisplay,
        },
      ];

  return (
    <div className={cn('space-y-4', className)}>
      <dl className="grid gap-3 rounded-lg border p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Order ID</dt>
          <dd className="font-medium">{order.orderId}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Items</dt>
          <dd className="font-medium">
            {order.itemCount ?? items.length}{' '}
            {(order.itemCount ?? items.length) === 1 ? 'item' : 'items'}
          </dd>
        </div>
        {order.orderTotalDisplay ? (
          <div>
            <dt className="text-muted-foreground">Order total</dt>
            <dd className="font-medium">{order.orderTotalDisplay}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-muted-foreground">Order date</dt>
          <dd className="font-medium">
            <time dateTime={order.createdAt}>
              {new Date(order.createdAt).toLocaleDateString()}
            </time>
          </dd>
        </div>
        {order.estimatedDelivery ? (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Estimated delivery</dt>
            <dd className="font-medium">{order.estimatedDelivery}</dd>
          </div>
        ) : null}
      </dl>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Purchased items</h3>
        {items.map((line, index) => (
          <dl
            key={`${line.serviceName}-${line.packageTitle}-${index}`}
            className="grid gap-2 rounded-lg border p-4 text-sm sm:grid-cols-2"
          >
            <div>
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-medium">{line.serviceName}</dd>
            </div>
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
              <dt className="text-muted-foreground">Target</dt>
              <dd className="font-medium">{line.targetDisplay}</dd>
            </div>
            {line.lineTotalDisplay ? (
              <div>
                <dt className="text-muted-foreground">Line total</dt>
                <dd className="font-medium">{line.lineTotalDisplay}</dd>
              </div>
            ) : null}
          </dl>
        ))}
      </div>
    </div>
  );
}

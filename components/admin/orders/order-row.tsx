'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { AdminOrderRow } from '@/types/admin-orders';
import { cn } from '@/lib/utils';

type OrderRowProps = {
  order: AdminOrderRow;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onOpen: () => void;
  className?: string;
};

export function OrderRow({ order, selected, onSelect, onOpen, className }: OrderRowProps) {
  return (
    <tr className={cn('border-b last:border-0', className)}>
      <td className="px-3 py-3">
        <Checkbox
          checked={selected}
          onCheckedChange={(value) => onSelect(Boolean(value))}
          aria-label={`Select order ${order.id}`}
        />
      </td>
      <td className="px-3 py-3 font-medium">{order.publicOrderId}</td>
      <td className="px-3 py-3">{order.customerEmail}</td>
      <td className="px-3 py-3 capitalize">{order.platformId}</td>
      <td className="px-3 py-3">{order.serviceName}</td>
      <td className="px-3 py-3">{order.packageTitle}</td>
      <td className="max-w-[14rem] truncate px-3 py-3" title={order.targetDisplay}>
        {order.targetDisplay}
      </td>
      <td className="px-3 py-3">{order.quantityLabel}</td>
      <td className="px-3 py-3">{order.totalDisplay}</td>
      <td className="px-3 py-3">{order.paymentStatus}</td>
      <td className="px-3 py-3 capitalize">{order.orderStatus}</td>
      <td className="px-3 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
      <td className="px-3 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onOpen}>
          View
        </Button>
      </td>
    </tr>
  );
}

/** Mobile card variant */
export function OrderRowCard({ order, selected, onSelect, onOpen }: OrderRowProps) {
  return (
    <article className="rounded-lg border p-4 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{order.publicOrderId}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>
        <Checkbox
          checked={selected}
          onCheckedChange={(value) => onSelect(Boolean(value))}
          aria-label={`Select order ${order.id}`}
        />
      </div>
      <p className="text-sm">
        {order.serviceName} · {order.packageTitle}
      </p>
      <p className="break-all text-sm">
        <span className="text-muted-foreground">Target:</span> {order.targetDisplay}
      </p>
      <p className="text-sm capitalize">
        {order.orderStatus} · {order.totalDisplay}
      </p>
      <Button type="button" size="sm" variant="outline" onClick={onOpen}>
        View details
      </Button>
    </article>
  );
}

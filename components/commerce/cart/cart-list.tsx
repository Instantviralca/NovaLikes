import { CartItemRow } from '@/components/commerce/cart/cart-item';
import type { CartItem } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartListProps = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  className?: string;
  /** When true, omit outer list spacing (site-v2 panel / drawer). */
  bare?: boolean;
};

export function CartList({
  items,
  onRemove,
  onIncrement,
  onDecrement,
  className,
  bare = false,
}: CartListProps) {
  return (
    <div className={cn(bare ? undefined : 'space-y-3', className)} role="list">
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onRemove={onRemove}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </div>
  );
}

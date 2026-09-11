import { CartItemRow } from '@/components/commerce/cart/cart-item';
import type { CartItem } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartListProps = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  className?: string;
};

export function CartList({
  items,
  onRemove,
  onIncrement,
  onDecrement,
  className,
}: CartListProps) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onRemove={onRemove}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </ul>
  );
}

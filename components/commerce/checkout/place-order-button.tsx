'use client';

import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PlaceOrderButtonProps = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  /** Site-v2 solid accent button (`.btn.block.shine`). */
  tone?: 'default' | 'siteV2';
  showLock?: boolean;
};

export function PlaceOrderButton({
  label = 'Place Order',
  disabled,
  loading,
  onClick,
  className,
  tone = 'default',
  showLock = false,
}: PlaceOrderButtonProps) {
  if (tone === 'siteV2') {
    return (
      <button
        type="button"
        className={cn('btn block shine', className)}
        disabled={disabled || loading}
        data-analytics="place-order"
        onClick={onClick}
      >
        {showLock ? <Lock className="ic" aria-hidden="true" /> : null}
        {label}
      </button>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      className={cn('w-full min-h-11', className)}
      disabled={disabled || loading}
      loading={loading}
      data-analytics="place-order"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

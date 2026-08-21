import { CheckCircle2, Lock, MapPin, RefreshCw, Shield, Star, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

export type TrustItem = {
  id: string;
  label: string;
  icon?: 'shield' | 'lock' | 'check' | 'track' | 'support' | 'refund' | 'star';
};

const ICONS = {
  shield: Shield,
  lock: Lock,
  check: CheckCircle2,
  track: MapPin,
  support: Users,
  refund: RefreshCw,
  star: Star,
} as const;

/** Default cart/checkout trust — includes risk reversal. */
export const DEFAULT_TRUST_ITEMS: TrustItem[] = [
  { id: 'no-password', label: 'No password required', icon: 'lock' },
  { id: 'secure', label: 'Secure checkout', icon: 'shield' },
  { id: 'refund', label: '30-Day Money-Back Guarantee', icon: 'refund' },
  { id: 'track', label: 'Order tracking', icon: 'track' },
  { id: 'support', label: 'Professional support', icon: 'support' },
];

type TrustStripProps = {
  items?: TrustItem[];
  className?: string;
  variant?: 'light' | 'dark' | 'compact';
};

/**
 * Configuration-safe trust strip — no invented metrics.
 */
export function TrustStrip({
  items = DEFAULT_TRUST_ITEMS,
  className,
  variant = 'light',
}: TrustStripProps) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-3',
        variant === 'compact' && 'gap-x-4 gap-y-2',
        className,
      )}
      aria-label="Trust indicators"
    >
      {items.map((item) => {
        const Icon = ICONS[item.icon ?? 'check'];
        return (
          <li
            key={item.id}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium',
              variant === 'dark' ? 'text-white/90' : 'text-[var(--text-secondary)]',
            )}
          >
            <Icon
              className={cn(
                'size-4 shrink-0',
                'text-[var(--brand-primary)]',
              )}
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

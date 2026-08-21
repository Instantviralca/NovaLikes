import { Award, ShoppingCart, Star, Users } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const STATS = [
  {
    id: 'customers',
    value: '250K+',
    label: 'Happy Customers',
    icon: Users,
  },
  {
    id: 'orders',
    value: '1M+',
    label: 'Orders Delivered',
    icon: ShoppingCart,
  },
  {
    id: 'rating',
    value: '4.8/5',
    label: 'Average Rating',
    icon: Star,
  },
  {
    id: 'success',
    value: '99.9%',
    label: 'Order Success Rate',
    icon: Award,
  },
] as const;

type AboutTrustStatsProps = {
  className?: string;
  ariaLabel?: string;
  labels?: {
    customers: string;
    orders: string;
    rating: string;
    success: string;
  };
};

/** About stats bar — four peach metric cards matching the About mockup. */
export function AboutTrustStats({
  className,
  ariaLabel = 'NovaLikes highlights',
  labels,
}: AboutTrustStatsProps) {
  return (
    <section
      className={cn('w-full bg-[#FFF6EE] py-8 md:py-10', className)}
      aria-label={ariaLabel}
    >
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-3 rounded-2xl bg-[#FFEFE3] px-4 py-4 sm:px-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm">
                  <Icon className="size-5" strokeWidth={2.25} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {labels?.[stat.id] ?? stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

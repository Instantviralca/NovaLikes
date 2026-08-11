import {
  CreditCard,
  Eye,
  Globe,
  Headphones,
  Lock,
  PackageSearch,
  type LucideIcon,
} from 'lucide-react';

import { FeatureCard } from '@/components/cards/feature-card';
import { Grid } from '@/components/layout/grid';

const TRUST_STATS: {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: 'about-trust-secure-checkout',
    title: 'Secure Checkout',
    description: 'Encrypted payment processing.',
    icon: CreditCard,
  },
  {
    id: 'about-trust-order-tracking',
    title: 'Order Tracking',
    description: 'Track every order from confirmation to delivery.',
    icon: PackageSearch,
  },
  {
    id: 'about-trust-platforms',
    title: 'Multiple Platforms',
    description: 'Instagram, TikTok, YouTube and Facebook.',
    icon: Globe,
  },
  {
    id: 'about-trust-password',
    title: 'Password Never Required',
    description: 'Only public URLs are requested.',
    icon: Lock,
  },
  {
    id: 'about-trust-transparent',
    title: 'Transparent Ordering',
    description: 'Clear package information before checkout.',
    icon: Eye,
  },
  {
    id: 'about-trust-support',
    title: 'Customer Support',
    description: 'Helpful customer support whenever required.',
    icon: Headphones,
  },
];

/** Trusted Ordering Experience — six statistic cards below Our Story. */
export function AboutTrustStats() {
  return (
    <Grid cols={3} className="gap-4">
      {TRUST_STATS.map((item) => {
        const Icon = item.icon;
        return (
          <FeatureCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={<Icon strokeWidth={2} />}
            className="transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_14px_32px_-24px_rgba(28,25,23,0.3)]"
          />
        );
      })}
    </Grid>
  );
}

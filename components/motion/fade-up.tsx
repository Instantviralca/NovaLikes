import type { HTMLAttributes, ReactNode } from 'react';

import { fadeDelayStyle } from '@/components/motion/fade-delay-style';
import { cn } from '@/lib/utils';

type FadeUpProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  /** Animate on mount (for above-the-fold content). Default: fade + translate. */
  immediate?: boolean;
  children?: ReactNode;
};

/**
 * CSS fade-up. Never leaves above-the-fold content stuck at opacity 0.
 */
export function FadeUp({
  className,
  delay = 0,
  immediate = false,
  style,
  ...props
}: FadeUpProps) {
  return (
    <div
      className={cn(immediate ? 'nl-fade-up-immediate' : 'nl-fade-up', className)}
      style={fadeDelayStyle(delay, style)}
      {...props}
    />
  );
}

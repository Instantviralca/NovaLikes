import type { HTMLAttributes, ReactNode } from 'react';

import { fadeDelayStyle } from '@/components/motion/fade-delay-style';
import { cn } from '@/lib/utils';

type FadeRightProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  children?: ReactNode;
};

export function FadeRight({ className, delay = 0, style, ...props }: FadeRightProps) {
  return (
    <div
      className={cn('nl-fade-right', className)}
      style={fadeDelayStyle(delay, style)}
      {...props}
    />
  );
}

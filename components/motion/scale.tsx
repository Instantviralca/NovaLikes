import type { HTMLAttributes, ReactNode } from 'react';

import { fadeDelayStyle } from '@/components/motion/fade-delay-style';
import { cn } from '@/lib/utils';

type ScaleProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  children?: ReactNode;
};

export function Scale({ className, delay = 0, style, ...props }: ScaleProps) {
  return (
    <div
      className={cn('nl-scale-in', className)}
      style={fadeDelayStyle(delay, style)}
      {...props}
    />
  );
}

import type { HTMLAttributes, ReactNode } from 'react';

import { fadeDelayStyle } from '@/components/motion/fade-delay-style';
import { cn } from '@/lib/utils';

type FadeLeftProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  children?: ReactNode;
};

export function FadeLeft({ className, delay = 0, style, ...props }: FadeLeftProps) {
  return (
    <div
      className={cn('nl-fade-left', className)}
      style={fadeDelayStyle(delay, style)}
      {...props}
    />
  );
}

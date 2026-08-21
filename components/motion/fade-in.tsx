import type { HTMLAttributes, ReactNode } from 'react';

import { fadeDelayStyle } from '@/components/motion/fade-delay-style';
import { cn } from '@/lib/utils';

type FadeInProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  children?: ReactNode;
};

export function FadeIn({ className, delay = 0, style, ...props }: FadeInProps) {
  return (
    <div
      className={cn('nl-fade-in', className)}
      style={fadeDelayStyle(delay, style)}
      {...props}
    />
  );
}

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/** Phase 18 VDS type hierarchy — Hero Title / H1–H4 */
const headingVariants = cva('tracking-tight text-foreground text-balance break-words', {
  variants: {
    size: {
      display: 'type-hero font-bold',
      h1: 'type-h1 font-bold',
      h2: 'type-h2 font-semibold',
      h3: 'type-h3 font-semibold',
      h4: 'type-h4 font-semibold',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
});

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingAs;
}

export function Heading({ as = 'h2', size, className, ...props }: HeadingProps) {
  const Comp = as;
  return <Comp className={cn(headingVariants({ size: size ?? as }), className)} {...props} />;
}

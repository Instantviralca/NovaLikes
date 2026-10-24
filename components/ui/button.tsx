import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-normal text-center rounded-xl text-sm font-semibold transition-[color,background-color,background-image,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(249_115_22_/_0.4)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /** Primary — homepage gradient CTA */
        default:
          'bg-nl-grad text-white shadow-[var(--shadow-glow)] hover:-translate-y-px hover:shadow-[0_14px_28px_-12px_rgba(234,88,12,0.65)] active:scale-[0.98]',
        primary:
          'bg-nl-grad text-white shadow-[var(--shadow-glow)] hover:-translate-y-px hover:shadow-[0_14px_28px_-12px_rgba(234,88,12,0.65)] active:scale-[0.98]',
        /** Danger — admin / destructive only */
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/95',
        danger:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/95',
        /** Secondary / outline — orange border */
        outline:
          'border-[1.5px] border-[var(--nl-orange)] bg-white text-[var(--nl-orange)] hover:-translate-y-px hover:shadow-[0_8px_20px_-14px_rgba(234,88,12,0.45)] active:bg-[var(--nl-bg-soft)]',
        secondary:
          'border-[1.5px] border-[var(--nl-orange)] bg-white text-[var(--nl-orange)] hover:-translate-y-px hover:shadow-[0_8px_20px_-14px_rgba(234,88,12,0.45)] active:bg-[var(--nl-bg-soft)]',
        /** Ghost / link — orange */
        ghost:
          'text-[var(--nl-orange)] hover:bg-[var(--nl-eyebrow-bg)] hover:text-[var(--nl-orange)] active:bg-[var(--nl-bg-soft)]',
        link: 'rounded-md text-[var(--nl-orange)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-auto min-h-10 px-5 py-2',
        sm: 'h-auto min-h-9 rounded-xl px-3 text-xs',
        lg: 'h-auto min-h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10 min-h-10 whitespace-nowrap',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild && !loading ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

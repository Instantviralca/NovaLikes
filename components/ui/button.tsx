import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-normal text-center rounded-xl text-sm font-semibold transition-[color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /** Primary — brand CTA (VDS) */
        default:
          'bg-[var(--brand-primary)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)] hover:bg-[var(--brand-primary-hover)] hover:shadow-[var(--shadow-glow)] active:scale-[0.98]',
        primary:
          'bg-[var(--brand-primary)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)] hover:bg-[var(--brand-primary-hover)] hover:shadow-[var(--shadow-glow)] active:scale-[0.98]',
        /** Danger — admin / destructive only (VDS) */
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/95',
        danger:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/95',
        /** Secondary — outline */
        outline:
          'border border-[var(--border-strong)] bg-white hover:bg-[var(--brand-accent-soft)] hover:text-[var(--text-primary)] active:bg-[var(--brand-accent-soft)]',
        secondary:
          'border border-[var(--border-strong)] bg-white text-[var(--text-primary)] hover:bg-[var(--brand-accent-soft)] active:bg-[var(--brand-accent-soft)]',
        /** Ghost — minimal */
        ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        link: 'rounded-md text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-auto min-h-10 px-5 py-2',
        sm: 'h-auto min-h-9 rounded-lg px-3 text-xs',
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

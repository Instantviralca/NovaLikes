'use client';

import { CreditCard } from 'lucide-react';
import type { MutableRefObject } from 'react';

import {
  MollieCardFields,
  type MollieCardFieldsHandle,
} from '@/components/commerce/checkout/mollie-card-fields';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import type { PaymentMethodId, PaymentMethodOption } from '@/types/checkout';
import { cn } from '@/lib/utils';

type PaymentMethodsProps = {
  methods: PaymentMethodOption[];
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  error?: string;
  className?: string;
  /** Hide legend when parent already renders a heading. */
  hideLegend?: boolean;
  mollieHandleRef?: MutableRefObject<MollieCardFieldsHandle | null>;
};

/**
 * Payment method picker — Mollie card fields when remote-payment is selected.
 */
export function PaymentMethods({
  methods,
  value,
  onChange,
  error,
  className,
  hideLegend = false,
  mollieHandleRef,
}: PaymentMethodsProps) {
  const { ui } = useI18nChrome();
  const enabled = methods.filter((m) => m.enabled);

  return (
    <fieldset className={cn('space-y-4', className)}>
      {hideLegend ? <legend className="sr-only">{ui.checkout.paymentMethod}</legend> : (
        <legend className="text-base font-bold">{ui.checkout.paymentMethod}</legend>
      )}
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(next) => onChange(next as PaymentMethodId)}
        aria-invalid={Boolean(error)}
        className="space-y-3"
      >
        {enabled.map((method) => {
          const selected = value === method.id;
          return (
            <div
              key={method.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 transition-colors',
                selected
                  ? 'border-[var(--brand-primary)] bg-[var(--brand-accent-soft)]/50 shadow-[var(--shadow-xs)]'
                  : 'border-[var(--border-subtle)] bg-white hover:border-[var(--brand-primary)]/35',
              )}
            >
              <RadioGroupItem value={method.id} id={`pay-${method.id}`} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <Label htmlFor={`pay-${method.id}`} className="flex items-center gap-2 font-semibold">
                  <CreditCard className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  {method.label}
                </Label>
                {method.id === 'remote-payment' && selected ? (
                  <MollieCardFields enabled handleRef={mollieHandleRef} />
                ) : null}
              </div>
            </div>
          );
        })}
      </RadioGroup>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

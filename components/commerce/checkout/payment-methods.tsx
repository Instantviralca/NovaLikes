'use client';

import type { ReactNode } from 'react';

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
  /** Optional description under each method label. */
  descriptions?: Partial<Record<string, string>>;
  /** Optional chip labels for a method (e.g. Card). */
  chips?: Partial<Record<string, string[]>>;
  /** Slot rendered under the selected method (e.g. Mollie card fields). */
  selectedSlot?: ReactNode;
};

/**
 * Payment method picker — remote card payment redirects to Mollie hosted checkout.
 * Visual: site-v2 `.pay-opt` radio cards. Mollie iframes unchanged when slotted.
 */
export function PaymentMethods({
  methods,
  value,
  onChange,
  error,
  className,
  hideLegend = false,
  descriptions,
  chips,
  selectedSlot,
}: PaymentMethodsProps) {
  const { ui } = useI18nChrome();
  const enabled = methods.filter((m) => m.enabled);

  return (
    <fieldset className={cn('pay-opts', className)}>
      {hideLegend ? (
        <legend className="sr">{ui.checkout.paymentMethod}</legend>
      ) : (
        <legend className="sr">{ui.checkout.paymentMethod}</legend>
      )}
      {enabled.map((method) => {
        const selected = value === method.id;
        const desc = descriptions?.[method.id];
        const methodChips = chips?.[method.id];
        return (
          <div key={method.id}>
            <label className="pay-opt">
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                checked={selected}
                onChange={() => onChange(method.id)}
              />
              <span>
                <b>{method.label}</b>
                {desc ? <em>{desc}</em> : null}
              </span>
              {methodChips && methodChips.length > 0 ? (
                <span className="chips">
                  {methodChips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </span>
              ) : null}
            </label>
            {selected && selectedSlot ? (
              <div className="card-fields" aria-label={ui.checkout.secureCardPayment}>
                {selectedSlot}
              </div>
            ) : null}
          </div>
        );
      })}
      {error ? (
        <p className="err" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

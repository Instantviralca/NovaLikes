'use client';

import { Mail } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import type { CustomerInformation } from '@/types/checkout';

type CustomerInformationFormProps = {
  value: CustomerInformation;
  errors?: Partial<Record<keyof CustomerInformation, string>>;
  onChange: (next: CustomerInformation) => void;
  onEmailBlur?: () => void;
  hideLegend?: boolean;
};

export function CustomerInformationForm({
  value,
  errors,
  onChange,
  onEmailBlur,
  hideLegend = false,
}: CustomerInformationFormProps) {
  const { ui } = useI18nChrome();
  const optional = ui.checkout.optional;

  return (
    <fieldset>
      {hideLegend ? (
        <legend className="sr">{ui.checkout.customerInformation}</legend>
      ) : (
        <legend className="sr">{ui.checkout.customerInformation}</legend>
      )}
      <div className="field">
        <label htmlFor="checkout-email">{ui.checkout.email}</label>
        <div className="input">
          <Mail className="ic" aria-hidden="true" />
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            placeholder="you@example.com"
            value={value.email}
            aria-invalid={Boolean(errors?.email)}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            onBlur={onEmailBlur}
          />
        </div>
        {errors?.email ? (
          <p className="err" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="two">
        <div className="field">
          <label htmlFor="checkout-first-name">
            {ui.checkout.firstName}{' '}
            <span className="hint" style={{ display: 'inline' }}>
              {optional}
            </span>
          </label>
          <div className="input">
            <input
              id="checkout-first-name"
              autoComplete="given-name"
              value={value.firstName ?? ''}
              onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="checkout-last-name">
            {ui.checkout.lastName}{' '}
            <span className="hint" style={{ display: 'inline' }}>
              {optional}
            </span>
          </label>
          <div className="input">
            <input
              id="checkout-last-name"
              autoComplete="family-name"
              value={value.lastName ?? ''}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
            />
          </div>
        </div>
      </div>
      <label className="check" style={{ marginTop: 12 }}>
        <input
          type="checkbox"
          checked={Boolean(value.marketingOptIn)}
          onChange={(e) => onChange({ ...value, marketingOptIn: e.target.checked })}
        />
        <span>
          {ui.checkout.marketingOptIn}
          <br />
          <span className="hint">{ui.checkout.marketingHint}</span>
        </span>
      </label>
    </fieldset>
  );
}

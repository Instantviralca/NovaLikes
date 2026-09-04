'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  return (
    <fieldset className="space-y-4">
      {hideLegend ? (
        <legend className="sr-only">{ui.checkout.customerInformation}</legend>
      ) : (
        <legend className="text-lg font-semibold">{ui.checkout.customerInformation}</legend>
      )}
      <div className="space-y-2">
        <Label htmlFor="checkout-email">
          {ui.checkout.email} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="checkout-email"
          type="email"
          autoComplete="email"
          required
          dir="ltr"
          value={value.email}
          aria-invalid={Boolean(errors?.email)}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          onBlur={onEmailBlur}
        />
        {errors?.email ? (
          <p className="text-xs text-destructive" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="checkout-first-name">{ui.checkout.firstName}</Label>
          <Input
            id="checkout-first-name"
            autoComplete="given-name"
            value={value.firstName ?? ''}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkout-last-name">{ui.checkout.lastName}</Label>
          <Input
            id="checkout-last-name"
            autoComplete="family-name"
            value={value.lastName ?? ''}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          />
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] p-3">
        <Checkbox
          id="checkout-marketing-opt-in"
          checked={Boolean(value.marketingOptIn)}
          onCheckedChange={(checked) =>
            onChange({ ...value, marketingOptIn: checked === true })
          }
          className="mt-0.5"
        />
        <div className="space-y-1">
          <Label htmlFor="checkout-marketing-opt-in" className="font-medium leading-snug">
            {ui.checkout.marketingOptIn}
          </Label>
          <p className="text-xs text-muted-foreground">{ui.checkout.marketingHint}</p>
        </div>
      </div>
    </fieldset>
  );
}

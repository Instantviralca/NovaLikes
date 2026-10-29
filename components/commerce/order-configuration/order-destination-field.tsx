'use client';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { OrderFieldDefinition } from '@/types/order-fields';

export type OrderDestinationFieldProps = {
  field: OrderFieldDefinition;
  value: string | undefined;
  error?: string;
  onChange: (name: string, value: string) => void;
  className?: string;
  autoFocus?: boolean;
};

/**
 * Primary username / URL field for the order details dialog.
 * Labels and validation rules come from the service order-field config.
 */
export function OrderDestinationField({
  field,
  value,
  error,
  onChange,
  className,
  autoFocus,
}: OrderDestinationFieldProps) {
  const { locale } = useI18nChrome();
  const id = `order-destination-${field.id}`;
  const describedBy = error ? `${id}-error` : field.helpText ? `${id}-help` : undefined;
  const required = Boolean(field.validation?.required && !field.optional);

  return (
    <div className={cn('space-y-2', className)} data-analytics="order-destination-field">
      <Label htmlFor={id}>
        {field.label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      <Input
        id={id}
        name={field.name}
        dir={locale === 'ar' ? 'ltr' : undefined}
        type={field.type === 'url' ? 'url' : 'text'}
        inputMode={field.type === 'url' ? 'url' : 'text'}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder={field.placeholder}
        value={value ?? ''}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        autoFocus={autoFocus}
        className="min-h-11"
        onChange={(e) => onChange(field.name, e.target.value)}
      />
      {field.helpText ? (
        <p id={`${id}-help`} className="text-xs text-muted-foreground">
          {field.helpText}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

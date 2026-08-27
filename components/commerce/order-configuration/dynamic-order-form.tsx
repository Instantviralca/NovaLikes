'use client';

import { FieldRenderer } from '@/components/commerce/order-configuration/field-renderer';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import type {
  OrderConfigurationValues,
  OrderFieldDefinition,
} from '@/types/order-fields';

type DynamicOrderFormProps = {
  fields: OrderFieldDefinition[];
  values: OrderConfigurationValues;
  errors: Record<string, string>;
  onChange: (name: string, value: string | boolean | number) => void;
};

export function DynamicOrderForm({
  fields,
  values,
  errors,
  onChange,
}: DynamicOrderFormProps) {
  const { ui } = useI18nChrome();
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          value={values[field.name] ?? values[field.id]}
          error={errors[field.id] ?? errors[field.name]}
          onChange={onChange}
          selectPlaceholder={ui.orderDialog.selectPlaceholder}
        />
      ))}
    </form>
  );
}

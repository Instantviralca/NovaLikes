'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { OrderFieldDefinition } from '@/types/order-fields';

type FieldRendererProps = {
  field: OrderFieldDefinition;
  value: string | boolean | number | undefined;
  onChange: (name: string, value: string | boolean | number) => void;
  error?: string;
  selectPlaceholder?: string;
};

export function FieldRenderer({
  field,
  value,
  onChange,
  error,
  selectPlaceholder = 'Select…',
}: FieldRendererProps) {
  const id = `order-field-${field.id}`;
  const describedBy = error ? `${id}-error` : field.helpText ? `${id}-help` : undefined;
  const required = Boolean(field.validation?.required && !field.optional);

  if (field.type === 'textarea') {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {field.label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
        <Textarea
          id={id}
          name={field.name}
          placeholder={field.placeholder}
          value={String(value ?? '')}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="min-h-32 w-full"
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

  if (field.type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(field.name, Boolean(checked))}
          aria-invalid={Boolean(error)}
        />
        <div className="space-y-1">
          <Label htmlFor={id}>{field.label}</Label>
          {error ? (
            <p className="text-xs text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (field.type === 'select' && field.options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {field.label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
        <Select
          value={String(value ?? '')}
          onValueChange={(next) => onChange(field.name, next)}
        >
          <SelectTrigger id={id} aria-invalid={Boolean(error)}>
            <SelectValue placeholder={field.placeholder ?? selectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const inputType =
    field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text';

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      <Input
        id={id}
        name={field.name}
        type={inputType}
        placeholder={field.placeholder}
        value={String(value ?? '')}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        autoComplete={field.type === 'username' ? 'username' : undefined}
        onChange={(e) =>
          onChange(
            field.name,
            field.type === 'number' ? Number(e.target.value) : e.target.value,
          )
        }
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

/** Alias — Document 10.03 DynamicField */
export const DynamicField = FieldRenderer;

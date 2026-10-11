'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACCOUNT_UI } from '@/lib/customers/messages';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  hint?: string;
  required?: boolean;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = 'current-password',
  hint,
  required,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <button
          type="button"
          className="text-xs font-medium text-[var(--brand)]"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? ACCOUNT_UI.shared.hidePassword : ACCOUNT_UI.shared.showPassword}
        </button>
      </div>
      <Input
        id={id}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="ltr"
      />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

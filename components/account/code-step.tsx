'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';

type CodeStepProps = {
  email: string;
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  onResend: () => void;
  onDifferentEmail: () => void;
  submitting?: boolean;
  error?: string | null;
  cooldownSeconds?: number;
};

export function CodeStep({
  email,
  code,
  onCodeChange,
  onSubmit,
  onResend,
  onDifferentEmail,
  submitting,
  error,
  cooldownSeconds = 0,
}: CodeStepProps) {
  const [seconds, setSeconds] = useState(cooldownSeconds);

  useEffect(() => {
    setSeconds(cooldownSeconds);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [seconds]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading as="h1" size="h1">
          {ACCOUNT_UI.codeStep.h1}
        </Heading>
        <MutedText>{ACCOUNT_UI.codeStep.text(email)}</MutedText>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="account-code">{ACCOUNT_UI.codeStep.codeLabel}</Label>
          <Input
            id="account-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            dir="ltr"
            value={code}
            onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting || code.length !== 6}>
          {ACCOUNT_UI.codeStep.continue}
        </Button>
      </form>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          className="font-medium text-[var(--brand)] disabled:text-muted-foreground"
          disabled={seconds > 0 || submitting}
          onClick={() => {
            onResend();
            setSeconds(60);
          }}
        >
          {seconds > 0
            ? ACCOUNT_UI.codeStep.resendIn(seconds)
            : ACCOUNT_UI.codeStep.resend}
        </button>
        <button
          type="button"
          className="text-muted-foreground underline-offset-2 hover:underline"
          onClick={onDifferentEmail}
        >
          {ACCOUNT_UI.codeStep.differentEmail}
        </button>
      </div>
    </div>
  );
}

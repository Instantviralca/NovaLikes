'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CodeStep } from '@/components/account/code-step';
import { PasswordField } from '@/components/account/password-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { accountFetch } from '@/lib/customers/client-fetch';
import { ACCOUNT_COPY, ACCOUNT_UI } from '@/lib/customers/messages';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'done'>('email');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function sendCode() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/code', {
        method: 'POST',
        body: JSON.stringify({ email, purpose: 'password_reset' }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? ACCOUNT_COPY.tooManyAttempts);
        return;
      }
      setStep('code');
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  function continueFromCode() {
    if (code.length !== 6) {
      setError(ACCOUNT_COPY.invalidCode);
      return;
    }
    setError(null);
    setStep('password');
  }

  async function savePassword() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? ACCOUNT_COPY.invalidCode);
        return;
      }
      setStep('done');
      window.setTimeout(() => {
        router.replace('/dashboard');
        router.refresh();
      }, 1200);
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'done') {
    return (
      <div className="space-y-4">
        <Heading as="h1" size="h1">
          {ACCOUNT_UI.forgot.h1}
        </Heading>
        <p className="text-sm text-foreground">{ACCOUNT_UI.forgot.success}</p>
      </div>
    );
  }

  if (step === 'code') {
    return (
      <CodeStep
        email={email}
        code={code}
        onCodeChange={setCode}
        onSubmit={() => continueFromCode()}
        onResend={() => void sendCode()}
        onDifferentEmail={() => {
          setStep('email');
          setCode('');
          setError(null);
        }}
        submitting={submitting}
        error={error}
        cooldownSeconds={60}
      />
    );
  }

  if (step === 'password') {
    return (
      <div className="space-y-6">
        <Heading as="h1" size="h1">
          {ACCOUNT_UI.forgot.h1}
        </Heading>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void savePassword();
          }}
        >
          <PasswordField
            id="reset-password"
            label={ACCOUNT_UI.forgot.newPassword}
            value={newPassword}
            onChange={setNewPassword}
            autoComplete="new-password"
            hint={ACCOUNT_UI.signup.passwordHint}
            required
          />
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {ACCOUNT_UI.forgot.save}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading as="h1" size="h1">
          {ACCOUNT_UI.forgot.h1}
        </Heading>
        <MutedText>{ACCOUNT_UI.forgot.text}</MutedText>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void sendCode();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="forgot-email">{ACCOUNT_UI.shared.email}</Label>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting}>
          {ACCOUNT_UI.forgot.sendCode}
        </Button>
      </form>
      <p className="text-sm">
        <Link href="/login" className="font-medium text-[var(--brand)]">
          Sign in
        </Link>
      </p>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { CodeStep } from '@/components/account/code-step';
import { PasswordField } from '@/components/account/password-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { routes } from '@/config/routes';
import { accountFetch } from '@/lib/customers/client-fetch';
import { ACCOUNT_COPY, ACCOUNT_UI } from '@/lib/customers/messages';
import { safeAccountNext } from '@/lib/customers/safe-next';

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeAccountNext(searchParams.get('next'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function createAccount() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, marketingOptIn }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? ACCOUNT_COPY.unavailable);
        return;
      }
      setStep('code');
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  async function resend() {
    setSubmitting(true);
    setError(null);
    try {
      await accountFetch('/api/account/code', {
        method: 'POST',
        body: JSON.stringify({ email, purpose: 'login' }),
      });
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  async function verify() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code, purpose: 'signup_verify' }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        // Existing account may have received a login code instead.
        if (data.error === ACCOUNT_COPY.invalidCode) {
          const loginRes = await accountFetch('/api/account/verify', {
            method: 'POST',
            body: JSON.stringify({ email, code, purpose: 'login' }),
          });
          const loginData = (await loginRes.json()) as { ok?: boolean; error?: string };
          if (loginRes.ok && loginData.ok) {
            router.replace(next);
            router.refresh();
            return;
          }
          setError(loginData.error ?? ACCOUNT_COPY.invalidCode);
          return;
        }
        setError(data.error ?? ACCOUNT_COPY.invalidCode);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'code') {
    return (
      <CodeStep
        email={email}
        code={code}
        onCodeChange={setCode}
        onSubmit={() => void verify()}
        onResend={() => void resend()}
        onDifferentEmail={() => {
          setStep('form');
          setCode('');
          setError(null);
        }}
        submitting={submitting}
        error={error}
        cooldownSeconds={60}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading as="h1" size="h1">
          {ACCOUNT_UI.signup.h1}
        </Heading>
        <MutedText>{ACCOUNT_UI.signup.sub}</MutedText>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void createAccount();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="signup-name">{ACCOUNT_UI.signup.name}</Label>
          <Input
            id="signup-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">{ACCOUNT_UI.shared.email}</Label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <PasswordField
          id="signup-password"
          label={ACCOUNT_UI.shared.password}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          hint={ACCOUNT_UI.signup.passwordHint}
          required
        />
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <Checkbox
            id="signup-marketing"
            checked={marketingOptIn}
            onCheckedChange={(v) => setMarketingOptIn(v === true)}
            className="mt-0.5"
          />
          <Label htmlFor="signup-marketing" className="font-normal leading-snug">
            {ACCOUNT_UI.signup.marketing}
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          By creating an account you agree to our{' '}
          <Link href={routes.termsAndConditions} className="underline underline-offset-2">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link href={routes.privacyPolicy} className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting}>
          {ACCOUNT_UI.signup.submit}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[var(--brand)]">
          Sign in
        </Link>
      </p>
    </div>
  );
}

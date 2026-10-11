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
import { safeAccountNext } from '@/lib/customers/safe-next';
import { cn } from '@/lib/utils';

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const next = safeAccountNext(nextPath);
  const [tab, setTab] = useState<'password' | 'code'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function loginWithPassword() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        needsVerification?: boolean;
      };
      if (data.needsVerification) {
        setTab('code');
        setCodeSent(true);
        setError(data.error ?? ACCOUNT_COPY.unverified);
        return;
      }
      if (!res.ok || !data.ok) {
        setError(data.error ?? ACCOUNT_COPY.invalidLogin);
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

  async function sendCode() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/code', {
        method: 'POST',
        body: JSON.stringify({ email, purpose: 'login' }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok) {
        setError(data.error ?? ACCOUNT_COPY.tooManyAttempts);
        return;
      }
      setCodeSent(true);
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyCode() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await accountFetch('/api/account/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code, purpose: 'login' }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
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

  if (tab === 'code' && codeSent) {
    return (
      <CodeStep
        email={email}
        code={code}
        onCodeChange={setCode}
        onSubmit={() => void verifyCode()}
        onResend={() => void sendCode()}
        onDifferentEmail={() => {
          setCodeSent(false);
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
          {ACCOUNT_UI.login.h1}
        </Heading>
        <MutedText>{ACCOUNT_UI.login.sub}</MutedText>
      </div>

      <div className="flex rounded-lg border bg-background p-1">
        {(
          [
            ['password', ACCOUNT_UI.login.tabPassword],
            ['code', ACCOUNT_UI.login.tabEmailCode],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={cn(
              'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              tab === id
                ? 'bg-[var(--brand)] text-white'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => {
              setTab(id);
              setError(null);
              setCodeSent(false);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'password' ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void loginWithPassword();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="login-email">{ACCOUNT_UI.shared.email}</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <PasswordField
            id="login-password"
            label={ACCOUNT_UI.shared.password}
            value={password}
            onChange={setPassword}
            required
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[var(--brand)]"
            >
              {ACCOUNT_UI.login.forgotPassword}
            </Link>
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {ACCOUNT_UI.login.signIn}
          </Button>
        </form>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void sendCode();
          }}
        >
          <MutedText>{ACCOUNT_UI.login.codeHelp}</MutedText>
          <div className="space-y-2">
            <Label htmlFor="login-code-email">{ACCOUNT_UI.shared.email}</Label>
            <Input
              id="login-code-email"
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
            {ACCOUNT_UI.login.sendCode}
          </Button>
        </form>
      )}

      <p className="text-sm text-muted-foreground">
        New to NovaLikes?{' '}
        <Link href="/signup" className="font-medium text-[var(--brand)]">
          Create an account
        </Link>
      </p>
    </div>
  );
}

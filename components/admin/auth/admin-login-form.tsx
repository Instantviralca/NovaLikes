'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';

type AdminLoginFormProps = {
  /** Resolved on the server so SSR and client HTML match. */
  configured: boolean;
};

/**
 * Admin login — Document 12.01.
 * Configuration flag comes from the server; password is verified server-side only.
 */
export function AdminLoginForm({ configured }: AdminLoginFormProps) {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get('next') || '/admin/dashboard';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Unable to sign in.');
        setLoading(false);
        return;
      }
      router.replace(nextPath.startsWith('/admin') ? nextPath : '/admin/dashboard');
      router.refresh();
    } catch {
      setError('Unable to sign in.');
      setLoading(false);
    }
  }

  if (!configured) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Admin auth is not configured. Set <code>IV_ADMIN_PASSWORD</code> (and ideally{' '}
        <code>IV_ADMIN_SESSION_SECRET</code>) in the environment, then restart the server.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <FormInput
        id="admin-password"
        name="password"
        type="password"
        label="Admin password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="min-h-11"
      />
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="min-h-11 w-full" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

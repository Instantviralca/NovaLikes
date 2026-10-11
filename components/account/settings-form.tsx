'use client';

import { useState } from 'react';

import { PasswordField } from '@/components/account/password-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '@/components/typography/heading';
import { accountFetch } from '@/lib/customers/client-fetch';
import { ACCOUNT_COPY, ACCOUNT_UI } from '@/lib/customers/messages';
import type { CustomerPublic } from '@/lib/customers/types';

type SettingsFormProps = {
  customer: CustomerPublic;
};

export function SettingsForm({ customer }: SettingsFormProps) {
  const [name, setName] = useState(customer.name ?? '');
  const [whatsappNumber, setWhatsappNumber] = useState(customer.whatsappNumber ?? '');
  const [tiktokUsername, setTiktokUsername] = useState(customer.tiktokUsername ?? '');
  const [instagramUsername, setInstagramUsername] = useState(
    customer.instagramUsername ?? '',
  );
  const [marketingOptIn, setMarketingOptIn] = useState(customer.marketingOptIn);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function saveProfile() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await accountFetch('/api/account/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          whatsappNumber,
          tiktokUsername,
          instagramUsername,
          marketingOptIn,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? ACCOUNT_COPY.unavailable);
        return;
      }
      setMessage(data.message ?? ACCOUNT_COPY.saved);
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setBusy(false);
    }
  }

  async function savePassword() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await accountFetch('/api/account/password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: customer.hasPassword ? currentPassword : undefined,
          newPassword,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? ACCOUNT_COPY.unavailable);
        return;
      }
      setMessage(data.message ?? ACCOUNT_COPY.saved);
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setBusy(false);
    }
  }

  async function signOutOthers() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await accountFetch('/api/account/sessions/revoke-others', {
        method: 'POST',
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? ACCOUNT_COPY.unavailable);
        return;
      }
      setMessage(data.message ?? ACCOUNT_COPY.signedOutEverywhere);
    } catch {
      setError(ACCOUNT_COPY.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10">
      <Heading as="h1" size="h1">
        {ACCOUNT_UI.settings.h1}
      </Heading>
      {message ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.settings.profile}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="settings-name">{ACCOUNT_UI.settings.name}</Label>
            <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-wa">{ACCOUNT_UI.settings.whatsapp}</Label>
            <Input
              id="settings-wa"
              dir="ltr"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-tt">{ACCOUNT_UI.settings.tiktok}</Label>
            <Input
              id="settings-tt"
              dir="ltr"
              value={tiktokUsername}
              onChange={(e) => setTiktokUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-ig">{ACCOUNT_UI.settings.instagram}</Label>
            <Input
              id="settings-ig"
              dir="ltr"
              value={instagramUsername}
              onChange={(e) => setInstagramUsername(e.target.value)}
            />
          </div>
        </div>
        <Button type="button" disabled={busy} onClick={() => void saveProfile()}>
          {ACCOUNT_UI.settings.save}
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.settings.password}</h2>
        {!customer.hasPassword ? (
          <p className="text-sm text-muted-foreground">{ACCOUNT_UI.settings.codeOnlyText}</p>
        ) : (
          <PasswordField
            id="settings-current-password"
            label={ACCOUNT_UI.settings.currentPassword}
            value={currentPassword}
            onChange={setCurrentPassword}
          />
        )}
        <PasswordField
          id="settings-new-password"
          label={ACCOUNT_UI.settings.newPassword}
          value={newPassword}
          onChange={setNewPassword}
          autoComplete="new-password"
          hint={ACCOUNT_UI.signup.passwordHint}
        />
        <Button type="button" disabled={busy} onClick={() => void savePassword()}>
          {customer.hasPassword
            ? ACCOUNT_UI.settings.updatePassword
            : ACCOUNT_UI.settings.setPassword}
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{ACCOUNT_UI.settings.emailPrefs}</h2>
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <Checkbox
            id="settings-marketing"
            checked={marketingOptIn}
            onCheckedChange={(v) => setMarketingOptIn(v === true)}
            className="mt-0.5"
          />
          <div className="space-y-1">
            <Label htmlFor="settings-marketing">{ACCOUNT_UI.settings.offers}</Label>
            <p className="text-xs text-muted-foreground">{ACCOUNT_UI.settings.emailNote}</p>
          </div>
        </div>
        <Button type="button" variant="outline" disabled={busy} onClick={() => void saveProfile()}>
          {ACCOUNT_UI.settings.save}
        </Button>
      </section>

      <section>
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => void signOutOthers()}
        >
          {ACCOUNT_UI.settings.signOutOthers}
        </Button>
      </section>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CartRecoveryMetrics } from '@/lib/cart-recovery/metrics';
import type { CartRecoverySession, CartRecoverySettings } from '@/types/cart-recovery';

type SafeSession = Omit<CartRecoverySession, 'recoveryTokenHash' | 'unsubscribeTokenHash'>;

function csrfToken(): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='))
    ?.slice('iv_admin_csrf='.length);
}

export function CartRecoveryPage() {
  const [sessions, setSessions] = useState<SafeSession[]>([]);
  const [metrics, setMetrics] = useState<CartRecoveryMetrics | null>(null);
  const [settings, setSettings] = useState<CartRecoverySettings | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const [listResponse, settingsResponse] = await Promise.all([
        fetch(`/api/admin/cart-recovery?status=${encodeURIComponent(status)}&q=${encodeURIComponent(query)}`),
        fetch('/api/admin/cart-recovery/settings'),
      ]);
      const list = await listResponse.json();
      const config = await settingsResponse.json();
      if (!listResponse.ok || !list.ok) throw new Error(list.error ?? 'Unable to load carts.');
      if (!settingsResponse.ok || !config.ok) throw new Error(config.error ?? 'Unable to load settings.');
      setSessions(list.sessions);
      setMetrics(list.metrics);
      setSettings(config.settings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load cart recovery.');
    }
  }, [query, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(timer);
  }, [load]);

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const response = await fetch('/api/admin/cart-recovery/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken() ? { 'x-csrf-token': decodeURIComponent(csrfToken()!) } : {}),
        },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error ?? 'Unable to save settings.');
      setSettings(data.settings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Cart Recovery" description="Track abandoned carts, recovered revenue, and reminder delivery." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ['Abandoned', metrics?.abandonedCarts ?? 0],
          ['Recovered', metrics?.recoveredCarts ?? 0],
          ['Converted', metrics?.convertedCarts ?? 0],
          ['Recovery rate', `${metrics?.recoveryRate ?? 0}%`],
          ['Recovered revenue', `${metrics?.recoveredRevenue ?? 0}`],
        ].map(([label, value]) => (
          <AdminCard key={label}>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard title="Sessions">
        <div className="mb-4 flex flex-wrap gap-3">
          <Input className="max-w-sm" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search email, name, or ID" />
          <select className="rounded-md border bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            {['all', 'active', 'abandoned', 'recovered', 'converted', 'expired'].map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="border-b text-left"><th className="p-3">Customer</th><th>Status</th><th>Total</th><th>Updated</th><th /></tr></thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b">
                  <td className="p-3"><div className="font-medium">{session.email}</div><div className="text-xs text-muted-foreground">{session.customerName}</div></td>
                  <td className="capitalize">{session.status}</td>
                  <td>{session.totalAmount} {session.currency}</td>
                  <td>{new Date(session.updatedAt).toLocaleString()}</td>
                  <td><Button asChild variant="outline" size="sm"><Link href={`/admin/cart-recovery/${session.id}`}>View</Link></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!sessions.length ? <p className="p-3 text-sm text-muted-foreground">No recovery sessions found.</p> : null}
        </div>
      </AdminCard>

      {settings ? (
        <AdminCard title="Recovery settings">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.enabled} onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })} />Enabled</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.couponEnabled} onChange={(e) => setSettings({ ...settings, couponEnabled: e.target.checked })} />Coupons enabled</label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Abandonment minutes</Label><Input type="number" value={settings.abandonmentMinutes} onChange={(e) => setSettings({ ...settings, abandonmentMinutes: Number(e.target.value) })} /></div>
              <div><Label>Retention days</Label><Input type="number" value={settings.retentionDays} onChange={(e) => setSettings({ ...settings, retentionDays: Number(e.target.value) })} /></div>
            </div>
            {settings.emails.map((email, index) => (
              <div key={email.step} className="space-y-3 rounded-md border p-4">
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={email.enabled} onChange={(e) => { const emails = [...settings.emails]; emails[index] = { ...email, enabled: e.target.checked }; setSettings({ ...settings, emails }); }} />Email {email.step}</label>
                <div><Label>Delay (minutes)</Label><Input type="number" value={email.delayMinutes} onChange={(e) => { const emails = [...settings.emails]; emails[index] = { ...email, delayMinutes: Number(e.target.value) }; setSettings({ ...settings, emails }); }} /></div>
                <div><Label>Subject</Label><Input value={email.subject} onChange={(e) => { const emails = [...settings.emails]; emails[index] = { ...email, subject: e.target.value }; setSettings({ ...settings, emails }); }} /></div>
                <div><Label>Body</Label><textarea className="min-h-28 w-full rounded-md border bg-background p-3 text-sm" value={email.body} onChange={(e) => { const emails = [...settings.emails]; emails[index] = { ...email, body: e.target.value }; setSettings({ ...settings, emails }); }} /></div>
              </div>
            ))}
            <Button onClick={saveSettings} disabled={saving}>{saving ? 'Saving…' : 'Save recovery settings'}</Button>
          </div>
        </AdminCard>
      ) : null}
      {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
    </div>
  );
}

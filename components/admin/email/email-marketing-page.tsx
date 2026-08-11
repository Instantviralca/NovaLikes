'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type CampaignRow = {
  id: string;
  subject: string;
  bodyPreview: string;
  couponCode?: string | null;
  sentCount: number;
  failedCount: number;
  createdAt: string;
};

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

const DEFAULT_SUBJECT = 'Limited offer: 25% off NovaLikes';
const DEFAULT_MESSAGE =
  'For a limited time, take 25% off your next NovaLikes order. Apply the coupon code at checkout and grow faster.';

export function EmailMarketingPage() {
  const [optedInCount, setOptedInCount] = useState(0);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [setupNotice, setSetupNotice] = useState<string | null>(null);
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [couponCode, setCouponCode] = useState('SAVE25');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/email');
      const data = (await response.json()) as {
        ok?: boolean;
        optedInCount?: number;
        emailConfigured?: boolean;
        campaigns?: CampaignRow[];
        setupNotice?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Unable to load email marketing.');
        return;
      }
      setOptedInCount(data.optedInCount ?? 0);
      setEmailConfigured(Boolean(data.emailConfigured));
      setCampaigns(data.campaigns ?? []);
      setSetupNotice(data.setupNotice ?? null);
      setError(null);
    } catch {
      setError('Unable to load email marketing.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSend(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setResult(null);
    setError(null);
    try {
      const csrf = readCsrfToken();
      const response = await fetch('/api/admin/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({ subject, message, couponCode }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        sentCount?: number;
        failedCount?: number;
        setupNotice?: string;
      };
      if (!response.ok || !data.ok) {
        setError(data.setupNotice || data.error || 'Campaign failed.');
        setSending(false);
        return;
      }
      setResult(
        `Sent ${data.sentCount ?? 0} email(s)` +
          (data.failedCount ? `, ${data.failedCount} failed` : '') +
          '.',
      );
      await load();
    } catch {
      setError('Unable to send campaign.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Email"
        description="Send offer campaigns to customers who opted in at checkout."
      />

      {setupNotice ? (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {setupNotice}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <AdminStatCard label="Opted-in subscribers" value={loading ? '…' : optedInCount} />
        <AdminStatCard
          label="Email provider"
          value={emailConfigured ? 'Configured' : 'Not configured'}
          trend={emailConfigured ? 'Resend ready' : 'Set RESEND_API_KEY + EMAIL_FROM'}
        />
      </div>

      <section className="space-y-4 rounded-lg border p-4 sm:p-6">
        <h2 className="text-sm font-semibold">Compose campaign</h2>
        <p className="text-sm text-muted-foreground">
          Create coupon <code className="text-xs">SAVE25</code> (25% off) in Admin → Coupons first,
          then send this campaign. Only opted-in emails are included.
        </p>
        <form className="space-y-4" onSubmit={onSend}>
          <div className="space-y-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              maxLength={160}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-message">Message</Label>
            <Textarea
              id="email-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              maxLength={4000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-coupon">Coupon code</Label>
            <Input
              id="email-coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              maxLength={40}
              placeholder="SAVE25"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          {result ? (
            <p className="text-sm text-muted-foreground" role="status">
              {result}
            </p>
          ) : null}
          <Button
            type="submit"
            className="min-h-11"
            disabled={sending || loading || !emailConfigured || optedInCount === 0}
          >
            {sending ? 'Sending…' : `Send to ${optedInCount} subscriber${optedInCount === 1 ? '' : 's'}`}
          </Button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Recent campaigns</h2>
        {campaigns.length === 0 ? (
          <AdminEmptyState
            title="No campaigns yet"
            description="Send your first opted-in offer campaign above."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Subject</th>
                  <th className="px-3 py-2 font-medium">Coupon</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Sent</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Failed</th>
                  <th className="px-3 py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((row) => (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{row.subject}</td>
                    <td className="px-3 py-2">{row.couponCode || '—'}</td>
                    <td className="px-3 py-2 tabular-nums">{row.sentCount}</td>
                    <td className="px-3 py-2 tabular-nums">{row.failedCount}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

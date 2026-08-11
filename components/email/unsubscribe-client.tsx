'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  StatusPageHomeButton,
  StatusPageShell,
} from '@/components/feedback/status-page-shell';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';

export function UnsubscribeClient() {
  const search = useSearchParams();
  const token = search.get('token')?.trim() || '';
  const [status, setStatus] = useState<'loading' | 'ready' | 'done' | 'error'>('loading');
  const [message, setMessage] = useState('Confirm to stop marketing emails from NovaLikes.');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This unsubscribe link is missing or invalid.');
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`/api/email/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = (await response.json()) as {
          ok?: boolean;
          alreadyUnsubscribed?: boolean;
          error?: string;
        };
        if (cancelled) return;
        if (!response.ok || !data.ok) {
          setStatus('error');
          setMessage(data.error ?? 'This unsubscribe link is invalid.');
          return;
        }
        if (data.alreadyUnsubscribed) {
          setStatus('done');
          setMessage('You are already unsubscribed from NovaLikes marketing emails.');
          return;
        }
        setStatus('ready');
      } catch {
        if (!cancelled) {
          setStatus('error');
          setMessage('Unable to load unsubscribe status.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Unable to unsubscribe.');
        setSubmitting(false);
        return;
      }
      setStatus('done');
      setMessage('You have been unsubscribed from NovaLikes marketing emails.');
    } catch {
      setStatus('error');
      setMessage('Unable to unsubscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StatusPageShell>
      <p className="text-sm font-medium text-[var(--brand)]">Email preferences</p>
      <Heading as="h1" size="h2" className="mt-2">
        Unsubscribe
      </Heading>
      <MutedText className="mt-3 max-w-lg text-base">{message}</MutedText>
      {status === 'ready' ? (
        <form onSubmit={onSubmit} className="mt-8">
          <Button type="submit" className="min-h-11" disabled={submitting}>
            {submitting ? 'Updating…' : 'Unsubscribe from offers'}
          </Button>
        </form>
      ) : null}
      {status === 'done' || status === 'error' ? <StatusPageHomeButton /> : null}
    </StatusPageShell>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { Button } from '@/components/ui/button';
import type { CartRecoveryEvent, CartRecoverySession } from '@/types/cart-recovery';

type SafeSession = Omit<CartRecoverySession, 'recoveryTokenHash' | 'unsubscribeTokenHash'>;

export function CartRecoveryDetail({ id }: { id: string }) {
  const [session, setSession] = useState<SafeSession | null>(null);
  const [events, setEvents] = useState<CartRecoveryEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(`/api/admin/cart-recovery/${encodeURIComponent(id)}`);
        const data = await response.json();
        if (!response.ok || !data.ok) throw new Error(data.error ?? 'Unable to load session.');
        setSession(data.session);
        setEvents(data.events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load session.');
      }
    })();
  }, [id]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Recovery session"
        description={session ? `${session.email} · ${session.status}` : id}
        actions={<Button asChild variant="outline"><Link href="/admin/cart-recovery">Back</Link></Button>}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {session ? (
        <>
          <AdminCard title="Customer and cart">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-muted-foreground">Customer</dt><dd>{session.customerName || '—'} · {session.email}</dd></div>
              <div><dt className="text-muted-foreground">Public ID</dt><dd>{session.publicId}</dd></div>
              <div><dt className="text-muted-foreground">Total</dt><dd>{session.totalAmount} {session.currency}</dd></div>
              <div><dt className="text-muted-foreground">Order</dt><dd>{session.orderId || '—'}</dd></div>
            </dl>
            <ul className="mt-5 space-y-2 border-t pt-4 text-sm">
              {session.cartSnapshot.items.map((item) => (
                <li key={`${item.packageId}-${item.serviceId}`} className="flex justify-between gap-4">
                  <span>{item.serviceName} — {item.packageTitle}</span>
                  <span>{item.unitPrice} {item.currency}</span>
                </li>
              ))}
            </ul>
          </AdminCard>
          <AdminCard title="Event history">
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex flex-wrap justify-between gap-2 border-b pb-3 text-sm">
                  <span className="font-medium">{event.type.replaceAll('_', ' ')}{event.emailStep ? ` · email ${event.emailStep}` : ''}</span>
                  <span className="text-muted-foreground">{new Date(event.createdAt).toLocaleString()}</span>
                  {event.errorMessage ? <p className="w-full text-destructive">{event.errorMessage}</p> : null}
                </div>
              ))}
              {!events.length ? <p className="text-sm text-muted-foreground">No events recorded.</p> : null}
            </div>
          </AdminCard>
        </>
      ) : null}
    </div>
  );
}

'use client';

import { useState } from 'react';

import { OrderStatusCard } from '@/components/tracking/order-status-card';
import { OrderSummary } from '@/components/tracking/order-summary';
import { OrderTimeline } from '@/components/tracking/order-timeline';
import { TrackOrderForm } from '@/components/tracking/track-order-form';
import { TrackingError } from '@/components/tracking/tracking-error';
import { TrackingLoading } from '@/components/tracking/tracking-loading';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicTrackedOrder, TrackOrderLookupError } from '@/types/tracking';

export function TrackOrderPage() {
  const { ui } = useI18nChrome();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<PublicTrackedOrder | null>(null);
  const [error, setError] = useState<TrackOrderLookupError | null>(null);

  return (
    <Section aria-label={ui.trackOrder.ariaLabel} data-analytics="track-order" className="bg-transparent">
      <Container size="md" className="space-y-8">
        <div className="space-y-4">
          <Heading as="h1" size="h1">
            {ui.trackOrder.title}
          </Heading>
          <MutedText>{ui.trackOrder.intro}</MutedText>
          <ol className="grid gap-3 sm:grid-cols-3">
            {[ui.trackOrder.stepId, ui.trackOrder.stepEmail, ui.trackOrder.stepStatus].map(
              (label, index) => (
                <li
                  key={label}
                  className="rounded-xl border border-[var(--border-subtle)] bg-white p-3 text-sm shadow-[var(--shadow-xs)]"
                >
                  <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-[var(--brand-accent-soft)] text-xs font-bold text-[var(--brand-primary)]">
                    {index + 1}
                  </span>
                  {label}
                </li>
              ),
            )}
          </ol>
        </div>

        <TrackOrderForm
          loading={loading}
          onSubmit={async (input) => {
            setLoading(true);
            setError(null);
            setOrder(null);
            try {
              const response = await fetch('/api/orders/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
              });
              const result = (await response.json()) as
                | { ok: true; order: PublicTrackedOrder }
                | { ok: false; error: TrackOrderLookupError };
              if (result.ok) {
                setOrder(result.order);
              } else {
                setError(result.error);
              }
            } catch {
              setError({
                code: 'server_error',
                message: ui.trackOrder.serverError,
              });
            } finally {
              setLoading(false);
            }
          }}
        />

        {loading ? <TrackingLoading /> : null}
        {error ? <TrackingError error={error} /> : null}

        {order ? (
          <div className="space-y-6">
            <OrderStatusCard order={order} />
            <OrderSummary order={order} />
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">{ui.trackOrder.progress}</h2>
              <OrderTimeline steps={order.timeline} />
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

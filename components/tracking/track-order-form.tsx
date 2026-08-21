'use client';

import { useState } from 'react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TrackOrderLookupInput } from '@/types/tracking';

type TrackOrderFormProps = {
  onSubmit: (input: TrackOrderLookupInput) => void;
  loading?: boolean;
};

export function TrackOrderForm({ onSubmit, loading }: TrackOrderFormProps) {
  const { ui } = useI18nChrome();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ orderId, email });
      }}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="track-order-id">{ui.trackOrder.orderId}</Label>
        <Input
          id="track-order-id"
          name="orderId"
          autoComplete="off"
          required
          dir="ltr"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. IV-1001"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="track-email">{ui.trackOrder.email}</Label>
        <Input
          id="track-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <Button type="submit" size="lg" className="min-h-11 w-full sm:w-auto" loading={loading}>
        {ui.trackOrder.submit}
      </Button>
    </form>
  );
}

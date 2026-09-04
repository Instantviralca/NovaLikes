/**
 * Admin metrics for cart recovery.
 */

import { listCartRecoveryEvents, listCartRecoverySessions } from '@/lib/cart-recovery/store';
import type { CartRecoverySession } from '@/types/cart-recovery';

export type CartRecoveryMetrics = {
  abandonedCarts: number;
  recoveredCarts: number;
  convertedCarts: number;
  abandonedRevenue: number;
  recoveredRevenue: number;
  recoveryRate: number;
  emailRevenue: number;
  byService: Array<{
    serviceId: string;
    serviceName: string;
    abandonedCount: number;
    recoveredCount: number;
    abandonedValue: number;
    recoveredValue: number;
  }>;
};

function isAbandonedLike(s: CartRecoverySession): boolean {
  return s.status === 'abandoned' || Boolean(s.abandonedAt);
}

export async function getCartRecoveryMetrics(): Promise<CartRecoveryMetrics> {
  const sessions = await listCartRecoverySessions({ status: 'all', limit: 500 });
  const abandoned = sessions.filter(isAbandonedLike);
  const recovered = sessions.filter((s) => s.status === 'recovered' || s.status === 'converted');
  const converted = sessions.filter((s) => s.status === 'converted');

  const abandonedRevenue = abandoned.reduce((sum, s) => sum + s.totalAmount, 0);
  const recoveredRevenue = converted.reduce((sum, s) => sum + s.totalAmount, 0);

  const recoveryRate =
    abandoned.length === 0 ? 0 : Math.round((converted.length / abandoned.length) * 1000) / 10;

  let emailRevenue = 0;
  for (const session of converted) {
    const events = await listCartRecoveryEvents(session.id);
    if (events.some((e) => e.type === 'email_sent' || e.type === 'recovery_link_clicked')) {
      emailRevenue += session.totalAmount;
    }
  }

  const byServiceMap = new Map<
    string,
    {
      serviceId: string;
      serviceName: string;
      abandonedCount: number;
      recoveredCount: number;
      abandonedValue: number;
      recoveredValue: number;
    }
  >();

  for (const session of sessions) {
    for (const item of session.cartSnapshot.items) {
      const key = item.serviceId;
      const row = byServiceMap.get(key) ?? {
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        abandonedCount: 0,
        recoveredCount: 0,
        abandonedValue: 0,
        recoveredValue: 0,
      };
      if (isAbandonedLike(session)) {
        row.abandonedCount += 1;
        row.abandonedValue += item.unitPrice;
      }
      if (session.status === 'converted') {
        row.recoveredCount += 1;
        row.recoveredValue += item.unitPrice;
      }
      byServiceMap.set(key, row);
    }
  }

  return {
    abandonedCarts: abandoned.length,
    recoveredCarts: recovered.length,
    convertedCarts: converted.length,
    abandonedRevenue,
    recoveredRevenue,
    recoveryRate,
    emailRevenue,
    byService: [...byServiceMap.values()].sort((a, b) => b.abandonedCount - a.abandonedCount),
  };
}

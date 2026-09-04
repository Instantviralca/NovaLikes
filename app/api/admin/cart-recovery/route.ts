import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { requireAdminFromCookies } from '@/lib/admin/auth';
import { getCartRecoveryMetrics } from '@/lib/cart-recovery';
import { listCartRecoverySessions } from '@/lib/cart-recovery/store';
import type { CartRecoveryStatus } from '@/types/cart-recovery';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!(await requireAdminFromCookies(await cookies()))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const params = new URL(request.url).searchParams;
  const status = (params.get('status') ?? 'all') as CartRecoveryStatus | 'all';
  const query = params.get('q') ?? '';
  const [sessions, metrics] = await Promise.all([
    listCartRecoverySessions({ status, query }),
    getCartRecoveryMetrics(),
  ]);
  const safeSessions = sessions.map(({ recoveryTokenHash: _recovery, unsubscribeTokenHash: _unsubscribe, ...session }) => session);
  return NextResponse.json({ ok: true, sessions: safeSessions, metrics });
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { requireAdminFromCookies } from '@/lib/admin/auth';
import {
  getCartRecoverySessionById,
  listCartRecoveryEvents,
} from '@/lib/cart-recovery/store';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdminFromCookies(await cookies()))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await context.params;
  const session = await getCartRecoverySessionById(id);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Session not found.' }, { status: 404 });
  }
  const events = await listCartRecoveryEvents(session.id);
  const {
    recoveryTokenHash: _recovery,
    unsubscribeTokenHash: _unsubscribe,
    ...safeSession
  } = session;
  return NextResponse.json({ ok: true, session: safeSession, events });
}

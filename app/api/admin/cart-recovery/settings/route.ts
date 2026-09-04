import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import {
  getCartRecoverySettings,
  setCartRecoverySettings,
} from '@/lib/cart-recovery';
import type { CartRecoverySettings } from '@/types/cart-recovery';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await requireAdminFromCookies(await cookies()))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, settings: await getCartRecoverySettings() });
}

export async function POST(request: Request) {
  const jar = await cookies();
  const authorized = await requireAdminFromCookies(jar);
  const csrfOk = verifyCsrfToken(
    jar.get(ADMIN_CSRF_COOKIE)?.value,
    request.headers.get('x-csrf-token') ?? undefined,
  );
  if (!authorized || !csrfOk) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const settings = await setCartRecoverySettings(
      (await request.json()) as Partial<CartRecoverySettings>,
    );
    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unable to save settings.' },
      { status: 400 },
    );
  }
}

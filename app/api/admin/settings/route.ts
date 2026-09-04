import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { isEmailConfigured } from '@/lib/config/env';
import {
  getAdminNotificationEmail,
  getPaymentWebsiteUrl,
  getRemotePaymentProductName,
  getRemotePaymentSharedSecret,
  setAdminNotificationEmail,
  setPaymentWebsiteUrl,
  setRemotePaymentProductName,
  setRemotePaymentSharedSecret,
} from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

async function requireAdmin(request: Request) {
  const jar = await cookies();
  const ok = await requireAdminFromCookies(jar);
  if (!ok) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(ADMIN_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return false;
  }
  return true;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const [paymentWebsite, sharedSecret, productName, adminEmail] = await Promise.all([
    getPaymentWebsiteUrl(),
    getRemotePaymentSharedSecret(),
    getRemotePaymentProductName(),
    getAdminNotificationEmail(),
  ]);
  return NextResponse.json({
    ok: true,
    settings: {
      paymentWebsite,
      sharedSecretConfigured: sharedSecret.trim().length >= 16,
      productName,
      adminEmail,
      emailConfigured: isEmailConfigured(),
    },
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      paymentWebsite?: string;
      sharedSecret?: string;
      productName?: string;
      adminEmail?: string;
    };
    const paymentWebsite = await setPaymentWebsiteUrl(
      body.paymentWebsite ?? (await getPaymentWebsiteUrl()),
    );
    if (typeof body.sharedSecret === 'string' && body.sharedSecret.trim()) {
      await setRemotePaymentSharedSecret(body.sharedSecret);
    }
    const productName =
      typeof body.productName === 'string'
        ? await setRemotePaymentProductName(body.productName)
        : await getRemotePaymentProductName();
    const adminEmail =
      typeof body.adminEmail === 'string'
        ? await setAdminNotificationEmail(body.adminEmail)
        : await getAdminNotificationEmail();
    const sharedSecret = await getRemotePaymentSharedSecret();
    return NextResponse.json({
      ok: true,
      settings: {
        paymentWebsite,
        sharedSecretConfigured: sharedSecret.trim().length >= 16,
        productName,
        adminEmail,
        emailConfigured: isEmailConfigured(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to save settings.',
      },
      { status: 400 },
    );
  }
}

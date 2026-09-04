import { NextResponse } from 'next/server';

import {
  fetchMollieHealth,
  MollieTestModeRejectedError,
} from '@/lib/payments/mollie-remote-protocol';
import {
  getPaymentWebsiteUrl,
  getRemotePaymentSharedSecret,
  isRemotePaymentConfigured,
} from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

/**
 * Public Mollie Components config (profile id only — no shared secret).
 * Production rejects collector testmode via fetchMollieHealth guard.
 */
export async function GET() {
  try {
    if (!(await isRemotePaymentConfigured())) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Mollie payment is not configured yet.',
        },
        { status: 503 },
      );
    }

    const [serverUrl, sharedSecret] = await Promise.all([
      getPaymentWebsiteUrl(),
      getRemotePaymentSharedSecret(),
    ]);
    const health = await fetchMollieHealth({ serverUrl, sharedSecret });

    return NextResponse.json({
      ok: true,
      profileId: health.profileId,
      testmode: health.testmode,
      currency: health.currency,
    });
  } catch (error) {
    if (error instanceof MollieTestModeRejectedError) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Mollie test mode is not available in production.',
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to load Mollie config.',
      },
      { status: 502 },
    );
  }
}

import { NextResponse } from 'next/server';

import { hydrateCoupons } from '@/lib/catalog/coupons-store';
import { publicApiErrorMessage } from '@/lib/http/public-error';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';
import { validateCoupon } from '@/lib/pricing/resolve';
import type { CurrencyCode } from '@/types/pricing';

export const runtime = 'nodejs';

/** Public coupon validation for cart (uses hydrated admin catalog). */
export async function POST(request: Request) {
  const limited = consumePublicRouteLimit('coupons', clientIpFromRequestHeaders(request.headers));
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  try {
    await hydrateCoupons();
    const body = (await request.json()) as {
      code?: string;
      currency?: CurrencyCode;
      subtotal?: number;
      packageIds?: string[];
    };
    const code = typeof body.code === 'string' ? body.code : '';
    const subtotal = Number(body.subtotal ?? 0);
    const result = validateCoupon({
      code,
      currency: body.currency ?? 'USD',
      subtotal: Number.isFinite(subtotal) ? subtotal : 0,
      packageIds: Array.isArray(body.packageIds) ? body.packageIds.map(String) : [],
    });
    return NextResponse.json({ ok: result.valid, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        valid: false,
        discountAmount: 0,
        message: publicApiErrorMessage(error, 'Unable to validate coupon.'),
      },
      { status: 400 },
    );
  }
}

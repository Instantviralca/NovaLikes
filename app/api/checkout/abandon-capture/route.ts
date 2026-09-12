import { NextResponse } from 'next/server';

import { captureCartRecoverySession } from '@/lib/cart-recovery';
import { publicApiErrorMessage } from '@/lib/http/public-error';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';
import type { CartRecoveryCaptureInput } from '@/types/cart-recovery';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = consumePublicRouteLimit('abandonCapture', clientIpFromRequestHeaders(request.headers));
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  try {
    const body = (await request.json()) as CartRecoveryCaptureInput;
    const result = await captureCartRecoverySession(body);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json({ ok: true, publicId: result.publicId });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: publicApiErrorMessage(error, 'Unable to capture cart.') },
      { status: 400 },
    );
  }
}

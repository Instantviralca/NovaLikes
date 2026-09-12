import { NextResponse } from 'next/server';

import { consumeCartHandoff } from '@/lib/cart/handoff-store';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';

export const runtime = 'nodejs';

/** Consume a one-time cart handoff id (cross-subdomain oversized carts). */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')?.trim() ?? '';
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing handoff id.' }, { status: 400 });
  }

  const limited = consumePublicRouteLimit('cartHandoff', clientIpFromRequestHeaders(request.headers));
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  const cart = await consumeCartHandoff(id);
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ ok: false, error: 'Handoff expired or empty.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, cart });
}

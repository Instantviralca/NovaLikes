import { NextResponse } from 'next/server';

import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';
import { resolveOrderByCustomerRef } from '@/lib/orders/store';
import { lookupTrackedOrder } from '@/lib/tracking/lookup';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = consumePublicRouteLimit('track', clientIpFromRequestHeaders(request.headers));
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  try {
    const body = (await request.json()) as { orderId?: string; email?: string };
    const result = await lookupTrackedOrder(
      { orderId: body.orderId ?? '', email: body.email ?? '' },
      async (orderId) => resolveOrderByCustomerRef(orderId),
    );
    return NextResponse.json(result, { status: result.ok ? 200 : 404 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'server_error',
          message: 'Something went wrong. Please try again in a moment.',
        },
      },
      { status: 500 },
    );
  }
}

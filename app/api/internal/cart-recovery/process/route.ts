import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

import { processCartRecoveryJobs } from '@/lib/cart-recovery';

export const runtime = 'nodejs';

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'Cart recovery processor is not configured.' },
      { status: process.env.NODE_ENV === 'production' ? 503 : 401 },
    );
  }

  const authorization = request.headers.get('authorization') ?? '';
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const headerSecret = request.headers.get('x-cron-secret') ?? '';
  if (!safeEqual(bearer, secret) && !safeEqual(headerSecret, secret)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await processCartRecoveryJobs();
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Processing failed.' },
      { status: 500 },
    );
  }
}

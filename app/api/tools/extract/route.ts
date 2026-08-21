import { NextResponse } from 'next/server';

import { isToolSlug } from '@/data/tools/registry';
import { publicToolError } from '@/lib/tools/errors';
import { recordToolDiagnostic } from '@/lib/tools/diagnostics';
import { clientIpFromHeaders, consumeExtractLimit } from '@/lib/tools/rate-limit';
import { runToolExtraction } from '@/lib/tools/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow' };

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);

  let body: { tool?: unknown; input?: unknown };
  try {
    body = (await request.json()) as { tool?: unknown; input?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: publicToolError('invalid_url') }, { status: 400, headers: NOINDEX });
  }

  const tool = typeof body.tool === 'string' ? body.tool : '';
  const input = typeof body.input === 'string' ? body.input : '';
  if (!isToolSlug(tool)) {
    return NextResponse.json({ ok: false, error: publicToolError('unsupported_url') }, { status: 400, headers: NOINDEX });
  }

  const limit = consumeExtractLimit(ip);
  if (!limit.allowed) {
    recordToolDiagnostic({
      tool,
      ok: false,
      category: 'rate_limited',
      durationMs: 0,
      cached: false,
    });
    return NextResponse.json(
      { ok: false, error: publicToolError('rate_limited', undefined, tool) },
      { status: 429, headers: { ...NOINDEX, 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  const result = await runToolExtraction(tool, input);
  if (!result.ok) {
    const status =
      result.error.code === 'rate_limited'
        ? 429
        : result.error.code === 'invalid_url' || result.error.code === 'unsupported_url'
          ? 400
          : result.error.code === 'platform_blocked' || result.error.code === 'media_not_exposed'
            ? 502
            : 422;
    return NextResponse.json(result, { status, headers: NOINDEX });
  }

  return NextResponse.json(result, { headers: NOINDEX });
}

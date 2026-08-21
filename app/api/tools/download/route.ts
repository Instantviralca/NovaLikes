import { NextResponse } from 'next/server';

import { SafeFetchError, safeFetchStream } from '@/lib/tools/fetch';
import { verifyMediaToken } from '@/lib/tools/media-token';
import { TOOL_MEDIA_SUFFIXES } from '@/lib/tools/platforms';
import { clientIpFromHeaders, consumeDownloadLimit } from '@/lib/tools/rate-limit';
import { publicToolError } from '@/lib/tools/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

function contentDisposition(filename: string, inline: boolean): string {
  const safe = filename.replace(/["\\]/g, '');
  return `${inline ? 'inline' : 'attachment'}; filename="${safe}"`;
}

function isUnsafeDownloadType(type: string): boolean {
  const value = type.toLowerCase();
  return (
    value.includes('text/html') ||
    value.includes('text/javascript') ||
    value.includes('application/javascript') ||
    value.includes('application/json') ||
    value.includes('text/xml')
  );
}

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow' };

export async function GET(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const limit = consumeDownloadLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: publicToolError('rate_limited') },
      { status: 429, headers: { ...NOINDEX, 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? '';
  const inline = url.searchParams.get('inline') === '1';
  const payload = verifyMediaToken(token);
  if (!payload) {
    return NextResponse.json({ ok: false, error: publicToolError('download_unavailable') }, { status: 400, headers: NOINDEX });
  }

  try {
    const media = await safeFetchStream({
      url: payload.url,
      purpose: 'media',
      allowedMediaSuffixes: TOOL_MEDIA_SUFFIXES[payload.platform],
      userAgent: payload.ua,
      cookies: payload.cookies,
      referer: payload.referer,
    });

    const headerType = media.headers.get('content-type') || '';
    if (isUnsafeDownloadType(headerType)) {
      media.body.cancel().catch(() => undefined);
      return NextResponse.json({ ok: false, error: publicToolError('download_unavailable') }, { status: 422, headers: NOINDEX });
    }
    const type = payload.mime || headerType || 'application/octet-stream';
    if (isUnsafeDownloadType(type)) {
      media.body.cancel().catch(() => undefined);
      return NextResponse.json({ ok: false, error: publicToolError('download_unavailable') }, { status: 422, headers: NOINDEX });
    }
    return new NextResponse(media.body, {
      status: 200,
      headers: {
        'Content-Type': type,
        'Content-Disposition': contentDisposition(payload.filename, inline),
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    if (error instanceof SafeFetchError) {
      const mapped =
        error.code === 'too_large'
          ? 'too_large'
          : error.code === 'timeout'
            ? 'timeout'
            : error.code === 'platform_blocked'
              ? 'platform_blocked'
              : 'download_unavailable';
      return NextResponse.json({ ok: false, error: publicToolError(mapped) }, { status: 422, headers: NOINDEX });
    }
    return NextResponse.json({ ok: false, error: publicToolError('download_unavailable') }, { status: 422, headers: NOINDEX });
  }
}

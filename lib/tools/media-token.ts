import { createHmac, timingSafeEqual } from 'node:crypto';

import { toolsSigningSecret } from '@/lib/tools/config';
import { TOOL_MEDIA_SUFFIXES } from '@/lib/tools/platforms';
import { assertAllowedMediaHost, parseHttpUrl } from '@/lib/tools/ssrf';
import type { ToolPlatform } from '@/lib/tools/types';

export type MediaTokenPayload = {
  v: 1;
  url: string;
  exp: number;
  platform: ToolPlatform;
  filename: string;
  mime?: string;
  cookies?: string;
  ua?: string;
  referer?: string;
};

export const MEDIA_TOKEN_TTL_SEC = 10 * 60;

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromB64url(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  return Buffer.from(padded, 'base64');
}

function sign(encoded: string): string {
  return b64url(createHmac('sha256', toolsSigningSecret()).update(encoded).digest());
}

export function sanitizeFilename(name: string, fallback: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+/g, '-').slice(0, 80);
  return cleaned || fallback;
}

export function signMediaToken(input: Omit<MediaTokenPayload, 'v' | 'exp'> & { exp?: number }): string {
  const payload: MediaTokenPayload = {
    v: 1,
    url: input.url,
    platform: input.platform,
    filename: sanitizeFilename(input.filename, 'download'),
    mime: input.mime,
    cookies: input.cookies,
    ua: input.ua,
    referer: input.referer,
    exp: input.exp ?? Math.floor(Date.now() / 1000) + MEDIA_TOKEN_TTL_SEC,
  };
  const encoded = b64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function verifyMediaToken(token: string): MediaTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [encoded, signature] = parts;
  const expected = sign(encoded);
  const left = fromB64url(signature);
  const right = fromB64url(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const payload = JSON.parse(fromB64url(encoded).toString('utf8')) as MediaTokenPayload;
    if (payload.v !== 1) return null;
    if (!payload.url || !payload.platform || !payload.filename) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    const parsed = parseHttpUrl(payload.url);
    if (!parsed) return null;
    const suffixes = TOOL_MEDIA_SUFFIXES[payload.platform];
    if (!suffixes || !assertAllowedMediaHost(parsed.hostname, suffixes)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function downloadPathForToken(token: string, inline = false): string {
  const params = new URLSearchParams({ token });
  if (inline) params.set('inline', '1');
  return `/api/tools/download?${params.toString()}`;
}

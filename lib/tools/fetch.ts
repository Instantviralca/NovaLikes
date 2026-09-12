import type { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';

import {
  assertAllowedMediaHost,
  assertAllowedPageHost,
  parseHttpUrl,
  resolveRedirectUrl,
} from '@/lib/tools/ssrf';
import { pinnedRequest, resolvePublicAddresses } from '@/lib/tools/pinned-fetch';
import { TOOL_LIMITS, TOOL_TIMEOUTS, browserUserAgent } from '@/lib/tools/config';

export type SafeFetchPurpose = 'page' | 'media';

export type SafeFetchInput = {
  url: string;
  allowedHosts?: readonly string[];
  allowedMediaSuffixes?: readonly string[];
  purpose: SafeFetchPurpose;
  userAgent?: string;
  cookies?: string;
  referer?: string;
  extraHeaders?: Record<string, string>;
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
};

export type SafeFetchResult = {
  url: string;
  status: number;
  headers: Headers;
  body: Buffer;
  cookies?: string;
};

export class SafeFetchError extends Error {
  constructor(
    message: string,
    readonly code:
      | 'invalid_url'
      | 'unsupported_url'
      | 'timeout'
      | 'too_large'
      | 'platform_blocked'
      | 'not_found',
  ) {
    super(message);
    this.name = 'SafeFetchError';
  }
}

function collectCookies(previous: string | undefined, headers: Headers): string | undefined {
  const setCookie = typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : [];
  if (!setCookie.length) return previous;
  const jar = new Map<string, string>();
  if (previous) {
    for (const part of previous.split(';')) {
      const [name, ...rest] = part.trim().split('=');
      if (name) jar.set(name, rest.join('='));
    }
  }
  for (const cookie of setCookie) {
    const pair = cookie.split(';')[0];
    if (!pair) continue;
    const [name, ...rest] = pair.split('=');
    if (name) jar.set(name.trim(), rest.join('='));
  }
  return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join('; ');
}

function isAllowed(hostname: string, input: SafeFetchInput): boolean {
  if (input.purpose === 'media') {
    return Boolean(
      input.allowedMediaSuffixes && assertAllowedMediaHost(hostname, input.allowedMediaSuffixes),
    );
  }
  return Boolean(input.allowedHosts && assertAllowedPageHost(hostname, input.allowedHosts));
}

function destroyBody(body: IncomingMessage) {
  body.resume();
  body.destroy();
}

async function openSafeResponse(input: SafeFetchInput): Promise<{
  url: string;
  status: number;
  headers: Headers;
  body: IncomingMessage;
  cookies?: string;
}> {
  const timeoutMs =
    input.timeoutMs ?? (input.purpose === 'media' ? TOOL_TIMEOUTS.mediaMs : TOOL_TIMEOUTS.pageMs);
  const maxRedirects = input.maxRedirects ?? TOOL_LIMITS.maxRedirects;

  let current = parseHttpUrl(input.url);
  if (!current) throw new SafeFetchError('invalid_url', 'invalid_url');

  let cookies = input.cookies;
  let hops = 0;

  while (hops <= maxRedirects) {
    if (!isAllowed(current.hostname, input)) {
      throw new SafeFetchError('unsupported_url', 'unsupported_url');
    }

    let target;
    try {
      target = await resolvePublicAddresses(current.hostname);
    } catch {
      throw new SafeFetchError('unsupported_url', 'unsupported_url');
    }

    try {
      const response = await pinnedRequest(current.url, target, {
        method: 'GET',
        timeoutMs,
        headers: {
          'User-Agent': input.userAgent ?? browserUserAgent(),
          Accept:
            input.purpose === 'media'
              ? 'video/mp4,video/*,image/*,*/*;q=0.8'
              : 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          ...(input.referer ? { Referer: input.referer } : {}),
          ...(cookies ? { Cookie: cookies } : {}),
          ...input.extraHeaders,
        },
      });

      cookies = collectCookies(cookies, response.headers);

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        destroyBody(response.body);
        const location = response.headers.get('location');
        if (!location) throw new SafeFetchError('not_found', 'not_found');
        const next = resolveRedirectUrl(current.url, location);
        if (!next) throw new SafeFetchError('unsupported_url', 'unsupported_url');
        current = parseHttpUrl(next.toString());
        if (!current) throw new SafeFetchError('unsupported_url', 'unsupported_url');
        hops += 1;
        if (hops > maxRedirects) {
          throw new SafeFetchError('unsupported_url', 'unsupported_url');
        }
        continue;
      }

      if (response.status === 429 || response.status === 403) {
        destroyBody(response.body);
        throw new SafeFetchError('platform_blocked', 'platform_blocked');
      }
      if (response.status === 404 || response.status >= 400) {
        destroyBody(response.body);
        throw new SafeFetchError('not_found', 'not_found');
      }

      return {
        url: current.url.toString(),
        status: response.status,
        headers: response.headers,
        body: response.body,
        cookies,
      };
    } catch (error) {
      if (error instanceof SafeFetchError) throw error;
      if (error instanceof Error && (error.message === 'timeout' || error.message.includes('timeout'))) {
        throw new SafeFetchError('timeout', 'timeout');
      }
      throw new SafeFetchError('not_found', 'not_found');
    }
  }

  throw new SafeFetchError('unsupported_url', 'unsupported_url');
}

async function readLimited(body: IncomingMessage, maxBytes: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of body) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buf.byteLength;
    if (total > maxBytes) {
      destroyBody(body);
      throw new SafeFetchError('too_large', 'too_large');
    }
    chunks.push(buf);
  }
  return Buffer.concat(chunks);
}

export async function safeFetch(input: SafeFetchInput): Promise<SafeFetchResult> {
  const maxBytes = input.maxBytes ?? (input.purpose === 'media' ? TOOL_LIMITS.mediaBytes : TOOL_LIMITS.pageBytes);
  const opened = await openSafeResponse(input);
  const length = Number(opened.headers.get('content-length') || 0);
  if (length && length > maxBytes) {
    destroyBody(opened.body);
    throw new SafeFetchError('too_large', 'too_large');
  }
  const body = await readLimited(opened.body, maxBytes);
  return {
    url: opened.url,
    status: opened.status,
    headers: opened.headers,
    body,
    cookies: opened.cookies,
  };
}

export async function safeFetchStream(input: SafeFetchInput): Promise<{
  url: string;
  status: number;
  headers: Headers;
  body: ReadableStream<Uint8Array>;
  cookies?: string;
}> {
  const maxBytes = input.maxBytes ?? TOOL_LIMITS.mediaBytes;
  const opened = await openSafeResponse(input);
  const length = Number(opened.headers.get('content-length') || 0);
  if (length && length > maxBytes) {
    destroyBody(opened.body);
    throw new SafeFetchError('too_large', 'too_large');
  }

  let total = 0;
  const nodeReadable = Readable.from(opened.body);
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      nodeReadable.on('data', (chunk: Buffer | string) => {
        const value = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        total += value.byteLength;
        if (total > maxBytes) {
          nodeReadable.destroy();
          controller.error(new SafeFetchError('too_large', 'too_large'));
          return;
        }
        controller.enqueue(new Uint8Array(value));
      });
      nodeReadable.on('end', () => controller.close());
      nodeReadable.on('error', (err) => controller.error(err));
    },
    cancel() {
      nodeReadable.destroy();
    },
  });

  return {
    url: opened.url,
    status: opened.status,
    headers: opened.headers,
    cookies: opened.cookies,
    body,
  };
}

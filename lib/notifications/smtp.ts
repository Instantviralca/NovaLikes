/**
 * Minimal SMTP client for self-hosted Postfix/relay.
 * Auth is optional — localhost:25 can send without SMTP_USER/SMTP_PASS.
 */

import net from 'node:net';
import tls from 'node:tls';

export type SmtpSendInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

function envInt(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function getSmtpHost(): string | undefined {
  return process.env.SMTP_HOST?.trim() || undefined;
}

export function isSmtpConfigured(): boolean {
  return Boolean(getSmtpHost());
}

function quoteAddress(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/<([^>]+)>/);
  return match ? match[1].trim() : trimmed;
}

function smtpSecure(): boolean {
  const flag = process.env.SMTP_SECURE?.trim().toLowerCase();
  if (flag === '1' || flag === 'true') return true;
  if (flag === '0' || flag === 'false') return false;
  return envInt('SMTP_PORT', 25) === 465;
}

function encodeSubject(subject: string): string {
  if (/^[\x20-\x7E]*$/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
}

function buildMime(input: SmtpSendInput): string {
  const boundary = `nl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const headers = [
    `From: ${input.from}`,
    `To: ${input.to}`,
    `Subject: ${encodeSubject(input.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  if (input.replyTo) headers.push(`Reply-To: ${input.replyTo}`);

  return [
    headers.join('\r\n'),
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    input.text.replace(/\r?\n/g, '\r\n'),
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    input.html.replace(/\r?\n/g, '\r\n'),
    `--${boundary}--`,
    '',
  ].join('\r\n');
}

class SmtpSession {
  private leftover = '';

  constructor(private socket: net.Socket) {}

  async readCode(): Promise<{ code: number; lines: string[] }> {
    const lines: string[] = [];
    while (true) {
      const line = await this.readLine();
      lines.push(line);
      const match = line.match(/^(\d{3})([ -])/);
      if (!match) throw new Error(`Unexpected SMTP response: ${line.slice(0, 80)}`);
      const code = Number(match[1]);
      if (match[2] === ' ') return { code, lines };
    }
  }

  private readLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      const tryConsume = () => {
        const idx = this.leftover.indexOf('\n');
        if (idx >= 0) {
          const line = this.leftover.slice(0, idx).replace(/\r$/, '');
          this.leftover = this.leftover.slice(idx + 1);
          resolve(line);
          return true;
        }
        return false;
      };
      if (tryConsume()) return;
      const onData = (chunk: Buffer) => {
        this.leftover += chunk.toString('utf8');
        if (tryConsume()) {
          this.socket.off('data', onData);
          this.socket.off('error', onError);
        }
      };
      const onError = (error: Error) => {
        this.socket.off('data', onData);
        reject(error);
      };
      this.socket.on('data', onData);
      this.socket.once('error', onError);
    });
  }

  async command(command: string, expected: number | number[]): Promise<void> {
    this.socket.write(`${command}\r\n`);
    const { code, lines } = await this.readCode();
    const allowed = Array.isArray(expected) ? expected : [expected];
    if (!allowed.includes(code)) {
      throw new Error(`SMTP ${command.split(' ')[0]} failed (${code}): ${lines.join(' ').slice(0, 180)}`);
    }
  }
}

function connectSocket(host: string, port: number, secure: boolean, timeoutMs: number): Promise<net.Socket> {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host, timeout: timeoutMs })
      : net.connect({ host, port, timeout: timeoutMs });
    const onError = (error: Error) => reject(error);
    socket.once('error', onError);
    socket.setTimeout(timeoutMs, () => {
      socket.destroy();
      reject(new Error('SMTP connection timed out.'));
    });
    socket.once('connect', () => {
      socket.off('error', onError);
      socket.setTimeout(timeoutMs);
      resolve(socket);
    });
  });
}

export async function sendSmtpEmail(input: SmtpSendInput): Promise<{ messageId: string }> {
  const host = getSmtpHost();
  if (!host) throw new Error('SMTP_HOST is not configured.');

  const port = envInt('SMTP_PORT', 25);
  const secure = smtpSecure();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS ?? '';
  const timeoutMs = envInt('SMTP_TIMEOUT_MS', 15_000);
  const ehloName = process.env.SMTP_EHLO?.trim() || 'novalikes.local';

  const socket = await connectSocket(host, port, secure, timeoutMs);
  const session = new SmtpSession(socket);

  try {
    const greeting = await session.readCode();
    if (greeting.code !== 220) {
      throw new Error(`SMTP greeting failed (${greeting.code}).`);
    }

    await session.command(`EHLO ${ehloName}`, 250);

    if (user) {
      const token = Buffer.from(`\0${user}\0${pass}`, 'utf8').toString('base64');
      await session.command(`AUTH PLAIN ${token}`, 235);
    }

    await session.command(`MAIL FROM:<${quoteAddress(input.from)}>`, 250);
    await session.command(`RCPT TO:<${quoteAddress(input.to)}>`, [250, 251]);
    await session.command('DATA', 354);
    socket.write(`${buildMime(input).replace(/^\./gm, '..')}\r\n.\r\n`);
    const data = await session.readCode();
    if (data.code !== 250) {
      throw new Error(`SMTP DATA failed (${data.code}).`);
    }
    await session.command('QUIT', [221, 250]);
    return { messageId: `smtp_${Date.now().toString(36)}` };
  } finally {
    socket.destroy();
  }
}

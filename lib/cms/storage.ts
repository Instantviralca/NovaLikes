import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { createCmsId } from '@/lib/cms/ids';
import { cmsDeleteMedia, cmsGetMediaById, cmsInsertMedia } from '@/lib/cms/store';
import type { CmsMediaRecord } from '@/lib/cms/types';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_BYTES = 5 * 1024 * 1024;

function mediaDir(): string {
  return process.env.CMS_MEDIA_DIR?.trim() || path.join(process.cwd(), '.data', 'cms-media');
}

function publicBase(): string {
  return (process.env.CMS_MEDIA_PUBLIC_BASE_URL || '/api/cms/media/file').replace(/\/$/, '');
}

function extensionFor(mime: string, filename: string): string {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  return path.extname(filename).replace('.', '') || 'bin';
}

export function validateMediaUpload(file: { type: string; size: number }): string | null {
  if (!ALLOWED_MIME.has(file.type)) return 'Only JPEG, PNG, WebP, and GIF images are allowed.';
  if (file.size <= 0 || file.size > MAX_BYTES) return 'Image must be 5MB or smaller.';
  return null;
}

export async function storeCmsMediaFile(input: {
  buffer: Buffer;
  mime: string;
  filename: string;
  alt: string;
  uploadedBy: string;
}): Promise<CmsMediaRecord> {
  const id = createCmsId('media');
  const ext = extensionFor(input.mime, input.filename);
  const storageKey = `${id}.${ext}`;
  await mkdir(mediaDir(), { recursive: true });
  await writeFile(path.join(mediaDir(), storageKey), input.buffer);

  const record: CmsMediaRecord = {
    id,
    url: `${publicBase()}/${id}`,
    storageKey,
    filename: input.filename,
    mime: input.mime,
    size: input.buffer.length,
    alt: input.alt.trim(),
    width: null,
    height: null,
    uploadedBy: input.uploadedBy,
    createdAt: new Date().toISOString(),
  };
  return cmsInsertMedia(record);
}

export async function readLocalCmsMedia(id: string): Promise<{ buffer: Buffer; mime: string } | null> {
  const record = await cmsGetMediaById(id);
  if (!record) return null;
  try {
    const buffer = await readFile(path.join(mediaDir(), path.basename(record.storageKey)));
    return { buffer, mime: record.mime };
  } catch {
    return null;
  }
}

export async function removeCmsMedia(id: string): Promise<boolean> {
  const record = await cmsDeleteMedia(id);
  if (!record) return false;
  try {
    await unlink(path.join(mediaDir(), path.basename(record.storageKey)));
  } catch {
    // already gone
  }
  return true;
}

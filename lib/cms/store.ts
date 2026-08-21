import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { and, desc, eq, ilike, lte, or, sql } from 'drizzle-orm';

import { isProductionRuntime } from '@/lib/config/env';
import { assertCmsProductionDatabase, cmsUsesMemoryStore, isCmsDatabaseReady } from '@/lib/cms/ready';
import { createCmsId } from '@/lib/cms/ids';
import { getDb } from '@/lib/db/client';
import {
  cmsArticleRedirects,
  cmsArticles,
  cmsAuditEvents,
  cmsAuthorSessions,
  cmsLoginAttempts,
  cmsMedia,
  cmsUsers,
} from '@/lib/db/schema';
import type {
  CmsArticleRecord,
  CmsArticleStatus,
  CmsMediaRecord,
  CmsUserRecord,
  CmsUserRole,
  CmsUserStatus,
} from '@/lib/cms/types';
import type { ArticleContentBlock, ArticleFaqItem } from '@/types/learn-article-blocks';
import type { LearnCategoryId } from '@/types/learn';

type SessionRow = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt: string | null;
};

type MemoryState = {
  users: CmsUserRecord[];
  sessions: SessionRow[];
  attempts: { id: string; ipHash: string; success: boolean; createdAt: string }[];
  articles: CmsArticleRecord[];
  media: CmsMediaRecord[];
  redirects: { id: string; fromSlug: string; toSlug: string; articleId: string; createdAt: string }[];
  audit: { id: string; actorId: string; action: string; articleId: string | null; createdAt: string }[];
};

const memory: MemoryState = {
  users: [],
  sessions: [],
  attempts: [],
  articles: [],
  media: [],
  redirects: [],
  audit: [],
};

function cmsStoreFilePath(): string {
  return process.env.CMS_STORE_PATH?.trim() || path.join(process.cwd(), '.data', 'cms-store.json');
}

function shouldPersistCmsFile(): boolean {
  return (
    cmsUsesMemoryStore() &&
    process.env.NODE_ENV !== 'test' &&
    process.env.NEXT_PHASE !== 'phase-production-build' &&
    !isProductionRuntime()
  );
}

let cmsFileMtime = 0;

function hydrateCmsFileStore(): void {
  assertCmsProductionDatabase();
  if (!shouldPersistCmsFile()) return;
  const file = cmsStoreFilePath();
  if (!existsSync(file)) return;
  try {
    const mtime = statSync(file).mtimeMs;
    if (mtime === cmsFileMtime) return;
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as Partial<MemoryState>;
    memory.users = parsed.users ?? [];
    memory.sessions = parsed.sessions ?? [];
    memory.attempts = parsed.attempts ?? [];
    memory.articles = (parsed.articles ?? []).map((article) => ({
      ...article,
      intendedPublishOn: article.intendedPublishOn ?? null,
    }));
    memory.media = parsed.media ?? [];
    memory.redirects = parsed.redirects ?? [];
    memory.audit = parsed.audit ?? [];
    cmsFileMtime = mtime;
  } catch {
    // Ignore a corrupt local store and keep the in-memory copy.
  }
}

function persistCmsFileStore(): void {
  if (!shouldPersistCmsFile()) return;
  const file = cmsStoreFilePath();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(memory));
  try {
    cmsFileMtime = statSync(file).mtimeMs;
  } catch {
    cmsFileMtime = Date.now();
  }
}

function asIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function mapUser(row: typeof cmsUsers.$inferSelect): CmsUserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.passwordHash,
    profileImage: row.profileImage,
    bio: row.bio,
    role: row.role as CmsUserRole,
    status: row.status as CmsUserStatus,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    lastLoginAt: asIso(row.lastLoginAt),
  };
}

function mapArticle(row: typeof cmsArticles.$inferSelect): CmsArticleRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    contentHtml: row.contentHtml,
    contentJson: (row.contentJson as Record<string, unknown> | null) ?? null,
    blocks: (row.blocks as ArticleContentBlock[]) ?? [],
    featuredImageUrl: row.featuredImageUrl,
    featuredImageAlt: row.featuredImageAlt,
    featuredImageWidth: row.featuredImageWidth,
    featuredImageHeight: row.featuredImageHeight,
    category: row.category as LearnCategoryId,
    tags: row.tags ?? [],
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalPath: row.canonicalPath,
    authorId: row.authorId,
    createdBy: row.createdBy,
    updatedBy: row.updatedBy,
    status: row.status as CmsArticleStatus,
    intendedPublishOn: (row as { intendedPublishOn?: string | null }).intendedPublishOn ?? null,
    publishAt: asIso(row.publishAt),
    publishedAt: asIso(row.publishedAt),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    deletedAt: asIso(row.deletedAt),
    faqs: (row.faqs as ArticleFaqItem[]) ?? [],
    keyTakeaways: row.keyTakeaways ?? [],
    relatedServices: row.relatedServices ?? [],
    relatedArticles: row.relatedArticles ?? [],
  };
}

function mapMedia(row: typeof cmsMedia.$inferSelect): CmsMediaRecord {
  return {
    id: row.id,
    url: row.url,
    storageKey: row.storageKey,
    filename: row.filename,
    mime: row.mime,
    size: row.size,
    alt: row.alt,
    width: row.width,
    height: row.height,
    uploadedBy: row.uploadedBy,
    createdAt: row.createdAt.toISOString(),
  };
}

export function resetCmsMemoryForTests(): void {
  memory.users = [];
  memory.sessions = [];
  memory.attempts = [];
  memory.articles = [];
  memory.media = [];
  memory.redirects = [];
  memory.audit = [];
  cmsFileMtime = 0;
}

export async function cmsGetUserByEmail(email: string): Promise<CmsUserRecord | null> {
  hydrateCmsFileStore();
  const normalized = email.trim().toLowerCase();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb()
      .select()
      .from(cmsUsers)
      .where(eq(cmsUsers.email, normalized))
      .limit(1);
    return row ? mapUser(row) : null;
  }
  return memory.users.find((user) => user.email === normalized) ?? null;
}

export async function cmsGetUserById(id: string): Promise<CmsUserRecord | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb().select().from(cmsUsers).where(eq(cmsUsers.id, id)).limit(1);
    return row ? mapUser(row) : null;
  }
  return memory.users.find((user) => user.id === id) ?? null;
}

export async function cmsListUsers(): Promise<CmsUserRecord[]> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const rows = await getDb().select().from(cmsUsers).orderBy(desc(cmsUsers.createdAt));
    return rows.map(mapUser);
  }
  return [...memory.users].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function cmsInsertUser(user: CmsUserRecord): Promise<CmsUserRecord> {
  hydrateCmsFileStore();
  const existing = await cmsGetUserByEmail(user.email);
  if (existing) {
    throw new Error('Email already in use.');
  }
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsUsers).values({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      profileImage: user.profileImage,
      bio: user.bio,
      role: user.role,
      status: user.status,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : null,
    });
    return user;
  }
  memory.users.push(user);
  persistCmsFileStore();
  return user;
}

export async function cmsUpdateUser(
  id: string,
  patch: Partial<CmsUserRecord>,
): Promise<CmsUserRecord | null> {
  const current = await cmsGetUserById(id);
  if (!current) return null;
  const next: CmsUserRecord = {
    ...current,
    ...patch,
    id: current.id,
    email: patch.email ? patch.email.trim().toLowerCase() : current.email,
    updatedAt: new Date().toISOString(),
  };
  if (isCmsDatabaseReady()) {
    await getDb()
      .update(cmsUsers)
      .set({
        name: next.name,
        email: next.email,
        passwordHash: next.passwordHash,
        profileImage: next.profileImage,
        bio: next.bio,
        role: next.role,
        status: next.status,
        updatedAt: new Date(next.updatedAt),
        lastLoginAt: next.lastLoginAt ? new Date(next.lastLoginAt) : null,
      })
      .where(eq(cmsUsers.id, id));
    return next;
  }
  const index = memory.users.findIndex((user) => user.id === id);
  if (index < 0) return null;
  memory.users[index] = next;
  persistCmsFileStore();
  return next;
}

export async function cmsDeleteUser(id: string): Promise<boolean> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const deleted = await getDb().delete(cmsUsers).where(eq(cmsUsers.id, id)).returning({ id: cmsUsers.id });
    return deleted.length > 0;
  }
  const before = memory.users.length;
  memory.users = memory.users.filter((user) => user.id !== id);
  memory.sessions = memory.sessions.filter((session) => session.userId !== id);
  persistCmsFileStore();
  return memory.users.length < before;
}

export async function cmsCreateSession(session: SessionRow): Promise<void> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsAuthorSessions).values({
      id: session.id,
      userId: session.userId,
      tokenHash: session.tokenHash,
      expiresAt: new Date(session.expiresAt),
      revokedAt: session.revokedAt ? new Date(session.revokedAt) : null,
      createdAt: new Date(),
    });
    return;
  }
  memory.sessions.push(session);
  persistCmsFileStore();
}

export async function cmsGetSessionByHash(tokenHash: string): Promise<SessionRow | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb()
      .select()
      .from(cmsAuthorSessions)
      .where(eq(cmsAuthorSessions.tokenHash, tokenHash))
      .limit(1);
    if (!row) return null;
    return {
      id: row.id,
      userId: row.userId,
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt.toISOString(),
      revokedAt: asIso(row.revokedAt),
    };
  }
  return memory.sessions.find((session) => session.tokenHash === tokenHash) ?? null;
}

export async function cmsRevokeSession(tokenHash: string): Promise<void> {
  hydrateCmsFileStore();
  const now = new Date().toISOString();
  if (isCmsDatabaseReady()) {
    await getDb()
      .update(cmsAuthorSessions)
      .set({ revokedAt: new Date() })
      .where(eq(cmsAuthorSessions.tokenHash, tokenHash));
    return;
  }
  const session = memory.sessions.find((item) => item.tokenHash === tokenHash);
  if (session) session.revokedAt = now;
  persistCmsFileStore();
}

export async function cmsRevokeUserSessions(userId: string): Promise<void> {
  hydrateCmsFileStore();
  const now = new Date().toISOString();
  if (isCmsDatabaseReady()) {
    await getDb()
      .update(cmsAuthorSessions)
      .set({ revokedAt: new Date() })
      .where(eq(cmsAuthorSessions.userId, userId));
    return;
  }
  for (const session of memory.sessions) {
    if (session.userId === userId) session.revokedAt = now;
  }
  persistCmsFileStore();
}

export async function cmsCountRecentFailures(ipHash: string, sinceIso: string): Promise<number> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const rows = await getDb()
      .select({ id: cmsLoginAttempts.id })
      .from(cmsLoginAttempts)
      .where(
        and(
          eq(cmsLoginAttempts.ipHash, ipHash),
          eq(cmsLoginAttempts.success, false),
          sql`${cmsLoginAttempts.createdAt} >= ${new Date(sinceIso)}`,
        ),
      );
    return rows.length;
  }
  return memory.attempts.filter(
    (attempt) => attempt.ipHash === ipHash && !attempt.success && attempt.createdAt >= sinceIso,
  ).length;
}

export async function cmsRecordLoginAttempt(ipHash: string, success: boolean): Promise<void> {
  hydrateCmsFileStore();
  const row = {
    id: createCmsId('att'),
    ipHash,
    success,
    createdAt: new Date().toISOString(),
  };
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsLoginAttempts).values({
      id: row.id,
      ipHash,
      success,
      createdAt: new Date(row.createdAt),
    });
    return;
  }
  memory.attempts.push(row);
  persistCmsFileStore();
}

/** Local development / tests only. Production callers must never invoke this. */
export async function cmsClearLoginAttempts(): Promise<number> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const rows = await getDb().select({ id: cmsLoginAttempts.id }).from(cmsLoginAttempts);
    await getDb().delete(cmsLoginAttempts);
    return rows.length;
  }
  const count = memory.attempts.length;
  memory.attempts = [];
  persistCmsFileStore();
  return count;
}

export async function cmsGetArticleById(id: string): Promise<CmsArticleRecord | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb().select().from(cmsArticles).where(eq(cmsArticles.id, id)).limit(1);
    return row ? mapArticle(row) : null;
  }
  return memory.articles.find((article) => article.id === id) ?? null;
}

export async function cmsGetArticleBySlug(slug: string): Promise<CmsArticleRecord | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb().select().from(cmsArticles).where(eq(cmsArticles.slug, slug)).limit(1);
    return row ? mapArticle(row) : null;
  }
  return memory.articles.find((article) => article.slug === slug) ?? null;
}

export async function cmsListArticles(filters: {
  status?: CmsArticleStatus | 'all';
  q?: string;
  category?: string;
  authorId?: string;
}): Promise<CmsArticleRecord[]> {
  hydrateCmsFileStore();
  const status = filters.status && filters.status !== 'all' ? filters.status : undefined;
  const q = filters.q?.trim().toLowerCase();
  if (isCmsDatabaseReady()) {
    const clauses = [];
    if (status) clauses.push(eq(cmsArticles.status, status));
    if (filters.category) clauses.push(eq(cmsArticles.category, filters.category));
    if (filters.authorId) clauses.push(eq(cmsArticles.authorId, filters.authorId));
    if (q) {
      const safe = q.replace(/[%_]/g, '');
      clauses.push(or(ilike(cmsArticles.title, `%${safe}%`), ilike(cmsArticles.slug, `%${safe}%`)));
    }
    const rows = await getDb()
      .select()
      .from(cmsArticles)
      .where(clauses.length ? and(...clauses) : undefined)
      .orderBy(desc(cmsArticles.updatedAt));
    return rows.map(mapArticle);
  }
  return memory.articles
    .filter((article) => {
      if (status && article.status !== status) return false;
      if (filters.category && article.category !== filters.category) return false;
      if (filters.authorId && article.authorId !== filters.authorId) return false;
      if (q && !article.title.toLowerCase().includes(q) && !article.slug.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function cmsInsertArticle(article: CmsArticleRecord): Promise<CmsArticleRecord> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsArticles).values(toArticleRow(article));
    return article;
  }
  memory.articles.push(article);
  persistCmsFileStore();
  return article;
}

export async function cmsReplaceArticle(article: CmsArticleRecord): Promise<CmsArticleRecord> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    await getDb().update(cmsArticles).set(toArticleRow(article)).where(eq(cmsArticles.id, article.id));
    return article;
  }
  const index = memory.articles.findIndex((item) => item.id === article.id);
  if (index >= 0) memory.articles[index] = article;
  else memory.articles.push(article);
  persistCmsFileStore();
  return article;
}

export async function cmsDeleteArticlePermanent(id: string): Promise<boolean> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const deleted = await getDb()
      .delete(cmsArticles)
      .where(eq(cmsArticles.id, id))
      .returning({ id: cmsArticles.id });
    return deleted.length > 0;
  }
  const before = memory.articles.length;
  memory.articles = memory.articles.filter((article) => article.id !== id);
  memory.redirects = memory.redirects.filter((item) => item.articleId !== id);
  persistCmsFileStore();
  return memory.articles.length < before;
}

export async function cmsListDueScheduled(now = new Date()): Promise<CmsArticleRecord[]> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const rows = await getDb()
      .select()
      .from(cmsArticles)
      .where(and(eq(cmsArticles.status, 'scheduled'), lte(cmsArticles.publishAt, now)));
    return rows.map(mapArticle);
  }
  const iso = now.toISOString();
  return memory.articles.filter(
    (article) => article.status === 'scheduled' && article.publishAt && article.publishAt <= iso,
  );
}

export async function cmsInsertRedirect(fromSlug: string, toSlug: string, articleId: string): Promise<void> {
  hydrateCmsFileStore();
  const row = {
    id: createCmsId('redir'),
    fromSlug,
    toSlug,
    articleId,
    createdAt: new Date().toISOString(),
  };
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsArticleRedirects).values({
      id: row.id,
      fromSlug,
      toSlug,
      articleId,
      createdAt: new Date(row.createdAt),
    });
    return;
  }
  memory.redirects = memory.redirects.filter((item) => item.fromSlug !== fromSlug);
  memory.redirects.push(row);
  persistCmsFileStore();
}

export async function cmsGetRedirect(fromSlug: string): Promise<string | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb()
      .select()
      .from(cmsArticleRedirects)
      .where(eq(cmsArticleRedirects.fromSlug, fromSlug))
      .limit(1);
    return row?.toSlug ?? null;
  }
  return memory.redirects.find((item) => item.fromSlug === fromSlug)?.toSlug ?? null;
}

export async function cmsListMedia(q?: string): Promise<CmsMediaRecord[]> {
  hydrateCmsFileStore();
  const query = q?.trim().toLowerCase();
  if (isCmsDatabaseReady()) {
    const rows = await getDb().select().from(cmsMedia).orderBy(desc(cmsMedia.createdAt));
    const mapped = rows.map(mapMedia);
    if (!query) return mapped;
    return mapped.filter(
      (item) => item.filename.toLowerCase().includes(query) || item.alt.toLowerCase().includes(query),
    );
  }
  return memory.media
    .filter((item) => {
      if (!query) return true;
      return item.filename.toLowerCase().includes(query) || item.alt.toLowerCase().includes(query);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function cmsGetMediaById(id: string): Promise<CmsMediaRecord | null> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    const [row] = await getDb().select().from(cmsMedia).where(eq(cmsMedia.id, id)).limit(1);
    return row ? mapMedia(row) : null;
  }
  return memory.media.find((item) => item.id === id) ?? null;
}

export async function cmsInsertMedia(record: CmsMediaRecord): Promise<CmsMediaRecord> {
  hydrateCmsFileStore();
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsMedia).values({
      id: record.id,
      url: record.url,
      storageKey: record.storageKey,
      filename: record.filename,
      mime: record.mime,
      size: record.size,
      alt: record.alt,
      width: record.width,
      height: record.height,
      uploadedBy: record.uploadedBy,
      createdAt: new Date(record.createdAt),
    });
    return record;
  }
  memory.media.push(record);
  persistCmsFileStore();
  return record;
}

export async function cmsUpdateMedia(
  id: string,
  patch: Partial<Pick<CmsMediaRecord, 'alt'>>,
): Promise<CmsMediaRecord | null> {
  const current = await cmsGetMediaById(id);
  if (!current) return null;
  const next = { ...current, ...patch };
  if (isCmsDatabaseReady()) {
    await getDb().update(cmsMedia).set({ alt: next.alt }).where(eq(cmsMedia.id, id));
    return next;
  }
  const index = memory.media.findIndex((item) => item.id === id);
  if (index >= 0)   memory.media[index] = next;
  persistCmsFileStore();
  return next;
}

export async function cmsDeleteMedia(id: string): Promise<CmsMediaRecord | null> {
  const current = await cmsGetMediaById(id);
  if (!current) return null;
  if (isCmsDatabaseReady()) {
    await getDb().delete(cmsMedia).where(eq(cmsMedia.id, id));
    return current;
  }
  memory.media = memory.media.filter((item) => item.id !== id);
  persistCmsFileStore();
  return current;
}

export async function cmsWriteAudit(input: {
  actorId: string;
  action: string;
  articleId?: string | null;
}): Promise<void> {
  hydrateCmsFileStore();
  const row = {
    id: createCmsId('aud'),
    actorId: input.actorId,
    action: input.action,
    articleId: input.articleId ?? null,
    createdAt: new Date().toISOString(),
  };
  if (isCmsDatabaseReady()) {
    await getDb().insert(cmsAuditEvents).values({
      id: row.id,
      actorId: row.actorId,
      action: row.action,
      articleId: row.articleId,
      createdAt: new Date(row.createdAt),
    });
    return;
  }
  memory.audit.push(row);
  persistCmsFileStore();
}

function toArticleRow(article: CmsArticleRecord) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    contentHtml: article.contentHtml,
    contentJson: article.contentJson,
    blocks: article.blocks,
    featuredImageUrl: article.featuredImageUrl,
    featuredImageAlt: article.featuredImageAlt,
    featuredImageWidth: article.featuredImageWidth,
    featuredImageHeight: article.featuredImageHeight,
    category: article.category,
    tags: article.tags,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    canonicalPath: article.canonicalPath,
    authorId: article.authorId,
    createdBy: article.createdBy,
    updatedBy: article.updatedBy,
    status: article.status,
    intendedPublishOn: article.intendedPublishOn,
    publishAt: article.publishAt ? new Date(article.publishAt) : null,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
    deletedAt: article.deletedAt ? new Date(article.deletedAt) : null,
    faqs: article.faqs,
    keyTakeaways: article.keyTakeaways,
    relatedServices: article.relatedServices,
    relatedArticles: article.relatedArticles,
  };
}

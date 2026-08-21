-- Author Dashboard / CMS — additive only. Does not touch existing Learn TS articles
-- or commerce tables.

CREATE TABLE IF NOT EXISTS cms_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_image TEXT,
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'author',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  last_login_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS cms_users_email_uidx ON cms_users (email);
CREATE INDEX IF NOT EXISTS cms_users_role_idx ON cms_users (role);
CREATE INDEX IF NOT EXISTS cms_users_status_idx ON cms_users (status);

CREATE TABLE IF NOT EXISTS cms_author_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES cms_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_login_attempts (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content_html TEXT NOT NULL DEFAULT '',
  content_json JSONB,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  featured_image_width INTEGER,
  featured_image_height INTEGER,
  category TEXT NOT NULL DEFAULT 'guides',
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  canonical_path TEXT,
  author_id TEXT,
  created_by TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  publish_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  key_takeaways JSONB NOT NULL DEFAULT '[]'::jsonb,
  related_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  related_articles JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE UNIQUE INDEX IF NOT EXISTS cms_articles_slug_uidx ON cms_articles (slug);
CREATE INDEX IF NOT EXISTS cms_articles_status_idx ON cms_articles (status);
CREATE INDEX IF NOT EXISTS cms_articles_publish_at_idx ON cms_articles (publish_at);
CREATE INDEX IF NOT EXISTS cms_articles_author_idx ON cms_articles (author_id);

CREATE TABLE IF NOT EXISTS cms_media (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  width INTEGER,
  height INTEGER,
  uploaded_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS cms_media_created_idx ON cms_media (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS cms_media_storage_key_uidx ON cms_media (storage_key);

CREATE TABLE IF NOT EXISTS cms_article_redirects (
  id TEXT PRIMARY KEY,
  from_slug TEXT NOT NULL,
  to_slug TEXT NOT NULL,
  article_id TEXT NOT NULL REFERENCES cms_articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS cms_article_redirects_from_uidx ON cms_article_redirects (from_slug);

CREATE TABLE IF NOT EXISTS cms_audit_events (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  article_id TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  meta JSONB
);

CREATE INDEX IF NOT EXISTS cms_audit_events_actor_idx ON cms_audit_events (actor_id, created_at);
CREATE INDEX IF NOT EXISTS cms_audit_events_article_idx ON cms_audit_events (article_id);

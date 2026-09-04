-- Native analytics upgrade: visitors, sessions, extended events
-- Additive / safe for existing Contabo PostgreSQL. Does not drop data.

CREATE TABLE IF NOT EXISTS analytics_visitors (
  id TEXT PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL REFERENCES analytics_visitors(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL,
  landing_path TEXT,
  landing_page_type TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  market TEXT,
  locale TEXT,
  device_type TEXT,
  browser_family TEXT,
  os_family TEXT,
  country_code TEXT NOT NULL DEFAULT 'XX',
  is_bot BOOLEAN NOT NULL DEFAULT FALSE,
  source_channel TEXT
);

CREATE INDEX IF NOT EXISTS analytics_sessions_visitor_idx
  ON analytics_sessions (visitor_id, started_at);
CREATE INDEX IF NOT EXISTS analytics_sessions_started_idx
  ON analytics_sessions (started_at);
CREATE INDEX IF NOT EXISTS analytics_sessions_market_idx
  ON analytics_sessions (market, started_at);

ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS visitor_id TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS event_category TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS page_type TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS service_slug TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS package_id TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS market TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS locale TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS medium TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS campaign TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS term TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS device_type TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS browser_family TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS os_family TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS properties JSONB;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS occurred_at TIMESTAMPTZ;

UPDATE analytics_events
SET occurred_at = created_at
WHERE occurred_at IS NULL;

CREATE INDEX IF NOT EXISTS analytics_events_occurred_idx
  ON analytics_events (occurred_at);
CREATE INDEX IF NOT EXISTS analytics_events_visitor_occurred_idx
  ON analytics_events (visitor_id, occurred_at);
CREATE INDEX IF NOT EXISTS analytics_events_service_occurred_idx
  ON analytics_events (service_slug, occurred_at);
CREATE INDEX IF NOT EXISTS analytics_events_market_occurred_idx
  ON analytics_events (market, occurred_at);

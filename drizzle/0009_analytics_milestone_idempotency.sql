-- Additive milestone idempotency for native analytics events.
-- Safe for existing production rows: nullable key + unique only when non-null.
-- Does NOT delete historical duplicate session_started / landing_view rows.

ALTER TABLE analytics_events
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS analytics_events_idempotency_uidx
  ON analytics_events (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

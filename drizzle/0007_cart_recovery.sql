-- Native cart abandonment recovery
CREATE TABLE IF NOT EXISTS cart_recovery_sessions (
  id TEXT PRIMARY KEY,
  public_id TEXT NOT NULL,
  email TEXT NOT NULL,
  customer_name TEXT,
  whatsapp_number TEXT,
  currency TEXT NOT NULL,
  subtotal_amount INTEGER NOT NULL,
  discount_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  market TEXT,
  locale TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  cart_snapshot JSONB NOT NULL,
  checkout_snapshot JSONB,
  recovery_token_hash TEXT NOT NULL,
  unsubscribe_token_hash TEXT NOT NULL,
  unsubscribed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ NOT NULL,
  abandoned_at TIMESTAMPTZ,
  recovered_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  order_id TEXT,
  landing_path TEXT,
  referrer TEXT,
  checkout_path TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS cart_recovery_sessions_public_uidx
  ON cart_recovery_sessions (public_id);
CREATE UNIQUE INDEX IF NOT EXISTS cart_recovery_sessions_token_uidx
  ON cart_recovery_sessions (recovery_token_hash);
CREATE UNIQUE INDEX IF NOT EXISTS cart_recovery_sessions_unsub_uidx
  ON cart_recovery_sessions (unsubscribe_token_hash);
CREATE INDEX IF NOT EXISTS cart_recovery_sessions_email_status_idx
  ON cart_recovery_sessions (email, status);
CREATE INDEX IF NOT EXISTS cart_recovery_sessions_status_activity_idx
  ON cart_recovery_sessions (status, last_activity_at);
CREATE INDEX IF NOT EXISTS cart_recovery_sessions_order_idx
  ON cart_recovery_sessions (order_id);

CREATE TABLE IF NOT EXISTS cart_recovery_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES cart_recovery_sessions(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  email_step INTEGER,
  idempotency_key TEXT,
  provider_message_id TEXT,
  error_message TEXT,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS cart_recovery_events_session_idx
  ON cart_recovery_events (session_id, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS cart_recovery_events_idempotency_uidx
  ON cart_recovery_events (idempotency_key);

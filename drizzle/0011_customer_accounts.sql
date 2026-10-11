-- Customer accounts + dashboard (phase 1). Additive / safe to re-run.

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  password_hash TEXT,
  email_verified_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active',
  marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
  whatsapp_number TEXT,
  tiktok_username TEXT,
  instagram_username TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  last_login_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS customers_email_uidx ON customers (email);

CREATE TABLE IF NOT EXISTS customer_sessions (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS customer_sessions_token_hash_idx
  ON customer_sessions (token_hash);
CREATE INDEX IF NOT EXISTS customer_sessions_customer_idx
  ON customer_sessions (customer_id);

CREATE TABLE IF NOT EXISTS customer_email_codes (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS customer_email_codes_lookup_idx
  ON customer_email_codes (email, purpose, created_at DESC);

CREATE TABLE IF NOT EXISTS customer_login_attempts (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  email_hash TEXT,
  success BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS customer_login_attempts_ip_created_idx
  ON customer_login_attempts (ip_hash, created_at);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_id TEXT REFERENCES customers(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS orders_customer_idx
  ON orders (customer_id, created_at DESC);

CREATE INDEX IF NOT EXISTS order_items_order_idx
  ON order_items (order_id);

-- NovaLikes production schema (PostgreSQL)
-- Compatible with Neon / Supabase / managed Postgres via DATABASE_URL

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  guest_email TEXT NOT NULL,
  status TEXT NOT NULL,
  fulfillment_mode TEXT NOT NULL DEFAULT 'manual',
  currency TEXT NOT NULL,
  subtotal_amount INTEGER NOT NULL,
  discount_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  coupon_code TEXT,
  customer_notes TEXT,
  idempotency_key TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS orders_idempotency_key_uidx
  ON orders (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS orders_guest_email_idx ON orders (guest_email);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  platform_id TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  package_id TEXT NOT NULL,
  package_title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  quantity_label TEXT NOT NULL,
  unit_price INTEGER NOT NULL,
  currency TEXT NOT NULL,
  configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
  delivery_time TEXT,
  public_destination TEXT
);

CREATE TABLE IF NOT EXISTS order_payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  payment_id TEXT NOT NULL,
  status TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  paid_at TIMESTAMPTZ,
  provider_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS order_payments_payment_id_uidx
  ON order_payments (payment_id);

CREATE TABLE IF NOT EXISTS order_timeline_events (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT,
  message TEXT NOT NULL,
  public_message TEXT,
  internal_note TEXT,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  at TIMESTAMPTZ NOT NULL,
  meta JSONB
);

CREATE TABLE IF NOT EXISTS order_internal_notes (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_by_type TEXT NOT NULL,
  created_by_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  order_id TEXT,
  message TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS notification_records (
  id TEXT PRIMARY KEY,
  order_id TEXT,
  channel TEXT NOT NULL,
  template_id TEXT NOT NULL,
  trigger TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_preview TEXT,
  error_message TEXT,
  provider_id TEXT,
  provider_message_id TEXT,
  idempotency_key TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS notification_idempotency_uidx
  ON notification_records (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payment_id TEXT,
  processed_at TIMESTAMPTZ NOT NULL,
  raw_summary TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS webhook_provider_event_uidx
  ON webhook_events (provider, event_id);

CREATE TABLE IF NOT EXISTS admin_audit_events (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  meta JSONB
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  discount_amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

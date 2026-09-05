-- Additive public sequential order numbers for Mollie + customer-facing IDs.
-- Keeps existing orders.id (IV-…) as the internal primary key.
-- New orders receive public_number from a Postgres sequence starting at 1001
-- (displayed as 01001, 01002, …). Historical IV- orders keep public_number NULL.

CREATE SEQUENCE IF NOT EXISTS orders_public_number_seq
  AS INTEGER
  START WITH 1001
  INCREMENT BY 1
  MINVALUE 1001
  NO MAXVALUE
  CACHE 1;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS public_number INTEGER;

-- Ensure the sequence never collides with any already-assigned public numbers.
SELECT setval(
  'orders_public_number_seq',
  GREATEST(
    1000,
    COALESCE((SELECT MAX(public_number) FROM orders WHERE public_number IS NOT NULL), 1000)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS orders_public_number_uidx
  ON orders (public_number)
  WHERE public_number IS NOT NULL;

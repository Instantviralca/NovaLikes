-- Additive public sequential order numbers for Mollie + customer-facing IDs.
-- Keeps existing orders.id (IV-…) as the internal primary key.
-- New orders receive public_number from a Postgres sequence starting at 1001
-- (displayed as 01001, 01002, …). Historical IV- orders keep public_number NULL.
--
-- Idempotent / safe to re-run after a failed apply (IF NOT EXISTS + setval DO block).
-- Sequence MINVALUE is 1001 — never call setval(..., 1000).

CREATE SEQUENCE IF NOT EXISTS orders_public_number_seq
  AS INTEGER
  START WITH 1001
  INCREMENT BY 1
  MINVALUE 1001
  NO MAXVALUE
  CACHE 1;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS public_number INTEGER;

-- Position the sequence so the NEXT nextval() is correct:
--   no existing public_number >= 1001 → nextval returns 1001  (setval 1001, is_called=false)
--   max existing M >= 1001           → nextval returns M+1  (setval M, is_called=true)
DO $$
DECLARE
  max_existing INTEGER;
BEGIN
  SELECT MAX(public_number)
    INTO max_existing
    FROM orders
   WHERE public_number IS NOT NULL
     AND public_number >= 1001;

  IF max_existing IS NULL THEN
    PERFORM setval('orders_public_number_seq', 1001, false);
  ELSE
    PERFORM setval('orders_public_number_seq', max_existing, true);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS orders_public_number_uidx
  ON orders (public_number)
  WHERE public_number IS NOT NULL;

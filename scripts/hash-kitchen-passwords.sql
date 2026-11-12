-- One-off migration: store kitchen passwords as bcrypt hashes instead of plain text.
-- Run once against the production database right after deploying the code that uses bcrypt for kitchens.
-- Safe to run again: rows that already hold a bcrypt hash ($2...) are skipped.
BEGIN;

-- A bcrypt hash is 60 characters, so the old 5-15 character limit must go.
ALTER TABLE kitchens DROP CONSTRAINT IF EXISTS password_length;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE kitchens
SET kitchen_password = crypt(kitchen_password, gen_salt('bf', 10))
WHERE kitchen_password NOT LIKE '$2%';

COMMIT;

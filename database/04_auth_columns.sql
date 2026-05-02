-- Add auth columns to customers table for login/register functionality
-- Run this AFTER the initial schema (01_tables.sql)

ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS username     VARCHAR(50)  UNIQUE,
  ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
  ADD COLUMN IF NOT EXISTS role          VARCHAR(20)  DEFAULT 'customer';

-- Index for fast username lookups during login
CREATE INDEX IF NOT EXISTS idx_customers_username ON customers(username);

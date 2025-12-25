-- Quick Fix: Add missing columns so page templates work
-- Run this AFTER creating Dallas County with CORRECT_add_dallas_county.sql

ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_daily_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_admin_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_min INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_max INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_lot_name TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_lot_address TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_release_hours TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_payment_methods TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_available BOOLEAN DEFAULT false;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_details TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ;

-- Verify columns were added
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'counties'
  AND column_name IN (
    'impound_daily_fee',
    'typical_bail_range_min',
    'diversion_program_available'
  )
ORDER BY column_name;

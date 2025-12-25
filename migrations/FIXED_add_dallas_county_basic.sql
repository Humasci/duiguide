-- FIXED: Phase 1 - Add Dallas County with basic contact information
-- This uses the actual counties table schema from your database

-- Step 1: First, let's check what columns actually exist in your counties table
-- Run this query first to see your table structure:
--
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'counties'
-- ORDER BY ordinal_position;

-- Step 2: Insert Dallas County with ONLY the columns that exist
INSERT INTO counties (
  state_id,
  slug,
  name,

  -- Court Info
  court_name,
  court_address,
  court_phone,
  court_hours,

  -- Jail Info
  jail_name,
  jail_address,
  jail_phone,

  -- Timestamps
  created_at,
  updated_at

) VALUES (
  (SELECT id FROM states WHERE slug = 'texas'),
  'dallas',
  'Dallas County',

  -- Court
  'Dallas County Criminal Court',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7811',
  'Monday-Friday 8:00 AM - 4:30 PM',

  -- Jail
  'Dallas County Jail',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7300',

  -- Timestamps
  NOW(),
  NOW()

) ON CONFLICT (slug, state_id)
DO UPDATE SET
  name = EXCLUDED.name,
  court_name = EXCLUDED.court_name,
  court_address = EXCLUDED.court_address,
  court_phone = EXCLUDED.court_phone,
  court_hours = EXCLUDED.court_hours,
  jail_name = EXCLUDED.jail_name,
  jail_address = EXCLUDED.jail_address,
  jail_phone = EXCLUDED.jail_phone,
  updated_at = NOW();

-- Step 3: Verify it was created
SELECT
  id,
  name,
  slug,
  court_name,
  jail_name
FROM counties
WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas');

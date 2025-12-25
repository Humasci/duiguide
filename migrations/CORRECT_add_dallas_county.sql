-- CORRECT: Add Dallas County using the actual schema from 002_complete_schema.sql
-- This matches the column names that actually exist in your database

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

  -- Legal/Process info
  arraignment_timeline,  -- Note: NOT court_arraignment_timeline

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

  -- Legal/Process
  'Within 48 hours of arrest',

  -- Timestamps
  NOW(),
  NOW()

) ON CONFLICT (state_id, slug)
DO UPDATE SET
  name = EXCLUDED.name,
  court_name = EXCLUDED.court_name,
  court_address = EXCLUDED.court_address,
  court_phone = EXCLUDED.court_phone,
  court_hours = EXCLUDED.court_hours,
  jail_name = EXCLUDED.jail_name,
  jail_address = EXCLUDED.jail_address,
  jail_phone = EXCLUDED.jail_phone,
  arraignment_timeline = EXCLUDED.arraignment_timeline,
  updated_at = NOW();

-- Verify it was created
SELECT
  id,
  name,
  slug,
  court_name,
  jail_name,
  arraignment_timeline
FROM counties
WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas');

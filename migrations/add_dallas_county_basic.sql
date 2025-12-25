-- Phase 1: Add Dallas County with basic contact information
-- This gets the pages working immediately while we wait for legal-data-factory to process PDFs

-- Step 1: Insert Dallas County with basic info
INSERT INTO counties (
  name,
  slug,
  state_id,

  -- Court Info (from Dallas County website)
  court_name,
  court_address,
  court_phone,
  court_hours,
  court_arraignment_timeline,

  -- Jail Info
  jail_name,
  jail_address,
  jail_phone,

  -- Impound Info (basic - fees will come from legal-data-factory)
  impound_lot_name,
  impound_lot_address,

  -- Metadata
  last_verified_at,
  created_at,
  updated_at

) VALUES (
  'Dallas County',
  'dallas',
  (SELECT id FROM states WHERE slug = 'texas'),

  -- Court
  'Dallas County Criminal Court',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7811',
  'Monday-Friday 8:00 AM - 4:30 PM',
  'Within 48 hours of arrest',

  -- Jail
  'Dallas County Jail',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7300',

  -- Impound
  'Dallas Police Auto Pound',
  '2828 Hondo Ave, Dallas, TX 75210',

  -- Metadata
  NOW(),
  NOW(),
  NOW()

) ON CONFLICT (slug, state_id)
DO UPDATE SET
  court_name = EXCLUDED.court_name,
  court_address = EXCLUDED.court_address,
  court_phone = EXCLUDED.court_phone,
  court_hours = EXCLUDED.court_hours,
  court_arraignment_timeline = EXCLUDED.court_arraignment_timeline,
  jail_name = EXCLUDED.jail_name,
  jail_address = EXCLUDED.jail_address,
  jail_phone = EXCLUDED.jail_phone,
  impound_lot_name = EXCLUDED.impound_lot_name,
  impound_lot_address = EXCLUDED.impound_lot_address,
  last_verified_at = NOW(),
  updated_at = NOW();

-- Step 2: Verify it was created
SELECT
  name,
  slug,
  court_name,
  jail_name,
  impound_lot_name,
  CASE WHEN impound_daily_fee IS NOT NULL THEN '✅ Has fees' ELSE '⏳ Waiting for legal-data-factory' END as impound_status,
  CASE WHEN typical_bail_range_min IS NOT NULL THEN '✅ Has bail' ELSE '⏳ Waiting for legal-data-factory' END as bail_status
FROM counties
WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas');

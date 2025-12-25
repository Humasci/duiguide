-- Example: How to populate county data for bail and court pages
-- This shows the data needed for the new bail/court page templates

-- Step 1: Insert or update county with all required fields
INSERT INTO counties (
  name,
  slug,
  state_id,

  -- Court Information (for court page)
  court_name,
  court_address,
  court_phone,
  court_hours,
  court_arraignment_timeline,

  -- Bail Information (for bail page)
  typical_bail_range_min,
  typical_bail_range_max,
  jail_name,
  jail_address,
  jail_phone,

  -- Impound Information (for impound page - already exists)
  impound_daily_fee,
  impound_admin_fee,
  impound_lot_name,
  impound_lot_address,
  impound_release_hours,
  impound_payment_methods,

  -- Diversion Program
  diversion_program_available,
  diversion_program_details,

  -- Metadata
  last_verified_at

) VALUES (
  -- Basic Info
  'Dallas County',
  'dallas',
  (SELECT id FROM states WHERE slug = 'texas'),

  -- Court Info
  'Dallas County Criminal Court',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7811',
  'Monday-Friday 8:00 AM - 4:30 PM',
  'Within 48 hours of arrest',

  -- Bail Info
  1000,  -- typical_bail_range_min
  5000,  -- typical_bail_range_max
  'Dallas County Jail',
  '133 N. Riverfront Blvd, Dallas, TX 75207',
  '(214) 653-7300',

  -- Impound Info
  50.00,  -- impound_daily_fee
  200.00, -- impound_admin_fee
  'Dallas Police Auto Pound',
  '2828 Hondo Ave, Dallas, TX 75210',
  'Monday-Friday 8:00 AM - 4:00 PM',
  'Cash, Money Order, Cashier Check',

  -- Diversion Program
  true,
  'Dallas County offers a first-time offender program for eligible DWI defendants. Successful completion can result in dismissal of charges.',

  -- Metadata
  NOW()

) ON CONFLICT (slug, state_id)
DO UPDATE SET
  court_name = EXCLUDED.court_name,
  court_address = EXCLUDED.court_address,
  court_phone = EXCLUDED.court_phone,
  court_hours = EXCLUDED.court_hours,
  court_arraignment_timeline = EXCLUDED.court_arraignment_timeline,
  typical_bail_range_min = EXCLUDED.typical_bail_range_min,
  typical_bail_range_max = EXCLUDED.typical_bail_range_max,
  jail_name = EXCLUDED.jail_name,
  jail_address = EXCLUDED.jail_address,
  jail_phone = EXCLUDED.jail_phone,
  impound_daily_fee = EXCLUDED.impound_daily_fee,
  impound_admin_fee = EXCLUDED.impound_admin_fee,
  impound_lot_name = EXCLUDED.impound_lot_name,
  impound_lot_address = EXCLUDED.impound_lot_address,
  impound_release_hours = EXCLUDED.impound_release_hours,
  impound_payment_methods = EXCLUDED.impound_payment_methods,
  diversion_program_available = EXCLUDED.diversion_program_available,
  diversion_program_details = EXCLUDED.diversion_program_details,
  last_verified_at = EXCLUDED.last_verified_at;


-- Alternative: Quick update for existing county
-- If you just want to add bail/court info to an existing county:
UPDATE counties
SET
  court_name = 'Tarrant County Criminal Court',
  court_address = '401 W Belknap St, Fort Worth, TX 76196',
  court_phone = '(817) 884-1111',
  court_hours = 'Monday-Friday 8:00 AM - 5:00 PM',
  court_arraignment_timeline = 'Within 24-48 hours of arrest',
  typical_bail_range_min = 1000,
  typical_bail_range_max = 4000,
  jail_name = 'Tarrant County Jail',
  jail_address = '200 Taylor St, Fort Worth, TX 76102',
  jail_phone = '(817) 884-3000',
  diversion_program_available = false,
  last_verified_at = NOW()
WHERE slug = 'tarrant' AND state_id = (SELECT id FROM states WHERE slug = 'texas');


-- How to check which counties are missing data:
SELECT
  c.name,
  c.slug,
  s.name as state,
  CASE WHEN c.court_name IS NULL THEN '❌' ELSE '✅' END as has_court_info,
  CASE WHEN c.typical_bail_range_min IS NULL THEN '❌' ELSE '✅' END as has_bail_info,
  CASE WHEN c.impound_daily_fee IS NULL THEN '❌' ELSE '✅' END as has_impound_info
FROM counties c
JOIN states s ON c.state_id = s.id
ORDER BY s.name, c.name;

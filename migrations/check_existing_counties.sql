-- Run this in Supabase SQL Editor to see what counties you already have

SELECT
  s.name as state,
  c.name as county,
  c.slug,

  -- Check what data exists
  CASE WHEN c.court_name IS NOT NULL THEN '✅' ELSE '❌' END as has_court,
  CASE WHEN c.typical_bail_range_min IS NOT NULL THEN '✅' ELSE '❌' END as has_bail,
  CASE WHEN c.impound_daily_fee IS NOT NULL THEN '✅' ELSE '❌' END as has_impound,

  c.last_verified_at
FROM counties c
JOIN states s ON c.state_id = s.id
WHERE s.slug IN ('texas', 'arizona', 'georgia', 'ohio', 'north-carolina', 'tennessee', 'colorado')
ORDER BY s.name, c.name;

-- Insert 12 Texas Counties with Correct Column Names
-- Based on actual counties table structure

INSERT INTO counties (
  state_id,
  state,
  state_full,
  county_name,
  county_slug,
  slug,
  population,
  priority_tier,
  data_complete
) VALUES
  -- Top 10 counties (original)
  (1, 'TX', 'Texas', 'Harris', 'harris', 'harris', 4700000, 1, false),
  (1, 'TX', 'Texas', 'Dallas', 'dallas', 'dallas', 2600000, 1, false),
  (1, 'TX', 'Texas', 'Tarrant', 'tarrant', 'tarrant', 2100000, 1, false),
  (1, 'TX', 'Texas', 'Bexar', 'bexar', 'bexar', 2000000, 1, false),
  (1, 'TX', 'Texas', 'Travis', 'travis', 'travis', 1300000, 1, false),
  (1, 'TX', 'Texas', 'Collin', 'collin', 'collin', 1100000, 1, false),
  (1, 'TX', 'Texas', 'Denton', 'denton', 'denton', 900000, 1, false),
  (1, 'TX', 'Texas', 'Hidalgo', 'hidalgo', 'hidalgo', 870000, 1, false),
  (1, 'TX', 'Texas', 'Fort Bend', 'fort-bend', 'fort-bend', 820000, 1, false),
  (1, 'TX', 'Texas', 'El Paso', 'el-paso', 'el-paso', 865000, 2, false),

  -- Additional 2 counties
  (1, 'TX', 'Texas', 'Nueces', 'nueces', 'nueces', 360000, 2, false),
  (1, 'TX', 'Texas', 'Williamson', 'williamson', 'williamson', 610000, 2, false)

ON CONFLICT (state_id, county_slug) DO UPDATE SET
  population = EXCLUDED.population,
  priority_tier = EXCLUDED.priority_tier;

-- Verify all 12 were inserted
SELECT id, state, county_name, county_slug, population, priority_tier
FROM counties
WHERE state_id = 1
ORDER BY population DESC;

-- Seed data for US states
-- Initial 7 states for launch

INSERT INTO states (
  name, abbreviation, slug, consent_type,
  dmv_deadline_days, bac_limit, implied_consent_law,
  zero_tolerance_limit, enhanced_penalty_bac,
  ignition_interlock_first_offense, lookback_period_years,
  first_offense_jail_min, first_offense_jail_max,
  first_offense_fine_min, first_offense_fine_max,
  first_offense_license_suspension,
  requires_disclaimer, is_active, launch_priority
) VALUES
-- Texas
(
  'Texas', 'TX', 'texas', 'one_party',
  15, 0.08, true,
  0.02, 0.15,
  false, 0,  -- No lookback period for first offense
  '3 days', '180 days',
  0, 2000,
  '90 days to 1 year',
  true, true, 1
),
-- Arizona
(
  'Arizona', 'AZ', 'arizona', 'one_party',
  15, 0.08, true,
  0.00, 0.15,  -- Zero tolerance for under 21
  true, 84,  -- 84 months = 7 years
  '10 days', '6 months',
  250, 2500,
  '90 days to 1 year',
  true, true, 2
),
-- California
(
  'California', 'CA', 'california', 'two_party',
  10, 0.08, true,
  0.01, 0.15,
  false, 120,  -- 10 years
  '48 hours', '6 months',
  390, 1000,
  '6 months',
  true, true, 3
),
-- Florida
(
  'Florida', 'FL', 'florida', 'two_party',
  10, 0.08, true,
  0.02, 0.15,
  false, 60,  -- 5 years
  '0 days', '6 months',
  500, 1000,
  '6 months to 1 year',
  true, true, 4
),
-- Georgia
(
  'Georgia', 'GA', 'georgia', 'one_party',
  30, 0.08, true,
  0.02, 0.15,
  false, 120,  -- 10 years
  '10 days', '12 months',
  300, 1000,
  '12 months',
  true, true, 5
),
-- North Carolina
(
  'North Carolina', 'NC', 'north-carolina', 'one_party',
  10, 0.08, true,
  0.00, 0.15,
  false, 84,  -- 7 years
  '24 hours', '60 days',
  200, 4000,
  '30 days to 1 year',
  true, true, 6
),
-- Colorado
(
  'Colorado', 'CO', 'colorado', 'one_party',
  7, 0.08, true,
  0.02, 0.15,
  false, 60,  -- 5 years
  '5 days', '1 year',
  600, 1000,
  '9 months',
  true, true, 7
);

-- Update state-specific disclaimer text
UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in Texas and is not legal advice. Every case is different. You should consult with a licensed Texas attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'TX';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in Arizona and is not legal advice. Every case is different. You should consult with a licensed Arizona attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'AZ';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in California and is not legal advice. Every case is different. You should consult with a licensed California attorney about your specific situation. The information on this site is not a substitute for legal representation. California is a two-party consent state; recording conversations without all parties'' consent may be illegal.'
WHERE abbreviation = 'CA';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in Florida and is not legal advice. Every case is different. You should consult with a licensed Florida attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'FL';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in Georgia and is not legal advice. Every case is different. You should consult with a licensed Georgia attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'GA';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in North Carolina and is not legal advice. Every case is different. You should consult with a licensed North Carolina attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'NC';

UPDATE states SET disclaimer_text =
'This website provides general information about DUI laws in Colorado and is not legal advice. Every case is different. You should consult with a licensed Colorado attorney about your specific situation. The information on this site is not a substitute for legal representation.'
WHERE abbreviation = 'CO';

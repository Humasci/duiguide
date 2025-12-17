-- SCRAM Provider Data Collection Template
-- Insert this data into building_service_locations table after manual research

-- Harris County, Texas SCRAM Providers
-- Research needed from: Google Maps, court websites, probation offices, Yellow Pages

INSERT INTO building_service_locations (
  county_id,
  type,
  name,
  address,
  city,
  state,
  zip,
  phone,
  website,
  lat,
  lng,
  hours,
  cost_info,
  notes
) VALUES 

-- TEMPLATE - Replace with actual research data
-- (
--   (SELECT id FROM counties WHERE slug = 'harris' AND state_id = (SELECT id FROM states WHERE abbreviation = 'TX')),
--   'scram_provider',
--   'Provider Name',
--   '123 Main St',
--   'Houston',
--   'TX',
--   '77001',
--   '(713) 555-0100',
--   'https://example.com',
--   29.7604, -- lat
--   -95.3698, -- lng
--   'Mon-Fri 8AM-5PM',
--   '$50 setup, $12/day monitoring',
--   'Court approved for Harris County'
-- ),

-- Harris County Research Targets:
-- 1. AMS - Alcohol Monitoring Systems Houston
-- 2. SCRAM of Texas Houston
-- 3. Pretrial Services Harris County approved vendors
-- 4. Electronic Monitoring Services Houston
-- 5. BI Incorporated Houston office
-- 6. GPS & More Houston
-- 7. Recovery Monitoring Solutions
-- 8. Alternative Court Solutions

-- Dallas County, Texas SCRAM Providers
-- Research needed for Dallas/Fort Worth area

-- Dallas County Research Targets:
-- 1. AMS Dallas office
-- 2. SCRAM of Texas Dallas
-- 3. Dallas County Pretrial approved vendors
-- 4. Electronic Monitoring Services Dallas
-- 5. BI Incorporated Dallas
-- 6. GPS & More Dallas

-- Maricopa County, Arizona SCRAM Providers
-- Research needed for Phoenix area

-- Maricopa County Research Targets:
-- 1. AMS Phoenix office
-- 2. Arizona SCRAM providers
-- 3. Maricopa County approved vendors
-- 4. Electronic Monitoring Services Phoenix
-- 5. BI Incorporated Phoenix

-- Research Sources:
-- 1. Google Maps: "SCRAM monitoring [city]"
-- 2. Court websites for approved vendor lists
-- 3. Probation office directories
-- 4. Yellow Pages/business directories
-- 5. State court administration websites
-- 6. County pretrial services websites

-- Data to collect for each provider:
-- - Business name
-- - Complete address
-- - Phone number
-- - Website (if available)
-- - Operating hours
-- - Pricing information
-- - Service coverage area
-- - Court approval status
-- - Special notes/requirements
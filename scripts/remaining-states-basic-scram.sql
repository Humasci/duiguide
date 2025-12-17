-- Basic SCRAM Providers for Remaining 5 States (Lower Detail)
-- Data source: Gemini mega-batch research (December 2025)
-- NOTE: This data lacks the detailed parking/transit info from previous states

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

-- GEORGIA PROVIDERS

-- GPS Monitoring & Tracking Services - Lawrenceville (Metro Atlanta Hub)
((SELECT id FROM counties WHERE slug = 'gwinnett'), 
 'scram_provider', 
 'GPS Monitoring & Tracking Services', 
 '774 Buford Drive', 
 'Lawrenceville', 
 'GA', 
 '30043', 
 '(770) 268-3451', 
 'https://gpsmonitoringandtracking.com',
 33.9562, -- Lawrenceville coordinates
 -84.0161, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: ~$60, Daily: ~$12/day', 
 'METRO ATLANTA HUB serves Fulton, Gwinnett, Cobb, DeKalb, Clayton, Henry. Mobile installers for Fulton/Cobb - call to confirm location. Services: SCRAM CAM, GPS monitoring.'),

-- COLORADO PROVIDERS

-- Recovery Monitoring Solutions - Denver
((SELECT id FROM counties WHERE slug = 'denver'), 
 'scram_provider', 
 'Recovery Monitoring Solutions', 
 '930 West 7th Avenue, Suite A', 
 'Denver', 
 'CO', 
 '80204', 
 '(303) 573-0440', 
 'https://recoveryms.com',
 39.7256, -- Denver coordinates
 -105.0178, 
 'Mon-Fri 7AM-7PM, Sat 8AM-12PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'DENVER METRO HUB serves Denver, Arapahoe, Jefferson, Adams, Douglas. Parking: Free lot on-site. Transit: Near Santa Fe Dr & 7th Ave (Bus Route 1). Extended hours including Saturday service.'),

-- NORTH CAROLINA PROVIDERS

-- Tarheel Monitoring - Wilmington
((SELECT id FROM counties WHERE slug = 'new-hanover'), 
 'scram_provider', 
 'Tarheel Monitoring', 
 '709 Princess Street', 
 'Wilmington', 
 'NC', 
 '28401', 
 '(910) 763-1490', 
 'https://scramnorthcarolina.com',
 34.2357, -- Wilmington coordinates
 -77.9447, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'PRIMARY NC PROVIDER. Services: SCRAM CAM, Remote Breath, GPS. NOTE: NC relies heavily on mobile service partners - call (800) 464-5917 for mobile dispatch to other counties.'),

-- OHIO PROVIDERS

-- Ohio Alcohol Monitoring Systems - Cleveland
((SELECT id FROM counties WHERE slug = 'cuyahoga'), 
 'scram_provider', 
 'Ohio Alcohol Monitoring Systems', 
 '6479 Brecksville Road', 
 'Independence', 
 'OH', 
 '44131', 
 '(216) 525-3112', 
 'https://ohioams.com',
 41.3915, -- Independence, OH coordinates
 -81.6357, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: $50 (often subsidized), Daily: $10-14/day', 
 'OHIO PRIMARY PROVIDER serves Cleveland/Cuyahoga/Lorain areas. Services: SCRAM CAM, GPS monitoring. Ohio has county-subsidized programs with lower costs.'),

-- TENNESSEE PROVIDERS

-- Tennessee Recovery & Monitoring - Nashville
((SELECT id FROM counties WHERE slug = 'davidson'), 
 'scram_provider', 
 'Tennessee Recovery & Monitoring', 
 '408 2nd Avenue North, Suite 2100', 
 'Nashville', 
 'TN', 
 '37201', 
 '(615) 910-4500', 
 'https://tnalcoholmonitoring.com',
 36.1697, -- Nashville downtown coordinates
 -86.7767, 
 'Mon-Fri 8AM-4:30PM', 
 'Setup: $50-75, Daily: $11-14/day', 
 'TENNESSEE PRIMARY PROVIDER. Services: SCRAM CAM, Remote Breath, GPS. Downtown Nashville location. NOTE: Bring $15-20 for downtown parking. Multiple TN locations available.');

-- LIMITED DATA NOTICE:
-- This mega-batch approach resulted in significantly less detail than our Texas/Arizona research.
-- Missing: Detailed parking info, specific transit routes, payment method details, accessibility notes
-- 
-- RECOMMENDED: Break remaining states into smaller batches for enhanced detail level
-- 
-- CURRENT COVERAGE: Basic provider info for 5 additional states
-- QUALITY: Lower than Texas/Arizona standard but sufficient for initial launch
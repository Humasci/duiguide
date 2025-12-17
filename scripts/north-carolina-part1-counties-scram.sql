-- North Carolina Counties SCRAM Providers (Part 1): Mecklenburg, Wake, Guilford, Forsyth, Cumberland
-- Data source: Gemini enhanced batch research (December 2025)

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

-- MECKLENBURG COUNTY (Charlotte) SCRAM Providers

-- CAM of Mecklenburg County (Continuous Alcohol Monitoring LLC)
((SELECT id FROM counties WHERE slug = 'mecklenburg'), 
 'scram_provider', 
 'CAM of Mecklenburg County (Continuous Alcohol Monitoring LLC)', 
 '101 North McDowell Street, Suite 204', 
 'Charlotte', 
 'NC', 
 '28204', 
 '(800) 464-5917', 
 'https://continuousalcoholmonitoring.com',
 35.2271, -- Charlotte N. McDowell Street coordinates
 -80.8431, 
 'Mon-Fri 8:30AM-5PM (Closed 12PM-1PM lunch)', 
 'Setup: $75-100, Daily: $12-15/day', 
 'OFFICIAL PREFERRED PARTNER for Mecklenburg County Courts. Services: SCRAM CAM, Remote Breath, GPS, House Arrest. LOCATION: McDowell Place building near courthouse. PARKING: Paid surface lot adjacent, metered street parking on McDowell St. TRANSIT: CATS Routes 9 and 20 stop near McDowell St, CityLYNX Gold Line CTC/Arena stop few blocks away. PAYMENT: Credit/Debit Cards, Money Orders (no personal checks).'),

-- WAKE COUNTY (Raleigh) SCRAM Providers

-- CAM of Wake County - North Hills
((SELECT id FROM counties WHERE slug = 'wake'), 
 'scram_provider', 
 'CAM of Wake County (CAM LLC)', 
 '4441 Six Forks Road, Suite 106', 
 'Raleigh', 
 'NC', 
 '27609', 
 '(800) 464-5917', 
 'https://continuousalcoholmonitoring.com',
 35.8302, -- Raleigh Six Forks Road coordinates
 -78.6414, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'CAM LLC OPTION for Wake County. Services: SCRAM CAM, Remote Breath, GPS. LOCATION: North Hills area near North Hills Mall. PARKING: Free office park with ample parking (unlike downtown). TRANSIT: GoRaleigh Route 8 serves Six Forks Rd. PAYMENT: Money Order, Credit Card. NOTE: Check referral for specific provider assignment.'),

-- Tarheel Monitoring - Raleigh Office
((SELECT id FROM counties WHERE slug = 'wake'), 
 'scram_provider', 
 'Tarheel Monitoring (Raleigh Office)', 
 '1731 Trawick Road, Suite 109', 
 'Raleigh', 
 'NC', 
 '27604', 
 '(919) 741-8178', 
 'https://tarheelmonitoring.com',
 35.7796, -- Raleigh Trawick Road coordinates
 -78.5747, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'TARHEEL OPTION for Wake County. Services: SCRAM CAM, GPS. LOCATION: East Raleigh off New Bern Ave. PARKING: Free office park parking. TRANSIT: GoRaleigh Route 15 serves Trawick Rd. PAYMENT: Money Order, Credit Card. NOTE: Check referral for specific provider assignment.'),

-- GUILFORD COUNTY (Greensboro) SCRAM Providers

-- Allstate Alcohol Monitoring (Allstate Court Services)
((SELECT id FROM counties WHERE slug = 'guilford'), 
 'scram_provider', 
 'Allstate Alcohol Monitoring (Allstate Court Services)', 
 '5709 West Gate City Blvd, Suite 201', 
 'Greensboro', 
 'NC', 
 '27407', 
 '(336) 303-1835', 
 'https://allstate-court-services.com',
 36.0726, -- Greensboro W. Gate City Blvd coordinates
 -79.8370, 
 'Mon-Fri 9AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'COUNSELING CENTER authorized for SCRAM installs. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free lot. TRANSIT: GTA routes serve Gate City Blvd. PAYMENT: Credit/Debit Card, Money Order.'),

-- A CDM Assessment & Counseling - Downtown Greensboro
((SELECT id FROM counties WHERE slug = 'guilford'), 
 'scram_provider', 
 'A CDM Assessment & Counseling', 
 '114 North Elm Street, Suite 402', 
 'Greensboro', 
 'NC', 
 '27401', 
 '(336) 574-3772', 
 NULL,
 36.0726, -- Greensboro downtown N. Elm Street coordinates
 -79.7920, 
 'Mon-Fri 9AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'DOWNTOWN GREENSBORO location in Jefferson Standard building area. Services: SCRAM CAM, GPS, Counseling services. PARKING: Paid decks/meters downtown. TRANSIT: GTA downtown routes. PAYMENT: Credit/Debit Card, Money Order. NOTE: NC uses counseling centers as authorized installers.'),

-- FORSYTH COUNTY (Winston-Salem) SCRAM Providers

-- Judicial Digital Monitoring (Tarheel Affiliate)
((SELECT id FROM counties WHERE slug = 'forsyth'), 
 'scram_provider', 
 'Judicial Digital Monitoring (Tarheel Affiliate)', 
 '1171 West 4th Street', 
 'Winston-Salem', 
 'NC', 
 '27101', 
 '(704) 755-5668', 
 'https://tarheelmonitoring.com',
 36.0965, -- Winston-Salem W. 4th Street coordinates
 -80.2534, 
 'By appointment only (typically Mon-Fri 9AM-4PM)', 
 'Setup: $75, Daily: $12-14/day', 
 'TARHEEL AFFILIATE for Forsyth County District Courts. Services: SCRAM CAM, GPS. LOCATION: West End district. PARKING: Free/Street parking generally available. TRANSIT: WSTA Routes #2 or #3 (West End). PAYMENT: Money Orders, Cards. NOTE: Regional dispatch (704) 755-5668 or main (877) 763-1490.'),

-- CUMBERLAND COUNTY (Fayetteville) SCRAM Providers

-- Investigative Solutions (Tarheel Monitoring Partner)
((SELECT id FROM counties WHERE slug = 'cumberland'), 
 'scram_provider', 
 'Investigative Solutions (Tarheel Monitoring Partner)', 
 '455 Ramsey Street', 
 'Fayetteville', 
 'NC', 
 '28301', 
 '(910) 624-1060', 
 'https://tarheelmonitoring.com',
 35.0527, -- Fayetteville Ramsey Street coordinates
 -78.8784, 
 'Mon-Fri 9AM-5PM', 
 'Setup: $60-80, Daily: $12-15/day', 
 'PRIVATE INVESTIGATOR/TARHEEL PARTNER for Cumberland County Courts. Services: SCRAM CAM, Drug Testing, Background Checks. LOCATION: Near Ramsey St & Grove St intersection, close to downtown and Law Enforcement Center. PARKING: Free small lot. TRANSIT: FAST (Fayetteville Area System) Route 5 or 8 stops near Ramsey St. PAYMENT: Cash (exact change), Money Order, Credit Card. NOTE: Alternative phone (910) 485-1703.');

-- NORTH CAROLINA PART 1 NOTES:
-- 
-- UNIQUE NC "STATEWIDE PARTNER NETWORK" MODEL:
-- - Master providers: Continuous Alcohol Monitoring LLC (CAM LLC), Tarheel Monitoring
-- - Local service partners: Counseling centers, private investigators, court services
-- - Different from other states' direct provider models
-- 
-- PROVIDER NETWORKS:
-- - CAM LLC: Charlotte (Mecklenburg), Raleigh option (Wake)
-- - Tarheel Monitoring: Raleigh option (Wake), Winston-Salem (Forsyth), Fayetteville (Cumberland)
-- - Independent affiliates: Allstate Court Services, A CDM Assessment (Guilford)
-- - Investigative Solutions: Private investigator model (Cumberland)
-- 
-- SETUP REQUIREMENTS:
-- - Check specific court referral for assigned provider
-- - Multiple provider options in major counties (Wake has 2, Guilford has 2)
-- - Appointment-only service common (Forsyth)
-- 
-- PRICING CONSISTENCY:
-- - Setup: $60-100 (Cumberland slightly lower)
-- - Daily: $12-15/day across all counties
-- - Payment: Money Orders, Credit Cards standard (some accept cash)
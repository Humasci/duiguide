-- North Carolina Counties SCRAM Providers (Part 2): Durham, Buncombe, Union, Gaston, New Hanover
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

-- DURHAM COUNTY (Durham) SCRAM Providers
-- NOTE: Durham residents use Raleigh hubs (Research Triangle area)

-- CAM of Wake County - Primary Research Triangle Hub
((SELECT id FROM counties WHERE slug = 'durham'),
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
 'PRIMARY INTAKE HUB for Research Triangle (Durham/Chapel Hill/Raleigh). Services: SCRAM CAM, Remote Breath, GPS. LOCATION: North Hills area near North Hills Mall, Raleigh. LOGISTICS: ~25-30 minute drive from Durham. PARKING: Free office park with ample parking. TRANSIT: GoTriangle from Durham (long commute 1.5+ hours, requires transfers - Route 100 to GoRaleigh buses). PAYMENT: Money Order, Credit Card. NOTE: Primary option for Durham County residents.'),

-- A+ Monitoring Solutions - Alternative Raleigh Hub
((SELECT id FROM counties WHERE slug = 'durham'),
 'scram_provider',
 'A+ Monitoring Solutions',
 '1731 Trawick Road, Suite 109',
 'Raleigh',
 'NC',
 '27604',
 '(919) 741-8178',
 NULL,
 35.7796, -- Raleigh Trawick Road coordinates
 -78.5747,
 'Mon-Fri 8:30AM-5PM',
 'Setup: $75-100, Daily: $12-15/day',
 'ALTERNATIVE RALEIGH HUB for Durham County. Services: SCRAM CAM, GPS. LOCATION: East Raleigh off New Bern Ave. LOGISTICS: ~25-30 minute drive from Durham. PARKING: Free office park parking. TRANSIT: GoTriangle from Durham. PAYMENT: Money Order, Credit Card. NOTE: Check court referral for provider assignment.'),

-- BUNCOMBE COUNTY (Asheville) SCRAM Providers
-- NOTE: Almost exclusively MOBILE service - no walk-in storefront

-- Tarheel Monitoring / Judicial Digital Monitoring - Western Division Mobile Service
((SELECT id FROM counties WHERE slug = 'buncombe'),
 'scram_provider',
 'Tarheel Monitoring / Judicial Digital Monitoring (Western Division Mobile Service)',
 '221 S. Center Street, Suite 403',
 'Statesville',
 'NC',
 '28677',
 '(877) 763-1490',
 'https://scramnorthcarolina.com',
 35.7826, -- Statesville coordinates
 -80.8742,
 'By appointment only',
 'Setup: $100 (Mobile), Daily: $12-15/day',
 'MOBILE SERVICE for Buncombe County District Courts. Services: SCRAM CAM, GPS, Remote Breath. IMPORTANT: DO NOT DRIVE TO STATESVILLE unless instructed. Agent typically meets clients at Buncombe County Courthouse or local attorney office in Asheville. LOCATION: Western Division HQ is in Statesville (~1 hour east) but serves Asheville via mobile agents. LOGISTICS: Call (877) 763-1490 to schedule local Asheville agent appointment. PAYMENT: Card (over phone) or Money Order. NOTE: Mobile service model - no walk-in storefront in Asheville.'),

-- UNION COUNTY (Monroe) SCRAM Providers

-- CAM of Macon County #2 (Operating as CAM of Union)
((SELECT id FROM counties WHERE slug = 'union'),
 'scram_provider',
 'CAM of Macon County #2 (Operating as CAM of Union)',
 '3307-B Highway 74 East',
 'Monroe',
 'NC',
 '28110',
 '(800) 464-5917',
 'https://continuousalcoholmonitoring.com',
 35.0010, -- Monroe Hwy 74 coordinates
 -80.5155,
 'Mon-Fri 8:30AM-5PM',
 'Setup: $75-100, Daily: $12-15/day',
 'PRIMARY PROVIDER for Union County Courts. Services: SCRAM CAM, GPS. LOCATION: Commercial strip on main highway US-74. PARKING: Free parking in front of unit. TRANSIT: None - car required to reach this location on Hwy 74. PAYMENT: Money Orders, Credit Cards. NOTE: Dedicated local office for Union County.'),

-- GASTON COUNTY (Gastonia) SCRAM Providers
-- NOTE: Service handled by Charlotte hub or mobile agents

-- Carolina Alcohol Monitoring (Charlotte Hub)
((SELECT id FROM counties WHERE slug = 'gaston'),
 'scram_provider',
 'Carolina Alcohol Monitoring (Charlotte Hub)',
 '101 North McDowell Street, Suite 204',
 'Charlotte',
 'NC',
 '28204',
 '(800) 464-5917',
 'https://continuousalcoholmonitoring.com',
 35.2271, -- Charlotte N. McDowell Street coordinates
 -80.8431,
 'Mon-Fri 8:30AM-5PM (Closed 12PM-1PM lunch)',
 'Setup: $75 (office) / $100 (mobile), Daily: $12-15/day',
 'CHARLOTTE HUB serves Gaston County. Services: Full SCRAM suite (CAM, Remote Breath, GPS, House Arrest). LOCATION: McDowell Place building near courthouse, Charlotte. LOGISTICS: Most Gastonia users drive ~25 minutes to Charlotte office for initial setup to avoid mobile fees, then do wireless downloads from home. LOCAL NOTE: Local affiliates exist in Gastonia (bail bond/counseling offices) but all intake scheduling goes through main line. PARKING: Paid surface lot adjacent, metered street parking. TRANSIT: Gastonia Express (85X) commuter bus runs from Gastonia to Charlotte (walking to McDowell St office from transit center required). PAYMENT: Card, Money Order.'),

-- NEW HANOVER COUNTY (Wilmington) SCRAM Providers

-- Tarheel Monitoring, LLC - State HQ
((SELECT id FROM counties WHERE slug = 'new-hanover'),
 'scram_provider',
 'Tarheel Monitoring, LLC (State HQ)',
 '709 Princess Street',
 'Wilmington',
 'NC',
 '28401',
 '(910) 763-1490',
 'https://tarheelmonitoring.com',
 34.2357, -- Wilmington Princess Street coordinates
 -77.9447,
 'Mon-Fri 8AM-5PM',
 'Setup: $75, Daily: $12-15/day',
 'STATE HEADQUARTERS for Tarheel Monitoring - primary state partner for New Hanover County. Services: SCRAM CAM, GPS, Drug Patch, House Arrest. LOCATION: Historic district/downtown area, few blocks from courthouse. PARKING: Street parking - free and metered on Princess St. TRANSIT: Wave Transit - several routes serve downtown transfer station (walkable). PAYMENT: Cashier Check, Money Order, Credit Card. NOTE: This is the main Tarheel Monitoring headquarters serving the entire state.');

-- NORTH CAROLINA PART 2 NOTES:
--
-- REGIONAL SERVICE PATTERNS:
-- - Research Triangle (Durham): Served by 2 Raleigh hubs (CAM LLC, A+ Monitoring)
-- - Western NC (Buncombe/Asheville): Mobile service model, no storefront
-- - Union County: Dedicated local office on Hwy 74
-- - Gaston County: Served by Charlotte hub (CAM)
-- - Coastal (New Hanover/Wilmington): State HQ for Tarheel Monitoring
--
-- MOBILE SERVICE MODEL (Buncombe):
-- - No walk-in storefront in Asheville
-- - Agent meets clients at courthouse or attorney office
-- - Higher setup fee ($100 vs $75)
-- - Regional hub 1 hour away in Statesville
--
-- TRANSIT CHALLENGES:
-- - Durham to Raleigh: Long commute (1.5+ hours) via GoTriangle
-- - Union County: No transit - car required
-- - Gaston to Charlotte: Commuter bus available but requires walking
-- - Wilmington: Good downtown Wave Transit access
--
-- LOGISTICS NOTES:
-- - Durham: 25-30 minute drive to Raleigh hubs
-- - Gaston: 25 minute drive to Charlotte hub (avoid mobile fees)
-- - Buncombe: Call (877) 763-1490 for mobile agent appointment
--
-- PRICING CONSISTENCY:
-- - Setup: $75 (office) / $100 (mobile)
-- - Daily: $12-15/day across all counties
-- - Payment: Money Orders, Credit Cards standard
--
-- PROVIDER NETWORKS:
-- - CAM LLC: Durham (via Raleigh), Union, Gaston (via Charlotte)
-- - Tarheel Monitoring: Buncombe (mobile), New Hanover (HQ)
-- - A+ Monitoring: Durham (via Raleigh alternative)

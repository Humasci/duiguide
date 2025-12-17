-- Ohio Counties SCRAM Providers (Part 1): Franklin, Cuyahoga, Hamilton, Summit, Montgomery
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

-- FRANKLIN COUNTY (Columbus) SCRAM Providers

-- Averhealth - Columbus (Central Ohio Provider)
((SELECT id FROM counties WHERE slug = 'franklin'), 
 'scram_provider', 
 'Averhealth', 
 '326 South High Street, 1st Floor', 
 'Columbus', 
 'OH', 
 '43215', 
 '(614) 252-6340', 
 'https://averhealth.com',
 39.9526, -- Columbus S. High Street coordinates
 -82.9988, 
 'Mon-Fri 8AM-4:30PM (verify lunch closures), Weekends Closed', 
 'Setup: $50-75, Daily: $10-12/day', 
 'CENTRAL OHIO PROVIDER for Franklin County Municipal and Common Pleas Courts. Services: SCRAM CAM, Remote Breath, Drug Testing. LOCATION: Downtown Columbus directly across from Franklin County Courthouse. PARKING: Paid/Garage - use Franklin County Courthouse Garage (S. Front St access) or metered street. TRANSIT: EXCELLENT - COTA major stops at High St & Mound St serve lines 1, 2, 5, and 8. PAYMENT: Money Orders, Credit/Debit Cards.'),

-- CUYAHOGA COUNTY (Cleveland/Independence) SCRAM Providers

-- Ohio Alcohol Monitoring Systems - Independence (State HQ)
((SELECT id FROM counties WHERE slug = 'cuyahoga'), 
 'scram_provider', 
 'Ohio Alcohol Monitoring Systems (Ohio AMS)', 
 '6479 Brecksville Road', 
 'Independence', 
 'OH', 
 '44131', 
 '(216) 525-3112', 
 'https://ohioams.com',
 41.3915, -- Independence Brecksville Road coordinates
 -81.6357, 
 'Mon-Fri 8:30AM-5PM, Sat by appointment', 
 'Setup: $75-100, Daily: $11-13/day', 
 'STATE HEADQUARTERS for Ohio\'s largest SCRAM provider. Services: SCRAM CAM, SCRAM GPS, Remote Breath, House Arrest. Court approved: Primary vendor for Cuyahoga County, Parma, Rocky River courts. LOCATION: Business park in Independence (south Cleveland suburb). PARKING: Free dedicated surface lot. TRANSIT: Limited - just off I-77 (Rockside Rd exit), difficult RTA bus access, car recommended. PAYMENT: Credit/Debit Cards (Visa/Mastercard), Money Orders.'),

-- HAMILTON COUNTY (Cincinnati) SCRAM Providers

-- Hamilton County Electronic Monitoring Release Unit (County-Run)
((SELECT id FROM counties WHERE slug = 'hamilton'), 
 'scram_provider', 
 'Hamilton County Electronic Monitoring Release Unit', 
 '800 Broadway', 
 'Cincinnati', 
 'OH', 
 '45202', 
 '(513) 946-6153', 
 'https://hamiltoncountycourts.org',
 39.1031, -- Cincinnati Broadway coordinates
 -84.5120, 
 'Mon-Fri 8AM-4PM, Weekends Closed', 
 'Setup: Often waived/included in court costs, Daily: $8-15/day sliding scale', 
 'COUNTY-RUN PROGRAM (not private provider). Services: SCRAM CAM, GPS, Electronic Home Monitoring. Official county department. LOCATION: Downtown Cincinnati. PARKING: Paid - lot directly across street on Broadway (bring coins/card). TRANSIT: Excellent Metro access - many routes stop at Court St & Broadway or Government Square hub. PAYMENT: Money Order or Cashier\'s Check (strictly enforced for court fees). SPECIAL: Indigent options available, sliding scale based on income.'),

-- SUMMIT COUNTY (Akron) SCRAM Providers

-- Oriana House - Akron (Electronic Monitoring Dept)
((SELECT id FROM counties WHERE slug = 'summit'), 
 'scram_provider', 
 'Oriana House (Electronic Monitoring Dept)', 
 '921 Sherman Street', 
 'Akron', 
 'OH', 
 '44311', 
 '(330) 374-9425', 
 'https://orianahouse.org',
 41.0732, -- Akron Sherman Street coordinates
 -81.5190, 
 'Mon-Fri 8AM-4PM', 
 'Setup: $50, Daily: $10-12/day', 
 'SUMMIT COUNTY PRIMARY. Services: SCRAM CAM, GPS, Reentry services. Court approved: Summit County Common Pleas and Akron Municipal Court. LOCATION: Near University of Akron campus. PARKING: Free visitor parking in designated lot off Sherman St. TRANSIT: METRO RTA Route 14 (Thornton St) stops nearby. PAYMENT: Money Orders, Credit Cards.'),

-- MONTGOMERY COUNTY (Dayton/Kettering) SCRAM Providers

-- Ohio AMS - Kettering Office
((SELECT id FROM counties WHERE slug = 'montgomery'), 
 'scram_provider', 
 'Ohio Alcohol Monitoring Systems (Ohio AMS)', 
 '2325 Wilmington Pike', 
 'Kettering', 
 'OH', 
 '45420', 
 '(937) 294-0655', 
 'https://ohioams.com',
 39.6895, -- Kettering Wilmington Pike coordinates
 -84.1687, 
 'By appointment (typically Mon-Fri 9AM-5PM)', 
 'Setup: $75, Daily: $11-13/day', 
 'OHIO AMS KETTERING OFFICE serves Montgomery County. Services: SCRAM CAM, GPS, House Arrest. Court approved: Montgomery County and Kettering Municipal Courts. LOCATION: Commercial strip/business building on Wilmington Pike. PARKING: Free large surface lot. TRANSIT: RTA Route 17 runs along Wilmington Pike with nearby stops. PAYMENT: Credit/Debit Cards, Money Orders. NOTE: Call main line (216) 525-3112 for Kettering routing.');

-- OHIO PART 1 NOTES:
-- 
-- UNIQUE OHIO FEATURES:
-- - Mix of private providers (Ohio AMS, Averhealth, Oriana House) and county-run programs
-- - Hamilton County runs its own electronic monitoring (government-operated)
-- - Ohio AMS is the state's largest SCRAM provider with multiple locations
-- - Sliding scale fees in Hamilton County based on income
-- - Often waived setup fees for indigent clients
-- 
-- PROVIDER NETWORKS:
-- - Ohio AMS: Statewide presence (Cuyahoga HQ, Montgomery satellite)
-- - Averhealth: Central Ohio focus (Franklin County)
-- - County-run: Hamilton County Electronic Monitoring Unit
-- - Oriana House: Regional provider (Summit County)
-- 
-- PRICING ADVANTAGES:
-- - Generally lower costs than other states ($8-15/day vs $12-15 elsewhere)
-- - Setup fees often $50-75 vs $75-100+ in other states
-- - Hamilton County sliding scale and indigent options
-- 
-- TRANSIT ACCESS:
-- - Excellent: Columbus (COTA), Cincinnati (Metro)
-- - Good: Akron (METRO RTA), Dayton (RTA)
-- - Limited: Independence/Cleveland suburbs (car recommended)
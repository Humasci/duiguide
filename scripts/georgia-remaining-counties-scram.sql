-- Additional Georgia Counties SCRAM Providers: Cherokee, Clayton, Henry, Forsyth, Richmond
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

-- CHEROKEE COUNTY (Canton/Woodstock) SCRAM Providers

-- ProntoTrak Monitoring Solutions - Canton Office
((SELECT id FROM counties WHERE slug = 'cherokee'), 
 'scram_provider', 
 'ProntoTrak Monitoring Solutions (Canton Office)', 
 '154 North Street', 
 'Canton', 
 'GA', 
 '30114', 
 '(770) 720-2818', 
 'https://prontotrak.com',
 34.2370, -- Canton coordinates
 -84.4910, 
 'Mon-Fri 8AM-5PM (Closed 12PM-1PM lunch)', 
 'Setup: $75, Daily: $12-14/day', 
 'PRIMARY PROVIDER for Cherokee County State & Superior Courts. Services: SCRAM CAM, Remote Breath, GPS, House Arrest. PARKING: Free small surface lot at office. TRANSIT: None - car/rideshare required, no local transit. PAYMENT: Money Orders, Debit/Credit Cards (Visa/MasterCard). NOTE: Usually closes for lunch hour.'),

-- CLAYTON COUNTY (Jonesboro/Forest Park) SCRAM Providers

-- A 2nd Chance Monitoring - Clayton Partner Location
((SELECT id FROM counties WHERE slug = 'clayton'), 
 'scram_provider', 
 'A 2nd Chance Monitoring (Southside/Clayton Partner)', 
 '9157 Tara Boulevard', 
 'Jonesboro', 
 'GA', 
 '30236', 
 '(404) 223-5622', 
 'https://a2ndchancemonitoring.com',
 33.5187, -- Jonesboro Tara Boulevard coordinates
 -84.3538, 
 'By appointment (24/7 for bond releases, Mon-Fri 9AM-5PM standard monitoring)', 
 'Setup: $75-100, Daily: $12-15/day', 
 'MOBILE SERVICE & PARTNER LOCATIONS. Services: SCRAM CAM, GPS. Court approved: Clayton County Courts. LOCATION: Partner with "Free At Last Bail Bonds" or "A-Atlanta Bail Bonds" for setups if not done at jail. PARKING: Free large lot at Tara Blvd bail bond strip. TRANSIT: MARTA Bus 193 stops along Tara Blvd - accessible from Justice Center. PAYMENT: Cash, Card, Money Order. NOTE: Verify appointment first - uses partner bail bond locations.'),

-- HENRY COUNTY (McDonough) SCRAM Providers

-- GPS Monitoring & Tracking Services - Henry Division (Mobile Service)
((SELECT id FROM counties WHERE slug = 'henry'), 
 'scram_provider', 
 'GPS Monitoring & Tracking Services (Henry Division)', 
 'Mobile Service - Henry County', 
 'McDonough', 
 'GA', 
 '30253', 
 '(770) 268-3451', 
 'https://gpsmonitoringandtracking.com',
 33.4473, -- McDonough coordinates
 -84.1468, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: $75 + $25 mobile fee, Daily: $12/day', 
 'MOBILE SERVICE ONLY - no dedicated McDonough storefront. Services: SCRAM CAM, GPS. Court approved: Henry County State Court. LOGISTICS: Agent meets at Henry County Probation Office (308 Work Camp Rd) or Henry County Jail. PAYMENT: Credit/Debit Card, Money Order. HQ: 774 Buford Drive, Lawrenceville. NOTE: Mobile service adds $25 fee.'),

-- FORSYTH COUNTY (Cumming) SCRAM Providers

-- ProntoTrak Monitoring Solutions - Corporate HQ
((SELECT id FROM counties WHERE slug = 'forsyth'), 
 'scram_provider', 
 'ProntoTrak Monitoring Solutions (Corporate HQ)', 
 '106 Colony Park Drive, Suite 700', 
 'Cumming', 
 'GA', 
 '30040', 
 '(678) 455-0525', 
 'https://prontotrak.com',
 34.2073, -- Cumming Colony Park coordinates
 -84.1402, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $75, Daily: $12-14/day', 
 'CORPORATE HEADQUARTERS for ProntoTrak. Services: Full SCRAM suite (Alcohol, GPS, House Arrest), Drug Patch. Court approved: Official provider for Forsyth County Courts. LOCATION: Quiet business park setting. PARKING: Free ample parking. TRANSIT: None - car required. PAYMENT: Money Orders, Credit Cards.'),

-- RICHMOND COUNTY (Augusta) SCRAM Providers

-- CSRA Probation Services - Augusta
((SELECT id FROM counties WHERE slug = 'richmond'), 
 'scram_provider', 
 'CSRA Probation Services', 
 '418 12th Street', 
 'Augusta', 
 'GA', 
 '30901', 
 '(706) 432-8607', 
 'https://csraprobation.com',
 33.4735, -- Augusta downtown coordinates
 -81.9748, 
 'Mon-Fri 8:30AM-5PM', 
 'Setup: $60-100, Daily: $12-15/day', 
 'MAIN PROVIDER for Augusta-Richmond County Courts. Services: SCRAM CAM, Remote Breath, Probation Supervision, Drug Testing. LOCATION: Downtown Augusta. PARKING: Street/Free lot available, small lot plus street parking. TRANSIT: Augusta Transit (APT) - several bus lines near Telfair St/12th St. PAYMENT: Cashier\'s Check, Money Order, Debit Card (kiosk inside office).');

-- GEORGIA COMPLETION SUMMARY:
-- 
-- ALL 10 GEORGIA COUNTIES NOW COMPLETE:
-- Metro Atlanta: Fulton, DeKalb, Gwinnett, Cobb, Clayton (5 counties)
-- North Georgia: Cherokee, Forsyth (2 counties) 
-- South Metro: Henry (1 county)
-- Central/East: Richmond (1 county)
-- Coast: Chatham (1 county)
-- 
-- GEORGIA PROVIDER NETWORKS:
-- - A 2nd Chance Monitoring: Fulton, DeKalb, Clayton (metro coverage)
-- - GPS Monitoring & Tracking: Gwinnett, Henry (east metro/mobile)
-- - ProntoTrak: Cherokee, Forsyth, Cobb (north Georgia hub)
-- - CSRA Probation Services: Richmond (Augusta area)
-- - 24/7 Bail Bonds: Chatham (Savannah mobile)
-- 
-- UNIQUE GEORGIA FEATURES:
-- - Bonding companies as authorized installers (state standard)
-- - Strong mobile service model (Henry, Clayton, Chatham)
-- - Corporate headquarters in state (ProntoTrak in Cumming)
-- - Private probation companies (CSRA in Augusta)
-- 
-- SETUP REQUIREMENTS (All Georgia Counties):
-- - Original signed sentencing/bond order (judge signature required)
-- - Valid Georgia Driver's License or ID card
-- - Proof of address: Recent Georgia Power/Water bill (strictly required for GPS/Home Confinement)
-- 
-- GEORGIA COMPLETE: 10/10 counties with comprehensive provider data
-- Enhanced SCRAM Providers for Georgia Counties: Fulton, Gwinnett, Cobb, DeKalb, Chatham
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

-- FULTON COUNTY (Atlanta) SCRAM Providers

-- A 2nd Chance Monitoring - Atlanta (Also serves DeKalb)
((SELECT id FROM counties WHERE slug = 'fulton'), 
 'scram_provider', 
 'A 2nd Chance Monitoring', 
 '500 Means Street NW, Suite 110', 
 'Atlanta', 
 'GA', 
 '30318', 
 '(404) 223-5622', 
 'https://a2ndchancemonitoring.com',
 33.7701, -- Atlanta Means Street coordinates
 -84.3900, 
 'Mon-Fri 9AM-5PM, Weekends by appointment for bond setups', 
 'Setup: $75-100, Daily: $12-15/day', 
 'ALSO SERVES DEKALB COUNTY. Services: SCRAM CAM, Remote Breath, GPS, RF Monitoring. Court approved: Fulton County Superior Court and Atlanta Municipal Court. LOCATION: Near Georgia Tech/Downtown. PARKING: Paid deck nearby, metered street parking (ParkMobile app required). TRANSIT: MARTA Bus 26 stops at Marietta St & Means St (short walk), North Avenue Station rail (significant walk). PAYMENT: Credit/Debit Cards, Money Orders, Cash (exact change). DOCUMENTS: Bring "Condition of Bond" or "Probation Order" paperwork. NOTE: Georgia bonding companies are official SCRAM installers - normal to be in bail bond facility.'),

-- GWINNETT COUNTY (Lawrenceville) SCRAM Providers

-- GPS Monitoring & Tracking Services - Lawrenceville (Primary Hub)
((SELECT id FROM counties WHERE slug = 'gwinnett'), 
 'scram_provider', 
 'GPS Monitoring & Tracking Services', 
 '774 Buford Drive', 
 'Lawrenceville', 
 'GA', 
 '30043', 
 '(770) 268-3451', 
 'https://gpsmonitoringandtracking.com',
 33.9562, -- Lawrenceville Buford Drive coordinates
 -84.0161, 
 'Mon-Fri 8:30AM-5PM, Sat by appointment', 
 'Setup: $60-80, Daily: $11-13/day', 
 'PRIMARY HUB for GPS Monitoring & Tracking network. Services: SCRAM CAM, GPS, Drug Patch. Court approved: Gwinnett County Courts and Recorder\'s Court. PARKING: Free dedicated private lot in front of building. TRANSIT: Gwinnett County Transit Route 40 stops near Gwinnett Medical Center (short walk/rideshare). PAYMENT: Credit/Debit Cards, Money Orders.'),

-- COBB COUNTY (Marietta) SCRAM Providers

-- ProntoTrak Monitoring - Canton (North GA Hub serving Cobb)
((SELECT id FROM counties WHERE slug = 'cobb'), 
 'scram_provider', 
 'ProntoTrak Monitoring (North GA Hub)', 
 '154 North Street', 
 'Canton', 
 'GA', 
 '30114', 
 '(770) 720-2818', 
 'https://prontotrak.com',
 34.2370, -- Canton coordinates
 -84.4910, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $75, Daily: $12/day', 
 'NORTH GA HUB serves Cobb County. Services: SCRAM CAM, Remote Breath, House Arrest. Court approved: Cobb County State & Superior Courts. LOCATION: Canton office (HQ in Cumming), also installs at Cobb County Adult Detention Center. PARKING: Free surface lot at Canton office. TRANSIT: None - car required to reach Canton. PAYMENT: Money Orders, Credit Cards. MOBILE OPTION: Ask if they can meet at Cobb County Courthouse to avoid Canton drive.'),

-- DEKALB COUNTY (Decatur) SCRAM Providers

-- A 2nd Chance Monitoring - Decatur/Avondale Office
((SELECT id FROM counties WHERE slug = 'dekalb'), 
 'scram_provider', 
 'A 2nd Chance Monitoring (Decatur/Avondale Office)', 
 '2842 E. College Ave', 
 'Decatur', 
 'GA', 
 '30030', 
 '(404) 223-5622', 
 'https://a2ndchancemonitoring.com',
 33.7743, -- Decatur E. College Ave coordinates
 -84.2830, 
 'Mon-Fri 9AM-5PM', 
 'Setup: $75-100, Daily: $12-15/day', 
 'DEKALB-SPECIFIC OFFICE (residents can also use Atlanta location). Services: SCRAM Systems and GPS. Court approved: DeKalb State Court. PARKING: Free/Street with limited spots in front, generally accessible. TRANSIT: EXCELLENT - directly across from Avondale Station (MARTA Blue Line) - best location for transit users. PAYMENT: Card and Money Order.'),

-- CHATHAM COUNTY (Savannah) SCRAM Providers

-- 24/7 Bail Bonds - Statesboro (Mobile Service to Savannah)
((SELECT id FROM counties WHERE slug = 'chatham'), 
 'scram_provider', 
 '24/7 Bail Bonds (Authorized SCRAM Partner)', 
 '206 South Main Street', 
 'Statesboro', 
 'GA', 
 '30458', 
 '(912) 764-2666', 
 'https://247bailbondsga.com',
 32.4488, -- Statesboro coordinates (~50 mins from Savannah)
 -81.7834, 
 '24 Hours for Bail, Mon-Fri 9AM-5PM for monitoring appointments', 
 'Setup: $100 (includes mobile/travel fee), Daily: $12-14/day', 
 'MOBILE SERVICE for Savannah clients. Services: SCRAM CAM and GPS. Court approved: Chatham County Recorder\'s Court and Superior Court. LOCATION: Official storefront in Statesboro (~50 mins from Savannah) - MUST CALL to arrange Savannah meeting. LOGISTICS: Mobile service meets at jail or courthouse in Savannah. PAYMENT: Cash, Credit Card, Money Order. SPECIAL: Chatham County Drug Court participants may have county funding - ask case manager before paying private vendor. NOTE: Ask for Electronic Monitoring Division when calling.');

-- GEORGIA-SPECIFIC NOTES:
-- 
-- UNIQUE GEORGIA FEATURES:
-- - Bonding companies are official authorized SCRAM installers (normal business model)
-- - Don\'t be confused if office is inside bail bond facility - this is standard
-- - Strong MARTA integration in metro Atlanta (especially DeKalb Avondale location)
-- 
-- SETUP REQUIREMENTS (All Georgia Counties):
-- - "Condition of Bond" or "Probation Order" paperwork required
-- - Pretrial cases: Ensure officer sent referral before arrival
-- - Drug Court participants: Check for county funding before paying
-- 
-- PROVIDER NETWORKS:
-- - A 2nd Chance Monitoring: Fulton/DeKalb coverage
-- - GPS Monitoring & Tracking: Gwinnett hub
-- - ProntoTrak: North Georgia/Cobb
-- - 24/7 Bail Bonds: Savannah mobile service
-- 
-- TRANSIT ADVANTAGES:
-- - DeKalb Avondale: Direct MARTA access (best for transit users)
-- - Fulton Atlanta: Multiple MARTA bus options
-- - Rural areas: Car required or mobile service available
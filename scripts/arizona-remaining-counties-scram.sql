-- SCRAM Providers for Remaining Arizona Counties: Pinal, Yavapai, Yuma, Mohave, Coconino, Cochise, Navajo, Apache
-- Data source: Gemini research (December 2025)

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

-- PINAL COUNTY (Florence/Casa Grande/Apache Junction) SCRAM Providers

-- SCRAM of Arizona - Apache Junction Satellite Office
((SELECT id FROM counties WHERE slug = 'pinal'), 
 'scram_provider', 
 'SCRAM of Arizona (Satellite Office)', 
 '575 N. Idaho Road', 
 'Apache Junction', 
 'AZ', 
 '86403', 
 '(602) 753-2161', 
 'https://scramaz.com',
 33.4148, -- Apache Junction coordinates
 -111.5497, 
 'By appointment only (typically Mon-Fri 8AM-4PM)', 
 'Setup: $50-75 one-time, Daily: $12-15/day', 
 'SATELLITE OFFICE inside/adjacent to Roy Hudson Complex (Apache Junction Justice Court). Services: SCRAM CAM, Remote Breath, GPS. Court approved: Pinal County Superior Court and Justice Courts. PARKING: Free large public lot at Justice Court complex. TRANSIT: Limited local shuttles, sparse bus service. PAYMENT: Money Order or Credit Card (no cash). NOTE: Central scheduling through Phoenix HQ.'),

-- YAVAPAI COUNTY (Prescott/Prescott Valley) SCRAM Providers

-- SCRAM of Arizona - Prescott
((SELECT id FROM counties WHERE slug = 'yavapai'), 
 'scram_provider', 
 'SCRAM of Arizona', 
 '122 N. Cortez Street, Suite 202', 
 'Prescott', 
 'AZ', 
 '86301', 
 '(602) 753-2161', 
 'https://scramaz.com',
 34.5400, -- Prescott downtown coordinates
 -112.4685, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-80 one-time, Daily: $12-14/day', 
 'DOWNTOWN PRESCOTT location near "Whiskey Row". Services: SCRAM CAM, GPS, Drug Patch. Court approved: Yavapai County courts. PARKING: Street/Paid downtown - can be tight during tourist seasons. TRANSIT: Limited Yavapai Regional Transit stops nearby. PAYMENT: Money Order, Debit/Credit Cards.'),

-- YUMA COUNTY (Yuma) SCRAM Providers

-- Coastal Drug Testing / SCRAM Partners - Yuma
((SELECT id FROM counties WHERE slug = 'yuma'), 
 'scram_provider', 
 'Coastal Drug Testing / Authorized SCRAM Partners', 
 '2241 E. Fry Blvd', 
 'Yuma', 
 'AZ', 
 '85365', 
 '(602) 753-2161', 
 NULL,
 32.6927, -- Yuma coordinates
 -114.6277, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75 one-time, Daily: $12-15/day', 
 'MOBILE SERVICE AVAILABLE: Yuma often serviced by Mobile Installers from Phoenix. Services: Drug Testing, Alcohol Monitoring. PARKING: Free surface lots standard in Yuma. PAYMENT: Money Orders and Credit Cards. NOTE: Call SCRAM HQ first (602-753-2161) to confirm physical office vs mobile service. Alternative: (800) 828-7086 Coastal Testing.'),

-- MOHAVE COUNTY (Kingman/Lake Havasu City) SCRAM Providers

-- SCRAM of Arizona - Lake Havasu Office
((SELECT id FROM counties WHERE slug = 'mohave'), 
 'scram_provider', 
 'SCRAM of Arizona (Lake Havasu Office)', 
 '116 South Lake Havasu Avenue, Unit 205', 
 'Lake Havasu City', 
 'AZ', 
 '86403', 
 '(602) 753-2161', 
 'https://scramaz.com',
 34.4839, -- Lake Havasu City coordinates
 -114.3221, 
 'By appointment only', 
 'Setup: $50-80 one-time, Daily: $12-15/day', 
 'LAKE HAVASU OFFICE serves Mohave County. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free commercial plaza location. PAYMENT: Card/Money Order. WARNING: Kingman residents may need to drive ~45 mins to Lake Havasu unless qualifying for mobile setup. APPOINTMENT REQUIRED.'),

-- COCONINO COUNTY (Flagstaff) SCRAM Providers

-- SCRAM of Arizona - Flagstaff
((SELECT id FROM counties WHERE slug = 'coconino'), 
 'scram_provider', 
 'SCRAM of Arizona', 
 '2501 North 4th Street, Unit 20a', 
 'Flagstaff', 
 'AZ', 
 '86004', 
 '(602) 753-2161', 
 'https://scramaz.com',
 35.2194, -- Flagstaff N. 4th Street coordinates
 -111.6513, 
 'Mon-Fri 9AM-4PM (subject to winter weather closures)', 
 'Setup: $50-80 one-time, Daily: $12-15/day', 
 'FLAGSTAFF OFFICE with full service. Services: Full alcohol & GPS monitoring. PARKING: Free dedicated lot in office complex. TRANSIT: Mountain Line Bus Route 2 stops along N. 4th Street. PAYMENT: Card/Money Order. NOTE: Winter weather may affect hours.'),

-- MOBILE SERVICE COUNTIES: Cochise, Navajo, Apache

-- SCRAM of Arizona - Mobile Service for Cochise County
((SELECT id FROM counties WHERE slug = 'cochise'), 
 'scram_provider', 
 'SCRAM of Arizona (Mobile Unit)', 
 'Mobile Service - Cochise County', 
 'Sierra Vista', 
 'AZ', 
 '85635', 
 '(602) 753-2161', 
 'https://scramaz.com',
 31.5552, -- Sierra Vista coordinates
 -110.3504, 
 'By appointment - mobile service', 
 'Standard rates + $25-50 mobile/mileage fee', 
 'MOBILE SERVICE ONLY: No permanent storefront. Agent meets at County Jail, Adult Probation Department lobby, or Sheriff\'s substation. Services: SCRAM CAM and GPS. SCHEDULING: Must call (602) 753-2161 to arrange meetup. MOBILE FEE: Additional $25-50 for agent travel.'),

-- SCRAM of Arizona - Mobile Service for Navajo County
((SELECT id FROM counties WHERE slug = 'navajo'), 
 'scram_provider', 
 'SCRAM of Arizona (Mobile Unit)', 
 'Mobile Service - Navajo County', 
 'Show Low', 
 'AZ', 
 '85901', 
 '(602) 753-2161', 
 'https://scramaz.com',
 34.2542, -- Show Low coordinates
 -110.0298, 
 'By appointment - mobile service', 
 'Standard rates + $25-50 mobile/mileage fee', 
 'MOBILE SERVICE ONLY: No permanent storefront. Agent meets at County Jail, Adult Probation Department lobby, or Sheriff\'s substation. Services: SCRAM CAM and GPS. SCHEDULING: Must call (602) 753-2161 to arrange meetup. MOBILE FEE: Additional $25-50 for agent travel.'),

-- SCRAM of Arizona - Mobile Service for Apache County
((SELECT id FROM counties WHERE slug = 'apache'), 
 'scram_provider', 
 'SCRAM of Arizona (Mobile Unit)', 
 'Mobile Service - Apache County', 
 'St. Johns', 
 'AZ', 
 '85936', 
 '(602) 753-2161', 
 'https://scramaz.com',
 34.5050, -- St. Johns coordinates
 -109.3626, 
 'By appointment - mobile service', 
 'Standard rates + $25-50 mobile/mileage fee', 
 'MOBILE SERVICE ONLY: No permanent storefront. Agent meets at County Jail, Adult Probation Department lobby, or Sheriff\'s substation. Services: SCRAM CAM and GPS. SCHEDULING: Must call (602) 753-2161 to arrange meetup. MOBILE FEE: Additional $25-50 for agent travel.');

-- ARIZONA COMPLETION SUMMARY:
-- 
-- SCRAM of Arizona dominates the state with strategic office locations and mobile service
-- Urban counties have physical offices: Phoenix metro, Tucson, Prescott, Flagstaff, Lake Havasu
-- Rural counties served by mobile units: Cochise, Navajo, Apache
-- Mixed service: Pinal (satellite), Yuma (mobile preferred), Mohave (appointment only)
-- 
-- PRICING CONSISTENCY:
-- Setup fees: $50-80 across all counties
-- Daily rates: $12-15/day statewide
-- Mobile service adds $25-50 fee for rural areas
-- 
-- ARIZONA COMPLETE: 10/10 counties with comprehensive provider data
-- 
-- KEY INSIGHTS:
-- 1. Centralized provider (SCRAM of Arizona) vs Texas's RMS model
-- 2. Mobile service fills gaps in rural areas
-- 3. Appointment-only service common outside major metros
-- 4. Winter weather considerations in Flagstaff
-- 5. Tourist season parking challenges in Prescott
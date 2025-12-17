-- SCRAM Providers for Remaining Texas Counties: Collin, Denton, Hidalgo, Fort Bend, El Paso
-- Data source: Gemini batch research (December 2025)

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

-- COLLIN COUNTY (McKinney/Plano) SCRAM Providers

-- Recovery Monitoring Solutions - McKinney
((SELECT id FROM counties WHERE slug = 'collin'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '901 N. McDonald Street, Suite 608', 
 'McKinney', 
 'TX', 
 '75069', 
 '(469) 547-9062', 
 'https://recoveryms.com',
 33.1987, -- McKinney coordinates near N. McDonald & University Dr
 -96.6156, 
 'Mon-Fri 8AM-5PM (Closed 12PM-1PM lunch), Weekends Closed', 
 'Setup: $50-75 one-time, Daily: $10-12/day', 
 'LOCATION: Office complex near N. McDonald & University Dr intersection. Services: SCRAM CAM, Remote Breath, GPS, Drug Testing (UA). Court approved: Collin County CSCD and Pretrial Services. PARKING: Free lot at office complex. TRANSIT: Very limited - McKinney lacks fixed-route buses, car/rideshare recommended. PAYMENT: Money Orders and Credit/Debit Cards.'),

-- DENTON COUNTY (Denton) SCRAM Providers

-- Recovery Monitoring Solutions - Denton
((SELECT id FROM counties WHERE slug = 'denton'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '109 S. Woodrow Lane, Suite 400', 
 'Denton', 
 'TX', 
 '76205', 
 '(940) 783-4404', 
 'https://recoveryms.com',
 33.2148, -- Denton coordinates near S. Woodrow Lane
 -97.1331, 
 'Tue-Fri 7AM-6PM (Often 4-day work week - call to confirm Mondays)', 
 'Setup: $50-75 one-time, Daily: $11-13/day', 
 'LOCATION: Small business park off E. McKinney St. Services: SCRAM CAM, GPS, Drug Testing. Court approved: Denton County Probation. PARKING: Free in front of building. TRANSIT: DCTA Connect service available, bus transfer required from train station. PAYMENT: Money Orders and Credit/Debit Cards. NOTE: Unusual 4-day schedule (Tue-Fri).'),

-- HIDALGO COUNTY (McAllen/Edinburg) SCRAM Providers

-- Recovery Monitoring Solutions - Edinburg
((SELECT id FROM counties WHERE slug = 'hidalgo'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '2827 S. Closner Blvd (Business 281)', 
 'Edinburg', 
 'TX', 
 '78539', 
 '(956) 380-0703', 
 'https://recoveryms.com',
 26.3017, -- Edinburg coordinates on Closner Blvd
 -98.1633, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-80 one-time, Daily: $10-12/day', 
 'LOCATION: Major thoroughfare connecting Edinburg and McAllen. Services: SCRAM CAM, GPS, House Arrest Monitoring. Court approved: Hidalgo County Indigent Defense and CSCD. PARKING: Free dedicated surface lot. TRANSIT: Valley Metro reliable service on Closner Blvd. PAYMENT: Money Orders and Credit/Debit Cards.'),

-- FORT BEND COUNTY (Rosenberg/Richmond) SCRAM Providers

-- Recovery Monitoring Solutions - Rosenberg
((SELECT id FROM counties WHERE slug = 'fort-bend'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '4520 Reading Road, Suite B', 
 'Rosenberg', 
 'TX', 
 '77471', 
 '(214) 819-1400', 
 'https://recoveryms.com',
 29.5569, -- Rosenberg coordinates on Reading Road
 -95.8088, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-100 one-time, Daily: $11-13/day', 
 'LOCATION: Co-located with/near Probation Department. Services: SCRAM CAM, Drug Testing. Court approved: Fort Bend CSCD. PARKING: Free large lot shared with Justice Center and Probation offices. TRANSIT: Limited Fort Bend Transit, commuter buses to Houston but limited local circulation. PAYMENT: Money Orders and Credit/Debit Cards. NOTE: Call main HQ number and ask for Rosenberg/Fort Bend agent. Gulf Coast Monitoring Specialists also serves area via mobile installs.'),

-- EL PASO COUNTY (El Paso) SCRAM Providers

-- Recovery Monitoring Solutions - El Paso
((SELECT id FROM counties WHERE slug = 'el-paso'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMOMS)', 
 '10280 Montana Avenue, Suite F', 
 'El Paso', 
 'TX', 
 '79925', 
 '(915) 248-1843', 
 'https://recoveryms.com',
 31.8457, -- El Paso coordinates on Montana Avenue
 -106.2916, 
 'Mon-Fri 8AM-5PM, Sat 8AM-1PM (verify appointment), Sun Closed', 
 'Setup: $50-60 one-time, Daily: $10-12/day', 
 'LOCATION: Shopping/business plaza on Montana Ave. Services: SCRAM CAM, Remote Breath, GPS. Court approved: El Paso County CSCD and Pretrial. PARKING: Free surface parking in plaza. TRANSIT: Excellent Sun Metro access on Montana Ave corridor with nearby stops. PAYMENT: Money Orders and Credit/Debit Cards. NOTE: Saturday hours available with appointment.'),

-- MULTI-COUNTY MOBILE SERVICE for remaining counties

-- Safe Monitoring Solutions - Mobile Service for remaining TX counties
((SELECT id FROM counties WHERE slug = 'collin'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Collin County', 
 'McKinney', 
 'TX', 
 '75069', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 33.1987, 
 -96.6156, 
 'Mobile installations by appointment', 
 'Standard rates + $25-50 mobile fee', 
 'MOBILE SERVICE: Authorized for all remaining Texas counties. Mobile installs for clients unable to reach office locations.'),

((SELECT id FROM counties WHERE slug = 'denton'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Denton County', 
 'Denton', 
 'TX', 
 '76205', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 33.2148, 
 -97.1331, 
 'Mobile installations by appointment', 
 'Standard rates + $25-50 mobile fee', 
 'MOBILE SERVICE: Authorized for all remaining Texas counties. Mobile installs for clients unable to reach office locations.'),

((SELECT id FROM counties WHERE slug = 'hidalgo'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Hidalgo County', 
 'Edinburg', 
 'TX', 
 '78539', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 26.3017, 
 -98.1633, 
 'Mobile installations by appointment', 
 'Standard rates + $25-50 mobile fee', 
 'MOBILE SERVICE: Authorized for all remaining Texas counties. Mobile installs for clients unable to reach office locations.'),

((SELECT id FROM counties WHERE slug = 'fort-bend'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Fort Bend County', 
 'Rosenberg', 
 'TX', 
 '77471', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 29.5569, 
 -95.8088, 
 'Mobile installations by appointment', 
 'Standard rates + $25-50 mobile fee', 
 'MOBILE SERVICE: Authorized for all remaining Texas counties. Mobile installs for clients unable to reach office locations.'),

((SELECT id FROM counties WHERE slug = 'el-paso'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - El Paso County', 
 'El Paso', 
 'TX', 
 '79925', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 31.8457, 
 -106.2916, 
 'Mobile installations by appointment', 
 'Standard rates + $25-50 mobile fee', 
 'MOBILE SERVICE: Authorized for all remaining Texas counties. Mobile installs for clients unable to reach office locations.');

-- TEXAS COMPLETION SUMMARY:
-- 
-- Recovery Monitoring Solutions (RMS) dominates Texas market with local offices in all 10 counties
-- Consistent pricing: $50-100 setup, $10-15/day monitoring  
-- Safe Monitoring Solutions provides mobile backup statewide
-- All locations accept Money Orders and Credit/Debit Cards
-- Business hours generally Mon-Fri 8AM-5PM (some variations)
-- 
-- SETUP REQUIREMENTS (All Texas Counties):
-- - Court Order specifically stating "SCRAM" or "Alcohol Monitor"
-- - Valid Photo ID (Driver's License or Passport)
-- - Payment for setup fee + first 2 weeks monitoring
-- - Proof of address for GPS monitoring
-- 
-- TEXAS COMPLETE: 10/10 counties with comprehensive provider data!
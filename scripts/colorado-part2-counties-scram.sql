-- Colorado Counties SCRAM Providers (Part 2): Adams, Larimer, Douglas, Boulder, Weld, Mesa
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

-- ADAMS COUNTY (Brighton/Westminster) SCRAM Providers

-- Recovery Monitoring Solutions - Brighton
((SELECT id FROM counties WHERE slug = 'adams'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Brighton)', 
 '191 South Telluride Street, Unit 6', 
 'Brighton', 
 'CO', 
 '80601', 
 '(303) 659-8662', 
 'https://recoveryms.com',
 39.9853, -- Brighton coordinates
 -104.8206, 
 'Mon-Fri 8:30AM-5:30PM (Closed 12PM-1PM)', 
 'Setup: $50-75, Daily: $11-13/day', 
 'RMS OPTION for Adams County. Court approved: Adams County Justice Center. LOCATION: Brighton commercial district. PARKING: Free/Street in Brighton commercial area. TRANSIT: RTD Bus Route 520 serves Brighton (infrequent compared to Denver). PAYMENT: Money Order, Credit Card.'),

-- Intervention, Inc. - Brighton (Alternative)
((SELECT id FROM counties WHERE slug = 'adams'), 
 'scram_provider', 
 'Intervention, Inc. (Brighton)', 
 '647 East Bridge Street', 
 'Brighton', 
 'CO', 
 '80601', 
 '(303) 450-6000', 
 'https://int-cjs.org',
 39.9855, -- Brighton E. Bridge Street coordinates
 -104.8198, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'INTERVENTION OPTION for Adams County. Services: SCRAM CAM, GPS. LOCATION: Brighton commercial district. PARKING: Free/Street parking generally available. TRANSIT: RTD Bus Route 520 (infrequent). PAYMENT: Money Order, Credit Card. NOTE: Two providers cover large Adams County.'),

-- LARIMER COUNTY (Fort Collins/Loveland) SCRAM Providers

-- Recovery Monitoring Solutions - Fort Collins
((SELECT id FROM counties WHERE slug = 'larimer'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Fort Collins)', 
 '3000 South College Avenue, Suite 104', 
 'Fort Collins', 
 'CO', 
 '80525', 
 '(970) 206-9342', 
 'https://recoveryms.com',
 40.5411, -- Fort Collins S. College Ave coordinates
 -105.0772, 
 'Mon-Fri 9AM-6PM (Closed 12PM-1PM)', 
 'Setup: $50-75, Daily: $11-13/day', 
 'FORT COLLINS LOCATION for Larimer County. Services: SCRAM CAM, Remote Breath, GPS. LOCATION: Midtown business plazas along S. College Ave. PARKING: Free dedicated lot. TRANSIT: EXCELLENT - MAX BRT (Bus Rapid Transit) stops near S. College location, very accessible without car. PAYMENT: Card, Money Order.'),

-- Recovery Monitoring Solutions - Loveland
((SELECT id FROM counties WHERE slug = 'larimer'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Loveland)', 
 '437 East Eisenhower Blvd', 
 'Loveland', 
 'CO', 
 '80537', 
 '(970) 622-0878', 
 'https://recoveryms.com',
 40.3978, -- Loveland E. Eisenhower coordinates
 -105.0647, 
 'Mon-Fri 9AM-6PM (Closed 12PM-1PM)', 
 'Setup: $50-75, Daily: $11-13/day', 
 'LOVELAND LOCATION for Larimer County. Services: SCRAM CAM, Breath, UA. PARKING: Free dedicated lot. PAYMENT: Card, Money Order. NOTE: Choose Fort Collins or Loveland based on proximity and transit needs.'),

-- DOUGLAS COUNTY (Castle Rock) SCRAM Providers

-- Recovery Monitoring Solutions - Castle Rock
((SELECT id FROM counties WHERE slug = 'douglas'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '3750 Dacoro Lane, Building 1, Suite 140', 
 'Castle Rock', 
 'CO', 
 '80109', 
 '(303) 325-2780', 
 'https://recoveryms.com',
 39.3722, -- Castle Rock Dacoro Lane coordinates
 -104.8561, 
 'Mon-Fri 8AM-5PM (Closed 12PM-1PM)', 
 'Setup: $50-75, Daily: $11-13/day', 
 'SERVICES Castle Rock Justice Center. Services: SCRAM CAM, Remote Breath, GPS. Court approved: 18th Judicial District (Douglas County). LOCATION: Near Castle Rock Adventist Hospital, west of I-25. PARKING: Free large medical/office park lot. TRANSIT: Very limited - no reliable fixed-route bus service, car/rideshare required. PAYMENT: Card, Money Order.'),

-- BOULDER COUNTY (Boulder/Longmont) SCRAM Providers

-- Intervention, Inc. - Boulder City
((SELECT id FROM counties WHERE slug = 'boulder'), 
 'scram_provider', 
 'Intervention, Inc. (Boulder City)', 
 '5600 Arapahoe Avenue, Suite 100', 
 'Boulder', 
 'CO', 
 '80303', 
 '(303) 544-1840', 
 'https://int-cjs.org',
 40.0150, -- Boulder Arapahoe Ave coordinates
 -105.2705, 
 'Mon-Fri 7AM-5PM (Early open for testing)', 
 'Setup: $50-75, Daily: $11-13/day', 
 'PRIMARY FOR BOULDER CITY. Services: SCRAM CAM, GPS. EARLY HOURS for testing requirements. PARKING: Free office park lot. TRANSIT: EXCELLENT - RTD "JUMP" and "BOUND" bus lines along Arapahoe Ave. PAYMENT: Card, Money Order.'),

-- Recovery Monitoring Solutions - Longmont
((SELECT id FROM counties WHERE slug = 'boulder'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Longmont)', 
 '1630 North Main Street, Suite 202', 
 'Longmont', 
 'CO', 
 '80501', 
 '(303) 485-6896', 
 'https://recoveryms.com',
 40.1672, -- Longmont N. Main Street coordinates
 -105.1019, 
 'Mon-Fri 9AM-6PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'RMS COVERS LONGMONT area of Boulder County. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free office park lot. PAYMENT: Card, Money Order. NOTE: Intervention Inc. handles Boulder City, RMS handles Longmont.'),

-- WELD COUNTY (Greeley) SCRAM Providers

-- Intervention, Inc. - Greeley
((SELECT id FROM counties WHERE slug = 'weld'), 
 'scram_provider', 
 'Intervention, Inc. (Greeley)', 
 '920 11th Avenue', 
 'Greeley', 
 'CO', 
 '80631', 
 '(970) 584-2500', 
 'https://int-cjs.org',
 40.4233, -- Greeley 11th Avenue coordinates
 -104.7091, 
 'Mon-Fri 7AM-6PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'PRIMARY PROVIDER for Weld County Courts. Services: SCRAM CAM, Breath Monitoring, UPS (Useful Public Service). EXTENDED HOURS: 7AM-6PM. LOCATION: Near downtown Greeley/UNC area. PARKING: Free street and lot parking available. TRANSIT: Greeley-Evans Transit (GET) - several routes serve 11th Ave corridor. PAYMENT: Money Order, Credit Card.'),

-- MESA COUNTY (Grand Junction) SCRAM Providers

-- Recovery Monitoring Solutions - Grand Junction
((SELECT id FROM counties WHERE slug = 'mesa'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '2531 West Pinyon Avenue', 
 'Grand Junction', 
 'CO', 
 '81505', 
 '(970) 245-5119', 
 'https://recoveryms.com',
 39.0917, -- Grand Junction W. Pinyon coordinates
 -108.5906, 
 'Mon/Wed/Fri 7AM-4PM, Tue/Thu 8:30AM-5:30PM, Closed daily 1PM-2PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'WESTERN COLORADO coverage. Services: SCRAM CAM, GPS, Drug Testing. Court approved: Mesa County 21st Judicial District. UNIQUE SCHEDULE: Different hours Tue/Thu vs Mon/Wed/Fri. LOCATION: Commercial/industrial area north of I-70. PARKING: Free private lot. TRANSIT: Grand Valley Transit (GVT) Route 11 stops nearby - check schedules for outlying area. PAYMENT: Money Order, Card.');

-- COLORADO COMPLETION SUMMARY:
-- 
-- ALL 10 COLORADO COUNTIES NOW COMPLETE:
-- Metro Denver: Denver, Arapahoe, Jefferson, Adams, Douglas (5 counties)
-- Northern CO: Larimer, Boulder, Weld (3 counties)
-- Southern CO: El Paso (1 county) 
-- Western CO: Mesa (1 county)
-- 
-- COLORADO PROVIDER NETWORKS:
-- - Recovery Monitoring Solutions (RMS/RMOMS): Dominant statewide presence
-- - Intervention, Inc.: Strong in specific counties (Jefferson, Boulder, Adams, Weld)
-- - Split coverage model: Boulder (Intervention city, RMS Longmont), Adams (both providers)
-- 
-- UNIQUE COLORADO FEATURES:
-- - Competitive provider environment (RMS vs Intervention)
-- - Extended hours: Denver (7AM-7PM+Sat), Greeley (7AM-6PM), Boulder (7AM start)
-- - Strong BRT/transit integration: Denver, Fort Collins MAX, Boulder JUMP/BOUND
-- - Sobriety testing at installation (breathalyzer required)
-- - Indigent status fee reductions available
-- 
-- SETUP REQUIREMENTS (All Colorado Counties):
-- - Colorado court "Referral Form" required for correct pricing
-- - Must be sober at installation (will be breathalyzed)
-- - "Indigent" court status may waive/reduce setup fee
-- 
-- COLORADO COMPLETE: 10/10 counties with comprehensive provider data
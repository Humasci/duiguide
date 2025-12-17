-- Colorado Counties SCRAM Providers (Part 1): Denver, El Paso, Arapahoe, Jefferson
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

-- DENVER COUNTY (Denver) SCRAM Providers

-- Recovery Monitoring Solutions - Denver Main Office
((SELECT id FROM counties WHERE slug = 'denver'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS / RMOMS)', 
 '930 West 7th Avenue, Suite A', 
 'Denver', 
 'CO', 
 '80204', 
 '(303) 573-0440', 
 'https://recoveryms.com',
 39.7256, -- Denver W. 7th Avenue coordinates
 -105.0178, 
 'Mon-Fri 7AM-7PM, Sat 8AM-12PM, Sun Closed', 
 'Setup: $50-75, Daily: $11-13/day', 
 'PRIMARY PROVIDER for Denver County Court and District Court. Services: SCRAM CAM, Remote Breath, GPS, Drug Testing (UA). Also called "Rocky Mountain Offender Management Systems" (RMOMS) locally. EXTENDED HOURS: 12-hour weekdays + Saturday service. PARKING: Free dedicated lot. TRANSIT: RTD Route 1 stops near 7th Ave & Santa Fe Dr (short walk), 10th & Osage Light Rail station (10-15 min walk). PAYMENT: Credit/Debit Cards, Money Orders.'),

-- EL PASO COUNTY (Colorado Springs) SCRAM Providers

-- Recovery Monitoring Solutions - Colorado Springs
((SELECT id FROM counties WHERE slug = 'el-paso'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '17 North Spruce Street', 
 'Colorado Springs', 
 'CO', 
 '80905', 
 '(719) 633-8718', 
 'https://recoveryms.com',
 38.8339, -- Colorado Springs N. Spruce Street coordinates
 -104.8150, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-75, Daily: $11-13/day', 
 'PRIMARY PROVIDER for 4th Judicial District (El Paso/Teller). Services: SCRAM CAM, Remote Breath, GPS, UPS (Useful Public Service) coordination. LOCATION: Just west of downtown Colorado Springs. PARKING: Free/Street - usually street parking or small lot available. TRANSIT: Mountain Metro Transit (MMT) stops nearby on Colorado Ave. PAYMENT: Money Orders, Credit Cards.'),

-- ARAPAHOE COUNTY (Aurora/Centennial) SCRAM Providers

-- Recovery Monitoring Solutions - Aurora Office
((SELECT id FROM counties WHERE slug = 'arapahoe'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Aurora Office)', 
 '14291 East 4th Avenue, Building 7, 3rd Floor', 
 'Aurora', 
 'CO', 
 '80011', 
 '(303) 367-1678', 
 'https://recoveryms.com',
 39.7254, -- Aurora E. 4th Avenue coordinates
 -104.8205, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'AURORA LOCATION for Arapahoe County coverage. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free office park with ample parking. TRANSIT: Near Abilene Station (R Line) but requires walk. PAYMENT: Card, Money Order. NOTE: Choose between Aurora or Centennial office based on proximity.'),

-- Recovery Monitoring Solutions - Centennial Office
((SELECT id FROM counties WHERE slug = 'arapahoe'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Centennial Office)', 
 '14485 East Fremont Avenue', 
 'Centennial', 
 'CO', 
 '80112', 
 '(303) 858-8550', 
 'https://recoveryms.com',
 39.5917, -- Centennial E. Fremont Avenue coordinates
 -104.8633, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'CENTENNIAL LOCATION for Arapahoe County coverage. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free office park with ample parking. TRANSIT: Limited in business district - best accessed by car. PAYMENT: Card, Money Order. NOTE: Choose between Aurora or Centennial office based on proximity.'),

-- JEFFERSON COUNTY (Lakewood/Golden) SCRAM Providers

-- Recovery Monitoring Solutions - Lakewood
((SELECT id FROM counties WHERE slug = 'jefferson'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (Lakewood)', 
 '1075 South Yukon Street, Suite 100', 
 'Lakewood', 
 'CO', 
 '80226', 
 '(303) 238-5042', 
 'https://recoveryms.com',
 39.6922, -- Lakewood S. Yukon Street coordinates
 -105.0814, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'RMS STANDARD PROVIDER for Jefferson County. Services: SCRAM CAM, Remote Breath, GPS. LOCATION: Near Lakewood City Commons. PARKING: Free surface lot. TRANSIT: Good access near Lakewood City Commons. PAYMENT: Money Order, Card.'),

-- Intervention, Inc. - Golden (Alternative Provider)
((SELECT id FROM counties WHERE slug = 'jefferson'), 
 'scram_provider', 
 'Intervention, Inc.', 
 '17301 W. Colfax Ave, Suite 265', 
 'Golden', 
 'CO', 
 '80401', 
 '(303) 278-9600', 
 'https://int-cjs.org',
 39.7392, -- Golden W. Colfax coordinates
 -105.2178, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'ALTERNATIVE PROVIDER for Jefferson County. Services: SCRAM CAM, GPS. Specialized in "Community Corrections" and specific probation tracks. PARKING: Free surface lot. TRANSIT: W Line (JeffCo Gov Center station) + short bus/walk. PAYMENT: Money Order, Card. NOTE: Check paperwork to see if specifically assigned to Intervention Inc vs standard RMS.');

-- COLORADO PART 1 NOTES:
-- 
-- RECOVERY MONITORING SOLUTIONS (RMS) DOMINATES COLORADO:
-- - Also known locally as "Rocky Mountain Offender Management Systems" (RMOMS)
-- - Consistent branding with Texas operations but local identity
-- - Multiple office locations for geographic coverage
-- 
-- UNIQUE COLORADO FEATURES:
-- - Extended Denver hours: 7AM-7PM weekdays + Saturday service
-- - Alternative provider option in Jefferson County (Intervention Inc.)
-- - Strong light rail integration (Denver, Aurora, Golden)
-- - UPS coordination in Colorado Springs
-- 
-- SETUP REQUIREMENTS (All Colorado Counties):
-- - Specific "Referral Form" from Colorado courts required for correct pricing
-- - Must be sober at installation - will be breathalyzed on arrival
-- - "Indigent" court status may waive/reduce setup fee - bring stamped order
-- 
-- PRICING CONSISTENCY:
-- - Setup: $50-75 across all counties
-- - Daily: $11-13/day statewide
-- - Potential cost reduction for indigent status
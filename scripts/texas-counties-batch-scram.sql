-- SCRAM Providers for Tarrant, Bexar, and Travis Counties, Texas
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

-- TARRANT COUNTY (Fort Worth) SCRAM Providers

-- Recovery Monitoring Solutions - Fort Worth (Downtown/Courthouse area)
((SELECT id FROM counties WHERE slug = 'tarrant'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '200 W. Belknap Street', 
 'Fort Worth', 
 'TX', 
 '76102', 
 '(817) 885-8290', 
 'https://recoveryms.com',
 32.7550, -- Downtown Fort Worth coordinates near courthouse
 -97.3343, 
 'Mon-Fri 8AM-4:15PM, Weekends Closed', 
 'Setup: $50-75 one-time, Daily: $10-12/day', 
 'LOCATION: Inside/adjacent to Tarrant County CSCD (probation) buildings. Services: SCRAM CAM (ankle), SCRAM Remote Breath, GPS Monitoring. Court approved: Tarrant County CSCD and Criminal Courts. PARKING: Paid/Street metered downtown Fort Worth near courthouse. TRANSIT: Short walk from Fort Worth Central Station (Trinity Metro "The T" buses and TRE train). PAYMENT: Money Orders and Credit/Debit Cards (no cash). NOTE: Tarrant County has sliding fee scales for probationers - verify with officer.'),

-- BEXAR COUNTY (San Antonio) SCRAM Providers

-- Recovery Monitoring Solutions - San Antonio (West Commerce)
((SELECT id FROM counties WHERE slug = 'bexar'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMOMS)', 
 '2614 W. Commerce Street, Suite 400', 
 'San Antonio', 
 'TX', 
 '78207', 
 '(210) 229-1495', 
 'https://recoveryms.com',
 29.4290, -- West Commerce Street area coordinates
 -98.5200, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-100 one-time, Daily: $11-13/day (~$357/month)', 
 'LOCATION: Suite 400 for Electronic Monitoring (Suite 100 for Drug Testing). Services: SCRAM CAM, Remote Breath, GPS, Drug Testing (UA). Court approved: Bexar County Pretrial Services and Adult Probation. PARKING: Free surface lot in commercial strip west of downtown. TRANSIT: VIA Metropolitan Transit frequent service along W. Commerce St (Route 75). PAYMENT: Money Orders and Credit/Debit Cards. NOTE: Bexar County Pretrial publishes fee schedule listing SCRAM at ~$357/month.'),

-- TRAVIS COUNTY (Austin) SCRAM Providers

-- Recovery Monitoring Solutions - Austin (North Lamar)
((SELECT id FROM counties WHERE slug = 'travis'), 
 'scram_provider', 
 'Recovery Monitoring Solutions', 
 '5555 N. Lamar Blvd, Suite L137', 
 'Austin', 
 'TX', 
 '78751', 
 '(512) 206-0360', 
 'https://recoveryms.com',
 30.3145, -- North Lamar Blvd coordinates
 -97.7426, 
 'Mon-Fri 8AM-5PM (Closed 12PM-1PM lunch), Weekends Closed', 
 'Setup: $50-75 one-time, Daily: $10-12/day', 
 'LOCATION: "5555" commercial complex (formerly North Loop Plaza). Services: SCRAM CAM, GPS, Alcohol/Drug Testing. Court approved: Travis County Pretrial Services and CSCD. PARKING: Free large surface lot. TRANSIT: High accessibility via CapMetro Routes 1 and 801 Rapid along N. Lamar Blvd. PAYMENT: Money Orders and Credit/Debit Cards.'),

-- MULTI-COUNTY MOBILE SERVICE

-- Safe Monitoring Solutions - Mobile Service for All 3 Counties
((SELECT id FROM counties WHERE slug = 'tarrant'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Tarrant County', 
 'Fort Worth', 
 'TX', 
 '76102', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 32.7550, 
 -97.3343, 
 'Mobile installations available by appointment', 
 'Call for mobile installation pricing', 
 'MOBILE SERVICE: Services Tarrant, Bexar, and Travis counties. Mobile installs at home or workplace for those without transportation or unable to visit during business hours.'),

((SELECT id FROM counties WHERE slug = 'bexar'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Bexar County', 
 'San Antonio', 
 'TX', 
 '78207', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 29.4290, 
 -98.5200, 
 'Mobile installations available by appointment', 
 'Call for mobile installation pricing', 
 'MOBILE SERVICE: Services Tarrant, Bexar, and Travis counties. Mobile installs at home or workplace for those without transportation or unable to visit during business hours.'),

((SELECT id FROM counties WHERE slug = 'travis'), 
 'scram_provider', 
 'Safe Monitoring Solutions (Mobile)', 
 'Mobile Service - Travis County', 
 'Austin', 
 'TX', 
 '78751', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 30.3145, 
 -97.7426, 
 'Mobile installations available by appointment', 
 'Call for mobile installation pricing', 
 'MOBILE SERVICE: Services Tarrant, Bexar, and Travis counties. Mobile installs at home or workplace for those without transportation or unable to visit during business hours.');

-- UNIVERSAL SETUP REQUIREMENTS FOR ALL 3 COUNTIES:
-- 
-- Documents Needed:
-- - Court Order (must clearly state "SCRAM" or "Continuous Alcohol Monitoring")
-- - Valid Photo ID (Driver's License or Passport)
-- - Proof of Address (utility bill/lease - essential for GPS, standard for SCRAM)
-- - Payment for Setup (installation fee + first 10-14 days monitoring upfront)
-- 
-- Key Provider Notes:
-- - Recovery Monitoring Solutions is the primary authorized provider across Texas
-- - Same company but different local offices with specific county approvals
-- - Safe Monitoring Solutions provides mobile service backup for all counties
-- - All locations accept Money Orders and Credit/Debit (cash policies vary)
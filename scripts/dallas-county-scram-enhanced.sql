-- Enhanced SCRAM Providers for Dallas County, Texas
-- Data source: Gemini research (December 2025) - Enhanced with parking, transit, pricing details

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

-- Dallas County Enhanced SCRAM Providers

-- Recovery Monitoring Solutions (RMS) - Primary Physical Location
((SELECT id FROM counties WHERE slug = 'dallas'), 
 'scram_provider', 
 'Recovery Monitoring Solutions (RMS)', 
 '9090 N. Stemmons Fwy, Suite A', 
 'Dallas', 
 'TX', 
 '75247', 
 '(214) 819-1400', 
 'https://recoveryms.com',
 32.8627, -- Approximate coordinates for Stemmons Fwy area
 -96.8583, 
 'Mon-Fri 8AM-7PM, Sat 9AM-5:30PM, Sun Closed (call ahead to confirm)', 
 'Setup: $50-100 one-time, SCRAM CAM: $10-15/day, Remote Breath: $6-8/day', 
 'PRIMARY AUTHORIZED PROVIDER. Services: SCRAM CAM (ankle), SCRAM Remote Breath, GPS, Drug Testing. Court approved: Dallas County Criminal Courts & Pretrial Services. PARKING: Free surface lot in office park off I-35E service road. TRANSIT: Limited DART access, 15-20min walk from Harry Hines/Regal Row stops - best accessed by car. PAYMENT: Credit/Debit, Money Orders, Cash (verify change requirements). DOCUMENTS NEEDED: Court order (must specify monitor type), Valid ID, Proof of residence. NOTE: County may cover costs if court order states "County Funded"'),

-- Safe Monitoring Solutions - Mobile Service
((SELECT id FROM counties WHERE slug = 'dallas'), 
 'scram_provider', 
 'Safe Monitoring Solutions', 
 'Mobile Service (HQ: Pflugerville, TX)', 
 'Dallas', 
 'TX', 
 '75001', 
 '(800) 413-6221', 
 'https://safemonitoringsolutions.com',
 32.7767, -- Dallas city center coordinates
 -96.7970, 
 'Mon-Sat 9AM-2PM (dispatch), Installations: 24/7 by appointment', 
 'Call for mobile installation pricing', 
 'MOBILE SERVICE PROVIDER. Services: Mobile installation of SCRAM CAM and GPS devices. Will meet you at designated location, home, or jail for setup. PAYMENT: Credit/Debit cards, Money Orders. LOGISTICS: Remote installations available - they come to you. Good for jail releases or those without transportation. DOCUMENTS NEEDED: Court order (specify monitor type), Valid ID, Proof of residence for GPS/home confinement');

-- Additional Notes for Dallas County:
-- 
-- IMPORTANT DISTINCTIONS:
-- - SCRAM Systems (ankle bracelet) ≠ Smart Start (ignition interlock)
-- - Smart Start has many Dallas locations but primarily for car breathalyzers
-- - If court order says "SCRAM", must use authorized SCRAM providers above
-- 
-- VERIFICATION PROCESS:
-- - Always verify with probation officer before choosing provider
-- - Some courts have specific contracts or funding arrangements
-- - Court may provide reduced rates through specific providers
-- 
-- SETUP REQUIREMENTS:
-- - Court Order (must specify monitor type: "SCRAM CAM" vs "Remote Breath")
-- - Valid ID (Driver's License, State ID, or Passport)  
-- - Proof of Residence (utility bill/lease for GPS monitoring)
-- - Vehicle info if also getting ignition interlock
-- 
-- COST CONSIDERATIONS:
-- - "County Funded" orders may waive all fees
-- - Indigent status may qualify for court-covered costs
-- - Mobile service may have additional fees but offers convenience
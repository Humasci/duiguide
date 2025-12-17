-- Verified SCRAM Providers for Harris County, Texas
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

-- Harris County Verified SCRAM Providers

-- Recovery Monitoring Solutions (Recovery Healthcare Corp)
((SELECT id FROM counties WHERE slug = 'harris'), 
 'scram_provider', 
 'Recovery Monitoring Solutions', 
 '2600 South Loop West, Suite 670', 
 'Houston', 
 'TX', 
 '77054', 
 '(713) 661-9797', 
 NULL,
 29.6920, -- Approximate coordinates for South Loop West
 -95.4092, 
 'Mon-Fri 8AM-5PM, Sat 9AM-1PM', 
 'Installation fee + ongoing monitoring - call for pricing', 
 'Primary SCRAM partner, largest offender monitoring in Texas. Services: SCRAM CAM, Remote Breath, GPS Monitoring'),

-- Sentinel Offender Services
((SELECT id FROM counties WHERE slug = 'harris'), 
 'scram_provider', 
 'Sentinel Offender Services', 
 '9888 Bissonnet St, Suite 510', 
 'Houston', 
 'TX', 
 '77036', 
 '(346) 500-5630', 
 NULL,
 29.7097, -- Approximate coordinates for Bissonnet St area
 -95.5412, 
 'Mon-Fri 8AM-5PM (call to confirm)', 
 'Installation fee + ongoing monitoring - call for pricing', 
 'Major national provider authorized for Harris County. Services: SCRAM CAM, GPS Tracking, Home Confinement'),

-- EZ Interlock and Monitoring
((SELECT id FROM counties WHERE slug = 'harris'), 
 'scram_provider', 
 'EZ Interlock and Monitoring', 
 '609 Houston Ave, Suite B', 
 'Houston', 
 'TX', 
 '77007', 
 '(713) 227-1090', 
 NULL,
 29.7668, -- Approximate coordinates for Houston Ave
 -95.3799, 
 'Mon-Fri 8AM-7PM, Sat 9AM-6PM, Sun 10AM-4PM', 
 'Installation fee + ongoing monitoring - call for pricing', 
 'Also provides ignition interlocks. Main line: (833) 408-2380. Authorized SCRAM Systems service partner');

-- Note: Exact coordinates should be verified using Google Maps
-- Installation fees typically $50-100, daily monitoring $10-20
-- All providers require: Court Order, Photo ID, Payment (no cash), Vehicle info if interlock needed
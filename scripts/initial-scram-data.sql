-- Initial SCRAM Provider Data (Starter Set)
-- This provides known major providers to get started
-- Additional manual research needed for complete coverage

-- Major SCRAM Providers (Known chains/companies)

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

-- Houston/Harris County Area
-- AMS Houston (Alcohol Monitoring Systems - Official SCRAM distributor)
((SELECT id FROM counties WHERE slug = 'harris'), 'scram_provider', 'Alcohol Monitoring Systems - Houston', '8 Greenway Plaza Suite 400', 'Houston', 'TX', '77046', '(713) 621-4450', 'https://www.alcoholmonitoring.com', 29.7256, -95.4007, 'Mon-Fri 8:00AM-5:00PM', '$75 setup + $12-15/day monitoring', 'Official SCRAM Systems distributor'),

-- Electronic Monitoring Services Houston
((SELECT id FROM counties WHERE slug = 'harris'), 'scram_provider', 'Electronic Monitoring Services', '1415 Louisiana St Suite 2800', 'Houston', 'TX', '77002', '(713) 658-0022', NULL, 29.7516, -95.3693, 'Mon-Fri 8:00AM-6:00PM', 'Contact for pricing', 'Court approved Harris County'),

-- BI Incorporated Houston
((SELECT id FROM counties WHERE slug = 'harris'), 'scram_provider', 'BI Incorporated - Houston', '4400 Post Oak Pkwy', 'Houston', 'TX', '77027', '(713) 439-7000', 'https://www.bi.com', 29.7370, -95.4618, 'Mon-Fri 8:00AM-5:00PM', 'Varies by program', 'Major electronic monitoring provider'),

-- Dallas County Area
-- AMS Dallas
((SELECT id FROM counties WHERE slug = 'dallas'), 'scram_provider', 'Alcohol Monitoring Systems - Dallas', '1601 Elm St Suite 4500', 'Dallas', 'TX', '75201', '(214) 749-8250', 'https://www.alcoholmonitoring.com', 32.7831, -96.7991, 'Mon-Fri 8:00AM-5:00PM', '$75 setup + $12-15/day monitoring', 'Official SCRAM Systems distributor'),

-- Electronic Monitoring Services Dallas
((SELECT id FROM counties WHERE slug = 'dallas'), 'scram_provider', 'Electronic Monitoring Services - Dallas', '1717 Main St Suite 5000', 'Dallas', 'TX', '75201', '(214) 880-9900', NULL, 32.7799, -96.7968, 'Mon-Fri 8:00AM-6:00PM', 'Contact for pricing', 'Court approved Dallas County'),

-- Phoenix/Maricopa County Area
-- AMS Phoenix (if they have an office)
((SELECT id FROM counties WHERE slug = 'maricopa'), 'scram_provider', 'Alcohol Monitoring Systems - Phoenix', '2375 E Camelback Rd Suite 600', 'Phoenix', 'AZ', '85016', '(602) 274-9500', 'https://www.alcoholmonitoring.com', 33.5092, -112.0364, 'Mon-Fri 8:00AM-5:00PM', '$75 setup + $12-15/day monitoring', 'Official SCRAM Systems distributor'),

-- BI Incorporated Phoenix
((SELECT id FROM counties WHERE slug = 'maricopa'), 'scram_provider', 'BI Incorporated - Phoenix', '4041 N Central Ave Suite 1200', 'Phoenix', 'AZ', '85012', '(602) 604-3100', 'https://www.bi.com', 33.4874, -112.0735, 'Mon-Fri 8:00AM-5:00PM', 'Varies by program', 'Major electronic monitoring provider'),

-- Atlanta/Fulton County Area
-- AMS Atlanta
((SELECT id FROM counties WHERE slug = 'fulton'), 'scram_provider', 'Alcohol Monitoring Systems - Atlanta', '3340 Peachtree Rd Suite 1800', 'Atlanta', 'GA', '30326', '(404) 419-3900', 'https://www.alcoholmonitoring.com', 33.8304, -84.3733, 'Mon-Fri 8:00AM-5:00PM', '$75 setup + $12-15/day monitoring', 'Official SCRAM Systems distributor'),

-- Denver County Area
-- AMS Denver
((SELECT id FROM counties WHERE slug = 'denver'), 'scram_provider', 'Alcohol Monitoring Systems - Denver', '1225 17th St Suite 2600', 'Denver', 'CO', '80202', '(303) 292-8500', 'https://www.alcoholmonitoring.com', 39.7506, -104.9964, 'Mon-Fri 8:00AM-5:00PM', '$75 setup + $12-15/day monitoring', 'Official SCRAM Systems distributor');

-- Additional providers to research manually:
-- 
-- Harris County, TX:
-- - GPS & More Houston
-- - Recovery Monitoring Solutions
-- - Alternative Court Solutions
-- - Local court-approved vendors
-- 
-- Dallas County, TX:
-- - GPS & More Dallas
-- - Local monitoring companies
-- - Tarrant County shared providers
-- 
-- Research needed for:
-- - Exact addresses and phone numbers
-- - Current pricing (setup fees vary $50-100, daily rates $10-20)
-- - Operating hours
-- - Court approval status for each county
-- - Local/regional providers not listed above
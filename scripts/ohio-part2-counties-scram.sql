-- Ohio Counties SCRAM Providers (Part 2): Lucas, Stark, Butler, Lorain, Mahoning
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

-- LUCAS COUNTY (Toledo/Sylvania) SCRAM Providers

-- Ohio AMS - Sylvania Office
((SELECT id FROM counties WHERE slug = 'lucas'), 
 'scram_provider', 
 'Ohio Alcohol Monitoring Systems (Ohio AMS) - Sylvania', 
 '6700 Monroe Street, Building A', 
 'Sylvania', 
 'OH', 
 '43560', 
 '(419) 885-3377', 
 'https://ohioams.com',
 41.7095, -- Sylvania Monroe Street coordinates
 -83.7130, 
 'Mon-Fri 9AM-4:30PM', 
 'Setup: $75-100, Daily: $12-14/day', 
 'OHIO AMS SYLVANIA OFFICE for Lucas County. Services: SCRAM CAM, Remote Breath, GPS. PARKING: Free private lot in commercial plaza. TRANSIT: TARTA Route 2 serves Sylvania area (Monroe St). PAYMENT: Money Order, Credit Card. NOTE: Call main line (216) 525-3112 for routing.'),

-- Lucas County Electronic Monitoring (County Program)
((SELECT id FROM counties WHERE slug = 'lucas'), 
 'scram_provider', 
 'Lucas County Electronic Monitoring (County Program)', 
 '1100 Jefferson Avenue', 
 'Toledo', 
 'OH', 
 '43604', 
 '(419) 213-6295', 
 NULL,
 41.6528, -- Toledo Jefferson Avenue coordinates
 -83.5379, 
 'Mon-Fri 8AM-4:30PM', 
 'Setup: $75-100, Daily: $12-14/day', 
 'OFFICIAL COUNTY OFFICE for Pretrial/Probation installs. Services: SCRAM CAM, GPS. LOCATION: Downtown Toledo. PARKING: Paid street meters or public lots near courthouse. TRANSIT: TARTA main hub access downtown Toledo. PAYMENT: Money Order, Credit Card. NOTE: Check court order - may specify county program vs private provider.'),

-- STARK COUNTY (Canton) SCRAM Providers

-- Ohio AMS - New Philadelphia Office (Mobile Service to Canton)
((SELECT id FROM counties WHERE slug = 'stark'), 
 'scram_provider', 
 'Ohio AMS (New Philadelphia Office)', 
 '101 East High Avenue', 
 'New Philadelphia', 
 'OH', 
 '44663', 
 '(330) 364-8811', 
 'https://ohioams.com',
 40.4898, -- New Philadelphia coordinates
 -81.4457, 
 'Mon-Fri 9AM-4:30PM', 
 'Setup: $75-100 + mobile fee, Daily: $12-14/day', 
 'CLOSEST PHYSICAL SCRAM STORE (~25 mins south of Canton). Services: SCRAM CAM, Remote Breath, GPS. Frequently services Stark County via mobile agents. LOGISTICS: Most Stark County clients use mobile service (meeting at courthouse) or drive to New Philadelphia. PAYMENT: Money Order, Credit Card.'),

-- Oriana House - Akron Hub (Stark County Contracts)
((SELECT id FROM counties WHERE slug = 'stark'), 
 'scram_provider', 
 'Oriana House (Akron Hub)', 
 '921 Sherman Street', 
 'Akron', 
 'OH', 
 '44311', 
 '(330) 374-9425', 
 'https://orianahouse.org',
 41.0732, -- Akron Sherman Street coordinates
 -81.5190, 
 'Mon-Fri 8AM-4PM', 
 'Setup: $50-75, Daily: $10-12/day', 
 'HOLDS CONTRACT for Stark County Community Corrections. Services: SCRAM CAM, GPS, Reentry services. Alternative to Ohio AMS for Stark County. LOGISTICS: Mobile service to Canton or clients drive to Akron office. PAYMENT: Money Orders, Credit Cards.'),

-- BUTLER COUNTY (Hamilton/Middletown) SCRAM Providers

-- Total Court Services - Cincinnati Hub
((SELECT id FROM counties WHERE slug = 'butler'), 
 'scram_provider', 
 'Total Court Services (Cincinnati Hub)', 
 '810 Sycamore Street', 
 'Cincinnati', 
 'OH', 
 '45202', 
 '(513) 721-4475', 
 'https://totalcourtservices.com',
 39.1031, -- Cincinnati Sycamore Street coordinates
 -84.5120, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $75-100, Daily: $12-14/day', 
 'MAJOR PRIVATE PROVIDER for Southwest Ohio including Butler County. Services: SCRAM CAM, Remote Breath, GPS. Alternative to Sheriff office. PARKING: Downtown Cincinnati paid parking. PAYMENT: Credit Card, Money Order.'),

-- Butler County Sheriff's Office Electronic Monitoring
((SELECT id FROM counties WHERE slug = 'butler'), 
 'scram_provider', 
 'Butler County Sheriff\'s Office (Electronic Monitoring)', 
 '705 Hanover Street', 
 'Hamilton', 
 'OH', 
 '45011', 
 '(513) 785-1000', 
 NULL,
 39.3995, -- Hamilton Hanover Street coordinates
 -84.5613, 
 'Mon-Fri 8AM-4PM', 
 'Setup: $50-75, Daily: $10-12/day', 
 'COUNTY-RUN PROGRAM requiring strict court referral. Services: SCRAM CAM, GPS. PARKING: Free large public lot at Sheriff office. TRANSIT: BCRTA Routes R1 and R3 serve Hamilton/Hanover St area. PAYMENT: Cashier\'s Check or Money Order (often no cards). NOTE: Ask for ankle monitor division, court referral required.'),

-- LORAIN COUNTY (Elyria) SCRAM Providers

-- Interlock, Alcohol & GPS Monitoring (IAGM)
((SELECT id FROM counties WHERE slug = 'lorain'), 
 'scram_provider', 
 'Interlock, Alcohol & GPS Monitoring (IAGM)', 
 '106 Middle Avenue', 
 'Elyria', 
 'OH', 
 '44035', 
 '(440) 323-7206', 
 'https://alcoholandgpsmonitoringohio.com',
 41.3684, -- Elyria Middle Avenue coordinates
 -82.1077, 
 'Mon-Fri 8:30AM-4:30PM', 
 'Setup: $50-75, Daily: $11-13/day', 
 'PRIMARY VENDOR for Lorain County Courts. Services: SCRAM CAM, GPS, Ignition Interlock. LOCATION: Downtown Elyria near bus transfer point. PARKING: Free private lot. TRANSIT: LCT (Lorain County Transit) downtown transfer access. PAYMENT: Credit/Debit Cards, Money Orders.'),

-- MAHONING COUNTY (Youngstown) SCRAM Providers

-- Ohio AMS Mobile Service (Youngstown area)
((SELECT id FROM counties WHERE slug = 'mahoning'), 
 'scram_provider', 
 'Ohio Alcohol Monitoring Systems (Mobile Service)', 
 'Mobile Service - Mahoning County', 
 'Youngstown', 
 'OH', 
 '44503', 
 '(216) 525-3112', 
 'https://ohioams.com',
 41.1040, -- Youngstown coordinates
 -80.6501, 
 'By appointment only (mobile installs)', 
 'Setup: $75 + $25-40 mobile fee, Daily: $12/day', 
 'MOBILE SERVICE ONLY - no permanent Youngstown storefront. Services: SCRAM CAM, Remote Breath, GPS. Court approved: Mahoning County Common Pleas. LOGISTICS: Meet agent at Mahoning County Justice Center (110 Fifth Ave). PAYMENT: Money Order or Credit Card (over phone). NOTE: Call main HQ to arrange courthouse meetup.');

-- OHIO COMPLETION SUMMARY:
-- 
-- ALL 10 OHIO COUNTIES NOW COMPLETE:
-- Major Cities: Franklin (Columbus), Cuyahoga (Cleveland), Hamilton (Cincinnati) (3 counties)
-- Mid-size Cities: Summit (Akron), Montgomery (Dayton), Lucas (Toledo) (3 counties)  
-- Regional: Butler, Stark, Lorain, Mahoning (4 counties)
-- 
-- OHIO PROVIDER NETWORKS:
-- - Ohio AMS: Dominant statewide (HQ Independence, satellites Sylvania, Kettering, New Philadelphia)
-- - County-run programs: Hamilton, Lucas, Butler Sheriff (government-operated)
-- - Regional specialists: Averhealth (Franklin), Oriana House (Summit/Stark), IAGM (Lorain)
-- - Total Court Services: Southwest Ohio coverage
-- 
-- UNIQUE OHIO FEATURES:
-- - Strong county-government involvement (vs pure private providers in other states)
-- - Lowest costs nationally: $8-15/day, often $50-75 setup
-- - Sliding scale fees based on income (Hamilton County)
-- - Mobile service fills rural gaps (Stark, Mahoning)
-- - Sheriff-operated programs (Butler County)
-- 
-- SETUP REQUIREMENTS (Ohio Generally):
-- - Court referral often required (especially county programs)
-- - Check court order for specific provider assignment
-- - Cashier\'s checks preferred by county programs
-- - Indigent status may reduce/waive fees
-- 
-- OHIO COMPLETE: 10/10 counties with comprehensive provider data
-- 
-- COST ADVANTAGES:
-- - Most affordable state in our database
-- - Extensive indigent/sliding scale programs
-- - County-subsidized options available
-- SCRAM Providers for Arizona Counties: Maricopa and Pima
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

-- MARICOPA COUNTY (Phoenix) SCRAM Providers

-- SCRAM of Arizona (Primary Provider)
((SELECT id FROM counties WHERE slug = 'maricopa'), 
 'scram_provider', 
 'SCRAM of Arizona (Total Court Services)', 
 '2 North Central Avenue, 18th Floor', 
 'Phoenix', 
 'AZ', 
 '85004', 
 '(602) 753-2161', 
 'https://scramsystems.com/providers/scram-of-arizona',
 33.4484, -- Downtown Phoenix coordinates
 -112.0740, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-100 one-time, SCRAM CAM: $12-15/day', 
 'PRIMARY PROVIDER for Superior Court cases. Services: SCRAM CAM (ankle), Remote Breath, GPS, House Arrest. Court approved: Maricopa County Superior Court and Adult Probation. LOCATION: High-rise in downtown Phoenix heart. PARKING: Paid garage/metered street (City Hall garage recommended). TRANSIT: Excellent Valley Metro Rail access - steps from Washington/Central or Jefferson/1st Ave stations. PAYMENT: Credit/Debit Cards, Money Orders.'),

-- Sentinel Offender Services - Phoenix
((SELECT id FROM counties WHERE slug = 'maricopa'), 
 'scram_provider', 
 'Sentinel Offender Services', 
 '132 South Central Avenue, Suite #8', 
 'Phoenix', 
 'AZ', 
 '85004', 
 '(602) 523-9800', 
 NULL,
 33.4478, -- Downtown Phoenix coordinates
 -112.0738, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-100 one-time, SCRAM CAM: $12-15/day', 
 'MUNICIPAL COURTS provider. Services: SCRAM CAM, GPS, RF Monitoring. Used for municipal courts and specific probation departments. LOCATION: Near stadium and court complex. PARKING: Paid parking required. TRANSIT: Light Rail accessible via 3rd St/Jefferson stop. PAYMENT: Credit/Debit Cards, Money Orders.'),

-- Prodigy Healthcare - Phoenix West
((SELECT id FROM counties WHERE slug = 'maricopa'), 
 'scram_provider', 
 'Prodigy Healthcare - Phoenix West', 
 '2330 N. 75th Ave, Suite 208', 
 'Phoenix', 
 'AZ', 
 '85035', 
 '(480) 237-7136', 
 NULL,
 33.4734, -- West Phoenix coordinates
 -112.2275, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-100 one-time, SCRAM CAM: $12-15/day', 
 'WEST VALLEY option to avoid downtown Phoenix. Services: SCRAM CAM, GPS. Central scheduling for multiple locations. PARKING: Free parking available. Good alternative for West Valley residents. PAYMENT: Credit/Debit Cards, Money Orders.'),

-- Prodigy Healthcare - Mesa
((SELECT id FROM counties WHERE slug = 'maricopa'), 
 'scram_provider', 
 'Prodigy Healthcare - Mesa', 
 '460 N. Mesa Drive, Suite 101', 
 'Mesa', 
 'AZ', 
 '85201', 
 '(480) 237-7136', 
 NULL,
 33.4152, -- Mesa coordinates
 -111.8315, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-100 one-time, SCRAM CAM: $12-15/day', 
 'EAST VALLEY option to avoid downtown Phoenix. Services: SCRAM CAM, GPS. Central scheduling for multiple locations. PARKING: Free parking available. Good alternative for East Valley residents. PAYMENT: Credit/Debit Cards, Money Orders.'),

-- PIMA COUNTY (Tucson) SCRAM Providers

-- Sentinel Offender Services - Tucson (Primary)
((SELECT id FROM counties WHERE slug = 'pima'), 
 'scram_provider', 
 'Sentinel Offender Services', 
 '103 East Alameda Street, Suite 401', 
 'Tucson', 
 'AZ', 
 '85701', 
 '(602) 820-9313', 
 'https://sentineladvantage.com',
 32.2217, -- Downtown Tucson coordinates
 -110.9687, 
 'Mon-Fri 8AM-5PM, Weekends Closed', 
 'Setup: $50-75 one-time, Daily: $12-14/day', 
 'PRIMARY PROVIDER for Tucson/Pima area. Services: SCRAM CAM, GPS, Case Management. Court approved: Pima County Consolidated Justice Court and City Court. LOCATION: Downtown near Pima County Courthouse. PARKING: Paid/Street metered on Alameda St, garage at Public Works building. TRANSIT: Sun Link Streetcar - Church/Broadway stop short walk. PAYMENT: Money Orders, Cashier\'s Checks, Credit Cards. NOTE: Uses central 602 number for intake.'),

-- Prodigy Healthcare - Tucson
((SELECT id FROM counties WHERE slug = 'pima'), 
 'scram_provider', 
 'Prodigy Healthcare', 
 '1275 West Starr Pass Blvd', 
 'Tucson', 
 'AZ', 
 '85713', 
 '(888) 885-5580', 
 NULL,
 32.2084, -- West Tucson coordinates
 -111.0390, 
 'Mon-Fri 8AM-5PM', 
 'Setup: $50-75 one-time, Daily: $12-14/day', 
 'ALTERNATIVE PROVIDER with treatment focus. Services: SCRAM CAM and Substance Abuse Counseling. Good for clients seeking integrated treatment services. PARKING: Free parking available. PAYMENT: Credit/Debit Cards, Money Orders.');

-- ARIZONA-SPECIFIC NOTES:
-- 
-- CRITICAL DISTINCTIONS:
-- - SCRAM (ankle monitor/portable breath) ≠ Ignition Interlock (car breathalyzer)
-- - Arizona has strict IID laws - different technology and providers
-- - If court order says "Interlock" → Smart Start/Intoxalock
-- - If court order says "SCRAM" → Use providers listed above
-- 
-- SETUP REQUIREMENTS (Both Counties):
-- - Court Order stating "Continuous Alcohol Monitoring" (CAM)
-- - Valid ID (Driver's License or State ID)
-- - Proof of Residence (utility bill/lease - required for GPS, usually for SCRAM)
-- 
-- COST CONSIDERATIONS:
-- - Maricopa County may subsidize costs for indigent clients with "County Funded" order
-- - Pricing consistent across providers: $50-100 setup, $12-15/day
-- 
-- PROVIDER SELECTION:
-- - Check court paperwork for specific provider requirements
-- - Superior Court cases often use SCRAM of Arizona
-- - Municipal courts often use Sentinel
-- - Prodigy offers multiple locations to avoid downtown areas
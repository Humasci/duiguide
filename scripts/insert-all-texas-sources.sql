-- Bulk INSERT for all 32 Texas research files
-- Generated from Supabase Storage file listing
-- All files are DOCX format (Word documents)

INSERT INTO sources (
  file_name,
  file_type,
  file_path,
  state_id,
  county_id,
  file_size_bytes,
  processing_status,
  source_type
) VALUES
  -- BEXAR COUNTY (4 files)
  ('Bail Information Research for Bexar County.docx', 'docx', 'Texas/Bexar County/Bail Information Research for Bexar County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'bexar'), 6214264, 'pending', 'manual_research'),
  ('Bexar County DMV License Reinstatement.docx', 'docx', 'Texas/Bexar County/Bexar County DMV License Reinstatement.docx', 1, (SELECT id FROM counties WHERE county_slug = 'bexar'), 6211174, 'pending', 'manual_research'),
  ('Bexar County DWI Court Information.docx', 'docx', 'Texas/Bexar County/Bexar County DWI Court Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'bexar'), 6218831, 'pending', 'manual_research'),
  ('Bexar County Impound and Towing Research.docx', 'docx', 'Texas/Bexar County/Bexar County Impound and Towing Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'bexar'), 6211937, 'pending', 'manual_research'),

  -- COLLIN COUNTY (2 files)
  ('Collin County Impound and Towing Research.docx', 'docx', 'Texas/Collin County/Collin County Impound and Towing Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'collin'), 6212273, 'pending', 'manual_research'),
  ('Collin County ODL and ALR Research.docx', 'docx', 'Texas/Collin County/Collin County ODL and ALR Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'collin'), 6213142, 'pending', 'manual_research'),

  -- DALLAS COUNTY (5 files)
  ('Dallas County Bail Bond Research.docx', 'docx', 'Texas/Dallas County/Dallas County Bail Bond Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'dallas'), 6215284, 'pending', 'manual_research'),
  ('Dallas County DMV License Reinstatement.docx', 'docx', 'Texas/Dallas County/Dallas County DMV License Reinstatement.docx', 1, (SELECT id FROM counties WHERE county_slug = 'dallas'), 6214506, 'pending', 'manual_research'),
  ('Dallas County DUI Court Information.docx', 'docx', 'Texas/Dallas County/Dallas County DUI Court Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'dallas'), 6211209, 'pending', 'manual_research'),
  ('Dallas County Impound Information Gathering.docx', 'docx', 'Texas/Dallas County/Dallas County Impound Information Gathering.docx', 1, (SELECT id FROM counties WHERE county_slug = 'dallas'), 6210573, 'pending', 'manual_research'),
  ('SCRAM Bracelet Information for Dallas County.docx', 'docx', 'Texas/Dallas County/SCRAM Bracelet Information for Dallas County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'dallas'), 6217729, 'pending', 'manual_research'),

  -- DENTON COUNTY (2 files)
  ('Denton County DUI Defendant Logistics Research.docx', 'docx', 'Texas/Denton County/Denton County DUI Defendant Logistics Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'denton'), 6220622, 'pending', 'manual_research'),
  ('DUI Logistics Deep Dive_ Denton County.docx', 'docx', 'Texas/Denton County/DUI Logistics Deep Dive_ Denton County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'denton'), 6211821, 'pending', 'manual_research'),

  -- EL PASO COUNTY (1 file)
  ('Deep Research DUI Logistics El Paso.docx', 'docx', 'Texas/El Paso County/Deep Research DUI Logistics El Paso.docx', 1, (SELECT id FROM counties WHERE county_slug = 'el-paso'), 6222364, 'pending', 'manual_research'),

  -- FORT BEND COUNTY (1 file)
  ('Fort Bend County DWI Process Research.docx', 'docx', 'Texas/Fort Bend County/Fort Bend County DWI Process Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'fort-bend'), 6216817, 'pending', 'manual_research'),

  -- HARRIS COUNTY (5 files) - The largest county
  ('Harris County Bail Bond Information.docx', 'docx', 'Texas/Harris County/Harris County Bail Bond Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'harris'), 6222032, 'pending', 'manual_research'),
  ('Harris County DWI Court Information.docx', 'docx', 'Texas/Harris County/Harris County DWI Court Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'harris'), 6216125, 'pending', 'manual_research'),
  ('Harris County Impound & Towing Information.docx', 'docx', 'Texas/Harris County/Harris County Impound & Towing Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'harris'), 6216342, 'pending', 'manual_research'),
  ('Harris County Texas DMV License Reinstatement Guide.docx', 'docx', 'Texas/Harris County/Harris County Texas DMV License Reinstatement Guide.docx', 1, (SELECT id FROM counties WHERE county_slug = 'harris'), 6210216, 'pending', 'manual_research'),
  ('SCRAM Bracelet Information for Harris County.docx', 'docx', 'Texas/Harris County/SCRAM Bracelet Information for Harris County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'harris'), 6216083, 'pending', 'manual_research'),

  -- HIDALGO COUNTY (1 file)
  ('Hidalgo County DWI Process Research.docx', 'docx', 'Texas/Hidalgo County/Hidalgo County DWI Process Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'hidalgo'), 6220710, 'pending', 'manual_research'),

  -- NUECES COUNTY (1 file)
  ('Deep Research DUI Logistics Nueces County.docx', 'docx', 'Texas/Nueces County/Deep Research DUI Logistics Nueces County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'nueces'), 6220007, 'pending', 'manual_research'),

  -- TARRANT COUNTY (5 files)
  ('SCRAM Bracelet Information for Tarrant County.docx', 'docx', 'Texas/Tarrant County/SCRAM Bracelet Information for Tarrant County.docx', 1, (SELECT id FROM counties WHERE county_slug = 'tarrant'), 6215177, 'pending', 'manual_research'),
  ('Tarrant County Bail Bond Research.docx', 'docx', 'Texas/Tarrant County/Tarrant County Bail Bond Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'tarrant'), 6216101, 'pending', 'manual_research'),
  ('Tarrant County DMV ALR Hearing Info.docx', 'docx', 'Texas/Tarrant County/Tarrant County DMV ALR Hearing Info.docx', 1, (SELECT id FROM counties WHERE county_slug = 'tarrant'), 6215208, 'pending', 'manual_research'),
  ('Tarrant County DWI Court Information.docx', 'docx', 'Texas/Tarrant County/Tarrant County DWI Court Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'tarrant'), 6212051, 'pending', 'manual_research'),
  ('Tarrant County Impound & Towing Research.docx', 'docx', 'Texas/Tarrant County/Tarrant County Impound & Towing Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'tarrant'), 6213885, 'pending', 'manual_research'),

  -- TRAVIS COUNTY (4 files - note: there's a duplicate DMV file)
  ('Travis County DMV License Reinstatement.docx', 'docx', 'Texas/Travis County/Travis County DMV License Reinstatement.docx', 1, (SELECT id FROM counties WHERE county_slug = 'travis'), 6213315, 'pending', 'manual_research'),
  -- Skipping duplicate: 'Travis County DMV License Reinstatement(1).docx'
  ('Travis County DWI Court Information.docx', 'docx', 'Texas/Travis County/Travis County DWI Court Information.docx', 1, (SELECT id FROM counties WHERE county_slug = 'travis'), 6213118, 'pending', 'manual_research'),
  ('Travis County Impound Information Research.docx', 'docx', 'Texas/Travis County/Travis County Impound Information Research.docx', 1, (SELECT id FROM counties WHERE county_slug = 'travis'), 6209792, 'pending', 'manual_research'),

  -- WILLIAMSON COUNTY (1 file)
  ('Williamson County DWI Research Plan.docx', 'docx', 'Texas/Williamson County/Williamson County DWI Research Plan.docx', 1, (SELECT id FROM counties WHERE county_slug = 'williamson'), 6213525, 'pending', 'manual_research');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Count sources by county
SELECT
  c.county_name,
  COUNT(s.id) as file_count
FROM counties c
LEFT JOIN sources s ON c.id = s.county_id
WHERE c.state_id = 1
GROUP BY c.county_name
ORDER BY file_count DESC;

-- Show all pending sources
SELECT
  c.county_name,
  s.file_name,
  s.processing_status
FROM sources s
JOIN counties c ON s.county_id = c.id
WHERE s.processing_status = 'pending'
ORDER BY c.county_name, s.file_name;

-- Total count
SELECT COUNT(*) as total_files FROM sources WHERE state_id = 1;

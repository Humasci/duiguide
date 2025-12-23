-- Script to generate INSERT statements for all uploaded files
-- This helps create source records for the ingestion pipeline

-- First, check what files are in Supabase Storage
-- Run this query to list all files in the research-uploads bucket:

SELECT
  name AS file_path,
  metadata->>'size' AS file_size,
  metadata->>'mimetype' AS mime_type,
  created_at
FROM storage.objects
WHERE bucket_id = 'research-uploads'
  AND name LIKE 'Texas/%'
ORDER BY name;

-- This will show you all files uploaded
-- Copy the results and I'll generate the bulk INSERT script


-- ============================================================================
-- TEMPLATE: Use this pattern for each file
-- ============================================================================

/*
INSERT INTO sources (
  file_name,
  file_type,
  file_path,
  state_id,
  county_id,
  processing_status,
  source_type
) VALUES (
  'Harris County Bail Bond In...pdf',  -- file name
  'pdf',                                -- file type
  'Texas/Harris County/Harris County Bail Bond In...pdf',  -- full path
  1,                                    -- state_id (1 = Texas)
  (SELECT id FROM counties WHERE slug = 'harris'),  -- lookup county_id
  'pending',                            -- ready to process
  'manual_research'                     -- source type
);
*/

-- ============================================================================
-- County Slug Mapping (for reference)
-- ============================================================================

/*
County Name          → Slug
-----------------    --------
Harris County        → harris
Dallas County        → dallas
Tarrant County       → tarrant
Bexar County         → bexar
Travis County        → travis
Collin County        → collin
Denton County        → denton
Hidalgo County       → hidalgo
Fort Bend County     → fort-bend
El Paso County       → el-paso
Nueces County        → nueces
Williamson County    → williamson
*/

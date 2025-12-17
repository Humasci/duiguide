-- ============================================
-- DUI GUIDE DATABASE SCHEMA - COMPLETE IMPLEMENTATION
-- Migration 002: Full schema from implementation brief
-- ============================================

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS content_generation_queue CASCADE;
DROP TABLE IF EXISTS county_adjacencies CASCADE; 
DROP TABLE IF EXISTS building_service_locations CASCADE;
DROP TABLE IF EXISTS counties CASCADE;
DROP TABLE IF EXISTS states CASCADE;

-- Create states table
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL UNIQUE,
  dui_laws JSONB NOT NULL,
  master_content JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create counties table with all required columns
CREATE TABLE counties (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  slug TEXT,
  name TEXT,
  population INTEGER,
  
  -- Court information
  court_name TEXT,
  court_address TEXT,
  court_city TEXT,
  court_zip TEXT,
  court_phone TEXT,
  court_website TEXT,
  court_hours TEXT,
  court_lat DECIMAL(10, 8),
  court_lng DECIMAL(11, 8),
  
  -- Jail information
  jail_name TEXT,
  jail_address TEXT,
  jail_phone TEXT,
  jail_lat DECIMAL(10, 8),
  jail_lng DECIMAL(11, 8),
  
  -- DMV information
  dmv_name TEXT,
  dmv_address TEXT,
  dmv_phone TEXT,
  dmv_website TEXT,
  dmv_lat DECIMAL(10, 8),
  dmv_lng DECIMAL(11, 8),
  
  -- Legal/Process information
  typical_bail_range TEXT,
  arraignment_timeline TEXT,
  diversion_programs TEXT[],
  scram_providers JSONB,
  
  -- Generated content
  page_content JSONB,
  content_generated_at TIMESTAMPTZ,
  content_reviewed BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Building service locations table
CREATE TABLE building_service_locations (
  id SERIAL PRIMARY KEY,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('court', 'dmv', 'jail', 'scram_provider')),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  hours TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  notes TEXT,
  cost_info TEXT,
  priority INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content generation queue
CREATE TABLE content_generation_queue (
  id SERIAL PRIMARY KEY,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  priority INTEGER DEFAULT 100,
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 4),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- County adjacencies
CREATE TABLE county_adjacencies (
  id SERIAL PRIMARY KEY,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  adjacent_county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  UNIQUE(county_id, adjacent_county_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_counties_state ON counties(state_id);
CREATE INDEX IF NOT EXISTS idx_counties_slug ON counties(slug);
CREATE INDEX IF NOT EXISTS idx_locations_county ON building_service_locations(county_id);
CREATE INDEX IF NOT EXISTS idx_locations_type ON building_service_locations(type);
CREATE INDEX IF NOT EXISTS idx_queue_status ON content_generation_queue(status, priority);

-- Add comments
COMMENT ON TABLE states IS 'Master state information and DUI laws';
COMMENT ON TABLE counties IS 'County-specific courts, jails, DMV, and generated content';
COMMENT ON TABLE building_service_locations IS 'Specific service provider locations with coordinates';
COMMENT ON TABLE content_generation_queue IS 'AI content generation tracking and costs';
COMMENT ON TABLE county_adjacencies IS 'Adjacent counties for cross-referencing';
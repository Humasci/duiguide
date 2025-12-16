-- DUI Guide Content Generation Tables
-- Migration 001: Create core tables for state and county content management

-- States table - stores legal information and master content for each state
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  abbreviation CHAR(2) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  dui_laws JSONB NOT NULL DEFAULT '{}',
  master_content JSONB DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Counties table - detailed local information for each county
CREATE TABLE IF NOT EXISTS counties (
  id SERIAL PRIMARY KEY,
  state_id INTEGER NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  fips_code VARCHAR(5),
  population INTEGER,
  
  -- Court information
  court_name VARCHAR(255),
  court_address TEXT,
  court_phone VARCHAR(20),
  court_hours VARCHAR(100),
  court_website VARCHAR(255),
  
  -- Bail and penalty info
  typical_bail_range VARCHAR(100),
  avg_case_duration_days INTEGER,
  
  -- Generated content
  page_content JSONB DEFAULT '{}',
  content_generated_at TIMESTAMPTZ,
  content_needs_update BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  tier INTEGER DEFAULT 3, -- 1=custom, 2=semi-custom, 3=template
  priority_score INTEGER DEFAULT 0,
  
  -- Location
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(state_id, slug),
  UNIQUE(state_id, name)
);

-- SCRAM providers - local SCRAM monitoring companies
CREATE TABLE IF NOT EXISTS scram_providers (
  id SERIAL PRIMARY KEY,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  services TEXT[],
  daily_cost_min DECIMAL(5,2),
  daily_cost_max DECIMAL(5,2),
  setup_fee DECIMAL(6,2),
  hours VARCHAR(100),
  notes TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DUI attorneys - local legal representation
CREATE TABLE IF NOT EXISTS attorneys (
  id SERIAL PRIMARY KEY,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  firm_name VARCHAR(255),
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  specializes_in TEXT[],
  years_experience INTEGER,
  bar_number VARCHAR(50),
  rating DECIMAL(3,1),
  review_count INTEGER DEFAULT 0,
  consultation_fee DECIMAL(6,2),
  hourly_rate_min DECIMAL(6,2),
  hourly_rate_max DECIMAL(6,2),
  languages TEXT[],
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content generation logs
CREATE TABLE IF NOT EXISTS content_generation_logs (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(20) NOT NULL, -- 'state', 'county', 'scram_page', etc.
  entity_id INTEGER NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'master_content', 'page_content', 'scram_guide'
  model_used VARCHAR(50),
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_cents INTEGER,
  generation_time_ms INTEGER,
  status VARCHAR(20) DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- High-value content pages (SCRAM, Second DUI, CDL, etc.)
CREATE TABLE IF NOT EXISTS special_content_pages (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  page_type VARCHAR(50) NOT NULL, -- 'scram_guide', 'second_dui', 'cdl_dui'
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content JSONB DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  target_keywords TEXT[],
  search_volume INTEGER,
  keyword_difficulty INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(state_id, county_id, page_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_counties_state_id ON counties(state_id);
CREATE INDEX IF NOT EXISTS idx_counties_slug ON counties(slug);
CREATE INDEX IF NOT EXISTS idx_counties_tier ON counties(tier);
CREATE INDEX IF NOT EXISTS idx_counties_priority ON counties(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_counties_location ON counties(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_scram_providers_county_id ON scram_providers(county_id);
CREATE INDEX IF NOT EXISTS idx_attorneys_county_id ON attorneys(county_id);
CREATE INDEX IF NOT EXISTS idx_content_logs_entity ON content_generation_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_special_pages_state_county ON special_content_pages(state_id, county_id);

-- Insert the 7 target states
INSERT INTO states (name, abbreviation, slug, dui_laws) VALUES
('Texas', 'TX', 'texas', '{
  "terminology": "DWI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 15,
  "enhanced_bac_threshold": 0.15,
  "lookback_years": 10,
  "penalties_by_offense": {
    "first_offense": "Up to 180 days jail, $2,000 fine, 90-day license suspension",
    "second_offense": "30 days to 1 year jail, $4,000 fine, 180-day license suspension",
    "felony_threshold": "Third offense or DWI with child passenger"
  }
}'),
('Arizona', 'AZ', 'arizona', '{
  "terminology": "DUI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 15,
  "enhanced_bac_threshold": 0.15,
  "lookback_years": 7,
  "penalties_by_offense": {
    "first_offense": "10 days jail minimum, $1,250+ fine, 90-day license suspension",
    "second_offense": "90 days jail minimum, $3,000+ fine, 1-year license suspension",
    "felony_threshold": "Third offense within 84 months"
  }
}'),
('Georgia', 'GA', 'georgia', '{
  "terminology": "DUI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 30,
  "enhanced_bac_threshold": 0.15,
  "lookback_years": 10,
  "penalties_by_offense": {
    "first_offense": "Up to 1 year jail, $1,000 fine, 1-year license suspension",
    "second_offense": "90 days to 1 year jail, $3,000 fine, 3-year license suspension",
    "felony_threshold": "Third offense within 10 years"
  }
}'),
('Colorado', 'CO', 'colorado', '{
  "terminology": "DUI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 7,
  "enhanced_bac_threshold": 0.15,
  "lookback_years": 10,
  "penalties_by_offense": {
    "first_offense": "5 days to 1 year jail, $600-$1,000 fine, 9-month license suspension",
    "second_offense": "10 days to 1 year jail, $1,500 fine, 1-year license suspension",
    "felony_threshold": "Third offense or DUI with serious bodily injury"
  }
}'),
('North Carolina', 'NC', 'north-carolina', '{
  "terminology": "DWI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 30,
  "enhanced_bac_threshold": 0.15,
  "lookback_years": 7,
  "penalties_by_offense": {
    "first_offense": "Up to 2 years jail, $4,000 fine, 1-year license suspension",
    "second_offense": "7 days to 2 years jail, $2,000 fine, 4-year license suspension",
    "felony_threshold": "Habitual DWI (3+ convictions)"
  }
}'),
('Ohio', 'OH', 'ohio', '{
  "terminology": "OVI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 30,
  "enhanced_bac_threshold": 0.17,
  "lookback_years": 10,
  "penalties_by_offense": {
    "first_offense": "3 days to 6 months jail, $375-$1,075 fine, 1-year license suspension",
    "second_offense": "10 days to 6 months jail, $525-$1,625 fine, 1-year license suspension",
    "felony_threshold": "Third offense within 10 years"
  }
}'),
('Tennessee', 'TN', 'tennessee', '{
  "terminology": "DUI",
  "bac_limit": 0.08,
  "admin_hearing_deadline_days": 20,
  "enhanced_bac_threshold": 0.20,
  "lookback_years": 10,
  "penalties_by_offense": {
    "first_offense": "48 hours to 11 months jail, $350-$1,500 fine, 1-year license suspension",
    "second_offense": "45 days to 11 months jail, $600-$3,500 fine, 2-year license suspension",
    "felony_threshold": "Third offense within 10 years"
  }
}')
ON CONFLICT (abbreviation) DO NOTHING;

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON states FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_counties_updated_at BEFORE UPDATE ON counties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scram_providers_updated_at BEFORE UPDATE ON scram_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attorneys_updated_at BEFORE UPDATE ON attorneys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_special_content_pages_updated_at BEFORE UPDATE ON special_content_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE states IS 'Master state information and legal data for DUI content generation';
COMMENT ON TABLE counties IS 'County-specific data including courts, bail info, and generated content';
COMMENT ON TABLE scram_providers IS 'Local SCRAM monitoring companies and pricing information';
COMMENT ON TABLE attorneys IS 'Local DUI attorneys and their details';
COMMENT ON TABLE content_generation_logs IS 'Tracking of AI content generation costs and performance';
COMMENT ON TABLE special_content_pages IS 'High-value content pages like SCRAM guides, Second DUI, CDL DUI';
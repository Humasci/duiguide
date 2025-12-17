-- Migration 003: Create knowledge base table
-- This creates the knowledge base table for storing DUI law information and FAQs

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create knowledge base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Categorization
  category TEXT NOT NULL,
  subcategory TEXT,
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  county_id UUID REFERENCES counties(id) ON DELETE CASCADE,

  -- Content
  topic TEXT NOT NULL,
  question TEXT,           -- For FAQ-style entries
  answer TEXT,
  content TEXT NOT NULL,

  -- For AI Retrieval (optional for now)
  keywords TEXT[],

  -- Compliance Flags
  requires_disclaimer BOOLEAN DEFAULT false,
  is_legal_advice BOOLEAN DEFAULT false,  -- Flag to exclude from AI responses

  -- Source
  source_url TEXT,
  source_title TEXT,
  last_verified TIMESTAMPTZ,

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_state ON knowledge_base(state_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_county ON knowledge_base(county_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_topic ON knowledge_base(topic);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_keywords ON knowledge_base USING GIN(keywords);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON knowledge_base TO authenticated;
GRANT ALL ON knowledge_base TO service_role;
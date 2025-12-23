-- Migration 004: Brain System - RAG Architecture for DUI Guide
-- This creates the complete "Two-Lobe Brain" infrastructure for:
-- 1. The Ingestion Brain (offline processing)
-- 2. The Interaction Brain (runtime chat)

-- ============================================================================
-- PART 1: Enable pgvector Extension
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================================
-- PART 2: Source Management (The "Library")
-- ============================================================================

-- This table tracks all uploaded files (PDFs, DOCX, HTML)
CREATE TABLE IF NOT EXISTS sources (
  id SERIAL PRIMARY KEY,

  -- File metadata
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'pdf', 'docx', 'html', 'markdown'
  file_path TEXT, -- Path in Supabase Storage: 'texas/harris/impound.docx'
  file_hash TEXT, -- SHA256 hash for change detection
  file_size_bytes INTEGER,

  -- Geographic scope
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  applies_to_all_counties BOOLEAN DEFAULT false, -- For state-wide laws

  -- Categorization (auto-tagged by Taxonomist agent)
  phase TEXT, -- 'PHASE_1_ARREST', 'PHASE_2_CRITICAL_WINDOW', etc.
  topic TEXT, -- 'impound', 'court', 'scram', 'bail', 'dmv', 'license'

  -- Source tracking (for citations)
  source_type TEXT DEFAULT 'manual_research', -- 'manual_research', 'scraped', 'official_doc'
  original_url TEXT, -- If scraped from a website

  -- Processing status
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'error'
  processing_error TEXT,
  processed_at TIMESTAMPTZ,

  -- Archival (for outdated content)
  is_archived BOOLEAN DEFAULT false,
  archive_reason TEXT,
  archived_at TIMESTAMPTZ,

  -- Verification
  last_verified TIMESTAMPTZ,
  verification_status TEXT DEFAULT 'unverified', -- 'unverified', 'verified', 'outdated'

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 3: Knowledge Chunks (The "Brain" - Vector Store)
-- ============================================================================

-- This table stores chunked text with vector embeddings for semantic search
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id SERIAL PRIMARY KEY,

  -- Source reference
  source_id INTEGER REFERENCES sources(id) ON DELETE CASCADE,

  -- Geographic scope (denormalized for fast filtering)
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
  applies_to_all_counties BOOLEAN DEFAULT false,

  -- Categorization (denormalized from sources for fast filtering)
  phase TEXT NOT NULL, -- 'PHASE_1_ARREST', 'PHASE_2_CRITICAL_WINDOW', etc.
  topic TEXT NOT NULL, -- 'impound', 'court', 'scram', 'bail', 'dmv'

  -- The actual content
  content TEXT NOT NULL,
  chunk_index INTEGER NOT NULL, -- Order within the source document

  -- Vector embeddings (Gemini: 768 dimensions, OpenAI: 1536 dimensions)
  embedding_gemini vector(768), -- Active: Gemini text-embedding-004
  embedding_openai vector(1536), -- Optional: For A/B testing later

  -- Metadata for context
  heading TEXT, -- If chunk came from a section with a heading
  page_number INTEGER, -- For PDFs

  -- Archival (inherited from source but can override)
  is_archived BOOLEAN DEFAULT false,
  archive_warning TEXT, -- "This info is from 2023, may be outdated"

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 4: Curated Data (The "UI" - Structured Display)
-- ============================================================================

-- This table stores structured data extracted by the Curator agent
-- for rendering clean UI components (not just chat)
CREATE TABLE IF NOT EXISTS curated_data (
  id SERIAL PRIMARY KEY,

  -- Source reference
  source_id INTEGER REFERENCES sources(id) ON DELETE CASCADE,

  -- Geographic scope
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,

  -- Topic categorization
  topic TEXT NOT NULL, -- 'impound', 'dmv', 'court', 'bail', 'scram', 'license'

  -- Structured data (JSONB for flexibility)
  -- Example for "impound": {"lots": [{"name": "...", "address": "...", "phone": "...", "daily_fee": 45}]}
  -- Example for "dmv": {"deadline_days": 10, "hearing_location": "...", "required_forms": [...]}
  data JSONB NOT NULL DEFAULT '{}',

  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verified_by TEXT, -- 'ai_agent', 'human_reviewer', 'legal_expert'
  verified_at TIMESTAMPTZ,

  -- Display priority (higher = show first)
  priority INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one curated entry per topic per county
  UNIQUE(state_id, county_id, topic)
);

-- ============================================================================
-- PART 5: Citations & Source Links (Anti-Hallucination)
-- ============================================================================

-- This table tracks specific links/citations extracted from source documents
CREATE TABLE IF NOT EXISTS citations (
  id SERIAL PRIMARY KEY,

  -- Source reference
  source_id INTEGER REFERENCES sources(id) ON DELETE CASCADE,

  -- Citation details
  citation_text TEXT NOT NULL, -- "Texas Penal Code 49.04", "Harris County DMV Manual 2024"
  citation_type TEXT, -- 'statute', 'case_law', 'regulation', 'manual', 'website'

  -- Link (if available)
  url TEXT,
  page_reference TEXT, -- "Page 12", "Section 3.2"

  -- Metadata
  is_verified BOOLEAN DEFAULT false,
  last_checked TIMESTAMPTZ,
  link_status TEXT DEFAULT 'unchecked', -- 'unchecked', 'active', 'broken', 'redirected'

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 6: User Feedback (Quality Control)
-- ============================================================================

-- Track user feedback on AI responses to detect hallucinations
CREATE TABLE IF NOT EXISTS chat_feedback (
  id SERIAL PRIMARY KEY,

  -- Geographic context
  state_id INTEGER REFERENCES states(id) ON DELETE SET NULL,
  county_id INTEGER REFERENCES counties(id) ON DELETE SET NULL,

  -- The interaction
  user_question TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  retrieved_chunk_ids INTEGER[], -- Array of knowledge_chunk IDs used

  -- User feedback
  feedback_type TEXT NOT NULL, -- 'helpful', 'incorrect', 'incomplete', 'outdated'
  user_comment TEXT,

  -- Triage
  requires_review BOOLEAN DEFAULT false,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  resolution_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 7: Indexes for Performance
-- ============================================================================

-- Sources table indexes
CREATE INDEX IF NOT EXISTS idx_sources_state_county ON sources(state_id, county_id);
CREATE INDEX IF NOT EXISTS idx_sources_phase ON sources(phase);
CREATE INDEX IF NOT EXISTS idx_sources_topic ON sources(topic);
CREATE INDEX IF NOT EXISTS idx_sources_status ON sources(processing_status);
CREATE INDEX IF NOT EXISTS idx_sources_archived ON sources(is_archived);
CREATE INDEX IF NOT EXISTS idx_sources_file_hash ON sources(file_hash);

-- Knowledge chunks indexes
CREATE INDEX IF NOT EXISTS idx_chunks_source ON knowledge_chunks(source_id);
CREATE INDEX IF NOT EXISTS idx_chunks_state_county ON knowledge_chunks(state_id, county_id);
CREATE INDEX IF NOT EXISTS idx_chunks_phase ON knowledge_chunks(phase);
CREATE INDEX IF NOT EXISTS idx_chunks_topic ON knowledge_chunks(topic);
CREATE INDEX IF NOT EXISTS idx_chunks_archived ON knowledge_chunks(is_archived);

-- Vector index for similarity search (CRITICAL for performance)
CREATE INDEX IF NOT EXISTS idx_chunks_embedding_gemini ON knowledge_chunks
  USING ivfflat (embedding_gemini vector_cosine_ops)
  WITH (lists = 100); -- Tune based on data size (100 lists for ~10K chunks)

-- Curated data indexes
CREATE INDEX IF NOT EXISTS idx_curated_state_county ON curated_data(state_id, county_id);
CREATE INDEX IF NOT EXISTS idx_curated_topic ON curated_data(topic);
CREATE INDEX IF NOT EXISTS idx_curated_priority ON curated_data(priority DESC);

-- Citations indexes
CREATE INDEX IF NOT EXISTS idx_citations_source ON citations(source_id);
CREATE INDEX IF NOT EXISTS idx_citations_type ON citations(citation_type);
CREATE INDEX IF NOT EXISTS idx_citations_link_status ON citations(link_status);

-- Feedback indexes
CREATE INDEX IF NOT EXISTS idx_feedback_county ON chat_feedback(county_id);
CREATE INDEX IF NOT EXISTS idx_feedback_requires_review ON chat_feedback(requires_review);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON chat_feedback(created_at DESC);

-- ============================================================================
-- PART 8: RPC Function for Vector Search
-- ============================================================================

-- This function performs semantic search filtered by geographic scope
CREATE OR REPLACE FUNCTION match_knowledge_chunks (
  query_embedding vector(768),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5,
  filter_state_id INT DEFAULT NULL,
  filter_county_id INT DEFAULT NULL,
  filter_phase TEXT DEFAULT NULL,
  filter_topic TEXT DEFAULT NULL,
  include_archived BOOLEAN DEFAULT false
)
RETURNS TABLE (
  chunk_id INT,
  content TEXT,
  phase TEXT,
  topic TEXT,
  source_file_name TEXT,
  source_url TEXT,
  heading TEXT,
  similarity FLOAT,
  is_archived BOOLEAN,
  archive_warning TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id AS chunk_id,
    kc.content,
    kc.phase,
    kc.topic,
    s.file_name AS source_file_name,
    s.original_url AS source_url,
    kc.heading,
    1 - (kc.embedding_gemini <=> query_embedding) AS similarity,
    kc.is_archived,
    kc.archive_warning
  FROM knowledge_chunks kc
  LEFT JOIN sources s ON kc.source_id = s.id
  WHERE
    -- Similarity threshold
    1 - (kc.embedding_gemini <=> query_embedding) > match_threshold

    -- Geographic filters
    AND (filter_state_id IS NULL OR kc.state_id = filter_state_id OR kc.applies_to_all_counties = true)
    AND (filter_county_id IS NULL OR kc.county_id = filter_county_id OR kc.applies_to_all_counties = true)

    -- Category filters
    AND (filter_phase IS NULL OR kc.phase = filter_phase)
    AND (filter_topic IS NULL OR kc.topic = filter_topic)

    -- Archived filter
    AND (include_archived = true OR kc.is_archived = false)

  ORDER BY kc.embedding_gemini <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================================
-- PART 9: Updated_at Triggers
-- ============================================================================

CREATE TRIGGER update_sources_updated_at
  BEFORE UPDATE ON sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_chunks_updated_at
  BEFORE UPDATE ON knowledge_chunks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_curated_data_updated_at
  BEFORE UPDATE ON curated_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_citations_updated_at
  BEFORE UPDATE ON citations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 10: Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE curated_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_feedback ENABLE ROW LEVEL SECURITY;

-- Public read access (these are public legal resources)
CREATE POLICY "Public read access" ON sources FOR SELECT USING (true);
CREATE POLICY "Public read access" ON knowledge_chunks FOR SELECT USING (true);
CREATE POLICY "Public read access" ON curated_data FOR SELECT USING (true);
CREATE POLICY "Public read access" ON citations FOR SELECT USING (true);

-- Service role full access (for backend processing)
CREATE POLICY "Service role full access" ON sources FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON knowledge_chunks FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON curated_data FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON citations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON chat_feedback FOR ALL USING (auth.role() = 'service_role');

-- Anyone can submit feedback
CREATE POLICY "Anyone can submit feedback" ON chat_feedback FOR INSERT WITH CHECK (true);

-- ============================================================================
-- PART 11: Helper Functions
-- ============================================================================

-- Get curated data for a specific county page
CREATE OR REPLACE FUNCTION get_curated_page_data(
  p_state_id INT,
  p_county_id INT,
  p_topic TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT data INTO result
  FROM curated_data
  WHERE state_id = p_state_id
    AND county_id = p_county_id
    AND topic = p_topic
    AND is_verified = true
  ORDER BY priority DESC
  LIMIT 1;

  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

-- ============================================================================
-- PART 12: Comments for Documentation
-- ============================================================================

COMMENT ON TABLE sources IS 'Master library of all uploaded research files (PDFs, DOCX, HTML)';
COMMENT ON TABLE knowledge_chunks IS 'Chunked text with vector embeddings for RAG semantic search';
COMMENT ON TABLE curated_data IS 'Structured data extracted for UI display (cards, tables, forms)';
COMMENT ON TABLE citations IS 'Source links and citations for anti-hallucination and user verification';
COMMENT ON TABLE chat_feedback IS 'User feedback on AI responses for quality control';

COMMENT ON FUNCTION match_knowledge_chunks IS 'Semantic search function filtered by state/county/phase/topic';
COMMENT ON FUNCTION get_curated_page_data IS 'Helper to fetch pre-processed structured data for a county page';

-- ============================================================================
-- PART 13: Permissions
-- ============================================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON sources TO authenticated;
GRANT SELECT ON knowledge_chunks TO authenticated;
GRANT SELECT ON curated_data TO authenticated;
GRANT SELECT ON citations TO authenticated;
GRANT INSERT ON chat_feedback TO authenticated;

-- Grant full access to service role
GRANT ALL ON sources TO service_role;
GRANT ALL ON knowledge_chunks TO service_role;
GRANT ALL ON curated_data TO service_role;
GRANT ALL ON citations TO service_role;
GRANT ALL ON chat_feedback TO service_role;

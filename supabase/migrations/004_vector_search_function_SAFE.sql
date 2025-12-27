-- Vector Search RPC Function for Brain SDK (Safe version)
-- This function enables semantic search using pgvector

-- Drop existing function if it exists (handles multiple signatures)
DROP FUNCTION IF EXISTS match_knowledge_chunks;
DROP FUNCTION IF EXISTS match_knowledge_chunks(vector, float, int, text, text, text, text);

-- Create function for semantic search using pgvector
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_state text DEFAULT NULL,
  filter_county text DEFAULT NULL,
  filter_topic text DEFAULT NULL,
  filter_phase text DEFAULT NULL
)
RETURNS TABLE (
  id int,
  text text,
  state text,
  county text,
  topic text,
  phase text,
  chunk_index int,
  confidence float,
  source_id int,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.text,
    kc.state,
    kc.county,
    kc.topic,
    kc.phase,
    kc.chunk_index,
    kc.confidence,
    kc.source_id,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks kc
  WHERE
    (filter_state IS NULL OR kc.state = filter_state)
    AND (filter_county IS NULL OR kc.county = filter_county)
    AND (filter_topic IS NULL OR kc.topic = filter_topic)
    AND (filter_phase IS NULL OR kc.phase = filter_phase)
    AND 1 - (kc.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Add comment explaining the function
COMMENT ON FUNCTION match_knowledge_chunks IS 'Performs semantic search on knowledge_chunks table using pgvector cosine similarity. Returns chunks ordered by similarity to query embedding.';

-- Create indexes (only if they don't exist)

-- Vector search index
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'idx_knowledge_chunks_embedding'
  ) THEN
    CREATE INDEX idx_knowledge_chunks_embedding
    ON knowledge_chunks
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
  END IF;
END $$;

-- Filter indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_state ON knowledge_chunks(state);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_county ON knowledge_chunks(county);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_topic ON knowledge_chunks(topic);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_phase ON knowledge_chunks(phase);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source_id ON knowledge_chunks(source_id);

-- Text search index
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_text_search
ON knowledge_chunks
USING gin(to_tsvector('english', text));

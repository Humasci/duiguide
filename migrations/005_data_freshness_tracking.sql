-- Migration 005: Add Data Freshness Tracking for SEO
-- Adds verification timestamps and source tracking

-- Add to sources table
ALTER TABLE sources
ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS verification_source TEXT, -- 'system-scrape', 'manual-audit', 'user-report'
ADD COLUMN IF NOT EXISTS verification_frequency_days INTEGER DEFAULT 30; -- How often to re-check

-- Add to curated_data table (the UI-facing data)
ALTER TABLE curated_data
ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified', -- 'verified', 'stale', 'outdated'
ADD COLUMN IF NOT EXISTS verification_notes TEXT;

-- Add to counties table (page-level freshness)
ALTER TABLE counties
ADD COLUMN IF NOT EXISTS data_last_verified TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS data_verification_notes TEXT;

-- Helper function: Mark content as stale if > 30 days old
CREATE OR REPLACE FUNCTION check_content_freshness()
RETURNS void AS $$
BEGIN
  UPDATE curated_data
  SET verification_status = 'stale'
  WHERE last_verified_at < NOW() - INTERVAL '30 days'
    AND verification_status = 'verified';

  UPDATE curated_data
  SET verification_status = 'outdated'
  WHERE last_verified_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to check freshness (run daily)
-- Note: You'd set this up in Supabase cron jobs or pg_cron
-- SELECT cron.schedule('check-freshness', '0 0 * * *', 'SELECT check_content_freshness()');

COMMENT ON COLUMN curated_data.last_verified_at IS 'When this data was last confirmed accurate (for SEO freshness)';
COMMENT ON COLUMN curated_data.verification_status IS 'verified (<30 days), stale (30-90 days), outdated (>90 days)';

-- Run this in Supabase SQL Editor to see what columns you actually have

SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'counties'
  AND table_schema = 'public'
ORDER BY ordinal_position;

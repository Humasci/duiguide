-- Create Supabase Storage Bucket for Research Documents
-- This bucket stores uploaded files that will be processed by legal-data-factory

-- Create bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'research-documents',
  'research-documents',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for admin access

-- Policy: Allow authenticated users to upload files
CREATE POLICY "Admin can upload research documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'research-documents'
);

-- Policy: Allow authenticated users to read files
CREATE POLICY "Admin can read research documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'research-documents'
);

-- Policy: Allow authenticated users to update files
CREATE POLICY "Admin can update research documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'research-documents'
)
WITH CHECK (
  bucket_id = 'research-documents'
);

-- Policy: Allow authenticated users to delete files
CREATE POLICY "Admin can delete research documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'research-documents'
);

-- Add comment
COMMENT ON TABLE storage.buckets IS 'Storage bucket for research documents uploaded via admin panel';

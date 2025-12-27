# Storage Bucket Setup for Admin Uploads

## Overview

The `research-documents` storage bucket is used to store files and text uploaded through the admin dashboard (`/app/admin/upload`). This bucket serves as a staging area before documents are processed by the legal-data-factory system.

## Creating the Bucket via Supabase Dashboard

Since we don't have superuser permissions to create buckets via SQL, you'll need to create it through the Supabase Dashboard:

### Steps:

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click "+ New bucket"

3. **Configure Bucket Settings**
   - **Name**: `research-documents`
   - **Public**: `false` (keep documents private)
   - **File size limit**: `10 MB` (matches upload interface limit)
   - **Allowed MIME types**: Leave empty or set to:
     - `application/pdf`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX)
     - `text/plain`

4. **Set Bucket Policies**

After creating the bucket, add these RLS policies:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'research-documents');

-- Allow authenticated users to read their own uploads
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'research-documents');

-- Allow service role to delete files (for cleanup)
CREATE POLICY "Allow service role deletes"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'research-documents');
```

## Upload Workflow

Once the bucket is created, the upload workflow works as follows:

1. **Admin uploads file or pastes text** → `/app/admin/upload`
2. **File is uploaded to `research-documents` bucket**
3. **Record created in `sources` table** with `status='pending'`
4. **legal-data-factory monitors `sources` table** and processes pending files
5. **Processed data appears in** `knowledge_chunks`, `citations`, and `curated_data` tables

## Verification

After creating the bucket, verify it works by:

```bash
# Test upload endpoint with text content
curl -X POST http://localhost:3000/api/admin/upload \
  -F "state=Texas" \
  -F "county=Harris County" \
  -F "topic=bail" \
  -F "source_url=https://example.com/test" \
  -F "text=This is test document content for Bexar County DUI bail procedures." \
  -F "file_name=test-document.txt"
```

Or test with a file:

```bash
# Test upload endpoint with file
curl -X POST http://localhost:3000/api/admin/upload \
  -F "state=Texas" \
  -F "county=Harris County" \
  -F "topic=bail" \
  -F "source_url=https://example.com/test" \
  -F "file=@/path/to/your/document.pdf"
```

Expected response:
```json
{
  "success": true,
  "message": "Upload successful! File is queued for processing by legal-data-factory.",
  "sourceId": 123,
  "fileName": "test-document.txt",
  "status": "pending"
}
```

## Important Notes

1. **Coordinate with legal-data-factory team** to confirm they will process files from this bucket
2. The upload interface assumes legal-data-factory will auto-process `status='pending'` sources
3. If legal-data-factory has their own upload process, this feature may need adjustment

## Troubleshooting

**Error: "Bucket not found"**
- Verify bucket name is exactly `research-documents`
- Check bucket exists in Supabase Dashboard → Storage

**Error: "Permission denied"**
- Verify RLS policies are set correctly
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`

**Files not being processed**
- Check with legal-data-factory team if they're monitoring the `sources` table
- Verify the `status='pending'` flag is being set correctly

# Upload Feature Setup Guide

## Overview
The admin upload interface allows you to upload research documents (PDF, DOCX, TXT) or paste text directly. Files are automatically queued for processing by legal-data-factory.

## Setup Steps

### 1. Create Supabase Storage Bucket

Run this SQL in your Supabase SQL Editor:

```sql
-- From: supabase/migrations/005_create_storage_bucket.sql

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'research-documents',
  'research-documents',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (run all policies from the migration file)
```

**Or via Supabase Dashboard:**
1. Go to Storage in Supabase Dashboard
2. Click "New Bucket"
3. Name: `research-documents`
4. Public: `false` (private)
5. File size limit: `10 MB`
6. Allowed MIME types: `application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain`

### 2. Verify Database Setup

Make sure the `sources` table has these columns:
- `id` (int, primary key)
- `file_name` (text)
- `file_path` (text)
- `file_type` (text)
- `state_id` (int, foreign key to states)
- `county_id` (int, foreign key to counties)
- `topic` (text)
- `source_url` (text, nullable)
- `processing_status` (text, default: 'pending')
- `uploaded_by` (text)
- `created_at` (timestamp)

### 3. Test Upload

1. Login to admin: `http://localhost:3000/admin/login`
2. Navigate to Upload: `http://localhost:3000/admin/upload`
3. Select mode: File Upload or Text Paste
4. Fill in metadata:
   - State (required)
   - County (required)
   - Topic (required)
   - Source URL (optional)
5. Upload file or paste text
6. Click "Upload"
7. Check Processing Status page to see your upload

### 4. Monitor Processing

After upload:
1. File appears in `/admin/processing` with status "pending"
2. legal-data-factory automatically picks up pending files
3. Status changes to "processing" then "completed" or "error"
4. Once completed, data appears in knowledge chunks and can be searched

## Supported File Types

- **PDF** (.pdf) - Recommended for official documents
- **DOCX** (.docx) - Microsoft Word documents
- **TXT** (.txt) - Plain text files
- **Text Paste** - Direct text input (saved as .txt)

## File Size Limit

- Maximum: 10MB per file
- For larger files, split into multiple uploads or use text paste

## Upload Flow

```
User Upload
    ↓
Supabase Storage (research-documents bucket)
    ↓
sources table (status: pending)
    ↓
legal-data-factory monitors sources table
    ↓
Processing (text extraction, AI classification, embeddings, citations)
    ↓
sources table (status: completed)
    ↓
Data appears in: knowledge_chunks, citations, curated_data
    ↓
Available via Brain SDK for website queries
```

## Troubleshooting

**Error: "Storage bucket not configured"**
- Create the `research-documents` bucket in Supabase
- Run the storage bucket migration SQL

**Error: "State/County not found"**
- Verify the state and county exist in your database
- Check `states` and `counties` tables

**File upload fails**
- Check file size (must be < 10MB)
- Verify file type is PDF, DOCX, or TXT
- Check browser console for errors

**Processing stuck on "pending"**
- Verify legal-data-factory is running and monitoring the sources table
- Check legal-data-factory logs for errors

## Security

- Upload interface is protected by admin authentication
- Files are stored in a private Supabase bucket
- Only authenticated admin users can upload
- File types are validated server-side
- File size is limited to 10MB

## Next Steps

After uploading files:
1. Monitor processing status in `/admin/processing`
2. View extracted data in `/admin/gold-dust` (high-priority insights)
3. Check citations in knowledge chunks
4. Use Brain SDK to query the new data

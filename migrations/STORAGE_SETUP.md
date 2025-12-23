# Supabase Storage Setup for Brain System

## Overview
This document provides step-by-step instructions for setting up Supabase Storage buckets for the DUI Guide Brain System.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `research-uploads`
   - **Public**: ❌ Unchecked (private by default)
   - **File size limit**: 50 MB
   - **Allowed MIME types**:
     - `application/pdf`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX)
     - `text/html`
     - `text/markdown`
     - `application/msword` (DOC)

## Step 2: Set Up Folder Structure

The bucket should follow this geographic hierarchy:

```
research-uploads/
├── texas/
│   ├── harris/                    (Main county - separate topic files)
│   │   ├── impound.docx
│   │   ├── court-info.docx
│   │   ├── scram.docx
│   │   ├── bail-bonds.docx
│   │   └── license-reinstatement.docx
│   │
│   ├── dallas/                    (Main county - separate files)
│   │   ├── impound.docx
│   │   ├── court-info.docx
│   │   └── ...
│   │
│   ├── tarrant/                   (Main county)
│   │   └── ...
│   │
│   └── galveston/                 (Smaller county - single file)
│       └── complete-guide.docx
│
├── arizona/
│   └── ...
│
└── georgia/
    └── ...
```

## Step 3: Configure Storage Policies (RLS)

Run this SQL in the Supabase SQL Editor to set up Row Level Security:

```sql
-- Allow public to read uploaded files (they are public legal resources)
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'research-uploads');

-- Allow service role to upload/manage files
CREATE POLICY "Service role full access"
  ON storage.objects FOR ALL
  USING (bucket_id = 'research-uploads' AND auth.role() = 'service_role');

-- Allow authenticated users to upload (optional - for future admin panel)
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'research-uploads' AND auth.role() = 'authenticated');
```

## Step 4: Upload Your Research Files

### Option A: Manual Upload via Dashboard
1. Go to **Storage** > `research-uploads` bucket
2. Create folder structure: Click **New Folder** → Enter state name (e.g., "texas")
3. Navigate into folder → Create county folder
4. Upload files by dragging and dropping

### Option B: Programmatic Upload (Node.js Script)

Create a script to sync your local research folder:

```javascript
// scripts/upload-research.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadFile(localPath, remotePath) {
  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await supabase.storage
    .from('research-uploads')
    .upload(remotePath, fileBuffer, {
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      upsert: true // Overwrite if exists
    });

  if (error) {
    console.error(`❌ Error uploading ${remotePath}:`, error);
  } else {
    console.log(`✅ Uploaded: ${remotePath}`);
  }
}

// Example: Upload Harris County research
await uploadFile(
  './local-research/Texas/Harris/impound.docx',
  'texas/harris/impound.docx'
);
```

## Step 5: Verify Upload

After uploading, verify the files are accessible:

```sql
-- Check uploaded files
SELECT name, metadata, created_at
FROM storage.objects
WHERE bucket_id = 'research-uploads'
ORDER BY created_at DESC;
```

## Step 6: Trigger Processing (Future Step)

Once files are uploaded, the ingestion pipeline (in `/legal-data-factory`) will:

1. Detect new files in the bucket
2. Extract text content
3. Run the 4 agents (Librarian → Taxonomist → Researcher → Curator)
4. Write results to:
   - `sources` table (file metadata)
   - `knowledge_chunks` table (embeddings)
   - `curated_data` table (structured UI data)
   - `citations` table (extracted links)

## File Naming Conventions

### For Main Counties (Separate Topic Files)
- `impound.docx` - Impound lot info, fees, locations
- `court-info.docx` - Court addresses, hours, judges
- `scram.docx` - SCRAM providers, monitoring requirements
- `bail-bonds.docx` - Bail amounts, bond companies
- `license-reinstatement.docx` - DMV process, forms, deadlines
- `penalties.docx` - Fines, jail time, probation rules

### For Smaller Counties (Single Combined File)
- `complete-guide.docx` - All topics in one document

### Metadata in Filenames (Optional)
If you want to embed metadata in filenames:
- `harris-impound-2024-12.docx` (includes date)
- `dallas-court-verified.docx` (includes verification flag)

## Expected File Format

Your research files should include:

1. **Structured headings** (for chunking):
   ```
   # Impound Lots in Harris County

   ## ABC Towing Company
   - Address: 123 Main St, Houston, TX 77002
   - Phone: (713) 555-0100
   - Daily Fee: $45

   ## XYZ Auto Impound
   ...
   ```

2. **Source citations** (embedded as links or footnotes):
   ```
   According to the [Harris County DMV Manual](https://example.com/dmv-manual.pdf),
   you have 10 days to request a hearing.

   Source: Texas Transportation Code §724.041
   ```

3. **Dates** (for freshness tracking):
   ```
   Last Updated: December 2024
   Verified: 2024-12-15
   ```

## Troubleshooting

### "Bucket not found" error
- Ensure the bucket name is exactly `research-uploads` (lowercase, no spaces)

### "Permission denied" error
- Check RLS policies are set up correctly
- Verify you're using the `service_role` key (not the `anon` key) for uploads

### Files not processing
- Check the `sources` table to see if files were detected: `SELECT * FROM sources ORDER BY created_at DESC;`
- Check `processing_status` field for errors

## Next Steps

After uploading your Texas county research:

1. ✅ Files are in Supabase Storage
2. ⏳ Run ingestion pipeline (in `/legal-data-factory`)
3. ✅ Verify data in database tables
4. ✅ Test vector search with sample queries
5. ✅ Build UI to display curated data

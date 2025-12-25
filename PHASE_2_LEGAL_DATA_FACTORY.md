# Phase 2: Process Research Files with Legal-Data-Factory

You mentioned files are already uploaded to Supabase Storage under `texas/dallas county`.

---

## ✅ Good News: Files Already Uploaded!

Your research files are in:
```
research-uploads/
└── texas/
    └── dallas county/    <-- Your files are here!
        ├── [your .doc files]
        └── [your .docx files]
```

---

## 🚀 Next Steps: Process with Legal-Data-Factory

### Step 1: Verify Files in Storage

Run this query in Supabase SQL Editor to see your uploaded files:

```sql
-- Check what files are in storage
SELECT
  name as file_name,
  created_at,
  metadata->>'size' as file_size
FROM storage.objects
WHERE bucket_id = 'research-uploads'
  AND name LIKE 'texas/dallas%'
ORDER BY created_at DESC;
```

This shows all files uploaded for Dallas County.

---

### Step 2: Run Legal-Data-Factory Orchestrator

Now process those files:

```bash
cd /path/to/legal-data-factory

# Process all files in texas/dallas county folder
python processing/orchestrator.py --state texas --county dallas

# OR if orchestrator doesn't have those flags, process all new files
python processing/orchestrator.py --process-new
```

---

### Step 3: What the AI Will Extract

The Curator agent should extract:

**From Impound Documents:**
- Daily storage fees
- Admin/towing fees
- Lot addresses and hours
- Payment methods accepted

**From Bail Documents:**
- Typical bail ranges by offense
- Bail bond information
- Jail release procedures

**From Court Documents:**
- Arraignment timelines
- Court procedures
- Diversion program details

**Plus Gold Dust:**
- Fee waivers or exceptions
- Little-known loopholes
- Money-saving insights

---

### Step 4: Check Processing Status

Monitor progress in Supabase:

```sql
-- Check processing status
SELECT
  file_name,
  file_path,
  topic,
  processing_status,
  processing_error,
  processed_at
FROM sources
WHERE file_path LIKE 'texas/dallas%'
ORDER BY created_at DESC;
```

**Status meanings:**
- `pending` - Not processed yet
- `processing` - Currently being processed
- `completed` - Successfully processed ✅
- `error` - Failed (check processing_error column)

---

### Step 5: Check Extracted Data

See what the Curator extracted:

```sql
-- View curated data for Dallas County
SELECT
  topic,
  data,
  priority,
  verified_at
FROM curated_data
WHERE county_id = (
  SELECT id FROM counties
  WHERE slug = 'dallas'
    AND state_id = (SELECT id FROM states WHERE slug = 'texas')
)
ORDER BY priority DESC, topic;
```

**What you should see:**
- JSON objects with extracted fees, addresses, phone numbers, etc.
- Priority=10 items are "Gold Dust" insights

---

### Step 6: Check Gold Dust Insights

```sql
-- See Gold Dust discoveries
SELECT
  topic,
  data->>'key_insight' as insight,
  data->>'friction_type' as type,
  priority
FROM curated_data
WHERE county_id = (
  SELECT id FROM counties
  WHERE slug = 'dallas'
    AND state_id = (SELECT id FROM states WHERE slug = 'texas')
)
AND priority = 10
ORDER BY topic;
```

---

## 🔧 If Processing Fails

### Common Issues:

**1. File Format Not Supported**
- legal-data-factory may not handle .doc (only .docx, .pdf, .html)
- **Fix:** Convert .doc → .docx or .pdf

**2. Gemini API Key Missing**
- Curator needs Gemini to extract data
- **Fix:** Check `.env` file has `GEMINI_API_KEY=...`

**3. County Not Found in Database**
- Curator can't update county that doesn't exist
- **Fix:** Run Phase 1 SQL first (create Dallas County record)

**4. Folder Name Has Space**
- `dallas county` (with space) might cause issues
- **Fix:** Rename folder to `dallas` (no space)

---

## 📊 Expected Results

After successful processing, you should have:

1. **Records in `sources` table** - One per uploaded file
2. **Records in `knowledge_chunks` table** - Chunked text with embeddings for chat
3. **Records in `curated_data` table** - Structured JSON extractions
4. **Possibly: Citations** - Links extracted from documents

---

## 🎯 What to Do If Data Wasn't Extracted

If legal-data-factory processed files but didn't extract impound fees, bail ranges, etc:

### Option A: Manual Extraction

Read the documents yourself and add data via SQL:

```sql
-- Add whatever the AI missed
UPDATE counties SET
  typical_bail_range = '$1,000 - $5,000',
  arraignment_timeline = 'Within 48 hours of arrest'
WHERE slug = 'dallas'
  AND state_id = (SELECT id FROM states WHERE slug = 'texas');
```

### Option B: Add to curated_data Table

Store structured data directly:

```sql
-- Insert impound data
INSERT INTO curated_data (
  county_id,
  topic,
  data,
  priority
) VALUES (
  (SELECT id FROM counties WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas')),
  'impound',
  '{"daily_fee": 50.00, "admin_fee": 200.00, "lot_name": "Dallas Police Auto Pound", "lot_address": "2828 Hondo Ave, Dallas, TX 75210"}',
  5
);
```

---

## 🔄 After Processing: Update Pages

Once data is extracted, you need to update your page components to read from the right places:

**Your pages currently expect fields like:**
- `impound_daily_fee`
- `typical_bail_range_min`
- `typical_bail_range_max`

**But your database has:**
- `typical_bail_range` (TEXT)
- No impound fee columns (data is in `curated_data` table)

**Two options:**

1. **Update your page code** to read from `curated_data` table
2. **Add migration** to add the missing columns to `counties` table

Let me know which approach you prefer!

---

## ❓ Quick Troubleshooting

**Q: How do I know if orchestrator finished?**
A: Check the terminal output. Should say "Processing complete" or similar.

**Q: Files show status='error' in sources table**
A: Check `processing_error` column for details. Common: file format issue.

**Q: No records in curated_data table**
A: Curator might not have detected structured data. Check knowledge_chunks table - if those exist, RAG chat will still work.

**Q: Want to reprocess a file?**
A: Delete the source record, re-upload file, run orchestrator again.

---

## 🎬 Ready to Process?

Run this command to start:

```bash
cd /path/to/legal-data-factory
python processing/orchestrator.py --state texas --county dallas
```

Then check the queries above to verify extraction!

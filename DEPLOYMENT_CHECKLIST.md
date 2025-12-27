# Deployment Checklist

**Status:** Ready for Testing & Deployment
**Date:** December 27, 2024

---

## ✅ Completed

### Code Implementation
- [x] Brain SDK module (`/lib/brain/`)
- [x] Brain API routes (`/app/api/brain/`)
- [x] File upload + text paste UI (`/app/admin/upload/`)
- [x] Upload API route (`/app/api/admin/upload/`)
- [x] Monetization dashboard (`/app/admin/monetization/`)
- [x] Admin navigation updated
- [x] Database migration files created
- [x] Documentation completed

### Dependencies
- [x] Installed `@google/generative-ai`
- [x] Gemini API key added to `.env.local`
- [x] All TypeScript types defined
- [x] Error handling implemented

---

## ⏳ To Do (Before Testing)

### 1. Run Database Migrations

**Option A: Supabase SQL Editor (Recommended)**

Go to: https://app.supabase.com/project/cvfgqdkgxmnoozqxvcua/sql

Run each file in order:

**File 1: Vector Search Function**
```bash
cat supabase/migrations/004_vector_search_function.sql
```
Copy the output and paste in SQL Editor → Run

**File 2: Storage Bucket**
```bash
cat supabase/migrations/005_create_storage_bucket.sql
```
Copy the output and paste in SQL Editor → Run

**Option B: Supabase Dashboard (Storage Only)**

1. Go to Storage in Supabase Dashboard
2. Click "New Bucket"
3. Name: `research-documents`
4. Public: `false` (private)
5. File size limit: `10485760` (10MB)
6. Allowed MIME types:
   - `application/pdf`
   - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
   - `text/plain`

Then manually create storage policies using SQL from migration file.

### 2. Verify Environment Variables

Check `.env.local` has:
```bash
# Required
GOOGLE_GEMINI_API_KEY=AIzaSyDmwHTsxgXf0DMc41VtTvYuqq2mqttAFBg
NEXT_PUBLIC_SUPABASE_URL=https://cvfgqdkgxmnoozqxvcua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
ANTHROPIC_API_KEY=[your-anthropic-key]
ADMIN_PASSWORD=DUIGuide2024!SecureAdmin

# Optional (for later)
ADMIN_ALLOWED_IPS=your.ip.address.here
```

---

## 🧪 Testing Steps

### Test 1: Brain SDK

```bash
# Start dev server
npm run dev

# Test endpoint
curl http://localhost:3000/api/brain/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Brain SDK is working!",
  "tests": {
    "embeddingModel": {
      "model": "text-embedding-004",
      "dimensions": 768
    },
    "searchResults": {
      "count": 3,
      "results": [...]
    },
    "countyStats": {...}
  }
}
```

### Test 2: Semantic Search

```bash
curl -X POST http://localhost:3000/api/brain/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "impound fees",
    "state": "Texas",
    "county": "Harris County",
    "limit": 5
  }'
```

**Expected:** Array of search results with similarity scores

### Test 3: RAG Q&A

```bash
curl -X POST http://localhost:3000/api/brain/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How do I get my car out of impound?",
    "state": "Texas",
    "county": "Harris County"
  }'
```

**Expected:** Answer with citations and sources

### Test 4: File Upload

1. Login: `http://localhost:3000/admin/login`
   - Password: `DUIGuide2024!SecureAdmin`

2. Navigate to Upload: `http://localhost:3000/admin/upload`

3. Upload a test file:
   - Select state: Texas
   - Select county: Harris County
   - Select topic: impound
   - Upload a PDF/DOCX/TXT file (< 10MB)
   - Click "Upload"

4. Verify:
   - Success message appears
   - File appears in Processing Status page with status "pending"
   - File exists in Supabase Storage → research-documents bucket
   - Record exists in `sources` table

### Test 5: Text Paste

1. In Upload page, switch to "Text Paste" mode
2. Paste sample text (e.g., impound fee information)
3. Fill metadata
4. Upload
5. Verify same as Test 4

### Test 6: Monetization Dashboard

1. Navigate to: `http://localhost:3000/admin/monetization`
2. Verify:
   - Stats cards display (may be 0 if no leads yet)
   - Recent leads table loads
   - No console errors

---

## 🚀 Deployment (Vercel)

### 1. Add Environment Variables to Vercel

```bash
vercel env add GOOGLE_GEMINI_API_KEY
# Paste: AIzaSyDmwHTsxgXf0DMc41VtTvYuqq2mqttAFBg

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://cvfgqdkgxmnoozqxvcua.supabase.co

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste: [your-service-role-key]

vercel env add ADMIN_PASSWORD
# Paste: DUIGuide2024!SecureAdmin

# ... add all other env vars
```

### 2. Deploy

```bash
git add .
git commit -m "Add Brain SDK, file upload, and monetization dashboard"
git push origin main
```

Vercel will auto-deploy.

### 3. Post-Deployment Checks

After deployment:
- [ ] Visit `/api/brain/test` on production
- [ ] Login to admin panel
- [ ] Test file upload
- [ ] Test Brain SDK search
- [ ] Verify uploads appear in Processing Status

---

## 📊 Success Criteria

### Brain SDK
- [x] Code complete
- [ ] Migrations run
- [ ] Test endpoint returns 200
- [ ] Search returns results from 365 knowledge chunks
- [ ] Q&A generates answers with citations

### File Upload
- [x] Code complete
- [ ] Storage bucket created
- [ ] Test upload succeeds
- [ ] File appears in Supabase Storage
- [ ] Record created in sources table
- [ ] legal-data-factory picks up file (verify with other team)

### Monetization
- [x] Code complete
- [ ] Dashboard loads without errors
- [ ] Stats calculate correctly from leads/partners tables

---

## 🐛 Troubleshooting

### "Storage bucket not configured"
**Solution:** Run migration `005_create_storage_bucket.sql` or create bucket manually in Supabase Dashboard

### "RPC function match_knowledge_chunks does not exist"
**Solution:** Run migration `004_vector_search_function.sql` in Supabase SQL Editor

### "GOOGLE_GEMINI_API_KEY not set"
**Solution:** Verify `.env.local` has the API key and restart dev server

### Brain SDK returns no results
**Possible causes:**
- No data in knowledge_chunks table (check with legal-data-factory team)
- Vector index not created (run migration 004)
- Wrong state/county name (check exact spelling in database)

### File upload fails
**Possible causes:**
- Storage bucket doesn't exist (run migration 005)
- File too large (max 10MB)
- Wrong file type (only PDF, DOCX, TXT)
- Missing state_id or county_id in database

---

## 📞 Team Coordination

### Notify legal-data-factory Team

Once migrations are run and upload is tested:

1. ✅ Confirm they're monitoring the `sources` table
2. ✅ Verify they pick up files with `status='pending'`
3. ✅ Establish process for error handling
4. ✅ Agree on notification method when processing completes

### Integration Points

| What | Who | Status |
|------|-----|--------|
| Upload files → sources table | duiguide (this repo) | ✅ Complete |
| Monitor sources table | legal-data-factory | ⏳ Verify |
| Process pending files | legal-data-factory | ⏳ Verify |
| Populate knowledge_chunks | legal-data-factory | ✅ Working (365 chunks exist) |
| Query knowledge_chunks | duiguide (this repo) | ✅ Complete |
| Display on website | duiguide (this repo) | ⏳ Next phase |

---

## 📝 Next Phase (Website Integration)

After testing is complete, next steps:
1. Enhance county pages with Brain data
2. Build FAQ generation system
3. Create citation display components
4. Add interactive Q&A widget
5. Implement content recommendation

---

**Ready to test!** 🎉

Run through the testing steps above and report any issues.

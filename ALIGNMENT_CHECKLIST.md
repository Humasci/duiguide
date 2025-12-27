# Alignment Checklist with Legal-Data-Factory Team

## ✅ Already Aligned

1. **Database Schema** - We've adapted to your exact schema:
   - Using `content`, `state_id`, `county_id`, `embedding_gemini`
   - Handling `applies_to_all_counties` flag
   - Using `original_url`, `processing_status`, `verification_status`

2. **Storage Bucket** - Created `research-documents` bucket

3. **Upload Workflow** - Successfully tested upload to `sources` table with `status='pending'`

---

## 🔴 CRITICAL - Need Immediate Alignment

### 1. Vector Search Function Type Mismatch

**Issue**: `match_knowledge_chunks()` function has type error
```sql
ERROR: structure of query does not match function result type
Details: Returned type integer does not match expected type bigint in column 1
```

**What we need**:
- Can you update the function to return `id bigint` instead of `id int`?
- Or provide the correct function signature we should use?

**Current workaround**: Using keyword search fallback

---

## ⚠️ MEDIUM - Need Confirmation

### 2. Upload Processing Workflow

**Questions**:
1. **Do you monitor `sources` table for new uploads?**
   - We're inserting records with `processing_status='pending'`
   - Will your system automatically pick these up and process them?

2. **What file types do you support?**
   - We see `.docx` and `.pdf` in existing sources
   - Should we restrict uploads to these types?
   - Any other formats you support?

3. **File size limits?**
   - We currently enforce 10MB max
   - Is this acceptable?

4. **Required metadata?**
   - We're sending: `state_id`, `county_id`, `topic`, `original_url`
   - Is this sufficient?
   - Any other fields we should populate?

### 3. Storage Bucket File Type Restrictions

**Current state**: Bucket accepts any file type

**Recommendation**: Restrict to:
```
application/pdf
application/vnd.openxmlformats-officedocument.wordprocessingml.document
text/plain
```

**Question**: Does this match your processing capabilities?

### 4. Integration Method

**Question**: Should we:
- **Option A**: Continue with direct database access (current approach)
- **Option B**: Use an SDK/API package you provide
- **Option C**: Use specific RPC functions you've created

---

## 📋 MINOR - Nice to Have

### 5. Documentation

**Requests**:
1. Official schema documentation (column descriptions, expected values)
2. Processing pipeline overview (how uploads become knowledge_chunks)
3. API/SDK documentation if you have one
4. Expected processing times
5. Error handling best practices

### 6. Monitoring & Observability

**Questions**:
1. How can we monitor upload processing status?
2. Do you provide webhooks when processing completes/fails?
3. How should we handle `processing_error` status?

### 7. Data Updates & Sync

**Questions**:
1. How often do you update existing knowledge chunks?
2. Should we cache data or always query fresh?
3. Do you have a changelog/notification system for data updates?

---

## 🎯 Recommended Next Steps

1. **Immediate**: Fix `match_knowledge_chunks()` function type mismatch
2. **This week**: Confirm upload processing workflow
3. **This month**: Provide schema documentation and processing pipeline overview

---

## Contact Template

Use this template to reach out:

```
Subject: Integration Alignment - 4 Quick Questions

Hi legal-data-factory team,

We've successfully integrated with your database and uploaded our first test document (Source ID: 84). We have 4 quick questions to finalize the integration:

1. CRITICAL: The match_knowledge_chunks() function has a type mismatch (returns int, table has bigint). Can you update it to return bigint?

2. Will your system automatically process records we insert into sources with processing_status='pending'?

3. What file types do you support for processing? (We see .docx and .pdf in the data)

4. Should we restrict the storage bucket to specific MIME types?

Also, do you have:
- Schema documentation?
- Processing pipeline overview?
- Preferred integration method (direct DB vs SDK/API)?

Thanks!
Duiguide Team
```

---

## Testing After Alignment

Once we get confirmation, test these endpoints:

```bash
# 1. Test vector search (after function fix)
curl -X POST http://localhost:3000/api/brain/search \
  -H "Content-Type: application/json" \
  -d '{"query": "bail bond procedures", "options": {"limit": 5}}'

# 2. Test RAG Q&A
curl -X POST http://localhost:3000/api/brain/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I post bail in Harris County?", "context": {"state": "Texas", "county": "Harris County"}}'

# 3. Monitor upload processing
# Check if Source ID 84 gets processed
curl 'http://localhost:3000/api/admin/sources-schema' | jq '.sampleData | select(.id == 84)'
```

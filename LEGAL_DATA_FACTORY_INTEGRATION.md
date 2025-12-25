# Legal Data Factory Integration

*Last Updated: December 23, 2024*

## Overview

**DUIarrested.com** (this repo) is the **consumer-facing web application**.
**legal-data-factory** (separate repo) is the **data processing pipeline**.

They communicate through **Supabase** as the shared data layer.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (Shared Layer)                  │
├─────────────────────────────────────────────────────────────┤
│  Storage Bucket: research-uploads/                          │
│    ├── texas/harris/impound.pdf                            │
│    ├── texas/harris/court-procedures.docx                  │
│    └── arizona/maricopa/bail-schedule.pdf                  │
│                                                              │
│  Tables:                                                     │
│    ├── sources (file metadata)                             │
│    ├── knowledge_chunks (vector embeddings)                │
│    ├── curated_data (structured extractions)               │
│    ├── citations (source links)                            │
│    ├── states (DUI laws, penalties)                        │
│    └── counties (court, bail, impound data)                │
└─────────────────────────────────────────────────────────────┘
         ▲                                    ▲
         │                                    │
         │ WRITES                        READS│
         │                                    │
┌────────┴──────────┐            ┌───────────┴────────────┐
│ legal-data-factory│            │   DUIarrested.com      │
│  (Python Agents)  │            │  (Next.js Web App)     │
├───────────────────┤            ├────────────────────────┤
│ Ingestion Brain   │            │ Interaction Brain      │
│                   │            │                        │
│ ✓ Librarian       │            │ ✓ Web Pages            │
│ ✓ Taxonomist      │            │ ✓ Chat Interface       │
│ ✓ Researcher      │            │ ✓ Lead Forms           │
│ ✓ Curator         │            │ ✓ Admin Dashboard      │
│ ✓ Vector Janitor  │            │                        │
│ ✓ Change Detector │            │                        │
└───────────────────┘            └────────────────────────┘
```

---

## Data Flow

### 1. Manual Research Upload → Processing

**Step 1**: Researcher uploads files to Supabase Storage
```bash
# In legal-data-factory repo
python scripts/upload-research.py \
  --file harris-county-impound-fees.pdf \
  --state texas \
  --county harris \
  --topic impound
```

**Step 2**: File uploaded to `research-uploads/texas/harris/impound/`

**Step 3**: Ingestion pipeline runs (legal-data-factory)
```bash
# Orchestrator runs all agents in sequence
python processing/orchestrator.py --process-new
```

**Step 4**: Agents process the file:
- **Librarian**: Converts PDF → clean markdown text
- **Taxonomist**: Tags with `phase="PHASE_1_ARREST"`, `topic="impound"`
- **Researcher**: Extracts citations/URLs
- **Curator**: Extracts structured data:
  ```json
  {
    "impound_daily_fee": 45.00,
    "impound_admin_fee": 150.00,
    "impound_lot_name": "Harris County Auto Pound",
    "impound_lot_address": "123 Main St, Houston, TX 77002",
    "impound_release_hours": "Mon-Fri 8AM-5PM"
  }
  ```
- **Embeddings**: Generates Gemini text-embedding-004 vectors

**Step 5**: Data written to Supabase tables:
- `sources` table: File metadata
- `knowledge_chunks` table: Text + embeddings
- `curated_data` table: Structured JSON
- `citations` table: Source links
- `counties` table: Updates Harris County record

---

### 2. Web App Consumption

**Step 1**: User visits `https://duiarrested.com/texas/harris/impound/`

**Step 2**: Next.js page fetches data from Supabase
```typescript
// app/texas/harris/impound/page.tsx
const { data: county } = await supabase
  .from('counties')
  .select('*, state:states(*)')
  .eq('slug', 'harris')
  .single();

// Inject into template
<p>Daily fee: ${county.impound_daily_fee}</p>
<p>Lot address: {county.impound_lot_address}</p>
```

**Step 3**: User asks question in chat: "How much to get my car out?"

**Step 4**: Chat API generates embedding, searches `knowledge_chunks`
```typescript
// app/api/chat/route.ts
const embedding = await generateEmbedding(question);

const { data: chunks } = await supabase.rpc('match_documents', {
  query_embedding: embedding,
  match_count: 5,
  filter: { county_id: countyId, topic: 'impound' }
});

// Send to Gemini 2.0 Flash with chunks as context
const response = await gemini.generateContent({
  prompt: question,
  context: chunks.map(c => c.content).join('\n\n')
});
```

---

## Integration Points

### 1. Supabase Storage Bucket

**Bucket Name**: `research-uploads`

**Structure**:
```
research-uploads/
├── texas/
│   ├── harris/
│   │   ├── impound/
│   │   │   ├── impound-fees-2024.pdf
│   │   │   └── pound-locations.docx
│   │   ├── court/
│   │   │   ├── court-procedures.pdf
│   │   │   └── arraignment-timeline.html
│   │   ├── bail/
│   │   │   └── harris-bail-schedule.pdf
│   │   └── scram/
│   │       └── scram-providers.md
│   ├── dallas/
│   └── ... (other counties)
├── arizona/
│   ├── maricopa/
│   └── ... (other counties)
└── ... (other states)
```

**Access**:
- **legal-data-factory**: Read/write access (service role key)
- **DUIarrested.com**: Read-only access (public bucket for processed files)

---

### 2. Database Tables (Shared)

#### `sources` table
**Owner**: legal-data-factory (writes)
**Consumer**: DUIarrested.com (reads for citations)

```sql
-- Example record
{
  "id": 123,
  "file_name": "impound-fees-2024.pdf",
  "file_path": "texas/harris/impound/impound-fees-2024.pdf",
  "state_id": 1,  -- Texas
  "county_id": 48,  -- Harris
  "topic": "impound",
  "phase": "PHASE_1_ARREST",
  "processing_status": "completed",
  "last_verified": "2024-12-15T10:30:00Z"
}
```

#### `knowledge_chunks` table
**Owner**: legal-data-factory (writes)
**Consumer**: DUIarrested.com (reads for RAG chat)

```sql
-- Example record
{
  "id": 4567,
  "source_id": 123,
  "content": "Harris County impound lots charge $45 per day for storage...",
  "embedding_gemini": [0.023, -0.156, ...],  -- 768 dimensions
  "county_id": 48,
  "topic": "impound",
  "chunk_index": 5
}
```

#### `curated_data` table
**Owner**: legal-data-factory (writes)
**Consumer**: DUIarrested.com (reads for UI components)

```sql
-- Example record
{
  "id": 89,
  "source_id": 123,
  "county_id": 48,
  "data_type": "impound_fees",
  "extracted_data": {
    "daily_fee": 45.00,
    "admin_fee": 150.00,
    "lot_name": "Harris County Auto Pound",
    "lot_address": "123 Main St, Houston, TX 77002",
    "hours": "Mon-Fri 8AM-5PM",
    "payment_methods": ["Cash", "Credit Card", "Money Order"]
  }
}
```

#### `counties` table
**Owner**: Both repos
**Writer**: legal-data-factory (auto-updates from curated_data)
**Consumer**: DUIarrested.com (primary source for page generation)

```sql
-- Curator agent updates this table automatically
UPDATE counties SET
  impound_daily_fee = 45.00,
  impound_admin_fee = 150.00,
  impound_lot_name = 'Harris County Auto Pound',
  last_verified_at = NOW()
WHERE id = 48;
```

---

## Webhooks & Triggers

### Option 1: Supabase Database Triggers (Recommended)

When legal-data-factory completes processing, trigger Next.js revalidation:

```sql
-- In Supabase
CREATE OR REPLACE FUNCTION notify_nextjs_revalidate()
RETURNS TRIGGER AS $$
BEGIN
  -- Call Next.js revalidation webhook
  PERFORM net.http_post(
    url := 'https://duiarrested.com/api/revalidate?secret=xxx',
    body := json_build_object(
      'state', NEW.state_slug,
      'county', NEW.county_slug
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_county_update
AFTER UPDATE ON counties
FOR EACH ROW
EXECUTE FUNCTION notify_nextjs_revalidate();
```

### Option 2: Manual Webhook Call (Current)

legal-data-factory calls webhook after processing:

```python
# In legal-data-factory/processing/orchestrator.py
import requests

def notify_website_update(state, county):
    requests.post(
        'https://duiarrested.com/api/revalidate',
        params={'secret': os.getenv('REVALIDATION_SECRET')},
        json={'state': state, 'county': county}
    )
```

---

## Environment Variables

### DUIarrested.com (.env.local)
```bash
# Supabase (read-only for public, read-write for API routes)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # For admin routes

# Revalidation
REVALIDATION_SECRET=your-secret-here

# Admin (internal only)
ADMIN_PASSWORD=your-admin-password
```

### legal-data-factory (.env)
```bash
# Supabase (full write access)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI APIs
GEMINI_API_KEY=AIzaSy...
ANTHROPIC_API_KEY=sk-ant-...

# Webhook
NEXTJS_REVALIDATION_URL=https://duiarrested.com/api/revalidate
NEXTJS_REVALIDATION_SECRET=your-secret-here
```

---

## Workflow: Adding New County Data

### Scenario: Researcher completes Dallas County, Texas research

**Step 1**: Upload files (in legal-data-factory)
```bash
python scripts/upload-research.py \
  --file dallas-impound.pdf \
  --state texas \
  --county dallas \
  --topic impound

python scripts/upload-research.py \
  --file dallas-court-info.docx \
  --state texas \
  --county dallas \
  --topic court
```

**Step 2**: Run ingestion pipeline
```bash
python processing/orchestrator.py --state texas --county dallas
```

**Output**:
```
✓ Librarian: Converted 2 files → markdown
✓ Taxonomist: Tagged 2 files (phase, topic)
✓ Researcher: Extracted 15 citations
✓ Curator: Extracted structured data:
  - impound_daily_fee: $50
  - court_name: Dallas County Criminal Court
  - court_address: 133 N Riverfront Blvd, Dallas, TX 75207
✓ Embeddings: Generated 47 chunks with embeddings
✓ Database: Updated counties table (dallas)
✓ Webhook: Notified DUIarrested.com to revalidate /texas/dallas/
```

**Step 3**: Verify on website
- Visit `https://duiarrested.com/texas/dallas/impound/`
- Should show: "$50/day" (new data)
- Chat should answer Dallas-specific questions

---

## Current Status

### ✅ What Works
- Supabase tables all created (004_brain_system.sql deployed)
- Storage bucket `research-uploads` exists
- DUIarrested.com can read from Supabase
- Revalidation webhook endpoint exists (`/api/revalidate`)

### ⚠️ What Needs Setup

**In legal-data-factory repo**:
- [ ] Confirm all agents are functional (Librarian, Taxonomist, Curator, etc.)
- [ ] Test orchestrator.py with sample file
- [ ] Set up automated webhook calls after processing
- [ ] Create upload script for easy file ingestion

**In DUIarrested.com repo**:
- [ ] Test revalidation webhook
- [ ] Verify chat API can query knowledge_chunks
- [ ] Build admin interface to view processing status

---

## Questions for You

1. **legal-data-factory status**: Are the agents working? Any issues with processing?
2. **Research data**: How much is already in `research-uploads`? Just Harris County or more?
3. **Webhook setup**: Should we use database triggers or manual webhook calls?
4. **Processing schedule**: Should ingestion run on-demand or scheduled (e.g., nightly)?
5. **Admin visibility**: Should DUIarrested.com have a dashboard showing:
   - Files uploaded
   - Processing status
   - Last verified dates
   - Missing data for counties

Let me know what's needed on the legal-data-factory side and I can help coordinate!

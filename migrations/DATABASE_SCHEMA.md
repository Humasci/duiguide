# DUI Guide - Complete Database Schema Documentation

## Overview

This database supports a **Hybrid RAG (Retrieval-Augmented Generation)** system with:
- **Programmatic SEO** (county-specific content at scale)
- **AI Chat Brain** (contextual Q&A with citations)
- **Manual Research Integration** (structured data extraction)

---

## Table of Contents

1. [Core Geographic Tables](#core-geographic-tables)
2. [Brain System Tables](#brain-system-tables)
3. [Service Provider Tables](#service-provider-tables)
4. [Content Generation Tables](#content-generation-tables)
5. [Relationships & ERD](#relationships--erd)
6. [Key Indexes](#key-indexes)
7. [RPC Functions](#rpc-functions)
8. [Usage Examples](#usage-examples)

---

## Core Geographic Tables

### `states`
Master state information and DUI laws.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(50)) - "Texas"
- `abbreviation` (CHAR(2)) - "TX"
- `slug` (VARCHAR(50)) - "texas"
- `dui_laws` (JSONB) - State-specific laws, penalties, timelines
- `master_content` (JSONB) - Pre-generated content templates
- `meta_title`, `meta_description` (TEXT) - SEO
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: 7 target states with master legal frameworks

---

### `counties`
Detailed local information for each county.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- `state_id` (INTEGER FK → states)
- `name` (VARCHAR(100)) - "Harris"
- `slug` (VARCHAR(100)) - "harris"
- `fips_code` (VARCHAR(5))
- `population` (INTEGER)
- **Court Info**:
  - `court_name`, `court_address`, `court_phone`, `court_hours`, `court_website`
- **Bail/Penalties**:
  - `typical_bail_range`, `avg_case_duration_days`
- **Generated Content**:
  - `page_content` (JSONB) - Pre-rendered content blocks
  - `content_generated_at`, `content_needs_update`
- **SEO**: `meta_title`, `meta_description`
- **Tiers**: `tier` (1=custom, 2=semi-custom, 3=template)
- **Priority**: `priority_score` (for generation order)
- **Location**: `latitude`, `longitude`
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: ~3,000+ counties with varying detail levels

---

## Brain System Tables

### `sources` 📚
Master library of all uploaded research files.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- **File Metadata**:
  - `file_name` (TEXT) - "impound.docx"
  - `file_type` (TEXT) - 'pdf', 'docx', 'html', 'markdown'
  - `file_path` (TEXT) - "texas/harris/impound.docx"
  - `file_hash` (TEXT) - SHA256 for change detection
  - `file_size_bytes` (INTEGER)
- **Geographic Scope**:
  - `state_id` (INTEGER FK → states)
  - `county_id` (INTEGER FK → counties)
  - `applies_to_all_counties` (BOOLEAN) - For state-wide laws
- **Categorization** (auto-tagged by Taxonomist):
  - `phase` (TEXT) - 'PHASE_1_ARREST', 'PHASE_2_CRITICAL_WINDOW', etc.
  - `topic` (TEXT) - 'impound', 'court', 'scram', 'bail', 'dmv', 'license'
- **Source Tracking**:
  - `source_type` (TEXT) - 'manual_research', 'scraped', 'official_doc'
  - `original_url` (TEXT) - If scraped
- **Processing**:
  - `processing_status` (TEXT) - 'pending', 'processing', 'completed', 'error'
  - `processing_error` (TEXT)
  - `processed_at` (TIMESTAMPTZ)
- **Archival**:
  - `is_archived` (BOOLEAN)
  - `archive_reason` (TEXT)
  - `archived_at` (TIMESTAMPTZ)
- **Verification**:
  - `last_verified` (TIMESTAMPTZ)
  - `verification_status` (TEXT) - 'unverified', 'verified', 'outdated'
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: Track every research file uploaded to Supabase Storage

**Key Indexes**:
- `idx_sources_state_county` - Fast filtering by location
- `idx_sources_phase` - By DUI process phase
- `idx_sources_topic` - By legal topic
- `idx_sources_file_hash` - Change detection

---

### `knowledge_chunks` 🧠
Chunked text with vector embeddings for semantic search.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- `source_id` (INTEGER FK → sources) - Parent file
- **Geographic Scope** (denormalized for speed):
  - `state_id` (INTEGER FK → states)
  - `county_id` (INTEGER FK → counties)
  - `applies_to_all_counties` (BOOLEAN)
- **Categorization** (denormalized):
  - `phase` (TEXT NOT NULL)
  - `topic` (TEXT NOT NULL)
- **Content**:
  - `content` (TEXT NOT NULL) - The actual text chunk
  - `chunk_index` (INTEGER) - Order within source
- **Vector Embeddings**:
  - `embedding_gemini` (vector(768)) - **Active**: Gemini text-embedding-004
  - `embedding_openai` (vector(1536)) - Optional: For A/B testing
- **Metadata**:
  - `heading` (TEXT) - Section heading (if from a # Heading)
  - `page_number` (INTEGER) - For PDFs
- **Archival**:
  - `is_archived` (BOOLEAN)
  - `archive_warning` (TEXT) - "Info from 2023, may be outdated"
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: Semantic search database for RAG (Retrieval-Augmented Generation)

**Key Indexes**:
- `idx_chunks_state_county` - Geographic filtering
- `idx_chunks_phase`, `idx_chunks_topic` - Category filtering
- **`idx_chunks_embedding_gemini`** (IVFFlat) - **CRITICAL**: Vector similarity search

**Typical Row**:
```json
{
  "id": 1,
  "source_id": 5,
  "state_id": 1,
  "county_id": 15,
  "phase": "PHASE_1_ARREST",
  "topic": "impound",
  "content": "ABC Towing in Harris County charges $45/day storage...",
  "chunk_index": 0,
  "heading": "Impound Lot Fees",
  "embedding_gemini": [0.012, -0.034, ...], // 768 dimensions
  "is_archived": false
}
```

---

### `curated_data` 🎨
Structured data extracted for UI display (not chat).

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- `source_id` (INTEGER FK → sources)
- `state_id` (INTEGER FK → states)
- `county_id` (INTEGER FK → counties)
- `topic` (TEXT NOT NULL)
- **Structured Data**:
  - `data` (JSONB NOT NULL) - Flexible structured content
- **Verification**:
  - `is_verified` (BOOLEAN)
  - `verified_by` (TEXT) - 'ai_agent', 'human_reviewer', 'legal_expert'
  - `verified_at` (TIMESTAMPTZ)
- `priority` (INTEGER) - Display priority (higher = show first)
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: Pre-processed UI components (cards, tables, lists)

**Unique Constraint**: `(state_id, county_id, topic)` - One entry per topic per county

**Example Data**:

```json
// Topic: "impound"
{
  "lots": [
    {
      "name": "ABC Towing",
      "address": "123 Main St, Houston, TX",
      "phone": "(713) 555-0100",
      "daily_fee": 45,
      "hours": "24/7",
      "payment_methods": ["Cash", "Credit Card"]
    },
    {
      "name": "XYZ Auto Impound",
      "address": "456 Oak Ave, Houston, TX",
      "phone": "(713) 555-0200",
      "daily_fee": 50,
      "hours": "Mon-Fri 8am-6pm"
    }
  ],
  "average_retrieval_cost": 450,
  "required_documents": ["ID", "Vehicle Registration", "Proof of Insurance"]
}

// Topic: "dmv"
{
  "deadline_days": 10,
  "hearing_location": "Harris County Justice Center, Room 201",
  "required_forms": ["DL-14A", "SR-22"],
  "filing_fee": 125,
  "online_request_url": "https://texas.gov/dmv-hearing"
}

// Topic: "court"
{
  "court_name": "Harris County Criminal Court at Law No. 1",
  "address": "1201 Franklin St, Houston, TX 77002",
  "phone": "(713) 274-8686",
  "hours": "Monday-Friday 8:00 AM - 4:30 PM",
  "judges": [
    {"name": "Hon. Sarah Johnson", "courtroom": "6A"},
    {"name": "Hon. Michael Chen", "courtroom": "6B"}
  ],
  "typical_arraignment_wait_days": 14
}
```

---

### `citations` 📖
Source links and citations for anti-hallucination.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- `source_id` (INTEGER FK → sources)
- **Citation Details**:
  - `citation_text` (TEXT NOT NULL) - "Texas Penal Code §49.04"
  - `citation_type` (TEXT) - 'statute', 'case_law', 'regulation', 'manual', 'website'
- **Link**:
  - `url` (TEXT)
  - `page_reference` (TEXT) - "Page 12", "Section 3.2"
- **Metadata**:
  - `is_verified` (BOOLEAN)
  - `last_checked` (TIMESTAMPTZ)
  - `link_status` (TEXT) - 'unchecked', 'active', 'broken', 'redirected'
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Purpose**: Track source citations for AI responses

**Example Rows**:
```sql
INSERT INTO citations (source_id, citation_text, citation_type, url) VALUES
  (5, 'Texas Transportation Code §724.041', 'statute', 'https://statutes.capitol.texas.gov/...'),
  (5, 'Harris County DMV Administrative Manual 2024', 'manual', 'https://harriscountytx.gov/dmv.pdf'),
  (7, 'Texas DPS Website - License Suspension', 'website', 'https://dps.texas.gov/...');
```

---

### `chat_feedback` 💬
User feedback on AI responses for quality control.

**Columns**:
- `id` (SERIAL PRIMARY KEY)
- **Geographic Context**:
  - `state_id` (INTEGER FK → states)
  - `county_id` (INTEGER FK → counties)
- **The Interaction**:
  - `user_question` (TEXT NOT NULL)
  - `ai_response` (TEXT NOT NULL)
  - `retrieved_chunk_ids` (INTEGER[]) - Array of `knowledge_chunks.id` used
- **User Feedback**:
  - `feedback_type` (TEXT NOT NULL) - 'helpful', 'incorrect', 'incomplete', 'outdated'
  - `user_comment` (TEXT)
- **Triage**:
  - `requires_review` (BOOLEAN)
  - `reviewed_by` (TEXT)
  - `reviewed_at` (TIMESTAMPTZ)
  - `resolution_notes` (TEXT)
- `created_at` (TIMESTAMPTZ)

**Purpose**: Detect hallucinations, improve responses, legal compliance

---

## Service Provider Tables

### `scram_providers`
Local SCRAM monitoring companies.

**Columns**:
- `id`, `county_id` (FK → counties)
- `name`, `address`, `phone`, `website`
- `services` (TEXT[]) - 'SCRAM CAM', 'Alcohol Monitoring', etc.
- `daily_cost_min`, `daily_cost_max`, `setup_fee`
- `hours`, `notes`
- `is_verified`

---

### `attorneys`
Local DUI attorneys.

**Columns**:
- `id`, `county_id` (FK → counties)
- `name`, `firm_name`, `address`, `phone`, `website`
- `specializes_in` (TEXT[])
- `years_experience`, `bar_number`
- `rating`, `review_count`
- `consultation_fee`, `hourly_rate_min`, `hourly_rate_max`
- `languages` (TEXT[])
- `is_verified`

---

## Content Generation Tables

### `special_content_pages`
High-value content pages (SCRAM, Second DUI, CDL DUI).

**Columns**:
- `id`, `state_id`, `county_id` (FKs)
- `page_type` (VARCHAR(50)) - 'scram_guide', 'second_dui', 'cdl_dui'
- `slug`, `title`
- `content` (JSONB) - Generated content blocks
- `meta_title`, `meta_description`
- `target_keywords` (TEXT[])
- `search_volume`, `keyword_difficulty`
- `is_published`

---

### `content_generation_logs`
Tracking AI generation costs and performance.

**Columns**:
- `id`, `entity_type`, `entity_id`
- `content_type` - 'master_content', 'page_content', 'scram_guide'
- `model_used`, `input_tokens`, `output_tokens`
- `cost_cents`, `generation_time_ms`
- `status`, `error_message`

---

### `knowledge_base`
Legacy table for FAQ-style content (non-RAG).

**Columns**:
- `id` (UUID), `category`, `subcategory`
- `state_id`, `county_id` (FKs)
- `topic`, `question`, `answer`, `content`
- `keywords` (TEXT[])
- `requires_disclaimer`, `is_legal_advice`
- `source_url`, `source_title`, `last_verified`

---

## Relationships & ERD

```
states (1) ──┬──> (Many) counties
             │
             ├──> sources
             ├──> knowledge_chunks
             ├──> curated_data
             └──> special_content_pages

counties (1) ─┬──> (Many) sources
              ├──> knowledge_chunks
              ├──> curated_data
              ├──> scram_providers
              ├──> attorneys
              └──> chat_feedback

sources (1) ──┬──> (Many) knowledge_chunks
              ├──> curated_data
              └──> citations
```

---

## Key Indexes

**Performance-Critical**:

1. **Vector Search**:
   ```sql
   idx_chunks_embedding_gemini (IVFFlat, vector_cosine_ops)
   -- Enables fast similarity search on 768-dim vectors
   ```

2. **Geographic Filtering**:
   ```sql
   idx_sources_state_county (state_id, county_id)
   idx_chunks_state_county (state_id, county_id)
   idx_curated_state_county (state_id, county_id)
   ```

3. **Category Filtering**:
   ```sql
   idx_chunks_phase (phase)
   idx_chunks_topic (topic)
   ```

4. **Change Detection**:
   ```sql
   idx_sources_file_hash (file_hash)
   -- Detects when files are updated
   ```

---

## RPC Functions

### `match_knowledge_chunks()`
**Purpose**: Semantic search with geographic/topic filtering

**Signature**:
```sql
match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5,
  filter_state_id INT DEFAULT NULL,
  filter_county_id INT DEFAULT NULL,
  filter_phase TEXT DEFAULT NULL,
  filter_topic TEXT DEFAULT NULL,
  include_archived BOOLEAN DEFAULT false
)
RETURNS TABLE (
  chunk_id INT,
  content TEXT,
  phase TEXT,
  topic TEXT,
  source_file_name TEXT,
  source_url TEXT,
  heading TEXT,
  similarity FLOAT,
  is_archived BOOLEAN,
  archive_warning TEXT
)
```

**Usage**:
```sql
-- Find relevant chunks for "Can I drive to work?" in Harris County DMV context
SELECT * FROM match_knowledge_chunks(
  query_embedding := <embedding_vector>,
  filter_state_id := 1,      -- Texas
  filter_county_id := 15,    -- Harris
  filter_phase := 'PHASE_2_CRITICAL_WINDOW',
  filter_topic := 'dmv',
  match_count := 5
);
```

---

### `get_curated_page_data()`
**Purpose**: Fetch pre-processed UI data for a county page

**Signature**:
```sql
get_curated_page_data(
  p_state_id INT,
  p_county_id INT,
  p_topic TEXT
)
RETURNS JSONB
```

**Usage**:
```sql
-- Get impound lot data for Harris County
SELECT get_curated_page_data(1, 15, 'impound');
-- Returns: {"lots": [...], "average_retrieval_cost": 450, ...}
```

---

## Usage Examples

### 1. Upload & Process Research File

```javascript
// Step 1: Upload to Supabase Storage
const { data } = await supabase.storage
  .from('research-uploads')
  .upload('texas/harris/impound.docx', file);

// Step 2: Create source record
const { data: source } = await supabase
  .from('sources')
  .insert({
    file_name: 'impound.docx',
    file_type: 'docx',
    file_path: 'texas/harris/impound.docx',
    state_id: 1,
    county_id: 15,
    processing_status: 'pending'
  })
  .select()
  .single();

// Step 3: Trigger processing (in /legal-data-factory)
// - Librarian extracts text
// - Taxonomist tags phase/topic
// - Creates knowledge_chunks with embeddings
// - Creates curated_data with structured info
// - Creates citations from links
```

### 2. Render County Page (SSR)

```typescript
// app/texas/harris/impound/page.tsx
export default async function ImpoundPage() {
  // Fetch curated data (instant, no AI)
  const { data } = await supabase
    .rpc('get_curated_page_data', {
      p_state_id: 1,
      p_county_id: 15,
      p_topic: 'impound'
    });

  return (
    <div>
      <h1>Impound Lots in Harris County</h1>
      {data.lots.map(lot => (
        <Card key={lot.name}>
          <h3>{lot.name}</h3>
          <p>{lot.address}</p>
          <p>Daily Fee: ${lot.daily_fee}</p>
        </Card>
      ))}
    </div>
  );
}
```

### 3. Chat Query (Runtime)

```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages, context } = await req.json();
  const question = messages[messages.length - 1].content;

  // 1. Generate embedding
  const embedding = await generateEmbedding(question); // Gemini API

  // 2. Search database
  const { data: chunks } = await supabase
    .rpc('match_knowledge_chunks', {
      query_embedding: embedding,
      filter_state_id: context.state_id,
      filter_county_id: context.county_id,
      filter_phase: context.phase,
      filter_topic: context.topic
    });

  // 3. Build prompt
  const systemPrompt = `
    You are a DUI legal assistant for ${context.county}.
    ONLY answer using the CONTEXT below.
    ALWAYS cite sources.

    CONTEXT:
    ${chunks.map(c => c.content).join('\n\n')}
  `;

  // 4. Call Gemini
  const response = await gemini.generateContent({
    messages: [{ role: 'system', content: systemPrompt }, ...messages]
  });

  return new StreamingTextResponse(response);
}
```

### 4. Monitor Quality (Feedback)

```sql
-- Find responses marked as "incorrect"
SELECT
  county_id,
  user_question,
  ai_response,
  user_comment,
  created_at
FROM chat_feedback
WHERE feedback_type = 'incorrect'
  AND requires_review = true
ORDER BY created_at DESC
LIMIT 20;

-- Review what chunks were used
SELECT
  cf.user_question,
  kc.content,
  kc.source_id,
  s.file_name
FROM chat_feedback cf
JOIN LATERAL unnest(cf.retrieved_chunk_ids) AS chunk_id ON true
JOIN knowledge_chunks kc ON kc.id = chunk_id
JOIN sources s ON s.id = kc.source_id
WHERE cf.id = 123;
```

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    1. INGESTION PHASE                        │
│            (Runs offline in /legal-data-factory)             │
└─────────────────────────────────────────────────────────────┘
   [Manual Upload to Supabase Storage]
              ↓
   [Insert record into `sources` table]
              ↓
   [4 Agents Process File]
    - Librarian: Extract text
    - Taxonomist: Tag state/county/phase/topic
    - Researcher: Extract citations
    - Curator: Extract structured data
              ↓
   [Write Results to Database]
    → knowledge_chunks (with embeddings)
    → curated_data (JSONB)
    → citations

┌─────────────────────────────────────────────────────────────┐
│                    2. PAGE LOAD PHASE                        │
│              (Runs on-demand in Next.js)                     │
└─────────────────────────────────────────────────────────────┘
   [User visits /texas/harris/impound]
              ↓
   [Server-side fetch from `curated_data`]
              ↓
   [Render static content instantly]
    - Impound lot cards
    - Fees, addresses, hours
              ↓
   [Chat component ready with context]
    context = {state: TX, county: harris, topic: impound}

┌─────────────────────────────────────────────────────────────┐
│                    3. CHAT INTERACTION                       │
│                (Runs on-demand via API)                      │
└─────────────────────────────────────────────────────────────┘
   [User asks: "Where is ABC Towing?"]
              ↓
   [Generate embedding via Gemini API]
              ↓
   [Call match_knowledge_chunks() RPC]
    Filters: state_id=1, county_id=15, topic=impound
              ↓
   [Retrieve top 5 chunks (with citations)]
              ↓
   [Send chunks + question to Gemini 2.0 Flash]
              ↓
   [Stream response with sources]
    "ABC Towing is at 123 Main St. Source: harris-impound.docx"

┌─────────────────────────────────────────────────────────────┐
│                    4. FEEDBACK LOOP                          │
│              (Runs asynchronously)                           │
└─────────────────────────────────────────────────────────────┘
   [User clicks "Report Incorrect Info"]
              ↓
   [Insert into `chat_feedback`]
    requires_review = true
              ↓
   [Human reviews in admin panel]
              ↓
   [Update source or mark chunk as archived]
```

---

## Maintenance Tasks

### Monthly: Re-scan Sources
```sql
-- Find sources that haven't been verified in 30 days
SELECT * FROM sources
WHERE last_verified < NOW() - INTERVAL '30 days'
  OR last_verified IS NULL;

-- Trigger re-processing (in /legal-data-factory)
```

### Quarterly: Clean Up Embeddings
```sql
-- Find duplicate chunks (cosine similarity > 0.98)
SELECT a.id, b.id, 1 - (a.embedding_gemini <=> b.embedding_gemini) AS similarity
FROM knowledge_chunks a
JOIN knowledge_chunks b ON a.id < b.id
WHERE a.county_id = b.county_id
  AND 1 - (a.embedding_gemini <=> b.embedding_gemini) > 0.98;

-- Archive one of the duplicates
```

### Weekly: Check Broken Links
```sql
-- Find citations that need checking
SELECT * FROM citations
WHERE link_status IN ('unchecked', 'broken')
  AND last_checked < NOW() - INTERVAL '7 days'
LIMIT 100;

-- Run link checker script
```

---

## Security & Permissions

### Row Level Security (RLS)

All brain tables have RLS enabled:

1. **Public read access** (these are public legal resources)
2. **Service role full access** (for backend processing)
3. **Authenticated users can submit feedback**

### API Keys Required

- **Supabase**:
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (frontend, read-only)
  - `SUPABASE_SERVICE_ROLE_KEY` (backend, full access)

- **Gemini**:
  - `GEMINI_API_KEY` (for embeddings + chat)

---

## Migration Checklist

- [x] `001_dui_content_tables.sql` - States, counties, service providers
- [x] `002_complete_schema.sql` - Extended content tables
- [x] `003_knowledge_base.sql` - Legacy knowledge base
- [x] `004_brain_system.sql` - **NEW**: Complete RAG infrastructure

---

## Next Steps

1. **Run migrations** in Supabase SQL Editor
2. **Set up Storage bucket** (see `STORAGE_SETUP.md`)
3. **Upload Texas research** for 15 counties
4. **Build ingestion agents** (in `/legal-data-factory`)
5. **Test vector search** with sample queries
6. **Build chat API** (`/app/api/chat/route.ts`)
7. **Build UI components** (BrainDrawer, curated data displays)

---

**Questions?** See:
- `/brain/README.md` - Architecture overview
- `/migrations/STORAGE_SETUP.md` - File upload guide
- `/migrations/004_brain_system.sql` - Full SQL schema

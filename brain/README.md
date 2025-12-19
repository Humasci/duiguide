# Brain System - Architecture Overview

## ⚠️ Important Note

**The heavy processing logic (ingestion agents, scrapers, file processing) does NOT live in this repo.**

This folder contains only **minimal documentation and references** for the Brain System.

**The actual "brain" lives in**: `/legal-data-factory` repository

---

## What Lives in THIS Repo (`/duiguide`)

This repo is the **Next.js web application** - the "Consumer Brain" (user-facing):

```
/duiguide
├── /app
│   ├── /api/chat/route.ts       ← Interaction Brain API (queries Supabase, calls Gemini)
│   └── /[state]/[county]/...    ← Dynamic county pages
├── /components
│   ├── BrainContext.tsx          ← React Context for Brain state
│   └── MobileBrainDrawer.tsx     ← Chat UI component
├── /lib
│   └── /supabase                 ← Supabase client (read-only access)
└── /brain                         ← ⚠️ THIS FOLDER (documentation only)
    └── README.md
```

---

## What Lives in `/legal-data-factory` Repo

The **data processing pipeline** - the "Processing Brain" (backend):

```
/legal-data-factory
├── /miners
│   └── hunter-killer-v2.py       ← Web scrapers
├── /agents
│   ├── librarian.py               ← Converts PDFs/DOCX/HTML → Markdown
│   ├── taxonomist.py              ← Classifies by state/county/phase/topic
│   ├── researcher.py              ← Extracts citations and links
│   ├── curator.py                 ← Extracts structured data for UI
│   ├── vector-janitor.py          ← Cleans up duplicate embeddings
│   └── change-detector.py         ← Monthly re-scan for updates
├── /processing
│   └── orchestrator.py            ← Runs agents in sequence/parallel
└── requirements.txt               ← Python dependencies
```

---

## The "Two-Lobe Brain" Architecture

### **Ingestion Brain** (Offline - `/legal-data-factory`)

**When it runs**: When new research files are uploaded or monthly re-scan

**What it does**:
1. Reads files from Supabase Storage (`research-uploads` bucket)
2. Processes through 4 agents:
   - **Librarian**: Converts files → clean text
   - **Taxonomist**: Tags with state/county/phase/topic
   - **Researcher**: Extracts citations/links
   - **Curator**: Extracts structured data (addresses, fees, deadlines)
3. Generates embeddings (Gemini text-embedding-004)
4. Writes to Supabase tables:
   - `sources` - File metadata
   - `knowledge_chunks` - Text chunks + embeddings
   - `curated_data` - Structured UI data
   - `citations` - Source links

**Output**: Database is populated with searchable, structured knowledge

---

### **Interaction Brain** (Runtime - THIS REPO)

**When it runs**: When a user asks a question in the chat

**What it does**:
1. User asks: *"Can I drive to work after a DUI in Harris County?"*
2. API route (`/api/chat/route.ts`):
   - Converts question → embedding (Gemini API)
   - Searches `knowledge_chunks` table using vector similarity
   - Filters by: `state_id`, `county_id`, `phase`, `topic`
   - Retrieves top 5 relevant chunks
3. Sends chunks + question to Gemini 2.0 Flash
4. Streams response to user with citations

**Output**: User gets accurate, county-specific answer with sources

---

## How They Connect

```
[User uploads research.docx to Supabase Storage]
              ↓
[/legal-data-factory agents process file]
              ↓
[Writes to Supabase tables: sources, knowledge_chunks, curated_data]
              ↓
[/duiguide Next.js app reads from Supabase]
              ↓
[User visits /texas/harris/impound page]
              ↓
[Page displays curated data + Chat Brain is ready]
              ↓
[User asks question → API searches vectors → Returns answer]
```

**Shared resource**: Same Supabase project (same database, different roles)

---

## Database Schema

See: `/migrations/004_brain_system.sql`

**Core Tables**:

1. **`sources`** - Library of uploaded files
   - Tracks: file name, type, path, state/county, processing status
   - Links to: Supabase Storage bucket

2. **`knowledge_chunks`** - Vector embeddings for RAG
   - Contains: text chunks, embeddings (Gemini 768-dim), metadata
   - Indexed: Vector similarity search (IVFFlat index)

3. **`curated_data`** - Structured UI data
   - Contains: JSONB with addresses, fees, deadlines, etc.
   - Used by: County pages (static display)

4. **`citations`** - Source tracking
   - Contains: Links, statutes, case law references
   - Used by: AI responses for source citing

5. **`chat_feedback`** - Quality control
   - Tracks: User feedback ("incorrect", "helpful", etc.)
   - Used by: Human review to detect hallucinations

---

## Key Concepts

### **"Pre-Baked" Content** (Not Runtime AI)
- The Ingestion Brain processes files **offline**
- County pages load **instantly** with pre-structured data
- No LLM calls during page load = Fast + SEO-friendly

### **Contextual Search** (Geographic Filtering)
- Chat doesn't search the entire database
- Filters by: state → county → phase → topic
- Example: User on `/texas/harris/dmv` page
  - Search limited to: `state_id=1, county_id=15, topic='dmv'`
  - Results are hyper-relevant

### **"Gold Dust" Triggers** (Smart Prompts)
- Static content has clickable highlights
- Example: "You have 10 days to request a hearing. [What if I miss the deadline?]"
- Click opens Brain with pre-filled expert question

### **Anti-Hallucination Strategy**
1. **Strict System Prompt**: "Only answer from CONTEXT, never invent"
2. **Source Citations**: Every response cites `source_file_name` + `url`
3. **User Feedback**: "Report Incorrect Info" button logs to database
4. **Archive Warnings**: Outdated content shows ⚠️ warning

---

## Environment Variables

Required in `.env` (THIS REPO):

```bash
# Supabase (shared with /legal-data-factory)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

Required in `/legal-data-factory`:

```bash
# Supabase (same project)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

## Development Workflow

### **Adding New County Research**

1. **Upload files** to Supabase Storage:
   ```
   research-uploads/texas/harris/impound.docx
   ```

2. **Run ingestion** (in `/legal-data-factory`):
   ```bash
   python processing/orchestrator.py --source-bucket research-uploads
   ```

3. **Verify in database**:
   ```sql
   SELECT * FROM sources WHERE state_id = 1 AND county_id = 15;
   SELECT * FROM knowledge_chunks WHERE county_id = 15 LIMIT 5;
   SELECT * FROM curated_data WHERE county_id = 15;
   ```

4. **Test in app**:
   - Visit: `http://localhost:3000/texas/harris/impound`
   - Ask question in chat: "Where are impound lots?"
   - Verify response uses your uploaded data

---

## API Endpoints (THIS REPO)

### `POST /api/chat`
**Purpose**: Interaction Brain - answers user questions

**Request**:
```json
{
  "messages": [
    {"role": "user", "content": "Can I drive to work after DUI?"}
  ],
  "context": {
    "state_id": 1,
    "county_id": 15,
    "phase": "PHASE_2_CRITICAL_WINDOW",
    "topic": "dmv"
  }
}
```

**Response**: Streaming text with citations

---

## Future Enhancements

### Phase 2: Advanced Features
- [ ] Multi-language support (Spanish embeddings)
- [ ] Voice input (Whisper API)
- [ ] Document upload by users ("Analyze my court docs")
- [ ] Confidence scores on responses
- [ ] A/B test: Gemini vs OpenAI embeddings

### Phase 3: Automation
- [ ] Monthly auto-reingestion (check for updated PDFs)
- [ ] Broken link detection (citations table)
- [ ] Human-in-the-loop review (feedback triaging)

---

## Troubleshooting

### Chat returns no results
**Check**:
1. Vector search threshold too high? (Default: 0.7)
2. No data for that county/topic? Query `knowledge_chunks` table
3. Embeddings not generated? Check `embedding_gemini IS NOT NULL`

### Slow vector search
**Check**:
1. Vector index created? `\d knowledge_chunks` (should show `idx_chunks_embedding_gemini`)
2. Too many chunks? Consider increasing IVFFlat `lists` parameter
3. Filters working? Use `EXPLAIN ANALYZE` on search query

### Hallucinations despite context
**Check**:
1. System prompt strict enough?
2. Retrieved chunks actually relevant? Log `retrieved_chunk_ids`
3. User feedback: Check `chat_feedback` table for patterns

---

## Resources

- **Supabase pgvector Docs**: https://supabase.com/docs/guides/ai/vector-columns
- **Gemini API Docs**: https://ai.google.dev/docs
- **Vercel AI SDK**: https://sdk.vercel.ai/docs

---

## Questions?

For implementation details, see:
- Database schema: `/migrations/004_brain_system.sql`
- Storage setup: `/migrations/STORAGE_SETUP.md`
- API implementation: `/app/api/chat/route.ts` (TODO)
- UI components: `/components/BrainContext.tsx` (TODO)

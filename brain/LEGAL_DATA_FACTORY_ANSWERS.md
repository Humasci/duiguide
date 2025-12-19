# Answers to Legal Data Factory Questions

## 1. Supabase Configuration

**Use the SAME Supabase project** as `/duiguide`.

**Keys you need** (copy from `/duiguide/.env.local`):
```bash
SUPABASE_URL=<same as NEXT_PUBLIC_SUPABASE_URL in duiguide>
SUPABASE_SERVICE_ROLE_KEY=<the service_role key - NOT the anon key>
```

**Important distinction**:
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Limited permissions (read-only for public data)
- **`SUPABASE_SERVICE_ROLE_KEY`**: Full admin access (can write to all tables, bypass RLS)

**You need the SERVICE ROLE key** for the ingestion pipeline because you're writing to the database.

**Where to find it**:
1. Go to Supabase Dashboard → Your Project
2. Settings (gear icon) → API
3. Look for **"service_role" key** (it's the secret one, not the public anon key)

---

## 2. Gemini API

**I already added it to `/duiguide/.env.example`**:
```bash
# Gemini AI (for Brain system - chat + embeddings)
GEMINI_API_KEY=your_gemini_api_key
```

**For your repo** (`/legal-data-factory`), create `.env.example`:
```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Processing Config
CHUNK_SIZE=1000
CHUNK_OVERLAP=100
MAX_PARALLEL_PROCESSING=3
```

**Get Gemini API key**: https://aistudio.google.com/app/apikey (it's free to get started)

---

## 3. Error Handling Recommendations

### **A. Gemini API Failures**

✅ **YES - Implement retry logic with exponential backoff**

```python
import time
from typing import Optional

def call_gemini_with_retry(prompt: str, max_retries: int = 3) -> Optional[str]:
    """Call Gemini API with exponential backoff retry"""
    delays = [2, 4, 8]  # seconds

    for attempt in range(max_retries):
        try:
            response = gemini.generate_content(prompt)
            return response.text
        except Exception as e:
            if attempt < max_retries - 1:
                delay = delays[attempt]
                print(f"Gemini API error (attempt {attempt + 1}/{max_retries}): {e}")
                print(f"Retrying in {delay}s...")
                time.sleep(delay)
            else:
                print(f"Gemini API failed after {max_retries} attempts")
                return None
```

**If all retries fail**:
- Update source: `processing_status = 'error'`
- Log error: `processing_error = "Gemini API failed after 3 retries"`
- Continue to next file (don't crash the whole pipeline)

---

### **B. Corrupted/Unreadable Files**

✅ **Mark as failed and continue**

```python
try:
    text = librarian.extract_text(file_path, file_type)
except Exception as e:
    supabase.table('sources').update({
        'processing_status': 'error',
        'processing_error': f'File corrupted or unreadable: {str(e)}'
    }).eq('id', source_id).execute()

    print(f"⚠️  Skipping corrupted file: {source_id}")
    return  # Skip to next file
```

**Don't crash** - just log and move on. We can manually review errors later.

---

### **C. Taxonomist Uncertainty**

✅ **Use confidence thresholds + fallback to manual review**

**Recommended approach**:

```python
def classify_with_confidence(text: str, file_path: str) -> dict:
    """
    Returns: {
        'phase': str,
        'topic': str,
        'confidence': float,  # 0.0 to 1.0
        'needs_review': bool
    }
    """
    # Prompt Gemini with JSON output
    prompt = f"""
    Classify this DUI legal content.

    File path: {file_path}
    Content preview: {text[:1000]}...

    Return JSON with confidence scores:
    {{
        "phase": "PHASE_1_ARREST" | "PHASE_2_CRITICAL_WINDOW" | "PHASE_3_COURT_DEFENSE" | "PHASE_4_SENTENCING",
        "topic": "impound" | "bail" | "court" | "dmv" | "scram" | "license" | "penalties",
        "confidence": 0.95,
        "reasoning": "Brief explanation"
    }}
    """

    result = call_gemini_with_retry(prompt)
    data = json.loads(result)

    # Low confidence = needs review
    if data['confidence'] < 0.7:
        data['needs_review'] = True
        print(f"⚠️  Low confidence ({data['confidence']}) - marking for review")
    else:
        data['needs_review'] = False

    return data
```

**If confidence < 0.7**:
```python
supabase.table('sources').update({
    'processing_status': 'needs_review',  # Special status
    'phase': metadata['phase'],  # Use best guess
    'topic': metadata['topic'],
    'processing_error': f"Low confidence: {metadata['confidence']}"
}).eq('id', source_id).execute()
```

**Never use**:
- ❌ `phase: 'UNKNOWN'` (breaks the UI filters)
- ❌ Fail entirely (too strict)

**Instead**: Use best guess but flag for human review.

---

## 4. Rate Limits Strategy

### **Recommended: Hybrid Approach**

```python
# In .env
MAX_PARALLEL_PROCESSING=3  # Process 3 files concurrently

# In orchestrator.py
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def process_all_pending():
    """Process all pending sources with controlled parallelism"""

    # Get all pending sources
    sources = supabase.table('sources') \
        .select('id') \
        .eq('processing_status', 'pending') \
        .execute()

    source_ids = [s['id'] for s in sources.data]

    # Process with max concurrency limit
    max_workers = int(os.getenv('MAX_PARALLEL_PROCESSING', 3))

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [
            executor.submit(process_file, source_id)
            for source_id in source_ids
        ]

        # Wait for all to complete
        for future in futures:
            try:
                future.result()
            except Exception as e:
                print(f"Error processing file: {e}")
```

**For Gemini rate limits**:
- Gemini free tier: 15 requests/minute
- With `MAX_PARALLEL_PROCESSING=3`, you'll hit ~3-6 requests/minute (safe)
- If you hit rate limits, implement a simple sleep:

```python
import time

def generate_embedding(text: str) -> list:
    try:
        result = genai.embed_content(...)
        return result['embedding']
    except Exception as e:
        if '429' in str(e) or 'rate limit' in str(e).lower():
            print("⚠️  Rate limit hit - waiting 60s...")
            time.sleep(60)
            # Retry once
            result = genai.embed_content(...)
            return result['embedding']
        else:
            raise
```

**Start with**: `MAX_PARALLEL_PROCESSING=3` (safe and fast enough)

---

## 5. Testing

**Build the pipeline first, then test with a simple file.**

**After you build the Librarian**:
1. Create a test file: `test-impound.txt`
   ```
   # Harris County Impound Information

   ABC Towing Company
   Address: 123 Main St, Houston, TX 77002
   Phone: (713) 555-0100
   Daily Fee: $45
   Hours: 24/7

   Source: https://harriscountytx.gov/impound-regulations
   ```

2. Upload to Supabase Storage: `research-uploads/test/test-impound.txt`

3. Create source record:
   ```sql
   INSERT INTO sources (file_name, file_type, file_path, processing_status)
   VALUES ('test-impound.txt', 'markdown', 'test/test-impound.txt', 'pending');
   ```

4. Run orchestrator:
   ```bash
   python scripts/process_all.py
   ```

5. Verify outputs:
   ```sql
   SELECT * FROM knowledge_chunks WHERE source_id = 1;
   SELECT * FROM curated_data WHERE source_id = 1;
   SELECT * FROM citations WHERE source_id = 1;
   ```

---

## 6. Database Schema Details

Here's the exact schema you need:

### **`states` table** (already exists in duiguide)

```sql
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),           -- "Texas"
  abbreviation CHAR(2),       -- "TX"
  slug VARCHAR(50),           -- "texas"
  ...
);

-- Texas is id=1 (already inserted in migration 001)
```

**To look up state_id**:
```python
def get_state_id(state_abbr: str) -> int:
    result = supabase.table('states') \
        .select('id') \
        .eq('abbreviation', state_abbr.upper()) \
        .single() \
        .execute()
    return result.data['id'] if result.data else None
```

---

### **`counties` table** (already exists)

```sql
CREATE TABLE counties (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id),
  name VARCHAR(100),          -- "Harris"
  slug VARCHAR(100),          -- "harris"
  population INTEGER,
  ...
);
```

**IMPORTANT**: The 10 Texas counties are **NOT inserted yet**. You'll need to insert them:

```sql
-- Insert Harris County
INSERT INTO counties (state_id, name, slug, population)
VALUES (1, 'Harris', 'harris', 4700000);

-- Repeat for other 9 counties...
```

**I'll provide a script for this below.**

---

### **`sources` table** (new - created in migration 004)

```sql
CREATE TABLE sources (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,      -- 'pdf', 'docx', 'html', 'markdown'
  file_path TEXT,               -- 'texas/harris/impound.pdf'
  file_hash TEXT,               -- SHA256 for change detection
  file_size_bytes INTEGER,

  state_id INTEGER REFERENCES states(id),
  county_id INTEGER REFERENCES counties(id),
  applies_to_all_counties BOOLEAN DEFAULT false,

  phase TEXT,                   -- 'PHASE_1_ARREST', etc.
  topic TEXT,                   -- 'impound', 'bail', etc.

  source_type TEXT DEFAULT 'manual_research',
  original_url TEXT,

  processing_status TEXT DEFAULT 'pending',  -- 'pending', 'processing', 'completed', 'error', 'needs_review'
  processing_error TEXT,
  processed_at TIMESTAMPTZ,

  is_archived BOOLEAN DEFAULT false,
  archive_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### **`knowledge_chunks` table**

```sql
CREATE TABLE knowledge_chunks (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES sources(id),

  state_id INTEGER REFERENCES states(id),
  county_id INTEGER REFERENCES counties(id),
  applies_to_all_counties BOOLEAN DEFAULT false,

  phase TEXT NOT NULL,
  topic TEXT NOT NULL,

  content TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,

  embedding_gemini vector(768),    -- 768 dimensions for Gemini
  embedding_openai vector(1536),   -- Optional, can be NULL

  heading TEXT,
  page_number INTEGER,

  is_archived BOOLEAN DEFAULT false,
  archive_warning TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### **`curated_data` table**

```sql
CREATE TABLE curated_data (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES sources(id),

  state_id INTEGER REFERENCES states(id),
  county_id INTEGER REFERENCES counties(id),

  topic TEXT NOT NULL,

  data JSONB NOT NULL DEFAULT '{}',  -- Structured data

  is_verified BOOLEAN DEFAULT false,
  verified_by TEXT,
  verified_at TIMESTAMPTZ,

  priority INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(state_id, county_id, topic)
);
```

---

### **`citations` table**

```sql
CREATE TABLE citations (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES sources(id),

  citation_text TEXT NOT NULL,      -- "Texas Transportation Code §724.041"
  citation_type TEXT,               -- 'statute', 'case_law', 'manual', 'website'

  url TEXT,
  page_reference TEXT,

  is_verified BOOLEAN DEFAULT false,
  last_checked TIMESTAMPTZ,
  link_status TEXT DEFAULT 'unchecked',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. File Upload Flow

**The user (me) will upload files manually** through Supabase UI initially.

**Your job**:
1. **Detect** files that have been uploaded (they'll have `processing_status = 'pending'`)
2. **Process** them through the 4 agents
3. **Write** results to database

**I'll handle**:
- Uploading PDFs to Supabase Storage
- Creating initial `sources` records with `processing_status = 'pending'`

**You don't need to build an upload script** - just the processing pipeline.

---

## Additional: Insert 10 Texas Counties Script

Run this SQL in Supabase to insert the counties:

```sql
-- Insert 10 Texas counties (state_id = 1 for Texas)
INSERT INTO counties (state_id, name, slug, population, is_active, tier) VALUES
  (1, 'Harris', 'harris', 4700000, true, 1),
  (1, 'Dallas', 'dallas', 2600000, true, 1),
  (1, 'Tarrant', 'tarrant', 2100000, true, 1),
  (1, 'Bexar', 'bexar', 2000000, true, 1),
  (1, 'Travis', 'travis', 1300000, true, 1),
  (1, 'Collin', 'collin', 1100000, true, 1),
  (1, 'Denton', 'denton', 900000, true, 1),
  (1, 'Hidalgo', 'hidalgo', 870000, true, 1),
  (1, 'Fort Bend', 'fort-bend', 820000, true, 1),
  (1, 'El Paso', 'el-paso', 865000, true, 2)
ON CONFLICT (state_id, name) DO NOTHING;

-- Verify
SELECT id, name, slug, population FROM counties WHERE state_id = 1;
```

---

## Summary: Your To-Do List

### **Setup (5 minutes)**
1. ✅ Create `.env` file with:
   - `SUPABASE_URL` (from duiguide)
   - `SUPABASE_SERVICE_ROLE_KEY` (from Supabase Dashboard → API settings)
   - `GEMINI_API_KEY` (from https://aistudio.google.com/app/apikey)

### **Build (Phase 1)**
1. ✅ **Librarian** first (simplest - just text extraction)
2. ✅ **Taxonomist** (with confidence scoring)
3. ✅ **Researcher** (citation extraction)
4. ✅ **Curator** (structured data)

### **Build (Phase 2)**
5. ✅ **Orchestrator** (with error handling + retry logic)
6. ✅ **Embeddings utility** (Gemini API)
7. ✅ **Chunking utility**

### **Test**
8. ✅ Create test file
9. ✅ Run pipeline
10. ✅ Verify database outputs

---

**Start with the Librarian and work your way through!** Let me know when you hit any blockers.

# Legal Data Factory - Ingestion Pipeline Build Brief

## Context

The **DUI Guide web app** (`/duiguide` repo) now has a complete **Brain System database** ready in Supabase. We need to build the **ingestion pipeline** in this repo (`/legal-data-factory`) to process uploaded research files and populate the database.

---

## What Was Built in `/duiguide` (The Web App)

✅ **Complete Database Schema** in Supabase:
- `sources` - File metadata tracker
- `knowledge_chunks` - Text chunks with vector embeddings (768-dim Gemini)
- `curated_data` - Structured JSONB for UI display
- `citations` - Source links for anti-hallucination
- `chat_feedback` - User feedback for quality control

✅ **Vector Search**: pgvector enabled with IVFFlat index

✅ **RPC Functions**:
- `match_knowledge_chunks()` - Semantic search with geographic filters
- `get_curated_page_data()` - Fetch pre-processed UI data

✅ **Storage Bucket**: `research-uploads` in Supabase Storage

---

## What Needs to Be Built HERE (`/legal-data-factory`)

This repo is the **"Ingestion Brain"** - the backend processing pipeline that:

1. **Monitors** Supabase Storage for new research files
2. **Processes** files through 4 AI agents
3. **Generates** vector embeddings
4. **Writes** results to Supabase database

---

## The 4 Agents to Build

### **1. The Librarian** (`/agents/librarian.py`)

**Purpose**: Convert files to clean text

**Input**: File path from Supabase Storage (PDF, DOCX, HTML, Markdown)

**Output**: Clean markdown text

**Tasks**:
- Extract text from PDFs (use `pypdf` or `pdfplumber`)
- Extract text from DOCX (use `python-docx`)
- Parse HTML and remove navigation/footers (use `beautifulsoup4`)
- Strip encoding errors
- Preserve headings for chunking

**Example**:
```python
def extract_text(file_path: str, file_type: str) -> str:
    if file_type == 'pdf':
        # Use pdfplumber to extract text
        ...
    elif file_type == 'docx':
        # Use python-docx to extract paragraphs
        ...
    elif file_type == 'html':
        # Use BeautifulSoup to clean HTML
        ...
    return clean_text
```

---

### **2. The Taxonomist** (`/agents/taxonomist.py`)

**Purpose**: Auto-tag files with metadata

**Input**:
- File path (e.g., `texas/harris/impound.docx`)
- Extracted text

**Output**: Metadata dict
```python
{
  "state": "texas",
  "state_id": 1,
  "county": "harris",
  "county_id": 15,
  "phase": "PHASE_1_ARREST",
  "topic": "impound"
}
```

**Tasks**:
- Parse file path to extract state/county
- Look up state_id and county_id from Supabase `states` and `counties` tables
- Use Gemini API to classify phase and topic:
  ```
  Prompt: "Given this legal content about DUI in [county], classify it:
  Phase: PHASE_1_ARREST, PHASE_2_CRITICAL_WINDOW, PHASE_3_COURT_DEFENSE, PHASE_4_SENTENCING
  Topic: impound, bail, court, dmv, scram, license, penalties"
  ```

**Phase mapping**:
```python
VALID_PHASES = [
    "PHASE_1_ARREST",           # Bail bonds, impound/tow
    "PHASE_2_CRITICAL_WINDOW",  # DMV hearing, license suspension
    "PHASE_3_COURT_DEFENSE",    # Court rules, judges, arraignment
    "PHASE_4_SENTENCING"        # Diversion, probation, SCRAM
]

VALID_TOPICS = [
    "impound", "bail", "court", "dmv",
    "scram", "license", "penalties", "diversion"
]
```

---

### **3. The Researcher** (`/agents/researcher.py`)

**Purpose**: Extract citations and source links

**Input**: Raw text

**Output**: List of citations
```python
[
  {
    "citation_text": "Texas Transportation Code §724.041",
    "citation_type": "statute",
    "url": "https://statutes.capitol.texas.gov/...",
    "page_reference": None
  },
  {
    "citation_text": "Harris County DMV Manual 2024",
    "citation_type": "manual",
    "url": "https://harriscountytx.gov/dmv.pdf",
    "page_reference": "Page 12"
  }
]
```

**Tasks**:
- Extract hyperlinks from markdown/HTML (regex or BeautifulSoup)
- Detect statute references (regex patterns: "Texas [Code/Penal Code/Transportation Code] §XXX")
- Detect case law (e.g., "State v. Smith (2024)")
- Categorize citation types: 'statute', 'case_law', 'regulation', 'manual', 'website'
- Use Gemini API to extract semantic citations if links are embedded in text

**Example**:
```python
def extract_citations(text: str) -> List[Dict]:
    citations = []

    # Extract URLs
    urls = re.findall(r'https?://[^\s\)]+', text)

    # Extract statute references
    statutes = re.findall(r'Texas .+ Code §[\d.]+', text)

    # Use Gemini to extract semantic citations
    # "Find all legal citations in this text..."

    return citations
```

---

### **4. The Curator** (`/agents/curator.py`)

**Purpose**: Extract structured data for UI display

**Input**:
- Raw text
- Topic (from Taxonomist)

**Output**: Structured JSONB based on topic

**Topic-specific schemas**:

**For topic: "impound"**:
```json
{
  "lots": [
    {
      "name": "ABC Towing",
      "address": "123 Main St, Houston, TX",
      "phone": "(713) 555-0100",
      "daily_fee": 45,
      "hours": "24/7",
      "payment_methods": ["Cash", "Credit Card"]
    }
  ],
  "average_retrieval_cost": 450,
  "required_documents": ["ID", "Vehicle Registration", "Proof of Insurance"]
}
```

**For topic: "dmv"**:
```json
{
  "deadline_days": 10,
  "hearing_location": "Harris County Justice Center, Room 201",
  "required_forms": ["DL-14A", "SR-22"],
  "filing_fee": 125,
  "online_request_url": "https://texas.gov/dmv-hearing"
}
```

**For topic: "court"**:
```json
{
  "court_name": "Harris County Criminal Court at Law No. 1",
  "address": "1201 Franklin St, Houston, TX 77002",
  "phone": "(713) 274-8686",
  "hours": "Monday-Friday 8:00 AM - 4:30 PM",
  "judges": [
    {"name": "Hon. Sarah Johnson", "courtroom": "6A"}
  ],
  "typical_arraignment_wait_days": 14
}
```

**Tasks**:
- Use Gemini API with structured output (JSON mode)
- Prompt: "Extract structured data from this text about [topic] in [county]. Return JSON matching this schema: {...}"
- Validate output matches expected schema
- Handle missing fields gracefully

---

## The Orchestrator (`/processing/orchestrator.py`)

**Purpose**: Run agents in sequence for each file

**Workflow**:

```python
async def process_file(source_id: int):
    # 1. Fetch source metadata from Supabase
    source = supabase.table('sources').select('*').eq('id', source_id).single()

    # 2. Download file from Supabase Storage
    file_data = supabase.storage.from_('research-uploads').download(source['file_path'])

    # 3. Librarian: Extract text
    text = librarian.extract_text(file_data, source['file_type'])

    # 4. Taxonomist: Classify
    metadata = taxonomist.classify(source['file_path'], text)

    # 5. Update source record with metadata
    supabase.table('sources').update({
        'phase': metadata['phase'],
        'topic': metadata['topic'],
        'state_id': metadata['state_id'],
        'county_id': metadata['county_id'],
        'processing_status': 'processing'
    }).eq('id', source_id).execute()

    # 6. Researcher: Extract citations
    citations = researcher.extract_citations(text)

    # 7. Curator: Extract structured data
    curated_data = curator.extract_structured_data(text, metadata['topic'])

    # 8. Chunk text for embeddings (500-1000 words per chunk)
    chunks = chunk_text(text)

    # 9. Generate embeddings for each chunk (Gemini API)
    for i, chunk in enumerate(chunks):
        embedding = generate_embedding(chunk)  # Call Gemini text-embedding-004

        # Write to knowledge_chunks table
        supabase.table('knowledge_chunks').insert({
            'source_id': source_id,
            'state_id': metadata['state_id'],
            'county_id': metadata['county_id'],
            'phase': metadata['phase'],
            'topic': metadata['topic'],
            'content': chunk,
            'chunk_index': i,
            'embedding_gemini': embedding
        }).execute()

    # 10. Write curated_data
    supabase.table('curated_data').upsert({
        'source_id': source_id,
        'state_id': metadata['state_id'],
        'county_id': metadata['county_id'],
        'topic': metadata['topic'],
        'data': curated_data
    }).execute()

    # 11. Write citations
    for citation in citations:
        supabase.table('citations').insert({
            'source_id': source_id,
            **citation
        }).execute()

    # 12. Mark source as processed
    supabase.table('sources').update({
        'processing_status': 'completed',
        'processed_at': 'NOW()'
    }).eq('id', source_id).execute()
```

---

## File Structure for This Repo

```
/legal-data-factory
├── /agents
│   ├── __init__.py
│   ├── librarian.py          ← Extract text from files
│   ├── taxonomist.py         ← Classify state/county/phase/topic
│   ├── researcher.py         ← Extract citations/links
│   └── curator.py            ← Extract structured data
│
├── /processing
│   ├── __init__.py
│   ├── orchestrator.py       ← Main processing pipeline
│   └── chunking.py           ← Text chunking utilities
│
├── /utils
│   ├── __init__.py
│   ├── supabase_client.py    ← Supabase connection
│   ├── gemini_client.py      ← Gemini API wrapper
│   └── embeddings.py         ← Embedding generation
│
├── /config
│   ├── __init__.py
│   ├── phase_mapping.py      ← Phase/topic definitions
│   └── schemas.py            ← Curated data schemas by topic
│
├── /scripts
│   ├── process_all.py        ← Process all pending sources
│   ├── monitor_uploads.py    ← Watch for new files (optional)
│   └── reprocess_county.py   ← Re-process a specific county
│
├── requirements.txt
├── .env.example
└── README.md
```

---

## Dependencies (`requirements.txt`)

```txt
# Supabase
supabase==2.3.4
python-dotenv==1.0.0

# Gemini AI
google-generativeai==0.3.2

# File processing
pypdf==4.0.0           # or pdfplumber==0.10.0
python-docx==1.1.0
beautifulsoup4==4.12.3
lxml==5.1.0

# Text processing
markdown==3.5.2
nltk==3.8.1           # For sentence tokenization (chunking)

# Utilities
requests==2.31.0
```

---

## Environment Variables (`.env.example`)

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Processing Config
CHUNK_SIZE=1000              # Words per chunk
CHUNK_OVERLAP=100            # Overlap between chunks
MAX_PARALLEL_PROCESSING=3    # Concurrent file processing
```

---

## Key Functions to Implement

### **Embedding Generation** (`/utils/embeddings.py`)

```python
import google.generativeai as genai

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def generate_embedding(text: str) -> list:
    """Generate 768-dim embedding using Gemini text-embedding-004"""
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document"
    )
    return result['embedding']
```

### **Text Chunking** (`/processing/chunking.py`)

```python
def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """
    Split text into chunks of ~chunk_size words with overlap.
    Preserve paragraph boundaries and headings.
    """
    # Split by paragraphs
    paragraphs = text.split('\n\n')

    chunks = []
    current_chunk = []
    current_word_count = 0

    for para in paragraphs:
        word_count = len(para.split())

        if current_word_count + word_count > chunk_size:
            # Save current chunk
            chunks.append('\n\n'.join(current_chunk))

            # Start new chunk with overlap (last paragraph)
            current_chunk = current_chunk[-1:] if current_chunk else []
            current_word_count = len(current_chunk[0].split()) if current_chunk else 0

        current_chunk.append(para)
        current_word_count += word_count

    # Add final chunk
    if current_chunk:
        chunks.append('\n\n'.join(current_chunk))

    return chunks
```

---

## Testing Approach

### **Test with Sample File**

1. **Upload test file** to Supabase Storage:
   ```
   research-uploads/texas/harris/test-impound.docx
   ```

2. **Create source record** manually in Supabase:
   ```sql
   INSERT INTO sources (file_name, file_type, file_path, state_id, county_id, processing_status)
   VALUES ('test-impound.docx', 'docx', 'texas/harris/test-impound.docx', 1, 15, 'pending');
   ```

3. **Run orchestrator**:
   ```bash
   python scripts/process_all.py --source-id 1
   ```

4. **Verify outputs** in Supabase:
   ```sql
   SELECT * FROM knowledge_chunks WHERE source_id = 1;
   SELECT * FROM curated_data WHERE source_id = 1;
   SELECT * FROM citations WHERE source_id = 1;
   ```

---

## Integration Points with `/duiguide`

**Shared Supabase Project**:
- Both repos connect to same Supabase instance
- `/legal-data-factory`: **Writes** to database (service_role key)
- `/duiguide`: **Reads** from database (anon key for public, service_role for API)

**Data Flow**:
```
[User uploads to Supabase Storage]
        ↓
[/legal-data-factory processes file]
        ↓
[Writes to: sources, knowledge_chunks, curated_data, citations]
        ↓
[/duiguide reads from database]
        ↓
[User sees county page + chat]
```

---

## Initial Target: 10 Texas Counties

The user will upload research for these counties:

**Target counties**:
1. **Harris** (Houston) - Pop: 4.7M
2. **Dallas** - Pop: 2.6M
3. **Tarrant** (Fort Worth) - Pop: 2.1M
4. **Bexar** (San Antonio) - Pop: 2.0M
5. **Travis** (Austin) - Pop: 1.3M
6. **Collin** (Plano) - Pop: 1.1M
7. **Denton** - Pop: 900K
8. **Hidalgo** (McAllen) - Pop: 870K
9. **Fort Bend** (Sugar Land) - Pop: 820K
10. **El Paso** - Pop: 865K

**File structure**:
- Main counties (Harris through Fort Bend): 5 separate topic files each
- El Paso: 1 combined file or separate files (flexible)

**Total**: ~40-50 files (mix of PDFs, DOCX)

---

## Success Criteria

✅ **Librarian**: Successfully extracts text from all file types (PDF, DOCX, HTML)

✅ **Taxonomist**: Correctly auto-tags state/county/phase/topic (95%+ accuracy)

✅ **Researcher**: Extracts all embedded links and identifies statute citations

✅ **Curator**: Produces valid JSONB matching expected schemas for each topic

✅ **Embeddings**: Generates 768-dim vectors for all chunks

✅ **Database**: All 51 files processed → ~500-1000 knowledge_chunks created

✅ **Verification**: Sample queries return relevant chunks:
```sql
SELECT * FROM match_knowledge_chunks(
  query_embedding := <embedding for "impound lot fees">,
  filter_county_id := 15,  -- Harris
  filter_topic := 'impound'
);
```

---

## Timeline Estimate

- **Agent Development**: 2-3 days (all 4 agents)
- **Orchestrator**: 1 day
- **Testing with sample files**: 1 day
- **Processing 51 files**: 2-4 hours (depends on Gemini API rate limits)

---

## Questions to Address

1. **Error Handling**: What should happen if:
   - Gemini API fails?
   - File is corrupted?
   - Taxonomist can't determine phase/topic?

2. **Rate Limits**: Gemini API has rate limits. Should we:
   - Add retry logic with exponential backoff?
   - Process files sequentially vs parallel?

3. **Validation**: Should curated_data be human-reviewed before marking as verified?

---

## Deliverables

1. ✅ All 4 agents (`/agents/`)
2. ✅ Orchestrator pipeline (`/processing/orchestrator.py`)
3. ✅ Utility functions (Supabase, Gemini, chunking, embeddings)
4. ✅ Test scripts (`/scripts/`)
5. ✅ Documentation (README with usage guide)
6. ✅ Sample test file processed successfully
7. ✅ Ready to process 51 Texas county files

---

## Getting Started

1. **Clone this repo** (if not already)
2. **Install dependencies**: `pip install -r requirements.txt`
3. **Set up `.env`** (copy from `.env.example`)
4. **Test Supabase connection**:
   ```python
   from utils.supabase_client import supabase
   print(supabase.table('sources').select('*').limit(1).execute())
   ```
5. **Test Gemini connection**:
   ```python
   from utils.embeddings import generate_embedding
   print(generate_embedding("test"))  # Should return 768-dim vector
   ```
6. **Start with Librarian agent** (simplest)
7. **Build incrementally**: Librarian → Taxonomist → Researcher → Curator → Orchestrator

---

## Reference Links

- **Supabase Python Client**: https://supabase.com/docs/reference/python
- **Gemini API Docs**: https://ai.google.dev/tutorials/python_quickstart
- **Gemini Embeddings**: https://ai.google.dev/api/embeddings
- **Database Schema**: See `/migrations/DATABASE_SCHEMA.md` in `/duiguide` repo

---

## Contact Point

If you need clarification on database schema, expected outputs, or integration:
- Check `/duiguide/migrations/DATABASE_SCHEMA.md`
- Check `/duiguide/brain/README.md`
- Ask in the main project chat

---

**Ready to build! Start with the Librarian agent and work your way through the pipeline.** 🚀

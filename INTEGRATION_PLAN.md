# DUIGuide ↔ Legal-Data-Factory Integration Plan

**Last Updated:** December 27, 2024
**Status:** Planning Phase

---

## Overview

This document outlines the integration between the duiguide web application and the legal-data-factory research database. Both repositories share the same Supabase instance, making integration straightforward.

## Database Status

### Shared Supabase Instance
**URL:** `https://cvfgqdkgxmnoozqxvcua.supabase.co`

### Legal-Data-Factory Tables (Source)
- ✅ `knowledge_chunks` - 365 chunks with embeddings (768-dim vectors)
- ✅ `citations` - 1,033 legal citations
- ✅ `sources` - 76 processed research documents
- ✅ `curated_data` - Structured data extraction

### DUIGuide Tables (Consumer)
- ✅ `states` - State-level DUI information
- ✅ `counties` - County-level DUI information
- ✅ `content_pages` - Generated content pages
- ✅ `knowledge_base` - Basic Q&A (to be replaced/augmented)
- ✅ `leads` - Lead capture
- ✅ `partners` - Attorney partners

---

## Phase 1: Brain SDK/API Module 🚧 PRIORITY

### Location
`/lib/brain/` - New directory for Brain intelligence layer

### Core Modules

#### 1.1 Database Client (`/lib/brain/client.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

export class BrainClient {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  // Vector search using pgvector
  async semanticSearch(query: string, options?: SearchOptions): Promise<SearchResult[]>

  // Get all data for a county
  async getCountyData(state: string, county: string): Promise<CountyData>

  // Get citations for a topic
  async getCitations(filters: CitationFilters): Promise<Citation[]>

  // Answer questions using RAG
  async answerQuestion(question: string, context: QuestionContext): Promise<Answer>
}
```

#### 1.2 Semantic Search (`/lib/brain/search.ts`)
```typescript
export interface SearchOptions {
  state?: string;
  county?: string;
  topic?: string; // impound, bail, dmv, court, scram
  phase?: string; // PHASE_1_ARREST, etc.
  limit?: number;
  similarityThreshold?: number; // 0.0 - 1.0
}

export interface SearchResult {
  id: number;
  text: string;
  similarity: number;
  source: {
    fileName: string;
    fileType: string;
  };
  metadata: {
    state: string;
    county: string;
    topic: string;
    phase: string;
  };
}

// Implementation using pgvector cosine similarity
export async function semanticSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  // 1. Generate embedding for query using OpenAI or Google
  // 2. Query knowledge_chunks with vector similarity
  // 3. Apply filters (state, county, topic, phase)
  // 4. Return sorted results
}
```

#### 1.3 RAG Q&A Engine (`/lib/brain/qa.ts`)
```typescript
export interface QuestionContext {
  county: string;
  state: string;
  topic?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Answer {
  answer: string;
  confidence: number;
  citations: Citation[];
  sources: Source[];
  relatedQuestions?: string[];
}

export async function answerQuestion(
  question: string,
  context: QuestionContext
): Promise<Answer> {
  // 1. Semantic search for relevant chunks
  // 2. Build context from top N results
  // 3. Call Claude API with RAG prompt
  // 4. Extract citations from response
  // 5. Return formatted answer with sources
}
```

#### 1.4 Data Retrieval (`/lib/brain/data.ts`)
```typescript
export interface CountyData {
  state: string;
  county: string;
  topics: {
    impound?: TopicData;
    bail?: TopicData;
    dmv?: TopicData;
    court?: TopicData;
    scram?: TopicData;
    license?: TopicData;
  };
  chunks: KnowledgeChunk[];
  citations: Citation[];
  structuredData: CuratedData[];
}

export async function getCountyData(
  state: string,
  county: string
): Promise<CountyData> {
  // Fetch all knowledge_chunks, citations, curated_data
  // for the specified county
}

export async function getCitations(
  filters: CitationFilters
): Promise<Citation[]> {
  // Filter citations by topic, state, county, type
}
```

---

## Phase 2: Admin Dashboard 🔧

### Location
`/app/admin/` - Protected admin routes

### Features

#### 2.1 Research Upload Interface (`/app/admin/upload/page.tsx`)
```typescript
// Features:
// - Drag & drop file upload (.pdf, .docx, .txt)
// - Metadata entry (state, county, topic, source URL)
// - Text paste for quick research entry
// - Batch upload support
// - Preview before processing
// - Upload to Supabase Storage → sources table
```

#### 2.2 Processing Pipeline Monitor (`/app/admin/pipeline/page.tsx`)
```typescript
// Monitor legal-data-factory processing:
// - View sources table status
// - See processing_status (pending, processing, completed, error)
// - View chunk count per source
// - View citations extracted
// - Trigger manual reprocessing
// - View error logs
```

#### 2.3 Knowledge Base Browser (`/app/admin/knowledge/page.tsx`)
```typescript
// Browse and search knowledge_chunks:
// - Filter by state, county, topic, phase
// - Full-text search
// - View source documents
// - Edit/flag content for review
// - View AI confidence scores
```

#### 2.4 Citation Manager (`/app/admin/citations/page.tsx`)
```typescript
// Manage legal citations:
// - View all citations
// - Add manual citations
// - Verify citation URLs
// - Categorize citation types
// - Link citations to content
```

---

## Phase 3: Website Integration 🌐

### 3.1 Enhanced County Pages

**Current:** `/app/(guides)/[state]/[county]/dui/page.tsx`
**Enhancement:** Pull data from knowledge_chunks instead of hardcoded content

```typescript
export default async function CountyDUIPage({ params }: CountyPageProps) {
  // Get traditional county data
  const countyInfo = await getCountyData(params.state, params.county);

  // NEW: Get research data from Brain
  const brainData = await brain.getCountyData(
    countyInfo.state.name,
    countyInfo.county.name
  );

  // Generate dynamic sections:
  // - Impound section from brainData.topics.impound
  // - Bail section from brainData.topics.bail
  // - DMV section from brainData.topics.dmv
  // - Court section from brainData.topics.court

  // Show citations at bottom of each section
}
```

### 3.2 Dynamic FAQ Generation

**New Route:** `/app/(guides)/[state]/[county]/faq/page.tsx`

```typescript
export default async function CountyFAQPage({ params }: CountyPageProps) {
  const faqs = await brain.generateFAQs(params.state, params.county);

  // FAQs with schema.org markup
  // Citations for each answer
  // "Ask a question" feature using RAG Q&A
}
```

### 3.3 Interactive Q&A Feature

**Component:** `/components/brain/AskQuestion.tsx`

```typescript
export function AskQuestion({ county, state }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);

  async function handleAsk() {
    const result = await fetch('/api/brain/ask', {
      method: 'POST',
      body: JSON.stringify({ question, county, state })
    });

    setAnswer(await result.json());
  }

  // Show:
  // - Answer text
  // - Confidence indicator
  // - Citations used
  // - Related questions
}
```

### 3.4 Citation Components

**Component:** `/components/brain/Citations.tsx`

```typescript
export function Citations({ citations }: { citations: Citation[] }) {
  // Display legal citations with:
  // - Citation text
  // - Type (statute, regulation, case law)
  // - Jurisdiction
  // - Official source link
  // - Copy-to-clipboard
}
```

---

## Phase 4: Advanced Features 🚀

### 4.1 Content Recommendation Engine

```typescript
// Based on user's county and current page:
// - Recommend related topics to explore
// - "You might also be interested in..."
// - Similar county comparisons
```

### 4.2 County Comparison Tool

**New Route:** `/app/compare/[state]/page.tsx`

```typescript
// Allow users to compare multiple counties:
// - Impound fees
// - Bail amounts
// - Court procedures
// - DMV deadlines
// Data from curated_data table
```

### 4.3 Real-time Research Updates

```typescript
// When new research is added:
// - Webhook from legal-data-factory
// - Trigger ISR revalidation
// - Update affected pages
```

---

## Technical Implementation Details

### Embeddings Strategy

**Current (legal-data-factory):** text-embedding-004 (Google), 768 dimensions
**Website:** Use same model for query embeddings

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

async function generateEmbedding(text: string): Promise<number[]> {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

  const result = await model.embedContent(text);
  return result.embedding.values;
}
```

### Vector Search Query

```sql
-- pgvector cosine similarity search
SELECT
  kc.id,
  kc.text,
  kc.state,
  kc.county,
  kc.topic,
  kc.phase,
  s.file_name,
  s.file_type,
  1 - (kc.embedding <=> $1::vector) AS similarity
FROM knowledge_chunks kc
LEFT JOIN sources s ON kc.source_id = s.id
WHERE
  ($2::text IS NULL OR kc.state = $2)
  AND ($3::text IS NULL OR kc.county = $3)
  AND ($4::text IS NULL OR kc.topic = $4)
  AND 1 - (kc.embedding <=> $1::vector) > $5
ORDER BY similarity DESC
LIMIT $6;
```

### RAG Prompt Template

```typescript
const RAG_PROMPT = `You are a helpful legal information assistant specializing in DUI law.

Context: ${county}, ${state}

Relevant Research:
${chunks.map(c => c.text).join('\n\n---\n\n')}

User Question: ${question}

Instructions:
1. Answer based ONLY on the research provided above
2. Be specific to ${county}, ${state}
3. Include relevant citations from the research
4. If you don't have enough information, say so
5. Always include a disclaimer that this is general information, not legal advice

Answer:`;
```

---

## Environment Variables Needed

Add to `.env.local`:

```bash
# Google AI (for embeddings - matching legal-data-factory)
GOOGLE_API_KEY=your_google_api_key

# Already have these:
# ANTHROPIC_API_KEY (for RAG Q&A)
# NEXT_PUBLIC_SUPABASE_URL
# SUPABASE_SERVICE_ROLE_KEY
```

---

## Database Queries Optimization

### Indexes to Add

```sql
-- Improve vector search performance
CREATE INDEX idx_knowledge_chunks_embedding ON knowledge_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Filter indexes
CREATE INDEX idx_knowledge_chunks_state ON knowledge_chunks(state);
CREATE INDEX idx_knowledge_chunks_county ON knowledge_chunks(county);
CREATE INDEX idx_knowledge_chunks_topic ON knowledge_chunks(topic);
CREATE INDEX idx_knowledge_chunks_phase ON knowledge_chunks(phase);

-- Citation indexes
CREATE INDEX idx_citations_jurisdiction ON citations(jurisdiction);
CREATE INDEX idx_citations_type ON citations(citation_type);
```

---

## API Routes to Create

### 1. `/api/brain/search` - Semantic Search
```typescript
POST /api/brain/search
{
  "query": "impound fees",
  "state": "Texas",
  "county": "Harris County",
  "topic": "impound",
  "limit": 10
}

Response:
{
  "results": [...],
  "count": 10,
  "query": "impound fees"
}
```

### 2. `/api/brain/ask` - RAG Q&A
```typescript
POST /api/brain/ask
{
  "question": "How do I get my car out of impound?",
  "state": "Texas",
  "county": "Harris County"
}

Response:
{
  "answer": "...",
  "confidence": 0.95,
  "citations": [...],
  "relatedQuestions": [...]
}
```

### 3. `/api/brain/county-data` - Get County Data
```typescript
GET /api/brain/county-data?state=Texas&county=Harris%20County

Response:
{
  "state": "Texas",
  "county": "Harris County",
  "topics": {
    "impound": {...},
    "bail": {...},
    "dmv": {...}
  },
  "citations": [...],
  "chunkCount": 45
}
```

### 4. `/api/admin/upload` - Research Upload
```typescript
POST /api/admin/upload
Content-Type: multipart/form-data

{
  "file": File,
  "state": "Texas",
  "county": "Harris County",
  "topic": "impound",
  "source_url": "https://..."
}

Response:
{
  "sourceId": 123,
  "status": "pending",
  "message": "File uploaded, processing will begin shortly"
}
```

---

## File Structure

```
/home/buntu/duiguide/
├── app/
│   ├── admin/                        # NEW: Admin dashboard
│   │   ├── upload/page.tsx          # File/text upload
│   │   ├── pipeline/page.tsx        # Processing monitor
│   │   ├── knowledge/page.tsx       # Knowledge browser
│   │   └── citations/page.tsx       # Citation manager
│   ├── api/
│   │   └── brain/                   # NEW: Brain API routes
│   │       ├── search/route.ts      # Semantic search
│   │       ├── ask/route.ts         # RAG Q&A
│   │       └── county-data/route.ts # County data
│   └── (guides)/
│       └── [state]/[county]/
│           ├── dui/page.tsx         # ENHANCED with Brain
│           └── faq/page.tsx         # NEW: Dynamic FAQs
├── lib/
│   └── brain/                        # NEW: Brain SDK
│       ├── client.ts                # Main Brain client
│       ├── search.ts                # Semantic search
│       ├── qa.ts                    # RAG Q&A engine
│       ├── data.ts                  # Data retrieval
│       ├── embeddings.ts            # Embedding generation
│       └── types.ts                 # TypeScript types
└── components/
    └── brain/                        # NEW: Brain components
        ├── AskQuestion.tsx          # Interactive Q&A
        ├── Citations.tsx            # Citation display
        └── SearchResults.tsx        # Search results

```

---

## Testing Strategy

### 1. Brain SDK Testing
```bash
# Test semantic search
npm run test:brain:search

# Test RAG Q&A
npm run test:brain:qa

# Test data retrieval
npm run test:brain:data
```

### 2. Integration Testing
- Verify county pages load Brain data
- Test FAQ generation
- Test interactive Q&A
- Verify citations display correctly

### 3. Performance Testing
- Vector search latency (<500ms)
- RAG response time (<3s)
- Page load time with Brain data

---

## Deployment Checklist

- [ ] Create `/lib/brain/` module
- [ ] Add Google API key for embeddings
- [ ] Create database indexes
- [ ] Build admin dashboard
- [ ] Create API routes
- [ ] Enhance county pages
- [ ] Add FAQ pages
- [ ] Create citation components
- [ ] Test semantic search
- [ ] Test RAG Q&A
- [ ] Deploy to Vercel
- [ ] Monitor performance

---

## Next Steps

1. **Immediate (This Week)**
   - Create Brain SDK module structure
   - Implement semantic search function
   - Build basic RAG Q&A
   - Create admin upload interface

2. **Short-term (Next 2 Weeks)**
   - Enhance county pages with Brain data
   - Build FAQ generation
   - Create citation components
   - Add processing pipeline monitor

3. **Medium-term (Next Month)**
   - Build county comparison tool
   - Add content recommendation
   - Implement real-time updates
   - Expand to more states

---

**Questions or Issues?**
Contact: This is the web/webapp team integration plan

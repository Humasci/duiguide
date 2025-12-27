# DUIGuide Integration Action Plan

**Last Updated:** December 27, 2024
**Status:** Ready to Implement

---

## ✅ What Already Exists

### Admin Dashboard (Complete)
- `/admin` - Dashboard with stats
- `/admin/processing` - View uploaded sources and processing status
- `/admin/coverage` - County coverage map
- `/admin/gold-dust` - High-priority AI-detected insights
- `/admin/sources` - County source URLs
- `/admin/login` - Password-protected login
- Middleware protection for all `/admin` routes

### Database Tables (Shared Supabase)
- ✅ `knowledge_chunks` - 365 chunks with embeddings (from legal-data-factory)
- ✅ `citations` - 1,033 legal citations (from legal-data-factory)
- ✅ `sources` - 76 processed documents (from legal-data-factory)
- ✅ `curated_data` - Structured extraction (from legal-data-factory)
- ✅ `states` - State-level DUI info
- ✅ `counties` - County-level DUI info
- ✅ `leads` - Lead capture
- ✅ `partners` - Attorney partners

---

## 🎯 What Needs to Be Added

### 1. File & Text Upload Interface (Admin)

**New Route:** `/app/admin/upload/page.tsx`

**Features:**
- Drag & drop file upload (.pdf, .docx, .txt)
- Text paste area for quick research entry
- Metadata form:
  - State (dropdown)
  - County (dropdown, filtered by state)
  - Topic (impound, bail, dmv, court, scram, license)
  - Source URL (optional)
- Preview before upload
- Upload to Supabase Storage → `sources` table
- Integration with legal-data-factory processing pipeline

**Technical:**
```typescript
// Upload flow:
// 1. User uploads file/text via admin interface
// 2. File saved to Supabase Storage (bucket: 'research-documents')
// 3. Record created in `sources` table with processing_status = 'pending'
// 4. legal-data-factory picks up pending sources and processes them
// 5. Admin can monitor progress in /admin/processing
```

### 2. Brain SDK Module

**Location:** `/lib/brain/`

**Critical: Use Google Gemini API (NOT Claude)**
- Gemini for embeddings (matching legal-data-factory: text-embedding-004)
- Gemini for RAG Q&A
- Gemini for content generation
- Claude ONLY for coding (what we're doing now) and website content writing

**Modules to Create:**

#### `/lib/brain/client.ts`
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

export class BrainClient {
  private genAI: GoogleGenerativeAI;
  private supabase;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    this.supabase = createClient(...);
  }

  // Semantic search using Gemini embeddings + pgvector
  async search(query: string, options?: SearchOptions): Promise<SearchResult[]>

  // Get all data for a county
  async getCountyData(state: string, county: string): Promise<CountyData>

  // Answer questions using Gemini RAG
  async ask(question: string, context: QuestionContext): Promise<Answer>

  // Get citations
  async getCitations(filters: CitationFilters): Promise<Citation[]>
}
```

#### `/lib/brain/embeddings.ts`
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Generate embedding using Gemini (matching legal-data-factory)
export async function generateEmbedding(text: string): Promise<number[]> {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

  const result = await model.embedContent(text);
  return result.embedding.values; // 768 dimensions
}
```

#### `/lib/brain/search.ts`
```typescript
// Semantic search using pgvector
export async function semanticSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  // 1. Generate embedding for query using Gemini
  const embedding = await generateEmbedding(query);

  // 2. Query knowledge_chunks with vector similarity
  const { data } = await supabase.rpc('match_knowledge_chunks', {
    query_embedding: embedding,
    match_threshold: options.similarityThreshold || 0.7,
    match_count: options.limit || 10,
    filter_state: options.state,
    filter_county: options.county,
    filter_topic: options.topic
  });

  return data;
}
```

#### `/lib/brain/qa.ts`
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// RAG Q&A using Gemini (NOT Claude)
export async function answerQuestion(
  question: string,
  context: QuestionContext
): Promise<Answer> {
  // 1. Semantic search for relevant chunks
  const chunks = await semanticSearch(question, {
    state: context.state,
    county: context.county,
    limit: 5
  });

  // 2. Build context from top results
  const knowledgeContext = chunks.map(c => c.text).join('\n\n---\n\n');

  // 3. Call Gemini API with RAG prompt
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are a helpful legal information assistant specializing in DUI law.

Context: ${context.county}, ${context.state}

Relevant Research:
${knowledgeContext}

User Question: ${question}

Instructions:
1. Answer based ONLY on the research provided above
2. Be specific to ${context.county}, ${context.state}
3. If you don't have enough information, say so
4. Always include a disclaimer that this is general information, not legal advice

Answer:`;

  const result = await model.generateContent(prompt);
  const answer = result.response.text();

  // 4. Extract citations from chunks
  const citationIds = chunks.map(c => c.source_id);
  const citations = await getCitations({ sourceIds: citationIds });

  return {
    answer,
    confidence: calculateConfidence(chunks),
    citations,
    sources: chunks.map(c => c.source)
  };
}
```

### 3. Monetization Dashboard

**New Route:** `/app/admin/monetization/page.tsx`

**Sections:**
- **Leads Overview**
  - Total leads captured
  - Qualified vs disqualified
  - Conversion rate
  - Lead status breakdown
  - Recent leads table

- **Partner Performance**
  - Active partners
  - Leads sent per partner
  - Revenue per partner
  - Partner status (active, paused, churned)
  - Average CPL (cost per lead)

- **Revenue Tracking**
  - Total revenue (leads × CPL rate)
  - Monthly revenue trend
  - Revenue by state
  - Revenue by partner

- **Lead Quality Metrics**
  - Average urgency score
  - Average quality score
  - Common disqualification reasons
  - Time to qualification

**Example Layout:**
```typescript
export default async function MonetizationPage() {
  const stats = await getMonetizationStats();

  return (
    <div className="space-y-6">
      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>Total Revenue</CardHeader>
          <CardContent>${stats.totalRevenue}</CardContent>
        </Card>
        <Card>
          <CardHeader>This Month</CardHeader>
          <CardContent>${stats.monthlyRevenue}</CardContent>
        </Card>
        <Card>
          <CardHeader>Total Leads</CardHeader>
          <CardContent>{stats.totalLeads}</CardContent>
        </Card>
        <Card>
          <CardHeader>Conversion Rate</CardHeader>
          <CardContent>{stats.conversionRate}%</CardContent>
        </Card>
      </div>

      {/* Partner Performance Table */}
      {/* Lead Status Charts */}
      {/* Recent Leads Table */}
    </div>
  );
}
```

### 4. Enhanced Admin Security

**Improvements Needed:**

#### Session Timeout
```typescript
// middleware.ts - Add session timeout
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_auth');
    const lastActivity = request.cookies.get('admin_last_activity');

    // Check session timeout
    if (lastActivity) {
      const lastTime = parseInt(lastActivity.value);
      const now = Date.now();
      if (now - lastTime > SESSION_TIMEOUT) {
        // Session expired, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // Update last activity timestamp
    const response = NextResponse.next();
    response.cookies.set('admin_last_activity', Date.now().toString());
    return response;
  }
}
```

#### Rate Limiting for Login
```typescript
// /app/api/admin/login/route.ts
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 attempts per minute per IP
    await limiter.check(request, 5, 'ADMIN_LOGIN');
  } catch {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 1 minute.' },
      { status: 429 }
    );
  }

  // ... existing login logic
}
```

#### IP Whitelisting (Optional but Recommended)
```typescript
// .env.local
ADMIN_ALLOWED_IPS=123.456.789.0,98.765.43.21

// middleware.ts
const allowedIPs = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];

if (allowedIPs.length > 0) {
  const ip = request.ip || request.headers.get('x-forwarded-for');
  if (!allowedIPs.includes(ip)) {
    return NextResponse.json({ error: 'Unauthorized IP' }, { status: 403 });
  }
}
```

#### 2FA (Future Enhancement)
- Add authenticator app support (Google Authenticator, Authy)
- Store 2FA secret in database
- Require 2FA code after password

### 5. API Routes

**Create:**

#### `/app/api/brain/search/route.ts`
```typescript
import { semanticSearch } from '@/lib/brain/search';

export async function POST(request: Request) {
  const { query, state, county, topic, limit } = await request.json();

  const results = await semanticSearch(query, {
    state,
    county,
    topic,
    limit: limit || 10
  });

  return NextResponse.json({ results, count: results.length });
}
```

#### `/app/api/brain/ask/route.ts`
```typescript
import { answerQuestion } from '@/lib/brain/qa';

export async function POST(request: Request) {
  const { question, state, county } = await request.json();

  const answer = await answerQuestion(question, { state, county });

  return NextResponse.json(answer);
}
```

#### `/app/api/admin/upload/route.ts`
```typescript
export async function POST(request: Request) {
  // 1. Parse multipart/form-data
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const state = formData.get('state') as string;
  const county = formData.get('county') as string;
  const topic = formData.get('topic') as string;
  const sourceUrl = formData.get('source_url') as string;

  // 2. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('research-documents')
    .upload(`${state}/${county}/${file.name}`, file);

  if (uploadError) throw uploadError;

  // 3. Create record in sources table
  const { data: source, error: sourceError } = await supabase
    .from('sources')
    .insert({
      file_name: file.name,
      file_path: uploadData.path,
      file_type: file.name.split('.').pop(),
      state_id: stateId,
      county_id: countyId,
      topic,
      source_url: sourceUrl,
      processing_status: 'pending',
      uploaded_by: 'admin',
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (sourceError) throw sourceError;

  // 4. Return success
  return NextResponse.json({
    success: true,
    sourceId: source.id,
    message: 'File uploaded successfully. Processing will begin shortly.'
  });
}
```

---

## 🔧 Environment Variables

Add to `.env.local`:

```bash
# Google Gemini API (for embeddings, RAG, content generation)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Already have:
# NEXT_PUBLIC_SUPABASE_URL
# SUPABASE_SERVICE_ROLE_KEY
# ANTHROPIC_API_KEY (for coding and content writing only)
# ADMIN_PASSWORD

# New (Optional):
ADMIN_ALLOWED_IPS=your.ip.address.here
ADMIN_SESSION_TIMEOUT=1800000  # 30 minutes in ms
```

---

## 📦 New Dependencies

Install:

```bash
npm install @google/generative-ai
npm install @supabase/storage-js  # if not already installed
```

---

## 🗄️ Database Changes

### Add RPC Function for Vector Search

```sql
-- Create function for semantic search using pgvector
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_state text DEFAULT NULL,
  filter_county text DEFAULT NULL,
  filter_topic text DEFAULT NULL
)
RETURNS TABLE (
  id int,
  text text,
  state text,
  county text,
  topic text,
  phase text,
  source_id int,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.text,
    kc.state,
    kc.county,
    kc.topic,
    kc.phase,
    kc.source_id,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks kc
  WHERE
    (filter_state IS NULL OR kc.state = filter_state)
    AND (filter_county IS NULL OR kc.county = filter_county)
    AND (filter_topic IS NULL OR kc.topic = filter_topic)
    AND 1 - (kc.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

### Add Supabase Storage Bucket

```sql
-- Create bucket for research documents (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('research-documents', 'research-documents', false);

-- Set up policies for admin access
CREATE POLICY "Admin can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'research-documents');

CREATE POLICY "Admin can read files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'research-documents');
```

---

## 📋 Implementation Checklist

### Phase 1: Brain SDK (Priority 1)
- [ ] Add Google Gemini API key to `.env.local`
- [ ] Install `@google/generative-ai` package
- [ ] Create `/lib/brain/client.ts`
- [ ] Create `/lib/brain/embeddings.ts` (using Gemini)
- [ ] Create `/lib/brain/search.ts` (using Gemini embeddings)
- [ ] Create `/lib/brain/qa.ts` (using Gemini for RAG)
- [ ] Create `/lib/brain/data.ts` (data retrieval utilities)
- [ ] Create `/lib/brain/types.ts` (TypeScript types)
- [ ] Add RPC function for vector search to Supabase
- [ ] Test semantic search
- [ ] Test RAG Q&A

### Phase 2: File Upload Interface
- [ ] Create Supabase Storage bucket `research-documents`
- [ ] Create `/app/admin/upload/page.tsx`
- [ ] Create `/app/api/admin/upload/route.ts`
- [ ] Add drag & drop file upload UI
- [ ] Add text paste area
- [ ] Add metadata form (state, county, topic, source URL)
- [ ] Implement file upload to Supabase Storage
- [ ] Create record in `sources` table with `processing_status = 'pending'`
- [ ] Add upload progress indicator
- [ ] Add success/error notifications
- [ ] Update admin navigation to include "Upload" link
- [ ] Test file upload flow
- [ ] Test text upload flow

### Phase 3: Monetization Dashboard
- [ ] Create `/app/admin/monetization/page.tsx`
- [ ] Create lead stats query functions
- [ ] Create partner stats query functions
- [ ] Create revenue calculation functions
- [ ] Add revenue cards (total, monthly, leads, conversion)
- [ ] Add partner performance table
- [ ] Add leads status breakdown chart
- [ ] Add recent leads table
- [ ] Add revenue trend chart
- [ ] Add export functionality (CSV)
- [ ] Update admin navigation to include "Monetization" link
- [ ] Test monetization dashboard

### Phase 4: Enhanced Security
- [ ] Add session timeout logic to middleware
- [ ] Implement rate limiting for login route
- [ ] Add IP whitelisting (optional)
- [ ] Add activity logging
- [ ] Add CSRF protection
- [ ] Add 2FA support (future)
- [ ] Test security enhancements

### Phase 5: Website Integration
- [ ] Create API routes (`/api/brain/search`, `/api/brain/ask`)
- [ ] Create citation display component
- [ ] Enhance county pages with Brain data
- [ ] Create FAQ generation using Gemini
- [ ] Add interactive Q&A feature
- [ ] Test county page integration
- [ ] Test FAQ generation
- [ ] Test interactive Q&A

---

## 🚀 Deployment

1. **Environment Variables**
   - Add `GOOGLE_GEMINI_API_KEY` to Vercel
   - Verify all other env vars are set

2. **Database**
   - Run vector search RPC function SQL
   - Create storage bucket and policies
   - Verify pgvector extension is enabled

3. **Build & Deploy**
   ```bash
   npm run build
   git push origin main  # Auto-deploys to Vercel
   ```

4. **Post-Deployment Checks**
   - [ ] Admin login works
   - [ ] File upload works
   - [ ] Semantic search works
   - [ ] RAG Q&A works
   - [ ] Monetization dashboard loads
   - [ ] County pages load Brain data

---

## 🔐 Security Best Practices

1. **Admin Access**
   - Strong password (already set: `ADMIN_PASSWORD`)
   - HTTP-only cookies
   - Session timeout (30 minutes)
   - Rate limiting on login
   - IP whitelisting (optional)
   - 2FA (future)

2. **API Security**
   - Validate all inputs
   - Sanitize file uploads
   - Limit file sizes (max 10MB)
   - Check file types (only .pdf, .docx, .txt)
   - Use service role key only on server
   - Never expose API keys to client

3. **Database Security**
   - Row-level security on Supabase
   - Service role for admin operations
   - Anon key for public data only
   - Regular backups

---

## 📊 Success Metrics

- [ ] File upload success rate > 95%
- [ ] Semantic search response time < 500ms
- [ ] RAG Q&A response time < 3s
- [ ] Admin dashboard load time < 1s
- [ ] Zero security incidents
- [ ] 100% uptime for admin panel

---

## 🔄 Integration with legal-data-factory

**This repo (duiguide) handles:**
- User-facing website
- Admin dashboard
- File/text uploads → Supabase Storage → `sources` table
- Brain SDK for querying data
- County pages, FAQs, Q&A features
- Lead capture and monetization

**legal-data-factory handles:**
- Monitoring `sources` table for `processing_status = 'pending'`
- Processing documents (extraction, classification, embeddings)
- Populating `knowledge_chunks`, `citations`, `curated_data`
- Setting `processing_status = 'completed'` or `'error'`

**Workflow:**
1. Admin uploads file via `/admin/upload` → creates `sources` record with `status = 'pending'`
2. legal-data-factory picks up pending source
3. legal-data-factory processes and creates knowledge chunks/citations
4. legal-data-factory updates `sources.processing_status = 'completed'`
5. Admin views result in `/admin/processing`
6. Website uses Brain SDK to query knowledge_chunks for county pages

---

## Next Steps

Ready to start implementation? Let me know which phase you want to tackle first:

1. **Phase 1: Brain SDK** - Core intelligence layer using Gemini
2. **Phase 2: File Upload** - Admin upload interface
3. **Phase 3: Monetization** - Revenue tracking dashboard
4. **Phase 4: Security** - Enhanced admin protection

I recommend starting with **Phase 1 (Brain SDK)** since it's the foundation for everything else.

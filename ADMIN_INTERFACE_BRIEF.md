# Admin Interface - DUIarrested.com

*Last Updated: December 23, 2024*

## Purpose

Internal-only dashboard for monitoring:
- Lead pipeline and revenue
- Partner management
- Content verification status
- Data processing status (from legal-data-factory)
- Site analytics

**Visibility**: Admin only (password protected, NOT public)

---

## Access Control

### Route Protection
```
/admin/*  ← All admin routes require authentication
```

### Authentication Strategy

**Option 1: Simple Password (MVP)**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_auth');

    if (!authCookie || authCookie.value !== process.env.ADMIN_SECRET_HASH) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
```

**Option 2: Supabase Auth (Future)**
- Use Supabase Auth with admin role
- More secure, supports multiple users

---

## Dashboard Sections

### 1. Lead Pipeline (`/admin/leads`)

**Purpose**: Monitor lead quality, revenue, partner performance

**Metrics Display**:
```
┌─────────────────────────────────────────────────────┐
│  LEADS TODAY                                        │
├─────────────────────────────────────────────────────┤
│  📊 Total Leads: 12                                 │
│  ✅ Qualified: 9 (75%)                              │
│  ❌ Rejected: 3 (25%)                               │
│  💰 Revenue: $1,350                                 │
│                                                      │
│  By Tier:                                           │
│    Standard (0-50):   4 leads  →  $400             │
│    Premium (51-80):   3 leads  →  $525             │
│    High-Value (81+):  2 leads  →  $425             │
└─────────────────────────────────────────────────────┘
```

**Lead Table**:
| Time | Name | County | Score | Tier | Partner | Status | Value |
|------|------|--------|-------|------|---------|--------|-------|
| 10:45am | John D. | Harris, TX | 85 | High-Value | Smith & Associates | Routed | $250 |
| 10:32am | Sarah M. | Maricopa, AZ | 62 | Premium | AZ DUI Defense | Contacted | $175 |
| 10:15am | Mike R. | Harris, TX | 45 | Standard | LegalMatch | Rejected | - |

**Filters**:
- Date range
- State/County
- Tier (Standard/Premium/High-Value)
- Status (New/Routed/Contacted/Converted/Rejected)
- Partner

**Actions**:
- View lead details
- Download CSV
- Manually route lead
- Mark as converted/lost

---

### 2. Partner Management (`/admin/partners`)

**Purpose**: Manage law firm partnerships, pricing, performance

**Partner List**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Smith & Associates (Texas)                                     │
├─────────────────────────────────────────────────────────────────┤
│  Status: ✅ Active                                              │
│  CPL Rate: $250 (High-Value), $175 (Premium), $100 (Standard)  │
│  Monthly Cap: 50 leads                                          │
│  This Month: 34 leads (68% of cap)                             │
│  Counties Served: Harris, Fort Bend, Montgomery                │
│  Conversion Rate: 42% (14/34)                                   │
│  Revenue YTD: $8,750                                            │
│                                                                  │
│  [Edit] [Pause] [View Leads]                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Add New Partner Form**:
```
Firm Name: _______________________
Contact Name: _______________________
Email: _______________________
Phone: _______________________

Service Area:
  State: [Texas ▾]
  Counties: [☑ Harris] [☐ Dallas] [☐ Tarrant] ...

Pricing:
  Standard CPL:    $______
  Premium CPL:     $______
  High-Value CPL:  $______

Monthly Cap: ______ leads

Intake Method:
  ○ Email
  ○ Webhook (URL: ____________)
  ○ Phone Call

[Save Partner]
```

---

### 3. Content Status (`/admin/content`)

**Purpose**: Track which counties have complete data, what needs updating

**State Overview**:
```
┌─────────────────────────────────────────────────────┐
│  TEXAS                                              │
├─────────────────────────────────────────────────────┤
│  Counties: 254 total, 10 priority                   │
│  Complete: 1/10 priority (Harris)                   │
│  In Progress: 2/10 (Dallas, Tarrant)                │
│  Not Started: 7/10                                  │
│                                                      │
│  Last Updated: Harris County (3 days ago)           │
│  Needs Verification: 0 counties                     │
└─────────────────────────────────────────────────────┘
```

**County Detail View** (e.g., Harris County):
```
┌─────────────────────────────────────────────────────────────────┐
│  HARRIS COUNTY, TEXAS                                           │
├─────────────────────────────────────────────────────────────────┤
│  Status: ✅ Complete (Tier 1)                                   │
│  Last Verified: 2024-12-20 (3 days ago)                        │
│                                                                  │
│  Data Completeness:                                             │
│    ✅ Court Information (complete)                              │
│    ✅ Impound Fees (complete)                                   │
│    ✅ Bail Information (complete)                               │
│    ✅ SCRAM Providers (2 providers)                             │
│    ⚠️  Diversion Program (needs update)                         │
│                                                                  │
│  Research Files (5):                                            │
│    📄 impound-fees-2024.pdf (processed ✅)                       │
│    📄 court-procedures.docx (processed ✅)                       │
│    📄 bail-schedule.pdf (processed ✅)                           │
│    📄 scram-providers.md (processed ✅)                          │
│    📄 dmv-hearing.html (processing... ⏳)                       │
│                                                                  │
│  Pages Generated:                                               │
│    ✅ /texas/harris/                                            │
│    ✅ /texas/harris/impound/                                    │
│    ✅ /texas/harris/bail/                                       │
│    ✅ /texas/harris/dmv/                                        │
│    ✅ /texas/harris/scram/                                      │
│                                                                  │
│  [Mark for Verification] [Revalidate Pages] [Upload Files]     │
└─────────────────────────────────────────────────────────────────┘
```

**Missing Data Report**:
| County | State | Priority | Missing |
|--------|-------|----------|---------|
| Dallas | TX | 1 | Court hours, Impound fees, Bail range |
| Maricopa | AZ | 1 | SCRAM providers, Diversion program |
| Denver | CO | 1 | All data (not started) |

---

### 4. Data Processing Status (`/admin/processing`)

**Purpose**: Monitor legal-data-factory pipeline status

**Recent Uploads**:
| File | State/County | Topic | Uploaded | Status | Actions |
|------|-------------|-------|----------|--------|---------|
| dallas-impound.pdf | TX/Dallas | Impound | 2 hrs ago | Processing... | View |
| maricopa-scram.docx | AZ/Maricopa | SCRAM | 1 day ago | ✅ Complete | View |
| harris-diversion.html | TX/Harris | Court | 3 days ago | ❌ Error | Retry |

**Processing Queue**:
```
┌─────────────────────────────────────────────────────┐
│  ACTIVE JOBS                                        │
├─────────────────────────────────────────────────────┤
│  dallas-impound.pdf                                 │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  60%                        │
│  Current: Curator (extracting structured data)     │
│                                                      │
│  denver-court.pdf                                   │
│  ▓▓▓░░░░░░░░░░░░░░░░░  15%                        │
│  Current: Librarian (converting to markdown)       │
└─────────────────────────────────────────────────────┘
```

**Error Log**:
```
┌─────────────────────────────────────────────────────────────────┐
│  [2024-12-23 10:45:23] harris-diversion.html                   │
│  Error in Librarian agent: Invalid HTML structure              │
│  File may be corrupted or require manual conversion            │
│  [Retry] [Download] [Delete]                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Analytics (`/admin/analytics`)

**Purpose**: Site traffic, user behavior, conversion funnel

**Traffic Overview**:
```
┌─────────────────────────────────────────────────────┐
│  LAST 30 DAYS                                       │
├─────────────────────────────────────────────────────┤
│  👥 Unique Visitors: 12,450                         │
│  📄 Page Views: 34,820                              │
│  ⏱️  Avg Session: 3m 42s                            │
│  📝 Lead Forms: 287                                 │
│  ✅ Qualified Leads: 198 (69%)                      │
│  💰 Revenue: $28,450                                │
└─────────────────────────────────────────────────────┘
```

**Top Pages** (by traffic):
| Page | Views | Avg Time | Bounce | Leads |
|------|-------|----------|--------|-------|
| /texas/ | 4,520 | 2m 15s | 42% | 34 |
| /texas/harris/ | 3,210 | 4m 30s | 28% | 52 |
| /guide/scram-bracelet/ | 2,840 | 5m 12s | 22% | 48 |
| /texas/harris/impound/ | 1,950 | 3m 45s | 35% | 19 |

**Conversion Funnel**:
```
Homepage           12,450 visitors (100%)
    ↓ 68%
State Page         8,466 visitors (68%)
    ↓ 45%
County Page        3,810 visitors (31%)
    ↓ 28%
Sub-page           1,067 visitors (9%)
    ↓ 27%
Lead Form Started  287 visitors (2.3%)
    ↓ 69%
Lead Submitted     198 leads (1.6%)
```

**Search Queries** (what brought users):
| Query | Impressions | Clicks | CTR | Avg Position |
|-------|-------------|--------|-----|--------------|
| harris county impound fees | 4,250 | 340 | 8.0% | 3.2 |
| scram bracelet texas | 3,120 | 280 | 9.0% | 2.8 |
| dui bail harris county | 2,890 | 210 | 7.3% | 4.1 |

---

### 6. Settings (`/admin/settings`)

**Site Settings**:
```
Lead Form Notifications:
  Email: admin@duiarrested.com
  Slack Webhook: https://hooks.slack.com/...

Revalidation:
  Secret: **************** [Regenerate]

AI Chat:
  Gemini API Key: ****************
  Max Context Chunks: 5
  Model: gemini-2.0-flash

Legal Disclaimers:
  Show disclaimer: ✅ Enabled
  Footer text: [Edit]
```

**User Management** (future):
```
Admin Users:
  john@company.com (Owner) - Last login: Today
  sarah@company.com (Editor) - Last login: 3 days ago

[Add User]
```

---

## UI Components Needed

### 1. Stats Card
```tsx
<StatsCard
  title="Total Leads"
  value={287}
  change={+12.5}
  period="vs last month"
  icon={<Users />}
/>
```

### 2. Lead Table
```tsx
<LeadTable
  leads={leads}
  onView={(id) => router.push(`/admin/leads/${id}`)}
  onRoute={(id, partnerId) => routeLead(id, partnerId)}
/>
```

### 3. County Status Badge
```tsx
<CountyStatusBadge
  status="complete"  // complete | in-progress | not-started | needs-verification
  lastVerified="2024-12-20"
/>
```

### 4. Processing Progress Bar
```tsx
<ProcessingProgress
  fileName="dallas-impound.pdf"
  stage="curator"  // librarian | taxonomist | researcher | curator | embeddings
  progress={60}
/>
```

---

## Database Additions

### `partners` table (create)
```sql
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  firm_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),

  -- Service area
  counties_served INTEGER[], -- Array of county IDs

  -- Pricing
  cpl_standard DECIMAL(10,2),
  cpl_premium DECIMAL(10,2),
  cpl_high_value DECIMAL(10,2),

  -- Caps
  monthly_cap INTEGER,

  -- Integration
  intake_method VARCHAR(50), -- 'email', 'webhook', 'phone'
  webhook_url TEXT,

  -- Status
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'churned'

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `leads` table (enhance existing)
```sql
-- Add columns if not exist:
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency_score INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_value_tier VARCHAR(20);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_partner_id INTEGER REFERENCES partners(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS partner_cpl DECIMAL(10,2);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS conversion_status VARCHAR(20);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS conversion_date TIMESTAMPTZ;
```

### `admin_activity_log` table (create)
```sql
CREATE TABLE admin_activity_log (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  action VARCHAR(50), -- 'lead_routed', 'partner_added', 'content_verified', etc.
  resource_type VARCHAR(50),
  resource_id INTEGER,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Implementation Priority

### Phase 1: MVP (Week 1)
- [ ] Simple password auth (`/admin/login`)
- [ ] Lead pipeline view (`/admin/leads`)
- [ ] Basic stats dashboard (`/admin/`)
- [ ] Partner list view (`/admin/partners`)

### Phase 2: Core Features (Week 2)
- [ ] Partner management (add/edit/pause)
- [ ] Lead detail view with routing
- [ ] Content status overview
- [ ] CSV export for leads

### Phase 3: Advanced (Week 3)
- [ ] Processing status monitor
- [ ] Analytics dashboard
- [ ] Admin activity log
- [ ] Automated notifications (Slack/email)

### Phase 4: Polish (Week 4)
- [ ] Multi-user support (Supabase Auth)
- [ ] Advanced filtering/search
- [ ] Bulk actions
- [ ] API endpoints for external tools

---

## Security Considerations

1. **No public exposure**: All `/admin/*` routes require auth
2. **Separate from user data**: Admin cookies/sessions separate from user sessions
3. **Audit logging**: Track all admin actions
4. **Rate limiting**: Prevent brute force on login
5. **HTTPS only**: Admin routes must use HTTPS in production
6. **Environment variables**: All secrets in .env, never committed

---

## Tech Stack

- **Framework**: Next.js App Router
- **Auth**: Simple password → Supabase Auth (future)
- **Database**: Supabase (same as main app)
- **UI**: shadcn/ui + Tailwind CSS (consistent with main site)
- **Charts**: Recharts or Chart.js
- **Tables**: TanStack Table (React Table v8)

---

## Next Steps

1. **Create admin layout** (`/app/admin/layout.tsx`)
2. **Build login page** (`/app/admin/login/page.tsx`)
3. **Add middleware auth** (`middleware.ts`)
4. **Create dashboard** (`/app/admin/page.tsx`)
5. **Build leads table** (`/app/admin/leads/page.tsx`)

Want me to start building the admin interface? Let me know which section to prioritize!

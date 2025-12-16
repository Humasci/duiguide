# DUI Guide - Complete Implementation Guide

## 🎯 Project Overview

**Goal:** Build duiarrested.com - 3,000+ hyper-localized DUI survival guide pages  
**Tech Stack:** Next.js 14, Supabase, Tailwind CSS, Claude Sonnet 4 API  
**Expected Cost:** $5-15 for initial 100 priority counties  

## 🚀 Quick Start (15 minutes)

### Step 1: Database Setup
```bash
# Run the migration in your Supabase SQL Editor
cat migrations/001_dui_content_tables.sql | pbcopy
# Paste and run in Supabase Dashboard > SQL Editor
```

### Step 2: Environment Setup
```bash
# Add to your .env.local file
ANTHROPIC_API_KEY=your_claude_api_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### Step 3: Seed Initial Data
```bash
# Install dependencies and seed states
npm install
npm run seed:states
npm run import:counties

# Verify setup
npm run dev
# Visit http://localhost:3000/texas/harris to test
```

## 📊 Build Strategy & Priorities

### Week 1: Foundation (HIGH ROI)
**Target:** 7 state pages + 24 priority counties = ~$2 cost
```bash
# Generate state master content (7 states × $0.20 = $1.40)
npm run generate:states

# Generate top-tier counties (24 counties × $0.08 = $1.92)
npm run generate:counties:tier1 -- --limit=24

# Generate high-value SCAM pages (7 states × $0.15 = $1.05)
npm run generate:scram
```
**Expected Traffic:** 5,000+ organic visits/month from deadline searches

### Week 2: Scale Priority Counties
```bash
# Complete all Tier 1 counties (76 total)
npm run generate:counties:tier1

# Generate second DUI content (high-value keywords)
npm run generate:second-dui
```
**Expected Cost:** ~$6 total  
**Expected Traffic:** 15,000+ visits/month

### Month 2: Full Scale
```bash
# Generate all remaining counties
npm run generate:counties:tier2 -- --limit=400
npm run generate:counties -- --tier=3

# Generate CDL content (commercial drivers)
npm run generate:cdl
```

## 📁 File Structure Created

```
duiguide/
├── migrations/
│   └── 001_dui_content_tables.sql          # Database schema
├── scripts/
│   ├── seed-states.ts                      # 7 states with legal data
│   ├── import-counties.ts                  # 24 top counties
│   ├── generate-state-content.ts           # State master content
│   ├── generate-county-content.ts          # County-specific pages
│   └── generate-special-content.ts         # SCAM, Second DUI, CDL
├── app/
│   └── [state]/[county]/page.tsx          # Dynamic county pages
├── components/
│   ├── ui/badge.tsx                        # UI component
│   └── SCAMInfo.tsx                        # SCAM bracelet component
└── lib/supabase/server.ts                  # Fixed server client
```

## 💰 Cost Breakdown

| Content Type | Count | Cost Each | Total |
|-------------|-------|-----------|-------|
| State Master Content | 7 | $0.20 | $1.40 |
| Tier 1 Counties | 24 | $0.08 | $1.92 |
| SCAM Pages | 7 | $0.15 | $1.05 |
| Second DUI Pages | 7 | $0.12 | $0.84 |
| CDL Pages | 7 | $0.10 | $0.70 |
| **Phase 1 Total** | **52 pages** | | **$5.91** |

**ROI Projection:**
- Month 1: 15,000+ organic visits
- Month 3: 50,000+ organic visits  
- Year 1: 500,000+ visits = $50,000+ revenue potential

## 🎯 Page Types & Examples

### 1. State Pages (7 total)
**URL:** `/texas/`  
**Content:** State-specific DWI laws, penalties, deadlines
**Keywords:** "Texas DWI laws", "DWI penalties Texas"

### 2. County Pages (24 Tier 1, 700+ total)
**URL:** `/texas/harris/`  
**Content:** Hyper-local courthouse info, bail ranges, local providers
**Keywords:** "DWI arrest Harris County", "Harris County courthouse"

### 3. High-Value Specialized Pages
**URL:** `/texas/scam-bracelet-dwi/`  
**Content:** SCAM bracelet guide, costs, providers, lifestyle tips
**Keywords:** "SCAM bracelet Texas", "alcohol monitoring cost"

## 🔧 Available NPM Scripts

```bash
# Database & Setup
npm run seed:states           # Populate 7 states
npm run import:counties       # Add 24 priority counties

# Content Generation
npm run generate:states       # Generate state master content
npm run generate:counties     # Generate county content (all)
npm run generate:counties:tier1  # Tier 1 only (custom content)
npm run generate:counties:tier2  # Tier 2 only (semi-custom)
npm run generate:counties:texas  # Texas counties only

# Special Content (High-Value)
npm run generate:special      # All special content types
npm run generate:scam        # SCAM bracelet guides
npm run generate:second-dui  # Second DUI penalty pages
npm run generate:cdl         # CDL DUI consequences
```

## 📈 SEO Strategy & Keywords

### High-Priority Keywords (Phase 1)
1. **"[State] DWI/DUI DMV hearing"** - High intent, deadline urgency
2. **"SCAM bracelet [state]"** - High commercial intent, $10-15/day cost
3. **"Second DUI [state]"** - High penalties, urgent legal help needed
4. **"Get car out of impound DUI"** - Immediate need, local providers

### Content Optimization
- **Deadline Urgency:** Every page emphasizes critical deadlines
- **Local Specificity:** Exact courthouse addresses, phone numbers
- **Actionable Steps:** Immediate next actions, not just information
- **Legal Authority:** Cite state statutes, local rules

## 🗺️ County Prioritization

### Tier 1 (24 counties) - Custom Content
**Criteria:** Population 500K+, high DUI arrest rates
- Texas: Harris, Dallas, Tarrant, Bexar, Travis
- Arizona: Maricopa, Pima
- Georgia: Fulton, Gwinnett, Cobb
- Colorado: Denver, El Paso, Arapahoe
- North Carolina: Mecklenburg, Wake
- Ohio: Franklin, Cuyahoga, Hamilton
- Tennessee: Shelby, Davidson, Knox

### Tier 2 (400 counties) - Semi-Custom
**Criteria:** Population 50K-500K
**Cost:** ~$20 total

### Tier 3 (2,500+ counties) - Template
**Criteria:** All remaining counties
**Cost:** ~$120 total (automated with local data injection)

## 🎨 UI Components

### SCAMInfo Component
**Purpose:** Display SCAM bracelet information with local providers
**Props:** `state`, `county`, `providers[]`
**Usage:** 
```tsx
<SCAMInfo 
  state={stateData} 
  county={countyData}
  providers={scramProviders}
/>
```

### County Page Layout
- **Hero Section:** Urgent deadline alert, local courthouse info
- **Immediate Steps:** 3-step action plan with local context
- **Timeline:** What happens when, county-specific timing
- **Local Resources:** Courthouse details, attorney guidance
- **FAQ:** County-specific questions and answers

## 🚀 Deployment Checklist

### Before Launch
- [ ] Run database migration in production Supabase
- [ ] Set up production environment variables
- [ ] Generate initial content (states + tier 1 counties)
- [ ] Test dynamic routes: `/texas/harris/`
- [ ] Verify mobile responsiveness
- [ ] Set up Google Analytics

### Launch Sequence
1. **Soft Launch:** 7 state pages + 24 tier 1 counties
2. **SEO Boost:** Submit sitemap, optimize page speed
3. **Scale Phase:** Generate remaining counties in batches
4. **Content Expansion:** Add specialized content (SCAM, CDL, etc.)

### Monitoring
- Track page generation costs via `content_generation_logs` table
- Monitor organic traffic growth from deadline keywords
- A/B test attorney lead capture forms
- Track conversion rates by page type

## 💡 Advanced Features (Future)

### Smart Content Updates
- **Legal Changes:** Auto-detect when state laws change
- **Seasonal Content:** Update for holiday DUI enforcement
- **Local Events:** Integrate local court calendars

### Lead Optimization
- **Smart Forms:** Pre-fill with user's county/state
- **Progressive Disclosure:** Collect email → phone → case details
- **Retargeting:** Email sequences based on pages visited

### Content Scaling
- **Voice Search:** Optimize for "Hey Google, what do I do after DUI arrest in Dallas?"
- **Video Content:** Embed explainer videos on complex topics
- **Multilingual:** Spanish versions for high-Hispanic counties

## 🎯 Success Metrics

### 30 Days
- 24 tier 1 counties live
- 10,000+ organic page views
- 500+ email signups
- 50+ attorney lead submissions

### 90 Days  
- 500+ counties live
- 75,000+ organic page views
- 5,000+ email signups
- 500+ attorney leads ($50,000+ revenue potential)

### 1 Year
- 3,000+ counties live
- 500,000+ organic page views
- 50,000+ email signups  
- 5,000+ attorney leads ($500,000+ revenue potential)

---

## 🚨 IMMEDIATE ACTION REQUIRED

### Right Now (5 minutes):
1. Add `ANTHROPIC_API_KEY` to your `.env.local`
2. Run: `npm run seed:states`
3. Run: `npm run import:counties` 

### Today (1 hour):
1. Run database migration in Supabase
2. Generate initial content: `npm run generate:counties:tier1 -- --limit=5`
3. Test first county page: `/texas/harris/`

### This Week:
1. Generate all tier 1 content (~$6 cost)
2. Set up production deployment
3. Submit initial sitemap to Google

**The foundation is built. Now execute and scale! 🚀**
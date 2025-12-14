# DUI Guide

A lead generation website that provides hyper-localized DUI arrest guidance for 7 US states. The site connects people recently arrested for DUI with local attorneys through an AI-powered intake system (web forms + voice agent).

## Core Principle

**Genuinely helpful content first, lead generation second.** The content must be accurate, locally specific, and valuable enough to rank organically and earn trust.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4 + Plausible

### Backend
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth (for partner portal)
- **Storage**: Supabase Storage
- **API**: Next.js API routes + Supabase Edge Functions

### Automation
- **Workflows**: n8n (self-hosted)
- **Scraping**: Firecrawl API + custom scrapers
- **Search API**: SerpAPI

### AI/Voice
- **Voice Agent**: Vapi
- **Telephony**: Twilio (via Vapi)
- **Content Generation**: Claude API
- **Embeddings**: OpenAI (for RAG)

## Project Structure

```
duiguide/
├── app/                       # Next.js App Router
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # shadcn components
│   ├── forms/                # Form components
│   ├── layout/               # Layout components
│   └── location/             # Location selectors
├── lib/
│   ├── supabase/             # Supabase clients
│   ├── utils/                # Utility functions
│   └── constants/            # App constants
├── types/                    # TypeScript types
├── packages/
│   └── database/             # Database schema & migrations
│       ├── schema.sql        # Full Supabase schema
│       └── seed/             # Seed data
└── scripts/                  # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)
- Vercel account (for deployment, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd duiguide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME="DUI Guide"
   ```

4. **Set up the database**

   a. Create a new Supabase project at https://supabase.com

   b. Run the database schema:
   ```bash
   # In Supabase SQL Editor, run:
   packages/database/schema.sql
   ```

   c. Seed the states data:
   ```bash
   # In Supabase SQL Editor, run:
   packages/database/seed/states.sql
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Building for Production

```bash
npm run build
```

### Running Production Build Locally

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Week 1 Deliverables ✅

- [x] Database: Schema created and states seeded
- [x] Project setup: Next.js with TypeScript, Tailwind, shadcn
- [x] Core components: Header, Footer, basic layout
- [x] State selector: Working state/county selection
- [x] Intake form: Multi-step form with validation

## Next Steps (Week 2)

- [ ] County page template: Full layout with placeholder content
- [ ] API routes: Lead submission, location detection
- [ ] Supabase integration: CRUD operations
- [ ] Content generation script: Generate pages from DB

## Key Features

### Multi-Step Intake Form

The intake form collects essential information in 4 steps:

1. **Location**: State and county selection
2. **Timing**: When the arrest occurred
3. **Details**: Case specifics (first offense, accident, CDL, etc.)
4. **Contact**: How to reach the user

Form includes:
- Real-time validation with Zod
- Progress indicator
- Mobile-optimized design
- Consent checkboxes
- Error handling

### State/County Selectors

- Dynamic county loading based on selected state
- Accessibility-compliant dropdown components
- Loading states and error handling

### Layout Components

- Sticky header with call-to-action
- Footer with state links and disclaimer
- Breadcrumbs for navigation
- Responsive mobile design

## Database Schema

The database includes tables for:
- **States**: State-level DUI information and laws
- **Counties**: County-specific court and DMV data
- **Content Pages**: Generated content for each county
- **Leads**: User submissions from forms/calls
- **Partners**: Attorney partner information
- **Prospects**: Potential attorney partners
- **Knowledge Base**: AI-retrievable DUI information
- **Research Sources**: Scraped data sources

See `packages/database/schema.sql` for the full schema.

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `NEXT_PUBLIC_SITE_URL`: Your site URL

Optional (for future features):
- Vapi (voice AI)
- Twilio (telephony)
- Anthropic Claude API (content generation)
- OpenAI API (embeddings)
- n8n (automation)
- Analytics (GA, Plausible)

## Contributing

This is a private project. Please contact the project owner for contribution guidelines.

## License

Copyright © 2024 DUI Guide. All rights reserved.

## Support

For questions or issues, please contact the project team.

-- =============================================
-- ENABLE EXTENSIONS
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";  -- For embeddings

-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE consent_type AS ENUM ('one_party', 'two_party');
CREATE TYPE content_status AS ENUM (
  'not_started', 'researching', 'drafted', 'reviewing', 'published', 'needs_update'
);
CREATE TYPE lead_source AS ENUM ('web_form', 'phone', 'chat');
CREATE TYPE lead_status AS ENUM (
  'new', 'qualified', 'sent', 'accepted', 'rejected',
  'converted', 'lost', 'refund_requested', 'refunded'
);
CREATE TYPE partner_status AS ENUM (
  'prospect', 'contacted', 'negotiating', 'contract_sent',
  'active', 'paused', 'churned'
);
CREATE TYPE prospect_status AS ENUM (
  'new', 'researching', 'ready', 'contacted', 'replied',
  'interested', 'negotiating', 'signed', 'declined', 'unresponsive'
);
CREATE TYPE intake_method AS ENUM ('email', 'webhook', 'sms', 'phone_transfer', 'slack');

-- =============================================
-- STATES TABLE
-- =============================================
CREATE TABLE states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,

  -- Legal/Compliance
  consent_type consent_type NOT NULL,
  bar_advertising_notes TEXT,
  requires_disclaimer BOOLEAN DEFAULT true,
  disclaimer_text TEXT,

  -- DUI Specific (state-level defaults)
  dmv_deadline_days INT,
  bac_limit DECIMAL(4,3) DEFAULT 0.08,
  implied_consent_law BOOLEAN DEFAULT true,
  zero_tolerance_limit DECIMAL(4,3) DEFAULT 0.02,
  enhanced_penalty_bac DECIMAL(4,3) DEFAULT 0.15,
  ignition_interlock_first_offense BOOLEAN DEFAULT false,
  lookback_period_years INT,

  -- Penalties (first offense ranges)
  first_offense_jail_min TEXT,
  first_offense_jail_max TEXT,
  first_offense_fine_min INT,
  first_offense_fine_max INT,
  first_offense_license_suspension TEXT,

  -- Content
  state_overview_content TEXT,
  seo_title TEXT,
  seo_description TEXT,

  -- Operations
  is_active BOOLEAN DEFAULT false,
  launch_priority INT,
  content_status content_status DEFAULT 'not_started',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COUNTIES TABLE
-- =============================================
CREATE TABLE counties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state_id UUID NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  fips_code TEXT,

  -- Demographics
  population INT,
  major_cities TEXT[],
  timezone TEXT,

  -- Court Information
  court_name TEXT,
  court_type TEXT,  -- 'district', 'municipal', 'superior', etc.
  court_address TEXT,
  court_city TEXT,
  court_zip TEXT,
  court_phone TEXT,
  court_website TEXT,
  court_hours TEXT,
  clerk_phone TEXT,

  -- DUI Process (county-specific)
  arraignment_timeline TEXT,
  arraignment_notes TEXT,
  typical_bail_range TEXT,
  bail_notes TEXT,
  public_defender_available BOOLEAN DEFAULT true,
  public_defender_contact TEXT,

  -- Programs
  diversion_programs TEXT[],
  dui_court_available BOOLEAN DEFAULT false,
  dui_court_notes TEXT,
  treatment_programs TEXT[],

  -- Typical Outcomes
  first_offense_typical TEXT,
  second_offense_typical TEXT,

  -- DMV/Administrative
  dmv_office_name TEXT,
  dmv_office_address TEXT,
  dmv_office_phone TEXT,
  admin_hearing_location TEXT,
  admin_hearing_notes TEXT,

  -- Local Notes
  local_procedures TEXT,
  enforcement_notes TEXT,  -- e.g., "Heavy checkpoint activity on weekends"
  special_considerations TEXT,

  -- Content
  content_status content_status DEFAULT 'not_started',
  content_last_updated TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,

  -- Operations
  is_active BOOLEAN DEFAULT false,
  has_partner_coverage BOOLEAN DEFAULT false,
  research_sources TEXT[],
  research_notes TEXT,
  last_verified TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(state_id, slug)
);

-- =============================================
-- CONTENT PAGES TABLE
-- =============================================
CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  county_id UUID NOT NULL REFERENCES counties(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL DEFAULT 'main',  -- 'main', 'first_offense', 'under_21', 'commercial'

  -- SEO
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  meta_description TEXT,
  canonical_url TEXT,

  -- Content Sections (stored as markdown)
  intro_content TEXT,
  immediate_steps_content TEXT,
  deadlines_content TEXT,
  court_process_content TEXT,
  finding_attorney_content TEXT,

  -- Structured Data (stored as JSONB)
  immediate_steps JSONB,      -- [{step: 1, title: "", content: "", urgent: true}]
  deadlines JSONB,            -- [{name: "", days: 15, description: ""}]
  faqs JSONB,                 -- [{question: "", answer: ""}]

  -- Full Content
  full_content_markdown TEXT,
  full_content_html TEXT,

  -- Schema Markup
  schema_faq JSONB,
  schema_howto JSONB,
  schema_breadcrumb JSONB,

  -- Status
  status content_status DEFAULT 'drafted',
  published_at TIMESTAMPTZ,
  last_reviewed TIMESTAMPTZ,
  reviewed_by TEXT,
  review_notes TEXT,

  -- Version Control
  version INT DEFAULT 1,
  previous_version_id UUID REFERENCES content_pages(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(county_id, page_type)
);

-- =============================================
-- KNOWLEDGE BASE TABLE
-- =============================================
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Categorization
  category TEXT NOT NULL,
  subcategory TEXT,
  state_id UUID REFERENCES states(id),
  county_id UUID REFERENCES counties(id),

  -- Content
  topic TEXT NOT NULL,
  question TEXT,           -- For FAQ-style entries
  answer TEXT,
  content TEXT NOT NULL,

  -- For AI Retrieval
  embedding VECTOR(1536),  -- OpenAI embeddings
  keywords TEXT[],

  -- Compliance Flags
  requires_disclaimer BOOLEAN DEFAULT false,
  is_legal_advice BOOLEAN DEFAULT false,  -- Flag to exclude from AI responses

  -- Source
  source_url TEXT,
  source_title TEXT,
  last_verified TIMESTAMPTZ,

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RESEARCH SOURCES TABLE
-- =============================================
CREATE TABLE research_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state_id UUID REFERENCES states(id),
  county_id UUID REFERENCES counties(id),

  -- Source Info
  source_type TEXT NOT NULL,  -- 'court_website', 'state_bar', 'dmv', 'news', 'legal_blog'
  url TEXT NOT NULL,
  title TEXT,
  domain TEXT,

  -- Scraped Content
  raw_html TEXT,
  extracted_text TEXT,
  extracted_data JSONB,

  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_reliable BOOLEAN DEFAULT true,
  scrape_status TEXT DEFAULT 'pending',  -- 'pending', 'success', 'failed'
  scrape_error TEXT,

  -- Schedule
  last_scraped TIMESTAMPTZ,
  scrape_frequency TEXT DEFAULT 'monthly',  -- 'daily', 'weekly', 'monthly', 'quarterly'
  next_scrape TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARTNERS TABLE
-- =============================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Firm Info
  firm_name TEXT NOT NULL,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,

  -- Primary Contact
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Licensing
  states_licensed TEXT[] NOT NULL,
  bar_numbers JSONB,  -- {"TX": "12345678", "AZ": "87654321"}

  -- Coverage
  counties_served UUID[],  -- References counties.id
  cities_served TEXT[],

  -- Commercial Terms
  cpl_rate DECIMAL(10,2) NOT NULL,
  billing_currency TEXT DEFAULT 'USD',
  payment_terms TEXT DEFAULT 'net_30',
  payment_method TEXT,  -- 'wire', 'ach', 'stripe'
  billing_email TEXT,

  -- Lead Caps
  monthly_lead_cap INT,
  daily_lead_cap INT,
  current_month_leads INT DEFAULT 0,
  current_day_leads INT DEFAULT 0,
  cap_reset_day INT DEFAULT 1,  -- Day of month to reset

  -- Intake Preferences
  intake_method intake_method DEFAULT 'email',
  intake_email TEXT,
  intake_webhook_url TEXT,
  intake_phone TEXT,
  intake_slack_webhook TEXT,

  -- Transfer Preferences
  prefers_warm_transfer BOOLEAN DEFAULT false,
  transfer_phone TEXT,
  available_hours JSONB,  -- {"mon": {"start": "09:00", "end": "18:00"}, ...}
  timezone TEXT,

  -- Lead Preferences
  accepts_first_offense BOOLEAN DEFAULT true,
  accepts_repeat_offense BOOLEAN DEFAULT true,
  accepts_felony_dui BOOLEAN DEFAULT true,
  accepts_commercial_dui BOOLEAN DEFAULT true,
  accepts_underage BOOLEAN DEFAULT true,
  min_lead_quality_score INT DEFAULT 1,

  -- Routing
  routing_priority INT DEFAULT 100,  -- Lower = higher priority
  routing_weight DECIMAL(3,2) DEFAULT 1.0,  -- For weighted distribution

  -- Status
  status partner_status DEFAULT 'prospect',
  contract_signed_date DATE,
  contract_end_date DATE,
  contract_document_url TEXT,
  onboarded_at TIMESTAMPTZ,
  paused_at TIMESTAMPTZ,
  pause_reason TEXT,
  churned_at TIMESTAMPTZ,
  churn_reason TEXT,

  -- Performance Metrics
  total_leads_sent INT DEFAULT 0,
  total_leads_accepted INT DEFAULT 0,
  total_leads_rejected INT DEFAULT 0,
  total_leads_converted INT DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  avg_response_time_minutes INT,
  acceptance_rate DECIMAL(5,4),
  conversion_rate DECIMAL(5,4),
  satisfaction_score DECIMAL(3,2),
  last_lead_sent_at TIMESTAMPTZ,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROSPECTS TABLE
-- =============================================
CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Firm Info
  firm_name TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT NOT NULL,
  zip TEXT,

  -- Contact Info
  attorney_name TEXT,
  title TEXT,
  email TEXT,
  phone TEXT,
  linkedin TEXT,

  -- Research Data
  source TEXT NOT NULL,  -- 'avvo', 'justia', 'google', 'state_bar', 'referral'
  source_url TEXT,
  avvo_profile_url TEXT,
  avvo_rating DECIMAL(3,2),
  reviews_count INT,
  years_experience INT,
  practice_areas TEXT[],
  languages TEXT[],

  -- Location Coverage
  counties_likely TEXT[],
  cities_served TEXT[],

  -- Outreach
  status prospect_status DEFAULT 'new',
  outreach_sequence TEXT DEFAULT 'standard',
  outreach_step INT DEFAULT 0,
  last_contacted_at TIMESTAMPTZ,
  last_contact_method TEXT,
  next_followup_at TIMESTAMPTZ,
  email_thread_id TEXT,

  -- Response
  replied_at TIMESTAMPTZ,
  reply_sentiment TEXT,  -- 'positive', 'neutral', 'negative'
  interest_level INT,  -- 1-5
  objections TEXT[],

  -- Conversion
  converted_to_partner_id UUID REFERENCES partners(id),
  converted_at TIMESTAMPTZ,
  declined_reason TEXT,

  -- Notes
  notes TEXT,
  research_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- LEADS TABLE
-- =============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Source Tracking
  source lead_source NOT NULL,
  source_page TEXT,
  source_url TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Session Info
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  device_type TEXT,

  -- Contact Info
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_contact_method TEXT DEFAULT 'phone',
  best_time_to_call TEXT,

  -- Location
  state TEXT NOT NULL,
  county TEXT,
  county_id UUID REFERENCES counties(id),
  city TEXT,
  zip_code TEXT,

  -- Case Details
  arrest_date DATE,
  arrest_recency TEXT,  -- 'today', 'this_week', 'this_month', 'older'
  is_first_offense BOOLEAN,
  prior_offenses INT,
  offense_type TEXT DEFAULT 'standard',  -- 'standard', 'commercial', 'underage', 'felony'
  bac_level DECIMAL(4,3),
  refused_test BOOLEAN,

  -- Circumstances
  has_accident BOOLEAN DEFAULT false,
  has_injury BOOLEAN DEFAULT false,
  has_property_damage BOOLEAN DEFAULT false,
  has_child_in_car BOOLEAN DEFAULT false,
  additional_charges TEXT[],

  -- Employment Impact
  has_cdl BOOLEAN DEFAULT false,
  job_requires_driving BOOLEAN,
  security_clearance BOOLEAN,

  -- Notes from Intake
  intake_notes TEXT,
  caller_concerns TEXT[],

  -- Qualification
  urgency_score INT,  -- 1-10, calculated
  quality_score INT,  -- 1-10, calculated
  is_qualified BOOLEAN DEFAULT true,
  disqualification_reason TEXT,

  -- Phone/Voice Data
  call_recording_url TEXT,
  call_transcript TEXT,
  call_duration_seconds INT,
  call_summary TEXT,
  vapi_call_id TEXT,
  twilio_call_sid TEXT,

  -- Assignment
  assigned_partner_id UUID REFERENCES partners(id),
  assignment_method TEXT,  -- 'auto_geographic', 'auto_roundrobin', 'manual'
  assignment_reason TEXT,
  assigned_at TIMESTAMPTZ,

  -- Partner Interaction
  partner_notified_at TIMESTAMPTZ,
  partner_notification_method intake_method,
  partner_viewed_at TIMESTAMPTZ,
  partner_response lead_status,
  partner_response_at TIMESTAMPTZ,
  partner_rejection_reason TEXT,
  partner_notes TEXT,
  partner_response_time_minutes INT,

  -- Follow-up
  followup_scheduled TIMESTAMPTZ,
  followup_completed BOOLEAN DEFAULT false,
  followup_notes TEXT,

  -- Outcome
  status lead_status DEFAULT 'new',
  converted_at TIMESTAMPTZ,
  conversion_notes TEXT,
  case_value DECIMAL(10,2),
  lost_reason TEXT,

  -- Billing
  is_billable BOOLEAN DEFAULT true,
  billable_amount DECIMAL(10,2),
  invoice_id UUID,
  invoiced_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  refund_requested_at TIMESTAMPTZ,
  refund_reason TEXT,
  refunded_at TIMESTAMPTZ,
  refund_amount DECIMAL(10,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_states_slug ON states(slug);
CREATE INDEX idx_states_active ON states(is_active);

CREATE INDEX idx_counties_state ON counties(state_id);
CREATE INDEX idx_counties_slug ON counties(state_id, slug);
CREATE INDEX idx_counties_active ON counties(is_active);
CREATE INDEX idx_counties_content_status ON counties(content_status);

CREATE INDEX idx_content_pages_county ON content_pages(county_id);
CREATE INDEX idx_content_pages_status ON content_pages(status);

CREATE INDEX idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX idx_knowledge_base_state ON knowledge_base(state_id);
CREATE INDEX idx_knowledge_base_county ON knowledge_base(county_id);

CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_state ON partners USING GIN(states_licensed);

CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_state ON prospects(state);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_state ON leads(state);
CREATE INDEX idx_leads_county ON leads(county_id);
CREATE INDEX idx_leads_partner ON leads(assigned_partner_id);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_counties_updated_at BEFORE UPDATE ON counties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_content_pages_updated_at BEFORE UPDATE ON content_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate lead urgency score
CREATE OR REPLACE FUNCTION calculate_urgency_score(lead_row leads)
RETURNS INT AS $$
DECLARE
  score INT := 5;
BEGIN
  -- Recency boosts
  IF lead_row.arrest_recency = 'today' THEN score := score + 3;
  ELSIF lead_row.arrest_recency = 'this_week' THEN score := score + 2;
  ELSIF lead_row.arrest_recency = 'this_month' THEN score := score + 1;
  END IF;

  -- Situation boosts
  IF lead_row.has_accident THEN score := score + 1; END IF;
  IF lead_row.has_injury THEN score := score + 1; END IF;
  IF lead_row.has_cdl THEN score := score + 1; END IF;
  IF lead_row.is_first_offense = false THEN score := score + 1; END IF;

  RETURN LEAST(score, 10);  -- Cap at 10
END;
$$ LANGUAGE plpgsql;

-- Reset daily lead caps
CREATE OR REPLACE FUNCTION reset_daily_lead_caps()
RETURNS void AS $$
BEGIN
  UPDATE partners SET current_day_leads = 0;
END;
$$ LANGUAGE plpgsql;

-- Reset monthly lead caps
CREATE OR REPLACE FUNCTION reset_monthly_lead_caps()
RETURNS void AS $$
BEGIN
  UPDATE partners
  SET current_month_leads = 0
  WHERE EXTRACT(DAY FROM NOW()) = cap_reset_day;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY (for future partner portal)
-- =============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Policies will be added when auth is implemented

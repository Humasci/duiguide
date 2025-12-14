// Database types for DUI Guide

export type ConsentType = 'one_party' | 'two_party';

export type ContentStatus =
  | 'not_started'
  | 'researching'
  | 'drafted'
  | 'reviewing'
  | 'published'
  | 'needs_update';

export type LeadSource = 'web_form' | 'phone' | 'chat';

export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'sent'
  | 'accepted'
  | 'rejected'
  | 'converted'
  | 'lost'
  | 'refund_requested'
  | 'refunded';

export type PartnerStatus =
  | 'prospect'
  | 'contacted'
  | 'negotiating'
  | 'contract_sent'
  | 'active'
  | 'paused'
  | 'churned';

export type IntakeMethod =
  | 'email'
  | 'webhook'
  | 'sms'
  | 'phone_transfer'
  | 'slack';

export interface State {
  id: string;
  name: string;
  abbreviation: string;
  slug: string;

  // Legal/Compliance
  consent_type: ConsentType;
  bar_advertising_notes?: string;
  requires_disclaimer: boolean;
  disclaimer_text?: string;

  // DUI Specific
  dmv_deadline_days?: number;
  bac_limit: number;
  implied_consent_law: boolean;
  zero_tolerance_limit: number;
  enhanced_penalty_bac: number;
  ignition_interlock_first_offense: boolean;
  lookback_period_years?: number;

  // Penalties
  first_offense_jail_min?: string;
  first_offense_jail_max?: string;
  first_offense_fine_min?: number;
  first_offense_fine_max?: number;
  first_offense_license_suspension?: string;

  // Content
  state_overview_content?: string;
  seo_title?: string;
  seo_description?: string;

  // Operations
  is_active: boolean;
  launch_priority?: number;
  content_status: ContentStatus;

  created_at: string;
  updated_at: string;
}

export interface County {
  id: string;
  state_id: string;
  name: string;
  slug: string;
  fips_code?: string;

  // Demographics
  population?: number;
  major_cities?: string[];
  timezone?: string;

  // Court Information
  court_name?: string;
  court_type?: string;
  court_address?: string;
  court_city?: string;
  court_zip?: string;
  court_phone?: string;
  court_website?: string;
  court_hours?: string;
  clerk_phone?: string;

  // DUI Process
  arraignment_timeline?: string;
  arraignment_notes?: string;
  typical_bail_range?: string;
  bail_notes?: string;
  public_defender_available: boolean;
  public_defender_contact?: string;

  // Programs
  diversion_programs?: string[];
  dui_court_available: boolean;
  dui_court_notes?: string;
  treatment_programs?: string[];

  // Typical Outcomes
  first_offense_typical?: string;
  second_offense_typical?: string;

  // DMV/Administrative
  dmv_office_name?: string;
  dmv_office_address?: string;
  dmv_office_phone?: string;
  admin_hearing_location?: string;
  admin_hearing_notes?: string;

  // Local Notes
  local_procedures?: string;
  enforcement_notes?: string;
  special_considerations?: string;

  // Content
  content_status: ContentStatus;
  content_last_updated?: string;
  seo_title?: string;
  seo_description?: string;

  // Operations
  is_active: boolean;
  has_partner_coverage: boolean;
  research_sources?: string[];
  research_notes?: string;
  last_verified?: string;

  created_at: string;
  updated_at: string;
}

export interface ContentPage {
  id: string;
  county_id: string;
  page_type: string;

  // SEO
  title: string;
  slug: string;
  meta_description?: string;
  canonical_url?: string;

  // Content Sections
  intro_content?: string;
  immediate_steps_content?: string;
  deadlines_content?: string;
  court_process_content?: string;
  finding_attorney_content?: string;

  // Structured Data
  immediate_steps?: ImmediateStep[];
  deadlines?: Deadline[];
  faqs?: FAQ[];

  // Full Content
  full_content_markdown?: string;
  full_content_html?: string;

  // Schema Markup
  schema_faq?: any;
  schema_howto?: any;
  schema_breadcrumb?: any;

  // Status
  status: ContentStatus;
  published_at?: string;
  last_reviewed?: string;
  reviewed_by?: string;
  review_notes?: string;

  // Version Control
  version: number;
  previous_version_id?: string;

  created_at: string;
  updated_at: string;
}

export interface ImmediateStep {
  step: number;
  title: string;
  content: string;
  urgent?: boolean;
}

export interface Deadline {
  name: string;
  days: number;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Lead {
  id: string;

  // Source Tracking
  source: LeadSource;
  source_page?: string;
  source_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  // Session Info
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  device_type?: string;

  // Contact Info
  name?: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  email?: string;
  preferred_contact_method: string;
  best_time_to_call?: string;

  // Location
  state: string;
  county?: string;
  county_id?: string;
  city?: string;
  zip_code?: string;

  // Case Details
  arrest_date?: string;
  arrest_recency?: string;
  is_first_offense?: boolean;
  prior_offenses?: number;
  offense_type: string;
  bac_level?: number;
  refused_test?: boolean;

  // Circumstances
  has_accident: boolean;
  has_injury: boolean;
  has_property_damage: boolean;
  has_child_in_car: boolean;
  additional_charges?: string[];

  // Employment Impact
  has_cdl: boolean;
  job_requires_driving?: boolean;
  security_clearance?: boolean;

  // Notes
  intake_notes?: string;
  caller_concerns?: string[];

  // Qualification
  urgency_score?: number;
  quality_score?: number;
  is_qualified: boolean;
  disqualification_reason?: string;

  // Phone/Voice Data
  call_recording_url?: string;
  call_transcript?: string;
  call_duration_seconds?: number;
  call_summary?: string;
  vapi_call_id?: string;
  twilio_call_sid?: string;

  // Assignment
  assigned_partner_id?: string;
  assignment_method?: string;
  assignment_reason?: string;
  assigned_at?: string;

  // Status
  status: LeadStatus;

  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;

  // Firm Info
  firm_name: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Primary Contact
  contact_name: string;
  contact_title?: string;
  contact_email: string;
  contact_phone?: string;

  // Licensing
  states_licensed: string[];
  bar_numbers?: Record<string, string>;

  // Coverage
  counties_served?: string[];
  cities_served?: string[];

  // Commercial Terms
  cpl_rate: number;
  billing_currency: string;
  payment_terms: string;
  payment_method?: string;
  billing_email?: string;

  // Lead Caps
  monthly_lead_cap?: number;
  daily_lead_cap?: number;
  current_month_leads: number;
  current_day_leads: number;
  cap_reset_day: number;

  // Intake Preferences
  intake_method: IntakeMethod;
  intake_email?: string;
  intake_webhook_url?: string;
  intake_phone?: string;
  intake_slack_webhook?: string;

  // Status
  status: PartnerStatus;

  created_at: string;
  updated_at: string;
}

-- Harris County, Texas - Sample County Data
-- This serves as a template for other counties

-- Get Texas state ID
DO $$
DECLARE
  texas_state_id UUID;
BEGIN
  SELECT id INTO texas_state_id FROM states WHERE abbreviation = 'TX';

  -- Insert Harris County
  INSERT INTO counties (
    state_id,
    name,
    slug,
    fips_code,

    -- Demographics
    population,
    major_cities,
    timezone,

    -- Court Information
    court_name,
    court_type,
    court_address,
    court_city,
    court_zip,
    court_phone,
    court_website,
    court_hours,
    clerk_phone,

    -- DUI Process
    arraignment_timeline,
    arraignment_notes,
    typical_bail_range,
    bail_notes,
    public_defender_available,
    public_defender_contact,

    -- DMV/Administrative
    dmv_office_name,
    dmv_office_address,
    dmv_office_phone,
    admin_hearing_location,
    admin_hearing_notes,

    -- Local Notes
    local_procedures,
    enforcement_notes,

    -- Content
    content_status,
    seo_title,
    seo_description,

    -- Operations
    is_active,
    has_partner_coverage,
    last_verified
  ) VALUES (
    texas_state_id,
    'Harris County',
    'harris',
    '48201',

    -- Demographics
    4731145, -- 2023 estimate
    ARRAY['Houston', 'Pasadena', 'Pearland', 'League City', 'Baytown'],
    'America/Chicago',

    -- Court Information
    'Harris County Criminal Courts',
    'district',
    '1201 Franklin Street',
    'Houston',
    '77002',
    '(713) 755-6044',
    'https://www.hctx.net/courts/criminal',
    'Monday-Friday 8:00 AM - 5:00 PM',
    '(713) 755-5800',

    -- DUI Process
    'Typically 4-6 weeks after arrest',
    'First appearance (arraignment) is usually held at the Harris County Criminal Justice Center. You will receive a notice with your court date.',
    '$500 - $1,500',
    'Bail amounts vary based on BAC level, prior record, and whether there were aggravating circumstances (accident, injury, child in vehicle).',
    true,
    'Harris County Public Defender''s Office: (713) 368-0239',

    -- DMV/Administrative
    'Texas Department of Public Safety - Houston Driver License Office',
    '7007 Rankin Road',
    '(512) 424-2600',
    'State Office of Administrative Hearings (SOAH) - Houston',
    'ALR hearings are conducted by SOAH. Request must be made within 15 days of arrest. Hearing typically scheduled 30-60 days after request.',

    -- Local Notes
    'Harris County processes a high volume of DUI cases. The District Attorney''s office may offer first-time offenders a pretrial diversion program. Cases are typically heard in one of the 16 criminal district courts.',
    'Houston Police Department and Harris County Sheriff''s Office conduct regular DUI checkpoints, especially during holidays. The No Refusal initiative is often in effect during major holidays (New Year''s, Super Bowl, July 4th, Labor Day).',

    -- Content
    'published',
    'What to Do After a DUI Arrest in Harris County, TX | DUI Guide',
    'Arrested for DUI in Harris County? Learn your rights, the 15-day DMV deadline, court process at Harris County Criminal Courts, and get a free attorney consultation.',

    -- Operations
    true, -- is_active
    false, -- has_partner_coverage (will be updated when partners added)
    NOW() -- last_verified
  );

  -- Insert sample content page for Harris County
  INSERT INTO content_pages (
    county_id,
    page_type,
    title,
    slug,
    meta_description,

    -- Structured Data
    immediate_steps,
    deadlines,
    faqs,

    -- Status
    status,
    published_at,
    last_reviewed
  ) VALUES (
    (SELECT id FROM counties WHERE slug = 'harris' AND state_id = texas_state_id),
    'main',
    'What to Do After a DUI Arrest in Harris County, Texas',
    'main',
    'Complete guide to DUI arrests in Harris County, TX. Learn about the 15-day ALR deadline, court process, typical penalties, and how to find a qualified DUI attorney in Houston.',

    -- Immediate Steps
    '[
      {
        "step": 1,
        "title": "Write down everything about your arrest",
        "content": "Document the time, location, officer name, what tests were performed, and any witnesses. Memory fades quickly.",
        "urgent": true
      },
      {
        "step": 2,
        "title": "Request your ALR hearing within 15 days",
        "content": "Call TxDPS at (512) 424-2600 to request your Administrative License Revocation hearing. This protects your driving privileges.",
        "urgent": true
      },
      {
        "step": 3,
        "title": "Consult with a Harris County DUI attorney",
        "content": "An experienced local attorney can guide you through the court process and potentially reduce penalties.",
        "urgent": false
      },
      {
        "step": 4,
        "title": "Gather your documents",
        "content": "Collect your citation, bond paperwork, and any arrest documentation. You''ll need these for your attorney.",
        "urgent": false
      },
      {
        "step": 5,
        "title": "Avoid discussing your case publicly",
        "content": "Do not post about your arrest on social media. Statements can be used against you in court.",
        "urgent": false
      }
    ]'::jsonb,

    -- Deadlines
    '[
      {
        "name": "ALR Hearing Request",
        "days": 15,
        "description": "Request Administrative License Revocation hearing with TxDPS to contest license suspension"
      },
      {
        "name": "Arraignment",
        "days": 30,
        "description": "First court appearance (typically 4-6 weeks after arrest). You''ll receive notice with the specific date."
      }
    ]'::jsonb,

    -- FAQs
    '[
      {
        "question": "How long do I have to request my ALR hearing in Harris County?",
        "answer": "You have 15 days from the date of your arrest to request an Administrative License Revocation hearing. This is critical - missing this deadline results in automatic license suspension."
      },
      {
        "question": "What are the penalties for a first DUI in Harris County?",
        "answer": "First-time DUI offenders in Texas face up to 180 days in jail, fines up to $2,000, and license suspension of 90 days to 1 year. However, many first-time offenders are eligible for pretrial diversion programs that can reduce these penalties."
      },
      {
        "question": "Do I need an attorney for a DUI in Harris County?",
        "answer": "While not legally required, an experienced DUI attorney can navigate Harris County''s court system, potentially reduce penalties, help with ALR hearings, and ensure your rights are protected. Many offer free consultations."
      },
      {
        "question": "Where will my case be heard in Harris County?",
        "answer": "DUI cases in Harris County are typically heard in one of the 16 criminal district courts at the Harris County Criminal Justice Center (1201 Franklin Street, Houston, TX 77002)."
      },
      {
        "question": "Can I get a DUI dismissed in Harris County?",
        "answer": "Dismissal depends on the specific facts of your case. Common defenses include improper stop, faulty breathalyzer calibration, and procedural errors. An attorney can evaluate whether you have grounds for dismissal."
      },
      {
        "question": "What is the pretrial diversion program in Harris County?",
        "answer": "Harris County offers a pretrial intervention program for first-time offenders. Successful completion can result in case dismissal. Eligibility requirements and program details vary - consult with an attorney."
      }
    ]'::jsonb,

    -- Status
    'published',
    NOW(),
    NOW()
  );

END $$;

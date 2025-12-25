# Arizona Content Guide - DUIarrested.com

*Last Updated: December 24, 2025*

## ✅ Arizona Templates Complete

All Arizona page templates are now **database-driven** and ready for content! The following templates have been created:

- `/app/arizona/page.tsx` - Arizona state hub page
- `/app/arizona/maricopa/page.tsx` - Maricopa County hub page
- `/app/arizona/maricopa/impound/page.tsx` - Maricopa County impound page

---

## 📊 Arizona State Data Requirements

### 1. **Arizona State Record** (`states` table)

**SQL Insert Template:**
```sql
INSERT INTO states (
  name,
  slug,
  legal_term,              -- 'DUI' for Arizona
  dmv_deadline_days,        -- 15 days for Arizona
  admin_hearing_term,       -- 'MVD Implied Consent Hearing'
  first_offense_penalties,  -- JSONB (see structure below)
  second_offense_penalties,
  third_offense_penalties
) VALUES (
  'Arizona',
  'arizona',
  'DUI',
  15,
  'MVD Implied Consent Hearing',
  '{
    "jail_time": "10 days - 6 months (minimum 1 day served)",
    "fines": "$250-$2,500 + surcharges",
    "license_suspension": "90 days (30 day restriction possible)",
    "iid_required": "12 months (mandatory)",
    "probation": "Up to 5 years",
    "community_service": "Not mandatory",
    "alcohol_education": "Required (screening and classes)",
    "special_notes": "Mandatory jail time even for first offense"
  }'::jsonb,
  -- Second offense penalties (more severe)
  '{
    "jail_time": "90 days minimum (60 days served)",
    "fines": "$500-$2,500 + surcharges",
    "license_suspension": "12 months",
    "iid_required": "12 months after reinstatement",
    "probation": "Up to 5 years",
    "community_service": "30 hours minimum",
    "alcohol_education": "Required",
    "special_notes": "30 hours community service required"
  }'::jsonb,
  -- Third offense penalties (felony possible)
  '{
    "jail_time": "4 months minimum (if within 84 months)",
    "fines": "Up to $150,000 if felony",
    "license_suspension": "12 months minimum",
    "iid_required": "24 months",
    "probation": "Up to 10 years if felony",
    "community_service": "Required",
    "alcohol_education": "Required",
    "special_notes": "May be charged as Class 4 felony"
  }'::jsonb
);
```

**Important Arizona-Specific Information:**
- Arizona uses **"DUI"** (not DWI or OVI)
- **Three DUI categories**:
  - Standard DUI: BAC 0.08% - 0.149%
  - Extreme DUI: BAC 0.15% - 0.199%
  - Super Extreme DUI: BAC 0.20% or higher
- **Mandatory jail time** even for first-time offenders
- **Mandatory ignition interlock** for ALL DUI convictions (even first offense)
- **15-day MVD hearing deadline** (Motor Vehicle Division)
- **Refusal penalties**: 12 months suspension (first refusal), 24 months (subsequent)

---

## 📍 Arizona County Data Requirements

### 2. **Priority Arizona Counties** (`counties` table)

Top 10 counties by population:
1. **Maricopa** (Phoenix, Scottsdale, Mesa, Tempe, Chandler, Glendale)
2. **Pima** (Tucson, Oro Valley)
3. **Pinal** (Casa Grande, Maricopa, Eloy)
4. **Yavapai** (Prescott, Sedona, Cottonwood)
5. **Yuma** (Yuma, Somerton, San Luis)
6. **Mohave** (Lake Havasu City, Kingman, Bullhead City)
7. **Coconino** (Flagstaff, Sedona)
8. **Cochise** (Sierra Vista, Douglas, Bisbee)
9. **Navajo** (Show Low, Holbrook)
10. **Apache** (St. Johns, Eagar)

**For Each County, Research:**

#### Core Fields:
```sql
INSERT INTO counties (
  name,
  slug,
  state_id,  -- Foreign key to Arizona state record

  -- Impound Data
  impound_daily_fee,           -- e.g., 50.00
  impound_admin_fee,           -- e.g., 175.00
  impound_lot_name,            -- 'Phoenix Official Police Garage'
  impound_lot_address,         -- Full address with city, state, zip
  impound_lot_phone,           -- Phone number
  impound_release_hours,       -- 'Mon-Fri 8AM-5PM, Sat 8AM-12PM'
  impound_payment_methods,     -- 'Cash, Debit Card, Money Order' (Credit cards often NOT accepted)

  -- Court Data
  court_name,                  -- 'Maricopa County Superior Court'
  court_address,               -- Full address
  court_phone,                 -- Phone number
  court_hours,                 -- Business hours
  court_arraignment_timeline,  -- 'Within 24-48 hours of arrest'

  -- Bail Data
  typical_bail_range_min,      -- e.g., 1000
  typical_bail_range_max,      -- e.g., 7500
  jail_name,                   -- 'Maricopa County Jail - 4th Avenue'
  jail_address,                -- Full address
  jail_phone,                  -- Phone number

  -- Diversion Program
  diversion_program_available, -- true/false
  diversion_program_details,   -- Text description if available

  -- Data Quality
  last_verified_at             -- When data was last verified
) VALUES (...);
```

---

## 🔍 Arizona-Specific Research Notes

### Impound Information
- **Maricopa County** (Phoenix area):
  - Phoenix Official Police Garage: (602) 534-7277
  - Multiple impound lots depending on arrest location
  - Payment: Usually cash, debit, or money order (verify credit card acceptance)
  - Hours vary by location

- **Pima County** (Tucson area):
  - Call Tucson Police Non-Emergency: (520) 791-4444
  - Verify which lot has the vehicle

### Court Information
- **Maricopa County**:
  - Superior Court: 620 W Jackson St, Phoenix
  - Justice Courts: Multiple locations by district
  - City Courts: Phoenix, Mesa, Scottsdale, etc. (separate)

- **Pima County**:
  - Superior Court: 110 W Congress St, Tucson
  - Justice Courts: Multiple locations

### Bail Information
- Arizona bail schedules vary by jurisdiction
- DUI bail typically $1,000-$7,500 for first offense
- Extreme DUI and Super Extreme DUI have higher bail
- Contact local bail bondsmen for accurate ranges

### Diversion Programs
- **Maricopa County**: No traditional "diversion" program for DUI
  - Plea agreements may reduce charges
  - Deferred prosecution not common for DUI

- **Pima County**: Limited diversion options
  - First-time offenders may negotiate reduced charges
  - Contact County Attorney's office

---

## 📝 Data Collection Checklist

For each Arizona county:

### Impound Data ✓
- [ ] Daily storage fee
- [ ] Administrative/towing fee
- [ ] Primary impound lot name
- [ ] Lot address and phone
- [ ] Release hours
- [ ] Accepted payment methods (verify credit cards!)

### Court Data ✓
- [ ] Court name (Superior, Justice, or City Court)
- [ ] Court address
- [ ] Clerk's office phone
- [ ] Business hours
- [ ] Arraignment timeline

### Bail Data ✓
- [ ] Typical bail range for first offense DUI
- [ ] County jail name and address
- [ ] Jail phone number
- [ ] Confirm with 2-3 bail bondsmen

### Diversion Program ✓
- [ ] Check County Attorney website
- [ ] Call DA's office: is there a first-offender program?
- [ ] Document eligibility requirements

---

## 🌟 Arizona-Specific Gold Dust Opportunities

Look for these county-specific variations when processing documents:

1. **Cost Anomalies**:
   - Impound fees that differ from state average
   - Court fees or surcharges unique to county
   - Bail schedules that are unusually high/low

2. **Procedural Differences**:
   - Counties with special DUI courts
   - Alternative sentencing programs
   - Weekend jail options
   - Home detention availability

3. **Loopholes**:
   - Early release from impound for financial hardship
   - Reduced fees for vehicle retrieval
   - Installment payment plans for court fees

4. **Exceptions**:
   - Counties that accept credit cards for impound (rare!)
   - Extended hours for vehicle release
   - Special procedures for out-of-state license holders

---

## 📋 Content Workflow for Arizona

### Week 1: Maricopa County (Phoenix)
1. Research and populate Maricopa County data
2. Verify all impound, court, and bail information
3. Test pages at:
   - `/arizona` (state page)
   - `/arizona/maricopa` (county hub)
   - `/arizona/maricopa/impound` (impound calculator)

### Week 2: Pima County (Tucson)
1. Create Pima County pages (copy Maricopa templates)
2. Research Pima-specific data
3. Populate database

### Week 3: Remaining 8 Priority Counties
1. Pinal, Yavapai, Yuma, Mohave
2. Coconino, Cochise, Navajo, Apache

---

## 🔗 Key Arizona Resources

### Official Sites
- **Arizona MVD**: https://azdot.gov/motor-vehicles
- **Maricopa County Superior Court**: https://superiorcourt.maricopa.gov/
- **Pima County Courts**: https://www.sc.pima.gov/
- **Arizona DUI Laws**: A.R.S. § 28-1381 through 28-1387

### Contact Numbers
- **MVD Hearing Request**: (602) 712-7355
- **Maricopa County Court Info**: (602) 506-3204
- **Pima County Court Info**: (520) 724-3255

---

## 💡 Arizona Content Tips

### Three-Tier DUI System
Always mention Arizona's unique three-tier system:
- Standard DUI (0.08-0.149%)
- Extreme DUI (0.15-0.199%) - harsher penalties
- Super Extreme DUI (0.20%+) - even harsher

### Mandatory Jail Time
Emphasize that Arizona requires jail time even for first-time offenders:
- Standard DUI: 10 days (minimum 1 day served)
- Extreme DUI: 30 days (minimum 9 days served)
- Super Extreme DUI: 45 days (minimum 14 days served)

### Ignition Interlock
Stress that Arizona requires ignition interlock for **ALL** DUI convictions:
- First offense: 12 months minimum
- Not optional, not negotiable
- Must be installed before license reinstatement

### MVD Hearing
- 15-day deadline (not 10 days like Texas)
- $500 fee to request hearing
- Called "MVD Implied Consent Hearing"
- Different from court proceedings

---

**Ready to populate Arizona data! Start with Maricopa County (Phoenix area).**

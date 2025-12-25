# Content Creation Guide - DUIarrested.com

*Last Updated: December 24, 2025*

## ✅ What's Ready for Content

All page templates are now **database-driven** and ready for content creation! Here's what you need to populate.

---

## 📊 Database Tables to Populate

### 1. **States Table** (`states`)

**What's Needed:**
```sql
INSERT INTO states (
  name,
  slug,
  legal_term,              -- DWI, DUI, or OVI
  dmv_deadline_days,        -- Usually 10-15 days
  admin_hearing_term,       -- e.g., "ALR hearing" for Texas
  first_offense_penalties,  -- JSONB with all penalty data
  second_offense_penalties,
  third_offense_penalties
) VALUES (...);
```

**Penalty JSON Structure:**
```json
{
  "jail_time": "3-180 days",
  "fines": "$300-$2,000",
  "license_suspension": "90 days - 1 year",
  "iid_required": "Up to 1 year",
  "probation": "Up to 2 years",
  "community_service": "24-100 hours",
  "alcohol_education": "Required (12-32 hours)"
}
```

**Required for:**
- Penalty Matrix component
- State page legal information
- DMV deadline alerts

---

### 2. **Counties Table** (`counties`)

**What's Needed for Each County:**

#### Core Data:
- `name` - County name
- `slug` - URL slug (lowercase, hyphenated)
- `state_id` - Foreign key to states table

#### Impound Data:
- `impound_daily_fee` - Daily storage fee (e.g., 45.00)
- `impound_admin_fee` - One-time admin fee (e.g., 150.00)
- `impound_lot_name` - Primary impound lot name
- `impound_lot_address` - Full address with city, state, zip
- `impound_lot_phone` - Phone number
- `impound_release_hours` - e.g., "Mon-Fri 8AM-5PM"
- `impound_payment_methods` - Comma-separated: "Cash, Credit Card, Money Order"

#### Court Data:
- `court_name` - e.g., "Harris County Criminal Court"
- `court_address` - Full address
- `court_phone` - Phone number
- `court_hours` - Business hours
- `court_arraignment_timeline` - e.g., "Within 48 hours of arrest"

#### Bail Data:
- `typical_bail_range_min` - Minimum bail (e.g., 500)
- `typical_bail_range_max` - Maximum bail (e.g., 5000)
- `jail_name` - County jail name
- `jail_address` - Full address
- `jail_phone` - Phone number

#### Diversion Program:
- `diversion_program_available` - Boolean
- `diversion_program_details` - Text description

#### Timestamps:
- `last_verified_at` - When data was last verified

---

## 📄 Page Templates Now Available

### **State Page** (`/app/texas/page.tsx`)

**Features:**
- ✅ Hero section with state name and legal term
- ✅ DMV deadline alert
- ✅ PenaltyMatrix component (pulls from database)
- ✅ County selection map
- ✅ List of all counties
- ✅ Quick action cards

**What Shows Automatically:**
- State name from database
- Legal term (DWI/DUI/OVI)
- DMV deadline days
- All penalties in interactive matrix
- All counties linked

**Content to Add:**
- State-specific legal information (currently has templates)
- State-specific BAC limits (generic template exists)
- State-specific implied consent laws

---

### **County Hub Page** (`/app/texas/harris/page.tsx`)

**Features:**
- ✅ CrisisGrid component (4 urgent action cards)
- ✅ Gold Dust Intelligence display (if available)
- ✅ Court information (from database)
- ✅ Impound preview (from database)
- ✅ Bail information (from database)
- ✅ Diversion program info (if available)

**What Shows Automatically:**
- County name, state
- Crisis grid with DMV deadline
- All database fields displayed dynamically
- Gold Dust insights (priority=10 items)

**Content to Add:**
- County-specific local context (can be added to a new `local_context` TEXT field)

---

### **County Impound Page** (`/app/texas/harris/impound/page.tsx`)

**Features:**
- ✅ ImpoundCostCalculator component (interactive!)
- ✅ Sticky alert with daily fee
- ✅ Impound lot details (from database)
- ✅ "First 48 Hours" guide
- ✅ "Poverty Trap" warning
- ✅ Payment methods display

**What Shows Automatically:**
- Daily fee and admin fee
- Real-time cost calculation
- Countdown to next charge
- Lot address, hours, phone
- Payment methods

**Content to Add:**
- Everything is template-based, just need database data

---

## 🎯 Priority Content Order

### Week 1: Texas Core Data
1. **Populate Texas state record:**
   - DWI penalties (1st, 2nd, 3rd offense)
   - 15-day DMV deadline
   - ALR hearing terminology

2. **Populate Top 10 Texas Counties:**
   - Harris ✅ (exists)
   - Dallas
   - Tarrant
   - Bexar
   - Travis
   - Collin
   - Denton
   - Hidalgo
   - Fort Bend
   - El Paso

**For Each County, Research:**
- Impound lot (name, address, fees, hours, payment methods)
- Court (name, address, phone, hours, arraignment timeline)
- Bail range (min/max)
- Diversion program (yes/no, details)

### Week 2: Other States
3. **Populate remaining 6 states:**
   - Arizona, Colorado, Georgia, Ohio, North Carolina, Tennessee
   - Same penalty structure as Texas

4. **Populate Top 10 counties per state** (60 total)

---

## 📝 How to Add Content

### Option 1: Direct SQL Insert
```sql
-- Add state
INSERT INTO states (name, slug, legal_term, dmv_deadline_days, ...) VALUES (...);

-- Add county
INSERT INTO counties (
  name, slug, state_id,
  impound_daily_fee, impound_admin_fee,
  court_name, court_address,
  ...
) VALUES (...);
```

### Option 2: Use legal-data-factory
When research files are processed by legal-data-factory:
1. Upload PDF/DOCX to `research-uploads/[state]/[county]/`
2. Run `python scripts/process_all.py`
3. Data automatically extracted to `curated_data`
4. Counties table updated automatically
5. **Gold Dust insights detected automatically!**

### Option 3: Admin Dashboard (Coming Soon)
You mentioned adding partner/affiliate management - we can add a content management section too:
- Edit county data
- Upload research files
- Review Gold Dust intel
- Track verification dates

---

## 🌟 Gold Dust Integration

**Already Built:**
- Gold Dust items show on county hub pages automatically
- Admin dashboard shows all Gold Dust with confidence scores
- Displays friction type (cost_anomaly, loophole, exception, etc.)
- Shows key insights prominently

**How It Works:**
1. legal-data-factory processes a document
2. Curator detects Gold Dust (priority=10)
3. Stores in `curated_data` table
4. County page automatically displays it in yellow highlight box
5. Admin can review in `/admin/gold-dust`

---

## 🔗 Next Steps for Content Creation

1. **Decide on content workflow:**
   - Manual SQL inserts?
   - Research files through legal-data-factory?
   - Mix of both?

2. **Start with Texas** (your biggest state):
   - Verify state penalties are correct
   - Research top 10 counties
   - Add to database

3. **Test pages:**
   - Visit `/texas` to see state page
   - Visit `/texas/harris` to see county hub
   - Visit `/texas/harris/impound` to see calculator

4. **Expand to other states** once Texas template is proven

---

## 💡 Content Tips

### For Impound Data:
- Call the impound lots directly
- Ask for: daily fee, admin fee, hours, payment methods
- Verify payment methods (some don't take credit cards!)

### For Court Data:
- Check county websites
- Call clerk's office for hours and phone
- Arraignment timelines often on court websites

### For Bail Data:
- Call bail bondsmen in the county
- Ask for typical first-offense DUI bail range
- Check county jail website

### For Diversion Programs:
- Check district attorney website
- Call DA's office
- Look for "first offender program" or "deferred prosecution"

---

## 📊 Content Completeness Tracking

Use the admin dashboard at `/admin/coverage` to track:
- Which counties have complete data
- What fields are missing
- When data was last verified
- Completeness percentage

---

**Ready to start? Begin with Texas state penalties and Dallas County!**

---

## 📌 Arizona Content Guide

A separate **ARIZONA_CONTENT_GUIDE.md** has been created with Arizona-specific requirements:
- Arizona uses "DUI" terminology (not DWI)
- Three-tier DUI system (Standard, Extreme, Super Extreme)
- Mandatory jail time for all offenses
- Mandatory ignition interlock for all convictions
- 15-day MVD hearing deadline
- See ARIZONA_CONTENT_GUIDE.md for complete state and county data requirements

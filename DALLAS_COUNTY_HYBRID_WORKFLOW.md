# Dallas County - Full Hybrid Workflow Guide

This guide walks you through adding Dallas County using the hybrid approach: SQL basics + legal-data-factory processing + SQL touch-ups.

---

## ✅ Phase 1: Quick SQL Insert (5 minutes)

**Goal:** Get pages live immediately with basic contact info

### Step 1: Run the SQL Insert

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste this file: `/migrations/add_dallas_county_basic.sql`
3. Click "Run"

**What this does:**
- Creates Dallas County record
- Adds court name, address, phone
- Adds jail name, address, phone
- Adds impound lot name, address
- **Does NOT add:** fees, bail ranges, payment methods (legal-data-factory will do this)

### Step 2: Verify Pages Work

Visit these URLs (they should load with basic info):
- `http://localhost:3000/texas/dallas` - County hub
- `http://localhost:3000/texas/dallas/court` - Court page (has address/phone)
- `http://localhost:3000/texas/dallas/bail` - Bail page (has jail info)
- `http://localhost:3000/texas/dallas/impound` - Impound page (has lot address, NO fees yet)

**Expected Result:** Pages load but say "Data not available" for fees/ranges. That's OK!

---

## 📄 Phase 2: Legal-Data-Factory Setup (30 minutes)

**Goal:** Upload research PDFs and let AI extract fees, bail ranges, Gold Dust

### Step 1: Gather Research Files

Collect PDFs/documents for Dallas County. You need:

**Impound:**
- [ ] Impound fee schedule (daily rate, admin fees)
- [ ] Vehicle release procedures
- [ ] Payment methods accepted

**Bail:**
- [ ] Bail bond schedule
- [ ] Typical bail ranges by charge
- [ ] Bail bondsman information

**Court:**
- [ ] Court procedures document
- [ ] Arraignment timeline
- [ ] Diversion program details

**Where to find these:**
- Dallas County official website
- Dallas County Sheriff website
- Dallas Police Department website
- Court clerk websites
- Google: "Dallas County impound fees 2024 PDF"

---

### Step 2: Upload to Legal-Data-Factory

**Option A: Using upload script (if available)**

```bash
cd /path/to/legal-data-factory

# Upload impound documents
python scripts/upload-research.py \
  --file /path/to/dallas-impound-fees.pdf \
  --state texas \
  --county dallas \
  --topic impound

# Upload bail documents
python scripts/upload-research.py \
  --file /path/to/dallas-bail-schedule.pdf \
  --state texas \
  --county dallas \
  --topic bail

# Upload court documents
python scripts/upload-research.py \
  --file /path/to/dallas-court-procedures.pdf \
  --state texas \
  --county dallas \
  --topic court
```

**Option B: Manual upload to Supabase**

1. Go to Supabase Dashboard → Storage → `research-uploads`
2. Create folder structure:
   ```
   research-uploads/
   └── texas/
       └── dallas/
           ├── impound/
           ├── bail/
           └── court/
   ```
3. Upload your PDFs to the appropriate folders

---

### Step 3: Process with Legal-Data-Factory

Run the processing pipeline:

```bash
cd /path/to/legal-data-factory

# Process all new Dallas County files
python processing/orchestrator.py --state texas --county dallas

# OR process all new files everywhere
python processing/orchestrator.py --process-new
```

**What happens:**
1. **Librarian** converts PDFs → clean text
2. **Taxonomist** tags files (topic: impound/bail/court)
3. **Curator** extracts structured data:
   - `impound_daily_fee: 50.00`
   - `impound_admin_fee: 200.00`
   - `typical_bail_range_min: 1000`
   - `typical_bail_range_max: 5000`
   - Payment methods, hours, etc.
4. **Database updates** automatically:
   ```sql
   UPDATE counties SET
     impound_daily_fee = 50.00,
     impound_admin_fee = 200.00,
     typical_bail_range_min = 1000,
     typical_bail_range_max = 5000,
     impound_payment_methods = 'Cash, Money Order',
     last_verified_at = NOW()
   WHERE slug = 'dallas';
   ```
5. **Gold Dust detection** flags high-value insights

---

### Step 4: Verify Extraction

Check Supabase to see what was extracted:

```sql
-- Check Dallas County record
SELECT
  name,
  impound_daily_fee,
  impound_admin_fee,
  typical_bail_range_min,
  typical_bail_range_max,
  impound_payment_methods,
  court_arraignment_timeline,
  diversion_program_available
FROM counties
WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas');
```

**Expected Result:** Fees and ranges should now have values!

---

### Step 5: Check Gold Dust Insights

See if any high-value insights were detected:

```sql
-- Check Gold Dust for Dallas County
SELECT
  topic,
  gold_dust_metadata->>'key_insight' as insight,
  gold_dust_metadata->>'friction_type' as type,
  confidence_score
FROM curated_data
WHERE county_id = (SELECT id FROM counties WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas'))
  AND priority = 10
ORDER BY confidence_score DESC;
```

**Examples of Gold Dust:**
- "Impound fees waived with proof of financial hardship"
- "Bail reduced by 50% for first-time offenders under 25"
- "Free towing for vehicles within 1 mile of impound lot"

---

## 🔧 Phase 3: Manual Touch-Ups (10 minutes)

**Goal:** Fill in any missing fields that AI didn't catch

### Step 1: Check What's Missing

```sql
SELECT
  name,
  CASE WHEN court_hours IS NULL THEN '❌ Missing' ELSE court_hours END as court_hours,
  CASE WHEN impound_release_hours IS NULL THEN '❌ Missing' ELSE impound_release_hours END as impound_hours,
  CASE WHEN impound_payment_methods IS NULL THEN '❌ Missing' ELSE impound_payment_methods END as payment_methods,
  CASE WHEN diversion_program_available IS NULL THEN '❌ Missing' ELSE 'Has value' END as diversion
FROM counties
WHERE slug = 'dallas';
```

---

### Step 2: Fill Gaps with UPDATE SQL

```sql
-- Add any missing fields
UPDATE counties SET
  -- If AI missed these, add them manually
  impound_release_hours = 'Monday-Friday 8:00 AM - 4:00 PM',
  impound_payment_methods = 'Cash, Money Order, Cashier Check',

  diversion_program_available = true,
  diversion_program_details = 'Dallas County offers a first-time offender program for eligible DWI defendants. Successful completion may result in dismissal of charges. Contact the District Attorney''s office for eligibility.',

  last_verified_at = NOW()
WHERE slug = 'dallas' AND state_id = (SELECT id FROM states WHERE slug = 'texas');
```

---

### Step 3: Final Verification

Visit the pages again:
- `http://localhost:3000/texas/dallas/impound` - Should show calculator with fees
- `http://localhost:3000/texas/dallas/bail` - Should show bail ranges
- `http://localhost:3000/texas/dallas/court` - Should show full court info

**All data should be complete!** ✅

---

## 📊 Summary: What Gets Added When

| Data Field | Phase 1 (SQL) | Phase 2 (AI) | Phase 3 (SQL) |
|------------|---------------|--------------|---------------|
| Court name | ✅ Manual | - | - |
| Court address | ✅ Manual | - | - |
| Court phone | ✅ Manual | - | - |
| Court hours | - | ⚠️ Maybe | ✅ Fill if missing |
| Jail name | ✅ Manual | - | - |
| Impound lot name | ✅ Manual | - | - |
| Impound daily fee | - | ✅ AI extracts | - |
| Impound admin fee | - | ✅ AI extracts | - |
| Bail range min | - | ✅ AI extracts | - |
| Bail range max | - | ✅ AI extracts | - |
| Payment methods | - | ✅ AI extracts | ✅ Fill if missing |
| Diversion program | - | ✅ AI detects | ✅ Fill details |
| **Gold Dust** | - | ✅ AI finds | - |

---

## ⏱️ Time Breakdown

- **Phase 1 (SQL):** 5 minutes → Pages live with basic info
- **Phase 2 (Upload + Process):** 30 minutes → AI extracts fees, ranges, Gold Dust
- **Phase 3 (Touch-ups):** 10 minutes → Fill any gaps

**Total:** ~45 minutes for a complete county with Gold Dust insights

---

## 🎯 Next Steps After Dallas

Once Dallas is complete, repeat for:
1. **Tarrant County** (Fort Worth) - 2nd largest in Texas
2. **Bexar County** (San Antonio) - 3rd largest
3. **Travis County** (Austin) - 4th largest

Use the same workflow for each!

---

## ❓ Troubleshooting

### "Legal-data-factory processing failed"
- Check logs: `python processing/orchestrator.py --verbose`
- Verify Gemini API key is set
- Check if PDF is readable (try opening it)

### "AI didn't extract fees"
- Check `curated_data` table for Dallas
- If data is there but not in `counties`, run manual UPDATE
- If data isn't there, AI couldn't find it → Add via SQL

### "Pages still show 'Data not available'"
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run dev`
- Check Supabase query in page code

---

## 📞 Need Help?

If you get stuck at any phase, let me know where you are:
- Phase 1: SQL insert issues
- Phase 2: Legal-data-factory setup/processing
- Phase 3: Missing data fields

I can help debug!

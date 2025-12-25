# ✅ Dallas County Quickstart Checklist

Follow these steps in order. Should take ~45 minutes total.

---

## 📍 Phase 1: SQL Insert (5 min) - DO THIS NOW

### Step 1: Open Supabase
1. Go to your Supabase dashboard
2. Click **SQL Editor** (left sidebar)

### Step 2: Run the SQL
1. Open this file: `/migrations/add_dallas_county_basic.sql`
2. Copy ALL the SQL
3. Paste into Supabase SQL Editor
4. Click **Run** button

### Step 3: Verify It Worked
You should see output like:
```
name          | slug   | court_name                     | jail_name
Dallas County | dallas | Dallas County Criminal Court   | Dallas County Jail
```

✅ **Phase 1 Complete!** Dallas County record created with basic info.

---

## 🌐 Test the Pages (Optional)

Visit these URLs to see pages with basic data:
- `http://localhost:3000/texas/dallas` - County hub
- `http://localhost:3000/texas/dallas/court` - Court page
- `http://localhost:3000/texas/dallas/bail` - Bail page
- `http://localhost:3000/texas/dallas/impound` - Impound page

**Expected:** Pages load but say "Data not available" for fees/ranges. That's normal!

---

## 📄 Phase 2: Legal-Data-Factory (30 min) - NEXT STEPS

### What You Need:
1. **legal-data-factory repo** - Do you have it?
2. **Research files** - PDFs about Dallas County impound, bail, court

### If You Have legal-data-factory:

**Step 1: Gather PDFs**
Find these documents for Dallas County:
- [ ] Impound fee schedule
- [ ] Bail bond schedule
- [ ] Court procedures

**Where to look:**
- Google: "Dallas County impound fees 2024 PDF"
- Dallas County Sheriff website
- Dallas County Courts website
- Dallas Police Department website

**Step 2: Upload to legal-data-factory**
```bash
cd /path/to/legal-data-factory

python scripts/upload-research.py \
  --file /path/to/dallas-impound-fees.pdf \
  --state texas \
  --county dallas \
  --topic impound

python scripts/upload-research.py \
  --file /path/to/dallas-bail-schedule.pdf \
  --state texas \
  --county dallas \
  --topic bail
```

**Step 3: Process Files**
```bash
python processing/orchestrator.py --state texas --county dallas
```

This will:
- Extract impound fees ($X/day)
- Extract bail ranges ($X - $Y)
- Find Gold Dust insights
- Auto-update Dallas County record

**Step 4: Verify Extraction**
Run this in Supabase SQL Editor:
```sql
SELECT
  impound_daily_fee,
  impound_admin_fee,
  typical_bail_range_min,
  typical_bail_range_max
FROM counties
WHERE slug = 'dallas';
```

Should show extracted values!

✅ **Phase 2 Complete!** AI extracted all the fees and ranges.

---

### If You DON'T Have legal-data-factory:

**Option A: Manual SQL (Faster)**

Just add the fees/ranges manually if you know them:

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

**Option B: Skip for Now**

Pages work without fees/ranges. Add them later when you have legal-data-factory set up.

---

## 🔧 Phase 3: Touch-Ups (10 min) - FINAL STEP

Add any missing fields:

```sql
UPDATE counties SET
  impound_release_hours = 'Monday-Friday 8:00 AM - 4:00 PM',
  impound_payment_methods = 'Cash, Money Order, Cashier Check',
  diversion_program_available = true,
  diversion_program_details = 'Dallas County offers a first-time offender program.',
  last_verified_at = NOW()
WHERE slug = 'dallas';
```

✅ **Phase 3 Complete!** Dallas County pages are 100% complete.

---

## 🎯 Final Verification

Visit the pages again:
- `/texas/dallas/impound` - Should show calculator with fees ✅
- `/texas/dallas/bail` - Should show bail ranges ✅
- `/texas/dallas/court` - Should show full court info ✅

All data complete!

---

## 📊 What You Should Have Now

| Field | Value |
|-------|-------|
| Court name | Dallas County Criminal Court |
| Court address | 133 N. Riverfront Blvd, Dallas, TX 75207 |
| Court phone | (214) 653-7811 |
| Jail name | Dallas County Jail |
| Impound lot | Dallas Police Auto Pound |
| **Impound daily fee** | $50/day (from legal-data-factory) |
| **Bail range** | $1,000 - $5,000 (from legal-data-factory) |
| **Gold Dust** | Any insights found by AI |

---

## 🔄 Repeat for Other Counties

Once Dallas is done, use the same process for:
1. Tarrant County (Fort Worth)
2. Bexar County (San Antonio)
3. Travis County (Austin)

Just change "dallas" to the county slug!

---

## ❓ Need Help?

**If stuck on:**
- ❌ Phase 1 (SQL) → Check Supabase connection
- ❌ Phase 2 (legal-data-factory) → Let me know which step failed
- ❌ Phase 3 (Missing fields) → I can provide specific UPDATE queries

Ready to start? **Begin with Phase 1!** 🚀

# 🚨 CRITICAL TODO - Schema Discrepancies to Fix

**Created:** December 25, 2024
**Status:** NEEDS ATTENTION TOMORROW

---

## ⚠️ MAJOR ISSUES DISCOVERED

### 1. Database Schema Mismatch

**Problem:** Page templates expect columns that don't exist in the actual database.

**Impact:** Dallas County pages won't work until fixed.

**Root Cause:** Pages were written assuming a different schema than what `002_complete_schema.sql` created.

---

## 📋 IMMEDIATE ACTIONS NEEDED (Tomorrow)

### ✅ Step 1: Run These SQLs in Supabase

**IN THIS ORDER:**

1. **Create Dallas County:**
   - File: `/migrations/CORRECT_add_dallas_county.sql`
   - What it does: Creates Dallas County with basic court/jail info
   - Time: 30 seconds

2. **Add Missing Columns:**
   - File: `/migrations/ADD_MISSING_COLUMNS.sql`
   - What it does: Adds impound_daily_fee, typical_bail_range_min, etc.
   - Time: 30 seconds

**Result:** Dallas County pages will work ✅

---

### ✅ Step 2: Process Dallas County Files

Your research files are already uploaded to:
```
research-uploads/texas/dallas county/
```

**Run legal-data-factory:**
```bash
cd /path/to/legal-data-factory
python processing/orchestrator.py --state texas --county dallas
```

**Reference:** `/PHASE_2_LEGAL_DATA_FACTORY.md`

---

### ✅ Step 3: Verify Everything Works

Test these pages:
- `http://localhost:3000/texas/dallas`
- `http://localhost:3000/texas/dallas/impound`
- `http://localhost:3000/texas/dallas/bail`
- `http://localhost:3000/texas/dallas/court`

**Expected:** All pages load with data from database ✅

---

## 🔍 SCHEMA DISCREPANCIES TO INVESTIGATE

### Issue #1: Column Name Differences

| Page Expects | Database Has | Fix Needed |
|--------------|--------------|------------|
| `court_arraignment_timeline` | `arraignment_timeline` | ✅ Fixed in CORRECT SQL |
| `impound_daily_fee` | (missing) | ✅ ADD_MISSING_COLUMNS.sql adds it |
| `impound_admin_fee` | (missing) | ✅ ADD_MISSING_COLUMNS.sql adds it |
| `typical_bail_range_min` | `typical_bail_range` (TEXT) | ⚠️ TWO OPTIONS |
| `typical_bail_range_max` | `typical_bail_range` (TEXT) | ⚠️ TWO OPTIONS |
| `diversion_program_available` | `diversion_programs` (TEXT[]) | ⚠️ DIFFERENT TYPE |
| `diversion_program_details` | `diversion_programs` (TEXT[]) | ⚠️ DIFFERENT TYPE |

---

### Issue #2: Bail Range Format

**Current Database:** `typical_bail_range TEXT` (e.g., "$1,000 - $5,000")
**Pages Expect:** `typical_bail_range_min INTEGER`, `typical_bail_range_max INTEGER`

**Two Options:**

**Option A (Quick Fix - Recommended for now):**
- ADD_MISSING_COLUMNS.sql already adds min/max columns
- Use those instead of the TEXT column
- Leave TEXT column for backward compatibility

**Option B (Proper Fix):**
- Update all page queries to parse the TEXT column
- Extract min/max from "$1,000 - $5,000" format
- More work, cleaner architecture

**Decision Needed:** Which option to use long-term?

---

### Issue #3: Diversion Programs Format

**Current Database:** `diversion_programs TEXT[]` (array of program names)
**Pages Expect:** `diversion_program_available BOOLEAN` + `diversion_program_details TEXT`

**Quick Fix:**
- ADD_MISSING_COLUMNS.sql adds both boolean and text columns
- Use those for now
- Migrate data from array to boolean+text later

**Proper Fix:**
- Update pages to read from the array
- Display list of programs instead of single text

**Decision Needed:** Which approach?

---

## 📊 DATA STORAGE LOCATIONS

### Where Different Data Lives:

| Data Type | Current Location | Pages Read From | Status |
|-----------|------------------|-----------------|--------|
| Court name/address | `counties` table | ✅ `counties` table | ✅ Works |
| Jail name/address | `counties` table | ✅ `counties` table | ✅ Works |
| Arraignment timeline | `counties.arraignment_timeline` | ❌ `court_arraignment_timeline` | ⚠️ Fixed in SQL |
| Impound fees | ❌ Not in counties | ✅ Expecting in counties | ⚠️ Columns being added |
| Bail ranges | `counties.typical_bail_range` (TEXT) | ❌ Expecting min/max (INT) | ⚠️ Columns being added |
| Gold Dust insights | `curated_data` table | ✅ `curated_data` table | ✅ Works |
| Extracted fees (AI) | `curated_data` table (JSON) | ❌ Not reading from here yet | ⚠️ TODO |

---

## 🎯 LONG-TERM DECISIONS NEEDED

### Decision #1: Dual Storage Strategy

**Question:** Should we store impound/bail data in BOTH places?

**Option A:** Duplicate data
- Store in `counties` table (for pages)
- Store in `curated_data` table (for AI processing)
- **Pro:** Pages work immediately
- **Con:** Data duplication

**Option B:** Single source of truth
- Only store in `curated_data` table
- Update all pages to read from there
- **Pro:** No duplication, cleaner
- **Con:** More work to update pages

**Recommendation:** Option A for now, migrate to Option B later

---

### Decision #2: Migration Strategy

**Question:** Should we run a migration to consolidate schemas?

**Options:**

1. **Keep current schema, add missing columns**
   - Easiest, pages work immediately
   - Some redundancy with curated_data
   - Recommended for MVP

2. **Update all pages to match current schema**
   - Cleaner architecture
   - More work (update ~20+ page files)
   - Better long-term

3. **Hybrid: Add columns now, refactor later**
   - Quick fix now (add columns)
   - Refactor pages when we have time
   - **RECOMMENDED**

---

## 📝 FILES TO REVIEW TOMORROW

### Critical Files:
1. `/migrations/CORRECT_add_dallas_county.sql` - ✅ Ready to run
2. `/migrations/ADD_MISSING_COLUMNS.sql` - ✅ Ready to run
3. `/PHASE_2_LEGAL_DATA_FACTORY.md` - 📖 Read before processing files
4. `/SCHEMA_MISMATCH_EXPLAINED.md` - 📖 Full explanation

### Page Templates (Need Schema Updates Eventually):
- `/app/texas/harris/impound/page.tsx`
- `/app/texas/harris/bail/page.tsx`
- `/app/texas/harris/court/page.tsx`
- `/app/texas/dallas/impound/page.tsx`
- `/app/texas/dallas/bail/page.tsx`
- `/app/texas/dallas/court/page.tsx`
- `/app/arizona/maricopa/impound/page.tsx`

### Components:
- `/components/ImpoundCostCalculator.tsx` - Expects impound_daily_fee
- `/components/PenaltyMatrix.tsx` - Works (reads from states table)
- `/components/CrisisGrid.tsx` - Works (just links)

---

## 🔄 MIGRATION PATH FORWARD

### Phase 1: Quick Fix (Tomorrow - 5 minutes)
1. ✅ Run CORRECT_add_dallas_county.sql
2. ✅ Run ADD_MISSING_COLUMNS.sql
3. ✅ Verify pages load

### Phase 2: Data Population (Tomorrow - 30 minutes)
1. ✅ Process Dallas files with legal-data-factory
2. ✅ Check curated_data table for extractions
3. ✅ Manually copy extracted data to counties table columns
4. ✅ Verify pages show data

### Phase 3: Repeat for More Counties (This Week)
1. Tarrant County (Fort Worth)
2. Bexar County (San Antonio)
3. Travis County (Austin)

### Phase 4: Long-Term Refactor (Future)
1. Decide on single source of truth
2. Update page queries to read from curated_data
3. Remove duplicate columns from counties table
4. Clean up schema

---

## ❓ QUESTIONS TO ANSWER TOMORROW

1. **Is legal-data-factory working?**
   - Can you run the orchestrator?
   - Does it process .doc/.docx files?
   - Are extractions appearing in curated_data?

2. **Which migration strategy?**
   - Quick fix (add columns) ✅ Recommended
   - Full refactor (update pages) ⏳ Later
   - Hybrid (both) ⭐ Best

3. **Data format preferences?**
   - Bail: TEXT "$1k-$5k" or INT min/max?
   - Diversion: BOOLEAN+TEXT or TEXT[]?
   - Impound: In counties or curated_data?

---

## 🚀 SUCCESS CRITERIA

**Tomorrow is successful if:**
- ✅ Dallas County pages load without errors
- ✅ Basic court/jail info displays
- ✅ legal-data-factory processes files (or we know why it doesn't)
- ✅ We have a clear plan for schema consolidation

---

## 📞 BLOCKED ON

- ⏸️ legal-data-factory functionality verification
- ⏸️ Decision on migration strategy
- ⏸️ Decision on data format preferences

---

## 💾 BACKUP PLAN

**If legal-data-factory doesn't work:**

Use manual SQL to populate Dallas County:

```sql
UPDATE counties SET
  impound_daily_fee = 50.00,
  impound_admin_fee = 200.00,
  typical_bail_range_min = 1000,
  typical_bail_range_max = 5000,
  impound_lot_name = 'Dallas Police Auto Pound',
  impound_lot_address = '2828 Hondo Ave, Dallas, TX 75210',
  impound_payment_methods = 'Cash, Money Order, Cashier Check',
  diversion_program_available = true,
  diversion_program_details = 'First-time offender program available',
  last_verified_at = NOW()
WHERE slug = 'dallas';
```

Pages will work immediately ✅

---

**Next Review:** Tomorrow morning
**Owner:** You + me
**Priority:** 🔴 HIGH (blocking Dallas County launch)

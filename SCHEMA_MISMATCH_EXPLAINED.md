# Schema Mismatch Issue & Solutions

## ⚠️ The Problem

Your actual database schema (from `002_complete_schema.sql`) is **different** from what the page templates expect.

---

## 📊 Schema Comparison

### What Pages Expect (Wrong)

```typescript
county.impound_daily_fee              // ❌ Doesn't exist
county.impound_admin_fee              // ❌ Doesn't exist
county.typical_bail_range_min         // ❌ Doesn't exist
county.typical_bail_range_max         // ❌ Doesn't exist
county.court_arraignment_timeline     // ❌ Doesn't exist
county.diversion_program_available    // ❌ Doesn't exist
county.diversion_program_details      // ❌ Doesn't exist
```

### What Actually Exists (Correct)

```sql
-- In counties table:
name TEXT                              // ✅ Exists
court_name TEXT                        // ✅ Exists
court_address TEXT                     // ✅ Exists
court_phone TEXT                       // ✅ Exists
court_hours TEXT                       // ✅ Exists
jail_name TEXT                         // ✅ Exists
jail_address TEXT                      // ✅ Exists
jail_phone TEXT                        // ✅ Exists
arraignment_timeline TEXT              // ✅ Exists (not court_arraignment_timeline)
typical_bail_range TEXT                // ✅ Exists (TEXT, not min/max numbers)
diversion_programs TEXT[]              // ✅ Exists (array, not boolean + details)
scram_providers JSONB                  // ✅ Exists
```

---

## ✅ Phase 1: Fixed SQL

**Run this file:** `/migrations/CORRECT_add_dallas_county.sql`

This now uses the **correct column names** from your actual schema.

```sql
-- Copy and run in Supabase SQL Editor
-- File: /migrations/CORRECT_add_dallas_county.sql
```

**This will work!** It only inserts into columns that actually exist.

---

## ⚠️ Phase 2: Page Templates Need Updates

Your page templates (impound, bail, court) were written expecting different columns. They need to be updated.

### Option A: Update Pages to Match Schema (Recommended)

Update the page queries to use:
- `arraignment_timeline` instead of `court_arraignment_timeline`
- `typical_bail_range` instead of `typical_bail_range_min/max`
- Read impound fees from `curated_data` table instead of county columns

### Option B: Add Missing Columns to Counties Table

Add the columns that pages expect:

```sql
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_daily_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_admin_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_min INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_max INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_available BOOLEAN;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_details TEXT;
```

**Then pages will work without code changes.**

---

## 🎯 Recommended Path Forward

### Step 1: Add Dallas County (Works Now)

Run: `/migrations/CORRECT_add_dallas_county.sql`

Result: Dallas County created with basic info ✅

### Step 2: Choose Your Approach

**Quick Fix (Option B):**
- Add missing columns with ALTER TABLE
- Pages work immediately
- Takes 2 minutes

**Proper Fix (Option A):**
- Update page code to match actual schema
- More work but cleaner architecture
- I can help with this

### Step 3: Process Files with Legal-Data-Factory

This part stays the same - files go into `curated_data` table.

---

## 💡 My Recommendation

**Do Option B (add columns) for now:**

1. ✅ Dallas County pages work immediately
2. ✅ You can test Phase 2 (legal-data-factory)
3. ✅ Quick and simple

**Then later** we can refactor to use `curated_data` table properly.

---

## 📝 Next Steps

### Right Now:

```sql
-- 1. Run this to create Dallas County
-- File: /migrations/CORRECT_add_dallas_county.sql

-- 2. Run this to add missing columns (so pages work)
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_daily_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_admin_fee DECIMAL(10,2);
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_min INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS typical_bail_range_max INTEGER;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_lot_name TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_lot_address TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_release_hours TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS impound_payment_methods TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_available BOOLEAN DEFAULT false;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS diversion_program_details TEXT;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ;
```

### After That:

Pages will work and display data correctly! Then you can:
- Process files with legal-data-factory
- Test the full hybrid workflow
- See Gold Dust insights

---

## ❓ Which Option?

**Option A:** I update page code (takes ~30 min, cleaner)
**Option B:** You run ALTER TABLE commands (takes 2 min, quick fix)

Which would you prefer?

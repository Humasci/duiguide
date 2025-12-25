# State DUI Terminology Reference

*Last Updated: December 23, 2024*

## Overview

Different states use different legal terms for drunk driving offenses. This is **critical** for:
- SEO (people search for their state's specific term)
- Content accuracy (using wrong term looks unprofessional)
- Legal precision (court documents use official terms)

---

## Official Terms by State

| State | Primary Term | Full Name | Admin Hearing Term | Notes |
|-------|-------------|-----------|-------------------|-------|
| **Texas** | **DWI** | Driving While Intoxicated | **ALR** (Administrative License Revocation) | Never "DUI" unless minor |
| **Arizona** | **DUI** | Driving Under the Influence | **MVD Hearing** (Motor Vehicle Division) | Also: "Extreme DUI" (0.15+), "Super Extreme DUI" (0.20+) |
| **Colorado** | **DUI** or **DWAI** | DUI: Driving Under the Influence<br>DWAI: Driving While Ability Impaired | **Express Consent Hearing** | DWAI for BAC 0.05-0.079 |
| **Georgia** | **DUI** | Driving Under the Influence | **ALS** (Administrative License Suspension) | Also: "DUI Less Safe" (even if <0.08) |
| **Ohio** | **OVI** | Operating a Vehicle Impaired | **ALS** (Administrative License Suspension) | Changed from "DUI" to "OVI" in 2004 |
| **North Carolina** | **DWI** | Driving While Impaired | **Civil Revocation Hearing** | Unique 5-level sentencing |
| **Tennessee** | **DUI** | Driving Under the Influence | **Administrative Hearing** | Also uses "implied consent hearing" |

---

## Content Strategy by State

### Texas: ONLY use "DWI"

**Wrong**:
> "If you were arrested for DUI in Texas..."

**Correct**:
> "If you were arrested for DWI in Texas..."

**Exception**: "DUI" in Texas applies ONLY to minors (under 21)

**SEO Keywords**:
- Texas DWI arrest
- Harris County DWI
- DWI lawyer Texas
- ALR hearing Texas
- Texas DWI penalties

**URLs**:
- ✅ `/texas/harris/dwi/`
- ❌ `/texas/harris/dui/`

---

### Arizona: Use "DUI" + Enhanced Categories

**Primary**: "DUI"

**Enhanced Categories**:
- **Standard DUI**: BAC 0.08-0.149
- **Extreme DUI**: BAC 0.15-0.199
- **Super Extreme DUI**: BAC 0.20+
- **Aggravated DUI**: Felony (3rd offense, suspended license, minor in car)

**Content Example**:
> "Arizona has three DUI levels based on BAC. An Extreme DUI (0.15-0.199) carries stiffer penalties than a standard DUI."

**SEO Keywords**:
- Arizona DUI
- Extreme DUI Arizona
- Maricopa County DUI
- MVD hearing Arizona
- DUI penalties Arizona

---

### Colorado: Use "DUI" (primary) + "DWAI"

**Two Separate Offenses**:
- **DWAI**: BAC 0.05-0.079 ("Driving While Ability Impaired")
- **DUI**: BAC 0.08+

**Critical**: DWAI is a lesser charge with lighter penalties

**Content Example**:
> "Colorado has two drunk driving charges: DWAI (0.05-0.079 BAC) and DUI (0.08+ BAC). DWAI is a less serious offense."

**SEO Keywords**:
- Colorado DUI
- DWAI Colorado
- Denver DUI lawyer
- Express Consent hearing Colorado
- PDD designation Colorado (Persistent Drunk Driver)

---

### Georgia: Use "DUI" + "DUI Less Safe"

**Primary**: "DUI"

**Unique Concept**: **DUI Less Safe**
- Can be charged even if BAC < 0.08
- Based on officer observation of impairment
- No refusal advantage in Georgia

**Content Example**:
> "Georgia can charge you with DUI Less Safe even if your BAC is under 0.08, based solely on the officer's testimony about your driving."

**SEO Keywords**:
- Georgia DUI
- DUI Less Safe Georgia
- Fulton County DUI
- ALS hearing Georgia
- Georgia DUI penalties

---

### Ohio: ONLY use "OVI"

**Critical**: Ohio changed from "DUI" to "OVI" in 2004

**Wrong**:
> "Ohio DUI penalties include..."

**Correct**:
> "Ohio OVI penalties include..."

**Full Term**: "Operating a Vehicle Impaired" (not "under the influence")

**Note**: Older statutes may reference "DUI" but current law is OVI

**SEO Keywords**:
- Ohio OVI
- Franklin County OVI
- OVI lawyer Ohio
- ALS appeal Ohio
- OVI penalties Ohio

**Content Strategy**: Mention "DUI" once for SEO, then use "OVI" throughout
> "If you were arrested for DUI in Ohio (officially called OVI), you face..."

---

### North Carolina: Use "DWI"

**Primary**: "DWI" (Driving While Impaired)

**Unique Feature**: **5-Level Sentencing**
- Level 5: Minimum punishment
- Level 4: Intermediate
- Level 3: Intermediate
- Level 2: Aggravated (grossly aggravating factors)
- Level 1: Highly aggravated

**Content Example**:
> "North Carolina uses a 5-level DWI sentencing system. Level 5 is the least serious, Level 1 is the most serious."

**SEO Keywords**:
- North Carolina DWI
- NC DWI levels
- Mecklenburg County DWI
- Civil Revocation NC
- DWI penalties NC

---

### Tennessee: Use "DUI"

**Primary**: "DUI"

**Admin Hearing**: Multiple terms used interchangeably
- "Administrative hearing"
- "Implied consent hearing"
- "License suspension hearing"

**Content Example**:
> "After a Tennessee DUI arrest, you have 10 days to request an implied consent hearing to challenge your license suspension."

**SEO Keywords**:
- Tennessee DUI
- Nashville DUI lawyer
- DUI penalties Tennessee
- Implied consent hearing TN
- Tennessee DUI laws

---

## Implementation in Code

### Database: `states` table

Store official terminology:
```sql
UPDATE states SET
  legal_term = 'DWI',
  admin_hearing_term = 'ALR',
  legal_term_full = 'Driving While Intoxicated'
WHERE abbreviation = 'TX';

UPDATE states SET
  legal_term = 'OVI',
  admin_hearing_term = 'ALS',
  legal_term_full = 'Operating a Vehicle Impaired'
WHERE abbreviation = 'OH';

-- etc for all states
```

### Content Templates

Use dynamic term injection:
```typescript
// In page.tsx
const { data: state } = await supabase
  .from('states')
  .select('legal_term, admin_hearing_term')
  .eq('slug', params.state)
  .single();

// Template
<h1>What to Do After a {state.legal_term} Arrest in {state.name}</h1>
<p>You have {state.dmv_deadline_days} days to request an {state.admin_hearing_term} hearing.</p>
```

**Output for Texas**:
> "What to Do After a DWI Arrest in Texas"
> "You have 15 days to request an ALR hearing."

**Output for Ohio**:
> "What to Do After an OVI Arrest in Ohio"
> "You have 30 days to request an ALS hearing."

---

## SEO Strategy: Multi-Term Targeting

### Homepage & General Pages

**Include all terms** for broad ranking:
> "If you were arrested for DUI, DWI, or OVI..."

### State-Specific Pages

**Use ONLY that state's term** once you're on the state page:

**Texas pages**:
- ✅ "Texas DWI penalties"
- ❌ "Texas DUI penalties" (wrong, won't rank)

**Ohio pages**:
- ✅ "Ohio OVI penalties"
- ❌ "Ohio DUI penalties" (outdated, confusing)

### Meta Tags

```typescript
// Texas
title: "Texas DWI Guide 2025 - Penalties, DMV Hearing, ALR Process"
description: "Complete guide to Texas DWI arrests. 15-day ALR deadline..."

// Ohio
title: "Ohio OVI Guide 2025 - Penalties, License Suspension, ALS Appeal"
description: "Complete guide to Ohio OVI arrests. 30-day ALS deadline..."
```

---

## Common Mistakes to Avoid

### ❌ Mistake #1: Using Generic "DUI" Everywhere
**Wrong**:
> "Texas DUI laws require..."

**Why it's wrong**: Texas doesn't have "DUI laws" (except for minors). The correct term is DWI.

**Impact**: Looks unprofessional, reduces SEO ranking

---

### ❌ Mistake #2: Mixing Terms Within State
**Wrong** (in Texas content):
> "After a DWI arrest, you may face DUI penalties..."

**Why it's wrong**: Pick one term and stick with it. Don't confuse users.

---

### ❌ Mistake #3: Ignoring Admin Hearing Terms
**Wrong** (in Arizona):
> "Request a DMV hearing within 15 days"

**Correct**:
> "Request an MVD hearing within 15 days"

**Why it matters**: Users searching for "Arizona MVD hearing" won't find generic "DMV hearing" pages

---

### ❌ Mistake #4: Not Updating Ohio Content
**Wrong**:
> "Ohio DUI laws changed in 2023..."

**Why it's wrong**: Ohio hasn't had "DUI" since 2004. It's been OVI for 20 years.

---

## Quick Reference Cheat Sheet

When writing content, ask:

1. **What state am I writing for?**
   - Look up the state's `legal_term` in database

2. **Am I on a state page or general page?**
   - State page: Use ONLY that state's term
   - General page: Can mention multiple terms

3. **What's the admin hearing called?**
   - Use `admin_hearing_term` from database
   - Never generic "DMV hearing" on state pages

4. **Are there enhanced categories?**
   - Arizona: Extreme DUI, Super Extreme DUI
   - Georgia: DUI Less Safe
   - Colorado: DWAI vs DUI

---

## Future States (If Added)

If we expand to more states, here's the terminology:

| State | Term | Admin Hearing |
|-------|------|---------------|
| California | DUI | DMV APS Hearing |
| Florida | DUI | Formal Review Hearing |
| New York | DWI | DMV Refusal Hearing |
| Pennsylvania | DUI | PennDOT Hearing |
| Illinois | DUI | Summary Suspension Hearing |

---

## Implementation Checklist

- [ ] Verify `legal_term` populated for all 7 states in database
- [ ] Verify `admin_hearing_term` populated for all 7 states
- [ ] Update all state page templates to use dynamic term injection
- [ ] Audit existing content for incorrect terminology
- [ ] Update meta titles/descriptions with correct terms
- [ ] Create URL redirects if needed (e.g., `/texas/dui/` → `/texas/dwi/`)
- [ ] Test content generation scripts use correct terms

---

*Always double-check state statutes for the most current terminology!*

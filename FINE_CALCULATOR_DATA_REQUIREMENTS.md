# Fine Calculator - Complete Data Requirements

## Overview
This document specifies the **exact penalty data** needed to build a comprehensive DUI/DWI Fine Calculator for all 7 states. The calculator will estimate total costs including fines, fees, insurance, and program costs based on offense level and aggravating factors.

---

## Current Data Status

### ✅ HAVE (from seed-states-v2.ts):
- **1st Offense:** Jail time, fines, license suspension (all 7 states)
- **2nd Offense:** Jail time, fines, license suspension (all 7 states)
- **Enhanced BAC Thresholds:** 0.15-0.20 by state
- **Lookback Periods:** 5-10 years by state
- **State Terminology:** DWI/DUI/OVI

### ❌ NEED (details below):
- 3rd Offense penalties
- 4th Offense / Felony DUI penalties
- Aggravating factor impacts (specific penalty increases)
- CDL-specific penalties
- Underage (under 21) penalties
- Additional mandatory costs (DUI school, IID, SR-22, etc.)

---

## Required Data Format

For each state, we need data in this structure:

```
STATE: [State Name]
TERMINOLOGY: [DWI/DUI/OVI]

PENALTIES BY OFFENSE:

1st Offense (Standard):
  - Jail: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration]
  - Mandatory IID: [Yes/No] ([duration if yes])
  - DUI School: [Yes/No] ([hours if yes])
  - Community Service: [hours if applicable]

1st Offense (Enhanced BAC ≥ 0.15):
  - Jail: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration]
  - Mandatory IID: [Yes/No] ([duration if yes])

2nd Offense (within lookback period):
  - Jail: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration]
  - Mandatory IID: [Yes/No] ([duration if yes])
  - DUI School: [Yes/No] ([hours if yes])

3rd Offense:
  - Jail: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration or permanent]
  - Felony?: [Yes/No]
  - Mandatory IID: [duration]

4th Offense / Felony DUI:
  - Jail/Prison: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration or permanent]
  - Felony class: [e.g., Class 3 Felony]

AGGRAVATING FACTORS:

Accident (property damage only):
  - Additional Jail: [+ X days/months]
  - Additional Fine: [+ $X or "up to $X"]

Accident with Injury:
  - Upgrade to: [charge level, e.g., "Felony" or "Aggravated DUI"]
  - Jail/Prison: [minimum] to [maximum]
  - Fine: $[min] to $[max]

Accident with Serious Bodily Injury:
  - Charge: [specific statute]
  - Prison: [minimum] to [maximum]
  - Fine: $[min] to $[max]

Child in Vehicle (under 15):
  - Additional Jail: [+ X days/months]
  - Additional Fine: [+ $X]
  - Separate charge?: [Yes/No] ([charge name])

Refusal to Submit to Test:
  - Additional suspension: [+ X months/years]
  - Additional fine: [+ $X if applicable]

High BAC (≥ 0.20):
  - Additional jail: [+ X days]
  - Additional fine: [+ $X]
  - Additional IID time: [+ X months]

SPECIAL CATEGORIES:

CDL Holders:
  - CDL disqualification: [duration]
  - Different BAC limit: [0.04 or other]
  - Separate penalties: [if applicable]

Underage (Under 21):
  - BAC limit: [0.00, 0.01, or 0.02]
  - Jail: [minimum] to [maximum]
  - Fine: $[min] to $[max]
  - License Suspension: [duration]

MANDATORY COSTS (Not in Fines):

DUI School/Education:
  - Cost: $[typical cost range]
  - Hours: [X hours]

Ignition Interlock Device (IID):
  - Installation: $[typical cost]
  - Monthly: $[typical cost]
  - Duration: [months based on offense]

SR-22 Insurance Filing:
  - Filing fee: $[cost]
  - Insurance increase: [% increase or typical amount]
  - Duration: [years required]

Victim Impact Panel:
  - Cost: $[typical cost]

Probation Supervision Fees:
  - Monthly: $[typical cost]
  - Duration: [months]

License Reinstatement Fee:
  - Cost: $[state DMV fee]

Court Costs/Processing Fees:
  - Typical range: $[min] to $[max]
```

---

## PRIORITY ORDER FOR RESEARCH

### Phase 1: CRITICAL (needed immediately)
1. **3rd Offense penalties** (jail, fine, suspension) - all 7 states
2. **4th Offense/Felony penalties** - all 7 states
3. **Enhanced BAC penalties** (≥ 0.15 or ≥ 0.20) - additional jail/fines

### Phase 2: HIGH PRIORITY (needed for accuracy)
4. **Accident with injury** - upgrade to felony? penalties?
5. **Child in vehicle** - additional penalties
6. **Test refusal** - additional suspension/penalties
7. **Mandatory program costs** (DUI school, IID, SR-22 costs)

### Phase 3: VALUABLE (enhances calculator)
8. **CDL-specific penalties**
9. **Underage penalties** (under 21)
10. **Community service hours** by offense level

---

## STATE-BY-STATE DETAILED REQUIREMENTS

### TEXAS (DWI)

#### NEED:
**3rd Offense:**
- Jail time: [research needed - likely 2-10 years]
- Fine: [research needed - likely $2,000-$10,000]
- License suspension: [research needed]
- Felony classification: [likely 3rd degree felony]

**Felony DWI (intoxication assault/manslaughter):**
- Prison: [research needed]
- Fine: [research needed]

**Enhanced Penalties:**
- DWI with BAC ≥ 0.15 (Class A misdemeanor):
  - Additional jail: [research specific statute]
  - Additional fine: [research]
  - Minimum IID: [180 days?]

**Aggravating Factors:**
- DWI with child passenger (under 15):
  - Separate charge: State Jail Felony
  - Jail: [180 days to 2 years?]
  - Fine: [up to $10,000?]
- Intoxication Assault (serious bodily injury):
  - Prison: [2-10 years?]
  - Fine: [up to $10,000?]

**Mandatory Costs:**
- DUI School: [$100-$150 for 12-32 hours]
- IID: [$70-$150 install, $60-$80/month]
- SR-22: [$15-$25 filing + insurance increase]
- License reinstatement: [$125]

---

### ARIZONA (DUI)

#### NEED:
**3rd Offense:**
- Prison: [research - likely 4 months minimum]
- Fine: [research]
- License suspension/revocation: [research]
- Felony?: [Yes - Aggravated DUI]

**Extreme DUI (BAC ≥ 0.15):**
- Jail: [30 days minimum vs standard 10 days]
- Fine: [$2,500+ vs standard $1,250+]
- IID: [12 months vs 6 months]

**Super Extreme DUI (BAC ≥ 0.20):**
- Jail: [45 days minimum]
- Fine: [$2,750+ minimum]
- IID: [18 months]

**Aggravating Factors:**
- Suspended/restricted license: [Aggravated DUI - Felony]
- Child under 15: [additional 6 months jail, $500-$5,000 fine]
- DUI causing serious injury: [Class 4 Felony - research prison time]

**Mandatory Costs:**
- Screening/Treatment: [$100-$500]
- IID: [$100+ install, $75-$125/month]
- SR-22: [$15-$35 filing]
- License reinstatement: [$50+]

---

### GEORGIA (DUI)

#### NEED:
**3rd Offense (within 10 years):**
- Jail: [research - likely 15 days to 12 months]
- Fine: [research - likely $1,000-$5,000]
- License suspension: [research - likely 5 years]
- High and Aggravated Misdemeanor?: [research]

**4th Offense:**
- Felony classification?: [research]
- Prison: [research]
- License revocation: [research]

**Enhanced Penalties:**
- DUI with BAC ≥ 0.15: [research additional penalties]
- Serious injury by vehicle: [Felony - 3-15 years prison?]
- Child endangerment: [additional penalties]

**Mandatory Costs:**
- DUI School: [$150-$300 for Risk Reduction Program]
- Clinical Evaluation: [$100-$250]
- IID: [$75-$125 install, $60-$100/month]
- License reinstatement: [$210 + $200 restoration fee]

---

### COLORADO (DUI)

#### NEED:
**3rd Offense:**
- Jail: [research - likely 60 days to 1 year]
- Fine: [research]
- License suspension: [research]
- Felony?: [No - but research penalties]

**4th Offense:**
- Felony DUI: [Class 4 Felony]
- Prison: [research - 2-6 years?]
- Fine: [research]

**Persistent Drunk Driver (PDD) Designation:**
- Criteria: [BAC ≥ 0.15 or 2+ prior offenses]
- Additional penalties: [research]

**Aggravating Factors:**
- Vehicular assault (injury): [Class 4 Felony - research]
- Child under 16 in vehicle: [additional penalties - research]

**Mandatory Costs:**
- Level II Education: [$100-$175]
- IID: [$70-$150 install, $60-$100/month]
- SR-22: [$15-$25 filing]
- License reinstatement: [$95]

---

### NORTH CAROLINA (DWI)

#### NEED:
**Grossly Aggravating Factors** (affects sentencing level):
1. Prior DWI within 7 years
2. DWI while license revoked
3. Serious injury caused by DWI
4. Child under 18 in vehicle

**Sentencing Levels** (research penalties for each):
- **Level A1** (most serious): [research jail/fine]
- **Level 1**: [research]
- **Level 2**: [research]
- **Level 3**: [research]
- **Level 4**: [research]
- **Level 5** (least serious): [30 days minimum, $200 fine minimum]

**Habitual DWI:**
- 3+ convictions within 10 years
- Felony class: [research]
- Prison: [research]

**Mandatory Costs:**
- ADETS (Assessment): [$100]
- Treatment/Education: [$100-$1,000+ depending on level]
- IID: [$100+ install, $75-$100/month]
- License restoration: [$130]

---

### CALIFORNIA (DUI)

#### NEED:
**3rd Offense (within 10 years):**
- Jail: [research - likely 120 days to 1 year]
- Fine: [research - likely $390-$1,000 base + penalty assessments = $2,000-$3,000]
- License suspension: [research - 3 years?]

**4th Offense:**
- Can be charged as felony
- Prison: [research - 16 months-3 years?]
- License revocation: [research - 4 years?]

**Aggravating Factors:**
- DUI with injury (Vehicle Code 23153): [Felony - research]
- Child under 14: [enhanced penalties - research]
- Excessive speeding + DUI: [additional penalties]

**Mandatory Costs:**
- DUI School (first): [$500+ for 3-month program]
- DUI School (repeat): [$1,500-$1,800 for 18-30 month program]
- IID: [$70-$150 install, $60-$90/month]
- License reissue: [$125]
- Penalty assessments: [often 4-5x base fine]

---

### OHIO (OVI)

#### NEED:
**3rd Offense (within 10 years):**
- Jail: [research - 30 days to 1 year?]
- Fine: [research - $850-$2,750?]
- License suspension: [research - 2-10 years?]

**4th Offense (within 10 years):**
- Felony: [4th degree felony]
- Prison: [research - 6-30 months?]
- Fine: [research]

**5th Offense:**
- Felony: [3rd degree felony]
- Prison: [research - 1-5 years?]

**High Test BAC (≥ 0.17):**
- Additional penalties: [research specific enhancements]
- Yellow plates required: [research]

**Aggravating Factors:**
- Serious physical harm: [4th degree felony - research]
- Child under 18: [additional penalties - research]

**Mandatory Costs:**
- Remedial Driving Course: [$100-$300]
- IID: [$70-$150 install, $60-$100/month]
- License reinstatement: [$475]
- License plates (yellow): [$15+]

---

### TENNESSEE (DUI)

#### NEED:
**3rd Offense (within 10 years):**
- Jail: [research - 120 days to 11 months?]
- Fine: [research - $1,100 to $10,000?]
- License revocation: [research - 6 years?]

**4th Offense:**
- Class E Felony
- Prison: [research - 1-2 years?]
- Fine: [research - $3,000-$15,000?]

**5th Offense:**
- Class D Felony
- Prison: [research - 2-4 years?]

**Enhanced Penalties:**
- BAC ≥ 0.20: [research additional jail/fine]
- Child in vehicle: [Class D Felony - research]

**Vehicular Assault/Homicide:**
- Vehicular assault: [research penalties]
- Vehicular homicide: [research penalties]

**Mandatory Costs:**
- Alcohol Safety School: [$100-$250]
- Victim Impact Panel: [$50]
- IID: [$100+ install, $75-$100/month]
- License reinstatement: [$75]

---

## ADDITIONAL COST DATA NEEDED

### Insurance Impact
For all states, research:
- **SR-22/FR-44 costs**: Filing fees + insurance rate increases
- **Typical insurance increase %**: After 1st DUI (e.g., 80% increase)
- **Duration of SR-22 requirement**: 2-5 years by state

### Attorney Costs (Optional - for "total cost" estimates)
- **Misdemeanor DUI attorney**: [$2,500-$5,000 typical range]
- **Felony DUI attorney**: [$5,000-$15,000+ typical range]

### Bail Bonds (Optional)
- **Typical bail amounts** by offense level and state

---

## RESEARCH SOURCES

### Primary (Most Reliable):
1. **State Statutes**: Official state legislative codes
   - Texas: Texas Penal Code § 49.04-49.09
   - Arizona: A.R.S. § 28-1381 to 28-1383
   - Georgia: O.C.G.A. § 40-6-391
   - Colorado: C.R.S. § 42-4-1301
   - North Carolina: N.C.G.S. § 20-138.1
   - California: Vehicle Code § 23152-23229
   - Ohio: O.R.C. § 4511.19
   - Tennessee: T.C.A. § 55-10-401

2. **State DMV/DPS Websites**: For license suspension info, reinstatement fees

3. **State Bar Association DUI Guides**: Often have penalty charts

### Secondary (Verify Against Primary):
4. **DUI Defense Attorney Websites**: Often have accurate penalty summaries
5. **Legal Aid Resources**: State-specific DUI penalty guides
6. **NOLO.com State DUI Laws**: Generally accurate overviews

### For Costs (DUI School, IID, etc.):
7. **State-Approved Provider Websites**: For DUI school costs
8. **IID Provider Websites**: Intoxalock, Smart Start, LifeSafer pricing
9. **Insurance Company Data**: For SR-22 costs and rate increases

---

## VALIDATION CHECKLIST

For each state, ensure you have:
- [ ] **3rd offense** penalties (jail, fine, suspension)
- [ ] **4th offense/felony** penalties
- [ ] **Enhanced BAC** (≥0.15 or ≥0.20) additional penalties
- [ ] **Accident with injury** - felony upgrade? specific penalties
- [ ] **Child in vehicle** additional penalties
- [ ] **Test refusal** additional penalties
- [ ] **DUI school costs** (by offense level if different)
- [ ] **IID costs** (install + monthly)
- [ ] **SR-22 filing cost** + insurance increase
- [ ] **License reinstatement fee**
- [ ] **Court costs/fees** typical range

---

## OUTPUT FORMAT

Please provide data in this simple format:

```
STATE: Texas

3RD OFFENSE:
Jail: 2-10 years (3rd degree felony)
Fine: $2,000-$10,000
Suspension: 180 days - 2 years
Source: Texas Penal Code § 49.09

ENHANCED BAC (≥0.15):
Additional jail: Minimum 6 days (up from 3)
IID required: 180 days minimum
Source: Texas Penal Code § 49.04(d)

CHILD IN VEHICLE (under 15):
Charge: State Jail Felony
Jail: 180 days - 2 years
Fine: Up to $10,000
Source: Texas Penal Code § 49.045

...continue for all categories
```

---

## NOTES ON DATA QUALITY

- **Use official statute numbers** wherever possible
- **Note mandatory minimums** vs maximum ranges
- **Flag any county-specific variations** (e.g., "Some counties in Texas require...")
- **Include effective dates** if recent law changes
- **Note any pending legislation** that might affect penalties

This level of detail will ensure the Fine Calculator provides accurate, defensible estimates that users can rely on.

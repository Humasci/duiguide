# Harris County, TX - Hunter-Killer v2.0 Research Checklist

Population: 4,731,145
City: Houston
Tier: 1
Last Updated: 2025-12-18

---

## PHASE 1: PANIC PHASE (Impound, Bail, Release)

### IMPOUND - VSF Hold Rules
```
site:.gov "sheriff" "towing" OR "impound" "release procedure" filetype:pdf Harris TX
```
EXTRACT: VSF Standard Operating Procedure PDF
- Notarized letter requirement (Yes/No)
- Power of attorney acceptance (Yes/No)
- Required documents list
- Owner absent procedure

### IMPOUND - Gate Fees & Cash Rules
```
site:.gov "towing" "fee schedule" "after hours" OR "holiday" Houston Harris
```
EXTRACT: Municipal Towing Ordinance
- Base tow fee (dollar amount)
- Legal maximum tow fee
- Gate fee (after-hours/holiday)
- Legal maximum gate fee
- Storage daily fee
- Storage daily maximum
- Credit card acceptance (Yes/No)
- Credit card fee (percentage)
- Cash-only hours

VALIDATION:
- Ctrl+F "Effective Date" (MUST be 2025 - if earlier, search for 2025 version or note source year)
- Ctrl+F "$" (capture all fees)
- Ctrl+F "Must" (capture hard constraints)

### IMPOUND - Notary Requirements
```
site:.gov "Harris" TX "vehicle storage facility" "notarized" OR "power of attorney"
```

### IMPOUND - Fee Schedule
```
site:.gov "towing ordinance" "maximum fee" Houston TX
```

---

### BAIL - Jail Blackout Times
```
site:.gov "inmate handbook" "release processing" "shift change" Harris TX 2025
```
EXTRACT: Inmate Handbook PDF
- Shift change times (e.g., "6-8 AM, 2-4 PM, 10 PM-12 AM")
- Headcount times
- Release processing hours

### BAIL - Mandatory Cool Down
```
site:.gov "magistrate" "standing order" "DUI" OR "DWI" "release" Harris TX 2025
```
EXTRACT: Magistrate Standing Order
- Cool down period exists (Yes/No)
- Hours required (e.g., "12 hours")
- Statute citation
- Exceptions

### BAIL - Bond Schedule (Misdemeanor)
```
site:.gov "bail schedule" "misdemeanor" "DUI" OR "DWI" 2025 filetype:pdf Harris TX
```
EXTRACT: Official Misdemeanor Bond Schedule PDF (2025)
- DWI 1st offense, BAC <0.15: $XXX
- DWI 1st offense, BAC 0.15-0.19: $XXX
- DWI 1st offense, BAC 0.20-0.29: $XXX
- DWI 1st offense, BAC 0.30+: $XXX
- DWI 1st offense, with minor in vehicle: $XXX
- DWI 1st offense, with accident: $XXX
- PR bond eligible (Yes/No)
- PR bond conditions

NOTE: If only pre-2025 schedule found, note effective date explicitly

### BAIL - Bond Schedule (Felony)
```
site:.gov "bail schedule" "felony" "DUI" OR "DWI" 2025 filetype:pdf Harris TX
```
EXTRACT: Official Felony Bond Schedule PDF (2025)
- DWI 2nd offense, BAC <0.15: $XXX
- DWI 2nd offense, BAC 0.15+: $XXX
- DWI 3rd offense (felony): $XXX-$XXX
- Enhanced charges (CDL, under 21, refusal)

NOTE: If only pre-2025 schedule found, note effective date explicitly

### BAIL - PR Bond Rules
```
site:.gov "personal recognizance" OR "PR bond" "DUI" eligibility Harris TX 2025
```

### BAIL - Bonding Office Hours
```
site:.gov "Harris" sheriff "bonding" hours location 2025
```
EXTRACT:
- Address
- Hours (24/7 or specific)
- Payment methods accepted
- Processing time

---

## PHASE 2: CRITICAL WINDOW (DMV & License)

### DMV - Hearing Request Form
```
site:.gov "ALR" OR "admin per se" "hearing request" form filetype:pdf TX 2025
```
EXTRACT: ALR Hearing Request Form PDF
- Form name
- Form URL
- Deadline (number of days)
- Calendar days vs business days
- Submission methods (mail, certified mail, email, fax, in-person)
- Filing fee

### DMV - Discovery Fees
```
site:.gov "open records" "fee schedule" "body cam" OR "video" Houston police 2025
```
EXTRACT: Police Records Fee Schedule
- Body cam footage: $XXX
- Dash cam footage: $XXX
- Police report: $XXX
- Breathalyzer calibration records: $XXX
- Open records request form URL
- Processing time (days)

### DMV - Hearing Location
```
site:.gov "ALR" "hearing location" "zoom" OR "telephonic" TX Harris 2025
```
EXTRACT:
- Hearing location address
- Zoom available (Yes/No)
- Telephonic available (Yes/No)

### DMV - Hardship License Logbook
```
site:.gov "hardship license" "log" OR "hours" "form" filetype:pdf TX 2025
```
EXTRACT: Driving Log Sheet PDF
- Form name
- Form URL
- Required for hardship license (Yes/No)
- Restrictions
- Fee

---

## PHASE 3: COMPLIANCE (SCRAM, Interlock, SR-22)

### INTERLOCK - Approved Providers (County-Specific)
```
site:.gov "probation" "approved providers" "interlock" Harris TX
```
EXTRACT: Court-Approved Provider List
For each provider:
- Name
- Address
- Phone
- Installation fee
- Monthly fee
- Removal fee
- Calibration fee
- Mobile service (Yes/No)
- County approved (Yes/No)

CROSS-REFERENCE with state list (flag discrepancies)

### INTERLOCK - Indigent Funding
```
site:.gov "interlock" "indigent" OR "financial assistance" form filetype:pdf TX
```
EXTRACT: Financial Affidavit Form PDF
- Program available (Yes/No)
- Application form URL
- Discount amount or percentage
- Income threshold

### INTERLOCK - Removal Order
```
site:.gov "interlock" "removal order" OR "verification of removal" form Harris TX
```
EXTRACT:
- Who signs (Probation officer vs Judge)
- Form required (name/URL)
- Verification required (Yes/No)
- Fee

---

### SCRAM - Approved Providers
```
site:.gov "SCRAM" OR "continuous alcohol monitor" "approved" provider Harris TX
```
EXTRACT:
For each provider:
- Name
- Address
- Phone
- Setup fee
- Daily fee
- Removal fee
- Mobile service (Yes/No)

### SCRAM - Violation Policy
```
site:.gov "SCRAM violation" "probation revocation" Harris TX
```
EXTRACT:
- Zero tolerance (Yes/No)
- Confirmation test required (Yes/No)
- Automatic revocation (Yes/No)
- Warning system description

---

## PHASE 4: COURT & SENTENCING

### COURT - Diversion Contract
```
site:.gov "pre-trial intervention" OR "diversion" "contract" OR "agreement" filetype:pdf Harris TX
```
EXTRACT: Pre-Trial Intervention Agreement PDF
- Program name
- Eligibility criteria
- Program fee
- Duration (months)
- CRITICAL: Admission of guilt clause (Yes/No)
- Completion benefits

### COURT - Local Rules
```
site:.gov "local rules of practice" "criminal" "cell phone" Harris clerk
```
EXTRACT: Local Rules of Practice PDF
- Dress code (banned items, required items)
- Cell phone policy
- Prohibited items
- Security checkpoint details

### COURT - Weekend Jail
```
site:.gov "weekend jail" OR "periodic imprisonment" "application" Harris sheriff
```
EXTRACT: Weekend Program Application
- Program available (Yes/No)
- Application required (Yes/No)
- Cost per day
- Minimum stay (days)
- Restrictions

### COURT - Parking Hack
```
site:.gov "Harris" "jury service" parking map
"Harris" TX courthouse parking juror lot free shuttle
```
EXTRACT: Jury Service Parking Map
- Juror lot address
- Free for jurors (Yes/No)
- Validation required (Yes/No)
- Hours
- Public lots (name, address, rate, distance)
- Shuttles (name, route, free Y/N)
- Metro transit (free with jury notice Y/N)

---

## PHASE 5: VALIDATION

For EVERY PDF downloaded:

1. Ctrl+F "Effective Date" - MUST be 2025
   - If older than 2025: Try alternate search with "2025" added to query
   - If no 2025 version exists: Use most recent + explicitly note year in sources[]
   - Example: "effectiveDate": "2024-01-15 (NOTE: 2025 version not found)"
2. Ctrl+F "$" - Scan for all dollar amounts, populate fee fields
3. Ctrl+F "Must" - Capture all hard constraints
4. Mark effectiveDate in sources[] array with year notation
5. Add keyFindings[] to source entry

---

## PDFS TO DOWNLOAD

Save to: pdfs/

IMPOUND:
- [ ] VSF Standard Operating Procedure → pdfs/impound-vsf-sop.pdf
- [ ] Municipal Towing Ordinance → pdfs/impound-towing-ordinance.pdf

BAIL:
- [ ] Inmate Handbook → pdfs/bail-inmate-handbook.pdf
- [ ] Magistrate Standing Order (DUI) → pdfs/bail-standing-order-dui.pdf
- [ ] Misdemeanor Bond Schedule → pdfs/bail-misdemeanor-schedule.pdf
- [ ] Felony Bond Schedule → pdfs/bail-felony-schedule.pdf

DMV:
- [ ] ALR Hearing Request Form → pdfs/dmv-alr-hearing-form.pdf
- [ ] Police Records Fee Schedule → pdfs/dmv-police-records-fees.pdf
- [ ] Hardship License Driving Log → pdfs/dmv-hardship-log.pdf

INTERLOCK:
- [ ] County Approved Provider List → pdfs/interlock-county-providers.pdf
- [ ] State Approved Provider List → pdfs/interlock-state-providers.pdf
- [ ] Indigent Funding Application → pdfs/interlock-indigent-app.pdf
- [ ] Removal Order Form → pdfs/interlock-removal-form.pdf

SCRAM:
- [ ] County Approved Provider List → pdfs/scram-county-providers.pdf

COURT:
- [ ] Pre-Trial Diversion Contract → pdfs/court-diversion-contract.pdf
- [ ] Local Rules of Practice → pdfs/court-local-rules.pdf
- [ ] Weekend Jail Application → pdfs/court-weekend-jail.pdf
- [ ] Jury Service Parking Map → pdfs/court-parking-map.pdf

---

## DATA ENTRY

Once research complete, update: detailed-research.json

QUALITY STANDARDS:
- Minimum 3 official .gov sources
- All dollar amounts must be exact (not ranges unless source provides ranges)
- All dates must include effectiveDate from PDF
- All "must" constraints captured
- Cross-reference county lists vs state lists (flag conflicts)
- Data freshness: MUST be 2025 sources
  - If 2025 not available: Use most recent + note year explicitly
  - Example: "Source: 2024 Bond Schedule (2025 not yet published)"

---

## RESEARCH COMPLETE CHECKLIST

- [ ] All search queries executed
- [ ] PDFs downloaded and saved to pdfs/
- [ ] PDF validation complete (effective date, fees, constraints)
- [ ] detailed-research.json populated
- [ ] Sources documented with URLs and effectiveDates
- [ ] Quality check: 3+ .gov sources, exact dollar amounts, no emojis

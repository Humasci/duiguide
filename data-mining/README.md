# DUI Guide - County Data Mining Project

## 🎯 Mission
Extract **practical, actionable details** for DUI-related procedures across 22 Tier 1 counties using Google Dorks and government website research.

## 📊 Project Scope
- **22 Tier 1 Counties** across 7 states (TX, AZ, GA, CO, NC, OH, TN)
- **5 Data Categories** per county:
  1. Jail & Release Information
  2. Bond/Bail Schedules
  3. Vehicle Impound Release Procedures
  4. Court Logistics (Parking, Dress Code, Rules)
  5. Vendor Lists (SCRAM, Ignition Interlock, DUI Schools)

---

## 📁 Directory Structure

```
data-mining/
├── README.md (this file)
├── texas/
│   ├── harris/
│   │   ├── pdfs/                      # Downloaded PDFs
│   │   ├── research-data.json         # Extracted data (JSON)
│   │   └── RESEARCH-TODO.md           # Research checklist
│   ├── dallas/
│   └── ...
├── arizona/
│   ├── maricopa/
│   └── ...
└── ...
```

---

## 🚀 How to Use This System

### 1. Choose a County
Navigate to the county folder, e.g., `data-mining/texas/harris/`

### 2. Follow the Research Checklist
Open `RESEARCH-TODO.md` in the county folder. It contains:
- **Pre-written Google Dork queries** for each data category
- **Extraction guidelines** (what to look for in results)
- **PDF download checklist** (which documents to save)

### 3. Run Search Queries
Copy each query from `RESEARCH-TODO.md` and run it via:
- Google Search
- Government website search
- WebSearch tool (if using automation)

### 4. Extract Data
For each search result, extract:
- **Jail Info**: Release hours, blackout periods, payment methods
- **Bond Schedule**: DWI 1st/2nd/3rd offense bail amounts, PR bond rules
- **Impound**: Notary requirements, fee caps, special "tricks"
- **Court Logistics**: Juror parking (THE HACK!), dress codes, prohibited items
- **Vendors**: Approved SCRAM/interlock providers

### 5. Save PDFs
Download official PDFs to the `pdfs/` folder:
```
pdfs/
├── inmate-handbook.pdf
├── bond-schedule.pdf
├── local-rules.pdf
├── jury-guide.pdf
└── vehicle-release-form.pdf
```

### 6. Update `research-data.json`
Populate the JSON file with extracted data. Follow the structure in `texas/harris/research-data.json` (already completed as an example).

---

## 📋 Data Categories & What to Extract

### 1. **Jail & Release Information**
**Google Dorks:**
```
[County Name] [State] jail release hours cash only blackout times
site:.gov "[County Name]" "inmate handbook" OR "release hours" filetype:pdf
```

**Extract:**
- Release hours (24/7 or specific hours?)
- Processing time after bail posted (e.g., "6-12 hours")
- Blackout periods (shift changes, weekends)
- Payment methods (cash, card, check)
- Bonding office address & phone
- Special rules (e.g., "no release during shift change 2-4pm")

---

### 2. **Bond/Bail Schedules**
**Google Dorks:**
```
site:.gov "[County Name]" [State] "bond schedule" OR "bail schedule" filetype:pdf
"[County Name]" [State] DWI DUI bail amount first offense
```

**Extract:**
- DWI 1st offense: $XXX - $X,XXX
- DWI 2nd offense: $XXX - $X,XXX
- DWI 3rd offense: $XXX - $X,XXX
- PR bond eligibility (e.g., "presumption of PR for first-time under 0.15 BAC")
- Download official bond schedule PDF

---

### 3. **Vehicle Impound Release**
**Google Dorks:**
```
"[County Name]" [State] vehicle impound release notarized letter power of attorney
site:.gov "[County Name]" "vehicle storage facility" release requirements
"[County Name]" [State] towing fees maximum cap ordinance
```

**Extract:**
- Notary required? (Yes/No)
- Power of attorney accepted? (Yes/No)
- Required documents (e.g., "notarized POA, registration, valid ID")
- Towing fee cap (e.g., "max $250 per Texas statute")
- Storage fee cap (e.g., "$15/day max")
- **Special tricks** (e.g., "if card machine down, no storage charges")

---

### 4. **Court Logistics**
**Google Dorks:**
```
"[County Name]" [State] courthouse parking juror lot free shuttle
site:.gov "[County Name]" "jury service" parking map
"[County Name]" [State] court "dress code" OR "prohibited items"
```

**Extract:**
- **Juror parking lot address** (THE PARKING HACK!)
- Free parking options
- Shuttle services (e.g., "free shuttle from Lot A")
- Parking rates (e.g., "$5/day validated")
- Dress code (e.g., "no shorts, no muscle shirts")
- Prohibited items (e.g., "lighters confiscated, no cell phones")

---

### 5. **Vendor Lists**
**State-Level (not county-specific):**
```
site:dps.[state].gov "approved ignition interlock" provider list
site:[state].gov "certified DUI schools" approved list
```

**Extract:**
- Download official state provider lists (Excel/PDF)
- Filter by county location
- For each vendor: Name, Address, Phone, Services

---

## ✅ Harris County - COMPLETED EXAMPLE

`data-mining/texas/harris/research-data.json` is **fully populated** with real data extracted using this methodology. Use it as a reference template.

### Key Findings (Harris County):
- **Jail Release**: 24/7 bonding, 6-12 hour processing
- **Bond Amounts**: $500-$5,000 for DWI 1st
- **Impound Trick**: If card machine down, no storage fees past that date
- **Parking Hack**: FREE juror parking at 1401 Congress garage + FREE METRO with jury assignment
- **Dress Code**: No muscle shirts (explicitly banned), lighters confiscated

---

## 🤖 Automation Script

### Run Initial Setup:
```bash
npx tsx scripts/data-mining/county-research.ts
```

This creates:
- All county folders (22 counties)
- Empty `research-data.json` templates
- `RESEARCH-TODO.md` checklists with pre-written queries

---

## 📈 Progress Tracking

### Completed Counties:
- [x] Harris County, TX (100% - example template)

### In Progress:
- [ ] Dallas County, TX
- [ ] Tarrant County, TX
- [ ] Bexar County, TX
- [ ] Travis County, TX
- [ ] Maricopa County, AZ
- [ ] Pima County, AZ
- [ ] Fulton County, GA
- [ ] Gwinnett County, GA
- [ ] Cobb County, GA
- [ ] Denver County, CO
- [ ] El Paso County, CO
- [ ] Arapahoe County, CO
- [ ] Mecklenburg County, NC
- [ ] Wake County, NC
- [ ] Guilford County, NC
- [ ] Cuyahoga County, OH
- [ ] Franklin County, OH
- [ ] Hamilton County, OH
- [ ] Davidson County, TN
- [ ] Shelby County, TN
- [ ] Knox County, TN

---

## 🎯 Quality Standards

### Each county MUST have:
1. **At least 3 official sources** (URLs documented in `sources[]`)
2. **Jail release hours** verified
3. **Bond schedule** for DWI 1st offense (minimum)
4. **Parking hack** if available
5. **At least 1 PDF downloaded** (bond schedule or inmate handbook)

### Data Freshness:
- Mark `lastUpdated` timestamp in JSON
- Prefer 2024-2025 sources over older data
- Flag outdated info with "as of [date]" notes

---

## 🚨 Important Notes

### What Makes This Valuable:
This is **NOT** generic content. We're extracting:
- **Hidden details** buried in government PDFs
- **Practical tricks** (parking hacks, fee caps)
- **Exact timelines** (hours, blackout periods)
- **Specific dollar amounts** (bail schedules, towing fees)

### Avoid:
- Generic advice (e.g., "hire a lawyer")
- National statistics
- Marketing content from law firms
- Outdated information

---

## 📞 Support

Questions about the data mining process? Check:
1. `RESEARCH-TODO.md` in any county folder
2. `texas/harris/research-data.json` for the completed example
3. This README

---

**Last Updated**: 2025-12-17
**Counties Completed**: 1/22 (5%)
**Total Counties**: 22 Tier 1 counties

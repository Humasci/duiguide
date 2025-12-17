# SCRAM Provider Research Guide

## 🎯 Cost Optimization Strategy
**Goal**: Manually collect SCRAM provider data to save $400+ in API costs
**Target**: 23 counties across 7 states
**Expected Savings**: $420+ → $12-17 total implementation cost

## 📋 Research Priority Order

### Phase 1: Texas (Highest Volume)
1. **Harris County** (Houston) - Population: 4.7M
2. **Dallas County** (Dallas) - Population: 2.6M  
3. **Tarrant County** (Fort Worth) - Population: 2.1M
4. **Bexar County** (San Antonio) - Population: 2.0M
5. **Travis County** (Austin) - Population: 1.3M

### Phase 2: Arizona
6. **Maricopa County** (Phoenix) - Population: 4.4M
7. **Pima County** (Tucson) - Population: 1.0M

### Phase 3: Other States
8. **Fulton County, GA** (Atlanta)
9. **Denver County, CO** (Denver)
10. Continue with remaining counties...

## 🔍 Research Sources

### 1. Google Maps Search Terms
- "SCRAM monitoring [city name]"
- "alcohol bracelet monitoring [city name]"
- "electronic monitoring services [city name]"
- "pretrial monitoring [city name]"
- "court ordered monitoring [city name]"

### 2. Court/Government Websites
- `[County] District Court approved vendors`
- `[County] Pretrial Services`
- `[County] Probation Department`
- State court administration websites

### 3. Known Provider Networks
- **AMS (Alcohol Monitoring Systems)** - Primary SCRAM manufacturer
- **BI Incorporated** - Major electronic monitoring
- **SCRAM Systems/Recovery Monitoring Solutions**
- **Electronic Monitoring Services (EMS)**
- **GPS & More**
- **Alternative Court Solutions**

### 4. Business Directories
- Yellow Pages
- Yelp business listings
- Better Business Bureau
- State business registrations

## 📝 Data Collection Template

For each provider, collect:

```sql
Provider Name: ________________________
Street Address: _______________________
City: ________________________________
State: _______________________________
ZIP: _________________________________ 
Phone: _______________________________
Website: _____________________________
Hours: _______________________________
Setup Fee: ___________________________
Daily Rate: __________________________
Coverage Area: _______________________
Court Approved: ______________________
Special Notes: _______________________
```

## 📍 Geocoding Strategy

**After manual collection:**
1. Use free geocoding for exact coordinates
2. Alternative: Use approximate city center coordinates
3. Google Maps can provide lat/lng when you click on location

## 🎯 Research Tips

### Start with Harris County (Houston)
1. Google: "SCRAM monitoring Houston Texas"
2. Check Harris County District Courts website
3. Look for "approved vendors" or "pretrial services" 
4. Call Harris County Pretrial Services: (713) 755-6044
5. Search for major providers like AMS Houston office

### Efficient Research Process
1. **Google Maps**: Search and save locations
2. **Screenshot/Note**: Keep track of findings
3. **Verify**: Check if court-approved
4. **Contact**: Call for pricing if not online
5. **Document**: Fill in template immediately

### Quality Checks
- ✅ Current phone number works
- ✅ Address exists and is accessible
- ✅ Provider is court-approved for that county
- ✅ Pricing information is recent
- ✅ Service area covers target county

## 📈 Expected Results

**Target per county:**
- 3-8 SCRAM providers per major county
- 1-3 providers per smaller county
- Total: ~150 providers across all counties

**Quality over quantity:**
- Focus on court-approved providers
- Prioritize providers with current pricing
- Include major chains (AMS, BI) and local providers

## 🚀 Implementation

Once research is complete:
1. Insert data into `building_service_locations` table
2. Run database migration and seed scripts
3. Generate county content with Claude API
4. Deploy complete website

---

**Ready to start? Begin with Harris County Houston research!**
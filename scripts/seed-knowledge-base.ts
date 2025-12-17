import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') });

interface KnowledgeBaseEntry {
  category: string;
  subcategory?: string;
  topic: string;
  question?: string;
  answer?: string;
  content: string;
  keywords: string[];
  requires_disclaimer: boolean;
  state_abbreviation?: string;
}

const knowledgeBaseData: KnowledgeBaseEntry[] = [
  // General DUI/DWI Information
  {
    category: 'legal_process',
    subcategory: 'arrest',
    topic: 'What happens during a DUI arrest',
    question: 'What should I expect during a DUI arrest?',
    answer: 'A DUI arrest typically involves field sobriety tests, breathalyzer tests, booking, and potentially jail time until bail is set.',
    content: `When arrested for DUI, you will typically go through the following process:

1. **Field Sobriety Tests**: Officer may ask you to perform balance and coordination tests
2. **Chemical Testing**: Breathalyzer, blood, or urine tests to determine BAC
3. **Miranda Rights**: You should be read your rights before questioning
4. **Booking**: Fingerprints, photos, and paperwork at the police station
5. **Bail Setting**: A judge will set bail amount, typically within 24-48 hours
6. **Release**: You can be released on bail or personal recognizance

**Important**: You have the right to remain silent and request an attorney immediately. Exercise these rights to protect yourself.`,
    keywords: ['DUI arrest', 'field sobriety test', 'breathalyzer', 'booking', 'bail', 'miranda rights'],
    requires_disclaimer: true
  },

  {
    category: 'legal_deadlines',
    subcategory: 'dmv_hearing',
    topic: 'DMV hearing deadline',
    question: 'How long do I have to request a DMV hearing after a DUI arrest?',
    answer: 'You typically have 10-15 days from arrest to request a DMV hearing, but this varies by state.',
    content: `**CRITICAL DEADLINE**: You must request a DMV hearing within a very short timeframe after DUI arrest:

- **Most States**: 10-15 days from arrest date
- **Some States**: As few as 7 days
- **Failure to Request**: Automatic license suspension

**What is a DMV Hearing?**
A DMV hearing is separate from your criminal case and focuses solely on your driving privileges. You can challenge:
- The legality of the traffic stop
- Whether you were actually driving
- The accuracy of chemical tests
- Whether you refused testing

**How to Request:**
- Call your state's DMV immediately
- Submit written request (some states)
- Pay required fees (usually $100-$300)

**DO NOT DELAY**: This deadline is strictly enforced. Missing it means automatic suspension.`,
    keywords: ['DMV hearing', 'license suspension', 'deadline', 'hearing request', 'driving privileges'],
    requires_disclaimer: true
  },

  {
    category: 'penalties',
    subcategory: 'first_offense',
    topic: 'First offense DUI penalties',
    question: 'What are the penalties for a first-time DUI?',
    answer: 'First-time DUI penalties typically include fines ($500-$2000), license suspension (3-12 months), possible jail time (1-6 months), and mandatory alcohol education.',
    content: `**First Offense DUI Penalties** vary by state but typically include:

**Fines and Fees:**
- Base fine: $500-$2,000
- Court costs: $200-$500
- License reinstatement fees: $100-$300
- Total cost often exceeds $5,000-$10,000

**License Suspension:**
- Administrative suspension: 30-90 days (immediate)
- Court-ordered suspension: 90 days to 1 year
- Possible restricted license for work/school

**Jail Time:**
- Range: 1 day to 6 months
- Often suspended with probation
- Weekends-only sentences common

**Other Requirements:**
- Alcohol education classes (8-40 hours)
- Community service (40-100 hours)
- Ignition interlock device (some states)
- Probation (1-3 years)

**Enhanced Penalties for:**
- High BAC (0.15% or higher)
- Accidents or injuries
- Minors in vehicle
- School/construction zones`,
    keywords: ['first offense DUI', 'penalties', 'fines', 'license suspension', 'jail time', 'alcohol education'],
    requires_disclaimer: true
  },

  {
    category: 'legal_defense',
    subcategory: 'attorney',
    topic: 'Why you need a DUI attorney',
    question: 'Do I need a lawyer for my DUI case?',
    answer: 'Yes, DUI laws are complex and penalties are severe. An experienced DUI attorney can often reduce charges, negotiate better plea deals, or get cases dismissed.',
    content: `**Why You NEED a DUI Attorney:**

**Complex Legal Process:**
- DUI laws are highly technical and complex
- Two separate cases: Criminal court AND DMV hearing
- Strict deadlines and procedures
- One mistake can cost you thousands

**What a Good DUI Attorney Can Do:**
- Challenge the traffic stop legality
- Question field sobriety test administration
- Challenge breathalyzer calibration and maintenance
- Negotiate reduced charges (wet reckless, etc.)
- Minimize jail time and fines
- Protect your driving privileges
- Navigate DMV hearing process

**Potential Outcomes With Attorney:**
- **Dismissal**: Due to procedural errors or illegal stop
- **Reduced Charges**: Lesser offense with lighter penalties
- **Plea Bargain**: Better terms than standard penalties
- **Alternative Sentencing**: Treatment programs vs. jail

**Cost vs. Benefit:**
- Attorney fees: $2,500-$10,000
- Total DUI cost without attorney: $10,000-$25,000
- Potential savings and better outcomes justify cost

**Act Quickly**: Evidence preservation and early intervention are crucial.`,
    keywords: ['DUI attorney', 'legal defense', 'plea bargain', 'reduced charges', 'dismissal', 'lawyer'],
    requires_disclaimer: true
  },

  {
    category: 'practical_steps',
    subcategory: 'immediate',
    topic: 'Immediate steps after DUI arrest',
    question: 'What should I do immediately after being arrested for DUI?',
    answer: 'Request a DMV hearing within 10-15 days, hire an attorney, gather evidence, and avoid discussing your case with anyone except your lawyer.',
    content: `**IMMEDIATE ACTION CHECKLIST** (First 48 Hours):

**1. Request DMV Hearing (URGENT - 10-15 days max)**
- Call state DMV immediately
- Don't miss this deadline - it's strictly enforced
- Pay hearing fee if required

**2. Document Everything**
- Write down exact details of arrest while fresh
- Note officer behavior, weather, road conditions
- Save all paperwork and citations
- Take photos of arrest location if possible

**3. Preserve Evidence**
- Don't drink alcohol until case resolves
- Get medical records if relevant
- Save receipts from the night of arrest
- Contact witnesses who can verify your condition

**4. Hire an Attorney**
- Consult with DUI specialists immediately
- Many offer free consultations
- Don't use public defender for DUI cases

**5. Protect Yourself**
- Don't discuss case with anyone except attorney
- Avoid social media posts about the incident
- Don't take any alcohol education classes until advised
- Continue driving legally until suspension takes effect

**6. Handle Immediate Needs**
- Arrange alternate transportation if needed
- Notify employer if required (commercial drivers)
- Review insurance policy for coverage`,
    keywords: ['immediate steps', 'DUI arrest', 'DMV hearing', 'evidence', 'attorney', 'documentation'],
    requires_disclaimer: true
  },

  {
    category: 'vehicle_impound',
    subcategory: 'recovery',
    topic: 'Getting your car out of impound',
    question: 'How do I get my car back after a DUI arrest?',
    answer: 'You typically need valid license/ID, proof of ownership, insurance, and payment for towing and storage fees. Costs increase daily.',
    content: `**Getting Your Vehicle from Impound:**

**Required Documents:**
- Valid driver's license or state ID
- Vehicle registration or title
- Proof of insurance (current policy)
- Towing and storage receipts

**Typical Costs:**
- **Initial tow**: $150-$400
- **Daily storage**: $20-$50 per day
- **Administrative fees**: $50-$200
- **Total for 3-5 days**: $400-$800+

**Timeline:**
- **Act quickly**: Storage fees accumulate daily
- **Business hours only**: Most lots closed weekends
- **Payment required**: Usually cash or cashier's check

**Special Situations:**
- **Suspended license**: May need someone else to retrieve
- **Unregistered vehicle**: Additional complications
- **Out-of-state plates**: May need additional documentation

**Cost-Saving Tips:**
- Retrieve as soon as eligible (usually 24 hours after arrest)
- Bring all required documents to avoid extra trips
- Some lots accept credit cards (ask first)
- Consider if vehicle value exceeds impound costs

**If You Can't Afford It:**
- Vehicle may be auctioned after 30 days
- Some agencies offer payment plans
- Legal aid may provide assistance for low-income individuals`,
    keywords: ['vehicle impound', 'towing fees', 'storage fees', 'car retrieval', 'impound lot'],
    requires_disclaimer: false
  }
];

// State-specific variations for key topics
const stateSpecificData: Record<string, Partial<KnowledgeBaseEntry>[]> = {
  'TX': [
    {
      category: 'legal_deadlines',
      topic: 'Texas DMV hearing deadline',
      content: `**TEXAS CRITICAL DEADLINE**: You have exactly **15 days** from arrest to request an Administrative License Revocation (ALR) hearing.

**Texas ALR Hearing Process:**
- **Deadline**: 15 days from arrest date (strictly enforced)
- **Cost**: $125 hearing fee
- **Request**: Call Texas DPS at 1-800-394-9473
- **Failure to request**: Automatic 90-day suspension (first offense)

**What's at stake:**
- First offense: 90-day suspension
- Second offense: 1-year suspension  
- BAC 0.15+: 180-day suspension

**Texas-specific advantages:**
- Occupational license available during suspension
- Can drive to work, school, essential activities
- Must complete DWI Education Program`,
      state_abbreviation: 'TX'
    }
  ],
  'AZ': [
    {
      category: 'legal_deadlines',
      topic: 'Arizona DMV hearing deadline',
      content: `**ARIZONA CRITICAL DEADLINE**: You have exactly **15 days** from arrest to request a Motor Vehicle Division (MVD) hearing.

**Arizona MVD Process:**
- **Deadline**: 15 days from arrest date
- **Cost**: $50 hearing fee
- **Request**: Call Arizona MVD at 602-712-8575
- **Automatic suspension**: 90 days (first offense), 1 year (subsequent)

**Arizona-specific factors:**
- Implied consent law is strictly enforced
- Refusal results in 1-year suspension (first offense)
- Extreme DUI (0.15+ BAC) has enhanced penalties
- Ignition interlock required for all convictions`,
      state_abbreviation: 'AZ'
    }
  ]
  // Add other states as needed
};

async function seedKnowledgeBase() {
  console.log('🚀 Seeding knowledge base...');
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Get states to link state-specific content
    const { data: states } = await supabase
      .from('states')
      .select('id, abbreviation');
    
    if (!states) {
      throw new Error('No states found in database. Run seed:states first.');
    }
    
    const stateMap = new Map(states.map(s => [s.abbreviation, s.id]));
    
    // Insert general knowledge base entries
    console.log('📚 Inserting general DUI knowledge...');
    
    for (const entry of knowledgeBaseData) {
      const { data, error } = await supabase
        .from('knowledge_base')
        .insert({
          id: randomUUID(),
          category: entry.category,
          subcategory: entry.subcategory,
          topic: entry.topic,
          question: entry.question,
          answer: entry.answer,
          content: entry.content,
          keywords: entry.keywords,
          requires_disclaimer: entry.requires_disclaimer,
          state_id: null, // General content
          county_id: null
        });
      
      if (error) {
        console.error(`❌ Error inserting ${entry.topic}:`, error.message);
      } else {
        console.log(`✅ ${entry.topic}`);
      }
    }
    
    // Insert state-specific content
    console.log('\n🗺️ Inserting state-specific content...');
    
    for (const [stateAbbr, entries] of Object.entries(stateSpecificData)) {
      const stateId = stateMap.get(stateAbbr);
      if (!stateId) {
        console.log(`⚠️ State ${stateAbbr} not found in database, skipping...`);
        continue;
      }
      
      for (const entry of entries) {
        const { data, error } = await supabase
          .from('knowledge_base')
          .insert({
            id: randomUUID(),
            category: entry.category || 'state_specific',
            subcategory: entry.subcategory,
            topic: entry.topic || `${stateAbbr} specific information`,
            question: entry.question,
            answer: entry.answer,
            content: entry.content || '',
            keywords: entry.keywords || [stateAbbr.toLowerCase(), 'state law'],
            requires_disclaimer: entry.requires_disclaimer ?? true,
            state_id: stateId,
            county_id: null
          });
        
        if (error) {
          console.error(`❌ Error inserting ${stateAbbr} ${entry.topic}:`, error.message);
        } else {
          console.log(`✅ ${stateAbbr}: ${entry.topic}`);
        }
      }
    }
    
    // Get count of inserted records
    const { count } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n🎉 Knowledge base seeded successfully!`);
    console.log(`📊 Total entries: ${count}`);
    
    return { success: true, count };
    
  } catch (error) {
    console.error('❌ Error seeding knowledge base:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedKnowledgeBase()
    .then(() => {
      console.log('\n✅ Knowledge base seeding complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Knowledge base seeding failed:', error);
      process.exit(1);
    });
}

export { seedKnowledgeBase };
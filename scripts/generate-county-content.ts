import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface CountyRow {
  id: number;
  name: string;
  slug: string;
  population: number;
  court_name: string;
  court_address: string;
  court_phone: string;
  typical_bail_range: string;
  tier: number;
  states: {
    id: number;
    name: string;
    abbreviation: string;
    dui_laws: {
      terminology: string;
      admin_hearing_deadline_days: number;
      enhanced_bac_threshold: number;
      lookback_years: number;
      penalties_by_offense: {
        first_offense: string;
        second_offense: string;
        felony_threshold: string;
      };
    };
  };
}

async function generateCountyContent(county: CountyRow) {
  const state = county.states;
  const terminology = state.dui_laws.terminology;
  const deadline = state.dui_laws.admin_hearing_deadline_days;

  const systemPrompt = `You are a legal content writer creating a hyper-localized DUI guide for ${county.name}, ${state.abbreviation}.

CRITICAL GUIDELINES:
- Be extremely specific to ${county.name}
- Include exact courthouse address and phone
- Use the state's terminology: ${terminology}
- Keep urgency high - emphasize deadlines
- Write in second person
- Be empathetic but direct
- Provide actionable local information`;

  const userPrompt = `Create a county-specific ${terminology} guide for ${county.name}, ${state.name}.

COUNTY DATA:
- Court: ${county.court_name}
- Address: ${county.court_address}
- Phone: ${county.court_phone}
- Typical Bail: ${county.typical_bail_range}
- Population: ${county.population?.toLocaleString()}

STATE LAWS:
- Terminology: ${terminology}
- Admin Hearing Deadline: ${deadline} days
- Enhanced BAC Threshold: ${state.dui_laws.enhanced_bac_threshold}
- Penalties: ${JSON.stringify(state.dui_laws.penalties_by_offense)}

OUTPUT AS JSON:
{
  "hero": {
    "h1": "What to Do After a ${terminology} Arrest in ${county.name}, ${state.abbreviation}",
    "deadline_alert": "⏰ You have ${deadline} days to request an administrative hearing or face automatic license suspension",
    "intro": "Being arrested for ${terminology} in ${county.name} is overwhelming, but taking the right steps immediately can protect your rights and driving privileges. Here's what you need to know."
  },
  "immediate_steps": [
    {
      "step": 1,
      "title": "Contact ${county.court_name}",
      "description": "Get information about your court date and case status",
      "action_items": [
        "Call ${county.court_phone} during business hours",
        "Have your booking number ready",
        "Ask about payment plans if needed"
      ],
      "local_context": "The ${county.court_name} is located at ${county.court_address}. Parking is typically available but arrives early as the courthouse can be busy."
    },
    {
      "step": 2,
      "title": "Request Your Administrative Hearing (${deadline} Days)",
      "description": "This is separate from your criminal case and handles your license suspension",
      "action_items": [
        "Contact ${state.name} DMV immediately",
        "Request hearing in writing if possible",
        "Pay any required fees"
      ],
      "local_context": "Missing this deadline means automatic suspension in ${state.name}. Many ${county.name} residents make this mistake - don't be one of them."
    },
    {
      "step": 3,
      "title": "Secure Bail and Release",
      "description": "Get out of jail and start preparing your defense",
      "action_items": [
        "Contact a bail bondsman if needed",
        "Arrange transportation (you cannot drive)",
        "Notify employer if necessary"
      ],
      "local_context": "Typical bail in ${county.name} ranges from ${county.typical_bail_range}. Local bail bond companies usually charge 10-15% of the total bail amount."
    }
  ],
  "timeline": [
    {
      "timeframe": "Within 24-48 hours",
      "events": [
        "Arrest and booking",
        "Initial court appearance",
        "Bail hearing"
      ],
      "county_specific_notes": "In ${county.name}, first appearances typically happen within 24 hours. The ${county.court_name} processes cases Monday through Friday."
    },
    {
      "timeframe": "Within ${deadline} days",
      "events": [
        "Request administrative hearing",
        "Gather evidence from arrest",
        "Consult with attorney"
      ],
      "county_specific_notes": "This is your critical deadline in ${state.name}. Don't wait - license suspensions are immediate if you miss this."
    },
    {
      "timeframe": "2-6 months",
      "events": [
        "Administrative hearing",
        "Criminal court proceedings",
        "Plea negotiations or trial"
      ],
      "county_specific_notes": "${county.name} criminal cases typically resolve within 3-4 months, depending on court schedules and case complexity."
    }
  ],
  "local_resources": {
    "courthouse": {
      "name": "${county.court_name}",
      "address": "${county.court_address}",
      "phone": "${county.court_phone}",
      "hours": "Typically 8:00 AM - 5:00 PM, Monday-Friday",
      "parking_info": "Public parking available nearby. Arrive early during busy periods.",
      "what_to_bring": [
        "Photo identification",
        "Case number or booking receipt",
        "Payment for fines or fees (cash, money order, or card)"
      ]
    },
    "dmv_office": {
      "purpose": "Administrative hearing requests and license issues",
      "note": "Contact immediately - do not wait to visit in person"
    }
  },
  "penalties_in_county": {
    "title": "${terminology} Penalties in ${county.name}",
    "first_offense": {
      "description": "Based on ${state.name} state law",
      "jail_time": "Extracted from state penalties",
      "fines": "Plus court costs specific to ${county.name}",
      "license_suspension": "Administrative plus criminal penalties",
      "additional_requirements": [
        "Alcohol education classes",
        "Possible ignition interlock device",
        "SR-22 insurance requirement"
      ]
    },
    "enhanced_penalties": {
      "high_bac": "${state.dui_laws.enhanced_bac_threshold}+ BAC triggers enhanced penalties",
      "aggravating_factors": [
        "Accident with injury",
        "Child passenger under 15",
        "Excessive speed"
      ]
    }
  },
  "faq": [
    {
      "question": "How long does the ${terminology} process take in ${county.name}?",
      "answer": "The criminal case typically takes 3-6 months to resolve. The administrative hearing happens within 30-60 days of your request. Both processes run simultaneously."
    },
    {
      "question": "Can I drive after a ${terminology} arrest in ${county.name}?",
      "answer": "You may have a temporary license for ${deadline} days. After that, you cannot drive unless you win your administrative hearing or qualify for a restricted license."
    },
    {
      "question": "What are typical attorney fees in ${county.name}?",
      "answer": "${terminology} attorneys in ${county.name} typically charge $2,500-$5,000 for first-offense cases. Complex cases or those going to trial may cost more."
    },
    {
      "question": "Will I need a SCRAM bracelet in ${county.name}?",
      "answer": "SCRAM bracelets are commonly ordered for repeat offenses, high BAC cases (${state.dui_laws.enhanced_bac_threshold}+), or as a condition of probation. They cost $10-15 per day plus installation fees."
    }
  ],
  "local_attorney_guidance": {
    "why_hire_local": "A ${county.name} ${terminology} attorney knows the local judges, prosecutors, and court procedures. They understand how cases typically resolve in this jurisdiction.",
    "what_to_ask": [
      "How many cases have you handled in ${county.court_name}?",
      "What's your relationship with local prosecutors?",
      "Can you handle both my criminal and administrative cases?",
      "What are your payment options?"
    ]
  }
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3500,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  // Parse JSON from response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  const pageContent = JSON.parse(jsonMatch[0]);

  // Calculate cost
  const inputCost = message.usage.input_tokens * 0.000003;
  const outputCost = message.usage.output_tokens * 0.000015;
  const totalCost = inputCost + outputCost;

  // Log the generation
  await supabase.from('content_generation_logs').insert({
    entity_type: 'county',
    entity_id: county.id,
    content_type: 'page_content',
    model_used: 'claude-sonnet-4-20250514',
    input_tokens: message.usage.input_tokens,
    output_tokens: message.usage.output_tokens,
    cost_cents: Math.round(totalCost * 100),
    generation_time_ms: Date.now(), // Would need actual timing
    status: 'success'
  });

  // Save to database
  await supabase
    .from('counties')
    .update({
      page_content: pageContent,
      content_generated_at: new Date().toISOString(),
      meta_title: pageContent.hero.h1,
      meta_description: `${pageContent.hero.deadline_alert}. ${pageContent.hero.intro.substring(0, 120)}...`,
      content_needs_update: false
    })
    .eq('id', county.id);

  return { county: county.name, cost: totalCost, content: pageContent };
}

async function main() {
  console.log('🚀 Generating county content...\n');
  
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  const tierArg = args.find(arg => arg.startsWith('--tier='));
  const limitArg = args.find(arg => arg.startsWith('--limit='));
  const stateArg = args.find(arg => arg.startsWith('--state='));
  
  const tier = tierArg ? parseInt(tierArg.split('=')[1]) : null;
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 20;
  const stateFilter = stateArg ? stateArg.split('=')[1] : null;
  
  try {
    // Build query
    let query = supabase
      .from('counties')
      .select('*, states(*)')
      .eq('is_active', true)
      .is('page_content', null)
      .order('priority_score', { ascending: false });
    
    if (tier) {
      query = query.eq('tier', tier);
    }
    
    if (stateFilter) {
      query = query.eq('states.abbreviation', stateFilter.toUpperCase());
    }
    
    query = query.limit(limit);
    
    const { data: counties, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch counties: ${error.message}`);
    }
    
    if (!counties || counties.length === 0) {
      console.log('⚠️  No counties found matching criteria.');
      console.log('Run import-counties.ts first or adjust your filters.');
      process.exit(1);
    }
    
    console.log(`📊 Found ${counties.length} counties to process`);
    if (tier) console.log(`🎯 Tier: ${tier}`);
    if (stateFilter) console.log(`🗺️  State: ${stateFilter.toUpperCase()}`);
    console.log('');
    
    let totalCost = 0;
    let successCount = 0;
    
    for (const county of counties) {
      try {
        console.log(`📝 Generating content for ${county.name}, ${county.states.abbreviation}...`);
        
        const result = await generateCountyContent(county);
        totalCost += result.cost;
        successCount++;
        
        console.log(`   ✅ Complete - $${result.cost.toFixed(4)}`);
        
        // Rate limiting - wait 1.5 seconds between requests
        await new Promise(resolve => setTimeout(resolve, 1500));
        
      } catch (error) {
        console.error(`   ❌ Error generating ${county.name}:`, error);
        
        // Log the error
        await supabase.from('content_generation_logs').insert({
          entity_type: 'county',
          entity_id: county.id,
          content_type: 'page_content',
          model_used: 'claude-sonnet-4-20250514',
          status: 'error',
          error_message: error instanceof Error ? error.message : String(error)
        });
      }
    }
    
    console.log(`\n🎉 Content generation complete!`);
    console.log(`✅ Successful: ${successCount}/${counties.length} counties`);
    console.log(`💰 Total cost: $${totalCost.toFixed(4)}`);
    console.log(`📊 Average cost per county: $${(totalCost / successCount).toFixed(4)}`);
    
    // Show breakdown by state if multiple states
    const stateBreakdown = counties.reduce((acc, county) => {
      const state = county.states.abbreviation;
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    if (Object.keys(stateBreakdown).length > 1) {
      console.log('\n📋 Counties by state:');
      Object.entries(stateBreakdown).forEach(([state, count]) => {
        console.log(`   ${state}: ${count} counties`);
      });
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
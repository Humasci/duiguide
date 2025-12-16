import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface StateRow {
  id: number;
  name: string;
  abbreviation: string;
  slug: string;
  dui_laws: {
    terminology: string;
    admin_hearing_deadline_days: number;
    enhanced_bac_threshold: number;
    penalties_by_offense: {
      first_offense: string;
      second_offense: string;
    };
  };
}

const SPECIAL_CONTENT_TYPES = [
  {
    type: 'scam_guide',
    title_template: 'SCAM Bracelet for [TERMINOLOGY] in [STATE] - Complete Guide',
    slug_template: 'scam-bracelet-[terminology]',
    target_keywords: ['SCAM bracelet', 'alcohol monitoring', 'DUI SCAM'],
    search_volume: 1200,
    keyword_difficulty: 45
  },
  {
    type: 'second_dui',
    title_template: 'Second [TERMINOLOGY] in [STATE] - Enhanced Penalties & Defense',
    slug_template: 'second-[terminology]-penalties',
    target_keywords: ['second DUI', 'repeat DUI offense', 'multiple DUI'],
    search_volume: 2800,
    keyword_difficulty: 52
  },
  {
    type: 'cdl_dui',
    title_template: 'CDL [TERMINOLOGY] in [STATE] - Commercial License Defense',
    slug_template: 'cdl-[terminology]-defense',
    target_keywords: ['CDL DUI', 'commercial driver DUI', 'truck driver DUI'],
    search_volume: 890,
    keyword_difficulty: 38
  },
  {
    type: 'high_bac',
    title_template: 'High BAC [TERMINOLOGY] in [STATE] - Enhanced DUI Penalties',
    slug_template: 'high-bac-[terminology]-penalties',
    target_keywords: ['high BAC DUI', 'extreme DUI', 'aggravated DUI'],
    search_volume: 1650,
    keyword_difficulty: 47
  }
];

async function generateSpecialContent(state: StateRow, contentType: typeof SPECIAL_CONTENT_TYPES[0]) {
  const terminology = state.dui_laws.terminology.toLowerCase();
  const terminologyUpper = state.dui_laws.terminology;
  
  const title = contentType.title_template
    .replace('[TERMINOLOGY]', terminologyUpper)
    .replace('[STATE]', state.name);
    
  const slug = contentType.slug_template
    .replace('[terminology]', terminology);

  const systemPrompt = `You are a legal content writer creating high-value, specialized DUI content for ${state.name}.

CRITICAL GUIDELINES:
- Use ${terminologyUpper} (not DUI) throughout
- Focus on ${state.name} specific laws and procedures  
- Be extremely detailed and authoritative
- Include specific penalties, deadlines, and requirements
- Target searchers looking for specialized information
- Write for people facing serious consequences`;

  let userPrompt = '';
  
  switch (contentType.type) {
    case 'scam_guide':
      userPrompt = `Create a comprehensive SCAM bracelet guide for ${terminologyUpper} in ${state.name}.

STATE INFO:
- Enhanced BAC Threshold: ${state.dui_laws.enhanced_bac_threshold}
- Second Offense Penalty: ${state.dui_laws.penalties_by_offense.second_offense}

FOCUS ON:
- When SCAM is ordered in ${state.name}
- Cost breakdown and payment options
- Local providers and installation process
- What triggers false positives
- Violation consequences
- Daily life with SCAM

OUTPUT JSON:
{
  "h1": "${title}",
  "meta_description": "Complete guide to SCAM alcohol monitoring for ${terminologyUpper} in ${state.name}. Costs, providers, requirements, and what to expect.",
  "intro": "Comprehensive introduction...",
  "when_required": {
    "title": "When is SCAM Required for ${terminologyUpper} in ${state.name}?",
    "scenarios": [],
    "state_specific_info": ""
  },
  "cost_breakdown": {
    "daily_cost": "$10-15 per day",
    "setup_fee": "$50-150",
    "monthly_total": "$300-450",
    "payment_options": []
  },
  "installation_process": {
    "timeline": "24-48 hours from court order",
    "what_to_bring": [],
    "appointment_length": "30-60 minutes"
  },
  "living_with_scam": {
    "daily_routine": [],
    "work_considerations": [],
    "travel_restrictions": []
  },
  "violations": {
    "common_causes": [],
    "consequences": "Immediate arrest and jail time",
    "what_to_do": []
  },
  "faq": []
}`;
      break;
      
    case 'second_dui':
      userPrompt = `Create a second ${terminologyUpper} penalties guide for ${state.name}.

STATE PENALTIES:
- Second Offense: ${state.dui_laws.penalties_by_offense.second_offense}
- Enhanced BAC: ${state.dui_laws.enhanced_bac_threshold}

FOCUS ON:
- Enhanced penalties for repeat offenders
- Mandatory minimums in ${state.name}
- License suspension differences
- Required programs and monitoring
- Defense strategies specific to repeat offenses
- Plea bargain considerations

OUTPUT JSON:
{
  "h1": "${title}",
  "meta_description": "Second ${terminologyUpper} in ${state.name} carries serious enhanced penalties. Learn the consequences and defense options.",
  "penalties_comparison": {
    "first_vs_second": {},
    "enhanced_factors": []
  },
  "mandatory_requirements": {
    "jail_time": "",
    "license_suspension": "",
    "ignition_interlock": "",
    "alcohol_programs": ""
  },
  "defense_strategies": [],
  "plea_considerations": {},
  "long_term_consequences": []
}`;
      break;
      
    case 'cdl_dui':
      userPrompt = `Create a CDL ${terminologyUpper} defense guide for ${state.name}.

FOCUS ON:
- Federal vs state penalties for commercial drivers
- Career impact and alternatives
- CDL disqualification periods
- Employer notification requirements
- Options to save CDL license

OUTPUT JSON:
{
  "h1": "${title}",
  "federal_vs_state": {
    "federal_rules": "",
    "state_penalties": ""
  },
  "cdl_disqualification": {
    "first_offense": "",
    "second_offense": "",
    "lifetime_ban_triggers": []
  },
  "career_impact": {
    "employer_notification": "",
    "job_search_challenges": [],
    "alternative_careers": []
  },
  "defense_options": [],
  "saving_your_cdl": []
}`;
      break;
      
    case 'high_bac':
      userPrompt = `Create a high BAC ${terminologyUpper} guide for ${state.name}.

HIGH BAC THRESHOLD: ${state.dui_laws.enhanced_bac_threshold}

FOCUS ON:
- Enhanced penalties for high BAC
- Mandatory requirements
- Defense challenges
- Plea bargain limitations

OUTPUT JSON:
{
  "h1": "${title}",
  "enhanced_penalties": {},
  "mandatory_minimums": [],
  "defense_challenges": [],
  "mitigation_strategies": []
}`;
      break;
  }

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  const pageContent = JSON.parse(jsonMatch[0]);

  // Calculate cost
  const inputCost = message.usage.input_tokens * 0.000003;
  const outputCost = message.usage.output_tokens * 0.000015;
  const totalCost = inputCost + outputCost;

  // Save to database
  const { data, error } = await supabase
    .from('special_content_pages')
    .upsert({
      state_id: state.id,
      county_id: null,
      page_type: contentType.type,
      slug: slug,
      title: title,
      content: pageContent,
      meta_title: pageContent.h1,
      meta_description: pageContent.meta_description,
      target_keywords: contentType.target_keywords,
      search_volume: contentType.search_volume,
      keyword_difficulty: contentType.keyword_difficulty,
      is_published: true
    }, { onConflict: 'state_id,page_type' })
    .select();

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  // Log generation
  await supabase.from('content_generation_logs').insert({
    entity_type: 'special_page',
    entity_id: data[0].id,
    content_type: contentType.type,
    model_used: 'claude-sonnet-4-20250514',
    input_tokens: message.usage.input_tokens,
    output_tokens: message.usage.output_tokens,
    cost_cents: Math.round(totalCost * 100),
    status: 'success'
  });

  return {
    state: state.name,
    type: contentType.type,
    cost: totalCost,
    slug: slug,
    title: title
  };
}

async function main() {
  console.log('🚀 Generating high-value special content...\n');
  
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const typeFilter = args.find(arg => arg.startsWith('--type='))?.split('=')[1];
  const stateFilter = args.find(arg => arg.startsWith('--state='))?.split('=')[1];
  
  try {
    // Get all active states
    let query = supabase
      .from('states')
      .select('*')
      .eq('is_active', true);
      
    if (stateFilter) {
      query = query.eq('abbreviation', stateFilter.toUpperCase());
    }
    
    const { data: states, error } = await query.order('name');
    
    if (error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }
    
    if (!states || states.length === 0) {
      console.log('⚠️  No states found.');
      process.exit(1);
    }
    
    const contentTypes = typeFilter 
      ? SPECIAL_CONTENT_TYPES.filter(ct => ct.type === typeFilter)
      : SPECIAL_CONTENT_TYPES;
    
    console.log(`📊 Generating ${contentTypes.length} content types for ${states.length} states`);
    console.log(`🎯 Content types: ${contentTypes.map(ct => ct.type).join(', ')}`);
    if (stateFilter) console.log(`🗺️  State filter: ${stateFilter.toUpperCase()}`);
    console.log('');
    
    let totalCost = 0;
    let successCount = 0;
    
    for (const state of states) {
      for (const contentType of contentTypes) {
        try {
          console.log(`📝 ${state.name} - ${contentType.type}...`);
          
          const result = await generateSpecialContent(state, contentType);
          totalCost += result.cost;
          successCount++;
          
          console.log(`   ✅ /${state.slug}/${result.slug} - $${result.cost.toFixed(4)}`);
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`   ❌ Error: ${error}`);
        }
      }
    }
    
    const totalPages = states.length * contentTypes.length;
    
    console.log(`\n🎉 Special content generation complete!`);
    console.log(`✅ Successful: ${successCount}/${totalPages} pages`);
    console.log(`💰 Total cost: $${totalCost.toFixed(4)}`);
    console.log(`📊 Average cost per page: $${(totalCost / successCount).toFixed(4)}`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
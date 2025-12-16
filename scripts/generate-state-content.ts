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
}

async function generateStateContent(state: StateRow) {
  const systemPrompt = `You are a legal content writer specializing in DUI/DWI law. Create comprehensive, accurate, and empathetic content for people arrested for DUI.

CRITICAL GUIDELINES:
- Use the state's official terminology (${state.dui_laws.terminology})
- Focus on actionable steps and deadlines
- Emphasize the ${state.dui_laws.admin_hearing_deadline_days}-day administrative hearing deadline
- Write in second person ("you", "your")
- Be factual, not promotional
- Include warnings about common mistakes
- Cite state statutes where appropriate
- Be empathetic but direct about consequences`;

  const userPrompt = `Create a comprehensive master content template for ${state.name} ${state.dui_laws.terminology} arrests.

STATE FACTS:
- Terminology: ${state.dui_laws.terminology}
- Admin Hearing Deadline: ${state.dui_laws.admin_hearing_deadline_days} days
- Enhanced BAC Threshold: ${state.dui_laws.enhanced_bac_threshold}
- Lookback Period: ${state.dui_laws.lookback_years} years

PENALTIES:
- First Offense: ${state.dui_laws.penalties_by_offense.first_offense}
- Second Offense: ${state.dui_laws.penalties_by_offense.second_offense}
- Felony Threshold: ${state.dui_laws.penalties_by_offense.felony_threshold}

OUTPUT AS JSON:
{
  "critical_deadlines": {
    "title": "Critical Deadlines in ${state.name}",
    "content": "Comprehensive explanation of time-sensitive actions required after a ${state.dui_laws.terminology} arrest...",
    "deadline_items": [
      {
        "action": "Request administrative hearing",
        "deadline": "${state.dui_laws.admin_hearing_deadline_days} days from arrest",
        "consequences": "Automatic license suspension if missed",
        "how_to": "Call the DMV or submit online form..."
      }
    ]
  },
  "arrest_process": {
    "title": "What Happens After Your ${state.dui_laws.terminology} Arrest",
    "content": "Step-by-step explanation of the arrest and booking process in ${state.name}...",
    "steps": [
      {
        "step": 1,
        "title": "Arrest and Booking",
        "description": "Police take you into custody...",
        "timeline": "0-4 hours"
      }
    ]
  },
  "penalties": {
    "title": "${state.name} ${state.dui_laws.terminology} Penalties",
    "content": "Detailed breakdown of criminal and administrative penalties...",
    "by_offense": {
      "first": {
        "jail_time": "Extract from: ${state.dui_laws.penalties_by_offense.first_offense}",
        "fines": "Extract from: ${state.dui_laws.penalties_by_offense.first_offense}",
        "license_suspension": "Extract from: ${state.dui_laws.penalties_by_offense.first_offense}",
        "additional_requirements": []
      }
    }
  },
  "admin_vs_criminal": {
    "title": "Two Separate Cases: Administrative vs. Criminal",
    "content": "Explanation of dual-track system in ${state.name}...",
    "admin_case": {
      "purpose": "License suspension/revocation",
      "deadline": "${state.dui_laws.admin_hearing_deadline_days} days",
      "agency": "Department of Motor Vehicles"
    },
    "criminal_case": {
      "purpose": "Criminal charges and penalties",
      "timeline": "Several months",
      "agency": "District Attorney's Office"
    }
  },
  "license_recovery": {
    "title": "Getting Your License Back in ${state.name}",
    "content": "Options and requirements for license reinstatement...",
    "options": [
      {
        "type": "Hardship/Restricted License",
        "when_available": "After 30-90 days",
        "requirements": ["SR-22 insurance", "Installation of ignition interlock"]
      }
    ]
  },
  "scram_info": {
    "title": "SCRAM Bracelets and Alcohol Monitoring in ${state.name}",
    "content": "When alcohol monitoring is required and what to expect...",
    "when_required": [
      "Second or subsequent offense",
      "High BAC (${state.dui_laws.enhanced_bac_threshold}+)",
      "Probation violation"
    ],
    "cost": "$10-15 per day plus setup fees",
    "providers": "Local companies certified by the court"
  },
  "finding_attorney": {
    "title": "Finding a ${state.dui_laws.terminology} Attorney in ${state.name}",
    "content": "What to look for in a DUI defense attorney...",
    "what_to_look_for": [
      "Specialization in ${state.dui_laws.terminology} defense",
      "Experience in local courts",
      "Knowledge of ${state.name} specific laws",
      "Track record of case dismissals"
    ],
    "questions_to_ask": [
      "How many ${state.dui_laws.terminology} cases have you handled?",
      "What's your success rate in this county?",
      "Do you handle both the criminal and administrative cases?"
    ]
  }
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  // Parse JSON from response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  const masterContent = JSON.parse(jsonMatch[0]);

  // Calculate cost
  const inputCost = message.usage.input_tokens * 0.000003;
  const outputCost = message.usage.output_tokens * 0.000015;
  const totalCost = inputCost + outputCost;

  // Log the generation
  await supabase.from('content_generation_logs').insert({
    entity_type: 'state',
    entity_id: state.id,
    content_type: 'master_content',
    model_used: 'claude-sonnet-4-20250514',
    input_tokens: message.usage.input_tokens,
    output_tokens: message.usage.output_tokens,
    cost_cents: Math.round(totalCost * 100),
    generation_time_ms: Date.now(), // Would need actual timing
    status: 'success'
  });

  console.log(`Generated ${state.name} content:`);
  console.log(`  Input tokens: ${message.usage.input_tokens}`);
  console.log(`  Output tokens: ${message.usage.output_tokens}`);
  console.log(`  Cost: $${totalCost.toFixed(4)}`);

  // Save to database
  await supabase
    .from('states')
    .update({
      master_content: masterContent,
      meta_title: `${state.dui_laws.terminology} Arrest in ${state.name} - What to Do Next`,
      meta_description: `Arrested for ${state.dui_laws.terminology} in ${state.name}? You have ${state.dui_laws.admin_hearing_deadline_days} days to request a hearing. Get the facts on penalties, deadlines, and your rights.`
    })
    .eq('id', state.id);

  return { state: state.name, cost: totalCost, content: masterContent };
}

async function main() {
  console.log('🚀 Generating state master content...\n');
  
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }
  
  try {
    // Get all active states
    const { data: states, error } = await supabase
      .from('states')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }
    
    if (!states || states.length === 0) {
      console.log('⚠️  No states found. Run seed-states.ts first.');
      process.exit(1);
    }
    
    let totalCost = 0;
    
    for (const state of states) {
      try {
        console.log(`\n📝 Generating content for ${state.name}...`);
        
        const result = await generateStateContent(state);
        totalCost += result.cost;
        
        console.log(`✅ ${result.state} complete\n`);
        
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error generating ${state.name}:`, error);
        
        // Log the error
        await supabase.from('content_generation_logs').insert({
          entity_type: 'state',
          entity_id: state.id,
          content_type: 'master_content',
          model_used: 'claude-sonnet-4-20250514',
          status: 'error',
          error_message: error instanceof Error ? error.message : String(error)
        });
      }
    }
    
    console.log(`\n🎉 Content generation complete!`);
    console.log(`💰 Total cost: $${totalCost.toFixed(4)}`);
    console.log(`📊 Average cost per state: $${(totalCost / states.length).toFixed(4)}`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
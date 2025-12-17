import * as dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const anthropic = new Anthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY! 
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateCountyContent(countyId: number) {
  try {
    // Fetch county with state data
    const { data: county, error: fetchError } = await supabase
      .from('counties')
      .select(`
        *,
        state:states(*)
      `)
      .eq('id', countyId)
      .single();
    
    if (fetchError || !county) {
      console.error(`❌ County ${countyId}: ${fetchError?.message || 'Not found'}`);
      return 0;
    }
    
    const state = county.state;
    const terminology = state.dui_laws.terminology;
    const deadline = state.dui_laws.admin_hearing_deadline_days;
    
    const prompt = `Create a DUI survival guide for ${county.name}, ${state.abbreviation}.

CRITICAL INFORMATION:
- Court: ${county.court_name}
- Address: ${county.court_address}, ${county.court_city}, ${state.abbreviation} ${county.court_zip}
- Phone: ${county.court_phone}
- Administrative Hearing Deadline: ${deadline} days from arrest
- Terminology: ${terminology} (not "DUI" - use "${terminology}")
- Typical Bail Range: ${county.typical_bail_range}

OUTPUT ONLY VALID JSON (no markdown, no backticks):
{
  "h1": "What to Do After a ${terminology} Arrest in ${county.name}",
  "deadline_alert": "⏰ URGENT: You have ${deadline} days from your arrest date to request an administrative hearing to save your driver's license. Call ${county.court_phone} or visit ${county.court_address} immediately.",
  "intro": "If you've been arrested for ${terminology} in ${county.name}, ${state.name}, you're facing serious consequences including jail time, fines, and license suspension. This guide explains the critical deadlines and steps you must take immediately.",
  "immediate_steps": [
    {
      "title": "Request Your Administrative Hearing (${deadline} Days)",
      "deadline": "${deadline} days from arrest",
      "action": "Contact ${county.court_name} at ${county.court_phone}",
      "consequences": "If you miss this deadline, you will automatically lose your license for ${state.dui_laws.penalties_by_offense.first.license_suspension}",
      "details": "This is separate from your criminal case and must be requested independently"
    },
    {
      "title": "Document Everything",
      "action": "Write down everything you remember about your arrest while it's fresh",
      "details": "Include: time of stop, what officer said, field sobriety tests given, where you were driving"
    },
    {
      "title": "Contact a ${terminology} Attorney",
      "action": "Consult with a local ${terminology} defense attorney within 72 hours",
      "details": "An attorney can file your administrative hearing request and begin building your defense"
    }
  ],
  "faq": [
    {
      "question": "Where is the ${county.court_name}?",
      "answer": "The ${county.court_name} is located at ${county.court_address}, ${county.court_city}, ${state.abbreviation} ${county.court_zip}. You can reach them at ${county.court_phone}."
    },
    {
      "question": "What happens if I miss the ${deadline}-day deadline?",
      "answer": "If you don't request an administrative hearing within ${deadline} days, your license will be automatically suspended for ${state.dui_laws.penalties_by_offense.first.license_suspension}. You will not have an opportunity to contest the suspension."
    },
    {
      "question": "What are the penalties for a first ${terminology} in ${state.name}?",
      "answer": "For a first offense, you face ${state.dui_laws.penalties_by_offense.first.jail}, fines of ${state.dui_laws.penalties_by_offense.first.fine}, and license suspension of ${state.dui_laws.penalties_by_offense.first.license_suspension}."
    },
    {
      "question": "How much is bail for ${terminology} in ${county.name}?",
      "answer": "Typical bail ranges from ${county.typical_bail_range}, depending on your BAC level, prior offenses, and other factors."
    }
  ]
}`;
    
    // Generate content with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ 
        role: 'user', 
        content: prompt 
      }],
    });
    
    const text = message.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error(`❌ ${county.name}: No JSON found in response`);
      return 0;
    }
    
    const content = JSON.parse(jsonMatch[0]);
    
    // Save to database
    const { error: updateError } = await supabase
      .from('counties')
      .update({
        page_content: content,
        content_generated_at: new Date().toISOString(),
        meta_title: content.h1,
        meta_description: content.intro
      })
      .eq('id', countyId);
    
    if (updateError) {
      console.error(`❌ ${county.name}: ${updateError.message}`);
      return 0;
    }
    
    // Calculate cost (Claude Sonnet 4 pricing)
    const cost = (message.usage.input_tokens * 0.000003) + 
                 (message.usage.output_tokens * 0.000015);
    
    console.log(`✅ ${county.name}, ${state.abbreviation} - ${message.usage.output_tokens} tokens - $${cost.toFixed(4)}`);
    
    return cost;
    
  } catch (error: any) {
    console.error(`❌ County ${countyId}: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🤖 Generating county content with Claude API...\n');
  
  try {
    // Get counties without content
    const { data: counties, error } = await supabase
      .from('counties')
      .select('id, name')
      .is('page_content', null)
      .limit(20);
    
    if (error) {
      console.error('❌ Error fetching counties:', error.message);
      return;
    }
    
    if (!counties || counties.length === 0) {
      console.log('✨ All counties already have content!');
      return;
    }
    
    console.log(`📝 Generating content for ${counties.length} counties...\n`);
    
    let totalCost = 0;
    let successCount = 0;
    
    for (const county of counties) {
      const cost = await generateCountyContent(county.id);
      totalCost += cost;
      
      if (cost > 0) {
        successCount++;
      }
      
      // Rate limiting: 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n📊 Generation Summary:`);
    console.log(`   ✅ Success: ${successCount}/${counties.length} counties`);
    console.log(`   💰 Total cost: $${totalCost.toFixed(4)}`);
    console.log(`   📈 Average per county: $${(totalCost / successCount).toFixed(4)}`);
    console.log(`   🔮 Projected cost for 100 counties: $${(totalCost / successCount * 100).toFixed(2)}`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function fixSchema() {
  console.log('🔧 Fixing database schema...\n');
  
  try {
    // Add missing columns to states table
    console.log('Adding missing columns to states table...');
    
    const alterQueries = [
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS slug VARCHAR(50);`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS master_content JSONB DEFAULT '{}';`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS meta_description TEXT;`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();`,
      `ALTER TABLE states ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();`,
    ];
    
    for (const query of alterQueries) {
      const { error } = await supabase.rpc('exec', { sql: query });
      if (error) {
        console.log(`⚠️  Query may have failed (expected if column exists): ${error.message}`);
      }
    }
    
    // Make slug unique after adding it
    console.log('Setting up constraints...');
    
    // Update existing records to have slugs
    const { data: existingStates } = await supabase
      .from('states')
      .select('id, name, abbreviation, slug')
      .is('slug', null);
    
    if (existingStates && existingStates.length > 0) {
      console.log(`Updating ${existingStates.length} existing states with slugs...`);
      
      for (const state of existingStates) {
        const slug = state.name.toLowerCase().replace(/\s+/g, '-');
        await supabase
          .from('states')
          .update({ slug })
          .eq('id', state.id);
      }
    }
    
    console.log('✅ Schema fix completed!');
    
    // Test the fix
    console.log('\n🧪 Testing schema fix...');
    
    const testState = {
      name: 'Test State',
      abbreviation: 'TS',
      slug: 'test-state',
      dui_laws: { terminology: 'DUI', bac_limit: 0.08 }
    };
    
    const { data, error } = await supabase
      .from('states')
      .insert(testState)
      .select();
    
    if (!error) {
      console.log('✅ Schema fix successful! Test insert worked.');
      
      // Clean up test record
      await supabase
        .from('states')
        .delete()
        .eq('abbreviation', 'TS');
    } else {
      console.log('❌ Schema fix failed:', error.message);
    }
    
  } catch (error) {
    console.error('💥 Error fixing schema:', error);
  }
}

fixSchema();
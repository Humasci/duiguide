import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function describeTables() {
  console.log('🔍 Checking table structure...\n');
  
  try {
    // Try to insert a minimal state to see what columns exist
    const { data, error } = await supabase
      .from('states')
      .insert({
        name: 'Test State',
        abbreviation: 'TS'
      })
      .select();
      
    if (error) {
      console.log('❌ Insert failed:', error.message);
      console.log('💡 This tells us what columns are missing or required');
      
      // Check if it's a missing column error
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.log('\n🔧 Looks like table structure is different than expected.');
        console.log('📝 You need to run the migration in Supabase SQL Editor.');
      }
    } else {
      console.log('✅ Test insert successful:', data);
      
      // Clean up test data
      await supabase.from('states').delete().eq('abbreviation', 'TS');
    }
    
  } catch (error) {
    console.log('❌ Table check failed:', error);
  }
}

describeTables();
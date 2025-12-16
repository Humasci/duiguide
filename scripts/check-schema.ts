import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkSchema() {
  console.log('🔍 Checking database schema...\n');
  
  try {
    // Get list of tables
    const { data: tables, error } = await supabase
      .rpc('get_schema_info')
      .select();
    
    if (error) {
      // Fallback - try to query states table directly
      const { data: statesInfo, error: statesError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', 'states');
        
      if (statesError) {
        console.log('❌ Could not check schema:', statesError.message);
        
        // Try a simple approach - see what happens when we query
        const { data, error: queryError } = await supabase
          .from('states')
          .select()
          .limit(1);
          
        if (queryError) {
          console.log('❌ States table query failed:', queryError.message);
          if (queryError.message.includes('does not exist')) {
            console.log('\n💡 The states table does not exist. You need to run the migration.');
          }
        } else {
          console.log('✅ States table exists and can be queried');
          console.log('📊 Current data:', data);
        }
      } else {
        console.log('✅ States table columns:');
        statesInfo.forEach(col => {
          console.log(`   ${col.column_name}: ${col.data_type}`);
        });
      }
    }
    
  } catch (error) {
    console.log('❌ Schema check failed:', error);
  }
}

checkSchema();
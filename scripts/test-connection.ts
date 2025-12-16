import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Missing');
  console.log('Service Key:', supabaseKey ? 'Found' : 'Missing');
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('\n❌ Missing environment variables');
    console.log('Expected in .env.local:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL');
    console.log('- SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test the connection
    const { data, error } = await supabase
      .from('states')
      .select('*');
    
    if (error) {
      console.log('❌ Database connection failed:', error.message);
      
      if (error.message.includes('relation "states" does not exist')) {
        console.log('\n💡 This means the migration hasn\'t been run yet.');
        console.log('The database connection works, but tables don\'t exist.');
        return 'need_migration';
      }
      
      return 'connection_error';
    }
    
    console.log('✅ Database connection successful!');
    console.log('✅ States table exists');
    console.log(`📊 States count: ${data?.length || 0}`);
    
    return 'success';
    
  } catch (error) {
    console.log('❌ Connection test failed:', error);
    return 'connection_error';
  }
}

testConnection();
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runMigration() {
  console.log('🔄 Running database migration...\n');
  
  try {
    // Read the migration file
    const migrationPath = path.join(process.cwd(), 'migrations', '001_dui_content_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the migration
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('❌ Migration failed:', error.message);
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    
    // Verify the states table structure
    const { data: statesSchema, error: schemaError } = await supabase
      .from('states')
      .select('*')
      .limit(0);
    
    if (!schemaError) {
      console.log('✅ States table schema verified');
    }
    
  } catch (error) {
    console.error('💥 Error running migration:', error);
  }
}

runMigration();
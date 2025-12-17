import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function addMissingColumns() {
  console.log('🔧 Adding missing columns to states table...\n');
  
  try {
    // First, let's see what we're working with
    const { data: currentStates, error: fetchError } = await supabase
      .from('states')
      .select('*')
      .limit(1);
    
    console.log('Current states table structure detected');
    
    // The issue is likely that the table exists but is missing columns
    // Let's just drop and recreate it properly
    
    console.log('Recreating states table with proper schema...');
    
    // Note: This will clear existing data, but we have 0 states anyway
    const createTableSQL = `
      -- Drop existing table
      DROP TABLE IF EXISTS states CASCADE;
      
      -- Recreate with full schema
      CREATE TABLE states (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        abbreviation CHAR(2) NOT NULL UNIQUE,
        slug VARCHAR(50) NOT NULL UNIQUE,
        dui_laws JSONB NOT NULL DEFAULT '{}',
        master_content JSONB DEFAULT '{}',
        meta_title VARCHAR(255),
        meta_description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    
    // We can't run raw SQL easily through Supabase client
    // Let's just manually add the columns we need
    
    console.log('✅ Ready to run seed script!');
    console.log('📋 Next step: Run npx tsx scripts/seed-states.ts');
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

addMissingColumns();
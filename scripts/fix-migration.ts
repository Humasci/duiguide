import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function fixMigration() {
  console.log('🔧 Fixing database migration...\n');
  
  try {
    // Add missing slug column to states table
    console.log('📝 Adding slug column to states table...');
    const { error: slugError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE states ADD COLUMN IF NOT EXISTS slug VARCHAR(50) UNIQUE;'
    });
    
    if (slugError) {
      console.log('❌ Could not add slug column:', slugError.message);
      console.log('\n🚨 You need to run the full migration manually in Supabase.');
      console.log('💡 Use the VS Code extension or Supabase dashboard SQL Editor.');
      return;
    }
    
    console.log('✅ Slug column added successfully');
    
    // Now try to seed the states
    console.log('\n🌱 Seeding states with legal data...');
    
    const states = [
      {
        name: 'Texas',
        abbreviation: 'TX', 
        slug: 'texas',
        dui_laws: {
          terminology: 'DWI',
          admin_hearing_deadline_days: 15,
          enhanced_bac_threshold: 0.15
        }
      },
      {
        name: 'Arizona',
        abbreviation: 'AZ',
        slug: 'arizona', 
        dui_laws: {
          terminology: 'DUI',
          admin_hearing_deadline_days: 15,
          enhanced_bac_threshold: 0.15
        }
      }
    ];
    
    for (const state of states) {
      const { data, error } = await supabase
        .from('states')
        .upsert(state, { onConflict: 'abbreviation' })
        .select();
        
      if (error) {
        console.log(`❌ Error seeding ${state.name}:`, error.message);
      } else {
        console.log(`✅ ${state.name} seeded successfully`);
      }
    }
    
  } catch (error) {
    console.log('❌ Migration fix failed:', error);
    console.log('\n📝 Please run the full migration manually:');
    console.log('1. Open Supabase Dashboard');
    console.log('2. Go to SQL Editor'); 
    console.log('3. Paste the migration from migrations/001_dui_content_tables.sql');
    console.log('4. Run it');
  }
}

fixMigration();
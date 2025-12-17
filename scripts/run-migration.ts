import { readFileSync } from 'fs';
import { join } from 'path';

async function showMigration(migrationFile: string) {
  console.log(`🚀 Migration SQL for: ${migrationFile}`);

  try {
    // Read the migration file
    const migrationPath = join(process.cwd(), 'migrations', migrationFile);
    const sql = readFileSync(migrationPath, 'utf8');

    console.log('\n📋 COPY AND PASTE THIS SQL INTO SUPABASE SQL EDITOR:');
    console.log('═'.repeat(80));
    console.log(sql);
    console.log('═'.repeat(80));
    
    console.log('\n📝 Steps:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project');  
    console.log('3. Go to SQL Editor');
    console.log('4. Paste the SQL above and run it');
    console.log('5. Then run: npm run seed:knowledge-base');

  } catch (error) {
    console.error(`❌ Could not read migration file:`, error);
    throw error;
  }
}

// Run specific migration
const migrationFile = process.argv[2] || '003_knowledge_base.sql';

showMigration(migrationFile);
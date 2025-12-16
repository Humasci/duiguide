import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  dui_laws: {
    terminology: string;
    bac_limit: number;
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

const STATES: StateData[] = [
  {
    name: 'Texas',
    abbreviation: 'TX',
    slug: 'texas',
    dui_laws: {
      terminology: 'DWI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 15,
      enhanced_bac_threshold: 0.15,
      lookback_years: 10,
      penalties_by_offense: {
        first_offense: 'Up to 180 days jail, $2,000 fine, 90-day license suspension',
        second_offense: '30 days to 1 year jail, $4,000 fine, 180-day license suspension',
        felony_threshold: 'Third offense or DWI with child passenger'
      }
    }
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    slug: 'arizona',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 15,
      enhanced_bac_threshold: 0.15,
      lookback_years: 7,
      penalties_by_offense: {
        first_offense: '10 days jail minimum, $1,250+ fine, 90-day license suspension',
        second_offense: '90 days jail minimum, $3,000+ fine, 1-year license suspension',
        felony_threshold: 'Third offense within 84 months'
      }
    }
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    slug: 'georgia',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      enhanced_bac_threshold: 0.15,
      lookback_years: 10,
      penalties_by_offense: {
        first_offense: 'Up to 1 year jail, $1,000 fine, 1-year license suspension',
        second_offense: '90 days to 1 year jail, $3,000 fine, 3-year license suspension',
        felony_threshold: 'Third offense within 10 years'
      }
    }
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    slug: 'colorado',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 7,
      enhanced_bac_threshold: 0.15,
      lookback_years: 10,
      penalties_by_offense: {
        first_offense: '5 days to 1 year jail, $600-$1,000 fine, 9-month license suspension',
        second_offense: '10 days to 1 year jail, $1,500 fine, 1-year license suspension',
        felony_threshold: 'Third offense or DUI with serious bodily injury'
      }
    }
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    slug: 'north-carolina',
    dui_laws: {
      terminology: 'DWI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      enhanced_bac_threshold: 0.15,
      lookback_years: 7,
      penalties_by_offense: {
        first_offense: 'Up to 2 years jail, $4,000 fine, 1-year license suspension',
        second_offense: '7 days to 2 years jail, $2,000 fine, 4-year license suspension',
        felony_threshold: 'Habitual DWI (3+ convictions)'
      }
    }
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    slug: 'ohio',
    dui_laws: {
      terminology: 'OVI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      enhanced_bac_threshold: 0.17,
      lookback_years: 10,
      penalties_by_offense: {
        first_offense: '3 days to 6 months jail, $375-$1,075 fine, 1-year license suspension',
        second_offense: '10 days to 6 months jail, $525-$1,625 fine, 1-year license suspension',
        felony_threshold: 'Third offense within 10 years'
      }
    }
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    slug: 'tennessee',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 20,
      enhanced_bac_threshold: 0.20,
      lookback_years: 10,
      penalties_by_offense: {
        first_offense: '48 hours to 11 months jail, $350-$1,500 fine, 1-year license suspension',
        second_offense: '45 days to 11 months jail, $600-$3,500 fine, 2-year license suspension',
        felony_threshold: 'Third offense within 10 years'
      }
    }
  }
];

async function main() {
  console.log('🚀 Seeding states...\n');
  
  try {
    for (const state of STATES) {
      const { data, error } = await supabase
        .from('states')
        .upsert(state, { onConflict: 'abbreviation' })
        .select();
      
      if (error) {
        console.error(`❌ Error seeding ${state.name}:`, error.message);
        continue;
      }
      
      console.log(`✅ ${state.name} (${state.abbreviation})`);
    }
    
    console.log('\n🎉 All states seeded successfully!');
    
    // Verify the data
    const { data: states, error } = await supabase
      .from('states')
      .select('name, abbreviation')
      .order('name');
    
    if (!error && states) {
      console.log('\n📋 Current states in database:');
      states.forEach(s => console.log(`   ${s.name} (${s.abbreviation})`));
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
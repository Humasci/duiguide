import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STATES = [
  {
    name: 'Texas',
    abbreviation: 'TX',
    dui_laws: {
      terminology: 'DWI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 15,
      penalties_by_offense: {
        first: { 
          jail: 'Up to 180 days', 
          fine: 'Up to $2,000', 
          license_suspension: '90 days to 1 year' 
        },
        second: { 
          jail: '30 days to 1 year', 
          fine: 'Up to $4,000', 
          license_suspension: '180 days to 2 years' 
        }
      },
      enhanced_bac_threshold: 0.15,
      lookback_years: 10
    }
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 15,
      penalties_by_offense: {
        first: { 
          jail: '10 days minimum', 
          fine: '$1,250+ minimum', 
          license_suspension: '90 days' 
        },
        second: { 
          jail: '90 days minimum', 
          fine: '$3,000+ minimum', 
          license_suspension: '1 year' 
        }
      },
      enhanced_bac_threshold: 0.15,
      lookback_years: 7
    }
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      penalties_by_offense: {
        first: { 
          jail: 'Up to 1 year', 
          fine: '$1,000 maximum', 
          license_suspension: '1 year' 
        },
        second: { 
          jail: '90 days to 1 year', 
          fine: '$3,000 maximum', 
          license_suspension: '3 years' 
        }
      },
      enhanced_bac_threshold: 0.15,
      lookback_years: 10
    }
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 7,
      penalties_by_offense: {
        first: { 
          jail: '5 days to 1 year', 
          fine: '$600 to $1,000', 
          license_suspension: '9 months' 
        },
        second: { 
          jail: '10 days to 1 year', 
          fine: '$1,500 maximum', 
          license_suspension: '1 year' 
        }
      },
      enhanced_bac_threshold: 0.15,
      lookback_years: 10
    }
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    dui_laws: {
      terminology: 'DWI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      penalties_by_offense: {
        first: { 
          jail: 'Up to 2 years', 
          fine: '$4,000 maximum', 
          license_suspension: '1 year' 
        },
        second: { 
          jail: '7 days to 2 years', 
          fine: '$2,000 maximum', 
          license_suspension: '4 years' 
        }
      },
      enhanced_bac_threshold: 0.15,
      lookback_years: 7
    }
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    dui_laws: {
      terminology: 'OVI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 30,
      penalties_by_offense: {
        first: { 
          jail: '3 days to 6 months', 
          fine: '$375 to $1,075', 
          license_suspension: '1 year' 
        },
        second: { 
          jail: '10 days to 6 months', 
          fine: '$525 to $1,625', 
          license_suspension: '1 year' 
        }
      },
      enhanced_bac_threshold: 0.17,
      lookback_years: 10
    }
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    dui_laws: {
      terminology: 'DUI',
      bac_limit: 0.08,
      admin_hearing_deadline_days: 20,
      penalties_by_offense: {
        first: { 
          jail: '48 hours to 11 months', 
          fine: '$350 to $1,500', 
          license_suspension: '1 year' 
        },
        second: { 
          jail: '45 days to 11 months', 
          fine: '$600 to $3,500', 
          license_suspension: '2 years' 
        }
      },
      enhanced_bac_threshold: 0.20,
      lookback_years: 10
    }
  }
];

async function main() {
  console.log('🌟 Seeding states from implementation brief...\n');
  
  try {
    let successCount = 0;
    
    for (const state of STATES) {
      const { data, error } = await supabase
        .from('states')
        .upsert(state, { onConflict: 'abbreviation' })
        .select();
      
      if (error) {
        console.error(`❌ ${state.name}: ${error.message}`);
        continue;
      }
      
      console.log(`✅ ${state.name} (${state.abbreviation}) - ${state.dui_laws.admin_hearing_deadline_days} day deadline`);
      successCount++;
    }
    
    console.log(`\n🎉 Successfully seeded ${successCount}/${STATES.length} states!`);
    
    // Verify the data
    const { data: states, error } = await supabase
      .from('states')
      .select('name, abbreviation, dui_laws')
      .order('name');
    
    if (!error && states) {
      console.log('\n📊 Current states with deadline info:');
      states.forEach(s => {
        const deadline = s.dui_laws?.admin_hearing_deadline_days;
        const terminology = s.dui_laws?.terminology;
        console.log(`   ${s.name}: ${terminology} - ${deadline} days`);
      });
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
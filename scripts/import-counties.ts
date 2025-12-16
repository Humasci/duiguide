import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface CountyData {
  name: string;
  state: string;
  population: number;
  court_name: string;
  court_address: string;
  court_phone: string;
  typical_bail_range: string;
  tier: number; // 1=custom, 2=semi-custom, 3=template
  priority_score: number;
}

const TOP_COUNTIES: CountyData[] = [
  // Texas Counties
  {
    name: 'Harris County',
    state: 'TX',
    population: 4731145,
    court_name: 'Harris County Criminal Courthouse',
    court_address: '1201 Franklin St, Houston, TX 77002',
    court_phone: '(713) 755-6405',
    typical_bail_range: '$500-$5,000',
    tier: 1,
    priority_score: 100
  },
  {
    name: 'Dallas County',
    state: 'TX',
    population: 2613539,
    court_name: 'George Allen Courts Building',
    court_address: '600 Commerce St, Dallas, TX 75202',
    court_phone: '(214) 653-7811',
    typical_bail_range: '$500-$5,000',
    tier: 1,
    priority_score: 95
  },
  {
    name: 'Tarrant County',
    state: 'TX',
    population: 2110640,
    court_name: 'Tarrant County Criminal District Courts',
    court_address: '401 W Belknap St, Fort Worth, TX 76196',
    court_phone: '(817) 884-1111',
    typical_bail_range: '$500-$3,000',
    tier: 1,
    priority_score: 90
  },
  {
    name: 'Bexar County',
    state: 'TX',
    population: 2009324,
    court_name: 'Bexar County Courthouse',
    court_address: '100 Dolorosa St, San Antonio, TX 78205',
    court_phone: '(210) 335-2011',
    typical_bail_range: '$500-$4,000',
    tier: 1,
    priority_score: 85
  },
  {
    name: 'Travis County',
    state: 'TX',
    population: 1290188,
    court_name: 'Travis County Courthouse',
    court_address: '1000 Guadalupe St, Austin, TX 78701',
    court_phone: '(512) 854-9473',
    typical_bail_range: '$750-$5,000',
    tier: 1,
    priority_score: 80
  },
  
  // Arizona Counties
  {
    name: 'Maricopa County',
    state: 'AZ',
    population: 4485414,
    court_name: 'Maricopa County Superior Court',
    court_address: '620 W Jackson St, Phoenix, AZ 85003',
    court_phone: '(602) 506-3204',
    typical_bail_range: '$1,000-$10,000',
    tier: 1,
    priority_score: 98
  },
  {
    name: 'Pima County',
    state: 'AZ',
    population: 1043433,
    court_name: 'Pima County Superior Court',
    court_address: '110 W Congress St, Tucson, AZ 85701',
    court_phone: '(520) 724-3171',
    typical_bail_range: '$500-$7,500',
    tier: 1,
    priority_score: 75
  },
  {
    name: 'Pinal County',
    state: 'AZ',
    population: 425264,
    court_name: 'Pinal County Superior Court',
    court_address: '971 Jason Lopez Cir, Florence, AZ 85132',
    court_phone: '(520) 866-5425',
    typical_bail_range: '$500-$5,000',
    tier: 2,
    priority_score: 60
  },
  
  // Georgia Counties
  {
    name: 'Fulton County',
    state: 'GA',
    population: 1066710,
    court_name: 'Fulton County Superior Court',
    court_address: '136 Pryor St SW, Atlanta, GA 30303',
    court_phone: '(404) 612-4193',
    typical_bail_range: '$1,000-$15,000',
    tier: 1,
    priority_score: 88
  },
  {
    name: 'Gwinnett County',
    state: 'GA',
    population: 957062,
    court_name: 'Gwinnett County Courthouse',
    court_address: '75 Langley Dr, Lawrenceville, GA 30046',
    court_phone: '(770) 822-8100',
    typical_bail_range: '$500-$10,000',
    tier: 1,
    priority_score: 83
  },
  {
    name: 'Cobb County',
    state: 'GA',
    population: 766149,
    court_name: 'Cobb County Superior Court',
    court_address: '70 Haynes St SE, Marietta, GA 30090',
    court_phone: '(770) 528-1300',
    typical_bail_range: '$500-$8,000',
    tier: 1,
    priority_score: 78
  },
  
  // Colorado Counties
  {
    name: 'Denver County',
    state: 'CO',
    population: 715522,
    court_name: 'Denver County Court',
    court_address: '1437 Bannock St, Denver, CO 80202',
    court_phone: '(720) 337-0435',
    typical_bail_range: '$1,000-$20,000',
    tier: 1,
    priority_score: 86
  },
  {
    name: 'El Paso County',
    state: 'CO',
    population: 730395,
    court_name: 'El Paso County Combined Court',
    court_address: '270 S Tejon St, Colorado Springs, CO 80903',
    court_phone: '(719) 452-5000',
    typical_bail_range: '$500-$15,000',
    tier: 1,
    priority_score: 82
  },
  {
    name: 'Arapahoe County',
    state: 'CO',
    population: 655070,
    court_name: 'Arapahoe County District Court',
    court_address: '7325 S Potomac St, Centennial, CO 80112',
    court_phone: '(303) 649-6355',
    typical_bail_range: '$750-$12,000',
    tier: 1,
    priority_score: 77
  },
  
  // North Carolina Counties
  {
    name: 'Mecklenburg County',
    state: 'NC',
    population: 1115482,
    court_name: 'Mecklenburg County Courthouse',
    court_address: '832 E 4th St, Charlotte, NC 28202',
    court_phone: '(704) 686-0950',
    typical_bail_range: '$500-$10,000',
    tier: 1,
    priority_score: 89
  },
  {
    name: 'Wake County',
    state: 'NC',
    population: 1129410,
    court_name: 'Wake County Justice Center',
    court_address: '301 S McDowell St, Raleigh, NC 27601',
    court_phone: '(919) 792-4000',
    typical_bail_range: '$500-$12,000',
    tier: 1,
    priority_score: 91
  },
  {
    name: 'Guilford County',
    state: 'NC',
    population: 541299,
    court_name: 'Guilford County Courthouse',
    court_address: '201 S Eugene St, Greensboro, NC 27401',
    court_phone: '(336) 412-7700',
    typical_bail_range: '$300-$8,000',
    tier: 1,
    priority_score: 74
  },
  
  // Ohio Counties
  {
    name: 'Cuyahoga County',
    state: 'OH',
    population: 1264817,
    court_name: 'Cuyahoga County Court of Common Pleas',
    court_address: '1200 Ontario St, Cleveland, OH 44113',
    court_phone: '(216) 443-8560',
    typical_bail_range: '$500-$15,000',
    tier: 1,
    priority_score: 87
  },
  {
    name: 'Franklin County',
    state: 'OH',
    population: 1323807,
    court_name: 'Franklin County Municipal Court',
    court_address: '375 S High St, Columbus, OH 43215',
    court_phone: '(614) 645-7877',
    typical_bail_range: '$500-$12,000',
    tier: 1,
    priority_score: 92
  },
  {
    name: 'Hamilton County',
    state: 'OH',
    population: 830639,
    court_name: 'Hamilton County Court of Common Pleas',
    court_address: '1000 Main St, Cincinnati, OH 45202',
    court_phone: '(513) 946-5678',
    typical_bail_range: '$500-$10,000',
    tier: 1,
    priority_score: 81
  },
  
  // Tennessee Counties
  {
    name: 'Davidson County',
    state: 'TN',
    population: 695622,
    court_name: 'Davidson County General Sessions Court',
    court_address: '408 2nd Ave N, Nashville, TN 37201',
    court_phone: '(615) 862-5601',
    typical_bail_range: '$500-$10,000',
    tier: 1,
    priority_score: 84
  },
  {
    name: 'Shelby County',
    state: 'TN',
    population: 929744,
    court_name: 'Shelby County Criminal Court',
    court_address: '201 Poplar Ave, Memphis, TN 38103',
    court_phone: '(901) 222-2000',
    typical_bail_range: '$500-$8,000',
    tier: 1,
    priority_score: 85
  },
  {
    name: 'Knox County',
    state: 'TN',
    population: 478971,
    court_name: 'Knox County General Sessions Court',
    court_address: '400 Main St, Knoxville, TN 37902',
    court_phone: '(865) 215-2379',
    typical_bail_range: '$300-$6,000',
    tier: 1,
    priority_score: 73
  }
];

async function main() {
  console.log('🚀 Importing top counties...\n');
  
  try {
    // First, get all states to map abbreviations to IDs
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, abbreviation');
    
    if (statesError) {
      throw new Error(`Failed to fetch states: ${statesError.message}`);
    }
    
    const stateMap = new Map(states.map(s => [s.abbreviation, s.id]));
    
    let totalImported = 0;
    
    for (const county of TOP_COUNTIES) {
      const stateId = stateMap.get(county.state);
      
      if (!stateId) {
        console.error(`❌ State ${county.state} not found for ${county.name}`);
        continue;
      }
      
      const slug = county.name
        .toLowerCase()
        .replace(' county', '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const countyData = {
        state_id: stateId,
        name: county.name,
        slug: slug,
        population: county.population,
        court_name: county.court_name,
        court_address: county.court_address,
        court_phone: county.court_phone,
        typical_bail_range: county.typical_bail_range,
        tier: county.tier,
        priority_score: county.priority_score,
        is_active: true
      };
      
      const { data, error } = await supabase
        .from('counties')
        .upsert(countyData, { onConflict: 'state_id,slug' })
        .select();
      
      if (error) {
        console.error(`❌ Error importing ${county.name}:`, error.message);
        continue;
      }
      
      console.log(`✅ ${county.name}, ${county.state} (Tier ${county.tier})`);
      totalImported++;
    }
    
    console.log(`\n🎉 Successfully imported ${totalImported}/${TOP_COUNTIES.length} counties!`);
    
    // Show summary by state
    const { data: summary } = await supabase
      .from('counties')
      .select('state_id, states(abbreviation)')
      .not('state_id', 'is', null);
    
    if (summary) {
      const countByState = summary.reduce((acc: Record<string, number>, curr) => {
        const state = curr.states?.abbreviation;
        if (state) acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\n📊 Counties by state:');
      Object.entries(countByState).forEach(([state, count]) => {
        console.log(`   ${state}: ${count} counties`);
      });
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
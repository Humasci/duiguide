import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TOP_COUNTIES = [
  // Texas Counties
  {
    name: 'Harris County',
    state: 'TX',
    population: 4731145,
    court_name: 'Harris County Criminal Courthouse',
    court_address: '1201 Franklin St',
    court_city: 'Houston',
    court_zip: '77002',
    court_phone: '(713) 755-6405',
    court_lat: 29.7604,
    court_lng: -95.3698,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Dallas County',
    state: 'TX',
    population: 2613539,
    court_name: 'George Allen Courts Building',
    court_address: '600 Commerce St',
    court_city: 'Dallas',
    court_zip: '75202',
    court_phone: '(214) 653-7811',
    court_lat: 32.7767,
    court_lng: -96.7970,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Tarrant County',
    state: 'TX',
    population: 2110640,
    court_name: 'Tarrant County Criminal District Courts',
    court_address: '401 W Belknap St',
    court_city: 'Fort Worth',
    court_zip: '76196',
    court_phone: '(817) 884-1111',
    court_lat: 32.7555,
    court_lng: -97.3308,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Bexar County',
    state: 'TX',
    population: 2009324,
    court_name: 'Bexar County Courthouse',
    court_address: '100 Dolorosa St',
    court_city: 'San Antonio',
    court_zip: '78205',
    court_phone: '(210) 335-2011',
    court_lat: 29.4241,
    court_lng: -98.4936,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Travis County',
    state: 'TX',
    population: 1290188,
    court_name: 'Travis County Courthouse',
    court_address: '1000 Guadalupe St',
    court_city: 'Austin',
    court_zip: '78701',
    court_phone: '(512) 854-9473',
    court_lat: 30.2672,
    court_lng: -97.7431,
    typical_bail_range: '$1,000-$7,500'
  },

  // Arizona Counties  
  {
    name: 'Maricopa County',
    state: 'AZ',
    population: 4485414,
    court_name: 'Maricopa County Superior Court',
    court_address: '620 W Jackson St',
    court_city: 'Phoenix',
    court_zip: '85003',
    court_phone: '(602) 506-3204',
    court_lat: 33.4484,
    court_lng: -112.0740,
    typical_bail_range: '$1,000-$10,000'
  },
  {
    name: 'Pima County',
    state: 'AZ',
    population: 1043433,
    court_name: 'Pima County Superior Court',
    court_address: '110 W Congress St',
    court_city: 'Tucson',
    court_zip: '85701',
    court_phone: '(520) 724-3255',
    court_lat: 32.2217,
    court_lng: -110.9265,
    typical_bail_range: '$1,000-$7,500'
  },
  {
    name: 'Pinal County',
    state: 'AZ',
    population: 425264,
    court_name: 'Pinal County Superior Court',
    court_address: '971 Jason Lopez Cir',
    court_city: 'Florence',
    court_zip: '85132',
    court_phone: '(520) 866-5425',
    court_lat: 33.0318,
    court_lng: -111.3873,
    typical_bail_range: '$1,000-$5,000'
  },

  // Georgia Counties
  {
    name: 'Fulton County',
    state: 'GA',
    population: 1063937,
    court_name: 'Fulton County Courthouse',
    court_address: '136 Pryor St SW',
    court_city: 'Atlanta',
    court_zip: '30303',
    court_phone: '(404) 613-5318',
    court_lat: 33.7490,
    court_lng: -84.3880,
    typical_bail_range: '$1,000-$5,000'
  },
  {
    name: 'Gwinnett County',
    state: 'GA',
    population: 957062,
    court_name: 'Gwinnett County Courthouse',
    court_address: '75 Langley Dr',
    court_city: 'Lawrenceville',
    court_zip: '30046',
    court_phone: '(770) 822-8100',
    court_lat: 33.9562,
    court_lng: -83.9880,
    typical_bail_range: '$1,000-$5,000'
  },
  {
    name: 'Cobb County',
    state: 'GA',
    population: 760141,
    court_name: 'Cobb County Superior Court',
    court_address: '70 Haynes St',
    court_city: 'Marietta',
    court_zip: '30060',
    court_phone: '(770) 528-1300',
    court_lat: 33.9526,
    court_lng: -84.5499,
    typical_bail_range: '$1,000-$5,000'
  },

  // Colorado Counties
  {
    name: 'Denver County',
    state: 'CO',
    population: 715522,
    court_name: 'Lindsey-Flanigan Courthouse',
    court_address: '520 W Colfax Ave',
    court_city: 'Denver',
    court_zip: '80204',
    court_phone: '(720) 913-8300',
    court_lat: 39.7392,
    court_lng: -105.0178,
    typical_bail_range: '$1,000-$10,000'
  },
  {
    name: 'El Paso County',
    state: 'CO',
    population: 730395,
    court_name: 'El Paso County Judicial Building',
    court_address: '270 S Tejon St',
    court_city: 'Colorado Springs',
    court_zip: '80903',
    court_phone: '(719) 452-5000',
    court_lat: 38.8339,
    court_lng: -104.8214,
    typical_bail_range: '$1,000-$7,500'
  },
  {
    name: 'Arapahoe County',
    state: 'CO',
    population: 655070,
    court_name: 'Arapahoe County Justice Center',
    court_address: '7325 S Potomac St',
    court_city: 'Centennial',
    court_zip: '80112',
    court_phone: '(720) 874-8500',
    court_lat: 39.5807,
    court_lng: -104.8597,
    typical_bail_range: '$1,000-$7,500'
  },

  // North Carolina Counties
  {
    name: 'Mecklenburg County',
    state: 'NC',
    population: 1115482,
    court_name: 'Mecklenburg County Courthouse',
    court_address: '832 E 4th St',
    court_city: 'Charlotte',
    court_zip: '28202',
    court_phone: '(704) 686-0900',
    court_lat: 35.2271,
    court_lng: -80.8431,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Wake County',
    state: 'NC',
    population: 1129410,
    court_name: 'Wake County Justice Center',
    court_address: '301 S McDowell St',
    court_city: 'Raleigh',
    court_zip: '27601',
    court_phone: '(919) 792-4000',
    court_lat: 35.7796,
    court_lng: -78.6382,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Guilford County',
    state: 'NC',
    population: 541299,
    court_name: 'Guilford County Courthouse',
    court_address: '201 S Eugene St',
    court_city: 'Greensboro',
    court_zip: '27401',
    court_phone: '(336) 412-7900',
    court_lat: 36.0726,
    court_lng: -79.7919,
    typical_bail_range: '$500-$3,000'
  },

  // Ohio Counties
  {
    name: 'Cuyahoga County',
    state: 'OH',
    population: 1264817,
    court_name: 'Cuyahoga County Common Pleas Court',
    court_address: '1200 Ontario St',
    court_city: 'Cleveland',
    court_zip: '44113',
    court_phone: '(216) 443-8560',
    court_lat: 41.4993,
    court_lng: -81.6944,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Franklin County',
    state: 'OH',
    population: 1326063,
    court_name: 'Franklin County Municipal Court',
    court_address: '375 S High St',
    court_city: 'Columbus',
    court_zip: '43215',
    court_phone: '(614) 645-8214',
    court_lat: 39.9612,
    court_lng: -82.9988,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Hamilton County',
    state: 'OH',
    population: 830639,
    court_name: 'Hamilton County Courthouse',
    court_address: '1000 Main St',
    court_city: 'Cincinnati',
    court_zip: '45202',
    court_phone: '(513) 946-5000',
    court_lat: 39.1031,
    court_lng: -84.5120,
    typical_bail_range: '$500-$5,000'
  },

  // Tennessee Counties
  {
    name: 'Davidson County',
    state: 'TN',
    population: 715884,
    court_name: 'A.A. Birch Building',
    court_address: '408 2nd Ave N',
    court_city: 'Nashville',
    court_zip: '37201',
    court_phone: '(615) 862-5601',
    court_lat: 36.1627,
    court_lng: -86.7816,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Shelby County',
    state: 'TN',
    population: 927644,
    court_name: 'Shelby County Criminal Justice Center',
    court_address: '201 Poplar Ave',
    court_city: 'Memphis',
    court_zip: '38103',
    court_phone: '(901) 222-2300',
    court_lat: 35.1495,
    court_lng: -90.0490,
    typical_bail_range: '$500-$5,000'
  },
  {
    name: 'Knox County',
    state: 'TN',
    population: 478971,
    court_name: 'Knox County Courthouse',
    court_address: '400 Main St',
    court_city: 'Knoxville',
    court_zip: '37902',
    court_phone: '(865) 215-2379',
    court_lat: 35.9606,
    court_lng: -83.9207,
    typical_bail_range: '$500-$3,000'
  }
];

async function main() {
  console.log('🏛️ Importing top counties from implementation brief...\n');
  
  try {
    let successCount = 0;
    
    for (const county of TOP_COUNTIES) {
      // Get state ID
      const { data: state, error: stateError } = await supabase
        .from('states')
        .select('id')
        .eq('abbreviation', county.state)
        .single();
      
      if (stateError || !state) {
        console.error(`❌ State ${county.state} not found for ${county.name}`);
        continue;
      }
      
      // Create slug
      const slug = county.name
        .toLowerCase()
        .replace(' county', '')
        .replace(/\s+/g, '-');
      
      // Upsert county
      const { data, error } = await supabase
        .from('counties')
        .upsert({
          state_id: state.id,
          name: county.name,
          slug: slug,
          population: county.population,
          court_name: county.court_name,
          court_address: county.court_address,
          court_city: county.court_city,
          court_zip: county.court_zip,
          court_phone: county.court_phone,
          court_lat: county.court_lat,
          court_lng: county.court_lng,
          typical_bail_range: county.typical_bail_range
        }, { onConflict: 'id' })
        .select();
      
      if (error) {
        console.error(`❌ ${county.name}: ${error.message}`);
        continue;
      }
      
      console.log(`✅ ${county.name}, ${county.state} (/${county.state.toLowerCase()}/${slug})`);
      successCount++;
    }
    
    console.log(`\n🎉 Successfully imported ${successCount}/${TOP_COUNTIES.length} counties!`);
    
    // Show summary by state
    const { data: summary } = await supabase
      .from('counties')
      .select(`
        name,
        state:states(name, abbreviation)
      `)
      .order('state_id');
    
    if (summary) {
      const byState: { [key: string]: string[] } = {};
      summary.forEach(c => {
        const stateData = Array.isArray(c.state) ? c.state[0] : c.state;
        const stateKey = stateData.abbreviation;
        if (!byState[stateKey]) byState[stateKey] = [];
        byState[stateKey].push(c.name);
      });
      
      console.log('\n📊 Counties by state:');
      Object.entries(byState).forEach(([state, counties]) => {
        console.log(`   ${state}: ${counties.length} counties`);
      });
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

main();
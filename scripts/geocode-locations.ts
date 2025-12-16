import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
    place_id: string;
  }[];
  status: string;
}

interface CountyToGeocode {
  id: number;
  name: string;
  court_address?: string;
  latitude?: number;
  longitude?: number;
  states: {
    name: string;
    abbreviation: string;
  };
}

async function geocodeAddress(address: string, countyName: string, stateName: string): Promise<{lat: number, lng: number} | null> {
  if (!process.env.GOOGLE_GEOCODING_API_KEY) {
    console.error('❌ GOOGLE_GEOCODING_API_KEY environment variable is required');
    return null;
  }
  
  try {
    // Build comprehensive address for better accuracy
    const fullAddress = address.includes(stateName) 
      ? address
      : `${address}, ${countyName}, ${stateName}`;
    
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
    
    console.log(`🗺️  Geocoding: ${fullAddress}`);
    
    const response = await fetch(url);
    const data: GeocodeResponse = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(`   ✅ Found: ${location.lat}, ${location.lng}`);
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else if (data.status === 'ZERO_RESULTS') {
      console.log(`   ⚠️  No results for: ${fullAddress}`);
      
      // Fallback: Try just county + state
      const fallbackAddress = `${countyName}, ${stateName}`;
      const fallbackUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fallbackAddress)}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
      
      const fallbackResponse = await fetch(fallbackUrl);
      const fallbackData: GeocodeResponse = await fallbackResponse.json();
      
      if (fallbackData.status === 'OK' && fallbackData.results.length > 0) {
        const location = fallbackData.results[0].geometry.location;
        console.log(`   ✅ Fallback found: ${location.lat}, ${location.lng}`);
        return {
          lat: location.lat,
          lng: location.lng
        };
      }
      
      return null;
    } else {
      console.error(`   ❌ Geocoding error: ${data.status}`);
      return null;
    }
    
  } catch (error) {
    console.error(`   ❌ Geocoding failed: ${error}`);
    return null;
  }
}

async function geocodeCounty(county: CountyToGeocode): Promise<boolean> {
  // Skip if already geocoded
  if (county.latitude && county.longitude) {
    console.log(`⏭️  Skipping ${county.name} (already geocoded)`);
    return true;
  }
  
  let address = county.court_address;
  
  // If no court address, use county name + state
  if (!address) {
    address = `${county.name}, ${county.states.name}`;
  }
  
  const coordinates = await geocodeAddress(address, county.name, county.states.name);
  
  if (!coordinates) {
    console.log(`   ❌ Failed to geocode ${county.name}`);
    return false;
  }
  
  // Update database
  try {
    const { error } = await supabase
      .from('counties')
      .update({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        updated_at: new Date().toISOString()
      })
      .eq('id', county.id);
    
    if (error) {
      console.error(`   ❌ Database error: ${error.message}`);
      return false;
    }
    
    console.log(`   ✅ Updated ${county.name} coordinates`);
    return true;
    
  } catch (dbError) {
    console.error(`   ❌ Database operation failed: ${dbError}`);
    return false;
  }
}

async function main() {
  console.log('🗺️  Starting location geocoding...\n');
  
  if (!process.env.GOOGLE_GEOCODING_API_KEY) {
    console.error('❌ Missing GOOGLE_GEOCODING_API_KEY environment variable');
    console.log('\n📝 To get a Google Geocoding API key:');
    console.log('1. Go to Google Cloud Console (https://console.cloud.google.com/)');
    console.log('2. Create a new project or select existing');
    console.log('3. Enable the Geocoding API');
    console.log('4. Create credentials → API Key');
    console.log('5. Add to .env.local: GOOGLE_GEOCODING_API_KEY=your_key_here');
    process.exit(1);
  }
  
  const args = process.argv.slice(2);
  const stateFilter = args.find(arg => arg.startsWith('--state='))?.split('=')[1];
  const limitArg = args.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
  const forceArg = args.includes('--force');
  
  try {
    // Build query
    let query = supabase
      .from('counties')
      .select('id, name, court_address, latitude, longitude, states(name, abbreviation)')
      .eq('is_active', true)
      .order('priority_score', { ascending: false });
    
    if (stateFilter) {
      query = query.eq('states.abbreviation', stateFilter.toUpperCase());
    }
    
    if (!forceArg) {
      // Only geocode counties that haven't been geocoded yet
      query = query.or('latitude.is.null,longitude.is.null');
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data: counties, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch counties: ${error.message}`);
    }
    
    if (!counties || counties.length === 0) {
      console.log('⚠️  No counties found to geocode.');
      if (!forceArg) {
        console.log('💡 Use --force to re-geocode all counties');
      }
      process.exit(0);
    }
    
    console.log(`📊 Found ${counties.length} counties to geocode`);
    if (stateFilter) console.log(`🗺️  State filter: ${stateFilter.toUpperCase()}`);
    if (limit) console.log(`🔢 Limit: ${limit}`);
    console.log('');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const county of counties) {
      const success = await geocodeCounty(county);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Rate limiting - Google allows 50 requests/second, we'll be conservative
      await new Promise(resolve => setTimeout(resolve, 200)); // 5 requests/second
    }
    
    console.log(`\n🎉 Geocoding complete!`);
    console.log(`✅ Successfully geocoded: ${successCount}/${counties.length}`);
    console.log(`❌ Failed: ${failCount}`);
    
    // Show sample of geocoded counties
    const { data: geocodedSample } = await supabase
      .from('counties')
      .select('name, latitude, longitude, states(abbreviation)')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(5);
    
    if (geocodedSample && geocodedSample.length > 0) {
      console.log('\n📍 Sample geocoded locations:');
      geocodedSample.forEach(county => {
        console.log(`   ${county.name}, ${county.states?.abbreviation}: ${county.latitude?.toFixed(4)}, ${county.longitude?.toFixed(4)}`);
      });
    }
    
    // Calculate API costs (rough estimate)
    const apiCost = successCount * 0.005; // $0.005 per request
    console.log(`\n💰 Estimated API cost: $${apiCost.toFixed(3)}`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Show usage
if (process.argv.includes('--help')) {
  console.log('\n🗺️  GEOCODING SCRIPT USAGE:');
  console.log('\nOptions:');
  console.log('  --state=TX        Geocode specific state only');
  console.log('  --limit=10        Limit number of counties');
  console.log('  --force           Re-geocode all counties (ignores existing coordinates)');
  console.log('  --help            Show this help message');
  console.log('\nExamples:');
  console.log('  npm run geocode                    # Geocode all ungeocode counties');
  console.log('  npm run geocode -- --state=TX      # Texas counties only');
  console.log('  npm run geocode -- --limit=5       # First 5 counties');
  console.log('  npm run geocode -- --force         # Re-geocode all counties');
  console.log('');
  process.exit(0);
}

main();
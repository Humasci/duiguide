import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface CourtScrapingTarget {
  state: string;
  counties: {
    name: string;
    search_urls: string[];
    selectors: {
      court_name?: string;
      address?: string;
      phone?: string;
      hours?: string;
      website?: string;
    };
  }[];
}

// Court scraping targets by state
const SCRAPING_TARGETS: CourtScrapingTarget[] = [
  {
    state: 'TX',
    counties: [
      {
        name: 'Harris County',
        search_urls: [
          'https://www.hctx.net/court/criminal',
          'https://www.harriscounty.gov/courts'
        ],
        selectors: {
          court_name: '.court-title, h1, h2',
          address: '.address, .location, .contact-address',
          phone: '.phone, .contact-phone, a[href^="tel:"]',
          hours: '.hours, .schedule, .office-hours'
        }
      },
      {
        name: 'Dallas County',
        search_urls: [
          'https://www.dallascounty.org/courts/',
          'https://www.dcccd.edu/about/leadership/board/meetings/index.aspx'
        ],
        selectors: {
          court_name: '.court-name, h1, h2',
          address: '.address, .contact-info address',
          phone: '.phone, a[href^="tel:"]'
        }
      }
    ]
  },
  {
    state: 'AZ',
    counties: [
      {
        name: 'Maricopa County',
        search_urls: [
          'https://superiorcourt.maricopa.gov/',
          'https://www.maricopa.gov/courts'
        ],
        selectors: {
          court_name: '.court-title, h1',
          address: '.address, .location',
          phone: '.phone, a[href^="tel:"]'
        }
      }
    ]
  }
];

async function scrapeCourtData(url: string, selectors: any): Promise<any> {
  try {
    console.log(`🔍 Scraping: ${url}`);
    
    // Use a simple fetch for now - in production you might want puppeteer
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CourtDataScraper/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const scrapedData: any = {};
    
    // Extract court name
    if (selectors.court_name) {
      const courtName = $(selectors.court_name).first().text().trim();
      if (courtName) scrapedData.court_name = courtName;
    }
    
    // Extract address
    if (selectors.address) {
      const address = $(selectors.address).first().text().trim();
      if (address) scrapedData.address = address;
    }
    
    // Extract phone
    if (selectors.phone) {
      let phone = $(selectors.phone).first().text().trim();
      // Clean phone format
      phone = phone.replace(/[^\d-().\s+]/g, '').trim();
      if (phone) scrapedData.phone = phone;
    }
    
    // Extract hours
    if (selectors.hours) {
      const hours = $(selectors.hours).first().text().trim();
      if (hours) scrapedData.hours = hours;
    }
    
    // Extract website
    scrapedData.website = url;
    
    return scrapedData;
    
  } catch (error) {
    console.error(`❌ Failed to scrape ${url}:`, error);
    return null;
  }
}

async function scrapeCountyCourts(county: any, state: string) {
  console.log(`\n📍 Scraping courts for ${county.name}, ${state}`);
  
  const scrapedData: any[] = [];
  
  for (const url of county.search_urls) {
    const data = await scrapeCourtData(url, county.selectors);
    if (data) {
      scrapedData.push(data);
    }
    
    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Merge data from multiple sources
  const mergedData = scrapedData.reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
      // Prefer longer/more complete values
      court_name: curr.court_name?.length > (acc.court_name?.length || 0) ? curr.court_name : acc.court_name,
      address: curr.address?.length > (acc.address?.length || 0) ? curr.address : acc.address,
      phone: curr.phone?.length > (acc.phone?.length || 0) ? curr.phone : acc.phone,
    };
  }, {});
  
  if (Object.keys(mergedData).length === 0) {
    console.log(`   ⚠️  No data found for ${county.name}`);
    return;
  }
  
  // Update database
  try {
    const { data: existingCounty } = await supabase
      .from('counties')
      .select('id')
      .eq('name', county.name)
      .single();
    
    if (!existingCounty) {
      console.log(`   ⚠️  County ${county.name} not found in database`);
      return;
    }
    
    const { error } = await supabase
      .from('counties')
      .update({
        court_name: mergedData.court_name,
        court_address: mergedData.address,
        court_phone: mergedData.phone,
        court_hours: mergedData.hours,
        court_website: mergedData.website,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingCounty.id);
    
    if (error) {
      console.error(`   ❌ Database error for ${county.name}:`, error);
    } else {
      console.log(`   ✅ Updated ${county.name} court data`);
    }
    
  } catch (dbError) {
    console.error(`   ❌ Database operation failed:`, dbError);
  }
}

async function main() {
  console.log('🏛️  Starting court data scraping...\n');
  
  const args = process.argv.slice(2);
  const stateFilter = args.find(arg => arg.startsWith('--state='))?.split('=')[1];
  
  try {
    const targetsToProcess = stateFilter 
      ? SCRAPING_TARGETS.filter(t => t.state.toLowerCase() === stateFilter.toLowerCase())
      : SCRAPING_TARGETS;
    
    if (targetsToProcess.length === 0) {
      console.log('⚠️  No scraping targets found for the specified filter.');
      process.exit(1);
    }
    
    console.log(`🎯 Processing ${targetsToProcess.length} states`);
    if (stateFilter) console.log(`🗺️  State filter: ${stateFilter.toUpperCase()}`);
    console.log('');
    
    let totalUpdated = 0;
    
    for (const stateTarget of targetsToProcess) {
      console.log(`\n🏛️  Processing ${stateTarget.state} courts...`);
      
      for (const county of stateTarget.counties) {
        await scrapeCountyCourts(county, stateTarget.state);
        totalUpdated++;
      }
    }
    
    console.log(`\n🎉 Court scraping complete!`);
    console.log(`✅ Processed ${totalUpdated} counties`);
    
    // Show what we updated
    const { data: updatedCourts } = await supabase
      .from('counties')
      .select('name, court_name, court_phone, states(abbreviation)')
      .not('court_name', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(10);
    
    if (updatedCourts && updatedCourts.length > 0) {
      console.log('\n📋 Recently updated courts:');
      updatedCourts.forEach(court => {
        const stateData = Array.isArray(court.states) ? court.states[0] : court.states;
        console.log(`   ${court.name}, ${stateData?.abbreviation}: ${court.court_name} | ${court.court_phone || 'No phone'}`);
      });
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Warning about scraping ethics
console.log('⚠️  COURT DATA SCRAPING NOTICE:');
console.log('   This script scrapes publicly available court information.');
console.log('   Please respect robots.txt and rate limits.');
console.log('   Consider using official APIs when available.');
console.log('   Use responsibly and in compliance with terms of service.\n');

main();
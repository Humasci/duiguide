import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Checklist from '@/components/Checklist';
import SimpleMap from '@/components/SimpleMap';
import BuildingsServicesList from '@/components/BuildingsServicesList';
import LeadForm from '@/components/LeadForm';
import FloatingChat from '@/components/FloatingChat';

interface PageProps {
  params: {
    state: string;
    county: string;
  };
}

interface CountyWithState {
  slug: string;
  states: { abbreviation: string } | { abbreviation: string }[];
}

// Generate static paths for all counties
export async function generateStaticParams() {
  const supabase = createClient();
  
  try {
    const { data: counties } = await supabase
      .from('counties')
      .select(`
        slug,
        states!inner(abbreviation)
      `);
    
    return counties?.map((c: CountyWithState) => {
      const stateData = Array.isArray(c.states) ? c.states[0] : c.states;
      return {
        state: stateData?.abbreviation?.toLowerCase() || '',
        county: c.slug || ''
      };
    }) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const supabase = createClient();
  
  try {
    const { data: county } = await supabase
      .from('counties')
      .select(`
        meta_title,
        meta_description,
        name,
        states!inner(name, abbreviation, dui_laws)
      `)
      .eq('slug', params.county)
      .eq('states.abbreviation', params.state.toUpperCase())
      .single();
    
    if (!county) {
      return {
        title: 'County Not Found',
        description: 'The requested county page was not found.'
      };
    }
    
    const stateData = Array.isArray(county.states) ? county.states[0] : county.states;
    const terminology = stateData?.dui_laws?.terminology || 'DUI';
    const defaultTitle = `${terminology} Arrest in ${county.name} - What to Do Immediately`;
    const defaultDescription = `Arrested for ${terminology} in ${county.name}, ${stateData?.name || 'your state'}? Learn critical deadlines, court information, and next steps. Get help now.`;
    
    return {
      title: county.meta_title || defaultTitle,
      description: county.meta_description || defaultDescription,
      keywords: [
        terminology,
        county.name,
        stateData?.name || '',
        'lawyer',
        'attorney',
        'court',
        'arrest',
        'deadline'
      ].join(', '),
      openGraph: {
        title: county.meta_title || defaultTitle,
        description: county.meta_description || defaultDescription,
        type: 'website'
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'DUI Guide',
      description: 'Get help with your DUI case.'
    };
  }
}

export default async function CountyPage({ params }: PageProps) {
  const supabase = createClient();
  
  try {
    // Fetch county data with state and service locations
    const { data: county, error } = await supabase
      .from('counties')
      .select(`
        *,
        states!inner(*),
        locations:building_service_locations(*)
      `)
      .eq('slug', params.county)
      .eq('states.abbreviation', params.state.toUpperCase())
      .single();
    
    if (error || !county) {
      console.error('County not found:', error);
      notFound();
    }

    // Extract state data (handle array response from Supabase)
    const stateData = Array.isArray(county.states) ? county.states[0] : county.states;
    
    // If no content generated yet, show basic page
    if (!county.page_content) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-yellow-800 mb-2">Content Coming Soon</h2>
              <p className="text-yellow-700">
                We&apos;re building comprehensive {stateData?.dui_laws?.terminology || 'DUI'} guidance for {county.name}.
                In the meantime, contact a local attorney immediately if you&apos;ve been arrested.
              </p>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">
              {stateData?.dui_laws?.terminology || 'DUI'} Help in {county.name}, {stateData?.abbreviation || ''}
            </h1>
            
            {county.court_phone && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Court Information:</h3>
                <p>{county.court_name}</p>
                <p>{county.court_address}</p>
                <p>Phone: {county.court_phone}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    const content = county.page_content;
    const deadline = stateData?.dui_laws?.admin_hearing_deadline_days || 10;
    
    // Prepare map data
    const mapCenter = {
      lat: county.court_lat || 39.8283,
      lng: county.court_lng || -98.5795
    };
    
    // Create map markers from service locations
    const mapMarkers = county.locations?.map((loc: { lat: number; lng: number; name: string; type: string }) => ({
      lat: loc.lat,
      lng: loc.lng,
      name: loc.name,
      type: loc.type
    })).filter((marker: { lat: number; lng: number }) => marker.lat && marker.lng) || [];
    
    // Add court as main marker if not in locations
    if (county.court_lat && county.court_lng) {
      mapMarkers.unshift({
        lat: county.court_lat,
        lng: county.court_lng,
        name: county.court_name,
        type: 'court'
      });
    }
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <Hero 
          h1={content.h1}
          deadlineAlert={content.deadline_alert}
          intro={content.intro}
          county={county}
        />
        
        {/* Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{stateData?.dui_laws?.terminology || 'DUI'} Process Timeline</h2>
            <Timeline deadline={deadline} />
          </div>
        </section>
        
        {/* Checklist */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Immediate Action Checklist</h2>
            <Checklist steps={content.immediate_steps || []} />
          </div>
        </section>
        
        {/* Map */}
        {mapMarkers.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Important Locations</h2>
              <SimpleMap 
                center={mapCenter}
                markers={mapMarkers}
              />
            </div>
          </section>
        )}
        
        {/* Buildings & Services */}
        {county.locations && county.locations.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Courts, DMV, & SCRAM Providers</h2>
              <BuildingsServicesList locations={county.locations} />
            </div>
          </section>
        )}
        
        {/* Lead Form */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Get Help Now</h2>
            <p className="text-lg mb-8 text-center">
              Connect with a local {stateData?.dui_laws?.terminology || 'DUI'} attorney in {county.name}
            </p>
            <LeadForm county={county} />
          </div>
        </section>
        
        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faq.map((item: { question: string; answer: string }, i: number) => (
                  <details key={i} className="border border-gray-200 rounded-lg">
                    <summary className="font-semibold p-4 cursor-pointer hover:bg-gray-50 rounded-lg">
                      {item.question}
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Floating Chat */}
        <FloatingChat 
          vapiPhoneNumber={process.env.NEXT_PUBLIC_VAPI_PHONE_NUMBER || "+13312161743"}
          county={county}
        />
        
        {/* Structured Data for SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": `${stateData?.dui_laws?.terminology || 'DUI'} Help in ${county.name}`,
              "description": content.intro,
              "areaServed": {
                "@type": "Place",
                "name": `${county.name}, ${stateData?.name || ''}`
              },
              "serviceType": `${stateData?.dui_laws?.terminology || 'DUI'} Legal Assistance`,
              "provider": {
                "@type": "Organization",
                "name": "DUI Arrested Guide"
              }
            })
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading county page:', error);
    notFound();
  }
}
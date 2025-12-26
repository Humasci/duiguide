import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Checklist from '@/components/Checklist';
import SimpleMap from '@/components/SimpleMap';
import BuildingsServicesList from '@/components/BuildingsServicesList';
import LeadForm from '@/components/LeadForm';
import FloatingChat from '@/components/FloatingChat';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Building, Phone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <div className="min-h-screen bg-background">
          <div className="container max-w-4xl py-16">
            <Card className="bg-accent border-2 border-primary/30 p-8 mb-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1 stroke-[1.5]" />
                <div>
                  <h2 className="font-heading text-2xl font-normal text-foreground mb-2">Content Coming Soon</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We&apos;re building comprehensive {stateData?.dui_laws?.terminology || 'DUI'} guidance for {county.name}.
                    In the meantime, contact a local attorney immediately if you&apos;ve been arrested.
                  </p>
                </div>
              </div>
            </Card>

            <h1 className="font-heading text-4xl md:text-5xl font-normal mb-6 text-foreground">
              {stateData?.dui_laws?.terminology || 'DUI'} Help in {county.name}, {stateData?.abbreviation || ''}
            </h1>

            {county.court_phone && (
              <Card className="p-8 rounded-2xl">
                <h3 className="font-heading text-xl font-normal text-foreground mb-4 flex items-center gap-3">
                  <Building className="h-6 w-6 text-primary stroke-[1.5]" />
                  Court Information
                </h3>
                <p className="text-foreground mb-2">{county.court_name}</p>
                <p className="text-muted-foreground mb-2">{county.court_address}</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary stroke-[1.5]" />
                  {county.court_phone}
                </p>
              </Card>
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
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <Hero
          h1={content.h1}
          deadlineAlert={content.deadline_alert}
          intro={content.intro}
          county={county}
        />

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              {stateData?.dui_laws?.terminology || 'DUI'} Process Timeline
            </h2>
            <Timeline deadline={deadline} />
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" className="py-16 bg-card">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              Immediate Action Checklist
            </h2>
            <Checklist steps={content.immediate_steps || []} />
          </div>
        </section>

        {/* Map */}
        {mapMarkers.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container max-w-4xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
                Important Locations
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border">
                <SimpleMap
                  center={mapCenter}
                  markers={mapMarkers}
                />
              </div>
            </div>
          </section>
        )}

        {/* Buildings & Services */}
        {county.locations && county.locations.length > 0 && (
          <section className="py-16 bg-card">
            <div className="container max-w-4xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
                Courts, DMV, & SCRAM Providers
              </h2>
              <BuildingsServicesList locations={county.locations} />
            </div>
          </section>
        )}

        {/* Lead Form */}
        <section id="get-help" className="py-16 bg-foreground">
          <div className="container max-w-2xl">
            <h2 className="font-heading text-3xl font-normal text-background mb-4 text-center">
              Get Help Now
            </h2>
            <p className="text-lg text-background/80 mb-8 text-center leading-relaxed">
              Connect with a local {stateData?.dui_laws?.terminology || 'DUI'} attorney in {county.name}
            </p>
            <LeadForm county={county} />
          </div>
        </section>

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {content.faq.map((item: { question: string; answer: string }, i: number) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-2xl px-6">
                    <AccordionTrigger className="font-heading text-lg font-normal text-foreground hover:text-primary py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

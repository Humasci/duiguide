import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, MapPin, Phone, Calendar, Scale, Users, FileText } from 'lucide-react';

interface PageProps {
  params: {
    state: string;
    county: string;
  };
}

interface CountyData {
  id: number;
  name: string;
  slug: string;
  population: number;
  court_name: string;
  court_address: string;
  court_phone: string;
  typical_bail_range: string;
  page_content: any;
  meta_title: string;
  meta_description: string;
  states: {
    name: string;
    abbreviation: string;
    slug: string;
    dui_laws: {
      terminology: string;
      admin_hearing_deadline_days: number;
      enhanced_bac_threshold: number;
    };
  };
}

async function getCountyData(stateSlug: string, countySlug: string): Promise<CountyData | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('counties')
    .select(`
      *,
      states (
        name,
        abbreviation,
        slug,
        dui_laws
      )
    `)
    .eq('slug', countySlug)
    .eq('states.slug', stateSlug)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const county = await getCountyData(params.state, params.county);
  
  if (!county) {
    return {
      title: 'County Not Found - DUI Guide',
    };
  }
  
  return {
    title: county.meta_title || `${county.states.dui_laws.terminology} Arrest in ${county.name} - What to Do Next`,
    description: county.meta_description || `Arrested for ${county.states.dui_laws.terminology} in ${county.name}? Get immediate help and learn your rights. ${county.states.dui_laws.admin_hearing_deadline_days} day deadline to request hearing.`,
    openGraph: {
      title: county.meta_title,
      description: county.meta_description,
      type: 'article',
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const county = await getCountyData(params.state, params.county);
  
  if (!county || !county.page_content) {
    notFound();
  }
  
  const { page_content: content, states: state } = county;
  const terminology = state.dui_laws.terminology;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {content.hero?.h1}
            </h1>
            
            {/* Urgent Alert */}
            <div className="bg-red-500/20 border-l-4 border-red-400 p-4 mb-6 rounded-r">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-100 text-lg">
                    {content.hero?.deadline_alert}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {content.hero?.intro}
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Deadline</span>
                </div>
                <p className="text-2xl font-bold">{state.dui_laws.admin_hearing_deadline_days} Days</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Scale className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">Bail Range</span>
                </div>
                <p className="text-lg font-bold">{county.typical_bail_range}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">County</span>
                </div>
                <p className="text-lg font-bold">{county.name}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium">Population</span>
                </div>
                <p className="text-lg font-bold">{county.population?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Immediate Steps */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                Immediate Action Required
              </h2>
              
              <div className="space-y-6">
                {content.immediate_steps?.map((step: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-start space-x-4">
                      <Badge variant="default" className="mt-1 text-lg px-3 py-1">
                        {step.step}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-4">{step.description}</p>
                        
                        {step.action_items && (
                          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                            {step.action_items.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                        
                        {step.local_context && (
                          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-200">
                            <p className="text-sm text-blue-800">
                              <strong>Local Info:</strong> {step.local_context}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Timeline */}
            {content.timeline && (
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500 mr-3" />
                  What Happens When
                </h2>
                
                <div className="space-y-6">
                  {content.timeline.map((phase: any, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-24">
                        <Badge variant="outline" className="text-sm">
                          {phase.timeframe}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <ul className="list-disc list-inside space-y-1 mb-3">
                          {phase.events?.map((event: string, i: number) => (
                            <li key={i} className="text-gray-700">{event}</li>
                          ))}
                        </ul>
                        {phase.county_specific_notes && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {phase.county_specific_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Penalties */}
            {content.penalties_in_county && (
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Scale className="w-8 h-8 text-purple-500 mr-3" />
                  {content.penalties_in_county.title}
                </h2>
                
                {content.penalties_in_county.first_offense && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">First Offense</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {content.penalties_in_county.first_offense.jail_time && (
                        <div>
                          <p className="font-medium text-gray-700">Jail Time</p>
                          <p className="text-lg">{content.penalties_in_county.first_offense.jail_time}</p>
                        </div>
                      )}
                      {content.penalties_in_county.first_offense.fines && (
                        <div>
                          <p className="font-medium text-gray-700">Fines</p>
                          <p className="text-lg">{content.penalties_in_county.first_offense.fines}</p>
                        </div>
                      )}
                    </div>
                    
                    {content.penalties_in_county.first_offense.additional_requirements && (
                      <div className="mt-4">
                        <p className="font-medium text-gray-700 mb-2">Additional Requirements</p>
                        <ul className="list-disc list-inside space-y-1">
                          {content.penalties_in_county.first_offense.additional_requirements.map((req: string, i: number) => (
                            <li key={i} className="text-gray-700">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {content.penalties_in_county.enhanced_penalties && (
                  <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                    <h4 className="font-bold text-yellow-800 mb-2">Enhanced Penalties</h4>
                    <p className="text-yellow-700 mb-2">{content.penalties_in_county.enhanced_penalties.high_bac}</p>
                    {content.penalties_in_county.enhanced_penalties.aggravating_factors && (
                      <ul className="list-disc list-inside text-yellow-700">
                        {content.penalties_in_county.enhanced_penalties.aggravating_factors.map((factor: string, i: number) => (
                          <li key={i}>{factor}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </Card>
            )}
            
            {/* FAQ */}
            {content.faq && (
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <FileText className="w-8 h-8 text-green-500 mr-3" />
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  {content.faq.map((item: any, index: number) => (
                    <div key={index}>
                      <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Court Information */}
            {content.local_resources?.courthouse && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                  Court Information
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{content.local_resources.courthouse.name}</p>
                    <p className="text-gray-600">{content.local_resources.courthouse.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{content.local_resources.courthouse.phone}</span>
                  </div>
                  
                  {content.local_resources.courthouse.hours && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{content.local_resources.courthouse.hours}</span>
                    </div>
                  )}
                  
                  {content.local_resources.courthouse.what_to_bring && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">What to Bring:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {content.local_resources.courthouse.what_to_bring.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            )}
            
            {/* Attorney Guidance */}
            {content.local_attorney_guidance && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-blue-900">Find a Local Attorney</h3>
                
                <p className="text-sm text-blue-800 mb-4">
                  {content.local_attorney_guidance.why_hire_local}
                </p>
                
                {content.local_attorney_guidance.what_to_ask && (
                  <div>
                    <p className="font-medium text-blue-900 mb-2">Questions to Ask:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                      {content.local_attorney_guidance.what_to_ask.map((question: string, i: number) => (
                        <li key={i}>{question}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <a 
                    href="/find-attorney" 
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block transition-colors"
                  >
                    Find Attorneys →
                  </a>
                </div>
              </Card>
            )}
            
            {/* Emergency Contact */}
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Emergency Numbers</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-red-900">Court Phone</p>
                  <p className="text-red-800">{county.court_phone}</p>
                </div>
                <div>
                  <p className="font-medium text-red-900">{state.name} DMV</p>
                  <p className="text-red-800">Call immediately for hearing request</p>
                </div>
                <div>
                  <p className="font-medium text-red-900">Bail Bondsmen</p>
                  <p className="text-red-800">24/7 availability in {county.name}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
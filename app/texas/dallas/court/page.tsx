import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  Scale,
  ChevronRight,
  FileText,
  Info,
  CheckCircle,
  XCircle,
  Building
} from 'lucide-react';

async function getCountyData() {
  const supabase = await createClient();

  const { data: county, error } = await supabase
    .from('counties')
    .select(`
      *,
      state:states(*)
    `)
    .eq('slug', 'dallas')
    .eq('state:states.slug', 'texas')
    .single();

  if (error || !county) {
    console.error('Error fetching county:', error);
    return null;
  }

  return { county };
}

export default async function DallasCountyCourtPage() {
  const data = await getCountyData();

  if (!data) {
    notFound();
  }

  const { county } = data;
  const state = county.state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-blue-100 mb-2">
            <Link href="/texas" className="hover:text-white transition-colors">
              {state.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/texas/harris" className="hover:text-white transition-colors">
              {county.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Court Process</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {county.name} {state.legal_term} Court Process
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Complete guide to arraignment, court dates, plea options, and what to expect during your {state.legal_term}
            case in {county.name}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Court Information */}
        {county.court_name && (
          <section>
            <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
              <div className="flex items-start gap-4">
                <Building className="h-10 w-10 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Court Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="font-semibold text-gray-900 mb-3">{county.court_name}</h3>
                      {county.court_address && (
                        <div className="flex items-start gap-2 text-gray-700 mb-2">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{county.court_address}</span>
                        </div>
                      )}
                      {county.court_phone && (
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a href={`tel:${county.court_phone}`} className="hover:text-blue-600">
                            {county.court_phone}
                          </a>
                        </div>
                      )}
                      {county.court_hours && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <span>{county.court_hours}</span>
                        </div>
                      )}
                    </div>

                    {county.court_arraignment_timeline && (
                      <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-3">Arraignment Timeline</h3>
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700 mb-2">{county.court_arraignment_timeline}</p>
                            <p className="text-sm text-gray-600">
                              First court appearance where charges are read and bail is set
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Court Process Timeline */}
        <section>
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Scale className="h-6 w-6 text-blue-600" />
              Court Process Timeline
            </h2>

            <div className="space-y-6">
              {/* Step 1: Arraignment */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Arraignment</h3>
                  <p className="text-gray-700 mb-3">
                    First court appearance, typically {county.court_arraignment_timeline || 'within 24-48 hours'} after arrest.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">What Happens:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Judge reads charges against you</li>
                      <li>You enter initial plea (usually Not Guilty)</li>
                      <li>Bail is set or reviewed</li>
                      <li>Next court date is scheduled</li>
                      <li>Public defender appointed if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2: Pre-Trial Hearings */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pre-Trial Hearings</h3>
                  <p className="text-gray-700 mb-3">
                    Multiple court dates over 2-6 months where your attorney negotiates with prosecutors.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Attorney Activities:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Review police reports and evidence</li>
                      <li>File motions to suppress evidence</li>
                      <li>Challenge breathalyzer/blood test results</li>
                      <li>Negotiate plea bargains</li>
                      <li>Discuss diversion program eligibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3: Plea or Trial */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Plea Bargain or Trial</h3>
                  <p className="text-gray-700 mb-3">
                    Most {state.legal_term} cases (over 90%) resolve through plea bargaining, not trial.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                      <p className="font-semibold text-green-900 mb-2">Plea Bargain (Common)</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
                        <li>Reduced charges</li>
                        <li>Lower penalties</li>
                        <li>Faster resolution</li>
                        <li>Certainty of outcome</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="font-semibold text-orange-900 mb-2">Trial (Rare)</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-orange-800">
                        <li>Jury or bench trial</li>
                        <li>Higher risk/reward</li>
                        <li>Expensive legal fees</li>
                        <li>Takes 6-12 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Sentencing */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">4</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sentencing</h3>
                  <p className="text-gray-700 mb-3">
                    Judge imposes penalties based on plea agreement or trial verdict.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Possible Outcomes:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Probation (most common for 1st offense)</li>
                      <li>Jail time (days to months)</li>
                      <li>Fines ($300-$2,000+)</li>
                      <li>License suspension</li>
                      <li>Ignition interlock device</li>
                      <li>Community service & alcohol education</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Diversion Program */}
        {county.diversion_program_available && (
          <section>
            <Card className="p-6 md:p-8 bg-green-50 border-2 border-green-300">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-10 w-10 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Diversion Program Available
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {county.name} offers a diversion program that may allow first-time {state.legal_term} offenders to
                    avoid a criminal conviction.
                  </p>
                  {county.diversion_program_details && (
                    <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                      <p className="text-gray-700">{county.diversion_program_details}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <p className="font-semibold text-gray-900 mb-3">Typical Requirements:</p>
                    <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>First-time offender</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No accident or injury</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>BAC below certain threshold</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Complete alcohol education</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Community service hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Probation period (6-12 months)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded">
                    <p className="text-sm text-green-900">
                      <strong>Benefit:</strong> Upon successful completion, charges are dismissed and you avoid a
                      criminal conviction on your record.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* What to Bring to Court */}
        <section>
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              What to Bring to Court
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
                <ul className="space-y-2">
                  {[
                    'Court summons/notice',
                    'Photo ID (driver\'s license)',
                    'Bond paperwork',
                    'Attorney contact information',
                    'Proof of insurance (if available)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Court Appearance Tips</h3>
                <ul className="space-y-2">
                  {[
                    'Arrive 30 minutes early',
                    'Dress professionally',
                    'Turn off cell phone',
                    'Be respectful to judge',
                    'Let your attorney speak',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Penalties Reference */}
        <section>
          <Card className="p-6 md:p-8 bg-yellow-50 border-2 border-yellow-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Potential Penalties in {state.name}
            </h2>

            <p className="text-gray-700 mb-4">
              Understanding what you could be facing helps you make informed decisions about plea offers.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">First Offense</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 3-180 days jail</li>
                    <li>• $300-$2,000 fine</li>
                    <li>• 90-365 day suspension</li>
                    <li>• Possible probation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Second Offense</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 30 days - 1 year jail</li>
                    <li>• $600-$4,000 fine</li>
                    <li>• 180 days - 2 years suspension</li>
                    <li>• Ignition interlock required</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Third Offense (Felony)</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 2-10 years prison</li>
                    <li>• Up to $10,000 fine</li>
                    <li>• 180 days - 2 years suspension</li>
                    <li>• Permanent record</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/${state.slug}/penalties`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                View Complete Penalty Matrix
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </Card>
        </section>

        {/* Critical Actions */}
        <section>
          <Card className="p-6 md:p-8 bg-red-50 border-2 border-red-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-600" />
              Do NOT Do These Things
            </h2>

            <div className="space-y-3">
              {[
                'Miss any court date - warrant will be issued immediately',
                'Talk to prosecutors without your attorney present',
                'Post about your case on social media',
                'Discuss your case with anyone except your attorney',
                'Drive with a suspended license',
                'Violate any bail conditions',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-900">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Get Attorney CTA */}
        <section>
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Need a {state.legal_term} Attorney?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              An experienced {state.legal_term} lawyer can negotiate better plea deals, challenge evidence,
              get charges reduced, and potentially save your license. Most offer free consultations.
            </p>
            <Link
              href="/find-attorney/texas"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Find {county.name} {state.legal_term} Attorneys
              <ChevronRight className="h-6 w-6 ml-2" />
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}

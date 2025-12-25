import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Shield,
  ChevronRight,
  ExternalLink,
  Users,
  FileText,
  Info
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

export default async function DallasCountyBailPage() {
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
            <span>Bail & Release</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {county.name} {state.legal_term} Bail Information
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Understanding bail amounts, the release process, and what happens after a {state.legal_term} arrest
            in {county.name}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Bail Range */}
        {county.typical_bail_range_min && county.typical_bail_range_max && (
          <section>
            <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
              <div className="flex items-start gap-4">
                <DollarSign className="h-10 w-10 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Typical Bail Range
                  </h2>
                  <p className="text-gray-700 mb-4">
                    For a first-offense {state.legal_term} in {county.name}, bail typically ranges from:
                  </p>
                  <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                        ${county.typical_bail_range_min?.toLocaleString()} - ${county.typical_bail_range_max?.toLocaleString()}
                      </div>
                      <p className="text-gray-600">First-time {state.legal_term} offense</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-orange-900">
                        <p className="font-semibold mb-1">Bail Can Be Higher If:</p>
                        <ul className="list-disc list-inside space-y-1 text-orange-800">
                          <li>High BAC level (≥0.15)</li>
                          <li>Accident or injury involved</li>
                          <li>Minor passenger in vehicle</li>
                          <li>Prior {state.legal_term} offenses</li>
                          <li>Probation or parole violation</li>
                          <li>Additional charges (evading arrest, assault, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Jail Information */}
        {county.jail_name && (
          <section>
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                County Jail Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{county.jail_name}</h3>
                  {county.jail_address && (
                    <div className="flex items-start gap-2 text-gray-700 mb-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{county.jail_address}</span>
                    </div>
                  )}
                  {county.jail_phone && (
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${county.jail_phone}`} className="hover:text-blue-600">
                        {county.jail_phone}
                      </a>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Inmate Search</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Use the online inmate locator to check booking status, bail amount, and release information.
                    </p>
                    <a
                      href="https://www.harriscountysheriff.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Search Inmate Records
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What to Expect</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Booking Process</p>
                        <p className="text-gray-600">2-8 hours for processing, fingerprinting, and photographing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Arraignment</p>
                        <p className="text-gray-600">
                          {county.court_arraignment_timeline || 'Within 24-48 hours'}, bail set by judge
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Release Options</p>
                        <p className="text-gray-600">Cash bond, bail bond, or personal recognizance (rare for {state.legal_term})</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* How Bail Bonds Work */}
        <section>
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              How Bail Bonds Work
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Option 1: Cash Bond (Pay Full Amount)
                </h3>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-gray-700 mb-2">
                    <strong>How it works:</strong> Pay the full bail amount to the court
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Pros:</strong> Get full amount back after case concludes (minus court fees)
                  </p>
                  <p className="text-gray-700">
                    <strong>Cons:</strong> Requires full amount upfront {county.typical_bail_range_min && `($${county.typical_bail_range_min.toLocaleString()}-$${county.typical_bail_range_max?.toLocaleString()})`}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Option 2: Bail Bondsman (Most Common)
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-gray-700 mb-2">
                    <strong>How it works:</strong> Pay 10-15% fee to bondsman, they post full bail
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Cost:</strong> Typically 10% of bail amount (non-refundable)
                  </p>
                  {county.typical_bail_range_min && (
                    <p className="text-gray-700 mb-2">
                      <strong>Example:</strong> On ${county.typical_bail_range_min.toLocaleString()} bail = ${(county.typical_bail_range_min * 0.1).toLocaleString()} fee
                    </p>
                  )}
                  <p className="text-gray-700 mb-2">
                    <strong>Pros:</strong> Only need 10% upfront instead of full amount
                  </p>
                  <p className="text-gray-700">
                    <strong>Cons:</strong> Fee is non-refundable, may require collateral, co-signer assumes liability
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Co-Signer Liability Warning
                </h3>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-900">
                      <p className="font-semibold mb-2">Important for Co-Signers:</p>
                      <ul className="list-disc list-inside space-y-1 text-red-800">
                        <li>You are 100% liable if defendant does not appear in court</li>
                        <li>You must pay the full bail amount if defendant skips</li>
                        <li>Bondsman can seize collateral (house, car, etc.)</li>
                        <li>You cannot cancel the bond - only the court can</li>
                        <li>Liability continues until case is fully resolved</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Release Timeline */}
        <section>
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              Release Timeline
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="font-semibold text-gray-900">Arrest & Booking (2-8 hours)</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Fingerprinting, photographing, background check, medical screening
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Arraignment ({county.court_arraignment_timeline || 'Within 24-48 hours'})
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    First court appearance, judge sets bail amount, charges are read
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <div className="w-1 h-full bg-blue-200 mt-2"></div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="font-semibold text-gray-900">Bail Posted (1-4 hours)</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Family contacts bondsman, paperwork signed, fee paid
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">4</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Release (2-6 hours)</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Processing, release paperwork, return of personal property, court date assigned
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Total Time Estimate</p>
                  <p className="text-blue-800">
                    From arrest to release: <strong>12-48 hours</strong> depending on booking workload,
                    time of arrest (weekends take longer), and how quickly bail is posted.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* What Happens After Release */}
        <section>
          <Card className="p-6 md:p-8 bg-yellow-50 border-2 border-yellow-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              After Release: Critical Deadlines
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <h3 className="font-bold text-red-900 mb-2">
                  1. Request {state.admin_hearing_term || 'MVD Hearing'} - {state.dmv_deadline_days || 15} Days
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  You have only <strong>{state.dmv_deadline_days || 15} days</strong> from arrest to request
                  your administrative license hearing. This is separate from your criminal case.
                </p>
                <Link
                  href={`/texas/dmv-hearing`}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Request Hearing Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <h3 className="font-bold text-orange-900 mb-2">
                  2. Retrieve Your Vehicle
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Impound fees accrue daily. Get your car as soon as possible to avoid hundreds in storage fees.
                </p>
                <Link
                  href="/texas/harris/impound"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-sm"
                >
                  Calculate Impound Costs
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-900 mb-2">
                  3. Hire an Attorney
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  A {state.legal_term} attorney can help with license hearings, plea negotiations, and potentially
                  getting charges reduced or dismissed.
                </p>
                <Link
                  href="/find-attorney/texas"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Find {county.name} {state.legal_term} Lawyers
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-gray-500">
                <h3 className="font-bold text-gray-900 mb-2">
                  4. Appear at ALL Court Dates
                </h3>
                <p className="text-sm text-gray-700">
                  Missing court will result in bond forfeiture, arrest warrant, and additional charges.
                  Your co-signer will be liable for the full bail amount.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Find Attorney CTA */}
        <section>
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Legal Representation?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Connect with experienced {state.legal_term} attorneys in {county.name} who can help with
              bail hearings, license suspension, and criminal defense.
            </p>
            <Link
              href="/find-attorney/texas"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Find {state.legal_term} Attorneys
              <ChevronRight className="h-6 w-6 ml-2" />
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}

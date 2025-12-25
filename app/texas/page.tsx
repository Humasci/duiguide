import { createClient } from '@/lib/supabase/server';
import PenaltyMatrix from '@/components/PenaltyMatrix';
import TexasCountiesMap from '@/components/ui/ui-showcase/TexasCountiesMap';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  Scale,
  Car,
  Shield,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

async function getStateData() {
  const supabase = await createClient();

  const { data: state, error: stateError } = await supabase
    .from('states')
    .select('*')
    .eq('slug', 'texas')
    .single();

  if (stateError || !state) {
    console.error('Error fetching state:', stateError);
    return null;
  }

  // Get counties for this state
  const { data: counties } = await supabase
    .from('counties')
    .select('*')
    .eq('state_id', state.id)
    .order('name');

  return { state, counties: counties || [] };
}

export default async function TexasPage() {
  const data = await getStateData();

  if (!data) {
    notFound();
  }

  const { state, counties } = data;

  // Priority counties (top 10)
  const priorityCounties = counties.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white mb-4">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {state.dmv_deadline_days || 15}-Day DMV Deadline
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {state.name} {state.legal_term} Guide
            </h1>
            <p className="text-xl text-blue-100">
              Complete guide to {state.legal_term} laws, penalties, and procedures in {state.name}.
              Know your rights and deadlines after a {state.legal_term} arrest.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="bg-red-50 border-2 border-red-300 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-900 mb-2">
                URGENT: Request Your {state.admin_hearing_term || 'DMV Hearing'} Within {state.dmv_deadline_days || 15} Days
              </h2>
              <p className="text-red-800 mb-4">
                You have only <strong>{state.dmv_deadline_days || 15} days</strong> from your arrest date to request an{' '}
                {state.admin_hearing_term || 'Administrative License Revocation (ALR) hearing'}. Missing this deadline
                results in <strong>automatic license suspension</strong>.
              </p>
              <Link
                href={`/texas/dmv-hearing`}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Request Your Hearing Now
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Quick Actions */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What You Need to Do Now</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/texas/dmv-hearing">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-red-500">
                <Clock className="h-10 w-10 text-red-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Request DMV Hearing</h3>
                <p className="text-sm text-gray-600">
                  {state.dmv_deadline_days || 15}-day deadline to save your license
                </p>
              </Card>
            </Link>

            <Link href="/find-attorney/texas">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
                <Scale className="h-10 w-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Find an Attorney</h3>
                <p className="text-sm text-gray-600">
                  Connect with experienced {state.legal_term} lawyers
                </p>
              </Card>
            </Link>

            <Link href="/guide/after-arrest">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-orange-500">
                <Car className="h-10 w-10 text-orange-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Your Car</h3>
                <p className="text-sm text-gray-600">
                  Retrieve vehicle from impound lots
                </p>
              </Card>
            </Link>

            <Link href="/guide/scram-bracelet">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
                <Shield className="h-10 w-10 text-purple-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">SCRAM Monitoring</h3>
                <p className="text-sm text-gray-600">
                  Ankle monitor requirements & providers
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Penalty Matrix */}
        <section>
          <PenaltyMatrix state={state} />
        </section>

        {/* County Selection */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your County</h2>
          <p className="text-gray-600 mb-6">
            Get county-specific information about courts, impound lots, bail, and local procedures.
          </p>

          {/* Map */}
          <div className="mb-8">
            <TexasCountiesMap />
          </div>

          {/* Priority Counties List */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              Major Counties
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priorityCounties.map((county) => (
                <Link key={county.id} href={`/texas/${county.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-1">{county.name}</h4>
                    <p className="text-sm text-gray-500">
                      {county.impound_daily_fee && `Impound: $${county.impound_daily_fee}/day`}
                      {!county.impound_daily_fee && 'View county information'}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium mt-2">
                      View Guide
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {counties.length > 10 && (
              <div className="mt-4">
                <details>
                  <summary className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700">
                    View all {counties.length} counties in {state.name}
                  </summary>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                    {counties.slice(10).map((county) => (
                      <Link
                        key={county.id}
                        href={`/texas/${county.slug}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {county.name}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        </section>

        {/* State-Specific Information */}
        <section>
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding {state.legal_term} in {state.name}
            </h2>

            <div className="prose prose-blue max-w-none">
              <h3>What is {state.legal_term}?</h3>
              <p className="text-gray-700">
                In {state.name}, driving while intoxicated is referred to as <strong>{state.legal_term}</strong>.
                {state.legal_term === 'DWI' && ' Note that Texas uses "DWI" (Driving While Intoxicated) rather than "DUI" (Driving Under the Influence).'}
                {state.legal_term === 'OVI' && ' Ohio uses "OVI" (Operating a Vehicle Impaired) rather than DUI or DWI.'}
              </p>

              <h3>Legal BAC Limit</h3>
              <p className="text-gray-700">
                The legal blood alcohol concentration (BAC) limit in {state.name} is <strong>0.08%</strong> for drivers
                21 and older, <strong>0.04%</strong> for commercial drivers, and <strong>any detectable amount</strong> for drivers under 21.
              </p>

              <h3>Implied Consent Law</h3>
              <p className="text-gray-700">
                By driving in {state.name}, you automatically consent to chemical testing if arrested for {state.legal_term}.
                Refusing a breath or blood test results in automatic license suspension.
              </p>

              <h3>Time-Sensitive Deadlines</h3>
              <ul className="text-gray-700">
                <li>
                  <strong>{state.dmv_deadline_days || 15} days</strong> to request {state.admin_hearing_term || 'ALR hearing'}
                </li>
                <li>Vehicle impound fees accrue daily</li>
                <li>Court arraignment typically within 2-4 weeks</li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

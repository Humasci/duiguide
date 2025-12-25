import { createClient } from '@/lib/supabase/server';
import CrisisGrid from '@/components/CrisisGrid';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  Building,
  ChevronRight,
  Sparkles
} from 'lucide-react';

async function getCountyData() {
  const supabase = await createClient();

  const { data: county, error } = await supabase
    .from('counties')
    .select(`
      *,
      state:states(*)
    `)
    .eq('slug', 'maricopa')
    .eq('state:states.slug', 'arizona')
    .single();

  if (error || !county) {
    console.error('Error fetching county:', error);
    return null;
  }

  // Get Gold Dust intelligence for this county
  const { data: goldDust } = await supabase
    .from('curated_data')
    .select('*')
    .eq('county_id', county.id)
    .eq('priority', 10)
    .limit(3);

  return { county, goldDust: goldDust || [] };
}

export default async function MaricopaCountyPage() {
  const data = await getCountyData();

  if (!data) {
    notFound();
  }

  const { county, goldDust } = data;
  const state = county.state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-blue-100 mb-2">
            <Link href="/arizona" className="hover:text-white transition-colors">
              {state.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{county.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {county.name} {state.legal_term} Guide
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Complete information about {state.legal_term} arrests, impound, bail, courts, and procedures
            specific to {county.name}, {state.name}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Crisis Grid - What to Do Now */}
        <CrisisGrid
          stateSlug="arizona"
          countySlug="maricopa"
          countyName={county.name}
          dmvDeadlineDays={state.dmv_deadline_days || 15}
        />

        {/* Gold Dust Intelligence */}
        {goldDust.length > 0 && (
          <section>
            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    💎 {county.name} Insider Knowledge
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Important county-specific information that could save you money and hassle:
                  </p>
                  <div className="space-y-3">
                    {goldDust.map((item) => {
                      const metadata = item.gold_dust_metadata as any;
                      return (
                        <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs font-bold rounded">
                              {metadata?.friction_type?.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-blue-200 text-blue-900 text-xs font-bold rounded capitalize">
                              {item.topic}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {metadata?.key_insight}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Local Court Information */}
        {county.court_name && (
          <section>
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="h-6 w-6 text-blue-600" />
                Court Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{county.court_name}</h3>
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
                    <div className="flex items-start gap-2 text-gray-700">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{county.court_hours}</span>
                    </div>
                  )}
                </div>
                {county.court_arraignment_timeline && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Arraignment Timeline</h4>
                    <p className="text-gray-700">{county.court_arraignment_timeline}</p>
                  </div>
                )}
              </div>
            </Card>
          </section>
        )}

        {/* Impound Information Preview */}
        {county.impound_daily_fee && (
          <section>
            <Card className="p-6 bg-orange-50 border-2 border-orange-300">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Vehicle Impound Costs
                  </h2>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-orange-900 mb-1">
                      ${county.impound_daily_fee}/day
                    </div>
                    <p className="text-gray-700">
                      Plus ${county.impound_admin_fee || 150} administrative fee
                    </p>
                  </div>
                  {county.impound_lot_name && (
                    <p className="text-gray-700 mb-4">
                      <strong>Primary Lot:</strong> {county.impound_lot_name}
                    </p>
                  )}
                  <Link
                    href="/arizona/maricopa/impound"
                    className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Calculate Your Impound Cost
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Bail Information Preview */}
        {county.typical_bail_range_min && county.typical_bail_range_max && (
          <section>
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bail Information
              </h2>
              <p className="text-gray-700 mb-4">
                Typical bail for first-offense {state.legal_term} in {county.name}:
              </p>
              <div className="text-3xl font-bold text-blue-900 mb-4">
                ${county.typical_bail_range_min?.toLocaleString()} - ${county.typical_bail_range_max?.toLocaleString()}
              </div>
              {county.jail_name && (
                <p className="text-gray-700 mb-4">
                  <strong>County Jail:</strong> {county.jail_name}
                  {county.jail_address && ` • ${county.jail_address}`}
                </p>
              )}
              <Link
                href="/arizona/maricopa/bail"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                Learn More About Bail
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </Card>
          </section>
        )}

        {/* Diversion Program */}
        {county.diversion_program_available && (
          <section>
            <Card className="p-6 bg-green-50 border-2 border-green-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ✅ Diversion Program Available
              </h2>
              <p className="text-gray-700 mb-4">
                {county.name} offers a diversion program that may allow first-time offenders to
                avoid conviction.
              </p>
              {county.diversion_program_details && (
                <p className="text-gray-700 mb-4">{county.diversion_program_details}</p>
              )}
              <Link
                href="/arizona/maricopa/court"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold"
              >
                Learn More About Diversion
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </Card>
          </section>
        )}

        {/* Find Attorney CTA */}
        <section>
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Need a {state.legal_term} Attorney?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Connect with experienced {state.legal_term} lawyers who practice in {county.name} courts
              and understand local procedures.
            </p>
            <Link
              href="/find-attorney/arizona"
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

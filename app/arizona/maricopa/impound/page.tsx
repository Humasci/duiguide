import { createClient } from '@/lib/supabase/server';
import ImpoundCostCalculator from '@/components/ImpoundCostCalculator';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  CreditCard,
  ChevronRight,
  DollarSign
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

  return { county };
}

export default async function MaricopaImpoundPage() {
  const data = await getCountyData();

  if (!data) {
    notFound();
  }

  const { county } = data;
  const state = county.state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs & Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/arizona" className="hover:text-blue-600">Arizona</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/arizona/maricopa" className="hover:text-blue-600">{county.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Impound</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {county.name} Vehicle Impound Guide
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Impound Cost Calculator */}
        <ImpoundCostCalculator county={{
          name: county.name,
          state_name: state.name,
          impound_daily_fee: county.impound_daily_fee || 45,
          impound_admin_fee: county.impound_admin_fee || 150,
          impound_lot_name: county.impound_lot_name,
          impound_lot_address: county.impound_lot_address,
          impound_release_hours: county.impound_release_hours,
          impound_payment_methods: county.impound_payment_methods,
        }} />

        {/* Critical First 48 Hours */}
        <section>
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-red-600" />
              The First 48 Hours Are Critical
            </h2>

            <div className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-700">
                After a {state.legal_term} arrest in {county.name}, your vehicle is likely towed to an impound lot.
                <strong className="text-red-900"> Storage fees accumulate daily</strong>, making time your biggest enemy.
              </p>

              <h3>What Happens Immediately After Arrest</h3>
              <div className="bg-gray-50 rounded-lg p-4 my-4">
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-gray-700">
                    <strong>Vehicle is towed</strong> (usually within 30 minutes of arrest)
                  </li>
                  <li className="text-gray-700">
                    <strong>Tow company notifies impound lot</strong> (charges start immediately)
                  </li>
                  <li className="text-gray-700">
                    <strong>Storage fees begin accruing</strong> at ${county.impound_daily_fee || 45}/day in {county.name}
                  </li>
                  <li className="text-gray-700">
                    <strong>Administrative fees added</strong> (${county.impound_admin_fee || 150} in {county.name})
                  </li>
                </ol>
              </div>

              <h3>Documents You Need to Retrieve Your Vehicle</h3>
              <ul className="space-y-2">
                <li>Valid photo ID (driver's license or state ID)</li>
                <li>Vehicle registration or title</li>
                <li>Proof of insurance</li>
                <li>Payment for all fees (see calculator above)</li>
                <li>Release authorization (if not the registered owner)</li>
              </ul>

              <h3>Can Someone Else Pick Up My Car?</h3>
              <p className="text-gray-700">
                Yes, but they'll need:
              </p>
              <ul>
                <li>Written authorization from the registered owner</li>
                <li>Copy of owner's ID</li>
                <li>Their own valid ID</li>
                <li>Proof of insurance in their name or the owner's name</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Impound Lot Information */}
        {county.impound_lot_name && (
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Impound Lot Details
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    {county.impound_lot_name}
                  </h3>

                  {county.impound_lot_address && (
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Address</div>
                        <div className="text-gray-900">{county.impound_lot_address}</div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(county.impound_lot_address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  )}

                  {county.impound_lot_phone && (
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Phone</div>
                        <a
                          href={`tel:${county.impound_lot_phone}`}
                          className="text-gray-900 hover:text-blue-600"
                        >
                          {county.impound_lot_phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {county.impound_release_hours && (
                    <div className="flex items-start gap-3 mb-4">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Release Hours</div>
                        <div className="text-gray-900">{county.impound_release_hours}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {county.impound_payment_methods && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div className="text-sm font-medium text-gray-700">Accepted Payment Methods</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {county.impound_payment_methods.split(',').map((method: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {method.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-900">
                        <p className="font-semibold mb-1">Call Before You Go</p>
                        <p>
                          Verify your vehicle is at this lot and confirm the exact amount owed before making the trip.
                          Hours and fees may change without notice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* The Poverty Trap Warning */}
        <section>
          <Card className="p-8 bg-red-50 border-2 border-red-300">
            <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              The Impound "Poverty Trap"
            </h2>

            <div className="prose prose-red max-w-none">
              <p className="text-lg text-red-900 font-semibold">
                Many people can't afford to get their car out immediately, but waiting only makes it worse.
              </p>

              <div className="bg-white rounded-lg p-6 my-4">
                <h3 className="text-gray-900 mb-3">Here's the vicious cycle:</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-900 font-bold text-sm">
                      1
                    </span>
                    <p>Can't afford ${(county.impound_daily_fee || 45) * 3 + (county.impound_admin_fee || 150)} for first 3 days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-900 font-bold text-sm">
                      2
                    </span>
                    <p>Wait a week to save money → now owe ${(county.impound_daily_fee || 45) * 7 + (county.impound_admin_fee || 150)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-900 font-bold text-sm">
                      3
                    </span>
                    <p>Can't get to work without car → lose income</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-900 font-bold text-sm">
                      4
                    </span>
                    <p>Wait 2 weeks → now owe ${(county.impound_daily_fee || 45) * 14 + (county.impound_admin_fee || 150)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-900 font-bold text-sm">
                      5
                    </span>
                    <p>After 30 days: ${(county.impound_daily_fee || 45) * 30 + (county.impound_admin_fee || 150)} → Car gets auctioned</p>
                  </div>
                </div>
              </div>

              <h3>What You Can Do</h3>
              <ul className="text-gray-700">
                <li>Borrow money from family/friends (pay them back later, cheaper than daily fees)</li>
                <li>Use a credit card (even with interest, cheaper than impound fees)</li>
                <li>Sell non-essential items quickly</li>
                <li>Ask your employer for an advance</li>
                <li>Check if your auto insurance covers towing/storage (some policies do)</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Legal Help CTA */}
        <section>
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-2xl font-bold mb-4">Fighting the {state.legal_term} Charge?</h2>
            <p className="text-blue-100 mb-6">
              An experienced attorney may be able to get evidence suppressed, negotiate a better plea,
              or even get the case dismissed. Don't face this alone.
            </p>
            <Link
              href="/find-attorney/arizona"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
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

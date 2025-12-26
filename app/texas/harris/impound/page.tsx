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
  DollarSign,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

async function getCountyData() {
  const supabase = await createClient();

  const { data: county, error } = await supabase
    .from('counties')
    .select(`
      *,
      state:states(*)
    `)
    .eq('slug', 'harris')
    .eq('state:states.slug', 'texas')
    .single();

  if (error || !county) {
    console.error('Error fetching county:', error);
    return null;
  }

  return { county };
}

export default async function HarrisImpoundPage() {
  const data = await getCountyData();

  if (!data) {
    notFound();
  }

  const { county } = data;
  const state = county.state;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs & Header */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-7xl py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/texas" className="hover:text-primary transition-colors">Texas</Link>
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
            <Link href="/texas/harris" className="hover:text-primary transition-colors">{county.name}</Link>
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
            <span className="text-foreground">Impound</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            {county.name} Vehicle Impound Guide
          </h1>
        </div>
      </div>

      <div className="container max-w-7xl py-12 space-y-12">
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
          <Card className="p-8 rounded-2xl">
            <h2 className="font-heading text-2xl font-normal text-foreground mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-destructive stroke-[1.5]" />
              The First 48 Hours Are Critical
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                After a {state.legal_term} arrest in {county.name}, your vehicle is likely towed to an impound lot.
                <strong className="text-destructive"> Storage fees accumulate daily</strong>, making time your biggest enemy.
              </p>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-4">What Happens Immediately After Arrest</h3>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">1</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Vehicle is towed</strong> (usually within 30 minutes of arrest)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">2</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Tow company notifies impound lot</strong> (charges start immediately)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">3</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Storage fees begin accruing</strong> at ${county.impound_daily_fee || 45}/day in {county.name}</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">4</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Administrative fees added</strong> (${county.impound_admin_fee || 150} in {county.name})</p>
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-4">Documents You Need to Retrieve Your Vehicle</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary stroke-[1.5]" />
                    Valid photo ID (driver&apos;s license or state ID)
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary stroke-[1.5]" />
                    Vehicle registration or title
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary stroke-[1.5]" />
                    Proof of insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary stroke-[1.5]" />
                    Payment for all fees (see calculator above)
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary stroke-[1.5]" />
                    Release authorization (if not the registered owner)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-4">Can Someone Else Pick Up My Car?</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Yes, but they&apos;ll need:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Written authorization from the registered owner</li>
                  <li>• Copy of owner&apos;s ID</li>
                  <li>• Their own valid ID</li>
                  <li>• Proof of insurance in their name or the owner&apos;s name</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Impound Lot Information */}
        {county.impound_lot_name && (
          <section>
            <Card className="p-8 rounded-2xl">
              <h2 className="font-heading text-2xl font-normal text-foreground mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary stroke-[1.5]" />
                Impound Lot Details
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-4">
                    {county.impound_lot_name}
                  </h3>

                  {county.impound_lot_address && (
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <div>
                        <div className="text-sm font-medium text-foreground mb-1">Address</div>
                        <div className="text-muted-foreground">{county.impound_lot_address}</div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(county.impound_lot_address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-sm mt-1 inline-block transition-colors"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  )}

                  {county.impound_lot_phone && (
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 stroke-[1.5]" />
                      <div>
                        <div className="text-sm font-medium text-foreground mb-1">Phone</div>
                        <a
                          href={`tel:${county.impound_lot_phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {county.impound_lot_phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {county.impound_release_hours && (
                    <div className="flex items-start gap-3 mb-4">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <div>
                        <div className="text-sm font-medium text-foreground mb-1">Release Hours</div>
                        <div className="text-muted-foreground">{county.impound_release_hours}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {county.impound_payment_methods && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-5 w-5 text-primary stroke-[1.5]" />
                        <div className="text-sm font-medium text-foreground">Accepted Payment Methods</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {county.impound_payment_methods.split(',').map((method: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/20 text-foreground rounded-full text-sm font-medium"
                          >
                            {method.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-accent border-2 border-primary/30 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground mb-1">Call Before You Go</p>
                        <p className="leading-relaxed">
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
          <Card className="p-8 bg-destructive/10 border-2 border-destructive/30 rounded-2xl">
            <h2 className="font-heading text-2xl font-normal text-foreground mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-destructive stroke-[1.5]" />
              The Impound &ldquo;Poverty Trap&rdquo;
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-foreground font-medium leading-relaxed">
                Many people can&apos;t afford to get their car out immediately, but waiting only makes it worse.
              </p>

              <div className="bg-background rounded-2xl p-6 border border-border">
                <h3 className="font-heading text-lg font-normal text-foreground mb-4">Here&apos;s the vicious cycle:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center text-destructive font-bold text-sm">1</span>
                    <p className="text-muted-foreground">Can&apos;t afford ${(county.impound_daily_fee || 45) * 3 + (county.impound_admin_fee || 150)} for first 3 days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center text-destructive font-bold text-sm">2</span>
                    <p className="text-muted-foreground">Wait a week to save money → now owe ${(county.impound_daily_fee || 45) * 7 + (county.impound_admin_fee || 150)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center text-destructive font-bold text-sm">3</span>
                    <p className="text-muted-foreground">Can&apos;t get to work without car → lose income</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center text-destructive font-bold text-sm">4</span>
                    <p className="text-muted-foreground">Wait 2 weeks → now owe ${(county.impound_daily_fee || 45) * 14 + (county.impound_admin_fee || 150)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center text-destructive font-bold text-sm">5</span>
                    <p className="text-muted-foreground">After 30 days: ${(county.impound_daily_fee || 45) * 30 + (county.impound_admin_fee || 150)} → Car gets auctioned</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-normal text-foreground mb-4">What You Can Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Borrow money from family/friends (pay them back later, cheaper than daily fees)</li>
                  <li>• Use a credit card (even with interest, cheaper than impound fees)</li>
                  <li>• Sell non-essential items quickly</li>
                  <li>• Ask your employer for an advance</li>
                  <li>• Check if your auto insurance covers towing/storage (some policies do)</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Legal Help CTA */}
        <section>
          <Card className="p-12 bg-foreground rounded-2xl">
            <h2 className="font-heading text-2xl md:text-3xl font-normal text-background mb-4">
              Fighting the {state.legal_term} Charge?
            </h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl">
              An experienced attorney may be able to get evidence suppressed, negotiate a better plea,
              or even get the case dismissed. Don&apos;t face this alone.
            </p>
            <Button
              asChild
              className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
            >
              <Link href="/find-attorney/texas">
                Find {county.name} {state.legal_term} Attorneys
                <ChevronRight className="h-5 w-5 ml-2 stroke-[1.5]" />
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}

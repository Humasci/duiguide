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
    .eq('slug', 'dallas')
    .eq('state:states.slug', 'texas')
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

export default async function DallasCountyPage() {
  const data = await getCountyData();

  if (!data) {
    notFound();
  }

  const { county, goldDust } = data;
  const state = county.state;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-7xl py-16">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Link href="/texas" className="hover:text-foreground transition-colors">
              {state.name}
            </Link>
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
            <span>{county.name}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-foreground leading-tight">
            {county.name} {state.legal_term} Guide
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Complete information about {state.legal_term} arrests, impound, bail, courts, and procedures
            specific to {county.name}, {state.name}.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl py-20 space-y-20">
        {/* Crisis Grid - What to Do Now */}
        <CrisisGrid
          stateSlug="texas"
          countySlug="dallas"
          countyName={county.name}
          dmvDeadlineDays={state.dmv_deadline_days || 15}
        />

        {/* Gold Dust Intelligence */}
        {goldDust.length > 0 && (
          <section>
            <Card className="p-8 bg-accent border-2 border-primary/30 rounded-2xl">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1 stroke-[1.5]" />
                <div className="flex-1">
                  <h2 className="font-heading text-3xl font-normal text-foreground mb-3">
                    💎 {county.name} Insider Knowledge
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Important county-specific information that could save you money and hassle:
                  </p>
                  <div className="space-y-4">
                    {goldDust.map((item) => {
                      const metadata = item.gold_dust_metadata as any;
                      return (
                        <div key={item.id} className="bg-background rounded-xl p-6 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-primary/20 text-foreground text-xs font-bold rounded-full">
                              {metadata?.friction_type?.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full capitalize">
                              {item.topic}
                            </span>
                          </div>
                          <p className="font-semibold text-foreground leading-relaxed">
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
            <Card className="p-8 rounded-2xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Building className="h-8 w-8 text-primary stroke-[1.5]" />
                Court Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">{county.court_name}</h3>
                  {county.court_address && (
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <span className="leading-relaxed">{county.court_address}</span>
                    </div>
                  )}
                  {county.court_phone && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 stroke-[1.5]" />
                      <a href={`tel:${county.court_phone}`} className="hover:text-primary transition-colors">
                        {county.court_phone}
                      </a>
                    </div>
                  )}
                  {county.court_hours && (
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <span className="leading-relaxed">{county.court_hours}</span>
                    </div>
                  )}
                </div>
                {county.court_arraignment_timeline && (
                  <div>
                    <h4 className="font-heading text-lg font-normal text-foreground mb-3">Arraignment Timeline</h4>
                    <p className="text-muted-foreground leading-relaxed">{county.court_arraignment_timeline}</p>
                  </div>
                )}
              </div>
            </Card>
          </section>
        )}

        {/* Impound Information Preview */}
        {county.impound_daily_fee && (
          <section>
            <Card className="p-8 bg-accent border-2 border-primary/30 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1 stroke-[1.5]" />
                <div className="flex-1">
                  <h2 className="font-heading text-3xl font-normal text-foreground mb-4">
                    Vehicle Impound Costs
                  </h2>
                  <div className="mb-6">
                    <div className="text-4xl font-heading font-normal text-foreground mb-2">
                      ${county.impound_daily_fee}/day
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Plus ${county.impound_admin_fee || 150} administrative fee
                    </p>
                  </div>
                  {county.impound_lot_name && (
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      <strong>Primary Lot:</strong> {county.impound_lot_name}
                    </p>
                  )}
                  <Link
                    href="/texas/dallas/impound"
                    className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Calculate Your Impound Cost
                    <ChevronRight className="h-5 w-5 ml-1 stroke-[1.5]" />
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Bail Information Preview */}
        {county.typical_bail_range_min && county.typical_bail_range_max && (
          <section>
            <Card className="p-8 rounded-2xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-6">
                Bail Information
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Typical bail for first-offense {state.legal_term} in {county.name}:
              </p>
              <div className="text-4xl font-heading font-normal text-foreground mb-6">
                ${county.typical_bail_range_min?.toLocaleString()} - ${county.typical_bail_range_max?.toLocaleString()}
              </div>
              {county.jail_name && (
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <strong>County Jail:</strong> {county.jail_name}
                  {county.jail_address && ` • ${county.jail_address}`}
                </p>
              )}
              <Link
                href="/texas/dallas/bail"
                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Learn More About Bail
                <ChevronRight className="h-5 w-5 ml-1 stroke-[1.5]" />
              </Link>
            </Card>
          </section>
        )}

        {/* Diversion Program */}
        {county.diversion_program_available && (
          <section>
            <Card className="p-8 bg-accent border-2 border-primary/30 rounded-2xl">
              <h2 className="font-heading text-3xl font-normal text-foreground mb-4">
                ✅ Diversion Program Available
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {county.name} offers a diversion program that may allow first-time offenders to
                avoid conviction.
              </p>
              {county.diversion_program_details && (
                <p className="text-muted-foreground mb-6 leading-relaxed">{county.diversion_program_details}</p>
              )}
              <Link
                href="/texas/dallas/court"
                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Learn More About Diversion
                <ChevronRight className="h-5 w-5 ml-1 stroke-[1.5]" />
              </Link>
            </Card>
          </section>
        )}

        {/* Find Attorney CTA */}
        <section>
          <Card className="p-12 bg-foreground text-background rounded-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">Need a {state.legal_term} Attorney?</h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl">
              Connect with experienced {state.legal_term} lawyers who practice in {county.name} courts
              and understand local procedures.
            </p>
            <Link
              href="/find-attorney/texas"
              className="inline-flex items-center px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:bg-background/90 transition-colors text-lg"
            >
              Find {county.name} {state.legal_term} Attorneys
              <ChevronRight className="h-6 w-6 ml-2 stroke-[1.5]" />
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}

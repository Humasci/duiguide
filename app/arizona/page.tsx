import { createClient } from '@/lib/supabase/server';
import PenaltyMatrix from '@/components/PenaltyMatrix';
import ArizonaCountiesMap from '@/components/ui/ui-showcase/ArizonaCountiesMap';
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
    .eq('slug', 'arizona')
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

export default async function ArizonaPage() {
  const data = await getStateData();

  if (!data) {
    notFound();
  }

  const { state, counties } = data;

  // Priority counties (top 10)
  const priorityCounties = counties.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-7xl py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-destructive text-destructive-foreground mb-6">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {state.dmv_deadline_days || 15}-Day MVD Deadline
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-foreground leading-tight">
              {state.name} {state.legal_term} Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Complete guide to {state.legal_term} laws, penalties, and procedures in {state.name}.
              Know your rights and deadlines after a {state.legal_term} arrest.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <div className="container max-w-7xl -mt-10">
        <Card className="bg-destructive/10 border-2 border-destructive/30 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0 mt-1 stroke-[1.5]" />
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-normal text-foreground mb-3">
                URGENT: Request Your {state.admin_hearing_term || 'MVD Hearing'} Within {state.dmv_deadline_days || 15} Days
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You have only <strong>{state.dmv_deadline_days || 15} days</strong> from your arrest date to request an{' '}
                {state.admin_hearing_term || 'Administrative Motor Vehicle Division (MVD) hearing'}. Missing this deadline
                results in <strong>automatic license suspension</strong>.
              </p>
              <Link
                href={`/arizona/dmv-hearing`}
                className="inline-flex items-center px-8 py-4 bg-destructive text-destructive-foreground font-semibold rounded-full hover:bg-destructive/90 transition-colors"
              >
                Request Your Hearing Now
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <div className="container max-w-7xl py-20 space-y-20">
        {/* Quick Actions */}
        <section>
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-8">What You Need to Do Now</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/arizona/dmv-hearing">
              <Card className="p-6 hover:bg-card transition-colors duration-300 cursor-pointer rounded-2xl">
                <Clock className="h-10 w-10 text-destructive mb-4 stroke-[1.5]" />
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Request MVD Hearing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {state.dmv_deadline_days || 15}-day deadline to save your license
                </p>
              </Card>
            </Link>

            <Link href="/find-attorney/arizona">
              <Card className="p-6 hover:bg-card transition-colors duration-300 cursor-pointer rounded-2xl">
                <Scale className="h-10 w-10 text-primary mb-4 stroke-[1.5]" />
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Find an Attorney</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect with experienced {state.legal_term} lawyers
                </p>
              </Card>
            </Link>

            <Link href="/guide/after-arrest">
              <Card className="p-6 hover:bg-card transition-colors duration-300 cursor-pointer rounded-2xl">
                <Car className="h-10 w-10 text-primary mb-4 stroke-[1.5]" />
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Get Your Car</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Retrieve vehicle from impound lots
                </p>
              </Card>
            </Link>

            <Link href="/guide/scram-bracelet">
              <Card className="p-6 hover:bg-card transition-colors duration-300 cursor-pointer rounded-2xl">
                <Shield className="h-10 w-10 text-primary mb-4 stroke-[1.5]" />
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">SCRAM Monitoring</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">Select Your County</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Get county-specific information about courts, impound lots, bail, and local procedures.
          </p>

          {/* Map */}
          <div className="mb-12">
            <ArizonaCountiesMap />
          </div>

          {/* Priority Counties List */}
          <div>
            <h3 className="font-heading text-2xl font-normal text-foreground mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary stroke-[1.5]" />
              Major Counties
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priorityCounties.map((county) => (
                <Link key={county.id} href={`/arizona/${county.slug}`}>
                  <Card className="p-6 hover:bg-card transition-colors duration-300 cursor-pointer rounded-2xl group">
                    <h4 className="font-heading text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors">{county.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {county.impound_daily_fee && `Impound: $${county.impound_daily_fee}/day`}
                      {!county.impound_daily_fee && 'View county information'}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Guide
                      <ChevronRight className="h-4 w-4 ml-1 stroke-[1.5]" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {counties.length > 10 && (
              <div className="mt-6">
                <details>
                  <summary className="cursor-pointer text-primary font-semibold hover:text-primary/80 transition-colors">
                    View all {counties.length} counties in {state.name}
                  </summary>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {counties.slice(10).map((county) => (
                      <Link
                        key={county.id}
                        href={`/arizona/${county.slug}`}
                        className="text-primary hover:text-primary/80 hover:underline transition-colors"
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
          <Card className="p-8 md:p-12 rounded-2xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              Understanding {state.legal_term} in {state.name}
            </h2>

            <div className="space-y-8 max-w-none">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">What is {state.legal_term}?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In {state.name}, driving under the influence is referred to as <strong>{state.legal_term}</strong>.
                  Arizona has some of the strictest DUI laws in the United States, with mandatory jail time
                  even for first-time offenders.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">Arizona's Three DUI Categories</h3>
                <div className="bg-accent border-l-4 border-primary p-6 my-4 rounded-lg">
                  <p className="text-foreground font-semibold mb-3">Arizona is unique in having three DUI levels:</p>
                  <ul className="text-muted-foreground space-y-2 leading-relaxed">
                    <li>
                      <strong>Standard DUI</strong> - BAC 0.08% to 0.149%
                    </li>
                    <li>
                      <strong>Extreme DUI</strong> - BAC 0.15% to 0.199%
                    </li>
                    <li>
                      <strong>Super Extreme DUI</strong> - BAC 0.20% or higher
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    Each category has increasingly severe mandatory penalties, including jail time, fines,
                    and license suspension periods.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">Legal BAC Limits</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  The legal blood alcohol concentration (BAC) limits in {state.name} are:
                </p>
                <ul className="text-muted-foreground space-y-2 leading-relaxed">
                  <li><strong>0.08%</strong> for drivers 21 and older</li>
                  <li><strong>0.04%</strong> for commercial drivers</li>
                  <li><strong>Any detectable amount</strong> for drivers under 21</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">Implied Consent Law</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By driving in {state.name}, you automatically consent to chemical testing if arrested for {state.legal_term}.
                  Refusing a breath or blood test results in automatic license suspension for 12 months for a first refusal,
                  and 24 months for subsequent refusals.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">Mandatory Ignition Interlock</h3>
                <div className="bg-accent border-l-4 border-primary p-6 my-4 rounded-lg">
                  <p className="text-foreground font-semibold mb-3">Arizona requires ignition interlock devices for ALL DUI convictions</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike many states, Arizona mandates ignition interlock installation even for first-time offenders.
                    The device must remain installed for the entire suspension period and beyond, depending on the offense level.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">Time-Sensitive Deadlines</h3>
                <ul className="text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <strong>{state.dmv_deadline_days || 15} days</strong> to request {state.admin_hearing_term || 'MVD hearing'}
                  </li>
                  <li>Vehicle impound fees accrue daily</li>
                  <li>Court arraignment typically within 2-3 weeks</li>
                  <li>Jail time must usually be served within 6 months of conviction</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

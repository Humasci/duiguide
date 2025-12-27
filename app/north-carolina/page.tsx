import { createClient } from '@/lib/supabase/server';
import NorthCarolinaCountiesMap from '@/components/ui/ui-showcase/NorthCarolinaCountiesMap';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

// NC priority counties
const PRIORITY_COUNTIES = ['Mecklenburg', 'Wake', 'Guilford', 'Forsyth', 'Cumberland', 'Durham', 'Buncombe', 'Gaston', 'New Hanover', 'Union'];

async function getStateData() {
  const supabase = await createClient();

  const { data: state, error: stateError } = await supabase
    .from('states')
    .select('*')
    .eq('slug', 'north-carolina')
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

export default async function NorthCarolinaPage() {
  const data = await getStateData();

  if (!data) {
    notFound();
  }

  const { state, counties } = data;

  // Get priority counties from the database that match our list
  const priorityCounties = PRIORITY_COUNTIES
    .map(name => counties.find(c => c.name === name))
    .filter(Boolean);

  // Get remaining counties (excluding priority ones)
  const otherCounties = counties.filter(c => !PRIORITY_COUNTIES.includes(c.name));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Horizontal State Layout (like Tennessee) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />

        <div className="relative bg-card/50 border-b border-border">
          <div className="container max-w-7xl py-6 md:py-8">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div className="flex-1 max-w-2xl">
                {/* Urgency Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                  {state.dmv_deadline_days || 10}-Day Deadline
                </div>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-3 leading-[1.1] tracking-tight">
                  North Carolina DWI Guide
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Complete guide to DWI laws, penalties, and procedures in North Carolina.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                <Button
                  asChild
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-5 py-5 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/north-carolina/dmv-hearing">
                    Request Hearing
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 py-5 border-2 hover:bg-muted/50"
                >
                  <Link href="/find-attorney/north-carolina">
                    Find Attorney
                  </Link>
                </Button>
              </div>
            </div>

            {/* Full-Width County Map - Horizontal State Layout */}
            <div className="mb-2">
              <div className="text-center mb-2">
                <span className="text-xs text-muted-foreground">Select your county for local DWI information</span>
              </div>
              <NorthCarolinaCountiesMap />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <div className="py-4 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-b border-destructive/10">
        <div className="container max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">
              Request DMV Hearing within <span className="text-destructive font-semibold">{state.dmv_deadline_days || 10} days</span> or face automatic suspension
            </p>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4 font-medium"
            >
              <Link href="/north-carolina/dmv-hearing">
                Learn more
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl py-12 md:py-16 space-y-12 md:space-y-16">
        {/* Major Counties */}
        <section>
          <div className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-2">Major Counties</h2>
            <p className="text-muted-foreground">
              County-specific courts, impound lots, bail, and local procedures
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {priorityCounties.length > 0 ? (
              priorityCounties.map((county) => county && (
                <Link key={county.id} href={`/north-carolina/${county.slug}`}>
                  <Card className="p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl group h-full">
                    <h4 className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {county.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {county.impound_daily_fee ? `$${county.impound_daily_fee}/day` : 'View info'}
                    </p>
                  </Card>
                </Link>
              ))
            ) : (
              PRIORITY_COUNTIES.map((name) => (
                <Link key={name} href={`/north-carolina/${name.toLowerCase().replace(' ', '-')}`}>
                  <Card className="p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl group h-full">
                    <h4 className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {name}
                    </h4>
                    <p className="text-xs text-muted-foreground">View info</p>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* All Other Counties */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {counties.length > 0 ? `All ${counties.length} Counties` : 'All 100 Counties'}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1">
              {otherCounties.length > 0 ? (
                otherCounties.map((county) => (
                  <Link
                    key={county.id}
                    href={`/north-carolina/${county.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-0.5 truncate"
                    title={county.name}
                  >
                    {county.name}
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-sm text-muted-foreground">
                  Select a county from the map above
                </p>
              )}
            </div>
          </div>
        </section>

        {/* State-Specific Information */}
        <section>
          <Card className="p-8 md:p-12 rounded-2xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              Understanding DWI in North Carolina
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">What is DWI?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    North Carolina uses the term <strong>DWI</strong> (Driving While Impaired) rather than DUI.
                    A DWI charge can result from alcohol, drugs, or any impairing substance.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Legal BAC Limit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The legal blood alcohol concentration (BAC) limit in North Carolina is <strong>0.08%</strong> for drivers
                    21 and older, <strong>0.04%</strong> for commercial drivers, and <strong>any detectable amount</strong> for drivers under 21.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Implied Consent Law</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By driving in North Carolina, you automatically consent to chemical testing if arrested for DWI.
                    Refusing a breath test results in automatic license suspension for at least one year.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Time-Sensitive Deadlines</h3>
                  <ul className="text-muted-foreground space-y-2 leading-relaxed list-disc list-inside">
                    <li><strong>{state.dmv_deadline_days || 10} days</strong> to request DMV hearing</li>
                    <li>Vehicle impound fees accrue daily</li>
                    <li>Court arraignment typically within 2-4 weeks</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="p-12 bg-foreground rounded-2xl text-center">
            <h2 className="font-heading text-3xl font-normal text-background mb-4">
              Need Legal Help in North Carolina?
            </h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Connect with experienced DWI attorneys who understand North Carolina law
              and can fight for your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/find-attorney/north-carolina">
                  Get Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-background hover:bg-background/10 border-2 border-background/20 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/guide">
                  Learn More
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

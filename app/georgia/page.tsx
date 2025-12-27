import { createClient } from '@/lib/supabase/server';
import GeorgiaCountiesMap from '@/components/ui/ui-showcase/GeorgiaCountiesMap';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Georgia priority counties
const PRIORITY_COUNTIES = ['Fulton', 'Gwinnett', 'Cobb', 'DeKalb', 'Clayton', 'Cherokee', 'Forsyth', 'Henry', 'Chatham', 'Richmond'];

async function getStateData() {
  const supabase = await createClient();

  const { data: state, error: stateError } = await supabase
    .from('states')
    .select('*')
    .eq('slug', 'georgia')
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

export default async function GeorgiaPage() {
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
      {/* Hero Section - Vertical State Layout (like Texas) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />

        <div className="relative bg-card/50 border-b border-border">
          <div className="container max-w-7xl py-6 md:py-8">
            {/* Hero Header Row - Title + Map aligned at top */}
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start mb-8">
              {/* Left - Title and CTAs */}
              <div>
                {/* Urgency Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                  {state?.dmv_deadline_days || 30}-Day Deadline
                </div>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal mb-3 text-foreground leading-[1.1] tracking-tight">
                  Georgia DUI Guide
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                  Complete guide to DUI laws, penalties, and procedures in Georgia.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-5 py-5 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/georgia/dmv-hearing">
                      Request ALS Hearing
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-5 py-5 border-2 hover:bg-muted/50"
                  >
                    <Link href="/find-attorney/georgia">
                      Talk to Attorney
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - County Map (Desktop Only) - Aligned with headline */}
              <div className="hidden lg:block">
                <div className="text-center mb-2">
                  <p className="text-xs text-muted-foreground">Click a county on the map</p>
                </div>
                <GeorgiaCountiesMap />
              </div>
            </div>

            {/* Major Counties Section */}
            <div>
              <div className="mb-4">
                <h2 className="font-heading text-xl font-normal text-foreground mb-1">Major Counties</h2>
                <p className="text-sm text-muted-foreground">
                  County-specific courts, impound lots, bail, and local procedures
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {priorityCounties.length > 0 ? (
                  priorityCounties.map((county) => county && (
                    <Link key={county.id} href={`/georgia/${county.slug}`}>
                      <Card className="p-3 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl group h-full">
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
                  // Fallback if no counties in database
                  PRIORITY_COUNTIES.map((name) => (
                    <Link key={name} href={`/georgia/${name.toLowerCase().replace(' ', '-')}`}>
                      <Card className="p-3 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl group h-full">
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
                  {counties.length > 0 ? `All ${counties.length} Counties` : 'All 159 Counties'}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1">
                  {otherCounties.length > 0 ? (
                    otherCounties.map((county) => (
                      <Link
                        key={county.id}
                        href={`/georgia/${county.slug}`}
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
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <div className="py-4 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-b border-destructive/10">
        <div className="container max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">
              Request ALS Hearing within <span className="text-destructive font-semibold">{state?.dmv_deadline_days || 30} days</span> or face automatic suspension
            </p>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4 font-medium"
            >
              <Link href="/georgia/dmv-hearing">
                Learn more
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl py-12 md:py-16 space-y-12 md:space-y-16">
        {/* State-Specific Information */}
        <section>
          <Card className="p-8 md:p-12 rounded-2xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              Understanding DUI in Georgia
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">What is DUI?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Georgia uses the term <strong>DUI</strong> (Driving Under the Influence) for impaired driving.
                    You can be charged with DUI if you are impaired by alcohol, drugs, or a combination of both.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Legal BAC Limit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The legal blood alcohol concentration (BAC) limit in Georgia is <strong>0.08%</strong> for drivers
                    21 and older, <strong>0.04%</strong> for commercial drivers, and <strong>0.02%</strong> for drivers under 21.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Implied Consent Law</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By driving in Georgia, you automatically consent to chemical testing if arrested for DUI.
                    Refusing a breath, blood, or urine test results in automatic license suspension for one year.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Time-Sensitive Deadlines</h3>
                  <ul className="text-muted-foreground space-y-2 leading-relaxed list-disc list-inside">
                    <li><strong>{state?.dmv_deadline_days || 30} days</strong> to request ALS hearing</li>
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
              Need Legal Help in Georgia?
            </h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Connect with experienced DUI attorneys who understand Georgia law
              and can fight for your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/find-attorney/georgia">
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

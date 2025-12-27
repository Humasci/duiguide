import { createClient } from '@/lib/supabase/server';
import TennesseeCountiesMap from '@/components/ui/ui-showcase/TennesseeCountiesMap';
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
  ChevronRight,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

async function getStateData() {
  const supabase = await createClient();

  const { data: state, error: stateError } = await supabase
    .from('states')
    .select('*')
    .eq('slug', 'tennessee')
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

export default async function TennesseePage() {
  const data = await getStateData();

  if (!data) {
    notFound();
  }

  const { state, counties } = data;

  // Priority counties (top 10)
  const priorityCounties = counties.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - 1 Column Layout for Horizontal State */}
      <div className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />

        <div className="relative bg-card/50 border-b border-border">
          <div className="container max-w-7xl py-6 md:py-8">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div className="flex-1 max-w-2xl">
                {/* Urgency Badge with pulse */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                  {state.dmv_deadline_days || 10}-Day Deadline
                </div>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-3 leading-[1.1] tracking-tight">
                  Tennessee DUI Guide
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Complete guide to DUI laws, penalties, and procedures in Tennessee.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                <Button
                  asChild
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-5 py-5 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/tennessee/dmv-hearing">
                    <Clock className="h-4 w-4" />
                    Request Hearing
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 py-5 border-2 hover:bg-muted/50"
                >
                  <Link href="/find-attorney/tennessee">
                    <Phone className="h-4 w-4" />
                    Find Attorney
                  </Link>
                </Button>
              </div>
            </div>

            {/* Full-Width County Map - Horizontal State Layout */}
            <div className="mb-2">
              <div className="text-center mb-2">
                <span className="text-xs text-muted-foreground">Select your county for local DUI information</span>
              </div>
              <TennesseeCountiesMap />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner - Refined */}
      <div className="py-4 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-b border-destructive/10">
        <div className="container max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/15 rounded-xl">
                <AlertTriangle className="h-4 w-4 text-destructive stroke-[2]" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Request DMV Hearing within <span className="text-destructive font-semibold">{state.dmv_deadline_days || 10} days</span> or face automatic suspension
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4 font-medium"
            >
              <Link href="/tennessee/dmv-hearing">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl py-16 space-y-16">
        {/* Quick Actions */}
        <section>
          <h2 className="font-heading text-3xl font-normal text-foreground mb-8">What You Need to Do Now</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tennessee/dmv-hearing">
              <Card className="p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl h-full">
                <div className="p-3 bg-destructive/10 rounded-xl w-fit mb-4">
                  <Clock className="h-6 w-6 text-destructive stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Request DMV Hearing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {state.dmv_deadline_days || 10}-day deadline to save your license
                </p>
              </Card>
            </Link>

            <Link href="/find-attorney/tennessee">
              <Card className="p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl h-full">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <Scale className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Find an Attorney</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect with experienced DUI lawyers
                </p>
              </Card>
            </Link>

            <Link href="/guide/after-arrest">
              <Card className="p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl h-full">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <Car className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">Get Your Car</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Retrieve vehicle from impound lots
                </p>
              </Card>
            </Link>

            <Link href="/guide/scram-bracelet">
              <Card className="p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl h-full">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <Shield className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-lg font-normal text-foreground mb-2">SCRAM Monitoring</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ankle monitor requirements & providers
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Major Counties */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-normal text-foreground mb-2">Major Counties</h2>
              <p className="text-muted-foreground">
                County-specific courts, impound lots, bail, and local procedures
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 stroke-[1.5]" />
              {counties.length || 95} counties
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {priorityCounties.length > 0 ? (
              priorityCounties.map((county) => (
                <Link key={county.id} href={`/tennessee/${county.slug}`}>
                  <Card className="p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl group h-full">
                    <h4 className="font-heading text-base font-normal text-foreground mb-1 group-hover:text-primary transition-colors">
                      {county.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {county.impound_daily_fee && `Impound: $${county.impound_daily_fee}/day`}
                      {!county.impound_daily_fee && 'View county info'}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Guide
                      <ChevronRight className="h-4 w-4 ml-1 stroke-[1.5]" />
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              // Fallback major counties if none in database
              ['Davidson', 'Shelby', 'Knox', 'Hamilton', 'Rutherford', 'Williamson', 'Montgomery', 'Sumner', 'Wilson', 'Maury'].map((name) => (
                <Link key={name} href={`/tennessee/${name.toLowerCase()}`}>
                  <Card className="p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl group h-full">
                    <h4 className="font-heading text-base font-normal text-foreground mb-1 group-hover:text-primary transition-colors">
                      {name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">View county info</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Guide
                      <ChevronRight className="h-4 w-4 ml-1 stroke-[1.5]" />
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {counties.length > 10 && (
            <div className="mt-8">
              <details className="group">
                <summary className="cursor-pointer text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  View all {counties.length} counties in Tennessee
                </summary>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-border">
                  {counties.slice(10).map((county) => (
                    <Link
                      key={county.id}
                      href={`/tennessee/${county.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {county.name}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          )}
        </section>

        {/* State-Specific Information */}
        <section>
          <Card className="p-8 md:p-12 rounded-2xl">
            <h2 className="font-heading text-3xl font-normal text-foreground mb-8">
              Understanding DUI in Tennessee
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">DUI in Tennessee</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tennessee uses the term <strong>DUI</strong> (Driving Under the Influence) for impaired driving offenses.
                    A first offense is a Class A misdemeanor with mandatory minimum penalties.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Legal BAC Limit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The legal blood alcohol concentration (BAC) limit in Tennessee is <strong>0.08%</strong> for drivers
                    21 and older, <strong>0.04%</strong> for commercial drivers, and <strong>0.02%</strong> for drivers under 21.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Implied Consent Law</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By driving in Tennessee, you automatically consent to chemical testing if arrested for DUI.
                    Refusing a breath or blood test results in automatic license suspension for 1 year.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Time-Sensitive Deadlines</h3>
                  <ul className="text-muted-foreground space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>{state.dmv_deadline_days || 10} days</strong> to request hearing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <span>Vehicle impound fees accrue daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <span>Court arraignment typically within 2-4 weeks</span>
                    </li>
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
              Need Legal Help in Tennessee?
            </h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Connect with experienced DUI attorneys who understand Tennessee law
              and can fight for your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/find-attorney/tennessee">
                  <Phone className="h-4 w-4" />
                  Get Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-background hover:bg-background/10 border-2 border-background/20 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/guide">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

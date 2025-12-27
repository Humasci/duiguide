import { createClient } from '@/lib/supabase/server';
import PenaltyMatrix from '@/components/PenaltyMatrix';
import TexasCountiesMap from '@/components/ui/ui-showcase/TexasCountiesMap';
import DUIActionTimeline from '@/components/DUIActionTimeline';
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
    <div className="min-h-screen bg-background">
      {/* Hero Section - Improved Layout */}
      <div className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />

        <div className="relative bg-card/50 border-b border-border">
          <div className="container max-w-7xl py-6 md:py-8">
            {/* Main Hero Content */}
            <div className="max-w-3xl mb-6">
              {/* Urgency Badge with pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
                {state.dmv_deadline_days || 15}-Day Deadline
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal mb-3 text-foreground leading-[1.1] tracking-tight">
                {state.name} {state.legal_term} Guide
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Complete guide to {state.legal_term} laws, penalties, and procedures in {state.name}.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  asChild
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-5 py-5 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/texas/dmv-hearing">
                    <Clock className="h-4 w-4" />
                    Request ALR Hearing
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 py-5 border-2 hover:bg-muted/50"
                >
                  <Link href="/find-attorney/texas">
                    <Phone className="h-4 w-4" />
                    Talk to Attorney
                  </Link>
                </Button>
              </div>
            </div>

            {/* County Selector + Map Grid */}
            <div className="grid lg:grid-cols-[1fr,auto] gap-6 items-start">
              {/* Left - County Links Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 stroke-[1.5]" />
                    <span>Select your county</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{counties.length} counties</span>
                </div>

                {/* County Links Grid */}
                <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-4">
                  {/* Popular Counties - Highlighted */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Major Counties</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {['Harris', 'Dallas', 'Tarrant', 'Bexar', 'Travis', 'Collin', 'El Paso', 'Fort Bend', 'Denton', 'Hidalgo'].map((name) => {
                        const county = counties.find(c => c.name === name);
                        return county ? (
                          <Link
                            key={county.id}
                            href={`/texas/${county.slug}`}
                            className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium text-center"
                          >
                            {county.name}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* All Counties - Scrollable Grid */}
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">All Counties</span>
                    <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5">
                        {counties.map((county) => (
                          <Link
                            key={county.id}
                            href={`/texas/${county.slug}`}
                            className="px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors truncate"
                            title={county.name}
                          >
                            {county.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - County Map (Desktop Only) */}
              <div className="hidden lg:block">
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-sm">
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Or click the map</span>
                    </div>
                  </div>
                  <TexasCountiesMap />
                </div>
              </div>
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
                Request {state.admin_hearing_term || 'DMV Hearing'} within <span className="text-destructive font-semibold">{state.dmv_deadline_days || 15} days</span> or face automatic suspension
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4 font-medium"
            >
              <Link href="/texas/dmv-hearing">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl py-12 md:py-16 space-y-12 md:space-y-16">
        {/* Action Timeline - Time Sensitive Steps */}
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <DUIActionTimeline
              stateName="Texas"
              dmvDeadlineDays={state.dmv_deadline_days || 15}
            />
          </div>

          {/* Quick Resource Cards */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-normal text-foreground mb-4">
              Quick Resources
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/texas/dmv-hearing">
                <Card className="p-4 hover:border-destructive/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl h-full border-destructive/20 bg-destructive/5">
                  <div className="p-2 bg-destructive/15 rounded-lg w-fit mb-3">
                    <Clock className="h-5 w-5 text-destructive stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading text-sm font-medium text-foreground mb-1">ALR Hearing</h4>
                  <p className="text-xs text-muted-foreground">
                    {state.dmv_deadline_days || 15}-day deadline
                  </p>
                </Card>
              </Link>

              <Link href="/find-attorney/texas">
                <Card className="p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl h-full">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                    <Scale className="h-5 w-5 text-primary stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading text-sm font-medium text-foreground mb-1">Find Attorney</h4>
                  <p className="text-xs text-muted-foreground">
                    Free consultations
                  </p>
                </Card>
              </Link>

              <Link href="/guide/after-arrest">
                <Card className="p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl h-full">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                    <Car className="h-5 w-5 text-primary stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading text-sm font-medium text-foreground mb-1">Get Your Car</h4>
                  <p className="text-xs text-muted-foreground">
                    Impound retrieval
                  </p>
                </Card>
              </Link>

              <Link href="/guide/scram-bracelet">
                <Card className="p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl h-full">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                    <Shield className="h-5 w-5 text-primary stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading text-sm font-medium text-foreground mb-1">SCRAM Monitor</h4>
                  <p className="text-xs text-muted-foreground">
                    Requirements & providers
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Penalty Matrix */}
        <section>
          <PenaltyMatrix state={state} />
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
              {counties.length} counties
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {priorityCounties.map((county) => (
              <Link key={county.id} href={`/texas/${county.slug}`}>
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
            ))}
          </div>

          {counties.length > 10 && (
            <div className="mt-8">
              <details className="group">
                <summary className="cursor-pointer text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                  View all {counties.length} counties in {state.name}
                </summary>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-border">
                  {counties.slice(10).map((county) => (
                    <Link
                      key={county.id}
                      href={`/texas/${county.slug}`}
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
              Understanding {state.legal_term} in {state.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">What is {state.legal_term}?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In {state.name}, driving while intoxicated is referred to as <strong>{state.legal_term}</strong>.
                    {state.legal_term === 'DWI' && ' Note that Texas uses "DWI" (Driving While Intoxicated) rather than "DUI" (Driving Under the Influence).'}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Legal BAC Limit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The legal blood alcohol concentration (BAC) limit in {state.name} is <strong>0.08%</strong> for drivers
                    21 and older, <strong>0.04%</strong> for commercial drivers, and <strong>any detectable amount</strong> for drivers under 21.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Implied Consent Law</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By driving in {state.name}, you automatically consent to chemical testing if arrested for {state.legal_term}.
                    Refusing a breath or blood test results in automatic license suspension.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-normal text-foreground mb-3">Time-Sensitive Deadlines</h3>
                  <ul className="text-muted-foreground space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>{state.dmv_deadline_days || 15} days</strong> to request {state.admin_hearing_term || 'ALR hearing'}</span>
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
              Need Legal Help in {state.name}?
            </h2>
            <p className="text-background/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Connect with experienced {state.legal_term} attorneys who understand Texas law
              and can fight for your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/find-attorney/texas">
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

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Clock, CheckCircle, Phone, MapPin, ArrowRight } from "lucide-react";
import USStatesMap from "@/components/USStatesMap";

// DUI Hero Section with Interactive Map
const DUIHeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />

      <div className="relative pt-8 md:pt-12 pb-6">
        <div className="container max-w-7xl">
          {/* Compact single-line header on large screens */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
            {/* Left Column - Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              {/* Urgency indicator */}
              <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 px-3 py-1.5 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
                <span className="text-xs font-semibold text-destructive tracking-wide uppercase">Time-Sensitive</span>
              </div>

              {/* Heading - larger, more impactful */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-4 text-foreground tracking-tight">
                Arrested for DUI?
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground font-heading font-normal mb-6">
                Get immediate legal help.
              </p>

              {/* Subtext - more concise */}
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed">
                Critical deadlines start within days. Free 24/7 consultations with experienced DUI attorneys.
              </p>

              {/* CTA Buttons - more prominent */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-5 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                  <Phone className="h-4 w-4" />
                  Free Consultation
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 py-5 text-base border-2 hover:bg-muted/50"
                >
                  <Link href="/guide">
                    Learn Your Rights
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Interactive Map */}
            <div className="lg:flex-shrink-0">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-border/50 shadow-sm">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Select your state for local DUI info</span>
                  </div>
                </div>
                <USStatesMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Urgency Banner - More refined
const UrgencyBanner = () => {
  return (
    <section className="py-4 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-y border-destructive/10">
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/15 rounded-xl">
              <Clock className="h-4 w-4 text-destructive stroke-[2]" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                <span className="text-destructive font-semibold">7-15 days</span> to request DMV hearing in most states
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-border" />
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4 font-medium"
          >
            <a href="#deadlines">
              Check deadline
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// DUI Features Section - Refined cards
const DUIFeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Critical Deadlines",
      description: "Request a DMV hearing within 7-15 days of arrest. Missing this deadline means automatic license suspension.",
      link: "/guide/deadlines",
      accent: "destructive"
    },
    {
      icon: Scale,
      title: "Your Legal Rights",
      description: "You have the right to legal representation. An experienced attorney can challenge evidence and reduce penalties.",
      link: "/guide/rights",
      accent: "primary"
    },
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "Connect with local DUI attorneys for free case reviews. Many offer payment plans.",
      link: "tel:8005551234",
      accent: "primary"
    }
  ];

  return (
    <section className="py-16 md:py-20" id="deadlines">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Essential Information</p>
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            What you need to know
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Understanding these critical points can protect your rights and your license.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Accent line at top */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${feature.accent === 'destructive' ? 'bg-destructive/50' : 'bg-primary/30'} group-hover:${feature.accent === 'destructive' ? 'bg-destructive' : 'bg-primary'} transition-colors`} />

              <div className={`p-2.5 ${feature.accent === 'destructive' ? 'bg-destructive/10' : 'bg-primary/10'} rounded-xl w-fit mb-4`}>
                <feature.icon className={`h-5 w-5 ${feature.accent === 'destructive' ? 'text-destructive' : 'text-primary'} stroke-[1.5]`} />
              </div>
              <h3 className="font-heading text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {feature.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// States Selection Section - More polished
const StatesSection = () => {
  const states = [
    { name: "Texas", slug: "texas", abbr: "TX", counties: "254", term: "DWI" },
    { name: "Arizona", slug: "arizona", abbr: "AZ", counties: "15", term: "DUI" },
    { name: "Georgia", slug: "georgia", abbr: "GA", counties: "159", term: "DUI" },
    { name: "North Carolina", slug: "north-carolina", abbr: "NC", counties: "100", term: "DWI" },
    { name: "Colorado", slug: "colorado", abbr: "CO", counties: "64", term: "DUI" },
    { name: "Ohio", slug: "ohio", abbr: "OH", counties: "88", term: "OVI" },
    { name: "Tennessee", slug: "tennessee", abbr: "TN", counties: "95", term: "DUI" },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">State Guides</p>
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            Browse by state
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            DUI laws vary significantly by state. Select yours for specific procedures and deadlines.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {states.map((state) => (
            <Link key={state.slug} href={`/${state.slug}`}>
              <div className="group relative bg-card rounded-xl p-4 md:p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Background state abbreviation */}
                <span className="absolute -right-2 -bottom-3 text-6xl md:text-7xl font-heading font-bold text-muted/30 select-none pointer-events-none">
                  {state.abbr}
                </span>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-heading font-medium text-primary">{state.abbr}</span>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{state.term}</span>
                  </div>
                  <div className="font-heading text-base font-normal text-foreground group-hover:text-primary transition-colors">
                    {state.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{state.counties} counties</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            More states coming soon. <Link href="/notify" className="text-primary font-medium hover:underline">Get notified</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

// CTA Section - More refined
const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container max-w-3xl text-center relative">
        <div className="mb-8">
          <p className="text-sm font-medium text-background/60 tracking-wide uppercase mb-4">24/7 Legal Support</p>
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-4 text-background">
            Don&apos;t face this alone
          </h2>
          <p className="text-base md:text-lg text-background/70 max-w-xl mx-auto leading-relaxed">
            Every minute counts after a DUI arrest. Our partner attorneys are standing by to protect your rights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-background text-foreground hover:bg-background/90 rounded-full px-6 py-5 text-base font-medium shadow-lg">
            <Phone className="h-4 w-4" />
            Free Consultation
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-background hover:bg-background/10 border border-background/20 rounded-full px-6 py-5 text-base font-medium"
          >
            <Link href="/guide">
              Learn more
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main>
      <DUIHeroSection />
      <UrgencyBanner />
      <DUIFeaturesSection />
      <StatesSection />
      <CTASection />
    </main>
  );
}

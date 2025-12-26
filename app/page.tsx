import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Clock, CheckCircle, Phone, MapPin } from "lucide-react";
import USStatesMap from "@/components/USStatesMap";

// DUI Hero Section with Interactive Map
const DUIHeroSection = () => {
  return (
    <section className="pt-12 md:pt-16 pb-8">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Scale className="w-4 h-4 text-primary stroke-[1.5]" />
              <span className="text-sm font-medium text-foreground">DUI Legal Help</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal leading-tight mb-6 text-foreground">
              Arrested for DUI?{" "}
              <span className="text-muted-foreground">Get immediate help.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Critical deadlines start within days of your arrest. Connect with experienced DUI attorneys for free consultations available 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium">
                <Phone className="h-4 w-4" />
                Get Free Consultation
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground rounded-full px-6 py-6 text-base gap-2"
              >
                <Link href="/guide">Learn Your Rights</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Map */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 stroke-[1.5]" />
                <span>Select your state</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Highlighted states have full DUI guides available
              </p>
            </div>
            <USStatesMap />
          </div>
        </div>
      </div>
    </section>
  );
};

// Urgency Banner
const UrgencyBanner = () => {
  return (
    <section className="py-8 bg-destructive/10 border-y border-destructive/20">
      <div className="container max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Clock className="h-5 w-5 text-destructive stroke-[1.5]" />
            </div>
            <div>
              <p className="font-heading text-lg font-normal text-foreground">Time-Critical Deadline</p>
              <p className="text-sm text-muted-foreground">Most states: 7-15 days to request DMV hearing</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-destructive/20" />
          <Button
            asChild
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-full"
          >
            <a href="#deadlines">Check Your Deadline →</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// DUI Features Section
const DUIFeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Critical Deadlines",
      description: "Most states require you to request a DMV hearing within 7-15 days of arrest. Missing this deadline results in automatic suspension.",
      link: "/guide/deadlines"
    },
    {
      icon: Scale,
      title: "Your Legal Rights",
      description: "You have the right to legal representation. An experienced DUI attorney can challenge evidence and reduce penalties.",
      link: "/guide/rights"
    },
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "Connect with local DUI attorneys for free consultations. Many offer payment plans and will review your case at no cost.",
      link: "tel:8005551234"
    }
  ];

  return (
    <section className="py-20" id="deadlines">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            What you need to know
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            After a DUI arrest, understanding these critical points can protect your rights and your license.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-5">
                <feature.icon className="h-6 w-6 text-primary stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-xl font-normal text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                <Link href={feature.link}>Learn more →</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// States Selection Section
const StatesSection = () => {
  const states = [
    { name: "Texas", slug: "texas", abbr: "TX", counties: "254 counties" },
    { name: "Arizona", slug: "arizona", abbr: "AZ", counties: "15 counties" },
    { name: "Georgia", slug: "georgia", abbr: "GA", counties: "159 counties" },
    { name: "North Carolina", slug: "north-carolina", abbr: "NC", counties: "100 counties" },
    { name: "Colorado", slug: "colorado", abbr: "CO", counties: "64 counties" },
    { name: "Ohio", slug: "ohio", abbr: "OH", counties: "88 counties" },
    { name: "Tennessee", slug: "tennessee", abbr: "TN", counties: "95 counties" },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            Browse by state
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DUI laws and procedures vary significantly by state. Get specific information for your location.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {states.map((state) => (
            <Link key={state.slug} href={`/${state.slug}`}>
              <div className="bg-background rounded-2xl p-6 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-heading font-normal text-primary">{state.abbr}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{state.counties}</span>
                </div>
                <div className="font-heading text-lg font-normal text-foreground group-hover:text-primary transition-colors">
                  {state.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">DUI laws & procedures</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            More states coming soon. <Link href="/notify" className="text-primary hover:underline">Get notified</Link> when we add your state.
          </p>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container max-w-4xl text-center">
        <div className="mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-4 text-background">
            Don&apos;t face this alone
          </h2>
          <p className="text-lg text-background/80 max-w-2xl mx-auto leading-relaxed">
            Every minute counts after a DUI arrest. Our partner attorneys are standing by 24/7 to protect your rights and fight for your future.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium">
            <Phone className="h-4 w-4" />
            Call (800) 555-1234
          </Button>
          <Button variant="ghost" className="text-background hover:bg-background/10 border-2 border-background/20 rounded-full px-8 py-6 text-base font-medium">
            <Link href="/guide">Learn more →</Link>
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

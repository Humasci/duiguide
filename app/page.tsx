import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Clock, CheckCircle, Phone, AlertTriangle } from "lucide-react";

// DUI Hero Section
const DUIHeroSection = () => {
  return (
    <section className="pt-16 pb-8">
      <div className="container max-w-4xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4">
            <Scale className="h-16 w-16 text-foreground stroke-[1.5]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-foreground">
          Arrested for DUI?{" "}
          <span className="text-muted-foreground">Get immediate help.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Critical deadlines start within days of your arrest. Connect with experienced DUI attorneys for free consultations available 24/7 to protect your license and your future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
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

      {/* Hero Illustration */}
      <div className="container max-w-5xl mt-12">
        <div className="bg-card rounded-3xl p-8 md:p-12 min-h-[400px] flex items-center justify-center">
          <div className="flex items-end gap-4 md:gap-8 transform -rotate-6">
            {/* Legal Document */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-36 md:w-48 transform rotate-[-8deg]">
              <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center p-4">
                <div className="text-primary font-heading text-[10px] md:text-xs font-bold tracking-wider">DUI</div>
                <div className="text-muted-foreground text-[8px] md:text-[10px] mt-1">ARREST</div>
                <div className="mt-4 w-full space-y-1.5">
                  <div className="h-1.5 bg-border rounded w-3/4 mx-auto" />
                  <div className="h-1.5 bg-border rounded w-1/2 mx-auto" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">arrest-citation.pdf</p>
            </div>

            {/* Clock Card */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-32 md:w-40 transform rotate-[5deg] z-10">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground/50 font-heading text-lg md:text-xl">15 DAYS</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Legal Help Folder */}
            <div className="transform rotate-[12deg]">
              <div className="relative">
                <div className="w-32 md:w-44 h-24 md:h-32 bg-primary rounded-lg rounded-tl-none shadow-lg" />
                <div className="absolute -top-3 left-0 w-12 md:w-16 h-3 bg-primary rounded-t-lg" />
                <span className="absolute bottom-3 left-3 text-background/90 text-xs md:text-sm font-medium">Legal Help</span>
              </div>
            </div>
          </div>
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
    <section className="py-20">
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
              className="group p-6 rounded-2xl hover:bg-card transition-colors duration-300"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4 stroke-[1.5]" />
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
    { name: "Texas", slug: "texas" },
    { name: "Arizona", slug: "arizona" },
    { name: "Georgia", slug: "georgia" },
    { name: "North Carolina", slug: "north-carolina" },
    { name: "Colorado", slug: "colorado" },
    { name: "Ohio", slug: "ohio" },
    { name: "Tennessee", slug: "tennessee" },
  ];

  return (
    <section className="py-20 bg-surface-warm">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            Select your state
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DUI laws and procedures vary significantly by state. Get specific information for your location.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {states.map((state) => (
            <Link key={state.slug} href={`/${state.slug}`}>
              <div className="bg-background rounded-lg p-4 border border-border hover:shadow-md transition-all duration-200 text-center group">
                <div className="font-heading font-normal text-base text-foreground group-hover:text-primary transition-colors">{state.name}</div>
                <div className="text-sm text-muted-foreground mt-1">DUI laws & procedures</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-4 text-background">
            Don't face this alone
          </h2>
          <p className="text-lg text-background/80 max-w-2xl mx-auto">
            Every minute counts after a DUI arrest. Our partner attorneys are standing by 24/7 to protect your rights.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-background text-foreground hover:bg-background/90">
            <Phone className="h-4 w-4" />
            Call (800) 555-1234
          </Button>
          <Button variant="ghost" className="text-background hover:bg-background/10 border border-background/20">
            <Link href="/guide">Learn more</Link>
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
      <DUIFeaturesSection />
      <StatesSection />
      <CTASection />
    </main>
  );
}
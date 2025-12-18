import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Scale, Car, Shield, AlertTriangle, Phone, MapPin } from "lucide-react";

// Arizona Hero Section
const ArizonaHeroSection = () => {
  return (
    <section className="pt-16 pb-8">
      <div className="container max-w-4xl text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
            <AlertTriangle className="w-3 h-3 mr-2" />
            URGENT: 15 Day MVD Hearing Deadline
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4">
            <MapPin className="h-16 w-16 text-foreground stroke-[1.5]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-foreground">
          Arizona DUI Guide
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Complete guide to DUI process, penalties, and procedures in Arizona. Get help with MVD hearings, court proceedings, and license restoration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-8 py-6 text-base font-medium">
            <Link href="/arizona/dmv-hearing">Request MVD Hearing</Link>
          </Button>
          <Button 
            asChild
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground rounded-full px-6 py-6 text-base gap-2"
          >
            <Link href="/find-attorney/arizona">Find Attorney</Link>
          </Button>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="container max-w-5xl mt-12">
        <div className="bg-card rounded-3xl p-8 md:p-12 min-h-[400px] flex items-center justify-center">
          <div className="flex items-end gap-4 md:gap-8 transform -rotate-6">
            {/* MVD Document */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-36 md:w-48 transform rotate-[-8deg]">
              <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center p-4">
                <div className="text-destructive font-heading text-[10px] md:text-xs font-bold tracking-wider">MVD</div>
                <div className="text-muted-foreground text-[8px] md:text-[10px] mt-1">HEARING</div>
                <div className="mt-4 w-full space-y-1.5">
                  <div className="h-1.5 bg-border rounded w-3/4 mx-auto" />
                  <div className="h-1.5 bg-border rounded w-1/2 mx-auto" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">mvd-hearing.pdf</p>
            </div>

            {/* 15 Days Card */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-32 md:w-40 transform rotate-[5deg] z-10">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground/50 font-heading text-lg md:text-xl">15 DAYS</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-destructive" />
                </div>
              </div>
            </div>

            {/* Arizona Folder */}
            <div className="transform rotate-[12deg]">
              <div className="relative">
                <div className="w-32 md:w-44 h-24 md:h-32 bg-primary rounded-lg rounded-tl-none shadow-lg" />
                <div className="absolute -top-3 left-0 w-12 md:w-16 h-3 bg-primary rounded-t-lg" />
                <span className="absolute bottom-3 left-3 text-background/90 text-xs md:text-sm font-medium">Arizona</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Arizona Key Information Section
const ArizonaKeyInfoSection = () => {
  const keyInfo = [
    {
      icon: Clock,
      title: "MVD Implied Consent Hearing",
      description: "Request your administrative hearing within 15 days to challenge license suspension.",
      details: [
        { label: "Deadline", value: "15 days from arrest", urgent: true },
        { label: "Fee", value: "$500", urgent: false },
        { label: "Phone", value: "(602) 712-7355", urgent: false }
      ],
      link: "/arizona/dmv-hearing",
      buttonText: "Request Hearing",
      variant: "destructive" as const
    },
    {
      icon: Scale,
      title: "Arizona DUI Penalties", 
      description: "Understanding Arizona's strict DUI laws and potential consequences.",
      details: [
        { label: "First Offense", value: "10+ days jail", urgent: false },
        { label: "Extreme DUI", value: "30+ days jail", urgent: false },
        { label: "License", value: "90-365 day suspension", urgent: false }
      ],
      link: "/arizona/penalties",
      buttonText: "View Penalties",
      variant: "default" as const
    }
  ];

  return (
    <section className="py-20 bg-surface-warm">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {keyInfo.map((info, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-background border border-border hover:shadow-md transition-all duration-300"
            >
              <info.icon className={`h-12 w-12 mb-6 stroke-[1.5] ${info.variant === 'destructive' ? 'text-destructive' : 'text-primary'}`} />
              <h3 className="font-heading text-2xl font-normal text-foreground mb-3">
                {info.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {info.description}
              </p>
              <div className="space-y-2 mb-6">
                {info.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center gap-2 text-sm">
                    <span className={`font-medium ${detail.urgent ? 'text-destructive' : 'text-foreground'}`}>
                      {detail.label}:
                    </span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
              <Button 
                asChild 
                variant={info.variant}
                className={info.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
              >
                <Link href={info.link}>{info.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Arizona Counties Section
const ArizonaCountiesSection = () => {
  const counties = [
    { name: "Maricopa County", cities: "Phoenix, Scottsdale, Mesa, Tempe, Chandler, Glendale", slug: "maricopa" },
    { name: "Pima County", cities: "Tucson, Oro Valley, South Tucson", slug: "pima" },
    { name: "Pinal County", cities: "Casa Grande, Maricopa, Eloy", slug: "pinal" },
    { name: "Yavapai County", cities: "Prescott, Sedona, Cottonwood", slug: "yavapai" },
    { name: "Yuma County", cities: "Yuma, Somerton, San Luis", slug: "yuma" },
    { name: "Mohave County", cities: "Lake Havasu City, Kingman, Bullhead City", slug: "mohave" },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            Arizona Counties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find county-specific information for courts, impound lots, bail bonds, and other services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {counties.map((county) => (
            <div key={county.slug} className="group p-6 rounded-2xl hover:bg-card transition-colors duration-300">
              <h3 className="font-heading text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors">
                {county.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {county.cities}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/arizona/${county.slug}`}>View County Info</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Arizona Services Section
const ArizonaServicesSection = () => {
  const services = [
    { title: "Vehicle Impound", desc: "Get your vehicle released from impound lots across Arizona.", href: "/arizona/towing-impound", icon: Car },
    { title: "Bail Bonds", desc: "Find bail bond agents serving Arizona counties.", href: "/arizona/bail-bonds", icon: Shield },
    { title: "Ignition Interlock", desc: "Find certified ignition interlock installers in Arizona.", href: "/arizona/ignition-interlock", icon: Car },
    { title: "SCRAM Monitoring", desc: "Continuous alcohol monitoring providers in Arizona.", href: "/arizona/scram", icon: Shield },
    { title: "DUI School", desc: "Court-approved DUI education programs in Arizona.", href: "/arizona/dui-school", icon: Scale },
    { title: "SR-22 Insurance", desc: "Get required SR-22 filing for license reinstatement.", href: "/arizona/sr22-insurance", icon: Shield },
  ];

  return (
    <section className="py-20 bg-surface-warm">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            DUI-Related Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential services you may need during the DUI process in Arizona.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl hover:bg-card transition-colors duration-300 text-center"
            >
              <service.icon className="h-8 w-8 text-primary mb-4 stroke-[1.5] mx-auto" />
              <h3 className="font-heading text-lg font-normal text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.desc}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={service.href}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Arizona CTA Section
const ArizonaCTASection = () => {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-4 text-background">
            Need Legal Representation?
          </h2>
          <p className="text-lg text-background/80 max-w-2xl mx-auto">
            Connect with experienced Arizona DUI attorneys who understand local courts and procedures.
          </p>
        </div>
        
        <Button asChild className="bg-background text-foreground hover:bg-background/90">
          <Link href="/find-attorney/arizona">Find Arizona DUI Attorney</Link>
        </Button>
      </div>
    </section>
  );
};

export default function ArizonaPage() {
  return (
    <main>
      <ArizonaHeroSection />
      <ArizonaKeyInfoSection />
      <ArizonaCountiesSection />
      <ArizonaServicesSection />
      <ArizonaCTASection />
    </main>
  );
}
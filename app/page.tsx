import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Phone,
  Scale,
  Shield,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Claude 50/50 Split */}
      <section className="section-lg">
        <div className="content-container">
          <div className="grid-50-50">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                <Clock className="h-3.5 w-3.5" />
                Critical deadlines start at 7 days
              </div>

              <h1 className="mb-6">
                Arrested for DUI?
              </h1>

              <p className="mb-4 text-xl text-muted-foreground">
                Get immediate help understanding your rights and critical deadlines.
              </p>

              <p className="mb-8 text-lg text-muted-foreground">
                Connect with experienced local DUI attorneys for free consultations. Available 24/7 to protect your license and your future.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="tel:+18005551234">
                  <Button size="lg" className="w-full sm:w-auto rounded-full">
                    <Phone className="h-4 w-4" />
                    Call Now - Free Help
                  </Button>
                </a>
                <Link href="/resources/deadline-checker">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2">
                    Check Your Deadline
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No obligation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Local attorneys</span>
                </div>
              </div>
            </div>

            {/* Sketch Placeholder - Right Side */}
            <div className="flex items-center justify-center">
              <div className="sketch-placeholder">
                {/* Placeholder for sketch illustration */}
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center border border-primary/10">
                  <Clock className="h-32 w-32 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards - 3 Column */}
      <section className="section section-muted">
        <div className="content-container">
          <div className="text-center content-narrow mb-12">
            <h2 className="mb-4">What you need to know</h2>
            <p className="text-lg text-muted-foreground">
              After a DUI arrest, understanding these critical points can protect your rights and your license.
            </p>
          </div>

          <div className="grid-features">
            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
                  <Clock className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="mb-3 text-xl">Critical deadlines</h3>
                <p className="text-muted-foreground mb-4">
                  Most states require you to request a DMV hearing within 7-15 days of arrest. Missing this deadline results in automatic suspension.
                </p>
                <Link href="/resources/deadline-checker" className="text-primary font-medium hover:underline">
                  Calculate my deadline →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Scale className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl">Your legal rights</h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to legal representation. An experienced DUI attorney can challenge evidence and reduce penalties.
                </p>
                <Link href="/guide/after-arrest" className="text-primary font-medium hover:underline">
                  Learn your rights →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
                  <Shield className="h-7 w-7 text-success" />
                </div>
                <h3 className="mb-3 text-xl">Free consultation</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with local DUI attorneys for free consultations. Many offer payment plans and will review your case at no cost.
                </p>
                <a href="tel:+18005551234" className="text-primary font-medium hover:underline">
                  Call now →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State Selection */}
      <section className="section">
        <div className="content-container">
          <div className="text-center content-narrow mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              State-specific guidance
            </div>
            <h2 className="mb-4">Select your state</h2>
            <p className="text-lg text-muted-foreground">
              DUI laws and procedures vary significantly by state. Get specific information for your location.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Texas", slug: "texas" },
              { name: "Arizona", slug: "arizona" },
              { name: "California", slug: "california" },
              { name: "Florida", slug: "florida" },
              { name: "Georgia", slug: "georgia" },
              { name: "North Carolina", slug: "north-carolina" },
              { name: "Colorado", slug: "colorado" },
              { name: "Ohio", slug: "ohio" },
            ].map((state) => (
              <Link key={state.slug} href={`/${state.slug}`}>
                <Card className="card-hover border-0 shadow-sm cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <span className="font-semibold text-base">{state.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Inverted Section */}
      <section className="section section-inverted">
        <div className="content-container">
          <div className="text-center content-narrow">
            <h2 className="mb-4 text-background">Don't face this alone</h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Every minute counts after a DUI arrest. Our partner attorneys are standing by 24/7 to protect your rights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18005551234">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto rounded-full">
                  <Phone className="h-4 w-4" />
                  Call (800) 555-1234
                </Button>
              </a>
              <Link href="/resources/deadline-checker">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2 border-background/20 text-background hover:bg-background/10">
                  Check deadline
                </Button>
              </Link>
            </div>

            <p className="text-sm mt-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Free consultation • No obligation • Confidential
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

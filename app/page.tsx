import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Clock,
  Phone,
  Scale,
  Shield,
  CheckCircle,
  Users,
  Award,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Urgency Badge */}
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive">
                <Clock className="h-4 w-4" />
                Time-Sensitive: Deadlines Starting at 7 Days
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Arrested for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DUI?
              </span>
            </h1>

            <p className="mb-4 text-xl sm:text-2xl text-muted-foreground font-medium">
              Get immediate help understanding your rights and critical deadlines
            </p>

            <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with experienced local DUI attorneys for free consultations.
              Available 24/7 to protect your license and your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="tel:+18005551234" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  <Phone className="h-5 w-5" />
                  Call Now - Free Consultation
                </Button>
              </a>
              <Link href="/resources/deadline-checker" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2">
                  <Clock className="h-5 w-5" />
                  Check Your Deadline
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Local Attorneys</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Alert Banner */}
      <section className="border-y bg-destructive/5 py-4">
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm md:text-base font-medium text-destructive">
              <strong>Critical Deadline:</strong> You may have as few as 7-15 days to request a DMV hearing.
              <Link href="/resources/deadline-checker" className="underline ml-1 font-semibold hover:text-destructive/80">
                Check your deadline now →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-muted/30">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">7-30</div>
              <div className="text-sm text-muted-foreground">Days to Request Hearing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-sm text-muted-foreground">Attorneys in Network</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Help Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information Cards - Enhanced */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You Need to Know Right Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              After a DUI arrest, understanding these critical points can make the difference
              in protecting your rights and your license.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-xl">Critical Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Most states require you to request a DMV hearing within <strong>7-15 days</strong> of arrest
                  to protect your license. Missing this deadline can result in automatic suspension.
                </p>
                <Link href="/resources/deadline-checker">
                  <Button variant="outline" size="sm" className="w-full">
                    Calculate My Deadline
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Your Legal Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  You have the right to legal representation. An experienced DUI attorney can help
                  protect your rights, challenge evidence, and potentially reduce penalties.
                </p>
                <Link href="/guide/after-arrest">
                  <Button variant="outline" size="sm" className="w-full">
                    Learn Your Rights
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Free Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with local DUI attorneys for free consultations. Many attorneys offer
                  payment plans and will review your case at no cost.
                </p>
                <a href="tel:+18005551234">
                  <Button size="sm" className="w-full">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State Selection - Redesigned */}
      <section id="select-state" className="section section-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <MapPin className="h-4 w-4" />
              State-Specific Guidance
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Select Your State</h2>
            <p className="text-lg text-muted-foreground">
              DUI laws and procedures vary significantly by state. Select your state to see
              specific deadlines, penalties, and local attorney information.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { name: "Texas", slug: "texas", urgent: true },
              { name: "Arizona", slug: "arizona", urgent: true },
              { name: "California", slug: "california" },
              { name: "Florida", slug: "florida" },
              { name: "Georgia", slug: "georgia" },
              { name: "North Carolina", slug: "north-carolina" },
              { name: "Colorado", slug: "colorado", urgent: true },
              { name: "Ohio", slug: "ohio" },
            ].map((state) => (
              <Link key={state.slug} href={`/${state.slug}`}>
                <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary hover:-translate-y-1 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-semibold text-lg mb-2">{state.name}</span>
                    {state.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        7-Day Deadline
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Section */}
      <section className="section">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experienced Attorneys</h3>
              <p className="text-muted-foreground">
                Our network includes attorneys with decades of combined DUI defense experience
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">
                Thousands of cases resolved with reduced charges and minimized penalties
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-muted-foreground">
                Get connected with an attorney within minutes, day or night
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="section bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Face This Alone
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Every minute counts after a DUI arrest. Our partner attorneys are standing by
              24/7 to provide immediate guidance and protect your rights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="tel:+18005551234" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  <Phone className="h-5 w-5" />
                  Call (800) 555-1234
                </Button>
              </a>
              <Link href="/resources/deadline-checker" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2">
                  Check My Deadline
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Free consultation • No obligation • Local attorneys • Confidential
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

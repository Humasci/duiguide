import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, Phone, Scale } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              What to Do After a DUI Arrest
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Get immediate help understanding your rights, critical deadlines,
              and connect with local DUI attorneys. Available 24/7.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a href="tel:+18005551234">
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Call Now - 24/7
                </Button>
              </a>
              <Link href="#select-state">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Find Your State Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Alert */}
      <section className="border-b bg-destructive/10 py-6">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Time-Sensitive: Act Quickly
                </h2>
                <p className="text-sm text-muted-foreground">
                  You may have as few as 7-15 days to request a DMV hearing to
                  prevent automatic license suspension. Don&apos;t wait. Every day
                  counts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">
            What You Need to Know
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Clock className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Critical Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Most states require you to request a DMV hearing within 7-15
                  days of arrest to protect your license. Missing this deadline
                  can result in automatic suspension.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have the right to legal representation. An experienced DUI
                  attorney can help protect your rights, challenge evidence, and
                  potentially reduce penalties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Free Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with local DUI attorneys for free consultations. Many
                  attorneys offer payment plans and will review your case at no
                  cost.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State Selection */}
      <section id="select-state" className="bg-muted/50 py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Select Your State</h2>
            <p className="mb-8 text-muted-foreground">
              DUI laws and procedures vary by state. Select your state to see
              specific information for your location.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: "Texas", slug: "texas" },
                { name: "Arizona", slug: "arizona" },
                { name: "California", slug: "california" },
                { name: "Florida", slug: "florida" },
                { name: "Georgia", slug: "georgia" },
                { name: "North Carolina", slug: "north-carolina" },
                { name: "Colorado", slug: "colorado" },
              ].map((state) => (
                <Link key={state.slug} href={`/${state.slug}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="font-semibold">{state.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Need Help Right Now?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our partner attorneys are available 24/7 to answer your questions
              and provide immediate guidance.
            </p>
            <a href="tel:+18005551234">
              <Button size="lg">
                <Phone className="h-5 w-5" />
                Call (800) 555-1234
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

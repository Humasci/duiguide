import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, MapPin, Phone, Scale } from "lucide-react";
import Link from "next/link";

interface CountyPageProps {
  params: {
    state: string;
    county: string;
  };
}

// This will be populated with actual county data from the database
async function getCountyData(stateSlug: string, countySlug: string) {
  // Return null if Supabase is not configured
  if (!supabaseAdmin) return null;

  // Get state data
  const { data: state, error: stateError } = await supabaseAdmin
    .from("states")
    .select("*")
    .eq("slug", stateSlug)
    .eq("is_active", true)
    .single();

  if (stateError || !state) {
    return null;
  }

  // Get county data
  const { data: county, error: countyError } = await supabaseAdmin
    .from("counties")
    .select("*")
    .eq("state_id", state.id)
    .eq("slug", countySlug)
    .eq("is_active", true)
    .single();

  if (countyError || !county) {
    return null;
  }

  return { state, county };
}

export async function generateMetadata({
  params,
}: CountyPageProps): Promise<Metadata> {
  const data = await getCountyData(params.state, params.county);

  if (!data) {
    return {
      title: "County Not Found",
    };
  }

  const { state, county } = data;

  const title = `What to Do After a DUI Arrest in ${county.name}, ${state.abbreviation} | DUI Guide`;
  const description = `Arrested for DUI in ${county.name}? Learn your rights, understand the critical ${state.dmv_deadline_days}-day DMV deadline, court process at ${county.court_name || "local court"}, and connect with a local DUI attorney. Free consultation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

// Generate static params for all active counties
export async function generateStaticParams() {
  // Skip static generation if Supabase is not configured
  if (!supabaseAdmin) return [];

  const { data: states } = await supabaseAdmin
    .from("states")
    .select("slug, id")
    .eq("is_active", true);

  if (!states) return [];

  const params: { state: string; county: string }[] = [];

  for (const state of states) {
    const { data: counties } = await supabaseAdmin
      .from("counties")
      .select("slug")
      .eq("state_id", state.id)
      .eq("is_active", true);

    if (counties) {
      for (const county of counties) {
        params.push({
          state: state.slug,
          county: county.slug,
        });
      }
    }
  }

  return params;
}

export default async function CountyDUIPage({ params }: CountyPageProps) {
  const data = await getCountyData(params.state, params.county);

  if (!data) {
    notFound();
  }

  const { state, county } = data;

  // Calculate days remaining if arrest was today
  const dmvDeadline = state.dmv_deadline_days || 15;

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: state.name, href: `/${state.slug}` },
          { label: `${county.name} DUI Guide` },
        ]}
      />

      {/* Urgent Alert Banner */}
      {dmvDeadline && (
        <div
          className={`mb-6 rounded-lg border p-4 ${
            dmvDeadline <= 10
              ? "border-destructive bg-destructive/10"
              : "border-orange-500 bg-orange-50 dark:bg-orange-950"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`h-6 w-6 flex-shrink-0 ${
                dmvDeadline <= 10 ? "text-destructive" : "text-orange-600"
              }`}
            />
            <div>
              <h2 className="mb-1 font-semibold">
                Critical Deadline: Act Within {dmvDeadline} Days
              </h2>
              <p className="text-sm text-muted-foreground">
                In {state.name}, you have only {dmvDeadline} days from the date
                of your arrest to request an administrative hearing to contest
                your license suspension. Missing this deadline can result in
                automatic suspension. {dmvDeadline === 7 && (
                  <strong className="text-destructive">
                    {" "}
                    Colorado has the shortest deadline in the nation.
                  </strong>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Primary Content */}
        <div className="lg:col-span-2">
          {/* H1 Title */}
          <h1 className="mb-4 text-4xl font-bold">
            What to Do After a DUI Arrest in {county.name}, {state.abbreviation}
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Being arrested for DUI is stressful. This guide will help you
            understand what happens next, critical deadlines you need to know,
            and how to protect your rights in {county.name}, {state.name}.
          </p>

          {/* Immediate Steps */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Immediate Steps to Take
            </h2>

            <Card className="mb-4">
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </span>
                    <div>
                      <strong>Write down everything you remember</strong>
                      <p className="text-sm text-muted-foreground">
                        Document the arrest: time, location, what the officer
                        said, field sobriety tests performed, and any witnesses.
                        Details fade quickly.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </span>
                    <div>
                      <strong>
                        Request your DMV hearing (within {dmvDeadline} days)
                      </strong>
                      <p className="text-sm text-muted-foreground">
                        This is your most urgent deadline. Contact the{" "}
                        {state.name} DMV immediately to request a hearing. This
                        is separate from your criminal case.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      3
                    </span>
                    <div>
                      <strong>Consult with a DUI attorney</strong>
                      <p className="text-sm text-muted-foreground">
                        A local {county.name} attorney who handles DUI cases can
                        explain your options, represent you at hearings, and
                        potentially reduce penalties.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      4
                    </span>
                    <div>
                      <strong>Gather your documents</strong>
                      <p className="text-sm text-muted-foreground">
                        Collect your citation, bond paperwork, and any
                        documentation from the arrest. You&apos;ll need these for
                        your attorney and court appearances.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      5
                    </span>
                    <div>
                      <strong>Don&apos;t discuss your case publicly</strong>
                      <p className="text-sm text-muted-foreground">
                        Avoid posting about your arrest on social media or
                        discussing details with anyone except your attorney.
                        These statements can be used against you.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Court Information */}
          {county.court_name && (
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                {county.name} Court Information
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {county.court_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {county.court_address && (
                    <p>
                      <strong>Address:</strong> {county.court_address}
                      {county.court_city && `, ${county.court_city}`}
                      {county.court_zip && `, ${county.court_zip}`}
                    </p>
                  )}
                  {county.court_phone && (
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={`tel:${county.court_phone}`}
                        className="text-primary hover:underline"
                      >
                        {county.court_phone}
                      </a>
                    </p>
                  )}
                  {county.court_hours && (
                    <p>
                      <strong>Hours:</strong> {county.court_hours}
                    </p>
                  )}
                  {county.arraignment_timeline && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <strong>Arraignment:</strong>{" "}
                      {county.arraignment_timeline}
                    </p>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Penalties */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Potential Penalties in {state.name}
            </h2>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">First Offense</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {state.first_offense_jail_min && (
                        <li>
                          <strong>Jail:</strong> {state.first_offense_jail_min}{" "}
                          to {state.first_offense_jail_max}
                        </li>
                      )}
                      {state.first_offense_fine_min && (
                        <li>
                          <strong>Fines:</strong> $
                          {state.first_offense_fine_min} to $
                          {state.first_offense_fine_max}
                        </li>
                      )}
                      {state.first_offense_license_suspension && (
                        <li>
                          <strong>License Suspension:</strong>{" "}
                          {state.first_offense_license_suspension}
                        </li>
                      )}
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Note: Penalties vary based on BAC level, prior offenses,
                    and specific circumstances. An attorney can help you
                    understand what penalties may apply to your case.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Disclaimer */}
          <Card className="border-muted-foreground/20 bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">
                <strong>Legal Disclaimer:</strong>{" "}
                {state.disclaimer_text ||
                  "This guide provides general information about DUI procedures and is not legal advice. Laws are complex and consequences vary. Always consult with a qualified DUI attorney for advice about your specific situation."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Need Legal Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Connect with a local DUI attorney in {county.name} for a free
                  consultation.
                </p>

                <a href="tel:+18005551234" className="block">
                  <Button className="w-full" size="lg">
                    <Phone className="h-5 w-5" />
                    Call Now - 24/7
                  </Button>
                </a>

                <div className="text-center text-xs text-muted-foreground">
                  or
                </div>

                <Link href="#contact-form">
                  <Button variant="outline" className="w-full">
                    Request Free Consultation
                  </Button>
                </Link>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Scale className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Licensed {state.name} attorneys</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Local {county.name} experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

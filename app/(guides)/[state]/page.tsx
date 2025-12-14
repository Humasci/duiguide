import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface StatePageProps {
  params: {
    state: string;
  };
}

async function getStateData(stateSlug: string) {
  // Return null if Supabase is not configured
  if (!supabaseAdmin) return null;

  const { data: state, error } = await supabaseAdmin
    .from("states")
    .select("*")
    .eq("slug", stateSlug)
    .eq("is_active", true)
    .single();

  if (error || !state) {
    return null;
  }

  // Get counties for this state
  const { data: counties } = await supabaseAdmin
    .from("counties")
    .select("id, name, slug, population, major_cities")
    .eq("state_id", state.id)
    .eq("is_active", true)
    .order("population", { ascending: false });

  return { state, counties: counties || [] };
}

export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const data = await getStateData(params.state);

  if (!data) {
    return { title: "State Not Found" };
  }

  const { state } = data;

  return {
    title: `${state.name} DUI Guide - What to Do After a DUI Arrest | DUI Guide`,
    description: `Complete guide to DUI arrests in ${state.name}. Learn about the ${state.dmv_deadline_days}-day DMV deadline, penalties, court process, and find local DUI attorneys in your county.`,
  };
}

export async function generateStaticParams() {
  // Skip static generation if Supabase is not configured
  if (!supabaseAdmin) return [];

  const { data: states } = await supabaseAdmin
    .from("states")
    .select("slug")
    .eq("is_active", true);

  if (!states) return [];

  return states.map((state) => ({
    state: state.slug,
  }));
}

export default async function StatePage({ params }: StatePageProps) {
  const data = await getStateData(params.state);

  if (!data) {
    notFound();
  }

  const { state, counties } = data;

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: state.name }]} />

      <h1 className="mb-4 text-4xl font-bold">
        {state.name} DUI Guide
      </h1>

      <p className="mb-8 text-lg text-muted-foreground">
        If you&apos;ve been arrested for DUI in {state.name}, understanding the
        process and your rights is critical. This guide provides county-specific
        information to help you navigate what happens next.
      </p>

      {/* State-Level Alert */}
      {state.dmv_deadline_days && (
        <div
          className={`mb-8 rounded-lg border p-4 ${
            state.dmv_deadline_days <= 10
              ? "border-destructive bg-destructive/10"
              : "border-orange-500 bg-orange-50 dark:bg-orange-950"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`h-6 w-6 flex-shrink-0 ${
                state.dmv_deadline_days <= 10
                  ? "text-destructive"
                  : "text-orange-600"
              }`}
            />
            <div>
              <h2 className="mb-1 font-semibold">
                Critical {state.name} Deadline: {state.dmv_deadline_days} Days
              </h2>
              <p className="text-sm text-muted-foreground">
                In {state.name}, you have {state.dmv_deadline_days} days from
                your arrest date to request an administrative hearing with the
                DMV to contest your license suspension.
                {state.dmv_deadline_days === 7 && (
                  <strong className="text-destructive">
                    {" "}
                    This is the shortest deadline in the nation - act
                    immediately.
                  </strong>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Counties List */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Select Your County
        </h2>

        <p className="mb-6 text-muted-foreground">
          DUI procedures vary by county. Select your county below for specific
          information about courts, deadlines, and local resources.
        </p>

        {counties.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {counties.map((county) => (
              <Link
                key={county.id}
                href={`/${state.slug}/${county.slug}/dui`}
              >
                <Card className="h-full transition-all hover:shadow-md hover:border-primary cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">{county.name}</h3>
                    {county.major_cities && county.major_cities.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Includes: {county.major_cities.slice(0, 3).join(", ")}
                      </p>
                    )}
                    {county.population && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Population: {county.population.toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              County guides coming soon. Please check back later.
            </CardContent>
          </Card>
        )}
      </section>

      {/* State-Level Info */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          {state.name} DUI Penalties (First Offense)
        </h2>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {state.first_offense_jail_min && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                    Jail Time
                  </h3>
                  <p>
                    {state.first_offense_jail_min} to{" "}
                    {state.first_offense_jail_max}
                  </p>
                </div>
              )}

              {state.first_offense_fine_min && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                    Fines
                  </h3>
                  <p>
                    ${state.first_offense_fine_min.toLocaleString()} to $
                    {state.first_offense_fine_max?.toLocaleString()}
                  </p>
                </div>
              )}

              {state.first_offense_license_suspension && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                    License Suspension
                  </h3>
                  <p>{state.first_offense_license_suspension}</p>
                </div>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Actual penalties depend on your specific circumstances, BAC level,
              prior offenses, and whether there were aggravating factors. Consult
              with a local attorney for guidance on your case.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer */}
      <Card className="border-muted-foreground/20 bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> {state.disclaimer_text}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

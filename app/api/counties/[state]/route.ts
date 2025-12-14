import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const stateSlug = params.state;

    // Get state ID from slug
    const { data: stateData, error: stateError } = await supabaseAdmin
      .from("states")
      .select("id")
      .eq("slug", stateSlug)
      .eq("is_active", true)
      .single();

    if (stateError || !stateData) {
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      );
    }

    // Get counties for this state
    const { data: counties, error: countiesError } = await supabaseAdmin
      .from("counties")
      .select("id, name, slug, population, major_cities, is_active")
      .eq("state_id", stateData.id)
      .eq("is_active", true)
      .order("population", { ascending: false }); // Most populous first

    if (countiesError) {
      console.error("Error fetching counties:", countiesError);
      return NextResponse.json(
        { error: "Failed to fetch counties" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      counties: counties || [],
    });
  } catch (error) {
    console.error("Error in counties API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";

// Lead submission validation schema
const leadSubmissionSchema = z.object({
  // Source tracking
  source: z.enum(["web_form", "phone", "chat"]),
  sourcePage: z.string().optional(),
  sourceUrl: z.string().optional(),
  referrer: z.string().optional(),

  // UTM parameters
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),

  // Location
  state: z.string().min(1),
  county: z.string().min(1),
  city: z.string().optional(),

  // Contact info
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  preferredContactMethod: z.enum(["phone", "email", "text"]),
  bestTimeToCall: z.string().optional(),

  // Case details
  arrestRecency: z.enum(["today", "this_week", "this_month", "older"]),
  arrestDate: z.string().optional(),
  isFirstOffense: z.boolean(),
  hasAccident: z.boolean(),
  hasInjury: z.boolean(),
  hasCdl: z.boolean(),

  // Consent
  consentToContact: z.boolean().refine((val) => val === true),
  consentToRecording: z.boolean(),
});

type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

// Calculate urgency score based on case details
function calculateUrgencyScore(lead: LeadSubmission): number {
  let score = 5; // Base score

  // Recency boosts
  if (lead.arrestRecency === "today") score += 3;
  else if (lead.arrestRecency === "this_week") score += 2;
  else if (lead.arrestRecency === "this_month") score += 1;

  // Situation boosts
  if (lead.hasAccident) score += 1;
  if (lead.hasInjury) score += 1;
  if (lead.hasCdl) score += 1;
  if (!lead.isFirstOffense) score += 1;

  return Math.min(score, 10); // Cap at 10
}

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = leadSubmissionSchema.parse(body);

    // Get county_id from state and county slugs
    const { data: countyData, error: countyError } = await supabaseAdmin
      .from("counties")
      .select("id, state_id")
      .eq("slug", validatedData.county)
      .single();

    if (countyError || !countyData) {
      return NextResponse.json(
        { error: "County not found" },
        { status: 404 }
      );
    }

    // Calculate urgency score
    const urgencyScore = calculateUrgencyScore(validatedData);

    // Parse name into first and last
    const nameParts = validatedData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert lead record
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .insert({
        // Source tracking
        source: validatedData.source,
        source_page: validatedData.sourcePage,
        source_url: validatedData.sourceUrl,
        referrer: validatedData.referrer,
        utm_source: validatedData.utmSource,
        utm_medium: validatedData.utmMedium,
        utm_campaign: validatedData.utmCampaign,

        // Session info
        ip_address: ip,
        user_agent: userAgent,

        // Contact info
        name: validatedData.name,
        first_name: firstName,
        last_name: lastName,
        phone: validatedData.phone,
        email: validatedData.email || null,
        preferred_contact_method: validatedData.preferredContactMethod,
        best_time_to_call: validatedData.bestTimeToCall,

        // Location
        state: validatedData.state,
        county: validatedData.county,
        county_id: countyData.id,
        city: validatedData.city,

        // Case details
        arrest_date: validatedData.arrestDate,
        arrest_recency: validatedData.arrestRecency,
        is_first_offense: validatedData.isFirstOffense,
        has_accident: validatedData.hasAccident,
        has_injury: validatedData.hasInjury,
        has_cdl: validatedData.hasCdl,

        // Qualification
        urgency_score: urgencyScore,
        is_qualified: true,

        // Status
        status: "new",
      })
      .select()
      .single();

    if (leadError) {
      console.error("Error inserting lead:", leadError);
      return NextResponse.json(
        { error: "Failed to create lead" },
        { status: 500 }
      );
    }

    // TODO: Trigger n8n webhook for lead routing
    // if (process.env.N8N_WEBHOOK_URL) {
    //   await fetch(process.env.N8N_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ leadId: lead.id })
    //   });
    // }

    // Return success with county guide URL
    const countyGuideUrl = `/${validatedData.state}/${validatedData.county}/dui`;

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: "Your information has been received. An attorney will contact you shortly.",
      countyGuideUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.format() },
        { status: 400 }
      );
    }

    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";

// Vapi webhook validation schemas
const functionCallSchema = z.object({
  name: z.string(),
  parameters: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1), 
    phoneNumber: z.string().min(10),
    email: z.string().email().optional(),
    state: z.string().min(1),
    county: z.string().min(1),
    arrestDate: z.string().optional(),
    isFirstOffense: z.boolean(),
    hadAccident: z.boolean(),
    hasCDL: z.boolean(),
    questions: z.string().optional(),
  })
});

const vapiMessageSchema = z.object({
  message: z.object({
    type: z.literal("function-call"),
    functionCall: functionCallSchema
  }),
  call: z.object({
    id: z.string(),
    type: z.string(),
    phoneNumber: z.string(),
    status: z.string(),
    startedAt: z.string(),
    endedAt: z.string().optional()
  })
});

// Calculate urgency score for voice leads
function calculateVoiceUrgencyScore(params: any): number {
  let score = 7; // Base score higher for phone calls
  
  if (params.hadAccident) score += 1;
  if (params.hasCDL) score += 1;
  if (!params.isFirstOffense) score += 1;
  
  // Recent arrests get higher priority
  if (params.arrestDate) {
    const arrestDate = new Date(params.arrestDate);
    const daysSince = (Date.now() - arrestDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSince <= 1) score += 3;
    else if (daysSince <= 7) score += 2;
    else if (daysSince <= 30) score += 1;
  }
  
  return Math.min(score, 10);
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature/auth
    const authHeader = request.headers.get("authorization");
    const webhookSecret = process.env.VAPI_WEBHOOK_SECRET;
    
    if (webhookSecret && (!authHeader || !authHeader.includes(webhookSecret))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    console.log("Received Vapi webhook:", JSON.stringify(body, null, 2));

    // Validate input
    const validatedData = vapiMessageSchema.parse(body);
    const { message, call } = validatedData;
    
    // Only process function calls that submit leads
    if (message.functionCall.name !== "submitLead") {
      return NextResponse.json({ 
        success: true, 
        message: "Function call received but not a lead submission" 
      });
    }

    const params = message.functionCall.parameters;

    // Get county_id from state and county slugs
    const { data: countyData, error: countyError } = await supabaseAdmin
      .from("counties")
      .select("id, state_id")
      .eq("slug", params.county)
      .single();

    if (countyError || !countyData) {
      console.error("County lookup error:", countyError);
      return NextResponse.json(
        { error: "County not found" },
        { status: 404 }
      );
    }

    // Calculate urgency score
    const urgencyScore = calculateVoiceUrgencyScore(params);

    // Get client IP
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";

    // Map arrest date to recency
    let arrestRecency = "older";
    if (params.arrestDate) {
      const arrestDate = new Date(params.arrestDate);
      const daysSince = (Date.now() - arrestDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSince <= 1) arrestRecency = "today";
      else if (daysSince <= 7) arrestRecency = "this_week";
      else if (daysSince <= 30) arrestRecency = "this_month";
    }

    // Insert lead record
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .insert({
        // Source tracking
        source: "phone",
        source_page: "vapi_voice_agent",
        source_url: call.phoneNumber,
        
        // Session info  
        ip_address: ip,
        user_agent: "Vapi Voice Agent",
        call_id: call.id,

        // Contact info
        name: `${params.firstName} ${params.lastName}`,
        first_name: params.firstName,
        last_name: params.lastName,
        phone: params.phoneNumber,
        email: params.email || null,
        preferred_contact_method: "phone",

        // Location
        state: params.state,
        county: params.county,
        county_id: countyData.id,

        // Case details
        arrest_date: params.arrestDate,
        arrest_recency: arrestRecency,
        is_first_offense: params.isFirstOffense,
        has_accident: params.hadAccident,
        has_injury: false, // Not captured in voice yet
        has_cdl: params.hasCDL,
        notes: params.questions,

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

    console.log("Created lead from Vapi call:", lead.id);

    // TODO: Trigger n8n webhook for immediate attorney routing
    // Voice leads should get highest priority routing
    // if (process.env.N8N_WEBHOOK_URL) {
    //   await fetch(process.env.N8N_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       leadId: lead.id, 
    //       source: 'voice',
    //       urgency: 'high' 
    //     })
    //   });
    // }

    // Return response for Vapi
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: `Thank you ${params.firstName}! Your information has been received. An attorney specializing in ${params.state} DUI cases will contact you within the next hour.`,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.format());
      return NextResponse.json(
        { error: "Invalid webhook payload", details: error.format() },
        { status: 400 }
      );
    }

    console.error("Error processing Vapi webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET for webhook verification if needed
export async function GET() {
  return NextResponse.json({ 
    message: "Vapi webhook endpoint is active",
    timestamp: new Date().toISOString()
  });
}
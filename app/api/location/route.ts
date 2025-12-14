import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get geo headers from Vercel
    const country = request.headers.get("x-vercel-ip-country");
    const region = request.headers.get("x-vercel-ip-country-region");
    const city = request.headers.get("x-vercel-ip-city");

    // Only support US for now
    if (country !== "US") {
      return NextResponse.json({
        detected: false,
        message: "Service only available in the United States",
      });
    }

    // Map region codes to our state slugs
    const stateMapping: Record<string, { slug: string; name: string }> = {
      TX: { slug: "texas", name: "Texas" },
      AZ: { slug: "arizona", name: "Arizona" },
      GA: { slug: "georgia", name: "Georgia" },
      CO: { slug: "colorado", name: "Colorado" },
      NC: { slug: "north-carolina", name: "North Carolina" },
      OH: { slug: "ohio", name: "Ohio" },
      TN: { slug: "tennessee", name: "Tennessee" },
    };

    const stateInfo = region ? stateMapping[region] : null;

    if (!stateInfo) {
      return NextResponse.json({
        detected: false,
        message: "State not yet supported",
      });
    }

    // TODO: Implement city-to-county mapping
    // For now, we'll just return state-level detection
    return NextResponse.json({
      detected: true,
      state: stateInfo.slug,
      stateName: stateInfo.name,
      stateAbbr: region,
      city: city ? decodeURIComponent(city) : undefined,
      confidence: "medium", // "high" would require county detection
    });
  } catch (error) {
    console.error("Error detecting location:", error);
    return NextResponse.json({
      detected: false,
      message: "Failed to detect location",
    });
  }
}

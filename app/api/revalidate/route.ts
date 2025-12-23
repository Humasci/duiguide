import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API
 *
 * Called by the ingestion pipeline when data is updated.
 * Invalidates Next.js cache for specific county pages to show fresh data.
 *
 * Usage:
 * POST /api/revalidate
 * Body: { "state": "texas", "county": "harris", "secret": "..." }
 */

export async function POST(request: NextRequest) {
  try {
    // Security: Verify secret token
    const body = await request.json();
    const { state, county, secret } = body;

    // Check for secret (add to your .env.local)
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (!state || !county) {
      return NextResponse.json(
        { error: 'Missing state or county' },
        { status: 400 }
      );
    }

    // Revalidate all relevant pages for this county
    const paths = [
      `/${state}/${county}`,
      `/${state}/${county}/impound`,
      `/${state}/${county}/bail`,
      `/${state}/${county}/court`,
      `/${state}/${county}/dmv`,
      `/${state}/${county}/scram`,
    ];

    // Revalidate each path
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

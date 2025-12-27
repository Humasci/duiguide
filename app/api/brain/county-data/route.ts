// API Route: Get County Data
// GET /api/brain/county-data?state=Texas&county=Harris County

import { NextRequest, NextResponse } from 'next/server';
import { brain } from '@/lib/brain';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const county = searchParams.get('county');

    // Validate required parameters
    if (!state || !county) {
      return NextResponse.json(
        { error: 'State and county parameters are required' },
        { status: 400 }
      );
    }

    // Get county data
    const data = await brain.getCountyData(state, county);

    // Get stats
    const stats = await brain.getCountyStats(state, county);

    return NextResponse.json({
      success: true,
      state,
      county,
      data,
      stats,
    });
  } catch (error) {
    console.error('County data API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch county data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

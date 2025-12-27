// API Route: Semantic Search
// POST /api/brain/search

import { NextRequest, NextResponse } from 'next/server';
import { brain } from '@/lib/brain';

export async function POST(request: NextRequest) {
  try {
    const { query, state, county, topic, phase, limit, similarityThreshold } = await request.json();

    // Validate required fields
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Perform semantic search
    const results = await brain.search(query, {
      state,
      county,
      topic,
      phase,
      limit: limit || 10,
      similarityThreshold: similarityThreshold || 0.7,
    });

    return NextResponse.json({
      success: true,
      results,
      count: results.length,
      query,
      filters: {
        state,
        county,
        topic,
        phase,
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to perform search',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

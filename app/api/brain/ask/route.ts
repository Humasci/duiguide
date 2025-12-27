// API Route: RAG Q&A
// POST /api/brain/ask

import { NextRequest, NextResponse } from 'next/server';
import { brain } from '@/lib/brain';

export async function POST(request: NextRequest) {
  try {
    const { question, state, county, topic } = await request.json();

    // Validate required fields
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }

    if (!state || !county) {
      return NextResponse.json(
        { error: 'State and county are required' },
        { status: 400 }
      );
    }

    // Answer the question using RAG
    const answer = await brain.ask(question, {
      state,
      county,
      topic,
    });

    return NextResponse.json({
      success: true,
      question,
      context: {
        state,
        county,
        topic,
      },
      ...answer,
    });
  } catch (error) {
    console.error('Q&A API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to answer question',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Diagnostic endpoint to test match_knowledge_chunks function
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create a simple test embedding (all zeros)
    const testEmbedding = Array(768).fill(0);

    // Try calling the function
    const { data, error } = await supabase.rpc('match_knowledge_chunks', {
      query_embedding: testEmbedding,
      match_threshold: 0.5,
      match_count: 1,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      resultCount: data?.length || 0,
      sampleResult: data?.[0] || null,
      resultKeys: data?.[0] ? Object.keys(data[0]) : [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
      { status: 500 }
    );
  }
}

// API Route: Test Brain SDK
// GET /api/brain/test

import { NextRequest, NextResponse } from 'next/server';
import { brain } from '@/lib/brain';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Test 1: Embedding generation
    const embeddingInfo = brain.getEmbeddingInfo();

    // Test 2: Check if knowledge_chunks data exists
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get total chunk count
    const { count: totalChunks } = await supabase
      .from('knowledge_chunks')
      .select('*', { count: 'exact', head: true });

    // Get sample chunks (using correct column names: content, state_id, county_id)
    const { data: sampleChunks } = await supabase
      .from('knowledge_chunks')
      .select('id, state_id, county_id, topic, content, phase')
      .limit(3);

    // Get state IDs covered
    const { data: chunkStateIds } = await supabase
      .from('knowledge_chunks')
      .select('state_id')
      .not('state_id', 'is', null)
      .limit(100);

    const stateIds = [...new Set(chunkStateIds?.map(s => s.state_id) || [])];

    // Fetch state names
    let stateNames: string[] = [];
    if (stateIds.length > 0) {
      const { data: states } = await supabase
        .from('states')
        .select('name')
        .in('id', stateIds);
      stateNames = states?.map(s => s.name) || [];
    }

    // Test 3: Get county stats (simple version)
    let countyStats = null;
    try {
      countyStats = await brain.getCountyStats('Texas', 'Harris County');
    } catch (e) {
      countyStats = { error: e instanceof Error ? e.message : 'Unknown error' };
    }

    return NextResponse.json({
      success: true,
      message: 'Brain SDK is working!',
      tests: {
        embeddingModel: embeddingInfo,
        dataExists: {
          totalChunks: totalChunks || 0,
          statesCovered: stateNames,
          sampleChunks: sampleChunks?.map(c => ({
            id: c.id,
            state_id: c.state_id,
            county_id: c.county_id,
            topic: c.topic,
            phase: c.phase,
            preview: c.content?.substring(0, 100) + '...'
          })) || [],
        },
        countyStats,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Brain test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Brain SDK test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
      { status: 500 }
    );
  }
}

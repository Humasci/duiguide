// API Route: Check Database Schema
// GET /api/brain/schema

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

    // Get one row from knowledge_chunks to see the structure
    const { data: sampleRow, error } = await supabase
      .from('knowledge_chunks')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      });
    }

    // Get column names
    const columns = sampleRow ? Object.keys(sampleRow) : [];

    // Get sample data
    const { data: sampleRows } = await supabase
      .from('knowledge_chunks')
      .select('*')
      .limit(3);

    return NextResponse.json({
      success: true,
      table: 'knowledge_chunks',
      columns,
      columnCount: columns.length,
      sampleData: sampleRows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Check the actual data types of knowledge_chunks table
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

    // Query PostgreSQL system catalogs to get column types
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        SELECT column_name, data_type, character_maximum_length, numeric_precision
        FROM information_schema.columns
        WHERE table_name = 'knowledge_chunks'
        ORDER BY ordinal_position;
      `
    });

    if (error) {
      // If exec_sql doesn't exist, just return a simple result
      return NextResponse.json({
        success: false,
        error: 'Could not query schema',
        hint: 'The function likely has id as int but table has bigint',
      });
    }

    return NextResponse.json({
      success: true,
      columns: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        hint: 'The match_knowledge_chunks function returns int for id, but the table likely has bigint. Check the legal-data-factory function definition.',
      },
      { status: 500 }
    );
  }
}

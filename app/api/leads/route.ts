import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      case_type,
      has_attorney,
      county_id,
      county_name,
      state,
      terminology
    } = body;

    // Validate required fields
    if (!name || !phone || !email || !case_type || !county_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Store lead in database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone,
        email,
        case_type,
        has_attorney: has_attorney || false,
        county_id,
        county_name,
        state,
        terminology,
        created_at: new Date().toISOString(),
        source: 'county_page'
      })
      .select();

    if (error) {
      console.error('Error storing lead:', error);
      // Continue anyway - don't fail if lead storage fails
    }

    // Here you could integrate with 4LegalLeads API or other lead services
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      lead_id: data?.[0]?.id
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// API Route: Upload Research Files/Text
// POST /api/admin/upload

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const state = formData.get('state') as string;
    const county = formData.get('county') as string;
    const topic = formData.get('topic') as string;
    const sourceUrl = formData.get('source_url') as string;
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;
    const fileName = formData.get('file_name') as string | null;

    // Validate required fields
    if (!state || !county || !topic) {
      return NextResponse.json(
        { error: 'State, county, and topic are required' },
        { status: 400 }
      );
    }

    if (!file && !text) {
      return NextResponse.json(
        { error: 'Either file or text content is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get state ID
    const { data: stateData, error: stateError } = await supabase
      .from('states')
      .select('id')
      .eq('name', state)
      .single();

    if (stateError || !stateData) {
      return NextResponse.json(
        { error: `State "${state}" not found` },
        { status: 400 }
      );
    }

    // Get county ID
    const { data: countyData, error: countyError } = await supabase
      .from('counties')
      .select('id')
      .eq('state_id', stateData.id)
      .eq('name', county)
      .single();

    if (countyError || !countyData) {
      return NextResponse.json(
        { error: `County "${county}" not found in ${state}` },
        { status: 400 }
      );
    }

    let uploadFileName: string;
    let fileType: string;
    let filePath: string;
    let fileBuffer: Buffer;

    // Prepare file for upload
    if (file) {
      uploadFileName = file.name;
      fileType = file.name.split('.').pop() || 'unknown';
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else if (text && fileName) {
      uploadFileName = fileName;
      fileType = 'txt';
      fileBuffer = Buffer.from(text, 'utf-8');
    } else {
      return NextResponse.json(
        { error: 'Invalid file or text data' },
        { status: 400 }
      );
    }

    // Generate storage path
    const timestamp = Date.now();
    const sanitizedFileName = uploadFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    filePath = `${state}/${county}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('research-documents')
      .upload(filePath, fileBuffer, {
        contentType: file?.type || 'text/plain',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);

      // Check if bucket exists
      if (uploadError.message.includes('bucket')) {
        return NextResponse.json(
          {
            error: 'Storage bucket not configured. Please create the "research-documents" bucket in Supabase.',
            details: uploadError.message
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get file size
    const fileSize = fileBuffer.length;

    // Create record in sources table (using legal-data-factory schema)
    const { data: sourceData, error: sourceError } = await supabase
      .from('sources')
      .insert({
        file_name: uploadFileName,
        file_path: uploadData.path,
        file_type: fileType,
        file_size_bytes: fileSize,
        state_id: stateData.id,
        county_id: countyData.id,
        applies_to_all_counties: false,
        phase: null, // Will be determined during processing
        topic: topic,
        source_type: 'manual_upload',
        original_url: sourceUrl || null,
        processing_status: 'pending',
        verification_status: 'unverified',
        is_multi_topic: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (sourceError) {
      console.error('Database insert error:', sourceError);

      // Cleanup uploaded file if database insert fails
      await supabase.storage
        .from('research-documents')
        .remove([uploadData.path]);

      return NextResponse.json(
        { error: `Failed to create source record: ${sourceError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Upload successful! File is queued for processing by legal-data-factory.',
      sourceId: sourceData.id,
      fileName: uploadFileName,
      status: 'pending',
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

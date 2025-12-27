// Semantic Search Module using Gemini Embeddings + pgvector
// Searches knowledge_chunks table for relevant content

import { createClient } from '@supabase/supabase-js';
import { generateEmbedding } from './embeddings';
import { SearchOptions, SearchResult } from './types';

/**
 * Perform semantic search on knowledge chunks
 * @param query - The search query text
 * @param options - Search filters and options
 * @returns Array of search results sorted by similarity
 */
export async function semanticSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const {
    state,
    county,
    topic,
    phase,
    limit = 10,
    similarityThreshold = 0.7,
  } = options;

  try {
    // 1. Generate embedding for the query using Gemini
    const { embedding } = await generateEmbedding(query);

    // 2. Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Perform vector search using direct SQL query
    // Note: We can't use match_knowledge_chunks RPC because it has type mismatches
    // Instead, we'll use Supabase's direct SQL execution
    const embeddingStr = `[${embedding.join(',')}]`;

    const { data, error } = await supabase
      .from('knowledge_chunks')
      .select(`
        id,
        content,
        state_id,
        county_id,
        topic,
        phase,
        chunk_index,
        source_id,
        applies_to_all_counties,
        embedding_gemini
      `)
      .limit(limit * 2);

    if (error) {
      console.error('Error performing semantic search:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Calculate similarity scores in JavaScript
    // Cosine similarity: 1 - (embedding1 <=> embedding2)
    const resultsWithSimilarity = data
      .map((chunk: any) => {
        if (!chunk.embedding_gemini) {
          return { ...chunk, similarity: 0 };
        }

        // Parse embedding if it's a string
        const chunkEmbedding = typeof chunk.embedding_gemini === 'string'
          ? JSON.parse(chunk.embedding_gemini)
          : chunk.embedding_gemini;

        // Calculate cosine similarity
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < embedding.length; i++) {
          dotProduct += embedding[i] * chunkEmbedding[i];
          normA += embedding[i] * embedding[i];
          normB += chunkEmbedding[i] * chunkEmbedding[i];
        }
        const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));

        return { ...chunk, similarity };
      })
      .filter((chunk: any) => chunk.similarity > similarityThreshold)
      .sort((a: any, b: any) => b.similarity - a.similarity);

    // 4. Get state/county names for filtering (legal-data-factory uses IDs)
    const stateIds = [...new Set(resultsWithSimilarity.map((d: any) => d.state_id).filter(Boolean))];
    const countyIds = [...new Set(resultsWithSimilarity.map((d: any) => d.county_id).filter(Boolean))];

    // Fetch state and county lookups if we have IDs
    let stateMap = new Map();
    let countyMap = new Map();

    if (stateIds.length > 0) {
      const { data: states } = await supabase
        .from('states')
        .select('id, name')
        .in('id', stateIds);
      stateMap = new Map(states?.map((s) => [s.id, s.name]) || []);
    }

    if (countyIds.length > 0) {
      const { data: counties } = await supabase
        .from('counties')
        .select('id, name')
        .in('id', countyIds);
      countyMap = new Map(counties?.map((c) => [c.id, c.name]) || []);
    }

    // 5. Filter results in application code (since DB function doesn't support filters)
    let filteredData = resultsWithSimilarity;
    if (state) {
      filteredData = filteredData.filter((chunk: any) =>
        stateMap.get(chunk.state_id)?.toLowerCase() === state.toLowerCase() ||
        chunk.applies_to_all_counties
      );
    }
    if (county) {
      filteredData = filteredData.filter((chunk: any) =>
        countyMap.get(chunk.county_id)?.toLowerCase().includes(county.toLowerCase()) ||
        chunk.applies_to_all_counties
      );
    }
    if (topic) {
      filteredData = filteredData.filter((chunk: any) => chunk.topic === topic);
    }
    if (phase) {
      filteredData = filteredData.filter((chunk: any) => chunk.phase === phase);
    }

    // Apply limit after filtering
    filteredData = filteredData.slice(0, limit);

    // 6. Fetch source information for each chunk
    const sourceIds = [...new Set(filteredData.map((d: any) => d.source_id))];
    const { data: sources } = await supabase
      .from('sources')
      .select('id, file_name, file_type, file_path')
      .in('id', sourceIds);

    const sourceMap = new Map(
      sources?.map((s) => [s.id, s]) || []
    );

    // 7. Transform results into SearchResult format
    const results: SearchResult[] = filteredData.map((chunk: any) => {
      const source = sourceMap.get(chunk.source_id) || {
        id: chunk.source_id,
        file_name: 'Unknown',
        file_type: 'unknown',
      };

      return {
        id: chunk.id,
        text: chunk.content, // legal-data-factory uses 'content' not 'text'
        similarity: chunk.similarity,
        source: {
          id: source.id,
          fileName: source.file_name,
          fileType: source.file_type,
          filePath: (source as any).file_path,
        },
        metadata: {
          state: stateMap.get(chunk.state_id) || 'All States',
          county: countyMap.get(chunk.county_id) || 'All Counties',
          topic: chunk.topic,
          phase: chunk.phase,
          chunkIndex: chunk.chunk_index || 0,
          confidence: 1.0, // legal-data-factory doesn't have confidence field
        },
      };
    });

    return results;
  } catch (error) {
    console.error('Semantic search error:', error);
    throw error;
  }
}

/**
 * Search for chunks by exact text match (fallback for when vector search is unavailable)
 * @param query - The search query
 * @param options - Search filters
 * @returns Array of search results
 */
export async function textSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const { state, county, topic, phase, limit = 10 } = options;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let query_builder = supabase
      .from('knowledge_chunks')
      .select(`
        id,
        content,
        state_id,
        county_id,
        topic,
        phase,
        chunk_index,
        source_id,
        applies_to_all_counties,
        sources(id, file_name, file_type, file_path)
      `)
      .textSearch('content', query);

    if (topic) query_builder = query_builder.eq('topic', topic);
    if (phase) query_builder = query_builder.eq('phase', phase);

    const { data, error } = await query_builder.limit(limit);

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    // Fetch state/county names for the results
    const stateIds = [...new Set(data.map((d: any) => d.state_id).filter(Boolean))];
    const countyIds = [...new Set(data.map((d: any) => d.county_id).filter(Boolean))];

    let stateMap = new Map();
    let countyMap = new Map();

    if (stateIds.length > 0) {
      const { data: states } = await supabase
        .from('states')
        .select('id, name')
        .in('id', stateIds);
      stateMap = new Map(states?.map((s) => [s.id, s.name]) || []);
    }

    if (countyIds.length > 0) {
      const { data: counties } = await supabase
        .from('counties')
        .select('id, name')
        .in('id', countyIds);
      countyMap = new Map(counties?.map((c) => [c.id, c.name]) || []);
    }

    // Filter by state/county if specified
    let filteredData = data;
    if (state) {
      filteredData = filteredData.filter((chunk: any) =>
        stateMap.get(chunk.state_id)?.toLowerCase() === state.toLowerCase() ||
        chunk.applies_to_all_counties
      );
    }
    if (county) {
      filteredData = filteredData.filter((chunk: any) =>
        countyMap.get(chunk.county_id)?.toLowerCase().includes(county.toLowerCase()) ||
        chunk.applies_to_all_counties
      );
    }

    // Transform to SearchResult format
    const results: SearchResult[] = filteredData.map((chunk: any) => ({
      id: chunk.id,
      text: chunk.content, // legal-data-factory uses 'content'
      similarity: 0.5, // Placeholder for text search
      source: {
        id: chunk.sources?.id || chunk.source_id,
        fileName: chunk.sources?.file_name || 'Unknown',
        fileType: chunk.sources?.file_type || 'unknown',
        filePath: chunk.sources?.file_path,
      },
      metadata: {
        state: stateMap.get(chunk.state_id) || 'All States',
        county: countyMap.get(chunk.county_id) || 'All Counties',
        topic: chunk.topic,
        phase: chunk.phase,
        chunkIndex: chunk.chunk_index || 0,
        confidence: 1.0,
      },
    }));

    return results;
  } catch (error) {
    console.error('Text search error:', error);
    throw error;
  }
}

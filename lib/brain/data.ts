// Data Retrieval Utilities
// Functions to fetch data from Supabase (knowledge chunks, citations, curated data)

import { createClient } from '@supabase/supabase-js';
import {
  CountyData,
  CitationFilters,
  Citation,
  KnowledgeChunk,
  CuratedData,
  TopicData,
} from './types';

/**
 * Get all data for a specific county
 * @param state - State name
 * @param county - County name
 * @returns Complete county data including all topics
 */
export async function getCountyData(
  state: string,
  county: string
): Promise<CountyData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // First, look up state and county IDs (legal-data-factory uses foreign keys)
    const { data: stateData } = await supabase
      .from('states')
      .select('id')
      .ilike('name', state)
      .single();

    const { data: countyData } = await supabase
      .from('counties')
      .select('id')
      .ilike('name', `%${county}%`)
      .single();

    if (!stateData && !countyData) {
      // No matching state or county found
      return {
        state,
        county,
        topics: {},
        allChunks: [],
        allCitations: [],
        chunkCount: 0,
        citationCount: 0,
      };
    }

    // Fetch all knowledge chunks for this county or state
    let query = supabase.from('knowledge_chunks').select('*');

    if (countyData) {
      query = query.eq('county_id', countyData.id);
    } else if (stateData) {
      query = query.eq('state_id', stateData.id);
    }

    const { data: chunks, error: chunksError } = await query;

    if (chunksError) throw chunksError;

    // Fetch all citations for this county
    const sourceIds = [...new Set(chunks?.map((c) => c.source_id) || [])];
    const { data: citations, error: citationsError } = await supabase
      .from('citations')
      .select('*')
      .in('source_id', sourceIds);

    if (citationsError) throw citationsError;

    // Fetch curated data for this county
    const { data: curatedData, error: curatedError } = await supabase
      .from('curated_data')
      .select('*')
      .in('source_id', sourceIds);

    if (curatedError) throw curatedError;

    // Organize data by topic
    const topics: CountyData['topics'] = {};
    const topicNames = ['impound', 'bail', 'dmv', 'court', 'scram', 'license'];

    for (const topic of topicNames) {
      const topicChunks = chunks?.filter((c) => c.topic === topic) || [];
      const topicCitations = citations?.filter((cit) => {
        const chunkSourceIds = topicChunks.map((c) => c.source_id);
        return chunkSourceIds.includes(cit.source_id);
      }) || [];
      const topicCurated = curatedData?.filter((cd) => cd.topic === topic) || [];

      if (topicChunks.length > 0) {
        topics[topic as keyof CountyData['topics']] = {
          chunks: topicChunks as KnowledgeChunk[],
          citations: topicCitations as Citation[],
          curatedData: topicCurated as CuratedData[],
        };
      }
    }

    return {
      state,
      county,
      topics,
      allChunks: (chunks || []) as KnowledgeChunk[],
      allCitations: (citations || []) as Citation[],
      chunkCount: chunks?.length || 0,
      citationCount: citations?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching county data:', error);
    throw error;
  }
}

/**
 * Get citations based on filters
 * @param filters - Citation filter options
 * @returns Array of citations
 */
export async function getCitations(filters: CitationFilters = {}): Promise<Citation[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    let query = supabase.from('citations').select(`
      id,
      citation_text,
      citation_type,
      jurisdiction,
      url,
      source_id
    `);

    // Apply filters
    if (filters.sourceIds && filters.sourceIds.length > 0) {
      query = query.in('source_id', filters.sourceIds);
    }

    if (filters.citationType) {
      query = query.eq('citation_type', filters.citationType);
    }

    const { data, error } = await query.order('id', { ascending: true });

    if (error) throw error;

    // Transform to Citation format
    const citations: Citation[] = (data || []).map((c) => ({
      id: c.id,
      citationText: c.citation_text,
      citationType: c.citation_type,
      jurisdiction: c.jurisdiction,
      url: c.url,
      sourceId: c.source_id,
    }));

    // If state/county filters provided, filter by source location
    if (filters.state || filters.county) {
      const sourceIds = citations.map((c) => c.sourceId);
      const { data: sources } = await supabase
        .from('sources')
        .select('id, state:states(name), county:counties(name)')
        .in('id', sourceIds);

      const filteredSourceIds = sources
        ?.filter((s: any) => {
          if (filters.state && s.state?.name !== filters.state) return false;
          if (filters.county && s.county?.name !== filters.county) return false;
          return true;
        })
        .map((s: any) => s.id) || [];

      return citations.filter((c) => filteredSourceIds.includes(c.sourceId));
    }

    return citations;
  } catch (error) {
    console.error('Error fetching citations:', error);
    throw error;
  }
}

/**
 * Get knowledge chunks based on filters
 * @param state - State name
 * @param county - County name (optional)
 * @param topic - Topic filter (optional)
 * @returns Array of knowledge chunks
 */
export async function getKnowledgeChunks(
  state: string,
  county?: string,
  topic?: string
): Promise<KnowledgeChunk[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    let query = supabase
      .from('knowledge_chunks')
      .select('*')
      .eq('state', state);

    if (county) {
      query = query.eq('county', county);
    }

    if (topic) {
      query = query.eq('topic', topic);
    }

    const { data, error } = await query.order('chunk_index', { ascending: true });

    if (error) throw error;

    return (data || []) as KnowledgeChunk[];
  } catch (error) {
    console.error('Error fetching knowledge chunks:', error);
    throw error;
  }
}

/**
 * Get curated data (Gold Dust) for a county
 * @param state - State name
 * @param county - County name
 * @param topic - Topic filter (optional)
 * @returns Array of curated data
 */
export async function getCuratedData(
  state: string,
  county: string,
  topic?: string
): Promise<CuratedData[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // First get source IDs for this county
    const { data: sources } = await supabase
      .from('sources')
      .select('id, state:states!inner(name), county:counties!inner(name)')
      .eq('states.name', state)
      .eq('counties.name', county);

    const sourceIds = sources?.map((s) => s.id) || [];

    if (sourceIds.length === 0) {
      return [];
    }

    let query = supabase
      .from('curated_data')
      .select('*')
      .in('source_id', sourceIds);

    if (topic) {
      query = query.eq('topic', topic);
    }

    const { data, error } = await query.order('priority', { ascending: false });

    if (error) throw error;

    return (data || []) as CuratedData[];
  } catch (error) {
    console.error('Error fetching curated data:', error);
    throw error;
  }
}

/**
 * Get Gold Dust intelligence (high-priority curated data)
 * @param state - State name
 * @param county - County name
 * @returns Array of high-priority curated data
 */
export async function getGoldDust(
  state: string,
  county: string
): Promise<CuratedData[]> {
  const curatedData = await getCuratedData(state, county);
  return curatedData.filter((cd) => cd.priority === 10);
}

/**
 * Get stats for a county (chunk count, citation count, topics covered)
 */
export async function getCountyStats(state: string, county: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Count chunks
    const { count: chunkCount } = await supabase
      .from('knowledge_chunks')
      .select('*', { count: 'exact', head: true })
      .eq('state', state)
      .eq('county', county);

    // Get unique topics
    const { data: chunks } = await supabase
      .from('knowledge_chunks')
      .select('topic')
      .eq('state', state)
      .eq('county', county);

    const topics = [...new Set(chunks?.map((c) => c.topic) || [])];

    // Get source IDs for citation count
    const { data: chunkData } = await supabase
      .from('knowledge_chunks')
      .select('source_id')
      .eq('state', state)
      .eq('county', county);

    const sourceIds = [...new Set(chunkData?.map((c) => c.source_id) || [])];

    const { count: citationCount } = await supabase
      .from('citations')
      .select('*', { count: 'exact', head: true })
      .in('source_id', sourceIds);

    return {
      chunkCount: chunkCount || 0,
      citationCount: citationCount || 0,
      topics,
      topicCount: topics.length,
      sourceCount: sourceIds.length,
    };
  } catch (error) {
    console.error('Error fetching county stats:', error);
    throw error;
  }
}

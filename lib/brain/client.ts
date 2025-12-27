// Brain SDK Client
// Main interface for interacting with the legal-data-factory knowledge base

import { semanticSearch, textSearch } from './search';
import { answerQuestion, generateFAQs } from './qa';
import { getCountyData, getCitations, getKnowledgeChunks, getCuratedData, getGoldDust, getCountyStats } from './data';
import { generateEmbedding, getEmbeddingDimensions, getEmbeddingModel } from './embeddings';
import type {
  SearchOptions,
  SearchResult,
  QuestionContext,
  Answer,
  CountyData,
  CitationFilters,
  Citation,
  KnowledgeChunk,
  CuratedData,
} from './types';

/**
 * Brain SDK Client
 * Provides unified interface to all Brain functionality
 */
export class BrainClient {
  /**
   * Perform semantic search on knowledge chunks
   * @param query - Search query text
   * @param options - Search filters and options
   * @returns Array of search results
   */
  async search(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return semanticSearch(query, options);
  }

  /**
   * Perform text-based search (fallback)
   * @param query - Search query text
   * @param options - Search filters and options
   * @returns Array of search results
   */
  async textSearch(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return textSearch(query, options);
  }

  /**
   * Answer a user question using RAG
   * @param question - User's question
   * @param context - Context about user's location/situation
   * @returns Answer with citations and sources
   */
  async ask(question: string, context: QuestionContext): Promise<Answer> {
    return answerQuestion(question, context);
  }

  /**
   * Generate FAQs for a county
   * @param county - County name
   * @param state - State name
   * @param topic - Optional topic filter
   * @returns Array of FAQ objects
   */
  async generateFAQs(
    county: string,
    state: string,
    topic?: string
  ): Promise<Array<{ question: string; answer: string }>> {
    return generateFAQs(county, state, topic);
  }

  /**
   * Get all data for a county
   * @param state - State name
   * @param county - County name
   * @returns Complete county data
   */
  async getCountyData(state: string, county: string): Promise<CountyData> {
    return getCountyData(state, county);
  }

  /**
   * Get citations based on filters
   * @param filters - Citation filters
   * @returns Array of citations
   */
  async getCitations(filters?: CitationFilters): Promise<Citation[]> {
    return getCitations(filters);
  }

  /**
   * Get knowledge chunks
   * @param state - State name
   * @param county - County name (optional)
   * @param topic - Topic filter (optional)
   * @returns Array of knowledge chunks
   */
  async getKnowledgeChunks(
    state: string,
    county?: string,
    topic?: string
  ): Promise<KnowledgeChunk[]> {
    return getKnowledgeChunks(state, county, topic);
  }

  /**
   * Get curated data for a county
   * @param state - State name
   * @param county - County name
   * @param topic - Topic filter (optional)
   * @returns Array of curated data
   */
  async getCuratedData(
    state: string,
    county: string,
    topic?: string
  ): Promise<CuratedData[]> {
    return getCuratedData(state, county, topic);
  }

  /**
   * Get Gold Dust intelligence (high-priority insights)
   * @param state - State name
   * @param county - County name
   * @returns Array of high-priority curated data
   */
  async getGoldDust(state: string, county: string): Promise<CuratedData[]> {
    return getGoldDust(state, county);
  }

  /**
   * Get statistics for a county
   * @param state - State name
   * @param county - County name
   * @returns County statistics
   */
  async getCountyStats(state: string, county: string) {
    return getCountyStats(state, county);
  }

  /**
   * Generate embedding for text
   * @param text - Text to generate embedding for
   * @returns Embedding result
   */
  async generateEmbedding(text: string) {
    return generateEmbedding(text);
  }

  /**
   * Get embedding model information
   */
  getEmbeddingInfo() {
    return {
      model: getEmbeddingModel(),
      dimensions: getEmbeddingDimensions(),
    };
  }
}

/**
 * Create a new Brain client instance
 */
export function createBrainClient(): BrainClient {
  return new BrainClient();
}

/**
 * Default Brain client instance (singleton)
 */
export const brain = createBrainClient();

// Export all types
export type {
  SearchOptions,
  SearchResult,
  QuestionContext,
  Answer,
  CountyData,
  CitationFilters,
  Citation,
  KnowledgeChunk,
  CuratedData,
};

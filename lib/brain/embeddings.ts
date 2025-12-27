// Gemini Embeddings Module
// Generates embeddings using Google's text-embedding-004 model
// This matches the model used by legal-data-factory for consistency

import { GoogleGenerativeAI } from '@google/generative-ai';
import { EmbeddingResult } from './types';

const EMBEDDING_MODEL = 'text-embedding-004';
const EMBEDDING_DIMENSIONS = 768;

/**
 * Generate embedding for a text query using Gemini
 * @param text - The text to generate an embedding for
 * @returns EmbeddingResult with 768-dimensional vector
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

    const result = await model.embedContent(text);

    if (!result.embedding || !result.embedding.values) {
      throw new Error('Failed to generate embedding: No values returned');
    }

    const embedding = result.embedding.values;

    // Verify dimensions match expected
    if (embedding.length !== EMBEDDING_DIMENSIONS) {
      console.warn(
        `Warning: Embedding dimension mismatch. Expected ${EMBEDDING_DIMENSIONS}, got ${embedding.length}`
      );
    }

    return {
      embedding,
      model: EMBEDDING_MODEL,
    };
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Batch generate embeddings for multiple texts
 * @param texts - Array of texts to generate embeddings for
 * @returns Array of EmbeddingResults
 */
export async function generateEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
  const results: EmbeddingResult[] = [];

  for (const text of texts) {
    const result = await generateEmbedding(text);
    results.push(result);
  }

  return results;
}

/**
 * Get embedding dimensions for the model
 */
export function getEmbeddingDimensions(): number {
  return EMBEDDING_DIMENSIONS;
}

/**
 * Get embedding model name
 */
export function getEmbeddingModel(): string {
  return EMBEDDING_MODEL;
}

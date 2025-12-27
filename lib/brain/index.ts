// Brain SDK - Main Entry Point
// Legal-data-factory integration for DUIGuide

export { brain, createBrainClient, BrainClient } from './client';
export { semanticSearch, textSearch } from './search';
export { answerQuestion, generateFAQs } from './qa';
export {
  getCountyData,
  getCitations,
  getKnowledgeChunks,
  getCuratedData,
  getGoldDust,
  getCountyStats,
} from './data';
export {
  generateEmbedding,
  generateEmbeddings,
  getEmbeddingDimensions,
  getEmbeddingModel,
} from './embeddings';

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
  Source,
  TopicData,
  EmbeddingResult,
} from './types';

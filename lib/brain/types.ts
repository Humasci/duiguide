// Brain SDK TypeScript Types

export interface SearchOptions {
  state?: string;
  county?: string;
  topic?: string; // impound, bail, dmv, court, scram, license
  phase?: string; // PHASE_1_ARREST, PHASE_2_CRITICAL_WINDOW, PHASE_3_COURT_DEFENSE, PHASE_4_POST_CONVICTION
  limit?: number;
  similarityThreshold?: number; // 0.0 - 1.0, default 0.7
}

export interface SearchResult {
  id: number;
  text: string;
  similarity: number;
  source: {
    id: number;
    fileName: string;
    fileType: string;
    filePath?: string;
  };
  metadata: {
    state: string;
    county: string;
    topic: string;
    phase: string;
    chunkIndex: number;
    confidence: number;
  };
}

export interface QuestionContext {
  county: string;
  state: string;
  topic?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Answer {
  answer: string;
  confidence: number;
  citations: Citation[];
  sources: Source[];
  relatedQuestions?: string[];
}

export interface Citation {
  id: number;
  citationText: string;
  citationType: string; // statute, regulation, case, policy, website
  jurisdiction?: string;
  url?: string;
  sourceId: number;
}

export interface Source {
  id: number;
  fileName: string;
  fileType: string;
  filePath?: string;
  createdAt: string;
  processingStatus: string;
}

export interface KnowledgeChunk {
  id: number;
  sourceId: number;
  text: string;
  chunkIndex: number;
  state: string;
  county: string;
  phase: string;
  topic: string;
  confidence: number;
  createdAt: string;
}

export interface CuratedData {
  id: number;
  sourceId: number;
  topic: string;
  extractedData: any; // JSON data
  priority: number;
  goldDustConfidence?: number;
  goldDustMetadata?: {
    frictionType?: string;
    keyInsight?: string;
    reasons?: string[];
  };
  createdAt: string;
}

export interface TopicData {
  chunks: KnowledgeChunk[];
  citations: Citation[];
  curatedData: CuratedData[];
  summary?: string;
}

export interface CountyData {
  state: string;
  county: string;
  topics: {
    impound?: TopicData;
    bail?: TopicData;
    dmv?: TopicData;
    court?: TopicData;
    scram?: TopicData;
    license?: TopicData;
  };
  allChunks: KnowledgeChunk[];
  allCitations: Citation[];
  chunkCount: number;
  citationCount: number;
}

export interface CitationFilters {
  state?: string;
  county?: string;
  topic?: string;
  citationType?: string;
  sourceIds?: number[];
}

export interface EmbeddingResult {
  embedding: number[]; // 768 dimensions for text-embedding-004
  model: string;
}
